// 职责链模式

// 1.AOP
Function.prototype.after = function(fn) {
	var _this = this;
	return function() {
		var ret = _this.apply(this, arguments);
		if(ret === "nextSuccessor") {
			return fn.apply(this, arguments);
		}
	}
}

// 2.构造函数
var Chain = function(fn) {
	this.fn = fn
	this.successor = null;
};
Chain.prototype.setNextSuccessor = function(successor) {
	return this.successor = successor;
}
Chain.prototype.passRequest = function() {
	this.args = arguments;
	var ret = this.fn.apply(this, this.args);
	if(ret === 'nextSuccessor') {
		return this.next();
	}
	return ret;
}
Chain.prototype.next = function(){
	this.successor && this.successor.passRequest.apply(this.successor, this.args);
}

// 模拟

var planA = function(money) {
	if(money >= 30000) {
		console.log("执行出国旅游，预算为" + money + "元");
	} else {
		return "nextSuccessor";
	}
}
var planB = function(money) {
	if(money >= 10000) {
		console.log("执行国内旅游，预算为" + money + "元");
	} else {
		return "nextSuccessor";
	}
}

var planC = function(money) {
	if(money >= 2000) {
		console.log("执行省内旅游，预算为" + money + "元");
	} else {
		return "nextSuccessor";
	}
}

var planD = function(money) {
	if(money >= 500) {
		console.log("执行近郊游，预算为" + money + "元");
	} else {
		return "nextSuccessor";
	}
}

var planE = function(money) {
	console.log("在家打游戏不香么，预算为" + (money || 0) + "元");

}

// 1.AOP
var plan = planA.after(planB).after(planC).after(planD).after(planE);
plan(10)

console.log("----------------")

// 2.构造函数

var planD1 = function(money) {
	if(money > 20) {
		console.log("公园转转吧，预算为" + money + "元");
	} else {
		var _this = this;
		console.log("思考中..");
		setTimeout(function(){
			console.log("----返回思考计划----")
			_this.next();
			console.log("----------------")
		},1500)
	}
}


var chainPlanA = new Chain(planA);
var chainPlanB = new Chain(planB);
var chainPlanC = new Chain(planC);
var chainPlanD = new Chain(planD);
var chainPlanD1 = new Chain(planD1);
var chainPlanE = new Chain(planE);

chainPlanA.setNextSuccessor(chainPlanB)
	.setNextSuccessor(chainPlanC)
	.setNextSuccessor(chainPlanD)
	.setNextSuccessor(chainPlanD1)
	.setNextSuccessor(chainPlanE);
	
chainPlanA.passRequest(10);

/***********************/


// 装饰器模式
Function.prototype.before = function(fn){
	var _this = this;
	return function(){
		fn.apply(this,arguments);
		return _this.apply(this,arguments);
	}
}

var button = document.createElement("button");
button.innerHTML = "按钮";
button.id = "btn";
document.querySelector("body").appendChild(button);

console.log(document.getElementById("btn"))

document.getElementById = document.getElementById.before(function(){
	console.log('btn before');
})

console.log("----------------")
var btn = document.getElementById("btn");
console.log(btn);
console.log("----------------")