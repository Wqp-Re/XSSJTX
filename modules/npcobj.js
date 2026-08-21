npcobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "ab55aqknQRHl5Q+EaRMlAnx", "npcobj");
var i = t("Utils"), s = t("statemachine").statemachine, n = t("battlestates"), a = t("monstercfg"), o = (t("skillcfg"), 
t("gameConfig").itemConfig), c = t("buffobj"), r = t("skillobj"), l = t("gameai"), h = t("gamevaule"), p = t("enumcfg"), d = t("talentcfg"), u = p.enumproperty, f = p.enumgameflag, g = p.enumskilltype;
e.exports = function() {
this.checkhasflat = function(t) {
return this.spflag & t;
};
this.initonce = function() {
if (!this.hasinitonce) {
this.statemachine = new s();
this.statemachine.target = this;
this.statemachine.init({
statedie: new n.statedie(),
stateyinzhi: new n.stateyinzhi(),
stateidle: new n.stateidle(),
statemove: new n.statemove(),
statefollowtarget: new n.statefollowtarget(),
stateyongchang: new n.stateyongchang()
});
this.gamevaule = new h();
this.hasinitonce = !0;
}
};
this.init = function(t, e) {
this.initonce();
this.spflag = 0;
this.fying = !1;
this.deadfx = 1;
this.zhuanshen = 0;
this.fanshangkill = 0;
this.maxyctime = 1;
this.timescale = 1;
this.dmgbili = 1;
this.yctime = 0;
this.lefttime = void 0;
this.fenshentime = void 0;
this.adlife = 1;
this.allmiss = !1;
this.allmiss2 = !1;
this.skipdef = 0;
this.force = 0;
this.objtype = 1;
this.angle = 0;
this.uuid = t.uuid;
this.gamelogic = e;
this.weaponidx = 0;
this.camp = t.camp;
this.lv = t.lv;
this.clickingmoveing = !1;
this.dir = cc.v2(0, 1);
this.dir2 = cc.v2(0, 1);
this.dir3 = cc.v2(0, 1);
this.x = t.x;
this.y = t.y;
this.flagdead = !1;
this.onlywdef = !1;
this.notmovecount = 0;
this.notatkcount = 0;
this.notanicount = 0;
this.wudicount = 0;
this.baticount = 0;
this.nocd = 0;
this.dir = i.dirRotate(this.dir, i.randintSeed(360));
this.offx = 16 * this.dir.x;
this.offy = 16 * this.dir.y;
this.ai = null;
this.yingzhi = !1;
this.ispet = !1;
this.width = this.height = 32;
this.scale = 1;
this.skillarr = [];
this.userskillarr = [];
this.dmgarr = [];
this.allskills = [];
this.buffarr = [];
this.flagaddbuff = [];
this.flagremovebuff = [];
this.flagyongchang = !1;
this.weaponup = [];
this.lighting = !1;
this.isfenshen = !1;
if (t.fenshen) this.initfenshen(t.fenshen); else if (t.isplayer) {
this.initplayer();
this.addbuff(4007, 100, 1);
} else if (t.petdata) this.initpet(t.petdata); else {
this.initnpc(t);
cc.wujin && this.addbuff(10005, 100);
}
this.halfheight = this.height / 2;
this.quarterheight = this.height / 4;
this.enemycamp = this.gamelogic.getenemycamp(this);
this.refreshproprety();
this.hp = this.maxhp;
this.resetstate();
if (this.lighting) {
this.addbuff(103, 100);
2 == this.camp && cc.soundMgr.playSound("shanguang");
}
};
this.refreshproprety = function() {
this.maxhp = Math.floor(this.gamevaule.getrealvaule(u.maxhp));
this.movespeed = this.gamevaule.getrealvaule(u.movespeed);
this.atkspeed = this.gamevaule.getrealvaule(u.atkspeed);
this.flee = this.gamevaule.getrealvaule(u.flee);
this.hit = this.gamevaule.getrealvaule(u.hit);
this.cri = this.gamevaule.getrealvaule(u.cri);
this.atk = this.gamevaule.getrealvaule(u.atk);
this.matk = this.gamevaule.getrealvaule(u.matk);
this.datk = this.gamevaule.getrealvaule(u.datk);
this.vatk = this.gamevaule.getrealvaule(u.vatk);
this.def = this.gamevaule.getrealvaule(u.def);
this.mdef = this.gamevaule.getrealvaule(u.mdef);
this.singtime = this.gamevaule.singtime();
this.xixue = this.gamevaule.getrealvaule(u.xixue);
this.healdmg = (this.gamevaule.getrealvaule(u.healdmg) + 100) / 100;
this.cridmg = (this.gamevaule.getrealvaule(u.cridmg) + 150) / 100;
};
this.changeskill = function(t) {
this.skillarr = this.skillmap[t];
this.flagskillchange = !0;
};
this.equipweapons = function(t) {
this.allskills = [];
this.skillmap = [];
this.weapons = t;
for (var e = 0; e < t.length; e++) {
var i = t[e].skills;
this.skillmap[e] = [];
for (var s = 0; s < i.length; s++) {
var n = new r();
n.init(i[s][0], i[s][1], this);
this.allskills.push(n);
this.skillmap[e].push(n);
}
}
this.changeweapon(this.weaponidx);
};
this.changeweapon = function(t) {
this.weaponidx = t;
this.weaponidx > this.weapons.length - 1 && (this.weaponidx = this.weapons.length - 1);
this.nowweapon = this.weapons[this.weaponidx];
var e = o[this.nowweapon.id];
this.fixbullet = e.fixbullet;
this.wicon = e.icon;
this.changeskill(t);
this.atkskillcfg = null;
this.skillarr[0] && (this.atkskillcfg = this.skillarr[0].cfg);
this.fmatkbuf = null;
this.nowweapon.fmcfg && this.nowweapon.fmcfg.atkbuff && (this.fmatkbuf = this.nowweapon.fmcfg.atkbuff);
};
this.shuxingrefresh = function() {
this.isplayer && this.gamevaule.refreshplayerbp(this.weaponidx);
this.refreshproprety();
};
this.ckickweapon = function() {
if (!this.isdead()) {
this.weaponidx++;
this.weaponidx %= this.weapons.length;
this.changeweapon(this.weaponidx);
this.shuxingrefresh();
this.flagweaponchange = !0;
}
};
this.useskill = function(t) {
if (this.notatkcount > 0) return !1;
if (this.yingzhi) return !1;
var e = t.use(this);
e && (this.flaguseskill = t);
return e;
};
this.randskllidx = function() {
return 32 == this.skillarr[0].cfg.stype ? i.randintSeed(this.skillarr.length - 1) + 1 : i.randintSeed(this.skillarr.length);
};
this.clickskill = function(t) {
var e = this.skillarr[t];
if (!e) return !1;
if ("stateyongchang" == this.statemachine.getcurrentstatename()) {
this.yctime = 0;
this.resetstate();
}
var i = this.useskill(e);
i && this.flagskillcd && this.flagskillcd.push(t);
return i;
};
this.clickskill2 = function(t) {
var e = this.userskillarr[t];
if (e) {
if ("stateyongchang" == this.statemachine.getcurrentstatename()) {
this.yctime = 0;
this.resetstate();
}
this.useskill(e);
}
};
this.afteryongchang = function(t) {
this.flaguseskill = t;
this.isplayer && this.flagskillcd.push(t.index);
};
this.refreshuserskill = function() {
for (var t = cc.battlelogic.playerData.player.skillarr, e = 0; e < t.length; e++) if (t[e]) {
var i = new r();
i.init(t[e], 1, this);
this.allskills.push(i);
this.userskillarr.push(i);
}
this.flagchangeuserskill = !0;
};
this.setteshu = function(t, e) {
e || (e = 0);
for (var i = e; i < t.length; i++) {
var s = t[i];
if (s) {
s.talentarr2 && this.setteshu(s.talentarr2);
s.flag && (this.spflag |= s.flag);
if (s.buffs) for (var n = 0; n < s.buffs.length; n++) {
var a = s.buffs[n];
this.addbuff(a, 100, 1);
}
if (s.weaponup) {
var o = s.weaponup[0];
this.weaponup[o] || (this.weaponup[o] = 0);
this.weaponup[o] += s.weaponup[1] / 100;
}
if (s.fmcfg && s.fmcfg.weaponup) {
o = s.fmcfg.weaponup[0];
this.weaponup[o] || (this.weaponup[o] = 0);
this.weaponup[o] += s.fmcfg.weaponup[1] / 100;
}
}
}
};
this.initplayer = function() {
var t = cc.battlelogic.playerData;
this.zhuanshen = t.player.zhuanshen;
this.equipweapons(t.getweaponarr());
this.flagskillcd = [];
this.refreshuserskill();
this.isplayer = !0;
this.skin = "newhero54";
this.setteshu(t.player.talentarr);
this.setteshu(t.player.equiparr, 3);
this.setteshu(t.player.setforvaule);
this.gamevaule.initplayer(cc.battlelogic.playerData.player);
};
this.initfenshen = function(t) {
this.isplayer = !1;
this.isfenshen = !0;
var e = cc.battlelogic.playerData;
this.equipweapons(e.getweaponarr());
this.setteshu(e.player.talentarr);
this.setteshu(e.player.equiparr, 3);
this.setteshu(e.player.setforvaule);
this.fenshentime = 8;
this.ai = new l();
this.ai.init(22, this);
this.gamevaule.initplayer(cc.battlelogic.playerData.player);
this.changeweapon(t.weaponidx);
};
this.initpet = function(t) {
this.lighting = t.lighting;
this.wicon = "sword2";
this.ispet = !0;
this.cfgid = t.id;
for (var e = t.cfg, i = 0; i < t.skills.length; i++) {
var s = new r();
s.init(t.skills[i], 1, this);
this.skillarr.push(s);
this.allskills.push(s);
}
this.isboss = !1;
this.isplayer = !1;
t.isboss && (this.scale = 1.5);
this.skin = e.skinres;
if (e.width) {
this.width = e.width;
this.height = e.height;
}
this.ai = new l();
this.ai.init(22, this);
this.name = e.name;
t.isboss && (this.name = this.name + "首领");
this.setteshu(t.talentarr);
this.gamevaule.initpet(t.id, t);
};
this.initnpc = function(t) {
this.lighting = !1;
this.wicon = "sword2";
this.cfgid = t.cfgid;
for (var e = a[t.cfgid], s = 0; s < e.skills.length; s++) {
var n = new r();
n.init(e.skills[s], Math.floor(this.lv / 10) + 1, this);
this.skillarr.push(n);
this.allskills.push(n);
}
this.dropdata = e.drop;
this.dropdatasy = e.dropsy;
this.isbaby = !1;
this.isboss = t.isboss;
this.isplayer = !1;
if (e.babygl && 0 == cc.battlelogic.babycount && !cc.battlelogic.newbiemode && !cc.hell && !cc.wujin) {
var o = !0;
this.isboss && cc.stageid == cc.playerData.stage && (o = !1);
if (o && i.randintSeed(1e3) < e.babygl) {
this.isbaby = !0;
var c = 3;
cc.shanguangadd && (c *= 2);
i.randintSeed(100) < c && (this.lighting = !0);
cc.battlelogic.baby = this;
cc.battlelogic.babycount++;
cc.battlelogic.flaghasbaby = !0;
}
}
this.skin = e.skinres;
if (e.width) {
this.width = e.width;
this.height = e.height;
}
if (this.isboss) {
this.scale = 1.5;
this.width = this.width * this.scale;
this.height = this.height * this.scale;
}
this.ai = new l();
2 == this.camp ? this.ai.init(e.aiid, this) : this.ai.init(22, this);
this.name = e.name;
this.isboss && (this.name = this.name + "首领");
if (e.talent) {
var h = [];
for (s = 0; s < e.talent.length; s++) {
var p = d[e.talent[s]];
h.push(p);
}
this.setteshu(h);
}
this.gamevaule.initmonster(e, this.lv, this.isboss);
};
this.update = function(t) {
if (this.flagdead2) {
this.dodeadnojiangli();
this.flagdead2 = void 0;
}
if (this.flagbuzhuo2) {
this.flagbuzhuo = !0;
this.dodeadnojiangli();
this.flagbuzhuo2 = void 0;
cc.playerData.catchpet(this.cfgid, this.isboss, this.lighting);
}
var e = !1;
if (this.fenshentime) {
this.fenshentime -= t;
if (this.fenshentime <= 0) {
this.hp = 0;
this.deadtype = 0;
for (var i = this.buffarr.length - 1; i >= 0; i--) this.buffarr[i].life = 0;
this.lefttime = 1;
this.changestate("statedie", !1);
}
}
if (this.lefttime) {
this.lefttime -= t;
this.lefttime <= 0 && (e = !0);
}
this.ai && this.ai.update(t);
for (i = this.allskills.length - 1; i >= 0; i--) this.allskills[i].update(t);
for (i = this.buffarr.length - 1; i >= 0; i--) if (this.buffarr[i] && this.buffarr[i].update(t)) {
this.flagremovebuff.push(this.buffarr[i].bid);
this.buffarr.splice(i, 1);
}
this.statemachine.update(t);
if (this.force > 0) {
this.force -= t;
0 == this.baticount && this.realmove(t, this.dir2, 300);
}
if (this.xiyin > 0) {
this.xiyin -= t;
0 == this.baticount && this.realmove(t, this.dir3, 100);
}
return e;
};
this.realmove = function(t, e, i, s) {
s || (t *= this.timescale);
i || (i = this.movespeed);
this.x, this.y;
var n = i * t, a = this.x + e.x * n, o = this.y + e.y * n, c = (this.gamelogic.inviewloots, 
this.quarterheight, this.width, this.halfheight, a), r = o - this.gamelogic.mappixisizeh / 2 - 16, l = Math.floor(c / 64 - r / 32), h = Math.floor(c / 64 + r / 32), p = this.gamelogic.mapsize - 1;
if (l >= 0 && l <= p && h >= 0 && h <= p) {
this.x = a;
this.y = o;
}
};
this.domove = function(t) {
this.notmovecount > 0 || this.realmove(t, this.dir);
};
this.changestate = function(t, e, i) {
this.statemachine.switchToState(t, e, i);
};
this.resetstate = function() {
this.clickingmoveing ? this.changestate("statemove") : this.changestate("stateidle");
};
this.movebegin = function() {
this.clickingmoveing = !0;
};
this.moveend = function() {
this.clickingmoveing = !1;
};
this.setmovedir = function(t, e) {
this.dir.x = t;
this.dir.y = e;
this.dir.normalizeSelf();
};
this.isdead = function() {
return this.flagdead;
};
this.heal = function(t) {
if (!this.isdead()) {
t = Math.max(1, Math.floor(t));
this.hp += t;
this.hp > this.maxhp && (this.hp = this.maxhp);
this.dmgarr.push({
v: -t,
cri: !1,
miss: !1
});
}
};
this.kouxue = function(t) {
if (!this.isdead()) {
t = Math.floor(t);
this.wudicount > 0 && (t = 0);
this.hp -= t;
this.hp <= 0 && this.dodead();
this.dmgarr.push({
v: t,
cri: !1,
miss: !1
});
}
};
this.dohurt = function(t, e, s) {
if (null == e.fixdmg) {
var n = 1;
if (t.lv < this.lv) {
n = Math.max(10, 100 - 2 * (this.lv - t.lv)) / 100;
(cc.shenyuan || cc.hell) && 2 == t.camp && (n = 1);
}
cc.wujin && (n = 1);
var a = t.hit * n - this.flee;
this.allmiss2 || (a = Math.max(1, a));
var o = !1;
a >= i.randintSeed(100) && (o = !0);
var c = "miss", r = !1;
this.checkhasflat(f.notbecri) || (r = this.gamevaule.cridule(t.gamevaule, this.gamevaule));
r && (o = !0);
e.cfg.hurtres && cc.battlelogic.createeff({
eff: e.cfg.hurtres,
x: this.x,
y: this.y,
fx: t.x > this.x ? 1 : -1
});
e.cfg.selfres && cc.battlelogic.createeff({
eff: e.cfg.selfres,
x: t.x,
y: t.y,
fx: t.x > this.x ? 1 : -1
});
if (!this.allmiss) {
var l = e.cfg.fixhit;
(cc.shenyuan || cc.hell || cc.wujin) && 3 == e.cfg.atktype && (l = !0);
l && (o = !0);
}
if (o) {
t.fmatkbuf && t.addbuff(t.fmatkbuf[1], t.fmatkbuf[0], 1);
this.chouren = t;
if (e.cfg.force) {
this.force = e.cfg.force;
this.dir2.x = this.x - s.x;
this.dir2.y = this.y - s.y;
this.dir2.normalizeSelf();
}
if (e.cfg.xiyin) {
this.xiyin = e.cfg.xiyin;
this.dir3.x = s.x - this.x;
this.dir3.y = s.y - this.y;
this.dir3.normalizeSelf();
}
var h = 0, p = 0;
if (10 == e.atktype) {
for (var d = e.cfg.atk.length - 1; d >= 0; d--) {
var u = e.cfg.atk[d];
h += t[u[0]] * u[1];
}
for (d = e.cfg.def.length - 1; d >= 0; d--) {
var y = e.cfg.def[d];
p += this[y[0]] * y[1];
}
c = h - p;
} else {
if (3 == e.atktype) {
h = t.matk;
p = this.mdef;
this.onlywdef && (p = this.def);
} else {
h = t.atk;
p = this.def;
}
t.skipdef > 0 && (p = 0);
c = Math.pow(h, 2) / (h + 5 * p);
}
c *= n;
var m = 0, b = [], v = [];
for (d = t.buffarr.length - 1; d >= 0; d--) if (t.buffarr[d]) {
var k = t.buffarr[d].doatk(e, b, this, r);
m += k.buffdmgup;
0 != k.addbuff && v.push(k.addbuff);
}
for (d = 0; d < v.length; d++) t.addbuff(v[d], 100, 1);
m += t.gamevaule.calshuxing(t.gamevaule, this.gamevaule, e.cfg.stype);
var _ = t.weaponup[e.cfg.stype];
_ && (m += _);
0 != (e.cfg.stype & g.pyh) ? (_ = t.weaponup[g.pyh]) && (m += _) : 0 != (e.cfg.stype & g.mag) && (_ = t.weaponup[g.mag]) && (m += _);
(_ = t.weaponup[g.alldmg]) && (m += _);
e.cfg.wdmg && (c *= e.cfg.wdmg);
c *= m;
r && (c *= t.cridmg);
c = Math.max(Math.floor(c), 1);
var w = e.cfg.xixue || 0;
t.xixue && (w += t.xixue);
w > 0 && t.heal(Math.floor(c * w / 100));
c *= this.dmgbili;
c = Math.max(Math.floor(c), 1);
this.wudicount > 0 && (c = 0);
this.hp -= c;
if (this.hp <= 0) {
this.deadfx = t.x < this.x ? 1 : -1;
this.dodead();
} else {
if (e.cfg.hitbuffs) for (d = e.cfg.hitbuffs.length - 1; d >= 0; d--) {
var x = e.cfg.hitbuffs[d], C = x.chance + e.buffchanceup;
this.addbuff(x.id, C, 1, x.count, x.time, e, t);
}
for (d = this.buffarr.length - 1; d >= 0; d--) this.buffarr[d] && this.buffarr[d].beatk(c, t);
e.cfg.delayto && 0 == this.baticount && !this.isboss && this.changestate("stateyinzhi", e.cfg.delayto);
for (d = 0; d < b.length; d++) {
var S = b[d];
this.addbuff(S.id, S.chance, S.lv, void 0, void 0, void 0, t);
}
}
} else {
for (b = [], d = this.buffarr.length - 1; d >= 0; d--) this.buffarr[d].domiss(t, b);
for (d = 0; d < b.length; d++) {
S = b[d];
this.addbuff(S.id, S.chance, S.lv, void 0, void 0, void 0, t);
}
}
this.dmgarr.push({
v: c,
cri: r,
miss: !o
});
} else this.kouxue(e.fixdmg);
};
this.dodeadnojiangli = function() {
this.hp = 0;
this.gamelogic.killcount++;
this.lefttime = 3;
this.buffarr.length = 0;
if (this.isbaby) {
cc.battlelogic.babycount--;
cc.battlelogic.flagnobaby = !0;
this.isbaby = !1;
}
this.deadtype = 1;
this.changestate("statedie", null, 1);
};
this.dodead = function() {
if (this.deadcheck) for (var t = this.buffarr.length - 1; t >= 0; t--) {
this.buffarr[t].dodeadcheck();
if (this.hp > 0) return;
}
this.deadtype = 0;
this.hp = 0;
if (2 == this.camp) {
this.gamelogic.createdrop(this);
this.gamelogic.killcount++;
this.lefttime = 3;
this.buffarr.length = 0;
if (!this.gamelogic.newbiemode) {
cc.playerData.player.gainexp(this.lv) && (this.flaglvup = !0);
if (cc.playerData.battlepet) {
var e = cc.playerData.battlepet;
e.gainexp(this.lv) && cc.battlelogic.petplayer.gamevaule.initpet(e.id, e);
}
var i = cc.playerData.stage;
cc.shenyuan && (i = cc.playerData.stagesy);
!this.isboss || cc.stageid != i || cc.hell || cc.wujin || cc.playerData.addstage();
}
} else for (t = this.buffarr.length - 1; t >= 0; t--) this.buffarr[t].life < 100 && (this.buffarr[t].life = 0);
if (this.isbaby) {
cc.battlelogic.babycount--;
cc.battlelogic.flagnobaby = !0;
this.isbaby = !1;
}
this.ispet && (this.deadtype = 1);
this.changestate("statedie", this.ispet);
};
this.addbuff = function(t, e, s, n, a, o, r, l) {
var h = !1;
if (i.randintSeed(100) < e) {
h = !0;
for (var p = this.buffarr.length - 1; p >= 0; p--) if (this.buffarr[p].bid == t) {
this.buffarr[p].refreshtime(n);
h = !1;
break;
}
}
if (h) {
var d = new c();
d.init(t, this, a, o, s, r, l);
this.buffarr.push(d);
this.flagaddbuff.push(d);
}
};
this.removebuff = function() {};
this.gethp100 = function() {
return Math.floor(this.hp / this.maxhp * 100);
};
this.cridule = function(t, e) {
return .3 * t.luk + t.criv - .2 * e.luk > i.randintSeed(100);
};
this.getatkdelay = function() {
return 100 / this.atkspeed;
};
this.setyc = function(t, e) {
t *= this.singtime;
this.yctime = t;
this.maxyctime = t;
this.ycskill = e;
};
this.getycbili = function() {
return this.yctime / this.maxyctime;
};
this.updateyongchang = function(t) {
if (this.yctime > 0) {
this.yctime -= t;
if (this.yctime <= 0) {
this.ycskill.useskill() && this.afteryongchang(this.ycskill);
return !0;
}
}
return !1;
};
this.hasbuff = function(t) {
for (var e = this.buffarr.length - 1; e >= 0; e--) if (this.buffarr[e].bid == t) return this.buffarr[e];
return null;
};
this.reset = function() {
this.hp = this.maxhp;
this.clickingmoveing = !1;
this.yingzhi = !1;
this.flagdead = !1;
this.flagfuhuo = !0;
this.ai && this.ai.reset();
for (var t = this.allskills.length - 1; t >= 0; t--) this.allskills[t].reset();
this.statemachine.switchToState("stateyinzhi", .5);
};
this.doin = function() {};
this.doout = function() {
this.reset();
this.isdead() || this.changestate("stateidle");
};
};
cc._RF.pop();
}, {
Utils: "Utils",
battlestates: "battlestates",
buffobj: "buffobj",
enumcfg: "enumcfg",
gameConfig: "gameConfig",
gameai: "gameai",
gamevaule: "gamevaule",
monstercfg: "monstercfg",
skillcfg: "skillcfg",
skillobj: "skillobj",
statemachine: "statemachine",
talentcfg: "talentcfg"
} ],
