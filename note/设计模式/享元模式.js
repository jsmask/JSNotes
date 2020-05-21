// 享元模式

//兵器种类
var weaponType = {
	sword: "长剑",
	knife: "刀",
	arch: "弓",
	spear: "矛",
	other: "其他"
}

//兵器函数
var Weapon = function(type) {
	this.type = type;
	this.typeName = weaponType[type];
}
Weapon.prototype.levelUp = function(id) {
	weaponManager.set(id, this);
	this.dom.querySelector(".level-btn").innerHTML = "强化+" + this.level;
}
Weapon.prototype.del = function(id) {
	weaponManager.set(id, this);
	this.dom.parentNode.removeChild(this.dom);
}

//兵器工坊
var weaponFactory = (function() {
	var weaponObj = {};
	return {
		create: function(type) {
			if(weaponObj[type]) {
				return weaponObj[type]
			}
			return weaponObj[type] = new Weapon(type);
		}
	}
})();

//兵器生产管理器
var weaponManager = (function() {
	var weaponList = {};
	return {
		add: function(type, id, params) {
			var weapon = weaponFactory.create(type);
			var dom = this.createDom(weapon, id, params)
			weaponList[id] = {
				id: id,
				dom: dom
			};

			for(var key in params) {
				weaponList[id][key] = params[key]
			}

			return weapon;
		},
		set: function(id, obj) {
			var weaponData = weaponList[id];
			for(var key in weaponData) {
				obj[key] = weaponData[key];
			}
		},
		createDom: function(weapon, id, params) {
			var dom = document.createElement("div");
			dom.style.marginBottom = "8px";
			dom.innerHTML = "编号:" + id + "，种类:" + weapon.typeName + " " +
				"，重量:" + params.weight + "kg，长度:" + params.length + "kg ";

			var level_btn = document.createElement("button");
			level_btn.innerHTML = "强化+" + params.level;
			level_btn.className = "level-btn";

			var del_btn = document.createElement("button");
			del_btn.innerHTML = "销毁";

			del_btn.addEventListener("click", function(e) {
				weapon.del(id);
				delete weaponList[id];
			}, false);

			level_btn.addEventListener("click", function(e) {
				weaponList[id]["level"] += 1;
				weapon.levelUp(id);
			}, false);

			dom.appendChild(level_btn);
			dom.appendChild(del_btn);
			document.querySelector("body").appendChild(dom);
			return dom;
		}
	}
})();

//武器生成控制器
var WeaponPlanController = (function() {
	var ids = 0;
	return {
		start: function(type, list) {
			for(var i = 0, w; w = list[i++];) {
				weaponManager.add(type, ++ids, w);
			}
		}
	}
})();

// 模拟
var weaponPlanList1 = [{
	weight: 2,
	length: 0.63,
	level: 1
}, {
	weight: 1.8,
	length: 0.73,
	level: 1
}, {
	weight: 2.1,
	length: 0.69,
	level: 1
}]

var weaponPlanList2 = [{
	weight: 2.4,
	length: 0.98,
	level: 1
}, {
	weight: 2.2,
	length: 0.77,
	level: 1
}, {
	weight: 1.7,
	length: 0.6,
	level: 1
}, {
	weight: 1.9,
	length: 0.84,
	level: 1
}];

var weaponPlanList3 = [{
	weight: 2.69,
	length: 2.98,
	level: 1
}, {
	weight: 2.11,
	length: 2.38,
	level: 1
}];

WeaponPlanController.start("sword", weaponPlanList1);

WeaponPlanController.start("knife", weaponPlanList2);

WeaponPlanController.start("spear", weaponPlanList3);