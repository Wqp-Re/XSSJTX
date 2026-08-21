cellstage: [ function(t, e) {
"use strict";
cc._RF.push(e, "3fa69s0JvtF2KVGpf3y/LTZ", "cellstage");
t("viewCell");
t("Utils"), t("fumocfg");
var i = t("enumcfg");
i.typename, i.enumpropertyname, i.qulitycolor;
cc.Class({
extends: cc.viewCell,
properties: {
lb_name: {
default: null,
type: cc.Label
}
},
init: function(t, e) {
if (t >= e.array.length) this.node.active = !1; else {
this.target = e.target;
this.stageid = e.array[t];
this.lb_name.string = "第" + this.stageid + "层";
}
},
onclick: function() {
cc.playerData.tempstage = this.stageid;
this.target.refresh();
}
});
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
fumocfg: "fumocfg",
viewCell: "viewCell"
} ],
