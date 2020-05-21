// 命令模式
var Command = (function() {
	var commandStack = [];
	var makeCommand = function(receiver) {
		return {
			//执行
			action: function(state) {
				if(!receiver[state]) return;
				receiver[state]();
				commandStack.push(receiver[state]);
			},
			//回放
			play: function() {
				var action, list = [].concat.call(commandStack);
				while(action = list.shift()) action()
			},
			//清空
			clear: function() {
				commandStack.length = 0;
			},
			//撤销
			undo: function() {
				if(commandStack.length <= 0) return;
				return commandStack.pop();
			}
		}
	}
	return makeCommand;
})();

var Ryu = {
	up: function() {
		console.log("命令：向上运动")
	},
	down: function() {
		console.log("命令：向下运动")
	},
	left: function() {
		console.log("命令：向左运动")
	},
	right: function() {
		console.log("命令：向右运动")
	},
	attack: function() {
		console.log("命令：发动攻击")
	},
}

var keyData = {
	38: "up",
	40: "down",
	37: "left",
	39: "right",
	75: "attack"
}

// 测试
var command = new Command(Ryu);

var btn0 = document.createElement("button");
btn0.innerHTML = "回放";
document.querySelector("body").appendChild(btn0);

var btn1 = document.createElement("button");
btn1.innerHTML = "撤销";
document.querySelector("body").appendChild(btn1);

window.addEventListener("keydown", function(e) {
	command.action(keyData[e.keyCode]);
});

btn0.addEventListener("click", function(e) {
	console.log("---【回放】 ---");
	command.play();
	command.clear();
})

btn1.addEventListener("click", function(e) {
	console.log("---【撤销 】---");
	var prevFn = command.undo();
	if(prevFn) prevFn();
})