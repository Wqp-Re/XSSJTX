bulletdisplay: [ function(t, e) {
"use strict";
cc._RF.push(e, "c0bf0J/NlVDtIQ+HckH+yp7", "bulletdisplay");
var i = t("Utils");
cc.Class({
extends: cc.Component,
properties: {
sp_bullet: {
default: null,
type: cc.Sprite
},
nd_test: {
default: null,
type: cc.Node
}
},
initdata: function(t) {
if (cc.battledebug) {
this.nd_test.width = t.width;
this.nd_test.height = t.height;
this.nd_test.active = !0;
this.nd_test.anchorX = .5;
t.rotateuser && (this.nd_test.anchorX = 0);
} else this.nd_test.active = !1;
this.notpos = !1;
this.updatepos = !0;
this.anind = null;
this.halfwidth = t.width / 2;
this.node.ctrl = this;
this.ldata = t;
var e = t.cfg;
this.cfg = e;
this.selfrotspeed = 1e3;
e.selfrotspeed && (this.selfrotspeed = e.selfrotspeed);
if (e.centermode) {
this.sp_bullet.node.y = 0;
this.sp_bullet.node.anchorX = .5;
} else {
this.sp_bullet.node.anchorX = 1;
this.sp_bullet.node.y = t.height / 2;
}
e.sound && cc.soundMgr.playSound(e.sound);
this.sp_bullet.spriteFrame = null;
this.sp_bullet.node.scale = 1;
if (e.icon) {
var s = this;
cc.resources.load("icons/bullet/" + e.icon, cc.SpriteFrame, function(t, e) {
!t && s.isValid && (s.sp_bullet.spriteFrame = e);
});
} else if (e.icon2w) {
this.sp_bullet.node.scale = 1.5;
s = this;
cc.resources.load("icons/items/" + this.ldata.user.wicon, cc.SpriteFrame, function(t, e) {
!t && s.isValid && (s.sp_bullet.spriteFrame = e);
});
}
this.plusy = 0;
this.node.angle = i.getanglebydir(this.ldata.dir) - 90;
if (e.addani && 4 != e.type) {
var n = cc.gameMgr.resmgr.createeff(e.addani, e.anilife);
n.angle = n.ctrl.agplus;
if (e.flowbullet) {
n.x = n.y = 0;
e.centermode || (n.y += e.width / 2);
n.ctrl.lifetime = e.life;
this.node.addChild(n);
this.updatepos = !1;
} else {
n.x = this.ldata.x;
n.y = this.ldata.y;
cc.gameMgr.ndeff.addChild(n);
}
this.plusy = n.ctrl.anioffy;
n.y += this.plusy;
this.anind = n;
e.anirot2icon && (n.angle = this.node.angle);
if (e.rotxiuzheng) {
n.angle += 90;
var a = .5 * t.height;
n.x = n.x - a * this.ldata.dir.x;
n.y = n.y - a * this.ldata.dir.y;
this.updatepos = !1;
}
}
1 == e.shader && cc.gameMgr.resmgr.effxuanwo(this.ldata.x, this.ldata.y);
if (this.cfg.iconup) {
this.node.zIndex = 1;
cc.gameMgr.ndeff.addChild(this.node);
} else {
this.node.zIndex = 0;
cc.gameMgr.ndbullet.addChild(this.node);
}
},
doupdate: function(t) {
if (this.ldata.nowline) {
var e = this.ldata.nowline.p1, s = this.ldata.nowline.p2, n = cc.gameMgr.resmgr.createeff(this.cfg.addani);
n.x = (e.x + s.x) / 2;
n.y = (e.y + s.y) / 2;
n.angle = i.getanglebydir(cc.v2(e.x - s.x, e.y - s.y));
n.scaleX = i.getdistance(e, s) / this.cfg.aniwidth;
cc.gameMgr.ndeff.addChild(n);
this.ldata.nowline = null;
}
this.anind && !this.anind.isValid && (this.anind = null);
if (!this.ldata.alive) {
if (this.anind && !this.ldata.cfg.aniduli) {
this.anind.ctrl.lifetime = 0;
this.anind = null;
}
return !0;
}
1 == this.ldata.cfg.rotatemode ? this.node.angle = i.getanglebydir(this.ldata.dir) - 90 : 2 == this.ldata.cfg.rotatemode && (this.node.angle = this.node.angle - t * this.selfrotspeed);
if (this.anind && this.updatepos) {
this.anind.x = this.ldata.x;
this.anind.y = this.ldata.y;
this.anind.y += this.plusy;
if (this.ldata.rotateuser) {
this.node.angle = i.getanglebydir(this.ldata.dir);
this.anind.angle = this.node.angle;
this.anind.x = this.anind.x + this.halfwidth * this.ldata.dir.x;
this.anind.y = this.anind.y + this.halfwidth * this.ldata.dir.y;
}
}
this.node.x = this.ldata.x;
this.node.y = this.ldata.y;
return !1;
}
});
cc._RF.pop();
}, {
Utils: "Utils"
} ],
