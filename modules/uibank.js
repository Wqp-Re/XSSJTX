uibank: [ function(t, e) {
"use strict";
cc._RF.push(e, "0f4a79gu8VN4K6G3Dkc/IvP", "uibank");
var i = t("Utils");
t("gameConfig").itemConfig;
cc.Class({
extends: cc.Component,
properties: {
tableviewitem: {
default: null,
type: cc.Node
},
tableviewpet: {
default: null,
type: cc.Node
},
nd_kong: {
default: null,
type: cc.Node
},
btn_zhengli: {
default: null,
type: cc.Node
}
},
onLoad: function() {
cc.Notifier.on("refreshbankitem", this, this.refreshitem.bind(this));
cc.Notifier.on("clickpet", this, this.clickpet2.bind(this));
cc.Notifier.on("cunpet", this, this.cunpet.bind(this));
cc.Notifier.on("qupet", this, this.qupet.bind(this));
},
onDestroy: function() {
cc.Notifier.off("refreshbankitem", this);
cc.Notifier.off("clickpet", this);
cc.Notifier.off("cunpet", this);
cc.Notifier.off("qupet", this);
},
cunpet: function(t) {
cc.playerData.pettobank(t);
this.refreshpet();
},
qupet: function(t) {
cc.playerData.banktopet(t);
this.refreshpet();
},
clickpet2: function(t) {
1 == this.bankmode ? cc.uimain.createnormalinfo(t.name, "", "存放", "cunpet", t) : 2 == this.bankmode && cc.uimain.createnormalinfo(t.name, "", "取出", "qupet", t);
},
initdata: function(t) {
this.itemactive = !1;
this.petactive = !1;
this.nochose = !0;
this.bankmode = t;
1 == this.bankmode && (this.btn_zhengli.active = !1);
this.tbvitem = this.tableviewitem.getComponent("tableView");
this.tbvpet = this.tableviewpet.getComponent("tableView");
this.refreshitem();
this.refreshpet();
this.clickitem();
},
refreshitem: function() {
for (var t = [], e = 1 == this.bankmode ? cc.playerData.equipbag : cc.playerData.bankequip, s = 0; s < e.length; s++) {
var n = e[s];
if (n) {
n.bs = 2;
t.push(n);
}
}
t = i.arrtoarr(t, 5);
this.itemactive = 0 == t.length;
this.nd_kong.active = this.itemactive;
this.tbvitem.initTableView(t.length, {
array: t,
target: this
});
},
refreshpet: function() {
for (var t = [], e = 1 == this.bankmode ? cc.playerData.petbag : cc.playerData.bankpet, s = 0; s < e.length; s++) {
var n = e[s];
n != cc.playerData.battlepet && t.push(n);
}
t = i.arrtoarr(t, 2);
this.petactive = 0 == t.length;
this.nd_kong.active = this.petactive;
this.tbvpet.initTableView(t.length, {
array: t,
target: this
});
},
close: function() {
this.node.destroy();
},
clickitem: function() {
this.nd_kong.active = this.itemactive;
this.tableviewitem.active = !0;
this.tableviewpet.active = !1;
},
clickpet: function() {
this.nd_kong.active = this.petactive;
this.tableviewitem.active = !1;
this.tableviewpet.active = !0;
},
clickzhengli: function() {
cc.playerData.bankpet = cc.playerData.bankpet.sort(function(t, e) {
return t.id - e.id;
});
cc.playerData.bankequip = cc.playerData.bankequip.sort(function(t, e) {
return t.id - e.id;
});
this.tableviewitem.active ? this.refreshitem() : this.refreshpet();
}
});
cc._RF.pop();
}, {
Utils: "Utils",
gameConfig: "gameConfig"
} ],
