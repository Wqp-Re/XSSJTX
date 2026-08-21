UIPetChose: [ function(t, e) {
"use strict";
cc._RF.push(e, "7cbeb8O82RI8bMBHPVql5Lj", "UIPetChose");
var i = t("Utils");
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
}
},
onLoad: function() {
cc.Notifier.on("clickpet", this, this.clickpet.bind(this));
},
onDestroy: function() {
cc.Notifier.off("clickpet", this);
},
clickpet: function(t) {
var e = this;
cc.playerData.battlepet && cc.playerData.battlepet.uuid == t.uuid ? cc.uiHelper.messageBox("下阵", "确定要下阵" + t.name, function() {
cc.playerData.battlepet = null;
cc.Notifier.emit("refreshpet");
e.node.destroy();
}) : cc.uiHelper.messageBox("上阵", "确定要上阵" + t.name, function() {
cc.playerData.equippet(t.uuid);
cc.Notifier.emit("refreshpet");
e.node.destroy();
});
},
close: function() {
this.node.destroy();
},
start: function() {
var t = cc.playerData.petbag;
t = i.arrtoarr(t, 2);
this.nochose = !0;
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(t.length, {
array: t,
target: this
});
}
});
cc._RF.pop();
}, {
Utils: "Utils"
} ],
