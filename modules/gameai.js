gameai: [ function(t, e) {
"use strict";
cc._RF.push(e, "a56feWDdS9LeJlgdcED9N60", "gameai");
var i = t("Utils"), s = {
Delay: 1,
AtkOrIdle: 2,
UseSkill: 3,
RunAway: 4,
WaitForHurt: 5,
Follow: 6,
MoveToTarget: 7
}, n = {
22: {
"0_100": [ {
tp: s.MoveToTarget,
atkdis: 200,
condition: {
tp: 1,
dis: 140
}
}, {
tp: s.UseSkill,
condition: {
tp: 5
}
}, {
tp: s.Follow,
condition: {
tp: 6
}
} ]
},
12: {
"0_100": [ {
tp: s.WaitForHurt,
v: 1,
isonce: !0
}, {
tp: s.AtkOrIdle,
atkdis: 30,
atkview: 140,
giveupview: 140
}, {
tp: s.UseSkill
} ]
},
5: {
"0_100": [ {
tp: s.WaitForHurt,
v: 1
}, {
tp: s.RunAway,
v: 200
} ]
},
1: {
"0_100": [ {
tp: s.AtkOrIdle,
atkdis: 40,
atkview: 140,
giveupview: 999
}, {
tp: s.UseSkill
} ]
},
2: {
"0_100": [ {
tp: s.WaitForHurt,
v: 1,
isonce: !0
}, {
tp: s.AtkOrIdle,
atkdis: 40,
atkview: 140,
giveupview: 999
}, {
tp: s.UseSkill
} ]
},
3: {
"0_100": [ {
tp: s.AtkOrIdle,
atkdis: 140,
atkview: 150,
giveupview: 200
}, {
tp: s.UseSkill
} ]
},
4: {
"0_100": [ {
tp: s.WaitForHurt,
v: 1,
isonce: !0
}, {
tp: s.AtkOrIdle,
atkdis: 140,
atkview: 150,
giveupview: 200
}, {
tp: s.UseSkill
} ]
},
10: {
"0_100": [ {
tp: s.Delay,
v: 1,
isonce: !0
}, {
tp: s.AtkOrIdle,
atkdis: 230,
atkview: 250,
giveupview: 999
}, {
tp: s.UseSkill
} ]
},
11: {
"0_100": [ {
tp: s.CloseAndUseSkill
} ]
}
};
e.exports = function() {
this.init = function(t, e) {
var i, a;
this.owner = e;
this.area = e.view;
this.gamelogic = e.gamelogic;
this.enemycamp = this.gamelogic.getenemycamp(e);
this.target = null;
this.aicfgkey = [];
this.aicfg = n[t];
for (var o in this.aicfg) this.aicfgkey.push(o);
this.nowmin = 999;
this.nowmax = -999;
this.aiidx = 0;
this.aiready = !1;
this.AIFTB = ((i = {})[s.AtkOrIdle] = this.AIAtkOrIdle.bind(this), i[s.UseSkill] = this.AIUseSkill.bind(this), 
i[s.RunAway] = this.AIRunAway.bind(this), i[s.Delay] = this.AIDelay.bind(this), 
i[s.WaitForHurt] = this.AIWaitForHurt.bind(this), i[s.Follow] = this.AIFollow.bind(this), 
i[s.MoveToTarget] = this.AIMoveToTarget.bind(this), i[s.CloseAndUseSkill] = this.AICloseAndUseSkill.bind(this), 
i);
this.ConditionTB = ((a = {})[1] = this.AIChasenemy.bind(this), a[3] = this.AICplayerdis.bind(this), 
a[2] = this.AIChpbetween.bind(this), a[5] = this.AICsame.bind(this), a[6] = this.AICdifference.bind(this), 
a[7] = this.AIChasfriend.bind(this), a);
};
this.AIChasenemy = function() {
return this.gamelogic.findnpcwithcmp(this.owner, this.enemycamp).length > 0;
};
this.AICplayerdis = function(t) {
i.getdistancenosqrt(cc.battlelogic.player, this.owner), t.dis, t.dis;
};
this.AIChpbetween = function() {};
this.AICsame = function() {
return this.lastpanduan;
};
this.AICdifference = function() {
return !this.lastpanduan;
};
this.AIChasfriend = function() {
return this.gamelogic.findnpcwithcmp(this.owner, this.owner.camp).length > 0;
};
this.checkhp = function() {
if (this.oldhp != this.owner.hp) {
this.oldhp = this.owner.hp;
var t = this.owner.gethp100();
if (t <= this.nowmax && t >= this.nowmin) return !1;
for (var e = 0; e < this.aicfgkey.length; e++) {
var i = this.aicfgkey[e].split("_");
if (t <= Number(i[1]) && t > Number(i[0])) {
this.ai = this.aicfg[this.aicfgkey[e]];
this.nowmin = Number(i[0]);
this.nowmax = Number(i[1]);
this.aiidx = 0;
this.oncemap = {};
this.aiready = !0;
return !0;
}
}
}
};
this.AIWaitForHurt = function(t, e) {
if (e) {
this.savehp = this.owner.hp;
this.aitime = 0;
} else if (cc.shenyuan || cc.hell || cc.wujin) this.aiready = !0; else if (this.savehp == this.owner.hp) {
this.aitime += t;
if (this.aitime > 3) {
this.aitime = 0;
if (i.randintSeed(100) > 70) {
this.owner.dir.x = -50 + i.randintSeed(100);
this.owner.dir.y = -50 + i.randintSeed(100);
this.owner.dir.normalizeSelf();
this.owner.clickingmoveing = !0;
this.aitime = 2.5;
} else this.owner.clickingmoveing = !1;
}
} else {
this.target = this.owner.chouren;
this.owner.clickingmoveing = !1;
this.aiready = !0;
}
};
this.AIFollow = function(t, e) {
var i = cc.battlelogic.player.x - this.owner.x, s = cc.battlelogic.player.y - this.owner.y;
if (e) {
this.owner.dir.x = i;
this.owner.dir.y = s;
this.aitime = .5;
this.owner.dir.normalizeSelf();
this.owner.clickingmoveing = !0;
} else {
Math.abs(i) < 30 && Math.abs(s) < 30 ? this.owner.clickingmoveing = !1 : this.owner.clickingmoveing = !0;
this.aitime -= t;
if (this.aitime <= 0) {
this.aiready = !0;
this.owner.clickingmoveing = !1;
}
}
};
this.AIRunAway = function(t, e) {
if (e) {
this.closev = this.nowaicfg.v * this.nowaicfg.v;
this.aitime = 0;
} else {
this.aitime -= t;
if (this.aitime <= 0) {
this.aitime = .1;
this.target && !this.target.isdead() || (this.target = this.gamelogic.findnpcwithcmp(this.owner, this.enemycamp, !0)[0]);
if (!this.target) {
this.aiready = !0;
this.owner.clickingmoveing = !1;
return;
}
if ((i = Math.abs(this.owner.x - this.target.x)) * i + (s = Math.abs(this.owner.y - this.target.y)) * s > this.closev) {
this.target = null;
this.aiready = !0;
this.owner.clickingmoveing = !1;
return;
}
this.owner.clickingmoveing = !0;
this.owner.dir.x = this.owner.x - this.target.x;
this.owner.dir.y = this.owner.y - this.target.y;
this.owner.dir.normalizeSelf();
}
if (this.target) {
var i, s;
if ((i = Math.abs(this.owner.x - this.target.x)) * i + (s = Math.abs(this.owner.y - this.target.y)) * s > this.closev) {
this.target = null;
this.aiready = !0;
this.owner.clickingmoveing = !1;
}
}
}
};
this.AIMoveToTarget = function(t, e) {
if (e) {
this.closev = this.nowaicfg.atkdis * this.nowaicfg.atkdis;
this.target = this.gamelogic.findnpcwithcmp(this.owner, this.enemycamp, !0)[0];
this.owner.clickingmoveing = !0;
} else if (this.target.isdead()) {
this.aiready = !0;
this.owner.clickingmoveing = !1;
} else {
var i = this.target.x - this.owner.x, s = this.target.y - this.owner.y;
this.owner.dir.x = i - this.owner.offx;
this.owner.dir.y = s - this.owner.offy;
this.owner.dir.normalizeSelf();
if (i * i + s * s < this.closev) {
this.target = null;
this.aiready = !0;
this.owner.clickingmoveing = !1;
}
}
};
this.AICloseAndUseSkill = function(t, e) {
if (e) {
this.aitime = 0;
this.target = null;
this.closev = 1600;
} else {
if (this.target && this.target.isdead()) {
this.owner.clickingmoveing = !1;
this.target = null;
}
if (this.target) {
var i = Math.abs(this.owner.x - this.target.x), s = Math.abs(this.owner.y - this.target.y);
i * i + s * s < this.closev ? this.owner.clickingmoveing = !1 : this.owner.clickingmoveing = !0;
this.owner.clickskill(this.owner.randskllidx());
} else {
this.target = this.gamelogic.findnpcwithcmp(this.owner, this.enemycamp, !0)[0];
if (this.target) {
this.owner.clickingmoveing = !0;
this.owner.dir.x = this.target.x - this.owner.x - this.owner.offx;
this.owner.dir.y = this.target.y - this.owner.y - this.owner.offy;
this.owner.dir.normalizeSelf();
}
}
this.aitime += t;
if (this.aitime > .3) {
this.owner.clickingmoveing = !1;
this.target = null;
this.aitime = 0;
}
}
};
this.AIAtkOrIdle = function(t, e) {
if (e) {
this.closev = this.nowaicfg.atkdis * this.nowaicfg.atkdis;
this.atkview = this.nowaicfg.atkview * this.nowaicfg.atkview;
this.giveupview = this.nowaicfg.giveupview * this.nowaicfg.giveupview;
this.aitime = 0;
this.aitime2 = 0;
this.savehp = this.owner.hp;
} else if (!(this.owner.yctime > 0)) {
var s = !1;
if (this.savehp != this.owner.hp) {
this.savehp = this.owner.hp;
s = !0;
this.aitime = 0;
}
if (!this.target) {
this.aitime2 += t;
if (this.aitime2 > 3) {
this.aitime2 = 0;
if (i.randintSeed(100) > 70) {
this.owner.dir.x = -50 + i.randintSeed(100);
this.owner.dir.y = -50 + i.randintSeed(100);
this.owner.dir.normalizeSelf();
this.owner.clickingmoveing = !0;
this.aitime2 = 2.5;
} else this.owner.clickingmoveing = !1;
}
}
this.aitime -= t;
if (this.aitime <= 0) {
this.aitime = .1;
var n = this.giveupview;
if (!this.target || this.target.isdead()) {
this.target = this.gamelogic.findnpcwithcmp(this.owner, this.enemycamp, !0)[0];
n = this.atkview;
}
s && (n = 99999999);
if (this.target) {
if ((c = (a = Math.abs(this.owner.x - this.target.x)) * a + (o = Math.abs(this.owner.y - this.target.y)) * o) > n) {
this.target = null;
return;
}
if (c < this.closev) {
this.target = null;
this.aiready = !0;
this.owner.clickingmoveing = !1;
return;
}
this.owner.clickingmoveing = !0;
this.owner.dir.x = this.target.x - this.owner.x - this.owner.offx;
this.owner.dir.y = this.target.y - this.owner.y - this.owner.offy;
this.owner.dir.normalizeSelf();
}
}
if (this.target) {
var a, o, c;
if ((c = (a = Math.abs(this.owner.x - this.target.x)) * a + (o = Math.abs(this.owner.y - this.target.y)) * o) < this.closev) {
this.target = null;
this.aiready = !0;
this.owner.clickingmoveing = !1;
}
}
}
};
this.AIDelay = function(t, e) {
if (e) this.aitime = this.nowaicfg.v; else {
this.aitime -= t;
this.aitime <= 0 && (this.aiready = !0);
}
};
this.AIUseSkill = function(t, e) {
if (!(e || this.owner.yctime > 0)) {
this.owner.clickskill(this.owner.randskllidx());
this.aiready = !0;
}
};
this.update = function(t) {
if (!this.owner.yingzhi && !this.owner.isdead()) {
this.checkhp();
if (this.aiready) {
this.aiready = !1;
this.nowaicfg = this.ai[this.aiidx];
var e = !0;
if (this.nowaicfg.condition) {
e = this.ConditionTB[this.nowaicfg.condition.tp](this.nowaicfg.condition);
this.lastpanduan = e;
}
if (this.nowaicfg.isonce) {
if (this.oncemap[this.aiidx]) {
this.aiready = !0;
this.aiidx++;
this.aiidx %= this.ai.length;
return;
}
e && (this.oncemap[this.aiidx] = !0);
}
if (e) {
this.nowfun = this.AIFTB[this.nowaicfg.tp];
this.nowfun(0, !0);
} else {
this.aiready = !0;
this.nowfun = null;
}
this.aiidx++;
this.aiidx %= this.ai.length;
}
this.nowfun && this.nowfun(t);
}
};
this.reset = function() {
this.aiidx = 0;
this.aiready = !0;
this.oncemap = {};
};
};
cc._RF.pop();
}, {
Utils: "Utils"
} ],
