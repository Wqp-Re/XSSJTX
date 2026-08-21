ysxieyi: [ function(t, e) {
"use strict";
cc._RF.push(e, "fd55bYFmZZO37MWoxuFAG7U", "ysxieyi");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {
pb_ys: {
default: null,
type: cc.Prefab
},
nd_add: {
default: null,
type: cc.Node
}
},
start: function() {
i.needys() ? this.node.active = !0 : this.node.active = !1;
},
onclick: function() {
var t = cc.instantiate(this.pb_ys);
t.getComponent("uiys").setmode2();
this.nd_add.addChild(t);
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ]
}, {}, [ "cpa", "wxshow", "DonotDestroy", "avatar", "pbxingxiang", "uixingxiang", "cellys", "avatarcfg", "buffcfg", "bulletcfg", "dropcfg", "duihuancfg", "effanicfg", "enumcfg", "fumocfg", "itemcfg", "lootcfg", "monstercfg", "npccfg", "peifangcfg", "petbookcfg", "setcfg", "skillcfg", "skincfg", "stagecfg", "talentcfg", "debugbox", "bulletdisplay", "dmglb", "frameani", "gameManager", "gameUI", "gameloot", "gamenewbie", "moveprefab", "pbautotile", "pbbufficon", "pbdrop", "pbwarning", "playerctrl", "tileset", "weapondisplay", "followweapon", "gameres", "Joystick", "JoystickBG", "JoystickCommon", "buffobj", "bulletobj", "dragonobj", "dropobj", "gameai", "gamelogic", "gamevaule", "lootobj", "npcobj", "skillobj", "battlestates", "statemachine", "gameConfig", "luping", "atlasmgr", "charobj", "equipobj", "itemobj", "petobj", "talentobj", "playerData", "sceneguaji", "addbanner", "addchaping", "delayshow", "hideyuansheng", "hutui9gong", "hutuibanner", "tianjiazhuomian", "ysad", "SDKManage", "sdkanzhuo", "sdkhuawei", "sdkoppo", "sdkvivo", "sdkwx", "sdkzj", "syshow", "tips", "CCActionAdd", "Notifier", "Utils", "httpcli", "httpclient", "notification", "signals", "storage", "urlbuilder", "perlinnoise", "quadtree", "tableView", "viewCell", "testmove", "wxVoice", "UILogin", "UIPetChose", "cellbag", "cellequipskill", "cellfm", "cellhc", "celllearnskill", "cellpet", "cellpetbook", "cellshop", "cellstage", "messagebox", "pbjiadian", "skillpet", "uiMain", "uiRole", "uiadhouse", "uibag", "uibank", "uiduihuan", "uiequipskill", "uifm", "uihc", "uiitemdetail", "uijiadian", "uilearnskill", "uinormalitem", "uinpc", "uipet", "uipetbook", "uiplayerctrl", "uisetting", "uishop", "uiskillicon", "uistage", "uistart", "uitiejiang", "uiHelper", "uiys", "uizuobi", "ysxieyi", "test2", "testview" ]);