dmglb: [ function(t, e) {
"use strict";
cc._RF.push(e, "f8de9hqJehD5JG0i2kDzQcT", "dmglb");
t("Utils");
cc.Class({
extends: cc.Component,
properties: {
lb_dmg: {
default: null,
type: cc.Label
},
nd_cri: {
default: null,
type: cc.Node
}
},
showdmg: function(t, e, i) {
t.cri ? this.nd_cri.active = !0 : this.nd_cri.active = !1;
this.node.x = e.x;
this.node.y = e.y + 10;
this.lb_dmg.string = t.v;
this.life = .8;
this.node.opacity = 255;
this.node.scale = 1;
this.node.ctrl = this;
if (t.cri) this.lb_dmg.node.color = cc.Color.YELLOW; else if (1 == i.camp || t.miss) this.lb_dmg.node.color = cc.Color.RED; else if (t.v >= 0) this.lb_dmg.node.color = cc.Color.WHITE; else {
this.lb_dmg.string = Math.abs(t.v);
this.lb_dmg.node.color = cc.Color.GREEN;
}
},
doupdate: function(t) {
this.life -= t;
this.node.opacity -= 100 * t;
this.node.y = this.node.y + 70 * t;
this.node.scale -= .5 * t;
return this.life <= 0;
}
});
cc._RF.pop();
}, {
Utils: "Utils"
} ],
