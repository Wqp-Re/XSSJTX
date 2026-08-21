cellfm: [ function(t, e) {
"use strict";
cc._RF.push(e, "780f8LVWGhDOoNkEFbxDJIV", "cellfm");
t("viewCell");
var i = t("Utils"), s = t("fumocfg"), n = t("enumcfg"), a = n.typename, o = n.enumpropertyname, c = n.qulitycolor, r = t("gameConfig").itemConfig;
cc.Class({
extends: cc.viewCell,
properties: {
lb_name: {
default: null,
type: cc.Label
},
lb_des: {
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
var n = this;
if (t >= e.array.length) this.node.active = !1; else {
this.fid = e.array[t];
var l = s[this.fid];
this.target = e.target;
this.lb_name.node.color = c[l.qulity];
var h = "";
if (l.des) h = l.des; else if (l.property) for (var p = 0; p < l.property.length; p++) {
var d = l.property[p][0], u = "";
if (d > 100) {
d -= 100;
u = "%";
}
var f = Math.floor(l.property[p][1]);
h += o[d].name + "+" + f + u + " ";
}
this.lb_des.string = h;
var g = cc.playerData.getfmcost(l.qulity);
this.nd_cailiao.destroyAllChildren();
this.canfm = !0;
for (var y = function(t) {
var e = g[t][0], s = g[t][1], a = cc.instantiate(n.pb_icon), o = a.getChildByName("sp_icon").getComponent(cc.Sprite), l = a.getComponent(cc.Sprite);
(b = a.getChildByName("lb_count").getComponent(cc.Label)).string = "x" + s;
if (cc.playerData.getitemcountbyid(e) >= s) b.node.color = cc.Color.WHITE; else {
b.node.color = cc.Color.RED;
n.canfm = !1;
}
i.commonicon(e, o, l);
n.nd_cailiao.addChild(a);
var h = r[e];
a.on(cc.Node.EventType.TOUCH_END, function() {
cc.uimain.createnormalinfo(h.name, h.des, "确定", void 0, void 0, c[h.qulity]);
});
}, m = 0; m < g.length; m++) {
var b;
y(m);
}
var v = l.type, k = "";
if (v) if (1 == v) k = "武器"; else for (var _ = 0; _ < l.type.length; _++) {
var w = l.type[_][0], x = l.type[_][1];
k += a[w].sub[x];
k += " ";
} else k = "无限制";
this.lb_name.string = l.name + ":" + k;
}
},
onclick: function() {
this.canfm ? cc.uimain.createfmbag(this.fid) : cc.uiHelper.showTips("材料不足", null, cc.Color.RED);
}
});
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
fumocfg: "fumocfg",
gameConfig: "gameConfig",
viewCell: "viewCell"
} ],
