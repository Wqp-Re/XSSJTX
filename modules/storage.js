storage: [ function(t, e) {
"use strict";
cc._RF.push(e, "6b15dTkIHFMMYdCt21EPeit", "storage");
e.exports = {
set: function(t, e) {
try {
cc.sys.localStorage.setItem(t, e);
return !0;
} catch (t) {
console.log(t);
}
return !1;
},
get: function(t) {
return cc.sys.localStorage.getItem(t);
},
setjson: function(t, e) {
this.set(t, JSON.stringify(e));
},
getjson: function(t) {
var e = this.get(t);
if (e) try {
return JSON.parse(e);
} catch (t) {}
return null;
},
remove: function(t) {
cc.sys.localStorage.removeItem(t);
},
hasItem: function(t) {
var e = cc.sys.localStorage.getItem(t);
return cc.sys.platform == cc.sys.WECHAT_GAME ? "" != e || "number" == typeof e : null != e && null != e;
},
setData: function(t, e) {
var i = {};
i[t] = e;
cc.log("storage====set== " + JSON.stringify(i));
return this.set(t, JSON.stringify(i));
},
getStringData: function(t) {
cc.log("storage====get== start" + t);
var e = cc.sys.localStorage.getItem(t);
if (!e) return "0";
var i = null;
try {
i = JSON.parse(e);
} catch (t) {
console.log(t);
}
cc.log("storage====get== " + i);
if (!i) return "0";
cc.log("storage====get== " + i[t]);
return i[t];
}
};
cc._RF.pop();
}, {} ],
