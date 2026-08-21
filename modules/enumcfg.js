enumcfg: [ function(t, e) {
"use strict";
cc._RF.push(e, "03939K6Ld1KjbGM2y1Q+lwO", "enumcfg");
var i = {
cold: 1,
fire: 2,
thunder: 4,
sword: 8,
bow: 16,
staff: 32
};
i.pyh = i.bow | i.sword;
i.mag = i.cold | i.fire | i.thunder;
i.alldmg = i.pyh | i.mag;
var s = {};
s[i.cold] = {
name: "冰系伤害",
color: new cc.Color(0, 245, 255)
};
s[i.fire] = {
name: "火系伤害",
color: new cc.Color(255, 75, 0)
};
s[i.thunder] = {
name: "雷系伤害",
color: new cc.Color(245, 255, 0)
};
s[i.sword] = {
name: "剑系伤害",
color: new cc.Color(0, 255, 100)
};
s[i.bow] = {
name: "弓系伤害",
color: new cc.Color(0, 255, 100)
};
s[i.pyh] = {
name: "物理伤害",
color: new cc.Color(100, 0, 255)
};
s[i.mag] = {
name: "元素伤害",
color: new cc.Color(255, 0, 255)
};
s[i.alldmg] = {
name: "全系伤害",
color: new cc.Color(0, 0, 0)
};
var n = {
vit: 1,
str: 2,
dex: 3,
agi: 4,
int: 5,
luk: 6,
movespeed: 7,
maxhp: 8,
atk: 9,
matk: 10,
datk: 11,
vatk: 12,
def: 13,
mdef: 14,
hit: 15,
flee: 16,
atkspeed: 17,
cri: 18,
xixue: 19,
yongchang: 20,
cridmg: 21,
gainexp: 22,
healdmg: 23
}, a = {};
a[n.vit] = {
name: "体质",
color: new cc.Color(240, 255, 20)
};
a[n.str] = {
name: "力量",
color: new cc.Color(240, 255, 20)
};
a[n.int] = {
name: "智力",
color: new cc.Color(240, 255, 20)
};
a[n.dex] = {
name: "灵巧",
color: new cc.Color(240, 255, 20)
};
a[n.agi] = {
name: "敏捷",
color: new cc.Color(240, 255, 20)
};
a[n.luk] = {
name: "幸运",
color: new cc.Color(240, 255, 20)
};
a[n.movespeed] = {
name: "移速",
color: cc.Color.WHITE
};
a[n.maxhp] = {
name: "生命",
color: cc.Color.WHITE
};
a[n.atk] = {
name: "攻击",
color: cc.Color.WHITE
};
a[n.matk] = {
name: "魔攻",
color: cc.Color.WHITE
};
a[n.datk] = {
name: "",
color: cc.Color.WHITE
};
a[n.vatk] = {
name: "",
color: cc.Color.WHITE
};
a[n.def] = {
name: "防御",
color: cc.Color.WHITE
};
a[n.mdef] = {
name: "魔防",
color: cc.Color.WHITE
};
a[n.hit] = {
name: "命中",
color: cc.Color.WHITE
};
a[n.flee] = {
name: "闪避",
color: cc.Color.WHITE
};
a[n.atkspeed] = {
name: "攻速",
color: cc.Color.WHITE
};
a[n.cri] = {
name: "暴击",
color: cc.Color.WHITE
};
a[n.xixue] = {
name: "吸血",
color: cc.Color.WHITE
};
a[n.yongchang] = {
name: "咏唱",
color: cc.Color.WHITE
};
a[n.cridmg] = {
name: "爆伤",
color: cc.Color.WHITE
};
a[n.gainexp] = {
name: "",
color: cc.Color.WHITE
};
a[n.healdmg] = {
name: "",
color: cc.Color.WHITE
};
var o = [ null, new cc.Color(255, 255, 255), new cc.Color(0, 255, 0), new cc.Color(0, 100, 255), new cc.Color(155, 0, 255), new cc.Color(255, 155, 0), new cc.Color(255, 0, 80), new cc.Color(255, 60, 220) ];
e.exports = {
enumskilltype: i,
enumproperty: n,
enumequipos: {
weapon1: 0,
weapon2: 1,
weapon3: 2,
body: 3,
head: 4,
hand: 5,
shose: 6,
kuzi: 7,
ring: 8,
crystal: 9,
count: 10
},
enumgameflag: {
movemag: 1,
hurtmag: 2,
notbecri: 4
},
enumobjtype: {
npcobj: 1,
lootobj: 2,
bulletobj: 3,
dropobj: 4,
dragonobj: 99,
warningobj: 100
},
qulitycolor: o,
qulityname: [ "", "普通", "优秀", "精良", "罕见", "传说", "远古", "太古" ],
typename: {
1: {
name: "武器",
sub: {
1: "剑",
2: "弓",
3: "法杖"
}
},
2: {
name: "防具",
sub: {
1: "护甲",
2: "头盔",
3: "护手",
4: "鞋子",
5: "护腿",
6: "饰品",
7: "水晶"
}
}
},
enumpropertyname: a,
enumskilltypename: s,
enumproperty2: {
1: "vit",
2: "str",
3: "dex",
4: "agi",
5: "int",
6: "luk"
}
};
cc._RF.pop();
}, {} ],
