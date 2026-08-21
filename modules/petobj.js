petobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "1c01dD8ivhBKateporBNilf", "petobj");
var i = t("monstercfg"), s = t("talentcfg"), n = t("Utils");
e.exports = function() {
this.initwithid = function(t, e, s) {
this.uuid = cc.playerData.uuid;
cc.playerData.uuid++;
this.id = t;
this.lv = 1;
this.exp = 0;
this.cfg = i[t];
this.skills = [ 1 ];
this.isboss = e;
this.lighting = s;
this.zhuanshen = 0;
this.setname();
this.setbp();
this.setnextexp();
this.initcommon();
};
this.initcommon = function() {
this.talentarr = [];
if (this.cfg.talent) for (var t = 0; t < this.cfg.talent.length; t++) {
var e = s[this.cfg.talent[t]];
this.talentarr.push(e);
}
};
this.fixlv = function(t) {
this.lv = t;
this.exp = 0;
this.setnextexp();
};
this.getqhcost = function() {
return 500 * this.lv;
};
this.lvup = function() {
var t = this.getqhcost();
if (!(cc.playerData.gold >= t)) return 2;
cc.playerData.changegold(-t);
this.lv++;
this.exp = 0;
this.setnextexp();
return 0;
};
this.xilian = function() {
var t = cc.playerData.finditembyid(30003);
if (t && t.count > 0) {
this.setbp();
cc.playerData.xiaohaoitembyid(30003, 1);
return !0;
}
return !1;
};
this.setbp = function() {
this.bp = [];
var t = this.cfg.bp, e = 0, i = 2;
if (this.isboss) {
e += 2;
i += 1;
}
if (this.lighting) {
e += 1;
i += 1;
}
for (var s = 0; s < 6; s++) this.bp.push(t[s] + e + i * this.zhuanshen - n.randintSeed(5));
};
this.caldiaodang = function() {
this.diaodangarr = [];
for (var t = this.cfg.bp, e = this.isboss ? 2 : 0, i = 0; i < 6; i++) this.diaodangarr.push(t[i] + e - this.bp[i]);
};
this.setnextexp = function() {
this.maxexp = Math.pow(this.lv, 3);
};
this.gainexp = function(t) {
var e = 400;
cc.wujin && (e = 500 + 10 * cc.wujincount);
var i = Math.max(1, Math.floor(Math.pow(Math.min(e, t), 2) / 3));
cc.expadd && (i *= 2);
var s = (cc.playerData.player.lv - this.lv) / 10 + 1;
i *= s = Math.max(1, Math.min(s, 3));
return this.gainexpv(i);
};
this.learnskill = function(t, e) {
if (e && cc.playerData.gold < e) return 1;
if (this.skills.length < 6) {
this.skills.push(t);
e && cc.playerData.changegold(-e);
return 0;
}
return 2;
};
this.forgetskill = function(t) {
for (var e = [], i = t, s = 0; s < this.skills.length; s++) this.skills[s] != i ? e.push(this.skills[s]) : i = -1;
this.skills = e;
};
this.setname = function() {
this.name = this.cfg.name;
this.isboss && (this.name = this.name + "首领");
};
this.initwithsave = function(t) {
this.id = t.id;
this.lv = t.lv;
this.exp = t.exp;
this.uuid = t.uuid;
this.isboss = t.isboss;
this.lighting = t.lighting;
this.zhuanshen = 0;
this.exp < 0 && (this.exp = 0);
t.zhuanshen && (this.zhuanshen = t.zhuanshen);
this.cfg = i[this.id];
this.bp = [];
this.skills = [];
for (var e = 0; e < 6; e++) this.bp.push(t.bp[e]);
for (e = 0; e < t.skills.length; e++) this.skills.push(t.skills[e]);
this.setname();
this.setnextexp();
this.initcommon();
return this;
};
this.encode = function() {
var t = {};
t.id = this.id;
t.lv = this.lv;
t.exp = this.exp;
t.uuid = this.uuid;
t.isboss = this.isboss;
t.lighting = this.lighting;
t.bp = this.bp;
t.skills = this.skills;
t.zhuanshen = this.zhuanshen;
return t;
};
this.gainexpv = function(t) {
this.exp += t;
for (var e = !1; this.exp >= this.maxexp; ) {
this.lv++;
this.exp = this.exp - this.maxexp;
this.setnextexp();
e = !0;
}
return e;
};
this.canzhuanshen = function() {
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
for (var s = 0; s < this.bp.length; s++) {
this.bp[s] += 2;
this.isboss && (this.bp[s] += 1);
this.lighting && (this.bp[s] += 1);
}
cc.playerData.saveflag = !0;
return !0;
};
};
cc._RF.pop();
}, {
Utils: "Utils",
monstercfg: "monstercfg",
talentcfg: "talentcfg"
} ],
