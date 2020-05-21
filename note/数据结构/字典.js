// 字典 也称 映射 符号表 关联数组

// 实现字典
var Dictionary = (function() {

	var _defaultToString = function(item) {
		if(item == null) return 'NULL';
		if(item === undefined) return "UNDEFINED";
		if(typeof item == 'string' || item instanceof String)
			return item
		return item.toString();
	}

	var ValuePair = function(key, value) {
		this.key = key;
		this.value = value;
	};

	ValuePair.prototype.toString = function() {
		return this.key + ":" + this.value;
	}

	var dictionary = function() {
		this.table = {};
		this.toStr = _defaultToString;
	}

	dictionary.prototype.hasKey = function(key) {
		return this.table[this.toStr(key)] != null;
	}

	dictionary.prototype.get = function(key) {
		var vp = this.table[this.toStr(key)];
		return vp == null ? undefined : vp.value;
	}

	dictionary.prototype.set = function(key, value) {
		if(key == null || value == null) return false;
		var tableKey = this.toStr(key)
		this.table[tableKey] = new ValuePair(key, value);
		return true;
	}

	dictionary.prototype.remove = function(key) {
		if(this.hasKey(key)) {
			delete this.table[this.toStr(key)];
			return true;
		}
		return false;
	}

	dictionary.prototype.size = function() {
		var count = 0;
		this.forEach(function(key, value) {
			count++;
		})
		return count;
	}

	dictionary.prototype.isEmpty = function() {
		return this.size() === 0;
	}

	dictionary.prototype.keys = function() {
		var keys = [];
		this.forEach(function(key, value) {
			keys.push(key)
		})
		return keys;
	}

	dictionary.prototype.values = function() {
		var values = [];
		this.forEach(function(key, value) {
			values.push(value)
		})
		return values;
	}

	dictionary.prototype.clear = function() {
		this.table = {};
	}

	dictionary.prototype.keyValues = function() {
		var vps = [];
		for(var key in this.table) {
			if(this.hasKey(key)) {
				vps.push(this.table[key]);
			}
		}
		return vps;
	}
	
	dictionary.prototype.toString = function() {
		if(this.isEmpty()) return "";
		var vps = this.keyValues();
		var str = vps[0].toString();
		for (var i = 1; vp = vps[i++];) {
			str += "," + vp.toString()
		}
		return str;
	}

	dictionary.prototype.forEach = function(fn) {
		var vps = this.keyValues();
		for (var i = 0; vp = vps[i++];) {
			var ret = fn && fn.call(this, vp.key, vp.value);
			if(ret === false) break;
		}
	}

	return dictionary;
})();

var dictionary = new Dictionary();

dictionary.set(0, 'a');
dictionary.set(1, 'b');
dictionary.set(2, 'c');


console.log(dictionary.get(2));
console.log(dictionary.get(3));
console.log(dictionary.keys());
console.log(dictionary.values());

dictionary.forEach(function(key,value){
	console.log(key,value)
	if(key == 1){
		return false;
	}	
});

console.log(dictionary.remove(0));

console.log(dictionary.toString());
console.log(dictionary.size());
