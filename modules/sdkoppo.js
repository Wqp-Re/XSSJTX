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
