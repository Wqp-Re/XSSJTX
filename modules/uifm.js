uifm: [ function(t, e) {
"use strict";
cc._RF.push(e, "3232fPSkbdBLJTp1TNJTWIN", "uifm");
t("fumocfg");
var i = [ 1006, 1012, 1018, 1024 ];
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
}
},
onLoad: function() {
cc.Notifier.on("refreshequip", this, this.refresh.bind(this));
},
onDestroy: function() {
cc.Notifier.off("refreshequip", this, this.refresh.bind(this));
},
start: function() {
for (var t = i[Math.min(3, Math.floor(cc.playerData.player.lv / 20))], e = [], s = 1001; s <= t; s++) e.push(s);
for (s = 0; s < cc.playerData.fmarr.length; s++) e.push(cc.playerData.fmarr[s]);
this.fmarr = e;
this.refresh();
},
refresh: function() {
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(this.fmarr.length, {
array: this.fmarr,
target: this
});
},
close: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {
fumocfg: "fumocfg"
} ],
