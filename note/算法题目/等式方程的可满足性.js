
//给定一个由表示变量之间关系的字符串方程组成的数组，每个字符串方程 equations[i] 的长度为 4，
//并采用两种不同的形式之一："a==b" 或 "a!=b"。在这里，a 和 b 是小写字母（不一定不同），表示单字母变量名。
//只有当可以将整数分配给变量名，以便满足所有给定的方程时才返回 true，否则返回 false。 

// 解法：并查集数据结构解决方案  => 可以利用路径压缩（隔代压缩，完全压缩）或者按秩合并

var equationsPossible = function(equations) {
	const arr = new Set([...equations])
	const unionfind = {};
	for(const [c1, c2, c3, c4] of arr) {
		if(c2 === "=") {
			union(c1,c4);
		}
	}
	
	for(const [c1, c2, c3, c4] of arr) {
		const x = find(c1);
		const y = find(c4);
		if(c2 === "!") {
			if(x === y)	return false;
		}
	}
	
	return true;
	
	function union(n,m){
		n = find(n);
		m = find(m);
		unionfind[m] = n;
	}
	
	function find(i){
		if(!unionfind[i]) return (unionfind[i] = i);
		return unionfind[i] === i ? i : (unionfind[i] = find(unionfind[i]));
	}
};

var equationsPossible2 = function(equations) {
	const arr = new Set([...equations])
	const list = {};
	for(const [c1, c2, c3, c4] of arr) {
		if(c2 === "=") {	
			createSet(c1,c4,false);
		}
	}
	
	for(const key in list){
		var items = list[key];
		for (let item of items.values()) {
			list[item].forEach(n=>{
				items.add(n)
			})
		}
	}
	
	for(const [c1, c2, c3, c4] of arr) {
		if(c2 === "!") {
			if((list[c1]&&list[c1].has(c4))||c1 === c4) return false;
		}
	}
	return true;
	
	function createSet(key,val,stop){
		if(!list[key]) list[key] = new Set(val);
		else list[key]&&list[key].add(val);
		if(!stop) createSet(val,key,true);
	}
};

var arr = [["a==b","b!=a"]];

var res = equationsPossible(arr);
console.log(res)

var res2 = equationsPossible2(arr);
console.log(res2)