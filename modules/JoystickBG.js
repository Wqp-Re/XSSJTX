JoystickBG: [ function(t, e) {
"use strict";
cc._RF.push(e, "1555fDt/bRC7KezM9aCc16g", "JoystickBG");
var i = t("JoystickCommon");
cc.Class({
extends: cc.Component,
properties: {
dot: {
default: null,
type: cc.Node,
displayName: "摇杆节点"
},
_joyCom: {
default: null,
displayName: "joy Node"
},
_angle: {
default: null,
displayName: "当前触摸的角度"
},
_radian: {
default: null,
displayName: "弧度"
},
_speed: 0,
_speed1: 1,
_speed2: 2,
_opacity: 0
},
onLoad: function() {
this._joyCom = this.node.parent.getComponent("Joystick");
this._joyCom.touchType == i.TouchType.DEFAULT && this._initTouchEvent();
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
update: function() {},
_allDirectionsMove: function() {},
_getDistance: function(t, e) {
return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
},
_getRadian: function(t) {
this._radian = Math.PI / 180 * this._getAngle(t);
return this._radian;
},
_getAngle: function(t) {
var e = this.node.getPosition();
this._angle = Math.atan2(t.y - e.y, t.x - e.x) * (180 / Math.PI);
return this._angle;
},
_setSpeed: function(t) {
this._getDistance(t, this.node.getPosition()) < this._radius ? this._speed = this._speed1 : this._speed = this._speed2;
},
_touchStartEvent: function(t) {
var e = this.node.convertToNodeSpaceAR(t.getLocation()), i = this._getDistance(e, cc.v2(0, 0)), s = this.node.width / 2;
this._stickPos = e;
var n = this.node.getPosition().x + e.x, a = this.node.getPosition().y + e.y;
this._joyCom.startCb && this._joyCom.startCb(t.getLocation());
if (s > i) {
this.dot.setPosition(cc.v2(n, a));
return !0;
}
return !1;
},
_touchMoveEvent: function(t) {
var e = this.node.convertToNodeSpaceAR(t.getLocation()), i = this._getDistance(e, cc.v2(0, 0)), s = this.node.width / 2, n = this.node.getPosition().x + e.x, a = this.node.getPosition().y + e.y;
if (s > i) this.dot.setPosition(cc.v2(n, a)); else {
var o = this.node.getPosition().x + Math.cos(this._getRadian(cc.v2(n, a))) * s, c = this.node.getPosition().y + Math.sin(this._getRadian(cc.v2(n, a))) * s;
this.dot.setPosition(cc.v2(o, c));
}
this._getAngle(cc.v2(n, a));
this._joyCom.moveCb && this._joyCom.moveCb(this._angle, i, t.getLocation());
},
_touchEndEvent: function() {
this.dot.setPosition(this.node.getPosition());
this._speed = 0;
this._joyCom.endCb && this._joyCom.endCb();
}
});
cc._RF.pop();
}, {
JoystickCommon: "JoystickCommon"
} ],
