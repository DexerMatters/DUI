/*
Copyright© Dexer_Matters
version : 0.0.1 alpha
date : unknown
|----\     |-----    \    /    |-----    |-----\
|     \    |          \  /     |         |      |
|      |   |-----      \/      |-----    |-----/
|      |   |           /\      |         |\_
|     /    |          /  \     |         |  \_
|----/     |-----    /    \    |-----    |    \_
未经授权，不可转载，商业等宣传操作

*/
String.prototype.trim = function() {
	return (this===undefined?"":this).replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.hasCoveredWith=function(source,b){
  var k=new RegExp("\\([^\\)]*"+source+
    "[^\\)]*\\)?".replace(/\(/g,b[0]).replace(/\)/g,b[1]),"g");
  return Boolean(this.match(k));
};
String.prototype.hasCoveredWith_=function(index,b){
	var str=this.split('');
	var bool=[false,false];
	for(var i=index+1;i<str.length;i++)
		if(str[i]==b[1])
			bool[0]=true;
	for(var i=index-1;i>=0;i--)
		if(str[i]==b[0])
			bool[1]=true;
	return bool[0]&&bool[1];
};
function CSS() {};

function DUI() {};
DUI.v={};
DUI.ctrs=[];
CSS.toCSSFormat = function(str) {
	var css = "";
	for (var i = 0; i < str.length; i++)
		if (str.charAt(i) < 'Z' && str.charAt(i) > 'A')
			css += '-' + str.charAt(i).toLowerCase();
	else
		css += str.charAt(i);
	return css;
};
CSS.toCamelFormat = function(c) {
	var c_ = c.split('-');
	for (var i = 1; i < c_.length; i++)
		c_[i] = c_[i].charAt(0).toUpperCase() + c_[i].substring(1);
	return c_.join("");
};
CSS.output = function(c, css) {
	return CSS.debug(c,css).output;
};
CSS.debug = function(c,css){
	var res = [];
	var values = [];
	var methods = [];
	var ctrs="DUI.ctx";
	var sents = css.split(';');
	for (var i = 0; i < sents.length; i++)
		if(sents[i]===undefined||sents[i]=="") sents.splice(i,1);
	for (var i = 0; i < sents.length; i++) {
		if(sents[i].indexOf(':')!=-1)
			var piece = sents[i].split(':')[1].trim();
		else throw  "CSS:SyntaxError:Unknown statement \""+sents[i]+"\"";
		var time=0;
		var ps=piece.split('');
		for(var p=0;p<piece.length;p++){
			if(ps[p]=='(') time++;
			if(ps[p]==')') time--;
			if(time==0&&ps[p]==' ')
				ps[p]=',';
		}
		values.push(ps.join(''));
		if(!/[a-zA-Z\-]/g.test(sents[i].split(':')[0].trim())) 
			throw  "CSS:SyntaxError:Unknown statement \""+sents[i]+"\"";
		methods.push(CSS.toCamelFormat("set-" + sents[i].split(':')[0].trim()));
		if (methods[i] == "setChild") {
			if(values[i].indexOf(',')==-1)
				res.push(c + ".addView(" + values[i] + ")");
			else{
				var sp=values[i].split(',');
				for(var j=0;j<sp.length;j++){
					res.push(c + ".addView(" + sp[j] + ")");
				}
			}
		}else if(methods[i]=="setChildArr"){
			res.push("for(var i=0;i<"+values[i]+".length;i++)"+c+".addView("+values[i]+"[i])");
		}else if(methods[i]=="setNew")
			ctrs=values[i]
		else if(methods[i]=="setSize"){
			res.push(c + ".setLayoutParams(new android.widget.LinearLayout.LayoutParams("+values[i]+"))")
		}else
			res.push(c + "." + methods[i] + "(" + values[i] + ")");
	};
	DUI.ctrs.push(ctrs);
	return {output:res.join(";\n")+";\n",value:values,method:methods,contruc:ctrs}
}
CSS.complie = function(c, css) {
	eval(CSS.toCSS(c, css))
};


DUI.ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
DUI.debug=function(dui){
	//compile algorithm
	var duis = dui.replace(/\n/g, '').split('');
	var classes = [];
	var instances = []
	var aclasses=[]
	,ainstances=[]
	,atimes=[]
	,acsses=[]
	,anames=[];
	var csses = [];
	var namespaces=[];
	var ctrs=[];
	var vals=[];
	var sums=[];
	var func;
	var params='';
	var brkt=["(",")"],brkt_=["(",")"];
	var ins_str = "",set_str="",arr_str="",for_str="";
	var pointer=false;
	for (var i = 0; i < duis.length; i++) {
		if(duis[i] == '['){
			var namespace="";
			for(var p=i+1;duis[p]!=']';p++) {
				namespace+=duis[p];
				duis[p]="";
			}
			if(!(namespace.hasCoveredWith(dui,brkt)||namespace.hasCoveredWith(dui,brkt_))){
				if(namespace.indexOf(" as ")==-1){
					namespaces.push(namespace);
					classes.push([]);
					instances.push([]);
					aclasses.push([]);
					ainstances.push([]);
				}
				else{
					var namespace_=namespace.split(" as ");
					vals.push(namespace_[0].trim());
					sums.push(namespace_[1].trim());
				}
				if(/^package\s+\w+/.test(namespace)&&i==0){
					var namespace_=namespace.split(' ');
					func=namespace_[1].trim();
					if(namespace_.length>1)
						params=namespace_.slice(2).join(',').replace(/\s/g,'');
				}
			}
		}
		else if (duis[i] == '{') {
			var css = "";
			var piece = "";
			var index=classes.length-1;
			var for_css=false
			var times;
			var i_name;
			for(var p = i - 1; p != -1 && duis[p] != '[' && duis[p] != ']' && duis[p] != '{' && duis[p] != '}'; p--) {
				piece = duis[p] + piece;
				duis[p]="";
			}
			if(piece.indexOf(" as ")!=-1){
				if(piece.indexOf(" for ")!=-1){
					for_css=true;
					var piece_0=piece.split(" as ");
					var piece_=piece_0[1].split(" for ");
					var fval=piece_[1].split(' ');
					times=parseInt(fval[1]);
					i_name=fval[0];
					var index=ainstances.length-1;
					ainstances[index].push(piece_0[0]);
					aclasses[index].push(piece_[0]);
					atimes.push(times);
					anames.push(i_name);
				}else{
					var piece_=piece.split(" as ");
					classes[index].push(piece_[1].trim());
					instances[index].push(piece_[0].trim());
				}
			}
			else throw "DUI:SyntaxError:Unknown word \""+piece+"\"";
			for (var p = i + 1; duis[p] != '{' && duis[p] != '}'; p++){
				css += duis[p];
				duis[p]="";
			}
			if(for_css)
				acsses.push(css.trim());
			else csses.push(css.trim());
		}
	}
	var test=duis.join('').split('');
	var returns=[];
	var t=0;
	var at=0;
	//sort algorithm
	var func_str="function "+func+"("+params+"){\n";
	var re_str="";
	for(var i=0;i<test.length;i++){
		if(!/[\[\]\{\}]/.test(test[i])) throw "DUI:SyntaxError:Unknown word \""+test[i]+"\"";
	}
	for (var i = 0; i < csses.length; i++) {
		set_str += CSS.output(Array.prototype.concat.apply([], instances)[i], csses[i]);
	}
	for (var i = 0; i < classes.length; i++) {
		for(var j = 0; j < classes[i].length; j++){
			ins_str += "var " + instances[i][j] + "=new "+namespaces[i]+"." + classes[i][j] + "("+DUI.ctrs[t]+");\n";
			returns.push(instances[i][j]+":"+instances[i][j])
			t++;
		}
	}
	for(var i=0;i<aclasses.length;i++){
		for(var j=0;j<aclasses[i].length;j++){
			var n=anames[at];
			var cssv=CSS.debug(ainstances[i][j]+"["+n+"]",acsses[at]);
			var news=ainstances[i][j]+"["+n+"]=new "+namespaces[i]+"."+aclasses[i][j]+"("+cssv.contruc+");"
			for_str+="for(var "+n+"=0;"+n+"<"+atimes[at]+";"+n+"++){\n"+news+"\n"+cssv.output+"};\n"
			arr_str+="var "+ainstances[i][j]+"=new Array("+atimes[at]+");\n";
			returns.push(ainstances[i][j]+":"+ainstances[i][j]);
			at++;
		}
	}
	re_str="return {"+returns.join(',')+"}\n"
	DUI.ctrs=[];
	//second treatment
	var total=func_str+arr_str+ins_str+for_str+set_str+re_str+"}";
	for(var i=0;i<sums.length;i++)
		total=total.replace(new RegExp("\\["+vals[i]+"\\]","g"),sums[i]);
	return {output:total,class:classes,instance:instances,css:csses,namespace:namespaces,rest:test.join('')};
};
DUI.output = function(dui) {
	return DUI.debug(dui).output;
};
DUI.outputFromFile = function(path) {
	var cont = "";
	var file = new java.io.File(path);
	if (!(file.exists() || file.getName.split('.')[1] == "dui")) throw "JAVA:FileNotFoundException";
	try {
		var str="";
		var input = new java.io.BufferedReader(new java.io.FileReader(path));
		while ((str=input.readLine()) != null)
			cont = cont + str;
		input.close();
	} catch (e) {
		print(e)
	}
	return DUI.debug(cont).output;
}
/*下面为开发调试
var d=new Date().getMilliseconds();
var r=DUI.outputFromFile("/storage/emulated/0/games/com.mojang/minecraftpe/Skills/test.dui");
print(r);
eval(r);
var ui=new myDUI();
print(ui.text[0].getText());
print(new Date().getMilliseconds()-d)
*/