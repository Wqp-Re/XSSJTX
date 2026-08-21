uistage: [ function(t, e) {
"use strict";
cc._RF.push(e, "685e2lP2YlPUoNpDbn1eUJu", "uistage");
cc.Class({
extends: cc.Component,
properties: {
tableview: {
default: null,
type: cc.Node
},
lb_cengshu: {
default: null,
type: cc.Label
},
tg_shenyuan: {
default: null,
type: cc.Toggle
},
nd_shenyuan: {
default: null,
type: cc.Node
}
},
start: function() {
this.nd_shenyuan.active = cc.playerData.stage > 50;
this.tg_shenyuan.isChecked = cc.shenyuan;
cc.hell = !1;
cc.wujin = !1;
this.retable();
this.refresh();
},
retable: function() {
var t = [], e = cc.playerData.getstage();
cc.shenyuan && (e = cc.playerData.getstagesy());
for (var i = 0; i < e; i++) t.push(i + 1);
this.tbv = this.tableview.getComponent("tableView");
this.tbv.initTableView(t.length, {
array: t,
target: this
});
this.tbv.scrollToOffset({
x: 0,
y: 60 * Math.max(0, cc.playerData.tempstage - 1)
}, 0);
},
refresh: function() {
this.lb_cengshu.string = "挑战" + cc.playerData.tempstage + "层";
},
clicknormal: function() {
cc.stageid = cc.playerData.tempstage;
cc.battling = !0;
cc.director.loadScene("game");
},
clickbest: function() {
cc.shenyuan ? cc.stageid = cc.playerData.getstagesy() : cc.stageid = cc.playerData.getstage();
cc.battling = !0;
cc.director.loadScene("game");
},
close: function() {
this.node.destroy();
},
onclicksy: function() {
cc.shenyuan = this.tg_shenyuan.isChecked;
cc.playerData.retemp();
this.retable();
this.refresh();
}
});
cc._RF.pop();
}, {} ],
