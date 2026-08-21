talentcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "ec072e656lHo7xMBjSpE+uv", "talentcfg");
var i, s = t("enumcfg"), n = s.enumproperty, a = s.enumgameflag, o = s.enumskilltype, c = ((i = {
1: {
name: "测试",
property: [ [ n.flee, 100 ], [ n.hit, 100 ] ]
},
2: {
name: "刺骨极寒",
qulity: 4,
buffs: [ 1001 ]
},
3: {
name: "灼热地狱",
qulity: 4,
buffs: [ 1003 ]
},
4: {
name: "静电场",
qulity: 4,
buffs: [ 1005 ]
},
5: {
name: "致命深寒",
qulity: 5,
buffs: [ 1002 ]
},
6: {
name: "氧化燃烧",
qulity: 5,
buffs: [ 1004 ]
},
7: {
name: "聚雷针",
qulity: 5,
buffs: [ 1006 ]
},
8: {
name: "移动施法",
flag: a.movemag
},
9: {
name: "施法不打断",
flag: a.hurtmag
},
101: {
name: "刺杀之心",
property: [ [ n.cri, 10 ] ]
},
102: {
name: "闪避之舞",
property: [ [ n.flee, 10 ] ]
},
1001: {
name: "汉室宗亲",
des: "继承了汉皇血脉，各方面都很强大",
qulity: 5,
property: [ [ n.vit, 5 ], [ n.str, 5 ], [ n.int, 5 ], [ n.dex, 5 ], [ n.agi, 5 ], [ n.luk, 5 ] ]
},
1002: {
name: "隐忍",
des: "你是一个能够隐忍的人",
qulity: 2,
property: [ [ n.flee + 100, 3 ] ]
},
1003: {
name: "仁德",
des: "你十分仁慈",
qulity: 3,
property: [ [ n.yongchang, 10 ] ]
},
1004: {
name: "剑道天赋",
des: "拥有绝强的剑道天赋，似乎天生就是用剑的好材料",
qulity: 4,
weaponup: [ o.sword, 15 ]
},
1005: {
name: "扒窃直觉",
des: "做为一个老扒手的直觉",
qulity: 3,
property: [ [ n.hit + 100, 5 ] ]
},
1006: {
name: "精神领袖",
des: "打工是不可能打工的",
qulity: 4,
property: [ [ n.flee + 100, 5 ], [ n.movespeed + 100, 10 ] ]
},
1007: {
name: "凛冬血脉",
des: "拥有强大的凛冬血脉，对寒冰属性的东西有着天生的亲切",
qulity: 4,
weaponup: [ o.cold, 8 ]
},
1008: {
name: "桀骜",
des: "我命由我不由天",
qulity: 3,
property: [ [ n.cri + 100, 3 ] ]
},
1009: {
name: "无双",
des: "天下无双",
qulity: 5,
property: [ [ n.cri + 100, 5 ], [ n.cridmg + 100, 5 ], [ n.flee + 100, 3 ], [ n.hit + 100, 3 ] ]
},
1010: {
name: "刚愎",
des: "为人刚愎残暴！",
qulity: 2,
property: [ [ n.cri + 100, 2 ] ]
},
1011: {
name: "聪慧",
des: "十分聪明",
qulity: 2,
property: [ [ n.exp, 5 ] ]
},
1012: {
name: "医道",
des: "你对医术有很深的了解",
qulity: 1,
property: [ [ n.healdmg, 5 ] ]
},
1013: {
name: "精通医道",
des: "你对医术有更深的了解",
qulity: 3,
property: [ [ n.healdmg, 15 ] ]
},
1014: {
name: "信念",
des: "你拥有十足的信念",
qulity: 1,
property: [ [ n.hit + 100, 1 ] ]
},
1015: {
name: "猫步",
des: "你十分灵敏",
qulity: 2,
property: [ [ n.agi, 5 ], [ n.flee + 2, 2 ] ]
},
1016: {
name: "决心",
des: "拥有难以想象的决心",
qulity: 3,
property: [ [ n.vit, 2 ], [ n.str, 2 ], [ n.int, 2 ], [ n.dex, 2 ], [ n.agi, 2 ], [ n.luk, 2 ] ]
},
1018: {
name: "天遁心法",
des: "学习了蜀山秘法《天遁宝录》上的玄妙功法",
qulity: 4,
property: [ [ n.cri + 100, 5 ] ],
weaponup: [ o.pyh, 5 ]
},
1019: {
name: "宇宙能量",
des: "召唤宇宙的能量加强自身",
qulity: 4,
property: [ [ n.healdmg, 5 ] ],
weaponup: [ o.mag, 5 ]
},
1021: {
name: "残忍",
des: "你变得有些残忍",
qulity: 2,
property: [ [ n.cri + 100, 2 ] ]
}
})[1021] = {
name: "狂热",
des: "你变得似乎有些疯狂",
qulity: 2,
property: [ [ n.cri + 100, 1 ], [ n.agi, 2 ] ]
}, i[1017] = {
name: "疾飞",
des: "你的速度非常之快",
qulity: 3,
property: [ [ n.agi, 10 ] ]
}, i[1020] = {
name: "幸运",
des: "你十分幸运",
qulity: 4,
property: [ [ n.luk, 25 ] ]
}, i[1022] = {
name: "结实",
des: "你变得结实了",
qulity: 3,
property: [ [ n.vit, 10 ] ]
}, i[1023] = {
name: "强壮",
des: "你变得强壮了",
qulity: 3,
property: [ [ n.str, 10 ] ]
}, i[1024] = {
name: "睿智",
des: "你变得睿智了",
qulity: 3,
property: [ [ n.int, 10 ] ]
}, i[1025] = {
name: "灵巧",
des: "你变得灵巧了",
qulity: 3,
property: [ [ n.dex, 10 ] ]
}, i[1026] = {
name: "玩火",
des: "你对火焰的把控更加厉害",
qulity: 3,
weaponup: [ o.fire, 5 ]
}, i[1027] = {
name: "控冰",
des: "你对寒冰的把控更加厉害",
qulity: 3,
weaponup: [ o.cold, 5 ]
}, i[1028] = {
name: "御雷",
des: "你对雷电的把控更加厉害",
qulity: 3,
weaponup: [ o.thunder, 5 ]
}, i[1029] = {
name: "龙族血统",
des: "有着高贵的龙族血统",
qulity: 4,
weaponup: [ o.thunder, 5 ],
buffs: [ 10002 ]
}, i[1030] = {
name: "苍龙之瞳",
des: "有着能够看穿迷惘的龙之瞳",
qulity: 5,
property: [ [ n.cri + 100, 5 ], [ n.hit + 100, 5 ] ]
}, i[1031] = {
name: "苍龙之力",
des: "有着高贵的龙族血统",
qulity: 5,
weaponup: [ o.alldmg, 7 ]
}, i[1032] = {
name: "万人敌",
des: "有着燕人血统，对各种战斗技巧有着特殊的天赋",
qulity: 5,
weaponup: [ o.pyh, 10 ]
}, i[1033] = {
name: "鲁莽",
des: "你是一个鲁莽的人",
qulity: 1,
property: [ [ n.cri + 100, 2 ], [ n.def, -10 ] ]
}, i[1034] = {
name: "强健体魄",
des: "你拥有超人的体魄",
qulity: 1,
property: [ [ n.maxhp, 750 ] ]
}, i[1035] = {
name: "武圣",
des: "忠贞、守义、勇猛！世人尊称为圣！",
qulity: 5,
weaponup: [ o.pyh, 15 ]
}, i[1036] = {
name: "忠义无双",
des: "忠义无双之人！",
qulity: 4,
property: [ [ n.cri + 100, 5 ], [ n.hit + 100, 5 ] ]
}, i[1037] = {
name: "虔诚",
des: "你十分虔诚",
qulity: 2,
property: [ [ n.healdmg, 10 ] ]
}, i[1038] = {
name: "烈焰圣体",
des: "天生对火焰属性有着特殊亲和力，火属性伤害提高10%",
qulity: 5,
weaponup: [ o.fire, 10 ]
}, i[1039] = {
name: "寒冰圣体",
des: "天生对寒冰属性有着特殊亲和力，冰属性伤害提高10%",
qulity: 5,
weaponup: [ o.cold, 10 ]
}, i[1040] = {
name: "雷霆圣体",
des: "天生对雷电属性有着特殊亲和力，雷属性伤害提高10%",
qulity: 5,
weaponup: [ o.thunder, 10 ]
}, i[1041] = {
name: "法神",
des: "移动施法，施法不会被打断",
qulity: 5,
property: [ [ n.matk + 100, 15 ] ],
flag: a.movemag | a.hurtmag
}, i[1042] = {
name: "法师信仰",
des: "施法不会被打断",
qulity: 5,
property: [ [ n.matk + 100, 5 ] ],
flag: a.hurtmag
}, i[1043] = {
name: "霸体",
des: "不会因伤害而硬直",
qulity: 5,
buffs: [ 10005 ]
}, i[1044] = {
name: "移动施法",
des: "移动施法",
qulity: 5,
flag: a.movemag
}, i[1045] = {
name: "回血",
des: "每秒回血",
qulity: 5,
buffs: [ 10005 ]
}, i[2001] = {
name: "野蛮之力",
qulity: 4,
property: [ [ n.cri + 100, 2 ] ],
weaponup: [ o.pyh, 6 ]
}, i[2002] = {
des: "不会被暴击，不会因伤害而硬直",
qulity: 5,
flag: a.notbecri,
buffs: [ 10005 ]
}, i);
e.exports = c;
cc._RF.pop();
}, {
enumcfg: "enumcfg"
} ],
