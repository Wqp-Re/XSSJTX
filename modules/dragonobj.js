dragonobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "61818uFP6JP7ZnM9Hy1NpHv", "dragonobj");
var i = t("Utils");
e.exports = function() {
this.lerpv = function(t, e, i) {
return t + (e - t) * i;
};
this.init = function(t, e, s, n) {
this.prefab = "blackdragon";
this.objtype = 99;
this.randv = 200;
this.target = cc.v2(0, 0);
this.dir = cc.v2(e.dir.x, e.dir.y);
this.startdir = cc.v2(0, 1);
this.tardir = cc.v2(0, 1);
this.rotspeed = .7;
this.movespeed = 200;
this.time = 5;
this.time2 = 0;
this.skill = n;
this.user = e;
this.x = e.x;
this.y = e.y;
this.life = 10;
var a = s.getenemycamp(e), o = s.findnpcwithcmp(e, a, !0)[0];
if (o) {
this.dir.x = o.x - e.x;
this.dir.y = o.y - e.y;
}
this.dir = i.dirRotate(this.dir, t[2]);
this.dir.normalizeSelf();
this.atktime = 0;
this.posarr = [];
};
this.findtarget = function() {
var t = this.user.x - this.x - this.randv / 2 + i.randintSeed(this.randv), e = this.user.y - this.y - this.randv / 2 + i.randintSeed(this.randv);
this.tardir.x = t;
this.tardir.y = e;
this.tardir.normalizeSelf();
this.startdir.x = this.dir.x;
this.startdir.y = this.dir.y;
var s = this.dir.dot(this.tardir);
if (1 != s) {
var n = Math.acos(s);
this.rotspeed = 4 / n / Math.PI;
}
};
this.doatk = function() {
for (var t = this.posarr.length - 1; t >= 0; t--) this.user.gamelogic.createonebullet(this.skill, 19, this.posarr[t].x, this.posarr[t].y, this.dir, this.user);
};
this.update = function(t) {
this.life -= t;
if (this.life <= 0) {
this.user = null;
return !0;
}
this.atktime -= t;
if (this.atktime <= 0) {
this.posarr.push(cc.v2(this.x, this.y));
this.posarr.length > 10 && this.posarr.splice(0, 1);
this.doatk();
this.atktime = .3;
}
this.time += t;
this.time2 += t * this.rotspeed;
if (this.time >= 3) {
this.time = 0;
this.time2 = 0;
this.findtarget();
}
this.startdir.lerp(this.tardir, this.time2, this.dir);
this.dir.normalizeSelf();
var e = t * this.movespeed;
this.x = this.x + this.dir.x * e;
this.y = this.y + this.dir.y * e;
return !1;
};
};
cc._RF.pop();
}, {
Utils: "Utils"
} ],
