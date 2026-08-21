tableView: [ function(t, e) {
"use strict";
cc._RF.push(e, "9aba29YKexFXolpweZzJPKj", "tableView");
var i = cc.Enum({
Horizontal: 0,
Vertical: 1
}), s = cc.Enum({
None: 0,
Up: 1,
Down: 2,
Left: 3,
Rigth: 4
}), n = cc.Enum({
LEFT_TO_RIGHT__TOP_TO_BOTTOM: 0,
TOP_TO_BOTTOM__LEFT_TO_RIGHT: 1
}), a = cc.Enum({
Scroll: 0,
Flip: 1
});
cc.Node.prototype.convertToWorldSpace2 = function(t) {
this._updateWorldMatrix();
var e = new cc.Vec2(t.x - this._anchorPoint.x * this._contentSize.width, t.y - this._anchorPoint.y * this._contentSize.height);
return cc.Vec2.transformMat4(e, e, this._worldMatrix);
};
function o(t, e) {
return cc.v2(t.x - e.x, t.y - e.y);
}
function c(t, e) {
if (t.length <= 1) return t;
for (var i = Math.floor(t.length / 2), s = t[i], n = [], a = [], o = 0; o < t.length; o++) o !== i && (e ? e(t[o], s) ? n.push(t[o]) : a.push(t[o]) : t[o] <= s ? n.push(t[o]) : a.push(t[o]));
return c(n, e).concat([ s ], c(a, e));
}
function r(t, e) {
for (var i = 0, s = t.children, n = s.length; i < n; i++) if (s[i]._cellIndex === e) return s[i];
return null;
}
var l = cc.Class({
extends: cc.ScrollView,
properties: {
_data: null,
_minCellIndex: 0,
_maxCellIndex: 0,
_paramCount: 0,
_count: 0,
_cellCount: 0,
_showCellCount: 0,
_groupCellCount: null,
_scrollDirection: s.None,
_cellPool: null,
_page: 0,
_pageTotal: 0,
cell: {
default: null,
type: cc.Prefab,
notify: function() {}
},
ScrollModel: {
default: 0,
type: i,
notify: function() {
if (this.ScrollModel === i.Horizontal) {
this.horizontal = !0;
this.vertical = !1;
this.verticalScrollBar = null;
} else {
this.vertical = !0;
this.horizontal = !1;
this.horizontalScrollBar = null;
}
},
tooltip: "横向纵向滑动"
},
ViewType: {
default: 0,
type: a,
notify: function() {
this.ViewType === a.Flip ? this.inertia = !1 : this.inertia = !0;
},
tooltip: "为Scroll时,不做解释\n为Flipw时，在Scroll的基础上增加翻页的行为"
},
isFill: {
default: !1,
tooltip: "当节点不能铺满一页时，选择isFill为true会填充节点铺满整个view"
},
Direction: {
default: 0,
type: n,
tooltip: "规定cell的排列方向"
},
pageChangeEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: "仅当ViewType为pageView时有效，初始化或翻页时触发回调，向回调传入两个参数，参数一为当前处于哪一页，参数二为一共多少页"
}
},
statics: {
_cellPoolCache: {}
},
onLoad: function() {
var t = this;
this.needrefresh = !0;
l._tableView.push(this);
var e = this.node.destroy;
this.node.destroy = function() {
t.clear();
e.call(t.node);
};
var i = this.node._onPreDestroy;
this.node._onPreDestroy = function() {
t.clear();
i.call(t.node);
};
},
onDestroy: function() {
for (var t in l._tableView) if (l._tableView[t] === this) {
l._tableView.splice(t);
return;
}
},
_initCell: function(t, e) {
if (this.ScrollModel === i.Horizontal && this.Direction === n.TOP_TO_BOTTOM__LEFT_TO_RIGHT || this.ScrollModel === i.Vertical && this.Direction === n.LEFT_TO_RIGHT__TOP_TO_BOTTOM) {
for (var s = t._cellIndex * t.childrenCount, o = 0; o < t.childrenCount; ++o) if (r = t.children[o].getComponent("viewCell")) {
r._cellInit_(this);
r.init(s + o, this._data, e, [ t._cellIndex, o ]);
}
} else if (this.ViewType === a.Flip) {
var c = (s = Math.floor(t._cellIndex / this._showCellCount)) * this._showCellCount * t.childrenCount;
for (o = 0; o < t.childrenCount; ++o) if (r = t.children[o].getComponent("viewCell")) {
r._cellInit_(this);
r.init(this._showCellCount * o + t._cellIndex % this._showCellCount + c, this._data, e, [ o + s * t.childrenCount, o ]);
}
} else for (o = 0; o < t.childrenCount; ++o) {
var r;
if (r = t.children[o].getComponent("viewCell")) {
r._cellInit_(this);
r.init(o * this._count + t._cellIndex, this._data, e, [ o, o ]);
}
}
},
_setCellPosition: function(t, e) {
if (this.ScrollModel === i.Horizontal) {
t.x = 0 === e ? -this.content.width * this.content.anchorX + t.width * t.anchorX : r(this.content, e - 1).x + t.width;
t.y = (t.anchorY - this.content.anchorY) * t.height;
} else {
t.y = 0 === e ? this.content.height * (1 - this.content.anchorY) - t.height * (1 - t.anchorY) : r(this.content, e - 1).y - t.height;
t.x = (t.anchorX - this.content.anchorX) * t.width;
}
},
_addCell: function(t) {
var e = this._getCell();
this._setCellAttr(e, t);
this._setCellPosition(e, t);
e.parent = this.content;
this._initCell(e);
},
_setCellAttr: function(t, e) {
t.setSiblingIndex(e >= t._cellIndex ? this._cellCount : 0);
t._cellIndex = e;
},
_addCellsToView: function() {
for (var t = 0; t <= this._maxCellIndex; ++t) this._addCell(t);
},
_getCell: function() {
if (0 === this._cellPool.size()) {
var t = cc.instantiate(this.cell), e = new cc.Node();
e.anchorX = .5;
e.anchorY = .5;
var s = 0;
if (this.ScrollModel === i.Horizontal) {
e.width = t.width;
var n = Math.floor(this.content.height / t.height);
e.height = this.content.height;
for (var a = 0; a < n; ++a) {
t || (t = cc.instantiate(this.cell));
t.x = (t.anchorX - .5) * t.width;
t.y = e.height / 2 - t.height * (1 - t.anchorY) - s;
s += t.height;
t.parent = e;
t = null;
}
} else {
e.height = t.height;
n = Math.floor(this.content.width / t.width);
e.width = this.content.width;
for (a = 0; a < n; ++a) {
t || (t = cc.instantiate(this.cell));
t.y = (t.anchorY - .5) * t.height;
t.x = -e.width / 2 + t.width * t.anchorX + s;
s += t.width;
t.parent = e;
t = null;
}
}
this._cellPool.put(e);
}
return this._cellPool.get();
},
_getCellSize: function() {
var t = this._getCell(), e = t.getContentSize();
this._cellPool.put(t);
return e;
},
_getGroupCellCount: function() {
var t = this._getCell(), e = t.childrenCount;
this._cellPool.put(t);
return e;
},
clear: function() {
for (var t = this.content.childrenCount - 1; t >= 0; --t) this._cellPool.put(this.content.children[t]);
this._cellCount = 0;
this._showCellCount = 0;
},
reload: function(t) {
void 0 !== t && (this._data = t);
for (var e = this.content.childrenCount - 1; e >= 0; --e) this._initCell(this.content.children[e], !0);
},
_getCellPoolCacheName: function() {
return this.ScrollModel === i.Horizontal ? this.cell.name + "h" + this.content.height : this.cell.name + "w" + this.content.width;
},
_initTableView: function() {
this._cellPool && this.clear();
var t = this._getCellPoolCacheName();
l._cellPoolCache[t] || (l._cellPoolCache[t] = new cc.NodePool("viewCell"));
this._cellPool = l._cellPoolCache[t];
this._cellSize = this._getCellSize();
this._groupCellCount = this._getGroupCellCount();
this._count = Math.ceil(this._paramCount / this._groupCellCount);
if (this.ScrollModel === i.Horizontal) {
this._view.width = this.node.width;
this._view.x = (this._view.anchorX - this.node.anchorX) * this._view.width;
this._cellCount = Math.ceil(this._view.width / this._cellSize.width) + 1;
if (this.ViewType === a.Flip) if (this._cellCount > this._count) {
this.isFill ? this._cellCount = Math.floor(this._view.width / this._cellSize.width) : this._cellCount = this._count;
this._showCellCount = this._cellCount;
this._pageTotal = 1;
} else {
this._pageTotal = Math.ceil(this._count / (this._cellCount - 1));
this._count = this._pageTotal * (this._cellCount - 1);
this._showCellCount = this._cellCount - 1;
} else if (this._cellCount > this._count) {
this.isFill ? this._cellCount = Math.floor(this._view.width / this._cellSize.width) : this._cellCount = this._count;
this._showCellCount = this._cellCount;
} else this._showCellCount = this._cellCount - 1;
this.content.width = this._count * this._cellSize.width;
this.stopAutoScroll();
this.scrollToLeft();
} else {
this._view.height = this.node.height;
this._view.y = (this._view.anchorY - this.node.anchorY) * this._view.height;
this._cellCount = Math.ceil(this._view.height / this._cellSize.height) + 1;
if (this.ViewType === a.Flip) if (this._cellCount > this._count) {
this.isFill ? this._cellCount = Math.floor(this._view.height / this._cellSize.height) : this._cellCount = this._count;
this._showCellCount = this._cellCount;
this._pageTotal = 1;
} else {
this._pageTotal = Math.ceil(this._count / (this._cellCount - 1));
this._count = this._pageTotal * (this._cellCount - 1);
this._showCellCount = this._cellCount - 1;
} else if (this._cellCount > this._count) {
this.isFill ? this._cellCount = Math.floor(this._view.height / this._cellSize.height) : this._cellCount = this._count;
this._showCellCount = this._cellCount;
} else this._showCellCount = this._cellCount - 1;
this.content.height = this._count * this._cellSize.height;
this.stopAutoScroll();
this.scrollToTop();
}
this._changePageNum(1 - this._page);
this._lastOffset = this.getScrollOffset();
this._minCellIndex = 0;
this._maxCellIndex = this._cellCount - 1;
this._addCellsToView();
},
initTableView: function(t, e) {
this._paramCount = t;
this._data = e;
if (this.ScrollModel === i.Horizontal) {
this.horizontal = !0;
this.vertical = !1;
} else {
this.vertical = !0;
this.horizontal = !1;
}
this.verticalScrollBar && this.verticalScrollBar.node.on("size-changed", function() {
this._updateScrollBar(this._getHowMuchOutOfBoundary());
}, this);
this.horizontalScrollBar && this.horizontalScrollBar.node.on("size-changed", function() {
this._updateScrollBar(this._getHowMuchOutOfBoundary());
}, this);
this.node.getComponent(cc.Widget) && this.node.getComponent(cc.Widget).updateAlignment();
this._initTableView();
},
_onTouchBegan: function(t, e) {
this._super(t, e);
this._touchstart(t);
},
_onTouchMoved: function(t) {
if (this.enabledInHierarchy) {
var e = t.touch;
this.content && this._handleMoveLogic(e);
if (this.cancelInnerEvents) {
if (o(e.getLocation(), e.getStartLocation()).mag() > 7 && !this._touchMoved && t.target !== this.node) {
var i = new cc.Event.EventTouch(t.getTouches(), t.bubbles);
i.type = cc.Node.EventType.TOUCH_CANCEL;
i.touch = t.touch;
i.simulate = !0;
t.target.emit(cc.Node.EventType.TOUCH_CANCEL, i);
this._touchMoved = !0;
}
this._stopPropagationIfTargetIsMe(t);
this._touchmove(t);
}
}
},
_onTouchEnded: function(t, e) {
this._super(t, e);
this._touchend(t);
},
_onTouchCancelled: function(t, e) {
this._super(t, e);
this._touchend(t);
},
stopAutoScroll: function() {
this._scrollDirection = s.None;
this._super();
},
scrollToBottom: function(t, e) {
this._scrollDirection = s.Up;
this._super(t, e);
},
scrollToTop: function(t, e) {
this._scrollDirection = s.Down;
this._super(t, e);
},
scrollToLeft: function(t, e) {
this._scrollDirection = s.Rigth;
this._super(t, e);
},
scrollToRight: function(t, e) {
this._scrollDirection = s.Left;
this._super(t, e);
},
scrollToOffset: function(t, e, n) {
var a = o(t, this.getScrollOffset());
this.ScrollModel === i.Horizontal ? a.x > 0 ? this._scrollDirection = s.Left : a.x < 0 && (this._scrollDirection = s.Rigth) : a.y > 0 ? this._scrollDirection = s.Up : a.y < 0 && (this._scrollDirection = s.Down);
this._super(t, e, n);
},
addScrollEvent: function(t, e, i) {
var s = new cc.Component.EventHandler();
s.target = t;
s.component = e;
s.handler = i;
this.scrollEvents.push(s);
},
removeScrollEvent: function(t) {
for (var e in this.scrollEvents) if (this.scrollEvents[e].target === t) {
this.scrollEvents.splice(e, 1);
return;
}
},
clearScrollEvent: function() {
this.scrollEvents = [];
},
addPageEvent: function(t, e, i) {
var s = new cc.Component.EventHandler();
s.target = t;
s.component = e;
s.handler = i;
this.pageChangeEvents.push(s);
},
removePageEvent: function(t) {
for (var e = 0; e < this.pageChangeEvents.length; e++) if (this.pageChangeEvents[e].target === t) {
this.pageChangeEvents.splice(e, 1);
return;
}
},
clearPageEvent: function() {
this.pageChangeEvents = [];
},
scrollToNextPage: function() {
this.scrollToPage(this._page + 1);
},
scrollToLastPage: function() {
this.scrollToPage(this._page - 1);
},
scrollToPage: function(t) {
if (this.ViewType === a.Flip && t !== this._page && !(t < 1 || t > this._pageTotal)) {
var e = .3 * Math.abs(t - this._page);
this._changePageNum(t - this._page);
var i = this._view.width, s = this._view.height;
i = (this._page - 1) * i;
s = (this._page - 1) * s;
this.scrollToOffset({
x: i,
y: s
}, e);
}
},
getCells: function(t) {
var e = [], i = c(this.content.children, function(t, e) {
return t._cellIndex < e._cellIndex;
});
for (var s in i) {
var n = i[s];
for (var a in n.children) e.push(n.children[a]);
}
t(e);
},
getData: function() {
return this._data;
},
getGroupsRange: function(t) {
for (var e = [], i = this._minCellIndex; i <= this._maxCellIndex; i++) e.push(i);
t(e);
},
_changePageNum: function(t) {
this._page += t;
this._page <= 0 ? this._page = 1 : this._page > this._pageTotal && (this._page = this._pageTotal);
for (var e = 0; e < this.pageChangeEvents.length; e++) this.pageChangeEvents[e].emit([ this._page, this._pageTotal ]);
},
_touchstart: function() {
this.ScrollModel === i.Horizontal ? this.horizontal = !1 : this.vertical = !1;
},
_touchmove: function(t) {
if (this.horizontal === this.vertical) {
var e = t.getStartLocation(), s = t.getLocation();
if (this.ScrollModel === i.Horizontal) {
if (Math.abs(s.x - e.x) <= 7) return;
} else if (Math.abs(s.y - e.y) <= 7) return;
this.ScrollModel === i.Horizontal ? this.horizontal = !0 : this.vertical = !0;
}
},
_touchend: function(t) {
this.ScrollModel === i.Horizontal ? this.horizontal = !0 : this.vertical = !0;
this.ViewType === a.Flip && this._pageTotal > 1 && this._pageMove(t);
},
_pageMove: function(t) {
var e = this._view.width, n = this._view.height;
if (this.ViewType === a.Flip) {
var o = this.getScrollOffset(), c = this.getMaxScrollOffset();
if (this.ScrollModel === i.Horizontal) {
if (o.x >= 0 || o.x <= -c.x) return;
n = 0;
if (Math.abs(t.getLocation().x - t.getStartLocation().x) > this._view.width / 4) if (this._scrollDirection === s.Left) {
if (!(this._page < this._pageTotal)) return;
this._changePageNum(1);
} else if (this._scrollDirection === s.Rigth) {
if (!(this._page > 1)) return;
this._changePageNum(-1);
}
} else {
if (o.y >= c.y || o.y <= 0) return;
e = 0;
if (Math.abs(t.getLocation().y - t.getStartLocation().y) > this._view.height / 4) if (this._scrollDirection === s.Up) {
if (!(this._page < this._pageTotal)) return;
this._changePageNum(1);
} else if (this._scrollDirection === s.Down) {
if (!(this._page > 1)) return;
this._changePageNum(-1);
}
}
e = (this._page - 1) * e;
n = (this._page - 1) * n;
this.scrollToOffset({
x: e,
y: n
}, .3);
}
},
_getBoundingBoxToWorld: function(t) {
var e = t.convertToWorldSpace2(cc.v2(0, 0));
return cc.rect(e.x, e.y, t.width, t.height);
},
_updateCells: function() {
if (this.ScrollModel === i.Horizontal) {
if (this._scrollDirection === s.Left) {
if (this._maxCellIndex < this._count - 1) {
var t = this._getBoundingBoxToWorld(this._view);
do {
var e = r(this.content, this._minCellIndex);
if (!((n = this._getBoundingBoxToWorld(e)).xMax <= t.xMin)) break;
e.x = r(this.content, this._maxCellIndex).x + e.width;
this._minCellIndex++;
this._maxCellIndex++;
if (this.needrefresh || n.xMax + (this._maxCellIndex - this._minCellIndex + 1) * e.width > t.xMin) {
this._setCellAttr(e, this._maxCellIndex);
this._initCell(e);
}
} while (this._maxCellIndex !== this._count - 1);
}
} else if (this._scrollDirection === s.Rigth && this._minCellIndex > 0) {
t = this._getBoundingBoxToWorld(this._view);
do {
e = r(this.content, this._maxCellIndex);
if (!((n = this._getBoundingBoxToWorld(e)).xMin >= t.xMax)) break;
e.x = r(this.content, this._minCellIndex).x - e.width;
this._minCellIndex--;
this._maxCellIndex--;
if (this.needrefresh || n.xMin - (this._maxCellIndex - this._minCellIndex + 1) * e.width < t.xMax) {
this._setCellAttr(e, this._minCellIndex);
this._initCell(e);
}
} while (0 !== this._minCellIndex);
}
} else if (this._scrollDirection === s.Up) {
if (this._maxCellIndex < this._count - 1) {
t = this._getBoundingBoxToWorld(this._view);
do {
e = r(this.content, this._minCellIndex);
if (!((n = this._getBoundingBoxToWorld(e)).yMin >= t.yMax)) break;
e.y = r(this.content, this._maxCellIndex).y - e.height;
this._minCellIndex++;
this._maxCellIndex++;
if (this.needrefresh || n.yMin - (this._maxCellIndex - this._minCellIndex + 1) * e.height < t.yMax) {
this._setCellAttr(e, this._maxCellIndex);
this._initCell(e);
}
} while (this._maxCellIndex !== this._count - 1);
}
} else if (this._scrollDirection === s.Down && this._minCellIndex > 0) {
t = this._getBoundingBoxToWorld(this._view);
do {
var n;
e = r(this.content, this._maxCellIndex);
if (!((n = this._getBoundingBoxToWorld(e)).yMax <= t.yMin)) break;
e.y = r(this.content, this._minCellIndex).y + e.height;
this._minCellIndex--;
this._maxCellIndex--;
if (this.needrefresh || n.yMax + (this._maxCellIndex - this._minCellIndex + 1) * e.width > t.yMin) {
this._setCellAttr(e, this._minCellIndex);
this._initCell(e);
}
} while (0 !== this._minCellIndex);
}
},
_getScrollDirection: function() {
var t = this.getScrollOffset(), e = this._lastOffset;
this._lastOffset = t;
t = o(t, e);
this.ScrollModel === i.Horizontal ? t.x > 0 ? this._scrollDirection = s.Rigth : t.x < 0 ? this._scrollDirection = s.Left : this._scrollDirection = s.None : t.y < 0 ? this._scrollDirection = s.Down : t.y > 0 ? this._scrollDirection = s.Up : this._scrollDirection = s.None;
},
update: function(t) {
this._super(t);
if (this._cellCount !== this._showCellCount && 1 !== this._pageTotal) {
this._getScrollDirection();
this._updateCells();
}
}
});
l._tableView = [];
l.reload = function() {
for (var t in l._tableView) l._tableView[t].reload();
};
l.clear = function() {
for (var t in l._tableView) l._tableView[t].clear();
};
cc._RF.pop();
}, {} ],
