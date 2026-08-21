uiitemdetail: [ function(t, e) {
"use strict";
cc._RF.push(e, "abc809YHv1LRJ5g9K0J93Gc", "uiitemdetail");
var i = t("enumcfg"), s = t("gameConfig"), n = s.itemConfig, a = i.qulitycolor, o = i.qulityname, c = (i.typename, 
i.enumpropertyname), r = i.enumskilltypename, l = s.setcfg, h = {
1: "卸下",
2: "装备",
3: "附魔",
4: "确定",
5: "分解",
6: "存入",
7: "取出",
8: "卖出"
};
cc.Class({
extends: cc.Component,
properties: {
pb_citiao: {
default: null,
type: cc.Prefab
},
nd_info: {
default: null,
type: cc.Node
},
nd_bg: {
default: null,
type: cc.Node
},
lb_name: {
default: null,
type: cc.Label
},
lb_lv: {
default: null,
type: cc.Label
},
nd_btn: {
default: null,
type: cc.Node
},
pb_skill: {
default: null,
type: cc.Prefab
},
nd_skill: {
default: null,
type: cc.Node
},
lb_btn: {
default: null,
type: cc.Label
},
nd_tz: {
default: null,
type: cc.Node
},
nd_infotz: {
default: null,
type: cc.Node
},
nd_suoding: {
default: null,
type: cc.Node
},
lb_suoding: {
default: null,
type: cc.Label
}
},
onclicksuoding: function() {
this.itemdata.dosuoding();
this.refrshsuoding();
var t = this.uicell.getChildByName("nd_lock");
t && (this.itemdata.suoding ? t.active = !0 : t.active = !1);
},
refrshsuoding: function() {
this.itemdata.suoding ? this.lb_suoding.string = "解锁" : this.lb_suoding.string = "锁定";
},
start: function() {
this.node.on(cc.Node.EventType.TOUCH_END, function() {
this.node.destroy();
}, this);
},
onclick: function() {
if (1 == this.func) {
if (1 == cc.playerData.downequip(this.ipos)) {
cc.Notifier.emit("refreshequip");
this.node.destroy();
}
} else if (2 == this.func) {
cc.playerData.doequipfrombag(this.itemdata.uuid, this.ipos);
cc.Notifier.emit("refreshequip");
this.node.destroy();
} else if (3 == this.func) {
cc.playerData.dofumo(this.itemdata, this.ipos) && cc.uiHelper.showTips("附魔成功");
cc.Notifier.emit("refreshequip");
this.node.destroy();
} else if (4 == this.func) this.node.destroy(); else if (5 == this.func) {
var t = cc.playerData.fenjieequip(this.itemdata.uuid);
if (0 == t) {
cc.uiHelper.showTips("锁定中不能分解");
this.node.destroy();
return;
}
for (var e in t) {
var i = n[e];
cc.uiHelper.showTips("获得", "icons/items/" + i.icon, void 0, "x" + t[e]);
}
cc.Notifier.emit("refreshronglu");
this.node.destroy();
} else if (6 == this.func) {
cc.playerData.itemtobank(this.itemdata);
cc.Notifier.emit("refreshbankitem");
this.node.destroy();
} else if (7 == this.func) {
cc.playerData.banktoitem(this.itemdata);
cc.Notifier.emit("refreshbankitem");
this.node.destroy();
} else if (8 == this.func) {
0 == cc.playerData.sellequip(this.itemdata) ? cc.uiHelper.showTips("锁定中不能出售") : cc.Notifier.emit("cliciqieye", 1);
this.node.destroy();
}
},
initdata: function(t, e, i, s) {
var p = this;
this.func = i;
this.itemdata = t;
this.ipos = e;
this.uicell = s;
if (this.func) {
this.lb_btn.string = h[this.func];
this.nd_btn.active = !0;
} else this.nd_btn.active = !1;
this.nd_tz.active = !1;
this.refrshsuoding();
var d = a[t.qulity];
this.lb_name.node.color = d;
var u = t.cfg;
this.lb_name.string = u.name;
1 != u.type && 2 != u.type || (0 == t.lv ? this.lb_lv.string = " " : this.lb_lv.string = " +" + t.lv);
this.createpb("品质:" + o[t.qulity], d);
this.createpb("类型:" + t.typename, cc.Color.WHITE);
t.plusdes && this.createpb("特效:" + t.plusdes, cc.Color.GREEN);
var f = 0;
if (1 == u.type || 2 == u.type) {
var g = 0;
t.cfg.fixproperty && (g = t.cfg.fixproperty.length);
for (var y = 0; y < t.property.length; y++) {
var m = "";
if ((S = t.property[y][0]) > 100) {
S -= 100;
m = "%";
}
var b = Math.floor(t.property[y][1]);
this.createpb("  " + c[S].name + ":" + b + m, y < g ? cc.Color.GREEN : c[S].color);
}
if (t.cfg.setid) {
this.nd_tz.active = !0;
var v = cc.playerData.player.setmap[t.cfg.setid], k = l[t.cfg.setid];
this.createpb2(k.name, cc.Color.GREEN);
for (y = 0; y < k.parts.length; y++) {
var _ = k.parts[y], w = cc.Color.GRAY;
if (v) for (var x = 0; x < v.arr.length; x++) _ == v.arr[x] && (w = cc.Color.WHITE);
this.createpb2("  " + n[_].name, w);
}
for (y = 0; y < k.parmas.length; y++) {
var C = k.parmas[y];
w = null;
(!v || v.count < C.count) && (w = cc.Color.GRAY);
this.createpb2(C.count + "件效果", w || cc.Color.GREEN);
if (C.property) for (x = 0; x < C.property.length; x++) {
m = "";
if ((S = C.property[x][0]) > 100) {
S -= 100;
m = "%";
}
b = Math.floor(C.property[x][1]);
this.createpb2("  " + c[S].name + ":" + b + m, w || c[S].color);
}
if (C.weaponup) {
var S = C.weaponup[0];
b = Math.floor(C.weaponup[1]);
this.createpb2("  " + r[S].name + ":" + b + "%", w || r[S].color);
}
C.des && this.createpb2("  " + C.des, w || C.color);
}
}
if (t.fmcfg) {
this.createpb("附魔:" + t.fmcfg.name, cc.Color.CYAN);
if (t.fmcfg.property && !t.fmcfg.des) for (x = 0; x < t.fmcfg.property.length; x++) {
m = "";
if ((S = t.fmcfg.property[x][0]) > 100) {
S -= 100;
m = "%";
}
b = Math.floor(t.fmcfg.property[x][1]);
this.createpb("  " + c[S].name + ":" + b + m, c[S].color);
}
t.fmcfg.des && this.createpb(t.fmcfg.des, cc.Color.CYAN);
}
this.nd_skill.active = !1;
u.des && this.createpb(u.des, cc.Color.WHITE);
if (1 == u.type) {
for (var q = t.skills, M = 1; M < q.length; M++) {
var D = cc.instantiate(this.pb_skill);
D.getComponent("uiskillicon").initdata(q[M][0]);
this.nd_skill.addChild(D);
f = 64;
}
if (f > 0) {
this.nd_skill.active = !0;
this.createpb("技能:", cc.Color.WHITE);
}
}
}
this.node.opacity = 0;
this.scheduleOnce(function() {
p.node.opacity = 255;
}, 0);
},
createpb2: function(t, e) {
var i = cc.instantiate(this.pb_citiao);
i.getComponent(cc.Label).string = t;
i.color = e;
this.nd_infotz.addChild(i);
},
createpb: function(t, e) {
var i = cc.instantiate(this.pb_citiao);
i.getComponent(cc.Label).string = t;
i.color = e;
this.nd_info.addChild(i);
}
});
cc._RF.pop();
}, {
enumcfg: "enumcfg",
gameConfig: "gameConfig"
} ],
