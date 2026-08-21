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
