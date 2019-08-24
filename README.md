# DUI
DUI是一个轻量的文本标记语言，主要用来简化modpe中繁琐的ui代码
## 特色
### 梗概
- 极度简化了modpe代码
- 格式美观，可分辨率强
- 高自由度，适合一切人群
### 与javascript比较
使用前:
```javascript
var text=new android.widget.TextView(ctx)
var layout=new android.widget.LinearLayout(ctx)
var view=new android.view.View(ctx)
text.setText(text)
text.setTextSize(16)
text.setTextcolor(Oxffffff)
layout.setwidth (15)
layout.setHeight(15)
layout.setMargins(15, 15, 15, 15)
layout.setBackgroundDrawable(null)
layout.addView(text)
layout.addView(view)
view.setWidth(10)
view.setHeight(20)
view.setOnClickListener(null)
```
使用后:
```css
[D as DUI.v]
[android.widget]
text as TextView{
  text:"text";
  text-size:16;
  text-color:0xffffff;
}
layout as LinearLayout{
  width:15;
  height:15;
  margins:15 15 15 15;
  background-drawable:null;
  child:[D]DUI.v.text [D]DUI.v.view
}
[android.view]
view as View{
  width:10;
  height:20;
  on-click-listener:null
}
```
## 语法
### 编译
DUI一般放在一个后缀为.dui的文件中，可用`DUI.outputFromFile(path)`来编译，如果仅仅测试DUI，可用`DUI.output(path)`来编译
### 全局变量&局部变量
在DUI中，每个块的变量为全局变量，再次调用需要在变量名前加上`DUI.v.`；在DUI中，每个循环块生成的迭代器变量为局部变量，在本块内直接调用即可
### 块
在DUI中，使用`{}`括起来的叫做块，块中为CSS表达式，并且块前需要使用`as`关键词来声明一个某类型的块，格式为`name as class`，其中，`name`为变量名，`class`为类名，以下例子就是一个标准的块  
```css
text_view as TextView{
  text:"my first block";
  text-size:14;
  text-color:0xAAAAAA;
  margins:15 15 15 15;
}
```
### 循环块
在DUI中，块语句的声明语句中可用`for`来创建一个循环块，循环块的语法为`name as class for index time`，其中，`index`是局部变量名，做循环的迭代器，`time`是循环次数，循环块能够使块的变量名成为一个长度为循环次数的数组，里面储存每次循环的产生的实例，若将每个实例作为某布局的子布局，可使用CSS元素`child-arr`来添加
### 命名空间
在DUI中，每个块都需要有一个命名空间，命名空间由`[]`括起来，里面是包名或者类名，表示该命名空间表达式以下的所有块都从包名或者类名来调用，无命名空间可直接写`[]`，以下就是一个例子（...表示省略CSS）
```css
[android.widget]
text_view as TextView{
  ...
}
text_view as LinearLayout{
  ...
}
[android.view]
view as View{
  ...
}
```
### 子布局
在DUI中，添加了CSS元素`child`，参数是此布局中的子布局的变量名，相当于简化了`addView`这个方法，并且也添加了CSS元素`child-arr`，参数是子布局实例的数组
### 构造参数
在DUI中，添加了CSS元素`new`，参数是此类构造方法的参数，若块中无此元素，那么参数会默认指定为Minecraft主Activity的上下文
### 控件大小
在DUI中，添加了CSS元素`size`，参数有两个，分别为控件宽，高，相当于简化了声明LayoutParams的过程
### 插值
在DUI中，插值可用`[]`声明，具体格式为`[name as value]`，其中name是名称，value是值，插值可使用`[name]`在CSS中调用。插值的调用会在编译时强制替换为其值，可以实现动态更改代码的目的
### 忽略空格
CSS多个值时，会使用空格隔开，当我们的值里面含空格时，可以用`()`来忽略空格，里面可以是JavaScript表达式
## 关于
- 作者: [DexerMatters](https://github.com/DexerMatters)
- 当前版本: 0.0.1 alpha
- 联系方式: dexermatters@gmail.com or 2353708378@qq.com  
