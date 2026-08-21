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
