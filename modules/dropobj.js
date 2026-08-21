dropobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "0ea95VVFNBILoaPPhVSd0je", "dropobj");
var i = t("equipobj"), s = t("gameConfig").itemConfig, n = t("enumcfg").enumobjtype, a = t("Utils");
e.exports = function() {
this.init = function(t, e) {
this.objtype = n.dropobj;
var o = s[t];
1 == o.type || 2 == o.type ? this.itemdata = new i().initwithid(t, 0) : this.itemdata = {
qulity: s[t].qulity,
cfg: s[t],
id: t,
isitem: !0
};
this.sx = e.x;
this.sy = e.y;
this.x = -30 + a.randintSeed(60) + this.sx;
this.y = -30 + a.randintSeed(60) + this.sy;
cc.battlelogic.objuuid++;
this.uuid = cc.battlelogic.objuuid;
this.life = 30;
return this;
}, this.update = function(t) {
this.life -= t;
return this.life <= 0;
};
};
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
equipobj: "equipobj",
gameConfig: "gameConfig"
} ],
