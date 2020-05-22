// 选择排序
// 复杂度为O(n^2)

function selectionSort(arr) {
	for (var i = 0,len=arr.length,min; i < len; i++) {
		min = i;
		for (var j = i; j < len; j++) {
			if(arr[min]>arr[j]){
				min = j;
			}
		}
		if(i!==min){
			var temp = arr[i];
			arr[i] = arr[min];
			arr[min] = temp;
		}
	}
	return arr;
}


// 测试
var arr = [34, 12, 13, 2, 33, 22, 75, 6, 5, 1];

console.time()
console.log(selectionSort(arr));
console.timeEnd()