avatar: [ function(t, e) {
"use strict";
cc._RF.push(e, "0a9ae5mTRZA9rT4jY8byYGs", "avatar");
var i = t("Utils"), s = t("avatarcfg"), n = s.manpartcount, a = s.womanpartcount, o = s.colorTB, c = [ "setfronthair", "setrearhair", "setclothing", "setface", "setear", "setwing", "settail", "setcloak", "setbeastear", "setglass", "setacc1", "setacc2", "setbreard", "sethcolor" ];
cc.Class({
extends: cc.Component,
properties: {
sp_cloakback: {
default: null,
type: cc.Sprite
},
sp_fronthairhback: {
default: null,
type: cc.Sprite
},
sp_wingback: {
default: null,
type: cc.Sprite
},
sp_tailback: {
default: null,
type: cc.Sprite
},
sp_body: {
default: null,
type: cc.Sprite
},
sp_rearhair: {
default: null,
type: cc.Sprite
},
sp_ear: {
default: null,
type: cc.Sprite
},
sp_face: {
default: null,
type: cc.Sprite
},
sp_clothing: {
default: null,
type: cc.Sprite
},
sp_breard: {
default: null,
type: cc.Sprite
},
sp_beastear: {
default: null,
type: cc.Sprite
},
sp_glass: {
default: null,
type: cc.Sprite
},
sp_acc1: {
default: null,
type: cc.Sprite
},
sp_acc2: {
default: null,
type: cc.Sprite
},
sp_fronthairhup: {
default: null,
type: cc.Sprite
},
sp_wingup: {
default: null,
type: cc.Sprite
},
sp_tailup: {
default: null,
type: cc.Sprite
},
sp_cloakup: {
default: null,
type: cc.Sprite
},
sp_rearhairup: {
default: null,
type: cc.Sprite
}
},
start: function() {},
num0: function(t) {
return t < 10 ? "0" + t : t;
},
initcommon: function(t, e) {
this.ismale = t;
this.partcount = 0;
this.setsex(t);
this.setbody();
this.partarr = [];
for (var i = 0; i < 14; i++) this.partarr.push(e[i]);
this.setallpart(this.partarr);
},
initdata: function(t) {
this.ismale = t;
this.partcount = 0;
this.partarr = [];
for (var e = 0; e < 14; e++) this.partarr.push(0);
this.partarr[0] = this.partarr[1] = this.partarr[2] = 1;
this.setsex(t);
this.setbody();
this.setallpart(this.partarr);
return this.partarr;
},
refreshpart: function(t, e) {
this.partarr[t] = e;
this[c[t]](e);
},
randpart: function() {
var t = this.partarr;
t[0] = i.randintSeed(this.countcfg.fronthair + 1);
t[1] = i.randintSeed(this.countcfg.rearhair + 1);
t[2] = i.randintSeed(this.countcfg.clothing + 1);
t[3] = i.randintSeed(this.countcfg.face + 1);
t[4] = i.randintSeed(this.countcfg.ear + 1);
t[5] = i.randintSeed(this.countcfg.wing + 1);
t[6] = i.randintSeed(this.countcfg.tail + 1);
t[7] = i.randintSeed(this.countcfg.cloak + 1);
t[8] = i.randintSeed(this.countcfg.beastear + 1);
t[9] = i.randintSeed(this.countcfg.glass + 1);
t[10] = i.randintSeed(this.countcfg.acc1 + 1);
t[11] = i.randintSeed(this.countcfg.acc2 + 1);
t[12] = i.randintSeed(this.countcfg.beard);
t[13] = i.randintSeed(o.length);
this.setallpart(t);
return t;
},
setsex: function(t) {
var e = "";
if (t) {
e = "avatar/Male/";
this.countcfg = n;
} else {
e = "avatar/Female/";
this.countcfg = a;
}
this.dir = e;
},
setframe: function(t, e, i) {
var s = this;
i.spriteFrame = null;
if ("00" != e) {
s.partcount++;
cc.resources.load(this.dir + t + e, cc.SpriteFrame, function(t, e) {
t || (i.spriteFrame = e);
s.partcount--;
0 == s.partcount && cc.Notifier.emit("avatarfinish");
});
} else 0 == s.partcount && cc.Notifier.emit("avatarfinish");
},
setbody: function() {
this.setframe("TV_Body_p", "01", this.sp_body);
},
sethcolor: function(t) {
this.haircolor = o[t];
this.sp_rearhair.node.color = this.haircolor;
this.sp_rearhairup.node.color = this.haircolor;
this.sp_breard.node.color = this.haircolor;
this.sp_fronthairhback.node.color = this.haircolor;
this.sp_fronthairhup.node.color = this.haircolor;
0 == this.partcount && cc.Notifier.emit("avatarfinish");
},
setallpart: function(t) {
this.sethcolor(t[13]);
this.setfronthair(t[0]);
this.setrearhair(t[1]);
this.setclothing(t[2]);
this.setface(t[3]);
this.setear(t[4]);
this.setwing(t[5]);
this.settail(t[6]);
this.setcloak(t[7]);
this.setbeastear(t[8]);
this.setglass(t[9]);
this.setacc1(t[10]);
this.setacc2(t[11]);
this.setbreard(t[12]);
},
setfronthair: function(t) {
this.setframe("TV_FrontHair2_p", this.num0(t), this.sp_fronthairhback);
this.setframe("TV_FrontHair1_p", this.num0(t), this.sp_fronthairhup);
},
setrearhair: function(t) {
this.setframe("TV_RearHair2_p", this.num0(t), this.sp_rearhair);
this.setframe("TV_RearHair1_p", this.num0(t), this.sp_rearhairup);
},
setcloak: function(t) {
this.setframe("TV_Cloak2_p", this.num0(t), this.sp_cloakback);
this.setframe("TV_Cloak1_p", this.num0(t), this.sp_cloakup);
},
setwing: function(t) {
this.setframe("TV_Wing2_p", this.num0(t), this.sp_wingback);
this.setframe("TV_Wing1_p", this.num0(t), this.sp_wingup);
},
settail: function(t) {
this.setframe("TV_Tail2_p", this.num0(t), this.sp_tailback);
this.setframe("TV_Tail1_p", this.num0(t), this.sp_tailup);
},
setear: function(t) {
this.setframe("TV_Ears_p", this.num0(t), this.sp_ear);
},
setface: function(t) {
this.setframe("TV_FacialMark_p", this.num0(t), this.sp_face);
},
setclothing: function(t) {
this.setframe(this.ismale ? "TV_Clothing2_p" : "TV_Clothing1_p", this.num0(t), this.sp_clothing);
},
setbreard: function(t) {
this.setframe("TV_Beard1_p", this.num0(t), this.sp_breard);
},
setbeastear: function(t) {
this.setframe("TV_BeastEars_p", this.num0(t), this.sp_beastear);
},
setglass: function(t) {
this.setframe("TV_Glasses_p", this.num0(t), this.sp_glass);
},
setacc1: function(t) {
this.setframe("TV_AccA_p", this.num0(t), this.sp_acc1);
},
setacc2: function(t) {
this.setframe("TV_AccB_p", this.num0(t), this.sp_acc2);
}
});
cc._RF.pop();
}, {
Utils: "Utils",
avatarcfg: "avatarcfg"
} ],
