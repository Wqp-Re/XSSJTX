Notifier: [ function(t, e) {
"use strict";
cc._RF.push(e, "408e9lYMA5GhLXuiulJqRal", "Notifier");
var i = function(t, e) {
this.target = t;
this.callback = e;
}, s = function() {
this.observerMap = {};
};
s.prototype.on = function(t, e, s) {
this.observerMap[t] || (this.observerMap[t] = []);
this.observerMap[t].push(new i(e, s));
};
s.prototype.off = function(t, e) {
if (this.observerMap[t]) for (var i = this.observerMap[t], s = i.length - 1; s >= 0; s--) if (i[s].target == e) {
i.splice(s, 1);
break;
}
};
s.prototype.removeAllObservers = function(t) {
this.observerMap[t] = null;
};
s.prototype.emit = function(t, e) {
if (this.observerMap[t]) for (var i = this.observerMap[t], s = i.length - 1; s >= 0; s--) i[s].callback(e);
};
cc.Notifier = new s();
cc._RF.pop();
}, {} ],
