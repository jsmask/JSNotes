// 集合

// 实现集合
var Set = (function() {
	var set = function() {
		this.items = {};
		this.size = 0;
	}
	
	set.prototype.has = function(item){
		return Object.prototype.hasOwnProperty.call(this.items,item)
	}
	
	set.prototype.add = function(item){
		if(!this.has(item)){
			this.items[item] = item;
			this.size++;
		}
	}
	
	set.prototype.delete = function(item){
		if(this.has(item)){
			delete this.items[item];
			this.size--;
			return true;
		}
		return false;
	}
	
	set.prototype.values = function(){
		var values = [];
		for (var key in this.items) {
			if(this.items.hasOwnProperty(key)) 
			  values.push(key)
		}
		return values;
	}
	
	set.prototype.clear = function(){
		this.items = {};
	}
	

	return set;
})();

var set = new Set();
set.add(1);
set.add(2);
console.log(set.size);
set.delete(3);
console.log(set.size);
set.delete(1);
console.log(set.size);
set.add('a');
set.add('b');
console.log(set.values());