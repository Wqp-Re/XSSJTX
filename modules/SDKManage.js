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
