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
