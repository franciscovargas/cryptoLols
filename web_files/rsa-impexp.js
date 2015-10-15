/*
 <a href="http://kjur.github.io/jsrsasign/license/">MIT License</a>
*/
var dbits, canary = 0xdeadbeefcafe,
    j_lm = 15715070 == (canary & 16777215);

function BigInteger(a, b, c) {
    null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
}

function nbi() {
    return new BigInteger(null)
}

function am1(a, b, c, d, e, g) {
    for (; 0 <= --g;) {
        var h = b * this[a++] + c[d] + e;
        e = Math.floor(h / 67108864);
        c[d++] = h & 67108863
    }
    return e
}

function am2(a, b, c, d, e, g) {
    var h = b & 32767;
    for (b >>= 15; 0 <= --g;) {
        var f = this[a] & 32767,
            k = this[a++] >> 15,
            l = b * f + k * h,
            f = h * f + ((l & 32767) << 15) + c[d] + (e & 1073741823);
        e = (f >>> 30) + (l >>> 15) + b * k + (e >>> 30);
        c[d++] = f & 1073741823
    }
    return e
}

function am3(a, b, c, d, e, g) {
    var h = b & 16383;
    for (b >>= 14; 0 <= --g;) {
        var f = this[a] & 16383,
            k = this[a++] >> 14,
            l = b * f + k * h,
            f = h * f + ((l & 16383) << 14) + c[d] + e;
        e = (f >> 28) + (l >> 14) + b * k;
        c[d++] = f & 268435455
    }
    return e
}
j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2, dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1, dbits = 26) : (BigInteger.prototype.am = am3, dbits = 28);
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz",
    BI_RC = [],
    rr, vv;
rr = 48;
for (vv = 0; 9 >= vv; ++vv) BI_RC[rr++] = vv;
rr = 97;
for (vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
rr = 65;
for (vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;

function int2char(a) {
    return BI_RM.charAt(a)
}

function intAt(a, b) {
    var c = BI_RC[a.charCodeAt(b)];
    return null == c ? -1 : c
}

function bnpCopyTo(a) {
    for (var b = this.t - 1; 0 <= b; --b) a[b] = this[b];
    a.t = this.t;
    a.s = this.s
}

function bnpFromInt(a) {
    this.t = 1;
    this.s = 0 > a ? -1 : 0;
    0 < a ? this[0] = a : -1 > a ? this[0] = a + this.DV : this.t = 0
}

function nbv(a) {
    var b = nbi();
    b.fromInt(a);
    return b
}

function bnpFromString(a, b) {
    var c;
    if (16 == b) c = 4;
    else if (8 == b) c = 3;
    else if (256 == b) c = 8;
    else if (2 == b) c = 1;
    else if (32 == b) c = 5;
    else if (4 == b) c = 2;
    else {
        this.fromRadix(a, b);
        return
    }
    this.s = this.t = 0;
    for (var d = a.length, e = !1, g = 0; 0 <= --d;) {
        var h = 8 == c ? a[d] & 255 : intAt(a, d);
        0 > h ? "-" == a.charAt(d) && (e = !0) : (e = !1, 0 == g ? this[this.t++] = h : g + c > this.DB ? (this[this.t - 1] |= (h & (1 << this.DB - g) - 1) << g, this[this.t++] = h >> this.DB - g) : this[this.t - 1] |= h << g, g += c, g >= this.DB && (g -= this.DB))
    }
    8 == c && 0 != (a[0] & 128) && (this.s = -1, 0 < g && (this[this.t - 1] |= (1 << this.DB -
        g) - 1 << g));
    this.clamp();
    e && BigInteger.ZERO.subTo(this, this)
}

function bnpClamp() {
    for (var a = this.s & this.DM; 0 < this.t && this[this.t - 1] == a;)--this.t
}

function bnToString(a) {
    if (0 > this.s) return "-" + this.negate().toString(a);
    if (16 == a) a = 4;
    else if (8 == a) a = 3;
    else if (2 == a) a = 1;
    else if (32 == a) a = 5;
    else if (4 == a) a = 2;
    else return this.toRadix(a);
    var b = (1 << a) - 1,
        c, d = !1,
        e = "",
        g = this.t,
        h = this.DB - g * this.DB % a;
    if (0 < g--)
        for (h < this.DB && 0 < (c = this[g] >> h) && (d = !0, e = int2char(c)); 0 <= g;) h < a ? (c = (this[g] & (1 << h) - 1) << a - h, c |= this[--g] >> (h += this.DB - a)) : (c = this[g] >> (h -= a) & b, 0 >= h && (h += this.DB, --g)), 0 < c && (d = !0), d && (e += int2char(c));
    return d ? e : "0"
}

function bnNegate() {
    var a = nbi();
    BigInteger.ZERO.subTo(this, a);
    return a
}

function bnAbs() {
    return 0 > this.s ? this.negate() : this
}

function bnCompareTo(a) {
    var b = this.s - a.s;
    if (0 != b) return b;
    var c = this.t,
        b = c - a.t;
    if (0 != b) return 0 > this.s ? -b : b;
    for (; 0 <= --c;)
        if (0 != (b = this[c] - a[c])) return b;
    return 0
}

function nbits(a) {
    var b = 1,
        c;
    0 != (c = a >>> 16) && (a = c, b += 16);
    0 != (c = a >> 8) && (a = c, b += 8);
    0 != (c = a >> 4) && (a = c, b += 4);
    0 != (c = a >> 2) && (a = c, b += 2);
    0 != a >> 1 && (b += 1);
    return b
}

function bnBitLength() {
    return 0 >= this.t ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}

function bnpDLShiftTo(a, b) {
    var c;
    for (c = this.t - 1; 0 <= c; --c) b[c + a] = this[c];
    for (c = a - 1; 0 <= c; --c) b[c] = 0;
    b.t = this.t + a;
    b.s = this.s
}

function bnpDRShiftTo(a, b) {
    for (var c = a; c < this.t; ++c) b[c - a] = this[c];
    b.t = Math.max(this.t - a, 0);
    b.s = this.s
}

function bnpLShiftTo(a, b) {
    var c = a % this.DB,
        d = this.DB - c,
        e = (1 << d) - 1,
        g = Math.floor(a / this.DB),
        h = this.s << c & this.DM,
        f;
    for (f = this.t - 1; 0 <= f; --f) b[f + g + 1] = this[f] >> d | h, h = (this[f] & e) << c;
    for (f = g - 1; 0 <= f; --f) b[f] = 0;
    b[g] = h;
    b.t = this.t + g + 1;
    b.s = this.s;
    b.clamp()
}

function bnpRShiftTo(a, b) {
    b.s = this.s;
    var c = Math.floor(a / this.DB);
    if (c >= this.t) b.t = 0;
    else {
        var d = a % this.DB,
            e = this.DB - d,
            g = (1 << d) - 1;
        b[0] = this[c] >> d;
        for (var h = c + 1; h < this.t; ++h) b[h - c - 1] |= (this[h] & g) << e, b[h - c] = this[h] >> d;
        0 < d && (b[this.t - c - 1] |= (this.s & g) << e);
        b.t = this.t - c;
        b.clamp()
    }
}

function bnpSubTo(a, b) {
    for (var c = 0, d = 0, e = Math.min(a.t, this.t); c < e;) d += this[c] - a[c], b[c++] = d & this.DM, d >>= this.DB;
    if (a.t < this.t) {
        for (d -= a.s; c < this.t;) d += this[c], b[c++] = d & this.DM, d >>= this.DB;
        d += this.s
    } else {
        for (d += this.s; c < a.t;) d -= a[c], b[c++] = d & this.DM, d >>= this.DB;
        d -= a.s
    }
    b.s = 0 > d ? -1 : 0; - 1 > d ? b[c++] = this.DV + d : 0 < d && (b[c++] = d);
    b.t = c;
    b.clamp()
}

function bnpMultiplyTo(a, b) {
    var c = this.abs(),
        d = a.abs(),
        e = c.t;
    for (b.t = e + d.t; 0 <= --e;) b[e] = 0;
    for (e = 0; e < d.t; ++e) b[e + c.t] = c.am(0, d[e], b, e, 0, c.t);
    b.s = 0;
    b.clamp();
    this.s != a.s && BigInteger.ZERO.subTo(b, b)
}

function bnpSquareTo(a) {
    for (var b = this.abs(), c = a.t = 2 * b.t; 0 <= --c;) a[c] = 0;
    for (c = 0; c < b.t - 1; ++c) {
        var d = b.am(c, b[c], a, 2 * c, 0, 1);
        (a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV && (a[c + b.t] -= b.DV, a[c + b.t + 1] = 1)
    }
    0 < a.t && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1));
    a.s = 0;
    a.clamp()
}

function bnpDivRemTo(a, b, c) {
    var d = a.abs();
    if (!(0 >= d.t)) {
        var e = this.abs();
        if (e.t < d.t) null != b && b.fromInt(0), null != c && this.copyTo(c);
        else {
            null == c && (c = nbi());
            var g = nbi(),
                h = this.s;
            a = a.s;
            var f = this.DB - nbits(d[d.t - 1]);
            0 < f ? (d.lShiftTo(f, g), e.lShiftTo(f, c)) : (d.copyTo(g), e.copyTo(c));
            d = g.t;
            e = g[d - 1];
            if (0 != e) {
                var k = e * (1 << this.F1) + (1 < d ? g[d - 2] >> this.F2 : 0),
                    l = this.FV / k,
                    k = (1 << this.F1) / k,
                    n = 1 << this.F2,
                    m = c.t,
                    q = m - d,
                    p = null == b ? nbi() : b;
                g.dlShiftTo(q, p);
                0 <= c.compareTo(p) && (c[c.t++] = 1, c.subTo(p, c));
                BigInteger.ONE.dlShiftTo(d,
                    p);
                for (p.subTo(g, g); g.t < d;) g[g.t++] = 0;
                for (; 0 <= --q;) {
                    var r = c[--m] == e ? this.DM : Math.floor(c[m] * l + (c[m - 1] + n) * k);
                    if ((c[m] += g.am(0, r, c, q, 0, d)) < r)
                        for (g.dlShiftTo(q, p), c.subTo(p, c); c[m] < --r;) c.subTo(p, c)
                }
                null != b && (c.drShiftTo(d, b), h != a && BigInteger.ZERO.subTo(b, b));
                c.t = d;
                c.clamp();
                0 < f && c.rShiftTo(f, c);
                0 > h && BigInteger.ZERO.subTo(c, c)
            }
        }
    }
}

function bnMod(a) {
    var b = nbi();
    this.abs().divRemTo(a, null, b);
    0 > this.s && 0 < b.compareTo(BigInteger.ZERO) && a.subTo(b, b);
    return b
}

function Classic(a) {
    this.m = a
}

function cConvert(a) {
    return 0 > a.s || 0 <= a.compareTo(this.m) ? a.mod(this.m) : a
}

function cRevert(a) {
    return a
}

function cReduce(a) {
    a.divRemTo(this.m, null, a)
}

function cMulTo(a, b, c) {
    a.multiplyTo(b, c);
    this.reduce(c)
}

function cSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b)
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

