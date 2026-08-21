atlasmgr: [ function(t, e) {
"use strict";
cc._RF.push(e, "6743cjSNm5J94N6A5Y/fUTe", "atlasmgr");
cc.Class({
extends: cc.Component,
properties: {
roleatlas: {
default: null,
type: cc.SpriteAtlas
},
tileatlas: {
default: null,
type: cc.SpriteAtlas
}
},
onLoad: function() {
cc.atlMgr = this;
},
start: function() {}
});
cc._RF.pop();
}, {} ],
