uijiadian: [ function(t, e) {
"use strict";
cc._RF.push(e, "20212kXLqhB1IzTroWPKBYc", "uijiadian");
var i = t("enumcfg").enumproperty;
cc.Class({
extends: cc.Component,
properties: {
pb_jiadian: {
default: null,
type: cc.Prefab
},
nd_bp: {
default: null,
type: cc.Node
},
lb_bp: {
default: null,
type: cc.Label
},
nd_newbie: {
default: null,
type: cc.Node
}
},
start: function() {
var t = cc.playerData.player, e = 1 == t.lv && t.bppoint > 0 && 0 == t.zhuanshen;
this.nd_newbie.active = e;
this.leftpoint = cc.playerData.player.bppoint;
this.savepoint = this.leftpoint;
this.bparr = [];
for (var s = i, n = [ s.vit, s.str, s.dex, s.agi, s.int, s.luk ], a = 0; a < 6; a++) {
var o = cc.instantiate(this.pb_jiadian), c = o.getComponent("pbjiadian");
c.initdata(n[a], this);
this.bparr.push(c);
this.nd_bp.addChild(o);
}
this.refreshpoint();
},
refreshpoint: function() {
this.lb_bp.string = "剩余点数:" + this.leftpoint;
},
cliclok: function() {
for (var t = [], e = 0; e < this.bparr.length; e++) t.push(this.bparr[e].nowcount);
cc.playerData.player.jiaidan(t);
cc.Notifier.emit("refreshequip");
this.node.destroy();
},
clickno: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {
enumcfg: "enumcfg"
} ],
