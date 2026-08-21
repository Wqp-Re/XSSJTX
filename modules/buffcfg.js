buffcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "16dbe3EJahNCrqQkB3oax5t", "buffcfg");
var i = t("enumcfg"), s = i.enumskilltype, n = i.enumproperty, a = {
notatk: 1,
notmove: 2,
rush: 4,
rushnotarget: 8,
notani: 16,
beatkover: 32,
wudi: 64,
fying: 128,
bati: 256
}, o = {
1: {
buff_effect: a.notatk | a.notmove,
life: 3,
shadow: !0,
mohu: !0
},
2: {
buff_effect: 3,
life: 5,
res: "eff33"
},
3: {
count: 30,
life: 10,
icon: "buff1"
},
4: {
count: 50,
life: 5,
icon: "buff3"
},
5: {
buff_effect: a.rush,
life: 999,
removebullet: 1001,
rani: !0,
res: "eff43",
resfz: !0
},
6: {
buff_effect: a.rushnotarget | a.notmove,
life: .2,
rani: !0,
shadow: !0
},
7: {
life: 3,
mohu: !0,
timescale: .3
},
8: {
buff_effect: a.notatk | a.notmove | a.notani | a.beatkover,
life: 5,
icon: "buff3",
res: "eff47"
},
9: {
name: "中毒",
life: 3.1,
mdmg: 10,
hurttime: 1,
count: 10
},
10: {
name: "流血",
life: 3.1,
admg: 10,
hurttime: 1,
count: 10
},
11: {
name: "圣盾",
life: 10,
icon: "icons_full_16_205",
propertys: [ [ n.def + 100, 15 ], [ n.mdef + 100, 15 ] ]
},
12: {
name: "初级恢复",
life: 10,
res: "eff86",
aniduli: !0,
healpre: 3
},
13: {
name: "初级治疗",
life: .01,
res: "eff87",
aniduli: !0,
heal: 100
},
14: {
name: "boss圣盾",
life: 10,
icon: "icons_full_16_205",
propertys: [ [ n.def + 100, 100 ], [ n.mdef + 100, 100 ] ]
},
15: {
name: "圣盾",
life: 10,
icon: "icons_full_16_205",
propertys: [ [ n.def + 100, 30 ], [ n.mdef + 100, 30 ] ]
},
16: {
name: "恢复",
life: 10,
res: "eff86",
aniduli: !0,
healpre: 6
},
17: {
name: "治疗",
life: .01,
res: "eff87",
aniduli: !0,
heal: 200
},
1001: {
name: "刺骨极寒常驻",
count: 1,
life: 99999999,
hitskilltype: s.cold,
hitbuff: [ [ 2001, 100 ] ]
},
2001: {
name: "刺骨极寒",
count: 8,
life: 8,
icon: "buff4",
propertys: [ [ n.mdef + 100, -10 ] ]
},
1002: {
name: "致命深寒常驻",
count: 1,
life: 99999999,
buffdmgup: [ 2001, 100 ]
},
1003: {
name: "灼热地狱常驻",
count: 1,
life: 99999999,
hitskilltype: s.fire,
hitbuff: [ [ 2003, 70 ] ]
},
2003: {
name: "灼烧",
life: 8,
icon: "buff1",
mdmg: 100,
hurttime: 1,
count: 10,
hurtcreatebullet: [ 1004, 1001, 50, 5 ]
},
1004: {
name: "氧化燃烧常驻",
count: 1,
life: 99999999
},
1005: {
name: "静电场常驻",
count: 1,
life: 99999999,
hitskilltype: s.thunder,
buffaddgailv: [ 1006, 50 ],
hitbuff: [ [ 2005, 50 ] ]
},
2005: {
name: "静电场",
count: 4,
life: 10,
icon: "buff5",
savehurt: [ 24, 10 ],
beatkcreatebullet: [ 1006, 24, 15, 5 ]
},
1006: {
name: "聚雷针常驻",
count: 1,
life: 99999999
},
1007: {
name: "流血常驻",
count: 1,
life: 99999999,
hitskilltype: s.sword,
hitbuff: [ [ 2007, 100 ] ]
},
2007: {
name: "流血",
life: 3.1,
icon: "buff9",
admg: 10,
hurttime: 1,
count: 10
},
1008: {
name: "浴血奋战常驻",
count: 1,
life: 99999999,
buffdmgup: [ 2007, 100 ]
},
2008: {
name: "浴血奋战",
count: 10,
life: 3
},
1009: {
name: "荆棘皮肤常驻",
count: 1,
life: 99999999,
beatkfanshang: 500
},
1010: {
name: "物防为准",
count: 1,
life: 99999999,
onlywdef: 1,
fanshangxishou: !0
},
1011: {
name: "闪避时增加移动速度",
count: 1,
life: 99999999,
onmissbuff: [ 2011, 50 ]
},
2011: {
name: "闪避加移动速度",
icon: "buff8",
life: 3
},
3001: {
name: "闪避光环",
life: 1,
propertys: [ [ n.flee, 150 ] ],
res: "buff2",
resdown: 1
},
3002: {
name: "暴击光环",
life: 1,
propertys: [ [ n.cri, 30 ] ],
res: "buff3",
resdown: 1
},
3003: {
name: "吸血光环",
life: 1,
propertys: [ [ n.xixue, 30 ] ],
res: "buff5",
resdown: 1
},
3004: {
name: "命中光环",
life: 1,
propertys: [ [ n.hit, 150 ] ],
res: "buff4",
resdown: 1
},
3005: {
name: "回复光环",
life: 1,
healpre: 1,
res: "buff1",
resdown: 1
},
3006: {
name: "格挡",
life: 1,
dmgbili: .4,
needweapon: s.sword
},
3007: {
name: "神闪",
life: 1,
spshanbi: 1,
needweapon: s.bow
},
3008: {
name: "魔力暴走",
life: 1,
nocd: 15,
needweapon: s.staff,
deadbuff: 4007,
deadbuffcd: 10
},
10001: {
name: "治疗",
life: .01,
res: "eff87",
aniduli: !0,
heal: 500
},
10002: {
name: "每秒回血",
life: 99999999,
healpre: 1
},
10003: {
name: "猫鼬",
life: 3,
propertys: [ [ n.agi, 120 ] ]
},
10004: {
name: "灵狐",
life: 3,
propertys: [ [ n.dex, 120 ] ]
},
10005: {
name: "霸体",
life: 99999999,
buff_effect: a.bati
},
101: {
rotatemode: 1,
life: 1,
buff_effect: a.notatk
},
102: {
buff_effect: a.notatk | a.notmove | a.wudi | a.fying,
life: 3,
res: "eff85"
},
103: {
name: "闪光",
life: .01,
res: "eff88",
aniduli: !0
},
104: {
rotatemode: 1,
life: 1,
buff_effect: a.notatk,
propertys: [ [ n.movespeed + 100, 30 ] ]
},
4001: {
name: "自然之友",
count: 1,
life: 99999999,
firendbuff: 4002
},
4002: {
name: "自然之友",
count: 1,
life: 1.5,
propertys: [ [ n.matk + 100, 50 ], [ n.atk + 100, 50 ], [ n.def + 100, 50 ], [ n.mdef + 100, 50 ] ]
},
4003: {
name: "自然之友2",
count: 1,
life: 99999999,
firendbuff: 4004
},
4004: {
name: "自然之友2",
count: 1,
life: 1.5,
propertys: [ [ n.matk + 100, 100 ], [ n.atk + 100, 100 ], [ n.def + 100, 100 ], [ n.mdef + 100, 100 ] ]
},
4005: {
name: "兽王常驻",
count: 1,
life: 99999999,
cribuff: 4006
},
4006: {
name: "兽王暴伤",
count: 99999,
life: 8,
propertys: [ [ n.cridmg + 100, 10 ] ]
},
4007: {
buff_effect: a.wudi,
life: 3,
res: "eff93"
},
4008: {
name: "无视防御",
count: 1,
life: 99999999,
skipdef: !0
},
4009: {
name: "闪避时增加移动速度",
count: 1,
life: 99999999,
onmissbuff: [ 4010, 100 ]
},
4010: {
buff_effect: a.beatkover,
name: "闪避增加伤害",
count: 100,
life: 99999,
propertys: [ [ n.atk + 100, 20 ], [ n.matk + 100, 20 ] ]
},
4011: {
buff_effect: a.wudi,
life: 10
},
4012: {
name: "fenshen",
life: 1,
fenshen: 5,
needweapon: s.sword,
propertyszhuanshen: [ [ n.atk + 100, 80 ] ]
},
4013: {
name: "荆棘皮肤常驻",
count: 1,
life: 99999999,
beatkfanshang: 25e3
},
4014: {
name: "兽王常驻",
count: 1,
life: 99999999,
cribuff: 4015
},
4015: {
name: "兽王暴伤",
count: 99999,
life: 8,
propertys: [ [ n.cridmg + 100, 25 ] ]
},
4016: {
name: "闪避时增加移动速度",
count: 1,
life: 99999999,
onmissbuff: [ 4017, 100 ]
},
4017: {
buff_effect: a.beatkover,
name: "闪避增加伤害",
count: 1e8,
life: 99999,
propertys: [ [ n.atk + 100, 35 ], [ n.matk + 100, 35 ] ]
},
4018: {
name: "神技闪",
life: 1,
spshanbi2: 1,
needweapon: s.bow,
propertyszhuanshen: [ [ n.flee + 100, 100 ] ]
},
4019: {
name: "法神技",
life: 1,
needweapon: s.staff,
autochange: 1,
propertyszhuanshen: [ [ n.maxhp + 100, 50 ] ]
}
};
e.exports = {
buffcfg: o,
effenum: a
};
cc._RF.pop();
}, {
enumcfg: "enumcfg"
} ],
