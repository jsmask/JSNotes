// 发布订阅模式
var $Event = (function(){
	var _listen,_trigger,_remove;
	var clientList = [];
	
	//迭代器
	var each = function(ary,fn){
		var ret;
		for (var i = 0; i < ary.length; i++) {
			var n = ary[i];
			ret = fn.call(n,i,n);
		}
		return ret;
	}
	
	//订阅
	_listen = function(key,fn){
		if(!clientList[key]){
			clientList[key] = [];
		}
		clientList[key].push(fn);
	}
	
	//发布
	_trigger = function(){
		var key = Array.prototype.shift.call(arguments);
		var fns = clientList[key];
		var args = arguments;
		if(!fns||fns.length==0)	return false;
		return each(fns,function(i,fn){
			return fn.apply(this,args);
		});
	}
	
	//移除
	_remove = function(key,fn){
		var fns = clientList[key];
		if(!fns) return false;
		if(!fn) fns && (fns.length = 0);
		for (var i = fns.length-1; i >= 0 ; i--) {
			if(fns[i] === fn){
				fns.splice(i,1);
			}
		}
	}
	
	return {
		listen:_listen,
		trigger:_trigger,
		remove:_remove
	}
	
})();


/** 测试  **/
$Event.listen("etA",fn1 = function(args){
	console.log("佐助与"+args.name+"组成了cp.");
});

$Event.listen("etA",fn2 = function(args){
	console.log("鸣人受到"+args.skill+"攻击..");
});

var mr = {
	num:0,
	cp:null
}
$Event.listen("etB",fn3 = function(args){
	var index = args.index || 0;
	mr.num += args.num;
	console.log(index+":"+"鸣人与"+args.name+"好感度+"+args.num);
	if(mr.num >=100){
		if(!mr.cp){
			mr.cp = args;
			console.log(index+":"+"鸣人与"+args.name+"组成了cp.");	
		}
	}
});

$Event.listen("etC",fn4 = function(args){
	console.log("自来也战死,"+args.name+"伤心了...");
});

$Event.listen("etC",fn5 = function(args){
	console.log("自来也与"+args.name+"组成了cp.");
});

$Event.trigger("etA",{
	name:'小樱',
	skill:"爱情飞踢"
})

var count = 0;
while(count<7){
	(function(count){
		var timer = setTimeout(function(){	
			$Event.trigger("etB",{
				name:'雏田',
				num:~~(20*Math.random())+10,
				index:count
			},1000);
		},200*count);
	})(count);
	count++;
}


$Event.remove("etC",fn5);

$Event.trigger("etC",{
	name:'纲手',
	skill:"百豪之术"
});