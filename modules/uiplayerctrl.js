uiplayerctrl: [ function(t, e) {
"use strict";
cc._RF.push(e, "be1aegAhVVK5a0xjWUHjdkS", "uiplayerctrl");
var i = t("Utils");
cc.Class({
extends: cc.Component,
properties: {
sp_role: {
default: null,
type: cc.Sprite
}
},
onLoad: function() {
cc.Notifier.on("refreshhero", this, this.refreshhero.bind(this));
cc.Notifier.on("refreshpet", this, this.refreshpet.bind(this));
},
onDestroy: function() {
cc.Notifier.off("refreshhero", this);
cc.Notifier.off("refreshpet", this);
},
refreshhero: function() {
if (this.isplayer) {
this.sp_role.spriteFrame = cc.herospriteframe;
this.updateani(1);
}
},
initdata: function(t) {
this.fx = -1;
this.node.ctrl = this;
this.nowframe = 0;
this.frametime = 0;
this.width = 32;
this.height = 32;
this.framecount = 4;
this.dir = cc.v2(0, -1);
this.isplayer = t;
this.sp_role.spriteFrame = null;
if (this.isplayer) {
this.sp_role.sizeMode = 0;
this.sp_role.node.width = this.sp_role.node.height = 48;
this.speed = 150;
this.sp_role.spriteFrame = cc.herospriteframe;
} else {
this.speed = 100;
this.sp_role.sizeMode = 2;
}
this.updateani(1);
this.refreshcolor();
},
updateani: function(t) {
this.isplayer ? this.updateaniplayer(t) : this.updateanipet(t);
},
changeframepet: function() {
var t = cc.playerData.battlepet;
if (t) {
var e = t.cfg.skinres, i = this.nowframe || 2, s = e + this.framename + i;
this.nowresname = s;
var n = this;
cc.resources.load("allrole/" + s, cc.SpriteFrame, function(t, e) {
if (!t && n.isValid) {
e.getTexture().setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
n.sp_role.spriteFrame = e;
}
});
}
},
changeframe: function() {
var t = this.nowframe || 2;
this.sp_role.node.color = new cc.Color(t - 1, this.fx, 0, 255);
},
updateanipet: function(t) {
var e = this.fx, i = this.dir.x, s = this.dir.y, n = 1, a = "";
if (Math.abs(i) > Math.abs(s)) {
if (i > 0) {
n = -1;
this.fx = 1;
} else this.fx = 2;
a = "_l_";
} else if (s > 0) {
this.fx = 3;
a = "_u_";
} else {
this.fx = 4;
a = "_d_";
}
if (e != this.fx) {
this.framename = a;
this.nowframe = 0;
this.frametime = 0;
this.sp_role.node.scaleX = n;
this.changeframepet();
}
this.frametime += t;
if (this.frametime >= .16) {
this.frametime = 0;
this.nowframe++;
this.nowframe %= this.framecount;
this.changeframepet();
}
},
updateaniplayer: function(t) {
var e = this.fx, i = this.dir.x, s = this.dir.y;
Math.abs(i) > Math.abs(s) ? this.fx = i > 0 ? 2 : 1 : this.fx = s > 0 ? 3 : 0;
if (e != this.fx) {
this.nowframe = 0;
this.frametime = 0;
this.changeframe();
}
this.frametime += t;
if (this.frametime >= .16) {
this.frametime = 0;
this.nowframe++;
this.nowframe %= this.framecount;
this.changeframe();
}
},
refreshcolor: function() {
if (!this.isplayer) {
var t = cc.playerData.battlepet;
if (t) {
this.node.scale = 1.25;
t.isboss && (this.node.scale = 1.875);
t.lighting ? this.sp_role.node.color = i.colorhuebyid(t.id) : this.sp_role.node.color = new cc.Color(255, 255, 255);
}
}
},
refreshpet: function() {
if (!this.isplayer) {
this.refreshcolor();
this.node.x = this.movetarget.x + 30;
this.node.y = this.movetarget.y + 30;
this.moving = !1;
}
},
doupdate: function(t, e) {
if (!this.isplayer) {
if (!cc.playerData.battlepet) {
this.node.active = !1;
return;
}
this.node.active = !0;
if (i.getdistancenosqrt(this.movetarget, this.node) > 2500) {
this.dir.x = this.movetarget.x - this.node.x;
this.dir.y = this.movetarget.y - this.node.y;
this.dir.normalizeSelf();
this.moving = !0;
} else this.moving = !1;
}
if (this.moving) {
this.updateani(.016);
this.node.zIndex = -this.node.y;
var s = !0, n = !0, a = this.node.x + this.dir.x * this.speed * .016, o = this.node.y + this.dir.y * this.speed * .016, c = 1;
this.node.x < 0 && (c = -1);
if (!this.isplayer) {
this.node.x = a;
this.node.y = o;
return;
}
for (var r = e.length - 1; r >= 0; r--) if (i.hitTestRectangle(e[r], this)) {
var l = {
x: this.node.x * c,
y: o,
width: this.width,
height: this.height
};
if (i.hitTestRectangle(e[r], l)) {
n = !1;
if (!s) break;
}
var h = {
x: a * c,
y: this.node.y,
width: this.width,
height: this.height
};
if (i.hitTestRectangle(e[r], h)) {
s = !1;
if (!n) break;
}
}
s || (a = this.node.x);
n || (o = this.node.y);
this.node.x = a;
this.node.y = o;
}
}
});
cc._RF.pop();
}, {
Utils: "Utils"
} ],
