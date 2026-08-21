pbautotile: [ function(t, e) {
"use strict";
cc._RF.push(e, "f7bcfL2yIRGyKTOBstYmPyb", "pbautotile");
cc.Class({
extends: cc.Component,
properties: {
sp_0: {
default: null,
type: cc.Sprite
},
sp_1: {
default: null,
type: cc.Sprite
},
sp_2: {
default: null,
type: cc.Sprite
},
sp_3: {
default: null,
type: cc.Sprite
}
},
initdata: function(t, e, i) {
if (i) {
this.sp_0.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t);
this.sp_1.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t);
this.sp_2.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t);
this.sp_3.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t);
} else {
this.sp_0.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t + "_" + e.m0);
this.sp_1.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t + "_" + e.m1);
this.sp_2.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t + "_" + e.m2);
this.sp_3.spriteFrame = cc.atlMgr.tileatlas.getSpriteFrame(t + "_" + e.m3);
}
},
update: function() {}
});
cc._RF.pop();
}, {} ],
