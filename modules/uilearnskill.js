uilearnskill: [ function(t, e) {
"use strict";
cc._RF.push(e, "c52c9tKA5hIDLM4zQfgfejA", "uilearnskill");
var i = [ 201, 202, 203, 204, 205, 206, 207, 208, 209 ];
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
}
},
initdata: function(t) {
this.pet = t;
for (var e = [], s = 0; s < i.length; s++) e.push(i[s]);
for (s = 0; s < cc.playerData.petskills.length; s++) e.push(cc.playerData.petskills[s]);
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
