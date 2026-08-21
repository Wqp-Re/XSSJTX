uizuobi: [ function(t, e) {
"use strict";
cc._RF.push(e, "c91a4DR2K9O56bluO1q5w+6", "uizuobi");
t("Utils");
cc.Class({
extends: cc.Component,
properties: {
editbox: {
default: null,
type: cc.EditBox
}
},
start: function() {},
send: function() {
var t = this.editbox.string.split(" "), e = t[0];
if ("setlv" == e) {
cc.playerData.player.lv = Number(t[1]);
cc.playerData.player.resetbp();
} else if ("additem" == e) {
var i = Number(t[1]), s = Number(t[2]);
s || (s = 1);
for (var n = 0; n < s; n++) cc.playerData.additembyid(i, 1, !0);
} else if ("addpet" == e) {
var a = Number(t[1]), o = Number(t[2]), c = Number(t[3]);
cc.playerData.catchpet(a, o, c);
} else if ("all" == e) {
cc.playerData.allitem();
cc.playerData.allpet();
cc.playerData.stage = 51;
cc.playerData.stagesy = 51;
cc.playerData.player.lv = 999;
cc.playerData.player.resetbp();
}
},
onclose: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {
Utils: "Utils"
} ],
