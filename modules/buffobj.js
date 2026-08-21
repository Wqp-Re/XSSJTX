buffobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "84d48Fv9aVDyb5VgiYRgElM", "buffobj");
var i = t("buffcfg"), s = i.buffcfg, n = i.effenum, a = t("Utils");
t("enumcfg").enumskilltype;
e.exports = function() {
this.init = function(t, e, i, n, a, o, c) {
this.skill = n;
this.target = e;
this.atker = o;
this.bid = t;
this.cfg = s[t];
this.buff_effect = this.cfg.buff_effect;
i || (i = this.cfg.life);
this.life = i;
this.maxlife = this.life;
this.timearr = [];
this.nowcount = 1;
this.dir = {
x: 0,
y: 0
};
this.toucan = c;
this.lv = 1;
this.hurttimenow = 0;
this.hurttime = this.cfg.hurttime;
this.totoalhurt = 0;
this.cfg.beatkfanshang && (this.fanshang = this.cfg.beatkfanshang / 100);
this.cfg.vitkillhp && (this.khp = this.cfg.vitkillhp);
this.isnew = !0;
this.timearr.push(cc.battlelogic.servertime + 1e3 * this.maxlife);
this.onlywdef = this.cfg.onlywdef;
this.cribuff = this.cfg.cribuff;
this.sectime = 0;
this.firendbuff = this.cfg.firendbuff;
this.fsxs = this.cfg.fanshangxishou;
if (this.cfg.dmgbili) {
this.needweapon = this.cfg.needweapon;
this.dmgbili = this.cfg.dmgbili;
this.checkweapondmg();
}
if (this.cfg.spshanbi) {
this.needweapon = this.cfg.needweapon;
this.spshanbi = !0;
this.checkshanbi();
}
if (this.cfg.nocd) {
this.target.deadcheck = !0;
this.needweapon = this.cfg.needweapon;
this.nocd = this.cfg.nocd;
this.deadbufftime = 0;
this.deadbuffcd = this.cfg.deadbuffcd;
this.deadbuff = this.cfg.deadbuff;
this.checknocd(0);
}
if (this.cfg.spshanbi2) {
this.needweapon = this.cfg.needweapon;
this.spshanbi2 = !0;
this.checkshanbi2();
}
if (this.cfg.autochange) {
this.needweapon = this.cfg.needweapon;
this.autochange = !0;
this.changecd = 0;
}
this.doadd();
};
this.dodeadcheck = function() {
if (this.deadbuff && this.target.atkskillcfg && 0 != (this.target.atkskillcfg.stype & this.needweapon) && this.deadbufftime <= 0) {
this.target.hp = 1;
this.deadbufftime = this.deadbuffcd;
this.target.addbuff(this.deadbuff, 100, 1);
}
};
this.checkchangeweapon = function(t) {
if (this.autochange) if (this.changecd > 0) this.changecd -= t; else if (this.target.atkskillcfg && 0 != (this.target.atkskillcfg.stype & this.needweapon)) {
for (var e = !0, i = 1; i < this.target.skillarr.length; i++) if (this.target.skillarr[i].nowtime <= 0) {
e = !1;
break;
}
e && this.target.ckickweapon();
this.changecd = .5;
}
};
this.checknocd = function(t) {
if (this.nocd) {
this.deadbufftime -= t;
this.target.atkskillcfg && 0 != (this.target.atkskillcfg.stype & this.needweapon) ? this.target.nocd = this.cfg.nocd : this.target.nocd = 0;
}
};
this.checkshanbi = function() {
this.spshanbi && (this.target.atkskillcfg && 0 != (this.target.atkskillcfg.stype & this.needweapon) ? this.target.allmiss = !0 : this.target.allmiss = !1);
};
this.checkshanbi2 = function() {
this.spshanbi2 && (this.target.atkskillcfg && 0 != (this.target.atkskillcfg.stype & this.needweapon) ? this.target.allmiss2 = !0 : this.target.allmiss2 = !1);
};
this.checkweapondmg = function() {
this.dmgbili && (this.target.atkskillcfg && 0 != (this.target.atkskillcfg.stype & this.needweapon) ? this.target.dmgbili = this.dmgbili : this.target.dmgbili = 1);
};
this.refreshtime = function(t) {
t || (t = this.cfg.count);
if (this.nowcount < t) {
this.nowcount++;
this.timearr.push(cc.battlelogic.servertime + 1e3 * this.maxlife);
this.addstate();
}
this.life = this.maxlife;
if (this.cfg.savehurt && this.nowcount >= t) {
cc.battlelogic.createonebullet({
fixdmg: this.totoalhurt,
tscount: this.cfg.savehurt[1]
}, this.cfg.savehurt[0], this.target.x, this.target.y, cc.v2(0, 1), this.atker);
this.totoalhurt;
this.life = 0;
}
};
this.doadd = function() {
var t = this.buff_effect;
if (t) {
t & n.notmove && this.target.notmovecount++;
t & n.notatk && this.target.notatkcount++;
t & n.notani && this.target.notanicount++;
t & n.wudi && this.target.wudicount++;
t & n.bati && this.target.baticount++;
t & n.fying && (this.target.fying = !0);
if (t & n.rush) {
this.target.notmovecount++;
this.rushmode = !0;
this.enemy = cc.battlelogic.findnpcwithcmp(this.target, this.target.enemycamp, !0)[0];
}
if (t & n.rushnotarget) {
this.target.notmovecount++;
this.dashmode = !0;
this.dir.x = this.target.dir.x;
this.dir.y = this.target.dir.y;
}
}
if (this.cfg.timescale) {
this.target.timescale = 1 / this.cfg.timescale;
cc.kSpeed(this.cfg.timescale);
}
this.khp && (this.target.fanshangkill += this.khp);
this.cfg.heal && this.target.heal(this.target.matk * this.cfg.heal / 100 * this.target.healdmg);
null != this.onlywdef && (this.target.onlywdef = !0);
null != this.fsxs && (this.target.fsxs = !0);
this.cfg.skipdef && this.target.skipdef++;
this.addstate();
};
this.addstate = function() {
if (this.cfg.propertys) {
for (var t = 0; t < this.cfg.propertys.length; t++) {
var e = this.cfg.propertys[t];
this.target.gamevaule.addpv(e[0], e[1]);
}
this.target.shuxingrefresh();
}
if (this.cfg.propertyszhuanshen) {
for (t = 0; t < this.cfg.propertyszhuanshen.length; t++) {
e = this.cfg.propertyszhuanshen[t];
this.target.gamevaule.addpv(e[0], e[1] * this.target.zhuanshen);
}
this.target.shuxingrefresh();
}
};
this.doremove = function() {
var t = this.buff_effect;
if (t) {
t & n.notmove && this.target.notmovecount--;
t & n.notatk && this.target.notatkcount--;
t & n.notani && this.target.notanicount--;
if (t & n.rush) {
this.target.notmovecount--;
this.rushmode = !1;
}
if (t & n.rushnotarget) {
this.target.notmovecount--;
this.dashmode = !1;
}
t & n.wudi && this.target.wudicount--;
t & n.bati && this.target.baticount--;
if (t & n.fying) {
this.target.fying = !1;
if (a.randintSeed(100) < this.toucan) {
this.target.flagbuzhuo2 = !0;
cc.battlelogic.createeff({
eff: "card",
x: this.target.x,
y: this.target.y,
ground: !0,
time: .6,
ani: {
type: 1,
s: 1,
u: -5,
wait: .4
}
});
} else if (a.randintSeed(100) < 50) {
cc.uiHelper.showTips("宝宝逃跑了...");
cc.soundMgr.playSound("run");
this.target.flagdead2 = !0;
}
}
}
this.cfg.removebullet && cc.battlelogic.createbulletsground(this.skill, [ [ this.cfg.removebullet, 0, 0 ] ], this.target, this.target);
if (this.cfg.timescale) {
this.target.timescale = 1;
cc.kSpeed(1);
}
this.khp && (this.target.fanshangkill -= this.khp);
if (this.cfg.propertys) {
for (var e = 0; e < this.cfg.propertys.length; e++) {
var i = this.cfg.propertys[e];
this.target.gamevaule.addpv(i[0], -i[1] * this.nowcount);
}
this.target.shuxingrefresh();
}
if (this.cfg.propertyszhuanshen) {
for (e = 0; e < this.cfg.propertyszhuanshen.length; e++) {
i = this.cfg.propertyszhuanshen[e];
this.target.gamevaule.addpv(i[0], -i[1] * this.target.zhuanshen);
}
this.target.shuxingrefresh();
}
this.dmgbili && (this.target.dmgbili = 1);
this.spshanbi && (this.target.allmiss = !1);
this.spshanbi2 && (this.target.allmiss2 = !1);
this.nocd && (this.target.nocd = 0);
null != this.onlywdef && (this.target.onlywdef = !1);
null != this.fsxs && (this.target.fsxs = !1);
this.cfg.skipdef && this.target.skipdef--;
};
this.update = function(t) {
this.checkweapondmg();
this.checkshanbi();
this.checkshanbi2();
this.checknocd(t);
this.checkchangeweapon(t);
this.isnew = !1;
this.life -= t;
if (this.life <= 0) {
this.doremove();
return !0;
}
this.sectime += t;
if (this.sectime > 1) {
this.sectime = 0;
this.cfg.healpre && this.target.hp < this.target.maxhp && this.target.heal(this.target.maxhp * this.cfg.healpre / 100);
if (this.firendbuff) for (var e = cc.battlelogic.findnpcwithcmp(this.target, this.target.camp, !1), i = 0; i < e.length; i++) e[i] != this.target && e[i].addbuff(this.firendbuff, 100, 1);
}
if (this.rushmode) {
var s = this.enemy.x - this.target.x, n = this.enemy.y - this.target.y;
if (s * s + n * n < 400) this.life = 0; else {
this.target.dir.x = s;
this.target.dir.y = n;
this.target.dir.normalizeSelf();
this.target.realmove(t, this.target.dir, 500, !0);
}
}
this.dashmode && this.target.realmove(t, this.dir, 500, !0);
if (this.nowcount > 1 && cc.battlelogic.servertime > this.timearr[0]) {
this.nowcount--;
if (this.cfg.propertys) {
for (i = 0; i < this.cfg.propertys.length; i++) {
var o = this.cfg.propertys[i];
this.target.gamevaule.addpv(o[0], -o[1]);
}
this.target.shuxingrefresh();
}
this.timearr.splice(0, 1);
}
if (this.hurttime) {
this.hurttimenow += t;
if (this.hurttimenow > this.hurttime) {
this.hurttimenow = 0;
var c = 0;
this.cfg.mdmg ? c = this.nowcount * this.cfg.mdmg * this.atker.matk / 100 : this.cfg.admg && (c = this.nowcount * this.cfg.admg * this.atker.atk / 100);
if (c > 0) {
this.target.kouxue(c);
if (this.cfg.hurtcreatebullet) {
var r = this.cfg.hurtcreatebullet[0];
if (h = this.atker.hasbuff(r)) {
var l = this.cfg.hurtcreatebullet[1];
(p = this.cfg.hurtcreatebullet[2] + this.cfg.hurtcreatebullet[3] * h.lv) >= a.randintSeed(100) && cc.battlelogic.createonebullet({
fixdmg: 10 * c
}, l, this.target.x, this.target.y, cc.v2(0, 1), this.atker);
}
}
if (this.cfg.hurtatkeraddbuff) {
var h;
r = this.cfg.hurtatkeraddbuff[0];
if (h = this.atker.hasbuff(r)) {
r = this.cfg.hurtatkeraddbuff[1];
var p = this.cfg.hurtatkeraddbuff[2];
this.atker.addbuff(r, p, h.lv);
}
}
}
}
}
return !1;
};
this.doatk = function(t, e, i, s) {
var n = 0, o = 0;
s && this.cribuff && (o = this.cribuff);
if (this.cfg.hitbuff) {
var c = !0, r = this.cfg.hitskilltype;
r && (t.cfg.stype && 0 != (r & t.cfg.stype) || (c = !1));
if (c) {
var l = 0, h = this.cfg.buffaddgailv;
h && this.target.hasbuff(h[0]) && (l = h[1]);
for (var p = 0; p < this.cfg.hitbuff.length; p++) {
var d = this.cfg.hitbuff[p];
e.push({
id: d[0],
chance: d[1] + l,
lv: this.lv
});
}
}
}
if (this.cfg.buffdmgup) {
var u = this.cfg.buffdmgup[0], f = i.hasbuff(u);
f && (n = this.cfg.buffdmgup[1] / 100 * f.nowcount);
}
this.cfg.fenshen && !this.target.isfenshen && a.randintSeed(100) < this.cfg.fenshen && this.dofenshen();
return {
buffdmgup: n,
addbuff: o
};
};
this.dofenshen = function() {
if (this.target.atkskillcfg && 0 != (this.target.atkskillcfg.stype & this.cfg.needweapon)) {
var t = cc.battlelogic.createnpc({
camp: this.target.camp,
lv: this.target.lv,
x: this.target.x - 30 + a.randintSeed(60),
y: this.target.y - 30 + a.randintSeed(60),
fenshen: this.target
});
cc.battlelogic.playerarr.push(t);
}
};
this.beatk = function(t, e) {
this.cfg.savehurt && (this.totoalhurt += 5 * t);
if (this.cfg.beatkcreatebullet) {
var i = this.cfg.beatkcreatebullet[0], s = this.atker.hasbuff(i);
if (s) {
var o = this.cfg.beatkcreatebullet[1];
this.cfg.beatkcreatebullet[2] + this.cfg.beatkcreatebullet[3] * s.lv >= a.randintSeed(100) && cc.battlelogic.createonebullet({
fixdmg: t,
tscount: 10
}, o, this.target.x, this.target.y, cc.v2(0, 1), this.atker);
}
}
if (this.fanshang) {
var c = this.target.vatk * this.fanshang;
e.kouxue(c);
this.target.fsxs && this.target.heal(Math.floor(c / 10));
e.isdead() && this.target.fanshangkill > 0 && this.target.heal(this.target.fanshangkill / 100 * this.target.maxhp);
}
this.buff_effect & n.beatkover && !this.isnew && (this.life = 0);
};
this.domiss = function(t, e) {
this.cfg.onmissbuff && e.push({
id: this.cfg.onmissbuff[0],
chance: this.cfg.onmissbuff[1],
lv: this.lv
});
};
};
cc._RF.pop();
}, {
Utils: "Utils",
buffcfg: "buffcfg",
enumcfg: "enumcfg"
} ],
