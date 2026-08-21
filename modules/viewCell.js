viewCell: [ function(t, e) {
"use strict";
cc._RF.push(e, "d1dfablitpJ5rXHxnkR6CpH", "viewCell");
cc.viewCell = cc.Class({
extends: cc.Component,
properties: {
tableView: {
default: null,
visible: !1
},
_isCellInit_: !1,
_longClicked_: !1
},
_cellAddMethodToNode_: function() {
this.node.clicked = this.clicked.bind(this);
},
_cellAddTouch_: function() {
this.node.on(cc.Node.EventType.TOUCH_START, function() {
if (!0 === this.node.active && 0 !== this.node.opacity && !this._longClicked_) {
this._longClicked_ = !0;
this.scheduleOnce(this._longClicked, 1.5);
}
}, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, function() {
if (this._longClicked_) {
this._longClicked_ = !1;
this.unschedule(this._longClicked);
}
}, this);
this.node.on(cc.Node.EventType.TOUCH_END, function() {
this.clicked();
if (this._longClicked_) {
this._longClicked_ = !1;
this.unschedule(this._longClicked);
}
}, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, function() {
if (this._longClicked_) {
this._longClicked_ = !1;
this.unschedule(this._longClicked);
}
}, this);
},
_cellInit_: function(t) {
this.tableView = t;
if (!this._isCellInit_) {
this._cellAddMethodToNode_();
this._cellAddTouch_();
this._isCellInit_ = !0;
}
},
_longClicked: function() {
this._longClicked_ = !1;
this.node.emit(cc.Node.EventType.TOUCH_CANCEL);
this.longClicked();
},
longClicked: function() {},
clicked: function() {},
init: function() {}
});
cc._RF.pop();
}, {} ],
