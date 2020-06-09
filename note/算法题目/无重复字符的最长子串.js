//给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
//
//示例 1:
//
//输入: "abcabcbb"
//输出: 3 
//解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

//示例 2:
//
//输入: "bbbbb"
//输出: 1
//解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
//示例 3:
//
//输入: "pwwkew"
//输出: 3
//解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。


/**
 * @param {string}
 * @return {number}
 */

// 解法： 滑动窗口
var lengthOfLongestSubstring = function(s) {
	if(!s.length) return 0;
	let count = 0,str ="",index,max=1,left=0,idx;
	while(count<s.length){	
		idx = str.indexOf(s.charAt(count));
		if(idx !== -1){
			left += idx + 1;
		}
		str = s.slice(left,count+1);
		max = Math.max(str.length,max);
		count ++;
	}
    return max;
};


var lengthOfLongestSubstring2 = function(s) {

};



var str = "abcaebcbb";
var res = lengthOfLongestSubstring(str);
//var res2 = lengthOfLongestSubstring2(str);
console.log(res);
//console.log(res2);
