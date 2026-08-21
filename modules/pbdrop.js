pbdrop: [ function(t, e) {
"use strict";
cc._RF.push(e, "004d7WuH+1DOZaKChHK0NmM", "pbdrop");
var i = t("enumcfg").qulitycolor;
cc.Class({
extends: cc.Component,
properties: {
sp_icon: {
default: null,
type: cc.Sprite
},
lb_name: {
default: null,
type: cc.Label
}
},
initdata: function(t) {
this.node.width = this.node.height = 24;
this.blinkmode = !1;
this.node.opacity = 255;
this.node.ctrl = this;
this.sp_icon.spriteFrame = null;
var e = t.itemdata;
this.node.x = t.x;
this.node.y = t.y;
this.itemname = e.cfg.name;
this.itemcolor = i[e.qulity];
this.lb_name.string = this.itemname;
this.lb_name.node.color = this.itemcolor;
this.objuuid = t.uuid;
this.objdata = t;
this.fx = 1;
var s = this;
cc.resources.load("icons/items/" + e.cfg.icon, cc.SpriteFrame, function(t, e) {
t || (s.sp_icon.spriteFrame = e);
});
},
doupdate: function(t) {
this.objdata.life < 10 && (this.blinkmode = !0);
if (this.blinkmode) {
this.node.opacity += 300 * t * this.fx;
this.node.opacity >= 255 ? this.fx = -1 : this.node.opacity <= 100 && (this.fx = 1);
}
}
});
cc._RF.pop();
}, {
enumcfg: "enumcfg"
} ],
