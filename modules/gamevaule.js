gamevaule: [ function(t, e) {
"use strict";
cc._RF.push(e, "5c06c+twBtK/q1HCF0eD82G", "gamevaule");
var i = t("Utils"), s = t("talentcfg"), n = t("monstercfg"), a = t("enumcfg"), o = a.enumproperty, c = a.enumskilltype;
e.exports = function() {
this.calshuxing = function(t, e, i) {
var s = t.water, n = t.fire, a = t.thunder;
0 != (i & c.cold) && (s += 10);
0 != (i & c.fire) && (n += 10);
0 != (i & c.thunder) && (a += 10);
return (s * e.fire + n * e.thunder + a * e.water - (s * e.thunder + n * e.water + a * e.fire)) / 300 + 1 + .03 * (s + n + a - e.fire - e.thunder - e.water);
};
this.cridule = function(t, e) {
return t.getrealvaule(o.cri) - .2 * e.luk > i.randintSeed(100);
};
this.singtime = function() {
var t = 1 - this.dex / 200;
(t /= (this.getrealvaule(o.yongchang) + 100) / 100) < 0 && (t = 0);
return t;
};
this.getaspeed = function() {
return 100 + 4 * this.agi + this.dex;
};
this.gethit = function() {
return Math.floor(this.dex + this.lv / 5) + 100;
};
this.getflee = function() {
return Math.floor(this.agi + this.lv / 5);
};
this.getmaxhp = function() {
return 120 * this.vit + 5 * this.str + 5 * this.dex + 2 * this.int + 2 * this.agi + this.luk + 100;
};
this.getatk = function() {
return Math.floor(.1 * this.vit + this.str * this.highv + .2 * this.dex + .2 * this.agi + .1 * this.int) + 20;
};
this.getmatk = function() {
return Math.floor(.1 * this.vit + .1 * this.str + .2 * this.dex + .2 * this.agi + this.int * this.highv) + 20;
};
this.getdatk = function() {
return Math.floor(.1 * this.vit + .2 * this.str + this.dex * this.highv + .2 * this.agi + .1 * this.int) + 20;
};
this.getvatk = function() {
return Math.floor(this.vit * this.highv + .2 * this.str + .2 * this.dex + .2 * this.agi + .1 * this.int) + 20;
};
this.getdef = function() {
return Math.floor(this.vit * this.highv + .2 * this.str + .2 * this.dex + .2 * this.agi + .1 * this.int) + 20;
};
this.getmdef = function() {
return Math.floor(.1 * this.vit + .2 * this.str + .2 * this.dex + .2 * this.agi + this.int * this.highv) + 20;
};
this.setprotymap = function(t) {
if (t) {
t.fmcfg && this.setprotymap(t.fmcfg);
if (t.property) for (var e = t.property, i = e.length - 1; i >= 0; i--) {
var s = e[i];
this.propertymap[s[0]] ? this.propertymap[s[0]] += s[1] : this.propertymap[s[0]] = s[1];
}
}
};
this.initplayer = function(t) {
this.playerdata = t;
var e = t.getelement();
this.water = e[0];
this.fire = e[1];
this.thunder = e[2];
this.highv = 4;
this.propertymapdynamic = {};
this.refreshplayerbp(0);
};
this.refreshplayerbp = function(t) {
this.propertymap = {};
var e = this.playerdata;
this.lv = e.lv;
this.vit = e.vit;
this.str = e.str;
this.dex = e.dex;
this.agi = e.agi;
this.int = e.int;
this.luk = e.luk;
var i = e.talentarr, s = e.equiparr, n = e.setforvaule;
this.setprotymap(s[t]);
for (var a = 3; a < s.length; a++) this.setprotymap(s[a]);
for (a = 0; a < i.length; a++) this.setprotymap(i[a]);
for (a = 0; a < n.length; a++) this.setprotymap(n[a]);
this.setprotymap(cc.playerData.getplayerbsproperty());
this.isplayer = !0;
this.calbattlev();
};
this.initpet = function(t, e, i) {
var a = n[t];
this.propertymapdynamic = {};
this.propertymap = {};
if (a.talent) for (var o = 0; o < a.talent.length; o++) {
var c = s[a.talent[o]];
this.setprotymap(c);
}
this.setprotymap(cc.playerData.getpetbsproperty());
this.cfg = a;
this.lv = e.lv;
this.highv = 12;
this.vitup = e.bp[0];
this.strup = e.bp[1];
this.dexup = e.bp[2];
this.agiup = e.bp[3];
this.intup = e.bp[4];
this.lukup = e.bp[5];
this.beilv = a.beilv / 100;
this.water = a.element[0];
this.fire = a.element[1];
this.thunder = a.element[2];
var r = .05 * this.lv + this.beilv;
i || (cc.wujin ? r *= 8 : cc.hell ? r *= 4 : cc.shenyuan && (r *= 2));
r *= cc.playerData.getscorebyid(t) / 100 + 1;
this.vit = this.vitup * r;
this.str = this.strup * r;
this.dex = this.dexup * r;
this.agi = this.agiup * r;
this.int = this.intup * r;
this.luk = this.lukup * r;
this.ispet = !0;
this.calbattlev();
};
this.initmonster = function(t, e, n) {
this.propertymapdynamic = {};
this.propertymap = {};
if (t.talent) for (var a = 0; a < t.talent.length; a++) {
var o = s[t.talent[a]];
this.setprotymap(o);
}
this.ismonster = !0;
this.isboss = n;
this.cfg = t;
this.lv = e;
this.highv = 8;
this.isboss && (this.highv = 16);
this.vitup = t.bp[0] - i.randintSeed(5);
this.strup = t.bp[1] - i.randintSeed(5);
this.dexup = t.bp[2] - i.randintSeed(5);
this.agiup = t.bp[3] - i.randintSeed(5);
this.intup = t.bp[4] - i.randintSeed(5);
this.lukup = t.bp[5];
this.beilv = t.beilv / 100;
this.water = t.element[0];
this.fire = t.element[1];
this.thunder = t.element[2];
var c = .05 * this.lv + this.beilv;
cc.wujin ? c *= 8 : cc.hell ? c *= 4 : cc.shenyuan && (c *= 2);
this.vit = this.vitup * c;
this.str = this.strup * c;
this.dex = this.dexup * c;
this.agi = this.agiup * c;
this.int = this.intup * c;
this.luk = 1 * this.lukup;
this.calbattlev();
};
this.calbattlev = function() {
this.vit += this.propertymap[o.vit] || 0;
this.str += this.propertymap[o.str] || 0;
this.int += this.propertymap[o.int] || 0;
this.dex += this.propertymap[o.dex] || 0;
this.agi += this.propertymap[o.agi] || 0;
this.luk += this.propertymap[o.luk] || 0;
this.vit += this.propertymapdynamic[o.vit] || 0;
this.str += this.propertymapdynamic[o.str] || 0;
this.int += this.propertymapdynamic[o.int] || 0;
this.dex += this.propertymapdynamic[o.dex] || 0;
this.agi += this.propertymapdynamic[o.agi] || 0;
this.luk += this.propertymapdynamic[o.luk] || 0;
var t = this.vit, e = this.str, i = this.int, s = this.dex, n = this.agi, a = this.luk;
this.propertymap[o.vit + 100] && (this.vit *= this.propertymap[o.vit + 100] / 100 + 1);
this.propertymap[o.str + 100] && (this.str *= this.propertymap[o.str + 100] / 100 + 1);
this.propertymap[o.int + 100] && (this.int *= this.propertymap[o.int + 100] / 100 + 1);
this.propertymap[o.dex + 100] && (this.dex *= this.propertymap[o.dex + 100] / 100 + 1);
this.propertymap[o.agi + 100] && (this.agi *= this.propertymap[o.agi + 100] / 100 + 1);
this.propertymap[o.luk + 100] && (this.luk *= this.propertymap[o.luk + 100] / 100 + 1);
var c = .3 * this.luk, r = this.getflee(), l = this.gethit(), h = this.isplayer ? 100 : 50;
this.ispet && (h = 100);
this.cfg && (h = this.cfg.movespeed || h);
this.propertymapstatic = {};
this.propertymapstatic[o.maxhp] = this.getmaxhp();
this.propertymapstatic[o.atk] = this.getatk();
this.propertymapstatic[o.matk] = this.getmatk();
this.propertymapstatic[o.datk] = this.getdatk();
this.propertymapstatic[o.vatk] = this.getvatk();
this.propertymapstatic[o.def] = this.getdef();
this.propertymapstatic[o.mdef] = this.getmdef();
this.propertymapstatic[o.atkspeed] = this.getaspeed();
this.propertymapstatic[o.hit] = l;
this.propertymapstatic[o.flee] = r;
this.propertymapstatic[o.cri] = c;
this.propertymapstatic[o.movespeed] = h;
this.propertymapstatic[o.xixue] = 0;
this.propertymapstatic[o.healdmg] = 0;
this.propertymapstatic[o.cridmg] = 0;
this.vit = t;
this.str = e;
this.int = i;
this.dex = s;
this.agi = n;
this.luk = a;
this.isboss && (cc.wujin ? this.propertymapstatic[o.maxhp] *= 200 : this.propertymapstatic[o.maxhp] *= 5 + cc.stageid);
this.ismonster && (cc.hell || cc.wujin ? this.propertymapstatic[o.maxhp] *= 30 : cc.shenyuan && (this.propertymapstatic[o.maxhp] *= 10));
for (var p in this.propertymap) {
var d = this.propertymap[p];
this.propertymapstatic[p] ? this.propertymapstatic[p] += d : this.propertymapstatic[p] = d;
}
this.propertymapstatic[o.vit] = this.vit;
this.propertymapstatic[o.str] = this.str;
this.propertymapstatic[o.int] = this.int;
this.propertymapstatic[o.dex] = this.dex;
this.propertymapstatic[o.agi] = this.agi;
this.propertymapstatic[o.luk] = this.luk;
};
this.getrealvaule = function(t) {
var e = this.propertymapstatic[t] || 0, i = this.propertymapstatic[t + 100] || 0;
return (e + this.getpv(t)) * (100 + this.getpv(t + 100) + i) / 100;
};
this.addpv = function(t, e) {
null == this.propertymapdynamic[t] && (this.propertymapdynamic[t] = 0);
this.propertymapdynamic[t] += e;
};
this.getpv = function(t) {
null == this.propertymapdynamic[t] && (this.propertymapdynamic[t] = 0);
return this.propertymapdynamic[t];
};
};
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
monstercfg: "monstercfg",
talentcfg: "talentcfg"
} ],
