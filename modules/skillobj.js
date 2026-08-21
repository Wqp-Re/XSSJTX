skillobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "fbeceGeZWlOWIBk9elyRnLS", "skillobj");
var i = t("Utils"), s = t("skillcfg"), n = t("buffcfg").buffcfg;
t("gameConfig").itemConfig, cc.v2();
e.exports = function t() {
this.init = function(e, i, n) {
this.id = e;
this.cfg = s[e];
this.savedir = cc.v2();
this.savepos = cc.v2();
this.user = n;
this.gamelogic = this.user.gamelogic;
this.type = this.cfg.type;
this.subtype = this.cfg.subtype;
this.atktype = this.cfg.atktype;
this.rcount = 0;
this.enemycamp = this.gamelogic.getenemycamp(n);
this.areapow = 0;
this.cfg.area && (this.areapow = this.cfg.area * this.cfg.area);
this.cfg.gameobjs && (this.gameobjs = this.cfg.gameobjs);
this.lv = i;
this.cfg.chancelv ? this.buffchanceup = this.cfg.chancelv * this.lv : this.buffchanceup = 0;
this.reset();
this.rebuildbullet();
if (2 == n.camp) {
var a = this.cfg.cd;
this.nowtime = a;
this.maxtime = a;
}
if (this.cfg.subskill) {
var o = this.cfg.subskill;
this.subskill = new t();
this.subskill.issub = !0;
this.subskill.init(o.id, 1, n);
this.subskilltyp = o.t;
this.subskillvalue = o.v;
this.subtoucan = 0;
}
};
this.reset = function() {
this.nextemit = null;
this.nowtime = 0;
this.maxtime = 1;
this.atkcount = 0;
this.atktime = 0;
this.preatktime = 0;
this.subskill && this.subskill.reset();
10 == this.type && (this.atktime = .5);
};
this.rebuildbullet = function() {
var t = this.cfg;
this.bullets = t.bullets;
if (t.bulletrule) {
this.bullets = [];
var e = t.bulletrule, s = e[0], n = 0;
t.bulletlvrule && (n = t.bulletlvrule.lvcount * this.lv);
var a = 0;
if (1 == s) {
a = e[8] + n;
for (var o = 0; o < a; o++) {
var c = {
t: o * e[1],
b: [ [ e[2], e[3] + e[6] * o, e[4] + e[7] * o, e[5] ] ]
};
this.bullets.push(c);
}
} else if (2 == s) {
a = e[5] + n;
for (o = 0; o < a; o++) {
e[3], e[4], c = {
t: o * e[1],
b: [ [ e[2], e[3], e[4] ] ]
};
this.bullets.push(c);
}
} else if (3 == s) {
a = e[3] + n;
var r = t.template;
for (o = 0; o < a; o++) {
var l = [];
l = i.deepClone(r, l);
for (var h = 0; h < l.length; h++) l[h][1] = o * e[2];
c = {
t: o * e[1],
b: l
};
this.bullets.push(c);
}
} else if (4 == s) {
a = e[8] + n;
for (o = 0; o < a; o++) {
c = {
t: o * e[1],
b: [ [ e[2], e[3] + e[5] * o, e[4] + e[6] * o, 0, e[7] ] ]
};
this.bullets.push(c);
}
} else if (5 == s) {
a = e[6] + n;
for (o = 0; o < a; o++) {
c = {
t: o * e[1],
b: [ [ e[2], e[3], e[4], 0, e[5] ] ]
};
this.bullets.push(c);
}
} else if (6 == s) {
a = e[3] + n;
for (o = 0; o < a; o++) {
c = {
t: o * e[1],
b: [ [ e[2], 0, 0 ] ]
};
this.bullets.push(c);
}
}
if (!t.bulletlvrule) {
t.bullets = this.bullets;
t.bulletrule = null;
}
}
};
this.update = function(t) {
if (!this.user.isdead()) {
if (this.rcount > 0) {
this.nowrtime += t;
if (this.nowrtime >= this.repeattimes) {
this.nowrtime = 0;
this.rcount--;
this.beginskill();
}
}
this.nowtime > 0 && (this.nowtime -= t);
if (10 == this.type) {
this.atktime += t;
if (this.atktime > .5) {
var e = this.cfg.buff;
this.atktime = 0;
var i = !0, s = n[e];
s.needweapon && this.user.atkskillcfg && 0 == (this.user.atkskillcfg.stype & s.needweapon) && (i = !1);
if (i) for (var a = this.gamelogic.findnpcwithcmp(this.user, this.user.camp, !1), o = 0; o < a.length; o++) a[o].addbuff(e, 100, 1);
}
} else this.updateatk(t);
this.subskill && this.subskill.update(t);
}
};
this.doself = function() {
var t = this.cfg, e = t.delay, s = t.cd;
t.cd2 && (s += this.user.getatkdelay() * t.cd2);
this.user.nocd > 0 && i.randintSeed(100) < this.user.nocd && (s = .01);
this.nowtime = s;
this.maxtime = s;
e > 0 && !this.user.isdead() && this.user.changestate("stateyinzhi", e);
};
this.useskill = function() {
var t = this.beginskill();
if (t) {
this.doself();
if (this.cfg.repeatcunt) {
this.rcount = this.cfg.repeatcunt;
this.repeattimes = this.cfg.repeattimes;
this.nowrtime = 0;
}
}
return t;
};
this.use = function() {
if (this.nowtime > 0) return !1;
if (this.user.isdead()) return !1;
if (this.cfg.chant && !this.user.isdead() && this.user.singtime > 0) {
this.user.changestate("stateyongchang", {
time: this.cfg.chant,
skill: this
});
return !1;
}
var t = this.useskill();
t && this.subskill && 1 == this.subskilltyp && i.randintSeed(100) < this.subskillvalue && this.subskill.useskill();
return t;
};
this.updateatk = function(t) {
if (1 == this.type) {
if (this.atkcount > 0) {
this.atktime -= t;
if (this.atktime <= 0) {
this.atkcount--;
this.atktime = this.preatktime;
this.doatk();
}
}
} else if (2 == this.type) {
if (this.nextemit) {
this.atktime += t;
if (this.atktime >= this.nextemit.t) {
if (1 == this.subtype) this.gamelogic.createbullets(this, this.nextemit.b, this.user, this.savedir); else if (2 == this.subtype) if (1 == this.cfg.limit && this.atktarget) this.atktarget.isdead() || this.gamelogic.createbulletsground(this, this.nextemit.b, this.user, this.atktarget, this.areapow); else {
var e = !1;
(this.areapow || this.cfg.limit) && (e = !0);
var i = (n = this.gamelogic.findnpcwithcmp(this.user, this.enemycamp, e)).length;
this.cfg.limit && (i = Math.min(i, this.cfg.limit));
for (var s = 0; s < i; s++) this.gamelogic.createbulletsground(this, this.nextemit.b, this.user, n[s], this.areapow);
} else if (3 == this.subtype) this.gamelogic.createbulletsground(this, this.nextemit.b, this.user, this.user); else if (4 == this.subtype) this.gamelogic.createbulletspingxing(this, this.nextemit.b, this.user, this.savedir); else if (5 == this.subtype) this.gamelogic.createbulletsgroundrand(this, this.nextemit.b, this.user, this.user); else if (6 == this.subtype) {
var n, a = (n = this.gamelogic.findnpcwithcmp(this.user, this.enemycamp, !0))[0];
a && this.gamelogic.createbulletsgroundrand(this, this.nextemit.b, this.user, a);
} else 7 == this.subtype && this.gamelogic.createbulletsgrounddir(this, this.nextemit.b, this.user);
this.bulletidx++;
this.nextemit = this.bullets[this.bulletidx];
}
}
} else if (3 == this.type && this.nextemit) {
this.atktime += t;
if (this.atktime >= this.nextemit.t) {
this.gamelogic.createspobjs(this, this.nextemit.b, this.user);
this.bulletidx++;
this.nextemit = this.gameobjs[this.bulletidx];
}
}
};
this.doatk = function(t) {
if (t) {
this.savepos.x = this.user.x;
this.savepos.y = this.user.y;
}
var e = this.cfg, s = this.user, n = this.gamelogic.findnpcwithcmp(this.savepos, this.enemycamp, t), a = n[0], o = !1, c = null, r = 0, l = 0, h = 0, p = 0, d = !1;
if (t) if (a) {
c = cc.v2(a.x - s.x, a.y - s.y).normalizeSelf();
if (1 == e.hittype) {
r = e.height / 2;
l = s.x + c.x * r;
h = s.y + c.y * r;
p = i.getanglebydirhudu(c);
this.savehit = {
x: l,
y: h,
width: e.height,
height: e.width,
angle: p
};
o = i.checkobb(this.savehit, a);
} else {
this.savedis = e.distance;
this.savedir.x = c.x;
this.savedir.y = c.y;
o = i.checkinview(e.range, this.savedis, this.savedir, this.savepos, a);
}
if (o) {
s.dir = c;
d = !0;
} else {
s.dir = c;
s.changestate("statefollowtarget", {
time: .3,
x: a.x,
y: a.y
});
d = !1;
}
} else {
c = cc.v2(s.dir.x, s.dir.y);
if (1 == e.hittype) {
r = e.height / 2;
l = s.x + c.x * r;
h = s.y + c.y * r;
p = i.getanglebydirhudu(c);
this.savehit = {
x: l,
y: h,
width: e.height,
height: e.width,
angle: p
};
} else {
this.savedis = e.distance;
this.savedir.x = c.x;
this.savedir.y = c.y;
}
d = !0;
} else d = !0;
!t && a && (o = !0);
if (o) {
var u = [], f = 0;
if (t) {
u.push(a);
f = e.aoe ? 1 : n.length + 1;
}
for (var g = f, y = n.length; g < y; g++) if (n[g] && (1 == e.hittype ? i.checkobb(this.savehit, n[g]) : i.checkinview(e.range, this.savedis, this.savedir, this.savepos, n[g]))) {
u.push(n[g]);
if (!e.aoe) break;
}
for (g = 0; g < u.length; g++) u[g].dohurt(this.user, this, {
x: this.x,
y: this.y
});
}
return d;
};
this.dobullet = function() {
var t = null, e = null;
if (this.cfg.area && (e = (t = this.gamelogic.findnpcwithcmp(this.user, this.enemycamp, !0))[0]) && i.getdistancenosqrt(this.user, e) > this.areapow) return !1;
this.tscount = this.cfg.tscount;
var s = !0;
this.atktime = 0;
this.atkcount = 0;
this.bulletidx = 0;
this.nextemit = this.bullets[this.bulletidx];
if (2 == this.subtype) {
t || (t = this.gamelogic.findnpcwithcmp(this.user, this.enemycamp, !0));
e = t[0];
this.atktarget = e;
e || (s = !1);
} else if (1 == this.subtype || 4 == this.subtype) {
t || (t = this.gamelogic.findnpcwithcmp(this.user, this.enemycamp, !0));
e = t[0];
this.atktarget = e;
if (e) {
this.savedir.x = e.x - this.user.x;
this.savedir.y = e.y - this.user.y;
0 == this.savedir.x && 0 == this.savedir.y && (this.savedir.y = 1);
this.savedir.normalizeSelf();
this.user.dir.x = this.savedir.x;
this.user.dir.y = this.savedir.y;
} else {
this.savedir.x = this.user.dir.x;
this.savedir.y = this.user.dir.y;
}
}
return s;
};
this.docloseatk = function() {
var t, e = this.cfg;
e.atkcount ? this.atkcount = e.atkcount : this.atkcount = 1;
e.timeatk ? this.preatktime = e.timeatk : this.preatktime = 0;
this.atktime = this.preatktime;
(t = this.doatk(!0)) ? this.atkcount-- : this.atkcount = 0;
return t;
};
this.doobj = function() {
this.atktime = 0;
this.atkcount = 0;
this.bulletidx = 0;
this.nextemit = this.gameobjs[this.bulletidx];
return !0;
};
this.dobuff = function() {
for (var t = this.cfg.buffs, e = 0; e < t.length; e++) {
var i = [], s = t[e].dis;
if (1 == t[e].target) i.push(this.user); else if (2 == t[e].target) for (var n = 0, a = (o = this.gamelogic.findnpcwithcmp(this.user, this.user.camp, !0)).length; n < a && Math.abs(o[n].x - this.user.x) < s && Math.abs(o[n].x - this.user.x); n++) i.push(o[n]); else if (3 == t[e].target) {
var o;
o = (o = this.gamelogic.findnpcwithcmp(this.user, this.user.camp, !1)).sort(function(t, e) {
return t.hp / t.maxhp - e.hp / e.maxhp;
});
i.push(o[0]);
}
for (var c = 0, r = i.length; c < r; c++) i[c].addbuff(t[e].id, t[e].chance, 1, t[e].count, t[e].time, this, this.user);
}
return !0;
};
this.beginskill = function() {
this.cfg;
var t = !0;
this.atktarget = null;
1 == this.type ? t = this.docloseatk() : 2 == this.type ? t = this.dobullet() : 3 == this.type ? t = this.doobj() : 4 == this.type ? 1 == this.cfg.functionid && this.dofenshen() : 5 == this.type ? t = this.gamelogic.findnpcwithcmp(this.user, this.enemycamp).length > 0 : 10 == this.type && (t = !1);
if (t) {
this.cfg.buffs && this.dobuff();
this.cfg.fulleff && this.gamelogic.createscreen(this.cfg.fulleff);
}
return t;
};
this.dofenshen = function() {
var t = cc.battlelogic.createnpc({
camp: this.user.camp,
lv: 1,
x: this.user.x,
y: this.user.y,
fenshen: this.user
});
cc.battlelogic.playerarr.push(t);
};
};
cc._RF.pop();
}, {
Utils: "Utils",
buffcfg: "buffcfg",
gameConfig: "gameConfig",
skillcfg: "skillcfg"
} ],
