var pCrypt = {
    locked: !0,
    keychain: null,
    MAX_LEVEL_SIZE: [4096, 528384, 67637248, 8657571840, 1108169199616, 0x810204081000, 0x40810204081000],
    SECTOR_SIZE: 4096,
    AUTH_SIZE: 32,
    TREE_SECTORS: 128,
    MAX_TREE_LEVELS: 6,
    offset_template: {
        needmasterauth: null,
        masterauthoffset: null,
        plainsize: 0,
        sectors: 0,
        ciphersize: 0,
        treelevels: 0,
        lastauthsectoroffset: [],
        lastauthsectorlength: []
    },
    offsetTemplate: function() {
        return $.extend({}, this.offset_template, {
            lastauthsectoroffset: [],
            lastauthsectorlength: []
        })
    },
    download_template: {
        data: null,
        readbuffer: null,
        offsets: null,
        authdata: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
        authdatacnt: [0, 0, 0, 0, 0, 0],
        sectorid: 0
    },
    downloadData: function() {
        return $.extend({}, this.download_template, {
            authdata: [
                [],
                [],
                [],
                [],
                [],
                []
            ],
            authdatacnt: [0, 0, 0, 0, 0, 0]
        })
    },
    upload_template: {
        authdata: [
            [],
            [],
            [],
            [],
            [],
            []
        ],
        authdatacnt: [0, 0, 0, 0, 0, 0],
        offsets: null,
        sectorid: 0
    },
    uploadData: function() {
        return $.extend({}, this.upload_template, {
            authdata: [
                [],
                [],
                [],
                [],
                [],
                []
            ],
            authdatacnt: [0, 0, 0, 0, 0, 0]
        })
    },
    privatekey: {
        type: null,
        flags: null,
        salt: null,
        privatekey: null
    },
    init: function() {
        sjcl.random.startCollectors();
        EntropyCollector.start();
        this._seed();
        this.seed = !1
    },
    lock: function() {
        this.locked = !0;
        this.keychain = !1
    },
    decryptPrivateKey: function(a, b, c) {
        b = this._parsePrivateKey(b);
        c = this._parsePublicKey(c);
        var d;
        try {
            d = asmCrypto.PBKDF2_HMAC_SHA512.bytes(a, b.salt, 2E4, 48)
        } catch (e) {
            return !1
        }
        a = sjcl.codec.bytes.toBits(d.subarray(0, 32));
        d = sjcl.codec.bytes.toBits(d.subarray(32));
        d = parsePEMKey(sjcl.codec.hex.fromBits(sjcl.mode.pctr.encrypt(new sjcl.cipher.aes(a), sjcl.codec.bytes.toBits(b.key), d)));
        if (!d) return !1;
        c.key = parsePEMKey(asmCrypto.bytes_to_hex(c.key));
        if (!c.key) return !1;
        b.key = this._cleanPemKey(d);
        c.key = this._cleanPemKey(c.key);
        b = {
            "private": b,
            "public": c
        };
        if (!this._validateKeyPair(b["private"].key, b["public"].key)) return !1;
        this.keychain = b;
        this.locked = !1;
        return !0
    },
    setupCrypto: function(a, b, c) {
        var d = this.getRandomBytes(64),
            e, f, h, g = this;
        try {
            e = asmCrypto.PBKDF2_HMAC_SHA512.bytes(a, d, 2E4, 48)
        } catch (k) {
            return c("Inapropriate password."), !1
        }
        f = sjcl.codec.bytes.toBits(e.subarray(0, 32));
        h = sjcl.codec.bytes.toBits(e.subarray(32));
        this._generateRSAKeyPair(function(a) {
            console.log("da keys");
            console.log(a);
            var c = exportPrivateKey(g._prepDerIntegers(a["private"]));
            a = exportPublicKey(g._prepDerIntegers(a["public"]));
            console.log(c);
            console.log(a);
            c = sjcl.mode.pctr.encrypt(new sjcl.cipher.aes(f), sjcl.codec.hex.toBits(c), h);
            c = g._arrconcat(g._uint32toBytearray(0), g._uint32toBytearray(0), g._ab2ar(d), sjcl.codec.bytes.fromBits(c));
            console.log("privstruct", c);
            a = g._arrconcat(g._uint32toBytearray(0), g._uint32toBytearray(0), sjcl.codec.bytes.fromBits(sjcl.codec.hex.toBits(a)));
            b({
                "private": uint8ArrayToBase64url(c),
                "public": uint8ArrayToBase64url(a)
            })
        });
        return !0
    },
    exportKeys: function() {
        var a = exportPrivateKey(this._prepDerIntegers(this.keychain["private"].key)),
            b = exportPublicKey(this._prepDerIntegers(this.keychain["public"].key));
        console.log("hexpriv", a);
        console.log("hexpub", b)
    },
    _generateRSAKeyPair: function(a) {
        var b = new Worker("/js/workers/worker-genkeys.js");
        b.postMessage({
            action: "seed",
            data: this.getRandomBytes(64)
        });
        b.postMessage({
            action: "genkeys"
        });
        b.onmessage = function(c) {
            if ("rsakey" == c.data.message) {
                c = c.data.key;
                var d = pCrypt._getPublicKeyFromPrivate(c);
                pCrypt._validateKeyPair(c, d) ? a({
                    "private": c,
                    "public": d
                }) : a(!1);
                b.terminate()
            }
        }
    },
    decryptfolderkey: function(a) {
        this._needunlocked();
        var b;
        try {
            b = this.decrypt(base64urlToUint8Array(a))
        } catch (c) {
            return !1
        }
        return {
            type: this._uint8ArrayToUint32Number(b.subarray(0, 4)),
            flags: this._uint8ArrayToUint32Number(b.subarray(4, 8)),
            aesKey: b.subarray(8, 40),
            hmacKey: b.subarray(40)
        }
    },
    decryptCekKey: function(a) {
        return this.decryptfolderkey(a)
    },
    generatefolderkey: function() {
        return this.generateCekKey(1)
    },
    generatefilekey: function() {
        return this.generateCekKey(0)
    },
    generateCekKey: function(a) {
        this._needunlocked();
        var b = this.getRandomBytes(160);
        a = this.encrypt(new Uint8Array(this._abconcat(this._uint32toBytearray(0), this._uint32toBytearray(a || 0), b.subarray(0, 32), b.subarray(32))));
        return uint8ArrayToBase64url(a)
    },
    decryptname: function(a, b) {
        var c = asmCrypto.string_to_bytes(this._b32dec(a)),
            d = b.aesKey,
            e = b.hmacKey;
        if (16 == c.length) return this._bytestoutf8(this._removePadArray(this._xorbytes(asmCrypto.AES_ECB.decrypt(c,
            d, !1), e.subarray(0, 16))));
        var f = asmCrypto.AES_CBC.decrypt(c.subarray(16), d, !1, c.subarray(0, 16)),
            e = asmCrypto.HMAC_SHA512.bytes(this._removePadUint8(f), e),
            c = asmCrypto.AES_CBC.decrypt(c.subarray(0, 16), d, !1, e.subarray(0, 16));
        return this._bytestoutf8(this._abconcat(c, this._removePadUint8(f)))
    },
    _bytestoutf8: function(a) {
        return sjcl.codec.utf8String.fromBits(sjcl.codec.bytes.toBits(a))
    },
    _utf8tobytes: function(a) {
        return sjcl.codec.bytes.fromBits(sjcl.codec.utf8String.toBits(a))
    },
    encryptname: function(a, b) {
        var c =
            new Uint8Array(this._arrayAlignTo(this._ab2ar(this._utf8tobytes(a)), 16)),
            d = b.aesKey,
            e = b.hmacKey,
            c = 16 == c.length ? asmCrypto.AES_ECB.encrypt(new Uint8Array(this._xorbytes(c, e.subarray(0, 16))), d).subarray(0, 16) : asmCrypto.AES_CBC.encrypt(c, d, !1, asmCrypto.HMAC_SHA512.bytes(this._removePadUint8(c.subarray(16)), e).subarray(0, 16));
        return this._b32enc(asmCrypto.bytes_to_string(c))
    },
    seed: !1,
    _seed: function() {
        console.log("seeding");
        var a = asmCrypto.random.seed(new Uint8Array(sjcl.codec.bytes.fromBits(sjcl.random.randomWords(32))));
        console.log("seed", a);
        this.seed = !0
    },
    getRandomBytes: function(a) {
        this.seed || this._seed();
        return asmCrypto.getRandomValues(new Uint8Array(a))
    },
    _b32enc: function(a) {
        return base32.encode(a).replace(/=/g, "").toUpperCase()
    },
    _b32dec: function(a) {
        return base32.decode(a)
    },
    _needunlocked: function() {
        if (this.locked) throw Error("crypto is locked");
    },
    encryptText: function(a) {
        return this.encrypt(asmCrypto.string_to_bytes(a))
    },
    decryptText: function(a) {
        return asmCrypto.bytes_to_string(this.decrypt(a))
    },
    encrypt: function(a) {
        this._needunlocked();
        return asmCrypto.RSA_OAEP_SHA1.encrypt(a, this.keychain["public"].key)
    },
    decrypt: function(a) {
        this._needunlocked();
        return asmCrypto.RSA_OAEP_SHA1.decrypt(a, this.keychain["private"].key)
    },
    _validateKeyPair: function(a, b) {
        this.seed || this._seed();
        var c = sjcl.codec.hex.fromBits(sjcl.random.randomWords(4)),
            d;
        try {
            d = c == asmCrypto.bytes_to_string(asmCrypto.RSA_OAEP_SHA1.decrypt(asmCrypto.RSA_OAEP_SHA1.encrypt(asmCrypto.string_to_bytes(c), b), a))
        } catch (e) {
            d = !1
        }
        return d
    },
    _cleanPemKey: function(a) {
        for (var b = 0; b < a.length; ++b) a[b][0] ||
            1 == b || (a[b] = a[b].subarray(1));
        return a
    },
    _prepDerIntegers: function(a) {
        for (var b = 0; b < a.length; ++b) a[b][0] & 128 && (a[b] = this._abconcat([0], a[b]));
        return a
    },
    _parsePrivateKey: function(a) {
        a = base64urlToUint8Array(a);
        return {
            type: this._uint8ArrayToUint32Number(a.subarray(0, 4)),
            flags: this._uint8ArrayToUint32Number(a.subarray(4, 8)),
            salt: a.subarray(8, 72),
            key: a.subarray(72)
        }
    },
    _parsePublicKey: function(a) {
        a = base64urlToUint8Array(a);
        return {
            type: a.subarray(0, 4),
            flags: a.subarray(4, 8),
            key: a.subarray(8)
        }
    },
    _getPublicKeyFromPrivate: function(a) {
        return [a[0],
            a[1]
        ]
    },
    _removePadUint8: function(a) {
        for (var b = a.length, c = a.length - 1; 0 == a[c]; --c) b--;
        return a.subarray(0, b)
    },
    _removePadArray: function(a) {
        for (var b = a.length - 1; 0 <= b && !a[b]; --b) a.splice(b, 1);
        return a
    },
    _ab2ar: function(a) {
        for (var b = [], c = 0; c < a.length; ++c) b.push(a[c]);
        return b
    },
    _abconcat: function() {
        for (var a = [], b = 0; b < arguments.length; ++b) a = a.concat(this._ab2ar(arguments[b]));
        return new Uint8Array(a)
    },
    _arrconcat: function() {
        for (var a = [], b = 0; b < arguments.length; ++b) a = a.concat(arguments[b]);
        return a
    },
    _arrayAlignTo: function(a,
        b) {
        if (!(a.length % b)) return a;
        for (var c = b - a.length % b, d = 0; d < c; ++d) a.push(0);
        return a
    },
    _xorbytes: function(a, b) {
        if (a.length != b.length) throw Error("lengths of byte arrays must match");
        for (var c = [], d = 0; d < a.length; ++d) c.push(a[d] ^ b[d]);
        return c
    },
    _xorbyteslen: function(a, b, c) {
        if (a.length < c || b.length < c) throw Error("arrays not big enough");
        for (var d = [], e = 0; e < c; ++e) d.push(a[e] ^ b[e]);
        return d
    },
    _bytescmp: function(a, b) {
        if (a.length != b.length) return !1;
        for (var c = 0; c < a.length; ++c)
            if (a[c] != b[c]) return !1;
        return !0
    },
    _uint8ArrayToUint32Number: function(a) {
        return (new Uint32Array((new Uint8Array($.extend([],
            a))).buffer))[0]
    },
    _uint64toBytearray: function(a) {
        for (var b = [0, 0, 0, 0, 0, 0, 0, 0], c = 0; 8 > c && a;) b[c] = a % 256, a = Math.trunc(a / 256), ++c;
        return b
    },
    _uint32toBytearray: function(a) {
        for (var b = [0, 0, 0, 0], c = 0; 4 > c && a;) b[c] = a % 256, a = Math.trunc(a / 256), ++c;
        return b
    },
    plainOffsets: function(a) {
        var b = this.offsetTemplate(),
            c, d, e;
        b.plainsize = a;
        b.sectors = Math.ceil(a / pCrypt.SECTOR_SIZE);
        b.needmasterauth = a > pCrypt.SECTOR_SIZE;
        c = Math.trunc(a / pCrypt.SECTOR_SIZE);
        d = a % pCrypt.SECTOR_SIZE;
        0 == d && (c--, d = pCrypt.SECTOR_SIZE);
        c = this.dataCipherOffsetBySectorid(c) +
            d;
        d = 0;
        a = Math.trunc((a + pCrypt.SECTOR_SIZE - 1) / pCrypt.SECTOR_SIZE);
        do e = a % pCrypt.TREE_SECTORS, a = Math.trunc((a + pCrypt.TREE_SECTORS - 1) / pCrypt.TREE_SECTORS), e || (e = pCrypt.TREE_SECTORS), e *= pCrypt.AUTH_SIZE, b.lastauthsectoroffset[d] = c, b.lastauthsectorlength[d] = e, c += e, d++; while (1 < a);
        b.needmasterauth ? (b.lastauthsectoroffset[d] = c, b.lastauthsectorlength[d] = pCrypt.AUTH_SIZE, b.masterauthoffset = c, b.treelevels = d) : b.masterauthoffset = c - pCrypt.AUTH_SIZE;
        b.ciphersize = b.masterauthoffset + pCrypt.AUTH_SIZE;
        return b
    },
    cipherOffsets: function(a) {
        var b =
            0,
            c, d, e = this.offsetTemplate();
        if (a <= pCrypt.AUTH_SIZE) return e;
        e.ciphersize = a;
        e.needmasterauth = a > pCrypt.SECTOR_SIZE + pCrypt.AUTH_SIZE;
        a -= pCrypt.AUTH_SIZE;
        for (e.masterauthoffset = e.needmasterauth ? a : a + pCrypt.AUTH_SIZE; b < pCrypt.MAX_LEVEL_SIZE.length && !(a <= pCrypt.MAX_LEVEL_SIZE[b]); ++b);
        c = a;
        e.treelevels = b;
        e.lastauthsectoroffset[b] = c;
        for (e.lastauthsectorlength[b] = pCrypt.AUTH_SIZE; b;)--b, d = Math.floor((a + pCrypt.MAX_LEVEL_SIZE[b] + pCrypt.AUTH_SIZE - 1) / (pCrypt.MAX_LEVEL_SIZE[b] + pCrypt.AUTH_SIZE)), a -= d * pCrypt.AUTH_SIZE,
        d %= pCrypt.TREE_SECTORS, d || (d = pCrypt.TREE_SECTORS), c -= d * pCrypt.AUTH_SIZE, e.lastauthsectoroffset[b] = c, e.lastauthsectorlength[b] = d * pCrypt.AUTH_SIZE;
        e.plainsize = a;
        e.sectors = Math.ceil(a / pCrypt.SECTOR_SIZE);
        return e
    },
    cipherSizeToPlainSize: function(a) {
        return this.cipherOffsets(a).plainsize
    },
    levelAuthOffset: function(a, b) {
        var c;
        for (c = pCrypt.MAX_LEVEL_SIZE[a + 1] * (b + 1) - pCrypt.SECTOR_SIZE; b >= pCrypt.TREE_SECTORS;) b = Math.trunc(b / pCrypt.TREE_SECTORS), c += b * pCrypt.SECTOR_SIZE;
        return c
    },
    dataCipherOffsetBySectorid: function(a) {
        var b;
        for (b = a * pCrypt.SECTOR_SIZE; a >= pCrypt.TREE_SECTORS;) a = Math.trunc(a / pCrypt.TREE_SECTORS), b += a * pCrypt.SECTOR_SIZE;
        return b
    },
    dataCipherBlockBySectorid: function(a) {
        var b = dataCipherOffsetBySectorid(a);
        a = dataCipherOffsetBySectorid(a + 1);
        return {
            offset: b,
            end: a,
            length: a - b
        }
    },
    getLastSectoridBySize: function(a) {
        if (a) return Math.trunc((a - 1) / pCrypt.SECTOR_SIZE)
    },
    authSectorOffset: function(a, b, c) {
        var d, e;
        d = Math.trunc(this.getLastSectoridBySize(c.plainsize) / pCrypt.TREE_SECTORS);
        e = Math.trunc(a / pCrypt.TREE_SECTORS);
        a %=
            pCrypt.TREE_SECTORS;
        for (var f = 0; f < b; ++f) d = Math.trunc(d / pCrypt.TREE_SECTORS), a = e % pCrypt.TREE_SECTORS, e = Math.trunc(e / pCrypt.TREE_SECTORS);
        e == d ? (d = c.lastauthsectoroffset[b], b = c.lastauthsectorlength[b]) : (d = this.levelAuthOffset(b, e), b = pCrypt.SECTOR_SIZE);
        return {
            offset: d,
            length: b,
            authid: a
        }
    },
    dataOffsetBySectorid: function(a) {
        alert("somebody called me");
        throw Error();
    },
    dataSectoridBySectorid: function(a) {
        for (var b = a; a >= pCrypt.TREE_SECTORS;) a = Math.trunc(a / pCrypt.TREE_SECTORS), b += a;
        return b
    },
    cipherDownloadOffset: function(a,
        b) {
        var c = this.dataCipherOffsetBySectorid(a),
            d = this.dataCipherOffsetBySectorid(a + pCrypt.TREE_SECTORS);
        a + pCrypt.TREE_SECTORS > b.sectors && (d = b.ciphersize);
        return {
            offset: c,
            end: d,
            length: d - c
        }
    },
    plainUploadOffset: function(a, b) {
        var c = a * pCrypt.SECTOR_SIZE,
            d = (a + pCrypt.TREE_SECTORS) * pCrypt.SECTOR_SIZE;
        d > b && (d = b);
        return {
            offset: c,
            end: d,
            length: d - c
        }
    },
    plainSectorOffset: function(a, b) {
        return b * pCrypt.SECTOR_SIZE
    },
    decryptSector: function(a, b, c, d) {
        var e = a.aesKey;
        a = a.hmacKey;
        var f;
        f = asmCrypto.AES_ECB.decrypt(c, e, !1);
        c = this._ab2ar(f.subarray(0,
            8)).concat(this._ab2ar(f.subarray(24)));
        f = this._ab2ar(f.subarray(8, 24));
        var h = [],
            g, k, p;
        if (16 > b.length) h = this._xorbyteslen(c, b, b.length), c = this._ab2ar(b).concat(this._ab2ar(c.slice(b.length)));
        else if (b.length % 16 && (g = b.length % 16, p = b.length - 16 - g, k = b.subarray(p), b = b.subarray(0, p)), b.length && (h = asmCrypto.AES_CBC.decrypt(b, e, !1, new Uint8Array(f))), k) {
            var q;
            p = b.length ? b.subarray(p - 16, p) : new Uint8Array(f);
            q = asmCrypto.AES_ECB.decrypt(k.subarray(0, 16), e, !1);
            b = this._xorbytes(q.subarray(0, g), k.subarray(16));
            g = this._abconcat(k.subarray(16), q.subarray(g));
            q = asmCrypto.AES_CBC.decrypt(g, e, !1, p);
            h = this._abconcat(h, q, b)
        }
        e = this._ab2ar(h);
        sjcl.codec.bytes.toBits(h);
        new sjcl.misc.hmac(sjcl.codec.bytes.toBits(a), sjcl.hash.sha512);
        d = new Uint8Array(e.concat(this._uint64toBytearray(d)).concat(c));
        if (!this._bytescmp(asmCrypto.HMAC_SHA512.bytes(d, a).subarray(0, 16), f)) throw Error("compare fail");
        return new Uint8Array(e)
    },
    encryptSector: function(a, b, c) {
        var d = a.aesKey,
            e = a.hmacKey;
        a = pCrypt.getRandomBytes(16);
        c = new Uint8Array(this._ab2ar(b).concat(this._uint64toBytearray(c)).concat(this._ab2ar(a)));
        c = asmCrypto.HMAC_SHA512.bytes(c, e).subarray(0, 16);
        var f, h;
        if (16 > b.length) e = a.subarray(0, b.length), a = this._abconcat(this._xorbyteslen(a, b, b.length), a.subarray(b.length));
        else if (b.length % 16 && (h = b.length % 16, e = b.length - 16 - h, f = b.subarray(e), b = b.subarray(0, e)), e = [], b.length && (e = asmCrypto.AES_CBC.encrypt(b, d, !1, c)), f) {
            var g;
            b = e.length ? e.subarray(e.length - 16) : c;
            g = asmCrypto.AES_CBC.encrypt(f.subarray(0, 16), d, !1, b);
            b = g.subarray(0, h);
            g = this._xorbyteslen(g, f.subarray(16), h).concat(this._ab2ar(g.subarray(h)));
            f = asmCrypto.AES_ECB.encrypt(new Uint8Array(g), d, !1);
            e = this._abconcat(e, f, b)
        }
        d = asmCrypto.AES_ECB.encrypt(this._abconcat(a.subarray(0, 8), c, a.subarray(8)), d, !1);
        return {
            data: e,
            auth: d
        }
    },
    signSectorAuth: function(a, b) {
        var c = a.aesKey,
            d;
        d = asmCrypto.HMAC_SHA512.bytes(b, a.hmacKey).subarray(0, 32);
        c = asmCrypto.AES_ECB.encrypt(d, c, !1);
        return this._ab2ar(c)
    },
    _sendBrowser: function(a, b) {
        $("#dlhref").length || $(document.body).append('<a href="javascript:;" id="dlhref" style="visibility:hidden;">test</a>');
        if (navigator.msSaveBlob) navigator.msSaveBlob(a,
            b);
        else {
            var c = $("#dlhref")[0];
            c.href = window.URL.createObjectURL(a);
            c.download = b;
            c.click()
        }
    }
};

