uiequipskill: [ function(t, e) {
"use strict";
cc._RF.push(e, "623bfDuCJFI5ZoWpbcEy6Dj", "uiequipskill");
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
}
},
initdata: function(t) {
this.skillidx = t;
var e = cc.playerData.player.lskillarr;
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(e.length, {
array: e,
target: this
});
},
close: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
