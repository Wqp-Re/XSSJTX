cellequipskill: [ function(t, e) {
"use strict";
cc._RF.push(e, "10e63Gn1hpDCpEC26FGcrUe", "cellequipskill");
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
var a = this;
cc.resources.load("icons/skills/" + n, cc.SpriteFrame, function(t, e) {
t || (a.sp_icon.spriteFrame = e);
});
}
},
onclick: function() {
if (cc.playerData.player.equipskill(this.sid, this.target.skillidx)) {
cc.Notifier.emit("refreshskill");
this.target.node.destroy();
} else cc.uiHelper.showTips("不能重复装备");
}
});
cc._RF.pop();
}, {
Utils: "Utils",
skillcfg: "skillcfg",
viewCell: "viewCell"
} ],
