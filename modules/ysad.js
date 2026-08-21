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
