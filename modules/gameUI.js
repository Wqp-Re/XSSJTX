gameUI: [ function(t, e) {
"use strict";
cc._RF.push(e, "30948b/9aFGhYcTGcX47KC8", "gameUI");
var i = t("skillcfg"), s = t("gameConfig").itemConfig, n = t("SDKManage"), a = t("enumcfg").qulitycolor;
cc.Class({
extends: cc.Component,
properties: {
movejoy: {
default: null,
type: cc.Node
},
skillsparr: {
default: [],
type: cc.Sprite
},
sp_weapon: {
default: null,
type: cc.Sprite
},
btn_atk: {
default: null,
type: cc.Node
},
skillprogress: {
default: [],
type: cc.ProgressBar
},
skillsparr2: {
default: [],
type: cc.Sprite
},
skillprogress2: {
default: [],
type: cc.ProgressBar
},
lb_hp: {
default: null,
type: cc.Label
},
lb_exp: {
default: null,
type: cc.Label
},
lb_lv: {
default: null,
type: cc.Label
},
pr_hp: {
default: null,
type: cc.ProgressBar
},
pr_exp: {
default: null,
type: cc.ProgressBar
},
nd_pick: {
default: null,
type: cc.Node
},
nd_boss: {
default: null,
type: cc.Node
},
pr_bosshp: {
default: null,
type: cc.ProgressBar
},
lb_bosshp: {
default: null,
type: cc.Label
},
lb_bossname: {
default: null,
type: cc.Label
},
nd_buzhuo: {
default: null,
type: cc.Node
},
nd_pet: {
default: null,
type: cc.Node
},
lb_petname: {
default: null,
type: cc.Label
},
lb_pethp: {
default: null,
type: cc.Label
},
pr_pethp: {
default: null,
type: cc.ProgressBar
},
lb_cardcount: {
default: null,
type: cc.Label
},
nd_fuhuo: {
default: null,
type: cc.Node
},
btn_back: {
default: null,
type: cc.Node
},
pbnewbie: {
default: null,
type: cc.Prefab
},
pr_jindu: {
default: null,
type: cc.ProgressBar
},
lb_jindu: {
default: null,
type: cc.Label
},
pb_gameget: {
default: null,
type: cc.Prefab
},
nd_gameget: {
default: null,
type: cc.Node
},
btn_pause: {
default: null,
type: cc.Node
},
nd_bstart: {
default: null,
type: cc.Node
},
nd_bpasue: {
default: null,
type: cc.Node
},
lb_wujin: {
default: null,
type: cc.Label
},
nd_wujin: {
default: null,
type: cc.Node
},
tg_group: {
default: null,
type: cc.ToggleContainer
}
},
onLoad: function() {
cc.Notifier.on("onchangeskill", this, this.onchangeskill.bind(this));
cc.Notifier.on("onchangeuserskill", this, this.onchangeuserskill.bind(this));
cc.Notifier.on("onskillcd", this, this.onskillcd.bind(this));
cc.Notifier.on("playerdie", this, this.playerdie.bind(this));
cc.Notifier.on("bosswarning", this, this.bosswarning.bind(this));
cc.Notifier.on("gameGetItem", this, this.gameGetItem.bind(this));
this.btn_atk.on(cc.Node.EventType.TOUCH_START, this._touchStartEventatk, this);
this.btn_atk.on(cc.Node.EventType.TOUCH_END, this._touchEndEventatk, this);
this.btn_atk.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEventatk, this);
this._initSpeedBtn();
n.desys();
},
_initSpeedBtn: function() {
this.speedarr = [1, 2, 5, 10, 50, 100];
this.speedidx = 0;
cc.kSpeed(1);
var size = cc.view.getVisibleSize();
var self = this;
var snd = new cc.Node("SpeedBtn");
snd.parent = this.node;
snd.setPosition(cc.v2(size.width / 2 - 70, size.height / 2 - 60));
var gr = snd.addComponent(cc.Graphics);
gr.fillColor = cc.color(0, 0, 0, 170);
gr.strokeColor = cc.color(255, 215, 0, 255);
gr.lineWidth = 2;
gr.roundRect(-55, -22, 110, 44, 10);
gr.fill();
gr.stroke();
var lb = snd.addComponent(cc.Label);
lb.string = "速度 1x";
lb.fontSize = 22;
lb.lineHeight = 30;
lb.color = cc.color(255, 255, 0, 255);
snd.addComponent(cc.Button);
snd.on(cc.Node.EventType.TOUCH_END, function() {
    self.speedidx = (self.speedidx + 1) % self.speedarr.length;
    var sp = self.speedarr[self.speedidx];
    cc.kSpeed(sp);
    lb.string = "速度 " + sp + "x";
    if (cc.uiHelper && cc.uiHelper.showTips) cc.uiHelper.showTips("战斗加速 " + sp + "x");
}, this);
this.speedbtn = snd;
this.speedlb = lb;
},
onDestroy: function() {
cc.gamepause = !1;
cc.Notifier.off("onchangeskill", this);
cc.Notifier.off("onchangeuserskill", this);
cc.Notifier.off("onskillcd", this);
cc.Notifier.off("playerdie", this);
cc.Notifier.off("bosswarning", this);
cc.Notifier.off("gameGetItem", this);
this.btn_atk.off(cc.Node.EventType.TOUCH_START, this._touchStartEventatk, this);
this.btn_atk.off(cc.Node.EventType.TOUCH_END, this._touchEndEventatk, this);
this.btn_atk.off(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEventatk, this);
cc.kSpeed(1);
},
updatetips: function(t) {
for (var e = this.tipsarr.length - 1; e >= 0; e--) {
var i = this.tipsarr[e];
i.lifetime -= t;
if (i.lifetime <= 0) {
i.removeFromParent(!1);
this.tipscache.push(i);
this.tipsarr.splice(e, 1);
}
}
},
gameGetItem: function(t) {
var e = this.tipscache.length > 0 ? this.tipscache.pop() : cc.instantiate(this.pb_gameget);
e.lifetime = 2;
this.nd_gameget.addChild(e);
if (t.gold) {
e.color = a[1];
e.getComponent(cc.Label).string = "获得:金币" + t.gold;
this.tipsarr.push(e);
} else {
var i, s = t.cfg;
e.getComponent(cc.Label).string = "获得:" + s.name;
(i = t.qulity ? t.qulity : s.qulity) || (i = 1);
e.color = a[i];
this.tipsarr.push(e);
}
},
init: function() {
if (cc.wujin) this.lb_wujin.string = "无尽" + (cc.wujincount + 1) + "层"; else {
this.nd_wujin.active = !1;
this.lb_wujin.node.active = !1;
}
this.gamepause = !1;
var t = this.movejoy.getComponent("Joystick");
t.bindMoveCb(this.joyMove.bind(this));
t.bindEndCb(this.joyMoveEnd.bind(this));
t.bindStartCb(this.joyMoveBegin.bind(this));
this.skillarr = [];
this.skillarr2 = [];
this.tipsarr = [];
this.tipscache = [];
this.gplayer = cc.battlelogic.playerData.player;
this.nd_boss.active = !1;
this.nd_buzhuo.active = !1;
this.checkbaby = !1;
this.nd_fuhuo.active = !1;
this.pr_jindu.node.active = !0;
this.nd_pick.active = !1;
this.guajitime = 0;
if (cc.battlelogic.newbiemode) {
this.btn_back.active = !1;
this.btn_pause.active = !1;
var e = cc.instantiate(this.pbnewbie);
this.newbienode = e;
this.node.addChild(e);
this.scheduleOnce(function() {
cc.gamepause = !0;
}, 0);
}
11 == cc.wujindijin ? this.tg_group.toggleItems[1].isChecked = !0 : 101 == cc.wujindijin && (this.tg_group.toggleItems[2].isChecked = !0);
},
_touchStartEventatk: function() {
this.atking = !0;
this.btn_atk.scale = .9;
},
_touchEndEventatk: function() {
this.atking = !1;
this.btn_atk.scale = 1;
},
joyMove: function(t) {
var e = cc.v2(Math.cos(t * (Math.PI / 180)), Math.sin(t * (Math.PI / 180)));
cc.gameMgr.joyMove(e);
},
joyMoveEnd: function() {
cc.gameMgr.joyMoveEnd();
},
joyMoveBegin: function() {
cc.gameMgr.joyMoveBegin();
},
onclickskill: function(t, e) {
cc.gameMgr.onclickskill(e);
},
onclickuserskill: function(t, e) {
cc.gameMgr.onclickuserskill(e);
},
onclickdash: function() {},
onchangeuserskill: function(t) {
var e = this;
this.skillarr2 = t.userskillarr;
for (var s = 0; s < 3; s++) {
this.skillsparr2[s].spriteFrame = null;
this.skillsparr2[s].node.parent.parent.active = !1;
}
for (var n = this, a = function(t) {
var s = i[e.skillarr2[t].id].icon;
cc.resources.load("icons/skills/" + s, cc.SpriteFrame, function(e, i) {
!e && n.isValid && (n.skillsparr2[t].spriteFrame = i);
});
e.skillsparr2[t].node.parent.parent.active = !0;
}, o = 0; o < this.skillarr2.length; o++) a(o);
},
onchangeskill: function(t) {
var e = this;
this.skillarr = t.skillarr;
for (var n = 0; n < 4; n++) this.skillsparr[n].spriteFrame = null;
for (var a = this, o = function(t) {
var s = i[e.skillarr[t].id].icon;
cc.resources.load("icons/skills/" + s, cc.SpriteFrame, function(e, i) {
!e && a.isValid && (a.skillsparr[t].spriteFrame = i);
});
}, c = 0; c < this.skillarr.length; c++) o(c);
a.sp_weapon.node.scale = 2;
var r = s[t.nowweapon.id], l = r.icon;
r.scale && (a.sp_weapon.node.scale = 2 * r.scale);
cc.resources.load("icons/items/" + l, cc.SpriteFrame, function(t, e) {
!t && a.isValid && (a.sp_weapon.spriteFrame = e);
});
},
onclickquality: function() {
cc.quqlitymode = !cc.quqlitymode;
cc.gameMgr.nd_ground.active = cc.quqlitymode;
},
onskillcd: function() {},
onclickchangeweapon: function() {
cc.gameMgr.onclickchangeweapon();
},
update: function(t) {
this.updatetips(t);
this.atking && cc.gameMgr.onclickskill(0);
for (var e = 0; e < 4; e++) {
var i = this.skillarr[e];
this.skillprogress[e].progress = i ? i.nowtime / i.maxtime : 0;
}
for (e = 0; e < 3; e++) {
i = this.skillarr2[e];
this.skillprogress2[e].progress = i ? i.nowtime / i.maxtime : 0;
}
this.lb_lv.string = "LV." + this.gplayer.lv;
var s = cc.battlelogic.player.hp, n = cc.battlelogic.player.maxhp;
this.lb_hp.string = s + "/" + n;
this.pr_hp.progress = s / n;
var a = this.gplayer.exp, o = this.gplayer.maxexp;
this.lb_exp.string = a + "/" + o;
this.pr_exp.progress = a / o;
var c = cc.gameMgr.getNearDrop();
c && (cc.gameMgr.dropid = c.ctrl.objuuid);
this.dorefreshboss();
this.checkbaby && (cc.battlelogic.baby && !cc.battlelogic.baby.isdead() ? this.nd_buzhuo.active = cc.battlelogic.baby.inview : this.nd_buzhuo.active = !1);
var r = cc.battlelogic.petplayer;
if (r) {
this.nd_pet.active = !0;
this.lb_petname.string = r.name;
this.lb_pethp.string = r.hp + "/" + r.maxhp;
this.pr_pethp.progress = r.hp / r.maxhp;
} else this.nd_pet.active = !1;
if (this.pr_jindu.node.active) {
var l = cc.battlelogic.getjindu();
l = Math.min(1, l);
this.pr_jindu.progress = l;
this.lb_jindu.string = Math.floor(100 * l) + "%";
}
if (this.guajitime > 0) {
this.guajitime -= t;
if (this.guajitime <= 0) {
this.guajitime = 0;
cc.director.loadScene("guajitemp");
}
}
},
dopick: function() {
cc.gameMgr.dropid = this.dropid;
},
refreshboss: function() {
this.pr_jindu.node.active = !1;
this.nd_boss.active = !0;
this.boss = cc.battlelogic.bossobj;
this.lb_bossname.string = "lv" + this.boss.lv + " " + this.boss.name;
this.dorefreshboss();
},
dorefreshboss: function() {
if (!this.hasover && this.nd_boss.active) {
var t = this.boss.hp, e = this.boss.maxhp;
this.lb_bosshp.string = t + "/" + e;
this.pr_bosshp.progress = t / e;
if (this.boss.isdead()) {
this.nd_boss.active = !1;
cc.uiHelper.showTips("战斗胜利");
this.hasover = !0;
cc.wujin && (cc.wujincount += cc.wujindijin);
(cc.guaji || cc.wujin) && this.scheduleOnce(function() {
cc.director.loadScene("guajitemp");
}, 3);
}
}
},
docheckbaby: function(t) {
this.lb_cardcount.string = "x" + cc.playerData.getitemcountbyid(30001);
this.checkbaby = t;
this.checkbaby || (this.nd_buzhuo.active = !1);
},
buzhuo: function() {
cc.battlelogic.baby && cc.battlelogic.baby.addbuff(4011, 100);
if (cc.playerData.getitemcountbyid(30001) > 0) {
cc.playerData.xiaohaoitembyid(30001, 1);
this.lb_cardcount.string = "x" + cc.playerData.getitemcountbyid(30001);
cc.gameMgr.catch = 30;
} else cc.uiHelper.showTips("封印卡不足");
},
buzhuoad: function() {
this.gamepause || this.onclickpuse();
cc.battlelogic.baby && cc.battlelogic.baby.addbuff(4011, 100);
var t = this;
n.adWatch("catchbaby", function() {
t.onclickpuse();
cc.gameMgr.catch = 100;
});
},
onclickback: function() {
cc.battling = !1;
cc.director.loadScene("main");
},
playerdie: function() {
if (cc.battlelogic.newbiemode) this.newbienode.active = !0; else {
if (cc.wujinchongpa) {
cc.mode1w ? cc.wujincount = 1e4 : cc.wujincount = 0;
this.guajitime = 5;
}
cc.guaji && (this.guajitime = 5);
this.nd_fuhuo.active = !0;
}
},
clickfh: function() {
var t = this;
this.guajitime = 0;
n.adWatch("fuhuo", function() {
cc.gameMgr.fuhuo = !0;
t.nd_fuhuo.active = !1;
});
},
clickfq: function() {
this.guajitime = 0;
cc.soundMgr.playSound("run");
cc.battling = !1;
cc.director.loadScene("main");
},
bosswarning: function() {},
onclickpuse: function() {
this.gamepause = !this.gamepause;
cc.gamepause = this.gamepause;
this.nd_bpasue.active = !this.gamepause;
this.nd_bstart.active = this.gamepause;
this.gamepause ? cc.uiHelper.showTips("游戏暂停") : cc.uiHelper.showTips("游戏恢复");
},
onclickwujin: function(t) {
var e = t.node.name;
"toggle1" == e ? cc.wujindijin = 1 : "toggle2" == e ? cc.wujindijin = 11 : "toggle3" == e && (cc.wujindijin = 101);
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
enumcfg: "enumcfg",
gameConfig: "gameConfig",
skillcfg: "skillcfg"
} ],