function bnpInvDigit() {
    if (1 > this.t) return 0;
    var a = this[0];
    if (0 == (a & 1)) return 0;
    var b = a & 3,
        b = b * (2 - (a & 15) * b) & 15,
        b = b * (2 - (a & 255) * b) & 255,
        b = b * (2 - ((a & 65535) * b & 65535)) & 65535,
        b = b * (2 - a * b % this.DV) % this.DV;
    return 0 < b ? this.DV - b : -b
}

function Montgomery(a) {
    this.m = a;
    this.mp = a.invDigit();
    this.mpl = this.mp & 32767;
    this.mph = this.mp >> 15;
    this.um = (1 << a.DB - 15) - 1;
    this.mt2 = 2 * a.t
}

function montConvert(a) {
    var b = nbi();
    a.abs().dlShiftTo(this.m.t, b);
    b.divRemTo(this.m, null, b);
    0 > a.s && 0 < b.compareTo(BigInteger.ZERO) && this.m.subTo(b, b);
    return b
}

function montRevert(a) {
    var b = nbi();
    a.copyTo(b);
    this.reduce(b);
    return b
}

function montReduce(a) {
    for (; a.t <= this.mt2;) a[a.t++] = 0;
    for (var b = 0; b < this.m.t; ++b) {
        var c = a[b] & 32767,
            d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM,
            c = b + this.m.t;
        for (a[c] += this.m.am(0, d, a, b, 0, this.m.t); a[c] >= a.DV;) a[c] -= a.DV, a[++c]++
    }
    a.clamp();
    a.drShiftTo(this.m.t, a);
    0 <= a.compareTo(this.m) && a.subTo(this.m, a)
}

function montSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b)
}

