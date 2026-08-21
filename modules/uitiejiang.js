uitiejiang: [ function(t, e) {
"use strict";
cc._RF.push(e, "0f002Vw7jtOPoo4ZdB8QAE0", "uitiejiang");
var i = t("Utils"), s = t("enumcfg"), n = s.qulitycolor, a = (s.typename, s.enumpropertyname), o = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {
lb_qianghuacost: {
default: null,
type: cc.Label
},
lb_xiliancost: {
default: null,
type: cc.Label
},
lb_name: {
default: null,
type: cc.Label
},
lb_lv: {
default: null,
type: cc.Label
},
nd_normal: {
default: null,
type: cc.Node
},
nd_xilian: {
default: null,
type: cc.Node
},
nd_tableview: {
default: null,
type: cc.Node
},
pb_citiao: {
default: null,
type: cc.Prefab
},
nd_qianghua: {
default: null,
type: cc.Node
},
nd_weaponskill: {
default: null,
type: cc.Node
},
nd_skillicon: {
default: [],
type: cc.Node
},
lb_skillitem: {
default: null,
type: cc.Label
},
nd_shengjie: {
default: null,
type: cc.Node
}
},
onLoad: function() {
cc.Notifier.on("clickequip", this, this.refreshqeuip.bind(this));
},
onDestroy: function() {
cc.Notifier.off("clickequip", this, this.refreshqeuip.bind(this));
},
createpb: function(t, e, i) {
var s = cc.instantiate(this.pb_citiao);
s.getComponent(cc.Label).string = t;
s.color = e;
i ? this.nd_normal.addChild(s) : this.nd_xilian.addChild(s);
},
refreshqeuip: function(t) {
for (var e = this.tbv.content.children, i = 0; i < e.length; i++) {
var s = e[i]._children[0];
this.choseditem = t;
s.getComponent("cellbag").refrehclick(t);
}
this.nd_normal.destroyAllChildren();
this.nd_xilian.destroyAllChildren();
var o = t.cfg;
t.lv > 0 ? this.lb_lv.string = " +" + t.lv : this.lb_lv.string = " ";
this.lb_name.string = o.name;
var c = n[t.qulity];
this.lb_name.node.color = c;
6 == o.subtype || 7 == o.subtype ? this.nd_qianghua.active = !1 : this.nd_qianghua.active = !0;
var r = 0;
o.fixproperty && (r = o.fixproperty.length);
for (i = 0; i < t.property.length; i++) {
var l = t.property[i][0], h = "";
if (l > 100) {
l -= 100;
h = "%";
}
var p = Math.floor(t.property[i][1]);
this.createpb(a[l].name + ":" + p + h, i < r ? cc.Color.GREEN : cc.Color.WHITE, i < r);
}
this.lb_qianghuacost.string = t.getqhcost();
this.choseitem = t;
this.lb_xiliancost.string = cc.playerData.getitemcountbyid(30002);
this.lb_skillitem.string = cc.playerData.getitemcountbyid(30004);
if (1 == o.type) {
for (var d = t.skills, u = 1; u < 4; u++) {
var f = this.nd_skillicon[u - 1];
if (u < d.length) {
f.active = !0;
f.getComponent("uiskillicon").initdata(d[u][0], u);
} else f.active = !1;
}
this.nd_weaponskill.active = !0;
} else this.nd_weaponskill.active = !1;
this.nd_shengjie.active = t.canjinhua();
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
start: function() {
var t = [];
this.findeq(cc.playerData.player.equiparr, t, 1);
this.findeq(cc.playerData.equipbag, t, 2);
this.tiejiangmode = !0;
t = i.arrtoarr(t, 5);
this.tbv = this.nd_tableview.getComponent("tableView");
this.tbv.initTableView(t.length, {
array: t,
target: this
});
cc.Notifier.emit("clickequip", t[0][0]);
if (cc.suojineng) for (var e = 1; e < 4; e++) this.nd_skillicon[e - 1].getComponent("uiskillicon").setcallback(e, this);
},
refreshskillchose: function() {
for (var t = 1; t < 4; t++) {
var e = this.nd_skillicon[t - 1];
e.skillpos == this.skillpos ? e.getChildByName("lock").active = !0 : e.getChildByName("lock").active = !1;
}
},
close: function() {
this.node.destroy();
},
clickqh: function() {
var t = this.choseitem.lvup();
t ? 1 == t ? cc.uiHelper.showTips("强化等级不能超过角色等级") : 2 == t && cc.uiHelper.showTips("金币不足") : this.refreshqeuip(this.choseitem);
},
autoclickqh: function() {
for (;!this.choseitem.lvup(); ) ;
this.refreshqeuip(this.choseitem);
},
huishou: function() {
this.choseitem.huishou(.8);
this.refreshqeuip(this.choseitem);
},
adhuishou: function() {
var t = this;
o.adWatch("jiesuan", function() {
t.choseitem.huishou(1);
});
this.refreshqeuip(this.choseitem);
},
clickxl: function() {
this.choseitem.xilian() ? this.refreshqeuip(this.choseitem) : cc.uiHelper.showTips("重铸石不足");
},
clickxskill: function() {
this.choseitem.xiskill(this.skillpos) ? this.refreshqeuip(this.choseitem) : cc.uiHelper.showTips("武器技能水不足");
},
clickshengjie: function() {
this.choseitem.dojinhua() && this.refreshqeuip(this.choseitem);
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
Utils: "Utils",
enumcfg: "enumcfg"
} ],
