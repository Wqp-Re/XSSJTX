statemachine: [ function(t, e) {
"use strict";
cc._RF.push(e, "fc74fKj4LlJQosPl9s18BCN", "statemachine");
var i = cc.Class({
init: function() {},
cleanup: function() {},
setData: function() {},
onEnter: function() {},
onExit: function() {},
onUpdate: function() {}
});
e.exports = {
state: i,
statemachine: function() {
this.init = function(t) {
this.cleanUp();
this.states = t;
for (var e in this.states) {
this.states[e].statemachine = this;
this.states[e].init();
}
};
this.getprestate = function() {
return this.preState ? this.preState.statename : "";
};
this.getcurrentstatename = function() {
return this.currentState ? this.currentState.statename : "";
};
this.cleanUp = function() {
this.states = {};
this.currentState = null;
this.preState = null;
};
this.switchToState = function(t, e, i) {
var s = this.states[t];
if (s) {
if (i || !this.currentState || this.currentState.statename != s.statename) {
if (this.currentState) {
this.preState = this.currentState;
this.currentState.onExit();
}
this.currentState = s;
this.currentState.onEnter(e);
}
} else console.log(t + " not exit");
};
this.update = function(t) {
this.currentState && this.currentState.onUpdate(t);
};
}
};
cc._RF.pop();
}, {} ],
