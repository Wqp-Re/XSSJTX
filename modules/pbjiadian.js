pbjiadian: [ function(t, e) {
"use strict";
cc._RF.push(e, "37568Jrsv1JWrSaIUF1PHbD", "pbjiadian");
var i = t("enumcfg"), s = (i.qulitycolor, i.typename, i.enumproperty, i.enumpropertyname), n = i.enumproperty2;
cc.Class({
extends: cc.Component,
properties: {
lb_bpname: {
default: null,
type: cc.Label
},
lb_bpold: {
default: null,
type: cc.Label
},
lb_bpnow: {
default: null,
type: cc.Label
},
edbox: {
default: null,
type: cc.EditBox
}
},
initdata: function(t, e) {
this.target = e;
this.nowcount = 0;
this.lb_bpname.string = s[t].name;
this.lb_bpold.string = cc.playerData.player[n[t]];
this.lb_bpnow.string = this.nowcount;
},
changepoint: function(t) {
var e = Math.min(this.target.leftpoint, t);
e = Math.floor(e);
this.nowcount + e < 0 && (e = -this.nowcount);
this.target.leftpoint -= e;
this.nowcount += e;
this.lb_bpnow.string = this.nowcount;
this.target.refreshpoint();
},
clickaddone: function() {
this.changepoint(1);
},
clickaddten: function() {
this.changepoint(10);
},
clickadd100: function() {
this.changepoint(100);
},
clickmiunsone: function() {
this.changepoint(-1);
},
clickmiunsten: function() {
this.changepoint(-10);
},
clickmiuns100: function() {
this.changepoint(-100);
},
clickmiunsnum: function() {
this.changepoint(Number(this.edbox.string));
}
});
cc._RF.pop();
}, {
enumcfg: "enumcfg"
} ],
