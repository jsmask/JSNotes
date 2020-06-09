//给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
//
//如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
//
//您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

//示例：
//
//输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
//输出：7 -> 0 -> 8
//原因：342 + 465 = 807

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
	this.val = val;
	this.next = null;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
	var res = new ListNode(),
		temp = res,
		n, step = false;
	while(l1 || l2) {
		n = (l1 ? l1.val : 0) + (l2 ? l2.val : 0);
		if(step) {
			n += 1;
			step = false;
		}
		if(n > 9) {
			step = true;
			n -= 10;
		}
		temp.next = new ListNode(n);
		temp = temp.next;
		l1&&(l1 = l1.next);
		l2&&(l2 = l2.next);
	}
	step&&(temp.next = new ListNode(1));
	return res.next;
};

var addTwoNumbers2 = function(l1, l2) {
	let node = new ListNode('head');
	let temp = node;
	let add = 0;
	let sum = 0;

	while(l1 || l2) {
		sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + add;
		temp.next = new ListNode(sum % 10);
		temp = temp.next;
		add = sum >= 10 ? 1 : 0;
		l1 && (l1 = l1.next);
		l2 && (l2 = l2.next);
	}
	add && (temp.next = new ListNode(add));
	return node.next;
};

var node1 = new ListNode(5);
//var node2 = new ListNode(4);
//var node3 = new ListNode(3);
//node1.next = node2;
//node2.next = node3;

var node4 = new ListNode(5);
//var node5 = new ListNode(6);
//var node6 = new ListNode(4);
//var node7 = new ListNode(1);
//node4.next = node5;
//node5.next = node6;
//node6.next = node7;

var res = addTwoNumbers(node1, node4);
console.log(res);

var res2 = addTwoNumbers2(node1, node4);
console.log(res2);