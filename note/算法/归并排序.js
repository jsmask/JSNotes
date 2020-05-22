// 归并排序
// 复杂度为O(nlog(n))

function mergeSort(arr) {
	var len = arr.length;
	
	if(len>1){
		var middle = Math.floor(len/2);
		var left = mergeSort(arr.slice(0,middle));
		var right = mergeSort(arr.slice(middle,len));
		arr = merge(left,right)
		
	}
	return arr;
}

function merge(left,right) {
	var i = 0;
	var j = 0;
	var ret = [];
	while(i<left.length&&j<right.length){
		ret.push(left[i]<right[j]?left[i++]:right[j++]);
	}
	return ret.concat(i<left.length?left.slice(i):right.slice(j));
}

// 测试
//var arr = [34, 12, 13, 2, 33, 22, 75, 6, 5, 1];
var arr = [3,2,1];

console.time()
console.log(mergeSort(arr));
console.timeEnd()