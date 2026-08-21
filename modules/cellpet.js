cellpet: [ function(t, e) {
"use strict";
cc._RF.push(e, "9c389HliCFEFr6JSGOWByK3", "cellpet");
t("viewCell");
t("gameConfig").itemConfig;
var i = t("Utils");
cc.Class({
extends: cc.viewCell,
properties: {
nd_items: {
default: [],
type: cc.Node
}
},
init: function(t, e) {
if (t >= e.array.length) this.node.active = !1; else {
this.target = e.target;
for (var i = e.array[t], s = 0; s < i.length; s++) {
var n = this.nd_items[s];
this.isinit || n.on(cc.Node.EventType.TOUCH_END, this.touchitem, this);
if (i[s]) {
n.petdata = i[s];
n.active = !0;
this.refreshone(i[s], n);
} else {
n.active = !1;
n.petdata = null;
}
}
this.target.choseditem && this.refrehclick(this.target.choseditem);
if (this.target.nochose) for (s = 0; s < this.nd_items.length; s++) this.nd_items[s].getChildByName("nd_chose").active = !1;
this.isinit = !0;
}
},
refrehclick: function(t) {
for (var e = 0; e < this.nd_items.length; e++) {
var i = this.nd_items[e].getChildByName("nd_chose");
if (this.nd_items[e].petdata && this.nd_items[e].petdata.uuid == t.uuid) {
this.target.nowlv = this.nd_items[e].getChildByName("lb_lv").getComponent(cc.Label);
i.active = !0;
} else i.active = !1;
}
},
touchitem: function(t) {
var e = t.target.petdata;
e && cc.Notifier.emit("clickpet", e);
},
refreshone: function(t, e) {
var s = "";
cc.playerData.battlepet && cc.playerData.battlepet.uuid == t.uuid && (s = "(战)");
var n = t.cfg, a = e.getChildByName("icon").getComponent(cc.Sprite), o = e.getChildByName("shan");
if (t.lighting) {
o.active = !0;
a.node.color = i.colorhuebyid(t.id);
} else {
o.active = !1;
a.node.color = new cc.Color(255, 255, 255);
}
e.getChildByName("lb_name").getComponent(cc.Label).string = t.name + s;
var c = "";
t.zhuanshen > 0 && (c = t.zhuanshen + "转");
e.getChildByName("lb_lv").getComponent(cc.Label).string = c + "lv." + t.lv;
cc.resources.load("allrole/" + n.skinres + "_d_2", cc.SpriteFrame, function(t, e) {
if (!t) {
a.getComponent(cc.Sprite).spriteFrame = e;
var i = e.getOriginalSize().height;
a.node.scale = i > 45 ? 90 / i : 2;
}
});
}
});
cc._RF.pop();
}, {
Utils: "Utils",
gameConfig: "gameConfig",
viewCell: "viewCell"
} ],
