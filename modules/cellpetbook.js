cellpetbook: [ function(t, e) {
"use strict";
cc._RF.push(e, "d53ce0tfNVIQ6OnNHGqKSsy", "cellpetbook");
t("viewCell");
var i = t("monstercfg");
cc.Class({
extends: cc.viewCell,
properties: {
lb_name: {
default: null,
type: cc.Label
},
sp_icon: {
default: null,
type: cc.Sprite
},
nd_n: {
default: null,
type: cc.Node
},
nd_l: {
default: null,
type: cc.Node
},
nd_b: {
default: null,
type: cc.Node
},
nd_bl: {
default: null,
type: cc.Node
},
lb_jiacheng: {
default: null,
type: cc.Label
}
},
init: function(t, e) {
if (t >= e.array.length) this.node.active = !1; else {
var s = e.array[t], n = i[s];
this.nd_n.color = cc.Color.GRAY;
this.nd_l.color = cc.Color.GRAY;
this.nd_b.color = cc.Color.GRAY;
this.nd_bl.color = cc.Color.GRAY;
this.lb_jiacheng.string = "属性加成:0%";
var a = this;
this.lb_name.string = n.name;
cc.resources.load("allrole/" + n.skinres + "_d_2", cc.SpriteFrame, function(t, e) {
if (!t && a.isValid) {
a.sp_icon.getComponent(cc.Sprite).spriteFrame = e;
var i = e.getOriginalSize().height;
a.sp_icon.node.scale = i > 45 ? 90 / i : 2;
}
});
var o = cc.playerData.petbook[s];
if (o) {
1 & o && (this.nd_n.color = cc.Color.GREEN);
2 & o && (this.nd_l.color = cc.Color.GREEN);
4 & o && (this.nd_b.color = cc.Color.GREEN);
8 & o && (this.nd_bl.color = cc.Color.GREEN);
this.lb_jiacheng.string = "属性加成:" + cc.playerData.getscorebyid(s) + "%";
}
}
}
});
cc._RF.pop();
}, {
monstercfg: "monstercfg",
viewCell: "viewCell"
} ],
