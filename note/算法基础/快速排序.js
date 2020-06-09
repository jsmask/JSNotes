// 快速排序
// 复杂度为O(nlog(n))

function quickSort(arr) {
	return quick(arr, 0, arr.length - 1);
}

function quick(arr, left, right) {
	var index;
	if(arr.length > 1) {
		index = partition(arr, left, right);
		if(left < index - 1) {
			quick(arr, left, index - 1);
		}
		if(right > index) {
			quick(arr, index, right);
		}
	}
	return arr;
}

function partition(arr, left, right){
	var pivot = arr[Math.floor((left+right)/2)];
	var i = left;
	var j = right;
	while(i<=j){
		while(arr[i]<pivot){
			i++
		}
		while(arr[j]>pivot){
			j--
		}
		if(i<=j){
			var temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
			i++;
			j--;
		}
	}
	return i;
}

// 测试
var arr = [34, 12, 13, 2, 33, 22, 75, 6, 5, 1];

console.time()
console.log(quickSort(arr));
console.timeEnd()