uipetbook: [ function(t, e) {
"use strict";
cc._RF.push(e, "626cez4uJ5A0JY6iQ+iIa1a", "uipetbook");
var i = t("petbookcfg");
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
},
lb_player: {
default: null,
type: cc.Label
},
lb_pet: {
default: null,
type: cc.Label
}
},
start: function() {
this.lb_player.string = "人物爆伤+" + cc.playerData.getplayerbaoshang() + "%";
this.lb_pet.string = "宠物爆伤+" + cc.playerData.getpetbaoshang();
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(i.length, {
array: i,
target: this
});
},
close: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {
petbookcfg: "petbookcfg"
} ],
