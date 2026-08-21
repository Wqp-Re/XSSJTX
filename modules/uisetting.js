uisetting: [ function(t, e) {
"use strict";
cc._RF.push(e, "3c225Bks5FNsqDb76o/cNg0", "uisetting");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {
tg_sound: {
default: null,
type: cc.Toggle
},
tg_ani: {
default: null,
type: cc.Toggle
},
tg_dmg: {
default: null,
type: cc.Toggle
},
tg_autosell: {
default: null,
type: cc.Toggle
}
},
onLoad: function() {
this.tg_sound.isChecked = !cc.notSound;
this.tg_ani.isChecked = !cc.notani;
this.tg_dmg.isChecked = !cc.nodmglb;
this.tg_autosell.isChecked = cc.autosell;
},
clicksound: function() {
cc.soundMgr.onclicksound();
},
clickani: function() {
cc.notani = !cc.notani;
},
clickdmg: function() {
cc.nodmglb = !cc.nodmglb;
},
clicksell: function() {
cc.autosell = !cc.autosell;
},
close: function() {
this.node.destroy();
},
cloudsave: function() {
var t = cc.playerData.savedata();
t && i.savecloud(t);
},
cloudload: function() {
i.loadcloud();
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
