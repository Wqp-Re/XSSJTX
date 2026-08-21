uiHelper: [ function(t, e) {
"use strict";
cc._RF.push(e, "8d933xtnopKwLbpTfVmSCmV", "uiHelper");
cc.Class({
extends: cc.Component,
properties: {
pb_tips: {
default: null,
type: cc.Prefab
},
pb_msg: {
default: null,
type: cc.Prefab
}
},
start: function() {
this.loadingCount = 0;
cc.uiHelper = this;
this.tipsarr = [];
this.tipnode = this.node.getChildByName("tipnode");
},
ColorTo_RGB: function(t) {
var e = 255 & t, i = 65280 & t;
i >>= 8;
var s = 16711680 & t;
s >>= 16;
return cc.color(e, i, s, 255);
},
showTips: function(t, e, i, s) {
var n = this.tipsarr.length > 0 ? this.tipsarr.pop() : cc.instantiate(this.pb_tips);
this.tipnode.addChild(n, 999);
n.getComponent("tips").initdata(t, e, i, s);
},
showLoading: function() {
this.loadingCount++;
if (null == this.loadUI) {
this.loadUI = cc.instantiate(this.pb_loadmask);
cc.find("DonotDestroy").addChild(this.loadUI);
}
this.loadUI.active = !0;
},
hideLoading: function() {
this.loadingCount--;
0 == this.loadingCount && this.loadUI && (this.loadUI.active = !1);
},
messageBox: function(t, e, i, s, n) {
if (!cc.msgpb) {
var a = cc.instantiate(this.pb_msg);
a.x = a.y = 0;
a.getComponent("messagebox").initdata(t, e, i, s);
n || (n = this.node);
n.addChild(a, 998);
cc.msgpb = a;
}
}
});
cc._RF.pop();
}, {} ],
