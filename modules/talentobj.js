talentobj: [ function(t, e) {
"use strict";
cc._RF.push(e, "fce3f4APE1MBbtjC3iyDsCc", "talentobj");
var i = t("talentcfg");
e.exports = function() {
this.init = function(t, e) {
this.id = t;
this.lv = e;
this.cfg = i[t];
this.flag = this.cfg.flag;
this.maxlv = this.cfg.maxlv;
this.setproperty();
};
this.setproperty = function() {
this.property = [];
var t = this.cfg.property;
if (t) for (var e = t.length - 1; e >= 0; e--) this.property.push([ t[e][0], t[e][1] + t[e][2] * this.lv ]);
};
this.lvup = function() {
if (!(this.lv < this.maxlv)) return !1;
this.lv++;
this.setproperty();
};
};
cc._RF.pop();
}, {
talentcfg: "talentcfg"
} ],
