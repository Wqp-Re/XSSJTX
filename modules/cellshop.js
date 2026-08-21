cellshop: [ function(t, e) {
"use strict";
cc._RF.push(e, "51a86g0JNxJeandwBux7CuG", "cellshop");
t("viewCell");
var i = t("Utils"), s = t("gameConfig").itemConfig;
cc.Class({
extends: cc.viewCell,
properties: {
sp_icon: {
default: null,
type: cc.Sprite
},
sp_quailty: {
default: null,
type: cc.Sprite
},
lb_name: {
default: null,
type: cc.Label
},
lb_cost: {
default: null,
type: cc.Label
},
nd_gold: {
default: null,
type: cc.Node
},
nd_yuangu: {
default: null,
type: cc.Node
}
},
init: function(t, e) {
if (t >= e.array.length) this.node.active = !1; else {
this.target = e.target;
var n = e.array[t], a = 1;
if (n[1]) {
this.itemid = n[0];
a = n[1];
} else this.itemid = n;
this.count = a;
this.cfg = s[this.itemid];
i.commonicon(this.itemid, this.sp_icon, this.sp_quailty, this.lb_name, this.lb_cost, a);
this.ygprize = 10;
if (this.target.ygmode) {
this.nd_gold.active = !1;
this.ygprize = n[2];
this.lb_cost.string = this.ygprize;
} else this.nd_gold.active = !0;
this.nd_yuangu.active = !this.nd_gold.active;
}
},
onbuy: function() {
var t = cc.playerData.buyitem(this.itemid, this.count, this.target.ygmode, this.ygprize);
0 == t ? cc.uiHelper.showTips("获得", "icons/items/" + this.cfg.icon, void 0, "x" + this.count) : cc.uiHelper.showTips([ "购买成功", "背包已满", "金钱不足", "远古石不足" ][t]);
}
});
cc._RF.pop();
}, {
Utils: "Utils",
gameConfig: "gameConfig",
viewCell: "viewCell"
} ],
