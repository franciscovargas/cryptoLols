var Nibbler = function(a) {
        var h, b, d, k, l, m, s, n, c, e;
        c = function(a, b) {
            for (var f; 0 !== b;) f = b, b = a % b, a = f;
            return a
        };
        e = function(a, b, f, d) {
            var c, e, t, r, q, g, p, u;
            u = function(a) {
                d ? l ? p.push(a) : p.push(String.fromCharCode(a)) : p.push(k.charAt(a))
            };
            g = q = 0;
            p = [];
            e = a.length;
            for (c = 0; c < e; c += 1) {
                g += b;
                if (d)
                    if (t = a.charAt(c), r = k.indexOf(t), t === h) break;
                    else {
                        if (0 > r) throw 'the character "' + t + '" is not a member of ' + k;
                    } else if (r = l ? a[c] : a.charCodeAt(c), (r | n) !== n) throw r + " is outside the range 0-" + n;
                for (q = q << b | r; g >= f;) g -= f, u(q >> g), q &= m[g]
            }
            if (!d &&
                0 < g)
                for (u(q << f - g); 0 < p.length % s;) p.push(h);
            return l && d ? p : p.join("")
        };
        this.encode = function(a) {
            return e(a, b, d, !1)
        };
        this.decode = function(a) {
            return e(a, d, b, !0)
        };
        (function() {
            var e, v, f;
            h = a.pad || "";
            b = a.dataBits;
            d = a.codeBits;
            k = a.keyString;
            l = a.arrayData;
            v = Math.max(b, d);
            f = 0;
            m = [];
            for (e = 0; e < v; e += 1) m.push(f), f += f + 1;
            n = f;
            s = b / c(b, d)
        })()
    },
    base32 = new Nibbler({
        dataBits: 8,
        codeBits: 5,
        keyString: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
        pad: "="
    }),
    Base64Binary = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        decodeArrayBuffer: function(a) {
            var h = new ArrayBuffer(3 * (a.length / 4));
            this.decode(a, h);
            return h
        },
        decode: function(a, h) {
            var b = this._keyStr.indexOf(a.charAt(a.length - 1)),
                d = this._keyStr.indexOf(a.charAt(a.length - 2)),
                k = 3 * (a.length / 4);
            64 == b && k--;
            64 == d && k--;
            var l, m, s, n, c = 0,
                e = 0,
                b = h ? new Uint8Array(h) : new Uint8Array(k);
            a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            for (c = 0; c < k; c += 3) l = this._keyStr.indexOf(a.charAt(e++)), m = this._keyStr.indexOf(a.charAt(e++)), d = this._keyStr.indexOf(a.charAt(e++)), n = this._keyStr.indexOf(a.charAt(e++)),
                l = l << 2 | m >> 4, m = (m & 15) << 4 | d >> 2, s = (d & 3) << 6 | n, b[c] = l, 64 != d && (b[c + 1] = m), 64 != n && (b[c + 2] = s);
            return b
        }
    };