uisetting: [ function(t, e) {
"use strict";
cc._RF.push(e, "3c225Bks5FNsqDb76o/cNg0", "uisetting");
var i = t("SDKManage");
cc.Class({
extends: cc.Component,
properties: {
tg_sound: {
default: null,
type: cc.Toggle
},
tg_ani: {
default: null,
type: cc.Toggle
},
tg_dmg: {
default: null,
type: cc.Toggle
},
tg_autosell: {
default: null,
type: cc.Toggle
}
},
onLoad: function() {
this.tg_sound.isChecked = !cc.notSound;
this.tg_ani.isChecked = !cc.notani;
this.tg_dmg.isChecked = !cc.nodmglb;
this.tg_autosell.isChecked = cc.autosell;
        try { this.scheduleOnce(this._initSpeedBtn.bind(this), 0.1); } catch (e) {}
},
clicksound: function() {
cc.soundMgr.onclicksound();
},
clickani: function() {
cc.notani = !cc.notani;
},
clickdmg: function() {
cc.nodmglb = !cc.nodmglb;
},
clicksell: function() {
cc.autosell = !cc.autosell;
},

        
        
        _initSpeedBtn: function() {
            try {
                this.speedarr = [1, 2, 5, 10, 50, 100];
                this.speedidx = 0;
                var self = this;
                var canvas = cc.find("Canvas");
                if (!canvas) return;
                var snd = new cc.Node("SpeedBtn");
                snd.parent = canvas;
                var size = cc.view.getVisibleSize();
                snd.setPosition(cc.v2(0, -size.height / 2 + 70));
                snd.setLocalZOrder(99999);
                // 背景 (try/catch 保护, 失败不影响)
                try {
                    var gr = snd.addComponent(cc.Graphics);
                    gr.fillColor = cc.color(30, 60, 120, 230);
                    gr.strokeColor = cc.color(0, 200, 255, 255);
                    gr.lineWidth = 3;
                    if (gr.roundRect) gr.roundRect(-90, -28, 180, 56, 12);
                    else gr.rect(-90, -28, 180, 56);
                    gr.fill();
                    gr.stroke();
                } catch (e) {}
                var lb = snd.addComponent(cc.Label);
                lb.string = "战斗加速 1x";
                lb.fontSize = 26;
                lb.lineHeight = 34;
                lb.color = cc.color(0, 230, 255, 255);
                snd.addComponent(cc.Button);
                snd.on(cc.Node.EventType.TOUCH_END, function() {
                    self.speedidx = (self.speedidx + 1) % self.speedarr.length;
                    var sp = self.speedarr[self.speedidx];
                    cc.kSpeed(sp);
                    lb.string = "战斗加速 " + sp + "x";
                    if (cc.uiHelper && cc.uiHelper.showTips) cc.uiHelper.showTips("战斗加速 " + sp + "x");
                }, this);
                this.speedbtn = snd;
                this.speedlb = lb;
            } catch (e) {
                // 静默失败, 绝不影响设置界面
            }
        },



close: function() {
this.node.destroy();
},
cloudsave: function() {
var t = cc.playerData.savedata();
t && i.savecloud(t);
},
cloudload: function() {
i.loadcloud();
}
});
cc._RF.pop();
}, {
SDKManage: "SDKManage"
} ]