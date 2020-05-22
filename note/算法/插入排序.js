// 插入排序
// 复杂度为O(n^2)

function insertionSort(arr) {
	for(var i = 1, len = arr.length, temp,j; i < len; i++) {
		j = i;
		temp = arr[i];
		while(j>0&&temp<arr[j-1]){
			arr[j] = arr[j-1];
			j--;
		}
		arr[j] = temp;
	}
	return arr;
}

// 测试
var arr = [34, 12, 13, 2, 33, 22, 75, 6, 5, 1];

console.time()
console.log(insertionSort(arr));
console.timeEnd()