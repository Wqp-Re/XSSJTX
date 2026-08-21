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
