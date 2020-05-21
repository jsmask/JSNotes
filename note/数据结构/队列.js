// 队列

// 实现队列
var Queue = (function() {
	var queue = function() {
		this.list = {};
		this.count = 0;
		this.beginCount = 0;
	}
	queue.prototype.clear = function() {
		this.list = {};
		this.count = 0;
		this.beginCount = 0;
	}
	queue.prototype.enqueue = function(n){
		this.list[this.count++] = n;
	}
	queue.prototype.dequeue = function() {
		if(this.isEmpty()) return undefined;
		var ret = this.list[this.beginCount];
		delete this.list[this.beginCount];
		this.beginCount++
		return ret;
	}
	queue.prototype.peek = function(){
		if(this.isEmpty()) return undefined;
		return this.list[this.beginCount];
	}
	queue.prototype.toString = function() {
		if(this.isEmpty()) return "";
		var str = this.list[this.beginCount];
		for(var i = this.beginCount + 1; item = this.list[i++];) {
			str += "," + item;
		}
		return str;
	}
	queue.prototype.size = function() {
		return this.count - this.beginCount;
	}
	queue.prototype.isEmpty = function() {
		return this.size() === 0;
	}
	return queue;
})();


var queue = new Queue();
queue.enqueue(10)
queue.enqueue(11)
queue.enqueue(12)
queue.dequeue();
queue.dequeue();
console.log(queue.peek());
queue.dequeue()
queue.enqueue(13);
console.log(queue.peek());
queue.enqueue(14);
queue.enqueue(15);
console.log(queue.size());
console.log(queue.toString());

console.log('------------------');


//击鼓传花 模拟演示
function hotPotato(list,num){
	var queue = new Queue();
	var elimitatedList = [];
	for (var i = 0; i < list.length; i++) {
		queue.enqueue(list[i]);
	}
	console.log(queue.list)
	while(queue.size()>1){
		for (var i = 0; i < num; i++) {
			queue.enqueue(queue.dequeue());
		}
		elimitatedList.push(queue.dequeue());
	}
	
	return {
		list:elimitatedList,
		winner:queue.dequeue()
	}
}

var names = ['a','b','c','d','e','f','g'];
var ret = hotPotato(names,7);
console.log(ret);


