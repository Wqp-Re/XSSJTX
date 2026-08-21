tileset: [ function(t, e) {
"use strict";
cc._RF.push(e, "de21dJifaxGfaitjMLBgXLj", "tileset");
cc.checktile = function(t, e, i) {
var s = i[t][e], n = !1, a = !1, o = !1, c = !1, r = !1, l = !1, h = !1, p = !1;
i[t - 1] && i[t - 1][e] === s && (n = !0);
i[t + 1] && i[t + 1][e] === s && (a = !0);
i[t][e + 1] === s && (c = !0);
i[t][e - 1] === s && (o = !0);
i[t + 1] && i[t + 1][e + 1] === s && (r = !0);
i[t + 1] && i[t + 1][e - 1] === s && (l = !0);
i[t - 1] && i[t - 1][e + 1] === s && (h = !0);
i[t - 1] && i[t - 1][e - 1] === s && (p = !0);
var d = {
m0: "C",
m1: "C",
m2: "C",
m3: "C"
};
if (n) {
c ? h || (d.m0 = "R_LT") : d.m0 = "T";
o ? p || (d.m2 = "R_LD") : d.m2 = "D";
} else {
d.m0 = c ? "L" : "LT";
d.m2 = o ? "L" : "LD";
}
if (a) {
c ? r || (d.m1 = "R_RT") : d.m1 = "T";
o ? l || (d.m3 = "R_RD") : d.m3 = "D";
} else {
d.m1 = c ? "R" : "RT";
d.m3 = o ? "R" : "RD";
}
return d;
};
cc._RF.pop();
}, {} ],
