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
cc.newbiebattle = !t;
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
cc.newbiebattle ? cc.director.loadScene("game") : cc.director.loadScene("main");
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
