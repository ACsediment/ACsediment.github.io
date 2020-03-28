
document.getElementById("textarea_in").addEventListener("input", encode);
document.getElementById("maxColumn_in").addEventListener("input", encode);

function encode(){
	var maxColumn=7;
	maxColumn=document.getElementById("maxColumn_in").value;
	var inputString=document.getElementById("textarea_in").value;
	document.getElementById("textarea_out").value=venusCode(inputString,maxColumn);
}

function venusCode(inputString,maxColumn){
	var outputString="";
		if (inputString.length<=maxColumn) {
			//if maxColumn is too large for input string, cut it in half.
			maxColumn=inputString.length/2;
		}
		var rawCount=Math.ceil(inputString.length/maxColumn);

		for (i=0;i<rawCount;i++) {
			for (j=0; j<maxColumn; j++) {
				charIndex=i+j*rawCount;
				if (charIndex<inputString.length) {
					theChar=inputString.charAt(charIndex);
					outputString+=theChar;
					if(theChar.charCodeAt(0) < 127){outputString+=" ";} //additional space for half-full
					outputString+=" ";
				}
			}
			outputString+="\n"; //End of this line.
		}

		return outputString;
}