function montMulTo(a, b, c) {
    a.multiplyTo(b, c);
    this.reduce(c)
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

function bnpIsEven() {
    return 0 == (0 < this.t ? this[0] & 1 : this.s)
}

function bnpExp(a, b) {
    if (4294967295 < a || 1 > a) return BigInteger.ONE;
    var c = nbi(),
        d = nbi(),
        e = b.convert(this),
        g = nbits(a) - 1;
    for (e.copyTo(c); 0 <= --g;)
        if (b.sqrTo(c, d), 0 < (a & 1 << g)) b.mulTo(d, e, c);
        else var h = c,
            c = d,
            d = h;
    return b.revert(c)
}

function bnModPowInt(a, b) {
    var c;
    c = 256 > a || b.isEven() ? new Classic(b) : new Montgomery(b);
    return this.exp(a, c)
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

function bnClone() {
    var a = nbi();
    this.copyTo(a);
    return a
}

function bnIntValue() {
    if (0 > this.s) {
        if (1 == this.t) return this[0] - this.DV;
        if (0 == this.t) return -1
    } else {
        if (1 == this.t) return this[0];
        if (0 == this.t) return 0
    }
    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
}

function bnByteValue() {
    return 0 == this.t ? this.s : this[0] << 24 >> 24
}

function bnShortValue() {
    return 0 == this.t ? this.s : this[0] << 16 >> 16
}

function bnpChunkSize(a) {
    return Math.floor(Math.LN2 * this.DB / Math.log(a))
}

function bnSigNum() {
    return 0 > this.s ? -1 : 0 >= this.t || 1 == this.t && 0 >= this[0] ? 0 : 1
}

function bnpToRadix(a) {
    null == a && (a = 10);
    if (0 == this.signum() || 2 > a || 36 < a) return "0";
    var b = this.chunkSize(a),
        b = Math.pow(a, b),
        c = nbv(b),
        d = nbi(),
        e = nbi(),
        g = "";
    for (this.divRemTo(c, d, e); 0 < d.signum();) g = (b + e.intValue()).toString(a).substr(1) + g, d.divRemTo(c, d, e);
    return e.intValue().toString(a) + g
}

function bnpFromRadix(a, b) {
    this.fromInt(0);
    null == b && (b = 10);
    for (var c = this.chunkSize(b), d = Math.pow(b, c), e = !1, g = 0, h = 0, f = 0; f < a.length; ++f) {
        var k = intAt(a, f);
        0 > k ? "-" == a.charAt(f) && 0 == this.signum() && (e = !0) : (h = b * h + k, ++g >= c && (this.dMultiply(d), this.dAddOffset(h, 0), h = g = 0))
    }
    0 < g && (this.dMultiply(Math.pow(b, g)), this.dAddOffset(h, 0));
    e && BigInteger.ZERO.subTo(this, this)
}

function bnpFromNumber(a, b, c) {
    if ("number" == typeof b)
        if (2 > a) this.fromInt(1);
        else
            for (this.fromNumber(a, c), this.testBit(a - 1) || this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(b);) this.dAddOffset(2, 0), this.bitLength() > a && this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
    else {
        c = [];
        var d = a & 7;
        c.length = (a >> 3) + 1;
        b.nextBytes(c);
        c[0] = 0 < d ? c[0] & (1 << d) - 1 : 0;
        this.fromString(c, 256)
    }
}

function bnToByteArray() {
    var a = this.t,
        b = [];
    b[0] = this.s;
    var c = this.DB - a * this.DB % 8,
        d, e = 0;
    if (0 < a--)
        for (c < this.DB && (d = this[a] >> c) != (this.s & this.DM) >> c && (b[e++] = d | this.s << this.DB - c); 0 <= a;)
            if (8 > c ? (d = (this[a] & (1 << c) - 1) << 8 - c, d |= this[--a] >> (c += this.DB - 8)) : (d = this[a] >> (c -= 8) & 255, 0 >= c && (c += this.DB, --a)), 0 != (d & 128) && (d |= -256), 0 == e && (this.s & 128) != (d & 128) && ++e, 0 < e || d != this.s) b[e++] = d;
    return b
}

function bnEquals(a) {
    return 0 == this.compareTo(a)
}

function bnMin(a) {
    return 0 > this.compareTo(a) ? this : a
}

function bnMax(a) {
    return 0 < this.compareTo(a) ? this : a
}

function bnpBitwiseTo(a, b, c) {
    var d, e, g = Math.min(a.t, this.t);
    for (d = 0; d < g; ++d) c[d] = b(this[d], a[d]);
    if (a.t < this.t) {
        e = a.s & this.DM;
        for (d = g; d < this.t; ++d) c[d] = b(this[d], e);
        c.t = this.t
    } else {
        e = this.s & this.DM;
        for (d = g; d < a.t; ++d) c[d] = b(e, a[d]);
        c.t = a.t
    }
    c.s = b(this.s, a.s);
    c.clamp()
}

function op_and(a, b) {
    return a & b
}

function bnAnd(a) {
    var b = nbi();
    this.bitwiseTo(a, op_and, b);
    return b
}

function op_or(a, b) {
    return a | b
}

function bnOr(a) {
    var b = nbi();
    this.bitwiseTo(a, op_or, b);
    return b
}

function op_xor(a, b) {
    return a ^ b
}

function bnXor(a) {
    var b = nbi();
    this.bitwiseTo(a, op_xor, b);
    return b
}

function op_andnot(a, b) {
    return a & ~b
}

function bnAndNot(a) {
    var b = nbi();
    this.bitwiseTo(a, op_andnot, b);
    return b
}

function bnNot() {
    for (var a = nbi(), b = 0; b < this.t; ++b) a[b] = this.DM & ~this[b];
    a.t = this.t;
    a.s = ~this.s;
    return a
}

function bnShiftLeft(a) {
    var b = nbi();
    0 > a ? this.rShiftTo(-a, b) : this.lShiftTo(a, b);
    return b
}

function bnShiftRight(a) {
    var b = nbi();
    0 > a ? this.lShiftTo(-a, b) : this.rShiftTo(a, b);
    return b
}

function lbit(a) {
    if (0 == a) return -1;
    var b = 0;
    0 == (a & 65535) && (a >>= 16, b += 16);
    0 == (a & 255) && (a >>= 8, b += 8);
    0 == (a & 15) && (a >>= 4, b += 4);
    0 == (a & 3) && (a >>= 2, b += 2);
    0 == (a & 1) && ++b;
    return b
}

function bnGetLowestSetBit() {
    for (var a = 0; a < this.t; ++a)
        if (0 != this[a]) return a * this.DB + lbit(this[a]);
    return 0 > this.s ? this.t * this.DB : -1
}

function cbit(a) {
    for (var b = 0; 0 != a;) a &= a - 1, ++b;
    return b
}

function bnBitCount() {
    for (var a = 0, b = this.s & this.DM, c = 0; c < this.t; ++c) a += cbit(this[c] ^ b);
    return a
}

function bnTestBit(a) {
    var b = Math.floor(a / this.DB);
    return b >= this.t ? 0 != this.s : 0 != (this[b] & 1 << a % this.DB)
}

function bnpChangeBit(a, b) {
    var c = BigInteger.ONE.shiftLeft(a);
    this.bitwiseTo(c, b, c);
    return c
}

function bnSetBit(a) {
    return this.changeBit(a, op_or)
}

function bnClearBit(a) {
    return this.changeBit(a, op_andnot)
}

function bnFlipBit(a) {
    return this.changeBit(a, op_xor)
}

function bnpAddTo(a, b) {
    for (var c = 0, d = 0, e = Math.min(a.t, this.t); c < e;) d += this[c] + a[c], b[c++] = d & this.DM, d >>= this.DB;
    if (a.t < this.t) {
        for (d += a.s; c < this.t;) d += this[c], b[c++] = d & this.DM, d >>= this.DB;
        d += this.s
    } else {
        for (d += this.s; c < a.t;) d += a[c], b[c++] = d & this.DM, d >>= this.DB;
        d += a.s
    }
    b.s = 0 > d ? -1 : 0;
    0 < d ? b[c++] = d : -1 > d && (b[c++] = this.DV + d);
    b.t = c;
    b.clamp()
}

function bnAdd(a) {
    var b = nbi();
    this.addTo(a, b);
    return b
}

function bnSubtract(a) {
    var b = nbi();
    this.subTo(a, b);
    return b
}

function bnMultiply(a) {
    var b = nbi();
    this.multiplyTo(a, b);
    return b
}

function bnSquare() {
    var a = nbi();
    this.squareTo(a);
    return a
}

function bnDivide(a) {
    var b = nbi();
    this.divRemTo(a, b, null);
    return b
}

function bnRemainder(a) {
    var b = nbi();
    this.divRemTo(a, null, b);
    return b
}

function bnDivideAndRemainder(a) {
    var b = nbi(),
        c = nbi();
    this.divRemTo(a, b, c);
    return [b, c]
}

function bnpDMultiply(a) {
    this[this.t] = this.am(0, a - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp()
}

function bnpDAddOffset(a, b) {
    if (0 != a) {
        for (; this.t <= b;) this[this.t++] = 0;
        for (this[b] += a; this[b] >= this.DV;) this[b] -= this.DV, ++b >= this.t && (this[this.t++] = 0), ++this[b]
    }
}

function NullExp() {}

function nNop(a) {
    return a
}

function nMulTo(a, b, c) {
    a.multiplyTo(b, c)
}

function nSqrTo(a, b) {
    a.squareTo(b)
}
NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;

function bnPow(a) {
    return this.exp(a, new NullExp)
}

function bnpMultiplyLowerTo(a, b, c) {
    var d = Math.min(this.t + a.t, b);
    c.s = 0;
    for (c.t = d; 0 < d;) c[--d] = 0;
    var e;
    for (e = c.t - this.t; d < e; ++d) c[d + this.t] = this.am(0, a[d], c, d, 0, this.t);
    for (e = Math.min(a.t, b); d < e; ++d) this.am(0, a[d], c, d, 0, b - d);
    c.clamp()
}

function bnpMultiplyUpperTo(a, b, c) {
    --b;
    var d = c.t = this.t + a.t - b;
    for (c.s = 0; 0 <= --d;) c[d] = 0;
    for (d = Math.max(b - this.t, 0); d < a.t; ++d) c[this.t + d - b] = this.am(b - d, a[d], c, 0, 0, this.t + d - b);
    c.clamp();
    c.drShiftTo(1, c)
}

function Barrett(a) {
    this.r2 = nbi();
    this.q3 = nbi();
    BigInteger.ONE.dlShiftTo(2 * a.t, this.r2);
    this.mu = this.r2.divide(a);
    this.m = a
}

function barrettConvert(a) {
    if (0 > a.s || a.t > 2 * this.m.t) return a.mod(this.m);
    if (0 > a.compareTo(this.m)) return a;
    var b = nbi();
    a.copyTo(b);
    this.reduce(b);
    return b
}

function barrettRevert(a) {
    return a
}

function barrettReduce(a) {
    a.drShiftTo(this.m.t - 1, this.r2);
    a.t > this.m.t + 1 && (a.t = this.m.t + 1, a.clamp());
    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
    for (this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); 0 > a.compareTo(this.r2);) a.dAddOffset(1, this.m.t + 1);
    for (a.subTo(this.r2, a); 0 <= a.compareTo(this.m);) a.subTo(this.m, a)
}

function barrettSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b)
}

function barrettMulTo(a, b, c) {
    a.multiplyTo(b, c);
    this.reduce(c)
}
Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;

