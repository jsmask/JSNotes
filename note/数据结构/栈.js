// 栈

// 实现栈
var Stack = (function() {
	var stack = function() {
		this.list = {};
		this.count = 0;
	}
	stack.prototype.clear = function() {
		this.list = {};
		this.count = 0;
	}
	stack.prototype.peek = function() {
		if(this.isEmpty()) return undefined;
		return this.list[this.count - 1]
	}
	stack.prototype.pop = function() {
		if(this.isEmpty()) return undefined;
		var ret = this.list[--this.count];
		delete this.list[this.count];
		return ret;
	}
	stack.prototype.push = function(n) {
		this.list[this.count++] = n;
	}
	stack.prototype.toString = function() {
		if(this.isEmpty()) return "";
		var str = this.list[0];
		for(var i = 1; item = this.list[i++];) {
			str += "," + item;
		}
		return str;
	}
	stack.prototype.size = function() {
		return this.count;
	}
	stack.prototype.isEmpty = function() {
		return this.count === 0;
	}
	return stack;
})();

//单例工厂
var stackFactory = (function() {
	var stack;
	return {
		create: function() {
			if(stack) return stack;
			return stack = new Stack();
		}
	}
})();

// 利用栈 十进制化其他进制


//base策略
var baseType = {
	"2": 2,
	"8": 8,
	"16": 16,
	"32": 32
}

function decimalToBinary(decNumber, base) {
	if(decNumber == 0) return 0 + '';
	var binaryString = "",
		n = decNumber,
		digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var stack = stackFactory.create();
	var base = baseType[base.toString()];
	if(!base) throw new Error("BASE策略错误");

	while(n > 0) {
		stack.push(~~(n % base));
		n = ~~(n / base);
	}

	while(!stack.isEmpty()) {
		binaryString += digits.charAt(stack.pop());
	}

	return binaryString;
}

console.log(decimalToBinary(100345, 2));
console.log(decimalToBinary(100345, 8));
console.log(decimalToBinary(100345, 16));
console.log(decimalToBinary(100345, 32));