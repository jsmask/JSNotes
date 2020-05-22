// 冒泡排序
// 复杂度为O(n^2)

function bubbleSort(arr){
	for (var i=0,len = arr.length;i < len;i++) {
		for (var j = 0; j < len-1-i; j++) {
			if(arr[j]>arr[j+1]){
				var temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}	
		}
		console.log(arr)
		console.log('-----------------')
	}
	return arr;
}

// 测试
var arr = [34,12,13,2,33,22,75,6,5,1];

console.time()
console.log(bubbleSort(arr));
console.timeEnd()

