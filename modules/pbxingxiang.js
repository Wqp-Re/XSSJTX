pbxingxiang: [ function(t, e) {
"use strict";
cc._RF.push(e, "c3a23WAGnJKdJ4MrYnmNqdS", "pbxingxiang");
cc.Class({
extends: cc.Component,
properties: {
lb_des: {
default: null,
type: cc.Label
},
lb_index: {
default: null,
type: cc.Label
}
},
initdata: function(t, e, i) {
this.lidx = t;
this.nowidx = 0;
this.totalcount = e;
this.lb_des.string = i;
this.node.active = 0 != e;
this.lb_index.string = this.nowidx;
},
refresh: function() {
this.lb_index.string = this.nowidx;
cc.Notifier.emit("xarrchange", {
idx: this.lidx,
v: this.nowidx
});
},
clickm: function() {
this.nowidx--;
this.nowidx < 0 && (this.nowidx = this.totalcount);
this.refresh();
},
clicka: function() {
this.nowidx++;
this.nowidx > this.totalcount && (this.nowidx = 0);
this.refresh();
},
refreshidx: function(t) {
this.nowidx = t;
this.lb_index.string = this.nowidx;
}
});
cc._RF.pop();
}, {} ],
