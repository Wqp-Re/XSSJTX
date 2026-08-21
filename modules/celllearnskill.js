celllearnskill: [ function(t, e) {
"use strict";
cc._RF.push(e, "973d6Eh91FFBJOXA9t0y9g0", "celllearnskill");
t("viewCell");
t("Utils");
var i = t("skillcfg");
cc.Class({
extends: cc.viewCell,
properties: {
lb_name: {
default: null,
type: cc.Label
},
lb_des: {
default: null,
type: cc.Label
},
lb_cost: {
default: null,
type: cc.Label
},
sp_icon: {
default: null,
type: cc.Sprite
}
},
init: function(t, e) {
if (t >= e.array.length) this.node.active = !1; else {
this.target = e.target;
this.sid = e.array[t];
var s = i[this.sid], n = s.icon;
this.lb_name.string = s.name;
this.lb_des.string = s.des;
this.lb_cost.string = s.cost;
this.costmoney = s.cost;
var a = this;
cc.resources.load("icons/skills/" + n, cc.SpriteFrame, function(t, e) {
t || (a.sp_icon.spriteFrame = e);
});
}
},
onclick: function() {
var t = this.target.pet.learnskill(this.sid, this.costmoney);
if (0 == t) {
cc.uiHelper.showTips("学习成功");
cc.Notifier.emit("refreshskill", this.target.pet);
this.target.node.destroy();
} else 1 == t ? cc.uiHelper.showTips("金币不足") : 2 == t && cc.uiHelper.showTips("技能已满");
}
});
cc._RF.pop();
}, {
Utils: "Utils",
skillcfg: "skillcfg",
viewCell: "viewCell"
} ],
