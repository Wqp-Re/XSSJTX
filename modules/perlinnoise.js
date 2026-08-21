perlinnoise: [ function(t, e) {
"use strict";
cc._RF.push(e, "0dd7alMV3dFpIZ/WzZDyNIG", "perlinnoise");
function i(t, e, i) {
this.x = t;
this.y = e;
this.z = i;
}
i.prototype.dot2 = function(t, e) {
return this.x * t + this.y * e;
};
i.prototype.dot3 = function(t, e, i) {
return this.x * t + this.y * e + this.z * i;
};
var s = [ new i(1, 1, 0), new i(-1, 1, 0), new i(1, -1, 0), new i(-1, -1, 0), new i(1, 0, 1), new i(-1, 0, 1), new i(1, 0, -1), new i(-1, 0, -1), new i(0, 1, 1), new i(0, -1, 1), new i(0, 1, -1), new i(0, -1, -1) ], n = [ 151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180 ], a = function() {
this.perm = new Array(512);
this.gradP = new Array(512);
};
a.prototype.seed = function(t) {
t > 0 && t < 1 && (t *= 65536);
(t = Math.floor(t)) < 256 && (t |= t << 8);
for (var e = 0; e < 256; e++) {
var i;
i = 1 & e ? n[e] ^ 255 & t : n[e] ^ t >> 8 & 255;
this.perm[e] = this.perm[e + 256] = i;
this.gradP[e] = this.gradP[e + 256] = s[i % 12];
}
};
var o = .5 * (Math.sqrt(3) - 1), c = (3 - Math.sqrt(3)) / 6;
a.prototype.simplex2 = function(t, e) {
var i, s, n = (t + e) * o, a = Math.floor(t + n), r = Math.floor(e + n), l = (a + r) * c, h = t - a + l, p = e - r + l;
if (h > p) {
i = 1;
s = 0;
} else {
i = 0;
s = 1;
}
var d = h - i + c, u = p - s + c, f = h - 1 + 2 * c, g = p - 1 + 2 * c;
a &= 255;
r &= 255;
var y = this.gradP[a + this.perm[r]], m = this.gradP[a + i + this.perm[r + s]], b = this.gradP[a + 1 + this.perm[r + 1]], v = .5 - h * h - p * p, k = .5 - d * d - u * u, _ = .5 - f * f - g * g;
return 70 * ((v < 0 ? 0 : (v *= v) * v * y.dot2(h, p)) + (k < 0 ? 0 : (k *= k) * k * m.dot2(d, u)) + (_ < 0 ? 0 : (_ *= _) * _ * b.dot2(f, g)));
};
a.prototype.simplex3 = function(t, e, i) {
var s, n, a, o, c, r, l = (t + e + i) * (1 / 3), h = Math.floor(t + l), p = Math.floor(e + l), d = Math.floor(i + l), u = (h + p + d) * (1 / 6), f = t - h + u, g = e - p + u, y = i - d + u;
if (f >= g) if (g >= y) {
s = 1;
n = 0;
a = 0;
o = 1;
c = 1;
r = 0;
} else if (f >= y) {
s = 1;
n = 0;
a = 0;
o = 1;
c = 0;
r = 1;
} else {
s = 0;
n = 0;
a = 1;
o = 1;
c = 0;
r = 1;
} else if (g < y) {
s = 0;
n = 0;
a = 1;
o = 0;
c = 1;
r = 1;
} else if (f < y) {
s = 0;
n = 1;
a = 0;
o = 0;
c = 1;
r = 1;
} else {
s = 0;
n = 1;
a = 0;
o = 1;
c = 1;
r = 0;
}
var m = f - s + 1 / 6, b = g - n + 1 / 6, v = y - a + 1 / 6, k = f - o + 1 / 6 * 2, _ = g - c + 1 / 6 * 2, w = y - r + 1 / 6 * 2, x = f - 1 + .5, C = g - 1 + .5, S = y - 1 + .5;
h &= 255;
p &= 255;
d &= 255;
var q = this.gradP[h + this.perm[p + this.perm[d]]], M = this.gradP[h + s + this.perm[p + n + this.perm[d + a]]], D = this.gradP[h + o + this.perm[p + c + this.perm[d + r]]], F = this.gradP[h + 1 + this.perm[p + 1 + this.perm[d + 1]]], T = .6 - f * f - g * g - y * y, N = .6 - m * m - b * b - v * v, j = .6 - k * k - _ * _ - w * w, R = .6 - x * x - C * C - S * S;
return 32 * ((T < 0 ? 0 : (T *= T) * T * q.dot3(f, g, y)) + (N < 0 ? 0 : (N *= N) * N * M.dot3(m, b, v)) + (j < 0 ? 0 : (j *= j) * j * D.dot3(k, _, w)) + (R < 0 ? 0 : (R *= R) * R * F.dot3(x, C, S)));
};
function r(t) {
return t * t * t * (t * (6 * t - 15) + 10);
}
function l(t, e, i) {
return (1 - i) * t + i * e;
}
a.prototype.perlin2 = function(t, e) {
var i = Math.floor(t), s = Math.floor(e);
t -= i;
e -= s;
i &= 255;
s &= 255;
var n = this.gradP[i + this.perm[s]].dot2(t, e), a = this.gradP[i + this.perm[s + 1]].dot2(t, e - 1), o = this.gradP[i + 1 + this.perm[s]].dot2(t - 1, e), c = this.gradP[i + 1 + this.perm[s + 1]].dot2(t - 1, e - 1), h = r(t);
return l(l(n, o, h), l(a, c, h), r(e));
};
a.prototype.perlin3 = function(t, e, i) {
var s = Math.floor(t), n = Math.floor(e), a = Math.floor(i);
t -= s;
e -= n;
i -= a;
s &= 255;
n &= 255;
a &= 255;
var o = this.gradP[s + this.perm[n + this.perm[a]]].dot3(t, e, i), c = this.gradP[s + this.perm[n + this.perm[a + 1]]].dot3(t, e, i - 1), h = this.gradP[s + this.perm[n + 1 + this.perm[a]]].dot3(t, e - 1, i), p = this.gradP[s + this.perm[n + 1 + this.perm[a + 1]]].dot3(t, e - 1, i - 1), d = this.gradP[s + 1 + this.perm[n + this.perm[a]]].dot3(t - 1, e, i), u = this.gradP[s + 1 + this.perm[n + this.perm[a + 1]]].dot3(t - 1, e, i - 1), f = this.gradP[s + 1 + this.perm[n + 1 + this.perm[a]]].dot3(t - 1, e - 1, i), g = this.gradP[s + 1 + this.perm[n + 1 + this.perm[a + 1]]].dot3(t - 1, e - 1, i - 1), y = r(t), m = r(e), b = r(i);
return l(l(l(o, d, y), l(c, u, y), b), l(l(h, f, y), l(p, g, y), b), m);
};
var h = new function() {
this.createmap = function(t, e, i, s) {
var n = new a();
n.seed(i);
for (var o = [], c = 0; c < t; c++) {
o[c] = [];
for (var r = 0; r < e; r++) o[c][r] = (n.perlin2(c * s, r * s) + 1) / 2;
}
return o;
};
}();
e.exports = h;
cc._RF.pop();
}, {} ],
