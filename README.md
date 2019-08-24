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
var text=new Array(2)
var layout=new android.widget.LinearLayout(ctx);
var win=new android.widget.PopupWindow(ctx);
for(var index=0;index<2;index++){
  text[index]=new android.widget.TextView(ctx).
  text[index].setText("Hello World"); 
  text[index].setLayoutParams(new android.widget.LinearLayout.LayoutParams(-2,-2))
}
layout.setGravity(17)
for(v in text){
  layout.addView(v);
}
win.setFocusable(true)
win.setContentView(layout)
win.setWidth(200)
win.setHeight(100)
```
使用后:
```css
[D as DUI.v.]
[android.widget]
layout as LinearLayout{
  gravity:17;
  child-arr:[D]text;
}
text as TextView for index 2{
  text:("Hello World");
  size:-2 -2
}
win as PopupWindow{
  focusable:true;
  content-view:[D]layout;
  width:200;
  height:100
}

```
## [开发文档](https://github.com/DexerMatters/DUI/wiki)
## 关于
- 作者: [DexerMatters](https://github.com/DexerMatters)
- 当前版本: 0.0.1 alpha
- 联系方式: dexermatters@gmail.com or 2353708378@qq.com  
