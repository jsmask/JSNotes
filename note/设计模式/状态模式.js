// 状态模式

var FSM = {
	off:{
		name:"关闭",
		action:function(){
			console.log("触发按钮了，当前状态由"+this.currState.name+"进行改变为一级风");
		},
		change:function(){
			this.currState = this.state.lv1;
			return '开启一级风速'
		}
	},
	lv1:{
		name:"开启一级风速",
		action:function(){
			console.log("触发按钮了，当前状态由"+this.currState.name+"进行改变为二级风");
		},
		change:function(){
			this.currState = this.state.lv2;
			return '开启二级风速'
		}
	},
	lv2:{
		name:"开启二级风速",
		action:function(){
			console.log("触发按钮了，当前状态由"+this.currState.name+"进行改变为三级风");
		},
		change:function(){
			this.currState = this.state.lv3;
			return '开启三级风速'
		}
	},
	lv3:{
		name:"开启三级风速",
		action:function(){
			console.log("触发按钮了，当前状态由"+this.currState.name+"进行改变为关闭");
		},
		change:function(){
			this.currState = this.state.off;
			return '关闭'
		}
	}
}

var delegate = function(client,delegation){
	return {
		name: delegation.name,
		change:function(){
			return delegation.change.apply(client,arguments);
		},
		action:function(){
			return delegation.action.apply(client,arguments);
		}
	}
}

var Fan = function(){
//	this.offState = FSM.off;
//	this.lv1State = FSM.lv1;
//	this.lv2State = FSM.lv2;
//	this.lv3State = FSM.lv3;

//	this.offState = delegate(this,FSM.off);
//	this.lv1State = delegate(this,FSM.lv1);
//	this.lv2State = delegate(this,FSM.lv2);
//	this.lv3State = delegate(this,FSM.lv3);
	
	this.state = {
		off:delegate(this,FSM.off),
		lv1:delegate(this,FSM.lv1),
		lv2:delegate(this,FSM.lv2),
	    lv3:delegate(this,FSM.lv3)
	}
	
	this.currState = this.state.off;
}

Fan.prototype.setCurrState = function(stateName){
	this.currState = this.state[stateName] || this.state.off;
	return this;
}

Fan.prototype.init = function(){
	var btn = document.createElement("button");
	var msg = document.createElement("div");
	btn.innerHTML = "按钮";
	msg.innerHTML = "状态："+ this.currState.name;
	btn.addEventListener("click",function(e){
		this.currState.action.apply(this);
		var ret = this.currState.change.apply(this);
		msg.innerHTML = "状态："+ret;
	}.bind(this),false);
	document.body.appendChild(btn);
	document.body.appendChild(msg);
}


var fan = new Fan();

fan.setCurrState("lv1").init();
