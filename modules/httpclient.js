httpclient: [ function(t, e) {
"use strict";
cc._RF.push(e, "09935U7kMBBr7Mr9g5bGedN", "httpclient");
var i = t("httpcli");
e.exports = {
getInstance: function() {
this._instance || (this._instance = new i());
return this._instance;
},
httpGet: function(t, e, i) {
return this.httpsend(t, null, e, i, "GET");
},
httpPost: function(t, e, i, s) {
return this.httpsend(t, e, i, s, "POST");
},
httpsend: function(t, e, i, s, n) {
return this.getInstance().httpsend(t, e, i, s, n);
},
JSON_parse: function(t) {
try {
return JSON.parse(t);
} catch (t) {
console.log(t);
return null;
}
}
};
cc._RF.pop();
}, {
httpcli: "httpcli"
} ],
