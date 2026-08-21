urlbuilder: [ function(t, e) {
"use strict";
cc._RF.push(e, "a2b30GEGTRBjpOLQAYatG14", "urlbuilder");
e.exports = cc.Class({
__ctor__: function(t) {
this.orginurl = t;
this.baseurl = t;
this.checked = !1;
},
addKV: function(t, e) {
if ("undefined" == typeof e) return this;
this._checkurl();
var i = encodeURIComponent(t) + "=" + encodeURIComponent(e);
this.baseurl += i;
return this;
},
clear: function() {
this.baseurl = this.orginurl;
this.checked = !1;
},
_checkurl: function() {
if (this.checked) this.baseurl += "&"; else {
-1 == this.baseurl.indexOf("?") ? this.baseurl += "?" : this.baseurl += "&";
this.checked = !0;
}
}
});
cc._RF.pop();
}, {} ],
