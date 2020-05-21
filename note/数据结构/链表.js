// 节点类
var Node = function(ele) {
	this.element = ele;
	this.next = undefined;
}

// 链表
var LinkedList = (function() {
	var linkedlist;

	function _defaultEquals(a, b) {
		return a === b;
	}

	linkedList = function() {
		this.head = undefined;
		this.count = 0;
	}

	linkedList.prototype.push = function() {
		var ele = Array.prototype.shift.apply(arguments);
		var node = new Node(ele);
		if(this.isEmpty()) this.head = node;
		else this.getElementAt(this.size() - 1).next = node;
		this.count++;
		if(arguments.length>0) this.push.apply(this,arguments);
	}

	linkedList.prototype.getElementAt = function(index) {
		if(index < 0 || index > this.size()) return undefined;
		var current = this.head;
		for(var i = 0; i < index; i++) {
			current = current.next;
		}
		return current;
	}

	linkedList.prototype.removeAt = function(index) {
		if(index < 0 || index > this.count) return undefined;
		var current = this.getElementAt(index),
			previos;
		if(!current) return current;
		previos = this.getElementAt(index - 1);
		if(previos) {
			previos.next = current.next;
			this.count--;
		} else {
			this.head = this.head.next;
		}
		return current.element;
	}

	linkedList.prototype.indexOf = function(ele) {
		if(this.isEmpty()) return -1;
		var current = this.head;
		for(var i = 0; i < this.size() && current != null; i++) {
			if(_defaultEquals(ele, current.element)) {
				return i;
			}
			current = current.next;
		}
		return -1;
	}

	linkedList.prototype.remove = function(ele) {
		var index = this.indexOf(ele);
		return this.removeAt(index);
	}

	linkedList.prototype.insert = function(ele, index) {
		if(index < 0 || index > this.size()) return false;
		var node = new Node(ele);
		if(index == 0) {
			var current = this.head;
			node.next = current;
			this.head = node;
		}
		else{
			var previos = this.getElementAt(index-1);
			var current = previos.next;
			previos.next = node;
			node.next = current;
		}
		this.count++;
		return true;
	}
	
	linkedList.prototype.getHead = function(){
		return this.head;
	}

	linkedList.prototype.size = function() {
		return this.count;
	}

	linkedList.prototype.isEmpty = function() {
		return this.head == null;
	}

	linkedList.prototype.toString = function() {
		if(this.isEmpty()) return "";
		var current = this.head;
		var str = current.element;
		while(current!=null && current.next != null) {
			current = current.next;
			str += "," + current.element.toString();
		}
		return str;
	}

	return linkedList;
})();

var linkedList = new LinkedList();
linkedList.push("a","b","c","d","e");
linkedList.push("f","g");

console.log(linkedList.getElementAt(2).element)
console.log(linkedList.toString())

console.log(linkedList.indexOf("g"));
console.log(linkedList.indexOf("s"));

console.log(linkedList.removeAt(2));
console.log(linkedList.toString());
console.log(linkedList.indexOf("c"));
linkedList.insert("c", 2);
linkedList.insert("~", 0);
console.log(linkedList.toString());
console.log(linkedList.size());