lootobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "cac93fp4BpEzLfOzhs9BBK+", "lootobj");
var i = t("lootcfg");
e.exports = function() {
this.init = function(t, e) {
this.objtype = 2;
this.uuid = t.uuid;
this.gamelogic = e;
this.lootid = t.lootid;
this.x = t.x;
this.y = t.y;
var s = i[this.lootid];
this.checkmove = s.checkmove;
this.checkhit = s.checkhit;
this.width = s.width;
this.height = s.height;
this.angle = 0;
return this;
};
this.dohurt = function() {};
};
cc._RF.pop();
}, {
lootcfg: "lootcfg"
} ],
