// 计数排序
// 复杂度为O(n+k)

function countingSort(arr) {
	if(arr.length<2) return arr;
	var max = findMax(arr);
	var counts = new Array(max+1);
	arr.forEach(function(item){
		if(!counts[item]){
			counts[item] = 0;
		}
		counts[item]++;
	});
	var sortIndex = 0;
	counts.forEach(function(item,i){
		while(item>0){
			arr[sortIndex++] = i;
			item --;
		}
	})
	return arr;
}

function findMax(arr){
	var max = arr[0];
	for (var i = 1,len=arr.length; i < len; i++) {
		if(max<arr[i]) max = arr[i]
	}
	return max;
}

// 测试
var arr = [34, 12, 13, 2, 33, 22, 75, 6, 5, 1];

console.time()
console.log(countingSort(arr));
console.timeEnd()