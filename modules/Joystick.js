Joystick: [ function(t, e) {
"use strict";
cc._RF.push(e, "e9f52yuIUNEBpWUcvSyACV4", "Joystick");
var i = t("JoystickCommon"), s = t("JoystickBG");
cc.Class({
extends: cc.Component,
properties: {
dot: {
default: null,
type: cc.Node,
displayName: "摇杆节点"
},
ring: {
default: null,
type: s,
displayName: "摇杆背景节点"
},
stickX: {
default: 0,
displayName: "摇杆X位置"
},
stickY: {
default: 0,
displayName: "摇杆Y位置"
},
touchType: {
default: i.TouchType.DEFAULT,
type: i.TouchType,
displayName: "触摸类型"
},
directionType: {
default: i.DirectionType.ALL,
type: i.DirectionType,
displayName: "方向类型"
},
_stickPos: {
default: null,
type: cc.Node,
displayName: "摇杆当前位置"
},
_touchLocation: {
default: null,
type: cc.Node,
displayName: "摇杆当前位置"
}
},
setopamode: function() {
this.opamode = !0;
this.node.opacity = 1;
},
onLoad: function() {
this.mode = !0;
this.opamode = !1;
this._createStickSprite();
this.touchType == i.TouchType.FOLLOW && this._initTouchEvent();
},
_createStickSprite: function() {
this.ring.node.setPosition(this.stickX, this.stickY);
this.dot.setPosition(this.stickX, this.stickY);
},
onDestroy: function() {
this.node.off(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
this.node.off(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
},
_initTouchEvent: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
},
_touchStartEvent: function(t) {
this.opamode && (this.node.opacity = 255);
this._touchLocation = t.getLocation();
var e = this.node.convertToNodeSpaceAR(t.getLocation());
if (1 == this.mode) {
this.ring.node.setPosition(e);
this.dot.setPosition(e);
this._stickPos = e;
} else {
this._createStickSprite();
this._stickPos = cc.v2(this.stickX, this.stickY);
}
this.startCb && this.startCb(t.getLocation());
},
_touchMoveEvent: function(t) {
if (this._touchLocation.x == t.getLocation().x && this._touchLocation.y == t.getLocation().y) return !1;
var e = this.ring.node.convertToNodeSpaceAR(t.getLocation()), i = this.ring._getDistance(e, cc.v2(0, 0)), s = this.ring.node.width / 2, n = this._stickPos.x + e.x, a = this._stickPos.y + e.y;
if (s > i) this.dot.setPosition(cc.v2(n, a)); else {
var o = this._stickPos.x + Math.cos(this.ring._getRadian(cc.v2(n, a))) * s, c = this._stickPos.y + Math.sin(this.ring._getRadian(cc.v2(n, a))) * s;
this.dot.setPosition(cc.v2(o, c));
}
var r = this.ring._getAngle(cc.v2(n, a));
this.moveCb && this.moveCb(r, i, t.getLocation());
},
_touchEndEvent: function() {
this.opamode && (this.node.opacity = 1);
this.dot.setPosition(this.ring.node.getPosition());
this.ring._speed = 0;
this.endCb && this.endCb();
this._createStickSprite();
},
bindMoveCb: function(t) {
this.moveCb = t;
},
bindStartCb: function(t) {
this.startCb = t;
},
bindEndCb: function(t) {
this.endCb = t;
}
});
cc._RF.pop();
}, {
JoystickBG: "JoystickBG",
JoystickCommon: "JoystickCommon"
} ],
