hideyuansheng: [ function(t, e) {
"use strict";
cc._RF.push(e, "0f5c0SCiwFArZIdLnnJpwrK", "hideyuansheng");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
console.log("1");
i.destroyyouxiquan();
},
onDestroy: function() {
console.log("2");
i.youxiquan();
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