function bnModPow(a, b) {
    var c = a.bitLength(),
        d, e = nbv(1),
        g;
    if (0 >= c) return e;
    d = 18 > c ? 1 : 48 > c ? 3 : 144 > c ? 4 : 768 > c ? 5 : 6;
    g = 8 > c ? new Classic(b) : b.isEven() ? new Barrett(b) : new Montgomery(b);
    var h = [],
        f = 3,
        k = d - 1,
        l = (1 << d) - 1;
    h[1] = g.convert(this);
    if (1 < d)
        for (c = nbi(), g.sqrTo(h[1], c); f <= l;) h[f] = nbi(), g.mulTo(c, h[f - 2], h[f]), f += 2;
    for (var n = a.t - 1, m, q = !0, p = nbi(), c = nbits(a[n]) - 1; 0 <= n;) {
        c >= k ? m = a[n] >> c - k & l : (m = (a[n] & (1 << c + 1) - 1) << k - c, 0 < n && (m |= a[n - 1] >> this.DB + c - k));
        for (f = d; 0 == (m & 1);) m >>= 1, --f;
        0 > (c -= f) && (c += this.DB, --n);
        if (q) h[m].copyTo(e),
            q = !1;
        else {
            for (; 1 < f;) g.sqrTo(e, p), g.sqrTo(p, e), f -= 2;
            0 < f ? g.sqrTo(e, p) : (f = e, e = p, p = f);
            g.mulTo(p, h[m], e)
        }
        for (; 0 <= n && 0 == (a[n] & 1 << c);) g.sqrTo(e, p), f = e, e = p, p = f, 0 > --c && (c = this.DB - 1, --n)
    }
    return g.revert(e)
}

function bnGCD(a) {
    var b = 0 > this.s ? this.negate() : this.clone();
    a = 0 > a.s ? a.negate() : a.clone();
    if (0 > b.compareTo(a)) {
        var c = b,
            b = a;
        a = c
    }
    var c = b.getLowestSetBit(),
        d = a.getLowestSetBit();
    if (0 > d) return b;
    c < d && (d = c);
    0 < d && (b.rShiftTo(d, b), a.rShiftTo(d, a));
    for (; 0 < b.signum();) 0 < (c = b.getLowestSetBit()) && b.rShiftTo(c, b), 0 < (c = a.getLowestSetBit()) && a.rShiftTo(c, a), 0 <= b.compareTo(a) ? (b.subTo(a, b), b.rShiftTo(1, b)) : (a.subTo(b, a), a.rShiftTo(1, a));
    0 < d && a.lShiftTo(d, a);
    return a
}

function bnpModInt(a) {
    if (0 >= a) return 0;
    var b = this.DV % a,
        c = 0 > this.s ? a - 1 : 0;
    if (0 < this.t)
        if (0 == b) c = this[0] % a;
        else
            for (var d = this.t - 1; 0 <= d; --d) c = (b * c + this[d]) % a;
    return c
}

function bnModInverse(a) {
    var b = a.isEven();
    if (this.isEven() && b || 0 == a.signum()) return BigInteger.ZERO;
    for (var c = a.clone(), d = this.clone(), e = nbv(1), g = nbv(0), h = nbv(0), f = nbv(1); 0 != c.signum();) {
        for (; c.isEven();) c.rShiftTo(1, c), b ? (e.isEven() && g.isEven() || (e.addTo(this, e), g.subTo(a, g)), e.rShiftTo(1, e)) : g.isEven() || g.subTo(a, g), g.rShiftTo(1, g);
        for (; d.isEven();) d.rShiftTo(1, d), b ? (h.isEven() && f.isEven() || (h.addTo(this, h), f.subTo(a, f)), h.rShiftTo(1, h)) : f.isEven() || f.subTo(a, f), f.rShiftTo(1, f);
        0 <= c.compareTo(d) ?
            (c.subTo(d, c), b && e.subTo(h, e), g.subTo(f, g)) : (d.subTo(c, d), b && h.subTo(e, h), f.subTo(g, f))
    }
    if (0 != d.compareTo(BigInteger.ONE)) return BigInteger.ZERO;
    if (0 <= f.compareTo(a)) return f.subtract(a);
    if (0 > f.signum()) f.addTo(a, f);
    else return f;
    return 0 > f.signum() ? f.add(a) : f
}
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727,
        733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997
    ],
    lplim = 67108864 / lowprimes[lowprimes.length - 1];

function bnIsProbablePrime(a) {
    var b, c = this.abs();
    if (1 == c.t && c[0] <= lowprimes[lowprimes.length - 1]) {
        for (b = 0; b < lowprimes.length; ++b)
            if (c[0] == lowprimes[b]) return !0;
        return !1
    }
    if (c.isEven()) return !1;
    for (b = 1; b < lowprimes.length;) {
        for (var d = lowprimes[b], e = b + 1; e < lowprimes.length && d < lplim;) d *= lowprimes[e++];
        for (d = c.modInt(d); b < e;)
            if (0 == d % lowprimes[b++]) return !1
    }
    return c.millerRabin(a)
}

function bnpMillerRabin(a) {
    var b = this.subtract(BigInteger.ONE),
        c = b.getLowestSetBit();
    if (0 >= c) return !1;
    var d = b.shiftRight(c);
    a = a + 1 >> 1;
    a > lowprimes.length && (a = lowprimes.length);
    for (var e = nbi(), g = 0; g < a; ++g) {
        e.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var h = e.modPow(d, this);
        if (0 != h.compareTo(BigInteger.ONE) && 0 != h.compareTo(b)) {
            for (var f = 1; f++ < c && 0 != h.compareTo(b);)
                if (h = h.modPowInt(2, this), 0 == h.compareTo(BigInteger.ONE)) return !1;
            if (0 != h.compareTo(b)) return !1
        }
    }
    return !0
}
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
BigInteger.prototype.square = bnSquare;
var JSX = JSX || {};
JSX.env = JSX.env || {};
var L = JSX,
    OP = Object.prototype,
    FUNCTION_TOSTRING = "[object Function]",
    ADD = ["toString", "valueOf"];
