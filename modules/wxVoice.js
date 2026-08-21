wxVoice: [ function(t, e) {
"use strict";
cc._RF.push(e, "318b8IV5lJAza+Q8i8CY7X1", "wxVoice");
var i = new (cc.Class({
init: function() {},
onclicksound: function() {
cc.notSound = !cc.notSound;
cc.notSound ? cc.audioEngine.setMusicVolume(0) : cc.audioEngine.setMusicVolume(1);
},
playSound: function(t, e) {
null == t || cc.notSound || this.playSound2(t, e);
},
xiuzhengbgm: function() {
if (this.bgm) {
var t = 1;
cc.notSound && (t = 0);
cc.audioEngine.setMusicVolume(t);
}
},
playbgm: function(t) {
this.bgmurl = t;
var e = this;
cc.resources.load("sounds/" + t, cc.AudioClip, null, function(t, i) {
t || (e.audioID = cc.audioEngine.playMusic(i, !0));
});
},
stopbgm: function() {
cc.audioEngine.stopMusic();
},
playSound2: function(t) {
cc.resources.load("sounds/" + t, cc.AudioClip, null, function(t, e) {
t || cc.audioEngine.playEffect(e, !1);
});
},
adwatching: function() {
this.stopbgm();
this.ading = !0;
},
adwatchover: function() {
this.bgmurl && this.playbgm(this.bgmurl);
this.ading = !1;
}
}))();
i.init();
cc.soundMgr = i;
e.exports = i;
cc._RF.pop();
}, {} ],
