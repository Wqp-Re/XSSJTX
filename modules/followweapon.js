followweapon: [ function(t, e) {
"use strict";
cc._RF.push(e, "3d58fJfj+9MupLVAlRYMb3Y", "followweapon");
cc.Class({
extends: cc.Component,
properties: {
nd_target: {
default: null,
type: cc.Node
}
},
start: function() {},
update: function() {
var t = this.nd_target.width, e = this.nd_target.angle, i = cc.v2(Math.cos(e * (Math.PI / 180)), Math.sin(e * (Math.PI / 180)));
this.node.x = t * i.x;
this.node.y = t * i.y;
}
});
cc._RF.pop();
}, {} ],
