httpcli: [ function(t, e) {
"use strict";
cc._RF.push(e, "3239bjKEDVNybbZkkS+pbB0", "httpcli");
var i = cc.Class({
__ctor__: function() {
this.cachemsg = [];
this._needretry = !1;
this._retrycount = 3;
this._retryms = 3e3;
},
httpGet: function(t, e, i) {
return this.httpsend(t, null, e, i, "GET");
},
httpPost: function(t, e, i, s) {
return this.httpsend(t, e, i, s, "POST");
},
httpsend: function(t, e, i, s, n) {
if (cc.sys.platform == cc.sys.WECHAT_GAME) {
var a = e ? JSON.parse(e) : null, o = new Date().getTime();
return c = wx.request({
url: t,
data: a,
method: n,
success: function(t) {
console.log("[wx]request success!" + t.statusCode);
if (t.statusCode >= 200 && t.statusCode < 400) {
var e = JSON.stringify(t.data);
i && i(e);
}
if (cc.canreport) {
var s = Number(new Date().getTime() - o);
wx.reportPerformance(1002, s);
}
},
fail: function(t) {
console.log("[wx]request fail!" + JSON.stringify(t));
s && s(-1, t.msg);
},
complete: function() {
console.log("[wx]request complete!");
}
});
}
if ("undefined" != typeof XMLHttpRequest) {
var c;
(c = new XMLHttpRequest()).onreadystatechange = function() {
if (4 == c.readyState) if (c.status >= 200 && c.status < 400) {
var t = c.responseText;
i && i(t);
} else s && s(c.status, c.statusText);
};
c.open(n, t, !0);
c.send(e);
return c;
}
return null;
},
_retry: function() {
var t = this;
this.cachemsg.length > 0 && this.cachemsg.forEach(function(e) {
var i = e;
if (!i.retrying) {
if (!i.retry_count) {
i.retry_count = 1;
i.passtime = 0;
}
i.passtime += t._retryms;
if (i.passtime >= i.retrycount * t._retryms && !i.retrying) {
i.retrying = !0;
var s = i.v ? "POST" : "GET";
t.httpsend(i.u, i.v, function(e) {
i.successcb && i.successcb(e);
var s = t.cachemsg.findIndex(function(t) {
return t == i;
});
-1 != s && t.cachemsg.splice(s, 1);
}, function(e, s) {
i.retrying = !1;
i.passtime = 0;
i.retry_count++;
if (i.retry_count >= t._retrycount) {
i.errcb && i.errcb(e, s);
var n = t.cachemsg.findIndex(function(t) {
return t == i;
});
-1 != n && t.cachemsg.splice(n, 1);
}
}, s, !0);
}
}
});
},
setRetryCount: function(t) {
this.retrycount = t;
},
setRetryInterval: function(t) {
if (t != this._retryms) {
this._retryms = t;
this._retry_tid && clearInterval(this._retry_tid);
this._retry_tid = setInterval(this._retry.bind(this), this._retryms);
}
},
setNeedRetry: function(t) {
this._needretry = t;
if (!this._needretry && this._retry_tid) {
clearInterval(this._retry_tid);
this._retry_tid = 0;
} else this._needretry && !this._retry_tid && (this._retry_tid = setInterval(this._retry.bind(this), this._retryms));
}
});
e.exports = i;
cc._RF.pop();
}, {} ],
