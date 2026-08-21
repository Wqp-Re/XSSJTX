uinpc: [ function(t, e) {
"use strict";
cc._RF.push(e, "ee8c3ZDjHpNgZWn6L3qYL4i", "uinpc");
var i = t("npccfg");
t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {
pb_xuanxiang: {
default: null,
type: cc.Prefab
},
nd_xuanxiang: {
default: null,
type: cc.Node
},
lb_name: {
default: null,
type: cc.Label
},
lb_des: {
default: null,
type: cc.Label
}
},
start: function() {
this.node.on(cc.Node.EventType.TOUCH_END, function() {
this.overstr = !0;
this.lb_des.string = this.stringarr;
}, this);
},
initdata: function(t) {
var e = i[t];
this.lb_name.string = e.name;
this.stringarr = e.des;
this.lb_des.string = "";
this.sdix = 0;
this.time = .1;
for (var s = 0; s < e.func.length; s++) {
var n;
(n = cc.instantiate(this.pb_xuanxiang)).getChildByName("lb_des").getComponent(cc.Label).string = e.func[s].k;
n.myfunc = e.func[s].f;
n.pf = e.func[s].p;
n.on(cc.Node.EventType.TOUCH_END, this.onclick, this);
this.nd_xuanxiang.addChild(n);
}
(n = cc.instantiate(this.pb_xuanxiang)).getChildByName("lb_des").getComponent(cc.Label).string = "离开";
n.myfunc = 999;
n.on(cc.Node.EventType.TOUCH_END, this.onclick, this);
this.nd_xuanxiang.addChild(n);
},
onclick: function(t) {
var e = t.target.myfunc;
if (1 == e) cc.uimain.createadhouse(); else if (2 == e) cc.uimain.createshop(t.target.pf); else if (3 == e) cc.uimain.createfm(); else if (4 == e) cc.uimain.createtiejiang(); else if (5 == e) cc.uimain.createpet(); else if (6 == e) cc.uimain.createstage(); else if (7 == e) cc.uimain.createronglu(); else if (8 == e) cc.uimain.createsavebank(); else if (9 == e) cc.uimain.createloadbank(); else if (10 == e) cc.uimain.createshopsell(); else if (11 == e) cc.uimain.createxx(); else if (12 == e) cc.uimain.createhc(); else if (13 == e) cc.uimain.callduihuan(); else if (14 == e) {
cc.wujin = !1;
cc.mode1w = !1;
cc.hell = !0;
cc.battling = !0;
cc.director.loadScene("game");
} else if (15 == e) {
cc.wujincount = 0;
cc.wujindijin = 1;
cc.wujin = !0;
cc.hell = !1;
cc.mode1w = !1;
cc.battling = !0;
cc.director.loadScene("game");
} else if (16 == e) {
cc.wujincount = 1e4;
cc.wujindijin = 1;
cc.wujin = !0;
cc.hell = !1;
cc.mode1w = !0;
cc.battling = !0;
cc.director.loadScene("game");
} else 17 == e && cc.uimain.createpetbook();
this.node.destroy();
},
update: function(t) {
if (!this.overstr) {
this.time += t;
if (this.time >= .03) {
if (!this.stringarr[this.sdix]) {
this.overstr = !0;
return;
}
this.lb_des.string = this.lb_des.string + this.stringarr[this.sdix];
this.time = 0;
this.sdix++;
this.sdix % 2 == 0 && cc.soundMgr.playSound("pop1");
}
}
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
npccfg: "npccfg"
} ],
