battlestates: [ function(t, e) {
"use strict";
cc._RF.push(e, "65c61u12vpDkpmZq4R5uxfM", "battlestates");
var i = t("statemachine").state, s = (t("Utils"), t("enumcfg").enumgameflag), n = cc.Class({
extends: i,
init: function() {
this.statename = "statedie";
},
onEnter: function(t) {
this.target = this.statemachine.target;
this.target.flagdead = !0;
this.target.deadinthisframe = !0;
this.time = this.target.gamelogic.servertime + 3e4;
this.time2 = 30;
this.ispet = t;
},
onUpdate: function(t) {
if (this.ispet && !cc.battlelogic.player.isdead()) {
this.time2 -= t;
this.time2 <= 0 && this.target.reset();
}
}
}), a = cc.Class({
extends: i,
init: function() {
this.statename = "stateyinzhi";
},
onEnter: function(t) {
this.target = this.statemachine.target;
this.target.fangyuing = !1;
this.target.xuliing = !1;
this.time = t;
this.target.yingzhi = !0;
if (this.target.checkhasflat(s.hurtmag) && this.target.yctime > 0) this.needyc = !0; else {
this.needyc = !1;
this.target.yctime = 0;
}
},
onExit: function() {
if (this.target.isplayer && this.target.clickingmoveing) {
this.target.dir.x = this.target.gamelogic.uidir.x;
this.target.dir.y = this.target.gamelogic.uidir.y;
}
this.target.yingzhi = !1;
},
onUpdate: function(t) {
this.time -= t;
this.time <= 0 && this.target.resetstate();
this.needyc && this.target.updateyongchang(t);
}
}), o = cc.Class({
extends: i,
init: function() {
this.statename = "stateidle";
},
onEnter: function() {
this.target = this.statemachine.target;
this.target.yctime > 0 ? this.needyc = !0 : this.needyc = !1;
},
onUpdate: function(t) {
this.needyc && this.target.updateyongchang(t);
this.target.clickingmoveing && this.statemachine.switchToState("statemove");
}
}), c = cc.Class({
extends: i,
init: function() {
this.statename = "statemove";
},
onEnter: function() {
this.target = this.statemachine.target;
if (this.target.checkhasflat(s.movemag) && this.target.yctime > 0) this.needyc = !0; else {
this.target.yctime = 0;
this.needyc = !1;
}
},
onUpdate: function(t) {
if (this.target.clickingmoveing) {
this.needyc && this.target.updateyongchang(t);
this.target.domove(t);
} else this.statemachine.switchToState("stateidle");
}
}), r = cc.Class({
extends: i,
init: function() {
this.statename = "statefollowtarget";
},
onEnter: function(t) {
this.target = this.statemachine.target;
this.time = t.time;
this.tarx = t.x;
this.tary = t.y;
},
onUpdate: function(t) {
Math.abs(this.target.x - this.tarx) < 16 && Math.abs(this.target.y - this.tary) < 16 && (this.time /= 10);
this.time -= t;
this.time <= 0 ? this.target.resetstate() : this.target.domove(t);
}
}), l = cc.Class({
extends: i,
init: function() {
this.statename = "stateyongchang";
},
onEnter: function(t) {
this.target = this.statemachine.target;
this.target.setyc(t.time, t.skill);
this.target.checkhasflat(s.movemag) ? this.needmove = !0 : this.needmove = !1;
this.target.flagyongchang = !0;
},
onExit: function() {},
onUpdate: function(t) {
this.target.clickingmoveing && (this.needmove ? this.target.domove(t) : this.target.resetstate());
this.target.updateyongchang(t) && "stateyinzhi" != this.statemachine.getcurrentstatename() && this.target.resetstate();
}
});
e.exports = {
statedie: n,
stateyinzhi: a,
stateidle: o,
statemove: c,
statefollowtarget: r,
stateyongchang: l
};
cc._RF.pop();
}, {
Utils: "Utils",
enumcfg: "enumcfg",
statemachine: "statemachine"
} ],
