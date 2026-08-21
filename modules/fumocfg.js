fumocfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "72563A4W2xBP5rrcnGKFWrf", "fumocfg");
var i = t("enumcfg"), s = i.enumproperty, n = (i.enumgameflag, i.enumskilltype), a = {
1: {
type: 1,
name: "猫鼬",
itemlist: [],
atkbuff: [ 5, 10003 ],
des: "攻击时有一定几率增加120敏捷",
qulity: 5
},
2: {
type: 1,
name: "灵狐",
itemlist: [],
atkbuff: [ 5, 10004 ],
des: "攻击时有一定几率增加120灵巧",
qulity: 5
},
3: {
type: 1,
name: "吸血鬼之触",
itemlist: [],
property: [ [ s.xixue + 100, 30 ] ],
qulity: 5
},
4: {
type: 1,
name: "魔能之源",
itemlist: [],
property: [ [ s.matk + 100, 15 ] ],
qulity: 5
},
5: {
type: 1,
name: "泰坦之力",
itemlist: [],
property: [ [ s.atk + 100, 15 ] ],
qulity: 5
},
101: {
type: [ [ 2, 1 ] ],
name: "杰出属性",
itemlist: [],
property: [ [ s.vit, 6 ], [ s.str, 6 ], [ s.int, 6 ], [ s.dex, 6 ], [ s.agi, 6 ], [ s.luk, 6 ] ],
des: "全属性+6",
qulity: 5
},
102: {
type: [ [ 2, 1 ] ],
name: "铜墙铁壁",
itemlist: [],
property: [ [ s.def + 100, 10 ], [ s.mdef + 100, 10 ] ],
qulity: 5
},
201: {
type: [ [ 2, 2 ] ],
name: "百发百中",
itemlist: [],
property: [ [ s.hit + 100, 5 ] ],
qulity: 5
},
202: {
type: [ [ 2, 2 ] ],
name: "神行百变",
itemlist: [],
property: [ [ s.flee + 100, 5 ] ],
qulity: 5
},
301: {
type: [ [ 2, 3 ] ],
name: "火焰能量",
itemlist: [],
weaponup: [ n.fire, 10 ],
qulity: 5,
des: "火系伤害提高10%"
},
302: {
type: [ [ 2, 3 ] ],
name: "冰霜能量",
itemlist: [],
weaponup: [ n.cold, 10 ],
qulity: 5,
des: "冰系伤害提高10%"
},
303: {
type: [ [ 2, 3 ] ],
name: "雷霆能量",
itemlist: [],
weaponup: [ n.thunder, 10 ],
qulity: 5,
des: "雷系伤害提高10%"
},
304: {
type: [ [ 2, 3 ] ],
name: "剑之力",
itemlist: [],
weaponup: [ n.sword, 10 ],
qulity: 5,
des: "剑系伤害提高10%"
},
305: {
type: [ [ 2, 3 ] ],
name: "弓之技",
itemlist: [],
weaponup: [ n.bow, 10 ],
qulity: 5,
des: "弓系伤害提高10%"
},
401: {
type: [ [ 2, 4 ] ],
name: "野猪之速",
itemlist: [],
property: [ [ s.vit, 9 ], [ s.movespeed + 100, 8 ] ],
qulity: 5
},
402: {
type: [ [ 2, 4 ] ],
name: "豹之迅捷",
itemlist: [],
property: [ [ s.agi, 9 ], [ s.movespeed + 100, 8 ] ],
qulity: 5
},
501: {
type: [ [ 2, 5 ] ],
name: "致命",
itemlist: [],
property: [ [ s.cri, 10 ] ],
qulity: 5
},
1001: {
name: "初级体质",
property: [ [ s.vit, 3 ] ],
qulity: 1
},
1002: {
name: "初级力量",
property: [ [ s.str, 3 ] ],
qulity: 1
},
1003: {
name: "初级智力",
property: [ [ s.int, 3 ] ],
qulity: 1
},
1004: {
name: "初级灵巧",
property: [ [ s.dex, 3 ] ],
qulity: 1
},
1005: {
name: "初级敏捷",
property: [ [ s.agi, 3 ] ],
qulity: 1
},
1006: {
name: "初级幸运",
property: [ [ s.luk, 3 ] ],
qulity: 1
},
1007: {
name: "中级体质",
property: [ [ s.vit, 5 ] ],
qulity: 2
},
1008: {
name: "中级力量",
property: [ [ s.str, 5 ] ],
qulity: 2
},
1009: {
name: "中级智力",
property: [ [ s.int, 5 ] ],
qulity: 2
},
1010: {
name: "中级灵巧",
property: [ [ s.dex, 5 ] ],
qulity: 2
},
1011: {
name: "中级敏捷",
property: [ [ s.agi, 5 ] ],
qulity: 2
},
1012: {
name: "中级幸运",
property: [ [ s.luk, 5 ] ],
qulity: 2
},
1013: {
name: "上级体质",
property: [ [ s.vit, 7 ] ],
qulity: 3
},
1014: {
name: "上级力量",
property: [ [ s.str, 7 ] ],
qulity: 3
},
1015: {
name: "上级智力",
property: [ [ s.int, 7 ] ],
qulity: 3
},
1016: {
name: "上级灵巧",
property: [ [ s.dex, 7 ] ],
qulity: 3
},
1017: {
name: "上级敏捷",
property: [ [ s.agi, 7 ] ],
qulity: 3
},
1018: {
name: "上级幸运",
property: [ [ s.luk, 7 ] ],
qulity: 3
},
1019: {
name: "高级体质",
property: [ [ s.vit, 9 ] ],
qulity: 4
},
1020: {
name: "高级力量",
property: [ [ s.str, 9 ] ],
qulity: 4
},
1021: {
name: "高级智力",
property: [ [ s.int, 9 ] ],
qulity: 4
},
1022: {
name: "高级灵巧",
property: [ [ s.dex, 9 ] ],
qulity: 4
},
1023: {
name: "高级敏捷",
property: [ [ s.agi, 9 ] ],
qulity: 4
},
1024: {
name: "高级幸运",
property: [ [ s.luk, 9 ] ],
qulity: 4
}
};
e.exports = a;
cc._RF.pop();
}, {
enumcfg: "enumcfg"
} ],
