weapondisplay: [ function(t, e) {
"use strict";
cc._RF.push(e, "a6db91TeSJBz5lQXHcFTTXR", "weapondisplay");
var i = {
1: {
ani: "showweapon",
life: 1.5
},
2: {
ani: "atkpierce",
life: .2,
anchorX: 0
},
3: {
ani: "atk90",
life: .2,
anchorX: 0
},
4: {
ani: "atkaoe",
life: .5,
anchorX: 0,
ascale: 1
},
5: {
ani: "arrowshow",
life: .25,
anchorX: 0
}
};
cc.Class({
extends: cc.Component,
properties: {
sp_weapon: {
default: null,
type: cc.Sprite
},
ani_weapon: {
default: null,
type: cc.Animation
}
},
start: function() {},
init: function() {
var t = this.sp_weapon.node;
this.node.x = this.node.y = 0;
t.scale = 1.5;
t.opacity = 255;
this.node.angle = 0;
this.node.ctrl = this;
},
showani: function(t) {
this.init();
this.followtarget = t.follow;
this.lifetime = t.lifetime;
var e = t.icon, s = t.scale, n = i[t.id];
this.lifetime || (this.lifetime = n.life);
this.ani_weapon.stop();
this.ani_weapon.play(n.ani);
s || (s = 2);
n.ascale && (s *= n.ascale);
this.node.scale = s;
var a = this;
a.sp_weapon.spriteFrame = null;
cc.resources.load("icons/items/" + e, cc.SpriteFrame, function(t, e) {
!t && a.isValid && (a.sp_weapon.spriteFrame = e);
});
if (this.followtarget) {
this.node.x = this.followtarget.x;
this.node.y = this.followtarget.y;
}
},
doupdate: function(t) {
this.lifetime -= t;
if (this.followtarget) {
this.node.x = this.followtarget.x;
this.node.y = this.followtarget.y;
}
return this.lifetime <= 0;
}
});
cc._RF.pop();
}, {} ],
