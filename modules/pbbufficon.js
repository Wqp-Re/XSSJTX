pbbufficon: [ function(t, e) {
"use strict";
cc._RF.push(e, "63c2f/vekNEk4tmf4y4mYt7", "pbbufficon");
cc.Class({
extends: cc.Component,
properties: {
sp_icon: {
default: null,
type: cc.Sprite
},
lb_count: {
default: null,
type: cc.Label
}
},
initdata: function(t) {
this.data = t;
this.node.ctrl = this;
var e = this;
e.sp_icon.spriteFrame = null;
cc.resources.load("icons/buff/" + t.cfg.icon, cc.SpriteFrame, function(t, i) {
t || (e.sp_icon.spriteFrame = i);
});
this.refreshcount(t);
},
refreshcount: function(t) {
t.nowcount > 1 ? this.lb_count.string = t.nowcount : this.lb_count.string = "";
},
update: function() {
this.refreshcount(this.data);
}
});
cc._RF.pop();
}, {} ],
