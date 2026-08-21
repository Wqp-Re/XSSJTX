cellhc: [ function(t, e) {
"use strict";
cc._RF.push(e, "08af0rVLnVFpLO20EvI8RnQ", "cellhc");
t("viewCell");
var i = t("gameConfig"), s = i.itemConfig, n = i.peifangcfg, a = t("Utils"), o = t("enumcfg"), c = (o.typename, 
o.enumpropertyname, o.qulitycolor);
cc.Class({
extends: cc.viewCell,
properties: {
lb_name: {
default: null,
type: cc.Label
},
nd_cailiao: {
default: null,
type: cc.Node
},
pb_icon: {
default: null,
type: cc.Prefab
}
},
init: function(t, e) {
var i = this;
if (t >= e.array.length) this.node.active = !1; else {
this.fid = e.array[t];
var o = n[this.fid], r = s[o.item];
this.target = e.target;
this.lb_name.string = r.name;
this.lb_name.node.color = c[r.qulity];
this.item = r;
this.cfg = o;
var l = o.cost;
this.nd_cailiao.destroyAllChildren();
this.canfm = !0;
this.strnode = [];
for (var h = function(t) {
var e = l[t][0], n = l[t][1], o = cc.instantiate(i.pb_icon), r = o.getChildByName("sp_icon").getComponent(cc.Sprite), h = o.getComponent(cc.Sprite);
d = o.getChildByName("lb_count").getComponent(cc.Label);
i.strnode.push(d);
d.string = "x" + n;
if (cc.playerData.getitemcountbyid(e) >= n) d.node.color = cc.Color.WHITE; else {
d.node.color = cc.Color.RED;
i.canfm = !1;
}
a.commonicon(e, r, h);
i.nd_cailiao.addChild(o);
var p = s[e];
o.on(cc.Node.EventType.TOUCH_END, function() {
cc.uimain.createnormalinfo(p.name, p.des, "确定", void 0, void 0, c[p.qulity]);
});
}, p = 0; p < l.length; p++) {
var d;
h(p);
}
}
},
refreshcount: function() {
var t = this.cfg.cost;
this.canfm = !0;
for (var e = 0; e < t.length; e++) {
var i = t[e][0], s = t[e][1], n = this.strnode[e];
n.string = "x" + s;
if (cc.playerData.getitemcountbyid(i) >= s) n.node.color = cc.Color.WHITE; else {
n.node.color = cc.Color.RED;
this.canfm = !1;
}
}
},
onclick: function() {
if (this.canfm) {
cc.playerData.dohecheng(this.fid);
cc.uiHelper.showTips("获得", "icons/items/" + this.item.icon, void 0, "x1");
cc.Notifier.emit("refreshequip");
} else cc.uiHelper.showTips("材料不足", null, cc.Color.RED);
}
});
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
gameConfig: "gameConfig",
viewCell: "viewCell"
} ],