function swap32(a) {
    return a >> 24 | (a & 16711680) >> 8 | (a & 65280) << 8 | (a & 255) << 24
}

function base64urlToUint8Array(a) {
    return new Uint8Array(sjcl.codec.bytes.fromBits(sjcl.codec.base64url.toBits(a)))
}

function uint8ArrayToBase64url(a) {
    return sjcl.codec.base64url.fromBits(sjcl.codec.bytes.toBits(a))
}
sjcl.mode.pctr = {
    name: "pctr",
    encrypt: function(a, b, c) {
        if (128 !== sjcl.bitArray.bitLength(c)) throw new sjcl.exception.invalid("iv must be 128 bits");
        var d, e = sjcl.bitArray._xor4,
            f = [],
            h = [0, 0, 0, 0];
        for (d = 0; d < b.length; d += 4) {
            var g = [0, 0, 0, 0];
            g[0] = swap32(h[0]);
            g = e(a.encrypt(e(g, c)), b.slice(d, d + 4));
            f.splice(d, 0, g[0], g[1], g[2], g[3]);
            h[0]++
        }
        return f
    }
};
$.extend(HFN.METHODS, {
    crypto_getuserkeys: {
        reqauth: !0,
        write: !1
    },
    crypto_getfolderkey: {
        reqauth: !0,
        write: !1
    },
    crypto_getfilekey: {
        reqauth: !0,
        write: !1
    },
    crypto_reset: {
        reqauth: !0,
        write: !0
    },
    crypto_setuserkeys: {
        reqauth: !0,
        write: !0
    },
    crypto_getuserhint: {
        reqauth: !0,
        write: !0
    },
    upload_create: {
        reqauth: !0,
        write: !0
    },
    upload_write: {
        reqauth: !0,
        write: !0
    },
    upload_save: {
        reqauth: !0,
        write: !0
    },
    crypto_getroot: {
        reqauth: !0,
        write: !1
    }
});
var pCloudCrypto = {
        cekKeys: {},
        cekKeysEnc: {},
        lock: function() {
            this.cekKeys = {};
            this.cekKeysEnc = {};
            pCrypt.lock()
        },
        getHint: function(a, b) {
            HFN.apiMethod("crypto_getuserhint", {}, function(b) {
                a(b.hint)
            }, {
                type: "post",
                errorCallback: function(a) {
                    b(a.error)
                }
            })
        },
        setupCrypto: function(a, b, c, d) {
            var e = this;
            pCrypt.setupCrypto(a, function(f) {
                pCrypt.decryptPrivateKey(a, f["private"], f["public"]) ? HFN.apiMethod("crypto_setuserkeys", {
                    hint: b,
                    privatekey: f["private"],
                    publickey: f["public"]
                }, function(a) {
                    e.createCryptoFolder(function(a) {
                        c(a)
                    }, {
                        errorCallback: function(a) {
                            d(a.error)
                        }
                    })
                }, {
                    type: "post",
                    errorCallback: function(a) {
                        d(a.error)
                    }
                }) : d("Could not decrypt generated keys.")
            }, function(a) {
                d(a)
            })
        },
        createCryptoFolder: function(a) {
            HFN.apiMethod("createfolderifnotexists", {
                name: "Crypto Folder",
                folderid: 0,
                encrypted: 1,
                key: pCrypt.generatefolderkey()
            }, function(b) {
                a(b.metadata)
            }, {
                type: "post"
            })
        },
        unlockCrypto: function(a, b) {
            HFN.apiMethod("crypto_getuserkeys", {}, function(c) {
                b(pCrypt.decryptPrivateKey(a, c.privatekey, c.publickey))
            }, {
                cacheTime: !1,
                forceFresh: !0
            })
        },
        saveKey: function(a, b) {
            console.log("saving key", a, b);
            if (a in this.cekKeysEnc && this.cekKeysEnc[a] == b) return this.cekKeys[a];
            this.cekKeysEnc[a] = b;
            return pCrypt.locked || a in this.cekKeys ? !1 : this.cekKeys[a] = pCrypt.decryptCekKey(b)
        },
        _getKey: function(a) {
            a = "object" == typeof a ? a.id : a;
            return a in this.cekKeys ? this.cekKeys[a] : a in this.cekKeysEnc ? this.cekKeys[a] = pCrypt.decryptCekKey(this.cekKeysEnc[a]) : !1
        },
        decryptMetaName: function(a) {
            var b = this._getKey("d" + a.parentfolderid);
            return b ? pCrypt.decryptname(a.name,
                b) : !1
        },
        encryptMetaName: function(a) {
            var b = this._getKey("d" + a.parentfolderid);
            return b ? pCrypt.encryptname(a.name, b) : !1
        },
        _decryptMeta: function(a) {
            a.name = this.decryptMetaName(a);
            a.encrypted = 2;
            if (!a.isfolder) {
                a.size = pCrypt.cipherSizeToPlainSize(a.size);
                a.category = 0;
                a.icon = 0;
                var b = fileext(a.name);
                if (b = b in mimetypes ? mimetypes[b] : !1) a.icon = b.iconid, a.category = b.category
            }
        },
        getIcon: function(a) {
            if (!a.isfolder) {
                var b = fileext(this.decryptMetaName(a));
                if (b = b in mimetypes ? mimetypes[b] : !1) return b.iconid
            }
            return a.icon
        },
        getCategory: function(a) {
            if (!a.isfolder) {
                var b = fileext(this.decryptMetaName(a));
                if (b = b in mimetypes ? mimetypes[b] : !1) return b.category
            }
            return a.category
        },
        decryptMetadata: function(a) {
            for (var b = 0; b < a.contents.length; ++b) this._decryptMeta(a.contents[b])
        },
        asyncDecryptMeta: function(a, b) {
            var c, d = this;
            (c = this.decryptMetaName(a)) ? b(c) : this.loadFolderCek(a.parentfolderid, function(c) {
                b(c ? d.decryptMetaName(a) : !1)
            })
        },
        asyncEncryptMeta: function(a, b) {
            var c, d = this;
            (c = this.encryptMetaName(a)) ? b(c) : this.loadFolderCek(a.parentfolderid,
                function(c) {
                    b(c ? d.encryptMetaName(a) : !1)
                })
        },
        asyncEncryptMetaAndKey: function(a, b) {
            this.asyncEncryptMeta(a, function(a) {
                b(a, pCrypt.generatefolderkey())
            })
        },
        loadFolderCek: function(a, b) {
            var c = this;
            return HFN.apiMethod("crypto_getfolderkey", {
                folderid: a
            }, function(d) {
                b(c.saveKey("d" + a, d.key))
            })
        },
        loadFileCek: function(a, b) {
            var c = this;
            return HFN.apiMethod("crypto_getfilekey", {
                file: file
            }, function(a) {
                b(c.saveKey("f" + file, a.key))
            })
        },
        initCantDownloadCryptoFile: function(a) {
            a = HFN.renderTemplate("#cant-download");
            Popup.open(a, {
                title: "Cannot download file."
            })
        },
        initFileDownload: function(a) {
            if (209715200 < HFN.metaSize(a)) this.initCantDownloadCryptoFile(a);
            else {
                var b = HFN.renderTemplate("#crypto-download"),
                    c;
                b.find(".txt").text(__("Preparing", "Preparing") + "...");
                c = pCloudCryptoDownload.download(a, {
                    onBegin: function() {
                        b.find(".txt").text(__("download_and_decrypt", "Download and Decrypt"))
                    },
                    onProgress: function(a) {
                        var c = Math.trunc(100 * (a.downloaded / a.size));
                        b.find(".percent").html(c + "<span>%</span>");
                        b.find(".progress .bar").css({
                            width: c +
                                "%"
                        });
                        b.find(".size_left").html("<b>" + HFN.formatSize(a.downloaded) + "</b> " + __("of") + " <b>" + HFN.formatSize(a.size) + "</b>")
                    },
                    onFinish: function() {
                        Popup.close()
                    },
                    onSelfAbort: function(a) {
                        console.log("data for abort", a);
                        HFN.message("Download Failed. File may be corrupted.", "error");
                        Popup.close()
                    }
                });
                b.find(".butt-area").append($('<div class="button linebut centerbut modernbut darkbut"></div>').text(__("cancel_download", "Cancel Download")).on("click", function() {
                    pCloudCryptoDownload.abort(c);
                    HFN.message(__("download_stopped",
                        "Download Stopped."));
                    Popup.close()
                }));
                Popup.open(b, {
                    title: "Download File",
                    onEscClose: !1,
                    clickClose: !1,
                    hasClose: !1
                })
            }
        },
        passwordStrength: function(a) {
            return Math.trunc(a.length)
        }
    },
    pCloudCryptoDownload = {
        defaultOpts: {
            onBegin: function() {},
            onProgress: function() {},
            onFinish: function() {},
            onSelfAbort: function() {}
        },
        list: [],
        _prep: function(a) {
            var b = this,
                c = this.list[a];
            this._createWorker(a);
            HFN.apiMethod("getfilelink", {
                fileid: c.meta.fileid,
                getkey: 1
            }, function(d) {
                pCloudCrypto.saveKey("f" + c.meta.fileid, d.key);
                c.url =
                    HFN.prepUrl(d);
                c.size = d.size;
                c.progress.size = d.size;
                c.offsets = pCrypt.cipherOffsets(d.size);
                c.keys = pCloudCrypto._getKey("f" + c.meta.fileid);
                c.opts.onBegin();
                console.log("begin", c.downloaddata.authdata);
                b._download(a)
            })
        },
        _binaryDownload: function(a, b, c, d) {
            var e = new XMLHttpRequest;
            e.open("GET", a, !0);
            e.responseType = "arraybuffer";
            e.setRequestHeader("Range", "bytes=" + b);
            e.onreadystatechange = function(a) {
                4 == this.readyState && -1 != [200, 206].indexOf(this.status) && c(this.response)
            };
            e.onprogress = function(a) {
                a.lengthComputable &&
                    d(a.loaded, a.total)
            };
            e.send();
            return e
        },
        _download: function(a) {
            if (!this._isaborted(a)) {
                var b = this.list[a],
                    c = b.downloaddata,
                    d = b.offsets,
                    e = pCrypt.cipherDownloadOffset(c.sectorid, d),
                    f = this;
                c.sectorid >= d.sectors ? b.downloaded = !0 : 5 < b.blocks.length || (function(c) {
                    b._xhr[c] = f._binaryDownload(b.url, e.offset + "-" + e.end, function(d) {
                        delete b._xhr[c];
                        f._isaborted(a) || (b.blocks.push({
                            offset: e.offset,
                            sectorid: c,
                            data: new Uint8Array(d),
                            id: Math.trunc(c / 128)
                        }), f._decrypt(a))
                    }, function(c, d) {
                        f._saveProgress(a, e.offset + c,
                            b.size)
                    })
                }(c.sectorid), c.sectorid += pCrypt.TREE_SECTORS)
            }
        },
        _decrypt: function(a) {
            if (!this._isaborted(a)) {
                var b = this.list[a],
                    c = b.downloaddata,
                    d = b.offsets,
                    e = b.keys,
                    f, h = this;
                if (!b.blocks.length) b.downloaded && this._finish(a);
                else if (!b.decrypting) {
                    b.decrypting = !0;
                    f = b.blocks.shift();
                    this._download(a);
                    var g = pCrypt.authSectorOffset(f.sectorid, 0, d),
                        k = g.length / pCrypt.AUTH_SIZE - g.authid,
                        p = g.offset + g.length,
                        q = g.offset - f.offset,
                        r, l, s, n = 0,
                        h = this,
                        t = function() {
                            r = g.offset == pCrypt.SECTOR_SIZE * pCrypt.TREE_SECTORS || n !=
                                k - 1 ? pCrypt.SECTOR_SIZE : q - n * pCrypt.SECTOR_SIZE;
                            l = f.data.subarray(n * pCrypt.SECTOR_SIZE, n * pCrypt.SECTOR_SIZE + r);
                            s = f.data.subarray(q + (g.authid + n) * pCrypt.AUTH_SIZE, q + (g.authid + n) * pCrypt.AUTH_SIZE + pCrypt.AUTH_SIZE);
                            h.decryptSector(a, e, l, s, f.sectorid + n, function(c) {
                                c ? (b.plainblocks.push(c), ++n, n >= k ? u() : t()) : (console.log("data", c), h.decryptError(a))
                            })
                        },
                        u = function() {
                            var k = f.data.subarray(q, q + g.length);
                            c.authdata[0] = c.authdata[0].concat(pCrypt.signSectorAuth(e, k));
                            c.authdatacnt[0]++;
                            for (var l = q + g.length, n, m =
                                1; m <= d.treelevels; ++m)
                                if (k = pCrypt.authSectorOffset(f.sectorid, m, d), k.offset != p) {
                                    console.log("tree auth different", f.sectorid, m, k.offset, p, c.authdatacnt);
                                    break
                                } else {
                                    console.log("auth offset match", f.sectorid, m, k, c.authdatacnt);
                                    n = f.data.subarray(l, l + k.length);
                                    console.log("bytes file", n);
                                    console.log("bytes ddata", m - 1, c.authdata[m - 1]);
                                    if (k.length != c.authdata[m - 1].length) {
                                        h.decryptError(a, "failed to verify tree level #1", m, k.length, c.authdata[m - 1].length);
                                        console.log(c);
                                        return
                                    }
                                    if (k.length != c.authdatacnt[m -
                                        1] * pCrypt.AUTH_SIZE) {
                                        h.decryptError(a, "failed to verify tree level #2", m, k.length, c.authdatacnt[m - 1] * pCrypt.AUTH_SIZE);
                                        console.log(c);
                                        return
                                    }
                                    if (!pCrypt._bytescmp(c.authdata[m - 1], n)) {
                                        h.decryptError(a, "failed to verify tree level #3", m, c.authdata[m - 1], n);
                                        console.log(c);
                                        return
                                    }
                                    c.authdata[m - 1] = [];
                                    c.authdatacnt[m - 1] = 0;
                                    n = pCrypt.signSectorAuth(e, n);
                                    if (32 != n.length) throw Error("auth length different!!!");
                                    console.log("appending auth", m, n);
                                    c.authdata[m] = c.authdata[m].concat(n);
                                    c.authdatacnt[m]++;
                                    l += k.length;
                                    p += k.length
                                }
                            b.decrypting = !1;
                            h._decrypt(a)
                        };
                    t()
                }
            }
        },
        _argtoarr: function(a) {
            for (var b = [], c = 1; c < a.length; ++c) b.push(a[c]);
            return b
        },
        decryptError: function(a) {
            var b = this._argtoarr(arguments);
            console.log("decrypt error", arguments);
            this.list[a].opts.onSelfAbort(b);
            this.abort(a);
            this.list[a].decrypterror = !0
        },
        decryptSector: function(a, b, c, d, e, f) {
            a = this.list[a]._worker;
            a.postMessage({
                action: "descryptSector",
                data: {
                    fileKeys: b,
                    cipherData: c,
                    auth: d,
                    sectorid: e
                }
            });
            a.onmessage = function(a) {
                "decryptSector" == a.data.message &&
                    f(a.data.block)
            }
        },
        _finish: function(a) {
            var b = this.list[a];
            console.log("finishing", b.plainblocks);
            pCrypt._sendBrowser(new Blob(b.plainblocks), b.name);
            this.list[a].opts.onFinish();
            this._clean(a)
        },
        _saveProgress: function(a, b, c) {
            this.list[a].progress.downloaded = b;
            this.list[a].opts.onProgress(this.list[a].progress)
        },
        _clean: function(a) {
            var b = this.list[a];
            this._terminateWorker(a);
            this.list[a] = {
                aborted: b.aborted,
                downloaded: b.downloaded
            }
        },
        download: function(a, b) {
            b = $.extend({}, this.defaultOpts, b);
            var c = this.list.push({
                opts: b,
                meta: a,
                name: HFN.metaName(a),
                url: null,
                size: null,
                offsets: null,
                downloaddata: pCrypt.downloadData(),
                keys: null,
                blocks: [],
                plainblocks: [],
                progress: {
                    downloaded: 0,
                    size: 0
                },
                downloaded: !1,
                aborted: !1,
                _xhr: {},
                _worker: null
            }) - 1;
            console.log("begin (pre)", this.list[c].downloaddata);
            this._prep(c);
            return c
        },
        _createWorker: function(a) {
            this.list[a]._worker = new Worker("/js/workers/worker-aes-decrypt.js");
            this.list[a]._worker.onerror = function(a) {
                console.log("worker error", a)
            }
        },
        _hasWorker: function(a) {
            return !!this.list[a]._worker
        },
        _terminateWorker: function(a) {
            this.list[a]._worker.terminate();
            this.list[a]._worker = null
        },
        _isaborted: function(a) {
            return this.list[a].aborted
        },
        abort: function(a) {
            var b = this.list[a];
            b.aborted = !0;
            for (var c in b._xhr) console.log("aborting", c), b._xhr[c].abort();
            this._clean(a)
        }
    },
    pCloudCryptoUpload = {
        cryptoRoot: null,
        list: [],
        defaultCallbacks: {
            onBegin: function() {},
            onProgress: function() {},
            onFinish: function() {},
            onError: function() {}
        },
        _worker: null,
        _workerCallbacks: [],
        _prep: function(a) {
            console.log("creating upload");
            var b = this.list[a],
                c = this;
            HFN.apiMethod("upload_create", {}, function(d) {
                b.aborted || (b.uploadid = d.uploadid, b.callbacks.onBegin(), b.callbacks.onProgress(0, b.offsets.ciphersize), c._encryptBlock(a))
            }, {
                errorCallback: function(d) {
                    b.callbacks.onError(d.error);
                    c.abort(a)
                }
            })
        },
        _encryptBlock: function(a) {
            var b = this.list[a],
                c = b.uploaddata,
                d = this;
            if (!b.encrypting && !b.aborted && !b.blocks.length) {
                b.encrypting = !0;
                var e = b.file.size,
                    f = pCrypt.plainUploadOffset(c.sectorid, e),
                    h = c.sectorid,
                    g = f.offset,
                    k = blobSlice(b.file, f.offset,
                        f.end),
                    p = e == f.end;
                uploader = b.uploader;
                offsets = b.offsets;
                h >= b.offsets.sectors ? (b.encryptingDone = !0, this._uploadBlock(a)) : (console.log("off", f), this._encrypt(a, k, h, function(e, k) {
                    if (!b.aborted) {
                        c.authdata[0] = c.authdata[0].concat(pCrypt.signSectorAuth(b.filekey, k));
                        c.authdatacnt[0]++;
                        console.log("is last", p, b.file.size, f.end);
                        console.log("tree levels", offsets.treelevels);
                        for (var l = 0; l < offsets.treelevels; ++l)
                            if (console.log(l, c.authdatacnt), c.authdatacnt[l] == pCrypt.TREE_SECTORS || p && c.authdatacnt[l]) {
                                e =
                                    pCrypt._abconcat(e, c.authdata[l]);
                                var s = pCrypt.signSectorAuth(b.filekey, new Uint8Array(c.authdata[l]));
                                console.log("appending sign (b)", s.length, c.authdatacnt);
                                c.authdata[l + 1] = c.authdata[l + 1].concat(s);
                                c.authdatacnt[l + 1]++;
                                c.authdata[l] = [];
                                c.authdatacnt[l] = 0;
                                console.log(h, g, c.authdatacnt)
                            }
                        b.blocks.push({
                            sectorid: h,
                            data: e,
                            offset: g,
                            cipherOffset: pCrypt.dataCipherOffsetBySectorid(h),
                            length: e.length
                        });
                        console.log(b.blocks);
                        b.encrypting = !1;
                        d._uploadBlock(a);
                        d._encryptBlock(a)
                    }
                }), c.sectorid += pCrypt.TREE_SECTORS)
            }
        },
        _uploadBlock: function(a) {
            var b = this.list[a],
                c = this;
            if (!b.uploading && !b.aborted)
                if (b.blocks.length) {
                    b.uploading = !0;
                    var d = b.blocks.shift(),
                        e = b.uploadid,
                        f = a + "-" + d.sectorid,
                        h = d.data.length;
                    console.log("uploading", d);
                    b._xhr[f] = $.ajax({
                        url: HFN.apiMethodUrl(!1, "upload_write", {
                            uploadid: e,
                            uploadoffset: d.cipherOffset,
                            uploadsize: h,
                            auth: HFN.config.auth
                        }),
                        type: "PUT",
                        data: d.data,
                        dataType: "json",
                        processData: !1,
                        contentType: !1,
                        success: function(d) {
                            if (!b.aborted) {
                                console.log("verify upload", h, d.bytes);
                                b._xhr[f] = null;
                                delete b._xhr[f];
                                if (0 != d.result || void 0 != d.bytes && d.bytes != h) throw console.log(d), Error("verification failed");
                                b.uploading = !1;
                                c._uploadBlock(a);
                                c._encryptBlock(a)
                            }
                        },
                        error: function(d, e) {
                            c._isaborted(a) ? console.log("ERROR XHR", d, e) : (b.callbacks.onError("Upload Interrupted."), c.abort(a))
                        },
                        xhr: function() {
                            var e = new window.XMLHttpRequest;
                            e.upload && (e.upload.onprogress = function(e) {
                                if (!c._isaborted(a)) b.callbacks.onProgress(d.cipherOffset + e.loaded, b.offsets.ciphersize)
                            });
                            return e
                        }
                    })
                } else console.log("no blocks",
                    b.encryptingDone), b.encryptingDone && this._finish(a)
        },
        uploadFile: function(a) {
            var b = pCrypt.generatefilekey();
            a = this.list.push({
                callbacks: $.extend({}, this.defaultCallbacks, a.callbacks),
                uploadid: null,
                folderid: a.folderid,
                file: a.file,
                name: a.name || a.file.name,
                offsets: pCrypt.plainOffsets(a.file.size),
                uploaddata: pCrypt.uploadData(),
                filekeyEnc: b,
                filekey: pCrypt.decryptfolderkey(b),
                blocks: [],
                progress: {
                    uploaded: 0,
                    size: 0
                },
                uploaded: !1,
                aborted: !1,
                encrypting: !1,
                encryptingDone: !1,
                uploading: !1,
                uploadingDone: !1,
                _xhr: {},
                _worker: null
            }) - 1;
            console.log("opts", this.list[a]);
            this._prep(a);
            return a
        },
        _getWorker: function() {
            this._worker || (this._workerCallbacks = [], this._worker = new Worker("/js/workers/worker-aes-encrypt.js"), this._worker.postMessage({
                action: "seed",
                data: pCrypt.getRandomBytes(64)
            }), this._worker.onerror = function() {
                console.log(arguments);
                throw Error("worker");
            }, this._worker.onmessage = this._receiveWorkerMessage.bind(this));
            return this._worker
        },
        _waitWorkerMessage: function(a) {
            this._workerCallbacks.push(a)
        },
        _receiveWorkerMessage: function(a) {
            for (var b =
                0; b < this._workerCallbacks.length; ++b)
                if (this._workerCallbacks[b](a)) {
                    this._workerCallbacks.splice(b, 1);
                    break
                }
        },
        _finish: function(a) {
            var b = this.list[a],
                c = this;
            b.aborted || pCloudCrypto.asyncEncryptMeta({
                name: b.name,
                parentfolderid: b.folderid
            }, function(d) {
                HFN.apiMethod("upload_save", {
                    uploadid: b.uploadid,
                    folderid: b.folderid,
                    name: d,
                    encrypted: 1,
                    key: b.filekeyEnc
                }, function(d) {
                    b.aborted || (console.log("upload save", b, d), pCloudCrypto._decryptMeta(d.metadata), b.callbacks.onProgress(b.offsets.ciphersize, b.offsets.ciphersize),
                        b.callbacks.onFinish(d), b.uploaded = !0, c._clean(a))
                }, {
                    errorCallback: function(d) {
                        b.callbacks.onError(d.error);
                        c.abort(a)
                    }
                })
            })
        },
        _encryptSector: function(a, b, c, d) {
            var e = this._getWorker(),
                f = this.list[a],
                h = a + "-" + c;
            f.aborted || (e.postMessage({
                action: "encryptSector",
                data: {
                    id: h,
                    fileKeys: f.filekey,
                    plainData: b,
                    sectorid: c
                }
            }), this._waitWorkerMessage(function(a) {
                return "encryptSector" == a.data.message && a.data.id == h ? (d(a.data.block), !0) : !1
            }))
        },
        _encrypt: function(a, b, c, d) {
            console.log("_encrypt", arguments);
            var e = this,
                f = this.list[a];
            this._readBlock(b, function(b) {
                if (!f.aborted) {
                    var g = new Uint8Array(b),
                        k = 0,
                        p = Math.ceil(g.length / pCrypt.SECTOR_SIZE),
                        q = [],
                        r = [],
                        l = function() {
                            var b = pCrypt.SECTOR_SIZE * k,
                                h = Math.min(pCrypt.SECTOR_SIZE * (k + 1), g.length);
                            e._encryptSector(a, g.subarray(b, h), c + k, function(a) {
                                f.aborted || (q.push(a.data), r.push(a.auth), k++, k >= p ? d(pCrypt._abconcat.apply(pCrypt, q.concat(r)), pCrypt._abconcat.apply(pCrypt, r), r) : l())
                            })
                        };
                    l()
                }
            })
        },
        _readBlock: function(a, b) {
            var c = new FileReader;
            c.onloadend = function(a) {
                a.target.readyState ==
                    FileReader.DONE && b(a.target.result)
            };
            c.onerror = function(b) {
                console.log("READER ERROR", a, b)
            };
            c.readAsArrayBuffer(a)
        },
        _clean: function(a) {
            var b = this.list[a];
            this.list[a] = {
                aborted: b.aborted,
                uploaded: b.uploaded
            };
            this._terminateWorker()
        },
        _terminateWorker: function() {
            if (this._worker) {
                for (var a = 0; a < this.list.length; ++a)
                    if (this._isactive(this.list[a])) return;
                this._worker.terminate();
                this._worker = null
            }
        },
        _isactive: function(a) {
            return !a.uploaded && !a.aborted
        },
        _isaborted: function(a) {
            return this.list[a].aborted
        },
        abort: function(a) {
            console.log("received abort", a);
            var b = this.list[a];
            b.aborted = !0;
            for (var c in b._xhr) console.log("aborting", c), b._xhr[c].abort();
            this._clean(a)
        }
    };
Math.trunc = Math.trunc || function(a) {
    return 0 > a ? Math.ceil(a) : Math.floor(a)
};

function blobSlice(a, b, c) {
    if (a.slice) return a.slice(b, c);
    if (a.webkitSlice) return a.webkitSlice(b, c);
    if (a.mozSlice) return a.mozSlice(b, c)
}
pCrypt.init();