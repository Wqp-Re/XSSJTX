notification: [ function(t, e) {
"use strict";
cc._RF.push(e, "27a1eZ1Zc1CbbMxVjkEG9dH", "notification");
var i = t("signals"), s = {
_signals: [],
_cachebinds: {},
_findSignal: function(t) {
var e, i;
for (e = this._signals.length; e--; ) if ((i = this._signals[e]).event === t) return i;
return null;
},
createBinding: function(t, e, s) {
var n = this._findSignal(t);
null === n && (n = this._findSignal(null));
if (null === n) {
n = new i.Signal();
this._signals.push(n);
}
if (n) {
n.event = t;
return n.add(e, s);
}
},
removeBinding: function(t) {
for (var e = t instanceof Array ? t : [ t ], i = e.length; i--; ) {
var s = e[i], n = s.getSignal();
s.detach();
n && 0 == n.getNumListeners() && (n.event = null);
}
},
on: function(t, e, i) {
var s = this._cachebinds[t];
if (!s) {
s = [];
this._cachebinds[t] = s;
}
var n = s.find(function(t) {
return t.listener == e && t.target == i;
});
if (n) return n.binding;
var a = this.createBinding(t, e, i);
n = {
listener: e,
target: i,
binding: a
};
s.push(n);
return a;
},
off: function(t, e, i) {
var s = this._cachebinds[t];
if (s) {
var n = s.findIndex(function(t) {
return t.listener == e && t.target == i;
});
if (!(n < 0)) {
var a = s[n];
this.removeBinding(a.binding);
s.splice(n, 1);
}
}
},
emit: function(t) {
var e = this._findSignal(t);
e && e.dispatch.apply(this, arguments);
}
};
e.exports = s;
cc._RF.pop();
}, {
signals: "signals"
} ],
