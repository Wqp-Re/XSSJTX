uiMain: [ function(t, e) {
"use strict";
cc._RF.push(e, "292e1j+EAxImLjLTWySBaKi", "uiMain");
var i = cc.Button.prototype._onTouchEnded;
cc.Button.prototype._onTouchEnded = function(t) {
i.call(this, t);
cc.soundMgr.playSound("click");
};
var s = t("SDKManage"), n = t("Utils"), a = t("npccfg"), o = "ysadsuccess";
cc.Class({
extends: cc.Component,
properties: {
pb_role: {
default: null,
type: cc.Prefab
},
nd_map: {
default: null,
type: cc.Node
},
movejoy: {
default: null,
type: cc.Node
},
nd_pz: {
default: null,
type: cc.Node
},
pb_uirole: {
default: null,
type: cc.Prefab
},
pb_itemdetal: {
default: null,
type: cc.Prefab
},
pb_littlebag: {
default: null,
type: cc.Prefab
},
nd_up: {
default: null,
type: cc.Node
},
pb_npctalk: {
default: null,
type: cc.Prefab
},
npcnode: {
default: null,
type: cc.Node
},
pb_shop: {
default: null,
type: cc.Prefab
},
pb_fm: {
default: null,
type: cc.Prefab
},
pb_tiejiang: {
default: null,
type: cc.Prefab
},
pb_pet: {
default: null,
type: cc.Prefab
},
pb_itemnormal: {
default: null,
type: cc.Prefab
},
pb_learnpetskill: {
default: null,
type: cc.Prefab
},
pb_equipskill: {
default: null,
type: cc.Prefab
},
pb_chosepet: {
default: null,
type: cc.Prefab
},
lb_gold: {
default: null,
type: cc.Label
},
pb_stage: {
default: null,
type: cc.Prefab
},
pb_bank: {
default: null,
type: cc.Prefab
},
pb_xingxiang: {
default: null,
type: cc.Prefab
},
pb_hecheng: {
default: null,
type: cc.Prefab
},
pb_adhouse: {
default: null,
type: cc.Prefab
},
nd_flagexp: {
default: null,
type: cc.Node
},
nd_flagdrop: {
default: null,
type: cc.Node
},
nd_flaglight: {
default: null,
type: cc.Node
},
nd_youxiquan: {
default: null,
type: cc.Node
},
pb_zuobi: {
default: null,
type: cc.Prefab
},
pb_duihuan: {
default: null,
type: cc.Prefab
},
ui_lanren: {
default: null,
type: cc.Node
},
tg_shiqu: {
default: null,
type: cc.Toggle
},
tg_autoatk: {
default: null,
type: cc.Toggle
},
tg_guaji: {
default: null,
type: cc.Toggle
},
pb_setting: {
default: null,
type: cc.Prefab
},
nd_chengse: {
default: null,
type: cc.Node
},
tg_wujin: {
default: null,
type: cc.Toggle
},
anistate: {
default: null,
type: cc.Animation
},
pb_petbook: {
default: null,
type: cc.Prefab
},
pb_cpa: {
default: null,
type: cc.Prefab
},
dw_ys: {
default: null,
type: cc.Node
}
},
callcpa: function() {
var t = cc.instantiate(this.pb_cpa);
this.node.addChild(t);
},
lateUpdate: function() {},
onLoad: function() {
var t = this;
this.nodeupdate = !1;
s.youxiquan(this.nd_youxiquan);
setTimeout(function() {
s.showys(t.dw_ys);
}, 100);
cc.Notifier.on("goldchange", this, this.goldchange.bind(this));
cc.Notifier.on("addyuanshengad", this, this.addyuanshengad.bind(this));
cc.Notifier.on("refreshadflag", this, this.refreshadflag.bind(this));
cc.Notifier.on("refrshlanren", this, this.refrshlanren.bind(this));
cc.Notifier.on("loadcloud", this, this.loadcloud.bind(this));
cc.Notifier.on(o, this, this.refrshbp.bind(this));
},
onDestroy: function() {
s.cleangd();
s.destroyyouxiquan();
cc.Notifier.off("goldchange", this);
cc.Notifier.off("refreshadflag", this);
cc.Notifier.off("addyuanshengad", this);
cc.Notifier.off("refrshlanren", this);
cc.Notifier.off("loadcloud", this);
cc.Notifier.off(o, this);
},
goldchange: function() {
this.lb_gold.string = cc.playerData.gold;
},
refreshadflag: function() {
this.nd_flagexp.active = !!cc.expadd;
this.nd_flagdrop.active = !!cc.dropadd;
this.nd_flaglight.active = !!cc.shanguangadd;
this.nd_chengse.active = !!cc.chengseadd;
},
refrshbp: function() {
cc.playerData.adcount++;
cc.playerData.newbiemode2 = !1;
},
checkjiadian: function() {
var t = cc.playerData.player, e = 1 == t.lv && t.bppoint > 0 && 0 == t.zhuanshen;
if (this.newbieani !== e) {
this.newbieani = e;
if (e) this.anistate.play(); else {
this.anistate.stop();
this.anistate.node.scale = 1;
}
}
if (cc.isyuansheng && cc.lanrenmode && 0 == cc.playerData.adcount && !cc.playerData.newbiemode2) {
this.checkcount--;
if (this.checkcount <= 0) {
cc.playerData.newbiemode2 = !0;
cc.playerData.launchtime = cc.launchtime + 854e5;
}
}
},
start: function() {
this.newbieani = void 0;
this.refrshlanren();
this.initlanren();
cc.soundMgr.playbgm("bgm");
this.refreshadflag();
cc.uimain = this;
this.npcarr = [];
this.checkcount = 10;
for (var t = this.npcnode.getChildren(), e = 0; e < t.length; e++) {
var i = t[e], s = i.name.split(":");
i.zIndex = -i.y;
s[1] && this.npcarr.push({
x: i.x,
y: i.y,
width: i.width,
height: i.height,
id: s[1]
});
}
this.nd_up.zIndex = 1;
this.pzarr = this.nd_pz.getChildren();
this.playerarr = [];
this.player = cc.instantiate(this.pb_role);
this.player.getComponent("uiplayerctrl").initdata(!0);
this.playerarr.push(this.player.ctrl);
this.playerpet = cc.instantiate(this.pb_role);
this.playerpet.getComponent("uiplayerctrl").initdata(!1);
this.playerpet.ctrl.movetarget = this.player;
this.playerarr.push(this.playerpet.ctrl);
this.npcnode.addChild(this.player);
this.npcnode.addChild(this.playerpet);
var n = this.movejoy.getComponent("Joystick");
n.bindMoveCb(this.joyMove.bind(this));
n.bindEndCb(this.joyMoveEnd.bind(this));
n.bindStartCb(this.joyMoveBegin.bind(this));
n.setopamode();
this.player.y = 260;
this.playerpet.y = 260;
this.goldchange();
},
joyMove: function(t) {
this.player.ctrl.dir = cc.v2(Math.cos(t * (Math.PI / 180)), Math.sin(t * (Math.PI / 180)));
},
joyMoveEnd: function() {
var t = this;
this.player.ctrl.moving = !1;
this.npcarr = this.npcarr.sort(function(e, i) {
return Math.pow(t.player.x - e.x, 2) + Math.pow(t.player.y - e.y, 2) - (Math.pow(t.player.x - i.x, 2) + Math.pow(t.player.y - i.y, 2));
});
if (n.hitTestRectangle(this.npcarr[0], this.player)) {
var e = a[this.npcarr[0].id].condition;
if (e && e.sy && cc.playerData.stagesy < e.sy) return;
this.createnpctalk(this.npcarr[0].id);
}
},
joyMoveBegin: function() {
this.player.ctrl.moving = !0;
},
update: function(t) {
this.checkjiadian();
if (!this.nodeupdate) {
for (var e = this.playerarr.length - 1; e >= 0; e--) this.playerarr[e].doupdate(t, this.pzarr);
this.nd_map.x = -this.player.x;
this.nd_map.y = -this.player.y;
cc.playerData.update(t);
}
},
onclickuser: function() {
var t = cc.instantiate(this.pb_uirole);
this.node.addChild(t);
},
createiteminfo: function(t, e, i, s) {
var n = cc.instantiate(this.pb_itemdetal);
n.getComponent("uiitemdetail").initdata(t, e, i, s);
this.node.addChild(n);
},
createlittlebag: function(t) {
var e = cc.instantiate(this.pb_littlebag);
e.getComponent("uibag").initwithpos(t);
this.node.addChild(e);
},
createnpctalk: function(t) {
var e = cc.instantiate(this.pb_npctalk);
e.getComponent("uinpc").initdata(t);
this.node.addChild(e);
},
createshop: function(t) {
var e = cc.instantiate(this.pb_shop);
e.getComponent("uishop").initdata(t);
this.node.addChild(e);
},
createfm: function() {
var t = cc.instantiate(this.pb_fm);
this.node.addChild(t);
},
createfmbag: function(t) {
var e = cc.instantiate(this.pb_littlebag);
e.getComponent("uibag").initwithfm(t);
this.node.addChild(e);
},
createtiejiang: function() {
var t = cc.instantiate(this.pb_tiejiang);
this.node.addChild(t);
},
createpet: function() {
if (0 != cc.playerData.petbag.length) {
var t = cc.instantiate(this.pb_pet);
this.node.addChild(t);
} else cc.uiHelper.showTips("你还没有宠物");
},
createnormalinfo: function(t, e, i, s, n, a) {
var o = cc.instantiate(this.pb_itemnormal);
o.getComponent("uinormalitem").initdata(t, e, i, s, n, a);
this.node.addChild(o);
return o;
},
createleanpetskill: function(t) {
var e = cc.instantiate(this.pb_learnpetskill);
e.getComponent("uilearnskill").initdata(t);
this.node.addChild(e);
},
createequipskill: function(t) {
var e = cc.instantiate(this.pb_equipskill);
e.getComponent("uiequipskill").initdata(t);
this.node.addChild(e);
},
createchosepet: function() {
var t = cc.instantiate(this.pb_chosepet);
this.node.addChild(t);
},
createallbag: function() {
var t = cc.instantiate(this.pb_littlebag);
t.getComponent("uibag").initall();
this.node.addChild(t);
},
createstage: function() {
var t = cc.instantiate(this.pb_stage);
this.node.addChild(t);
},
createronglu: function() {
var t = cc.instantiate(this.pb_littlebag);
t.getComponent("uibag").initronglu();
this.node.addChild(t);
},
createsavebank: function() {
var t = cc.instantiate(this.pb_bank);
t.getComponent("uibank").initdata(1);
this.node.addChild(t);
},
createloadbank: function() {
var t = cc.instantiate(this.pb_bank);
t.getComponent("uibank").initdata(2);
this.node.addChild(t);
},
createshopsell: function() {
var t = cc.instantiate(this.pb_littlebag);
t.getComponent("uibag").initsell();
this.node.addChild(t);
},
createxx: function() {
var t = cc.instantiate(this.pb_xingxiang);
this.node.addChild(t);
},
createhc: function() {
if (0 != cc.playerData.pfarr.length) {
var t = cc.instantiate(this.pb_hecheng);
this.node.addChild(t);
} else cc.uiHelper.showTips("你没有任何配方");
},
createadhouse: function() {
var t = cc.instantiate(this.pb_adhouse);
this.node.addChild(t);
},
onclicksound: function() {
var t = cc.instantiate(this.pb_setting);
this.node.addChild(t);
},
callduihuan: function() {
var t = cc.instantiate(this.pb_duihuan);
this.node.addChild(t);
},
addyuanshengad: function() {
var t = cc.instantiate(this.pb_ys);
t.zIndex = 999;
this.node.addChild(t);
},
clickautoget: function() {
cc.autoget = this.tg_shiqu.isChecked;
},
clickautoatk: function() {
cc.autoatk = this.tg_autoatk.isChecked;
},
clickguaji: function() {
cc.guaji = this.tg_guaji.isChecked;
},
clickwujin: function() {
cc.wujinchongpa = this.tg_wujin.isChecked;
},
initlanren: function() {
this.tg_shiqu.isChecked = cc.autoget;
this.tg_autoatk.isChecked = cc.autoatk;
this.tg_guaji.isChecked = cc.guaji;
this.tg_wujin.isChecked = cc.wujinchongpa;
},
refrshlanren: function() {
this.ui_lanren.active = cc.lanrenmode;
},
loadcloud: function(t) {
this.nodeupdate = !0;
cc.sys.localStorage.setItem("commonsaveshuazi", t);
cc.uiHelper.showTips("下载成功");
},
createpetbook: function() {
var t = cc.instantiate(this.pb_petbook);
this.node.addChild(t);
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
Utils: "Utils",
npccfg: "npccfg"
} ],
