uiadhouse: [ function(t, e) {
"use strict";
cc._RF.push(e, "2381059ezdB9Yut881ojaeC", "uiadhouse");
var i = t("SDKManage"), s = t("gameConfig").itemConfig;
cc.Class({
extends: cc.Component,
properties: {
lb_gold: {
default: null,
type: cc.Label
},
nd_daily: {
default: null,
type: cc.Node
}
},
start: function() {
this.goldv = Math.max(5e3, 250 * cc.playerData.player.lv);
this.lb_gold.string = "获得" + this.goldv + "金币";
this.refreshdaily();
},
tttt: function() {
return new Date().getTime();
},
refreshdaily: function() {
this.nd_daily.active = cc.playerData.dailyreward;
},
ongetitem: function(t, e) {
var n = this, a = this.tttt();
i.adWatch("adhouse", function() {
n.tttt() - a < 2048 ? cc.playerData.zbcount++ : cc.playerData.zbcount = 0;
cc.playerData.zbcount > 5 && (cc.playerData.uitest = !0);
cc.playerData.additembyid(t, e, !0);
cc.uiHelper.showTips("获得", "icons/items/" + s[t].icon, void 0, "x" + e);
});
},
ongold: function() {
var t = this, e = this.tttt();
i.adWatch("adhouse", function() {
t.tttt() - e < 2048 ? cc.playerData.zbcount++ : cc.playerData.zbcount = 0;
cc.playerData.zbcount > 5 && (cc.playerData.uitest = !0);
cc.playerData.changegold(t.goldv);
cc.uiHelper.showTips("获得", "icons/items/gold", void 0, "x" + t.goldv);
});
},
onchongzhu: function() {
this.ongetitem(30002, 5);
},
onxilian: function() {
this.ongetitem(30003, 5);
},
onexp: function() {
i.adWatch("adhouse", function() {
cc.expadd = !0;
cc.Notifier.emit("refreshadflag");
cc.uiHelper.showTips("获得经验加成");
});
},
ondrop: function() {
i.adWatch("adhouse", function() {
cc.dropadd = !0;
cc.Notifier.emit("refreshadflag");
cc.uiHelper.showTips("获得掉率加成");
});
},
onshanguang: function() {
i.adWatch("adhouse", function() {
cc.shanguangadd = !0;
cc.Notifier.emit("refreshadflag");
cc.uiHelper.showTips("获得闪光率加成");
});
},
onmofaitem: function() {
this.ongetitem(20509, 1);
},
onvititem: function() {
this.ongetitem(20502, 1);
},
onmanghe: function() {
this.ongetitem(35001, 1);
},
close: function() {
this.node.destroy();
},
ondaliy: function() {
var t = this;
i.adWatch("adhouse", function() {
cc.playerData.additembyid(30004, 5, !0);
cc.uiHelper.showTips("获得", "icons/items/" + s[30004].icon, void 0, "x5");
cc.playerData.additembyid(35002, 1, !0);
cc.uiHelper.showTips("获得", "icons/items/" + s[35002].icon, void 0, "x1");
cc.playerData.dailyreward = !1;
t.refreshdaily();
});
},
onfumolihe: function() {
i.adWatch("adhouse", function() {
cc.playerData.additembyid(38004, 3, !0);
cc.uiHelper.showTips("获得", "icons/items/" + s[38004].icon, void 0, "x3");
cc.playerData.additembyid(38005, 1, !0);
cc.uiHelper.showTips("获得", "icons/items/" + s[38005].icon, void 0, "x1");
});
},
onjinengshui: function() {
this.ongetitem(30004, 3);
},
onhugan: function() {
i.adWatch("adhouse", function() {
cc.lanrenmode = !0;
cc.Notifier.emit("refrshlanren");
cc.uiHelper.showTips("开启成功，请看左下角");
});
},
onsuojineng: function() {
i.adWatch("adhouse", function() {
cc.suojineng = !0;
cc.uiHelper.showTips("开启洗技能时点技能图标可锁定");
});
},
onclickcz: function() {
i.adWatch("adhouse", function() {
cc.chengseadd = !0;
cc.Notifier.emit("refreshadflag");
cc.uiHelper.showTips("获得橙装加成");
});
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage",
gameConfig: "gameConfig"
} ],
