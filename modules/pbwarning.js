pbwarning: [ function(t, e) {
"use strict";
cc._RF.push(e, "d9f72cAEuFE0KklhW04mh0x", "pbwarning");
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
}
},
initdata: function(t) {
this.node.ctrl = this;
this.maxlife = this.life = t.t;
var e = t.v;
this.node.x = e.x;
this.node.y = e.y;
this.nd_1.width = this.nd_2.width = e.width;
this.nd_1.height = this.nd_2.height = e.height;
this.nd_2.scale = 0;
},
doupdate: function(t) {
this.life -= t;
this.nd_2.scale = 1 - this.life / this.maxlife;
return this.life <= 0;
}
});
cc._RF.pop();
}, {} ],
