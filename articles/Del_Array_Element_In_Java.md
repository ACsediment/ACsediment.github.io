## Del Array Element In Java

I found a peice of code that deletes a element from a Java Array. <br>
Source: https://blog.csdn.net/tangyaya8/article/details/76595488<br>

```java
public int[] delete(int index, int array[]) {
    //数组的删除其实就是覆盖前一位
    int[] arrNew = new int[array.length - 1];
    for (int i = index; i < array.length - 1; i++) {
        array[i] = array[i + 1];
    }
    System.arraycopy(array, 0, arrNew, 0, arrNew.length);
    return arrNew;
}
//————————————————
//版权声明：本文为CSDN博主「tangyaya8」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
//原文链接：https://blog.csdn.net/tangyaya8/article/details/76595488
```
<br>
<br>
However this method might sometimes cause problems, because it overwrites the original array.<br>
<br>
An improved design cloud be as below:<br>

```java
public int[] delete(String[] array,int index) {
    int[] arrNew = new String[array.length - 1];
    for (int i = 0; i < arrNew.length; i++) {
        if(i >= index){
            arrNew[i] = array[i + 1];
        }else{
            arrNew[i] = array[i];
        }
    }
    return arrNew;
}
```
<br>
