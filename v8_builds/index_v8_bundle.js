
cc._bSpeedArr = [1, 2, 5, 10, 50, 100];
cc._bSpeedIdx = 0;
cc._bSpeedNode = null;

cc._tryCreateSpeedBtn = function() {
    try {
        if (cc._bSpeedNode && cc._bSpeedNode.isValid) return true;
        if (!cc.director) return false;
        var parent = cc.find("Canvas");
        if (!parent) parent = cc.director.getScene();
        if (!parent) return false;
        console.log("SPEEDBTN_CANVAS_OK");
        var size = cc.view.getVisibleSize();
        var snd = new cc.Node("SpeedBtn");
        parent.addChild(snd, 999999);
        snd.setPosition(cc.v2(size.width / 2 - 60, size.height / 2 - 40));
        
        var lb = snd.addComponent(cc.Label);
        lb.string = "加速 1x";
        lb.fontSize = 28;
        lb.lineHeight = 36;
        lb.color = cc.color(255, 200, 0, 255);
        if (cc.Button) { try { snd.addComponent(cc.Button); } catch (e) {} }
        snd.on(cc.Node.EventType.TOUCH_END, function() {
            cc._bSpeedIdx = (cc._bSpeedIdx + 1) % cc._bSpeedArr.length;
            var sp = cc._bSpeedArr[cc._bSpeedIdx];
            if (cc.kSpeed) cc.kSpeed(sp);
            lb.string = "加速 " + sp + "x";
            if (cc.uiHelper && cc.uiHelper.showTips) cc.uiHelper.showTips("战斗加速 " + sp + "x");
        });
        cc._bSpeedNode = snd;
        console.log("SPEEDBTN_CREATED_OK");
        return true;
    } catch (e) {
        console.log("SPEEDBTN_ERR " + e.message);
        return false;
    }
};

// 启动后立即尝试, 并每2秒轮询直到创建成功
setTimeout(function() {
    var tries = 0;
    var timer = setInterval(function() {
        tries++;
        if (cc._tryCreateSpeedBtn() || tries > 60) clearInterval(timer);
    }, 2000);
    cc._tryCreateSpeedBtn();
}, 1500);
window.__require = function t(e, i, s) {
function n(o, c) {
if (!i[o]) {
if (!e[o]) {
var r = o.split("/");
r = r[r.length - 1];
if (!e[r]) {
var l = "function" == typeof __require && __require;
if (!c && l) return l(r, !0);
if (a) return a(r, !0);
throw new Error("Cannot find module '" + o + "'");
}
o = r;
}
var h = i[o] = {
exports: {}
};
e[o][0].call(h.exports, function(t) {
return n(e[o][1][t] || t);
}, h, h.exports, t, e, i, s);
}
return i[o].exports;
}
for (var a = "function" == typeof __require && __require, o = 0; o < s.length; o++) n(s[o]);
return n;
}({
CCActionAdd: [ function(t, e) {
"use strict";
cc._RF.push(e, "d3144FULSlMRZWZNBJt7mpq", "CCActionAdd");
cc.ShakeAction = cc.ActionInterval.extend({
initWithDuration: function(t, e, i) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._strengthx = e;
this._strengthy = i;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.ShakeAction();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._strength);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this.oldPos = this.target.position;
},
fgRangeRand: function(t, e) {
return Math.random() * (e - t) + t;
},
stop: function() {
this.target && this.oldPos && (this.target.position = this.oldPos);
this.target = null;
this.oldPos = null;
},
update: function(t) {
var e = this.fgRangeRand(-this._strengthx, this._strengthx) * t, i = this.fgRangeRand(-this._strengthy, this._strengthy) * t;
if (this.target) {
var s = this.target.position;
s.x = s.x + e;
s.y = s.y + i;
this.target.position = s;
}
}
});
cc.ProgressTo = cc.ActionInterval.extend({
initWithDuration: function(t, e, i) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._start = e;
this._end = i;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.ProgressTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._start, this._end);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this.progress = this.target.getComponent("cc.ProgressBar");
this.progress.progress = this._start;
this._delta = this._end - this._start;
},
update: function(t) {
t = this._computeEaseTime(t);
this.target && (this.progress.progress = this._start + this._delta * t);
}
});
cc.VauleTo = cc.ActionInterval.extend({
initWithDuration: function(t, e, i, s) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._start = e;
this._end = i;
this._callback = s;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.VauleTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._start, this._end, this._callback);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._delta = this._end - this._start;
},
update: function(t) {
t = this._computeEaseTime(t);
this.target && this._callback && this._callback(this._start + this._delta * t);
}
});
cc._RF.pop();
}, {} ],
DonotDestroy: [ function(t, e) {
"use strict";
cc._RF.push(e, "0cd18TQLwxCxbh0cSpZJOzX", "DonotDestroy");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
this.node.zIndex = 99;
}
});
cc._RF.pop();
}, {} ],
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
JoystickCommon: [ function(t, e) {
"use strict";
cc._RF.push(e, "bc6438paTVAv7b06KzTOsK5", "JoystickCommon");
e.exports = {
TouchType: cc.Enum({
DEFAULT: 0,
FOLLOW: 1
}),
DirectionType: cc.Enum({
FOUR: 4,
EIGHT: 8,
ALL: 0
})
};
cc._RF.pop();
}, {} ],
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
Notifier: [ function(t, e) {
"use strict";
cc._RF.push(e, "408e9lYMA5GhLXuiulJqRal", "Notifier");
var i = function(t, e) {
this.target = t;
this.callback = e;
}, s = function() {
this.observerMap = {};
};
s.prototype.on = function(t, e, s) {
this.observerMap[t] || (this.observerMap[t] = []);
this.observerMap[t].push(new i(e, s));
};
s.prototype.off = function(t, e) {
if (this.observerMap[t]) for (var i = this.observerMap[t], s = i.length - 1; s >= 0; s--) if (i[s].target == e) {
i.splice(s, 1);
break;
}
};
s.prototype.removeAllObservers = function(t) {
this.observerMap[t] = null;
};
s.prototype.emit = function(t, e) {
if (this.observerMap[t]) for (var i = this.observerMap[t], s = i.length - 1; s >= 0; s--) i[s].callback(e);
};
cc.Notifier = new s();
cc._RF.pop();
}, {} ],
SDKManage: [ function(t, e) {
"use strict";
cc._RF.push(e, "57968ApfLdEUKx6hE4XhSRM", "SDKManage");
t("Utils");
var i = function() {
this.launchtime = new Date().getTime();
this.adWatch = function(t) {
t && t();
};
this.banner = function() {};
this.closebanner = function() {};
this.createyuansheng = function(t) {
t([ {
icon: "http://img4.yxdimg.com/2022/8/17/ae4fe0c6-5f8a-463d-916c-00d1be2bdfd9.png"
} ]);
};
this.hutuibanner = function() {};
this.closehutuibanner = function() {};
this.hutui9gong = function() {};
this.checkhasicon = function() {};
this.desktopicon = function() {};
this.reportadclick = function() {};
this.reportadshow = function() {};
this.init = function() {};
this.initPlatform = function() {};
this.openhutui = function() {
return !1;
};
this.getdelay = function() {
return 0;
};
this.cleangd = function() {};
this.dowudian = function() {};
this.addchaping = function() {};
this.needys = function() {
return !1;
};
}, s = new function() {
this.init = function() {
cc.isyuansheng = !1;
if (cc.sys.platform == cc.sys.WECHAT_GAME) {
var e = t("sdkwx");
this.handel = new e();
} else if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
e = t("sdkzj");
this.handel = new e();
} else if (cc.sys.platform == cc.sys.OPPO_GAME) {
e = t("sdkoppo");
this.handel = new e();
} else if (cc.sys.platform == cc.sys.VIVO_GAME) {
e = t("sdkvivo");
this.handel = new e();
} else if (cc.sys.platform == cc.sys.HUAWEI_GAME) {
e = t("sdkhuawei");
this.handel = new e();
} else cc.sys.os, cc.sys.OS_ANDROID, this.handel = new i();
cc.launchtime = this.handel.launchtime;
this.handel.init();
};
this.cleangd = function() {
this.handel.cleangd();
};
this.initPlatform = function() {
this.handel.initPlatform();
};
this.adWatch = function(t, e, i) {
this.handel.adWatch(e, i);
};
this.banner = function(t) {
this.handel.banner(t);
};
this.closebanner = function() {
this.handel.closebanner();
};
this.createyuansheng = function(t, e, i) {
this.handel.createyuansheng(t, e, i);
};
this.hutuibanner = function() {
this.handel.hutuibanner();
};
this.closehutuibanner = function() {
this.handel.closehutuibanner();
};
this.hutui9gong = function() {
this.handel.hutui9gong();
};
this.checkhasicon = function(t) {
this.handel.checkhasicon && this.handel.checkhasicon(t);
};
this.desktopicon = function(t) {
this.handel.desktopicon(t);
};
this.reportadclick = function(t) {
this.handel.reportadclick(t);
};
this.reportadshow = function(t) {
this.handel.reportadshow(t);
};
this.logEvent = function() {};
this.share = function() {};
this.addchaping = function() {
this.handel.addchaping();
};
this.fixclosebanner = function() {
this.handel.fixclosebanner();
};
this.startluping = function() {
this.handel.startluping && this.handel.startluping();
};
this.stopluping = function() {
this.handel.stopluping && this.handel.stopluping();
};
this.vedioshare = function() {
this.handel.vedioshare();
};
this.islupinging = function() {
return this.handel.recording;
};
this.realbanner = function() {
this.handel.realbanner();
};
this.realclosebanner = function() {
this.handel.realclosebanner();
};
this.openhutui = function() {
return !!this.handel.openhutui && this.handel.openhutui();
};
this.needys = function() {
return !!this.handel.needys && this.handel.needys();
};
this.cocosready = function() {
if (this.handel.cocosready) return this.handel.cocosready();
};
this.endgame = function() {
this.handel.endgame ? this.handel.endgame() : cc.director.end();
};
this.yslogin = function() {
this.handel.yslogin ? this.handel.yslogin() : cc.Notifier.emit("yslogin");
};
this.youxiquan = function(t) {
this.handel.youxiquan && this.handel.youxiquan(t);
};
this.destroyyouxiquan = function() {
this.handel.destroyyouxiquan && this.handel.destroyyouxiquan();
};
this.savecloud = function(t) {
this.handel.savecloud && this.handel.savecloud(t);
};
this.loadcloud = function() {
this.handel.loadcloud && this.handel.loadcloud();
};
this.getzhuzhuoquan = function() {
return this.handel.zhuzhuoquan ? this.handel.zhuzhuoquan() : " ";
};
this.showys = function(t) {
this.handel.showys && this.handel.showys(t);
};
this.desys = function() {
this.handel.desys && this.handel.desys();
};
}();
s.init();
e.exports = s;
cc._RF.pop();
}, {
Utils: "Utils",
sdkhuawei: "sdkhuawei",
sdkoppo: "sdkoppo",
sdkvivo: "sdkvivo",
sdkwx: "sdkwx",
sdkzj: "sdkzj"
} ],
UILogin: [ function(t, e) {
"use strict";
cc._RF.push(e, "3a7acBs9fFHDY+qUmb2SLGc", "UILogin");
var i = t("Utils"), s = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {
loadBar: {
default: null,
type: cc.ProgressBar
},
lb_jd: {
default: null,
type: cc.Label
},
pb_avatar: {
default: null,
type: cc.Prefab
},
pb_ys: {
default: null,
type: cc.Prefab
},
btn_login: {
default: null,
type: cc.Node
},
lb_zz: {
default: null,
type: cc.Label
},
ysstr1: "",
ysstr2: ""
},
onLoad: function() {
cc.Notifier.on("avatarfinish", this, this.brefrostart.bind(this));
cc.Notifier.on("yslogin", this, this.yslogin.bind(this));
cc.Notifier.on("showloginbtn", this, this.showloginbtn.bind(this));
cc.closedeadpeice = !1;
cc.ysstr1 = this.ysstr1;
cc.ysstr2 = this.ysstr2;
},
brefrostart: function() {
var t = this;
console.log("brefrostart");
if (s.needys()) {
var e = cc.sys.localStorage.getItem("saveys");
if (null == e || "" == e) {
var i = cc.instantiate(this.pb_ys);
i.getComponent("uiys").initdata(function() {
cc.sys.localStorage.setItem("saveys", "1");
t.dostart();
});
this.node.addChild(i);
} else this.dostart();
} else this.dostart();
},
onDestroy: function() {
cc.Notifier.off("showloginbtn", this);
cc.Notifier.off("yslogin", this);
cc.Notifier.off("avatarfinish", this);
cc.loader.onProgress = null;
},
start: function() {
cc.autosell = !1;
cc.autoatk = !1;
cc.autoget = !1;
cc.shenyuan = !1;
cc.lanrenmode = !1;
cc.guaji = !1;
cc.suojineng = !1;
cc.hell = !1;
cc.wujin = !1;
cc.wujincount = 0;
cc.wujinchongpa = !1;
cc.wujindijin = 1;
this.loginstep = 1;
s.initPlatform();
this.node.parent.zIndex = 1e3;
cc.notSound = !1;
cc.notani = !1;
cc.nodmglb = !1;
cc.chengseadd = !1;
var t = cc.playerData.loaddata();
cc.newbiebattle = !1;
this.loadBar.node.active = !1;
this.lb_jd.string = "";
var e = cc.instantiate(this.pb_avatar);
e.y = 9999;
this.node.addChild(e);
e.getComponent("avatar").initcommon(cc.playerData.ismale, cc.playerData.xxarr);
this.nd_avatar = e;
this.btn_login.active = !1;
this.lb_zz.string = this.lb_zz.string + s.getzhuzhuoquan();
s.cocosready();
},
yslogin: function() {
this.dostart2();
},
dostart: function() {
s.yslogin();
},
dostart2: function() {
cc.herospriteframe = i.rendernode(this.nd_avatar);
cc.herospriteframe.getTexture().setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
this.loadBar.node.active = !0;
var t = this;
cc.loader.onProgress = function(e, i, s) {
var n = e / i;
if (s && s.uuid && n > t.loadBar.progress) {
t.loadBar.progress = n;
t.lb_jd.string = Math.floor(100 * n) + "%";
1 == n && (cc.loader.onProgress = null);
}
};
cc.director.loadScene("main");
},
showloginbtn: function() {
this.btn_login.active = !0;
},
onclicklogin: function() {
this.btn_login.active = !1;
s.yslogin();
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
Utils: "Utils"
} ],
UIPetChose: [ function(t, e) {
"use strict";
cc._RF.push(e, "7cbeb8O82RI8bMBHPVql5Lj", "UIPetChose");
var i = t("Utils");
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
}
},
onLoad: function() {
cc.Notifier.on("clickpet", this, this.clickpet.bind(this));
},
onDestroy: function() {
cc.Notifier.off("clickpet", this);
},
clickpet: function(t) {
var e = this;
cc.playerData.battlepet && cc.playerData.battlepet.uuid == t.uuid ? cc.uiHelper.messageBox("下阵", "确定要下阵" + t.name, function() {
cc.playerData.battlepet = null;
cc.Notifier.emit("refreshpet");
e.node.destroy();
}) : cc.uiHelper.messageBox("上阵", "确定要上阵" + t.name, function() {
cc.playerData.equippet(t.uuid);
cc.Notifier.emit("refreshpet");
e.node.destroy();
});
},
close: function() {
this.node.destroy();
},
start: function() {
var t = cc.playerData.petbag;
t = i.arrtoarr(t, 2);
this.nochose = !0;
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(t.length, {
array: t,
target: this
});
}
});
cc._RF.pop();
}, {
Utils: "Utils"
} ],
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
addbanner: [ function(t, e) {
"use strict";
cc._RF.push(e, "62b15/1UKREC5y00LVeSjsZ", "addbanner");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
start: function() {
i.banner();
},
onDestroy: function() {
i.closebanner();
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
addchaping: [ function(t, e) {
"use strict";
cc._RF.push(e, "bcfb44VcJ1Ig5TVctDxLItW", "addchaping");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
i.addchaping();
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
atlasmgr: [ function(t, e) {
"use strict";
cc._RF.push(e, "6743cjSNm5J94N6A5Y/fUTe", "atlasmgr");
cc.Class({
extends: cc.Component,
properties: {
roleatlas: {
default: null,
type: cc.SpriteAtlas
},
tileatlas: {
default: null,
type: cc.SpriteAtlas
}
},
onLoad: function() {
cc.atlMgr = this;
},
start: function() {}
});
cc._RF.pop();
}, {} ],
avatarcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "90fc7/3LXlKhLNOlhgKX5jx", "avatarcfg");
var i = [ new cc.Color(255, 255, 255), new cc.Color(200, 100, 100), new cc.Color(120, 160, 200), new cc.Color(100, 200, 100), new cc.Color(225, 225, 130), new cc.Color(247, 125, 50), new cc.Color(150, 150, 150), new cc.Color(100, 100, 200) ];
e.exports = {
manpartcount: {
fronthair: 17,
rearhair: 18,
cloak: 4,
ear: 1,
wing: 5,
tail: 6,
face: 8,
clothing: 43,
beard: 11,
beastear: 6,
glass: 6,
acc1: 15,
acc2: 14
},
womanpartcount: {
fronthair: 15,
rearhair: 20,
cloak: 4,
ear: 1,
wing: 5,
tail: 6,
face: 7,
clothing: 49,
beard: 0,
beastear: 6,
glass: 7,
acc1: 14,
acc2: 16
},
colorTB: i
};
cc._RF.pop();
}, {} ],
avatar: [ function(t, e) {
"use strict";
cc._RF.push(e, "0a9ae5mTRZA9rT4jY8byYGs", "avatar");
var i = t("Utils"), s = t("avatarcfg"), n = s.manpartcount, a = s.womanpartcount, o = s.colorTB, c = [ "setfronthair", "setrearhair", "setclothing", "setface", "setear", "setwing", "settail", "setcloak", "setbeastear", "setglass", "setacc1", "setacc2", "setbreard", "sethcolor" ];
cc.Class({
extends: cc.Component,
properties: {
sp_cloakback: {
default: null,
type: cc.Sprite
},
sp_fronthairhback: {
default: null,
type: cc.Sprite
},
sp_wingback: {
default: null,
type: cc.Sprite
},
sp_tailback: {
default: null,
type: cc.Sprite
},
sp_body: {
default: null,
type: cc.Sprite
},
sp_rearhair: {
default: null,
type: cc.Sprite
},
sp_ear: {
default: null,
type: cc.Sprite
},
sp_face: {
default: null,
type: cc.Sprite
},
sp_clothing: {
default: null,
type: cc.Sprite
},
sp_breard: {
default: null,
type: cc.Sprite
},
sp_beastear: {
default: null,
type: cc.Sprite
},
sp_glass: {
default: null,
type: cc.Sprite
},
sp_acc1: {
default: null,
type: cc.Sprite
},
sp_acc2: {
default: null,
type: cc.Sprite
},
sp_fronthairhup: {
default: null,
type: cc.Sprite
},
sp_wingup: {
default: null,
type: cc.Sprite
},
sp_tailup: {
default: null,
type: cc.Sprite
},
sp_cloakup: {
default: null,
type: cc.Sprite
},
sp_rearhairup: {
default: null,
type: cc.Sprite
}
},
start: function() {},
num0: function(t) {
return t < 10 ? "0" + t : t;
},
initcommon: function(t, e) {
this.ismale = t;
this.partcount = 0;
this.setsex(t);
this.setbody();
this.partarr = [];
for (var i = 0; i < 14; i++) this.partarr.push(e[i]);
this.setallpart(this.partarr);
},
initdata: function(t) {
this.ismale = t;
this.partcount = 0;
this.partarr = [];
for (var e = 0; e < 14; e++) this.partarr.push(0);
this.partarr[0] = this.partarr[1] = this.partarr[2] = 1;
this.setsex(t);
this.setbody();
this.setallpart(this.partarr);
return this.partarr;
},
refreshpart: function(t, e) {
this.partarr[t] = e;
this[c[t]](e);
},
randpart: function() {
var t = this.partarr;
t[0] = i.randintSeed(this.countcfg.fronthair + 1);
t[1] = i.randintSeed(this.countcfg.rearhair + 1);
t[2] = i.randintSeed(this.countcfg.clothing + 1);
t[3] = i.randintSeed(this.countcfg.face + 1);
t[4] = i.randintSeed(this.countcfg.ear + 1);
t[5] = i.randintSeed(this.countcfg.wing + 1);
t[6] = i.randintSeed(this.countcfg.tail + 1);
t[7] = i.randintSeed(this.countcfg.cloak + 1);
t[8] = i.randintSeed(this.countcfg.beastear + 1);
t[9] = i.randintSeed(this.countcfg.glass + 1);
t[10] = i.randintSeed(this.countcfg.acc1 + 1);
t[11] = i.randintSeed(this.countcfg.acc2 + 1);
t[12] = i.randintSeed(this.countcfg.beard);
t[13] = i.randintSeed(o.length);
this.setallpart(t);
return t;
},
setsex: function(t) {
var e = "";
if (t) {
e = "avatar/Male/";
this.countcfg = n;
} else {
e = "avatar/Female/";
this.countcfg = a;
}
this.dir = e;
},
setframe: function(t, e, i) {
var s = this;
i.spriteFrame = null;
if ("00" != e) {
s.partcount++;
cc.resources.load(this.dir + t + e, cc.SpriteFrame, function(t, e) {
t || (i.spriteFrame = e);
s.partcount--;
0 == s.partcount && cc.Notifier.emit("avatarfinish");
});
} else 0 == s.partcount && cc.Notifier.emit("avatarfinish");
},
setbody: function() {
this.setframe("TV_Body_p", "01", this.sp_body);
},
sethcolor: function(t) {
this.haircolor = o[t];
this.sp_rearhair.node.color = this.haircolor;
this.sp_rearhairup.node.color = this.haircolor;
this.sp_breard.node.color = this.haircolor;
this.sp_fronthairhback.node.color = this.haircolor;
this.sp_fronthairhup.node.color = this.haircolor;
0 == this.partcount && cc.Notifier.emit("avatarfinish");
},
setallpart: function(t) {
this.sethcolor(t[13]);
this.setfronthair(t[0]);
this.setrearhair(t[1]);
this.setclothing(t[2]);
this.setface(t[3]);
this.setear(t[4]);
this.setwing(t[5]);
this.settail(t[6]);
this.setcloak(t[7]);
this.setbeastear(t[8]);
this.setglass(t[9]);
this.setacc1(t[10]);
this.setacc2(t[11]);
this.setbreard(t[12]);
},
setfronthair: function(t) {
this.setframe("TV_FrontHair2_p", this.num0(t), this.sp_fronthairhback);
this.setframe("TV_FrontHair1_p", this.num0(t), this.sp_fronthairhup);
},
setrearhair: function(t) {
this.setframe("TV_RearHair2_p", this.num0(t), this.sp_rearhair);
this.setframe("TV_RearHair1_p", this.num0(t), this.sp_rearhairup);
},
setcloak: function(t) {
this.setframe("TV_Cloak2_p", this.num0(t), this.sp_cloakback);
this.setframe("TV_Cloak1_p", this.num0(t), this.sp_cloakup);
},
setwing: function(t) {
this.setframe("TV_Wing2_p", this.num0(t), this.sp_wingback);
this.setframe("TV_Wing1_p", this.num0(t), this.sp_wingup);
},
settail: function(t) {
this.setframe("TV_Tail2_p", this.num0(t), this.sp_tailback);
this.setframe("TV_Tail1_p", this.num0(t), this.sp_tailup);
},
setear: function(t) {
this.setframe("TV_Ears_p", this.num0(t), this.sp_ear);
},
setface: function(t) {
this.setframe("TV_FacialMark_p", this.num0(t), this.sp_face);
},
setclothing: function(t) {
this.setframe(this.ismale ? "TV_Clothing2_p" : "TV_Clothing1_p", this.num0(t), this.sp_clothing);
},
setbreard: function(t) {
this.setframe("TV_Beard1_p", this.num0(t), this.sp_breard);
},
setbeastear: function(t) {
this.setframe("TV_BeastEars_p", this.num0(t), this.sp_beastear);
},
setglass: function(t) {
this.setframe("TV_Glasses_p", this.num0(t), this.sp_glass);
},
setacc1: function(t) {
this.setframe("TV_AccA_p", this.num0(t), this.sp_acc1);
},
setacc2: function(t) {
this.setframe("TV_AccB_p", this.num0(t), this.sp_acc2);
}
});
cc._RF.pop();
}, {
Utils: "Utils",
avatarcfg: "avatarcfg"
} ],
battlestates: [ function(t, e) {
"use strict";
cc._RF.push(e, "65c61u12vpDkpmZq4R5uxfM", "battlestates");
var i = t("statemachine").state, s = (t("Utils"), t("enumcfg").enumgameflag), n = cc.Class({
extends: i,
init: function() {
this.statename = "statedie";
},
onEnter: function(t) {
this.target = this.statemachine.target;
this.target.flagdead = !0;
this.target.deadinthisframe = !0;
this.time = this.target.gamelogic.servertime + 3e4;
this.time2 = 30;
this.ispet = t;
},
onUpdate: function(t) {
if (this.ispet && !cc.battlelogic.player.isdead()) {
this.time2 -= t;
this.time2 <= 0 && this.target.reset();
}
}
}), a = cc.Class({
extends: i,
init: function() {
this.statename = "stateyinzhi";
},
onEnter: function(t) {
this.target = this.statemachine.target;
this.target.fangyuing = !1;
this.target.xuliing = !1;
this.time = t;
this.target.yingzhi = !0;
if (this.target.checkhasflat(s.hurtmag) && this.target.yctime > 0) this.needyc = !0; else {
this.needyc = !1;
this.target.yctime = 0;
}
},
onExit: function() {
if (this.target.isplayer && this.target.clickingmoveing) {
this.target.dir.x = this.target.gamelogic.uidir.x;
this.target.dir.y = this.target.gamelogic.uidir.y;
}
this.target.yingzhi = !1;
},
onUpdate: function(t) {
this.time -= t;
this.time <= 0 && this.target.resetstate();
this.needyc && this.target.updateyongchang(t);
}
}), o = cc.Class({
extends: i,
init: function() {
this.statename = "stateidle";
},
onEnter: function() {
this.target = this.statemachine.target;
this.target.yctime > 0 ? this.needyc = !0 : this.needyc = !1;
},
onUpdate: function(t) {
this.needyc && this.target.updateyongchang(t);
this.target.clickingmoveing && this.statemachine.switchToState("statemove");
}
}), c = cc.Class({
extends: i,
init: function() {
this.statename = "statemove";
},
onEnter: function() {
this.target = this.statemachine.target;
if (this.target.checkhasflat(s.movemag) && this.target.yctime > 0) this.needyc = !0; else {
this.target.yctime = 0;
this.needyc = !1;
}
},
onUpdate: function(t) {
if (this.target.clickingmoveing) {
this.needyc && this.target.updateyongchang(t);
this.target.domove(t);
} else this.statemachine.switchToState("stateidle");
}
}), r = cc.Class({
extends: i,
init: function() {
this.statename = "statefollowtarget";
},
onEnter: function(t) {
this.target = this.statemachine.target;
this.time = t.time;
this.tarx = t.x;
this.tary = t.y;
},
onUpdate: function(t) {
Math.abs(this.target.x - this.tarx) < 16 && Math.abs(this.target.y - this.tary) < 16 && (this.time /= 10);
this.time -= t;
this.time <= 0 ? this.target.resetstate() : this.target.domove(t);
}
}), l = cc.Class({
extends: i,
init: function() {
this.statename = "stateyongchang";
},
onEnter: function(t) {
this.target = this.statemachine.target;
this.target.setyc(t.time, t.skill);
this.target.checkhasflat(s.movemag) ? this.needmove = !0 : this.needmove = !1;
this.target.flagyongchang = !0;
},
onExit: function() {},
onUpdate: function(t) {
this.target.clickingmoveing && (this.needmove ? this.target.domove(t) : this.target.resetstate());
this.target.updateyongchang(t) && "stateyinzhi" != this.statemachine.getcurrentstatename() && this.target.resetstate();
}
});
e.exports = {
statedie: n,
stateyinzhi: a,
stateidle: o,
statemove: c,
statefollowtarget: r,
stateyongchang: l
};
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
statemachine: "statemachine"
} ],
buffcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "16dbe3EJahNCrqQkB3oax5t", "buffcfg");
var i = t("enumcfg"), s = i.enumskilltype, n = i.enumproperty, a = {
notatk: 1,
notmove: 2,
rush: 4,
rushnotarget: 8,
notani: 16,
beatkover: 32,
wudi: 64,
fying: 128,
bati: 256
}, o = {
1: {
buff_effect: a.notatk | a.notmove,
life: 3,
shadow: !0,
mohu: !0
},
2: {
buff_effect: 3,
life: 5,
res: "eff33"
},
3: {
count: 30,
life: 10,
icon: "buff1"
},
4: {
count: 50,
life: 5,
icon: "buff3"
},
5: {
buff_effect: a.rush,
life: 999,
removebullet: 1001,
rani: !0,
res: "eff43",
resfz: !0
},
6: {
buff_effect: a.rushnotarget | a.notmove,
life: .2,
rani: !0,
shadow: !0
},
7: {
life: 3,
mohu: !0,
timescale: .3
},
8: {
buff_effect: a.notatk | a.notmove | a.notani | a.beatkover,
life: 5,
icon: "buff3",
res: "eff47"
},
9: {
name: "中毒",
life: 3.1,
mdmg: 10,
hurttime: 1,
count: 10
},
10: {
name: "流血",
life: 3.1,
admg: 10,
hurttime: 1,
count: 10
},
11: {
name: "圣盾",
life: 10,
icon: "icons_full_16_205",
propertys: [ [ n.def + 100, 15 ], [ n.mdef + 100, 15 ] ]
},
12: {
name: "初级恢复",
life: 10,
res: "eff86",
aniduli: !0,
healpre: 3
},
13: {
name: "初级治疗",
life: .01,
res: "eff87",
aniduli: !0,
heal: 100
},
14: {
name: "boss圣盾",
life: 10,
icon: "icons_full_16_205",
propertys: [ [ n.def + 100, 100 ], [ n.mdef + 100, 100 ] ]
},
15: {
name: "圣盾",
life: 10,
icon: "icons_full_16_205",
propertys: [ [ n.def + 100, 30 ], [ n.mdef + 100, 30 ] ]
},
16: {
name: "恢复",
life: 10,
res: "eff86",
aniduli: !0,
healpre: 6
},
17: {
name: "治疗",
life: .01,
res: "eff87",
aniduli: !0,
heal: 200
},
1001: {
name: "刺骨极寒常驻",
count: 1,
life: 99999999,
hitskilltype: s.cold,
hitbuff: [ [ 2001, 100 ] ]
},
2001: {
name: "刺骨极寒",
count: 8,
life: 8,
icon: "buff4",
propertys: [ [ n.mdef + 100, -10 ] ]
},
1002: {
name: "致命深寒常驻",
count: 1,
life: 99999999,
buffdmgup: [ 2001, 100 ]
},
1003: {
name: "灼热地狱常驻",
count: 1,
life: 99999999,
hitskilltype: s.fire,
hitbuff: [ [ 2003, 70 ] ]
},
2003: {
name: "灼烧",
life: 8,
icon: "buff1",
mdmg: 100,
hurttime: 1,
count: 10,
hurtcreatebullet: [ 1004, 1001, 50, 5 ]
},
1004: {
name: "氧化燃烧常驻",
count: 1,
life: 99999999
},
1005: {
name: "静电场常驻",
count: 1,
life: 99999999,
hitskilltype: s.thunder,
buffaddgailv: [ 1006, 50 ],
hitbuff: [ [ 2005, 50 ] ]
},
2005: {
name: "静电场",
count: 4,
life: 10,
icon: "buff5",
savehurt: [ 24, 10 ],
beatkcreatebullet: [ 1006, 24, 15, 5 ]
},
1006: {
name: "聚雷针常驻",
count: 1,
life: 99999999
},
1007: {
name: "流血常驻",
count: 1,
life: 99999999,
hitskilltype: s.sword,
hitbuff: [ [ 2007, 100 ] ]
},
2007: {
name: "流血",
life: 3.1,
icon: "buff9",
admg: 10,
hurttime: 1,
count: 10
},
1008: {
name: "浴血奋战常驻",
count: 1,
life: 99999999,
buffdmgup: [ 2007, 100 ]
},
2008: {
name: "浴血奋战",
count: 10,
life: 3
},
1009: {
name: "荆棘皮肤常驻",
count: 1,
life: 99999999,
beatkfanshang: 500
},
1010: {
name: "物防为准",
count: 1,
life: 99999999,
onlywdef: 1,
fanshangxishou: !0
},
1011: {
name: "闪避时增加移动速度",
count: 1,
life: 99999999,
onmissbuff: [ 2011, 50 ]
},
2011: {
name: "闪避加移动速度",
icon: "buff8",
life: 3
},
3001: {
name: "闪避光环",
life: 1,
propertys: [ [ n.flee, 150 ] ],
res: "buff2",
resdown: 1
},
3002: {
name: "暴击光环",
life: 1,
propertys: [ [ n.cri, 30 ] ],
res: "buff3",
resdown: 1
},
3003: {
name: "吸血光环",
life: 1,
propertys: [ [ n.xixue, 30 ] ],
res: "buff5",
resdown: 1
},
3004: {
name: "命中光环",
life: 1,
propertys: [ [ n.hit, 150 ] ],
res: "buff4",
resdown: 1
},
3005: {
name: "回复光环",
life: 1,
healpre: 1,
res: "buff1",
resdown: 1
},
3006: {
name: "格挡",
life: 1,
dmgbili: .4,
needweapon: s.sword
},
3007: {
name: "神闪",
life: 1,
spshanbi: 1,
needweapon: s.bow
},
3008: {
name: "魔力暴走",
life: 1,
nocd: 15,
needweapon: s.staff,
deadbuff: 4007,
deadbuffcd: 10
},
10001: {
name: "治疗",
life: .01,
res: "eff87",
aniduli: !0,
heal: 500
},
10002: {
name: "每秒回血",
life: 99999999,
healpre: 1
},
10003: {
name: "猫鼬",
life: 3,
propertys: [ [ n.agi, 120 ] ]
},
10004: {
name: "灵狐",
life: 3,
propertys: [ [ n.dex, 120 ] ]
},
10005: {
name: "霸体",
life: 99999999,
buff_effect: a.bati
},
101: {
rotatemode: 1,
life: 1,
buff_effect: a.notatk
},
102: {
buff_effect: a.notatk | a.notmove | a.wudi | a.fying,
life: 3,
res: "eff85"
},
103: {
name: "闪光",
life: .01,
res: "eff88",
aniduli: !0
},
104: {
rotatemode: 1,
life: 1,
buff_effect: a.notatk,
propertys: [ [ n.movespeed + 100, 30 ] ]
},
4001: {
name: "自然之友",
count: 1,
life: 99999999,
firendbuff: 4002
},
4002: {
name: "自然之友",
count: 1,
life: 1.5,
propertys: [ [ n.matk + 100, 50 ], [ n.atk + 100, 50 ], [ n.def + 100, 50 ], [ n.mdef + 100, 50 ] ]
},
4003: {
name: "自然之友2",
count: 1,
life: 99999999,
firendbuff: 4004
},
4004: {
name: "自然之友2",
count: 1,
life: 1.5,
propertys: [ [ n.matk + 100, 100 ], [ n.atk + 100, 100 ], [ n.def + 100, 100 ], [ n.mdef + 100, 100 ] ]
},
4005: {
name: "兽王常驻",
count: 1,
life: 99999999,
cribuff: 4006
},
4006: {
name: "兽王暴伤",
count: 99999,
life: 8,
propertys: [ [ n.cridmg + 100, 10 ] ]
},
4007: {
buff_effect: a.wudi,
life: 3,
res: "eff93"
},
4008: {
name: "无视防御",
count: 1,
life: 99999999,
skipdef: !0
},
4009: {
name: "闪避时增加移动速度",
count: 1,
life: 99999999,
onmissbuff: [ 4010, 100 ]
},
4010: {
buff_effect: a.beatkover,
name: "闪避增加伤害",
count: 100,
life: 99999,
propertys: [ [ n.atk + 100, 20 ], [ n.matk + 100, 20 ] ]
},
4011: {
buff_effect: a.wudi,
life: 10
},
4012: {
name: "fenshen",
life: 1,
fenshen: 5,
needweapon: s.sword,
propertyszhuanshen: [ [ n.atk + 100, 80 ] ]
},
4013: {
name: "荆棘皮肤常驻",
count: 1,
life: 99999999,
beatkfanshang: 25e3
},
4014: {
name: "兽王常驻",
count: 1,
life: 99999999,
cribuff: 4015
},
4015: {
name: "兽王暴伤",
count: 99999,
life: 8,
propertys: [ [ n.cridmg + 100, 25 ] ]
},
4016: {
name: "闪避时增加移动速度",
count: 1,
life: 99999999,
onmissbuff: [ 4017, 100 ]
},
4017: {
buff_effect: a.beatkover,
name: "闪避增加伤害",
count: 1e8,
life: 99999,
propertys: [ [ n.atk + 100, 35 ], [ n.matk + 100, 35 ] ]
},
4018: {
name: "神技闪",
life: 1,
spshanbi2: 1,
needweapon: s.bow,
propertyszhuanshen: [ [ n.flee + 100, 100 ] ]
},
4019: {
name: "法神技",
life: 1,
needweapon: s.staff,
autochange: 1,
propertyszhuanshen: [ [ n.maxhp + 100, 50 ] ]
}
};
e.exports = {
buffcfg: o,
effenum: a
};
cc._RF.pop();
}, {
enumcfg: "enumcfg"
} ],
buffobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "84d48Fv9aVDyb5VgiYRgElM", "buffobj");
var i = t("buffcfg"), s = i.buffcfg, n = i.effenum, a = t("Utils");
t("enumcfg").enumskilltype;
e.exports = function() {
this.init = function(t, e, i, n, a, o, c) {
this.skill = n;
this.target = e;
this.atker = o;
this.bid = t;
this.cfg = s[t];
this.buff_effect = this.cfg.buff_effect;
i || (i = this.cfg.life);
this.life = i;
this.maxlife = this.life;
this.timearr = [];
this.nowcount = 1;
this.dir = {
x: 0,
y: 0
};
this.toucan = c;
this.lv = 1;
this.hurttimenow = 0;
this.hurttime = this.cfg.hurttime;
this.totoalhurt = 0;
this.cfg.beatkfanshang && (this.fanshang = this.cfg.beatkfanshang / 100);
this.cfg.vitkillhp && (this.khp = this.cfg.vitkillhp);
this.isnew = !0;
this.timearr.push(cc.battlelogic.servertime + 1e3 * this.maxlife);
this.onlywdef = this.cfg.onlywdef;
this.cribuff = this.cfg.cribuff;
this.sectime = 0;
this.firendbuff = this.cfg.firendbuff;
this.fsxs = this.cfg.fanshangxishou;
if (this.cfg.dmgbili) {
this.needweapon = this.cfg.needweapon;
this.dmgbili = this.cfg.dmgbili;
this.checkweapondmg();
}
if (this.cfg.spshanbi) {
this.needweapon = this.cfg.needweapon;
this.spshanbi = !0;
this.checkshanbi();
}
if (this.cfg.nocd) {
this.target.deadcheck = !0;
this.needweapon = this.cfg.needweapon;
this.nocd = this.cfg.nocd;
this.deadbufftime = 0;
this.deadbuffcd = this.cfg.deadbuffcd;
this.deadbuff = this.cfg.deadbuff;
this.checknocd(0);
}
if (this.cfg.spshanbi2) {
this.needweapon = this.cfg.needweapon;
this.spshanbi2 = !0;
this.checkshanbi2();
}
if (this.cfg.autochange) {
this.needweapon = this.cfg.needweapon;
this.autochange = !0;
this.changecd = 0;
}
this.doadd();
};
this.dodeadcheck = function() {
if (this.deadbuff && this.target.atkskillcfg && 0 != (this.target.atkskillcfg.stype & this.needweapon) && this.deadbufftime <= 0) {
this.target.hp = 1;
this.deadbufftime = this.deadbuffcd;
this.target.addbuff(this.deadbuff, 100, 1);
}
};
this.checkchangeweapon = function(t) {
if (this.autochange) if (this.changecd > 0) this.changecd -= t; else if (this.target.atkskillcfg && 0 != (this.target.atkskillcfg.stype & this.needweapon)) {
for (var e = !0, i = 1; i < this.target.skillarr.length; i++) if (this.target.skillarr[i].nowtime <= 0) {
e = !1;
break;
}
e && this.target.ckickweapon();
this.changecd = .5;
}
};
this.checknocd = function(t) {
if (this.nocd) {
this.deadbufftime -= t;
this.target.atkskillcfg && 0 != (this.target.atkskillcfg.stype & this.needweapon) ? this.target.nocd = this.cfg.nocd : this.target.nocd = 0;
}
};
this.checkshanbi = function() {
this.spshanbi && (this.target.atkskillcfg && 0 != (this.target.atkskillcfg.stype & this.needweapon) ? this.target.allmiss = !0 : this.target.allmiss = !1);
};
this.checkshanbi2 = function() {
this.spshanbi2 && (this.target.atkskillcfg && 0 != (this.target.atkskillcfg.stype & this.needweapon) ? this.target.allmiss2 = !0 : this.target.allmiss2 = !1);
};
this.checkweapondmg = function() {
this.dmgbili && (this.target.atkskillcfg && 0 != (this.target.atkskillcfg.stype & this.needweapon) ? this.target.dmgbili = this.dmgbili : this.target.dmgbili = 1);
};
this.refreshtime = function(t) {
t || (t = this.cfg.count);
if (this.nowcount < t) {
this.nowcount++;
this.timearr.push(cc.battlelogic.servertime + 1e3 * this.maxlife);
this.addstate();
}
this.life = this.maxlife;
if (this.cfg.savehurt && this.nowcount >= t) {
cc.battlelogic.createonebullet({
fixdmg: this.totoalhurt,
tscount: this.cfg.savehurt[1]
}, this.cfg.savehurt[0], this.target.x, this.target.y, cc.v2(0, 1), this.atker);
this.totoalhurt;
this.life = 0;
}
};
this.doadd = function() {
var t = this.buff_effect;
if (t) {
t & n.notmove && this.target.notmovecount++;
t & n.notatk && this.target.notatkcount++;
t & n.notani && this.target.notanicount++;
t & n.wudi && this.target.wudicount++;
t & n.bati && this.target.baticount++;
t & n.fying && (this.target.fying = !0);
if (t & n.rush) {
this.target.notmovecount++;
this.rushmode = !0;
this.enemy = cc.battlelogic.findnpcwithcmp(this.target, this.target.enemycamp, !0)[0];
}
if (t & n.rushnotarget) {
this.target.notmovecount++;
this.dashmode = !0;
this.dir.x = this.target.dir.x;
this.dir.y = this.target.dir.y;
}
}
if (this.cfg.timescale) {
this.target.timescale = 1 / this.cfg.timescale;
cc.kSpeed(this.cfg.timescale);
}
this.khp && (this.target.fanshangkill += this.khp);
this.cfg.heal && this.target.heal(this.target.matk * this.cfg.heal / 100 * this.target.healdmg);
null != this.onlywdef && (this.target.onlywdef = !0);
null != this.fsxs && (this.target.fsxs = !0);
this.cfg.skipdef && this.target.skipdef++;
this.addstate();
};
this.addstate = function() {
if (this.cfg.propertys) {
for (var t = 0; t < this.cfg.propertys.length; t++) {
var e = this.cfg.propertys[t];
this.target.gamevaule.addpv(e[0], e[1]);
}
this.target.shuxingrefresh();
}
if (this.cfg.propertyszhuanshen) {
for (t = 0; t < this.cfg.propertyszhuanshen.length; t++) {
e = this.cfg.propertyszhuanshen[t];
this.target.gamevaule.addpv(e[0], e[1] * this.target.zhuanshen);
}
this.target.shuxingrefresh();
}
};
this.doremove = function() {
var t = this.buff_effect;
if (t) {
t & n.notmove && this.target.notmovecount--;
t & n.notatk && this.target.notatkcount--;
t & n.notani && this.target.notanicount--;
if (t & n.rush) {
this.target.notmovecount--;
this.rushmode = !1;
}
if (t & n.rushnotarget) {
this.target.notmovecount--;
this.dashmode = !1;
}
t & n.wudi && this.target.wudicount--;
t & n.bati && this.target.baticount--;
if (t & n.fying) {
this.target.fying = !1;
if (a.randintSeed(100) < this.toucan) {
this.target.flagbuzhuo2 = !0;
cc.battlelogic.createeff({
eff: "card",
x: this.target.x,
y: this.target.y,
ground: !0,
time: .6,
ani: {
type: 1,
s: 1,
u: -5,
wait: .4
}
});
} else if (a.randintSeed(100) < 50) {
cc.uiHelper.showTips("宝宝逃跑了...");
cc.soundMgr.playSound("run");
this.target.flagdead2 = !0;
}
}
}
this.cfg.removebullet && cc.battlelogic.createbulletsground(this.skill, [ [ this.cfg.removebullet, 0, 0 ] ], this.target, this.target);
if (this.cfg.timescale) {
this.target.timescale = 1;
cc.kSpeed(1);
}
this.khp && (this.target.fanshangkill -= this.khp);
if (this.cfg.propertys) {
for (var e = 0; e < this.cfg.propertys.length; e++) {
var i = this.cfg.propertys[e];
this.target.gamevaule.addpv(i[0], -i[1] * this.nowcount);
}
this.target.shuxingrefresh();
}
if (this.cfg.propertyszhuanshen) {
for (e = 0; e < this.cfg.propertyszhuanshen.length; e++) {
i = this.cfg.propertyszhuanshen[e];
this.target.gamevaule.addpv(i[0], -i[1] * this.target.zhuanshen);
}
this.target.shuxingrefresh();
}
this.dmgbili && (this.target.dmgbili = 1);
this.spshanbi && (this.target.allmiss = !1);
this.spshanbi2 && (this.target.allmiss2 = !1);
this.nocd && (this.target.nocd = 0);
null != this.onlywdef && (this.target.onlywdef = !1);
null != this.fsxs && (this.target.fsxs = !1);
this.cfg.skipdef && this.target.skipdef--;
};
this.update = function(t) {
this.checkweapondmg();
this.checkshanbi();
this.checkshanbi2();
this.checknocd(t);
this.checkchangeweapon(t);
this.isnew = !1;
this.life -= t;
if (this.life <= 0) {
this.doremove();
return !0;
}
this.sectime += t;
if (this.sectime > 1) {
this.sectime = 0;
this.cfg.healpre && this.target.hp < this.target.maxhp && this.target.heal(this.target.maxhp * this.cfg.healpre / 100);
if (this.firendbuff) for (var e = cc.battlelogic.findnpcwithcmp(this.target, this.target.camp, !1), i = 0; i < e.length; i++) e[i] != this.target && e[i].addbuff(this.firendbuff, 100, 1);
}
if (this.rushmode) {
var s = this.enemy.x - this.target.x, n = this.enemy.y - this.target.y;
if (s * s + n * n < 400) this.life = 0; else {
this.target.dir.x = s;
this.target.dir.y = n;
this.target.dir.normalizeSelf();
this.target.realmove(t, this.target.dir, 500, !0);
}
}
this.dashmode && this.target.realmove(t, this.dir, 500, !0);
if (this.nowcount > 1 && cc.battlelogic.servertime > this.timearr[0]) {
this.nowcount--;
if (this.cfg.propertys) {
for (i = 0; i < this.cfg.propertys.length; i++) {
var o = this.cfg.propertys[i];
this.target.gamevaule.addpv(o[0], -o[1]);
}
this.target.shuxingrefresh();
}
this.timearr.splice(0, 1);
}
if (this.hurttime) {
this.hurttimenow += t;
if (this.hurttimenow > this.hurttime) {
this.hurttimenow = 0;
var c = 0;
this.cfg.mdmg ? c = this.nowcount * this.cfg.mdmg * this.atker.matk / 100 : this.cfg.admg && (c = this.nowcount * this.cfg.admg * this.atker.atk / 100);
if (c > 0) {
this.target.kouxue(c);
if (this.cfg.hurtcreatebullet) {
var r = this.cfg.hurtcreatebullet[0];
if (h = this.atker.hasbuff(r)) {
var l = this.cfg.hurtcreatebullet[1];
(p = this.cfg.hurtcreatebullet[2] + this.cfg.hurtcreatebullet[3] * h.lv) >= a.randintSeed(100) && cc.battlelogic.createonebullet({
fixdmg: 10 * c
}, l, this.target.x, this.target.y, cc.v2(0, 1), this.atker);
}
}
if (this.cfg.hurtatkeraddbuff) {
var h;
r = this.cfg.hurtatkeraddbuff[0];
if (h = this.atker.hasbuff(r)) {
r = this.cfg.hurtatkeraddbuff[1];
var p = this.cfg.hurtatkeraddbuff[2];
this.atker.addbuff(r, p, h.lv);
}
}
}
}
}
return !1;
};
this.doatk = function(t, e, i, s) {
var n = 0, o = 0;
s && this.cribuff && (o = this.cribuff);
if (this.cfg.hitbuff) {
var c = !0, r = this.cfg.hitskilltype;
r && (t.cfg.stype && 0 != (r & t.cfg.stype) || (c = !1));
if (c) {
var l = 0, h = this.cfg.buffaddgailv;
h && this.target.hasbuff(h[0]) && (l = h[1]);
for (var p = 0; p < this.cfg.hitbuff.length; p++) {
var d = this.cfg.hitbuff[p];
e.push({
id: d[0],
chance: d[1] + l,
lv: this.lv
});
}
}
}
if (this.cfg.buffdmgup) {
var u = this.cfg.buffdmgup[0], f = i.hasbuff(u);
f && (n = this.cfg.buffdmgup[1] / 100 * f.nowcount);
}
this.cfg.fenshen && !this.target.isfenshen && a.randintSeed(100) < this.cfg.fenshen && this.dofenshen();
return {
buffdmgup: n,
addbuff: o
};
};
this.dofenshen = function() {
if (this.target.atkskillcfg && 0 != (this.target.atkskillcfg.stype & this.cfg.needweapon)) {
var t = cc.battlelogic.createnpc({
camp: this.target.camp,
lv: this.target.lv,
x: this.target.x - 30 + a.randintSeed(60),
y: this.target.y - 30 + a.randintSeed(60),
fenshen: this.target
});
cc.battlelogic.playerarr.push(t);
}
};
this.beatk = function(t, e) {
this.cfg.savehurt && (this.totoalhurt += 5 * t);
if (this.cfg.beatkcreatebullet) {
var i = this.cfg.beatkcreatebullet[0], s = this.atker.hasbuff(i);
if (s) {
var o = this.cfg.beatkcreatebullet[1];
this.cfg.beatkcreatebullet[2] + this.cfg.beatkcreatebullet[3] * s.lv >= a.randintSeed(100) && cc.battlelogic.createonebullet({
fixdmg: t,
tscount: 10
}, o, this.target.x, this.target.y, cc.v2(0, 1), this.atker);
}
}
if (this.fanshang) {
var c = this.target.vatk * this.fanshang;
e.kouxue(c);
this.target.fsxs && this.target.heal(Math.floor(c / 10));
e.isdead() && this.target.fanshangkill > 0 && this.target.heal(this.target.fanshangkill / 100 * this.target.maxhp);
}
this.buff_effect & n.beatkover && !this.isnew && (this.life = 0);
};
this.domiss = function(t, e) {
this.cfg.onmissbuff && e.push({
id: this.cfg.onmissbuff[0],
chance: this.cfg.onmissbuff[1],
lv: this.lv
});
};
};
cc._RF.pop();
}, {
Utils: "Utils",
buffcfg: "buffcfg",
enumcfg: "enumcfg"
} ],
bulletcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "d7c12BjhoZO/byMz0IsUA+S", "bulletcfg");
e.exports = {
1: {
life: 3,
width: 10,
height: 10,
type: 1,
speed: 300,
icon: "ArrowNormal_0",
sound: "bow1"
},
2: {
life: 3,
width: 10,
height: 10,
type: 1,
speed: 300,
icon: "ArrowNormal_0",
rotspeed: 5,
isfollow: !0,
rotatemode: 1,
sound: "bow1"
},
3: {
life: 3,
width: 10,
height: 10,
type: 1,
speed: 300,
rotspeed: 5,
icon: "ArrowFireS_0",
sound: "bow1"
},
4: {
life: 3,
width: 10,
height: 10,
type: 1,
speed: 300,
rotspeed: 5,
icon: "ArrowFireS_0",
chufamode: !0,
hitbullet: 1001,
sound: "bow1"
},
5: {
life: 3,
width: 10,
height: 10,
type: 1,
speed: 300,
rotspeed: 5,
icon: "ArrowFireS_0",
chufamode: !0,
hitbullet: 1001,
sound: "bow1"
},
6: {
life: .6,
width: 50,
height: 50,
type: 1,
speed: 0,
notdestroy: !0,
atktime: 9999,
sleeptime: .5,
addani: "eff7",
sound: "sword"
},
7: {
life: 10,
anilife: 10,
width: 120,
height: 120,
type: 1,
speed: 0,
notdestroy: !0,
atktime: .5,
flowuser: !0,
addani: "eff13"
},
8: {
life: 1,
atktime: 2,
width: 120,
height: 120,
type: 1,
speed: 0,
notdestroy: !0,
flowuser: !0,
addani: "eff25",
aniduli: !0
},
9: {
life: 1.5,
width: 10,
height: 10,
type: 1,
speed: 300,
icon2w: 1,
rotatemode: 2
},
10: {
life: 3,
width: 10,
height: 10,
type: 1,
speed: 300,
icon2w: 1,
atktime: .2,
notdestroy: !0,
atkbullet: 1003,
rotatemode: 2,
iconup: 1,
skiphittest: !0
},
11: {
life: 10,
atktime: .3,
width: 120,
height: 120,
type: 1,
speed: 0,
notdestroy: !0,
flowuser: !0,
addani: "eff42",
anilife: 10,
rotatemode: 2,
iconup: 1
},
12: {
life: 3,
width: 10,
height: 10,
type: 1,
speed: 300,
chufamode: !0,
hitbullet: 1002,
icon: "b2",
rotatemode: 2,
selfrotspeed: 100
},
13: {
life: .1,
width: 10,
height: 10,
type: 3,
speed: 0,
addani: "eff44",
aniduli: !0
},
14: {
life: .1,
width: 10,
height: 10,
type: 3,
speed: 0,
addani: "eff45",
aniduli: !0
},
15: {
life: 10,
width: 110,
height: 10,
type: 2,
speed: 0,
addani: "eff46",
notdestroy: !0,
atktime: .1,
anilife: 10,
anirot2icon: 1
},
16: {
life: .1,
width: 10,
height: 10,
type: 3,
speed: 0,
addani: "eff48",
aniduli: !0
},
17: {
life: .1,
width: 40,
height: 110,
type: 2,
speed: 0,
addani: "eff10",
notdestroy: !0,
atktime: .4,
anirot2icon: 1,
aniduli: !0,
rotxiuzheng: 1
},
18: {
life: .25,
width: 70,
height: 240,
type: 2,
speed: 0,
addani: "eff30",
notdestroy: !0,
atktime: .1,
anirot2icon: 1,
aniduli: !0,
rotxiuzheng: 1
},
19: {
life: .3,
width: 50,
height: 50,
type: 1,
speed: 0,
atktime: .5
},
20: {
life: 1,
width: 50,
height: 50,
type: 1,
speed: 0,
notdestroy: !0,
atktime: 999,
sleeptime: .5,
addani: "eff32"
},
21: {
life: 8,
width: 40,
height: 40,
type: 1,
speed: 100,
atktime: .07,
notdestroy: !0,
atkbullet: 22,
rotatemode: 2,
icon: "b4",
skiphittest: !0,
autodir2: 300,
iconup: 1,
centermode: 1,
selfrotspeed: -300,
buffspeed0: 1002
},
22: {
life: 2,
width: 10,
height: 10,
type: 1,
speed: 300,
icon: "b3",
hitres: "eff81",
sound: "bow2"
},
23: {
life: 2,
width: 50,
height: 50,
type: 4,
speed: 0,
notdestroy: !0,
atktime: .1,
aniduli: !0,
addani: "eff49",
aniwidth: 280
},
24: {
life: 2,
width: 50,
height: 50,
type: 4,
speed: 0,
notdestroy: !0,
atktime: .1,
aniduli: !0,
addani: "eff49",
aniwidth: 280
},
25: {
life: 3,
width: 100,
height: 100,
type: 1,
speed: 0,
addani: "eff50",
notdestroy: !0,
atktime: 5,
aniduli: !0
},
26: {
life: .1,
width: 10,
height: 10,
type: 3,
speed: 0,
addani: "eff51",
aniduli: !0
},
27: {
life: .15,
width: 70,
height: 280,
type: 2,
speed: 0,
addani: "eff8",
notdestroy: !0,
atktime: 30.1,
anirot2icon: 1,
aniduli: !0,
rotxiuzheng: 1
},
28: {
life: 8,
width: 40,
height: 40,
type: 1,
speed: 100,
atktime: .035,
notdestroy: !0,
atkbullet: 22,
rotatemode: 2,
icon: "b4",
skiphittest: !0,
autodir2: 300,
iconup: 1,
centermode: 1,
selfrotspeed: -300,
buffspeed0: 1002
},
1001: {
life: .5,
width: 64,
height: 64,
notdestroy: !0,
type: 1,
speed: 0,
rotspeed: 5,
addani: "eff41",
aniduli: !0
},
1002: {
life: 6,
width: 150,
height: 150,
notdestroy: !0,
atktime: .3,
type: 1,
speed: 0,
shader: 1,
icon: "b1",
rotatemode: 2,
selfrotspeed: 100
},
1003: {
life: .5,
width: 64,
height: 64,
notdestroy: !0,
type: 1,
speed: 0,
rotspeed: 5,
addani: "eff41",
aniduli: !0,
atktime: 99
},
1004: {
life: .5,
width: 64,
height: 64,
notdestroy: !0,
type: 1,
speed: 0,
rotspeed: 5,
addani: "eff69",
aniduli: !0
},
1e4: {
life: .5,
width: 100,
height: 100,
type: 1,
speed: 0
},
2001: {
life: 1,
width: 50,
height: 50,
type: 1,
speed: 0,
skiphittest: !0,
addani: "eff31",
lifebullet: 2006
},
2002: {
life: 1,
width: 70,
height: 70,
type: 1,
speed: 0,
addani: "eff33",
aniduli: !0
},
2003: {
life: 3,
width: 40,
height: 40,
type: 1,
speed: 100,
atktime: .15,
notdestroy: !0,
atkbullet: 22,
rotatemode: 2,
icon: "b4",
skiphittest: !0,
autodir2: 300,
iconup: 1,
centermode: 1,
selfrotspeed: -300
},
2004: {
life: 2,
width: 30,
height: 30,
type: 1,
speed: 100,
icon: "b6",
notdestroy: !0,
atktime: .3,
centermode: !0,
lifebullet: 2002,
dirspeed: 50,
rotatemode: 1
},
2005: {
flowbullet: !0,
life: 3,
width: 25,
height: 25,
type: 1,
speed: 120,
addani: "eff79",
centermode: !0,
hitres: "eff33"
},
2006: {
life: 1,
width: 50,
height: 50,
type: 1,
speed: 0,
addani: "eff80",
aniduli: !0
},
2007: {
flowbullet: !0,
life: 3,
width: 50,
height: 50,
type: 1,
speed: 120,
addani: "eff84",
centermode: !0
},
2008: {
life: 1,
width: 50,
height: 50,
type: 1,
speed: 0,
notdestroy: !0,
atktime: 999,
sleeptime: .5,
addani: "eff32",
warning: 1
},
2009: {
flowbullet: !0,
life: 3,
width: 50,
height: 50,
type: 1,
speed: 80,
addani: "eff82",
centermode: !0,
rotspeed: 5,
isfollow: !0
},
2010: {
life: 3,
width: 10,
height: 10,
type: 1,
speed: 150,
notdestroy: !0,
atktime: .3,
lifebullet: 1004,
dirspeed: 100,
rotatemode: 1,
addani: "eff61",
flowbullet: !0
},
2011: {
life: .6,
width: 10,
height: 10,
type: 1,
speed: 300,
skiphittest: !0,
icon: "",
lifebullet: 1001,
warning2: 2,
warning2size: 64
},
2012: {
flowbullet: !0,
life: 3,
width: 30,
height: 30,
type: 1,
speed: 120,
addani: "eff78",
hitres: "eff41"
},
2013: {
life: 2,
width: 10,
height: 10,
type: 1,
speed: 300,
atktime: .2,
notdestroy: !0,
atkbullet: 2014,
skiphittest: !0
},
2014: {
life: .5,
width: 50,
height: 50,
notdestroy: !0,
type: 1,
speed: 0,
rotspeed: 5,
addani: "eff14",
aniduli: !0,
atktime: 99
},
2015: {
life: 3,
width: 100,
height: 100,
type: 1,
speed: 0,
addani: "eff50",
notdestroy: !0,
atktime: 5,
aniduli: !0,
warning: 2
},
2016: {
flowbullet: !0,
life: 3,
width: 30,
height: 30,
type: 1,
speed: 100,
addani: "eff78",
hitres: "eff89"
},
2017: {
flowbullet: !0,
life: 3,
width: 30,
height: 30,
type: 1,
speed: 100,
icon: "b3",
hitres: "eff48"
},
2018: {
flowbullet: !0,
life: 3,
width: 30,
height: 30,
type: 1,
speed: 100,
icon: "b7",
hitres: "eff83",
rotatemode: 2,
selfrotspeed: 500
},
2019: {
life: .1,
width: 50,
height: 50,
type: 1,
speed: 0,
notdestroy: !0,
atktime: .3,
addani: "eff69",
aniduli: !0,
warning: 1.5
},
3001: {
life: 5,
atktime: .3,
width: 120,
height: 120,
type: 1,
speed: 0,
notdestroy: !0,
flowuser: !0,
addani: "eff42",
anilife: 5,
rotatemode: 2,
iconup: 1
},
10005: {
life: 3,
width: 10,
height: 10,
type: 1,
speed: 300,
icon: "b5",
rotspeed: 5,
isfollow: !0,
rotatemode: 1,
movedelay: .5
},
10006: {
life: .1,
width: 50,
height: 50,
type: 1,
speed: 0,
notdestroy: !0,
atktime: .3,
addani: "eff69",
aniduli: !0
},
10007: {
life: 1,
width: 50,
height: 50,
type: 1,
speed: 0,
notdestroy: !0,
atktime: 999,
sleeptime: .5,
addani: "eff75"
},
10008: {
life: 1.5,
atktime: .3,
width: 520,
height: 520,
type: 1,
speed: 0,
notdestroy: !0,
flowuser: !0
}
};
cc._RF.pop();
}, {} ],
bulletdisplay: [ function(t, e) {
"use strict";
cc._RF.push(e, "c0bf0J/NlVDtIQ+HckH+yp7", "bulletdisplay");
var i = t("Utils");
cc.Class({
extends: cc.Component,
properties: {
sp_bullet: {
default: null,
type: cc.Sprite
},
nd_test: {
default: null,
type: cc.Node
}
},
initdata: function(t) {
if (cc.battledebug) {
this.nd_test.width = t.width;
this.nd_test.height = t.height;
this.nd_test.active = !0;
this.nd_test.anchorX = .5;
t.rotateuser && (this.nd_test.anchorX = 0);
} else this.nd_test.active = !1;
this.notpos = !1;
this.updatepos = !0;
this.anind = null;
this.halfwidth = t.width / 2;
this.node.ctrl = this;
this.ldata = t;
var e = t.cfg;
this.cfg = e;
this.selfrotspeed = 1e3;
e.selfrotspeed && (this.selfrotspeed = e.selfrotspeed);
if (e.centermode) {
this.sp_bullet.node.y = 0;
this.sp_bullet.node.anchorX = .5;
} else {
this.sp_bullet.node.anchorX = 1;
this.sp_bullet.node.y = t.height / 2;
}
e.sound && cc.soundMgr.playSound(e.sound);
this.sp_bullet.spriteFrame = null;
this.sp_bullet.node.scale = 1;
if (e.icon) {
var s = this;
cc.resources.load("icons/bullet/" + e.icon, cc.SpriteFrame, function(t, e) {
!t && s.isValid && (s.sp_bullet.spriteFrame = e);
});
} else if (e.icon2w) {
this.sp_bullet.node.scale = 1.5;
s = this;
cc.resources.load("icons/items/" + this.ldata.user.wicon, cc.SpriteFrame, function(t, e) {
!t && s.isValid && (s.sp_bullet.spriteFrame = e);
});
}
this.plusy = 0;
this.node.angle = i.getanglebydir(this.ldata.dir) - 90;
if (e.addani && 4 != e.type) {
var n = cc.gameMgr.resmgr.createeff(e.addani, e.anilife);
n.angle = n.ctrl.agplus;
if (e.flowbullet) {
n.x = n.y = 0;
e.centermode || (n.y += e.width / 2);
n.ctrl.lifetime = e.life;
this.node.addChild(n);
this.updatepos = !1;
} else {
n.x = this.ldata.x;
n.y = this.ldata.y;
cc.gameMgr.ndeff.addChild(n);
}
this.plusy = n.ctrl.anioffy;
n.y += this.plusy;
this.anind = n;
e.anirot2icon && (n.angle = this.node.angle);
if (e.rotxiuzheng) {
n.angle += 90;
var a = .5 * t.height;
n.x = n.x - a * this.ldata.dir.x;
n.y = n.y - a * this.ldata.dir.y;
this.updatepos = !1;
}
}
1 == e.shader && cc.gameMgr.resmgr.effxuanwo(this.ldata.x, this.ldata.y);
if (this.cfg.iconup) {
this.node.zIndex = 1;
cc.gameMgr.ndeff.addChild(this.node);
} else {
this.node.zIndex = 0;
cc.gameMgr.ndbullet.addChild(this.node);
}
},
doupdate: function(t) {
if (this.ldata.nowline) {
var e = this.ldata.nowline.p1, s = this.ldata.nowline.p2, n = cc.gameMgr.resmgr.createeff(this.cfg.addani);
n.x = (e.x + s.x) / 2;
n.y = (e.y + s.y) / 2;
n.angle = i.getanglebydir(cc.v2(e.x - s.x, e.y - s.y));
n.scaleX = i.getdistance(e, s) / this.cfg.aniwidth;
cc.gameMgr.ndeff.addChild(n);
this.ldata.nowline = null;
}
this.anind && !this.anind.isValid && (this.anind = null);
if (!this.ldata.alive) {
if (this.anind && !this.ldata.cfg.aniduli) {
this.anind.ctrl.lifetime = 0;
this.anind = null;
}
return !0;
}
1 == this.ldata.cfg.rotatemode ? this.node.angle = i.getanglebydir(this.ldata.dir) - 90 : 2 == this.ldata.cfg.rotatemode && (this.node.angle = this.node.angle - t * this.selfrotspeed);
if (this.anind && this.updatepos) {
this.anind.x = this.ldata.x;
this.anind.y = this.ldata.y;
this.anind.y += this.plusy;
if (this.ldata.rotateuser) {
this.node.angle = i.getanglebydir(this.ldata.dir);
this.anind.angle = this.node.angle;
this.anind.x = this.anind.x + this.halfwidth * this.ldata.dir.x;
this.anind.y = this.anind.y + this.halfwidth * this.ldata.dir.y;
}
}
this.node.x = this.ldata.x;
this.node.y = this.ldata.y;
return !1;
}
});
cc._RF.pop();
}, {
Utils: "Utils"
} ],
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
cellbag: [ function(t, e) {
"use strict";
cc._RF.push(e, "367b58Mp8dHCLBQeuRxc9jH", "cellbag");
t("viewCell");
var i = t("gameConfig").itemConfig, s = t("enumcfg").qulitycolor;
cc.Class({
extends: cc.viewCell,
properties: {
nd_items: {
default: [],
type: cc.Node
}
},
init: function(t, e) {
if (t >= e.array.length) this.node.active = !1; else {
this.target = e.target;
for (var i = e.array[t], s = 0; s < i.length; s++) {
this.isinit || this.nd_items[s].on(cc.Node.EventType.TOUCH_END, this.touchitem, this);
if (i[s]) {
this.nd_items[s].getChildByName("nd_eq").active = 1 == i[s].bs;
this.nd_items[s].getChildByName("nd_chose").active = !1;
this.nd_items[s].itemdata = i[s];
this.nd_items[s].active = !0;
this.refreshone(i[s], this.nd_items[s]);
} else {
this.nd_items[s].active = !1;
this.nd_items[s].itemdata = null;
}
}
this.target.choseditem && this.refrehclick(this.target.choseditem);
this.isinit = !0;
}
},
refrehclick: function(t) {
for (var e = 0; e < this.nd_items.length; e++) {
var i = this.nd_items[e].getChildByName("nd_chose"), s = this.nd_items[e].getChildByName("lb_count").getComponent(cc.Label);
if (this.nd_items[e].itemdata && this.nd_items[e].itemdata.uuid == t.uuid) {
if (t.lv) {
s.node.active = !0;
s.string = "+" + t.lv;
} else s.node.active = !1;
i.active = !0;
var n = this.nd_items[e].itemdata.qulity;
n || (n = 1);
var a = this, o = this.nd_items[e].getComponent(cc.Sprite);
cc.resources.load("icons/items/pz" + n, cc.SpriteFrame, function(t, e) {
!t && a.isValid && (o.getComponent(cc.Sprite).spriteFrame = e);
});
} else i.active = !1;
}
},
touchitem: function(t) {
var e = t.target.itemdata;
if (e) if (this.target.fmid) cc.uimain.createiteminfo(e, this.target.fmid, 3, t.target); else if (this.target.tiejiangmode) cc.Notifier.emit("clickequip", e); else if (null != this.target.itempos) cc.uimain.createiteminfo(e, this.target.itempos, 2, t.target); else if (this.target.ronglumode) cc.uimain.createiteminfo(e, null, 5, t.target); else if (1 == this.target.bankmode) cc.uimain.createiteminfo(e, null, 6, t.target); else if (2 == this.target.bankmode) cc.uimain.createiteminfo(e, null, 7, t.target); else if (this.target.sellmode) {
var i = s[e.qulity];
cc.uimain.createnormalinfo(e.cfg.name, "售价:" + Math.floor(e.cfg.cost / 2), "出售", "sellitem", e, i);
} else if (1 == e.cfg.type || 2 == e.cfg.type) cc.uimain.createiteminfo(e, null, 4, t.target); else if (3 == e.cfg.type) {
var n = void 0, a = "确定", o = e.cfg.subtype;
if (2 == o || 3 == o || 4 == o || 5 == o || 6 == o) {
n = "useitem";
a = "使用";
}
i = s[e.qulity];
cc.uimain.createnormalinfo(e.cfg.name, e.cfg.des, a, n, e, i);
}
},
refreshone: function(t, e) {
var s = t.qulity;
s || (s = 1);
var n = e.getChildByName("icon").getComponent(cc.Sprite), a = e.getComponent(cc.Sprite), o = e.getChildByName("lb_count").getComponent(cc.Label), c = e.getChildByName("nd_lock");
if (t.lv) {
o.node.active = !0;
o.string = "+" + t.lv;
} else if (3 == t.cfg.type) {
o.node.active = !0;
o.string = "x" + t.count;
} else o.node.active = !1;
t.suoding ? c.active = !0 : c.active = !1;
cc.resources.load("icons/items/" + i[t.id].icon, cc.SpriteFrame, function(t, e) {
t || (n.getComponent(cc.Sprite).spriteFrame = e);
});
cc.resources.load("icons/items/pz" + s, cc.SpriteFrame, function(t, e) {
t || (a.getComponent(cc.Sprite).spriteFrame = e);
});
}
});
cc._RF.pop();
}, {
enumcfg: "enumcfg",
gameConfig: "gameConfig",
viewCell: "viewCell"
} ],
cellequipskill: [ function(t, e) {
"use strict";
cc._RF.push(e, "10e63Gn1hpDCpEC26FGcrUe", "cellequipskill");
t("viewCell");
t("Utils");
var i = t("skillcfg");
cc.Class({
extends: cc.viewCell,
properties: {
lb_name: {
default: null,
type: cc.Label
},
lb_des: {
default: null,
type: cc.Label
},
sp_icon: {
default: null,
type: cc.Sprite
}
},
init: function(t, e) {
if (t >= e.array.length) this.node.active = !1; else {
this.target = e.target;
this.sid = e.array[t];
var s = i[this.sid], n = s.icon;
this.lb_name.string = s.name;
this.lb_des.string = s.des;
var a = this;
cc.resources.load("icons/skills/" + n, cc.SpriteFrame, function(t, e) {
t || (a.sp_icon.spriteFrame = e);
});
}
},
onclick: function() {
if (cc.playerData.player.equipskill(this.sid, this.target.skillidx)) {
cc.Notifier.emit("refreshskill");
this.target.node.destroy();
} else cc.uiHelper.showTips("不能重复装备");
}
});
cc._RF.pop();
}, {
Utils: "Utils",
skillcfg: "skillcfg",
viewCell: "viewCell"
} ],
cellfm: [ function(t, e) {
"use strict";
cc._RF.push(e, "780f8LVWGhDOoNkEFbxDJIV", "cellfm");
t("viewCell");
var i = t("Utils"), s = t("fumocfg"), n = t("enumcfg"), a = n.typename, o = n.enumpropertyname, c = n.qulitycolor, r = t("gameConfig").itemConfig;
cc.Class({
extends: cc.viewCell,
properties: {
lb_name: {
default: null,
type: cc.Label
},
lb_des: {
default: null,
type: cc.Label
},
nd_cailiao: {
default: null,
type: cc.Node
},
pb_icon: {
default: null,
type: cc.Prefab
}
},
init: function(t, e) {
var n = this;
if (t >= e.array.length) this.node.active = !1; else {
this.fid = e.array[t];
var l = s[this.fid];
this.target = e.target;
this.lb_name.node.color = c[l.qulity];
var h = "";
if (l.des) h = l.des; else if (l.property) for (var p = 0; p < l.property.length; p++) {
var d = l.property[p][0], u = "";
if (d > 100) {
d -= 100;
u = "%";
}
var f = Math.floor(l.property[p][1]);
h += o[d].name + "+" + f + u + " ";
}
this.lb_des.string = h;
var g = cc.playerData.getfmcost(l.qulity);
this.nd_cailiao.destroyAllChildren();
this.canfm = !0;
for (var y = function(t) {
var e = g[t][0], s = g[t][1], a = cc.instantiate(n.pb_icon), o = a.getChildByName("sp_icon").getComponent(cc.Sprite), l = a.getComponent(cc.Sprite);
(b = a.getChildByName("lb_count").getComponent(cc.Label)).string = "x" + s;
if (cc.playerData.getitemcountbyid(e) >= s) b.node.color = cc.Color.WHITE; else {
b.node.color = cc.Color.RED;
n.canfm = !1;
}
i.commonicon(e, o, l);
n.nd_cailiao.addChild(a);
var h = r[e];
a.on(cc.Node.EventType.TOUCH_END, function() {
cc.uimain.createnormalinfo(h.name, h.des, "确定", void 0, void 0, c[h.qulity]);
});
}, m = 0; m < g.length; m++) {
var b;
y(m);
}
var v = l.type, k = "";
if (v) if (1 == v) k = "武器"; else for (var _ = 0; _ < l.type.length; _++) {
var w = l.type[_][0], x = l.type[_][1];
k += a[w].sub[x];
k += " ";
} else k = "无限制";
this.lb_name.string = l.name + ":" + k;
}
},
onclick: function() {
this.canfm ? cc.uimain.createfmbag(this.fid) : cc.uiHelper.showTips("材料不足", null, cc.Color.RED);
}
});
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
fumocfg: "fumocfg",
gameConfig: "gameConfig",
viewCell: "viewCell"
} ],
cellhc: [ function(t, e) {
"use strict";
cc._RF.push(e, "08af0rVLnVFpLO20EvI8RnQ", "cellhc");
t("viewCell");
var i = t("gameConfig"), s = i.itemConfig, n = i.peifangcfg, a = t("Utils"), o = t("enumcfg"), c = (o.typename, 
o.enumpropertyname, o.qulitycolor);
cc.Class({
extends: cc.viewCell,
properties: {
lb_name: {
default: null,
type: cc.Label
},
nd_cailiao: {
default: null,
type: cc.Node
},
pb_icon: {
default: null,
type: cc.Prefab
}
},
init: function(t, e) {
var i = this;
if (t >= e.array.length) this.node.active = !1; else {
this.fid = e.array[t];
var o = n[this.fid], r = s[o.item];
this.target = e.target;
this.lb_name.string = r.name;
this.lb_name.node.color = c[r.qulity];
this.item = r;
this.cfg = o;
var l = o.cost;
this.nd_cailiao.destroyAllChildren();
this.canfm = !0;
this.strnode = [];
for (var h = function(t) {
var e = l[t][0], n = l[t][1], o = cc.instantiate(i.pb_icon), r = o.getChildByName("sp_icon").getComponent(cc.Sprite), h = o.getComponent(cc.Sprite);
d = o.getChildByName("lb_count").getComponent(cc.Label);
i.strnode.push(d);
d.string = "x" + n;
if (cc.playerData.getitemcountbyid(e) >= n) d.node.color = cc.Color.WHITE; else {
d.node.color = cc.Color.RED;
i.canfm = !1;
}
a.commonicon(e, r, h);
i.nd_cailiao.addChild(o);
var p = s[e];
o.on(cc.Node.EventType.TOUCH_END, function() {
cc.uimain.createnormalinfo(p.name, p.des, "确定", void 0, void 0, c[p.qulity]);
});
}, p = 0; p < l.length; p++) {
var d;
h(p);
}
}
},
refreshcount: function() {
var t = this.cfg.cost;
this.canfm = !0;
for (var e = 0; e < t.length; e++) {
var i = t[e][0], s = t[e][1], n = this.strnode[e];
n.string = "x" + s;
if (cc.playerData.getitemcountbyid(i) >= s) n.node.color = cc.Color.WHITE; else {
n.node.color = cc.Color.RED;
this.canfm = !1;
}
}
},
onclick: function() {
if (this.canfm) {
cc.playerData.dohecheng(this.fid);
cc.uiHelper.showTips("获得", "icons/items/" + this.item.icon, void 0, "x1");
cc.Notifier.emit("refreshequip");
} else cc.uiHelper.showTips("材料不足", null, cc.Color.RED);
}
});
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
gameConfig: "gameConfig",
viewCell: "viewCell"
} ],
celllearnskill: [ function(t, e) {
"use strict";
cc._RF.push(e, "973d6Eh91FFBJOXA9t0y9g0", "celllearnskill");
t("viewCell");
t("Utils");
var i = t("skillcfg");
cc.Class({
extends: cc.viewCell,
properties: {
lb_name: {
default: null,
type: cc.Label
},
lb_des: {
default: null,
type: cc.Label
},
lb_cost: {
default: null,
type: cc.Label
},
sp_icon: {
default: null,
type: cc.Sprite
}
},
init: function(t, e) {
if (t >= e.array.length) this.node.active = !1; else {
this.target = e.target;
this.sid = e.array[t];
var s = i[this.sid], n = s.icon;
this.lb_name.string = s.name;
this.lb_des.string = s.des;
this.lb_cost.string = s.cost;
this.costmoney = s.cost;
var a = this;
cc.resources.load("icons/skills/" + n, cc.SpriteFrame, function(t, e) {
t || (a.sp_icon.spriteFrame = e);
});
}
},
onclick: function() {
var t = this.target.pet.learnskill(this.sid, this.costmoney);
if (0 == t) {
cc.uiHelper.showTips("学习成功");
cc.Notifier.emit("refreshskill", this.target.pet);
this.target.node.destroy();
} else 1 == t ? cc.uiHelper.showTips("金币不足") : 2 == t && cc.uiHelper.showTips("技能已满");
}
});
cc._RF.pop();
}, {
Utils: "Utils",
skillcfg: "skillcfg",
viewCell: "viewCell"
} ],
cellpetbook: [ function(t, e) {
"use strict";
cc._RF.push(e, "d53ce0tfNVIQ6OnNHGqKSsy", "cellpetbook");
t("viewCell");
var i = t("monstercfg");
cc.Class({
extends: cc.viewCell,
properties: {
lb_name: {
default: null,
type: cc.Label
},
sp_icon: {
default: null,
type: cc.Sprite
},
nd_n: {
default: null,
type: cc.Node
},
nd_l: {
default: null,
type: cc.Node
},
nd_b: {
default: null,
type: cc.Node
},
nd_bl: {
default: null,
type: cc.Node
},
lb_jiacheng: {
default: null,
type: cc.Label
}
},
init: function(t, e) {
if (t >= e.array.length) this.node.active = !1; else {
var s = e.array[t], n = i[s];
this.nd_n.color = cc.Color.GRAY;
this.nd_l.color = cc.Color.GRAY;
this.nd_b.color = cc.Color.GRAY;
this.nd_bl.color = cc.Color.GRAY;
this.lb_jiacheng.string = "属性加成:0%";
var a = this;
this.lb_name.string = n.name;
cc.resources.load("allrole/" + n.skinres + "_d_2", cc.SpriteFrame, function(t, e) {
if (!t && a.isValid) {
a.sp_icon.getComponent(cc.Sprite).spriteFrame = e;
var i = e.getOriginalSize().height;
a.sp_icon.node.scale = i > 45 ? 90 / i : 2;
}
});
var o = cc.playerData.petbook[s];
if (o) {
1 & o && (this.nd_n.color = cc.Color.GREEN);
2 & o && (this.nd_l.color = cc.Color.GREEN);
4 & o && (this.nd_b.color = cc.Color.GREEN);
8 & o && (this.nd_bl.color = cc.Color.GREEN);
this.lb_jiacheng.string = "属性加成:" + cc.playerData.getscorebyid(s) + "%";
}
}
}
});
cc._RF.pop();
}, {
monstercfg: "monstercfg",
viewCell: "viewCell"
} ],
cellpet: [ function(t, e) {
"use strict";
cc._RF.push(e, "9c389HliCFEFr6JSGOWByK3", "cellpet");
t("viewCell");
t("gameConfig").itemConfig;
var i = t("Utils");
cc.Class({
extends: cc.viewCell,
properties: {
nd_items: {
default: [],
type: cc.Node
}
},
init: function(t, e) {
if (t >= e.array.length) this.node.active = !1; else {
this.target = e.target;
for (var i = e.array[t], s = 0; s < i.length; s++) {
var n = this.nd_items[s];
this.isinit || n.on(cc.Node.EventType.TOUCH_END, this.touchitem, this);
if (i[s]) {
n.petdata = i[s];
n.active = !0;
this.refreshone(i[s], n);
} else {
n.active = !1;
n.petdata = null;
}
}
this.target.choseditem && this.refrehclick(this.target.choseditem);
if (this.target.nochose) for (s = 0; s < this.nd_items.length; s++) this.nd_items[s].getChildByName("nd_chose").active = !1;
this.isinit = !0;
}
},
refrehclick: function(t) {
for (var e = 0; e < this.nd_items.length; e++) {
var i = this.nd_items[e].getChildByName("nd_chose");
if (this.nd_items[e].petdata && this.nd_items[e].petdata.uuid == t.uuid) {
this.target.nowlv = this.nd_items[e].getChildByName("lb_lv").getComponent(cc.Label);
i.active = !0;
} else i.active = !1;
}
},
touchitem: function(t) {
var e = t.target.petdata;
e && cc.Notifier.emit("clickpet", e);
},
refreshone: function(t, e) {
var s = "";
cc.playerData.battlepet && cc.playerData.battlepet.uuid == t.uuid && (s = "(战)");
var n = t.cfg, a = e.getChildByName("icon").getComponent(cc.Sprite), o = e.getChildByName("shan");
if (t.lighting) {
o.active = !0;
a.node.color = i.colorhuebyid(t.id);
} else {
o.active = !1;
a.node.color = new cc.Color(255, 255, 255);
}
e.getChildByName("lb_name").getComponent(cc.Label).string = t.name + s;
var c = "";
t.zhuanshen > 0 && (c = t.zhuanshen + "转");
e.getChildByName("lb_lv").getComponent(cc.Label).string = c + "lv." + t.lv;
cc.resources.load("allrole/" + n.skinres + "_d_2", cc.SpriteFrame, function(t, e) {
if (!t) {
a.getComponent(cc.Sprite).spriteFrame = e;
var i = e.getOriginalSize().height;
a.node.scale = i > 45 ? 90 / i : 2;
}
});
}
});
cc._RF.pop();
}, {
Utils: "Utils",
gameConfig: "gameConfig",
viewCell: "viewCell"
} ],
cellshop: [ function(t, e) {
"use strict";
cc._RF.push(e, "51a86g0JNxJeandwBux7CuG", "cellshop");
t("viewCell");
var i = t("Utils"), s = t("gameConfig").itemConfig;
cc.Class({
extends: cc.viewCell,
properties: {
sp_icon: {
default: null,
type: cc.Sprite
},
sp_quailty: {
default: null,
type: cc.Sprite
},
lb_name: {
default: null,
type: cc.Label
},
lb_cost: {
default: null,
type: cc.Label
},
nd_gold: {
default: null,
type: cc.Node
},
nd_yuangu: {
default: null,
type: cc.Node
}
},
init: function(t, e) {
if (t >= e.array.length) this.node.active = !1; else {
this.target = e.target;
var n = e.array[t], a = 1;
if (n[1]) {
this.itemid = n[0];
a = n[1];
} else this.itemid = n;
this.count = a;
this.cfg = s[this.itemid];
i.commonicon(this.itemid, this.sp_icon, this.sp_quailty, this.lb_name, this.lb_cost, a);
this.ygprize = 10;
if (this.target.ygmode) {
this.nd_gold.active = !1;
this.ygprize = n[2];
this.lb_cost.string = this.ygprize;
} else this.nd_gold.active = !0;
this.nd_yuangu.active = !this.nd_gold.active;
}
},
onbuy: function() {
var t = cc.playerData.buyitem(this.itemid, this.count, this.target.ygmode, this.ygprize);
0 == t ? cc.uiHelper.showTips("获得", "icons/items/" + this.cfg.icon, void 0, "x" + this.count) : cc.uiHelper.showTips([ "购买成功", "背包已满", "金钱不足", "远古石不足" ][t]);
}
});
cc._RF.pop();
}, {
Utils: "Utils",
gameConfig: "gameConfig",
viewCell: "viewCell"
} ],
cellstage: [ function(t, e) {
"use strict";
cc._RF.push(e, "3fa69s0JvtF2KVGpf3y/LTZ", "cellstage");
t("viewCell");
t("Utils"), t("fumocfg");
var i = t("enumcfg");
i.typename, i.enumpropertyname, i.qulitycolor;
cc.Class({
extends: cc.viewCell,
properties: {
lb_name: {
default: null,
type: cc.Label
}
},
init: function(t, e) {
if (t >= e.array.length) this.node.active = !1; else {
this.target = e.target;
this.stageid = e.array[t];
this.lb_name.string = "第" + this.stageid + "层";
}
},
onclick: function() {
cc.playerData.tempstage = this.stageid;
this.target.refresh();
}
});
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
fumocfg: "fumocfg",
viewCell: "viewCell"
} ],
cellys: [ function(t, e) {
"use strict";
cc._RF.push(e, "d13c3C1rRVFQqs8Agwzi48o", "cellys");
var i = t("viewCell");
t("Utils");
cc.Class({
extends: i,
properties: {
lb_str: {
default: null,
type: cc.Label
}
},
init: function(t, e) {
if (t >= e.array.length) this.node.active = !1; else {
var i = e.array[t];
this.lb_str.string = i;
}
}
});
cc._RF.pop();
}, {
Utils: "Utils",
viewCell: "viewCell"
} ],
charobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "8d9742lENVOQ7veVBhxae3O", "charobj");
var i = t("enumcfg"), s = i.enumequipos, n = t("equipobj"), a = (t("talentcfg"), 
t("gameConfig")), o = (a.itemConfig, a.setcfg), c = (t("Utils"), i.enumproperty2);
e.exports = function() {
this.init = function() {
this.lv = 1;
this.exp = 0;
this.maxexp = 0;
this.str = 10;
this.vit = 10;
this.agi = 10;
this.luk = 10;
this.int = 10;
this.dex = 10;
this.bppoint = 0;
this.zhuanshen = 0;
this.equiparr = [];
this.talentarr = [];
this.skillarr = [ 22 ];
this.setmap = {};
this.lskillarr = [ 22 ];
this.setforvaule = [];
for (var t = 0; t < s.count; t++) this.equiparr.push(null);
};
this.canchuanshen = function() {
var t = 100 * this.zhuanshen + 300;
return !(this.lv < t);
};
this.dozhuanshen = function() {
var t = 100 * this.zhuanshen + 300;
if (this.lv < t) return !1;
var e = Math.pow(t * (t + 1) / 2, 2), i = Math.pow(this.lv * (this.lv + 1) / 2, 2) - e;
this.exp = 0;
this.lv = 1;
this.setnextexp();
this.gainexpv(i, !0);
this.zhuanshen++;
this.resetbp();
return !0;
};
this.getelement = function() {
var t = this.equiparr[s.crystal];
return t ? t.cfg.element : [ 0, 0, 0 ];
};
this.doequip = function(t, e) {
var i = this.equiparr[e], n = !1;
t && (n = t.cfg.setid);
if (i) {
cc.playerData.additem(i);
i.cfg.setid && (n = !0);
}
this.equiparr[e] = t;
if (n) {
this.setforvaule = [];
for (var a = {}, c = 3; c < s.count; c++) if (this.equiparr[c]) {
var r = this.equiparr[c].cfg.setid;
if (r) {
a[r] || (a[r] = {
count: 0,
arr: []
});
a[r].arr.push(this.equiparr[c].id);
a[r].count++;
}
}
this.setmap = a;
for (var l in a) {
var h = a[l].count, p = o[l].parmas;
for (c = 0; c < p.length; c++) h >= p[c].count && this.setforvaule.push(p[c]);
}
}
};
this.newgame = function() {
this.lv = 1;
this.resetbp();
this.equiparr[s.weapon1] = new n().initwithid(10101, 0, 4);
this.equiparr[s.weapon2] = new n().initwithid(10001, 0, 4);
this.equiparr[s.weapon3] = new n().initwithid(10201, 0, 4);
this.doequip(new n().initwithid(20601, 0, 1), s.crystal);
this.setnextexp();
};
this.resetbp = function() {
this.str = 10;
this.vit = 10;
this.agi = 10;
this.luk = 10;
this.int = 10;
this.dex = 10;
this.bppoint = (this.lv - 1) * (4 + 2 * this.zhuanshen) + 30;
cc.playerData.saveflag = !0;
};
this.setnextexp = function() {
this.maxexp = Math.pow(this.lv, 3);
};
this.gainexpv = function(t, e) {
cc.expadd && !e && (t *= 2);
this.exp += t;
for (var i = !1; this.exp >= this.maxexp; ) {
this.lv++;
this.bppoint += 4 + 2 * this.zhuanshen;
this.exp = this.exp - this.maxexp;
this.setnextexp();
i = !0;
}
cc.playerData.saveflag = !0;
return i;
};
this.gainexp = function(t) {
var e = 400;
cc.wujin && (e = 500 + 10 * cc.wujincount);
var i = Math.max(1, Math.floor(Math.pow(Math.min(e, t), 2) / 3));
return this.gainexpv(i);
};
this.jiaidan = function(t) {
for (var e = 0, i = 0; i < t.length; i++) e += t[i];
if (!(this.bppoint < e)) {
for (i = 0; i < t.length; i++) this[c[i + 1]] += t[i];
this.bppoint -= e;
cc.playerData.saveflag = !0;
}
};
this.downskill = function(t) {
for (var e = 0; e < this.skillarr.length; e++) if (this.skillarr[e] == t) {
this.skillarr[e] = 0;
break;
}
cc.playerData.saveflag = !0;
};
this.equipskill = function(t, e) {
for (var i = 0; i < this.skillarr.length; i++) if (this.skillarr[i] == t) return !1;
this.skillarr[e] = t;
cc.playerData.saveflag = !0;
return !0;
};
this.learnskill = function(t) {
for (var e = 0; e < this.lskillarr.length; e++) if (this.lskillarr[e] == t) return !1;
this.lskillarr.push(t);
cc.playerData.saveflag = !0;
return !0;
};
this.encode = function() {
var t = {};
t.lv = this.lv;
t.exp = this.exp;
t.str = this.str;
t.vit = this.vit;
t.agi = this.agi;
t.luk = this.luk;
t.int = this.int;
t.dex = this.dex;
t.bppoint = this.bppoint;
t.skillarr = this.skillarr;
t.lskillarr = this.lskillarr;
t.zhuanshen = this.zhuanshen;
t.equiparr = [];
for (var e = 0; e < this.equiparr.length; e++) this.equiparr[e] ? t.equiparr.push(this.equiparr[e].encode()) : t.equiparr.push(0);
return t;
};
this.initwithsave = function(t) {
this.zhuanshen = 0;
this.equiparr = [];
this.skillarr = [];
this.setmap = {};
this.lskillarr = [];
this.talentarr = [];
this.setforvaule = [];
for (var e = 0; e < s.count; e++) this.equiparr.push(null);
t.zhuanshen && (this.zhuanshen = t.zhuanshen);
this.lv = t.lv;
this.exp = t.exp;
this.str = t.str;
this.vit = t.vit;
this.agi = t.agi;
this.luk = t.luk;
this.int = t.int;
this.dex = t.dex;
this.bppoint = t.bppoint;
for (e = 0; e < t.skillarr.length; e++) this.skillarr.push(t.skillarr[e]);
for (e = 0; e < t.lskillarr.length; e++) this.lskillarr.push(t.lskillarr[e]);
for (e = 0; e < t.equiparr.length; e++) if (t.equiparr[e]) {
var i = new n().initwithsave(t.equiparr[e]);
i && this.doequip(i, e);
}
this.setnextexp();
return this;
};
this.test = function() {};
};
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
equipobj: "equipobj",
gameConfig: "gameConfig",
talentcfg: "talentcfg"
} ],
cpa: [ function(t, e) {
"use strict";
cc._RF.push(e, "9704dfNwxBEdbresAveeuf0", "cpa");
cc.cpadatas = [ {
appid: "wxc38670e277cd0eb4",
icon: "cpa3",
name: "像素放置英雄"
}, {
appid: "wxc38670e277cd0eb4",
icon: "cpa3",
name: "像素放置英雄"
}, {
appid: "wxc252d809309c0363",
icon: "cpa2",
name: "毛哈吃鸡大作战"
}, {
appid: "wxc38670e277cd0eb4",
icon: "cpa3",
name: "像素挂机探险"
}, {
appid: "wxc38670e277cd0eb4",
icon: "cpa3",
name: "像素放置英雄"
}, {
appid: "wxc252d809309c0363",
icon: "cpa2",
name: "毛哈吃鸡大作战"
}, {
appid: "wxc38670e277cd0eb4",
icon: "cpa3",
name: "像素放置英雄"
}, {
appid: "wxc38670e277cd0eb4",
icon: "cpa3",
name: "像素放置英雄"
}, {
appid: "wxc252d809309c0363",
icon: "cpa2",
name: "毛哈吃鸡大作战"
} ];
cc.Class({
extends: cc.Component,
properties: {
nd_list: {
default: null,
type: cc.Node
}
},
start: function() {
this.iconnodes = this.nd_list.getChildren();
for (var t = this, e = function(e) {
var i = cc.cpadatas[e];
cc.loader.loadRes("cpas/" + i.icon, cc.SpriteFrame, function(s, n) {
if (!s) {
t.iconnodes[e].getComponent(cc.Sprite).spriteFrame = n;
t.iconnodes[e].getChildByName("lb_name").getComponent(cc.Label).string = i.name;
t.iconnodes[e].appid = i.appid;
t.iconnodes[e].appicon = i.icon;
t.iconnodes[e].on(cc.Node.EventType.TOUCH_END, t.ontouch, t);
}
});
}, i = 0; i < 9; i++) e(i);
},
onclose: function() {
this.node.destroy();
},
ontouch: function(t) {
wx.navigateToMiniProgram({
appId: t.target.appid,
path: t.target.appicon
});
}
});
cc._RF.pop();
}, {} ],
debugbox: [ function(t, e) {
"use strict";
cc._RF.push(e, "f3f96RWDpFCaqlMFYfZy2nj", "debugbox");
var i = t("Utils");
cc.Class({
extends: cc.Component,
properties: {
nd_1: {
default: null,
type: cc.Node
},
nd_2: {
default: null,
type: cc.Node
},
nd_3: {
default: null,
type: cc.Node
}
},
initbox: function(t, e, i) {
this.life = 3;
this.nd_1.active = !0;
this.nd_2.active = !1;
this.nd_3.active = !1;
this.nd_1.width = t;
this.nd_1.height = e;
this.node.angle = i;
},
initview: function(t, e, s) {
this.life = 3;
this.nd_1.active = !1;
this.nd_2.active = !0;
this.nd_3.active = !0;
var n = i.getanglebydir(s);
this.node.angle = n;
this.nd_2.angle = t / 2;
this.nd_3.angle = -t / 2;
this.nd_2.width = this.nd_3.width = e;
},
update: function(t) {
this.life -= t;
this.life <= 0 && this.node.destroy();
}
});
cc._RF.pop();
}, {
Utils: "Utils"
} ],
delayshow: [ function(t, e) {
"use strict";
cc._RF.push(e, "4f456COeLNGv4HSe1yj1bOM", "delayshow");
t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
dmglb: [ function(t, e) {
"use strict";
cc._RF.push(e, "f8de9hqJehD5JG0i2kDzQcT", "dmglb");
t("Utils");
cc.Class({
extends: cc.Component,
properties: {
lb_dmg: {
default: null,
type: cc.Label
},
nd_cri: {
default: null,
type: cc.Node
}
},
showdmg: function(t, e, i) {
t.cri ? this.nd_cri.active = !0 : this.nd_cri.active = !1;
this.node.x = e.x;
this.node.y = e.y + 10;
this.lb_dmg.string = t.v;
this.life = .8;
this.node.opacity = 255;
this.node.scale = 1;
this.node.ctrl = this;
if (t.cri) this.lb_dmg.node.color = cc.Color.YELLOW; else if (1 == i.camp || t.miss) this.lb_dmg.node.color = cc.Color.RED; else if (t.v >= 0) this.lb_dmg.node.color = cc.Color.WHITE; else {
this.lb_dmg.string = Math.abs(t.v);
this.lb_dmg.node.color = cc.Color.GREEN;
}
},
doupdate: function(t) {
this.life -= t;
this.node.opacity -= 100 * t;
this.node.y = this.node.y + 70 * t;
this.node.scale -= .5 * t;
return this.life <= 0;
}
});
cc._RF.pop();
}, {
Utils: "Utils"
} ],
dragonobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "61818uFP6JP7ZnM9Hy1NpHv", "dragonobj");
var i = t("Utils");
e.exports = function() {
this.lerpv = function(t, e, i) {
return t + (e - t) * i;
};
this.init = function(t, e, s, n) {
this.prefab = "blackdragon";
this.objtype = 99;
this.randv = 200;
this.target = cc.v2(0, 0);
this.dir = cc.v2(e.dir.x, e.dir.y);
this.startdir = cc.v2(0, 1);
this.tardir = cc.v2(0, 1);
this.rotspeed = .7;
this.movespeed = 200;
this.time = 5;
this.time2 = 0;
this.skill = n;
this.user = e;
this.x = e.x;
this.y = e.y;
this.life = 10;
var a = s.getenemycamp(e), o = s.findnpcwithcmp(e, a, !0)[0];
if (o) {
this.dir.x = o.x - e.x;
this.dir.y = o.y - e.y;
}
this.dir = i.dirRotate(this.dir, t[2]);
this.dir.normalizeSelf();
this.atktime = 0;
this.posarr = [];
};
this.findtarget = function() {
var t = this.user.x - this.x - this.randv / 2 + i.randintSeed(this.randv), e = this.user.y - this.y - this.randv / 2 + i.randintSeed(this.randv);
this.tardir.x = t;
this.tardir.y = e;
this.tardir.normalizeSelf();
this.startdir.x = this.dir.x;
this.startdir.y = this.dir.y;
var s = this.dir.dot(this.tardir);
if (1 != s) {
var n = Math.acos(s);
this.rotspeed = 4 / n / Math.PI;
}
};
this.doatk = function() {
for (var t = this.posarr.length - 1; t >= 0; t--) this.user.gamelogic.createonebullet(this.skill, 19, this.posarr[t].x, this.posarr[t].y, this.dir, this.user);
};
this.update = function(t) {
this.life -= t;
if (this.life <= 0) {
this.user = null;
return !0;
}
this.atktime -= t;
if (this.atktime <= 0) {
this.posarr.push(cc.v2(this.x, this.y));
this.posarr.length > 10 && this.posarr.splice(0, 1);
this.doatk();
this.atktime = .3;
}
this.time += t;
this.time2 += t * this.rotspeed;
if (this.time >= 3) {
this.time = 0;
this.time2 = 0;
this.findtarget();
}
this.startdir.lerp(this.tardir, this.time2, this.dir);
this.dir.normalizeSelf();
var e = t * this.movespeed;
this.x = this.x + this.dir.x * e;
this.y = this.y + this.dir.y * e;
return !1;
};
};
cc._RF.pop();
}, {
Utils: "Utils"
} ],
dropcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "a349cLWANNP4qUf0WomnnVb", "dropcfg");
e.exports = {
dropcfg: {
1: [ 10001, 10101, 10201, 20001, 20101, 20201, 20301, 20401, 20111, 20312, 20412 ],
2: [ 10002, 10102, 10202, 20002, 20102, 20202, 20302, 20402, 20111, 20312, 20412, 20112, 20012, 20212, 20312, 20412, 20117, 20017, 20217, 20317, 20417, 20122, 20022, 20222, 20322, 20422 ],
3: [ 10003, 10103, 10203, 20003, 20103, 20203, 20303, 20403, 20113, 20013, 20213, 20313, 20413, 20118, 20018, 20218, 20318, 20418, 20123, 20023, 20223, 20323, 20423 ],
4: [ 10004, 10104, 10204, 20004, 20104, 20204, 20304, 20404, 20113, 20013, 20213, 20313, 20413, 20118, 20018, 20218, 20318, 20418, 20123, 20023, 20223, 20323, 20423 ],
5: [ 10005, 10105, 10205, 20005, 20105, 20205, 20305, 20405 ],
6: [ 10006, 10106, 10206, 20006, 20106, 20206, 20306, 20406 ],
7: [ 10007, 10107, 10207, 20007, 20107, 20207, 20307, 20407 ],
8: [ 10008, 10108, 10208, 20008, 20108, 20208, 20308, 20408 ],
9: [ 10009, 10109, 10209, 20009, 20109, 20209, 20309, 20409 ],
10: [ 10010, 10110, 10210, 20010, 20110, 20210, 20310, 20410 ]
},
cailiao1: [ 38011, 38021, 38031, 38041, 38051, 38012, 38022, 38032, 38042, 38052, 38013, 38023, 38033, 38043, 38053, 38014, 38024, 38034, 38044, 38054 ],
cailiao2: [ 38015, 38025, 38035, 38045, 38055, 38016, 38026, 38036, 38046, 38056, 38017, 38027, 38037, 38047, 38057, 38018, 38028, 38038, 38048, 38058 ]
};
cc._RF.pop();
}, {} ],
dropobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "0ea95VVFNBILoaPPhVSd0je", "dropobj");
var i = t("equipobj"), s = t("gameConfig").itemConfig, n = t("enumcfg").enumobjtype, a = t("Utils");
e.exports = function() {
this.init = function(t, e) {
this.objtype = n.dropobj;
var o = s[t];
1 == o.type || 2 == o.type ? this.itemdata = new i().initwithid(t, 0) : this.itemdata = {
qulity: s[t].qulity,
cfg: s[t],
id: t,
isitem: !0
};
this.sx = e.x;
this.sy = e.y;
this.x = -30 + a.randintSeed(60) + this.sx;
this.y = -30 + a.randintSeed(60) + this.sy;
cc.battlelogic.objuuid++;
this.uuid = cc.battlelogic.objuuid;
this.life = 30;
return this;
}, this.update = function(t) {
this.life -= t;
return this.life <= 0;
};
};
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
equipobj: "equipobj",
gameConfig: "gameConfig"
} ],
duihuancfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "05f54+BAMZP+ogvaZ+pxfIT", "duihuancfg");
e.exports = {
1: {
k: "panzer",
t: 2,
v: 112
},
2: {
k: "vip888",
t: 1,
v: 1e4
},
3: {
k: "vip666",
t: 3,
v: 35001,
v2: 5
},
4: {
k: "jiuwei",
t: 2,
v: 300
},
5: {
k: "jineng",
t: 3,
v: 30004,
v2: 30
}
};
cc._RF.pop();
}, {} ],
effanicfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "20f2dSEeuFAv5w7qC0KPpqE", "effanicfg");
e.exports = {
eff1: {
count: 7,
loopsound: "atk_elec",
soundtime: .15
},
eff4: {
count: 6
},
eff6: {
count: 11,
loopsound: "sword",
soundtime: .15
},
eff7: {
count: 6,
sound: "sword"
},
eff8: {
count: 6,
scale: 2,
anchorX: 0,
sound: "skill3"
},
eff10: {
count: 7,
anchorX: 0
},
eff13: {
count: 12,
scale: 1.5
},
eff14: {
count: 5,
anchorY: 0,
anioffy: -30,
scale: 2,
sound: "fire3"
},
eff23: {
count: 6
},
eff25: {
count: 4
},
eff27: {
count: 8
},
eff30: {
count: 10,
scale: 2,
anchorX: 0,
sound: "skill3"
},
eff31: {
count: 13,
scale: 2
},
eff32: {
count: 9,
anchorY: 0,
anioffy: -23,
sound: "atk_elec"
},
eff33: {
count: 6,
sound: "atkice"
},
eff34: {
count: 8
},
eff35: {
count: 5
},
eff37: {
count: 3
},
eff38: {
count: 1,
opacity: 150
},
eff39: {
count: 1,
opacity: 200
},
eff40: {
count: 3
},
eff41: {
count: 7,
sound: "fire3"
},
eff42: {
count: 3,
scale: 2,
opacity: 150,
loopsound: "sword",
soundtime: .1
},
eff43: {
count: 3
},
eff44: {
count: 6,
rot: 45,
anioffy: 22,
sound: "fire1"
},
eff45: {
count: 6,
rot: 45,
anioffy: 22,
sound: "ice2"
},
eff46: {
count: 3,
sound: "fire3"
},
eff47: {
count: 1,
opacity: 150,
sound: "ice3"
},
eff48: {
count: 3,
sound: "ice1"
},
eff49: {
count: 4
},
eff50: {
count: 11,
scale: 2,
anchorY: 0,
anioffy: -80,
sound: "skill2"
},
eff51: {
count: 6,
rot: 45,
anioffy: 22,
sound: "light1"
},
eff52: {
count: 11,
scale: 2
},
eff53: {
count: 12,
scale: 1
},
eff55: {
count: 18
},
eff56: {
count: 12
},
eff57: {
count: 5
},
eff58: {
count: 5
},
eff59: {
count: 14,
sound: "atk_elec"
},
eff60: {
count: 13,
scale: 2
},
eff61: {
count: 4,
anchorY: 1,
sound: "fire4"
},
eff62: {
count: 4,
sound: "sword"
},
eff63: {
count: 4,
sound: "sword"
},
eff64: {
count: 4,
sound: "sword"
},
eff65: {
count: 5,
sound: "blow1"
},
eff66: {
count: 5,
sound: "blow1"
},
eff67: {
count: 7,
sound: "blow1"
},
eff68: {
count: 5,
sound: "attack3"
},
eff69: {
count: 6,
anioffy: 20,
sound: "fire3"
},
eff70: {
count: 3,
sound: "blow1"
},
eff71: {
count: 3,
sound: "blow1"
},
eff72: {
count: 6
},
eff73: {
count: 4,
sound: "sword"
},
eff74: {
count: 4
},
eff75: {
count: 6,
scale: 2,
anioffy: 50,
sound: "blow1"
},
eff76: {
count: 19,
scale: 10,
scaleY: 14,
opacity: 150,
anioffy: -50,
sound: "water1"
},
eff77: {
count: 4
},
eff78: {
count: 5,
sound: "fire2"
},
eff79: {
count: 5,
sound: "ice2"
},
eff80: {
count: 7,
anioffy: 10,
sound: "ice1"
},
eff81: {
count: 4,
scale: 2,
sound: "atkice"
},
eff82: {
count: 4,
sound: "light2"
},
eff83: {
count: 5,
scale: 2,
sound: "atklight"
},
eff84: {
count: 4,
scale: 1,
sound: "light3"
},
card: {
count: 1,
anioffy: -20
},
eff85: {
count: 7,
backres: "card",
sound: "starlight"
},
eff86: {
count: 5,
scale: 1,
sound: "heal4"
},
eff87: {
count: 8,
scale: 1,
sound: "heal4"
},
eff88: {
count: 6,
scale: 2
},
eff89: {
count: 3,
scale: 1,
sound: "firehit"
},
eff90: {
count: 3,
sound: "blow1"
},
eff91: {
count: 2,
sound: "blow1"
},
eff92: {
count: 2,
sound: "arrow1"
},
eff93: {
count: 1
},
buff1: {
count: 1,
scale: 1
},
buff2: {
count: 1,
scale: 1.2
},
buff3: {
count: 1,
scale: 1.4
},
buff4: {
count: 1,
scale: 1.6
},
buff5: {
count: 1,
scale: 1.8
}
};
cc._RF.pop();
}, {} ],
enumcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "03939K6Ld1KjbGM2y1Q+lwO", "enumcfg");
var i = {
cold: 1,
fire: 2,
thunder: 4,
sword: 8,
bow: 16,
staff: 32
};
i.pyh = i.bow | i.sword;
i.mag = i.cold | i.fire | i.thunder;
i.alldmg = i.pyh | i.mag;
var s = {};
s[i.cold] = {
name: "冰系伤害",
color: new cc.Color(0, 245, 255)
};
s[i.fire] = {
name: "火系伤害",
color: new cc.Color(255, 75, 0)
};
s[i.thunder] = {
name: "雷系伤害",
color: new cc.Color(245, 255, 0)
};
s[i.sword] = {
name: "剑系伤害",
color: new cc.Color(0, 255, 100)
};
s[i.bow] = {
name: "弓系伤害",
color: new cc.Color(0, 255, 100)
};
s[i.pyh] = {
name: "物理伤害",
color: new cc.Color(100, 0, 255)
};
s[i.mag] = {
name: "元素伤害",
color: new cc.Color(255, 0, 255)
};
s[i.alldmg] = {
name: "全系伤害",
color: new cc.Color(0, 0, 0)
};
var n = {
vit: 1,
str: 2,
dex: 3,
agi: 4,
int: 5,
luk: 6,
movespeed: 7,
maxhp: 8,
atk: 9,
matk: 10,
datk: 11,
vatk: 12,
def: 13,
mdef: 14,
hit: 15,
flee: 16,
atkspeed: 17,
cri: 18,
xixue: 19,
yongchang: 20,
cridmg: 21,
gainexp: 22,
healdmg: 23
}, a = {};
a[n.vit] = {
name: "体质",
color: new cc.Color(240, 255, 20)
};
a[n.str] = {
name: "力量",
color: new cc.Color(240, 255, 20)
};
a[n.int] = {
name: "智力",
color: new cc.Color(240, 255, 20)
};
a[n.dex] = {
name: "灵巧",
color: new cc.Color(240, 255, 20)
};
a[n.agi] = {
name: "敏捷",
color: new cc.Color(240, 255, 20)
};
a[n.luk] = {
name: "幸运",
color: new cc.Color(240, 255, 20)
};
a[n.movespeed] = {
name: "移速",
color: cc.Color.WHITE
};
a[n.maxhp] = {
name: "生命",
color: cc.Color.WHITE
};
a[n.atk] = {
name: "攻击",
color: cc.Color.WHITE
};
a[n.matk] = {
name: "魔攻",
color: cc.Color.WHITE
};
a[n.datk] = {
name: "",
color: cc.Color.WHITE
};
a[n.vatk] = {
name: "",
color: cc.Color.WHITE
};
a[n.def] = {
name: "防御",
color: cc.Color.WHITE
};
a[n.mdef] = {
name: "魔防",
color: cc.Color.WHITE
};
a[n.hit] = {
name: "命中",
color: cc.Color.WHITE
};
a[n.flee] = {
name: "闪避",
color: cc.Color.WHITE
};
a[n.atkspeed] = {
name: "攻速",
color: cc.Color.WHITE
};
a[n.cri] = {
name: "暴击",
color: cc.Color.WHITE
};
a[n.xixue] = {
name: "吸血",
color: cc.Color.WHITE
};
a[n.yongchang] = {
name: "咏唱",
color: cc.Color.WHITE
};
a[n.cridmg] = {
name: "爆伤",
color: cc.Color.WHITE
};
a[n.gainexp] = {
name: "",
color: cc.Color.WHITE
};
a[n.healdmg] = {
name: "",
color: cc.Color.WHITE
};
var o = [ null, new cc.Color(255, 255, 255), new cc.Color(0, 255, 0), new cc.Color(0, 100, 255), new cc.Color(155, 0, 255), new cc.Color(255, 155, 0), new cc.Color(255, 0, 80), new cc.Color(255, 60, 220) ];
e.exports = {
enumskilltype: i,
enumproperty: n,
enumequipos: {
weapon1: 0,
weapon2: 1,
weapon3: 2,
body: 3,
head: 4,
hand: 5,
shose: 6,
kuzi: 7,
ring: 8,
crystal: 9,
count: 10
},
enumgameflag: {
movemag: 1,
hurtmag: 2,
notbecri: 4
},
enumobjtype: {
npcobj: 1,
lootobj: 2,
bulletobj: 3,
dropobj: 4,
dragonobj: 99,
warningobj: 100
},
qulitycolor: o,
qulityname: [ "", "普通", "优秀", "精良", "罕见", "传说", "远古", "太古" ],
typename: {
1: {
name: "武器",
sub: {
1: "剑",
2: "弓",
3: "法杖"
}
},
2: {
name: "防具",
sub: {
1: "护甲",
2: "头盔",
3: "护手",
4: "鞋子",
5: "护腿",
6: "饰品",
7: "水晶"
}
}
},
enumpropertyname: a,
enumskilltypename: s,
enumproperty2: {
1: "vit",
2: "str",
3: "dex",
4: "agi",
5: "int",
6: "luk"
}
};
cc._RF.pop();
}, {} ],
equipobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "c740bVRwdhFQYkCH/gMNTj3", "equipobj");
var i = t("gameConfig").itemConfig, s = t("Utils"), n = t("enumcfg"), a = t("fumocfg"), o = t("talentcfg"), c = n.enumproperty, r = n.typename, l = {};
l[c.vit] = 1;
l[c.str] = 1;
l[c.int] = 1;
l[c.dex] = 1;
l[c.agi] = 1;
l[c.luk] = 1;
l[c.maxhp] = 30;
l[c.atk] = 10;
l[c.matk] = 10;
l[c.def] = 10;
l[c.mdef] = 10;
l[c.hit] = 2;
l[c.flee] = 2;
l[c.atkspeed] = 3;
l[c.cri] = 1;
l[c.cridmg] = 2;
l[c.xixue] = 1;
var h = [ 0, 0, 1, 2, 4, 6, 6, 6, 6 ], p = [ 0, 1, 1, 2, 2, 3, 3, 3, 3 ], d = [ 40, 40, 20, 10, 5 ], u = [ [ 16, 17, 18, 20, 21, 204, 203, 202, 201, 210, 211, 212, 213 ], [ 9, 10, 11, 12, 13, 38 ], [ 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 207, 208, 209 ] ], f = [ [ 16, 17, 18, 20, 21, 204, 203, 202, 201, 210, 211, 212, 213, 219, 225 ], [ 9, 10, 11, 12, 13, 38, 220, 226 ], [ 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 207, 208, 209, 221, 222, 223, 224, 227 ] ];
e.exports = function() {
this.initwithid = function(t, e, n) {
this.uuid = cc.playerData.uuid;
cc.playerData.uuid++;
this.cfg = i[t];
this.fumoid = 0;
cc.chengseadd && (d[4] = 10);
this.qulity = s.qz(d) + 1;
this.cfg.qulity && (this.qulity = Math.max(this.qulity, this.cfg.qulity));
n && (this.qulity = n);
this.id = t;
this.lv = e;
this.logiclv = this.cfg.logiclv;
this.cfg.fixproperty ? this.fixprocount = this.cfg.fixproperty.length : this.fixprocount = 0;
this.suoding = !1;
this.setproperty();
this.type = this.cfg.type;
this.settypename();
1 == this.type && this.setskill();
this.settalent();
return this;
};
this.settypename = function() {
this.cfg.subtype < 6 ? this.typename = r[this.type].name + "_" + r[this.type].sub[this.cfg.subtype] : this.typename = r[this.type].sub[this.cfg.subtype];
};
this.setskill = function(t) {
var e = null;
t && (e = this.skills[t]);
this.skills = [];
var i = 0;
if (this.cfg.fixskill) {
i = this.cfg.fixskill.length;
for (var n = 0; n < i; n++) this.skills.push([ this.cfg.fixskill[n], this.getsklllv() ]);
}
var a = this.cfg.subtype, o = u[a - 1];
this.logiclv > 4 && (o = f[a - 1]);
var c = p[this.qulity] - i + 1;
for (n = 0; n < c; n++) this.skills.push([ o[s.randintSeed(o.length)], this.getsklllv() ]);
e && (this.skills[t] = e);
};
this.getrandbili = function() {
return (20 * this.qulity + 30 + s.randintSeed(20)) / 100;
};
this.getsklllv = function() {
return 1;
};
this.dofumo = function(t) {
if (0 != t) {
this.fumoid = t;
this.fmcfg = a[t];
}
};
this.setproperty = function() {
this.property = [];
for (var t = 0; t < this.fixprocount; t++) {
var e = this.cfg.fixproperty[t], i = e[1] + e[2] * (this.lv + 2);
6 == this.qulity ? i *= 1.5 : 7 == this.qulity && (i *= 2);
i = Math.floor(i);
this.property.push([ e[0], i ]);
}
var n = h[this.qulity], a = [];
for (var o in l) a.push(Number(o));
for (t = 0; t < n; t++) {
var c = s.randintSeed(a.length), r = a[c], p = l[r] * this.logiclv;
p += s.randintSeed(p) * this.getrandbili();
p = Math.floor(p);
p = Math.max(p, 1);
this.property.push([ r, p ]);
this.qulity <= 6 && a.splice(c, 1);
}
};
this.setquilty = function(t) {
this.qulity = t;
for (var e = 0; e < this.property.length; e++) if (e < this.fixprocount) {
var i = this.cfg.fixproperty[e], s = i[1] + i[2] * (this.lv + 2);
6 == this.qulity ? s *= 1.5 : 7 == this.qulity && (s *= 2);
s = Math.floor(s);
this.property[e] = [ i[0], s ];
}
};
this.canjinhua = function() {
if (this.qulity < 5) return !1;
if (5 == this.qulity) {
var t = cc.playerData.finditembyid(30005);
return !!(t && t.count > 0);
}
if (6 == this.qulity) {
var e = cc.playerData.finditembyid(30006);
return !!(e && e.count > 0);
}
return !1;
};
this.dojinhua = function() {
return 5 == this.qulity ? this.toyuangu() : 6 == this.qulity && this.totaigu();
};
this.toyuangu = function() {
var t = cc.playerData.finditembyid(30005);
if (t && t.count > 0) {
this.setquilty(6);
cc.playerData.xiaohaoitembyid(30005, 1);
return !0;
}
return !1;
};
this.totaigu = function() {
var t = cc.playerData.finditembyid(30006);
if (t && t.count > 0) {
this.setquilty(7);
cc.playerData.xiaohaoitembyid(30006, 1);
return !0;
}
return !1;
};
this.xilian = function() {
var t = cc.playerData.finditembyid(30002);
if (t && t.count > 0) {
this.setproperty();
cc.playerData.xiaohaoitembyid(30002, 1);
return !0;
}
return !1;
};
this.xiskill = function(t) {
var e = cc.playerData.finditembyid(30004);
if (e && e.count > 0) {
this.setskill(t);
cc.playerData.xiaohaoitembyid(30004, 1);
return !0;
}
return !1;
};
this.refreshfix = function() {
for (var t = 0; t < this.fixprocount; t++) {
var e = this.cfg.fixproperty[t], i = e[1] + e[2] * (this.lv + 2);
6 == this.qulity ? i *= 1.5 : 7 == this.qulity && (i *= 2);
i = Math.floor(i);
this.property[t] = [ e[0], i ];
}
};
this.lvup = function() {
if (this.lv >= cc.playerData.player.lv) return 1;
var t = this.getqhcost();
if (!(cc.playerData.gold >= t)) return 2;
cc.playerData.changegold(-t);
this.lv++;
this.refreshfix();
return 0;
};
this.getqhcost = function() {
return 50 * this.logiclv * (this.lv + 1);
};
this.getsellprize = function() {
return Math.floor(this.getqhcost() * this.lv / 2);
};
this.huishou = function(t) {
var e = this.getsellprize() * t;
this.lv = 0;
this.refreshfix();
cc.playerData.changegold(e);
};
this.settalent = function() {
var t = this.cfg;
this.plusdes = null;
if (t.talent) {
var e = o[t.talent];
this.plusdes = e.des;
this.talentarr2 = [ e ];
}
};
this.initwithsave = function(t) {
this.uuid = t.uuid;
this.id = t.id;
this.qulity = t.qulity;
this.fumoid = t.fumoid;
this.lv = t.lv;
this.suoding = t.suoding;
null == this.suoding && (this.suoding = !1);
this.cfg = i[this.id];
if (!this.cfg) return null;
this.logiclv = this.cfg.logiclv;
this.cfg.fixproperty ? this.fixprocount = this.cfg.fixproperty.length : this.fixprocount = 0;
this.type = this.cfg.type;
this.settypename();
this.property = [];
for (var e = 0; e < t.property.length; e++) {
var s = t.property[e];
this.property.push([ s[0], s[1] ]);
}
if (t.skills) {
this.skills = [];
for (e = 0; e < t.skills.length; e++) this.skills.push([ t.skills[e], 1 ]);
}
this.dofumo(this.fumoid);
this.refreshfix();
this.settalent();
return this;
};
this.encode = function() {
var t = {};
t.uuid = this.uuid;
t.id = this.id;
t.qulity = this.qulity;
t.fumoid = this.fumoid;
t.lv = this.lv;
t.property = this.property;
t.suoding = this.suoding;
if (this.skills) {
t.skills = [];
for (var e = 0; e < this.skills.length; e++) t.skills.push(this.skills[e][0]);
}
return t;
};
this.dosuoding = function() {
this.suoding = !this.suoding;
};
};
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
fumocfg: "fumocfg",
gameConfig: "gameConfig",
talentcfg: "talentcfg"
} ],
followweapon: [ function(t, e) {
"use strict";
cc._RF.push(e, "3d58fJfj+9MupLVAlRYMb3Y", "followweapon");
cc.Class({
extends: cc.Component,
properties: {
nd_target: {
default: null,
type: cc.Node
}
},
start: function() {},
update: function() {
var t = this.nd_target.width, e = this.nd_target.angle, i = cc.v2(Math.cos(e * (Math.PI / 180)), Math.sin(e * (Math.PI / 180)));
this.node.x = t * i.x;
this.node.y = t * i.y;
}
});
cc._RF.pop();
}, {} ],
frameani: [ function(t, e) {
"use strict";
cc._RF.push(e, "a8fdbqI9M9JyY+O1PS30aXs", "frameani");
var i = t("effanicfg");
cc.Class({
extends: cc.Component,
properties: {
sp_frame: {
default: null,
type: cc.Sprite
}
},
initdata: function(t, e) {
this.actionid = 0;
this.node.x = this.node.y = 0;
this.node.ctrl = this;
this.node.scaleY = this.node.scaleX = 1;
this.speed = .075;
var s = i[t];
s || (s = {
count: 1
});
var n = s.count;
e || (e = this.speed * n);
this.lifetime = e;
this.frameidx = 0;
this.frametime = 0;
this.framecount = n;
this.framename = t;
this.node.anchorY = .5;
this.node.anchorX = .5;
this.node.opacity = 255;
null != s.anchorY && (this.node.anchorY = s.anchorY);
null != s.anchorX && (this.node.anchorX = s.anchorX);
s.opacity && (this.node.opacity = s.opacity);
s.scale && (this.node.scale = s.scale);
this.anioffy = s.anioffy || 0;
this.sp_frame.spriteFrame = null;
this.agplus = s.rot || 0;
this.cfg = s;
this.updateframe();
if (s.backres) {
var a = s.backres, o = this;
this.scheduleOnce(function() {
var t = cc.gameMgr.resmgr.createeff(a, o.lifetime), e = o.node.parent.convertToWorldSpaceAR(o.node), s = cc.gameMgr.nd_down.convertToNodeSpaceAR(e);
t.position = s;
cc.gameMgr.nd_down.addChild(t);
o.subnd = t;
i[a].anioffy && (t.y += i[a].anioffy);
}, 0);
}
s.sound && cc.soundMgr.playSound(s.sound);
this.soundname = null;
if (s.loopsound) {
this.soundtime = s.soundtime;
this.soundname = s.loopsound;
this.soundnow = 0;
}
cc.notani ? this.node.active = !1 : this.node.active = !0;
},
updateframe: function() {
if (!cc.notani) {
var t = this;
this.realframe = this.framename + "_" + this.frameidx;
cc.resources.load("eff/" + this.realframe, cc.SpriteFrame, function(e, i) {
if (!e && t.isValid) {
if (i.name != t.realframe) return;
t.sp_frame.spriteFrame = i;
}
});
this.frameidx++;
this.frameidx %= this.framecount;
this.frametime = 0;
}
},
doupdate: function(t) {
if (this.soundname) {
this.soundnow += t;
if (this.soundnow > this.soundtime) {
this.soundnow = 0;
cc.soundMgr.playSound(this.soundname);
}
}
this.frametime += t;
this.frametime >= this.speed && this.updateframe();
this.lifetime -= t;
if (this.subnd && this.lifetime <= 0) {
this.subnd.ctrl.lifetime = 0;
this.subnd = null;
}
if (1 == this.actionid) {
this.waittime -= t;
this.waittime <= 0 && (this.node.scale += t * this.actionp);
}
return this.lifetime <= 0;
},
hook: function(t) {
this.actionid = t.type;
if (1 == this.actionid) {
this.node.scale = t.s;
this.actionp = t.u;
this.waittime = t.wait;
}
}
});
cc._RF.pop();
}, {
effanicfg: "effanicfg"
} ],
fumocfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "72563A4W2xBP5rrcnGKFWrf", "fumocfg");
var i = t("enumcfg"), s = i.enumproperty, n = (i.enumgameflag, i.enumskilltype), a = {
1: {
type: 1,
name: "猫鼬",
itemlist: [],
atkbuff: [ 5, 10003 ],
des: "攻击时有一定几率增加120敏捷",
qulity: 5
},
2: {
type: 1,
name: "灵狐",
itemlist: [],
atkbuff: [ 5, 10004 ],
des: "攻击时有一定几率增加120灵巧",
qulity: 5
},
3: {
type: 1,
name: "吸血鬼之触",
itemlist: [],
property: [ [ s.xixue + 100, 30 ] ],
qulity: 5
},
4: {
type: 1,
name: "魔能之源",
itemlist: [],
property: [ [ s.matk + 100, 15 ] ],
qulity: 5
},
5: {
type: 1,
name: "泰坦之力",
itemlist: [],
property: [ [ s.atk + 100, 15 ] ],
qulity: 5
},
101: {
type: [ [ 2, 1 ] ],
name: "杰出属性",
itemlist: [],
property: [ [ s.vit, 6 ], [ s.str, 6 ], [ s.int, 6 ], [ s.dex, 6 ], [ s.agi, 6 ], [ s.luk, 6 ] ],
des: "全属性+6",
qulity: 5
},
102: {
type: [ [ 2, 1 ] ],
name: "铜墙铁壁",
itemlist: [],
property: [ [ s.def + 100, 10 ], [ s.mdef + 100, 10 ] ],
qulity: 5
},
201: {
type: [ [ 2, 2 ] ],
name: "百发百中",
itemlist: [],
property: [ [ s.hit + 100, 5 ] ],
qulity: 5
},
202: {
type: [ [ 2, 2 ] ],
name: "神行百变",
itemlist: [],
property: [ [ s.flee + 100, 5 ] ],
qulity: 5
},
301: {
type: [ [ 2, 3 ] ],
name: "火焰能量",
itemlist: [],
weaponup: [ n.fire, 10 ],
qulity: 5,
des: "火系伤害提高10%"
},
302: {
type: [ [ 2, 3 ] ],
name: "冰霜能量",
itemlist: [],
weaponup: [ n.cold, 10 ],
qulity: 5,
des: "冰系伤害提高10%"
},
303: {
type: [ [ 2, 3 ] ],
name: "雷霆能量",
itemlist: [],
weaponup: [ n.thunder, 10 ],
qulity: 5,
des: "雷系伤害提高10%"
},
304: {
type: [ [ 2, 3 ] ],
name: "剑之力",
itemlist: [],
weaponup: [ n.sword, 10 ],
qulity: 5,
des: "剑系伤害提高10%"
},
305: {
type: [ [ 2, 3 ] ],
name: "弓之技",
itemlist: [],
weaponup: [ n.bow, 10 ],
qulity: 5,
des: "弓系伤害提高10%"
},
401: {
type: [ [ 2, 4 ] ],
name: "野猪之速",
itemlist: [],
property: [ [ s.vit, 9 ], [ s.movespeed + 100, 8 ] ],
qulity: 5
},
402: {
type: [ [ 2, 4 ] ],
name: "豹之迅捷",
itemlist: [],
property: [ [ s.agi, 9 ], [ s.movespeed + 100, 8 ] ],
qulity: 5
},
501: {
type: [ [ 2, 5 ] ],
name: "致命",
itemlist: [],
property: [ [ s.cri, 10 ] ],
qulity: 5
},
1001: {
name: "初级体质",
property: [ [ s.vit, 3 ] ],
qulity: 1
},
1002: {
name: "初级力量",
property: [ [ s.str, 3 ] ],
qulity: 1
},
1003: {
name: "初级智力",
property: [ [ s.int, 3 ] ],
qulity: 1
},
1004: {
name: "初级灵巧",
property: [ [ s.dex, 3 ] ],
qulity: 1
},
1005: {
name: "初级敏捷",
property: [ [ s.agi, 3 ] ],
qulity: 1
},
1006: {
name: "初级幸运",
property: [ [ s.luk, 3 ] ],
qulity: 1
},
1007: {
name: "中级体质",
property: [ [ s.vit, 5 ] ],
qulity: 2
},
1008: {
name: "中级力量",
property: [ [ s.str, 5 ] ],
qulity: 2
},
1009: {
name: "中级智力",
property: [ [ s.int, 5 ] ],
qulity: 2
},
1010: {
name: "中级灵巧",
property: [ [ s.dex, 5 ] ],
qulity: 2
},
1011: {
name: "中级敏捷",
property: [ [ s.agi, 5 ] ],
qulity: 2
},
1012: {
name: "中级幸运",
property: [ [ s.luk, 5 ] ],
qulity: 2
},
1013: {
name: "上级体质",
property: [ [ s.vit, 7 ] ],
qulity: 3
},
1014: {
name: "上级力量",
property: [ [ s.str, 7 ] ],
qulity: 3
},
1015: {
name: "上级智力",
property: [ [ s.int, 7 ] ],
qulity: 3
},
1016: {
name: "上级灵巧",
property: [ [ s.dex, 7 ] ],
qulity: 3
},
1017: {
name: "上级敏捷",
property: [ [ s.agi, 7 ] ],
qulity: 3
},
1018: {
name: "上级幸运",
property: [ [ s.luk, 7 ] ],
qulity: 3
},
1019: {
name: "高级体质",
property: [ [ s.vit, 9 ] ],
qulity: 4
},
1020: {
name: "高级力量",
property: [ [ s.str, 9 ] ],
qulity: 4
},
1021: {
name: "高级智力",
property: [ [ s.int, 9 ] ],
qulity: 4
},
1022: {
name: "高级灵巧",
property: [ [ s.dex, 9 ] ],
qulity: 4
},
1023: {
name: "高级敏捷",
property: [ [ s.agi, 9 ] ],
qulity: 4
},
1024: {
name: "高级幸运",
property: [ [ s.luk, 9 ] ],
qulity: 4
}
};
e.exports = a;
cc._RF.pop();
}, {
enumcfg: "enumcfg"
} ],
gameConfig: [ function(t, e) {
"use strict";
cc._RF.push(e, "cd175BVogdJg7IL0xfHIf01", "gameConfig");
e.exports = {
itemConfig: {
33015: {
type: 3,
icon: "item25",
des: "能解锁附野猪之速",
name: "野猪之速配方",
id: 33015,
qulity: 5,
subtype: 4,
sp1: 401,
cost: 1e3
},
31013: {
type: 3,
icon: "item33",
des: "能领悟奥义春秋刀法",
name: "春秋刀法",
id: 31013,
qulity: 3,
subtype: 2,
sp1: 1007,
cost: 1e3
},
34002: {
type: 3,
icon: "item26",
des: "能够制作阳炎护手的设计图",
name: "阳炎护手图纸",
id: 34002,
qulity: 5,
subtype: 5,
sp1: 102,
cost: 1e3
},
10021: {
des: "普通攻击时有概率产生一道圣光攻击",
type: 1,
icon: "sword21",
fixproperty: "9:100:10|109:120:0",
name: "光之圣剑",
id: 10021,
fixskill: "39",
cost: 4e3,
subtype: 1,
logiclv: 6
},
32006: {
type: 3,
icon: "item23",
des: "解锁宠物技能治疗术",
name: "宠物治疗术",
id: 32006,
qulity: 3,
subtype: 3,
sp1: 215,
cost: 1e3
},
34028: {
type: 3,
icon: "item26",
des: "能够制作追猎者外套的设计图",
name: "追猎者外套图纸",
id: 34028,
qulity: 5,
subtype: 5,
sp1: 128,
cost: 1e3
},
34029: {
type: 3,
icon: "item26",
des: "能够制作追猎者手套的设计图",
name: "追猎者手套图纸",
id: 34029,
qulity: 5,
subtype: 5,
sp1: 129,
cost: 1e3
},
38021: {
type: 3,
icon: "ys1",
des: "高级材料",
name: "源生之火",
id: 38021,
qulity: 4,
subtype: 8,
cost: 3e3
},
20025: {
type: 2,
icon: "body25",
fixproperty: "13:40:6|14:40:6",
name: "奥丁战铠",
qulity: 5,
id: 20025,
cost: 5e3,
subtype: 1,
logiclv: 6
},
20004: {
type: 2,
icon: "body4",
fixproperty: "13:16:2.5|14:16:2.5",
name: "夜色外套",
id: 20004,
cost: 2e3,
subtype: 1,
logiclv: 2
},
20402: {
type: 2,
icon: "kuzi2",
fixproperty: "8:22:11|16:5:0.55",
name: "皮质裤子",
id: 20402,
cost: 600,
subtype: 5,
logiclv: 1
},
20023: {
type: 2,
icon: "body23",
fixproperty: "13:18:3|14:18:3",
name: "秘银铠甲",
qulity: 3,
id: 20023,
cost: 3e3,
subtype: 1,
logiclv: 3
},
20010: {
type: 2,
icon: "body10",
fixproperty: "13:30:5.5|14:30:5.5",
name: "蓝宝石铠甲",
id: 20010,
cost: 5e3,
subtype: 1,
logiclv: 5
},
20428: {
type: 2,
icon: "kuzi28",
fixproperty: "8:60:30|16:8:1.5",
name: "弓神护腿",
id: 20428,
cost: 5e3,
subtype: 5,
logiclv: 7
},
38054: {
type: 3,
icon: "baoshi4",
des: "宝石",
name: "猫眼石",
id: 38054,
qulity: 3,
subtype: 8,
cost: 400
},
38045: {
type: 3,
icon: "mu5",
des: "木材",
name: "朴",
id: 38045,
qulity: 3,
subtype: 8,
cost: 400
},
20408: {
type: 2,
icon: "kuzi8",
fixproperty: "8:34:17|16:5:0.85",
name: "队长护腿",
id: 20408,
cost: 1800,
subtype: 5,
logiclv: 4
},
34030: {
type: 3,
icon: "item26",
des: "能够制作追猎者长靴的设计图",
name: "追猎者长靴图纸",
id: 34030,
qulity: 5,
subtype: 5,
sp1: 130,
cost: 1e3
},
33003: {
type: 3,
icon: "item25",
des: "能解锁附魔吸血鬼之触",
name: "吸血鬼之触配方",
id: 33003,
qulity: 5,
subtype: 4,
sp1: 3,
cost: 1e3
},
38003: {
type: 3,
icon: "item9",
des: "稀有的附魔材料",
name: "奥术之尘",
id: 38003,
qulity: 3,
subtype: 8,
cost: 500
},
20522: {
type: 2,
icon: "ring23",
fixproperty: "116:50:0",
name: "女神项链",
qulity: 5,
id: 20522,
talent: "2002",
cost: 3e3,
subtype: 6,
logiclv: 5
},
20306: {
type: 2,
icon: "shose6",
fixproperty: "8:30:15|7:10:0",
name: "黄金鞋",
id: 20306,
cost: 1400,
subtype: 4,
logiclv: 3
},
38041: {
type: 3,
icon: "mu1",
des: "木材",
name: "黄月木",
id: 38041,
qulity: 1,
subtype: 8,
cost: 120
},
38026: {
type: 3,
icon: "ys6",
des: "高级材料",
name: "源生虚空",
id: 38026,
qulity: 5,
subtype: 8,
cost: 5e3
},
20018: {
type: 2,
icon: "body18",
fixproperty: "13:18:3|14:18:3",
name: "追猎者外套",
qulity: 3,
id: 20018,
cost: 3e3,
subtype: 1,
logiclv: 3
},
38056: {
type: 3,
icon: "baoshi6",
des: "宝石",
name: "翡翠",
id: 38056,
qulity: 3,
subtype: 8,
cost: 400
},
38051: {
type: 3,
icon: "baoshi1",
des: "宝石",
name: "珍珠",
id: 38051,
qulity: 1,
subtype: 8,
cost: 120
},
10020: {
type: 1,
icon: "sword20",
fixproperty: "9:100:10",
name: "破晓之剑",
id: 10020,
fixskill: "7",
cost: 4e3,
subtype: 1,
logiclv: 6
},
20317: {
type: 2,
icon: "shose17",
fixproperty: "8:26:10|7:10:0",
name: "伪装者长靴",
qulity: 1,
id: 20317,
cost: 600,
subtype: 4,
logiclv: 2
},
34055: {
type: 3,
icon: "item26",
des: "能够制作战国头盔的设计图",
name: "战国头盔图纸",
id: 34055,
qulity: 5,
subtype: 5,
sp1: 155,
cost: 1e3
},
34009: {
type: 3,
icon: "item26",
des: "能够制作霜纹帽的设计图",
name: "霜纹帽图纸",
id: 34009,
qulity: 5,
subtype: 5,
sp1: 109,
cost: 1e3
},
20105: {
type: 2,
icon: "hat5",
fixproperty: "8:40:27",
name: "白银头盔",
id: 20105,
cost: 1400,
subtype: 2,
logiclv: 3
},
20312: {
type: 2,
icon: "shose12",
fixproperty: "8:26:10|7:10:0",
name: "学徒鞋",
qulity: 1,
id: 20312,
cost: 600,
subtype: 4,
logiclv: 2
},
20329: {
type: 2,
icon: "shose29",
fixproperty: "8:80:30|7:20:0",
name: "战神靴",
id: 20329,
cost: 5e3,
subtype: 4,
logiclv: 7
},
34072: {
type: 3,
icon: "item26",
des: "能够制作泰坦神戒的设计图",
name: "泰坦神戒图纸",
id: 34072,
qulity: 5,
subtype: 5,
sp1: 172,
cost: 1e3
},
10102: {
type: 1,
icon: "bow2",
fixproperty: "9:25:5.5",
name: "轻型弓",
id: 10102,
fixskill: "8",
cost: 800,
subtype: 2,
logiclv: 1
},
20116: {
type: 2,
icon: "hat16",
fixproperty: "8:65:42",
name: "紫雷帽",
qulity: 5,
id: 20116,
cost: 3e3,
subtype: 2,
logiclv: 6
},
10009: {
type: 1,
icon: "sword9",
fixproperty: "9:60:9",
name: "荆棘利刃",
id: 10009,
fixskill: "7",
cost: 3500,
subtype: 1,
logiclv: 5
},
10012: {
type: 1,
icon: "sword12",
fixproperty: "9:100:10|119:50:0",
name: "嗜血之刃",
id: 10012,
fixskill: "7",
cost: 4e3,
subtype: 1,
logiclv: 6
},
20412: {
type: 2,
icon: "kuzi12",
fixproperty: "8:26:13|16:5:0.65",
name: "学徒裤子",
qulity: 1,
id: 20412,
cost: 600,
subtype: 5,
logiclv: 2
},
20222: {
type: 2,
icon: "hand22",
fixproperty: "8:23:10|15:5:0.65",
name: "勇气护腕",
qulity: 1,
id: 20222,
cost: 600,
subtype: 3,
logiclv: 2
},
34056: {
type: 3,
icon: "item26",
des: "能够制作战国重铠的设计图",
name: "战国重铠图纸",
id: 34056,
qulity: 5,
subtype: 5,
sp1: 156,
cost: 1e3
},
20220: {
type: 2,
icon: "hand20",
fixproperty: "8:30:20|15:5:1",
name: "兽王手套",
qulity: 5,
id: 20220,
cost: 3e3,
subtype: 3,
logiclv: 6
},
20303: {
type: 2,
icon: "shose3",
fixproperty: "8:24:12|7:10:0",
name: "毛绒鞋",
id: 20303,
cost: 800,
subtype: 4,
logiclv: 2
},
10104: {
type: 1,
icon: "bow4",
fixproperty: "9:35:6.5",
name: "猎弓",
id: 10104,
fixskill: "8",
cost: 1e3,
subtype: 2,
logiclv: 2
},
34066: {
type: 3,
icon: "item26",
des: "能够制作奥丁之戒的设计图",
name: "奥丁之戒图纸",
id: 34066,
qulity: 5,
subtype: 5,
sp1: 166,
cost: 1e3
},
20324: {
type: 2,
icon: "shose24",
fixproperty: "8:50:20|7:10:0",
name: "战国长靴",
qulity: 5,
id: 20324,
cost: 3e3,
subtype: 4,
logiclv: 6
},
20409: {
type: 2,
icon: "kuzi9",
fixproperty: "8:36:18|16:5:0.9",
name: "十字军护腿",
id: 20409,
cost: 2e3,
subtype: 5,
logiclv: 5
},
34048: {
type: 3,
icon: "item26",
des: "能够制作阴影短裤的设计图",
name: "阴影短裤图纸",
id: 34048,
qulity: 5,
subtype: 5,
sp1: 148,
cost: 1e3
},
34013: {
type: 3,
icon: "item26",
des: "能够制作霜纹腰带的设计图",
name: "霜纹腰带图纸",
id: 34013,
qulity: 5,
subtype: 5,
sp1: 113,
cost: 1e3
},
10212: {
type: 1,
icon: "staff12",
fixproperty: "10:100:10",
name: "魔晶法杖",
id: 10212,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 6
},
20307: {
type: 2,
icon: "shose7",
fixproperty: "8:32:16|7:10:0",
name: "钻石鞋",
id: 20307,
cost: 1600,
subtype: 4,
logiclv: 4
},
10215: {
type: 1,
icon: "staff15",
fixproperty: "10:100:10|110:70:0",
name: "大天使之杖",
id: 10215,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 6
},
20002: {
type: 2,
icon: "body2",
fixproperty: "13:12:1.5|14:12:1.5",
name: "皮质外套",
id: 20002,
cost: 1e3,
subtype: 1,
logiclv: 1
},
34065: {
type: 3,
icon: "item26",
des: "能够制作奥丁护腿的设计图",
name: "奥丁护腿图纸",
id: 34065,
qulity: 5,
subtype: 5,
sp1: 165,
cost: 1e3
},
20009: {
type: 2,
icon: "body9",
fixproperty: "13:26:5|14:26:5",
name: "十字军铠甲",
id: 20009,
cost: 4500,
subtype: 1,
logiclv: 5
},
10205: {
type: 1,
icon: "staff5",
fixproperty: "10:40:7",
name: "白银之杖",
id: 10205,
fixskill: "6",
cost: 1500,
subtype: 3,
logiclv: 3
},
38047: {
type: 3,
icon: "mu7",
des: "木材",
name: "丝柏",
id: 38047,
qulity: 3,
subtype: 8,
cost: 800
},
34045: {
type: 3,
icon: "item26",
des: "能够制作阴影斗篷的设计图",
name: "阴影斗篷图纸",
id: 34045,
qulity: 5,
subtype: 5,
sp1: 145,
cost: 1e3
},
20112: {
type: 2,
icon: "hat12",
fixproperty: "8:35:24",
name: "学徒帽",
qulity: 1,
id: 20112,
cost: 800,
subtype: 2,
logiclv: 2
},
10223: {
type: 1,
icon: "staff23",
fixproperty: "10:100:10",
name: "雷元素之杖",
id: 10223,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 6
},
31025: {
type: 3,
icon: "item35",
des: "能领悟奥义弓神技.无影",
name: "弓神技.无影",
id: 31025,
qulity: 5,
subtype: 2,
sp1: 1023,
cost: 1e3
},
20006: {
type: 2,
icon: "body6",
fixproperty: "13:20:3.5|14:20:3.5",
name: "黄金铠甲",
id: 20006,
cost: 3e3,
subtype: 1,
logiclv: 3
},
10216: {
type: 1,
icon: "staff16",
fixproperty: "10:100:10|3:100:0",
name: "元气之光",
id: 10216,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 6
},
38057: {
type: 3,
icon: "baoshi7",
des: "宝石",
name: "暗影石",
id: 38057,
qulity: 3,
subtype: 8,
cost: 800
},
20027: {
type: 2,
icon: "body27",
fixproperty: "13:50:10|14:50:10",
name: "法神披风",
id: 20027,
cost: 5e3,
subtype: 1,
logiclv: 7
},
31020: {
type: 3,
icon: "item35",
des: "能领悟奥义回复光环",
name: "回复光环",
id: 31020,
qulity: 5,
subtype: 2,
sp1: 1018,
cost: 1e3
},
20319: {
type: 2,
icon: "shose19",
fixproperty: "8:50:20|7:10:0",
name: "精灵长靴",
qulity: 5,
id: 20319,
cost: 3e3,
subtype: 4,
logiclv: 6
},
20029: {
type: 2,
icon: "body29",
fixproperty: "13:50:10|14:50:10",
name: "战神战甲",
id: 20029,
cost: 5e3,
subtype: 1,
logiclv: 7
},
20504: {
type: 2,
icon: "ring3",
fixproperty: "101:10:0",
name: "体质戒指",
id: 20504,
cost: 500,
subtype: 6,
logiclv: 3
},
30001: {
type: 3,
icon: "item7",
des: "能封印怪物的卡片",
name: "封印卡",
id: 30001,
qulity: 4,
subtype: 1,
cost: 500
},
20110: {
type: 2,
icon: "hat10",
fixproperty: "8:65:42",
name: "蓝宝石头盔",
id: 20110,
cost: 3e3,
subtype: 2,
logiclv: 5
},
10214: {
type: 1,
icon: "staff14",
fixproperty: "10:100:10",
name: "雷霆权杖",
id: 10214,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 6
},
32007: {
type: 3,
icon: "item23",
des: "解锁宠物技能火箭术",
name: "宠物火箭术",
id: 32007,
qulity: 3,
subtype: 3,
sp1: 216,
cost: 1e3
},
10006: {
type: 1,
icon: "sword6",
fixproperty: "9:45:7.5",
name: "黄金剑",
id: 10006,
fixskill: "7",
cost: 2e3,
subtype: 1,
logiclv: 3
},
38034: {
type: 3,
icon: "kuang2",
des: "矿石",
name: "金锭",
id: 38034,
qulity: 3,
subtype: 8,
cost: 400
},
38018: {
type: 3,
icon: "bu6",
des: "布料",
name: "灵魂布",
id: 38018,
qulity: 4,
subtype: 8,
cost: 800
},
10025: {
des: "普通攻击时50%产生一道圣光攻击",
type: 1,
icon: "sword31",
fixproperty: "9:500:50|109:200:0",
name: "神剑",
id: 10025,
fixskill: "47",
cost: 5e3,
subtype: 1,
logiclv: 7
},
34035: {
type: 3,
icon: "item26",
des: "能够制作精灵长靴的设计图",
name: "精灵长靴图纸",
id: 34035,
qulity: 5,
subtype: 5,
sp1: 135,
cost: 1e3
},
20101: {
type: 2,
icon: "hat1",
fixproperty: "8:20:15",
name: "新人帽",
id: 20101,
cost: 500,
subtype: 2,
logiclv: 1
},
10114: {
des: "普通攻击时有概率产生一条闪电链",
type: 1,
icon: "bow14",
fixproperty: "9:100:10|10:100:10|110:50:0",
name: "圣洁之弓",
id: 10114,
fixskill: "43|45|45|45",
cost: 4e3,
subtype: 2,
logiclv: 6
},
20315: {
type: 2,
icon: "shose15",
fixproperty: "8:50:20|7:10:0",
name: "黯焰软鞋",
qulity: 5,
id: 20315,
cost: 3e3,
subtype: 4,
logiclv: 6
},
20210: {
type: 2,
icon: "hand10",
fixproperty: "8:30:19|15:5:0.95",
name: "蓝宝石手甲",
id: 20210,
cost: 3e3,
subtype: 3,
logiclv: 5
},
33004: {
type: 3,
icon: "item25",
des: "能解锁附魔魔能之源",
name: "魔能之源配方",
id: 33004,
qulity: 5,
subtype: 4,
sp1: 4,
cost: 1e3
},
10022: {
type: 1,
icon: "sword28",
fixproperty: "9:100:10|108:100:0|1:1:0.5",
name: "玄铁重剑",
id: 10022,
fixskill: "7",
cost: 4e3,
subtype: 1,
logiclv: 6
},
20511: {
type: 2,
icon: "ring6",
fixproperty: "20:10:0",
name: "贤者之石",
id: 20511,
talent: "1041",
cost: 500,
subtype: 6,
logiclv: 5
},
38012: {
type: 3,
icon: "bu4",
des: "布料",
name: "符文布",
id: 38012,
qulity: 2,
subtype: 8,
cost: 200
},
20216: {
type: 2,
icon: "hand16",
fixproperty: "8:30:20|15:5:1",
name: "紫雷手套",
qulity: 5,
id: 20216,
cost: 3e3,
subtype: 3,
logiclv: 6
},
34054: {
type: 3,
icon: "item26",
des: "能够制作秘银腿甲的设计图",
name: "秘银腿甲图纸",
id: 34054,
qulity: 5,
subtype: 5,
sp1: 154,
cost: 1e3
},
20501: {
type: 2,
icon: "ring2",
fixproperty: "18:10:0",
name: "阳炎戒指",
qulity: 5,
id: 20501,
cost: 3e3,
subtype: 6,
logiclv: 5
},
20403: {
type: 2,
icon: "kuzi3",
fixproperty: "8:24:12|16:5:0.6",
name: "毛绒裤子",
id: 20403,
cost: 800,
subtype: 5,
logiclv: 2
},
99999: {
type: 1,
icon: "staff10",
fixproperty: "10:20:10",
name: "新手引导之杖",
id: 99999,
fixskill: "6|31|35|37",
cost: 500,
subtype: 3,
logiclv: 5
},
10113: {
type: 1,
icon: "bow13",
fixproperty: "9:100:10",
name: "精灵之弓",
id: 10113,
fixskill: "8",
cost: 4e3,
subtype: 2,
logiclv: 6
},
10219: {
type: 1,
icon: "staff19",
fixproperty: "10:100:10|5:100:0",
name: "巫妖魔杖",
id: 10219,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 6
},
10116: {
type: 1,
icon: "bow16",
fixproperty: "9:100:10|109:120:0",
name: "战栗诡弓",
id: 10116,
fixskill: "8",
cost: 4e3,
subtype: 2,
logiclv: 6
},
31021: {
type: 3,
icon: "item35",
des: "能领悟奥义神技.不动如山",
name: "神技.不动如山",
id: 31021,
qulity: 5,
subtype: 2,
sp1: 1019,
cost: 1e3
},
34036: {
type: 3,
icon: "item26",
des: "能够制作精灵护腿的设计图",
name: "精灵护腿图纸",
id: 34036,
qulity: 5,
subtype: 5,
sp1: 136,
cost: 1e3
},
38036: {
type: 3,
icon: "kuang7",
des: "矿石",
name: "钻石锭",
id: 38036,
qulity: 3,
subtype: 8,
cost: 400
},
31022: {
type: 3,
icon: "item35",
des: "能领悟奥义神技.穿梭自如",
name: "神技.穿梭自如",
id: 31022,
qulity: 5,
subtype: 2,
sp1: 1020,
cost: 1e3
},
20212: {
type: 2,
icon: "hand12",
fixproperty: "8:23:10|15:5:0.65",
name: "学徒手套",
qulity: 1,
id: 20212,
cost: 600,
subtype: 3,
logiclv: 2
},
34027: {
type: 3,
icon: "item26",
des: "能够制作追猎者羽帽的设计图",
name: "追猎者羽帽图纸",
id: 34027,
qulity: 5,
subtype: 5,
sp1: 127,
cost: 1e3
},
10007: {
type: 1,
icon: "sword7",
fixproperty: "9:50:8",
name: "细刃重剑",
id: 10007,
fixskill: "7",
cost: 2500,
subtype: 1,
logiclv: 4
},
20001: {
type: 2,
icon: "body1",
fixproperty: "13:10:1|14:10:1",
name: "新人服",
id: 20001,
cost: 500,
subtype: 1,
logiclv: 1
},
34064: {
type: 3,
icon: "item26",
des: "能够制作奥丁战靴的设计图",
name: "奥丁战靴图纸",
id: 34064,
qulity: 5,
subtype: 5,
sp1: 164,
cost: 1e3
},
20604: {
type: 2,
icon: "shuijing1",
element: "5:5:0",
name: "水火水晶",
id: 20604,
cost: 1e3,
subtype: 7,
logiclv: 1
},
20301: {
type: 2,
icon: "shose1",
fixproperty: "8:20:10|7:10:0",
name: "新人鞋",
id: 20301,
cost: 500,
subtype: 4,
logiclv: 1
},
31015: {
type: 3,
icon: "item33",
des: "能领悟奥义燕返",
name: "燕返",
id: 31015,
qulity: 3,
subtype: 2,
sp1: 1009,
cost: 1e3
},
99998: {
type: 1,
icon: "bow10",
fixproperty: "9:20:10",
name: "新手引导弓",
id: 99998,
fixskill: "8|9|10|12",
cost: 500,
subtype: 2,
logiclv: 5
},
10209: {
type: 1,
icon: "staff9",
fixproperty: "10:60:9",
name: "骷髅之杖",
id: 10209,
fixskill: "6",
cost: 3500,
subtype: 3,
logiclv: 5
},
20015: {
type: 2,
icon: "body15",
fixproperty: "13:40:6|14:40:6",
name: "黯焰披肩",
qulity: 5,
id: 20015,
cost: 5e3,
subtype: 1,
logiclv: 6
},
20228: {
type: 2,
icon: "hand28",
fixproperty: "8:50:30|15:8:1.5",
name: "弓神手套",
id: 20228,
cost: 5e3,
subtype: 3,
logiclv: 7
},
38052: {
type: 3,
icon: "baoshi2",
des: "宝石",
name: "蓝宝石",
id: 38052,
qulity: 2,
subtype: 8,
cost: 200
},
10014: {
des: "普通攻击时有概率触发一次火箭术",
type: 1,
icon: "sword14",
fixproperty: "9:100:10|109:30:0",
name: "火灵之刃",
id: 10014,
fixskill: "41",
cost: 4e3,
subtype: 1,
logiclv: 6
},
20129: {
type: 2,
icon: "hat29",
fixproperty: "8:150:100",
name: "战神盔",
id: 20129,
cost: 5e3,
subtype: 2,
logiclv: 7
},
20213: {
type: 2,
icon: "hand13",
fixproperty: "8:26:14|15:5:0.75",
name: "暗疫之握",
qulity: 3,
id: 20213,
cost: 1200,
subtype: 3,
logiclv: 3
},
34060: {
type: 3,
icon: "item26",
des: "能够制作战国指环的设计图",
name: "战国指环图纸",
id: 34060,
qulity: 5,
subtype: 5,
sp1: 160,
cost: 1e3
},
20423: {
type: 2,
icon: "kuzi23",
fixproperty: "8:30:15|16:5:0.75",
name: "秘银腿甲",
qulity: 3,
id: 20423,
cost: 1200,
subtype: 5,
logiclv: 3
},
10213: {
type: 1,
icon: "staff13",
fixproperty: "10:100:10",
name: "冰晶法杖",
id: 10213,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 6
},
10203: {
type: 1,
icon: "staff3",
fixproperty: "10:30:6",
name: "大地之杖",
id: 10203,
fixskill: "6",
cost: 900,
subtype: 3,
logiclv: 2
},
20005: {
type: 2,
icon: "body5",
fixproperty: "13:18:3|14:18:3",
name: "白银铠甲",
id: 20005,
cost: 2500,
subtype: 1,
logiclv: 3
},
38027: {
type: 3,
icon: "ys7",
des: "高级材料",
name: "源生法力",
id: 38027,
qulity: 5,
subtype: 8,
cost: 5e3
},
34071: {
type: 3,
icon: "item26",
des: "能够制作泰坦腿甲的设计图",
name: "泰坦腿甲图纸",
id: 34071,
qulity: 5,
subtype: 5,
sp1: 171,
cost: 1e3
},
38035: {
type: 3,
icon: "kuang3",
des: "矿石",
name: "秘银锭",
id: 38035,
qulity: 3,
subtype: 8,
cost: 400
},
31001: {
type: 3,
icon: "item35",
des: "能领悟奥义子弹时间",
name: "子弹时间",
id: 31001,
qulity: 5,
subtype: 2,
sp1: 23,
cost: 1e3
},
38033: {
type: 3,
icon: "kuang5",
des: "矿石",
name: "银锭",
id: 38033,
qulity: 3,
subtype: 8,
cost: 400
},
20311: {
type: 2,
icon: "shose11",
fixproperty: "8:26:10|7:10:0",
name: "初心者之鞋",
qulity: 1,
id: 20311,
cost: 600,
subtype: 4,
logiclv: 2
},
31002: {
type: 3,
icon: "item35",
des: "能领悟奥义空间扭曲",
name: "空间扭曲",
id: 31002,
qulity: 5,
subtype: 2,
sp1: 24,
cost: 1e3
},
10218: {
type: 1,
icon: "staff18",
fixproperty: "10:100:10",
name: "法老权杖",
id: 10218,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 6
},
20523: {
type: 2,
icon: "ring3",
fixproperty: "102:20:0",
name: "超力量戒指",
id: 20523,
cost: 3e3,
subtype: 6,
logiclv: 5
},
20415: {
type: 2,
icon: "kuzi15",
fixproperty: "8:40:20|16:5:1",
name: "黯焰护腿",
qulity: 5,
id: 20415,
cost: 3e3,
subtype: 5,
logiclv: 6
},
20411: {
type: 2,
icon: "kuzi11",
fixproperty: "8:26:13|16:5:0.65",
name: "初心者护腿",
qulity: 1,
id: 20411,
cost: 600,
subtype: 5,
logiclv: 2
},
20513: {
type: 2,
icon: "ring13",
fixproperty: "20:30:0",
name: "黯焰戒指",
qulity: 5,
id: 20513,
talent: "1044",
cost: 3e3,
subtype: 6,
logiclv: 5
},
33012: {
type: 3,
icon: "item25",
des: "能解锁附魔雷霆能量",
name: "雷霆能量配方",
id: 33012,
qulity: 5,
subtype: 4,
sp1: 303,
cost: 1e3
},
20113: {
type: 2,
icon: "hat13",
fixproperty: "8:45:30",
name: "暗疫面具",
qulity: 3,
id: 20113,
cost: 1800,
subtype: 2,
logiclv: 3
},
32013: {
type: 3,
icon: "item23",
des: "解锁宠物技能黑龙波",
name: "宠物黑龙波",
id: 32013,
qulity: 5,
subtype: 3,
sp1: 31,
cost: 1e3
},
38004: {
type: 3,
icon: "item1",
des: "罕见的附魔材料",
name: "萦雾水晶",
id: 38004,
qulity: 4,
subtype: 8,
cost: 1e3
},
20122: {
type: 2,
icon: "hat22",
fixproperty: "8:35:24",
name: "勇气头盔",
qulity: 1,
id: 20122,
cost: 800,
subtype: 2,
logiclv: 2
},
10224: {
type: 1,
icon: "staff24",
fixproperty: "10:100:10",
name: "水元素之杖",
id: 10224,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 6
},
10206: {
type: 1,
icon: "staff6",
fixproperty: "10:45:7.5",
name: "黄金之杖",
id: 10206,
fixskill: "6",
cost: 2e3,
subtype: 3,
logiclv: 3
},
99997: {
type: 1,
icon: "sword10",
fixproperty: "9:20:10",
name: "新手引导剑",
id: 99997,
fixskill: "7|18|20|21",
cost: 500,
subtype: 1,
logiclv: 5
},
32002: {
type: 3,
icon: "item23",
des: "解锁宠物技能撕裂",
name: "宠物撕裂",
id: 32002,
qulity: 3,
subtype: 3,
sp1: 211,
cost: 1e3
},
20128: {
type: 2,
icon: "hat28",
fixproperty: "8:150:100",
name: "弓神帽",
id: 20128,
cost: 5e3,
subtype: 2,
logiclv: 7
},
20205: {
type: 2,
icon: "hand5",
fixproperty: "8:24:14|15:5:0.7",
name: "白银手甲",
id: 20205,
cost: 1200,
subtype: 3,
logiclv: 3
},
20121: {
type: 2,
icon: "hat21",
fixproperty: "8:70:50",
name: "阴影兜帽",
qulity: 5,
id: 20121,
cost: 3e3,
subtype: 2,
logiclv: 6
},
31004: {
type: 3,
icon: "item34",
des: "能领悟奥义闪电五连鞭",
name: "闪电五连鞭",
id: 31004,
qulity: 4,
subtype: 2,
sp1: 1013,
cost: 1e3
},
10001: {
type: 1,
icon: "sword1",
fixproperty: "9:20:5",
name: "新人剑",
id: 10001,
fixskill: "7|21|18|20",
cost: 500,
subtype: 1,
logiclv: 1
},
20125: {
type: 2,
icon: "hat25",
fixproperty: "8:100:60",
name: "奥丁战盔",
qulity: 5,
id: 20125,
cost: 3e3,
subtype: 2,
logiclv: 6
},
20316: {
type: 2,
icon: "shose16",
fixproperty: "8:50:20|7:10:0",
name: "紫雷长靴",
qulity: 5,
id: 20316,
cost: 3e3,
subtype: 4,
logiclv: 6
},
20413: {
type: 2,
icon: "kuzi13",
fixproperty: "8:30:15|16:5:0.75",
name: "暗疫护腿",
qulity: 3,
id: 20413,
cost: 1200,
subtype: 5,
logiclv: 3
},
20404: {
type: 2,
icon: "kuzi4",
fixproperty: "8:26:13|16:5:0.65",
name: "夜色裤子",
id: 20404,
cost: 1e3,
subtype: 5,
logiclv: 2
},
20506: {
type: 2,
icon: "ring11",
fixproperty: "16:10:0",
name: "钻石戒指",
id: 20506,
cost: 500,
subtype: 6,
logiclv: 3
},
34007: {
type: 3,
icon: "item23",
des: "能够制作暗疫软鞋的设计图",
name: "暗疫软鞋图纸",
id: 34007,
qulity: 3,
subtype: 5,
sp1: 107,
cost: 600
},
20425: {
type: 2,
icon: "kuzi25",
fixproperty: "8:40:20|16:5:1",
name: "奥丁护腿",
qulity: 5,
id: 20425,
cost: 3e3,
subtype: 5,
logiclv: 6
},
38017: {
type: 3,
icon: "bu8",
des: "布料",
name: "原始月布",
id: 38017,
qulity: 3,
subtype: 8,
cost: 800
},
38022: {
type: 3,
icon: "ys2",
des: "高级材料",
name: "源生之水",
id: 38022,
qulity: 4,
subtype: 8,
cost: 3e3
},
33006: {
type: 3,
icon: "item25",
des: "能解锁附魔杰出属性",
name: "杰出属性配方",
id: 33006,
qulity: 5,
subtype: 4,
sp1: 101,
cost: 1e3
},
38025: {
type: 3,
icon: "ys5",
des: "高级材料",
name: "源生暗影",
id: 38025,
qulity: 5,
subtype: 8,
cost: 5e3
},
34050: {
type: 3,
icon: "item26",
des: "能够制作秘银战盔的设计图",
name: "秘银战盔图纸",
id: 34050,
qulity: 5,
subtype: 5,
sp1: 150,
cost: 1e3
},
34039: {
type: 3,
icon: "item26",
des: "能够制作兽王披肩的设计图",
name: "兽王披肩图纸",
id: 34039,
qulity: 5,
subtype: 5,
sp1: 139,
cost: 1e3
},
10117: {
des: "普通攻击时有概率产生一条闪电链",
type: 1,
icon: "bow17",
fixproperty: "9:80:8|10:80:8",
name: "暗影诛灭",
id: 10117,
fixskill: "43",
cost: 4e3,
subtype: 2,
logiclv: 6
},
20521: {
type: 2,
icon: "ring21",
fixproperty: "21:150:0",
name: "魔王戒指",
qulity: 5,
id: 20521,
talent: "1043",
cost: 3e3,
subtype: 6,
logiclv: 5
},
34014: {
type: 3,
icon: "item26",
des: "能够制作霜纹戒指的设计图",
name: "霜纹戒指图纸",
id: 34014,
qulity: 5,
subtype: 5,
sp1: 114,
cost: 1e3
},
30003: {
type: 3,
icon: "item21",
des: "能重置宠物档次",
name: "宠物洗档卷",
id: 30003,
qulity: 5,
subtype: 1,
cost: 1e3
},
20606: {
type: 2,
icon: "shuijing3",
element: "5:0:5",
name: "雷水水晶",
id: 20606,
cost: 1e3,
subtype: 7,
logiclv: 1
},
20326: {
type: 2,
icon: "shose26",
fixproperty: "8:50:20|7:10:0",
name: "泰坦战靴",
qulity: 5,
id: 20326,
cost: 3e3,
subtype: 4,
logiclv: 6
},
20102: {
type: 2,
icon: "hat2",
fixproperty: "8:25:18",
name: "皮质帽子",
id: 20102,
cost: 800,
subtype: 2,
logiclv: 1
},
34061: {
type: 3,
icon: "item26",
des: "能够制作奥丁战盔的设计图",
name: "奥丁战盔图纸",
id: 34061,
qulity: 5,
subtype: 5,
sp1: 161,
cost: 1e3
},
20008: {
type: 2,
icon: "body8",
fixproperty: "13:24:4.5|14:24:4.5",
name: "队长铠甲",
id: 20008,
cost: 4e3,
subtype: 1,
logiclv: 4
},
20314: {
type: 2,
icon: "shose14",
fixproperty: "8:50:20|7:10:0",
name: "霜纹长靴",
qulity: 5,
id: 20314,
cost: 3e3,
subtype: 4,
logiclv: 6
},
20525: {
type: 2,
icon: "ring3",
fixproperty: "105:20:0",
name: "超智力戒指",
id: 20525,
cost: 3e3,
subtype: 6,
logiclv: 5
},
38037: {
type: 3,
icon: "kuang8",
des: "矿石",
name: "魔法锭",
id: 38037,
qulity: 3,
subtype: 8,
cost: 800
},
38014: {
type: 3,
icon: "bu2",
des: "布料",
name: "暗影布",
id: 38014,
qulity: 3,
subtype: 8,
cost: 400
},
20605: {
type: 2,
icon: "shuijing2",
element: "0:5:5",
name: "火雷水晶",
id: 20605,
cost: 1e3,
subtype: 7,
logiclv: 1
},
10111: {
type: 1,
icon: "bow12",
fixproperty: "9:100:10",
name: "诅咒之弓",
id: 10111,
fixskill: "8",
cost: 4e3,
subtype: 2,
logiclv: 6
},
32008: {
type: 3,
icon: "item23",
des: "解锁宠物技能冰箭术",
name: "宠物冰箭术",
id: 32008,
qulity: 3,
subtype: 3,
sp1: 217,
cost: 1e3
},
32015: {
type: 3,
icon: "item23",
des: "解锁宠物技能五连矢",
name: "宠物五连矢",
id: 32015,
qulity: 5,
subtype: 3,
sp1: 220,
cost: 1e3
},
20607: {
type: 2,
icon: "shuijing1",
element: "10:10:0",
name: "超水火水晶",
id: 20607,
cost: 1e3,
subtype: 7,
logiclv: 5
},
20126: {
type: 2,
icon: "hat26",
fixproperty: "8:100:60",
name: "泰坦战盔",
qulity: 5,
id: 20126,
cost: 3e3,
subtype: 2,
logiclv: 6
},
32004: {
type: 3,
icon: "item23",
des: "解锁宠物技能圣盾",
name: "宠物圣盾",
id: 32004,
qulity: 3,
subtype: 3,
sp1: 213,
cost: 1e3
},
20505: {
type: 2,
icon: "ring3",
fixproperty: "104:10:0",
name: "敏捷戒指",
id: 20505,
cost: 500,
subtype: 6,
logiclv: 3
},
38031: {
type: 3,
icon: "kuang1",
des: "矿石",
name: "铜锭",
id: 38031,
qulity: 1,
subtype: 8,
cost: 120
},
20203: {
type: 2,
icon: "hand3",
fixproperty: "8:22:12|15:5:0.6",
name: "毛绒手套",
id: 20203,
cost: 800,
subtype: 3,
logiclv: 2
},
20214: {
type: 2,
icon: "hand14",
fixproperty: "8:30:20|15:5:1",
name: "霜纹手套",
qulity: 5,
id: 20214,
cost: 3e3,
subtype: 3,
logiclv: 6
},
20321: {
type: 2,
icon: "shose21",
fixproperty: "8:50:20|7:10:0",
name: "阴影长靴",
qulity: 5,
id: 20321,
cost: 3e3,
subtype: 4,
logiclv: 6
},
34016: {
type: 3,
icon: "item26",
des: "能够制作黯焰披肩的设计图",
name: "黯焰披肩图纸",
id: 34016,
qulity: 5,
subtype: 5,
sp1: 116,
cost: 1e3
},
20302: {
type: 2,
icon: "shose2",
fixproperty: "8:22:11|7:10:0",
name: "皮质鞋",
id: 20302,
cost: 600,
subtype: 4,
logiclv: 1
},
20021: {
type: 2,
icon: "body21",
fixproperty: "13:40:6|14:40:6",
name: "阴影斗篷",
qulity: 5,
id: 20021,
cost: 5e3,
subtype: 1,
logiclv: 6
},
20422: {
type: 2,
icon: "kuzi22",
fixproperty: "8:26:13|16:5:0.65",
name: "勇气短裤",
qulity: 1,
id: 20422,
cost: 600,
subtype: 5,
logiclv: 2
},
20017: {
type: 2,
icon: "body17",
fixproperty: "13:14:2|14:14:2",
name: "伪装者护甲",
qulity: 1,
id: 20017,
cost: 1500,
subtype: 1,
logiclv: 2
},
20016: {
type: 2,
icon: "body16",
fixproperty: "13:40:6|14:40:6",
name: "紫雷斗篷",
qulity: 5,
id: 20016,
cost: 5e3,
subtype: 1,
logiclv: 6
},
20103: {
type: 2,
icon: "hat3",
fixproperty: "8:30:21",
name: "毛绒帽子",
id: 20103,
cost: 1e3,
subtype: 2,
logiclv: 2
},
20003: {
type: 2,
icon: "body3",
fixproperty: "13:14:2|14:14:2",
name: "毛绒外套",
id: 20003,
cost: 1500,
subtype: 1,
logiclv: 2
},
20225: {
type: 2,
icon: "hand25",
fixproperty: "8:30:20|15:5:1",
name: "奥丁手甲",
qulity: 5,
id: 20225,
cost: 3e3,
subtype: 3,
logiclv: 6
},
32001: {
type: 3,
icon: "item23",
des: "解锁宠物技能狂击",
name: "宠物狂击",
id: 32001,
qulity: 3,
subtype: 3,
sp1: 210,
cost: 1e3
},
20221: {
type: 2,
icon: "hand21",
fixproperty: "8:30:20|15:5:1",
name: "阴影手套",
qulity: 5,
id: 20221,
cost: 3e3,
subtype: 3,
logiclv: 6
},
34004: {
type: 3,
icon: "item23",
des: "能够制作暗疫面具的设计图",
name: "暗疫面具图纸",
id: 34004,
qulity: 3,
subtype: 5,
sp1: 104,
cost: 600
},
10201: {
type: 1,
icon: "staff1",
fixproperty: "10:20:5",
name: "新人杖",
id: 10201,
fixskill: "6|28|26|27",
cost: 500,
subtype: 3,
logiclv: 1
},
34053: {
type: 3,
icon: "item26",
des: "能够制作秘银战靴的设计图",
name: "秘银战靴图纸",
id: 34053,
qulity: 5,
subtype: 5,
sp1: 153,
cost: 1e3
},
20427: {
type: 2,
icon: "kuzi27",
fixproperty: "8:60:30|16:8:1.5",
name: "法神护腿",
id: 20427,
cost: 5e3,
subtype: 5,
logiclv: 7
},
38016: {
type: 3,
icon: "bu7",
des: "布料",
name: "灵纹布",
id: 38016,
qulity: 3,
subtype: 8,
cost: 400
},
20106: {
type: 2,
icon: "hat6",
fixproperty: "8:45:30",
name: "黄金头盔",
id: 20106,
cost: 1600,
subtype: 2,
logiclv: 3
},
32011: {
type: 3,
icon: "item23",
des: "解锁宠物技能叉状闪电",
name: "宠物叉状闪电",
id: 32011,
qulity: 5,
subtype: 3,
sp1: 34,
cost: 1e3
},
34052: {
type: 3,
icon: "item26",
des: "能够制作秘银手甲的设计图",
name: "秘银手甲图纸",
id: 34052,
qulity: 5,
subtype: 5,
sp1: 152,
cost: 1e3
},
10110: {
type: 1,
icon: "bow10",
fixproperty: "9:65:9.5",
name: "勇者之弓",
id: 10110,
fixskill: "8",
cost: 4e3,
subtype: 2,
logiclv: 5
},
20204: {
type: 2,
icon: "hand4",
fixproperty: "8:23:13|15:5:0.65",
name: "夜色手套",
id: 20204,
cost: 1e3,
subtype: 3,
logiclv: 2
},
34026: {
type: 3,
icon: "item26",
des: "能够制作紫雷戒指的设计图",
name: "紫雷戒指图纸",
id: 34026,
qulity: 5,
subtype: 5,
sp1: 126,
cost: 1e3
},
20512: {
type: 2,
icon: "ring12",
fixproperty: "20:30:0",
name: "霜纹戒指",
qulity: 5,
id: 20512,
talent: "1044",
cost: 3e3,
subtype: 6,
logiclv: 5
},
20418: {
type: 2,
icon: "kuzi18",
fixproperty: "8:30:15|16:5:0.75",
name: "追猎者短裤",
qulity: 3,
id: 20418,
cost: 1200,
subtype: 5,
logiclv: 3
},
34051: {
type: 3,
icon: "item26",
des: "能够制作秘银铠甲的设计图",
name: "秘银铠甲图纸",
id: 34051,
qulity: 5,
subtype: 5,
sp1: 151,
cost: 1e3
},
38005: {
type: 3,
icon: "item8",
des: "传说中的附魔材料",
name: "遗忘之魂",
id: 38005,
qulity: 5,
subtype: 8,
cost: 3e3
},
10207: {
type: 1,
icon: "staff7",
fixproperty: "10:50:8",
name: "森之杖",
id: 10207,
fixskill: "6",
cost: 2500,
subtype: 3,
logiclv: 4
},
31026: {
type: 3,
icon: "item35",
des: "能领悟奥义法神技.多重释法",
name: "法神技.多重释法",
id: 31026,
qulity: 5,
subtype: 2,
sp1: 1024,
cost: 1e3
},
20502: {
type: 2,
icon: "ring1",
fixproperty: "18:10:0",
name: "巨人戒指",
id: 20502,
talent: "1043",
cost: 500,
subtype: 6,
logiclv: 3
},
20406: {
type: 2,
icon: "kuzi6",
fixproperty: "8:30:15|16:5:0.75",
name: "黄金护腿",
id: 20406,
cost: 1400,
subtype: 5,
logiclv: 3
},
38038: {
type: 3,
icon: "kuang6",
des: "矿石",
name: "熔岩锭",
id: 38038,
qulity: 4,
subtype: 8,
cost: 800
},
20226: {
type: 2,
icon: "hand26",
fixproperty: "8:30:20|15:5:1",
name: "泰坦手甲",
qulity: 5,
id: 20226,
cost: 3e3,
subtype: 3,
logiclv: 6
},
10015: {
type: 1,
icon: "sword15",
fixproperty: "9:100:10",
name: "弑光",
id: 10015,
fixskill: "7",
cost: 4e3,
subtype: 1,
logiclv: 6
},
38023: {
type: 3,
icon: "ys3",
des: "高级材料",
name: "源生之雷",
id: 38023,
qulity: 4,
subtype: 8,
cost: 3e3
},
38058: {
type: 3,
icon: "baoshi8",
des: "宝石",
name: "黑曜石",
id: 38058,
qulity: 4,
subtype: 8,
cost: 800
},
20124: {
type: 2,
icon: "hat24",
fixproperty: "8:100:60",
name: "战国头盔",
qulity: 5,
id: 20124,
cost: 3e3,
subtype: 2,
logiclv: 6
},
20424: {
type: 2,
icon: "kuzi24",
fixproperty: "8:40:20|16:5:1",
name: "战国护腿",
qulity: 5,
id: 20424,
cost: 3e3,
subtype: 5,
logiclv: 6
},
34023: {
type: 3,
icon: "item26",
des: "能够制作紫雷手套的设计图",
name: "紫雷手套图纸",
id: 34023,
qulity: 5,
subtype: 5,
sp1: 123,
cost: 1e3
},
20603: {
type: 2,
icon: "shuijing6",
element: "0:0:10",
name: "纯雷水晶",
id: 20603,
cost: 5e3,
subtype: 7,
logiclv: 1
},
20420: {
type: 2,
icon: "kuzi20",
fixproperty: "8:40:20|16:5:1",
name: "兽王护腿",
qulity: 5,
id: 20420,
cost: 3e3,
subtype: 5,
logiclv: 6
},
34015: {
type: 3,
icon: "item26",
des: "能够制作黯焰帽的设计图",
name: "黯焰帽图纸",
id: 34015,
qulity: 5,
subtype: 5,
sp1: 115,
cost: 1e3
},
20114: {
type: 2,
icon: "hat14",
fixproperty: "8:65:42",
name: "霜纹帽",
qulity: 5,
id: 20114,
cost: 3e3,
subtype: 2,
logiclv: 6
},
34012: {
type: 3,
icon: "item26",
des: "能够制作霜纹长靴的设计图",
name: "霜纹长靴图纸",
id: 34012,
qulity: 5,
subtype: 5,
sp1: 112,
cost: 1e3
},
20227: {
type: 2,
icon: "hand27",
fixproperty: "8:50:30|15:8:1.5",
name: "法神手套",
id: 20227,
cost: 5e3,
subtype: 3,
logiclv: 7
},
20414: {
type: 2,
icon: "kuzi14",
fixproperty: "8:40:20|16:5:1",
name: "霜纹护腿",
qulity: 5,
id: 20414,
cost: 3e3,
subtype: 5,
logiclv: 6
},
20024: {
type: 2,
icon: "body24",
fixproperty: "13:40:6|14:40:6",
name: "战国重铠",
qulity: 5,
id: 20024,
cost: 5e3,
subtype: 1,
logiclv: 6
},
10221: {
type: 1,
icon: "staff21",
fixproperty: "10:100:10",
name: "业火魔杖",
id: 10221,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 6
},
38015: {
type: 3,
icon: "bu3",
des: "布料",
name: "月布",
id: 38015,
qulity: 3,
subtype: 8,
cost: 400
},
20304: {
type: 2,
icon: "shose4",
fixproperty: "8:26:13|7:10:0",
name: "夜色鞋",
id: 20304,
cost: 1e3,
subtype: 4,
logiclv: 2
},
34043: {
type: 3,
icon: "item26",
des: "能够制作兽王骨链的设计图",
name: "兽王骨链图纸",
id: 34043,
qulity: 5,
subtype: 5,
sp1: 143,
cost: 1e3
},
20109: {
type: 2,
icon: "hat9",
fixproperty: "8:60:39",
name: "十字军头盔",
id: 20109,
cost: 2200,
subtype: 2,
logiclv: 5
},
20515: {
type: 2,
icon: "ring15",
fixproperty: "117:30:0",
name: "精灵指环",
qulity: 5,
id: 20515,
talent: "1043",
cost: 3e3,
subtype: 6,
logiclv: 5
},
10002: {
type: 1,
icon: "sword2",
fixproperty: "9:25:5.5",
name: "阔剑",
id: 10002,
fixskill: "7",
cost: 800,
subtype: 1,
logiclv: 1
},
10202: {
type: 1,
icon: "staff2",
fixproperty: "10:25:5.5",
name: "魔晶之杖",
id: 10202,
fixskill: "6",
cost: 800,
subtype: 3,
logiclv: 1
},
20407: {
type: 2,
icon: "kuzi7",
fixproperty: "8:32:16|16:5:0.8",
name: "钻石护腿",
id: 20407,
cost: 1600,
subtype: 5,
logiclv: 4
},
38001: {
type: 3,
icon: "item3",
des: "普通的附魔材料",
name: "万用材料",
id: 38001,
qulity: 1,
subtype: 8,
cost: 100
},
38013: {
type: 3,
icon: "bu5",
des: "布料",
name: "魔法布",
id: 38013,
qulity: 3,
subtype: 8,
cost: 400
},
10004: {
type: 1,
icon: "sword4",
fixproperty: "9:35:6.5",
name: "护身短剑",
id: 10004,
fixskill: "7",
cost: 1e3,
subtype: 1,
logiclv: 2
},
34057: {
type: 3,
icon: "item26",
des: "能够制作战国手甲的设计图",
name: "战国手甲图纸",
id: 34057,
qulity: 5,
subtype: 5,
sp1: 157,
cost: 1e3
},
31016: {
type: 3,
icon: "item35",
des: "能领悟奥义闪避光环",
name: "闪避光环",
id: 31016,
qulity: 5,
subtype: 2,
sp1: 1014,
cost: 1e3
},
31006: {
type: 3,
icon: "item34",
des: "能领悟奥义奶一大口",
name: "奶一大口",
id: 31006,
qulity: 4,
subtype: 2,
sp1: 1010,
cost: 1e3
},
10103: {
type: 1,
icon: "bow3",
fixproperty: "9:30:6",
name: "短弓",
id: 10103,
fixskill: "8",
cost: 900,
subtype: 2,
logiclv: 2
},
31018: {
type: 3,
icon: "item35",
des: "能领悟奥义吸血光环",
name: "吸血光环",
id: 31018,
qulity: 5,
subtype: 2,
sp1: 1016,
cost: 1e3
},
20325: {
type: 2,
icon: "shose25",
fixproperty: "8:50:20|7:10:0",
name: "奥丁战靴",
qulity: 5,
id: 20325,
cost: 3e3,
subtype: 4,
logiclv: 6
},
34059: {
type: 3,
icon: "item26",
des: "能够制作战国护腿的设计图",
name: "战国护腿图纸",
id: 34059,
qulity: 5,
subtype: 5,
sp1: 159,
cost: 1e3
},
33009: {
type: 3,
icon: "item25",
des: "能解锁附魔神行百变",
name: "神行百变配方",
id: 33009,
qulity: 5,
subtype: 4,
sp1: 202,
cost: 1e3
},
34041: {
type: 3,
icon: "item26",
des: "能够制作兽王皮鞋的设计图",
name: "兽王皮鞋图纸",
id: 34041,
qulity: 5,
subtype: 5,
sp1: 141,
cost: 1e3
},
20224: {
type: 2,
icon: "hand24",
fixproperty: "8:30:20|15:5:1",
name: "战国手甲",
qulity: 5,
id: 20224,
cost: 3e3,
subtype: 3,
logiclv: 6
},
20111: {
type: 2,
icon: "hat11",
fixproperty: "8:25:18",
name: "初心者之帽",
qulity: 1,
id: 20111,
cost: 500,
subtype: 2,
logiclv: 2
},
20013: {
type: 2,
icon: "body13",
fixproperty: "13:18:3|14:18:3",
name: "暗疫斗篷",
qulity: 3,
id: 20013,
cost: 3e3,
subtype: 1,
logiclv: 3
},
34018: {
type: 3,
icon: "item26",
des: "能够制作黯焰软鞋的设计图",
name: "黯焰软鞋图纸",
id: 34018,
qulity: 5,
subtype: 5,
sp1: 118,
cost: 1e3
},
20123: {
type: 2,
icon: "hat23",
fixproperty: "8:45:30",
name: "秘银战盔",
qulity: 3,
id: 20123,
cost: 1800,
subtype: 2,
logiclv: 3
},
20208: {
type: 2,
icon: "hand8",
fixproperty: "8:27:17|15:5:0.85",
name: "队长手甲",
id: 20208,
cost: 1800,
subtype: 3,
logiclv: 4
},
10119: {
des: "普通攻击多重射",
type: 1,
icon: "bow11",
fixproperty: "9:500:50|109:200:0",
name: "神弓",
id: 10119,
fixskill: "46",
cost: 5e3,
subtype: 2,
logiclv: 7
},
34037: {
type: 3,
icon: "item26",
des: "能够制作精灵指环的设计图",
name: "精灵指环图纸",
id: 34037,
qulity: 5,
subtype: 5,
sp1: 137,
cost: 1e3
},
34006: {
type: 3,
icon: "item23",
des: "能够制作暗疫之握的设计图",
name: "暗疫之握图纸",
id: 34006,
qulity: 3,
subtype: 5,
sp1: 106,
cost: 600
},
33002: {
type: 3,
icon: "item25",
des: "能解锁附魔灵狐",
name: "灵狐配方",
id: 33002,
qulity: 5,
subtype: 4,
sp1: 2,
cost: 1e3
},
33011: {
type: 3,
icon: "item25",
des: "能解锁附魔冰霜能量",
name: "冰霜能量配方",
id: 33011,
qulity: 5,
subtype: 4,
sp1: 302,
cost: 1e3
},
10210: {
type: 1,
icon: "staff10",
fixproperty: "10:65:9.5",
name: "勇者之杖",
id: 10210,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 5
},
32005: {
type: 3,
icon: "item23",
des: "解锁宠物技能恢复术",
name: "宠物恢复术",
id: 32005,
qulity: 3,
subtype: 3,
sp1: 214,
cost: 1e3
},
20229: {
type: 2,
icon: "hand29",
fixproperty: "8:50:30|15:8:1.5",
name: "战神手套",
id: 20229,
cost: 5e3,
subtype: 3,
logiclv: 7
},
20417: {
type: 2,
icon: "kuzi17",
fixproperty: "8:26:13|16:5:0.65",
name: "伪装者短裤",
qulity: 1,
id: 20417,
cost: 600,
subtype: 5,
logiclv: 2
},
20209: {
type: 2,
icon: "hand9",
fixproperty: "8:28:18|15:5:0.9",
name: "十字军手甲",
id: 20209,
cost: 2e3,
subtype: 3,
logiclv: 5
},
20519: {
type: 2,
icon: "ring19",
fixproperty: "119:30:0",
name: "奥丁之戒",
qulity: 5,
id: 20519,
talent: "1043",
cost: 3e3,
subtype: 6,
logiclv: 5
},
38044: {
type: 3,
icon: "mu4",
des: "木材",
name: "赤松",
id: 38044,
qulity: 3,
subtype: 8,
cost: 400
},
33017: {
type: 3,
icon: "item25",
des: "能解锁附致命",
name: "致命配方",
id: 33017,
qulity: 5,
subtype: 4,
sp1: 501,
cost: 1e3
},
34032: {
type: 3,
icon: "item26",
des: "能够制作精灵兜帽的设计图",
name: "精灵兜帽图纸",
id: 34032,
qulity: 5,
subtype: 5,
sp1: 132,
cost: 1e3
},
38002: {
type: 3,
icon: "item5",
des: "优良的附魔材料",
name: "神秘精华",
id: 38002,
qulity: 2,
subtype: 8,
cost: 300
},
38046: {
type: 3,
icon: "mu6",
des: "木材",
name: "杉",
id: 38046,
qulity: 3,
subtype: 8,
cost: 400
},
20007: {
type: 2,
icon: "body7",
fixproperty: "13:22:4|14:22:4",
name: "钻石铠甲",
id: 20007,
cost: 3500,
subtype: 1,
logiclv: 4
},
20320: {
type: 2,
icon: "shose20",
fixproperty: "8:50:20|7:10:0",
name: "兽王皮鞋",
qulity: 5,
id: 20320,
cost: 3e3,
subtype: 4,
logiclv: 6
},
34038: {
type: 3,
icon: "item26",
des: "能够制作兽王头盔的设计图",
name: "兽王头盔图纸",
id: 34038,
qulity: 5,
subtype: 5,
sp1: 138,
cost: 1e3
},
20115: {
type: 2,
icon: "hat15",
fixproperty: "8:65:42",
name: "黯焰帽",
qulity: 5,
id: 20115,
cost: 3e3,
subtype: 2,
logiclv: 6
},
34034: {
type: 3,
icon: "item26",
des: "能够制作精灵手套的设计图",
name: "精灵手套图纸",
id: 34034,
qulity: 5,
subtype: 5,
sp1: 134,
cost: 1e3
},
34033: {
type: 3,
icon: "item26",
des: "能够制作精灵披肩的设计图",
name: "精灵披肩图纸",
id: 34033,
qulity: 5,
subtype: 5,
sp1: 133,
cost: 1e3
},
20107: {
type: 2,
icon: "hat7",
fixproperty: "8:50:33",
name: "钻石头盔",
id: 20107,
cost: 1800,
subtype: 2,
logiclv: 4
},
10109: {
type: 1,
icon: "bow9",
fixproperty: "9:60:9",
name: "日光之弓",
id: 10109,
fixskill: "8",
cost: 3500,
subtype: 2,
logiclv: 5
},
38042: {
type: 3,
icon: "mu2",
des: "木材",
name: "铁杉",
id: 38042,
qulity: 2,
subtype: 8,
cost: 200
},
20309: {
type: 2,
icon: "shose9",
fixproperty: "8:36:18|7:10:0",
name: "十字军鞋",
id: 20309,
cost: 2200,
subtype: 4,
logiclv: 5
},
20207: {
type: 2,
icon: "hand7",
fixproperty: "8:26:16|15:5:0.8",
name: "钻石手甲",
id: 20207,
cost: 1600,
subtype: 3,
logiclv: 4
},
20223: {
type: 2,
icon: "hand23",
fixproperty: "8:26:14|15:5:0.75",
name: "秘银手甲",
qulity: 3,
id: 20223,
cost: 1200,
subtype: 3,
logiclv: 3
},
34063: {
type: 3,
icon: "item26",
des: "能够制作奥丁手甲的设计图",
name: "奥丁手甲图纸",
id: 34063,
qulity: 5,
subtype: 5,
sp1: 163,
cost: 1e3
},
34031: {
type: 3,
icon: "item26",
des: "能够制作追猎者短裤的设计图",
name: "追猎者短裤图纸",
id: 34031,
qulity: 5,
subtype: 5,
sp1: 131,
cost: 1e3
},
34011: {
type: 3,
icon: "item26",
des: "能够制作霜纹手套的设计图",
name: "霜纹手套图纸",
id: 34011,
qulity: 5,
subtype: 5,
sp1: 111,
cost: 1e3
},
20520: {
type: 2,
icon: "ring20",
fixproperty: "119:30:0",
name: "泰坦神戒",
qulity: 5,
id: 20520,
talent: "1043",
cost: 3e3,
subtype: 6,
logiclv: 5
},
10023: {
type: 1,
icon: "sword23",
fixproperty: "9:100:10",
name: "斩月",
id: 10023,
fixskill: "7",
cost: 4e3,
subtype: 1,
logiclv: 6
},
10220: {
type: 1,
icon: "staff20",
fixproperty: "10:100:10",
name: "噬魂巫杖",
id: 10220,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 6
},
20322: {
type: 2,
icon: "shose22",
fixproperty: "8:26:10|7:10:0",
name: "勇气短鞋",
qulity: 1,
id: 20322,
cost: 600,
subtype: 4,
logiclv: 2
},
20410: {
type: 2,
icon: "kuzi10",
fixproperty: "8:38:19|16:5:0.95",
name: "蓝宝石护腿",
id: 20410,
cost: 3e3,
subtype: 5,
logiclv: 5
},
20305: {
type: 2,
icon: "shose5",
fixproperty: "8:28:14|7:10:0",
name: "白银鞋",
id: 20305,
cost: 1200,
subtype: 4,
logiclv: 3
},
20509: {
type: 2,
icon: "ring7",
fixproperty: "5:10:0",
name: "秘法戒指",
id: 20509,
talent: "1044",
cost: 500,
subtype: 6,
logiclv: 3
},
35001: {
type: 3,
icon: "item36",
des: "能开出啥呢？",
name: "盲盒",
id: 35001,
qulity: 5,
subtype: 6,
sp1: "31016|31017|31018|31019|31020|31001|31002|31003|31004|31005|31006|31007|31008|31009|31010|31011|31012|31013|31014|31015|32001|32002|32003|32004|32005|32006|32007|32008|33001|33002|33003|33004|33005|33006|33007|33008|33009|33010|33011|33012|33013|33014|33015|33016|33017|30004",
cost: 1e3
},
20219: {
type: 2,
icon: "hand19",
fixproperty: "8:30:20|15:5:1",
name: "精灵手套",
qulity: 5,
id: 20219,
cost: 3e3,
subtype: 3,
logiclv: 6
},
10211: {
type: 1,
icon: "staff11",
fixproperty: "10:100:10",
name: "邪火法杖",
id: 10211,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 6
},
32012: {
type: 3,
icon: "item23",
des: "解锁宠物技能冰封球",
name: "宠物冰封球",
id: 32012,
qulity: 5,
subtype: 3,
sp1: 33,
cost: 1e3
},
20508: {
type: 2,
icon: "ring5",
fixproperty: "121:10:0",
name: "金戒指",
id: 20508,
cost: 500,
subtype: 6,
logiclv: 3
},
20108: {
type: 2,
icon: "hat8",
fixproperty: "8:55:36",
name: "队长头盔",
id: 20108,
cost: 2e3,
subtype: 2,
logiclv: 4
},
20426: {
type: 2,
icon: "kuzi26",
fixproperty: "8:40:20|16:5:1",
name: "泰坦腿甲",
qulity: 5,
id: 20426,
cost: 3e3,
subtype: 5,
logiclv: 6
},
20514: {
type: 2,
icon: "ring14",
fixproperty: "20:30:0",
name: "紫雷戒指",
qulity: 5,
id: 20514,
talent: "1044",
cost: 3e3,
subtype: 6,
logiclv: 5
},
35002: {
type: 3,
icon: "item36",
des: "能开出啥呢？",
name: "配方盲盒",
id: 35002,
qulity: 5,
subtype: 6,
sp1: "34009|34010|34011|34012|34013|34014|34015|34016|34017|34018|34019|34020|34021|34022|34023|34024|34025|34026|34032|34033|34034|34035|34036|34037|34038|34039|34040|34041|34042|34043|34044|34045|34046|34047|34048|34049|34055|34056|34057|34058|34059|34060|34061|34062|34063|34064|34065|34066|34067|34068|34069|34070|34071|34072",
cost: 1e3
},
10115: {
des: "普通攻击时有概率额外产生支爆炸箭",
type: 1,
icon: "bow15",
fixproperty: "9:100:10|109:30:0",
name: "灼热之弓",
id: 10115,
fixskill: "44",
cost: 4e3,
subtype: 2,
logiclv: 6
},
10017: {
type: 1,
icon: "sword17",
fixproperty: "9:100:10",
name: "红莲之刃",
id: 10017,
fixskill: "7",
cost: 4e3,
subtype: 1,
logiclv: 6
},
20421: {
type: 2,
icon: "kuzi21",
fixproperty: "8:40:20|16:5:1",
name: "阴影短裤",
qulity: 5,
id: 20421,
cost: 3e3,
subtype: 5,
logiclv: 6
},
20218: {
type: 2,
icon: "hand18",
fixproperty: "8:26:14|15:5:0.75",
name: "追猎者手套",
qulity: 3,
id: 20218,
cost: 1200,
subtype: 3,
logiclv: 3
},
10204: {
type: 1,
icon: "staff4",
fixproperty: "10:35:6.5",
name: "琥珀之杖",
id: 10204,
fixskill: "6",
cost: 1e3,
subtype: 3,
logiclv: 2
},
10106: {
type: 1,
icon: "bow6",
fixproperty: "9:45:7.5",
name: "黄金弓",
id: 10106,
fixskill: "8",
cost: 2e3,
subtype: 2,
logiclv: 3
},
20524: {
type: 2,
icon: "ring3",
fixproperty: "101:20:0",
name: "超体质戒指",
id: 20524,
cost: 3e3,
subtype: 6,
logiclv: 5
},
10105: {
type: 1,
icon: "bow5",
fixproperty: "9:40:7",
name: "白银弓",
id: 10105,
fixskill: "8",
cost: 1500,
subtype: 2,
logiclv: 3
},
20206: {
type: 2,
icon: "hand6",
fixproperty: "8:25:15|15:5:0.75",
name: "黄金手甲",
id: 20206,
cost: 1400,
subtype: 3,
logiclv: 3
},
20120: {
type: 2,
icon: "hat20",
fixproperty: "8:70:50",
name: "兽王头盔",
qulity: 5,
id: 20120,
cost: 3e3,
subtype: 2,
logiclv: 6
},
31024: {
type: 3,
icon: "item35",
des: "能领悟奥义战神技.影分身",
name: "战神技.影分身",
id: 31024,
qulity: 5,
subtype: 2,
sp1: 1022,
cost: 1e3
},
20022: {
type: 2,
icon: "body22",
fixproperty: "13:14:2|14:14:2",
name: "勇气盔甲",
qulity: 1,
id: 20022,
cost: 1500,
subtype: 1,
logiclv: 2
},
31008: {
type: 3,
icon: "item34",
des: "能领悟奥义御剑术",
name: "御剑术",
id: 31008,
qulity: 4,
subtype: 2,
sp1: 1002,
cost: 1e3
},
10108: {
type: 1,
icon: "bow8",
fixproperty: "9:55:8.5",
name: "破邪之弓",
id: 10108,
fixskill: "8",
cost: 3e3,
subtype: 2,
logiclv: 4
},
20011: {
type: 2,
icon: "body11",
fixproperty: "13:10:5.5|14:10:5.5",
name: "阳炎之袍",
qulity: 5,
id: 20011,
cost: 5e3,
subtype: 1,
logiclv: 5
},
31003: {
type: 3,
icon: "item35",
des: "能领悟奥义洪水滔滔",
name: "洪水滔滔",
id: 31003,
qulity: 5,
subtype: 2,
sp1: 1012,
cost: 1e3
},
10118: {
type: 1,
icon: "bow18",
fixproperty: "9:100:10|116:80:0",
name: "黄金神弓",
id: 10118,
fixskill: "8",
cost: 4e3,
subtype: 2,
logiclv: 6
},
20201: {
type: 2,
icon: "hand1",
fixproperty: "8:20:10|15:5:0.5",
name: "新人手套",
id: 20201,
cost: 500,
subtype: 3,
logiclv: 1
},
20419: {
type: 2,
icon: "kuzi19",
fixproperty: "8:40:20|16:5:1",
name: "精灵护腿",
qulity: 5,
id: 20419,
cost: 3e3,
subtype: 5,
logiclv: 6
},
34010: {
type: 3,
icon: "item26",
des: "能够制作霜纹披肩的设计图",
name: "霜纹披肩图纸",
id: 34010,
qulity: 5,
subtype: 5,
sp1: 110,
cost: 1e3
},
33014: {
type: 3,
icon: "item25",
des: "能解锁附弓之技",
name: "弓之技配方",
id: 33014,
qulity: 5,
subtype: 4,
sp1: 305,
cost: 1e3
},
32003: {
type: 3,
icon: "item23",
des: "解锁宠物技能毒击",
name: "宠物毒击",
id: 32003,
qulity: 3,
subtype: 3,
sp1: 212,
cost: 1e3
},
20118: {
type: 2,
icon: "hat18",
fixproperty: "8:45:30",
name: "追猎者羽帽",
qulity: 3,
id: 20118,
cost: 1800,
subtype: 2,
logiclv: 3
},
34008: {
type: 3,
icon: "item23",
des: "能够制作暗疫护腿的设计图",
name: "暗疫护腿图纸",
id: 34008,
qulity: 3,
subtype: 5,
sp1: 108,
cost: 600
},
10010: {
type: 1,
icon: "sword10",
fixproperty: "9:65:9.5",
name: "勇者之剑",
id: 10010,
fixskill: "7",
cost: 4e3,
subtype: 1,
logiclv: 5
},
33010: {
type: 3,
icon: "item25",
des: "能解锁附魔火焰能量",
name: "火焰能量配方",
id: 33010,
qulity: 5,
subtype: 4,
sp1: 301,
cost: 1e3
},
20211: {
type: 2,
icon: "hand11",
fixproperty: "8:20:19|15:5:0.95",
name: "阳炎护手",
qulity: 5,
id: 20211,
cost: 3e3,
subtype: 3,
logiclv: 5
},
31014: {
type: 3,
icon: "item33",
des: "能领悟奥义暗黑十字斩",
name: "暗黑十字斩",
id: 31014,
qulity: 3,
subtype: 2,
sp1: 1008,
cost: 1e3
},
20119: {
type: 2,
icon: "hat19",
fixproperty: "8:70:50",
name: "精灵兜帽",
qulity: 5,
id: 20119,
cost: 3e3,
subtype: 2,
logiclv: 6
},
20510: {
type: 2,
icon: "ring3",
fixproperty: "17:10:0",
name: "花戒指",
id: 20510,
cost: 500,
subtype: 6,
logiclv: 3
},
20503: {
type: 2,
icon: "ring3",
fixproperty: "102:10:0",
name: "力量戒指",
id: 20503,
cost: 500,
subtype: 6,
logiclv: 3
},
20026: {
type: 2,
icon: "body26",
fixproperty: "13:40:6|14:40:6",
name: "泰坦胸甲",
qulity: 5,
id: 20026,
cost: 5e3,
subtype: 1,
logiclv: 6
},
20323: {
type: 2,
icon: "shose23",
fixproperty: "8:30:12|7:10:0",
name: "秘银战靴",
qulity: 3,
id: 20323,
cost: 1200,
subtype: 4,
logiclv: 3
},
10107: {
type: 1,
icon: "bow7",
fixproperty: "9:50:8",
name: "心之弓",
id: 10107,
fixskill: "8",
cost: 2500,
subtype: 2,
logiclv: 4
},
10225: {
type: 1,
icon: "staff25",
fixproperty: "10:500:50|110:200:0",
name: "神杖",
id: 10225,
fixskill: "6",
cost: 5e3,
subtype: 3,
logiclv: 7
},
31023: {
type: 3,
icon: "item35",
des: "能领悟奥义神技.魔力暴走",
name: "神技.魔力暴走",
id: 31023,
qulity: 5,
subtype: 2,
sp1: 1021,
cost: 1e3
},
34003: {
type: 3,
icon: "item26",
des: "能够制作阳炎之袍的设计图",
name: "阳炎戒指图纸",
id: 34003,
qulity: 5,
subtype: 5,
sp1: 103,
cost: 1e3
},
20217: {
type: 2,
icon: "hand17",
fixproperty: "8:23:10|15:5:0.65",
name: "伪装者手套",
qulity: 1,
id: 20217,
cost: 600,
subtype: 3,
logiclv: 2
},
20507: {
type: 2,
icon: "ring4",
fixproperty: "3:10:0",
name: "骷髅戒指",
id: 20507,
talent: "1042",
cost: 500,
subtype: 6,
logiclv: 3
},
34042: {
type: 3,
icon: "item26",
des: "能够制作兽王护腿的设计图",
name: "兽王护腿图纸",
id: 34042,
qulity: 5,
subtype: 5,
sp1: 142,
cost: 1e3
},
20328: {
type: 2,
icon: "shose28",
fixproperty: "8:80:30|7:20:0",
name: "弓神鞋",
id: 20328,
cost: 5e3,
subtype: 4,
logiclv: 7
},
20117: {
type: 2,
icon: "hat17",
fixproperty: "8:35:24",
name: "伪装者兜帽",
qulity: 1,
id: 20117,
cost: 800,
subtype: 2,
logiclv: 2
},
20609: {
type: 2,
icon: "shuijing3",
element: "10:0:10",
name: "超雷水水晶",
id: 20609,
cost: 1e3,
subtype: 7,
logiclv: 5
},
34049: {
type: 3,
icon: "item26",
des: "能够制作阴影指环的设计图",
name: "阴影指环图纸",
id: 34049,
qulity: 5,
subtype: 5,
sp1: 149,
cost: 1e3
},
20318: {
type: 2,
icon: "shose18",
fixproperty: "8:30:12|7:10:0",
name: "追猎者长靴",
qulity: 3,
id: 20318,
cost: 1200,
subtype: 4,
logiclv: 3
},
20416: {
type: 2,
icon: "kuzi16",
fixproperty: "8:40:20|16:5:1",
name: "紫雷护腿",
qulity: 5,
id: 20416,
cost: 3e3,
subtype: 5,
logiclv: 6
},
34005: {
type: 3,
icon: "item23",
des: "能够制作暗疫斗篷的设计图",
name: "暗疫斗篷图纸",
id: 34005,
qulity: 3,
subtype: 5,
sp1: 105,
cost: 600
},
20202: {
type: 2,
icon: "hand2",
fixproperty: "8:21:11|15:5:0.55",
name: "皮质手套",
id: 20202,
cost: 600,
subtype: 3,
logiclv: 1
},
20014: {
type: 2,
icon: "body14",
fixproperty: "13:40:6|14:40:6",
name: "霜纹披肩",
qulity: 5,
id: 20014,
cost: 5e3,
subtype: 1,
logiclv: 6
},
20104: {
type: 2,
icon: "hat4",
fixproperty: "8:35:24",
name: "夜色帽子",
id: 20104,
cost: 1200,
subtype: 2,
logiclv: 2
},
10018: {
type: 1,
icon: "sword18",
fixproperty: "9:100:10",
name: "创世之剑",
id: 10018,
fixskill: "7",
cost: 4e3,
subtype: 1,
logiclv: 6
},
31007: {
type: 3,
icon: "item34",
des: "能领悟奥义无产阶级之腿",
name: "无产阶级腿",
id: 31007,
qulity: 4,
subtype: 2,
sp1: 1003,
cost: 1e3
},
34025: {
type: 3,
icon: "item26",
des: "能够制作紫雷护腿的设计图",
name: "紫雷护腿图纸",
id: 34025,
qulity: 5,
subtype: 5,
sp1: 125,
cost: 1e3
},
30004: {
type: 3,
icon: "item37",
des: "能重置武器技能",
name: "武器技能水",
id: 30004,
qulity: 5,
subtype: 1,
cost: 1e3
},
34062: {
type: 3,
icon: "item26",
des: "能够制作奥丁战铠的设计图",
name: "奥丁战铠图纸",
id: 34062,
qulity: 5,
subtype: 5,
sp1: 162,
cost: 1e3
},
20327: {
type: 2,
icon: "shose27",
fixproperty: "8:80:30|7:20:0",
name: "法神鞋",
id: 20327,
cost: 5e3,
subtype: 4,
logiclv: 7
},
20516: {
type: 2,
icon: "ring16",
fixproperty: "117:30:0",
name: "兽王骨链",
qulity: 5,
id: 20516,
talent: "1043",
cost: 3e3,
subtype: 6,
logiclv: 5
},
34067: {
type: 3,
icon: "item26",
des: "能够制作泰坦战盔的设计图",
name: "泰坦战盔图纸",
id: 34067,
qulity: 5,
subtype: 5,
sp1: 167,
cost: 1e3
},
20526: {
type: 2,
icon: "ring3",
fixproperty: "104:20:0",
name: "超敏捷戒指",
id: 20526,
cost: 3e3,
subtype: 6,
logiclv: 5
},
38032: {
type: 3,
icon: "kuang4",
des: "矿石",
name: "铁锭",
id: 38032,
qulity: 2,
subtype: 8,
cost: 200
},
31012: {
type: 3,
icon: "item33",
des: "能领悟奥义龙炎",
name: "龙炎",
id: 31012,
qulity: 3,
subtype: 2,
sp1: 1006,
cost: 1e3
},
10019: {
type: 1,
icon: "sword19",
fixproperty: "9:100:10",
name: "十六夜月",
id: 10019,
fixskill: "7",
cost: 4e3,
subtype: 1,
logiclv: 6
},
10101: {
type: 1,
icon: "bow1",
fixproperty: "9:20:5",
name: "新人弓",
id: 10101,
fixskill: "8|13|11|12",
cost: 500,
subtype: 2,
logiclv: 1
},
20215: {
type: 2,
icon: "hand15",
fixproperty: "8:30:20|15:5:1",
name: "黯焰手套",
qulity: 5,
id: 20215,
cost: 3e3,
subtype: 3,
logiclv: 6
},
10008: {
type: 1,
icon: "sword8",
fixproperty: "9:55:8.5",
name: "迅捷利刃",
id: 10008,
fixskill: "7",
cost: 3e3,
subtype: 1,
logiclv: 4
},
10003: {
type: 1,
icon: "sword3",
fixproperty: "9:30:6",
name: "长剑",
id: 10003,
fixskill: "7",
cost: 900,
subtype: 1,
logiclv: 2
},
10011: {
des: "普通攻击时有概率产生一道圣光攻击",
type: 1,
icon: "sword11",
fixproperty: "9:100:10|109:50:0",
name: "ex咖喱棒",
id: 10011,
fixskill: "39",
cost: 4e3,
subtype: 1,
logiclv: 6
},
34069: {
type: 3,
icon: "item26",
des: "能够制作泰坦手甲的设计图",
name: "泰坦手甲图纸",
id: 34069,
qulity: 5,
subtype: 5,
sp1: 169,
cost: 1e3
},
33008: {
type: 3,
icon: "item25",
des: "能解锁附魔百发百中",
name: "百发百中配方",
id: 33008,
qulity: 5,
subtype: 4,
sp1: 201,
cost: 1e3
},
20313: {
type: 2,
icon: "shose13",
fixproperty: "8:30:12|7:10:0",
name: "暗疫软鞋",
qulity: 3,
id: 20313,
cost: 1200,
subtype: 4,
logiclv: 3
},
38011: {
type: 3,
icon: "bu1",
des: "布料",
name: "魔纹布",
id: 38011,
qulity: 1,
subtype: 8,
cost: 120
},
38053: {
type: 3,
icon: "baoshi3",
des: "宝石",
name: "黄宝石",
id: 38053,
qulity: 3,
subtype: 8,
cost: 400
},
20602: {
type: 2,
icon: "shuijing4",
element: "0:10:0",
name: "纯火水晶",
id: 20602,
cost: 5e3,
subtype: 7,
logiclv: 1
},
20310: {
type: 2,
icon: "shose10",
fixproperty: "8:40:19|7:10:0",
name: "蓝宝石鞋",
id: 20310,
cost: 3e3,
subtype: 4,
logiclv: 5
},
34019: {
type: 3,
icon: "item26",
des: "能够制作黯焰护腿的设计图",
name: "黯焰护腿图纸",
id: 34019,
qulity: 5,
subtype: 5,
sp1: 119,
cost: 1e3
},
20401: {
type: 2,
icon: "kuzi1",
fixproperty: "8:20:10|16:5:0.5",
name: "新人裤子",
id: 20401,
cost: 500,
subtype: 5,
logiclv: 1
},
20405: {
type: 2,
icon: "kuzi5",
fixproperty: "8:28:14|16:5:0.7",
name: "白银护腿",
id: 20405,
cost: 1200,
subtype: 5,
logiclv: 3
},
10013: {
type: 1,
icon: "sword13",
fixproperty: "9:100:10|118:50:0",
name: "无毁的湖光",
id: 10013,
fixskill: "7",
cost: 4e3,
subtype: 1,
logiclv: 6
},
30005: {
type: 3,
icon: "item38",
des: "能将传说装备进化至远古装备，远古装备属性1.5倍",
name: "远古进化石",
id: 30005,
qulity: 5,
subtype: 1,
cost: 1e3
},
31019: {
type: 3,
icon: "item35",
des: "能领悟奥义命中光环",
name: "命中光环",
id: 31019,
qulity: 5,
subtype: 2,
sp1: 1017,
cost: 1e3
},
20429: {
type: 2,
icon: "kuzi29",
fixproperty: "8:60:30|16:8:1.5",
name: "战神腿甲",
id: 20429,
cost: 5e3,
subtype: 5,
logiclv: 7
},
20012: {
type: 2,
icon: "body12",
fixproperty: "13:14:2|14:14:2",
name: "学徒披风",
qulity: 1,
id: 20012,
cost: 1500,
subtype: 1,
logiclv: 2
},
31010: {
type: 3,
icon: "item33",
des: "能领悟奥义鬼神突刺",
name: "鬼神突刺",
id: 31010,
qulity: 3,
subtype: 2,
sp1: 1004,
cost: 1e3
},
10208: {
type: 1,
icon: "staff8",
fixproperty: "10:55:8.5",
name: "麒麟之杖",
id: 10208,
fixskill: "6",
cost: 3e3,
subtype: 3,
logiclv: 4
},
38028: {
type: 3,
icon: "ys8",
des: "高级材料",
name: "源生之能",
id: 38028,
qulity: 5,
subtype: 8,
cost: 5e3
},
30006: {
type: 3,
icon: "item39",
des: "能将远古装备进化至太古装备，太古装备属性2倍，并且洗练词条可以重复",
name: "太古进化石",
id: 30006,
qulity: 5,
subtype: 1,
cost: 1e3
},
34022: {
type: 3,
icon: "item26",
des: "能够制作紫雷斗篷的设计图",
name: "紫雷斗篷图纸",
id: 34022,
qulity: 5,
subtype: 5,
sp1: 122,
cost: 1e3
},
10016: {
type: 1,
icon: "sword16",
fixproperty: "9:100:10",
name: "石中剑",
id: 10016,
fixskill: "7",
cost: 4e3,
subtype: 1,
logiclv: 6
},
33001: {
type: 3,
icon: "item25",
des: "能解锁附魔猫鼬",
name: "猫鼬配方",
id: 33001,
qulity: 5,
subtype: 4,
sp1: 1,
cost: 1e3
},
34040: {
type: 3,
icon: "item26",
des: "能够制作兽王手套的设计图",
name: "兽王手套图纸",
id: 34040,
qulity: 5,
subtype: 5,
sp1: 140,
cost: 1e3
},
20517: {
type: 2,
icon: "ring17",
fixproperty: "117:30:0",
name: "阴影指环",
qulity: 5,
id: 20517,
talent: "1043",
cost: 3e3,
subtype: 6,
logiclv: 5
},
33013: {
type: 3,
icon: "item25",
des: "能解锁附魔剑之力",
name: "剑之力配方",
id: 33013,
qulity: 5,
subtype: 4,
sp1: 304,
cost: 1e3
},
10024: {
type: 1,
icon: "sword24",
fixproperty: "9:100:10",
name: "凝光剑",
id: 10024,
fixskill: "7",
cost: 4e3,
subtype: 1,
logiclv: 6
},
32009: {
type: 3,
icon: "item23",
des: "解锁宠物技能雷箭术",
name: "宠物雷箭术",
id: 32009,
qulity: 3,
subtype: 3,
sp1: 218,
cost: 1e3
},
34017: {
type: 3,
icon: "item26",
des: "能够制作黯焰手套的设计图",
name: "黯焰手套图纸",
id: 34017,
qulity: 5,
subtype: 5,
sp1: 117,
cost: 1e3
},
33007: {
type: 3,
icon: "item25",
des: "能解锁附魔铜墙铁壁",
name: "铜墙铁壁配方",
id: 33007,
qulity: 5,
subtype: 4,
sp1: 102,
cost: 1e3
},
10005: {
type: 1,
icon: "sword5",
fixproperty: "9:40:7",
name: "白银剑",
id: 10005,
fixskill: "7",
cost: 1500,
subtype: 1,
logiclv: 3
},
34070: {
type: 3,
icon: "item26",
des: "能够制作泰坦战靴的设计图",
name: "泰坦战靴图纸",
id: 34070,
qulity: 5,
subtype: 5,
sp1: 170,
cost: 1e3
},
32014: {
type: 3,
icon: "item23",
des: "解锁宠物技能超狂击",
name: "宠物超狂击",
id: 32014,
qulity: 5,
subtype: 3,
sp1: 219,
cost: 1e3
},
32010: {
type: 3,
icon: "item23",
des: "解锁宠物技能连锁闪电",
name: "宠物连锁闪电",
id: 32010,
qulity: 5,
subtype: 3,
sp1: 35,
cost: 1e3
},
34021: {
type: 3,
icon: "item26",
des: "能够制作紫雷帽的设计图",
name: "紫雷帽图纸",
id: 34021,
qulity: 5,
subtype: 5,
sp1: 121,
cost: 1e3
},
34068: {
type: 3,
icon: "item26",
des: "能够制作泰坦胸甲的设计图",
name: "泰坦胸甲图纸",
id: 34068,
qulity: 5,
subtype: 5,
sp1: 168,
cost: 1e3
},
20518: {
type: 2,
icon: "ring18",
fixproperty: "119:30:0",
name: "战国指环",
qulity: 5,
id: 20518,
talent: "1043",
cost: 3e3,
subtype: 6,
logiclv: 5
},
20127: {
type: 2,
icon: "hat27",
fixproperty: "8:150:100",
name: "法神帽",
id: 20127,
cost: 5e3,
subtype: 2,
logiclv: 7
},
34024: {
type: 3,
icon: "item26",
des: "能够制作紫雷长靴的设计图",
name: "紫雷长靴图纸",
id: 34024,
qulity: 5,
subtype: 5,
sp1: 124,
cost: 1e3
},
30002: {
type: 3,
icon: "item15",
des: "能重铸装备",
name: "重铸石",
id: 30002,
qulity: 5,
subtype: 1,
cost: 1e3
},
34044: {
type: 3,
icon: "item26",
des: "能够制作阴影兜帽的设计图",
name: "阴影兜帽图纸",
id: 34044,
qulity: 5,
subtype: 5,
sp1: 144,
cost: 1e3
},
34001: {
type: 3,
icon: "item26",
des: "能够制作阳炎之袍的设计图",
name: "阳炎之袍图纸",
id: 34001,
qulity: 5,
subtype: 5,
sp1: 101,
cost: 1e3
},
38048: {
type: 3,
icon: "mu8",
des: "木材",
name: "梣",
id: 38048,
qulity: 4,
subtype: 8,
cost: 800
},
20601: {
type: 2,
icon: "shuijing5",
element: "10:0:0",
name: "纯水水晶",
id: 20601,
cost: 5e3,
subtype: 7,
logiclv: 1
},
10112: {
type: 1,
icon: "bow12",
fixproperty: "9:100:10",
name: "诅咒之弓",
id: 10112,
fixskill: "8",
cost: 4e3,
subtype: 2,
logiclv: 6
},
31005: {
type: 3,
icon: "item34",
des: "能领悟奥义如来神掌",
name: "如来神掌",
id: 31005,
qulity: 4,
subtype: 2,
sp1: 1011,
cost: 1e3
},
20028: {
type: 2,
icon: "body28",
fixproperty: "13:50:10|14:50:10",
name: "弓神斗篷",
id: 20028,
cost: 5e3,
subtype: 1,
logiclv: 7
},
10222: {
type: 1,
icon: "staff22",
fixproperty: "10:100:10",
name: "火元素之杖",
id: 10222,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 6
},
31017: {
type: 3,
icon: "item35",
des: "能领悟奥义暴击光环",
name: "暴击光环",
id: 31017,
qulity: 5,
subtype: 2,
sp1: 1015,
cost: 1e3
},
34047: {
type: 3,
icon: "item26",
des: "能够制作阴影长靴的设计图",
name: "阴影长靴图纸",
id: 34047,
qulity: 5,
subtype: 5,
sp1: 147,
cost: 1e3
},
34046: {
type: 3,
icon: "item26",
des: "能够制作阴影手套的设计图",
name: "阴影手套图纸",
id: 34046,
qulity: 5,
subtype: 5,
sp1: 146,
cost: 1e3
},
38055: {
type: 3,
icon: "baoshi5",
des: "宝石",
name: "红宝石",
id: 38055,
qulity: 3,
subtype: 8,
cost: 400
},
34058: {
type: 3,
icon: "item26",
des: "能够制作战国长靴的设计图",
name: "战国长靴图纸",
id: 34058,
qulity: 5,
subtype: 5,
sp1: 158,
cost: 1e3
},
38043: {
type: 3,
icon: "mu3",
des: "木材",
name: "琵琶木",
id: 38043,
qulity: 3,
subtype: 8,
cost: 400
},
31011: {
type: 3,
icon: "item33",
des: "能领悟奥义幻龙爪",
name: "幻龙爪",
id: 31011,
qulity: 3,
subtype: 2,
sp1: 1005,
cost: 1e3
},
20608: {
type: 2,
icon: "shuijing2",
element: "0:10:10",
name: "超火雷水晶",
id: 20608,
cost: 1e3,
subtype: 7,
logiclv: 5
},
20308: {
type: 2,
icon: "shose8",
fixproperty: "8:34:17|7:10:0",
name: "队长鞋",
id: 20308,
cost: 1800,
subtype: 4,
logiclv: 4
},
33005: {
type: 3,
icon: "item25",
des: "能解锁附魔泰坦之力",
name: "泰坦之力配方",
id: 33005,
qulity: 5,
subtype: 4,
sp1: 5,
cost: 1e3
},
20020: {
type: 2,
icon: "body20",
fixproperty: "13:40:6|14:40:6",
name: "兽王披肩",
qulity: 5,
id: 20020,
cost: 5e3,
subtype: 1,
logiclv: 6
},
10217: {
type: 1,
icon: "staff26",
fixproperty: "10:100:10|110:120:0",
name: "神圣天使杖",
id: 10217,
fixskill: "6",
cost: 4e3,
subtype: 3,
logiclv: 6
},
31009: {
type: 3,
icon: "item33",
des: "能领悟奥义拜年剑法",
name: "拜年剑法",
id: 31009,
qulity: 3,
subtype: 2,
sp1: 1001,
cost: 1e3
},
20019: {
type: 2,
icon: "body19",
fixproperty: "13:40:6|14:40:6",
name: "精灵披肩",
qulity: 5,
id: 20019,
cost: 5e3,
subtype: 1,
logiclv: 6
},
34020: {
type: 3,
icon: "item26",
des: "能够制作黯焰戒指的设计图",
name: "黯焰戒指图纸",
id: 34020,
qulity: 5,
subtype: 5,
sp1: 120,
cost: 1e3
},
33016: {
type: 3,
icon: "item25",
des: "能解锁附豹之迅捷",
name: "豹之迅捷配方",
id: 33016,
qulity: 5,
subtype: 4,
sp1: 402,
cost: 1e3
},
20610: {
type: 2,
icon: "shuijing7",
element: "10:10:10",
name: "创世水晶",
id: 20610,
cost: 1e3,
subtype: 7,
logiclv: 6
},
38024: {
type: 3,
icon: "ys4",
des: "高级材料",
name: "源生生命",
id: 38024,
qulity: 4,
subtype: 8,
cost: 3e3
}
},
setcfg: {
9006: {
name: "霜纹套装",
id: 9006,
eff5: "16",
eff2: "14",
eff3: "15",
cost: "20114|20014|20214|20314|20414|20512"
},
9013: {
name: "阴影兜套装",
id: 9013,
eff5: "37",
eff2: "35",
eff3: "36",
cost: "20121|20021|20221|20321|20421|20517"
},
9014: {
name: "勇气头套装",
id: 9014,
eff5: "40",
eff2: "38",
eff3: "39",
cost: "20122|20022|20222|20322|20422"
},
9003: {
id: 9003,
eff2: "6",
eff3: "7",
name: "初新者套装",
cost: "20111|20312|20412"
},
9022: {
name: "队长套装",
id: 9022,
eff5: "64",
eff2: "62",
eff3: "63",
cost: "20108|20008|20208|20308|20408"
},
9004: {
name: "学徒套装",
id: 9004,
eff5: "10",
eff2: "8",
eff3: "9",
cost: "20112|20012|20212|20312|20412"
},
9024: {
name: "法神套装",
id: 9024,
eff5: "70",
eff2: "68",
eff3: "69",
cost: "20027|20127|20227|20327|20427"
},
9025: {
name: "弓神套装",
id: 9025,
eff5: "73",
eff2: "71",
eff3: "72",
cost: "20028|20128|20228|20328|20428"
},
9019: {
name: "白银套装",
id: 9019,
eff5: "55",
eff2: "53",
eff3: "54",
cost: "20105|20005|20205|20305|20405"
},
9007: {
name: "黯焰套装",
id: 9007,
eff5: "19",
eff2: "17",
eff3: "18",
cost: "20115|20015|20215|20315|20415|20513"
},
9017: {
name: "奥丁战套装",
id: 9017,
eff5: "49",
eff2: "47",
eff3: "48",
cost: "20125|20025|20225|20325|20425|20519"
},
9009: {
name: "伪装者套装",
id: 9009,
eff5: "25",
eff2: "23",
eff3: "24",
cost: "20117|20017|20217|20317|20417"
},
9016: {
name: "战国头套装",
id: 9016,
eff5: "46",
eff2: "44",
eff3: "45",
cost: "20124|20024|20224|20324|20424|20518"
},
9015: {
name: "秘银战套装",
id: 9015,
eff5: "43",
eff2: "41",
eff3: "42",
cost: "20123|20023|20223|20323|20423"
},
9021: {
name: "钻石套装",
id: 9021,
eff5: "61",
eff2: "59",
eff3: "60",
cost: "20107|20007|20207|20307|20407"
},
9005: {
name: "暗疫套装",
id: 9005,
eff5: "13",
eff2: "11",
eff3: "12",
cost: "20113|20013|20213|20313|20413"
},
9002: {
id: 9002,
eff2: "4",
eff3: "5",
name: "阳炎套装",
cost: "20011|20211|20501"
},
9001: {
name: "蓝宝石套装",
id: 9001,
eff5: "3",
eff2: "1",
eff3: "2",
cost: "20110|20010|20210|20310|20410"
},
9010: {
name: "追猎者套装",
id: 9010,
eff5: "28",
eff2: "26",
eff3: "27",
cost: "20118|20018|20218|20318|20418"
},
9026: {
name: "战神套装",
id: 9026,
eff5: "76",
eff2: "74",
eff3: "75",
cost: "20029|20129|20229|20329|20429"
},
9011: {
name: "精灵兜套装",
id: 9011,
eff5: "31",
eff2: "29",
eff3: "30",
cost: "20119|20019|20219|20319|20419|20515"
},
9023: {
name: "十字军套装",
id: 9023,
eff5: "67",
eff2: "65",
eff3: "66",
cost: "20109|20009|20209|20309|20409"
},
9018: {
name: "泰坦战套装",
id: 9018,
eff5: "52",
eff2: "50",
eff3: "51",
cost: "20126|20026|20226|20326|20426|20520"
},
9020: {
name: "黄金套装",
id: 9020,
eff5: "58",
eff2: "56",
eff3: "57",
cost: "20106|20006|20206|20306|20406"
},
9008: {
name: "紫雷套装",
id: 9008,
eff5: "22",
eff2: "20",
eff3: "21",
cost: "20116|20016|20216|20316|20416|20514"
},
9012: {
name: "兽王头套装",
id: 9012,
eff5: "34",
eff2: "32",
eff3: "33",
cost: "20120|20020|20220|20320|20420|20516"
}
},
seteffcfg: {
14: {
color: "0:200:255",
des: "所有冰系伤害附加刺骨状态(每层减少魔防10%)最高叠加8层",
id: 14,
weaponup: "1:30",
property: "8:600",
buffs: "1001"
},
5: {
color: "255:155:0",
des: "灼烧时有概率产生一个范围爆炸",
id: 5,
weaponup: "2:30",
property: "20:30",
buffs: "1004"
},
25: {
id: 25,
property: "18:15|115:15|116:15"
},
27: {
id: 27,
property: "3:10|8:300"
},
33: {
id: 33,
weaponup: "16:30",
property: "3:20|8:2500"
},
53: {
id: 53,
property: "8:1000"
},
16: {
color: "0:200:255",
des: "刺骨状态的敌人每层所收到伤害增加100%冰封球变为原地",
id: 16,
weaponup: "1:50",
property: "3:30|5:40|20:30",
buffs: "1002"
},
40: {
id: 40,
property: "109:5|113:5"
},
24: {
id: 24,
property: "2:5|3:5"
},
6: {
id: 6,
property: "1:2|3:2"
},
22: {
color: "255:245:25",
des: "当静电场的目标收到伤害时有额外生成一道闪电链,静电场附加概率提升至100%",
id: 22,
weaponup: "4:50",
property: "3:30|5:40|20:30",
buffs: "1006"
},
13: {
id: 13,
property: "110:15|20:15|7:15"
},
41: {
id: 41,
property: "2:15"
},
3: {
id: 3,
property: "109:40|110:40"
},
29: {
id: 29,
property: "2:20|4:40"
},
20: {
color: "255:245:25",
des: "所有电系伤害50%概率给对方附加静电场buff 当叠加4层后会生成一道闪电链，闪电链伤害为buff期间累计伤害的5倍",
id: 20,
weaponup: "4:30",
property: "8:600",
buffs: "1005"
},
73: {
color: "255:155:0",
des: "宠物双攻双防提高100%,人物每次闪避增加攻击35%直到受到伤害,每次暴击增加25%爆伤，持续8秒",
id: 73,
weaponup: "16:100",
property: "109:50|116:100|121:100|117:100",
buffs: "4003|4014|4016"
},
64: {
id: 64,
property: "109:25|110:25"
},
37: {
color: "255:220:0",
des: "每次闪避增加攻击20%直到受到伤害",
id: 37,
weaponup: "16:50",
property: "109:50|117:100",
buffs: "4009"
},
21: {
id: 21,
property: "115:15|116:15|110:30"
},
59: {
id: 59,
property: "8:2000"
},
12: {
id: 12,
property: "3:10|8:300"
},
38: {
id: 38,
property: "2:5"
},
74: {
id: 74,
weaponup: "8:50",
property: "102:50"
},
48: {
id: 48,
color: "0:200:255",
des: "剑系伤害附加撕裂，最高叠10层",
property: "113:30|114:30",
buffs: "1007"
},
17: {
color: "255:155:0",
des: "所有火系伤害有概率附加灼烧状态(最多叠加10层)",
id: 17,
weaponup: "2:30",
property: "8:600",
buffs: "1003"
},
39: {
id: 39,
property: "1:5|3:5"
},
32: {
id: 32,
property: "2:40|4:20"
},
57: {
id: 57,
property: "113:15|114:15"
},
43: {
id: 43,
property: "109:15|113:15"
},
26: {
id: 26,
property: "2:10|4:10"
},
54: {
id: 54,
property: "113:10|114:10"
},
58: {
id: 58,
property: "109:15|110:15"
},
35: {
id: 35,
property: "2:20|4:30"
},
61: {
id: 61,
property: "109:20|110:20"
},
4: {
id: 4,
color: "255:155:0",
des: "所有火系伤害有概率附加灼烧状态",
property: "20:10",
buffs: "1003"
},
19: {
color: "255:155:0",
des: "灼烧状态的敌人受到伤害时有概率产生一个范围爆炸",
id: 19,
weaponup: "2:50",
property: "3:30|5:40|20:30",
buffs: "1004"
},
36: {
id: 36,
weaponup: "16:30",
property: "3:30|8:1500"
},
69: {
id: 69,
weaponup: "7:50",
property: "110:30|116:30"
},
23: {
id: 23,
property: "4:5"
},
47: {
id: 47,
property: "1:50"
},
11: {
id: 11,
property: "5:10"
},
10: {
id: 10,
property: "110:5|20:5"
},
52: {
id: 52,
color: "255:155:0",
des: "所有伤害以物防来承担,并且吸收返伤造成的伤害的10%",
property: "109:50|108:50",
buffs: "1010"
},
72: {
color: "255:155:0",
des: "宠物双攻双防提高50%",
id: 72,
weaponup: "16:50",
property: "109:30|121:30",
buffs: "4001"
},
70: {
color: "255:155:0",
des: "集合了法系套装5件套特殊效果(字太多写不下)",
id: 70,
weaponup: "7:100",
property: "105:100|110:100",
buffs: "1002|1004|1006"
},
42: {
id: 42,
property: "1:15|8:800"
},
71: {
id: 71,
weaponup: "16:50",
property: "104:50"
},
56: {
id: 56,
property: "8:1500"
},
62: {
id: 62,
property: "8:2500"
},
1: {
id: 1,
property: "8:4000"
},
66: {
id: 66,
property: "113:30|114:30"
},
67: {
id: 67,
property: "109:30|110:30"
},
65: {
id: 65,
property: "8:3000"
},
50: {
id: 50,
property: "2:50"
},
18: {
id: 18,
property: "115:15|116:15|110:30"
},
31: {
color: "85:250:20",
des: "宠物双攻双防提高100%",
id: 31,
weaponup: "16:50",
property: "109:50|115:50|116:50",
buffs: "4003"
},
30: {
color: "85:250:20",
des: "宠物双攻双防提高50%",
id: 30,
weaponup: "16:30",
property: "3:20|8:800",
buffs: "4001"
},
28: {
id: 28,
property: "18:30|115:30|116:30"
},
15: {
id: 15,
property: "115:15|116:15|110:30"
},
45: {
id: 45,
weaponup: "8:30",
property: "113:30|114:30"
},
44: {
id: 44,
property: "1:25|2:25"
},
46: {
color: "255:220:0",
des: "无视对手防御",
id: 46,
weaponup: "8:50",
property: "109:50|116:50",
buffs: "4008"
},
55: {
id: 55,
property: "109:10|110:10"
},
75: {
color: "255:155:0",
des: "剑系伤害附加撕裂，最高叠10层,受到伤害时反弹伤害，威力取决于体质(泰坦效果50倍)",
id: 75,
weaponup: "8:50",
property: "113:50",
buffs: "1007|4013"
},
49: {
color: "0:200:255",
des: "撕裂状态的敌人每层所收到伤害增加100%",
id: 49,
weaponup: "8:50",
property: "109:50|118:50",
buffs: "1008"
},
34: {
color: "255:220:0",
des: "每次暴击增加10%爆伤，持续8秒",
id: 34,
weaponup: "16:50",
property: "109:50|118:30|21:150",
buffs: "4005"
},
9: {
id: 9,
property: "3:5|8:100"
},
2: {
id: 2,
property: "113:40|114:40"
},
76: {
color: "255:155:0",
des: "无视对手防御，撕裂状态的敌人每层所收到伤害增加100%，所有伤害以物防来承担,并且吸收返伤造成的伤害的10%",
id: 76,
weaponup: "8:100",
property: "109:50|118:100|102:100",
buffs: "1008|1010|4008"
},
60: {
id: 60,
property: "113:20|114:20"
},
51: {
id: 51,
color: "255:155:0",
des: "受到伤害时反弹伤害，威力取决于体质",
property: "113:30|114:30",
buffs: "1009"
},
7: {
id: 7,
property: "2:2|4:2|5:2"
},
63: {
id: 63,
property: "113:25|114:25"
},
68: {
color: "255:155:0",
des: "集合了法系套装2件套特殊效果(字太多写不下)",
id: 68,
weaponup: "7:50",
property: "105:50",
buffs: "1001|1003|1005"
},
8: {
id: 8,
property: "5:5"
}
},
peifangcfg: {
118: {
id: 118,
item: 20315,
cost: "38014:12|38056:12|38021:2"
},
143: {
id: 143,
item: 20516,
cost: "38046:12|38052:12|38026:2"
},
133: {
id: 133,
item: 20019,
cost: "38015:12|38056:12|38024:2"
},
169: {
id: 169,
item: 20226,
cost: "38037:12|38038:12|38053:2"
},
103: {
id: 103,
item: 20211,
cost: "38013:12|38014:12|38028:2"
},
132: {
id: 132,
item: 20119,
cost: "38015:12|38056:12|38024:2"
},
135: {
id: 135,
item: 20319,
cost: "38015:12|38056:12|38024:2"
},
149: {
id: 149,
item: 20517,
cost: "38045:12|38057:12|38025:2"
},
151: {
id: 151,
item: 20023,
cost: "38035:5|38053:5"
},
130: {
id: 130,
item: 20318,
cost: "38015:5|38053:5"
},
110: {
id: 110,
item: 20014,
cost: "38016:12|38056:12|38022:2"
},
156: {
id: 156,
item: 20024,
cost: "38035:12|38038:12|38054:2"
},
126: {
id: 126,
item: 20514,
cost: "38037:12|38057:12|38028:2"
},
136: {
id: 136,
item: 20419,
cost: "38015:12|38056:12|38024:2"
},
148: {
id: 148,
item: 20421,
cost: "38014:12|38057:12|38024:2"
},
147: {
id: 147,
item: 20321,
cost: "38014:12|38057:12|38024:2"
},
112: {
id: 112,
item: 20314,
cost: "38016:12|38056:12|38022:2"
},
101: {
id: 101,
item: 20011,
cost: "38013:12|38014:12|38026:2"
},
142: {
id: 142,
item: 20420,
cost: "38017:12|38054:12|38024:2"
},
128: {
id: 128,
item: 20018,
cost: "38015:5|38053:5"
},
153: {
id: 153,
item: 20323,
cost: "38035:5|38053:5"
},
115: {
id: 115,
item: 20115,
cost: "38014:12|38056:12|38021:2"
},
171: {
id: 171,
item: 20426,
cost: "38037:12|38038:12|38053:2"
},
145: {
id: 145,
item: 20021,
cost: "38014:12|38057:12|38024:2"
},
138: {
id: 138,
item: 20120,
cost: "38017:12|38054:12|38024:2"
},
165: {
id: 165,
item: 20425,
cost: "38036:12|38038:12|38056:2"
},
111: {
id: 111,
item: 20214,
cost: "38016:12|38056:12|38022:2"
},
108: {
id: 108,
item: 20413,
cost: "38014:5|38057:6"
},
127: {
id: 127,
item: 20118,
cost: "38015:5|38053:5"
},
140: {
id: 140,
item: 20220,
cost: "38017:12|38054:12|38024:2"
},
102: {
id: 102,
item: 20211,
cost: "38013:12|38014:12|38028:2"
},
152: {
id: 152,
item: 20223,
cost: "38035:5|38053:5"
},
121: {
id: 121,
item: 20116,
cost: "38015:12|38056:12|38023:2"
},
105: {
id: 105,
item: 20013,
cost: "38014:5|38057:6"
},
109: {
id: 109,
item: 20114,
cost: "38016:12|38056:12|38022:2"
},
113: {
id: 113,
item: 20414,
cost: "38016:12|38056:12|38022:2"
},
164: {
id: 164,
item: 20325,
cost: "38036:12|38038:12|38056:2"
},
172: {
id: 172,
item: 20520,
cost: "38038:12|38058:12|38026:2"
},
119: {
id: 119,
item: 20415,
cost: "38014:12|38056:12|38021:2"
},
131: {
id: 131,
item: 20418,
cost: "38015:5|38053:5"
},
163: {
id: 163,
item: 20225,
cost: "38036:12|38038:12|38056:2"
},
137: {
id: 137,
item: 20515,
cost: "38047:12|38056:12|38028:2"
},
168: {
id: 168,
item: 20026,
cost: "38037:12|38038:12|38053:2"
},
104: {
id: 104,
item: 20113,
cost: "38014:5|38057:6"
},
170: {
id: 170,
item: 20326,
cost: "38037:12|38038:12|38053:2"
},
106: {
id: 106,
item: 20213,
cost: "38014:5|38057:6"
},
158: {
id: 158,
item: 20324,
cost: "38035:12|38038:12|38054:2"
},
116: {
id: 116,
item: 20015,
cost: "38014:12|38056:12|38021:2"
},
157: {
id: 157,
item: 20224,
cost: "38035:12|38038:12|38054:2"
},
123: {
id: 123,
item: 20216,
cost: "38015:12|38056:12|38023:2"
},
155: {
id: 155,
item: 20124,
cost: "38035:12|38038:12|38054:2"
},
129: {
id: 129,
item: 20218,
cost: "38015:5|38053:5"
},
141: {
id: 141,
item: 20320,
cost: "38017:12|38054:12|38024:2"
},
144: {
id: 144,
item: 20121,
cost: "38014:12|38057:12|38024:2"
},
166: {
id: 166,
item: 20519,
cost: "38038:12|38058:12|38028:2"
},
122: {
id: 122,
item: 20016,
cost: "38015:12|38056:12|38023:2"
},
139: {
id: 139,
item: 20020,
cost: "38017:12|38054:12|38024:2"
},
146: {
id: 146,
item: 20221,
cost: "38014:12|38057:12|38024:2"
},
159: {
id: 159,
item: 20424,
cost: "38035:12|38038:12|38054:2"
},
124: {
id: 124,
item: 20316,
cost: "38015:12|38056:12|38023:2"
},
167: {
id: 167,
item: 20126,
cost: "38037:12|38038:12|38053:2"
},
117: {
id: 117,
item: 20215,
cost: "38014:12|38056:12|38021:2"
},
154: {
id: 154,
item: 20423,
cost: "38035:5|38053:5"
},
120: {
id: 120,
item: 20513,
cost: "38037:12|38055:12|38025:2"
},
161: {
id: 161,
item: 20125,
cost: "38036:12|38038:12|38056:2"
},
125: {
id: 125,
item: 20416,
cost: "38015:12|38056:12|38023:2"
},
150: {
id: 150,
item: 20123,
cost: "38035:5|38053:5"
},
162: {
id: 162,
item: 20025,
cost: "38036:12|38038:12|38056:2"
},
160: {
id: 160,
item: 20518,
cost: "38035:12|38058:12|38026:2"
},
114: {
id: 114,
item: 20512,
cost: "38037:12|38054:12|38027:2"
},
107: {
id: 107,
item: 20313,
cost: "38014:5|38057:6"
},
134: {
id: 134,
item: 20219,
cost: "38015:12|38056:12|38024:2"
}
}
};
cc._RF.pop();
}, {} ],
gameManager: [ function(t, e) {
"use strict";
cc._RF.push(e, "921canwaR9EhI/x2kvqh1rl", "gameManager");
var i = t("Utils"), s = t("gamelogic"), n = t("enumcfg").enumobjtype;
cc.Class({
extends: cc.Component,
properties: {
map: {
default: null,
type: cc.Node
},
pb_gameui: {
default: null,
type: cc.Prefab
},
nd_ground2: {
default: null,
type: cc.Node
},
sp_sky: {
default: null,
type: cc.Sprite
}
},
refreshboss: function(t) {
if (1 == t) ; else if (2 == t && !this.hasrefreshboss) {
this.uic.refreshboss();
this.hasrefreshboss = !0;
}
},
createeff: function(t) {
for (var e = t.length - 1; e >= 0; e--) {
var i = this.resmgr.createeff(t[e].eff, t[e].time);
i.x = t[e].x;
i.y = t[e].y + i.ctrl.anioffy;
t[e].fx && (i.scaleX *= t[e].fx);
t[e].ani && i.ctrl.hook(t[e].ani);
t[e].ground ? this.nd_down.addChild(i) : this.ndeff.addChild(i);
}
},
createscreen: function(t) {
if (t) {
var e = this.resmgr.createeff(t);
e.x = 0;
e.y = e.ctrl.anioffy;
e.scaleY = e.ctrl.cfg.scaleY;
this.map.parent.addChild(e);
}
},
createplayer: function(t) {
var e = this.resmgr.createnpc();
e.getComponent("playerctrl").initdata(t);
this.ndplayer.addChild(e);
return e;
},
createloot: function(t, e, i) {
var s = this.resmgr.createloot(t, e, i);
s.zIndex = this.zindexplus - i + s.zplus;
this.ndplayer.addChild(s);
return s;
},
createonetile: function(t) {
var e = this.resmgr.createautotile(t);
e.x = t.x;
e.y = t.y;
e.scale = 1.1;
e.zIndex = -e.y;
this.nd_ground.addChild(e);
return e;
},
onDestroy: function() {
this.uic = null;
cc.gamemgr = null;
},
start: function() {
cc.quqlitymode = !0;
cc.gameMgr = this;
this.gamelogic = new s();
this.gamelogic.init();
var t = this.gamelogic.dixing.background, e = this;
cc.resources.load("bg/" + t, cc.SpriteFrame, function(t, i) {
t || (e.sp_sky.spriteFrame = i);
});
var i = cc.instantiate(this.pb_gameui);
this.node.parent.addChild(i);
this.uic = i.getComponent("gameUI");
this.uic.init(this);
this.framecount = 0;
this.map.scale = 1.5;
this.viewwidth = (cc.winSize.width / 2 + 100) / this.map.scale;
this.viewhight = 456 / this.map.scale;
this.nd_ground = new cc.Node();
this.map.addChild(this.nd_ground);
this.nd_down = new cc.Node();
this.map.addChild(this.nd_down);
this.ndplayer = new cc.Node();
this.map.addChild(this.ndplayer);
this.ndbullet = new cc.Node();
this.map.addChild(this.ndbullet);
this.ndeff = new cc.Node();
this.map.addChild(this.ndeff);
this.ndui = new cc.Node();
this.map.addChild(this.ndui);
this.resmgr = cc.gameresmgr;
this.resmgr.initdata();
this.playerarr = [];
this.tilearr = [];
this.lootarr = [];
this.droparr = [];
this.tilemap = new Map();
this.lootmap = new Map();
this.zindexplus = 0;
},
joyMove: function(t) {
this.movehold = !0;
this.movedir = t.normalize();
},
joyMoveEnd: function() {
this.movehold = !1;
},
joyMoveBegin: function() {
this.movehold = !0;
},
onclickchangeweapon: function() {
this.ckickweapon = !0;
},
onclickskill: function(t) {
this.clickskillidx = Number(t);
},
onclickuserskill: function(t) {
this.clickskillidx2 = Number(t);
},
report: function() {
var t = {};
if (null != this.movehold) {
t.movehold = this.movehold;
this.movehold = void 0;
}
if (this.movedir) {
t.movedir = this.movedir;
this.movedir = void 0;
}
if (this.ckickweapon) {
t.ckickweapon = this.ckickweapon;
this.ckickweapon = void 0;
}
if (null != this.clickskillidx) {
t.clickskillidx = this.clickskillidx;
this.clickskillidx = void 0;
}
if (null != this.clickskillidx2) {
t.clickskillidx2 = this.clickskillidx2;
this.clickskillidx2 = void 0;
}
if (null != this.dropid) {
t.dropid = this.dropid;
this.dropid = void 0;
}
if (null != this.catch) {
t.catch = this.catch;
this.catch = void 0;
}
if (null != this.fuhuo) {
t.fuhuo = this.fuhuo;
this.fuhuo = void 0;
}
this.gamelogic.ongui(t);
},
lerpv: function(t, e, i) {
return t + (e - t) * i;
},
updategroundtile: function() {
for (var t = this.player.x, e = this.player.y, i = 0, s = 0, n = 0, a = this.tilearr.length - 1; a >= 0; a--) {
i = this.tilearr[a].x - t;
s = this.tilearr[a].y - e;
n = this.tilearr[a].uuid;
var o = this.tilemap.get(n);
if (Math.abs(i) > this.viewwidth || Math.abs(s) > this.viewhight) {
if (o) {
this.resmgr.recoverautotile(o);
this.tilemap.delete(n);
}
} else if (!o) {
var c = this.createonetile(this.tilearr[a]);
this.tilemap.set(n, c);
}
}
for (var r = this.lootarr.length - 1; r >= 0; r--) {
var l = this.lootarr[r];
i = l.x - t;
s = l.y - e;
n = l.uuid;
o = this.lootmap.get(n);
if (Math.abs(i) > this.viewwidth || Math.abs(s) > this.viewhight) {
if (o) {
this.resmgr.recoverloot(o);
this.lootmap.delete(n);
}
l.inview = !1;
} else {
if (o) this.resetzIndex && (o.zIndex = this.zindexplus - o.y + o.zplus); else {
c = this.createloot(l.lootid, l.x, l.y);
this.lootmap.set(n, c);
}
l.inview = !0;
}
}
this.resetzIndex = !1;
},
updateflag: function(t) {
t.flaghasbaby && this.uic.docheckbaby(!0);
t.flagnobaby && this.uic.docheckbaby(!1);
},
update: function(t) {
if (!cc.gamepause) {
this.framecount++;
this.report();
var e = this.gamelogic.update(t);
this.updateflag(e);
this.refreshboss(e.bossstep);
this.createscreen(e.screenres);
this.createeff(e.effarr);
this.creareobj(e.addarr);
this.deleteobj(e.delarr);
this.updateplayer(t);
this.player.pctrl.updateactive();
if (!this.spx) {
this.spx = this.player.x;
this.spy = this.player.y;
}
this.spx = this.player.x;
this.spy = this.player.y;
this.map.x = -this.player.x * this.map.scale;
this.map.y = -this.player.y * this.map.scale;
if (e.areachange) {
this.resetzIndex = !0;
this.zindexplus = e.zindexplus;
this.tilearr = e.tileold;
this.lootarr = e.lootold;
this.updategroundtile();
}
for (var i = this.droparr.length - 1; i >= 0; i--) this.droparr[i].ctrl.doupdate(t);
this.tilearr = e.tilearr;
this.lootarr = e.lootarr;
this.updategroundtile();
this.updatezindex();
this.resmgr.doupdate(t);
}
},
lateUpdate: function() {
this.gamelogic.afterupdate();
},
creareobj: function(t) {
for (var e = t.length - 1; e >= 0; e--) {
var i = t[e];
if (i.objtype == n.npcobj) {
var s = this.createplayer(i);
s.isplayer && (this.player = s);
this.playerarr.push(s);
} else if (i.objtype == n.bulletobj) this.resmgr.createbullet(i); else if (i.objtype == n.dragonobj) this.resmgr.createmoveprefab(i, this.ndeff); else if (i.objtype == n.warningobj) this.resmgr.createwarning(i); else if (i.objtype == n.dropobj) {
var a = this.resmgr.createdrop(i);
this.nd_down.addChild(a);
this.droparr.push(a);
}
}
},
deleteobj: function(t) {
for (var e = t.length - 1; e >= 0; e--) {
var i = t[e];
if (i.objtype == n.npcobj) {
for (var s = this.playerarr.length - 1; s >= 0; s--) if (this.playerarr[s].pctrl.objdata.uuid == t[e].uuid) {
this.resmgr.recovernpc(this.playerarr[s]);
this.playerarr.splice(s, 1);
break;
}
} else if (i.objtype == n.dropobj) for (s = this.droparr.length - 1; s >= 0; s--) if (this.droparr[s].ctrl.objuuid == t[e].uuid) {
this.resmgr.recoverdrop(this.droparr[s]);
this.droparr.splice(s, 1);
break;
}
}
},
updateplayer: function(t) {
for (var e = this.playerarr.length - 1; e >= 0; e--) this.playerarr[e].pctrl.doupdate(t);
},
updatezindex: function() {
if (this.framecount % 5 == 0) for (var t = this.playerarr.length - 1; t >= 0; t--) {
var e = this.playerarr[t];
e.zIndex = this.zindexplus - e.y + e.zplus;
}
},
getNearDrop: function() {
var t = this;
if (0 == this.droparr.length) return null;
this.droparr = this.droparr.sort(function(e, i) {
return Math.pow(t.player.x - e.x, 2) + Math.pow(t.player.y - e.y, 2) - (Math.pow(t.player.x - i.x, 2) + Math.pow(t.player.y - i.y, 2));
});
return i.hitTestCircle(this.droparr[0], this.player) ? this.droparr[0] : null;
}
});
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
gamelogic: "gamelogic"
} ],
gameUI: [ function(t, e) {
"use strict";
cc._RF.push(e, "30948b/9aFGhYcTGcX47KC8", "gameUI");
var i = t("skillcfg"), s = t("gameConfig").itemConfig, n = t("SDKManage"), a = t("enumcfg").qulitycolor;
cc.Class({
extends: cc.Component,
properties: {
movejoy: {
default: null,
type: cc.Node
},
skillsparr: {
default: [],
type: cc.Sprite
},
sp_weapon: {
default: null,
type: cc.Sprite
},
btn_atk: {
default: null,
type: cc.Node
},
skillprogress: {
default: [],
type: cc.ProgressBar
},
skillsparr2: {
default: [],
type: cc.Sprite
},
skillprogress2: {
default: [],
type: cc.ProgressBar
},
lb_hp: {
default: null,
type: cc.Label
},
lb_exp: {
default: null,
type: cc.Label
},
lb_lv: {
default: null,
type: cc.Label
},
pr_hp: {
default: null,
type: cc.ProgressBar
},
pr_exp: {
default: null,
type: cc.ProgressBar
},
nd_pick: {
default: null,
type: cc.Node
},
nd_boss: {
default: null,
type: cc.Node
},
pr_bosshp: {
default: null,
type: cc.ProgressBar
},
lb_bosshp: {
default: null,
type: cc.Label
},
lb_bossname: {
default: null,
type: cc.Label
},
nd_buzhuo: {
default: null,
type: cc.Node
},
nd_pet: {
default: null,
type: cc.Node
},
lb_petname: {
default: null,
type: cc.Label
},
lb_pethp: {
default: null,
type: cc.Label
},
pr_pethp: {
default: null,
type: cc.ProgressBar
},
lb_cardcount: {
default: null,
type: cc.Label
},
nd_fuhuo: {
default: null,
type: cc.Node
},
btn_back: {
default: null,
type: cc.Node
},
pbnewbie: {
default: null,
type: cc.Prefab
},
pr_jindu: {
default: null,
type: cc.ProgressBar
},
lb_jindu: {
default: null,
type: cc.Label
},
pb_gameget: {
default: null,
type: cc.Prefab
},
nd_gameget: {
default: null,
type: cc.Node
},
btn_pause: {
default: null,
type: cc.Node
},
nd_bstart: {
default: null,
type: cc.Node
},
nd_bpasue: {
default: null,
type: cc.Node
},
lb_wujin: {
default: null,
type: cc.Label
},
nd_wujin: {
default: null,
type: cc.Node
},
tg_group: {
default: null,
type: cc.ToggleContainer
}
},
onLoad: function() {
cc.Notifier.on("onchangeskill", this, this.onchangeskill.bind(this));
cc.Notifier.on("onchangeuserskill", this, this.onchangeuserskill.bind(this));
cc.Notifier.on("onskillcd", this, this.onskillcd.bind(this));
cc.Notifier.on("playerdie", this, this.playerdie.bind(this));
cc.Notifier.on("bosswarning", this, this.bosswarning.bind(this));
cc.Notifier.on("gameGetItem", this, this.gameGetItem.bind(this));
this.btn_atk.on(cc.Node.EventType.TOUCH_START, this._touchStartEventatk, this);
this.btn_atk.on(cc.Node.EventType.TOUCH_END, this._touchEndEventatk, this);
this.btn_atk.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEventatk, this);
n.desys();
},
onDestroy: function() {
cc.gamepause = !1;
cc.Notifier.off("onchangeskill", this);
cc.Notifier.off("onchangeuserskill", this);
cc.Notifier.off("onskillcd", this);
cc.Notifier.off("playerdie", this);
cc.Notifier.off("bosswarning", this);
cc.Notifier.off("gameGetItem", this);
this.btn_atk.off(cc.Node.EventType.TOUCH_START, this._touchStartEventatk, this);
this.btn_atk.off(cc.Node.EventType.TOUCH_END, this._touchEndEventatk, this);
this.btn_atk.off(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEventatk, this);
cc.kSpeed(1);
},
updatetips: function(t) {
for (var e = this.tipsarr.length - 1; e >= 0; e--) {
var i = this.tipsarr[e];
i.lifetime -= t;
if (i.lifetime <= 0) {
i.removeFromParent(!1);
this.tipscache.push(i);
this.tipsarr.splice(e, 1);
}
}
},
gameGetItem: function(t) {
var e = this.tipscache.length > 0 ? this.tipscache.pop() : cc.instantiate(this.pb_gameget);
e.lifetime = 2;
this.nd_gameget.addChild(e);
if (t.gold) {
e.color = a[1];
e.getComponent(cc.Label).string = "获得:金币" + t.gold;
this.tipsarr.push(e);
} else {
var i, s = t.cfg;
e.getComponent(cc.Label).string = "获得:" + s.name;
(i = t.qulity ? t.qulity : s.qulity) || (i = 1);
e.color = a[i];
this.tipsarr.push(e);
}
},
init: function() {
if (cc.wujin) this.lb_wujin.string = "无尽" + (cc.wujincount + 1) + "层"; else {
this.nd_wujin.active = !1;
this.lb_wujin.node.active = !1;
}
this.gamepause = !1;
var t = this.movejoy.getComponent("Joystick");
t.bindMoveCb(this.joyMove.bind(this));
t.bindEndCb(this.joyMoveEnd.bind(this));
t.bindStartCb(this.joyMoveBegin.bind(this));
this.skillarr = [];
this.skillarr2 = [];
this.tipsarr = [];
this.tipscache = [];
this.gplayer = cc.battlelogic.playerData.player;
this.nd_boss.active = !1;
this.nd_buzhuo.active = !1;
this.checkbaby = !1;
this.nd_fuhuo.active = !1;
this.pr_jindu.node.active = !0;
this.nd_pick.active = !1;
this.guajitime = 0;
if (cc.battlelogic.newbiemode) {
this.btn_back.active = !1;
this.btn_pause.active = !1;
var e = cc.instantiate(this.pbnewbie);
this.newbienode = e;
this.node.addChild(e);
this.scheduleOnce(function() {
cc.gamepause = !0;
}, 0);
}
11 == cc.wujindijin ? this.tg_group.toggleItems[1].isChecked = !0 : 101 == cc.wujindijin && (this.tg_group.toggleItems[2].isChecked = !0);
},
_touchStartEventatk: function() {
this.atking = !0;
this.btn_atk.scale = .9;
},
_touchEndEventatk: function() {
this.atking = !1;
this.btn_atk.scale = 1;
},
joyMove: function(t) {
var e = cc.v2(Math.cos(t * (Math.PI / 180)), Math.sin(t * (Math.PI / 180)));
cc.gameMgr.joyMove(e);
},
joyMoveEnd: function() {
cc.gameMgr.joyMoveEnd();
},
joyMoveBegin: function() {
cc.gameMgr.joyMoveBegin();
},
onclickskill: function(t, e) {
cc.gameMgr.onclickskill(e);
},
onclickuserskill: function(t, e) {
cc.gameMgr.onclickuserskill(e);
},
onclickdash: function() {},
onchangeuserskill: function(t) {
var e = this;
this.skillarr2 = t.userskillarr;
for (var s = 0; s < 3; s++) {
this.skillsparr2[s].spriteFrame = null;
this.skillsparr2[s].node.parent.parent.active = !1;
}
for (var n = this, a = function(t) {
var s = i[e.skillarr2[t].id].icon;
cc.resources.load("icons/skills/" + s, cc.SpriteFrame, function(e, i) {
!e && n.isValid && (n.skillsparr2[t].spriteFrame = i);
});
e.skillsparr2[t].node.parent.parent.active = !0;
}, o = 0; o < this.skillarr2.length; o++) a(o);
},
onchangeskill: function(t) {
var e = this;
this.skillarr = t.skillarr;
for (var n = 0; n < 4; n++) this.skillsparr[n].spriteFrame = null;
for (var a = this, o = function(t) {
var s = i[e.skillarr[t].id].icon;
cc.resources.load("icons/skills/" + s, cc.SpriteFrame, function(e, i) {
!e && a.isValid && (a.skillsparr[t].spriteFrame = i);
});
}, c = 0; c < this.skillarr.length; c++) o(c);
a.sp_weapon.node.scale = 2;
var r = s[t.nowweapon.id], l = r.icon;
r.scale && (a.sp_weapon.node.scale = 2 * r.scale);
cc.resources.load("icons/items/" + l, cc.SpriteFrame, function(t, e) {
!t && a.isValid && (a.sp_weapon.spriteFrame = e);
});
},
onclickquality: function() {
cc.quqlitymode = !cc.quqlitymode;
cc.gameMgr.nd_ground.active = cc.quqlitymode;
},
onskillcd: function() {},
onclickchangeweapon: function() {
cc.gameMgr.onclickchangeweapon();
},
update: function(t) {
this.updatetips(t);
this.atking && cc.gameMgr.onclickskill(0);
for (var e = 0; e < 4; e++) {
var i = this.skillarr[e];
this.skillprogress[e].progress = i ? i.nowtime / i.maxtime : 0;
}
for (e = 0; e < 3; e++) {
i = this.skillarr2[e];
this.skillprogress2[e].progress = i ? i.nowtime / i.maxtime : 0;
}
this.lb_lv.string = "LV." + this.gplayer.lv;
var s = cc.battlelogic.player.hp, n = cc.battlelogic.player.maxhp;
this.lb_hp.string = s + "/" + n;
this.pr_hp.progress = s / n;
var a = this.gplayer.exp, o = this.gplayer.maxexp;
this.lb_exp.string = a + "/" + o;
this.pr_exp.progress = a / o;
var c = cc.gameMgr.getNearDrop();
c && (cc.gameMgr.dropid = c.ctrl.objuuid);
this.dorefreshboss();
this.checkbaby && (cc.battlelogic.baby && !cc.battlelogic.baby.isdead() ? this.nd_buzhuo.active = cc.battlelogic.baby.inview : this.nd_buzhuo.active = !1);
var r = cc.battlelogic.petplayer;
if (r) {
this.nd_pet.active = !0;
this.lb_petname.string = r.name;
this.lb_pethp.string = r.hp + "/" + r.maxhp;
this.pr_pethp.progress = r.hp / r.maxhp;
} else this.nd_pet.active = !1;
if (this.pr_jindu.node.active) {
var l = cc.battlelogic.getjindu();
l = Math.min(1, l);
this.pr_jindu.progress = l;
this.lb_jindu.string = Math.floor(100 * l) + "%";
}
if (this.guajitime > 0) {
this.guajitime -= t;
if (this.guajitime <= 0) {
this.guajitime = 0;
cc.director.loadScene("guajitemp");
}
}
},
dopick: function() {
cc.gameMgr.dropid = this.dropid;
},
refreshboss: function() {
this.pr_jindu.node.active = !1;
this.nd_boss.active = !0;
this.boss = cc.battlelogic.bossobj;
this.lb_bossname.string = "lv" + this.boss.lv + " " + this.boss.name;
this.dorefreshboss();
},
dorefreshboss: function() {
if (!this.hasover && this.nd_boss.active) {
var t = this.boss.hp, e = this.boss.maxhp;
this.lb_bosshp.string = t + "/" + e;
this.pr_bosshp.progress = t / e;
if (this.boss.isdead()) {
this.nd_boss.active = !1;
cc.uiHelper.showTips("战斗胜利");
this.hasover = !0;
cc.wujin && (cc.wujincount += cc.wujindijin);
(cc.guaji || cc.wujin) && this.scheduleOnce(function() {
cc.director.loadScene("guajitemp");
}, 3);
}
}
},
docheckbaby: function(t) {
this.lb_cardcount.string = "x" + cc.playerData.getitemcountbyid(30001);
this.checkbaby = t;
this.checkbaby || (this.nd_buzhuo.active = !1);
},
buzhuo: function() {
cc.battlelogic.baby && cc.battlelogic.baby.addbuff(4011, 100);
if (cc.playerData.getitemcountbyid(30001) > 0) {
cc.playerData.xiaohaoitembyid(30001, 1);
this.lb_cardcount.string = "x" + cc.playerData.getitemcountbyid(30001);
cc.gameMgr.catch = 30;
} else cc.uiHelper.showTips("封印卡不足");
},
buzhuoad: function() {
this.gamepause || this.onclickpuse();
cc.battlelogic.baby && cc.battlelogic.baby.addbuff(4011, 100);
var t = this;
n.adWatch("catchbaby", function() {
t.onclickpuse();
cc.gameMgr.catch = 100;
});
},
onclickback: function() {
cc.battling = !1;
cc.director.loadScene("main");
},
playerdie: function() {
if (cc.battlelogic.newbiemode) this.newbienode.active = !0; else {
if (cc.wujinchongpa) {
cc.mode1w ? cc.wujincount = 1e4 : cc.wujincount = 0;
this.guajitime = 5;
}
cc.guaji && (this.guajitime = 5);
this.nd_fuhuo.active = !0;
}
},
clickfh: function() {
var t = this;
this.guajitime = 0;
n.adWatch("fuhuo", function() {
cc.gameMgr.fuhuo = !0;
t.nd_fuhuo.active = !1;
});
},
clickfq: function() {
this.guajitime = 0;
cc.soundMgr.playSound("run");
cc.battling = !1;
cc.director.loadScene("main");
},
bosswarning: function() {},
onclickpuse: function() {
this.gamepause = !this.gamepause;
cc.gamepause = this.gamepause;
this.nd_bpasue.active = !this.gamepause;
this.nd_bstart.active = this.gamepause;
this.gamepause ? cc.uiHelper.showTips("游戏暂停") : cc.uiHelper.showTips("游戏恢复");
},
onclickwujin: function(t) {
var e = t.node.name;
"toggle1" == e ? cc.wujindijin = 1 : "toggle2" == e ? cc.wujindijin = 11 : "toggle3" == e && (cc.wujindijin = 101);
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
enumcfg: "enumcfg",
gameConfig: "gameConfig",
skillcfg: "skillcfg"
} ],
gameai: [ function(t, e) {
"use strict";
cc._RF.push(e, "a56feWDdS9LeJlgdcED9N60", "gameai");
var i = t("Utils"), s = {
Delay: 1,
AtkOrIdle: 2,
UseSkill: 3,
RunAway: 4,
WaitForHurt: 5,
Follow: 6,
MoveToTarget: 7
}, n = {
22: {
"0_100": [ {
tp: s.MoveToTarget,
atkdis: 200,
condition: {
tp: 1,
dis: 140
}
}, {
tp: s.UseSkill,
condition: {
tp: 5
}
}, {
tp: s.Follow,
condition: {
tp: 6
}
} ]
},
12: {
"0_100": [ {
tp: s.WaitForHurt,
v: 1,
isonce: !0
}, {
tp: s.AtkOrIdle,
atkdis: 30,
atkview: 140,
giveupview: 140
}, {
tp: s.UseSkill
} ]
},
5: {
"0_100": [ {
tp: s.WaitForHurt,
v: 1
}, {
tp: s.RunAway,
v: 200
} ]
},
1: {
"0_100": [ {
tp: s.AtkOrIdle,
atkdis: 40,
atkview: 140,
giveupview: 999
}, {
tp: s.UseSkill
} ]
},
2: {
"0_100": [ {
tp: s.WaitForHurt,
v: 1,
isonce: !0
}, {
tp: s.AtkOrIdle,
atkdis: 40,
atkview: 140,
giveupview: 999
}, {
tp: s.UseSkill
} ]
},
3: {
"0_100": [ {
tp: s.AtkOrIdle,
atkdis: 140,
atkview: 150,
giveupview: 200
}, {
tp: s.UseSkill
} ]
},
4: {
"0_100": [ {
tp: s.WaitForHurt,
v: 1,
isonce: !0
}, {
tp: s.AtkOrIdle,
atkdis: 140,
atkview: 150,
giveupview: 200
}, {
tp: s.UseSkill
} ]
},
10: {
"0_100": [ {
tp: s.Delay,
v: 1,
isonce: !0
}, {
tp: s.AtkOrIdle,
atkdis: 230,
atkview: 250,
giveupview: 999
}, {
tp: s.UseSkill
} ]
},
11: {
"0_100": [ {
tp: s.CloseAndUseSkill
} ]
}
};
e.exports = function() {
this.init = function(t, e) {
var i, a;
this.owner = e;
this.area = e.view;
this.gamelogic = e.gamelogic;
this.enemycamp = this.gamelogic.getenemycamp(e);
this.target = null;
this.aicfgkey = [];
this.aicfg = n[t];
for (var o in this.aicfg) this.aicfgkey.push(o);
this.nowmin = 999;
this.nowmax = -999;
this.aiidx = 0;
this.aiready = !1;
this.AIFTB = ((i = {})[s.AtkOrIdle] = this.AIAtkOrIdle.bind(this), i[s.UseSkill] = this.AIUseSkill.bind(this), 
i[s.RunAway] = this.AIRunAway.bind(this), i[s.Delay] = this.AIDelay.bind(this), 
i[s.WaitForHurt] = this.AIWaitForHurt.bind(this), i[s.Follow] = this.AIFollow.bind(this), 
i[s.MoveToTarget] = this.AIMoveToTarget.bind(this), i[s.CloseAndUseSkill] = this.AICloseAndUseSkill.bind(this), 
i);
this.ConditionTB = ((a = {})[1] = this.AIChasenemy.bind(this), a[3] = this.AICplayerdis.bind(this), 
a[2] = this.AIChpbetween.bind(this), a[5] = this.AICsame.bind(this), a[6] = this.AICdifference.bind(this), 
a[7] = this.AIChasfriend.bind(this), a);
};
this.AIChasenemy = function() {
return this.gamelogic.findnpcwithcmp(this.owner, this.enemycamp).length > 0;
};
this.AICplayerdis = function(t) {
i.getdistancenosqrt(cc.battlelogic.player, this.owner), t.dis, t.dis;
};
this.AIChpbetween = function() {};
this.AICsame = function() {
return this.lastpanduan;
};
this.AICdifference = function() {
return !this.lastpanduan;
};
this.AIChasfriend = function() {
return this.gamelogic.findnpcwithcmp(this.owner, this.owner.camp).length > 0;
};
this.checkhp = function() {
if (this.oldhp != this.owner.hp) {
this.oldhp = this.owner.hp;
var t = this.owner.gethp100();
if (t <= this.nowmax && t >= this.nowmin) return !1;
for (var e = 0; e < this.aicfgkey.length; e++) {
var i = this.aicfgkey[e].split("_");
if (t <= Number(i[1]) && t > Number(i[0])) {
this.ai = this.aicfg[this.aicfgkey[e]];
this.nowmin = Number(i[0]);
this.nowmax = Number(i[1]);
this.aiidx = 0;
this.oncemap = {};
this.aiready = !0;
return !0;
}
}
}
};
this.AIWaitForHurt = function(t, e) {
if (e) {
this.savehp = this.owner.hp;
this.aitime = 0;
} else if (cc.shenyuan || cc.hell || cc.wujin) this.aiready = !0; else if (this.savehp == this.owner.hp) {
this.aitime += t;
if (this.aitime > 3) {
this.aitime = 0;
if (i.randintSeed(100) > 70) {
this.owner.dir.x = -50 + i.randintSeed(100);
this.owner.dir.y = -50 + i.randintSeed(100);
this.owner.dir.normalizeSelf();
this.owner.clickingmoveing = !0;
this.aitime = 2.5;
} else this.owner.clickingmoveing = !1;
}
} else {
this.target = this.owner.chouren;
this.owner.clickingmoveing = !1;
this.aiready = !0;
}
};
this.AIFollow = function(t, e) {
var i = cc.battlelogic.player.x - this.owner.x, s = cc.battlelogic.player.y - this.owner.y;
if (e) {
this.owner.dir.x = i;
this.owner.dir.y = s;
this.aitime = .5;
this.owner.dir.normalizeSelf();
this.owner.clickingmoveing = !0;
} else {
Math.abs(i) < 30 && Math.abs(s) < 30 ? this.owner.clickingmoveing = !1 : this.owner.clickingmoveing = !0;
this.aitime -= t;
if (this.aitime <= 0) {
this.aiready = !0;
this.owner.clickingmoveing = !1;
}
}
};
this.AIRunAway = function(t, e) {
if (e) {
this.closev = this.nowaicfg.v * this.nowaicfg.v;
this.aitime = 0;
} else {
this.aitime -= t;
if (this.aitime <= 0) {
this.aitime = .1;
this.target && !this.target.isdead() || (this.target = this.gamelogic.findnpcwithcmp(this.owner, this.enemycamp, !0)[0]);
if (!this.target) {
this.aiready = !0;
this.owner.clickingmoveing = !1;
return;
}
if ((i = Math.abs(this.owner.x - this.target.x)) * i + (s = Math.abs(this.owner.y - this.target.y)) * s > this.closev) {
this.target = null;
this.aiready = !0;
this.owner.clickingmoveing = !1;
return;
}
this.owner.clickingmoveing = !0;
this.owner.dir.x = this.owner.x - this.target.x;
this.owner.dir.y = this.owner.y - this.target.y;
this.owner.dir.normalizeSelf();
}
if (this.target) {
var i, s;
if ((i = Math.abs(this.owner.x - this.target.x)) * i + (s = Math.abs(this.owner.y - this.target.y)) * s > this.closev) {
this.target = null;
this.aiready = !0;
this.owner.clickingmoveing = !1;
}
}
}
};
this.AIMoveToTarget = function(t, e) {
if (e) {
this.closev = this.nowaicfg.atkdis * this.nowaicfg.atkdis;
this.target = this.gamelogic.findnpcwithcmp(this.owner, this.enemycamp, !0)[0];
this.owner.clickingmoveing = !0;
} else if (this.target.isdead()) {
this.aiready = !0;
this.owner.clickingmoveing = !1;
} else {
var i = this.target.x - this.owner.x, s = this.target.y - this.owner.y;
this.owner.dir.x = i - this.owner.offx;
this.owner.dir.y = s - this.owner.offy;
this.owner.dir.normalizeSelf();
if (i * i + s * s < this.closev) {
this.target = null;
this.aiready = !0;
this.owner.clickingmoveing = !1;
}
}
};
this.AICloseAndUseSkill = function(t, e) {
if (e) {
this.aitime = 0;
this.target = null;
this.closev = 1600;
} else {
if (this.target && this.target.isdead()) {
this.owner.clickingmoveing = !1;
this.target = null;
}
if (this.target) {
var i = Math.abs(this.owner.x - this.target.x), s = Math.abs(this.owner.y - this.target.y);
i * i + s * s < this.closev ? this.owner.clickingmoveing = !1 : this.owner.clickingmoveing = !0;
this.owner.clickskill(this.owner.randskllidx());
} else {
this.target = this.gamelogic.findnpcwithcmp(this.owner, this.enemycamp, !0)[0];
if (this.target) {
this.owner.clickingmoveing = !0;
this.owner.dir.x = this.target.x - this.owner.x - this.owner.offx;
this.owner.dir.y = this.target.y - this.owner.y - this.owner.offy;
this.owner.dir.normalizeSelf();
}
}
this.aitime += t;
if (this.aitime > .3) {
this.owner.clickingmoveing = !1;
this.target = null;
this.aitime = 0;
}
}
};
this.AIAtkOrIdle = function(t, e) {
if (e) {
this.closev = this.nowaicfg.atkdis * this.nowaicfg.atkdis;
this.atkview = this.nowaicfg.atkview * this.nowaicfg.atkview;
this.giveupview = this.nowaicfg.giveupview * this.nowaicfg.giveupview;
this.aitime = 0;
this.aitime2 = 0;
this.savehp = this.owner.hp;
} else if (!(this.owner.yctime > 0)) {
var s = !1;
if (this.savehp != this.owner.hp) {
this.savehp = this.owner.hp;
s = !0;
this.aitime = 0;
}
if (!this.target) {
this.aitime2 += t;
if (this.aitime2 > 3) {
this.aitime2 = 0;
if (i.randintSeed(100) > 70) {
this.owner.dir.x = -50 + i.randintSeed(100);
this.owner.dir.y = -50 + i.randintSeed(100);
this.owner.dir.normalizeSelf();
this.owner.clickingmoveing = !0;
this.aitime2 = 2.5;
} else this.owner.clickingmoveing = !1;
}
}
this.aitime -= t;
if (this.aitime <= 0) {
this.aitime = .1;
var n = this.giveupview;
if (!this.target || this.target.isdead()) {
this.target = this.gamelogic.findnpcwithcmp(this.owner, this.enemycamp, !0)[0];
n = this.atkview;
}
s && (n = 99999999);
if (this.target) {
if ((c = (a = Math.abs(this.owner.x - this.target.x)) * a + (o = Math.abs(this.owner.y - this.target.y)) * o) > n) {
this.target = null;
return;
}
if (c < this.closev) {
this.target = null;
this.aiready = !0;
this.owner.clickingmoveing = !1;
return;
}
this.owner.clickingmoveing = !0;
this.owner.dir.x = this.target.x - this.owner.x - this.owner.offx;
this.owner.dir.y = this.target.y - this.owner.y - this.owner.offy;
this.owner.dir.normalizeSelf();
}
}
if (this.target) {
var a, o, c;
if ((c = (a = Math.abs(this.owner.x - this.target.x)) * a + (o = Math.abs(this.owner.y - this.target.y)) * o) < this.closev) {
this.target = null;
this.aiready = !0;
this.owner.clickingmoveing = !1;
}
}
}
};
this.AIDelay = function(t, e) {
if (e) this.aitime = this.nowaicfg.v; else {
this.aitime -= t;
this.aitime <= 0 && (this.aiready = !0);
}
};
this.AIUseSkill = function(t, e) {
if (!(e || this.owner.yctime > 0)) {
this.owner.clickskill(this.owner.randskllidx());
this.aiready = !0;
}
};
this.update = function(t) {
if (!this.owner.yingzhi && !this.owner.isdead()) {
this.checkhp();
if (this.aiready) {
this.aiready = !1;
this.nowaicfg = this.ai[this.aiidx];
var e = !0;
if (this.nowaicfg.condition) {
e = this.ConditionTB[this.nowaicfg.condition.tp](this.nowaicfg.condition);
this.lastpanduan = e;
}
if (this.nowaicfg.isonce) {
if (this.oncemap[this.aiidx]) {
this.aiready = !0;
this.aiidx++;
this.aiidx %= this.ai.length;
return;
}
e && (this.oncemap[this.aiidx] = !0);
}
if (e) {
this.nowfun = this.AIFTB[this.nowaicfg.tp];
this.nowfun(0, !0);
} else {
this.aiready = !0;
this.nowfun = null;
}
this.aiidx++;
this.aiidx %= this.ai.length;
}
this.nowfun && this.nowfun(t);
}
};
this.reset = function() {
this.aiidx = 0;
this.aiready = !0;
this.oncemap = {};
};
};
cc._RF.pop();
}, {
Utils: "Utils"
} ],
gamelogic: [ function(t, e) {
"use strict";
cc._RF.push(e, "b9a0cWRrnFGmINmRjIZ7QXh", "gamelogic");
var i = t("perlinnoise"), s = t("Utils"), n = t("lootobj"), a = t("npcobj"), o = t("bulletobj"), c = t("equipobj"), r = t("lootcfg"), l = t("dragonobj"), h = t("dropobj"), p = t("dropcfg"), d = p.dropcfg, u = p.cailiao1, f = p.cailiao2, g = t("stagecfg"), y = g.stagecfg, m = g.dixing, b = t("talentcfg"), v = t("gameConfig").itemConfig, k = cc.v2(0, 1), _ = [ [ 34009, 34026 ], [ 34032, 34049 ], [ 34055, 34072 ] ], w = [ 20502, 20510 ], x = [ 31021, 31022, 31023, 20523, 20524, 20525, 20526 ], C = [ 20607, 20608, 20609, 32010, 32011, 32012, 32013, 32014, 32015 ], S = [ 20027, 20127, 20227, 20327, 20427, 20028, 20128, 20228, 20328, 20428, 20029, 20129, 20229, 20329, 20429 ], q = [ 10025, 10119, 10225 ], M = function() {
this.player = {
lv: 100,
talentarr: [ b[1041], b[1043] ],
equiparr: [],
setforvaule: [],
skillarr: [ 22, 23, 24 ],
vit: 800,
dex: 200,
int: 2800,
str: 2800,
luk: 200,
agi: 800,
exp: "-",
maxexp: "-",
getelement: function() {
return [ 0, 5, 5 ];
}
};
this.w1 = new c().initwithid(99999, 100, 5);
this.w2 = new c().initwithid(99998, 100, 5);
this.w3 = new c().initwithid(99997, 100, 5);
this.stage = 999;
this.getweaponarr = function() {
return [ this.w1, this.w2, this.w3 ];
};
};
e.exports = function() {
this.init = function() {
cc.battlelogic = this;
this.babycount = 0;
this.xgird = 256;
this.ygird = 256;
this.objuuid = 1;
this.tilearr = [];
this.lootarr = [];
this.npcobjcache = [];
this.playerarr = [];
this.useskillarr = [];
this.laterbulletarr = [];
this.addarr = [];
this.delarr = [];
this.viewplayer = {};
this.areamap = {};
this.areamapdynamic = {};
this.zindexplus = 0;
this.uidir = cc.v2(0, 0);
this.bulletarr = [];
this.spobjarr = [];
this.droparr = [];
this.effarr = [];
this.monsterarea = {};
this.screenres = void 0;
this.enemycount = 0;
this.anitime = 10;
if (cc.newbiebattle) {
cc.stageid = 1e4;
this.newbiemode = !0;
this.playerData = new M();
cc.newbiebattle = !1;
} else {
this.newbiemode = !1;
this.playerData = cc.playerData;
}
var t = s.randint(1e3);
cc.hell ? cc.stageid = 100 : cc.wujin && (cc.stageid = cc.wujincount % 50 + 1);
var e = y[cc.stageid];
this.mapsize = e.size;
this.mapsize || (this.mapsize = 15);
this.mappixisizew = 64 * this.mapsize;
this.mappixisizeh = 32 * this.mapsize;
this.center = cc.v2(this.mappixisizew / 2, this.mappixisizeh / 2);
this.player = this.createnpc({
camp: 1,
lv: this.playerData.player.lv,
isplayer: !0,
x: this.mappixisizew / 2,
y: this.mappixisizeh / 2
});
this.playerData.battlepet && (this.petplayer = this.createnpc({
camp: 1,
lv: this.playerData.battlepet.lv,
petdata: this.playerData.battlepet,
x: this.mappixisizew / 2,
y: this.mappixisizeh / 2
}));
this.servertime = new Date().getTime();
this.killcount = 0;
this.bossing = !1;
this.bossstep = 0;
cc.soundMgr.playbgm("lv" + e.mainpart);
this.isshousha = cc.stageid == cc.playerData.stage;
this.dixing = m[e.mainpart];
this.createmap(t, e);
for (var i = 0; i < this.maxmonstercount; i++) this.createmonster();
};
this.createmonster = function() {
k = s.dirRotate(k, s.randintSeed(360));
var t = s.randintSeed(100) + 100;
this.createnpc({
camp: 2,
lv: this.mosetlv + s.randintSeed(2),
isplayer: !1,
x: this.center.x + t * k.x,
y: this.center.y + t * k.y,
cfgid: this.qz(this.monsters)
});
};
this.updatemoster = function(t) {
if (this.bossing) {
if (this.bosstime > 0) {
this.bosstime -= t;
if (this.bosstime <= 0) {
this.babycount = 0;
this.createboss();
}
}
} else {
if (this.enemycount < this.maxmonstercount) {
this.monstertime += t;
if (this.monstertime >= this.createtime) {
this.monstertime = 0;
this.createmonster();
}
}
if (this.killcount >= this.bosscount) {
if (this.baby && this.baby.fying) return;
cc.Notifier.emit("bosswarning");
this.bossing = !0;
this.bosstime = 3;
this.bossstep = 1;
for (var e = this.playerarr.length - 1; e >= 0; e--) {
var i = this.playerarr[e];
2 == i.camp && i.dodeadnojiangli();
}
}
}
};
this.getjindu = function() {
return this.killcount / this.bosscount;
};
this.createboss = function() {
this.bossobj = this.createnpc({
camp: 2,
lv: this.mosetlv,
isplayer: !1,
x: this.center.x + .1,
y: this.center.y + .12,
cfgid: this.bossid,
isboss: !0
});
this.bossstep = 2;
};
this.createmap = function(t, e) {
var a = cc.stageid == this.playerData.stage;
this.monstertime = 0;
var o = 1;
this.isshousha && (o = 3);
this.createtime = e.createtime || o;
this.maxmonstercount = e.count || 10;
this.mosetlv = e.lv;
this.mosetlv || (this.mosetlv = 3 * cc.stageid);
if (cc.hell) {
if (this.mosetlv < cc.playerData.player.lv) {
var c = (cc.playerData.player.lv - this.mosetlv) / 2;
this.mosetlv += c;
this.mosetlv = Math.floor(this.mosetlv);
}
} else cc.wujin ? this.mosetlv = 500 + 50 * cc.wujincount : cc.shenyuan && (this.mosetlv += 150);
var l = e.monsters;
if (e.finishmonster && !a) {
l += e.finishmonster;
cc.lanrenmode && (l += e.finishmonster);
}
this.monsters = s.strintoarr(l);
this.bosscount = e.bosscount || 20;
e.boss ? this.bossid = e.boss : this.bossid = this.qz(this.monsters);
e.firstboss && a && (this.bossid = e.firstboss);
for (var h = e.lootchance || 0, p = this.mapsize, d = this.mapsize, u = i.createmap(p, d, t, .3), f = [], g = 0, y = u.length; g < y; g++) f.push(u[g]);
var b = [], v = 0, k = m[e.mainpart].part;
for (g = 0; g < k.length; g++) v += k[g][1];
var _ = 0;
for (g = 0; g < k.length; g++) {
_ += k[g][1];
b.push(_ / v);
}
for (g = 0; g < p; g++) for (y = 0; y < d; y++) for (var w = u[g][y], x = 0; x < b.length; x++) if (w <= b[x]) {
var C = k[x][0];
u[g][y] = C;
f[g][y] < 1 && (f[g][y] = -C);
break;
}
for (var S = 0; S < p; S++) for (var q = 0; q < d; q++) {
u[S][q];
var M = {
x: 32 * S + 32 * q + 32,
y: 16 * S - 16 * q + this.mappixisizeh / 2 - 16,
tileid: Math.abs(f[S][q])
}, D = Math.floor(M.x / this.xgird) + "_" + Math.floor(M.y / this.ygird);
this.areamap[D] || (this.areamap[D] = []);
this.areamap[D].push(M);
this.objuuid++;
M.uuid = this.objuuid;
if (0 != S && S != p - 1 && 0 != q && q != d - 1 && s.randint(100) < h) {
var F = this.qz(e.loots);
if (-1 != F) {
r[F];
this.areamapdynamic[D] || (this.areamapdynamic[D] = []);
this.objuuid++;
var T = new n();
T.init({
lootid: F,
x: M.x,
y: M.y,
uuid: this.objuuid
}, this);
this.areamapdynamic[D].push(T);
}
}
}
};
this.createnpc = function(t) {
2 == t.camp && this.enemycount++;
this.objuuid++;
t.uuid = this.objuuid;
var e;
(e = this.npcobjcache.length > 0 ? this.npcobjcache.pop() : new a()).init(t, this);
this.playerarr.push(e);
this.addarr.push(e);
return e;
};
this.qz = function(t) {
if (0 == t.length) return -1;
for (var e = 0, i = [], n = 0; n < t.length; n++) {
e += t[n][1];
i.push(e);
}
if (e <= 0) return Math.floor(Math.random() * t.length);
var a = 0, o = s.randintSeed(e);
for (n = 0; n < i.length; n++) if (o < i[n]) {
a = n;
break;
}
return t[a][0];
};
this.createlootdynamic = function(t, e, i) {
var s = Math.floor(e / this.xgird) + "_" + Math.floor(i / this.ygird);
this.areamapdynamic[s] || (this.areamapdynamic[s] = []);
this.objuuid++;
var a = new n();
a.init({
lootid: t,
x: e,
y: i,
uuid: this.objuuid
}, this);
this.areamapdynamic[s].push(a);
this.lootarr.push(data);
};
this.update = function(t) {
this.servertime = new Date().getTime();
this.updatemoster(t);
this.updatetoulan(t);
this.inviewloots = [];
for (var e = this.lootarr.length - 1; e >= 0; e--) this.lootarr[e].inview && this.lootarr[e].checkmove && this.inviewloots.push(this.lootarr[e]);
for (e = this.playerarr.length - 1; e >= 0; e--) {
var i = this.playerarr[e];
if (i.update(t)) {
2 == i.camp && this.enemycount--;
this.playerarr.splice(e, 1);
this.npcobjcache.push(i);
this.delarr.push(i);
}
}
for (e = this.bulletarr.length - 1; e >= 0; e--) this.bulletarr[e].update(t) && this.bulletarr.splice(e, 1);
for (e = this.spobjarr.length - 1; e >= 0; e--) this.spobjarr[e].update(t) && this.spobjarr.splice(e, 1);
for (e = this.droparr.length - 1; e >= 0; e--) if (this.droparr[e].update(t)) {
this.delarr.push(this.droparr[e]);
this.droparr.splice(e, 1);
}
for (e = this.laterbulletarr.length - 1; e >= 0; e--) {
var s = this.laterbulletarr[e];
s.t -= t;
if (s.t <= 0) {
this.bulletarr.push(s.v);
this.addarr.push(s.v);
this.laterbulletarr.splice(e, 1);
}
}
var n = this.player.x, a = this.player.y, o = Math.floor(n / this.xgird), c = Math.floor(a / this.ygird), r = o + "_" + c, l = !1, h = this.tilearr, p = this.lootarr;
if (this.pareakey != r) {
this.zindexplus = c * this.ygird;
this.resetzIndex = !0;
l = !0;
var d = o - 1, u = o + 1, f = c - 1, g = c + 1, y = [ o + "_" + c, o + "_" + f, o + "_" + g, d + "_" + c, d + "_" + f, d + "_" + g, u + "_" + c, u + "_" + f, u + "_" + g ];
this.tilearr = [];
this.lootarr = [];
e = 0;
for (var m = y.length; e < m; e++) {
var b = this.areamap[y[e]];
if (b) for (var v = 0, k = b.length; v < k; v++) this.tilearr.push(b[v]);
var _ = this.areamapdynamic[y[e]];
if (_) for (v = 0, k = _.length; v < k; v++) this.lootarr.push(_[v]);
}
this.pareakey = r;
}
return {
areachange: l,
tileold: h,
tilearr: this.tilearr,
lootold: p,
lootarr: this.lootarr,
player: this.player,
zindexplus: this.zindexplus,
addarr: this.addarr,
delarr: this.delarr,
flagreplayer: this.flagreplayer,
flaghasbaby: this.flaghasbaby,
flagnobaby: this.flagnobaby,
playerarr: this.playerarr,
effarr: this.effarr,
screenres: this.screenres,
bossstep: this.bossstep
};
};
this.createeff = function(t) {
this.effarr.push(t);
};
this.createscreen = function(t) {
this.screenres = t;
};
this.afterupdate = function() {
this.flaghasbaby = !1;
this.flagnobaby = !1;
this.flagreplayer = !1;
this.player.flagskillchange = !1;
this.player.flagweaponchange = !1;
this.player.flagskillcd.length = 0;
this.addarr.length = 0;
this.delarr.length = 0;
this.effarr.length = 0;
this.bossstep = 0;
this.screenres = void 0;
for (var t = this.playerarr.length - 1; t >= 0; t--) {
var e = this.playerarr[t];
e.flaguseskill = null;
e.dmgarr.length = 0;
e.flagaddbuff.length = 0;
e.flagremovebuff.length = 0;
e.skipadd = void 0;
e.deadinthisframe = !1;
e.reborninthiframe = !1;
e.flagbuzhuo = !1;
e.flagyongchang = !1;
e.flagchangeuserskill = !1;
e.flaglvup = !1;
e.flagfuhuo = !1;
}
};
this.ongui = function(t) {
if (null != t.movehold) if (t.movehold) this.player.movebegin(); else {
this.uidir.x = 0;
this.uidir.y = 0;
this.player.moveend();
}
if (t.movedir) {
this.uidir.x = t.movedir.x;
this.uidir.y = t.movedir.y;
this.player.setmovedir(t.movedir.x, t.movedir.y);
}
t.ckickweapon && this.player.ckickweapon();
null != t.clickskillidx && this.player.clickskill(t.clickskillidx);
null != t.clickskillidx2 && this.player.clickskill2(t.clickskillidx2);
t.dropid && this.getitem(t.dropid);
t.catch && this.catchbaby(t.catch);
if (t.fuhuo) {
this.player.reset();
this.player.addbuff(4007, 100, 1);
}
};
this.findnpcwithcmp = function(t, e, i) {
for (var s = [], n = this.playerarr, a = n.length - 1; a >= 0; a--) n[a].inview && n[a].camp == e && !n[a].isdead() && s.push(n[a]);
i && (s = s.sort(function(e, i) {
return Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2) - (Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2));
}));
return s;
};
this.getenemycamp = function(t) {
var e = 1;
1 == t.camp && (e = 2);
return e;
};
this.pushbullet = function(t) {
if (t.cfg.warning) {
var e = {
t: t.cfg.warning,
v: t,
objtype: 100
};
this.laterbulletarr.push(e);
this.addarr.push(e);
} else if (t.cfg.warning2) {
e = {
t: t.cfg.warning2,
v: t.getwarning2(),
objtype: 100
};
var i = {
t: t.cfg.warning2,
v: t,
objtype: 100
};
this.laterbulletarr.push(i);
this.addarr.push(e);
} else {
this.bulletarr.push(t);
this.addarr.push(t);
}
};
this.createbullets = function(t, e, i, n) {
for (var a = i.x, c = i.y, r = 0, l = e.length - 1; l >= 0; l--) {
var h = e[l];
r = h[2];
if (0 != h[3]) {
r -= h[3] / 2;
r += s.randintSeed(h[3]);
}
var p = s.dirRotate(n, r), d = new o();
d.init(t, h[0], a + p.x * h[1], c + p.y * h[1], p, i);
this.pushbullet(d);
}
};
this.createbulletspingxing = function(t, e, i, n) {
for (var a = i.x, c = i.y, r = cc.v2(), l = 0, h = e.length - 1; h >= 0; h--) {
var p = e[h], d = s.dirRotate(n, 90), u = s.randintSeed(p[2]) - p[2] / 2;
r.x = a + d.x * u;
r.y = c + d.y * u;
r.x = r.x + n.x * p[1];
r.y = r.y + n.y * p[1];
l = p[3];
if (0 != p[4]) {
l -= p[4] / 2;
l += s.randintSeed(p[4]);
}
var f = s.dirRotate(n, l), g = new o();
g.init(t, p[0], r.x, r.y, f, i);
this.pushbullet(g);
}
};
this.createbulletsground = function(t, e, i, n, a) {
for (var c = n.x, r = n.y, l = e.length - 1; l >= 0 && !(a && s.getdistancenosqrt(i, n) > a); l--) {
var h = e[l], p = new o();
1 == n.objtype && (p.hittar = n);
p.init(t, h[0], c + h[1], r + h[2], cc.v2(0, 0), i);
this.pushbullet(p);
}
};
this.createbulletsgroundrand = function(t, e, i, n) {
for (var a = n.x, c = n.y, r = e.length - 1; r >= 0; r--) {
var l = e[r], h = new o();
h.init(t, l[0], a + s.randintSeed(l[1]) - l[1] / 2, c + s.randintSeed(l[2]) - l[2] / 2, cc.v2(0, 0), i);
this.pushbullet(h);
}
};
this.createonebullet = function(t, e, i, s, n, a) {
var c = new o();
c.init(t, e, i, s, n, a);
this.pushbullet(c);
};
this.createspobjs = function(t, e, i) {
for (var s = e.length - 1; s >= 0; s--) {
var n = e[s], a = null;
1 == n[0] && (a = new l());
a.init(n, i, this, t);
this.spobjarr.push(a);
this.addarr.push(a);
}
};
this.createbulletsgrounddir = function(t, e, i) {
for (var s = e.length - 1; s >= 0; s--) {
var n = e[s], a = new o();
a.init(t, n[0], i.x + i.dir.x * n[1], i.y + i.dir.y * n[1], cc.v2(i.dir.x, i.dir.y), i);
this.pushbullet(a);
}
};
this.getitem = function(t) {
for (var e = null, i = this.droparr.length - 1; i >= 0; i--) if (this.droparr[i].uuid == t) {
var s = this.droparr[i].itemdata;
if (s.isitem) {
this.playerData.additembyid(s.id, 1);
this.delarr.push(this.droparr[i]);
this.droparr.splice(i, 1);
e = {
cfg: v[s.id]
};
} else if (this.playerData.additem(s)) {
this.delarr.push(this.droparr[i]);
this.droparr.splice(i, 1);
e = {
cfg: s.cfg,
qulity: s.qulity
};
}
break;
}
cc.Notifier.emit("gameGetItem", e);
};
this.adddropgold = function(t) {
this.playerData.changegold(t);
var e = {
gold: t
};
cc.Notifier.emit("gameGetItem", e);
};
this.adddrop = function(t, e) {
if (v[t]) {
var i = new h().init(t, e);
if (cc.autoget) {
var s = null, n = i.itemdata;
if (n.isitem) {
this.playerData.additembyid(n.id, 1);
s = {
cfg: v[n.id]
};
} else if (cc.autosell && n.qulity < 5) {
var a = Math.floor(n.cfg.cost / 2);
this.playerData.changegold(a);
s = {
gold: a
};
} else {
this.playerData.additem(n);
s = {
cfg: n.cfg,
qulity: n.qulity
};
}
cc.Notifier.emit("gameGetItem", s);
} else {
this.droparr.push(i);
this.addarr.push(i);
}
} else console.log(t + "不存在");
};
this.createdrop = function(t) {
if (!this.newbiemode) {
cc.wujin && this.adddropgold(s.randintSeed(Math.floor(t.lv / 50)) + 1);
var e = Math.floor(t.lv / 10) + 2;
e = Math.max(Math.min(e, 10), 1);
var i = 1, n = 5;
if (t.isboss) {
i = 5;
n = 30;
this.isshousha && (i *= 2);
}
cc.dropadd && (n *= 2);
(cc.shenyuan || cc.hell) && (n *= 1.5);
for (var a = 0; a < i; a++) if (s.randintSeed(100) < n) {
var o;
if (s.randintSeed(100) > 30) {
var c = Math.ceil(e / 2), r = c + s.randintSeed(c) + 1;
r > 10 && (r = 10);
o = d[r];
} else o = t.lv >= 60 && s.randintSeed(100) > 50 ? f : u;
var l = o[s.randintSeed(o.length)];
this.adddrop(l, t);
}
(cc.hell || cc.wujin) && s.randintSeed(500) < 2 && this.adddrop(30005, t);
if (t.isboss) {
var h = n / 2;
s.randintSeed(100) < h && this.adddrop(30002, t);
s.randintSeed(100) < h && this.adddrop(30003, t);
s.randintSeed(100) < n / 4 && this.adddrop(35001, t);
s.randintSeed(100) < 4 && this.adddrop(30004, t);
var p = Math.floor(t.lv / 10);
p > 10 && (p = 10);
cc.dropadd && (p *= 2);
if (s.randintSeed(100) < p) {
var g = _[s.randintSeed(_.length)], y = g[0] + s.randintSeed(g[1] - g[0] + 1);
this.adddrop(y, t);
}
if (s.randintSeed(100) < 2 * p) {
var m = w[0] + s.randintSeed(w[1] - w[0] + 1);
s.randintSeed(100) < 2 && (m = 20511);
this.adddrop(m, t);
}
if (t.dropdata) for (a = 0; a < t.dropdata.length; a++) {
var b = t.dropdata[a];
s.randintSeed(100) < b[1] && this.adddrop(b[0], t);
}
if (cc.shenyuan || cc.hell || cc.wujin) {
if (s.randintSeed(100) < 2) {
m = x[s.randintSeed(x.length)];
this.adddrop(m, t);
}
if (s.randintSeed(100) < 5) {
m = C[s.randintSeed(C.length)];
this.adddrop(m, t);
}
if (t.dropdatasy) for (var v = 0; v < t.dropdatasy.length; v++) {
var k = t.dropdatasy[v];
s.randintSeed(100) < k[1] && this.adddrop(k[0], t);
}
}
if (cc.hell || cc.wujin) {
s.randintSeed(500) < 2 && this.adddrop(30006, t);
s.randintSeed(100) < 10 && this.adddrop(30005, t);
}
if (cc.wujin) {
var M = 500 - cc.wujincount;
M < 100 && (M = 100);
cc.dropadd && (M /= 2);
if (s.randintSeed(M) < 2) {
m = S[s.randintSeed(S.length)];
this.adddrop(m, t);
}
if (cc.wujincount >= 1e4 && s.randintSeed(1e3) < 2) {
var D = q[s.randintSeed(q.length)];
this.adddrop(D, t);
}
}
}
}
};
this.catchbaby = function(t) {
this.baby && (this.baby.isdead() || this.baby.fying || this.baby.addbuff(102, 100, void 0, void 0, void 0, void 0, void 0, t));
};
this.updatetoulan = function() {
this.anitime--;
this.player.yctime > 0 || this.anitime > 0 || this.baby && this.baby.fying || cc.autoatk && !this.player.clickingmoveing && this.player.clickskill(this.player.randskllidx(!0));
};
};
cc._RF.pop();
}, {
Utils: "Utils",
bulletobj: "bulletobj",
dragonobj: "dragonobj",
dropcfg: "dropcfg",
dropobj: "dropobj",
equipobj: "equipobj",
gameConfig: "gameConfig",
lootcfg: "lootcfg",
lootobj: "lootobj",
npcobj: "npcobj",
perlinnoise: "perlinnoise",
stagecfg: "stagecfg",
talentcfg: "talentcfg"
} ],
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
gamenewbie: [ function(t, e) {
"use strict";
cc._RF.push(e, "5f354mzgCVOkYewQ/LxcU2G", "gamenewbie");
cc.Class({
extends: cc.Component,
properties: {
nd_yindao: {
default: null,
type: cc.Node
},
nd_over: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.nd_yindao.active = !0;
this.nd_over.active = !this.nd_yindao.active;
},
onclose2: function() {
cc.director.loadScene("main");
this.node.destroy();
},
onclose: function() {
this.nd_yindao.active = !1;
this.nd_over.active = !this.nd_yindao.active;
this.node.active = !1;
cc.gamepause = !1;
}
});
cc._RF.pop();
}, {} ],
gameres: [ function(t, e) {
"use strict";
cc._RF.push(e, "1e08aPlMo9FyopV7Sll4p5q", "gameres");
var i = t("gameloot"), s = t("Utils");
cc.Class({
extends: cc.Component,
properties: {
pb_warning: {
default: null,
type: cc.Prefab
},
pb_npc: {
default: null,
type: cc.Prefab
},
pb_weapon: {
default: null,
type: cc.Prefab
},
pb_hurtlb: {
default: null,
type: cc.Prefab
},
pb_effframe: {
default: null,
type: cc.Prefab
},
pb_debugbox: {
default: null,
type: cc.Prefab
},
pb_bullet: {
default: null,
type: cc.Prefab
},
pb_buff: {
default: null,
type: cc.Prefab
},
gamecamera: {
default: null,
type: cc.Camera
},
sp_1: {
default: null,
type: cc.Sprite
},
pb_drop: {
default: null,
type: cc.Prefab
},
pb_shadow: {
default: null,
type: cc.Prefab
}
},
onLoad: function() {
cc.gameresmgr = this;
this.autotilepool = [];
this.spritepool = [];
this.lootpool = [];
this.npcpool = [];
this.weaponpool = [];
this.hurtpool = [];
this.effpool = [];
this.bulletpool = [];
this.shadowpool = [];
this.weapinarr = [];
this.hurtarr = [];
this.effarr = [];
this.bulletarr = [];
this.movefabarr = [];
this.shadowarr = [];
this.parpbs = {};
this.parpbsIns = {};
this.breadyFrame = {};
this.buffpoolicon = [];
this.warningpool = [];
this.warningarr = [];
this.droppool = [];
this.piecearr = [];
},
initdata: function() {
this.winwidth = cc.winSize.width;
this.winheight = cc.winSize.height;
var t = new cc.RenderTexture();
t.initWithSize(this.winwidth, this.winheight);
this.gamecamera.targetTexture = t;
var e = new cc.SpriteFrame();
e.setTexture(this.gamecamera.targetTexture);
this.sp_1.spriteFrame = e;
this.mat = this.sp_1.getMaterial(0);
this.mat.setProperty("m_mode", 1);
this.mat.setProperty("m_effectRadius", .2);
var i = this.winwidth / 2 / this.winwidth, s = (this.winheight / 2 + 256) / this.winheight;
this.mat.effect.setProperty("m_px", i);
this.mat.effect.setProperty("m_py", s);
this.mat.effect.setProperty("flagmohu", 0);
cc.gameMgr.gamelogic.dixing.niuqu && this.mat.effect.setProperty("flagreniuqu", 1);
},
effmohu: function(t) {
this.showmohu = !0;
this.mohutime = 0;
this.mohuovertime = t;
this.mat.effect.setProperty("flagmohu", 1);
},
effmohuover: function() {
this.mohutime = this.mohuovertime;
},
effxuanwo: function(t, e) {
this.showxuanwo = !0;
this.startx = t;
this.starty = e;
var i = 1.5 * (this.startx - cc.gameMgr.player.x), s = 1.5 * (this.starty - cc.gameMgr.player.y), n = (this.winwidth / 2 + i) / this.winwidth, a = (this.winheight / 2 + s + 256) / this.winheight;
this.utime = 0;
this.mat.effect.setProperty("m_time", this.utime);
this.mat.effect.setProperty("m_cx", n);
this.mat.effect.setProperty("m_cy", a);
this.mat.setProperty("m_mode", 2);
},
createshadow: function(t) {
var e, i = (e = this.shadowpool.length > 0 ? this.shadowpool.pop() : cc.instantiate(this.pb_shadow)).getComponent("cc.Sprite");
i.sizeMode = t.sp_role.sizeMode;
i.trim = t.sp_role.trim;
i.spriteFrame = t.sp_role.spriteFrame;
e.color = t.sp_role.node.color;
e.scale = t.node.scale;
var s = t.sp_role.node;
e.width = s.width;
e.height = s.height;
e.anchorY = 0;
e.scaleX *= s.scaleX;
e.scaleY *= s.scaleY;
e.lifetime = .5;
e.x = t.node.x;
e.y = t.node.y + s.y * t.node.scale;
e.opacity = 255;
e.zIndex = t.node.zIndex - 1;
t.node.parent.addChild(e);
this.shadowarr.push(e);
},
loadprefab: function(t, e) {
if (this.parpbs[t]) {
var i = cc.instantiate(this.parpbs[t]);
i.parname = t;
e(i);
} else {
var s = this;
if (null == this.breadyFrame[t]) {
this.breadyFrame[t] = [];
cc.resources.load("prefabs/" + t, cc.Prefab, function(e, i) {
if (!e) {
s.parpbs[t] = i;
for (var n = s.breadyFrame[t], a = n.length - 1; a >= 0; a--) {
var o = cc.instantiate(i);
o.parname = t;
n[a](o);
}
s.breadyFrame[t] = null;
}
});
}
this.breadyFrame[t].push(e);
}
},
createprefab: function(t, e) {
this.parpbsIns[t] || (this.parpbsIns[t] = []);
this.parpbsIns[t].length > 0 ? e(this.parpbsIns[t].pop()) : this.loadprefab(t, e);
},
recoverprefab: function(t, e) {
e.removeFromParent(!1);
this.parpbsIns[t].push(e);
},
createmoveprefab: function(t, e) {
if (cc.notani) cc.soundMgr.playSound("dragon"); else {
var i = t.prefab, s = this;
this.createprefab(i, function(i) {
i.getComponent("moveprefab").initdata(t);
e.addChild(i);
s.movefabarr.push(i);
});
}
},
createnpc: function() {
return this.npcpool.length > 0 ? this.npcpool.pop() : cc.instantiate(this.pb_npc);
},
createautotile: function(t) {
var e = this.createsprite(), i = this;
cc.resources.load("tileset/tile" + t.tileid, cc.SpriteFrame, function(t, s) {
!t && i.isValid && (e.getComponent("cc.Sprite").spriteFrame = s);
});
return e;
},
createsprite: function() {
var t;
this.spritepool.length > 0 ? t = this.spritepool.pop() : (t = new cc.Node()).addComponent("cc.Sprite");
return t;
},
createloot: function(t, e, s) {
var n;
(n = this.lootpool.length > 0 ? this.lootpool.pop() : new i()).initdata(t, {
x: e,
y: s
});
return n;
},
createweapon: function(t) {
var e;
(e = this.weaponpool.length > 0 ? this.weaponpool.pop() : cc.instantiate(this.pb_weapon)).getComponent("weapondisplay").showani(t);
this.weapinarr.push(e);
t.parent.addChild(e);
return e;
},
createeff: function(t, e) {
var i = cc.instantiate(this.pb_effframe);
i.getComponent("frameani").initdata(t, e);
this.effarr.push(i);
return i;
},
createbullet: function(t) {
if (!cc.notani) {
var e;
(e = this.bulletpool.length > 0 ? this.bulletpool.pop() : cc.instantiate(this.pb_bullet)).getComponent("bulletdisplay").initdata(t);
this.bulletarr.push(e);
return e;
}
},
createhurtlb: function(t, e) {
if (!cc.nodmglb) {
var i;
(i = this.hurtpool.length > 0 ? this.hurtpool.pop() : cc.instantiate(this.pb_hurtlb)).getComponent("dmglb").showdmg(t, e, this);
this.hurtarr.push(i);
cc.gameMgr.ndui.addChild(i);
return i;
}
},
createwarning: function(t) {
if (!cc.notani) {
var e;
(e = this.warningpool.length > 0 ? this.warningpool.pop() : cc.instantiate(this.pb_warning)).getComponent("pbwarning").initdata(t);
this.warningarr.push(e);
cc.gameMgr.nd_down.addChild(e);
return e;
}
},
createbufficon: function(t) {
var e;
(e = this.buffpoolicon.length > 0 ? this.buffpoolicon.pop() : cc.instantiate(this.pb_buff)).getComponent("pbbufficon").initdata(t);
return e;
},
createdrop: function(t) {
var e;
(e = this.droppool.length > 0 ? this.droppool.pop() : cc.instantiate(this.pb_drop)).getComponent("pbdrop").initdata(t);
return e;
},
recoverdrop: function(t) {
t.removeFromParent(!1);
this.droppool.push(t);
},
recoverbufficon: function(t) {
t.removeFromParent(!1);
this.buffpoolicon.push(t);
},
recoverloot: function(t) {
t.removeFromParent(!1);
this.lootpool.push(t);
},
recoversprite: function(t) {
t.removeFromParent(!1);
this.spritepool.push(t);
},
recovernpc: function(t) {
t.removeFromParent(!1);
this.npcpool.push(t);
},
recoverautotile: function(t) {
this.recoversprite(t);
},
updatearr: function(t, e, i) {
for (var s = e.length - 1; s >= 0; s--) {
var n = e[s];
if (n.ctrl.doupdate(t)) {
n.removeFromParent(!1);
i.push(n);
e.splice(s, 1);
}
}
},
updatearrnopool: function(t, e) {
for (var i = e.length - 1; i >= 0; i--) {
var s = e[i];
if (s.ctrl.doupdate(t)) {
s.destroy();
e.splice(i, 1);
}
}
},
doupdate: function(t) {
this.updatearr(t, this.weapinarr, this.weaponpool);
this.updatearr(t, this.hurtarr, this.hurtpool);
this.updatearrnopool(t, this.effarr);
this.updatearr(t, this.bulletarr, this.bulletpool);
this.updatearr(t, this.warningarr, this.warningpool);
for (var e = this.movefabarr.length - 1; e >= 0; e--) {
var i = this.movefabarr[e];
if (i.ctrl.doupdate(t)) {
this.recoverprefab(i.ctrl.pname, i);
this.movefabarr.splice(e, 1);
}
}
for (e = this.shadowarr.length - 1; e >= 0; e--) {
this.shadowarr[e].lifetime -= t;
this.shadowarr[e].opacity -= 255 * t;
if (this.shadowarr[e].lifetime <= 0) {
this.shadowpool.push(this.shadowarr[e]);
this.shadowarr[e].removeFromParent(!1);
this.shadowarr.splice(e, 1);
}
}
if (this.showxuanwo) {
this.utime += t;
this.utime > 5 && (this.utime += 4 * t);
this.mat.effect.setProperty("m_time", this.utime);
var s = 1.5 * (this.startx - cc.gameMgr.player.x), n = 1.5 * (this.starty - cc.gameMgr.player.y), a = (this.winwidth / 2 + s) / this.winwidth, o = (this.winheight / 2 + n + 256) / this.winheight;
this.mat.effect.setProperty("m_cx", a);
this.mat.effect.setProperty("m_cy", o);
if (this.utime > 10.5) {
this.showxuanwo = !1;
this.mat.setProperty("m_mode", 1);
}
}
if (this.showmohu) {
this.mohutime += t;
var c = this.mohutime, r = this.mohuovertime - this.mohutime;
r < .2 && (c = r);
this.mat.effect.setProperty("m_mohutime", .3 * c);
if (r <= 0) {
this.showmohu = !1;
this.mat.effect.setProperty("flagmohu", 0);
}
}
for (e = this.piecearr.length - 1; e >= 0; e--) {
var l = this.piecearr[e];
l.x += t * l.sx;
l.y += t * l.sy;
l.opacity -= 255 * t;
l.opacity <= 0 && this.piecearr.splice(e, 1);
}
},
clean: function() {
this.weapinarr.length = 0;
this.hurtarr.length = 0;
this.effarr.length = 0;
},
createdead: function(t, e) {
var i = t.sp_role.node, n = Math.max(i.width, i.height);
n *= t.node.scale;
n *= 1.6;
for (var a = i.height / 32, o = s.rendernode(t.node, n), c = (t.node.parent, n), r = n, l = Math.floor(c / 8), h = Math.ceil(c / l), p = Math.ceil(r / l), d = {
x: [],
y: [],
nu: [],
nv: []
}, u = 0; u <= h; u++) for (var f = Math.min(u * l, c), g = 0; g <= p; g++) {
var y = Math.min(g * l, r);
d.x.push(f);
d.y.push(y);
d.nu.push(f / c);
d.nv.push(y / r);
}
for (var m = h * p, b = 0; b < m; b++) {
var v = Math.floor(b / p), k = v * (p + 1) + b % h, _ = k + 1, w = k + p + 1, x = w + 1, C = {
x: d.x,
y: d.y,
nu: d.nu,
nv: d.nv,
triangles: [ k, _, w, w, x, _ ]
}, S = new cc.Node(), q = S.addComponent(cc.Sprite);
S.width = c;
S.height = r;
q.type = 4;
q.spriteFrame = new cc.SpriteFrame(o._texture);
q.spriteFrame.vertices = C;
q.setVertsDirty();
S.x = t.node.x;
S.y = t.node.y;
S.zIndex = t.node.index;
S.sx = 10 * Math.random() + 40;
var M = e < 0 ? v : p - v;
S.sy = .2 * S.sx * M;
S.sx *= e;
S.sx *= a;
S.sy *= a;
S.scale /= 1.5;
cc.gameMgr.ndplayer.addChild(S);
this.piecearr.push(S);
}
}
});
cc._RF.pop();
}, {
Utils: "Utils",
gameloot: "gameloot"
} ],
gamevaule: [ function(t, e) {
"use strict";
cc._RF.push(e, "5c06c+twBtK/q1HCF0eD82G", "gamevaule");
var i = t("Utils"), s = t("talentcfg"), n = t("monstercfg"), a = t("enumcfg"), o = a.enumproperty, c = a.enumskilltype;
e.exports = function() {
this.calshuxing = function(t, e, i) {
var s = t.water, n = t.fire, a = t.thunder;
0 != (i & c.cold) && (s += 10);
0 != (i & c.fire) && (n += 10);
0 != (i & c.thunder) && (a += 10);
return (s * e.fire + n * e.thunder + a * e.water - (s * e.thunder + n * e.water + a * e.fire)) / 300 + 1 + .03 * (s + n + a - e.fire - e.thunder - e.water);
};
this.cridule = function(t, e) {
return t.getrealvaule(o.cri) - .2 * e.luk > i.randintSeed(100);
};
this.singtime = function() {
var t = 1 - this.dex / 200;
(t /= (this.getrealvaule(o.yongchang) + 100) / 100) < 0 && (t = 0);
return t;
};
this.getaspeed = function() {
return 100 + 4 * this.agi + this.dex;
};
this.gethit = function() {
return Math.floor(this.dex + this.lv / 5) + 100;
};
this.getflee = function() {
return Math.floor(this.agi + this.lv / 5);
};
this.getmaxhp = function() {
return 120 * this.vit + 5 * this.str + 5 * this.dex + 2 * this.int + 2 * this.agi + this.luk + 100;
};
this.getatk = function() {
return Math.floor(.1 * this.vit + this.str * this.highv + .2 * this.dex + .2 * this.agi + .1 * this.int) + 20;
};
this.getmatk = function() {
return Math.floor(.1 * this.vit + .1 * this.str + .2 * this.dex + .2 * this.agi + this.int * this.highv) + 20;
};
this.getdatk = function() {
return Math.floor(.1 * this.vit + .2 * this.str + this.dex * this.highv + .2 * this.agi + .1 * this.int) + 20;
};
this.getvatk = function() {
return Math.floor(this.vit * this.highv + .2 * this.str + .2 * this.dex + .2 * this.agi + .1 * this.int) + 20;
};
this.getdef = function() {
return Math.floor(this.vit * this.highv + .2 * this.str + .2 * this.dex + .2 * this.agi + .1 * this.int) + 20;
};
this.getmdef = function() {
return Math.floor(.1 * this.vit + .2 * this.str + .2 * this.dex + .2 * this.agi + this.int * this.highv) + 20;
};
this.setprotymap = function(t) {
if (t) {
t.fmcfg && this.setprotymap(t.fmcfg);
if (t.property) for (var e = t.property, i = e.length - 1; i >= 0; i--) {
var s = e[i];
this.propertymap[s[0]] ? this.propertymap[s[0]] += s[1] : this.propertymap[s[0]] = s[1];
}
}
};
this.initplayer = function(t) {
this.playerdata = t;
var e = t.getelement();
this.water = e[0];
this.fire = e[1];
this.thunder = e[2];
this.highv = 4;
this.propertymapdynamic = {};
this.refreshplayerbp(0);
};
this.refreshplayerbp = function(t) {
this.propertymap = {};
var e = this.playerdata;
this.lv = e.lv;
this.vit = e.vit;
this.str = e.str;
this.dex = e.dex;
this.agi = e.agi;
this.int = e.int;
this.luk = e.luk;
var i = e.talentarr, s = e.equiparr, n = e.setforvaule;
this.setprotymap(s[t]);
for (var a = 3; a < s.length; a++) this.setprotymap(s[a]);
for (a = 0; a < i.length; a++) this.setprotymap(i[a]);
for (a = 0; a < n.length; a++) this.setprotymap(n[a]);
this.setprotymap(cc.playerData.getplayerbsproperty());
this.isplayer = !0;
this.calbattlev();
};
this.initpet = function(t, e, i) {
var a = n[t];
this.propertymapdynamic = {};
this.propertymap = {};
if (a.talent) for (var o = 0; o < a.talent.length; o++) {
var c = s[a.talent[o]];
this.setprotymap(c);
}
this.setprotymap(cc.playerData.getpetbsproperty());
this.cfg = a;
this.lv = e.lv;
this.highv = 12;
this.vitup = e.bp[0];
this.strup = e.bp[1];
this.dexup = e.bp[2];
this.agiup = e.bp[3];
this.intup = e.bp[4];
this.lukup = e.bp[5];
this.beilv = a.beilv / 100;
this.water = a.element[0];
this.fire = a.element[1];
this.thunder = a.element[2];
var r = .05 * this.lv + this.beilv;
i || (cc.wujin ? r *= 8 : cc.hell ? r *= 4 : cc.shenyuan && (r *= 2));
r *= cc.playerData.getscorebyid(t) / 100 + 1;
this.vit = this.vitup * r;
this.str = this.strup * r;
this.dex = this.dexup * r;
this.agi = this.agiup * r;
this.int = this.intup * r;
this.luk = this.lukup * r;
this.ispet = !0;
this.calbattlev();
};
this.initmonster = function(t, e, n) {
this.propertymapdynamic = {};
this.propertymap = {};
if (t.talent) for (var a = 0; a < t.talent.length; a++) {
var o = s[t.talent[a]];
this.setprotymap(o);
}
this.ismonster = !0;
this.isboss = n;
this.cfg = t;
this.lv = e;
this.highv = 8;
this.isboss && (this.highv = 16);
this.vitup = t.bp[0] - i.randintSeed(5);
this.strup = t.bp[1] - i.randintSeed(5);
this.dexup = t.bp[2] - i.randintSeed(5);
this.agiup = t.bp[3] - i.randintSeed(5);
this.intup = t.bp[4] - i.randintSeed(5);
this.lukup = t.bp[5];
this.beilv = t.beilv / 100;
this.water = t.element[0];
this.fire = t.element[1];
this.thunder = t.element[2];
var c = .05 * this.lv + this.beilv;
cc.wujin ? c *= 8 : cc.hell ? c *= 4 : cc.shenyuan && (c *= 2);
this.vit = this.vitup * c;
this.str = this.strup * c;
this.dex = this.dexup * c;
this.agi = this.agiup * c;
this.int = this.intup * c;
this.luk = 1 * this.lukup;
this.calbattlev();
};
this.calbattlev = function() {
this.vit += this.propertymap[o.vit] || 0;
this.str += this.propertymap[o.str] || 0;
this.int += this.propertymap[o.int] || 0;
this.dex += this.propertymap[o.dex] || 0;
this.agi += this.propertymap[o.agi] || 0;
this.luk += this.propertymap[o.luk] || 0;
this.vit += this.propertymapdynamic[o.vit] || 0;
this.str += this.propertymapdynamic[o.str] || 0;
this.int += this.propertymapdynamic[o.int] || 0;
this.dex += this.propertymapdynamic[o.dex] || 0;
this.agi += this.propertymapdynamic[o.agi] || 0;
this.luk += this.propertymapdynamic[o.luk] || 0;
var t = this.vit, e = this.str, i = this.int, s = this.dex, n = this.agi, a = this.luk;
this.propertymap[o.vit + 100] && (this.vit *= this.propertymap[o.vit + 100] / 100 + 1);
this.propertymap[o.str + 100] && (this.str *= this.propertymap[o.str + 100] / 100 + 1);
this.propertymap[o.int + 100] && (this.int *= this.propertymap[o.int + 100] / 100 + 1);
this.propertymap[o.dex + 100] && (this.dex *= this.propertymap[o.dex + 100] / 100 + 1);
this.propertymap[o.agi + 100] && (this.agi *= this.propertymap[o.agi + 100] / 100 + 1);
this.propertymap[o.luk + 100] && (this.luk *= this.propertymap[o.luk + 100] / 100 + 1);
var c = .3 * this.luk, r = this.getflee(), l = this.gethit(), h = this.isplayer ? 100 : 50;
this.ispet && (h = 100);
this.cfg && (h = this.cfg.movespeed || h);
this.propertymapstatic = {};
this.propertymapstatic[o.maxhp] = this.getmaxhp();
this.propertymapstatic[o.atk] = this.getatk();
this.propertymapstatic[o.matk] = this.getmatk();
this.propertymapstatic[o.datk] = this.getdatk();
this.propertymapstatic[o.vatk] = this.getvatk();
this.propertymapstatic[o.def] = this.getdef();
this.propertymapstatic[o.mdef] = this.getmdef();
this.propertymapstatic[o.atkspeed] = this.getaspeed();
this.propertymapstatic[o.hit] = l;
this.propertymapstatic[o.flee] = r;
this.propertymapstatic[o.cri] = c;
this.propertymapstatic[o.movespeed] = h;
this.propertymapstatic[o.xixue] = 0;
this.propertymapstatic[o.healdmg] = 0;
this.propertymapstatic[o.cridmg] = 0;
this.vit = t;
this.str = e;
this.int = i;
this.dex = s;
this.agi = n;
this.luk = a;
this.isboss && (cc.wujin ? this.propertymapstatic[o.maxhp] *= 200 : this.propertymapstatic[o.maxhp] *= 5 + cc.stageid);
this.ismonster && (cc.hell || cc.wujin ? this.propertymapstatic[o.maxhp] *= 30 : cc.shenyuan && (this.propertymapstatic[o.maxhp] *= 10));
for (var p in this.propertymap) {
var d = this.propertymap[p];
this.propertymapstatic[p] ? this.propertymapstatic[p] += d : this.propertymapstatic[p] = d;
}
this.propertymapstatic[o.vit] = this.vit;
this.propertymapstatic[o.str] = this.str;
this.propertymapstatic[o.int] = this.int;
this.propertymapstatic[o.dex] = this.dex;
this.propertymapstatic[o.agi] = this.agi;
this.propertymapstatic[o.luk] = this.luk;
};
this.getrealvaule = function(t) {
var e = this.propertymapstatic[t] || 0, i = this.propertymapstatic[t + 100] || 0;
return (e + this.getpv(t)) * (100 + this.getpv(t + 100) + i) / 100;
};
this.addpv = function(t, e) {
null == this.propertymapdynamic[t] && (this.propertymapdynamic[t] = 0);
this.propertymapdynamic[t] += e;
};
this.getpv = function(t) {
null == this.propertymapdynamic[t] && (this.propertymapdynamic[t] = 0);
return this.propertymapdynamic[t];
};
};
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
monstercfg: "monstercfg",
talentcfg: "talentcfg"
} ],
hideyuansheng: [ function(t, e) {
"use strict";
cc._RF.push(e, "0f5c0SCiwFArZIdLnnJpwrK", "hideyuansheng");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
console.log("1");
i.destroyyouxiquan();
},
onDestroy: function() {
console.log("2");
i.youxiquan();
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
httpclient: [ function(t, e) {
"use strict";
cc._RF.push(e, "09935U7kMBBr7Mr9g5bGedN", "httpclient");
var i = t("httpcli");
e.exports = {
getInstance: function() {
this._instance || (this._instance = new i());
return this._instance;
},
httpGet: function(t, e, i) {
return this.httpsend(t, null, e, i, "GET");
},
httpPost: function(t, e, i, s) {
return this.httpsend(t, e, i, s, "POST");
},
httpsend: function(t, e, i, s, n) {
return this.getInstance().httpsend(t, e, i, s, n);
},
JSON_parse: function(t) {
try {
return JSON.parse(t);
} catch (t) {
console.log(t);
return null;
}
}
};
cc._RF.pop();
}, {
httpcli: "httpcli"
} ],
httpcli: [ function(t, e) {
"use strict";
cc._RF.push(e, "3239bjKEDVNybbZkkS+pbB0", "httpcli");
var i = cc.Class({
__ctor__: function() {
this.cachemsg = [];
this._needretry = !1;
this._retrycount = 3;
this._retryms = 3e3;
},
httpGet: function(t, e, i) {
return this.httpsend(t, null, e, i, "GET");
},
httpPost: function(t, e, i, s) {
return this.httpsend(t, e, i, s, "POST");
},
httpsend: function(t, e, i, s, n) {
if (cc.sys.platform == cc.sys.WECHAT_GAME) {
var a = e ? JSON.parse(e) : null, o = new Date().getTime();
return c = wx.request({
url: t,
data: a,
method: n,
success: function(t) {
console.log("[wx]request success!" + t.statusCode);
if (t.statusCode >= 200 && t.statusCode < 400) {
var e = JSON.stringify(t.data);
i && i(e);
}
if (cc.canreport) {
var s = Number(new Date().getTime() - o);
wx.reportPerformance(1002, s);
}
},
fail: function(t) {
console.log("[wx]request fail!" + JSON.stringify(t));
s && s(-1, t.msg);
},
complete: function() {
console.log("[wx]request complete!");
}
});
}
if ("undefined" != typeof XMLHttpRequest) {
var c;
(c = new XMLHttpRequest()).onreadystatechange = function() {
if (4 == c.readyState) if (c.status >= 200 && c.status < 400) {
var t = c.responseText;
i && i(t);
} else s && s(c.status, c.statusText);
};
c.open(n, t, !0);
c.send(e);
return c;
}
return null;
},
_retry: function() {
var t = this;
this.cachemsg.length > 0 && this.cachemsg.forEach(function(e) {
var i = e;
if (!i.retrying) {
if (!i.retry_count) {
i.retry_count = 1;
i.passtime = 0;
}
i.passtime += t._retryms;
if (i.passtime >= i.retrycount * t._retryms && !i.retrying) {
i.retrying = !0;
var s = i.v ? "POST" : "GET";
t.httpsend(i.u, i.v, function(e) {
i.successcb && i.successcb(e);
var s = t.cachemsg.findIndex(function(t) {
return t == i;
});
-1 != s && t.cachemsg.splice(s, 1);
}, function(e, s) {
i.retrying = !1;
i.passtime = 0;
i.retry_count++;
if (i.retry_count >= t._retrycount) {
i.errcb && i.errcb(e, s);
var n = t.cachemsg.findIndex(function(t) {
return t == i;
});
-1 != n && t.cachemsg.splice(n, 1);
}
}, s, !0);
}
}
});
},
setRetryCount: function(t) {
this.retrycount = t;
},
setRetryInterval: function(t) {
if (t != this._retryms) {
this._retryms = t;
this._retry_tid && clearInterval(this._retry_tid);
this._retry_tid = setInterval(this._retry.bind(this), this._retryms);
}
},
setNeedRetry: function(t) {
this._needretry = t;
if (!this._needretry && this._retry_tid) {
clearInterval(this._retry_tid);
this._retry_tid = 0;
} else this._needretry && !this._retry_tid && (this._retry_tid = setInterval(this._retry.bind(this), this._retryms));
}
});
e.exports = i;
cc._RF.pop();
}, {} ],
hutui9gong: [ function(t, e) {
"use strict";
cc._RF.push(e, "aa583e+Z/RIh7C7C0lfoVPK", "hutui9gong");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
this.node.active = i.openhutui();
},
onclick: function() {
i.hutui9gong();
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
hutuibanner: [ function(t, e) {
"use strict";
cc._RF.push(e, "24010fWlqVKaplIBXyfVQDB", "hutuibanner");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
cc.Notifier.on("closehutui", this, this.close.bind(this));
try {
i.hutuibanner();
} catch (t) {
console.log(t);
}
},
close: function() {
i.closehutuibanner();
},
onDestroy: function() {
cc.Notifier.off("closehutui", this);
this.close();
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
itemcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "5041eGFZQVLFakTf9CVsr9I", "itemcfg");
cc._RF.pop();
}, {} ],
itemobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "a09f2CoDkpBYbhs6r99QSBR", "itemobj");
var i = t("gameConfig").itemConfig;
e.exports = function() {
this.init = function(t) {
this.id = t;
this.count = 1;
this.cfg = i[t];
if (!this.cfg) return !1;
this.qulity = this.cfg.qulity;
this.qulity || (this.qulity = 1);
return !0;
};
this.initwithsave = function(t) {
if (!this.init(t[0])) return !1;
this.count = t[1];
return this;
};
this.encode = function() {
return [ this.id, this.count ];
};
};
cc._RF.pop();
}, {
gameConfig: "gameConfig"
} ],
lootcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "094dfyWhCFFdp1dPEGw06w6", "lootcfg");
e.exports = {
1: {
img: "TreeNorMid4_0",
width: 25,
height: 16,
fittiles: [ 2, 3 ]
},
2: {
img: "GrassSoil4_0",
width: 10,
height: 10,
fittiles: [ 2, 3 ]
},
3: {
img: "GrassSoil5_0",
width: 10,
height: 10,
fittiles: [ 2, 3 ]
},
4: {
img: "RockBig2_0",
width: 20,
height: 16,
fittiles: [ 2, 3, 6 ]
},
5: {
img: "TreeNorMid1_0",
width: 20,
height: 16,
fittiles: [ 2, 3 ]
},
6: {
img: "TreeNorMid2_0",
width: 20,
height: 16,
fittiles: [ 2, 3 ]
},
7: {
img: "Egg1_0",
width: 10,
height: 10,
fittiles: [ 2, 3, 6 ]
}
};
cc._RF.pop();
}, {} ],
lootobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "cac93fp4BpEzLfOzhs9BBK+", "lootobj");
var i = t("lootcfg");
e.exports = function() {
this.init = function(t, e) {
this.objtype = 2;
this.uuid = t.uuid;
this.gamelogic = e;
this.lootid = t.lootid;
this.x = t.x;
this.y = t.y;
var s = i[this.lootid];
this.checkmove = s.checkmove;
this.checkhit = s.checkhit;
this.width = s.width;
this.height = s.height;
this.angle = 0;
return this;
};
this.dohurt = function() {};
};
cc._RF.pop();
}, {
lootcfg: "lootcfg"
} ],
luping: [ function(t, e) {
"use strict";
cc._RF.push(e, "bbf49ZOa8NAlJS9iDOcGr++", "luping");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {
lb_vedio: {
default: null,
type: cc.Label
},
nd_vedioing: {
default: null,
type: cc.Node
},
nd_share: {
default: null,
type: cc.Node
}
},
onLoad: function() {
cc.sys.platform != cc.sys.BYTEDANCE_GAME && (this.node.active = !1);
cc.luping = this.node;
cc.Notifier.on("videoPath", this, this.videoPath.bind(this));
cc.Notifier.on("vediosharesucess", this, this.vediosharesucess.bind(this));
cc.Notifier.on("videoPathfail", this, this.videoPathfail.bind(this));
cc.Notifier.on("vediosharefail", this, this.vediosharefail.bind(this));
},
onDestroy: function() {
cc.Notifier.off("videoPath", this);
cc.Notifier.off("vediosharesucess", this);
cc.Notifier.off("videoPathfail", this);
cc.Notifier.off("vediosharefail", this);
},
videoPath: function() {
this.nd_share.active = !0;
this.lb_vedio.string = "点击分享";
},
videoPathfail: function() {
this.waiting = !1;
this.lb_vedio.string = "点击录制";
this.nd_vedioing.active = !1;
},
vediosharesucess: function() {
this.waiting = !1;
this.lb_vedio.string = "点击录制";
this.nd_vedioing.active = !1;
this.nd_share.active = !1;
},
vediosharefail: function() {
this.waiting = !1;
this.lb_vedio.string = "点击录制";
this.nd_vedioing.active = !1;
this.nd_share.active = !1;
},
clickshare: function() {
i.vedioshare();
},
clickvedio: function() {
if (!this.waiting) if (i.islupinging()) {
this.waiting = !0;
i.stopluping();
this.lb_vedio.string = "请稍后...";
} else {
this.nd_vedioing.active = !0;
i.startluping();
this.lb_vedio.string = "停止录制";
}
},
start: function() {
this.lb_vedio.string = "点击录制";
this.nd_vedioing.active = !1;
this.nd_share.active = !1;
cc.game.addPersistRootNode(this.node);
var t = cc.winSize, e = t.width, i = t.height;
this.node.width = e;
this.node.height = i;
this.node.position = cc.v2(e / 2, i / 2);
this.node.zIndex = 99;
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
messagebox: [ function(t, e) {
"use strict";
cc._RF.push(e, "a557cgREKdDOJPkytooD4R8", "messagebox");
cc.Class({
extends: cc.Component,
properties: {
btn_ok: {
default: null,
type: cc.Node
},
btn_no: {
default: null,
type: cc.Node
},
lb_title: {
default: null,
type: cc.Label
},
lb_des: {
default: null,
type: cc.Label
}
},
onDestroy: function() {
cc.msgpb = null;
},
initdata: function(t, e, i, s) {
this.lb_title.string = t;
this.lb_des.string = e;
this.okfun = i;
this.nofun = s;
},
cbok: function() {
this.okfun && this.okfun();
this.node.destroy();
},
cbno: function() {
this.nofun && this.nofun();
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
monstercfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "c5c0bLjAFpIqpsitBZChVnV", "monstercfg");
e.exports = {
1: {
name: "黄蜂",
bp: [ 11, 28, 22, 36, 8, 15 ],
element: [ 0, 7, 3 ],
skinres: "AlienInsect1",
babygl: 50
},
2: {
name: "虎头蜂",
bp: [ 10, 32, 22, 32, 8, 16 ],
element: [ 0, 3, 7 ],
skinres: "AlienInsect4",
babygl: 50
},
3: {
name: "死亡蜂",
bp: [ 11, 34, 22, 30, 8, 15 ],
element: [ 7, 3, 0 ],
skinres: "AlienInsect2",
babygl: 50
},
4: {
name: "毒蜂",
bp: [ 14, 31, 22, 30, 9, 14 ],
element: [ 3, 7, 0 ],
skinres: "AlienInsect3",
babygl: 50
},
5: {
name: "哥布林",
bp: [ 27, 27, 20, 17, 10, 19 ],
element: [ 0, 3, 7 ],
skinres: "Goblin1",
babygl: 50
},
6: {
name: "红帽哥布林",
bp: [ 23, 30, 25, 20, 7, 15 ],
element: [ 0, 7, 3 ],
skinres: "Goblin3",
babygl: 50
},
7: {
name: "黄帽哥布林",
bp: [ 23, 30, 23, 22, 7, 15 ],
element: [ 3, 0, 7 ],
skinres: "Goblin8",
babygl: 50
},
8: {
name: "棕帽哥布林",
bp: [ 23, 30, 23, 20, 10, 14 ],
element: [ 7, 3, 0 ],
skinres: "Goblin9",
babygl: 50
},
9: {
name: "哥布林卫士",
bp: [ 31, 32, 20, 20, 7, 10 ],
element: [ 5, 5, 0 ],
skinres: "Goblin2",
babygl: 50
},
10: {
name: "寒冰翼龙",
bp: [ 30, 30, 20, 17, 17, 11 ],
element: [ 10, 0, 0 ],
skinres: "DragonBlue",
babygl: 50
},
11: {
name: "火焰翼龙",
bp: [ 30, 30, 20, 17, 18, 10 ],
element: [ 0, 10, 0 ],
skinres: "DragonRed",
babygl: 50
},
12: {
name: "闪电翼龙",
bp: [ 30, 30, 20, 17, 17, 11 ],
element: [ 0, 0, 10 ],
skinres: "DragonGold",
babygl: 50
},
13: {
name: "僵尸",
bp: [ 37, 32, 15, 12, 12, 13 ],
element: [ 0, 4, 6 ],
skinres: "Zombie2",
babygl: 50
},
14: {
name: "丧尸",
bp: [ 35, 34, 15, 15, 14, 12 ],
element: [ 6, 4, 0 ],
skinres: "Zombie1",
babygl: 50
},
15: {
name: "食尸鬼",
bp: [ 32, 32, 17, 9, 17, 13 ],
element: [ 0, 6, 4 ],
skinres: "Zombie3",
babygl: 50
},
16: {
name: "腐尸",
bp: [ 42, 37, 15, 7, 7, 12 ],
element: [ 4, 0, 6 ],
skinres: "Zombie4",
babygl: 50
},
17: {
name: "木乃伊",
bp: [ 39, 32, 15, 8, 17, 10 ],
element: [ 0, 5, 5 ],
skinres: "Mummy2",
babygl: 50
},
18: {
name: "红龙人",
bp: [ 40, 37, 20, 12, 7, 10 ],
element: [ 0, 8, 2 ],
skinres: "Angel17",
babygl: 50
},
19: {
name: "蓝龙人",
bp: [ 39, 38, 20, 11, 8, 10 ],
element: [ 8, 2, 0 ],
skinres: "DragonS3",
babygl: 50
},
20: {
name: "绿龙人",
bp: [ 38, 37, 20, 12, 9, 10 ],
element: [ 2, 0, 8 ],
skinres: "DragonS1",
babygl: 50
},
21: {
name: "龙战士",
bp: [ 21, 36, 20, 30, 9, 10 ],
element: [ 0, 6, 4 ],
skinres: "DragonWarrior1",
babygl: 50
},
22: {
name: "龙斗士",
bp: [ 20, 38, 19, 30, 9, 10 ],
element: [ 6, 4, 0 ],
skinres: "DragonWarrior2",
babygl: 50
},
23: {
name: "龙武士",
bp: [ 20, 37, 20, 30, 9, 10 ],
element: [ 0, 4, 6 ],
skinres: "DragonWarrior3",
babygl: 50
},
24: {
name: "龙拳师",
bp: [ 20, 36, 20, 30, 9, 9 ],
element: [ 4, 0, 6 ],
skinres: "DragonWarrior4",
babygl: 50
},
25: {
name: "魅惑魔女",
bp: [ 15, 12, 30, 20, 32, 10 ],
element: [ 4, 0, 6 ],
skinres: "DemonGirl2",
babygl: 50,
skills: [ 116 ],
petskills: [ 1 ],
aiid: 4
},
26: {
name: "欲望魔女",
bp: [ 18, 12, 30, 20, 32, 13 ],
element: [ 6, 0, 4 ],
skinres: "DemonGirl3",
babygl: 50,
skills: [ 117 ],
petskills: [ 1 ],
aiid: 4
},
27: {
name: "扭曲魔女",
bp: [ 18, 12, 30, 20, 32, 12 ],
element: [ 0, 6, 4 ],
skinres: "DemonGirl4",
babygl: 50,
skills: [ 116 ],
petskills: [ 1 ],
aiid: 4
},
28: {
name: "叛逆魔女",
bp: [ 18, 12, 30, 20, 32, 11 ],
element: [ 4, 6, 0 ],
skinres: "DemonGirl5",
babygl: 50,
skills: [ 118 ],
petskills: [ 1 ],
aiid: 4
},
29: {
name: "死亡魔女",
bp: [ 18, 33, 20, 30, 12, 12 ],
element: [ 6, 4, 0 ],
skinres: "DemonGirl6",
babygl: 50,
skills: [ 1, 201 ]
},
30: {
name: "杀戮魔女",
bp: [ 17, 32, 20, 30, 12, 13 ],
element: [ 4, 0, 6 ],
skinres: "DemonGirl9",
babygl: 50,
skills: [ 1, 201 ]
},
32: {
name: "妖花",
bp: [ 25, 12, 30, 20, 22, 15 ],
element: [ 2, 0, 8 ],
skinres: "Plant1",
babygl: 50,
skills: [ 1, 202 ]
},
33: {
name: "曼陀罗",
bp: [ 25, 12, 30, 20, 22, 14 ],
element: [ 0, 8, 2 ],
skinres: "Plant2",
babygl: 50,
skills: [ 1, 202 ]
},
34: {
name: "人魔花",
bp: [ 25, 12, 30, 20, 22, 15 ],
element: [ 8, 2, 0 ],
skinres: "Plant3",
babygl: 50,
skills: [ 1, 202 ]
},
35: {
name: "石像怪",
bp: [ 15, 25, 27, 20, 22, 17 ],
element: [ 4, 0, 6 ],
skinres: "Gargoyle1",
babygl: 50,
skills: [ 1, 201 ]
},
36: {
name: "血魔",
bp: [ 15, 25, 27, 20, 22, 18 ],
element: [ 0, 6, 4 ],
skinres: "Gargoyle2",
babygl: 50,
skills: [ 1, 203 ]
},
37: {
name: "石像鬼",
bp: [ 15, 25, 27, 20, 22, 13 ],
element: [ 6, 0, 4 ],
skinres: "Gargoyle3",
babygl: 50,
skills: [ 1, 202 ]
},
39: {
name: "鬼女",
bp: [ 15, 15, 25, 18, 30, 24 ],
element: [ 0, 6, 4 ],
skinres: "OniGirl2",
babygl: 50
},
40: {
name: "幽鬼",
bp: [ 15, 15, 25, 18, 30, 21 ],
element: [ 4, 0, 6 ],
skinres: "OniGirl2",
babygl: 50
},
42: {
name: "老鬼",
bp: [ 15, 35, 27, 20, 12, 21 ],
element: [ 6, 0, 4 ],
skinres: "OniMan2",
babygl: 50
},
43: {
name: "红鬼",
bp: [ 15, 35, 27, 20, 12, 21 ],
element: [ 4, 0, 6 ],
skinres: "OniMan3",
babygl: 50
},
45: {
name: "兽人王",
bp: [ 35, 35, 23, 20, 12, 22 ],
element: [ 4, 0, 6 ],
skinres: "OrcKing",
babygl: 50
},
46: {
name: "兽人祭祀",
bp: [ 25, 12, 17, 20, 35, 16 ],
element: [ 6, 0, 4 ],
skinres: "OrcOracle",
babygl: 50,
skills: [ 118, 129 ],
petskills: [ 1 ],
aiid: 4
},
47: {
name: "兽人战士",
bp: [ 25, 35, 17, 20, 12, 17 ],
element: [ 4, 0, 6 ],
skinres: "OrcWarrior",
babygl: 50,
aiid: 1
},
48: {
name: "兽人工人",
bp: [ 35, 25, 17, 20, 12, 18 ],
element: [ 4, 0, 6 ],
skinres: "OrcWorker",
babygl: 50
},
49: {
name: "地狱骷髅",
bp: [ 15, 35, 27, 20, 12, 19 ],
element: [ 0, 6, 4 ],
skinres: "SkeletonHell1",
babygl: 50
},
50: {
name: "火焰骷髅",
bp: [ 15, 35, 27, 20, 12, 21 ],
element: [ 0, 10, 0 ],
skinres: "SkeletonHell2",
babygl: 50
},
51: {
name: "海盗骷髅a",
bp: [ 15, 25, 27, 20, 22, 17 ],
element: [ 4, 0, 6 ],
skinres: "SkeletonPirate1",
babygl: 50,
aiid: 1
},
52: {
name: "海盗骷髅b",
bp: [ 15, 25, 27, 20, 22, 14 ],
element: [ 6, 0, 4 ],
skinres: "SkeletonPirate1",
babygl: 50,
aiid: 1
},
53: {
name: "海盗骷髅c",
bp: [ 15, 25, 27, 20, 22, 13 ],
element: [ 6, 4, 0 ],
skinres: "SkeletonPirate1",
babygl: 50
},
54: {
name: "海盗骷髅王",
bp: [ 18, 28, 30, 22, 22, 17 ],
element: [ 6, 4, 0 ],
skinres: "SkeletonPirate1",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 202, 203 ],
petskills: [ 7 ]
},
55: {
name: "骷髅君王",
bp: [ 20, 35, 30, 20, 12, 22 ],
element: [ 0, 6, 4 ],
skinres: "SkeletonKing1",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 202, 203 ],
petskills: [ 7 ]
},
56: {
name: "骷髅战士",
bp: [ 25, 27, 20, 17, 17, 15 ],
element: [ 0, 6, 4 ],
skinres: "SkeletonWarrior1",
babygl: 50,
aiid: 1
},
57: {
name: "骷髅勇士",
bp: [ 25, 27, 20, 18, 17, 13 ],
element: [ 6, 0, 4 ],
skinres: "SkeletonWarrior2",
babygl: 50,
aiid: 1
},
58: {
name: "武装骷髅",
bp: [ 25, 27, 20, 17, 17, 15 ],
element: [ 6, 0, 4 ],
skinres: "SkeletonWarrior3",
babygl: 50
},
31: {
name: "青蛙先知",
bp: [ 25, 17, 20, 22, 27, 15 ],
element: [ 8, 0, 2 ],
skinres: "WaterMonsterWizard1",
babygl: 50,
skills: [ 117, 128 ],
petskills: [ 1 ],
aiid: 4
},
59: {
name: "蜥蜴战士",
bp: [ 25, 27, 20, 19, 17, 15 ],
element: [ 6, 4, 0 ],
skinres: "WaterMonster1",
skills: [ 7, 201 ],
petskills: [ 7 ],
babygl: 50,
aiid: 1
},
60: {
name: "青蛙战士",
bp: [ 25, 27, 20, 22, 17, 18 ],
element: [ 6, 0, 4 ],
skinres: "WaterMonster2",
babygl: 50,
skills: [ 7, 202 ],
aiid: 1
},
61: {
name: "水鬼",
bp: [ 25, 27, 20, 22, 17, 15 ],
element: [ 8, 0, 2 ],
skinres: "WaterMonster3",
babygl: 50,
skills: [ 7, 203 ],
aiid: 1
},
62: {
name: "章鱼",
bp: [ 28, 27, 20, 22, 14, 14 ],
element: [ 6, 0, 4 ],
skinres: "WaterMonster4",
babygl: 50,
skills: [ 7, 201 ],
aiid: 1
},
63: {
name: "鱿鱼先知",
bp: [ 25, 17, 20, 12, 27, 11 ],
element: [ 6, 0, 4 ],
skinres: "WaterMonsterWizard2",
babygl: 50,
skills: [ 117, 128 ],
petskills: [ 1 ],
aiid: 4
},
64: {
name: "苍蓝狼王",
bp: [ 25, 27, 20, 32, 19, 17 ],
element: [ 5, 0, 5 ],
skinres: "WolfBoss1",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 202, 203 ]
},
65: {
name: "漆黑狼王",
bp: [ 25, 37, 20, 22, 17, 19 ],
element: [ 0, 5, 5 ],
skinres: "WolfBoss2",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 202, 203 ]
},
66: {
name: "狼人勇士",
bp: [ 25, 29, 20, 17, 17, 15 ],
element: [ 0, 5, 5 ],
skinres: "Wolfman1",
babygl: 50,
aiid: 1
},
67: {
name: "狼人战士",
bp: [ 25, 27, 21, 17, 17, 15 ],
element: [ 5, 0, 5 ],
skinres: "Wolfman2",
babygl: 50,
aiid: 1
},
68: {
name: "色欲",
bp: [ 15, 17, 20, 22, 37, 17 ],
element: [ 5, 5, 0 ],
skinres: "VampireGirl4",
babygl: 50,
aiid: 3,
skills: [ 117, 128 ],
petskills: [ 1 ]
},
69: {
name: "暴食",
bp: [ 25, 27, 20, 22, 17, 19 ],
element: [ 5, 0, 5 ],
skinres: "VampireBoy1",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
70: {
name: "贪婪",
bp: [ 25, 27, 20, 22, 17, 17 ],
element: [ 0, 5, 5 ],
skinres: "VampireGirl3",
babygl: 50,
aiid: 1,
skills: [ 7, 202 ]
},
71: {
name: "懒惰",
bp: [ 25, 27, 20, 22, 17, 15 ],
element: [ 5, 5, 0 ],
skinres: "VampireBoy3",
babygl: 50,
aiid: 1,
skills: [ 7, 203 ]
},
72: {
name: "愤怒",
bp: [ 15, 17, 20, 22, 37, 17 ],
element: [ 0, 5, 5 ],
skinres: "VampireGirl1",
babygl: 50,
aiid: 3,
skills: [ 116, 127 ],
petskills: [ 1 ]
},
73: {
name: "嫉妒",
bp: [ 15, 17, 20, 22, 37, 17 ],
element: [ 5, 0, 5 ],
skinres: "VampireGirl2",
babygl: 50,
aiid: 3,
skills: [ 118, 129 ],
petskills: [ 1 ]
},
74: {
name: "傲慢",
bp: [ 25, 27, 20, 22, 17, 16 ],
element: [ 5, 5, 0 ],
skinres: "VampireGirl5",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 202 ]
},
75: {
name: "漆黑泰坦",
bp: [ 35, 27, 20, 12, 17, 15 ],
element: [ 5, 5, 0 ],
skinres: "RobotMid4",
babygl: 50,
aiid: 1,
skills: [ 1, 201, 201 ],
petskills: [ 1 ]
},
76: {
name: "血色泰坦",
bp: [ 35, 27, 20, 12, 17, 18 ],
element: [ 2, 8, 0 ],
skinres: "RobotMid5",
babygl: 50,
aiid: 1,
skills: [ 1, 201, 201 ],
petskills: [ 1 ]
},
77: {
name: "雪原泰坦",
bp: [ 35, 27, 20, 12, 17, 17 ],
element: [ 8, 0, 2 ],
skinres: "RobotMid6",
babygl: 50,
aiid: 1,
skills: [ 1, 201, 201 ],
petskills: [ 1 ]
},
78: {
name: "雷霆泰坦",
bp: [ 35, 27, 20, 12, 17, 18 ],
element: [ 0, 2, 8 ],
skinres: "RobotMid7",
babygl: 50,
aiid: 1,
skills: [ 1, 201, 201 ],
petskills: [ 1 ]
},
82: {
name: "牛头战士",
bp: [ 25, 37, 20, 12, 17, 15 ],
element: [ 2, 0, 8 ],
skinres: "Minotaur2",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
83: {
name: "牛头勇士",
bp: [ 25, 37, 20, 12, 17, 17 ],
element: [ 6, 4, 0 ],
skinres: "Minotaur3",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
84: {
name: "赤龙王",
bp: [ 20, 17, 20, 18, 32, 18 ],
element: [ 0, 8, 2 ],
skinres: "MonsterSoilder1",
babygl: 50,
aiid: 3,
skills: [ 116, 127 ],
petskills: [ 1 ]
},
85: {
name: "三头犬",
bp: [ 22, 17, 20, 19, 30, 19 ],
element: [ 0, 10, 0 ],
skinres: "MonsterSoilder2",
babygl: 50,
aiid: 3,
skills: [ 116, 127 ],
petskills: [ 1 ]
},
86: {
name: "鬼面蜘蛛",
bp: [ 25, 17, 20, 21, 27, 18 ],
element: [ 0, 0, 10 ],
skinres: "MonsterSoilder3",
babygl: 50,
aiid: 3,
skills: [ 118, 129 ],
petskills: [ 1 ]
},
87: {
name: "兽母",
bp: [ 25, 27, 20, 12, 27, 20 ],
element: [ 0, 8, 2 ],
skinres: "MummyKing1",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
88: {
name: "鹰眼",
bp: [ 25, 27, 20, 12, 17, 30 ],
element: [ 8, 2, 0 ],
skinres: "Eagleman8",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
94: {
name: "伊布",
bp: [ 25, 27, 20, 12, 17, 23 ],
element: [ 5, 5, 0 ],
skinres: "FantasyF5",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
98: {
name: "鬼灵",
bp: [ 25, 27, 20, 12, 17, 13 ],
element: [ 0, 2, 8 ],
skinres: "Ghost1",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
99: {
name: "幽灵",
bp: [ 25, 27, 20, 12, 17, 17 ],
element: [ 8, 2, 0 ],
skinres: "Ghost2",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
100: {
name: "亡灵",
bp: [ 15, 17, 20, 12, 37, 15 ],
element: [ 3, 7, 0 ],
skinres: "Ghost3",
babygl: 50,
aiid: 3,
skills: [ 118, 129 ],
petskills: [ 1 ]
},
103: {
name: "蘑菇怪",
bp: [ 25, 27, 20, 12, 17, 18 ],
element: [ 0, 7, 3 ],
skinres: "Mushroom1",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
104: {
name: "制空机器人1型",
bp: [ 25, 17, 20, 21, 27, 13 ],
element: [ 0, 2, 8 ],
skinres: "RobotAirM1",
babygl: 50,
aiid: 3,
skills: [ 116, 127 ],
petskills: [ 1 ]
},
105: {
name: "制空机器人2型",
bp: [ 25, 17, 20, 23, 27, 15 ],
element: [ 0, 2, 8 ],
skinres: "RobotAirM2",
babygl: 50,
aiid: 3,
skills: [ 118, 129 ],
petskills: [ 1 ]
},
106: {
name: "制空机器人3型",
bp: [ 25, 17, 20, 22, 27, 13 ],
element: [ 0, 8, 2 ],
skinres: "RobotAirM3",
babygl: 50,
aiid: 3,
skills: [ 117, 128 ],
petskills: [ 1 ]
},
107: {
name: "制空0079",
bp: [ 25, 17, 20, 24, 37, 14 ],
element: [ 8, 2, 0 ],
skinres: "RobotAirBoss1",
babygl: 50,
aiid: 3,
skills: [ 116, 117, 118 ],
petskills: [ 1 ]
},
108: {
name: "强袭001",
bp: [ 25, 27, 20, 22, 17, 13 ],
element: [ 2, 8, 0 ],
skinres: "RobotBoss1",
babygl: 50,
aiid: 1,
skills: [ 1, 201 ]
},
109: {
name: "强袭002",
bp: [ 25, 27, 20, 21, 17, 15 ],
element: [ 4, 6, 0 ],
skinres: "RobotBoss2",
babygl: 50,
aiid: 1,
skills: [ 1, 201 ]
},
110: {
name: "强袭003",
bp: [ 25, 27, 20, 23, 17, 17 ],
element: [ 0, 4, 6 ],
skinres: "RobotBoss3",
babygl: 50,
aiid: 1,
skills: [ 1, 201 ]
},
112: {
name: "机械坦克1型",
bp: [ 40, 27, 20, 24, 17, 14 ],
element: [ 3, 0, 7 ],
skinres: "RobotMid1",
babygl: 50,
aiid: 3,
skills: [ 116, 127 ],
petskills: [ 1 ]
},
113: {
name: "机械坦克2型",
bp: [ 40, 27, 20, 24, 17, 15 ],
element: [ 0, 3, 7 ],
skinres: "RobotMid2",
babygl: 50,
aiid: 3,
skills: [ 118, 129 ],
petskills: [ 1 ]
},
114: {
name: "机械坦克3型",
bp: [ 40, 27, 20, 23, 17, 16 ],
element: [ 0, 7, 3 ],
skinres: "RobotMid3",
babygl: 50,
aiid: 3,
skills: [ 117, 128 ],
petskills: [ 1 ]
},
115: {
name: "机械骷髅",
bp: [ 30, 27, 20, 21, 17, 16 ],
element: [ 7, 3, 0 ],
skinres: "RobotSoilder4",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
116: {
name: "终结者",
bp: [ 25, 27, 20, 22, 17, 17 ],
element: [ 7, 0, 3 ],
skinres: "RobotSoilder5",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
117: {
name: "蓝色史莱姆",
bp: [ 25, 27, 20, 21, 15, 12 ],
element: [ 8, 2, 0 ],
skinres: "Slime1",
babygl: 50
},
118: {
name: "绿色史莱姆",
bp: [ 25, 27, 20, 19, 18, 13 ],
element: [ 5, 5, 0 ],
skinres: "Slime2",
babygl: 50
},
119: {
name: "紫色史莱姆",
bp: [ 25, 27, 20, 20, 17, 12 ],
element: [ 0, 5, 5 ],
skinres: "newrole1",
babygl: 50
},
120: {
name: "死亡骑士",
bp: [ 25, 27, 20, 21, 17, 15 ],
element: [ 0, 2, 8 ],
skinres: "UndeadKnight2",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
121: {
name: "死亡佣兵",
bp: [ 25, 27, 20, 23, 17, 17 ],
element: [ 0, 8, 2 ],
skinres: "UndeadSwordman1",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
122: {
name: "死亡士兵",
bp: [ 25, 27, 20, 21, 17, 14 ],
element: [ 8, 2, 0 ],
skinres: "UndeadSwordman2",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
123: {
name: "亡灵巫师",
bp: [ 25, 17, 20, 22, 34, 15 ],
element: [ 2, 8, 0 ],
skinres: "UndeadWizard1",
babygl: 50,
aiid: 3,
skills: [ 116, 127 ],
petskills: [ 1 ]
},
124: {
name: "亡灵法师",
bp: [ 25, 17, 20, 23, 33, 16 ],
element: [ 0, 4, 6 ],
skinres: "UndeadWizard2",
babygl: 50,
aiid: 3,
skills: [ 118, 129 ],
petskills: [ 1 ]
},
125: {
name: "亡灵学者",
bp: [ 25, 27, 20, 21, 17, 14 ],
element: [ 0, 6, 4 ],
skinres: "WaterMonster5",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
126: {
name: "异形",
bp: [ 25, 27, 20, 21, 17, 18 ],
element: [ 0, 8, 2 ],
skinres: "Alien4",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
127: {
name: "外星战士",
bp: [ 25, 27, 20, 22, 17, 17 ],
element: [ 8, 0, 2 ],
skinres: "Alien1",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
138: {
name: "恶魔骑士",
bp: [ 25, 37, 20, 17, 17, 20 ],
element: [ 8, 0, 2 ],
skinres: "DemonKnight1",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
128: {
name: "外星勇士",
bp: [ 25, 27, 20, 23, 17, 15 ],
element: [ 0, 2, 8 ],
skinres: "Alien2",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
129: {
name: "外形工程师",
bp: [ 25, 27, 20, 21, 17, 15 ],
element: [ 0, 5, 5 ],
skinres: "AlienEngineer1",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
130: {
name: "机械士兵1型",
bp: [ 25, 27, 20, 22, 17, 15 ],
element: [ 5, 5, 0 ],
skinres: "RobotSoilder1",
babygl: 50,
aiid: 3,
skills: [ 117, 128 ],
petskills: [ 1 ]
},
131: {
name: "机械士兵2型",
bp: [ 25, 27, 20, 22, 17, 13 ],
element: [ 0, 2, 8 ],
skinres: "RobotSoilder2",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
132: {
name: "机械士兵3型",
bp: [ 25, 27, 20, 22, 17, 14 ],
element: [ 0, 2, 8 ],
skinres: "RobotSoilder3",
babygl: 50,
aiid: 1,
skills: [ 7, 117, 201, 201 ],
petskills: [ 1 ]
},
133: {
name: "死神贵族",
bp: [ 25, 27, 30, 32, 15, 22 ],
element: [ 8, 2, 0 ],
skinres: "UndeadKing1",
babygl: 50,
skills: [ 7, 123, 201, 201, 201, 203 ],
petskills: [ 7 ],
aiid: 11,
movespeed: 80,
talent: [ 1043 ],
color: 20,
drop: [ [ 10117, 5 ] ],
dropsy: [ [ 20521, 3 ] ]
},
139: {
name: "鬼族公主",
bp: [ 21, 12, 35, 10, 45, 20 ],
element: [ 2, 8, 0 ],
skinres: "DemonGirl7",
babygl: 50,
aiid: 10,
talent: [ 1042 ],
skills: [ 106, 115 ],
petskills: [ 1 ],
drop: [ [ 10219, 5 ] ]
},
142: {
name: "爱丽丝",
bp: [ 27, 15, 25, 17, 47, 25 ],
element: [ 6, 0, 4 ],
skinres: "RobotInquisitor",
babygl: 50,
talent: [ 1042 ],
skills: [ 111, 35, 112 ],
petskills: [ 1 ],
aiid: 10,
drop: [ [ 10215, 5 ] ],
dropsy: [ [ 10217, 3 ] ]
},
134: {
name: "天狗",
bp: [ 25, 27, 20, 22, 27, 30 ],
element: [ 0, 8, 2 ],
skinres: "newrole2",
babygl: 50
},
155: {
name: "牛头王",
bp: [ 35, 27, 20, 25, 17, 20 ],
element: [ 0, 2, 8 ],
skinres: "Minotaur1",
babygl: 50,
skills: [ 7, 119, 122 ],
petskills: [ 7 ],
aiid: 11,
movespeed: 80,
drop: [ [ 10013, 5 ] ],
dropsy: [ [ 20522, 3 ] ]
},
156: {
name: "蝴蝶女王",
bp: [ 18, 17, 20, 25, 35, 20 ],
element: [ 0, 8, 2 ],
skinres: "newhero45",
babygl: 50,
talent: [ 1042 ],
skills: [ 106, 103 ],
petskills: [ 1 ],
aiid: 10,
color: 20,
drop: [ [ 10216, 5 ] ]
},
157: {
name: "鬼女将",
bp: [ 25, 35, 27, 23, 12, 23 ],
element: [ 6, 0, 4 ],
skinres: "OniGirl1",
babygl: 50,
skills: [ 7, 119, 120 ],
petskills: [ 7 ],
aiid: 11,
movespeed: 80,
drop: [ [ 10115, 5 ] ]
},
158: {
name: "鬼将军",
bp: [ 28, 35, 27, 20, 12, 23 ],
element: [ 0, 6, 4 ],
skinres: "OniMan1",
babygl: 50,
skills: [ 7, 119, 120, 121 ],
petskills: [ 7 ],
aiid: 11,
movespeed: 80,
drop: [ [ 10012, 5 ] ],
dropsy: [ [ 10114, 3 ] ]
},
201: {
name: "小恶魔",
bp: [ 25, 27, 20, 22, 17, 15 ],
element: [ 5, 5, 0 ],
skinres: "newhero54",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
202: {
name: "小鱼人",
bp: [ 25, 27, 20, 22, 17, 13 ],
element: [ 0, 2, 8 ],
skinres: "newhero58",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
203: {
name: "原初恶魔",
bp: [ 30, 30, 20, 25, 17, 20 ],
element: [ 0, 4, 6 ],
skinres: "DemonBoss2",
aiid: 1,
skills: [ 7, 201, 201 ]
},
204: {
name: "生化甲虫",
bp: [ 25, 27, 30, 22, 17, 15 ],
element: [ 5, 5, 0 ],
skinres: "newhero111",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
205: {
name: "亡灵旅者",
bp: [ 35, 27, 20, 22, 17, 13 ],
element: [ 0, 2, 8 ],
skinres: "newhero117",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
206: {
name: "吞噬者",
bp: [ 45, 27, 20, 12, 17, 24 ],
element: [ 0, 2, 8 ],
skinres: "newrole5",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
207: {
name: "狮人",
bp: [ 30, 32, 20, 21, 7, 25 ],
element: [ 0, 7, 3 ],
skinres: "LionMan1",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
208: {
name: "熊人",
bp: [ 45, 27, 20, 19, 10, 17 ],
element: [ 7, 3, 0 ],
skinres: "LionMan2",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 201 ]
},
209: {
name: "黄金狮王",
bp: [ 25, 37, 27, 32, 10, 23 ],
element: [ 0, 2, 8 ],
skinres: "newrole4",
babygl: 50,
skills: [ 7, 123, 201, 201, 201, 203, 120 ],
petskills: [ 7 ],
aiid: 11,
movespeed: 80,
talent: [ 1043 ],
drop: [ [ 10014, 5 ] ],
dropsy: [ [ 10022, 3 ] ]
},
210: {
name: "吸血鬼伯爵",
bp: [ 25, 27, 20, 22, 17, 19 ],
element: [ 5, 0, 5 ],
skinres: "VampireBoy2",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
211: {
name: "德古拉",
bp: [ 22, 12, 20, 22, 37, 23 ],
element: [ 4, 6, 0 ],
skinres: "VampireKing1",
babygl: 50,
aiid: 3,
skills: [ 116, 127 ],
petskills: [ 1 ]
},
212: {
name: "真德古拉",
bp: [ 30, 10, 30, 20, 50, 20 ],
element: [ 4, 6, 0 ],
skinres: "VampireKing2",
babygl: 50,
aiid: 3,
skills: [ 116, 127, 128, 129 ],
talent: [ 1042, 1043 ],
petskills: [ 1 ]
},
213: {
name: "暗影",
bp: [ 25, 27, 20, 22, 17, 19 ],
element: [ 5, 0, 5 ],
skinres: "newhero192",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
214: {
name: "小奇美拉",
bp: [ 30, 30, 18, 28, 15, 18 ],
element: [ 4, 6, 0 ],
skinres: "newhero9",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
215: {
name: "奇美拉",
bp: [ 34, 34, 20, 30, 17, 20 ],
element: [ 6, 4, 0 ],
skinres: "DemonBoss3",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 202, 203, 201 ]
},
216: {
name: "巨人",
bp: [ 35, 32, 20, 22, 17, 19 ],
element: [ 5, 0, 5 ],
skinres: "newhero103",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
217: {
name: "棕鬼王",
bp: [ 25, 35, 27, 20, 22, 17 ],
element: [ 4, 0, 6 ],
skinres: "OniBoss1",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
218: {
name: "精英牛头人",
bp: [ 25, 27, 20, 22, 17, 19 ],
element: [ 5, 0, 5 ],
skinres: "newhero172",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
219: {
name: "蛞蝓妖",
bp: [ 30, 30, 18, 28, 15, 18 ],
element: [ 4, 6, 0 ],
skinres: "newhero173",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
220: {
name: "溶岩兽",
bp: [ 35, 37, 20, 22, 17, 21 ],
element: [ 0, 10, 0 ],
skinres: "DemonBoss4",
babygl: 50,
aiid: 1,
skills: [ 7, 201, 202, 203, 201 ]
},
221: {
name: "暗元素",
bp: [ 35, 17, 20, 23, 33, 16 ],
element: [ 0, 4, 6 ],
skinres: "newhero114",
babygl: 50,
aiid: 3,
skills: [ 118, 129 ],
petskills: [ 1 ]
},
222: {
name: "路西法",
bp: [ 25, 17, 30, 22, 39, 25 ],
element: [ 5, 5, 5 ],
skinres: "AngelBoss",
babygl: 50,
talent: [ 1042, 1043 ],
skills: [ 106, 124, 115, 125 ],
petskills: [ 1 ],
aiid: 10,
drop: [ [ 10118, 5 ] ],
dropsy: [ [ 10116, 3 ] ]
},
224: {
name: "玉藻前",
bp: [ 35, 17, 20, 23, 33, 16 ],
element: [ 0, 6, 4 ],
skinres: "newhero195",
babygl: 50,
aiid: 3,
skills: [ 118, 129 ],
petskills: [ 1 ]
},
225: {
name: "九尾狐",
bp: [ 27, 13, 35, 22, 40, 20 ],
element: [ 0, 8, 2 ],
skinres: "newrole3",
aiid: 10,
skills: [ 106, 115, 127 ],
petskills: [ 1 ],
talent: [ 1042, 1038, 1043 ],
babygl: 50
},
226: {
name: "恶魔之刃",
bp: [ 30, 30, 20, 28, 15, 18 ],
element: [ 4, 6, 0 ],
skinres: "newhero57",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
227: {
name: "寒冰魔王",
bp: [ 37, 27, 20, 12, 37, 23 ],
element: [ 10, 0, 0 ],
skinres: "IceDragonKing",
babygl: 50,
aiid: 10,
skills: [ 107, 108, 109, 110 ],
petskills: [ 1 ]
},
228: {
name: "恶魔伯爵",
bp: [ 30, 30, 20, 28, 15, 18 ],
element: [ 4, 6, 0 ],
skinres: "newhero72",
babygl: 50,
aiid: 1,
skills: [ 7, 201 ]
},
229: {
name: "闪电魔王",
bp: [ 35, 27, 20, 12, 38, 24 ],
element: [ 0, 0, 10 ],
skinres: "LightingDragonKing",
babygl: 50,
aiid: 10,
skills: [ 111, 112, 113, 114 ],
petskills: [ 1 ]
},
230: {
name: "恶魔术士",
bp: [ 27, 12, 20, 22, 37, 23 ],
element: [ 4, 6, 0 ],
skinres: "newhero191",
babygl: 50,
aiid: 3,
skills: [ 116, 127 ],
petskills: [ 1 ]
},
231: {
name: "火焰魔王",
bp: [ 35, 27, 20, 12, 37, 25 ],
element: [ 0, 10, 0 ],
skinres: "FireDragonKing",
babygl: 50,
aiid: 10,
skills: [ 103, 104, 105, 106 ],
petskills: [ 1 ]
},
232: {
name: "美杜莎",
bp: [ 25, 17, 30, 12, 45, 25 ],
element: [ 6, 4, 0 ],
skinres: "MedusaBoss",
babygl: 50,
aiid: 3,
skills: [ 116, 127 ],
petskills: [ 1 ],
talent: [ 1041 ]
},
233: {
name: "撒旦",
bp: [ 25, 7, 30, 18, 55, 25 ],
element: [ 4, 0, 6 ],
skinres: "DemonBoss1",
babygl: 50,
aiid: 10,
skills: [ 111, 112, 113, 114, 107, 108, 109, 110, 103, 104, 105, 106 ],
petskills: [ 1 ],
talent: [ 1041, 1038, 1043 ],
drop: [ [ 10011, 5 ] ],
dropsy: [ [ 10021, 3 ], [ 20610, 3 ] ]
},
300: {
name: "见习九尾狐",
bp: [ 27, 10, 25, 22, 35, 20 ],
element: [ 0, 8, 2 ],
skinres: "newrole3",
aiid: 10,
skills: [ 106, 115, 127 ],
petskills: [ 1 ],
talent: [ 1042, 1038, 1043 ],
babygl: 50
},
1e4: {
name: "撒旦",
bp: [ 100, 100, 100, 100, 55, 22 ],
element: [ 4, 0, 6 ],
skinres: "DemonBoss1",
babygl: 50,
aiid: 10,
skills: [ 111, 112, 113, 114, 107, 108, 109, 110, 103, 104, 105, 106 ],
petskills: [ 1 ],
talent: [ 1041, 1038 ],
beilv: 1e3
}
};
cc._RF.pop();
}, {} ],
moveprefab: [ function(t, e) {
"use strict";
cc._RF.push(e, "17c38jX20BOpZjyzFHMPxNC", "moveprefab");
cc.Class({
extends: cc.Component,
properties: {},
initdata: function(t) {
this.pname = t.prefab;
this.target = t;
this.node.ctrl = this;
cc.soundMgr.playSound("dragon");
},
doupdate: function() {
this.node.x = this.target.x;
this.node.y = this.target.y;
return this.target.life <= 0;
}
});
cc._RF.pop();
}, {} ],
notification: [ function(t, e) {
"use strict";
cc._RF.push(e, "27a1eZ1Zc1CbbMxVjkEG9dH", "notification");
var i = t("signals"), s = {
_signals: [],
_cachebinds: {},
_findSignal: function(t) {
var e, i;
for (e = this._signals.length; e--; ) if ((i = this._signals[e]).event === t) return i;
return null;
},
createBinding: function(t, e, s) {
var n = this._findSignal(t);
null === n && (n = this._findSignal(null));
if (null === n) {
n = new i.Signal();
this._signals.push(n);
}
if (n) {
n.event = t;
return n.add(e, s);
}
},
removeBinding: function(t) {
for (var e = t instanceof Array ? t : [ t ], i = e.length; i--; ) {
var s = e[i], n = s.getSignal();
s.detach();
n && 0 == n.getNumListeners() && (n.event = null);
}
},
on: function(t, e, i) {
var s = this._cachebinds[t];
if (!s) {
s = [];
this._cachebinds[t] = s;
}
var n = s.find(function(t) {
return t.listener == e && t.target == i;
});
if (n) return n.binding;
var a = this.createBinding(t, e, i);
n = {
listener: e,
target: i,
binding: a
};
s.push(n);
return a;
},
off: function(t, e, i) {
var s = this._cachebinds[t];
if (s) {
var n = s.findIndex(function(t) {
return t.listener == e && t.target == i;
});
if (!(n < 0)) {
var a = s[n];
this.removeBinding(a.binding);
s.splice(n, 1);
}
}
},
emit: function(t) {
var e = this._findSignal(t);
e && e.dispatch.apply(this, arguments);
}
};
e.exports = s;
cc._RF.pop();
}, {
signals: "signals"
} ],
npccfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "58239F7uStPc7VplYIt/NV7", "npccfg");
e.exports = {
1: {
name: "国王",
des: "勇者也得996! 愣着干嘛？干活去！！！",
func: [ {
k: "需要帮助",
f: 1
}, {
k: "兑换码",
f: 13
} ]
},
2: {
name: "商人",
des: "银鳞胸甲5金一件，貌似走错片场了。想批量卖装备去右边铁匠那",
func: [ {
k: "购买道具",
f: 2,
p: 1
}, {
k: "出售道具",
f: 10,
p: 1
} ]
},
3: {
name: "附魔师",
des: "传说有些怪物会掉落更稀有的附魔配方,这里没有卡拉赞，但真的有猫鼬。",
func: [ {
k: "装备附魔",
f: 3
}, {
k: "购买材料",
f: 2,
p: 2
}, {
k: "购买水晶",
f: 2,
p: 3
} ]
},
4: {
name: "铁匠",
des: "打怪练级穿装备里的装备全靠我，我不像凯丽那家伙+个5就掉链子。",
func: [ {
k: "铁匠铺",
f: 4
}, {
k: "分解装备",
f: 7
} ]
},
5: {
name: "宠物大师",
des: "我是来自假旧镇的大蠢，据说首领怪物也有概率出宝宝,甚至还有可能闪光。",
func: [ {
k: "宠物店",
f: 5
}, {
k: "捕获列表",
f: 17
} ]
},
6: {
name: "银行",
des: "这里可以保管装备，宠物，你注意到中间的宝箱是黑的吗？因为这地图是对称的。",
func: [ {
k: "存",
f: 8
}, {
k: "取",
f: 9
} ]
},
7: {
name: "小女孩",
des: "我这里可以改变您的形象，颜值即正义",
func: [ {
k: "形象修改",
f: 11
} ]
},
8: {
name: "合成大师",
des: "我这里可以合成装备，前提你得解锁配方，你问为何我看上去像个武术家？作者懒得找角色而已。",
func: [ {
k: "合成",
f: 12
} ]
},
100: {
name: "传送阵",
des: "萌新记得加点，在左上角背包旁边",
func: [ {
k: "刷怪去",
f: 6
} ]
},
101: {
condition: {
sy: 51
},
name: "传送阵？",
des: "。。。这里的怪很强,非洲乐园品质随机",
func: [ {
k: "非洲乐园",
f: 2,
p: 101
}, {
k: "刷怪去",
f: 14
}, {
k: "无尽模式",
f: 15
}, {
k: "无尽1w层",
f: 16
} ]
}
};
cc._RF.pop();
}, {} ],
npcobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "ab55aqknQRHl5Q+EaRMlAnx", "npcobj");
var i = t("Utils"), s = t("statemachine").statemachine, n = t("battlestates"), a = t("monstercfg"), o = (t("skillcfg"), 
t("gameConfig").itemConfig), c = t("buffobj"), r = t("skillobj"), l = t("gameai"), h = t("gamevaule"), p = t("enumcfg"), d = t("talentcfg"), u = p.enumproperty, f = p.enumgameflag, g = p.enumskilltype;
e.exports = function() {
this.checkhasflat = function(t) {
return this.spflag & t;
};
this.initonce = function() {
if (!this.hasinitonce) {
this.statemachine = new s();
this.statemachine.target = this;
this.statemachine.init({
statedie: new n.statedie(),
stateyinzhi: new n.stateyinzhi(),
stateidle: new n.stateidle(),
statemove: new n.statemove(),
statefollowtarget: new n.statefollowtarget(),
stateyongchang: new n.stateyongchang()
});
this.gamevaule = new h();
this.hasinitonce = !0;
}
};
this.init = function(t, e) {
this.initonce();
this.spflag = 0;
this.fying = !1;
this.deadfx = 1;
this.zhuanshen = 0;
this.fanshangkill = 0;
this.maxyctime = 1;
this.timescale = 1;
this.dmgbili = 1;
this.yctime = 0;
this.lefttime = void 0;
this.fenshentime = void 0;
this.adlife = 1;
this.allmiss = !1;
this.allmiss2 = !1;
this.skipdef = 0;
this.force = 0;
this.objtype = 1;
this.angle = 0;
this.uuid = t.uuid;
this.gamelogic = e;
this.weaponidx = 0;
this.camp = t.camp;
this.lv = t.lv;
this.clickingmoveing = !1;
this.dir = cc.v2(0, 1);
this.dir2 = cc.v2(0, 1);
this.dir3 = cc.v2(0, 1);
this.x = t.x;
this.y = t.y;
this.flagdead = !1;
this.onlywdef = !1;
this.notmovecount = 0;
this.notatkcount = 0;
this.notanicount = 0;
this.wudicount = 0;
this.baticount = 0;
this.nocd = 0;
this.dir = i.dirRotate(this.dir, i.randintSeed(360));
this.offx = 16 * this.dir.x;
this.offy = 16 * this.dir.y;
this.ai = null;
this.yingzhi = !1;
this.ispet = !1;
this.width = this.height = 32;
this.scale = 1;
this.skillarr = [];
this.userskillarr = [];
this.dmgarr = [];
this.allskills = [];
this.buffarr = [];
this.flagaddbuff = [];
this.flagremovebuff = [];
this.flagyongchang = !1;
this.weaponup = [];
this.lighting = !1;
this.isfenshen = !1;
if (t.fenshen) this.initfenshen(t.fenshen); else if (t.isplayer) {
this.initplayer();
this.addbuff(4007, 100, 1);
} else if (t.petdata) this.initpet(t.petdata); else {
this.initnpc(t);
cc.wujin && this.addbuff(10005, 100);
}
this.halfheight = this.height / 2;
this.quarterheight = this.height / 4;
this.enemycamp = this.gamelogic.getenemycamp(this);
this.refreshproprety();
this.hp = this.maxhp;
this.resetstate();
if (this.lighting) {
this.addbuff(103, 100);
2 == this.camp && cc.soundMgr.playSound("shanguang");
}
};
this.refreshproprety = function() {
this.maxhp = Math.floor(this.gamevaule.getrealvaule(u.maxhp));
this.movespeed = this.gamevaule.getrealvaule(u.movespeed);
this.atkspeed = this.gamevaule.getrealvaule(u.atkspeed);
this.flee = this.gamevaule.getrealvaule(u.flee);
this.hit = this.gamevaule.getrealvaule(u.hit);
this.cri = this.gamevaule.getrealvaule(u.cri);
this.atk = this.gamevaule.getrealvaule(u.atk);
this.matk = this.gamevaule.getrealvaule(u.matk);
this.datk = this.gamevaule.getrealvaule(u.datk);
this.vatk = this.gamevaule.getrealvaule(u.vatk);
this.def = this.gamevaule.getrealvaule(u.def);
this.mdef = this.gamevaule.getrealvaule(u.mdef);
this.singtime = this.gamevaule.singtime();
this.xixue = this.gamevaule.getrealvaule(u.xixue);
this.healdmg = (this.gamevaule.getrealvaule(u.healdmg) + 100) / 100;
this.cridmg = (this.gamevaule.getrealvaule(u.cridmg) + 150) / 100;
};
this.changeskill = function(t) {
this.skillarr = this.skillmap[t];
this.flagskillchange = !0;
};
this.equipweapons = function(t) {
this.allskills = [];
this.skillmap = [];
this.weapons = t;
for (var e = 0; e < t.length; e++) {
var i = t[e].skills;
this.skillmap[e] = [];
for (var s = 0; s < i.length; s++) {
var n = new r();
n.init(i[s][0], i[s][1], this);
this.allskills.push(n);
this.skillmap[e].push(n);
}
}
this.changeweapon(this.weaponidx);
};
this.changeweapon = function(t) {
this.weaponidx = t;
this.weaponidx > this.weapons.length - 1 && (this.weaponidx = this.weapons.length - 1);
this.nowweapon = this.weapons[this.weaponidx];
var e = o[this.nowweapon.id];
this.fixbullet = e.fixbullet;
this.wicon = e.icon;
this.changeskill(t);
this.atkskillcfg = null;
this.skillarr[0] && (this.atkskillcfg = this.skillarr[0].cfg);
this.fmatkbuf = null;
this.nowweapon.fmcfg && this.nowweapon.fmcfg.atkbuff && (this.fmatkbuf = this.nowweapon.fmcfg.atkbuff);
};
this.shuxingrefresh = function() {
this.isplayer && this.gamevaule.refreshplayerbp(this.weaponidx);
this.refreshproprety();
};
this.ckickweapon = function() {
if (!this.isdead()) {
this.weaponidx++;
this.weaponidx %= this.weapons.length;
this.changeweapon(this.weaponidx);
this.shuxingrefresh();
this.flagweaponchange = !0;
}
};
this.useskill = function(t) {
if (this.notatkcount > 0) return !1;
if (this.yingzhi) return !1;
var e = t.use(this);
e && (this.flaguseskill = t);
return e;
};
this.randskllidx = function() {
return 32 == this.skillarr[0].cfg.stype ? i.randintSeed(this.skillarr.length - 1) + 1 : i.randintSeed(this.skillarr.length);
};
this.clickskill = function(t) {
var e = this.skillarr[t];
if (!e) return !1;
if ("stateyongchang" == this.statemachine.getcurrentstatename()) {
this.yctime = 0;
this.resetstate();
}
var i = this.useskill(e);
i && this.flagskillcd && this.flagskillcd.push(t);
return i;
};
this.clickskill2 = function(t) {
var e = this.userskillarr[t];
if (e) {
if ("stateyongchang" == this.statemachine.getcurrentstatename()) {
this.yctime = 0;
this.resetstate();
}
this.useskill(e);
}
};
this.afteryongchang = function(t) {
this.flaguseskill = t;
this.isplayer && this.flagskillcd.push(t.index);
};
this.refreshuserskill = function() {
for (var t = cc.battlelogic.playerData.player.skillarr, e = 0; e < t.length; e++) if (t[e]) {
var i = new r();
i.init(t[e], 1, this);
this.allskills.push(i);
this.userskillarr.push(i);
}
this.flagchangeuserskill = !0;
};
this.setteshu = function(t, e) {
e || (e = 0);
for (var i = e; i < t.length; i++) {
var s = t[i];
if (s) {
s.talentarr2 && this.setteshu(s.talentarr2);
s.flag && (this.spflag |= s.flag);
if (s.buffs) for (var n = 0; n < s.buffs.length; n++) {
var a = s.buffs[n];
this.addbuff(a, 100, 1);
}
if (s.weaponup) {
var o = s.weaponup[0];
this.weaponup[o] || (this.weaponup[o] = 0);
this.weaponup[o] += s.weaponup[1] / 100;
}
if (s.fmcfg && s.fmcfg.weaponup) {
o = s.fmcfg.weaponup[0];
this.weaponup[o] || (this.weaponup[o] = 0);
this.weaponup[o] += s.fmcfg.weaponup[1] / 100;
}
}
}
};
this.initplayer = function() {
var t = cc.battlelogic.playerData;
this.zhuanshen = t.player.zhuanshen;
this.equipweapons(t.getweaponarr());
this.flagskillcd = [];
this.refreshuserskill();
this.isplayer = !0;
this.skin = "newhero54";
this.setteshu(t.player.talentarr);
this.setteshu(t.player.equiparr, 3);
this.setteshu(t.player.setforvaule);
this.gamevaule.initplayer(cc.battlelogic.playerData.player);
};
this.initfenshen = function(t) {
this.isplayer = !1;
this.isfenshen = !0;
var e = cc.battlelogic.playerData;
this.equipweapons(e.getweaponarr());
this.setteshu(e.player.talentarr);
this.setteshu(e.player.equiparr, 3);
this.setteshu(e.player.setforvaule);
this.fenshentime = 8;
this.ai = new l();
this.ai.init(22, this);
this.gamevaule.initplayer(cc.battlelogic.playerData.player);
this.changeweapon(t.weaponidx);
};
this.initpet = function(t) {
this.lighting = t.lighting;
this.wicon = "sword2";
this.ispet = !0;
this.cfgid = t.id;
for (var e = t.cfg, i = 0; i < t.skills.length; i++) {
var s = new r();
s.init(t.skills[i], 1, this);
this.skillarr.push(s);
this.allskills.push(s);
}
this.isboss = !1;
this.isplayer = !1;
t.isboss && (this.scale = 1.5);
this.skin = e.skinres;
if (e.width) {
this.width = e.width;
this.height = e.height;
}
this.ai = new l();
this.ai.init(22, this);
this.name = e.name;
t.isboss && (this.name = this.name + "首领");
this.setteshu(t.talentarr);
this.gamevaule.initpet(t.id, t);
};
this.initnpc = function(t) {
this.lighting = !1;
this.wicon = "sword2";
this.cfgid = t.cfgid;
for (var e = a[t.cfgid], s = 0; s < e.skills.length; s++) {
var n = new r();
n.init(e.skills[s], Math.floor(this.lv / 10) + 1, this);
this.skillarr.push(n);
this.allskills.push(n);
}
this.dropdata = e.drop;
this.dropdatasy = e.dropsy;
this.isbaby = !1;
this.isboss = t.isboss;
this.isplayer = !1;
if (e.babygl && 0 == cc.battlelogic.babycount && !cc.battlelogic.newbiemode && !cc.hell && !cc.wujin) {
var o = !0;
this.isboss && cc.stageid == cc.playerData.stage && (o = !1);
if (o && i.randintSeed(1e3) < e.babygl) {
this.isbaby = !0;
var c = 3;
cc.shanguangadd && (c *= 2);
i.randintSeed(100) < c && (this.lighting = !0);
cc.battlelogic.baby = this;
cc.battlelogic.babycount++;
cc.battlelogic.flaghasbaby = !0;
}
}
this.skin = e.skinres;
if (e.width) {
this.width = e.width;
this.height = e.height;
}
if (this.isboss) {
this.scale = 1.5;
this.width = this.width * this.scale;
this.height = this.height * this.scale;
}
this.ai = new l();
2 == this.camp ? this.ai.init(e.aiid, this) : this.ai.init(22, this);
this.name = e.name;
this.isboss && (this.name = this.name + "首领");
if (e.talent) {
var h = [];
for (s = 0; s < e.talent.length; s++) {
var p = d[e.talent[s]];
h.push(p);
}
this.setteshu(h);
}
this.gamevaule.initmonster(e, this.lv, this.isboss);
};
this.update = function(t) {
if (this.flagdead2) {
this.dodeadnojiangli();
this.flagdead2 = void 0;
}
if (this.flagbuzhuo2) {
this.flagbuzhuo = !0;
this.dodeadnojiangli();
this.flagbuzhuo2 = void 0;
cc.playerData.catchpet(this.cfgid, this.isboss, this.lighting);
}
var e = !1;
if (this.fenshentime) {
this.fenshentime -= t;
if (this.fenshentime <= 0) {
this.hp = 0;
this.deadtype = 0;
for (var i = this.buffarr.length - 1; i >= 0; i--) this.buffarr[i].life = 0;
this.lefttime = 1;
this.changestate("statedie", !1);
}
}
if (this.lefttime) {
this.lefttime -= t;
this.lefttime <= 0 && (e = !0);
}
this.ai && this.ai.update(t);
for (i = this.allskills.length - 1; i >= 0; i--) this.allskills[i].update(t);
for (i = this.buffarr.length - 1; i >= 0; i--) if (this.buffarr[i] && this.buffarr[i].update(t)) {
this.flagremovebuff.push(this.buffarr[i].bid);
this.buffarr.splice(i, 1);
}
this.statemachine.update(t);
if (this.force > 0) {
this.force -= t;
0 == this.baticount && this.realmove(t, this.dir2, 300);
}
if (this.xiyin > 0) {
this.xiyin -= t;
0 == this.baticount && this.realmove(t, this.dir3, 100);
}
return e;
};
this.realmove = function(t, e, i, s) {
s || (t *= this.timescale);
i || (i = this.movespeed);
this.x, this.y;
var n = i * t, a = this.x + e.x * n, o = this.y + e.y * n, c = (this.gamelogic.inviewloots, 
this.quarterheight, this.width, this.halfheight, a), r = o - this.gamelogic.mappixisizeh / 2 - 16, l = Math.floor(c / 64 - r / 32), h = Math.floor(c / 64 + r / 32), p = this.gamelogic.mapsize - 1;
if (l >= 0 && l <= p && h >= 0 && h <= p) {
this.x = a;
this.y = o;
}
};
this.domove = function(t) {
this.notmovecount > 0 || this.realmove(t, this.dir);
};
this.changestate = function(t, e, i) {
this.statemachine.switchToState(t, e, i);
};
this.resetstate = function() {
this.clickingmoveing ? this.changestate("statemove") : this.changestate("stateidle");
};
this.movebegin = function() {
this.clickingmoveing = !0;
};
this.moveend = function() {
this.clickingmoveing = !1;
};
this.setmovedir = function(t, e) {
this.dir.x = t;
this.dir.y = e;
this.dir.normalizeSelf();
};
this.isdead = function() {
return this.flagdead;
};
this.heal = function(t) {
if (!this.isdead()) {
t = Math.max(1, Math.floor(t));
this.hp += t;
this.hp > this.maxhp && (this.hp = this.maxhp);
this.dmgarr.push({
v: -t,
cri: !1,
miss: !1
});
}
};
this.kouxue = function(t) {
if (!this.isdead()) {
t = Math.floor(t);
this.wudicount > 0 && (t = 0);
this.hp -= t;
this.hp <= 0 && this.dodead();
this.dmgarr.push({
v: t,
cri: !1,
miss: !1
});
}
};
this.dohurt = function(t, e, s) {
if (null == e.fixdmg) {
var n = 1;
if (t.lv < this.lv) {
n = Math.max(10, 100 - 2 * (this.lv - t.lv)) / 100;
(cc.shenyuan || cc.hell) && 2 == t.camp && (n = 1);
}
cc.wujin && (n = 1);
var a = t.hit * n - this.flee;
this.allmiss2 || (a = Math.max(1, a));
var o = !1;
a >= i.randintSeed(100) && (o = !0);
var c = "miss", r = !1;
this.checkhasflat(f.notbecri) || (r = this.gamevaule.cridule(t.gamevaule, this.gamevaule));
r && (o = !0);
e.cfg.hurtres && cc.battlelogic.createeff({
eff: e.cfg.hurtres,
x: this.x,
y: this.y,
fx: t.x > this.x ? 1 : -1
});
e.cfg.selfres && cc.battlelogic.createeff({
eff: e.cfg.selfres,
x: t.x,
y: t.y,
fx: t.x > this.x ? 1 : -1
});
if (!this.allmiss) {
var l = e.cfg.fixhit;
(cc.shenyuan || cc.hell || cc.wujin) && 3 == e.cfg.atktype && (l = !0);
l && (o = !0);
}
if (o) {
t.fmatkbuf && t.addbuff(t.fmatkbuf[1], t.fmatkbuf[0], 1);
this.chouren = t;
if (e.cfg.force) {
this.force = e.cfg.force;
this.dir2.x = this.x - s.x;
this.dir2.y = this.y - s.y;
this.dir2.normalizeSelf();
}
if (e.cfg.xiyin) {
this.xiyin = e.cfg.xiyin;
this.dir3.x = s.x - this.x;
this.dir3.y = s.y - this.y;
this.dir3.normalizeSelf();
}
var h = 0, p = 0;
if (10 == e.atktype) {
for (var d = e.cfg.atk.length - 1; d >= 0; d--) {
var u = e.cfg.atk[d];
h += t[u[0]] * u[1];
}
for (d = e.cfg.def.length - 1; d >= 0; d--) {
var y = e.cfg.def[d];
p += this[y[0]] * y[1];
}
c = h - p;
} else {
if (3 == e.atktype) {
h = t.matk;
p = this.mdef;
this.onlywdef && (p = this.def);
} else {
h = t.atk;
p = this.def;
}
t.skipdef > 0 && (p = 0);
c = Math.pow(h, 2) / (h + 5 * p);
}
c *= n;
var m = 0, b = [], v = [];
for (d = t.buffarr.length - 1; d >= 0; d--) if (t.buffarr[d]) {
var k = t.buffarr[d].doatk(e, b, this, r);
m += k.buffdmgup;
0 != k.addbuff && v.push(k.addbuff);
}
for (d = 0; d < v.length; d++) t.addbuff(v[d], 100, 1);
m += t.gamevaule.calshuxing(t.gamevaule, this.gamevaule, e.cfg.stype);
var _ = t.weaponup[e.cfg.stype];
_ && (m += _);
0 != (e.cfg.stype & g.pyh) ? (_ = t.weaponup[g.pyh]) && (m += _) : 0 != (e.cfg.stype & g.mag) && (_ = t.weaponup[g.mag]) && (m += _);
(_ = t.weaponup[g.alldmg]) && (m += _);
e.cfg.wdmg && (c *= e.cfg.wdmg);
c *= m;
r && (c *= t.cridmg);
c = Math.max(Math.floor(c), 1);
var w = e.cfg.xixue || 0;
t.xixue && (w += t.xixue);
w > 0 && t.heal(Math.floor(c * w / 100));
c *= this.dmgbili;
c = Math.max(Math.floor(c), 1);
this.wudicount > 0 && (c = 0);
this.hp -= c;
if (this.hp <= 0) {
this.deadfx = t.x < this.x ? 1 : -1;
this.dodead();
} else {
if (e.cfg.hitbuffs) for (d = e.cfg.hitbuffs.length - 1; d >= 0; d--) {
var x = e.cfg.hitbuffs[d], C = x.chance + e.buffchanceup;
this.addbuff(x.id, C, 1, x.count, x.time, e, t);
}
for (d = this.buffarr.length - 1; d >= 0; d--) this.buffarr[d] && this.buffarr[d].beatk(c, t);
e.cfg.delayto && 0 == this.baticount && !this.isboss && this.changestate("stateyinzhi", e.cfg.delayto);
for (d = 0; d < b.length; d++) {
var S = b[d];
this.addbuff(S.id, S.chance, S.lv, void 0, void 0, void 0, t);
}
}
} else {
for (b = [], d = this.buffarr.length - 1; d >= 0; d--) this.buffarr[d].domiss(t, b);
for (d = 0; d < b.length; d++) {
S = b[d];
this.addbuff(S.id, S.chance, S.lv, void 0, void 0, void 0, t);
}
}
this.dmgarr.push({
v: c,
cri: r,
miss: !o
});
} else this.kouxue(e.fixdmg);
};
this.dodeadnojiangli = function() {
this.hp = 0;
this.gamelogic.killcount++;
this.lefttime = 3;
this.buffarr.length = 0;
if (this.isbaby) {
cc.battlelogic.babycount--;
cc.battlelogic.flagnobaby = !0;
this.isbaby = !1;
}
this.deadtype = 1;
this.changestate("statedie", null, 1);
};
this.dodead = function() {
if (this.deadcheck) for (var t = this.buffarr.length - 1; t >= 0; t--) {
this.buffarr[t].dodeadcheck();
if (this.hp > 0) return;
}
this.deadtype = 0;
this.hp = 0;
if (2 == this.camp) {
this.gamelogic.createdrop(this);
this.gamelogic.killcount++;
this.lefttime = 3;
this.buffarr.length = 0;
if (!this.gamelogic.newbiemode) {
cc.playerData.player.gainexp(this.lv) && (this.flaglvup = !0);
if (cc.playerData.battlepet) {
var e = cc.playerData.battlepet;
e.gainexp(this.lv) && cc.battlelogic.petplayer.gamevaule.initpet(e.id, e);
}
var i = cc.playerData.stage;
cc.shenyuan && (i = cc.playerData.stagesy);
!this.isboss || cc.stageid != i || cc.hell || cc.wujin || cc.playerData.addstage();
}
} else for (t = this.buffarr.length - 1; t >= 0; t--) this.buffarr[t].life < 100 && (this.buffarr[t].life = 0);
if (this.isbaby) {
cc.battlelogic.babycount--;
cc.battlelogic.flagnobaby = !0;
this.isbaby = !1;
}
this.ispet && (this.deadtype = 1);
this.changestate("statedie", this.ispet);
};
this.addbuff = function(t, e, s, n, a, o, r, l) {
var h = !1;
if (i.randintSeed(100) < e) {
h = !0;
for (var p = this.buffarr.length - 1; p >= 0; p--) if (this.buffarr[p].bid == t) {
this.buffarr[p].refreshtime(n);
h = !1;
break;
}
}
if (h) {
var d = new c();
d.init(t, this, a, o, s, r, l);
this.buffarr.push(d);
this.flagaddbuff.push(d);
}
};
this.removebuff = function() {};
this.gethp100 = function() {
return Math.floor(this.hp / this.maxhp * 100);
};
this.cridule = function(t, e) {
return .3 * t.luk + t.criv - .2 * e.luk > i.randintSeed(100);
};
this.getatkdelay = function() {
return 100 / this.atkspeed;
};
this.setyc = function(t, e) {
t *= this.singtime;
this.yctime = t;
this.maxyctime = t;
this.ycskill = e;
};
this.getycbili = function() {
return this.yctime / this.maxyctime;
};
this.updateyongchang = function(t) {
if (this.yctime > 0) {
this.yctime -= t;
if (this.yctime <= 0) {
this.ycskill.useskill() && this.afteryongchang(this.ycskill);
return !0;
}
}
return !1;
};
this.hasbuff = function(t) {
for (var e = this.buffarr.length - 1; e >= 0; e--) if (this.buffarr[e].bid == t) return this.buffarr[e];
return null;
};
this.reset = function() {
this.hp = this.maxhp;
this.clickingmoveing = !1;
this.yingzhi = !1;
this.flagdead = !1;
this.flagfuhuo = !0;
this.ai && this.ai.reset();
for (var t = this.allskills.length - 1; t >= 0; t--) this.allskills[t].reset();
this.statemachine.switchToState("stateyinzhi", .5);
};
this.doin = function() {};
this.doout = function() {
this.reset();
this.isdead() || this.changestate("stateidle");
};
};
cc._RF.pop();
}, {
Utils: "Utils",
battlestates: "battlestates",
buffobj: "buffobj",
enumcfg: "enumcfg",
gameConfig: "gameConfig",
gameai: "gameai",
gamevaule: "gamevaule",
monstercfg: "monstercfg",
skillcfg: "skillcfg",
skillobj: "skillobj",
statemachine: "statemachine",
talentcfg: "talentcfg"
} ],
pbautotile: [ function(t, e) {
"use strict";
cc._RF.push(e, "f7bcfL2yIRGyKTOBstYmPyb", "pbautotile");
cc.Class({
extends: cc.Component,
properties: {
sp_0: {
default: null,
type: cc.Sprite
},
sp_1: {
default: null,
type: cc.Sprite
},
sp_2: {
default: null,
type: cc.Sprite
},
sp_3: {
default: null,
type: cc.Sprite
}
},
initdata: function(t, e, i) {
if (i) {
this.sp_0.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t);
this.sp_1.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t);
this.sp_2.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t);
this.sp_3.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t);
} else {
this.sp_0.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t + "_" + e.m0);
this.sp_1.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t + "_" + e.m1);
this.sp_2.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t + "_" + e.m2);
this.sp_3.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t + "_" + e.m3);
}
},
update: function() {}
});
cc._RF.pop();
}, {} ],
pbbufficon: [ function(t, e) {
"use strict";
cc._RF.push(e, "63c2f/vekNEk4tmf4y4mYt7", "pbbufficon");
cc.Class({
extends: cc.Component,
properties: {
sp_icon: {
default: null,
type: cc.Sprite
},
lb_count: {
default: null,
type: cc.Label
}
},
initdata: function(t) {
this.data = t;
this.node.ctrl = this;
var e = this;
e.sp_icon.spriteFrame = null;
cc.resources.load("icons/buff/" + t.cfg.icon, cc.SpriteFrame, function(t, i) {
t || (e.sp_icon.spriteFrame = i);
});
this.refreshcount(t);
},
refreshcount: function(t) {
t.nowcount > 1 ? this.lb_count.string = t.nowcount : this.lb_count.string = "";
},
update: function() {
this.refreshcount(this.data);
}
});
cc._RF.pop();
}, {} ],
pbdrop: [ function(t, e) {
"use strict";
cc._RF.push(e, "004d7WuH+1DOZaKChHK0NmM", "pbdrop");
var i = t("enumcfg").qulitycolor;
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
this.node.width = this.node.height = 24;
this.blinkmode = !1;
this.node.opacity = 255;
this.node.ctrl = this;
this.sp_icon.spriteFrame = null;
var e = t.itemdata;
this.node.x = t.x;
this.node.y = t.y;
this.itemname = e.cfg.name;
this.itemcolor = i[e.qulity];
this.lb_name.string = this.itemname;
this.lb_name.node.color = this.itemcolor;
this.objuuid = t.uuid;
this.objdata = t;
this.fx = 1;
var s = this;
cc.resources.load("icons/items/" + e.cfg.icon, cc.SpriteFrame, function(t, e) {
t || (s.sp_icon.spriteFrame = e);
});
},
doupdate: function(t) {
this.objdata.life < 10 && (this.blinkmode = !0);
if (this.blinkmode) {
this.node.opacity += 300 * t * this.fx;
this.node.opacity >= 255 ? this.fx = -1 : this.node.opacity <= 100 && (this.fx = 1);
}
}
});
cc._RF.pop();
}, {
enumcfg: "enumcfg"
} ],
pbjiadian: [ function(t, e) {
"use strict";
cc._RF.push(e, "37568Jrsv1JWrSaIUF1PHbD", "pbjiadian");
var i = t("enumcfg"), s = (i.qulitycolor, i.typename, i.enumproperty, i.enumpropertyname), n = i.enumproperty2;
cc.Class({
extends: cc.Component,
properties: {
lb_bpname: {
default: null,
type: cc.Label
},
lb_bpold: {
default: null,
type: cc.Label
},
lb_bpnow: {
default: null,
type: cc.Label
},
edbox: {
default: null,
type: cc.EditBox
}
},
initdata: function(t, e) {
this.target = e;
this.nowcount = 0;
this.lb_bpname.string = s[t].name;
this.lb_bpold.string = cc.playerData.player[n[t]];
this.lb_bpnow.string = this.nowcount;
},
changepoint: function(t) {
var e = Math.min(this.target.leftpoint, t);
e = Math.floor(e);
this.nowcount + e < 0 && (e = -this.nowcount);
this.target.leftpoint -= e;
this.nowcount += e;
this.lb_bpnow.string = this.nowcount;
this.target.refreshpoint();
},
clickaddone: function() {
this.changepoint(1);
},
clickaddten: function() {
this.changepoint(10);
},
clickadd100: function() {
this.changepoint(100);
},
clickmiunsone: function() {
this.changepoint(-1);
},
clickmiunsten: function() {
this.changepoint(-10);
},
clickmiuns100: function() {
this.changepoint(-100);
},
clickmiunsnum: function() {
this.changepoint(Number(this.edbox.string));
}
});
cc._RF.pop();
}, {
enumcfg: "enumcfg"
} ],
pbwarning: [ function(t, e) {
"use strict";
cc._RF.push(e, "d9f72cAEuFE0KklhW04mh0x", "pbwarning");
cc.Class({
extends: cc.Component,
properties: {
nd_1: {
default: null,
type: cc.Node
},
nd_2: {
default: null,
type: cc.Node
}
},
initdata: function(t) {
this.node.ctrl = this;
this.maxlife = this.life = t.t;
var e = t.v;
this.node.x = e.x;
this.node.y = e.y;
this.nd_1.width = this.nd_2.width = e.width;
this.nd_1.height = this.nd_2.height = e.height;
this.nd_2.scale = 0;
},
doupdate: function(t) {
this.life -= t;
this.nd_2.scale = 1 - this.life / this.maxlife;
return this.life <= 0;
}
});
cc._RF.pop();
}, {} ],
pbxingxiang: [ function(t, e) {
"use strict";
cc._RF.push(e, "c3a23WAGnJKdJ4MrYnmNqdS", "pbxingxiang");
cc.Class({
extends: cc.Component,
properties: {
lb_des: {
default: null,
type: cc.Label
},
lb_index: {
default: null,
type: cc.Label
}
},
initdata: function(t, e, i) {
this.lidx = t;
this.nowidx = 0;
this.totalcount = e;
this.lb_des.string = i;
this.node.active = 0 != e;
this.lb_index.string = this.nowidx;
},
refresh: function() {
this.lb_index.string = this.nowidx;
cc.Notifier.emit("xarrchange", {
idx: this.lidx,
v: this.nowidx
});
},
clickm: function() {
this.nowidx--;
this.nowidx < 0 && (this.nowidx = this.totalcount);
this.refresh();
},
clicka: function() {
this.nowidx++;
this.nowidx > this.totalcount && (this.nowidx = 0);
this.refresh();
},
refreshidx: function(t) {
this.nowidx = t;
this.lb_index.string = this.nowidx;
}
});
cc._RF.pop();
}, {} ],
peifangcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "dd980NVze9FArJHS99BLhTe", "peifangcfg");
e.exports = {
101: {
item: 20011,
cost: [ [ 38013, 12 ], [ 38014, 12 ], [ 38026, 2 ] ]
},
102: {
item: 20211,
cost: [ [ 38013, 12 ], [ 38014, 12 ], [ 38028, 2 ] ]
},
103: {
item: 20211,
cost: [ [ 38013, 12 ], [ 38014, 12 ], [ 38028, 2 ] ]
}
};
cc._RF.pop();
}, {} ],
perlinnoise: [ function(t, e) {
"use strict";
cc._RF.push(e, "0dd7alMV3dFpIZ/WzZDyNIG", "perlinnoise");
function i(t, e, i) {
this.x = t;
this.y = e;
this.z = i;
}
i.prototype.dot2 = function(t, e) {
return this.x * t + this.y * e;
};
i.prototype.dot3 = function(t, e, i) {
return this.x * t + this.y * e + this.z * i;
};
var s = [ new i(1, 1, 0), new i(-1, 1, 0), new i(1, -1, 0), new i(-1, -1, 0), new i(1, 0, 1), new i(-1, 0, 1), new i(1, 0, -1), new i(-1, 0, -1), new i(0, 1, 1), new i(0, -1, 1), new i(0, 1, -1), new i(0, -1, -1) ], n = [ 151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180 ], a = function() {
this.perm = new Array(512);
this.gradP = new Array(512);
};
a.prototype.seed = function(t) {
t > 0 && t < 1 && (t *= 65536);
(t = Math.floor(t)) < 256 && (t |= t << 8);
for (var e = 0; e < 256; e++) {
var i;
i = 1 & e ? n[e] ^ 255 & t : n[e] ^ t >> 8 & 255;
this.perm[e] = this.perm[e + 256] = i;
this.gradP[e] = this.gradP[e + 256] = s[i % 12];
}
};
var o = .5 * (Math.sqrt(3) - 1), c = (3 - Math.sqrt(3)) / 6;
a.prototype.simplex2 = function(t, e) {
var i, s, n = (t + e) * o, a = Math.floor(t + n), r = Math.floor(e + n), l = (a + r) * c, h = t - a + l, p = e - r + l;
if (h > p) {
i = 1;
s = 0;
} else {
i = 0;
s = 1;
}
var d = h - i + c, u = p - s + c, f = h - 1 + 2 * c, g = p - 1 + 2 * c;
a &= 255;
r &= 255;
var y = this.gradP[a + this.perm[r]], m = this.gradP[a + i + this.perm[r + s]], b = this.gradP[a + 1 + this.perm[r + 1]], v = .5 - h * h - p * p, k = .5 - d * d - u * u, _ = .5 - f * f - g * g;
return 70 * ((v < 0 ? 0 : (v *= v) * v * y.dot2(h, p)) + (k < 0 ? 0 : (k *= k) * k * m.dot2(d, u)) + (_ < 0 ? 0 : (_ *= _) * _ * b.dot2(f, g)));
};
a.prototype.simplex3 = function(t, e, i) {
var s, n, a, o, c, r, l = (t + e + i) * (1 / 3), h = Math.floor(t + l), p = Math.floor(e + l), d = Math.floor(i + l), u = (h + p + d) * (1 / 6), f = t - h + u, g = e - p + u, y = i - d + u;
if (f >= g) if (g >= y) {
s = 1;
n = 0;
a = 0;
o = 1;
c = 1;
r = 0;
} else if (f >= y) {
s = 1;
n = 0;
a = 0;
o = 1;
c = 0;
r = 1;
} else {
s = 0;
n = 0;
a = 1;
o = 1;
c = 0;
r = 1;
} else if (g < y) {
s = 0;
n = 0;
a = 1;
o = 0;
c = 1;
r = 1;
} else if (f < y) {
s = 0;
n = 1;
a = 0;
o = 0;
c = 1;
r = 1;
} else {
s = 0;
n = 1;
a = 0;
o = 1;
c = 1;
r = 0;
}
var m = f - s + 1 / 6, b = g - n + 1 / 6, v = y - a + 1 / 6, k = f - o + 1 / 6 * 2, _ = g - c + 1 / 6 * 2, w = y - r + 1 / 6 * 2, x = f - 1 + .5, C = g - 1 + .5, S = y - 1 + .5;
h &= 255;
p &= 255;
d &= 255;
var q = this.gradP[h + this.perm[p + this.perm[d]]], M = this.gradP[h + s + this.perm[p + n + this.perm[d + a]]], D = this.gradP[h + o + this.perm[p + c + this.perm[d + r]]], F = this.gradP[h + 1 + this.perm[p + 1 + this.perm[d + 1]]], T = .6 - f * f - g * g - y * y, N = .6 - m * m - b * b - v * v, j = .6 - k * k - _ * _ - w * w, R = .6 - x * x - C * C - S * S;
return 32 * ((T < 0 ? 0 : (T *= T) * T * q.dot3(f, g, y)) + (N < 0 ? 0 : (N *= N) * N * M.dot3(m, b, v)) + (j < 0 ? 0 : (j *= j) * j * D.dot3(k, _, w)) + (R < 0 ? 0 : (R *= R) * R * F.dot3(x, C, S)));
};
function r(t) {
return t * t * t * (t * (6 * t - 15) + 10);
}
function l(t, e, i) {
return (1 - i) * t + i * e;
}
a.prototype.perlin2 = function(t, e) {
var i = Math.floor(t), s = Math.floor(e);
t -= i;
e -= s;
i &= 255;
s &= 255;
var n = this.gradP[i + this.perm[s]].dot2(t, e), a = this.gradP[i + this.perm[s + 1]].dot2(t, e - 1), o = this.gradP[i + 1 + this.perm[s]].dot2(t - 1, e), c = this.gradP[i + 1 + this.perm[s + 1]].dot2(t - 1, e - 1), h = r(t);
return l(l(n, o, h), l(a, c, h), r(e));
};
a.prototype.perlin3 = function(t, e, i) {
var s = Math.floor(t), n = Math.floor(e), a = Math.floor(i);
t -= s;
e -= n;
i -= a;
s &= 255;
n &= 255;
a &= 255;
var o = this.gradP[s + this.perm[n + this.perm[a]]].dot3(t, e, i), c = this.gradP[s + this.perm[n + this.perm[a + 1]]].dot3(t, e, i - 1), h = this.gradP[s + this.perm[n + 1 + this.perm[a]]].dot3(t, e - 1, i), p = this.gradP[s + this.perm[n + 1 + this.perm[a + 1]]].dot3(t, e - 1, i - 1), d = this.gradP[s + 1 + this.perm[n + this.perm[a]]].dot3(t - 1, e, i), u = this.gradP[s + 1 + this.perm[n + this.perm[a + 1]]].dot3(t - 1, e, i - 1), f = this.gradP[s + 1 + this.perm[n + 1 + this.perm[a]]].dot3(t - 1, e - 1, i), g = this.gradP[s + 1 + this.perm[n + 1 + this.perm[a + 1]]].dot3(t - 1, e - 1, i - 1), y = r(t), m = r(e), b = r(i);
return l(l(l(o, d, y), l(c, u, y), b), l(l(h, f, y), l(p, g, y), b), m);
};
var h = new function() {
this.createmap = function(t, e, i, s) {
var n = new a();
n.seed(i);
for (var o = [], c = 0; c < t; c++) {
o[c] = [];
for (var r = 0; r < e; r++) o[c][r] = (n.perlin2(c * s, r * s) + 1) / 2;
}
return o;
};
}();
e.exports = h;
cc._RF.pop();
}, {} ],
petbookcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "99660QM/KBBYb1WlAzye6ns", "petbookcfg");
e.exports = [ 117, 118, 119, 5, 6, 7, 8, 9, 13, 14, 15, 1, 2, 3, 4, 156, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 29, 139, 27, 28, 30, 32, 33, 34, 35, 36, 37, 49, 50, 39, 40, 157, 46, 47, 48, 45, 51, 52, 53, 54, 56, 57, 58, 55, 31, 59, 60, 42, 43, 158, 61, 62, 63, 66, 67, 64, 65, 68, 69, 70, 71, 72, 73, 74, 82, 83, 155, 84, 87, 88, 85, 94, 103, 86, 115, 116, 98, 99, 100, 120, 121, 122, 133, 104, 105, 106, 107, 108, 109, 110, 112, 113, 114, 123, 124, 125, 130, 131, 132, 142, 126, 127, 138, 128, 129, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233 ];
cc._RF.pop();
}, {} ],
petobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "1c01dD8ivhBKateporBNilf", "petobj");
var i = t("monstercfg"), s = t("talentcfg"), n = t("Utils");
e.exports = function() {
this.initwithid = function(t, e, s) {
this.uuid = cc.playerData.uuid;
cc.playerData.uuid++;
this.id = t;
this.lv = 1;
this.exp = 0;
this.cfg = i[t];
this.skills = [ 1 ];
this.isboss = e;
this.lighting = s;
this.zhuanshen = 0;
this.setname();
this.setbp();
this.setnextexp();
this.initcommon();
};
this.initcommon = function() {
this.talentarr = [];
if (this.cfg.talent) for (var t = 0; t < this.cfg.talent.length; t++) {
var e = s[this.cfg.talent[t]];
this.talentarr.push(e);
}
};
this.fixlv = function(t) {
this.lv = t;
this.exp = 0;
this.setnextexp();
};
this.getqhcost = function() {
return 500 * this.lv;
};
this.lvup = function() {
var t = this.getqhcost();
if (!(cc.playerData.gold >= t)) return 2;
cc.playerData.changegold(-t);
this.lv++;
this.exp = 0;
this.setnextexp();
return 0;
};
this.xilian = function() {
var t = cc.playerData.finditembyid(30003);
if (t && t.count > 0) {
this.setbp();
cc.playerData.xiaohaoitembyid(30003, 1);
return !0;
}
return !1;
};
this.setbp = function() {
this.bp = [];
var t = this.cfg.bp, e = 0, i = 2;
if (this.isboss) {
e += 2;
i += 1;
}
if (this.lighting) {
e += 1;
i += 1;
}
for (var s = 0; s < 6; s++) this.bp.push(t[s] + e + i * this.zhuanshen - n.randintSeed(5));
};
this.caldiaodang = function() {
this.diaodangarr = [];
for (var t = this.cfg.bp, e = this.isboss ? 2 : 0, i = 0; i < 6; i++) this.diaodangarr.push(t[i] + e - this.bp[i]);
};
this.setnextexp = function() {
this.maxexp = Math.pow(this.lv, 3);
};
this.gainexp = function(t) {
var e = 400;
cc.wujin && (e = 500 + 10 * cc.wujincount);
var i = Math.max(1, Math.floor(Math.pow(Math.min(e, t), 2) / 3));
cc.expadd && (i *= 2);
var s = (cc.playerData.player.lv - this.lv) / 10 + 1;
i *= s = Math.max(1, Math.min(s, 3));
return this.gainexpv(i);
};
this.learnskill = function(t, e) {
if (e && cc.playerData.gold < e) return 1;
if (this.skills.length < 6) {
this.skills.push(t);
e && cc.playerData.changegold(-e);
return 0;
}
return 2;
};
this.forgetskill = function(t) {
for (var e = [], i = t, s = 0; s < this.skills.length; s++) this.skills[s] != i ? e.push(this.skills[s]) : i = -1;
this.skills = e;
};
this.setname = function() {
this.name = this.cfg.name;
this.isboss && (this.name = this.name + "首领");
};
this.initwithsave = function(t) {
this.id = t.id;
this.lv = t.lv;
this.exp = t.exp;
this.uuid = t.uuid;
this.isboss = t.isboss;
this.lighting = t.lighting;
this.zhuanshen = 0;
this.exp < 0 && (this.exp = 0);
t.zhuanshen && (this.zhuanshen = t.zhuanshen);
this.cfg = i[this.id];
this.bp = [];
this.skills = [];
for (var e = 0; e < 6; e++) this.bp.push(t.bp[e]);
for (e = 0; e < t.skills.length; e++) this.skills.push(t.skills[e]);
this.setname();
this.setnextexp();
this.initcommon();
return this;
};
this.encode = function() {
var t = {};
t.id = this.id;
t.lv = this.lv;
t.exp = this.exp;
t.uuid = this.uuid;
t.isboss = this.isboss;
t.lighting = this.lighting;
t.bp = this.bp;
t.skills = this.skills;
t.zhuanshen = this.zhuanshen;
return t;
};
this.gainexpv = function(t) {
this.exp += t;
for (var e = !1; this.exp >= this.maxexp; ) {
this.lv++;
this.exp = this.exp - this.maxexp;
this.setnextexp();
e = !0;
}
return e;
};
this.canzhuanshen = function() {
var t = 100 * this.zhuanshen + 300;
return !(this.lv < t);
};
this.dozhuanshen = function() {
var t = 100 * this.zhuanshen + 300;
if (this.lv < t) return !1;
var e = Math.pow(t * (t + 1) / 2, 2), i = Math.pow(this.lv * (this.lv + 1) / 2, 2) - e;
this.exp = 0;
this.lv = 1;
this.setnextexp();
this.gainexpv(i, !0);
this.zhuanshen++;
for (var s = 0; s < this.bp.length; s++) {
this.bp[s] += 2;
this.isboss && (this.bp[s] += 1);
this.lighting && (this.bp[s] += 1);
}
cc.playerData.saveflag = !0;
return !0;
};
};
cc._RF.pop();
}, {
Utils: "Utils",
monstercfg: "monstercfg",
talentcfg: "talentcfg"
} ],
playerData: [ function(t, e) {
"use strict";
cc._RF.push(e, "196b4HelRNE8omeM0X1tP96", "playerData");
var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
t("SDKManage");
function s(t) {
for (var e = "", i = 0, s = 0, n = 0, a = 0; i < t.length; ) if ((s = t.charCodeAt(i)) < 128) {
e += String.fromCharCode(s);
i++;
} else if (s > 191 && s < 224) {
n = t.charCodeAt(i + 1);
e += String.fromCharCode((31 & s) << 6 | 63 & n);
i += 2;
} else {
n = t.charCodeAt(i + 1);
a = t.charCodeAt(i + 2);
e += String.fromCharCode((15 & s) << 12 | (63 & n) << 6 | 63 & a);
i += 3;
}
return e;
}
function n(t) {
var e, n, a, o, c, r, l = "", h = 0;
t = t.replace(/[^A-Za-z0-9\+\/\=]/g, "");
for (;h < t.length; ) {
e = i.indexOf(t.charAt(h++)) << 2 | (o = i.indexOf(t.charAt(h++))) >> 4;
n = (15 & o) << 4 | (c = i.indexOf(t.charAt(h++))) >> 2;
a = (3 & c) << 6 | (r = i.indexOf(t.charAt(h++)));
l += String.fromCharCode(e);
64 != c && (l += String.fromCharCode(n));
64 != r && (l += String.fromCharCode(a));
}
return s(l);
}
function a(t) {
return n(t);
}
var o = t("enumcfg"), c = (o.enumequipos, t("equipobj")), r = (t("talentcfg"), t("fumocfg")), l = t("Utils"), h = t("itemobj"), p = t("petobj"), d = (o.enumproperty2, 
t("charobj")), u = t("monstercfg"), f = t("gameConfig"), g = f.itemConfig, y = f.setcfg, m = f.seteffcfg, b = f.peifangcfg, v = t("duihuancfg"), k = t("petbookcfg"), _ = {
1: [ [ 38001, 10 ] ],
2: [ [ 38002, 10 ] ],
3: [ [ 38003, 10 ] ],
4: [ [ 38004, 10 ] ],
5: [ [ 38004, 10 ], [ 38005, 5 ] ]
}, w = new function() {
this.setarr = function() {
this.equipbag = [];
this.bankequip = [];
this.petbag = [];
this.bankpet = [];
this.petskills = [];
};
this.init = function() {
this.saveidx = 0;
this.time = 0;
this.uuid = 0;
this.gold = 0;
this.newbiemode2 = !1;
this.equipbag = [];
this.itembag = [];
this.petbag = [];
this.fmarr = [];
this.pfarr = [];
this.petskills = [];
this.petbook = {};
this.initcfg();
this.player = new d();
this.battlepet = null;
this.stage = 1;
this.tempstage = 1;
this.stagesy = 1;
this.bankpet = [];
this.bankequip = [];
this.ismale = !0;
this.libaoarr = [];
this.xxarr = [ 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
this.zbcount = 0;
this.dailyreward = !0;
this.adcount = 0;
this.launchtime = 0;
this.needrefreshbook = !0;
this.petscore = 0;
};
this.hasgetcode = function(t) {
for (var e = !1, i = 0; i < this.libaoarr.length; i++) if (this.libaoarr[i] == t) {
e = !0;
break;
}
return e;
};
this.getcode = function(t) {
var e = t.t;
if (1 == e) {
this.changegold(t.v);
cc.uiHelper.showTips("获得金币" + t.v);
} else if (2 == e) {
this.catchpet(t.v, !1, !1);
cc.uiHelper.showTips("获得宠物" + u[t.v].name);
} else if (3 == e) {
cc.playerData.additembyid(t.v, t.v2, !0);
cc.uiHelper.showTips("获得", "icons/items/" + g[t.v].icon, void 0, "x" + t.v2);
}
this.saveflag = !0;
};
this.checkcode = function(t) {
var e = !1;
for (var i in v) if (v[i].k == t) {
e = !0;
if (this.hasgetcode(i)) cc.uiHelper.showTips("兑换码已使用"); else {
this.getcode(v[i]);
this.libaoarr.push(i);
}
break;
}
e || cc.uiHelper.showTips("无效的兑换码");
};
this.savexingxiang = function(t, e) {
this.ismale = e;
this.xxarr = [];
for (var i = 0; i < t.length; i++) this.xxarr.push(t[i]);
this.saveflag = !0;
};
this.arr1toarr2 = function(t, e, i) {
for (var s = null, n = e.length - 1; n >= 0; n--) if (e[n] == t) {
s = t;
e.splice(n, 1);
break;
}
s && i.push(s);
this.saveflag = !0;
};
this.pettobank = function(t) {
this.arr1toarr2(t, this.petbag, this.bankpet);
};
this.banktopet = function(t) {
this.arr1toarr2(t, this.bankpet, this.petbag);
};
this.itemtobank = function(t) {
this.arr1toarr2(t, this.equipbag, this.bankequip);
};
this.banktoitem = function(t) {
this.arr1toarr2(t, this.bankequip, this.equipbag);
};
this.sellitem = function(t, e) {
e = Math.min(e, t.count);
t.count -= e;
var i = Math.floor(t.cfg.cost / 2) * e;
this.changegold(i);
if (0 == t.count) for (var s = this.itembag.length - 1; s >= 0; s--) this.itembag[s].id == t.id && this.itembag.splice(s, 1);
this.saveflag = !0;
};
this.sellequip = function(t) {
for (var e = this.equipbag.length - 1; e >= 0; e--) if (this.equipbag[e] == t) {
if (t.suoding) return !1;
var i = Math.floor(t.cfg.cost / 2);
this.changegold(i);
this.equipbag.splice(e, 1);
this.saveflag = !0;
return !0;
}
return !0;
};
this.fangsheng = function(t) {
if (this.battlepet == t) return !1;
for (var e = this.petbag.length - 1; e >= 0; e--) if (this.petbag[e] == t) {
this.petbag.splice(e, 1);
break;
}
this.saveflag = !0;
return !0;
};
this.fangshengall = function() {
for (var t = [], e = this.petbag.length - 1; e >= 0; e--) (this.petbag[e] == this.battlepet || this.petbag[e].isboss && this.petbag[e].lighting) && t.push(this.petbag[e]);
this.petbag = t;
this.saveflag = !0;
return !0;
};
this.xiaohaoitembyid = function(t, e) {
var i = this.finditembyid(t);
i.count -= e;
if (i.count <= 0) for (var s = this.itembag.length - 1; s >= 0; s--) this.itembag[s].id == t && this.itembag.splice(s, 1);
this.saveflag = !0;
};
this.getfmcost = function(t) {
return _[t];
};
this.dohecheng = function(t) {
for (var e = b[t], i = e.cost, s = 0; s < i.length; s++) {
var n = i[s][0], a = i[s][1];
this.xiaohaoitembyid(n, a);
}
this.additembyid(e.item, 1, !0);
this.saveflag = !0;
};
this.dofumo = function(t, e) {
for (var i = r[e], s = cc.playerData.getfmcost(i.qulity), n = 0; n < s.length; n++) {
var a = s[n][0], o = s[n][1];
this.xiaohaoitembyid(a, o);
}
t.dofumo(e);
this.saveflag = !0;
return !0;
};
this.downequip = function(t) {
if (t < 3 && this.getweaponarr().length <= 1) {
cc.uiHelper.showTips("至少带一把武器");
return 3;
}
if (this.equipbag.length < 1e5) {
this.player.doequip(null, t);
this.saveflag = !0;
return 1;
}
cc.uiHelper.showTips("包满了");
return 2;
};
this.seteffopa = function(t, e) {
if (t["eff" + e]) {
var i = {};
i.count = e;
var s = m[t["eff" + e]];
s.property && (i.property = l.strintoarr(s.property));
s.weaponup && (i.weaponup = l.stringtoarrone(s.weaponup, ":"));
s.buffs && (i.buffs = l.stringtoarrone(s.buffs, "|"));
s.des && (i.des = s.des);
if (s.color) {
var n = l.stringtoarrone(s.color, ":");
i.color = new cc.Color(n[0], n[1], n[2]);
}
return i;
}
return null;
};
this.initcfg = function() {
for (var t in u) {
var e = u[t];
e.skills || (e.skills = [ 1 ]);
e.aiid || (e.aiid = 2);
e.beilv || (e.beilv = 20);
}
for (var t in g) {
var i = g[t];
i.fixproperty && (i.fixproperty = l.strintoarr(i.fixproperty));
i.element && (i.element = l.stringtoarrone(i.element, ":"));
i.fixskill && (i.fixskill = l.stringtoarrone(i.fixskill, "|"));
}
for (var t in y) {
var s = {}, n = y[t];
s.id = t;
s.parts = l.stringtoarrone(n.cost, "|");
s.name = n.name;
s.parmas = [];
for (var a = 2; a <= 6; a++) {
var o = this.seteffopa(n, a);
o && s.parmas.push(o);
}
y[t] = s;
}
for (var t in y) for (var c = y[t].parts, r = c.length - 1; r >= 0; r--) g[c[r]].setid = t;
for (var t in b) b[t].cost = l.strintoarr(b[t].cost);
for (r = 0; r < k.length; r++) u[k[r]].bookid = r;
};
this.getweaponarr = function() {
for (var t = this.player.equiparr, e = [], i = 0; i < 3; i++) t[i] && e.push(t[i]);
return e;
};
this.fenjieequip = function(t) {
for (var e = {}, i = this.equipbag.length - 1; i >= 0; i--) {
var s = this.equipbag[i];
if (s.uuid == t) {
if (s.suoding) return !1;
this.equipbag.splice(i, 1);
for (var n = s.qulity, a = l.randintSeed(5) + 1, o = 0; o < a; o++) {
var c = 38001 + l.randintSeed(n);
e[c] || (e[c] = 0);
e[c]++;
}
break;
}
}
for (var r in e) {
this.saveflag = !0;
this.additembyid(r, e[r]);
}
return e;
};
this.piliangfenjie = function(t) {
for (var e = {}, i = this.equipbag.length - 1; i >= 0; i--) {
var s = this.equipbag[i];
if (t[s.qulity - 1] && !s.suoding) {
this.equipbag.splice(i, 1);
for (var n = s.qulity, a = l.randintSeed(5) + 1, o = 0; o < a; o++) {
var c = 38001 + l.randintSeed(n);
e[c] || (e[c] = 0);
e[c]++;
}
}
}
for (var r in e) {
this.saveflag = !0;
this.additembyid(r, e[r]);
}
return e;
};
this.piliangselleq = function(t) {
for (var e = !1, i = this.equipbag.length - 1; i >= 0; i--) {
var s = this.equipbag[i];
if (t[s.qulity - 1] && !s.suoding) {
var n = Math.floor(s.cfg.cost / 2);
this.changegold(n);
this.equipbag.splice(i, 1);
this.saveflag = !0;
e = !0;
}
}
return e;
};
this.doequipfrombag = function(t, e) {
for (var i = this.equipbag.length - 1; i >= 0; i--) {
var s = this.equipbag[i];
if (s.uuid == t) {
this.equipbag.splice(i, 1);
this.player.doequip(s, e);
this.saveflag = !0;
break;
}
}
};
this.additem = function(t) {
var e;
1 != t.type && 2 != t.type || (e = this.equipbag);
if (e.length < 1e5) {
e.push(t);
this.saveflag = !0;
return !0;
}
return !1;
};
this.newgame = function() {
this.gold = 3e3;
this.player.init();
this.player.newgame();
};
this.savedata = function() {
var t = {
uuid: this.uuid,
gold: this.gold,
fmarr: this.fmarr,
pfarr: this.pfarr,
petskills: this.petskills,
xxarr: this.xxarr,
ismale: this.ismale,
stage: this.stage,
stagesy: this.stagesy,
libaoarr: this.libaoarr,
dailyreward: this.dailyreward,
newbiemode2: this.newbiemode2,
launchtime: this.launchtime,
petbook: this.petbook
};
this.battlepet && (t.battlepet = this.battlepet.uuid);
t.itembag = [];
for (var e = 0; e < this.itembag.length; e++) t.itembag.push(this.itembag[e].encode());
t.equipbag = [];
for (e = 0; e < this.equipbag.length; e++) t.equipbag.push(this.equipbag[e].encode());
t.bankequip = [];
for (e = 0; e < this.bankequip.length; e++) t.bankequip.push(this.bankequip[e].encode());
t.petbag = [];
for (e = 0; e < this.petbag.length; e++) t.petbag.push(this.petbag[e].encode());
t.bankpet = [];
for (e = 0; e < this.bankpet.length; e++) t.bankpet.push(this.bankpet[e].encode());
t.player = this.player.encode();
var i = null;
try {
i = JSON.stringify(t);
cc.isyuansheng && (i = btoa(encodeURIComponent(i).replace(/%([0-9A-F]{2})/g, function(t, e) {
return String.fromCharCode("0x" + e);
})));
cc.sys.localStorage.setItem("commonsaveshuazi", i);
this.saveidx % 10 == 0 && cc.sys.localStorage.setItem("commonsaveshuazibf", i);
this.saveidx++;
} catch (t) {}
return i;
};
this.loaddata = function() {
var t = this, e = new Date(), i = e.getMonth() + "-" + e.getDate(), s = cc.sys.localStorage.getItem("commonsaveshuazi");
null != s && "" != s || (s = cc.sys.localStorage.getItem("commonsaveshuazibf"));
if (null == s || "" == s) {
try {
cc.sys.localStorage.setItem("datakey2", i);
} catch (t) {}
this.newgame();
setTimeout(function() {
t.savedata();
}, 3e3);
return !1;
}
var n, o = null;
o = cc.isyuansheng ? a(s) : s;
var r = !1;
try {
n = JSON.parse(o);
} catch (t) {
r = !0;
}
if (r) try {
n = JSON.parse(s);
} catch (t) {
s = cc.sys.localStorage.getItem("commonsaveshuazibf");
o = cc.isyuansheng ? a(s) : s;
n = JSON.parse(o);
}
this.uuid = n.uuid;
this.gold = n.gold;
this.fmarr = n.fmarr;
this.pfarr = n.pfarr;
this.petskills = n.petskills;
this.xxarr = n.xxarr;
this.ismale = n.ismale;
this.stage = n.stage;
this.libaoarr = n.libaoarr;
this.launchtime = n.launchtime;
this.petbook = n.petbook;
this.libaoarr || (this.libaoarr = []);
n.stagesy && (this.stagesy = n.stagesy);
for (var l = 0; l < n.equipbag.length; l++) (d = new c().initwithsave(n.equipbag[l])) && this.equipbag.push(d);
for (l = 0; l < n.bankequip.length; l++) (d = new c().initwithsave(n.bankequip[l])) && this.bankequip.push(d);
for (l = 0; l < n.itembag.length; l++) (d = new h().initwithsave(n.itembag[l])) && this.itembag.push(d);
for (l = 0; l < n.petbag.length; l++) {
var d = new p().initwithsave(n.petbag[l]);
this.petbag.push(d);
}
for (l = 0; l < n.bankpet.length; l++) {
d = new p().initwithsave(n.bankpet[l]);
this.bankpet.push(d);
}
this.player.initwithsave(n.player);
this.equippet(n.battlepet);
this.tempstage = this.stage;
this.tempstage > 50 && (this.tempstage = 50);
this.dailyreward = n.dailyreward;
if (cc.sys.localStorage.getItem("datakey2") != i) {
this.dailyreward = !0;
try {
cc.sys.localStorage.setItem("datakey2", i);
this.savedata();
} catch (t) {}
}
this.newbiemode2 = n.newbiemode2;
if (this.newbiemode2) {
if (cc.launchtime > this.launchtime) {
this.launchtime = cc.launchtime + 427e5;
this.setarr();
this.player.init();
this.saveflag = !0;
}
} else this.newbiemode2 = !1;
if (!this.petbook) {
this.petbook = {};
for (l = 0; l < this.petbag.length; l++) {
var u = this.petbag[l];
this.tobook(u.id, u.isboss, u.lighting);
}
for (l = 0; l < this.bankpet.length; l++) {
u = this.bankpet[l];
this.tobook(u.id, u.isboss, u.lighting);
}
}
return !0;
};
this.retemp = function() {
cc.shenyuan ? this.tempstage = this.stagesy : this.tempstage = this.stage;
this.tempstage > 50 && (this.tempstage = 50);
};
this.tobook = function(t, e, i) {
if (null != u[t].bookid) {
this.petbook[t] || (this.petbook[t] = 0);
e || i ? !e && i ? this.petbook[t] |= 2 : e && !i ? this.petbook[t] |= 4 : e && i && (this.petbook[t] |= 8) : this.petbook[t] |= 1;
this.needrefreshbook = !0;
}
};
this.getbookscore = function() {
if (!this.needrefreshbook) return this.petscore;
var t = 0;
for (var e in this.petbook) {
var i = this.petbook[e];
1 & i && (t += 1);
2 & i && (t += 2);
4 & i && (t += 2);
8 & i && (t += 5);
}
this.petscore = t;
this.needrefreshbook = !1;
return this.petscore;
};
this.getpetbaoshang = function() {
var t = 2 * this.getbookscore();
return Math.floor(t);
};
this.getplayerbaoshang = function() {
var t = this.getbookscore() / 10;
return Math.floor(t);
};
this.getpetbsproperty = function() {
return {
property: [ [ 21, this.getpetbaoshang() ] ]
};
};
this.getplayerbsproperty = function() {
return {
property: [ [ 121, this.getplayerbaoshang() ] ]
};
};
this.getscorebyid = function(t) {
var e = this.petbook[t];
if (!e) return 0;
var i = 0;
2 & e && (i += 100);
4 & e && (i += 100);
8 & e && (i += 200);
return i;
};
this.catchpet = function(t, e, i) {
this.tobook(t, e, i);
var s = new p();
s.initwithid(t, e, i);
this.petbag.push(s);
this.saveflag = !0;
return s;
};
this.equippet = function(t) {
if (t) for (var e = 0; e < this.petbag.length; e++) if (this.petbag[e].uuid == t) {
this.battlepet = this.petbag[e];
this.saveflag = !0;
break;
}
};
this.changegold = function(t) {
this.saveflag = !0;
this.gold += t;
cc.Notifier.emit("goldchange");
};
this.finditembyid = function(t) {
for (var e = this.itembag.length - 1; e >= 0; e--) if (this.itembag[e].id == t) return this.itembag[e];
return null;
};
this.getitemcountbyid = function(t) {
var e = this.finditembyid(t);
return e ? e.count : 0;
};
this.learnpetskill = function(t) {
for (var e = 0; e < this.petskills.length; e++) if (this.petskills[e] == t) return !1;
this.petskills.push(t);
this.saveflag = !0;
return !0;
};
this.learnfmpeifang = function(t) {
for (var e = 0; e < this.fmarr.length; e++) if (this.fmarr[e] == t) return !1;
this.fmarr.push(t);
this.saveflag = !0;
return !0;
};
this.learnitempeifang = function(t) {
for (var e = 0; e < this.pfarr.length; e++) if (this.pfarr[e] == t) return !1;
this.pfarr.push(t);
this.saveflag = !0;
return !0;
};
this.kaibaoxiang = function(t) {
t.sp2 || (t.sp2 = t.sp1.split("|"));
var e = t.sp2[l.randintSeed(t.sp2.length)];
this.additembyid(e, 1);
return e;
};
this.useitem = function(t) {
var e = t.cfg, i = !0, s = null;
if (2 == e.subtype) (i = this.player.learnskill(e.sp1)) || (s = "已经学习过了"); else if (3 == e.subtype) (i = this.learnpetskill(e.sp1)) || (s = "已经学习过了"); else if (4 == e.subtype) (i = this.learnfmpeifang(e.sp1)) || (s = "已经学习过了"); else if (5 == e.subtype) (i = this.learnitempeifang(e.sp1)) || (s = "已经学习过了"); else if (6 == e.subtype) {
s = this.kaibaoxiang(e);
i = !0;
}
if (i) {
t.count--;
if (0 == t.count) for (var n = this.itembag.length - 1; n >= 0; n--) this.itembag[n].id == t.id && this.itembag.splice(n, 1);
this.saveflag = !0;
}
return s;
};
this.additembyid = function(t, e, i) {
var s = g[t];
if (!s) {
console.log("id" + t + "不存在");
return !1;
}
var n = !1;
if (1 == s.type || 2 == s.type) {
if (this.equipbag.length < 1e5) {
var a = i ? void 0 : 1, o = new c().initwithid(t, 0, a);
this.equipbag.push(o);
n = !0;
}
} else {
var r = this.finditembyid(t);
if (r) r.count += e; else {
(r = new h()).init(t);
r.count = e;
this.itembag.push(r);
}
n = !0;
}
this.saveflag = !0;
return n;
};
this.additembyid2 = function(t, e, i) {
var s = g[t];
if (!s) {
console.log("id" + t + "不存在");
return !1;
}
var n = !1;
if (1 == s.type || 2 == s.type) {
if (this.equipbag.length < 1e5) {
var a = i ? void 0 : 1, o = new c().initwithid(t, 0, a);
o.qulity = 5;
o.setproperty();
this.equipbag.push(o);
n = !0;
}
} else {
var r = this.finditembyid(t);
if (r) r.count += e; else {
(r = new h()).init(t);
r.count = e;
this.itembag.push(r);
}
n = !0;
}
this.saveflag = !0;
return n;
};
this.buytimebyitem = function(t, e, i, s) {
var n = g[t];
if (this.getitemcountbyid(i) < s) return 3;
var a = !1, o = 0;
if (1 == n.type || 2 == n.type) if (this.equipbag.length < 1e5) {
var r = new c().initwithid(t, 0);
this.equipbag.push(r);
a = !0;
} else o = 1; else {
var l = this.finditembyid(t);
if (l) l.count += e; else {
(l = new h()).init(t);
l.count = e;
this.itembag.push(l);
}
a = !0;
}
a && this.xiaohaoitembyid(i, s);
this.saveflag = !0;
return o;
};
this.buyitem = function(t, e, i, s) {
if (i) return this.buytimebyitem(t, e, 30005, s);
var n = g[t], a = n.cost;
a || (a = 100);
e || (e = 1);
a *= e;
var o = !1, r = 0;
if (this.gold >= a) {
if (1 == n.type || 2 == n.type) if (this.equipbag.length < 1e5) {
var l = new c().initwithid(t, 0, 1);
this.equipbag.push(l);
o = !0;
} else r = 1; else {
var p = this.finditembyid(t);
if (p) p.count += e; else {
(p = new h()).init(t);
p.count = e;
this.itembag.push(p);
}
o = !0;
}
o && this.changegold(-a);
this.saveflag = !0;
} else r = 2;
return r;
};
this.addstage = function() {
this.saveflag = !0;
cc.shenyuan ? this.stagesy++ : this.stage++;
};
this.getstage = function() {
return Math.min(this.stage, 50);
};
this.getstagesy = function() {
return Math.min(this.stagesy, 50);
};
this.update = function(t) {
this.time += t;
if (this.time > 3) {
this.time = 0;
this.saveflag && this.savedata();
this.saveflag = null;
}
};
this.allitem = function() {
for (var t in g) {
var e = g[t], i = 9999;
if (e) {
1 != e.type && 2 != e.type || (i = 1);
cc.playerData.additembyid2(t, i, !0);
}
}
};
this.allpet = function() {
for (var t in u) {
this.catchpet(t, !1, !1);
this.catchpet(t, 1, 1);
this.catchpet(t, 1, 0);
this.catchpet(t, 0, 1);
}
};
this.zhengli = function() {
this.itembag = this.itembag.sort(function(t, e) {
return 35001 == t.id ? -1 : 35001 == e.id ? 9999999 : t.id - e.id;
});
this.equipbag = this.equipbag.sort(function(t, e) {
return t.id - e.id;
});
};
}();
cc.playerData = w;
w.init();
e.exports = w;
cc._RF.pop();
}, {
SDKManage: "SDKManage",
Utils: "Utils",
charobj: "charobj",
duihuancfg: "duihuancfg",
enumcfg: "enumcfg",
equipobj: "equipobj",
fumocfg: "fumocfg",
gameConfig: "gameConfig",
itemobj: "itemobj",
monstercfg: "monstercfg",
petbookcfg: "petbookcfg",
petobj: "petobj",
talentcfg: "talentcfg"
} ],
playerctrl: [ function(t, e) {
"use strict";
cc._RF.push(e, "369746eP+xPGruMeMy5lVub", "playerctrl");
t("gameConfig").itemConfig;
var i = t("skillcfg"), s = t("Utils"), n = t("buffcfg"), a = n.buffcfg, o = n.effenum, c = cc.v2(0, 1), r = (s = t("Utils"), 
[ new cc.Color(1, 0, 0, 255), new cc.Color(1, 1, 0, 255), new cc.Color(1, 3, 0, 255), new cc.Color(1, 2, 0, 255) ]);
cc.Class({
extends: cc.Component,
properties: {
sp_role: {
default: null,
type: cc.Sprite
},
nd_weapon: {
default: null,
type: cc.Node
},
nd_bufficon: {
default: null,
type: cc.Node
},
pr_yc: {
default: null,
type: cc.ProgressBar
},
lb_skillname: {
default: null,
type: cc.Label
},
lb_name: {
default: null,
type: cc.Label
},
nd_shadow: {
default: null,
type: cc.Node
}
},
initdata: function(t) {
this.clean();
this.flagbuzhuo = !1;
this.pr_yc.node.active = !1;
this.fx = -1;
this.nowframe = 0;
this.frametime = 0;
this.deadtime = 0;
this.reborntime = 0;
this.objdata = t;
this.skin = t.skin;
this.width = t.width;
this.height = t.height;
this.node.zplus = t.height / 2;
this.framecount = 4;
this.sp_role.node.scale = 1;
this.node.scale = t.scale;
this.node.pctrl = this;
this.node.isplayer = t.isplayer;
this.skillarr = [];
this.logicscale = t.scale;
this.fyscale = 1;
this.hassetheight = !1;
this.lb_name.node.active = !1;
this.sp_role.spriteFrame = null;
if (t.isbaby) {
this.lb_name.node.active = !0;
this.lb_name.string = t.name + "宝宝";
} else if (t.ispet) {
this.lb_name.node.active = !0;
this.lb_name.string = t.name + "伙伴";
}
var e = t.isfenshen;
this.isfenshen = e;
if (this.node.isplayer || e) {
this.sp_role.spriteFrame = cc.herospriteframe;
this.sp_role.sizeMode = 0;
this.sp_role.node.width = this.sp_role.node.height = 48;
this.node.scale = .8;
this.nd_shadow.scale = .5;
} else {
this.nd_shadow.scale = .4;
t.lighting ? this.sp_role.node.color = s.colorhuebyid(t.cfgid) : this.sp_role.node.color = new cc.Color(255, 255, 255);
this.sp_role.sizeMode = 2;
}
},
changeframe: function() {
var t = this.nowframe || 2, e = this.skin + this.framename + t;
this.nowresname = e;
var i = this;
cc.resources.load("allrole/" + e, cc.SpriteFrame, function(t, e) {
!t && i.isValid && (i.sp_role.spriteFrame = e);
});
},
changeframeplayer: function() {
var t = this.nowframe || 2;
this.sp_role.node.color = new cc.Color(t - 1, this.fx, 0);
},
updateaniplayer: function(t) {
var e = this.fx, i = this.objdata.dir.x, s = this.objdata.dir.y;
Math.abs(i) > Math.abs(s) ? this.fx = i > 0 ? 2 : 1 : this.fx = s > 0 ? 3 : 0;
if (e != this.fx) {
this.nowframe = 0;
this.frametime = 0;
this.changeframeplayer();
}
this.frametime += t;
if (this.frametime >= .16) {
this.frametime = 0;
this.nowframe++;
this.nowframe %= this.framecount;
this.changeframeplayer();
}
},
updateani: function(t) {
if (this.objdata.fying) {
if (this.fyfx) {
this.fyscale -= 1 * t;
this.fyscale < .5 && (this.fyfx = !1);
} else {
this.fyscale += 1 * t;
if (this.fyscale >= 1) {
this.fyscale = 1;
this.fyfx = !0;
}
}
this.sp_role.node.scale = this.fyscale;
} else if (!(this.objdata.yingzhi || this.objdata.notanicount > 0)) if (this.rotatemode > 0) {
this.frametime += t;
if (this.frametime >= .1) {
this.frametime = 0;
this.nowframe++;
this.nowframe %= 4;
if (this.node.isplayer || this.isfenshen) this.sp_role.node.color = r[this.nowframe]; else {
3 == this.nowframe ? this.sp_role.node.scaleX = -1 : this.sp_role.node.scaleX = 1;
var e = this;
this.nowresname = this.skin + [ "_d_2", "_l_2", "_u_2", "_l_2" ][this.nowframe];
cc.resources.load("allrole/" + this.nowresname, cc.SpriteFrame, function(t, i) {
!t && e.isValid && (e.sp_role.spriteFrame = i);
});
}
}
} else if (this.node.isplayer || this.isfenshen) this.updateaniplayer(t); else {
var i = this.fx, s = this.objdata.dir.x, n = this.objdata.dir.y, a = 1, o = "";
if (Math.abs(s) > Math.abs(n)) {
if (s > 0) {
a = -1;
this.fx = 1;
} else this.fx = 2;
o = "_l_";
} else if (n > 0) {
this.fx = 3;
o = "_u_";
} else {
this.fx = 4;
o = "_d_";
}
if (i != this.fx) {
this.framename = o;
this.nowframe = 0;
this.frametime = 0;
this.sp_role.node.scaleX = a;
this.changeframe();
}
this.frametime += t;
if (this.frametime >= .16) {
this.frametime = 0;
this.nowframe++;
this.nowframe %= this.framecount;
this.changeframe();
}
}
},
updateshadow: function(t) {
if (this.shadow) {
this.shadowtime -= t;
if (this.shadowtime <= 0) {
if (this.node.x == this.oldx && this.node.y == this.oldy) return;
this.oldx = this.node.x;
this.oldy = this.node.y;
cc.gameMgr.resmgr.createshadow(this);
this.shadowtime = .05 * this.objdata.timescale;
}
}
},
addbuff: function(t) {
for (var e = 0; e < t.length; e++) {
var i = t[e], s = i.bid, n = a[s];
if (n.shadow) {
this.shadow = !0;
this.shadowtime = 0;
}
n.mohu && cc.gameMgr.resmgr.effmohu(n.life);
n.rani && (this.frametime = 1);
var c = n.res;
if (c) {
var r = 9999999;
n.aniduli && (r = void 0);
(l = cc.gameMgr.resmgr.createeff(c, r)).x = 0;
l.y = l.ctrl.anioffy;
if (n.resfz) {
l.anchorY = 0;
this.sp_role.node.addChild(l);
} else n.resdown ? this.nd_shadow.addChild(l) : this.node.addChild(l);
n.aniduli || (this.buffmap[s] = l);
}
if (n.icon && !this.bufficon[s]) {
var l = cc.gameMgr.resmgr.createbufficon(i);
this.nd_bufficon.addChild(l);
this.bufficon[s] = l;
}
n.rotatemode && this.rotatemode++;
if (n.buff_effect & o.fying) {
this.fyscale = 1;
this.fyfx = !0;
this.sp_role.node.scaleX = this.sp_role.node.scaleY = 1;
}
}
},
updateflag: function() {
if (this.objdata.flagyongchang) {
cc.soundMgr.playSound("skill1");
this.pr_yc.node.active = !0;
this.pr_yc.progress = 0;
this.lb_skillname.string = this.objdata.ycskill.cfg.name;
}
this.addbuff(this.objdata.flagaddbuff);
for (var t = 0; t < this.objdata.flagremovebuff.length; t++) {
var e = this.objdata.flagremovebuff[t], n = a[e];
n.shadow && (this.shadow = !1);
n.rotatemode && this.rotatemode--;
n.mohu && cc.gameMgr.resmgr.effmohuover();
if (this.buffmap[e]) {
this.buffmap[e].ctrl.lifetime = 0;
this.buffmap[e] = null;
}
if (this.bufficon[e]) {
cc.gameMgr.resmgr.recoverbufficon(this.bufficon[e]);
this.bufficon[e] = null;
}
if (n.buff_effect & o.fying) {
this.fyscale = 1;
this.fyfx = !0;
this.sp_role.node.scaleX = this.sp_role.node.scaleY = 1;
this.fx = -1;
}
}
var r = this.objdata.flaguseskill;
if (r) {
var l = i[r.id], h = 0, p = 1;
if (l.waniid || l.addani) if (this.objdata.dir.cross(c) < 0) {
h = s.getanglebydir(this.objdata.dir) - 180;
p = -1;
} else h = s.getanglebydir(this.objdata.dir);
if (l.waniid) {
(d = cc.gameMgr.resmgr.createweapon({
id: l.waniid,
parent: cc.gameMgr.ndeff,
icon: this.objdata.wicon,
scale: this.logicscale,
follow: this.node
})).angle = h;
d.scaleX *= p;
}
if (l.addani) {
(d = cc.gameMgr.resmgr.createeff(l.addani)).x = this.node.x + this.objdata.dir.x * l.addaniposadd;
d.y = this.node.y + this.objdata.dir.y * l.addaniposadd;
d.angle = h;
l.addaniscale && (d.scale = l.addaniscale);
d.scaleX *= p;
cc.gameMgr.ndeff.addChild(d);
}
if (cc.battledebug && 1 == l.type) {
var d, u = l.distance;
(d = cc.instantiate(cc.gameMgr.resmgr.pb_debugbox)).x = this.node.x;
d.y = this.node.y;
cc.gameMgr.ndeff.addChild(d);
var f = d.getComponent("debugbox");
1 == l.hittype ? f.initbox(l.height, l.width, s.getanglebydir(this.objdata.dir)) : f.initview(l.range, u, this.objdata.dir);
}
}
},
doupdate: function(t) {
t *= this.objdata.timescale;
this.node.x = this.objdata.x;
this.node.y = this.objdata.y;
this.updateflag(t);
this.objdata.yctime > 0 ? this.pr_yc.progress = 1 - this.objdata.getycbili() : this.pr_yc.node.active = !1;
if (1 != this.objdata.camp) {
var e = cc.gameMgr, i = this.node.x - e.player.x, s = this.node.y - e.player.y;
if (Math.abs(i) > e.viewwidth || Math.abs(s) > e.viewhight) {
this.objdata.inview = !1;
this.node.opacity = 0;
} else {
this.objdata.inview = !0;
this.node.opacity = 255;
}
} else this.objdata.inview = !0;
for (var n = this.objdata.dmgarr, a = n.length - 1; a >= 0; a--) cc.gameMgr.resmgr.createhurtlb(n[a], this.node.position, this.objdata);
this.updateani(t);
this.updateshadow(t);
if (this.objdata.deadinthisframe) if (this.node.isplayer) {
cc.Notifier.emit("playerdie");
this.deadtime = 1;
} else {
this.cleanbuff();
if (1 == this.objdata.deadtype) this.deadtime = 1; else if (cc.isyuansheng || cc.autoatk || cc.notani) this.deadtime = 1; else {
this.nd_shadow.opacity = 0;
cc.gameMgr.resmgr.createdead(this, this.objdata.deadfx);
this.nd_shadow.opacity = 180;
}
}
if (this.objdata.flagbuzhuo) {
this.deadtime = 0;
this.sp_role.node.scale = 1;
this.flagbuzhuo = !0;
}
this.objdata.reborninthiframe && (this.reborntime = 1);
this.objdata.isdead() && (this.node.opacity = 0);
if (this.deadtime > 0) {
this.deadtime -= t;
this.node.opacity = 255 * this.deadtime;
}
if (this.reborntime > 0) {
this.reborntime -= t;
this.node.opacity = 255 * (1 - this.reborntime);
}
if (this.flagbuzhuo && this.sp_role.node.scale > 0) {
this.sp_role.node.scale -= 2.5 * t;
this.node.opacity = 255;
}
if (this.objdata.flagfuhuo) {
this.deadtime = 0;
this.node.opacity = 255;
}
},
updateactive: function() {
this.objdata.flagskillchange && cc.Notifier.emit("onchangeskill", this.objdata);
this.objdata.flagchangeuserskill && cc.Notifier.emit("onchangeuserskill", this.objdata);
this.objdata.flagskillcd.length > 0 && cc.Notifier.emit("onskillcd", this.objdata);
this.objdata.flagweaponchange && cc.gameMgr.resmgr.createweapon({
id: 1,
parent: cc.gameMgr.ndeff,
icon: this.objdata.wicon,
scale: this.logicscale,
follow: this.node
});
},
cleanbuff: function() {
for (var t in this.buffmap) this.buffmap[t] && (this.buffmap[t].ctrl.lifetime = 0);
for (var t in this.bufficon) this.bufficon[t] && cc.gameMgr.resmgr.recoverbufficon(this.bufficon[t]);
this.buffmap = {};
this.bufficon = {};
},
clean: function() {
this.node.opacity = 255;
this.rotatemode = 0;
this.objdata = null;
this.cleanbuff();
}
});
cc._RF.pop();
}, {
Utils: "Utils",
buffcfg: "buffcfg",
gameConfig: "gameConfig",
skillcfg: "skillcfg"
} ],
quadtree: [ function(t, e) {
"use strict";
cc._RF.push(e, "e0b7ey8Hx5FcoCADRWKo9YI", "quadtree");
function i(t, e, i, s) {
this.max_objects = e || 10;
this.max_levels = i || 4;
this.level = s || 0;
this.bounds = t;
this.objects = [];
this.nodes = [];
}
i.prototype.split = function() {
var t = this.level + 1, e = this.bounds.width / 2, s = this.bounds.height / 2, n = this.bounds.x, a = this.bounds.y;
this.nodes[0] = new i({
x: n + e,
y: a,
width: e,
height: s
}, this.max_objects, this.max_levels, t);
this.nodes[1] = new i({
x: n,
y: a,
width: e,
height: s
}, this.max_objects, this.max_levels, t);
this.nodes[2] = new i({
x: n,
y: a + s,
width: e,
height: s
}, this.max_objects, this.max_levels, t);
this.nodes[3] = new i({
x: n + e,
y: a + s,
width: e,
height: s
}, this.max_objects, this.max_levels, t);
};
i.prototype.getIndex = function(t) {
var e = [], i = this.bounds.x + this.bounds.width / 2, s = this.bounds.y + this.bounds.height / 2, n = t.y < s, a = t.x < i, o = t.x + t.width > i, c = t.y + t.height > s;
n && o && e.push(0);
a && n && e.push(1);
a && c && e.push(2);
o && c && e.push(3);
return e;
};
i.prototype.insert = function(t) {
var e, i = 0;
if (this.nodes.length) {
e = this.getIndex(t);
for (i = 0; i < e.length; i++) this.nodes[e[i]].insert(t);
} else {
this.objects.push(t);
if (this.objects.length > this.max_objects && this.level < this.max_levels) {
this.nodes.length || this.split();
for (i = 0; i < this.objects.length; i++) {
e = this.getIndex(this.objects[i]);
for (var s = 0; s < e.length; s++) this.nodes[e[s]].insert(this.objects[i]);
}
this.objects = [];
}
}
};
i.prototype.retrieve = function(t) {
var e = this.getIndex(t), i = this.objects;
if (this.nodes.length) for (var s = 0; s < e.length; s++) i = i.concat(this.nodes[e[s]].retrieve(t));
return i = i.filter(function(t, e) {
return i.indexOf(t) >= e;
});
};
i.prototype.clear = function() {
this.objects = [];
for (var t = 0; t < this.nodes.length; t++) this.nodes.length && this.nodes[t].clear();
this.nodes = [];
};
function s(t, e) {
return t.x >= e.x && t.x + width <= e.x + e.width && t.y >= e.y && t.y + t.height <= e.y + e.height;
}
i.prototype.refresh = function(t) {
var e, i, n, a, o = this.objects;
t = t || this;
for (n = o.length - 1; n >= 0; n--) {
e = o[n];
i = this.getIndex(e);
s(e, this.bounds) ? this.nodes.length && this.nodes[i].insert(o.splice(n, 1)[0]) : this !== t && t.insert(o.splice(n, 1)[0]);
}
for (n = 0, a = this.nodes.length; n < a; n++) this.nodes[n].refresh(t);
};
e.exports = i;
cc._RF.pop();
}, {} ],
sceneguaji: [ function(t, e) {
"use strict";
cc._RF.push(e, "846b4TwxI5MDZ4F1msTQMOy", "sceneguaji");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
cc.playerData.update(99);
cc.director.loadScene("game");
}
});
cc._RF.pop();
}, {} ],
sdkanzhuo: [ function(t, e) {
"use strict";
cc._RF.push(e, "94317X+/S1APZTeE20vnFzp", "sdkanzhuo");
e.exports = function() {
this.launchtime = new Date().getTime();
this.adstarttime = new Date().getTime();
this.chtime = 0;
this.initPlatform = function() {
cc.Notifier.on("ysadsuccess", this, this.aabbcc.bind(this));
cc.Notifier.on("ysadfail", this, this.ddeeff.bind(this));
};
this.aabbcc = function() {
if (!(new Date().getTime() - this.adstarttime < 3e3)) {
this.successcb && this.successcb();
this.successcb = null;
}
};
this.ddeeff = function(t) {
cc.uiHelper && cc.uiHelper.showTips(t);
this.failcb && this.failcb();
this.failcb = null;
};
this.addchaping = function() {
var t = new Date().getTime();
if (t - this.launchtime < 3e4) {
console.log("刚启动时不能加载");
return null;
}
if (t - this.chtime < 6e4) {
console.log("不能连续插屏");
return null;
}
this.chtime = t;
this.calljava("addchaping");
};
this.init = function() {};
this.adWatch = function(t, e) {
this.adstarttime = new Date().getTime();
this.successcb = t;
this.failcb = e;
this.calljava("adWatch");
};
this.banner = function() {
this.calljava("banner");
};
this.fixclosebanner = function() {
this.calljava("closebanner");
};
this.closebanner = function() {
this.calljava("closebanner");
};
this.cleangd = function() {
this.fixclosebanner();
};
this.hutuibanner = function() {};
this.openhutui = function() {
return !1;
};
this.closehutuibanner = function() {};
this.hutui9gong = function() {};
this.desktopicon = function() {};
this.checkhasicon = function() {};
this.calljava = function(t) {
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "jstojava", "(Ljava/lang/String;)V", t);
};
this.needys = function() {
return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "needys", "()Z");
};
this.endgame = function() {
this.calljava("endgame");
};
this.yslogin = function() {
this.calljava("yslogin");
};
this.savecloud = function(t) {
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "savecloud", "(Ljava/lang/String;)V", t);
};
this.loadcloud = function() {
this.calljava("loadcloud");
};
};
cc._RF.pop();
}, {} ],
sdkhuawei: [ function(t, e) {
"use strict";
cc._RF.push(e, "4a56fhCA9BM3or511Om1/ar", "sdkhuawei");
t("httpclient"), t("urlbuilder");
e.exports = function() {
this.launchtime = new Date().getTime();
this.ysadid = "";
this.bannerid = "d2mhelcvv3";
this.hutuibannerid = "";
this.hutui9gongid = "";
this.videoid = "t1zakopbh6";
this.cpid = "";
this.gettimekey = function() {
var t = new Date();
return t.getMonth() + "-" + t.getDate();
};
this.initPlatform = function() {};
this.addchaping = function() {};
this.init = function() {};
this.adWatch = function(t, e) {
this.addoing = !0;
var i = this, s = qg.createRewardedVideoAd({
adUnitId: i.videoid
});
s.load();
i.adsucess = t;
i.adfail = e;
if (!this.initad) {
this.initad = !0;
s.onLoad(function() {
console.log("激励视频加载成功");
i.addoing = !1;
s.show();
});
s.onError(function(t) {
i.addoing = !1;
console.log(t);
cc.uiHelper.showTips("暂无可播放的视频");
i.adfail && i.adfail();
});
s.onClose(function(t) {
console.log(t);
i.addoing = !1;
if (t.isEnded) {
try {
i.adsucess && i.adsucess();
} catch (t) {}
console.log("激励视频广告完成，发放奖励");
} else {
console.log("激励视频广告取消关闭，不发放奖励");
cc.uiHelper && cc.uiHelper.showTips("看完广告才有奖励");
i.adfail && i.adfail();
}
});
}
};
this.banner = function() {
this.closebanner();
var t = qg.getSystemInfoSync().safeArea.height;
this.customAd = qg.createBannerAd({
adUnitId: this.bannerid,
style: {
top: t - 57,
left: 0,
height: 57,
width: 360
}
});
this.customAd.show();
};
this.fixclosebanner = function() {
this.closebanner();
};
this.closebanner = function() {
if (this.customAd) {
this.customAd.destroy();
this.customAd = null;
}
};
this.openhutui = function() {
return !1;
};
this.closehutuibanner = function() {};
this.hutui9gong = function() {};
this.desktopicon = function(t) {
window.qg ? qg.hasShortcutInstalled({
success: function(e) {
0 == e && qg.installShortcut({
success: function() {
t && t();
},
fail: function() {},
complete: function() {}
});
},
fail: function() {},
complete: function() {}
}) : t();
};
this.checkhasicon = function(t) {
qg.hasShortcutInstalled && qg.hasShortcutInstalled({
success: function(e) {
0 == e && t && t();
},
fail: function() {},
complete: function() {}
});
};
this.cleangd = function() {
this.rsloading = !1;
this.fixclosebanner();
};
this.needys = function() {
return !0;
};
this.endgame = function() {
qg.exitApplication({
success: function() {
console.log("exitApplication success");
},
fail: function() {
console.log("exitApplication fail");
},
complete: function() {
console.log("exitApplication complete");
}
});
};
this.yslogin = function() {
console.log("Sign-in");
qg.gameLoginWithReal({
forceLogin: 1,
appid: "107119705",
success: function() {
cc.Notifier.emit("yslogin");
console.log("zjj loginsuccess");
},
fail: function(t, e) {
console.log("zjj game login with real fail:" + t + ", code:" + e);
cc.Notifier.emit("showloginbtn");
}
});
};
this.zhuzhuoquan = function() {
return "  著作权人:朱俊捷";
};
};
cc._RF.pop();
}, {
httpclient: "httpclient",
urlbuilder: "urlbuilder"
} ],
sdkoppo: [ function(t, e) {
"use strict";
cc._RF.push(e, "db81dbdksFMuLBc3MqiMiB2", "sdkoppo");
t("httpclient"), t("urlbuilder");
e.exports = function() {
this.nativeclickbtnswitch = !1;
this.nativecountlimit = !1;
this.nativetimelimit = 0;
this.nativeimageswitch = !0;
this.bannerswitch = !0;
this.launchtime = new Date().getTime();
this.bannertime = 0;
this.yuanshengtime = 0;
this.ysadid = "627002";
this.bannerid = "626214";
this.hutuibannerid = "626658";
this.hutui9gongid = "626665";
this.videoid = "626217";
this.cpid = "";
this.yuanshengarr = [];
this.ysins = null;
this.gettimekey = function() {
var t = new Date();
return t.getMonth() + "-" + t.getDate();
};
this.initPlatform = function() {
qg.reportMonitor && qg.reportMonitor("game_scene", 0);
};
this.addchaping = function() {};
this.init = function() {};
this.adWatch = function(t, e) {
this.addoing = !0;
var i = this, s = qg.createRewardedVideoAd({
adUnitId: i.videoid
});
s.load();
i.adsucess = t;
i.adfail = e;
if (!this.initad) {
this.initad = !0;
s.onLoad(function() {
console.log("激励视频加载成功");
i.addoing = !1;
s.show();
});
s.onError(function(t) {
i.addoing = !1;
console.log(t);
cc.uiHelper.showTips("暂无可播放的视频");
i.adfail && i.adfail();
});
s.onClose(function(t) {
console.log(t);
i.addoing = !1;
if (t.isEnded) {
try {
i.adsucess && i.adsucess();
} catch (t) {}
console.log("激励视频广告完成，发放奖励");
} else {
console.log("激励视频广告取消关闭，不发放奖励");
cc.uiHelper && cc.uiHelper.showTips("看完广告才有奖励");
i.adfail && i.adfail();
}
});
}
};
this.banner = function() {
this.closebanner();
var t = qg.createCustomAd({
adUnitId: this.ysadid
});
t.show().then(function() {
console.log("show success");
}).catch(function(t) {
console.log("show fail with:" + t.errCode + "," + t.errMsg);
});
this.customAd = t;
};
this.fixclosebanner = function() {
this.closebanner();
};
this.closebanner = function() {
if (this.customAd) {
this.customAd.destroy();
this.customAd = null;
}
};
this.hutuibanner = function() {
if (qg.getSystemInfoSync().platformVersionCode >= 1076) {
this.gameBannerAd = qg.createGameBannerAd({
adUnitId: this.hutuibannerid
});
this.gameBannerAd.show().then(function() {
console.log("show success");
}).catch(function(t) {
console.log("show fail with:" + t.errCode + "," + t.errMsg);
});
} else console.log("快应用平台版本号低于1076，暂不支持互推盒子相关 API");
};
this.openhutui = function() {
return !!qg.createGamePortalAd;
};
this.closehutuibanner = function() {
this.gameBannerAd && this.gameBannerAd.hide().then(function() {
console.log("hide success");
}).catch(function(t) {
console.log("hide fail with:" + t.errCode + "," + t.errMsg);
});
};
this.hutui9gong = function() {
if (qg.getSystemInfoSync().platformVersionCode >= 1076) {
var t = qg.createGamePortalAd({
adUnitId: this.hutui9gongid
});
t.load().then(function() {
console.log("load success");
t.show().then(function() {
console.log("show success");
}).catch(function(t) {
console.log("show fail with:" + t.errCode + "," + t.errMsg);
});
}).catch(function(t) {
console.log("load fail with:" + t.errCode + "," + t.errMsg);
});
} else console.log("快应用平台版本号低于1076，暂不支持互推盒子相关 API");
};
this.desktopicon = function(t) {
window.qg ? qg.hasShortcutInstalled({
success: function(e) {
0 == e && qg.installShortcut({
success: function() {
t && t();
},
fail: function() {},
complete: function() {}
});
},
fail: function() {},
complete: function() {}
}) : t();
};
this.checkhasicon = function(t) {
window.qg ? qg.hasShortcutInstalled && qg.hasShortcutInstalled({
success: function(e) {
0 == e && t && t();
},
fail: function() {},
complete: function() {}
}) : t();
};
this.reportadclick = function(t) {
this.ysins.reportAdClick({
adId: t
});
};
this.reportadshow = function(t) {
this.ysins.reportAdShow({
adId: t
});
};
this.getdelay = function() {
return this.addelay;
};
this.cleangd = function() {
this.rsloading = !1;
this.fixclosebanner();
};
this.needys = function() {
return !0;
};
};
cc._RF.pop();
}, {
httpclient: "httpclient",
urlbuilder: "urlbuilder"
} ],
sdkvivo: [ function(t, e) {
"use strict";
cc._RF.push(e, "43edaPaeM9PiJU7F51kEFs3", "sdkvivo");
t("httpclient"), t("urlbuilder");
e.exports = function() {
this.nativeclickbtnswitch = !1;
this.nativecountlimit = !1;
this.nativetimelimit = 0;
this.nativeimageswitch = !0;
this.bannerswitch = !0;
this.launchtime = new Date().getTime();
this.bannertime = 0;
this.yuanshengtime = 0;
this.chapingtime = 0;
this.ysadid = "dcc2ed96ac6e4af8a7c186076e22e89c";
this.bannerid = "ee214e087ad5452a9e7f2365f8a3a52f";
this.hutuibannerid = "618cba5cc1f64e7bb952f1c5ae6fd509";
this.hutui9gongid = "80bedb1eed9b4bb097549f39f4566c6e";
this.videoid = "1799885e76804ed2b7847e7e45d14a3b";
this.cpid = "07cd5548d80d41968f5a9b8bc344afc4";
this.gettimekey = function() {
var t = new Date();
return t.getMonth() + "-" + t.getDate();
};
this.initPlatform = function() {
qg.reportMonitor && qg.reportMonitor("game_scene", 0);
};
this.addchaping = function() {};
this.init = function() {};
this.adWatch = function(t, e) {
var i = this, s = qg.createRewardedVideoAd({
posId: i.videoid
});
i.adsucess = t;
i.adfail = e;
s.onLoad(function() {
console.log("激励视频加载成功");
s.show().then(function() {
console.log("激励视频广告展示完成");
cc.soundMgr.adwatching();
}).catch(function() {
console.log("激励视频广告展示失败");
i.adfail && i.adfail();
});
});
s.onError(function() {
cc.uiHelper.showTips("暂无可播放的视频");
if (i.adfail) {
i.adfail();
i.adfail = null;
}
});
s.onClose(function(t) {
cc.soundMgr.adwatchover();
console.log(t);
if (t.isEnded) {
try {
if (i.adsucess) {
i.adsucess();
i.adsucess = null;
}
} catch (t) {}
console.log("激励视频广告完成，发放奖励");
} else {
console.log("激励视频广告取消关闭，不发放奖励");
cc.uiHelper && cc.uiHelper.showTips("看完广告才有奖励");
if (i.adfail) {
i.adfail();
i.adfail = null;
}
}
});
this.initad ? s.load() : this.initad = !0;
};
this.banner = function() {
this.closebanner();
if (qg.createCustomAd) {
var t = qg.createCustomAd({
posId: this.ysadid
});
t.onError(function(t) {
console.log("原生模板广告加载失败", t);
});
t.show().then(function() {
console.log("原生模板广告展示完成");
}).catch(function(t) {
console.log("原生模板广告展示失败", JSON.stringify(t));
});
this.customAd = t;
}
};
this.fixclosebanner = function() {
this.closebanner();
};
this.closebanner = function() {
if (this.customAd) {
this.customAd.destroy();
this.customAd = null;
}
};
this.openhutui = function() {
return !1;
};
this.closehutuibanner = function() {
this.gameBannerAd && this.gameBannerAd.hide().then(function() {
console.log("hide success");
}).catch(function(t) {
console.log("hide fail with:" + t.errCode + "," + t.errMsg);
});
};
this.hutui9gong = function() {
if (qg.createBoxBannerAd) {
boxBannerAd = qg.createBoxBannerAd({
posId: this.hutui9gongid
});
boxBannerAd.onError(function(t) {
console.log("盒子横幅广告加载失败", t);
});
boxBannerAd.show().then(function() {
console.log("show success");
});
} else console.log("暂不支持互推盒子相关 API");
};
this.desktopicon = function(t) {
window.qg ? qg.hasShortcutInstalled({
success: function(e) {
0 == e && qg.installShortcut({
success: function() {
t && t();
},
fail: function() {},
complete: function() {}
});
},
fail: function() {},
complete: function() {}
}) : t();
};
this.checkhasicon = function(t) {
window.qg ? qg.hasShortcutInstalled && qg.hasShortcutInstalled({
success: function(e) {
0 == e && t && t();
},
fail: function() {},
complete: function() {}
}) : t();
};
this.getdelay = function() {
return this.addelay;
};
this.cleangd = function() {
this.rsloading = !1;
this.fixclosebanner();
};
this.needys = function() {
return !0;
};
};
cc._RF.pop();
}, {
httpclient: "httpclient",
urlbuilder: "urlbuilder"
} ],
sdkwx: [ function(t, e) {
"use strict";
cc._RF.push(e, "8314bldmqxLHK/BQ/lzRzHi", "sdkwx");
e.exports = function() {
this.launchtime = new Date().getTime();
this.bannercount = 0;
this.bannerid = "adunit-be744d3dcfada8cd";
this.videoid = "adunit-7846fb76ebcfa527";
this.cpid = "adunit-0c7a54da598c75ef";
this.ysad = "adunit-766ee715bf32e033";
this.chtime = 0;
this.gettimekey = function() {
var t = new Date();
return t.getMonth() + "-" + t.getDate();
};
this.initPlatform = function() {
wx.showShareMenu({
withShareTicket: !1,
menus: [ "shareAppMessage" ]
});
wx.onShareAppMessage(function() {
return {
title: "不服来战啊",
imageUrl: ""
};
});
this.interstitialAd = null;
wx.createInterstitialAd && (this.interstitialAd = wx.createInterstitialAd({
adUnitId: this.cpid
}));
};
this.addchaping = function() {
var t = new Date().getTime();
if (t - this.launchtime < 3e4) {
console.log("刚启动时不能加载");
return null;
}
this.chtime = t;
this.interstitialAd && this.interstitialAd.show().catch(function(t) {
console.error(t);
});
};
this.init = function() {};
this.adWatch = function(t, e) {
if (this.addoing) console.log("ad playing"); else {
this.addoing = !0;
var i = this, s = wx.createRewardedVideoAd({
adUnitId: this.videoid
});
if (!this.bindadload) {
s.onLoad(function() {
i.hasloading = !0;
console.log("adload111111111111111");
});
this.bindadload = !0;
}
if (this.hasloading) {
s.show().catch(function() {
i.addoing = !1;
i.hasloading = !1;
cc.uiHelper.showTips("暂无可播放的视频");
});
this.hasloading = !1;
} else s.load().then(function() {
s.show();
i.hasloading = !1;
}).catch(function(t) {
i.addoing = !1;
console.log(t);
});
this.ADerrorCb && s.offError(this.ADerrorCb);
this.ADgetFun && s.offClose(this.ADgetFun);
this.ADerrorCb = function() {
i.addoing = !1;
try {
e && e();
} catch (t) {}
e = null;
cc.uiHelper.showTips("暂无可播放的视频");
s.offError(this);
i.ADerrorCb = null;
i.hasloading = !1;
};
s.onError(this.ADerrorCb);
this.ADgetFun = function(n) {
i.addoing = !1;
i.hasloading = !1;
if (n.isEnded) {
try {
t && t();
} catch (t) {}
t = null;
} else {
cc.uiHelper.showTips("看完广告才有奖励");
try {
e && e();
} catch (t) {}
e = null;
}
s.offClose(this);
i.ADgetFun = null;
};
s.onClose(this.ADgetFun);
}
};
this.banner = function() {
this.destroyyouxiquan();
this.bannercount++;
if (this.adbanner) {
this.adbanner.destroy();
this.adbanner = null;
}
var t = wx.getSystemInfoSync(), e = t.windowWidth, i = t.windowHeight, s = this.bannerid, n = wx.createBannerAd({
adUnitId: s,
style: {
left: 0,
top: 0,
width: 100
}
});
n.onResize(function() {
n.style.left = e / 2 - n.style.realWidth / 2 + .1;
n.style.top = i - n.style.realHeight + .1;
});
n.onLoad(function() {
console.log("banner 广告加载成功");
n.show();
});
n.onError(function(t) {
console.log(t);
});
this.adbanner = n;
};
this.fixclosebanner = function() {
this.bannercount = 0;
if (this.adbanner) {
this.adbanner.destroy();
this.adbanner = null;
}
};
this.closebanner = function() {
this.bannercount--;
if (this.bannercount <= 0 && this.adbanner) {
this.adbanner.destroy();
this.adbanner = null;
}
cc.battling || this.youxiquan();
};
this.cleangd = function() {
this.fixclosebanner();
};
this.hutuibanner = function() {};
this.openhutui = function() {
return !1;
};
this.closehutuibanner = function() {};
this.hutui9gong = function() {};
this.desktopicon = function() {};
this.checkhasicon = function() {};
this.youxiquan = function() {
if (!(this.bannercount > 0)) {
this.yxqshow = !0;
if (this.game_quan_btn) {
this.game_quan_btn.show();
this.customAd && this.customAd.show().then(function() {
return console.log("原生模板广告显示");
});
}
}
};
this.destroyyouxiquan = function() {
this.yxqshow = !1;
this.game_quan_btn && this.game_quan_btn.hide();
if (this.customAd) {
this.customAd.hide();
console.log("原生模板广告隐藏2");
}
};
this.cocosready = function() {
wx.hideLoading();
try {
GameGlobal.LoadingManager.destroy().then(function() {});
} catch (t) {}
};
this.desys = function() {
this.customAd && this.customAd.destroy();
this.customAd = null;
};
this.showys = function(t) {
var e = this;
this.desys();
var i = wx.getSystemInfoSync(), s = i.windowWidth, n = (i.windowHeight, s / cc.winSize.width), a = t.width * n, o = t.height * n, c = t.parent.convertToWorldSpaceAR(t.position);
c.y = cc.winSize.height - c.y;
if (wx.createCustomAd) {
this.customAd = wx.createCustomAd({
adUnitId: this.ysad,
left: c.x * n - a / 2,
top: c.y * n - o / 2 + 10,
fixed: !1
});
this.customAd.onLoad(function() {
return console.log("原生模板广告加截成功");
});
this.yxqshow && this.customAd.show().then(function() {
if (e.yxqshow) console.log("原生模板广告显示"); else {
e.customAd.hide();
console.log("原生模板广告隐藏1");
}
});
}
};
};
cc._RF.pop();
}, {} ],
sdkzj: [ function(t, e) {
"use strict";
cc._RF.push(e, "476b4+rJhtBDr9uoh4EKFTp", "sdkzj");
e.exports = function() {
this.pushgameswitch = !1;
this.nativeclickbtnswitch = !1;
this.nativecountlimit = !1;
this.nativetimelimit = 0;
this.addelay = 1;
this.nativeimageswitch = !0;
this.bannerswitch = !0;
this.launchtime = new Date().getTime();
this.bannertime = 0;
this.yuanshengtime = 0;
this.bannercount = 0;
this.ysicon = "";
this.ysbanner = "";
this.bannerid = "c7ac8967jfe67kc5ka";
this.hutuibannerid = "";
this.hutui9gongid = "";
this.videoid = "669lj5m2f2aigqq546";
this.cpid = "3ed257kk0h668dfi3f";
this.chtime = 0;
this.gettimekey = function() {
var t = new Date();
return t.getMonth() + "-" + t.getDate();
};
this.dowudian = function() {
return !1;
};
this.initPlatform = function() {
var t = this;
tt.showShareMenu({
withShareTicket: !1,
menus: [ "shareAppMessage" ]
});
tt.onShareAppMessage(function() {
return {
title: "不服来战啊",
imageUrl: ""
};
});
tt.getGameRecorderManager().onStop(function(e) {
t.videoPath = e.videoPath;
t.recording = !1;
if (new Date().getTime() - t.starttime < 3e3) {
cc.Notifier.emit("videoPathfail");
cc.uiHelper.showTips("录屏时间不能小于3秒");
} else cc.Notifier.emit("videoPath", e.videoPath);
});
tt.getGameRecorderManager().onError(function() {
cc.Notifier.emit("videoPathfail");
t.recording = !1;
cc.uiHelper.showTips("录屏失败");
});
};
this.addchaping = function() {
tt.showFavoriteGuide && tt.showFavoriteGuide({
type: "bar",
position: "bottom",
success: function() {
console.log("收藏底bar引导组件展示成功");
},
fail: function() {
console.log("收藏底bar引导组件展示失败");
}
});
};
this.init = function() {};
this.adWatch = function(t, e) {
if (this.addoing) console.log("ad playing"); else {
this.adcb = t;
this.adcb2 = e;
this.addoing = !0;
var i = this, s = tt.createRewardedVideoAd({
adUnitId: this.videoid
});
if (!this.bindadload) {
s.onLoad(function() {
i.hasloading = !0;
console.log("adload111111111111111");
});
s.onError(function() {
i.addoing = !1;
try {
i.adcb2 && i.adcb2();
} catch (t) {}
cc.uiHelper.showTips("暂无可播放的视频");
i.hasloading = !1;
});
s.onClose(function(t) {
i.addoing = !1;
i.hasloading = !1;
if (t.isEnded) {
i.chtime = new Date().getTime();
try {
i.adcb && i.adcb();
} catch (t) {}
} else {
cc.uiHelper.showTips("看完广告才有奖励");
try {
i.adcb2 && i.adcb2();
} catch (t) {}
}
});
this.bindadload = !0;
}
if (this.hasloading) {
s.show().catch(function() {
i.addoing = !1;
i.hasloading = !1;
cc.uiHelper.showTips("暂无可播放的视频");
});
this.hasloading = !1;
} else s.load().then(function() {
s.show();
i.hasloading = !1;
}).catch(function(t) {
i.addoing = !1;
console.log(t);
});
}
};
this.banner = function() {
cc.luping && (cc.luping.active = !1);
this.bannercount++;
if (this.adbanner) {
this.adbanner.destroy();
this.adbanner = null;
}
var t = this, e = tt.getSystemInfoSync(), i = e.windowWidth, s = e.windowHeight, n = this.bannerid, a = tt.createBannerAd({
adUnitId: n,
style: {
width: 200,
top: s - 112.5
}
});
a.onResize(function(t) {
console.log(t.width, t.height);
a.style.top = s - t.height;
a.style.left = (i - t.width) / 2;
});
a.onLoad(function() {
console.log("banner 广告加载成功");
t.bannercount > 0 && a.show();
});
a.onError(function(t) {
console.log(t);
});
this.adbanner = a;
};
this.fixclosebanner = function() {
this.bannercount = 0;
if (this.adbanner) {
this.adbanner.destroy();
this.adbanner = null;
}
};
this.closebanner = function() {
cc.luping && (cc.luping.active = !0);
this.bannercount--;
if (this.bannercount <= 0 && this.adbanner) {
this.adbanner.destroy();
this.adbanner = null;
}
};
this.cleangd = function() {
this.fixclosebanner();
};
this.hutuibanner = function() {};
this.openhutui = function() {
return !1;
};
this.closehutuibanner = function() {};
this.hutui9gong = function() {};
this.desktopicon = function() {};
this.checkhasicon = function() {};
this.startluping = function() {
if (!this.recording) {
this.recording = !0;
this.videoPath = null;
this.starttime = new Date().getTime();
tt.getGameRecorderManager().start({
duration: 300
});
}
};
this.stopluping = function() {
tt.getGameRecorderManager().stop();
};
this.vedioshare = function() {
tt.shareAppMessage({
title: "像素世界探险",
channel: "video",
extra: {
videoTopics: [ "抖音小游戏", "割草", "刷子游戏", "像素游戏", "像素" ],
videoPath: this.videoPath
},
success: function() {
cc.Notifier.emit("vediosharesucess");
},
fail: function() {
cc.Notifier.emit("vediosharefail");
}
});
};
};
cc._RF.pop();
}, {} ],
setcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "2e66aSnrhJK9IyCwwn2k21O", "setcfg");
cc._RF.pop();
}, {} ],
signals: [ function(t, e) {
"use strict";
cc._RF.push(e, "8694cmVcBtLNZ5eHmNM4HGH", "signals");
(function() {
function t(t, e, i, s, n) {
this._listener = e;
this._isOnce = i;
this.context = s;
this._signal = t;
this._priority = n || 0;
}
t.prototype = {
active: !0,
params: null,
execute: function(t) {
var e, i;
if (this.active && this._listener) {
i = this.params ? this.params.concat(t) : t;
e = this._listener.apply(this.context, i);
this._isOnce && this.detach();
}
return e;
},
detach: function() {
return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
},
isBound: function() {
return !!this._signal && !!this._listener;
},
isOnce: function() {
return this._isOnce;
},
getListener: function() {
return this._listener;
},
getSignal: function() {
return this._signal;
},
_destroy: function() {
delete this._signal;
delete this._listener;
delete this.context;
},
toString: function() {
return "[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]";
}
};
function i(t, e) {
if ("function" != typeof t) throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", e));
}
function s() {
this._bindings = [];
this._prevParams = null;
var t = this;
this.dispatch = function() {
s.prototype.dispatch.apply(t, arguments);
};
}
s.prototype = {
VERSION: "1.0.0",
memorize: !1,
_shouldPropagate: !0,
active: !0,
_registerListener: function(e, i, s, n) {
var a, o = this._indexOfListener(e, s);
if (-1 !== o) {
if ((a = this._bindings[o]).isOnce() !== i) throw new Error("You cannot add" + (i ? "" : "Once") + "() then add" + (i ? "Once" : "") + "() the same listener without removing the relationship first.");
} else {
a = new t(this, e, i, s, n);
this._addBinding(a);
}
this.memorize && this._prevParams && a.execute(this._prevParams);
return a;
},
_addBinding: function(t) {
var e = this._bindings.length;
do {
--e;
} while (this._bindings[e] && t._priority <= this._bindings[e]._priority);
this._bindings.splice(e + 1, 0, t);
},
_indexOfListener: function(t, e) {
for (var i, s = this._bindings.length; s--; ) if ((i = this._bindings[s])._listener === t && i.context === e) return s;
return -1;
},
has: function(t, e) {
return -1 !== this._indexOfListener(t, e);
},
add: function(t, e, s) {
i(t, "add");
return this._registerListener(t, !1, e, s);
},
addOnce: function(t, e, s) {
i(t, "addOnce");
return this._registerListener(t, !0, e, s);
},
remove: function(t, e) {
i(t, "remove");
var s = this._indexOfListener(t, e);
if (-1 !== s) {
this._bindings[s]._destroy();
this._bindings.splice(s, 1);
}
return t;
},
removeAll: function() {
for (var t = this._bindings.length; t--; ) this._bindings[t]._destroy();
this._bindings.length = 0;
},
getNumListeners: function() {
return this._bindings.length;
},
halt: function() {
this._shouldPropagate = !1;
},
dispatch: function(t) {
if (this.active) {
var e, i = Array.prototype.slice.call(arguments), s = this._bindings.length;
this.memorize && (this._prevParams = i);
if (s) {
e = this._bindings.slice();
this._shouldPropagate = !0;
do {
s--;
} while (e[s] && this._shouldPropagate && !1 !== e[s].execute(i));
}
}
},
forget: function() {
this._prevParams = null;
},
dispose: function() {
this.removeAll();
delete this._bindings;
delete this._prevParams;
},
toString: function() {
return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]";
}
};
var n = s;
n.Signal = s;
"function" == typeof define && define.amd ? define(function() {
return n;
}) : "undefined" != typeof e && e.exports ? e.exports = n : (void 0).signals = n;
})();
cc._RF.pop();
}, {} ],
skillcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "566aeZdwMVOdoSfjbUkohRT", "skillcfg");
var i, s = t("enumcfg"), n = s.enumskilltype, a = (s.enumproperty, {
1: {
icon: "Skill_Pierce",
name: "宠物近战",
type: 1,
delay: .15,
cd2: 3,
delayto: .15,
cd: .01,
timeatk: 0,
range: 30,
distance: 30,
atktype: 1,
hurtres: "eff73"
},
2: {
icon: "Skill_Pierce",
name: "宠物远程",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: .01,
cd2: 3,
waniid: 5,
subtype: 1,
dymicbullet: !0,
bulletrule: [ 1, .1, 1, 0, 0, 0, 0, 0, 1 ],
atktype: 1
},
5: {
icon: "Skill_Pierce",
name: "突刺",
type: 1,
learnmask: [],
delay: .15,
cd2: 3,
delayto: .15,
cd: .1,
timeatk: 0,
range: 30,
distance: 40,
waniid: 2,
atktype: 1,
stype: n.sword
},
6: {
icon: "fazhangqiao",
name: "敲击",
type: 1,
learnmask: [],
delay: .1,
delayto: .2,
cd: .01,
cd2: 3,
timeatk: 0,
range: 60,
distance: 50,
waniid: 3,
atktype: 1,
stype: n.staff,
hurtres: "eff91"
},
7: {
icon: "Skill_Slash",
name: "挥砍",
type: 1,
learnmask: [],
delay: .1,
delayto: .2,
cd: .01,
cd2: 3,
timeatk: 0,
range: 60,
distance: 50,
waniid: 3,
atktype: 1,
stype: n.sword,
hurtres: "eff73"
},
8: {
icon: "Skill_BowShot",
name: "射击",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: .01,
cd2: 3,
waniid: 5,
atktype: 1,
subtype: 1,
dymicbullet: !0,
bulletrule: [ 1, .1, 1, 0, 0, 0, 0, 0, 1 ],
hurtres: "eff92",
stype: n.bow
},
9: {
icon: "Skill_ChaosArrow",
name: "扫射",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 45,
waniid: 5,
atktype: 1,
subtype: 1,
dymicbullet: !0,
bulletrule: [ 1, .02, 1, 0, -90, 0, 0, 10, 36 ],
hurtres: "eff92",
stype: n.bow
},
10: {
icon: "Skill_BowSeekShot",
name: "跟踪射击",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 15,
waniid: 5,
atktype: 1,
subtype: 1,
dymicbullet: !0,
bulletrule: [ 1, .05, 2, 0, 0, 30, 0, 0, 5 ],
hurtres: "eff92",
stype: n.bow
},
11: {
icon: "Skill_BowMultiShot",
name: "二连矢",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: .5,
waniid: 5,
atktype: 1,
dymicbullet: !0,
subtype: 1,
bulletrule: [ 1, .1, 1, 0, 0, 0, 0, 0, 2 ],
hurtres: "eff92",
stype: n.bow
},
12: {
icon: "Skill_BowDevastatingShot",
name: "箭雨",
type: 2,
learnmask: [],
wdmg: 1,
delay: .15,
delayto: .15,
cd: 30,
waniid: 5,
atktype: 1,
subtype: 4,
dymicbullet: !0,
bulletrule: [ 5, .1, 1, -200, 300, 0, 50 ],
bulletlvrule: {
lvcount: 10
},
hurtres: "eff92",
stype: n.bow
},
13: {
icon: "Skill_BowRapidShot",
name: "多重射击",
type: 2,
learnmask: [],
wdmg: 1,
delay: 2,
delayto: .15,
cd: 30.15,
waniid: 5,
atktype: 1,
subtype: 1,
dymicbullet: !0,
bulletrule: [ 3, .2, 0, 10 ],
template: [ [ 1, 0, 0, 0 ], [ 1, 0, 10, 0 ], [ 1, 0, -10, 0 ] ],
hurtres: "eff92",
stype: n.bow
},
14: {
icon: "Skill_Decapitation",
name: "暗黑十字",
type: 2,
learnmask: [],
delay: .5,
delayto: 0,
cd: 15,
waniid: 5,
atktype: 1,
subtype: 2,
bullets: [ {
t: 0,
b: [ [ 6, 0, 0 ] ]
} ],
stype: n.sword
},
15: {
icon: "Skill_Pierce",
name: "杀气缠绕",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 31.1,
waniid: 2,
atktype: 1,
subtype: 3,
bullets: [ {
t: 0,
b: [ [ 7, 0, 0 ] ]
} ]
},
16: {
icon: "Skill_Decapitation",
name: "高速斩",
type: 1,
learnmask: [],
delay: .5,
delayto: 0,
cd: 30,
atktype: 1,
timeatk: .2,
atkcount: 5,
wdmg: .5,
hittype: 1,
width: 50,
height: 100,
aoe: !0,
addani: "eff6",
addaniposadd: 60,
stype: n.sword
},
17: {
icon: "Skill_LeapAttack",
name: "回旋斩",
type: 2,
learnmask: [],
atktype: 1,
delay: .15,
delayto: .15,
cd: 1.5,
waniid: 4,
subtype: 3,
bullets: [ {
t: 0,
b: [ [ 8, 0, 0 ] ]
} ],
wdmg: 1,
stype: n.sword
},
18: {
icon: "Skill_ShadowStrike",
name: "爆破投掷",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 15,
atktype: 1,
subtype: 1,
bulletrule: [ 1, .1, 10, 0, 0, 0, 0, 0, 1 ],
stype: n.sword
},
19: {
icon: "Skill_Pierce",
name: "分身",
type: 4,
functionid: 1,
learnmask: [],
delay: .15,
cd: .5
},
20: {
icon: "Skill_Whirlwind",
name: "剑刃风暴",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 45,
subtype: 3,
atktype: 1,
bullets: [ {
t: 0,
b: [ [ 11, 0, 0 ] ]
} ],
buffs: [ {
id: 101,
chance: 100,
target: 1,
time: 10
} ],
wdmg: .5,
stype: n.sword
},
21: {
icon: "Skill_Sprint",
name: "冲锋",
type: 5,
learnmask: [],
delay: 0,
cd: 1,
atktype: 1,
buffs: [ {
id: 5,
chance: 100,
target: 1,
time: 10
} ],
force: .1,
stype: n.sword
},
22: {
icon: "Skill_Dodge",
name: "突进",
type: 99,
learnmask: [],
delay: 0,
cd: .5,
buffs: [ {
id: 6,
chance: 100,
target: 1
} ],
des: "突进"
},
23: {
icon: "skilltime",
name: "子弹时间",
type: 99,
learnmask: [],
delay: 0,
cd: 30,
buffs: [ {
id: 7,
chance: 100,
target: 1
} ],
des: "黑客们常用技能"
},
24: {
icon: "skillniuqu",
name: "空间扭曲",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 20.5,
subtype: 1,
atktype: 3,
bullets: [ {
t: 0,
b: [ [ 12, 0, 0, 0, 0 ] ]
} ],
xiyin: .1,
wdmg: .1,
des: "吸吸吸"
},
25: {
icon: "Skill_FireBolt",
name: "火箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 5,
waniid: 5,
atktype: 3,
stype: n.fire,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 13, 5 ],
chant: 2,
fixhit: 1,
wdmg: 1
},
26: {
icon: "Skill_IceBolt",
name: "冰箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 5,
waniid: 5,
atktype: 3,
stype: n.cold,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 14, 5 ],
chant: 2,
fixhit: 1,
wdmg: 1
},
27: {
icon: "Skill_LightingBolt",
name: "雷箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 5,
waniid: 5,
atktype: 3,
stype: n.thunder,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 26, 5 ],
chant: 2,
fixhit: 1,
wdmg: 1
},
28: {
icon: "skillfirewall",
name: "火墙",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 10,
waniid: 5,
atktype: 3,
stype: n.fire,
subtype: 7,
bullets: [ {
t: 0,
b: [ [ 15, 40 ] ]
} ],
chant: 1,
force: .1,
fixhit: 1,
wdmg: .1,
hurtres: "eff89"
},
29: {
icon: "Skill_IceCage",
name: "冰冻术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 3,
waniid: 5,
atktype: 3,
stype: n.cold,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 16, 1 ],
chant: 1,
hitbuffs: [ {
id: 8,
chance: 30,
time: 30
} ],
chancelv: 10,
fixhit: 1,
wdmg: .1
},
30: {
icon: "skillzhanglei",
name: "掌心雷",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 3,
waniid: 5,
atktype: 3,
stype: n.thunder,
subtype: 7,
bullets: [ {
t: 0,
b: [ [ 17, 60 ] ]
} ],
chant: .5,
fixhit: 1,
hurtres: "eff83",
wdmg: 2
},
31: {
icon: "Skill_LightingDragonBlast",
name: "黑龙波",
learnmask: [],
type: 3,
delay: .2,
delayto: .15,
cd: 15,
waniid: 5,
atktype: 3,
gameobjs: [ {
t: 0,
b: [ [ 1, 0, 0, 0 ], [ 1, 0, 30, 0 ], [ 1, 0, -30, 0 ] ]
} ],
chant: 2,
stype: n.fire,
fixhit: 1,
wdmg: 1.5,
des: "召唤3条黑龙对途径的敌人造成1.5倍火属性魔法伤害",
cost: 3e4
},
32: {
icon: "Skill_ThunderStorm",
name: "怒雷强击",
type: 2,
learnmask: [],
delay: .8,
delayto: .15,
cd: 15,
waniid: 5,
atktype: 3,
subtype: 5,
bulletrule: [ 2, .1, 20, 300, 300, 30 ],
stype: n.thunder,
chant: 2,
fixhit: 1,
hurtres: "eff83"
},
33: {
icon: "skillbingfeng",
name: "冰封球",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 15,
waniid: 5,
atktype: 3,
stype: n.cold,
subtype: 7,
bullets: [ {
t: 0,
b: [ [ 21, 0 ] ]
} ],
chant: 2,
fixhit: 1,
des: "产生一个旋转的冰球，对周围敌人进行1倍冰属性魔法的射击",
cost: 3e4
},
34: {
icon: "Skill_LightingBoltBarrage",
name: "叉状闪电",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd2: 3,
cd: .1,
waniid: 5,
atktype: 3,
tscount: 1,
area: 400,
limit: 5,
subtype: 2,
bullets: [ {
t: 0,
b: [ [ 23, 0, 0 ] ]
} ],
fixhit: 1,
chant: .5,
wdmg: 1.5,
stype: n.thunder,
hurtres: "eff83",
des: "对敌人进行1.5倍的雷属性魔法伤害，可攻击5人",
cost: 3e4
},
35: {
icon: "skillluansuo",
name: "连锁闪电",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd2: 3,
cd: .1,
waniid: 5,
atktype: 3,
tscount: 5,
area: 400,
limit: 1,
subtype: 2,
stype: n.thunder,
bullets: [ {
t: 0,
b: [ [ 24, 0, 0 ] ]
} ],
fixhit: 1,
chant: .5,
wdmg: 1.5,
hurtres: "eff83",
des: "对敌人进行1.5倍的雷属性魔法伤害，可弹射5次",
cost: 3e4
},
36: {
icon: "diyuhuo",
name: "地狱火",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 8,
waniid: 5,
atktype: 3,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 25, 1 ],
stype: n.fire,
fixhit: 1,
chant: 2,
wdmg: 4
},
37: {
icon: "jiguang",
name: "极光术",
type: 2,
learnmask: [],
delay: .8,
delayto: .15,
cd: 8,
waniid: 5,
atktype: 3,
subtype: 7,
bullets: [ {
t: 0,
b: [ [ 18, 120 ] ]
} ],
chant: .5,
stype: n.cold,
fixhit: 1,
wdmg: 4
},
38: {
icon: "Skill_BurstArrow",
name: "爆炸箭",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: .5,
waniid: 5,
atktype: 1,
dymicbullet: !0,
subtype: 1,
bulletrule: [ 1, .1, 5, 0, 0, 0, 0, 0, 1 ],
stype: n.bow
},
39: {
icon: "Skill_Slash",
name: "ex挥砍",
type: 1,
learnmask: [],
delay: .1,
delayto: .2,
cd: .05,
cd2: 3,
timeatk: 0,
range: 60,
distance: 50,
waniid: 3,
atktype: 1,
stype: n.sword,
hurtres: "eff73",
subskill: {
id: 40,
t: 1,
v: 15
}
},
40: {
icon: "jiguang",
name: "咖喱棒",
type: 2,
learnmask: [],
delay: 0,
cd: .1,
atktype: 1,
subtype: 7,
bullets: [ {
t: 0,
b: [ [ 27, 120 ] ]
} ],
stype: n.sword,
fixhit: 1,
wdmg: 30
},
41: {
icon: "Skill_Slash",
name: "火挥砍",
type: 1,
learnmask: [],
delay: .1,
delayto: .2,
cd: .05,
cd2: 3,
timeatk: 0,
range: 60,
distance: 50,
waniid: 3,
atktype: 1,
stype: n.sword,
hurtres: "eff73",
subskill: {
id: 42,
t: 1,
v: 30
}
},
42: {
icon: "Skill_FireBolt",
name: "火箭术",
type: 2,
learnmask: [],
delay: 0,
cd: 1,
waniid: 5,
atktype: 3,
stype: n.fire,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 13, 5 ],
chant: 2,
fixhit: 1,
wdmg: 1
},
43: {
icon: "Skill_BowShot",
name: "闪电射击",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: .05,
cd2: 3,
waniid: 5,
atktype: 1,
subtype: 1,
dymicbullet: !0,
bulletrule: [ 1, .1, 1, 0, 0, 0, 0, 0, 1 ],
hurtres: "eff92",
subskill: {
id: 35,
t: 1,
v: 30
},
stype: n.bow
},
44: {
icon: "Skill_BowShot",
name: "爆炸射击",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: .05,
cd2: 3,
waniid: 5,
atktype: 1,
subtype: 1,
dymicbullet: !0,
bulletrule: [ 1, .1, 1, 0, 0, 0, 0, 0, 1 ],
hurtres: "eff92",
subskill: {
id: 38,
t: 1,
v: 30
},
stype: n.bow
},
45: {
icon: "Skill_BowMultiShot",
name: "五连魔矢",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: .5,
waniid: 5,
atktype: 3,
dymicbullet: !0,
subtype: 1,
bulletrule: [ 1, .1, 1, 0, 0, 0, 0, 0, 5 ],
hurtres: "Skill_BowEagleEyeShot",
stype: n.bow
},
46: {
icon: "Skill_BowShot",
name: "射击",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: .01,
cd2: 3,
waniid: 5,
atktype: 1,
subtype: 1,
dymicbullet: !0,
bullets: [ {
t: 0,
b: [ [ 1, 0, 0, 0 ], [ 1, 0, 15, 0 ], [ 1, 0, -15, 0 ], [ 1, 0, 30, 0 ], [ 1, 0, -30, 0 ], [ 1, 0, 45, 0 ], [ 1, 0, -45, 0 ] ]
} ],
hurtres: "eff92",
stype: n.bow
},
47: {
icon: "Skill_Slash",
name: "100ex挥砍",
type: 1,
learnmask: [],
delay: .1,
delayto: .2,
cd: .05,
cd2: 3,
timeatk: 0,
range: 60,
distance: 50,
waniid: 3,
atktype: 1,
stype: n.sword,
hurtres: "eff73",
subskill: {
id: 40,
t: 1,
v: 50
}
},
100: {
icon: "Skill_Recover",
name: "治疗术",
type: 99,
learnmask: [],
delay: 0,
cd: .5,
chant: 2,
buffs: [ {
id: 10001,
chance: 100,
target: 1,
time: .1
} ],
des: "治疗术"
},
103: {
icon: "Skill_Pierce",
name: "火boss1",
type: 2,
delay: .15,
delayto: .15,
cd: 7,
atktype: 3,
subtype: 1,
dymicbullet: !0,
bulletrule: [ 1, 0, 2010, 0, 0, 0, 0, 36, 10 ]
},
104: {
icon: "Skill_Pierce",
name: "火boss2",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 6.5,
atktype: 3,
subtype: 1,
bulletrule: [ 1, .1, 2013, 0, 0, 0, 0, 0, 1 ]
},
105: {
icon: "Skill_Pierce",
name: "火boss3",
type: 2,
delay: .15,
delayto: .15,
cd: 9,
atktype: 3,
subtype: 1,
dymicbullet: !0,
bulletrule: [ 1, .1, 2011, 0, 0, 0, -3, 36, 40 ]
},
106: {
icon: "Skill_Pierce",
name: "火boss远程",
type: 2,
delay: .15,
delayto: .15,
cd: 1,
atktype: 3,
subtype: 1,
bulletrule: [ 1, 0, 2012, 0, 0, 0, 0, 0, 1 ]
},
107: {
icon: "Skill_Pierce",
name: "冰boss1",
type: 2,
learnmask: [],
delay: .8,
delayto: .15,
cd: 10,
atktype: 3,
subtype: 5,
bulletrule: [ 2, .1, 2001, 300, 300, 30 ],
stype: n.cold
},
108: {
icon: "Skill_Pierce",
name: "冰boss2",
type: 2,
delay: .15,
delayto: .15,
cd: 7,
atktype: 3,
subtype: 1,
dymicbullet: !0,
bulletrule: [ 1, 0, 2004, 0, 0, 0, 0, 36, 10 ]
},
109: {
icon: "Skill_Pierce",
name: "冰boss3",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 5,
atktype: 3,
stype: n.cold,
subtype: 7,
bullets: [ {
t: 0,
b: [ [ 2003, 0 ] ]
} ]
},
110: {
icon: "Skill_Pierce",
name: "冰boss4",
type: 2,
delay: .15,
delayto: .15,
cd: 1,
atktype: 3,
subtype: 1,
bulletrule: [ 1, 0, 2005, 0, 0, 0, 0, 0, 1 ]
},
111: {
icon: "Skill_Pierce",
name: "雷boss1",
type: 2,
delay: .15,
delayto: .5,
cd: 7.5,
atktype: 3,
subtype: 1,
bulletrule: [ 1, 0, 2007, 0, 0, 0, 0, 45, 3 ],
repeattimes: .5,
repeatcunt: 2,
hurtres: "eff83",
stype: n.thunder
},
112: {
icon: "Skill_Pierce",
name: "雷boss2",
type: 2,
delay: .8,
delayto: .15,
cd: 10.4,
atktype: 3,
subtype: 5,
bulletrule: [ 2, .1, 2008, 300, 300, 30 ],
stype: n.thunder
},
113: {
icon: "Skill_Pierce",
name: "雷boss3",
type: 2,
delay: .15,
delayto: .15,
cd: 5.6,
atktype: 3,
tscount: 4,
area: 500,
limit: 1,
subtype: 2,
stype: n.thunder,
bullets: [ {
t: 0,
b: [ [ 24, 0, 0 ] ]
} ]
},
114: {
icon: "Skill_Pierce",
name: "雷boss4",
type: 2,
delay: .15,
delayto: 1,
cd: 1,
atktype: 3,
subtype: 1,
bulletrule: [ 1, 0, 2009, 0, 0, 0, 0, 0, 1 ],
hurtres: "eff59",
stype: n.thunder
},
115: {
icon: "Skill_Pierce",
name: "boss地狱火",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 15,
waniid: 5,
atktype: 3,
stype: n.thunder,
subtype: 2,
limit: 1,
bulletrule: [ 6, .5, 2015, 5 ],
fixhit: 1,
wdmg: 1
},
116: {
icon: "Skill_Pierce",
name: "火小怪远程",
type: 2,
delay: .15,
delayto: .15,
cd2: 3,
cd: .1,
atktype: 3,
subtype: 1,
bulletrule: [ 1, 0, 2016, 0, 0, 0, 0, 0, 1 ]
},
117: {
icon: "Skill_Pierce",
name: "bing小怪远程",
type: 2,
delay: .15,
delayto: .15,
cd2: 3,
cd: .1,
atktype: 3,
subtype: 1,
bulletrule: [ 1, 0, 2017, 0, 0, 0, 0, 0, 1 ]
},
118: {
icon: "Skill_Pierce",
name: "雷小怪远程",
type: 2,
delay: .15,
delayto: .15,
cd2: 3,
cd: .1,
atktype: 3,
subtype: 1,
bulletrule: [ 1, 0, 2018, 0, 0, 0, 0, 0, 1 ]
},
119: {
icon: "Skill_Pierce",
name: "boss冲锋",
type: 5,
learnmask: [],
delay: 0,
cd: 10,
atktype: 1,
buffs: [ {
id: 5,
chance: 100,
target: 1,
time: 10
} ],
force: .1
},
120: {
icon: "Skill_Pierce",
name: "boss剑刃风暴",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 21,
subtype: 3,
atktype: 1,
bullets: [ {
t: 0,
b: [ [ 3001, 0, 0 ] ]
} ],
buffs: [ {
id: 104,
chance: 100,
target: 1,
time: 5
} ],
wdmg: .8
},
121: {
icon: "Skill_Pierce",
name: "boss圣盾",
type: 99,
learnmask: [],
delay: 0,
cd: 30,
buffs: [ {
id: 14,
chance: 100,
target: 1
} ],
cost: 2e3
},
122: {
icon: "Skill_Pierce",
name: "扭头地狱火",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 8,
waniid: 5,
atktype: 1,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 2019, 8 ],
fixhit: 1,
wdmg: 1
},
123: {
icon: "Skill_Pierce",
name: "dk冲锋",
type: 5,
learnmask: [],
delay: 0,
cd: 5,
atktype: 1,
buffs: [ {
id: 5,
chance: 100,
target: 1,
time: 10
} ],
force: .1
},
124: {
icon: "",
name: "boss黑龙波",
type: 3,
delay: .2,
delayto: .15,
cd: 30,
atktype: 3,
gameobjs: [ {
t: 0,
b: [ [ 1, 0, 0, 0 ], [ 1, 0, 30, 0 ], [ 1, 0, -30, 0 ], [ 1, 0, -15, 0 ], [ 1, 0, 15, 0 ] ]
} ],
stype: n.fire
},
125: {
icon: "Skill_Pierce",
name: "boss极光术",
type: 2,
delay: .8,
delayto: .15,
cd: 28,
atktype: 3,
subtype: 7,
bullets: [ {
t: 0,
b: [ [ 18, 120 ] ]
} ],
stype: n.cold,
wdmg: 4
},
127: {
icon: "Skill_FireBolt",
name: "初级火箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 5,
waniid: 5,
atktype: 3,
stype: n.fire,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 13, 3 ],
chant: 2,
wdmg: 1
},
128: {
icon: "Skill_IceBolt",
name: "初级冰箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 5,
waniid: 5,
atktype: 3,
stype: n.cold,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 14, 3 ],
chant: 2,
wdmg: 1
},
129: {
icon: "Skill_LightingBolt",
name: "初级雷箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 5,
waniid: 5,
atktype: 3,
stype: n.thunder,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 26, 3 ],
chant: 2,
wdmg: 1
},
1001: {
icon: "Skill_TitanDefense",
name: "拜年剑法",
type: 1,
range: 60,
distance: 50,
atktype: 1,
delay: .15,
delayto: .15,
cd: 3,
wdmg: 3,
waniid: 3,
hurtres: "eff63",
stype: n.sword,
des: "这是招很普通的剑法"
},
1002: {
icon: "Skill_DevastatingBlade",
name: "御剑术",
type: 2,
range: 60,
distance: 50,
atktype: 1,
delay: .15,
delayto: .15,
cd: 8,
hurtres: "eff62",
stype: n.sword,
subtype: 4,
bulletrule: [ 5, .1, 10005, -50, 100, 0, 10 ],
des: "家里没矿别用这招"
},
1003: {
icon: "Skill_ThunderStomp",
name: "无产阶级之腿",
type: 1,
range: 60,
distance: 50,
atktype: 1,
delay: .15,
delayto: .15,
cd: 30,
wdmg: 15,
hurtres: "eff64",
selfres: "eff65",
stype: n.sword,
des: "这一脚可不得了"
},
1004: {
icon: "Skill_Pierce",
name: "鬼神突刺",
type: 1,
range: 60,
distance: 50,
atktype: 1,
delay: .15,
delayto: .15,
cd: 1,
hurtres: "eff67",
waniid: 2,
stype: n.sword,
des: "也就名字唬人而已"
},
1005: {
icon: "Skill_Sacrifice",
name: "幻龙爪",
type: 1,
range: 60,
distance: 50,
atktype: 1,
delay: .15,
delayto: .15,
cd: 5,
hurtres: "eff68",
xixue: 20,
stype: n.sword,
des: "这技能其实和龙没关系"
},
1006: {
icon: "Skill_FireBall",
name: "龙炎",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 5,
waniid: 5,
atktype: 3,
stype: n.fire,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 10006, 1 ],
fixhit: 1,
des: "这火其实和龙没关系"
},
1007: {
icon: "Skill_DamageEnhanced",
name: "春秋刀法",
type: 1,
range: 60,
distance: 50,
atktype: 1,
wdmg: 10,
delay: .15,
delayto: .15,
cd: 30,
hurtres: "eff73",
waniid: 3,
selfres: "eff70",
stype: n.sword,
des: "这是招很普通的剑法"
},
1008: {
icon: "skillshizi",
name: "暗黑十字斩",
type: 1,
range: 60,
distance: 50,
atktype: 1,
delay: .15,
delayto: .15,
cd: 30,
hurtres: "eff7",
waniid: 3,
wdmg: 10,
stype: n.sword,
des: "这是招很普通的剑法"
},
1009: {
icon: "Skill_LeapAttack",
name: "燕返",
type: 1,
range: 60,
distance: 50,
atktype: 1,
delay: .15,
delayto: .15,
cd: 3,
wdmg: 3,
hurtres: "eff73",
waniid: 3,
selfres: "eff74",
stype: n.sword,
des: "这是招很普通的剑法"
},
1010: {
icon: "Skill_RecoverAll",
name: "奶一大口",
type: 99,
learnmask: [],
delay: 0,
cd: 15,
chant: 2,
waniid: 5,
buffs: [ {
id: 10001,
chance: 100,
target: 3,
time: .1
} ],
des: "这奶没毒"
},
1011: {
icon: "skillrulai",
name: "如来神掌",
type: 2,
delay: .15,
delayto: .15,
cd: 30,
waniid: 5,
atktype: 1,
subtype: 2,
bulletrule: [ 6, .3, 10007, 1 ],
des: "骚年我看你骨骼惊奇"
},
1012: (i = {
icon: "skillwater",
name: "洪水滔滔",
type: 2,
delay: .15,
delayto: .15,
cd: 30,
waniid: 5,
atktype: 3,
subtype: 3,
fixhit: 1,
bullets: [ {
t: 0,
b: [ [ 10008, 0, 0 ] ]
} ],
stype: n.cold,
fulleff: "eff76",
des: "诸葛亮尿床了"
}, i.atktype = 3, i),
1013: {
icon: "skillmbg",
name: "闪电五连鞭",
type: 1,
learnmask: [],
delay: .5,
delayto: 0,
cd: 8,
atktype: 3,
timeatk: .15,
atkcount: 5,
wdmg: 1,
hittype: 1,
width: 50,
height: 100,
aoe: !0,
addani: "eff1",
addaniposadd: 60,
stype: n.thunder,
des: "年轻人耗子尾汁"
},
1014: {
icon: "guanghuanshan",
name: "闪避光环",
type: 10,
des: "闪避提高150",
buff: 3001
},
1015: {
icon: "Skill_VertigoAll",
name: "暴击光环",
type: 10,
des: "暴击提高30",
buff: 3002
},
1016: {
icon: "xixue",
name: "吸血光环",
type: 10,
des: "吸血提高30",
buff: 3003
},
1017: {
icon: "Skill_StunningBlow",
name: "命中光环",
type: 10,
des: "命中提高150",
buff: 3004
},
1018: {
icon: "huixue",
name: "回复光环",
type: 10,
des: "每秒回血1%",
buff: 3005
},
1019: {
icon: "gedang",
name: "神技.不动如山",
type: 10,
des: "持剑的时候伤害减免60%",
buff: 3006
},
1020: {
icon: "Skill_Evasion",
name: "神技.穿梭自如",
type: 10,
des: "持弓的时候能闪避魔法攻击",
buff: 3007
},
1021: {
icon: "moli",
name: "神技.魔力暴走",
type: 10,
des: "持杖的时候15%概率技能cd立即刷新,受到致死伤害时无敌3秒，该效果10秒冷却时间",
buff: 3008
},
1022: {
icon: "Skill_SlowAll",
name: "战神技.影分身",
type: 10,
des: "持剑的时候造成伤害时有5%概率制造一个分身持续8秒，每次转生攻击提高80%",
buff: 4012
},
1023: {
icon: "Skill_SpeedUp",
name: "弓神技.无影",
type: 10,
des: "持弓的时候取消敌人命中保底机制，每次转生闪避提高100%",
buff: 4018
},
1024: {
icon: "S_Holy08",
name: "法神技.多重释法",
type: 10,
des: "持杖的时候能自动切换武器,每次转生生命提高50%",
buff: 4019
},
201: {
icon: "Skill_CrushingThrow",
name: "初级狂击",
type: 1,
range: 60,
distance: 50,
atktype: 1,
delay: .15,
delayto: .15,
wdmg: 2,
cd: .5,
cd2: 2,
des: "造成2倍物理伤害",
hurtres: "eff67",
cost: 1e3
},
202: {
icon: "Skill_Curse",
name: "初级毒击",
type: 1,
range: 60,
distance: 50,
atktype: 1,
delay: .15,
delayto: .15,
cd: 3,
wdmg: 1,
des: "造成1倍物理伤害,50%概率附加中毒状态",
hurtres: "eff63",
hitbuffs: [ {
id: 9,
chance: 50,
time: 30
} ],
cost: 1e3
},
203: {
icon: "Skill_CriticalHit",
name: "初级撕裂",
type: 1,
range: 60,
distance: 50,
atktype: 1,
delay: .15,
delayto: .15,
cd: 3,
wdmg: 1,
hurtres: "eff63",
des: "造成1倍物理伤害,50%概率附加流血状态",
hitbuffs: [ {
id: 10,
chance: 50,
time: 30
} ],
cost: 1e3
},
204: {
icon: "Skill_HolyShield",
name: "初级圣盾",
type: 99,
learnmask: [],
delay: 0,
cd: 30,
buffs: [ {
id: 11,
chance: 100,
target: 1
} ],
des: "增加15%双防，持续10秒",
cost: 2e3
},
205: {
icon: "Skill_RecoverAll",
name: "初级恢复术",
type: 99,
learnmask: [],
delay: 0,
cd: 30,
buffs: [ {
id: 12,
chance: 100,
target: 1
} ],
des: "给血量最少的友军增加恢复状态，每秒回3%血，持续10秒",
cost: 5e3
},
206: {
icon: "Skill_Recover",
name: "初级治疗术",
type: 99,
learnmask: [],
delay: 0,
cd: 30,
chant: 2,
buffs: [ {
id: 13,
chance: 100,
target: 3,
time: .1
} ],
des: "对血量最少的友军进行魔攻100%的治疗",
cost: 5e3
},
207: {
icon: "Skill_FireBolt",
name: "初级火箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 5,
waniid: 5,
atktype: 3,
stype: n.fire,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 13, 3 ],
chant: 2,
fixhit: 1,
wdmg: 1,
des: "对敌人进行3次1倍的火属性魔法伤害",
cost: 1e3
},
208: {
icon: "Skill_IceBolt",
name: "初级冰箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 5,
waniid: 5,
atktype: 3,
stype: n.cold,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 14, 3 ],
chant: 2,
fixhit: 1,
wdmg: 1,
des: "对敌人进行3次1倍的冰属性魔法伤害",
cost: 1e3
},
209: {
icon: "Skill_LightingBolt",
name: "初级雷箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 5,
waniid: 5,
atktype: 3,
stype: n.thunder,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 26, 3 ],
chant: 2,
fixhit: 1,
wdmg: 1,
des: "对敌人进行3次1倍的雷属性魔法伤害",
cost: 1e3
},
210: {
icon: "Skill_CrushingThrow",
name: "狂击",
type: 1,
range: 60,
distance: 50,
atktype: 1,
delay: .15,
delayto: .15,
wdmg: 3,
cd: .5,
cd2: 2,
des: "造成3倍物理伤害",
hurtres: "eff67",
cost: 1e4
},
211: {
icon: "Skill_CriticalHit",
name: "撕裂",
type: 1,
range: 60,
distance: 50,
atktype: 1,
delay: .15,
delayto: .15,
cd: 3,
wdmg: 1.5,
hurtres: "eff63",
des: "造成1.5倍物理伤害,50%概率附加流血状态",
hitbuffs: [ {
id: 10,
chance: 50,
time: 30
} ],
cost: 1e4
},
212: {
icon: "Skill_Curse",
name: "毒击",
type: 1,
range: 60,
distance: 50,
atktype: 1,
delay: .15,
delayto: .15,
cd: 3,
wdmg: 1.5,
des: "造成1.5倍物理伤害,50%概率附加中毒状态",
hurtres: "eff63",
hitbuffs: [ {
id: 9,
chance: 50,
time: 30
} ],
cost: 1e4
},
213: {
icon: "Skill_HolyShield",
name: "圣盾",
type: 99,
learnmask: [],
delay: 0,
cd: 30,
buffs: [ {
id: 15,
chance: 100,
target: 1
} ],
des: "增加30%双防，持续10秒",
cost: 2e4
},
214: {
icon: "Skill_RecoverAll",
name: "恢复术",
type: 99,
learnmask: [],
delay: 0,
cd: 30,
buffs: [ {
id: 16,
chance: 100,
target: 1
} ],
des: "给血量最少的友军增加恢复状态，每秒回6%血，持续10秒",
cost: 5e4
},
215: {
icon: "Skill_Recover",
name: "治疗术",
type: 99,
learnmask: [],
delay: 0,
cd: 30,
chant: 2,
buffs: [ {
id: 17,
chance: 100,
target: 3,
time: .1
} ],
des: "对血量最少的友军进行魔攻200%的治疗",
cost: 5e4
},
216: {
icon: "Skill_FireBolt",
name: "火箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 5,
waniid: 5,
atktype: 3,
stype: n.fire,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 13, 5 ],
chant: 2,
fixhit: 1,
wdmg: 1,
des: "对敌人进行5次1倍的火属性魔法伤害",
cost: 1e4
},
217: {
icon: "Skill_IceBolt",
name: "冰箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 5,
waniid: 5,
atktype: 3,
stype: n.cold,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 14, 5 ],
chant: 2,
fixhit: 1,
wdmg: 1,
des: "对敌人进行5次1倍的冰属性魔法伤害",
cost: 1e4
},
218: {
icon: "Skill_LightingBolt",
name: "雷箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 5,
waniid: 5,
atktype: 3,
stype: n.thunder,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 26, 5 ],
chant: 2,
fixhit: 1,
wdmg: 1,
des: "对敌人进行5次1倍的雷属性魔法伤害",
cost: 1e4
},
219: {
icon: "Skill_CrushingThrow",
name: "超狂击",
type: 1,
range: 60,
distance: 50,
atktype: 1,
delay: .15,
delayto: .15,
wdmg: 5,
cd: .5,
cd2: 2,
des: "造成5倍物理伤害",
hurtres: "eff67",
cost: 5e4,
stype: n.sword
},
220: {
icon: "Skill_BowMultiShot",
name: "五连矢",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: .5,
cd2: 2,
waniid: 5,
atktype: 1,
dymicbullet: !0,
subtype: 1,
bulletrule: [ 1, .1, 1, 0, 0, 0, 0, 0, 5 ],
hurtres: "eff92",
stype: n.bow,
des: "瞬间射出5支箭",
cost: 5e4
},
221: {
icon: "Skill_FireBolt",
name: "超火箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 3,
waniid: 5,
atktype: 3,
stype: n.fire,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 13, 8 ],
chant: 2,
fixhit: 1,
wdmg: 1,
des: "对敌人进行8次1倍的火属性魔法伤害",
cost: 1e4
},
222: {
icon: "Skill_IceBolt",
name: "超冰箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 3,
waniid: 5,
atktype: 3,
stype: n.cold,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 14, 8 ],
chant: 2,
fixhit: 1,
wdmg: 1,
des: "对敌人进行8次1倍的冰属性魔法伤害",
cost: 1e4
},
223: {
icon: "Skill_LightingBolt",
name: "超雷箭术",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 3,
waniid: 5,
atktype: 3,
stype: n.thunder,
subtype: 2,
limit: 1,
bulletrule: [ 6, .3, 26, 8 ],
chant: 2,
fixhit: 1,
wdmg: 1,
des: "对敌人进行8次1倍的雷属性魔法伤害",
cost: 1e4
},
224: {
icon: "Skill_LightingDragonBlast",
name: "炎杀黑龙波",
learnmask: [],
type: 3,
delay: .2,
delayto: .15,
cd: 10,
waniid: 5,
atktype: 3,
gameobjs: [ {
t: 0,
b: [ [ 1, 0, 0, 0 ], [ 1, 0, 30, 0 ], [ 1, 0, -30, 0 ], [ 1, 0, -15, 0 ], [ 1, 0, 15, 0 ] ]
} ],
chant: 2,
stype: n.fire,
fixhit: 1,
wdmg: 2
},
225: {
icon: "Skill_Whirlwind",
name: "超剑刃风暴",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 45,
subtype: 3,
atktype: 1,
bullets: [ {
t: 0,
b: [ [ 11, 0, 0 ] ]
} ],
buffs: [ {
id: 101,
chance: 100,
target: 1,
time: 10
} ],
wdmg: 1,
stype: n.sword
},
226: {
icon: "Skill_BurstArrow",
name: "爆炸箭",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: .5,
waniid: 5,
atktype: 1,
dymicbullet: !0,
subtype: 1,
bulletrule: [ 1, .1, 5, 0, 0, 0, 0, 0, 1 ]
},
227: {
icon: "skillbingfeng",
name: "超冰封球",
type: 2,
learnmask: [],
delay: .15,
delayto: .15,
cd: 10,
waniid: 5,
atktype: 3,
stype: n.cold,
subtype: 7,
bullets: [ {
t: 0,
b: [ [ 28, 0 ] ]
} ],
chant: 2,
fixhit: 1,
wdmg: 2
}
});
e.exports = a;
cc._RF.pop();
}, {
enumcfg: "enumcfg"
} ],
skillobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "fbeceGeZWlOWIBk9elyRnLS", "skillobj");
var i = t("Utils"), s = t("skillcfg"), n = t("buffcfg").buffcfg;
t("gameConfig").itemConfig, cc.v2();
e.exports = function t() {
this.init = function(e, i, n) {
this.id = e;
this.cfg = s[e];
this.savedir = cc.v2();
this.savepos = cc.v2();
this.user = n;
this.gamelogic = this.user.gamelogic;
this.type = this.cfg.type;
this.subtype = this.cfg.subtype;
this.atktype = this.cfg.atktype;
this.rcount = 0;
this.enemycamp = this.gamelogic.getenemycamp(n);
this.areapow = 0;
this.cfg.area && (this.areapow = this.cfg.area * this.cfg.area);
this.cfg.gameobjs && (this.gameobjs = this.cfg.gameobjs);
this.lv = i;
this.cfg.chancelv ? this.buffchanceup = this.cfg.chancelv * this.lv : this.buffchanceup = 0;
this.reset();
this.rebuildbullet();
if (2 == n.camp) {
var a = this.cfg.cd;
this.nowtime = a;
this.maxtime = a;
}
if (this.cfg.subskill) {
var o = this.cfg.subskill;
this.subskill = new t();
this.subskill.issub = !0;
this.subskill.init(o.id, 1, n);
this.subskilltyp = o.t;
this.subskillvalue = o.v;
this.subtoucan = 0;
}
};
this.reset = function() {
this.nextemit = null;
this.nowtime = 0;
this.maxtime = 1;
this.atkcount = 0;
this.atktime = 0;
this.preatktime = 0;
this.subskill && this.subskill.reset();
10 == this.type && (this.atktime = .5);
};
this.rebuildbullet = function() {
var t = this.cfg;
this.bullets = t.bullets;
if (t.bulletrule) {
this.bullets = [];
var e = t.bulletrule, s = e[0], n = 0;
t.bulletlvrule && (n = t.bulletlvrule.lvcount * this.lv);
var a = 0;
if (1 == s) {
a = e[8] + n;
for (var o = 0; o < a; o++) {
var c = {
t: o * e[1],
b: [ [ e[2], e[3] + e[6] * o, e[4] + e[7] * o, e[5] ] ]
};
this.bullets.push(c);
}
} else if (2 == s) {
a = e[5] + n;
for (o = 0; o < a; o++) {
e[3], e[4], c = {
t: o * e[1],
b: [ [ e[2], e[3], e[4] ] ]
};
this.bullets.push(c);
}
} else if (3 == s) {
a = e[3] + n;
var r = t.template;
for (o = 0; o < a; o++) {
var l = [];
l = i.deepClone(r, l);
for (var h = 0; h < l.length; h++) l[h][1] = o * e[2];
c = {
t: o * e[1],
b: l
};
this.bullets.push(c);
}
} else if (4 == s) {
a = e[8] + n;
for (o = 0; o < a; o++) {
c = {
t: o * e[1],
b: [ [ e[2], e[3] + e[5] * o, e[4] + e[6] * o, 0, e[7] ] ]
};
this.bullets.push(c);
}
} else if (5 == s) {
a = e[6] + n;
for (o = 0; o < a; o++) {
c = {
t: o * e[1],
b: [ [ e[2], e[3], e[4], 0, e[5] ] ]
};
this.bullets.push(c);
}
} else if (6 == s) {
a = e[3] + n;
for (o = 0; o < a; o++) {
c = {
t: o * e[1],
b: [ [ e[2], 0, 0 ] ]
};
this.bullets.push(c);
}
}
if (!t.bulletlvrule) {
t.bullets = this.bullets;
t.bulletrule = null;
}
}
};
this.update = function(t) {
if (!this.user.isdead()) {
if (this.rcount > 0) {
this.nowrtime += t;
if (this.nowrtime >= this.repeattimes) {
this.nowrtime = 0;
this.rcount--;
this.beginskill();
}
}
this.nowtime > 0 && (this.nowtime -= t);
if (10 == this.type) {
this.atktime += t;
if (this.atktime > .5) {
var e = this.cfg.buff;
this.atktime = 0;
var i = !0, s = n[e];
s.needweapon && this.user.atkskillcfg && 0 == (this.user.atkskillcfg.stype & s.needweapon) && (i = !1);
if (i) for (var a = this.gamelogic.findnpcwithcmp(this.user, this.user.camp, !1), o = 0; o < a.length; o++) a[o].addbuff(e, 100, 1);
}
} else this.updateatk(t);
this.subskill && this.subskill.update(t);
}
};
this.doself = function() {
var t = this.cfg, e = t.delay, s = t.cd;
t.cd2 && (s += this.user.getatkdelay() * t.cd2);
this.user.nocd > 0 && i.randintSeed(100) < this.user.nocd && (s = .01);
this.nowtime = s;
this.maxtime = s;
e > 0 && !this.user.isdead() && this.user.changestate("stateyinzhi", e);
};
this.useskill = function() {
var t = this.beginskill();
if (t) {
this.doself();
if (this.cfg.repeatcunt) {
this.rcount = this.cfg.repeatcunt;
this.repeattimes = this.cfg.repeattimes;
this.nowrtime = 0;
}
}
return t;
};
this.use = function() {
if (this.nowtime > 0) return !1;
if (this.user.isdead()) return !1;
if (this.cfg.chant && !this.user.isdead() && this.user.singtime > 0) {
this.user.changestate("stateyongchang", {
time: this.cfg.chant,
skill: this
});
return !1;
}
var t = this.useskill();
t && this.subskill && 1 == this.subskilltyp && i.randintSeed(100) < this.subskillvalue && this.subskill.useskill();
return t;
};
this.updateatk = function(t) {
if (1 == this.type) {
if (this.atkcount > 0) {
this.atktime -= t;
if (this.atktime <= 0) {
this.atkcount--;
this.atktime = this.preatktime;
this.doatk();
}
}
} else if (2 == this.type) {
if (this.nextemit) {
this.atktime += t;
if (this.atktime >= this.nextemit.t) {
if (1 == this.subtype) this.gamelogic.createbullets(this, this.nextemit.b, this.user, this.savedir); else if (2 == this.subtype) if (1 == this.cfg.limit && this.atktarget) this.atktarget.isdead() || this.gamelogic.createbulletsground(this, this.nextemit.b, this.user, this.atktarget, this.areapow); else {
var e = !1;
(this.areapow || this.cfg.limit) && (e = !0);
var i = (n = this.gamelogic.findnpcwithcmp(this.user, this.enemycamp, e)).length;
this.cfg.limit && (i = Math.min(i, this.cfg.limit));
for (var s = 0; s < i; s++) this.gamelogic.createbulletsground(this, this.nextemit.b, this.user, n[s], this.areapow);
} else if (3 == this.subtype) this.gamelogic.createbulletsground(this, this.nextemit.b, this.user, this.user); else if (4 == this.subtype) this.gamelogic.createbulletspingxing(this, this.nextemit.b, this.user, this.savedir); else if (5 == this.subtype) this.gamelogic.createbulletsgroundrand(this, this.nextemit.b, this.user, this.user); else if (6 == this.subtype) {
var n, a = (n = this.gamelogic.findnpcwithcmp(this.user, this.enemycamp, !0))[0];
a && this.gamelogic.createbulletsgroundrand(this, this.nextemit.b, this.user, a);
} else 7 == this.subtype && this.gamelogic.createbulletsgrounddir(this, this.nextemit.b, this.user);
this.bulletidx++;
this.nextemit = this.bullets[this.bulletidx];
}
}
} else if (3 == this.type && this.nextemit) {
this.atktime += t;
if (this.atktime >= this.nextemit.t) {
this.gamelogic.createspobjs(this, this.nextemit.b, this.user);
this.bulletidx++;
this.nextemit = this.gameobjs[this.bulletidx];
}
}
};
this.doatk = function(t) {
if (t) {
this.savepos.x = this.user.x;
this.savepos.y = this.user.y;
}
var e = this.cfg, s = this.user, n = this.gamelogic.findnpcwithcmp(this.savepos, this.enemycamp, t), a = n[0], o = !1, c = null, r = 0, l = 0, h = 0, p = 0, d = !1;
if (t) if (a) {
c = cc.v2(a.x - s.x, a.y - s.y).normalizeSelf();
if (1 == e.hittype) {
r = e.height / 2;
l = s.x + c.x * r;
h = s.y + c.y * r;
p = i.getanglebydirhudu(c);
this.savehit = {
x: l,
y: h,
width: e.height,
height: e.width,
angle: p
};
o = i.checkobb(this.savehit, a);
} else {
this.savedis = e.distance;
this.savedir.x = c.x;
this.savedir.y = c.y;
o = i.checkinview(e.range, this.savedis, this.savedir, this.savepos, a);
}
if (o) {
s.dir = c;
d = !0;
} else {
s.dir = c;
s.changestate("statefollowtarget", {
time: .3,
x: a.x,
y: a.y
});
d = !1;
}
} else {
c = cc.v2(s.dir.x, s.dir.y);
if (1 == e.hittype) {
r = e.height / 2;
l = s.x + c.x * r;
h = s.y + c.y * r;
p = i.getanglebydirhudu(c);
this.savehit = {
x: l,
y: h,
width: e.height,
height: e.width,
angle: p
};
} else {
this.savedis = e.distance;
this.savedir.x = c.x;
this.savedir.y = c.y;
}
d = !0;
} else d = !0;
!t && a && (o = !0);
if (o) {
var u = [], f = 0;
if (t) {
u.push(a);
f = e.aoe ? 1 : n.length + 1;
}
for (var g = f, y = n.length; g < y; g++) if (n[g] && (1 == e.hittype ? i.checkobb(this.savehit, n[g]) : i.checkinview(e.range, this.savedis, this.savedir, this.savepos, n[g]))) {
u.push(n[g]);
if (!e.aoe) break;
}
for (g = 0; g < u.length; g++) u[g].dohurt(this.user, this, {
x: this.x,
y: this.y
});
}
return d;
};
this.dobullet = function() {
var t = null, e = null;
if (this.cfg.area && (e = (t = this.gamelogic.findnpcwithcmp(this.user, this.enemycamp, !0))[0]) && i.getdistancenosqrt(this.user, e) > this.areapow) return !1;
this.tscount = this.cfg.tscount;
var s = !0;
this.atktime = 0;
this.atkcount = 0;
this.bulletidx = 0;
this.nextemit = this.bullets[this.bulletidx];
if (2 == this.subtype) {
t || (t = this.gamelogic.findnpcwithcmp(this.user, this.enemycamp, !0));
e = t[0];
this.atktarget = e;
e || (s = !1);
} else if (1 == this.subtype || 4 == this.subtype) {
t || (t = this.gamelogic.findnpcwithcmp(this.user, this.enemycamp, !0));
e = t[0];
this.atktarget = e;
if (e) {
this.savedir.x = e.x - this.user.x;
this.savedir.y = e.y - this.user.y;
0 == this.savedir.x && 0 == this.savedir.y && (this.savedir.y = 1);
this.savedir.normalizeSelf();
this.user.dir.x = this.savedir.x;
this.user.dir.y = this.savedir.y;
} else {
this.savedir.x = this.user.dir.x;
this.savedir.y = this.user.dir.y;
}
}
return s;
};
this.docloseatk = function() {
var t, e = this.cfg;
e.atkcount ? this.atkcount = e.atkcount : this.atkcount = 1;
e.timeatk ? this.preatktime = e.timeatk : this.preatktime = 0;
this.atktime = this.preatktime;
(t = this.doatk(!0)) ? this.atkcount-- : this.atkcount = 0;
return t;
};
this.doobj = function() {
this.atktime = 0;
this.atkcount = 0;
this.bulletidx = 0;
this.nextemit = this.gameobjs[this.bulletidx];
return !0;
};
this.dobuff = function() {
for (var t = this.cfg.buffs, e = 0; e < t.length; e++) {
var i = [], s = t[e].dis;
if (1 == t[e].target) i.push(this.user); else if (2 == t[e].target) for (var n = 0, a = (o = this.gamelogic.findnpcwithcmp(this.user, this.user.camp, !0)).length; n < a && Math.abs(o[n].x - this.user.x) < s && Math.abs(o[n].x - this.user.x); n++) i.push(o[n]); else if (3 == t[e].target) {
var o;
o = (o = this.gamelogic.findnpcwithcmp(this.user, this.user.camp, !1)).sort(function(t, e) {
return t.hp / t.maxhp - e.hp / e.maxhp;
});
i.push(o[0]);
}
for (var c = 0, r = i.length; c < r; c++) i[c].addbuff(t[e].id, t[e].chance, 1, t[e].count, t[e].time, this, this.user);
}
return !0;
};
this.beginskill = function() {
this.cfg;
var t = !0;
this.atktarget = null;
1 == this.type ? t = this.docloseatk() : 2 == this.type ? t = this.dobullet() : 3 == this.type ? t = this.doobj() : 4 == this.type ? 1 == this.cfg.functionid && this.dofenshen() : 5 == this.type ? t = this.gamelogic.findnpcwithcmp(this.user, this.enemycamp).length > 0 : 10 == this.type && (t = !1);
if (t) {
this.cfg.buffs && this.dobuff();
this.cfg.fulleff && this.gamelogic.createscreen(this.cfg.fulleff);
}
return t;
};
this.dofenshen = function() {
var t = cc.battlelogic.createnpc({
camp: this.user.camp,
lv: 1,
x: this.user.x,
y: this.user.y,
fenshen: this.user
});
cc.battlelogic.playerarr.push(t);
};
};
cc._RF.pop();
}, {
Utils: "Utils",
buffcfg: "buffcfg",
gameConfig: "gameConfig",
skillcfg: "skillcfg"
} ],
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
skincfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "332d3XPV81Ge6K7cO54To+F", "skincfg");
cc._RF.pop();
}, {} ],
stagecfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "9ee21uqngRCars9S/nL6nrc", "stagecfg");
e.exports = {
stagecfg: {
1: {
mainpart: 1,
monsters: "117:10|118:10|119:10",
lv: 1
},
2: {
mainpart: 1,
monsters: "5:20|6:20|7:10"
},
3: {
mainpart: 1,
monsters: "7:10|8:30|9:30"
},
4: {
mainpart: 1,
monsters: "13:10|14:30|15:30"
},
5: {
mainpart: 1,
monsters: "1:100|2:100|3:100|4:100",
firstboss: 156,
finishmonster: "|156:10"
},
6: {
mainpart: 2,
monsters: "15:30|16:30|17:30"
},
7: {
mainpart: 2,
monsters: "18:30|19:30|20:30"
},
8: {
mainpart: 2,
monsters: "21:30|22:30"
},
9: {
mainpart: 2,
monsters: "23:30|24:30"
},
10: {
mainpart: 2,
monsters: "25:30|26:30|29:30",
firstboss: 139,
finishmonster: "|139:10"
},
11: {
mainpart: 3,
monsters: "27:30|28:30|30:30"
},
12: {
mainpart: 3,
monsters: "32:30|33:30|34:30"
},
13: {
mainpart: 3,
monsters: "35:30|36:30|37:30"
},
14: {
mainpart: 3,
monsters: "49:30|50:30"
},
15: {
mainpart: 3,
monsters: "39:100|40:100",
firstboss: 157,
finishmonster: "|157:10"
},
16: {
mainpart: 4,
monsters: "46:100|47:100|48:100",
firstboss: 45,
finishmonster: "|45:10"
},
17: {
mainpart: 4,
monsters: "51:30|52:30|53:30",
firstboss: 54,
finishmonster: "|54:5"
},
18: {
mainpart: 4,
monsters: "56:30|57:30|58:30",
firstboss: 55,
finishmonster: "|55:5"
},
19: {
mainpart: 4,
monsters: "31:30|59:30|60:30"
},
20: {
mainpart: 4,
monsters: "42:100|43:100",
firstboss: 158,
finishmonster: "|158:10"
},
21: {
mainpart: 5,
monsters: "61:30|62:30|63:30"
},
22: {
mainpart: 5,
monsters: "66:50|67:50",
firstboss: 64,
finishmonster: "|64:10|65:10"
},
23: {
mainpart: 5,
monsters: "68:30|69:30|70:30"
},
24: {
mainpart: 5,
monsters: "71:30|72:30|73:30|74:30"
},
25: {
mainpart: 5,
monsters: "82:100|83:100",
firstboss: 155,
finishmonster: "|155:10"
},
26: {
mainpart: 6,
monsters: "84:30|87:30|88:30"
},
27: {
mainpart: 6,
monsters: "85:30|94:30|103:30"
},
28: {
mainpart: 6,
monsters: "86:30|115:30|116:30"
},
29: {
mainpart: 6,
monsters: "98:30|99:30|100:30"
},
30: {
mainpart: 6,
monsters: "120:100|121:100|122:100",
firstboss: 133,
finishmonster: "|133:10"
},
31: {
mainpart: 7,
monsters: "104:30|105:30|106:30",
firstboss: 107,
finishmonster: "|107:10"
},
32: {
mainpart: 7,
monsters: "108:30|109:30|110:30"
},
33: {
mainpart: 7,
monsters: "112:30|113:30|114:30"
},
34: {
mainpart: 7,
monsters: "123:30|124:30|125:30"
},
35: {
mainpart: 7,
monsters: "130:30|131:30|132:30",
firstboss: 142,
finishmonster: "|142:10"
},
36: {
mainpart: 8,
monsters: "126:30|127:30|138:30"
},
37: {
mainpart: 8,
monsters: "128:30|129:30"
},
38: {
mainpart: 8,
monsters: "201:50|202:50",
firstboss: 203,
finishmonster: "|203:10"
},
39: {
mainpart: 8,
monsters: "204:50|205:50",
firstboss: 206,
finishmonster: "|206:5"
},
40: {
mainpart: 8,
monsters: "207:100|208:100",
firstboss: 209,
finishmonster: "|209:10"
},
41: {
mainpart: 9,
monsters: "210:100|211:100",
firstboss: 212,
finishmonster: "|212:10"
},
42: {
mainpart: 9,
monsters: "213:100|214:100",
firstboss: 215,
finishmonster: "|215:10"
},
43: {
mainpart: 9,
monsters: "216:30|217:30"
},
44: {
mainpart: 9,
monsters: "218:100|219:100",
firstboss: 220,
finishmonster: "|220:10"
},
45: {
mainpart: 9,
monsters: "221:200",
firstboss: 222,
finishmonster: "|222:10"
},
46: {
mainpart: 10,
monsters: "224:200",
firstboss: 225,
finishmonster: "|225:10"
},
47: {
mainpart: 10,
monsters: "226:200",
firstboss: 227,
finishmonster: "|227:10"
},
48: {
mainpart: 10,
monsters: "228:200",
firstboss: 229,
finishmonster: "|229:10"
},
49: {
mainpart: 10,
monsters: "230:200",
firstboss: 231,
finishmonster: "|231:10"
},
50: {
mainpart: 10,
monsters: "232:200",
firstboss: 233,
finishmonster: "|233:10"
},
100: {
lv: 400,
bosscount: 100,
mainpart: 10,
monsters: "233:10|231:10|229:10|227:10|225:10|222:10|215:10|212:10|209:10|156:10|157:10|158:10|139:10|142:10|133:10"
},
1e4: {
mainpart: 10,
monsters: "232:200",
boss: 1e4,
lv: 100,
bosscount: 60,
createtime: .5
}
},
dixing: {
1: {
part: [ [ 1, 75 ], [ 2, 50 ] ],
background: "bg1"
},
2: {
part: [ [ 5, 75 ], [ 6, 50 ] ],
background: "bg3"
},
3: {
part: [ [ 9, 75 ], [ 10, 50 ] ],
background: "bg1"
},
4: {
part: [ [ 3, 75 ], [ 4, 50 ] ],
background: "bg1"
},
5: {
part: [ [ 66, 75 ], [ 777, 50 ] ],
background: "bg1"
},
6: {
part: [ [ 11, 75 ], [ 12, 50 ] ],
background: "bg3"
},
7: {
part: [ [ 14, 75 ], [ 2, 50 ] ],
background: "bg4"
},
8: {
part: [ [ 5, 75 ], [ 1, 50 ] ],
background: "bg3"
},
9: {
part: [ [ 13, 95 ], [ 14, 50 ] ],
background: "bg4"
},
10: {
part: [ [ 7, 75 ], [ 8, 50 ] ],
background: "bg2"
}
}
};
cc._RF.pop();
}, {} ],
statemachine: [ function(t, e) {
"use strict";
cc._RF.push(e, "fc74fKj4LlJQosPl9s18BCN", "statemachine");
var i = cc.Class({
init: function() {},
cleanup: function() {},
setData: function() {},
onEnter: function() {},
onExit: function() {},
onUpdate: function() {}
});
e.exports = {
state: i,
statemachine: function() {
this.init = function(t) {
this.cleanUp();
this.states = t;
for (var e in this.states) {
this.states[e].statemachine = this;
this.states[e].init();
}
};
this.getprestate = function() {
return this.preState ? this.preState.statename : "";
};
this.getcurrentstatename = function() {
return this.currentState ? this.currentState.statename : "";
};
this.cleanUp = function() {
this.states = {};
this.currentState = null;
this.preState = null;
};
this.switchToState = function(t, e, i) {
var s = this.states[t];
if (s) {
if (i || !this.currentState || this.currentState.statename != s.statename) {
if (this.currentState) {
this.preState = this.currentState;
this.currentState.onExit();
}
this.currentState = s;
this.currentState.onEnter(e);
}
} else console.log(t + " not exit");
};
this.update = function(t) {
this.currentState && this.currentState.onUpdate(t);
};
}
};
cc._RF.pop();
}, {} ],
storage: [ function(t, e) {
"use strict";
cc._RF.push(e, "6b15dTkIHFMMYdCt21EPeit", "storage");
e.exports = {
set: function(t, e) {
try {
cc.sys.localStorage.setItem(t, e);
return !0;
} catch (t) {
console.log(t);
}
return !1;
},
get: function(t) {
return cc.sys.localStorage.getItem(t);
},
setjson: function(t, e) {
this.set(t, JSON.stringify(e));
},
getjson: function(t) {
var e = this.get(t);
if (e) try {
return JSON.parse(e);
} catch (t) {}
return null;
},
remove: function(t) {
cc.sys.localStorage.removeItem(t);
},
hasItem: function(t) {
var e = cc.sys.localStorage.getItem(t);
return cc.sys.platform == cc.sys.WECHAT_GAME ? "" != e || "number" == typeof e : null != e && null != e;
},
setData: function(t, e) {
var i = {};
i[t] = e;
cc.log("storage====set== " + JSON.stringify(i));
return this.set(t, JSON.stringify(i));
},
getStringData: function(t) {
cc.log("storage====get== start" + t);
var e = cc.sys.localStorage.getItem(t);
if (!e) return "0";
var i = null;
try {
i = JSON.parse(e);
} catch (t) {
console.log(t);
}
cc.log("storage====get== " + i);
if (!i) return "0";
cc.log("storage====get== " + i[t]);
return i[t];
}
};
cc._RF.pop();
}, {} ],
syshow: [ function(t, e) {
"use strict";
cc._RF.push(e, "1608dbtu2lNnbv/lS0/9/Uz", "syshow");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
cc.playerData.stagesy < 51 && (this.node.active = !1);
}
});
cc._RF.pop();
}, {} ],
tableView: [ function(t, e) {
"use strict";
cc._RF.push(e, "9aba29YKexFXolpweZzJPKj", "tableView");
var i = cc.Enum({
Horizontal: 0,
Vertical: 1
}), s = cc.Enum({
None: 0,
Up: 1,
Down: 2,
Left: 3,
Rigth: 4
}), n = cc.Enum({
LEFT_TO_RIGHT__TOP_TO_BOTTOM: 0,
TOP_TO_BOTTOM__LEFT_TO_RIGHT: 1
}), a = cc.Enum({
Scroll: 0,
Flip: 1
});
cc.Node.prototype.convertToWorldSpace2 = function(t) {
this._updateWorldMatrix();
var e = new cc.Vec2(t.x - this._anchorPoint.x * this._contentSize.width, t.y - this._anchorPoint.y * this._contentSize.height);
return cc.Vec2.transformMat4(e, e, this._worldMatrix);
};
function o(t, e) {
return cc.v2(t.x - e.x, t.y - e.y);
}
function c(t, e) {
if (t.length <= 1) return t;
for (var i = Math.floor(t.length / 2), s = t[i], n = [], a = [], o = 0; o < t.length; o++) o !== i && (e ? e(t[o], s) ? n.push(t[o]) : a.push(t[o]) : t[o] <= s ? n.push(t[o]) : a.push(t[o]));
return c(n, e).concat([ s ], c(a, e));
}
function r(t, e) {
for (var i = 0, s = t.children, n = s.length; i < n; i++) if (s[i]._cellIndex === e) return s[i];
return null;
}
var l = cc.Class({
extends: cc.ScrollView,
properties: {
_data: null,
_minCellIndex: 0,
_maxCellIndex: 0,
_paramCount: 0,
_count: 0,
_cellCount: 0,
_showCellCount: 0,
_groupCellCount: null,
_scrollDirection: s.None,
_cellPool: null,
_page: 0,
_pageTotal: 0,
cell: {
default: null,
type: cc.Prefab,
notify: function() {}
},
ScrollModel: {
default: 0,
type: i,
notify: function() {
if (this.ScrollModel === i.Horizontal) {
this.horizontal = !0;
this.vertical = !1;
this.verticalScrollBar = null;
} else {
this.vertical = !0;
this.horizontal = !1;
this.horizontalScrollBar = null;
}
},
tooltip: "横向纵向滑动"
},
ViewType: {
default: 0,
type: a,
notify: function() {
this.ViewType === a.Flip ? this.inertia = !1 : this.inertia = !0;
},
tooltip: "为Scroll时,不做解释\n为Flipw时，在Scroll的基础上增加翻页的行为"
},
isFill: {
default: !1,
tooltip: "当节点不能铺满一页时，选择isFill为true会填充节点铺满整个view"
},
Direction: {
default: 0,
type: n,
tooltip: "规定cell的排列方向"
},
pageChangeEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: "仅当ViewType为pageView时有效，初始化或翻页时触发回调，向回调传入两个参数，参数一为当前处于哪一页，参数二为一共多少页"
}
},
statics: {
_cellPoolCache: {}
},
onLoad: function() {
var t = this;
this.needrefresh = !0;
l._tableView.push(this);
var e = this.node.destroy;
this.node.destroy = function() {
t.clear();
e.call(t.node);
};
var i = this.node._onPreDestroy;
this.node._onPreDestroy = function() {
t.clear();
i.call(t.node);
};
},
onDestroy: function() {
for (var t in l._tableView) if (l._tableView[t] === this) {
l._tableView.splice(t);
return;
}
},
_initCell: function(t, e) {
if (this.ScrollModel === i.Horizontal && this.Direction === n.TOP_TO_BOTTOM__LEFT_TO_RIGHT || this.ScrollModel === i.Vertical && this.Direction === n.LEFT_TO_RIGHT__TOP_TO_BOTTOM) {
for (var s = t._cellIndex * t.childrenCount, o = 0; o < t.childrenCount; ++o) if (r = t.children[o].getComponent("viewCell")) {
r._cellInit_(this);
r.init(s + o, this._data, e, [ t._cellIndex, o ]);
}
} else if (this.ViewType === a.Flip) {
var c = (s = Math.floor(t._cellIndex / this._showCellCount)) * this._showCellCount * t.childrenCount;
for (o = 0; o < t.childrenCount; ++o) if (r = t.children[o].getComponent("viewCell")) {
r._cellInit_(this);
r.init(this._showCellCount * o + t._cellIndex % this._showCellCount + c, this._data, e, [ o + s * t.childrenCount, o ]);
}
} else for (o = 0; o < t.childrenCount; ++o) {
var r;
if (r = t.children[o].getComponent("viewCell")) {
r._cellInit_(this);
r.init(o * this._count + t._cellIndex, this._data, e, [ o, o ]);
}
}
},
_setCellPosition: function(t, e) {
if (this.ScrollModel === i.Horizontal) {
t.x = 0 === e ? -this.content.width * this.content.anchorX + t.width * t.anchorX : r(this.content, e - 1).x + t.width;
t.y = (t.anchorY - this.content.anchorY) * t.height;
} else {
t.y = 0 === e ? this.content.height * (1 - this.content.anchorY) - t.height * (1 - t.anchorY) : r(this.content, e - 1).y - t.height;
t.x = (t.anchorX - this.content.anchorX) * t.width;
}
},
_addCell: function(t) {
var e = this._getCell();
this._setCellAttr(e, t);
this._setCellPosition(e, t);
e.parent = this.content;
this._initCell(e);
},
_setCellAttr: function(t, e) {
t.setSiblingIndex(e >= t._cellIndex ? this._cellCount : 0);
t._cellIndex = e;
},
_addCellsToView: function() {
for (var t = 0; t <= this._maxCellIndex; ++t) this._addCell(t);
},
_getCell: function() {
if (0 === this._cellPool.size()) {
var t = cc.instantiate(this.cell), e = new cc.Node();
e.anchorX = .5;
e.anchorY = .5;
var s = 0;
if (this.ScrollModel === i.Horizontal) {
e.width = t.width;
var n = Math.floor(this.content.height / t.height);
e.height = this.content.height;
for (var a = 0; a < n; ++a) {
t || (t = cc.instantiate(this.cell));
t.x = (t.anchorX - .5) * t.width;
t.y = e.height / 2 - t.height * (1 - t.anchorY) - s;
s += t.height;
t.parent = e;
t = null;
}
} else {
e.height = t.height;
n = Math.floor(this.content.width / t.width);
e.width = this.content.width;
for (a = 0; a < n; ++a) {
t || (t = cc.instantiate(this.cell));
t.y = (t.anchorY - .5) * t.height;
t.x = -e.width / 2 + t.width * t.anchorX + s;
s += t.width;
t.parent = e;
t = null;
}
}
this._cellPool.put(e);
}
return this._cellPool.get();
},
_getCellSize: function() {
var t = this._getCell(), e = t.getContentSize();
this._cellPool.put(t);
return e;
},
_getGroupCellCount: function() {
var t = this._getCell(), e = t.childrenCount;
this._cellPool.put(t);
return e;
},
clear: function() {
for (var t = this.content.childrenCount - 1; t >= 0; --t) this._cellPool.put(this.content.children[t]);
this._cellCount = 0;
this._showCellCount = 0;
},
reload: function(t) {
void 0 !== t && (this._data = t);
for (var e = this.content.childrenCount - 1; e >= 0; --e) this._initCell(this.content.children[e], !0);
},
_getCellPoolCacheName: function() {
return this.ScrollModel === i.Horizontal ? this.cell.name + "h" + this.content.height : this.cell.name + "w" + this.content.width;
},
_initTableView: function() {
this._cellPool && this.clear();
var t = this._getCellPoolCacheName();
l._cellPoolCache[t] || (l._cellPoolCache[t] = new cc.NodePool("viewCell"));
this._cellPool = l._cellPoolCache[t];
this._cellSize = this._getCellSize();
this._groupCellCount = this._getGroupCellCount();
this._count = Math.ceil(this._paramCount / this._groupCellCount);
if (this.ScrollModel === i.Horizontal) {
this._view.width = this.node.width;
this._view.x = (this._view.anchorX - this.node.anchorX) * this._view.width;
this._cellCount = Math.ceil(this._view.width / this._cellSize.width) + 1;
if (this.ViewType === a.Flip) if (this._cellCount > this._count) {
this.isFill ? this._cellCount = Math.floor(this._view.width / this._cellSize.width) : this._cellCount = this._count;
this._showCellCount = this._cellCount;
this._pageTotal = 1;
} else {
this._pageTotal = Math.ceil(this._count / (this._cellCount - 1));
this._count = this._pageTotal * (this._cellCount - 1);
this._showCellCount = this._cellCount - 1;
} else if (this._cellCount > this._count) {
this.isFill ? this._cellCount = Math.floor(this._view.width / this._cellSize.width) : this._cellCount = this._count;
this._showCellCount = this._cellCount;
} else this._showCellCount = this._cellCount - 1;
this.content.width = this._count * this._cellSize.width;
this.stopAutoScroll();
this.scrollToLeft();
} else {
this._view.height = this.node.height;
this._view.y = (this._view.anchorY - this.node.anchorY) * this._view.height;
this._cellCount = Math.ceil(this._view.height / this._cellSize.height) + 1;
if (this.ViewType === a.Flip) if (this._cellCount > this._count) {
this.isFill ? this._cellCount = Math.floor(this._view.height / this._cellSize.height) : this._cellCount = this._count;
this._showCellCount = this._cellCount;
this._pageTotal = 1;
} else {
this._pageTotal = Math.ceil(this._count / (this._cellCount - 1));
this._count = this._pageTotal * (this._cellCount - 1);
this._showCellCount = this._cellCount - 1;
} else if (this._cellCount > this._count) {
this.isFill ? this._cellCount = Math.floor(this._view.height / this._cellSize.height) : this._cellCount = this._count;
this._showCellCount = this._cellCount;
} else this._showCellCount = this._cellCount - 1;
this.content.height = this._count * this._cellSize.height;
this.stopAutoScroll();
this.scrollToTop();
}
this._changePageNum(1 - this._page);
this._lastOffset = this.getScrollOffset();
this._minCellIndex = 0;
this._maxCellIndex = this._cellCount - 1;
this._addCellsToView();
},
initTableView: function(t, e) {
this._paramCount = t;
this._data = e;
if (this.ScrollModel === i.Horizontal) {
this.horizontal = !0;
this.vertical = !1;
} else {
this.vertical = !0;
this.horizontal = !1;
}
this.verticalScrollBar && this.verticalScrollBar.node.on("size-changed", function() {
this._updateScrollBar(this._getHowMuchOutOfBoundary());
}, this);
this.horizontalScrollBar && this.horizontalScrollBar.node.on("size-changed", function() {
this._updateScrollBar(this._getHowMuchOutOfBoundary());
}, this);
this.node.getComponent(cc.Widget) && this.node.getComponent(cc.Widget).updateAlignment();
this._initTableView();
},
_onTouchBegan: function(t, e) {
this._super(t, e);
this._touchstart(t);
},
_onTouchMoved: function(t) {
if (this.enabledInHierarchy) {
var e = t.touch;
this.content && this._handleMoveLogic(e);
if (this.cancelInnerEvents) {
if (o(e.getLocation(), e.getStartLocation()).mag() > 7 && !this._touchMoved && t.target !== this.node) {
var i = new cc.Event.EventTouch(t.getTouches(), t.bubbles);
i.type = cc.Node.EventType.TOUCH_CANCEL;
i.touch = t.touch;
i.simulate = !0;
t.target.emit(cc.Node.EventType.TOUCH_CANCEL, i);
this._touchMoved = !0;
}
this._stopPropagationIfTargetIsMe(t);
this._touchmove(t);
}
}
},
_onTouchEnded: function(t, e) {
this._super(t, e);
this._touchend(t);
},
_onTouchCancelled: function(t, e) {
this._super(t, e);
this._touchend(t);
},
stopAutoScroll: function() {
this._scrollDirection = s.None;
this._super();
},
scrollToBottom: function(t, e) {
this._scrollDirection = s.Up;
this._super(t, e);
},
scrollToTop: function(t, e) {
this._scrollDirection = s.Down;
this._super(t, e);
},
scrollToLeft: function(t, e) {
this._scrollDirection = s.Rigth;
this._super(t, e);
},
scrollToRight: function(t, e) {
this._scrollDirection = s.Left;
this._super(t, e);
},
scrollToOffset: function(t, e, n) {
var a = o(t, this.getScrollOffset());
this.ScrollModel === i.Horizontal ? a.x > 0 ? this._scrollDirection = s.Left : a.x < 0 && (this._scrollDirection = s.Rigth) : a.y > 0 ? this._scrollDirection = s.Up : a.y < 0 && (this._scrollDirection = s.Down);
this._super(t, e, n);
},
addScrollEvent: function(t, e, i) {
var s = new cc.Component.EventHandler();
s.target = t;
s.component = e;
s.handler = i;
this.scrollEvents.push(s);
},
removeScrollEvent: function(t) {
for (var e in this.scrollEvents) if (this.scrollEvents[e].target === t) {
this.scrollEvents.splice(e, 1);
return;
}
},
clearScrollEvent: function() {
this.scrollEvents = [];
},
addPageEvent: function(t, e, i) {
var s = new cc.Component.EventHandler();
s.target = t;
s.component = e;
s.handler = i;
this.pageChangeEvents.push(s);
},
removePageEvent: function(t) {
for (var e = 0; e < this.pageChangeEvents.length; e++) if (this.pageChangeEvents[e].target === t) {
this.pageChangeEvents.splice(e, 1);
return;
}
},
clearPageEvent: function() {
this.pageChangeEvents = [];
},
scrollToNextPage: function() {
this.scrollToPage(this._page + 1);
},
scrollToLastPage: function() {
this.scrollToPage(this._page - 1);
},
scrollToPage: function(t) {
if (this.ViewType === a.Flip && t !== this._page && !(t < 1 || t > this._pageTotal)) {
var e = .3 * Math.abs(t - this._page);
this._changePageNum(t - this._page);
var i = this._view.width, s = this._view.height;
i = (this._page - 1) * i;
s = (this._page - 1) * s;
this.scrollToOffset({
x: i,
y: s
}, e);
}
},
getCells: function(t) {
var e = [], i = c(this.content.children, function(t, e) {
return t._cellIndex < e._cellIndex;
});
for (var s in i) {
var n = i[s];
for (var a in n.children) e.push(n.children[a]);
}
t(e);
},
getData: function() {
return this._data;
},
getGroupsRange: function(t) {
for (var e = [], i = this._minCellIndex; i <= this._maxCellIndex; i++) e.push(i);
t(e);
},
_changePageNum: function(t) {
this._page += t;
this._page <= 0 ? this._page = 1 : this._page > this._pageTotal && (this._page = this._pageTotal);
for (var e = 0; e < this.pageChangeEvents.length; e++) this.pageChangeEvents[e].emit([ this._page, this._pageTotal ]);
},
_touchstart: function() {
this.ScrollModel === i.Horizontal ? this.horizontal = !1 : this.vertical = !1;
},
_touchmove: function(t) {
if (this.horizontal === this.vertical) {
var e = t.getStartLocation(), s = t.getLocation();
if (this.ScrollModel === i.Horizontal) {
if (Math.abs(s.x - e.x) <= 7) return;
} else if (Math.abs(s.y - e.y) <= 7) return;
this.ScrollModel === i.Horizontal ? this.horizontal = !0 : this.vertical = !0;
}
},
_touchend: function(t) {
this.ScrollModel === i.Horizontal ? this.horizontal = !0 : this.vertical = !0;
this.ViewType === a.Flip && this._pageTotal > 1 && this._pageMove(t);
},
_pageMove: function(t) {
var e = this._view.width, n = this._view.height;
if (this.ViewType === a.Flip) {
var o = this.getScrollOffset(), c = this.getMaxScrollOffset();
if (this.ScrollModel === i.Horizontal) {
if (o.x >= 0 || o.x <= -c.x) return;
n = 0;
if (Math.abs(t.getLocation().x - t.getStartLocation().x) > this._view.width / 4) if (this._scrollDirection === s.Left) {
if (!(this._page < this._pageTotal)) return;
this._changePageNum(1);
} else if (this._scrollDirection === s.Rigth) {
if (!(this._page > 1)) return;
this._changePageNum(-1);
}
} else {
if (o.y >= c.y || o.y <= 0) return;
e = 0;
if (Math.abs(t.getLocation().y - t.getStartLocation().y) > this._view.height / 4) if (this._scrollDirection === s.Up) {
if (!(this._page < this._pageTotal)) return;
this._changePageNum(1);
} else if (this._scrollDirection === s.Down) {
if (!(this._page > 1)) return;
this._changePageNum(-1);
}
}
e = (this._page - 1) * e;
n = (this._page - 1) * n;
this.scrollToOffset({
x: e,
y: n
}, .3);
}
},
_getBoundingBoxToWorld: function(t) {
var e = t.convertToWorldSpace2(cc.v2(0, 0));
return cc.rect(e.x, e.y, t.width, t.height);
},
_updateCells: function() {
if (this.ScrollModel === i.Horizontal) {
if (this._scrollDirection === s.Left) {
if (this._maxCellIndex < this._count - 1) {
var t = this._getBoundingBoxToWorld(this._view);
do {
var e = r(this.content, this._minCellIndex);
if (!((n = this._getBoundingBoxToWorld(e)).xMax <= t.xMin)) break;
e.x = r(this.content, this._maxCellIndex).x + e.width;
this._minCellIndex++;
this._maxCellIndex++;
if (this.needrefresh || n.xMax + (this._maxCellIndex - this._minCellIndex + 1) * e.width > t.xMin) {
this._setCellAttr(e, this._maxCellIndex);
this._initCell(e);
}
} while (this._maxCellIndex !== this._count - 1);
}
} else if (this._scrollDirection === s.Rigth && this._minCellIndex > 0) {
t = this._getBoundingBoxToWorld(this._view);
do {
e = r(this.content, this._maxCellIndex);
if (!((n = this._getBoundingBoxToWorld(e)).xMin >= t.xMax)) break;
e.x = r(this.content, this._minCellIndex).x - e.width;
this._minCellIndex--;
this._maxCellIndex--;
if (this.needrefresh || n.xMin - (this._maxCellIndex - this._minCellIndex + 1) * e.width < t.xMax) {
this._setCellAttr(e, this._minCellIndex);
this._initCell(e);
}
} while (0 !== this._minCellIndex);
}
} else if (this._scrollDirection === s.Up) {
if (this._maxCellIndex < this._count - 1) {
t = this._getBoundingBoxToWorld(this._view);
do {
e = r(this.content, this._minCellIndex);
if (!((n = this._getBoundingBoxToWorld(e)).yMin >= t.yMax)) break;
e.y = r(this.content, this._maxCellIndex).y - e.height;
this._minCellIndex++;
this._maxCellIndex++;
if (this.needrefresh || n.yMin - (this._maxCellIndex - this._minCellIndex + 1) * e.height < t.yMax) {
this._setCellAttr(e, this._maxCellIndex);
this._initCell(e);
}
} while (this._maxCellIndex !== this._count - 1);
}
} else if (this._scrollDirection === s.Down && this._minCellIndex > 0) {
t = this._getBoundingBoxToWorld(this._view);
do {
var n;
e = r(this.content, this._maxCellIndex);
if (!((n = this._getBoundingBoxToWorld(e)).yMax <= t.yMin)) break;
e.y = r(this.content, this._minCellIndex).y + e.height;
this._minCellIndex--;
this._maxCellIndex--;
if (this.needrefresh || n.yMax + (this._maxCellIndex - this._minCellIndex + 1) * e.width > t.yMin) {
this._setCellAttr(e, this._minCellIndex);
this._initCell(e);
}
} while (0 !== this._minCellIndex);
}
},
_getScrollDirection: function() {
var t = this.getScrollOffset(), e = this._lastOffset;
this._lastOffset = t;
t = o(t, e);
this.ScrollModel === i.Horizontal ? t.x > 0 ? this._scrollDirection = s.Rigth : t.x < 0 ? this._scrollDirection = s.Left : this._scrollDirection = s.None : t.y < 0 ? this._scrollDirection = s.Down : t.y > 0 ? this._scrollDirection = s.Up : this._scrollDirection = s.None;
},
update: function(t) {
this._super(t);
if (this._cellCount !== this._showCellCount && 1 !== this._pageTotal) {
this._getScrollDirection();
this._updateCells();
}
}
});
l._tableView = [];
l.reload = function() {
for (var t in l._tableView) l._tableView[t].reload();
};
l.clear = function() {
for (var t in l._tableView) l._tableView[t].clear();
};
cc._RF.pop();
}, {} ],
talentcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "ec072e656lHo7xMBjSpE+uv", "talentcfg");
var i, s = t("enumcfg"), n = s.enumproperty, a = s.enumgameflag, o = s.enumskilltype, c = ((i = {
1: {
name: "测试",
property: [ [ n.flee, 100 ], [ n.hit, 100 ] ]
},
2: {
name: "刺骨极寒",
qulity: 4,
buffs: [ 1001 ]
},
3: {
name: "灼热地狱",
qulity: 4,
buffs: [ 1003 ]
},
4: {
name: "静电场",
qulity: 4,
buffs: [ 1005 ]
},
5: {
name: "致命深寒",
qulity: 5,
buffs: [ 1002 ]
},
6: {
name: "氧化燃烧",
qulity: 5,
buffs: [ 1004 ]
},
7: {
name: "聚雷针",
qulity: 5,
buffs: [ 1006 ]
},
8: {
name: "移动施法",
flag: a.movemag
},
9: {
name: "施法不打断",
flag: a.hurtmag
},
101: {
name: "刺杀之心",
property: [ [ n.cri, 10 ] ]
},
102: {
name: "闪避之舞",
property: [ [ n.flee, 10 ] ]
},
1001: {
name: "汉室宗亲",
des: "继承了汉皇血脉，各方面都很强大",
qulity: 5,
property: [ [ n.vit, 5 ], [ n.str, 5 ], [ n.int, 5 ], [ n.dex, 5 ], [ n.agi, 5 ], [ n.luk, 5 ] ]
},
1002: {
name: "隐忍",
des: "你是一个能够隐忍的人",
qulity: 2,
property: [ [ n.flee + 100, 3 ] ]
},
1003: {
name: "仁德",
des: "你十分仁慈",
qulity: 3,
property: [ [ n.yongchang, 10 ] ]
},
1004: {
name: "剑道天赋",
des: "拥有绝强的剑道天赋，似乎天生就是用剑的好材料",
qulity: 4,
weaponup: [ o.sword, 15 ]
},
1005: {
name: "扒窃直觉",
des: "做为一个老扒手的直觉",
qulity: 3,
property: [ [ n.hit + 100, 5 ] ]
},
1006: {
name: "精神领袖",
des: "打工是不可能打工的",
qulity: 4,
property: [ [ n.flee + 100, 5 ], [ n.movespeed + 100, 10 ] ]
},
1007: {
name: "凛冬血脉",
des: "拥有强大的凛冬血脉，对寒冰属性的东西有着天生的亲切",
qulity: 4,
weaponup: [ o.cold, 8 ]
},
1008: {
name: "桀骜",
des: "我命由我不由天",
qulity: 3,
property: [ [ n.cri + 100, 3 ] ]
},
1009: {
name: "无双",
des: "天下无双",
qulity: 5,
property: [ [ n.cri + 100, 5 ], [ n.cridmg + 100, 5 ], [ n.flee + 100, 3 ], [ n.hit + 100, 3 ] ]
},
1010: {
name: "刚愎",
des: "为人刚愎残暴！",
qulity: 2,
property: [ [ n.cri + 100, 2 ] ]
},
1011: {
name: "聪慧",
des: "十分聪明",
qulity: 2,
property: [ [ n.exp, 5 ] ]
},
1012: {
name: "医道",
des: "你对医术有很深的了解",
qulity: 1,
property: [ [ n.healdmg, 5 ] ]
},
1013: {
name: "精通医道",
des: "你对医术有更深的了解",
qulity: 3,
property: [ [ n.healdmg, 15 ] ]
},
1014: {
name: "信念",
des: "你拥有十足的信念",
qulity: 1,
property: [ [ n.hit + 100, 1 ] ]
},
1015: {
name: "猫步",
des: "你十分灵敏",
qulity: 2,
property: [ [ n.agi, 5 ], [ n.flee + 2, 2 ] ]
},
1016: {
name: "决心",
des: "拥有难以想象的决心",
qulity: 3,
property: [ [ n.vit, 2 ], [ n.str, 2 ], [ n.int, 2 ], [ n.dex, 2 ], [ n.agi, 2 ], [ n.luk, 2 ] ]
},
1018: {
name: "天遁心法",
des: "学习了蜀山秘法《天遁宝录》上的玄妙功法",
qulity: 4,
property: [ [ n.cri + 100, 5 ] ],
weaponup: [ o.pyh, 5 ]
},
1019: {
name: "宇宙能量",
des: "召唤宇宙的能量加强自身",
qulity: 4,
property: [ [ n.healdmg, 5 ] ],
weaponup: [ o.mag, 5 ]
},
1021: {
name: "残忍",
des: "你变得有些残忍",
qulity: 2,
property: [ [ n.cri + 100, 2 ] ]
}
})[1021] = {
name: "狂热",
des: "你变得似乎有些疯狂",
qulity: 2,
property: [ [ n.cri + 100, 1 ], [ n.agi, 2 ] ]
}, i[1017] = {
name: "疾飞",
des: "你的速度非常之快",
qulity: 3,
property: [ [ n.agi, 10 ] ]
}, i[1020] = {
name: "幸运",
des: "你十分幸运",
qulity: 4,
property: [ [ n.luk, 25 ] ]
}, i[1022] = {
name: "结实",
des: "你变得结实了",
qulity: 3,
property: [ [ n.vit, 10 ] ]
}, i[1023] = {
name: "强壮",
des: "你变得强壮了",
qulity: 3,
property: [ [ n.str, 10 ] ]
}, i[1024] = {
name: "睿智",
des: "你变得睿智了",
qulity: 3,
property: [ [ n.int, 10 ] ]
}, i[1025] = {
name: "灵巧",
des: "你变得灵巧了",
qulity: 3,
property: [ [ n.dex, 10 ] ]
}, i[1026] = {
name: "玩火",
des: "你对火焰的把控更加厉害",
qulity: 3,
weaponup: [ o.fire, 5 ]
}, i[1027] = {
name: "控冰",
des: "你对寒冰的把控更加厉害",
qulity: 3,
weaponup: [ o.cold, 5 ]
}, i[1028] = {
name: "御雷",
des: "你对雷电的把控更加厉害",
qulity: 3,
weaponup: [ o.thunder, 5 ]
}, i[1029] = {
name: "龙族血统",
des: "有着高贵的龙族血统",
qulity: 4,
weaponup: [ o.thunder, 5 ],
buffs: [ 10002 ]
}, i[1030] = {
name: "苍龙之瞳",
des: "有着能够看穿迷惘的龙之瞳",
qulity: 5,
property: [ [ n.cri + 100, 5 ], [ n.hit + 100, 5 ] ]
}, i[1031] = {
name: "苍龙之力",
des: "有着高贵的龙族血统",
qulity: 5,
weaponup: [ o.alldmg, 7 ]
}, i[1032] = {
name: "万人敌",
des: "有着燕人血统，对各种战斗技巧有着特殊的天赋",
qulity: 5,
weaponup: [ o.pyh, 10 ]
}, i[1033] = {
name: "鲁莽",
des: "你是一个鲁莽的人",
qulity: 1,
property: [ [ n.cri + 100, 2 ], [ n.def, -10 ] ]
}, i[1034] = {
name: "强健体魄",
des: "你拥有超人的体魄",
qulity: 1,
property: [ [ n.maxhp, 750 ] ]
}, i[1035] = {
name: "武圣",
des: "忠贞、守义、勇猛！世人尊称为圣！",
qulity: 5,
weaponup: [ o.pyh, 15 ]
}, i[1036] = {
name: "忠义无双",
des: "忠义无双之人！",
qulity: 4,
property: [ [ n.cri + 100, 5 ], [ n.hit + 100, 5 ] ]
}, i[1037] = {
name: "虔诚",
des: "你十分虔诚",
qulity: 2,
property: [ [ n.healdmg, 10 ] ]
}, i[1038] = {
name: "烈焰圣体",
des: "天生对火焰属性有着特殊亲和力，火属性伤害提高10%",
qulity: 5,
weaponup: [ o.fire, 10 ]
}, i[1039] = {
name: "寒冰圣体",
des: "天生对寒冰属性有着特殊亲和力，冰属性伤害提高10%",
qulity: 5,
weaponup: [ o.cold, 10 ]
}, i[1040] = {
name: "雷霆圣体",
des: "天生对雷电属性有着特殊亲和力，雷属性伤害提高10%",
qulity: 5,
weaponup: [ o.thunder, 10 ]
}, i[1041] = {
name: "法神",
des: "移动施法，施法不会被打断",
qulity: 5,
property: [ [ n.matk + 100, 15 ] ],
flag: a.movemag | a.hurtmag
}, i[1042] = {
name: "法师信仰",
des: "施法不会被打断",
qulity: 5,
property: [ [ n.matk + 100, 5 ] ],
flag: a.hurtmag
}, i[1043] = {
name: "霸体",
des: "不会因伤害而硬直",
qulity: 5,
buffs: [ 10005 ]
}, i[1044] = {
name: "移动施法",
des: "移动施法",
qulity: 5,
flag: a.movemag
}, i[1045] = {
name: "回血",
des: "每秒回血",
qulity: 5,
buffs: [ 10005 ]
}, i[2001] = {
name: "野蛮之力",
qulity: 4,
property: [ [ n.cri + 100, 2 ] ],
weaponup: [ o.pyh, 6 ]
}, i[2002] = {
des: "不会被暴击，不会因伤害而硬直",
qulity: 5,
flag: a.notbecri,
buffs: [ 10005 ]
}, i);
e.exports = c;
cc._RF.pop();
}, {
enumcfg: "enumcfg"
} ],
talentobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "fce3f4APE1MBbtjC3iyDsCc", "talentobj");
var i = t("talentcfg");
e.exports = function() {
this.init = function(t, e) {
this.id = t;
this.lv = e;
this.cfg = i[t];
this.flag = this.cfg.flag;
this.maxlv = this.cfg.maxlv;
this.setproperty();
};
this.setproperty = function() {
this.property = [];
var t = this.cfg.property;
if (t) for (var e = t.length - 1; e >= 0; e--) this.property.push([ t[e][0], t[e][1] + t[e][2] * this.lv ]);
};
this.lvup = function() {
if (!(this.lv < this.maxlv)) return !1;
this.lv++;
this.setproperty();
};
};
cc._RF.pop();
}, {
talentcfg: "talentcfg"
} ],
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
testmove: [ function(t, e) {
"use strict";
cc._RF.push(e, "3c65aVBXQ1EdJtIgJib3Y75", "testmove");
cc.Class({
extends: cc.Component,
properties: {
fixy: !1
},
start: function() {
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
},
_touchMoveEvent: function(t) {
var e = this.node.convertToNodeSpaceAR(t.getLocation()), i = this.node.getPosition().x + e.x, s = this.node.getPosition().y + e.y;
this.node.x = i;
this.node.y = s;
this.fixy && this.node.y < 0 && (this.node.y = 0);
}
});
cc._RF.pop();
}, {} ],
testview: [ function(t, e) {
"use strict";
cc._RF.push(e, "2b28dAgsQlPhZlpiZ1Rmmls", "testview");
t("Utils");
cc.Class({
extends: cc.Component,
properties: {
nd_eye: {
default: null,
type: cc.Node,
serializable: !0
},
nd_target: {
default: null,
type: cc.Node,
serializable: !0
},
nd_l1: {
default: null,
type: cc.Node,
serializable: !0
},
nd_l2: {
default: null,
type: cc.Node,
serializable: !0
},
eyedis: 150,
eyeag: 60
},
start: function() {
var t = new XMLHttpRequest();
t.onreadystatechange = function() {
if (4 == t.readyState && t.status >= 200 && t.status < 400) {
var e = t.responseText;
console.log(e);
}
};
t.open("GET", "http://192.168.0.101/myphp/info.php?parma=2333345", !0);
t.send();
return t;
},
update: function() {}
});
cc._RF.pop();
}, {
Utils: "Utils"
} ],
tianjiazhuomian: [ function(t, e) {
"use strict";
cc._RF.push(e, "664a5hLDgJLUqV0Q+An+hkD", "tianjiazhuomian");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
var t = this;
this.node.active = !1;
i.checkhasicon(function() {
t.node.active = !0;
});
},
onclick: function() {
var t = this;
i.desktopicon(function() {
t.node.active = !1;
});
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
tileset: [ function(t, e) {
"use strict";
cc._RF.push(e, "de21dJifaxGfaitjMLBgXLj", "tileset");
cc.checktile = function(t, e, i) {
var s = i[t][e], n = !1, a = !1, o = !1, c = !1, r = !1, l = !1, h = !1, p = !1;
i[t - 1] && i[t - 1][e] === s && (n = !0);
i[t + 1] && i[t + 1][e] === s && (a = !0);
i[t][e + 1] === s && (c = !0);
i[t][e - 1] === s && (o = !0);
i[t + 1] && i[t + 1][e + 1] === s && (r = !0);
i[t + 1] && i[t + 1][e - 1] === s && (l = !0);
i[t - 1] && i[t - 1][e + 1] === s && (h = !0);
i[t - 1] && i[t - 1][e - 1] === s && (p = !0);
var d = {
m0: "C",
m1: "C",
m2: "C",
m3: "C"
};
if (n) {
c ? h || (d.m0 = "R_LT") : d.m0 = "T";
o ? p || (d.m2 = "R_LD") : d.m2 = "D";
} else {
d.m0 = c ? "L" : "LT";
d.m2 = o ? "L" : "LD";
}
if (a) {
c ? r || (d.m1 = "R_RT") : d.m1 = "T";
o ? l || (d.m3 = "R_RD") : d.m3 = "D";
} else {
d.m1 = c ? "R" : "RT";
d.m3 = o ? "R" : "RD";
}
return d;
};
cc._RF.pop();
}, {} ],
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
uiHelper: [ function(t, e) {
"use strict";
cc._RF.push(e, "8d933xtnopKwLbpTfVmSCmV", "uiHelper");
cc.Class({
extends: cc.Component,
properties: {
pb_tips: {
default: null,
type: cc.Prefab
},
pb_msg: {
default: null,
type: cc.Prefab
}
},
start: function() {
this.loadingCount = 0;
cc.uiHelper = this;
this.tipsarr = [];
this.tipnode = this.node.getChildByName("tipnode");
},
ColorTo_RGB: function(t) {
var e = 255 & t, i = 65280 & t;
i >>= 8;
var s = 16711680 & t;
s >>= 16;
return cc.color(e, i, s, 255);
},
showTips: function(t, e, i, s) {
var n = this.tipsarr.length > 0 ? this.tipsarr.pop() : cc.instantiate(this.pb_tips);
this.tipnode.addChild(n, 999);
n.getComponent("tips").initdata(t, e, i, s);
},
showLoading: function() {
this.loadingCount++;
if (null == this.loadUI) {
this.loadUI = cc.instantiate(this.pb_loadmask);
cc.find("DonotDestroy").addChild(this.loadUI);
}
this.loadUI.active = !0;
},
hideLoading: function() {
this.loadingCount--;
0 == this.loadingCount && this.loadUI && (this.loadUI.active = !1);
},
messageBox: function(t, e, i, s, n) {
if (!cc.msgpb) {
var a = cc.instantiate(this.pb_msg);
a.x = a.y = 0;
a.getComponent("messagebox").initdata(t, e, i, s);
n || (n = this.node);
n.addChild(a, 998);
cc.msgpb = a;
}
}
});
cc._RF.pop();
}, {} ],
uiMain: [ function(t, e) {
"use strict";
cc._RF.push(e, "292e1j+EAxImLjLTWySBaKi", "uiMain");
var i = cc.Button.prototype._onTouchEnded;
cc.Button.prototype._onTouchEnded = function(t) {
i.call(this, t);
cc.soundMgr.playSound("click");
};
var s = t("SDKManage"), n = t("Utils"), a = t("npccfg"), o = "ysadsuccess";
cc.Class({
extends: cc.Component,
properties: {
pb_role: {
default: null,
type: cc.Prefab
},
nd_map: {
default: null,
type: cc.Node
},
movejoy: {
default: null,
type: cc.Node
},
nd_pz: {
default: null,
type: cc.Node
},
pb_uirole: {
default: null,
type: cc.Prefab
},
pb_itemdetal: {
default: null,
type: cc.Prefab
},
pb_littlebag: {
default: null,
type: cc.Prefab
},
nd_up: {
default: null,
type: cc.Node
},
pb_npctalk: {
default: null,
type: cc.Prefab
},
npcnode: {
default: null,
type: cc.Node
},
pb_shop: {
default: null,
type: cc.Prefab
},
pb_fm: {
default: null,
type: cc.Prefab
},
pb_tiejiang: {
default: null,
type: cc.Prefab
},
pb_pet: {
default: null,
type: cc.Prefab
},
pb_itemnormal: {
default: null,
type: cc.Prefab
},
pb_learnpetskill: {
default: null,
type: cc.Prefab
},
pb_equipskill: {
default: null,
type: cc.Prefab
},
pb_chosepet: {
default: null,
type: cc.Prefab
},
lb_gold: {
default: null,
type: cc.Label
},
pb_stage: {
default: null,
type: cc.Prefab
},
pb_bank: {
default: null,
type: cc.Prefab
},
pb_xingxiang: {
default: null,
type: cc.Prefab
},
pb_hecheng: {
default: null,
type: cc.Prefab
},
pb_adhouse: {
default: null,
type: cc.Prefab
},
nd_flagexp: {
default: null,
type: cc.Node
},
nd_flagdrop: {
default: null,
type: cc.Node
},
nd_flaglight: {
default: null,
type: cc.Node
},
nd_youxiquan: {
default: null,
type: cc.Node
},
pb_zuobi: {
default: null,
type: cc.Prefab
},
pb_duihuan: {
default: null,
type: cc.Prefab
},
ui_lanren: {
default: null,
type: cc.Node
},
tg_shiqu: {
default: null,
type: cc.Toggle
},
tg_autoatk: {
default: null,
type: cc.Toggle
},
tg_guaji: {
default: null,
type: cc.Toggle
},
pb_setting: {
default: null,
type: cc.Prefab
},
nd_chengse: {
default: null,
type: cc.Node
},
tg_wujin: {
default: null,
type: cc.Toggle
},
anistate: {
default: null,
type: cc.Animation
},
pb_petbook: {
default: null,
type: cc.Prefab
},
pb_cpa: {
default: null,
type: cc.Prefab
},
dw_ys: {
default: null,
type: cc.Node
}
},
callcpa: function() {
var t = cc.instantiate(this.pb_cpa);
this.node.addChild(t);
},
lateUpdate: function() {},
onLoad: function() {
var t = this;
this.nodeupdate = !1;
s.youxiquan(this.nd_youxiquan);
setTimeout(function() {
s.showys(t.dw_ys);
}, 100);
cc.Notifier.on("goldchange", this, this.goldchange.bind(this));
cc.Notifier.on("addyuanshengad", this, this.addyuanshengad.bind(this));
cc.Notifier.on("refreshadflag", this, this.refreshadflag.bind(this));
cc.Notifier.on("refrshlanren", this, this.refrshlanren.bind(this));
cc.Notifier.on("loadcloud", this, this.loadcloud.bind(this));
cc.Notifier.on(o, this, this.refrshbp.bind(this));
},
onDestroy: function() {
s.cleangd();
s.destroyyouxiquan();
cc.Notifier.off("goldchange", this);
cc.Notifier.off("refreshadflag", this);
cc.Notifier.off("addyuanshengad", this);
cc.Notifier.off("refrshlanren", this);
cc.Notifier.off("loadcloud", this);
cc.Notifier.off(o, this);
},
goldchange: function() {
this.lb_gold.string = cc.playerData.gold;
},
refreshadflag: function() {
this.nd_flagexp.active = !!cc.expadd;
this.nd_flagdrop.active = !!cc.dropadd;
this.nd_flaglight.active = !!cc.shanguangadd;
this.nd_chengse.active = !!cc.chengseadd;
},
refrshbp: function() {
cc.playerData.adcount++;
cc.playerData.newbiemode2 = !1;
},
checkjiadian: function() {
var t = cc.playerData.player, e = 1 == t.lv && t.bppoint > 0 && 0 == t.zhuanshen;
if (this.newbieani !== e) {
this.newbieani = e;
if (e) this.anistate.play(); else {
this.anistate.stop();
this.anistate.node.scale = 1;
}
}
if (cc.isyuansheng && cc.lanrenmode && 0 == cc.playerData.adcount && !cc.playerData.newbiemode2) {
this.checkcount--;
if (this.checkcount <= 0) {
cc.playerData.newbiemode2 = !0;
cc.playerData.launchtime = cc.launchtime + 854e5;
}
}
},
start: function() {
this.newbieani = void 0;
this.refrshlanren();
this.initlanren();
cc.soundMgr.playbgm("bgm");
this.refreshadflag();
cc.uimain = this;
this.npcarr = [];
this.checkcount = 10;
for (var t = this.npcnode.getChildren(), e = 0; e < t.length; e++) {
var i = t[e], s = i.name.split(":");
i.zIndex = -i.y;
s[1] && this.npcarr.push({
x: i.x,
y: i.y,
width: i.width,
height: i.height,
id: s[1]
});
}
this.nd_up.zIndex = 1;
this.pzarr = this.nd_pz.getChildren();
this.playerarr = [];
this.player = cc.instantiate(this.pb_role);
this.player.getComponent("uiplayerctrl").initdata(!0);
this.playerarr.push(this.player.ctrl);
this.playerpet = cc.instantiate(this.pb_role);
this.playerpet.getComponent("uiplayerctrl").initdata(!1);
this.playerpet.ctrl.movetarget = this.player;
this.playerarr.push(this.playerpet.ctrl);
this.npcnode.addChild(this.player);
this.npcnode.addChild(this.playerpet);
var n = this.movejoy.getComponent("Joystick");
n.bindMoveCb(this.joyMove.bind(this));
n.bindEndCb(this.joyMoveEnd.bind(this));
n.bindStartCb(this.joyMoveBegin.bind(this));
n.setopamode();
this.player.y = 260;
this.playerpet.y = 260;
this.goldchange();
},
joyMove: function(t) {
this.player.ctrl.dir = cc.v2(Math.cos(t * (Math.PI / 180)), Math.sin(t * (Math.PI / 180)));
},
joyMoveEnd: function() {
var t = this;
this.player.ctrl.moving = !1;
this.npcarr = this.npcarr.sort(function(e, i) {
return Math.pow(t.player.x - e.x, 2) + Math.pow(t.player.y - e.y, 2) - (Math.pow(t.player.x - i.x, 2) + Math.pow(t.player.y - i.y, 2));
});
if (n.hitTestRectangle(this.npcarr[0], this.player)) {
var e = a[this.npcarr[0].id].condition;
if (e && e.sy && cc.playerData.stagesy < e.sy) return;
this.createnpctalk(this.npcarr[0].id);
}
},
joyMoveBegin: function() {
this.player.ctrl.moving = !0;
},
update: function(t) {
this.checkjiadian();
if (!this.nodeupdate) {
for (var e = this.playerarr.length - 1; e >= 0; e--) this.playerarr[e].doupdate(t, this.pzarr);
this.nd_map.x = -this.player.x;
this.nd_map.y = -this.player.y;
cc.playerData.update(t);
}
},
onclickuser: function() {
var t = cc.instantiate(this.pb_uirole);
this.node.addChild(t);
},
createiteminfo: function(t, e, i, s) {
var n = cc.instantiate(this.pb_itemdetal);
n.getComponent("uiitemdetail").initdata(t, e, i, s);
this.node.addChild(n);
},
createlittlebag: function(t) {
var e = cc.instantiate(this.pb_littlebag);
e.getComponent("uibag").initwithpos(t);
this.node.addChild(e);
},
createnpctalk: function(t) {
var e = cc.instantiate(this.pb_npctalk);
e.getComponent("uinpc").initdata(t);
this.node.addChild(e);
},
createshop: function(t) {
var e = cc.instantiate(this.pb_shop);
e.getComponent("uishop").initdata(t);
this.node.addChild(e);
},
createfm: function() {
var t = cc.instantiate(this.pb_fm);
this.node.addChild(t);
},
createfmbag: function(t) {
var e = cc.instantiate(this.pb_littlebag);
e.getComponent("uibag").initwithfm(t);
this.node.addChild(e);
},
createtiejiang: function() {
var t = cc.instantiate(this.pb_tiejiang);
this.node.addChild(t);
},
createpet: function() {
if (0 != cc.playerData.petbag.length) {
var t = cc.instantiate(this.pb_pet);
this.node.addChild(t);
} else cc.uiHelper.showTips("你还没有宠物");
},
createnormalinfo: function(t, e, i, s, n, a) {
var o = cc.instantiate(this.pb_itemnormal);
o.getComponent("uinormalitem").initdata(t, e, i, s, n, a);
this.node.addChild(o);
return o;
},
createleanpetskill: function(t) {
var e = cc.instantiate(this.pb_learnpetskill);
e.getComponent("uilearnskill").initdata(t);
this.node.addChild(e);
},
createequipskill: function(t) {
var e = cc.instantiate(this.pb_equipskill);
e.getComponent("uiequipskill").initdata(t);
this.node.addChild(e);
},
createchosepet: function() {
var t = cc.instantiate(this.pb_chosepet);
this.node.addChild(t);
},
createallbag: function() {
var t = cc.instantiate(this.pb_littlebag);
t.getComponent("uibag").initall();
this.node.addChild(t);
},
createstage: function() {
var t = cc.instantiate(this.pb_stage);
this.node.addChild(t);
},
createronglu: function() {
var t = cc.instantiate(this.pb_littlebag);
t.getComponent("uibag").initronglu();
this.node.addChild(t);
},
createsavebank: function() {
var t = cc.instantiate(this.pb_bank);
t.getComponent("uibank").initdata(1);
this.node.addChild(t);
},
createloadbank: function() {
var t = cc.instantiate(this.pb_bank);
t.getComponent("uibank").initdata(2);
this.node.addChild(t);
},
createshopsell: function() {
var t = cc.instantiate(this.pb_littlebag);
t.getComponent("uibag").initsell();
this.node.addChild(t);
},
createxx: function() {
var t = cc.instantiate(this.pb_xingxiang);
this.node.addChild(t);
},
createhc: function() {
if (0 != cc.playerData.pfarr.length) {
var t = cc.instantiate(this.pb_hecheng);
this.node.addChild(t);
} else cc.uiHelper.showTips("你没有任何配方");
},
createadhouse: function() {
var t = cc.instantiate(this.pb_adhouse);
this.node.addChild(t);
},
onclicksound: function() {
var t = cc.instantiate(this.pb_setting);
this.node.addChild(t);
},
callduihuan: function() {
var t = cc.instantiate(this.pb_duihuan);
this.node.addChild(t);
},
addyuanshengad: function() {
var t = cc.instantiate(this.pb_ys);
t.zIndex = 999;
this.node.addChild(t);
},
clickautoget: function() {
cc.autoget = this.tg_shiqu.isChecked;
},
clickautoatk: function() {
cc.autoatk = this.tg_autoatk.isChecked;
},
clickguaji: function() {
cc.guaji = this.tg_guaji.isChecked;
},
clickwujin: function() {
cc.wujinchongpa = this.tg_wujin.isChecked;
},
initlanren: function() {
this.tg_shiqu.isChecked = cc.autoget;
this.tg_autoatk.isChecked = cc.autoatk;
this.tg_guaji.isChecked = cc.guaji;
this.tg_wujin.isChecked = cc.wujinchongpa;
},
refrshlanren: function() {
this.ui_lanren.active = cc.lanrenmode;
},
loadcloud: function(t) {
this.nodeupdate = !0;
cc.sys.localStorage.setItem("commonsaveshuazi", t);
cc.uiHelper.showTips("下载成功");
},
createpetbook: function() {
var t = cc.instantiate(this.pb_petbook);
this.node.addChild(t);
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
Utils: "Utils",
npccfg: "npccfg"
} ],
uiRole: [ function(t, e) {
"use strict";
cc._RF.push(e, "e2086GcOadDZbNbNDgaYpM6", "uiRole");
var i = t("gameConfig").itemConfig, s = t("gamevaule"), n = t("enumcfg"), a = (n.qulitycolor, 
n.typename, n.enumproperty), o = n.enumpropertyname, c = t("SDKManage"), r = t("Utils");
cc.Class({
extends: cc.Component,
properties: {
btn_equips: {
default: [],
type: cc.Node
},
nd_state1: {
default: null,
type: cc.Node
},
nd_state2: {
default: null,
type: cc.Node
},
nd_state3: {
default: null,
type: cc.Node
},
pb_citiao: {
default: null,
type: cc.Prefab
},
lb_water: {
default: null,
type: cc.Label
},
lb_fire: {
default: null,
type: cc.Label
},
lb_thunder: {
default: null,
type: cc.Label
},
lb_leftpoint: {
default: null,
type: cc.Label
},
nd_jiadian: {
default: null,
type: cc.Node
},
pb_jiadian: {
default: null,
type: cc.Prefab
},
lb_lv: {
default: null,
type: cc.Label
},
pb_skill: {
default: null,
type: cc.Prefab
},
nd_skill: {
default: null,
type: cc.Node
},
sp_pet: {
default: null,
type: cc.Sprite
},
lb_petlv: {
default: null,
type: cc.Label
},
lb_cost: {
default: null,
type: cc.Label
},
nd_zhuanshen: {
default: null,
type: cc.Node
}
},
refreshpet: function() {
this.sp_pet.spriteFrame = null;
this.lb_petlv.string = " ";
var t = cc.playerData.battlepet;
if (t) {
t.lighting ? this.sp_pet.node.color = r.colorhuebyid(t.id) : this.sp_pet.node.color = new cc.Color(255, 255, 255);
var e = t.cfg, i = "";
t.zhuanshen > 0 && (i = t.zhuanshen + "转");
this.lb_petlv.string = i + "lv." + t.lv;
var s = this;
cc.resources.load("allrole/" + e.skinres + "_d_2", cc.SpriteFrame, function(t, e) {
t || (s.sp_pet.getComponent(cc.Sprite).spriteFrame = e);
});
}
},
clickpchangepet: function() {
0 != cc.playerData.petbag.length ? cc.uimain.createchosepet() : cc.uiHelper.showTips("你还没有宠物");
},
clickjiadian: function() {
var t = cc.instantiate(this.pb_jiadian);
this.node.addChild(t);
},
onLoad: function() {
cc.Notifier.on("refreshequip", this, this.refresh.bind(this));
cc.Notifier.on("downskill", this, this.downskill.bind(this));
cc.Notifier.on("refreshskill", this, this.refreshskill.bind(this));
cc.Notifier.on("refreshpet", this, this.refreshpet.bind(this));
},
onDestroy: function() {
cc.Notifier.off("refreshequip", this);
cc.Notifier.off("downskill", this);
cc.Notifier.off("refreshskill", this);
cc.Notifier.off("refreshpet", this);
},
downskill: function(t) {
cc.playerData.player.downskill(t);
this.refreshskill();
},
start: function() {
this.lb_cost.string = 100 * cc.playerData.player.lv;
this.gamevaule = new s();
this.skillarr = [];
for (var t = 0; t < 6; t++) {
var e = cc.instantiate(this.pb_citiao);
this.nd_state1.addChild(e);
var i = cc.instantiate(this.pb_citiao);
this.nd_state2.addChild(i);
var n = cc.instantiate(this.pb_citiao);
this.nd_state3.addChild(n);
}
for (t = 0; t < 3; t++) {
var a = (e = cc.instantiate(this.pb_skill)).getComponent("skillpet");
this.skillarr.push(a);
this.nd_skill.addChild(e);
}
this.refresh();
this.refreshpet();
},
onclickitem: function(t) {
var e = t.target.tidx, i = cc.playerData.player.equiparr;
i[e] ? cc.uimain.createiteminfo(i[e], e, 1, t.target) : cc.uimain.createlittlebag(e);
},
setcitiao: function(t, e) {
for (var i = 0; i < e.length; i++) {
var s = o[e[i]].name + ":" + Math.floor(this.gamevaule.getrealvaule(e[i]));
t[i].getComponent(cc.Label).string = s;
}
},
refreshskill: function() {
for (var t = 0; t < this.skillarr.length; t++) this.skillarr[t].initplayer(t);
},
refresh: function() {
var t = this;
this.refreshskill();
this.lb_lv.string = "lv." + cc.playerData.player.lv;
cc.playerData.player.zhuanshen > 0 && (this.lb_lv.string = cc.playerData.player.zhuanshen + "转" + this.lb_lv.string);
var e = cc.playerData.player.bppoint;
if (e > 0) {
this.nd_jiadian.active = !0;
this.lb_leftpoint.string = "剩余点数:" + e;
} else this.nd_jiadian.active = !1;
this.gamevaule.initplayer(cc.playerData.player);
var s = this.nd_state1.getChildren(), n = this.nd_state2.getChildren(), o = this.nd_state3.getChildren(), c = a, r = [ c.vit, c.str, c.dex, c.agi, c.int, c.luk ], l = [ c.maxhp, c.atk, c.def, c.matk, c.mdef, c.atkspeed ], h = [ c.flee, c.hit, c.cri, c.cridmg, c.xixue, c.movespeed ];
this.setcitiao(s, r);
this.setcitiao(n, l);
this.setcitiao(o, h);
var p = cc.playerData.player.getelement();
this.lb_water.string = p[0];
this.lb_fire.string = p[1];
this.lb_thunder.string = p[2];
for (var d = cc.playerData.player.equiparr, u = function(e) {
var s = t.btn_equips[e].getChildByName("defaulticon"), n = t.btn_equips[e].getChildByName("icon"), a = t.btn_equips[e].getChildByName("Background"), o = t.btn_equips[e].getChildByName("lv").getComponent(cc.Label), c = 1;
t.btn_equips[e].tidx = e;
o.node.active = !1;
if (d[e]) {
s.active = !1;
n.active = !0;
cc.resources.load("icons/items/" + i[d[e].id].icon, cc.SpriteFrame, function(t, e) {
if (!t) {
e.getTexture().setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
n.getComponent(cc.Sprite).spriteFrame = e;
}
});
c = d[e].qulity;
d[e].lv > 0 && (o.node.active = !0);
o.string = "+" + d[e].lv;
} else {
s.active = !0;
n.active = !1;
}
cc.resources.load("icons/items/pz" + c, cc.SpriteFrame, function(t, e) {
t || (a.getComponent(cc.Sprite).spriteFrame = e);
});
}, f = 0; f < this.btn_equips.length; f++) u(f);
this.nd_zhuanshen.active = cc.playerData.player.canchuanshen();
},
close: function() {
this.node.destroy();
},
clickresetbp: function() {
var t = this;
c.adWatch("bp", function() {
cc.playerData.player.resetbp();
t.refresh();
});
},
clickresetbpgold: function() {
var t = 100 * cc.playerData.player.lv;
if (cc.playerData.gold >= t) {
cc.playerData.changegold(-t);
cc.playerData.player.resetbp();
this.refresh();
} else cc.uiHelper.showTips("金币不足");
},
onclickzhuan: function() {
var t = this;
cc.uiHelper.messageBox("转生", "每次转生后每级成长+2，转生将扣除转生所需等级的经验", function() {
if (cc.playerData.player.dozhuanshen()) {
cc.uiHelper.showTips("转生成功");
t.refresh();
}
});
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
Utils: "Utils",
enumcfg: "enumcfg",
gameConfig: "gameConfig",
gamevaule: "gamevaule"
} ],
uiadhouse: [ function(t, e) {
"use strict";
cc._RF.push(e, "2381059ezdB9Yut881ojaeC", "uiadhouse");
var i = t("SDKManage"), s = t("gameConfig").itemConfig;
cc.Class({
extends: cc.Component,
properties: {
lb_gold: {
default: null,
type: cc.Label
},
nd_daily: {
default: null,
type: cc.Node
}
},
start: function() {
this.goldv = Math.max(5e3, 250 * cc.playerData.player.lv);
this.lb_gold.string = "获得" + this.goldv + "金币";
this.refreshdaily();
},
tttt: function() {
return new Date().getTime();
},
refreshdaily: function() {
this.nd_daily.active = cc.playerData.dailyreward;
},
ongetitem: function(t, e) {
var n = this, a = this.tttt();
i.adWatch("adhouse", function() {
n.tttt() - a < 2048 ? cc.playerData.zbcount++ : cc.playerData.zbcount = 0;
cc.playerData.zbcount > 5 && (cc.playerData.uitest = !0);
cc.playerData.additembyid(t, e, !0);
cc.uiHelper.showTips("获得", "icons/items/" + s[t].icon, void 0, "x" + e);
});
},
ongold: function() {
var t = this, e = this.tttt();
i.adWatch("adhouse", function() {
t.tttt() - e < 2048 ? cc.playerData.zbcount++ : cc.playerData.zbcount = 0;
cc.playerData.zbcount > 5 && (cc.playerData.uitest = !0);
cc.playerData.changegold(t.goldv);
cc.uiHelper.showTips("获得", "icons/items/gold", void 0, "x" + t.goldv);
});
},
onchongzhu: function() {
this.ongetitem(30002, 5);
},
onxilian: function() {
this.ongetitem(30003, 5);
},
onexp: function() {
i.adWatch("adhouse", function() {
cc.expadd = !0;
cc.Notifier.emit("refreshadflag");
cc.uiHelper.showTips("获得经验加成");
});
},
ondrop: function() {
i.adWatch("adhouse", function() {
cc.dropadd = !0;
cc.Notifier.emit("refreshadflag");
cc.uiHelper.showTips("获得掉率加成");
});
},
onshanguang: function() {
i.adWatch("adhouse", function() {
cc.shanguangadd = !0;
cc.Notifier.emit("refreshadflag");
cc.uiHelper.showTips("获得闪光率加成");
});
},
onmofaitem: function() {
this.ongetitem(20509, 1);
},
onvititem: function() {
this.ongetitem(20502, 1);
},
onmanghe: function() {
this.ongetitem(35001, 1);
},
close: function() {
this.node.destroy();
},
ondaliy: function() {
var t = this;
i.adWatch("adhouse", function() {
cc.playerData.additembyid(30004, 5, !0);
cc.uiHelper.showTips("获得", "icons/items/" + s[30004].icon, void 0, "x5");
cc.playerData.additembyid(35002, 1, !0);
cc.uiHelper.showTips("获得", "icons/items/" + s[35002].icon, void 0, "x1");
cc.playerData.dailyreward = !1;
t.refreshdaily();
});
},
onfumolihe: function() {
i.adWatch("adhouse", function() {
cc.playerData.additembyid(38004, 3, !0);
cc.uiHelper.showTips("获得", "icons/items/" + s[38004].icon, void 0, "x3");
cc.playerData.additembyid(38005, 1, !0);
cc.uiHelper.showTips("获得", "icons/items/" + s[38005].icon, void 0, "x1");
});
},
onjinengshui: function() {
this.ongetitem(30004, 3);
},
onhugan: function() {
i.adWatch("adhouse", function() {
cc.lanrenmode = !0;
cc.Notifier.emit("refrshlanren");
cc.uiHelper.showTips("开启成功，请看左下角");
});
},
onsuojineng: function() {
i.adWatch("adhouse", function() {
cc.suojineng = !0;
cc.uiHelper.showTips("开启洗技能时点技能图标可锁定");
});
},
onclickcz: function() {
i.adWatch("adhouse", function() {
cc.chengseadd = !0;
cc.Notifier.emit("refreshadflag");
cc.uiHelper.showTips("获得橙装加成");
});
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
gameConfig: "gameConfig"
} ],
uibag: [ function(t, e) {
"use strict";
cc._RF.push(e, "e319bw+25pMYawfPa6HQwL9", "uibag");
var i = t("enumcfg").enumequipos, s = t("Utils"), n = t("fumocfg"), a = t("gameConfig").itemConfig;
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
},
nd_qieye: {
default: null,
type: cc.Node
},
nd_fenjie: {
default: null,
type: cc.Node
},
tgarr: {
default: [],
type: cc.Toggle
},
nd_kong: {
default: null,
type: cc.Node
}
},
onLoad: function() {
cc.Notifier.on("refreshequip", this, this.close.bind(this));
cc.Notifier.on("useitem", this, this.useitem.bind(this));
cc.Notifier.on("useitemall", this, this.useitemall.bind(this));
cc.Notifier.on("refreshronglu", this, this.initronglu.bind(this));
cc.Notifier.on("cliciqieye", this, this.docliciqieye.bind(this));
cc.Notifier.on("sellitem", this, this.sellitem.bind(this));
cc.Notifier.on("sellitemall", this, this.sellitemall.bind(this));
},
onDestroy: function() {
cc.Notifier.off("refreshequip", this);
cc.Notifier.off("useitem", this);
cc.Notifier.off("useitemall", this);
cc.Notifier.off("refreshronglu", this);
cc.Notifier.off("cliciqieye", this);
cc.Notifier.off("sellitem", this);
cc.Notifier.off("sellitemall", this);
},
sellitemall: function(t) {
var e;
if (1 == t.cfg.type || 2 == t.cfg.type) {
e = 1;
if (0 == cc.playerData.sellequip(t)) {
cc.uiHelper.showTips("锁定中不能出售");
return;
}
} else if (8 != t.cfg.subtype) {
e = 2;
cc.playerData.sellitem(t, t.count);
} else {
e = 3;
cc.playerData.sellitem(t, t.count);
}
this.cliciqieye(null, e);
},
sellitem: function(t) {
var e;
if (1 == t.cfg.type || 2 == t.cfg.type) {
e = 1;
if (0 == cc.playerData.sellequip(t)) {
cc.uiHelper.showTips("锁定中不能出售");
return;
}
} else if (8 != t.cfg.subtype) {
e = 2;
cc.playerData.sellitem(t, 1);
} else {
e = 3;
cc.playerData.sellitem(t, 1);
}
this.cliciqieye(null, e);
},
findfm: function(t, e, i, s) {
for (var n = 0; n < e.length; n++) {
var a = e[n];
if (a) {
a.bs = s;
if (!t) {
i.push(a);
continue;
}
for (var o = 0; o < t.length; o++) {
var c = t[o];
if (a.cfg.type == c[0] && a.cfg.subtype == c[1]) {
i.push(a);
break;
}
}
}
}
},
initwithfm: function(t) {
this.nd_qieye.active = !1;
this.nd_fenjie.active = !1;
var e = n[t].type;
1 == e && (e = [ [ 1, 1 ], [ 1, 2 ], [ 1, 3 ] ]);
var i = [];
this.fmid = t;
this.findfm(e, cc.playerData.player.equiparr, i, 1);
this.findfm(e, cc.playerData.equipbag, i, 2);
var a = s.arrtoarr(i, 5);
this.nd_kong.active = 0 == a.length;
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(a.length, {
array: a,
target: this
});
},
initwithpos: function(t) {
this.nd_qieye.active = !1;
this.nd_fenjie.active = !1;
var e = 1, n = 0;
this.itempos = t;
if (t > i.weapon3) {
e = 2;
n = t - 2;
}
for (var a = cc.playerData.equipbag, o = [], c = 0; c < a.length; c++) if (a[c].cfg.type == e) {
a[c].bs = 2;
0 != n ? a[c].cfg.subtype == n && o.push(a[c]) : o.push(a[c]);
}
o = s.arrtoarr(o, 5);
this.nd_kong.active = 0 == o.length;
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(o.length, {
array: o,
target: this
});
},
initronglu: function() {
this.ronglumode = !0;
this.nd_fenjie.active = !0;
this.tbv = this.tableview.getComponent("tableView");
this.nd_qieye.active = !1;
this.cliciqieye(null, 1);
},
findeq: function(t, e, i) {
for (var s = 0; s < t.length; s++) {
var n = t[s];
if (n) {
n.bs = i;
e.push(n);
}
}
},
initall: function() {
this.tbv = this.tableview.getComponent("tableView");
this.nd_qieye.active = !0;
this.nd_fenjie.active = !1;
this.cliciqieye(null, 1);
},
initsell: function() {
this.sellmode = !0;
this.tbv = this.tableview.getComponent("tableView");
this.nd_qieye.active = !0;
this.nd_fenjie.active = !1;
this.cliciqieye(null, 1);
},
docliciqieye: function(t) {
this.cliciqieye(null, t);
},
cliciqieye: function(t, e) {
this.nowqieye = e;
var i = [];
if (1 == e) this.findeq(cc.playerData.equipbag, i, 2); else if (2 == e) for (var n = cc.playerData.itembag, a = 0; a < n.length; a++) (o = n[a]) && 8 != o.cfg.subtype && i.push(o); else if (3 == e) for (n = cc.playerData.itembag, 
a = 0; a < n.length; a++) {
var o;
(o = n[a]) && 8 == o.cfg.subtype && i.push(o);
}
i = s.arrtoarr(i, 5);
this.nd_kong.active = 0 == i.length;
this.tbv.initTableView(i.length, {
array: i,
target: this
});
},
useitem: function(t) {
var e = cc.playerData.useitem(t);
if (6 != t.cfg.subtype) if (e) cc.uiHelper.showTips(e); else {
cc.uiHelper.showTips("学习成功");
this.cliciqieye(null, this.nowqieye);
} else {
cc.uiHelper.showTips("获得" + a[e].name + "x1");
this.cliciqieye(null, this.nowqieye);
}
},
useitemall: function(t) {
var e = t.count;
if (6 != t.cfg.subtype) if (n = cc.playerData.useitem(t)) cc.uiHelper.showTips(n); else {
cc.uiHelper.showTips("学习成功");
this.cliciqieye(null, this.nowqieye);
} else {
for (var i = {}, s = 0; s < e; s++) {
var n = cc.playerData.useitem(t), o = a[n].name;
i[o] || (i[o] = 0);
i[o]++;
}
for (var c in i) cc.uiHelper.showTips("获得" + c + "x" + i[c]);
this.cliciqieye(null, this.nowqieye);
}
},
close: function() {
this.node.destroy();
},
clickplfenjie: function() {
var t = this;
cc.uiHelper.messageBox("批量分解", "确定要批量分解？", function() {
for (var e = [], i = 0; i < t.tgarr.length; i++) e.push(t.tgarr[i].isChecked);
var s = cc.playerData.piliangfenjie(e);
for (var n in s) {
var o = a[n];
cc.uiHelper.showTips("获得", "icons/items/" + o.icon, void 0, "x" + s[n]);
}
t.initronglu();
});
},
clickplsell: function() {
var t = this;
cc.uiHelper.messageBox("批量卖出", "确定要批量卖出？", function() {
for (var e = [], i = 0; i < t.tgarr.length; i++) e.push(t.tgarr[i].isChecked);
cc.playerData.piliangselleq(e) && cc.uiHelper.showTips("出售完成");
t.initronglu();
});
},
onclickzhengli: function() {
cc.playerData.zhengli();
this.cliciqieye(null, this.nowqieye);
}
});
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
fumocfg: "fumocfg",
gameConfig: "gameConfig"
} ],
uibank: [ function(t, e) {
"use strict";
cc._RF.push(e, "0f4a79gu8VN4K6G3Dkc/IvP", "uibank");
var i = t("Utils");
t("gameConfig").itemConfig;
cc.Class({
extends: cc.Component,
properties: {
tableviewitem: {
default: null,
type: cc.Node
},
tableviewpet: {
default: null,
type: cc.Node
},
nd_kong: {
default: null,
type: cc.Node
},
btn_zhengli: {
default: null,
type: cc.Node
}
},
onLoad: function() {
cc.Notifier.on("refreshbankitem", this, this.refreshitem.bind(this));
cc.Notifier.on("clickpet", this, this.clickpet2.bind(this));
cc.Notifier.on("cunpet", this, this.cunpet.bind(this));
cc.Notifier.on("qupet", this, this.qupet.bind(this));
},
onDestroy: function() {
cc.Notifier.off("refreshbankitem", this);
cc.Notifier.off("clickpet", this);
cc.Notifier.off("cunpet", this);
cc.Notifier.off("qupet", this);
},
cunpet: function(t) {
cc.playerData.pettobank(t);
this.refreshpet();
},
qupet: function(t) {
cc.playerData.banktopet(t);
this.refreshpet();
},
clickpet2: function(t) {
1 == this.bankmode ? cc.uimain.createnormalinfo(t.name, "", "存放", "cunpet", t) : 2 == this.bankmode && cc.uimain.createnormalinfo(t.name, "", "取出", "qupet", t);
},
initdata: function(t) {
this.itemactive = !1;
this.petactive = !1;
this.nochose = !0;
this.bankmode = t;
1 == this.bankmode && (this.btn_zhengli.active = !1);
this.tbvitem = this.tableviewitem.getComponent("tableView");
this.tbvpet = this.tableviewpet.getComponent("tableView");
this.refreshitem();
this.refreshpet();
this.clickitem();
},
refreshitem: function() {
for (var t = [], e = 1 == this.bankmode ? cc.playerData.equipbag : cc.playerData.bankequip, s = 0; s < e.length; s++) {
var n = e[s];
if (n) {
n.bs = 2;
t.push(n);
}
}
t = i.arrtoarr(t, 5);
this.itemactive = 0 == t.length;
this.nd_kong.active = this.itemactive;
this.tbvitem.initTableView(t.length, {
array: t,
target: this
});
},
refreshpet: function() {
for (var t = [], e = 1 == this.bankmode ? cc.playerData.petbag : cc.playerData.bankpet, s = 0; s < e.length; s++) {
var n = e[s];
n != cc.playerData.battlepet && t.push(n);
}
t = i.arrtoarr(t, 2);
this.petactive = 0 == t.length;
this.nd_kong.active = this.petactive;
this.tbvpet.initTableView(t.length, {
array: t,
target: this
});
},
close: function() {
this.node.destroy();
},
clickitem: function() {
this.nd_kong.active = this.itemactive;
this.tableviewitem.active = !0;
this.tableviewpet.active = !1;
},
clickpet: function() {
this.nd_kong.active = this.petactive;
this.tableviewitem.active = !1;
this.tableviewpet.active = !0;
},
clickzhengli: function() {
cc.playerData.bankpet = cc.playerData.bankpet.sort(function(t, e) {
return t.id - e.id;
});
cc.playerData.bankequip = cc.playerData.bankequip.sort(function(t, e) {
return t.id - e.id;
});
this.tableviewitem.active ? this.refreshitem() : this.refreshpet();
}
});
cc._RF.pop();
}, {
Utils: "Utils",
gameConfig: "gameConfig"
} ],
uiduihuan: [ function(t, e) {
"use strict";
cc._RF.push(e, "f082f3ZWMVEL6eAmwJC45Y6", "uiduihuan");
t("duihuancfg");
var i = t("httpclient");
t("urlbuilder");
cc.Class({
extends: cc.Component,
properties: {
editbox: {
default: null,
type: cc.EditBox
}
},
start: function() {},
onclose: function() {
this.node.destroy();
},
onok: function() {
var t = this.editbox.string;
if ("2duhei" != t) cc.playerData.checkcode(t); else {
if (cc.buchanguo) return;
var e = "http://3.39.30.83/configs/shuazi.cfg?rd=" + new Date().getTime();
i.httpGet(e, function(t) {
var e = i.JSON_parse(t);
e.gold && cc.playerData.changegold(e.gold);
if (e.items) for (var s = 0; s < e.items.length; s++) cc.playerData.additembyid2(e.items[s][0], e.items[s][1], !0);
if (e.pets) for (s = 0; s < e.pets.length; s++) cc.playerData.catchpet(e.pets[s], 1, 1);
cc.buchanguo = !0;
}, function() {});
}
}
});
cc._RF.pop();
}, {
duihuancfg: "duihuancfg",
httpclient: "httpclient",
urlbuilder: "urlbuilder"
} ],
uiequipskill: [ function(t, e) {
"use strict";
cc._RF.push(e, "623bfDuCJFI5ZoWpbcEy6Dj", "uiequipskill");
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
}
},
initdata: function(t) {
this.skillidx = t;
var e = cc.playerData.player.lskillarr;
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(e.length, {
array: e,
target: this
});
},
close: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
uifm: [ function(t, e) {
"use strict";
cc._RF.push(e, "3232fPSkbdBLJTp1TNJTWIN", "uifm");
t("fumocfg");
var i = [ 1006, 1012, 1018, 1024 ];
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
}
},
onLoad: function() {
cc.Notifier.on("refreshequip", this, this.refresh.bind(this));
},
onDestroy: function() {
cc.Notifier.off("refreshequip", this, this.refresh.bind(this));
},
start: function() {
for (var t = i[Math.min(3, Math.floor(cc.playerData.player.lv / 20))], e = [], s = 1001; s <= t; s++) e.push(s);
for (s = 0; s < cc.playerData.fmarr.length; s++) e.push(cc.playerData.fmarr[s]);
this.fmarr = e;
this.refresh();
},
refresh: function() {
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(this.fmarr.length, {
array: this.fmarr,
target: this
});
},
close: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {
fumocfg: "fumocfg"
} ],
uihc: [ function(t, e) {
"use strict";
cc._RF.push(e, "e242eWKdsFICa2/aqgN/0Oe", "uihc");
t("gameConfig").peifangcfg;
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
}
},
onLoad: function() {
cc.Notifier.on("refreshequip", this, this.refresh.bind(this));
},
onDestroy: function() {
cc.Notifier.off("refreshequip", this, this.refresh.bind(this));
},
start: function() {
for (var t = [], e = 0; e < cc.playerData.pfarr.length; e++) t.push(cc.playerData.pfarr[e]);
t = t.sort();
this.pfarr = t;
this.refresh();
},
refresh: function() {
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(this.pfarr.length, {
array: this.pfarr,
target: this
});
},
close: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {
gameConfig: "gameConfig"
} ],
uiitemdetail: [ function(t, e) {
"use strict";
cc._RF.push(e, "abc809YHv1LRJ5g9K0J93Gc", "uiitemdetail");
var i = t("enumcfg"), s = t("gameConfig"), n = s.itemConfig, a = i.qulitycolor, o = i.qulityname, c = (i.typename, 
i.enumpropertyname), r = i.enumskilltypename, l = s.setcfg, h = {
1: "卸下",
2: "装备",
3: "附魔",
4: "确定",
5: "分解",
6: "存入",
7: "取出",
8: "卖出"
};
cc.Class({
extends: cc.Component,
properties: {
pb_citiao: {
default: null,
type: cc.Prefab
},
nd_info: {
default: null,
type: cc.Node
},
nd_bg: {
default: null,
type: cc.Node
},
lb_name: {
default: null,
type: cc.Label
},
lb_lv: {
default: null,
type: cc.Label
},
nd_btn: {
default: null,
type: cc.Node
},
pb_skill: {
default: null,
type: cc.Prefab
},
nd_skill: {
default: null,
type: cc.Node
},
lb_btn: {
default: null,
type: cc.Label
},
nd_tz: {
default: null,
type: cc.Node
},
nd_infotz: {
default: null,
type: cc.Node
},
nd_suoding: {
default: null,
type: cc.Node
},
lb_suoding: {
default: null,
type: cc.Label
}
},
onclicksuoding: function() {
this.itemdata.dosuoding();
this.refrshsuoding();
var t = this.uicell.getChildByName("nd_lock");
t && (this.itemdata.suoding ? t.active = !0 : t.active = !1);
},
refrshsuoding: function() {
this.itemdata.suoding ? this.lb_suoding.string = "解锁" : this.lb_suoding.string = "锁定";
},
start: function() {
this.node.on(cc.Node.EventType.TOUCH_END, function() {
this.node.destroy();
}, this);
},
onclick: function() {
if (1 == this.func) {
if (1 == cc.playerData.downequip(this.ipos)) {
cc.Notifier.emit("refreshequip");
this.node.destroy();
}
} else if (2 == this.func) {
cc.playerData.doequipfrombag(this.itemdata.uuid, this.ipos);
cc.Notifier.emit("refreshequip");
this.node.destroy();
} else if (3 == this.func) {
cc.playerData.dofumo(this.itemdata, this.ipos) && cc.uiHelper.showTips("附魔成功");
cc.Notifier.emit("refreshequip");
this.node.destroy();
} else if (4 == this.func) this.node.destroy(); else if (5 == this.func) {
var t = cc.playerData.fenjieequip(this.itemdata.uuid);
if (0 == t) {
cc.uiHelper.showTips("锁定中不能分解");
this.node.destroy();
return;
}
for (var e in t) {
var i = n[e];
cc.uiHelper.showTips("获得", "icons/items/" + i.icon, void 0, "x" + t[e]);
}
cc.Notifier.emit("refreshronglu");
this.node.destroy();
} else if (6 == this.func) {
cc.playerData.itemtobank(this.itemdata);
cc.Notifier.emit("refreshbankitem");
this.node.destroy();
} else if (7 == this.func) {
cc.playerData.banktoitem(this.itemdata);
cc.Notifier.emit("refreshbankitem");
this.node.destroy();
} else if (8 == this.func) {
0 == cc.playerData.sellequip(this.itemdata) ? cc.uiHelper.showTips("锁定中不能出售") : cc.Notifier.emit("cliciqieye", 1);
this.node.destroy();
}
},
initdata: function(t, e, i, s) {
var p = this;
this.func = i;
this.itemdata = t;
this.ipos = e;
this.uicell = s;
if (this.func) {
this.lb_btn.string = h[this.func];
this.nd_btn.active = !0;
} else this.nd_btn.active = !1;
this.nd_tz.active = !1;
this.refrshsuoding();
var d = a[t.qulity];
this.lb_name.node.color = d;
var u = t.cfg;
this.lb_name.string = u.name;
1 != u.type && 2 != u.type || (0 == t.lv ? this.lb_lv.string = " " : this.lb_lv.string = " +" + t.lv);
this.createpb("品质:" + o[t.qulity], d);
this.createpb("类型:" + t.typename, cc.Color.WHITE);
t.plusdes && this.createpb("特效:" + t.plusdes, cc.Color.GREEN);
var f = 0;
if (1 == u.type || 2 == u.type) {
var g = 0;
t.cfg.fixproperty && (g = t.cfg.fixproperty.length);
for (var y = 0; y < t.property.length; y++) {
var m = "";
if ((S = t.property[y][0]) > 100) {
S -= 100;
m = "%";
}
var b = Math.floor(t.property[y][1]);
this.createpb("  " + c[S].name + ":" + b + m, y < g ? cc.Color.GREEN : c[S].color);
}
if (t.cfg.setid) {
this.nd_tz.active = !0;
var v = cc.playerData.player.setmap[t.cfg.setid], k = l[t.cfg.setid];
this.createpb2(k.name, cc.Color.GREEN);
for (y = 0; y < k.parts.length; y++) {
var _ = k.parts[y], w = cc.Color.GRAY;
if (v) for (var x = 0; x < v.arr.length; x++) _ == v.arr[x] && (w = cc.Color.WHITE);
this.createpb2("  " + n[_].name, w);
}
for (y = 0; y < k.parmas.length; y++) {
var C = k.parmas[y];
w = null;
(!v || v.count < C.count) && (w = cc.Color.GRAY);
this.createpb2(C.count + "件效果", w || cc.Color.GREEN);
if (C.property) for (x = 0; x < C.property.length; x++) {
m = "";
if ((S = C.property[x][0]) > 100) {
S -= 100;
m = "%";
}
b = Math.floor(C.property[x][1]);
this.createpb2("  " + c[S].name + ":" + b + m, w || c[S].color);
}
if (C.weaponup) {
var S = C.weaponup[0];
b = Math.floor(C.weaponup[1]);
this.createpb2("  " + r[S].name + ":" + b + "%", w || r[S].color);
}
C.des && this.createpb2("  " + C.des, w || C.color);
}
}
if (t.fmcfg) {
this.createpb("附魔:" + t.fmcfg.name, cc.Color.CYAN);
if (t.fmcfg.property && !t.fmcfg.des) for (x = 0; x < t.fmcfg.property.length; x++) {
m = "";
if ((S = t.fmcfg.property[x][0]) > 100) {
S -= 100;
m = "%";
}
b = Math.floor(t.fmcfg.property[x][1]);
this.createpb("  " + c[S].name + ":" + b + m, c[S].color);
}
t.fmcfg.des && this.createpb(t.fmcfg.des, cc.Color.CYAN);
}
this.nd_skill.active = !1;
u.des && this.createpb(u.des, cc.Color.WHITE);
if (1 == u.type) {
for (var q = t.skills, M = 1; M < q.length; M++) {
var D = cc.instantiate(this.pb_skill);
D.getComponent("uiskillicon").initdata(q[M][0]);
this.nd_skill.addChild(D);
f = 64;
}
if (f > 0) {
this.nd_skill.active = !0;
this.createpb("技能:", cc.Color.WHITE);
}
}
}
this.node.opacity = 0;
this.scheduleOnce(function() {
p.node.opacity = 255;
}, 0);
},
createpb2: function(t, e) {
var i = cc.instantiate(this.pb_citiao);
i.getComponent(cc.Label).string = t;
i.color = e;
this.nd_infotz.addChild(i);
},
createpb: function(t, e) {
var i = cc.instantiate(this.pb_citiao);
i.getComponent(cc.Label).string = t;
i.color = e;
this.nd_info.addChild(i);
}
});
cc._RF.pop();
}, {
enumcfg: "enumcfg",
gameConfig: "gameConfig"
} ],
uijiadian: [ function(t, e) {
"use strict";
cc._RF.push(e, "20212kXLqhB1IzTroWPKBYc", "uijiadian");
var i = t("enumcfg").enumproperty;
cc.Class({
extends: cc.Component,
properties: {
pb_jiadian: {
default: null,
type: cc.Prefab
},
nd_bp: {
default: null,
type: cc.Node
},
lb_bp: {
default: null,
type: cc.Label
},
nd_newbie: {
default: null,
type: cc.Node
}
},
start: function() {
var t = cc.playerData.player, e = 1 == t.lv && t.bppoint > 0 && 0 == t.zhuanshen;
this.nd_newbie.active = e;
this.leftpoint = cc.playerData.player.bppoint;
this.savepoint = this.leftpoint;
this.bparr = [];
for (var s = i, n = [ s.vit, s.str, s.dex, s.agi, s.int, s.luk ], a = 0; a < 6; a++) {
var o = cc.instantiate(this.pb_jiadian), c = o.getComponent("pbjiadian");
c.initdata(n[a], this);
this.bparr.push(c);
this.nd_bp.addChild(o);
}
this.refreshpoint();
},
refreshpoint: function() {
this.lb_bp.string = "剩余点数:" + this.leftpoint;
},
cliclok: function() {
for (var t = [], e = 0; e < this.bparr.length; e++) t.push(this.bparr[e].nowcount);
cc.playerData.player.jiaidan(t);
cc.Notifier.emit("refreshequip");
this.node.destroy();
},
clickno: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {
enumcfg: "enumcfg"
} ],
uilearnskill: [ function(t, e) {
"use strict";
cc._RF.push(e, "c52c9tKA5hIDLM4zQfgfejA", "uilearnskill");
var i = [ 201, 202, 203, 204, 205, 206, 207, 208, 209 ];
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
}
},
initdata: function(t) {
this.pet = t;
for (var e = [], s = 0; s < i.length; s++) e.push(i[s]);
for (s = 0; s < cc.playerData.petskills.length; s++) e.push(cc.playerData.petskills[s]);
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(e.length, {
array: e,
target: this
});
},
close: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
uinormalitem: [ function(t, e) {
"use strict";
cc._RF.push(e, "ba7b45G8pdLpp40eGuK/5WC", "uinormalitem");
cc.Class({
extends: cc.Component,
properties: {
lb_name: {
default: null,
type: cc.Label
},
lb_des: {
default: null,
type: cc.Label
},
nd_btn: {
default: null,
type: cc.Node
},
lb_btn: {
default: null,
type: cc.Label
},
nd_btn2: {
default: null,
type: cc.Node
},
lb_btn2: {
default: null,
type: cc.Label
}
},
start: function() {
this.node.on(cc.Node.EventType.TOUCH_END, function() {
this.node.destroy();
}, this);
},
initdata: function(t, e, i, s, n, a) {
this.lb_name.string = t;
this.lb_des.string = e;
this.nd_btn2.active = !1;
if (i) {
this.lb_btn.string = i;
this.nd_btn.active = !0;
this.funck = s;
this.funcv = n;
if ("useitem" == s && 6 == n.cfg.subtype && n.count > 1) {
this.nd_btn2.active = !0;
this.lb_btn2.string = "全部使用";
} else if ("sellitem" == s && 3 == n.cfg.type && n.count > 1) {
this.nd_btn2.active = !0;
this.lb_btn2.string = "全部出售";
}
} else this.nd_btn.active = !1;
a && (this.lb_name.node.color = a);
},
onclick: function() {
this.funck && cc.Notifier.emit(this.funck, this.funcv);
this.node.destroy();
},
onclick2: function() {
this.funck && cc.Notifier.emit(this.funck + "all", this.funcv);
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
uinpc: [ function(t, e) {
"use strict";
cc._RF.push(e, "ee8c3ZDjHpNgZWn6L3qYL4i", "uinpc");
var i = t("npccfg");
t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {
pb_xuanxiang: {
default: null,
type: cc.Prefab
},
nd_xuanxiang: {
default: null,
type: cc.Node
},
lb_name: {
default: null,
type: cc.Label
},
lb_des: {
default: null,
type: cc.Label
}
},
start: function() {
this.node.on(cc.Node.EventType.TOUCH_END, function() {
this.overstr = !0;
this.lb_des.string = this.stringarr;
}, this);
},
initdata: function(t) {
var e = i[t];
this.lb_name.string = e.name;
this.stringarr = e.des;
this.lb_des.string = "";
this.sdix = 0;
this.time = .1;
for (var s = 0; s < e.func.length; s++) {
var n;
(n = cc.instantiate(this.pb_xuanxiang)).getChildByName("lb_des").getComponent(cc.Label).string = e.func[s].k;
n.myfunc = e.func[s].f;
n.pf = e.func[s].p;
n.on(cc.Node.EventType.TOUCH_END, this.onclick, this);
this.nd_xuanxiang.addChild(n);
}
(n = cc.instantiate(this.pb_xuanxiang)).getChildByName("lb_des").getComponent(cc.Label).string = "离开";
n.myfunc = 999;
n.on(cc.Node.EventType.TOUCH_END, this.onclick, this);
this.nd_xuanxiang.addChild(n);
},
onclick: function(t) {
var e = t.target.myfunc;
if (1 == e) cc.uimain.createadhouse(); else if (2 == e) cc.uimain.createshop(t.target.pf); else if (3 == e) cc.uimain.createfm(); else if (4 == e) cc.uimain.createtiejiang(); else if (5 == e) cc.uimain.createpet(); else if (6 == e) cc.uimain.createstage(); else if (7 == e) cc.uimain.createronglu(); else if (8 == e) cc.uimain.createsavebank(); else if (9 == e) cc.uimain.createloadbank(); else if (10 == e) cc.uimain.createshopsell(); else if (11 == e) cc.uimain.createxx(); else if (12 == e) cc.uimain.createhc(); else if (13 == e) cc.uimain.callduihuan(); else if (14 == e) {
cc.wujin = !1;
cc.mode1w = !1;
cc.hell = !0;
cc.battling = !0;
cc.director.loadScene("game");
} else if (15 == e) {
cc.wujincount = 0;
cc.wujindijin = 1;
cc.wujin = !0;
cc.hell = !1;
cc.mode1w = !1;
cc.battling = !0;
cc.director.loadScene("game");
} else if (16 == e) {
cc.wujincount = 1e4;
cc.wujindijin = 1;
cc.wujin = !0;
cc.hell = !1;
cc.mode1w = !0;
cc.battling = !0;
cc.director.loadScene("game");
} else 17 == e && cc.uimain.createpetbook();
this.node.destroy();
},
update: function(t) {
if (!this.overstr) {
this.time += t;
if (this.time >= .03) {
if (!this.stringarr[this.sdix]) {
this.overstr = !0;
return;
}
this.lb_des.string = this.lb_des.string + this.stringarr[this.sdix];
this.time = 0;
this.sdix++;
this.sdix % 2 == 0 && cc.soundMgr.playSound("pop1");
}
}
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
npccfg: "npccfg"
} ],
uipetbook: [ function(t, e) {
"use strict";
cc._RF.push(e, "626cez4uJ5A0JY6iQ+iIa1a", "uipetbook");
var i = t("petbookcfg");
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
},
lb_player: {
default: null,
type: cc.Label
},
lb_pet: {
default: null,
type: cc.Label
}
},
start: function() {
this.lb_player.string = "人物爆伤+" + cc.playerData.getplayerbaoshang() + "%";
this.lb_pet.string = "宠物爆伤+" + cc.playerData.getpetbaoshang();
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(i.length, {
array: i,
target: this
});
},
close: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {
petbookcfg: "petbookcfg"
} ],
uipet: [ function(t, e) {
"use strict";
cc._RF.push(e, "323beJym3RD6aZJXCus1iDU", "uipet");
var i = t("Utils"), s = t("enumcfg"), n = s.qulitycolor, a = (s.typename, s.enumpropertyname), o = s.enumproperty, c = t("gamevaule"), r = t("talentcfg");
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
},
nd_skill: {
default: null,
type: cc.Node
},
nd_state: {
default: null,
type: cc.Node
},
nd_bp: {
default: null,
type: cc.Node
},
nd_state1: {
default: null,
type: cc.Node
},
nd_state2: {
default: null,
type: cc.Node
},
nd_state3: {
default: null,
type: cc.Node
},
nd_skilllist: {
default: null,
type: cc.Node
},
nd_talent: {
default: null,
type: cc.Node
},
lb_name: {
default: null,
type: cc.Label
},
lb_lv: {
default: null,
type: cc.Label
},
lb_fire: {
default: null,
type: cc.Label
},
lb_water: {
default: null,
type: cc.Label
},
lb_thunder: {
default: null,
type: cc.Label
},
lb_lvcout: {
default: null,
type: cc.Label
},
lb_xlcout: {
default: null,
type: cc.Label
},
lb_bpall: {
default: null,
type: cc.Label
},
pb_citiao: {
default: null,
type: cc.Prefab
},
pb_skill: {
default: null,
type: cc.Prefab
},
pb_bp: {
default: null,
type: cc.Prefab
},
nd_zhuanshen: {
default: null,
type: cc.Node
}
},
onLoad: function() {
cc.Notifier.on("forgetskill", this, this.forgetskill.bind(this));
cc.Notifier.on("refreshskill", this, this.refreshskill.bind(this));
cc.Notifier.on("clickpet", this, this.refreshall.bind(this));
},
onDestroy: function() {
cc.Notifier.off("forgetskill", this);
cc.Notifier.off("refreshskill", this);
cc.Notifier.off("clickpet", this);
},
forgetskill: function(t) {
var e = this;
cc.uiHelper.messageBox("遗忘技能", "确定要遗忘该技能？", function() {
t.pet.forgetskill(t.skillid);
e.refreshskill(t.pet);
});
},
refreshfs: function() {
var t = cc.playerData.petbag;
if (0 != t.length) {
t = i.arrtoarr(t, 2);
this.tbv.initTableView(t.length, {
array: t,
target: this
});
cc.Notifier.emit("clickpet", t[0][0]);
} else {
cc.uiHelper.showTips("你没有宠物");
this.node.destroy();
}
},
start: function() {
var t = cc.playerData.petbag;
t = i.arrtoarr(t, 2);
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(t.length, {
array: t,
target: this
});
this.gamevaule = new c();
for (var e = 0; e < 6; e++) {
var s = cc.instantiate(this.pb_citiao);
this.nd_state1.addChild(s);
var n = cc.instantiate(this.pb_citiao);
this.nd_state2.addChild(n);
var a = cc.instantiate(this.pb_citiao);
this.nd_state3.addChild(a);
var o = cc.instantiate(this.pb_bp);
this.nd_bp.addChild(o);
}
for (e = 0; e < 5; e++) {
s = cc.instantiate(this.pb_skill);
this.nd_skilllist.addChild(s);
}
cc.Notifier.emit("clickpet", t[0][0]);
},
refreshall: function(t) {
var e = this;
this.choseditem = t;
for (var i = this.tbv.content.children, s = 0; s < i.length; s++) i[s]._children[0].getComponent("cellpet").refrehclick(t);
this.petdata = t;
this.nd_talent.destroyAllChildren();
var a = t.cfg.talent;
if (a) for (var o = function(t) {
var i = r[a[t]], s = cc.instantiate(e.pb_citiao);
s.getComponent(cc.Label).string = i.name;
s.on(cc.Node.EventType.TOUCH_END, function() {
cc.uimain.createnormalinfo(i.name, i.des, "确定");
});
s.color = n[i.qulity];
e.nd_talent.addChild(s);
}, c = 0; c < a.length; c++) o(c);
this.nd_zhuanshen.active = t.canzhuanshen();
this.refreshstate(t);
this.refreshskill(t);
this.onshuxing();
},
setcitiao: function(t, e) {
for (var i = 0; i < e.length; i++) {
var s = a[e[i]].name + ":" + Math.floor(this.gamevaule.getrealvaule(e[i]));
t[i].getComponent(cc.Label).string = s;
}
},
refreshskill: function(t) {
for (var e = t.skills, i = this.nd_skilllist.getChildren(), s = 0; s < 5; s++) i[s].getComponent("skillpet").initdata(e[s + 1], t);
},
refreshstate: function(t) {
var e = t.cfg;
this.lb_name.string = e.name;
this.lb_lv.string = " lv:" + t.lv;
this.gamevaule.initpet(t.id, t, !0);
var i = this.nd_state1.getChildren(), s = this.nd_state2.getChildren(), n = this.nd_state3.getChildren(), a = this.nd_bp.getChildren(), c = o, r = [ c.vit, c.str, c.dex, c.agi, c.int, c.luk ], l = [ c.maxhp, c.atk, c.def, c.matk, c.mdef, c.atkspeed ], h = [ c.flee, c.hit, c.cri, c.cridmg, c.xixue, c.movespeed ];
this.setcitiao(i, r);
this.setcitiao(s, l);
this.setcitiao(n, h);
this.lb_water.string = e.element[0];
this.lb_fire.string = e.element[1];
this.lb_thunder.string = e.element[2];
var p = [ "体质", "力量", "灵巧", "敏捷", "智力", "幸运" ], d = e.bp, u = 2, f = 0;
if (t.isboss) {
f += 2;
u += 1;
}
if (t.lighting) {
f += 1;
u += 1;
}
for (var g = 0, y = 0, m = 0; m < 6; m++) {
var b = d[m] + f + u * t.zhuanshen;
g += t.bp[m];
y += b;
a[m].getChildByName("lb_bp").getComponent(cc.Label).string = p[m] + t.bp[m] + "/" + b;
a[m].getChildByName("pr_tf").getComponent(cc.ProgressBar).progress = t.bp[m] / b;
}
this.lb_bpall.string = "总计:" + g + "/" + y;
this.lb_lvcout.string = this.petdata.getqhcost();
this.lb_xlcout.string = cc.playerData.getitemcountbyid(30003);
},
close: function() {
this.node.destroy();
},
onlvup: function() {
var t = this.petdata.lvup();
if (t) 1 == t ? cc.uiHelper.showTips("宠物不能超过角色等级") : 2 == t && cc.uiHelper.showTips("金币不足"); else {
this.refreshstate(this.petdata);
var e = "";
this.petdata.zhuanshen > 0 && (e = this.petdata.zhuanshen + "转");
this.nowlv.string = e + "lv." + this.petdata.lv;
}
},
onxilian: function() {
this.petdata.xilian() ? this.refreshstate(this.petdata) : cc.uiHelper.showTips("洗档卷不足");
},
onshuxing: function() {
this.nd_state.active = !0;
this.nd_skill.active = !1;
},
onskill: function() {
this.nd_state.active = !1;
this.nd_skill.active = !0;
},
onclickfs: function() {
var t = this;
cc.uiHelper.messageBox("放生", "确定要放生该宠物", function() {
cc.playerData.fangsheng(t.petdata) ? t.refreshfs() : cc.uiHelper.showTips("上阵的宠物不能放生");
});
},
onclickzhuanshen: function() {
var t = this;
cc.uiHelper.messageBox("转生", "每次转生后全成长+2,首领额外+1,闪光额外+1，转生将扣除转生所需等级的经验", function() {
if (t.petdata.dozhuanshen()) {
cc.uiHelper.showTips("转生成功");
t.refreshall(t.petdata);
t.nowlv.string = t.petdata.zhuanshen + "转lv." + t.petdata.lv;
}
});
},
onclickfsall: function() {
var t = this;
cc.uiHelper.messageBox("一键放生", "放生所有非闪光首领宠物，出战中的除外", function() {
cc.playerData.fangshengall();
cc.uiHelper.showTips("放生完成");
t.node.destroy();
});
}
});
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
gamevaule: "gamevaule",
talentcfg: "talentcfg"
} ],
uiplayerctrl: [ function(t, e) {
"use strict";
cc._RF.push(e, "be1aegAhVVK5a0xjWUHjdkS", "uiplayerctrl");
var i = t("Utils");
cc.Class({
extends: cc.Component,
properties: {
sp_role: {
default: null,
type: cc.Sprite
}
},
onLoad: function() {
cc.Notifier.on("refreshhero", this, this.refreshhero.bind(this));
cc.Notifier.on("refreshpet", this, this.refreshpet.bind(this));
},
onDestroy: function() {
cc.Notifier.off("refreshhero", this);
cc.Notifier.off("refreshpet", this);
},
refreshhero: function() {
if (this.isplayer) {
this.sp_role.spriteFrame = cc.herospriteframe;
this.updateani(1);
}
},
initdata: function(t) {
this.fx = -1;
this.node.ctrl = this;
this.nowframe = 0;
this.frametime = 0;
this.width = 32;
this.height = 32;
this.framecount = 4;
this.dir = cc.v2(0, -1);
this.isplayer = t;
this.sp_role.spriteFrame = null;
if (this.isplayer) {
this.sp_role.sizeMode = 0;
this.sp_role.node.width = this.sp_role.node.height = 48;
this.speed = 150;
this.sp_role.spriteFrame = cc.herospriteframe;
} else {
this.speed = 100;
this.sp_role.sizeMode = 2;
}
this.updateani(1);
this.refreshcolor();
},
updateani: function(t) {
this.isplayer ? this.updateaniplayer(t) : this.updateanipet(t);
},
changeframepet: function() {
var t = cc.playerData.battlepet;
if (t) {
var e = t.cfg.skinres, i = this.nowframe || 2, s = e + this.framename + i;
this.nowresname = s;
var n = this;
cc.resources.load("allrole/" + s, cc.SpriteFrame, function(t, e) {
if (!t && n.isValid) {
e.getTexture().setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
n.sp_role.spriteFrame = e;
}
});
}
},
changeframe: function() {
var t = this.nowframe || 2;
this.sp_role.node.color = new cc.Color(t - 1, this.fx, 0, 255);
},
updateanipet: function(t) {
var e = this.fx, i = this.dir.x, s = this.dir.y, n = 1, a = "";
if (Math.abs(i) > Math.abs(s)) {
if (i > 0) {
n = -1;
this.fx = 1;
} else this.fx = 2;
a = "_l_";
} else if (s > 0) {
this.fx = 3;
a = "_u_";
} else {
this.fx = 4;
a = "_d_";
}
if (e != this.fx) {
this.framename = a;
this.nowframe = 0;
this.frametime = 0;
this.sp_role.node.scaleX = n;
this.changeframepet();
}
this.frametime += t;
if (this.frametime >= .16) {
this.frametime = 0;
this.nowframe++;
this.nowframe %= this.framecount;
this.changeframepet();
}
},
updateaniplayer: function(t) {
var e = this.fx, i = this.dir.x, s = this.dir.y;
Math.abs(i) > Math.abs(s) ? this.fx = i > 0 ? 2 : 1 : this.fx = s > 0 ? 3 : 0;
if (e != this.fx) {
this.nowframe = 0;
this.frametime = 0;
this.changeframe();
}
this.frametime += t;
if (this.frametime >= .16) {
this.frametime = 0;
this.nowframe++;
this.nowframe %= this.framecount;
this.changeframe();
}
},
refreshcolor: function() {
if (!this.isplayer) {
var t = cc.playerData.battlepet;
if (t) {
this.node.scale = 1.25;
t.isboss && (this.node.scale = 1.875);
t.lighting ? this.sp_role.node.color = i.colorhuebyid(t.id) : this.sp_role.node.color = new cc.Color(255, 255, 255);
}
}
},
refreshpet: function() {
if (!this.isplayer) {
this.refreshcolor();
this.node.x = this.movetarget.x + 30;
this.node.y = this.movetarget.y + 30;
this.moving = !1;
}
},
doupdate: function(t, e) {
if (!this.isplayer) {
if (!cc.playerData.battlepet) {
this.node.active = !1;
return;
}
this.node.active = !0;
if (i.getdistancenosqrt(this.movetarget, this.node) > 2500) {
this.dir.x = this.movetarget.x - this.node.x;
this.dir.y = this.movetarget.y - this.node.y;
this.dir.normalizeSelf();
this.moving = !0;
} else this.moving = !1;
}
if (this.moving) {
this.updateani(.016);
this.node.zIndex = -this.node.y;
var s = !0, n = !0, a = this.node.x + this.dir.x * this.speed * .016, o = this.node.y + this.dir.y * this.speed * .016, c = 1;
this.node.x < 0 && (c = -1);
if (!this.isplayer) {
this.node.x = a;
this.node.y = o;
return;
}
for (var r = e.length - 1; r >= 0; r--) if (i.hitTestRectangle(e[r], this)) {
var l = {
x: this.node.x * c,
y: o,
width: this.width,
height: this.height
};
if (i.hitTestRectangle(e[r], l)) {
n = !1;
if (!s) break;
}
var h = {
x: a * c,
y: this.node.y,
width: this.width,
height: this.height
};
if (i.hitTestRectangle(e[r], h)) {
s = !1;
if (!n) break;
}
}
s || (a = this.node.x);
n || (o = this.node.y);
this.node.x = a;
this.node.y = o;
}
}
});
cc._RF.pop();
}, {
Utils: "Utils"
} ],
uisetting: [ function(t, e) {
"use strict";
cc._RF.push(e, "3c225Bks5FNsqDb76o/cNg0", "uisetting");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {
tg_sound: {
default: null,
type: cc.Toggle
},
tg_ani: {
default: null,
type: cc.Toggle
},
tg_dmg: {
default: null,
type: cc.Toggle
},
tg_autosell: {
default: null,
type: cc.Toggle
}
},
onLoad: function() {
this.tg_sound.isChecked = !cc.notSound;
this.tg_ani.isChecked = !cc.notani;
this.tg_dmg.isChecked = !cc.nodmglb;
this.tg_autosell.isChecked = cc.autosell;
},
clicksound: function() {
cc.soundMgr.onclicksound();
},
clickani: function() {
cc.notani = !cc.notani;
},
clickdmg: function() {
cc.nodmglb = !cc.nodmglb;
},
clicksell: function() {
cc.autosell = !cc.autosell;
},
close: function() {
this.node.destroy();
},
cloudsave: function() {
var t = cc.playerData.savedata();
t && i.savecloud(t);
},
cloudload: function() {
i.loadcloud();
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
uishop: [ function(t, e) {
"use strict";
cc._RF.push(e, "3413crUmFRONrngGSBhpcb7", "uishop");
var i = {
1: [ 30001, [ 30001, 10 ], 10001, 10101, 10201, 20001, 20101, 20201, 20301, 20401 ],
2: [ 38001, 38002, 38003, [ 38001, 10 ], [ 38002, 10 ], [ 38003, 10 ] ],
3: [ 20601, 20602, 20603, 20604, 20605, 20606 ],
101: [ [ 30006, 1, 800 ], [ 31024, 1, 2e3 ], [ 31025, 1, 2e3 ], [ 31026, 1, 2e3 ], [ 10021, 1, 500 ], [ 10217, 1, 500 ], [ 10116, 1, 500 ] ]
};
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
}
},
initdata: function(t) {
t > 100 && (this.ygmode = !0);
var e = i[t];
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(e.length, {
array: e,
target: this
});
},
close: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
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
uistage: [ function(t, e) {
"use strict";
cc._RF.push(e, "685e2lP2YlPUoNpDbn1eUJu", "uistage");
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
},
lb_cengshu: {
default: null,
type: cc.Label
},
tg_shenyuan: {
default: null,
type: cc.Toggle
},
nd_shenyuan: {
default: null,
type: cc.Node
}
},
start: function() {
this.nd_shenyuan.active = cc.playerData.stage > 50;
this.tg_shenyuan.isChecked = cc.shenyuan;
cc.hell = !1;
cc.wujin = !1;
this.retable();
this.refresh();
},
retable: function() {
var t = [], e = cc.playerData.getstage();
cc.shenyuan && (e = cc.playerData.getstagesy());
for (var i = 0; i < e; i++) t.push(i + 1);
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(t.length, {
array: t,
target: this
});
this.tbv.scrollToOffset({
x: 0,
y: 60 * Math.max(0, cc.playerData.tempstage - 1)
}, 0);
},
refresh: function() {
this.lb_cengshu.string = "挑战" + cc.playerData.tempstage + "层";
},
clicknormal: function() {
cc.stageid = cc.playerData.tempstage;
cc.battling = !0;
cc.director.loadScene("game");
},
clickbest: function() {
cc.shenyuan ? cc.stageid = cc.playerData.getstagesy() : cc.stageid = cc.playerData.getstage();
cc.battling = !0;
cc.director.loadScene("game");
},
close: function() {
this.node.destroy();
},
onclicksy: function() {
cc.shenyuan = this.tg_shenyuan.isChecked;
cc.playerData.retemp();
this.retable();
this.refresh();
}
});
cc._RF.pop();
}, {} ],
uistart: [ function(t, e) {
"use strict";
cc._RF.push(e, "c8920DYHkVK0LRwb/wx2c+z", "uistart");
cc.Class({
extends: cc.Component,
properties: {
pbmain: {
default: null,
type: cc.Prefab
}
},
start: function() {
var t = cc.instantiate(this.pbmain);
this.node.parent.addChild(t);
}
});
cc._RF.pop();
}, {} ],
uitiejiang: [ function(t, e) {
"use strict";
cc._RF.push(e, "0f002Vw7jtOPoo4ZdB8QAE0", "uitiejiang");
var i = t("Utils"), s = t("enumcfg"), n = s.qulitycolor, a = (s.typename, s.enumpropertyname), o = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {
lb_qianghuacost: {
default: null,
type: cc.Label
},
lb_xiliancost: {
default: null,
type: cc.Label
},
lb_name: {
default: null,
type: cc.Label
},
lb_lv: {
default: null,
type: cc.Label
},
nd_normal: {
default: null,
type: cc.Node
},
nd_xilian: {
default: null,
type: cc.Node
},
nd_tableview: {
default: null,
type: cc.Node
},
pb_citiao: {
default: null,
type: cc.Prefab
},
nd_qianghua: {
default: null,
type: cc.Node
},
nd_weaponskill: {
default: null,
type: cc.Node
},
nd_skillicon: {
default: [],
type: cc.Node
},
lb_skillitem: {
default: null,
type: cc.Label
},
nd_shengjie: {
default: null,
type: cc.Node
}
},
onLoad: function() {
cc.Notifier.on("clickequip", this, this.refreshqeuip.bind(this));
},
onDestroy: function() {
cc.Notifier.off("clickequip", this, this.refreshqeuip.bind(this));
},
createpb: function(t, e, i) {
var s = cc.instantiate(this.pb_citiao);
s.getComponent(cc.Label).string = t;
s.color = e;
i ? this.nd_normal.addChild(s) : this.nd_xilian.addChild(s);
},
refreshqeuip: function(t) {
for (var e = this.tbv.content.children, i = 0; i < e.length; i++) {
var s = e[i]._children[0];
this.choseditem = t;
s.getComponent("cellbag").refrehclick(t);
}
this.nd_normal.destroyAllChildren();
this.nd_xilian.destroyAllChildren();
var o = t.cfg;
t.lv > 0 ? this.lb_lv.string = " +" + t.lv : this.lb_lv.string = " ";
this.lb_name.string = o.name;
var c = n[t.qulity];
this.lb_name.node.color = c;
6 == o.subtype || 7 == o.subtype ? this.nd_qianghua.active = !1 : this.nd_qianghua.active = !0;
var r = 0;
o.fixproperty && (r = o.fixproperty.length);
for (i = 0; i < t.property.length; i++) {
var l = t.property[i][0], h = "";
if (l > 100) {
l -= 100;
h = "%";
}
var p = Math.floor(t.property[i][1]);
this.createpb(a[l].name + ":" + p + h, i < r ? cc.Color.GREEN : cc.Color.WHITE, i < r);
}
this.lb_qianghuacost.string = t.getqhcost();
this.choseitem = t;
this.lb_xiliancost.string = cc.playerData.getitemcountbyid(30002);
this.lb_skillitem.string = cc.playerData.getitemcountbyid(30004);
if (1 == o.type) {
for (var d = t.skills, u = 1; u < 4; u++) {
var f = this.nd_skillicon[u - 1];
if (u < d.length) {
f.active = !0;
f.getComponent("uiskillicon").initdata(d[u][0], u);
} else f.active = !1;
}
this.nd_weaponskill.active = !0;
} else this.nd_weaponskill.active = !1;
this.nd_shengjie.active = t.canjinhua();
},
findeq: function(t, e, i) {
for (var s = 0; s < t.length; s++) {
var n = t[s];
if (n) {
n.bs = i;
e.push(n);
}
}
},
start: function() {
var t = [];
this.findeq(cc.playerData.player.equiparr, t, 1);
this.findeq(cc.playerData.equipbag, t, 2);
this.tiejiangmode = !0;
t = i.arrtoarr(t, 5);
this.tbv = this.nd_tableview.getComponent("tableView");
this.tbv.initTableView(t.length, {
array: t,
target: this
});
cc.Notifier.emit("clickequip", t[0][0]);
if (cc.suojineng) for (var e = 1; e < 4; e++) this.nd_skillicon[e - 1].getComponent("uiskillicon").setcallback(e, this);
},
refreshskillchose: function() {
for (var t = 1; t < 4; t++) {
var e = this.nd_skillicon[t - 1];
e.skillpos == this.skillpos ? e.getChildByName("lock").active = !0 : e.getChildByName("lock").active = !1;
}
},
close: function() {
this.node.destroy();
},
clickqh: function() {
var t = this.choseitem.lvup();
t ? 1 == t ? cc.uiHelper.showTips("强化等级不能超过角色等级") : 2 == t && cc.uiHelper.showTips("金币不足") : this.refreshqeuip(this.choseitem);
},
autoclickqh: function() {
for (;!this.choseitem.lvup(); ) ;
this.refreshqeuip(this.choseitem);
},
huishou: function() {
this.choseitem.huishou(.8);
this.refreshqeuip(this.choseitem);
},
adhuishou: function() {
var t = this;
o.adWatch("jiesuan", function() {
t.choseitem.huishou(1);
});
this.refreshqeuip(this.choseitem);
},
clickxl: function() {
this.choseitem.xilian() ? this.refreshqeuip(this.choseitem) : cc.uiHelper.showTips("重铸石不足");
},
clickxskill: function() {
this.choseitem.xiskill(this.skillpos) ? this.refreshqeuip(this.choseitem) : cc.uiHelper.showTips("武器技能水不足");
},
clickshengjie: function() {
this.choseitem.dojinhua() && this.refreshqeuip(this.choseitem);
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
Utils: "Utils",
enumcfg: "enumcfg"
} ],
uixingxiang: [ function(t, e) {
"use strict";
cc._RF.push(e, "45ee3AepjRBdaqvArebemD2", "uixingxiang");
var i = t("Utils"), s = t("avatarcfg"), n = s.manpartcount, a = s.womanpartcount, o = s.colorTB, c = t("SDKManage"), r = [ "前发", "头发", "服装", "脸部", "耳朵", "翅膀", "尾巴", "披风", "兽耳", "眼镜", "头饰1", "头饰2", "胡子", "发色" ];
cc.Class({
extends: cc.Component,
properties: {
nd_avatar: {
default: null,
type: cc.Node
},
nd_layout: {
default: null,
type: cc.Node
},
sp_out: {
default: null,
type: cc.Sprite
},
sp_out2: {
default: null,
type: cc.Sprite
},
sp_out3: {
default: null,
type: cc.Sprite
},
pb_xingxiang: {
default: null,
type: cc.Prefab
},
lb_cost: {
default: null,
type: cc.Label
}
},
start: function() {
this.cellarr = [];
for (var t = 0; t < 14; t++) {
var e = cc.instantiate(this.pb_xingxiang), i = e.getComponent("pbxingxiang");
this.cellarr.push(i);
this.nd_layout.addChild(e);
}
this.avatar = this.nd_avatar.getComponent("avatar");
this.avatar.initcommon(cc.playerData.ismale, cc.playerData.xxarr);
cc.playerData.ismale ? this.countcfg = n : this.countcfg = a;
this.lb_cost.string = 100 * cc.playerData.player.lv;
this.init(cc.playerData.xxarr);
},
onLoad: function() {
cc.Notifier.on("xarrchange", this, this.xarrchange.bind(this));
cc.Notifier.on("avatarfinish", this, this.avatarfinish.bind(this));
},
onDestroy: function() {
cc.Notifier.off("xarrchange", this);
cc.Notifier.off("avatarfinish", this);
},
avatarfinish: function() {
this.sp_out.spriteFrame = i.rendernode(this.nd_avatar);
this.sp_out.spriteFrame.getTexture().setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
this.sp_out2.spriteFrame = this.sp_out.spriteFrame;
this.sp_out3.spriteFrame = this.sp_out.spriteFrame;
},
init: function(t) {
var e = [];
e[0] = this.countcfg.fronthair;
e[1] = this.countcfg.rearhair;
e[2] = this.countcfg.clothing;
e[3] = this.countcfg.face;
e[4] = this.countcfg.ear;
e[5] = this.countcfg.wing;
e[6] = this.countcfg.tail;
e[7] = this.countcfg.cloak;
e[8] = this.countcfg.beastear;
e[9] = this.countcfg.glass;
e[10] = this.countcfg.acc1;
e[11] = this.countcfg.acc2;
e[12] = this.countcfg.beard;
e[13] = o.length - 1;
for (var i = 0; i < this.cellarr.length; i++) {
this.cellarr[i].initdata(i, e[i], r[i]);
this.cellarr[i].refreshidx(t[i]);
}
},
dohuan: function() {
cc.playerData.savexingxiang(this.avatar.partarr, this.avatar.ismale);
cc.herospriteframe = this.sp_out.spriteFrame;
cc.Notifier.emit("refreshhero");
cc.uiHelper.showTips("形象已更改");
this.node.destroy();
},
onclickok: function() {
var t = 100 * cc.playerData.player.lv;
if (cc.playerData.gold >= t) {
cc.playerData.changegold(-t);
this.dohuan();
} else cc.uiHelper.showTips("金币不足");
},
onclickad: function() {
var t = this;
c.adWatch("catchbaby", function() {
t.dohuan();
});
},
onclickman: function() {
this.countcfg = n;
this.init(this.avatar.initdata(!0));
},
onclickwoman: function() {
this.countcfg = a;
this.init(this.avatar.initdata(!1));
},
xarrchange: function(t) {
this.avatar.refreshpart(t.idx, t.v);
},
rand: function() {
for (var t = this.avatar.randpart(), e = 0; e < this.cellarr.length; e++) this.cellarr[e].refreshidx(t[e]);
},
close: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
Utils: "Utils",
avatarcfg: "avatarcfg"
} ],
uiys: [ function(t, e) {
"use strict";
cc._RF.push(e, "1f836OCDqJJf6bBSOldEzvQ", "uiys");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
},
lb_tongyi: {
default: null,
type: cc.Label
},
nd_no: {
default: null,
type: cc.Node
}
},
start: function() {
this.ysstr = "隐私政策\n更新日期：2022年【9】月【24】日\n生效日期：2022年【9】月【24】日\n【上海金鳞网络科技有限公司】（注册地址：【上海市长宁区哈密路1955号5层】，以下简称“我们”）系移动应用程序“【像素世界探险】”（以下简称“【像素世界探险】”）的运营者。我们非常重视保护用户（以下简称“您”）的个人信息和隐私。您在使用【像素世界探险】时，我们会收集、使用、保存、共享您的相关个人信息。为呈现我们处理您个人信息的情况，我们特制定《【像素世界探险】隐私政策》（以下简称“隐私政策”），我们承诺严格按照本隐私政策处理您的个人信息。\n我们在此提醒您：\n在您使用【像素世界探险】前，请您务必认真阅读本隐私政策，充分理解各条款内容，包括但不限于免除或限制我们责任的条款。您知晓并确认，您勾选“同意”本隐私政策并使用【像素世界探险】，就表示您同意我们按照本隐私政策处理您的个人信息。请您知悉，本政策仅适用于我们通过【像素世界探险】向您提供服务所收集的信息，不适用于通过接入【像素世界探险】以向您提供产品或服务的第三方所收集的信息。\n\n本隐私政策将帮助您了解以下内容：\n一、 我们如何收集和使用您的个人信息\n二、 我们如何保存您的个人信息\n三、 我们如何使用Cookies\n四、 我们如何共享、转让、公开披露您的个人信息\n五、 第三方产品或服务如何获得您的个人信息\n六、 我们如何保护您的个人信息\n七、 您如何管理您的个人信息\n八、 我们如何处理未成年人的个人信息\n九、 本隐私政策如何更新\n十、 如何联系我们\n一、 我们如何收集和使用您的个人信息\n（一）我们如何收集您的个人信息\n在您使用【像素世界探险】过程中，我们会按照如下方式收集您的个人信息：\n1.保障App 软件及相关服务的正常运行\n您在使用游戏时，我们可能需要收集和使用您的一些个人信息，我们收集和使用的个人信息包括两种：第一种：游戏的核心功能所必要的信息。这类信息为游戏正常运行的必备信息；第二种：游戏附加业务功能可能收集的信息。这类信息用以支撑您在游戏中希望体验的附加功能，如您拒绝提供，将会导致特定附加功能无法实现或无法达到我们拟达到的效果，但并不会影响游戏核心功能的正常使用。\n我们需要特别提醒您的是：在游戏中，为了向您提供更全面的服务，游戏中内嵌了第三方SDK或类似应用程序，因此，第三方SDK或类似应用程序可能也会收集您的个人信息。\n当您使用账号注册/登录功能时，您需要提供给我们一些单独或者结合识别您的用户身份的信息，包括：手机号码、验证码匹配结果。我们收集这些信息是用于完成账号注册/登录程序、为您持续稳定提供服务，并保护您的账号安全。您应知悉，我们收集该类信息是基于法律法规的相关要求，如您拒绝提供可能导致您无法注册/登录账号。\n当您运行游戏时，为满足相关法律法规政策及相关主管部门的需求，确保用户身份真实性，实现反欺诈等风险控制、保障系统和服务安全，您需进行实名认证。我们会在获得您的同意或您主动提供的情况下，收集您的实名身份信息（包括姓名、身份证号）。您应知悉，实名身份信息属于敏感信息，请您谨慎考虑是否提供。我们亦会高度对待和谨慎处理您的实名身份信息（包括高强度加密保护）。拒绝提供实名身份信息可能会导致您无法使用游戏。\n当您登录/运行游戏时，为了识别账号异常状态，维护基础功能的正常运行，提升您的游戏体验，我们或第三方SDK需要收集您所使用的设备信息，包括设备名称、设备机型、操作系统及版本、客户端版本、设备分辨率、包名、设备设置、设备标识符（包括MAC地址、IMEI、IMSI、Android ID、IDFA、OAID、ICCID、MEID、GUID）、WLAN接入点（包括SSID、BSSID）、设备序列号、IP 地址、蓝牙信息。游戏为了收集上述基本的个人设备信息，我们将会申请访问您的设备信息权限，我们收集这些信息是为了向您提供游戏的核心游戏功能。\n2. 实名认证\n当您进行实名认证时，我们需要收集您的姓名、身份证件类型、身份证件号码。同时，为实现实名认证的目的，您同意并授权我们自行或委托第三方向有关实名认证机构（如个人征信机构、政府部门等）提供、查询、核对您的前述身份信息。我们收集您的上述信息是为了履行法定义务，核验用户真实身份、识别用户年龄以及保障系统和服务安全。如您不提供这类信息，您将无法登录【像素世界探险】或在使用【像素世界探险】过程中受到相应限制。\n3.   保障网络和服务的安全\n为了保障网络和游戏服务的安全性，我们会收集您的设备识别符、IP地址、访问日期和时间。我们收集您的上述信息以营造公平、健康及安全的游戏环境，以打击破坏游戏公平环境或干扰、破坏游戏服务正常进行的行为（如用于检测盗版、扫描外挂、防止作弊等）。如您不提供上述信息，您将无法使用游戏服务。\n（2） 设备权限调用情况\n在您使用【像素世界探险】过程中，我们需要在必要范围内向您申请获取设备权限。请您知悉，我们不会默认开启您设备的权限，仅在您主动确认开启的情况下，【像素世界探险】才有可能通过设备权限收集您的信息。【像素世界探险】调用的权限、调用权限的目的，以及调用权限前向您询问的情况请见下表：\n设备权限：运行中的进程\n调用权限的目的：用于游戏实时进度储存\n是否询问：否\n用户可否关闭：否\n设备权限：安装列表\n调用权限的目的：用于游戏最新版本迭代更新\n是否询问：否\n用户可否关闭：否\n设备权限：网络\n调用权限的目的：登陆验证、获取网络时间和加载广告\n是否询问：是\n用户可否关闭：可\n如您在首次授权开启权限后希望关闭权限，您可以在设备的设置功能中选择关闭权限，从而拒绝我们收集相应的个人信息。\n（三）我们如何使用您的个人信息\n1.   我们会根据本政策的约定并为实现我们的服务的目的对所收集的个人信息进行使用。\n2.   请您注意，您在使用我们提供的服务时所提供的所有个人信息，除非您删除或通过系统设置拒绝我们收集，否则将在您使用我们的服务期间持续授权我们使用。在您注销账号时，我们将停止使用并删除您的个人信息。\n3.   我们会对我们提供的服务使用情况进行统计，并可能会与公众或第三方共享这些统计信息，以用于产品开发、服务优化、安全保障的目的。但这些统计信息不包含您的任何身份识别信息。\n4.   当我们要将您的个人信息用于本政策未载明的其它用途时，或基于特定目的收集而来的信息用于其他目的时，会通过您主动做出勾选的形式事先征求您的同意。\n（四）其他规则\n根据相关法律法规及国家标准，以下情形中，我们可能会收集、使用您的相关个人信息而无需征求您的授权同意：\n(1) 与我们履行法律法规规定的义务相关的；\n(2) 与国家安全、国防安全直接相关的；\n(3) 与公共安全、公共卫生、重大公共利益直接相关的；\n(4) 与刑事侦查、起诉、审批和判决执行等直接相关的；\n(5) 出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人授权同意的；\n(6) 所涉及的个人信息是个人信息主体或监护人自行向社会公众公开的；\n(7) 根据个人信息主体要求签订和履行合同所必需的；\n(8) 从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；\n(9) 维护所提供产品或服务的安全稳定运行所必需的，如发现、处置产品或服务的故障。\n二、 我们如何保存您的个人信息\n1.   我们将在本政策载明的目的所需及法律法规要求的最短保存期限之内，保存您的个人信息。前述期限届满后，我们将对您的个人信息做删除或匿名化处理。\n2.   我们在中国境内运营过程中收集和产生的个人信息将保存在中国境内（为本隐私政策之目的，“中国境内”不含中国港澳台地区），以下情形除外：\n(1) 法律有明确规定；\n(2) 获得您的明确授权；\n(3) 您要求获取境外服务等个人主动行为。\n针对以上情形，我们会确保依据本隐私政策以及相关法律规定对您的个人信息提供足够的保护。\n三、 我们如何使用Cookies和同类技术\n1.   我们如何使用Cookies\n(1) 通过使用Cookies，我们向用户提供安全且具个性化的服务体验。我们和第三方合作伙伴会在您的计算机或移动设备上存储Cookies、Flash Cookies，或浏览器（或关联应用程序）提供的其他通常包含标识符、站点名称以及一些号码和字符的本地存储（以上合称“Cookies”）。我们和我们的第三方合作伙伴可能通过Cookies收集您的信息，并将信息用于以下用途：\n● 安全类Cookies：Cookies可帮助我们保障产品和服务的安全和高效运转。\n● 推荐类Cookies：Cookies可帮助我们为您推荐、展示、推送您可能感兴趣的内容。\n● ……\n(2) 第三方合作伙伴通过Cookies收集和使用您的信息不受本政策约束，而是受到其自身的信息保护声明约束，我们不对第三方的Cookies或同类技术承担责任。\n(3) 如果您的浏览器或浏览器附加服务允许，您可修改对Cookies的接受程度或拒绝我们的Cookies。有关详情，请参见https://www.aboutcookies.org/。但如果您这么做，在某些情况下可能会影响您安全使用我们的产品或服务。同时，您仍然将收到商品或服务信息，只是这些商品或服务信息与您的相关性会降低。\n2.   我们如何使用同类技术\n……\n四、 我们如何共享、转让、公开披露您的个人信息\n1.   委托处理\n我们会委托第三方服务提供商处理我们所收集的您的个人信息，以便其为我们提供基础设施技术、数据分析、广告投放、营销决策等产品或技术支持。上述委托处理行为受本政策中所声明目的约束，并且我们会以合同的方式对上述受托的第三方服务提供商进行监督。\n2.   共享\n(1) 事先获得您明确的同意或授权，或您要求我们通过电子邮件或其他方式与第三方共享您的个人信息；\n(2) 根据适用的法律法规规定，或按照政府主管部门的强制性要求进行提供；\n(3) 与我们的关联公司共享：我们可能会与我们的关联公司共享您的个人信息；但是我们只会共享必要的个人信息，且受本政策中所声明目的的约束；关联公司也将依据本政策采取同等的安全保障措施来保障您的个人信息安全；\n3.   转让\n我们不会将您的个人信息转让给任何公司、组织和个人，但在涉及合并、收购、资产转让或破产清算时，如涉及到个人信息转让，我们会向您告知有关情况，并要求新的持有您个人信息的公司、组织继续受本政策的约束，否则我们将要求该公司、组织重新取得您的授权同意。\n4.   公开披露\n除非本合同另有约定或法律明确规定，我们不会公开披露您的个人信息。\n5.   例外情况\n另外，根据相关法律及国家标准，以下情形中，我们可能会共享、转让、公开披露个人信息无需事先征得您的授权同意：\n(1) 与我们履行法律法规规定的义务相关的；\n(2) 与国家安全、国防安全直接相关的；\n(3) 与公共安全、公共卫生、重大公共利益直接相关的；\n(4) 与刑事侦查、起诉、审判和判决执行等直接相关的；\n(5) 出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人授权同意的；\n(6) 个人信息主体或监护人自行向社会公众公开的个人信息；\n(7) 从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。\n6.   请注意，您在使用我们服务时自愿共享甚至公开分享的信息，可能会涉及您或他人的个人信息甚至个人敏感信息。请您谨慎共享或公开，如所涉信息包含他人个人信息，请您在共享或公开前取得他人同意。\n7.   请知悉，根据法律规定，若我们采取技术措施和其他必要措施处理个人信息，使得数据接收方无法重新识别特定个人且不能复原，经上述处理后的数据的共享、转让、公开披露无需另行向您通知并征得您的同意。\n五、 第三方产品或服务如何获得您的个人信息\n为提供和优化我们的服务，本游戏中可能会包含第三方SDK或其他类似的应用程序。当您在本游戏中使用由这类第三方 SDK或类似应用程序提供的服务时，您同意将由其直接收集和处理您的信息。这类SDK 或类似应用程序收集和处理信息的行为遵守各自的隐私政策，不适用本《隐私政策》。我们会努力审查这类第三方SDK及类似应用程序的业务准入资质并努力要求其合法合规性及安全性。\n为了最大程度上保证您的信息安全，我们强烈建议您查看第三方SDK及类似应用程序的隐私条款。为保障您的合法权益，如您发现此类 SDK或类似应用程序存在风险时，建议您立即终止相关操作并及时与我们取得联系\n\nSDK名称：TapSDK Android\nSDK使用目的：读取设备标识、用于数据统计分析、信息展示、账号登录、防沉迷、实名认证\nSDK收集的信息：防沉迷、账号登录、实名认证相关功能读取电话状态、IMEI、网络设备制造商、android ID、bssid设备应用列表、WiFi信息、设备版本、手机样式、系统版本\n隐私政策链接：https://www.taptap.com/privacy-policy\n\nSDK名称：字节跳动穿山甲SDK\nSDK使用目的：\n获取运行中的进程：用于广告精准投放目的。\n获取已安装的应用列表：用于广告精准投放目的，防止推送已经安装的App的广告。\n粗略的位置信息：用于广告精准投放目的。\n获取 IMEI：用于标识用户，防止广告作弊。\n获取 AndroidID：用于标识用户，防止广告作弊。\n获取 MAC 地址：用于标识用户，防止广告作弊。\nSDK收集的信息：读取电话状态、IMEI、网络设备制造商、android ID、bssid设备应用列表、WiFi信息、设备版本、手机样式、系统版本、运行中的进程、安装列表、网络定位、GPS定位、MAC信息\n隐私政策链接：https://www.pangle.cn/privacy/partner\n\nSDK名称：腾讯优量汇SDK\nSDK使用目的：\n获取运行中的进程：用于广告精准投放目的。\n获取已安装的应用列表：用于广告精准投放目的，防止推送已经安装的App的广告。\n粗略的位置信息：用于广告精准投放目的。\n获取 IMEI：用于标识用户，防止广告作弊。\n获取 AndroidID：用于标识用户，防止广告作弊。\n获取 MAC 地址：用于标识用户，防止广告作弊。\nSDK收集的信息：读取电话状态、IMEI、网络设备制造商、android ID、bssid设备应用列表、WiFi信息、设备版本、手机样式、系统版本、运行中的进程、安装列表、网络定位、GPS定位、MAC信息\n隐私政策链接：https://qzs.gdtimg.com/union/res/union_cdn/page/dev_rules/ylh_sdk_privacy_statement.html\n\nSDK名称：华为Ads SDK\n设备及使用信息：设备标识符、操作系统的设置信息、设备的硬件信息、应用的基本信息及使用信息、网络信息、运营商信息、华为帐号信息。\n广告互动信息：对广告的浏览、点击、关闭和播放信息，打开和关闭应用的时间、应用使用频率、应用错误日志。\n设备位置信息：系统会询问用户是否启用XXX应用程序基于位置的服务，用户可在设备的设置菜单中选择关闭设备上的相应权限，拒绝共享位置信息。\n隐私政策链接：https://privacy.consumer.huawei.com/legal/ads/privacy-statement.htm?&code=HK&language=zh-CN&branchid=0&contenttag=default\n\n六、 我们如何保护您的个人信息\n我们非常重视个人信息安全，并采取一切合理可行的措施，保护您的个人信息：\n1.   我们采取了行业通行的数据保护技术与管理措施，例如网络隔离、数据加密、员工访问控制等措施，以防止其遭到未经授权的访问、披露、篡改、丢失或毁坏。\n2.   请您知悉，虽然我们将尽力确保或担保您发送给我们的任何信息的安全性，但互联网环境并非百分之百安全，我们亦不对由此产生或与之相关的任何风险、损失承担责任。\n3.   在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以应用程序推送、电子邮件、短信、电话等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。\n七、 您如何管理您的个人信息\n在您使用【像素世界探险】期间，您可以通过相应页面提示或本隐私政策载明的方式联系我们，以访问、更正、删除您的个人信息，以及行使改变授权同意的范围与注销账号的权利，您的意见会及时得到处理。\n1.   删除您的个人信息\n在以下情形中，您可以通过本隐私政策载明的方式向我们提出删除个人信息的请求：\n(1) 我们违反法律、行政法规或与您的约定收集、使用个人信息；\n(2) 我们违反法律、行政法规或与您的约定与第三方共享或转让您的个人信息，我们将立即停止共享、转让行为，并通知第三方及时删除；\n(3) 我们违反法律、行政法规规定或与您的约定，公开披露您的个人信息，我们将立即停止公开披露的行为，并发布通知要求相关接收方删除相应的信息；\n(4) 您不再使用我们的产品或服务，或您注销了账号，或我们终止服务及运营。\n2.   改变您授权同意的范围\n您可以通过设备权限设置或本隐私政策载明的方式与我们联系，以改变同意范围或撤回您的授权。\n请您理解，【像素世界探险】可能需要开启部分权限并收集必要的个人信息才能得以实现。当您撤回您的同意时，我们将无法继续为您提供撤回同意所对应的服务，但不会影响此前基于您的授权而开展的个人信息处理服务。\n3.   响应您的上述请求\n如您无法按照上述方式行使权利的，您可以采取本隐私政策载明的联系方式与我们联系。为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。\n对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情收取一定成本费用。对于那些无端重复、需要过多技术手段、给他人合法权益带来风险或者非常不切实际的请求，我们可能会予以拒绝。\n4.   响应情形的例外\n在以下情形中，我们将无法响应您的请求:\n(1) 与我们履行法律法规规定的义务相关的;\n(2) 与国家安全、国防安全直接相关的;\n(3) 与公共安全、公共卫生、重大公共利益直接相关的;\n(4) 与刑事侦查、起诉、审判和执行判决等直接相关的;\n(5) 我们有充分证据表明个人信息主体存在主观恶意或滥用权利的;\n(6) 出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的;\n(7) 响应个人信息主体的请求将导致个人信息主体或其他个人、组织的合法权益受到严重损害的;\n(8) 涉及商业秘密的。\n八、 我们如何处理未成年人的个人信息\n我们非常重视对未成年人个人信息的保护。根据相关法律法规的规定，收集、使用未满14周岁的未成年人的个人信息，需由监护人授权同意；收集、使用已满14周岁未满18周岁的未成年人个人信息，可由监护人授权同意或自行授权同意。\n如您为未成年人（尤其是不满14周岁的未成年人），我们要求您请您的父母或其他监护人仔细阅读本隐私政策，并在征得您的监护人授权同意的前提下使用我们的服务或向我们提供信息。\n如您是未成年人的监护人，请您关注您所监护的未成年人是否是在您授权同意之后使用我们的产品或服务。如果您对您所监护的未成年人的个人信息有疑问，请通过本隐私政策载明的方式与我们联系。\n九、 本隐私政策如何更新\n我们的隐私政策可能会适时发生变更。我们会在本页面上发布对本隐私政策所做的任何变更。对于重大变更，我们还会提供更为显著的通知（我们可能会通过在浏览页面做特别提示等方式，说明隐私政策的具体变更内容）。未经您明确同意，我们不会削减您按照本隐私政策所应享有的权利。\n本隐私政策所指的重大变更包括但不限于：我们的服务模式发生重大变化；个人信息共享、转让或公开披露的主要对象发生变化；您参与个人信息处理方面的权利及其行使方式发生重大变化；我们的联系方式及投诉渠道发生变化；个人信息安全影响评估报告表明存在高风险时。\n我们还会将本隐私政策的旧版本存档，供您查阅。\n十、 如何联系我们\n如果您对本政策或个人信息保护有任何问题，您可以将您的书面疑问、意见或建议通过以下地址寄至客服部门：\n名称：【上海金鳞网络科技有限公司】\n地址：【上海市长宁区哈密路1955号5层】\n或您也可以通过以下邮箱与客服部门进行联系：\n联系邮箱：【1106694231 @qq.com】\n一般情况下，我们将在十五个工作日内回复。如果您对我们的回复不满意，特别是我们的个人信息处理行为损害了您的合法权益，您还可以向网信、电信、公安及工商等监管部门进行投诉或举报，或通过向被告住所地有管辖权的法院提起诉讼来寻求解决方案。\n";
this.yhstr = "用户协议\n\n第一部分 重要提示\n\n本《用户使用许可及服务协议》（以下简称“协议”）是用户（个人或单一实体，以下或称“用户”）与上海金鳞网络科技有限公司（以下简称“金鳞游戏”）之间有关金鳞游戏运营之游戏（指由金鳞游戏负责运营的游戏的统称，包括计算机客户端游戏、网页游戏、HTML5游戏、移动终端游戏、电视端游戏以及其他形式的游戏，亦应包括上述游戏之任何修改、更新、全部前期版本及后续版本及其附随的金蚕下载器、相关软件及相关文档等。以下简称“游戏”）使用的法律协议。\n1.协议内容\n1.1主要内容：\n第一部分重要提示；第二部分权利声明；第三部分必备条款；第四主要条款；第五部分用户守则；\n1.2变更内容：\n上述内容之全部，金鳞游戏保留根据运营需要进行更改的权利所有更改、更新后的内容将在金鳞游戏指定的异议期间结束后立即生效；\n1.3新增内容：\n金鳞游戏根据运营需要定期或不定期发布的其他规则，包括但不限于游戏论坛的论坛守则、行为规范、活动规则、定义解释等其他官方信息。\n请注意：鉴于用户使用游戏服务之习惯，用户有义务自使用金鳞游戏服务之日起每月自行主动对本最终用户使用许可协议之全部内容进行重新阅读，鉴于上述约定，用户因自身怠于履行该等义务的，无权以未获知上述内容而对相关条款的法律效力提出异议。\n2.金鳞游戏的义务\n2.1法定的金鳞游戏采取合理的方式提请用户注意的义务将通过如下方式实现：\n在本协议中金鳞游戏以明确的足以引起用户注意的加粗、红色标记等合理方式提醒用户注意相关条款（需要强调的是，还包括但不限于用户应特别注意任何未明确标记的含有“不承担”、“免责”、“不得”“拒绝”等类似形式用语的条款），这些条款应在中国法律所允许的范围内最大程度地适用于本协议。除非用户接受本协议的全部条款，否则无权安装、复制、访问金鳞游戏相关网站、充值、运行客户端软件或以其它方式使用游戏。\n3.用户的权利\n对以上所述相关条款及本协议任何内容有异议时，用户有权利拒绝点击同意或在任何协议更新、变更、修改后30日内以致电或发送邮件形式向金鳞游戏表示异议。\n用户的以下任一行为将视为用户对协议完全的认可，本用户协议将立即生效并全面地对金鳞游戏及用户产生法律约束力：（1）在注册、下载、使用等任一环节点击“同意”；（2）以任何可能或已经与游戏发生交互的方式使用金鳞游戏提供的游戏产品及服务的；（3）未在协议、规则等更新、变更、修改后30日内以致电或发送邮件形式向金鳞游戏表示异议的。\n4.用户的认可\n鉴于金鳞游戏已依法履行了格式条款制订方的义务，用户以上行为将被视为且应当被视为用户已经完全注意并同意了本协议所有条款尤其是提醒用户注意的条款的合法性及有效性，用户不应当以金鳞游戏未对格式条款以合理方式提醒用户注意或未根据用户要求尽到说明义务为理由而声称或要求法院或其它任何第三方机构确认相关条款非法或无效。\n5.未成年人注意条款\n如果您未满18周岁，请在法定监护人的陪同下阅读本协议，并特别注意未成年人使用条款。如您为未成年人法定监护人，希望合理设定孩子娱乐时间，培养孩子健康游戏习惯的，可依据国家相关规则了解相关信息。\n \n第二部分  权利声明\n \n1．知识产权\n本产品及使用说明书均受版权法保护，所有程序及图文内容非经授权方及运营商书面许可，不得以任何方式做全部或局部复制、转载或修改。本产品及包装、手册上的所有相关产品名称、商标、品牌、画面均归授权方或金鳞游戏拥有，是属于其各自所有者的财产。\n游戏之全部内容（包括但不仅限于任何计算机代码、游戏角色、游戏角色名称、游戏角色资料信息、故事背景、情节语言、地名设置、任务设计、经济系统、交易系统、生产建设系统、社交系统、对抗功能、角色形象、声音效果、地图道具、动作呈现、团队系统、游戏概念、美术作品、音效、音乐、音像、文档以及游戏客户端和服务器软件）的知识产权归授权方所有，运营方基于授权而依法享有履行本协议之全部权利。\n2．游戏账号\n游戏用户账号的所有权归金鳞游戏所有，用户注册成功后获得的是游戏用户账号的使用权，相应地基于该游戏账号产生并储存于金鳞游戏数据库的任何数据信息（包括但不限于账号数据信息、角色数据信息等）的所有权均属于金鳞游戏。用户在完全遵守协议的前提下，在正常使用游戏的过程中对属于其用户账号的数据信息享有协议规定的使用权。\n3. 虚拟物品\n游戏产品和服务中的虚拟物品，包括但不限于元宝、金币、黄金、游戏币、虚拟装备、虚拟道具等，由金鳞游戏享有其所有权，相应地基于该虚拟物品产生并储存于金鳞游戏数据库的任何数据信息（包括但不限于虚拟物品数据信息、等级物品数据信息等）的所有权均属于金鳞游戏。用户在完全遵守协议的前提下，在正常使用游戏的过程中对属于其虚拟物品的数据信息享有协议规定的使用权。\n \n第三部分 必备条款\n \n1.账号注册\n1.1 用户需要使用游戏，则用户需要将用户享有使用权的金鳞游戏通行证或金鳞游戏认可的其他账号作为游戏账号，并按照国家法律法规的相关要求，登录实名注册系统并进行实名注册。用户对该金鳞游戏通行证或金鳞游戏认可的其他账号的申请、使用等行为应相应符合金鳞游戏不时修订并公布的《金鳞游戏通行证协议》和其他有关前述账号注册、使用的规范。\n1.2 用户承诺以其真实身份注册成为金鳞游戏的用户，并保证所提供的个人身份资料信息真实、完整、有效，依据法律规定和必备条款约定对所提供的信息承担相应的法律责任。\n1.3 用户以其真实身份注册成为金鳞游戏用户后，需要修改所提供的个人身份资料信息的，金鳞游戏应当及时、有效地为其提供该项服务。\n1.4 用户知悉并同意，在游客模式下可能无法进行游戏充值或消费。且一旦用户卸载或重装游戏，或用户更换手机、电脑等终端设备或该等终端设备损坏的，用户在该游客模式下所有游戏相关数据可能都将会被清空，且无法查询和恢复。如因此造成用户任何损失的，均由用户自行承担。\n1.5如用户使用金鳞游戏认可的第三方账号作为游戏账号使用和享受游戏的，用户还应遵守有关该第三方账号的协议、规则，且因该第三方账号产生的相关问题包括但不限于被盗等，用户应自行联系该第三方进行解决，金鳞游戏可视情况提供相应的协助。\n \n2.用户账号使用与保管\n2.1 根据必备条款的约定，金鳞游戏有权审查用户注册所提供的身份信息是否真实、有效，并且为判断或核实用户提供的相关实名注册信息是否真实或有效，金鳞游戏有权将用户提供的实名注册信息提供给第三方进行整理、保存及比对等处理。\n金鳞游戏将积极地采取技术与管理等合理措施保障用户账号的安全、有效，用户亦有义务妥善保管其账号及密码，并正确、安全地使用其账号及密码。任何一方未尽上述义务导致账号密码遗失、账号被盗等情形而给用户和他人的民事权利造成损害的，应当承担由此产生的法律责任。\n2.2用户对登录后所持账号产生的行为依法享有权利和承担责任。\n2.3 用户发现其账号或密码被他人非法使用或有使用异常的情况的，应及时根据金鳞游戏公布的处理方式通知金鳞游戏，并有权通知金鳞游戏需要采取的措施。\n2.4 金鳞游戏根据用户的要求或结合具体情况采取相应措施（包括但不限于暂停该账号的登录和使用等），金鳞游戏应当要求用户提供并核实与其注册身份信息相一致的个人有效身份信息。\n2.4.1 金鳞游戏核实用户所提供的个人有效身份信息与所注册的身份信息相一致的，应当及时采取相应措施（包括但不限于暂停该账号的登录和使用等）。\n2.4.2 金鳞游戏违反2.4.1款项的约定，未及时采取措施暂停用户账号的登录和使用，因此而给用户造成损失的，应当承担其相应的法律责任。\n2.4.3 用户没有提供其个人有效身份证件或者用户提供的个人有效身份证件与所注册的身份信息不一致的，金鳞游戏有权拒绝用户上述请求，因此造成用户损失的，由用户自行承担。\n2.5 用户为了维护其合法权益，向金鳞游戏提供与所注册的身份信息相一致的个人有效身份信息时，金鳞游戏应当为用户提供账号注册人证明、原始注册信息等必要的协助和支持，并根据需要向有关行政机关和司法机关提供相关证据信息资料。\n2.6 金鳞游戏会按照国家相关要求将用户的实名注册信息运用于防沉迷系统之中，即金鳞游戏可能会根据用户的实名注册信息判断用户是否年满18周岁、用户提交的实名身份信息是否规范或实名验证是否通过等，从而决定是否对用户的游戏账号予以防沉迷限制。\n2.7用户知悉并同意，出现以下情形之一的，金鳞游戏有权将用户的游戏账号纳入相应的防沉迷系统，采取相应的防沉迷措施：\n2.7.1系统判断用户未满18周岁的；或\n2.7.2用户提交的实名身份信息不规范的；或\n2.7.3用户实名验证未通过的；或\n2.7.4游客模式登录的；或\n2.7.5其他国家法律法规政策要求或金鳞游戏有合理理由认为需要纳入防沉迷系统的情形的。\n2.8 对纳入相应防沉迷系统的游戏账号，金鳞游戏有权依据国家有关法律法规及政策规定、本协议其他条款规定或根据用户法定监护人的合理要求采取以下一种或多种措施：\n2.8.1将与用户游戏相关的信息（包括但不限于用户游戏账号的登录信息、充值流水信息等）提供给用户的法定监护人，使得用户法定监护人可及时或同步了解用户游戏情况；\n2.8.2限制用户游戏账号的消费额度；\n2.8.3采取技术措施屏蔽某些游戏或游戏的某些功能，或限定用户游戏时间或游戏时长；\n2.8.4注销或删除用户游戏账号及游戏数据等相关信息；\n2.8.5用户法定监护人要求采取的，或金鳞游戏认为可采取的其他合理措施，以限制或禁止用户使用游戏；\n2.8.6国家法律法规或政策要求的相关措施。\n3.服务的中止与终止\n3.1用户有发布违法信息、严重违背社会公德、以及其他违反法律禁止性规定的行为，金鳞游戏应当立即终止对用户提供服务。\n3.2用户在接受金鳞游戏服务时实施不正当行为的，金鳞游戏有权终止对用户提供服务。该不正当行为的具体情形应当在本协议中有明确约定或属于金鳞游戏事先明确告知的应被终止服务的禁止性行为，否则，金鳞游戏不得终止对用户提供服务。\n3.3用户提供虚假注册身份信息，或实施违反本协议的行为，金鳞游戏有权中止对用户提供全部或部分服务；金鳞游戏采取中止措施应当通知用户并告知中止期间，中止期间应该是合理的，中止期间届满金鳞游戏应当及时恢复对用户的服务。\n3.4 金鳞游戏根据本条约定中止或终止对用户提供部分或全部服务的，金鳞游戏应负举证责任。\n4.用户信息收集、使用及保护\n4.1 用户同意并授权金鳞游戏为履行本协议之目的收集用户的信息，这些信息包括用户在实名注册系统中注册的信息、游戏账号下的游戏数据以及其他用户在使用游戏及相关服务的过程中向金鳞游戏提供或金鳞游戏基于安全、用户体验优化等考虑而需收集的信息，金蚕对用户信息的收集将遵循本协议及相关法律的规定。\n4.2 用户理解并同意：为了更好地向用户提供游戏服务，改善游戏体验，金鳞游戏可对用户作为游戏账号的金鳞游戏通行证以及金鳞游戏认可的其他账号（包括该等账号中的昵称、头像，以及好友关系）以及在游戏中的相关操作信息、游戏信息等信息（以下称“该等信息”。该等信息具体包括但不限于用户的登录状态、对战信息/状态、成就信息等）进行使用，并可向用户本人或其他用户或好友展示该等信息。\n4.3 用户应对通过游戏及相关服务了解、接收或可接触到的包括但不限于其他用户在内的任何人的个人信息予以充分尊重，用户不应以搜集、复制、存储、传播或以其他任何方式使用其他用户的个人信息，否则，由此产生的后果由用户自行承担。\n4.4保护用户信息及隐私是金鳞游戏的一项基本原则。除本协议另有规定外，游戏服务对用户信息收集、使用及保护等将遵循《金鳞游戏隐私保护政策》等协议规定。除法律另有规定外，如用户已同意或授权金鳞游戏依据前述协议或规定收集、使用或处理涉及用户的个人信息的，在用户撤回该同意或授权后，不影响金鳞游戏在此之前已基于用户的同意或授权所进行的个人信息的收集、使用或处理，金鳞游戏对此前相关个人信息收集、使用或处理继续有效。\n \n第四部分 主要条款\n \n1. 权利的许可\n1.1在用户遵守本协议及相关法律法规的前提下，金鳞游戏给予用户一项个人的、不可转让及非排他性的许可，以使用游戏服务。用户仅可为非商业目的使用游戏服务，包括：\n1.1.1 接收、下载、安装、启动、升级、登录、显示、运行和/或截屏游戏；\n1.1.2创建游戏角色，设置网名，查阅游戏规则、用户个人资料、游戏对局结果，开设游戏房间、设置游戏参数，在游戏中购买、使用游戏道具、游戏装备、游戏币等，使用聊天功能、社交分享功能；\n1.1.3使用游戏支持并允许的其他某一项或几项功能。\n1.2用户在使用游戏服务过程中不得未经金鳞游戏许可以任何方式录制、直播或向他人传播游戏内容，包括但不限于不得利用任何第三方软件进行网络直播、传播等。\n2. 账号的维护\n2.1 账号责任\n2.1.1若用户所提供的资料与事实不符或所提供的资料已变更而未更新或有任何误导之嫌导致金鳞游戏无法为用户提供或进一步提供服务，金鳞游戏不因此承担任何责任。\n2.1.2鉴于网络服务的特殊性，金鳞游戏无义务审核是否用户本人使用该组账号及密码，仅审核账号及密码是否与数据库中保存的一致，只要任何人输入的账号及密码与数据库中保存的一致，即可凭借该组账号及密码登陆游戏，所以即使用户认为其所有的账号登陆游戏的行为并非其本人所为，金鳞游戏将不承担因此而产生的任何责任。\n2.2 禁止转让\n游戏的用户账号的使用权属于最先注册人，任何用户不得以任何形式转让（包括但不限于买卖、赠与、互易、租赁、继承等）用户账号或密码。如果金鳞游戏发现使用者并非账号最先注册人，金鳞游戏可以不经通知该账户使用人而直接回收该账号，同时不承担任何由此产生的法律责任，用户违反本条款规定而遭致的任何损失均由用户自行承担。\n2.3 账号更新\n金鳞游戏在为用户提供相关服务的前提是用户能表明用户是账号的使用权人，这必须用户提供经金鳞游戏认可有效的相关信息（包括但不限于注册信息、历史密码等），如果用户没有牢记自己填写的注册资料及相关历史信息或未及时更新相关注册资料，用户的相关问题（包括但不限于密码找回等）将得不到解决，用户应当自行承担相应损失。\n3. 行为的禁止\n3.1 禁止用户进行以下侵害本游戏公平性的行为，包括但不限于：\n3.1.1 利用反向工程、编译或反向编译、反汇编等技术手段制作软件对游戏进行分析、修改、攻击，最终达到作弊的目的；\n3.1.2 使用任何外挂程序或游戏修改程序（本协议所称“外挂程序”是指独立于游戏软件之外的，能够在游戏运行的同时影响游戏操作的所有程序，包括但不限于模拟键盘鼠标操作、改变操作环境、修改数据等一切类型。如国家有管法律、法规及政府主管部门的规章或规范性文件规定的外挂定义与本协议有冲突，则以法律、法规、部门规章或规范性文件规定的为准），对本游戏软件进行还原工程、编译、译码或修改，包括但不限于修改本软件所使用的任何专有通讯协议、对动态随机存取内存（RAM）中资料进行修改或锁定；\n3.1.3使用游戏同步器（具体包括但不限于使用键盘、鼠标等硬件同步器，以便可以使用一套键盘、鼠标，同时、同步控制多台电脑进行游戏的行为），以及使用其他各种可以让用户在游戏效率或收益数据上表现异常的硬件（包括但不限于“连点器”等，以下统称“作弊硬件”）\n3.1.4 使用异常的方法登录游戏、使用网络加速器等外挂软件或机器人程式等恶意破坏服务设施、扰乱正常服务秩序的行为；\n3.1.5 制作、传播或使用外挂、封包、加速软件，及其它各种作弊程序，或组织、教唆他人使用此类软件程序，或销售此类软件程序而为私人或组织谋取经济利益；\n3.1.6 使用任何方式或方法，试图攻击提供游戏服务的相关服务器、路由器、交换机以及其他设备，以达到非法获得或修改未经授权的数据资料、影响正常游戏服务，以及其他危害性目的的任何行为；\n3.1.7 利用游戏系统可能存在的技术缺陷或漏洞而以各种形式为自己及他人牟利（包括但不限于复制游戏中的虚拟物品等）。\n3.2 禁止用户进行以下侵害本游戏合规性的行为，包括但不限于：\n3.2.1 违反宪法确定的基本原则的；\n3.2.2 危害国家统一、主权和领土完整的；\n3.2.3 泄露国家秘密、危害国家安全或者损害国家荣誉和利益的；\n3.2.4 煽动民族仇恨、民族歧视，破坏民族团结，或者侵害民族风俗、习惯的；\n3.2.5 宣扬邪教、迷信的；\n3.2.6 散布谣言，扰乱社会秩序，破坏社会稳定的；\n3.2.7 宣扬淫秽、色情、赌博、非法彩票、暴力，或者教唆犯罪的；\n3.2.8 侮辱、诽谤他人，侵害他人合法权益的；\n3.2.9 违背社会公德的；\n3.2.10 有法律、行政法规和国家规定禁止的其他内容的。\n3.3 禁止用户进行以下侵害本游戏安全性的行为，包括但不限于：\n3.3.1 以任何形式违反游戏管理规则或诚实信用原则，直接或间接采取组织、教唆、窃取、占有、使用、捡取、购买、转卖等手段侵犯任何第三方拥有使用权的账号、角色、虚拟货币、虚拟物品、虚拟道具等权益；\n3.3.2 以任何积极或消极的形式协助他人侵犯第三方权益的；\n3.4 禁止用户利用游戏进行与游戏无关的行为，包括但不限于：\n3.4.1 为任何非法目的及与金鳞游戏提供服务或产品未有直接关系而使用网络服务系统；包括但不限于买卖账号、角色、虚拟货币、虚拟道具、虚拟物品，宣传赌博、非法彩票等；\n3.4.2 未经金鳞游戏授权访问或试图访问和游戏及金鳞游戏提供的相关网络服务相关的任何帐户、计算机或网络；\n3.4.3 未经金鳞游戏授权利用游戏及金鳞游戏提供的相关网络服务以任何方式收集任何其它用户的信息，包括但不限于用户的个人身份信息和通讯信息；\n3.4.4 下载、安装或使用未经金鳞游戏授权开发并正式发布的其它任何由游戏衍生的软件；\n3.4.5 接收或下载由其他游戏用户传输的用户所知道或应当知道不能以此方式合法传播的任何材料；\n3.4.6 利用游戏及金鳞游戏提供的相关网络服务进行任何可能对互联网的正常运转造成不利影响的行为，包括但不限于以任何方式传输含有计算机病毒、破坏性程序的文件或其他任何可能对他人计算机或互联网的正常运转造成不利影响的软件或程序；\n3.4.7 利用游戏及金鳞游戏提供的相关网络服务传输任何骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料；\n3.4.8 利用游戏及金鳞游戏提供的相关网络服务进行任何不利于金鳞游戏的行为；\n3.4.9 就金鳞游戏及合作商业伙伴的服务、产品、业务咨询应采取相应机构提供的沟通渠道，在公众场合发布有关金鳞游戏及相关服务的负面宣传。\n3.5 禁止用户进行以下侵害本游戏知识产权权益的行为，包括但不限于：\n3.5.1复制、翻拷、传播和在网络上陈列本产品的程序、使用手册和其它图文音像资料的全部或部分内容。\n3.5.2 公开展示和播放本产品的全部或部分内容。\n3.5.3 出租本产品于他人。\n3.5.4 对本产品的程序、图像、动画和音乐进行还原、反编译、反汇编、剪辑、翻译和改编等任何修改行为。\n3.5.5 修改或遮盖本产品程序、图像、动画、包装和手册等内容上的产品名称、公司标志、版权信息等内容。\n3.5.6 用户不得对本游戏进行反向工程(Reverse Engineering)、反向编译(Decompile)或反汇编(Disassemble)等任何技术性的与合理使用游戏无关的行为。\n3.5.7 以本产品作为营业使用；\n3.5.8其它违反著作权法、计算机软件保护条例和相关法规的行为。\n4.信息的搜集\n4.1 用户同意在金鳞游戏与第三方合作向用户提供相关网络服务，且该第三方同意承担与金鳞游戏同等的保护用户隐私的责任的情况下，允许金鳞游戏将用户的注册资料等信息提供给该第三方。\n4.2 在不透露单个用户隐私资料的前提下，金鳞游戏有权对整个用户数据库进行技术分析并对已进行分析、整理后的用户数据库进行商业上的利用。尽管金鳞游戏对用户的隐私权保护做了极大的努力，但是仍然不能保证现有的安全技术措施使用户的技术信息等不受任何形式的损失。\n4.3 用户理解并同意，金鳞游戏有权利向用户搜集必要的数据，以了解用户需求，不断提升服务质量。\n5. 信息的发送\n5.1 鉴于双方协议关系的达成，用户同意金鳞游戏有权自主决定定期或不定期的向用户的电子邮箱、手机号码等任何已知的信息媒介发送金鳞游戏判断为对向用户进一步提供服务有积极影响的信息。\n5.2 金鳞游戏的服务或产品上可能刊登商业广告、或其它活动促销的广告。这些内容系广告商或商品服务提供者所为，金鳞游戏仅提供刊登内容的媒介。用户通过金鳞游戏或其所链接的网站所购买的服务或商品，其交易行为仅存于用户与该商品或服务的提供者之间，与金鳞游戏无关，金鳞游戏不承担用户与该商品或服务的提供者之间所产生的任何法律责任。\n6. 变更与终止\n6.1 用户在接受金鳞游戏服务时实施不正当行为的，金鳞游戏有权终止对用户提供服务，该不当行为包括但不限于违约、违法、违反公序良俗、侵犯金鳞游戏或任何第三方之权益等。\n6.2 发生下列情形之一时，金鳞游戏有权停止或中断游戏，并且不向任何人承担因此产生的任何责任：\n6.2.1 对于金鳞游戏的网络设备进行必要的保养及施工；\n6.2.2其它合作厂商或相关电信业者网络系统软硬件设备的故障、失灵、或人为操作的疏失而全部或一部分中断、暂时无法使用、迟延或因他人侵入金鳞游戏系统篡改或伪造变造资料等，造成游戏的停止或中断者；\n6.2.3 由于金鳞游戏所用的网络通信设备由于任何原因停止，无法提供服务时；\n6.2.4 由于不可抗力因素致使金鳞游戏无法提供游戏服务；\n6.2.5 在根据用户使用游戏时间和/或道具作为收费项目的情况下，用户连续180天没有上线游戏（包括但不限于虽然上线游戏但只在免费期内游戏或未有消耗），则自第180天当天的24时起，金鳞游戏有权采取措施取消该用户至最后一次游戏当日止账号上剩余的游戏时间和价值，被取消的游戏时间和价值将不予任何补偿。但如果用户在金鳞游戏取消上述游戏时间之日起的1个月内向其用户账号充值人民币30元以上，则该账号除拥有按照金鳞游戏业务公告规定等同于该面额的相应之游戏时间和价值外，金鳞游戏将另外赠送和上述取消措施中该用户被取消的游戏时间相等额的游戏时间或价值。\n6.2.6 用户连续360天没有上线游戏，则自第360天当天的24时起，金鳞游戏有权采取措施删除该用户账号在游戏数据库中的任何纪录（包括但不限于注册信息、角色信息、等级物品信息等）。\n6.2.7 在以用户购买虚拟道具的使用权或者以接受其他增值服务作为收费项目的情况下，如超出该虚拟道具的有效使用期限或增值服务的有效服务期限（不管用户是否已经实际使用或者享受服务），或者超出有效使用或服务次数，金鳞游戏均有权采取措施取消用户对上述虚拟道具的使用权或者取消继续提供增值服务。上述虚拟道具的使用权以及增值服务的具体收费标准均由金鳞游戏在其相关网站上颁布，用户有义务在选择前仔细阅读并确认理解，一旦用户选择购买相关虚拟道具使用权或者接受相关服务，则表明用户已经充分理解上述虚拟道具使用权或者相关增值服务的具体收费标准，并接受其价格。\n特别的，用户在此同意，任何标注为“永久性”、“长期性”“持续性”使用等类似描述的虚拟道具及其服务，其使用期限不得被理解、解释、推理为永远不会停止，应当被理解为其到期期限为金鳞游戏宣布停止游戏的运营之日，金鳞游戏将没有任何义务再继续提高任何后续相关服务，用户亦没有任何权利要求金鳞游戏继续提高该道具或服务或要求金鳞游戏以任何形式补偿、赔偿相关服务或道具。\n6.2.8 收费项目的改变是一种正常的商业行为，用户不得因为收费项目的改变而要求终止本协议。在金鳞游戏收费项目发生改变后，用户按照一种项目预先支付但尚未消费完毕的金额，金鳞游戏有权提供转换方式将上述金额转换成相应能够支付其他收费项目的金额，而用户不能因此而要求终止本协议或返还上述尚未消费完毕的金额。例如金鳞游戏原来采取根据用户使用游戏时间作为收费项目，而用户已经预先支付人民币35元购买120小时游戏时间，在用户实际使用60小时后，金鳞游戏改变收费项目为购买虚拟道具的使用权或者以接受其他增值服务，则金鳞游戏有权将剩余60小时所对应的对价人民币17.5元转换为能够购买相应金额的虚拟道具的使用权或者以接受其他增值服务的金额，用户对此无异议。\n6.3  任何时候（包括但不限于用户正在注册账号或已经在游戏中运行等），如金鳞游戏发现用户在游戏中注册或使用的账号、角色、行会等一切自定义名称与其他用户相同而导致无法识别，金鳞游戏有权要求用户修改上述名称，如用户在金鳞游戏要求的时限内未予修改，则金鳞游戏有权在用户自定义的名称后加注识别符号予以区别以确保游戏正常运行（例如用户希望或正在使用的角色名称为“潇洒”，但在同一组服务器中同样存在另外一个用户角色名为“潇洒”，则在用户不愿意修改名称的情况下，金鳞游戏有权不经用户同意的情况在用户名称后加注识别符号后成为“潇洒1”、“潇洒2”等），用户保证无条件同意上述修改。\n6.4 用户了解并同意，游戏作为一款游戏，必然有全面终止运营的情况发生，金鳞游戏在发生以下情况下会终止运营游戏（1）应政府机关的命令终止运营；（2）游戏软件本身的技术问题导致无法继续运营；（3）金鳞游戏决定停止运营。不管由于任何原因终止运营，金鳞游戏均会提前60日通知用户，用户应依照金鳞游戏指示采取相应措施自行处理游戏账号（包括注销或停止使用该账号）、游戏内虚拟物品等相关事宜。用户不得以任何原因要求金鳞游戏不得全面终止运营。\n7. 安全责任\n7.1用户同意使用金鳞游戏游戏软件是出于用户个人意愿，用户完全凭借于自身的意愿与判断使用了金鳞游戏的产品和服务，金鳞游戏给了用户完全的缔约与否的选择权，基于此用户自负任何风险，用户应自行承担使用执行游戏所有的风险及因此可能致生的损害，包括但不限于其因执行游戏或自行由游戏官方网站下载游戏或资料图片而导致用户或其所使用的计算机系统损害，或发生任何资料的流失等、游戏账号、虚拟货币、虚拟道具的丢失或分散等，用户认可金鳞游戏已经为客户相关的信息数据的安全性依法完全履行了相应义务且金鳞游戏无须再履行任何证明义务，除非可证明的金鳞游戏过错引起了用户且同时亦造成了全部金鳞游戏用户的共同损失的发生，否则用户认可任何损失与金鳞游戏无关。\n7.2金鳞游戏对任何直接、间接、偶然、特殊及继起的损害不负责任，这些损害可能来自：不正当使用网络服务，非法使用网络服务或用户传送的信息有所变动、因违反本协议而承担违约责任等方面。用户明确同意其安装、复制、访问网站、充值、运行客户端软件或以其它方式使用“游戏”及/或接受金鳞游戏提供的相关服务所存在的风险将完全由其自己承担。因其安装、复制、访问网站、充值、运行客户端软件或以其它方式使用“游戏”及/或接受金鳞游戏提供的相关服务而产生的一切后果也由其自己承担，金鳞游戏对用户不承担任何责任。\n7.3 用户应就其在游戏的行为或活动自负责任，金鳞游戏仅提供游戏予用户自行执行或与其它用户依照游戏设定的方式进行竞赛或游戏。考虑到网络的复杂性和特殊性、虚拟物品与现实财产之间的交易存在巨大风险（包括但不限于虚拟物品因系复制物品而可被删除、国家法律对虚拟物品的价值认定存在空白等），金鳞游戏在此提醒用户须特别慎重对待游戏的行为或活动或交易，金鳞游戏申明对用户在游戏的行为或活动或交易不负任何责任。在任何情况下，用户不得以从其他用户处获得虚拟物品或货币所付出的真实货币或财物金额要求金鳞游戏赔偿。\n7.4 若用户发现其使用的账号或密码遭他人非法使用或有异常使用的情形，应立即通知金鳞游戏并寻求可能的帮助，但前提条件是用户有义务提交国家有权机关出具的明确要求金鳞游戏采取针对其它账号、角色、虚拟货币、虚拟道具、虚拟装备等进行限制、冻结、删除等任何权利限制的指示，否则鉴于是否用户本人使用其账号、用户权利要求是否正当等难于判断，金鳞游戏在无法确认时将有权拒绝用户相关帮助请求，对此用户同意认同金鳞游戏行为的合理性，放弃此情况下针对金鳞游戏的任何权利诉求，金鳞游戏亦无义务承担任何相关后续损失。\n7.5 若用户发现其使用的账号或密码遭他人非法使用或有异常使用的情形，有可能通知金鳞游戏并寻求可能的帮助，要求金鳞游戏采取针对任何用户的账号、角色、虚拟货币、虚拟道具、虚拟装备等进行限制、冻结、删除等任何权利限制，金鳞游戏基于正常运营之需，有权利根据用户或国家有权机关指示，对特定用户的相关权利进行限制、取消，对此权利受到影响的用户应当同意认同金鳞游戏行为的合理性，放弃此情况下针对金鳞游戏的任何权利诉求，金鳞游戏亦无义务承担任何相关后续损失，金鳞游戏可根据情况为用户之间的相关争议处理作出协助。\n7.6 拒绝提供担保。\n用户个人对网络服务的使用承担风险。金鳞游戏对以下事宜不作任何类型的担保，不论是明确的或隐含的：\n本协议项下的“游戏”及金鳞游戏提供的相关服务将符合用户的要求；\n本协议项下的“游戏”及金鳞游戏提供的相关服务将不受不可抗力、计算机病毒、黑客攻击、系统不稳定、用户所在位置、用户关机、电信部门原因及其他任何网络、技术、通信线路等外界或人为因素的影响；\n安装、复制、访问网站、充值、运行客户端软件或以其它方式使用“游戏”及/或接受金鳞游戏提供的相关服务与任何其他软件不存在任何冲突；\n通过金鳞游戏网站、游戏官方网站及其他相关网络上的链接和标签所指向的第三方的商业信誉及其提供服务的质量。\n7.7 链接\n金鳞游戏在其游戏官方网站的所有网页上所提供的所有链接，可能链接到其它个人、公司或组织的网站，提供该等网站的目的，是便利用户自行搜寻或取得信息，金鳞游戏对于被链接的个人、公司或组织的网站所提供的产品、服务或信息，不担保其真实性、完整性、实时性或可信度。金鳞游戏不承担用户与该等网站之间产生的任何法律责任。\n7.8 强制对战\n如果用户选择进入能够进行自由对战的服务器，视为用户同意在该游戏区中进行自由对战，并同意遵守自由对战的游戏规则。\n7.9 金鳞游戏下载器\n每个用户在安装游戏客户端时，一旦选择“使用下载器免维护自动更新功能”，即视为用户同意安装并使用金鳞游戏下载器，为用户提供免费增值服务，包括但不限于提供金鳞游戏其他游戏客户端、自动更新并安装游戏最新版本、广告促销信息。\n8. 违约责任\n8.1 用户同意保障和维护金鳞游戏及其他用户的利益，如因用户违反有关法律、法规或本协议项下的任何条款而给金鳞游戏造成损害，用户同意承担由此造成的损害赔偿责任，该等责任包括但不限于给金鳞游戏造成的任何直接或间接损失。\n8.2 因用户违反有关法律、法规或本协议项下的任何条款导致任何第三方向金鳞游戏主张任何索赔、要求或损失的，用户同意赔偿金鳞游戏由此产生的任何直接或间接损失。\n8.3因用户违反本协议约定之任意内容时，包括但不限于金鳞游戏通过内部的监测程序发现或经其他用户举报而发现用户有可能或已出现违约、违法、违反公序良俗、侵犯任何一方权益时，则金鳞游戏有权采取如下措施：包括但不限于限制用户账号和游戏中角色的登陆、限制用户在游戏中的活动、删除与账号或角色相关的虚拟货币及虚拟物品、删除用户的账号和要求用户赔偿因用户从事上述行为而给金鳞游戏造成的损失（包括但不限于人力成本损失、运营成本损失、商誉损失、维权损失等）、单方面解除本协议、要求用户支付违约金（违约金应当与用户账号和角色内的全部款项相等），用户在此明确同意承担上述违约责任。\n8.4 赔偿责任的排除及限制\n金鳞游戏对于用户使用游戏或无法使用游戏所致生的任何直接、间接、衍生的损害或所失利益不负任何损害赔偿责任。若依法无法完全排除损害赔偿责任时，用户认可虚拟物品价值无法确定的虚拟性，并不得以账号或账号内虚拟物品或者用户使用金鳞游戏服务所投入的现金款项等作为赔偿标准，且在任何时候金鳞游戏应当承担的责任，均不得超过现存虚拟物品的实际价值，亦仅限于金鳞游戏过错引起的直接的金钱利益损失。\n9. 争议解决\n9.1 本协议的订立、履行、解释及争议的解决均应适用中国法律。\n9.2本协议的订立、履行、解释及争议的解决均应以金鳞游戏所提供之任何形式之电子数据、书面数据等相关内容为准，用户在此确认该等数据的准确性、有效性、合法性。\n9.3如各方就本协议内容或其执行发生任何争议，应尽量友好协商解决；协商不成时，任何一方均应提交上海仲裁委员会，按照申请仲裁时该会现行有效的仲裁规则进行仲裁。\n10. 通知和送达。本协议项下金鳞游戏的所有通知均可通过页面公告、电子邮件或常规的信件传送、页面弹窗等方式进行；该等通知以上述任何一种形式发送之日视为已送达用户。\n \n \n金鳞游戏 \n \n2022年9月11日\n";
this.label_wordRex = /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]+|\S)/;
this.label_symbolRex = /^[!,.:;'}\]%\?>、‘“》？。，！]/;
this.label_lastWordRex = /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]+|\S)$/;
this.label_lastEnglish = /[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]+$/;
this.label_firstEnglish = /^[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]/;
this.label_firstEmoji = /^[\uD83C\uDF00-\uDFFF\uDC00-\uDE4F]/;
this.label_lastEmoji = /([\uDF00-\uDFFF\uDC00-\uDE4F]+|\S)$/;
this.label_wrapinspection = !0;
this.__CHINESE_REG = /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/;
this.__JAPANESE_REG = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
this.__KOREAN_REG = /^[\u1100-\u11FF]|[\u3130-\u318F]|[\uA960-\uA97F]|[\uAC00-\uD7AF]|[\uD7B0-\uD7FF]+$/;
this.clickyh();
},
clickys: function() {
var t = this.toarr(this.ysstr, 400, 20);
this.refreshtable(t);
},
clickyh: function() {
var t = this.toarr(this.yhstr, 400, 20);
this.refreshtable(t);
},
refreshtable: function(t) {
this.tableview.getComponent("tableView").initTableView(t.length, {
array: t,
target: this
});
},
initdata: function(t) {
this.okcb = t;
},
setmode2: function() {
this.lb_tongyi.string = "关闭";
this.nd_no.active = !1;
},
clickok: function() {
this.okcb && this.okcb();
this.node.destroy();
},
clickno: function() {
i.endgame();
},
measureText: function(t, e) {
for (var i = t.length, s = 0, n = 0; n < i; n++) this.label_firstEnglish.test(t[n]) ? s += e / 2 : s += e;
return s;
},
toarr: function(t, e, i) {
for (var s = t.split("\n"), n = [], a = 0; a < s.length; a++) for (var o = this.toarrone(s[a], e, i), c = o.length, r = 0; r < c; r++) n.push(o[r]);
return n;
},
toarrone: function(t, e, i) {
var s = [];
if (0 === t.length || e < 0) {
s.push("");
return s;
}
for (var n = t.length, a = 0, o = 0; o < n; o++) this.label_firstEnglish.test(t[o]) ? a += i / 2 : a += i;
for (;a > e && t.length > 1; ) {
for (var c = t.length * (e / a) | 0, r = t.substr(c), l = a - this.measureText(r, i), h = r, p = 0, d = 0; l > e && d++ < 10; ) {
c *= e / l;
c |= 0;
r = t.substr(c);
l = a - this.measureText(r, i);
}
d = 0;
for (;l <= e && d++ < 10; ) {
if (r) {
var u = this.label_wordRex.exec(r);
p = u ? u[0].length : 1;
h = r;
}
c += p;
r = t.substr(c);
l = a - this.measureText(r, i);
}
if (0 == (c -= p)) {
c = 1;
h = h.substr(1);
}
var f, g = t.substr(0, c);
if (this.label_wrapinspection && this.label_symbolRex.test(h || r)) {
0 == (c -= (f = this.label_lastWordRex.exec(g)) ? f[0].length : 0) && (c = 1);
h = t.substr(c);
g = t.substr(0, c);
}
if (this.label_firstEmoji.test(h) && (f = this.label_lastEmoji.exec(g)) && g !== f[0]) {
c -= f[0].length;
h = t.substr(c);
g = t.substr(0, c);
}
if (this.label_firstEnglish.test(h) && (f = this.label_lastEnglish.exec(g)) && g !== f[0]) {
c -= f[0].length;
h = t.substr(c);
g = t.substr(0, c);
}
0 === s.length ? s.push(g) : (g = g.trim()).length > 0 && s.push(g);
t = h || r;
a = this.measureText(t, i);
}
0 === s.length ? s.push(t) : (t = t.trim()).length > 0 && s.push(t);
return s;
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
uizuobi: [ function(t, e) {
"use strict";
cc._RF.push(e, "c91a4DR2K9O56bluO1q5w+6", "uizuobi");
t("Utils");
cc.Class({
extends: cc.Component,
properties: {
editbox: {
default: null,
type: cc.EditBox
}
},
start: function() {},
send: function() {
var t = this.editbox.string.split(" "), e = t[0];
if ("setlv" == e) {
cc.playerData.player.lv = Number(t[1]);
cc.playerData.player.resetbp();
} else if ("additem" == e) {
var i = Number(t[1]), s = Number(t[2]);
s || (s = 1);
for (var n = 0; n < s; n++) cc.playerData.additembyid(i, 1, !0);
} else if ("addpet" == e) {
var a = Number(t[1]), o = Number(t[2]), c = Number(t[3]);
cc.playerData.catchpet(a, o, c);
} else if ("all" == e) {
cc.playerData.allitem();
cc.playerData.allpet();
cc.playerData.stage = 51;
cc.playerData.stagesy = 51;
cc.playerData.player.lv = 999;
cc.playerData.player.resetbp();
}
},
onclose: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {
Utils: "Utils"
} ],
urlbuilder: [ function(t, e) {
"use strict";
cc._RF.push(e, "a2b30GEGTRBjpOLQAYatG14", "urlbuilder");
e.exports = cc.Class({
__ctor__: function(t) {
this.orginurl = t;
this.baseurl = t;
this.checked = !1;
},
addKV: function(t, e) {
if ("undefined" == typeof e) return this;
this._checkurl();
var i = encodeURIComponent(t) + "=" + encodeURIComponent(e);
this.baseurl += i;
return this;
},
clear: function() {
this.baseurl = this.orginurl;
this.checked = !1;
},
_checkurl: function() {
if (this.checked) this.baseurl += "&"; else {
-1 == this.baseurl.indexOf("?") ? this.baseurl += "?" : this.baseurl += "&";
this.checked = !0;
}
}
});
cc._RF.pop();
}, {} ],
viewCell: [ function(t, e) {
"use strict";
cc._RF.push(e, "d1dfablitpJ5rXHxnkR6CpH", "viewCell");
cc.viewCell = cc.Class({
extends: cc.Component,
properties: {
tableView: {
default: null,
visible: !1
},
_isCellInit_: !1,
_longClicked_: !1
},
_cellAddMethodToNode_: function() {
this.node.clicked = this.clicked.bind(this);
},
_cellAddTouch_: function() {
this.node.on(cc.Node.EventType.TOUCH_START, function() {
if (!0 === this.node.active && 0 !== this.node.opacity && !this._longClicked_) {
this._longClicked_ = !0;
this.scheduleOnce(this._longClicked, 1.5);
}
}, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, function() {
if (this._longClicked_) {
this._longClicked_ = !1;
this.unschedule(this._longClicked);
}
}, this);
this.node.on(cc.Node.EventType.TOUCH_END, function() {
this.clicked();
if (this._longClicked_) {
this._longClicked_ = !1;
this.unschedule(this._longClicked);
}
}, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, function() {
if (this._longClicked_) {
this._longClicked_ = !1;
this.unschedule(this._longClicked);
}
}, this);
},
_cellInit_: function(t) {
this.tableView = t;
if (!this._isCellInit_) {
this._cellAddMethodToNode_();
this._cellAddTouch_();
this._isCellInit_ = !0;
}
},
_longClicked: function() {
this._longClicked_ = !1;
this.node.emit(cc.Node.EventType.TOUCH_CANCEL);
this.longClicked();
},
longClicked: function() {},
clicked: function() {},
init: function() {}
});
cc._RF.pop();
}, {} ],
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
wxVoice: [ function(t, e) {
"use strict";
cc._RF.push(e, "318b8IV5lJAza+Q8i8CY7X1", "wxVoice");
var i = new (cc.Class({
init: function() {},
onclicksound: function() {
cc.notSound = !cc.notSound;
cc.notSound ? cc.audioEngine.setMusicVolume(0) : cc.audioEngine.setMusicVolume(1);
},
playSound: function(t, e) {
null == t || cc.notSound || this.playSound2(t, e);
},
xiuzhengbgm: function() {
if (this.bgm) {
var t = 1;
cc.notSound && (t = 0);
cc.audioEngine.setMusicVolume(t);
}
},
playbgm: function(t) {
this.bgmurl = t;
var e = this;
cc.resources.load("sounds/" + t, cc.AudioClip, null, function(t, i) {
t || (e.audioID = cc.audioEngine.playMusic(i, !0));
});
},
stopbgm: function() {
cc.audioEngine.stopMusic();
},
playSound2: function(t) {
cc.resources.load("sounds/" + t, cc.AudioClip, null, function(t, e) {
t || cc.audioEngine.playEffect(e, !1);
});
},
adwatching: function() {
this.stopbgm();
this.ading = !0;
},
adwatchover: function() {
this.bgmurl && this.playbgm(this.bgmurl);
this.ading = !1;
}
}))();
i.init();
cc.soundMgr = i;
e.exports = i;
cc._RF.pop();
}, {} ],
wxshow: [ function(t, e) {
"use strict";
cc._RF.push(e, "9a431AO5BNAqaVqZyqlW5kS", "wxshow");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
cc.sys.platform != cc.sys.WECHAT_GAME && (this.node.active = !1);
}
});
cc._RF.pop();
}, {} ],
ysad: [ function(t, e) {
"use strict";
cc._RF.push(e, "6737dmtHNhPe4sh1UwHNTq6", "ysad");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {
sp_icon: {
default: null,
type: cc.Sprite
},
admode: 1,
zhuanbanner: !1
},
onLoad: function() {
this.admode = 1;
},
onclose: function() {
this.node.destroy();
},
onDestroy: function() {
this.bannermode && i.realclosebanner();
},
refresh: function() {
this.needupdate = !1;
this.node.active = !1;
this.time = 0;
var t = this;
i.createyuansheng(function(e) {
console.log("原生广告 success");
t.isValid && t.showadinfo(e);
}, function() {
console.log("原生广告 fail");
if (t.isValid) {
t.bannermode = !0;
i.realbanner();
}
}, 1 == this.admode);
},
start: function() {
this.needupdate = !1;
this.refresh();
},
showadinfo: function(t) {
this.showcb && this.showcb();
this.node.active = !0;
var e = t.pop();
this.adid = e.adId;
this.picarr = [];
if (1 == this.admode) {
if (e.imgUrlList) for (var s = 0; s < e.imgUrlList.length; s++) this.picarr.push(e.imgUrlList[s]);
0 == this.picarr.length && this.picarr.push(e.icon);
} else e.icon ? this.picarr.push(e.icon) : this.picarr.push(e.imgUrlList[0]);
if (this.picarr.length > 0) {
this.needupdate = !0;
this.time = 0;
this.picidx = 0;
}
i.reportadshow(this.adid);
},
onclick: function() {
var t = this;
i.reportadclick(this.adid);
this.scheduleOnce(function() {
t.refresh();
}, 1);
},
update: function(t) {
if (this.needupdate) {
this.time += t;
if (this.time > 5) {
this.time = 0;
this.picidx++;
this.picidx %= this.picarr.length;
var e = this;
cc.loader.load(this.picarr[this.picidx] + "?aaa=aa.jpg", function(t, i) {
!t && e.isValid && (e.sp_icon.spriteFrame = new cc.SpriteFrame(i));
});
}
}
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
ysxieyi: [ function(t, e) {
"use strict";
cc._RF.push(e, "fd55bYFmZZO37MWoxuFAG7U", "ysxieyi");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {
pb_ys: {
default: null,
type: cc.Prefab
},
nd_add: {
default: null,
type: cc.Node
}
},
start: function() {
i.needys() ? this.node.active = !0 : this.node.active = !1;
},
onclick: function() {
var t = cc.instantiate(this.pb_ys);
t.getComponent("uiys").setmode2();
this.nd_add.addChild(t);
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ]
}, {}, [ "cpa", "wxshow", "DonotDestroy", "avatar", "pbxingxiang", "uixingxiang", "cellys", "avatarcfg", "buffcfg", "bulletcfg", "dropcfg", "duihuancfg", "effanicfg", "enumcfg", "fumocfg", "itemcfg", "lootcfg", "monstercfg", "npccfg", "peifangcfg", "petbookcfg", "setcfg", "skillcfg", "skincfg", "stagecfg", "talentcfg", "debugbox", "bulletdisplay", "dmglb", "frameani", "gameManager", "gameUI", "gameloot", "gamenewbie", "moveprefab", "pbautotile", "pbbufficon", "pbdrop", "pbwarning", "playerctrl", "tileset", "weapondisplay", "followweapon", "gameres", "Joystick", "JoystickBG", "JoystickCommon", "buffobj", "bulletobj", "dragonobj", "dropobj", "gameai", "gamelogic", "gamevaule", "lootobj", "npcobj", "skillobj", "battlestates", "statemachine", "gameConfig", "luping", "atlasmgr", "charobj", "equipobj", "itemobj", "petobj", "talentobj", "playerData", "sceneguaji", "addbanner", "addchaping", "delayshow", "hideyuansheng", "hutui9gong", "hutuibanner", "tianjiazhuomian", "ysad", "SDKManage", "sdkanzhuo", "sdkhuawei", "sdkoppo", "sdkvivo", "sdkwx", "sdkzj", "syshow", "tips", "CCActionAdd", "Notifier", "Utils", "httpcli", "httpclient", "notification", "signals", "storage", "urlbuilder", "perlinnoise", "quadtree", "tableView", "viewCell", "testmove", "wxVoice", "UILogin", "UIPetChose", "cellbag", "cellequipskill", "cellfm", "cellhc", "celllearnskill", "cellpet", "cellpetbook", "cellshop", "cellstage", "messagebox", "pbjiadian", "skillpet", "uiMain", "uiRole", "uiadhouse", "uibag", "uibank", "uiduihuan", "uiequipskill", "uifm", "uihc", "uiitemdetail", "uijiadian", "uilearnskill", "uinormalitem", "uinpc", "uipet", "uipetbook", "uiplayerctrl", "uisetting", "uishop", "uiskillicon", "uistage", "uistart", "uitiejiang", "uiHelper", "uiys", "uizuobi", "ysxieyi", "test2", "testview" ]);