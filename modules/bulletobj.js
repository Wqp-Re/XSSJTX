bulletobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "e77f9zBy7JCHKaYNWRQlLiU", "bulletobj");
var i = t("Utils"), s = t("bulletcfg");
e.exports = function() {
this.init = function(t, e, i, n, a, o) {
var c;
c = s[e];
this.objtype = 3;
this.life = c.life;
this.type = c.type;
this.speed = c.speed;
this.isfollow = c.isfollow;
c.buffspeed0 && o.hasbuff(c.buffspeed0) && (this.speed = 0);
this.hitbullet = c.hitbullet;
this.atkbullet = c.atkbullet;
this.width = c.width;
this.height = c.height;
this.rotspeed = c.rotspeed;
this.user = o;
this.camp = o.camp;
this.gamelogic = o.gamelogic;
this.enemycamp = this.gamelogic.getenemycamp(o);
this.tardir = cc.v2();
this.flowuser = c.flowuser;
this.rotateuser = c.rotateuser;
this.skill = t;
this.dir = a;
0 == this.dir.x && 0 == this.dir.y && (this.dir.y = 1);
this.chufamode = c.chufamode;
if (this.flowuser) {
this.startx = i - o.x;
this.starty = n - o.y;
}
this.x = i;
this.y = n;
this.timetoatk = 0;
c.sleeptime && (this.timetoatk = c.sleeptime);
this.movedelay = 0;
c.movedelay && (this.movedelay = c.movedelay);
if (c.notdestroy) {
this.atktime = c.atktime;
this.notdestroy = !0;
} else {
this.atktime = 0;
this.notdestroy = !1;
}
this.skiphittest = c.skiphittest;
this.alive = !0;
this.cfg = c;
this.dir2 = cc.v2(0, 1);
this.ag2 = 0;
c.autodir2 && (this.autodir2 = c.autodir2);
if (4 == this.cfg.type) {
this.tscount = this.skill.tscount;
this.lastpos = this.user;
this.tsarr = this.gamelogic.findnpcwithcmp(this, this.enemycamp, !0);
}
};
this.chanagerot = function(t) {
if (this.followtarget) {
var e = this.followtarget.x - this.x, i = this.followtarget.y - this.y;
this.tardir.x = e;
this.tardir.y = i;
this.tardir.normalizeSelf();
this.dir = this.dir.lerp(this.tardir, t * this.rotspeed);
this.dir.normalizeSelf();
}
};
this.checkhit = function() {
if (4 == this.cfg.type) {
if (this.tscount > 0) {
this.tscount--;
for (;this.tsarr.length > 0; ) {
var t = this.tsarr[0];
this.tsarr.splice(0, 1);
if (!t.isdead()) {
t.dohurt(this.user, this.skill);
this.nowline = {
p1: {
x: this.lastpos.x,
y: this.lastpos.y
},
p2: {
x: t.x,
y: t.y
}
};
this.lastpos = t;
break;
}
}
}
return !1;
}
if (this.skiphittest) return !1;
var e = this.gamelogic.findnpcwithcmp(this, this.enemycamp, !1);
this.targetarr = e;
var s = !1, n = null;
2 == this.type && (n = {
x: this.x,
y: this.y,
width: this.height,
height: this.width,
angle: i.getanglebydirhudu(this.dir)
});
var a = null;
if (3 != this.type) {
for (var o = this.targetarr.length - 1; o >= 0; o--) if (!this.targetarr[o].isdead() && (1 == this.type ? i.hitTestCircle(this, this.targetarr[o]) : i.checkobb(n, this.targetarr[o]))) {
s = !0;
this.chufamode || this.targetarr[o].dohurt(this.user, this.skill, {
x: this.x,
y: this.y
});
a = this.targetarr[o];
if (!this.notdestroy) break;
}
} else if (this.hittar) {
s = !0;
a = this.hittar;
this.hittar.dohurt(this.user, this.skill, {
x: this.x,
y: this.y
});
}
s && this.hitbullet && this.user.gamelogic.createbulletsground(this.skill, [ [ this.hitbullet, 0, 0 ] ], this.user, a);
return s;
};
this.getwarning2 = function() {
return {
width: this.cfg.warning2size,
height: this.cfg.warning2size,
x: this.x + this.dir.x * this.life * this.speed,
y: this.y + this.dir.y * this.life * this.speed
};
};
this.update = function(t) {
var e = !0;
if ((this.life -= t) && this.life <= 0) {
e = !1;
this.cfg.lifebullet && this.user.gamelogic.createbulletsground(this.skill, [ [ this.cfg.lifebullet, 0, 0 ] ], this.user, {
x: this.x,
y: this.y
});
}
if (e) {
var s = this.speed * t;
this.movedelay -= t;
if (this.movedelay <= 0) {
if (this.isfollow) {
if (!this.followtarget) {
var n = this.gamelogic.findnpcwithcmp(this, this.enemycamp, !1);
n.length > 0 && (this.followtarget = n[i.randintSeed(n.length)]);
}
this.followtarget && this.followtarget.isdead() ? this.followtarget = null : this.chanagerot(t);
}
if (this.flowuser) {
this.x = this.user.x + this.startx;
this.y = this.user.y + this.starty;
} else {
this.x = this.x + this.dir.x * s;
this.y = this.y + this.dir.y * s;
}
}
this.cfg.dirspeed && (this.dir = i.dirRotate(this.dir, this.cfg.dirspeed * t));
if (this.rotateuser) {
this.dir = this.user.dir;
this.x = this.x + this.dir.x * this.rotateuser;
this.y = this.y + this.dir.y * this.rotateuser;
}
this.autodir2 && (this.ag2 += t * this.autodir2);
this.timetoatk -= t;
if (this.timetoatk <= 0) {
this.timetoatk = this.atktime;
if (this.atkbullet) {
this.autodir2 && (this.dir2 = i.getdirbyag(this.ag2));
cc.battlelogic.createonebullet(this.skill, this.atkbullet, this.x, this.y, this.dir2, this.user);
}
var a = this.checkhit();
a && 0 == this.notdestroy && (e = !1);
a && this.cfg.hitres && cc.battlelogic.createeff({
eff: this.cfg.hitres,
x: this.x + this.dir.x * this.width / 2,
y: this.y + this.dir.y * this.width / 2
});
}
}
this.alive = e;
return !e;
};
};
cc._RF.pop();
}, {
Utils: "Utils",
bulletcfg: "bulletcfg"
} ],