JSX.env.parseUA = function(a) {
    var b = function(a) {
            var b = 0;
            return parseFloat(a.replace(/\./g, function() {
                return 1 == b++ ? "" : "."
            }))
        },
        c = navigator,
        c = {
            ie: 0,
            opera: 0,
            gecko: 0,
            webkit: 0,
            chrome: 0,
            mobile: null,
            air: 0,
            ipad: 0,
            iphone: 0,
            ipod: 0,
            ios: null,
            android: 0,
            webos: 0,
            caja: c && c.cajaVersion,
            secure: !1,
            os: null
        };
    a = a || navigator && navigator.userAgent;
    var d = window && window.location,
        d = d && d.href;
    c.secure = d && 0 === d.toLowerCase().indexOf("https");
    if (a) {
        /windows|win32/i.test(a) ? c.os = "windows" : /macintosh/i.test(a) ? c.os = "macintosh" : /rhino/i.test(a) &&
            (c.os = "rhino");
        /KHTML/.test(a) && (c.webkit = 1);
        if ((d = a.match(/AppleWebKit\/([^\s]*)/)) && d[1]) {
            c.webkit = b(d[1]);
            if (/ Mobile\//.test(a)) c.mobile = "Apple", (d = a.match(/OS ([^\s]*)/)) && d[1] && (d = b(d[1].replace("_", "."))), c.ios = d, c.ipad = c.ipod = c.iphone = 0, (d = a.match(/iPad|iPod|iPhone/)) && d[0] && (c[d[0].toLowerCase()] = c.ios);
            else {
                if (d = a.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/)) c.mobile = d[0];
                /webOS/.test(a) && (c.mobile = "WebOS", (d = a.match(/webOS\/([^\s]*);/)) && d[1] && (c.webos = b(d[1])));
                / Android/.test(a) &&
                    (c.mobile = "Android", (d = a.match(/Android ([^\s]*);/)) && d[1] && (c.android = b(d[1])))
            } if ((d = a.match(/Chrome\/([^\s]*)/)) && d[1]) c.chrome = b(d[1]);
            else if (d = a.match(/AdobeAIR\/([^\s]*)/)) c.air = d[0]
        }
        if (!c.webkit)
            if ((d = a.match(/Opera[\s\/]([^\s]*)/)) && d[1]) {
                if (c.opera = b(d[1]), (d = a.match(/Version\/([^\s]*)/)) && d[1] && (c.opera = b(d[1])), d = a.match(/Opera Mini[^;]*/)) c.mobile = d[0]
            } else if ((d = a.match(/MSIE\s([^;]*)/)) && d[1]) c.ie = b(d[1]);
        else if (d = a.match(/Gecko\/([^\s]*)/)) c.gecko = 1, (d = a.match(/rv:([^\s\)]*)/)) &&
            d[1] && (c.gecko = b(d[1]))
    }
    return c
};
JSX.env.ua = JSX.env.parseUA();
JSX.isFunction = function(a) {
    return "function" === typeof a || OP.toString.apply(a) === FUNCTION_TOSTRING
};
JSX._IEEnumFix = JSX.env.ua.ie ? function(a, b) {
    var c, d, e;
    for (c = 0; c < ADD.length; c += 1) d = ADD[c], e = b[d], L.isFunction(e) && e != OP[d] && (a[d] = e)
} : function() {};
JSX.extend = function(a, b, c) {
    if (!b || !a) throw Error("extend failed, please check that all dependencies are included.");
    var d = function() {},
        e;
    d.prototype = b.prototype;
    a.prototype = new d;
    a.prototype.constructor = a;
    a.superclass = b.prototype;
    b.prototype.constructor == OP.constructor && (b.prototype.constructor = b);
    if (c) {
        for (e in c) L.hasOwnProperty(c, e) && (a.prototype[e] = c[e]);
        L._IEEnumFix(a.prototype, c)
    }
};
"undefined" != typeof KJUR && KJUR || (KJUR = {});
"undefined" != typeof KJUR.asn1 && KJUR.asn1 || (KJUR.asn1 = {});
KJUR.asn1.ASN1Util = new function() {
    this.integerToByteHex = function(a) {
        a = a.toString(16);
        1 == a.length % 2 && (a = "0" + a);
        return a
    };
    this.bigIntToMinTwosComplementsHex = function(a) {
        var b = a.toString(16);
        if ("-" != b.substr(0, 1)) 1 == b.length % 2 ? b = "0" + b : b.match(/^[0-7]/) || (b = "00" + b);
        else {
            var c = b.substr(1).length;
            1 == c % 2 ? c += 1 : b.match(/^[0-7]/) || (c += 2);
            for (var b = "", d = 0; d < c; d++) b += "f";
            b = (new BigInteger(b, 16)).xor(a).add(BigInteger.ONE).toString(16).replace(/^-/, "")
        }
        return b
    };
    this.getPEMStringFromHex = function(a, b) {
        var c = CryptoJS.enc.Hex.parse(a),
            c = CryptoJS.enc.Base64.stringify(c).replace(/(.{64})/g, "$1\r\n"),
            c = c.replace(/\r\n$/, "");
        return "-----BEGIN " + b + "-----\r\n" + c + "\r\n-----END " + b + "-----\r\n"
    }
};
KJUR.asn1.ASN1Object = function() {
    this.getLengthHexFromValue = function() {
        if ("undefined" == typeof this.hV || null == this.hV) throw "this.hV is null or undefined.";
        if (1 == this.hV.length % 2) throw "value hex must be even length: n=0,v=" + this.hV;
        var a = this.hV.length / 2,
            b = a.toString(16);
        1 == b.length % 2 && (b = "0" + b);
        if (128 > a) return b;
        var c = b.length / 2;
        if (15 < c) throw "ASN.1 length too long to represent by 8x: n = " + a.toString(16);
        return (128 + c).toString(16) + b
    };
    this.getEncodedHex = function() {
        if (null == this.hTLV || this.isModified) this.hV =
            this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1;
        return this.hTLV
    };
    this.getValueHex = function() {
        this.getEncodedHex();
        return this.hV
    };
    this.getFreshValueHex = function() {
        return ""
    }
};
KJUR.asn1.DERAbstractString = function(a) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    this.getString = function() {
        return this.s
    };
    this.setString = function(a) {
        this.hTLV = null;
        this.isModified = !0;
        this.s = a;
        this.hV = stohex(this.s)
    };
    this.setStringHex = function(a) {
        this.hTLV = null;
        this.isModified = !0;
        this.s = null;
        this.hV = a
    };
    this.getFreshValueHex = function() {
        return this.hV
    };
    "undefined" != typeof a && ("undefined" != typeof a.str ? this.setString(a.str) : "undefined" != typeof a.hex && this.setStringHex(a.hex))
};
JSX.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
KJUR.asn1.DERAbstractTime = function(a) {
    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
    this.localDateToUTC = function(a) {
        utc = a.getTime() + 6E4 * a.getTimezoneOffset();
        return new Date(utc)
    };
    this.formatDate = function(a, c) {
        var d = this.zeroPadding,
            e = this.localDateToUTC(a),
            g = String(e.getFullYear());
        "utc" == c && (g = g.substr(2, 2));
        var h = d(String(e.getMonth() + 1), 2),
            f = d(String(e.getDate()), 2),
            k = d(String(e.getHours()), 2),
            l = d(String(e.getMinutes()), 2),
            d = d(String(e.getSeconds()), 2);
        return g + h + f + k + l + d + "Z"
    };
    this.zeroPadding =
        function(a, c) {
            return a.length >= c ? a : Array(c - a.length + 1).join("0") + a
    };
    this.getString = function() {
        return this.s
    };
    this.setString = function(a) {
        this.hTLV = null;
        this.isModified = !0;
        this.s = a;
        this.hV = stohex(this.s)
    };
    this.setByDateValue = function(a, c, d, e, g, h) {
        a = new Date(Date.UTC(a, c - 1, d, e, g, h, 0));
        this.setByDate(a)
    };
    this.getFreshValueHex = function() {
        return this.hV
    }
};
JSX.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
KJUR.asn1.DERAbstractStructured = function(a) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    this.setByASN1ObjectArray = function(a) {
        this.hTLV = null;
        this.isModified = !0;
        this.asn1Array = a
    };
    this.appendASN1Object = function(a) {
        this.hTLV = null;
        this.isModified = !0;
        this.asn1Array.push(a)
    };
    this.asn1Array = [];
    "undefined" != typeof a && "undefined" != typeof a.array && (this.asn1Array = a.array)
};
JSX.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);
KJUR.asn1.DERBoolean = function() {
    KJUR.asn1.DERBoolean.superclass.constructor.call(this);
    this.hT = "01";
    this.hTLV = "0101ff"
};
JSX.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);
KJUR.asn1.DERInteger = function(a) {
    KJUR.asn1.DERInteger.superclass.constructor.call(this);
    this.hT = "02";
    this.setByBigInteger = function(a) {
        this.hTLV = null;
        this.isModified = !0;
        this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(a)
    };
    this.setByInteger = function(a) {
        a = new BigInteger(String(a), 10);
        this.setByBigInteger(a)
    };
    this.setValueHex = function(a) {
        this.hV = a
    };
    this.getFreshValueHex = function() {
        return this.hV
    };
    "undefined" != typeof a && ("undefined" != typeof a.bigint ? this.setByBigInteger(a.bigint) : "undefined" !=
        typeof a["int"] ? this.setByInteger(a["int"]) : "undefined" != typeof a.hex && this.setValueHex(a.hex))
};
JSX.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);
KJUR.asn1.DERBitString = function(a) {
    KJUR.asn1.DERBitString.superclass.constructor.call(this);
    this.hT = "03";
    this.setHexValueIncludingUnusedBits = function(a) {
        this.hTLV = null;
        this.isModified = !0;
        this.hV = a
    };
    this.setUnusedBitsAndHexValue = function(a, c) {
        if (0 > a || 7 < a) throw "unused bits shall be from 0 to 7: u = " + a;
        this.hTLV = null;
        this.isModified = !0;
        this.hV = "0" + a + c
    };
    this.setByBinaryString = function(a) {
        a = a.replace(/0+$/, "");
        var c = 8 - a.length % 8;
        8 == c && (c = 0);
        for (var d = 0; d <= c; d++) a += "0";
        for (var e = "", d = 0; d < a.length - 1; d +=
            8) {
            var g = a.substr(d, 8),
                g = parseInt(g, 2).toString(16);
            1 == g.length && (g = "0" + g);
            e += g
        }
        this.hTLV = null;
        this.isModified = !0;
        this.hV = "0" + c + e
    };
    this.setByBooleanArray = function(a) {
        for (var c = "", d = 0; d < a.length; d++) c = !0 == a[d] ? c + "1" : c + "0";
        this.setByBinaryString(c)
    };
    this.newFalseArray = function(a) {
        for (var c = Array(a), d = 0; d < a; d++) c[d] = !1;
        return c
    };
    this.getFreshValueHex = function() {
        return this.hV
    };
    "undefined" != typeof a && ("undefined" != typeof a.hex ? this.setHexValueIncludingUnusedBits(a.hex) : "undefined" != typeof a.bin ? this.setByBinaryString(a.bin) :
        "undefined" != typeof a.array && this.setByBooleanArray(a.array))
};
JSX.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);
KJUR.asn1.DEROctetString = function(a) {
    KJUR.asn1.DEROctetString.superclass.constructor.call(this, a);
    this.hT = "04"
};
JSX.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERNull = function() {
    KJUR.asn1.DERNull.superclass.constructor.call(this);
    this.hT = "05";
    this.hTLV = "0500"
};
JSX.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);
KJUR.asn1.DERObjectIdentifier = function(a) {
    var b = function(a) {
        a = a.toString(16);
        1 == a.length && (a = "0" + a);
        return a
    };
    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
    this.hT = "06";
    this.setValueHex = function(a) {
        this.hTLV = null;
        this.isModified = !0;
        this.s = null;
        this.hV = a
    };
    this.setValueOidString = function(a) {
        if (!a.match(/^[0-9.]+$/)) throw "malformed oid string: " + a;
        var d = "";
        a = a.split(".");
        var e = 40 * parseInt(a[0]) + parseInt(a[1]),
            d = d + b(e);
        a.splice(0, 2);
        for (e = 0; e < a.length; e++) {
            var g = "",
                h = (new BigInteger(a[e],
                    10)).toString(2),
                f = 7 - h.length % 7;
            7 == f && (f = 0);
            for (var k = "", l = 0; l < f; l++) k += "0";
            h = k + h;
            for (l = 0; l < h.length - 1; l += 7) f = h.substr(l, 7), l != h.length - 7 && (f = "1" + f), g += b(parseInt(f, 2));
            d += g
        }
        this.hTLV = null;
        this.isModified = !0;
        this.s = null;
        this.hV = d
    };
    this.setValueName = function(a) {
        if ("undefined" != typeof KJUR.asn1.x509.OID.name2oidList[a]) this.setValueOidString(KJUR.asn1.x509.OID.name2oidList[a]);
        else throw "DERObjectIdentifier oidName undefined: " + a;
    };
    this.getFreshValueHex = function() {
        return this.hV
    };
    "undefined" != typeof a &&
        ("undefined" != typeof a.oid ? this.setValueOidString(a.oid) : "undefined" != typeof a.hex ? this.setValueHex(a.hex) : "undefined" != typeof a.name && this.setValueName(a.name))
};
JSX.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);
KJUR.asn1.DERUTF8String = function(a) {
    KJUR.asn1.DERUTF8String.superclass.constructor.call(this, a);
    this.hT = "0c"
};
JSX.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERNumericString = function(a) {
    KJUR.asn1.DERNumericString.superclass.constructor.call(this, a);
    this.hT = "12"
};
JSX.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERPrintableString = function(a) {
    KJUR.asn1.DERPrintableString.superclass.constructor.call(this, a);
    this.hT = "13"
};
JSX.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERTeletexString = function(a) {
    KJUR.asn1.DERTeletexString.superclass.constructor.call(this, a);
    this.hT = "14"
};
JSX.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERIA5String = function(a) {
    KJUR.asn1.DERIA5String.superclass.constructor.call(this, a);
    this.hT = "16"
};
JSX.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERUTCTime = function(a) {
    KJUR.asn1.DERUTCTime.superclass.constructor.call(this, a);
    this.hT = "17";
    this.setByDate = function(a) {
        this.hTLV = null;
        this.isModified = !0;
        this.date = a;
        this.s = this.formatDate(this.date, "utc");
        this.hV = stohex(this.s)
    };
    "undefined" != typeof a && ("undefined" != typeof a.str ? this.setString(a.str) : "undefined" != typeof a.hex ? this.setStringHex(a.hex) : "undefined" != typeof a.date && this.setByDate(a.date))
};
JSX.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERGeneralizedTime = function(a) {
    KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, a);
    this.hT = "18";
    this.setByDate = function(a) {
        this.hTLV = null;
        this.isModified = !0;
        this.date = a;
        this.s = this.formatDate(this.date, "gen");
        this.hV = stohex(this.s)
    };
    "undefined" != typeof a && ("undefined" != typeof a.str ? this.setString(a.str) : "undefined" != typeof a.hex ? this.setStringHex(a.hex) : "undefined" != typeof a.date && this.setByDate(a.date))
};
JSX.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERSequence = function(a) {
    KJUR.asn1.DERSequence.superclass.constructor.call(this, a);
    this.hT = "30";
    this.getFreshValueHex = function() {
        for (var a = "", c = 0; c < this.asn1Array.length; c++) a += this.asn1Array[c].getEncodedHex();
        return this.hV = a
    }
};
JSX.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);
KJUR.asn1.DERSet = function(a) {
    KJUR.asn1.DERSet.superclass.constructor.call(this, a);
    this.hT = "31";
    this.getFreshValueHex = function() {
        for (var a = [], c = 0; c < this.asn1Array.length; c++) a.push(this.asn1Array[c].getEncodedHex());
        a.sort();
        return this.hV = a.join("")
    }
};
JSX.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);
KJUR.asn1.DERTaggedObject = function(a) {
    KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
    this.hT = "a0";
    this.hV = "";
    this.isExplicit = !0;
    this.asn1Object = null;
    this.setASN1Object = function(a, c, d) {
        this.hT = c;
        this.isExplicit = a;
        this.asn1Object = d;
        this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = d.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, c), this.isModified = !1)
    };
    this.getFreshValueHex = function() {
        return this.hV
    };
    "undefined" != typeof a &&
        ("undefined" != typeof a.tag && (this.hT = a.tag), "undefined" != typeof a.explicit && (this.isExplicit = a.explicit), "undefined" != typeof a.obj && (this.asn1Object = a.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
};
JSX.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
(function(a) {
    var b = {},
        c;
    b.decode = function(b) {
        var e;
        if (c === a) {
            var g = "0123456789ABCDEF";
            c = [];
            for (e = 0; 16 > e; ++e) c[g.charAt(e)] = e;
            g = g.toLowerCase();
            for (e = 10; 16 > e; ++e) c[g.charAt(e)] = e;
            for (e = 0; 8 > e; ++e) c[" \f\n\r\t\u00a0\u2028\u2029".charAt(e)] = -1
        }
        var g = [],
            h = 0,
            f = 0;
        for (e = 0; e < b.length; ++e) {
            var k = b.charAt(e);
            if ("=" == k) break;
            k = c[k];
            if (-1 != k) {
                if (k === a) throw "Illegal character at offset " + e;
                h |= k;
                2 <= ++f ? (g[g.length] = h, f = h = 0) : h <<= 4
            }
        }
        if (f) throw "Hex encoding incomplete: 4 bits missing";
        return g
    };
    window.Hex = b
})();
(function(a) {
    function b(a, c) {
        a instanceof b ? (this.enc = a.enc, this.pos = a.pos) : (this.enc = a, this.pos = c)
    }

    function c(a, b, c, d, k) {
        this.stream = a;
        this.header = b;
        this.length = c;
        this.tag = d;
        this.sub = k
    }
    var d = {
        tag: function(a, b) {
            var c = document.createElement(a);
            c.className = b;
            return c
        },
        text: function(a) {
            return document.createTextNode(a)
        }
    };
    b.prototype.get = function(b) {
        b === a && (b = this.pos++);
        if (b >= this.enc.length) throw "Requesting byte offset " + b + " on a stream of length " + this.enc.length;
        return this.enc[b]
    };
    b.prototype.hexDigits =
        "0123456789ABCDEF";
    b.prototype.hexByte = function(a) {
        return this.hexDigits.charAt(a >> 4 & 15) + this.hexDigits.charAt(a & 15)
    };
    b.prototype.hexDump = function(a, b, c) {
        for (var d = ""; a < b; ++a)
            if (d += this.hexByte(this.get(a)), !0 !== c) switch (a & 15) {
                case 7:
                    d += "  ";
                    break;
                case 15:
                    d += "\n";
                    break;
                default:
                    d += " "
            }
            return d
    };
    b.prototype.parseStringISO = function(a, b) {
        for (var c = "", d = a; d < b; ++d) c += String.fromCharCode(this.get(d));
        return c
    };
    b.prototype.parseStringUTF = function(a, b) {
        for (var c = "", d = a; d < b;) var k = this.get(d++),
            c = 128 > k ? c + String.fromCharCode(k) :
            191 < k && 224 > k ? c + String.fromCharCode((k & 31) << 6 | this.get(d++) & 63) : c + String.fromCharCode((k & 15) << 12 | (this.get(d++) & 63) << 6 | this.get(d++) & 63);
        return c
    };
    b.prototype.parseStringBMP = function(a, b) {
        for (var c = "", d = a; d < b; d += 2) var k = this.get(d),
            l = this.get(d + 1),
            c = c + String.fromCharCode((k << 8) + l);
        return c
    };
    b.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
    b.prototype.parseTime = function(a, b) {
        var c =
            this.parseStringISO(a, b),
            d = this.reTime.exec(c);
        if (!d) return "Unrecognized time: " + c;
        c = d[1] + "-" + d[2] + "-" + d[3] + " " + d[4];
        d[5] && (c += ":" + d[5], d[6] && (c += ":" + d[6], d[7] && (c += "." + d[7])));
        d[8] && (c += " UTC", "Z" != d[8] && (c += d[8], d[9] && (c += ":" + d[9])));
        return c
    };
    b.prototype.parseInteger = function(a, c) {
        var b = c - a;
        if (4 < b) {
            var b = b << 3,
                d = this.get(a);
            if (0 === d) b -= 8;
            else
                for (; 128 > d;) d <<= 1, --b;
            return "(" + b + " bit)"
        }
        b = 0;
        for (d = a; d < c; ++d) b = b << 8 | this.get(d);
        return b
    };
    b.prototype.parseBitString = function(a, c) {
        var b = this.get(a),
            d = (c -
                a - 1 << 3) - b,
            k = "(" + d + " bit)";
        if (20 >= d)
            for (var l = b, k = k + " ", b = c - 1; b > a; --b) {
                for (d = this.get(b); 8 > l; ++l) k += d >> l & 1 ? "1" : "0";
                l = 0
            }
        return k
    };
    b.prototype.parseOctetString = function(a, b) {
        var c = b - a,
            d = "(" + c + " byte) ";
        100 < c && (b = a + 100);
        for (var k = a; k < b; ++k) d += this.hexByte(this.get(k));
        100 < c && (d += "\u2026");
        return d
    };
    b.prototype.parseOID = function(a, b) {
        for (var c = "", d = 0, k = 0, l = a; l < b; ++l) {
            var n = this.get(l),
                d = d << 7 | n & 127,
                k = k + 7;
            n & 128 || ("" === c ? (c = 80 > d ? 40 > d ? 0 : 1 : 2, c = c + "." + (d - 40 * c)) : c += "." + (31 <= k ? "bigint" : d), d = k = 0)
        }
        return c
    };
    c.prototype.typeName =
        function() {
            if (this.tag === a) return "unknown";
            var c = this.tag & 31;
            switch (this.tag >> 6) {
                case 0:
                    switch (c) {
                        case 0:
                            return "EOC";
                        case 1:
                            return "BOOLEAN";
                        case 2:
                            return "INTEGER";
                        case 3:
                            return "BIT_STRING";
                        case 4:
                            return "OCTET_STRING";
                        case 5:
                            return "NULL";
                        case 6:
                            return "OBJECT_IDENTIFIER";
                        case 7:
                            return "ObjectDescriptor";
                        case 8:
                            return "EXTERNAL";
                        case 9:
                            return "REAL";
                        case 10:
                            return "ENUMERATED";
                        case 11:
                            return "EMBEDDED_PDV";
                        case 12:
                            return "UTF8String";
                        case 16:
                            return "SEQUENCE";
                        case 17:
                            return "SET";
                        case 18:
                            return "NumericString";
                        case 19:
                            return "PrintableString";
                        case 20:
                            return "TeletexString";
                        case 21:
                            return "VideotexString";
                        case 22:
                            return "IA5String";
                        case 23:
                            return "UTCTime";
                        case 24:
                            return "GeneralizedTime";
                        case 25:
                            return "GraphicString";
                        case 26:
                            return "VisibleString";
                        case 27:
                            return "GeneralString";
                        case 28:
                            return "UniversalString";
                        case 30:
                            return "BMPString";
                        default:
                            return "Universal_" + c.toString(16)
                    }
                case 1:
                    return "Application_" + c.toString(16);
                case 2:
                    return "[" + c + "]";
                case 3:
                    return "Private_" + c.toString(16)
            }
    };
    c.prototype.reSeemsASCII = /^[ -~]+$/;
    c.prototype.content = function() {
        if (this.tag === a) return null;
        var c = this.tag >> 6,
            b = this.tag & 31,
            d = this.posContent(),
            f = Math.abs(this.length);
        if (0 !== c) {
            if (null !== this.sub) return "(" + this.sub.length + " elem)";
            c = this.stream.parseStringISO(d, d + Math.min(f, 100));
            return this.reSeemsASCII.test(c) ? c.substring(0, 200) + (200 < c.length ? "\u2026" : "") : this.stream.parseOctetString(d, d + f)
        }
        switch (b) {
            case 1:
                return 0 === this.stream.get(d) ? "false" : "true";
            case 2:
                return this.stream.parseInteger(d, d + f);
            case 3:
                return this.sub ? "(" + this.sub.length +
                    " elem)" : this.stream.parseBitString(d, d + f);
            case 4:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(d, d + f);
            case 6:
                return this.stream.parseOID(d, d + f);
            case 16:
            case 17:
                return "(" + this.sub.length + " elem)";
            case 12:
                return this.stream.parseStringUTF(d, d + f);
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 26:
                return this.stream.parseStringISO(d, d + f);
            case 30:
                return this.stream.parseStringBMP(d, d + f);
            case 23:
            case 24:
                return this.stream.parseTime(d, d + f)
        }
        return null
    };
    c.prototype.toString = function() {
        return this.typeName() +
            "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
    };
    c.prototype.print = function(c) {
        c === a && (c = "");
        document.writeln(c + this);
        if (null !== this.sub) {
            c += "  ";
            for (var b = 0, d = this.sub.length; b < d; ++b) this.sub[b].print(c)
        }
    };
    c.prototype.toPrettyString = function(c) {
        c === a && (c = "");
        var b = c + this.typeName() + " @" + this.stream.pos;
        0 <= this.length && (b += "+");
        b += this.length;
        this.tag & 32 ? b += " (constructed)" : 3 != this.tag && 4 != this.tag || null === this.sub || (b += " (encapsulates)");
        b += "\n";
        if (null !== this.sub) {
            c += "  ";
            for (var d = 0, f = this.sub.length; d < f; ++d) b += this.sub[d].toPrettyString(c)
        }
        return b
    };
    c.prototype.toDOM = function() {
        var a = d.tag("div", "node");
        a.asn1 = this;
        var c = d.tag("div", "head"),
            b = this.typeName().replace(/_/g, " ");
        c.innerHTML = b;
        var f = this.content();
        null !== f && (f = String(f).replace(/</g, "&lt;"), b = d.tag("span", "preview"), b.appendChild(d.text(f)), c.appendChild(b));
        a.appendChild(c);
        this.node = a;
        this.head = c;
        var k = d.tag("div", "value"),
            b = "Offset: " + this.stream.pos + "<br/>",
            b =
            b + ("Length: " + this.header + "+"),
            b = 0 <= this.length ? b + this.length : b + (-this.length + " (undefined)");
        this.tag & 32 ? b += "<br/>(constructed)" : 3 != this.tag && 4 != this.tag || null === this.sub || (b += "<br/>(encapsulates)");
        null !== f && (b += "<br/>Value:<br/><b>" + f + "</b>", "object" === typeof oids && 6 == this.tag && (f = oids[f])) && (f.d && (b += "<br/>" + f.d), f.c && (b += "<br/>" + f.c), f.w && (b += "<br/>(warning!)"));
        k.innerHTML = b;
        a.appendChild(k);
        b = d.tag("div", "sub");
        if (null !== this.sub)
            for (f = 0, k = this.sub.length; f < k; ++f) b.appendChild(this.sub[f].toDOM());
        a.appendChild(b);
        c.onclick = function() {
            a.className = "node collapsed" == a.className ? "node" : "node collapsed"
        };
        return a
    };
    c.prototype.posStart = function() {
        return this.stream.pos
    };
    c.prototype.posContent = function() {
        return this.stream.pos + this.header
    };
    c.prototype.posEnd = function() {
        return this.stream.pos + this.header + Math.abs(this.length)
    };
    c.prototype.fakeHover = function(a) {
        this.node.className += " hover";
        a && (this.head.className += " hover")
    };
    c.prototype.fakeOut = function(a) {
        var b = / ?hover/;
        this.node.className = this.node.className.replace(b,
            "");
        a && (this.head.className = this.head.className.replace(b, ""))
    };
    c.prototype.toHexDOM_sub = function(a, b, c, f, k) {
        f >= k || (b = d.tag("span", b), b.appendChild(d.text(c.hexDump(f, k))), a.appendChild(b))
    };
    c.prototype.toHexDOM = function(b) {
        var c = d.tag("span", "hex");
        b === a && (b = c);
        this.head.hexNode = c;
        this.head.onmouseover = function() {
            this.hexNode.className = "hexCurrent"
        };
        this.head.onmouseout = function() {
            this.hexNode.className = "hex"
        };
        c.asn1 = this;
        c.onmouseover = function() {
            var a = !b.selected;
            a && (b.selected = this.asn1, this.className =
                "hexCurrent");
            this.asn1.fakeHover(a)
        };
        c.onmouseout = function() {
            var a = b.selected == this.asn1;
            this.asn1.fakeOut(a);
            a && (b.selected = null, this.className = "hex")
        };
        this.toHexDOM_sub(c, "tag", this.stream, this.posStart(), this.posStart() + 1);
        this.toHexDOM_sub(c, 0 <= this.length ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent());
        if (null === this.sub) c.appendChild(d.text(this.stream.hexDump(this.posContent(), this.posEnd())));
        else if (0 < this.sub.length) {
            var h = this.sub[0],
                f = this.sub[this.sub.length - 1];
            this.toHexDOM_sub(c,
                "intro", this.stream, this.posContent(), h.posStart());
            for (var h = 0, k = this.sub.length; h < k; ++h) c.appendChild(this.sub[h].toHexDOM(b));
            this.toHexDOM_sub(c, "outro", this.stream, f.posEnd(), this.posEnd())
        }
        return c
    };
    c.prototype.toHexString = function(a) {
        return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
    };
    c.decodeLength = function(a) {
        var b = a.get(),
            c = b & 127;
        if (c == b) return c;
        if (3 < c) throw "Length over 24 bits not supported at position " + (a.pos - 1);
        if (0 === c) return -1;
        for (var d = b = 0; d < c; ++d) b = b << 8 | a.get();
        return b
    };
    c.hasContent = function(a, d, h) {
        if (a & 32) return !0;
        if (3 > a || 4 < a) return !1;
        var f = new b(h);
        3 == a && f.get();
        if (f.get() >> 6 & 1) return !1;
        try {
            var k = c.decodeLength(f);
            return f.pos - h.pos + k == d
        } catch (l) {
            return !1
        }
    };
    c.decode = function(a) {
        a instanceof b || (a = new b(a, 0));
        var d = new b(a),
            h = a.get(),
            f = c.decodeLength(a),
            k = a.pos - d.pos,
            l = null;
        if (c.hasContent(h, f, a)) {
            var n = a.pos;
            3 == h && a.get();
            l = [];
            if (0 <= f) {
                for (var m = n + f; a.pos < m;) l[l.length] = c.decode(a);
                if (a.pos != m) throw "Content size is not correct for container starting at offset " +
                    n;
            } else try {
                for (;;) {
                    m = c.decode(a);
                    if (0 === m.tag) break;
                    l[l.length] = m
                }
                f = n - a.pos
            } catch (q) {
                throw "Exception while decoding undefined length content: " + q;
            }
        } else a.pos += f;
        return new c(d, k, f, h, l)
    };
    c.test = function() {
        for (var a = [{
            value: [39],
            expected: 39
        }, {
            value: [129, 201],
            expected: 201
        }, {
            value: [131, 254, 220, 186],
            expected: 16702650
        }], d = 0, h = a.length; d < h; ++d) {
            var f = new b(a[d].value, 0),
                f = c.decodeLength(f);
            f != a[d].expected && document.write("In test[" + d + "] expected " + a[d].expected + " got " + f + "\n")
        }
    };
    c.prototype.getHexStringValue =
        function() {
            return this.toHexString().substr(2 * this.header, 2 * this.length)
    };
    window.ASN1 = c
})();

function parsePEMKey(a, b) {
    try {
        var c = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(a) ? Hex.decode(a) : Base64.unarmor(a),
            d = ASN1.decode(c);
        3 === d.sub.length && (d = d.sub[2].sub[0]);
        if (9 === d.sub.length) {
            var e = asmCrypto.hex_to_bytes(d.sub[1].getHexStringValue()),
                g = asmCrypto.hex_to_bytes(d.sub[2].getHexStringValue()),
                h = asmCrypto.hex_to_bytes(d.sub[3].getHexStringValue()),
                f = asmCrypto.hex_to_bytes(d.sub[4].getHexStringValue()),
                k = asmCrypto.hex_to_bytes(d.sub[5].getHexStringValue()),
                l = asmCrypto.hex_to_bytes(d.sub[6].getHexStringValue()),
                n = asmCrypto.hex_to_bytes(d.sub[7].getHexStringValue()),
                m = asmCrypto.hex_to_bytes(d.sub[8].getHexStringValue());
            return b ? [e, g] : [e, g, h, f, k, l, n, m]
        }
        return 2 === d.sub.length ? [asmCrypto.hex_to_bytes(d.sub[0].getHexStringValue()), asmCrypto.hex_to_bytes(d.sub[1].getHexStringValue())] : !1
    } catch (q) {
        return !1
    }
}

function exportPrivateKey(a) {
    console.log("received priv", a);
    a = {
        array: [new KJUR.asn1.DERInteger({
                "int": 0
            }), new KJUR.asn1.DERInteger({
                hex: asmCrypto.bytes_to_hex(a[0])
            }), new KJUR.asn1.DERInteger({
                hex: asmCrypto.bytes_to_hex(a[1])
            }), new KJUR.asn1.DERInteger({
                hex: asmCrypto.bytes_to_hex(a[2])
            }), new KJUR.asn1.DERInteger({
                hex: asmCrypto.bytes_to_hex(a[3])
            }), new KJUR.asn1.DERInteger({
                hex: asmCrypto.bytes_to_hex(a[4])
            }), new KJUR.asn1.DERInteger({
                hex: asmCrypto.bytes_to_hex(a[5])
            }), new KJUR.asn1.DERInteger({
                hex: asmCrypto.bytes_to_hex(a[6])
            }),
            new KJUR.asn1.DERInteger({
                hex: asmCrypto.bytes_to_hex(a[7])
            })
        ]
    };
    return (new KJUR.asn1.DERSequence(a)).getEncodedHex()
}

function exportPublicKey(a) {
    a = {
        array: [new KJUR.asn1.DERInteger({
            hex: asmCrypto.bytes_to_hex(a[0])
        }), new KJUR.asn1.DERInteger({
            hex: asmCrypto.bytes_to_hex(a[1])
        })]
    };
    return (new KJUR.asn1.DERSequence(a)).getEncodedHex()
};