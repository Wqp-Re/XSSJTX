uibag: [ function(t, e) {
"use strict";
cc._RF.push(e, "e319bw+25pMYawfPa6HQwL9", "uibag");
var i = t("enumcfg").enumequipos, s = t("Utils"), n = t("fumocfg"), a = t("gameConfig").itemConfig;
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
},
nd_qieye: {
default: null,
type: cc.Node
},
nd_fenjie: {
default: null,
type: cc.Node
},
tgarr: {
default: [],
type: cc.Toggle
},
nd_kong: {
default: null,
type: cc.Node
}
},
onLoad: function() {
cc.Notifier.on("refreshequip", this, this.close.bind(this));
cc.Notifier.on("useitem", this, this.useitem.bind(this));
cc.Notifier.on("useitemall", this, this.useitemall.bind(this));
cc.Notifier.on("refreshronglu", this, this.initronglu.bind(this));
cc.Notifier.on("cliciqieye", this, this.docliciqieye.bind(this));
cc.Notifier.on("sellitem", this, this.sellitem.bind(this));
cc.Notifier.on("sellitemall", this, this.sellitemall.bind(this));
},
onDestroy: function() {
cc.Notifier.off("refreshequip", this);
cc.Notifier.off("useitem", this);
cc.Notifier.off("useitemall", this);
cc.Notifier.off("refreshronglu", this);
cc.Notifier.off("cliciqieye", this);
cc.Notifier.off("sellitem", this);
cc.Notifier.off("sellitemall", this);
},
sellitemall: function(t) {
var e;
if (1 == t.cfg.type || 2 == t.cfg.type) {
e = 1;
if (0 == cc.playerData.sellequip(t)) {
cc.uiHelper.showTips("锁定中不能出售");
return;
}
} else if (8 != t.cfg.subtype) {
e = 2;
cc.playerData.sellitem(t, t.count);
} else {
e = 3;
cc.playerData.sellitem(t, t.count);
}
this.cliciqieye(null, e);
},
sellitem: function(t) {
var e;
if (1 == t.cfg.type || 2 == t.cfg.type) {
e = 1;
if (0 == cc.playerData.sellequip(t)) {
cc.uiHelper.showTips("锁定中不能出售");
return;
}
} else if (8 != t.cfg.subtype) {
e = 2;
cc.playerData.sellitem(t, 1);
} else {
e = 3;
cc.playerData.sellitem(t, 1);
}
this.cliciqieye(null, e);
},
findfm: function(t, e, i, s) {
for (var n = 0; n < e.length; n++) {
var a = e[n];
if (a) {
a.bs = s;
if (!t) {
i.push(a);
continue;
}
for (var o = 0; o < t.length; o++) {
var c = t[o];
if (a.cfg.type == c[0] && a.cfg.subtype == c[1]) {
i.push(a);
break;
}
}
}
}
},
initwithfm: function(t) {
this.nd_qieye.active = !1;
this.nd_fenjie.active = !1;
var e = n[t].type;
1 == e && (e = [ [ 1, 1 ], [ 1, 2 ], [ 1, 3 ] ]);
var i = [];
this.fmid = t;
this.findfm(e, cc.playerData.player.equiparr, i, 1);
this.findfm(e, cc.playerData.equipbag, i, 2);
var a = s.arrtoarr(i, 5);
this.nd_kong.active = 0 == a.length;
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(a.length, {
array: a,
target: this
});
},
initwithpos: function(t) {
this.nd_qieye.active = !1;
this.nd_fenjie.active = !1;
var e = 1, n = 0;
this.itempos = t;
if (t > i.weapon3) {
e = 2;
n = t - 2;
}
for (var a = cc.playerData.equipbag, o = [], c = 0; c < a.length; c++) if (a[c].cfg.type == e) {
a[c].bs = 2;
0 != n ? a[c].cfg.subtype == n && o.push(a[c]) : o.push(a[c]);
}
o = s.arrtoarr(o, 5);
this.nd_kong.active = 0 == o.length;
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(o.length, {
array: o,
target: this
});
},
initronglu: function() {
this.ronglumode = !0;
this.nd_fenjie.active = !0;
this.tbv = this.tableview.getComponent("tableView");
this.nd_qieye.active = !1;
this.cliciqieye(null, 1);
},
findeq: function(t, e, i) {
for (var s = 0; s < t.length; s++) {
var n = t[s];
if (n) {
n.bs = i;
e.push(n);
}
}
},
initall: function() {
this.tbv = this.tableview.getComponent("tableView");
this.nd_qieye.active = !0;
this.nd_fenjie.active = !1;
this.cliciqieye(null, 1);
},
initsell: function() {
this.sellmode = !0;
this.tbv = this.tableview.getComponent("tableView");
this.nd_qieye.active = !0;
this.nd_fenjie.active = !1;
this.cliciqieye(null, 1);
},
docliciqieye: function(t) {
this.cliciqieye(null, t);
},
cliciqieye: function(t, e) {
this.nowqieye = e;
var i = [];
if (1 == e) this.findeq(cc.playerData.equipbag, i, 2); else if (2 == e) for (var n = cc.playerData.itembag, a = 0; a < n.length; a++) (o = n[a]) && 8 != o.cfg.subtype && i.push(o); else if (3 == e) for (n = cc.playerData.itembag, 
a = 0; a < n.length; a++) {
var o;
(o = n[a]) && 8 == o.cfg.subtype && i.push(o);
}
i = s.arrtoarr(i, 5);
this.nd_kong.active = 0 == i.length;
this.tbv.initTableView(i.length, {
array: i,
target: this
});
},
useitem: function(t) {
var e = cc.playerData.useitem(t);
if (6 != t.cfg.subtype) if (e) cc.uiHelper.showTips(e); else {
cc.uiHelper.showTips("学习成功");
this.cliciqieye(null, this.nowqieye);
} else {
cc.uiHelper.showTips("获得" + a[e].name + "x1");
this.cliciqieye(null, this.nowqieye);
}
},
useitemall: function(t) {
var e = t.count;
if (6 != t.cfg.subtype) if (n = cc.playerData.useitem(t)) cc.uiHelper.showTips(n); else {
cc.uiHelper.showTips("学习成功");
this.cliciqieye(null, this.nowqieye);
} else {
for (var i = {}, s = 0; s < e; s++) {
var n = cc.playerData.useitem(t), o = a[n].name;
i[o] || (i[o] = 0);
i[o]++;
}
for (var c in i) cc.uiHelper.showTips("获得" + c + "x" + i[c]);
this.cliciqieye(null, this.nowqieye);
}
},
close: function() {
this.node.destroy();
},
clickplfenjie: function() {
var t = this;
cc.uiHelper.messageBox("批量分解", "确定要批量分解？", function() {
for (var e = [], i = 0; i < t.tgarr.length; i++) e.push(t.tgarr[i].isChecked);
var s = cc.playerData.piliangfenjie(e);
for (var n in s) {
var o = a[n];
cc.uiHelper.showTips("获得", "icons/items/" + o.icon, void 0, "x" + s[n]);
}
t.initronglu();
});
},
clickplsell: function() {
var t = this;
cc.uiHelper.messageBox("批量卖出", "确定要批量卖出？", function() {
for (var e = [], i = 0; i < t.tgarr.length; i++) e.push(t.tgarr[i].isChecked);
cc.playerData.piliangselleq(e) && cc.uiHelper.showTips("出售完成");
t.initronglu();
});
},
onclickzhengli: function() {
cc.playerData.zhengli();
this.cliciqieye(null, this.nowqieye);
}
});
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
fumocfg: "fumocfg",
gameConfig: "gameConfig"
} ],
