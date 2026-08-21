gameloot: [ function(t, e) {
"use strict";
cc._RF.push(e, "45bf7lBcBZNP4FsSmgbEC6t", "gameloot");
var i = t("lootcfg"), s = (t("Utils"), {}), n = {}, a = cc.Class({
extends: cc.Node,
properties: {},
setDebugFrame: function(t) {
if (cc.battledebug) {
t.sizeMode = 0;
cc.resources.load("pixi10", cc.SpriteFrame, function(e, i) {
e || (t.spriteFrame = i);
});
}
},
setFrame: function(t, e, i) {
if (s[e]) t.spriteFrame = s[e]; else {
if (null == n[e]) {
n[e] = [];
cc.resources.load(i + "/" + e, cc.SpriteFrame, function(t, i) {
if (!t) {
s[e] = i;
for (var a = n[e].length - 1; a >= 0; a--) try {
n[e][a].spriteFrame = i;
} catch (t) {}
n[e] = null;
}
});
}
n[e].push(t);
}
},
initdata: function(t, e) {
this.opacity = 255;
var s = i[t];
this.isdead = !1;
if (!this.sprite) {
var n = new cc.Node();
n.anchorY = 0;
var a = n.addComponent("cc.Sprite");
this.addChild(n);
this.sprite = a;
if (cc.battledebug) {
var o = new cc.Node();
o.opacity = 100;
var c = o.addComponent("cc.Sprite");
this.addChild(o);
this.sprite2 = c;
}
}
this.sprite.node.y = -s.height / 2;
this.zplus = s.height / 2;
this.checkmove = s.checkmove;
this.checkhit = s.checkhit;
if (cc.battledebug) {
this.sprite2.sizeMode = 0;
this.sprite2.node.width = s.width;
this.sprite2.node.height = s.height;
this.setDebugFrame(this.sprite2);
}
this.sprite.spriteFrame = null;
this.setFrame(this.sprite, s.img, "mapitem");
this.x = e.x;
this.y = e.y;
}
});
e.exports = a;
cc._RF.pop();
}, {
Utils: "Utils",
lootcfg: "lootcfg"
} ],
