uishop: [ function(t, e) {
"use strict";
cc._RF.push(e, "3413crUmFRONrngGSBhpcb7", "uishop");
var i = {
1: [ 30001, [ 30001, 10 ], 10001, 10101, 10201, 20001, 20101, 20201, 20301, 20401 ],
2: [ 38001, 38002, 38003, [ 38001, 10 ], [ 38002, 10 ], [ 38003, 10 ] ],
3: [ 20601, 20602, 20603, 20604, 20605, 20606 ],
101: [ [ 30006, 1, 800 ], [ 31024, 1, 2e3 ], [ 31025, 1, 2e3 ], [ 31026, 1, 2e3 ], [ 10021, 1, 500 ], [ 10217, 1, 500 ], [ 10116, 1, 500 ] ]
};
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
}
},
initdata: function(t) {
t > 100 && (this.ygmode = !0);
var e = i[t];
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
