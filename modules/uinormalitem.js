uinormalitem: [ function(t, e) {
"use strict";
cc._RF.push(e, "ba7b45G8pdLpp40eGuK/5WC", "uinormalitem");
cc.Class({
extends: cc.Component,
properties: {
lb_name: {
default: null,
type: cc.Label
},
lb_des: {
default: null,
type: cc.Label
},
nd_btn: {
default: null,
type: cc.Node
},
lb_btn: {
default: null,
type: cc.Label
},
nd_btn2: {
default: null,
type: cc.Node
},
lb_btn2: {
default: null,
type: cc.Label
}
},
start: function() {
this.node.on(cc.Node.EventType.TOUCH_END, function() {
this.node.destroy();
}, this);
},
initdata: function(t, e, i, s, n, a) {
this.lb_name.string = t;
this.lb_des.string = e;
this.nd_btn2.active = !1;
if (i) {
this.lb_btn.string = i;
this.nd_btn.active = !0;
this.funck = s;
this.funcv = n;
if ("useitem" == s && 6 == n.cfg.subtype && n.count > 1) {
this.nd_btn2.active = !0;
this.lb_btn2.string = "全部使用";
} else if ("sellitem" == s && 3 == n.cfg.type && n.count > 1) {
this.nd_btn2.active = !0;
this.lb_btn2.string = "全部出售";
}
} else this.nd_btn.active = !1;
a && (this.lb_name.node.color = a);
},
onclick: function() {
this.funck && cc.Notifier.emit(this.funck, this.funcv);
this.node.destroy();
},
onclick2: function() {
this.funck && cc.Notifier.emit(this.funck + "all", this.funcv);
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
