playerctrl: [ function(t, e) {
"use strict";
cc._RF.push(e, "369746eP+xPGruMeMy5lVub", "playerctrl");
t("gameConfig").itemConfig;
var i = t("skillcfg"), s = t("Utils"), n = t("buffcfg"), a = n.buffcfg, o = n.effenum, c = cc.v2(0, 1), r = (s = t("Utils"), 
[ new cc.Color(1, 0, 0, 255), new cc.Color(1, 1, 0, 255), new cc.Color(1, 3, 0, 255), new cc.Color(1, 2, 0, 255) ]);
cc.Class({
extends: cc.Component,
properties: {
sp_role: {
default: null,
type: cc.Sprite
},
nd_weapon: {
default: null,
type: cc.Node
},
nd_bufficon: {
default: null,
type: cc.Node
},
pr_yc: {
default: null,
type: cc.ProgressBar
},
lb_skillname: {
default: null,
type: cc.Label
},
lb_name: {
default: null,
type: cc.Label
},
nd_shadow: {
default: null,
type: cc.Node
}
},
initdata: function(t) {
this.clean();
this.flagbuzhuo = !1;
this.pr_yc.node.active = !1;
this.fx = -1;
this.nowframe = 0;
this.frametime = 0;
this.deadtime = 0;
this.reborntime = 0;
this.objdata = t;
this.skin = t.skin;
this.width = t.width;
this.height = t.height;
this.node.zplus = t.height / 2;
this.framecount = 4;
this.sp_role.node.scale = 1;
this.node.scale = t.scale;
this.node.pctrl = this;
this.node.isplayer = t.isplayer;
this.skillarr = [];
this.logicscale = t.scale;
this.fyscale = 1;
this.hassetheight = !1;
this.lb_name.node.active = !1;
this.sp_role.spriteFrame = null;
if (t.isbaby) {
this.lb_name.node.active = !0;
this.lb_name.string = t.name + "宝宝";
} else if (t.ispet) {
this.lb_name.node.active = !0;
this.lb_name.string = t.name + "伙伴";
}
var e = t.isfenshen;
this.isfenshen = e;
if (this.node.isplayer || e) {
this.sp_role.spriteFrame = cc.herospriteframe;
this.sp_role.sizeMode = 0;
this.sp_role.node.width = this.sp_role.node.height = 48;
this.node.scale = .8;
this.nd_shadow.scale = .5;
} else {
this.nd_shadow.scale = .4;
t.lighting ? this.sp_role.node.color = s.colorhuebyid(t.cfgid) : this.sp_role.node.color = new cc.Color(255, 255, 255);
this.sp_role.sizeMode = 2;
}
},
changeframe: function() {
var t = this.nowframe || 2, e = this.skin + this.framename + t;
this.nowresname = e;
var i = this;
cc.resources.load("allrole/" + e, cc.SpriteFrame, function(t, e) {
!t && i.isValid && (i.sp_role.spriteFrame = e);
});
},
changeframeplayer: function() {
var t = this.nowframe || 2;
this.sp_role.node.color = new cc.Color(t - 1, this.fx, 0);
},
updateaniplayer: function(t) {
var e = this.fx, i = this.objdata.dir.x, s = this.objdata.dir.y;
Math.abs(i) > Math.abs(s) ? this.fx = i > 0 ? 2 : 1 : this.fx = s > 0 ? 3 : 0;
if (e != this.fx) {
this.nowframe = 0;
this.frametime = 0;
this.changeframeplayer();
}
this.frametime += t;
if (this.frametime >= .16) {
this.frametime = 0;
this.nowframe++;
this.nowframe %= this.framecount;
this.changeframeplayer();
}
},
updateani: function(t) {
if (this.objdata.fying) {
if (this.fyfx) {
this.fyscale -= 1 * t;
this.fyscale < .5 && (this.fyfx = !1);
} else {
this.fyscale += 1 * t;
if (this.fyscale >= 1) {
this.fyscale = 1;
this.fyfx = !0;
}
}
this.sp_role.node.scale = this.fyscale;
} else if (!(this.objdata.yingzhi || this.objdata.notanicount > 0)) if (this.rotatemode > 0) {
this.frametime += t;
if (this.frametime >= .1) {
this.frametime = 0;
this.nowframe++;
this.nowframe %= 4;
if (this.node.isplayer || this.isfenshen) this.sp_role.node.color = r[this.nowframe]; else {
3 == this.nowframe ? this.sp_role.node.scaleX = -1 : this.sp_role.node.scaleX = 1;
var e = this;
this.nowresname = this.skin + [ "_d_2", "_l_2", "_u_2", "_l_2" ][this.nowframe];
cc.resources.load("allrole/" + this.nowresname, cc.SpriteFrame, function(t, i) {
!t && e.isValid && (e.sp_role.spriteFrame = i);
});
}
}
} else if (this.node.isplayer || this.isfenshen) this.updateaniplayer(t); else {
var i = this.fx, s = this.objdata.dir.x, n = this.objdata.dir.y, a = 1, o = "";
if (Math.abs(s) > Math.abs(n)) {
if (s > 0) {
a = -1;
this.fx = 1;
} else this.fx = 2;
o = "_l_";
} else if (n > 0) {
this.fx = 3;
o = "_u_";
} else {
this.fx = 4;
o = "_d_";
}
if (i != this.fx) {
this.framename = o;
this.nowframe = 0;
this.frametime = 0;
this.sp_role.node.scaleX = a;
this.changeframe();
}
this.frametime += t;
if (this.frametime >= .16) {
this.frametime = 0;
this.nowframe++;
this.nowframe %= this.framecount;
this.changeframe();
}
}
},
updateshadow: function(t) {
if (this.shadow) {
this.shadowtime -= t;
if (this.shadowtime <= 0) {
if (this.node.x == this.oldx && this.node.y == this.oldy) return;
this.oldx = this.node.x;
this.oldy = this.node.y;
cc.gameMgr.resmgr.createshadow(this);
this.shadowtime = .05 * this.objdata.timescale;
}
}
},
addbuff: function(t) {
for (var e = 0; e < t.length; e++) {
var i = t[e], s = i.bid, n = a[s];
if (n.shadow) {
this.shadow = !0;
this.shadowtime = 0;
}
n.mohu && cc.gameMgr.resmgr.effmohu(n.life);
n.rani && (this.frametime = 1);
var c = n.res;
if (c) {
var r = 9999999;
n.aniduli && (r = void 0);
(l = cc.gameMgr.resmgr.createeff(c, r)).x = 0;
l.y = l.ctrl.anioffy;
if (n.resfz) {
l.anchorY = 0;
this.sp_role.node.addChild(l);
} else n.resdown ? this.nd_shadow.addChild(l) : this.node.addChild(l);
n.aniduli || (this.buffmap[s] = l);
}
if (n.icon && !this.bufficon[s]) {
var l = cc.gameMgr.resmgr.createbufficon(i);
this.nd_bufficon.addChild(l);
this.bufficon[s] = l;
}
n.rotatemode && this.rotatemode++;
if (n.buff_effect & o.fying) {
this.fyscale = 1;
this.fyfx = !0;
this.sp_role.node.scaleX = this.sp_role.node.scaleY = 1;
}
}
},
updateflag: function() {
if (this.objdata.flagyongchang) {
cc.soundMgr.playSound("skill1");
this.pr_yc.node.active = !0;
this.pr_yc.progress = 0;
this.lb_skillname.string = this.objdata.ycskill.cfg.name;
}
this.addbuff(this.objdata.flagaddbuff);
for (var t = 0; t < this.objdata.flagremovebuff.length; t++) {
var e = this.objdata.flagremovebuff[t], n = a[e];
n.shadow && (this.shadow = !1);
n.rotatemode && this.rotatemode--;
n.mohu && cc.gameMgr.resmgr.effmohuover();
if (this.buffmap[e]) {
this.buffmap[e].ctrl.lifetime = 0;
this.buffmap[e] = null;
}
if (this.bufficon[e]) {
cc.gameMgr.resmgr.recoverbufficon(this.bufficon[e]);
this.bufficon[e] = null;
}
if (n.buff_effect & o.fying) {
this.fyscale = 1;
this.fyfx = !0;
this.sp_role.node.scaleX = this.sp_role.node.scaleY = 1;
this.fx = -1;
}
}
var r = this.objdata.flaguseskill;
if (r) {
var l = i[r.id], h = 0, p = 1;
if (l.waniid || l.addani) if (this.objdata.dir.cross(c) < 0) {
h = s.getanglebydir(this.objdata.dir) - 180;
p = -1;
} else h = s.getanglebydir(this.objdata.dir);
if (l.waniid) {
(d = cc.gameMgr.resmgr.createweapon({
id: l.waniid,
parent: cc.gameMgr.ndeff,
icon: this.objdata.wicon,
scale: this.logicscale,
follow: this.node
})).angle = h;
d.scaleX *= p;
}
if (l.addani) {
(d = cc.gameMgr.resmgr.createeff(l.addani)).x = this.node.x + this.objdata.dir.x * l.addaniposadd;
d.y = this.node.y + this.objdata.dir.y * l.addaniposadd;
d.angle = h;
l.addaniscale && (d.scale = l.addaniscale);
d.scaleX *= p;
cc.gameMgr.ndeff.addChild(d);
}
if (cc.battledebug && 1 == l.type) {
var d, u = l.distance;
(d = cc.instantiate(cc.gameMgr.resmgr.pb_debugbox)).x = this.node.x;
d.y = this.node.y;
cc.gameMgr.ndeff.addChild(d);
var f = d.getComponent("debugbox");
1 == l.hittype ? f.initbox(l.height, l.width, s.getanglebydir(this.objdata.dir)) : f.initview(l.range, u, this.objdata.dir);
}
}
},
doupdate: function(t) {
t *= this.objdata.timescale;
this.node.x = this.objdata.x;
this.node.y = this.objdata.y;
this.updateflag(t);
this.objdata.yctime > 0 ? this.pr_yc.progress = 1 - this.objdata.getycbili() : this.pr_yc.node.active = !1;
if (1 != this.objdata.camp) {
var e = cc.gameMgr, i = this.node.x - e.player.x, s = this.node.y - e.player.y;
if (Math.abs(i) > e.viewwidth || Math.abs(s) > e.viewhight) {
this.objdata.inview = !1;
this.node.opacity = 0;
} else {
this.objdata.inview = !0;
this.node.opacity = 255;
}
} else this.objdata.inview = !0;
for (var n = this.objdata.dmgarr, a = n.length - 1; a >= 0; a--) cc.gameMgr.resmgr.createhurtlb(n[a], this.node.position, this.objdata);
this.updateani(t);
this.updateshadow(t);
if (this.objdata.deadinthisframe) if (this.node.isplayer) {
cc.Notifier.emit("playerdie");
this.deadtime = 1;
} else {
this.cleanbuff();
if (1 == this.objdata.deadtype) this.deadtime = 1; else if (cc.isyuansheng || cc.autoatk || cc.notani) this.deadtime = 1; else {
this.nd_shadow.opacity = 0;
cc.gameMgr.resmgr.createdead(this, this.objdata.deadfx);
this.nd_shadow.opacity = 180;
}
}
if (this.objdata.flagbuzhuo) {
this.deadtime = 0;
this.sp_role.node.scale = 1;
this.flagbuzhuo = !0;
}
this.objdata.reborninthiframe && (this.reborntime = 1);
this.objdata.isdead() && (this.node.opacity = 0);
if (this.deadtime > 0) {
this.deadtime -= t;
this.node.opacity = 255 * this.deadtime;
}
if (this.reborntime > 0) {
this.reborntime -= t;
this.node.opacity = 255 * (1 - this.reborntime);
}
if (this.flagbuzhuo && this.sp_role.node.scale > 0) {
this.sp_role.node.scale -= 2.5 * t;
this.node.opacity = 255;
}
if (this.objdata.flagfuhuo) {
this.deadtime = 0;
this.node.opacity = 255;
}
},
updateactive: function() {
this.objdata.flagskillchange && cc.Notifier.emit("onchangeskill", this.objdata);
this.objdata.flagchangeuserskill && cc.Notifier.emit("onchangeuserskill", this.objdata);
this.objdata.flagskillcd.length > 0 && cc.Notifier.emit("onskillcd", this.objdata);
this.objdata.flagweaponchange && cc.gameMgr.resmgr.createweapon({
id: 1,
parent: cc.gameMgr.ndeff,
icon: this.objdata.wicon,
scale: this.logicscale,
follow: this.node
});
},
cleanbuff: function() {
for (var t in this.buffmap) this.buffmap[t] && (this.buffmap[t].ctrl.lifetime = 0);
for (var t in this.bufficon) this.bufficon[t] && cc.gameMgr.resmgr.recoverbufficon(this.bufficon[t]);
this.buffmap = {};
this.bufficon = {};
},
clean: function() {
this.node.opacity = 255;
this.rotatemode = 0;
this.objdata = null;
this.cleanbuff();
}
});
cc._RF.pop();
}, {
Utils: "Utils",
buffcfg: "buffcfg",
gameConfig: "gameConfig",
skillcfg: "skillcfg"
} ],
