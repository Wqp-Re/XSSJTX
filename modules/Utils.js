Utils: [ function(t, e) {
"use strict";
cc._RF.push(e, "daefdxxdapI0KzTlk5MfR+g", "Utils");
var i = 0, s = 0, n = 0, a = 0, o = 0, c = 0, r = 0, l = 0, h = 0, p = 0, d = 0, u = 0, f = 0, g = 0, y = [ new cc.Color(240, 255, 255), new cc.Color(220, 255, 255), new cc.Color(200, 255, 255), new cc.Color(180, 255, 255), new cc.Color(160, 255, 255), new cc.Color(140, 255, 255), new cc.Color(120, 255, 255), new cc.Color(20, 255, 255) ], m = t("gameConfig").itemConfig, b = t("monstercfg");
cc.director._kSpeed = 1;
var v = cc.Director.prototype.calculateDeltaTime;
cc.director.calculateDeltaTime = function(t) {
v.call(this, t);
this._deltaTime *= this._kSpeed;
};
cc.kSpeed = function(t) {
cc.director._kSpeed = t;
};
cc.kGetSpeed = function() {
return cc.director._kSpeed;
};
var k = function(t, e, i, s, n) {
this.centerPoint = cc.v2(t, e);
this.extents = [ i / 2, s / 2 ];
this.axes = [ cc.v2(Math.cos(n), Math.sin(n)), cc.v2(-1 * Math.sin(n), Math.cos(n)) ];
this._width = i;
this._height = s;
this._rotation = n;
this.getProjectionRadius = function(t) {
return this.extents[0] * Math.abs(t.dot(this.axes[0])) + this.extents[1] * Math.abs(t.dot(this.axes[1]));
};
};
cc.tree = function(t) {
var e = t || 0, i = function t(i) {
var s = "color: " + (null === i.parent || i.activeInHierarchy ? "green" : "grey") + "; font-size: 14px;font-weight:bold", n = "color: black; background: lightgrey;margin-left: 5px;border-radius:3px;padding: 0 3px;font-size: 10px;font-weight:bold", a = "color: orange; background: black;margin-left: 5px;border-radius:3px;padding:0 3px;fonrt-size: 10px;font-weight:bold;", o = "%c" + i.name, c = "%c" + i.x.toFixed(0) + "," + i.y.toFixed(0) + "," + i.width.toFixed(0) + "," + i.height.toFixed(0) + "," + i.scale.toFixed(1), r = "%c" + e++;
if (i.childrenCount > 0) {
console.groupCollapsed(o + c + r, s, n, a);
for (var l = 0; l < i.childrenCount; l++) t(i.children[l]);
console.groupEnd();
} else console.log(o + c + r, s, n, a);
};
if (t) {
var s = cc.cat(t);
e = s.tempIndex;
i(s);
} else i(cc.director.getScene());
return "属性依次为x,y,width,height,scale.使用cc.cat(id)查看详细属性.";
};
cc.cat = function(t) {
var e, i = 0;
(function s(n) {
if (!e) {
if (cc.js.isNumber(t)) {
if (t === i++) {
e = n;
return;
}
} else {
if (t.toLowerCase() === n.name.toLowerCase()) {
e = n;
return;
}
i++;
}
if (n.childrenCount > 0) for (var a = 0; a < n.childrenCount; a++) s(n.children[a]);
}
})(cc.director.getScene());
e.tempIndex = cc.js.isNumber(t) ? t : i;
return e;
};
cc.list = function(t) {
var e = [];
(function i(s) {
s.name.toLowerCase().indexOf(t.toLowerCase()) > -1 && e.push(s);
if (s.childrenCount > 0) for (var n = 0; n < s.childrenCount; n++) i(s.children[n]);
})(cc.director.getScene());
return 1 === e.length ? e[0] : e;
};
cc.where = function(t) {
var e = t.name ? t : cc.cat(t);
if (!e) return null;
var i = e.getBoundingBoxToWorld(), s = new cc.Node(), n = s.addComponent(cc.Graphics);
cc.director.getScene().addChild(s);
s.position = i.center;
s.group = e.group;
s.zIndex = cc.macro.MAX_ZINDEX;
if (0 === i.width || 0 === i.height) {
n.circle(0, 0, 100);
n.fillColor = cc.Color.GREEN;
n.fill();
} else {
s.width = i.width;
s.height = i.height;
n.rect(-s.width / 2, -s.height / 2, s.width, s.height);
n.fillColor = new cc.Color().fromHEX("#E91E6390");
n.fill();
}
setTimeout(function() {
cc.isValid(s) && s.destroy();
}, 2e3);
return e;
};
cc.cache = function() {
var t = cc.loader._cache, e = [], i = 0;
for (var s in t) {
var n = t[s];
if ("js" !== n.type && "json" !== n.type) {
var a = "_", o = "", c = n.content && n.content.__classname__ ? n.content.__classname__ : n.type, r = -1;
if ("png" === n.type || "jpg" === n.type) {
var l = t[s.replace("." + n.type, ".json")];
if (l && l._owner && l._owner._name) {
a = l._owner._name;
o = l.content.url;
}
} else {
n.content.name && n.content.name.length > 0 ? a = n.content.name : n._owner && (a = n._owner && n._owner.name || "_");
if ("cc.Texture2D" === c) {
var h = n.content;
o = h.url;
var p = h.width * h.height * ((".jpg" === h._native ? 3 : 4) / 1024 / 1024);
i += p;
r = Math.round(1e3 * p) / 1e3;
} else "cc.SpriteFrame" === c && (o = n.content._texture.url);
}
e.push({
queueId: n.queueId,
type: n.type,
name: a,
preview: o,
id: n.id,
content: c,
size: r
});
}
}
return [ e, "缓存 [文件总数:" + e.length + "][纹理缓存:" + i.toFixed(2) + "M]" ];
};
var _ = new (cc.Class({
properties: {
timeSeed: new Date().getTime()
},
dirRotate: function(t, e) {
if (0 == e) return cc.v2(t.x, t.y);
e *= .0174533;
var i = t.x * Math.cos(e) + t.y * Math.sin(e), s = -t.x * Math.sin(e) + t.y * Math.cos(e), n = cc.v2(i, s);
return n.normalize();
},
hitTestCircle: function(t, e) {
var i = (t.width + e.width) / 2;
return (t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y) < i * i;
},
hitTestRectangle: function(t, e) {
if (0 == t.width || 0 == t.height || 0 == e.width || 0 == e.height) return !1;
i = t.x - t.width / 2;
s = e.x - e.width / 2;
n = t.width;
a = e.width;
o = t.y - t.height / 2;
c = e.y - e.height / 2;
r = t.height;
l = e.height;
return !(i + n < s || o + r < c || s + a < i || c + l < o);
},
hitTestMutex: function(t, e) {
h = t.x - e.x + e.width / 2;
p = t.x - e.x - e.width / 2;
d = t.y - e.y + e.height / 2;
u = t.y - e.y - e.height / 2;
f = Math.abs(h) > Math.abs(p) ? p : h;
g = Math.abs(d) > Math.abs(u) ? u : d;
Math.abs(f) > Math.abs(g) ? Math.abs(u) > Math.abs(d) ? t.y = e.y - e.height / 2 - t.height / 2 : t.y = e.y + e.height / 2 + t.height / 2 : Math.abs(p) > Math.abs(h) ? t.x = e.x - e.width / 2 - t.width / 2 : t.x = e.x + e.width / 2 + t.width / 2;
},
RandomNumBoth: function(t, e) {
var i = e - t, s = Math.random();
return t + Math.round(s * i);
},
rnd: function(t) {
t = (9301 * t + 49297) % 233280;
this.timeSeed = t;
return t / 233280;
},
randintSeed: function(t) {
return Math.floor(this.rnd(this.timeSeed) * t);
},
rand01: function() {
var t = (this.randintSeed(1e4) / 1e4).toFixed(4);
return parseFloat(t);
},
randint: function(t) {
return Math.floor(Math.random() * t);
},
deepClone: function(t) {
var e = JSON.stringify(t);
return JSON.parse(e);
},
getSystemTime: function() {
return Math.floor(new Date().getTime() / 1e3);
},
contains: function(t, e) {
for (var i = t.length; i--; ) if (t[i] === e) return !0;
return !1;
},
padding: function(t, e) {
for (var i = (t + "").length; i < e; i = t.length) t = "0" + t;
return t;
},
getPointDistanceFromLine: function(t, e, i, s, n, a) {
var o = i - t, c = s - e, r = ((n - t) * o + (a - e) * c) / (o * o + c * c);
r > 1 ? r = 1 : r < 0 && (r = 0);
var l = t + r * o - n, h = e + r * c - a;
return Math.sqrt(l * l + h * h);
},
sixstr: function(t) {
if (t.length > 6) {
for (var e = "", i = 0; i < 6; i++) e += t[i];
return e + "...";
}
return t;
},
rendernode: function(t, e) {
var i = new cc.Node();
i.parent = t.parent;
var s = i.addComponent(cc.Camera), n = t.getPosition(), a = t.width, o = t.height;
e && (a = o = e);
s.clearFlags = 1;
s.backgroundColor = cc.color(0, 0, 0, 0);
s.alignWithScreen = !1;
s.ortho = !0;
s.orthoSize = o / 2;
var c = new cc.RenderTexture();
c.initWithSize(a, o, cc.gfx.RB_FMT_S8);
s.targetTexture = c;
t.setPosition(cc.Vec2.ZERO);
t.scaleY *= -1;
s.render(t);
t.scaleY *= -1;
t.setPosition(n);
i.destroy();
var r = new cc.SpriteFrame();
r.setTexture(c);
return r;
},
qz: function(t) {
for (var e = 0, i = [], s = 0; s < t.length; s++) {
e += t[s];
i.push(e);
}
if (e <= 0) return Math.floor(Math.random() * t.length);
var n = 0, a = this.randintSeed(e);
for (s = 0; s < i.length; s++) if (a < i[s]) {
n = s;
break;
}
return n;
},
getdistance: function(t, e) {
return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
},
getdistancenosqrt: function(t, e) {
return Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2);
},
getangle: function(t, e) {
t.normalizeSelf();
e.normalizeSelf();
return 57.29578 * Math.acos(t.dot(e));
},
getanglebydir: function(t) {
return Math.atan2(t.y, t.x) * (180 / Math.PI);
},
getanglebydirhudu: function(t) {
return Math.atan2(t.y, t.x);
},
getanglehasnormallized: function(t, e) {
return 57.29578 * Math.acos(t.dot(e));
},
getdirbyag: function(t) {
return cc.v2(Math.cos(t * (Math.PI / 180)), Math.sin(t * (Math.PI / 180)));
},
hittestobb: function(t, e) {
var i = t.centerPoint.sub(e.centerPoint), s = t.axes[0];
if (t.getProjectionRadius(s) + e.getProjectionRadius(s) <= Math.abs(i.dot(s))) return !1;
var n = t.axes[1];
if (t.getProjectionRadius(n) + e.getProjectionRadius(n) <= Math.abs(i.dot(n))) return !1;
var a = e.axes[0];
if (t.getProjectionRadius(a) + e.getProjectionRadius(a) <= Math.abs(i.dot(a))) return !1;
var o = e.axes[1];
return !(t.getProjectionRadius(o) + e.getProjectionRadius(o) <= Math.abs(i.dot(o)));
},
checkobb: function(t, e) {
var i = new k(t.x, t.y, t.width, t.height, t.angle), s = new k(e.x, e.y, e.width, e.height, e.angle);
return this.hittestobb(i, s);
},
checkinview: function(t, e, i, s, n) {
if (e * e < this.getdistancenosqrt(s, n)) return !1;
if (360 == t) return !0;
var a = cc.v2(n.x - s.x, n.y - s.y).normalizeSelf();
this.getanglehasnormallized(i, a);
return this.getanglehasnormallized(i, a) < t / 2;
},
arrtoarr: function(t, e) {
for (var i = [], s = Math.ceil(t.length / e), n = 0; n < s; n++) {
for (var a = [], o = 0; o < e; o++) a.push(t[n * e + o]);
i.push(a);
}
return i;
},
commonicon: function(t, e, i, s, n, a) {
var o = m[t], c = 1;
o.qulity && (c = o.qulity);
cc.resources.load("icons/items/" + o.icon, cc.SpriteFrame, function(t, i) {
t || (e.spriteFrame = i);
});
cc.resources.load("icons/items/pz" + c, cc.SpriteFrame, function(t, e) {
t || (i.getComponent(cc.Sprite).spriteFrame = e);
});
if (s) {
var r = o.name;
a && 1 != a && (r = r + "x" + a);
s.string = r;
}
if (n) {
var l = o.cost;
a && (l *= a);
n.string = l;
}
},
strintoarr: function(t) {
for (var e = [], i = t.split("|"), s = 0; s < i.length; s++) {
for (var n = i[s].split(":"), a = [], o = 0; o < n.length; o++) a.push(Number(n[o]));
e.push(a);
}
return e;
},
stringtoarrone: function(t, e) {
for (var i = t.split(e), s = [], n = 0; n < i.length; n++) s.push(Number(i[n]));
return s;
},
colorhuebyid: function(t) {
var e = b[t].color;
e || (e = y[t % 8]);
return new cc.Color(e, 255, 255);
}
}))();
e.exports = _;
cc._RF.pop();
}, {
gameConfig: "gameConfig",
monstercfg: "monstercfg"
} ],
