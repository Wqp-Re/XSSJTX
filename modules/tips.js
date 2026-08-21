tips: [ function(t, e) {
"use strict";
cc._RF.push(e, "dc3a91bMb9ItIVX2Nvt1DZt", "tips");
cc.Class({
extends: cc.Component,
properties: {
sp_icon: {
default: null,
type: cc.Sprite
},
lb_str: {
default: null,
type: cc.Label
},
lb_str2: {
default: null,
type: cc.Label
}
},
initdata: function(t, e, i, s) {
this.life = 1.5;
this.lb_str.string = t;
this.lb_str.node.color = i || cc.Color.WHITE;
if (e) {
this.sp_icon.node.active = !0;
this.sp_icon.spriteFrame = null;
var n = this;
cc.resources.load(e, cc.SpriteFrame, function(t, e) {
t || (n.sp_icon.spriteFrame = e);
});
} else this.sp_icon.node.active = !1;
if (s) {
this.lb_str2.node.active = !0;
this.lb_str2.string = s;
} else this.lb_str2.node.active = !1;
},
update: function(t) {
this.life -= t;
if (this.life <= 0) {
this.node.removeFromParent(!1);
cc.uiHelper.tipsarr.push(this.node);
}
}
});
cc._RF.pop();
}, {} ],
