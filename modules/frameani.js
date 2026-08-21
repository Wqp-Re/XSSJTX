frameani: [ function(t, e) {
"use strict";
cc._RF.push(e, "a8fdbqI9M9JyY+O1PS30aXs", "frameani");
var i = t("effanicfg");
cc.Class({
extends: cc.Component,
properties: {
sp_frame: {
default: null,
type: cc.Sprite
}
},
initdata: function(t, e) {
this.actionid = 0;
this.node.x = this.node.y = 0;
this.node.ctrl = this;
this.node.scaleY = this.node.scaleX = 1;
this.speed = .075;
var s = i[t];
s || (s = {
count: 1
});
var n = s.count;
e || (e = this.speed * n);
this.lifetime = e;
this.frameidx = 0;
this.frametime = 0;
this.framecount = n;
this.framename = t;
this.node.anchorY = .5;
this.node.anchorX = .5;
this.node.opacity = 255;
null != s.anchorY && (this.node.anchorY = s.anchorY);
null != s.anchorX && (this.node.anchorX = s.anchorX);
s.opacity && (this.node.opacity = s.opacity);
s.scale && (this.node.scale = s.scale);
this.anioffy = s.anioffy || 0;
this.sp_frame.spriteFrame = null;
this.agplus = s.rot || 0;
this.cfg = s;
this.updateframe();
if (s.backres) {
var a = s.backres, o = this;
this.scheduleOnce(function() {
var t = cc.gameMgr.resmgr.createeff(a, o.lifetime), e = o.node.parent.convertToWorldSpaceAR(o.node), s = cc.gameMgr.nd_down.convertToNodeSpaceAR(e);
t.position = s;
cc.gameMgr.nd_down.addChild(t);
o.subnd = t;
i[a].anioffy && (t.y += i[a].anioffy);
}, 0);
}
s.sound && cc.soundMgr.playSound(s.sound);
this.soundname = null;
if (s.loopsound) {
this.soundtime = s.soundtime;
this.soundname = s.loopsound;
this.soundnow = 0;
}
cc.notani ? this.node.active = !1 : this.node.active = !0;
},
updateframe: function() {
if (!cc.notani) {
var t = this;
this.realframe = this.framename + "_" + this.frameidx;
cc.resources.load("eff/" + this.realframe, cc.SpriteFrame, function(e, i) {
if (!e && t.isValid) {
if (i.name != t.realframe) return;
t.sp_frame.spriteFrame = i;
}
});
this.frameidx++;
this.frameidx %= this.framecount;
this.frametime = 0;
}
},
doupdate: function(t) {
if (this.soundname) {
this.soundnow += t;
if (this.soundnow > this.soundtime) {
this.soundnow = 0;
cc.soundMgr.playSound(this.soundname);
}
}
this.frametime += t;
this.frametime >= this.speed && this.updateframe();
this.lifetime -= t;
if (this.subnd && this.lifetime <= 0) {
this.subnd.ctrl.lifetime = 0;
this.subnd = null;
}
if (1 == this.actionid) {
this.waittime -= t;
this.waittime <= 0 && (this.node.scale += t * this.actionp);
}
return this.lifetime <= 0;
},
hook: function(t) {
this.actionid = t.type;
if (1 == this.actionid) {
this.node.scale = t.s;
this.actionp = t.u;
this.waittime = t.wait;
}
}
});
cc._RF.pop();
}, {
effanicfg: "effanicfg"
} ],
