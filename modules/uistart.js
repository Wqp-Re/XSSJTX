uistart: [ function(t, e) {
"use strict";
cc._RF.push(e, "c8920DYHkVK0LRwb/wx2c+z", "uistart");
cc.Class({
extends: cc.Component,
properties: {
pbmain: {
default: null,
type: cc.Prefab
}
},
start: function() {
var t = cc.instantiate(this.pbmain);
this.node.parent.addChild(t);
}
});
cc._RF.pop();
}, {} ],
