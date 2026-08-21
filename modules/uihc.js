uihc: [ function(t, e) {
"use strict";
cc._RF.push(e, "e242eWKdsFICa2/aqgN/0Oe", "uihc");
t("gameConfig").peifangcfg;
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
for (var t = [], e = 0; e < cc.playerData.pfarr.length; e++) t.push(cc.playerData.pfarr[e]);
t = t.sort();
this.pfarr = t;
this.refresh();
},
refresh: function() {
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(this.pfarr.length, {
array: this.pfarr,
target: this
});
},
close: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {
gameConfig: "gameConfig"
} ],
