skillpet: [ function(t, e) {
"use strict";
cc._RF.push(e, "56b42Z9eZpN6KpqDUkyA5p5", "skillpet");
var i = t("skillcfg");
cc.Class({
extends: cc.Component,
properties: {
nd_skill: {
default: null,
type: cc.Node
},
nd_noskill: {
default: null,
type: cc.Node
},
sp_icon: {
default: null,
type: cc.Sprite
},
lb_name: {
default: null,
type: cc.Label
}
},
onLoad: function() {
this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEventatk, this);
},
_touchEndEventatk: function() {
this.playermode ? this.skilldata ? cc.uimain.createnormalinfo(this.skilldata.name, this.skilldata.des, "卸下", "downskill", this.skillid) : cc.uimain.createequipskill(this.skillidx) : this.skilldata ? cc.uimain.createnormalinfo(this.skilldata.name, this.skilldata.des, "遗忘", "forgetskill", {
skillid: this.skillid,
pet: this.pet
}) : cc.uimain.createleanpetskill(this.pet);
},
commoninit: function(t) {
this.skillid = t;
var e = i[t];
this.skilldata = e;
if (e) {
this.nd_noskill.active = !1;
this.nd_skill.active = !0;
var s = e.icon;
this.lb_name.string = e.name;
var n = this;
cc.resources.load("icons/skills/" + s, cc.SpriteFrame, function(t, e) {
t || (n.sp_icon.spriteFrame = e);
});
} else {
this.nd_noskill.active = !0;
this.nd_skill.active = !1;
}
},
initdata: function(t, e) {
this.pet = e;
this.commoninit(t);
},
initplayer: function(t) {
this.skillidx = t;
this.playermode = !0;
this.commoninit(cc.playerData.player.skillarr[t]);
}
});
cc._RF.pop();
}, {
skillcfg: "skillcfg"
} ],
