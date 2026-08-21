signals: [ function(t, e) {
"use strict";
cc._RF.push(e, "8694cmVcBtLNZ5eHmNM4HGH", "signals");
(function() {
function t(t, e, i, s, n) {
this._listener = e;
this._isOnce = i;
this.context = s;
this._signal = t;
this._priority = n || 0;
}
t.prototype = {
active: !0,
params: null,
execute: function(t) {
var e, i;
if (this.active && this._listener) {
i = this.params ? this.params.concat(t) : t;
e = this._listener.apply(this.context, i);
this._isOnce && this.detach();
}
return e;
},
detach: function() {
return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
},
isBound: function() {
return !!this._signal && !!this._listener;
},
isOnce: function() {
return this._isOnce;
},
getListener: function() {
return this._listener;
},
getSignal: function() {
return this._signal;
},
_destroy: function() {
delete this._signal;
delete this._listener;
delete this.context;
},
toString: function() {
return "[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]";
}
};
function i(t, e) {
if ("function" != typeof t) throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", e));
}
function s() {
this._bindings = [];
this._prevParams = null;
var t = this;
this.dispatch = function() {
s.prototype.dispatch.apply(t, arguments);
};
}
s.prototype = {
VERSION: "1.0.0",
memorize: !1,
_shouldPropagate: !0,
active: !0,
_registerListener: function(e, i, s, n) {
var a, o = this._indexOfListener(e, s);
if (-1 !== o) {
if ((a = this._bindings[o]).isOnce() !== i) throw new Error("You cannot add" + (i ? "" : "Once") + "() then add" + (i ? "Once" : "") + "() the same listener without removing the relationship first.");
} else {
a = new t(this, e, i, s, n);
this._addBinding(a);
}
this.memorize && this._prevParams && a.execute(this._prevParams);
return a;
},
_addBinding: function(t) {
var e = this._bindings.length;
do {
--e;
} while (this._bindings[e] && t._priority <= this._bindings[e]._priority);
this._bindings.splice(e + 1, 0, t);
},
_indexOfListener: function(t, e) {
for (var i, s = this._bindings.length; s--; ) if ((i = this._bindings[s])._listener === t && i.context === e) return s;
return -1;
},
has: function(t, e) {
return -1 !== this._indexOfListener(t, e);
},
add: function(t, e, s) {
i(t, "add");
return this._registerListener(t, !1, e, s);
},
addOnce: function(t, e, s) {
i(t, "addOnce");
return this._registerListener(t, !0, e, s);
},
remove: function(t, e) {
i(t, "remove");
var s = this._indexOfListener(t, e);
if (-1 !== s) {
this._bindings[s]._destroy();
this._bindings.splice(s, 1);
}
return t;
},
removeAll: function() {
for (var t = this._bindings.length; t--; ) this._bindings[t]._destroy();
this._bindings.length = 0;
},
getNumListeners: function() {
return this._bindings.length;
},
halt: function() {
this._shouldPropagate = !1;
},
dispatch: function(t) {
if (this.active) {
var e, i = Array.prototype.slice.call(arguments), s = this._bindings.length;
this.memorize && (this._prevParams = i);
if (s) {
e = this._bindings.slice();
this._shouldPropagate = !0;
do {
s--;
} while (e[s] && this._shouldPropagate && !1 !== e[s].execute(i));
}
}
},
forget: function() {
this._prevParams = null;
},
dispose: function() {
this.removeAll();
delete this._bindings;
delete this._prevParams;
},
toString: function() {
return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]";
}
};
var n = s;
n.Signal = s;
"function" == typeof define && define.amd ? define(function() {
return n;
}) : "undefined" != typeof e && e.exports ? e.exports = n : (void 0).signals = n;
})();
cc._RF.pop();
}, {} ],
