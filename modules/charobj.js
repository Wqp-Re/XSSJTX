charobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "8d9742lENVOQ7veVBhxae3O", "charobj");
var i = t("enumcfg"), s = i.enumequipos, n = t("equipobj"), a = (t("talentcfg"), 
t("gameConfig")), o = (a.itemConfig, a.setcfg), c = (t("Utils"), i.enumproperty2);
e.exports = function() {
this.init = function() {
this.lv = 1;
this.exp = 0;
this.maxexp = 0;
this.str = 10;
this.vit = 10;
this.agi = 10;
this.luk = 10;
this.int = 10;
this.dex = 10;
this.bppoint = 0;
this.zhuanshen = 0;
this.equiparr = [];
this.talentarr = [];
this.skillarr = [ 22 ];
this.setmap = {};
this.lskillarr = [ 22 ];
this.setforvaule = [];
for (var t = 0; t < s.count; t++) this.equiparr.push(null);
};
this.canchuanshen = function() {
var t = 100 * this.zhuanshen + 300;
return !(this.lv < t);
};
this.dozhuanshen = function() {
var t = 100 * this.zhuanshen + 300;
if (this.lv < t) return !1;
var e = Math.pow(t * (t + 1) / 2, 2), i = Math.pow(this.lv * (this.lv + 1) / 2, 2) - e;
this.exp = 0;
this.lv = 1;
this.setnextexp();
this.gainexpv(i, !0);
this.zhuanshen++;
this.resetbp();
return !0;
};
this.getelement = function() {
var t = this.equiparr[s.crystal];
return t ? t.cfg.element : [ 0, 0, 0 ];
};
this.doequip = function(t, e) {
var i = this.equiparr[e], n = !1;
t && (n = t.cfg.setid);
if (i) {
cc.playerData.additem(i);
i.cfg.setid && (n = !0);
}
this.equiparr[e] = t;
if (n) {
this.setforvaule = [];
for (var a = {}, c = 3; c < s.count; c++) if (this.equiparr[c]) {
var r = this.equiparr[c].cfg.setid;
if (r) {
a[r] || (a[r] = {
count: 0,
arr: []
});
a[r].arr.push(this.equiparr[c].id);
a[r].count++;
}
}
this.setmap = a;
for (var l in a) {
var h = a[l].count, p = o[l].parmas;
for (c = 0; c < p.length; c++) h >= p[c].count && this.setforvaule.push(p[c]);
}
}
};
this.newgame = function() {
this.lv = 1;
this.resetbp();
this.equiparr[s.weapon1] = new n().initwithid(10101, 0, 4);
this.equiparr[s.weapon2] = new n().initwithid(10001, 0, 4);
this.equiparr[s.weapon3] = new n().initwithid(10201, 0, 4);
this.doequip(new n().initwithid(20601, 0, 1), s.crystal);
this.setnextexp();
};
this.resetbp = function() {
this.str = 10;
this.vit = 10;
this.agi = 10;
this.luk = 10;
this.int = 10;
this.dex = 10;
this.bppoint = (this.lv - 1) * (4 + 2 * this.zhuanshen) + 30;
cc.playerData.saveflag = !0;
};
this.setnextexp = function() {
this.maxexp = Math.pow(this.lv, 3);
};
this.gainexpv = function(t, e) {
cc.expadd && !e && (t *= 2);
this.exp += t;
for (var i = !1; this.exp >= this.maxexp; ) {
this.lv++;
this.bppoint += 4 + 2 * this.zhuanshen;
this.exp = this.exp - this.maxexp;
this.setnextexp();
i = !0;
}
cc.playerData.saveflag = !0;
return i;
};
this.gainexp = function(t) {
var e = 400;
cc.wujin && (e = 500 + 10 * cc.wujincount);
var i = Math.max(1, Math.floor(Math.pow(Math.min(e, t), 2) / 3));
return this.gainexpv(i);
};
this.jiaidan = function(t) {
for (var e = 0, i = 0; i < t.length; i++) e += t[i];
if (!(this.bppoint < e)) {
for (i = 0; i < t.length; i++) this[c[i + 1]] += t[i];
this.bppoint -= e;
cc.playerData.saveflag = !0;
}
};
this.downskill = function(t) {
for (var e = 0; e < this.skillarr.length; e++) if (this.skillarr[e] == t) {
this.skillarr[e] = 0;
break;
}
cc.playerData.saveflag = !0;
};
this.equipskill = function(t, e) {
for (var i = 0; i < this.skillarr.length; i++) if (this.skillarr[i] == t) return !1;
this.skillarr[e] = t;
cc.playerData.saveflag = !0;
return !0;
};
this.learnskill = function(t) {
for (var e = 0; e < this.lskillarr.length; e++) if (this.lskillarr[e] == t) return !1;
this.lskillarr.push(t);
cc.playerData.saveflag = !0;
return !0;
};
this.encode = function() {
var t = {};
t.lv = this.lv;
t.exp = this.exp;
t.str = this.str;
t.vit = this.vit;
t.agi = this.agi;
t.luk = this.luk;
t.int = this.int;
t.dex = this.dex;
t.bppoint = this.bppoint;
t.skillarr = this.skillarr;
t.lskillarr = this.lskillarr;
t.zhuanshen = this.zhuanshen;
t.equiparr = [];
for (var e = 0; e < this.equiparr.length; e++) this.equiparr[e] ? t.equiparr.push(this.equiparr[e].encode()) : t.equiparr.push(0);
return t;
};
this.initwithsave = function(t) {
this.zhuanshen = 0;
this.equiparr = [];
this.skillarr = [];
this.setmap = {};
this.lskillarr = [];
this.talentarr = [];
this.setforvaule = [];
for (var e = 0; e < s.count; e++) this.equiparr.push(null);
t.zhuanshen && (this.zhuanshen = t.zhuanshen);
this.lv = t.lv;
this.exp = t.exp;
this.str = t.str;
this.vit = t.vit;
this.agi = t.agi;
this.luk = t.luk;
this.int = t.int;
this.dex = t.dex;
this.bppoint = t.bppoint;
for (e = 0; e < t.skillarr.length; e++) this.skillarr.push(t.skillarr[e]);
for (e = 0; e < t.lskillarr.length; e++) this.lskillarr.push(t.lskillarr[e]);
for (e = 0; e < t.equiparr.length; e++) if (t.equiparr[e]) {
var i = new n().initwithsave(t.equiparr[e]);
i && this.doequip(i, e);
}
this.setnextexp();
return this;
};
this.test = function() {};
};
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
equipobj: "equipobj",
gameConfig: "gameConfig",
talentcfg: "talentcfg"
} ],
