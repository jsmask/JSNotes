
//给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
//你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

var twoSum = function(nums, target) {
   let index,count = 0;
	while(count < nums.length){
		index = nums.indexOf(target-nums[count]);
		if(index!== -1 && index!= count){
			return [index,count]
		}
		count ++;
	}
	return false;
};

var twoSum2 = function(nums, target) {
  var _result;
  nums.some(function (item, index) {
    var _index = nums.indexOf(target - item)
    if (_index !== -1 && index !== _index) {
      _result = [index, _index]
      return true
    }
  })
  return _result
};

var twoSum3 = function(nums, target) {
    let map = {};//key数字 value下标
    let loop = 0;//循环次数
    let dis;//目标与当前值的差
    while(loop < nums.length){
        dis = target - nums[loop];
        if(map[dis] != undefined){
            return [map[dis], loop];
        }
        map[nums[loop]] = loop;
        loop++;
    }
    return;
};


var nums = [-3,4,3,90], target = 0;

var res = twoSum(nums,target);

console.log(res);

var res2 = twoSum2(nums,target);
console.log(res2);

var res3 = twoSum3(nums,target);
console.log(res3);