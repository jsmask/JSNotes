// 队列

// 实现队列
var Deque = (function() {
	var deque = function() {
		this.list = {};
		this.count = 0;
		this.beginCount = 0;
	}
	
	deque.prototype.addFront = function(n){
		if(this.isEmpty()){
			this.addBack(n);
		}
		else if(this.beginCount>0){
			this.list[--this.beginCount] = n;
		}
		else {
			for (var i = this.count ; i > 0;i--) {
				this.list[this.count] = this.list[this.count-1];
			}
			this.count ++;
			this.list[0] = n;
			this.beginCount = 0;
		}
	}
	
	deque.prototype.addBack = function(n){
		this.list[this.count++] = n;
	}
	
	deque.prototype.removeFront = function(){
		if(this.isEmpty()) return undefined;
		var ret = this.list[this.beginCount]
		delete this.list[this.beginCount];
		this.beginCount++;
		return ret;
	}	
	deque.prototype.removeBack = function(){
		if(this.isEmpty()) return undefined;
		var ret = this.list[--this.count]
		delete this.list[this.count];
		return ret;
	}

	deque.prototype.peekFront = function(){
		return this.list[this.beginCount];
	}
	deque.prototype.peekBack = function(){
		return this.list[this.count-1]
	}
	
	deque.prototype.toString = function() {
		if(this.isEmpty()) return "";
		var str = this.list[this.beginCount];
		for(var i = this.beginCount + 1; item = this.list[i++];) {
			str += "," + item;
		}
		return str;
	}
	deque.prototype.size = function() {
		return this.count - this.beginCount;
	}
	deque.prototype.isEmpty = function() {
		return this.size() === 0;
	}
	deque.prototype.clear = function() {
		this.list = {};
		this.count = 0;
		this.beginCount = 0;
	}
	return deque;
})();


var deque = new Deque();

deque.addFront('b');
deque.addFront('a');
deque.addBack('c');
console.log(deque.list);
console.log(deque.peekFront());
deque.removeFront();
console.log(deque.list);
console.log(deque.peekBack());
deque.removeBack();
console.log(deque.list);

console.log('------------------');


//回文数 模拟演示


//单例工厂
var dequeFactory = (function() {
	var deque;
	return {
		create: function() {
			if(deque) {
				deque.clear();
				return deque;
			}
			return deque = new Deque();
		}
	}
})();


function palindromeChecker(str){
	if(str === undefined || str == null || (str !== null && str.length === 0)){
		return false;
	}
	var isEqual = true;
	var deque = dequeFactory.create();
	var _str = str.toLocaleString().split(" ").join("");
	for (var i = 0,len = _str.length; i < len; i++) {
		deque.addBack(_str.charAt(i));
	}
	
	while(deque.size()>1 &&isEqual){
		if(deque.removeFront()!==deque.removeBack()){
			isEqual = false;
		}
	}
	return isEqual;
}

console.log("a:",palindromeChecker("a"));
console.log("hello:",palindromeChecker("hello"));
console.log("level:",palindromeChecker("level"));



