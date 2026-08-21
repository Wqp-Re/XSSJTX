CCActionAdd: [ function(t, e) {
"use strict";
cc._RF.push(e, "d3144FULSlMRZWZNBJt7mpq", "CCActionAdd");
cc.ShakeAction = cc.ActionInterval.extend({
initWithDuration: function(t, e, i) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._strengthx = e;
this._strengthy = i;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.ShakeAction();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._strength);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this.oldPos = this.target.position;
},
fgRangeRand: function(t, e) {
return Math.random() * (e - t) + t;
},
stop: function() {
this.target && this.oldPos && (this.target.position = this.oldPos);
this.target = null;
this.oldPos = null;
},
update: function(t) {
var e = this.fgRangeRand(-this._strengthx, this._strengthx) * t, i = this.fgRangeRand(-this._strengthy, this._strengthy) * t;
if (this.target) {
var s = this.target.position;
s.x = s.x + e;
s.y = s.y + i;
this.target.position = s;
}
}
});
cc.ProgressTo = cc.ActionInterval.extend({
initWithDuration: function(t, e, i) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._start = e;
this._end = i;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.ProgressTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._start, this._end);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this.progress = this.target.getComponent("cc.ProgressBar");
this.progress.progress = this._start;
this._delta = this._end - this._start;
},
update: function(t) {
t = this._computeEaseTime(t);
this.target && (this.progress.progress = this._start + this._delta * t);
}
});
cc.VauleTo = cc.ActionInterval.extend({
initWithDuration: function(t, e, i, s) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._start = e;
this._end = i;
this._callback = s;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.VauleTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._start, this._end, this._callback);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._delta = this._end - this._start;
},
update: function(t) {
t = this._computeEaseTime(t);
this.target && this._callback && this._callback(this._start + this._delta * t);
}
});
cc._RF.pop();
}, {} ],
