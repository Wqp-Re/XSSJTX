gamenewbie: [ function(t, e) {
"use strict";
cc._RF.push(e, "5f354mzgCVOkYewQ/LxcU2G", "gamenewbie");
cc.Class({
extends: cc.Component,
properties: {
nd_yindao: {
default: null,
type: cc.Node
},
nd_over: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.nd_yindao.active = !0;
this.nd_over.active = !this.nd_yindao.active;
},
onclose2: function() {
cc.director.loadScene("main");
this.node.destroy();
},
onclose: function() {
this.nd_yindao.active = !1;
this.nd_over.active = !this.nd_yindao.active;
this.node.active = !1;
cc.gamepause = !1;
}
});
cc._RF.pop();
}, {} ],
