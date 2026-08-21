testview: [ function(t, e) {
"use strict";
cc._RF.push(e, "2b28dAgsQlPhZlpiZ1Rmmls", "testview");
t("Utils");
cc.Class({
extends: cc.Component,
properties: {
nd_eye: {
default: null,
type: cc.Node,
serializable: !0
},
nd_target: {
default: null,
type: cc.Node,
serializable: !0
},
nd_l1: {
default: null,
type: cc.Node,
serializable: !0
},
nd_l2: {
default: null,
type: cc.Node,
serializable: !0
},
eyedis: 150,
eyeag: 60
},
start: function() {
var t = new XMLHttpRequest();
t.onreadystatechange = function() {
if (4 == t.readyState && t.status >= 200 && t.status < 400) {
var e = t.responseText;
console.log(e);
}
};
t.open("GET", "http://192.168.0.101/myphp/info.php?parma=2333345", !0);
t.send();
return t;
},
update: function() {}
});
cc._RF.pop();
}, {
Utils: "Utils"
} ],
