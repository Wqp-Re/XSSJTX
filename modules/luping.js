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
