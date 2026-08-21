itemobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "a09f2CoDkpBYbhs6r99QSBR", "itemobj");
var i = t("gameConfig").itemConfig;
e.exports = function() {
this.init = function(t) {
this.id = t;
this.count = 1;
this.cfg = i[t];
if (!this.cfg) return !1;
this.qulity = this.cfg.qulity;
this.qulity || (this.qulity = 1);
return !0;
};
this.initwithsave = function(t) {
if (!this.init(t[0])) return !1;
this.count = t[1];
return this;
};
this.encode = function() {
return [ this.id, this.count ];
};
};
cc._RF.pop();
}, {
gameConfig: "gameConfig"
} ],
