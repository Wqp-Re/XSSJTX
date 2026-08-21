gameres: [ function(t, e) {
"use strict";
cc._RF.push(e, "1e08aPlMo9FyopV7Sll4p5q", "gameres");
var i = t("gameloot"), s = t("Utils");
cc.Class({
extends: cc.Component,
properties: {
pb_warning: {
default: null,
type: cc.Prefab
},
pb_npc: {
default: null,
type: cc.Prefab
},
pb_weapon: {
default: null,
type: cc.Prefab
},
pb_hurtlb: {
default: null,
type: cc.Prefab
},
pb_effframe: {
default: null,
type: cc.Prefab
},
pb_debugbox: {
default: null,
type: cc.Prefab
},
pb_bullet: {
default: null,
type: cc.Prefab
},
pb_buff: {
default: null,
type: cc.Prefab
},
gamecamera: {
default: null,
type: cc.Camera
},
sp_1: {
default: null,
type: cc.Sprite
},
pb_drop: {
default: null,
type: cc.Prefab
},
pb_shadow: {
default: null,
type: cc.Prefab
}
},
onLoad: function() {
cc.gameresmgr = this;
this.autotilepool = [];
this.spritepool = [];
this.lootpool = [];
this.npcpool = [];
this.weaponpool = [];
this.hurtpool = [];
this.effpool = [];
this.bulletpool = [];
this.shadowpool = [];
this.weapinarr = [];
this.hurtarr = [];
this.effarr = [];
this.bulletarr = [];
this.movefabarr = [];
this.shadowarr = [];
this.parpbs = {};
this.parpbsIns = {};
this.breadyFrame = {};
this.buffpoolicon = [];
this.warningpool = [];
this.warningarr = [];
this.droppool = [];
this.piecearr = [];
},
initdata: function() {
this.winwidth = cc.winSize.width;
this.winheight = cc.winSize.height;
var t = new cc.RenderTexture();
t.initWithSize(this.winwidth, this.winheight);
this.gamecamera.targetTexture = t;
var e = new cc.SpriteFrame();
e.setTexture(this.gamecamera.targetTexture);
this.sp_1.spriteFrame = e;
this.mat = this.sp_1.getMaterial(0);
this.mat.setProperty("m_mode", 1);
this.mat.setProperty("m_effectRadius", .2);
var i = this.winwidth / 2 / this.winwidth, s = (this.winheight / 2 + 256) / this.winheight;
this.mat.effect.setProperty("m_px", i);
this.mat.effect.setProperty("m_py", s);
this.mat.effect.setProperty("flagmohu", 0);
cc.gameMgr.gamelogic.dixing.niuqu && this.mat.effect.setProperty("flagreniuqu", 1);
},
effmohu: function(t) {
this.showmohu = !0;
this.mohutime = 0;
this.mohuovertime = t;
this.mat.effect.setProperty("flagmohu", 1);
},
effmohuover: function() {
this.mohutime = this.mohuovertime;
},
effxuanwo: function(t, e) {
this.showxuanwo = !0;
this.startx = t;
this.starty = e;
var i = 1.5 * (this.startx - cc.gameMgr.player.x), s = 1.5 * (this.starty - cc.gameMgr.player.y), n = (this.winwidth / 2 + i) / this.winwidth, a = (this.winheight / 2 + s + 256) / this.winheight;
this.utime = 0;
this.mat.effect.setProperty("m_time", this.utime);
this.mat.effect.setProperty("m_cx", n);
this.mat.effect.setProperty("m_cy", a);
this.mat.setProperty("m_mode", 2);
},
createshadow: function(t) {
var e, i = (e = this.shadowpool.length > 0 ? this.shadowpool.pop() : cc.instantiate(this.pb_shadow)).getComponent("cc.Sprite");
i.sizeMode = t.sp_role.sizeMode;
i.trim = t.sp_role.trim;
i.spriteFrame = t.sp_role.spriteFrame;
e.color = t.sp_role.node.color;
e.scale = t.node.scale;
var s = t.sp_role.node;
e.width = s.width;
e.height = s.height;
e.anchorY = 0;
e.scaleX *= s.scaleX;
e.scaleY *= s.scaleY;
e.lifetime = .5;
e.x = t.node.x;
e.y = t.node.y + s.y * t.node.scale;
e.opacity = 255;
e.zIndex = t.node.zIndex - 1;
t.node.parent.addChild(e);
this.shadowarr.push(e);
},
loadprefab: function(t, e) {
if (this.parpbs[t]) {
var i = cc.instantiate(this.parpbs[t]);
i.parname = t;
e(i);
} else {
var s = this;
if (null == this.breadyFrame[t]) {
this.breadyFrame[t] = [];
cc.resources.load("prefabs/" + t, cc.Prefab, function(e, i) {
if (!e) {
s.parpbs[t] = i;
for (var n = s.breadyFrame[t], a = n.length - 1; a >= 0; a--) {
var o = cc.instantiate(i);
o.parname = t;
n[a](o);
}
s.breadyFrame[t] = null;
}
});
}
this.breadyFrame[t].push(e);
}
},
createprefab: function(t, e) {
this.parpbsIns[t] || (this.parpbsIns[t] = []);
this.parpbsIns[t].length > 0 ? e(this.parpbsIns[t].pop()) : this.loadprefab(t, e);
},
recoverprefab: function(t, e) {
e.removeFromParent(!1);
this.parpbsIns[t].push(e);
},
createmoveprefab: function(t, e) {
if (cc.notani) cc.soundMgr.playSound("dragon"); else {
var i = t.prefab, s = this;
this.createprefab(i, function(i) {
i.getComponent("moveprefab").initdata(t);
e.addChild(i);
s.movefabarr.push(i);
});
}
},
createnpc: function() {
return this.npcpool.length > 0 ? this.npcpool.pop() : cc.instantiate(this.pb_npc);
},
createautotile: function(t) {
var e = this.createsprite(), i = this;
cc.resources.load("tileset/tile" + t.tileid, cc.SpriteFrame, function(t, s) {
!t && i.isValid && (e.getComponent("cc.Sprite").spriteFrame = s);
});
return e;
},
createsprite: function() {
var t;
this.spritepool.length > 0 ? t = this.spritepool.pop() : (t = new cc.Node()).addComponent("cc.Sprite");
return t;
},
createloot: function(t, e, s) {
var n;
(n = this.lootpool.length > 0 ? this.lootpool.pop() : new i()).initdata(t, {
x: e,
y: s
});
return n;
},
createweapon: function(t) {
var e;
(e = this.weaponpool.length > 0 ? this.weaponpool.pop() : cc.instantiate(this.pb_weapon)).getComponent("weapondisplay").showani(t);
this.weapinarr.push(e);
t.parent.addChild(e);
return e;
},
createeff: function(t, e) {
var i = cc.instantiate(this.pb_effframe);
i.getComponent("frameani").initdata(t, e);
this.effarr.push(i);
return i;
},
createbullet: function(t) {
if (!cc.notani) {
var e;
(e = this.bulletpool.length > 0 ? this.bulletpool.pop() : cc.instantiate(this.pb_bullet)).getComponent("bulletdisplay").initdata(t);
this.bulletarr.push(e);
return e;
}
},
createhurtlb: function(t, e) {
if (!cc.nodmglb) {
var i;
(i = this.hurtpool.length > 0 ? this.hurtpool.pop() : cc.instantiate(this.pb_hurtlb)).getComponent("dmglb").showdmg(t, e, this);
this.hurtarr.push(i);
cc.gameMgr.ndui.addChild(i);
return i;
}
},
createwarning: function(t) {
if (!cc.notani) {
var e;
(e = this.warningpool.length > 0 ? this.warningpool.pop() : cc.instantiate(this.pb_warning)).getComponent("pbwarning").initdata(t);
this.warningarr.push(e);
cc.gameMgr.nd_down.addChild(e);
return e;
}
},
createbufficon: function(t) {
var e;
(e = this.buffpoolicon.length > 0 ? this.buffpoolicon.pop() : cc.instantiate(this.pb_buff)).getComponent("pbbufficon").initdata(t);
return e;
},
createdrop: function(t) {
var e;
(e = this.droppool.length > 0 ? this.droppool.pop() : cc.instantiate(this.pb_drop)).getComponent("pbdrop").initdata(t);
return e;
},
recoverdrop: function(t) {
t.removeFromParent(!1);
this.droppool.push(t);
},
recoverbufficon: function(t) {
t.removeFromParent(!1);
this.buffpoolicon.push(t);
},
recoverloot: function(t) {
t.removeFromParent(!1);
this.lootpool.push(t);
},
recoversprite: function(t) {
t.removeFromParent(!1);
this.spritepool.push(t);
},
recovernpc: function(t) {
t.removeFromParent(!1);
this.npcpool.push(t);
},
recoverautotile: function(t) {
this.recoversprite(t);
},
updatearr: function(t, e, i) {
for (var s = e.length - 1; s >= 0; s--) {
var n = e[s];
if (n.ctrl.doupdate(t)) {
n.removeFromParent(!1);
i.push(n);
e.splice(s, 1);
}
}
},
updatearrnopool: function(t, e) {
for (var i = e.length - 1; i >= 0; i--) {
var s = e[i];
if (s.ctrl.doupdate(t)) {
s.destroy();
e.splice(i, 1);
}
}
},
doupdate: function(t) {
this.updatearr(t, this.weapinarr, this.weaponpool);
this.updatearr(t, this.hurtarr, this.hurtpool);
this.updatearrnopool(t, this.effarr);
this.updatearr(t, this.bulletarr, this.bulletpool);
this.updatearr(t, this.warningarr, this.warningpool);
for (var e = this.movefabarr.length - 1; e >= 0; e--) {
var i = this.movefabarr[e];
if (i.ctrl.doupdate(t)) {
this.recoverprefab(i.ctrl.pname, i);
this.movefabarr.splice(e, 1);
}
}
for (e = this.shadowarr.length - 1; e >= 0; e--) {
this.shadowarr[e].lifetime -= t;
this.shadowarr[e].opacity -= 255 * t;
if (this.shadowarr[e].lifetime <= 0) {
this.shadowpool.push(this.shadowarr[e]);
this.shadowarr[e].removeFromParent(!1);
this.shadowarr.splice(e, 1);
}
}
if (this.showxuanwo) {
this.utime += t;
this.utime > 5 && (this.utime += 4 * t);
this.mat.effect.setProperty("m_time", this.utime);
var s = 1.5 * (this.startx - cc.gameMgr.player.x), n = 1.5 * (this.starty - cc.gameMgr.player.y), a = (this.winwidth / 2 + s) / this.winwidth, o = (this.winheight / 2 + n + 256) / this.winheight;
this.mat.effect.setProperty("m_cx", a);
this.mat.effect.setProperty("m_cy", o);
if (this.utime > 10.5) {
this.showxuanwo = !1;
this.mat.setProperty("m_mode", 1);
}
}
if (this.showmohu) {
this.mohutime += t;
var c = this.mohutime, r = this.mohuovertime - this.mohutime;
r < .2 && (c = r);
this.mat.effect.setProperty("m_mohutime", .3 * c);
if (r <= 0) {
this.showmohu = !1;
this.mat.effect.setProperty("flagmohu", 0);
}
}
for (e = this.piecearr.length - 1; e >= 0; e--) {
var l = this.piecearr[e];
l.x += t * l.sx;
l.y += t * l.sy;
l.opacity -= 255 * t;
l.opacity <= 0 && this.piecearr.splice(e, 1);
}
},
clean: function() {
this.weapinarr.length = 0;
this.hurtarr.length = 0;
this.effarr.length = 0;
},
createdead: function(t, e) {
var i = t.sp_role.node, n = Math.max(i.width, i.height);
n *= t.node.scale;
n *= 1.6;
for (var a = i.height / 32, o = s.rendernode(t.node, n), c = (t.node.parent, n), r = n, l = Math.floor(c / 8), h = Math.ceil(c / l), p = Math.ceil(r / l), d = {
x: [],
y: [],
nu: [],
nv: []
}, u = 0; u <= h; u++) for (var f = Math.min(u * l, c), g = 0; g <= p; g++) {
var y = Math.min(g * l, r);
d.x.push(f);
d.y.push(y);
d.nu.push(f / c);
d.nv.push(y / r);
}
for (var m = h * p, b = 0; b < m; b++) {
var v = Math.floor(b / p), k = v * (p + 1) + b % h, _ = k + 1, w = k + p + 1, x = w + 1, C = {
x: d.x,
y: d.y,
nu: d.nu,
nv: d.nv,
triangles: [ k, _, w, w, x, _ ]
}, S = new cc.Node(), q = S.addComponent(cc.Sprite);
S.width = c;
S.height = r;
q.type = 4;
q.spriteFrame = new cc.SpriteFrame(o._texture);
q.spriteFrame.vertices = C;
q.setVertsDirty();
S.x = t.node.x;
S.y = t.node.y;
S.zIndex = t.node.index;
S.sx = 10 * Math.random() + 40;
var M = e < 0 ? v : p - v;
S.sy = .2 * S.sx * M;
S.sx *= e;
S.sx *= a;
S.sy *= a;
S.scale /= 1.5;
cc.gameMgr.ndplayer.addChild(S);
this.piecearr.push(S);
}
}
});
cc._RF.pop();
}, {
Utils: "Utils",
gameloot: "gameloot"
} ],
