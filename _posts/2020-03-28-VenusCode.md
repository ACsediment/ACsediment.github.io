---
layout: post
title: "VenusCode 金星文"
date: 2020-03-28 20:21:00 -0000
categories: Test
---

VenusCode: Venus rotates clockwise in retrograde rotation, so do this code.
金星文：金星与众不同地逆行自转，你的文字也可以。

You may check out my [Github page](https://github.com/ACsediment/VenusCode) for this tiny project.

<div class="topLayer">
	<div class="inputText">
		<label for="textarea_in">Type your text here 在此输入文本</label>
		<textarea id="textarea_in"></textarea>
	</div>
	<div class="control">
		<label for="maxColumn_in">Maximum Column 最大列数</label>
		<input id='maxColumn_in' type='number' value='7'>
	</div>
	<div class="ouputText">
		<label for="textarea_out">Output text 转换后的文本</label>
		<button class="btn" data-clipboard-target="#textarea_out">
			<img src="../images/clippy.svg" alt="Copy 复制" style="width: 13px;">
		</button>
		<textarea id="textarea_out" readOnly onmouseover="this.select()"></textarea>
	</div>
</div>
<style type="text/css">
div.topLayer{
	margin-left: 15%;
	width: 70%;
	height: 90%;
}
div.ouputText{
	margin-top: 10px;
}
textarea {
	margin-top: 5px;
	margin-bottom: 10px;
	width: 95%;
	height: 150px;
	background-color: #26323863;
	color: inherit;
}
textarea:focus{
    border-color: #b3e5fc;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}

/*tooltip from https://primer.style/ */
.tooltipped {
    position: relative
}
.tooltipped:after {
    position: absolute;
    z-index: 1000000;
    display: none;
    padding: 5px 8px;
    font: normal normal 11px/1.5 Helvetica,arial,nimbussansl,liberationsans,freesans,clean,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
    color: #fff;
    text-align: center;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: break-word;
    white-space: pre;
    pointer-events: none;
    content: attr(aria-label);
    background: rgba(0,0,0,.8);
    border-radius: 3px;
    -webkit-font-smoothing: subpixel-antialiased
}
.tooltipped:before {
    position: absolute;
    z-index: 1000001;
    display: none;
    width: 0;
    height: 0;
    color: rgba(0,0,0,.8);
    pointer-events: none;
    content: "";
    border: 5px solid transparent
}
.tooltipped:hover:before,.tooltipped:hover:after,.tooltipped:active:before,.tooltipped:active:after,.tooltipped:focus:before,.tooltipped:focus:after {
    display: inline-block;
    text-decoration: none
}
.tooltipped-s:after,.tooltipped-se:after,.tooltipped-sw:after {
    top: 100%;
    right: 50%;
    margin-top: 5px
}
.tooltipped-s:before,.tooltipped-se:before,.tooltipped-sw:before {
    top: auto;
    right: 50%;
    bottom: -5px;
    margin-right: -5px;
    border-bottom-color: rgba(0,0,0,.8)
}
.tooltipped-s:after,.tooltipped-n:after {
    -webkit-transform: translateX(50%);
    -ms-transform: translateX(50%);
    transform: translateX(50%)
}
.tooltipped-multiline.tooltipped-s:after,.tooltipped-multiline.tooltipped-n:after {
    right: auto;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%)
}
.fullscreen-overlay-enabled.dark-theme .tooltipped:after {
    color: #000;
    background: rgba(255,255,255,.8)
}
.fullscreen-overlay-enabled.dark-theme .tooltipped .tooltipped-s:before,.fullscreen-overlay-enabled.dark-theme .tooltipped .tooltipped-se:before,.fullscreen-overlay-enabled.dark-theme .tooltipped .tooltipped-sw:before {
    border-bottom-color: rgba(255,255,255,.8)
}
</style>
<script src="../js/clipboard.min.js"></script>
<script type="text/javascript">

document.getElementById("textarea_in").addEventListener("input", encode);
document.getElementById("maxColumn_in").addEventListener("input", encode);

//clipboard From clipboard.js
var clipboardSnippets = new ClipboardJS('.btn',{
    target: function(trigger) {
        return trigger.nextElementSibling;
    }
});
clipboardSnippets.on('success', function(e) {
    showTooltip(e.trigger, 'Copied!');
});
clipboardSnippets.on('error', function(e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
});

//Tooltips:
var btns = document.querySelectorAll('.btn');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('mouseleave', clearTooltip);
    btns[i].addEventListener('blur', clearTooltip);
}
function clearTooltip(e) {
    e.currentTarget.setAttribute('class', 'btn');
    e.currentTarget.removeAttribute('aria-label');
}
function showTooltip(elem, msg) {
    elem.setAttribute('class', 'btn tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
}
function fallbackMessage(action) {
    var actionMsg = '';
    var actionKey = (action === 'cut' ? 'X' : 'C');
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = 'No support :(';
    } else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
    } else {
        actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
    }
    return actionMsg;
}
//End Tooltips

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
		if (maxColumn<=0) {maxColumn=1;};
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
</script>