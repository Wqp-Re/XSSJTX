test2: [ function(t, e) {
"use strict";
cc._RF.push(e, "ea936kpEjZLG77jKae5S2Xo", "test2");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
var t = this;
cc.dynamicAtlasManager.enabled = !1;
for (var e = Math.ceil(32 / 18), i = Math.ceil(35 / 18), s = {
x: [],
y: [],
nu: [],
nv: []
}, n = 0; n <= e; n++) for (var a = Math.min(18 * n, 32), o = 0; o <= i; o++) {
var c = Math.min(18 * o, 35);
s.x.push(a);
s.y.push(c);
s.nu.push(a / 32);
s.nv.push(c / 35);
}
for (var r = function(n) {
var a = Math.floor(n / i) * (i + 1) + n % e, o = a + 1, c = a + i + 1, r = c + 1, l = {
x: s.x,
y: s.y,
nu: s.nu,
nv: s.nv,
triangles: [ a, o, c, c, r, o ]
};
console.log(l);
var h = new cc.Node(), p = h.addComponent(cc.Sprite);
h.width = 18;
h.height = 18;
cc.resources.load("allrole/Alien1_d_1", cc.SpriteFrame, function(t, e) {
if (!t) {
p.type = 4;
p.spriteFrame = new cc.SpriteFrame(e._texture);
p.spriteFrame.vertices = l;
p.setVertsDirty();
}
});
h.sx = 4 * Math.random() + 15;
t.node.addChild(h);
}, l = 0; l < 2; l++) r(l);
}
});
cc._RF.pop();
}, {} ],
