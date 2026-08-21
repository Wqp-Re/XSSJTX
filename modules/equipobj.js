equipobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "c740bVRwdhFQYkCH/gMNTj3", "equipobj");
var i = t("gameConfig").itemConfig, s = t("Utils"), n = t("enumcfg"), a = t("fumocfg"), o = t("talentcfg"), c = n.enumproperty, r = n.typename, l = {};
l[c.vit] = 1;
l[c.str] = 1;
l[c.int] = 1;
l[c.dex] = 1;
l[c.agi] = 1;
l[c.luk] = 1;
l[c.maxhp] = 30;
l[c.atk] = 10;
l[c.matk] = 10;
l[c.def] = 10;
l[c.mdef] = 10;
l[c.hit] = 2;
l[c.flee] = 2;
l[c.atkspeed] = 3;
l[c.cri] = 1;
l[c.cridmg] = 2;
l[c.xixue] = 1;
var h = [ 0, 0, 1, 2, 4, 6, 6, 6, 6 ], p = [ 0, 1, 1, 2, 2, 3, 3, 3, 3 ], d = [ 40, 40, 20, 10, 5 ], u = [ [ 16, 17, 18, 20, 21, 204, 203, 202, 201, 210, 211, 212, 213 ], [ 9, 10, 11, 12, 13, 38 ], [ 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 207, 208, 209 ] ], f = [ [ 16, 17, 18, 20, 21, 204, 203, 202, 201, 210, 211, 212, 213, 219, 225 ], [ 9, 10, 11, 12, 13, 38, 220, 226 ], [ 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 207, 208, 209, 221, 222, 223, 224, 227 ] ];
e.exports = function() {
this.initwithid = function(t, e, n) {
this.uuid = cc.playerData.uuid;
cc.playerData.uuid++;
this.cfg = i[t];
this.fumoid = 0;
cc.chengseadd && (d[4] = 10);
this.qulity = s.qz(d) + 1;
this.cfg.qulity && (this.qulity = Math.max(this.qulity, this.cfg.qulity));
n && (this.qulity = n);
this.id = t;
this.lv = e;
this.logiclv = this.cfg.logiclv;
this.cfg.fixproperty ? this.fixprocount = this.cfg.fixproperty.length : this.fixprocount = 0;
this.suoding = !1;
this.setproperty();
this.type = this.cfg.type;
this.settypename();
1 == this.type && this.setskill();
this.settalent();
return this;
};
this.settypename = function() {
this.cfg.subtype < 6 ? this.typename = r[this.type].name + "_" + r[this.type].sub[this.cfg.subtype] : this.typename = r[this.type].sub[this.cfg.subtype];
};
this.setskill = function(t) {
var e = null;
t && (e = this.skills[t]);
this.skills = [];
var i = 0;
if (this.cfg.fixskill) {
i = this.cfg.fixskill.length;
for (var n = 0; n < i; n++) this.skills.push([ this.cfg.fixskill[n], this.getsklllv() ]);
}
var a = this.cfg.subtype, o = u[a - 1];
this.logiclv > 4 && (o = f[a - 1]);
var c = p[this.qulity] - i + 1;
for (n = 0; n < c; n++) this.skills.push([ o[s.randintSeed(o.length)], this.getsklllv() ]);
e && (this.skills[t] = e);
};
this.getrandbili = function() {
return (20 * this.qulity + 30 + s.randintSeed(20)) / 100;
};
this.getsklllv = function() {
return 1;
};
this.dofumo = function(t) {
if (0 != t) {
this.fumoid = t;
this.fmcfg = a[t];
}
};
this.setproperty = function() {
this.property = [];
for (var t = 0; t < this.fixprocount; t++) {
var e = this.cfg.fixproperty[t], i = e[1] + e[2] * (this.lv + 2);
6 == this.qulity ? i *= 1.5 : 7 == this.qulity && (i *= 2);
i = Math.floor(i);
this.property.push([ e[0], i ]);
}
var n = h[this.qulity], a = [];
for (var o in l) a.push(Number(o));
for (t = 0; t < n; t++) {
var c = s.randintSeed(a.length), r = a[c], p = l[r] * this.logiclv;
p += s.randintSeed(p) * this.getrandbili();
p = Math.floor(p);
p = Math.max(p, 1);
this.property.push([ r, p ]);
this.qulity <= 6 && a.splice(c, 1);
}
};
this.setquilty = function(t) {
this.qulity = t;
for (var e = 0; e < this.property.length; e++) if (e < this.fixprocount) {
var i = this.cfg.fixproperty[e], s = i[1] + i[2] * (this.lv + 2);
6 == this.qulity ? s *= 1.5 : 7 == this.qulity && (s *= 2);
s = Math.floor(s);
this.property[e] = [ i[0], s ];
}
};
this.canjinhua = function() {
if (this.qulity < 5) return !1;
if (5 == this.qulity) {
var t = cc.playerData.finditembyid(30005);
return !!(t && t.count > 0);
}
if (6 == this.qulity) {
var e = cc.playerData.finditembyid(30006);
return !!(e && e.count > 0);
}
return !1;
};
this.dojinhua = function() {
return 5 == this.qulity ? this.toyuangu() : 6 == this.qulity && this.totaigu();
};
this.toyuangu = function() {
var t = cc.playerData.finditembyid(30005);
if (t && t.count > 0) {
this.setquilty(6);
cc.playerData.xiaohaoitembyid(30005, 1);
return !0;
}
return !1;
};
this.totaigu = function() {
var t = cc.playerData.finditembyid(30006);
if (t && t.count > 0) {
this.setquilty(7);
cc.playerData.xiaohaoitembyid(30006, 1);
return !0;
}
return !1;
};
this.xilian = function() {
var t = cc.playerData.finditembyid(30002);
if (t && t.count > 0) {
this.setproperty();
cc.playerData.xiaohaoitembyid(30002, 1);
return !0;
}
return !1;
};
this.xiskill = function(t) {
var e = cc.playerData.finditembyid(30004);
if (e && e.count > 0) {
this.setskill(t);
cc.playerData.xiaohaoitembyid(30004, 1);
return !0;
}
return !1;
};
this.refreshfix = function() {
for (var t = 0; t < this.fixprocount; t++) {
var e = this.cfg.fixproperty[t], i = e[1] + e[2] * (this.lv + 2);
6 == this.qulity ? i *= 1.5 : 7 == this.qulity && (i *= 2);
i = Math.floor(i);
this.property[t] = [ e[0], i ];
}
};
this.lvup = function() {
if (this.lv >= cc.playerData.player.lv) return 1;
var t = this.getqhcost();
if (!(cc.playerData.gold >= t)) return 2;
cc.playerData.changegold(-t);
this.lv++;
this.refreshfix();
return 0;
};
this.getqhcost = function() {
return 50 * this.logiclv * (this.lv + 1);
};
this.getsellprize = function() {
return Math.floor(this.getqhcost() * this.lv / 2);
};
this.huishou = function(t) {
var e = this.getsellprize() * t;
this.lv = 0;
this.refreshfix();
cc.playerData.changegold(e);
};
this.settalent = function() {
var t = this.cfg;
this.plusdes = null;
if (t.talent) {
var e = o[t.talent];
this.plusdes = e.des;
this.talentarr2 = [ e ];
}
};
this.initwithsave = function(t) {
this.uuid = t.uuid;
this.id = t.id;
this.qulity = t.qulity;
this.fumoid = t.fumoid;
this.lv = t.lv;
this.suoding = t.suoding;
null == this.suoding && (this.suoding = !1);
this.cfg = i[this.id];
if (!this.cfg) return null;
this.logiclv = this.cfg.logiclv;
this.cfg.fixproperty ? this.fixprocount = this.cfg.fixproperty.length : this.fixprocount = 0;
this.type = this.cfg.type;
this.settypename();
this.property = [];
for (var e = 0; e < t.property.length; e++) {
var s = t.property[e];
this.property.push([ s[0], s[1] ]);
}
if (t.skills) {
this.skills = [];
for (e = 0; e < t.skills.length; e++) this.skills.push([ t.skills[e], 1 ]);
}
this.dofumo(this.fumoid);
this.refreshfix();
this.settalent();
return this;
};
this.encode = function() {
var t = {};
t.uuid = this.uuid;
t.id = this.id;
t.qulity = this.qulity;
t.fumoid = this.fumoid;
t.lv = this.lv;
t.property = this.property;
t.suoding = this.suoding;
if (this.skills) {
t.skills = [];
for (var e = 0; e < this.skills.length; e++) t.skills.push(this.skills[e][0]);
}
return t;
};
this.dosuoding = function() {
this.suoding = !this.suoding;
};
};
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
fumocfg: "fumocfg",
gameConfig: "gameConfig",
talentcfg: "talentcfg"
} ],
