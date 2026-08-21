uiskillicon: [ function(t, e) {
"use strict";
cc._RF.push(e, "f51d3k689NJfZsWlnteF5CR", "uiskillicon");
var i = t("skillcfg");
cc.Class({
extends: cc.Component,
properties: {
sp_icon: {
default: null,
type: cc.Sprite
},
lb_name: {
default: null,
type: cc.Label
}
},
initdata: function(t) {
i[t];
var e = i[t].icon;
this.lb_name.string = i[t].name;
var s = this;
cc.resources.load("icons/skills/" + e, cc.SpriteFrame, function(t, e) {
t || (s.sp_icon.spriteFrame = e);
});
},
setcallback: function(t, e) {
this.node.skillpos = t;
this.tiejiang = e;
this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEventatk, this);
},
_touchEndEventatk: function() {
this.tiejiang.skillpos == this.node.skillpos ? this.tiejiang.skillpos = null : this.tiejiang.skillpos = this.node.skillpos;
this.tiejiang.refreshskillchose();
}
});
cc._RF.pop();
}, {
skillcfg: "skillcfg"
} ],
