// 模板方法模式

var Food = function(name){
	this.name = name;
}

Food.prototype.wash = function(){
	console.log("清洗"+this.name);
}
Food.prototype.put = function(){
	throw new Error("需要写子类方法put");
}
Food.prototype.souse = function(){
	throw new Error("需要写子类方法souse");
}
Food.prototype.heating = function(){
	throw new Error("需要写子类方法heating");
}
Food.prototype.join = function(){
	throw new Error("需要写子类方法join");
}
// 钩子函数
Food.prototype.isSouse = function(){
	return false;
}
Food.prototype.start = function(){
	this.wash();
	if(this.isSouse()){
		this.souse();
	}
	this.put();
	this.heating();
	this.join();
}

var Beef = function(){};
Beef.prototype = new Food("牛肉");
Beef.prototype.put=function(){
	console.log("将"+this.name+"放入高压锅中");
}
Beef.prototype.heating=function(){
	console.log("加热1小时");
}
Beef.prototype.join=function(){
	console.log("加入八角大葱");
}

var Mutton = function(){};

Mutton.prototype = new Food("羊肉");
Mutton.prototype.put=function(){
	console.log("将"+this.name+"放入烤箱中");
}
Mutton.prototype.souse=function(){
	console.log("加入姜和食盐腌制1小时");
}
Mutton.prototype.heating=function(){
	console.log("烤半小时");
}
Mutton.prototype.join=function(){
	console.log("加入孜然");
}
Mutton.prototype.isSouse = function(){
	return window.confirm(this.name+"需要腌制吗？");
}




//模拟

var beef = new Beef();
beef.start();

console.log("-------------")

var mutton = new Mutton();
mutton.start();