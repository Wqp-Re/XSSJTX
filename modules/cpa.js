cpa: [ function(t, e) {
"use strict";
cc._RF.push(e, "9704dfNwxBEdbresAveeuf0", "cpa");
cc.cpadatas = [ {
appid: "wxc38670e277cd0eb4",
icon: "cpa3",
name: "像素放置英雄"
}, {
appid: "wxc38670e277cd0eb4",
icon: "cpa3",
name: "像素放置英雄"
}, {
appid: "wxc252d809309c0363",
icon: "cpa2",
name: "毛哈吃鸡大作战"
}, {
appid: "wxc38670e277cd0eb4",
icon: "cpa3",
name: "像素挂机探险"
}, {
appid: "wxc38670e277cd0eb4",
icon: "cpa3",
name: "像素放置英雄"
}, {
appid: "wxc252d809309c0363",
icon: "cpa2",
name: "毛哈吃鸡大作战"
}, {
appid: "wxc38670e277cd0eb4",
icon: "cpa3",
name: "像素放置英雄"
}, {
appid: "wxc38670e277cd0eb4",
icon: "cpa3",
name: "像素放置英雄"
}, {
appid: "wxc252d809309c0363",
icon: "cpa2",
name: "毛哈吃鸡大作战"
} ];
cc.Class({
extends: cc.Component,
properties: {
nd_list: {
default: null,
type: cc.Node
}
},
start: function() {
this.iconnodes = this.nd_list.getChildren();
for (var t = this, e = function(e) {
var i = cc.cpadatas[e];
cc.loader.loadRes("cpas/" + i.icon, cc.SpriteFrame, function(s, n) {
if (!s) {
t.iconnodes[e].getComponent(cc.Sprite).spriteFrame = n;
t.iconnodes[e].getChildByName("lb_name").getComponent(cc.Label).string = i.name;
t.iconnodes[e].appid = i.appid;
t.iconnodes[e].appicon = i.icon;
t.iconnodes[e].on(cc.Node.EventType.TOUCH_END, t.ontouch, t);
}
});
}, i = 0; i < 9; i++) e(i);
},
onclose: function() {
this.node.destroy();
},
ontouch: function(t) {
wx.navigateToMiniProgram({
appId: t.target.appid,
path: t.target.appicon
});
}
});
cc._RF.pop();
}, {} ],
