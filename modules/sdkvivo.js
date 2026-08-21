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
