cellys: [ function(t, e) {
"use strict";
cc._RF.push(e, "d13c3C1rRVFQqs8Agwzi48o", "cellys");
var i = t("viewCell");
t("Utils");
cc.Class({
extends: i,
properties: {
lb_str: {
default: null,
type: cc.Label
}
},
init: function(t, e) {
if (t >= e.array.length) this.node.active = !1; else {
var i = e.array[t];
this.lb_str.string = i;
}
}
});
cc._RF.pop();
}, {
Utils: "Utils",
viewCell: "viewCell"
} ],
