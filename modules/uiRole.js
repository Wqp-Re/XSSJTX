uiRole: [ function(t, e) {
"use strict";
cc._RF.push(e, "e2086GcOadDZbNbNDgaYpM6", "uiRole");
var i = t("gameConfig").itemConfig, s = t("gamevaule"), n = t("enumcfg"), a = (n.qulitycolor, 
n.typename, n.enumproperty), o = n.enumpropertyname, c = t("SDKManage"), r = t("Utils");
cc.Class({
extends: cc.Component,
properties: {
btn_equips: {
default: [],
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
pb_citiao: {
default: null,
type: cc.Prefab
},
lb_water: {
default: null,
type: cc.Label
},
lb_fire: {
default: null,
type: cc.Label
},
lb_thunder: {
default: null,
type: cc.Label
},
lb_leftpoint: {
default: null,
type: cc.Label
},
nd_jiadian: {
default: null,
type: cc.Node
},
pb_jiadian: {
default: null,
type: cc.Prefab
},
lb_lv: {
default: null,
type: cc.Label
},
pb_skill: {
default: null,
type: cc.Prefab
},
nd_skill: {
default: null,
type: cc.Node
},
sp_pet: {
default: null,
type: cc.Sprite
},
lb_petlv: {
default: null,
type: cc.Label
},
lb_cost: {
default: null,
type: cc.Label
},
nd_zhuanshen: {
default: null,
type: cc.Node
}
},
refreshpet: function() {
this.sp_pet.spriteFrame = null;
this.lb_petlv.string = " ";
var t = cc.playerData.battlepet;
if (t) {
t.lighting ? this.sp_pet.node.color = r.colorhuebyid(t.id) : this.sp_pet.node.color = new cc.Color(255, 255, 255);
var e = t.cfg, i = "";
t.zhuanshen > 0 && (i = t.zhuanshen + "转");
this.lb_petlv.string = i + "lv." + t.lv;
var s = this;
cc.resources.load("allrole/" + e.skinres + "_d_2", cc.SpriteFrame, function(t, e) {
t || (s.sp_pet.getComponent(cc.Sprite).spriteFrame = e);
});
}
},
clickpchangepet: function() {
0 != cc.playerData.petbag.length ? cc.uimain.createchosepet() : cc.uiHelper.showTips("你还没有宠物");
},
clickjiadian: function() {
var t = cc.instantiate(this.pb_jiadian);
this.node.addChild(t);
},
onLoad: function() {
cc.Notifier.on("refreshequip", this, this.refresh.bind(this));
cc.Notifier.on("downskill", this, this.downskill.bind(this));
cc.Notifier.on("refreshskill", this, this.refreshskill.bind(this));
cc.Notifier.on("refreshpet", this, this.refreshpet.bind(this));
},
onDestroy: function() {
cc.Notifier.off("refreshequip", this);
cc.Notifier.off("downskill", this);
cc.Notifier.off("refreshskill", this);
cc.Notifier.off("refreshpet", this);
},
downskill: function(t) {
cc.playerData.player.downskill(t);
this.refreshskill();
},
start: function() {
this.lb_cost.string = 100 * cc.playerData.player.lv;
this.gamevaule = new s();
this.skillarr = [];
for (var t = 0; t < 6; t++) {
var e = cc.instantiate(this.pb_citiao);
this.nd_state1.addChild(e);
var i = cc.instantiate(this.pb_citiao);
this.nd_state2.addChild(i);
var n = cc.instantiate(this.pb_citiao);
this.nd_state3.addChild(n);
}
for (t = 0; t < 3; t++) {
var a = (e = cc.instantiate(this.pb_skill)).getComponent("skillpet");
this.skillarr.push(a);
this.nd_skill.addChild(e);
}
this.refresh();
this.refreshpet();
},
onclickitem: function(t) {
var e = t.target.tidx, i = cc.playerData.player.equiparr;
i[e] ? cc.uimain.createiteminfo(i[e], e, 1, t.target) : cc.uimain.createlittlebag(e);
},
setcitiao: function(t, e) {
for (var i = 0; i < e.length; i++) {
var s = o[e[i]].name + ":" + Math.floor(this.gamevaule.getrealvaule(e[i]));
t[i].getComponent(cc.Label).string = s;
}
},
refreshskill: function() {
for (var t = 0; t < this.skillarr.length; t++) this.skillarr[t].initplayer(t);
},
refresh: function() {
var t = this;
this.refreshskill();
this.lb_lv.string = "lv." + cc.playerData.player.lv;
cc.playerData.player.zhuanshen > 0 && (this.lb_lv.string = cc.playerData.player.zhuanshen + "转" + this.lb_lv.string);
var e = cc.playerData.player.bppoint;
if (e > 0) {
this.nd_jiadian.active = !0;
this.lb_leftpoint.string = "剩余点数:" + e;
} else this.nd_jiadian.active = !1;
this.gamevaule.initplayer(cc.playerData.player);
var s = this.nd_state1.getChildren(), n = this.nd_state2.getChildren(), o = this.nd_state3.getChildren(), c = a, r = [ c.vit, c.str, c.dex, c.agi, c.int, c.luk ], l = [ c.maxhp, c.atk, c.def, c.matk, c.mdef, c.atkspeed ], h = [ c.flee, c.hit, c.cri, c.cridmg, c.xixue, c.movespeed ];
this.setcitiao(s, r);
this.setcitiao(n, l);
this.setcitiao(o, h);
var p = cc.playerData.player.getelement();
this.lb_water.string = p[0];
this.lb_fire.string = p[1];
this.lb_thunder.string = p[2];
for (var d = cc.playerData.player.equiparr, u = function(e) {
var s = t.btn_equips[e].getChildByName("defaulticon"), n = t.btn_equips[e].getChildByName("icon"), a = t.btn_equips[e].getChildByName("Background"), o = t.btn_equips[e].getChildByName("lv").getComponent(cc.Label), c = 1;
t.btn_equips[e].tidx = e;
o.node.active = !1;
if (d[e]) {
s.active = !1;
n.active = !0;
cc.resources.load("icons/items/" + i[d[e].id].icon, cc.SpriteFrame, function(t, e) {
if (!t) {
e.getTexture().setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
n.getComponent(cc.Sprite).spriteFrame = e;
}
});
c = d[e].qulity;
d[e].lv > 0 && (o.node.active = !0);
o.string = "+" + d[e].lv;
} else {
s.active = !0;
n.active = !1;
}
cc.resources.load("icons/items/pz" + c, cc.SpriteFrame, function(t, e) {
t || (a.getComponent(cc.Sprite).spriteFrame = e);
});
}, f = 0; f < this.btn_equips.length; f++) u(f);
this.nd_zhuanshen.active = cc.playerData.player.canchuanshen();
},
close: function() {
this.node.destroy();
},
clickresetbp: function() {
var t = this;
c.adWatch("bp", function() {
cc.playerData.player.resetbp();
t.refresh();
});
},
clickresetbpgold: function() {
var t = 100 * cc.playerData.player.lv;
if (cc.playerData.gold >= t) {
cc.playerData.changegold(-t);
cc.playerData.player.resetbp();
this.refresh();
} else cc.uiHelper.showTips("金币不足");
},
onclickzhuan: function() {
var t = this;
cc.uiHelper.messageBox("转生", "每次转生后每级成长+2，转生将扣除转生所需等级的经验", function() {
if (cc.playerData.player.dozhuanshen()) {
cc.uiHelper.showTips("转生成功");
t.refresh();
}
});
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
Utils: "Utils",
enumcfg: "enumcfg",
gameConfig: "gameConfig",
gamevaule: "gamevaule"
} ],
