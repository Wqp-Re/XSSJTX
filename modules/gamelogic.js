gamelogic: [ function(t, e) {
"use strict";
cc._RF.push(e, "b9a0cWRrnFGmINmRjIZ7QXh", "gamelogic");
var i = t("perlinnoise"), s = t("Utils"), n = t("lootobj"), a = t("npcobj"), o = t("bulletobj"), c = t("equipobj"), r = t("lootcfg"), l = t("dragonobj"), h = t("dropobj"), p = t("dropcfg"), d = p.dropcfg, u = p.cailiao1, f = p.cailiao2, g = t("stagecfg"), y = g.stagecfg, m = g.dixing, b = t("talentcfg"), v = t("gameConfig").itemConfig, k = cc.v2(0, 1), _ = [ [ 34009, 34026 ], [ 34032, 34049 ], [ 34055, 34072 ] ], w = [ 20502, 20510 ], x = [ 31021, 31022, 31023, 20523, 20524, 20525, 20526 ], C = [ 20607, 20608, 20609, 32010, 32011, 32012, 32013, 32014, 32015 ], S = [ 20027, 20127, 20227, 20327, 20427, 20028, 20128, 20228, 20328, 20428, 20029, 20129, 20229, 20329, 20429 ], q = [ 10025, 10119, 10225 ], M = function() {
this.player = {
lv: 100,
talentarr: [ b[1041], b[1043] ],
equiparr: [],
setforvaule: [],
skillarr: [ 22, 23, 24 ],
vit: 800,
dex: 200,
int: 2800,
str: 2800,
luk: 200,
agi: 800,
exp: "-",
maxexp: "-",
getelement: function() {
return [ 0, 5, 5 ];
}
};
this.w1 = new c().initwithid(99999, 100, 5);
this.w2 = new c().initwithid(99998, 100, 5);
this.w3 = new c().initwithid(99997, 100, 5);
this.stage = 999;
this.getweaponarr = function() {
return [ this.w1, this.w2, this.w3 ];
};
};
e.exports = function() {
this.init = function() {
cc.battlelogic = this;
this.babycount = 0;
this.xgird = 256;
this.ygird = 256;
this.objuuid = 1;
this.tilearr = [];
this.lootarr = [];
this.npcobjcache = [];
this.playerarr = [];
this.useskillarr = [];
this.laterbulletarr = [];
this.addarr = [];
this.delarr = [];
this.viewplayer = {};
this.areamap = {};
this.areamapdynamic = {};
this.zindexplus = 0;
this.uidir = cc.v2(0, 0);
this.bulletarr = [];
this.spobjarr = [];
this.droparr = [];
this.effarr = [];
this.monsterarea = {};
this.screenres = void 0;
this.enemycount = 0;
this.anitime = 10;
if (cc.newbiebattle) {
cc.stageid = 1e4;
this.newbiemode = !0;
this.playerData = new M();
cc.newbiebattle = !1;
} else {
this.newbiemode = !1;
this.playerData = cc.playerData;
}
var t = s.randint(1e3);
cc.hell ? cc.stageid = 100 : cc.wujin && (cc.stageid = cc.wujincount % 50 + 1);
var e = y[cc.stageid];
this.mapsize = e.size;
this.mapsize || (this.mapsize = 15);
this.mappixisizew = 64 * this.mapsize;
this.mappixisizeh = 32 * this.mapsize;
this.center = cc.v2(this.mappixisizew / 2, this.mappixisizeh / 2);
this.player = this.createnpc({
camp: 1,
lv: this.playerData.player.lv,
isplayer: !0,
x: this.mappixisizew / 2,
y: this.mappixisizeh / 2
});
this.playerData.battlepet && (this.petplayer = this.createnpc({
camp: 1,
lv: this.playerData.battlepet.lv,
petdata: this.playerData.battlepet,
x: this.mappixisizew / 2,
y: this.mappixisizeh / 2
}));
this.servertime = new Date().getTime();
this.killcount = 0;
this.bossing = !1;
this.bossstep = 0;
cc.soundMgr.playbgm("lv" + e.mainpart);
this.isshousha = cc.stageid == cc.playerData.stage;
this.dixing = m[e.mainpart];
this.createmap(t, e);
for (var i = 0; i < this.maxmonstercount; i++) this.createmonster();
};
this.createmonster = function() {
k = s.dirRotate(k, s.randintSeed(360));
var t = s.randintSeed(100) + 100;
this.createnpc({
camp: 2,
lv: this.mosetlv + s.randintSeed(2),
isplayer: !1,
x: this.center.x + t * k.x,
y: this.center.y + t * k.y,
cfgid: this.qz(this.monsters)
});
};
this.updatemoster = function(t) {
if (this.bossing) {
if (this.bosstime > 0) {
this.bosstime -= t;
if (this.bosstime <= 0) {
this.babycount = 0;
this.createboss();
}
}
} else {
if (this.enemycount < this.maxmonstercount) {
this.monstertime += t;
if (this.monstertime >= this.createtime) {
this.monstertime = 0;
this.createmonster();
}
}
if (this.killcount >= this.bosscount) {
if (this.baby && this.baby.fying) return;
cc.Notifier.emit("bosswarning");
this.bossing = !0;
this.bosstime = 3;
this.bossstep = 1;
for (var e = this.playerarr.length - 1; e >= 0; e--) {
var i = this.playerarr[e];
2 == i.camp && i.dodeadnojiangli();
}
}
}
};
this.getjindu = function() {
return this.killcount / this.bosscount;
};
this.createboss = function() {
this.bossobj = this.createnpc({
camp: 2,
lv: this.mosetlv,
isplayer: !1,
x: this.center.x + .1,
y: this.center.y + .12,
cfgid: this.bossid,
isboss: !0
});
this.bossstep = 2;
};
this.createmap = function(t, e) {
var a = cc.stageid == this.playerData.stage;
this.monstertime = 0;
var o = 1;
this.isshousha && (o = 3);
this.createtime = e.createtime || o;
this.maxmonstercount = e.count || 10;
this.mosetlv = e.lv;
this.mosetlv || (this.mosetlv = 3 * cc.stageid);
if (cc.hell) {
if (this.mosetlv < cc.playerData.player.lv) {
var c = (cc.playerData.player.lv - this.mosetlv) / 2;
this.mosetlv += c;
this.mosetlv = Math.floor(this.mosetlv);
}
} else cc.wujin ? this.mosetlv = 500 + 50 * cc.wujincount : cc.shenyuan && (this.mosetlv += 150);
var l = e.monsters;
if (e.finishmonster && !a) {
l += e.finishmonster;
cc.lanrenmode && (l += e.finishmonster);
}
this.monsters = s.strintoarr(l);
this.bosscount = e.bosscount || 20;
e.boss ? this.bossid = e.boss : this.bossid = this.qz(this.monsters);
e.firstboss && a && (this.bossid = e.firstboss);
for (var h = e.lootchance || 0, p = this.mapsize, d = this.mapsize, u = i.createmap(p, d, t, .3), f = [], g = 0, y = u.length; g < y; g++) f.push(u[g]);
var b = [], v = 0, k = m[e.mainpart].part;
for (g = 0; g < k.length; g++) v += k[g][1];
var _ = 0;
for (g = 0; g < k.length; g++) {
_ += k[g][1];
b.push(_ / v);
}
for (g = 0; g < p; g++) for (y = 0; y < d; y++) for (var w = u[g][y], x = 0; x < b.length; x++) if (w <= b[x]) {
var C = k[x][0];
u[g][y] = C;
f[g][y] < 1 && (f[g][y] = -C);
break;
}
for (var S = 0; S < p; S++) for (var q = 0; q < d; q++) {
u[S][q];
var M = {
x: 32 * S + 32 * q + 32,
y: 16 * S - 16 * q + this.mappixisizeh / 2 - 16,
tileid: Math.abs(f[S][q])
}, D = Math.floor(M.x / this.xgird) + "_" + Math.floor(M.y / this.ygird);
this.areamap[D] || (this.areamap[D] = []);
this.areamap[D].push(M);
this.objuuid++;
M.uuid = this.objuuid;
if (0 != S && S != p - 1 && 0 != q && q != d - 1 && s.randint(100) < h) {
var F = this.qz(e.loots);
if (-1 != F) {
r[F];
this.areamapdynamic[D] || (this.areamapdynamic[D] = []);
this.objuuid++;
var T = new n();
T.init({
lootid: F,
x: M.x,
y: M.y,
uuid: this.objuuid
}, this);
this.areamapdynamic[D].push(T);
}
}
}
};
this.createnpc = function(t) {
2 == t.camp && this.enemycount++;
this.objuuid++;
t.uuid = this.objuuid;
var e;
(e = this.npcobjcache.length > 0 ? this.npcobjcache.pop() : new a()).init(t, this);
this.playerarr.push(e);
this.addarr.push(e);
return e;
};
this.qz = function(t) {
if (0 == t.length) return -1;
for (var e = 0, i = [], n = 0; n < t.length; n++) {
e += t[n][1];
i.push(e);
}
if (e <= 0) return Math.floor(Math.random() * t.length);
var a = 0, o = s.randintSeed(e);
for (n = 0; n < i.length; n++) if (o < i[n]) {
a = n;
break;
}
return t[a][0];
};
this.createlootdynamic = function(t, e, i) {
var s = Math.floor(e / this.xgird) + "_" + Math.floor(i / this.ygird);
this.areamapdynamic[s] || (this.areamapdynamic[s] = []);
this.objuuid++;
var a = new n();
a.init({
lootid: t,
x: e,
y: i,
uuid: this.objuuid
}, this);
this.areamapdynamic[s].push(a);
this.lootarr.push(data);
};
this.update = function(t) {
this.servertime = new Date().getTime();
this.updatemoster(t);
this.updatetoulan(t);
this.inviewloots = [];
for (var e = this.lootarr.length - 1; e >= 0; e--) this.lootarr[e].inview && this.lootarr[e].checkmove && this.inviewloots.push(this.lootarr[e]);
for (e = this.playerarr.length - 1; e >= 0; e--) {
var i = this.playerarr[e];
if (i.update(t)) {
2 == i.camp && this.enemycount--;
this.playerarr.splice(e, 1);
this.npcobjcache.push(i);
this.delarr.push(i);
}
}
for (e = this.bulletarr.length - 1; e >= 0; e--) this.bulletarr[e].update(t) && this.bulletarr.splice(e, 1);
for (e = this.spobjarr.length - 1; e >= 0; e--) this.spobjarr[e].update(t) && this.spobjarr.splice(e, 1);
for (e = this.droparr.length - 1; e >= 0; e--) if (this.droparr[e].update(t)) {
this.delarr.push(this.droparr[e]);
this.droparr.splice(e, 1);
}
for (e = this.laterbulletarr.length - 1; e >= 0; e--) {
var s = this.laterbulletarr[e];
s.t -= t;
if (s.t <= 0) {
this.bulletarr.push(s.v);
this.addarr.push(s.v);
this.laterbulletarr.splice(e, 1);
}
}
var n = this.player.x, a = this.player.y, o = Math.floor(n / this.xgird), c = Math.floor(a / this.ygird), r = o + "_" + c, l = !1, h = this.tilearr, p = this.lootarr;
if (this.pareakey != r) {
this.zindexplus = c * this.ygird;
this.resetzIndex = !0;
l = !0;
var d = o - 1, u = o + 1, f = c - 1, g = c + 1, y = [ o + "_" + c, o + "_" + f, o + "_" + g, d + "_" + c, d + "_" + f, d + "_" + g, u + "_" + c, u + "_" + f, u + "_" + g ];
this.tilearr = [];
this.lootarr = [];
e = 0;
for (var m = y.length; e < m; e++) {
var b = this.areamap[y[e]];
if (b) for (var v = 0, k = b.length; v < k; v++) this.tilearr.push(b[v]);
var _ = this.areamapdynamic[y[e]];
if (_) for (v = 0, k = _.length; v < k; v++) this.lootarr.push(_[v]);
}
this.pareakey = r;
}
return {
areachange: l,
tileold: h,
tilearr: this.tilearr,
lootold: p,
lootarr: this.lootarr,
player: this.player,
zindexplus: this.zindexplus,
addarr: this.addarr,
delarr: this.delarr,
flagreplayer: this.flagreplayer,
flaghasbaby: this.flaghasbaby,
flagnobaby: this.flagnobaby,
playerarr: this.playerarr,
effarr: this.effarr,
screenres: this.screenres,
bossstep: this.bossstep
};
};
this.createeff = function(t) {
this.effarr.push(t);
};
this.createscreen = function(t) {
this.screenres = t;
};
this.afterupdate = function() {
this.flaghasbaby = !1;
this.flagnobaby = !1;
this.flagreplayer = !1;
this.player.flagskillchange = !1;
this.player.flagweaponchange = !1;
this.player.flagskillcd.length = 0;
this.addarr.length = 0;
this.delarr.length = 0;
this.effarr.length = 0;
this.bossstep = 0;
this.screenres = void 0;
for (var t = this.playerarr.length - 1; t >= 0; t--) {
var e = this.playerarr[t];
e.flaguseskill = null;
e.dmgarr.length = 0;
e.flagaddbuff.length = 0;
e.flagremovebuff.length = 0;
e.skipadd = void 0;
e.deadinthisframe = !1;
e.reborninthiframe = !1;
e.flagbuzhuo = !1;
e.flagyongchang = !1;
e.flagchangeuserskill = !1;
e.flaglvup = !1;
e.flagfuhuo = !1;
}
};
this.ongui = function(t) {
if (null != t.movehold) if (t.movehold) this.player.movebegin(); else {
this.uidir.x = 0;
this.uidir.y = 0;
this.player.moveend();
}
if (t.movedir) {
this.uidir.x = t.movedir.x;
this.uidir.y = t.movedir.y;
this.player.setmovedir(t.movedir.x, t.movedir.y);
}
t.ckickweapon && this.player.ckickweapon();
null != t.clickskillidx && this.player.clickskill(t.clickskillidx);
null != t.clickskillidx2 && this.player.clickskill2(t.clickskillidx2);
t.dropid && this.getitem(t.dropid);
t.catch && this.catchbaby(t.catch);
if (t.fuhuo) {
this.player.reset();
this.player.addbuff(4007, 100, 1);
}
};
this.findnpcwithcmp = function(t, e, i) {
for (var s = [], n = this.playerarr, a = n.length - 1; a >= 0; a--) n[a].inview && n[a].camp == e && !n[a].isdead() && s.push(n[a]);
i && (s = s.sort(function(e, i) {
return Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2) - (Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2));
}));
return s;
};
this.getenemycamp = function(t) {
var e = 1;
1 == t.camp && (e = 2);
return e;
};
this.pushbullet = function(t) {
if (t.cfg.warning) {
var e = {
t: t.cfg.warning,
v: t,
objtype: 100
};
this.laterbulletarr.push(e);
this.addarr.push(e);
} else if (t.cfg.warning2) {
e = {
t: t.cfg.warning2,
v: t.getwarning2(),
objtype: 100
};
var i = {
t: t.cfg.warning2,
v: t,
objtype: 100
};
this.laterbulletarr.push(i);
this.addarr.push(e);
} else {
this.bulletarr.push(t);
this.addarr.push(t);
}
};
this.createbullets = function(t, e, i, n) {
for (var a = i.x, c = i.y, r = 0, l = e.length - 1; l >= 0; l--) {
var h = e[l];
r = h[2];
if (0 != h[3]) {
r -= h[3] / 2;
r += s.randintSeed(h[3]);
}
var p = s.dirRotate(n, r), d = new o();
d.init(t, h[0], a + p.x * h[1], c + p.y * h[1], p, i);
this.pushbullet(d);
}
};
this.createbulletspingxing = function(t, e, i, n) {
for (var a = i.x, c = i.y, r = cc.v2(), l = 0, h = e.length - 1; h >= 0; h--) {
var p = e[h], d = s.dirRotate(n, 90), u = s.randintSeed(p[2]) - p[2] / 2;
r.x = a + d.x * u;
r.y = c + d.y * u;
r.x = r.x + n.x * p[1];
r.y = r.y + n.y * p[1];
l = p[3];
if (0 != p[4]) {
l -= p[4] / 2;
l += s.randintSeed(p[4]);
}
var f = s.dirRotate(n, l), g = new o();
g.init(t, p[0], r.x, r.y, f, i);
this.pushbullet(g);
}
};
this.createbulletsground = function(t, e, i, n, a) {
for (var c = n.x, r = n.y, l = e.length - 1; l >= 0 && !(a && s.getdistancenosqrt(i, n) > a); l--) {
var h = e[l], p = new o();
1 == n.objtype && (p.hittar = n);
p.init(t, h[0], c + h[1], r + h[2], cc.v2(0, 0), i);
this.pushbullet(p);
}
};
this.createbulletsgroundrand = function(t, e, i, n) {
for (var a = n.x, c = n.y, r = e.length - 1; r >= 0; r--) {
var l = e[r], h = new o();
h.init(t, l[0], a + s.randintSeed(l[1]) - l[1] / 2, c + s.randintSeed(l[2]) - l[2] / 2, cc.v2(0, 0), i);
this.pushbullet(h);
}
};
this.createonebullet = function(t, e, i, s, n, a) {
var c = new o();
c.init(t, e, i, s, n, a);
this.pushbullet(c);
};
this.createspobjs = function(t, e, i) {
for (var s = e.length - 1; s >= 0; s--) {
var n = e[s], a = null;
1 == n[0] && (a = new l());
a.init(n, i, this, t);
this.spobjarr.push(a);
this.addarr.push(a);
}
};
this.createbulletsgrounddir = function(t, e, i) {
for (var s = e.length - 1; s >= 0; s--) {
var n = e[s], a = new o();
a.init(t, n[0], i.x + i.dir.x * n[1], i.y + i.dir.y * n[1], cc.v2(i.dir.x, i.dir.y), i);
this.pushbullet(a);
}
};
this.getitem = function(t) {
for (var e = null, i = this.droparr.length - 1; i >= 0; i--) if (this.droparr[i].uuid == t) {
var s = this.droparr[i].itemdata;
if (s.isitem) {
this.playerData.additembyid(s.id, 1);
this.delarr.push(this.droparr[i]);
this.droparr.splice(i, 1);
e = {
cfg: v[s.id]
};
} else if (this.playerData.additem(s)) {
this.delarr.push(this.droparr[i]);
this.droparr.splice(i, 1);
e = {
cfg: s.cfg,
qulity: s.qulity
};
}
break;
}
cc.Notifier.emit("gameGetItem", e);
};
this.adddropgold = function(t) {
this.playerData.changegold(t);
var e = {
gold: t
};
cc.Notifier.emit("gameGetItem", e);
};
this.adddrop = function(t, e) {
if (v[t]) {
var i = new h().init(t, e);
if (cc.autoget) {
var s = null, n = i.itemdata;
if (n.isitem) {
this.playerData.additembyid(n.id, 1);
s = {
cfg: v[n.id]
};
} else if (cc.autosell && n.qulity < 5) {
var a = Math.floor(n.cfg.cost / 2);
this.playerData.changegold(a);
s = {
gold: a
};
} else {
this.playerData.additem(n);
s = {
cfg: n.cfg,
qulity: n.qulity
};
}
cc.Notifier.emit("gameGetItem", s);
} else {
this.droparr.push(i);
this.addarr.push(i);
}
} else console.log(t + "不存在");
};
this.createdrop = function(t) {
if (!this.newbiemode) {
cc.wujin && this.adddropgold(s.randintSeed(Math.floor(t.lv / 50)) + 1);
var e = Math.floor(t.lv / 10) + 2;
e = Math.max(Math.min(e, 10), 1);
var i = 1, n = 5;
if (t.isboss) {
i = 5;
n = 30;
this.isshousha && (i *= 2);
}
cc.dropadd && (n *= 2);
(cc.shenyuan || cc.hell) && (n *= 1.5);
for (var a = 0; a < i; a++) if (s.randintSeed(100) < n) {
var o;
if (s.randintSeed(100) > 30) {
var c = Math.ceil(e / 2), r = c + s.randintSeed(c) + 1;
r > 10 && (r = 10);
o = d[r];
} else o = t.lv >= 60 && s.randintSeed(100) > 50 ? f : u;
var l = o[s.randintSeed(o.length)];
this.adddrop(l, t);
}
(cc.hell || cc.wujin) && s.randintSeed(500) < 2 && this.adddrop(30005, t);
if (t.isboss) {
var h = n / 2;
s.randintSeed(100) < h && this.adddrop(30002, t);
s.randintSeed(100) < h && this.adddrop(30003, t);
s.randintSeed(100) < n / 4 && this.adddrop(35001, t);
s.randintSeed(100) < 4 && this.adddrop(30004, t);
var p = Math.floor(t.lv / 10);
p > 10 && (p = 10);
cc.dropadd && (p *= 2);
if (s.randintSeed(100) < p) {
var g = _[s.randintSeed(_.length)], y = g[0] + s.randintSeed(g[1] - g[0] + 1);
this.adddrop(y, t);
}
if (s.randintSeed(100) < 2 * p) {
var m = w[0] + s.randintSeed(w[1] - w[0] + 1);
s.randintSeed(100) < 2 && (m = 20511);
this.adddrop(m, t);
}
if (t.dropdata) for (a = 0; a < t.dropdata.length; a++) {
var b = t.dropdata[a];
s.randintSeed(100) < b[1] && this.adddrop(b[0], t);
}
if (cc.shenyuan || cc.hell || cc.wujin) {
if (s.randintSeed(100) < 2) {
m = x[s.randintSeed(x.length)];
this.adddrop(m, t);
}
if (s.randintSeed(100) < 5) {
m = C[s.randintSeed(C.length)];
this.adddrop(m, t);
}
if (t.dropdatasy) for (var v = 0; v < t.dropdatasy.length; v++) {
var k = t.dropdatasy[v];
s.randintSeed(100) < k[1] && this.adddrop(k[0], t);
}
}
if (cc.hell || cc.wujin) {
s.randintSeed(500) < 2 && this.adddrop(30006, t);
s.randintSeed(100) < 10 && this.adddrop(30005, t);
}
if (cc.wujin) {
var M = 500 - cc.wujincount;
M < 100 && (M = 100);
cc.dropadd && (M /= 2);
if (s.randintSeed(M) < 2) {
m = S[s.randintSeed(S.length)];
this.adddrop(m, t);
}
if (cc.wujincount >= 1e4 && s.randintSeed(1e3) < 2) {
var D = q[s.randintSeed(q.length)];
this.adddrop(D, t);
}
}
}
}
};
this.catchbaby = function(t) {
this.baby && (this.baby.isdead() || this.baby.fying || this.baby.addbuff(102, 100, void 0, void 0, void 0, void 0, void 0, t));
};
this.updatetoulan = function() {
this.anitime--;
this.player.yctime > 0 || this.anitime > 0 || this.baby && this.baby.fying || cc.autoatk && !this.player.clickingmoveing && this.player.clickskill(this.player.randskllidx(!0));
};
};
cc._RF.pop();
}, {
Utils: "Utils",
bulletobj: "bulletobj",
dragonobj: "dragonobj",
dropcfg: "dropcfg",
dropobj: "dropobj",
equipobj: "equipobj",
gameConfig: "gameConfig",
lootcfg: "lootcfg",
lootobj: "lootobj",
npcobj: "npcobj",
perlinnoise: "perlinnoise",
stagecfg: "stagecfg",
talentcfg: "talentcfg"
} ],
