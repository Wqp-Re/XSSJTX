hutuibanner: [ function(t, e) {
"use strict";
cc._RF.push(e, "24010fWlqVKaplIBXyfVQDB", "hutuibanner");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
cc.Notifier.on("closehutui", this, this.close.bind(this));
try {
i.hutuibanner();
} catch (t) {
console.log(t);
}
},
close: function() {
i.closehutuibanner();
},
onDestroy: function() {
cc.Notifier.off("closehutui", this);
this.close();
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
