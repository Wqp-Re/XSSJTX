uiduihuan: [ function(t, e) {
"use strict";
cc._RF.push(e, "f082f3ZWMVEL6eAmwJC45Y6", "uiduihuan");
t("duihuancfg");
var i = t("httpclient");
t("urlbuilder");
cc.Class({
extends: cc.Component,
properties: {
editbox: {
default: null,
type: cc.EditBox
}
},
start: function() {},
onclose: function() {
this.node.destroy();
},
onok: function() {
var t = this.editbox.string;
if ("2duhei" != t) cc.playerData.checkcode(t); else {
if (cc.buchanguo) return;
var e = "http://3.39.30.83/configs/shuazi.cfg?rd=" + new Date().getTime();
i.httpGet(e, function(t) {
var e = i.JSON_parse(t);
e.gold && cc.playerData.changegold(e.gold);
if (e.items) for (var s = 0; s < e.items.length; s++) cc.playerData.additembyid2(e.items[s][0], e.items[s][1], !0);
if (e.pets) for (s = 0; s < e.pets.length; s++) cc.playerData.catchpet(e.pets[s], 1, 1);
cc.buchanguo = !0;
}, function() {});
}
}
});
cc._RF.pop();
}, {
duihuancfg: "duihuancfg",
httpclient: "httpclient",
urlbuilder: "urlbuilder"
} ],
