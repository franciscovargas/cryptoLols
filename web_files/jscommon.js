(function(a, b) {
    function c(a) {
        var d = a.length,
            e = m.type(a);
        return m.isWindow(a) ? !1 : 1 === a.nodeType && d ? !0 : "array" === e || "function" !== e && (0 === d || "number" == typeof d && 0 < d && d - 1 in a)
    }

    function h(a) {
        var d = Pa[a] = {};
        return m.each(a.match(B) || [], function(a, A) {
            d[A] = !0
        }), d
    }

    function f(a, d, e, c) {
        if (m.acceptData(a)) {
            var k, f, q = m.expando,
                g = a.nodeType,
                h = g ? m.cache : a,
                t = g ? a[q] : a[q] && q;
            if (t && h[t] && (c || h[t].data) || e !== b || "string" != typeof d) return t || (t = g ? a[q] = ca.pop() || m.guid++ : q), h[t] || (h[t] = g ? {} : {
                toJSON: m.noop
            }), ("object" ==
                typeof d || "function" == typeof d) && (c ? h[t] = m.extend(h[t], d) : h[t].data = m.extend(h[t].data, d)), f = h[t], c || (f.data || (f.data = {}), f = f.data), e !== b && (f[m.camelCase(d)] = e), "string" == typeof d ? (k = f[d], null == k && (k = f[m.camelCase(d)])) : k = f, k
        }
    }

    function p(a, d, e) {
        if (m.acceptData(a)) {
            var b, c, k = a.nodeType,
                f = k ? m.cache : a,
                q = k ? a[m.expando] : m.expando;
            if (f[q]) {
                if (d && (b = e ? f[q] : f[q].data)) {
                    m.isArray(d) ? d = d.concat(m.map(d, m.camelCase)) : d in b ? d = [d] : (d = m.camelCase(d), d = d in b ? [d] : d.split(" "));
                    for (c = d.length; c--;) delete b[d[c]];
                    if (e ? !r(b) : !m.isEmptyObject(b)) return
                }(e || (delete f[q].data, r(f[q]))) && (k ? m.cleanData([a], !0) : m.support.deleteExpando || f != f.window ? delete f[q] : f[q] = null)
            }
        }
    }

    function g(a, d, e) {
        if (e === b && 1 === a.nodeType) {
            var c = "data-" + d.replace(Qa, "-$1").toLowerCase();
            if (e = a.getAttribute(c), "string" == typeof e) {
                try {
                    e = "true" === e ? !0 : "false" === e ? !1 : "null" === e ? null : +e + "" === e ? +e : Wa.test(e) ? m.parseJSON(e) : e
                } catch (k) {}
                m.data(a, d, e)
            } else e = b
        }
        return e
    }

    function r(a) {
        for (var d in a)
            if (("data" !== d || !m.isEmptyObject(a[d])) && "toJSON" !==
                d) return !1;
        return !0
    }

    function s() {
        return !0
    }

    function n() {
        return !1
    }

    function v() {
        try {
            return H.activeElement
        } catch (a) {}
    }

    function w(a, d) {
        do a = a[d]; while (a && 1 !== a.nodeType);
        return a
    }

    function u(a, d, e) {
        if (m.isFunction(d)) return m.grep(a, function(a, A) {
            return !!d.call(a, A, a) !== e
        });
        if (d.nodeType) return m.grep(a, function(a) {
            return a === d !== e
        });
        if ("string" == typeof d) {
            if (Ib.test(d)) return m.filter(d, a, e);
            d = m.filter(d, a)
        }
        return m.grep(a, function(a) {
            return 0 <= m.inArray(a, d) !== e
        })
    }

    function d(a) {
        var d = nb.split("|");
        a =
            a.createDocumentFragment();
        if (a.createElement)
            for (; d.length;) a.createElement(d.pop());
        return a
    }

    function e(a, d) {
        return m.nodeName(a, "table") && m.nodeName(1 === d.nodeType ? d : d.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function k(a) {
        return a.type = (null !== m.find.attr(a, "type")) + "/" + a.type, a
    }

    function q(a) {
        var d = Jb.exec(a.type);
        return d ? a.type = d[1] : a.removeAttribute("type"), a
    }

    function t(a, d) {
        for (var e, b = 0; null != (e = a[b]); b++) m._data(e, "globalEval", !d || m._data(d[b], "globalEval"))
    }

    function x(a, d) {
        if (1 === d.nodeType && m.hasData(a)) {
            var e, b, c;
            b = m._data(a);
            var k = m._data(d, b),
                f = b.events;
            if (f)
                for (e in delete k.handle, k.events = {}, f)
                    for (b = 0, c = f[e].length; c > b; b++) m.event.add(d, e, f[e][b]);
            k.data && (k.data = m.extend({}, k.data))
        }
    }

    function J(a, d) {
        var e, c, k = 0,
            f = typeof a.getElementsByTagName !== T ? a.getElementsByTagName(d || "*") : typeof a.querySelectorAll !== T ? a.querySelectorAll(d || "*") : b;
        if (!f)
            for (f = [], e = a.childNodes || a; null != (c = e[k]); k++)!d || m.nodeName(c, d) ? f.push(c) :
            m.merge(f, J(c, d));
        return d === b || d && m.nodeName(a, d) ? m.merge([a], f) : f
    }

    function F(a) {
        Xa.test(a.type) && (a.defaultChecked = a.checked)
    }

    function D(a, d) {
        if (d in a) return d;
        for (var e = d.charAt(0).toUpperCase() + d.slice(1), b = d, c = ob.length; c--;)
            if (d = ob[c] + e, d in a) return d;
        return b
    }

    function K(a, d) {
        return a = d || a, "none" === m.css(a, "display") || !m.contains(a.ownerDocument, a)
    }

    function Y(a, d) {
        for (var e, b, c, k = [], f = 0, q = a.length; q > f; f++) b = a[f], b.style && (k[f] = m._data(b, "olddisplay"), e = b.style.display, d ? (k[f] || "none" !== e ||
            (b.style.display = ""), "" === b.style.display && K(b) && (k[f] = m._data(b, "olddisplay", I(b.nodeName)))) : k[f] || (c = K(b), (e && "none" !== e || !c) && m._data(b, "olddisplay", c ? e : m.css(b, "display"))));
        for (f = 0; q > f; f++) b = a[f], b.style && (d && "none" !== b.style.display && "" !== b.style.display || (b.style.display = d ? k[f] || "" : "none"));
        return a
    }

    function U(a, d, e) {
        return (a = Kb.exec(d)) ? Math.max(0, a[1] - (e || 0)) + (a[2] || "px") : d
    }

    function O(a, d, e, b, c) {
        d = e === (b ? "border" : "content") ? 4 : "width" === d ? 1 : 0;
        for (var k = 0; 4 > d; d += 2) "margin" === e && (k += m.css(a,
            e + xa[d], !0, c)), b ? ("content" === e && (k -= m.css(a, "padding" + xa[d], !0, c)), "margin" !== e && (k -= m.css(a, "border" + xa[d] + "Width", !0, c))) : (k += m.css(a, "padding" + xa[d], !0, c), "padding" !== e && (k += m.css(a, "border" + xa[d] + "Width", !0, c)));
        return k
    }

    function y(a, d, e) {
        var b = !0,
            c = "width" === d ? a.offsetWidth : a.offsetHeight,
            k = ya(a),
            f = m.support.boxSizing && "border-box" === m.css(a, "boxSizing", !1, k);
        if (0 >= c || null == c) {
            if (c = za(a, d, k), (0 > c || null == c) && (c = a.style[d]), Ra.test(c)) return c;
            b = f && (m.support.boxSizingReliable || c === a.style[d]);
            c = parseFloat(c) || 0
        }
        return c + O(a, d, e || (f ? "border" : "content"), b, k) + "px"
    }

    function I(a) {
        var d = H,
            e = pb[a];
        return e || (e = C(a, d), "none" !== e && e || (Ja = (Ja || m("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(d.documentElement), d = (Ja[0].contentWindow || Ja[0].contentDocument).document, d.write("<!doctype html><html><body>"), d.close(), e = C(a, d), Ja.detach()), pb[a] = e), e
    }

    function C(a, d) {
        var e = m(d.createElement(a)).appendTo(d.body),
            b = m.css(e[0], "display");
        return e.remove(),
            b
    }

    function M(a, d, e, b) {
        var c;
        if (m.isArray(d)) m.each(d, function(d, c) {
            e || Lb.test(a) ? b(a, c) : M(a + "[" + ("object" == typeof c ? d : "") + "]", c, e, b)
        });
        else if (e || "object" !== m.type(d)) b(a, d);
        else
            for (c in d) M(a + "[" + c + "]", d[c], e, b)
    }

    function N(a) {
        return function(d, e) {
            "string" != typeof d && (e = d, d = "*");
            var b, c = 0,
                k = d.toLowerCase().match(B) || [];
            if (m.isFunction(e))
                for (; b = k[c++];) "+" === b[0] ? (b = b.slice(1) || "*", (a[b] = a[b] || []).unshift(e)) : (a[b] = a[b] || []).push(e)
        }
    }

    function z(a, d, e, c) {
        function k(g) {
            var h;
            return f[g] = !0, m.each(a[g] ||
                [], function(a, A) {
                    var g = A(d, e, c);
                    return "string" != typeof g || q || f[g] ? q ? !(h = g) : b : (d.dataTypes.unshift(g), k(g), !1)
                }), h
        }
        var f = {},
            q = a === Ya;
        return k(d.dataTypes[0]) || !f["*"] && k("*")
    }

    function V(a, d) {
        var e, c, k = m.ajaxSettings.flatOptions || {};
        for (c in d) d[c] !== b && ((k[c] ? a : e || (e = {}))[c] = d[c]);
        return e && m.extend(!0, a, e), a
    }

    function L() {
        try {
            return new a.XMLHttpRequest
        } catch (d) {}
    }

    function Q() {
        return setTimeout(function() {
            Ba = b
        }), Ba = m.now()
    }

    function G(a, d, e) {
        for (var b, c = (Ka[d] || []).concat(Ka["*"]), k = 0, f = c.length; f >
            k; k++)
            if (b = c[k].call(e, d, a)) return b
    }

    function da(a, d, e) {
        var b, c = 0,
            k = Sa.length,
            f = m.Deferred().always(function() {
                delete q.elem
            }),
            q = function() {
                if (b) return !1;
                for (var d = Ba || Q(), d = Math.max(0, g.startTime + g.duration - d), e = 1 - (d / g.duration || 0), c = 0, k = g.tweens.length; k > c; c++) g.tweens[c].run(e);
                return f.notifyWith(a, [g, e, d]), 1 > e && k ? d : (f.resolveWith(a, [g]), !1)
            },
            g = f.promise({
                elem: a,
                props: m.extend({}, d),
                opts: m.extend(!0, {
                    specialEasing: {}
                }, e),
                originalProperties: d,
                originalOptions: e,
                startTime: Ba || Q(),
                duration: e.duration,
                tweens: [],
                createTween: function(d, e) {
                    var b = m.Tween(a, g.opts, d, e, g.opts.specialEasing[d] || g.opts.easing);
                    return g.tweens.push(b), b
                },
                stop: function(d) {
                    var e = 0,
                        c = d ? g.tweens.length : 0;
                    if (b) return this;
                    for (b = !0; c > e; e++) g.tweens[e].run(1);
                    return d ? f.resolveWith(a, [g, d]) : f.rejectWith(a, [g, d]), this
                }
            });
        e = g.props;
        for (S(e, g.opts.specialEasing); k > c; c++)
            if (d = Sa[c].call(g, a, e, g.opts)) return d;
        return m.map(e, G, g), m.isFunction(g.opts.start) && g.opts.start.call(a, g), m.fx.timer(m.extend(q, {
                elem: a,
                anim: g,
                queue: g.opts.queue
            })),
            g.progress(g.opts.progress).done(g.opts.done, g.opts.complete).fail(g.opts.fail).always(g.opts.always)
    }

    function S(a, d) {
        var e, b, c, k, f;
        for (e in a)
            if (b = m.camelCase(e), c = d[b], k = a[e], m.isArray(k) && (c = k[1], k = a[e] = k[0]), e !== b && (a[b] = k, delete a[e]), f = m.cssHooks[b], f && "expand" in f)
                for (e in k = f.expand(k), delete a[b], k) e in a || (a[e] = k[e], d[e] = c);
            else d[b] = c
    }

    function P(a, d, e, b, c) {
        return new P.prototype.init(a, d, e, b, c)
    }

    function ha(a, d) {
        var e, b = {
                height: a
            },
            c = 0;
        for (d = d ? 1 : 0; 4 > c; c += 2 - d) e = xa[c], b["margin" + e] = b["padding" +
            e] = a;
        return d && (b.opacity = b.width = a), b
    }

    function ka(a) {
        return m.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    var ia, ba, T = typeof b,
        R = a.location,
        H = a.document,
        ta = H.documentElement,
        oa = a.jQuery,
        ja = a.$,
        W = {},
        ca = [],
        ua = ca.concat,
        La = ca.push,
        ma = ca.slice,
        Ca = ca.indexOf,
        Za = W.toString,
        pa = W.hasOwnProperty,
        sa = "1.10.2".trim,
        m = function(a, d) {
            return new m.fn.init(a, d, ba)
        },
        va = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        B = /\S+/g,
        $a = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        Z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        Ta = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        Da = /^[\],:{}\s]*$/,
        Ma = /(?:^|:|,)(?:\s*\[)+/g,
        ab = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        bb = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        cb = /^-ms-/,
        db = /-([\da-z])/gi,
        eb = function(a, d) {
            return d.toUpperCase()
        },
        ra = function(a) {
            (H.addEventListener || "load" === a.type || "complete" === H.readyState) && (Ua(), m.ready())
        },
        Ua = function() {
            H.addEventListener ? (H.removeEventListener("DOMContentLoaded", ra, !1), a.removeEventListener("load", ra, !1)) : (H.detachEvent("onreadystatechange",
                ra), a.detachEvent("onload", ra))
        };
    m.fn = m.prototype = {
        jquery: "1.10.2",
        constructor: m,
        init: function(a, d, e) {
            var c, k;
            if (!a) return this;
            if ("string" == typeof a) {
                if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && 3 <= a.length ? [null, a, null] : Z.exec(a), !c || !c[1] && d) return !d || d.jquery ? (d || e).find(a) : this.constructor(d).find(a);
                if (c[1]) {
                    if (d = d instanceof m ? d[0] : d, m.merge(this, m.parseHTML(c[1], d && d.nodeType ? d.ownerDocument || d : H, !0)), Ta.test(c[1]) && m.isPlainObject(d))
                        for (c in d) m.isFunction(this[c]) ? this[c](d[c]) :
                            this.attr(c, d[c]);
                    return this
                }
                if (k = H.getElementById(c[2]), k && k.parentNode) {
                    if (k.id !== c[2]) return e.find(a);
                    this.length = 1;
                    this[0] = k
                }
                return this.context = H, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? e.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this))
        },
        selector: "",
        length: 0,
        toArray: function() {
            return ma.call(this)
        },
        get: function(a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
        },
        pushStack: function(a) {
            a =
                m.merge(this.constructor(), a);
            return a.prevObject = this, a.context = this.context, a
        },
        each: function(a, d) {
            return m.each(this, a, d)
        },
        ready: function(a) {
            return m.ready.promise().done(a), this
        },
        slice: function() {
            return this.pushStack(ma.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var d = this.length;
            a = +a + (0 > a ? d : 0);
            return this.pushStack(0 <= a && d > a ? [this[a]] : [])
        },
        map: function(a) {
            return this.pushStack(m.map(this, function(d, e) {
                return a.call(d, e, d)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: La,
        sort: [].sort,
        splice: [].splice
    };
    m.fn.init.prototype = m.fn;
    m.extend = m.fn.extend = function() {
        var a, d, e, c, k, f, g = arguments[0] || {},
            q = 1,
            h = arguments.length,
            t = !1;
        "boolean" == typeof g && (t = g, g = arguments[1] || {}, q = 2);
        "object" == typeof g || m.isFunction(g) || (g = {});
        for (h === q && (g = this, --q); h > q; q++)
            if (null != (k = arguments[q]))
                for (c in k) a = g[c], e = k[c], g !== e && (t && e && (m.isPlainObject(e) || (d = m.isArray(e))) ? (d ? (d = !1, f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ?
                    a : {}, g[c] = m.extend(t, f, e)) : e !== b && (g[c] = e));
        return g
    };
    m.extend({
        expando: "jQuery" + ("1.10.2" + Math.random()).replace(/\D/g, ""),
        noConflict: function(d) {
            return a.$ === m && (a.$ = ja), d && a.jQuery === m && (a.jQuery = oa), m
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? m.readyWait++ : m.ready(!0)
        },
        ready: function(a) {
            if (!0 === a ? !--m.readyWait : !m.isReady) {
                if (!H.body) return setTimeout(m.ready);
                m.isReady = !0;
                !0 !== a && 0 < --m.readyWait || (ia.resolveWith(H, [m]), m.fn.trigger && m(H).trigger("ready").off("ready"))
            }
        },
        isFunction: function(a) {
            return "function" ===
                m.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === m.type(a)
        },
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? W[Za.call(a)] || "object" : typeof a
        },
        isPlainObject: function(a) {
            var d;
            if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) return !1;
            try {
                if (a.constructor && !pa.call(a, "constructor") && !pa.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (e) {
                return !1
            }
            if (m.support.ownLast)
                for (d in a) return pa.call(a,
                    d);
            for (d in a);
            return d === b || pa.call(a, d)
        },
        isEmptyObject: function(a) {
            for (var d in a) return !1;
            return !0
        },
        error: function(a) {
            throw Error(a);
        },
        parseHTML: function(a, d, e) {
            if (!a || "string" != typeof a) return null;
            "boolean" == typeof d && (e = d, d = !1);
            d = d || H;
            var b = Ta.exec(a);
            e = !e && [];
            return b ? [d.createElement(b[1])] : (b = m.buildFragment([a], d, e), e && m(e).remove(), m.merge([], b.childNodes))
        },
        parseJSON: function(d) {
            return a.JSON && a.JSON.parse ? a.JSON.parse(d) : null === d ? d : "string" == typeof d && (d = m.trim(d), d && Da.test(d.replace(ab,
                "@").replace(bb, "]").replace(Ma, ""))) ? Function("return " + d)() : (m.error("Invalid JSON: " + d), b)
        },
        parseXML: function(d) {
            var e, c;
            if (!d || "string" != typeof d) return null;
            try {
                a.DOMParser ? (c = new DOMParser, e = c.parseFromString(d, "text/xml")) : (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = "false", e.loadXML(d))
            } catch (k) {
                e = b
            }
            return e && e.documentElement && !e.getElementsByTagName("parsererror").length || m.error("Invalid XML: " + d), e
        },
        noop: function() {},
        globalEval: function(d) {
            d && m.trim(d) && (a.execScript || function(d) {
                a.eval.call(a,
                    d)
            })(d)
        },
        camelCase: function(a) {
            return a.replace(cb, "ms-").replace(db, eb)
        },
        nodeName: function(a, d) {
            return a.nodeName && a.nodeName.toLowerCase() === d.toLowerCase()
        },
        each: function(a, d, e) {
            var b, k = 0,
                f = a.length,
                g = c(a);
            if (e)
                if (g)
                    for (; f > k && (b = d.apply(a[k], e), !1 !== b); k++);
                else
                    for (k in a) {
                        if (b = d.apply(a[k], e), !1 === b) break
                    } else if (g)
                        for (; f > k && (b = d.call(a[k], k, a[k]), !1 !== b); k++);
                    else
                        for (k in a)
                            if (b = d.call(a[k], k, a[k]), !1 === b) break;
            return a
        },
        trim: sa && !sa.call("\ufeff\u00a0") ? function(a) {
            return null == a ? "" : sa.call(a)
        } : function(a) {
            return null == a ? "" : (a + "").replace($a, "")
        },
        makeArray: function(a, d) {
            var e = d || [];
            return null != a && (c(Object(a)) ? m.merge(e, "string" == typeof a ? [a] : a) : La.call(e, a)), e
        },
        inArray: function(a, d, e) {
            var b;
            if (d) {
                if (Ca) return Ca.call(d, a, e);
                b = d.length;
                for (e = e ? 0 > e ? Math.max(0, b + e) : e : 0; b > e; e++)
                    if (e in d && d[e] === a) return e
            }
            return -1
        },
        merge: function(a, d) {
            var e = d.length,
                c = a.length,
                k = 0;
            if ("number" == typeof e)
                for (; e > k; k++) a[c++] = d[k];
            else
                for (; d[k] !== b;) a[c++] = d[k++];
            return a.length = c, a
        },
        grep: function(a, d, e) {
            var b,
                c = [],
                k = 0,
                f = a.length;
            for (e = !!e; f > k; k++) b = !!d(a[k], k), e !== b && c.push(a[k]);
            return c
        },
        map: function(a, d, e) {
            var b, k = 0,
                f = a.length,
                g = [];
            if (c(a))
                for (; f > k; k++) b = d(a[k], k, e), null != b && (g[g.length] = b);
            else
                for (k in a) b = d(a[k], k, e), null != b && (g[g.length] = b);
            return ua.apply([], g)
        },
        guid: 1,
        proxy: function(a, d) {
            var e, c, k;
            return "string" == typeof d && (k = a[d], d = a, a = k), m.isFunction(a) ? (e = ma.call(arguments, 2), c = function() {
                return a.apply(d || this, e.concat(ma.call(arguments)))
            }, c.guid = a.guid = a.guid || m.guid++, c) : b
        },
        access: function(a,
            d, e, c, k, f, g) {
            var q = 0,
                h = a.length,
                t = null == e;
            if ("object" === m.type(e))
                for (q in k = !0, e) m.access(a, d, q, e[q], !0, f, g);
            else if (c !== b && (k = !0, m.isFunction(c) || (g = !0), t && (g ? (d.call(a, c), d = null) : (t = d, d = function(a, d, e) {
                return t.call(m(a), e)
            })), d))
                for (; h > q; q++) d(a[q], e, g ? c : c.call(a[q], q, d(a[q], e)));
            return k ? a : t ? d.call(a) : h ? d(a[0], e) : f
        },
        now: function() {
            return (new Date).getTime()
        },
        swap: function(a, d, e, b) {
            var c, k = {};
            for (c in d) k[c] = a.style[c], a.style[c] = d[c];
            e = e.apply(a, b || []);
            for (c in d) a.style[c] = k[c];
            return e
        }
    });
    m.ready.promise = function(d) {
        if (!ia)
            if (ia = m.Deferred(), "complete" === H.readyState) setTimeout(m.ready);
            else if (H.addEventListener) H.addEventListener("DOMContentLoaded", ra, !1), a.addEventListener("load", ra, !1);
        else {
            H.attachEvent("onreadystatechange", ra);
            a.attachEvent("onload", ra);
            var e = !1;
            try {
                e = null == a.frameElement && H.documentElement
            } catch (b) {}
            e && e.doScroll && function Hb() {
                if (!m.isReady) {
                    try {
                        e.doScroll("left")
                    } catch (a) {
                        return setTimeout(Hb, 50)
                    }
                    Ua();
                    m.ready()
                }
            }()
        }
        return ia.promise(d)
    };
    m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
        function(a, d) {
            W["[object " + d + "]"] = d.toLowerCase()
        });
    ba = m(H);
    (function(a, d) {
        function e(a, d, b, c) {
            var k, f, A, g, q;
            if ((d ? d.ownerDocument || d : qa) !== X && z(d), d = d || X, b = b || [], !a || "string" != typeof a) return b;
            if (1 !== (g = d.nodeType) && 9 !== g) return [];
            if (P && !c) {
                if (k = sa.exec(a))
                    if (A = k[1])
                        if (9 === g) {
                            if (f = d.getElementById(A), !f || !f.parentNode) return b;
                            if (f.id === A) return b.push(f), b
                        } else {
                            if (d.ownerDocument && (f = d.ownerDocument.getElementById(A)) && K(d, f) && f.id === A) return b.push(f), b
                        } else {
                    if (k[2]) return T.apply(b, d.getElementsByTagName(a)),
                        b;
                    if ((A = k[3]) && G.getElementsByClassName && d.getElementsByClassName) return T.apply(b, d.getElementsByClassName(A)), b
                } if (G.qsa && (!N || !N.test(a))) {
                    if (f = k = S, A = d, q = 9 === g && a, 1 === g && "object" !== d.nodeName.toLowerCase()) {
                        g = n(a);
                        (k = d.getAttribute("id")) ? f = k.replace(va, "\\$&") : d.setAttribute("id", f);
                        f = "[id='" + f + "'] ";
                        for (A = g.length; A--;) g[A] = f + x(g[A]);
                        A = ja.test(a) && d.parentNode || d;
                        q = g.join(",")
                    }
                    if (q) try {
                        return T.apply(b, A.querySelectorAll(q)), b
                    } catch (h) {} finally {
                        k || d.removeAttribute("id")
                    }
                }
            }
            var t;
            a: {
                a = a.replace(Ha,
                    "$1");
                var m, aa;
                f = n(a);
                if (!c && 1 === f.length) {
                    if (t = f[0] = f[0].slice(0), 2 < t.length && "ID" === (m = t[0]).type && G.getById && 9 === d.nodeType && P && E.relative[t[1].type]) {
                        if (d = (E.find.ID(m.matches[0].replace(ea, fa), d) || [])[0], !d) {
                            t = b;
                            break a
                        }
                        a = a.slice(t.shift().value.length)
                    }
                    for (g = ma.needsContext.test(a) ? 0 : t.length; g-- && (m = t[g], !E.relative[k = m.type]);)
                        if ((aa = E.find[k]) && (c = aa(m.matches[0].replace(ea, fa), ja.test(t[0].type) && d.parentNode || d))) {
                            if (t.splice(g, 1), a = c.length && x(t), !a) {
                                t = (T.apply(b, c), b);
                                break a
                            }
                            break
                        }
                }
                t =
                    (L(a, f)(c, d, !P, b, ja.test(a)), b)
            }
            return t
        }

        function b() {
            function a(e, b) {
                return d.push(e += " ") > E.cacheLength && delete a[d.shift()], a[e] = b
            }
            var d = [];
            return a
        }

        function c(a) {
            return a[S] = !0, a
        }

        function k(a) {
            var d = X.createElement("div");
            try {
                return !!a(d)
            } catch (e) {
                return !1
            } finally {
                d.parentNode && d.parentNode.removeChild(d)
            }
        }

        function f(a, d) {
            for (var e = a.split("|"), b = a.length; b--;) E.attrHandle[e[b]] = d
        }

        function g(a, d) {
            var e = d && a,
                b = e && 1 === a.nodeType && 1 === d.nodeType && (~d.sourceIndex || B) - (~a.sourceIndex || B);
            if (b) return b;
            if (e)
                for (; e = e.nextSibling;)
                    if (e === d) return -1;
            return a ? 1 : -1
        }

        function q(a) {
            return function(d) {
                return "input" === d.nodeName.toLowerCase() && d.type === a
            }
        }

        function h(a) {
            return function(d) {
                var e = d.nodeName.toLowerCase();
                return ("input" === e || "button" === e) && d.type === a
            }
        }

        function t(a) {
            return c(function(d) {
                return d = +d, c(function(e, b) {
                    for (var c, k = a([], e.length, d), f = k.length; f--;) e[c = k[f]] && (e[c] = !(b[c] = e[c]))
                })
            })
        }

        function r() {}

        function n(a, d) {
            var b, c, k, f, A, g, q;
            if (A = Ea[a + " "]) return d ? 0 : A.slice(0);
            A = a;
            g = [];
            for (q = E.preFilter; A;) {
                b &&
                    !(c = Z.exec(A)) || (c && (A = A.slice(c[0].length) || A), g.push(k = []));
                b = !1;
                (c = ca.exec(A)) && (b = c.shift(), k.push({
                    value: b,
                    type: c[0].replace(Ha, " ")
                }), A = A.slice(b.length));
                for (f in E.filter)!(c = ma[f].exec(A)) || q[f] && !(c = q[f](c)) || (b = c.shift(), k.push({
                    value: b,
                    type: f,
                    matches: c
                }), A = A.slice(b.length));
                if (!b) break
            }
            return d ? A.length : A ? e.error(a) : Ea(a, g).slice(0)
        }

        function x(a) {
            for (var d = 0, e = a.length, b = ""; e > d; d++) b += a[d].value;
            return b
        }

        function p(a, d, e) {
            var b = d.dir,
                c = e && "parentNode" === b,
                k = fb++;
            return d.first ? function(d,
                e, k) {
                for (; d = d[b];)
                    if (1 === d.nodeType || c) return a(d, e, k)
            } : function(d, e, f) {
                var A, g, q, h = y + " " + k;
                if (f)
                    for (; d = d[b];) {
                        if ((1 === d.nodeType || c) && a(d, e, f)) return !0
                    } else
                        for (; d = d[b];)
                            if (1 === d.nodeType || c)
                                if (q = d[S] || (d[S] = {}), (g = q[b]) && g[0] === h) {
                                    if (!0 === (A = g[1]) || A === F) return !0 === A
                                } else if (g = q[b] = [h], g[1] = a(d, e, f) || F, !0 === g[1]) return !0
            }
        }

        function u(a) {
            return 1 < a.length ? function(d, e, b) {
                for (var c = a.length; c--;)
                    if (!a[c](d, e, b)) return !1;
                return !0
            } : a[0]
        }

        function s(a, d, e, b, c) {
            for (var k, f = [], A = 0, g = a.length, q = null != d; g >
                A; A++)(k = a[A]) && (!e || e(k, b, c)) && (f.push(k), q && d.push(A));
            return f
        }

        function la(a, d, b, k, f, A) {
            return k && !k[S] && (k = la(k)), f && !f[S] && (f = la(f, A)), c(function(c, A, g, q) {
                var h, t, m = [],
                    aa = [],
                    r = A.length,
                    n;
                if (!(n = c)) {
                    n = d || "*";
                    for (var x = g.nodeType ? [g] : g, p = [], u = 0, la = x.length; la > u; u++) e(n, x[u], p);
                    n = p
                }
                n = !a || !c && d ? n : s(n, m, a, g, q);
                x = b ? f || (c ? a : r || k) ? [] : A : n;
                if (b && b(n, x, g, q), k)
                    for (h = s(x, aa), k(h, [], g, q), g = h.length; g--;)(t = h[g]) && (x[aa[g]] = !(n[aa[g]] = t));
                if (c) {
                    if (f || a) {
                        if (f) {
                            h = [];
                            for (g = x.length; g--;)(t = x[g]) && h.push(n[g] =
                                t);
                            f(null, x = [], h, q)
                        }
                        for (g = x.length; g--;)(t = x[g]) && -1 < (h = f ? R.call(c, t) : m[g]) && (c[h] = !(A[h] = t))
                    }
                } else x = s(x === A ? x.splice(r, x.length) : x), f ? f(null, A, x, q) : T.apply(A, x)
            })
        }

        function v(a) {
            var d, e, b, c = a.length,
                k = E.relative[a[0].type];
            e = k || E.relative[" "];
            for (var f = k ? 1 : 0, A = p(function(a) {
                return a === d
            }, e, !0), g = p(function(a) {
                return -1 < R.call(d, a)
            }, e, !0), q = [
                function(a, e, b) {
                    return !k && (b || e !== I) || ((d = e).nodeType ? A(a, e, b) : g(a, e, b))
                }
            ]; c > f; f++)
                if (e = E.relative[a[f].type]) q = [p(u(q), e)];
                else {
                    if (e = E.filter[a[f].type].apply(null,
                        a[f].matches), e[S]) {
                        for (b = ++f; c > b && !E.relative[a[b].type]; b++);
                        return la(1 < f && u(q), 1 < f && x(a.slice(0, f - 1).concat({
                            value: " " === a[f - 2].type ? "*" : ""
                        })).replace(Ha, "$1"), e, b > f && v(a.slice(f, b)), c > b && v(a = a.slice(b)), c > b && x(a))
                    }
                    q.push(e)
                }
            return u(q)
        }

        function w(a, d) {
            var b = 0,
                k = 0 < d.length,
                f = 0 < a.length,
                A = function(c, A, g, q, h) {
                    var t, m, aa = [],
                        r = 0,
                        n = "0",
                        x = c && [],
                        p = null != h,
                        u = I,
                        la = c || f && E.find.TAG("*", h && A.parentNode || A),
                        v = y += null == u ? 1 : Math.random() || 0.1;
                    for (p && (I = A !== X && A, F = b); null != (h = la[n]); n++) {
                        if (f && h) {
                            for (t = 0; m =
                                a[t++];)
                                if (m(h, A, g)) {
                                    q.push(h);
                                    break
                                }
                            p && (y = v, F = ++b)
                        }
                        k && ((h = !m && h) && r--, c && x.push(h))
                    }
                    if (r += n, k && n !== r) {
                        for (t = 0; m = d[t++];) m(x, aa, A, g);
                        if (c) {
                            if (0 < r)
                                for (; n--;) x[n] || aa[n] || (aa[n] = ia.call(q));
                            aa = s(aa)
                        }
                        T.apply(q, aa);
                        p && !c && 0 < aa.length && 1 < r + d.length && e.uniqueSort(q)
                    }
                    return p && (y = v, I = u), x
                };
            return k ? c(A) : A
        }
        var J, G, F, E, Q, V, L, I, D, z, X, M, P, N, C, da, K, S = "sizzle" + -new Date,
            qa = a.document,
            y = 0,
            fb = 0,
            ha = b(),
            Ea = b(),
            Y = b(),
            O = !1,
            U = function(a, d) {
                return a === d ? (O = !0, 0) : 0
            },
            ka = typeof d,
            B = -2147483648,
            wa = {}.hasOwnProperty,
            H = [],
            ia = H.pop,
            Fa = H.push,
            T = H.push,
            ba = H.slice,
            R = H.indexOf || function(a) {
                for (var d = 0, e = this.length; e > d; d++)
                    if (this[d] === a) return d;
                return -1
            },
            Ga = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#"),
            Na = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + Ga + ")|)|)[\\x20\\t\\r\\n\\f]*\\]",
            W = ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + Na.replace(3, 8) + ")*)|.*)\\)|)",
            Ha = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"),
            Z = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
            ca = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/,
            ja = /[\x20\t\r\n\f]*[+~]/,
            na = RegExp("=[\\x20\\t\\r\\n\\f]*([^\\]'\"]*)[\\x20\\t\\r\\n\\f]*\\]", "g"),
            oa = RegExp(W),
            ra = RegExp("^" + Ga + "$"),
            ma = {
                ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                TAG: RegExp("^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
                ATTR: RegExp("^" + Na),
                PSEUDO: RegExp("^" +
                    W),
                CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"),
                bool: RegExp("^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$", "i"),
                needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)",
                    "i")
            },
            pa = /^[^{]+\{\s*\[native \w/,
            sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ta = /^(?:input|select|textarea|button)$/i,
            ua = /^h\d$/i,
            va = /'|\\/g,
            ea = RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)", "ig"),
            fa = function(a, d, e) {
                a = "0x" + d - 65536;
                return a !== a || e ? d : 0 > a ? String.fromCharCode(a + 65536) : String.fromCharCode(55296 | a >> 10, 56320 | 1023 & a)
            };
        try {
            T.apply(H = ba.call(qa.childNodes), qa.childNodes), H[qa.childNodes.length].nodeType
        } catch (xa) {
            T = {
                apply: H.length ? function(a, d) {
                    Fa.apply(a, ba.call(d))
                } : function(a, d) {
                    for (var e = a.length, b = 0; a[e++] = d[b++];);
                    a.length = e - 1
                }
            }
        }
        V = e.isXML = function(a) {
            return (a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1
        };
        G = e.support = {};
        z = e.setDocument = function(a) {
            var e = a ? a.ownerDocument || a : qa;
            a = e.defaultView;
            return e !== X && 9 === e.nodeType && e.documentElement ? (X = e, M = e.documentElement, P = !V(e), a && a.attachEvent && a !== a.top && a.attachEvent("onbeforeunload", function() {
                    z()
                }), G.attributes = k(function(a) {
                    return a.className = "i", !a.getAttribute("className")
                }), G.getElementsByTagName =
                k(function(a) {
                    return a.appendChild(e.createComment("")), !a.getElementsByTagName("*").length
                }), G.getElementsByClassName = k(function(a) {
                    return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
                }), G.getById = k(function(a) {
                    return M.appendChild(a).id = S, !e.getElementsByName || !e.getElementsByName(S).length
                }), G.getById ? (E.find.ID = function(a, d) {
                    if (typeof d.getElementById !== ka && P) {
                        var e = d.getElementById(a);
                        return e && e.parentNode ? [e] :
                            []
                    }
                }, E.filter.ID = function(a) {
                    var d = a.replace(ea, fa);
                    return function(a) {
                        return a.getAttribute("id") === d
                    }
                }) : (delete E.find.ID, E.filter.ID = function(a) {
                    var d = a.replace(ea, fa);
                    return function(a) {
                        return (a = typeof a.getAttributeNode !== ka && a.getAttributeNode("id")) && a.value === d
                    }
                }), E.find.TAG = G.getElementsByTagName ? function(a, e) {
                    return typeof e.getElementsByTagName !== ka ? e.getElementsByTagName(a) : d
                } : function(a, d) {
                    var e, b = [],
                        c = 0,
                        k = d.getElementsByTagName(a);
                    if ("*" === a) {
                        for (; e = k[c++];) 1 === e.nodeType && b.push(e);
                        return b
                    }
                    return k
                }, E.find.CLASS = G.getElementsByClassName && function(a, e) {
                    return typeof e.getElementsByClassName !== ka && P ? e.getElementsByClassName(a) : d
                }, C = [], N = [], (G.qsa = pa.test(e.querySelectorAll)) && (k(function(a) {
                    a.innerHTML = "<select><option selected=''></option></select>";
                    a.querySelectorAll("[selected]").length || N.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
                    a.querySelectorAll(":checked").length ||
                        N.push(":checked")
                }), k(function(a) {
                    var d = e.createElement("input");
                    d.setAttribute("type", "hidden");
                    a.appendChild(d).setAttribute("t", "");
                    a.querySelectorAll("[t^='']").length && N.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                    a.querySelectorAll(":enabled").length || N.push(":enabled", ":disabled");
                    a.querySelectorAll("*,:x");
                    N.push(",.*:")
                })), (G.matchesSelector = pa.test(da = M.webkitMatchesSelector || M.mozMatchesSelector || M.oMatchesSelector || M.msMatchesSelector)) && k(function(a) {
                    G.disconnectedMatch = da.call(a,
                        "div");
                    da.call(a, "[s!='']:x");
                    C.push("!=", W)
                }), N = N.length && RegExp(N.join("|")), C = C.length && RegExp(C.join("|")), K = pa.test(M.contains) || M.compareDocumentPosition ? function(a, d) {
                    var e = 9 === a.nodeType ? a.documentElement : a,
                        b = d && d.parentNode;
                    return a === b || !(!b || 1 !== b.nodeType || !(e.contains ? e.contains(b) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(b)))
                } : function(a, d) {
                    if (d)
                        for (; d = d.parentNode;)
                            if (d === a) return !0;
                    return !1
                }, U = M.compareDocumentPosition ? function(a, d) {
                    if (a === d) return O = !0, 0;
                    var b = d.compareDocumentPosition &&
                        a.compareDocumentPosition && a.compareDocumentPosition(d);
                    return b ? 1 & b || !G.sortDetached && d.compareDocumentPosition(a) === b ? a === e || K(qa, a) ? -1 : d === e || K(qa, d) ? 1 : D ? R.call(D, a) - R.call(D, d) : 0 : 4 & b ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
                } : function(a, d) {
                    var b, c = 0;
                    b = a.parentNode;
                    var k = d.parentNode,
                        f = [a],
                        A = [d];
                    if (a === d) return O = !0, 0;
                    if (!b || !k) return a === e ? -1 : d === e ? 1 : b ? -1 : k ? 1 : D ? R.call(D, a) - R.call(D, d) : 0;
                    if (b === k) return g(a, d);
                    for (b = a; b = b.parentNode;) f.unshift(b);
                    for (b = d; b = b.parentNode;) A.unshift(b);
                    for (; f[c] === A[c];) c++;
                    return c ? g(f[c], A[c]) : f[c] === qa ? -1 : A[c] === qa ? 1 : 0
                }, e) : X
        };
        e.matches = function(a, d) {
            return e(a, null, null, d)
        };
        e.matchesSelector = function(a, d) {
            if ((a.ownerDocument || a) !== X && z(a), d = d.replace(na, "='$1']"), G.matchesSelector && P && !(C && C.test(d) || N && N.test(d))) try {
                var b = da.call(a, d);
                if (b || G.disconnectedMatch || a.document && 11 !== a.document.nodeType) return b
            } catch (c) {}
            return 0 < e(d, X, null, [a]).length
        };
        e.contains = function(a, d) {
            return (a.ownerDocument || a) !== X && z(a), K(a, d)
        };
        e.attr = function(a, e) {
            (a.ownerDocument || a) !==
                X && z(a);
            var b = E.attrHandle[e.toLowerCase()],
                b = b && wa.call(E.attrHandle, e.toLowerCase()) ? b(a, e, !P) : d;
            return b === d ? G.attributes || !P ? a.getAttribute(e) : (b = a.getAttributeNode(e)) && b.specified ? b.value : null : b
        };
        e.error = function(a) {
            throw Error("Syntax error, unrecognized expression: " + a);
        };
        e.uniqueSort = function(a) {
            var d, e = [],
                b = 0,
                c = 0;
            if (O = !G.detectDuplicates, D = !G.sortStable && a.slice(0), a.sort(U), O) {
                for (; d = a[c++];) d === a[c] && (b = e.push(c));
                for (; b--;) a.splice(e[b], 1)
            }
            return a
        };
        Q = e.getText = function(a) {
            var d, e = "",
                b = 0;
            if (d = a.nodeType)
                if (1 === d || 9 === d || 11 === d) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) e += Q(a)
                } else {
                    if (3 === d || 4 === d) return a.nodeValue
                } else
                for (; d = a[b]; b++) e += Q(d);
            return e
        };
        E = e.selectors = {
            cacheLength: 50,
            createPseudo: c,
            match: ma,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(ea, fa), a[3] = (a[4] ||
                        a[5] || "").replace(ea, fa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || e.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && e.error(a[0]), a
                },
                PSEUDO: function(a) {
                    var e, b = !a[5] && a[2];
                    return ma.CHILD.test(a[0]) ? null : (a[3] && a[4] !== d ? a[2] = a[4] : b && oa.test(b) && (e = n(b, !0)) && (e = b.indexOf(")", b.length - e) - b.length) && (a[0] = a[0].slice(0, e), a[2] = b.slice(0, e)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var d = a.replace(ea, fa).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === d
                    }
                },
                CLASS: function(a) {
                    var d = ha[a + " "];
                    return d || (d = RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)")) && ha(a, function(a) {
                        return d.test("string" == typeof a.className && a.className || typeof a.getAttribute !== ka && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, d, b) {
                    return function(c) {
                        c = e.attr(c, a);
                        return null == c ? "!=" === d : d ? (c += "", "=" === d ? c ===
                            b : "!=" === d ? c !== b : "^=" === d ? b && 0 === c.indexOf(b) : "*=" === d ? b && -1 < c.indexOf(b) : "$=" === d ? b && c.slice(-b.length) === b : "~=" === d ? -1 < (" " + c + " ").indexOf(b) : "|=" === d ? c === b || c.slice(0, b.length + 1) === b + "-" : !1) : !0
                    }
                },
                CHILD: function(a, d, e, b, c) {
                    var k = "nth" !== a.slice(0, 3),
                        f = "last" !== a.slice(-4),
                        A = "of-type" === d;
                    return 1 === b && 0 === c ? function(a) {
                        return !!a.parentNode
                    } : function(d, e, g) {
                        var q, h, t, m, aa;
                        e = k !== f ? "nextSibling" : "previousSibling";
                        var r = d.parentNode,
                            n = A && d.nodeName.toLowerCase();
                        g = !g && !A;
                        if (r) {
                            if (k) {
                                for (; e;) {
                                    for (h =
                                        d; h = h[e];)
                                        if (A ? h.nodeName.toLowerCase() === n : 1 === h.nodeType) return !1;
                                    aa = e = "only" === a && !aa && "nextSibling"
                                }
                                return !0
                            }
                            if (aa = [f ? r.firstChild : r.lastChild], f && g)
                                for (g = r[S] || (r[S] = {}), q = g[a] || [], m = q[0] === y && q[1], t = q[0] === y && q[2], h = m && r.childNodes[m]; h = ++m && h && h[e] || (t = m = 0) || aa.pop();) {
                                    if (1 === h.nodeType && ++t && h === d) {
                                        g[a] = [y, m, t];
                                        break
                                    }
                                } else if (g && (q = (d[S] || (d[S] = {}))[a]) && q[0] === y) t = q[1];
                                else
                                    for (;
                                        (h = ++m && h && h[e] || (t = m = 0) || aa.pop()) && ((A ? h.nodeName.toLowerCase() !== n : 1 !== h.nodeType) || !++t || (g && ((h[S] || (h[S] = {}))[a] = [y, t]), h !== d)););
                            return t -= c, t === b || 0 === t % b && 0 <= t / b
                        }
                    }
                },
                PSEUDO: function(a, d) {
                    var b, k = E.pseudos[a] || E.setFilters[a.toLowerCase()] || e.error("unsupported pseudo: " + a);
                    return k[S] ? k(d) : 1 < k.length ? (b = [a, a, "", d], E.setFilters.hasOwnProperty(a.toLowerCase()) ? c(function(a, e) {
                        for (var b, c = k(a, d), f = c.length; f--;) b = R.call(a, c[f]), a[b] = !(e[b] = c[f])
                    }) : function(a) {
                        return k(a, 0, b)
                    }) : k
                }
            },
            pseudos: {
                not: c(function(a) {
                    var d = [],
                        e = [],
                        b = L(a.replace(Ha, "$1"));
                    return b[S] ? c(function(a, d, e, c) {
                        var k;
                        e = b(a, null, c, []);
                        for (c =
                            a.length; c--;)(k = e[c]) && (a[c] = !(d[c] = k))
                    }) : function(a, c, k) {
                        return d[0] = a, b(d, null, k, e), !e.pop()
                    }
                }),
                has: c(function(a) {
                    return function(d) {
                        return 0 < e(a, d).length
                    }
                }),
                contains: c(function(a) {
                    return function(d) {
                        return -1 < (d.textContent || d.innerText || Q(d)).indexOf(a)
                    }
                }),
                lang: c(function(a) {
                    return ra.test(a || "") || e.error("unsupported lang: " + a), a = a.replace(ea, fa).toLowerCase(),
                        function(d) {
                            var e;
                            do
                                if (e = P ? d.lang : d.getAttribute("xml:lang") || d.getAttribute("lang")) return e = e.toLowerCase(), e === a || 0 === e.indexOf(a +
                                    "-");
                            while ((d = d.parentNode) && 1 === d.nodeType);
                            return !1
                        }
                }),
                target: function(d) {
                    var e = a.location && a.location.hash;
                    return e && e.slice(1) === d.id
                },
                root: function(a) {
                    return a === M
                },
                focus: function(a) {
                    return a === X.activeElement && (!X.hasFocus || X.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return !1 === a.disabled
                },
                disabled: function(a) {
                    return !0 === a.disabled
                },
                checked: function(a) {
                    var d = a.nodeName.toLowerCase();
                    return "input" === d && !!a.checked || "option" === d && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode &&
                        a.parentNode.selectedIndex, !0 === a.selected
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if ("@" < a.nodeName || 3 === a.nodeType || 4 === a.nodeType) return !1;
                    return !0
                },
                parent: function(a) {
                    return !E.pseudos.empty(a)
                },
                header: function(a) {
                    return ua.test(a.nodeName)
                },
                input: function(a) {
                    return ta.test(a.nodeName)
                },
                button: function(a) {
                    var d = a.nodeName.toLowerCase();
                    return "input" === d && "button" === a.type || "button" === d
                },
                text: function(a) {
                    var d;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (d =
                        a.getAttribute("type")) || d.toLowerCase() === a.type)
                },
                first: t(function() {
                    return [0]
                }),
                last: t(function(a, d) {
                    return [d - 1]
                }),
                eq: t(function(a, d, e) {
                    return [0 > e ? e + d : e]
                }),
                even: t(function(a, d) {
                    for (var e = 0; d > e; e += 2) a.push(e);
                    return a
                }),
                odd: t(function(a, d) {
                    for (var e = 1; d > e; e += 2) a.push(e);
                    return a
                }),
                lt: t(function(a, d, e) {
                    for (d = 0 > e ? e + d : e; 0 <= --d;) a.push(d);
                    return a
                }),
                gt: t(function(a, d, e) {
                    for (e = 0 > e ? e + d : e; d > ++e;) a.push(e);
                    return a
                })
            }
        };
        E.pseudos.nth = E.pseudos.eq;
        for (J in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) E.pseudos[J] =
            q(J);
        for (J in {
            submit: !0,
            reset: !0
        }) E.pseudos[J] = h(J);
        r.prototype = E.filters = E.pseudos;
        E.setFilters = new r;
        L = e.compile = function(a, d) {
            var e, b = [],
                c = [],
                k = Y[a + " "];
            if (!k) {
                d || (d = n(a));
                for (e = d.length; e--;) k = v(d[e]), k[S] ? b.push(k) : c.push(k);
                k = Y(a, w(c, b))
            }
            return k
        };
        G.sortStable = S.split("").sort(U).join("") === S;
        G.detectDuplicates = O;
        z();
        G.sortDetached = k(function(a) {
            return 1 & a.compareDocumentPosition(X.createElement("div"))
        });
        k(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) ||
            f("type|href|height|width", function(a, e, b) {
                return b ? d : a.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
            });
        G.attributes && k(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || f("value", function(a, e, b) {
            return b || "input" !== a.nodeName.toLowerCase() ? d : a.defaultValue
        });
        k(function(a) {
            return null == a.getAttribute("disabled")
        }) || f("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            function(a, e, b) {
                var c;
                return b ? d : (c = a.getAttributeNode(e)) && c.specified ? c.value : !0 === a[e] ? e.toLowerCase() : null
            });
        m.find = e;
        m.expr = e.selectors;
        m.expr[":"] = m.expr.pseudos;
        m.unique = e.uniqueSort;
        m.text = e.getText;
        m.isXMLDoc = e.isXML;
        m.contains = e.contains
    })(a);
    var Pa = {};
    m.Callbacks = function(a) {
        a = "string" == typeof a ? Pa[a] || h(a) : m.extend({}, a);
        var d, e, c, k, f, g, q = [],
            t = !a.once && [],
            r = function(b) {
                e = a.memory && b;
                c = !0;
                f = g || 0;
                g = 0;
                k = q.length;
                for (d = !0; q && k > f; f++)
                    if (!1 === q[f].apply(b[0], b[1]) && a.stopOnFalse) {
                        e = !1;
                        break
                    }
                d = !1;
                q && (t ? t.length && r(t.shift()) : e ? q = [] : n.disable())
            },
            n = {
                add: function() {
                    if (q) {
                        var b = q.length;
                        (function Mb(d) {
                            m.each(d, function(d, e) {
                                var b = m.type(e);
                                "function" === b ? a.unique && n.has(e) || q.push(e) : e && e.length && "string" !== b && Mb(e)
                            })
                        })(arguments);
                        d ? k = q.length : e && (g = b, r(e))
                    }
                    return this
                },
                remove: function() {
                    return q && m.each(arguments, function(a, e) {
                        for (var b; - 1 < (b = m.inArray(e, q, b));) q.splice(b, 1), d && (k >= b && k--, f >= b && f--)
                    }), this
                },
                has: function(a) {
                    return a ? -1 < m.inArray(a, q) : !(!q || !q.length)
                },
                empty: function() {
                    return q =
                        [], k = 0, this
                },
                disable: function() {
                    return q = t = e = b, this
                },
                disabled: function() {
                    return !q
                },
                lock: function() {
                    return t = b, e || n.disable(), this
                },
                locked: function() {
                    return !t
                },
                fireWith: function(a, e) {
                    return !q || c && !t || (e = e || [], e = [a, e.slice ? e.slice() : e], d ? t.push(e) : r(e)), this
                },
                fire: function() {
                    return n.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!c
                }
            };
        return n
    };
    m.extend({
        Deferred: function(a) {
            var d = [
                    ["resolve", "done", m.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", m.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", m.Callbacks("memory")]
                ],
                e = "pending",
                b = {
                    state: function() {
                        return e
                    },
                    always: function() {
                        return c.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var a = arguments;
                        return m.Deferred(function(e) {
                            m.each(d, function(d, k) {
                                var f = k[0],
                                    A = m.isFunction(a[d]) && a[d];
                                c[k[1]](function() {
                                    var a = A && A.apply(this, arguments);
                                    a && m.isFunction(a.promise) ? a.promise().done(e.resolve).fail(e.reject).progress(e.notify) : e[f + "With"](this === b ? e.promise() : this, A ? [a] : arguments)
                                })
                            });
                            a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return null !=
                            a ? m.extend(a, b) : b
                    }
                },
                c = {};
            return b.pipe = b.then, m.each(d, function(a, k) {
                var f = k[2],
                    A = k[3];
                b[k[1]] = f.add;
                A && f.add(function() {
                    e = A
                }, d[1 ^ a][2].disable, d[2][2].lock);
                c[k[0]] = function() {
                    return c[k[0] + "With"](this === c ? b : this, arguments), this
                };
                c[k[0] + "With"] = f.fireWith
            }), b.promise(c), a && a.call(c, c), c
        },
        when: function(a) {
            var d = 0,
                e = ma.call(arguments),
                b = e.length,
                c = 1 !== b || a && m.isFunction(a.promise) ? b : 0,
                k = 1 === c ? a : m.Deferred(),
                f = function(a, d, e) {
                    return function(b) {
                        d[a] = this;
                        e[a] = 1 < arguments.length ? ma.call(arguments) :
                            b;
                        e === g ? k.notifyWith(d, e) : --c || k.resolveWith(d, e)
                    }
                },
                g, q, h;
            if (1 < b)
                for (g = Array(b), q = Array(b), h = Array(b); b > d; d++) e[d] && m.isFunction(e[d].promise) ? e[d].promise().done(f(d, h, e)).fail(k.reject).progress(f(d, q, g)) : --c;
            return c || k.resolveWith(h, e), k.promise()
        }
    });
    m.support = function(d) {
        var e, b, c, k, f, g, q = H.createElement("div");
        if (q.setAttribute("className", "t"), q.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = q.getElementsByTagName("*") || [], b = q.getElementsByTagName("a")[0], !b || !b.style || !e.length) return d;
        c = H.createElement("select");
        k = c.appendChild(H.createElement("option"));
        e = q.getElementsByTagName("input")[0];
        b.style.cssText = "top:1px;float:left;opacity:.5";
        d.getSetAttribute = "t" !== q.className;
        d.leadingWhitespace = 3 === q.firstChild.nodeType;
        d.tbody = !q.getElementsByTagName("tbody").length;
        d.htmlSerialize = !!q.getElementsByTagName("link").length;
        d.style = /top/.test(b.getAttribute("style"));
        d.hrefNormalized = "/a" === b.getAttribute("href");
        d.opacity = /^0.5/.test(b.style.opacity);
        d.cssFloat = !!b.style.cssFloat;
        d.checkOn = !!e.value;
        d.optSelected = k.selected;
        d.enctype = !!H.createElement("form").enctype;
        d.html5Clone = "<:nav></:nav>" !== H.createElement("nav").cloneNode(!0).outerHTML;
        d.inlineBlockNeedsLayout = !1;
        d.shrinkWrapBlocks = !1;
        d.pixelPosition = !1;
        d.deleteExpando = !0;
        d.noCloneEvent = !0;
        d.reliableMarginRight = !0;
        d.boxSizingReliable = !0;
        e.checked = !0;
        d.noCloneChecked = e.cloneNode(!0).checked;
        c.disabled = !0;
        d.optDisabled = !k.disabled;
        try {
            delete q.test
        } catch (h) {
            d.deleteExpando = !1
        }
        e = H.createElement("input");
        e.setAttribute("value", "");
        d.input = "" === e.getAttribute("value");
        e.value = "t";
        e.setAttribute("type", "radio");
        d.radioValue = "t" === e.value;
        e.setAttribute("checked", "t");
        e.setAttribute("name", "t");
        b = H.createDocumentFragment();
        b.appendChild(e);
        d.appendChecked = e.checked;
        d.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked;
        q.attachEvent && (q.attachEvent("onclick", function() {
            d.noCloneEvent = !1
        }), q.cloneNode(!0).click());
        for (g in {
            submit: !0,
            change: !0,
            focusin: !0
        }) q.setAttribute(b = "on" + g, "t"), d[g + "Bubbles"] =
            b in a || !1 === q.attributes[b].expando;
        q.style.backgroundClip = "content-box";
        q.cloneNode(!0).style.backgroundClip = "";
        d.clearCloneStyle = "content-box" === q.style.backgroundClip;
        for (g in m(d)) break;
        return d.ownLast = "0" !== g, m(function() {
            var e, b, c, k = H.getElementsByTagName("body")[0];
            k && (e = H.createElement("div"), e.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", k.appendChild(e).appendChild(q), q.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", c = q.getElementsByTagName("td"),
                c[0].style.cssText = "padding:0;margin:0;border:0;display:none", f = 0 === c[0].offsetHeight, c[0].style.display = "", c[1].style.display = "none", d.reliableHiddenOffsets = f && 0 === c[0].offsetHeight, q.innerHTML = "", q.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", m.swap(k, null != k.style.zoom ? {
                    zoom: 1
                } : {}, function() {
                    d.boxSizing = 4 === q.offsetWidth
                }), a.getComputedStyle && (d.pixelPosition =
                    "1%" !== (a.getComputedStyle(q, null) || {}).top, d.boxSizingReliable = "4px" === (a.getComputedStyle(q, null) || {
                        width: "4px"
                    }).width, b = q.appendChild(H.createElement("div")), b.style.cssText = q.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", b.style.marginRight = b.style.width = "0", q.style.width = "1px", d.reliableMarginRight = !parseFloat((a.getComputedStyle(b, null) || {}).marginRight)), typeof q.style.zoom !== T && (q.innerHTML = "",
                    q.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;width:1px;padding:1px;display:inline;zoom:1", d.inlineBlockNeedsLayout = 3 === q.offsetWidth, q.style.display = "block", q.innerHTML = "<div></div>", q.firstChild.style.width = "5px", d.shrinkWrapBlocks = 3 !== q.offsetWidth, d.inlineBlockNeedsLayout && (k.style.zoom = 1)), k.removeChild(e), e = q = c = b = null)
        }), e = c = b = k = b = e = null, d
    }({});
    var Wa = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        Qa = /([A-Z])/g;
    m.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(a) {
            return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando], !!a && !r(a)
        },
        data: function(a, d, e) {
            return f(a, d, e)
        },
        removeData: function(a, d) {
            return p(a, d)
        },
        _data: function(a, d, e) {
            return f(a, d, e, !0)
        },
        _removeData: function(a, d) {
            return p(a, d, !0)
        },
        acceptData: function(a) {
            if (a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType) return !1;
            var d = a.nodeName && m.noData[a.nodeName.toLowerCase()];
            return !d || !0 !== d && a.getAttribute("classid") ===
                d
        }
    });
    m.fn.extend({
        data: function(a, d) {
            var e, c, k = null,
                f = 0,
                q = this[0];
            if (a === b) {
                if (this.length && (k = m.data(q), 1 === q.nodeType && !m._data(q, "parsedAttrs"))) {
                    for (e = q.attributes; e.length > f; f++) c = e[f].name, 0 === c.indexOf("data-") && (c = m.camelCase(c.slice(5)), g(q, c, k[c]));
                    m._data(q, "parsedAttrs", !0)
                }
                return k
            }
            return "object" == typeof a ? this.each(function() {
                m.data(this, a)
            }) : 1 < arguments.length ? this.each(function() {
                m.data(this, a, d)
            }) : q ? g(q, a, m.data(q, a)) : null
        },
        removeData: function(a) {
            return this.each(function() {
                m.removeData(this,
                    a)
            })
        }
    });
    m.extend({
        queue: function(a, d, e) {
            var c;
            return a ? (d = (d || "fx") + "queue", c = m._data(a, d), e && (!c || m.isArray(e) ? c = m._data(a, d, m.makeArray(e)) : c.push(e)), c || []) : b
        },
        dequeue: function(a, d) {
            d = d || "fx";
            var e = m.queue(a, d),
                b = e.length,
                c = e.shift(),
                k = m._queueHooks(a, d),
                f = function() {
                    m.dequeue(a, d)
                };
            "inprogress" === c && (c = e.shift(), b--);
            c && ("fx" === d && e.unshift("inprogress"), delete k.stop, c.call(a, f, k));
            !b && k && k.empty.fire()
        },
        _queueHooks: function(a, d) {
            var e = d + "queueHooks";
            return m._data(a, e) || m._data(a, e, {
                empty: m.Callbacks("once memory").add(function() {
                    m._removeData(a,
                        d + "queue");
                    m._removeData(a, e)
                })
            })
        }
    });
    m.fn.extend({
        queue: function(a, d) {
            var e = 2;
            return "string" != typeof a && (d = a, a = "fx", e--), e > arguments.length ? m.queue(this[0], a) : d === b ? this : this.each(function() {
                var e = m.queue(this, a, d);
                m._queueHooks(this, a);
                "fx" === a && "inprogress" !== e[0] && m.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                m.dequeue(this, a)
            })
        },
        delay: function(a, d) {
            return a = m.fx ? m.fx.speeds[a] || a : a, d = d || "fx", this.queue(d, function(d, e) {
                var b = setTimeout(d, a);
                e.stop = function() {
                    clearTimeout(b)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, d) {
            var e, c = 1,
                k = m.Deferred(),
                f = this,
                q = this.length,
                g = function() {
                    --c || k.resolveWith(f, [f])
                };
            "string" != typeof a && (d = a, a = b);
            for (a = a || "fx"; q--;)(e = m._data(f[q], a + "queueHooks")) && e.empty && (c++, e.empty.add(g));
            return g(), k.promise(d)
        }
    });
    var ea, la, E = /[\t\r\n\f]/g,
        X = /\r/g,
        qa = /^(?:input|select|textarea|button|object)$/i,
        fb = /^(?:a|area)$/i,
        Ea = /^(?:checked|selected)$/i,
        wa = m.support.getSetAttribute,
        Fa = m.support.input;
    m.fn.extend({
        attr: function(a,
            d) {
            return m.access(this, m.attr, a, d, 1 < arguments.length)
        },
        removeAttr: function(a) {
            return this.each(function() {
                m.removeAttr(this, a)
            })
        },
        prop: function(a, d) {
            return m.access(this, m.prop, a, d, 1 < arguments.length)
        },
        removeProp: function(a) {
            return a = m.propFix[a] || a, this.each(function() {
                try {
                    this[a] = b, delete this[a]
                } catch (d) {}
            })
        },
        addClass: function(a) {
            var d, e, b, c, k, f = 0,
                q = this.length;
            d = "string" == typeof a && a;
            if (m.isFunction(a)) return this.each(function(d) {
                m(this).addClass(a.call(this, d, this.className))
            });
            if (d)
                for (d =
                    (a || "").match(B) || []; q > f; f++)
                    if (e = this[f], b = 1 === e.nodeType && (e.className ? (" " + e.className + " ").replace(E, " ") : " ")) {
                        for (k = 0; c = d[k++];) 0 > b.indexOf(" " + c + " ") && (b += c + " ");
                        e.className = m.trim(b)
                    }
            return this
        },
        removeClass: function(a) {
            var d, e, b, c, k, f = 0,
                q = this.length;
            d = 0 === arguments.length || "string" == typeof a && a;
            if (m.isFunction(a)) return this.each(function(d) {
                m(this).removeClass(a.call(this, d, this.className))
            });
            if (d)
                for (d = (a || "").match(B) || []; q > f; f++)
                    if (e = this[f], b = 1 === e.nodeType && (e.className ? (" " + e.className +
                        " ").replace(E, " ") : "")) {
                        for (k = 0; c = d[k++];)
                            for (; 0 <= b.indexOf(" " + c + " ");) b = b.replace(" " + c + " ", " ");
                        e.className = a ? m.trim(b) : ""
                    }
            return this
        },
        toggleClass: function(a, d) {
            var e = typeof a;
            return "boolean" == typeof d && "string" === e ? d ? this.addClass(a) : this.removeClass(a) : m.isFunction(a) ? this.each(function(e) {
                m(this).toggleClass(a.call(this, e, this.className, d), d)
            }) : this.each(function() {
                if ("string" === e)
                    for (var d, b = 0, c = m(this), k = a.match(B) || []; d = k[b++];) c.hasClass(d) ? c.removeClass(d) : c.addClass(d);
                else(e === T || "boolean" ===
                    e) && (this.className && m._data(this, "__className__", this.className), this.className = this.className || !1 === a ? "" : m._data(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            a = " " + a + " ";
            for (var d = 0, e = this.length; e > d; d++)
                if (1 === this[d].nodeType && 0 <= (" " + this[d].className + " ").replace(E, " ").indexOf(a)) return !0;
            return !1
        },
        val: function(a) {
            var d, e, c, k = this[0];
            if (arguments.length) return c = m.isFunction(a), this.each(function(d) {
                var k;
                1 === this.nodeType && (k = c ? a.call(this, d, m(this).val()) : a, null == k ? k = "" : "number" == typeof k ?
                    k += "" : m.isArray(k) && (k = m.map(k, function(a) {
                        return null == a ? "" : a + ""
                    })), e = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], e && "set" in e && e.set(this, k, "value") !== b || (this.value = k))
            });
            if (k) return e = m.valHooks[k.type] || m.valHooks[k.nodeName.toLowerCase()], e && "get" in e && (d = e.get(k, "value")) !== b ? d : (d = k.value, "string" == typeof d ? d.replace(X, "") : null == d ? "" : d)
        }
    });
    m.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var d = m.find.attr(a, "value");
                    return null != d ? d : a.text
                }
            },
            select: {
                get: function(a) {
                    for (var d,
                        e = a.options, b = a.selectedIndex, c = "select-one" === a.type || 0 > b, k = c ? null : [], f = c ? b + 1 : e.length, q = 0 > b ? f : c ? b : 0; f > q; q++)
                        if (d = e[q], !(!d.selected && q !== b || (m.support.optDisabled ? d.disabled : null !== d.getAttribute("disabled")) || d.parentNode.disabled && m.nodeName(d.parentNode, "optgroup"))) {
                            if (a = m(d).val(), c) return a;
                            k.push(a)
                        }
                    return k
                },
                set: function(a, d) {
                    for (var e, b, c = a.options, k = m.makeArray(d), f = c.length; f--;) b = c[f], (b.selected = 0 <= m.inArray(m(b).val(), k)) && (e = !0);
                    return e || (a.selectedIndex = -1), k
                }
            }
        },
        attr: function(a,
            d, e) {
            var c, k, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === T ? m.prop(a, d, e) : (1 === f && m.isXMLDoc(a) || (d = d.toLowerCase(), c = m.attrHooks[d] || (m.expr.match.bool.test(d) ? la : ea)), e === b ? c && "get" in c && null !== (k = c.get(a, d)) ? k : (k = m.find.attr(a, d), null == k ? b : k) : null !== e ? c && "set" in c && (k = c.set(a, e, d)) !== b ? k : (a.setAttribute(d, e + ""), e) : (m.removeAttr(a, d), b))
        },
        removeAttr: function(a, d) {
            var e, b, c = 0,
                k = d && d.match(B);
            if (k && 1 === a.nodeType)
                for (; e = k[c++];) b = m.propFix[e] || e, m.expr.match.bool.test(e) ?
                    Fa && wa || !Ea.test(e) ? a[b] = !1 : a[m.camelCase("default-" + e)] = a[b] = !1 : m.attr(a, e, ""), a.removeAttribute(wa ? e : b)
        },
        attrHooks: {
            type: {
                set: function(a, d) {
                    if (!m.support.radioValue && "radio" === d && m.nodeName(a, "input")) {
                        var e = a.value;
                        return a.setAttribute("type", d), e && (a.value = e), d
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, d, e) {
            var c, k, f, q = a.nodeType;
            if (a && 3 !== q && 8 !== q && 2 !== q) return f = 1 !== q || !m.isXMLDoc(a), f && (d = m.propFix[d] || d, k = m.propHooks[d]), e !== b ? k && "set" in k && (c = k.set(a, e, d)) !== b ? c :
                a[d] = e : k && "get" in k && null !== (c = k.get(a, d)) ? c : a[d]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var d = m.find.attr(a, "tabindex");
                    return d ? parseInt(d, 10) : qa.test(a.nodeName) || fb.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        }
    });
    la = {
        set: function(a, d, e) {
            return !1 === d ? m.removeAttr(a, e) : Fa && wa || !Ea.test(e) ? a.setAttribute(!wa && m.propFix[e] || e, e) : a[m.camelCase("default-" + e)] = a[e] = !0, e
        }
    };
    m.each(m.expr.match.bool.source.match(/\w+/g), function(a, d) {
        var e = m.expr.attrHandle[d] || m.find.attr;
        m.expr.attrHandle[d] = Fa && wa || !Ea.test(d) ? function(a,
            d, c) {
            var k = m.expr.attrHandle[d];
            a = c ? b : (m.expr.attrHandle[d] = b) != e(a, d, c) ? d.toLowerCase() : null;
            return m.expr.attrHandle[d] = k, a
        } : function(a, d, e) {
            return e ? b : a[m.camelCase("default-" + d)] ? d.toLowerCase() : null
        }
    });
    Fa && wa || (m.attrHooks.value = {
        set: function(a, d, e) {
            return m.nodeName(a, "input") ? (a.defaultValue = d, b) : ea && ea.set(a, d, e)
        }
    });
    wa || (ea = {
        set: function(a, d, e) {
            var c = a.getAttributeNode(e);
            return c || a.setAttributeNode(c = a.ownerDocument.createAttribute(e)), c.value = d += "", "value" === e || d === a.getAttribute(e) ? d :
                b
        }
    }, m.expr.attrHandle.id = m.expr.attrHandle.name = m.expr.attrHandle.coords = function(a, d, e) {
        var c;
        return e ? b : (c = a.getAttributeNode(d)) && "" !== c.value ? c.value : null
    }, m.valHooks.button = {
        get: function(a, d) {
            var e = a.getAttributeNode(d);
            return e && e.specified ? e.value : b
        },
        set: ea.set
    }, m.attrHooks.contenteditable = {
        set: function(a, d, e) {
            ea.set(a, "" === d ? !1 : d, e)
        }
    }, m.each(["width", "height"], function(a, d) {
        m.attrHooks[d] = {
            set: function(a, e) {
                return "" === e ? (a.setAttribute(d, "auto"), e) : b
            }
        }
    }));
    m.support.hrefNormalized || m.each(["href",
        "src"
    ], function(a, d) {
        m.propHooks[d] = {
            get: function(a) {
                return a.getAttribute(d, 4)
            }
        }
    });
    m.support.style || (m.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || b
        },
        set: function(a, d) {
            return a.style.cssText = d + ""
        }
    });
    m.support.optSelected || (m.propHooks.selected = {
        get: function(a) {
            a = a.parentNode;
            return a && (a.selectedIndex, a.parentNode && a.parentNode.selectedIndex), null
        }
    });
    m.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function() {
        m.propFix[this.toLowerCase()] =
            this
    });
    m.support.enctype || (m.propFix.enctype = "encoding");
    m.each(["radio", "checkbox"], function() {
        m.valHooks[this] = {
            set: function(a, d) {
                return m.isArray(d) ? a.checked = 0 <= m.inArray(m(a).val(), d) : b
            }
        };
        m.support.checkOn || (m.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var Ga = /^(?:input|select|textarea)$/i,
        Ha = /^key/,
        Nb = /^(?:mouse|contextmenu)|click/,
        Na = /^(?:focusinfocus|focusoutblur)$/,
        qb = /^([^.]*)(?:\.(.+)|)$/;
    m.event = {
        global: {},
        add: function(a, d, e, c, k) {
            var f, q, g, h,
                t, r, n, x, p, u;
            if (g = m._data(a)) {
                e.handler && (h = e, e = h.handler, k = h.selector);
                e.guid || (e.guid = m.guid++);
                (q = g.events) || (q = g.events = {});
                (r = g.handle) || (r = g.handle = function(a) {
                    return typeof m === T || a && m.event.triggered === a.type ? b : m.event.dispatch.apply(r.elem, arguments)
                }, r.elem = a);
                d = (d || "").match(B) || [""];
                for (g = d.length; g--;) f = qb.exec(d[g]) || [], p = u = f[1], f = (f[2] || "").split(".").sort(), p && (t = m.event.special[p] || {}, p = (k ? t.delegateType : t.bindType) || p, t = m.event.special[p] || {}, n = m.extend({
                    type: p,
                    origType: u,
                    data: c,
                    handler: e,
                    guid: e.guid,
                    selector: k,
                    needsContext: k && m.expr.match.needsContext.test(k),
                    namespace: f.join(".")
                }, h), (x = q[p]) || (x = q[p] = [], x.delegateCount = 0, t.setup && !1 !== t.setup.call(a, c, f, r) || (a.addEventListener ? a.addEventListener(p, r, !1) : a.attachEvent && a.attachEvent("on" + p, r))), t.add && (t.add.call(a, n), n.handler.guid || (n.handler.guid = e.guid)), k ? x.splice(x.delegateCount++, 0, n) : x.push(n), m.event.global[p] = !0);
                a = null
            }
        },
        remove: function(a, d, e, b, c) {
            var k, f, q, g, h, t, r, n, x, p, u, s = m.hasData(a) && m._data(a);
            if (s && (t =
                s.events)) {
                d = (d || "").match(B) || [""];
                for (h = d.length; h--;)
                    if (q = qb.exec(d[h]) || [], x = u = q[1], p = (q[2] || "").split(".").sort(), x) {
                        r = m.event.special[x] || {};
                        x = (b ? r.delegateType : r.bindType) || x;
                        n = t[x] || [];
                        q = q[2] && RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)");
                        for (g = k = n.length; k--;) f = n[k], !c && u !== f.origType || e && e.guid !== f.guid || q && !q.test(f.namespace) || b && b !== f.selector && ("**" !== b || !f.selector) || (n.splice(k, 1), f.selector && n.delegateCount--, r.remove && r.remove.call(a, f));
                        g && !n.length && (r.teardown && !1 !== r.teardown.call(a,
                            p, s.handle) || m.removeEvent(a, x, s.handle), delete t[x])
                    } else
                        for (x in t) m.event.remove(a, x + d[h], e, b, !0);
                m.isEmptyObject(t) && (delete s.handle, m._removeData(a, "events"))
            }
        },
        trigger: function(d, e, c, k) {
            var f, q, g, h, t, r, n = [c || H],
                x = pa.call(d, "type") ? d.type : d;
            r = pa.call(d, "namespace") ? d.namespace.split(".") : [];
            if (g = f = c = c || H, 3 !== c.nodeType && 8 !== c.nodeType && !Na.test(x + m.event.triggered) && (0 <= x.indexOf(".") && (r = x.split("."), x = r.shift(), r.sort()), q = 0 > x.indexOf(":") && "on" + x, d = d[m.expando] ? d : new m.Event(x, "object" ==
                typeof d && d), d.isTrigger = k ? 2 : 3, d.namespace = r.join("."), d.namespace_re = d.namespace ? RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, d.result = b, d.target || (d.target = c), e = null == e ? [d] : m.makeArray(e, [d]), t = m.event.special[x] || {}, k || !t.trigger || !1 !== t.trigger.apply(c, e))) {
                if (!k && !t.noBubble && !m.isWindow(c)) {
                    h = t.delegateType || x;
                    for (Na.test(h + x) || (g = g.parentNode); g; g = g.parentNode) n.push(g), f = g;
                    f === (c.ownerDocument || H) && n.push(f.defaultView || f.parentWindow || a)
                }
                for (r = 0;
                    (g = n[r++]) && !d.isPropagationStopped();) d.type =
                    1 < r ? h : t.bindType || x, (f = (m._data(g, "events") || {})[d.type] && m._data(g, "handle")) && f.apply(g, e), (f = q && g[q]) && m.acceptData(g) && f.apply && !1 === f.apply(g, e) && d.preventDefault();
                if (d.type = x, !(k || d.isDefaultPrevented() || t._default && !1 !== t._default.apply(n.pop(), e)) && m.acceptData(c) && q && c[x] && !m.isWindow(c)) {
                    (f = c[q]) && (c[q] = null);
                    m.event.triggered = x;
                    try {
                        c[x]()
                    } catch (p) {}
                    m.event.triggered = b;
                    f && (c[q] = f)
                }
                return d.result
            }
        },
        dispatch: function(a) {
            a = m.event.fix(a);
            var d, e, c, k, f, q = [],
                g = ma.call(arguments);
            d = (m._data(this,
                "events") || {})[a.type] || [];
            var h = m.event.special[a.type] || {};
            if (g[0] = a, a.delegateTarget = this, !h.preDispatch || !1 !== h.preDispatch.call(this, a)) {
                q = m.event.handlers.call(this, a, d);
                for (d = 0;
                    (k = q[d++]) && !a.isPropagationStopped();)
                    for (a.currentTarget = k.elem, f = 0;
                        (c = k.handlers[f++]) && !a.isImmediatePropagationStopped();) a.namespace_re && !a.namespace_re.test(c.namespace) || (a.handleObj = c, a.data = c.data, e = ((m.event.special[c.origType] || {}).handle || c.handler).apply(k.elem, g), e === b || !1 !== (a.result = e) || (a.preventDefault(),
                        a.stopPropagation()));
                return h.postDispatch && h.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(a, d) {
            var e, c, k, f, q = [],
                g = d.delegateCount,
                h = a.target;
            if (g && h.nodeType && (!a.button || "click" !== a.type))
                for (; h != this; h = h.parentNode || this)
                    if (1 === h.nodeType && (!0 !== h.disabled || "click" !== a.type)) {
                        k = [];
                        for (f = 0; g > f; f++) c = d[f], e = c.selector + " ", k[e] === b && (k[e] = c.needsContext ? 0 <= m(e, this).index(h) : m.find(e, this, null, [h]).length), k[e] && k.push(c);
                        k.length && q.push({
                            elem: h,
                            handlers: k
                        })
                    }
            return d.length > g && q.push({
                elem: this,
                handlers: d.slice(g)
            }), q
        },
        fix: function(a) {
            if (a[m.expando]) return a;
            var d, e, b;
            d = a.type;
            var c = a,
                k = this.fixHooks[d];
            k || (this.fixHooks[d] = k = Nb.test(d) ? this.mouseHooks : Ha.test(d) ? this.keyHooks : {});
            b = k.props ? this.props.concat(k.props) : this.props;
            a = new m.Event(c);
            for (d = b.length; d--;) e = b[d], a[e] = c[e];
            return a.target || (a.target = c.srcElement || H), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, k.filter ? k.filter(a, c) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"],
            filter: function(a, d) {
                return null == a.which && (a.which = null != d.charCode ? d.charCode : d.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, d) {
                var e, c, k, f = d.button,
                    q = d.fromElement;
                return null == a.pageX && null != d.clientX && (c = a.target.ownerDocument || H, k = c.documentElement, e = c.body, a.pageX = d.clientX + (k && k.scrollLeft || e && e.scrollLeft || 0) - (k &&
                    k.clientLeft || e && e.clientLeft || 0), a.pageY = d.clientY + (k && k.scrollTop || e && e.scrollTop || 0) - (k && k.clientTop || e && e.clientTop || 0)), !a.relatedTarget && q && (a.relatedTarget = q === a.target ? d.toElement : q), a.which || f === b || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== v() && this.focus) try {
                        return this.focus(), !1
                    } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === v() && this.blur ? (this.blur(), !1) : b
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return m.nodeName(this,
                        "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : b
                },
                _default: function(a) {
                    return m.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    a.result !== b && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, d, e, b) {
            a = m.extend(new m.Event, e, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            b ? m.event.trigger(a, null, d) : m.event.dispatch.call(d, a);
            a.isDefaultPrevented() && e.preventDefault()
        }
    };
    m.removeEvent = H.removeEventListener ? function(a, d, e) {
        a.removeEventListener && a.removeEventListener(d,
            e, !1)
    } : function(a, d, e) {
        d = "on" + d;
        a.detachEvent && (typeof a[d] === T && (a[d] = null), a.detachEvent(d, e))
    };
    m.Event = function(a, d) {
        return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || !1 === a.returnValue || a.getPreventDefault && a.getPreventDefault() ? s : n) : this.type = a, d && m.extend(this, d), this.timeStamp = a && a.timeStamp || m.now(), this[m.expando] = !0, b) : new m.Event(a, d)
    };
    m.Event.prototype = {
        isDefaultPrevented: n,
        isPropagationStopped: n,
        isImmediatePropagationStopped: n,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = s;
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = s;
            a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = s;
            this.stopPropagation()
        }
    };
    m.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, d) {
        m.event.special[a] = {
            delegateType: d,
            bindType: d,
            handle: function(a) {
                var e,
                    b = a.relatedTarget,
                    c = a.handleObj;
                return (!b || b !== this && !m.contains(this, b)) && (a.type = c.origType, e = c.handler.apply(this, arguments), a.type = d), e
            }
        }
    });
    m.support.submitBubbles || (m.event.special.submit = {
        setup: function() {
            return m.nodeName(this, "form") ? !1 : (m.event.add(this, "click._submit keypress._submit", function(a) {
                    a = a.target;
                    (a = m.nodeName(a, "input") || m.nodeName(a, "button") ? a.form : b) && !m._data(a, "submitBubbles") && (m.event.add(a, "submit._submit", function(a) {
                        a._submit_bubble = !0
                    }), m._data(a, "submitBubbles", !0))
                }),
                b)
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            return m.nodeName(this, "form") ? !1 : (m.event.remove(this, "._submit"), b)
        }
    });
    m.support.changeBubbles || (m.event.special.change = {
        setup: function() {
            return Ga.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (m.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }), m.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1);
                m.event.simulate("change", this, a, !0)
            })), !1) : (m.event.add(this, "beforeactivate._change", function(a) {
                a = a.target;
                Ga.test(a.nodeName) && !m._data(a, "changeBubbles") && (m.event.add(a, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate("change", this.parentNode, a, !0)
                }), m._data(a, "changeBubbles", !0))
            }), b)
        },
        handle: function(a) {
            var d = a.target;
            return this !== d || a.isSimulated ||
                a.isTrigger || "radio" !== d.type && "checkbox" !== d.type ? a.handleObj.handler.apply(this, arguments) : b
        },
        teardown: function() {
            return m.event.remove(this, "._change"), !Ga.test(this.nodeName)
        }
    });
    m.support.focusinBubbles || m.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, d) {
        var e = 0,
            b = function(a) {
                m.event.simulate(d, a.target, m.event.fix(a), !0)
            };
        m.event.special[d] = {
            setup: function() {
                0 === e++ && H.addEventListener(a, b, !0)
            },
            teardown: function() {
                0 === --e && H.removeEventListener(a, b, !0)
            }
        }
    });
    m.fn.extend({
        on: function(a, d, e,
            c, k) {
            var f, q;
            if ("object" == typeof a) {
                "string" != typeof d && (e = e || d, d = b);
                for (f in a) this.on(f, d, e, a[f], k);
                return this
            }
            if (null == e && null == c ? (c = d, e = d = b) : null == c && ("string" == typeof d ? (c = e, e = b) : (c = e, e = d, d = b)), !1 === c) c = n;
            else if (!c) return this;
            return 1 === k && (q = c, c = function(a) {
                return m().off(a), q.apply(this, arguments)
            }, c.guid = q.guid || (q.guid = m.guid++)), this.each(function() {
                m.event.add(this, a, c, e, d)
            })
        },
        one: function(a, d, e, b) {
            return this.on(a, d, e, b, 1)
        },
        off: function(a, d, e) {
            var c, k;
            if (a && a.preventDefault && a.handleObj) return c =
                a.handleObj, m(a.delegateTarget).off(c.namespace ? c.origType + "." + c.namespace : c.origType, c.selector, c.handler), this;
            if ("object" == typeof a) {
                for (k in a) this.off(k, d, a[k]);
                return this
            }
            return (!1 === d || "function" == typeof d) && (e = d, d = b), !1 === e && (e = n), this.each(function() {
                m.event.remove(this, a, e, d)
            })
        },
        trigger: function(a, d) {
            return this.each(function() {
                m.event.trigger(a, d, this)
            })
        },
        triggerHandler: function(a, d) {
            var e = this[0];
            return e ? m.event.trigger(a, d, e, !0) : b
        }
    });
    var Ib = /^.[^:#\[\.,]*$/,
        Ob = /^(?:parents|prev(?:Until|All))/,
        rb = m.expr.match.needsContext,
        Pb = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    m.fn.extend({
        find: function(a) {
            var d, e = [],
                b = this,
                c = b.length;
            if ("string" != typeof a) return this.pushStack(m(a).filter(function() {
                for (d = 0; c > d; d++)
                    if (m.contains(b[d], this)) return !0
            }));
            for (d = 0; c > d; d++) m.find(a, b[d], e);
            return e = this.pushStack(1 < c ? m.unique(e) : e), e.selector = this.selector ? this.selector + " " + a : a, e
        },
        has: function(a) {
            var d, e = m(a, this),
                b = e.length;
            return this.filter(function() {
                for (d = 0; b > d; d++)
                    if (m.contains(this, e[d])) return !0
            })
        },
        not: function(a) {
            return this.pushStack(u(this, a || [], !0))
        },
        filter: function(a) {
            return this.pushStack(u(this, a || [], !1))
        },
        is: function(a) {
            return !!u(this, "string" == typeof a && rb.test(a) ? m(a) : a || [], !1).length
        },
        closest: function(a, d) {
            for (var e, b = 0, c = this.length, k = [], f = rb.test(a) || "string" != typeof a ? m(a, d || this.context) : 0; c > b; b++)
                for (e = this[b]; e && e !== d; e = e.parentNode)
                    if (11 > e.nodeType && (f ? -1 < f.index(e) : 1 === e.nodeType && m.find.matchesSelector(e, a))) {
                        k.push(e);
                        break
                    }
            return this.pushStack(1 < k.length ? m.unique(k) : k)
        },
        index: function(a) {
            return a ? "string" == typeof a ? m.inArray(this[0], m(a)) : m.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, d) {
            var e = "string" == typeof a ? m(a, d) : m.makeArray(a && a.nodeType ? [a] : a),
                e = m.merge(this.get(), e);
            return this.pushStack(m.unique(e))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });
    m.each({
        parent: function(a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null
        },
        parents: function(a) {
            return m.dir(a,
                "parentNode")
        },
        parentsUntil: function(a, d, e) {
            return m.dir(a, "parentNode", e)
        },
        next: function(a) {
            return w(a, "nextSibling")
        },
        prev: function(a) {
            return w(a, "previousSibling")
        },
        nextAll: function(a) {
            return m.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return m.dir(a, "previousSibling")
        },
        nextUntil: function(a, d, e) {
            return m.dir(a, "nextSibling", e)
        },
        prevUntil: function(a, d, e) {
            return m.dir(a, "previousSibling", e)
        },
        siblings: function(a) {
            return m.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return m.sibling(a.firstChild)
        },
        contents: function(a) {
            return m.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes)
        }
    }, function(a, d) {
        m.fn[a] = function(e, b) {
            var c = m.map(this, d, e);
            return "Until" !== a.slice(-5) && (b = e), b && "string" == typeof b && (c = m.filter(b, c)), 1 < this.length && (Pb[a] || (c = m.unique(c)), Ob.test(a) && (c = c.reverse())), this.pushStack(c)
        }
    });
    m.extend({
        filter: function(a, d, e) {
            var b = d[0];
            return e && (a = ":not(" + a + ")"), 1 === d.length && 1 === b.nodeType ? m.find.matchesSelector(b, a) ? [b] : [] : m.find.matches(a, m.grep(d,
                function(a) {
                    return 1 === a.nodeType
                }))
        },
        dir: function(a, d, e) {
            var c = [];
            for (a = a[d]; a && 9 !== a.nodeType && (e === b || 1 !== a.nodeType || !m(a).is(e));) 1 === a.nodeType && c.push(a), a = a[d];
            return c
        },
        sibling: function(a, d) {
            for (var e = []; a; a = a.nextSibling) 1 === a.nodeType && a !== d && e.push(a);
            return e
        }
    });
    var nb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Qb = / jQuery\d+="(?:null|\d+)"/g,
        sb = RegExp("<(?:" + nb + ")[\\s/>]",
            "i"),
        gb = /^\s+/,
        tb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        ub = /<([\w:]+)/,
        vb = /<tbody/i,
        Rb = /<|&#?\w+;/,
        Sb = /<(?:script|style|link)/i,
        Xa = /^(?:checkbox|radio)$/i,
        Tb = /checked\s*(?:[^=]|=\s*.checked.)/i,
        wb = /^$|\/(?:java|ecma)script/i,
        Jb = /^true\/(.*)/,
        Ub = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        na = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: m.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        hb = d(H).appendChild(H.createElement("div"));
    na.optgroup = na.option;
    na.tbody = na.tfoot = na.colgroup = na.caption = na.thead;
    na.th = na.td;
    m.fn.extend({
        text: function(a) {
            return m.access(this, function(a) {
                    return a === b ? m.text(this) : this.empty().append((this[0] && this[0].ownerDocument || H).createTextNode(a))
                },
                null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || e(this, a).appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var d = e(this, a);
                    d.insertBefore(a, d.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments,
                function(a) {
                    this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                })
        },
        remove: function(a, d) {
            for (var e, b = a ? m.filter(a, this) : this, c = 0; null != (e = b[c]); c++) d || 1 !== e.nodeType || m.cleanData(J(e)), e.parentNode && (d && m.contains(e.ownerDocument, e) && t(J(e, "script")), e.parentNode.removeChild(e));
            return this
        },
        empty: function() {
            for (var a, d = 0; null != (a = this[d]); d++) {
                for (1 === a.nodeType && m.cleanData(J(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
                a.options && m.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        },
        clone: function(a, d) {
            return a = null == a ? !1 : a, d = null == d ? a : d, this.map(function() {
                return m.clone(this, a, d)
            })
        },
        html: function(a) {
            return m.access(this, function(a) {
                var d = this[0] || {},
                    e = 0,
                    c = this.length;
                if (a === b) return 1 === d.nodeType ? d.innerHTML.replace(Qb, "") : b;
                if (!("string" != typeof a || Sb.test(a) || !m.support.htmlSerialize && sb.test(a) || !m.support.leadingWhitespace && gb.test(a) || na[(ub.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(tb, "<$1></$2>");
                    try {
                        for (; c > e; e++) d = this[e] || {}, 1 === d.nodeType && (m.cleanData(J(d, !1)), d.innerHTML = a);
                        d = 0
                    } catch (k) {}
                }
                d && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = m.map(this, function(a) {
                    return [a.nextSibling, a.parentNode]
                }),
                d = 0;
            return this.domManip(arguments, function(e) {
                var b = a[d++],
                    c = a[d++];
                c && (b && b.parentNode !== c && (b = this.nextSibling), m(this).remove(), c.insertBefore(e, b))
            }, !0), d ? this : this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, d, e) {
            a = ua.apply([], a);
            var b, c, f, g, h = 0,
                t = this.length,
                r = this,
                n = t - 1,
                x = a[0],
                p = m.isFunction(x);
            if (p || !(1 >= t || "string" != typeof x || m.support.checkClone) && Tb.test(x)) return this.each(function(b) {
                var c = r.eq(b);
                p && (a[0] = x.call(this, b, c.html()));
                c.domManip(a, d, e)
            });
            if (t && (g = m.buildFragment(a, this[0].ownerDocument, !1, !e && this), b = g.firstChild, 1 === g.childNodes.length && (g = b), b)) {
                f = m.map(J(g, "script"), k);
                for (c = f.length; t > h; h++) b = g, h !== n && (b = m.clone(b, !0, !0), c && m.merge(f, J(b, "script"))), d.call(this[h], b, h);
                if (c)
                    for (g = f[f.length - 1].ownerDocument, m.map(f, q), h = 0; c > h; h++) b = f[h], wb.test(b.type || "") && !m._data(b,
                        "globalEval") && m.contains(g, b) && (b.src ? m._evalUrl(b.src) : m.globalEval((b.text || b.textContent || b.innerHTML || "").replace(Ub, "")));
                g = b = null
            }
            return this
        }
    });
    m.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, d) {
        m.fn[a] = function(a) {
            for (var e = 0, b = [], c = m(a), k = c.length - 1; k >= e; e++) a = e === k ? this : this.clone(!0), m(c[e])[d](a), La.apply(b, a.get());
            return this.pushStack(b)
        }
    });
    m.extend({
        clone: function(a, d, e) {
            var b, c, f, g, h, r = m.contains(a.ownerDocument,
                a);
            if (m.support.html5Clone || m.isXMLDoc(a) || !sb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (hb.innerHTML = a.outerHTML, hb.removeChild(f = hb.firstChild)), !(m.support.noCloneEvent && m.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || m.isXMLDoc(a)))
                for (b = J(f), h = J(a), g = 0; null != (c = h[g]); ++g)
                    if (b[g]) {
                        var n = b[g],
                            p = void 0,
                            u = void 0,
                            s = void 0;
                        if (1 === n.nodeType) {
                            if (p = n.nodeName.toLowerCase(), !m.support.noCloneEvent && n[m.expando]) {
                                s = m._data(n);
                                for (u in s.events) m.removeEvent(n, u, s.handle);
                                n.removeAttribute(m.expando)
                            }
                            "script" ===
                                p && n.text !== c.text ? (k(n).text = c.text, q(n)) : "object" === p ? (n.parentNode && (n.outerHTML = c.outerHTML), m.support.html5Clone && c.innerHTML && !m.trim(n.innerHTML) && (n.innerHTML = c.innerHTML)) : "input" === p && Xa.test(c.type) ? (n.defaultChecked = n.checked = c.checked, n.value !== c.value && (n.value = c.value)) : "option" === p ? n.defaultSelected = n.selected = c.defaultSelected : ("input" === p || "textarea" === p) && (n.defaultValue = c.defaultValue)
                        }
                    }
            if (d)
                if (e)
                    for (h = h || J(a), b = b || J(f), g = 0; null != (c = h[g]); g++) x(c, b[g]);
                else x(a, f);
            return b = J(f,
                "script"), 0 < b.length && t(b, !r && J(a, "script")), f
        },
        buildFragment: function(a, e, b, c) {
            for (var k, f, q, g, h, r, n, x = a.length, p = d(e), u = [], s = 0; x > s; s++)
                if (f = a[s], f || 0 === f)
                    if ("object" === m.type(f)) m.merge(u, f.nodeType ? [f] : f);
                    else if (Rb.test(f)) {
                g = g || p.appendChild(e.createElement("div"));
                h = (ub.exec(f) || ["", ""])[1].toLowerCase();
                n = na[h] || na._default;
                g.innerHTML = n[1] + f.replace(tb, "<$1></$2>") + n[2];
                for (k = n[0]; k--;) g = g.lastChild;
                if (!m.support.leadingWhitespace && gb.test(f) && u.push(e.createTextNode(gb.exec(f)[0])), !m.support.tbody)
                    for (k =
                        (f = "table" !== h || vb.test(f) ? "<table>" !== n[1] || vb.test(f) ? 0 : g : g.firstChild) && f.childNodes.length; k--;) m.nodeName(r = f.childNodes[k], "tbody") && !r.childNodes.length && f.removeChild(r);
                m.merge(u, g.childNodes);
                for (g.textContent = ""; g.firstChild;) g.removeChild(g.firstChild);
                g = p.lastChild
            } else u.push(e.createTextNode(f));
            g && p.removeChild(g);
            m.support.appendChecked || m.grep(J(u, "input"), F);
            for (s = 0; f = u[s++];)
                if ((!c || -1 === m.inArray(f, c)) && (q = m.contains(f.ownerDocument, f), g = J(p.appendChild(f), "script"), q && t(g), b))
                    for (k =
                        0; f = g[k++];) wb.test(f.type || "") && b.push(f);
            return p
        },
        cleanData: function(a, d) {
            for (var e, b, c, k, f = 0, g = m.expando, q = m.cache, h = m.support.deleteExpando, t = m.event.special; null != (e = a[f]); f++)
                if ((d || m.acceptData(e)) && (c = e[g], k = c && q[c])) {
                    if (k.events)
                        for (b in k.events) t[b] ? m.event.remove(e, b) : m.removeEvent(e, b, k.handle);
                    q[c] && (delete q[c], h ? delete e[g] : typeof e.removeAttribute !== T ? e.removeAttribute(g) : e[g] = null, ca.push(c))
                }
        },
        _evalUrl: function(a) {
            return m.ajax({
                url: a,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    });
    m.fn.extend({
        wrapAll: function(a) {
            if (m.isFunction(a)) return this.each(function(d) {
                m(this).wrapAll(a.call(this, d))
            });
            if (this[0]) {
                var d = m(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && d.insertBefore(this[0]);
                d.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return m.isFunction(a) ? this.each(function(d) {
                m(this).wrapInner(a.call(this, d))
            }) : this.each(function() {
                var d = m(this),
                    e =
                    d.contents();
                e.length ? e.wrapAll(a) : d.append(a)
            })
        },
        wrap: function(a) {
            var d = m.isFunction(a);
            return this.each(function(e) {
                m(this).wrapAll(d ? a.call(this, e) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                m.nodeName(this, "body") || m(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var Ja, ya, za, ib = /alpha\([^)]*\)/i,
        Vb = /opacity\s*=\s*([^)]*)/,
        Wb = /^(top|right|bottom|left)$/,
        Xb = /^(none|table(?!-c[ea]).+)/,
        xb = /^margin/,
        Kb = RegExp("^(" + va + ")(.*)$", "i"),
        Ra = RegExp("^(" + va + ")(?!px)[a-z%]+$", "i"),
        Yb = RegExp("^([+-])=(" +
            va + ")", "i"),
        pb = {
            BODY: "block"
        },
        Zb = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        yb = {
            letterSpacing: 0,
            fontWeight: 400
        },
        xa = ["Top", "Right", "Bottom", "Left"],
        ob = ["Webkit", "O", "Moz", "ms"];
    m.fn.extend({
        css: function(a, d) {
            return m.access(this, function(a, d, e) {
                var c, k = {},
                    f = 0;
                if (m.isArray(d)) {
                    c = ya(a);
                    for (e = d.length; e > f; f++) k[d[f]] = m.css(a, d[f], !1, c);
                    return k
                }
                return e !== b ? m.style(a, d, e) : m.css(a, d)
            }, a, d, 1 < arguments.length)
        },
        show: function() {
            return Y(this, !0)
        },
        hide: function() {
            return Y(this)
        },
        toggle: function(a) {
            return "boolean" ==
                typeof a ? a ? this.show() : this.hide() : this.each(function() {
                    K(this) ? m(this).show() : m(this).hide()
                })
        }
    });
    m.extend({
        cssHooks: {
            opacity: {
                get: function(a, d) {
                    if (d) {
                        var e = za(a, "opacity");
                        return "" === e ? "1" : e
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": m.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, d, e, c) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var k, f, g, q = m.camelCase(d),
                    h = a.style;
                if (d =
                    m.cssProps[q] || (m.cssProps[q] = D(h, q)), g = m.cssHooks[d] || m.cssHooks[q], e === b) return g && "get" in g && (k = g.get(a, !1, c)) !== b ? k : h[d];
                if (f = typeof e, "string" === f && (k = Yb.exec(e)) && (e = (k[1] + 1) * k[2] + parseFloat(m.css(a, d)), f = "number"), !(null == e || "number" === f && isNaN(e) || ("number" !== f || m.cssNumber[q] || (e += "px"), m.support.clearCloneStyle || "" !== e || 0 !== d.indexOf("background") || (h[d] = "inherit"), g && "set" in g && (e = g.set(a, e, c)) === b))) try {
                    h[d] = e
                } catch (t) {}
            }
        },
        css: function(a, d, e, c) {
            var k, f, g, q = m.camelCase(d);
            return d = m.cssProps[q] ||
                (m.cssProps[q] = D(a.style, q)), g = m.cssHooks[d] || m.cssHooks[q], g && "get" in g && (f = g.get(a, !0, e)), f === b && (f = za(a, d, c)), "normal" === f && d in yb && (f = yb[d]), "" === e || e ? (k = parseFloat(f), !0 === e || m.isNumeric(k) ? k || 0 : f) : f
        }
    });
    a.getComputedStyle ? (ya = function(d) {
        return a.getComputedStyle(d, null)
    }, za = function(a, d, e) {
        var c, k, f, g = (e = e || ya(a)) ? e.getPropertyValue(d) || e[d] : b,
            q = a.style;
        return e && ("" !== g || m.contains(a.ownerDocument, a) || (g = m.style(a, d)), Ra.test(g) && xb.test(d) && (c = q.width, k = q.minWidth, f = q.maxWidth, q.minWidth =
            q.maxWidth = q.width = g, g = e.width, q.width = c, q.minWidth = k, q.maxWidth = f)), g
    }) : H.documentElement.currentStyle && (ya = function(a) {
        return a.currentStyle
    }, za = function(a, d, e) {
        var c, k, f;
        e = (e = e || ya(a)) ? e[d] : b;
        var g = a.style;
        return null == e && g && g[d] && (e = g[d]), Ra.test(e) && !Wb.test(d) && (c = g.left, k = a.runtimeStyle, f = k && k.left, f && (k.left = a.currentStyle.left), g.left = "fontSize" === d ? "1em" : e, e = g.pixelLeft + "px", g.left = c, f && (k.left = f)), "" === e ? "auto" : e
    });
    m.each(["height", "width"], function(a, d) {
        m.cssHooks[d] = {
            get: function(a, e,
                c) {
                return e ? 0 === a.offsetWidth && Xb.test(m.css(a, "display")) ? m.swap(a, Zb, function() {
                    return y(a, d, c)
                }) : y(a, d, c) : b
            },
            set: function(a, e, b) {
                var c = b && ya(a);
                return U(a, e, b ? O(a, d, b, m.support.boxSizing && "border-box" === m.css(a, "boxSizing", !1, c), c) : 0)
            }
        }
    });
    m.support.opacity || (m.cssHooks.opacity = {
        get: function(a, d) {
            return Vb.test((d && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : d ? "1" : ""
        },
        set: function(a, d) {
            var e = a.style,
                b = a.currentStyle,
                c = m.isNumeric(d) ? "alpha(opacity=" + 100 *
                d + ")" : "",
                k = b && b.filter || e.filter || "";
            e.zoom = 1;
            (1 <= d || "" === d) && "" === m.trim(k.replace(ib, "")) && e.removeAttribute && (e.removeAttribute("filter"), "" === d || b && !b.filter) || (e.filter = ib.test(k) ? k.replace(ib, c) : k + " " + c)
        }
    });
    m(function() {
        m.support.reliableMarginRight || (m.cssHooks.marginRight = {
            get: function(a, d) {
                return d ? m.swap(a, {
                    display: "inline-block"
                }, za, [a, "marginRight"]) : b
            }
        });
        !m.support.pixelPosition && m.fn.position && m.each(["top", "left"], function(a, d) {
            m.cssHooks[d] = {
                get: function(a, e) {
                    return e ? (e = za(a, d), Ra.test(e) ?
                        m(a).position()[d] + "px" : e) : b
                }
            }
        })
    });
    m.expr && m.expr.filters && (m.expr.filters.hidden = function(a) {
        return 0 >= a.offsetWidth && 0 >= a.offsetHeight || !m.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || m.css(a, "display"))
    }, m.expr.filters.visible = function(a) {
        return !m.expr.filters.hidden(a)
    });
    m.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, d) {
        m.cssHooks[a + d] = {
            expand: function(e) {
                var b = 0,
                    c = {};
                for (e = "string" == typeof e ? e.split(" ") : [e]; 4 > b; b++) c[a + xa[b] + d] = e[b] || e[b - 2] || e[0];
                return c
            }
        };
        xb.test(a) ||
            (m.cssHooks[a + d].set = U)
    });
    var $b = /%20/g,
        Lb = /\[\]$/,
        zb = /\r?\n/g,
        ac = /^(?:submit|button|image|reset|file)$/i,
        bc = /^(?:input|select|textarea|keygen)/i;
    m.fn.extend({
        serialize: function() {
            return m.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = m.prop(this, "elements");
                return a ? m.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !m(this).is(":disabled") && bc.test(this.nodeName) && !ac.test(a) && (this.checked || !Xa.test(a))
            }).map(function(a, d) {
                var e =
                    m(this).val();
                return null == e ? null : m.isArray(e) ? m.map(e, function(a) {
                    return {
                        name: d.name,
                        value: a.replace(zb, "\r\n")
                    }
                }) : {
                    name: d.name,
                    value: e.replace(zb, "\r\n")
                }
            }).get()
        }
    });
    m.param = function(a, d) {
        var e, c = [],
            k = function(a, d) {
                d = m.isFunction(d) ? d() : null == d ? "" : d;
                c[c.length] = encodeURIComponent(a) + "=" + encodeURIComponent(d)
            };
        if (d === b && (d = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(a)) m.each(a, function() {
            k(this.name, this.value)
        });
        else
            for (e in a) M(e, a[e], d, k);
        return c.join("&").replace($b,
            "+")
    };
    m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, d) {
        m.fn[d] = function(a, e) {
            return 0 < arguments.length ? this.on(d, null, a, e) : this.trigger(d)
        }
    });
    m.fn.extend({
        hover: function(a, d) {
            return this.mouseenter(a).mouseleave(d || a)
        },
        bind: function(a, d, e) {
            return this.on(a, null, d, e)
        },
        unbind: function(a, d) {
            return this.off(a, null, d)
        },
        delegate: function(a, d, e, b) {
            return this.on(d, a, e, b)
        },
        undelegate: function(a, d, e) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(d, a || "**", e)
        }
    });
    var Aa, fa, jb = m.now(),
        kb = /\?/,
        cc = /#.*$/,
        Ab = /([?&])_=[^&]*/,
        dc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        ec = /^(?:GET|HEAD)$/,
        fc = /^\/\//,
        Bb = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        Cb = m.fn.load,
        Db = {},
        Ya = {},
        Eb = "*/".concat("*");
    try {
        fa = R.href
    } catch (jc) {
        fa = H.createElement("a"), fa.href = "", fa = fa.href
    }
    Aa = Bb.exec(fa.toLowerCase()) || [];
    m.fn.load = function(a, d, e) {
        if ("string" !=
            typeof a && Cb) return Cb.apply(this, arguments);
        var c, k, f, g = this,
            q = a.indexOf(" ");
        return 0 <= q && (c = a.slice(q, a.length), a = a.slice(0, q)), m.isFunction(d) ? (e = d, d = b) : d && "object" == typeof d && (f = "POST"), 0 < g.length && m.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: d
        }).done(function(a) {
            k = arguments;
            g.html(c ? m("<div>").append(m.parseHTML(a)).find(c) : a)
        }).complete(e && function(a, d) {
            g.each(e, k || [a.responseText, d, a])
        }), this
    };
    m.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, d) {
        m.fn[d] =
            function(a) {
                return this.on(d, a)
        }
    });
    m.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: fa,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Aa[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Eb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": m.parseJSON,
                "text xml": m.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, d) {
            return d ? V(V(a, m.ajaxSettings), d) : V(m.ajaxSettings, a)
        },
        ajaxPrefilter: N(Db),
        ajaxTransport: N(Ya),
        ajax: function(a, d) {
            function e(a, d, c, k) {
                var r, v, w, G, F = d;
                if (2 !== J) {
                    J = 2;
                    q && clearTimeout(q);
                    t = b;
                    g = k || "";
                    E.readyState = 0 < a ? 4 : 0;
                    k = 200 <= a && 300 > a || 304 === a;
                    if (c) {
                        w = n;
                        for (var A = E, Q, L, V, D, I = w.contents, X = w.dataTypes;
                            "*" === X[0];) X.shift(), L === b && (L = w.mimeType ||
                            A.getResponseHeader("Content-Type"));
                        if (L)
                            for (D in I)
                                if (I[D] && I[D].test(L)) {
                                    X.unshift(D);
                                    break
                                }
                        if (X[0] in c) V = X[0];
                        else {
                            for (D in c) {
                                if (!X[0] || w.converters[D + " " + X[0]]) {
                                    V = D;
                                    break
                                }
                                Q || (Q = D)
                            }
                            V = V || Q
                        }
                        w = V ? (V !== X[0] && X.unshift(V), c[V]) : b
                    }
                    var M;
                    a: {
                        c = n;
                        Q = w;
                        L = E;
                        V = k;
                        var z, P, N;
                        w = {};
                        A = c.dataTypes.slice();
                        if (A[1])
                            for (z in c.converters) w[z.toLowerCase()] = c.converters[z];
                        for (D = A.shift(); D;)
                            if (c.responseFields[D] && (L[c.responseFields[D]] = Q), !N && V && c.dataFilter && (Q = c.dataFilter(Q, c.dataType)), N = D, D = A.shift())
                                if ("*" ===
                                    D) D = N;
                                else if ("*" !== N && N !== D) {
                            if (z = w[N + " " + D] || w["* " + D], !z)
                                for (M in w)
                                    if (P = M.split(" "), P[1] === D && (z = w[N + " " + P[0]] || w["* " + P[0]])) {
                                        !0 === z ? z = w[M] : !0 !== w[M] && (D = P[0], A.unshift(P[1]));
                                        break
                                    }
                            if (!0 !== z)
                                if (z && c["throws"]) Q = z(Q);
                                else try {
                                    Q = z(Q)
                                } catch (C) {
                                    M = {
                                        state: "parsererror",
                                        error: z ? C : "No conversion from " + N + " to " + D
                                    };
                                    break a
                                }
                        }
                        M = {
                            state: "success",
                            data: Q
                        }
                    }
                    w = M;
                    k ? (n.ifModified && (G = E.getResponseHeader("Last-Modified"), G && (m.lastModified[f] = G), G = E.getResponseHeader("etag"), G && (m.etag[f] = G)), 204 === a || "HEAD" ===
                        n.type ? F = "nocontent" : 304 === a ? F = "notmodified" : (F = w.state, r = w.data, v = w.error, k = !v)) : (v = F, (a || !F) && (F = "error", 0 > a && (a = 0)));
                    E.status = a;
                    E.statusText = (d || F) + "";
                    k ? u.resolveWith(x, [r, F, E]) : u.rejectWith(x, [E, F, v]);
                    E.statusCode(la);
                    la = b;
                    h && p.trigger(k ? "ajaxSuccess" : "ajaxError", [E, n, k ? r : v]);
                    s.fireWith(x, [E, F]);
                    h && (p.trigger("ajaxComplete", [E, n]), --m.active || m.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof a && (d = a, a = b);
            d = d || {};
            var c, k, f, g, q, h, t, r, n = m.ajaxSetup({}, d),
                x = n.context || n,
                p = n.context && (x.nodeType || x.jquery) ?
                m(x) : m.event,
                u = m.Deferred(),
                s = m.Callbacks("once memory"),
                la = n.statusCode || {},
                v = {},
                w = {},
                J = 0,
                G = "canceled",
                E = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var d;
                        if (2 === J) {
                            if (!r)
                                for (r = {}; d = dc.exec(g);) r[d[1].toLowerCase()] = d[2];
                            d = r[a.toLowerCase()]
                        }
                        return null == d ? null : d
                    },
                    getAllResponseHeaders: function() {
                        return 2 === J ? g : null
                    },
                    setRequestHeader: function(a, d) {
                        var e = a.toLowerCase();
                        return J || (a = w[e] = w[e] || a, v[a] = d), this
                    },
                    overrideMimeType: function(a) {
                        return J || (n.mimeType = a), this
                    },
                    statusCode: function(a) {
                        var d;
                        if (a)
                            if (2 > J)
                                for (d in a) la[d] = [la[d], a[d]];
                            else E.always(a[E.status]);
                        return this
                    },
                    abort: function(a) {
                        a = a || G;
                        return t && t.abort(a), e(0, a), this
                    }
                };
            if (u.promise(E).complete = s.add, E.success = E.done, E.error = E.fail, n.url = ((a || n.url || fa) + "").replace(cc, "").replace(fc, Aa[1] + "//"), n.type = d.method || d.type || n.method || n.type, n.dataTypes = m.trim(n.dataType || "*").toLowerCase().match(B) || [""], null == n.crossDomain && (c = Bb.exec(n.url.toLowerCase()), n.crossDomain = !(!c || c[1] === Aa[1] && c[2] === Aa[2] && (c[3] || ("http:" === c[1] ? "80" :
                "443")) === (Aa[3] || ("http:" === Aa[1] ? "80" : "443")))), n.data && n.processData && "string" != typeof n.data && (n.data = m.param(n.data, n.traditional)), z(Db, n, d, E), 2 === J) return E;
            (h = n.global) && 0 === m.active++ && m.event.trigger("ajaxStart");
            n.type = n.type.toUpperCase();
            n.hasContent = !ec.test(n.type);
            f = n.url;
            n.hasContent || (n.data && (f = n.url += (kb.test(f) ? "&" : "?") + n.data, delete n.data), !1 === n.cache && (n.url = Ab.test(f) ? f.replace(Ab, "$1_=" + jb++) : f + (kb.test(f) ? "&" : "?") + "_=" + jb++));
            n.ifModified && (m.lastModified[f] && E.setRequestHeader("If-Modified-Since",
                m.lastModified[f]), m.etag[f] && E.setRequestHeader("If-None-Match", m.etag[f]));
            (n.data && n.hasContent && !1 !== n.contentType || d.contentType) && E.setRequestHeader("Content-Type", n.contentType);
            E.setRequestHeader("Accept", n.dataTypes[0] && n.accepts[n.dataTypes[0]] ? n.accepts[n.dataTypes[0]] + ("*" !== n.dataTypes[0] ? ", " + Eb + "; q=0.01" : "") : n.accepts["*"]);
            for (k in n.headers) E.setRequestHeader(k, n.headers[k]);
            if (n.beforeSend && (!1 === n.beforeSend.call(x, E, n) || 2 === J)) return E.abort();
            G = "abort";
            for (k in {
                success: 1,
                error: 1,
                complete: 1
            }) E[k](n[k]);
            if (t = z(Ya, n, d, E)) {
                E.readyState = 1;
                h && p.trigger("ajaxSend", [E, n]);
                n.async && 0 < n.timeout && (q = setTimeout(function() {
                    E.abort("timeout")
                }, n.timeout));
                try {
                    J = 1, t.send(v, e)
                } catch (F) {
                    if (!(2 > J)) throw F;
                    e(-1, F)
                }
            } else e(-1, "No Transport");
            return E
        },
        getJSON: function(a, d, e) {
            return m.get(a, d, e, "json")
        },
        getScript: function(a, d) {
            return m.get(a, b, d, "script")
        }
    });
    m.each(["get", "post"], function(a, d) {
        m[d] = function(a, e, c, k) {
            return m.isFunction(e) && (k = k || c, c = e, e = b), m.ajax({
                url: a,
                type: d,
                dataType: k,
                data: e,
                success: c
            })
        }
    });
    m.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return m.globalEval(a), a
            }
        }
    });
    m.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1);
        a.crossDomain && (a.type = "GET", a.global = !1)
    });
    m.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var d, e = H.head || m("head")[0] || H.documentElement;
            return {
                send: function(b, c) {
                    d = H.createElement("script");
                    d.async = !0;
                    a.scriptCharset && (d.charset = a.scriptCharset);
                    d.src = a.url;
                    d.onload = d.onreadystatechange = function(a, e) {
                        (e || !d.readyState || /loaded|complete/.test(d.readyState)) && (d.onload = d.onreadystatechange = null, d.parentNode && d.parentNode.removeChild(d), d = null, e || c(200, "success"))
                    };
                    e.insertBefore(d, e.firstChild)
                },
                abort: function() {
                    d && d.onload(b, !0)
                }
            }
        }
    });
    var Fb = [],
        lb = /(=)\?(?=&|$)|\?\?/;
    m.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Fb.pop() || m.expando + "_" + jb++;
            return this[a] = !0, a
        }
    });
    m.ajaxPrefilter("json jsonp",
        function(d, e, c) {
            var k, f, g, q = !1 !== d.jsonp && (lb.test(d.url) ? "url" : "string" == typeof d.data && !(d.contentType || "").indexOf("application/x-www-form-urlencoded") && lb.test(d.data) && "data");
            return q || "jsonp" === d.dataTypes[0] ? (k = d.jsonpCallback = m.isFunction(d.jsonpCallback) ? d.jsonpCallback() : d.jsonpCallback, q ? d[q] = d[q].replace(lb, "$1" + k) : !1 !== d.jsonp && (d.url += (kb.test(d.url) ? "&" : "?") + d.jsonp + "=" + k), d.converters["script json"] = function() {
                    return g || m.error(k + " was not called"), g[0]
                }, d.dataTypes[0] = "json", f = a[k],
                a[k] = function() {
                    g = arguments
                }, c.always(function() {
                    a[k] = f;
                    d[k] && (d.jsonpCallback = e.jsonpCallback, Fb.push(k));
                    g && m.isFunction(f) && f(g[0]);
                    g = f = b
                }), "script") : b
        });
    var Ia, Oa, gc = 0,
        mb = a.ActiveXObject && function() {
            for (var a in Ia) Ia[a](b, !0)
        };
    m.ajaxSettings.xhr = a.ActiveXObject ? function() {
        var d;
        if (!(d = !this.isLocal && L())) a: {
            try {
                d = new a.ActiveXObject("Microsoft.XMLHTTP");
                break a
            } catch (e) {}
            d = void 0
        }
        return d
    } : L;
    Oa = m.ajaxSettings.xhr();
    m.support.cors = !!Oa && "withCredentials" in Oa;
    (Oa = m.support.ajax = !!Oa) && m.ajaxTransport(function(d) {
        if (!d.crossDomain ||
            m.support.cors) {
            var e;
            return {
                send: function(c, k) {
                    var f, g, q = d.xhr();
                    if (d.username ? q.open(d.type, d.url, d.async, d.username, d.password) : q.open(d.type, d.url, d.async), d.xhrFields)
                        for (g in d.xhrFields) q[g] = d.xhrFields[g];
                    d.mimeType && q.overrideMimeType && q.overrideMimeType(d.mimeType);
                    d.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (g in c) q.setRequestHeader(g, c[g])
                    } catch (h) {}
                    q.send(d.hasContent && d.data || null);
                    e = function(a, c) {
                        var g, h, t, n;
                        try {
                            if (e && (c || 4 === q.readyState))
                                if (e =
                                    b, f && (q.onreadystatechange = m.noop, mb && delete Ia[f]), c) 4 !== q.readyState && q.abort();
                                else {
                                    n = {};
                                    g = q.status;
                                    h = q.getAllResponseHeaders();
                                    "string" == typeof q.responseText && (n.text = q.responseText);
                                    try {
                                        t = q.statusText
                                    } catch (r) {
                                        t = ""
                                    }
                                    g || !d.isLocal || d.crossDomain ? 1223 === g && (g = 204) : g = n.text ? 200 : 404
                                }
                        } catch (x) {
                            c || k(-1, x)
                        }
                        n && k(g, t, n, h)
                    };
                    d.async ? 4 === q.readyState ? setTimeout(e) : (f = ++gc, mb && (Ia || (Ia = {}, m(a).unload(mb)), Ia[f] = e), q.onreadystatechange = e) : e()
                },
                abort: function() {
                    e && e(b, !0)
                }
            }
        }
    });
    var Ba, Va, hc = /^(?:toggle|show|hide)$/,
        Gb = RegExp("^(?:([+-])=|)(" + va + ")([a-z%]*)$", "i"),
        ic = /queueHooks$/,
        Sa = [
            function(a, d, e) {
                var b, c, k, f, g, q = this,
                    h = {},
                    t = a.style,
                    n = a.nodeType && K(a),
                    r = m._data(a, "fxshow");
                e.queue || (f = m._queueHooks(a, "fx"), null == f.unqueued && (f.unqueued = 0, g = f.empty.fire, f.empty.fire = function() {
                    f.unqueued || g()
                }), f.unqueued++, q.always(function() {
                    q.always(function() {
                        f.unqueued--;
                        m.queue(a, "fx").length || f.empty.fire()
                    })
                }));
                1 === a.nodeType && ("height" in d || "width" in d) && (e.overflow = [t.overflow, t.overflowX, t.overflowY], "inline" ===
                    m.css(a, "display") && "none" === m.css(a, "float") && (m.support.inlineBlockNeedsLayout && "inline" !== I(a.nodeName) ? t.zoom = 1 : t.display = "inline-block"));
                e.overflow && (t.overflow = "hidden", m.support.shrinkWrapBlocks || q.always(function() {
                    t.overflow = e.overflow[0];
                    t.overflowX = e.overflow[1];
                    t.overflowY = e.overflow[2]
                }));
                for (b in d)(c = d[b], hc.exec(c)) && (delete d[b], k = k || "toggle" === c, c !== (n ? "hide" : "show")) && (h[b] = r && r[b] || m.style(a, b));
                if (!m.isEmptyObject(h))
                    for (b in r ? "hidden" in r && (n = r.hidden) : r = m._data(a, "fxshow", {}), k && (r.hidden = !n), n ? m(a).show() : q.done(function() {
                        m(a).hide()
                    }), q.done(function() {
                        var d;
                        m._removeData(a, "fxshow");
                        for (d in h) m.style(a, d, h[d])
                    }), h) d = G(n ? r[b] : 0, b, q), b in r || (r[b] = d.start, n && (d.end = d.start, d.start = "width" === b || "height" === b ? 1 : 0))
            }
        ],
        Ka = {
            "*": [
                function(a, d) {
                    var e = this.createTween(a, d),
                        b = e.cur(),
                        c = Gb.exec(d),
                        k = c && c[3] || (m.cssNumber[a] ? "" : "px"),
                        f = (m.cssNumber[a] || "px" !== k && +b) && Gb.exec(m.css(e.elem, a)),
                        g = 1,
                        q = 20;
                    if (f && f[3] !== k) {
                        k = k || f[3];
                        c = c || [];
                        f = +b || 1;
                        do g = g || ".5", f /= g, m.style(e.elem,
                            a, f + k); while (g !== (g = e.cur() / b) && 1 !== g && --q)
                    }
                    return c && (f = e.start = +f || +b || 0, e.unit = k, e.end = c[1] ? f + (c[1] + 1) * c[2] : +c[2]), e
                }
            ]
        };
    m.Animation = m.extend(da, {
        tweener: function(a, d) {
            m.isFunction(a) ? (d = a, a = ["*"]) : a = a.split(" ");
            for (var e, b = 0, c = a.length; c > b; b++) e = a[b], Ka[e] = Ka[e] || [], Ka[e].unshift(d)
        },
        prefilter: function(a, d) {
            d ? Sa.unshift(a) : Sa.push(a)
        }
    });
    m.Tween = P;
    P.prototype = {
        constructor: P,
        init: function(a, d, e, b, c, k) {
            this.elem = a;
            this.prop = e;
            this.easing = c || "swing";
            this.options = d;
            this.start = this.now = this.cur();
            this.end =
                b;
            this.unit = k || (m.cssNumber[e] ? "" : "px")
        },
        cur: function() {
            var a = P.propHooks[this.prop];
            return a && a.get ? a.get(this) : P.propHooks._default.get(this)
        },
        run: function(a) {
            var d, e = P.propHooks[this.prop];
            return this.pos = d = this.options.duration ? m.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * d + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), e && e.set ? e.set(this) : P.propHooks._default.set(this), this
        }
    };
    P.prototype.init.prototype =
        P.prototype;
    P.propHooks = {
        _default: {
            get: function(a) {
                var d;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (d = m.css(a.elem, a.prop, ""), d && "auto" !== d ? d : 0) : a.elem[a.prop]
            },
            set: function(a) {
                m.fx.step[a.prop] ? m.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[m.cssProps[a.prop]] || m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    };
    P.propHooks.scrollTop = P.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    };
    m.each(["toggle", "show", "hide"], function(a, d) {
        var e = m.fn[d];
        m.fn[d] = function(a, b, c) {
            return null == a || "boolean" == typeof a ? e.apply(this, arguments) : this.animate(ha(d, !0), a, b, c)
        }
    });
    m.fn.extend({
        fadeTo: function(a, d, e, b) {
            return this.filter(K).css("opacity", 0).show().end().animate({
                opacity: d
            }, a, e, b)
        },
        animate: function(a, d, e, b) {
            var c = m.isEmptyObject(a),
                k = m.speed(d, e, b);
            d = function() {
                var d = da(this, m.extend({}, a), k);
                (c || m._data(this, "finish")) && d.stop(!0)
            };
            return d.finish = d, c || !1 === k.queue ? this.each(d) : this.queue(k.queue,
                d)
        },
        stop: function(a, d, e) {
            var c = function(a) {
                var d = a.stop;
                delete a.stop;
                d(e)
            };
            return "string" != typeof a && (e = d, d = a, a = b), d && !1 !== a && this.queue(a || "fx", []), this.each(function() {
                var d = !0,
                    b = null != a && a + "queueHooks",
                    k = m.timers,
                    f = m._data(this);
                if (b) f[b] && f[b].stop && c(f[b]);
                else
                    for (b in f) f[b] && f[b].stop && ic.test(b) && c(f[b]);
                for (b = k.length; b--;) k[b].elem !== this || null != a && k[b].queue !== a || (k[b].anim.stop(e), d = !1, k.splice(b, 1));
                !d && e || m.dequeue(this, a)
            })
        },
        finish: function(a) {
            return !1 !== a && (a = a || "fx"), this.each(function() {
                var d,
                    e = m._data(this),
                    b = e[a + "queue"];
                d = e[a + "queueHooks"];
                var c = m.timers,
                    k = b ? b.length : 0;
                e.finish = !0;
                m.queue(this, a, []);
                d && d.stop && d.stop.call(this, !0);
                for (d = c.length; d--;) c[d].elem === this && c[d].queue === a && (c[d].anim.stop(!0), c.splice(d, 1));
                for (d = 0; k > d; d++) b[d] && b[d].finish && b[d].finish.call(this);
                delete e.finish
            })
        }
    });
    m.each({
        slideDown: ha("show"),
        slideUp: ha("hide"),
        slideToggle: ha("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, d) {
        m.fn[a] = function(a, e, b) {
            return this.animate(d,
                a, e, b)
        }
    });
    m.speed = function(a, d, e) {
        var b = a && "object" == typeof a ? m.extend({}, a) : {
            complete: e || !e && d || m.isFunction(a) && a,
            duration: a,
            easing: e && d || d && !m.isFunction(d) && d
        };
        return b.duration = m.fx.off ? 0 : "number" == typeof b.duration ? b.duration : b.duration in m.fx.speeds ? m.fx.speeds[b.duration] : m.fx.speeds._default, (null == b.queue || !0 === b.queue) && (b.queue = "fx"), b.old = b.complete, b.complete = function() {
            m.isFunction(b.old) && b.old.call(this);
            b.queue && m.dequeue(this, b.queue)
        }, b
    };
    m.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return 0.5 - Math.cos(a * Math.PI) / 2
        }
    };
    m.timers = [];
    m.fx = P.prototype.init;
    m.fx.tick = function() {
        var a, d = m.timers,
            e = 0;
        for (Ba = m.now(); d.length > e; e++) a = d[e], a() || d[e] !== a || d.splice(e--, 1);
        d.length || m.fx.stop();
        Ba = b
    };
    m.fx.timer = function(a) {
        a() && m.timers.push(a) && m.fx.start()
    };
    m.fx.interval = 13;
    m.fx.start = function() {
        Va || (Va = setInterval(m.fx.tick, m.fx.interval))
    };
    m.fx.stop = function() {
        clearInterval(Va);
        Va = null
    };
    m.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    m.fx.step = {};
    m.expr && m.expr.filters &&
        (m.expr.filters.animated = function(a) {
        return m.grep(m.timers, function(d) {
            return a === d.elem
        }).length
    });
    m.fn.offset = function(a) {
        if (arguments.length) return a === b ? this : this.each(function(d) {
            m.offset.setOffset(this, a, d)
        });
        var d, e, c = {
                top: 0,
                left: 0
            },
            k = this[0],
            f = k && k.ownerDocument;
        if (f) return d = f.documentElement, m.contains(d, k) ? (typeof k.getBoundingClientRect !== T && (c = k.getBoundingClientRect()), e = ka(f), {
            top: c.top + (e.pageYOffset || d.scrollTop) - (d.clientTop || 0),
            left: c.left + (e.pageXOffset || d.scrollLeft) - (d.clientLeft ||
                0)
        }) : c
    };
    m.offset = {
        setOffset: function(a, d, e) {
            var b = m.css(a, "position");
            "static" === b && (a.style.position = "relative");
            var c = m(a),
                k = c.offset(),
                f = m.css(a, "top"),
                g = m.css(a, "left"),
                q = {},
                h = {},
                t, n;
            ("absolute" === b || "fixed" === b) && -1 < m.inArray("auto", [f, g]) ? (h = c.position(), t = h.top, n = h.left) : (t = parseFloat(f) || 0, n = parseFloat(g) || 0);
            m.isFunction(d) && (d = d.call(a, e, k));
            null != d.top && (q.top = d.top - k.top + t);
            null != d.left && (q.left = d.left - k.left + n);
            "using" in d ? d.using.call(a, q) : c.css(q)
        }
    };
    m.fn.extend({
        position: function() {
            if (this[0]) {
                var a,
                    d, e = {
                        top: 0,
                        left: 0
                    },
                    b = this[0];
                return "fixed" === m.css(b, "position") ? d = b.getBoundingClientRect() : (a = this.offsetParent(), d = this.offset(), m.nodeName(a[0], "html") || (e = a.offset()), e.top += m.css(a[0], "borderTopWidth", !0), e.left += m.css(a[0], "borderLeftWidth", !0)), {
                    top: d.top - e.top - m.css(b, "marginTop", !0),
                    left: d.left - e.left - m.css(b, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || ta; a && !m.nodeName(a, "html") && "static" === m.css(a, "position");) a = a.offsetParent;
                return a ||
                    ta
            })
        }
    });
    m.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, d) {
        var e = /Y/.test(d);
        m.fn[a] = function(c) {
            return m.access(this, function(a, c, k) {
                var f = ka(a);
                return k === b ? f ? d in f ? f[d] : f.document.documentElement[c] : a[c] : (f ? f.scrollTo(e ? m(f).scrollLeft() : k, e ? k : m(f).scrollTop()) : a[c] = k, b)
            }, a, c, arguments.length, null)
        }
    });
    m.each({
        Height: "height",
        Width: "width"
    }, function(a, d) {
        m.each({
            padding: "inner" + a,
            content: d,
            "": "outer" + a
        }, function(e, c) {
            m.fn[c] = function(c, k) {
                var f = arguments.length && (e || "boolean" !=
                        typeof c),
                    g = e || (!0 === c || !0 === k ? "margin" : "border");
                return m.access(this, function(d, e, c) {
                    var k;
                    return m.isWindow(d) ? d.document.documentElement["client" + a] : 9 === d.nodeType ? (k = d.documentElement, Math.max(d.body["scroll" + a], k["scroll" + a], d.body["offset" + a], k["offset" + a], k["client" + a])) : c === b ? m.css(d, e, g) : m.style(d, e, c, g)
                }, d, f ? c : b, f, null)
            }
        })
    });
    m.fn.size = function() {
        return this.length
    };
    m.fn.andSelf = m.fn.addBack;
    "object" == typeof module && module && "object" == typeof module.exports ? module.exports = m : (a.jQuery = a.$ =
        m, "function" == typeof define && define.amd && define("jquery", [], function() {
            return m
        }))
})(window);
(function(a, b, c) {
    a.uaMatch = function(a) {
        a = a.toLowerCase();
        var b = /(opr)[\/]([\w.]+)/.exec(a) || /(chromium)[ \/]([\w.]+)/.exec(a) || /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || 0 <= a.indexOf("trident") && /(rv)(?::| )([\w.]+)/.exec(a) || 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
        a = /(ipad)/.exec(a) || /(iphone)/.exec(a) || /(android)/.exec(a) || [];
        return {
            browser: b[1] || "",
            version: b[2] || "0",
            platform: a[0] ||
                ""
        }
    };
    b = a.uaMatch(b.navigator.userAgent);
    c = {};
    if (c.name = b.browser) c[b.browser] = !0, c.version = b.version;
    b.platform && (c[b.platform] = !0);
    c.chrome || c.opr ? c.webkit = !0 : c.webkit && (c.safari = !0);
    c.rv && (c.msie = !0, c.name = "msie");
    c.opr && (c.opera = !0, c.name = "opera");
    a.browser = c
})(jQuery, window);
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,
        4))
})(navigator.userAgent || navigator.vendor || window.opera);
! function(a, b) {
    var c, h, f = a.document,
        p = a.navigator,
        g = a.setTimeout,
        r = a.encodeURIComponent,
        s = a.ActiveXObject,
        n = a.Error,
        v = a.Number.parseInt || a.parseInt,
        w = a.Number.parseFloat || a.parseFloat,
        u = a.Number.isNaN || a.isNaN,
        d = a.Math.round,
        e = a.Date.now,
        k = a.Object.keys,
        q = a.Object.defineProperty,
        t = a.Object.prototype.hasOwnProperty,
        x = a.Array.prototype.slice,
        J = function() {
            var d = function(a) {
                return a
            };
            if ("function" == typeof a.wrap && "function" == typeof a.unwrap) try {
                var e = f.createElement("div"),
                    b = a.unwrap(e);
                1 === e.nodeType &&
                    b && 1 === b.nodeType && (d = a.unwrap)
            } catch (c) {}
            return d
        }(),
        F = function(a) {
            return x.call(a, 0)
        },
        D = function() {
            var a, d, e, c, k, f = F(arguments),
                g = f[0] || {};
            a = 1;
            for (d = f.length; d > a; a++)
                if (null != (e = f[a]))
                    for (c in e) t.call(e, c) && (k = e[c], g !== k && k !== b && (g[c] = k));
            return g
        },
        K = function(a) {
            var d, e, b;
            if ("object" != typeof a || null == a) d = a;
            else if ("number" == typeof a.length)
                for (d = [], e = 0, b = a.length; b > e; e++) t.call(a, e) && (d[e] = K(a[e]));
            else
                for (e in d = {}, a) t.call(a, e) && (d[e] = K(a[e]));
            return d
        },
        Y = function(a, d) {
            if (a && 1 === a.nodeType &&
                a.ownerDocument && d && (1 === d.nodeType && d.ownerDocument && d.ownerDocument === a.ownerDocument || 9 === d.nodeType && !d.ownerDocument && d === a.ownerDocument)) {
                do {
                    if (a === d) return !0;
                    a = a.parentNode
                } while (a)
            }
            return !1
        },
        U = function(a) {
            var d;
            return "string" == typeof a && a && (a.split("#")[0].split("?"), d = a.slice(0, a.lastIndexOf("/") + 1)), d
        },
        O = function() {
            var a, d, e;
            if (f.currentScript && (a = f.currentScript.src)) return a;
            if (d = f.getElementsByTagName("script"), 1 === d.length) return d[0].src || b;
            if ("readyState" in d[0])
                for (e = d.length; e--;)
                    if ("interactive" ===
                        d[e].readyState && (a = d[e].src)) return a;
            var c;
            if ("loading" === f.readyState && (a = d[d.length - 1].src)) c = a;
            else {
                var k;
                try {
                    throw new n;
                } catch (g) {
                    d = g
                }
                if (d && !(k = d.sourceURL) && !(k = d.fileName)) {
                    k = d.stack;
                    var q;
                    k = ("string" == typeof k && k && (q = k.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/), q && q[1] ? c = q[1] : (q = k.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/), q && q[1] && (c = q[1]))), c)
                }
                c = (a = k) ? a : b
            }
            return c
        },
        y = {
            bridge: null,
            version: "0.0.0",
            pluginType: "unknown",
            disabled: null,
            outdated: null,
            unavailable: null,
            deactivated: null,
            overdue: null,
            ready: null
        },
        I = {},
        C = {},
        M = null,
        N = {
            ready: "Flash communication is established",
            error: {
                "flash-disabled": "Flash is disabled or not installed",
                "flash-outdated": "Flash is too outdated to support ZeroClipboard",
                "flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript",
                "flash-deactivated": "Flash is too outdated for your browser and/or is configured as click-to-activate",
                "flash-overdue": "Flash communication was established but NOT within the acceptable time limit"
            }
        },
        z = {
            swfPath: function() {
                var a;
                if (!(a = U(O()))) {
                    var d, e, c = f.getElementsByTagName("script");
                    for (a = c.length; a--;) {
                        if (!(e = c[a].src)) {
                            d = null;
                            break
                        }
                        if (e = U(e), null == d) d = e;
                        else if (d !== e) {
                            d = null;
                            break
                        }
                    }
                    a = d || b || ""
                }
                return a + "ZeroClipboard.swf"
            }(),
            trustedDomains: a.location.host ? [a.location.host] : [],
            cacheBust: !0,
            forceEnhancedClipboard: !1,
            flashLoadTimeout: 3E4,
            autoActivate: !0,
            bubbleEvents: !0,
            containerId: "global-zeroclipboard-html-bridge",
            containerClass: "global-zeroclipboard-container",
            swfObjectId: "global-zeroclipboard-flash-bridge",
            hoverClass: "zeroclipboard-is-hover",
            activeClass: "zeroclipboard-is-active",
            forceHandCursor: !1,
            title: null,
            zIndex: 999999999
        },
        V = function(a) {
            if ("object" == typeof a && null !== a)
                for (var d in a)
                    if (t.call(a, d))
                        if (/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(d)) z[d] = a[d];
                        else if (null == y.bridge) {
                if ("containerId" === d || "swfObjectId" === d)
                    if ("string" != typeof a[d] || !a[d] || !/^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(a[d])) throw Error("The specified `" +
                        d + "` value is not valid as an HTML4 Element ID");
                z[d] = a[d]
            }
            if ("string" != typeof a || !a) return K(z);
            if (t.call(z, a)) return z[a]
        },
        L = function() {
            for (var a = ["userAgent", "platform", "appName"], d = {}, e = 0, b = a.length; b > e; e++) a[e] in p && (d[a[e]] = p[a[e]]);
            var a = ["bridge"],
                e = {},
                c;
            for (c in y) - 1 === a.indexOf(c) && (e[c] = y[c]);
            return {
                browser: d,
                flash: e,
                zeroclipboard: {
                    version: B.version,
                    config: B.config()
                }
            }
        },
        Q = function() {
            return !!(y.disabled || y.outdated || y.unavailable || y.deactivated)
        },
        G = function(a, d) {
            var e, b, c, k = {};
            if ("string" ==
                typeof a && a) c = a.toLowerCase().split(/\s+/);
            else if ("object" == typeof a && a && "undefined" == typeof d)
                for (e in a) t.call(a, e) && "string" == typeof e && e && "function" == typeof a[e] && B.on(e, a[e]);
            if (c && c.length) {
                e = 0;
                for (b = c.length; b > e; e++) a = c[e].replace(/^on/, ""), k[a] = !0, I[a] || (I[a] = []), I[a].push(d);
                if (k.ready && y.ready && B.emit({
                    type: "ready"
                }), k.error)
                    for (c = ["disabled", "outdated", "unavailable", "deactivated", "overdue"], e = 0, b = c.length; b > e; e++)
                        if (!0 === y[c[e]]) {
                            B.emit({
                                type: "error",
                                name: "flash-" + c[e]
                            });
                            break
                        }
            }
            return B
        },
        da = function(a, d) {
            var e, b, c, f, g;
            if (0 === arguments.length) f = k(I);
            else if ("string" == typeof a && a) f = a.split(/\s+/);
            else if ("object" == typeof a && a && "undefined" == typeof d)
                for (e in a) t.call(a, e) && "string" == typeof e && e && "function" == typeof a[e] && B.off(e, a[e]);
            if (f && f.length)
                for (e = 0, b = f.length; b > e; e++)
                    if (a = f[e].toLowerCase().replace(/^on/, ""), g = I[a], g && g.length)
                        if (d)
                            for (c = g.indexOf(d); - 1 !== c;) g.splice(c, 1), c = g.indexOf(d, c);
                        else g.length = 0;
            return B
        },
        S = function(a) {
            return "string" == typeof a && a ? K(I[a]) || null : K(I)
        },
        P = function(d) {
            var e, b, k;
            if (e = d = oa(d)) {
                e = d;
                var g = e.target || c || null,
                    q = "swf" === e._source;
                delete e._source;
                var m = ["flash-disabled", "flash-outdated", "flash-unavailable", "flash-deactivated", "flash-overdue"];
                switch (e.type) {
                    case "error":
                        -1 !== m.indexOf(e.name) && D(y, {
                            disabled: "flash-disabled" === e.name,
                            outdated: "flash-outdated" === e.name,
                            unavailable: "flash-unavailable" === e.name,
                            deactivated: "flash-deactivated" === e.name,
                            overdue: "flash-overdue" === e.name,
                            ready: !1
                        });
                        break;
                    case "ready":
                        var n = !0 === y.deactivated;
                        D(y, {
                            disabled: !1,
                            outdated: !1,
                            unavailable: !1,
                            deactivated: !1,
                            overdue: n,
                            ready: !n
                        });
                        break;
                    case "beforecopy":
                        h = g;
                        break;
                    case "copy":
                        var r, x = e.relatedTarget;
                        !C["text/html"] && !C["text/plain"] && x && (r = x.value || x.outerHTML || x.innerHTML) && (n = x.value || x.textContent || x.innerText) ? (e.clipboardData.clearData(), e.clipboardData.setData("text/plain", n), r !== n && e.clipboardData.setData("text/html", r)) : !C["text/plain"] && e.target && (n = e.target.getAttribute("data-clipboard-text")) && (e.clipboardData.clearData(), e.clipboardData.setData("text/plain",
                            n));
                        break;
                    case "aftercopy":
                        B.clearData();
                        if (g) {
                            try {
                                x = f.activeElement
                            } catch (p) {
                                x = null
                            }
                            g !== x && g.focus && g.focus()
                        }
                        break;
                    case "_mouseover":
                        B.focus(g);
                        !0 === z.bubbleEvents && q && (g && g !== e.relatedTarget && !Y(e.relatedTarget, g) && ca(D({}, e, {
                            type: "mouseenter",
                            bubbles: !1,
                            cancelable: !1
                        })), ca(D({}, e, {
                            type: "mouseover"
                        })));
                        break;
                    case "_mouseout":
                        B.blur();
                        !0 === z.bubbleEvents && q && (g && g !== e.relatedTarget && !Y(e.relatedTarget, g) && ca(D({}, e, {
                            type: "mouseleave",
                            bubbles: !1,
                            cancelable: !1
                        })), ca(D({}, e, {
                            type: "mouseout"
                        })));
                        break;
                    case "_mousedown":
                        pa(g, z.activeClass);
                        !0 === z.bubbleEvents && q && ca(D({}, e, {
                            type: e.type.slice(1)
                        }));
                        break;
                    case "_mouseup":
                        sa(g, z.activeClass);
                        !0 === z.bubbleEvents && q && ca(D({}, e, {
                            type: e.type.slice(1)
                        }));
                        break;
                    case "_click":
                        h = null;
                        !0 === z.bubbleEvents && q && ca(D({}, e, {
                            type: e.type.slice(1)
                        }));
                        break;
                    case "_mousemove":
                        !0 === z.bubbleEvents && q && ca(D({}, e, {
                            type: e.type.slice(1)
                        }))
                }
                e = !/^_(?:click|mouse(?:over|out|down|up|move))$/.test(e.type)
            }
            if (e)
                if ("ready" === d.type && !0 === y.overdue) k = B.emit({
                    type: "error",
                    name: "flash-overdue"
                });
                else {
                    e = D({}, d);
                    if ("object" == typeof e && e && e.type && (n = ja(e), (r = (I["*"] || []).concat(I[e.type] || [])) && r.length))
                        for (var u, x = 0, g = r.length; g > x; x++) q = r[x], m = this, "string" == typeof q && "function" == typeof a[q] && (q = a[q]), "object" == typeof q && q && "function" == typeof q.handleEvent && (m = q, q = q.handleEvent), "function" == typeof q && (u = D({}, e), W(q, m, [u], n));
                    if ("copy" === d.type) {
                        b = {};
                        d = {};
                        if ("object" == typeof C && C) {
                            for (k in C)
                                if (k && t.call(C, k) && "string" == typeof C[k] && C[k]) switch (k.toLowerCase()) {
                                    case "text/plain":
                                    case "text":
                                    case "air:text":
                                    case "flash:text":
                                        b.text =
                                            C[k];
                                        d.text = k;
                                        break;
                                    case "text/html":
                                    case "html":
                                    case "air:html":
                                    case "flash:html":
                                        b.html = C[k];
                                        d.html = k;
                                        break;
                                    case "application/rtf":
                                    case "text/rtf":
                                    case "rtf":
                                    case "richtext":
                                    case "air:rtf":
                                    case "flash:rtf":
                                        b.rtf = C[k], d.rtf = k
                                }
                                k = {
                                    data: b,
                                    formatMap: d
                                }
                        } else k = void 0;
                        b = k.data;
                        M = k.formatMap
                    }
                    k = b
                } else k = void 0;
            return k
        },
        ha = function() {
            if ("boolean" != typeof y.ready && (y.ready = !1), !B.isFlashUnusable() && null === y.bridge) {
                var a = z.flashLoadTimeout;
                "number" == typeof a && 0 <= a && g(function() {
                    "boolean" != typeof y.deactivated &&
                        (y.deactivated = !0);
                    !0 === y.deactivated && B.emit({
                        type: "error",
                        name: "flash-deactivated"
                    })
                }, a);
                y.overdue = !1;
                La()
            }
        },
        ka = function() {
            B.clearData();
            B.blur();
            B.emit("destroy");
            ma();
            B.off()
        },
        ia = function(a, d) {
            var e;
            if ("object" == typeof a && a && "undefined" == typeof d) e = a, B.clearData();
            else {
                if ("string" != typeof a || !a) return;
                e = {};
                e[a] = d
            }
            for (var b in e) "string" == typeof b && b && t.call(e, b) && "string" == typeof e[b] && e[b] && (C[b] = e[b])
        },
        ba = function(a) {
            if ("undefined" == typeof a) {
                if (C)
                    for (var d in C) t.call(C, d) && delete C[d];
                M = null
            } else "string" ==
                typeof a && t.call(C, a) && delete C[a]
        },
        T = function(a) {
            return "undefined" == typeof a ? K(C) : "string" == typeof a && t.call(C, a) ? C[a] : void 0
        },
        R = function(d) {
            if (d && 1 === d.nodeType) {
                c && (sa(c, z.activeClass), c !== d && sa(c, z.hoverClass));
                c = d;
                pa(d, z.hoverClass);
                var e = d.getAttribute("title") || z.title;
                if ("string" == typeof e && e) {
                    var b = ua(y.bridge);
                    b && b.setAttribute("title", e)
                }(e = !0 === z.forceHandCursor) || (e = a.getComputedStyle(d, null).getPropertyValue("cursor"), e = "pointer" === (e && "auto" !== e || "A" !== d.nodeName ? e : "pointer"));
                !0 ===
                    y.ready && (y.bridge && "function" == typeof y.bridge.setHandCursor ? y.bridge.setHandCursor(e) : y.ready = !1);
                var k;
                c && (k = ua(y.bridge)) && (d = m(c), D(k.style, {
                    width: d.width + "px",
                    height: d.height + "px",
                    top: d.top + "px",
                    left: d.left + "px",
                    zIndex: "" + va(z.zIndex)
                }))
            }
        },
        H = function() {
            var a = ua(y.bridge);
            a && (a.removeAttribute("title"), a.style.left = "0px", a.style.top = "-9999px", a.style.width = "1px", a.style.top = "1px");
            c && (sa(c, z.hoverClass), sa(c, z.activeClass), c = null)
        },
        ta = function() {
            return c || null
        },
        oa = function(d) {
            var k;
            if ("string" ==
                typeof d && d ? (k = d, d = {}) : "object" == typeof d && d && "string" == typeof d.type && d.type && (k = d.type), k) {
                !d.target && /^(copy|aftercopy|_click)$/.test(k.toLowerCase()) && (d.target = h);
                D(d, {
                    type: k.toLowerCase(),
                    target: d.target || c || null,
                    relatedTarget: d.relatedTarget || null,
                    currentTarget: y && y.bridge || null,
                    timeStamp: d.timeStamp || e() || null
                });
                k = N[d.type];
                "error" === d.type && d.name && k && (k = k[d.name]);
                k && (d.message = k);
                "ready" === d.type && D(d, {
                    target: null,
                    version: y.version
                });
                "error" === d.type && (/^flash-(disabled|outdated|unavailable|deactivated|overdue)$/.test(d.name) &&
                    D(d, {
                        target: null,
                        minimumVersion: "11.0.0"
                    }), /^flash-(outdated|unavailable|deactivated|overdue)$/.test(d.name) && D(d, {
                        version: y.version
                    }));
                "copy" === d.type && (d.clipboardData = {
                    setData: B.setData,
                    clearData: B.clearData
                });
                if ("aftercopy" === d.type && (k = M, "object" == typeof d && d && "object" == typeof k && k)) {
                    var g = {},
                        q;
                    for (q in d)
                        if (t.call(d, q))
                            if ("success" !== q && "data" !== q) g[q] = d[q];
                            else {
                                g[q] = {};
                                var n = d[q],
                                    r;
                                for (r in n) r && t.call(n, r) && t.call(k, r) && (g[q][k[r]] = n[r])
                            }
                    d = g
                }
                d.target && !d.relatedTarget && (q = d, r = (r = (r = d.target) &&
                    r.getAttribute && r.getAttribute("data-clipboard-target")) ? f.getElementById(r) : null, q.relatedTarget = r);
                if (d && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(d.type)) {
                    q = d.target;
                    r = "_mouseover" === d.type && d.relatedTarget ? d.relatedTarget : b;
                    k = "_mouseout" === d.type && d.relatedTarget ? d.relatedTarget : b;
                    var n = m(q),
                        g = n.left + ("number" == typeof d._stageX ? d._stageX : 0),
                        n = n.top + ("number" == typeof d._stageY ? d._stageY : 0),
                        x = g - (f.body.scrollLeft + f.documentElement.scrollLeft),
                        p = n - (f.body.scrollTop + f.documentElement.scrollTop),
                        u = (a.screenLeft || a.screenX || 0) + x,
                        s = (a.screenTop || a.screenY || 0) + p,
                        v = "number" == typeof d.movementX ? d.movementX : 0,
                        w = "number" == typeof d.movementY ? d.movementY : 0;
                    delete d._stageX;
                    delete d._stageY;
                    D(d, {
                        srcElement: q,
                        fromElement: r,
                        toElement: k,
                        screenX: u,
                        screenY: s,
                        pageX: g,
                        pageY: n,
                        clientX: x,
                        clientY: p,
                        x: x,
                        y: p,
                        movementX: v,
                        movementY: w,
                        offsetX: 0,
                        offsetY: 0,
                        layerX: 0,
                        layerY: 0
                    })
                }
                return d
            }
        },
        ja = function(a) {
            return !/^(?:(?:before)?copy|destroy)$/.test(a && "string" == typeof a.type && a.type || "")
        },
        W = function(a, d, e, b) {
            b ? g(function() {
                a.apply(d,
                    e)
            }, 0) : a.apply(d, e)
        },
        ca = function(d) {
            if (d && "string" == typeof d.type && d) {
                var e, b = d.target || null,
                    c = b && b.ownerDocument || f;
                d = D({
                    view: c.defaultView || a,
                    canBubble: !0,
                    cancelable: !0,
                    detail: "click" === d.type ? 1 : 0,
                    button: "number" == typeof d.which ? d.which - 1 : "number" == typeof d.button ? d.button : c.createEvent ? 0 : 1
                }, d);
                b && c.createEvent && b.dispatchEvent && (d = [d.type, d.canBubble, d.cancelable, d.view, d.detail, d.screenX, d.screenY, d.clientX, d.clientY, d.ctrlKey, d.altKey, d.shiftKey, d.metaKey, d.button, d.relatedTarget], e = c.createEvent("MouseEvents"),
                    e.initMouseEvent && (e.initMouseEvent.apply(e, d), e._source = "js", b.dispatchEvent(e)))
            }
        },
        ua = function(a) {
            for (a = a && a.parentNode; a && "OBJECT" === a.nodeName && a.parentNode;) a = a.parentNode;
            return a || null
        },
        La = function() {
            var d, b = y.bridge,
                c = ua(b);
            if (!b) {
                var b = Za(a.location.host, z),
                    k = "never" === b ? "none" : "all",
                    g, q, h, m, c = "",
                    n = [];
                if (z.trustedDomains && ("string" == typeof z.trustedDomains ? m = [z.trustedDomains] : "object" == typeof z.trustedDomains && "length" in z.trustedDomains && (m = z.trustedDomains)), m && m.length)
                    for (q = 0, h = m.length; h >
                        q; q++)
                        if (t.call(m, q) && m[q] && "string" == typeof m[q] && (g = Ca(m[q]), g)) {
                            if ("*" === g) {
                                n.length = 0;
                                n.push(g);
                                break
                            }
                            n.push.apply(n, [g, "//" + g, a.location.protocol + "//" + g])
                        }
                g = (n.length && (c += "trustedOrigins=" + r(n.join(","))), !0 === z.forceEnhancedClipboard && (c += (c ? "&" : "") + "forceEnhancedClipboard=true"), "string" == typeof z.swfObjectId && z.swfObjectId && (c += (c ? "&" : "") + "swfObjectId=" + r(z.swfObjectId)), c);
                c = z.swfPath;
                m = null == z || z && !0 === z.cacheBust ? (-1 === z.swfPath.indexOf("?") ? "?" : "&") + "noCache=" + e() : "";
                m = c + m;
                c = f.createElement("div");
                c = (c.id = z.containerId, c.className = z.containerClass, c.style.position = "absolute", c.style.left = "0px", c.style.top = "-9999px", c.style.width = "1px", c.style.height = "1px", c.style.zIndex = "" + va(z.zIndex), c);
                q = f.createElement("div");
                c.appendChild(q);
                f.body.appendChild(c);
                h = f.createElement("div");
                n = "activex" === y.pluginType;
                h.innerHTML = '<object id="' + z.swfObjectId + '" name="' + z.swfObjectId + '" width="100%" height="100%" ' + (n ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="' +
                    m + '"') + ">" + (n ? '<param name="movie" value="' + m + '"/>' : "") + '<param name="allowScriptAccess" value="' + b + '"/><param name="allowNetworking" value="' + k + '"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="' + g + '"/></object>';
                b = h.firstChild;
                J(b).ZeroClipboard = B;
                c.replaceChild(b, q)
            }
            return b || (b = f[z.swfObjectId], b && (d = b.length) && (b = b[d - 1]), !b && c && (b = c.firstChild)), y.bridge = b || null, b
        },
        ma = function() {
            var a = y.bridge;
            if (a) {
                var d = ua(a);
                d && ("activex" === y.pluginType &&
                    "readyState" in a ? (a.style.display = "none", function qa() {
                        if (4 === a.readyState) {
                            for (var e in a) "function" == typeof a[e] && (a[e] = null);
                            a.parentNode && a.parentNode.removeChild(a);
                            d.parentNode && d.parentNode.removeChild(d)
                        } else g(qa, 10)
                    }()) : (a.parentNode && a.parentNode.removeChild(a), d.parentNode && d.parentNode.removeChild(d)));
                y.ready = null;
                y.bridge = null;
                y.deactivated = null
            }
        },
        Ca = function(a) {
            if (null == a || "" === a || (a = a.replace(/^\s+|\s+$/g, ""), "" === a)) return null;
            var d = a.indexOf("//");
            a = -1 === d ? a : a.slice(d + 2);
            var e =
                a.indexOf("/");
            return a = -1 === e ? a : -1 === d || 0 === e ? null : a.slice(0, e), a && ".swf" === a.slice(-4).toLowerCase() ? null : a || null
        },
        Za = function() {
            return function(a, d) {
                var e = Ca(d.swfPath);
                null === e && (e = a);
                var b = d.trustedDomains,
                    c, k, f, g = [];
                if ("string" == typeof b && (b = [b]), "object" == typeof b && b && "number" == typeof b.length)
                    for (c = 0, k = b.length; k > c; c++)
                        if (t.call(b, c) && (f = Ca(b[c]))) {
                            if ("*" === f) {
                                g.length = 0;
                                g.push("*");
                                break
                            } - 1 === g.indexOf(f) && g.push(f)
                        }
                b = g.length;
                if (0 < b) {
                    if (1 === b && "*" === g[0]) return "always";
                    if (-1 !== g.indexOf(a)) return 1 ===
                        b && a === e ? "sameDomain" : "always"
                }
                return "never"
            }
        }(),
        pa = function(a, d) {
            if (!a || 1 !== a.nodeType) return a;
            if (a.classList) return a.classList.contains(d) || a.classList.add(d), a;
            if (d && "string" == typeof d) {
                var e = (d || "").split(/\s+/);
                if (1 === a.nodeType)
                    if (a.className) {
                        for (var b = " " + a.className + " ", c = a.className, k = 0, f = e.length; f > k; k++) 0 > b.indexOf(" " + e[k] + " ") && (c += " " + e[k]);
                        a.className = c.replace(/^\s+|\s+$/g, "")
                    } else a.className = d
            }
            return a
        },
        sa = function(a, d) {
            if (!a || 1 !== a.nodeType) return a;
            if (a.classList) return a.classList.contains(d) &&
                a.classList.remove(d), a;
            if ("string" == typeof d && d) {
                var e = d.split(/\s+/);
                if (1 === a.nodeType && a.className) {
                    for (var b = (" " + a.className + " ").replace(/[\n\t]/g, " "), c = 0, k = e.length; k > c; c++) b = b.replace(" " + e[c] + " ", " ");
                    a.className = b.replace(/^\s+|\s+$/g, "")
                }
            }
            return a
        },
        m = function(e) {
            var b = {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            };
            if (e.getBoundingClientRect) {
                var c, k;
                e = e.getBoundingClientRect();
                if ("pageXOffset" in a && "pageYOffset" in a) c = a.pageXOffset, k = a.pageYOffset;
                else {
                    var g, q, h = 1;
                    k = ("function" == typeof f.body.getBoundingClientRect &&
                        (c = f.body.getBoundingClientRect(), g = c.right - c.left, q = f.body.offsetWidth, h = d(100 * (g / q)) / 100), h);
                    c = d(f.documentElement.scrollLeft / k);
                    k = d(f.documentElement.scrollTop / k)
                }
                g = f.documentElement.clientTop || 0;
                b.left = e.left + c - (f.documentElement.clientLeft || 0);
                b.top = e.top + k - g;
                b.width = "width" in e ? e.width : e.right - e.left;
                b.height = "height" in e ? e.height : e.bottom - e.top
            }
            return b
        },
        va = function(a) {
            if (/^(?:auto|inherit)$/.test(a)) return a;
            var d;
            return "number" != typeof a || u(a) ? "string" == typeof a && (d = va(v(a, 10))) : d = a, "number" ==
                typeof d ? d : "auto"
        };
    (function(a) {
        function d(a) {
            a = a.match(/[\d]+/g);
            return a.length = 3, a.join(".")
        }

        function e(a) {
            a && (c = !0, a.version && (g = d(a.version)), !g && a.description && (g = d(a.description)), a.filename && (a = a.filename, f = !!a && (a = a.toLowerCase()) && (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(a) || "chrome.plugin" === a.slice(-13))))
        }
        var b, c = !1,
            k = !1,
            f = !1,
            g = "";
        if (p.plugins && p.plugins.length) a = p.plugins["Shockwave Flash"], e(a), p.plugins["Shockwave Flash 2.0"] && (c = !0, g = "2.0.0.11");
        else if (p.mimeTypes && p.mimeTypes.length) a = (a = p.mimeTypes["application/x-shockwave-flash"]) && a.enabledPlugin, e(a);
        else if ("undefined" != typeof a) {
            k = !0;
            try {
                b = new a("ShockwaveFlash.ShockwaveFlash.7"), c = !0, g = d(b.GetVariable("$version"))
            } catch (q) {
                try {
                    b = new a("ShockwaveFlash.ShockwaveFlash.6"), c = !0, g = "6.0.21"
                } catch (h) {
                    try {
                        b = new a("ShockwaveFlash.ShockwaveFlash"), c = !0, g = d(b.GetVariable("$version"))
                    } catch (t) {
                        k = !1
                    }
                }
            }
        }
        y.disabled = !0 !== c;
        y.outdated = g && w(g) < w("11.0.0");
        y.version = g || "0.0.0";
        y.pluginType = f ? "pepper" :
            k ? "activex" : c ? "netscape" : "unknown"
    })(s);
    var B = function() {
        return this instanceof B ? void("function" == typeof B._createClient && B._createClient.apply(this, F(arguments))) : new B
    };
    q(B, "version", {
        value: "2.1.6",
        writable: !1,
        configurable: !0,
        enumerable: !0
    });
    B.config = function() {
        return V.apply(this, F(arguments))
    };
    B.state = function() {
        return L.apply(this, F(arguments))
    };
    B.isFlashUnusable = function() {
        return Q.apply(this, F(arguments))
    };
    B.on = function() {
        return G.apply(this, F(arguments))
    };
    B.off = function() {
        return da.apply(this,
            F(arguments))
    };
    B.handlers = function() {
        return S.apply(this, F(arguments))
    };
    B.emit = function() {
        return P.apply(this, F(arguments))
    };
    B.create = function() {
        return ha.apply(this, F(arguments))
    };
    B.destroy = function() {
        return ka.apply(this, F(arguments))
    };
    B.setData = function() {
        return ia.apply(this, F(arguments))
    };
    B.clearData = function() {
        return ba.apply(this, F(arguments))
    };
    B.getData = function() {
        return T.apply(this, F(arguments))
    };
    B.focus = B.activate = function() {
        return R.apply(this, F(arguments))
    };
    B.blur = B.deactivate = function() {
        return H.apply(this,
            F(arguments))
    };
    B.activeElement = function() {
        return ta.apply(this, F(arguments))
    };
    var $a = 0,
        Z = {},
        Ta = 0,
        Da = {},
        Ma = {};
    D(z, {
        autoActivate: !0
    });
    var ab = function(a) {
            var d = this;
            d.id = "" + $a++;
            Z[d.id] = {
                instance: d,
                elements: [],
                handlers: {}
            };
            a && d.clip(a);
            B.on("*", function(a) {
                return d.emit(a)
            });
            B.on("destroy", function() {
                d.destroy()
            });
            B.create()
        },
        bb = function(a, d) {
            var e, b, c, k = {},
                f = Z[this.id] && Z[this.id].handlers;
            if ("string" == typeof a && a) c = a.toLowerCase().split(/\s+/);
            else if ("object" == typeof a && a && "undefined" == typeof d)
                for (e in a) t.call(a,
                    e) && "string" == typeof e && e && "function" == typeof a[e] && this.on(e, a[e]);
            if (c && c.length) {
                e = 0;
                for (b = c.length; b > e; e++) a = c[e].replace(/^on/, ""), k[a] = !0, f[a] || (f[a] = []), f[a].push(d);
                if (k.ready && y.ready && this.emit({
                    type: "ready",
                    client: this
                }), k.error)
                    for (c = ["disabled", "outdated", "unavailable", "deactivated", "overdue"], e = 0, b = c.length; b > e; e++)
                        if (y[c[e]]) {
                            this.emit({
                                type: "error",
                                name: "flash-" + c[e],
                                client: this
                            });
                            break
                        }
            }
            return this
        },
        cb = function(a, d) {
            var e, b, c, f, g, q = Z[this.id] && Z[this.id].handlers;
            if (0 === arguments.length) f =
                k(q);
            else if ("string" == typeof a && a) f = a.split(/\s+/);
            else if ("object" == typeof a && a && "undefined" == typeof d)
                for (e in a) t.call(a, e) && "string" == typeof e && e && "function" == typeof a[e] && this.off(e, a[e]);
            if (f && f.length)
                for (e = 0, b = f.length; b > e; e++)
                    if (a = f[e].toLowerCase().replace(/^on/, ""), g = q[a], g && g.length)
                        if (d)
                            for (c = g.indexOf(d); - 1 !== c;) g.splice(c, 1), c = g.indexOf(d, c);
                        else g.length = 0;
            return this
        },
        db = function(a) {
            var d = null,
                e = Z[this.id] && Z[this.id].handlers;
            return e && (d = "string" == typeof a && a ? e[a] ? e[a].slice(0) :
                [] : K(e)), d
        },
        eb = function(d) {
            var e;
            var b = d;
            if (b && b.type)
                if (b.client && b.client !== this) e = !1;
                else {
                    var c = Z[this.id] && Z[this.id].elements,
                        k = !!c && 0 < c.length;
                    e = !b.target || k && -1 !== c.indexOf(b.target);
                    c = b.relatedTarget && k && -1 !== c.indexOf(b.relatedTarget);
                    b = b.client && b.client === this;
                    e = e || c || b ? !0 : !1
                } else e = !1; if (e && ("object" == typeof d && d && "string" == typeof d.type && d.type && (d = D({}, d)), d = D({}, oa(d), {
                client: this
            }), "object" == typeof d && d && d.type && (e = ja(d), (b = (Z[this.id] && Z[this.id].handlers["*"] || []).concat(Z[this.id] &&
                Z[this.id].handlers[d.type] || [])) && b.length)))
                for (var f, g, q, c = 0, k = b.length; k > c; c++) f = b[c], g = this, "string" == typeof f && "function" == typeof a[f] && (f = a[f]), "object" == typeof f && f && "function" == typeof f.handleEvent && (g = f, f = f.handleEvent), "function" == typeof f && (q = D({}, d), W(f, g, [q], e));
            return this
        },
        ra = function(a) {
            a = Qa(a);
            for (var d = 0; d < a.length; d++)
                if (t.call(a, d) && a[d] && 1 === a[d].nodeType) {
                    a[d].zcClippingId ? -1 === Da[a[d].zcClippingId].indexOf(this.id) && Da[a[d].zcClippingId].push(this.id) : (a[d].zcClippingId = "zcClippingId_" +
                        Ta++, Da[a[d].zcClippingId] = [this.id], !0 === z.autoActivate && ea(a[d]));
                    var e = Z[this.id] && Z[this.id].elements; - 1 === e.indexOf(a[d]) && e.push(a[d])
                }
            return this
        },
        Ua = function(a) {
            var d = Z[this.id];
            if (!d) return this;
            var e, d = d.elements;
            a = "undefined" == typeof a ? d.slice(0) : Qa(a);
            for (var b = a.length; b--;)
                if (t.call(a, b) && a[b] && 1 === a[b].nodeType) {
                    for (e = 0; - 1 !== (e = d.indexOf(a[b], e));) d.splice(e, 1);
                    var c = Da[a[b].zcClippingId];
                    if (c) {
                        for (e = 0; - 1 !== (e = c.indexOf(this.id, e));) c.splice(e, 1);
                        if (0 === c.length) {
                            if (!0 === z.autoActivate &&
                                (e = a[b]) && 1 === e.nodeType && (c = Ma[e.zcClippingId], "object" == typeof c && c)) {
                                for (var k = void 0, f = void 0, g = ["move", "leave", "enter", "out", "over"], q = 0, h = g.length; h > q; q++) k = "mouse" + g[q], f = c[k], "function" == typeof f && e.removeEventListener(k, f, !1);
                                delete Ma[e.zcClippingId]
                            }
                            delete a[b].zcClippingId
                        }
                    }
                }
            return this
        },
        Pa = function() {
            var a = Z[this.id];
            return a && a.elements ? a.elements.slice(0) : []
        },
        Wa = function() {
            this.unclip();
            this.off();
            delete Z[this.id]
        },
        Qa = function(a) {
            return "string" == typeof a && (a = []), "number" != typeof a.length ?
                [a] : a
        },
        ea = function(d) {
            if (d && 1 === d.nodeType) {
                var e = function(d) {
                        (d || (d = a.event)) && ("js" !== d._source && (d.stopImmediatePropagation(), d.preventDefault()), delete d._source)
                    },
                    b = function(b) {
                        (b || (b = a.event)) && (e(b), B.focus(d))
                    };
                d.addEventListener("mouseover", b, !1);
                d.addEventListener("mouseout", e, !1);
                d.addEventListener("mouseenter", e, !1);
                d.addEventListener("mouseleave", e, !1);
                d.addEventListener("mousemove", e, !1);
                Ma[d.zcClippingId] = {
                    mouseover: b,
                    mouseout: e,
                    mouseenter: e,
                    mouseleave: e,
                    mousemove: e
                }
            }
        };
    B._createClient =
        function() {
            ab.apply(this, F(arguments))
    };
    B.prototype.on = function() {
        return bb.apply(this, F(arguments))
    };
    B.prototype.off = function() {
        return cb.apply(this, F(arguments))
    };
    B.prototype.handlers = function() {
        return db.apply(this, F(arguments))
    };
    B.prototype.emit = function() {
        return eb.apply(this, F(arguments))
    };
    B.prototype.clip = function() {
        return ra.apply(this, F(arguments))
    };
    B.prototype.unclip = function() {
        return Ua.apply(this, F(arguments))
    };
    B.prototype.elements = function() {
        return Pa.apply(this, F(arguments))
    };
    B.prototype.destroy =
        function() {
            return Wa.apply(this, F(arguments))
    };
    B.prototype.setText = function(a) {
        return B.setData("text/plain", a), this
    };
    B.prototype.setHtml = function(a) {
        return B.setData("text/html", a), this
    };
    B.prototype.setRichText = function(a) {
        return B.setData("application/rtf", a), this
    };
    B.prototype.setData = function() {
        return B.setData.apply(this, F(arguments)), this
    };
    B.prototype.clearData = function() {
        return B.clearData.apply(this, F(arguments)), this
    };
    B.prototype.getData = function() {
        return B.getData.apply(this, F(arguments))
    };
    "function" == typeof define && define.amd ? define(function() {
        return B
    }) : "object" == typeof module && module && "object" == typeof module.exports && module.exports ? module.exports = B : a.ZeroClipboard = B
}(function() {
    return this || window
}());
(function(a) {
    window.XDomainRequest && a.ajaxTransport(function(b) {
        if (b.crossDomain && b.async) {
            b.timeout && (b.xdrTimeout = b.timeout, delete b.timeout);
            var c;
            return {
                send: function(h, f) {
                    function p(b, h, p, n) {
                        c.onload = c.onerror = c.ontimeout = c.onprogress = a.noop;
                        c = void 0;
                        f(b, h, p, n)
                    }
                    c = new XDomainRequest;
                    c.open(b.type, b.url);
                    c.onload = function() {
                        p(200, "OK", {
                            text: c.responseText
                        }, "Content-Type: " + c.contentType)
                    };
                    c.onerror = function() {
                        p(404, "Not Found")
                    };
                    c.onprogress = function() {};
                    b.xdrTimeout && (c.ontimeout = function() {
                        p(0,
                            "timeout")
                    }, c.timeout = b.xdrTimeout);
                    c.send(b.hasContent && b.data || null)
                },
                abort: function() {
                    c && (c.onerror = a.noop(), c.abort())
                }
            }
        }
    })
})(jQuery);
(function() {
    for (var a, b = function() {}, c = "assert clear count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd timeStamp trace warn".split(" "), h = c.length, f = window.console = window.console || {}; h--;) a = c[h], f[a] || (f[a] = b)
})();
(function(a) {
    a.fn.disableSelection = function() {
        a(this).addClass("no_select");
        if (a("html").hasClass("lt-ie10")) a(this).attr("unselectable", "on").on("selectstart", !1);
        return this
    }
})(jQuery);
var DelayedExecution = function() {
    var a = {};
    return function(b, c, h) {
        h || (h = "non-unique");
        a[h] && clearTimeout(a[h]);
        a[h] = setTimeout(b, c)
    }
}();
Function.prototype.bind || (Function.prototype.bind = function(a) {
    if ("function" !== typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    var b = Array.prototype.slice.call(arguments, 1),
        c = this,
        h = function() {},
        f = function() {
            return c.apply(this instanceof h ? this : a || window, b.concat(Array.prototype.slice.call(arguments)))
        };
    h.prototype = this.prototype;
    f.prototype = new h;
    return f
});
$.fn.outerHTML = function() {
    $t = $(this);
    if ("outerHTML" in $t[0]) return $t[0].outerHTML;
    var a = $t.wrap("<div></div>").parent().html();
    $t.unwrap();
    return a
};
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
};
String.prototype.ltrim = function() {
    return this.replace(/^\s+/, "")
};
String.prototype.rtrim = function() {
    return this.replace(/\s+$/, "")
};
String.prototype.toUpperCaseFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
};
$(document).ready(function() {});

function setSortCookie(a, b, c, h, f) {
    var p = {},
        g;
    if (g = rcookie("gsort")) p = JSON.parse(g);
    console.log(p);
    void 0 == p[a] && (p[a] = {});
    void 0 == p[a][b] && (p[a][b] = Array(3));
    c && (p[a][b][0] = c);
    h && (p[a][b][1] = h);
    void 0 != f && (p[a][b][2] = f);
    setcookie("gsort", JSON.stringify(p), 10)
}

function htmlentities(a) {
    return $("<div>").text(a).html()
}

function validateEmail(a) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\\t".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA\t-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(a)
}

function validateName(a) {
    return 0 == a.length || 40 < a.length ? !1 : RegExp(/^[ 0-9a-zA-Z\u0400-\u04FF\-]+$/).test(a)
}

function fileext(a) {
    return a.split(".").pop()
}

function filebase(a) {
    a = a.split(".");
    a.pop();
    return a.join(".")
}

function rcookie(a) {
    a += "=";
    for (var b = document.cookie.split(";"), c = 0; c < b.length; c++) {
        for (var h = b[c];
            " " == h.charAt(0);) h = h.substring(1, h.length);
        if (0 == h.indexOf(a)) return h.substring(a.length, h.length)
    }
    return null
}

function setcookie(a, b, c) {
    c ? (date = new Date, date.setTime(date.getTime() + 864E5 * c), c = "; expires=" + date.toGMTString()) : c = "";
    var h = "domain=" + getCookieDomain() + ";"; - 1 == getCookieDomain().indexOf(".") && (h = "");
    document.cookie = a + "=" + b + c + "; " + h + " path=/"
}

function getCookieDomain() {
    for (var a = location.host.split("."), b = [], c = a.length - 1; 0 <= c && !(b.unshift(a[c]), 3 < a[c].length); --c);
    return b.join(".")
}

function createSelection(a, b, c) {
    if (a.createTextRange) {
        var h = a.createTextRange();
        h.collapse(!0);
        h.moveStart("character", b);
        h.moveEnd("character", c);
        h.select();
        a.focus()
    } else a.setSelectionRange ? (a.focus(), a.setSelectionRange(b, c)) : "undefined" != typeof a.selectionStart && (a.selectionStart = b, a.selectionEnd = c, a.focus())
}

function obLength(a) {
    var b = 0,
        c;
    for (c in a) a.hasOwnProperty(c) && b++;
    return b
}

function obMegaLength(a) {
    var b = 0,
        c;
    for (c in a) a.hasOwnProperty(c) && (b = "object" == typeof a[c] || "array" == typeof a[c] ? b + obMegaLength(a[c]) : b + 1);
    return b
}

function compareObj(a, b, c, h) {
    for (var f in a) obj.hasOwnProperty(f) && ("undefined" != b.key && h.push(c + "." + f), "object" != typeof obj[f] && "array" != typeof obj[f] || compareObj(a[f], b[f], c + "." + f, h))
}

function basename(a) {
    return a.substring(a.lastIndexOf(-1 != a.indexOf("/") ? "/" : "\\") + 1)
}

function emptyOnBlur(a) {
    "object" != typeof a && (a = $(a)[0]);
    $(a).on("focus", function(a) {
        this.value == a && (this.value = "")
    }.bind(a, a.value)).on("blur", function(a) {
        "" == this.value && (this.value = a)
    }.bind(a, a.value))
}

function loadCSS(a) {
    var b = $("<link>");
    $("head").append(b);
    b.attr({
        rel: "stylesheet",
        type: "text/css",
        href: a
    });
    return b
}
Number.prototype.pad = function(a) {
    "number" !== typeof a && (a = 2);
    for (var b = String(this); b.length < a;) b = "0" + b;
    return b
};

function pageHeight() {
    return Math.max($(document).height(), $(window).height())
}

function getProperScrollTo(a) {
    if (!isVisible(a)) {
        var b = [$(window).scrollTop() + 54, $(window).scrollTop() + $(window).height() - 54];
        a = a.position().top + a.outerHeight() / 2 > b[0] + (b[1] - b[0]) / 2 ? a.position().top - $(window).outerHeight() + 80 + a.outerHeight() : a.position().top - 80;
        $(window).scrollTop(a)
    }
}

function isVisible(a) {
    var b = [$(window).scrollTop() + 54, $(window).scrollTop() + $(window).height() - 54];
    return b[0] < a.position().top && b[1] > a.position().top + a.height() && a.height() < b[1] - b[0] ? !0 : !1
}

function calcGridItemsPerRow(a) {
    return Math.floor($(a).outerWidth() / ($($(a).children(".gridb")[0]).outerWidth() + 10))
}
var fgmto;

function fixGridMargins(a) {
    fgmto && (clearTimeout(fgmto), fgmto = null);
    fgmto = setTimeout(function() {
        var b = calcGridItemsPerRow(a),
            c, h, f = HFN.config.isRtl() ? "margin-left" : "margin-right";
        if (b) {
            c = Math.floor(($(a).width() - $($(a).children(".gridb")[0]).outerWidth() * b) / (b - 1));
            r;
            h = $(a).width() - $($(a).children(".gridb")[0]).outerWidth() * b - c * (b - 1);
            console.log("empty diff", c, h, b);
            $(a + " > div.gridb").css(f, c);
            for (var p = Math.floor($(a).children(".gridb").length / b), g = 0; g <= p; ++g)
                for (var r = h - 1; 0 <= r; --r) $($(a).children(".gridb")[g *
                    b + r]).css(f, c + 1);
            $(a + " > div.gridb").filter(":nth-of-type(" + b + "n)").css(f, 0)
        }
    }, 100)
}

function versionCompare(a, b) {
    for (var c = 0, h = a.split("."), f = b.split("."), p = Math.max(h.length, f.length), g = 0; g < p; g++) {
        var r = g < h.length ? parseInt(h[g], 10) : 0,
            s = g < f.length ? parseInt(f[g], 10) : 0;
        isNaN(r) && (r = 0);
        isNaN(s) && (s = 0);
        if (r != s) {
            c = r > s ? 1 : -1;
            break
        }
    }
    return c
}
jQuery.events = function(a) {
    var b = [],
        c;
    jQuery(a).each(function() {
        (c = jQuery._data(this, "events")) && b.push({
            element: this,
            events: c
        })
    });
    return 0 < b.length ? b : null
};
var inactivityTimeout = function(a, b) {
    var c = videojs(document.getElementById(a));
    $(c).on("fullscreenchange", function() {})
};

function addslashes(a) {
    return (a + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0")
}

function isTouchDevice() {
    if (navigator.userAgent.match(/android 3/i) || navigator.userAgent.match(/honeycomb/i)) return !1;
    try {
        return document.createEvent("TouchEvent"), !0
    } catch (a) {
        return !1
    }
}

function touchScroll(a) {
    if (isTouchDevice()) {
        document.getElementById(a);
        var b = 0;
        document.getElementById(a).addEventListener("touchstart", function(a) {
            b = this.scrollTop + a.touches[0].pageY
        }, !1);
        document.getElementById(a).addEventListener("touchmove", function(a) {
            this.scrollTop = b - a.touches[0].pageY;
            a.preventDefault()
        }, !1)
    }
}
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
};
String.prototype.ltrim = function() {
    return this.replace(/^\s+/, "")
};
String.prototype.rtrim = function() {
    return this.replace(/\s+$/, "")
};

function canPlayVideo() {
    var a = document.createElement("video");
    return $.browser.mobile ? !0 : "" != a.canPlayType('video/mp4; codecs="avc1.42001E, mp4a.40.2"')
}

function canPlayAudio() {
    return $.browser.chromium ? !1 : "" != document.createElement("audio").canPlayType("audio/mpeg")
}
Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
    for (var c = b || 0, h = this.length; c < h; c++)
        if (this[c] === a) return c;
    return -1
});

function array_index_of(a, b, c, h) {
    h = h || 0;
    for (var f = a.length; h < f; h++)
        if (a[h][b] && a[h][b] == c) return h;
    return -1
}

function retinaImage(a, b, c, h) {
    a = '<img src="' + retinaSrc(a) + '" width="' + b + '" height="' + c + '">';
    return h ? $(a) : a
}

function retinaSrc(a) {
    2 <= window.devicePixelRatio && (a = a.replace("." + fileext(a), "@2x." + fileext(a)));
    return a
}
"object" !== typeof JSON && (JSON = {});
(function() {
    function a(a) {
        return 10 > a ? "0" + a : a
    }

    function b(a) {
        f.lastIndex = 0;
        return f.test(a) ? '"' + a.replace(f, function(a) {
            var b = r[a];
            return "string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }

    function c(a, f) {
        var h, r, d, e, k = p,
            q, t = f[a];
        t && "object" === typeof t && "function" === typeof t.toJSON && (t = t.toJSON(a));
        "function" === typeof s && (t = s.call(f, a, t));
        switch (typeof t) {
            case "string":
                return b(t);
            case "number":
                return isFinite(t) ? String(t) : "null";
            case "boolean":
            case "null":
                return String(t);
            case "object":
                if (!t) return "null";
                p += g;
                q = [];
                if ("[object Array]" === Object.prototype.toString.apply(t)) {
                    e = t.length;
                    for (h = 0; h < e; h += 1) q[h] = c(h, t) || "null";
                    d = 0 === q.length ? "[]" : p ? "[\n" + p + q.join(",\n" + p) + "\n" + k + "]" : "[" + q.join(",") + "]";
                    p = k;
                    return d
                }
                if (s && "object" === typeof s)
                    for (e = s.length, h = 0; h < e; h += 1) "string" === typeof s[h] && (r = s[h], (d = c(r, t)) && q.push(b(r) + (p ? ": " : ":") + d));
                else
                    for (r in t) Object.prototype.hasOwnProperty.call(t, r) && (d = c(r, t)) && q.push(b(r) + (p ? ": " : ":") + d);
                d = 0 === q.length ? "{}" : p ? "{\n" + p + q.join(",\n" +
                    p) + "\n" + k + "}" : "{" + q.join(",") + "}";
                p = k;
                return d
        }
    }
    "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    });
    var h, f, p, g, r, s;
    "function" !== typeof JSON.stringify && (f = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        r = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, JSON.stringify = function(a, b, f) {
            var h;
            g = p = "";
            if ("number" === typeof f)
                for (h = 0; h < f; h += 1) g += " ";
            else "string" === typeof f && (g = f); if ((s = b) && "function" !== typeof b && ("object" !== typeof b || "number" !== typeof b.length)) throw Error("JSON.stringify");
            return c("", {
                "": a
            })
        });
    "function" !== typeof JSON.parse && (h = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function(a,
        b) {
        function c(a, e) {
            var k, f, g = a[e];
            if (g && "object" === typeof g)
                for (k in g) Object.prototype.hasOwnProperty.call(g, k) && (f = c(g, k), void 0 !== f ? g[k] = f : delete g[k]);
            return b.call(a, e, g)
        }
        var f;
        a = String(a);
        h.lastIndex = 0;
        h.test(a) && (a = a.replace(h, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return f =
            eval("(" + a + ")"), "function" === typeof b ? c({
                "": f
            }, "") : f;
        throw new SyntaxError("JSON.parse");
    })
})();

function reqFullscreen(a) {
    a.requestFullscreen ? a.requestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen()
}

function cancelFullscreen() {
    document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
}

function getObjWidth(a) {
    var b = 0;
    a.css({
        visibility: "hidden",
        display: "block"
    }).appendTo(document.body);
    b = a.outerWidth();
    a.detach().css({
        visibility: "",
        position: "",
        display: ""
    });
    return b
}

function cookieSettingGet(a) {
    var b = !1;
    rcookie("__cookieobj") && (b = JSON.parse(rcookie("__cookieobj")));
    return b && a in b ? b[a] : !1
}

function cookieSettingSet(a, b) {
    var c = {};
    rcookie("__cookieobj") && (c = JSON.parse(rcookie("__cookieobj")));
    c[a] = b;
    setcookie("__cookieobj", JSON.stringify(c))
}

function dumpf() {
    for (var a = 0; a < arguments.length; ++a) console.log("#" + a, arguments[a])
}

function argSlice(a, b, c) {
    for (var h = [], f = 0; f < a.length; ++f) h.push(a[f]);
    return h.slice(b, c)
}

function gaAll() {
    var a = arguments;
    "send" == arguments[0] && (a = argSlice(a, 1));
    ga(function() {
        for (var b = ga.getAll(), c = 0; c < b.length; ++c) b[c].send.apply(b[c], a)
    })
}
var cm = {
    N_ID: 0,
    N_TITLE: 1,
    N_URL: 2,
    N_SUBMENU: 3,
    N_EXT: 4,
    DIR_LEFT: -1,
    DIR_RIGHT: 1,
    m: [],
    to: [],
    chk: null,
    bindparent: function(a, b, c) {
        var h = $("<a/>").attr("href", a.i[cm.N_URL]).text(a.i[cm.N_TITLE]);
        c = a.p ? a.p[cm.N_SUBMENU] : c;
        h.addClass("sub").data("sm", c).data("chk", a.i[cm.N_ID]).mouseover(function() {
            cm.show(this, 0)
        });
        b && h.appendTp(b);
        return h
    },
    bind: function(a, b, c) {
        c = c || cm.DIR_RIGHT;
        var h = $("<a/>").attr("href", "javascript:;").text(a[cm.N_TITLE]);
        void 0 != a[cm.N_SUBMENU] && a[cm.N_SUBMENU].length && h.addClass("sub").addClass("lzero").data("sm",
            a[cm.N_SUBMENU]).data("dir", c).mouseover(function() {
            cm.show(this, 0)
        });
        b && h.appendTo(b);
        return h
    },
    bindtoid: function(a, b, c) {
        b = $(b);
        a.length && (b.addClass("sub").data("sm", a).mouseover(function() {
            cm.show(this, 0)
        }), void 0 != c && c && b.data("chk", c));
        return b
    },
    bindlist: function(a, b) {
        l = [];
        for (var c = 0; c < a.length; ++c) l[c] = this.bind(a[c]);
        if (b)
            for (c = a.length; 0 <= c; --c) $(b).append(l[c]);
        return l
    },
    show: function(a, b) {
        this.hide(b);
        var c = {
                id: b,
                p: $(a),
                m: $("<ul/>").appendTo("body")
            },
            h = this.m.push(c) - 1;
        $(a).addClass("sel");
        c.m.addClass("menu");
        this.contents(h);
        var f = this.m[h].p.data("dir") || cm.DIR_RIGHT,
            p = $(a).offset().top - 2,
            g = $(a).offset().left;
        f == cm.DIR_LEFT && c.m.addClass("left");
        0 == b ? (p += $(a).outerHeight(), f == cm.DIR_LEFT && (g -= $(this.m[h].m).outerWidth() - $(a).outerWidth())) : g = f == cm.DIR_RIGHT ? g + $(a).outerWidth() : g - $(this.m[h].m).outerWidth();
        p + c.m.outerHeight() > $(window).scrollTop() + $(window).height() && (p -= p + c.m.outerHeight() - ($(window).scrollTop() + $(window).height()));
        g + c.m.outerWidth() > $(window).scrollLeft() + $(window).width() &&
            (g -= g + c.m.outerWidth() - ($(window).scrollLeft() + $(window).width()), p += $(a).outerHeight());
        c.m.css("top", p + "px").css("left", g + "px");
        0 == b && c.m.css("opacity", 0).animate({
            opacity: 1
        }, 250);
        $(a).mouseout(function() {
            cm.r()
        });
        c.m.mouseover(function() {
            cm.s()
        }).mouseout(function() {
            cm.r()
        });
        this.s()
    },
    contents: function(a) {
        var b = this.m[a];
        a = b.p.data("sm");
        for (var c = b.p.data("dir"), h = 0; h < a.length; ++h) {
            var f = $("<li/>").append($("<a/>").attr("href", a[h][cm.N_URL]).click(function() {
                cm.hide(0)
            }).append($("<span/>").text(a[h][cm.N_TITLE]))).appendTo(b.m);
            b.p.data("chk") && b.p.data("chk") == a[h][cm.N_ID] ? f.append($("<img/>").attr("src", "/i/checked.png").addClass("chk")) : void 0 != a[h][cm.N_EXT] && "art" == a[h][cm.N_EXT] && f.append($("<img/>").attr("src", "/i/mn_article.gif").addClass("art"));
            void 0 != a[h][cm.N_SUBMENU] && a[h][cm.N_SUBMENU].length ? (f.addClass("sub"), f.data("sm", a[h][cm.N_SUBMENU]).data("dir", c).mouseover(function() {
                cm.show(this, b.id + 1)
            })) : f.mouseover(function() {
                cm.hide(b.id + 1)
            })
        }
    },
    hide: function(a) {
        for (var b = this.m.length - 1; b >= a; --b) this.m[b].p.removeClass("sel"),
            this.m[b].m.remove();
        this.m = this.m.slice(0, a)
    },
    s: function() {
        this.to && clearTimeout(this.to);
        this.to = null
    },
    r: function() {
        null != this.to && clearTimeout(this.to);
        this.to = setTimeout(function() {
            cm.s();
            cm.hide(0)
        }, 300)
    }
};

function ref(a, b, c) {
    b[a[cm.N_ID]] = {};
    b[a[cm.N_ID]].i = a;
    b[a[cm.N_ID]].p = c;
    if (a[cm.N_SUBMENU])
        for (c = 0; c < a[cm.N_SUBMENU].length; ++c) ref(a[cm.N_SUBMENU][c], b, a)
}

function traversebr(a, b, c) {
    b.push(refs[c][a]);
    refs[c][a].p && traversebr(refs[c][a].p[cm.N_ID], b, c)
}

function buildbreadcrumb(a, b) {
    var c = [];
    traversebr(a, c, b);
    for (var h = [], f = 0; f < c.length; ++f) h.push(cm.bindparent(c[f], !1, menu[b]));
    return h
}

function displaybreadcrumb(a, b, c, h) {
    var f = $("<div/>").addClass("inav");
    a = buildbreadcrumb(a, b);
    for (b = a.length - 1; 0 <= b; --b) f.append(a[b]);
    h && f.append($("<span/>").text(h));
    f.appendTo(c)
}
var pUpload = function(a) {
    this.opts = $.extend({}, {
        getFoldernameCallback: !1,
        checkExistingFileCallback: function() {
            return !1
        },
        onUploadErrorCallback: function() {},
        uploadMethod: "uploadfile",
        progressMethod: "uploadprogress",
        intProgressMethod: "uploadProgress",
        folderid: 0,
        server: "",
        type: window.FormData ? "xhr" : "iframe",
        chkInterval: null,
        progress: {
            current: 0,
            total: 0
        },
        runningAtOnce: 2,
        ctrlPlaceholder: "",
        statusPlaceholder: "",
        customParams: {},
        clearFileCallback: function() {}
    }, a);
    this.uploads = [];
    this.opts.commonUploadList &&
        (this.uploads = this.opts.commonUploadList)
};
pUpload.prototype = {
    uploads: [],
    uploadBase: {
        server: null,
        hash: null,
        name: null,
        size: null,
        xhr: null,
        xhrobj: null,
        form: null,
        iframe: null,
        timeout: null,
        folder: 0,
        status: 0,
        progress: {
            current: 0,
            total: 0
        },
        progresshist: []
    },
    initUpload: function(a, b) {
        console.log("init upload", arguments, this.opts);
        "crypto" == this.opts.type ? this.initCryptoUpload(a, b) : "xhr" == this.opts.type ? this.initXhrUpload(a, b) : "remote" == this.opts.type ? this.initRemoteUpload(a, b) : "drop" == this.opts.type ? this.initDropUpload(a, b) : "folder" == this.opts.type ? this.initFolderUpload(a,
            b) : this.initIframeUpload(a, b);
        return this
    },
    applyCustomParams: function(a) {
        if (this.opts.customParams)
            for (var b in this.opts.customParams) a[b] = this.opts.customParams[b]
    },
    uploadSearch: function(a, b) {
        for (var c = 0; c < this.uploads.length; ++c)
            if (this.uploads[c].name == a && -1 != [0, 1, 2].indexOf(this.uploads[c].status))
                if (b) {
                    if (this.uploads[c].size == b) return this.uploads[c]
                } else this.uploads[c];
        return !1
    },
    handleUpload: function(a, b, c, h) {
        this.uploadSearch(a.name, a.size);
        h = h || {};
        "image.jpg" != a.name || h.renameifexists ||
            (h.renameifexists = 1);
        var f = "upload-" + this.opts.user + "-xhr-" + uniqueNum.get(),
            p = this.uploads.push($.extend({}, this.uploadBase, {
                hash: f,
                server: c,
                name: a.name,
                size: a.size,
                progresshist: []
            })) - 1,
            g = a ? new FormData : "",
            r = this;
        if (!this.opts.checkExistingFileCallback(b, a) || h && (h.overwrite || h.renameifexists)) {
            a && g.append("file", a);
            b = {
                folderid: b,
                progresshash: f,
                nopartial: 1
            };
            if (h && obLength(h))
                for (var s in h) b[s] = h[s];
            this.applyCustomParams(b);
            this.uploads[p].xhrobj = {
                uploadId: p,
                url: HFN.apiMethodUrl(this.uploads[p].server,
                    this.opts.uploadMethod, b),
                type: "POST",
                data: g,
                dataType: "json",
                processData: !1,
                contentType: !1,
                beforeSend: function(a) {
                    r.uploads[this.uploadId].xhr = a;
                    r.uploadStart(this.uploadId)
                },
                success: function(b) {
                    console.log("received ret for upload: ", b);
                    if (b.result) r.opts.onUploadErrorCallback(b);
                    a || (console.log("SHOW UPLOAD FILES REMOTE: ", b.metadata, p, r.opts.statusPlaceholder), r.showFinishedFilesRemote(b.metadata, p, r.opts.statusPlaceholder));
                    r.uploadFinish(this.uploadId, b, b.result ? b.error : !1)
                },
                error: function(a) {
                    1 ==
                        r.uploads[this.uploadId].status && r.uploadFinish(this.uploadId, a, "Upload Interrupted")
                }
            };
            a && this.showUploadingFile(a.name, p, this.opts.statusPlaceholder)
        } else this.showExistingFile(a.name, p, this.opts.statusPlaceholder, this.handleUpload.bind(this, a, b, c, $.extend({}, h, {
            overwrite: 1
        })), this.handleUpload.bind(this, a, b, c, $.extend({}, h, {
            renameifexists: 1
        })))
    },
    dragndrop: {
        enter: function(a) {
            a.preventDefault();
            $(this).addClass("drag-over")
        },
        over: function(a) {
            a.preventDefault()
        },
        leave: function(a) {
            a.preventDefault();
            $(this).removeClass("drag-over")
        }
    },
    initDropUpload: function(a, b) {
        this.opts.chkInterval || (this.opts.chkInterval = setInterval(function() {
            c.checkUploads()
        }, 2E3));
        a = a || 0;
        b = b || "api.pcloud.com";
        var c = this;
        handleUpload = function() {
            c.opts.crypto ? c.handleCryptoUpload.apply(c, arguments) : c.handleUpload.apply(c, arguments)
        };
        $('<div class="dropzone">Drop files here</div>').appendTo(this.opts.ctrlPlaceholder).on("dragenter", this.dragndrop.enter).on("dragover", this.dragndrop.over).on("dragleave", this.dragndrop.leave).on("drop",
            function(h) {
                h.preventDefault();
                if (h.originalEvent.dataTransfer && h.originalEvent.dataTransfer.files.length) {
                    for (var f = h.originalEvent.dataTransfer.files, p = 0, g = h.originalEvent.dataTransfer, r = a; p < g.files.length; ++p)
                        if (h = p, g.items && "string" == g.items[0].kind && (h += 1), g.items && g.items[h] && "file" == g.items[h].kind && (g.items[h].getAsEntry || g.items[h].webkitGetAsEntry)) {
                            var s;
                            g.items[h].getAsEntry ? s = g.items[h].getAsEntry() : g.items[h].webkitGetAsEntry && (s = g.items[h].webkitGetAsEntry());
                            var n = function(a, d, e) {
                                    d.readEntries(function(b) {
                                        if (b.length) {
                                            for (var c =
                                                0; c < b.length; ++c) e.push(b[c]);
                                            n(a, d, e)
                                        } else v(a, e)
                                    }, function() {
                                        console.log("error reading entries")
                                    })
                                },
                                v = function(a, d) {
                                    HFN.getOrCreateFolder(a.name, r, function(a) {
                                        r = a;
                                        console.log("in folder", name, a);
                                        console.log("with entries", d);
                                        for (var c = 0; c < d.length; ++c) d[c].isFile ? function(a, e) {
                                            d[c].file(function(d) {
                                                handleUpload(d, a, e)
                                            })
                                        }(r, b) : d[c].isDirectory && w(d[c])
                                    })
                                },
                                w = function(a) {
                                    console.log("Handilng entry: ", a.name);
                                    var d = a.createReader();
                                    n(a, d, [])
                                };
                            console.log(s);
                            console.log(p, h);
                            console.log(f[p]);
                            console.log(f[h]);
                            s.isDirectory ? w(s) : handleUpload(f[p], a, b)
                        } else handleUpload(f[p], a, b);
                    $(this).hide();
                    c.checkUploads();
                    c.opts.customRenew ? c.opts.customRenew() : HFN.apiMethod("currentserver", {}, function(b) {
                        c.initUpload(a, b.hostname)
                    })
                }
                $(this).removeClass("drag-over")
            })
    },
    startCryptoUpload: function(a) {
        this.uploadStart(a);
        console.log("upid", a);
        console.log(this.uploads[a]);
        var b = this.uploads[a],
            c = this;
        this.uploads[a].encuploadid = pCloudCryptoUpload.uploadFile({
            file: b.file,
            folderid: b.folderid,
            name: b.name,
            callbacks: {
                onBegin: function() {},
                onProgress: function(b, f) {
                    c.saveProgress(a, b, f);
                    c.progressBar(a);
                    "function" == typeof c.opts.customProgress && c.opts.customProgress()
                },
                onFinish: function(b) {
                    c.progressBar(a);
                    b.metadata = [b.metadata];
                    c.uploadFinish(a, b)
                },
                onError: function(b) {
                    1 == c.uploads[a].status && c.uploadFinish(a, !1, b)
                }
            }
        })
    },
    handleCryptoUpload: function(a, b, c, h) {
        console.log("handle upload", a);
        var f = "upload-" + this.opts.user + "-xhr-" + uniqueNum.get(),
            f = this.uploads.push($.extend({}, this.uploadBase, {
                hash: f,
                encuploadid: -1,
                server: c,
                name: a.name,
                file: a,
                size: a.size,
                folderid: b,
                progresshist: [],
                crypto: !0
            })) - 1;
        h = h || {};
        !this.opts.checkExistingFileCallback(b, a) || h && (h.overwrite || h.renameifexists) ? (console.log("uniq name", HFN.uniqFilename(a.name, b)), h.renameifexists && (this.uploads[f].name = HFN.uniqFilename(a.name, b)), this.showUploadingFile(this.uploads[f].name, f, this.opts.statusPlaceholder)) : this.showExistingFile(a.name, f, this.opts.statusPlaceholder, this.handleCryptoUpload.bind(this, a, b, c, $.extend({}, h, {
            overwrite: 1
        })), this.handleCryptoUpload.bind(this,
            a, b, c, $.extend({}, h, {
                renameifexists: 1
            })))
    },
    initCryptoUpload: function(a, b) {
        this.opts.chkInterval || (this.opts.chkInterval = setInterval(function() {
            c.checkUploads()
        }, 2E3));
        console.log("wrap", this.opts);
        var c = this,
            h = $('<div class="button darkbut modernbut linebut uploadbut"><span>' + i18n.get("Browse For Files ...") + "</span></div>").appendTo(this.opts.ctrlPlaceholder);
        $("<input>", {
            type: "file",
            name: "files[]",
            multiple: "multiple"
        }).appendTo(h).change(function() {
            console.log(this.files);
            for (var f = 0; f < this.files.length; ++f) c.handleCryptoUpload(this.files[f],
                a, b);
            $(this).parent().hide();
            c.checkUploads();
            c.opts.customRenew ? c.opts.customRenew() : HFN.apiMethod("currentserver", {}, function(b) {
                c.initUpload(a, b.hostname)
            })
        });
        this.opts.getFoldernameCallback && ($(this.opts.ctrlPlaceholder + " .uploadtofolder").remove(), $(this.opts.ctrlPlaceholder).append('<span class="uploadtofolder"></span>'), this.opts.getFoldernameCallback(a, function(a) {
            a = a || {
                name: "/"
            };
            $(c.opts.ctrlPlaceholder + " .uploadtofolder").append(i18n.get("Uploading to") + ': <img src="//d1q46pwrruta9x.cloudfront.net/img/icons/20/crypto-folder-upload.png" width="20" height="20"> <strong>' +
                htmlentities(HFN.metaName(a)) + "</strong>")
        }))
    },
    initXhrUpload: function(a, b) {
        this.opts.chkInterval || (this.opts.chkInterval = setInterval(function() {
            c.checkUploads()
        }, 2E3));
        a = a || 0;
        b = b || "api.pcloud.com";
        var c = this,
            h = $('<div class="button darkbut modernbut linebut uploadbut"><span>' + i18n.get("Browse For Files ...") + "</span></div>").appendTo(this.opts.ctrlPlaceholder);
        $("<input>", {
            type: "file",
            name: "files[]",
            multiple: "multiple"
        }).appendTo(h).change(function() {
            console.log(this.files);
            for (var f = 0; f < this.files.length; ++f) c.handleUpload(this.files[f],
                a, b);
            $(this).parent().hide();
            c.checkUploads();
            c.opts.customRenew ? c.opts.customRenew() : HFN.apiMethod("currentserver", {}, function(b) {
                c.initUpload(a, b.hostname)
            })
        });
        this.opts.getFoldernameCallback && ($(this.opts.ctrlPlaceholder + " .uploadtofolder").remove(), $(this.opts.ctrlPlaceholder).append('<span class="uploadtofolder"></span>'), this.opts.getFoldernameCallback(a, function(a) {
            a = a || {
                name: "/"
            };
            $(c.opts.ctrlPlaceholder + " .uploadtofolder").append(i18n.get("Uploading to") + ': <img src="//d1q46pwrruta9x.cloudfront.net/img/icons/20/folder.png" width="20" height="20"> <strong>' +
                htmlentities(HFN.metaName(a)) + "</strong>")
        }))
    },
    initFolderUpload: function(a, b) {
        this.opts.chkInterval || (this.opts.chkInterval = setInterval(function() {
            c.checkUploads()
        }, 2E3));
        a = a || 0;
        b = b || "api.pcloud.com";
        var c = this;
        handleUpload = function() {
            c.opts.crypto ? c.handleCryptoUpload.apply(c, arguments) : c.handleUpload.apply(c, arguments)
        };
        wrap = $('<div class="button darkbut modernbut linebut uploadbut"><span>' + i18n.get("Pick Folder ...") + "</span></div>").appendTo(this.opts.ctrlPlaceholder);
        $("<input>", {
            type: "file",
            name: "files[]",
            multiple: "multiple",
            webkitdirectory: "",
            directory: ""
        }).appendTo(wrap).change(function() {
            for (var h = {}, f = function(a, c) {
                for (var h in a) "files" != h && function(a, c) {
                    HFN.getOrCreateFolder(h, c, function(c) {
                        if (a.files)
                            for (var g = 0; g < a.files.length; ++g) handleUpload(a.files[g], c, b);
                        f(a, c)
                    })
                }(a[h], c)
            }, p = 0; p < this.files.length; ++p) appendTree(h, parsePath(this.files[p].webkitRelativePath), this.files[p]);
            f(h, a);
            $(this).parent().hide();
            c.checkUploads();
            c.opts.customRenew ? c.opts.customRenew() : HFN.apiMethod("currentserver", {}, function(b) {
                c.initUpload(a, b.hostname)
            })
        });
        this.opts.getFoldernameCallback && ($(this.opts.ctrlPlaceholder + " .uploadtofolder").remove(), $(this.opts.ctrlPlaceholder).append('<span class="uploadtofolder"></span>'), this.opts.getFoldernameCallback(a, function(a) {
            a = a || {
                name: "/"
            };
            var b = "folder.png";
            c.opts.crypto && (b = "crypto-folder-upload.png");
            $(c.opts.ctrlPlaceholder + " .uploadtofolder").append(i18n.get("Uploading to") + ': <img src="//d1q46pwrruta9x.cloudfront.net/img/icons/20/' + b + '" width="20" height="20"> <strong>' +
                htmlentities(HFN.metaName(a)) + "</strong>")
        }))
    },
    initRemoteUpload: function(a, b) {
        a = a || 0;
        b = b || "api.pcloud.com";
        $(this.opts.ctrlPlaceholder).removeClass("disabled");
        var c = this,
            h, f;
        f = $('<textarea class="remotearea tarea" name="upload" placeholder="' + i18n.get("Links to files") + '"></textarea>').appendTo(this.opts.ctrlPlaceholder);
        h = $('<button type="button" class="button darkbut modernbut">' + i18n.get("Upload") + "</button>").on("click", function() {
            var f = $(this).siblings("textarea[name=upload]").val(),
                g = {},
                h = !1;
            if (!(5 > f.length)) {
                console.log("REMOTE ", f);
                if (h = f.match(/"name: ([^"]+)+"/)) {
                    var s = h[1].trim(),
                        s = s.replace(/:/g, ";"),
                        s = s.replace(/\\/g, "|"),
                        s = s.replace(/\//g, "|");
                    g.target = s;
                    f = f.replace(h[0], "")
                }
                g.url = f;
                c.handleUpload(!1, a, b, g);
                c.checkUploads();
                $(this).siblings("textarea[name=upload]").val("")
            }
        }).appendTo(this.opts.ctrlPlaceholder);
        this.opts.crypto && (h.off("click"), $(this.opts.ctrlPlaceholder).append('<div class="disabled"></div>').addClass("disabled"), f.text("Remote downloading is disabled for encrypted folders."))
    },
    initIframeUpload: function(a, b) {
        var c, h, f = "upload-" + this.opts.user + "-iframe-" + uniqueNum.get(),
            p = this.uploads.push($.extend({}, this.uploadBase, {
                status: -1,
                hash: f,
                server: b,
                progresshist: []
            })) - 1,
            g = this.uploads[p];
        g.iframe = c = $('<iframe src="javascript:false;" style="display: none;" name="' + f + '"></iframe>').appendTo(document.body);
        var r = {
            folderid: a,
            progresshash: f,
            nopartial: 1
        };
        this.applyCustomParams(r);
        var s = this,
            n = $('<div class="button darkbut modernbut linebut uploadbut"><span>' + i18n.get("Browse For Files ...") +
                "</span></div>");
        g.form = h = $("<form>", {
            action: HFN.apiMethodUrl(g.server, this.opts.uploadMethod, r),
            enctype: "multipart/form-data",
            method: "POST",
            target: f
        }).append(n.append($("<input>", {
            type: "file",
            name: "files"
        }).on("startUpload", function(a) {
            h.submit();
            s.uploadStart(p);
            c.unbind("load").bind("load", p, function(a) {
                console.log(a.data);
                s.uploadFinish(a.data, !1)
            })
        }).on("change", function(b) {
            $(this).parent().hide();
            s.showUploadingFile(basename(this.value, "\\"), p, s.opts.statusPlaceholder);
            s.checkUploads();
            s.uploads[p].status =
                0;
            HFN.apiMethod("currentserver", {}, function(b) {
                s.initUpload(a, b.hostname)
            })
        }))).appendTo(this.opts.ctrlPlaceholder);
        this.opts.getFoldernameCallback && ($(this.opts.ctrlPlaceholder + " .uploadtofolder").remove(), $(this.opts.ctrlPlaceholder).append('<span class="uploadtofolder"></span>'), this.opts.getFoldernameCallback(a, function(a) {
            console.log(a);
            $(s.opts.ctrlPlaceholder + " .uploadtofolder").append(i18n.get("Uploading to") + ': <img src="//d1q46pwrruta9x.cloudfront.net/img/icons/20/folder.png" width="20" height="20"> <strong>' +
                htmlentities(HFN.metaName(a)) + "</strong>")
        }))
    },
    showUploadingFiles: function(a, b) {
        console.log("SHOW UPLOAD FILES", arguments);
        for (var c = 0; c < a.length; ++c) self.showUploadingFile(a[c].name, b)
    },
    showUploadingFile: function(a, b, c) {
        console.log("SHOW UPLOAD FILE", arguments);
        var h = this,
            f = $("<div>", {
                "class": "file"
            }).disableSelection().append($('<span class="name">').text(a)).append($('<div class="progress"><div class="bar"></div></div>')).append($('<div class="percent">' + i18n.get("Waiting ...") + "</div>")).append('<div class="total"></div>').append($('<span class="cancel">' +
                i18n.get("Abort") + "</span>").disableSelection().on("click", function(a) {
                a.stopPropagation();
                $(this).text(i18n.get("Aborting ..."));
                h.uploadAbort(b);
                $(this).parent().remove()
            })).addClass(this.uploads[b].hash).appendTo(this.opts.statusPlaceholder);
        this.uploads[b].crypto && (f.addClass("encrypted"), f.find("span.name").prepend($('<img src="//d1q46pwrruta9x.cloudfront.net/img/crypto-upload.png" class="encrypted">').attr("title", __("encrypted_upload", "Encrypted Upload")).tooltip({
            container: ".upload-container"
        })));
        console.log("appending to " + this.opts.statusPlaceholder)
    },
    showExistingFile: function(a, b, c, h, f) {
        this.uploads[b].status = -1;
        var p = this;
        $("<div>", {
            "class": "file existing"
        }).disableSelection().append($("<span>").text(a)).append($('<div class="explain">' + i18n.get("File with the name") + ' <b title="' + a + '">"' + HFN.strFit(a, 28) + '"</b> ' + i18n.get("already exists") + ": &nbsp;</div>").append($("<span>").text(i18n.get("Skip")).addClass("skip").on("click", function(a) {
            a.stopPropagation();
            p.uploadAbort(b);
            $(this).parent().parent().remove()
        })).append(" (").append($("<span>").text(i18n.get("All")).on("click",
            function(a) {
                a.stopPropagation();
                $(".upload .skip").trigger("click")
            })).append(")").append(" | ").append($("<span>").addClass("overwrite").text(i18n.get("Overwrite")).on("click", function(a) {
            a.stopPropagation();
            p.uploadAbort(b);
            $(this).parent().parent().remove();
            h()
        })).append(" (").append($("<span>").text(i18n.get("All")).on("click", function(a) {
            $(".upload .overwrite").trigger("click")
        })).append(")").append(" | ").append($("<span>").addClass("makeunique").text(i18n.get("Rename")).on("click", function(a) {
            a.stopPropagation();
            p.uploadAbort(b);
            $(this).parent().parent().remove();
            f()
        })).append(" (").append($("<span>").text("All").on("click", function(a) {
            $(".upload .makeunique").trigger("click")
        })).append(")")).addClass(this.uploads[b].hash).appendTo(this.opts.statusPlaceholder);
        console.log("appending to " + this.opts.statusPlaceholder)
    },
    showUploadingFilesRemote: function(a, b, c) {
        console.log("SHOW UPLOAD FILE", arguments);
        if (a && a.length) {
            var h = this,
                f = 0,
                p = $('<div class="file remote uploading"></div>').disableSelection();
            $('<div class="filelist"></div>');
            if (function(a) {
                for (; 0 <= a.length; ++f)
                    if ("error" != a[0].status) return !0;
                return !1
            }(a)) {
                for (; f < a.length; ++f) "error" != a[f].status && a[f].status && $('<div class="eachfile clearfix"></div>').append('<span class="filename">' + a[f].url + "</span>").append('<div class="progress"><div class="bar"></div></div>').append('<div class="percent">Waiting ...</div>').append('<div class="total"></div>').addClass("upload-" + f).appendTo(p);
                p.find(".eachfile").length && (p.append($('<span class="cancel">' + i18n.get("Abort") + "</span>").disableSelection().on("click",
                    function(a) {
                        a.stopPropagation();
                        $(this).text("Aborting ...");
                        $(this).parent().remove();
                        h.uploadAbort(b)
                    })).addClass(this.uploads[b].hash).appendTo(this.opts.statusPlaceholder), console.log("appending to " + this.opts.statusPlaceholder))
            }
        }
    },
    showFinishedFilesRemote: function(a, b, c) {
        if (a)
            if (a.length) {
                $(this.opts.statusPlaceholder + " ." + this.uploads[b].hash).length && $(this.opts.statusPlaceholder + " ." + this.uploads[b].hash).remove();
                var h = this;
                c = 0;
                var f = $('<div class="file remote uploading"></div>').disableSelection();
                $('<div class="filelist"></div>');
                for (var p = []; c < a.length; ++c) p.push(a[c]);
                $('<div class="eachfile clearfix"></div>').append('<span class="filename">' + p.join(", ") + "</span>").append('<div class="progress"><div class="bar"></div></div>').append('<div class="percent">Waiting ...</div>').append('<div class="total"></div>').addClass("upload-" + c).appendTo(f);
                f.append($('<span class="cancel">' + i18n.get("Abort") + "</span>").disableSelection().on("click", function(a) {
                    a.stopPropagation();
                    $(this).text("Aborting ...");
                    h.uploadAbort(b);
                    $(this).parent().remove()
                })).addClass(this.uploads[b].hash).appendTo(this.opts.statusPlaceholder);
                console.log("appending to " + this.opts.statusPlaceholder)
            } else HFN.message("This URL link is not accessible. Please, choose another download link.", "error")
    },
    checkUploads: function() {
        for (var a = 0, b = 0; a < this.uploads.length; ++a)
            if (1 == this.uploads[a].status)++b;
        else if (0 == this.uploads[a].status && b < this.opts.runningAtOnce)
            if (this.uploads[a].crypto) this.startCryptoUpload(a), this.uploads[a].status =
                1, ++b;
            else if (this.uploads[a].xhrobj) $.ajax(this.uploads[a].xhrobj), ++b, this.uploads[a].status = 1;
        else {
            var c = this.uploads[a].form.find("input[type=file]").get(0);
            if (c.files && c.files.length || c.value) $(c).trigger("startUpload"), ++b, this.uploads[a].status = 1
        }
    },
    uploadStart: function(a) {
        this.uploads[a].status = 1;
        this.uploads[a].crypto || setTimeout(this[this.opts.intProgressMethod].bind(this, a, !0), 80);
        a = $("." + this.uploads[a].hash);
        a.hasClass("uploading") || a.addClass("uploading");
        a.find(".percent").text(i18n.get("Starting ..."))
    },
    remoteProgress: function(a, b) {
        var c = {
            progresshash: this.uploads[a].hash
        };
        this.applyCustomParams(c);
        var h = this;
        $.getJSON("https://" + this.uploads[a].server + "/" + this.opts.progressMethod, c, function(b) {
            if (2 != h.uploads[a].status && (!h.uploads[a].timeout || -1 != h.uploads[a].timeout)) {
                if (0 == b.result) {
                    $("." + h.uploads[a].hash).length || (h.showUploadingFilesRemote(b.files, a, h.opts.statusPlaceholder), $("." + h.uploads[a].hash));
                    if (0 == b.result && !b.finished && b.files) {
                        for (var c = 0, g = 0, r = 0; r < b.files.length; ++r) b.files[r].downloaded &&
                            b.files[r].size && (h.progressBarRemote(a, r, b.files[r].downloaded, b.files[r].size, b.files[r].status), c += b.files[r].downloaded, g += b.files[r].size);
                        c && g && h.saveProgress(a, c, g, b.files)
                    }
                    "function" == typeof h.opts.customProgress && h.opts.customProgress()
                }
                h.uploads[a].timeout = setTimeout(h.remoteProgress.bind(h, a), 0 == b.status ? 1E3 : 250)
            }
        })
    },
    uploadProgress: function(a) {
        var b = {
            progresshash: this.uploads[a].hash
        };
        this.applyCustomParams(b);
        var c = this;
        $.getJSON("https://" + this.uploads[a].server + "/" + this.opts.progressMethod,
            b, function(b) {
                console.log("Received progress: ", b);
                console.log("upload is: ", c.uploads[a]);
                if (2 != c.uploads[a].status && (!c.uploads[a].timeout || -1 != c.uploads[a].timeout)) {
                    console.log("Still Here");
                    var f = $("." + c.uploads[a].hash);
                    console.log("File Div ", f);
                    console.log("ret ", b.uploaded, b.total);
                    b.uploaded != b.total && (console.log("Saving progress: ", b), c.saveProgress(a, b.uploaded, b.total), c.progressBar(a));
                    "function" == typeof c.opts.customProgress && c.opts.customProgress();
                    c.uploads[a].timeout = setTimeout(c.uploadProgress.bind(c,
                        a), 1E3)
                }
            })
    },
    progressBar: function(a) {
        var b = $("." + this.uploads[a].hash),
            c = this.uploads[a].progress;
        a = this.calcSpeed(a);
        b.find(".bar").css("width", Number(100 * (c.current / c.total)).toFixed(5) + "%");
        b.find(".total").text(HFN.formatSize(c.total));
        c.current == c.total && b.find(".percent").text(i18n.get("Completed."));
        b.find(".percent").text(i18n.get("Uploading") + "  " + Number(100 * (c.current / c.total)).toFixed(1) + "%" + a)
    },
    progressBarRemote: function(a, b, c, h, f) {
        console.log("PROGRESS REMOTE ", "." + this.uploads[a].hash +
            (b ? "upload-" + b : ""));
        var p = $("." + this.uploads[a].hash + (b ? " .upload-" + b : ""));
        a = this.calcSpeed(a, b);
        console.log("estimate ", b, a);
        p.find(".bar").css("width", Number(100 * (c / h)).toFixed(5) + "%");
        p.find(".total").text(HFN.formatSize(h));
        c == h && p.find(".percent").text(i18n.get("Completed."));
        p.find(".percent").text(__(f, f.charAt(0).toUpperCase() + f.substr(1)) + " " + Number(100 * (c / h)).toFixed(1) + "%" + a)
    },
    saveProgress: function(a, b, c, h) {
        this.uploads[a].progress = {
            current: b,
            total: c
        };
        if (h)
            for (var f = 0; f < h.length; ++f) this.uploads[a].progresshist[f] ||
                (this.uploads[a].progresshist[f] = []), this.uploads[a].progresshist[f].push({
                    current: h[f].downloaded,
                    total: h[f].size,
                    time: (new Date).getTime()
                }), 100 < this.uploads[a].progresshist[f].length && this.uploads[a].progresshist[f].shift();
        else this.uploads[a].progresshist.push({
            uid: a,
            current: b,
            total: c,
            time: (new Date).getTime()
        }), 100 < this.uploads[a].progresshist.length && this.uploads[a].progresshist.shift();
        this.opts.reportTo && (this.opts.reportTo[this.uploads[a].hash] = {
            current: b,
            total: c
        })
    },
    calcSpeed: function(a,
        b) {
        var c = void 0 != b ? this.uploads[a].progresshist[b] || [] : this.uploads[a].progresshist;
        if (5 > c.length) return " ";
        var h = c.length,
            f = 0,
            p = 0,
            g, r, s, f = c[h - 1].current - c[0].current,
            p = c[h - 1].time - c[0].time;
        r = c[0].total;
        g = c[h - 1].current;
        s = (c[h - 1].current - c[h - 2].current) / ((c[h - 1].time - c[h - 2].time) / 1E3);
        f = 0.4 * s + 0.6 * (f / (p / 1E3));
        0 > s && (console.log(c[h - 1]), console.log(c[h - 2]));
        return isNaN(f) ? " " : ", " + (f / 1024).toFixed(1) + "kb/s, " + i18n.get("time left") + ": " + HFN.formatTime(Math.round((r - g) / f), !0)
    },
    uploadAbortAll: function() {
        for (var a in this.uploads) 1 !=
            this.uploads[a].status && 0 != this.uploads[a].status || this.uploadAbort(a)
    },
    uploadAbort: function(a) {
        this.uploads[a].status = 3;
        this.uploads[a].crypto ? -1 != this.uploads[a].encuploadid && pCloudCryptoUpload.abort(this.uploads[a].encuploadid) : this.uploads[a].xhr ? this.uploads[a].xhr.abort() : (this.uploads[a].iframe && this.uploads[a].iframe.remove(), this.uploads[a].form && this.uploads[a].form.remove());
        clearTimeout(this.uploads[a].timeout);
        this.uploads[a].timeout = -1;
        this.uploads[a].status = 3;
        this.saveProgress(a, 0,
            0);
        "function" == typeof this.opts.customProgress && this.opts.customProgress()
    },
    uploadFinish: function(a, b, c) {
        this.uploads[a].status = 2;
        this.checkUploads();
        clearTimeout(this.uploads[a].timeout);
        this.uploads[a].timeout = -1;
        this.uploads[a].xhr = null;
        this.uploads[a].xhrobj = null;
        this.uploads[a].iframe && (this.uploads[a].iframe.remove(), this.uploads[a].iframe = null);
        this.uploads[a].form && (this.uploads[a].form.remove(), this.uploads[a].form = null);
        var h = $("." + this.uploads[a].hash);
        h.find(".bar").css("width", "100%");
        h.find(".percent").text(i18n.get("Completed."));
        h.find(".cancel").unbind().remove();
        if (b && !c && b.metadata) {
            h.find("span").empty();
            console.log(b);
            console.log(b.metadata);
            for (var f = 0, p; f < b.metadata.length; ++f) p = $('<span class="islink"></span>'), p.on("click", {
                    k: f
                }, function(a) {
                    a.stopPropagation();
                    a = a.data.k;
                    console.log(b, a);
                    HFN.config.isSite() && HFN.uploadControl.minimize();
                    $.bbq.pushState({
                        page: "filemanager",
                        folder: b.metadata[a].parentfolderid,
                        file: b.metadata[a].id,
                        prev: 1
                    }, 2)
                }), b.metadata[f] && b.metadata[f].name &&
                p.text(b.metadata[f].name), p.appendTo($(h.find("span")[0])), this.uploads[a].crypto && h.find("span.name").prepend($('<img src="//d1q46pwrruta9x.cloudfront.net/img/crypto-upload.png" class="encrypted">').attr("title", __("encrypted_upload", "Encrypted Upload")).tooltip({
                    container: ".upload-container"
                }))
        }
        c && (h.find(".percent").text("Error: " + c), h.find(".bar").addClass("error"));
        console.log("UPLOAD FINISH: ", b);
        c = this.uploads[a].progress.total;
        this.saveProgress(a, c, c);
        "function" == typeof this.opts.customProgress &&
            this.opts.customProgress();
        var g = this;
        h.append($("<span>").addClass("remove").text(i18n.get("Clear")).click(function(b) {
            g.uploads[a].status = 4;
            b.stopPropagation();
            $(this).parent().remove();
            g.opts.clearFileCallback && g.opts.clearFileCallback()
        }));
        this.opts.finishCall && this.opts.finishCall()
    }
};

function parsePath(a) {
    a = a.split("/");
    return a.slice(0, a.length - 1)
}

function appendTree(a, b, c) {
    for (var h = 0; h < b.length; ++h) a[b[h]] || (a[b[h]] = {}), a = a[b[h]];
    a.files || (a.files = []);
    "." != c.name && a.files.push(c)
}
var dropDown = {
        N_TEXT: 0,
        N_HREF: 1,
        N_SUB: 2,
        N_EXPLN: 5,
        DIR_RIGHT: 1,
        DIR_LEFT: -1,
        DIR_DOWN: 1,
        DIR_UP: -1,
        defaultOpts: {
            mouseTrigger: !1,
            direction: 1,
            vdirection: 1,
            childDirection: 1,
            eventTrigger: "mouseover",
            eventClose: "mouseout",
            position: "absolute",
            holderClass: !1,
            reverseDirections: !1,
            showTip: !0,
            buildCell: function(a, b) {
                return $("<a>").attr("href", a[dropDown.N_HREF]).append($("<li>").html(a[dropDown.N_TEXT] + "")).on("click", function(a) {
                    dropDown.resetTo(0)
                }).appendTo(b)
            },
            buildHolder: function() {},
            onOpen: function() {},
            onClose: function() {}
        },
        stack: [],
        timeOut: null,
        triggerList: function(a, b, c) {
            c = $.extend({}, this.defaultOpts, c, {
                mouseTrigger: !0
            });
            b = $('<div class="contextholder"></div>', {
                width: "1px",
                height: "1px",
                position: "absolute"
            }).css({
                left: b.x - 2,
                top: b.y - 2
            }).appendTo(document.body);
            c.onClose = function(a) {
                a.unbind().remove()
            }.bind(null, b);
            b.data("mn", {
                list: a,
                opts: c
            });
            dropDown.show(b, 0)
        },
        bindList: function(a, b, c) {
            c = $.extend({}, this.defaultOpts, c);
            c.reverseDirections && (c.direction *= -1, c.childDirection *= -1);
            b.disableSelection().data("mn", {
                list: a,
                opts: c
            }).off(".ddown").on(c.eventTrigger + ".ddown", function(a) {
                a.stopPropagation();
                "click" == c.eventClose && $(b).hasClass("opn") ? ($(document).off(".outorigin"), dropDown.close()) : dropDown.show(this, 0)
            })
        },
        unbindList: function(a) {
            a.removeData("mn").off(".ddown");
            $(document).off(".outorigin")
        },
        show: function(a, b) {
            if ($(a).hasClass("opn")) console.log("stoping");
            else {
                this.resetTo(b);
                var c = {
                        lvl: b,
                        parent: $(a),
                        el: $('<div class="mn-holder mnnew jsmin"></div>').append("<ul>").appendTo("body")
                    },
                    h = this.stack.push(c) -
                    1,
                    f = $(a).offset().top,
                    p = $(a).offset().left,
                    g = $(a).data("mn").opts,
                    r = b && g.childDirection || g.direction,
                    s = g.vdirection,
                    n = g.childDirection;
                b && c.el.addClass("sub");
                g.buildHolder(c.el);
                console.log("DIR", b, g);
                $(a).addClass("opn");
                c.el.addClass("mnnew jsmn");
                g.holderClass && c.el.addClass(g.holderClass);
                this.contents(h);
                n == dropDown.DIR_LEFT && c.el.addClass("leftdir");
                f + c.el.outerHeight() + 5 > $(window).scrollTop() + $(window).height() && g.vdirection == dropDown.DIR_DOWN && (s = dropDown.DIR_UP);
                p + c.el.outerWidth() > $(window).scrollLeft() +
                    $(window).width() && g.direction == dropDown.DIR_RIGHT && (r = dropDown.DIR_LEFT);
                p - $(window).scrollLeft() < c.el.outerWidth() && g.direction == dropDown.DIR_LEFT && (r = dropDown.DIR_RIGHT);
                console.log("left is", p);
                console.log("wi", c.el.outerWidth());
                0 == b ? (s == dropDown.DIR_UP ? (f -= c.el.outerHeight(), g.showTip && (f -= 10)) : (f += $(a).outerHeight(), g.showTip && (f += 10)), r == dropDown.DIR_LEFT && (p -= $(this.stack[h].el).outerWidth() - $(a).outerWidth())) : p = r == dropDown.DIR_RIGHT ? p + $(a).outerWidth() : p - $(this.stack[h].el).outerWidth();
                0 == b && g.showTip && (n = $('<div class="tip"></div>').appendTo(c.el), s == dropDown.DIR_UP ? c.el.addClass("top") : c.el.addClass("bottom"), r = r == dropDown.DIR_LEFT ? "right" : "left", s = $(a).outerWidth() / 2 - n.outerWidth() / 2, g.overwriteTip && (s = g.overwriteTip.left || g.overwriteTip.right), n.css(r, s));
                "fixed" == g.position && (f -= $(window).scrollTop(), p -= $(window).scrollLeft());
                c.el.css("top", f + "px").css("left", p + "px").css("position", g.position);
                console.log("dataobj", c.el);
                0 == h && c.el.css("opacity", 0).animate({
                    opacity: 1
                }, 250);
                if ("mouseout" == g.eventClose) $(a).on("mouseout.ddown", this.reset.bind(this)), c.el.on("mouseover.ddown", this.stop.bind(this)), c.el.on("mouseout.ddown", this.reset.bind(this));
                else $(document).off(".outorigin").on("click.outorigin", function(a) {
                    console.log("click out origin", a);
                    $(document).off(".outorigin");
                    dropDown.close()
                });
                g.onOpen()
            }
            this.stop()
        },
        contents: function(a) {
            console.log("stack data: ", this.stack[a]);
            var b = 0,
                c = this.stack[a].parent.data("mn").list,
                h = this.stack[a].parent.data("mn").opts,
                f;
            console.log("list",
                c);
            for (console.log("opts", h); b < c.length; ++b)
                if (f = h.buildCell(c[b], this.stack[a].el.find("ul")), c[b][dropDown.N_SUB] && c[b][dropDown.N_SUB].length) f.addClass("sub").data("mn", {
                    list: c[b][dropDown.N_SUB],
                    opts: h
                }).on("mouseover", function(b) {
                    dropDown.show(this, a + 1)
                });
                else f.on("mouseover", function(b) {
                    dropDown.resetTo(a + 1)
                })
        },
        resetTo: function(a) {
            for (var b = this.stack.length - 1; b >= a; --b) {
                if (0 == b && this.stack[b].parent.data("mn") && this.stack[b].parent.data("mn").opts) this.stack[b].parent.data("mn").opts.onClose();
                this.stack[b].el.remove();
                this.stack[b].parent.removeClass("opn")
            }
            this.stack = this.stack.slice(0, a)
        },
        stop: function() {
            this.timeOut && clearTimeout(this.timeOut);
            this.timeOut = null
        },
        reset: function() {
            this.timeOut && clearTimeout(this.timeOut);
            this.timeOut = setTimeout(function() {
                dropDown.stop();
                dropDown.resetTo(0)
            }, 400)
        },
        close: function() {
            this.stop();
            this.resetTo(0)
        }
    },
    popOver = {
        defaultOpts: {
            el: "",
            pos: "left",
            align: "top",
            valign: "center",
            trigger: "click",
            to: null,
            objClass: "",
            genClass: "popoverObj",
            position: "fixed",
            evNamespace: ".po",
            spacing: 5,
            centered: !0,
            single: !0,
            elOpenClass: "popover-opened",
            appendTo: "sibling",
            onOpen: function() {},
            onClose: function() {}
        },
        attach: function(a) {
            a = $.extend({}, this.defaultOpts, a);
            "string" == typeof a.el && -1 != ["#", "."].indexOf(a.el.charAt(0)) && (a.el = $(a.el));
            a.obj && !a.el.data("popover") && (a.obj = a.el.data("popover", a.obj), delete a.obj);
            a.objClass = uniqueNum.get("popoverObj");
            console.log("attach", a);
            var b = this,
                c = a.el;
            delete a.el;
            console.log("!!!", c.data("popover"));
            if (c.data("popover")) c.data("opts",
                a).off(a.evNamespace).on(a.trigger + a.evNamespace, function(c) {
                c.stopPropagation();
                b.isOpen(a) && "click" == a.trigger ? b.close($(this)) : b.open($(this))
            })
        },
        update: function(a, b, c) {
            a.data("popover", b);
            c && (a.data("obj").off(".po").detach(), popOver.draw(a))
        },
        setupClose: function(a) {
            var b = this,
                c = a.data("obj"),
                h = a.data("opts");
            "click" == h.trigger ? ($(document).on("click" + h.evNamespace, function(c) {
                $(c.target).hasClass(h.objClass) || $(c.target).closest("." + h.objClass).length || b.close(a)
            }), this.handleTouch = function(c) {
                $(c.target).hasClass(h.objClass) ||
                    $(c.target).closest("." + h.objClass).length || (c.stopImmediatePropagation(), c.preventDefault(), b.close(a))
            }, document.addEventListener("touchstart", this.handleTouch)) : (a.mouseleave(this.set.bind(this, a)), c.on("mouseleave.po", this.set.bind(this, a)), c.on("mouseenter.po", this.stop.bind(this, a)), a.mouseenter(this.stop.bind(this, a)));
            $(window).on("resize" + h.evNamespace, function(c) {
                b.position(a)
            });
            $(window).on("keyup" + h.evNamespace, function(a) {
                b.closeAll()
            })
        },
        draw: function(a) {
            var b = a.data("opts"),
                c = a.data("popover");
            a.data("obj", c);
            var h;
            h = "sibling" == b.appendTo ? a.parent() : $(b.appendTo);
            c.appendTo(h).show().addClass(b.objClass).addClass(b.genClass);
            c.addClass(b.pos).addClass("a" + b.align).addClass("v" + b.valign);
            this.position(a)
        },
        open: function(a) {
            var b = a.data("opts");
            a.data("popover");
            b.single && $(".popover-opened").length && this.close($(".popover-opened"));
            this.draw(a);
            a.addClass(b.elOpenClass);
            this.setupClose(a);
            b.onOpen()
        },
        position: function(a) {
            var b = a.data("popover"),
                c = a.data("opts");
            console.log("offset", a.offset());
            console.log("obj dim", b.outerWidth(), b.outerHeight());
            console.log("opts", c);
            var h = a.offset().left,
                f = a.offset().top - $(window).scrollTop();
            "top" == c.pos ? f -= b.outerHeight() + c.spacing : "bottom" == c.pos ? f += a.outerHeight() + c.spacing : "left" == c.pos ? h -= b.outerWidth() + c.spacing : "right" == c.pos && (h += a.outerWidth() + c.spacing);
            "left" == c.align ? 1 : "right" == c.align ? h -= b.outerWidth() - a.outerWidth() : "top" == c.align ? 1 : "bottom" == c.align ? f -= b.outerWidth() - a.outerHeight() : "center" == c.align && (h -= b.outerWidth() / 2 - a.outerWidth() /
                2);
            "top" == c.valign ? 1 : "bottom" == c.valign ? f -= b.outerHeight() - a.outerHeight() : "center" == c.valign && (f -= b.outerHeight() / 2 - a.outerHeight() / 2);
            b.css({
                top: f,
                left: h,
                position: c.position
            })
        },
        close: function(a) {
            var b = a.data("opts"),
                c = a.data("obj");
            console.log("closing", a, b, c);
            $(window).off(b.evNamespace);
            $(document).off(b.evNamespace);
            document.removeEventListener("touchstart", this.handleTouch);
            a.removeClass(b.elOpenClass);
            console.log("obj is this", c);
            c && c.off(".po").detach();
            b.onClose();
            console.log("closed", b)
        },
        isOpen: function(a) {
            return $("." + a.objClass).length
        },
        set: function(a) {
            var b = this,
                c = a.data("opts");
            c.to && clearTimeout(c.to);
            c.to = setTimeout(function() {
                b.close(a)
            }, 350)
        },
        stop: function(a) {
            a = a.data("opts");
            clearTimeout(a.to)
        },
        closeAll: function() {
            console.log("closing all");
            var a = this;
            $(".popover-opened").each(function(b, c) {
                console.log(c, b);
                a.close($(c))
            })
        }
    },
    comboCheck = function(a) {
        this.opts = $.extend({}, this.defaultOpts, a);
        this.status = 0;
        this.idClass = "combochk-" + this.opts.name;
        this.evNamespace = ".cc" + this.opts.name;
        console.log(this);
        this.init()
    };
comboCheck.prototype = {
    defaultOpts: {
        name: "combo",
        place: "",
        preload: []
    },
    init: function() {
        this.render();
        this.close()
    },
    render: function() {
        var a = $(this._tmpl.main.replace("{title}", this.opts.title)).disableSelection().appendTo(this.opts.place),
            b = $(this._tmpl.wrap.replace("{title}", this.opts.title)).disableSelection().appendTo(a),
            c = 0,
            h = this;
        for (console.log("!preload", this.opts); c < this.opts.values.length; ++c) {
            var f = $(this._tmpl.elem.split("{name}").join(this.opts.name).split("{value}").join(this.opts.values[c][this.opts.valKey]).split("{title}").join(this.opts.values[c][this.opts.valTitle])).appendTo(b.find(".options"));
            this.opts.preload.length &&
                -1 != this.opts.preload.indexOf(this.opts.values[c][this.opts.valKey]) && f.find("input").prop("checked", !0)
        }
        a.addClass(this.idClass);
        a.find(".ctrl").on("click", function(a) {
            $(a.target).hasClass("trig") && h.isOpen() ? h.close() : h.isClosed() && h.open()
        });
        a.find("input[type=checkbox]").on("change", function(a) {
            a.stopPropagation();
            $(h.opts.place).trigger("change", {
                vals: h.vals()
            })
        });
        a.find(".comboopen .options div").on("click", function(a) {
            "div" == a.target.tagName.toLowerCase() && (a = $(this).find("input"), a.prop("checked", !a.prop("checked")).trigger("change"))
        });
        this.obj = a
    },
    isSame: function(a) {
        return !!$(a).parents("." + this.idClass).length
    },
    trigger: function() {
        this.isOpen() ? this.close() : this.open()
    },
    open: function() {
        this.obj.find(".comboopen").show();
        this.obj.addClass("isopen");
        this.status = 1;
        var a = this;
        $(document).on("click" + this.evNamespace, function(b) {
            $(b.target).parents("." + a.idClass).length || a.close()
        });
        $(this.opts.place).trigger("open")
    },
    close: function() {
        this.obj.find(".comboopen").hide();
        this.obj.removeClass("isopen");
        this.status = 0;
        $(document).off(this.evNamespace);
        $(this.opts.place).trigger("close")
    },
    isOpen: function() {
        return !!this.status
    },
    isClosed: function() {
        return !this.status
    },
    vals: function() {
        var a = [];
        this.obj.find('input[name="' + this.opts.name + '[]"]:checked').each(function(b, c) {
            a.push($(c).val())
        });
        return a
    },
    _tmpl: {
        main: '<div class="combocheck">\n<div class="ctrl">\n<span class="title">{title}</span>\n<span class="trigger trig"><img src="/img/b/select-arrow.png" class="trig"></span>\n</div>\n</div>',
        wrap: '<div class="comboopen">\n<div class="ctrl">\n<span class="title">{title}</span>\n<span class="trigger trig"><img src="/img/b/select-arrow.png" class="trig"></span>\n</div>\n<div class="options"></div>\n</div>',
        elem: '<div class="cwrap" title="{title}"><input type="checkbox" name="{name}[]" value="{value}"">{title}</div>'
    }
};
var comboFilter = function(a) {
    this.opts = $.extend({}, this.defaultOpts, a);
    this.status = 0;
    this.idClass = "combochk-" + this.opts.name;
    this.evNamespace = ".cc" + this.opts.name;
    console.log(this);
    this.init()
};
comboFilter.prototype = {
    defaultOpts: {
        name: "combo",
        place: "",
        preload: [],
        inputPlaceholder: "Begin typing ..."
    },
    init: function() {
        this.render();
        this.close()
    },
    render: function() {
        var a = $(this._tmpl.main.replace("{title}", this.opts.title)).disableSelection().appendTo(this.opts.place);
        $(this._tmpl.wrap.replace("{title}", this.opts.title)).disableSelection().appendTo(a);
        var b = a.find("input[name=filtern]"),
            c = this;
        this.obj = a;
        this._renderFilters(this.opts.values || []);
        this._updateTitle();
        a.addClass(this.idClass);
        a.find(".ctrl").on("click",
            function(a) {
                $(a.target).hasClass("trig") && c.isOpen() ? c.close() : c.isClosed() && c.open()
            });
        if (this.opts.preload.length)
            for (a = 0; a < this.opts.preload.length; ++a) this._appendFilter(this.opts.preload[a]);
        this.obj.find("input[name=filtern]").focus();
        this.open();
        this.close();
        b.attr("placeholder", this.opts.inputPlaceholder).typeahead(null, {
            name: "filters",
            displayKey: this.opts.suggest.displayKey,
            source: this.opts.suggest.adapter,
            templates: {
                header: Handlebars.compile("<div></div>"),
                footer: Handlebars.compile("<div></div>"),
                suggestion: Handlebars.compile(this.opts.suggest.suggestionTemplate)
            }
        }).on("typeahead:selected", function(a) {
            a = b.typeahead("val");
            b.typeahead("val", "");
            c._appendFilter(a)
        })
    },
    _appendFilter: function(a) {
        console.log("entity", a);
        this._appendFilterObj(this._getFilter(a));
        this._updateTitle();
        $(this.opts.place).trigger("change", {
            vals: this.vals()
        })
    },
    _appendFilterObj: function(a) {
        console.log("obj", a);
        void 0 == a.id || this.obj.find(".options .filt" + a.id).length || this._buildFilterObj(a).appendTo(this.obj.find(".options"))
    },
    _getFilter: function(a) {
        for (var b = 0; b < this.opts.filters.length; ++b)
            if (this.opts.suggest.displayKey(this.opts.filters[b]) == a) return this.opts.filters[b];
        return !1
    },
    _renderFilters: function(a) {
        for (var b = 0; b < a.length; ++b) $(this._tmpl.elem.split("{name}").join(this.opts.name)).appendTo(this.obj.find(".options"))
    },
    _buildFilterObj: function(a) {
        var b = $(this._tmpl.elem.split("{name}").join(this.opts.suggest.displayKey(a))).addClass("filt" + a.id).data("filter", a);
        b.find(".rem").on("click", this._remFilter.bind(this,
            a));
        return b
    },
    _remFilter: function(a) {
        console.log("removing", a);
        console.log("rem dom", this._findFilterDom(a));
        var b, c = this;
        (b = this._findFilterDom(a)) && b.fadeOut(300, function() {
            b.remove();
            c._updateTitle();
            $(c.opts.place).trigger("change", {
                vals: c.vals()
            })
        })
    },
    _findFilterDom: function(a) {
        return this.obj.find(".options .filt" + a.id)
    },
    _updateTitle: function() {
        this.obj.find(".title").text(this.opts.genTitle(this.vals()))
    },
    isSame: function(a) {
        return !!$(a).parents("." + this.idClass).length
    },
    trigger: function() {
        this.isOpen() ?
            this.close() : this.open()
    },
    open: function() {
        this.obj.find(".comboopen").show();
        this.obj.addClass("isopen");
        this.obj.find("input[name=filtern]").width(this.obj.find("div.addfilter").width() - 12).focus();
        this.status = 1;
        var a = this;
        $(document).on("click" + this.evNamespace, function(b) {
            $(b.target).parents("." + a.idClass).length || $(b.target).parents("." + a.opts.suggest.listItemClass).length || a.close()
        });
        $(this.opts.place).trigger("open")
    },
    close: function() {
        this.obj.find(".comboopen").hide();
        this.obj.removeClass("isopen");
        this.status = 0;
        $(document).off(this.evNamespace);
        $(this.opts.place).trigger("close")
    },
    isOpen: function() {
        return !!this.status
    },
    isClosed: function() {
        return !this.status
    },
    vals: function() {
        var a = [];
        this.obj.find(".options > div").each(function(b, c) {
            a.push($(c).data("filter"))
        });
        return a
    },
    _tmpl: {
        main: '<div class="combocheck">\n<div class="ctrl">\n<span class="title"></span>\n<span class="trigger trig"><img src="/img/b/select-arrow.png" class="trig"></span>\n</div>\n</div>',
        wrap: '<div class="comboopen filter">\n<div class="ctrl">\n<span class="title"></span>\n<span class="trigger trig"><img src="/img/b/select-arrow.png" class="trig"></span>\n</div>\n<div class="options"></div>\n<div class="addfilter">\n<input type="text" name="filtern" class="textf filtn" placeholder="Begin typing ...">\n</div>\n</div>',
        elem: '<div title="{name}">\n<div class="opttl cwrap">\n{name}\n</div>\n<img src="/img/stop-process.png" class="rem">\n</div>'
    }
};
(function(a, b) {
    function c(a) {
        return "string" === typeof a
    }

    function h(a) {
        var d = s.call(arguments, 1);
        return function() {
            return a.apply(this, d.concat(s.call(arguments)))
        }
    }

    function f(d, e, k, f, g) {
        var q;
        f !== r ? (e = k.match(d ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/), k = e[3] || "", 2 === g && c(f) ? f = f.replace(d ? U : Y, "") : (q = u(e[2]), f = c(f) ? u[d ? F : J](f) : f, f = 2 === g ? f : 1 === g ? a.extend({}, f, q) : a.extend({}, q, f), f = v(f), d && (f = f.replace(O, n))), d = e[1] + (d ? "#" : f || !e[1] ? "?" : "") + f + k) : d = e(k !== r ? k : b[D][K]);
        return d
    }

    function p(a, d, e) {
        d ===
            r || "boolean" === typeof d ? (e = d, d = v[a ? F : J]()) : d = c(d) ? d.replace(a ? U : Y, "") : d;
        return u(d, e)
    }

    function g(d, e, b, k) {
        c(b) || "object" === typeof b || (k = b, b = e, e = r);
        return this.each(function() {
            var c = a(this),
                f = e || t()[(this.nodeName || "").toLowerCase()] || "",
                g = f && c.attr(f) || "";
            c.attr(f, v[d](g, b, k))
        })
    }
    var r, s = Array.prototype.slice,
        n = decodeURIComponent,
        v = a.param,
        w, u, d, e = a.bbq = a.bbq || {},
        k, q, t, x = a.event.special,
        J = "querystring",
        F = "fragment",
        D = "location",
        K = "href",
        Y = /^.*\?|#.*$/g,
        U = /^.*\#/,
        O, y = {};
    v[J] = h(f, 0, function(a) {
        return a.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,
            "$1")
    });
    v[F] = w = h(f, 1, function(a) {
        return a.replace(/^[^#]*#?(.*)$/, "$1")
    });
    w.noEscape = function(d) {
        d = a.map((d || "").split(""), encodeURIComponent);
        O = RegExp(d.join("|"), "g")
    };
    w.noEscape(",/");
    a.deparam = u = function(d, e) {
        var b = {},
            c = {
                "true": !0,
                "false": !1,
                "null": null
            };
        a.each(d.replace(/\+/g, " ").split("&"), function(d, k) {
            var f = k.split("="),
                g = n(f[0]),
                q = b,
                h = 0,
                t = g.split("]["),
                x = t.length - 1;
            /\[/.test(t[0]) && /\]$/.test(t[x]) ? (t[x] = t[x].replace(/\]$/, ""), t = t.shift().split("[").concat(t), x = t.length - 1) : x = 0;
            if (2 === f.length)
                if (f =
                    n(f[1]), e && (f = f && !isNaN(f) ? +f : "undefined" === f ? r : c[f] !== r ? c[f] : f), x)
                    for (; h <= x; h++) g = "" === t[h] ? q.length : t[h], q = q[g] = h < x ? q[g] || (t[h + 1] && isNaN(t[h + 1]) ? {} : []) : f;
                else a.isArray(b[g]) ? b[g].push(f) : b[g] = b[g] !== r ? [b[g], f] : f;
            else g && (b[g] = e ? r : "")
        });
        return b
    };
    u[J] = h(p, 0);
    u[F] = d = h(p, 1);
    a.elemUrlAttr || (a.elemUrlAttr = function(d) {
        return a.extend(y, d)
    })({
        a: K,
        base: K,
        iframe: "src",
        img: "src",
        input: "src",
        form: "action",
        link: K,
        script: "src"
    });
    t = a.elemUrlAttr;
    a.fn[J] = h(g, J);
    a.fn[F] = h(g, F);
    e.pushState = k = function(a, d) {
        c(a) &&
            /^#/.test(a) && d === r && (d = 2);
        var e = a !== r,
            e = w(b[D][K], e ? a : {}, e ? d : 2);
        b[D][K] = e + (/#/.test(e) ? "" : "#")
    };
    e.getState = q = function(a, e) {
        return a === r || "boolean" === typeof a ? d(a) : d(e)[a]
    };
    e.removeState = function(d) {
        var e = {};
        d !== r && (e = q(), a.each(a.isArray(d) ? d : arguments, function(a, d) {
            delete e[d]
        }));
        k(e, 2)
    };
    x.hashchange = a.extend(x.hashchange, {
        add: function(d) {
            function e(a) {
                var d = a[F] = w();
                a.getState = function(a, e) {
                    return a === r || "boolean" === typeof a ? u(d, a) : u(d, e)[a]
                };
                b.apply(this, arguments)
            }
            var b;
            if (a.isFunction(d)) return b =
                d, e;
            b = d.handler;
            d.handler = e
        }
    })
})(jQuery, this);
(function(a, b, c) {
    function h(a) {
        a = a || b[g][r];
        return a.replace(/^[^#]*#?(.*)$/, "$1")
    }
    var f, p = a.event.special,
        g = "location",
        r = "href",
        s = document.documentMode,
        n = a.browser.msie && (s === c || 8 > s),
        v = "onhashchange" in b && !n;
    a.hashchangeDelay = 100;
    p.hashchange = a.extend(p.hashchange, {
        setup: function() {
            if (v) return !1;
            a(f.start)
        },
        teardown: function() {
            if (v) return !1;
            a(f.stop)
        }
    });
    f = function() {
        function c() {
            k = q = function(a) {
                return a
            };
            n && (e = a('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow, q = function() {
                    return h(e.document[g][r])
                },
                k = function(a, d) {
                    if (a !== d) {
                        var b = e.document;
                        b.open().close();
                        b[g].hash = "#" + a
                    }
                }, k(h()))
        }
        var f = {},
            d, e, k, q;
        f.start = function() {
            if (!d) {
                var e = h();
                k || c();
                (function J() {
                    var c = h(),
                        f = q(e);
                    c !== e ? (k(e = c, f), a(b).trigger("hashchange")) : f !== e && (b[g][r] = b[g][r].replace(/#.*/, "") + "#" + f);
                    d = setTimeout(J, a.hashchangeDelay)
                })()
            }
        };
        f.stop = function() {
            e || (d && clearTimeout(d), d = 0)
        };
        return f
    }()
})(jQuery, this);
var FlashDetect = new function() {
    var a = this;
    a.installed = !1;
    a.raw = "";
    a.major = -1;
    a.minor = -1;
    a.revision = -1;
    a.revisionStr = "";
    var b = [{
            name: "ShockwaveFlash.ShockwaveFlash.7",
            version: function(a) {
                return c(a)
            }
        }, {
            name: "ShockwaveFlash.ShockwaveFlash.6",
            version: function(a) {
                var b = "6,0,21";
                try {
                    a.AllowScriptAccess = "always", b = c(a)
                } catch (p) {}
                return b
            }
        }, {
            name: "ShockwaveFlash.ShockwaveFlash",
            version: function(a) {
                return c(a)
            }
        }],
        c = function(a) {
            var b = -1;
            try {
                b = a.GetVariable("$version")
            } catch (c) {}
            return b
        };
    a.majorAtLeast = function(b) {
        return a.major >=
            b
    };
    a.minorAtLeast = function(b) {
        return a.minor >= b
    };
    a.revisionAtLeast = function(b) {
        return a.revision >= b
    };
    a.versionAtLeast = function(b) {
        var c = [a.major, a.minor, a.revision],
            p = Math.min(c.length, arguments.length);
        for (i = 0; i < p; i++)
            if (c[i] >= arguments[i]) {
                if (!(i + 1 < p && c[i] == arguments[i])) return !0
            } else return !1
    };
    a.FlashDetect = function() {
        var c, f, p, g, r;
        if (navigator.plugins && 0 < navigator.plugins.length) {
            var s = navigator.mimeTypes;
            if (s && s["application/x-shockwave-flash"] && s["application/x-shockwave-flash"].enabledPlugin &&
                s["application/x-shockwave-flash"].enabledPlugin.description) {
                c = s = s["application/x-shockwave-flash"].enabledPlugin.description;
                var s = c.split(/ +/),
                    n = s[2].split(/\./),
                    s = s[3];
                f = parseInt(n[0], 10);
                p = parseInt(n[1], 10);
                g = s;
                r = parseInt(s.replace(/[a-zA-Z]/g, ""), 10) || a.revision;
                a.raw = c;
                a.major = f;
                a.minor = p;
                a.revisionStr = g;
                a.revision = r;
                a.installed = !0
            }
        } else if (-1 == navigator.appVersion.indexOf("Mac") && window.execScript)
            for (s = -1, n = 0; n < b.length && -1 == s; n++) {
                c = -1;
                try {
                    c = new ActiveXObject(b[n].name)
                } catch (v) {
                    c = {
                        activeXError: !0
                    }
                }
                c.activeXError ||
                    (a.installed = !0, s = b[n].version(c), -1 != s && (c = s, g = c.split(","), f = parseInt(g[0].split(" ")[1], 10), p = parseInt(g[1], 10), r = parseInt(g[2], 10), g = g[2], a.raw = c, a.major = f, a.minor = p, a.revision = r, a.revisionStr = g))
            }
    }()
};
FlashDetect.JS_RELEASE = "1.0.4";
(function(a, b, c) {
    "function" == typeof define && define.amd ? define(["jquery"], function(h) {
        return c(h, a, b), h.mobile
    }) : c(a.jQuery, a, b)
})(this, document, function(a, b, c, h) {
    (function(a, b, g) {
        function h(a) {
            return a = a || location.href, "#" + a.replace(/^[^#]*#?(.*)$/, "$1")
        }
        var s = "hashchange",
            n = c,
            v, w = a.event.special,
            u = n.documentMode,
            d = "on" + s in b && (u === g || 7 < u);
        a.fn[s] = function(a) {
            return a ? this.bind(s, a) : this.trigger(s)
        };
        a.fn[s].delay = 50;
        w[s] = a.extend(w[s], {
            setup: function() {
                if (d) return !1;
                a(v.start)
            },
            teardown: function() {
                if (d) return !1;
                a(v.stop)
            }
        });
        v = function() {
            function e() {
                var d = h(),
                    c = v(t);
                d !== t ? (u(t = d, c), a(b).trigger(s)) : c !== t && (location.href = location.href.replace(/#.*/, "") + c);
                q = setTimeout(e, a.fn[s].delay)
            }
            var c = {},
                q, t = h(),
                x = function(a) {
                    return a
                },
                u = x,
                v = x;
            return c.start = function() {
                q || e()
            }, c.stop = function() {
                q && clearTimeout(q);
                q = g
            }, b.attachEvent && !b.addEventListener && !d && function() {
                var d, b;
                c.start = function() {
                    d || (b = a.fn[s].src, b = b && b + h(), d = a('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                        b || u(h());
                        e()
                    }).attr("src",
                        b || "javascript:0").insertAfter("body")[0].contentWindow, n.onpropertychange = function() {
                        try {
                            "title" === event.propertyName && (d.document.title = n.title)
                        } catch (a) {}
                    })
                };
                c.stop = x;
                v = function() {
                    return h(d.location.href)
                };
                u = function(e, b) {
                    var c = d.document,
                        k = a.fn[s].domain;
                    e !== b && (c.title = n.title, c.open(), k && c.write('<script>document.domain="' + k + '"\x3c/script>'), c.close(), d.location.hash = e)
                }
            }(), c
        }()
    })(a, this);
    a.mobile = {};
    (function(a, b, g) {
        var h = {};
        a.mobile = a.extend(a.mobile, {
            version: "1.3.2",
            ns: "",
            subPageUrlKey: "ui-page",
            activePageClass: "ui-page-active",
            activeBtnClass: "ui-btn-active",
            focusClass: "ui-focus",
            ajaxEnabled: !0,
            hashListeningEnabled: !0,
            linkBindingEnabled: !0,
            defaultPageTransition: "fade",
            maxTransitionWidth: !1,
            minScrollBack: 250,
            touchOverflowEnabled: !1,
            defaultDialogTransition: "pop",
            pageLoadErrorMessage: "Error Loading Page",
            pageLoadErrorMessageTheme: "e",
            phonegapNavigationEnabled: !1,
            autoInitializePage: !0,
            pushStateEnabled: !0,
            ignoreContentEnabled: !1,
            orientationChangeEnabled: !0,
            buttonMarkup: {
                hoverDelay: 200
            },
            window: a(b),
            document: a(c),
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            },
            behaviors: {},
            silentScroll: function(c) {
                "number" !== a.type(c) && (c = a.mobile.defaultHomeScroll);
                a.event.special.scrollstart.enabled = !1;
                setTimeout(function() {
                    b.scrollTo(0, c);
                    a.mobile.document.trigger("silentscroll", {
                        x: 0,
                        y: c
                    })
                }, 20);
                setTimeout(function() {
                    a.event.special.scrollstart.enabled = !0
                }, 150)
            },
            nsNormalizeDict: h,
            nsNormalize: function(b) {
                if (b) return h[b] || (h[b] = a.camelCase(a.mobile.ns + b))
            },
            getInheritedTheme: function(a, b) {
                for (var c = a[0], d = "", e = /ui-(bar|body|overlay)-([a-z])\b/, k, f; c && !((k = c.className || "") && (f = e.exec(k)) && (d = f[2]));) c = c.parentNode;
                return d || b || "a"
            },
            closestPageData: function(a) {
                return a.closest(':jqmData(role="page"), :jqmData(role="dialog")').data("mobile-page")
            },
            enhanceable: function(a) {
                return this.haveParents(a, "enhance")
            },
            hijackable: function(a) {
                return this.haveParents(a, "ajax")
            },
            haveParents: function(b, c) {
                if (!a.mobile.ignoreContentEnabled) return b;
                for (var g = b.length, d = a(), e, k, q, h = 0; h < g; h++) {
                    k = b.eq(h);
                    q = !1;
                    for (e = b[h]; e;) {
                        if ("false" === (e.getAttribute ? e.getAttribute("data-" + a.mobile.ns + c) : "")) {
                            q = !0;
                            break
                        }
                        e = e.parentNode
                    }
                    q || (d = d.add(k))
                }
                return d
            },
            getScreenHeight: function() {
                return b.innerHeight || a.mobile.window.height()
            }
        }, a.mobile);
        a.fn.jqmData = function(b, c) {
            var h;
            return "undefined" != typeof b && (b && (b = a.mobile.nsNormalize(b)), 2 > arguments.length || c === g ? h = this.data(b) : h = this.data(b, c)), h
        };
        a.jqmData = function(b, c, g) {
            var d;
            return "undefined" != typeof c && (d = a.data(b, c ? a.mobile.nsNormalize(c) : c, g)), d
        };
        a.fn.jqmRemoveData = function(b) {
            return this.removeData(a.mobile.nsNormalize(b))
        };
        a.jqmRemoveData = function(b, c) {
            return a.removeData(b, a.mobile.nsNormalize(c))
        };
        a.fn.removeWithDependents = function() {
            a.removeWithDependents(this)
        };
        a.removeWithDependents = function(b) {
            b = a(b);
            (b.jqmData("dependents") ||
                a()).remove();
            b.remove()
        };
        a.fn.addDependents = function(b) {
            a.addDependents(a(this), b)
        };
        a.addDependents = function(b, c) {
            var g = a(b).jqmData("dependents") || a();
            a(b).jqmData("dependents", a.merge(g, c))
        };
        a.fn.getEncodedText = function() {
            return a("<div/>").text(a(this).text()).html()
        };
        a.fn.jqmEnhanceable = function() {
            return a.mobile.enhanceable(this)
        };
        a.fn.jqmHijackable = function() {
            return a.mobile.hijackable(this)
        };
        var s = a.find,
            n = /:jqmData\(([^)]*)\)/g;
        a.find = function(b, c, g, d) {
            return b = b.replace(n, "[data-" + (a.mobile.ns ||
                "") + "$1]"), s.call(this, b, c, g, d)
        };
        a.extend(a.find, s);
        a.find.matches = function(b, c) {
            return a.find(b, null, null, c)
        };
        a.find.matchesSelector = function(b, c) {
            return 0 < a.find(c, null, null, [b]).length
        }
    })(a, this);
    (function(a, h) {
        b.matchMedia = b.matchMedia || function(a, b) {
            var c, f = a.documentElement,
                h = f.firstElementChild || f.firstChild,
                p = a.createElement("body"),
                u = a.createElement("div");
            return u.id = "mq-test-1", u.style.cssText = "position:absolute;top:-100em", p.style.background = "none", p.appendChild(u),
                function(a) {
                    return u.innerHTML =
                        '&shy;<style media="' + a + '"> #mq-test-1 { width: 42px; }</style>', f.insertBefore(p, h), c = 42 === u.offsetWidth, f.removeChild(p), {
                            matches: c,
                            media: a
                        }
                }
        }(c);
        a.mobile.media = function(a) {
            return b.matchMedia(a).matches
        }
    })(a);
    (function(a, b) {
        var g = {
            touch: "ontouchend" in c
        };
        a.mobile.support = a.mobile.support || {};
        a.extend(a.support, g);
        a.extend(a.mobile.support, g)
    })(a);
    a.extend(a.support, {
        orientation: "orientation" in b && "onorientationchange" in b
    });
    (function(a, h) {
        function g(a) {
            var d = a.charAt(0).toUpperCase() + a.substr(1);
            a = (a + " " + v.join(d + " ") + d).split(" ");
            for (var e in a)
                if (n[a[e]] !== h) return !0
        }

        function r(a, d, e) {
            var b = c.createElement("div");
            e = e ? e : v;
            for (var f, g = 0; g < e.length; g++) {
                var h = e[g],
                    n = ("" === h ? "" : "-" + h.charAt(0).toLowerCase() + h.substr(1) + "-") + a + ": " + d + ";",
                    h = h.charAt(0).toUpperCase() + h.substr(1),
                    h = h + ("" === h ? a : a.charAt(0).toUpperCase() + a.substr(1));
                b.setAttribute("style", n);
                !b.style[h] || (f = !0)
            }
            return !!f
        }
        var s = a("<body>").prependTo("html"),
            n = s[0].style,
            v = ["Webkit", "Moz", "O"],
            w = "palmGetResource" in b,
            u = b.opera,
            d =
            b.operamini && "[object OperaMini]" === {}.toString.call(b.operamini),
            e = b.blackberry && !g("-webkit-transform");
        a.extend(a.mobile, {
            browser: {}
        });
        a.mobile.browser.oldIE = function() {
            var a = 3,
                d = c.createElement("div"),
                e = d.all || [];
            do d.innerHTML = "\x3c!--[if gt IE " + ++a + "]><br><![endif]--\x3e"; while (e[0]);
            return 4 < a ? a : !a
        }();
        a.extend(a.support, {
            cssTransitions: "WebKitTransitionEvent" in b || r("transition", "height 100ms linear", ["Webkit", "Moz", ""]) && !a.mobile.browser.oldIE && !u,
            pushState: "pushState" in history && "replaceState" in
                history && !(0 <= b.navigator.userAgent.indexOf("Firefox") && b.top !== b) && -1 === b.navigator.userAgent.search(/CriOS/),
            mediaquery: a.mobile.media("only all"),
            cssPseudoElement: !!g("content"),
            touchOverflow: !!g("overflowScrolling"),
            cssTransform3d: function() {
                var d = a.mobile.media("(-" + v.join("-transform-3d),(-") + "-transform-3d),(transform-3d)");
                if (d) return !!d;
                var e = c.createElement("div"),
                    g = {
                        MozTransform: "-moz-transform",
                        transform: "transform"
                    };
                s.append(e);
                for (var n in g) e.style[n] !== h && (e.style[n] = "translate3d( 100px, 1px, 1px )",
                    d = b.getComputedStyle(e).getPropertyValue(g[n]));
                return !!d && "none" !== d
            }(),
            boxShadow: !!g("boxShadow") && !e,
            fixedPosition: function() {
                var a = navigator.userAgent,
                    d = navigator.platform,
                    e = a.match(/AppleWebKit\/([0-9]+)/),
                    e = !!e && e[1],
                    c = a.match(/Fennec\/([0-9]+)/),
                    c = !!c && c[1],
                    f = a.match(/Opera Mobi\/([0-9]+)/),
                    g = !!f && f[1];
                return (-1 < d.indexOf("iPhone") || -1 < d.indexOf("iPad") || -1 < d.indexOf("iPod")) && e && 534 > e || b.operamini && "[object OperaMini]" === {}.toString.call(b.operamini) || f && 7458 > g || -1 < a.indexOf("Android") && e &&
                    533 > e || c && 6 > c || "palmGetResource" in b && e && 534 > e || -1 < a.indexOf("MeeGo") && -1 < a.indexOf("NokiaBrowser/8.5.0") ? !1 : !0
            }(),
            scrollTop: ("pageXOffset" in b || "scrollTop" in c.documentElement || "scrollTop" in s[0]) && !w && !d,
            dynamicBaseTag: function() {
                var d = location.protocol + "//" + location.host + location.pathname + "ui-dir/",
                    e = a("head base"),
                    b = null,
                    c = "",
                    g, h;
                return e.length ? c = e.attr("href") : e = b = a("<base>", {
                        href: d
                    }).appendTo("head"), g = a("<a href='testurl' />").prependTo(s), h = g[0].href, e[0].href = c || location.pathname, b && b.remove(),
                    0 === h.indexOf(d)
            }(),
            cssPointerEvents: function() {
                var a = c.createElement("x"),
                    d = c.documentElement,
                    e = b.getComputedStyle,
                    f;
                return "pointerEvents" in a.style ? (a.style.pointerEvents = "auto", a.style.pointerEvents = "x", d.appendChild(a), f = e && "auto" === e(a, "").pointerEvents, d.removeChild(a), !!f) : !1
            }(),
            boundingRect: "undefined" != typeof c.createElement("div").getBoundingClientRect
        });
        s.remove();
        w = function() {
            var a = b.navigator.userAgent;
            return -1 < a.indexOf("Nokia") && (-1 < a.indexOf("Symbian/3") || -1 < a.indexOf("Series60/5")) &&
                -1 < a.indexOf("AppleWebKit") && a.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)
        }();
        a.mobile.gradeA = function() {
            return (a.support.mediaquery || a.mobile.browser.oldIE && 7 <= a.mobile.browser.oldIE) && (a.support.boundingRect || null !== a.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/))
        };
        a.mobile.ajaxBlacklist = b.blackberry && !b.WebKitPoint || d || w;
        w && a(function() {
            a("head link[rel='stylesheet']").attr("rel", "alternate stylesheet").attr("rel", "stylesheet")
        });
        a.support.boxShadow || a("html").addClass("ui-mobile-nosupport-boxshadow")
    })(a);
    (function(a, b) {
        var c = a.mobile.window,
            h;
        a.event.special.navigate = h = {
            bound: !1,
            pushStateEnabled: !0,
            originalEventName: b,
            isPushStateEnabled: function() {
                return a.support.pushState && !0 === a.mobile.pushStateEnabled && this.isHashChangeEnabled()
            },
            isHashChangeEnabled: function() {
                return !0 === a.mobile.hashListeningEnabled
            },
            popstate: function(b) {
                var h = new a.Event("navigate"),
                    r = new a.Event("beforenavigate"),
                    p = b.originalEvent.state || {};
                c.trigger(r);
                r.isDefaultPrevented() || (b.historyState && a.extend(p, b.historyState), h.originalEvent =
                    b, setTimeout(function() {
                        c.trigger(h, {
                            state: p
                        })
                    }, 0))
            },
            hashchange: function(b, h) {
                var r = new a.Event("navigate"),
                    p = new a.Event("beforenavigate");
                c.trigger(p);
                p.isDefaultPrevented() || (r.originalEvent = b, c.trigger(r, {
                    state: b.hashchangeState || {}
                }))
            },
            setup: function(a, b) {
                h.bound || (h.bound = !0, h.isPushStateEnabled() ? (h.originalEventName = "popstate", c.bind("popstate.navigate", h.popstate)) : h.isHashChangeEnabled() && (h.originalEventName = "hashchange", c.bind("hashchange.navigate", h.hashchange)))
            }
        }
    })(a);
    (function(a) {
        a.event.special.throttledresize = {
            setup: function() {
                a(this).bind("resize", b)
            },
            teardown: function() {
                a(this).unbind("resize", b)
            }
        };
        var b = function() {
                s = (new Date).getTime();
                n = s - c;
                250 <= n ? (c = s, a(this).trigger("throttledresize")) : (h && clearTimeout(h), h = setTimeout(b, 250 - n))
            },
            c = 0,
            h, s, n
    })(a);
    (function(a, b) {
        function g() {
            var a = n();
            a !== v && (v = a, h.trigger(s))
        }
        var h = a(b),
            s = "orientationchange",
            n, v, w, u, d = {
                0: !0,
                180: !0
            };
        a.support.orientation && (w = b.innerWidth || h.width(), u = b.innerHeight || h.height(), w = w > u && 50 < w - u, u = d[b.orientation], w && u || !w && !u) && (d = {
            "-90": !0,
            90: !0
        });
        a.event.special.orientationchange = a.extend({}, a.event.special.orientationchange, {
            setup: function() {
                if (a.support.orientation && !a.event.special.orientationchange.disabled) return !1;
                v = n();
                h.bind("throttledresize", g)
            },
            teardown: function() {
                if (a.support.orientation && !a.event.special.orientationchange.disabled) return !1;
                h.unbind("throttledresize", g)
            },
            add: function(a) {
                var d = a.handler;
                a.handler = function(a) {
                    return a.orientation = n(), d.apply(this, arguments)
                }
            }
        });
        a.event.special.orientationchange.orientation =
            n = function() {
                var e = !0,
                    k = c.documentElement;
                return a.support.orientation ? e = d[b.orientation] : e = k && 1.1 > k.clientWidth / k.clientHeight, e ? "portrait" : "landscape"
        };
        a.fn[s] = function(a) {
            return a ? this.bind(s, a) : this.trigger(s)
        };
        a.attrFn && (a.attrFn[s] = !0)
    })(a, this);
    (function(a, b, c, h) {
        function s(a) {
            for (; a && "undefined" != typeof a.originalEvent;) a = a.originalEvent;
            return a
        }

        function n(d) {
            for (var e = {}, b, c; d;) {
                b = a.data(d, F);
                for (c in b) b[c] && (e[c] = e.hasVirtualBinding = !0);
                d = d.parentNode
            }
            return e
        }

        function v() {
            O && (clearTimeout(O),
                O = 0);
            O = setTimeout(function() {
                G = O = 0;
                M.length = 0;
                N = !1;
                z = !0
            }, a.vmouse.resetTimerDuration)
        }

        function w(d, e, b) {
            var c, k;
            if (!(k = b && b[d])) {
                if (b = !b) a: {
                    for (b = e.target; b;) {
                        if ((k = a.data(b, F)) && (!d || k[d])) break a;
                        b = b.parentNode
                    }
                    b = null
                }
                k = b
            }
            if (k) {
                c = e;
                b = c.type;
                var g, q;
                c = a.Event(c);
                c.type = d;
                d = c.originalEvent;
                k = a.event.props; - 1 < b.search(/^(mouse|click)/) && (k = Y);
                if (d)
                    for (q = k.length, g; q;) g = k[--q], c[g] = d[g]; - 1 < b.search(/mouse(down|up)|click/) && !c.which && (c.which = 1);
                if (-1 !== b.search(/^touch/) && (g = s(d), b = g.touches, g = g.changedTouches,
                    d = b && b.length ? b[0] : g && g.length ? g[0] : h))
                    for (b = 0, k = K.length; b < k; b++) g = K[b], c[g] = d[g];
                a(e.target).trigger(c)
            }
            return c
        }

        function u(d) {
            var e = a.data(d.target, D);
            N || G && G === e || (e = w("v" + d.type, d)) && (e.isDefaultPrevented() && d.preventDefault(), e.isPropagationStopped() && d.stopPropagation(), e.isImmediatePropagationStopped() && d.stopImmediatePropagation())
        }

        function d(d) {
            var e = s(d).touches,
                b;
            e && 1 === e.length && (b = d.target, e = n(b), e.hasVirtualBinding && (G = Q++, a.data(b, D, G), O && (clearTimeout(O), O = 0), C = z = !1, b = s(d).touches[0],
                y = b.pageX, I = b.pageY, w("vmouseover", d, e), w("vmousedown", d, e)))
        }

        function e(a) {
            z || (C || w("vmousecancel", a, n(a.target)), C = !0, v())
        }

        function k(d) {
            if (!z) {
                var e = s(d).touches[0],
                    b = C,
                    c = a.vmouse.moveDistanceThreshold,
                    k = n(d.target);
                (C = C || Math.abs(e.pageX - y) > c || Math.abs(e.pageY - I) > c) && !b && w("vmousecancel", d, k);
                w("vmousemove", d, k);
                v()
            }
        }

        function q(a) {
            if (!z) {
                z = !0;
                var d = n(a.target),
                    e;
                w("vmouseup", a, d);
                if (!C) {
                    var b = w("vclick", a, d);
                    b && b.isDefaultPrevented() && (e = s(a).changedTouches[0], M.push({
                            touchID: G,
                            x: e.clientX,
                            y: e.clientY
                        }),
                        N = !0)
                }
                w("vmouseout", a, d);
                C = !1;
                v()
            }
        }

        function t(d) {
            d = a.data(d, F);
            var e;
            if (d)
                for (e in d)
                    if (d[e]) return !0;
            return !1
        }

        function x() {}

        function J(b) {
            var c = b.substr(1);
            return {
                setup: function(g, h) {
                    t(this) || a.data(this, F, {});
                    a.data(this, F)[b] = !0;
                    U[b] = (U[b] || 0) + 1;
                    1 === U[b] && L.bind(c, u);
                    a(this).bind(c, x);
                    V && (U.touchstart = (U.touchstart || 0) + 1, 1 === U.touchstart && L.bind("touchstart", d).bind("touchend", q).bind("touchmove", k).bind("scroll", e))
                },
                teardown: function(g, h) {
                    --U[b];
                    U[b] || L.unbind(c, u);
                    V && (--U.touchstart, U.touchstart ||
                        L.unbind("touchstart", d).unbind("touchmove", k).unbind("touchend", q).unbind("scroll", e));
                    var n = a(this),
                        r = a.data(this, F);
                    r && (r[b] = !1);
                    n.unbind(c, x);
                    t(this) || n.removeData(F)
                }
            }
        }
        var F = "virtualMouseBindings",
            D = "virtualTouchID";
        b = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" ");
        var K = "clientX clientY pageX pageY screenX screenY".split(" "),
            Y = a.event.props.concat(a.event.mouseHooks ? a.event.mouseHooks.props : []),
            U = {},
            O = 0,
            y = 0,
            I = 0,
            C = !1,
            M = [],
            N = !1,
            z = !1,
            V = "addEventListener" in
            c,
            L = a(c),
            Q = 1,
            G = 0,
            da;
        a.vmouse = {
            moveDistanceThreshold: 10,
            clickDistanceThreshold: 10,
            resetTimerDuration: 1500
        };
        for (var S = 0; S < b.length; S++) a.event.special[b[S]] = J(b[S]);
        V && c.addEventListener("click", function(d) {
            var e = M.length,
                b = d.target,
                c, k, g, q, h;
            if (e)
                for (c = d.clientX, k = d.clientY, da = a.vmouse.clickDistanceThreshold, g = b; g;) {
                    for (q = 0; q < e; q++)
                        if (h = M[q], g === b && Math.abs(h.x - c) < da && Math.abs(h.y - k) < da || a.data(g, D) === h.touchID) {
                            d.preventDefault();
                            d.stopPropagation();
                            return
                        }
                    g = g.parentNode
                }
        }, !0)
    })(a, b, c);
    (function(a,
        b, g) {
        function h(b, d, e) {
            var c = e.type;
            e.type = d;
            a.event.dispatch.call(b, e);
            e.type = c
        }
        var s = a(c);
        a.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(b, d) {
            a.fn[d] = function(a) {
                return a ? this.bind(d, a) : this.trigger(d)
            };
            a.attrFn && (a.attrFn[d] = !0)
        });
        var n = (b = a.mobile.support.touch) ? "touchstart" : "mousedown",
            v = b ? "touchend" : "mouseup",
            w = b ? "touchmove" : "mousemove";
        a.event.special.scrollstart = {
            enabled: !0,
            setup: function() {
                function b(a, c) {
                    e = c;
                    h(d, e ?
                        "scrollstart" : "scrollstop", a)
                }
                var d = this,
                    e, c;
                a(d).bind("touchmove scroll", function(d) {
                    a.event.special.scrollstart.enabled && (e || b(d, !0), clearTimeout(c), c = setTimeout(function() {
                        b(d, !1)
                    }, 50))
                })
            }
        };
        a.event.special.tap = {
            tapholdThreshold: 750,
            setup: function() {
                var b = this,
                    d = a(b);
                d.bind("vmousedown", function(e) {
                    function c() {
                        clearTimeout(p)
                    }

                    function g() {
                        c();
                        d.unbind("vclick", t).unbind("vmouseup", c);
                        s.unbind("vmousecancel", g)
                    }

                    function t(a) {
                        g();
                        n === a.target && h(b, "tap", a)
                    }
                    if (e.which && 1 !== e.which) return !1;
                    var n =
                        e.target,
                        p;
                    d.bind("vmouseup", c).bind("vclick", t);
                    s.bind("vmousecancel", g);
                    p = setTimeout(function() {
                        h(b, "taphold", a.Event("taphold", {
                            target: n
                        }))
                    }, a.event.special.tap.tapholdThreshold)
                })
            }
        };
        a.event.special.swipe = {
            scrollSupressionThreshold: 30,
            durationThreshold: 1E3,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 75,
            start: function(b) {
                var d = b.originalEvent.touches ? b.originalEvent.touches[0] : b;
                return {
                    time: (new Date).getTime(),
                    coords: [d.pageX, d.pageY],
                    origin: a(b.target)
                }
            },
            stop: function(a) {
                a = a.originalEvent.touches ?
                    a.originalEvent.touches[0] : a;
                return {
                    time: (new Date).getTime(),
                    coords: [a.pageX, a.pageY]
                }
            },
            handleSwipe: function(b, d) {
                d.time - b.time < a.event.special.swipe.durationThreshold && Math.abs(b.coords[0] - d.coords[0]) > a.event.special.swipe.horizontalDistanceThreshold && Math.abs(b.coords[1] - d.coords[1]) < a.event.special.swipe.verticalDistanceThreshold && b.origin.trigger("swipe").trigger(b.coords[0] > d.coords[0] ? "swipeleft" : "swiperight")
            },
            setup: function() {
                var b = a(this);
                b.bind(n, function(d) {
                    function e(d) {
                        c && (q = a.event.special.swipe.stop(d),
                            Math.abs(c.coords[0] - q.coords[0]) > a.event.special.swipe.scrollSupressionThreshold && d.preventDefault())
                    }
                    var c = a.event.special.swipe.start(d),
                        q;
                    b.bind(w, e).one(v, function() {
                        b.unbind(w, e);
                        c && q && a.event.special.swipe.handleSwipe(c, q);
                        c = q = g
                    })
                })
            }
        };
        a.each({
            scrollstop: "scrollstart",
            taphold: "tap",
            swipeleft: "swipe",
            swiperight: "swipe"
        }, function(b, d) {
            a.event.special[b] = {
                setup: function() {
                    a(this).bind(d, a.noop)
                }
            }
        })
    })(a, this)
});
(function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
})(function(a) {
    function b(d, e) {
        var b, g, f, h = d.nodeName.toLowerCase();
        return "area" === h ? (b = d.parentNode, g = b.name, d.href && g && "map" === b.nodeName.toLowerCase() ? (f = a("img[usemap='#" + g + "']")[0], !!f && c(f)) : !1) : (/input|select|textarea|button|object/.test(h) ? !d.disabled : "a" === h ? d.href || e : e) && c(d)
    }

    function c(d) {
        return a.expr.filters.visible(d) && !a(d).parents().addBack().filter(function() {
            return "hidden" === a.css(this, "visibility")
        }).length
    }

    function h(a) {
        for (var e, b; a.length && a[0] !== document;) {
            if (e = a.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (b = parseInt(a.css("zIndex"), 10), !isNaN(b) && 0 !== b)) return b;
            a = a.parent()
        }
        return 0
    }

    function f() {
        this._curInst = null;
        this._keyEvent = !1;
        this._disabledInputs = [];
        this._inDialog = this._datepickerShowing = !1;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: "January February March April May June July August September October November December".split(" "),
            monthNamesShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            dayNames: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            dayNamesShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
            dayNamesMin: "Su Mo Tu We Th Fr Sa".split(" "),
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        };
        a.extend(this._defaults, this.regional[""]);
        this.regional.en = a.extend(!0, {}, this.regional[""]);
        this.regional["en-US"] = a.extend(!0, {}, this.regional.en);
        this.dpDiv = p(a("<div id='" +
            this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }

    function p(d) {
        return d.delegate("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a", "mouseout", function() {
            a(this).removeClass("ui-state-hover"); - 1 !== this.className.indexOf("ui-datepicker-prev") && a(this).removeClass("ui-datepicker-prev-hover"); - 1 !== this.className.indexOf("ui-datepicker-next") && a(this).removeClass("ui-datepicker-next-hover")
        }).delegate("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a",
            "mouseover", g)
    }

    function g() {
        a.datepicker._isDisabledDatepicker(w.inline ? w.dpDiv.parent()[0] : w.input[0]) || (a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), a(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && a(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && a(this).addClass("ui-datepicker-next-hover"))
    }

    function r(d, e) {
        a.extend(d, e);
        for (var b in e) null == e[b] && (d[b] = e[b]);
        return d
    }
    a.ui = a.ui || {};
    a.extend(a.ui, {
        version: "1.11.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    a.fn.extend({
        scrollParent: function(d) {
            var e = this.css("position"),
                b = "absolute" === e,
                c = d ? /(auto|scroll|hidden)/ : /(auto|scroll)/;
            d = this.parents().filter(function() {
                var d = a(this);
                return b && "static" === d.css("position") ? !1 : c.test(d.css("overflow") + d.css("overflow-y") + d.css("overflow-x"))
            }).eq(0);
            return "fixed" !== e &&
                d.length ? d : a(this[0].ownerDocument || document)
        },
        uniqueId: function() {
            var a = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++a)
                })
            }
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id")
            })
        }
    });
    a.extend(a.expr[":"], {
        data: a.expr.createPseudo ? a.expr.createPseudo(function(d) {
            return function(e) {
                return !!a.data(e, d)
            }
        }) : function(d, e, b) {
            return !!a.data(d, b[3])
        },
        focusable: function(d) {
            return b(d, !isNaN(a.attr(d, "tabindex")))
        },
        tabbable: function(d) {
            var e =
                a.attr(d, "tabindex"),
                c = isNaN(e);
            return (c || 0 <= e) && b(d, !c)
        }
    });
    a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(d, e) {
        function b(d, e, k, g) {
            return a.each(c, function() {
                e -= parseFloat(a.css(d, "padding" + this)) || 0;
                k && (e -= parseFloat(a.css(d, "border" + this + "Width")) || 0);
                g && (e -= parseFloat(a.css(d, "margin" + this)) || 0)
            }), e
        }
        var c = "Width" === e ? ["Left", "Right"] : ["Top", "Bottom"],
            g = e.toLowerCase(),
            f = {
                innerWidth: a.fn.innerWidth,
                innerHeight: a.fn.innerHeight,
                outerWidth: a.fn.outerWidth,
                outerHeight: a.fn.outerHeight
            };
        a.fn["inner" + e] = function(d) {
            return void 0 === d ? f["inner" + e].call(this) : this.each(function() {
                a(this).css(g, b(this, d) + "px")
            })
        };
        a.fn["outer" + e] = function(d, c) {
            return "number" != typeof d ? f["outer" + e].call(this, d) : this.each(function() {
                a(this).css(g, b(this, d, !0, c) + "px")
            })
        }
    });
    a.fn.addBack || (a.fn.addBack = function(a) {
        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    });
    a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function(d) {
        return function(e) {
            return arguments.length ?
                d.call(this, a.camelCase(e)) : d.call(this)
        }
    }(a.fn.removeData));
    a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    a.fn.extend({
        focus: function(d) {
            return function(e, b) {
                return "number" == typeof e ? this.each(function() {
                    var d = this;
                    setTimeout(function() {
                        a(d).focus();
                        b && b.call(d)
                    }, e)
                }) : d.apply(this, arguments)
            }
        }(a.fn.focus),
        disableSelection: function() {
            var a = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.bind(a + ".ui-disableSelection", function(a) {
                    a.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function(d) {
            if (void 0 !== d) return this.css("zIndex", d);
            if (this.length) {
                var e, b;
                for (d = a(this[0]); d.length && d[0] !== document;) {
                    if (e = d.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (b = parseInt(d.css("zIndex"), 10), !isNaN(b) && 0 !== b)) return b;
                    d = d.parent()
                }
            }
            return 0
        }
    });
    a.ui.plugin = {
        add: function(d, e, b) {
            var c;
            d = a.ui[d].prototype;
            for (c in b) d.plugins[c] = d.plugins[c] || [], d.plugins[c].push([e, b[c]])
        },
        call: function(a,
            e, b, c) {
            if ((e = a.plugins[e]) && (c || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType))
                for (c = 0; e.length > c; c++) a.options[e[c][0]] && e[c][1].apply(a.element, b)
        }
    };
    var s = 0,
        n = Array.prototype.slice;
    a.cleanData = function(d) {
        return function(e) {
            var b, c, g;
            for (g = 0; null != (c = e[g]); g++) try {
                (b = a._data(c, "events")) && b.remove && a(c).triggerHandler("remove")
            } catch (f) {}
            d(e)
        }
    }(a.cleanData);
    a.widget = function(d, e, b) {
        var c, g, f, h, n = {},
            r = d.split(".")[0];
        return d = d.split(".")[1], c = r + "-" + d, b || (b = e, e = a.Widget), a.expr[":"][c.toLowerCase()] =
            function(d) {
                return !!a.data(d, c)
            }, a[r] = a[r] || {}, g = a[r][d], f = a[r][d] = function(a, d) {
                return this._createWidget ? (arguments.length && this._createWidget(a, d), void 0) : new f(a, d)
            }, a.extend(f, g, {
                version: b.version,
                _proto: a.extend({}, b),
                _childConstructors: []
            }), h = new e, h.options = a.widget.extend({}, h.options), a.each(b, function(d, b) {
                return a.isFunction(b) ? (n[d] = function() {
                    var a = function() {
                            return e.prototype[d].apply(this, arguments)
                        },
                        c = function(a) {
                            return e.prototype[d].apply(this, a)
                        };
                    return function() {
                        var d, e = this._super,
                            k = this._superApply;
                        return this._super = a, this._superApply = c, d = b.apply(this, arguments), this._super = e, this._superApply = k, d
                    }
                }(), void 0) : (n[d] = b, void 0)
            }), f.prototype = a.widget.extend(h, {
                widgetEventPrefix: g ? h.widgetEventPrefix || d : d
            }, n, {
                constructor: f,
                namespace: r,
                widgetName: d,
                widgetFullName: c
            }), g ? (a.each(g._childConstructors, function(d, e) {
                var b = e.prototype;
                a.widget(b.namespace + "." + b.widgetName, f, e._proto)
            }), delete g._childConstructors) : e._childConstructors.push(f), a.widget.bridge(d, f), f
    };
    a.widget.extend =
        function(d) {
            for (var e, b, c = n.call(arguments, 1), g = 0, f = c.length; f > g; g++)
                for (e in c[g]) b = c[g][e], c[g].hasOwnProperty(e) && void 0 !== b && (d[e] = a.isPlainObject(b) ? a.isPlainObject(d[e]) ? a.widget.extend({}, d[e], b) : a.widget.extend({}, b) : b);
            return d
    };
    a.widget.bridge = function(d, e) {
        var b = e.prototype.widgetFullName || d;
        a.fn[d] = function(c) {
            var g = "string" == typeof c,
                f = n.call(arguments, 1),
                h = this;
            return c = !g && f.length ? a.widget.extend.apply(null, [c].concat(f)) : c, g ? this.each(function() {
                var e, g = a.data(this, b);
                return "instance" ===
                    c ? (h = g, !1) : g ? a.isFunction(g[c]) && "_" !== c.charAt(0) ? (e = g[c].apply(g, f), e !== g && void 0 !== e ? (h = e && e.jquery ? h.pushStack(e.get()) : e, !1) : void 0) : a.error("no such method '" + c + "' for " + d + " widget instance") : a.error("cannot call methods on " + d + " prior to initialization; attempted to call method '" + c + "'")
            }) : this.each(function() {
                var d = a.data(this, b);
                d ? (d.option(c || {}), d._init && d._init()) : a.data(this, b, new e(c, this))
            }), h
        }
    };
    a.Widget = function() {};
    a.Widget._childConstructors = [];
    a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(d, e) {
            e = a(e || this.defaultElement || this)[0];
            this.element = a(e);
            this.uuid = s++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.bindings = a();
            this.hoverable = a();
            this.focusable = a();
            e !== this && (a.data(e, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(a) {
                    a.target === e && this.destroy()
                }
            }), this.document = a(e.style ? e.ownerDocument : e.document || e), this.window = a(this.document[0].defaultView ||
                this.document[0].parentWindow));
            this.options = a.widget.extend({}, this.options, this._getCreateOptions(), d);
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: a.noop,
        _getCreateEventData: a.noop,
        _create: a.noop,
        _init: a.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName +
                "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: a.noop,
        widget: function() {
            return this.element
        },
        option: function(d, e) {
            var b, c, g, f = d;
            if (0 === arguments.length) return a.widget.extend({}, this.options);
            if ("string" == typeof d)
                if (f = {}, b = d.split("."), d = b.shift(), b.length) {
                    c = f[d] = a.widget.extend({}, this.options[d]);
                    for (g = 0; b.length - 1 > g; g++) c[b[g]] = c[b[g]] || {}, c = c[b[g]];
                    if (d = b.pop(), 1 === arguments.length) return void 0 ===
                        c[d] ? null : c[d];
                    c[d] = e
                } else {
                    if (1 === arguments.length) return void 0 === this.options[d] ? null : this.options[d];
                    f[d] = e
                }
            return this._setOptions(f), this
        },
        _setOptions: function(a) {
            for (var e in a) this._setOption(e, a[e]);
            return this
        },
        _setOption: function(a, e) {
            return this.options[a] = e, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e), e && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function(d, e, b) {
            var c, g = this;
            "boolean" != typeof d && (b = e, e = d, d = !1);
            b ? (e = c = a(e), this.bindings = this.bindings.add(e)) : (b = e, e = this.element, c = this.widget());
            a.each(b, function(b, k) {
                function f() {
                    return d || !0 !== g.options.disabled && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof k ? g[k] : k).apply(g, arguments) : void 0
                }
                "string" != typeof k && (f.guid = k.guid = k.guid || f.guid || a.guid++);
                var h = b.match(/^([\w:-]*)\s*(.*)$/),
                    n = h[1] + g.eventNamespace;
                (h =
                    h[2]) ? c.delegate(h, n, f) : e.bind(n, f)
            })
        },
        _off: function(d, e) {
            e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            d.unbind(e).undelegate(e);
            this.bindings = a(this.bindings.not(d).get());
            this.focusable = a(this.focusable.not(d).get());
            this.hoverable = a(this.hoverable.not(d).get())
        },
        _delay: function(a, e) {
            var b = this;
            return setTimeout(function() {
                return ("string" == typeof a ? b[a] : a).apply(b, arguments)
            }, e || 0)
        },
        _hoverable: function(d) {
            this.hoverable = this.hoverable.add(d);
            this._on(d, {
                mouseenter: function(d) {
                    a(d.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(d) {
                    a(d.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(d) {
            this.focusable = this.focusable.add(d);
            this._on(d, {
                focusin: function(d) {
                    a(d.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(d) {
                    a(d.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(d, e, b) {
            var c, g = this.options[d];
            if (b = b || {}, e = a.Event(e), e.type = (d === this.widgetEventPrefix ? d : this.widgetEventPrefix + d).toLowerCase(), e.target = this.element[0], d = e.originalEvent)
                for (c in d) c in e ||
                    (e[c] = d[c]);
            return this.element.trigger(e, b), !(a.isFunction(g) && !1 === g.apply(this.element[0], [e].concat(b)) || e.isDefaultPrevented())
        }
    };
    a.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(d, e) {
        a.Widget.prototype["_" + d] = function(b, c, g) {
            "string" == typeof c && (c = {
                effect: c
            });
            var f, h = c ? !0 === c || "number" == typeof c ? e : c.effect || e : d;
            c = c || {};
            "number" == typeof c && (c = {
                duration: c
            });
            f = !a.isEmptyObject(c);
            c.complete = g;
            c.delay && b.delay(c.delay);
            f && a.effects && a.effects.effect[h] ? b[d](c) : h !== d && b[h] ? b[h](c.duration, c.easing,
                g) : b.queue(function(e) {
                a(this)[d]();
                g && g.call(b[0]);
                e()
            })
        }
    });
    a.widget;
    var v = !1;
    a(document).mouseup(function() {
        v = !1
    });
    a.widget("ui.mouse", {
        version: "1.11.2",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var d = this;
            this.element.bind("mousedown." + this.widgetName, function(a) {
                return d._mouseDown(a)
            }).bind("click." + this.widgetName, function(e) {
                return !0 === a.data(e.target, d.widgetName + ".preventClickEvent") ? (a.removeData(e.target, d.widgetName + ".preventClickEvent"),
                    e.stopImmediatePropagation(), !1) : void 0
            });
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(d) {
            if (!v) {
                this._mouseMoved = !1;
                this._mouseStarted && this._mouseUp(d);
                this._mouseDownEvent = d;
                var e = this,
                    b = 1 === d.which,
                    c = "string" == typeof this.options.cancel && d.target.nodeName ? a(d.target).closest(this.options.cancel).length :
                    !1;
                return b && !c && this._mouseCapture(d) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    e.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(d) && this._mouseDelayMet(d) && (this._mouseStarted = !1 !== this._mouseStart(d), !this._mouseStarted) ? (d.preventDefault(), !0) : (!0 === a.data(d.target, this.widgetName + ".preventClickEvent") && a.removeData(d.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {
                        return e._mouseMove(a)
                    },
                    this._mouseUpDelegate = function(a) {
                        return e._mouseUp(a)
                    }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), d.preventDefault(), v = !0, !0)) : !0
            }
        },
        _mouseMove: function(d) {
            return this._mouseMoved && (a.ui.ie && (!document.documentMode || 9 > document.documentMode) && !d.button || !d.which) ? this._mouseUp(d) : ((d.which || d.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(d), d.preventDefault()) : (this._mouseDistanceMet(d) && this._mouseDelayMet(d) &&
                (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, d), this._mouseStarted ? this._mouseDrag(d) : this._mouseUp(d)), !this._mouseStarted))
        },
        _mouseUp: function(d) {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, d.target === this._mouseDownEvent.target && a.data(d.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(d)), v = !1, !1
        },
        _mouseDistanceMet: function(a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX -
                a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    });
    a.widget("ui.sortable", a.ui.mouse, {
        version: "1.11.2",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1E3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function(a, e, b) {
            return a >= e && e + b > a
        },
        _isFloating: function(a) {
            return /left|right/.test(a.css("float")) || /inline|table-cell/.test(a.css("display"))
        },
        _create: function() {
            var a = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? "x" === a.axis || this._isFloating(this.items[0].item) : !1;
            this.offset = this.element.offset();
            this._mouseInit();
            this._setHandleClassName();
            this.ready = !0
        },
        _setOption: function(a, e) {
            this._super(a, e);
            "handle" === a && this._setHandleClassName()
        },
        _setHandleClassName: function() {
            this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle");
            a.each(this.items, function() {
                (this.instance.options.handle ? this.item.find(this.instance.options.handle) :
                    this.item).addClass("ui-sortable-handle")
            })
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle");
            this._mouseDestroy();
            for (var a = this.items.length - 1; 0 <= a; a--) this.items[a].item.removeData(this.widgetName + "-item");
            return this
        },
        _mouseCapture: function(d, e) {
            var b = null,
                c = !1,
                g = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(d), a(d.target).parents().each(function() {
                return a.data(this,
                    g.widgetName + "-item") === g ? (b = a(this), !1) : void 0
            }), a.data(d.target, g.widgetName + "-item") === g && (b = a(d.target)), b ? !this.options.handle || e || (a(this.options.handle, b).find("*").addBack().each(function() {
                this === d.target && (c = !0)
            }), c) ? (this.currentItem = b, this._removeCurrentsFromItems(), !0) : !1 : !1)
        },
        _mouseStart: function(d, e, b) {
            var c;
            e = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(d), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(),
                this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, a.extend(this.offset, {
                    click: {
                        left: d.pageX - this.offset.left,
                        top: d.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(d), this.originalPageX = d.pageX, this.originalPageY = d.pageY, e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt),
                this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), e.containment && this._setContainment(), e.cursor && "auto" !== e.cursor && (c = this.document.find("body"), this.storedCursor = c.css("cursor"), c.css("cursor", e.cursor), this.storedStylesheet = a("<style>*{ cursor: " + e.cursor + " !important; }</style>").appendTo(c)), e.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")),
                    this.helper.css("opacity", e.opacity)), e.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", e.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", d, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !b)
                for (b = this.containers.length - 1; 0 <= b; b--) this.containers[b]._trigger("activate", d, this._uiHash(this));
            return a.ui.ddmanager &&
                (a.ui.ddmanager.current = this), a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, d), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(d), !0
        },
        _mouseDrag: function(d) {
            var e, b, c, g;
            e = this.options;
            var f = !1;
            this.position = this._generatePosition(d);
            this.positionAbs = this._convertPositionTo("absolute");
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
            this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top +
                this.scrollParent[0].offsetHeight - d.pageY < e.scrollSensitivity ? this.scrollParent[0].scrollTop = f = this.scrollParent[0].scrollTop + e.scrollSpeed : d.pageY - this.overflowOffset.top < e.scrollSensitivity && (this.scrollParent[0].scrollTop = f = this.scrollParent[0].scrollTop - e.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - d.pageX < e.scrollSensitivity ? this.scrollParent[0].scrollLeft = f = this.scrollParent[0].scrollLeft + e.scrollSpeed : d.pageX - this.overflowOffset.left < e.scrollSensitivity && (this.scrollParent[0].scrollLeft =
                    f = this.scrollParent[0].scrollLeft - e.scrollSpeed)) : (d.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (d.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed)), d.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) : a(window).width() - (d.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() +
                e.scrollSpeed))), !1 !== f && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, d));
            this.positionAbs = this._convertPositionTo("absolute");
            this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px");
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px");
            for (e = this.items.length - 1; 0 <= e; e--)
                if (b = this.items[e], c = b.item[0], g = this._intersectsWithPointer(b), g && b.instance === this.currentContainer && c !== this.currentItem[0] &&
                    this.placeholder[1 === g ? "next" : "prev"]()[0] !== c && !a.contains(this.placeholder[0], c) && ("semi-dynamic" === this.options.type ? !a.contains(this.element[0], c) : !0)) {
                    if (this.direction = 1 === g ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(b)) break;
                    this._rearrange(d, b);
                    this._trigger("change", d, this._uiHash());
                    break
                }
            return this._contactContainers(d), a.ui.ddmanager && a.ui.ddmanager.drag(this, d), this._trigger("sort", d, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function(d,
            e) {
            if (d) {
                if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, d), this.options.revert) {
                    var b = this,
                        c = this.placeholder.offset(),
                        g = this.options.axis,
                        f = {};
                    g && "x" !== g || (f.left = c.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft));
                    g && "y" !== g || (f.top = c.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop));
                    this.reverting = !0;
                    a(this.helper).animate(f, parseInt(this.options.revert,
                        10) || 500, function() {
                        b._clear(d)
                    })
                } else this._clear(d, e);
                return !1
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var d = this.containers.length - 1; 0 <= d; d--) this.containers[d]._trigger("deactivate", null, this._uiHash(this)), this.containers[d].containerCache.over && (this.containers[d]._trigger("out", null, this._uiHash(this)), this.containers[d].containerCache.over =
                    0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function(d) {
            var e = this._getItemsAsjQuery(d && d.connected),
                b = [];
            return d =
                d || {}, a(e).each(function() {
                    var e = (a(d.item || this).attr(d.attribute || "id") || "").match(d.expression || /(.+)[\-=_](.+)/);
                    e && b.push((d.key || e[1] + "[]") + "=" + (d.key && d.expression ? e[1] : e[2]))
                }), !b.length && d.key && b.push(d.key + "="), b.join("&")
        },
        toArray: function(d) {
            var e = this._getItemsAsjQuery(d && d.connected),
                b = [];
            return d = d || {}, e.each(function() {
                b.push(a(d.item || this).attr(d.attribute || "id") || "")
            }), b
        },
        _intersectsWith: function(a) {
            var e = this.positionAbs.left,
                b = e + this.helperProportions.width,
                c = this.positionAbs.top,
                g = c + this.helperProportions.height,
                f = a.left,
                h = f + a.width,
                n = a.top,
                r = n + a.height,
                p = this.offset.click.top,
                s = this.offset.click.left,
                s = "y" === this.options.axis || e + s > f && h > e + s,
                p = ("x" === this.options.axis || c + p > n && r > c + p) && s;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > f && h > b - this.helperProportions.width / 2 && c + this.helperProportions.height /
                2 > n && r > g - this.helperProportions.height / 2
        },
        _intersectsWithPointer: function(a) {
            var e = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top, a.height);
            a = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left, a.width);
            e = e && a;
            a = this._getDragVerticalDirection();
            var b = this._getDragHorizontalDirection();
            return e ? this.floating ? b && "right" === b || "down" === a ? 2 : 1 : a && ("down" === a ? 2 : 1) : !1
        },
        _intersectsWithSides: function(a) {
            var e = this._isOverAxis(this.positionAbs.top +
                this.offset.click.top, a.top + a.height / 2, a.height);
            a = this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width);
            var b = this._getDragVerticalDirection(),
                c = this._getDragHorizontalDirection();
            return this.floating && c ? "right" === c && a || "left" === c && !a : b && ("down" === b && e || "up" === b && !e)
        },
        _getDragVerticalDirection: function() {
            var a = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== a && (0 < a ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var a = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== a && (0 < a ? "right" : "left")
        },
        refresh: function(a) {
            return this._refreshItems(a), this._setHandleClassName(), this.refreshPositions(), this
        },
        _connectWith: function() {
            var a = this.options;
            return a.connectWith.constructor === String ? [a.connectWith] : a.connectWith
        },
        _getItemsAsjQuery: function(d) {
            function e() {
                f.push(this)
            }
            var b, c, g, f = [],
                h = [],
                n = this._connectWith();
            if (n && d)
                for (d = n.length - 1; 0 <= d; d--)
                    for (c = a(n[d]), b = c.length - 1; 0 <= b; b--)(g = a.data(c[b], this.widgetFullName)) && g !== this && !g.options.disabled && h.push([a.isFunction(g.options.items) ?
                        g.options.items.call(g.element) : a(g.options.items, g.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), g
                    ]);
            h.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (d = h.length - 1; 0 <= d; d--) h[d][0].each(e);
            return a(f)
        },
        _removeCurrentsFromItems: function() {
            var d = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = a.grep(this.items, function(a) {
                for (var b = 0; d.length > b; b++)
                    if (d[b] === a.item[0]) return !1;
                return !0
            })
        },
        _refreshItems: function(d) {
            this.items = [];
            this.containers = [this];
            var e, b, c, g, f, h = this.items,
                n = [
                    [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], d, {
                        item: this.currentItem
                    }) : a(this.options.items, this.element), this]
                ];
            if ((f = this._connectWith()) && this.ready)
                for (e = f.length - 1; 0 <= e; e--)
                    for (c = a(f[e]), b = c.length - 1; 0 <= b; b--)(g = a.data(c[b], this.widgetFullName)) && g !== this && !g.options.disabled &&
                        (n.push([a.isFunction(g.options.items) ? g.options.items.call(g.element[0], d, {
                            item: this.currentItem
                        }) : a(g.options.items, g.element), g]), this.containers.push(g));
            for (e = n.length - 1; 0 <= e; e--)
                for (d = n[e][1], c = n[e][0], b = 0, f = c.length; f > b; b++) g = a(c[b]), g.data(this.widgetName + "-item", d), h.push({
                    item: g,
                    instance: d,
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                })
        },
        refreshPositions: function(d) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var e, b, c, g;
            for (e = this.items.length - 1; 0 <= e; e--) b = this.items[e],
                b.instance !== this.currentContainer && this.currentContainer && b.item[0] !== this.currentItem[0] || (c = this.options.toleranceElement ? a(this.options.toleranceElement, b.item) : b.item, d || (b.width = c.outerWidth(), b.height = c.outerHeight()), g = c.offset(), b.left = g.left, b.top = g.top);
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (e = this.containers.length - 1; 0 <= e; e--) g = this.containers[e].element.offset(), this.containers[e].containerCache.left = g.left,
                    this.containers[e].containerCache.top = g.top, this.containers[e].containerCache.width = this.containers[e].element.outerWidth(), this.containers[e].containerCache.height = this.containers[e].element.outerHeight();
            return this
        },
        _createPlaceholder: function(d) {
            d = d || this;
            var e, b = d.options;
            b.placeholder && b.placeholder.constructor !== String || (e = b.placeholder, b.placeholder = {
                element: function() {
                    var b = d.currentItem[0].nodeName.toLowerCase(),
                        c = a("<" + b + ">", d.document[0]).addClass(e || d.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tr" === b ? d.currentItem.children().each(function() {
                        a("<td>&#160;</td>", d.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(c)
                    }) : "img" === b && c.attr("src", d.currentItem.attr("src")), e || c.css("visibility", "hidden"), c
                },
                update: function(a, c) {
                    (!e || b.forcePlaceholderSize) && (c.height() || c.height(d.currentItem.innerHeight() - parseInt(d.currentItem.css("paddingTop") || 0, 10) - parseInt(d.currentItem.css("paddingBottom") || 0, 10)), c.width() || c.width(d.currentItem.innerWidth() - parseInt(d.currentItem.css("paddingLeft") ||
                        0, 10) - parseInt(d.currentItem.css("paddingRight") || 0, 10)))
                }
            });
            d.placeholder = a(b.placeholder.element.call(d.element, d.currentItem));
            d.currentItem.after(d.placeholder);
            b.placeholder.update(d, d.placeholder)
        },
        _contactContainers: function(d) {
            var e, b, c, g, f, h, n, r, p = g = null;
            for (e = this.containers.length - 1; 0 <= e; e--) a.contains(this.currentItem[0], this.containers[e].element[0]) || (this._intersectsWith(this.containers[e].containerCache) ? g && a.contains(this.containers[e].element[0], g.element[0]) || (g = this.containers[e],
                p = e) : this.containers[e].containerCache.over && (this.containers[e]._trigger("out", d, this._uiHash(this)), this.containers[e].containerCache.over = 0));
            if (g)
                if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", d, this._uiHash(this)), this.containers[p].containerCache.over = 1);
                else {
                    e = 1E4;
                    c = null;
                    g = (b = g.floating || this._isFloating(this.currentItem)) ? "left" : "top";
                    f = b ? "width" : "height";
                    r = b ? "clientX" : "clientY";
                    for (b = this.items.length - 1; 0 <= b; b--) a.contains(this.containers[p].element[0],
                        this.items[b].item[0]) && this.items[b].item[0] !== this.currentItem[0] && (h = this.items[b].item.offset()[g], n = !1, d[r] - h > this.items[b][f] / 2 && (n = !0), e > Math.abs(d[r] - h) && (e = Math.abs(d[r] - h), c = this.items[b], this.direction = n ? "up" : "down"));
                    if (c || this.options.dropOnEmpty) {
                        if (this.currentContainer === this.containers[p]) return this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", d, this._uiHash()), this.currentContainer.containerCache.over = 1), void 0;
                        c ? this._rearrange(d, c, null, !0) : this._rearrange(d,
                            null, this.containers[p].element, !0);
                        this._trigger("change", d, this._uiHash());
                        this.containers[p]._trigger("change", d, this._uiHash(this));
                        this.currentContainer = this.containers[p];
                        this.options.placeholder.update(this.currentContainer, this.placeholder);
                        this.containers[p]._trigger("over", d, this._uiHash(this));
                        this.containers[p].containerCache.over = 1
                    }
                }
        },
        _createHelper: function(d) {
            var e = this.options;
            d = a.isFunction(e.helper) ? a(e.helper.apply(this.element[0], [d, this.currentItem])) : "clone" === e.helper ? this.currentItem.clone() :
                this.currentItem;
            return d.parents("body").length || a("parent" !== e.appendTo ? e.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] === this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }), (!d[0].style.width || e.forceHelperSize) && d.width(this.currentItem.width()), (!d[0].style.height || e.forceHelperSize) && d.height(this.currentItem.height()),
                d
        },
        _adjustOffsetFromHelper: function(d) {
            "string" == typeof d && (d = d.split(" "));
            a.isArray(d) && (d = {
                left: +d[0],
                top: +d[1] || 0
            });
            "left" in d && (this.offset.click.left = d.left + this.margins.left);
            "right" in d && (this.offset.click.left = this.helperProportions.width - d.right + this.margins.left);
            "top" in d && (this.offset.click.top = d.top + this.margins.top);
            "bottom" in d && (this.offset.click.top = this.helperProportions.height - d.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var d = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (d.left += this.scrollParent.scrollLeft(), d.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (d = {
                top: 0,
                left: 0
            }), {
                top: d.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: d.left + (parseInt(this.offsetParent.css("borderLeftWidth"),
                    10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var a = this.currentItem.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var d, e, b, c = this.options;
            "parent" === c.containment && (c.containment = this.helper[0].parentNode);
            "document" !== c.containment && "window" !== c.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a("document" === c.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (a("document" === c.containment ? document :
                window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]);
            /^(document|window|parent)$/.test(c.containment) || (d = a(c.containment)[0], e = a(c.containment).offset(), b = "hidden" !== a(d).css("overflow"), this.containment = [e.left + (parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0) - this.margins.left, e.top + (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0) - this.margins.top, e.left + (b ? Math.max(d.scrollWidth,
                d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, e.top + (b ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(d, e) {
            e || (e = this.position);
            var b = "absolute" === d ? 1 : -1,
                c = "absolute" !== this.cssPosition || this.scrollParent[0] !==
                document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                g = /(html|body)/i.test(c[0].tagName);
            return {
                top: e.top + this.offset.relative.top * b + this.offset.parent.top * b - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : g ? 0 : c.scrollTop()) * b,
                left: e.left + this.offset.relative.left * b + this.offset.parent.left * b - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : g ? 0 : c.scrollLeft()) * b
            }
        },
        _generatePosition: function(d) {
            var e, b, c = this.options,
                g = d.pageX,
                f = d.pageY,
                h = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                n = /(html|body)/i.test(h[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (d.pageX - this.offset.click.left < this.containment[0] && (g = this.containment[0] + this.offset.click.left), d.pageY -
                this.offset.click.top < this.containment[1] && (f = this.containment[1] + this.offset.click.top), d.pageX - this.offset.click.left > this.containment[2] && (g = this.containment[2] + this.offset.click.left), d.pageY - this.offset.click.top > this.containment[3] && (f = this.containment[3] + this.offset.click.top)), c.grid && (e = this.originalPageY + Math.round((f - this.originalPageY) / c.grid[1]) * c.grid[1], f = this.containment ? e - this.offset.click.top >= this.containment[1] && e - this.offset.click.top <= this.containment[3] ? e : e - this.offset.click.top >=
                this.containment[1] ? e - c.grid[1] : e + c.grid[1] : e, b = this.originalPageX + Math.round((g - this.originalPageX) / c.grid[0]) * c.grid[0], g = this.containment ? b - this.offset.click.left >= this.containment[0] && b - this.offset.click.left <= this.containment[2] ? b : b - this.offset.click.left >= this.containment[0] ? b - c.grid[0] : b + c.grid[0] : b)), {
                top: f - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : n ? 0 : h.scrollTop()),
                left: g - this.offset.click.left - this.offset.relative.left -
                    this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : n ? 0 : h.scrollLeft())
            }
        },
        _rearrange: function(a, e, b, c) {
            b ? b[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling);
            var g = this.counter = this.counter ? ++this.counter : 1;
            this._delay(function() {
                g === this.counter && this.refreshPositions(!c)
            })
        },
        _clear: function(a, e) {
            function b(a, d, e) {
                return function(b) {
                    e._trigger(a, b, d._uiHash(d))
                }
            }
            this.reverting = !1;
            var c, g = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (c in this._storedCSS) "auto" !== this._storedCSS[c] && "static" !== this._storedCSS[c] || (this._storedCSS[c] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !e && g.push(function(a) {
                this._trigger("receive", a, this._uiHash(this.fromOutside))
            });
            !this.fromOutside &&
                this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || g.push(function(a) {
                    this._trigger("update", a, this._uiHash())
                });
            this !== this.currentContainer && (e || (g.push(function(a) {
                this._trigger("remove", a, this._uiHash())
            }), g.push(function(a) {
                return function(d) {
                    a._trigger("receive", d, this._uiHash(this))
                }
            }.call(this, this.currentContainer)), g.push(function(a) {
                return function(d) {
                    a._trigger("update", d, this._uiHash(this))
                }
            }.call(this,
                this.currentContainer))));
            for (c = this.containers.length - 1; 0 <= c; c--) e || g.push(b("deactivate", this, this.containers[c])), this.containers[c].containerCache.over && (g.push(b("out", this, this.containers[c])), this.containers[c].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex),
                this.dragging = !1, e || this._trigger("beforeStop", a, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !e) {
                for (c = 0; g.length > c; c++) g[c].call(this, a);
                this._trigger("stop", a, this._uiHash())
            }
            return this.fromOutside = !1, !this.cancelHelperRemoval
        },
        _trigger: function() {
            !1 === a.Widget.prototype._trigger.apply(this, arguments) && this.cancel()
        },
        _uiHash: function(d) {
            var e = d || this;
            return {
                helper: e.helper,
                placeholder: e.placeholder || a([]),
                position: e.position,
                originalPosition: e.originalPosition,
                offset: e.positionAbs,
                item: e.currentItem,
                sender: d ? d.element : null
            }
        }
    });
    a.extend(a.ui, {
        datepicker: {
            version: "1.11.2"
        }
    });
    var w;
    a.extend(f.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(a) {
            return r(this._defaults, a || {}), this
        },
        _attachDatepicker: function(d, e) {
            var b, c, g;
            b = d.nodeName.toLowerCase();
            c = "div" === b || "span" === b;
            d.id || (this.uuid += 1, d.id =
                "dp" + this.uuid);
            g = this._newInst(a(d), c);
            g.settings = a.extend({}, e || {});
            "input" === b ? this._connectDatepicker(d, g) : c && this._inlineDatepicker(d, g)
        },
        _newInst: function(d, e) {
            return {
                id: d[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
                input: d,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: e,
                dpDiv: e ? p(a("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(d, e) {
            var b = a(d);
            e.append =
                a([]);
            e.trigger = a([]);
            b.hasClass(this.markerClassName) || (this._attachments(b, e), b.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(e), a.data(d, "datepicker", e), e.settings.disabled && this._disableDatepicker(d))
        },
        _attachments: function(d, e) {
            var b, c, g;
            b = this._get(e, "appendText");
            var f = this._get(e, "isRTL");
            e.append && e.append.remove();
            b && (e.append = a("<span class='" + this._appendClass + "'>" + b + "</span>"), d[f ? "before" : "after"](e.append));
            d.unbind("focus",
                this._showDatepicker);
            e.trigger && e.trigger.remove();
            b = this._get(e, "showOn");
            "focus" !== b && "both" !== b || d.focus(this._showDatepicker);
            "button" !== b && "both" !== b || (c = this._get(e, "buttonText"), g = this._get(e, "buttonImage"), e.trigger = a(this._get(e, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({
                src: g,
                alt: c,
                title: c
            }) : a("<button type='button'></button>").addClass(this._triggerClass).html(g ? a("<img/>").attr({
                src: g,
                alt: c,
                title: c
            }) : c)), d[f ? "before" : "after"](e.trigger), e.trigger.click(function() {
                return a.datepicker._datepickerShowing &&
                    a.datepicker._lastInput === d[0] ? a.datepicker._hideDatepicker() : a.datepicker._datepickerShowing && a.datepicker._lastInput !== d[0] ? (a.datepicker._hideDatepicker(), a.datepicker._showDatepicker(d[0])) : a.datepicker._showDatepicker(d[0]), !1
            }))
        },
        _autoSize: function(a) {
            if (this._get(a, "autoSize") && !a.inline) {
                var e, b, c, g, f = new Date(2009, 11, 20),
                    h = this._get(a, "dateFormat");
                h.match(/[DM]/) && (e = function(a) {
                    for (g = c = b = 0; a.length > g; g++) a[g].length > b && (b = a[g].length, c = g);
                    return c
                }, f.setMonth(e(this._get(a, h.match(/MM/) ?
                    "monthNames" : "monthNamesShort"))), f.setDate(e(this._get(a, h.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - f.getDay()));
                a.input.attr("size", this._formatDate(a, f).length)
            }
        },
        _inlineDatepicker: function(d, e) {
            var b = a(d);
            b.hasClass(this.markerClassName) || (b.addClass(this.markerClassName).append(e.dpDiv), a.data(d, "datepicker", e), this._setDate(e, this._getDefaultDate(e), !0), this._updateDatepicker(e), this._updateAlternate(e), e.settings.disabled && this._disableDatepicker(d), e.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(d,
            e, b, c, g) {
            var f, h, n, p, s;
            d = this._dialogInst;
            return d || (this.uuid += 1, f = "dp" + this.uuid, this._dialogInput = a("<input type='text' id='" + f + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), a("body").append(this._dialogInput), d = this._dialogInst = this._newInst(this._dialogInput, !1), d.settings = {}, a.data(this._dialogInput[0], "datepicker", d)), r(d.settings, c || {}), e = e && e.constructor === Date ? this._formatDate(d, e) : e, this._dialogInput.val(e), this._pos = g ? g.length ? g :
                [g.pageX, g.pageY] : null, this._pos || (h = document.documentElement.clientWidth, n = document.documentElement.clientHeight, p = document.documentElement.scrollLeft || document.body.scrollLeft, s = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + p, n / 2 - 150 + s]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), d.settings.onSelect = b, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), a.blockUI && a.blockUI(this.dpDiv),
                a.data(this._dialogInput[0], "datepicker", d), this
        },
        _destroyDatepicker: function(d) {
            var e, b = a(d),
                c = a.data(d, "datepicker");
            b.hasClass(this.markerClassName) && (e = d.nodeName.toLowerCase(), a.removeData(d, "datepicker"), "input" === e ? (c.append.remove(), c.trigger.remove(), b.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === e || "span" === e) && b.removeClass(this.markerClassName).empty())
        },
        _enableDatepicker: function(d) {
            var e, b, c = a(d),
                g = a.data(d, "datepicker");
            c.hasClass(this.markerClassName) && (e = d.nodeName.toLowerCase(), "input" === e ? (d.disabled = !1, g.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === e || "span" === e) && (b = c.children("." + this._inlineClass), b.children().removeClass("ui-state-disabled"), b.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = a.map(this._disabledInputs,
                function(a) {
                    return a === d ? null : a
                }))
        },
        _disableDatepicker: function(d) {
            var e, b, c = a(d),
                g = a.data(d, "datepicker");
            c.hasClass(this.markerClassName) && (e = d.nodeName.toLowerCase(), "input" === e ? (d.disabled = !0, g.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === e || "span" === e) && (b = c.children("." + this._inlineClass), b.children().addClass("ui-state-disabled"), b.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = a.map(this._disabledInputs, function(a) {
                return a === d ? null : a
            }), this._disabledInputs[this._disabledInputs.length] = d)
        },
        _isDisabledDatepicker: function(a) {
            if (!a) return !1;
            for (var e = 0; this._disabledInputs.length > e; e++)
                if (this._disabledInputs[e] === a) return !0;
            return !1
        },
        _getInst: function(d) {
            try {
                return a.data(d, "datepicker")
            } catch (e) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function(d, e, b) {
            var c, g, f, h, n = this._getInst(d);
            return 2 === arguments.length && "string" ==
                typeof e ? "defaults" === e ? a.extend({}, a.datepicker._defaults) : n ? "all" === e ? a.extend({}, n.settings) : this._get(n, e) : null : (c = e || {}, "string" == typeof e && (c = {}, c[e] = b), n && (this._curInst === n && this._hideDatepicker(), g = this._getDateDatepicker(d, !0), f = this._getMinMaxDate(n, "min"), h = this._getMinMaxDate(n, "max"), r(n.settings, c), null !== f && void 0 !== c.dateFormat && void 0 === c.minDate && (n.settings.minDate = this._formatDate(n, f)), null !== h && void 0 !== c.dateFormat && void 0 === c.maxDate && (n.settings.maxDate = this._formatDate(n,
                    h)), "disabled" in c && (c.disabled ? this._disableDatepicker(d) : this._enableDatepicker(d)), this._attachments(a(d), n), this._autoSize(n), this._setDate(n, g), this._updateAlternate(n), this._updateDatepicker(n)), void 0)
        },
        _changeDatepicker: function(a, e, b) {
            this._optionDatepicker(a, e, b)
        },
        _refreshDatepicker: function(a) {
            (a = this._getInst(a)) && this._updateDatepicker(a)
        },
        _setDateDatepicker: function(a, e) {
            var b = this._getInst(a);
            b && (this._setDate(b, e), this._updateDatepicker(b), this._updateAlternate(b))
        },
        _getDateDatepicker: function(a,
            e) {
            var b = this._getInst(a);
            return b && !b.inline && this._setDateFromField(b, e), b ? this._getDate(b) : null
        },
        _doKeyDown: function(d) {
            var e, b, c, g = a.datepicker._getInst(d.target),
                f = !0,
                h = g.dpDiv.is(".ui-datepicker-rtl");
            if (g._keyEvent = !0, a.datepicker._datepickerShowing) switch (d.keyCode) {
                case 9:
                    a.datepicker._hideDatepicker();
                    f = !1;
                    break;
                case 13:
                    return c = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", g.dpDiv), c[0] && a.datepicker._selectDay(d.target, g.selectedMonth, g.selectedYear, c[0]),
                        e = a.datepicker._get(g, "onSelect"), e ? (b = a.datepicker._formatDate(g), e.apply(g.input ? g.input[0] : null, [b, g])) : a.datepicker._hideDatepicker(), !1;
                case 27:
                    a.datepicker._hideDatepicker();
                    break;
                case 33:
                    a.datepicker._adjustDate(d.target, d.ctrlKey ? -a.datepicker._get(g, "stepBigMonths") : -a.datepicker._get(g, "stepMonths"), "M");
                    break;
                case 34:
                    a.datepicker._adjustDate(d.target, d.ctrlKey ? +a.datepicker._get(g, "stepBigMonths") : +a.datepicker._get(g, "stepMonths"), "M");
                    break;
                case 35:
                    (d.ctrlKey || d.metaKey) && a.datepicker._clearDate(d.target);
                    f = d.ctrlKey || d.metaKey;
                    break;
                case 36:
                    (d.ctrlKey || d.metaKey) && a.datepicker._gotoToday(d.target);
                    f = d.ctrlKey || d.metaKey;
                    break;
                case 37:
                    (d.ctrlKey || d.metaKey) && a.datepicker._adjustDate(d.target, h ? 1 : -1, "D");
                    f = d.ctrlKey || d.metaKey;
                    d.originalEvent.altKey && a.datepicker._adjustDate(d.target, d.ctrlKey ? -a.datepicker._get(g, "stepBigMonths") : -a.datepicker._get(g, "stepMonths"), "M");
                    break;
                case 38:
                    (d.ctrlKey || d.metaKey) && a.datepicker._adjustDate(d.target, -7, "D");
                    f = d.ctrlKey || d.metaKey;
                    break;
                case 39:
                    (d.ctrlKey || d.metaKey) &&
                        a.datepicker._adjustDate(d.target, h ? -1 : 1, "D");
                    f = d.ctrlKey || d.metaKey;
                    d.originalEvent.altKey && a.datepicker._adjustDate(d.target, d.ctrlKey ? +a.datepicker._get(g, "stepBigMonths") : +a.datepicker._get(g, "stepMonths"), "M");
                    break;
                case 40:
                    (d.ctrlKey || d.metaKey) && a.datepicker._adjustDate(d.target, 7, "D");
                    f = d.ctrlKey || d.metaKey;
                    break;
                default:
                    f = !1
            } else 36 === d.keyCode && d.ctrlKey ? a.datepicker._showDatepicker(this) : f = !1;
            f && (d.preventDefault(), d.stopPropagation())
        },
        _doKeyPress: function(d) {
            var e, b, c = a.datepicker._getInst(d.target);
            return a.datepicker._get(c, "constrainInput") ? (e = a.datepicker._possibleChars(a.datepicker._get(c, "dateFormat")), b = String.fromCharCode(null == d.charCode ? d.keyCode : d.charCode), d.ctrlKey || d.metaKey || " " > b || !e || -1 < e.indexOf(b)) : void 0
        },
        _doKeyUp: function(d) {
            var e;
            d = a.datepicker._getInst(d.target);
            if (d.input.val() !== d.lastVal) try {
                (e = a.datepicker.parseDate(a.datepicker._get(d, "dateFormat"), d.input ? d.input.val() : null, a.datepicker._getFormatConfig(d))) && (a.datepicker._setDateFromField(d), a.datepicker._updateAlternate(d),
                    a.datepicker._updateDatepicker(d))
            } catch (b) {}
            return !0
        },
        _showDatepicker: function(d) {
            if (d = d.target || d, "input" !== d.nodeName.toLowerCase() && (d = a("input", d.parentNode)[0]), !a.datepicker._isDisabledDatepicker(d) && a.datepicker._lastInput !== d) {
                var e, b, c, g, f, n;
                e = a.datepicker._getInst(d);
                a.datepicker._curInst && a.datepicker._curInst !== e && (a.datepicker._curInst.dpDiv.stop(!0, !0), e && a.datepicker._datepickerShowing && a.datepicker._hideDatepicker(a.datepicker._curInst.input[0]));
                b = (b = a.datepicker._get(e, "beforeShow")) ?
                    b.apply(d, [d, e]) : {};
                !1 !== b && (r(e.settings, b), e.lastVal = null, a.datepicker._lastInput = d, a.datepicker._setDateFromField(e), a.datepicker._inDialog && (d.value = ""), a.datepicker._pos || (a.datepicker._pos = a.datepicker._findPos(d), a.datepicker._pos[1] += d.offsetHeight), c = !1, a(d).parents().each(function() {
                        return c |= "fixed" === a(this).css("position"), !c
                    }), g = {
                        left: a.datepicker._pos[0],
                        top: a.datepicker._pos[1]
                    }, a.datepicker._pos = null, e.dpDiv.empty(), e.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }),
                    a.datepicker._updateDatepicker(e), g = a.datepicker._checkOffset(e, g, c), e.dpDiv.css({
                        position: a.datepicker._inDialog && a.blockUI ? "static" : c ? "fixed" : "absolute",
                        display: "none",
                        left: g.left + "px",
                        top: g.top + "px"
                    }), e.inline || (f = a.datepicker._get(e, "showAnim"), n = a.datepicker._get(e, "duration"), e.dpDiv.css("z-index", h(a(d)) + 1), a.datepicker._datepickerShowing = !0, a.effects && a.effects.effect[f] ? e.dpDiv.show(f, a.datepicker._get(e, "showOptions"), n) : e.dpDiv[f || "show"](f ? n : null), a.datepicker._shouldFocusInput(e) && e.input.focus(),
                        a.datepicker._curInst = e))
            }
        },
        _updateDatepicker: function(d) {
            this.maxRows = 4;
            w = d;
            d.dpDiv.empty().append(this._generateHTML(d));
            this._attachHandlers(d);
            var e, b = this._getNumberOfMonths(d),
                c = b[1],
                f = d.dpDiv.find("." + this._dayOverClass + " a");
            0 < f.length && g.apply(f.get(0));
            d.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            1 < c && d.dpDiv.addClass("ui-datepicker-multi-" + c).css("width", 17 * c + "em");
            d.dpDiv[(1 !== b[0] || 1 !== b[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            d.dpDiv[(this._get(d, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            d === a.datepicker._curInst && a.datepicker._datepickerShowing && a.datepicker._shouldFocusInput(d) && d.input.focus();
            d.yearshtml && (e = d.yearshtml, setTimeout(function() {
                e === d.yearshtml && d.yearshtml && d.dpDiv.find("select.ui-datepicker-year:first").replaceWith(d.yearshtml);
                e = d.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function(a) {
            return a.input && a.input.is(":visible") && !a.input.is(":disabled") && !a.input.is(":focus")
        },
        _checkOffset: function(d,
            e, b) {
            var c = d.dpDiv.outerWidth(),
                g = d.dpDiv.outerHeight(),
                f = d.input ? d.input.outerWidth() : 0,
                h = d.input ? d.input.outerHeight() : 0,
                n = document.documentElement.clientWidth + (b ? 0 : a(document).scrollLeft()),
                r = document.documentElement.clientHeight + (b ? 0 : a(document).scrollTop());
            return e.left -= this._get(d, "isRTL") ? c - f : 0, e.left -= b && e.left === d.input.offset().left ? a(document).scrollLeft() : 0, e.top -= b && e.top === d.input.offset().top + h ? a(document).scrollTop() : 0, e.left -= Math.min(e.left, e.left + c > n && n > c ? Math.abs(e.left + c - n) :
                0), e.top -= Math.min(e.top, e.top + g > r && r > g ? Math.abs(g + h) : 0), e
        },
        _findPos: function(d) {
            for (var e, b = this._getInst(d), b = this._get(b, "isRTL"); d && ("hidden" === d.type || 1 !== d.nodeType || a.expr.filters.hidden(d));) d = d[b ? "previousSibling" : "nextSibling"];
            return e = a(d).offset(), [e.left, e.top]
        },
        _hideDatepicker: function(d) {
            var e, b, c, g, f = this._curInst;
            !f || d && f !== a.data(d, "datepicker") || this._datepickerShowing && (e = this._get(f, "showAnim"), b = this._get(f, "duration"), c = function() {
                a.datepicker._tidyDialog(f)
            }, a.effects && (a.effects.effect[e] ||
                a.effects[e]) ? f.dpDiv.hide(e, a.datepicker._get(f, "showOptions"), b, c) : f.dpDiv["slideDown" === e ? "slideUp" : "fadeIn" === e ? "fadeOut" : "hide"](e ? b : null, c), e || c(), this._datepickerShowing = !1, g = this._get(f, "onClose"), g && g.apply(f.input ? f.input[0] : null, [f.input ? f.input.val() : "", f]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), a.blockUI && (a.unblockUI(), a("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function(a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(d) {
            if (a.datepicker._curInst) {
                d = a(d.target);
                var e = a.datepicker._getInst(d[0]);
                (d[0].id !== a.datepicker._mainDivId && 0 === d.parents("#" + a.datepicker._mainDivId).length && !(d.hasClass(a.datepicker.markerClassName) || d.closest("." + a.datepicker._triggerClass).length || !a.datepicker._datepickerShowing || a.datepicker._inDialog && a.blockUI) || d.hasClass(a.datepicker.markerClassName) && a.datepicker._curInst !== e) && a.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(d, e, b) {
            d = a(d);
            var c =
                this._getInst(d[0]);
            this._isDisabledDatepicker(d[0]) || (this._adjustInstDate(c, e + ("M" === b ? this._get(c, "showCurrentAtPos") : 0), b), this._updateDatepicker(c))
        },
        _gotoToday: function(d) {
            var e;
            d = a(d);
            var b = this._getInst(d[0]);
            this._get(b, "gotoCurrent") && b.currentDay ? (b.selectedDay = b.currentDay, b.drawMonth = b.selectedMonth = b.currentMonth, b.drawYear = b.selectedYear = b.currentYear) : (e = new Date, b.selectedDay = e.getDate(), b.drawMonth = b.selectedMonth = e.getMonth(), b.drawYear = b.selectedYear = e.getFullYear());
            this._notifyChange(b);
            this._adjustDate(d)
        },
        _selectMonthYear: function(d, e, b) {
            d = a(d);
            var c = this._getInst(d[0]);
            c["selected" + ("M" === b ? "Month" : "Year")] = c["draw" + ("M" === b ? "Month" : "Year")] = parseInt(e.options[e.selectedIndex].value, 10);
            this._notifyChange(c);
            this._adjustDate(d)
        },
        _selectDay: function(d, e, b, c) {
            var g, f = a(d);
            a(c).hasClass(this._unselectableClass) || this._isDisabledDatepicker(f[0]) || (g = this._getInst(f[0]), g.selectedDay = g.currentDay = a("a", c).html(), g.selectedMonth = g.currentMonth = e, g.selectedYear = g.currentYear = b, this._selectDate(d,
                this._formatDate(g, g.currentDay, g.currentMonth, g.currentYear)))
        },
        _clearDate: function(d) {
            d = a(d);
            this._selectDate(d, "")
        },
        _selectDate: function(d, e) {
            var b;
            b = a(d);
            var c = this._getInst(b[0]);
            e = null != e ? e : this._formatDate(c);
            c.input && c.input.val(e);
            this._updateAlternate(c);
            (b = this._get(c, "onSelect")) ? b.apply(c.input ? c.input[0] : null, [e, c]) : c.input && c.input.trigger("change");
            c.inline ? this._updateDatepicker(c) : (this._hideDatepicker(), this._lastInput = c.input[0], "object" != typeof c.input[0] && c.input.focus(), this._lastInput =
                null)
        },
        _updateAlternate: function(d) {
            var e, b, c, g = this._get(d, "altField");
            g && (e = this._get(d, "altFormat") || this._get(d, "dateFormat"), b = this._getDate(d), c = this.formatDate(e, b, this._getFormatConfig(d)), a(g).each(function() {
                a(this).val(c)
            }))
        },
        noWeekends: function(a) {
            a = a.getDay();
            return [0 < a && 6 > a, ""]
        },
        iso8601Week: function(a) {
            var e;
            a = new Date(a.getTime());
            return a.setDate(a.getDate() + 4 - (a.getDay() || 7)), e = a.getTime(), a.setMonth(0), a.setDate(1), Math.floor(Math.round((e - a) / 864E5) / 7) + 1
        },
        parseDate: function(d, e,
            b) {
            if (null == d || null == e) throw "Invalid arguments";
            if (e = "object" == typeof e ? "" + e : e + "", "" === e) return null;
            var c, g, f, h, n = 0,
                r = (b ? b.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                r = "string" != typeof r ? r : (new Date).getFullYear() % 100 + parseInt(r, 10),
                p = (b ? b.dayNamesShort : null) || this._defaults.dayNamesShort,
                s = (b ? b.dayNames : null) || this._defaults.dayNames,
                u = (b ? b.monthNamesShort : null) || this._defaults.monthNamesShort;
            b = (b ? b.monthNames : null) || this._defaults.monthNames;
            var v = -1,
                w = -1,
                I = -1,
                C = -1,
                M = !1,
                N = function(a) {
                    a =
                        d.length > c + 1 && d.charAt(c + 1) === a;
                    return a && c++, a
                },
                z = function(a) {
                    var d = N(a),
                        d = "@" === a ? 14 : "!" === a ? 20 : "y" === a && d ? 4 : "o" === a ? 3 : 2;
                    a = RegExp("^\\d{" + ("y" === a ? d : 1) + "," + d + "}");
                    a = e.substring(n).match(a);
                    if (!a) throw "Missing number at position " + n;
                    return n += a[0].length, parseInt(a[0], 10)
                },
                V = function(d, b, c) {
                    var g = -1;
                    d = a.map(N(d) ? c : b, function(a, d) {
                        return [
                            [d, a]
                        ]
                    }).sort(function(a, d) {
                        return -(a[1].length - d[1].length)
                    });
                    if (a.each(d, function(a, d) {
                        var b = d[1];
                        return e.substr(n, b.length).toLowerCase() === b.toLowerCase() ? (g =
                            d[0], n += b.length, !1) : void 0
                    }), -1 !== g) return g + 1;
                    throw "Unknown name at position " + n;
                },
                L = function() {
                    if (e.charAt(n) !== d.charAt(c)) throw "Unexpected literal at position " + n;
                    n++
                };
            for (c = 0; d.length > c; c++)
                if (M) "'" !== d.charAt(c) || N("'") ? L() : M = !1;
                else switch (d.charAt(c)) {
                    case "d":
                        I = z("d");
                        break;
                    case "D":
                        V("D", p, s);
                        break;
                    case "o":
                        C = z("o");
                        break;
                    case "m":
                        w = z("m");
                        break;
                    case "M":
                        w = V("M", u, b);
                        break;
                    case "y":
                        v = z("y");
                        break;
                    case "@":
                        h = new Date(z("@"));
                        v = h.getFullYear();
                        w = h.getMonth() + 1;
                        I = h.getDate();
                        break;
                    case "!":
                        h =
                            new Date((z("!") - this._ticksTo1970) / 1E4);
                        v = h.getFullYear();
                        w = h.getMonth() + 1;
                        I = h.getDate();
                        break;
                    case "'":
                        N("'") ? L() : M = !0;
                        break;
                    default:
                        L()
                }
                if (e.length > n && (f = e.substr(n), !/^\s+/.test(f))) throw "Extra/unparsed characters found in date: " + f;
            if (-1 === v ? v = (new Date).getFullYear() : 100 > v && (v += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (r >= v ? 0 : -100)), -1 < C)
                for (w = 1, I = C; !(g = this._getDaysInMonth(v, w - 1), g >= I);) w++, I -= g;
            if (h = this._daylightSavingAdjust(new Date(v, w - 1, I)), h.getFullYear() !== v || h.getMonth() +
                1 !== w || h.getDate() !== I) throw "Invalid date";
            return h
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 864E9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function(a, e, b) {
            if (!e) return "";
            var c, g = (b ? b.dayNamesShort : null) || this._defaults.dayNamesShort,
                f = (b ? b.dayNames : null) || this._defaults.dayNames,
                h = (b ?
                    b.monthNamesShort : null) || this._defaults.monthNamesShort;
            b = (b ? b.monthNames : null) || this._defaults.monthNames;
            var n = function(e) {
                    e = a.length > c + 1 && a.charAt(c + 1) === e;
                    return e && c++, e
                },
                r = function(a, d, e) {
                    d = "" + d;
                    if (n(a))
                        for (; e > d.length;) d = "0" + d;
                    return d
                },
                p = function(a, d, e, b) {
                    return n(a) ? b[d] : e[d]
                },
                s = "",
                u = !1;
            if (e)
                for (c = 0; a.length > c; c++)
                    if (u) "'" !== a.charAt(c) || n("'") ? s += a.charAt(c) : u = !1;
                    else switch (a.charAt(c)) {
                        case "d":
                            s += r("d", e.getDate(), 2);
                            break;
                        case "D":
                            s += p("D", e.getDay(), g, f);
                            break;
                        case "o":
                            s += r("o", Math.round(((new Date(e.getFullYear(),
                                e.getMonth(), e.getDate())).getTime() - (new Date(e.getFullYear(), 0, 0)).getTime()) / 864E5), 3);
                            break;
                        case "m":
                            s += r("m", e.getMonth() + 1, 2);
                            break;
                        case "M":
                            s += p("M", e.getMonth(), h, b);
                            break;
                        case "y":
                            s += n("y") ? e.getFullYear() : (10 > e.getYear() % 100 ? "0" : "") + e.getYear() % 100;
                            break;
                        case "@":
                            s += e.getTime();
                            break;
                        case "!":
                            s += 1E4 * e.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            n("'") ? s += "'" : u = !0;
                            break;
                        default:
                            s += a.charAt(c)
                    }
                    return s
        },
        _possibleChars: function(a) {
            var e, b = "",
                c = !1,
                g = function(b) {
                    b = a.length > e + 1 && a.charAt(e + 1) ===
                        b;
                    return b && e++, b
                };
            for (e = 0; a.length > e; e++)
                if (c) "'" !== a.charAt(e) || g("'") ? b += a.charAt(e) : c = !1;
                else switch (a.charAt(e)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        b += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        g("'") ? b += "'" : c = !0;
                        break;
                    default:
                        b += a.charAt(e)
                }
                return b
        },
        _get: function(a, e) {
            return void 0 !== a.settings[e] ? a.settings[e] : this._defaults[e]
        },
        _setDateFromField: function(a, e) {
            if (a.input.val() !== a.lastVal) {
                var b = this._get(a, "dateFormat"),
                    c = a.lastVal = a.input ? a.input.val() : null,
                    g = this._getDefaultDate(a),
                    f = g,
                    h = this._getFormatConfig(a);
                try {
                    f = this.parseDate(b, c, h) || g
                } catch (n) {
                    c = e ? "" : c
                }
                a.selectedDay = f.getDate();
                a.drawMonth = a.selectedMonth = f.getMonth();
                a.drawYear = a.selectedYear = f.getFullYear();
                a.currentDay = c ? f.getDate() : 0;
                a.currentMonth = c ? f.getMonth() : 0;
                a.currentYear = c ? f.getFullYear() : 0;
                this._adjustInstDate(a)
            }
        },
        _getDefaultDate: function(a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
        },
        _determineDate: function(d, e, b) {
            var c = function(a) {
                    var d = new Date;
                    return d.setDate(d.getDate() +
                        a), d
                },
                g = function(e) {
                    try {
                        return a.datepicker.parseDate(a.datepicker._get(d, "dateFormat"), e, a.datepicker._getFormatConfig(d))
                    } catch (b) {}
                    for (var c = (e.toLowerCase().match(/^c/) ? a.datepicker._getDate(d) : null) || new Date, g = c.getFullYear(), f = c.getMonth(), c = c.getDate(), k = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, h = k.exec(e); h;) {
                        switch (h[2] || "d") {
                            case "d":
                            case "D":
                                c += parseInt(h[1], 10);
                                break;
                            case "w":
                            case "W":
                                c += 7 * parseInt(h[1], 10);
                                break;
                            case "m":
                            case "M":
                                f += parseInt(h[1], 10);
                                c = Math.min(c, a.datepicker._getDaysInMonth(g,
                                    f));
                                break;
                            case "y":
                            case "Y":
                                g += parseInt(h[1], 10), c = Math.min(c, a.datepicker._getDaysInMonth(g, f))
                        }
                        h = k.exec(e)
                    }
                    return new Date(g, f, c)
                };
            e = null == e || "" === e ? b : "string" == typeof e ? g(e) : "number" == typeof e ? isNaN(e) ? b : c(e) : new Date(e.getTime());
            return e = e && "Invalid Date" == "" + e ? b : e, e && (e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0)), this._daylightSavingAdjust(e)
        },
        _daylightSavingAdjust: function(a) {
            return a ? (a.setHours(12 < a.getHours() ? a.getHours() + 2 : 0), a) : null
        },
        _setDate: function(a, e, b) {
            var c = !e,
                g = a.selectedMonth,
                f = a.selectedYear;
            e = this._restrictMinMax(a, this._determineDate(a, e, new Date));
            a.selectedDay = a.currentDay = e.getDate();
            a.drawMonth = a.selectedMonth = a.currentMonth = e.getMonth();
            a.drawYear = a.selectedYear = a.currentYear = e.getFullYear();
            g === a.selectedMonth && f === a.selectedYear || b || this._notifyChange(a);
            this._adjustInstDate(a);
            a.input && a.input.val(c ? "" : this._formatDate(a))
        },
        _getDate: function(a) {
            return !a.currentYear || a.input && "" === a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear,
                a.currentMonth, a.currentDay))
        },
        _attachHandlers: function(d) {
            var e = this._get(d, "stepMonths"),
                b = "#" + d.id.replace(/\\\\/g, "\\");
            d.dpDiv.find("[data-handler]").map(function() {
                a(this).bind(this.getAttribute("data-event"), {
                    prev: function() {
                        a.datepicker._adjustDate(b, -e, "M")
                    },
                    next: function() {
                        a.datepicker._adjustDate(b, +e, "M")
                    },
                    hide: function() {
                        a.datepicker._hideDatepicker()
                    },
                    today: function() {
                        a.datepicker._gotoToday(b)
                    },
                    selectDay: function() {
                        return a.datepicker._selectDay(b, +this.getAttribute("data-month"), +this.getAttribute("data-year"),
                            this), !1
                    },
                    selectMonth: function() {
                        return a.datepicker._selectMonthYear(b, this, "M"), !1
                    },
                    selectYear: function() {
                        return a.datepicker._selectMonthYear(b, this, "Y"), !1
                    }
                }[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(a) {
            var e, b, c, g, f, h, n, r, p, s, u, v, w, I, C, M, N, z, V, L, Q, G, da, S, P, ha, ka, ia = new Date,
                ia = this._daylightSavingAdjust(new Date(ia.getFullYear(), ia.getMonth(), ia.getDate())),
                ba = this._get(a, "isRTL");
            h = this._get(a, "showButtonPanel");
            c = this._get(a, "hideIfNoPrevNext");
            f = this._get(a, "navigationAsDateFormat");
            var T = this._getNumberOfMonths(a),
                R = this._get(a, "showCurrentAtPos");
            g = this._get(a, "stepMonths");
            var H = 1 !== T[0] || 1 !== T[1],
                ta = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)),
                oa = this._getMinMaxDate(a, "min"),
                ja = this._getMinMaxDate(a, "max"),
                R = a.drawMonth - R,
                W = a.drawYear;
            if (0 > R && (R += 12, W--), ja)
                for (e = this._daylightSavingAdjust(new Date(ja.getFullYear(), ja.getMonth() - T[0] * T[1] + 1, ja.getDate())), e = oa && oa > e ? oa : e; this._daylightSavingAdjust(new Date(W,
                    R, 1)) > e;) R--, 0 > R && (R = 11, W--);
            a.drawMonth = R;
            a.drawYear = W;
            e = this._get(a, "prevText");
            e = f ? this.formatDate(e, this._daylightSavingAdjust(new Date(W, R - g, 1)), this._getFormatConfig(a)) : e;
            e = this._canAdjustMonth(a, -1, W, R) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (ba ? "e" : "w") + "'>" + e + "</span></a>" : c ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" +
                (ba ? "e" : "w") + "'>" + e + "</span></a>";
            b = this._get(a, "nextText");
            b = f ? this.formatDate(b, this._daylightSavingAdjust(new Date(W, R + g, 1)), this._getFormatConfig(a)) : b;
            c = this._canAdjustMonth(a, 1, W, R) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + b + "'><span class='ui-icon ui-icon-circle-triangle-" + (ba ? "w" : "e") + "'>" + b + "</span></a>" : c ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + b + "'><span class='ui-icon ui-icon-circle-triangle-" + (ba ? "w" :
                "e") + "'>" + b + "</span></a>";
            g = this._get(a, "currentText");
            b = this._get(a, "gotoCurrent") && a.currentDay ? ta : ia;
            g = f ? this.formatDate(g, b, this._getFormatConfig(a)) : g;
            f = a.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(a, "closeText") + "</button>";
            h = h ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (ba ? f : "") + (this._isInRange(a, b) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" +
                g + "</button>" : "") + (ba ? "" : f) + "</div>" : "";
            f = parseInt(this._get(a, "firstDay"), 10);
            f = isNaN(f) ? 0 : f;
            g = this._get(a, "showWeek");
            b = this._get(a, "dayNames");
            n = this._get(a, "dayNamesMin");
            r = this._get(a, "monthNames");
            p = this._get(a, "monthNamesShort");
            s = this._get(a, "beforeShowDay");
            u = this._get(a, "showOtherMonths");
            v = this._get(a, "selectOtherMonths");
            w = this._getDefaultDate(a);
            I = "";
            for (M = 0; T[0] > M; M++) {
                N = "";
                this.maxRows = 4;
                for (z = 0; T[1] > z; z++) {
                    if (V = this._daylightSavingAdjust(new Date(W, R, a.selectedDay)), C = " ui-corner-all",
                        L = "", H) {
                        if (L += "<div class='ui-datepicker-group", 1 < T[1]) switch (z) {
                            case 0:
                                L += " ui-datepicker-group-first";
                                C = " ui-corner-" + (ba ? "right" : "left");
                                break;
                            case T[1] - 1:
                                L += " ui-datepicker-group-last";
                                C = " ui-corner-" + (ba ? "left" : "right");
                                break;
                            default:
                                L += " ui-datepicker-group-middle", C = ""
                        }
                        L += "'>"
                    }
                    L += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + C + "'>" + (/all|left/.test(C) && 0 === M ? ba ? c : e : "") + (/all|right/.test(C) && 0 === M ? ba ? e : c : "") + this._generateMonthYearHeader(a, R, W, oa, ja, 0 < M || 0 < z, r, p) + "</div><table class='ui-datepicker-calendar'><thead><tr>";
                    Q = g ? "<th class='ui-datepicker-week-col'>" + this._get(a, "weekHeader") + "</th>" : "";
                    for (C = 0; 7 > C; C++) G = (C + f) % 7, Q += "<th scope='col'" + (5 <= (C + f + 6) % 7 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + b[G] + "'>" + n[G] + "</span></th>";
                    L += Q + "</tr></thead><tbody>";
                    Q = this._getDaysInMonth(W, R);
                    W === a.selectedYear && R === a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, Q));
                    C = (this._getFirstDayOfMonth(W, R) - f + 7) % 7;
                    Q = Math.ceil((C + Q) / 7);
                    this.maxRows = Q = H ? this.maxRows > Q ? this.maxRows : Q : Q;
                    G = this._daylightSavingAdjust(new Date(W,
                        R, 1 - C));
                    for (da = 0; Q > da; da++) {
                        L += "<tr>";
                        S = g ? "<td class='ui-datepicker-week-col'>" + this._get(a, "calculateWeek")(G) + "</td>" : "";
                        for (C = 0; 7 > C; C++) P = s ? s.apply(a.input ? a.input[0] : null, [G]) : [!0, ""], ka = (ha = G.getMonth() !== R) && !v || !P[0] || oa && oa > G || ja && G > ja, S += "<td class='" + (5 <= (C + f + 6) % 7 ? " ui-datepicker-week-end" : "") + (ha ? " ui-datepicker-other-month" : "") + (G.getTime() === V.getTime() && R === a.selectedMonth && a._keyEvent || w.getTime() === G.getTime() && w.getTime() === V.getTime() ? " " + this._dayOverClass : "") + (ka ? " " + this._unselectableClass +
                            " ui-state-disabled" : "") + (ha && !u ? "" : " " + P[1] + (G.getTime() === ta.getTime() ? " " + this._currentClass : "") + (G.getTime() === ia.getTime() ? " ui-datepicker-today" : "")) + "'" + (ha && !u || !P[2] ? "" : " title='" + P[2].replace(/'/g, "&#39;") + "'") + (ka ? "" : " data-handler='selectDay' data-event='click' data-month='" + G.getMonth() + "' data-year='" + G.getFullYear() + "'") + ">" + (ha && !u ? "&#xa0;" : ka ? "<span class='ui-state-default'>" + G.getDate() + "</span>" : "<a class='ui-state-default" + (G.getTime() === ia.getTime() ? " ui-state-highlight" : "") +
                            (G.getTime() === ta.getTime() ? " ui-state-active" : "") + (ha ? " ui-priority-secondary" : "") + "' href='#'>" + G.getDate() + "</a>") + "</td>", G.setDate(G.getDate() + 1), G = this._daylightSavingAdjust(G);
                        L += S + "</tr>"
                    }
                    R++;
                    11 < R && (R = 0, W++);
                    L += "</tbody></table>" + (H ? "</div>" + (0 < T[0] && z === T[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
                    N += L
                }
                I += N
            }
            return I += h, a._keyEvent = !1, I
        },
        _generateMonthYearHeader: function(a, b, c, g, f, h, n, r) {
            var p, s, u, v = this._get(a, "changeMonth"),
                w = this._get(a, "changeYear"),
                y = this._get(a, "showMonthAfterYear"),
                I = "<div class='ui-datepicker-title'>",
                C = "";
            if (h || !v) C += "<span class='ui-datepicker-month'>" + n[b] + "</span>";
            else {
                n = g && g.getFullYear() === c;
                p = f && f.getFullYear() === c;
                C += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
                for (s = 0; 12 > s; s++)(!n || s >= g.getMonth()) && (!p || f.getMonth() >= s) && (C += "<option value='" + s + "'" + (s === b ? " selected='selected'" : "") + ">" + r[s] + "</option>");
                C += "</select>"
            } if (y || (I += C + (!h && v && w ? "" : "&#xa0;")), !a.yearshtml)
                if (a.yearshtml = "", h || !w) I += "<span class='ui-datepicker-year'>" +
                    c + "</span>";
                else {
                    r = this._get(a, "yearRange").split(":");
                    u = (new Date).getFullYear();
                    n = function(a) {
                        a = a.match(/c[+\-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+\-].*/) ? u + parseInt(a, 10) : parseInt(a, 10);
                        return isNaN(a) ? u : a
                    };
                    b = n(r[0]);
                    r = Math.max(b, n(r[1] || ""));
                    b = g ? Math.max(b, g.getFullYear()) : b;
                    r = f ? Math.min(r, f.getFullYear()) : r;
                    for (a.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; r >= b; b++) a.yearshtml += "<option value='" + b + "'" + (b === c ? " selected='selected'" :
                        "") + ">" + b + "</option>";
                    a.yearshtml += "</select>";
                    I += a.yearshtml;
                    a.yearshtml = null
                }
            return I += this._get(a, "yearSuffix"), y && (I += (!h && v && w ? "" : "&#xa0;") + C), I += "</div>"
        },
        _adjustInstDate: function(a, b, c) {
            var g = a.drawYear + ("Y" === c ? b : 0),
                f = a.drawMonth + ("M" === c ? b : 0);
            b = Math.min(a.selectedDay, this._getDaysInMonth(g, f)) + ("D" === c ? b : 0);
            g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(g, f, b)));
            a.selectedDay = g.getDate();
            a.drawMonth = a.selectedMonth = g.getMonth();
            a.drawYear = a.selectedYear = g.getFullYear();
            "M" !==
                c && "Y" !== c || this._notifyChange(a)
        },
        _restrictMinMax: function(a, b) {
            var c = this._getMinMaxDate(a, "min"),
                g = this._getMinMaxDate(a, "max"),
                c = c && c > b ? c : b;
            return g && c > g ? g : c
        },
        _notifyChange: function(a) {
            var b = this._get(a, "onChangeMonthYear");
            b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
        },
        _getNumberOfMonths: function(a) {
            a = this._get(a, "numberOfMonths");
            return null == a ? [1, 1] : "number" == typeof a ? [1, a] : a
        },
        _getMinMaxDate: function(a, b) {
            return this._determineDate(a, this._get(a, b + "Date"), null)
        },
        _getDaysInMonth: function(a, b) {
            return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
        },
        _getFirstDayOfMonth: function(a, b) {
            return (new Date(a, b, 1)).getDay()
        },
        _canAdjustMonth: function(a, b, c, g) {
            var f = this._getNumberOfMonths(a);
            c = this._daylightSavingAdjust(new Date(c, g + (0 > b ? b : f[0] * f[1]), 1));
            return 0 > b && c.setDate(this._getDaysInMonth(c.getFullYear(), c.getMonth())), this._isInRange(a, c)
        },
        _isInRange: function(a, b) {
            var c, g, f = this._getMinMaxDate(a, "min"),
                h = this._getMinMaxDate(a, "max"),
                n = null,
                r = null,
                p =
                this._get(a, "yearRange");
            return p && (c = p.split(":"), g = (new Date).getFullYear(), n = parseInt(c[0], 10), r = parseInt(c[1], 10), c[0].match(/[+\-].*/) && (n += g), c[1].match(/[+\-].*/) && (r += g)), (!f || b.getTime() >= f.getTime()) && (!h || b.getTime() <= h.getTime()) && (!n || b.getFullYear() >= n) && (!r || r >= b.getFullYear())
        },
        _getFormatConfig: function(a) {
            var b = this._get(a, "shortYearCutoff");
            return b = "string" != typeof b ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), {
                shortYearCutoff: b,
                dayNamesShort: this._get(a, "dayNamesShort"),
                dayNames: this._get(a,
                    "dayNames"),
                monthNamesShort: this._get(a, "monthNamesShort"),
                monthNames: this._get(a, "monthNames")
            }
        },
        _formatDate: function(a, b, c, g) {
            b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
            b = b ? "object" == typeof b ? b : this._daylightSavingAdjust(new Date(g, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return this.formatDate(this._get(a, "dateFormat"), b, this._getFormatConfig(a))
        }
    });
    a.fn.datepicker = function(d) {
        if (!this.length) return this;
        a.datepicker.initialized || (a(document).mousedown(a.datepicker._checkExternalClick), a.datepicker.initialized = !0);
        0 === a("#" + a.datepicker._mainDivId).length && a("body").append(a.datepicker.dpDiv);
        var b = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof d || "isDisabled" !== d && "getDate" !== d && "widget" !== d ? "option" === d && 2 === arguments.length && "string" == typeof arguments[1] ? a.datepicker["_" + d + "Datepicker"].apply(a.datepicker, [this[0]].concat(b)) : this.each(function() {
            "string" == typeof d ? a.datepicker["_" +
                d + "Datepicker"].apply(a.datepicker, [this].concat(b)) : a.datepicker._attachDatepicker(this, d)
        }) : a.datepicker["_" + d + "Datepicker"].apply(a.datepicker, [this[0]].concat(b))
    };
    a.datepicker = new f;
    a.datepicker.initialized = !1;
    a.datepicker.uuid = (new Date).getTime();
    a.datepicker.version = "1.11.2";
    a.datepicker;
    var u = a;
    a.effects = {
        effect: {}
    };
    (function(a, b) {
        function c(a, d, b) {
            var e = u[d.type] || {};
            return null == a ? b || !d.def ? null : d.def : (a = e.floor ? ~~a : parseFloat(a), isNaN(a) ? d.def : e.mod ? (a + e.mod) % e.mod : 0 > a ? 0 : a > e.max ? e.max :
                a)
        }

        function g(c) {
            var f = p(),
                k = f._rgba = [];
            return c = c.toLowerCase(), y(r, function(a, d) {
                var g, h = d.re.exec(c),
                    h = h && d.parse(h),
                    q = d.space || "rgba";
                return h ? (g = f[q](h), f[s[q].cache] = g[s[q].cache], k = f._rgba = g._rgba, !1) : b
            }), k.length ? ("0,0,0,0" === k.join() && a.extend(k, h.transparent), f) : h[c]
        }

        function f(a, d, b) {
            return b = (b + 1) % 1, 1 > 6 * b ? a + 6 * (d - a) * b : 1 > 2 * b ? d : 2 > 3 * b ? a + 6 * (d - a) * (2 / 3 - b) : a
        }
        var h, n = /^([\-+])=\s*(\d+\.?\d*)/,
            r = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(a) {
                    return [a[1],
                        a[2], a[3], a[4]
                    ]
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(a) {
                    return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                parse: function(a) {
                    return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                parse: function(a) {
                    return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function(a) {
                    return [a[1], a[2] / 100, a[3] / 100, a[4]]
                }
            }],
            p = a.Color = function(b, e, c, g) {
                return new a.Color.fn.parse(b, e, c, g)
            },
            s = {
                rgba: {
                    props: {
                        red: {
                            idx: 0,
                            type: "byte"
                        },
                        green: {
                            idx: 1,
                            type: "byte"
                        },
                        blue: {
                            idx: 2,
                            type: "byte"
                        }
                    }
                },
                hsla: {
                    props: {
                        hue: {
                            idx: 0,
                            type: "degrees"
                        },
                        saturation: {
                            idx: 1,
                            type: "percent"
                        },
                        lightness: {
                            idx: 2,
                            type: "percent"
                        }
                    }
                }
            },
            u = {
                "byte": {
                    floor: !0,
                    max: 255
                },
                percent: {
                    max: 1
                },
                degrees: {
                    mod: 360,
                    floor: !0
                }
            },
            v = p.support = {},
            w = a("<p>")[0],
            y = a.each;
        w.style.cssText = "background-color:rgba(1,1,1,.5)";
        v.rgba = -1 < w.style.backgroundColor.indexOf("rgba");
        y(s, function(a, d) {
            d.cache = "_" + a;
            d.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        });
        p.fn = a.extend(p.prototype, {
            parse: function(f, n, r, t) {
                if (f === b) return this._rgba = [null, null, null, null], this;
                (f.jquery || f.nodeType) && (f = a(f).css(n), n = b);
                var u = this,
                    v = a.type(f),
                    w = this._rgba = [];
                return n !== b && (f = [f, n, r, t], v = "array"), "string" === v ? this.parse(g(f) || h._default) : "array" === v ? (y(s.rgba.props, function(a, d) {
                    w[d.idx] = c(f[d.idx], d)
                }), this) : "object" === v ? (f instanceof p ? y(s, function(a,
                    d) {
                    f[d.cache] && (u[d.cache] = f[d.cache].slice())
                }) : y(s, function(b, e) {
                    var g = e.cache;
                    y(e.props, function(a, d) {
                        if (!u[g] && e.to) {
                            if ("alpha" === a || null == f[a]) return;
                            u[g] = e.to(u._rgba)
                        }
                        u[g][d.idx] = c(f[a], d, !0)
                    });
                    u[g] && 0 > a.inArray(null, u[g].slice(0, 3)) && (u[g][3] = 1, e.from && (u._rgba = e.from(u[g])))
                }), this) : b
            },
            is: function(a) {
                var d = p(a),
                    c = !0,
                    g = this;
                return y(s, function(a, f) {
                        var k, h = d[f.cache];
                        return h && (k = g[f.cache] || f.to && f.to(g._rgba) || [], y(f.props, function(a, d) {
                            return null != h[d.idx] ? c = h[d.idx] === k[d.idx] : b
                        })), c
                    }),
                    c
            },
            _space: function() {
                var a = [],
                    d = this;
                return y(s, function(b, e) {
                    d[e.cache] && a.push(b)
                }), a.pop()
            },
            transition: function(a, d) {
                var b = p(a),
                    e = b._space(),
                    g = s[e],
                    f = 0 === this.alpha() ? p("transparent") : this,
                    h = f[g.cache] || g.to(f._rgba),
                    q = h.slice();
                return b = b[g.cache], y(g.props, function(a, e) {
                    var g = e.idx,
                        f = h[g],
                        n = b[g],
                        r = u[e.type] || {};
                    null !== n && (null === f ? q[g] = n : (r.mod && (n - f > r.mod / 2 ? f += r.mod : f - n > r.mod / 2 && (f -= r.mod)), q[g] = c((n - f) * d + f, e)))
                }), this[e](q)
            },
            blend: function(b) {
                if (1 === this._rgba[3]) return this;
                var e = this._rgba.slice(),
                    c = e.pop(),
                    g = p(b)._rgba;
                return p(a.map(e, function(a, d) {
                    return (1 - c) * g[d] + c * a
                }))
            },
            toRgbaString: function() {
                var b = "rgba(",
                    e = a.map(this._rgba, function(a, d) {
                        return null == a ? 2 < d ? 1 : 0 : a
                    });
                return 1 === e[3] && (e.pop(), b = "rgb("), b + e.join() + ")"
            },
            toHslaString: function() {
                var b = "hsla(",
                    e = a.map(this.hsla(), function(a, d) {
                        return null == a && (a = 2 < d ? 1 : 0), d && 3 > d && (a = Math.round(100 * a) + "%"), a
                    });
                return 1 === e[3] && (e.pop(), b = "hsl("), b + e.join() + ")"
            },
            toHexString: function(b) {
                var e = this._rgba.slice(),
                    c = e.pop();
                return b && e.push(~~(255 *
                    c)), "#" + a.map(e, function(a) {
                    return a = (a || 0).toString(16), 1 === a.length ? "0" + a : a
                }).join("")
            },
            toString: function() {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        });
        p.fn.parse.prototype = p.fn;
        s.hsla.to = function(a) {
            if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
            var d, b, e = a[0] / 255,
                c = a[1] / 255,
                g = a[2] / 255;
            a = a[3];
            var f = Math.max(e, c, g),
                k = Math.min(e, c, g),
                h = f - k,
                q = f + k,
                n = 0.5 * q;
            return d = k === f ? 0 : e === f ? 60 * (c - g) / h + 360 : c === f ? 60 * (g - e) / h + 120 : 60 * (e - c) / h + 240, b = 0 === h ? 0 : 0.5 >= n ? h / q : h / (2 - q), [Math.round(d) %
                360, b, n, null == a ? 1 : a
            ]
        };
        s.hsla.from = function(a) {
            if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
            var d = a[0] / 360,
                b = a[1],
                e = a[2];
            a = a[3];
            b = 0.5 >= e ? e * (1 + b) : e + b - e * b;
            e = 2 * e - b;
            return [Math.round(255 * f(e, b, d + 1 / 3)), Math.round(255 * f(e, b, d)), Math.round(255 * f(e, b, d - 1 / 3)), a]
        };
        y(s, function(g, f) {
            var h = f.props,
                q = f.cache,
                r = f.to,
                t = f.from;
            p.fn[g] = function(g) {
                if (r && !this[q] && (this[q] = r(this._rgba)), g === b) return this[q].slice();
                var f, n = a.type(g),
                    s = "array" === n || "object" === n ? g : arguments,
                    u = this[q].slice();
                return y(h,
                    function(a, d) {
                        var b = s["object" === n ? a : d.idx];
                        null == b && (b = u[d.idx]);
                        u[d.idx] = c(b, d)
                    }), t ? (f = p(t(u)), f[q] = u, f) : p(u)
            };
            y(h, function(b, e) {
                p.fn[b] || (p.fn[b] = function(c) {
                    var f, k = a.type(c),
                        h = "alpha" === b ? this._hsla ? "hsla" : "rgba" : g,
                        q = this[h](),
                        r = q[e.idx];
                    return "undefined" === k ? r : ("function" === k && (c = c.call(this, r), k = a.type(c)), null == c && e.empty ? this : ("string" === k && (f = n.exec(c), f && (c = r + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), q[e.idx] = c, this[h](q)))
                })
            })
        });
        p.hook = function(b) {
            b = b.split(" ");
            y(b, function(b, e) {
                a.cssHooks[e] = {
                    set: function(b, c) {
                        var f, k = "";
                        if ("transparent" !== c && ("string" !== a.type(c) || (f = g(c)))) {
                            if (c = p(f || c), !v.rgba && 1 !== c._rgba[3]) {
                                for (f = "backgroundColor" === e ? b.parentNode : b;
                                    ("" === k || "transparent" === k) && f && f.style;) try {
                                    k = a.css(f, "backgroundColor"), f = f.parentNode
                                } catch (h) {}
                                c = c.blend(k && "transparent" !== k ? k : "_default")
                            }
                            c = c.toRgbaString()
                        }
                        try {
                            b.style[e] = c
                        } catch (n) {}
                    }
                };
                a.fx.step[e] = function(b) {
                    b.colorInit || (b.start = p(b.elem, e), b.end = p(b.end), b.colorInit = !0);
                    a.cssHooks[e].set(b.elem, b.start.transition(b.end, b.pos))
                }
            })
        };
        p.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor");
        a.cssHooks.borderColor = {
            expand: function(a) {
                var d = {};
                return y(["Top", "Right", "Bottom", "Left"], function(b, e) {
                    d["border" + e + "Color"] = a
                }), d
            }
        };
        h = a.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    })(u);
    (function() {
        function d(d) {
            var b, e = d.ownerDocument.defaultView ? d.ownerDocument.defaultView.getComputedStyle(d, null) : d.currentStyle,
                c = {};
            if (e && e.length && e[0] && e[e[0]])
                for (d = e.length; d--;) b = e[d], "string" == typeof e[b] && (c[a.camelCase(b)] = e[b]);
            else
                for (b in e) "string" == typeof e[b] && (c[b] = e[b]);
            return c
        }
        var b = ["add", "remove", "toggle"],
            c = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1
            };
        a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(d, b) {
            a.fx.step[b] = function(a) {
                ("none" !== a.end && !a.setAttr || 1 === a.pos && !a.setAttr) && (u.style(a.elem, b, a.end), a.setAttr = !0)
            }
        });
        a.fn.addBack || (a.fn.addBack = function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        });
        a.effects.animateClass = function(g, f, h, n) {
            var r = a.speed(f, h, n);
            return this.queue(function() {
                var f, h = a(this),
                    n = h.attr("class") ||
                    "",
                    p = r.children ? h.find("*").addBack() : h,
                    p = p.map(function() {
                        return {
                            el: a(this),
                            start: d(this)
                        }
                    });
                f = function() {
                    a.each(b, function(a, d) {
                        g[d] && h[d + "Class"](g[d])
                    })
                };
                f();
                p = p.map(function() {
                    this.end = d(this.el[0]);
                    var b = this.start,
                        e = this.end,
                        g, f, h = {};
                    for (g in e) f = e[g], b[g] !== f && (c[g] || (a.fx.step[g] || !isNaN(parseFloat(f))) && (h[g] = f));
                    return this.diff = h, this
                });
                h.attr("class", n);
                p = p.map(function() {
                    var d = this,
                        b = a.Deferred(),
                        e = a.extend({}, r, {
                            queue: !1,
                            complete: function() {
                                b.resolve(d)
                            }
                        });
                    return this.el.animate(this.diff,
                        e), b.promise()
                });
                a.when.apply(a, p.get()).done(function() {
                    f();
                    a.each(arguments, function() {
                        var d = this.el;
                        a.each(this.diff, function(a) {
                            d.css(a, "")
                        })
                    });
                    r.complete.call(h[0])
                })
            })
        };
        a.fn.extend({
            addClass: function(d) {
                return function(b, e, c, g) {
                    return e ? a.effects.animateClass.call(this, {
                        add: b
                    }, e, c, g) : d.apply(this, arguments)
                }
            }(a.fn.addClass),
            removeClass: function(d) {
                return function(b, e, c, g) {
                    return 1 < arguments.length ? a.effects.animateClass.call(this, {
                        remove: b
                    }, e, c, g) : d.apply(this, arguments)
                }
            }(a.fn.removeClass),
            toggleClass: function(d) {
                return function(b, e, c, g, f) {
                    return "boolean" == typeof e || void 0 === e ? c ? a.effects.animateClass.call(this, e ? {
                        add: b
                    } : {
                        remove: b
                    }, c, g, f) : d.apply(this, arguments) : a.effects.animateClass.call(this, {
                        toggle: b
                    }, e, c, g)
                }
            }(a.fn.toggleClass),
            switchClass: function(d, b, e, c, g) {
                return a.effects.animateClass.call(this, {
                    add: b,
                    remove: d
                }, e, c, g)
            }
        })
    })();
    (function() {
        function d(d, b, e, c) {
            return a.isPlainObject(d) && (b = d, d = d.effect), d = {
                effect: d
            }, null == b && (b = {}), a.isFunction(b) && (c = b, e = null, b = {}), ("number" ==
                typeof b || a.fx.speeds[b]) && (c = e, e = b, b = {}), a.isFunction(e) && (c = e, e = null), b && a.extend(d, b), e = e || b.duration, d.duration = a.fx.off ? 0 : "number" == typeof e ? e : e in a.fx.speeds ? a.fx.speeds[e] : a.fx.speeds._default, d.complete = c || b.complete, d
        }

        function b(d) {
            return !d || "number" == typeof d || a.fx.speeds[d] ? !0 : "string" != typeof d || a.effects.effect[d] ? a.isFunction(d) ? !0 : "object" != typeof d || d.effect ? !1 : !0 : !0
        }
        a.extend(a.effects, {
            version: "1.11.2",
            save: function(a, d) {
                for (var b = 0; d.length > b; b++) null !== d[b] && a.data("ui-effects-" +
                    d[b], a[0].style[d[b]])
            },
            restore: function(a, d) {
                var b, e;
                for (e = 0; d.length > e; e++) null !== d[e] && (b = a.data("ui-effects-" + d[e]), void 0 === b && (b = ""), a.css(d[e], b))
            },
            setMode: function(a, d) {
                return "toggle" === d && (d = a.is(":hidden") ? "show" : "hide"), d
            },
            getBaseline: function(a, d) {
                var b, e;
                switch (a[0]) {
                    case "top":
                        b = 0;
                        break;
                    case "middle":
                        b = 0.5;
                        break;
                    case "bottom":
                        b = 1;
                        break;
                    default:
                        b = a[0] / d.height
                }
                switch (a[1]) {
                    case "left":
                        e = 0;
                        break;
                    case "center":
                        e = 0.5;
                        break;
                    case "right":
                        e = 1;
                        break;
                    default:
                        e = a[1] / d.width
                }
                return {
                    x: e,
                    y: b
                }
            },
            createWrapper: function(d) {
                if (d.parent().is(".ui-effects-wrapper")) return d.parent();
                var b = {
                        width: d.outerWidth(!0),
                        height: d.outerHeight(!0),
                        "float": d.css("float")
                    },
                    e = a("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }),
                    c = {
                        width: d.width(),
                        height: d.height()
                    },
                    g = document.activeElement;
                try {
                    g.id
                } catch (f) {
                    g = document.body
                }
                return d.wrap(e), (d[0] === g || a.contains(d[0], g)) && a(g).focus(), e = d.parent(), "static" === d.css("position") ? (e.css({
                    position: "relative"
                }), d.css({
                    position: "relative"
                })) : (a.extend(b, {
                    position: d.css("position"),
                    zIndex: d.css("z-index")
                }), a.each(["top", "left", "bottom", "right"], function(a, e) {
                    b[e] = d.css(e);
                    isNaN(parseInt(b[e], 10)) && (b[e] = "auto")
                }), d.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })), d.css(c), e.css(b).show()
            },
            removeWrapper: function(d) {
                var b = document.activeElement;
                return d.parent().is(".ui-effects-wrapper") && (d.parent().replaceWith(d), (d[0] === b || a.contains(d[0], b)) && a(b).focus()), d
            },
            setTransition: function(d, b, e, c) {
                return c = c || {}, a.each(b, function(a, b) {
                    var g = d.cssUnit(b);
                    0 < g[0] &&
                        (c[b] = g[0] * e + g[1])
                }), c
            }
        });
        a.fn.extend({
            effect: function() {
                function b(d) {
                    function c() {
                        a.isFunction(h) && h.call(g[0]);
                        a.isFunction(d) && d()
                    }
                    var g = a(this),
                        h = e.complete,
                        k = e.mode;
                    (g.is(":hidden") ? "hide" === k : "show" === k) ? (g[k](), c()) : f.call(g[0], e, c)
                }
                var e = d.apply(this, arguments),
                    c = e.mode,
                    g = e.queue,
                    f = a.effects.effect[e.effect];
                return a.fx.off || !f ? c ? this[c](e.duration, e.complete) : this.each(function() {
                    e.complete && e.complete.call(this)
                }) : !1 === g ? this.each(b) : this.queue(g || "fx", b)
            },
            show: function(a) {
                return function(c) {
                    if (b(c)) return a.apply(this,
                        arguments);
                    var g = d.apply(this, arguments);
                    return g.mode = "show", this.effect.call(this, g)
                }
            }(a.fn.show),
            hide: function(a) {
                return function(c) {
                    if (b(c)) return a.apply(this, arguments);
                    var g = d.apply(this, arguments);
                    return g.mode = "hide", this.effect.call(this, g)
                }
            }(a.fn.hide),
            toggle: function(a) {
                return function(c) {
                    if (b(c) || "boolean" == typeof c) return a.apply(this, arguments);
                    var g = d.apply(this, arguments);
                    return g.mode = "toggle", this.effect.call(this, g)
                }
            }(a.fn.toggle),
            cssUnit: function(d) {
                var b = this.css(d),
                    e = [];
                return a.each(["em",
                    "px", "%", "pt"
                ], function(a, d) {
                    0 < b.indexOf(d) && (e = [parseFloat(b), d])
                }), e
            }
        })
    })();
    (function() {
        var d = {};
        a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(a, b) {
            d[b] = function(d) {
                return Math.pow(d, a + 2)
            }
        });
        a.extend(d, {
            Sine: function(a) {
                return 1 - Math.cos(a * Math.PI / 2)
            },
            Circ: function(a) {
                return 1 - Math.sqrt(1 - a * a)
            },
            Elastic: function(a) {
                return 0 === a || 1 === a ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin((80 * (a - 1) - 7.5) * Math.PI / 15)
            },
            Back: function(a) {
                return a * a * (3 * a - 2)
            },
            Bounce: function(a) {
                for (var d, b = 4;
                    ((d = Math.pow(2, --b)) - 1) /
                    11 > a;);
                return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((3 * d - 2) / 22 - a, 2)
            }
        });
        a.each(d, function(d, b) {
            a.easing["easeIn" + d] = b;
            a.easing["easeOut" + d] = function(a) {
                return 1 - b(1 - a)
            };
            a.easing["easeInOut" + d] = function(a) {
                return 0.5 > a ? b(2 * a) / 2 : 1 - b(-2 * a + 2) / 2
            }
        })
    })();
    a.effects;
    a.effects.effect.highlight = function(d, b) {
        var c = a(this),
            g = ["backgroundImage", "backgroundColor", "opacity"],
            f = a.effects.setMode(c, d.mode || "show"),
            h = {
                backgroundColor: c.css("backgroundColor")
            };
        "hide" === f && (h.opacity = 0);
        a.effects.save(c, g);
        c.show().css({
            backgroundImage: "none",
            backgroundColor: d.color || "#ffff99"
        }).animate(h, {
            queue: !1,
            duration: d.duration,
            easing: d.easing,
            complete: function() {
                "hide" === f && c.hide();
                a.effects.restore(c, g);
                b()
            }
        })
    }
});
var mejs = mejs || {};
mejs.version = "2.14.2";
mejs.meIndex = 0;
mejs.plugins = {
    silverlight: [{
        version: [3, 0],
        types: "video/mp4 video/m4v video/mov video/wmv audio/wma audio/m4a audio/mp3 audio/wav audio/mpeg".split(" ")
    }],
    flash: [{
        version: [9, 0, 124],
        types: "video/mp4 video/m4v video/mov video/flv video/rtmp video/x-flv audio/flv audio/x-flv audio/mp3 audio/m4a audio/mpeg video/youtube video/x-youtube".split(" ")
    }],
    youtube: [{
        version: null,
        types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]
    }],
    vimeo: [{
        version: null,
        types: ["video/vimeo", "video/x-vimeo"]
    }]
};
mejs.Utility = {
    encodeUrl: function(a) {
        return encodeURIComponent(a)
    },
    escapeHTML: function(a) {
        return a.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
    },
    absolutizeUrl: function(a) {
        var b = document.createElement("div");
        b.innerHTML = '<a href="' + this.escapeHTML(a) + '">x</a>';
        return b.firstChild.href
    },
    getScriptPath: function(a) {
        for (var b = 0, c, h = "", f = "", p, g, r = document.getElementsByTagName("script"), s = r.length, n = a.length; b < s; b++) {
            p = r[b].src;
            c = p.lastIndexOf("/"); - 1 < c ? (g = p.substring(c +
                1), p = p.substring(0, c + 1)) : (g = p, p = "");
            for (c = 0; c < n; c++)
                if (f = a[c], f = g.indexOf(f), -1 < f) {
                    h = p;
                    break
                }
            if ("" !== h) break
        }
        return h
    },
    secondsToTimeCode: function(a, b, c, h) {
        "undefined" == typeof c ? c = !1 : "undefined" == typeof h && (h = 25);
        var f = Math.floor(a / 3600) % 24,
            p = Math.floor(a / 60) % 60,
            g = Math.floor(a % 60);
        a = Math.floor((a % 1 * h).toFixed(3));
        return (b || 0 < f ? (10 > f ? "0" + f : f) + ":" : "") + (10 > p ? "0" + p : p) + ":" + (10 > g ? "0" + g : g) + (c ? ":" + (10 > a ? "0" + a : a) : "")
    },
    timeCodeToSeconds: function(a, b, c, h) {
        "undefined" == typeof c ? c = !1 : "undefined" == typeof h && (h =
            25);
        a = a.split(":");
        b = parseInt(a[0], 10);
        var f = parseInt(a[1], 10),
            p = parseInt(a[2], 10),
            g = 0;
        c && (g = parseInt(a[3]) / h);
        return 3600 * b + 60 * f + p + g
    },
    convertSMPTEtoSeconds: function(a) {
        if ("string" != typeof a) return !1;
        a = a.replace(",", ".");
        var b = 0,
            c = -1 != a.indexOf(".") ? a.split(".")[1].length : 0,
            h = 1;
        a = a.split(":").reverse();
        for (var f = 0; f < a.length; f++) h = 1, 0 < f && (h = Math.pow(60, f)), b += Number(a[f]) * h;
        return Number(b.toFixed(c))
    },
    removeSwf: function(a) {
        var b = document.getElementById(a);
        b && /object|embed/i.test(b.nodeName) && (mejs.MediaFeatures.isIE ?
            (b.style.display = "none", function() {
                4 == b.readyState ? mejs.Utility.removeObjectInIE(a) : setTimeout(arguments.callee, 10)
            }()) : b.parentNode.removeChild(b))
    },
    removeObjectInIE: function(a) {
        if (a = document.getElementById(a)) {
            for (var b in a) "function" == typeof a[b] && (a[b] = null);
            a.parentNode.removeChild(a)
        }
    }
};
mejs.PluginDetector = {
    hasPluginVersion: function(a, b) {
        var c = this.plugins[a];
        b[1] = b[1] || 0;
        b[2] = b[2] || 0;
        return c[0] > b[0] || c[0] == b[0] && c[1] > b[1] || c[0] == b[0] && c[1] == b[1] && c[2] >= b[2] ? !0 : !1
    },
    nav: window.navigator,
    ua: window.navigator.userAgent.toLowerCase(),
    plugins: [],
    addPlugin: function(a, b, c, h, f) {
        this.plugins[a] = this.detectPlugin(b, c, h, f)
    },
    detectPlugin: function(a, b, c, h) {
        var f = [0, 0, 0],
            p;
        if ("undefined" != typeof this.nav.plugins && "object" == typeof this.nav.plugins[a]) {
            if ((c = this.nav.plugins[a].description) && ("undefined" ==
                typeof this.nav.mimeTypes || !this.nav.mimeTypes[b] || this.nav.mimeTypes[b].enabledPlugin))
                for (f = c.replace(a, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split("."), a = 0; a < f.length; a++) f[a] = parseInt(f[a].match(/\d+/), 10)
        } else if ("undefined" != typeof window.ActiveXObject) try {
            if (p = new ActiveXObject(c)) f = h(p)
        } catch (g) {}
        return f
    }
};
mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function(a) {
    var b = [];
    if (a = a.GetVariable("$version")) a = a.split(" ")[1].split(","), b = [parseInt(a[0], 10), parseInt(a[1], 10), parseInt(a[2], 10)];
    return b
});
mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function(a) {
    var b = [0, 0, 0, 0],
        c = function(a, b, c, g) {
            for (; a.isVersionSupported(b[0] + "." + b[1] + "." + b[2] + "." + b[3]);) b[c] += g;
            b[c] -= g
        };
    c(a, b, 0, 1);
    c(a, b, 1, 1);
    c(a, b, 2, 1E4);
    c(a, b, 2, 1E3);
    c(a, b, 2, 100);
    c(a, b, 2, 10);
    c(a, b, 2, 1);
    c(a, b, 3, 1);
    return b
});
mejs.MediaFeatures = {
    init: function() {
        var a = this,
            b = document,
            c = mejs.PluginDetector.nav,
            h = mejs.PluginDetector.ua.toLowerCase(),
            f, p = ["source", "track", "audio", "video"];
        a.isiPad = null !== h.match(/ipad/i);
        a.isiPhone = null !== h.match(/iphone/i);
        a.isiOS = a.isiPhone || a.isiPad;
        a.isAndroid = null !== h.match(/android/i);
        a.isBustedAndroid = null !== h.match(/android 2\.[12]/);
        a.isBustedNativeHTTPS = "https:" === location.protocol && (null !== h.match(/android [12]\./) || null !== h.match(/macintosh.* version.* safari/));
        a.isIE = -1 != c.appName.toLowerCase().indexOf("microsoft") ||
            null !== c.appName.toLowerCase().match(/trident/gi);
        a.isChrome = null !== h.match(/chrome/gi);
        a.isFirefox = null !== h.match(/firefox/gi);
        a.isWebkit = null !== h.match(/webkit/gi);
        a.isGecko = null !== h.match(/gecko/gi) && !a.isWebkit && !a.isIE;
        a.isOpera = null !== h.match(/opera/gi);
        a.hasTouch = "ontouchstart" in window;
        a.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
        for (c = 0; c < p.length; c++) f = document.createElement(p[c]);
        a.supportsMediaTag = "undefined" !== typeof f.canPlayType ||
            a.isBustedAndroid;
        try {
            f.canPlayType("video/mp4")
        } catch (g) {
            a.supportsMediaTag = !1
        }
        a.hasSemiNativeFullScreen = "undefined" !== typeof f.webkitEnterFullscreen;
        a.hasNativeFullscreen = "undefined" !== typeof f.requestFullscreen;
        a.hasWebkitNativeFullScreen = "undefined" !== typeof f.webkitRequestFullScreen;
        a.hasMozNativeFullScreen = "undefined" !== typeof f.mozRequestFullScreen;
        a.hasMsNativeFullScreen = "undefined" !== typeof f.msRequestFullscreen;
        a.hasTrueNativeFullScreen = a.hasWebkitNativeFullScreen || a.hasMozNativeFullScreen ||
            a.hasMsNativeFullScreen;
        a.nativeFullScreenEnabled = a.hasTrueNativeFullScreen;
        a.hasMozNativeFullScreen ? a.nativeFullScreenEnabled = document.mozFullScreenEnabled : a.hasMsNativeFullScreen && (a.nativeFullScreenEnabled = document.msFullscreenEnabled);
        a.isChrome && (a.hasSemiNativeFullScreen = !1);
        a.hasTrueNativeFullScreen && (a.fullScreenEventName = "", a.hasWebkitNativeFullScreen ? a.fullScreenEventName = "webkitfullscreenchange" : a.hasMozNativeFullScreen ? a.fullScreenEventName = "mozfullscreenchange" : a.hasMsNativeFullScreen &&
            (a.fullScreenEventName = "MSFullscreenChange"), a.isFullScreen = function() {
                if (f.mozRequestFullScreen) return b.mozFullScreen;
                if (f.webkitRequestFullScreen) return b.webkitIsFullScreen;
                if (f.hasMsNativeFullScreen) return null !== b.msFullscreenElement
            }, a.requestFullScreen = function(b) {
                a.hasWebkitNativeFullScreen ? b.webkitRequestFullScreen() : a.hasMozNativeFullScreen ? b.mozRequestFullScreen() : a.hasMsNativeFullScreen && b.msRequestFullscreen()
            }, a.cancelFullScreen = function() {
                a.hasWebkitNativeFullScreen ? document.webkitCancelFullScreen() :
                    a.hasMozNativeFullScreen ? document.mozCancelFullScreen() : a.hasMsNativeFullScreen && document.msExitFullscreen()
            });
        a.hasSemiNativeFullScreen && h.match(/mac os x 10_5/i) && (a.hasNativeFullScreen = !1, a.hasSemiNativeFullScreen = !1)
    }
};
mejs.MediaFeatures.init();
mejs.HtmlMediaElement = {
    pluginType: "native",
    isFullScreen: !1,
    setCurrentTime: function(a) {
        this.currentTime = a
    },
    setMuted: function(a) {
        this.muted = a
    },
    setVolume: function(a) {
        this.volume = a
    },
    stop: function() {
        this.pause()
    },
    setSrc: function(a) {
        for (var b = this.getElementsByTagName("source"); 0 < b.length;) this.removeChild(b[0]);
        if ("string" == typeof a) this.src = a;
        else
            for (var c, b = 0; b < a.length; b++)
                if (c = a[b], this.canPlayType(c.type)) {
                    this.src = c.src;
                    break
                }
    },
    setVideoSize: function(a, b) {
        this.width = a;
        this.height = b
    }
};
mejs.PluginMediaElement = function(a, b, c) {
    this.id = a;
    this.pluginType = b;
    this.src = c;
    this.events = {};
    this.attributes = {}
};
mejs.PluginMediaElement.prototype = {
    pluginElement: null,
    pluginType: "",
    isFullScreen: !1,
    playbackRate: -1,
    defaultPlaybackRate: -1,
    seekable: [],
    played: [],
    paused: !0,
    ended: !1,
    seeking: !1,
    duration: 0,
    error: null,
    tagName: "",
    muted: !1,
    volume: 1,
    currentTime: 0,
    play: function() {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.playVideo() : this.pluginApi.playMedia(), this.paused = !1)
    },
    load: function() {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType || this.pluginApi.loadMedia(),
            this.paused = !1)
    },
    pause: function() {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia(), this.paused = !0)
    },
    stop: function() {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia(), this.paused = !0)
    },
    canPlayType: function(a) {
        var b, c, h, f = mejs.plugins[this.pluginType];
        for (b = 0; b < f.length; b++)
            if (h = f[b], mejs.PluginDetector.hasPluginVersion(this.pluginType, h.version))
                for (c =
                    0; c < h.types.length; c++)
                    if (a == h.types[c]) return "probably";
        return ""
    },
    positionFullscreenButton: function(a, b, c) {
        null != this.pluginApi && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(Math.floor(a), Math.floor(b), c)
    },
    hideFullscreenButton: function() {
        null != this.pluginApi && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
    },
    setSrc: function(a) {
        if ("string" == typeof a) this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(a)), this.src = mejs.Utility.absolutizeUrl(a);
        else {
            var b, c;
            for (b = 0; b < a.length; b++)
                if (c = a[b], this.canPlayType(c.type)) {
                    this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(c.src));
                    this.src = mejs.Utility.absolutizeUrl(a);
                    break
                }
        }
    },
    setCurrentTime: function(a) {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.seekTo(a) : this.pluginApi.setCurrentTime(a), this.currentTime = a)
    },
    setVolume: function(a) {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.setVolume(100 * a) : this.pluginApi.setVolume(a),
            this.volume = a)
    },
    setMuted: function(a) {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? (a ? this.pluginApi.mute() : this.pluginApi.unMute(), this.muted = a, this.dispatchEvent("volumechange")) : this.pluginApi.setMuted(a), this.muted = a)
    },
    setVideoSize: function(a, b) {
        this.pluginElement.style && (this.pluginElement.style.width = a + "px", this.pluginElement.style.height = b + "px");
        null != this.pluginApi && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(a, b)
    },
    setFullscreen: function(a) {
        null !=
            this.pluginApi && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(a)
    },
    enterFullScreen: function() {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!0)
    },
    exitFullScreen: function() {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!1)
    },
    addEventListener: function(a, b) {
        this.events[a] = this.events[a] || [];
        this.events[a].push(b)
    },
    removeEventListener: function(a, b) {
        if (!a) return this.events = {}, !0;
        var c = this.events[a];
        if (!c) return !0;
        if (!b) return this.events[a] =
            [], !0;
        for (var h = 0; h < c.length; h++)
            if (c[h] === b) return this.events[a].splice(h, 1), !0;
        return !1
    },
    dispatchEvent: function(a) {
        var b, c, h = this.events[a];
        if (h)
            for (c = Array.prototype.slice.call(arguments, 1), b = 0; b < h.length; b++) h[b].apply(null, c)
    },
    hasAttribute: function(a) {
        return a in this.attributes
    },
    removeAttribute: function(a) {
        delete this.attributes[a]
    },
    getAttribute: function(a) {
        return this.hasAttribute(a) ? this.attributes[a] : ""
    },
    setAttribute: function(a, b) {
        this.attributes[a] = b
    },
    remove: function() {
        mejs.Utility.removeSwf(this.pluginElement.id);
        mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)
    }
};
mejs.MediaPluginBridge = {
    pluginMediaElements: {},
    htmlMediaElements: {},
    registerPluginElement: function(a, b, c) {
        this.pluginMediaElements[a] = b;
        this.htmlMediaElements[a] = c
    },
    unregisterPluginElement: function(a) {
        delete this.pluginMediaElements[a];
        delete this.htmlMediaElements[a]
    },
    initPlugin: function(a) {
        var b = this.pluginMediaElements[a],
            c = this.htmlMediaElements[a];
        if (b) {
            switch (b.pluginType) {
                case "flash":
                    b.pluginElement = b.pluginApi = document.getElementById(a);
                    break;
                case "silverlight":
                    b.pluginElement = document.getElementById(b.id),
                    b.pluginApi = b.pluginElement.Content.MediaElementJS
            }
            null != b.pluginApi && b.success && b.success(b, c)
        }
    },
    fireEvent: function(a, b, c) {
        var h, f;
        if (a = this.pluginMediaElements[a]) {
            b = {
                type: b,
                target: a
            };
            for (h in c) a[h] = c[h], b[h] = c[h];
            f = c.bufferedTime || 0;
            b.target.buffered = b.buffered = {
                start: function() {
                    return 0
                },
                end: function() {
                    return f
                },
                length: 1
            };
            a.dispatchEvent(b.type, b)
        }
    }
};
mejs.MediaElementDefaults = {
    mode: "auto",
    plugins: ["flash", "silverlight", "youtube", "vimeo"],
    enablePluginDebug: !1,
    httpsBasicAuthSite: !1,
    type: "",
    pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
    flashName: "flashmediaelement.swf",
    flashStreamer: "",
    enablePluginSmoothing: !1,
    enablePseudoStreaming: !1,
    pseudoStreamingStartQueryParam: "start",
    silverlightName: "silverlightmediaelement.xap",
    defaultVideoWidth: 480,
    defaultVideoHeight: 270,
    pluginWidth: -1,
    pluginHeight: -1,
    pluginVars: [],
    timerRate: 250,
    startVolume: 0.8,
    success: function() {},
    error: function() {}
};
mejs.MediaElement = function(a, b) {
    return mejs.HtmlMediaElementShim.create(a, b)
};
mejs.HtmlMediaElementShim = {
    create: function(a, b) {
        var c = mejs.MediaElementDefaults,
            h = "string" == typeof a ? document.getElementById(a) : a,
            f = h.tagName.toLowerCase(),
            p = "audio" === f || "video" === f,
            g = p ? h.getAttribute("src") : h.getAttribute("href"),
            f = h.getAttribute("poster"),
            r = h.getAttribute("autoplay"),
            s = h.getAttribute("preload"),
            n = h.getAttribute("controls"),
            v;
        for (v in b) c[v] = b[v];
        f = "undefined" == typeof f || null === f ? "" : f;
        s = "undefined" == typeof s || null === s || "false" === s ? "none" : s;
        r = !("undefined" == typeof r || null === r || "false" ===
            r);
        n = !("undefined" == typeof n || null === n || "false" === n);
        v = this.determinePlayback(h, c, mejs.MediaFeatures.supportsMediaTag, p, "undefined" == typeof g || null === g || "" == g ? null : g);
        v.url = null !== v.url ? mejs.Utility.absolutizeUrl(v.url) : "";
        if ("native" == v.method) return mejs.MediaFeatures.isBustedAndroid && (h.src = v.url, h.addEventListener("click", function() {
            h.play()
        }, !1)), this.updateNative(v, c, r, s);
        if ("" !== v.method) return this.createPlugin(v, c, f, r, s, n);
        this.createErrorMessage(v, c, f);
        return this
    },
    determinePlayback: function(a,
        b, c, h, f) {
        var p = [],
            g, r, s, n = {
                method: "",
                url: "",
                htmlMediaElement: a,
                isVideo: "audio" != a.tagName.toLowerCase()
            },
            v;
        if ("undefined" != typeof b.type && "" !== b.type)
            if ("string" == typeof b.type) p.push({
                type: b.type,
                url: f
            });
            else
                for (g = 0; g < b.type.length; g++) p.push({
                    type: b.type[g],
                    url: f
                });
        else if (null !== f) s = this.formatType(f, a.getAttribute("type")), p.push({
            type: s,
            url: f
        });
        else
            for (g = 0; g < a.childNodes.length; g++) r = a.childNodes[g], 1 == r.nodeType && "source" == r.tagName.toLowerCase() && (f = r.getAttribute("src"), s = this.formatType(f,
                r.getAttribute("type")), r = r.getAttribute("media"), (!r || !window.matchMedia || window.matchMedia && window.matchMedia(r).matches) && p.push({
                type: s,
                url: f
            }));
        !h && 0 < p.length && null !== p[0].url && -1 < this.getTypeFromFile(p[0].url).indexOf("audio") && (n.isVideo = !1);
        mejs.MediaFeatures.isBustedAndroid && (a.canPlayType = function(a) {
            return null !== a.match(/video\/(mp4|m4v)/gi) ? "maybe" : ""
        });
        if (c && !("auto" !== b.mode && "auto_plugin" !== b.mode && "native" !== b.mode || mejs.MediaFeatures.isBustedNativeHTTPS && !0 === b.httpsBasicAuthSite)) {
            h ||
                (g = document.createElement(n.isVideo ? "video" : "audio"), a.parentNode.insertBefore(g, a), a.style.display = "none", n.htmlMediaElement = a = g);
            for (g = 0; g < p.length; g++)
                if ("" !== a.canPlayType(p[g].type).replace(/no/, "") || "" !== a.canPlayType(p[g].type.replace(/mp3/, "mpeg")).replace(/no/, "") || "" !== a.canPlayType(p[g].type.replace(/m4a/, "mp4")).replace(/no/, "")) {
                    n.method = "native";
                    n.url = p[g].url;
                    break
                }
            if ("native" === n.method && (null !== n.url && (a.src = n.url), "auto_plugin" !== b.mode)) return n
        }
        if ("auto" === b.mode || "auto_plugin" ===
            b.mode || "shim" === b.mode)
            for (g = 0; g < p.length; g++)
                for (s = p[g].type, a = 0; a < b.plugins.length; a++)
                    for (f = b.plugins[a], r = mejs.plugins[f], c = 0; c < r.length; c++)
                        if (v = r[c], null == v.version || mejs.PluginDetector.hasPluginVersion(f, v.version))
                            for (h = 0; h < v.types.length; h++)
                                if (s == v.types[h]) return n.method = f, n.url = p[g].url, n;
        if ("auto_plugin" === b.mode && "native" === n.method) return n;
        "" === n.method && 0 < p.length && (n.url = p[0].url);
        return n
    },
    formatType: function(a, b) {
        return a && !b ? this.getTypeFromFile(a) : b && ~b.indexOf(";") ? b.substr(0,
            b.indexOf(";")) : b
    },
    getTypeFromFile: function(a) {
        a = a.split("?")[0];
        a = a.substring(a.lastIndexOf(".") + 1).toLowerCase();
        return (/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(a) ? "video" : "audio") + "/" + this.getTypeFromExtension(a)
    },
    getTypeFromExtension: function(a) {
        switch (a) {
            case "mp4":
            case "m4v":
            case "m4a":
                return "mp4";
            case "webm":
            case "webma":
            case "webmv":
                return "webm";
            case "ogg":
            case "oga":
            case "ogv":
                return "ogg";
            default:
                return a
        }
    },
    createErrorMessage: function(a, b, c) {
        var h = a.htmlMediaElement,
            f = document.createElement("div");
        f.className = "me-cannotplay";
        try {
            f.style.width = h.width + "px", f.style.height = h.height + "px"
        } catch (p) {}
        f.innerHTML = b.customError ? b.customError : "" !== c ? '<a href="' + a.url + '"><img src="' + c + '" width="100%" height="100%" /></a>' : '<a href="' + a.url + '"><span>' + mejs.i18n.t("Download File") + "</span></a>";
        h.parentNode.insertBefore(f, h);
        h.style.display = "none";
        b.error(h)
    },
    createPlugin: function(a, b, c, h, f, p) {
        c = a.htmlMediaElement;
        var g = 1,
            r = 1,
            s = "me_" + a.method + "_" + mejs.meIndex++,
            n = new mejs.PluginMediaElement(s, a.method,
                a.url),
            v = document.createElement("div"),
            w;
        n.tagName = c.tagName;
        for (w = 0; w < c.attributes.length; w++) {
            var u = c.attributes[w];
            !0 == u.specified && n.setAttribute(u.name, u.value)
        }
        for (w = c.parentNode; null !== w && "body" !== w.tagName.toLowerCase() && null != w.parentNode;) {
            if ("p" === w.parentNode.tagName.toLowerCase()) {
                w.parentNode.parentNode.insertBefore(w, w.parentNode);
                break
            }
            w = w.parentNode
        }
        a.isVideo ? (g = 0 < b.pluginWidth ? b.pluginWidth : 0 < b.videoWidth ? b.videoWidth : null !== c.getAttribute("width") ? c.getAttribute("width") : b.defaultVideoWidth,
            r = 0 < b.pluginHeight ? b.pluginHeight : 0 < b.videoHeight ? b.videoHeight : null !== c.getAttribute("height") ? c.getAttribute("height") : b.defaultVideoHeight, g = mejs.Utility.encodeUrl(g), r = mejs.Utility.encodeUrl(r)) : b.enablePluginDebug && (g = 320, r = 240);
        n.success = b.success;
        mejs.MediaPluginBridge.registerPluginElement(s, n, c);
        v.className = "me-plugin";
        v.id = s + "_container";
        a.isVideo ? c.parentNode.insertBefore(v, c) : document.body.insertBefore(v, document.body.childNodes[0]);
        h = ["id=" + s, "isvideo=" + (a.isVideo ? "true" : "false"), "autoplay=" +
            (h ? "true" : "false"), "preload=" + f, "width=" + g, "startvolume=" + b.startVolume, "timerrate=" + b.timerRate, "flashstreamer=" + b.flashStreamer, "height=" + r, "pseudostreamstart=" + b.pseudoStreamingStartQueryParam
        ];
        null !== a.url && ("flash" == a.method ? h.push("file=" + mejs.Utility.encodeUrl(a.url)) : h.push("file=" + a.url));
        b.enablePluginDebug && h.push("debug=true");
        b.enablePluginSmoothing && h.push("smoothing=true");
        b.enablePseudoStreaming && h.push("pseudostreaming=true");
        p && h.push("controls=true");
        b.pluginVars && (h = h.concat(b.pluginVars));
        switch (a.method) {
            case "silverlight":
                v.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + s + '" name="' + s + '" width="' + g + '" height="' + r + '" class="mejs-shim"><param name="initParams" value="' + h.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + b.pluginPath + b.silverlightName + '" /></object>';
                break;
            case "flash":
                mejs.MediaFeatures.isIE ? (a = document.createElement("div"), v.appendChild(a), a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + s + '" width="' + g + '" height="' + r + '" class="mejs-shim"><param name="movie" value="' + b.pluginPath + b.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + h.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>') :
                    v.innerHTML = '<embed id="' + s + '" name="' + s + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + b.pluginPath + b.flashName + '" flashvars="' + h.join("&") + '" width="' + g + '" height="' + r + '" scale="default"class="mejs-shim"></embed>';
                break;
            case "youtube":
                -1 != a.url.lastIndexOf("youtu.be") ? (a = a.url.substr(a.url.lastIndexOf("/") + 1), -1 != a.indexOf("?") &&
                    (a = a.substr(0, a.indexOf("?")))) : a = a.url.substr(a.url.lastIndexOf("=") + 1);
                youtubeSettings = {
                    container: v,
                    containerId: v.id,
                    pluginMediaElement: n,
                    pluginId: s,
                    videoId: a,
                    height: r,
                    width: g
                };
                mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings) : mejs.YouTubeApi.enqueueIframe(youtubeSettings);
                break;
            case "vimeo":
                if (b = s + "_player", n.vimeoid = a.url.substr(a.url.lastIndexOf("/") + 1), v.innerHTML = '<iframe src="//player.vimeo.com/video/' + n.vimeoid + "?api=1&portrait=0&byline=0&title=0&player_id=" +
                    b + '" width="' + g + '" height="' + r + '" frameborder="0" class="mejs-shim" id="' + b + '"></iframe>', "function" == typeof $f) {
                    var d = $f(v.childNodes[0]);
                    d.addEvent("ready", function() {
                        function a(d, b, e, c) {
                            d = {
                                type: e,
                                target: b
                            };
                            "timeupdate" == e && (b.currentTime = d.currentTime = c.seconds, b.duration = d.duration = c.duration);
                            b.dispatchEvent(d.type, d)
                        }
                        d.playVideo = function() {
                            d.api("play")
                        };
                        d.pauseVideo = function() {
                            d.api("pause")
                        };
                        d.seekTo = function(a) {
                            d.api("seekTo", a)
                        };
                        d.addEvent("play", function() {
                            a(d, n, "play");
                            a(d, n, "playing")
                        });
                        d.addEvent("pause", function() {
                            a(d, n, "pause")
                        });
                        d.addEvent("finish", function() {
                            a(d, n, "ended")
                        });
                        d.addEvent("playProgress", function(b) {
                            a(d, n, "timeupdate", b)
                        });
                        n.pluginApi = d;
                        mejs.MediaPluginBridge.initPlugin(s)
                    })
                } else console.warn("You need to include froogaloop for vimeo to work")
        }
        c.style.display = "none";
        c.removeAttribute("autoplay");
        return n
    },
    updateNative: function(a, b) {
        var c = a.htmlMediaElement,
            h;
        for (h in mejs.HtmlMediaElement) c[h] = mejs.HtmlMediaElement[h];
        b.success(c, c);
        return c
    }
};
mejs.YouTubeApi = {
    isIframeStarted: !1,
    isIframeLoaded: !1,
    loadIframeApi: function() {
        if (!this.isIframeStarted) {
            var a = document.createElement("script");
            a.src = "//www.youtube.com/player_api";
            var b = document.getElementsByTagName("script")[0];
            b.parentNode.insertBefore(a, b);
            this.isIframeStarted = !0
        }
    },
    iframeQueue: [],
    enqueueIframe: function(a) {
        this.isLoaded ? this.createIframe(a) : (this.loadIframeApi(), this.iframeQueue.push(a))
    },
    createIframe: function(a) {
        var b = a.pluginMediaElement,
            c = new YT.Player(a.containerId, {
                height: a.height,
                width: a.width,
                videoId: a.videoId,
                playerVars: {
                    controls: 0
                },
                events: {
                    onReady: function() {
                        a.pluginMediaElement.pluginApi = c;
                        mejs.MediaPluginBridge.initPlugin(a.pluginId);
                        setInterval(function() {
                            mejs.YouTubeApi.createEvent(c, b, "timeupdate")
                        }, 250)
                    },
                    onStateChange: function(a) {
                        mejs.YouTubeApi.handleStateChange(a.data, c, b)
                    }
                }
            })
    },
    createEvent: function(a, b, c) {
        c = {
            type: c,
            target: b
        };
        if (a && a.getDuration) {
            b.currentTime = c.currentTime = a.getCurrentTime();
            b.duration = c.duration = a.getDuration();
            c.paused = b.paused;
            c.ended = b.ended;
            c.muted = a.isMuted();
            c.volume = a.getVolume() / 100;
            c.bytesTotal = a.getVideoBytesTotal();
            c.bufferedBytes = a.getVideoBytesLoaded();
            var h = c.bufferedBytes / c.bytesTotal * c.duration;
            c.target.buffered = c.buffered = {
                start: function() {
                    return 0
                },
                end: function() {
                    return h
                },
                length: 1
            }
        }
        b.dispatchEvent(c.type, c)
    },
    iFrameReady: function() {
        for (this.isIframeLoaded = this.isLoaded = !0; 0 < this.iframeQueue.length;) this.createIframe(this.iframeQueue.pop())
    },
    flashPlayers: {},
    createFlash: function(a) {
        this.flashPlayers[a.pluginId] = a;
        var b, c =
            "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + a.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
        mejs.MediaFeatures.isIE ? (b = document.createElement("div"), a.container.appendChild(b), b.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + a.pluginId + '" width="' + a.width + '" height="' + a.height + '" class="mejs-shim"><param name="movie" value="' + c + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>') :
            a.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + a.pluginId + '" data="' + c + '" width="' + a.width + '" height="' + a.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>'
    },
    flashReady: function(a) {
        var b = this.flashPlayers[a],
            c = document.getElementById(a),
            h = b.pluginMediaElement;
        h.pluginApi = h.pluginElement = c;
        mejs.MediaPluginBridge.initPlugin(a);
        c.cueVideoById(b.videoId);
        a = b.containerId +
            "_callback";
        window[a] = function(a) {
            mejs.YouTubeApi.handleStateChange(a, c, h)
        };
        c.addEventListener("onStateChange", a);
        setInterval(function() {
            mejs.YouTubeApi.createEvent(c, h, "timeupdate")
        }, 250)
    },
    handleStateChange: function(a, b, c) {
        switch (a) {
            case -1:
                c.paused = !0;
                c.ended = !0;
                mejs.YouTubeApi.createEvent(b, c, "loadedmetadata");
                break;
            case 0:
                c.paused = !1;
                c.ended = !0;
                mejs.YouTubeApi.createEvent(b, c, "ended");
                break;
            case 1:
                c.paused = !1;
                c.ended = !1;
                mejs.YouTubeApi.createEvent(b, c, "play");
                mejs.YouTubeApi.createEvent(b, c, "playing");
                break;
            case 2:
                c.paused = !0;
                c.ended = !1;
                mejs.YouTubeApi.createEvent(b, c, "pause");
                break;
            case 3:
                mejs.YouTubeApi.createEvent(b, c, "progress")
        }
    }
};

function onYouTubePlayerAPIReady() {
    mejs.YouTubeApi.iFrameReady()
}

function onYouTubePlayerReady(a) {
    mejs.YouTubeApi.flashReady(a)
}
window.mejs = mejs;
window.MediaElement = mejs.MediaElement;
(function(a, b) {
    var c = {
        locale: {
            language: "",
            strings: {}
        },
        methods: {},
        getLanguage: function() {
            return (c.locale.language || window.navigator.userLanguage || window.navigator.language).substr(0, 2).toLowerCase()
        }
    };
    "undefined" != typeof mejsL10n && (c.locale.language = mejsL10n.language);
    c.methods.checkPlain = function(a) {
        var b, c, g = {
            "&": "&amp;",
            '"': "&quot;",
            "<": "&lt;",
            ">": "&gt;"
        };
        a = String(a);
        for (b in g) g.hasOwnProperty(b) && (c = RegExp(b, "g"), a = a.replace(c, g[b]));
        return a
    };
    c.methods.t = function(a, b) {
        c.locale.strings && c.locale.strings[b.context] &&
            c.locale.strings[b.context][a] && (a = c.locale.strings[b.context][a]);
        return c.methods.checkPlain(a)
    };
    c.t = function(a, b) {
        if ("string" === typeof a && 0 < a.length) {
            var p = c.getLanguage();
            b = b || {
                context: p
            };
            return c.methods.t(a, b)
        }
        throw {
            name: "InvalidArgumentException",
            message: "First argument is either not a string or empty."
        };
    };
    b.i18n = c
})(document, mejs);
(function(a) {
    "undefined" != typeof mejsL10n && (a[mejsL10n.language] = mejsL10n.strings)
})(mejs.i18n.locale.strings);
(function(a) {
    "undefined" === typeof a.de && (a.de = {
        Fullscreen: "Vollbild",
        "Go Fullscreen": "Vollbild an",
        "Turn off Fullscreen": "Vollbild aus",
        Close: "Schlie\u00dfen"
    })
})(mejs.i18n.locale.strings);
(function(a) {
    "undefined" === typeof a.zh && (a.zh = {
        Fullscreen: "\u5168\u87a2\u5e55",
        "Go Fullscreen": "\u5168\u5c4f\u6a21\u5f0f",
        "Turn off Fullscreen": "\u9000\u51fa\u5168\u5c4f\u6a21\u5f0f",
        Close: "\u95dc\u9589"
    })
})(mejs.i18n.locale.strings); + function(a) {
    var b = function(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
        this.init("tooltip", a, b)
    };
    b.VERSION = "3.3.1";
    b.TRANSITION_DURATION = 150;
    b.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    };
    b.prototype.init = function(b, c, p) {
        this.enabled = !0;
        this.type = b;
        this.$element = a(c);
        this.options = this.getOptions(p);
        this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport);
        b = this.options.trigger.split(" ");
        for (c = b.length; c--;)
            if (p = b[c], "click" == p) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != p) {
            var g = "hover" == p ? "mouseleave" : "focusout";
            this.$element.on(("hover" == p ? "mouseenter" : "focusin") + "." + this.type, this.options.selector, a.proxy(this.enter, this));
            this.$element.on(g +
                "." + this.type, this.options.selector, a.proxy(this.leave, this))
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    };
    b.prototype.getDefaults = function() {
        return b.DEFAULTS
    };
    b.prototype.getOptions = function(b) {
        b = a.extend({}, this.getDefaults(), this.$element.data(), b);
        b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        });
        return b
    };
    b.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        this._options && a.each(this._options,
            function(a, g) {
                c[a] != g && (b[a] = g)
            });
        return b
    };
    b.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        if (c && c.$tip && c.$tip.is(":visible")) c.hoverState = "in";
        else {
            c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c));
            clearTimeout(c.timeout);
            c.hoverState = "in";
            if (!c.options.delay || !c.options.delay.show) return c.show();
            c.timeout = setTimeout(function() {
                "in" == c.hoverState && c.show()
            }, c.options.delay.show)
        }
    };
    b.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c));
        clearTimeout(c.timeout);
        c.hoverState = "out";
        if (!c.options.delay || !c.options.delay.hide) return c.hide();
        c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)
    };
    b.prototype.show = function() {
        var c = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(c);
            var f = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (!c.isDefaultPrevented() && f) {
                var p = this,
                    c = this.tip(),
                    f = this.getUID(this.type);
                this.setContent();
                c.attr("id", f);
                this.$element.attr("aria-describedby", f);
                this.options.animation && c.addClass("fade");
                var f = "function" == typeof this.options.placement ? this.options.placement.call(this, c[0], this.$element[0]) : this.options.placement,
                    g = /\s?auto?\s?/i,
                    r = g.test(f);
                r && (f = f.replace(g, "") || "top");
                c.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(f).data("bs." +
                    this.type, this);
                this.options.container ? c.appendTo(this.options.container) : c.insertAfter(this.$element);
                var g = this.getPosition(),
                    s = c[0].offsetWidth,
                    n = c[0].offsetHeight;
                if (r) {
                    var r = f,
                        v = this.options.container ? a(this.options.container) : this.$element.parent(),
                        v = this.getPosition(v),
                        f = "bottom" == f && g.bottom + n > v.bottom ? "top" : "top" == f && g.top - n < v.top ? "bottom" : "right" == f && g.right + s > v.width ? "left" : "left" == f && g.left - s < v.left ? "right" : f;
                    c.removeClass(r).addClass(f)
                }
                g = this.getCalculatedOffset(f, g, s, n);
                this.applyPlacement(g,
                    f);
                f = function() {
                    var a = p.hoverState;
                    p.$element.trigger("shown.bs." + p.type);
                    p.hoverState = null;
                    "out" == a && p.leave(p)
                };
                a.support.transition && this.$tip.hasClass("fade") ? c.one("bsTransitionEnd", f).emulateTransitionEnd(b.TRANSITION_DURATION) : f()
            }
        }
    };
    b.prototype.applyPlacement = function(b, c) {
        var p = this.tip(),
            g = p[0].offsetWidth,
            r = p[0].offsetHeight,
            s = parseInt(p.css("margin-top"), 10),
            n = parseInt(p.css("margin-left"), 10);
        isNaN(s) && (s = 0);
        isNaN(n) && (n = 0);
        b.top += s;
        b.left += n;
        a.offset.setOffset(p[0], a.extend({
            using: function(a) {
                p.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0);
        p.addClass("in");
        var n = p[0].offsetWidth,
            v = p[0].offsetHeight;
        "top" == c && v != r && (b.top = b.top + r - v);
        var w = this.getViewportAdjustedDelta(c, b, n, v);
        w.left ? b.left += w.left : b.top += w.top;
        g = (s = /top|bottom/.test(c)) ? 2 * w.left - g + n : 2 * w.top - r + v;
        r = s ? "offsetWidth" : "offsetHeight";
        p.offset(b);
        this.replaceArrow(g, p[0][r], s)
    };
    b.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    };
    b.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b);
        a.removeClass("fade in top bottom left right")
    };
    b.prototype.hide = function(c) {
        function f() {
            "in" != p.hoverState && g.detach();
            p.$element.removeAttr("aria-describedby").trigger("hidden.bs." + p.type);
            c && c()
        }
        var p = this,
            g = this.tip(),
            r = a.Event("hide.bs." + this.type);
        this.$element.trigger(r);
        if (!r.isDefaultPrevented()) return g.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? g.one("bsTransitionEnd", f).emulateTransitionEnd(b.TRANSITION_DURATION) :
            f(), this.hoverState = null, this
    };
    b.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    };
    b.prototype.hasContent = function() {
        return this.getTitle()
    };
    b.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            p = "BODY" == c.tagName,
            c = c.getBoundingClientRect();
        null == c.width && (c = a.extend({}, c, {
            width: c.right - c.left,
            height: c.bottom - c.top
        }));
        var g = p ? {
            top: 0,
            left: 0
        } : b.offset();
        b = {
            scroll: p ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
        };
        p = p ? {
            width: a(window).width(),
            height: a(window).height()
        } : null;
        return a.extend({}, c, b, p, g)
    };
    b.prototype.getCalculatedOffset = function(a, b, c, g) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - g,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - g / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - g / 2,
            left: b.left + b.width
        }
    };
    b.prototype.getViewportAdjustedDelta = function(a, b, c, g) {
        var r = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return r;
        var s = this.options.viewport && this.options.viewport.padding || 0,
            n = this.getPosition(this.$viewport);
        /right|left/.test(a) ? (c = b.top - s - n.scroll, b = b.top + s - n.scroll + g, c < n.top ? r.top = n.top - c : b > n.top + n.height && (r.top = n.top + n.height - b)) : (g = b.left - s, b = b.left + s + c, g < n.left ? r.left = n.left - g : b > n.width && (r.left = n.left + n.width - b));
        return r
    };
    b.prototype.getTitle = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-original-title") || ("function" == typeof b.title ? b.title.call(a[0]) :
            b.title)
    };
    b.prototype.getUID = function(a) {
        do a += ~~(1E6 * Math.random()); while (document.getElementById(a));
        return a
    };
    b.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template)
    };
    b.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    };
    b.prototype.enable = function() {
        this.enabled = !0
    };
    b.prototype.disable = function() {
        this.enabled = !1
    };
    b.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    };
    b.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." +
            this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)));
        c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    };
    b.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout);
        this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type)
        })
    };
    var c = a.fn.tooltip;
    a.fn.tooltip = function(c) {
        return this.each(function() {
            var f = a(this),
                p = f.data("bs.tooltip"),
                g = "object" == typeof c && c,
                r = g && g.selector;
            if (p || "destroy" != c)
                if (r ? (p || f.data("bs.tooltip",
                    p = {}), p[r] || (p[r] = new b(this, g))) : p || f.data("bs.tooltip", p = new b(this, g)), "string" == typeof c) p[c]()
        })
    };
    a.fn.tooltip.Constructor = b;
    a.fn.tooltip.noConflict = function() {
        a.fn.tooltip = c;
        return this
    }
}(jQuery);
! function(a) {
    var b = {
            isMsie: function() {
                var a = /(msie) ([\w.]+)/i.exec(navigator.userAgent);
                return a ? parseInt(a[2], 10) : !1
            },
            isBlankString: function(a) {
                return !a || /^\s*$/.test(a)
            },
            escapeRegExChars: function(a) {
                return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            },
            isString: function(a) {
                return "string" == typeof a
            },
            isNumber: function(a) {
                return "number" == typeof a
            },
            isArray: a.isArray,
            isFunction: a.isFunction,
            isObject: a.isPlainObject,
            isUndefined: function(a) {
                return "undefined" == typeof a
            },
            bind: a.proxy,
            bindAll: function(b) {
                var c,
                    d;
                for (d in b) a.isFunction(c = b[d]) && (b[d] = a.proxy(c, b))
            },
            indexOf: function(a, b) {
                for (var d = 0; d < a.length; d++)
                    if (a[d] === b) return d;
                return -1
            },
            each: a.each,
            map: a.map,
            filter: a.grep,
            every: function(b, c) {
                var d = !0;
                return b ? (a.each(b, function(a, g) {
                    return (d = c.call(null, g, a, b)) ? void 0 : !1
                }), !!d) : d
            },
            some: function(b, c) {
                var d = !1;
                return b ? (a.each(b, function(a, g) {
                    return (d = c.call(null, g, a, b)) ? !1 : void 0
                }), !!d) : d
            },
            mixin: a.extend,
            getUniqueId: function() {
                var a = 0;
                return function() {
                    return a++
                }
            }(),
            defer: function(a) {
                setTimeout(a,
                    0)
            },
            debounce: function(a, b, d) {
                var e, c;
                return function() {
                    var g, f, h = this,
                        n = arguments;
                    return g = function() {
                        e = null;
                        d || (c = a.apply(h, n))
                    }, f = d && !e, clearTimeout(e), e = setTimeout(g, b), f && (c = a.apply(h, n)), c
                }
            },
            throttle: function(a, b) {
                var d, e, c, g, f, h;
                return f = 0, h = function() {
                        f = new Date;
                        c = null;
                        g = a.apply(d, e)
                    },
                    function() {
                        var n = new Date,
                            r = b - (n - f);
                        return d = this, e = arguments, 0 >= r ? (clearTimeout(c), c = null, f = n, g = a.apply(d, e)) : c || (c = setTimeout(h, r)), g
                    }
            },
            tokenizeQuery: function(b) {
                return a.trim(b).toLowerCase().split(/[\s]+/)
            },
            tokenizeText: function(b) {
                return a.trim(b).toLowerCase().split(/[\s\-_]+/)
            },
            getProtocol: function() {
                return location.protocol
            },
            noop: function() {}
        },
        c = function() {
            var a = /\s+/;
            return {
                on: function(b, d) {
                    var e;
                    if (!d) return this;
                    this._callbacks = this._callbacks || {};
                    for (b = b.split(a); e = b.shift();) this._callbacks[e] = this._callbacks[e] || [], this._callbacks[e].push(d);
                    return this
                },
                trigger: function(b, d) {
                    var e, c;
                    if (!this._callbacks) return this;
                    for (b = b.split(a); e = b.shift();)
                        if (c = this._callbacks[e])
                            for (var g = 0; g < c.length; g +=
                                1) c[g].call(this, {
                                type: e,
                                data: d
                            });
                    return this
                }
            }
        }(),
        h = function() {
            function c(b) {
                b && b.el || a.error("EventBus initialized without el");
                this.$el = a(b.el)
            }
            return b.mixin(c.prototype, {
                trigger: function(a) {
                    var d = [].slice.call(arguments, 1);
                    this.$el.trigger("typeahead:" + a, d)
                }
            }), c
        }(),
        f = function() {
            function a(d) {
                this.prefix = ["__", d, "__"].join("");
                this.ttlKey = "__ttl__";
                this.keyMatcher = RegExp("^" + this.prefix)
            }

            function c(a) {
                return JSON.stringify(b.isUndefined(a) ? null : a)
            }
            var d, e;
            try {
                d = window.localStorage, d.setItem("~~~",
                    "!"), d.removeItem("~~~")
            } catch (g) {
                d = null
            }
            return e = d && window.JSON ? {
                _prefix: function(a) {
                    return this.prefix + a
                },
                _ttlKey: function(a) {
                    return this._prefix(a) + this.ttlKey
                },
                get: function(a) {
                    this.isExpired(a) && this.remove(a);
                    a = d.getItem(this._prefix(a));
                    return JSON.parse(a)
                },
                set: function(a, e, g) {
                    return b.isNumber(g) ? d.setItem(this._ttlKey(a), c((new Date).getTime() + g)) : d.removeItem(this._ttlKey(a)), d.setItem(this._prefix(a), c(e))
                },
                remove: function(a) {
                    return d.removeItem(this._ttlKey(a)), d.removeItem(this._prefix(a)),
                        this
                },
                clear: function() {
                    var a, b, e = [],
                        c = d.length;
                    for (a = 0; c > a; a++)(b = d.key(a)).match(this.keyMatcher) && e.push(b.replace(this.keyMatcher, ""));
                    for (a = e.length; a--;) this.remove(e[a]);
                    return this
                },
                isExpired: function(a) {
                    a = d.getItem(this._ttlKey(a));
                    a = JSON.parse(a);
                    return b.isNumber(a) && (new Date).getTime() > a ? !0 : !1
                }
            } : {
                get: b.noop,
                set: b.noop,
                remove: b.noop,
                clear: b.noop,
                isExpired: b.noop
            }, b.mixin(a.prototype, e), a
        }(),
        p = function() {
            function a(c) {
                b.bindAll(this);
                c = c || {};
                this.sizeLimit = c.sizeLimit || 10;
                this.cache = {};
                this.cachedKeysByAge = []
            }
            return b.mixin(a.prototype, {
                get: function(a) {
                    return this.cache[a]
                },
                set: function(a, d) {
                    var b;
                    this.cachedKeysByAge.length === this.sizeLimit && (b = this.cachedKeysByAge.shift(), delete this.cache[b]);
                    this.cache[a] = d;
                    this.cachedKeysByAge.push(a)
                }
            }), a
        }(),
        g = function() {
            function c(a) {
                b.bindAll(this);
                a = b.isString(a) ? {
                    url: a
                } : a;
                d = d || new p;
                g = b.isNumber(a.maxParallelRequests) ? a.maxParallelRequests : g || 6;
                this.url = a.url;
                this.wildcard = a.wildcard || "%QUERY";
                this.filter = a.filter;
                this.replace = a.replace;
                this.ajaxSettings = {
                    type: "get",
                    cache: a.cache,
                    timeout: a.timeout,
                    dataType: a.dataType || "json",
                    beforeSend: a.beforeSend
                };
                this._get = (/^throttle$/i.test(a.rateLimitFn) ? b.throttle : b.debounce)(this._get, a.rateLimitWait || 300)
            }
            var g, d, e = 0,
                f = {};
            return b.mixin(c.prototype, {
                _get: function(a, b) {
                    function c(e) {
                        var g = f.filter ? f.filter(e) : e;
                        b && b(g);
                        d.set(a, e)
                    }
                    var f = this;
                    g > e ? this._sendRequest(a).done(c) : this.onDeckRequestArgs = [].slice.call(arguments, 0)
                },
                _sendRequest: function(d) {
                    function b() {
                        e--;
                        f[d] = null;
                        c.onDeckRequestArgs &&
                            (c._get.apply(c, c.onDeckRequestArgs), c.onDeckRequestArgs = null)
                    }
                    var c = this,
                        g = f[d];
                    g || (e++, g = f[d] = a.ajax(d, this.ajaxSettings).always(b));
                    return g
                },
                get: function(a, e) {
                    var c, g, f = this,
                        k = encodeURIComponent(a || "");
                    return e = e || b.noop, c = this.replace ? this.replace(this.url, k) : this.url.replace(this.wildcard, k), (g = d.get(c)) ? b.defer(function() {
                        e(f.filter ? f.filter(g) : g)
                    }) : this._get(c, e), !!g
                }
            }), c
        }(),
        r = function() {
            var c, h, d, e;

            function k(d) {
                b.bindAll(this);
                b.isString(d.template) && !d.engine && a.error("no template engine specified");
                d.local || d.prefetch || d.remote || a.error("one of local, prefetch, or remote is required");
                this.name = d.name || b.getUniqueId();
                this.limit = d.limit || 5;
                this.minLength = d.minLength || 1;
                this.header = d.header;
                this.footer = d.footer;
                this.valueKey = d.valueKey || "value";
                this.template = n(d.template, d.engine, this.valueKey);
                this.local = d.local;
                this.prefetch = d.prefetch;
                this.remote = d.remote;
                this.itemHash = {};
                this.adjacencyList = {};
                this.storage = d.name ? new f(d.name) : null
            }

            function n(a, d, e) {
                var c, g;
                return b.isFunction(a) ? c = a : b.isString(a) ?
                    (g = d.compile(a), c = b.bind(g.render, g)) : c = function(a) {
                        return "<p>" + a[e] + "</p>"
                    }, c
            }
            c = "thumbprint";
            h = "protocol";
            d = "itemHash";
            e = "adjacencyList";
            return b.mixin(k.prototype, {
                _processLocalData: function(a) {
                    this._mergeProcessedData(this._processData(a))
                },
                _loadPrefetchData: function(g) {
                    function f(a) {
                        a = g.filter ? g.filter(a) : a;
                        a = v._processData(a);
                        var k = a.itemHash,
                            n = a.adjacencyList;
                        v.storage && (v.storage.set(d, k, g.ttl), v.storage.set(e, n, g.ttl), v.storage.set(c, y, g.ttl), v.storage.set(h, b.getProtocol(), g.ttl));
                        v._mergeProcessedData(a)
                    }
                    var k, n, r, q, p, s, v = this,
                        y = "0.9.3" + (g.thumbprint || "");
                    return this.storage && (k = this.storage.get(c), n = this.storage.get(h), r = this.storage.get(d), q = this.storage.get(e)), p = k !== y || n !== b.getProtocol(), g = b.isString(g) ? {
                        url: g
                    } : g, g.ttl = b.isNumber(g.ttl) ? g.ttl : 864E5, r && q && !p ? (this._mergeProcessedData({
                        itemHash: r,
                        adjacencyList: q
                    }), s = a.Deferred().resolve()) : s = a.getJSON(g.url).done(f), s
                },
                _transformDatum: function(a) {
                    var d = b.isString(a) ? a : a[this.valueKey],
                        e = a.tokens || b.tokenizeText(d),
                        d = {
                            value: d,
                            tokens: e
                        };
                    return b.isString(a) ?
                        (d.datum = {}, d.datum[this.valueKey] = a) : d.datum = a, d.tokens = b.filter(d.tokens, function(a) {
                            return !b.isBlankString(a)
                        }), d.tokens = b.map(d.tokens, function(a) {
                            return a.toLowerCase()
                        }), d
                },
                _processData: function(a) {
                    var d = this,
                        e = {},
                        c = {};
                    return b.each(a, function(a, g) {
                        var f = d._transformDatum(g),
                            k = b.getUniqueId(f.value);
                        e[k] = f;
                        b.each(f.tokens, function(a, d) {
                            var e = d.charAt(0),
                                e = c[e] || (c[e] = [k]);
                            !~b.indexOf(e, k) && e.push(k)
                        })
                    }), {
                        itemHash: e,
                        adjacencyList: c
                    }
                },
                _mergeProcessedData: function(a) {
                    var d = this;
                    b.mixin(this.itemHash,
                        a.itemHash);
                    b.each(a.adjacencyList, function(a, b) {
                        var e = d.adjacencyList[a];
                        d.adjacencyList[a] = e ? e.concat(b) : b
                    })
                },
                _getLocalSuggestions: function(a) {
                    var d, e = this,
                        c = [],
                        g = [],
                        f = [];
                    return b.each(a, function(a, d) {
                        var e = d.charAt(0);
                        !~b.indexOf(c, e) && c.push(e)
                    }), b.each(c, function(a, b) {
                        var c = e.adjacencyList[b];
                        return c ? (g.push(c), (!d || c.length < d.length) && (d = c), void 0) : !1
                    }), g.length < c.length ? [] : (b.each(d, function(d, c) {
                        var k = e.itemHash[c];
                        b.every(g, function(a) {
                            return~ b.indexOf(a, c)
                        }) && b.every(a, function(a) {
                            return b.some(k.tokens,
                                function(d) {
                                    return 0 === d.indexOf(a)
                                })
                        }) && f.push(k)
                    }), f)
                },
                initialize: function() {
                    var d;
                    return this.local && this._processLocalData(this.local), this.transport = this.remote ? new g(this.remote) : null, d = this.prefetch ? this._loadPrefetchData(this.prefetch) : a.Deferred().resolve(), this.local = this.prefetch = this.remote = null, this.initialize = function() {
                        return d
                    }, d
                },
                getSuggestions: function(a, d) {
                    function e(a) {
                        g = g.slice(0);
                        b.each(a, function(a, d) {
                            var e, c = f._transformDatum(d);
                            return e = b.some(g, function(a) {
                                return c.value ===
                                    a.value
                            }), !e && g.push(c), g.length < f.limit
                        });
                        d && d(g)
                    }
                    var c, g, f = this,
                        k = !1;
                    a.length < this.minLength || (c = b.tokenizeQuery(a), g = this._getLocalSuggestions(c).slice(0, this.limit), g.length < this.limit && this.transport && (k = this.transport.get(a, e)), !k && d && d(g))
                }
            }), k
        }(),
        s = function() {
            function g(c) {
                var d = this;
                b.bindAll(this);
                this.specialKeyCodeMap = {
                    9: "tab",
                    27: "esc",
                    37: "left",
                    39: "right",
                    13: "enter",
                    38: "up",
                    40: "down"
                };
                this.$hint = a(c.hint);
                this.$input = a(c.input).on("blur.tt", this._handleBlur).on("focus.tt", this._handleFocus).on("keydown.tt",
                    this._handleSpecialKeyEvent);
                b.isMsie() ? this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function(a) {
                    d.specialKeyCodeMap[a.which || a.keyCode] || b.defer(d._compareQueryToInputValue)
                }) : this.$input.on("input.tt", this._compareQueryToInputValue);
                this.query = this.$input.val();
                this.$overflowHelper = a("<span></span>").css({
                    position: "absolute",
                    left: "-9999px",
                    visibility: "hidden",
                    whiteSpace: "nowrap",
                    fontFamily: this.$input.css("font-family"),
                    fontSize: this.$input.css("font-size"),
                    fontStyle: this.$input.css("font-style"),
                    fontVariant: this.$input.css("font-variant"),
                    fontWeight: this.$input.css("font-weight"),
                    wordSpacing: this.$input.css("word-spacing"),
                    letterSpacing: this.$input.css("letter-spacing"),
                    textIndent: this.$input.css("text-indent"),
                    textRendering: this.$input.css("text-rendering"),
                    textTransform: this.$input.css("text-transform")
                }).insertAfter(this.$input)
            }
            return b.mixin(g.prototype, c, {
                _handleFocus: function() {
                    this.trigger("focused")
                },
                _handleBlur: function() {
                    this.trigger("blured")
                },
                _handleSpecialKeyEvent: function(a) {
                    var d =
                        this.specialKeyCodeMap[a.which || a.keyCode];
                    d && this.trigger(d + "Keyed", a)
                },
                _compareQueryToInputValue: function() {
                    var a = this.getInputValue(),
                        d, b = this.query,
                        c = a;
                    (d = (b = (b || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " "), c = (c || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " "), b === c)) && this.query.length !== a.length ? this.trigger("whitespaceChanged", {
                        value: this.query
                    }) : d || this.trigger("queryChanged", {
                        value: this.query = a
                    })
                },
                destroy: function() {
                    this.$hint.off(".tt");
                    this.$input.off(".tt");
                    this.$hint = this.$input = this.$overflowHelper =
                        null
                },
                focus: function() {
                    this.$input.focus()
                },
                blur: function() {
                    this.$input.blur()
                },
                getQuery: function() {
                    return this.query
                },
                setQuery: function(a) {
                    this.query = a
                },
                getInputValue: function() {
                    return this.$input.val()
                },
                setInputValue: function(a, d) {
                    this.$input.val(a);
                    !d && this._compareQueryToInputValue()
                },
                getHintValue: function() {
                    return this.$hint.val()
                },
                setHintValue: function(a) {
                    this.$hint.val(a)
                },
                getLanguageDirection: function() {
                    return (this.$input.css("direction") || "ltr").toLowerCase()
                },
                isOverflow: function() {
                    return this.$overflowHelper.text(this.getInputValue()),
                        this.$overflowHelper.width() > this.$input.width()
                },
                isCursorAtEnd: function() {
                    var a, d = this.$input.val().length,
                        c = this.$input[0].selectionStart;
                    return b.isNumber(c) ? c === d : document.selection ? (a = document.selection.createRange(), a.moveStart("character", -d), d === a.text.length) : !0
                }
            }), g
        }(),
        n = function() {
            function g(d) {
                b.bindAll(this);
                this.isOpen = !1;
                this.isEmpty = !0;
                this.isMouseOverDropdown = !1;
                this.$menu = a(d.menu).on("mouseenter.tt", this._handleMouseenter).on("mouseleave.tt", this._handleMouseleave).on("click.tt",
                    ".tt-suggestion", this._handleSelection).on("mouseover.tt", ".tt-suggestion", this._handleMouseover)
            }

            function f(a) {
                return a.data("suggestion")
            }
            var d = {
                    display: "block"
                },
                e = {
                    whiteSpace: "nowrap",
                    cursor: "pointer"
                },
                k = {
                    whiteSpace: "normal"
                };
            return b.mixin(g.prototype, c, {
                _handleMouseenter: function() {
                    this.isMouseOverDropdown = !0
                },
                _handleMouseleave: function() {
                    this.isMouseOverDropdown = !1
                },
                _handleMouseover: function(d) {
                    d = a(d.currentTarget);
                    this._getSuggestions().removeClass("tt-is-under-cursor");
                    d.addClass("tt-is-under-cursor")
                },
                _handleSelection: function(d) {
                    d = a(d.currentTarget);
                    this.trigger("suggestionSelected", f(d))
                },
                _show: function() {
                    this.$menu.css("display", "block")
                },
                _hide: function() {
                    this.$menu.hide()
                },
                _moveCursor: function(a) {
                    var d, b, c;
                    if (this.isVisible()) {
                        if (d = this._getSuggestions(), b = d.filter(".tt-is-under-cursor"), b.removeClass("tt-is-under-cursor"), c = d.index(b) + a, c = (c + 1) % (d.length + 1) - 1, -1 === c) return this.trigger("cursorRemoved"), void 0; - 1 > c && (c = d.length - 1);
                        a = d.eq(c).addClass("tt-is-under-cursor");
                        this._ensureVisibility(a);
                        this.trigger("cursorMoved", f(a))
                    }
                },
                _getSuggestions: function() {
                    return this.$menu.find(".tt-suggestions > .tt-suggestion")
                },
                _ensureVisibility: function(a) {
                    var d = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10),
                        b = this.$menu.scrollTop(),
                        c = a.position().top;
                    a = c + a.outerHeight(!0);
                    0 > c ? this.$menu.scrollTop(b + c) : a > d && this.$menu.scrollTop(b + (a - d))
                },
                destroy: function() {
                    this.$menu.off(".tt");
                    this.$menu = null
                },
                isVisible: function() {
                    return this.isOpen && !this.isEmpty
                },
                closeUnlessMouseIsOverDropdown: function() {
                    this.isMouseOverDropdown || this.close()
                },
                close: function() {
                    this.isOpen && (this.isOpen = !1, this.isMouseOverDropdown = !1, this._hide(), this.$menu.find(".tt-suggestions > .tt-suggestion").removeClass("tt-is-under-cursor"), this.trigger("closed"))
                },
                open: function() {
                    this.isOpen || (this.isOpen = !0, !this.isEmpty && this._show(), this.trigger("opened"))
                },
                setLanguageDirection: function(a) {
                    var d = {
                            left: "0",
                            right: "auto"
                        },
                        b = {
                            left: "auto",
                            right: " 0"
                        };
                    "ltr" === a ? this.$menu.css(d) : this.$menu.css(b)
                },
                moveCursorUp: function() {
                    this._moveCursor(-1)
                },
                moveCursorDown: function() {
                    this._moveCursor(1)
                },
                getSuggestionUnderCursor: function() {
                    var a = this._getSuggestions().filter(".tt-is-under-cursor").first();
                    return 0 < a.length ? f(a) : null
                },
                getFirstSuggestion: function() {
                    var a = this._getSuggestions().first();
                    return 0 < a.length ? f(a) : null
                },
                renderSuggestions: function(c, g) {
                    var f, h, n, r, p, s = "tt-dataset-" + c.name,
                        u = this.$menu.find("." + s);
                    0 === u.length && (h = a('<span class="tt-suggestions"></span>').css(d), u = a("<div></div>").addClass(s).append(c.header).append(h).append(c.footer).appendTo(this.$menu));
                    0 < g.length ? (this.isEmpty = !1, this.isOpen && this._show(), n = document.createElement("div"), r = document.createDocumentFragment(), b.each(g, function(d, b) {
                        b.dataset = c.name;
                        f = c.template(b.datum);
                        n.innerHTML = '<div class="tt-suggestion">%body</div>'.replace("%body", f);
                        p = a(n.firstChild).css(e).data("suggestion", b);
                        p.children().each(function() {
                            a(this).css(k)
                        });
                        r.appendChild(p[0])
                    }), u.show().find(".tt-suggestions").html(r)) : this.clearSuggestions(c.name);
                    this.trigger("suggestionsRendered")
                },
                clearSuggestions: function(a) {
                    a =
                        a ? this.$menu.find(".tt-dataset-" + a) : this.$menu.find('[class^="tt-dataset-"]');
                    var d = a.find(".tt-suggestions");
                    a.hide();
                    d.empty();
                    0 === this._getSuggestions().length && (this.isEmpty = !0, this._hide())
                }
            }), g
        }(),
        v = function() {
            function g(c) {
                var f, h;
                b.bindAll(this);
                var r = c.input;
                f = a(d.wrapper);
                h = a(d.dropdown);
                var r = a(r),
                    p = a(d.hint);
                f = f.css(e.wrapper);
                h = h.css(e.dropdown);
                p.css(e.hint).css({
                    backgroundAttachment: r.css("background-attachment"),
                    backgroundClip: r.css("background-clip"),
                    backgroundColor: r.css("background-color"),
                    backgroundImage: r.css("background-image"),
                    backgroundOrigin: r.css("background-origin"),
                    backgroundPosition: r.css("background-position"),
                    backgroundRepeat: r.css("background-repeat"),
                    backgroundSize: r.css("background-size")
                });
                r.data("ttAttrs", {
                    dir: r.attr("dir"),
                    autocomplete: r.attr("autocomplete"),
                    spellcheck: r.attr("spellcheck"),
                    style: r.attr("style")
                });
                r.addClass("tt-query").attr({
                    autocomplete: "off",
                    spellcheck: !1
                }).css(e.query);
                try {
                    !r.attr("dir") && r.attr("dir", "auto")
                } catch (u) {}
                this.$node = r.wrap(f).parent().prepend(p).append(h);
                this.datasets = c.datasets;
                this.dir = null;
                this.eventBus = c.eventBus;
                c = this.$node.find(".tt-dropdown-menu");
                f = this.$node.find(".tt-query");
                h = this.$node.find(".tt-hint");
                this.dropdownView = (new n({
                    menu: c
                })).on("suggestionSelected", this._handleSelection).on("cursorMoved", this._clearHint).on("cursorMoved", this._setInputValueToSuggestionUnderCursor).on("cursorRemoved", this._setInputValueToQuery).on("cursorRemoved", this._updateHint).on("suggestionsRendered", this._updateHint).on("opened", this._updateHint).on("closed",
                    this._clearHint).on("opened closed", this._propagateEvent);
                this.inputView = (new s({
                    input: f,
                    hint: h
                })).on("focused", this._openDropdown).on("blured", this._closeDropdown).on("blured", this._setInputValueToQuery).on("enterKeyed tabKeyed", this._handleSelection).on("queryChanged", this._clearHint).on("queryChanged", this._clearSuggestions).on("queryChanged", this._getSuggestions).on("whitespaceChanged", this._updateHint).on("queryChanged whitespaceChanged", this._openDropdown).on("queryChanged whitespaceChanged",
                    this._setLanguageDirection).on("escKeyed", this._closeDropdown).on("escKeyed", this._setInputValueToQuery).on("tabKeyed upKeyed downKeyed", this._managePreventDefault).on("upKeyed downKeyed", this._moveDropdownCursor).on("upKeyed downKeyed", this._openDropdown).on("tabKeyed leftKeyed rightKeyed", this._autocomplete)
            }

            function f(a) {
                var d = a.find(".tt-query");
                b.each(d.data("ttAttrs"), function(a, c) {
                    b.isUndefined(c) ? d.removeAttr(a) : d.attr(a, c)
                });
                d.detach().removeData("ttAttrs").removeClass("tt-query").insertAfter(a);
                a.remove()
            }
            var d = {
                    wrapper: '<span class="twitter-typeahead"></span>',
                    hint: '<input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled>',
                    dropdown: '<span class="tt-dropdown-menu"></span>'
                },
                e = {
                    wrapper: {
                        position: "relative",
                        display: "inline-block"
                    },
                    hint: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        borderColor: "transparent",
                        boxShadow: "none"
                    },
                    query: {
                        position: "relative",
                        verticalAlign: "top",
                        backgroundColor: "transparent"
                    },
                    dropdown: {
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        zIndex: "100",
                        display: "none"
                    }
                };
            return b.isMsie() && b.mixin(e.query, {
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
            }), b.isMsie() && 7 >= b.isMsie() && (b.mixin(e.wrapper, {
                display: "inline",
                zoom: "1"
            }), b.mixin(e.query, {
                marginTop: "-1px"
            })), b.mixin(g.prototype, c, {
                _managePreventDefault: function(a) {
                    var d, b = a.data;
                    d = !1;
                    switch (a.type) {
                        case "tabKeyed":
                            a = this.inputView.getHintValue();
                            d = this.inputView.getInputValue();
                            d = a && a !== d;
                            break;
                        case "upKeyed":
                        case "downKeyed":
                            d = !b.shiftKey && !b.ctrlKey &&
                                !b.metaKey
                    }
                    d && b.preventDefault()
                },
                _setLanguageDirection: function() {
                    var a = this.inputView.getLanguageDirection();
                    a !== this.dir && (this.dir = a, this.$node.css("direction", a), this.dropdownView.setLanguageDirection(a))
                },
                _updateHint: function() {
                    var a, d, c, e, g, f = this.dropdownView.getFirstSuggestion(),
                        f = f ? f.value : null,
                        h = this.dropdownView.isVisible(),
                        n = this.inputView.isOverflow();
                    f && h && !n && (a = this.inputView.getInputValue(), d = a.replace(/\s{2,}/g, " ").replace(/^\s+/g, ""), c = b.escapeRegExChars(d), e = RegExp("^(?:" + c +
                        ")(.*$)", "i"), g = e.exec(f), this.inputView.setHintValue(a + (g ? g[1] : "")))
                },
                _clearHint: function() {
                    this.inputView.setHintValue("")
                },
                _clearSuggestions: function() {
                    this.dropdownView.clearSuggestions()
                },
                _setInputValueToQuery: function() {
                    this.inputView.setInputValue(this.inputView.getQuery())
                },
                _setInputValueToSuggestionUnderCursor: function(a) {
                    this.inputView.setInputValue(a.data.value, !0)
                },
                _openDropdown: function() {
                    this.dropdownView.open()
                },
                _closeDropdown: function(a) {
                    this.dropdownView["blured" === a.type ? "closeUnlessMouseIsOverDropdown" :
                        "close"]()
                },
                _moveDropdownCursor: function(a) {
                    var d = a.data;
                    d.shiftKey || d.ctrlKey || d.metaKey || this.dropdownView["upKeyed" === a.type ? "moveCursorUp" : "moveCursorDown"]()
                },
                _handleSelection: function(a) {
                    var d = "suggestionSelected" === a.type,
                        c = d ? a.data : this.dropdownView.getSuggestionUnderCursor();
                    c && (this.inputView.setInputValue(c.value), d ? this.inputView.focus() : a.data.preventDefault(), d && b.isMsie() ? b.defer(this.dropdownView.close) : this.dropdownView.close(), this.eventBus.trigger("selected", c.datum, c.dataset))
                },
                _getSuggestions: function() {
                    var a = this,
                        d = this.inputView.getQuery();
                    b.isBlankString(d) || b.each(this.datasets, function(b, c) {
                        c.getSuggestions(d, function(b) {
                            d === a.inputView.getQuery() && a.dropdownView.renderSuggestions(c, b)
                        })
                    })
                },
                _autocomplete: function(a) {
                    var d, b, c, e, g;
                    ("rightKeyed" !== a.type && "leftKeyed" !== a.type || (d = this.inputView.isCursorAtEnd(), b = "ltr" === this.inputView.getLanguageDirection() ? "leftKeyed" === a.type : "rightKeyed" === a.type, d && !b)) && (c = this.inputView.getQuery(), e = this.inputView.getHintValue(),
                        "" !== e && c !== e && (g = this.dropdownView.getFirstSuggestion(), this.inputView.setInputValue(g.value), this.eventBus.trigger("autocompleted", g.datum, g.dataset)))
                },
                _propagateEvent: function(a) {
                    this.eventBus.trigger(a.type)
                },
                destroy: function() {
                    this.inputView.destroy();
                    this.dropdownView.destroy();
                    f(this.$node);
                    this.$node = null
                },
                setQuery: function(a) {
                    this.inputView.setQuery(a);
                    this.inputView.setInputValue(a);
                    this._clearHint();
                    this._clearSuggestions();
                    this._getSuggestions()
                }
            }), g
        }();
    ! function() {
        var c, g = {};
        c = {
            initialize: function(d) {
                var c;
                return d = b.isArray(d) ? d : [d], 0 === d.length && a.error("no datasets provided"), c = b.map(d, function(a) {
                    var d = g[a.name] ? g[a.name] : new r(a);
                    return a.name && (g[a.name] = d), d
                }), this.each(function() {
                    var d, g = a(this),
                        f = new h({
                            el: g
                        });
                    d = b.map(c, function(a) {
                        return a.initialize()
                    });
                    g.data("ttView", new v({
                        input: g,
                        eventBus: f = new h({
                            el: g
                        }),
                        datasets: c
                    }));
                    a.when.apply(a, d).always(function() {
                        b.defer(function() {
                            f.trigger("initialized")
                        })
                    })
                })
            },
            destroy: function() {
                return this.each(function() {
                    var d = a(this),
                        b = d.data("ttView");
                    b &&
                        (b.destroy(), d.removeData("ttView"))
                })
            },
            setQuery: function(d) {
                return this.each(function() {
                    var b = a(this).data("ttView");
                    b && b.setQuery(d)
                })
            }
        };
        jQuery.fn.typeahead = function(a) {
            return c[a] ? c[a].apply(this, [].slice.call(arguments, 1)) : c.initialize.apply(this, arguments)
        }
    }()
}(window.jQuery);
var fileSource = function() {
    this.source = "default"
};
fileSource.defaultType = "SocialNetwork";
fileSource.prototype = {
    fTypes: ["image", "video"],
    setToken: function() {
        alert("setToken method is not defined")
    },
    getNext: function(a) {
        alert("getFilesNext method is not defined")
    },
    getAll: function() {
        alert("getAll method is not defined")
    },
    getAlbums: function() {
        alert("getAlbums method is not defined")
    },
    check: function() {
        alert("Source: " + this.source)
    }
};
var Facebook = {
    defaults: {
        graphUri: "graph.facebook.com",
        req: "/",
        async: !0,
        onXhrError: function(a, b, c) {
            console.log("log FB xhr error: ", arguments);
            if (a.responseJSON && a.responseJSON.error && (HFN.message("Facebook Error: " + a.responseJSON.error.message, "error"), 190 == a.responseJSON.error.code))
                if (console.log("NOW this", this), this.onAuthError) this.onAuthError();
                else Facebook.initGetToken()
        }
    },
    appId: "563322893738786",
    scope: "user_photos,user_likes,email,user_videos",
    token: null,
    expires: null,
    postTokenAction: null,
    initGetToken: function() {
        var a = HFN.config.isMobile() ? "touch" : "popup";
        window.open("https://www.facebook.com/dialog/oauth?client_id=" + this.appId + "&redirect_uri=" + encodeURIComponent(location.protocol + "//" + location.hostname + "/fbreceive.html") + "&scope=" + this.scope + "&display=" + a + "&response_type=token", "facebook-login", "width=550,height=450")
    },
    hasToken: function() {
        return this.token && 1
    },
    setToken: function(a, b, c) {
        var h = $.extend({}, {
            afterSet: function() {},
            errorCallback: function(a) {
                HFN.message(a.error, "error");
                f.postTokenAction = null;
                Facebook.fbCall("DELETE", "me/permissions?access_token=" + Facebook.token, {}, function(a) {})
            }
        }, c);
        console.log(h, c);
        if (a != this.token) {
            this.token = a;
            this.expires = (new Date).getTime() + (parseInt(b) || 86400);
            var f = this;
            HFN.apiMethod("fb_assign", {
                access_token: Facebook.token
            }, function(c) {
                f.token = c.access_token;
                f.expires = c.expire;
                h.afterSet(f.token, f.expires);
                f.postTokenAction && (f.postTokenAction(a, b), f.postTokenAction = null)
            }, h)
        }
    },
    getToken: function() {
        return this.hasToken() ? this.token : !1
    },
    remToken: function() {
        this.expires = this.token = null
    },
    getTokenCallback: function(a) {
        this.postTokenAction = a;
        this.initGetToken()
    },
    fbCall: function(a, b, c, h, f) {
        a = a || "GET";
        c = c || {};
        h = h || function() {};
        f = f || {};
        f = $.extend({}, this.defaults, f);
        console.log(arguments);
        if (!c.access_token && !f.forceurl)
            if (console.log("nqma access token", c), this.hasToken()) c.access_token = this.getToken();
            else {
                Facebook.remToken();
                if (f.async)
                    if (f.onMissingToken) f.onMissingToken();
                    else HFN.message("Token expired. Please, start over."), console.log("for CALL: ",
                        arguments);
                else this.getTokenCallback(this.fbCall.bind(this, a, b, c, h, f));
                return
            }
        f = $.extend({}, this.defaults, f);
        var p = "https://" + f.graphUri + "/" + b,
            g = this;
        f.forceurl && (p = f.forceurl);
        console.log("opts before call", f);
        return $.ajax({
            url: p,
            type: a,
            dataType: "json",
            async: f.async,
            data: c,
            error: function(r, p, n) {
                console.log("log FB xhr error: ", arguments);
                if (r.responseJSON && r.responseJSON.error && (190 != r.responseJSON.error && HFN.message("Facebook Error: " + r.responseJSON.error.message, "error"), 190 == r.responseJSON.error.code))
                    if (c.access_token &&
                        delete c.access_token, Facebook.remToken(), console.log("ASYNC", f.async), f.async)
                        if (f.onMissingToken) f.onMissingToken();
                        else HFN.message("Token expired. Please, start over.");
                else console.log("vzimame token"), g.getTokenCallback(g.fbCall.bind(g, a, b, c, h, f))
            },
            success: function(a) {
                console.log(a);
                h(a)
            }
        })
    },
    buildGraphUrl: function(a, b, c) {
        b = b || {};
        c = c || {};
        if (!b.access_token)
            if (this.token) b.access_token = this.token;
            else {
                this.getTokenCallback(this.fbCall.bind(this, type, req, b, callback, c));
                return
            }
        c = $.extend({}, this.defaults,
            c || {});
        var h = [],
            f;
        for (f in b) h.push(encodeURIComponent(f) + "=" + encodeURIComponent(b[f]));
        return "https://" + c.graphUri + "/" + a + "?" + h.join("&")
    },
    fbCallGet: function(a, b, c, h) {
        return this.fbCall("GET", a, b, c, h)
    }
};
if ("mob2.n1k.me" == location.host || "mob.n1k.me" == location.host) Facebook.appId = 563322893738786;
else if ("myte.pcloud.com" == location.host || "my.pcloud.com" == location.host) Facebook.appId = 397181747048725;
Facebook.appId = 397181747048725;
var fbSource = function() {
    this.source = "fb";
    this.title = "Facebook";
    this.type = fileSource.defaultType
};
fbSource.prototype = $.extend({}, fileSource.prototype, {
    getSource: function() {
        return this.source
    },
    folderName: function() {
        return "Facebook"
    },
    setToken: function(a, b, c) {
        Facebook.setToken(a, b, c)
    },
    adaptAlbum: function(a) {
        return {
            original: a,
            name: a.name,
            id: a.id,
            nextUrl: -1,
            adapter: this,
            itemsCount: a.count ? a.count : 0,
            getNext: function(a, c) {
                if (!this.nextUrl) return this.nextUrl = -1, !1;
                var h = this,
                    f = [],
                    p = {},
                    g = "/" + this.id + "/photos",
                    r; - 1 != this.nextUrl && (p.forceurl = this.nextUrl);
                c.async && (p.async = c.async);
                c = $.extend({}, {
                        limit: 5
                    },
                    c);
                r = {
                    fields: "images",
                    limit: c.limit
                };
                "videos" == this.id && (r.fields = "source,picture", g = "/me/videos");
                Facebook.fbCallGet(g, r, function(g) {
                    for (var n = 0; n < g.data.length; ++n) "videos" == h.id ? f.push(h.adapter.adaptVideo(g.data[n], c)) : f.push(h.adapter.adaptPhoto(g.data[n], c));
                    h.nextUrl = g.paging && g.paging.next ? g.paging.next : !1;
                    a(f, !!h.nextUrl)
                }, p)
            },
            getAll: function(a, c) {
                var h = Facebook.buildGraphUrl(this.id + "/photos", {
                        fields: "images"
                    }),
                    f = [],
                    p = this,
                    g = function() {
                        Facebook.fbCallGet(h, {
                            limit: 100
                        }, function(r) {
                            for (var s =
                                0; s < r.data.length; ++s) "videos" == p.id ? photos.push(p.adapter.adaptVideo(r.data[s], c)) : photos.push(p.adapter.adaptPhoto(r.data[s], c));
                            0 != r.data.length && r.paging && r.paging.next ? (h = r.paging.next, g()) : a(f)
                        }, $.extend({}, c, {
                            forceurl: h
                        }))
                    };
                g()
            }
        }
    },
    getMeAlbum: function() {
        return {
            name: "Photos of Me",
            id: "me",
            count: -1
        }
    },
    getVideosAlbum: function() {
        return {
            name: "Videos",
            id: "videos",
            count: -1
        }
    },
    adaptVideo: function(a, b) {
        console.log("ADAPTING VIDEO", a);
        return {
            src: a.source,
            width: 150,
            height: 150,
            thumbSrc: a.picture,
            thumbWidth: 150,
            thumbHeight: 150
        }
    },
    adaptPhoto: function(a, b) {
        console.log("adapting photo: ", a);
        b = b || !1;
        var c = $.extend({
            original: a,
            adapter: this
        }, this.getOriginalPhoto(a));
        console.log("ret is ", c);
        if (b.thumb) {
            var h = b.thumb.split("x");
            $.extend(c, this.getThumbnailSize(a, h[0], h[1]));
            console.log("stuff", this.getThumbnailSize(a, h[0], h[1]))
        }
        console.log("ret is ", c);
        return c
    },
    getThumbnailSize: function(a, b, c) {
        for (var h = 0, f = a.images.length - 1; h < a.images.length; ++h)
            if (b >= a.images[h].width && c >= a.images[h].height) {
                f = h;
                break
            }
        return {
            thumbSrc: a.images[f].source,
            thumbWidth: a.images[f].width,
            thumbHeight: a.images[f].height
        }
    },
    getOriginalPhoto: function(a) {
        return a.images[0] && a.images[0].source && a.images[0].width && a.images[0].height ? {
            src: a.images[0].source,
            width: a.images[0].width,
            height: a.images[0].height
        } : {
            src: a.source,
            width: a.width,
            height: a.height
        }
    },
    getAlbums: function(a, b) {
        var c = this;
        Facebook.fbCallGet("/me/albums", {
            fields: "name, count",
            limit: 200
        }, function(b) {
            var f = 0,
                p = [];
            for (p.push(c.adaptAlbum(c.getMeAlbum())); f < b.data.length; ++f) p.push(c.adaptAlbum(b.data[f]));
            p.push(c.adaptAlbum(c.getVideosAlbum()));
            a(p)
        }, b)
    },
    getUserIdentity: function(a, b) {
        Facebook.fbCallGet("/me", {
            fields: "id,name"
        }, function(b) {
            a(b.name + " (" + b.id + ")")
        }, b)
    },
    getItemsNext: function(a) {
        alert("This is fb type;")
    }
});
var ContactsFB = {
        defaults: {
            graphUri: "graph.facebook.com",
            req: "/",
            async: !0,
            onXhrError: function(a, b, c) {
                console.log("log FB xhr error: ", arguments);
                if (a.responseJSON && a.responseJSON.error && (HFN.message("Facebook Error: " + a.responseJSON.error.message, "error"), 190 == a.responseJSON.error.code))
                    if (console.log("NOW this", this), this.onAuthError) this.onAuthError();
                    else ContactsFB.initGetToken()
            }
        },
        appId: 397181747048725,
        scope: "xmpp_login,user_friends",
        token: null,
        expires: null,
        postTokenAction: null,
        onWindowClosed: function() {
            !this.token &&
                this.postTokenAction && this.postTokenAction(!1)
        },
        initGetToken: function() {
            var a = HFN.config.isMobile() ? "touch" : "popup",
                b, c, h = this;
            b = window.open("https://www.facebook.com/dialog/oauth?client_id=" + this.appId + "&redirect_uri=" + encodeURIComponent(location.protocol + "//" + location.hostname + "/fbreceivecontacts.html") + "&scope=" + this.scope + "&display=" + a + "&response_type=token", "facebook-login", "width=550,height=450");
            c = setInterval(function() {
                    try {
                        if (null == b || b.closed) clearInterval(c), h.onWindowClosed()
                    } catch (a) {}
                },
                1E3)
        },
        hasToken: function() {
            return this.token && 1
        },
        setToken: function(a, b, c) {
            var h = $.extend({}, {
                afterSet: function() {},
                errorCallback: function(a) {
                    HFN.message(a.error, "error");
                    f.postTokenAction(!1, !1);
                    f.postTokenAction = null;
                    ContactsFB.fbCall("DELETE", "me/permissions?access_token=" + ContactsFB.token, {}, function(a) {})
                }
            }, c);
            console.log(h, c);
            if (a != this.token) {
                this.token = a;
                this.expires = (new Date).getTime() + (parseInt(b) || 86400);
                var f = this;
                HFN.apiMethod("fb_assign", {
                    type: "fb",
                    access_token: ContactsFB.token
                }, function(c) {
                    f.token =
                        c.access_token;
                    f.expires = c.expire;
                    h.afterSet(f.token, f.expires);
                    f.postTokenAction && (f.postTokenAction(a, b), f.postTokenAction = null)
                }, h)
            }
        },
        getToken: function() {
            return this.hasToken() ? this.token : !1
        },
        remToken: function() {
            this.expires = this.token = null
        },
        getTokenCallback: function(a) {
            this.postTokenAction = a;
            this.initGetToken()
        },
        fbCall: function(a, b, c, h, f) {
            a = a || "GET";
            c = c || {};
            h = h || function() {};
            f = f || {};
            f = $.extend({}, this.defaults, f);
            console.log(arguments);
            if (!c.access_token && !f.forceurl)
                if (console.log("nqma access token",
                    c), this.hasToken()) c.access_token = this.getToken();
                else {
                    ContactsFB.remToken();
                    if (f.async)
                        if (f.onMissingToken) f.onMissingToken();
                        else HFN.message("Token expired. Please, start over."), console.log("for CALL: ", arguments);
                    else this.getTokenCallback(this.fbCall.bind(this, a, b, c, h, f));
                    return
                }
            f = $.extend({}, this.defaults, f);
            var p = "https://" + f.graphUri + "/" + b,
                g = this;
            f.forceurl && (p = f.forceurl);
            console.log("opts before call", f);
            return $.ajax({
                url: p,
                type: a,
                dataType: "json",
                async: f.async,
                data: c,
                error: function(r,
                    p, n) {
                    console.log("log FB xhr error: ", arguments);
                    if (r.responseJSON && r.responseJSON.error && (190 != r.responseJSON.error && HFN.message("Facebook Error: " + r.responseJSON.error.message, "error"), 190 == r.responseJSON.error.code))
                        if (c.access_token && delete c.access_token, ContactsFB.remToken(), console.log("ASYNC", f.async), f.async)
                            if (f.onMissingToken) f.onMissingToken();
                            else HFN.message("Token expired. Please, start over.");
                    else console.log("vzimame token"), g.getTokenCallback(g.fbCall.bind(g, a, b, c, h, f))
                },
                success: function(a) {
                    console.log(a);
                    h(a)
                }
            })
        },
        buildGraphUrl: function(a, b, c) {
            b = b || {};
            c = c || {};
            if (!b.access_token)
                if (this.token) b.access_token = this.token;
                else {
                    this.getTokenCallback(this.fbCall.bind(this, type, req, b, callback, c));
                    return
                }
            c = $.extend({}, this.defaults, c || {});
            var h = [],
                f;
            for (f in b) h.push(encodeURIComponent(f) + "=" + encodeURIComponent(b[f]));
            return "https://" + c.graphUri + "/" + a + "?" + h.join("&")
        },
        fbCallGet: function(a, b, c, h) {
            return this.fbCall("GET", a, b, c, h)
        }
    },
    Dropbox = {
        token: !1,
        defaults: {
            apiServer: "api.dropbox.com/1/",
            errorCallback: function() {},
            async: !0
        },
        scope: "basic",
        client_id: "55rb3kdw2ob3b78",
        redirect_uri: "/dbxreceive.html",
        postTokenAction: !1,
        initGetToken: function(a) {
            a = a || !1;
            window.open("https://www.dropbox.com/1/oauth2/authorize?client_id=" + this.client_id + "&redirect_uri=" + encodeURIComponent("https://" + location.hostname + this.redirect_uri) + "&response_type=token" + (a ? "&force_reapprove=true" : ""), "dropbox-login", "width=500,height=390")
        },
        setToken: function(a, b, c) {
            void 0 == c && (c = !0);
            this.token = a;
            if (c) {
                var h = $.extend({}, {
                        afterSet: function() {},
                        errorCallback: function(a) {
                            HFN.message(a.error, "error");
                            f.postTokenAction = null
                        }
                    }, b),
                    f = this;
                HFN.apiMethod("social_assign", {
                    token: this.token,
                    type: "dbx"
                }, function(b) {
                    f.token = b.access_token;
                    h.afterSet(f.token);
                    f.postTokenAction && (f.postTokenAction(a), f.postTokenAction = null)
                }, h)
            } else this.postTokenAction && (this.postTokenAction(a), this.postTokenAction = null)
        },
        hasToken: function() {
            return !!this.token
        },
        getToken: function() {
            return this.hasToken() ? this.token : !1
        },
        remToken: function() {
            this.token = null
        },
        getTokenCallback: function(a,
            b) {
            this.postTokenAction = a;
            this.initGetToken(b)
        },
        apiCallGet: function(a, b, c, h) {
            return this.apiCall("GET", a, b, c, h)
        },
        apiCall: function(a, b, c, h, f) {
            a = a || "GET";
            c = c || {};
            h = h || function() {};
            f = f || {};
            f = $.extend({}, this.defaults, f);
            console.log(arguments);
            if (!c.access_token && !f.forceurl)
                if (console.log("nqma access token", c), this.hasToken()) c.access_token = this.getToken();
                else {
                    this.remToken();
                    if (f.async)
                        if (f.onMissingToken) f.onMissingToken();
                        else HFN.message("Token expired. Please, start over."), console.log("for CALL: ",
                            arguments);
                    else this.getTokenCallback(this.apiCall.bind(this, a, b, c, h, f));
                    return
                }
            f = $.extend({}, this.defaults, f);
            var p = "https://" + f.apiServer + "/" + b,
                g = this;
            f.forceurl && (p = f.forceurl);
            console.log("opts before call", f);
            return $.ajax({
                url: p,
                type: a,
                dataType: "json",
                async: f.async,
                data: c,
                error: function(r, p, n) {
                    console.log("log Dropbox xhr error: ", arguments);
                    if (r.responseJSON && r.responseJSON.error && (r.responseJSON.error && HFN.message("Dropbox Error: " + r.responseJSON.error, "error"), r.responseJSON.error))
                        if (c.access_token &&
                            delete c.access_token, g.remToken(), console.log("ASYNC", f.async), f.async)
                            if (f.onMissingToken) f.onMissingToken();
                            else HFN.message("Token expired. Please, start over.");
                    else console.log("vzimame token"), g.getTokenCallback(g.fbCall.bind(g, a, b, c, h, f))
                },
                success: function(a) {
                    h(a);
                    console.log("Dropbox respnse", a)
                }
            })
        }
    },
    dbxSource = function() {
        this.source = "dbx";
        this.title = "Dropbox";
        this.type = "FileStorage"
    };
dbxSource.prototype = $.extend({}, fileSource.prototype, {
    getFolder: function(a, b) {
        a = "/" == a ? "/dropbox" : a.replace(/\//, "/dropbox/");
        Dropbox.apiCallGet("metadata" + a, {
            access_token: Dropbox.token
        }, function(a) {
            b(this.convertToPcloudFolderStruct(a))
        }.bind(this))
    },
    convertToPcloudFolderStruct: function(a) {
        var b = {
                folderid: a.path,
                icon: a.icon,
                name: a.path.split("/").pop(),
                isfolder: !0,
                contents: []
            },
            c, h;
        "" == b.name && (b.name = "Dropbox");
        for (i in a.contents) c = a.contents[i], h = {
            folderid: c.path,
            isfolder: c.is_dir,
            parentfolderid: b.folderid,
            name: c.path.split("/").pop(),
            modified: c.modified,
            icon: c.is_dir ? "folder" : "file",
            contents: []
        }, !1 != c.is_dir && b.contents.push(h);
        return b
    }
});
var Instagram = {
        token: !1,
        defaults: {
            apiServer: "api.instagram.com/",
            errorCallback: function() {}
        },
        scope: "basic",
        client_id: "e224c293559a44b79453492146532064",
        redirect_uri: "/instgrmreceive.html",
        postTokenAction: !1,
        initGetToken: function() {
            window.open("https://instagram.com/oauth/authorize/?client_id=" + this.client_id + "&redirect_uri=" + encodeURIComponent(location.protocol + "//" + location.hostname + this.redirect_uri) + "&response_type=token", "instagram-login", "width=500,height=390")
        },
        setToken: function(a, b, c) {
            void 0 ==
                c && (c = !0);
            this.token = a;
            if (c) {
                var h = $.extend({}, {
                        afterSet: function() {},
                        errorCallback: function(a) {
                            HFN.message(a.error, "error");
                            f.postTokenAction = null
                        }
                    }, b),
                    f = this;
                HFN.apiMethod("social_assign", {
                    token: this.token,
                    type: "ig"
                }, function(b) {
                    f.token = b.access_token;
                    h.afterSet(f.token);
                    f.postTokenAction && (f.postTokenAction(a), f.postTokenAction = null)
                }, h)
            } else this.postTokenAction && (this.postTokenAction(a), this.postTokenAction = null)
        },
        hasToken: function() {
            return !!this.token
        },
        getToken: function() {
            return this.hasToken() ?
                this.token : !1
        },
        remToken: function() {
            this.token = null
        },
        getTokenCallback: function(a) {
            this.postTokenAction = a;
            this.initGetToken()
        },
        apiCallGet: function(a, b, c, h) {
            return this.apiCall("GET", a, b, c, h)
        },
        apiCall: function(a, b, c, h, f) {
            a = a || "GET";
            c = c || {};
            h = h || function() {};
            f = f || {};
            f = $.extend({}, this.defaults, f);
            console.log(arguments);
            if (!c.access_token && !f.forceurl)
                if (console.log("nqma access token", c), this.hasToken()) c.access_token = this.getToken();
                else {
                    this.remToken();
                    if (f.async)
                        if (f.onMissingToken) f.onMissingToken();
                        else HFN.message("Token expired. Please, start over."), console.log("for CALL: ", arguments);
                    else this.getTokenCallback(this.apiCall.bind(this, a, b, c, h, f));
                    return
                }
            f = $.extend({}, this.defaults, f);
            var p = "https://" + f.apiServer + "/" + b;
            f.forceurl && (p = f.forceurl);
            console.log("opts before call", f);
            return $.ajax({
                url: p,
                type: a,
                dataType: "jsonp",
                async: f.async,
                data: c,
                success: function(a) {
                    200 == a.meta.code ? h(a) : (f.errorCallback(a), console.log("Instagram Error", a))
                }
            })
        }
    },
    igSource = function() {
        this.source = "ig";
        this.title =
            "Instagram";
        this.type = fileSource.defaultType
    };
igSource.prototype = $.extend({}, fileSource.prototype, {
    getAlbums: function(a) {
        a([this.getPhotosAlbum(), this.getVideosAlbum()])
    },
    adaptPhoto: function(a, b) {
        console.log("adapting photo: ", a);
        var c = {
            original: a,
            adapter: this,
            src: a.images.standard_resolution.url,
            width: a.images.standard_resolution.width,
            height: a.images.standard_resolution.height
        };
        (b || !1).thumb && $.extend(c, {
            thumbSrc: a.images.thumbnail.url,
            thumbWidth: a.images.thumbnail.width,
            thumbHeight: a.images.thumbnail.width
        });
        return c
    },
    getPhotosAlbum: function() {
        return {
            name: "Photos",
            id: "photos",
            nextUrl: -1,
            adapter: this,
            itemsCount: -1,
            getNext: function(a, b) {
                if (!this.nextUrl) return this.nextUrl = -1, !1;
                var c = this,
                    h = [],
                    f = {}; - 1 != this.nextUrl && (f.forceurl = this.nextUrl);
                b.async && (f.async = b.async);
                b = $.extend({}, {
                    limit: 5
                }, b);
                Instagram.apiCallGet("v1/users/self/media/recent", {}, function(f) {
                    for (var g = 0; g < f.data.length; ++g) c.adapter.isPhoto(f.data[g]) && "photos" == c.id ? h.push(c.adapter.adaptPhoto(f.data[g], b)) : c.adapter.isPhoto(f.data[g]) || "videos" != c.id || h.push(c.adapter.adaptPhoto(f.data[g],
                        b));
                    c.nextUrl = obLength(f.pagination) && f.pagination.next_url ? f.pagination.next_url : !1;
                    a(h, !!c.nextUrl)
                }, f)
            }
        }
    },
    getVideosAlbum: function() {
        return $.extend({}, this.getPhotosAlbum(), {
            id: "videos",
            name: "Videos"
        })
    },
    isPhoto: function(a) {
        return "image" == a.type
    }
});
var Picasa = {
        token: void 0,
        expires: 0,
        auth_config: {
            url: "https://accounts.google.com/o/oauth2/auth",
            params: {
                client_id: "972093246167-6qgh722vf7ooofl3n754ljcb64fnvcrq.apps.googleusercontent.com",
                redirect_uri: "https://my.pcloud.com/picasa.html",
                scope: "https://picasaweb.google.com/data/ https://www.googleapis.com/auth/userinfo.profile",
                response_type: "code",
                approval_prompt: "force",
                access_type: "offline"
            }
        },
        revokeConfig: {
            url: "https://accounts.google.com/o/oauth2/revoke",
            params: {
                token: ""
            }
        },
        build_url: function(a) {
            var b =
                a.url + "?",
                c = [],
                h;
            for (h in a.params) c.push(h + "=" + a.params[h]);
            return b += c.join("&")
        },
        set_code: function(a) {
            HFN.apiMethod("social_assign", {
                token: a,
                type: "pi"
            }, function(a) {
                Picasa.token = a.access_token;
                Picasa.expires = a.expire;
                if (Picasa.on_token_set) Picasa.on_token_set(Picasa.token, Picasa.expires)
            })
        },
        revoke_token: function() {
            if (void 0 != Picasa.token) {
                Picasa.revokeConfig.params.token = Picasa.token;
                Picasa.token = void 0;
                var a = Picasa.build_url(Picasa.revokeConfig);
                HFN.apiMethod("social_assign", {
                        type: "pi",
                        dismiss: "true"
                    },
                    function(b) {
                        $.ajax({
                            url: a,
                            type: "GET",
                            dataType: "jsonp",
                            async: !0
                        }).success(function() {})
                    })
            }
        },
        on_token_set: function(a, b) {},
        getTokenCallback: function(a) {
            void 0 != Picasa.token ? a(Picasa.token, Picasa.expires) : ("myte.pcloud.com" == location.host && (Picasa.auth_config.params.redirect_uri = "https://myte.pcloud.com/picasa.html"), "dev.pcloud.com" == location.host && (Picasa.auth_config.params.redirect_uri = "http://dev.pcloud.com/picasa.html"), Picasa.on_token_set = a, HFN.apiMethod("social_assign", {
                type: "pi"
            }, function(a) {
                if (0 !=
                    a.access_token && void 0 != a.access_token) {
                    if (Picasa.token = a.access_token, Picasa.expires = a.expire, Picasa.on_token_set) Picasa.on_token_set(Picasa.token, Picasa.expires)
                } else window.open(Picasa.build_url(Picasa.auth_config), "picasa-login", "width=550,height=450")
            }, {
                errorCallback: function(a) {
                    HFN.message(a.error, "error");
                    self.on_token_set = function() {};
                    Picasa.revoke_token()
                },
                async: !1
            }))
        },
        getUserIdentity: function(a) {
            $.ajax({
                url: "https://www.googleapis.com/oauth2/v1/userinfo",
                type: "GET",
                data: {
                    alt: "json",
                    access_token: Picasa.token
                },
                dataType: "jsonp",
                async: !0,
                success: function(b) {
                    a(b)
                }
            })
        }
    },
    piSource = function() {
        this.source = "pi";
        this.title = "Picasa";
        this.type = fileSource.defaultType
    };
piSource.prototype = $.extend({}, fileSource.prototype, {
    getSource: function() {
        return this.source
    },
    folderName: function() {
        return "Picasa"
    },
    adaptAlbum: function(a) {
        var b = {
            original: a,
            name: a.gphoto$name.$t,
            id: a.gphoto$id.$t,
            adapter: this,
            itemsCount: a.gphoto$numphotos.$t,
            itemsFetched: 0,
            data: void 0,
            load_data: function() {
                $.ajax({
                    dataType: "json",
                    url: "https://picasaweb.google.com/data/feed/api/user/default/albumid/" + b.id,
                    async: !1,
                    data: {
                        access_token: Picasa.token,
                        alt: "json",
                        "start-index": 1,
                        "max-results": 5
                    },
                    success: function(a) {
                        b.data =
                            [];
                        for (var h = 0; h < a.feed.entry.length; h++) b.data.push(a.feed.entry[h])
                    }
                })
            },
            getNext: function(a, h) {
                void 0 == b.data && b.load_data();
                for (var f = [], p = 0; 5 > p; p++)
                    if (console.log(b.itemsFetched, b.itemsCount), f.push(this.adapter.adaptPhoto(b.data[b.itemsFetched], h)), b.itemsFetched++, b.itemsFetched >= b.itemsCount) return a(f), !1;
                a(f);
                return !1
            },
            getAll: function(a, h) {
                void 0 == b.data && b.load_data();
                for (var f = [], p = 0; p < b.itemsCount; p++) f.push(this.adapter.adaptPhoto(b.data[p], h));
                a(f)
            }
        };
        return b
    },
    adaptPhoto: function(a, b) {
        b =
            b || !1;
        var c = $.extend({
            original: a,
            adapter: this
        }, this.getOriginalPhoto(a));
        if (b.thumb) {
            var h = b.thumb.split("x");
            $.extend(c, this.getThumbnailSize(a, h[0], h[1]))
        }
        return c
    },
    getThumbnailSize: function(a, b, c) {
        for (var h = 0, f = a.media$group.media$thumbnail.length - 1; h < a.media$group.media$thumbnail.length; ++h) {
            var p = a.media$group.media$thumbnail[h];
            b >= p.width && c >= p.height && (f = h)
        }
        return {
            thumbSrc: a.media$group.media$thumbnail[f].url,
            thumbWidth: a.media$group.media$thumbnail[f].width,
            thumbHeight: a.media$group.media$thumbnail[f].height
        }
    },
    getOriginalPhoto: function(a) {
        console.log(a);
        if (void 0 != a.gphoto$originalvideo) {
            a = a.media$group.media$content;
            for (var b = 0; b < a.length; b++)
                if ("image" == a[b].medium) return {
                    src: a[b].url,
                    width: a[b].width,
                    height: a[b].height
                }
        } else return {
            src: a.media$group.media$content[0].url,
            width: a.media$group.media$content[0].height,
            height: a.media$group.media$content[0].width
        };
        return {
            src: "",
            width: 0,
            height: 0
        }
    },
    getAlbums: function(a) {
        var b = this;
        $.getJSON("https://picasaweb.google.com/data/feed/api/user/default", {
            access_token: Picasa.token,
            alt: "json"
        }, function(c) {
            for (var h = [], f = 0; f < c.feed.entry.length; f++) h.push(b.adaptAlbum(c.feed.entry[f]));
            a(h)
        })
    },
    getItemsNext: function(a) {
        alert("This is pi type;")
    }
});
var ContactsGmail = {
    token: void 0,
    expires: 0,
    auth_config: {
        url: "https://accounts.google.com/o/oauth2/auth",
        params: {
            client_id: "972093246167-6qgh722vf7ooofl3n754ljcb64fnvcrq.apps.googleusercontent.com",
            redirect_uri: "https://my.pcloud.com/contactsgmail.html",
            scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/contacts.readonly",
            response_type: "code",
            access_type: "offline"
        }
    },
    revokeConfig: {
        url: "https://accounts.google.com/o/oauth2/revoke",
        params: {
            token: ""
        }
    },
    build_url: function(a) {
        var b =
            a.url + "?",
            c = [],
            h;
        for (h in a.params) c.push(h + "=" + a.params[h]);
        return b += c.join("&")
    },
    set_code: function(a) {
        ContactsGmail.token = a;
        if (ContactsGmail.on_token_set) ContactsGmail.on_token_set(ContactsGmail.token)
    },
    revoke_token: function() {
        void 0 != ContactsGmail.token && (ContactsGmail.revokeConfig.params.token = ContactsGmail.token, ContactsGmail.token = void 0, ContactsGmail.build_url(ContactsGmail.revokeConfig))
    },
    on_token_set: function(a) {},
    onWindowClosed: function() {
        if (!this.token && this.on_token_set) this.on_token_set()
    },
    getTokenCallback: function(a) {
        if (void 0 != ContactsGmail.token) a(ContactsGmail.token);
        else {
            "my.pcloud.com" !== location.host && (ContactsGmail.auth_config.params.redirect_uri = location.protocol + "//" + location.host + "/contactsgmail.html");
            var b, c, h = this;
            b = window.open(Picasa.build_url(ContactsGmail.auth_config), "gmail-contacts-login", "width=550,height=510");
            c = setInterval(function() {
                try {
                    if (null == b || b.closed) clearInterval(c), h.onWindowClosed()
                } catch (a) {}
            }, 1E3);
            ContactsGmail.on_token_set = a
        }
    },
    getUserIdentity: function(a) {
        $.ajax({
            url: "https://www.googleapis.com/oauth2/v1/userinfo",
            type: "GET",
            data: {
                alt: "json",
                access_token: ContactsGmail.token
            },
            dataType: "jsonp",
            async: !0,
            success: function(b) {
                a(b)
            }
        })
    }
};
(function(a, b) {
    "function" === typeof define && define.amd ? define(["jquery"], b) : a.jQuery ? b(a.jQuery) : b(a.Zepto)
})(this, function(a, b) {
    a.fn.jPlayer = function(c) {
        var f = "string" === typeof c,
            h = Array.prototype.slice.call(arguments, 1),
            n = this;
        c = !f && h.length ? a.extend.apply(null, [!0, c].concat(h)) : c;
        if (f && "_" === c.charAt(0)) return n;
        f ? this.each(function() {
            var f = a(this).data("jPlayer"),
                r = f && a.isFunction(f[c]) ? f[c].apply(f, h) : f;
            if (r !== f && r !== b) return n = r, !1
        }) : this.each(function() {
            var b = a(this).data("jPlayer");
            b ? b.option(c || {}) : a(this).data("jPlayer", new a.jPlayer(c, this))
        });
        return n
    };
    a.jPlayer = function(b, c) {
        if (arguments.length) {
            this.element = a(c);
            this.options = a.extend(!0, {}, this.options, b);
            var f = this;
            this.element.bind("remove.jPlayer", function() {
                f.destroy()
            });
            this._init()
        }
    };
    "function" !== typeof a.fn.stop && (a.fn.stop = function() {});
    a.jPlayer.emulateMethods = "load play pause";
    a.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate";
    a.jPlayer.emulateOptions = "muted volume";
    a.jPlayer.reservedEvent =
        "ready flashreset resize repeat error warning";
    a.jPlayer.event = {};
    a.each("ready flashreset resize repeat click error warning loadstart progress suspend abort emptied stalled play pause loadedmetadata loadeddata waiting playing canplay canplaythrough seeking seeked timeupdate ended ratechange durationchange volumechange".split(" "), function() {
        a.jPlayer.event[this] = "jPlayer_" + this
    });
    a.jPlayer.htmlEvent = "loadstart abort emptied stalled loadedmetadata loadeddata canplay canplaythrough ratechange".split(" ");
    a.jPlayer.pause = function() {
        a.each(a.jPlayer.prototype.instances, function(a, b) {
            b.data("jPlayer").status.srcSet && b.jPlayer("pause")
        })
    };
    a.jPlayer.timeFormat = {
        showHour: !1,
        showMin: !0,
        showSec: !0,
        padHour: !1,
        padMin: !0,
        padSec: !0,
        sepHour: ":",
        sepMin: ":",
        sepSec: ""
    };
    var c = function() {
        this.init()
    };
    c.prototype = {
        init: function() {
            this.options = {
                timeFormat: a.jPlayer.timeFormat
            }
        },
        time: function(a) {
            var b = new Date(1E3 * (a && "number" === typeof a ? a : 0)),
                c = b.getUTCHours();
            a = this.options.timeFormat.showHour ? b.getUTCMinutes() : b.getUTCMinutes() +
                60 * c;
            b = this.options.timeFormat.showMin ? b.getUTCSeconds() : b.getUTCSeconds() + 60 * a;
            c = this.options.timeFormat.padHour && 10 > c ? "0" + c : c;
            a = this.options.timeFormat.padMin && 10 > a ? "0" + a : a;
            b = this.options.timeFormat.padSec && 10 > b ? "0" + b : b;
            c = "" + (this.options.timeFormat.showHour ? c + this.options.timeFormat.sepHour : "");
            c += this.options.timeFormat.showMin ? a + this.options.timeFormat.sepMin : "";
            return c + (this.options.timeFormat.showSec ? b + this.options.timeFormat.sepSec : "")
        }
    };
    var h = new c;
    a.jPlayer.convertTime = function(a) {
        return h.time(a)
    };
    a.jPlayer.uaBrowser = function(a) {
        a = a.toLowerCase();
        var b = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            c = /(msie) ([\w.]+)/,
            f = /(mozilla)(?:.*? rv:([\w.]+))?/;
        a = /(webkit)[ \/]([\w.]+)/.exec(a) || b.exec(a) || c.exec(a) || 0 > a.indexOf("compatible") && f.exec(a) || [];
        return {
            browser: a[1] || "",
            version: a[2] || "0"
        }
    };
    a.jPlayer.uaPlatform = function(a) {
        var b = a.toLowerCase(),
            c = /(android)/,
            f = /(mobile)/;
        a = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/.exec(b) || [];
        b = /(ipad|playbook)/.exec(b) || !f.exec(b) && c.exec(b) ||
            [];
        a[1] && (a[1] = a[1].replace(/\s/g, "_"));
        return {
            platform: a[1] || "",
            tablet: b[1] || ""
        }
    };
    a.jPlayer.browser = {};
    a.jPlayer.platform = {};
    var f = a.jPlayer.uaBrowser(navigator.userAgent);
    f.browser && (a.jPlayer.browser[f.browser] = !0, a.jPlayer.browser.version = f.version);
    f = a.jPlayer.uaPlatform(navigator.userAgent);
    f.platform && (a.jPlayer.platform[f.platform] = !0, a.jPlayer.platform.mobile = !f.tablet, a.jPlayer.platform.tablet = !!f.tablet);
    a.jPlayer.getDocMode = function() {
        var b;
        a.jPlayer.browser.msie && (document.documentMode ?
            b = document.documentMode : (b = 5, document.compatMode && "CSS1Compat" === document.compatMode && (b = 7)));
        return b
    };
    a.jPlayer.browser.documentMode = a.jPlayer.getDocMode();
    a.jPlayer.nativeFeatures = {
        init: function() {
            var a = document,
                b = a.createElement("video"),
                c = {
                    w3c: "fullscreenEnabled fullscreenElement requestFullscreen exitFullscreen fullscreenchange fullscreenerror".split(" "),
                    moz: "mozFullScreenEnabled mozFullScreenElement mozRequestFullScreen mozCancelFullScreen mozfullscreenchange mozfullscreenerror".split(" "),
                    webkit: " webkitCurrentFullScreenElement webkitRequestFullScreen webkitCancelFullScreen webkitfullscreenchange ".split(" "),
                    webkitVideo: "webkitSupportsFullscreen webkitDisplayingFullscreen webkitEnterFullscreen webkitExitFullscreen  ".split(" ")
                },
                f = ["w3c", "moz", "webkit", "webkitVideo"],
                h, p;
            this.fullscreen = b = {
                support: {
                    w3c: !!a[c.w3c[0]],
                    moz: !!a[c.moz[0]],
                    webkit: "function" === typeof a[c.webkit[3]],
                    webkitVideo: "function" === typeof b[c.webkitVideo[2]]
                },
                used: {}
            };
            h = 0;
            for (p = f.length; h < p; h++) {
                var u = f[h];
                if (b.support[u]) {
                    b.spec =
                        u;
                    b.used[u] = !0;
                    break
                }
            }
            if (b.spec) {
                var d = c[b.spec];
                b.api = {
                    fullscreenEnabled: !0,
                    fullscreenElement: function(b) {
                        b = b ? b : a;
                        return b[d[1]]
                    },
                    requestFullscreen: function(a) {
                        return a[d[2]]()
                    },
                    exitFullscreen: function(b) {
                        b = b ? b : a;
                        return b[d[3]]()
                    }
                };
                b.event = {
                    fullscreenchange: d[4],
                    fullscreenerror: d[5]
                }
            } else b.api = {
                fullscreenEnabled: !1,
                fullscreenElement: function() {
                    return null
                },
                requestFullscreen: function() {},
                exitFullscreen: function() {}
            }, b.event = {}
        }
    };
    a.jPlayer.nativeFeatures.init();
    a.jPlayer.focus = null;
    a.jPlayer.keyIgnoreElementNames =
        "INPUT TEXTAREA";
    var p = function(b) {
        var c = a.jPlayer.focus,
            f;
        c && (a.each(a.jPlayer.keyIgnoreElementNames.split(/\s+/g), function(a, c) {
            if (b.target.nodeName.toUpperCase() === c.toUpperCase()) return f = !0, !1
        }), f || a.each(c.options.keyBindings, function(f, h) {
            if (h && b.which === h.key && a.isFunction(h.fn)) return b.preventDefault(), h.fn(c), !1
        }))
    };
    a.jPlayer.keys = function(b) {
        a(document.documentElement).unbind("keydown.jPlayer");
        b && a(document.documentElement).bind("keydown.jPlayer", p)
    };
    a.jPlayer.keys(!0);
    a.jPlayer.prototype = {
        count: 0,
        version: {
            script: "2.4.0",
            needFlash: "2.4.0",
            flash: "unknown"
        },
        options: {
            swfPath: "js",
            solution: "html, flash",
            supplied: "mp3",
            preload: "metadata",
            volume: 0.8,
            muted: !1,
            wmode: "opaque",
            backgroundColor: "#000000",
            cssSelectorAncestor: "#jp_container_1",
            cssSelector: {
                videoPlay: ".jp-video-play",
                play: ".jp-play",
                pause: ".jp-pause",
                stop: ".jp-stop",
                seekBar: ".jp-seek-bar",
                playBar: ".jp-play-bar",
                mute: ".jp-mute",
                unmute: ".jp-unmute",
                volumeBar: ".jp-volume-bar",
                volumeBarValue: ".jp-volume-bar-value",
                volumeMax: ".jp-volume-max",
                currentTime: ".jp-current-time",
                duration: ".jp-duration",
                fullScreen: ".jp-full-screen",
                restoreScreen: ".jp-restore-screen",
                repeat: ".jp-repeat",
                repeatOff: ".jp-repeat-off",
                gui: ".jp-gui",
                noSolution: ".jp-no-solution"
            },
            smoothPlayBar: !1,
            fullScreen: !1,
            fullWindow: !1,
            autohide: {
                restored: !1,
                full: !0,
                fadeIn: 200,
                fadeOut: 600,
                hold: 1E3
            },
            loop: !1,
            repeat: function(b) {
                b.jPlayer.options.loop ? a(this).unbind(".jPlayerRepeat").bind(a.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
                    a(this).jPlayer("play")
                }) : a(this).unbind(".jPlayerRepeat")
            },
            nativeVideoControls: {},
            noFullWindow: {
                msie: /msie [0-6]\./,
                ipad: /ipad.*?os [0-4]\./,
                iphone: /iphone/,
                ipod: /ipod/,
                android_pad: /android [0-3]\.(?!.*?mobile)/,
                android_phone: /android.*?mobile/,
                blackberry: /blackberry/,
                windows_ce: /windows ce/,
                iemobile: /iemobile/,
                webos: /webos/
            },
            noVolume: {
                ipad: /ipad/,
                iphone: /iphone/,
                ipod: /ipod/,
                android_pad: /android(?!.*?mobile)/,
                android_phone: /android.*?mobile/,
                blackberry: /blackberry/,
                windows_ce: /windows ce/,
                iemobile: /iemobile/,
                webos: /webos/,
                playbook: /playbook/
            },
            timeFormat: {},
            keyEnabled: !1,
            audioFullScreen: !1,
            keyBindings: {
                play: {
                    key: 32,
                    fn: function(a) {
                        a.status.paused ? a.play() : a.pause()
                    }
                },
                fullScreen: {
                    key: 13,
                    fn: function(a) {
                        (a.status.video || a.options.audioFullScreen) && a._setOption("fullScreen", !a.options.fullScreen)
                    }
                },
                muted: {
                    key: 8,
                    fn: function(a) {
                        a._muted(!a.options.muted)
                    }
                },
                volumeUp: {
                    key: 38,
                    fn: function(a) {
                        a.volume(a.options.volume + 0.1)
                    }
                },
                volumeDown: {
                    key: 40,
                    fn: function(a) {
                        a.volume(a.options.volume - 0.1)
                    }
                }
            },
            verticalVolume: !1,
            idPrefix: "jp",
            noConflict: "jQuery",
            emulateHtml: !1,
            errorAlerts: !1,
            warningAlerts: !1
        },
        optionsAudio: {
            size: {
                width: "0px",
                height: "0px",
                cssClass: ""
            },
            sizeFull: {
                width: "0px",
                height: "0px",
                cssClass: ""
            }
        },
        optionsVideo: {
            size: {
                width: "480px",
                height: "270px",
                cssClass: "jp-video-270p"
            },
            sizeFull: {
                width: "100%",
                height: "100%",
                cssClass: "jp-video-full"
            }
        },
        instances: {},
        status: {
            src: "",
            media: {},
            paused: !0,
            format: {},
            formatType: "",
            waitForPlay: !0,
            waitForLoad: !0,
            srcSet: !1,
            video: !1,
            seekPercent: 0,
            currentPercentRelative: 0,
            currentPercentAbsolute: 0,
            currentTime: 0,
            duration: 0,
            videoWidth: 0,
            videoHeight: 0,
            readyState: 0,
            networkState: 0,
            playbackRate: 1,
            ended: 0
        },
        internal: {
            ready: !1
        },
        solution: {
            html: !0,
            flash: !0
        },
        format: {
            mp3: {
                codec: 'audio/mpeg; codecs="mp3"',
                flashCanPlay: !0,
                media: "audio"
            },
            m4a: {
                codec: 'audio/mp4; codecs="mp4a.40.2"',
                flashCanPlay: !0,
                media: "audio"
            },
            oga: {
                codec: 'audio/ogg; codecs="vorbis"',
                flashCanPlay: !1,
                media: "audio"
            },
            wav: {
                codec: 'audio/wav; codecs="1"',
                flashCanPlay: !1,
                media: "audio"
            },
            webma: {
                codec: 'audio/webm; codecs="vorbis"',
                flashCanPlay: !1,
                media: "audio"
            },
            fla: {
                codec: "audio/x-flv",
                flashCanPlay: !0,
                media: "audio"
            },
            rtmpa: {
                codec: 'audio/rtmp; codecs="rtmp"',
                flashCanPlay: !0,
                media: "audio"
            },
            m4v: {
                codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
                flashCanPlay: !0,
                media: "video"
            },
            ogv: {
                codec: 'video/ogg; codecs="theora, vorbis"',
                flashCanPlay: !1,
                media: "video"
            },
            webmv: {
                codec: 'video/webm; codecs="vorbis, vp8"',
                flashCanPlay: !1,
                media: "video"
            },
            flv: {
                codec: "video/x-flv",
                flashCanPlay: !0,
                media: "video"
            },
            rtmpv: {
                codec: 'video/rtmp; codecs="rtmp"',
                flashCanPlay: !0,
                media: "video"
            }
        },
        _init: function() {
            var c = this;
            this.element.empty();
            this.status =
                a.extend({}, this.status);
            this.internal = a.extend({}, this.internal);
            this.options.timeFormat = a.extend({}, a.jPlayer.timeFormat, this.options.timeFormat);
            this.internal.cmdsIgnored = a.jPlayer.platform.ipad || a.jPlayer.platform.iphone || a.jPlayer.platform.ipod;
            this.internal.domNode = this.element.get(0);
            this.options.keyEnabled && !a.jPlayer.focus && (a.jPlayer.focus = this);
            this.formats = [];
            this.solutions = [];
            this.require = {};
            this.htmlElement = {};
            this.html = {};
            this.html.audio = {};
            this.html.video = {};
            this.flash = {};
            this.css = {};
            this.css.cs = {};
            this.css.jq = {};
            this.ancestorJq = [];
            this.options.volume = this._limitValue(this.options.volume, 0, 1);
            a.each(this.options.supplied.toLowerCase().split(","), function(b, f) {
                var h = f.replace(/^\s+|\s+$/g, "");
                if (c.format[h]) {
                    var d = !1;
                    a.each(c.formats, function(a, b) {
                        if (h === b) return d = !0, !1
                    });
                    d || c.formats.push(h)
                }
            });
            a.each(this.options.solution.toLowerCase().split(","), function(b, f) {
                var h = f.replace(/^\s+|\s+$/g, "");
                if (c.solution[h]) {
                    var d = !1;
                    a.each(c.solutions, function(a, b) {
                        if (h === b) return d = !0, !1
                    });
                    d || c.solutions.push(h)
                }
            });
            this.internal.instance = "jp_" + this.count;
            this.instances[this.internal.instance] = this.element;
            this.element.attr("id") || this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count);
            this.internal.self = a.extend({}, {
                id: this.element.attr("id"),
                jq: this.element
            });
            this.internal.audio = a.extend({}, {
                id: this.options.idPrefix + "_audio_" + this.count,
                jq: b
            });
            this.internal.video = a.extend({}, {
                id: this.options.idPrefix + "_video_" + this.count,
                jq: b
            });
            this.internal.flash = a.extend({}, {
                id: this.options.idPrefix +
                    "_flash_" + this.count,
                jq: b,
                swf: this.options.swfPath + (".swf" !== this.options.swfPath.toLowerCase().slice(-4) ? (this.options.swfPath && "/" !== this.options.swfPath.slice(-1) ? "/" : "") + "Jplayer.swf" : "")
            });
            this.internal.poster = a.extend({}, {
                id: this.options.idPrefix + "_poster_" + this.count,
                jq: b
            });
            a.each(a.jPlayer.event, function(a, f) {
                c.options[a] !== b && (c.element.bind(f + ".jPlayer", c.options[a]), c.options[a] = b)
            });
            this.require.audio = !1;
            this.require.video = !1;
            a.each(this.formats, function(a, b) {
                c.require[c.format[b].media] = !0
            });
            this.options = this.require.video ? a.extend(!0, {}, this.optionsVideo, this.options) : a.extend(!0, {}, this.optionsAudio, this.options);
            this._setSize();
            this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
            this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow);
            this.status.noVolume = this._uaBlocklist(this.options.noVolume);
            a.jPlayer.nativeFeatures.fullscreen.api.fullscreenEnabled && this._fullscreenAddEventListeners();
            this._restrictNativeVideoControls();
            this.htmlElement.poster =
                document.createElement("img");
            this.htmlElement.poster.id = this.internal.poster.id;
            this.htmlElement.poster.onload = function() {
                c.status.video && !c.status.waitForPlay || c.internal.poster.jq.show()
            };
            this.element.append(this.htmlElement.poster);
            this.internal.poster.jq = a("#" + this.internal.poster.id);
            this.internal.poster.jq.css({
                width: this.status.width,
                height: this.status.height
            });
            this.internal.poster.jq.hide();
            this.internal.poster.jq.bind("click.jPlayer", function() {
                c._trigger(a.jPlayer.event.click)
            });
            this.html.audio.available = !1;
            this.require.audio && (this.htmlElement.audio = document.createElement("audio"), this.htmlElement.audio.id = this.internal.audio.id, this.html.audio.available = !!this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio));
            this.html.video.available = !1;
            this.require.video && (this.htmlElement.video = document.createElement("video"), this.htmlElement.video.id = this.internal.video.id, this.html.video.available = !!this.htmlElement.video.canPlayType && this._testCanPlayType(this.htmlElement.video));
            this.flash.available = this._checkForFlash(10.1);
            this.html.canPlay = {};
            this.flash.canPlay = {};
            a.each(this.formats, function(a, b) {
                c.html.canPlay[b] = c.html[c.format[b].media].available && "" !== c.htmlElement[c.format[b].media].canPlayType(c.format[b].codec);
                c.flash.canPlay[b] = c.format[b].flashCanPlay && c.flash.available
            });
            this.html.desired = !1;
            this.flash.desired = !1;
            a.each(this.solutions, function(b, f) {
                if (0 === b) c[f].desired = !0;
                else {
                    var h = !1,
                        d = !1;
                    a.each(c.formats, function(a, b) {
                        c[c.solutions[0]].canPlay[b] && ("video" ===
                            c.format[b].media ? d = !0 : h = !0)
                    });
                    c[f].desired = c.require.audio && !h || c.require.video && !d
                }
            });
            this.html.support = {};
            this.flash.support = {};
            a.each(this.formats, function(a, b) {
                c.html.support[b] = c.html.canPlay[b] && c.html.desired;
                c.flash.support[b] = c.flash.canPlay[b] && c.flash.desired
            });
            this.html.used = !1;
            this.flash.used = !1;
            a.each(this.solutions, function(b, f) {
                a.each(c.formats, function(a, d) {
                    if (c[f].support[d]) return c[f].used = !0, !1
                })
            });
            this._resetActive();
            this._resetGate();
            this._cssSelectorAncestor(this.options.cssSelectorAncestor);
            this.html.used || this.flash.used ? this.css.jq.noSolution.length && this.css.jq.noSolution.hide() : (this._error({
                type: a.jPlayer.error.NO_SOLUTION,
                context: "{solution:'" + this.options.solution + "', supplied:'" + this.options.supplied + "'}",
                message: a.jPlayer.errorMsg.NO_SOLUTION,
                hint: a.jPlayer.errorHint.NO_SOLUTION
            }), this.css.jq.noSolution.length && this.css.jq.noSolution.show());
            if (this.flash.used) {
                var f, h = "jQuery=" + encodeURI(this.options.noConflict) + "&id=" + encodeURI(this.internal.self.id) + "&vol=" + this.options.volume +
                    "&muted=" + this.options.muted;
                if (a.jPlayer.browser.msie && (9 > Number(a.jPlayer.browser.version) || 9 > a.jPlayer.browser.documentMode)) {
                    h = ['<param name="movie" value="' + this.internal.flash.swf + '" />', '<param name="FlashVars" value="' + h + '" />', '<param name="allowScriptAccess" value="always" />', '<param name="bgcolor" value="' + this.options.backgroundColor + '" />', '<param name="wmode" value="' + this.options.wmode + '" />'];
                    f = document.createElement('<object id="' + this.internal.flash.id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" tabindex="-1"></object>');
                    for (var n = 0; n < h.length; n++) f.appendChild(document.createElement(h[n]))
                } else n = function(a, b, c) {
                    var d = document.createElement("param");
                    d.setAttribute("name", b);
                    d.setAttribute("value", c);
                    a.appendChild(d)
                }, f = document.createElement("object"), f.setAttribute("id", this.internal.flash.id), f.setAttribute("name", this.internal.flash.id), f.setAttribute("data", this.internal.flash.swf), f.setAttribute("type", "application/x-shockwave-flash"), f.setAttribute("width", "1"), f.setAttribute("height", "1"), f.setAttribute("tabindex",
                    "-1"), n(f, "flashvars", h), n(f, "allowscriptaccess", "always"), n(f, "bgcolor", this.options.backgroundColor), n(f, "wmode", this.options.wmode);
                this.element.append(f);
                this.internal.flash.jq = a(f)
            }
            this.html.used && (this.html.audio.available && (this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio), this.element.append(this.htmlElement.audio), this.internal.audio.jq = a("#" + this.internal.audio.id)), this.html.video.available && (this._addHtmlEventListeners(this.htmlElement.video, this.html.video), this.element.append(this.htmlElement.video),
                this.internal.video.jq = a("#" + this.internal.video.id), this.status.nativeVideoControls ? this.internal.video.jq.css({
                    width: this.status.width,
                    height: this.status.height
                }) : this.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                }), this.internal.video.jq.bind("click.jPlayer", function() {
                    c._trigger(a.jPlayer.event.click)
                })));
            this.options.emulateHtml && this._emulateHtmlBridge();
            this.html.used && !this.flash.used && setTimeout(function() {
                    c.internal.ready = !0;
                    c.version.flash = "n/a";
                    c._trigger(a.jPlayer.event.repeat);
                    c._trigger(a.jPlayer.event.ready)
                },
                100);
            this._updateNativeVideoControls();
            this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide();
            a.jPlayer.prototype.count++
        },
        destroy: function() {
            this.clearMedia();
            this._removeUiClass();
            this.css.jq.currentTime.length && this.css.jq.currentTime.text("");
            this.css.jq.duration.length && this.css.jq.duration.text("");
            a.each(this.css.jq, function(a, b) {
                b.length && b.unbind(".jPlayer")
            });
            this.internal.poster.jq.unbind(".jPlayer");
            this.internal.video.jq && this.internal.video.jq.unbind(".jPlayer");
            this._fullscreenRemoveEventListeners();
            this === a.jPlayer.focus && (a.jPlayer.focus = null);
            this.options.emulateHtml && this._destroyHtmlBridge();
            this.element.removeData("jPlayer");
            this.element.unbind(".jPlayer");
            this.element.empty();
            delete this.instances[this.internal.instance]
        },
        enable: function() {},
        disable: function() {},
        _testCanPlayType: function(a) {
            try {
                return a.canPlayType(this.format.mp3.codec), !0
            } catch (b) {
                return !1
            }
        },
        _uaBlocklist: function(b) {
            var c = navigator.userAgent.toLowerCase(),
                f = !1;
            a.each(b, function(a, b) {
                if (b && b.test(c)) return f = !0, !1
            });
            return f
        },
        _restrictNativeVideoControls: function() {
            this.require.audio && this.status.nativeVideoControls && (this.status.nativeVideoControls = !1, this.status.noFullWindow = !0)
        },
        _updateNativeVideoControls: function() {
            this.html.video.available && this.html.used && (this.htmlElement.video.controls = this.status.nativeVideoControls, this._updateAutohide(), this.status.nativeVideoControls && this.require.video ? (this.internal.poster.jq.hide(), this.internal.video.jq.css({
                    width: this.status.width,
                    height: this.status.height
                })) :
                this.status.waitForPlay && this.status.video && (this.internal.poster.jq.show(), this.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                })))
        },
        _addHtmlEventListeners: function(b, c) {
            var f = this;
            b.preload = this.options.preload;
            b.muted = this.options.muted;
            b.volume = this.options.volume;
            b.addEventListener("progress", function() {
                c.gate && (f.internal.cmdsIgnored && 0 < this.readyState && (f.internal.cmdsIgnored = !1), f._getHtmlStatus(b), f._updateInterface(), f._trigger(a.jPlayer.event.progress))
            }, !1);
            b.addEventListener("timeupdate",
                function() {
                    c.gate && (f._getHtmlStatus(b), f._updateInterface(), f._trigger(a.jPlayer.event.timeupdate))
                }, !1);
            b.addEventListener("durationchange", function() {
                c.gate && (f._getHtmlStatus(b), f._updateInterface(), f._trigger(a.jPlayer.event.durationchange))
            }, !1);
            b.addEventListener("play", function() {
                c.gate && (f._updateButtons(!0), f._html_checkWaitForPlay(), f._trigger(a.jPlayer.event.play))
            }, !1);
            b.addEventListener("playing", function() {
                c.gate && (f._updateButtons(!0), f._seeked(), f._trigger(a.jPlayer.event.playing))
            }, !1);
            b.addEventListener("pause", function() {
                c.gate && (f._updateButtons(!1), f._trigger(a.jPlayer.event.pause))
            }, !1);
            b.addEventListener("waiting", function() {
                c.gate && (f._seeking(), f._trigger(a.jPlayer.event.waiting))
            }, !1);
            b.addEventListener("seeking", function() {
                c.gate && (f._seeking(), f._trigger(a.jPlayer.event.seeking))
            }, !1);
            b.addEventListener("seeked", function() {
                c.gate && (f._seeked(), f._trigger(a.jPlayer.event.seeked))
            }, !1);
            b.addEventListener("volumechange", function() {
                c.gate && (f.options.volume = b.volume,
                    f.options.muted = b.muted, f._updateMute(), f._updateVolume(), f._trigger(a.jPlayer.event.volumechange))
            }, !1);
            b.addEventListener("suspend", function() {
                c.gate && (f._seeked(), f._trigger(a.jPlayer.event.suspend))
            }, !1);
            b.addEventListener("ended", function() {
                c.gate && (a.jPlayer.browser.webkit || (f.htmlElement.media.currentTime = 0), f.htmlElement.media.pause(), f._updateButtons(!1), f._getHtmlStatus(b, !0), f._updateInterface(), f._trigger(a.jPlayer.event.ended))
            }, !1);
            b.addEventListener("error", function() {
                c.gate && (f._updateButtons(!1),
                    f._seeked(), f.status.srcSet && (clearTimeout(f.internal.htmlDlyCmdId), f.status.waitForLoad = !0, f.status.waitForPlay = !0, f.status.video && !f.status.nativeVideoControls && f.internal.video.jq.css({
                        width: "0px",
                        height: "0px"
                    }), f._validString(f.status.media.poster) && !f.status.nativeVideoControls && f.internal.poster.jq.show(), f.css.jq.videoPlay.length && f.css.jq.videoPlay.show(), f._error({
                        type: a.jPlayer.error.URL,
                        context: f.status.src,
                        message: a.jPlayer.errorMsg.URL,
                        hint: a.jPlayer.errorHint.URL
                    })))
            }, !1);
            a.each(a.jPlayer.htmlEvent,
                function(h, p) {
                    b.addEventListener(this, function() {
                        c.gate && f._trigger(a.jPlayer.event[p])
                    }, !1)
                })
        },
        _getHtmlStatus: function(a, b) {
            var c = 0,
                f = 0,
                h = 0,
                p = 0;
            isFinite(a.duration) && (this.status.duration = a.duration);
            c = a.currentTime;
            f = 0 < this.status.duration ? 100 * c / this.status.duration : 0;
            "object" === typeof a.seekable && 0 < a.seekable.length ? (h = 0 < this.status.duration ? 100 * a.seekable.end(a.seekable.length - 1) / this.status.duration : 100, p = 0 < this.status.duration ? 100 * a.currentTime / a.seekable.end(a.seekable.length - 1) : 0) : (h = 100,
                p = f);
            b && (f = p = c = 0);
            this.status.seekPercent = h;
            this.status.currentPercentRelative = p;
            this.status.currentPercentAbsolute = f;
            this.status.currentTime = c;
            this.status.videoWidth = a.videoWidth;
            this.status.videoHeight = a.videoHeight;
            this.status.readyState = a.readyState;
            this.status.networkState = a.networkState;
            this.status.playbackRate = a.playbackRate;
            this.status.ended = a.ended
        },
        _resetStatus: function() {
            this.status = a.extend({}, this.status, a.jPlayer.prototype.status)
        },
        _trigger: function(b, c, f) {
            b = a.Event(b);
            b.jPlayer = {};
            b.jPlayer.version = a.extend({}, this.version);
            b.jPlayer.options = a.extend(!0, {}, this.options);
            b.jPlayer.status = a.extend(!0, {}, this.status);
            b.jPlayer.html = a.extend(!0, {}, this.html);
            b.jPlayer.flash = a.extend(!0, {}, this.flash);
            c && (b.jPlayer.error = a.extend({}, c));
            f && (b.jPlayer.warning = a.extend({}, f));
            this.element.trigger(b)
        },
        jPlayerFlashEvent: function(b, c) {
            if (b === a.jPlayer.event.ready)
                if (this.internal.ready) {
                    if (this.flash.gate) {
                        if (this.status.srcSet) {
                            var f = this.status.currentTime,
                                h = this.status.paused;
                            this.setMedia(this.status.media);
                            0 < f && (h ? this.pause(f) : this.play(f))
                        }
                        this._trigger(a.jPlayer.event.flashreset)
                    }
                } else this.internal.ready = !0, this.internal.flash.jq.css({
                    width: "0px",
                    height: "0px"
                }), this.version.flash = c.version, this.version.needFlash !== this.version.flash && this._error({
                    type: a.jPlayer.error.VERSION,
                    context: this.version.flash,
                    message: a.jPlayer.errorMsg.VERSION + this.version.flash,
                    hint: a.jPlayer.errorHint.VERSION
                }), this._trigger(a.jPlayer.event.repeat), this._trigger(b);
            if (this.flash.gate) switch (b) {
                case a.jPlayer.event.progress:
                    this._getFlashStatus(c);
                    this._updateInterface();
                    this._trigger(b);
                    break;
                case a.jPlayer.event.timeupdate:
                    this._getFlashStatus(c);
                    this._updateInterface();
                    this._trigger(b);
                    break;
                case a.jPlayer.event.play:
                    this._seeked();
                    this._updateButtons(!0);
                    this._trigger(b);
                    break;
                case a.jPlayer.event.pause:
                    this._updateButtons(!1);
                    this._trigger(b);
                    break;
                case a.jPlayer.event.ended:
                    this._updateButtons(!1);
                    this._trigger(b);
                    break;
                case a.jPlayer.event.click:
                    this._trigger(b);
                    break;
                case a.jPlayer.event.error:
                    this.status.waitForLoad = !0;
                    this.status.waitForPlay = !0;
                    this.status.video && this.internal.flash.jq.css({
                        width: "0px",
                        height: "0px"
                    });
                    this._validString(this.status.media.poster) && this.internal.poster.jq.show();
                    this.css.jq.videoPlay.length && this.status.video && this.css.jq.videoPlay.show();
                    this.status.video ? this._flash_setVideo(this.status.media) : this._flash_setAudio(this.status.media);
                    this._updateButtons(!1);
                    this._error({
                        type: a.jPlayer.error.URL,
                        context: c.src,
                        message: a.jPlayer.errorMsg.URL,
                        hint: a.jPlayer.errorHint.URL
                    });
                    break;
                case a.jPlayer.event.seeking:
                    this._seeking();
                    this._trigger(b);
                    break;
                case a.jPlayer.event.seeked:
                    this._seeked();
                    this._trigger(b);
                    break;
                case a.jPlayer.event.ready:
                    break;
                default:
                    this._trigger(b)
            }
            return !1
        },
        _getFlashStatus: function(a) {
            this.status.seekPercent = a.seekPercent;
            this.status.currentPercentRelative = a.currentPercentRelative;
            this.status.currentPercentAbsolute = a.currentPercentAbsolute;
            this.status.currentTime = a.currentTime;
            this.status.duration = a.duration;
            this.status.videoWidth = a.videoWidth;
            this.status.videoHeight = a.videoHeight;
            this.status.readyState =
                4;
            this.status.networkState = 0;
            this.status.playbackRate = 1;
            this.status.ended = !1
        },
        _updateButtons: function(a) {
            a === b ? a = !this.status.paused : this.status.paused = !a;
            this.css.jq.play.length && this.css.jq.pause.length && (a ? (this.css.jq.play.hide(), this.css.jq.pause.show()) : (this.css.jq.play.show(), this.css.jq.pause.hide()));
            this.css.jq.restoreScreen.length && this.css.jq.fullScreen.length && (this.status.noFullWindow ? (this.css.jq.fullScreen.hide(), this.css.jq.restoreScreen.hide()) : this.options.fullWindow ? (this.css.jq.fullScreen.hide(),
                this.css.jq.restoreScreen.show()) : (this.css.jq.fullScreen.show(), this.css.jq.restoreScreen.hide()));
            this.css.jq.repeat.length && this.css.jq.repeatOff.length && (this.options.loop ? (this.css.jq.repeat.hide(), this.css.jq.repeatOff.show()) : (this.css.jq.repeat.show(), this.css.jq.repeatOff.hide()))
        },
        _updateInterface: function() {
            this.css.jq.seekBar.length && this.css.jq.seekBar.width(this.status.seekPercent + "%");
            this.css.jq.playBar.length && (this.options.smoothPlayBar ? this.css.jq.playBar.stop().animate({
                width: this.status.currentPercentAbsolute +
                    "%"
            }, 250, "linear") : this.css.jq.playBar.width(this.status.currentPercentRelative + "%"));
            this.css.jq.currentTime.length && this.css.jq.currentTime.text(this._convertTime(this.status.currentTime));
            this.css.jq.duration.length && this.css.jq.duration.text(this._convertTime(this.status.duration))
        },
        _convertTime: c.prototype.time,
        _seeking: function() {
            this.css.jq.seekBar.length && this.css.jq.seekBar.addClass("jp-seeking-bg")
        },
        _seeked: function() {
            this.css.jq.seekBar.length && this.css.jq.seekBar.removeClass("jp-seeking-bg")
        },
        _resetGate: function() {
            this.html.audio.gate = !1;
            this.html.video.gate = !1;
            this.flash.gate = !1
        },
        _resetActive: function() {
            this.html.active = !1;
            this.flash.active = !1
        },
        setMedia: function(b) {
            var c = this,
                f = !1,
                h = this.status.media.poster !== b.poster;
            this._resetMedia();
            this._resetGate();
            this._resetActive();
            a.each(this.formats, function(h, n) {
                var p = "video" === c.format[n].media;
                a.each(c.solutions, function(a, e) {
                    if (c[e].support[n] && c._validString(b[n])) {
                        var h = "html" === e;
                        p ? (h ? (c.html.video.gate = !0, c._html_setVideo(b), c.html.active = !0) : (c.flash.gate = !0, c._flash_setVideo(b), c.flash.active = !0), c.css.jq.videoPlay.length && c.css.jq.videoPlay.show(), c.status.video = !0) : (h ? (c.html.audio.gate = !0, c._html_setAudio(b), c.html.active = !0) : (c.flash.gate = !0, c._flash_setAudio(b), c.flash.active = !0), c.css.jq.videoPlay.length && c.css.jq.videoPlay.hide(), c.status.video = !1);
                        f = !0;
                        return !1
                    }
                });
                if (f) return !1
            });
            f ? (this.status.nativeVideoControls && this.html.video.gate || !this._validString(b.poster) || (h ? this.htmlElement.poster.src = b.poster : this.internal.poster.jq.show()),
                this.status.srcSet = !0, this.status.media = a.extend({}, b), this._updateButtons(!1), this._updateInterface()) : this._error({
                type: a.jPlayer.error.NO_SUPPORT,
                context: "{supplied:'" + this.options.supplied + "'}",
                message: a.jPlayer.errorMsg.NO_SUPPORT,
                hint: a.jPlayer.errorHint.NO_SUPPORT
            })
        },
        _resetMedia: function() {
            this._resetStatus();
            this._updateButtons(!1);
            this._updateInterface();
            this._seeked();
            this.internal.poster.jq.hide();
            clearTimeout(this.internal.htmlDlyCmdId);
            this.html.active ? this._html_resetMedia() : this.flash.active &&
                this._flash_resetMedia()
        },
        clearMedia: function() {
            this._resetMedia();
            this.html.active ? this._html_clearMedia() : this.flash.active && this._flash_clearMedia();
            this._resetGate();
            this._resetActive()
        },
        load: function() {
            this.status.srcSet ? this.html.active ? this._html_load() : this.flash.active && this._flash_load() : this._urlNotSetError("load")
        },
        focus: function() {
            this.options.keyEnabled && (a.jPlayer.focus = this)
        },
        play: function(a) {
            a = "number" === typeof a ? a : NaN;
            this.status.srcSet ? (this.focus(), this.html.active ? this._html_play(a) :
                this.flash.active && this._flash_play(a)) : this._urlNotSetError("play")
        },
        videoPlay: function() {
            this.play()
        },
        pause: function(a) {
            a = "number" === typeof a ? a : NaN;
            this.status.srcSet ? this.html.active ? this._html_pause(a) : this.flash.active && this._flash_pause(a) : this._urlNotSetError("pause")
        },
        pauseOthers: function() {
            var b = this;
            a.each(this.instances, function(a, c) {
                b.element !== c && c.data("jPlayer").status.srcSet && c.jPlayer("pause")
            })
        },
        stop: function() {
            this.status.srcSet ? this.html.active ? this._html_pause(0) : this.flash.active &&
                this._flash_pause(0) : this._urlNotSetError("stop")
        },
        playHead: function(a) {
            a = this._limitValue(a, 0, 100);
            this.status.srcSet ? this.html.active ? this._html_playHead(a) : this.flash.active && this._flash_playHead(a) : this._urlNotSetError("playHead")
        },
        _muted: function(b) {
            this.options.muted = b;
            this.html.used && this._html_mute(b);
            this.flash.used && this._flash_mute(b);
            this.html.video.gate || this.html.audio.gate || (this._updateMute(b), this._updateVolume(this.options.volume), this._trigger(a.jPlayer.event.volumechange))
        },
        mute: function(a) {
            a =
                a === b ? !0 : !!a;
            this._muted(a)
        },
        unmute: function(a) {
            a = a === b ? !0 : !!a;
            this._muted(!a)
        },
        _updateMute: function(a) {
            a === b && (a = this.options.muted);
            this.css.jq.mute.length && this.css.jq.unmute.length && (this.status.noVolume ? (this.css.jq.mute.hide(), this.css.jq.unmute.hide()) : a ? (this.css.jq.mute.hide(), this.css.jq.unmute.show()) : (this.css.jq.mute.show(), this.css.jq.unmute.hide()))
        },
        volume: function(b) {
            b = this._limitValue(b, 0, 1);
            this.options.volume = b;
            this.html.used && this._html_volume(b);
            this.flash.used && this._flash_volume(b);
            this.html.video.gate || this.html.audio.gate || (this._updateVolume(b), this._trigger(a.jPlayer.event.volumechange))
        },
        volumeBar: function(b) {
            if (this.css.jq.volumeBar.length) {
                var c = a(b.currentTarget),
                    f = c.offset(),
                    h = b.pageX - f.left,
                    p = c.width();
                b = c.height() - b.pageY + f.top;
                c = c.height();
                this.options.verticalVolume ? this.volume(b / c) : this.volume(h / p)
            }
            this.options.muted && this._muted(!1)
        },
        volumeBarValue: function() {},
        _updateVolume: function(a) {
            a === b && (a = this.options.volume);
            a = this.options.muted ? 0 : a;
            this.status.noVolume ?
                (this.css.jq.volumeBar.length && this.css.jq.volumeBar.hide(), this.css.jq.volumeBarValue.length && this.css.jq.volumeBarValue.hide(), this.css.jq.volumeMax.length && this.css.jq.volumeMax.hide()) : (this.css.jq.volumeBar.length && this.css.jq.volumeBar.show(), this.css.jq.volumeBarValue.length && (this.css.jq.volumeBarValue.show(), this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"](100 * a + "%")), this.css.jq.volumeMax.length && this.css.jq.volumeMax.show())
        },
        volumeMax: function() {
            this.volume(1);
            this.options.muted && this._muted(!1)
        },
        _cssSelectorAncestor: function(b) {
            var c = this;
            this.options.cssSelectorAncestor = b;
            this._removeUiClass();
            this.ancestorJq = b ? a(b) : [];
            b && 1 !== this.ancestorJq.length && this._warning({
                type: a.jPlayer.warning.CSS_SELECTOR_COUNT,
                context: b,
                message: a.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.",
                hint: a.jPlayer.warningHint.CSS_SELECTOR_COUNT
            });
            this._addUiClass();
            a.each(this.options.cssSelector, function(a, b) {
                c._cssSelector(a, b)
            });
            this._updateInterface();
            this._updateButtons();
            this._updateAutohide();
            this._updateVolume();
            this._updateMute()
        },
        _cssSelector: function(b, c) {
            var f = this;
            "string" === typeof c ? a.jPlayer.prototype.options.cssSelector[b] ? (this.css.jq[b] && this.css.jq[b].length && this.css.jq[b].unbind(".jPlayer"), this.options.cssSelector[b] = c, this.css.cs[b] = this.options.cssSelectorAncestor + " " + c, this.css.jq[b] = c ? a(this.css.cs[b]) : [], this.css.jq[b].length && this.css.jq[b].bind("click.jPlayer", function(c) {
                c.preventDefault();
                f[b](c);
                a(this).blur()
            }), c && 1 !== this.css.jq[b].length && this._warning({
                type: a.jPlayer.warning.CSS_SELECTOR_COUNT,
                context: this.css.cs[b],
                message: a.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[b].length + " found for " + b + " method.",
                hint: a.jPlayer.warningHint.CSS_SELECTOR_COUNT
            })) : this._warning({
                type: a.jPlayer.warning.CSS_SELECTOR_METHOD,
                context: b,
                message: a.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
                hint: a.jPlayer.warningHint.CSS_SELECTOR_METHOD
            }) : this._warning({
                type: a.jPlayer.warning.CSS_SELECTOR_STRING,
                context: c,
                message: a.jPlayer.warningMsg.CSS_SELECTOR_STRING,
                hint: a.jPlayer.warningHint.CSS_SELECTOR_STRING
            })
        },
        seekBar: function(b) {
            if (this.css.jq.seekBar.length) {
                var c = a(b.currentTarget),
                    f = c.offset();
                b = b.pageX - f.left;
                c = c.width();
                this.playHead(100 * b / c)
            }
        },
        playBar: function() {},
        repeat: function() {
            this._loop(!0)
        },
        repeatOff: function() {
            this._loop(!1)
        },
        _loop: function(b) {
            this.options.loop !== b && (this.options.loop = b, this._updateButtons(), this._trigger(a.jPlayer.event.repeat))
        },
        currentTime: function() {},
        duration: function() {},
        gui: function() {},
        noSolution: function() {},
        option: function(c, f) {
            var h = c;
            if (0 === arguments.length) return a.extend(!0, {}, this.options);
            if ("string" === typeof c) {
                var n = c.split(".");
                if (f === b) {
                    for (var h = a.extend(!0, {}, this.options), p = 0; p < n.length; p++)
                        if (h[n[p]] !== b) h = h[n[p]];
                        else return this._warning({
                            type: a.jPlayer.warning.OPTION_KEY,
                            context: c,
                            message: a.jPlayer.warningMsg.OPTION_KEY,
                            hint: a.jPlayer.warningHint.OPTION_KEY
                        }), b;
                    return h
                }
                for (var p = h = {}, w = 0; w < n.length; w++) w < n.length - 1 ? (p[n[w]] = {}, p = p[n[w]]) : p[n[w]] =
                    f
            }
            this._setOptions(h);
            return this
        },
        _setOptions: function(b) {
            var c = this;
            a.each(b, function(a, b) {
                c._setOption(a, b)
            });
            return this
        },
        _setOption: function(b, c) {
            var f = this;
            switch (b) {
                case "volume":
                    this.volume(c);
                    break;
                case "muted":
                    this._muted(c);
                    break;
                case "cssSelectorAncestor":
                    this._cssSelectorAncestor(c);
                    break;
                case "cssSelector":
                    a.each(c, function(a, b) {
                        f._cssSelector(a, b)
                    });
                    break;
                case "fullScreen":
                    if (this.options[b] !== c) {
                        var h = a.jPlayer.nativeFeatures.fullscreen.used.webkitVideo;
                        if (!h || h && !this.status.waitForPlay) h ||
                            (this.options[b] = c), c ? this._requestFullscreen() : this._exitFullscreen(), h || this._setOption("fullWindow", c)
                    }
                    break;
                case "fullWindow":
                    this.options[b] !== c && (this._removeUiClass(), this.options[b] = c, this._refreshSize());
                    break;
                case "size":
                    !this.options.fullWindow && this.options[b].cssClass !== c.cssClass && this._removeUiClass();
                    this.options[b] = a.extend({}, this.options[b], c);
                    this._refreshSize();
                    break;
                case "sizeFull":
                    this.options.fullWindow && this.options[b].cssClass !== c.cssClass && this._removeUiClass();
                    this.options[b] =
                        a.extend({}, this.options[b], c);
                    this._refreshSize();
                    break;
                case "autohide":
                    this.options[b] = a.extend({}, this.options[b], c);
                    this._updateAutohide();
                    break;
                case "loop":
                    this._loop(c);
                    break;
                case "nativeVideoControls":
                    this.options[b] = a.extend({}, this.options[b], c);
                    this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
                    this._restrictNativeVideoControls();
                    this._updateNativeVideoControls();
                    break;
                case "noFullWindow":
                    this.options[b] = a.extend({}, this.options[b], c);
                    this.status.nativeVideoControls =
                        this._uaBlocklist(this.options.nativeVideoControls);
                    this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow);
                    this._restrictNativeVideoControls();
                    this._updateButtons();
                    break;
                case "noVolume":
                    this.options[b] = a.extend({}, this.options[b], c);
                    this.status.noVolume = this._uaBlocklist(this.options.noVolume);
                    this._updateVolume();
                    this._updateMute();
                    break;
                case "emulateHtml":
                    this.options[b] !== c && ((this.options[b] = c) ? this._emulateHtmlBridge() : this._destroyHtmlBridge());
                    break;
                case "timeFormat":
                    this.options[b] =
                        a.extend({}, this.options[b], c);
                    break;
                case "keyEnabled":
                    this.options[b] = c;
                    !c && this === a.jPlayer.focus && (a.jPlayer.focus = null);
                    break;
                case "keyBindings":
                    this.options[b] = a.extend(!0, {}, this.options[b], c);
                    break;
                case "audioFullScreen":
                    this.options[b] = c
            }
            return this
        },
        _refreshSize: function() {
            this._setSize();
            this._addUiClass();
            this._updateSize();
            this._updateButtons();
            this._updateAutohide();
            this._trigger(a.jPlayer.event.resize)
        },
        _setSize: function() {
            this.options.fullWindow ? (this.status.width = this.options.sizeFull.width,
                this.status.height = this.options.sizeFull.height, this.status.cssClass = this.options.sizeFull.cssClass) : (this.status.width = this.options.size.width, this.status.height = this.options.size.height, this.status.cssClass = this.options.size.cssClass);
            this.element.css({
                width: this.status.width,
                height: this.status.height
            })
        },
        _addUiClass: function() {
            this.ancestorJq.length && this.ancestorJq.addClass(this.status.cssClass)
        },
        _removeUiClass: function() {
            this.ancestorJq.length && this.ancestorJq.removeClass(this.status.cssClass)
        },
        _updateSize: function() {
            this.internal.poster.jq.css({
                width: this.status.width,
                height: this.status.height
            });
            !this.status.waitForPlay && this.html.active && this.status.video || this.html.video.available && this.html.used && this.status.nativeVideoControls ? this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            }) : !this.status.waitForPlay && this.flash.active && this.status.video && this.internal.flash.jq.css({
                width: this.status.width,
                height: this.status.height
            })
        },
        _updateAutohide: function() {
            var a = this,
                b = function() {
                    a.css.jq.gui.fadeIn(a.options.autohide.fadeIn, function() {
                        clearTimeout(a.internal.autohideId);
                        a.internal.autohideId = setTimeout(function() {
                            a.css.jq.gui.fadeOut(a.options.autohide.fadeOut)
                        }, a.options.autohide.hold)
                    })
                };
            this.css.jq.gui.length && (this.css.jq.gui.stop(!0, !0), clearTimeout(this.internal.autohideId), this.element.unbind(".jPlayerAutohide"), this.css.jq.gui.unbind(".jPlayerAutohide"), this.status.nativeVideoControls ? this.css.jq.gui.hide() : this.options.fullWindow && this.options.autohide.full ||
                !this.options.fullWindow && this.options.autohide.restored ? (this.element.bind("mousemove.jPlayer.jPlayerAutohide", b), this.css.jq.gui.bind("mousemove.jPlayer.jPlayerAutohide", b), this.css.jq.gui.hide()) : this.css.jq.gui.show())
        },
        fullScreen: function() {
            this._setOption("fullScreen", !0)
        },
        restoreScreen: function() {
            this._setOption("fullScreen", !1)
        },
        _fullscreenAddEventListeners: function() {
            var b = this,
                c = a.jPlayer.nativeFeatures.fullscreen;
            c.api.fullscreenEnabled && c.event.fullscreenchange && ("function" !== typeof this.internal.fullscreenchangeHandler &&
                (this.internal.fullscreenchangeHandler = function() {
                    b._fullscreenchange()
                }), document.addEventListener(c.event.fullscreenchange, this.internal.fullscreenchangeHandler, !1))
        },
        _fullscreenRemoveEventListeners: function() {
            var b = a.jPlayer.nativeFeatures.fullscreen;
            this.internal.fullscreenchangeHandler && document.addEventListener(b.event.fullscreenchange, this.internal.fullscreenchangeHandler, !1)
        },
        _fullscreenchange: function() {
            this.options.fullScreen && !a.jPlayer.nativeFeatures.fullscreen.api.fullscreenElement() &&
                this._setOption("fullScreen", !1)
        },
        _requestFullscreen: function() {
            var b = this.ancestorJq.length ? this.ancestorJq[0] : this.element[0],
                c = a.jPlayer.nativeFeatures.fullscreen;
            c.used.webkitVideo && (b = this.htmlElement.video);
            c.api.fullscreenEnabled && c.api.requestFullscreen(b)
        },
        _exitFullscreen: function() {
            var b = a.jPlayer.nativeFeatures.fullscreen,
                c;
            b.used.webkitVideo && (c = this.htmlElement.video);
            b.api.fullscreenEnabled && b.api.exitFullscreen(c)
        },
        _html_initMedia: function(b) {
            var c = a(this.htmlElement.media).empty();
            a.each(b.track || [], function(a, b) {
                var f = document.createElement("track");
                f.setAttribute("kind", b.kind ? b.kind : "");
                f.setAttribute("src", b.src ? b.src : "");
                f.setAttribute("srclang", b.srclang ? b.srclang : "");
                f.setAttribute("label", b.label ? b.label : "");
                b.def && f.setAttribute("default", b.def);
                c.append(f)
            });
            this.htmlElement.media.src = this.status.src;
            "none" !== this.options.preload && this._html_load();
            this._trigger(a.jPlayer.event.timeupdate)
        },
        _html_setFormat: function(b) {
            var c = this;
            a.each(this.formats, function(a, f) {
                if (c.html.support[f] &&
                    b[f]) return c.status.src = b[f], c.status.format[f] = !0, c.status.formatType = f, !1
            })
        },
        _html_setAudio: function(a) {
            this._html_setFormat(a);
            this.htmlElement.media = this.htmlElement.audio;
            this._html_initMedia(a)
        },
        _html_setVideo: function(a) {
            this._html_setFormat(a);
            this.status.nativeVideoControls && (this.htmlElement.video.poster = this._validString(a.poster) ? a.poster : "");
            this.htmlElement.media = this.htmlElement.video;
            this._html_initMedia(a)
        },
        _html_resetMedia: function() {
            this.htmlElement.media && (this.htmlElement.media.id ===
                this.internal.video.id && !this.status.nativeVideoControls && this.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                }), this.htmlElement.media.pause())
        },
        _html_clearMedia: function() {
            this.htmlElement.media && (this.htmlElement.media.src = "about:blank", this.htmlElement.media.load())
        },
        _html_load: function() {
            this.status.waitForLoad && (this.status.waitForLoad = !1, this.htmlElement.media.load());
            clearTimeout(this.internal.htmlDlyCmdId)
        },
        _html_play: function(a) {
            var b = this,
                c = this.htmlElement.media;
            this._html_load();
            if (isNaN(a)) c.play();
            else {
                this.internal.cmdsIgnored && c.play();
                try {
                    if (!c.seekable || "object" === typeof c.seekable && 0 < c.seekable.length) c.currentTime = a, c.play();
                    else throw 1;
                } catch (f) {
                    this.internal.htmlDlyCmdId = setTimeout(function() {
                        b.play(a)
                    }, 250);
                    return
                }
            }
            this._html_checkWaitForPlay()
        },
        _html_pause: function(a) {
            var b = this,
                c = this.htmlElement.media;
            0 < a ? this._html_load() : clearTimeout(this.internal.htmlDlyCmdId);
            c.pause();
            if (!isNaN(a)) try {
                if (!c.seekable || "object" === typeof c.seekable && 0 < c.seekable.length) c.currentTime = a;
                else throw 1;
            } catch (f) {
                this.internal.htmlDlyCmdId = setTimeout(function() {
                    b.pause(a)
                }, 250);
                return
            }
            0 < a && this._html_checkWaitForPlay()
        },
        _html_playHead: function(a) {
            var b = this,
                c = this.htmlElement.media;
            this._html_load();
            try {
                if ("object" === typeof c.seekable && 0 < c.seekable.length) c.currentTime = a * c.seekable.end(c.seekable.length - 1) / 100;
                else if (0 < c.duration && !isNaN(c.duration)) c.currentTime = a * c.duration / 100;
                else throw "e";
            } catch (f) {
                this.internal.htmlDlyCmdId = setTimeout(function() {
                    b.playHead(a)
                }, 250);
                return
            }
            this.status.waitForLoad ||
                this._html_checkWaitForPlay()
        },
        _html_checkWaitForPlay: function() {
            this.status.waitForPlay && (this.status.waitForPlay = !1, this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), this.status.video && (this.internal.poster.jq.hide(), this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            })))
        },
        _html_volume: function(a) {
            this.html.audio.available && (this.htmlElement.audio.volume = a);
            this.html.video.available && (this.htmlElement.video.volume = a)
        },
        _html_mute: function(a) {
            this.html.audio.available &&
                (this.htmlElement.audio.muted = a);
            this.html.video.available && (this.htmlElement.video.muted = a)
        },
        _flash_setAudio: function(b) {
            var c = this;
            try {
                a.each(this.formats, function(a, f) {
                    if (c.flash.support[f] && b[f]) {
                        switch (f) {
                            case "m4a":
                            case "fla":
                                c._getMovie().fl_setAudio_m4a(b[f]);
                                break;
                            case "mp3":
                                c._getMovie().fl_setAudio_mp3(b[f]);
                                break;
                            case "rtmpa":
                                c._getMovie().fl_setAudio_rtmp(b[f])
                        }
                        c.status.src = b[f];
                        c.status.format[f] = !0;
                        c.status.formatType = f;
                        return !1
                    }
                }), "auto" === this.options.preload && (this._flash_load(),
                    this.status.waitForLoad = !1)
            } catch (f) {
                this._flashError(f)
            }
        },
        _flash_setVideo: function(b) {
            var c = this;
            try {
                a.each(this.formats, function(a, f) {
                    if (c.flash.support[f] && b[f]) {
                        switch (f) {
                            case "m4v":
                            case "flv":
                                c._getMovie().fl_setVideo_m4v(b[f]);
                                break;
                            case "rtmpv":
                                c._getMovie().fl_setVideo_rtmp(b[f])
                        }
                        c.status.src = b[f];
                        c.status.format[f] = !0;
                        c.status.formatType = f;
                        return !1
                    }
                }), "auto" === this.options.preload && (this._flash_load(), this.status.waitForLoad = !1)
            } catch (f) {
                this._flashError(f)
            }
        },
        _flash_resetMedia: function() {
            this.internal.flash.jq.css({
                width: "0px",
                height: "0px"
            });
            this._flash_pause(NaN)
        },
        _flash_clearMedia: function() {
            try {
                this._getMovie().fl_clearMedia()
            } catch (a) {
                this._flashError(a)
            }
        },
        _flash_load: function() {
            try {
                this._getMovie().fl_load()
            } catch (a) {
                this._flashError(a)
            }
            this.status.waitForLoad = !1
        },
        _flash_play: function(a) {
            try {
                this._getMovie().fl_play(a)
            } catch (b) {
                this._flashError(b)
            }
            this.status.waitForLoad = !1;
            this._flash_checkWaitForPlay()
        },
        _flash_pause: function(a) {
            try {
                this._getMovie().fl_pause(a)
            } catch (b) {
                this._flashError(b)
            }
            0 < a && (this.status.waitForLoad = !1, this._flash_checkWaitForPlay())
        },
        _flash_playHead: function(a) {
            try {
                this._getMovie().fl_play_head(a)
            } catch (b) {
                this._flashError(b)
            }
            this.status.waitForLoad || this._flash_checkWaitForPlay()
        },
        _flash_checkWaitForPlay: function() {
            this.status.waitForPlay && (this.status.waitForPlay = !1, this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), this.status.video && (this.internal.poster.jq.hide(), this.internal.flash.jq.css({
                width: this.status.width,
                height: this.status.height
            })))
        },
        _flash_volume: function(a) {
            try {
                this._getMovie().fl_volume(a)
            } catch (b) {
                this._flashError(b)
            }
        },
        _flash_mute: function(a) {
            try {
                this._getMovie().fl_mute(a)
            } catch (b) {
                this._flashError(b)
            }
        },
        _getMovie: function() {
            return document[this.internal.flash.id]
        },
        _getFlashPluginVersion: function() {
            var a = 0,
                b;
            if (window.ActiveXObject) try {
                if (b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
                    var c = b.GetVariable("$version");
                    c && (c = c.split(" ")[1].split(","), a = parseInt(c[0], 10) + "." + parseInt(c[1], 10))
                }
            } catch (f) {} else navigator.plugins && 0 < navigator.mimeTypes.length && navigator.plugins["Shockwave Flash"] && (a = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/,
                "$1"));
            return 1 * a
        },
        _checkForFlash: function(a) {
            var b = !1;
            this._getFlashPluginVersion() >= a && (b = !0);
            return b
        },
        _validString: function(a) {
            return a && "string" === typeof a
        },
        _limitValue: function(a, b, c) {
            return a < b ? b : a > c ? c : a
        },
        _urlNotSetError: function(b) {
            this._error({
                type: a.jPlayer.error.URL_NOT_SET,
                context: b,
                message: a.jPlayer.errorMsg.URL_NOT_SET,
                hint: a.jPlayer.errorHint.URL_NOT_SET
            })
        },
        _flashError: function(b) {
            var c;
            c = this.internal.ready ? "FLASH_DISABLED" : "FLASH";
            this._error({
                type: a.jPlayer.error[c],
                context: this.internal.flash.swf,
                message: a.jPlayer.errorMsg[c] + b.message,
                hint: a.jPlayer.errorHint[c]
            });
            this.internal.flash.jq.css({
                width: "1px",
                height: "1px"
            })
        },
        _error: function(b) {
            this._trigger(a.jPlayer.event.error, b);
            this.options.errorAlerts && this._alert("Error!" + (b.message ? "\n\n" + b.message : "") + (b.hint ? "\n\n" + b.hint : "") + "\n\nContext: " + b.context)
        },
        _warning: function(c) {
            this._trigger(a.jPlayer.event.warning, b, c);
            this.options.warningAlerts && this._alert("Warning!" + (c.message ? "\n\n" + c.message : "") + (c.hint ? "\n\n" + c.hint : "") + "\n\nContext: " +
                c.context)
        },
        _alert: function(a) {
            alert("jPlayer " + this.version.script + " : id='" + this.internal.self.id + "' : " + a)
        },
        _emulateHtmlBridge: function() {
            var b = this;
            a.each(a.jPlayer.emulateMethods.split(/\s+/g), function(a, c) {
                b.internal.domNode[c] = function(a) {
                    b[c](a)
                }
            });
            a.each(a.jPlayer.event, function(c, f) {
                var h = !0;
                a.each(a.jPlayer.reservedEvent.split(/\s+/g), function(a, b) {
                    if (b === c) return h = !1
                });
                h && b.element.bind(f + ".jPlayer.jPlayerHtml", function() {
                    b._emulateHtmlUpdate();
                    var a = document.createEvent("Event");
                    a.initEvent(c, !1, !0);
                    b.internal.domNode.dispatchEvent(a)
                })
            })
        },
        _emulateHtmlUpdate: function() {
            var b = this;
            a.each(a.jPlayer.emulateStatus.split(/\s+/g), function(a, c) {
                b.internal.domNode[c] = b.status[c]
            });
            a.each(a.jPlayer.emulateOptions.split(/\s+/g), function(a, c) {
                b.internal.domNode[c] = b.options[c]
            })
        },
        _destroyHtmlBridge: function() {
            var b = this;
            this.element.unbind(".jPlayerHtml");
            a.each((a.jPlayer.emulateMethods + " " + a.jPlayer.emulateStatus + " " + a.jPlayer.emulateOptions).split(/\s+/g), function(a, c) {
                delete b.internal.domNode[c]
            })
        }
    };
    a.jPlayer.error = {
        FLASH: "e_flash",
        FLASH_DISABLED: "e_flash_disabled",
        NO_SOLUTION: "e_no_solution",
        NO_SUPPORT: "e_no_support",
        URL: "e_url",
        URL_NOT_SET: "e_url_not_set",
        VERSION: "e_version"
    };
    a.jPlayer.errorMsg = {
        FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",
        FLASH_DISABLED: "jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ",
        NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",
        NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.",
        URL: "Media URL could not be loaded.",
        URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.",
        VERSION: "jPlayer " + a.jPlayer.prototype.version.script + " needs Jplayer.swf version " + a.jPlayer.prototype.version.needFlash + " but found "
    };
    a.jPlayer.errorHint = {
        FLASH: "Check your swfPath option and that Jplayer.swf is there.",
        FLASH_DISABLED: "Check that you have not display:none; the jPlayer entity or any ancestor.",
        NO_SOLUTION: "Review the jPlayer options: support and supplied.",
        NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
        URL: "Check media URL is valid.",
        URL_NOT_SET: "Use setMedia() to set the media URL.",
        VERSION: "Update jPlayer files."
    };
    a.jPlayer.warning = {
        CSS_SELECTOR_COUNT: "e_css_selector_count",
        CSS_SELECTOR_METHOD: "e_css_selector_method",
        CSS_SELECTOR_STRING: "e_css_selector_string",
        OPTION_KEY: "e_option_key"
    };
    a.jPlayer.warningMsg = {
        CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: ",
        CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
        CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
        OPTION_KEY: "The option requested in jPlayer('option') is undefined."
    };
    a.jPlayer.warningHint = {
        CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
        CSS_SELECTOR_METHOD: "Check your method name.",
        CSS_SELECTOR_STRING: "Check your css selector is a string.",
        OPTION_KEY: "Check your option name."
    }
});
if (void 0 == pcloud) var pcloud = {};
pcloud.android_scroll = {
    get: function(a) {
        var b = {
            is_touch: function() {
                if (navigator.userAgent.match(/android 3/i) || navigator.userAgent.match(/honeycomb/i)) return !1;
                try {
                    return document.createEvent("TouchEvent"), !0
                } catch (a) {
                    return !1
                }
            },
            bindings: [],
            bind: function(a) {
                if (b.is_touch()) {
                    a = $(a);
                    for (var h = 0; h < a.length; h++) b.bindings.push({
                        scrollStartPosY: 0,
                        scrollStartPosX: 0
                    }), $(a[h]).attr("scroll-id", h), a[h].addEventListener("touchstart", function(a) {
                        var c = $(this).attr("scroll-id");
                        b.bindings[c].scrollStartPosY = this.scrollTop +
                            a.touches[0].pageY;
                        b.bindings[c].scrollStartPosX = this.scrollLeft + a.touches[0].pageX
                    }, !1), a[h].addEventListener("touchmove", function(a) {
                        var c = $(this).attr("scroll-id"),
                            g = b.bindings[c].scrollStartPosY,
                            c = b.bindings[c].scrollStartPosX;
                        (this.scrollTop < this.scrollHeight - this.offsetHeight && this.scrollTop + a.touches[0].pageY < g - 5 || 0 != this.scrollTop && this.scrollTop + a.touches[0].pageY > g + 5) && a.preventDefault();
                        (this.scrollLeft < this.scrollWidth - this.offsetWidth && this.scrollLeft + a.touches[0].pageX < c - 5 || 0 != this.scrollLeft &&
                            this.scrollLeft + a.touches[0].pageX > c + 5) && a.preventDefault();
                        this.scrollTop = g - a.touches[0].pageY;
                        this.scrollLeft = c - a.touches[0].pageX
                    }, !1)
                }
            }
        };
        b.bind(a);
        return b
    }
};
pcloud.accordion = {
    get: function(a, b) {
        var c = {
            on_open: [],
            on_close: [],
            opening: !1,
            closing: !1,
            animated: !1,
            full_height: !1,
            container: "",
            key: "id",
            animation_time: 300,
            current: void 0,
            busy: function() {
                return c.opening || c.closing
            },
            opened_height: function(a) {
                if (!c.full_height) {
                    var b = 0;
                    a = $(c.container + " > div[" + c.key + "=" + a + "] > div *");
                    for (var p = 0; p < a.length; p++) b += $(a[p]).outerHeight();
                    return b + 5
                }
                a = $(c.container + " > div > h2");
                b = $(c.container).height();
                for (p = 0; p < a.length; p++) b -= $(a[p]).height();
                return b
            },
            close: function(a,
                b, p) {
                if (0 != $(c.container + " > div[" + c.key + "=" + a + "]").length && (b || (b = !1), !c.busy())) {
                    c.closing = !0;
                    for (var g in c.on_close) c.on_close[g]({
                        tab: c.current
                    });
                    b ? ($(c.container + " > div[" + c.key + "=" + a + "]").removeClass("opened"), $(c.container + " > div[" + c.key + "=" + a + "]").addClass("changing"), $(c.container + " > div[" + c.key + "=" + a + "] > div").animate({
                        height: 0
                    }, c.animation_time, "swing", function() {
                        $(c.container + " > div[" + c.key + "=" + a + "]").removeClass("changing");
                        void 0 == p && (c.current = void 0);
                        c.closing = !1;
                        void 0 != p && p()
                    })) :
                        ($(c.container + " > div[" + c.key + "=" + a + "]").removeClass("opened"), $(c.container + " > div[" + c.key + "=" + a + "] > div").height(0), void 0 == p && (c.current = void 0), c.closing = !1, void 0 != p && p())
                }
            },
            open: function(a, b) {
                if (0 != $(c.container + " > div[" + c.key + "=" + a + "]").length && !c.busy()) {
                    b || (b = !1);
                    c.opening = !0;
                    for (var p in c.on_open) c.on_open[p]({
                        new_tab: a,
                        old_tab: c.current,
                        animated: b
                    });
                    b ? ($(c.container + " > div[" + c.key + "=" + a + "]").addClass("opened changing"), $(c.container + " > div[" + c.key + "=" + a + "] > div").animate({
                            height: c.opened_height(a)
                        },
                        c.animation_time, "swing", function() {
                            $(c.container + " > div[" + c.key + "=" + a + "]").removeClass("changing");
                            c.current = a;
                            c.opening = !1
                        })) : ($(c.container + " > div[" + c.key + "=" + c.current + "]").removeClass("opened"), $(c.container + " > div[" + c.key + "=" + a + "]").addClass("opened"), $(c.container + " > div[" + c.key + "=" + a + "] > div").height(c.opened_height(a)), c.current = a, c.opening = !1)
                }
            },
            change: function(a, b) {
                void 0 == b && (b = c.animated);
                $(c.container + " > div[" + c.key + "=" + a + "]").hasClass("opened") ? c.close(a, b) : void 0 == c.current ?
                    c.open(a, b) : c.close(c.current, b, function() {
                        c.open(a, b)
                    })
            },
            init: function(a, b) {
                b && (b.animated && (c.animated = b.animated), b.key && (c.key = b.key), b.full_height && (c.full_height = b.full_height), b.animation_time && (c.animation_time = b.animation_time));
                c.container = a;
                $(a).addClass("pcloud-accordion");
                $(a + " > div > h2").click(function() {
                    c.change($(this).parent().attr(c.key))
                });
                $(window).off("resize.accordeon").on("resize.accordeon", function() {
                    console.log("resize.accordeon triggered");
                    if ("policies" == $.bbq.getState("page") ||
                        "help" == $.bbq.getState("page")) $(".wv.cnt-mn").length ? $(".wv.cnt-mn").css("height", $(window).outerHeight()) : $(".cnt-mn").css("height", $(window).outerHeight() - 170);
                    c.current && $(c.container + " > div[" + c.key + "=" + c.current + "] > div").height(c.opened_height())
                });
                setTimeout(function() {
                    $(window).trigger("resize")
                }, 100);
                $(a + " > div > div").height(0);
                $(a + " > div > h2").not(".no-button").append('<span class="help-close" ></span><span class="help-open" ></span>')
            }
        };
        c.init(a, b);
        pcloud.android_scroll.get(a + " > div > div");
        return c
    }
};

function combo(a) {
    this.opts = $.extend({}, this.defaultOpts, a);
    console.log(this.opts);
    this.cont = this.init();
    this.appendInput();
    var b = this;
    setTimeout(function() {
        b._prefillVals()
    }, 50)
}
combo.prototype = {
    n: 0,
    defaultOpts: {
        place: -1,
        name: "combo",
        width: "auto",
        minLength: 3,
        sourceKey: "name",
        source: null,
        prefill: [],
        onlySuggested: !1,
        templates: {
            header: "<div></div>",
            footer: "<div></div>",
            suggestion: "default: (name: {{name}}), (id: {{id}})"
        },
        getShowVal: function(a) {
            return a
        },
        validateInput: function(a) {
            return !0
        }
    },
    _uniqNum: function() {
        return "n" + ++this.n
    },
    _prefillVals: function() {
        if (this.opts.prefill.length)
            for (var a = 0, b; a < this.opts.prefill.length; ++a) b = this._getLast(), console.log('input.comboinput[name="' +
                this.opts.name + '"]', b.find('input.comboinput[name="' + this.opts.name + '"]')[0], this.opts.prefill[a]), b.find('input.comboinput[name="' + this.opts.name + '"]').val(this.opts.prefill[a]), this.finishInput(b)
    },
    _calcExtraWidth: function() {
        for (var a = this.cont.width(), b = this.cont.find(".combo-wrap"), c = 0, h = 0; c < b.length; ++c) console.log("curr width", h), console.log("combo", $(b[c])), console.log("combo width", $(b[c]).width()), h + $(b[c]).outerWidth() > a && (h = 0), h += $(b[c]).outerWidth();
        b = a - h - 4;
        150 > b && (b = a);
        return b
    },
    _isFirst: function() {
        return 1 ==
            this.cont.find(".combo-wrap").length
    },
    _getLast: function() {
        var a = this.cont.find(".combo-wrap");
        return $(a[a.length - 1])
    },
    init: function() {
        var a = $('<div class="combo-contain clearfix"></div>').appendTo(this.opts.place);
        a.width("auto" == this.opts.width ? a.width() + 20 : this.opts.width);
        return a
    },
    resizeWrap: function(a) {
        console.log("resizing", a);
        a.hide();
        a.removeClass("combo-wrap");
        var b = this._calcExtraWidth();
        a.addClass("combo-wrap");
        console.log("calculated width", b);
        a.find("input.comboinput").css({
            width: b
        });
        a.show();
        return a
    },
    appendInput: function() {
        var a = this._uniqNum(),
            b = this._calcExtraWidth(),
            c = $('<div class="combo-wrap edit"></div>').addClass(a).appendTo(this.cont),
            a = $('<input type="text" class="comboinput" name="' + this.opts.name + '">').appendTo(c),
            h = $('<div class="combo-res"><span class="text"></span><img src="/img/wclose.png" class="rem"></div>').appendTo(c),
            f = this;
        a.css({
            width: b
        }).on("keydown", function(a) {
            -1 != [9, 13, 188].indexOf(a.keyCode) && this.value.length && a.preventDefault()
        }).on("keyup", function(a) {
            -1 !=
                [9, 13, 188].indexOf(a.keyCode) && this.value.length > f.opts.minLength ? (f.finishInput(c), a.preventDefault(), a.stopPropagation()) : 8 != a.keyCode || 0 != this.value.length || f._isFirst() || ($(this).data("togo") ? (c.remove(), f.activateInput(f.resizeWrap(f._getLast()), !0, !0), $(this).removeData()) : $(this).data("togo", 1));
            this.value.length && $(this).data("togo", 0)
        }).on("focus", function(a) {
            f.cont.addClass("focu")
        }).on("focusout", function(a) {
            f.cont.removeClass("focu")
        }).on("typeahead:autocompleted", function() {
            console.log("autocompleted")
        }).on("typeahead:selected",
            function() {
                f.finishInput(c)
            }).data("togo", 1);
        a.typeahead({
            highlight: !0,
            minLength: 1
        }, {
            name: "sugg",
            displayKey: this.opts.sourceKey,
            source: this.opts.source.ttAdapter(),
            templates: {
                header: Handlebars.compile(this.opts.templates.header),
                footer: Handlebars.compile(this.opts.templates.footer),
                suggestion: Handlebars.compile(this.opts.templates.suggestion)
            }
        });
        a.focus();
        h.find(".rem").on("click", function(a) {
            c.remove();
            a = f._getLast();
            f.resizeWrap(a);
            a.find("input.comboinput").focus()
        })
    },
    activateInput: function(a,
        b, c) {
        a.addClass("edit");
        a.find("input.comboinput").focus();
        b && (console.log("!!!!!!!EMPTY!!!!!!!!!"), a.find("input.comboinput").val(""));
        c && a.find("input.comboinput").data("goto", 1);
        console.log(a.find("input.comboinput"))
    },
    finishInput: function(a) {
        var b = a.find('input.comboinput[name="' + this.opts.name + '"]').val().trim(),
            c = this,
            h = function() {
                a.removeClass("edit");
                a.find(".combo-res span.text").text(c.opts.getShowVal(b)).data("val", b);
                c.appendInput()
            };
        b.length && (this.opts.validateInput(b) ? (console.log("got the v",
            b), this.opts.onlySuggested ? this.opts.source.get(b, function(f) {
            for (var p = 0; p < f.length; ++p) console.log(f[p], c.opts.sourceKey, f[p][c.opts.sourceKey], b), f[p][c.opts.sourceKey] == b && h();
            a.find('input.comboinput[name="' + c.opts.name + '"]').typeahead("val", "")
        }) : h()) : a.find('input.comboinput[name="' + c.opts.name + '"]').typeahead("val", ""))
    },
    getVals: function(a) {
        void 0 == a && (a = !0);
        this.finishInput(this._getLast());
        var b = [];
        this.cont.find(".combo-res span.text").each(function(a, h) {
            $(this).text().length && b.push($(this).data("val"))
        });
        return b
    }
};

function combo2(a) {
    this.opts = $.extend({}, this.defaultOpts, a);
    console.log(this.opts);
    this.init();
    this.appendInput(!0);
    var b = this;
    setTimeout(function() {
        b._prefillVals()
    }, 50)
}
combo2.prototype = {
    n: 0,
    defaultOpts: {
        place: -1,
        name: "combo",
        width: "auto",
        innerWidth: !1,
        minLength: 3,
        sourceKey: "name",
        source: null,
        prefill: [],
        onlySuggested: !1,
        templates: {
            header: "<div></div>",
            footer: "<div></div>",
            suggestion: "default: (name: {{name}}), (id: {{id}})"
        },
        focusOnInit: !0,
        suggestOnFocus: !1,
        imgCloseFile: "/img/wclose.png",
        placeholder: "",
        getShowVal: function(a) {
            return a
        },
        fancyResultBox: function() {},
        onRemoveResultBox: function() {}
    },
    setOpt: function(a, b) {
        void 0 != this.opts[a] && (this.opts[a] = b)
    },
    _uniqNum: function() {
        return "n" +
            ++this.n
    },
    _prefillVals: function() {
        if (this.opts.prefill.length)
            for (var a = 0, b; a < this.opts.prefill.length; ++a) b = this._getLast(), b.find('input.comboinput[name="' + this.opts.name + '"]').val(this.opts.prefill[a]), this.finishInput(b)
    },
    _calcExtraWidth: function() {
        var a = this.opts.innerWidth || this.cont.width(),
            b = this.cont.find(".combo-wrap"),
            c = 0,
            h = 0;
        for (console.log("!! CNT WIDTH", a, this.cont.width(), this.opts.innerWidth); c < b.length; ++c) console.log("curr width", h), console.log("combo", $(b[c])), console.log("combo width",
            $(b[c]).width()), h + $(b[c]).outerWidth() > a && (h = 0), h += $(b[c]).outerWidth();
        b = a - h - 4;
        100 > b && (b = a);
        return b
    },
    _isFirst: function() {
        return 1 == this.cont.find(".combo-wrap").length
    },
    _getLast: function() {
        var a = this.cont.find(".combo-wrap");
        return $(a[a.length - 1])
    },
    init: function() {
        var a = $('<div class="combo-contain clearfix"><div class="combo-contain-inner clearfix"></div></div>').appendTo(this.opts.place);
        this.cont = a.find(".combo-contain-inner");
        this.wrap = a;
        this.wrap.width("auto" == this.opts.width ? a.width() + 20 :
            this.opts.width);
        this.opts.innerWidth && this.cont.width(this.opts.innerWidth)
    },
    resizeWrap: function(a) {
        console.log("resizing", a);
        a.hide();
        a.removeClass("combo-wrap");
        var b = this._calcExtraWidth();
        a.addClass("combo-wrap");
        console.log("calculated width", b);
        a.find("input.comboinput").css({
            width: b
        });
        a.show();
        return a
    },
    removeBeforeLast: function() {
        var a = this.cont.find(".combo-wrap"),
            a = $(a[a.length - 2]);
        this.opts.onRemoveResultBox(a);
        a && a.remove();
        this.onRemove()
    },
    appendInput: function(a) {
        var b = this._uniqNum(),
            c = this._calcExtraWidth(),
            h = $('<div class="combo-wrap edit"></div>').addClass(b).appendTo(this.cont),
            f = $('<input type="text" class="comboinput" name="' + this.opts.name + '">').appendTo(h),
            p = $('<div class="combo-res"><span class="text"></span><img src="' + this.opts.imgCloseFile + '" class="rem"></div>').appendTo(h),
            g = this;
        f.css({
            width: c
        }).on("keydown", function(a) {
            -1 != [9, 13, 188].indexOf(a.keyCode) && this.value.length && a.preventDefault()
        }).on("pctype:selected", function(a, b) {
            b && h.data("data", b);
            g.finishInput(h, !0)
        }).on("keyup", function(a) {
            -1 != [9, 188].indexOf(a.keyCode) && this.value.length > g.opts.minLength ? (a.preventDefault(), a.stopPropagation(), g.finishInput(h)) : 8 != a.keyCode || 0 != this.value.length || g._isFirst() || ($(this).data("togo") ? (g.removeBeforeLast(), g.resizeWrap(g._getLast()), $(this).removeData(), $(document).trigger("click"), setTimeout(function() {
                g._getLast().find("input").focus()
            }, 1)) : $(this).data("togo", 1));
            this.value.length && $(this).data("togo", 0)
        }).on("focus", function(a) {
            g.wrap.addClass("focu")
        }).on("focusout",
            function(a) {
                g.wrap.removeClass("focu")
            }).data("togo", 1);
        b = $.extend({}, this.opts.extraMulticompleteOpts, {
            place: "." + b + " input",
            source: this.opts.source
        });
        a && this.opts.suggestOnFocus && (b.suggestOnInit = !0);
        new multiComplete(b);
        this._isFirst() && f.attr("placeholder", this.opts.placeholder);
        a && !this.opts.focusOnInit || setTimeout(function() {
            f.focus()
        }, 1);
        p.find(".rem").on("click", function(a) {
            h.tooltip("hide");
            g.opts.onRemoveResultBox(h);
            h.remove();
            a = g._getLast();
            g.resizeWrap(a);
            a.find("input.comboinput").focus();
            g.onRemove()
        })
    },
    onRemove: function() {
        this._isFirst() && this._getLast().find("input.comboinput").attr("placeholder", this.opts.placeholder);
        this.resizeWrap(this._getLast())
    },
    activateInput: function(a, b, c) {
        a.addClass("edit");
        a.find("input.comboinput").focus();
        a.data("data", null);
        this.onRemove();
        b && (console.log("!!!!!!!EMPTY!!!!!!!!!"), a.find("input.comboinput").val(""));
        c && a.find("input.comboinput").data("goto", 1);
        console.log(a.find("input.comboinput"))
    },
    finishInput: function(a, b) {
        a.find('input.comboinput[name="' +
            this.opts.name + '"]').val(a.find('input.comboinput[name="' + this.opts.name + '"]').val().trim());
        var c = a.find('input.comboinput[name="' + this.opts.name + '"]').val(),
            h = this,
            f = function() {
                a.removeClass("edit");
                a.find(".combo-res span.text").html("").text(h.opts.getShowVal(c)).data("val", c);
                h.opts.fancyResultBox(a.find(".combo-res span.text"), a.data());
                h.appendInput()
            };
        c.length && a.hasClass("edit") && (a.removeClass("edit"), this.opts.onlySuggested && !b ? this.opts.source.get(c, function(b) {
            b = b[1];
            for (var g = 0; g < b.length; ++g)
                if (console.log(b[g],
                    h.opts.sourceKey, b[g][h.opts.sourceKey], c), b[g][h.opts.sourceKey] == c) {
                    f();
                    return
                }
            a.find('input.comboinput[name="' + h.opts.name + '"]').val("")
        }) : f())
    },
    getVals: function(a) {
        void 0 == a && (a = !0);
        a && this.finishInput(this._getLast());
        var b = [];
        this.cont.find(".combo-res span.text").each(function(a, h) {
            $(this).text().length && b.push($(this).data("val"))
        });
        return b
    },
    getFullVals: function(a) {
        void 0 == a && (a = !0);
        a && this.finishInput(this._getLast());
        var b = [];
        this.cont.find(".combo-wrap").each(function(a, h) {
            $(this).find("span.text").text().length &&
                b.push({
                    val: $(this).find("span.text").data("val"),
                    data: $(this).data("data"),
                    obj: $(this)
                })
        });
        return b
    },
    clearList: function() {
        this.cont.empty();
        this.appendInput(!0)
    },
    fixSize: function() {
        this.resizeWrap(this._getLast())
    }
};
! function(a) {
    var b, c, h, f, p, g, r, s, n, v, w, u, d, e, k = {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1
            },
            isBlankString: function(a) {
                return !a || /^\s*$/.test(a)
            },
            escapeRegExChars: function(a) {
                return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            },
            isString: function(a) {
                return "string" == typeof a
            },
            isNumber: function(a) {
                return "number" == typeof a
            },
            isArray: a.isArray,
            isFunction: a.isFunction,
            isObject: a.isPlainObject,
            isUndefined: function(a) {
                return "undefined" ==
                    typeof a
            },
            bind: a.proxy,
            each: function(b, d) {
                a.each(b, function(a, b) {
                    return d(b, a)
                })
            },
            map: a.map,
            filter: a.grep,
            every: function(b, d) {
                var c = !0;
                return b ? (a.each(b, function(a, e) {
                    return (c = d.call(null, e, a, b)) ? void 0 : !1
                }), !!c) : c
            },
            some: function(b, d) {
                var c = !1;
                return b ? (a.each(b, function(a, e) {
                    return (c = d.call(null, e, a, b)) ? !1 : void 0
                }), !!c) : c
            },
            mixin: a.extend,
            getUniqueId: function() {
                var a = 0;
                return function() {
                    return a++
                }
            }(),
            templatify: function(b) {
                function d() {
                    return String(b)
                }
                return a.isFunction(b) ? b : d
            },
            defer: function(a) {
                setTimeout(a,
                    0)
            },
            debounce: function(a, b, d) {
                var c, e;
                return function() {
                    var f, g, h = this,
                        k = arguments;
                    return f = function() {
                        c = null;
                        d || (e = a.apply(h, k))
                    }, g = d && !c, clearTimeout(c), c = setTimeout(f, b), g && (e = a.apply(h, k)), e
                }
            },
            throttle: function(a, b) {
                var d, c, e, f, g, h;
                return g = 0, h = function() {
                        g = new Date;
                        e = null;
                        f = a.apply(d, c)
                    },
                    function() {
                        var k = new Date,
                            n = b - (k - g);
                        return d = this, c = arguments, 0 >= n ? (clearTimeout(e), e = null, g = k, f = a.apply(d, c)) : e || (e = setTimeout(h, n)), f
                    }
            },
            noop: function() {}
        },
        q = function() {
            function a(b) {
                return b.split(/\s+/)
            }

            function b(a) {
                return a.split(/\W+/)
            }

            function d(a) {
                return function(b) {
                    return function(d) {
                        return a(d[b])
                    }
                }
            }
            return {
                nonword: b,
                whitespace: a,
                obj: {
                    nonword: d(b),
                    whitespace: d(a)
                }
            }
        }(),
        t = function() {
            function a(d) {
                this.maxSize = d || 100;
                this.size = 0;
                this.hash = {};
                this.list = new b
            }

            function b() {
                this.head = this.tail = null
            }

            function d(a, b) {
                this.key = a;
                this.val = b;
                this.prev = this.next = null
            }
            return k.mixin(a.prototype, {
                set: function(a, b) {
                    var c, e = this.list.tail;
                    this.size >= this.maxSize && (this.list.remove(e), delete this.hash[e.key]);
                    (c = this.hash[a]) ? (c.val = b, this.list.moveToFront(c)) :
                        (c = new d(a, b), this.list.add(c), this.hash[a] = c, this.size++)
                },
                get: function(a) {
                    return (a = this.hash[a]) ? (this.list.moveToFront(a), a.val) : void 0
                }
            }), k.mixin(b.prototype, {
                add: function(a) {
                    this.head && (a.next = this.head, this.head.prev = a);
                    this.head = a;
                    this.tail = this.tail || a
                },
                remove: function(a) {
                    a.prev ? a.prev.next = a.next : this.head = a.next;
                    a.next ? a.next.prev = a.prev : this.tail = a.prev
                },
                moveToFront: function(a) {
                    this.remove(a);
                    this.add(a)
                }
            }), a
        }(),
        x = function() {
            function a(b) {
                this.prefix = ["__", b, "__"].join("");
                this.ttlKey =
                    "__ttl__";
                this.keyMatcher = RegExp("^" + this.prefix)
            }

            function b(a) {
                return JSON.stringify(k.isUndefined(a) ? null : a)
            }
            var d, c;
            try {
                d = window.localStorage, d.setItem("~~~", "!"), d.removeItem("~~~")
            } catch (e) {
                d = null
            }
            return c = d && window.JSON ? {
                _prefix: function(a) {
                    return this.prefix + a
                },
                _ttlKey: function(a) {
                    return this._prefix(a) + this.ttlKey
                },
                get: function(a) {
                    this.isExpired(a) && this.remove(a);
                    a = d.getItem(this._prefix(a));
                    return JSON.parse(a)
                },
                set: function(a, c, e) {
                    return k.isNumber(e) ? d.setItem(this._ttlKey(a), b((new Date).getTime() +
                        e)) : d.removeItem(this._ttlKey(a)), d.setItem(this._prefix(a), b(c))
                },
                remove: function(a) {
                    return d.removeItem(this._ttlKey(a)), d.removeItem(this._prefix(a)), this
                },
                clear: function() {
                    var a, b, c = [],
                        e = d.length;
                    for (a = 0; e > a; a++)(b = d.key(a)).match(this.keyMatcher) && c.push(b.replace(this.keyMatcher, ""));
                    for (a = c.length; a--;) this.remove(c[a]);
                    return this
                },
                isExpired: function(a) {
                    a = d.getItem(this._ttlKey(a));
                    a = JSON.parse(a);
                    return k.isNumber(a) && (new Date).getTime() > a ? !0 : !1
                }
            } : {
                get: k.noop,
                set: k.noop,
                remove: k.noop,
                clear: k.noop,
                isExpired: k.noop
            }, k.mixin(a.prototype, c), a
        }(),
        J = function() {
            function b(c) {
                c = c || {};
                this._send = c.transport ? d(c.transport) : a.ajax;
                this._get = c.rateLimiter ? c.rateLimiter(this._get) : this._get
            }

            function d(b) {
                return function(d, c) {
                    var e = a.Deferred();
                    return b(d, c, function(a) {
                        k.defer(function() {
                            e.resolve(a)
                        })
                    }, function(a) {
                        k.defer(function() {
                            e.reject(a)
                        })
                    }), e
                }
            }
            var c = 0,
                e = {},
                f = 6,
                g = new t(10);
            return b.setMaxPendingRequests = function(a) {
                f = a
            }, b.resetCache = function() {
                g = new t(10)
            }, k.mixin(b.prototype, {
                _get: function(a, b,
                    d) {
                    function h(b) {
                        d && d(null, b);
                        g.set(a, b)
                    }

                    function k() {
                        d && d(!0)
                    }

                    function n() {
                        c--;
                        delete e[a];
                        p.onDeckRequestArgs && (p._get.apply(p, p.onDeckRequestArgs), p.onDeckRequestArgs = null)
                    }
                    var q, p = this;
                    (q = e[a]) ? q.done(h).fail(k) : f > c ? (c++, e[a] = this._send(a, b).done(h).fail(k).always(n)) : this.onDeckRequestArgs = [].slice.call(arguments, 0)
                },
                get: function(a, b, d) {
                    var c;
                    return k.isFunction(b) && (d = b, b = {}), (c = g.get(a)) ? k.defer(function() {
                        d && d(null, c)
                    }) : this._get(a, b, d), !!c
                }
            }), b
        }(),
        F = function() {
            function b(d) {
                d = d || {};
                d.datumTokenizer &&
                    d.queryTokenizer || a.error("datumTokenizer and queryTokenizer are both required");
                this.datumTokenizer = d.datumTokenizer;
                this.queryTokenizer = d.queryTokenizer;
                this.reset()
            }

            function d(a) {
                return a = k.filter(a, function(a) {
                    return !!a
                }), a = k.map(a, function(a) {
                    return a.toLowerCase()
                })
            }

            function c(a) {
                for (var b = {}, d = [], e = 0; e < a.length; e++) b[a[e]] || (b[a[e]] = !0, d.push(a[e]));
                return d
            }

            function e(a, b) {
                function d(a, b) {
                    return a - b
                }
                var c = 0,
                    f = 0,
                    g = [];
                a = a.sort(d);
                for (b = b.sort(d); c < a.length && f < b.length;) a[c] < b[f] ? c++ : a[c] > b[f] ?
                    f++ : (g.push(a[c]), c++, f++);
                return g
            }
            return k.mixin(b.prototype, {
                bootstrap: function(a) {
                    this.datums = a.datums;
                    this.trie = a.trie
                },
                add: function(a) {
                    var b = this;
                    a = k.isArray(a) ? a : [a];
                    k.each(a, function(a) {
                        var c;
                        c = b.datums.push(a) - 1;
                        a = d(b.datumTokenizer(a));
                        k.each(a, function(a) {
                            var d, e;
                            d = b.trie;
                            for (a = a.split(""); e = a.shift();) d = d.children[e] || (d.children[e] = {
                                ids: [],
                                children: {}
                            }), d.ids.push(c)
                        })
                    })
                },
                get: function(a) {
                    var b, f, g = this;
                    return b = d(this.queryTokenizer(a)), k.each(b, function(a) {
                        var b, d, c;
                        if (f && 0 === f.length) return !1;
                        b = g.trie;
                        for (a = a.split(""); b && (d = a.shift());) b = b.children[d];
                        return b && 0 === a.length ? (c = b.ids.slice(0), void(f = f ? e(f, c) : c)) : (f = [], !1)
                    }), f ? k.map(c(f), function(a) {
                        return g.datums[a]
                    }) : []
                },
                reset: function() {
                    this.datums = [];
                    this.trie = {
                        ids: [],
                        children: {}
                    }
                },
                serialize: function() {
                    return {
                        datums: this.datums,
                        trie: this.trie
                    }
                }
            }), b
        }(),
        D = function() {
            return {
                local: function(a) {
                    return a.local || null
                },
                prefetch: function(b) {
                    var d, c;
                    return c = {
                        url: null,
                        thumbprint: "",
                        ttl: 864E5,
                        filter: null,
                        ajax: {}
                    }, (d = b.prefetch || null) && (d = k.isString(d) ? {
                        url: d
                    } : d, d = k.mixin(c, d), d.thumbprint = "0.10.2" + d.thumbprint, d.ajax.type = d.ajax.type || "GET", d.ajax.dataType = d.ajax.dataType || "json", !d.url && a.error("prefetch requires url to be set")), d
                },
                remote: function(b) {
                    function d(a) {
                        return function(b) {
                            return k.debounce(b, a)
                        }
                    }

                    function c(a) {
                        return function(b) {
                            return k.throttle(b, a)
                        }
                    }
                    var e, f;
                    return f = {
                        url: null,
                        wildcard: "%QUERY",
                        replace: null,
                        rateLimitBy: "debounce",
                        rateLimitWait: 300,
                        send: null,
                        filter: null,
                        ajax: {}
                    }, (e = b.remote || null) && (e = k.isString(e) ? {
                        url: e
                    } : e, e = k.mixin(f,
                        e), e.rateLimiter = /^throttle$/i.test(e.rateLimitBy) ? c(e.rateLimitWait) : d(e.rateLimitWait), e.ajax.type = e.ajax.type || "GET", e.ajax.dataType = e.ajax.dataType || "json", delete e.rateLimitBy, delete e.rateLimitWait, !e.url && a.error("remote requires url to be set")), e
                }
            }
        }();
    ! function(b) {
        function d(b) {
            b && (b.local || b.prefetch || b.remote) || a.error("one of local, prefetch, or remote is required");
            this.limit = b.limit || 5;
            this.sorter = c(b.sorter);
            this.dupDetector = b.dupDetector || e;
            this.local = D.local(b);
            this.prefetch = D.prefetch(b);
            this.remote = D.remote(b);
            this.cacheKey = this.prefetch ? this.prefetch.cacheKey || this.prefetch.url : null;
            this.index = new F({
                datumTokenizer: b.datumTokenizer,
                queryTokenizer: b.queryTokenizer
            });
            this.storage = this.cacheKey ? new x(this.cacheKey) : null
        }

        function c(a) {
            function b(d) {
                return d.sort(a)
            }

            function d(a) {
                return a
            }
            return k.isFunction(a) ? b : d
        }

        function e() {
            return !1
        }
        var f, g;
        return f = b.Bloodhound, g = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        }, b.Bloodhound = d, d.noConflict = function() {
            return b.Bloodhound =
                f, d
        }, d.tokenizers = q, k.mixin(d.prototype, {
            _loadPrefetch: function(b) {
                function d(a) {
                    f.clear();
                    f.add(b.filter ? b.filter(a) : a);
                    f._saveToStorage(f.index.serialize(), b.thumbprint, b.ttl)
                }
                var c, e, f = this;
                return (c = this._readFromStorage(b.thumbprint)) ? (this.index.bootstrap(c), e = a.Deferred().resolve()) : e = a.ajax(b.url, b.ajax).done(d), e
            },
            _getFromRemote: function(a, b) {
                var d, c, e = this;
                return a = a || "", c = encodeURIComponent(a), d = this.remote.replace ? this.remote.replace(this.remote.url, a) : this.remote.url.replace(this.remote.wildcard,
                    c), this.transport.get(d, this.remote.ajax, function(a, d) {
                    b(a ? [] : e.remote.filter ? e.remote.filter(d) : d)
                })
            },
            _saveToStorage: function(a, b, d) {
                this.storage && (this.storage.set(g.data, a, d), this.storage.set(g.protocol, location.protocol, d), this.storage.set(g.thumbprint, b, d))
            },
            _readFromStorage: function(a) {
                var b, d, c, e;
                return this.storage && (d = this.storage.get(g.data), c = this.storage.get(g.protocol), e = this.storage.get(g.thumbprint)), b = e !== a || c !== location.protocol, d && !b ? d : null
            },
            _initialize: function() {
                function b() {
                    c.add(k.isFunction(e) ?
                        e() : e)
                }
                var d, c = this,
                    e = this.local;
                return d = this.prefetch ? this._loadPrefetch(this.prefetch) : a.Deferred().resolve(), e && d.done(b), this.transport = this.remote ? new J(this.remote) : null, this.initPromise = d.promise()
            },
            initialize: function(a) {
                return !this.initPromise || a ? this._initialize() : this.initPromise
            },
            add: function(a) {
                this.index.add(a)
            },
            get: function(a, b) {
                function d(a) {
                    var f = e.slice(0);
                    k.each(a, function(a) {
                        var b;
                        return b = k.some(f, function(b) {
                            return c.dupDetector(a, b)
                        }), !b && f.push(a), f.length < c.limit
                    });
                    b && b(c.sorter(f))
                }
                var c = this,
                    e = [],
                    f = !1,
                    e = this.index.get(a),
                    e = this.sorter(e).slice(0, this.limit);
                e.length < this.limit && this.transport && (f = this._getFromRemote(a, d));
                f || (0 < e.length || !this.transport) && b && b(e)
            },
            clear: function() {
                this.index.reset()
            },
            clearPrefetchCache: function() {
                this.storage && this.storage.clear()
            },
            clearRemoteCache: function() {
                this.transport && J.resetCache()
            },
            ttAdapter: function() {
                return k.bind(this.get, this)
            }
        }), d
    }(this);
    v = '<span class="twitter-typeahead"></span>';
    w = '<span class="tt-dropdown-menu"></span>';
    u =
        '<div class="tt-dataset-%CLASS%"></div>';
    d = '<span class="tt-suggestions"></span>';
    e = '<div class="tt-suggestion"></div>';
    b = {
        position: "relative",
        display: "inline-block"
    };
    c = {
        position: "absolute",
        top: "0",
        left: "0",
        borderColor: "transparent",
        boxShadow: "none"
    };
    h = {
        position: "relative",
        verticalAlign: "top",
        backgroundColor: "transparent"
    };
    f = {
        position: "relative",
        verticalAlign: "top"
    };
    p = {
        position: "absolute",
        top: "100%",
        left: "0",
        zIndex: "100",
        display: "none"
    };
    g = {
        display: "block"
    };
    r = {
        whiteSpace: "normal"
    };
    s = {
        left: "0",
        right: "auto"
    };
    n = {
        left: "auto",
        right: " 0"
    };
    k.isMsie() && k.mixin(h, {
        backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
    });
    k.isMsie() && 7 >= k.isMsie() && k.mixin(h, {
        marginTop: "-1px"
    });
    var K = function() {
            function b(d) {
                d && d.el || a.error("EventBus initialized without el");
                this.$el = a(d.el)
            }
            return k.mixin(b.prototype, {
                trigger: function(a) {
                    var b = [].slice.call(arguments, 1);
                    this.$el.trigger("typeahead:" + a, b)
                }
            }), b
        }(),
        Y = function() {
            function a(b, e, f, g) {
                if (!f) return this;
                e = e.split(c);
                f =
                    g ? d(f, g) : f;
                for (this._callbacks = this._callbacks || {}; g = e.shift();) this._callbacks[g] = this._callbacks[g] || {
                    sync: [],
                    async: []
                }, this._callbacks[g][b].push(f);
                return this
            }

            function b(a, d, c) {
                return function() {
                    for (var b, e = 0; !b && e < a.length; e += 1) b = !1 === a[e].apply(d, c);
                    return !b
                }
            }

            function d(a, b) {
                return a.bind ? a.bind(b) : function() {
                    a.apply(b, [].slice.call(arguments, 0))
                }
            }
            var c = /\s+/,
                e = function() {
                    return window.setImmediate ? function(a) {
                        setImmediate(function() {
                            a()
                        })
                    } : function(a) {
                        setTimeout(function() {
                            a()
                        }, 0)
                    }
                }();
            return {
                onSync: function(b,
                    d, c) {
                    return a.call(this, "sync", b, d, c)
                },
                onAsync: function(b, d, c) {
                    return a.call(this, "async", b, d, c)
                },
                off: function(a) {
                    var b;
                    if (!this._callbacks) return this;
                    for (a = a.split(c); b = a.shift();) delete this._callbacks[b];
                    return this
                },
                trigger: function(a) {
                    var d, f, g, h, k;
                    if (!this._callbacks) return this;
                    a = a.split(c);
                    for (g = [].slice.call(arguments, 1);
                        (d = a.shift()) && (f = this._callbacks[d]);) h = b(f.sync, this, [d].concat(g)), k = b(f.async, this, [d].concat(g)), h() && e(k);
                    return this
                }
            }
        }(),
        U = function(a) {
            function b(a, d, c) {
                for (var e,
                    f = [], g = 0; g < a.length; g++) f.push(k.escapeRegExChars(a[g]));
                return e = c ? "\\b(" + f.join("|") + ")\\b" : "(" + f.join("|") + ")", d ? RegExp(e) : RegExp(e, "i")
            }
            var d = {
                node: null,
                pattern: null,
                tagName: "strong",
                className: null,
                wordsOnly: !1,
                caseSensitive: !1
            };
            return function(c) {
                function e(b) {
                    var d, f;
                    return (d = g.exec(b.data)) && (wrapperNode = a.createElement(c.tagName), c.className && (wrapperNode.className = c.className), f = b.splitText(d.index), f.splitText(d[0].length), wrapperNode.appendChild(f.cloneNode(!0)), b.parentNode.replaceChild(wrapperNode,
                        f)), !!d
                }

                function f(a, b) {
                    for (var d, c = 0; c < a.childNodes.length; c++) d = a.childNodes[c], 3 === d.nodeType ? c += b(d) ? 1 : 0 : f(d, b)
                }
                var g;
                c = k.mixin({}, d, c);
                c.node && c.pattern && (c.pattern = k.isArray(c.pattern) ? c.pattern : [c.pattern], g = b(c.pattern, c.caseSensitive, c.wordsOnly), f(c.node, e))
            }
        }(window.document),
        O = function() {
            function b(d) {
                var e, f, g, h, n = this;
                d = d || {};
                d.input || a.error("input is missing");
                e = k.bind(this._onBlur, this);
                f = k.bind(this._onFocus, this);
                g = k.bind(this._onKeydown, this);
                h = k.bind(this._onInput, this);
                this.$hint =
                    a(d.hint);
                this.$input = a(d.input).on("blur.tt", e).on("focus.tt", f).on("keydown.tt", g);
                0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = k.noop);
                k.isMsie() ? this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function(a) {
                    c[a.which || a.keyCode] || k.defer(k.bind(n._onInput, n, a))
                }) : this.$input.on("input.tt", h);
                this.query = this.$input.val();
                this.$overflowHelper = a('<pre aria-hidden="true"></pre>').css({
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre",
                    fontFamily: this.$input.css("font-family"),
                    fontSize: this.$input.css("font-size"),
                    fontStyle: this.$input.css("font-style"),
                    fontVariant: this.$input.css("font-variant"),
                    fontWeight: this.$input.css("font-weight"),
                    wordSpacing: this.$input.css("word-spacing"),
                    letterSpacing: this.$input.css("letter-spacing"),
                    textIndent: this.$input.css("text-indent"),
                    textRendering: this.$input.css("text-rendering"),
                    textTransform: this.$input.css("text-transform")
                }).insertAfter(this.$input)
            }

            function d(a) {
                return a.altKey || a.ctrlKey || a.metaKey || a.shiftKey
            }
            var c;
            return c = {
                9: "tab",
                27: "esc",
                37: "left",
                39: "right",
                13: "enter",
                38: "up",
                40: "down"
            }, b.normalizeQuery = function(a) {
                return (a || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ")
            }, k.mixin(b.prototype, Y, {
                _onBlur: function() {
                    this.resetInputValue();
                    this.trigger("blurred")
                },
                _onFocus: function() {
                    this.trigger("focused")
                },
                _onKeydown: function(a) {
                    var b = c[a.which || a.keyCode];
                    this._managePreventDefault(b, a);
                    b && this._shouldTrigger(b, a) && this.trigger(b + "Keyed", a)
                },
                _onInput: function() {
                    this._checkInputValue()
                },
                _managePreventDefault: function(a, b) {
                    var c,
                        e;
                    switch (a) {
                        case "tab":
                            c = this.getHint();
                            e = this.getInputValue();
                            c = c && c !== e && !d(b);
                            break;
                        case "up":
                        case "down":
                            c = !d(b);
                            break;
                        default:
                            c = !1
                    }
                    c && b.preventDefault()
                },
                _shouldTrigger: function(a, b) {
                    var c;
                    switch (a) {
                        case "tab":
                            c = !d(b);
                            break;
                        default:
                            c = !0
                    }
                    return c
                },
                _checkInputValue: function() {
                    var a, d, c;
                    a = this.getInputValue();
                    c = (d = b.normalizeQuery(a) === b.normalizeQuery(this.query)) ? this.query.length !== a.length : !1;
                    d ? c && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query = a)
                },
                focus: function() {
                    this.$input.focus()
                },
                blur: function() {
                    this.$input.blur()
                },
                getQuery: function() {
                    return this.query
                },
                setQuery: function(a) {
                    this.query = a
                },
                getInputValue: function() {
                    return this.$input.val()
                },
                setInputValue: function(a, b) {
                    this.$input.val(a);
                    b ? this.clearHint() : this._checkInputValue()
                },
                resetInputValue: function() {
                    this.setInputValue(this.query, !0)
                },
                getHint: function() {
                    return this.$hint.val()
                },
                setHint: function(a) {
                    this.$hint.val(a)
                },
                clearHint: function() {
                    this.setHint("")
                },
                clearHintIfInvalid: function() {
                    var a, b;
                    a = this.getInputValue();
                    b = this.getHint();
                    b = a !== b && 0 === b.indexOf(a);
                    "" !== a && b && !this.hasOverflow() || this.clearHint()
                },
                getLanguageDirection: function() {
                    return (this.$input.css("direction") || "ltr").toLowerCase()
                },
                hasOverflow: function() {
                    var a = this.$input.width() - 2;
                    return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= a
                },
                isCursorAtEnd: function() {
                    var a, b, d;
                    return a = this.$input.val().length, b = this.$input[0].selectionStart, k.isNumber(b) ? b === a : document.selection ? (d = document.selection.createRange(), d.moveStart("character", -a), a === d.text.length) : !0
                },
                destroy: function() {
                    this.$hint.off(".tt");
                    this.$input.off(".tt");
                    this.$hint = this.$input = this.$overflowHelper = null
                }
            }), b
        }(),
        y = function() {
            function b(d) {
                d = d || {};
                d.templates = d.templates || {};
                d.source || a.error("missing source");
                d.name && !/^[_a-zA-Z0-9-]+$/.test(d.name) && a.error("invalid dataset name: " + d.name);
                this.query = null;
                this.highlight = !!d.highlight;
                this.name = d.name || k.getUniqueId();
                this.source = d.source;
                this.displayFn = c(d.display || d.displayKey);
                this.templates = f(d.templates,
                    this.displayFn);
                this.$el = a(u.replace("%CLASS%", this.name))
            }

            function c(a) {
                function b(d) {
                    return d[a]
                }
                return a = a || "value", k.isFunction(a) ? a : b
            }

            function f(a, b) {
                function d(a) {
                    return "<p>" + b(a) + "</p>"
                }
                return {
                    empty: a.empty && k.templatify(a.empty),
                    header: a.header && k.templatify(a.header),
                    footer: a.footer && k.templatify(a.footer),
                    suggestion: a.suggestion || d
                }
            }
            var h = "ttDataset",
                n = "ttValue",
                q = "ttDatum";
            return b.extractDatasetName = function(b) {
                    return a(b).data(h)
                }, b.extractValue = function(b) {
                    return a(b).data(n)
                }, b.extractDatum =
                function(b) {
                    return a(b).data(q)
                }, k.mixin(b.prototype, Y, {
                    _render: function(b, c) {
                        function f() {
                            var p, u;
                            return p = a(d).css(g), u = k.map(c, function(b) {
                                var d;
                                return d = a(e).append(s.templates.suggestion(b)).data(h, s.name).data(n, s.displayFn(b)).data(q, b), d.children().each(function() {
                                    a(this).css(r)
                                }), d
                            }), p.append.apply(p, u), s.highlight && U({
                                node: p[0],
                                pattern: b
                            }), p
                        }

                        function p() {
                            return s.templates.header({
                                query: b,
                                isEmpty: !t
                            })
                        }

                        function u() {
                            return s.templates.footer({
                                query: b,
                                isEmpty: !t
                            })
                        }
                        if (this.$el) {
                            var t, s = this;
                            this.$el.empty();
                            t = c && c.length;
                            !t && this.templates.empty ? this.$el.html(s.templates.empty({
                                query: b,
                                isEmpty: !0
                            })).prepend(s.templates.header ? p() : null).append(s.templates.footer ? u() : null) : t && this.$el.html(f()).prepend(s.templates.header ? p() : null).append(s.templates.footer ? u() : null);
                            this.trigger("rendered")
                        }
                    },
                    getRoot: function() {
                        return this.$el
                    },
                    update: function(a) {
                        var b = this;
                        this.query = a;
                        this.canceled = !1;
                        this.source(a, function(d) {
                            b.canceled || a !== b.query || b._render(a, d)
                        })
                    },
                    cancel: function() {
                        this.canceled = !0
                    },
                    clear: function() {
                        this.cancel();
                        this.$el.empty();
                        this.trigger("rendered")
                    },
                    isEmpty: function() {
                        return this.$el.is(":empty")
                    },
                    destroy: function() {
                        this.$el = null
                    }
                }), b
        }(),
        I = function() {
            function b(c) {
                var e, f, g, h = this;
                c = c || {};
                c.menu || a.error("menu is required");
                this.isOpen = !1;
                this.isEmpty = !0;
                this.datasets = k.map(c.datasets, d);
                e = k.bind(this._onSuggestionClick, this);
                f = k.bind(this._onSuggestionMouseEnter, this);
                g = k.bind(this._onSuggestionMouseLeave, this);
                this.$menu = a(c.menu).on("click.tt", ".tt-suggestion", e).on("mouseenter.tt",
                    ".tt-suggestion", f).on("mouseleave.tt", ".tt-suggestion", g);
                k.each(this.datasets, function(a) {
                    h.$menu.append(a.getRoot());
                    a.onSync("rendered", h._onRendered, h)
                })
            }

            function d(a) {
                return new y(a)
            }
            return k.mixin(b.prototype, Y, {
                    _onSuggestionClick: function(b) {
                        this.trigger("suggestionClicked", a(b.currentTarget))
                    },
                    _onSuggestionMouseEnter: function(b) {
                        this._removeCursor();
                        this._setCursor(a(b.currentTarget), !0)
                    },
                    _onSuggestionMouseLeave: function() {
                        this._removeCursor()
                    },
                    _onRendered: function() {
                        (this.isEmpty = k.every(this.datasets,
                            function(a) {
                                return a.isEmpty()
                            })) ? this._hide() : this.isOpen && this._show();
                        this.trigger("datasetRendered")
                    },
                    _hide: function() {
                        this.$menu.hide()
                    },
                    _show: function() {
                        this.$menu.css("display", "block")
                    },
                    _getSuggestions: function() {
                        return this.$menu.find(".tt-suggestion")
                    },
                    _getCursor: function() {
                        return this.$menu.find(".tt-cursor").first()
                    },
                    _setCursor: function(a, b) {
                        a.first().addClass("tt-cursor");
                        !b && this.trigger("cursorMoved")
                    },
                    _removeCursor: function() {
                        this._getCursor().removeClass("tt-cursor")
                    },
                    _moveCursor: function(a) {
                        var b,
                            d, c;
                        if (this.isOpen) {
                            if (d = this._getCursor(), b = this._getSuggestions(), this._removeCursor(), c = b.index(d) + a, c = (c + 1) % (b.length + 1) - 1, -1 === c) return void this.trigger("cursorRemoved"); - 1 > c && (c = b.length - 1);
                            this._setCursor(a = b.eq(c));
                            this._ensureVisible(a)
                        }
                    },
                    _ensureVisible: function(a) {
                        var b, d, c;
                        b = a.position().top;
                        a = b + a.outerHeight(!0);
                        d = this.$menu.scrollTop();
                        c = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10);
                        0 > b ? this.$menu.scrollTop(d + b) : a > c && this.$menu.scrollTop(d +
                            (a - c))
                    },
                    close: function() {
                        this.isOpen && (this.isOpen = !1, this._removeCursor(), this._hide(), this.trigger("closed"))
                    },
                    open: function() {
                        this.isOpen || (this.isOpen = !0, !this.isEmpty && this._show(), this.trigger("opened"))
                    },
                    setLanguageDirection: function(a) {
                        this.$menu.css("ltr" === a ? s : n)
                    },
                    moveCursorUp: function() {
                        this._moveCursor(-1)
                    },
                    moveCursorDown: function() {
                        this._moveCursor(1)
                    },
                    getDatumForSuggestion: function(a) {
                        var b = null;
                        return a.length && (b = {
                                raw: y.extractDatum(a),
                                value: y.extractValue(a),
                                datasetName: y.extractDatasetName(a)
                            }),
                            b
                    },
                    getDatumForCursor: function() {
                        return this.getDatumForSuggestion(this._getCursor().first())
                    },
                    getDatumForTopSuggestion: function() {
                        return this.getDatumForSuggestion(this._getSuggestions().first())
                    },
                    update: function(a) {
                        k.each(this.datasets, function(b) {
                            b.update(a)
                        })
                    },
                    empty: function() {
                        k.each(this.datasets, function(a) {
                            a.clear()
                        });
                        this.isEmpty = !0
                    },
                    isVisible: function() {
                        return this.isOpen && !this.isEmpty
                    },
                    destroy: function() {
                        this.$menu.off(".tt");
                        this.$menu = null;
                        k.each(this.datasets, function(a) {
                            a.destroy()
                        })
                    }
                }),
                b
        }(),
        C = function() {
            function d(b) {
                var c, f, g;
                b = b || {};
                b.input || a.error("missing input");
                this.isActivated = !1;
                this.autoselect = !!b.autoselect;
                this.minLength = k.isNumber(b.minLength) ? b.minLength : 1;
                this.$node = e(b.input, b.withHint);
                c = this.$node.find(".tt-dropdown-menu");
                f = this.$node.find(".tt-input");
                g = this.$node.find(".tt-hint");
                f.on("blur.tt", function(a) {
                    var b, d;
                    b = document.activeElement;
                    d = c.is(b);
                    b = 0 < c.has(b).length;
                    k.isMsie() && (d || b) && (a.preventDefault(), a.stopImmediatePropagation(), k.defer(function() {
                        f.focus()
                    }))
                });
                c.on("mousedown.tt", function(a) {
                    a.preventDefault()
                });
                this.eventBus = b.eventBus || new K({
                    el: f
                });
                this.dropdown = (new I({
                    menu: c,
                    datasets: b.datasets
                })).onSync("suggestionClicked", this._onSuggestionClicked, this).onSync("cursorMoved", this._onCursorMoved, this).onSync("cursorRemoved", this._onCursorRemoved, this).onSync("opened", this._onOpened, this).onSync("closed", this._onClosed, this).onAsync("datasetRendered", this._onDatasetRendered, this);
                this.input = (new O({
                    input: f,
                    hint: g
                })).onSync("focused", this._onFocused,
                    this).onSync("blurred", this._onBlurred, this).onSync("enterKeyed", this._onEnterKeyed, this).onSync("tabKeyed", this._onTabKeyed, this).onSync("escKeyed", this._onEscKeyed, this).onSync("upKeyed", this._onUpKeyed, this).onSync("downKeyed", this._onDownKeyed, this).onSync("leftKeyed", this._onLeftKeyed, this).onSync("rightKeyed", this._onRightKeyed, this).onSync("queryChanged", this._onQueryChanged, this).onSync("whitespaceChanged", this._onWhitespaceChanged, this);
                this._setLanguageDirection()
            }

            function e(d, g) {
                var k,
                    q, r, u;
                k = a(d);
                q = a(v).css(b);
                r = a(w).css(p);
                u = k.clone().css(c).css({
                    backgroundAttachment: k.css("background-attachment"),
                    backgroundClip: k.css("background-clip"),
                    backgroundColor: k.css("background-color"),
                    backgroundImage: k.css("background-image"),
                    backgroundOrigin: k.css("background-origin"),
                    backgroundPosition: k.css("background-position"),
                    backgroundRepeat: k.css("background-repeat"),
                    backgroundSize: k.css("background-size")
                });
                u.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder").prop("disabled", !0).attr({
                    autocomplete: "off",
                    spellcheck: "false"
                });
                k.data(n, {
                    dir: k.attr("dir"),
                    autocomplete: k.attr("autocomplete"),
                    spellcheck: k.attr("spellcheck"),
                    style: k.attr("style")
                });
                k.addClass("tt-input").attr({
                    autocomplete: "off",
                    spellcheck: !1
                }).css(g ? h : f);
                try {
                    !k.attr("dir") && k.attr("dir", "auto")
                } catch (t) {}
                return k.wrap(q).parent().prepend(g ? u : null).append(r)
            }

            function g(a) {
                var b = a.find(".tt-input");
                k.each(b.data(n), function(a, d) {
                    k.isUndefined(a) ? b.removeAttr(d) : b.attr(d, a)
                });
                b.detach().removeData(n).removeClass("tt-input").insertAfter(a);
                a.remove()
            }
            var n = "ttAttrs";
            return k.mixin(d.prototype, {
                _onSuggestionClicked: function(a, b) {
                    var d;
                    (d = this.dropdown.getDatumForSuggestion(b)) && this._select(d)
                },
                _onCursorMoved: function() {
                    var a = this.dropdown.getDatumForCursor();
                    this.input.setInputValue(a.value, !0);
                    this.eventBus.trigger("cursorchanged", a.raw, a.datasetName)
                },
                _onCursorRemoved: function() {
                    this.input.resetInputValue();
                    this._updateHint()
                },
                _onDatasetRendered: function() {
                    this._updateHint()
                },
                _onOpened: function() {
                    this._updateHint();
                    this.eventBus.trigger("opened")
                },
                _onClosed: function() {
                    this.input.clearHint();
                    this.eventBus.trigger("closed")
                },
                _onFocused: function() {
                    this.isActivated = !0;
                    this.dropdown.open()
                },
                _onBlurred: function() {
                    this.isActivated = !1;
                    this.dropdown.empty();
                    this.dropdown.close()
                },
                _onEnterKeyed: function(a, b) {
                    var d, c;
                    d = this.dropdown.getDatumForCursor();
                    c = this.dropdown.getDatumForTopSuggestion();
                    d ? (this._select(d), b.preventDefault()) : this.autoselect && c && (this._select(c), b.preventDefault())
                },
                _onTabKeyed: function(a, b) {
                    var d;
                    (d = this.dropdown.getDatumForCursor()) ?
                        (this._select(d), b.preventDefault()) : this._autocomplete(!0)
                },
                _onEscKeyed: function() {
                    this.dropdown.close();
                    this.input.resetInputValue()
                },
                _onUpKeyed: function() {
                    var a = this.input.getQuery();
                    this.dropdown.isEmpty && a.length >= this.minLength ? this.dropdown.update(a) : this.dropdown.moveCursorUp();
                    this.dropdown.open()
                },
                _onDownKeyed: function() {
                    var a = this.input.getQuery();
                    this.dropdown.isEmpty && a.length >= this.minLength ? this.dropdown.update(a) : this.dropdown.moveCursorDown();
                    this.dropdown.open()
                },
                _onLeftKeyed: function() {
                    "rtl" ===
                        this.dir && this._autocomplete()
                },
                _onRightKeyed: function() {
                    "ltr" === this.dir && this._autocomplete()
                },
                _onQueryChanged: function(a, b) {
                    this.input.clearHintIfInvalid();
                    b.length >= this.minLength ? this.dropdown.update(b) : this.dropdown.empty();
                    this.dropdown.open();
                    this._setLanguageDirection()
                },
                _onWhitespaceChanged: function() {
                    this._updateHint();
                    this.dropdown.open()
                },
                _setLanguageDirection: function() {
                    var a;
                    this.dir !== (a = this.input.getLanguageDirection()) && (this.dir = a, this.$node.css("direction", a), this.dropdown.setLanguageDirection(a))
                },
                _updateHint: function() {
                    var a, b, d, c, e, f;
                    (a = this.dropdown.getDatumForTopSuggestion()) && this.dropdown.isVisible() && !this.input.hasOverflow() ? (b = this.input.getInputValue(), d = O.normalizeQuery(b), c = k.escapeRegExChars(d), e = RegExp("^(?:" + c + ")(.+$)", "i"), f = e.exec(a.value), f ? this.input.setHint(b + f[1]) : this.input.clearHint()) : this.input.clearHint()
                },
                _autocomplete: function(a) {
                    var b, d, c;
                    b = this.input.getHint();
                    d = this.input.getQuery();
                    a = a || this.input.isCursorAtEnd();
                    b && d !== b && a && (c = this.dropdown.getDatumForTopSuggestion(),
                        c && this.input.setInputValue(c.value), this.eventBus.trigger("autocompleted", c.raw, c.datasetName))
                },
                _select: function(a) {
                    this.input.setQuery(a.value);
                    this.input.setInputValue(a.value, !0);
                    this._setLanguageDirection();
                    this.eventBus.trigger("selected", a.raw, a.datasetName);
                    this.dropdown.close();
                    k.defer(k.bind(this.dropdown.empty, this.dropdown))
                },
                open: function() {
                    this.dropdown.open()
                },
                close: function() {
                    this.dropdown.close()
                },
                setVal: function(a) {
                    this.isActivated ? this.input.setInputValue(a) : (this.input.setQuery(a),
                        this.input.setInputValue(a, !0));
                    this._setLanguageDirection()
                },
                getVal: function() {
                    return this.input.getQuery()
                },
                destroy: function() {
                    this.input.destroy();
                    this.dropdown.destroy();
                    g(this.$node);
                    this.$node = null
                }
            }), d
        }();
    ! function() {
        var b, d, c;
        b = a.fn.typeahead;
        d = "ttTypeahead";
        c = {
            initialize: function(b, c) {
                return c = k.isArray(c) ? c : [].slice.call(arguments, 1), b = b || {}, this.each(function() {
                    var e, f = a(this);
                    k.each(c, function(a) {
                        a.highlight = !!b.highlight
                    });
                    e = new C({
                        input: f,
                        eventBus: new K({
                            el: f
                        }),
                        withHint: k.isUndefined(b.hint) ?
                            !0 : !!b.hint,
                        minLength: b.minLength,
                        autoselect: b.autoselect,
                        datasets: c
                    });
                    f.data(d, e)
                })
            },
            open: function() {
                return this.each(function() {
                    var b;
                    (b = a(this).data(d)) && b.open()
                })
            },
            close: function() {
                return this.each(function() {
                    var b;
                    (b = a(this).data(d)) && b.close()
                })
            },
            val: function(b) {
                function c() {
                    var e;
                    (e = a(this).data(d)) && e.setVal(b)
                }

                function e(a) {
                    var b, c;
                    return (b = a.data(d)) && (c = b.getVal()), c
                }
                return arguments.length ? this.each(c) : e(this.first())
            },
            destroy: function() {
                return this.each(function() {
                    var b, c = a(this);
                    (b =
                        c.data(d)) && (b.destroy(), c.removeData(d))
                })
            }
        };
        a.fn.typeahead = function(a) {
            return c[a] ? c[a].apply(this, [].slice.call(arguments, 1)) : c.initialize.apply(this, arguments)
        };
        a.fn.typeahead.noConflict = function() {
            return a.fn.typeahead = b, this
        }
    }()
}(window.jQuery);
var Handlebars = function() {
    var a = function() {
            function a(b) {
                this.string = b
            }
            a.prototype.toString = function() {
                return "" + this.string
            };
            return a
        }(),
        b = function(a) {
            function b(a) {
                return f[a] || "&amp;"
            }
            var c = {},
                f = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                },
                h = /[&<>"'`]/g,
                v = /[&<>"'`]/;
            c.extend = function(a, b) {
                for (var d in b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d])
            };
            var w = Object.prototype.toString;
            c.toString = w;
            var u = function(a) {
                return "function" === typeof a
            };
            u(/x/) && (u = function(a) {
                return "function" ===
                    typeof a && "[object Function]" === w.call(a)
            });
            c.isFunction = u;
            var d = Array.isArray || function(a) {
                return a && "object" === typeof a ? "[object Array]" === w.call(a) : !1
            };
            c.isArray = d;
            c.escapeExpression = function(d) {
                if (d instanceof a) return d.toString();
                if (!d && 0 !== d) return "";
                d = "" + d;
                return v.test(d) ? d.replace(h, b) : d
            };
            c.isEmpty = function(a) {
                return a || 0 === a ? d(a) && 0 === a.length ? !0 : !1 : !0
            };
            return c
        }(a),
        c = function() {
            function a() {
                for (var c = Error.prototype.constructor.apply(this, arguments), f = 0; f < b.length; f++) this[b[f]] = c[b[f]]
            }
            var b = "description fileName lineNumber message name number stack".split(" ");
            a.prototype = Error();
            return a
        }(),
        h = function(a, b) {
            function c(a, b) {
                this.helpers = a || {};
                this.partials = b || {};
                f(this)
            }

            function f(a) {
                a.registerHelper("helperMissing", function(a) {
                    if (2 !== arguments.length) throw Error("Missing helper: '" + a + "'");
                });
                a.registerHelper("blockHelperMissing", function(b, c) {
                    var e = c.inverse || function() {},
                        f = c.fn;
                    d(b) && (b = b.call(this));
                    return !0 === b ? f(this) : !1 === b || null == b ? e(this) : u(b) ? 0 < b.length ? a.helpers.each(b,
                        c) : e(this) : f(b)
                });
                a.registerHelper("each", function(a, b) {
                    var c = b.fn,
                        e = b.inverse,
                        f = 0,
                        g = "",
                        h;
                    d(a) && (a = a.call(this));
                    b.data && (h = q(b.data));
                    if (a && "object" === typeof a)
                        if (u(a))
                            for (var k = a.length; f < k; f++) h && (h.index = f, h.first = 0 === f, h.last = f === a.length - 1), g += c(a[f], {
                                data: h
                            });
                        else
                            for (k in a) a.hasOwnProperty(k) && (h && (h.key = k, h.index = f, h.first = 0 === f), g += c(a[k], {
                                data: h
                            }), f++);
                    0 === f && (g = e(this));
                    return g
                });
                a.registerHelper("if", function(a, b) {
                    d(a) && (a = a.call(this));
                    return !b.hash.includeZero && !a || w.isEmpty(a) ? b.inverse(this) :
                        b.fn(this)
                });
                a.registerHelper("unless", function(b, d) {
                    return a.helpers["if"].call(this, b, {
                        fn: d.inverse,
                        inverse: d.fn,
                        hash: d.hash
                    })
                });
                a.registerHelper("with", function(a, b) {
                    d(a) && (a = a.call(this));
                    if (!w.isEmpty(a)) return b.fn(a)
                });
                a.registerHelper("log", function(b, d) {
                    var c = d.data && null != d.data.level ? parseInt(d.data.level, 10) : 1;
                    a.log(c, b)
                })
            }

            function h(a, b) {
                k.log(a, b)
            }
            var v = {},
                w = a;
            v.VERSION = "1.2.0";
            v.COMPILER_REVISION = 4;
            v.REVISION_CHANGES = {
                1: "<= 1.0.rc.2",
                2: "== 1.0.0-rc.3",
                3: "== 1.0.0-rc.4",
                4: ">= 1.0.0"
            };
            var u = w.isArray,
                d = w.isFunction,
                e = w.toString;
            v.HandlebarsEnvironment = c;
            c.prototype = {
                constructor: c,
                logger: k,
                log: h,
                registerHelper: function(a, d, c) {
                    if ("[object Object]" === e.call(a)) {
                        if (c || d) throw new b("Arg not supported with multiple helpers");
                        w.extend(this.helpers, a)
                    } else c && (d.not = c), this.helpers[a] = d
                },
                registerPartial: function(a, b) {
                    "[object Object]" === e.call(a) ? w.extend(this.partials, a) : this.partials[a] = b
                }
            };
            var k = {
                methodMap: {
                    0: "debug",
                    1: "info",
                    2: "warn",
                    3: "error"
                },
                DEBUG: 0,
                INFO: 1,
                WARN: 2,
                ERROR: 3,
                level: 3,
                log: function(a, b) {
                    if (k.level <= a) {
                        var d = k.methodMap[a];
                        "undefined" !== typeof console && console[d] && console[d].call(console, b)
                    }
                }
            };
            v.logger = k;
            v.log = h;
            var q = function(a) {
                var b = {};
                w.extend(b, a);
                return b
            };
            v.createFrame = q;
            return v
        }(b, c),
        f = function(a, b, c) {
            function f(a, b, c) {
                var g = function(a, f) {
                    f = f || {};
                    return b(a, f.data || c)
                };
                g.program = a;
                g.depth = 0;
                return g
            }
            var h = {},
                v = c.COMPILER_REVISION,
                w = c.REVISION_CHANGES;
            h.checkRevision = function(a) {
                var b = a && a[0] || 1;
                if (b !== v) {
                    if (b < v) throw Error("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" +
                        w[v] + ") or downgrade your runtime to an older version (" + w[b] + ").");
                    throw Error("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + a[1] + ").");
                }
            };
            h.template = function(c, d) {
                if (!d) throw Error("No environment passed to template");
                var e = {
                    escapeExpression: a.escapeExpression,
                    invokePartial: function(a, c, e, f, h, n) {
                        var p = d.VM.invokePartial.apply(this, arguments);
                        if (null != p) return p;
                        if (d.compile) return p = {
                                helpers: f,
                                partials: h,
                                data: n
                            },
                            h[c] = d.compile(a, {
                                data: void 0 !== n
                            }, d), h[c](e, p);
                        throw new b("The partial " + c + " could not be compiled when running in runtime-only mode");
                    },
                    programs: [],
                    program: function(a, b, d) {
                        var c = this.programs[a];
                        d ? c = f(a, b, d) : c || (c = this.programs[a] = f(a, b));
                        return c
                    },
                    merge: function(b, d) {
                        var c = b || d;
                        b && d && b !== d && (c = {}, a.extend(c, d), a.extend(c, b));
                        return c
                    },
                    programWithDepth: d.VM.programWithDepth,
                    noop: d.VM.noop,
                    compilerInfo: null
                };
                return function(a, b) {
                    b = b || {};
                    var f = b.partial ? b : d,
                        g, h;
                    b.partial || (g = b.helpers, h = b.partials);
                    f = c.call(e, f, a, g, h, b.data);
                    b.partial || d.VM.checkRevision(e.compilerInfo);
                    return f
                }
            };
            h.programWithDepth = function(a, b, c) {
                var f = Array.prototype.slice.call(arguments, 3),
                    g = function(a, g) {
                        g = g || {};
                        return b.apply(this, [a, g.data || c].concat(f))
                    };
                g.program = a;
                g.depth = f.length;
                return g
            };
            h.program = f;
            h.invokePartial = function(a, d, c, f, h, n) {
                f = {
                    partial: !0,
                    helpers: f,
                    partials: h,
                    data: n
                };
                if (void 0 === a) throw new b("The partial " + d + " could not be found");
                if (a instanceof Function) return a(c, f)
            };
            h.noop = function() {
                return ""
            };
            return h
        }(b, c, h),
        a = function(a, b, c, f, h) {
            var v = function() {
                    var u = new a.HandlebarsEnvironment;
                    f.extend(u, a);
                    u.SafeString = b;
                    u.Exception = c;
                    u.Utils = f;
                    u.VM = h;
                    u.template = function(a) {
                        return h.template(a, u)
                    };
                    return u
                },
                w = v();
            w.create = v;
            return w
        }(h, a, c, b, f),
        b = function(a) {
            var b = {
                ProgramNode: function(a, c, f) {
                    this.type = "program";
                    this.statements = a;
                    this.strip = {};
                    f ? (this.inverse = new b.ProgramNode(f, c), this.strip.right = c.left) : c && (this.strip.left = c.right)
                },
                MustacheNode: function(a, b, c, f) {
                    this.type = "mustache";
                    this.hash =
                        b;
                    this.strip = f;
                    null != c && c.charAt ? (c = c.charAt(3) || c.charAt(2), this.escaped = "{" !== c && "&" !== c) : this.escaped = !!c;
                    c = this.id = a[0];
                    a = this.params = a.slice(1);
                    this.isHelper = (this.eligibleHelper = c.isSimple) && (a.length || b)
                },
                PartialNode: function(a, b, c) {
                    this.type = "partial";
                    this.partialName = a;
                    this.context = b;
                    this.strip = c
                },
                BlockNode: function(b, c, f, g) {
                    if (b.id.original !== g.path.original) throw new a(b.id.original + " doesn't match " + g.path.original);
                    this.type = "block";
                    this.mustache = b;
                    this.program = c;
                    this.inverse = f;
                    this.strip = {
                        left: b.strip.left,
                        right: g.strip.right
                    };
                    (c || f).strip.left = b.strip.right;
                    (f || c).strip.right = g.strip.left;
                    f && !c && (this.isInverse = !0)
                },
                ContentNode: function(a) {
                    this.type = "content";
                    this.string = a
                },
                HashNode: function(a) {
                    this.type = "hash";
                    this.pairs = a
                },
                IdNode: function(b) {
                    this.type = "ID";
                    for (var c = "", f = [], g = 0, h = 0, u = b.length; h < u; h++) {
                        var d = b[h].part,
                            c = c + ((b[h].separator || "") + d);
                        if (".." === d || "." === d || "this" === d) {
                            if (0 < f.length) throw new a("Invalid path: " + c);
                            ".." === d ? g++ : this.isScoped = !0
                        } else f.push(d)
                    }
                    this.original =
                        c;
                    this.parts = f;
                    this.string = f.join(".");
                    this.depth = g;
                    this.isSimple = 1 === b.length && !this.isScoped && 0 === g;
                    this.stringModeValue = this.string
                },
                PartialNameNode: function(a) {
                    this.type = "PARTIAL_NAME";
                    this.name = a.original
                },
                DataNode: function(a) {
                    this.type = "DATA";
                    this.id = a
                },
                StringNode: function(a) {
                    this.type = "STRING";
                    this.original = this.string = this.stringModeValue = a
                },
                IntegerNode: function(a) {
                    this.type = "INTEGER";
                    this.original = this.integer = a;
                    this.stringModeValue = Number(a)
                },
                BooleanNode: function(a) {
                    this.type = "BOOLEAN";
                    this.bool = a;
                    this.stringModeValue = "true" === a
                },
                CommentNode: function(a) {
                    this.type = "comment";
                    this.comment = a
                }
            };
            return b
        }(c),
        f = function(a, b) {
            var c = {};
            c.parser = a;
            c.parse = function(c) {
                if (c.constructor === b.ProgramNode) return c;
                a.yy = b;
                return a.parse(c)
            };
            return c
        }(function() {
            return function() {
                function a(b, c) {
                    return {
                        left: "~" === b.charAt(2),
                        right: "~" === c.charAt(0) || "~" === c.charAt(1)
                    }
                }

                function b() {
                    this.yy = {}
                }
                var c = {
                        trace: function() {},
                        yy: {},
                        symbols_: {
                            error: 2,
                            root: 3,
                            statements: 4,
                            EOF: 5,
                            program: 6,
                            simpleInverse: 7,
                            statement: 8,
                            openInverse: 9,
                            closeBlock: 10,
                            openBlock: 11,
                            mustache: 12,
                            partial: 13,
                            CONTENT: 14,
                            COMMENT: 15,
                            OPEN_BLOCK: 16,
                            inMustache: 17,
                            CLOSE: 18,
                            OPEN_INVERSE: 19,
                            OPEN_ENDBLOCK: 20,
                            path: 21,
                            OPEN: 22,
                            OPEN_UNESCAPED: 23,
                            CLOSE_UNESCAPED: 24,
                            OPEN_PARTIAL: 25,
                            partialName: 26,
                            partial_option0: 27,
                            inMustache_repetition0: 28,
                            inMustache_option0: 29,
                            dataName: 30,
                            param: 31,
                            STRING: 32,
                            INTEGER: 33,
                            BOOLEAN: 34,
                            hash: 35,
                            hash_repetition_plus0: 36,
                            hashSegment: 37,
                            ID: 38,
                            EQUALS: 39,
                            DATA: 40,
                            pathSegments: 41,
                            SEP: 42,
                            $accept: 0,
                            $end: 1
                        },
                        terminals_: {
                            2: "error",
                            5: "EOF",
                            14: "CONTENT",
                            15: "COMMENT",
                            16: "OPEN_BLOCK",
                            18: "CLOSE",
                            19: "OPEN_INVERSE",
                            20: "OPEN_ENDBLOCK",
                            22: "OPEN",
                            23: "OPEN_UNESCAPED",
                            24: "CLOSE_UNESCAPED",
                            25: "OPEN_PARTIAL",
                            32: "STRING",
                            33: "INTEGER",
                            34: "BOOLEAN",
                            38: "ID",
                            39: "EQUALS",
                            40: "DATA",
                            42: "SEP"
                        },
                        productions_: [0, [3, 2],
                            [3, 1],
                            [6, 2],
                            [6, 3],
                            [6, 2],
                            [6, 1],
                            [6, 1],
                            [6, 0],
                            [4, 1],
                            [4, 2],
                            [8, 3],
                            [8, 3],
                            [8, 1],
                            [8, 1],
                            [8, 1],
                            [8, 1],
                            [11, 3],
                            [9, 3],
                            [10, 3],
                            [12, 3],
                            [12, 3],
                            [13, 4],
                            [7, 2],
                            [17, 3],
                            [17, 1],
                            [31, 1],
                            [31, 1],
                            [31, 1],
                            [31, 1],
                            [31, 1],
                            [35, 1],
                            [37, 3],
                            [26, 1],
                            [26, 1],
                            [26, 1],
                            [30, 2],
                            [21, 1],
                            [41, 3],
                            [41, 1],
                            [27, 0],
                            [27, 1],
                            [28, 0],
                            [28, 2],
                            [29, 0],
                            [29, 1],
                            [36, 1],
                            [36, 2]
                        ],
                        performAction: function(b, c, f, g, d, e, h) {
                            b = e.length - 1;
                            switch (d) {
                                case 1:
                                    return new g.ProgramNode(e[b - 1]);
                                case 2:
                                    return new g.ProgramNode([]);
                                case 3:
                                    this.$ = new g.ProgramNode([], e[b - 1], e[b]);
                                    break;
                                case 4:
                                    this.$ = new g.ProgramNode(e[b - 2], e[b - 1], e[b]);
                                    break;
                                case 5:
                                    this.$ = new g.ProgramNode(e[b - 1], e[b], []);
                                    break;
                                case 6:
                                    this.$ = new g.ProgramNode(e[b]);
                                    break;
                                case 7:
                                    this.$ = new g.ProgramNode([]);
                                    break;
                                case 8:
                                    this.$ = new g.ProgramNode([]);
                                    break;
                                case 9:
                                    this.$ =
                                        [e[b]];
                                    break;
                                case 10:
                                    e[b - 1].push(e[b]);
                                    this.$ = e[b - 1];
                                    break;
                                case 11:
                                    this.$ = new g.BlockNode(e[b - 2], e[b - 1].inverse, e[b - 1], e[b]);
                                    break;
                                case 12:
                                    this.$ = new g.BlockNode(e[b - 2], e[b - 1], e[b - 1].inverse, e[b]);
                                    break;
                                case 13:
                                    this.$ = e[b];
                                    break;
                                case 14:
                                    this.$ = e[b];
                                    break;
                                case 15:
                                    this.$ = new g.ContentNode(e[b]);
                                    break;
                                case 16:
                                    this.$ = new g.CommentNode(e[b]);
                                    break;
                                case 17:
                                    this.$ = new g.MustacheNode(e[b - 1][0], e[b - 1][1], e[b - 2], a(e[b - 2], e[b]));
                                    break;
                                case 18:
                                    this.$ = new g.MustacheNode(e[b - 1][0], e[b - 1][1], e[b - 2], a(e[b - 2], e[b]));
                                    break;
                                case 19:
                                    this.$ = {
                                        path: e[b - 1],
                                        strip: a(e[b - 2], e[b])
                                    };
                                    break;
                                case 20:
                                    this.$ = new g.MustacheNode(e[b - 1][0], e[b - 1][1], e[b - 2], a(e[b - 2], e[b]));
                                    break;
                                case 21:
                                    this.$ = new g.MustacheNode(e[b - 1][0], e[b - 1][1], e[b - 2], a(e[b - 2], e[b]));
                                    break;
                                case 22:
                                    this.$ = new g.PartialNode(e[b - 2], e[b - 1], a(e[b - 3], e[b]));
                                    break;
                                case 23:
                                    this.$ = a(e[b - 1], e[b]);
                                    break;
                                case 24:
                                    this.$ = [
                                        [e[b - 2]].concat(e[b - 1]), e[b]
                                    ];
                                    break;
                                case 25:
                                    this.$ = [
                                        [e[b]], null
                                    ];
                                    break;
                                case 26:
                                    this.$ = e[b];
                                    break;
                                case 27:
                                    this.$ = new g.StringNode(e[b]);
                                    break;
                                case 28:
                                    this.$ =
                                        new g.IntegerNode(e[b]);
                                    break;
                                case 29:
                                    this.$ = new g.BooleanNode(e[b]);
                                    break;
                                case 30:
                                    this.$ = e[b];
                                    break;
                                case 31:
                                    this.$ = new g.HashNode(e[b]);
                                    break;
                                case 32:
                                    this.$ = [e[b - 2], e[b]];
                                    break;
                                case 33:
                                    this.$ = new g.PartialNameNode(e[b]);
                                    break;
                                case 34:
                                    this.$ = new g.PartialNameNode(new g.StringNode(e[b]));
                                    break;
                                case 35:
                                    this.$ = new g.PartialNameNode(new g.IntegerNode(e[b]));
                                    break;
                                case 36:
                                    this.$ = new g.DataNode(e[b]);
                                    break;
                                case 37:
                                    this.$ = new g.IdNode(e[b]);
                                    break;
                                case 38:
                                    e[b - 2].push({
                                        part: e[b],
                                        separator: e[b - 1]
                                    });
                                    this.$ =
                                        e[b - 2];
                                    break;
                                case 39:
                                    this.$ = [{
                                        part: e[b]
                                    }];
                                    break;
                                case 42:
                                    this.$ = [];
                                    break;
                                case 43:
                                    e[b - 1].push(e[b]);
                                    break;
                                case 46:
                                    this.$ = [e[b]];
                                    break;
                                case 47:
                                    e[b - 1].push(e[b])
                            }
                        },
                        table: [{
                            3: 1,
                            4: 2,
                            5: [1, 3],
                            8: 4,
                            9: 5,
                            11: 6,
                            12: 7,
                            13: 8,
                            14: [1, 9],
                            15: [1, 10],
                            16: [1, 12],
                            19: [1, 11],
                            22: [1, 13],
                            23: [1, 14],
                            25: [1, 15]
                        }, {
                            1: [3]
                        }, {
                            5: [1, 16],
                            8: 17,
                            9: 5,
                            11: 6,
                            12: 7,
                            13: 8,
                            14: [1, 9],
                            15: [1, 10],
                            16: [1, 12],
                            19: [1, 11],
                            22: [1, 13],
                            23: [1, 14],
                            25: [1, 15]
                        }, {
                            1: [2, 2]
                        }, {
                            5: [2, 9],
                            14: [2, 9],
                            15: [2, 9],
                            16: [2, 9],
                            19: [2, 9],
                            20: [2, 9],
                            22: [2, 9],
                            23: [2, 9],
                            25: [2, 9]
                        }, {
                            4: 20,
                            6: 18,
                            7: 19,
                            8: 4,
                            9: 5,
                            11: 6,
                            12: 7,
                            13: 8,
                            14: [1, 9],
                            15: [1, 10],
                            16: [1, 12],
                            19: [1, 21],
                            20: [2, 8],
                            22: [1, 13],
                            23: [1, 14],
                            25: [1, 15]
                        }, {
                            4: 20,
                            6: 22,
                            7: 19,
                            8: 4,
                            9: 5,
                            11: 6,
                            12: 7,
                            13: 8,
                            14: [1, 9],
                            15: [1, 10],
                            16: [1, 12],
                            19: [1, 21],
                            20: [2, 8],
                            22: [1, 13],
                            23: [1, 14],
                            25: [1, 15]
                        }, {
                            5: [2, 13],
                            14: [2, 13],
                            15: [2, 13],
                            16: [2, 13],
                            19: [2, 13],
                            20: [2, 13],
                            22: [2, 13],
                            23: [2, 13],
                            25: [2, 13]
                        }, {
                            5: [2, 14],
                            14: [2, 14],
                            15: [2, 14],
                            16: [2, 14],
                            19: [2, 14],
                            20: [2, 14],
                            22: [2, 14],
                            23: [2, 14],
                            25: [2, 14]
                        }, {
                            5: [2, 15],
                            14: [2, 15],
                            15: [2, 15],
                            16: [2, 15],
                            19: [2, 15],
                            20: [2, 15],
                            22: [2, 15],
                            23: [2, 15],
                            25: [2, 15]
                        }, {
                            5: [2, 16],
                            14: [2,
                                16
                            ],
                            15: [2, 16],
                            16: [2, 16],
                            19: [2, 16],
                            20: [2, 16],
                            22: [2, 16],
                            23: [2, 16],
                            25: [2, 16]
                        }, {
                            17: 23,
                            21: 24,
                            30: 25,
                            38: [1, 28],
                            40: [1, 27],
                            41: 26
                        }, {
                            17: 29,
                            21: 24,
                            30: 25,
                            38: [1, 28],
                            40: [1, 27],
                            41: 26
                        }, {
                            17: 30,
                            21: 24,
                            30: 25,
                            38: [1, 28],
                            40: [1, 27],
                            41: 26
                        }, {
                            17: 31,
                            21: 24,
                            30: 25,
                            38: [1, 28],
                            40: [1, 27],
                            41: 26
                        }, {
                            21: 33,
                            26: 32,
                            32: [1, 34],
                            33: [1, 35],
                            38: [1, 28],
                            41: 26
                        }, {
                            1: [2, 1]
                        }, {
                            5: [2, 10],
                            14: [2, 10],
                            15: [2, 10],
                            16: [2, 10],
                            19: [2, 10],
                            20: [2, 10],
                            22: [2, 10],
                            23: [2, 10],
                            25: [2, 10]
                        }, {
                            10: 36,
                            20: [1, 37]
                        }, {
                            4: 38,
                            8: 4,
                            9: 5,
                            11: 6,
                            12: 7,
                            13: 8,
                            14: [1, 9],
                            15: [1, 10],
                            16: [1, 12],
                            19: [1, 11],
                            20: [2,
                                7
                            ],
                            22: [1, 13],
                            23: [1, 14],
                            25: [1, 15]
                        }, {
                            7: 39,
                            8: 17,
                            9: 5,
                            11: 6,
                            12: 7,
                            13: 8,
                            14: [1, 9],
                            15: [1, 10],
                            16: [1, 12],
                            19: [1, 21],
                            20: [2, 6],
                            22: [1, 13],
                            23: [1, 14],
                            25: [1, 15]
                        }, {
                            17: 23,
                            18: [1, 40],
                            21: 24,
                            30: 25,
                            38: [1, 28],
                            40: [1, 27],
                            41: 26
                        }, {
                            10: 41,
                            20: [1, 37]
                        }, {
                            18: [1, 42]
                        }, {
                            18: [2, 42],
                            24: [2, 42],
                            28: 43,
                            32: [2, 42],
                            33: [2, 42],
                            34: [2, 42],
                            38: [2, 42],
                            40: [2, 42]
                        }, {
                            18: [2, 25],
                            24: [2, 25]
                        }, {
                            18: [2, 37],
                            24: [2, 37],
                            32: [2, 37],
                            33: [2, 37],
                            34: [2, 37],
                            38: [2, 37],
                            40: [2, 37],
                            42: [1, 44]
                        }, {
                            21: 45,
                            38: [1, 28],
                            41: 26
                        }, {
                            18: [2, 39],
                            24: [2, 39],
                            32: [2, 39],
                            33: [2, 39],
                            34: [2, 39],
                            38: [2, 39],
                            40: [2,
                                39
                            ],
                            42: [2, 39]
                        }, {
                            18: [1, 46]
                        }, {
                            18: [1, 47]
                        }, {
                            24: [1, 48]
                        }, {
                            18: [2, 40],
                            21: 50,
                            27: 49,
                            38: [1, 28],
                            41: 26
                        }, {
                            18: [2, 33],
                            38: [2, 33]
                        }, {
                            18: [2, 34],
                            38: [2, 34]
                        }, {
                            18: [2, 35],
                            38: [2, 35]
                        }, {
                            5: [2, 11],
                            14: [2, 11],
                            15: [2, 11],
                            16: [2, 11],
                            19: [2, 11],
                            20: [2, 11],
                            22: [2, 11],
                            23: [2, 11],
                            25: [2, 11]
                        }, {
                            21: 51,
                            38: [1, 28],
                            41: 26
                        }, {
                            8: 17,
                            9: 5,
                            11: 6,
                            12: 7,
                            13: 8,
                            14: [1, 9],
                            15: [1, 10],
                            16: [1, 12],
                            19: [1, 11],
                            20: [2, 3],
                            22: [1, 13],
                            23: [1, 14],
                            25: [1, 15]
                        }, {
                            4: 52,
                            8: 4,
                            9: 5,
                            11: 6,
                            12: 7,
                            13: 8,
                            14: [1, 9],
                            15: [1, 10],
                            16: [1, 12],
                            19: [1, 11],
                            20: [2, 5],
                            22: [1, 13],
                            23: [1, 14],
                            25: [1, 15]
                        }, {
                            14: [2, 23],
                            15: [2,
                                23
                            ],
                            16: [2, 23],
                            19: [2, 23],
                            20: [2, 23],
                            22: [2, 23],
                            23: [2, 23],
                            25: [2, 23]
                        }, {
                            5: [2, 12],
                            14: [2, 12],
                            15: [2, 12],
                            16: [2, 12],
                            19: [2, 12],
                            20: [2, 12],
                            22: [2, 12],
                            23: [2, 12],
                            25: [2, 12]
                        }, {
                            14: [2, 18],
                            15: [2, 18],
                            16: [2, 18],
                            19: [2, 18],
                            20: [2, 18],
                            22: [2, 18],
                            23: [2, 18],
                            25: [2, 18]
                        }, {
                            18: [2, 44],
                            21: 56,
                            24: [2, 44],
                            29: 53,
                            30: 60,
                            31: 54,
                            32: [1, 57],
                            33: [1, 58],
                            34: [1, 59],
                            35: 55,
                            36: 61,
                            37: 62,
                            38: [1, 63],
                            40: [1, 27],
                            41: 26
                        }, {
                            38: [1, 64]
                        }, {
                            18: [2, 36],
                            24: [2, 36],
                            32: [2, 36],
                            33: [2, 36],
                            34: [2, 36],
                            38: [2, 36],
                            40: [2, 36]
                        }, {
                            14: [2, 17],
                            15: [2, 17],
                            16: [2, 17],
                            19: [2, 17],
                            20: [2, 17],
                            22: [2, 17],
                            23: [2, 17],
                            25: [2, 17]
                        }, {
                            5: [2, 20],
                            14: [2, 20],
                            15: [2, 20],
                            16: [2, 20],
                            19: [2, 20],
                            20: [2, 20],
                            22: [2, 20],
                            23: [2, 20],
                            25: [2, 20]
                        }, {
                            5: [2, 21],
                            14: [2, 21],
                            15: [2, 21],
                            16: [2, 21],
                            19: [2, 21],
                            20: [2, 21],
                            22: [2, 21],
                            23: [2, 21],
                            25: [2, 21]
                        }, {
                            18: [1, 65]
                        }, {
                            18: [2, 41]
                        }, {
                            18: [1, 66]
                        }, {
                            8: 17,
                            9: 5,
                            11: 6,
                            12: 7,
                            13: 8,
                            14: [1, 9],
                            15: [1, 10],
                            16: [1, 12],
                            19: [1, 11],
                            20: [2, 4],
                            22: [1, 13],
                            23: [1, 14],
                            25: [1, 15]
                        }, {
                            18: [2, 24],
                            24: [2, 24]
                        }, {
                            18: [2, 43],
                            24: [2, 43],
                            32: [2, 43],
                            33: [2, 43],
                            34: [2, 43],
                            38: [2, 43],
                            40: [2, 43]
                        }, {
                            18: [2, 45],
                            24: [2, 45]
                        }, {
                            18: [2, 26],
                            24: [2, 26],
                            32: [2, 26],
                            33: [2, 26],
                            34: [2,
                                26
                            ],
                            38: [2, 26],
                            40: [2, 26]
                        }, {
                            18: [2, 27],
                            24: [2, 27],
                            32: [2, 27],
                            33: [2, 27],
                            34: [2, 27],
                            38: [2, 27],
                            40: [2, 27]
                        }, {
                            18: [2, 28],
                            24: [2, 28],
                            32: [2, 28],
                            33: [2, 28],
                            34: [2, 28],
                            38: [2, 28],
                            40: [2, 28]
                        }, {
                            18: [2, 29],
                            24: [2, 29],
                            32: [2, 29],
                            33: [2, 29],
                            34: [2, 29],
                            38: [2, 29],
                            40: [2, 29]
                        }, {
                            18: [2, 30],
                            24: [2, 30],
                            32: [2, 30],
                            33: [2, 30],
                            34: [2, 30],
                            38: [2, 30],
                            40: [2, 30]
                        }, {
                            18: [2, 31],
                            24: [2, 31],
                            37: 67,
                            38: [1, 68]
                        }, {
                            18: [2, 46],
                            24: [2, 46],
                            38: [2, 46]
                        }, {
                            18: [2, 39],
                            24: [2, 39],
                            32: [2, 39],
                            33: [2, 39],
                            34: [2, 39],
                            38: [2, 39],
                            39: [1, 69],
                            40: [2, 39],
                            42: [2, 39]
                        }, {
                            18: [2, 38],
                            24: [2, 38],
                            32: [2,
                                38
                            ],
                            33: [2, 38],
                            34: [2, 38],
                            38: [2, 38],
                            40: [2, 38],
                            42: [2, 38]
                        }, {
                            5: [2, 22],
                            14: [2, 22],
                            15: [2, 22],
                            16: [2, 22],
                            19: [2, 22],
                            20: [2, 22],
                            22: [2, 22],
                            23: [2, 22],
                            25: [2, 22]
                        }, {
                            5: [2, 19],
                            14: [2, 19],
                            15: [2, 19],
                            16: [2, 19],
                            19: [2, 19],
                            20: [2, 19],
                            22: [2, 19],
                            23: [2, 19],
                            25: [2, 19]
                        }, {
                            18: [2, 47],
                            24: [2, 47],
                            38: [2, 47]
                        }, {
                            39: [1, 69]
                        }, {
                            21: 56,
                            30: 60,
                            31: 70,
                            32: [1, 57],
                            33: [1, 58],
                            34: [1, 59],
                            38: [1, 28],
                            40: [1, 27],
                            41: 26
                        }, {
                            18: [2, 32],
                            24: [2, 32],
                            38: [2, 32]
                        }],
                        defaultActions: {
                            3: [2, 2],
                            16: [2, 1],
                            50: [2, 41]
                        },
                        parseError: function(a, b) {
                            throw Error(a);
                        },
                        parse: function(a) {
                            var b = [0],
                                c = [null],
                                f = [],
                                d = this.table,
                                e = "",
                                g = 0,
                                h = 0,
                                p = 0;
                            this.lexer.setInput(a);
                            this.lexer.yy = this.yy;
                            this.yy.lexer = this.lexer;
                            this.yy.parser = this;
                            "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
                            a = this.lexer.yylloc;
                            f.push(a);
                            var r = this.lexer.options && this.lexer.options.ranges;
                            "function" === typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                            for (var s, F, D, K, Y = {}, U, O;;) {
                                D = b[b.length - 1];
                                if (this.defaultActions[D]) K = this.defaultActions[D];
                                else {
                                    if (null === s || "undefined" == typeof s) s = void 0, s =
                                        this.lexer.lex() || 1, "number" !== typeof s && (s = this.symbols_[s] || s);
                                    K = d[D] && d[D][s]
                                } if ("undefined" === typeof K || !K.length || !K[0]) {
                                    var y = "";
                                    if (!p) {
                                        O = [];
                                        for (U in d[D]) this.terminals_[U] && 2 < U && O.push("'" + this.terminals_[U] + "'");
                                        y = this.lexer.showPosition ? "Parse error on line " + (g + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + O.join(", ") + ", got '" + (this.terminals_[s] || s) + "'" : "Parse error on line " + (g + 1) + ": Unexpected " + (1 == s ? "end of input" : "'" + (this.terminals_[s] || s) + "'");
                                        this.parseError(y, {
                                            text: this.lexer.match,
                                            token: this.terminals_[s] || s,
                                            line: this.lexer.yylineno,
                                            loc: a,
                                            expected: O
                                        })
                                    }
                                }
                                if (K[0] instanceof Array && 1 < K.length) throw Error("Parse Error: multiple actions possible at state: " + D + ", token: " + s);
                                switch (K[0]) {
                                    case 1:
                                        b.push(s);
                                        c.push(this.lexer.yytext);
                                        f.push(this.lexer.yylloc);
                                        b.push(K[1]);
                                        s = null;
                                        F ? (s = F, F = null) : (h = this.lexer.yyleng, e = this.lexer.yytext, g = this.lexer.yylineno, a = this.lexer.yylloc, 0 < p && p--);
                                        break;
                                    case 2:
                                        O = this.productions_[K[1]][1];
                                        Y.$ = c[c.length - O];
                                        Y._$ = {
                                            first_line: f[f.length - (O || 1)].first_line,
                                            last_line: f[f.length - 1].last_line,
                                            first_column: f[f.length - (O || 1)].first_column,
                                            last_column: f[f.length - 1].last_column
                                        };
                                        r && (Y._$.range = [f[f.length - (O || 1)].range[0], f[f.length - 1].range[1]]);
                                        D = this.performAction.call(Y, e, h, g, this.yy, K[1], c, f);
                                        if ("undefined" !== typeof D) return D;
                                        O && (b = b.slice(0, -2 * O), c = c.slice(0, -1 * O), f = f.slice(0, -1 * O));
                                        b.push(this.productions_[K[1]][0]);
                                        c.push(Y.$);
                                        f.push(Y._$);
                                        K = d[b[b.length - 2]][b[b.length - 1]];
                                        b.push(K);
                                        break;
                                    case 3:
                                        return !0
                                }
                            }
                            return !0
                        }
                    },
                    f = function() {
                        return {
                            EOF: 1,
                            parseError: function(a,
                                b) {
                                if (this.yy.parser) this.yy.parser.parseError(a, b);
                                else throw Error(a);
                            },
                            setInput: function(a) {
                                this._input = a;
                                this._more = this._less = this.done = !1;
                                this.yylineno = this.yyleng = 0;
                                this.yytext = this.matched = this.match = "";
                                this.conditionStack = ["INITIAL"];
                                this.yylloc = {
                                    first_line: 1,
                                    first_column: 0,
                                    last_line: 1,
                                    last_column: 0
                                };
                                this.options.ranges && (this.yylloc.range = [0, 0]);
                                this.offset = 0;
                                return this
                            },
                            input: function() {
                                var a = this._input[0];
                                this.yytext += a;
                                this.yyleng++;
                                this.offset++;
                                this.match += a;
                                this.matched += a;
                                a.match(/(?:\r\n?|\n).*/g) ?
                                    (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++;
                                this.options.ranges && this.yylloc.range[1]++;
                                this._input = this._input.slice(1);
                                return a
                            },
                            unput: function(a) {
                                var b = a.length,
                                    c = a.split(/(?:\r\n?|\n)/g);
                                this._input = a + this._input;
                                this.yytext = this.yytext.substr(0, this.yytext.length - b - 1);
                                this.offset -= b;
                                a = this.match.split(/(?:\r\n?|\n)/g);
                                this.match = this.match.substr(0, this.match.length - 1);
                                this.matched = this.matched.substr(0, this.matched.length - 1);
                                c.length - 1 && (this.yylineno -= c.length - 1);
                                var f =
                                    this.yylloc.range;
                                this.yylloc = {
                                    first_line: this.yylloc.first_line,
                                    last_line: this.yylineno + 1,
                                    first_column: this.yylloc.first_column,
                                    last_column: c ? (c.length === a.length ? this.yylloc.first_column : 0) + a[a.length - c.length].length - c[0].length : this.yylloc.first_column - b
                                };
                                this.options.ranges && (this.yylloc.range = [f[0], f[0] + this.yyleng - b]);
                                return this
                            },
                            more: function() {
                                this._more = !0;
                                return this
                            },
                            less: function(a) {
                                this.unput(this.match.slice(a))
                            },
                            pastInput: function() {
                                var a = this.matched.substr(0, this.matched.length -
                                    this.match.length);
                                return (20 < a.length ? "..." : "") + a.substr(-20).replace(/\n/g, "")
                            },
                            upcomingInput: function() {
                                var a = this.match;
                                20 > a.length && (a += this._input.substr(0, 20 - a.length));
                                return (a.substr(0, 20) + (20 < a.length ? "..." : "")).replace(/\n/g, "")
                            },
                            showPosition: function() {
                                var a = this.pastInput(),
                                    b = Array(a.length + 1).join("-");
                                return a + this.upcomingInput() + "\n" + b + "^"
                            },
                            next: function() {
                                if (this.done) return this.EOF;
                                this._input || (this.done = !0);
                                var a, b, c;
                                this._more || (this.match = this.yytext = "");
                                for (var f = this._currentRules(),
                                    d = 0; d < f.length && (!(b = this._input.match(this.rules[f[d]])) || a && !(b[0].length > a[0].length) || (a = b, c = d, this.options.flex)); d++);
                                if (a) {
                                    if (b = a[0].match(/(?:\r\n?|\n).*/g)) this.yylineno += b.length;
                                    this.yylloc = {
                                        first_line: this.yylloc.last_line,
                                        last_line: this.yylineno + 1,
                                        first_column: this.yylloc.last_column,
                                        last_column: b ? b[b.length - 1].length - b[b.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + a[0].length
                                    };
                                    this.yytext += a[0];
                                    this.match += a[0];
                                    this.matches = a;
                                    this.yyleng = this.yytext.length;
                                    this.options.ranges &&
                                        (this.yylloc.range = [this.offset, this.offset += this.yyleng]);
                                    this._more = !1;
                                    this._input = this._input.slice(a[0].length);
                                    this.matched += a[0];
                                    a = this.performAction.call(this, this.yy, this, f[c], this.conditionStack[this.conditionStack.length - 1]);
                                    this.done && this._input && (this.done = !1);
                                    if (a) return a
                                } else return "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                                    text: "",
                                    token: null,
                                    line: this.yylineno
                                })
                            },
                            lex: function() {
                                var a = this.next();
                                return "undefined" !== typeof a ? a : this.lex()
                            },
                            begin: function(a) {
                                this.conditionStack.push(a)
                            },
                            popState: function() {
                                return this.conditionStack.pop()
                            },
                            _currentRules: function() {
                                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
                            },
                            topState: function() {
                                return this.conditionStack[this.conditionStack.length - 2]
                            },
                            pushState: function(a) {
                                this.begin(a)
                            },
                            options: {},
                            performAction: function(a, b, c, f) {
                                function d(a, d) {
                                    return b.yytext = b.yytext.substr(a, b.yyleng - d)
                                }
                                switch (c) {
                                    case 0:
                                        "\\\\" === b.yytext.slice(-2) ?
                                            (d(0, 1), this.begin("mu")) : "\\" === b.yytext.slice(-1) ? (d(0, 1), this.begin("emu")) : this.begin("mu");
                                        if (b.yytext) return 14;
                                        break;
                                    case 1:
                                        return 14;
                                    case 2:
                                        return this.popState(), 14;
                                    case 3:
                                        return d(0, 4), this.popState(), 15;
                                    case 4:
                                        return 25;
                                    case 5:
                                        return 16;
                                    case 6:
                                        return 20;
                                    case 7:
                                        return 19;
                                    case 8:
                                        return 19;
                                    case 9:
                                        return 23;
                                    case 10:
                                        return 22;
                                    case 11:
                                        this.popState();
                                        this.begin("com");
                                        break;
                                    case 12:
                                        return d(3, 5), this.popState(), 15;
                                    case 13:
                                        return 22;
                                    case 14:
                                        return 39;
                                    case 15:
                                        return 38;
                                    case 16:
                                        return 38;
                                    case 17:
                                        return 42;
                                    case 19:
                                        return this.popState(), 24;
                                    case 20:
                                        return this.popState(), 18;
                                    case 21:
                                        return b.yytext = d(1, 2).replace(/\\"/g, '"'), 32;
                                    case 22:
                                        return b.yytext = d(1, 2).replace(/\\'/g, "'"), 32;
                                    case 23:
                                        return 40;
                                    case 24:
                                        return 34;
                                    case 25:
                                        return 34;
                                    case 26:
                                        return 33;
                                    case 27:
                                        return 38;
                                    case 28:
                                        return b.yytext = d(1, 2), 38;
                                    case 29:
                                        return "INVALID";
                                    case 30:
                                        return 5
                                }
                            },
                            rules: [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/,
                                /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s])))/, /^(?:false(?=([~}\s])))/, /^(?:-?[0-9]+(?=([~}\s])))/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/
                            ],
                            conditions: {
                                mu: {
                                    rules: [4, 5, 6, 7, 8, 9, 10,
                                        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
                                    ],
                                    inclusive: !1
                                },
                                emu: {
                                    rules: [2],
                                    inclusive: !1
                                },
                                com: {
                                    rules: [3],
                                    inclusive: !1
                                },
                                INITIAL: {
                                    rules: [0, 1, 30],
                                    inclusive: !0
                                }
                            }
                        }
                    }();
                c.lexer = f;
                b.prototype = c;
                c.Parser = b;
                return new b
            }()
        }(), b),
        h = function(a) {
            function b(a) {
                this.value = a
            }

            function c() {}
            var f = a.COMPILER_REVISION,
                h = a.REVISION_CHANGES,
                v = a.log;
            c.prototype = {
                nameLookup: function(a, b) {
                    var d, f;
                    0 === a.indexOf("depth") && (d = !0);
                    f = /^[0-9]+$/.test(b) ? a + "[" + b + "]" : c.isValidJavaScriptVariableName(b) ? a + "." + b : a + "['" +
                        b + "']";
                    return d ? "(" + a + " && " + f + ")" : f
                },
                compilerInfo: function() {
                    return "this.compilerInfo = [" + f + ",'" + h[f] + "'];\n"
                },
                appendToBuffer: function(a) {
                    return this.environment.isSimple ? "return " + a + ";" : {
                        appendToBuffer: !0,
                        content: a,
                        toString: function() {
                            return "buffer += " + a + ";"
                        }
                    }
                },
                initializeBuffer: function() {
                    return this.quotedString("")
                },
                namespace: "Handlebars",
                compile: function(a, b, d, c) {
                    this.environment = a;
                    this.options = b || {};
                    v("debug", this.environment.disassemble() + "\n\n");
                    this.name = this.environment.name;
                    this.isChild = !!d;
                    this.context = d || {
                        programs: [],
                        environments: [],
                        aliases: {}
                    };
                    this.preamble();
                    this.stackSlot = 0;
                    this.stackVars = [];
                    this.registers = {
                        list: []
                    };
                    this.compileStack = [];
                    this.inlineStack = [];
                    this.compileChildren(a, b);
                    a = a.opcodes;
                    this.i = 0;
                    for (d = a.length; this.i < d; this.i++) b = a[this.i], "DECLARE" === b.opcode ? this[b.name] = b.value : this[b.opcode].apply(this, b.args), b.opcode !== this.stripNext && (this.stripNext = !1);
                    this.pushSource("");
                    return this.createFunctionContext(c)
                },
                preamble: function() {
                    var a = [];
                    if (this.isChild) a.push("");
                    else {
                        var b = this.namespace,
                            d = "helpers = this.merge(helpers, " + b + ".helpers);";
                        this.environment.usePartial && (d = d + " partials = this.merge(partials, " + b + ".partials);");
                        this.options.data && (d += " data = data || {};");
                        a.push(d)
                    }
                    this.environment.isSimple ? a.push("") : a.push(", buffer = " + this.initializeBuffer());
                    this.lastContext = 0;
                    this.source = a
                },
                createFunctionContext: function(a) {
                    var b = this.stackVars.concat(this.registers.list);
                    0 < b.length && (this.source[1] = this.source[1] + ", " + b.join(", "));
                    if (!this.isChild)
                        for (var d in this.context.aliases) this.context.aliases.hasOwnProperty(d) &&
                            (this.source[1] = this.source[1] + ", " + d + "=" + this.context.aliases[d]);
                    this.source[1] && (this.source[1] = "var " + this.source[1].substring(2) + ";");
                    this.isChild || (this.source[1] += "\n" + this.context.programs.join("\n") + "\n");
                    this.environment.isSimple || this.pushSource("return buffer;");
                    b = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];
                    d = 0;
                    for (var c = this.environment.depths.list.length; d < c; d++) b.push("depth" + this.environment.depths.list[d]);
                    d = this.mergeSource();
                    this.isChild ||
                        (d = this.compilerInfo() + d);
                    if (a) return b.push(d), Function.apply(this, b);
                    a = "function " + (this.name || "") + "(" + b.join(",") + ") {\n  " + d + "}";
                    v("debug", a + "\n\n");
                    return a
                },
                mergeSource: function() {
                    for (var a = "", b, d = 0, c = this.source.length; d < c; d++) {
                        var f = this.source[d];
                        f.appendToBuffer ? b = b ? b + "\n    + " + f.content : f.content : (b && (a += "buffer += " + b + ";\n  ", b = void 0), a += f + "\n  ")
                    }
                    return a
                },
                blockValue: function() {
                    this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
                    var a = ["depth0"];
                    this.setupParams(0,
                        a);
                    this.replaceStack(function(b) {
                        a.splice(1, 0, b);
                        return "blockHelperMissing.call(" + a.join(", ") + ")"
                    })
                },
                ambiguousBlockValue: function() {
                    this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
                    var a = ["depth0"];
                    this.setupParams(0, a);
                    var b = this.topStack();
                    a.splice(1, 0, b);
                    a[a.length - 1] = "options";
                    this.pushSource("if (!" + this.lastHelper + ") { " + b + " = blockHelperMissing.call(" + a.join(", ") + "); }")
                },
                appendContent: function(a) {
                    this.pendingContent && (a = this.pendingContent + a);
                    this.stripNext && (a = a.replace(/^\s+/,
                        ""));
                    this.pendingContent = a
                },
                strip: function() {
                    this.pendingContent && (this.pendingContent = this.pendingContent.replace(/\s+$/, ""));
                    this.stripNext = "strip"
                },
                append: function() {
                    this.flushInline();
                    var a = this.popStack();
                    this.pushSource("if(" + a + " || " + a + " === 0) { " + this.appendToBuffer(a) + " }");
                    this.environment.isSimple && this.pushSource("else { " + this.appendToBuffer("''") + " }")
                },
                appendEscaped: function() {
                    this.context.aliases.escapeExpression = "this.escapeExpression";
                    this.pushSource(this.appendToBuffer("escapeExpression(" +
                        this.popStack() + ")"))
                },
                getContext: function(a) {
                    this.lastContext !== a && (this.lastContext = a)
                },
                lookupOnContext: function(a) {
                    this.push(this.nameLookup("depth" + this.lastContext, a, "context"))
                },
                pushContext: function() {
                    this.pushStackLiteral("depth" + this.lastContext)
                },
                resolvePossibleLambda: function() {
                    this.context.aliases.functionType = '"function"';
                    this.replaceStack(function(a) {
                        return "typeof " + a + " === functionType ? " + a + ".apply(depth0) : " + a
                    })
                },
                lookup: function(a) {
                    this.replaceStack(function(b) {
                        return b + " == null || " +
                            b + " === false ? " + b + " : " + this.nameLookup(b, a, "context")
                    })
                },
                lookupData: function() {
                    this.push("data")
                },
                pushStringParam: function(a, b) {
                    this.pushStackLiteral("depth" + this.lastContext);
                    this.pushString(b);
                    "string" === typeof a ? this.pushString(a) : this.pushStackLiteral(a)
                },
                emptyHash: function() {
                    this.pushStackLiteral("{}");
                    this.options.stringParams && (this.register("hashTypes", "{}"), this.register("hashContexts", "{}"))
                },
                pushHash: function() {
                    this.hash = {
                        values: [],
                        types: [],
                        contexts: []
                    }
                },
                popHash: function() {
                    var a = this.hash;
                    this.hash = void 0;
                    this.options.stringParams && (this.register("hashContexts", "{" + a.contexts.join(",") + "}"), this.register("hashTypes", "{" + a.types.join(",") + "}"));
                    this.push("{\n    " + a.values.join(",\n    ") + "\n  }")
                },
                pushString: function(a) {
                    this.pushStackLiteral(this.quotedString(a))
                },
                push: function(a) {
                    this.inlineStack.push(a);
                    return a
                },
                pushLiteral: function(a) {
                    this.pushStackLiteral(a)
                },
                pushProgram: function(a) {
                    null != a ? this.pushStackLiteral(this.programExpression(a)) : this.pushStackLiteral(null)
                },
                invokeHelper: function(a,
                    b) {
                    this.context.aliases.helperMissing = "helpers.helperMissing";
                    var d = this.lastHelper = this.setupHelper(a, b, !0),
                        c = this.nameLookup("depth" + this.lastContext, b, "context");
                    this.push(d.name + " || " + c);
                    this.replaceStack(function(a) {
                        return a + " ? " + a + ".call(" + d.callParams + ") : helperMissing.call(" + d.helperMissingParams + ")"
                    })
                },
                invokeKnownHelper: function(a, b) {
                    var d = this.setupHelper(a, b);
                    this.push(d.name + ".call(" + d.callParams + ")")
                },
                invokeAmbiguous: function(a, b) {
                    this.context.aliases.functionType = '"function"';
                    this.pushStackLiteral("{}");
                    var d = this.setupHelper(0, a, b),
                        c = this.lastHelper = this.nameLookup("helpers", a, "helper"),
                        f = this.nameLookup("depth" + this.lastContext, a, "context"),
                        g = this.nextStack();
                    this.pushSource("if (" + g + " = " + c + ") { " + g + " = " + g + ".call(" + d.callParams + "); }");
                    this.pushSource("else { " + g + " = " + f + "; " + g + " = typeof " + g + " === functionType ? " + g + ".call(" + d.callParams + ") : " + g + "; }")
                },
                invokePartial: function(a) {
                    a = [this.nameLookup("partials", a, "partial"), "'" + a + "'", this.popStack(), "helpers", "partials"];
                    this.options.data && a.push("data");
                    this.context.aliases.self = "this";
                    this.push("self.invokePartial(" + a.join(", ") + ")")
                },
                assignToHash: function(a) {
                    var b = this.popStack(),
                        d, c;
                    this.options.stringParams && (c = this.popStack(), d = this.popStack());
                    var f = this.hash;
                    d && f.contexts.push("'" + a + "': " + d);
                    c && f.types.push("'" + a + "': " + c);
                    f.values.push("'" + a + "': (" + b + ")")
                },
                compiler: c,
                compileChildren: function(a, b) {
                    for (var d = a.children, c, f, g = 0, h = d.length; g < h; g++) {
                        c = d[g];
                        f = new this.compiler;
                        var n = this.matchExistingProgram(c);
                        null == n ? (this.context.programs.push(""),
                            n = this.context.programs.length, c.index = n, c.name = "program" + n, this.context.programs[n] = f.compile(c, b, this.context), this.context.environments[n] = c) : (c.index = n, c.name = "program" + n)
                    }
                },
                matchExistingProgram: function(a) {
                    for (var b = 0, d = this.context.environments.length; b < d; b++) {
                        var c = this.context.environments[b];
                        if (c && c.equals(a)) return b
                    }
                },
                programExpression: function(a) {
                    this.context.aliases.self = "this";
                    if (null == a) return "self.noop";
                    var b = this.environment.children[a];
                    a = b.depths.list;
                    for (var d = [b.index, b.name, "data"],
                        c = 0, f = a.length; c < f; c++) b = a[c], 1 === b ? d.push("depth0") : d.push("depth" + (b - 1));
                    return (0 === a.length ? "self.program(" : "self.programWithDepth(") + d.join(", ") + ")"
                },
                register: function(a, b) {
                    this.useRegister(a);
                    this.pushSource(a + " = " + b + ";")
                },
                useRegister: function(a) {
                    this.registers[a] || (this.registers[a] = !0, this.registers.list.push(a))
                },
                pushStackLiteral: function(a) {
                    return this.push(new b(a))
                },
                pushSource: function(a) {
                    this.pendingContent && (this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent))),
                        this.pendingContent = void 0);
                    a && this.source.push(a)
                },
                pushStack: function(a) {
                    this.flushInline();
                    var b = this.incrStack();
                    a && this.pushSource(b + " = " + a + ";");
                    this.compileStack.push(b);
                    return b
                },
                replaceStack: function(a) {
                    var d = "",
                        c = this.isInline(),
                        f;
                    c ? (f = this.popStack(!0), f instanceof b ? f = f.value : (d = this.stackSlot ? this.topStackName() : this.incrStack(), d = "(" + this.push(d) + " = " + f + "),", f = this.topStack())) : f = this.topStack();
                    a = a.call(this, f);
                    c ? ((this.inlineStack.length || this.compileStack.length) && this.popStack(),
                        this.push("(" + d + a + ")")) : (/^stack/.test(f) || (f = this.nextStack()), this.pushSource(f + " = (" + d + a + ");"));
                    return f
                },
                nextStack: function() {
                    return this.pushStack()
                },
                incrStack: function() {
                    this.stackSlot++;
                    this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot);
                    return this.topStackName()
                },
                topStackName: function() {
                    return "stack" + this.stackSlot
                },
                flushInline: function() {
                    var a = this.inlineStack;
                    if (a.length) {
                        this.inlineStack = [];
                        for (var d = 0, c = a.length; d < c; d++) {
                            var f = a[d];
                            f instanceof b ? this.compileStack.push(f) :
                                this.pushStack(f)
                        }
                    }
                },
                isInline: function() {
                    return this.inlineStack.length
                },
                popStack: function(a) {
                    var d = this.isInline(),
                        c = (d ? this.inlineStack : this.compileStack).pop();
                    if (!a && c instanceof b) return c.value;
                    d || this.stackSlot--;
                    return c
                },
                topStack: function(a) {
                    var d = this.isInline() ? this.inlineStack : this.compileStack,
                        d = d[d.length - 1];
                    return !a && d instanceof b ? d.value : d
                },
                quotedString: function(a) {
                    return '"' + a.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g,
                        "\\u2029") + '"'
                },
                setupHelper: function(a, b, d) {
                    var c = [];
                    this.setupParams(a, c, d);
                    a = this.nameLookup("helpers", b, "helper");
                    return {
                        params: c,
                        name: a,
                        callParams: ["depth0"].concat(c).join(", "),
                        helperMissingParams: d && ["depth0", this.quotedString(b)].concat(c).join(", ")
                    }
                },
                setupParams: function(a, b, d) {
                    var c = [],
                        f = [],
                        g = [],
                        h, n;
                    c.push("hash:" + this.popStack());
                    h = this.popStack();
                    if ((n = this.popStack()) || h) n || (this.context.aliases.self = "this", n = "self.noop"), h || (this.context.aliases.self = "this", h = "self.noop"), c.push("inverse:" +
                        h), c.push("fn:" + n);
                    for (n = 0; n < a; n++) h = this.popStack(), b.push(h), this.options.stringParams && (g.push(this.popStack()), f.push(this.popStack()));
                    this.options.stringParams && (c.push("contexts:[" + f.join(",") + "]"), c.push("types:[" + g.join(",") + "]"), c.push("hashContexts:hashContexts"), c.push("hashTypes:hashTypes"));
                    this.options.data && c.push("data:data");
                    c = "{" + c.join(",") + "}";
                    d ? (this.register("options", c), b.push("options")) : b.push(c);
                    return b.join(", ")
                }
            };
            a = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" ");
            for (var w = c.RESERVED_WORDS = {}, u = 0, d = a.length; u < d; u++) w[a[u]] = !0;
            c.isValidJavaScriptVariableName = function(a) {
                return !c.RESERVED_WORDS[a] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(a) ? !0 : !1
            };
            return c
        }(h),
        c = function(a, b, c, f) {
            function h() {}
            var v = {},
                w = b.parse;
            v.Compiler = h;
            h.prototype = {
                compiler: h,
                disassemble: function() {
                    for (var a = this.opcodes, b, c = [], f, g, h = 0, n = a.length; h < n; h++)
                        if (b = a[h], "DECLARE" === b.opcode) c.push("DECLARE " + b.name + "=" + b.value);
                        else {
                            f = [];
                            for (var p = 0; p < b.args.length; p++) g = b.args[p], "string" === typeof g &&
                                (g = '"' + g.replace("\n", "\\n") + '"'), f.push(g);
                            c.push(b.opcode + " " + f.join(" "))
                        }
                    return c.join("\n")
                },
                equals: function(a) {
                    var b = this.opcodes.length;
                    if (a.opcodes.length !== b) return !1;
                    for (var c = 0; c < b; c++) {
                        var f = this.opcodes[c],
                            g = a.opcodes[c];
                        if (f.opcode !== g.opcode || f.args.length !== g.args.length) return !1;
                        for (var h = 0; h < f.args.length; h++)
                            if (f.args[h] !== g.args[h]) return !1
                    }
                    b = this.children.length;
                    if (a.children.length !== b) return !1;
                    for (c = 0; c < b; c++)
                        if (!this.children[c].equals(a.children[c])) return !1;
                    return !0
                },
                guid: 0,
                compile: function(a, b) {
                    this.opcodes = [];
                    this.children = [];
                    this.depths = {
                        list: []
                    };
                    this.options = b;
                    var c = this.options.knownHelpers;
                    this.options.knownHelpers = {
                        helperMissing: !0,
                        blockHelperMissing: !0,
                        each: !0,
                        "if": !0,
                        unless: !0,
                        "with": !0,
                        log: !0
                    };
                    if (c)
                        for (var f in c) this.options.knownHelpers[f] = c[f];
                    return this.accept(a)
                },
                accept: function(a) {
                    var b = a.strip || {};
                    b.left && this.opcode("strip");
                    a = this[a.type](a);
                    b.right && this.opcode("strip");
                    return a
                },
                program: function(a) {
                    a = a.statements;
                    for (var b = 0, c = a.length; b < c; b++) this.accept(a[b]);
                    this.isSimple = 1 === c;
                    this.depths.list = this.depths.list.sort(function(a, b) {
                        return a - b
                    });
                    return this
                },
                compileProgram: function(a) {
                    a = (new this.compiler).compile(a, this.options);
                    var b = this.guid++,
                        c;
                    this.usePartial = this.usePartial || a.usePartial;
                    this.children[b] = a;
                    for (var f = 0, g = a.depths.list.length; f < g; f++) c = a.depths.list[f], 2 > c || this.addDepth(c - 1);
                    return b
                },
                block: function(a) {
                    var b = a.mustache,
                        c = a.program;
                    a = a.inverse;
                    c && (c = this.compileProgram(c));
                    a && (a = this.compileProgram(a));
                    var f = this.classifyMustache(b);
                    "helper" === f ? this.helperMustache(b, c, a) : "simple" === f ? (this.simpleMustache(b), this.opcode("pushProgram", c), this.opcode("pushProgram", a), this.opcode("emptyHash"), this.opcode("blockValue")) : (this.ambiguousMustache(b, c, a), this.opcode("pushProgram", c), this.opcode("pushProgram", a), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue"));
                    this.opcode("append")
                },
                hash: function(a) {
                    a = a.pairs;
                    var b, c;
                    this.opcode("pushHash");
                    for (var f = 0, g = a.length; f < g; f++) b = a[f], c = b[1], this.options.stringParams ? (c.depth && this.addDepth(c.depth),
                        this.opcode("getContext", c.depth || 0), this.opcode("pushStringParam", c.stringModeValue, c.type)) : this.accept(c), this.opcode("assignToHash", b[0]);
                    this.opcode("popHash")
                },
                partial: function(a) {
                    var b = a.partialName;
                    this.usePartial = !0;
                    a.context ? this.ID(a.context) : this.opcode("push", "depth0");
                    this.opcode("invokePartial", b.name);
                    this.opcode("append")
                },
                content: function(a) {
                    this.opcode("appendContent", a.string)
                },
                mustache: function(a) {
                    var b = this.options,
                        c = this.classifyMustache(a);
                    "simple" === c ? this.simpleMustache(a) :
                        "helper" === c ? this.helperMustache(a) : this.ambiguousMustache(a);
                    a.escaped && !b.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
                },
                ambiguousMustache: function(a, b, c) {
                    a = a.id;
                    var f = a.parts[0],
                        g = null != b || null != c;
                    this.opcode("getContext", a.depth);
                    this.opcode("pushProgram", b);
                    this.opcode("pushProgram", c);
                    this.opcode("invokeAmbiguous", f, g)
                },
                simpleMustache: function(a) {
                    a = a.id;
                    "DATA" === a.type ? this.DATA(a) : a.parts.length ? this.ID(a) : (this.addDepth(a.depth), this.opcode("getContext", a.depth), this.opcode("pushContext"));
                    this.opcode("resolvePossibleLambda")
                },
                helperMustache: function(a, b, c) {
                    b = this.setupFullMustacheParams(a, b, c);
                    a = a.id.parts[0];
                    if (this.options.knownHelpers[a]) this.opcode("invokeKnownHelper", b.length, a);
                    else {
                        if (this.options.knownHelpersOnly) throw Error("You specified knownHelpersOnly, but used the unknown helper " + a);
                        this.opcode("invokeHelper", b.length, a)
                    }
                },
                ID: function(a) {
                    this.addDepth(a.depth);
                    this.opcode("getContext", a.depth);
                    a.parts[0] ? this.opcode("lookupOnContext", a.parts[0]) : this.opcode("pushContext");
                    for (var b = 1, c = a.parts.length; b < c; b++) this.opcode("lookup", a.parts[b])
                },
                DATA: function(b) {
                    this.options.data = !0;
                    if (b.id.isScoped || b.id.depth) throw new a("Scoped data references are not supported: " + b.original);
                    this.opcode("lookupData");
                    b = b.id.parts;
                    for (var d = 0, c = b.length; d < c; d++) this.opcode("lookup", b[d])
                },
                STRING: function(a) {
                    this.opcode("pushString", a.string)
                },
                INTEGER: function(a) {
                    this.opcode("pushLiteral", a.integer)
                },
                BOOLEAN: function(a) {
                    this.opcode("pushLiteral", a.bool)
                },
                comment: function() {},
                opcode: function(a) {
                    this.opcodes.push({
                        opcode: a,
                        args: [].slice.call(arguments, 1)
                    })
                },
                declare: function(a, b) {
                    this.opcodes.push({
                        opcode: "DECLARE",
                        name: a,
                        value: b
                    })
                },
                addDepth: function(a) {
                    if (isNaN(a)) throw Error("EWOT");
                    0 === a || this.depths[a] || (this.depths[a] = !0, this.depths.list.push(a))
                },
                classifyMustache: function(a) {
                    var b = a.isHelper,
                        c = a.eligibleHelper,
                        f = this.options;
                    c && !b && (f.knownHelpers[a.id.parts[0]] ? b = !0 : f.knownHelpersOnly && (c = !1));
                    return b ? "helper" : c ? "ambiguous" : "simple"
                },
                pushParams: function(a) {
                    for (var b = a.length, c; b--;)
                        if (c = a[b], this.options.stringParams) c.depth &&
                            this.addDepth(c.depth), this.opcode("getContext", c.depth || 0), this.opcode("pushStringParam", c.stringModeValue, c.type);
                        else this[c.type](c)
                },
                setupMustacheParams: function(a) {
                    var b = a.params;
                    this.pushParams(b);
                    a.hash ? this.hash(a.hash) : this.opcode("emptyHash");
                    return b
                },
                setupFullMustacheParams: function(a, b, c) {
                    var f = a.params;
                    this.pushParams(f);
                    this.opcode("pushProgram", b);
                    this.opcode("pushProgram", c);
                    a.hash ? this.hash(a.hash) : this.opcode("emptyHash");
                    return f
                }
            };
            v.precompile = function(b, d) {
                if (null == b || "string" !==
                    typeof b && b.constructor !== f.ProgramNode) throw new a("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + b);
                d = d || {};
                "data" in d || (d.data = !0);
                var e = w(b),
                    e = (new h).compile(e, d);
                return (new c).compile(e, d)
            };
            v.compile = function(b, d, e) {
                if (null == b || "string" !== typeof b && b.constructor !== f.ProgramNode) throw new a("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + b);
                d = d || {};
                "data" in d || (d.data = !0);
                var g;
                return function(a, f) {
                    if (!g) {
                        var p = w(b),
                            p = (new h).compile(p,
                                d),
                            p = (new c).compile(p, d, void 0, !0);
                        g = e.template(p)
                    }
                    return g.call(this, a, f)
                }
            };
            return v
        }(c, f, h, b);
    return function(a, b, c, f, h) {
        var v = c.parser,
            w = c.parse,
            u = f.Compiler,
            d = f.compile,
            e = f.precompile,
            k = a.create;
        c = function() {
            var a = k();
            a.compile = function(b, c) {
                return d(b, c, a)
            };
            a.precompile = e;
            a.AST = b;
            a.Compiler = u;
            a.JavaScriptCompiler = h;
            a.Parser = v;
            a.parse = w;
            return a
        };
        a = c();
        a.create = c;
        return a
    }(a, b, f, c, h)
}();
! function(a) {
    var b = function(a) {
            var b, c;
            return function() {
                var f = Array.prototype.slice.call(arguments);
                if (b) return c = f, void 0;
                b = !0;
                var g = this;
                f.unshift(function e() {
                    if (c) {
                        var f = c;
                        c = void 0;
                        f.unshift(e);
                        a.apply(g, f)
                    } else b = !1
                });
                a.apply(this, f)
            }
        },
        c = function() {
            var b;
            return b = a("<div></div>").css(["color"]).color, "undefined" != typeof b ? function(a, b) {
                return a.css(b)
            } : function(b, c) {
                var f;
                return f = {}, a.each(c, function(a, d) {
                    f[d] = b.css(d)
                }), f
            }
        }(),
        h = function(a) {
            return a
        },
        f = function(a) {
            var b = {};
            return function(c,
                f) {
                b[c] ? f(b[c]) : a.call(this, c, function(a) {
                    b[c] = (b[c] || []).concat(a);
                    f.apply(null, arguments)
                })
            }
        },
        p = function(a, b) {
            var c, f;
            if (a.indexOf) return -1 != a.indexOf(b);
            c = 0;
            for (f = a.length; f > c; c++)
                if (a[c] === b) return !0;
            return !1
        },
        g = function() {
            function f(b, c) {
                var g;
                this.el = b.get(0);
                g = this.el === document.activeElement;
                this.$el = b;
                this.id = "textComplete" + u++;
                this.strategies = [];
                this.option = c;
                g ? (this.initialize(), this.$el.focus()) : this.$el.one("focus.textComplete", a.proxy(this.initialize, this))
            }
            var g, h, p, u;
            return g = {
                    list: '<ul class="dropdown-menu"></ul>'
                },
                h = {
                    list: {
                        position: "absolute",
                        left: 0,
                        zIndex: "100",
                        display: "none"
                    }
                }, p = a(g.list).css(h.list), u = 0, a.extend(f.prototype, {
                    initialize: function() {
                        var b, c;
                        b = p.clone();
                        this.listView = new r(b, this);
                        this.$el.on({
                            "keyup.textComplete": a.proxy(this.onKeyup, this),
                            "keydown.textComplete": a.proxy(this.listView.onKeydown, this.listView)
                        });
                        (c = this.option.appendTo) ? this.listView.appendTo(c instanceof a ? c : a(c)) : this.listView.appendTo(a("body"));
                        (c = this.option.height) && (b.css("overflow-y", "auto"), b.height(c));
                        b = {};
                        b["click." +
                            this.id] = a.proxy(this.onClickDocument, this);
                        b["keyup." + this.id] = a.proxy(this.onKeyupDocument, this);
                        a(document).on(b)
                    },
                    register: function(a) {
                        this.strategies = this.strategies.concat(a)
                    },
                    renderList: function(a) {
                        this.clearAtNext && (this.listView.clear(), this.clearAtNext = !1);
                        a.length && (this.listView.strategy = this.strategy, this.listView.shown || this.listView.setPosition(this.getCaretPosition()).clear().activate(), a = a.slice(0, this.strategy.maxCount), this.listView.render(a));
                        !this.listView.data.length && this.listView.shown &&
                            this.listView.deactivate()
                    },
                    searchCallbackFactory: function(a) {
                        var b = this;
                        return function(c, f) {
                            b.renderList(c);
                            f || (a(), b.clearAtNext = !0)
                        }
                    },
                    onKeyup: function(a) {
                        this.skipSearch(a) || this.trigger(null, !0)
                    },
                    trigger: function(a, b) {
                        var c, f;
                        (a || (a = this.getTextFromHeadToCaret()), c = this.extractSearchQuery(a), c.length) ? (f = c[1], b && this.term === f) || (this.term = f, this.search(c)) : (this.term = null, this.listView.deactivate())
                    },
                    skipSearch: function(a) {
                        switch (a.keyCode) {
                            case 40:
                            case 38:
                                return !0
                        }
                        if (a.ctrlKey) switch (a.keyCode) {
                            case 78:
                            case 80:
                                return !0
                        }
                    },
                    onSelect: function(b) {
                        var c, f, g, h, n;
                        (c = this.getTextFromHeadToCaret(), n = c.length, this.el.isContentEditable) ? (f = window.getSelection(), f = f.getRangeAt(0), h = f.cloneRange(), h.selectNodeContents(f.startContainer), f = h.toString().substring(f.startOffset)) : f = this.el.value.substring(this.el.selectionEnd);
                        if (g = this.strategy.replace(b), a.isArray(g) && (f = g[1] + f, g = g[0]), c = c.replace(this.strategy.match, g), n -= c.length, this.el.isContentEditable) {
                            for (c = 0; n > c; ++c) document.execCommand("delete", !1);
                            f && document.execCommand("insertHTML", !1, f)
                        } else this.$el.val(c + f), this.el.selectionStart = this.el.selectionEnd = c.length;
                        this.$el.trigger("change").trigger("textComplete:select", b);
                        this.el.focus()
                    },
                    onClickDocument: function(a) {
                        a.originalEvent && !a.originalEvent.keepTextCompleteDropdown && this.listView.deactivate()
                    },
                    onKeyupDocument: function(a) {
                        this.listView.shown && 27 === a.keyCode && (this.listView.deactivate(), this.$el.focus())
                    },
                    destroy: function() {
                        this.$el.off(".textComplete");
                        a(document).off("." + this.id);
                        this.listView && this.listView.destroy();
                        this.$el.removeData("textComplete");
                        this.$el = null
                    },
                    getCaretPosition: function() {
                        var a, b;
                        return a = this.getCaretRelativePosition(), b = this.$el.offset(), a.top += b.top, a.left += b.left, a
                    },
                    getCaretRelativePosition: function() {
                        var b, e, f, g, h, n, p, r, s, v;
                        return this.el.isContentEditable ? (r = window.getSelection().getRangeAt(0).cloneRange(), s = document.createElement("span"), r.insertNode(s), r.selectNodeContents(s), r.deleteContents(), v = a(s), h = v.offset(), h.left -= this.$el.offset().left, h.top += v.height() - this.$el.offset().top) :
                            (b = "border-width font-family font-size font-style font-variant font-weight height letter-spacing word-spacing line-height text-decoration text-align width padding-top padding-right padding-bottom padding-left margin-top margin-right margin-bottom margin-left border-style box-sizing".split(" "), p = this.$el[0].scrollHeight > this.$el[0].offsetHeight, e = a.extend({
                                    position: "absolute",
                                    overflow: p ? "scroll" : "auto",
                                    "white-space": "pre-wrap",
                                    top: 0,
                                    left: -9999,
                                    direction: n
                                }, c(this.$el, b)), f = a("<div></div>").css(e).text(this.getTextFromHeadToCaret()),
                                g = a("<span></span>").text(".").appendTo(f), this.$el.before(f), h = g.position(), h.top += g.height() - this.$el.scrollTop(), f.remove()), n = this.$el.attr("dir") || this.$el.css("direction"), "rtl" === n && (h.left -= this.listView.$el.width()), h
                    },
                    getTextFromHeadToCaret: function() {
                        var a, b, c;
                        this.el.isContentEditable ? window.getSelection && (c = window.getSelection().getRangeAt(0), a = c.cloneRange(), a.selectNodeContents(c.startContainer), a = a.toString().substring(0, c.startOffset)) : (b = this.el.selectionEnd, "number" == typeof b ? a =
                            this.el.value.substring(0, b) : document.selection && (c = this.el.createTextRange(), c.moveStart("character", 0), c.moveEnd("textedit"), a = c.text));
                        return a
                    },
                    extractSearchQuery: function(a) {
                        var b, c, f, g;
                        b = 0;
                        for (c = this.strategies.length; c > b; b++)
                            if (f = this.strategies[b], g = a.match(f.match)) return [f, g[f.index]];
                        return []
                    },
                    search: b(function(a, b) {
                        this.strategy = b[0];
                        this.strategy.search(b[1], this.searchCallbackFactory(a))
                    })
                }), f
        }(),
        r = function() {
            function b(c, f) {
                this.data = [];
                this.$el = c;
                this.index = 0;
                this.completer = f;
                f.option.listPosition &&
                    (this.setPosition = f.option.listPosition);
                this.$el.on("mousedown.textComplete", "li.textcomplete-item", a.proxy(this.onClick, this));
                this.$el.on("mouseover.textComplete", "li.textcomplete-item", a.proxy(this.onMouseover, this))
            }
            return a.extend(b.prototype, {
                shown: !1,
                render: function(b) {
                    var c, f, g, d, e, h;
                    c = "";
                    this.strategy.header && (h = a.isFunction(this.strategy.header) ? this.strategy.header(b) : this.strategy.header, c += '<li class="textcomplete-header">' + h + "</li>");
                    f = 0;
                    for (g = b.length; g > f && (e = b[f], p(this.data, e) ||
                        (d = this.data.length, this.data.push(e), c += '<li class="textcomplete-item" data-index="' + d + '"><a>', c += this.strategy.template(e), c += "</a></li>", this.data.length !== this.strategy.maxCount)); f++);
                    this.strategy.footer && (h = a.isFunction(this.strategy.footer) ? this.strategy.footer(b) : this.strategy.footer, c += '<li class="textcomplete-footer">' + h + "</li>");
                    this.$el.append(c);
                    this.data.length ? (this.activateIndexedItem(), this.setScroll()) : this.deactivate()
                },
                clear: function() {
                    return this.data = [], this.$el.html(""), this.index =
                        0, this
                },
                activateIndexedItem: function() {
                    this.$el.find(".active").removeClass("active");
                    this.getActiveItem().addClass("active")
                },
                getActiveItem: function() {
                    return a(this.$el.children(".textcomplete-item").get(this.index))
                },
                activate: function() {
                    return this.shown || (this.$el.show(), this.completer.$el.trigger("textComplete:show"), this.shown = !0), this
                },
                deactivate: function() {
                    return this.shown && (this.$el.hide(), this.completer.$el.trigger("textComplete:hide"), this.shown = !1, this.data = [], this.index = null), this
                },
                setPosition: function(a) {
                    var b;
                    return -1 < this.strategy.placement.indexOf("top") ? (b = parseInt(this.$el.css("font-size")), a = {
                        top: "auto",
                        bottom: this.$el.parent().height() - a.top + b,
                        left: a.left
                    }) : a.bottom = "auto", -1 < this.strategy.placement.indexOf("absleft") && (a.left = 0), -1 < this.strategy.placement.indexOf("absright") && (a.right = 0, a.left = "auto"), this.$el.css(a), this
                },
                setScroll: function() {
                    var a = this.getActiveItem(),
                        b = a.position().top,
                        a = a.outerHeight(),
                        c = this.$el.innerHeight(),
                        f = this.$el.scrollTop();
                    0 === this.index || this.index === this.data.length -
                        1 || 0 > b ? this.$el.scrollTop(b + f) : b + a > c && this.$el.scrollTop(b + a + f - c)
                },
                select: function(a) {
                    var b = this;
                    this.completer.onSelect(this.data[a]);
                    setTimeout(function() {
                        b.deactivate()
                    }, 0)
                },
                onKeydown: function(b) {
                    if (this.shown) {
                        var c = b.ctrlKey || b.altKey || b.metaKey || b.shiftKey;
                        if (38 === b.keyCode || b.ctrlKey && 80 === b.keyCode) b.preventDefault(), 0 === this.index ? this.index = this.data.length - 1 : this.index -= 1, this.activateIndexedItem(), this.setScroll();
                        else if (40 === b.keyCode || b.ctrlKey && 78 === b.keyCode) b.preventDefault(), this.index ===
                            this.data.length - 1 ? this.index = 0 : this.index += 1, this.activateIndexedItem(), this.setScroll();
                        else if (c || 13 !== b.keyCode && 9 !== b.keyCode)
                            if (33 === b.keyCode) {
                                b.preventDefault();
                                var f = 0,
                                    g = this.getActiveItem().position().top - this.$el.innerHeight();
                                this.$el.children().each(function(b) {
                                    return a(this).position().top + a(this).outerHeight() > g ? (f = b, !1) : void 0
                                });
                                this.index = f;
                                this.activateIndexedItem();
                                this.setScroll()
                            } else 34 === b.keyCode && (b.preventDefault(), f = this.data.length - 1, g = this.getActiveItem().position().top +
                                this.$el.innerHeight(), this.$el.children().each(function(b) {
                                    return a(this).position().top > g ? (f = b, !1) : void 0
                                }), this.index = f, this.activateIndexedItem(), this.setScroll());
                        else b.preventDefault(), this.select(parseInt(this.getActiveItem().data("index"), 10))
                    }
                },
                onClick: function(b) {
                    var c = a(b.target);
                    b.preventDefault();
                    b.originalEvent.keepTextCompleteDropdown = !0;
                    c.hasClass("textcomplete-item") || (c = c.parents("li.textcomplete-item"));
                    this.select(parseInt(c.data("index"), 10))
                },
                onMouseover: function(b) {
                    var c = a(b.target);
                    b.preventDefault();
                    c.hasClass("textcomplete-item") || (c = c.parents("li.textcomplete-item"));
                    this.index = parseInt(c.data("index"), 10);
                    this.activateIndexedItem()
                },
                destroy: function() {
                    this.deactivate();
                    this.$el.off("click.textComplete").remove();
                    this.$el = null
                },
                appendTo: function(a) {
                    a.append(this.$el)
                }
            }), b
        }();
    a.fn.textcomplete = function(b, c) {
        var p, r, u;
        if (c || (c = {}), "destroy" === b) return this.each(function() {
            var b = a(this).data("textComplete");
            b && b.destroy()
        });
        p = 0;
        for (r = b.length; r > p; p++) u = b[p], u.template || (u.template =
            h), null == u.index && (u.index = 2), null == u.placement && (u.placement = ""), u.cache && (u.search = f(u.search)), u.maxCount || (u.maxCount = 10);
        return this.each(function() {
            var d, e;
            d = a(this);
            (e = d.data("textComplete")) || (e = new g(d, c), d.data("textComplete", e));
            e.register(b)
        })
    }
}(window.jQuery || window.Zepto);
var multiComplete = function(a) {
    this.opts = $.extend({}, this.defaultOpts, a);
    this.obj = null;
    this.id = "id-" + a.place.substring(1).replace(/ /, "");
    this.init()
};
multiComplete.prototype = {
    defaultOpts: {
        boxRender: !1,
        afterSuggestRender: function() {},
        extraRows: [],
        maxNotFoundSymbols: 200
    },
    init: function() {
        var a = this.opts,
            b = this;
        console.log("!opi", a);
        a.suggestAt || (a.suggestAt = a.place);
        if (a.boxRender) {
            if (this.q = $(a.place).addClass("mc-input").on("keydown", function(a) {
                38 == a.keyCode ? (b.goUp(), a.preventDefault()) : 40 == a.keyCode ? (b.goDown(), a.preventDefault()) : -1 != [13, 188].indexOf(a.keyCode) ? (a.preventDefault(), a.stopPropagation()) : 9 == a.keyCode && this.value.length && a.preventDefault()
            }).on("keyup",
                function(a) {
                    if (-1 == [37, 39].indexOf(a.keyCode) && 38 != a.keyCode && 40 != a.keyCode)
                        if (27 == a.keyCode) {
                            console.log("!esc");
                            var h = b._isopen();
                            b.hideSuggest();
                            h && (console.log("preventing"), a.preventDefault(), a.stopPropagation())
                        } else -1 != [9, 13, 188].indexOf(a.keyCode) ? b.selectCurrent() : b.suggest(this.value)
                }), console.log("initialized multicompelte", a), a.suggestOnInit) this.q.on("focus", function(a) {
                console.log("we've got the focus", b.id);
                b.suggest("", !0)
            })
        } else console.log("boxRender callback is required.")
    },
    selectCurrent: function() {
        var a =
            this._focusItem();
        console.log("iii", a);
        a && a.onSelect ? (a.onSelect(), this.val("")) : a && $(this.opts.place).val(a.name);
        this.hideSuggest();
        this.q.trigger("pctype:selected", a || !1)
    },
    selectItem: function(a) {
        this.hideSuggest();
        a && a.onSelect ? (a.onSelect(), this.val("")) : (this.q.val(a.name), this.q.trigger("pctype:selected", a))
    },
    hideSuggest: function() {
        console.log("this sdhould call clear of events!");
        console.log(arguments.callee.caller);
        this._stopEventsHide();
        this._hideSuggest()
    },
    _hideSuggest: function() {
        this.obj =
            null;
        $(".suggestbox").remove()
    },
    suggest: function(a, b) {
        console.log(arguments.callee.caller);
        console.log("sugg", this.opts);
        a = a || $(this.opts.place).val();
        if (a.length || b) {
            console.log("suggesting", a);
            kiro = this.opts.source;
            var c = this.opts,
                h = this;
            c.source.get(a, function(b, p) {
                var g = [];
                b && b.length && (g = g.concat(b));
                p && p.length && (g = g.concat(p));
                a.length || (g = g.concat(c.source.local.slice(0, 5)));
                console.log("list", g, b, p, h.opts);
                !g.length && 0 < a.length ? (console.log("hiding suggest coz no results!"), h.hideSuggest()) :
                    (h._renderSuggest(g), h._setupEventsShow())
            })
        }
    },
    _isLive: function() {
        console.log("is live", !!this.q.parent().length, this.q.is(":visible"), $.contains(document, this.q[0]));
        console.log(arguments.callee.caller);
        return !!this.q.parent().length || this.q.is(":visible") || $.contains(document, this.q[0])
    },
    _renderSuggest: function(a) {
        this._hideSuggest();
        console.log(arguments.callee.caller);
        if ((a.length || this.opts.extraRows.length) && this._isLive()) {
            this.obj = $(this._tmpl.wrap).addClass(this.id);
            this._positionObj(this.obj);
            for (var b = [], c = 0; c < a.length; ++c) b.push(a[c]);
            if (this.opts.extraRows.length)
                for (c = 0; c < this.opts.extraRows.length; ++c) b.push(this.opts.extraRows[c]);
            for (c = 0; c < b.length; ++c) this._renderElement(b[c]).data({
                n: c,
                item: b[c]
            }).appendTo(this.obj);
            this.opts.afterSuggestRender(this.obj);
            this._setupEvents();
            this.obj.appendTo(document.body)
        }
    },
    _setupEvents: function() {
        var a = this;
        this.obj.off("mouseover").on("mouseover", "div.suggestion", function(b) {
            a._mousesel($(this))
        }).off("click").on("click", "div.suggestion", function(b) {
            a._mouseclick($(this))
        }).off("mouseleave").on("mouseleave",
            function() {
                a._clearmousesel()
            })
    },
    _setupEventsShow: function() {
        var a = this;
        $(document).off("." + this.id).on("click." + this.id, function(b) {
            console.log("parento clicked", b.target);
            !a._isopen() || $(b.target).parents("." + a.id).length || $(b.target).hasClass("mc-input") || (console.log("parento closed", a.id), a.hideSuggest(), b.stopPropagation())
        });
        $(document).off("keyup." + this.id).on("keyup." + this.id, function(b) {
            console.log("sdfmhfsdkf");
            27 == b.keyCode && a._isLive() && (console.log("is living"), a.hideSuggest(), console.log("ererer"),
                b.preventDefault(), b.stopPropagation(), b.stopImmediatePropagation(), console.log("ererer #2"))
        })
    },
    _stopEventsHide: function() {
        console.log("clear events");
        $(document).off("." + this.id)
    },
    _renderElement: function(a) {
        return this.opts.boxRender(a).addClass("suggestion")
    },
    _positionObj: function(a) {
        var b = $(this.opts.suggestAt),
            c = b.offset();
        a.css({
            position: "fixed",
            top: c.top + b.outerHeight() - $(window).scrollTop(),
            left: c.left,
            width: b.outerWidth() - 5
        })
    },
    val: function(a) {
        this._hideSuggest();
        this.q.val(a);
        a.length && this.suggest(a)
    },
    goUp: function() {
        this._isopen() ? this._sel(this._prev()) : this.suggest()
    },
    goDown: function() {
        this._isopen() ? this._sel(this._next()) : this.suggest()
    },
    _isopen: function() {
        return !!this.obj
    },
    _sel: function(a) {
        a && a.length && (this._all().removeClass("sel"), $(a).addClass("sel"))
    },
    _focusItem: function() {
        if (this._isopen() && this.obj.find("div.sel").length) return this.obj.find("div.sel").data("item")
    },
    _focusVal: function() {
        if (this._isopen() && this.obj.find("div.sel").length) return this.obj.find("div.sel").data("item").name
    },
    _mousesel: function(a) {
        a && a.length && (this._all().removeClass("msel"), a.addClass("msel"))
    },
    _clearmousesel: function() {
        this._all().removeClass("msel")
    },
    _mouseclick: function(a) {
        a && a.length && this.selectItem($(a).data("item"))
    },
    _all: function() {
        return this.obj.find("div")
    },
    _first: function() {
        return this.obj.find("div:first")
    },
    _last: function() {
        return this.obj.find("div:last")
    },
    _next: function() {
        var a = this.obj.find("div.sel").next();
        return a.length ? a : this._first()
    },
    _prev: function() {
        var a = this.obj.find("div.sel").prev();
        return a.length ? a : this._last()
    },
    _tmpl: {
        wrap: '<div class="suggestbox">\n</div>',
        elem: "<div>\n{{name}}\n</div>"
    }
};
void 0 == pcloud && (pcloud = {});
pcloud.accordion = {
    get: function(a, b) {
        var c = {
            on_open: [],
            on_close: [],
            opening: !1,
            closing: !1,
            animated: !1,
            full_height: !1,
            container: "",
            key: "id",
            animation_time: 300,
            current: void 0,
            busy: function() {
                return c.opening || c.closing
            },
            opened_height: function(a) {
                if (!c.full_height) {
                    var b = 0;
                    a = $(c.container + " > div[" + c.key + "=" + a + "] > div *");
                    for (var p = 0; p < a.length; p++) b += $(a[p]).outerHeight();
                    return b + 5
                }
                a = $(c.container + " > div > h2");
                b = $(c.container).height();
                for (p = 0; p < a.length; p++) b -= $(a[p]).height();
                return b
            },
            close: function(a,
                b, p) {
                if (0 != $(c.container + " > div[" + c.key + "=" + a + "]").length && (b || (b = !1), !c.busy())) {
                    c.closing = !0;
                    for (var g in c.on_close) c.on_close[g]({
                        tab: c.current
                    });
                    b ? ($(c.container + " > div[" + c.key + "=" + a + "]").removeClass("opened"), $(c.container + " > div[" + c.key + "=" + a + "]").addClass("changing"), $(c.container + " > div[" + c.key + "=" + a + "] > div").animate({
                        height: 0
                    }, c.animation_time, "swing", function() {
                        $(c.container + " > div[" + c.key + "=" + a + "]").removeClass("changing");
                        void 0 == p && (c.current = void 0);
                        c.closing = !1;
                        void 0 != p && p()
                    })) :
                        ($(c.container + " > div[" + c.key + "=" + a + "]").removeClass("opened"), $(c.container + " > div[" + c.key + "=" + a + "] > div").height(0), void 0 == p && (c.current = void 0), c.closing = !1, void 0 != p && p())
                }
            },
            open: function(a, b) {
                if (0 != $(c.container + " > div[" + c.key + "=" + a + "]").length && !c.busy()) {
                    b || (b = !1);
                    c.opening = !0;
                    for (var p in c.on_open) c.on_open[p]({
                        new_tab: a,
                        old_tab: c.current,
                        animated: b
                    });
                    b ? ($(c.container + " > div[" + c.key + "=" + a + "]").addClass("opened changing"), $(c.container + " > div[" + c.key + "=" + a + "] > div").animate({
                            height: c.opened_height(a)
                        },
                        c.animation_time, "swing", function() {
                            $(c.container + " > div[" + c.key + "=" + a + "]").removeClass("changing");
                            c.current = a;
                            c.opening = !1
                        })) : ($(c.container + " > div[" + c.key + "=" + c.current + "]").removeClass("opened"), $(c.container + " > div[" + c.key + "=" + a + "]").addClass("opened"), $(c.container + " > div[" + c.key + "=" + a + "] > div").height(c.opened_height(a)), c.current = a, c.opening = !1)
                }
            },
            change: function(a, b) {
                console.log("arguments", arguments);
                void 0 == b && (b = c.animated);
                $(c.container + " > div[" + c.key + "=" + a + "]").hasClass("opened") ?
                    c.close(a, b) : void 0 == c.current ? c.open(a, b) : c.close(c.current, b, function() {
                        c.open(a, b)
                    })
            },
            init: function(a, b) {
                b && (b.animated && (c.animated = b.animated), b.key && (c.key = b.key), b.full_height && (c.full_height = b.full_height), b.animation_time && (c.animation_time = b.animation_time));
                c.container = a;
                $(a).addClass("pcloud-accordion");
                $(a + " > div > h2").click(function() {
                    c.change($(this).parent().attr(c.key))
                });
                $(window).off("resize.accordeon").on("resize.accordeon", function() {
                    console.log("resize.accordeon triggered");
                    if ("policies" == $.bbq.getState("page") || "help" == $.bbq.getState("page")) $(".wv.cnt-mn").length ? $(".wv.cnt-mn").css("height", $(window).outerHeight()) : $(".cnt-mn").css("height", $(window).outerHeight() - 170);
                    c.current && $(c.container + " > div[" + c.key + "=" + c.current + "] > div").height(c.opened_height())
                });
                setTimeout(function() {
                    $(window).trigger("resize")
                }, 100);
                $(a + " > div > div").height(0);
                $(a + " > div > h2").not(".no-button").append('<span class="help-close" ></span><span class="help-open" ></span>')
            }
        };
        c.init(a,
            b);
        pcloud.android_scroll.get(a + " > div > div");
        return c
    }
};
pcloud.android_scroll = {
    get: function(a) {
        var b = {
            is_touch: function() {
                if (navigator.userAgent.match(/android 3/i) || navigator.userAgent.match(/honeycomb/i)) return !1;
                try {
                    return document.createEvent("TouchEvent"), !0
                } catch (a) {
                    return !1
                }
            },
            bindings: [],
            bind: function(a) {
                if (b.is_touch()) {
                    a = $(a);
                    for (var h = 0; h < a.length; h++) b.bindings.push({
                        scrollStartPosY: 0,
                        scrollStartPosX: 0
                    }), $(a[h]).attr("scroll-id", h), a[h].addEventListener("touchstart", function(a) {
                        var c = $(this).attr("scroll-id");
                        b.bindings[c].scrollStartPosY = this.scrollTop +
                            a.touches[0].pageY;
                        b.bindings[c].scrollStartPosX = this.scrollLeft + a.touches[0].pageX
                    }, !1), a[h].addEventListener("touchmove", function(a) {
                        var c = $(this).attr("scroll-id"),
                            g = b.bindings[c].scrollStartPosY,
                            c = b.bindings[c].scrollStartPosX;
                        (this.scrollTop < this.scrollHeight - this.offsetHeight && this.scrollTop + a.touches[0].pageY < g - 5 || 0 != this.scrollTop && this.scrollTop + a.touches[0].pageY > g + 5) && a.preventDefault();
                        (this.scrollLeft < this.scrollWidth - this.offsetWidth && this.scrollLeft + a.touches[0].pageX < c - 5 || 0 != this.scrollLeft &&
                            this.scrollLeft + a.touches[0].pageX > c + 5) && a.preventDefault();
                        this.scrollTop = g - a.touches[0].pageY;
                        this.scrollLeft = c - a.touches[0].pageX
                    }, !1)
                }
            }
        };
        b.bind(a);
        return b
    }
};