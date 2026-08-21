moveprefab: [ function(t, e) {
"use strict";
cc._RF.push(e, "17c38jX20BOpZjyzFHMPxNC", "moveprefab");
cc.Class({
extends: cc.Component,
properties: {},
initdata: function(t) {
this.pname = t.prefab;
this.target = t;
this.node.ctrl = this;
cc.soundMgr.playSound("dragon");
},
doupdate: function() {
this.node.x = this.target.x;
this.node.y = this.target.y;
return this.target.life <= 0;
}
});
cc._RF.pop();
}, {} ],
