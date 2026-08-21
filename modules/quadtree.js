quadtree: [ function(t, e) {
"use strict";
cc._RF.push(e, "e0b7ey8Hx5FcoCADRWKo9YI", "quadtree");
function i(t, e, i, s) {
this.max_objects = e || 10;
this.max_levels = i || 4;
this.level = s || 0;
this.bounds = t;
this.objects = [];
this.nodes = [];
}
i.prototype.split = function() {
var t = this.level + 1, e = this.bounds.width / 2, s = this.bounds.height / 2, n = this.bounds.x, a = this.bounds.y;
this.nodes[0] = new i({
x: n + e,
y: a,
width: e,
height: s
}, this.max_objects, this.max_levels, t);
this.nodes[1] = new i({
x: n,
y: a,
width: e,
height: s
}, this.max_objects, this.max_levels, t);
this.nodes[2] = new i({
x: n,
y: a + s,
width: e,
height: s
}, this.max_objects, this.max_levels, t);
this.nodes[3] = new i({
x: n + e,
y: a + s,
width: e,
height: s
}, this.max_objects, this.max_levels, t);
};
i.prototype.getIndex = function(t) {
var e = [], i = this.bounds.x + this.bounds.width / 2, s = this.bounds.y + this.bounds.height / 2, n = t.y < s, a = t.x < i, o = t.x + t.width > i, c = t.y + t.height > s;
n && o && e.push(0);
a && n && e.push(1);
a && c && e.push(2);
o && c && e.push(3);
return e;
};
i.prototype.insert = function(t) {
var e, i = 0;
if (this.nodes.length) {
e = this.getIndex(t);
for (i = 0; i < e.length; i++) this.nodes[e[i]].insert(t);
} else {
this.objects.push(t);
if (this.objects.length > this.max_objects && this.level < this.max_levels) {
this.nodes.length || this.split();
for (i = 0; i < this.objects.length; i++) {
e = this.getIndex(this.objects[i]);
for (var s = 0; s < e.length; s++) this.nodes[e[s]].insert(this.objects[i]);
}
this.objects = [];
}
}
};
i.prototype.retrieve = function(t) {
var e = this.getIndex(t), i = this.objects;
if (this.nodes.length) for (var s = 0; s < e.length; s++) i = i.concat(this.nodes[e[s]].retrieve(t));
return i = i.filter(function(t, e) {
return i.indexOf(t) >= e;
});
};
i.prototype.clear = function() {
this.objects = [];
for (var t = 0; t < this.nodes.length; t++) this.nodes.length && this.nodes[t].clear();
this.nodes = [];
};
function s(t, e) {
return t.x >= e.x && t.x + width <= e.x + e.width && t.y >= e.y && t.y + t.height <= e.y + e.height;
}
i.prototype.refresh = function(t) {
var e, i, n, a, o = this.objects;
t = t || this;
for (n = o.length - 1; n >= 0; n--) {
e = o[n];
i = this.getIndex(e);
s(e, this.bounds) ? this.nodes.length && this.nodes[i].insert(o.splice(n, 1)[0]) : this !== t && t.insert(o.splice(n, 1)[0]);
}
for (n = 0, a = this.nodes.length; n < a; n++) this.nodes[n].refresh(t);
};
e.exports = i;
cc._RF.pop();
}, {} ],
