gameManager: [ function(t, e) {
"use strict";
cc._RF.push(e, "921canwaR9EhI/x2kvqh1rl", "gameManager");
var i = t("Utils"), s = t("gamelogic"), n = t("enumcfg").enumobjtype;
cc.Class({
extends: cc.Component,
properties: {
map: {
default: null,
type: cc.Node
},
pb_gameui: {
default: null,
type: cc.Prefab
},
nd_ground2: {
default: null,
type: cc.Node
},
sp_sky: {
default: null,
type: cc.Sprite
}
},
refreshboss: function(t) {
if (1 == t) ; else if (2 == t && !this.hasrefreshboss) {
this.uic.refreshboss();
this.hasrefreshboss = !0;
}
},
createeff: function(t) {
for (var e = t.length - 1; e >= 0; e--) {
var i = this.resmgr.createeff(t[e].eff, t[e].time);
i.x = t[e].x;
i.y = t[e].y + i.ctrl.anioffy;
t[e].fx && (i.scaleX *= t[e].fx);
t[e].ani && i.ctrl.hook(t[e].ani);
t[e].ground ? this.nd_down.addChild(i) : this.ndeff.addChild(i);
}
},
createscreen: function(t) {
if (t) {
var e = this.resmgr.createeff(t);
e.x = 0;
e.y = e.ctrl.anioffy;
e.scaleY = e.ctrl.cfg.scaleY;
this.map.parent.addChild(e);
}
},
createplayer: function(t) {
var e = this.resmgr.createnpc();
e.getComponent("playerctrl").initdata(t);
this.ndplayer.addChild(e);
return e;
},
createloot: function(t, e, i) {
var s = this.resmgr.createloot(t, e, i);
s.zIndex = this.zindexplus - i + s.zplus;
this.ndplayer.addChild(s);
return s;
},
createonetile: function(t) {
var e = this.resmgr.createautotile(t);
e.x = t.x;
e.y = t.y;
e.scale = 1.1;
e.zIndex = -e.y;
this.nd_ground.addChild(e);
return e;
},
onDestroy: function() {
this.uic = null;
cc.gamemgr = null;
},
start: function() {
cc.quqlitymode = !0;
cc.gameMgr = this;
this.gamelogic = new s();
this.gamelogic.init();
var t = this.gamelogic.dixing.background, e = this;
cc.resources.load("bg/" + t, cc.SpriteFrame, function(t, i) {
t || (e.sp_sky.spriteFrame = i);
});
var i = cc.instantiate(this.pb_gameui);
this.node.parent.addChild(i);
this.uic = i.getComponent("gameUI");
this.uic.init(this);
this.framecount = 0;
this.map.scale = 1.5;
this.viewwidth = (cc.winSize.width / 2 + 100) / this.map.scale;
this.viewhight = 456 / this.map.scale;
this.nd_ground = new cc.Node();
this.map.addChild(this.nd_ground);
this.nd_down = new cc.Node();
this.map.addChild(this.nd_down);
this.ndplayer = new cc.Node();
this.map.addChild(this.ndplayer);
this.ndbullet = new cc.Node();
this.map.addChild(this.ndbullet);
this.ndeff = new cc.Node();
this.map.addChild(this.ndeff);
this.ndui = new cc.Node();
this.map.addChild(this.ndui);
this.resmgr = cc.gameresmgr;
this.resmgr.initdata();
this.playerarr = [];
this.tilearr = [];
this.lootarr = [];
this.droparr = [];
this.tilemap = new Map();
this.lootmap = new Map();
this.zindexplus = 0;
},
joyMove: function(t) {
this.movehold = !0;
this.movedir = t.normalize();
},
joyMoveEnd: function() {
this.movehold = !1;
},
joyMoveBegin: function() {
this.movehold = !0;
},
onclickchangeweapon: function() {
this.ckickweapon = !0;
},
onclickskill: function(t) {
this.clickskillidx = Number(t);
},
onclickuserskill: function(t) {
this.clickskillidx2 = Number(t);
},
report: function() {
var t = {};
if (null != this.movehold) {
t.movehold = this.movehold;
this.movehold = void 0;
}
if (this.movedir) {
t.movedir = this.movedir;
this.movedir = void 0;
}
if (this.ckickweapon) {
t.ckickweapon = this.ckickweapon;
this.ckickweapon = void 0;
}
if (null != this.clickskillidx) {
t.clickskillidx = this.clickskillidx;
this.clickskillidx = void 0;
}
if (null != this.clickskillidx2) {
t.clickskillidx2 = this.clickskillidx2;
this.clickskillidx2 = void 0;
}
if (null != this.dropid) {
t.dropid = this.dropid;
this.dropid = void 0;
}
if (null != this.catch) {
t.catch = this.catch;
this.catch = void 0;
}
if (null != this.fuhuo) {
t.fuhuo = this.fuhuo;
this.fuhuo = void 0;
}
this.gamelogic.ongui(t);
},
lerpv: function(t, e, i) {
return t + (e - t) * i;
},
updategroundtile: function() {
for (var t = this.player.x, e = this.player.y, i = 0, s = 0, n = 0, a = this.tilearr.length - 1; a >= 0; a--) {
i = this.tilearr[a].x - t;
s = this.tilearr[a].y - e;
n = this.tilearr[a].uuid;
var o = this.tilemap.get(n);
if (Math.abs(i) > this.viewwidth || Math.abs(s) > this.viewhight) {
if (o) {
this.resmgr.recoverautotile(o);
this.tilemap.delete(n);
}
} else if (!o) {
var c = this.createonetile(this.tilearr[a]);
this.tilemap.set(n, c);
}
}
for (var r = this.lootarr.length - 1; r >= 0; r--) {
var l = this.lootarr[r];
i = l.x - t;
s = l.y - e;
n = l.uuid;
o = this.lootmap.get(n);
if (Math.abs(i) > this.viewwidth || Math.abs(s) > this.viewhight) {
if (o) {
this.resmgr.recoverloot(o);
this.lootmap.delete(n);
}
l.inview = !1;
} else {
if (o) this.resetzIndex && (o.zIndex = this.zindexplus - o.y + o.zplus); else {
c = this.createloot(l.lootid, l.x, l.y);
this.lootmap.set(n, c);
}
l.inview = !0;
}
}
this.resetzIndex = !1;
},
updateflag: function(t) {
t.flaghasbaby && this.uic.docheckbaby(!0);
t.flagnobaby && this.uic.docheckbaby(!1);
},
update: function(t) {
if (!cc.gamepause) {
this.framecount++;
this.report();
var e = this.gamelogic.update(t);
this.updateflag(e);
this.refreshboss(e.bossstep);
this.createscreen(e.screenres);
this.createeff(e.effarr);
this.creareobj(e.addarr);
this.deleteobj(e.delarr);
this.updateplayer(t);
this.player.pctrl.updateactive();
if (!this.spx) {
this.spx = this.player.x;
this.spy = this.player.y;
}
this.spx = this.player.x;
this.spy = this.player.y;
this.map.x = -this.player.x * this.map.scale;
this.map.y = -this.player.y * this.map.scale;
if (e.areachange) {
this.resetzIndex = !0;
this.zindexplus = e.zindexplus;
this.tilearr = e.tileold;
this.lootarr = e.lootold;
this.updategroundtile();
}
for (var i = this.droparr.length - 1; i >= 0; i--) this.droparr[i].ctrl.doupdate(t);
this.tilearr = e.tilearr;
this.lootarr = e.lootarr;
this.updategroundtile();
this.updatezindex();
this.resmgr.doupdate(t);
}
},
lateUpdate: function() {
this.gamelogic.afterupdate();
},
creareobj: function(t) {
for (var e = t.length - 1; e >= 0; e--) {
var i = t[e];
if (i.objtype == n.npcobj) {
var s = this.createplayer(i);
s.isplayer && (this.player = s);
this.playerarr.push(s);
} else if (i.objtype == n.bulletobj) this.resmgr.createbullet(i); else if (i.objtype == n.dragonobj) this.resmgr.createmoveprefab(i, this.ndeff); else if (i.objtype == n.warningobj) this.resmgr.createwarning(i); else if (i.objtype == n.dropobj) {
var a = this.resmgr.createdrop(i);
this.nd_down.addChild(a);
this.droparr.push(a);
}
}
},
deleteobj: function(t) {
for (var e = t.length - 1; e >= 0; e--) {
var i = t[e];
if (i.objtype == n.npcobj) {
for (var s = this.playerarr.length - 1; s >= 0; s--) if (this.playerarr[s].pctrl.objdata.uuid == t[e].uuid) {
this.resmgr.recovernpc(this.playerarr[s]);
this.playerarr.splice(s, 1);
break;
}
} else if (i.objtype == n.dropobj) for (s = this.droparr.length - 1; s >= 0; s--) if (this.droparr[s].ctrl.objuuid == t[e].uuid) {
this.resmgr.recoverdrop(this.droparr[s]);
this.droparr.splice(s, 1);
break;
}
}
},
updateplayer: function(t) {
for (var e = this.playerarr.length - 1; e >= 0; e--) this.playerarr[e].pctrl.doupdate(t);
},
updatezindex: function() {
if (this.framecount % 5 == 0) for (var t = this.playerarr.length - 1; t >= 0; t--) {
var e = this.playerarr[t];
e.zIndex = this.zindexplus - e.y + e.zplus;
}
},
getNearDrop: function() {
var t = this;
if (0 == this.droparr.length) return null;
this.droparr = this.droparr.sort(function(e, i) {
return Math.pow(t.player.x - e.x, 2) + Math.pow(t.player.y - e.y, 2) - (Math.pow(t.player.x - i.x, 2) + Math.pow(t.player.y - i.y, 2));
});
return i.hitTestCircle(this.droparr[0], this.player) ? this.droparr[0] : null;
}
});
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
gamelogic: "gamelogic"
} ],
