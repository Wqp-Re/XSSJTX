debugbox: [ function(t, e) {
"use strict";
cc._RF.push(e, "f3f96RWDpFCaqlMFYfZy2nj", "debugbox");
var i = t("Utils");
cc.Class({
extends: cc.Component,
properties: {
nd_1: {
default: null,
type: cc.Node
},
nd_2: {
default: null,
type: cc.Node
},
nd_3: {
default: null,
type: cc.Node
}
},
initbox: function(t, e, i) {
this.life = 3;
this.nd_1.active = !0;
this.nd_2.active = !1;
this.nd_3.active = !1;
this.nd_1.width = t;
this.nd_1.height = e;
this.node.angle = i;
},
initview: function(t, e, s) {
this.life = 3;
this.nd_1.active = !1;
this.nd_2.active = !0;
this.nd_3.active = !0;
var n = i.getanglebydir(s);
this.node.angle = n;
this.nd_2.angle = t / 2;
this.nd_3.angle = -t / 2;
this.nd_2.width = this.nd_3.width = e;
},
update: function(t) {
this.life -= t;
this.life <= 0 && this.node.destroy();
}
});
cc._RF.pop();
}, {
Utils: "Utils"
} ],
