tianjiazhuomian: [ function(t, e) {
"use strict";
cc._RF.push(e, "664a5hLDgJLUqV0Q+An+hkD", "tianjiazhuomian");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
var t = this;
this.node.active = !1;
i.checkhasicon(function() {
t.node.active = !0;
});
},
onclick: function() {
var t = this;
i.desktopicon(function() {
t.node.active = !1;
});
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ],
