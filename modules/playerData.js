playerData: [ function(t, e) {
"use strict";
cc._RF.push(e, "196b4HelRNE8omeM0X1tP96", "playerData");
var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
t("SDKManage");
function s(t) {
for (var e = "", i = 0, s = 0, n = 0, a = 0; i < t.length; ) if ((s = t.charCodeAt(i)) < 128) {
e += String.fromCharCode(s);
i++;
} else if (s > 191 && s < 224) {
n = t.charCodeAt(i + 1);
e += String.fromCharCode((31 & s) << 6 | 63 & n);
i += 2;
} else {
n = t.charCodeAt(i + 1);
a = t.charCodeAt(i + 2);
e += String.fromCharCode((15 & s) << 12 | (63 & n) << 6 | 63 & a);
i += 3;
}
return e;
}
function n(t) {
var e, n, a, o, c, r, l = "", h = 0;
t = t.replace(/[^A-Za-z0-9\+\/\=]/g, "");
for (;h < t.length; ) {
e = i.indexOf(t.charAt(h++)) << 2 | (o = i.indexOf(t.charAt(h++))) >> 4;
n = (15 & o) << 4 | (c = i.indexOf(t.charAt(h++))) >> 2;
a = (3 & c) << 6 | (r = i.indexOf(t.charAt(h++)));
l += String.fromCharCode(e);
64 != c && (l += String.fromCharCode(n));
64 != r && (l += String.fromCharCode(a));
}
return s(l);
}
function a(t) {
return n(t);
}
var o = t("enumcfg"), c = (o.enumequipos, t("equipobj")), r = (t("talentcfg"), t("fumocfg")), l = t("Utils"), h = t("itemobj"), p = t("petobj"), d = (o.enumproperty2, 
t("charobj")), u = t("monstercfg"), f = t("gameConfig"), g = f.itemConfig, y = f.setcfg, m = f.seteffcfg, b = f.peifangcfg, v = t("duihuancfg"), k = t("petbookcfg"), _ = {
1: [ [ 38001, 10 ] ],
2: [ [ 38002, 10 ] ],
3: [ [ 38003, 10 ] ],
4: [ [ 38004, 10 ] ],
5: [ [ 38004, 10 ], [ 38005, 5 ] ]
}, w = new function() {
this.setarr = function() {
this.equipbag = [];
this.bankequip = [];
this.petbag = [];
this.bankpet = [];
this.petskills = [];
};
this.init = function() {
this.saveidx = 0;
this.time = 0;
this.uuid = 0;
this.gold = 0;
this.newbiemode2 = !1;
this.equipbag = [];
this.itembag = [];
this.petbag = [];
this.fmarr = [];
this.pfarr = [];
this.petskills = [];
this.petbook = {};
this.initcfg();
this.player = new d();
this.battlepet = null;
this.stage = 1;
this.tempstage = 1;
this.stagesy = 1;
this.bankpet = [];
this.bankequip = [];
this.ismale = !0;
this.libaoarr = [];
this.xxarr = [ 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
this.zbcount = 0;
this.dailyreward = !0;
this.adcount = 0;
this.launchtime = 0;
this.needrefreshbook = !0;
this.petscore = 0;
};
this.hasgetcode = function(t) {
for (var e = !1, i = 0; i < this.libaoarr.length; i++) if (this.libaoarr[i] == t) {
e = !0;
break;
}
return e;
};
this.getcode = function(t) {
var e = t.t;
if (1 == e) {
this.changegold(t.v);
cc.uiHelper.showTips("获得金币" + t.v);
} else if (2 == e) {
this.catchpet(t.v, !1, !1);
cc.uiHelper.showTips("获得宠物" + u[t.v].name);
} else if (3 == e) {
cc.playerData.additembyid(t.v, t.v2, !0);
cc.uiHelper.showTips("获得", "icons/items/" + g[t.v].icon, void 0, "x" + t.v2);
}
this.saveflag = !0;
};
this.checkcode = function(t) {
var e = !1;
for (var i in v) if (v[i].k == t) {
e = !0;
if (this.hasgetcode(i)) cc.uiHelper.showTips("兑换码已使用"); else {
this.getcode(v[i]);
this.libaoarr.push(i);
}
break;
}
e || cc.uiHelper.showTips("无效的兑换码");
};
this.savexingxiang = function(t, e) {
this.ismale = e;
this.xxarr = [];
for (var i = 0; i < t.length; i++) this.xxarr.push(t[i]);
this.saveflag = !0;
};
this.arr1toarr2 = function(t, e, i) {
for (var s = null, n = e.length - 1; n >= 0; n--) if (e[n] == t) {
s = t;
e.splice(n, 1);
break;
}
s && i.push(s);
this.saveflag = !0;
};
this.pettobank = function(t) {
this.arr1toarr2(t, this.petbag, this.bankpet);
};
this.banktopet = function(t) {
this.arr1toarr2(t, this.bankpet, this.petbag);
};
this.itemtobank = function(t) {
this.arr1toarr2(t, this.equipbag, this.bankequip);
};
this.banktoitem = function(t) {
this.arr1toarr2(t, this.bankequip, this.equipbag);
};
this.sellitem = function(t, e) {
e = Math.min(e, t.count);
t.count -= e;
var i = Math.floor(t.cfg.cost / 2) * e;
this.changegold(i);
if (0 == t.count) for (var s = this.itembag.length - 1; s >= 0; s--) this.itembag[s].id == t.id && this.itembag.splice(s, 1);
this.saveflag = !0;
};
this.sellequip = function(t) {
for (var e = this.equipbag.length - 1; e >= 0; e--) if (this.equipbag[e] == t) {
if (t.suoding) return !1;
var i = Math.floor(t.cfg.cost / 2);
this.changegold(i);
this.equipbag.splice(e, 1);
this.saveflag = !0;
return !0;
}
return !0;
};
this.fangsheng = function(t) {
if (this.battlepet == t) return !1;
for (var e = this.petbag.length - 1; e >= 0; e--) if (this.petbag[e] == t) {
this.petbag.splice(e, 1);
break;
}
this.saveflag = !0;
return !0;
};
this.fangshengall = function() {
for (var t = [], e = this.petbag.length - 1; e >= 0; e--) (this.petbag[e] == this.battlepet || this.petbag[e].isboss && this.petbag[e].lighting) && t.push(this.petbag[e]);
this.petbag = t;
this.saveflag = !0;
return !0;
};
this.xiaohaoitembyid = function(t, e) {
var i = this.finditembyid(t);
i.count -= e;
if (i.count <= 0) for (var s = this.itembag.length - 1; s >= 0; s--) this.itembag[s].id == t && this.itembag.splice(s, 1);
this.saveflag = !0;
};
this.getfmcost = function(t) {
return _[t];
};
this.dohecheng = function(t) {
for (var e = b[t], i = e.cost, s = 0; s < i.length; s++) {
var n = i[s][0], a = i[s][1];
this.xiaohaoitembyid(n, a);
}
this.additembyid(e.item, 1, !0);
this.saveflag = !0;
};
this.dofumo = function(t, e) {
for (var i = r[e], s = cc.playerData.getfmcost(i.qulity), n = 0; n < s.length; n++) {
var a = s[n][0], o = s[n][1];
this.xiaohaoitembyid(a, o);
}
t.dofumo(e);
this.saveflag = !0;
return !0;
};
this.downequip = function(t) {
if (t < 3 && this.getweaponarr().length <= 1) {
cc.uiHelper.showTips("至少带一把武器");
return 3;
}
if (this.equipbag.length < 1e5) {
this.player.doequip(null, t);
this.saveflag = !0;
return 1;
}
cc.uiHelper.showTips("包满了");
return 2;
};
this.seteffopa = function(t, e) {
if (t["eff" + e]) {
var i = {};
i.count = e;
var s = m[t["eff" + e]];
s.property && (i.property = l.strintoarr(s.property));
s.weaponup && (i.weaponup = l.stringtoarrone(s.weaponup, ":"));
s.buffs && (i.buffs = l.stringtoarrone(s.buffs, "|"));
s.des && (i.des = s.des);
if (s.color) {
var n = l.stringtoarrone(s.color, ":");
i.color = new cc.Color(n[0], n[1], n[2]);
}
return i;
}
return null;
};
this.initcfg = function() {
for (var t in u) {
var e = u[t];
e.skills || (e.skills = [ 1 ]);
e.aiid || (e.aiid = 2);
e.beilv || (e.beilv = 20);
}
for (var t in g) {
var i = g[t];
i.fixproperty && (i.fixproperty = l.strintoarr(i.fixproperty));
i.element && (i.element = l.stringtoarrone(i.element, ":"));
i.fixskill && (i.fixskill = l.stringtoarrone(i.fixskill, "|"));
}
for (var t in y) {
var s = {}, n = y[t];
s.id = t;
s.parts = l.stringtoarrone(n.cost, "|");
s.name = n.name;
s.parmas = [];
for (var a = 2; a <= 6; a++) {
var o = this.seteffopa(n, a);
o && s.parmas.push(o);
}
y[t] = s;
}
for (var t in y) for (var c = y[t].parts, r = c.length - 1; r >= 0; r--) g[c[r]].setid = t;
for (var t in b) b[t].cost = l.strintoarr(b[t].cost);
for (r = 0; r < k.length; r++) u[k[r]].bookid = r;
};
this.getweaponarr = function() {
for (var t = this.player.equiparr, e = [], i = 0; i < 3; i++) t[i] && e.push(t[i]);
return e;
};
this.fenjieequip = function(t) {
for (var e = {}, i = this.equipbag.length - 1; i >= 0; i--) {
var s = this.equipbag[i];
if (s.uuid == t) {
if (s.suoding) return !1;
this.equipbag.splice(i, 1);
for (var n = s.qulity, a = l.randintSeed(5) + 1, o = 0; o < a; o++) {
var c = 38001 + l.randintSeed(n);
e[c] || (e[c] = 0);
e[c]++;
}
break;
}
}
for (var r in e) {
this.saveflag = !0;
this.additembyid(r, e[r]);
}
return e;
};
this.piliangfenjie = function(t) {
for (var e = {}, i = this.equipbag.length - 1; i >= 0; i--) {
var s = this.equipbag[i];
if (t[s.qulity - 1] && !s.suoding) {
this.equipbag.splice(i, 1);
for (var n = s.qulity, a = l.randintSeed(5) + 1, o = 0; o < a; o++) {
var c = 38001 + l.randintSeed(n);
e[c] || (e[c] = 0);
e[c]++;
}
}
}
for (var r in e) {
this.saveflag = !0;
this.additembyid(r, e[r]);
}
return e;
};
this.piliangselleq = function(t) {
for (var e = !1, i = this.equipbag.length - 1; i >= 0; i--) {
var s = this.equipbag[i];
if (t[s.qulity - 1] && !s.suoding) {
var n = Math.floor(s.cfg.cost / 2);
this.changegold(n);
this.equipbag.splice(i, 1);
this.saveflag = !0;
e = !0;
}
}
return e;
};
this.doequipfrombag = function(t, e) {
for (var i = this.equipbag.length - 1; i >= 0; i--) {
var s = this.equipbag[i];
if (s.uuid == t) {
this.equipbag.splice(i, 1);
this.player.doequip(s, e);
this.saveflag = !0;
break;
}
}
};
this.additem = function(t) {
var e;
1 != t.type && 2 != t.type || (e = this.equipbag);
if (e.length < 1e5) {
e.push(t);
this.saveflag = !0;
return !0;
}
return !1;
};
this.newgame = function() {
this.gold = 3e3;
this.player.init();
this.player.newgame();
};
this.savedata = function() {
var t = {
uuid: this.uuid,
gold: this.gold,
fmarr: this.fmarr,
pfarr: this.pfarr,
petskills: this.petskills,
xxarr: this.xxarr,
ismale: this.ismale,
stage: this.stage,
stagesy: this.stagesy,
libaoarr: this.libaoarr,
dailyreward: this.dailyreward,
newbiemode2: this.newbiemode2,
launchtime: this.launchtime,
petbook: this.petbook
};
this.battlepet && (t.battlepet = this.battlepet.uuid);
t.itembag = [];
for (var e = 0; e < this.itembag.length; e++) t.itembag.push(this.itembag[e].encode());
t.equipbag = [];
for (e = 0; e < this.equipbag.length; e++) t.equipbag.push(this.equipbag[e].encode());
t.bankequip = [];
for (e = 0; e < this.bankequip.length; e++) t.bankequip.push(this.bankequip[e].encode());
t.petbag = [];
for (e = 0; e < this.petbag.length; e++) t.petbag.push(this.petbag[e].encode());
t.bankpet = [];
for (e = 0; e < this.bankpet.length; e++) t.bankpet.push(this.bankpet[e].encode());
t.player = this.player.encode();
var i = null;
try {
i = JSON.stringify(t);
cc.isyuansheng && (i = btoa(encodeURIComponent(i).replace(/%([0-9A-F]{2})/g, function(t, e) {
return String.fromCharCode("0x" + e);
})));
cc.sys.localStorage.setItem("commonsaveshuazi", i);
this.saveidx % 10 == 0 && cc.sys.localStorage.setItem("commonsaveshuazibf", i);
this.saveidx++;
} catch (t) {}
return i;
};
this.loaddata = function() {
var t = this, e = new Date(), i = e.getMonth() + "-" + e.getDate(), s = cc.sys.localStorage.getItem("commonsaveshuazi");
null != s && "" != s || (s = cc.sys.localStorage.getItem("commonsaveshuazibf"));
if (null == s || "" == s) {
try {
cc.sys.localStorage.setItem("datakey2", i);
} catch (t) {}
this.newgame();
setTimeout(function() {
t.savedata();
}, 3e3);
return !1;
}
var n, o = null;
o = cc.isyuansheng ? a(s) : s;
var r = !1;
try {
n = JSON.parse(o);
} catch (t) {
r = !0;
}
if (r) try {
n = JSON.parse(s);
} catch (t) {
s = cc.sys.localStorage.getItem("commonsaveshuazibf");
o = cc.isyuansheng ? a(s) : s;
n = JSON.parse(o);
}
this.uuid = n.uuid;
this.gold = n.gold;
this.fmarr = n.fmarr;
this.pfarr = n.pfarr;
this.petskills = n.petskills;
this.xxarr = n.xxarr;
this.ismale = n.ismale;
this.stage = n.stage;
this.libaoarr = n.libaoarr;
this.launchtime = n.launchtime;
this.petbook = n.petbook;
this.libaoarr || (this.libaoarr = []);
n.stagesy && (this.stagesy = n.stagesy);
for (var l = 0; l < n.equipbag.length; l++) (d = new c().initwithsave(n.equipbag[l])) && this.equipbag.push(d);
for (l = 0; l < n.bankequip.length; l++) (d = new c().initwithsave(n.bankequip[l])) && this.bankequip.push(d);
for (l = 0; l < n.itembag.length; l++) (d = new h().initwithsave(n.itembag[l])) && this.itembag.push(d);
for (l = 0; l < n.petbag.length; l++) {
var d = new p().initwithsave(n.petbag[l]);
this.petbag.push(d);
}
for (l = 0; l < n.bankpet.length; l++) {
d = new p().initwithsave(n.bankpet[l]);
this.bankpet.push(d);
}
this.player.initwithsave(n.player);
this.equippet(n.battlepet);
this.tempstage = this.stage;
this.tempstage > 50 && (this.tempstage = 50);
this.dailyreward = n.dailyreward;
if (cc.sys.localStorage.getItem("datakey2") != i) {
this.dailyreward = !0;
try {
cc.sys.localStorage.setItem("datakey2", i);
this.savedata();
} catch (t) {}
}
this.newbiemode2 = n.newbiemode2;
if (this.newbiemode2) {
if (cc.launchtime > this.launchtime) {
this.launchtime = cc.launchtime + 427e5;
this.setarr();
this.player.init();
this.saveflag = !0;
}
} else this.newbiemode2 = !1;
if (!this.petbook) {
this.petbook = {};
for (l = 0; l < this.petbag.length; l++) {
var u = this.petbag[l];
this.tobook(u.id, u.isboss, u.lighting);
}
for (l = 0; l < this.bankpet.length; l++) {
u = this.bankpet[l];
this.tobook(u.id, u.isboss, u.lighting);
}
}
return !0;
};
this.retemp = function() {
cc.shenyuan ? this.tempstage = this.stagesy : this.tempstage = this.stage;
this.tempstage > 50 && (this.tempstage = 50);
};
this.tobook = function(t, e, i) {
if (null != u[t].bookid) {
this.petbook[t] || (this.petbook[t] = 0);
e || i ? !e && i ? this.petbook[t] |= 2 : e && !i ? this.petbook[t] |= 4 : e && i && (this.petbook[t] |= 8) : this.petbook[t] |= 1;
this.needrefreshbook = !0;
}
};
this.getbookscore = function() {
if (!this.needrefreshbook) return this.petscore;
var t = 0;
for (var e in this.petbook) {
var i = this.petbook[e];
1 & i && (t += 1);
2 & i && (t += 2);
4 & i && (t += 2);
8 & i && (t += 5);
}
this.petscore = t;
this.needrefreshbook = !1;
return this.petscore;
};
this.getpetbaoshang = function() {
var t = 2 * this.getbookscore();
return Math.floor(t);
};
this.getplayerbaoshang = function() {
var t = this.getbookscore() / 10;
return Math.floor(t);
};
this.getpetbsproperty = function() {
return {
property: [ [ 21, this.getpetbaoshang() ] ]
};
};
this.getplayerbsproperty = function() {
return {
property: [ [ 121, this.getplayerbaoshang() ] ]
};
};
this.getscorebyid = function(t) {
var e = this.petbook[t];
if (!e) return 0;
var i = 0;
2 & e && (i += 100);
4 & e && (i += 100);
8 & e && (i += 200);
return i;
};
this.catchpet = function(t, e, i) {
this.tobook(t, e, i);
var s = new p();
s.initwithid(t, e, i);
this.petbag.push(s);
this.saveflag = !0;
return s;
};
this.equippet = function(t) {
if (t) for (var e = 0; e < this.petbag.length; e++) if (this.petbag[e].uuid == t) {
this.battlepet = this.petbag[e];
this.saveflag = !0;
break;
}
};
this.changegold = function(t) {
this.saveflag = !0;
this.gold += t;
cc.Notifier.emit("goldchange");
};
this.finditembyid = function(t) {
for (var e = this.itembag.length - 1; e >= 0; e--) if (this.itembag[e].id == t) return this.itembag[e];
return null;
};
this.getitemcountbyid = function(t) {
var e = this.finditembyid(t);
return e ? e.count : 0;
};
this.learnpetskill = function(t) {
for (var e = 0; e < this.petskills.length; e++) if (this.petskills[e] == t) return !1;
this.petskills.push(t);
this.saveflag = !0;
return !0;
};
this.learnfmpeifang = function(t) {
for (var e = 0; e < this.fmarr.length; e++) if (this.fmarr[e] == t) return !1;
this.fmarr.push(t);
this.saveflag = !0;
return !0;
};
this.learnitempeifang = function(t) {
for (var e = 0; e < this.pfarr.length; e++) if (this.pfarr[e] == t) return !1;
this.pfarr.push(t);
this.saveflag = !0;
return !0;
};
this.kaibaoxiang = function(t) {
t.sp2 || (t.sp2 = t.sp1.split("|"));
var e = t.sp2[l.randintSeed(t.sp2.length)];
this.additembyid(e, 1);
return e;
};
this.useitem = function(t) {
var e = t.cfg, i = !0, s = null;
if (2 == e.subtype) (i = this.player.learnskill(e.sp1)) || (s = "已经学习过了"); else if (3 == e.subtype) (i = this.learnpetskill(e.sp1)) || (s = "已经学习过了"); else if (4 == e.subtype) (i = this.learnfmpeifang(e.sp1)) || (s = "已经学习过了"); else if (5 == e.subtype) (i = this.learnitempeifang(e.sp1)) || (s = "已经学习过了"); else if (6 == e.subtype) {
s = this.kaibaoxiang(e);
i = !0;
}
if (i) {
t.count--;
if (0 == t.count) for (var n = this.itembag.length - 1; n >= 0; n--) this.itembag[n].id == t.id && this.itembag.splice(n, 1);
this.saveflag = !0;
}
return s;
};
this.additembyid = function(t, e, i) {
var s = g[t];
if (!s) {
console.log("id" + t + "不存在");
return !1;
}
var n = !1;
if (1 == s.type || 2 == s.type) {
if (this.equipbag.length < 1e5) {
var a = i ? void 0 : 1, o = new c().initwithid(t, 0, a);
this.equipbag.push(o);
n = !0;
}
} else {
var r = this.finditembyid(t);
if (r) r.count += e; else {
(r = new h()).init(t);
r.count = e;
this.itembag.push(r);
}
n = !0;
}
this.saveflag = !0;
return n;
};
this.additembyid2 = function(t, e, i) {
var s = g[t];
if (!s) {
console.log("id" + t + "不存在");
return !1;
}
var n = !1;
if (1 == s.type || 2 == s.type) {
if (this.equipbag.length < 1e5) {
var a = i ? void 0 : 1, o = new c().initwithid(t, 0, a);
o.qulity = 5;
o.setproperty();
this.equipbag.push(o);
n = !0;
}
} else {
var r = this.finditembyid(t);
if (r) r.count += e; else {
(r = new h()).init(t);
r.count = e;
this.itembag.push(r);
}
n = !0;
}
this.saveflag = !0;
return n;
};
this.buytimebyitem = function(t, e, i, s) {
var n = g[t];
if (this.getitemcountbyid(i) < s) return 3;
var a = !1, o = 0;
if (1 == n.type || 2 == n.type) if (this.equipbag.length < 1e5) {
var r = new c().initwithid(t, 0);
this.equipbag.push(r);
a = !0;
} else o = 1; else {
var l = this.finditembyid(t);
if (l) l.count += e; else {
(l = new h()).init(t);
l.count = e;
this.itembag.push(l);
}
a = !0;
}
a && this.xiaohaoitembyid(i, s);
this.saveflag = !0;
return o;
};
this.buyitem = function(t, e, i, s) {
if (i) return this.buytimebyitem(t, e, 30005, s);
var n = g[t], a = n.cost;
a || (a = 100);
e || (e = 1);
a *= e;
var o = !1, r = 0;
if (this.gold >= a) {
if (1 == n.type || 2 == n.type) if (this.equipbag.length < 1e5) {
var l = new c().initwithid(t, 0, 1);
this.equipbag.push(l);
o = !0;
} else r = 1; else {
var p = this.finditembyid(t);
if (p) p.count += e; else {
(p = new h()).init(t);
p.count = e;
this.itembag.push(p);
}
o = !0;
}
o && this.changegold(-a);
this.saveflag = !0;
} else r = 2;
return r;
};
this.addstage = function() {
this.saveflag = !0;
cc.shenyuan ? this.stagesy++ : this.stage++;
};
this.getstage = function() {
return Math.min(this.stage, 50);
};
this.getstagesy = function() {
return Math.min(this.stagesy, 50);
};
this.update = function(t) {
this.time += t;
if (this.time > 3) {
this.time = 0;
this.saveflag && this.savedata();
this.saveflag = null;
}
};
this.allitem = function() {
for (var t in g) {
var e = g[t], i = 9999;
if (e) {
1 != e.type && 2 != e.type || (i = 1);
cc.playerData.additembyid2(t, i, !0);
}
}
};
this.allpet = function() {
for (var t in u) {
this.catchpet(t, !1, !1);
this.catchpet(t, 1, 1);
this.catchpet(t, 1, 0);
this.catchpet(t, 0, 1);
}
};
this.zhengli = function() {
this.itembag = this.itembag.sort(function(t, e) {
return 35001 == t.id ? -1 : 35001 == e.id ? 9999999 : t.id - e.id;
});
this.equipbag = this.equipbag.sort(function(t, e) {
return t.id - e.id;
});
};
}();
cc.playerData = w;
w.init();
e.exports = w;
cc._RF.pop();
}, {
SDKManage: "SDKManage",
Utils: "Utils",
charobj: "charobj",
duihuancfg: "duihuancfg",
enumcfg: "enumcfg",
equipobj: "equipobj",
fumocfg: "fumocfg",
gameConfig: "gameConfig",
itemobj: "itemobj",
monstercfg: "monstercfg",
petbookcfg: "petbookcfg",
petobj: "petobj",
talentcfg: "talentcfg"
} ],
