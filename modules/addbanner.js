addbanner: [ function(t, e) {
"use strict";
cc._RF.push(e, "62b15/1UKREC5y00LVeSjsZ", "addbanner");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
start: function() {
i.banner();
},
onDestroy: function() {
i.closebanner();
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
