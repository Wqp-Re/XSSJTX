testmove: [ function(t, e) {
"use strict";
cc._RF.push(e, "3c65aVBXQ1EdJtIgJib3Y75", "testmove");
cc.Class({
extends: cc.Component,
properties: {
fixy: !1
},
start: function() {
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
},
_touchMoveEvent: function(t) {
var e = this.node.convertToNodeSpaceAR(t.getLocation()), i = this.node.getPosition().x + e.x, s = this.node.getPosition().y + e.y;
this.node.x = i;
this.node.y = s;
this.fixy && this.node.y < 0 && (this.node.y = 0);
}
});
cc._RF.pop();
}, {} ],
