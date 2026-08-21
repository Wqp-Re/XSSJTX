messagebox: [ function(t, e) {
"use strict";
cc._RF.push(e, "a557cgREKdDOJPkytooD4R8", "messagebox");
cc.Class({
extends: cc.Component,
properties: {
btn_ok: {
default: null,
type: cc.Node
},
btn_no: {
default: null,
type: cc.Node
},
lb_title: {
default: null,
type: cc.Label
},
lb_des: {
default: null,
type: cc.Label
}
},
onDestroy: function() {
cc.msgpb = null;
},
initdata: function(t, e, i, s) {
this.lb_title.string = t;
this.lb_des.string = e;
this.okfun = i;
this.nofun = s;
},
cbok: function() {
this.okfun && this.okfun();
this.node.destroy();
},
cbno: function() {
this.nofun && this.nofun();
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
