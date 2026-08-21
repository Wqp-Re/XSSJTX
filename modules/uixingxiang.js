uixingxiang: [ function(t, e) {
"use strict";
cc._RF.push(e, "45ee3AepjRBdaqvArebemD2", "uixingxiang");
var i = t("Utils"), s = t("avatarcfg"), n = s.manpartcount, a = s.womanpartcount, o = s.colorTB, c = t("SDKManage"), r = [ "前发", "头发", "服装", "脸部", "耳朵", "翅膀", "尾巴", "披风", "兽耳", "眼镜", "头饰1", "头饰2", "胡子", "发色" ];
cc.Class({
extends: cc.Component,
properties: {
nd_avatar: {
default: null,
type: cc.Node
},
nd_layout: {
default: null,
type: cc.Node
},
sp_out: {
default: null,
type: cc.Sprite
},
sp_out2: {
default: null,
type: cc.Sprite
},
sp_out3: {
default: null,
type: cc.Sprite
},
pb_xingxiang: {
default: null,
type: cc.Prefab
},
lb_cost: {
default: null,
type: cc.Label
}
},
start: function() {
this.cellarr = [];
for (var t = 0; t < 14; t++) {
var e = cc.instantiate(this.pb_xingxiang), i = e.getComponent("pbxingxiang");
this.cellarr.push(i);
this.nd_layout.addChild(e);
}
this.avatar = this.nd_avatar.getComponent("avatar");
this.avatar.initcommon(cc.playerData.ismale, cc.playerData.xxarr);
cc.playerData.ismale ? this.countcfg = n : this.countcfg = a;
this.lb_cost.string = 100 * cc.playerData.player.lv;
this.init(cc.playerData.xxarr);
},
onLoad: function() {
cc.Notifier.on("xarrchange", this, this.xarrchange.bind(this));
cc.Notifier.on("avatarfinish", this, this.avatarfinish.bind(this));
},
onDestroy: function() {
cc.Notifier.off("xarrchange", this);
cc.Notifier.off("avatarfinish", this);
},
avatarfinish: function() {
this.sp_out.spriteFrame = i.rendernode(this.nd_avatar);
this.sp_out.spriteFrame.getTexture().setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
this.sp_out2.spriteFrame = this.sp_out.spriteFrame;
this.sp_out3.spriteFrame = this.sp_out.spriteFrame;
},
init: function(t) {
var e = [];
e[0] = this.countcfg.fronthair;
e[1] = this.countcfg.rearhair;
e[2] = this.countcfg.clothing;
e[3] = this.countcfg.face;
e[4] = this.countcfg.ear;
e[5] = this.countcfg.wing;
e[6] = this.countcfg.tail;
e[7] = this.countcfg.cloak;
e[8] = this.countcfg.beastear;
e[9] = this.countcfg.glass;
e[10] = this.countcfg.acc1;
e[11] = this.countcfg.acc2;
e[12] = this.countcfg.beard;
e[13] = o.length - 1;
for (var i = 0; i < this.cellarr.length; i++) {
this.cellarr[i].initdata(i, e[i], r[i]);
this.cellarr[i].refreshidx(t[i]);
}
},
dohuan: function() {
cc.playerData.savexingxiang(this.avatar.partarr, this.avatar.ismale);
cc.herospriteframe = this.sp_out.spriteFrame;
cc.Notifier.emit("refreshhero");
cc.uiHelper.showTips("形象已更改");
this.node.destroy();
},
onclickok: function() {
var t = 100 * cc.playerData.player.lv;
if (cc.playerData.gold >= t) {
cc.playerData.changegold(-t);
this.dohuan();
} else cc.uiHelper.showTips("金币不足");
},
onclickad: function() {
var t = this;
c.adWatch("catchbaby", function() {
t.dohuan();
});
},
onclickman: function() {
this.countcfg = n;
this.init(this.avatar.initdata(!0));
},
onclickwoman: function() {
this.countcfg = a;
this.init(this.avatar.initdata(!1));
},
xarrchange: function(t) {
this.avatar.refreshpart(t.idx, t.v);
},
rand: function() {
for (var t = this.avatar.randpart(), e = 0; e < this.cellarr.length; e++) this.cellarr[e].refreshidx(t[e]);
},
close: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
Utils: "Utils",
avatarcfg: "avatarcfg"
} ],
