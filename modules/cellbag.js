cellbag: [ function(t, e) {
"use strict";
cc._RF.push(e, "367b58Mp8dHCLBQeuRxc9jH", "cellbag");
t("viewCell");
var i = t("gameConfig").itemConfig, s = t("enumcfg").qulitycolor;
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
this.isinit || this.nd_items[s].on(cc.Node.EventType.TOUCH_END, this.touchitem, this);
if (i[s]) {
this.nd_items[s].getChildByName("nd_eq").active = 1 == i[s].bs;
this.nd_items[s].getChildByName("nd_chose").active = !1;
this.nd_items[s].itemdata = i[s];
this.nd_items[s].active = !0;
this.refreshone(i[s], this.nd_items[s]);
} else {
this.nd_items[s].active = !1;
this.nd_items[s].itemdata = null;
}
}
this.target.choseditem && this.refrehclick(this.target.choseditem);
this.isinit = !0;
}
},
refrehclick: function(t) {
for (var e = 0; e < this.nd_items.length; e++) {
var i = this.nd_items[e].getChildByName("nd_chose"), s = this.nd_items[e].getChildByName("lb_count").getComponent(cc.Label);
if (this.nd_items[e].itemdata && this.nd_items[e].itemdata.uuid == t.uuid) {
if (t.lv) {
s.node.active = !0;
s.string = "+" + t.lv;
} else s.node.active = !1;
i.active = !0;
var n = this.nd_items[e].itemdata.qulity;
n || (n = 1);
var a = this, o = this.nd_items[e].getComponent(cc.Sprite);
cc.resources.load("icons/items/pz" + n, cc.SpriteFrame, function(t, e) {
!t && a.isValid && (o.getComponent(cc.Sprite).spriteFrame = e);
});
} else i.active = !1;
}
},
touchitem: function(t) {
var e = t.target.itemdata;
if (e) if (this.target.fmid) cc.uimain.createiteminfo(e, this.target.fmid, 3, t.target); else if (this.target.tiejiangmode) cc.Notifier.emit("clickequip", e); else if (null != this.target.itempos) cc.uimain.createiteminfo(e, this.target.itempos, 2, t.target); else if (this.target.ronglumode) cc.uimain.createiteminfo(e, null, 5, t.target); else if (1 == this.target.bankmode) cc.uimain.createiteminfo(e, null, 6, t.target); else if (2 == this.target.bankmode) cc.uimain.createiteminfo(e, null, 7, t.target); else if (this.target.sellmode) {
var i = s[e.qulity];
cc.uimain.createnormalinfo(e.cfg.name, "售价:" + Math.floor(e.cfg.cost / 2), "出售", "sellitem", e, i);
} else if (1 == e.cfg.type || 2 == e.cfg.type) cc.uimain.createiteminfo(e, null, 4, t.target); else if (3 == e.cfg.type) {
var n = void 0, a = "确定", o = e.cfg.subtype;
if (2 == o || 3 == o || 4 == o || 5 == o || 6 == o) {
n = "useitem";
a = "使用";
}
i = s[e.qulity];
cc.uimain.createnormalinfo(e.cfg.name, e.cfg.des, a, n, e, i);
}
},
refreshone: function(t, e) {
var s = t.qulity;
s || (s = 1);
var n = e.getChildByName("icon").getComponent(cc.Sprite), a = e.getComponent(cc.Sprite), o = e.getChildByName("lb_count").getComponent(cc.Label), c = e.getChildByName("nd_lock");
if (t.lv) {
o.node.active = !0;
o.string = "+" + t.lv;
} else if (3 == t.cfg.type) {
o.node.active = !0;
o.string = "x" + t.count;
} else o.node.active = !1;
t.suoding ? c.active = !0 : c.active = !1;
cc.resources.load("icons/items/" + i[t.id].icon, cc.SpriteFrame, function(t, e) {
t || (n.getComponent(cc.Sprite).spriteFrame = e);
});
cc.resources.load("icons/items/pz" + s, cc.SpriteFrame, function(t, e) {
t || (a.getComponent(cc.Sprite).spriteFrame = e);
});
}
});
cc._RF.pop();
}, {
enumcfg: "enumcfg",
gameConfig: "gameConfig",
viewCell: "viewCell"
} ],
