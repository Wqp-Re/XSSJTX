uipet: [ function(t, e) {
"use strict";
cc._RF.push(e, "323beJym3RD6aZJXCus1iDU", "uipet");
var i = t("Utils"), s = t("enumcfg"), n = s.qulitycolor, a = (s.typename, s.enumpropertyname), o = s.enumproperty, c = t("gamevaule"), r = t("talentcfg");
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
},
nd_skill: {
default: null,
type: cc.Node
},
nd_state: {
default: null,
type: cc.Node
},
nd_bp: {
default: null,
type: cc.Node
},
nd_state1: {
default: null,
type: cc.Node
},
nd_state2: {
default: null,
type: cc.Node
},
nd_state3: {
default: null,
type: cc.Node
},
nd_skilllist: {
default: null,
type: cc.Node
},
nd_talent: {
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
lb_fire: {
default: null,
type: cc.Label
},
lb_water: {
default: null,
type: cc.Label
},
lb_thunder: {
default: null,
type: cc.Label
},
lb_lvcout: {
default: null,
type: cc.Label
},
lb_xlcout: {
default: null,
type: cc.Label
},
lb_bpall: {
default: null,
type: cc.Label
},
pb_citiao: {
default: null,
type: cc.Prefab
},
pb_skill: {
default: null,
type: cc.Prefab
},
pb_bp: {
default: null,
type: cc.Prefab
},
nd_zhuanshen: {
default: null,
type: cc.Node
}
},
onLoad: function() {
cc.Notifier.on("forgetskill", this, this.forgetskill.bind(this));
cc.Notifier.on("refreshskill", this, this.refreshskill.bind(this));
cc.Notifier.on("clickpet", this, this.refreshall.bind(this));
},
onDestroy: function() {
cc.Notifier.off("forgetskill", this);
cc.Notifier.off("refreshskill", this);
cc.Notifier.off("clickpet", this);
},
forgetskill: function(t) {
var e = this;
cc.uiHelper.messageBox("遗忘技能", "确定要遗忘该技能？", function() {
t.pet.forgetskill(t.skillid);
e.refreshskill(t.pet);
});
},
refreshfs: function() {
var t = cc.playerData.petbag;
if (0 != t.length) {
t = i.arrtoarr(t, 2);
this.tbv.initTableView(t.length, {
array: t,
target: this
});
cc.Notifier.emit("clickpet", t[0][0]);
} else {
cc.uiHelper.showTips("你没有宠物");
this.node.destroy();
}
},
start: function() {
var t = cc.playerData.petbag;
t = i.arrtoarr(t, 2);
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(t.length, {
array: t,
target: this
});
this.gamevaule = new c();
for (var e = 0; e < 6; e++) {
var s = cc.instantiate(this.pb_citiao);
this.nd_state1.addChild(s);
var n = cc.instantiate(this.pb_citiao);
this.nd_state2.addChild(n);
var a = cc.instantiate(this.pb_citiao);
this.nd_state3.addChild(a);
var o = cc.instantiate(this.pb_bp);
this.nd_bp.addChild(o);
}
for (e = 0; e < 5; e++) {
s = cc.instantiate(this.pb_skill);
this.nd_skilllist.addChild(s);
}
cc.Notifier.emit("clickpet", t[0][0]);
},
refreshall: function(t) {
var e = this;
this.choseditem = t;
for (var i = this.tbv.content.children, s = 0; s < i.length; s++) i[s]._children[0].getComponent("cellpet").refrehclick(t);
this.petdata = t;
this.nd_talent.destroyAllChildren();
var a = t.cfg.talent;
if (a) for (var o = function(t) {
var i = r[a[t]], s = cc.instantiate(e.pb_citiao);
s.getComponent(cc.Label).string = i.name;
s.on(cc.Node.EventType.TOUCH_END, function() {
cc.uimain.createnormalinfo(i.name, i.des, "确定");
});
s.color = n[i.qulity];
e.nd_talent.addChild(s);
}, c = 0; c < a.length; c++) o(c);
this.nd_zhuanshen.active = t.canzhuanshen();
this.refreshstate(t);
this.refreshskill(t);
this.onshuxing();
},
setcitiao: function(t, e) {
for (var i = 0; i < e.length; i++) {
var s = a[e[i]].name + ":" + Math.floor(this.gamevaule.getrealvaule(e[i]));
t[i].getComponent(cc.Label).string = s;
}
},
refreshskill: function(t) {
for (var e = t.skills, i = this.nd_skilllist.getChildren(), s = 0; s < 5; s++) i[s].getComponent("skillpet").initdata(e[s + 1], t);
},
refreshstate: function(t) {
var e = t.cfg;
this.lb_name.string = e.name;
this.lb_lv.string = " lv:" + t.lv;
this.gamevaule.initpet(t.id, t, !0);
var i = this.nd_state1.getChildren(), s = this.nd_state2.getChildren(), n = this.nd_state3.getChildren(), a = this.nd_bp.getChildren(), c = o, r = [ c.vit, c.str, c.dex, c.agi, c.int, c.luk ], l = [ c.maxhp, c.atk, c.def, c.matk, c.mdef, c.atkspeed ], h = [ c.flee, c.hit, c.cri, c.cridmg, c.xixue, c.movespeed ];
this.setcitiao(i, r);
this.setcitiao(s, l);
this.setcitiao(n, h);
this.lb_water.string = e.element[0];
this.lb_fire.string = e.element[1];
this.lb_thunder.string = e.element[2];
var p = [ "体质", "力量", "灵巧", "敏捷", "智力", "幸运" ], d = e.bp, u = 2, f = 0;
if (t.isboss) {
f += 2;
u += 1;
}
if (t.lighting) {
f += 1;
u += 1;
}
for (var g = 0, y = 0, m = 0; m < 6; m++) {
var b = d[m] + f + u * t.zhuanshen;
g += t.bp[m];
y += b;
a[m].getChildByName("lb_bp").getComponent(cc.Label).string = p[m] + t.bp[m] + "/" + b;
a[m].getChildByName("pr_tf").getComponent(cc.ProgressBar).progress = t.bp[m] / b;
}
this.lb_bpall.string = "总计:" + g + "/" + y;
this.lb_lvcout.string = this.petdata.getqhcost();
this.lb_xlcout.string = cc.playerData.getitemcountbyid(30003);
},
close: function() {
this.node.destroy();
},
onlvup: function() {
var t = this.petdata.lvup();
if (t) 1 == t ? cc.uiHelper.showTips("宠物不能超过角色等级") : 2 == t && cc.uiHelper.showTips("金币不足"); else {
this.refreshstate(this.petdata);
var e = "";
this.petdata.zhuanshen > 0 && (e = this.petdata.zhuanshen + "转");
this.nowlv.string = e + "lv." + this.petdata.lv;
}
},
onxilian: function() {
this.petdata.xilian() ? this.refreshstate(this.petdata) : cc.uiHelper.showTips("洗档卷不足");
},
onshuxing: function() {
this.nd_state.active = !0;
this.nd_skill.active = !1;
},
onskill: function() {
this.nd_state.active = !1;
this.nd_skill.active = !0;
},
onclickfs: function() {
var t = this;
cc.uiHelper.messageBox("放生", "确定要放生该宠物", function() {
cc.playerData.fangsheng(t.petdata) ? t.refreshfs() : cc.uiHelper.showTips("上阵的宠物不能放生");
});
},
onclickzhuanshen: function() {
var t = this;
cc.uiHelper.messageBox("转生", "每次转生后全成长+2,首领额外+1,闪光额外+1，转生将扣除转生所需等级的经验", function() {
if (t.petdata.dozhuanshen()) {
cc.uiHelper.showTips("转生成功");
t.refreshall(t.petdata);
t.nowlv.string = t.petdata.zhuanshen + "转lv." + t.petdata.lv;
}
});
},
onclickfsall: function() {
var t = this;
cc.uiHelper.messageBox("一键放生", "放生所有非闪光首领宠物，出战中的除外", function() {
cc.playerData.fangshengall();
cc.uiHelper.showTips("放生完成");
t.node.destroy();
});
}
});
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
gamevaule: "gamevaule",
talentcfg: "talentcfg"
} ],
