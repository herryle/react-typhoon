var Hashtable = (function(u) {
    var l = "function"
      , r = "string"
      , t = "undefined";
    if (typeof encodeURIComponent == t || Array.prototype.splice === u || Object.prototype.hasOwnProperty === u) {
        return null
    }
    function s(v) {
        return (typeof v == r) ? v : "" + v
    }
    function n(w) {
        var v;
        if (typeof w == r) {
            return w
        } else {
            if (typeof w.hashCode == l) {
                v = w.hashCode();
                return (typeof v == r) ? v : n(v)
            } else {
                return s(w)
            }
        }
    }
    function p(w, x) {
        for (var v in x) {
            if (x.hasOwnProperty(v)) {
                w[v] = x[v]
            }
        }
    }
    function i(v, w) {
        return v.equals(w)
    }
    function j(v, w) {
        return (typeof w.equals == l) ? w.equals(v) : (v === w)
    }
    function f(v) {
        return function(w) {
            if (w === null) {
                throw new Error("null is not a valid " + v)
            } else {
                if (w === u) {
                    throw new Error(v + " must not be undefined")
                }
            }
        }
    }
    var b = f("key")
      , c = f("value");
    function a(y, w, x, v) {
        this[0] = y;
        this.entries = [];
        this.addEntry(w, x);
        if (v !== null) {
            this.getEqualityFunction = function() {
                return v
            }
        }
    }
    var k = 0
      , g = 1
      , h = 2;
    function e(v) {
        return function(z) {
            var y = this.entries.length, w, x = this.getEqualityFunction(z);
            while (y--) {
                w = this.entries[y];
                if (x(z, w[0])) {
                    switch (v) {
                    case k:
                        return true;
                    case g:
                        return w;
                    case h:
                        return [y, w[1]]
                    }
                }
            }
            return false
        }
    }
    function d(v) {
        return function(w) {
            var A = w.length;
            for (var y = 0, x = this.entries, z = x.length; y < z; ++y) {
                w[A + y] = x[y][v]
            }
        }
    }
    a.prototype = {
        getEqualityFunction: function(v) {
            return (typeof v.equals == l) ? i : j
        },
        getEntryForKey: e(g),
        getEntryAndIndexForKey: e(h),
        removeEntryForKey: function(v) {
            var w = this.getEntryAndIndexForKey(v);
            if (w) {
                this.entries.splice(w[0], 1);
                return w[1]
            }
            return null
        },
        addEntry: function(v, w) {
            this.entries.push([v, w])
        },
        keys: d(0),
        values: d(1),
        getEntries: function(v) {
            var z = v.length;
            for (var x = 0, w = this.entries, y = w.length; x < y; ++x) {
                v[z + x] = w[x].slice(0)
            }
        },
        containsKey: e(k),
        containsValue: function(x) {
            var v = this.entries
              , w = v.length;
            while (w--) {
                if (x === v[w][1]) {
                    return true
                }
            }
            return false
        }
    };
    function q(w, x) {
        var y = w.length, v;
        while (y--) {
            v = w[y];
            if (x === v[0]) {
                return y
            }
        }
        return null
    }
    function m(w, x) {
        var v = w[x];
        return (v && (v instanceof a)) ? v : null
    }
    function o() {
        var x = [];
        var y = {};
        var C = {
            replaceDuplicateKey: true,
            hashCode: n,
            equals: null
        };
        var v = arguments[0]
          , w = arguments[1];
        if (w !== u) {
            C.hashCode = v;
            C.equals = w
        } else {
            if (v !== u) {
                p(C, v)
            }
        }
        var B = C.hashCode
          , A = C.equals;
        this.properties = C;
        this.put = function(G, I) {
            b(G);
            c(I);
            var F = B(G), D, E, H = null;
            D = m(y, F);
            if (D) {
                E = D.getEntryForKey(G);
                if (E) {
                    if (C.replaceDuplicateKey) {
                        E[0] = G
                    }
                    H = E[1];
                    E[1] = I
                } else {
                    D.addEntry(G, I)
                }
            } else {
                D = new a(F,G,I,A);
                x.push(D);
                y[F] = D
            }
            return H
        }
        ;
        this.get = function(G) {
            b(G);
            var F = B(G);
            var D = m(y, F);
            if (D) {
                var E = D.getEntryForKey(G);
                if (E) {
                    return E[1]
                }
            }
            return null
        }
        ;
        this.containsKey = function(F) {
            b(F);
            var E = B(F);
            var D = m(y, E);
            return D ? D.containsKey(F) : false
        }
        ;
        this.containsValue = function(E) {
            c(E);
            var D = x.length;
            while (D--) {
                if (x[D].containsValue(E)) {
                    return true
                }
            }
            return false
        }
        ;
        this.clear = function() {
            x.length = 0;
            y = {}
        }
        ;
        this.isEmpty = function() {
            return !x.length
        }
        ;
        var z = function(D) {
            return function() {
                var E = []
                  , F = x.length;
                while (F--) {
                    x[F][D](E)
                }
                return E
            }
        };
        this.keys = z("keys");
        this.values = z("values");
        this.entries = z("getEntries");
        this.remove = function(G) {
            b(G);
            var F = B(G), E, H = null;
            var D = m(y, F);
            if (D) {
                H = D.removeEntryForKey(G);
                if (H !== null) {
                    if (D.entries.length == 0) {
                        E = q(x, F);
                        x.splice(E, 1);
                        delete y[F]
                    }
                }
            }
            return H
        }
        ;
        this.size = function() {
            var E = 0
              , D = x.length;
            while (D--) {
                E += x[D].entries.length
            }
            return E
        }
    }
    o.prototype = {
        each: function(v) {
            var w = this.entries(), y = w.length, x;
            while (y--) {
                x = w[y];
                v(x[0], x[1])
            }
        },
        equals: function(w) {
            var y, x, z, v = this.size();
            if (v == w.size()) {
                y = this.keys();
                while (v--) {
                    x = y[v];
                    z = w.get(x);
                    if (z === null || z !== this.get(x)) {
                        return false
                    }
                }
                return true
            }
            return false
        },
        putAll: function(z, v) {
            var w = z.entries();
            var x, B, D, C, A = w.length;
            var y = (typeof v == l);
            while (A--) {
                x = w[A];
                B = x[0];
                D = x[1];
                if (y && (C = this.get(B))) {
                    D = v(B, C, D)
                }
                this.put(B, D)
            }
        },
        clone: function() {
            var v = new o(this.properties);
            v.putAll(this);
            return v
        }
    };
    o.prototype.toQueryString = function() {
        var v = this.entries(), x = v.length, w;
        var y = [];
        while (x--) {
            w = v[x];
            y[x] = encodeURIComponent(s(w[0])) + "=" + encodeURIComponent(s(w[1]))
        }
        return y.join("&")
    }
    ;
    return o
}
)();
(function(l) {
    var m = "0.3.4", n = "hasOwnProperty", o = /[\.\/]/, p = "*", q = function() {}, r = function(c, d) {
        return c - d
    }, s, t, u = {
        n: {}
    }, v = function(g, h) {
        var i = u, j = t, k = Array.prototype.slice.call(arguments, 2), w = v.listeners(g), x = 0, y = !1, z, A = [], B = {}, C = [], D = s, E = [];
        s = g,
        t = 0;
        for (var F = 0, G = w.length; F < G; F++) {
            "zIndex"in w[F] && (A.push(w[F].zIndex),
            w[F].zIndex < 0 && (B[w[F].zIndex] = w[F]))
        }
        A.sort(r);
        while (A[x] < 0) {
            z = B[A[x++]],
            C.push(z.apply(h, k));
            if (t) {
                t = j;
                return C
            }
        }
        for (F = 0; F < G; F++) {
            z = w[F];
            if ("zIndex"in z) {
                if (z.zIndex == A[x]) {
                    C.push(z.apply(h, k));
                    if (t) {
                        break
                    }
                    do {
                        x++,
                        z = B[A[x]],
                        z && C.push(z.apply(h, k));
                        if (t) {
                            break
                        }
                    } while (z)
                } else {
                    B[z.zIndex] = z
                }
            } else {
                C.push(z.apply(h, k));
                if (t) {
                    break
                }
            }
        }
        t = j,
        s = D;
        return C.length ? C : null
    };
    v.listeners = function(d) {
        var e = d.split(o), j = u, w, x, y, z, A, B, C, D, E = [j], F = [];
        for (z = 0,
        A = e.length; z < A; z++) {
            D = [];
            for (B = 0,
            C = E.length; B < C; B++) {
                j = E[B].n,
                x = [j[e[z]], j[p]],
                y = 2;
                while (y--) {
                    w = x[y],
                    w && (D.push(w),
                    F = F.concat(w.f || []))
                }
            }
            E = D
        }
        return F
    }
    ,
    v.on = function(d, f) {
        var i = d.split(o)
          , j = u;
        for (var k = 0, w = i.length; k < w; k++) {
            j = j.n,
            !j[i[k]] && (j[i[k]] = {
                n: {}
            }),
            j = j[i[k]]
        }
        j.f = j.f || [];
        for (k = 0,
        w = j.f.length; k < w; k++) {
            if (j.f[k] == f) {
                return q
            }
        }
        j.f.push(f);
        return function(b) {
            +b == +b && (f.zIndex = +b)
        }
    }
    ,
    v.stop = function() {
        t = 1
    }
    ,
    v.nt = function(b) {
        if (b) {
            return (new RegExp("(?:\\.|\\/|^)" + b + "(?:\\.|\\/|$)")).test(s)
        }
        return s
    }
    ,
    v.off = v.unbind = function(c, d) {
        var e = c.split(o), j, w, x, y, z, A, B, C = [u];
        for (y = 0,
        z = e.length; y < z; y++) {
            for (A = 0; A < C.length; A += x.length - 2) {
                x = [A, 1],
                j = C[A].n;
                if (e[y] != p) {
                    j[e[y]] && x.push(j[e[y]])
                } else {
                    for (w in j) {
                        j[n](w) && x.push(j[w])
                    }
                }
                C.splice.apply(C, x)
            }
        }
        for (y = 0,
        z = C.length; y < z; y++) {
            j = C[y];
            while (j.n) {
                if (d) {
                    if (j.f) {
                        for (A = 0,
                        B = j.f.length; A < B; A++) {
                            if (j.f[A] == d) {
                                j.f.splice(A, 1);
                                break
                            }
                        }
                        !j.f.length && delete j.f
                    }
                    for (w in j.n) {
                        if (j.n[n](w) && j.n[w].f) {
                            var D = j.n[w].f;
                            for (A = 0,
                            B = D.length; A < B; A++) {
                                if (D[A] == d) {
                                    D.splice(A, 1);
                                    break
                                }
                            }
                            !D.length && delete j.n[w].f
                        }
                    }
                } else {
                    delete j.f;
                    for (w in j.n) {
                        j.n[n](w) && j.n[w].f && delete j.n[w].f
                    }
                }
                j = j.n
            }
        }
    }
    ,
    v.once = function(d, e) {
        var f = function() {
            var a = e.apply(this, arguments);
            v.unbind(d, f);
            return a
        };
        return v.on(d, f)
    }
    ,
    v.version = m,
    v.toString = function() {
        return "You are running Eve " + m
    }
    ,
    typeof module != "undefined" && module.exports ? module.exports = v : typeof define != "undefined" ? define("eve", [], function() {
        return v
    }) : l.eve = v
}
)(this),
function() {
    function cL(c) {
        for (var d = 0; d < c7.length; d++) {
            c7[d].el.paper == c && c7.splice(d--, 1)
        }
    }
    function cJ(c, n, s, N, T, V) {
        s = dB(s);
        var X, Z, bb, bd = [], bf, bh, bj, bl = c.ms, bm = {}, bn = {}, bo = {};
        if (N) {
            for (bq = 0,
            br = c7.length; bq < br; bq++) {
                var bp = c7[bq];
                if (bp.el.id == n.id && bp.anim == c) {
                    bp.percent != s ? (c7.splice(bq, 1),
                    bb = 1) : Z = bp,
                    n.attr(bp.totalOrigin);
                    break
                }
            }
        } else {
            N = +bn
        }
        for (var bq = 0, br = c.percents.length; bq < br; bq++) {
            if (c.percents[bq] == s || c.percents[bq] > N * c.top) {
                s = c.percents[bq],
                bh = c.percents[bq - 1] || 0,
                bl = bl / c.top * (s - bh),
                bf = c.percents[bq + 1],
                X = c.anim[s];
                break
            }
            N && n.attr(c.anim[c.percents[bq]])
        }
        if (!!X) {
            if (!Z) {
                for (var a in X) {
                    if (X[df](a)) {
                        if (dJ[df](a) || n.paper.customAttributes[df](a)) {
                            bm[a] = n.attr(a),
                            bm[a] == null && (bm[a] = dH[a]),
                            bn[a] = X[a];
                            switch (dJ[a]) {
                            case b0:
                                bo[a] = (bn[a] - bm[a]) / bl;
                                break;
                            case "colour":
                                bm[a] = ac.getRGB(bm[a]);
                                var g = ac.getRGB(bn[a]);
                                bo[a] = {
                                    r: (g.r - bm[a].r) / bl,
                                    g: (g.g - bm[a].g) / bl,
                                    b: (g.b - bm[a].b) / bl
                                };
                                break;
                            case "path":
                                var r = aS(bm[a], bn[a])
                                  , C = r[1];
                                bm[a] = r[0],
                                bo[a] = [];
                                for (bq = 0,
                                br = bm[a].length; bq < br; bq++) {
                                    bo[a][bq] = [0];
                                    for (var Q = 1, S = bm[a][bq].length; Q < S; Q++) {
                                        bo[a][bq][Q] = (C[bq][Q] - bm[a][bq][Q]) / bl
                                    }
                                }
                                break;
                            case "transform":
                                var U = n._
                                  , W = b1(U[a], bn[a]);
                                if (W) {
                                    bm[a] = W.from,
                                    bn[a] = W.to,
                                    bo[a] = [],
                                    bo[a].real = !0;
                                    for (bq = 0,
                                    br = bm[a].length; bq < br; bq++) {
                                        bo[a][bq] = [bm[a][bq][0]];
                                        for (Q = 1,
                                        S = bm[a][bq].length; Q < S; Q++) {
                                            bo[a][bq][Q] = (bn[a][bq][Q] - bm[a][bq][Q]) / bl
                                        }
                                    }
                                } else {
                                    var Y = n.matrix || new b3
                                      , ba = {
                                        _: {
                                            transform: U.transform
                                        },
                                        getBBox: function() {
                                            return n.getBBox(1)
                                        }
                                    };
                                    bm[a] = [Y.a, Y.b, Y.c, Y.d, Y.e, Y.f],
                                    ag(ba, bn[a]),
                                    bn[a] = ba._.transform,
                                    bo[a] = [(ba.matrix.a - Y.a) / bl, (ba.matrix.b - Y.b) / bl, (ba.matrix.c - Y.c) / bl, (ba.matrix.d - Y.d) / bl, (ba.matrix.e - Y.e) / bl, (ba.matrix.f - Y.f) / bl]
                                }
                                break;
                            case "csv":
                                var bc = dC(X[a])[dE](a9)
                                  , be = dC(bm[a])[dE](a9);
                                if (a == "clip-rect") {
                                    bm[a] = be,
                                    bo[a] = [],
                                    bq = be.length;
                                    while (bq--) {
                                        bo[a][bq] = (bc[bq] - bm[a][bq]) / bl
                                    }
                                }
                                bn[a] = bc;
                                break;
                            default:
                                bc = [][du](X[a]),
                                be = [][du](bm[a]),
                                bo[a] = [],
                                bq = n.paper.customAttributes[a].length;
                                while (bq--) {
                                    bo[a][bq] = ((bc[bq] || 0) - (be[bq] || 0)) / bl
                                }
                            }
                        }
                    }
                }
                var bg = X.easing
                  , bi = ac.easing_formulas[bg];
                if (!bi) {
                    bi = dC(bg).match(dv);
                    if (bi && bi.length == 5) {
                        var bk = bi;
                        bi = function(b) {
                            return b6(b, +bk[1], +bk[2], +bk[3], +bk[4], bl)
                        }
                    } else {
                        bi = at
                    }
                }
                bj = X.start || c.start || +(new Date),
                bp = {
                    anim: c,
                    percent: s,
                    timestamp: bj,
                    start: bj + (c.del || 0),
                    status: 0,
                    initstatus: N || 0,
                    stop: !1,
                    ms: bl,
                    easing: bi,
                    from: bm,
                    diff: bo,
                    to: bn,
                    el: n,
                    callback: X.callback,
                    prev: bh,
                    next: bf,
                    repeat: V || c.times,
                    origin: n.attr(),
                    totalOrigin: T
                },
                c7.push(bp);
                if (N && !Z && !bb) {
                    bp.stop = !0,
                    bp.start = new Date - bl * N;
                    if (c7.length == 1) {
                        return b2()
                    }
                }
                bb && (bp.start = new Date - bp.ms * N),
                c7.length == 1 && c8(b2)
            } else {
                Z.initstatus = N,
                Z.start = new Date - Z.ms * N
            }
            eve("raphael.anim.start." + n.id, n, c)
        }
    }
    function b8(f, g) {
        var h = []
          , i = {};
        this.ms = g,
        this.times = 1;
        if (f) {
            for (var j in f) {
                f[df](j) && (i[dB(j)] = f[j],
                h.push(dB(j)))
            }
            h.sort(ao)
        }
        this.anim = i,
        this.top = h[h.length - 1],
        this.percents = h
    }
    function b6(p, q, r, s, t, u) {
        function D(g, h) {
            var i, l, m, n, o, E;
            for (m = g,
            E = 0; E < 8; E++) {
                n = B(m) - g;
                if (dS(n) < h) {
                    return m
                }
                o = (3 * x * m + 2 * w) * m + v;
                if (dS(o) < 1e-06) {
                    break
                }
                m = m - n / o
            }
            i = 0,
            l = 1,
            m = g;
            if (m < i) {
                return i
            }
            if (m > l) {
                return l
            }
            while (i < l) {
                n = B(m);
                if (dS(n - g) < h) {
                    return m
                }
                g > n ? i = m : l = m,
                m = (l - i) / 2 + i
            }
            return m
        }
        function C(d, e) {
            var f = D(d, e);
            return ((A * f + z) * f + y) * f
        }
        function B(b) {
            return ((x * b + w) * b + v) * b
        }
        var v = 3 * q
          , w = 3 * (s - q) - v
          , x = 1 - v - w
          , y = 3 * r
          , z = 3 * (t - r) - y
          , A = 1 - y - z;
        return C(p, 1 / (200 * u))
    }
    function cZ() {
        return this.x + dA + this.y + dA + this.width + " × " + this.height
    }
    function cY() {
        return this.x + dA + this.y
    }
    function b3(g, h, i, j, k, l) {
        g != null ? (this.a = +g,
        this.b = +h,
        this.c = +i,
        this.d = +j,
        this.e = +k,
        this.f = +l) : (this.a = 1,
        this.b = 0,
        this.c = 0,
        this.d = 1,
        this.e = 0,
        this.f = 0)
    }
    function ay(a, y, z) {
        a = ac._path2curve(a),
        y = ac._path2curve(y);
        var A, B, C, D, E, F, G, H, I, J, K = z ? 0 : [];
        for (var M = 0, N = a.length; M < N; M++) {
            var O = a[M];
            if (O[0] == "M") {
                A = E = O[1],
                B = F = O[2]
            } else {
                O[0] == "C" ? (I = [A, B].concat(O.slice(1)),
                A = I[6],
                B = I[7]) : (I = [A, B, A, B, E, F, E, F],
                A = E,
                B = F);
                for (var P = 0, Q = y.length; P < Q; P++) {
                    var R = y[P];
                    if (R[0] == "M") {
                        C = G = R[1],
                        D = H = R[2]
                    } else {
                        R[0] == "C" ? (J = [C, D].concat(R.slice(1)),
                        C = J[6],
                        D = J[7]) : (J = [C, D, C, D, G, H, G, H],
                        C = G,
                        D = H);
                        var S = aw(I, J, z);
                        if (z) {
                            K += S
                        } else {
                            for (var T = 0, U = S.length; T < U; T++) {
                                S[T].segment1 = M,
                                S[T].segment2 = P,
                                S[T].bez1 = I,
                                S[T].bez2 = J
                            }
                            K = K.concat(S)
                        }
                    }
                }
            }
        }
        return K
    }
    function aw(z, B, C) {
        var D = ac.bezierBBox(z)
          , E = ac.bezierBBox(B);
        if (!ac.isBBoxIntersect(D, E)) {
            return C ? 0 : []
        }
        var F = al.apply(0, z)
          , G = al.apply(0, B)
          , H = ~~(F / 5)
          , I = ~~(G / 5)
          , J = []
          , K = []
          , M = {}
          , N = C ? 0 : [];
        for (var O = 0; O < H + 1; O++) {
            var P = ac.findDotsAtSegment.apply(ac, z.concat(O / H));
            J.push({
                x: P.x,
                y: P.y,
                t: O / H
            })
        }
        for (O = 0; O < I + 1; O++) {
            P = ac.findDotsAtSegment.apply(ac, B.concat(O / I)),
            K.push({
                x: P.x,
                y: P.y,
                t: O / I
            })
        }
        for (O = 0; O < H; O++) {
            for (var Q = 0; Q < I; Q++) {
                var R = J[O]
                  , S = J[O + 1]
                  , T = K[Q]
                  , U = K[Q + 1]
                  , V = dS(S.x - R.x) < 0.001 ? "y" : "x"
                  , W = dS(U.x - T.x) < 0.001 ? "y" : "x"
                  , X = ap(R.x, R.y, S.x, S.y, T.x, T.y, U.x, U.y);
                if (X) {
                    if (M[X.x.toFixed(4)] == X.y.toFixed(4)) {
                        continue
                    }
                    M[X.x.toFixed(4)] = X.y.toFixed(4);
                    var Y = R.t + dS((X[V] - R[V]) / (S[V] - R[V])) * (S.t - R.t)
                      , a = T.t + dS((X[W] - T[W]) / (U[W] - T[W])) * (U.t - T.t);
                    Y >= 0 && Y <= 1 && a >= 0 && a <= 1 && (C ? N++ : N.push({
                        x: X.x,
                        y: X.y,
                        t1: Y,
                        t2: a
                    }))
                }
            }
        }
        return N
    }
    function au(c, d) {
        return aw(c, d, 1)
    }
    function ar(c, d) {
        return aw(c, d)
    }
    function ap(p, q, r, s, t, u, v, w) {
        if (!(dO(p, r) < dQ(t, v) || dQ(p, r) > dO(t, v) || dO(q, s) < dQ(u, w) || dQ(q, s) > dO(u, w))) {
            var x = (p * s - q * r) * (t - v) - (p - r) * (t * w - u * v)
              , y = (p * s - q * r) * (u - w) - (q - s) * (t * w - u * v)
              , z = (p - r) * (u - w) - (q - s) * (t - v);
            if (!z) {
                return
            }
            var A = x / z
              , B = y / z
              , C = +A.toFixed(2)
              , D = +B.toFixed(2);
            if (C < +dQ(p, r).toFixed(2) || C > +dO(p, r).toFixed(2) || C < +dQ(t, v).toFixed(2) || C > +dO(t, v).toFixed(2) || D < +dQ(q, s).toFixed(2) || D > +dO(q, s).toFixed(2) || D < +dQ(u, w).toFixed(2) || D > +dO(u, w).toFixed(2)) {
                return
            }
            return {
                x: A,
                y: B
            }
        }
    }
    function an(o, p, q, r, s, t, u, v, w) {
        if (!(w < 0 || al(o, p, q, r, s, t, u, v) < w)) {
            var x = 1, y = x / 2, z = x - y, A, B = 0.01;
            A = al(o, p, q, r, s, t, u, v, z);
            while (dS(A - w) > B) {
                y /= 2,
                z += (A < w ? 1 : -1) * y,
                A = al(o, p, q, r, s, t, u, v, z)
            }
            return z
        }
    }
    function al(t, u, v, w, x, y, z, A, B) {
        B == null && (B = 1),
        B = B > 1 ? 1 : B < 0 ? 0 : B;
        var C = B / 2
          , D = 12
          , E = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816]
          , F = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472]
          , G = 0;
        for (var H = 0; H < D; H++) {
            var I = C * E[H] + C
              , J = aj(I, t, v, x, z)
              , K = aj(I, u, w, y, A)
              , M = J * J + K * K;
            G += F[H] * dM.sqrt(M)
        }
        return C * G
    }
    function aj(h, i, j, k, l) {
        var m = -3 * i + 9 * j - 9 * k + 3 * l
          , n = h * m + 6 * i - 12 * j + 6 * k;
        return h * n - 3 * i + 3 * j
    }
    function a5(g, h) {
        var i = [];
        for (var j = 0, k = g.length; k - 2 * !h > j; j += 2) {
            var l = [{
                x: +g[j - 2],
                y: +g[j - 1]
            }, {
                x: +g[j],
                y: +g[j + 1]
            }, {
                x: +g[j + 2],
                y: +g[j + 3]
            }, {
                x: +g[j + 4],
                y: +g[j + 5]
            }];
            h ? j ? k - 4 == j ? l[3] = {
                x: +g[0],
                y: +g[1]
            } : k - 2 == j && (l[2] = {
                x: +g[0],
                y: +g[1]
            },
            l[3] = {
                x: +g[2],
                y: +g[3]
            }) : l[0] = {
                x: +g[k - 2],
                y: +g[k - 1]
            } : k - 4 == j ? l[3] = l[2] : j || (l[0] = {
                x: +g[j],
                y: +g[j + 1]
            }),
            i.push(["C", (-l[0].x + 6 * l[1].x + l[2].x) / 6, (-l[0].y + 6 * l[1].y + l[2].y) / 6, (l[1].x + 6 * l[2].x - l[3].x) / 6, (l[1].y + 6 * l[2].y - l[3].y) / 6, l[2].x, l[2].y])
        }
        return i
    }
    function a3() {
        return this.hex
    }
    function aZ(e, f, g) {
        function h() {
            var a = Array.prototype.slice.call(arguments, 0)
              , b = a.join("␀")
              , c = h.cache = h.cache || {}
              , d = h.count = h.count || [];
            if (c[df](b)) {
                aX(d, b);
                return g ? g(c[b]) : c[b]
            }
            d.length >= 1000 && delete c[d.shift()],
            d.push(b),
            c[b] = e[ds](f, a);
            return g ? g(c[b]) : c[b]
        }
        return h
    }
    function aX(e, f) {
        for (var g = 0, h = e.length; g < h; g++) {
            if (e[g] === f) {
                return e.push(e.splice(g, 1)[0])
            }
        }
    }
    function aH(d) {
        if (Object(d) !== d) {
            return d
        }
        var e = new d.constructor;
        for (var f in d) {
            d[df](f) && (e[f] = aH(d[f]))
        }
        return e
    }
    function ac(a) {
        if (ac.is(a, "function")) {
            return ae ? a() : eve.on("raphael.DOMload", a)
        }
        if (ac.is(a, dc)) {
            return ac._engine.create[ds](ac, a.splice(0, 3 + ac.is(a[0], b0))).add(a)
        }
        var b = Array.prototype.slice.call(arguments, 0);
        if (ac.is(b[b.length - 1], "function")) {
            var f = b.pop();
            return ae ? f.call(ac._engine.create[ds](ac, b)) : eve.on("raphael.DOMload", function() {
                f.call(ac._engine.create[ds](ac, b))
            })
        }
        return ac._engine.create[ds](ac, arguments)
    }
    ac.version = "2.1.0",
    ac.eve = eve;
    var ae, a9 = /[, ]+/, c9 = {
        circle: 1,
        rect: 1,
        path: 1,
        ellipse: 1,
        text: 1,
        image: 1
    }, db = /\{(\d+)\}/g, dd = "prototype", df = "hasOwnProperty", dh = {
        doc: document,
        win: window
    }, dj = {
        was: Object.prototype[df].call(dh.win, "Raphael"),
        is: dh.win.Raphael
    }, dl = function() {
        this.ca = this.customAttributes = {}
    }, dn, dq = "appendChild", ds = "apply", du = "concat", dw = "createTouch"in dh.doc, dy = "", dA = " ", dC = String, dE = "split", dG = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[dE](dA), dI = {
        mousedown: "touchstart",
        mousemove: "touchmove",
        mouseup: "touchend"
    }, dK = dC.prototype.toLowerCase, dM = Math, dO = dM.max, dQ = dM.min, dS = dM.abs, ad = dM.pow, af = dM.PI, b0 = "number", da = "string", dc = "array", de = "toString", dg = "fill", di = Object.prototype.toString, dk = {}, dm = "push", dp = ac._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, dr = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i, dt = {
        NaN: 1,
        Infinity: 1,
        "-Infinity": 1
    }, dv = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, dx = dM.round, dz = "setAttribute", dB = parseFloat, dD = parseInt, dF = dC.prototype.toUpperCase, dH = ac._availableAttrs = {
        "arrow-end": "none",
        "arrow-start": "none",
        blur: 0,
        "clip-rect": "0 0 1e9 1e9",
        cursor: "default",
        cx: 0,
        cy: 0,
        fill: "#fff",
        "fill-opacity": 1,
        font: '10px "Arial"',
        "font-family": '"Arial"',
        "font-size": "10",
        "font-style": "normal",
        "font-weight": 400,
        gradient: 0,
        height: 0,
        href: "http://raphaeljs.com/",
        "letter-spacing": 0,
        opacity: 1,
        path: "M0,0",
        r: 0,
        rx: 0,
        ry: 0,
        src: "",
        stroke: "#000",
        "stroke-dasharray": "",
        "stroke-linecap": "butt",
        "stroke-linejoin": "butt",
        "stroke-miterlimit": 0,
        "stroke-opacity": 1,
        "stroke-width": 1,
        target: "_blank",
        "text-anchor": "middle",
        title: "Raphael",
        transform: "",
        width: 0,
        x: 0,
        y: 0
    }, dJ = ac._availableAnimAttrs = {
        blur: b0,
        "clip-rect": "csv",
        cx: b0,
        cy: b0,
        fill: "colour",
        "fill-opacity": b0,
        "font-size": b0,
        height: b0,
        opacity: b0,
        path: "path",
        r: b0,
        rx: b0,
        ry: b0,
        stroke: "colour",
        "stroke-opacity": b0,
        "stroke-width": b0,
        transform: "transform",
        width: b0,
        x: b0,
        y: b0
    }, dL = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g, dN = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, dP = {
        hs: 1,
        rg: 1
    }, dR = /,?([achlmqrstvxz]),?/gi, dT = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig, aa = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig, ab = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig, ai = ac._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, ak = {}, am = function(c, d) {
        return c.key - d.key
    }, ao = function(c, d) {
        return dB(c) - dB(d)
    }, aq = function() {}, at = function(b) {
        return b
    }, av = ac._rectPath = function(f, g, h, i, j) {
        if (j) {
            return [["M", f + j, g], ["l", h - j * 2, 0], ["a", j, j, 0, 0, 1, j, j], ["l", 0, i - j * 2], ["a", j, j, 0, 0, 1, -j, j], ["l", j * 2 - h, 0], ["a", j, j, 0, 0, 1, -j, -j], ["l", 0, j * 2 - i], ["a", j, j, 0, 0, 1, j, -j], ["z"]]
        }
        return [["M", f, g], ["l", h, 0], ["l", 0, i], ["l", -h, 0], ["z"]]
    }
    , ax = function(e, f, g, h) {
        h == null && (h = g);
        return [["M", e, f], ["m", 0, -h], ["a", g, h, 0, 1, 1, 0, 2 * h], ["a", g, h, 0, 1, 1, 0, -2 * h], ["z"]]
    }, az = ac._getPath = {
        path: function(b) {
            return b.attr("path")
        },
        circle: function(c) {
            var d = c.attrs;
            return ax(d.cx, d.cy, d.r)
        },
        ellipse: function(c) {
            var d = c.attrs;
            return ax(d.cx, d.cy, d.rx, d.ry)
        },
        rect: function(c) {
            var d = c.attrs;
            return av(d.x, d.y, d.width, d.height, d.r)
        },
        image: function(c) {
            var d = c.attrs;
            return av(d.x, d.y, d.width, d.height)
        },
        text: function(c) {
            var d = c._getBBox();
            return av(d.x, d.y, d.width, d.height)
        }
    }, aB = ac.mapPath = function(j, k) {
        if (!k) {
            return j
        }
        var l, m, n, o, p, q, r;
        j = aS(j);
        for (n = 0,
        p = j.length; n < p; n++) {
            r = j[n];
            for (o = 1,
            q = r.length; o < q; o += 2) {
                l = k.x(r[o], r[o + 1]),
                m = k.y(r[o], r[o + 1]),
                r[o] = l,
                r[o + 1] = m
            }
        }
        return j
    }
    ;
    ac._g = dh,
    ac.type = dh.win.SVGAngle || dh.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
    if (ac.type == "VML") {
        var aD = dh.doc.createElement("div"), aF;
        aD.innerHTML = '<v:shape adj="1"/>',
        aF = aD.firstChild,
        aF.style.behavior = "url(#default#VML)";
        if (!aF || typeof aF.adj != "object") {
            return ac.type = dy
        }
        aD = null
    }
    ac.svg = !(ac.vml = ac.type == "VML"),
    ac._Paper = dl,
    ac.fn = dn = dl.prototype = ac.prototype,
    ac._id = 0,
    ac._oid = 0,
    ac.is = function(c, d) {
        d = dK.call(d);
        if (d == "finite") {
            return !dt[df](+c)
        }
        if (d == "array") {
            return c instanceof Array
        }
        return d == "null" && c === null || d == typeof c && c !== null || d == "object" && c === Object(c) || d == "array" && Array.isArray && Array.isArray(c) || di.call(c).slice(8, -1).toLowerCase() == d
    }
    ,
    ac.angle = function(a, j, k, l, m, n) {
        if (m == null) {
            var o = a - k
              , p = j - l;
            if (!o && !p) {
                return 0
            }
            return (180 + dM.atan2(-p, -o) * 180 / af + 360) % 360
        }
        return ac.angle(a, j, m, n) - ac.angle(k, l, m, n)
    }
    ,
    ac.rad = function(b) {
        return b % 360 * af / 180
    }
    ,
    ac.deg = function(b) {
        return b * 180 / af % 360
    }
    ,
    ac.snapTo = function(a, g, h) {
        h = ac.is(h, "finite") ? h : 10;
        if (ac.is(a, dc)) {
            var i = a.length;
            while (i--) {
                if (dS(a[i] - g) <= h) {
                    return a[i]
                }
            }
        } else {
            a = +a;
            var j = g % a;
            if (j < h) {
                return g - j
            }
            if (j > a - h) {
                return g - j + a
            }
        }
        return g
    }
    ;
    var aJ = ac.createUUID = function(c, d) {
        return function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(c, d).toUpperCase()
        }
    }(/[xy]/g, function(d) {
        var e = dM.random() * 16 | 0
          , f = d == "x" ? e : e & 3 | 8;
        return f.toString(16)
    });
    ac.setWindow = function(a) {
        eve("raphael.setWindow", ac, dh.win, a),
        dh.win = a,
        dh.doc = dh.win.document,
        ac._engine.initWin && ac._engine.initWin(dh.win)
    }
    ;
    var aL = function(a) {
        if (ac.vml) {
            var h = /^\s+|\s+$/g, j;
            try {
                var k = new ActiveXObject("htmlfile");
                k.write("<body>"),
                k.close(),
                j = k.body
            } catch (l) {
                j = createPopup().document.body
            }
            var m = j.createTextRange();
            aL = aZ(function(c) {
                try {
                    j.style.color = dC(c).replace(h, dy);
                    var d = m.queryCommandValue("ForeColor");
                    d = (d & 255) << 16 | d & 65280 | (d & 16711680) >>> 16;
                    return "#" + ("000000" + d.toString(16)).slice(-6)
                } catch (f) {
                    return "none"
                }
            })
        } else {
            var n = dh.doc.createElement("i");
            n.title = "Raphaël Colour Picker",
            n.style.display = "none",
            dh.doc.body.appendChild(n),
            aL = aZ(function(b) {
                n.style.color = b;
                return dh.doc.defaultView.getComputedStyle(n, dy).getPropertyValue("color")
            })
        }
        return aL(a)
    }
      , aN = function() {
        return "hsb(" + [this.h, this.s, this.b] + ")"
    }
      , aP = function() {
        return "hsl(" + [this.h, this.s, this.l] + ")"
    }
      , aR = function() {
        return this.hex
    }
      , aT = function(a, f, g) {
        f == null && ac.is(a, "object") && "r"in a && "g"in a && "b"in a && (g = a.b,
        f = a.g,
        a = a.r);
        if (f == null && ac.is(a, da)) {
            var h = ac.getRGB(a);
            a = h.r,
            f = h.g,
            g = h.b
        }
        if (a > 1 || f > 1 || g > 1) {
            a /= 255,
            f /= 255,
            g /= 255
        }
        return [a, f, g]
    }
      , aV = function(a, g, h, i) {
        a *= 255,
        g *= 255,
        h *= 255;
        var j = {
            r: a,
            g: g,
            b: h,
            hex: ac.rgb(a, g, h),
            toString: aR
        };
        ac.is(i, "finite") && (j.opacity = i);
        return j
    };
    ac.color = function(a) {
        var d;
        ac.is(a, "object") && "h"in a && "s"in a && "b"in a ? (d = ac.hsb2rgb(a),
        a.r = d.r,
        a.g = d.g,
        a.b = d.b,
        a.hex = d.hex) : ac.is(a, "object") && "h"in a && "s"in a && "l"in a ? (d = ac.hsl2rgb(a),
        a.r = d.r,
        a.g = d.g,
        a.b = d.b,
        a.hex = d.hex) : (ac.is(a, "string") && (a = ac.getRGB(a)),
        ac.is(a, "object") && "r"in a && "g"in a && "b"in a ? (d = ac.rgb2hsl(a),
        a.h = d.h,
        a.s = d.s,
        a.l = d.l,
        d = ac.rgb2hsb(a),
        a.v = d.b) : (a = {
            hex: "none"
        },
        a.r = a.g = a.b = a.h = a.s = a.v = a.l = -1)),
        a.toString = aR;
        return a
    }
    ,
    ac.hsb2rgb = function(j, k, l, m) {
        this.is(j, "object") && "h"in j && "s"in j && "b"in j && (l = j.b,
        k = j.s,
        j = j.h,
        m = j.o),
        j *= 360;
        var n, o, p, q, r;
        j = j % 360 / 60,
        r = l * k,
        q = r * (1 - dS(j % 2 - 1)),
        n = o = p = l - r,
        j = ~~j,
        n += [r, q, 0, 0, q, r][j],
        o += [q, r, r, q, 0, 0][j],
        p += [0, 0, q, r, r, q][j];
        return aV(n, o, p, m)
    }
    ,
    ac.hsl2rgb = function(j, k, l, m) {
        this.is(j, "object") && "h"in j && "s"in j && "l"in j && (l = j.l,
        k = j.s,
        j = j.h);
        if (j > 1 || k > 1 || l > 1) {
            j /= 360,
            k /= 100,
            l /= 100
        }
        j *= 360;
        var n, o, p, q, r;
        j = j % 360 / 60,
        r = 2 * k * (l < 0.5 ? l : 1 - l),
        q = r * (1 - dS(j % 2 - 1)),
        n = o = p = l - r / 2,
        j = ~~j,
        n += [r, q, 0, 0, q, r][j],
        o += [q, r, r, q, 0, 0][j],
        p += [0, 0, q, r, r, q][j];
        return aV(n, o, p, m)
    }
    ,
    ac.rgb2hsb = function(h, i, j) {
        j = aT(h, i, j),
        h = j[0],
        i = j[1],
        j = j[2];
        var k, l, m, n;
        m = dO(h, i, j),
        n = m - dQ(h, i, j),
        k = n == 0 ? null : m == h ? (i - j) / n : m == i ? (j - h) / n + 2 : (h - i) / n + 4,
        k = (k + 360) % 6 * 60 / 360,
        l = n == 0 ? 0 : n / m;
        return {
            h: k,
            s: l,
            b: m,
            toString: aN
        }
    }
    ,
    ac.rgb2hsl = function(j, k, l) {
        l = aT(j, k, l),
        j = l[0],
        k = l[1],
        l = l[2];
        var m, n, o, p, q, r;
        p = dO(j, k, l),
        q = dQ(j, k, l),
        r = p - q,
        m = r == 0 ? null : p == j ? (k - l) / r : p == k ? (l - j) / r + 2 : (j - k) / r + 4,
        m = (m + 360) % 6 * 60 / 360,
        o = (p + q) / 2,
        n = r == 0 ? 0 : o < 0.5 ? r / (2 * o) : r / (2 - 2 * o);
        return {
            h: m,
            s: n,
            l: o,
            toString: aP
        }
    }
    ,
    ac._path2string = function() {
        return this.join(",").replace(dR, "$1")
    }
    ;
    var a1 = ac._preload = function(d, e) {
        var f = dh.doc.createElement("img");
        f.style.cssText = "position:absolute;left:-9999em;top:-9999em",
        f.onload = function() {
            e.call(this),
            this.onload = null,
            dh.doc.body.removeChild(this)
        }
        ,
        f.onerror = function() {
            dh.doc.body.removeChild(this)
        }
        ,
        dh.doc.body.appendChild(f),
        f.src = d
    }
    ;
    ac.getRGB = aZ(function(a) {
        if (!a || !!((a = dC(a)).indexOf("-") + 1)) {
            return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1,
                toString: a3
            }
        }
        if (a == "none") {
            return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                toString: a3
            }
        }
        !dP[df](a.toLowerCase().substring(0, 2)) && a.charAt() != "#" && (a = aL(a));
        var g, l, m, n, o, p, q, r = a.match(dr);
        if (r) {
            r[2] && (n = dD(r[2].substring(5), 16),
            m = dD(r[2].substring(3, 5), 16),
            l = dD(r[2].substring(1, 3), 16)),
            r[3] && (n = dD((p = r[3].charAt(3)) + p, 16),
            m = dD((p = r[3].charAt(2)) + p, 16),
            l = dD((p = r[3].charAt(1)) + p, 16)),
            r[4] && (q = r[4][dE](dN),
            l = dB(q[0]),
            q[0].slice(-1) == "%" && (l *= 2.55),
            m = dB(q[1]),
            q[1].slice(-1) == "%" && (m *= 2.55),
            n = dB(q[2]),
            q[2].slice(-1) == "%" && (n *= 2.55),
            r[1].toLowerCase().slice(0, 4) == "rgba" && (o = dB(q[3])),
            q[3] && q[3].slice(-1) == "%" && (o /= 100));
            if (r[5]) {
                q = r[5][dE](dN),
                l = dB(q[0]),
                q[0].slice(-1) == "%" && (l *= 2.55),
                m = dB(q[1]),
                q[1].slice(-1) == "%" && (m *= 2.55),
                n = dB(q[2]),
                q[2].slice(-1) == "%" && (n *= 2.55),
                (q[0].slice(-3) == "deg" || q[0].slice(-1) == "°") && (l /= 360),
                r[1].toLowerCase().slice(0, 4) == "hsba" && (o = dB(q[3])),
                q[3] && q[3].slice(-1) == "%" && (o /= 100);
                return ac.hsb2rgb(l, m, n, o)
            }
            if (r[6]) {
                q = r[6][dE](dN),
                l = dB(q[0]),
                q[0].slice(-1) == "%" && (l *= 2.55),
                m = dB(q[1]),
                q[1].slice(-1) == "%" && (m *= 2.55),
                n = dB(q[2]),
                q[2].slice(-1) == "%" && (n *= 2.55),
                (q[0].slice(-3) == "deg" || q[0].slice(-1) == "°") && (l /= 360),
                r[1].toLowerCase().slice(0, 4) == "hsla" && (o = dB(q[3])),
                q[3] && q[3].slice(-1) == "%" && (o /= 100);
                return ac.hsl2rgb(l, m, n, o)
            }
            r = {
                r: l,
                g: m,
                b: n,
                toString: a3
            },
            r.hex = "#" + (16777216 | n | m << 8 | l << 16).toString(16).slice(1),
            ac.is(o, "finite") && (r.opacity = o);
            return r
        }
        return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: a3
        }
    }, ac),
    ac.hsb = aZ(function(a, e, f) {
        return ac.hsb2rgb(a, e, f).hex
    }),
    ac.hsl = aZ(function(a, e, f) {
        return ac.hsl2rgb(a, e, f).hex
    }),
    ac.rgb = aZ(function(d, e, f) {
        return "#" + (16777216 | f | e << 8 | d << 16).toString(16).slice(1)
    }),
    ac.getColor = function(d) {
        var e = this.getColor.start = this.getColor.start || {
            h: 0,
            s: 1,
            b: d || 0.75
        }
          , f = this.hsb2rgb(e.h, e.s, e.b);
        e.h += 0.075,
        e.h > 1 && (e.h = 0,
        e.s -= 0.2,
        e.s <= 0 && (this.getColor.start = {
            h: 0,
            s: 1,
            b: e.b
        }));
        return f.hex
    }
    ,
    ac.getColor.reset = function() {
        delete this.start
    }
    ,
    ac.parsePathString = function(a) {
        if (!a) {
            return null
        }
        var f = a7(a);
        if (f.arr) {
            return aC(f.arr)
        }
        var g = {
            a: 7,
            c: 6,
            h: 1,
            l: 2,
            m: 2,
            r: 4,
            q: 4,
            s: 4,
            t: 2,
            v: 1,
            z: 0
        }
          , h = [];
        ac.is(a, dc) && ac.is(a[0], dc) && (h = aC(a)),
        h.length || dC(a).replace(dT, function(d, e, i) {
            var j = []
              , k = e.toLowerCase();
            i.replace(ab, function(c, l) {
                l && j.push(+l)
            }),
            k == "m" && j.length > 2 && (h.push([e][du](j.splice(0, 2))),
            k = "l",
            e = e == "m" ? "l" : "L");
            if (k == "r") {
                h.push([e][du](j))
            } else {
                while (j.length >= g[k]) {
                    h.push([e][du](j.splice(0, g[k])));
                    if (!g[k]) {
                        break
                    }
                }
            }
        }),
        h.toString = ac._path2string,
        f.arr = aC(h);
        return h
    }
    ,
    ac.parseTransformString = aZ(function(a) {
        if (!a) {
            return null
        }
        var e = {
            r: 3,
            s: 4,
            t: 2,
            m: 6
        }
          , f = [];
        ac.is(a, dc) && ac.is(a[0], dc) && (f = aC(a)),
        f.length || dC(a).replace(aa, function(d, g, h) {
            var i = []
              , j = dK.call(g);
            h.replace(ab, function(c, k) {
                k && i.push(+k)
            }),
            f.push([g][du](i))
        }),
        f.toString = ac._path2string;
        return f
    });
    var a7 = function(c) {
        var d = a7.ps = a7.ps || {};
        d[c] ? d[c].sleep = 100 : d[c] = {
            sleep: 100
        },
        setTimeout(function() {
            for (var a in d) {
                d[df](a) && a != c && (d[a].sleep--,
                !d[a].sleep && delete d[a])
            }
        });
        return d[c]
    };
    ac.findDotsAtSegment = function(w, A, B, C, D, E, F, G, H) {
        var I = 1 - H
          , J = ad(I, 3)
          , K = ad(I, 2)
          , M = H * H
          , N = M * H
          , O = J * w + K * 3 * H * B + I * 3 * H * H * D + N * F
          , P = J * A + K * 3 * H * C + I * 3 * H * H * E + N * G
          , Q = w + 2 * H * (B - w) + M * (D - 2 * B + w)
          , R = A + 2 * H * (C - A) + M * (E - 2 * C + A)
          , S = B + 2 * H * (D - B) + M * (F - 2 * D + B)
          , T = C + 2 * H * (E - C) + M * (G - 2 * E + C)
          , U = I * w + H * B
          , V = I * A + H * C
          , W = I * D + H * F
          , X = I * E + H * G
          , Y = 90 - dM.atan2(Q - S, R - T) * 180 / af;
        (Q > S || R < T) && (Y += 180);
        return {
            x: O,
            y: P,
            m: {
                x: Q,
                y: R
            },
            n: {
                x: S,
                y: T
            },
            start: {
                x: U,
                y: V
            },
            end: {
                x: W,
                y: X
            },
            alpha: Y
        }
    }
    ,
    ac.bezierBBox = function(a, k, l, m, n, o, p, q) {
        ac.is(a, "array") || (a = [a, k, l, m, n, o, p, q]);
        var r = aQ.apply(null, a);
        return {
            x: r.min.x,
            y: r.min.y,
            x2: r.max.x,
            y2: r.max.y,
            width: r.max.x - r.min.x,
            height: r.max.y - r.min.y
        }
    }
    ,
    ac.isPointInsideBBox = function(d, e, f) {
        return e >= d.x && e <= d.x2 && f >= d.y && f <= d.y2
    }
    ,
    ac.isBBoxIntersect = function(a, e) {
        var f = ac.isPointInsideBBox;
        return f(e, a.x, a.y) || f(e, a.x2, a.y) || f(e, a.x, a.y2) || f(e, a.x2, a.y2) || f(a, e.x, e.y) || f(a, e.x2, e.y) || f(a, e.x, e.y2) || f(a, e.x2, e.y2) || (a.x < e.x2 && a.x > e.x || e.x < a.x2 && e.x > a.x) && (a.y < e.y2 && a.y > e.y || e.y < a.y2 && e.y > a.y)
    }
    ,
    ac.pathIntersection = function(c, d) {
        return ay(c, d)
    }
    ,
    ac.pathIntersectionNumber = function(c, d) {
        return ay(c, d, 1)
    }
    ,
    ac.isPointInsidePath = function(a, f, g) {
        var h = ac.pathBBox(a);
        return ac.isPointInsideBBox(h, f, g) && ay(a, [["M", f, g], ["H", h.x2 + 10]], 1) % 2 == 1
    }
    ,
    ac._removedFactory = function(b) {
        return function() {
            eve("raphael.log", null, "Raphaël: you are calling to method “" + b + "” of removed object", b)
        }
    }
    ;
    var aA = ac.pathBBox = function(m) {
        var n = a7(m);
        if (n.bbox) {
            return n.bbox
        }
        if (!m) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                x2: 0,
                y2: 0
            }
        }
        m = aS(m);
        var r = 0, s = 0, t = [], u = [], v;
        for (var w = 0, x = m.length; w < x; w++) {
            v = m[w];
            if (v[0] == "M") {
                r = v[1],
                s = v[2],
                t.push(r),
                u.push(s)
            } else {
                var y = aQ(r, s, v[1], v[2], v[3], v[4], v[5], v[6]);
                t = t[du](y.min.x, y.max.x),
                u = u[du](y.min.y, y.max.y),
                r = v[5],
                s = v[6]
            }
        }
        var z = dQ[ds](0, t)
          , A = dQ[ds](0, u)
          , B = dO[ds](0, t)
          , C = dO[ds](0, u)
          , D = {
            x: z,
            y: A,
            x2: B,
            y2: C,
            width: B - z,
            height: C - A
        };
        n.bbox = aH(D);
        return D
    }
      , aC = function(a) {
        var d = aH(a);
        d.toString = ac._path2string;
        return d
    }
      , aE = ac._pathToRelative = function(a) {
        var s = a7(a);
        if (s.rel) {
            return aC(s.rel)
        }
        if (!ac.is(a, dc) || !ac.is(a && a[0], dc)) {
            a = ac.parsePathString(a)
        }
        var t = []
          , u = 0
          , v = 0
          , w = 0
          , x = 0
          , y = 0;
        a[0][0] == "M" && (u = a[0][1],
        v = a[0][2],
        w = u,
        x = v,
        y++,
        t.push(["M", u, v]));
        for (var z = y, A = a.length; z < A; z++) {
            var B = t[z] = []
              , C = a[z];
            if (C[0] != dK.call(C[0])) {
                B[0] = dK.call(C[0]);
                switch (B[0]) {
                case "a":
                    B[1] = C[1],
                    B[2] = C[2],
                    B[3] = C[3],
                    B[4] = C[4],
                    B[5] = C[5],
                    B[6] = +(C[6] - u).toFixed(3),
                    B[7] = +(C[7] - v).toFixed(3);
                    break;
                case "v":
                    B[1] = +(C[1] - v).toFixed(3);
                    break;
                case "m":
                    w = C[1],
                    x = C[2];
                default:
                    for (var D = 1, E = C.length; D < E; D++) {
                        B[D] = +(C[D] - (D % 2 ? u : v)).toFixed(3)
                    }
                }
            } else {
                B = t[z] = [],
                C[0] == "m" && (w = C[1] + u,
                x = C[2] + v);
                for (var F = 0, G = C.length; F < G; F++) {
                    t[z][F] = C[F]
                }
            }
            var H = t[z].length;
            switch (t[z][0]) {
            case "z":
                u = w,
                v = x;
                break;
            case "h":
                u += +t[z][H - 1];
                break;
            case "v":
                v += +t[z][H - 1];
                break;
            default:
                u += +t[z][H - 2],
                v += +t[z][H - 1]
            }
        }
        t.toString = ac._path2string,
        s.rel = aC(t);
        return t
    }
      , aG = ac._pathToAbsolute = function(a) {
        var n = a7(a);
        if (n.abs) {
            return aC(n.abs)
        }
        if (!ac.is(a, dc) || !ac.is(a && a[0], dc)) {
            a = ac.parsePathString(a)
        }
        if (!a || !a.length) {
            return [["M", 0, 0]]
        }
        var u = []
          , v = 0
          , w = 0
          , x = 0
          , y = 0
          , z = 0;
        a[0][0] == "M" && (v = +a[0][1],
        w = +a[0][2],
        x = v,
        y = w,
        z++,
        u[0] = ["M", v, w]);
        var A = a.length == 3 && a[0][0] == "M" && a[1][0].toUpperCase() == "R" && a[2][0].toUpperCase() == "Z";
        for (var B, C, D = z, E = a.length; D < E; D++) {
            u.push(B = []),
            C = a[D];
            if (C[0] != dF.call(C[0])) {
                B[0] = dF.call(C[0]);
                switch (B[0]) {
                case "A":
                    B[1] = C[1],
                    B[2] = C[2],
                    B[3] = C[3],
                    B[4] = C[4],
                    B[5] = C[5],
                    B[6] = +(C[6] + v),
                    B[7] = +(C[7] + w);
                    break;
                case "V":
                    B[1] = +C[1] + w;
                    break;
                case "H":
                    B[1] = +C[1] + v;
                    break;
                case "R":
                    var F = [v, w][du](C.slice(1));
                    for (var G = 2, H = F.length; G < H; G++) {
                        F[G] = +F[G] + v,
                        F[++G] = +F[G] + w
                    }
                    u.pop(),
                    u = u[du](a5(F, A));
                    break;
                case "M":
                    x = +C[1] + v,
                    y = +C[2] + w;
                default:
                    for (G = 1,
                    H = C.length; G < H; G++) {
                        B[G] = +C[G] + (G % 2 ? v : w)
                    }
                }
            } else {
                if (C[0] == "R") {
                    F = [v, w][du](C.slice(1)),
                    u.pop(),
                    u = u[du](a5(F, A)),
                    B = ["R"][du](C.slice(-2))
                } else {
                    for (var I = 0, J = C.length; I < J; I++) {
                        B[I] = C[I]
                    }
                }
            }
            switch (B[0]) {
            case "Z":
                v = x,
                w = y;
                break;
            case "H":
                v = B[1];
                break;
            case "V":
                w = B[1];
                break;
            case "M":
                x = B[B.length - 2],
                y = B[B.length - 1];
            default:
                v = B[B.length - 2],
                w = B[B.length - 1]
            }
        }
        u.toString = ac._path2string,
        n.abs = aC(u);
        return u
    }
      , aI = function(e, f, g, h) {
        return [e, f, g, h, g, h]
    }
      , aK = function(i, j, k, l, m, n) {
        var o = 1 / 3
          , p = 2 / 3;
        return [o * i + p * k, o * j + p * l, o * m + p * k, o * n + p * l, m, n]
    }
      , aM = function(n, w, z, Y, ba, bc, be, bg, bi, bk) {
        var bm = af * 120 / 180, bo = af / 180 * (+ba || 0), bq = [], bt, bv = aZ(function(f, g, h) {
            var i = f * dM.cos(h) - g * dM.sin(h)
              , j = f * dM.sin(h) + g * dM.cos(h);
            return {
                x: i,
                y: j
            }
        });
        if (!bk) {
            bt = bv(n, w, -bo),
            n = bt.x,
            w = bt.y,
            bt = bv(bg, bi, -bo),
            bg = bt.x,
            bi = bt.y;
            var bx = dM.cos(af / 180 * ba)
              , bz = dM.sin(af / 180 * ba)
              , bC = (n - bg) / 2
              , bE = (w - bi) / 2
              , bG = bC * bC / (z * z) + bE * bE / (Y * Y);
            bG > 1 && (bG = dM.sqrt(bG),
            z = bG * z,
            Y = bG * Y);
            var bJ = z * z
              , bL = Y * Y
              , s = (bc == be ? -1 : 1) * dM.sqrt(dS((bJ * bL - bJ * bE * bE - bL * bC * bC) / (bJ * bE * bE + bL * bC * bC)))
              , B = s * z * bE / Y + (n + bg) / 2
              , Z = s * -Y * bC / z + (w + bi) / 2
              , bb = dM.asin(((w - Z) / Y).toFixed(9))
              , bd = dM.asin(((bi - Z) / Y).toFixed(9));
            bb = n < B ? af - bb : bb,
            bd = bg < B ? af - bd : bd,
            bb < 0 && (bb = af * 2 + bb),
            bd < 0 && (bd = af * 2 + bd),
            be && bb > bd && (bb = bb - af * 2),
            !be && bd > bb && (bd = bd - af * 2)
        } else {
            bb = bk[0],
            bd = bk[1],
            B = bk[2],
            Z = bk[3]
        }
        var bf = bd - bb;
        if (dS(bf) > bm) {
            var bh = bd
              , bj = bg
              , bl = bi;
            bd = bb + bm * (be && bd > bb ? 1 : -1),
            bg = B + z * dM.cos(bd),
            bi = Z + Y * dM.sin(bd),
            bq = aM(bg, bi, z, Y, ba, 0, be, bj, bl, [bd, bh, B, Z])
        }
        bf = bd - bb;
        var bn = dM.cos(bb)
          , bp = dM.sin(bb)
          , br = dM.cos(bd)
          , bs = dM.sin(bd)
          , bu = dM.tan(bf / 4)
          , bw = 4 / 3 * z * bu
          , by = 4 / 3 * Y * bu
          , bA = [n, w]
          , bB = [n + bw * bp, w - by * bn]
          , bD = [bg + bw * bs, bi - by * br]
          , bF = [bg, bi];
        bB[0] = 2 * bA[0] - bB[0],
        bB[1] = 2 * bA[1] - bB[1];
        if (bk) {
            return [bB, bD, bF][du](bq)
        }
        bq = [bB, bD, bF][du](bq).join()[dE](",");
        var bH = [];
        for (var bI = 0, bK = bq.length; bI < bK; bI++) {
            bH[bI] = bI % 2 ? bv(bq[bI - 1], bq[bI], bo).y : bv(bq[bI], bq[bI + 1], bo).x
        }
        return bH
    }
      , aO = function(k, l, m, n, o, p, q, r, s) {
        var t = 1 - s;
        return {
            x: ad(t, 3) * k + ad(t, 2) * 3 * s * m + t * 3 * s * s * o + ad(s, 3) * q,
            y: ad(t, 3) * l + ad(t, 2) * 3 * s * n + t * 3 * s * s * p + ad(s, 3) * r
        }
    }
      , aQ = aZ(function(m, r, s, t, u, v, w, x) {
        var y = u - 2 * s + m - (w - 2 * u + s), z = 2 * (s - m) - 2 * (u - s), A = m - s, B = (-z + dM.sqrt(z * z - 4 * y * A)) / 2 / y, C = (-z - dM.sqrt(z * z - 4 * y * A)) / 2 / y, D = [r, x], E = [m, w], F;
        dS(B) > "1e12" && (B = 0.5),
        dS(C) > "1e12" && (C = 0.5),
        B > 0 && B < 1 && (F = aO(m, r, s, t, u, v, w, x, B),
        E.push(F.x),
        D.push(F.y)),
        C > 0 && C < 1 && (F = aO(m, r, s, t, u, v, w, x, C),
        E.push(F.x),
        D.push(F.y)),
        y = v - 2 * t + r - (x - 2 * v + t),
        z = 2 * (t - r) - 2 * (v - t),
        A = r - t,
        B = (-z + dM.sqrt(z * z - 4 * y * A)) / 2 / y,
        C = (-z - dM.sqrt(z * z - 4 * y * A)) / 2 / y,
        dS(B) > "1e12" && (B = 0.5),
        dS(C) > "1e12" && (C = 0.5),
        B > 0 && B < 1 && (F = aO(m, r, s, t, u, v, w, x, B),
        E.push(F.x),
        D.push(F.y)),
        C > 0 && C < 1 && (F = aO(m, r, s, t, u, v, w, x, C),
        E.push(F.x),
        D.push(F.y));
        return {
            min: {
                x: dQ[ds](0, E),
                y: dQ[ds](0, D)
            },
            max: {
                x: dO[ds](0, E),
                y: dO[ds](0, D)
            }
        }
    })
      , aS = ac._path2curve = aZ(function(m, n) {
        var s = !n && a7(m);
        if (!n && s.curve) {
            return aC(s.curve)
        }
        var t = aG(m)
          , u = n && aG(n)
          , v = {
            x: 0,
            y: 0,
            bx: 0,
            by: 0,
            X: 0,
            Y: 0,
            qx: null,
            qy: null
        }
          , w = {
            x: 0,
            y: 0,
            bx: 0,
            by: 0,
            X: 0,
            Y: 0,
            qx: null,
            qy: null
        }
          , x = function(e, f) {
            var g, h;
            if (!e) {
                return ["C", f.x, f.y, f.x, f.y, f.x, f.y]
            }
            !(e[0]in {
                T: 1,
                Q: 1
            }) && (f.qx = f.qy = null);
            switch (e[0]) {
            case "M":
                f.X = e[1],
                f.Y = e[2];
                break;
            case "A":
                e = ["C"][du](aM[ds](0, [f.x, f.y][du](e.slice(1))));
                break;
            case "S":
                g = f.x + (f.x - (f.bx || f.x)),
                h = f.y + (f.y - (f.by || f.y)),
                e = ["C", g, h][du](e.slice(1));
                break;
            case "T":
                f.qx = f.x + (f.x - (f.qx || f.x)),
                f.qy = f.y + (f.y - (f.qy || f.y)),
                e = ["C"][du](aK(f.x, f.y, f.qx, f.qy, e[1], e[2]));
                break;
            case "Q":
                f.qx = e[1],
                f.qy = e[2],
                e = ["C"][du](aK(f.x, f.y, e[1], e[2], e[3], e[4]));
                break;
            case "L":
                e = ["C"][du](aI(f.x, f.y, e[1], e[2]));
                break;
            case "H":
                e = ["C"][du](aI(f.x, f.y, e[1], f.y));
                break;
            case "V":
                e = ["C"][du](aI(f.x, f.y, f.x, e[1]));
                break;
            case "Z":
                e = ["C"][du](aI(f.x, f.y, f.X, f.Y))
            }
            return e
        }
          , y = function(d, e) {
            if (d[e].length > 7) {
                d[e].shift();
                var f = d[e];
                while (f.length) {
                    d.splice(e++, 0, ["C"][du](f.splice(0, 6)))
                }
                d.splice(e, 1),
                B = dO(t.length, u && u.length || 0)
            }
        }
          , z = function(d, e, h, i, j) {
            d && e && d[j][0] == "M" && e[j][0] != "M" && (e.splice(j, 0, ["M", i.x, i.y]),
            h.bx = 0,
            h.by = 0,
            h.x = d[j][1],
            h.y = d[j][2],
            B = dO(t.length, u && u.length || 0))
        };
        for (var A = 0, B = dO(t.length, u && u.length || 0); A < B; A++) {
            t[A] = x(t[A], v),
            y(t, A),
            u && (u[A] = x(u[A], w)),
            u && y(u, A),
            z(t, u, v, w, A),
            z(u, t, w, v, A);
            var C = t[A]
              , D = u && u[A]
              , E = C.length
              , F = u && D.length;
            v.x = C[E - 2],
            v.y = C[E - 1],
            v.bx = dB(C[E - 4]) || v.x,
            v.by = dB(C[E - 3]) || v.y,
            w.bx = u && (dB(D[F - 4]) || w.x),
            w.by = u && (dB(D[F - 3]) || w.y),
            w.x = u && D[F - 2],
            w.y = u && D[F - 1]
        }
        u || (s.curve = aC(t));
        return u ? [t, u] : t
    }, null, aC)
      , aU = ac._parseDots = aZ(function(a) {
        var l = [];
        for (var m = 0, n = a.length; m < n; m++) {
            var o = {}
              , p = a[m].match(/^([^:]*):?([\d\.]*)/);
            o.color = ac.getRGB(p[1]);
            if (o.color.error) {
                return null
            }
            o.color = o.color.hex,
            p[2] && (o.offset = p[2] + "%"),
            l.push(o)
        }
        for (m = 1,
        n = l.length - 1; m < n; m++) {
            if (!l[m].offset) {
                var q = dB(l[m - 1].offset || 0)
                  , r = 0;
                for (var s = m + 1; s < n; s++) {
                    if (l[s].offset) {
                        r = l[s].offset;
                        break
                    }
                }
                r || (r = 100,
                s = n),
                r = dB(r);
                var t = (r - q) / (s - m + 1);
                for (; m < s; m++) {
                    q += t,
                    l[m].offset = q + "%"
                }
            }
        }
        return l
    })
      , aW = ac._tear = function(c, d) {
        c == d.top && (d.top = c.prev),
        c == d.bottom && (d.bottom = c.next),
        c.next && (c.next.prev = c.prev),
        c.prev && (c.prev.next = c.next)
    }
      , aY = ac._tofront = function(c, d) {
        d.top !== c && (aW(c, d),
        c.next = null,
        c.prev = d.top,
        d.top.next = c,
        d.top = c)
    }
      , a0 = ac._toback = function(c, d) {
        d.bottom !== c && (aW(c, d),
        c.next = d.bottom,
        c.prev = null,
        d.bottom.prev = c,
        d.bottom = c)
    }
      , a2 = ac._insertafter = function(d, e, f) {
        aW(d, f),
        e == f.top && (f.top = d),
        e.next && (e.next.prev = d),
        d.next = e.next,
        d.prev = e,
        e.next = d
    }
      , a4 = ac._insertbefore = function(d, e, f) {
        aW(d, f),
        e == f.bottom && (f.bottom = d),
        e.prev && (e.prev.next = d),
        d.prev = e.prev,
        e.prev = d,
        d.next = e
    }
      , a6 = ac.toMatrix = function(e, f) {
        var g = aA(e)
          , h = {
            _: {
                transform: dy
            },
            getBBox: function() {
                return g
            }
        };
        ag(h, f);
        return h.matrix
    }
      , a8 = ac.transformPath = function(c, d) {
        return aB(c, a6(c, d))
    }
      , ag = ac._extractTransform = function(a, p) {
        if (p == null) {
            return a._.transform
        }
        p = dC(p).replace(/\.{3}|\u2026/g, a._.transform || dy);
        var r = ac.parseTransformString(p)
          , z = 0
          , A = 0
          , B = 0
          , C = 1
          , D = 1
          , E = a._
          , F = new b3;
        E.transform = r || [];
        if (r) {
            for (var G = 0, H = r.length; G < H; G++) {
                var I = r[G], J = I.length, K = dC(I[0]).toLowerCase(), M = I[0] != K, N = M ? F.invert() : 0, O, P, Q, R, S;
                K == "t" && J == 3 ? M ? (O = N.x(0, 0),
                P = N.y(0, 0),
                Q = N.x(I[1], I[2]),
                R = N.y(I[1], I[2]),
                F.translate(Q - O, R - P)) : F.translate(I[1], I[2]) : K == "r" ? J == 2 ? (S = S || a.getBBox(1),
                F.rotate(I[1], S.x + S.width / 2, S.y + S.height / 2),
                z += I[1]) : J == 4 && (M ? (Q = N.x(I[2], I[3]),
                R = N.y(I[2], I[3]),
                F.rotate(I[1], Q, R)) : F.rotate(I[1], I[2], I[3]),
                z += I[1]) : K == "s" ? J == 2 || J == 3 ? (S = S || a.getBBox(1),
                F.scale(I[1], I[J - 1], S.x + S.width / 2, S.y + S.height / 2),
                C *= I[1],
                D *= I[J - 1]) : J == 5 && (M ? (Q = N.x(I[3], I[4]),
                R = N.y(I[3], I[4]),
                F.scale(I[1], I[2], Q, R)) : F.scale(I[1], I[2], I[3], I[4]),
                C *= I[1],
                D *= I[2]) : K == "m" && J == 7 && F.add(I[1], I[2], I[3], I[4], I[5], I[6]),
                E.dirtyT = 1,
                a.matrix = F
            }
        }
        a.matrix = F,
        E.sx = C,
        E.sy = D,
        E.deg = z,
        E.dx = A = F.e,
        E.dy = B = F.f,
        C == 1 && D == 1 && !z && E.bbox ? (E.bbox.x += +A,
        E.bbox.y += +B) : E.dirtyT = 1
    }
      , ah = function(c) {
        var d = c[0];
        switch (d.toLowerCase()) {
        case "t":
            return [d, 0, 0];
        case "m":
            return [d, 1, 0, 0, 1, 0, 0];
        case "r":
            return c.length == 4 ? [d, 0, c[2], c[3]] : [d, 0];
        case "s":
            return c.length == 5 ? [d, 1, 1, c[3], c[4]] : c.length == 3 ? [d, 1, 1] : [d, 1]
        }
    }
      , b1 = ac._equaliseTransform = function(a, l) {
        l = dC(l).replace(/\.{3}|\u2026/g, a),
        a = ac.parseTransformString(a) || [],
        l = ac.parseTransformString(l) || [];
        var m = dO(a.length, l.length), n = [], o = [], p = 0, q, r, s, t;
        for (; p < m; p++) {
            s = a[p] || ah(l[p]),
            t = l[p] || ah(s);
            if (s[0] != t[0] || s[0].toLowerCase() == "r" && (s[2] != t[2] || s[3] != t[3]) || s[0].toLowerCase() == "s" && (s[3] != t[3] || s[4] != t[4])) {
                return
            }
            n[p] = [],
            o[p] = [];
            for (q = 0,
            r = dO(s.length, t.length); q < r; q++) {
                q in s && (n[p][q] = s[q]),
                q in t && (o[p][q] = t[q])
            }
        }
        return {
            from: n,
            to: o
        }
    }
    ;
    ac._getContainer = function(a, g, h, i) {
        var j;
        j = i == null && !ac.is(a, "object") ? dh.doc.getElementById(a) : a;
        if (j != null) {
            if (j.tagName) {
                return g == null ? {
                    container: j,
                    width: j.style.pixelWidth || j.offsetWidth,
                    height: j.style.pixelHeight || j.offsetHeight
                } : {
                    container: j,
                    width: g,
                    height: h
                }
            }
            return {
                container: 1,
                x: a,
                y: g,
                width: h,
                height: i
            }
        }
    }
    ,
    ac.pathToRelative = aE,
    ac._engine = {},
    ac.path2curve = aS,
    ac.matrix = function(g, h, i, j, k, l) {
        return new b3(g,h,i,j,k,l)
    }
    ,
    function(a) {
        function f(c) {
            var d = dM.sqrt(e(c));
            c[0] && (c[0] /= d),
            c[1] && (c[1] /= d)
        }
        function e(b) {
            return b[0] * b[0] + b[1] * b[1]
        }
        a.add = function(n, o, p, q, r, s) {
            var t = [[], [], []], u = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]], v = [[n, p, r], [o, q, s], [0, 0, 1]], w, x, y, z;
            n && n instanceof b3 && (v = [[n.a, n.c, n.e], [n.b, n.d, n.f], [0, 0, 1]]);
            for (w = 0; w < 3; w++) {
                for (x = 0; x < 3; x++) {
                    z = 0;
                    for (y = 0; y < 3; y++) {
                        z += u[w][y] * v[y][x]
                    }
                    t[w][x] = z
                }
            }
            this.a = t[0][0],
            this.b = t[1][0],
            this.c = t[0][1],
            this.d = t[1][1],
            this.e = t[0][2],
            this.f = t[1][2]
        }
        ,
        a.invert = function() {
            var c = this
              , d = c.a * c.d - c.b * c.c;
            return new b3(c.d / d,-c.b / d,-c.c / d,c.a / d,(c.c * c.f - c.d * c.e) / d,(c.b * c.e - c.a * c.f) / d)
        }
        ,
        a.clone = function() {
            return new b3(this.a,this.b,this.c,this.d,this.e,this.f)
        }
        ,
        a.translate = function(c, d) {
            this.add(1, 0, 0, 1, c, d)
        }
        ,
        a.scale = function(g, h, i, j) {
            h == null && (h = g),
            (i || j) && this.add(1, 0, 0, 1, i, j),
            this.add(g, 0, 0, h, 0, 0),
            (i || j) && this.add(1, 0, 0, 1, -i, -j)
        }
        ,
        a.rotate = function(g, h, i) {
            g = ac.rad(g),
            h = h || 0,
            i = i || 0;
            var j = +dM.cos(g).toFixed(9)
              , k = +dM.sin(g).toFixed(9);
            this.add(j, k, -k, j, h, i),
            this.add(1, 0, 0, 1, -h, -i)
        }
        ,
        a.x = function(c, d) {
            return c * this.a + d * this.c + this.e
        }
        ,
        a.y = function(c, d) {
            return c * this.b + d * this.d + this.f
        }
        ,
        a.get = function(b) {
            return +this[dC.fromCharCode(97 + b)].toFixed(4)
        }
        ,
        a.toString = function() {
            return ac.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
        }
        ,
        a.toFilter = function() {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
        }
        ,
        a.offset = function() {
            return [this.e.toFixed(4), this.f.toFixed(4)]
        }
        ,
        a.split = function() {
            var c = {};
            c.dx = this.e,
            c.dy = this.f;
            var d = [[this.a, this.c], [this.b, this.d]];
            c.scalex = dM.sqrt(e(d[0])),
            f(d[0]),
            c.shear = d[0][0] * d[1][0] + d[0][1] * d[1][1],
            d[1] = [d[1][0] - d[0][0] * c.shear, d[1][1] - d[0][1] * c.shear],
            c.scaley = dM.sqrt(e(d[1])),
            f(d[1]),
            c.shear /= c.scaley;
            var h = -d[0][1]
              , i = d[1][1];
            i < 0 ? (c.rotate = ac.deg(dM.acos(i)),
            h < 0 && (c.rotate = 360 - c.rotate)) : c.rotate = ac.deg(dM.asin(h)),
            c.isSimple = !+c.shear.toFixed(9) && (c.scalex.toFixed(9) == c.scaley.toFixed(9) || !c.rotate),
            c.isSuperSimple = !+c.shear.toFixed(9) && c.scalex.toFixed(9) == c.scaley.toFixed(9) && !c.rotate,
            c.noRotation = !+c.shear.toFixed(9) && !c.rotate;
            return c
        }
        ,
        a.toTransformString = function(c) {
            var d = c || this[dE]();
            if (d.isSimple) {
                d.scalex = +d.scalex.toFixed(4),
                d.scaley = +d.scaley.toFixed(4),
                d.rotate = +d.rotate.toFixed(4);
                return (d.dx || d.dy ? "t" + [d.dx, d.dy] : dy) + (d.scalex != 1 || d.scaley != 1 ? "s" + [d.scalex, d.scaley, 0, 0] : dy) + (d.rotate ? "r" + [d.rotate, 0, 0] : dy)
            }
            return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
        }
    }(b3.prototype);
    var b5 = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    navigator.vendor == "Apple Computer, Inc." && (b5 && b5[1] < 4 || navigator.platform.slice(0, 2) == "iP") || navigator.vendor == "Google Inc." && b5 && b5[1] < 8 ? dn.safari = function() {
        var b = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
            stroke: "none"
        });
        setTimeout(function() {
            b.remove()
        })
    }
    : dn.safari = aq;
    var b7 = function() {
        this.returnValue = !1
    }
      , b9 = function() {
        return this.originalEvent.preventDefault()
    }
      , cK = function() {
        this.cancelBubble = !0
    }
      , cM = function() {
        return this.originalEvent.stopPropagation()
    }
      , cO = function() {
        if (dh.doc.addEventListener) {
            return function(g, h, i, j) {
                var k = dw && dI[h] ? dI[h] : h
                  , l = function(a) {
                    var b = dh.doc.documentElement.scrollTop || dh.doc.body.scrollTop
                      , c = dh.doc.documentElement.scrollLeft || dh.doc.body.scrollLeft
                      , d = a.clientX + c
                      , o = a.clientY + b;
                    if (dw && dI[df](h)) {
                        for (var p = 0, q = a.targetTouches && a.targetTouches.length; p < q; p++) {
                            if (a.targetTouches[p].target == g) {
                                var r = a;
                                a = a.targetTouches[p],
                                a.originalEvent = r,
                                a.preventDefault = b9,
                                a.stopPropagation = cM;
                                break
                            }
                        }
                    }
                    return i.call(j, a, d, o)
                };
                g.addEventListener(k, l, !1);
                return function() {
                    g.removeEventListener(k, l, !1);
                    return !0
                }
            }
        }
        if (dh.doc.attachEvent) {
            return function(g, h, i, j) {
                var k = function(c) {
                    c = c || dh.win.event;
                    var d = dh.doc.documentElement.scrollTop || dh.doc.body.scrollTop
                      , m = dh.doc.documentElement.scrollLeft || dh.doc.body.scrollLeft
                      , n = c.clientX + m
                      , o = c.clientY + d;
                    c.preventDefault = c.preventDefault || b7,
                    c.stopPropagation = c.stopPropagation || cK;
                    return i.call(j, c, n, o)
                };
                g.attachEvent("on" + h, k);
                var l = function() {
                    g.detachEvent("on" + h, k);
                    return !0
                };
                return l
            }
        }
    }()
      , cQ = []
      , cS = function(h) {
        var o = h.clientX, q = h.clientY, r = dh.doc.documentElement.scrollTop || dh.doc.body.scrollTop, s = dh.doc.documentElement.scrollLeft || dh.doc.body.scrollLeft, t, u = cQ.length;
        while (u--) {
            t = cQ[u];
            if (dw) {
                var v = h.touches.length, w;
                while (v--) {
                    w = h.touches[v];
                    if (w.identifier == t.el._drag.id) {
                        o = w.clientX,
                        q = w.clientY,
                        (h.originalEvent ? h.originalEvent : h).preventDefault();
                        break
                    }
                }
            } else {
                h.preventDefault()
            }
            var x = t.el.node, y, z = x.nextSibling, A = x.parentNode, B = x.style.display;
            dh.win.opera && A.removeChild(x),
            x.style.display = "none",
            y = t.el.paper.getElementByPoint(o, q),
            x.style.display = B,
            dh.win.opera && (z ? A.insertBefore(x, z) : A.appendChild(x)),
            y && eve("raphael.drag.over." + t.el.id, t.el, y),
            o += s,
            q += r,
            eve("raphael.drag.move." + t.el.id, t.move_scope || t.el, o - t.el._drag.x, q - t.el._drag.y, o, q, h)
        }
    }
      , cT = function(a) {
        ac.unmousemove(cS).unmouseup(cT);
        var e = cQ.length, f;
        while (e--) {
            f = cQ[e],
            f.el._drag = {},
            eve("raphael.drag.end." + f.el.id, f.end_scope || f.start_scope || f.move_scope || f.el, a)
        }
        cQ = []
    }
      , cU = ac.el = {};
    for (var cV = dG.length; cV--; ) {
        (function(a) {
            ac[a] = cU[a] = function(b, e) {
                ac.is(b, "function") && (this.events = this.events || [],
                this.events.push({
                    name: a,
                    f: b,
                    unbind: cO(this.shape || this.node || dh.doc, a, b, e || this)
                }));
                return this
            }
            ,
            ac["un" + a] = cU["un" + a] = function(b) {
                var e = this.events || []
                  , f = e.length;
                while (f--) {
                    if (e[f].name == a && e[f].f == b) {
                        e[f].unbind(),
                        e.splice(f, 1),
                        !e.length && delete this.events;
                        return this
                    }
                }
                return this
            }
        }
        )(dG[cV])
    }
    cU.data = function(a, f) {
        var g = ak[this.id] = ak[this.id] || {};
        if (arguments.length == 1) {
            if (ac.is(a, "object")) {
                for (var h in a) {
                    a[df](h) && this.data(h, a[h])
                }
                return this
            }
            eve("raphael.data.get." + this.id, this, g[a], a);
            return g[a]
        }
        g[a] = f,
        eve("raphael.data.set." + this.id, this, f, a);
        return this
    }
    ,
    cU.removeData = function(b) {
        b == null ? ak[this.id] = {} : ak[this.id] && delete ak[this.id][b];
        return this
    }
    ,
    cU.hover = function(e, f, g, h) {
        return this.mouseover(e, g).mouseout(f, h || g)
    }
    ,
    cU.unhover = function(c, d) {
        return this.unmouseover(c).unmouseout(d)
    }
    ;
    var cW = [];
    cU.drag = function(a, h, j, k, l, m) {
        function n(b) {
            (b.originalEvent || b).preventDefault();
            var c = dh.doc.documentElement.scrollTop || dh.doc.body.scrollTop
              , d = dh.doc.documentElement.scrollLeft || dh.doc.body.scrollLeft;
            this._drag.x = b.clientX + d,
            this._drag.y = b.clientY + c,
            this._drag.id = b.identifier,
            !cQ.length && ac.mousemove(cS).mouseup(cT),
            cQ.push({
                el: this,
                move_scope: k,
                start_scope: l,
                end_scope: m
            }),
            h && eve.on("raphael.drag.start." + this.id, h),
            a && eve.on("raphael.drag.move." + this.id, a),
            j && eve.on("raphael.drag.end." + this.id, j),
            eve("raphael.drag.start." + this.id, l || k || this, b.clientX + d, b.clientY + c, b)
        }
        this._drag = {},
        cW.push({
            el: this,
            start: n
        }),
        this.mousedown(n);
        return this
    }
    ,
    cU.onDragOver = function(b) {
        b ? eve.on("raphael.drag.over." + this.id, b) : eve.unbind("raphael.drag.over." + this.id)
    }
    ,
    cU.undrag = function() {
        var a = cW.length;
        while (a--) {
            cW[a].el == this && (this.unmousedown(cW[a].start),
            cW.splice(a, 1),
            eve.unbind("raphael.drag.*." + this.id))
        }
        !cW.length && ac.unmousemove(cS).unmouseup(cT)
    }
    ,
    dn.circle = function(a, f, g) {
        var h = ac._engine.circle(this, a || 0, f || 0, g || 0);
        this.__set__ && this.__set__.push(h);
        return h
    }
    ,
    dn.rect = function(a, h, i, j, k) {
        var l = ac._engine.rect(this, a || 0, h || 0, i || 0, j || 0, k || 0);
        this.__set__ && this.__set__.push(l);
        return l
    }
    ,
    dn.ellipse = function(a, g, h, i) {
        var j = ac._engine.ellipse(this, a || 0, g || 0, h || 0, i || 0);
        this.__set__ && this.__set__.push(j);
        return j
    }
    ,
    dn.path = function(a) {
        a && !ac.is(a, da) && !ac.is(a[0], dc) && (a += dy);
        var d = ac._engine.path(ac.format[ds](ac, arguments), this);
        this.__set__ && this.__set__.push(d);
        return d
    }
    ,
    dn.image = function(a, h, i, j, k) {
        var l = ac._engine.image(this, a || "about:blank", h || 0, i || 0, j || 0, k || 0);
        this.__set__ && this.__set__.push(l);
        return l
    }
    ,
    dn.text = function(a, f, g) {
        var h = ac._engine.text(this, a || 0, f || 0, dC(g));
        this.__set__ && this.__set__.push(h);
        return h
    }
    ,
    dn.set = function(a) {
        !ac.is(a, "array") && (a = Array.prototype.splice.call(arguments, 0, arguments.length));
        var d = new cN(a);
        this.__set__ && this.__set__.push(d);
        return d
    }
    ,
    dn.setStart = function(b) {
        this.__set__ = b || this.set()
    }
    ,
    dn.setFinish = function(c) {
        var d = this.__set__;
        delete this.__set__;
        return d
    }
    ,
    dn.setSize = function(a, d) {
        return ac._engine.setSize.call(this, a, d)
    }
    ,
    dn.setViewBox = function(a, g, h, i, j) {
        return ac._engine.setViewBox.call(this, a, g, h, i, j)
    }
    ,
    dn.top = dn.bottom = null,
    dn.raphael = ac;
    var cX = function(h) {
        var k = h.getBoundingClientRect()
          , l = h.ownerDocument
          , m = l.body
          , n = l.documentElement
          , o = n.clientTop || m.clientTop || 0
          , p = n.clientLeft || m.clientLeft || 0
          , q = k.top + (dh.win.pageYOffset || n.scrollTop || m.scrollTop) - o
          , r = k.left + (dh.win.pageXOffset || n.scrollLeft || m.scrollLeft) - p;
        return {
            y: q,
            x: r
        }
    };
    dn.getElementByPoint = function(h, j) {
        var k = this
          , l = k.canvas
          , m = dh.doc.elementFromPoint(h, j);
        if (dh.win.opera && m.tagName == "svg") {
            var n = cX(l)
              , o = l.createSVGRect();
            o.x = h - n.x,
            o.y = j - n.y,
            o.width = o.height = 1;
            var p = l.getIntersectionList(o, null);
            p.length && (m = p[p.length - 1])
        }
        if (!m) {
            return null
        }
        while (m.parentNode && m != l.parentNode && !m.raphael) {
            m = m.parentNode
        }
        m == k.canvas.parentNode && (m = l),
        m = m && m.raphael ? k.getById(m.raphaelid) : null;
        return m
    }
    ,
    dn.getById = function(c) {
        var d = this.bottom;
        while (d) {
            if (d.id == c) {
                return d
            }
            d = d.next
        }
        return null
    }
    ,
    dn.forEach = function(d, e) {
        var f = this.bottom;
        while (f) {
            if (d.call(e, f) === !1) {
                return this
            }
            f = f.next
        }
        return this
    }
    ,
    dn.getElementsByPoint = function(d, e) {
        var f = this.set();
        this.forEach(function(a) {
            a.isPointInside(d, e) && f.push(a)
        });
        return f
    }
    ,
    cU.isPointInside = function(a, e) {
        var f = this.realPath = this.realPath || az[this.type](this);
        return ac.isPointInsidePath(f, a, e)
    }
    ,
    cU.getBBox = function(c) {
        if (this.removed) {
            return {}
        }
        var d = this._;
        if (c) {
            if (d.dirty || !d.bboxwt) {
                this.realPath = az[this.type](this),
                d.bboxwt = aA(this.realPath),
                d.bboxwt.toString = cZ,
                d.dirty = 0
            }
            return d.bboxwt
        }
        if (d.dirty || d.dirtyT || !d.bbox) {
            if (d.dirty || !this.realPath) {
                d.bboxwt = 0,
                this.realPath = az[this.type](this)
            }
            d.bbox = aA(aB(this.realPath, this.matrix)),
            d.bbox.toString = cZ,
            d.dirty = d.dirtyT = 0
        }
        return d.bbox
    }
    ,
    cU.clone = function() {
        if (this.removed) {
            return null
        }
        var b = this.paper[this.type]().attr(this.attr());
        this.__set__ && this.__set__.push(b);
        return b
    }
    ,
    cU.glow = function(h) {
        if (this.type == "text") {
            return null
        }
        h = h || {};
        var i = {
            width: (h.width || 10) + (+this.attr("stroke-width") || 1),
            fill: h.fill || !1,
            opacity: h.opacity || 0.5,
            offsetx: h.offsetx || 0,
            offsety: h.offsety || 0,
            color: h.color || "#000"
        }
          , j = i.width / 2
          , k = this.paper
          , l = k.set()
          , m = this.realPath || az[this.type](this);
        m = this.matrix ? aB(m, this.matrix) : m;
        for (var n = 1; n < j + 1; n++) {
            l.push(k.path(m).attr({
                stroke: i.color,
                fill: i.fill ? i.color : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-width": +(i.width / j * n).toFixed(3),
                opacity: +(i.opacity / j).toFixed(3)
            }))
        }
        return l.insertBefore(this).translate(i.offsetx, i.offsety)
    }
    ;
    var c0 = {}
      , c1 = function(a, k, l, m, n, o, p, q, r) {
        return r == null ? al(a, k, l, m, n, o, p, q) : ac.findDotsAtSegment(a, k, l, m, n, o, p, q, an(a, k, l, m, n, o, p, q, r))
    }
      , c2 = function(a, d) {
        return function(b, c, q) {
            b = aS(b);
            var r, s, t, u, v = "", w = {}, x, y = 0;
            for (var z = 0, A = b.length; z < A; z++) {
                t = b[z];
                if (t[0] == "M") {
                    r = +t[1],
                    s = +t[2]
                } else {
                    u = c1(r, s, t[1], t[2], t[3], t[4], t[5], t[6]);
                    if (y + u > c) {
                        if (d && !w.start) {
                            x = c1(r, s, t[1], t[2], t[3], t[4], t[5], t[6], c - y),
                            v += ["C" + x.start.x, x.start.y, x.m.x, x.m.y, x.x, x.y];
                            if (q) {
                                return v
                            }
                            w.start = v,
                            v = ["M" + x.x, x.y + "C" + x.n.x, x.n.y, x.end.x, x.end.y, t[5], t[6]].join(),
                            y += u,
                            r = +t[5],
                            s = +t[6];
                            continue
                        }
                        if (!a && !d) {
                            x = c1(r, s, t[1], t[2], t[3], t[4], t[5], t[6], c - y);
                            return {
                                x: x.x,
                                y: x.y,
                                alpha: x.alpha
                            }
                        }
                    }
                    y += u,
                    r = +t[5],
                    s = +t[6]
                }
                v += t.shift() + t
            }
            w.end = v,
            x = a ? y : d ? w : ac.findDotsAtSegment(r, s, t[0], t[1], t[2], t[3], t[4], t[5], 1),
            x.alpha && (x = {
                x: x.x,
                y: x.y,
                alpha: x.alpha
            });
            return x
        }
    }
      , c3 = c2(1)
      , c4 = c2()
      , c5 = c2(0, 1);
    ac.getTotalLength = c3,
    ac.getPointAtLength = c4,
    ac.getSubpath = function(e, f, g) {
        if (this.getTotalLength(e) - g < 1e-06) {
            return c5(e, f).end
        }
        var h = c5(e, g, 1);
        return f ? c5(h, f).end : h
    }
    ,
    cU.getTotalLength = function() {
        if (this.type == "path") {
            if (this.node.getTotalLength) {
                return this.node.getTotalLength()
            }
            return c3(this.attrs.path)
        }
    }
    ,
    cU.getPointAtLength = function(b) {
        if (this.type == "path") {
            return c4(this.attrs.path, b)
        }
    }
    ,
    cU.getSubpath = function(a, d) {
        if (this.type == "path") {
            return ac.getSubpath(this.attrs.path, a, d)
        }
    }
    ;
    var c6 = ac.easing_formulas = {
        linear: function(b) {
            return b
        },
        "<": function(b) {
            return ad(b, 1.7)
        },
        ">": function(b) {
            return ad(b, 0.48)
        },
        "<>": function(i) {
            var j = 0.48 - i / 1.04
              , k = dM.sqrt(0.1734 + j * j)
              , l = k - j
              , m = ad(dS(l), 1 / 3) * (l < 0 ? -1 : 1)
              , n = -k - j
              , o = ad(dS(n), 1 / 3) * (n < 0 ? -1 : 1)
              , p = m + o + 0.5;
            return (1 - p) * 3 * p * p + p * p * p
        },
        backIn: function(c) {
            var d = 1.70158;
            return c * c * ((d + 1) * c - d)
        },
        backOut: function(c) {
            c = c - 1;
            var d = 1.70158;
            return c * c * ((d + 1) * c + d) + 1
        },
        elastic: function(b) {
            if (b == !!b) {
                return b
            }
            return ad(2, -10 * b) * dM.sin((b - 0.075) * 2 * af / 0.3) + 1
        },
        bounce: function(e) {
            var f = 7.5625, g = 2.75, h;
            e < 1 / g ? h = f * e * e : e < 2 / g ? (e -= 1.5 / g,
            h = f * e * e + 0.75) : e < 2.5 / g ? (e -= 2.25 / g,
            h = f * e * e + 0.9375) : (e -= 2.625 / g,
            h = f * e * e + 0.984375);
            return h
        }
    };
    c6.easeIn = c6["ease-in"] = c6["<"],
    c6.easeOut = c6["ease-out"] = c6[">"],
    c6.easeInOut = c6["ease-in-out"] = c6["<>"],
    c6["back-in"] = c6.backIn,
    c6["back-out"] = c6.backOut;
    var c7 = []
      , c8 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(b) {
        setTimeout(b, 16)
    }
      , b2 = function() {
        var g = +(new Date)
          , n = 0;
        for (; n < c7.length; n++) {
            var q = c7[n];
            if (q.el.removed || q.paused) {
                continue
            }
            var B = g - q.start, C = q.ms, D = q.easing, E = q.from, F = q.diff, G = q.to, H = q.t, I = q.el, J = {}, K, M = {}, N;
            q.initstatus ? (B = (q.initstatus * q.anim.top - q.prev) / (q.percent - q.prev) * C,
            q.status = q.initstatus,
            delete q.initstatus,
            q.stop && c7.splice(n--, 1)) : q.status = (q.prev + (q.percent - q.prev) * (B / C)) / q.anim.top;
            if (B < 0) {
                continue
            }
            if (B < C) {
                var O = D(B / C);
                for (var P in E) {
                    if (E[df](P)) {
                        switch (dJ[P]) {
                        case b0:
                            K = +E[P] + O * C * F[P];
                            break;
                        case "colour":
                            K = "rgb(" + [b4(dx(E[P].r + O * C * F[P].r)), b4(dx(E[P].g + O * C * F[P].g)), b4(dx(E[P].b + O * C * F[P].b))].join(",") + ")";
                            break;
                        case "path":
                            K = [];
                            for (var Q = 0, R = E[P].length; Q < R; Q++) {
                                K[Q] = [E[P][Q][0]];
                                for (var S = 1, T = E[P][Q].length; S < T; S++) {
                                    K[Q][S] = +E[P][Q][S] + O * C * F[P][Q][S]
                                }
                                K[Q] = K[Q].join(dA)
                            }
                            K = K.join(dA);
                            break;
                        case "transform":
                            if (F[P].real) {
                                K = [];
                                for (Q = 0,
                                R = E[P].length; Q < R; Q++) {
                                    K[Q] = [E[P][Q][0]];
                                    for (S = 1,
                                    T = E[P][Q].length; S < T; S++) {
                                        K[Q][S] = E[P][Q][S] + O * C * F[P][Q][S]
                                    }
                                }
                            } else {
                                var U = function(b) {
                                    return +E[P][b] + O * C * F[P][b]
                                };
                                K = [["m", U(0), U(1), U(2), U(3), U(4), U(5)]]
                            }
                            break;
                        case "csv":
                            if (P == "clip-rect") {
                                K = [],
                                Q = 4;
                                while (Q--) {
                                    K[Q] = +E[P][Q] + O * C * F[P][Q]
                                }
                            }
                            break;
                        default:
                            var a = [][du](E[P]);
                            K = [],
                            Q = I.paper.customAttributes[P].length;
                            while (Q--) {
                                K[Q] = +a[Q] + O * C * F[P][Q]
                            }
                        }
                        J[P] = K
                    }
                }
                I.attr(J),
                function(d, e, f) {
                    setTimeout(function() {
                        eve("raphael.anim.frame." + d, e, f)
                    })
                }(I.id, I, q.anim)
            } else {
                (function(e, f, h) {
                    setTimeout(function() {
                        eve("raphael.anim.frame." + f.id, f, h),
                        eve("raphael.anim.finish." + f.id, f, h),
                        ac.is(e, "function") && e.call(f)
                    })
                }
                )(q.callback, I, q.anim),
                I.attr(G),
                c7.splice(n--, 1);
                if (q.repeat > 1 && !q.next) {
                    for (N in G) {
                        G[df](N) && (M[N] = q.totalOrigin[N])
                    }
                    q.el.attr(M),
                    cJ(q.anim, q.el, q.anim.percents[0], null, q.totalOrigin, q.repeat - 1)
                }
                q.next && !q.stop && cJ(q.anim, q.el, q.next, null, q.totalOrigin, q.repeat)
            }
        }
        ac.svg && I && I.paper && I.paper.safari(),
        c7.length && c8(b2)
    }
      , b4 = function(b) {
        return b > 255 ? 255 : b < 0 ? 0 : b
    };
    cU.animateWith = function(a, n, o, p, q, r) {
        var s = this;
        if (s.removed) {
            r && r.call(s);
            return s
        }
        var t = o instanceof b8 ? o : ac.animation(o, p, q, r), u, v;
        cJ(t, s, t.percents[0], null, s.attr());
        for (var w = 0, x = c7.length; w < x; w++) {
            if (c7[w].anim == n && c7[w].el == a) {
                c7[x - 1].start = c7[w].start;
                break
            }
        }
        return s
    }
    ,
    cU.onAnimation = function(b) {
        b ? eve.on("raphael.anim.frame." + this.id, b) : eve.unbind("raphael.anim.frame." + this.id);
        return this
    }
    ,
    b8.prototype.delay = function(c) {
        var d = new b8(this.anim,this.ms);
        d.times = this.times,
        d.del = +c || 0;
        return d
    }
    ,
    b8.prototype.repeat = function(c) {
        var d = new b8(this.anim,this.ms);
        d.del = this.del,
        d.times = dM.floor(dO(c, 0)) || 1;
        return d
    }
    ,
    ac.animation = function(a, g, j, k) {
        if (a instanceof b8) {
            return a
        }
        if (ac.is(j, "function") || !j) {
            k = k || j || null,
            j = null
        }
        a = Object(a),
        g = +g || 0;
        var l = {}, m, n;
        for (n in a) {
            a[df](n) && dB(n) != n && dB(n) + "%" != n && (m = !0,
            l[n] = a[n])
        }
        if (!m) {
            return new b8(a,g)
        }
        j && (l.easing = j),
        k && (l.callback = k);
        return new b8({
            100: l
        },g)
    }
    ,
    cU.animate = function(a, h, i, j) {
        var k = this;
        if (k.removed) {
            j && j.call(k);
            return k
        }
        var l = a instanceof b8 ? a : ac.animation(a, h, i, j);
        cJ(l, k, l.percents[0], null, k.attr());
        return k
    }
    ,
    cU.setTime = function(c, d) {
        c && d != null && this.status(c, dQ(d, c.ms) / c.ms);
        return this
    }
    ,
    cU.status = function(g, h) {
        var i = [], j = 0, k, l;
        if (h != null) {
            cJ(g, this, -1, dQ(h, 1));
            return this
        }
        k = c7.length;
        for (; j < k; j++) {
            l = c7[j];
            if (l.el.id == this.id && (!g || l.anim == g)) {
                if (g) {
                    return l.status
                }
                i.push({
                    anim: l.anim,
                    status: l.status
                })
            }
        }
        if (g) {
            return 0
        }
        return i
    }
    ,
    cU.pause = function(c) {
        for (var d = 0; d < c7.length; d++) {
            c7[d].el.id == this.id && (!c || c7[d].anim == c) && eve("raphael.anim.pause." + this.id, this, c7[d].anim) !== !1 && (c7[d].paused = !0)
        }
        return this
    }
    ,
    cU.resume = function(d) {
        for (var e = 0; e < c7.length; e++) {
            if (c7[e].el.id == this.id && (!d || c7[e].anim == d)) {
                var f = c7[e];
                eve("raphael.anim.resume." + this.id, this, f.anim) !== !1 && (delete f.paused,
                this.status(f.anim, f.status))
            }
        }
        return this
    }
    ,
    cU.stop = function(c) {
        for (var d = 0; d < c7.length; d++) {
            c7[d].el.id == this.id && (!c || c7[d].anim == c) && eve("raphael.anim.stop." + this.id, this, c7[d].anim) !== !1 && c7.splice(d--, 1)
        }
        return this
    }
    ,
    eve.on("raphael.remove", cL),
    eve.on("raphael.clear", cL),
    cU.toString = function() {
        return "Raphaël’s object"
    }
    ;
    var cN = function(d) {
        this.items = [],
        this.length = 0,
        this.type = "set";
        if (d) {
            for (var e = 0, f = d.length; e < f; e++) {
                d[e] && (d[e].constructor == cU.constructor || d[e].constructor == cN) && (this[this.items.length] = this.items[this.items.length] = d[e],
                this.length++)
            }
        }
    }
      , cP = cN.prototype;
    cP.push = function() {
        var e, f;
        for (var g = 0, h = arguments.length; g < h; g++) {
            e = arguments[g],
            e && (e.constructor == cU.constructor || e.constructor == cN) && (f = this.items.length,
            this[f] = this.items[f] = e,
            this.length++)
        }
        return this
    }
    ,
    cP.pop = function() {
        this.length && delete this[this.length--];
        return this.items.pop()
    }
    ,
    cP.forEach = function(e, f) {
        for (var g = 0, h = this.items.length; g < h; g++) {
            if (e.call(f, this.items[g], g) === !1) {
                return this
            }
        }
        return this
    }
    ;
    for (var cR in cU) {
        cU[df](cR) && (cP[cR] = function(b) {
            return function() {
                var a = arguments;
                return this.forEach(function(d) {
                    d[b][ds](d, a)
                })
            }
        }(cR))
    }
    cP.attr = function(a, h) {
        if (a && ac.is(a, dc) && ac.is(a[0], "object")) {
            for (var i = 0, j = a.length; i < j; i++) {
                this.items[i].attr(a[i])
            }
        } else {
            for (var k = 0, l = this.items.length; k < l; k++) {
                this.items[k].attr(a, h)
            }
        }
        return this
    }
    ,
    cP.clear = function() {
        while (this.length) {
            this.pop()
        }
    }
    ,
    cP.splice = function(i, j, k) {
        i = i < 0 ? dO(this.length + i, 0) : i,
        j = dO(0, dQ(this.length - i, j));
        var l = [], m = [], n = [], o;
        for (o = 2; o < arguments.length; o++) {
            n.push(arguments[o])
        }
        for (o = 0; o < j; o++) {
            m.push(this[i + o])
        }
        for (; o < this.length - i; o++) {
            l.push(this[i + o])
        }
        var p = n.length;
        for (o = 0; o < p + l.length; o++) {
            this.items[i + o] = this[i + o] = o < p ? n[o] : l[o - p]
        }
        o = this.items.length = this.length -= j - p;
        while (this[o]) {
            delete this[o++]
        }
        return new cN(m)
    }
    ,
    cP.exclude = function(d) {
        for (var e = 0, f = this.length; e < f; e++) {
            if (this[e] == d) {
                this.splice(e, 1);
                return !0
            }
        }
    }
    ,
    cP.animate = function(a, l, m, n) {
        (ac.is(m, "function") || !m) && (n = m || null);
        var o = this.items.length, p = o, q, r = this, s;
        if (!o) {
            return this
        }
        n && (s = function() {
            !--o && n.call(r)
        }
        ),
        m = ac.is(m, da) ? m : s;
        var t = ac.animation(a, l, m, s);
        q = this.items[--p].animate(t);
        while (p--) {
            this.items[p] && !this.items[p].removed && this.items[p].animateWith(q, t, t)
        }
        return this
    }
    ,
    cP.insertAfter = function(c) {
        var d = this.items.length;
        while (d--) {
            this.items[d].insertAfter(c)
        }
        return this
    }
    ,
    cP.getBBox = function() {
        var g = []
          , h = []
          , i = []
          , j = [];
        for (var k = this.items.length; k--; ) {
            if (!this.items[k].removed) {
                var l = this.items[k].getBBox();
                g.push(l.x),
                h.push(l.y),
                i.push(l.x + l.width),
                j.push(l.y + l.height)
            }
        }
        g = dQ[ds](0, g),
        h = dQ[ds](0, h),
        i = dO[ds](0, i),
        j = dO[ds](0, j);
        return {
            x: g,
            y: h,
            x2: i,
            y2: j,
            width: i - g,
            height: j - h
        }
    }
    ,
    cP.clone = function(d) {
        d = new cN;
        for (var e = 0, f = this.items.length; e < f; e++) {
            d.push(this.items[e].clone())
        }
        return d
    }
    ,
    cP.toString = function() {
        return "Raphaël‘s set"
    }
    ,
    ac.registerFont = function(g) {
        if (!g.face) {
            return g
        }
        this.fonts = this.fonts || {};
        var i = {
            w: g.w,
            face: {},
            glyphs: {}
        }
          , j = g.face["font-family"];
        for (var k in g.face) {
            g.face[df](k) && (i.face[k] = g.face[k])
        }
        this.fonts[j] ? this.fonts[j].push(i) : this.fonts[j] = [i];
        if (!g.svg) {
            i.face["units-per-em"] = dD(g.face["units-per-em"], 10);
            for (var l in g.glyphs) {
                if (g.glyphs[df](l)) {
                    var m = g.glyphs[l];
                    i.glyphs[l] = {
                        w: m.w,
                        k: {},
                        d: m.d && "M" + m.d.replace(/[mlcxtrv]/g, function(b) {
                            return {
                                l: "L",
                                c: "C",
                                x: "z",
                                t: "m",
                                r: "l",
                                v: "c"
                            }[b] || "M"
                        }) + "z"
                    };
                    if (m.k) {
                        for (var n in m.k) {
                            m[df](n) && (i.glyphs[l].k[n] = m.k[n])
                        }
                    }
                }
            }
        }
        return g
    }
    ,
    dn.getFont = function(a, g, m, n) {
        n = n || "normal",
        m = m || "normal",
        g = +g || {
            normal: 400,
            bold: 700,
            lighter: 300,
            bolder: 800
        }[g] || 400;
        if (!!ac.fonts) {
            var o = ac.fonts[a];
            if (!o) {
                var p = new RegExp("(^|\\s)" + a.replace(/[^\w\d\s+!~.:_-]/g, dy) + "(\\s|$)","i");
                for (var q in ac.fonts) {
                    if (ac.fonts[df](q) && p.test(q)) {
                        o = ac.fonts[q];
                        break
                    }
                }
            }
            var r;
            if (o) {
                for (var s = 0, t = o.length; s < t; s++) {
                    r = o[s];
                    if (r.face["font-weight"] == g && (r.face["font-style"] == m || !r.face["font-style"]) && r.face["font-stretch"] == n) {
                        break
                    }
                }
            }
            return r
        }
    }
    ,
    dn.print = function(c, r, s, x, y, C, D) {
        C = C || "middle",
        D = dO(dQ(D || 0, 1), -1);
        var E = dC(s)[dE](dy), F = 0, G = 0, H = dy, I;
        ac.is(x, s) && (x = this.getFont(x));
        if (x) {
            I = (y || 16) / x.face["units-per-em"];
            var J = x.face.bbox[dE](a9)
              , K = +J[0]
              , M = J[3] - J[1]
              , N = 0
              , O = +J[1] + (C == "baseline" ? M + +x.face.descent : M / 2);
            for (var P = 0, Q = E.length; P < Q; P++) {
                if (E[P] == "\n") {
                    F = 0,
                    p = 0,
                    G = 0,
                    N += M
                } else {
                    var a = G && x.glyphs[E[P - 1]] || {}
                      , p = x.glyphs[E[P]];
                    F += G ? (a.w || x.w) + (a.k && a.k[E[P]] || 0) + x.w * D : 0,
                    G = 1
                }
                p && p.d && (H += ac.transformPath(p.d, ["t", F * I, N * I, "s", I, I, K, O, "t", (c - K) / I, (r - O) / I]))
            }
        }
        return this.path(H).attr({
            fill: "#000",
            stroke: "none"
        })
    }
    ,
    dn.add = function(a) {
        if (ac.is(a, "array")) {
            var d = this.set(), g = 0, i = a.length, j;
            for (; g < i; g++) {
                j = a[g] || {},
                c9[df](j.type) && d.push(this[j.type]().attr(j))
            }
        }
        return d
    }
    ,
    ac.format = function(a, e) {
        var f = ac.is(e, dc) ? [0][du](e) : arguments;
        a && ac.is(a, da) && f.length - 1 && (a = a.replace(db, function(c, d) {
            return f[++d] == null ? dy : f[d]
        }));
        return a || dy
    }
    ,
    ac.fullfill = function() {
        var d = /\{([^\}]+)\}/g
          , e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g
          , f = function(b, g, h) {
            var i = h;
            g.replace(e, function(j, k, l, m, n) {
                k = k || m,
                i && (k in i && (i = i[k]),
                typeof i == "function" && n && (i = i()))
            }),
            i = (i == null || i == h ? b : i) + "";
            return i
        };
        return function(a, c) {
            return String(a).replace(d, function(g, h) {
                return f(g, h, c)
            })
        }
    }(),
    ac.ninja = function() {
        dj.was ? dh.win.Raphael = dj.is : delete Raphael;
        return ac
    }
    ,
    ac.st = cP,
    function(a, f, g) {
        function h() {
            /in/.test(a.readyState) ? setTimeout(h, 9) : ac.eve("raphael.DOMload")
        }
        a.readyState == null && a.addEventListener && (a.addEventListener(f, g = function() {
            a.removeEventListener(f, g, !1),
            a.readyState = "complete"
        }
        , !1),
        a.readyState = "loading"),
        h()
    }(document, "DOMContentLoaded"),
    dj.was ? dh.win.Raphael = ac : Raphael = ac,
    eve.on("raphael.DOMload", function() {
        ae = !0
    })
}(),
window.Raphael.svg && function(D) {
    var F = "hasOwnProperty"
      , H = String
      , J = parseFloat
      , K = parseInt
      , M = Math
      , N = M.max
      , O = M.abs
      , P = M.pow
      , Q = /[, ]+/
      , R = D.eve
      , S = ""
      , T = " "
      , U = "http://www.w3.org/1999/xlink"
      , V = {
        block: "M5,0 0,2.5 5,5z",
        classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
        diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
        open: "M6,1 1,3.5 6,6",
        oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
    }
      , W = {};
    D.toString = function() {
        return "Your browser supports SVG.\nYou are running Raphaël " + this.version
    }
    ;
    var X = function(a, b) {
        if (b) {
            typeof a == "string" && (a = X(a));
            for (var c in b) {
                b[F](c) && (c.substring(0, 6) == "xlink:" ? a.setAttributeNS(U, c.substring(6), H(b[c])) : a.setAttribute(c, H(b[c])))
            }
        } else {
            a = D._g.doc.createElementNS("http://www.w3.org/2000/svg", a),
            a.style && (a.style.webkitTapHighlightColor = "rgba(0,0,0,0)")
        }
        return a
    }
      , Y = function(a, c) {
        var d = "linear"
          , f = a.id + c
          , g = 0.5
          , h = 0.5
          , i = a.node
          , l = a.paper
          , q = i.style
          , z = D._g.doc.getElementById(f);
        if (!z) {
            c = H(c).replace(D._radial_gradient, function(j, k, m) {
                d = "radial";
                if (k && m) {
                    g = J(k),
                    h = J(m);
                    var n = (h > 0.5) * 2 - 1;
                    P(g - 0.5, 2) + P(h - 0.5, 2) > 0.25 && (h = M.sqrt(0.25 - P(g - 0.5, 2)) * n + 0.5) && h != 0.5 && (h = h.toFixed(5) - 1e-05 * n)
                }
                return S
            }),
            c = c.split(/\s*\-\s*/);
            if (d == "linear") {
                var A = c.shift();
                A = -J(A);
                if (isNaN(A)) {
                    return null
                }
                var B = [0, 0, M.cos(D.rad(A)), M.sin(D.rad(A))]
                  , C = 1 / (N(O(B[2]), O(B[3])) || 1);
                B[2] *= C,
                B[3] *= C,
                B[2] < 0 && (B[0] = -B[2],
                B[2] = 0),
                B[3] < 0 && (B[1] = -B[3],
                B[3] = 0)
            }
            var ah = D._parseDots(c);
            if (!ah) {
                return null
            }
            f = f.replace(/[\(\)\s,\xb0#]/g, "_"),
            a.gradient && f != a.gradient.id && (l.defs.removeChild(a.gradient),
            delete a.gradient);
            if (!a.gradient) {
                z = X(d + "Gradient", {
                    id: f
                }),
                a.gradient = z,
                X(z, d == "radial" ? {
                    fx: g,
                    fy: h
                } : {
                    x1: B[0],
                    y1: B[1],
                    x2: B[2],
                    y2: B[3],
                    gradientTransform: a.matrix.invert()
                }),
                l.defs.appendChild(z);
                for (var ai = 0, aj = ah.length; ai < aj; ai++) {
                    z.appendChild(X("stop", {
                        offset: ah[ai].offset ? ah[ai].offset : ai ? "100%" : "0%",
                        "stop-color": ah[ai].color || "#fff"
                    }))
                }
            }
        }
        X(i, {
            fill: "url(#" + f + ")",
            opacity: 1,
            "fill-opacity": 1
        }),
        q.fill = S,
        q.opacity = 1,
        q.fillOpacity = 1;
        return 1
    }
      , Z = function(c) {
        var d = c.getBBox(1);
        X(c.pattern, {
            patternTransform: c.matrix.invert() + " translate(" + d.x + "," + d.y + ")"
        })
    }
      , aa = function(l, p, q) {
        if (l.type == "path") {
            var ai = H(p).toLowerCase().split("-"), ak = l.paper, al = q ? "end" : "start", am = l.node, an = l.attrs, ao = an["stroke-width"], ap = ai.length, aq = "classic", ar, at, au, av, aw, ax = 3, ay = 3, az = 5;
            while (ap--) {
                switch (ai[ap]) {
                case "block":
                case "classic":
                case "oval":
                case "diamond":
                case "open":
                case "none":
                    aq = ai[ap];
                    break;
                case "wide":
                    ay = 5;
                    break;
                case "narrow":
                    ay = 2;
                    break;
                case "long":
                    ax = 5;
                    break;
                case "short":
                    ax = 2
                }
            }
            aq == "open" ? (ax += 2,
            ay += 2,
            az += 2,
            au = 1,
            av = q ? 4 : 1,
            aw = {
                fill: "none",
                stroke: an.stroke
            }) : (av = au = ax / 2,
            aw = {
                fill: an.stroke,
                stroke: "none"
            }),
            l._.arrows ? q ? (l._.arrows.endPath && W[l._.arrows.endPath]--,
            l._.arrows.endMarker && W[l._.arrows.endMarker]--) : (l._.arrows.startPath && W[l._.arrows.startPath]--,
            l._.arrows.startMarker && W[l._.arrows.startMarker]--) : l._.arrows = {};
            if (aq != "none") {
                var a = "raphael-marker-" + aq
                  , b = "raphael-marker-" + al + aq + ax + ay;
                D._g.doc.getElementById(a) ? W[a]++ : (ak.defs.appendChild(X(X("path"), {
                    "stroke-linecap": "round",
                    d: V[aq],
                    id: a
                })),
                W[a] = 1);
                var c = D._g.doc.getElementById(b), o;
                c ? (W[b]++,
                o = c.getElementsByTagName("use")[0]) : (c = X(X("marker"), {
                    id: b,
                    markerHeight: ay,
                    markerWidth: ax,
                    orient: "auto",
                    refX: av,
                    refY: ay / 2
                }),
                o = X(X("use"), {
                    "xlink:href": "#" + a,
                    transform: (q ? "rotate(180 " + ax / 2 + " " + ay / 2 + ") " : S) + "scale(" + ax / az + "," + ay / az + ")",
                    "stroke-width": (1 / ((ax / az + ay / az) / 2)).toFixed(4)
                }),
                c.appendChild(o),
                ak.defs.appendChild(c),
                W[b] = 1),
                X(o, aw);
                var ah = au * (aq != "diamond" && aq != "oval");
                q ? (ar = l._.arrows.startdx * ao || 0,
                at = D.getTotalLength(an.path) - ah * ao) : (ar = ah * ao,
                at = D.getTotalLength(an.path) - (l._.arrows.enddx * ao || 0)),
                aw = {},
                aw["marker-" + al] = "url(#" + b + ")";
                if (at || ar) {
                    aw.d = Raphael.getSubpath(an.path, ar, at)
                }
                X(am, aw),
                l._.arrows[al + "Path"] = a,
                l._.arrows[al + "Marker"] = b,
                l._.arrows[al + "dx"] = ah,
                l._.arrows[al + "Type"] = aq,
                l._.arrows[al + "String"] = p
            } else {
                q ? (ar = l._.arrows.startdx * ao || 0,
                at = D.getTotalLength(an.path) - ar) : (ar = 0,
                at = D.getTotalLength(an.path) - (l._.arrows.enddx * ao || 0)),
                l._.arrows[al + "Path"] && X(am, {
                    d: Raphael.getSubpath(an.path, ar, at)
                }),
                delete l._.arrows[al + "Path"],
                delete l._.arrows[al + "Marker"],
                delete l._.arrows[al + "dx"],
                delete l._.arrows[al + "Type"],
                delete l._.arrows[al + "String"]
            }
            for (aw in W) {
                if (W[F](aw) && !W[aw]) {
                    var aj = D._g.doc.getElementById(aw);
                    aj && aj.parentNode.removeChild(aj)
                }
            }
        }
    }
      , ab = {
        "": [0],
        none: [0],
        "-": [3, 1],
        ".": [1, 1],
        "-.": [3, 1, 1, 1],
        "-..": [3, 1, 1, 1, 1, 1],
        ". ": [1, 3],
        "- ": [4, 3],
        "--": [8, 3],
        "- .": [4, 3, 1, 3],
        "--.": [8, 3, 1, 3],
        "--..": [8, 3, 1, 3, 1, 3]
    }
      , ac = function(c, i, j) {
        i = ab[H(i).toLowerCase()];
        if (i) {
            var k = c.attrs["stroke-width"] || "1"
              , l = {
                round: k,
                square: k,
                butt: 0
            }[c.attrs["stroke-linecap"] || j["stroke-linecap"]] || 0
              , m = []
              , n = i.length;
            while (n--) {
                m[n] = i[n] * k + (n % 2 ? 1 : -1) * l
            }
            X(c.node, {
                "stroke-dasharray": m.join(",")
            })
        }
    }
      , ad = function(e, h) {
        var q = e.node
          , t = e.attrs
          , v = q.style.visibility;
        q.style.visibility = "hidden";
        for (var y in h) {
            if (h[F](y)) {
                if (!D._availableAttrs[F](y)) {
                    continue
                }
                var ah = h[y];
                t[y] = ah;
                switch (y) {
                case "blur":
                    e.blur(ah);
                    break;
                case "href":
                case "title":
                case "target":
                    var ai = q.parentNode;
                    if (ai.tagName.toLowerCase() != "a") {
                        var aj = X("a");
                        ai.insertBefore(aj, q),
                        aj.appendChild(q),
                        ai = aj
                    }
                    y == "target" ? ai.setAttributeNS(U, "templates", ah == "blank" ? "new" : ah) : ai.setAttributeNS(U, y, ah);
                    break;
                case "cursor":
                    q.style.cursor = ah;
                    break;
                case "transform":
                    e.transform(ah);
                    break;
                case "arrow-start":
                    aa(e, ah);
                    break;
                case "arrow-end":
                    aa(e, ah, 1);
                    break;
                case "clip-rect":
                    var ak = H(ah).split(Q);
                    if (ak.length == 4) {
                        e.clip && e.clip.parentNode.parentNode.removeChild(e.clip.parentNode);
                        var al = X("clipPath")
                          , a = X("rect");
                        al.id = D.createUUID(),
                        X(a, {
                            x: ak[0],
                            y: ak[1],
                            width: ak[2],
                            height: ak[3]
                        }),
                        al.appendChild(a),
                        e.paper.defs.appendChild(al),
                        X(q, {
                            "clip-path": "url(#" + al.id + ")"
                        }),
                        e.clip = a
                    }
                    if (!ah) {
                        var b = q.getAttribute("clip-path");
                        if (b) {
                            var c = D._g.doc.getElementById(b.replace(/(^url\(#|\)$)/g, S));
                            c && c.parentNode.removeChild(c),
                            X(q, {
                                "clip-path": S
                            }),
                            delete e.clip
                        }
                    }
                    break;
                case "path":
                    e.type == "path" && (X(q, {
                        d: ah ? t.path = D._pathToAbsolute(ah) : "M0,0"
                    }),
                    e._.dirty = 1,
                    e._.arrows && ("startString"in e._.arrows && aa(e, e._.arrows.startString),
                    "endString"in e._.arrows && aa(e, e._.arrows.endString, 1)));
                    break;
                case "width":
                    q.setAttribute(y, ah),
                    e._.dirty = 1;
                    if (t.fx) {
                        y = "x",
                        ah = t.x
                    } else {
                        break
                    }
                case "x":
                    t.fx && (ah = -t.x - (t.width || 0));
                case "rx":
                    if (y == "rx" && e.type == "rect") {
                        break
                    }
                case "cx":
                    q.setAttribute(y, ah),
                    e.pattern && Z(e),
                    e._.dirty = 1;
                    break;
                case "height":
                    q.setAttribute(y, ah),
                    e._.dirty = 1;
                    if (t.fy) {
                        y = "y",
                        ah = t.y
                    } else {
                        break
                    }
                case "y":
                    t.fy && (ah = -t.y - (t.height || 0));
                case "ry":
                    if (y == "ry" && e.type == "rect") {
                        break
                    }
                case "cy":
                    q.setAttribute(y, ah),
                    e.pattern && Z(e),
                    e._.dirty = 1;
                    break;
                case "r":
                    e.type == "rect" ? X(q, {
                        rx: ah,
                        ry: ah
                    }) : q.setAttribute(y, ah),
                    e._.dirty = 1;
                    break;
                case "src":
                    e.type == "image" && q.setAttributeNS(U, "href", ah);
                    break;
                case "stroke-width":
                    if (e._.sx != 1 || e._.sy != 1) {
                        ah /= N(O(e._.sx), O(e._.sy)) || 1
                    }
                    e.paper._vbSize && (ah *= e.paper._vbSize),
                    q.setAttribute(y, ah),
                    t["stroke-dasharray"] && ac(e, t["stroke-dasharray"], h),
                    e._.arrows && ("startString"in e._.arrows && aa(e, e._.arrows.startString),
                    "endString"in e._.arrows && aa(e, e._.arrows.endString, 1));
                    break;
                case "stroke-dasharray":
                    ac(e, ah, h);
                    break;
                case "fill":
                    var g = H(ah).match(D._ISURL);
                    if (g) {
                        al = X("pattern");
                        var j = X("image");
                        al.id = D.createUUID(),
                        X(al, {
                            x: 0,
                            y: 0,
                            patternUnits: "userSpaceOnUse",
                            height: 1,
                            width: 1
                        }),
                        X(j, {
                            x: 0,
                            y: 0,
                            "xlink:href": g[1]
                        }),
                        al.appendChild(j),
                        function(d) {
                            D._preload(g[1], function() {
                                var f = this.offsetWidth
                                  , i = this.offsetHeight;
                                X(d, {
                                    width: f,
                                    height: i
                                }),
                                X(j, {
                                    width: f,
                                    height: i
                                }),
                                e.paper.safari()
                            })
                        }(al),
                        e.paper.defs.appendChild(al),
                        X(q, {
                            fill: "url(#" + al.id + ")"
                        }),
                        e.pattern = al,
                        e.pattern && Z(e);
                        break
                    }
                    var l = D.getRGB(ah);
                    if (!l.error) {
                        delete h.gradient,
                        delete t.gradient,
                        !D.is(t.opacity, "undefined") && D.is(h.opacity, "undefined") && X(q, {
                            opacity: t.opacity
                        }),
                        !D.is(t["fill-opacity"], "undefined") && D.is(h["fill-opacity"], "undefined") && X(q, {
                            "fill-opacity": t["fill-opacity"]
                        })
                    } else {
                        if ((e.type == "circle" || e.type == "ellipse" || H(ah).charAt() != "r") && Y(e, ah)) {
                            if ("opacity"in t || "fill-opacity"in t) {
                                var n = D._g.doc.getElementById(q.getAttribute("fill").replace(/^url\(#|\)$/g, S));
                                if (n) {
                                    var r = n.getElementsByTagName("stop");
                                    X(r[r.length - 1], {
                                        "stop-opacity": ("opacity"in t ? t.opacity : 1) * ("fill-opacity"in t ? t["fill-opacity"] : 1)
                                    })
                                }
                            }
                            t.gradient = ah,
                            t.fill = "none";
                            break
                        }
                    }
                    l[F]("opacity") && X(q, {
                        "fill-opacity": l.opacity > 1 ? l.opacity / 100 : l.opacity
                    });
                case "stroke":
                    l = D.getRGB(ah),
                    q.setAttribute(y, l.hex),
                    y == "stroke" && l[F]("opacity") && X(q, {
                        "stroke-opacity": l.opacity > 1 ? l.opacity / 100 : l.opacity
                    }),
                    y == "stroke" && e._.arrows && ("startString"in e._.arrows && aa(e, e._.arrows.startString),
                    "endString"in e._.arrows && aa(e, e._.arrows.endString, 1));
                    break;
                case "gradient":
                    (e.type == "circle" || e.type == "ellipse" || H(ah).charAt() != "r") && Y(e, ah);
                    break;
                case "opacity":
                    t.gradient && !t[F]("stroke-opacity") && X(q, {
                        "stroke-opacity": ah > 1 ? ah / 100 : ah
                    });
                case "fill-opacity":
                    if (t.gradient) {
                        n = D._g.doc.getElementById(q.getAttribute("fill").replace(/^url\(#|\)$/g, S)),
                        n && (r = n.getElementsByTagName("stop"),
                        X(r[r.length - 1], {
                            "stop-opacity": ah
                        }));
                        break
                    }
                default:
                    y == "font-size" && (ah = K(ah, 10) + "px");
                    var s = y.replace(/(\-.)/g, function(d) {
                        return d.substring(1).toUpperCase()
                    });
                    q.style[s] = ah,
                    e._.dirty = 1,
                    q.setAttribute(y, ah)
                }
            }
        }
        af(e, h),
        q.style.visibility = v
    }
      , ae = 1.2
      , af = function(a, b) {
        if (a.type == "text" && !!(b[F]("text") || b[F]("font") || b[F]("font-size") || b[F]("x") || b[F]("y"))) {
            var c = a.attrs
              , e = a.node
              , l = e.firstChild ? K(D._g.doc.defaultView.getComputedStyle(e.firstChild, S).getPropertyValue("font-size"), 10) : 10;
            if (b[F]("text")) {
                c.text = b.text;
                while (e.firstChild) {
                    e.removeChild(e.firstChild)
                }
                var q = H(b.text).split("\n"), s = [], t;
                for (var u = 0, v = q.length; u < v; u++) {
                    t = X("tspan"),
                    u && X(t, {
                        dy: l * ae,
                        x: c.x
                    }),
                    t.appendChild(D._g.doc.createTextNode(q[u])),
                    e.appendChild(t),
                    s[u] = t
                }
            } else {
                s = e.getElementsByTagName("tspan");
                for (u = 0,
                v = s.length; u < v; u++) {
                    u ? X(s[u], {
                        dy: l * ae,
                        x: c.x
                    }) : X(s[0], {
                        dy: 0
                    })
                }
            }
            X(e, {
                x: c.x,
                y: c.y
            }),
            a._.dirty = 1;
            var w = a._getBBox()
              , x = c.y - (w.y + w.height / 2);
            x && D.is(x, "finite") && X(s[0], {
                dy: x
            })
        }
    }
      , ag = function(a, f) {
        var g = 0
          , h = 0;
        this[0] = this.node = a,
        a.raphael = !0,
        this.id = D._oid++,
        a.raphaelid = this.id,
        this.matrix = D.matrix(),
        this.realPath = null,
        this.paper = f,
        this.attrs = this.attrs || {},
        this._ = {
            transform: [],
            sx: 1,
            sy: 1,
            deg: 0,
            dx: 0,
            dy: 0,
            dirty: 1
        },
        !f.bottom && (f.bottom = this),
        this.prev = f.top,
        f.top && (f.top.next = this),
        f.top = this,
        this.next = null
    }
      , E = D.el;
    ag.prototype = E,
    E.constructor = ag,
    D._engine.path = function(e, f) {
        var g = X("path");
        f.canvas && f.canvas.appendChild(g);
        var h = new ag(g,f);
        h.type = "path",
        ad(h, {
            fill: "none",
            stroke: "#000",
            path: e
        });
        return h
    }
    ,
    E.rotate = function(c, d, g) {
        if (this.removed) {
            return this
        }
        c = H(c).split(Q),
        c.length - 1 && (d = J(c[1]),
        g = J(c[2])),
        c = J(c[0]),
        g == null && (d = g);
        if (d == null || g == null) {
            var h = this.getBBox(1);
            d = h.x + h.width / 2,
            g = h.y + h.height / 2
        }
        this.transform(this._.transform.concat([["r", c, d, g]]));
        return this
    }
    ,
    E.scale = function(c, d, h, i) {
        if (this.removed) {
            return this
        }
        c = H(c).split(Q),
        c.length - 1 && (d = J(c[1]),
        h = J(c[2]),
        i = J(c[3])),
        c = J(c[0]),
        d == null && (d = c),
        i == null && (h = i);
        if (h == null || i == null) {
            var j = this.getBBox(1)
        }
        h = h == null ? j.x + j.width / 2 : h,
        i = i == null ? j.y + j.height / 2 : i,
        this.transform(this._.transform.concat([["s", c, d, h, i]]));
        return this
    }
    ,
    E.translate = function(c, d) {
        if (this.removed) {
            return this
        }
        c = H(c).split(Q),
        c.length - 1 && (d = J(c[1])),
        c = J(c[0]) || 0,
        d = +d || 0,
        this.transform(this._.transform.concat([["t", c, d]]));
        return this
    }
    ,
    E.transform = function(a) {
        var b = this._;
        if (a == null) {
            return b.transform
        }
        D._extractTransform(this, a),
        this.clip && X(this.clip, {
            transform: this.matrix.invert()
        }),
        this.pattern && Z(this),
        this.node && X(this.node, {
            transform: this.matrix
        });
        if (b.sx != 1 || b.sy != 1) {
            var f = this.attrs[F]("stroke-width") ? this.attrs["stroke-width"] : 1;
            this.attr({
                "stroke-width": f
            })
        }
        return this
    }
    ,
    E.hide = function() {
        !this.removed && this.paper.safari(this.node.style.display = "none");
        return this
    }
    ,
    E.show = function() {
        !this.removed && this.paper.safari(this.node.style.display = "");
        return this
    }
    ,
    E.remove = function() {
        if (!this.removed && !!this.node.parentNode) {
            var a = this.paper;
            a.__set__ && a.__set__.exclude(this),
            R.unbind("raphael.*.*." + this.id),
            this.gradient && a.defs.removeChild(this.gradient),
            D._tear(this, a),
            this.node.parentNode.tagName.toLowerCase() == "a" ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
            for (var d in this) {
                this[d] = typeof this[d] == "function" ? D._removedFactory(d) : null
            }
            this.removed = !0
        }
    }
    ,
    E._getBBox = function() {
        if (this.node.style.display == "none") {
            this.show();
            var d = !0
        }
        var e = {};
        try {
            e = this.node.getBBox()
        } catch (f) {} finally {
            e = e || {}
        }
        d && this.hide();
        return e
    }
    ,
    E.attr = function(a, b) {
        if (this.removed) {
            return this
        }
        if (a == null) {
            var j = {};
            for (var k in this.attrs) {
                this.attrs[F](k) && (j[k] = this.attrs[k])
            }
            j.gradient && j.fill == "none" && (j.fill = j.gradient) && delete j.gradient,
            j.transform = this._.transform;
            return j
        }
        if (b == null && D.is(a, "string")) {
            if (a == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient
            }
            if (a == "transform") {
                return this._.transform
            }
            var q = a.split(Q)
              , r = {};
            for (var s = 0, t = q.length; s < t; s++) {
                a = q[s],
                a in this.attrs ? r[a] = this.attrs[a] : D.is(this.paper.customAttributes[a], "function") ? r[a] = this.paper.customAttributes[a].def : r[a] = D._availableAttrs[a]
            }
            return t - 1 ? r : r[q[0]]
        }
        if (b == null && D.is(a, "array")) {
            r = {};
            for (s = 0,
            t = a.length; s < t; s++) {
                r[a[s]] = this.attr(a[s])
            }
            return r
        }
        if (b != null) {
            var u = {};
            u[a] = b
        } else {
            a != null && D.is(a, "object") && (u = a)
        }
        for (var v in u) {
            R("raphael.attr." + v + "." + this.id, this, u[v])
        }
        for (v in this.paper.customAttributes) {
            if (this.paper.customAttributes[F](v) && u[F](v) && D.is(this.paper.customAttributes[v], "function")) {
                var w = this.paper.customAttributes[v].apply(this, [].concat(u[v]));
                this.attrs[v] = u[v];
                for (var x in w) {
                    w[F](x) && (u[x] = w[x])
                }
            }
        }
        ad(this, u);
        return this
    }
    ,
    E.toFront = function() {
        if (this.removed) {
            return this
        }
        this.node.parentNode.tagName.toLowerCase() == "a" ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
        var a = this.paper;
        a.top != this && D._tofront(this, a);
        return this
    }
    ,
    E.toBack = function() {
        if (this.removed) {
            return this
        }
        var a = this.node.parentNode;
        a.tagName.toLowerCase() == "a" ? a.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : a.firstChild != this.node && a.insertBefore(this.node, this.node.parentNode.firstChild),
        D._toback(this, this.paper);
        var d = this.paper;
        return this
    }
    ,
    E.insertAfter = function(a) {
        if (this.removed) {
            return this
        }
        var d = a.node || a[a.length - 1].node;
        d.nextSibling ? d.parentNode.insertBefore(this.node, d.nextSibling) : d.parentNode.appendChild(this.node),
        D._insertafter(this, a, this.paper);
        return this
    }
    ,
    E.insertBefore = function(a) {
        if (this.removed) {
            return this
        }
        var d = a.node || a[0].node;
        d.parentNode.insertBefore(this.node, d),
        D._insertbefore(this, a, this.paper);
        return this
    }
    ,
    E.blur = function(a) {
        var f = this;
        if (+a !== 0) {
            var g = X("filter")
              , h = X("feGaussianBlur");
            f.attrs.blur = a,
            g.id = D.createUUID(),
            X(h, {
                stdDeviation: +a || 1.5
            }),
            g.appendChild(h),
            f.paper.defs.appendChild(g),
            f._blur = g,
            X(f.node, {
                filter: "url(#" + g.id + ")"
            })
        } else {
            f._blur && (f._blur.parentNode.removeChild(f._blur),
            delete f._blur,
            delete f.attrs.blur),
            f.node.removeAttribute("filter")
        }
    }
    ,
    D._engine.circle = function(g, h, i, j) {
        var k = X("circle");
        g.canvas && g.canvas.appendChild(k);
        var l = new ag(k,g);
        l.attrs = {
            cx: h,
            cy: i,
            r: j,
            fill: "none",
            stroke: "#000"
        },
        l.type = "circle",
        X(k, l.attrs);
        return l
    }
    ,
    D._engine.rect = function(i, j, k, l, m, n) {
        var o = X("rect");
        i.canvas && i.canvas.appendChild(o);
        var p = new ag(o,i);
        p.attrs = {
            x: j,
            y: k,
            width: l,
            height: m,
            r: n || 0,
            rx: n || 0,
            ry: n || 0,
            fill: "none",
            stroke: "#000"
        },
        p.type = "rect",
        X(o, p.attrs);
        return p
    }
    ,
    D._engine.ellipse = function(h, i, j, k, l) {
        var m = X("ellipse");
        h.canvas && h.canvas.appendChild(m);
        var n = new ag(m,h);
        n.attrs = {
            cx: i,
            cy: j,
            rx: k,
            ry: l,
            fill: "none",
            stroke: "#000"
        },
        n.type = "ellipse",
        X(m, n.attrs);
        return n
    }
    ,
    D._engine.image = function(i, j, k, l, m, n) {
        var o = X("image");
        X(o, {
            x: k,
            y: l,
            width: m,
            height: n,
            preserveAspectRatio: "none"
        }),
        o.setAttributeNS(U, "href", j),
        i.canvas && i.canvas.appendChild(o);
        var p = new ag(o,i);
        p.attrs = {
            x: k,
            y: l,
            width: m,
            height: n,
            src: j
        },
        p.type = "image";
        return p
    }
    ,
    D._engine.text = function(a, h, i, j) {
        var k = X("text");
        a.canvas && a.canvas.appendChild(k);
        var l = new ag(k,a);
        l.attrs = {
            x: h,
            y: i,
            "text-anchor": "middle",
            text: j,
            font: D._availableAttrs.font,
            stroke: "none",
            fill: "#000"
        },
        l.type = "text",
        ad(l, l.attrs);
        return l
    }
    ,
    D._engine.setSize = function(c, d) {
        this.width = c || this.width,
        this.height = d || this.height,
        this.canvas.setAttribute("width", this.width),
        this.canvas.setAttribute("height", this.height),
        this._viewBox && this.setViewBox.apply(this, this._viewBox);
        return this
    }
    ,
    D._engine.create = function() {
        var a = D._getContainer.apply(0, arguments)
          , k = a && a.container
          , l = a.x
          , m = a.y
          , n = a.width
          , o = a.height;
        if (!k) {
            throw new Error("SVG container not found.")
        }
        var p = X("svg"), q = "overflow:hidden;", r;
        l = l || 0,
        m = m || 0,
        n = n || 512,
        o = o || 342,
        X(p, {
            height: o,
            version: 1.1,
            width: n,
            xmlns: "http://www.w3.org/2000/svg"
        }),
        k == 1 ? (p.style.cssText = q + "position:absolute;left:" + l + "px;top:" + m + "px",
        D._g.doc.body.appendChild(p),
        r = 1) : (p.style.cssText = q + "position:relative",
        k.firstChild ? k.insertBefore(p, k.firstChild) : k.appendChild(p)),
        k = new D._Paper,
        k.width = n,
        k.height = o,
        k.canvas = p,
        k.clear(),
        k._left = k._top = 0,
        r && (k.renderfix = function() {}
        ),
        k.renderfix();
        return k
    }
    ,
    D._engine.setViewBox = function(g, k, m, n, o) {
        R("raphael.setViewBox", this, this._viewBox, [g, k, m, n, o]);
        var p = N(m / this.width, n / this.height), q = this.top, r = o ? "meet" : "xMinYMin", s, t;
        g == null ? (this._vbSize && (p = 1),
        delete this._vbSize,
        s = "0 0 " + this.width + T + this.height) : (this._vbSize = p,
        s = g + T + k + T + m + T + n),
        X(this.canvas, {
            viewBox: s,
            preserveAspectRatio: r
        });
        while (p && q) {
            t = "stroke-width"in q.attrs ? q.attrs["stroke-width"] : 1,
            q.attr({
                "stroke-width": t
            }),
            q._.dirty = 1,
            q._.dirtyT = 1,
            q = q.prev
        }
        this._viewBox = [g, k, m, n, !!o];
        return this
    }
    ,
    D.prototype.renderfix = function() {
        var g = this.canvas, h = g.style, i;
        try {
            i = g.getScreenCTM() || g.createSVGMatrix()
        } catch (j) {
            i = g.createSVGMatrix()
        }
        var k = -i.e % 1
          , l = -i.f % 1;
        if (k || l) {
            k && (this._left = (this._left + k) % 1,
            h.left = this._left + "px"),
            l && (this._top = (this._top + l) % 1,
            h.top = this._top + "px")
        }
    }
    ,
    D.prototype.clear = function() {
        D.eve("raphael.clear", this);
        var a = this.canvas;
        while (a.firstChild) {
            a.removeChild(a.firstChild)
        }
        this.bottom = this.top = null,
        (this.desc = X("desc")).appendChild(D._g.doc.createTextNode("Created with Raphaël " + D.version)),
        a.appendChild(this.desc),
        a.appendChild(this.defs = X("defs"))
    }
    ,
    D.prototype.remove = function() {
        R("raphael.remove", this),
        this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
        for (var a in this) {
            this[a] = typeof this[a] == "function" ? D._removedFactory(a) : null
        }
    }
    ;
    var G = D.st;
    for (var I in E) {
        E[F](I) && !G[F](I) && (G[I] = function(b) {
            return function() {
                var a = arguments;
                return this.forEach(function(d) {
                    d[b].apply(d, a)
                })
            }
        }(I))
    }
}(window.Raphael),
window.Raphael.vml && function(I) {
    var K = "hasOwnProperty"
      , N = String
      , P = parseFloat
      , R = Math
      , T = R.round
      , V = R.max
      , X = R.min
      , Z = R.abs
      , aa = "fill"
      , ab = /[, ]+/
      , ac = I.eve
      , ad = " progid:DXImageTransform.Microsoft"
      , ae = " "
      , af = ""
      , ag = {
        M: "m",
        L: "l",
        C: "c",
        Z: "x",
        m: "t",
        l: "r",
        c: "v",
        z: "x"
    }
      , ah = /([clmz]),?([^clmz]*)/gi
      , ai = / progid:\S+Blur\([^\)]+\)/g
      , aj = /-?[^,\s-]+/g
      , ak = "position:absolute;left:0;top:0;width:1px;height:1px"
      , al = 21600
      , am = {
        path: 1,
        rect: 1,
        image: 1
    }
      , an = {
        circle: 1,
        ellipse: 1
    }
      , ao = function(a) {
        var c = /[ahqstv]/ig
          , f = I._pathToAbsolute;
        N(a).match(c) && (f = I._path2curve),
        c = /[clmz]/g;
        if (f == I._pathToAbsolute && !N(a).match(c)) {
            var n = N(a).replace(ah, function(h, i, j) {
                var k = []
                  , l = i.toLowerCase() == "m"
                  , m = ag[i];
                j.replace(aj, function(b) {
                    l && k.length == 2 && (m += k + ag[i == "m" ? "l" : "L"],
                    k = []),
                    k.push(T(b * al))
                });
                return m + k
            });
            return n
        }
        var o = f(a), p, q;
        n = [];
        for (var s = 0, t = o.length; s < t; s++) {
            p = o[s],
            q = o[s][0].toLowerCase(),
            q == "z" && (q = "x");
            for (var u = 1, v = p.length; u < v; u++) {
                q += T(p[u] * al) + (u != v - 1 ? "," : af)
            }
            n.push(q)
        }
        return n.join(ae)
    }
      , ap = function(a, f, g) {
        var h = I.matrix();
        h.rotate(-a, 0.5, 0.5);
        return {
            dx: h.x(f, g),
            dy: h.y(f, g)
        }
    }
      , aq = function(i, j, n, u, w, x) {
        var y = i._, z = i.matrix, A = y.fillpos, B = i.node, C = B.style, D = 1, E = "", F, G = al / j, H = al / n;
        C.visibility = "hidden";
        if (!!j && !!n) {
            B.coordsize = Z(G) + ae + Z(H),
            C.rotation = x * (j * n < 0 ? -1 : 1);
            if (x) {
                var ar = ap(x, u, w);
                u = ar.dx,
                w = ar.dy
            }
            j < 0 && (E += "x"),
            n < 0 && (E += " y") && (D = -1),
            C.flip = E,
            B.coordorigin = u * -G + ae + w * -H;
            if (A || y.fillsize) {
                var at = B.getElementsByTagName(aa);
                at = at && at[0],
                B.removeChild(at),
                A && (ar = ap(x, z.x(A[0], A[1]), z.y(A[0], A[1])),
                at.position = ar.dx * D + ae + ar.dy * D),
                y.fillsize && (at.size = y.fillsize[0] * Z(j) + ae + y.fillsize[1] * Z(n)),
                B.appendChild(at)
            }
            C.visibility = "visible"
        }
    };
    I.toString = function() {
        return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
    }
    ;
    var J = function(c, l, m) {
        var n = N(l).toLowerCase().split("-")
          , o = m ? "end" : "start"
          , p = n.length
          , q = "classic"
          , r = "medium"
          , s = "medium";
        while (p--) {
            switch (n[p]) {
            case "block":
            case "classic":
            case "oval":
            case "diamond":
            case "open":
            case "none":
                q = n[p];
                break;
            case "wide":
            case "narrow":
                s = n[p];
                break;
            case "long":
            case "short":
                r = n[p]
            }
        }
        var t = c.node.getElementsByTagName("stroke")[0];
        t[o + "arrow"] = q,
        t[o + "arrowlength"] = r,
        t[o + "arrowwidth"] = s
    }
      , M = function(h, o) {
        h.attrs = h.attrs || {};
        var x = h.node, A = h.attrs, at = x.style, av, ax = am[h.type] && (o.x != A.x || o.y != A.y || o.width != A.width || o.height != A.height || o.cx != A.cx || o.cy != A.cy || o.rx != A.rx || o.ry != A.ry || o.r != A.r), ay = an[h.type] && (A.cx != o.cx || A.cy != o.cy || A.r != o.r || A.rx != o.rx || A.ry != o.ry), az = h;
        for (var aF in o) {
            o[K](aF) && (A[aF] = o[aF])
        }
        ax && (A.path = I._getPath[h.type](h),
        h._.dirty = 1),
        o.href && (x.href = o.href),
        o.title && (x.title = o.title),
        o.target && (x.target = o.target),
        o.cursor && (at.cursor = o.cursor),
        "blur"in o && h.blur(o.blur);
        if (o.path && h.type == "path" || ax) {
            x.path = ao(~N(A.path).toLowerCase().indexOf("r") ? I._pathToAbsolute(A.path) : A.path),
            h.type == "image" && (h._.fillpos = [A.x, A.y],
            h._.fillsize = [A.width, A.height],
            aq(h, 1, 1, 0, 0, 0))
        }
        "transform"in o && h.transform(o.transform);
        if (ay) {
            var c = +A.cx
              , g = +A.cy
              , j = +A.rx || +A.r || 0
              , k = +A.ry || +A.r || 0;
            x.path = I.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", T((c - j) * al), T((g - k) * al), T((c + j) * al), T((g + k) * al), T(c * al))
        }
        if ("clip-rect"in o) {
            var n = N(o["clip-rect"]).split(ab);
            if (n.length == 4) {
                n[2] = +n[2] + +n[0],
                n[3] = +n[3] + +n[1];
                var u = x.clipRect || I._g.doc.createElement("div")
                  , v = u.style;
                v.clip = I.format("rect({1}px {2}px {3}px {0}px)", n),
                x.clipRect || (v.position = "absolute",
                v.top = 0,
                v.left = 0,
                v.width = h.paper.width + "px",
                v.height = h.paper.height + "px",
                x.parentNode.insertBefore(u, x),
                u.appendChild(x),
                x.clipRect = u)
            }
            o["clip-rect"] || x.clipRect && (x.clipRect.style.clip = "auto")
        }
        if (h.textpath) {
            var w = h.textpath.style;
            o.font && (w.font = o.font),
            o["font-family"] && (w.fontFamily = '"' + o["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, af) + '"'),
            o["font-size"] && (w.fontSize = o["font-size"]),
            o["font-weight"] && (w.fontWeight = o["font-weight"]),
            o["font-style"] && (w.fontStyle = o["font-style"])
        }
        "arrow-start"in o && J(az, o["arrow-start"]),
        "arrow-end"in o && J(az, o["arrow-end"], 1);
        if (o.opacity != null || o["stroke-width"] != null || o.fill != null || o.src != null || o.stroke != null || o["stroke-width"] != null || o["stroke-opacity"] != null || o["fill-opacity"] != null || o["stroke-dasharray"] != null || o["stroke-miterlimit"] != null || o["stroke-linejoin"] != null || o["stroke-linecap"] != null) {
            var z = x.getElementsByTagName(aa)
              , C = !1;
            z = z && z[0],
            !z && (C = z = U(aa)),
            h.type == "image" && o.src && (z.src = o.src),
            o.fill && (z.on = !0);
            if (z.on == null || o.fill == "none" || o.fill === null) {
                z.on = !1
            }
            if (z.on && o.fill) {
                var F = N(o.fill).match(I._ISURL);
                if (F) {
                    z.parentNode == x && x.removeChild(z),
                    z.rotate = !0,
                    z.src = F[1],
                    z.type = "tile";
                    var ar = h.getBBox(1);
                    z.position = ar.x + ae + ar.y,
                    h._.fillpos = [ar.x, ar.y],
                    I._preload(F[1], function() {
                        h._.fillsize = [this.offsetWidth, this.offsetHeight]
                    })
                } else {
                    z.color = I.getRGB(o.fill).hex,
                    z.src = af,
                    z.type = "solid",
                    I.getRGB(o.fill).error && (az.type in {
                        circle: 1,
                        ellipse: 1
                    } || N(o.fill).charAt() != "r") && O(az, o.fill, z) && (A.fill = "none",
                    A.gradient = o.fill,
                    z.rotate = !1)
                }
            }
            if ("fill-opacity"in o || "opacity"in o) {
                var au = ((+A["fill-opacity"] + 1 || 2) - 1) * ((+A.opacity + 1 || 2) - 1) * ((+I.getRGB(o.fill).o + 1 || 2) - 1);
                au = X(V(au, 0), 1),
                z.opacity = au,
                z.src && (z.color = "none")
            }
            x.appendChild(z);
            var aw = x.getElementsByTagName("stroke") && x.getElementsByTagName("stroke")[0]
              , aA = !1;
            !aw && (aA = aw = U("stroke"));
            if (o.stroke && o.stroke != "none" || o["stroke-width"] || o["stroke-opacity"] != null || o["stroke-dasharray"] || o["stroke-miterlimit"] || o["stroke-linejoin"] || o["stroke-linecap"]) {
                aw.on = !0
            }
            (o.stroke == "none" || o.stroke === null || aw.on == null || o.stroke == 0 || o["stroke-width"] == 0) && (aw.on = !1);
            var aB = I.getRGB(o.stroke);
            aw.on && o.stroke && (aw.color = aB.hex),
            au = ((+A["stroke-opacity"] + 1 || 2) - 1) * ((+A.opacity + 1 || 2) - 1) * ((+aB.o + 1 || 2) - 1);
            var aC = (P(o["stroke-width"]) || 1) * 0.75;
            au = X(V(au, 0), 1),
            o["stroke-width"] == null && (aC = A["stroke-width"]),
            o["stroke-width"] && (aw.weight = aC),
            aC && aC < 1 && (au *= aC) && (aw.weight = 1),
            aw.opacity = au,
            o["stroke-linejoin"] && (aw.joinstyle = o["stroke-linejoin"] || "miter"),
            aw.miterlimit = o["stroke-miterlimit"] || 8,
            o["stroke-linecap"] && (aw.endcap = o["stroke-linecap"] == "butt" ? "flat" : o["stroke-linecap"] == "square" ? "square" : "round");
            if (o["stroke-dasharray"]) {
                var aD = {
                    "-": "shortdash",
                    ".": "shortdot",
                    "-.": "shortdashdot",
                    "-..": "shortdashdotdot",
                    ". ": "dot",
                    "- ": "dash",
                    "--": "longdash",
                    "- .": "dashdot",
                    "--.": "longdashdot",
                    "--..": "longdashdotdot"
                };
                aw.dashstyle = aD[K](o["stroke-dasharray"]) ? aD[o["stroke-dasharray"]] : af
            }
            aA && x.appendChild(aw)
        }
        if (az.type == "text") {
            az.paper.canvas.style.display = af;
            var aE = az.paper.span
              , aG = 100
              , aH = A.font && A.font.match(/\d+(?:\.\d*)?(?=px)/);
            at = aE.style,
            A.font && (at.font = A.font),
            A["font-family"] && (at.fontFamily = A["font-family"]),
            A["font-weight"] && (at.fontWeight = A["font-weight"]),
            A["font-style"] && (at.fontStyle = A["font-style"]),
            aH = P(A["font-size"] || aH && aH[0]) || 10,
            at.fontSize = aH * aG + "px",
            az.textpath.string && (aE.innerHTML = N(az.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
            var a = aE.getBoundingClientRect();
            az.W = A.w = (a.right - a.left) / aG,
            az.H = A.h = (a.bottom - a.top) / aG,
            az.X = A.x,
            az.Y = A.y + az.H / 2,
            ("x"in o || "y"in o) && (az.path.v = I.format("m{0},{1}l{2},{1}", T(A.x * al), T(A.y * al), T(A.x * al) + 1));
            var b = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
            for (var d = 0, f = b.length; d < f; d++) {
                if (b[d]in o) {
                    az._.dirty = 1;
                    break
                }
            }
            switch (A["text-anchor"]) {
            case "start":
                az.textpath.style["v-text-align"] = "left",
                az.bbx = az.W / 2;
                break;
            case "end":
                az.textpath.style["v-text-align"] = "right",
                az.bbx = -az.W / 2;
                break;
            default:
                az.textpath.style["v-text-align"] = "center",
                az.bbx = 0
            }
            az.textpath.style["v-text-kern"] = !0
        }
    }
      , O = function(a, c, d) {
        a.attrs = a.attrs || {};
        var e = a.attrs, n = Math.pow, o, u, v = "linear", w = ".5 .5";
        a.attrs.gradient = c,
        c = N(c).replace(I._radial_gradient, function(f, g, h) {
            v = "radial",
            g && h && (g = P(g),
            h = P(h),
            n(g - 0.5, 2) + n(h - 0.5, 2) > 0.25 && (h = R.sqrt(0.25 - n(g - 0.5, 2)) * ((h > 0.5) * 2 - 1) + 0.5),
            w = g + ae + h);
            return af
        }),
        c = c.split(/\s*\-\s*/);
        if (v == "linear") {
            var x = c.shift();
            x = -P(x);
            if (isNaN(x)) {
                return null
            }
        }
        var y = I._parseDots(c);
        if (!y) {
            return null
        }
        a = a.shape || a.node;
        if (y.length) {
            a.removeChild(d),
            d.on = !0,
            d.method = "none",
            d.color = y[0].color,
            d.color2 = y[y.length - 1].color;
            var z = [];
            for (var A = 0, B = y.length; A < B; A++) {
                y[A].offset && z.push(y[A].offset + ae + y[A].color)
            }
            d.colors = z.length ? z.join() : "0% " + d.color,
            v == "radial" ? (d.type = "gradientTitle",
            d.focus = "100%",
            d.focussize = "0 0",
            d.focusposition = w,
            d.angle = 0) : (d.type = "gradient",
            d.angle = (270 - x) % 360),
            a.appendChild(d)
        }
        return 1
    }
      , Q = function(a, d) {
        this[0] = this.node = a,
        a.raphael = !0,
        this.id = I._oid++,
        a.raphaelid = this.id,
        this.X = 0,
        this.Y = 0,
        this.attrs = {},
        this.paper = d,
        this.matrix = I.matrix(),
        this._ = {
            transform: [],
            sx: 1,
            sy: 1,
            dx: 0,
            dy: 0,
            deg: 0,
            dirty: 1,
            dirtyT: 1
        },
        !d.bottom && (d.bottom = this),
        this.prev = d.top,
        d.top && (d.top.next = this),
        d.top = this,
        this.next = null
    }
      , S = I.el;
    Q.prototype = S,
    S.constructor = Q,
    S.transform = function(a) {
        if (a == null) {
            return this._.transform
        }
        var c = this.paper._viewBoxShift, n = c ? "s" + [c.scale, c.scale] + "-1-1t" + [c.dx, c.dy] : af, o;
        c && (o = a = N(a).replace(/\.{3}|\u2026/g, this._.transform || af)),
        I._extractTransform(this, n + a);
        var s = this.matrix.clone(), t = this.skew, u = this.node, v, w = ~N(this.attrs.fill).indexOf("-"), x = !N(this.attrs.fill).indexOf("url(");
        s.translate(-0.5, -0.5);
        if (x || w || this.type == "image") {
            t.matrix = "1 0 0 1",
            t.offset = "0 0",
            v = s.split();
            if (w && v.noRotation || !v.isSimple) {
                u.style.filter = s.toFilter();
                var y = this.getBBox()
                  , z = this.getBBox(1)
                  , A = y.x - z.x
                  , B = y.y - z.y;
                u.coordorigin = A * -al + ae + B * -al,
                aq(this, 1, 1, A, B, 0)
            } else {
                u.style.filter = af,
                aq(this, v.scalex, v.scaley, v.dx, v.dy, v.rotate)
            }
        } else {
            u.style.filter = af,
            t.matrix = N(s),
            t.offset = s.offset()
        }
        o && (this._.transform = o);
        return this
    }
    ,
    S.rotate = function(c, d, g) {
        if (this.removed) {
            return this
        }
        if (c != null) {
            c = N(c).split(ab),
            c.length - 1 && (d = P(c[1]),
            g = P(c[2])),
            c = P(c[0]),
            g == null && (d = g);
            if (d == null || g == null) {
                var h = this.getBBox(1);
                d = h.x + h.width / 2,
                g = h.y + h.height / 2
            }
            this._.dirtyT = 1,
            this.transform(this._.transform.concat([["r", c, d, g]]));
            return this
        }
    }
    ,
    S.translate = function(c, d) {
        if (this.removed) {
            return this
        }
        c = N(c).split(ab),
        c.length - 1 && (d = P(c[1])),
        c = P(c[0]) || 0,
        d = +d || 0,
        this._.bbox && (this._.bbox.x += c,
        this._.bbox.y += d),
        this.transform(this._.transform.concat([["t", c, d]]));
        return this
    }
    ,
    S.scale = function(c, d, h, i) {
        if (this.removed) {
            return this
        }
        c = N(c).split(ab),
        c.length - 1 && (d = P(c[1]),
        h = P(c[2]),
        i = P(c[3]),
        isNaN(h) && (h = null),
        isNaN(i) && (i = null)),
        c = P(c[0]),
        d == null && (d = c),
        i == null && (h = i);
        if (h == null || i == null) {
            var j = this.getBBox(1)
        }
        h = h == null ? j.x + j.width / 2 : h,
        i = i == null ? j.y + j.height / 2 : i,
        this.transform(this._.transform.concat([["s", c, d, h, i]])),
        this._.dirtyT = 1;
        return this
    }
    ,
    S.hide = function() {
        !this.removed && (this.node.style.display = "none");
        return this
    }
    ,
    S.show = function() {
        !this.removed && (this.node.style.display = af);
        return this
    }
    ,
    S._getBBox = function() {
        if (this.removed) {
            return {}
        }
        return {
            x: this.X + (this.bbx || 0) - this.W / 2,
            y: this.Y - this.H,
            width: this.W,
            height: this.H
        }
    }
    ,
    S.remove = function() {
        if (!this.removed && !!this.node.parentNode) {
            this.paper.__set__ && this.paper.__set__.exclude(this),
            I.eve.unbind("raphael.*.*." + this.id),
            I._tear(this, this.paper),
            this.node.parentNode.removeChild(this.node),
            this.shape && this.shape.parentNode.removeChild(this.shape);
            for (var a in this) {
                this[a] = typeof this[a] == "function" ? I._removedFactory(a) : null
            }
            this.removed = !0
        }
    }
    ,
    S.attr = function(a, b) {
        if (this.removed) {
            return this
        }
        if (a == null) {
            var j = {};
            for (var k in this.attrs) {
                this.attrs[K](k) && (j[k] = this.attrs[k])
            }
            j.gradient && j.fill == "none" && (j.fill = j.gradient) && delete j.gradient,
            j.transform = this._.transform;
            return j
        }
        if (b == null && I.is(a, "string")) {
            if (a == aa && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient
            }
            var l = a.split(ab)
              , r = {};
            for (var s = 0, t = l.length; s < t; s++) {
                a = l[s],
                a in this.attrs ? r[a] = this.attrs[a] : I.is(this.paper.customAttributes[a], "function") ? r[a] = this.paper.customAttributes[a].def : r[a] = I._availableAttrs[a]
            }
            return t - 1 ? r : r[l[0]]
        }
        if (this.attrs && b == null && I.is(a, "array")) {
            r = {};
            for (s = 0,
            t = a.length; s < t; s++) {
                r[a[s]] = this.attr(a[s])
            }
            return r
        }
        var u;
        b != null && (u = {},
        u[a] = b),
        b == null && I.is(a, "object") && (u = a);
        for (var v in u) {
            ac("raphael.attr." + v + "." + this.id, this, u[v])
        }
        if (u) {
            for (v in this.paper.customAttributes) {
                if (this.paper.customAttributes[K](v) && u[K](v) && I.is(this.paper.customAttributes[v], "function")) {
                    var w = this.paper.customAttributes[v].apply(this, [].concat(u[v]));
                    this.attrs[v] = u[v];
                    for (var x in w) {
                        w[K](x) && (u[x] = w[x])
                    }
                }
            }
            u.text && this.type == "text" && (this.textpath.string = u.text),
            M(this, u)
        }
        return this
    }
    ,
    S.toFront = function() {
        !this.removed && this.node.parentNode.appendChild(this.node),
        this.paper && this.paper.top != this && I._tofront(this, this.paper);
        return this
    }
    ,
    S.toBack = function() {
        if (this.removed) {
            return this
        }
        this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild),
        I._toback(this, this.paper));
        return this
    }
    ,
    S.insertAfter = function(a) {
        if (this.removed) {
            return this
        }
        a.constructor == I.st.constructor && (a = a[a.length - 1]),
        a.node.nextSibling ? a.node.parentNode.insertBefore(this.node, a.node.nextSibling) : a.node.parentNode.appendChild(this.node),
        I._insertafter(this, a, this.paper);
        return this
    }
    ,
    S.insertBefore = function(a) {
        if (this.removed) {
            return this
        }
        a.constructor == I.st.constructor && (a = a[0]),
        a.node.parentNode.insertBefore(this.node, a.node),
        I._insertbefore(this, a, this.paper);
        return this
    }
    ,
    S.blur = function(a) {
        var e = this.node.runtimeStyle
          , f = e.filter;
        f = f.replace(ai, af),
        +a !== 0 ? (this.attrs.blur = a,
        e.filter = f + ae + ad + ".Blur(pixelradius=" + (+a || 1.5) + ")",
        e.margin = I.format("-{0}px 0 0 -{0}px", T(+a || 1.5))) : (e.filter = f,
        e.margin = 0,
        delete this.attrs.blur)
    }
    ,
    I._engine.path = function(g, h) {
        var i = U("shape");
        i.style.cssText = ak,
        i.coordsize = al + ae + al,
        i.coordorigin = h.coordorigin;
        var j = new Q(i,h)
          , k = {
            fill: "none",
            stroke: "#000"
        };
        g && (k.path = g),
        j.type = "path",
        j.path = [],
        j.Path = af,
        M(j, k),
        h.canvas.appendChild(i);
        var l = U("skew");
        l.on = !0,
        i.appendChild(l),
        j.skew = l,
        j.transform(af);
        return j
    }
    ,
    I._engine.rect = function(a, k, l, m, n, o) {
        var p = I._rectPath(k, l, m, n, o)
          , q = a.path(p)
          , r = q.attrs;
        q.X = r.x = k,
        q.Y = r.y = l,
        q.W = r.width = m,
        q.H = r.height = n,
        r.r = o,
        r.path = p,
        q.type = "rect";
        return q
    }
    ,
    I._engine.ellipse = function(h, i, j, k, l) {
        var m = h.path()
          , n = m.attrs;
        m.X = i - k,
        m.Y = j - l,
        m.W = k * 2,
        m.H = l * 2,
        m.type = "ellipse",
        M(m, {
            cx: i,
            cy: j,
            rx: k,
            ry: l
        });
        return m
    }
    ,
    I._engine.circle = function(g, h, i, j) {
        var k = g.path()
          , l = k.attrs;
        k.X = h - j,
        k.Y = i - j,
        k.W = k.H = j * 2,
        k.type = "circle",
        M(k, {
            cx: h,
            cy: i,
            r: j
        });
        return k
    }
    ,
    I._engine.image = function(a, j, n, o, p, q) {
        var r = I._rectPath(n, o, p, q)
          , s = a.path(r).attr({
            stroke: "none"
        })
          , t = s.attrs
          , u = s.node
          , v = u.getElementsByTagName(aa)[0];
        t.src = j,
        s.X = t.x = n,
        s.Y = t.y = o,
        s.W = t.width = p,
        s.H = t.height = q,
        t.path = r,
        s.type = "image",
        v.parentNode == u && u.removeChild(v),
        v.rotate = !0,
        v.src = j,
        v.type = "tile",
        s._.fillpos = [n, o],
        s._.fillsize = [p, q],
        u.appendChild(v),
        aq(s, 1, 1, 0, 0, 0);
        return s
    }
    ,
    I._engine.text = function(a, c, f, n) {
        var o = U("shape")
          , p = U("path")
          , q = U("textpath");
        c = c || 0,
        f = f || 0,
        n = n || "",
        p.v = I.format("m{0},{1}l{2},{1}", T(c * al), T(f * al), T(c * al) + 1),
        p.textpathok = !0,
        q.string = N(n),
        q.on = !0,
        o.style.cssText = ak,
        o.coordsize = al + ae + al,
        o.coordorigin = "0 0";
        var r = new Q(o,a)
          , s = {
            fill: "#000",
            stroke: "none",
            font: I._availableAttrs.font,
            text: n
        };
        r.shape = o,
        r.path = p,
        r.textpath = q,
        r.type = "text",
        r.attrs.text = N(n),
        r.attrs.x = c,
        r.attrs.y = f,
        r.attrs.w = 1,
        r.attrs.h = 1,
        M(r, s),
        o.appendChild(q),
        o.appendChild(p),
        a.canvas.appendChild(o);
        var t = U("skew");
        t.on = !0,
        o.appendChild(t),
        r.skew = t,
        r.transform(af);
        return r
    }
    ,
    I._engine.setSize = function(a, e) {
        var f = this.canvas.style;
        this.width = a,
        this.height = e,
        a == +a && (a += "px"),
        e == +e && (e += "px"),
        f.width = a,
        f.height = e,
        f.clip = "rect(0 " + a + " " + e + " 0)",
        this._viewBox && I._engine.setViewBox.apply(this, this._viewBox);
        return this
    }
    ,
    I._engine.setViewBox = function(a, g, m, n, o) {
        I.eve("raphael.setViewBox", this, this._viewBox, [a, g, m, n, o]);
        var p = this.width, q = this.height, r = 1 / V(m / p, n / q), s, t;
        o && (s = q / n,
        t = p / m,
        m * s < p && (a -= (p - m * s) / 2 / s),
        n * t < q && (g -= (q - n * t) / 2 / t)),
        this._viewBox = [a, g, m, n, !!o],
        this._viewBoxShift = {
            dx: -a,
            dy: -g,
            scale: r
        },
        this.forEach(function(b) {
            b.transform("...")
        });
        return this
    }
    ;
    var U;
    I._engine.initWin = function(d) {
        var e = d.document;
        e.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            !e.namespaces.rvml && e.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
            U = function(b) {
                return e.createElement("<rvml:" + b + ' class="rvml">')
            }
        } catch (f) {
            U = function(b) {
                return e.createElement("<" + b + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
            }
        }
    }
    ,
    I._engine.initWin(I._g.win),
    I._engine.create = function() {
        var a = I._getContainer.apply(0, arguments), l = a.container, m = a.height, n, o = a.width, p = a.x, q = a.y;
        if (!l) {
            throw new Error("VML container not found.")
        }
        var r = new I._Paper
          , s = r.canvas = I._g.doc.createElement("div")
          , t = s.style;
        p = p || 0,
        q = q || 0,
        o = o || 512,
        m = m || 342,
        r.width = o,
        r.height = m,
        o == +o && (o += "px"),
        m == +m && (m += "px"),
        r.coordsize = al * 1000 + ae + al * 1000,
        r.coordorigin = "0 0",
        r.span = I._g.doc.createElement("span"),
        r.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",
        s.appendChild(r.span),
        t.cssText = I.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", o, m),
        l == 1 ? (I._g.doc.body.appendChild(s),
        t.left = p + "px",
        t.top = q + "px",
        t.position = "absolute") : l.firstChild ? l.insertBefore(s, l.firstChild) : l.appendChild(s),
        r.renderfix = function() {}
        ;
        return r
    }
    ,
    I.prototype.clear = function() {
        I.eve("raphael.clear", this),
        this.canvas.innerHTML = af,
        this.span = I._g.doc.createElement("span"),
        this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;",
        this.canvas.appendChild(this.span),
        this.bottom = this.top = null
    }
    ,
    I.prototype.remove = function() {
        I.eve("raphael.remove", this),
        this.canvas.parentNode.removeChild(this.canvas);
        for (var a in this) {
            this[a] = typeof this[a] == "function" ? I._removedFactory(a) : null
        }
        return !0
    }
    ;
    var W = I.st;
    for (var Y in S) {
        S[K](Y) && !W[K](Y) && (W[Y] = function(b) {
            return function() {
                var a = arguments;
                return this.forEach(function(d) {
                    d[b].apply(d, a)
                })
            }
        }(Y))
    }
}(window.Raphael);
/*
 * Pause jQuery plugin v0.1
 *
 * Copyright 2010 by Tobia Conforto <tobia.conforto@gmail.com>
 *
 * Based on Pause-resume-animation jQuery plugin by Joe Weitzel
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or(at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */
(function() {
    var a = jQuery
      , e = "jQuery.pause"
      , f = 1
      , d = a.fn.animate
      , b = {};
    function c() {
        return new Date().getTime()
    }
    a.fn.animate = function(j, k, h, g) {
        var i = a.speed(k, h, g);
        i.complete = i.old;
        return this.each(function() {
            if (!this[e]) {
                this[e] = f++
            }
            var l = a.extend({}, i);
            d.apply(a(this), [j, a.extend({}, l)]);
            b[this[e]] = {
                run: true,
                prop: j,
                opt: l,
                start: c(),
                done: 0
            }
        })
    }
    ;
    a.fn.pause = function() {
        return this.each(function() {
            if (!this[e]) {
                this[e] = f++
            }
            var g = b[this[e]];
            if (g && g.run) {
                g.done += c() - g.start;
                if (g.done > g.opt.duration) {
                    delete b[this[e]]
                } else {
                    a(this).stop();
                    g.run = false
                }
            }
        })
    }
    ;
    a.fn.resume = function() {
        return this.each(function() {
            if (!this[e]) {
                this[e] = f++
            }
            var g = b[this[e]];
            if (g && !g.run) {
                g.opt.duration -= g.done;
                g.done = 0;
                g.run = true;
                g.start = c();
                d.apply(a(this), [g.prop, a.extend({}, g.opt)])
            }
        })
    }
}
)();
/* iCheck v1.0.2 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
(function(e) {
    function a(k, l, n) {
        var m = k[0]
          , t = /er/.test(n) ? _indeterminate : /bl/.test(n) ? j : g
          , q = n == _update ? {
            checked: m[g],
            disabled: m[j],
            indeterminate: "true" == k.attr(_indeterminate) || "false" == k.attr(_determinate)
        } : m[t];
        if (/^(ch|di|in)/.test(n) && !q) {
            u(k, t)
        } else {
            if (/^(un|en|de)/.test(n) && q) {
                o(k, t)
            } else {
                if (n == _update) {
                    for (var r in q) {
                        q[r] ? u(k, r, !0) : o(k, r, !0)
                    }
                } else {
                    if (!l || "toggle" == n) {
                        if (!l) {
                            k[_callback]("ifClicked")
                        }
                        q ? m[_type] !== p && o(k, t) : u(k, t)
                    }
                }
            }
        }
    }
    function u(f, k, n) {
        var m = f[0]
          , t = f.parent()
          , q = k == g
          , z = k == _indeterminate
          , A = k == j
          , y = z ? _determinate : q ? v : "enabled"
          , r = h(f, y + s(m[_type]))
          , l = h(f, k + s(m[_type]));
        if (!0 !== m[k]) {
            if (!n && k == g && m[_type] == p && m.name) {
                var C = f.closest("form")
                  , x = 'input[name="' + m.name + '"]'
                  , x = C.length ? C.find(x) : e(x);
                x.each(function() {
                    this !== m && e(this).data(i) && o(e(this), k)
                })
            }
            z ? (m[k] = !0,
            m[g] && o(f, g, "force")) : (n || (m[k] = !0),
            q && m[_indeterminate] && o(f, _indeterminate, !1));
            c(f, q, k, n)
        }
        m[j] && h(f, _cursor, !0) && t.find("." + b).css(_cursor, "default");
        t[_add](l || h(f, k) || "");
        t.attr("role") && !z && t.attr("aria-" + (A ? j : g), "true");
        t[_remove](r || h(f, y) || "")
    }
    function o(k, l, t) {
        var n = k[0]
          , y = k.parent()
          , w = l == g
          , x = l == _indeterminate
          , z = l == j
          , C = x ? _determinate : w ? v : "enabled"
          , A = h(k, C + s(n[_type]))
          , B = h(k, l + s(n[_type]));
        if (!1 !== n[l]) {
            if (x || !t || "force" == t) {
                n[l] = !1
            }
            c(k, w, C, t)
        }
        !n[j] && h(k, _cursor, !0) && y.find("." + b).css(_cursor, "pointer");
        y[_remove](B || h(k, l) || "");
        y.attr("role") && !x && y.attr("aria-" + (z ? j : g), "false");
        y[_add](A || h(k, C) || "")
    }
    function d(f, k) {
        if (f.data(i)) {
            f.parent().html(f.attr("style", f.data(i).s || ""));
            if (k) {
                f[_callback](k)
            }
            f.off(".i").unwrap();
            e(_label + '[for="' + f[0].id + '"]').add(f.closest(_label)).off(".i")
        }
    }
    function h(k, l, m) {
        if (k.data(i)) {
            return k.data(i).o[l + (m ? "" : "Class")]
        }
    }
    function s(f) {
        return f.charAt(0).toUpperCase() + f.slice(1)
    }
    function c(k, l, n, m) {
        if (!m) {
            if (l) {
                k[_callback]("ifToggled")
            }
            k[_callback]("ifChanged")[_callback]("if" + s(n))
        }
    }
    var i = "iCheck"
      , b = i + "-helper"
      , p = "radio"
      , g = "checked"
      , v = "un" + g
      , j = "disabled";
    _determinate = "determinate";
    _indeterminate = "in" + _determinate;
    _update = "update";
    _type = "type";
    _click = "click";
    _touch = "touchbegin.i touchend.i";
    _add = "addClass";
    _remove = "removeClass";
    _callback = "trigger";
    _label = "label";
    _cursor = "cursor";
    _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);
    e.fn[i] = function(f, k) {
        var q = 'input[type="checkbox"], input[type="' + p + '"]'
          , n = e()
          , x = function(l) {
            l.each(function() {
                var t = e(this);
                n = t.is(q) ? n.add(t) : n.add(t.find(q))
            })
        };
        if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(f)) {
            return f = f.toLowerCase(),
            x(this),
            n.each(function() {
                var l = e(this);
                "destroy" == f ? d(l, "ifDestroyed") : a(l, !0, f);
                e.isFunction(k) && k()
            })
        }
        if ("object" != typeof f && f) {
            return this
        }
        var r = e.extend({
            checkedClass: g,
            disabledClass: j,
            indeterminateClass: _indeterminate,
            labelHover: !0
        }, f)
          , y = r.handle
          , D = r.hoverClass || "hover"
          , A = r.focusClass || "focus"
          , C = r.activeClass || "active"
          , m = !!r.labelHover
          , E = r.labelHoverClass || "hover"
          , z = ("" + r.increaseArea).replace("%", "") | 0;
        if ("checkbox" == y || y == p) {
            q = 'input[type="' + y + '"]'
        }
        -50 > z && (z = -50);
        x(this);
        return n.each(function() {
            var t = e(this);
            d(t);
            var B = this
              , w = B.id
              , G = -z + "%"
              , F = 100 + 2 * z + "%"
              , F = {
                position: "absolute",
                top: G,
                left: G,
                display: "block",
                width: F,
                height: F,
                margin: 0,
                padding: 0,
                background: "#fff",
                border: 0,
                opacity: 0
            }
              , G = _mobile ? {
                position: "absolute",
                visibility: "hidden"
            } : z ? F : {
                position: "absolute",
                opacity: 0
            }
              , I = "checkbox" == B[_type] ? r.checkboxClass || "icheckbox" : r.radioClass || "i" + p
              , M = e(_label + '[for="' + w + '"]').add(t.closest(_label))
              , J = !!r.aria
              , K = i + "-" + Math.random().toString(36).substr(2, 6)
              , H = '<div class="' + I + '" ' + (J ? 'role="' + B[_type] + '" ' : "");
            J && M.each(function() {
                H += 'aria-labelledby="';
                this.id ? H += this.id : (this.id = K,
                H += K);
                H += '"'
            });
            H = t.wrap(H + "/>")[_callback]("ifCreated").parent().append(r.insert);
            F = e('<ins class="' + b + '"/>').css(F).appendTo(H);
            t.data(i, {
                o: r,
                s: t.attr("style")
            }).css(G);
            r.inheritClass && H[_add](B.className || "");
            r.inheritID && w && H.attr("id", i + "-" + w);
            "static" == H.css("position") && H.css("position", "relative");
            a(t, !0, _update);
            if (M.length) {
                M.on(_click + ".i mouseover.i mouseout.i " + _touch, function(l) {
                    var N = l[_type]
                      , O = e(this);
                    if (!B[j]) {
                        if (N == _click) {
                            if (e(l.target).is("a")) {
                                return
                            }
                            a(t, !1, !0)
                        } else {
                            m && (/ut|nd/.test(N) ? (H[_remove](D),
                            O[_remove](E)) : (H[_add](D),
                            O[_add](E)))
                        }
                        if (_mobile) {
                            l.stopPropagation()
                        } else {
                            return !1
                        }
                    }
                })
            }
            t.on(_click + ".i focus.i blur.i keyup.i keydown.i keypress.i", function(l) {
                var N = l[_type];
                l = l.keyCode;
                if (N == _click) {
                    return !1
                }
                if ("keydown" == N && 32 == l) {
                    return B[_type] == p && B[g] || (B[g] ? o(t, g) : u(t, g)),
                    !1
                }
                if ("keyup" == N && B[_type] == p) {
                    !B[g] && u(t, g)
                } else {
                    if (/us|ur/.test(N)) {
                        H["blur" == N ? _remove : _add](A)
                    }
                }
            });
            F.on(_click + " mousedown mouseup mouseover mouseout " + _touch, function(l) {
                var N = l[_type]
                  , O = /wn|up/.test(N) ? C : D;
                if (!B[j]) {
                    if (N == _click) {
                        a(t, !1, !0)
                    } else {
                        if (/wn|er|in/.test(N)) {
                            H[_add](O)
                        } else {
                            H[_remove](O + " " + C)
                        }
                        if (M.length && m && O == D) {
                            M[/ut|nd/.test(N) ? _remove : _add](E)
                        }
                    }
                    if (_mobile) {
                        l.stopPropagation()
                    } else {
                        return !1
                    }
                }
            })
        })
    }
}
)(window.jQuery || window.Zepto);
(function(a) {
    var c = {
        inEffect: {
            opacity: "show"
        },
        inEffectDuration: 600,
        stayTime: 10000,
        text: "",
        sticky: false,
        type: "notice",
        position: "middle-center",
        closeText: "",
        close: null
    };
    var b = {
        init: function(d) {
            if (d) {
                a.extend(c, d)
            }
        },
        showToast: function(e) {
            var d = {};
            a.extend(d, c, e);
            var j, i, h, f, g;
            j = (!a(".toast-container").length) ? a("<div></div>").addClass("toast-container").addClass("toast-position-" + d.position).appendTo("body") : a(".toast-container");
            i = a("<div></div>").addClass("toast-item-wrapper");
            h = a("<div></div>").hide().addClass("toast-item toast-type-" + d.type).appendTo(j).html(a("<p>").append(d.text)).animate(d.inEffect, d.inEffectDuration).wrap(i);
            f = a("<div></div>").addClass("toast-item-close").prependTo(h).html(d.closeText).click(function() {
                a().toastmessage("removeToast", h, d)
            });
            g = a("<div></div>").addClass("toast-item-image").addClass("toast-item-image-" + d.type).prependTo(h);
            if (navigator.userAgent.match(/MSIE 6/i)) {
                j.css({
                    top: document.documentElement.scrollTop
                })
            }
            if (!d.sticky) {
                setTimeout(function() {
                    a().toastmessage("removeToast", h, d)
                }, d.stayTime)
            }
            return h
        },
        showNoticeToast: function(d) {
            var e = {
                text: d,
                type: "notice"
            };
            return a().toastmessage("showToast", e)
        },
        showSuccessToast: function(d) {
            var e = {
                text: d,
                type: "success"
            };
            return a().toastmessage("showToast", e)
        },
        showErrorToast: function(d) {
            var e = {
                text: d,
                type: "error"
            };
            return a().toastmessage("showToast", e)
        },
        showWarningToast: function(d) {
            var e = {
                text: d,
                type: "warning"
            };
            return a().toastmessage("showToast", e)
        },
        removeToast: function(d, e) {
            d.animate({
                opacity: "0"
            }, 600, function() {
                d.parent().animate({
                    height: "0px"
                }, 300, function() {
                    d.parent().remove()
                })
            });
            if (e && e.close !== null) {
                e.close()
            }
        }
    };
    a.fn.toastmessage = function(d) {
        if (b[d]) {
            return b[d].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof d === "object" || !d) {
                return b.init.apply(this, arguments)
            } else {
                a.error("Method " + d + " does not exist on jQuery.toastmessage")
            }
        }
    }
}
)(jQuery);
!function(d) {
    var e = function(a, g) {
        this.$element = d(a),
        this.options = d.extend({}, d.fn.typeahead.defaults, g),
        this.matcher = this.options.matcher || this.matcher,
        this.sorter = this.options.sorter || this.sorter,
        this.highlighter = this.options.highlighter || this.highlighter,
        this.updater = this.options.updater || this.updater,
        this.source = this.options.source,
        this.$menu = d(this.options.menu),
        this.shown = !1,
        this.listen()
    };
    e.prototype = {
        constructor: e,
        select: function() {
            var b = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(b)).change(),
            this.hide()
        },
        updater: function(b) {
            return b
        },
        show: function() {
            var a = d.extend({}, this.$element.position(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.insertAfter(this.$element).css({
                top: a.top + a.height,
                left: a.left
            }).show(),
            this.shown = !0,
            this
        },
        hide: function() {
            return this.$menu.hide(),
            this.shown = !1,
            this
        },
        lookup: function(a) {
            var g;
            return this.query = this.$element.val(),
            !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (g = d.isFunction(this.source) ? this.source(this.query, d.proxy(this.process, this)) : this.source,
            g ? this.process(g) : this)
        },
        process: function(a) {
            var g = this;
            return a = d.grep(a, function(b) {
                return g.matcher(b)
            }),
            a = this.sorter(a),
            a.length ? this.render(a.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        },
        matcher: function(b) {
            return ~b.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function(g) {
            var h = [], i = [], j = [], k;
            while (k = g.shift()) {
                k.toLowerCase().indexOf(this.query.toLowerCase()) ? ~k.indexOf(this.query) ? i.push(k) : j.push(k) : h.push(k)
            }
            return h.concat(i, j)
        },
        highlighter: function(c) {
            var g = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return c.replace(new RegExp("(" + g + ")","ig"), function(h, i) {
                return "<strong>" + i + "</strong>"
            })
        },
        render: function(a) {
            var g = this;
            return a = d(a).map(function(c, h) {
                return c = d(g.options.item).attr("data-value", h),
                c.find("a").html(g.highlighter(h)),
                c[0]
            }),
            a.first().addClass("active"),
            this.$menu.html(a),
            this
        },
        next: function(a) {
            var g = this.$menu.find(".active").removeClass("active")
              , h = g.next();
            h.length || (h = d(this.$menu.find("li")[0])),
            h.addClass("active")
        },
        prev: function(g) {
            var h = this.$menu.find(".active").removeClass("active")
              , i = h.prev();
            i.length || (i = this.$menu.find("li").last()),
            i.addClass("active")
        },
        listen: function() {
            this.$element.on("focus", d.proxy(this.focus, this)).on("blur", d.proxy(this.blur, this)).on("keypress", d.proxy(this.keypress, this)).on("keyup", d.proxy(this.keyup, this)),
            this.eventSupported("keydown") && this.$element.on("keydown", d.proxy(this.keydown, this)),
            this.$menu.on("click", d.proxy(this.click, this)).on("mouseenter", "li", d.proxy(this.mouseenter, this)).on("mouseleave", "li", d.proxy(this.mouseleave, this))
        },
        eventSupported: function(c) {
            var g = c in this.$element;
            return g || (this.$element.setAttribute(c, "return;"),
            g = typeof this.$element[c] == "function"),
            g
        },
        move: function(b) {
            if (!this.shown) {
                return
            }
            switch (b.keyCode) {
            case 9:
            case 13:
            case 27:
                b.preventDefault();
                break;
            case 38:
                b.preventDefault(),
                this.prev();
                break;
            case 40:
                b.preventDefault(),
                this.next()
            }
            b.stopPropagation()
        },
        keydown: function(a) {
            this.suppressKeyPressRepeat = ~d.inArray(a.keyCode, [40, 38, 9, 13, 27]),
            this.move(a)
        },
        keypress: function(b) {
            if (this.suppressKeyPressRepeat) {
                return
            }
            this.move(b)
        },
        keyup: function(b) {
            switch (b.keyCode) {
            case 40:
            case 38:
            case 16:
            case 17:
            case 18:
                break;
            case 9:
            case 13:
                if (!this.shown) {
                    return
                }
                this.select();
                break;
            case 27:
                if (!this.shown) {
                    return
                }
                this.hide();
                break;
            default:
                this.lookup()
            }
            b.stopPropagation(),
            b.preventDefault()
        },
        focus: function(b) {
            this.focused = !0
        },
        blur: function(b) {
            this.focused = !1,
            !this.mousedover && this.shown && this.hide()
        },
        click: function(b) {
            b.stopPropagation(),
            b.preventDefault(),
            this.select(),
            this.$element.focus()
        },
        mouseenter: function(a) {
            this.mousedover = !0,
            this.$menu.find(".active").removeClass("active"),
            d(a.currentTarget).addClass("active")
        },
        mouseleave: function(b) {
            this.mousedover = !1,
            !this.focused && this.shown && this.hide()
        }
    };
    var f = d.fn.typeahead;
    d.fn.typeahead = function(a) {
        return this.each(function() {
            var b = d(this)
              , c = b.data("typeahead")
              , g = typeof a == "object" && a;
            c || b.data("typeahead", c = new e(this,g)),
            typeof a == "string" && c[a]()
        })
    }
    ,
    d.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    },
    d.fn.typeahead.Constructor = e,
    d.fn.typeahead.noConflict = function() {
        return d.fn.typeahead = f,
        this
    }
    ,
    d(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(a) {
        var g = d(this);
        if (g.data("typeahead")) {
            return
        }
        g.typeahead(g.data())
    })
}(window.jQuery);
!function(b, a) {
    "object" == typeof exports && "undefined" != typeof module ? a(exports) : "function" == typeof define && define.amd ? define(["exports"], a) : a(b.L = {})
}(this, function(dk) {
    function bE(f) {
        var b, a, c, d;
        for (a = 1,
        c = arguments.length; a < c; a++) {
            d = arguments[a];
            for (b in d) {
                f[b] = d[b]
            }
        }
        return f
    }
    function aZ(d, b) {
        var a = Array.prototype.slice;
        if (d.bind) {
            return d.bind.apply(d, a.call(arguments, 1))
        }
        var c = a.call(arguments, 2);
        return function() {
            return d.apply(b, c.length ? c.concat(a.call(arguments)) : arguments)
        }
    }
    function co(a) {
        return a._leaflet_id = a._leaflet_id || ++a3,
        a._leaflet_id
    }
    function cy(h, b, a) {
        var c, d, g, f;
        return f = function() {
            c = !1,
            d && (g.apply(a, d),
            d = !1)
        }
        ,
        g = function() {
            c ? d = arguments : (h.apply(a, arguments),
            setTimeout(f, b),
            c = !0)
        }
    }
    function c8(g, b, a) {
        var c = b[1]
          , d = b[0]
          , f = c - d;
        return g === c && a ? g : ((g - d) % f + f) % f + d
    }
    function cZ() {
        return !1
    }
    function al(c, b) {
        var a = Math.pow(10, void 0 === b ? 6 : b);
        return Math.round(c * a) / a
    }
    function bv(a) {
        return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
    }
    function dx(a) {
        return bv(a).split(/\s+/)
    }
    function b2(c, b) {
        c.hasOwnProperty("options") || (c.options = c.options ? bI(c.options) : {});
        for (var a in b) {
            c.options[a] = b[a]
        }
        return c.options
    }
    function aG(f, b, a) {
        var c = [];
        for (var d in f) {
            c.push(encodeURIComponent(a ? d.toUpperCase() : d) + "=" + encodeURIComponent(f[d]))
        }
        return (b && -1 !== b.indexOf("?") ? "&" : "?") + c.join("&")
    }
    function af(b, a) {
        return b.replace(cs, function(f, c) {
            var d = a[c];
            if (void 0 === d) {
                throw new Error("No value provided for variable " + f)
            }
            return "function" == typeof d && (d = d(a)),
            d
        })
    }
    function aQ(c, b) {
        for (var a = 0; a < c.length; a++) {
            if (c[a] === b) {
                return a
            }
        }
        return -1
    }
    function cH(a) {
        return window["webkit" + a] || window["moz" + a] || window["ms" + a]
    }
    function cb(c) {
        var b = +new Date
          , a = Math.max(0, 16 - (b - c3));
        return c3 = b + a,
        window.setTimeout(c, a)
    }
    function a9(c, a, b) {
        if (!b || aq !== cb) {
            return aq.call(window, aZ(c, a))
        }
        c.call(a)
    }
    function bk(a) {
        a && bz.call(window, a)
    }
    function dG() {}
    function d7(b) {
        if ("undefined" != typeof L && L && L.Mixin) {
            b = cC(b) ? b : [b];
            for (var a = 0; a < b.length; a++) {
                b[a] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", (new Error).stack)
            }
        }
    }
    function dY(c, b, a) {
        this.x = a ? Math.round(c) : c,
        this.y = a ? Math.round(b) : b
    }
    function dP(c, b, a) {
        return c instanceof dY ? c : cC(c) ? new dY(c[0],c[1]) : void 0 === c || null === c ? c : "object" == typeof c && "x"in c && "y"in c ? new dY(c.x,c.y) : new dY(c,b,a)
    }
    function cI(f, b) {
        if (f) {
            for (var a = b ? [f, b] : f, c = 0, d = a.length; c < d; c++) {
                this.extend(a[c])
            }
        }
    }
    function ax(b, a) {
        return !b || b instanceof cI ? b : new cI(b,a)
    }
    function dl(f, b) {
        if (f) {
            for (var a = b ? [f, b] : f, c = 0, d = a.length; c < d; c++) {
                this.extend(a[c])
            }
        }
    }
    function eh(b, a) {
        return b instanceof dl ? b : new dl(b,a)
    }
    function cc(c, b, a) {
        if (isNaN(c) || isNaN(b)) {
            throw new Error("Invalid LatLng object: (" + c + ", " + b + ")")
        }
        this.lat = +c,
        this.lng = +b,
        void 0 !== a && (this.alt = +a)
    }
    function aH(c, b, a) {
        return c instanceof cc ? c : cC(c) && "object" != typeof c[0] ? 3 === c.length ? new cc(c[0],c[1],c[2]) : 2 === c.length ? new cc(c[0],c[1]) : null : void 0 === c || null === c ? c : "object" == typeof c && "lat"in c ? new cc(c.lat,"lng"in c ? c.lng : c.lon,c.alt) : void 0 === b ? null : new cc(c,b,a)
    }
    function c9(d, b, a, c) {
        if (cC(d)) {
            return this._a = d[0],
            this._b = d[1],
            this._c = d[2],
            void (this._d = d[3])
        }
        this._a = d,
        this._b = b,
        this._c = a,
        this._d = c
    }
    function ej(d, b, a, c) {
        return new c9(d,b,a,c)
    }
    function a0(a) {
        return document.createElementNS("http://www.w3.org/2000/svg", a)
    }
    function bU(m, f) {
        var c, g, j, l, k, b, d = "";
        for (c = 0,
        j = m.length; c < j; c++) {
            for (g = 0,
            l = (k = m[c]).length; g < l; g++) {
                b = k[g],
                d += (g ? "L" : "M") + b.x + " " + b.y
            }
            d += f ? bR ? "z" : "x" : ""
        }
        return d || "M0 0"
    }
    function am(a) {
        return navigator.userAgent.toLowerCase().indexOf(a) >= 0
    }
    function ay(d, b, a, c) {
        return "touchstart" === b ? cz(d, a, c) : "touchmove" === b ? dQ(d, a, c) : "touchend" === b && bw(d, a, c),
        this
    }
    function bF(d, b, a) {
        var c = d["_leaflet_" + b + a];
        return "touchstart" === b ? d.removeEventListener(dm, c, !1) : "touchmove" === b ? d.removeEventListener(bG, c, !1) : "touchend" === b && (d.removeEventListener(a1, c, !1),
        d.removeEventListener(cq, c, !1)),
        this
    }
    function cz(d, a, b) {
        var c = aZ(function(e) {
            if ("mouse" !== e.pointerType && e.MSPOINTER_TYPE_MOUSE && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
                if (!(cA.indexOf(e.target.tagName) < 0)) {
                    return
                }
                cQ(e)
            }
            bM(e, a)
        });
        d["_leaflet_touchstart" + b] = c,
        d.addEventListener(dm, c, !1),
        c1 || (document.documentElement.addEventListener(dm, c0, !0),
        document.documentElement.addEventListener(bG, cp, !0),
        document.documentElement.addEventListener(a1, aR, !0),
        document.documentElement.addEventListener(cq, aR, !0),
        c1 = !0)
    }
    function c0(a) {
        da[a.pointerId] = a,
        ao++
    }
    function cp(a) {
        da[a.pointerId] && (da[a.pointerId] = a)
    }
    function aR(a) {
        delete da[a.pointerId],
        ao--
    }
    function bM(c, b) {
        c.touches = [];
        for (var a in da) {
            c.touches.push(da[a])
        }
        c.changedTouches = [c],
        b(c)
    }
    function dQ(d, b, a) {
        var c = function(e) {
            (e.pointerType !== e.MSPOINTER_TYPE_MOUSE && "mouse" !== e.pointerType || 0 !== e.buttons) && bM(e, b)
        };
        d["_leaflet_touchmove" + a] = c,
        d.addEventListener(bG, c, !1)
    }
    function bw(d, b, a) {
        var c = function(e) {
            bM(e, b)
        };
        d["_leaflet_touchend" + a] = c,
        d.addEventListener(a1, c, !1),
        d.addEventListener(cq, c, !1)
    }
    function ba(m, f, c) {
        function g(p) {
            var h;
            if (dL) {
                if (!aB || "mouse" === p.pointerType) {
                    return
                }
                h = ao
            } else {
                h = p.touches.length
            }
            if (!(h > 1)) {
                var a = Date.now()
                  , o = a - (l || a);
                k = p.touches ? p.touches[0] : p,
                b = o > 0 && o <= d,
                l = a
            }
        }
        function j(p) {
            if (b && !k.cancelBubble) {
                if (dL) {
                    if (!aB || "mouse" === p.pointerType) {
                        return
                    }
                    var a, h, i = {};
                    for (h in k) {
                        a = k[h],
                        i[h] = a && a.bind ? a.bind(k) : a
                    }
                    k = i
                }
                k.type = "dblclick",
                f(k),
                l = null
            }
        }
        var l, k, b = !1, d = 250;
        return m[b3 + bx + c] = g,
        m[b3 + dz + c] = j,
        m[b3 + "dblclick" + c] = f,
        m.addEventListener(bx, g, !1),
        m.addEventListener(dz, j, !1),
        m.addEventListener("dblclick", f, !1),
        this
    }
    function dy(f, b) {
        var a = f[b3 + bx + b]
          , c = f[b3 + dz + b]
          , d = f[b3 + "dblclick" + b];
        return f.removeEventListener(bx, a, !1),
        f.removeEventListener(dz, c, !1),
        aB || f.removeEventListener("dblclick", d, !1),
        this
    }
    function dH(a) {
        return "string" == typeof a ? document.getElementById(a) : a
    }
    function cR(d, b) {
        var a = d.style[b] || d.currentStyle && d.currentStyle[b];
        if ((!a || "auto" === a) && document.defaultView) {
            var c = document.defaultView.getComputedStyle(d, null);
            a = c ? c[b] : null
        }
        return "auto" === a ? null : a
    }
    function bl(d, b, a) {
        var c = document.createElement(d);
        return c.className = b || "",
        a && a.appendChild(c),
        c
    }
    function bV(b) {
        var a = b.parentNode;
        a && a.removeChild(b)
    }
    function d8(a) {
        for (; a.firstChild; ) {
            a.removeChild(a.firstChild)
        }
    }
    function dZ(b) {
        var a = b.parentNode;
        a.lastChild !== b && a.appendChild(b)
    }
    function bN(b) {
        var a = b.parentNode;
        a.firstChild !== b && a.insertBefore(b, a.firstChild)
    }
    function aa(c, b) {
        if (void 0 !== c.classList) {
            return c.classList.contains(b)
        }
        var a = a7(c);
        return a.length > 0 && new RegExp("(^|\\s)" + b + "(\\s|$)").test(a)
    }
    function cS(g, b) {
        if (void 0 !== g.classList) {
            for (var a = dx(b), c = 0, d = a.length; c < d; c++) {
                g.classList.add(a[c])
            }
        } else {
            if (!aa(g, b)) {
                var f = a7(g);
                bK(g, (f ? f + " " : "") + b)
            }
        }
    }
    function dv(b, a) {
        void 0 !== b.classList ? b.classList.remove(a) : bK(b, bv((" " + a7(b) + " ").replace(" " + a + " ", " ")))
    }
    function bK(b, a) {
        void 0 === b.className.baseVal ? b.className = a : b.className.baseVal = a
    }
    function a7(a) {
        return void 0 === a.className.baseVal ? a.className : a.className.baseVal
    }
    function cw(b, a) {
        "opacity"in b.style ? b.style.opacity = a : "filter"in b.style && cF(b, a)
    }
    function cF(d, b) {
        var a = !1
          , c = "DXImageTransform.Microsoft.Alpha";
        try {
            a = d.filters.item(c)
        } catch (d) {
            if (1 === b) {
                return
            }
        }
        b = Math.round(100 * b),
        a ? (a.Enabled = 100 !== b,
        a.Opacity = b) : d.style.filter += " progid:" + c + "(opacity=" + b + ")"
    }
    function dh(c) {
        for (var b = document.documentElement.style, a = 0; a < c.length; a++) {
            if (c[a]in b) {
                return c[a]
            }
        }
        return !1
    }
    function c6(d, b, a) {
        var c = b || new dY(0,0);
        d.style[aI] = (c4 ? "translate(" + c.x + "px," + c.y + "px)" : "translate3d(" + c.x + "px," + c.y + "px,0)") + (a ? " scale(" + a + ")" : "")
    }
    function av(b, a) {
        b._leaflet_pos = a,
        bQ ? c6(b, a) : (b.style.left = a.x + "px",
        b.style.top = a.y + "px")
    }
    function bC(a) {
        return a._leaflet_pos || new dY(0,0)
    }
    function dE() {
        cl(window, "dragstart", cQ)
    }
    function b9() {
        bh(window, "dragstart", cQ)
    }
    function aO(a) {
        for (; -1 === a.tabIndex; ) {
            a = a.parentNode
        }
        a.style && (ak(),
        cd = a,
        bb = a.style.outline,
        a.style.outline = "none",
        cl(window, "keydown", ak))
    }
    function ak() {
        cd && (cd.style.outline = bb,
        cd = void 0,
        bb = void 0,
        bh(window, "keydown", ak))
    }
    function aX(a) {
        do {
            a = a.parentNode
        } while (!(a.offsetWidth && a.offsetHeight || a === document.body));return a
    }
    function cP(b) {
        var a = b.getBoundingClientRect();
        return {
            x: a.width / b.offsetWidth || 1,
            y: a.height / b.offsetHeight || 1,
            boundingClientRect: a
        }
    }
    function cl(h, b, a, c) {
        if ("object" == typeof b) {
            for (var d in b) {
                bs(h, d, b[d], a)
            }
        } else {
            for (var g = 0, f = (b = dx(b)).length; g < f; g++) {
                bs(h, b[g], a, c)
            }
        }
        return this
    }
    function bh(k, d, c, f) {
        if ("object" == typeof d) {
            for (var g in d) {
                dN(k, g, d[g], c)
            }
        } else {
            if (d) {
                for (var j = 0, h = (d = dx(d)).length; j < h; j++) {
                    dN(k, d[j], c, f)
                }
            } else {
                for (var b in k[d9]) {
                    dN(k, b, k[d9][b])
                }
                delete k[d9]
            }
        }
        return this
    }
    function bs(j, d, c, f) {
        var h = d + co(c) + (f ? "_" + co(f) : "");
        if (j[d9] && j[d9][h]) {
            return this
        }
        var g = function(a) {
            return c.call(f || j, a || window.event)
        }
          , b = g;
        dL && 0 === d.indexOf("touch") ? ay(j, d, g, h) : !cV || "dblclick" !== d || !ba || dL && a4 ? "addEventListener"in j ? "mousewheel" === d ? j.addEventListener("onwheel"in j ? "wheel" : "mousewheel", g, !1) : "mouseenter" === d || "mouseleave" === d ? (g = function(a) {
            a = a || window.event,
            aP(j, a) && b(a)
        }
        ,
        j.addEventListener("mouseenter" === d ? "mouseover" : "mouseout", g, !1)) : ("click" === d && em && (g = function(a) {
            dj(a, b)
        }
        ),
        j.addEventListener(d, g, !1)) : "attachEvent"in j && j.attachEvent("on" + d, g) : ba(j, g, h),
        j[d9] = j[d9] || {},
        j[d9][h] = g
    }
    function dN(g, b, a, c) {
        var f = b + co(a) + (c ? "_" + co(c) : "")
          , d = g[d9] && g[d9][f];
        if (!d) {
            return this
        }
        dL && 0 === b.indexOf("touch") ? bF(g, b, f) : !cV || "dblclick" !== b || !dy || dL && a4 ? "removeEventListener"in g ? "mousewheel" === b ? g.removeEventListener("onwheel"in g ? "wheel" : "mousewheel", d, !1) : g.removeEventListener("mouseenter" === b ? "mouseover" : "mouseleave" === b ? "mouseout" : b, d, !1) : "detachEvent"in g && g.detachEvent("on" + b, d) : dy(g, f),
        g[d9][f] = null
    }
    function ef(a) {
        return a.stopPropagation ? a.stopPropagation() : a.originalEvent ? a.originalEvent._stopped = !0 : a.cancelBubble = !0,
        cm(a),
        this
    }
    function d5(a) {
        return bs(a, "mousewheel", ef),
        this
    }
    function dW(a) {
        return cl(a, "mousedown touchstart dblclick", ef),
        bs(a, "click", er),
        this
    }
    function cQ(a) {
        return a.preventDefault ? a.preventDefault() : a.returnValue = !1,
        this
    }
    function ca(a) {
        return cQ(a),
        ef(a),
        this
    }
    function aE(d, b) {
        if (!b) {
            return new dY(d.clientX,d.clientY)
        }
        var a = cP(b)
          , c = a.boundingClientRect;
        return new dY((d.clientX - c.left) / a.x - b.clientLeft,(d.clientY - c.top) / a.y - b.clientTop)
    }
    function dw(a) {
        return aB ? a.wheelDeltaY / 2 : a.deltaY && 0 === a.deltaMode ? -a.deltaY / d0 : a.deltaY && 1 === a.deltaMode ? 20 * -a.deltaY : a.deltaY && 2 === a.deltaMode ? 60 * -a.deltaY : a.deltaX || a.deltaZ ? 0 : a.wheelDelta ? (a.wheelDeltaY || a.wheelDelta) / 2 : a.detail && Math.abs(a.detail) < 32765 ? 20 * -a.detail : a.detail ? a.detail / -32765 * 60 : 0
    }
    function er(a) {
        dR[a.type] = !0
    }
    function cm(b) {
        var a = dR[b.type];
        return dR[b.type] = !1,
        a
    }
    function aP(c, b) {
        var a = b.relatedTarget;
        if (!a) {
            return !0
        }
        try {
            for (; a && a !== c; ) {
                a = a.parentNode
            }
        } catch (c) {
            return !1
        }
        return a !== c
    }
    function dj(d, b) {
        var a = d.timeStamp || d.originalEvent && d.originalEvent.timeStamp
          , c = bm && a - bm;
        c && c > 100 && c < 500 || d.target._simulatedClick && !d._simulated ? ca(d) : (bm = a,
        b(d))
    }
    function es(c, b) {
        if (!b || !c.length) {
            return c.slice()
        }
        var a = b * b;
        return c = aF(c, a),
        c = b0(c, a)
    }
    function a8(c, b, a) {
        return Math.sqrt(aY(c, b, a, !0))
    }
    function b0(g, b) {
        var a = g.length
          , c = new (typeof Uint8Array != void 0 + "" ? Uint8Array : Array)(a);
        c[0] = c[a - 1] = 1,
        aw(g, c, b, 0, a - 1);
        var d, f = [];
        for (d = 0; d < a; d++) {
            c[d] && f.push(g[d])
        }
        return f
    }
    function aw(m, f, c, g, j) {
        var l, k, b, d = 0;
        for (k = g + 1; k <= j - 1; k++) {
            (b = aY(m[k], m[g], m[j], !0)) > d && (l = k,
            d = b)
        }
        d > c && (f[l] = 1,
        aw(m, f, c, g, l),
        aw(m, f, c, l, j))
    }
    function aF(g, b) {
        for (var a = [g[0]], c = 1, d = 0, f = g.length; c < f; c++) {
            cx(g[c], g[d]) > b && (a.push(g[c]),
            d = c)
        }
        return d < f - 1 && a.push(g[f - 1]),
        a
    }
    function bL(m, f, c, g, j) {
        var l, k, b, d = g ? bW : c7(m, c), p = c7(f, c);
        for (bW = p; ; ) {
            if (!(d | p)) {
                return [m, f]
            }
            if (d & p) {
                return !1
            }
            b = c7(k = cG(m, f, l = d || p, c, j), c),
            l === d ? (m = k,
            d = b) : (f = k,
            p = b)
        }
    }
    function cG(q, f, c, j, k) {
        var p, m, b = f.x - q.x, d = f.y - q.y, v = j.min, g = j.max;
        return 8 & c ? (p = q.x + b * (g.y - q.y) / d,
        m = g.y) : 4 & c ? (p = q.x + b * (v.y - q.y) / d,
        m = v.y) : 2 & c ? (p = g.x,
        m = q.y + d * (g.x - q.x) / b) : 1 & c && (p = v.x,
        m = q.y + d * (v.x - q.x) / b),
        new dY(p,m,k)
    }
    function c7(c, b) {
        var a = 0;
        return c.x < b.min.x ? a |= 1 : c.x > b.max.x && (a |= 2),
        c.y < b.min.y ? a |= 4 : c.y > b.max.y && (a |= 8),
        a
    }
    function cx(d, b) {
        var a = b.x - d.x
          , c = b.y - d.y;
        return a * a + c * c
    }
    function aY(m, f, c, g) {
        var j, l = f.x, k = f.y, b = c.x - l, d = c.y - k, p = b * b + d * d;
        return p > 0 && ((j = ((m.x - l) * b + (m.y - k) * d) / p) > 1 ? (l = c.x,
        k = c.y) : j > 0 && (l += b * j,
        k += d * j)),
        b = m.x - l,
        d = m.y - k,
        g ? b * b + d * d : new dY(l,k)
    }
    function bS(a) {
        return !cC(a[0]) || "object" != typeof a[0][0] && void 0 !== a[0][0]
    }
    function dX(a) {
        return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),
        bS(a)
    }
    function bD(x, k, g) {
        var p, q, w, v, d, j, y, m, f, b = [1, 4, 2, 8];
        for (q = 0,
        y = x.length; q < y; q++) {
            x[q]._code = c7(x[q], k)
        }
        for (v = 0; v < 4; v++) {
            for (m = b[v],
            p = [],
            q = 0,
            w = (y = x.length) - 1; q < y; w = q++) {
                d = x[q],
                j = x[w],
                d._code & m ? j._code & m || ((f = cG(j, d, m, k, g))._code = c7(f, k),
                p.push(f)) : (j._code & m && ((f = cG(j, d, m, k, g))._code = c7(f, k),
                p.push(f)),
                p.push(d))
            }
            x = p
        }
        return x
    }
    function bj(w, j) {
        var f, m, p, v, q = "Feature" === w.type ? w.geometry : w, b = q ? q.coordinates : null, g = [], x = j && j.pointToLayer, k = j && j.coordsToLatLng || dF;
        if (!b && !q) {
            return null
        }
        switch (q.type) {
        case "Point":
            return f = k(b),
            x ? x(w, f) : new ab(f);
        case "MultiPoint":
            for (p = 0,
            v = b.length; p < v; p++) {
                f = k(b[p]),
                g.push(x ? x(w, f) : new ab(f))
            }
            return new bX(g);
        case "LineString":
        case "MultiLineString":
            return m = dO(b, "LineString" === q.type ? 0 : 1, k),
            new cv(m,j);
        case "Polygon":
        case "MultiPolygon":
            return m = dO(b, "Polygon" === q.type ? 1 : 2, k),
            new cE(m,j);
        case "GeometryCollection":
            for (p = 0,
            v = q.geometries.length; p < v; p++) {
                var d = bj({
                    geometry: q.geometries[p],
                    type: "Feature",
                    properties: w.properties
                }, j);
                d && g.push(d)
            }
            return new bX(g);
        default:
            throw new Error("Invalid GeoJSON object.")
        }
    }
    function dF(a) {
        return new cc(a[1],a[0],a[2])
    }
    function dO(h, b, a) {
        for (var c, d = [], g = 0, f = h.length; g < f; g++) {
            c = b ? dO(h[g], b - 1, a) : (a || dF)(h[g]),
            d.push(c)
        }
        return d
    }
    function cX(b, a) {
        return a = "number" == typeof a ? a : 6,
        void 0 !== b.alt ? [al(b.lng, a), al(b.lat, a), al(b.alt, a)] : [al(b.lng, a), al(b.lat, a)]
    }
    function bu(h, b, a, c) {
        for (var d = [], g = 0, f = h.length; g < f; g++) {
            d.push(b ? bu(h[g], b - 1, a, c) : cX(h[g], c))
        }
        return !b && a && d.push(d[0]),
        d
    }
    function b1(b, a) {
        return b.feature ? bE({}, b.feature, {
            geometry: a
        }) : eg(a)
    }
    function eg(a) {
        return "Feature" === a.type || "FeatureCollection" === a.type ? a : {
            type: "Feature",
            properties: {},
            geometry: a
        }
    }
    function d6(b, a) {
        return new df(b,a)
    }
    function bT(b, a) {
        return new cj(b,a)
    }
    function ad(a) {
        return d3 ? new dM(a) : null
    }
    function cY(a) {
        return bR || ac ? new cO(a) : null
    }
    var dq = Object.freeze;
    Object.freeze = function(a) {
        return a
    }
    ;
    var bI = Object.create || function() {
        function a() {}
        return function(b) {
            return a.prototype = b,
            new a
        }
    }()
      , a3 = 0
      , cs = /\{ *([\w_-]+) *\}/g
      , cC = Array.isArray || function(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }
      , dc = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
      , c3 = 0
      , aq = window.requestAnimationFrame || cH("RequestAnimationFrame") || cb
      , bz = window.cancelAnimationFrame || cH("CancelAnimationFrame") || cH("CancelRequestAnimationFrame") || function(a) {
        window.clearTimeout(a)
    }
      , dB = (Object.freeze || Object)({
        freeze: dq,
        extend: bE,
        create: bI,
        bind: aZ,
        lastId: a3,
        stamp: co,
        throttle: cy,
        wrapNum: c8,
        falseFn: cZ,
        formatNum: al,
        trim: bv,
        splitWords: dx,
        setOptions: b2,
        getParamString: aG,
        template: af,
        isArray: cC,
        indexOf: aQ,
        emptyImageUrl: dc,
        requestFn: aq,
        cancelFn: bz,
        requestAnimFrame: a9,
        cancelAnimFrame: bk
    });
    dG.extend = function(f) {
        var a = function() {
            this.initialize && this.initialize.apply(this, arguments),
            this.callInitHooks()
        }
          , b = a.__super__ = this.prototype
          , c = bI(b);
        c.constructor = a,
        a.prototype = c;
        for (var d in this) {
            this.hasOwnProperty(d) && "prototype" !== d && "__super__" !== d && (a[d] = this[d])
        }
        return f.statics && (bE(a, f.statics),
        delete f.statics),
        f.includes && (d7(f.includes),
        bE.apply(null, [c].concat(f.includes)),
        delete f.includes),
        c.options && (f.options = bE(bI(c.options), f.options)),
        bE(c, f),
        c._initHooks = [],
        c.callInitHooks = function() {
            if (!this._initHooksCalled) {
                b.callInitHooks && b.callInitHooks.call(this),
                this._initHooksCalled = !0;
                for (var g = 0, e = c._initHooks.length; g < e; g++) {
                    c._initHooks[g].call(this)
                }
            }
        }
        ,
        a
    }
    ,
    dG.include = function(a) {
        return bE(this.prototype, a),
        this
    }
    ,
    dG.mergeOptions = function(a) {
        return bE(this.prototype.options, a),
        this
    }
    ,
    dG.addInitHook = function(c) {
        var b = Array.prototype.slice.call(arguments, 1)
          , a = "function" == typeof c ? c : function() {
            this[c].apply(this, b)
        }
        ;
        return this.prototype._initHooks = this.prototype._initHooks || [],
        this.prototype._initHooks.push(a),
        this
    }
    ;
    var b5 = {
        on: function(g, b, a) {
            if ("object" == typeof g) {
                for (var c in g) {
                    this._on(c, g[c], b)
                }
            } else {
                for (var d = 0, f = (g = dx(g)).length; d < f; d++) {
                    this._on(g[d], b, a)
                }
            }
            return this
        },
        off: function(g, b, a) {
            if (g) {
                if ("object" == typeof g) {
                    for (var c in g) {
                        this._off(c, g[c], b)
                    }
                } else {
                    for (var d = 0, f = (g = dx(g)).length; d < f; d++) {
                        this._off(g[d], b, a)
                    }
                }
            } else {
                delete this._events
            }
            return this
        },
        _on: function(k, d, c) {
            this._events = this._events || {};
            var f = this._events[k];
            f || (f = [],
            this._events[k] = f),
            c === this && (c = void 0);
            for (var g = {
                fn: d,
                ctx: c
            }, j = f, h = 0, b = j.length; h < b; h++) {
                if (j[h].fn === d && j[h].ctx === c) {
                    return
                }
            }
            j.push(g)
        },
        _off: function(j, d, c) {
            var f, g, h;
            if (this._events && (f = this._events[j])) {
                if (d) {
                    if (c === this && (c = void 0),
                    f) {
                        for (g = 0,
                        h = f.length; g < h; g++) {
                            var b = f[g];
                            if (b.ctx === c && b.fn === d) {
                                return b.fn = cZ,
                                this._firingCount && (this._events[j] = f = f.slice()),
                                void f.splice(g, 1)
                            }
                        }
                    }
                } else {
                    for (g = 0,
                    h = f.length; g < h; g++) {
                        f[g].fn = cZ
                    }
                    delete this._events[j]
                }
            }
        },
        fire: function(k, c, f) {
            if (!this.listens(k, f)) {
                return this
            }
            var g = bE({}, c, {
                type: k,
                target: this,
                sourceTarget: c && c.sourceTarget || this
            });
            if (this._events) {
                var j = this._events[k];
                if (j) {
                    this._firingCount = this._firingCount + 1 || 1;
                    for (var i = 0, b = j.length; i < b; i++) {
                        var d = j[i];
                        d.fn.call(d.ctx || this, g)
                    }
                    this._firingCount--
                }
            }
            return f && this._propagateEvent(g),
            this
        },
        listens: function(d, b) {
            var a = this._events && this._events[d];
            if (a && a.length) {
                return !0
            }
            if (b) {
                for (var c in this._eventParents) {
                    if (this._eventParents[c].listens(d, b)) {
                        return !0
                    }
                }
            }
            return !1
        },
        once: function(e, a, b) {
            if ("object" == typeof e) {
                for (var c in e) {
                    this.once(c, e[c], a)
                }
                return this
            }
            var d = aZ(function() {
                this.off(e, a, b).off(e, d, b)
            }, this);
            return this.on(e, a, b).on(e, d, b)
        },
        addEventParent: function(a) {
            return this._eventParents = this._eventParents || {},
            this._eventParents[co(a)] = a,
            this
        },
        removeEventParent: function(a) {
            return this._eventParents && delete this._eventParents[co(a)],
            this
        },
        _propagateEvent: function(b) {
            for (var a in this._eventParents) {
                this._eventParents[a].fire(b.type, bE({
                    layer: b.target,
                    propagatedFrom: b.target
                }, b), !0)
            }
        }
    };
    b5.addEventListener = b5.on,
    b5.removeEventListener = b5.clearAllEventListeners = b5.off,
    b5.addOneTimeEventListener = b5.once,
    b5.fireEvent = b5.fire,
    b5.hasEventListeners = b5.listens;
    var aK = dG.extend(b5)
      , ah = Math.trunc || function(a) {
        return a > 0 ? Math.floor(a) : Math.ceil(a)
    }
    ;
    dY.prototype = {
        clone: function() {
            return new dY(this.x,this.y)
        },
        add: function(a) {
            return this.clone()._add(dP(a))
        },
        _add: function(a) {
            return this.x += a.x,
            this.y += a.y,
            this
        },
        subtract: function(a) {
            return this.clone()._subtract(dP(a))
        },
        _subtract: function(a) {
            return this.x -= a.x,
            this.y -= a.y,
            this
        },
        divideBy: function(a) {
            return this.clone()._divideBy(a)
        },
        _divideBy: function(a) {
            return this.x /= a,
            this.y /= a,
            this
        },
        multiplyBy: function(a) {
            return this.clone()._multiplyBy(a)
        },
        _multiplyBy: function(a) {
            return this.x *= a,
            this.y *= a,
            this
        },
        scaleBy: function(a) {
            return new dY(this.x * a.x,this.y * a.y)
        },
        unscaleBy: function(a) {
            return new dY(this.x / a.x,this.y / a.y)
        },
        round: function() {
            return this.clone()._round()
        },
        _round: function() {
            return this.x = Math.round(this.x),
            this.y = Math.round(this.y),
            this
        },
        floor: function() {
            return this.clone()._floor()
        },
        _floor: function() {
            return this.x = Math.floor(this.x),
            this.y = Math.floor(this.y),
            this
        },
        ceil: function() {
            return this.clone()._ceil()
        },
        _ceil: function() {
            return this.x = Math.ceil(this.x),
            this.y = Math.ceil(this.y),
            this
        },
        trunc: function() {
            return this.clone()._trunc()
        },
        _trunc: function() {
            return this.x = ah(this.x),
            this.y = ah(this.y),
            this
        },
        distanceTo: function(c) {
            var b = (c = dP(c)).x - this.x
              , a = c.y - this.y;
            return Math.sqrt(b * b + a * a)
        },
        equals: function(a) {
            return (a = dP(a)).x === this.x && a.y === this.y
        },
        contains: function(a) {
            return a = dP(a),
            Math.abs(a.x) <= Math.abs(this.x) && Math.abs(a.y) <= Math.abs(this.y)
        },
        toString: function() {
            return "Point(" + al(this.x) + ", " + al(this.y) + ")"
        }
    },
    cI.prototype = {
        extend: function(a) {
            return a = dP(a),
            this.min || this.max ? (this.min.x = Math.min(a.x, this.min.x),
            this.max.x = Math.max(a.x, this.max.x),
            this.min.y = Math.min(a.y, this.min.y),
            this.max.y = Math.max(a.y, this.max.y)) : (this.min = a.clone(),
            this.max = a.clone()),
            this
        },
        getCenter: function(a) {
            return new dY((this.min.x + this.max.x) / 2,(this.min.y + this.max.y) / 2,a)
        },
        getBottomLeft: function() {
            return new dY(this.min.x,this.max.y)
        },
        getTopRight: function() {
            return new dY(this.max.x,this.min.y)
        },
        getTopLeft: function() {
            return this.min
        },
        getBottomRight: function() {
            return this.max
        },
        getSize: function() {
            return this.max.subtract(this.min)
        },
        contains: function(c) {
            var b, a;
            return (c = "number" == typeof c[0] || c instanceof dY ? dP(c) : ax(c))instanceof cI ? (b = c.min,
            a = c.max) : b = a = c,
            b.x >= this.min.x && a.x <= this.max.x && b.y >= this.min.y && a.y <= this.max.y
        },
        intersects: function(h) {
            h = ax(h);
            var b = this.min
              , a = this.max
              , c = h.min
              , d = h.max
              , g = d.x >= b.x && c.x <= a.x
              , f = d.y >= b.y && c.y <= a.y;
            return g && f
        },
        overlaps: function(h) {
            h = ax(h);
            var b = this.min
              , a = this.max
              , c = h.min
              , d = h.max
              , g = d.x > b.x && c.x < a.x
              , f = d.y > b.y && c.y < a.y;
            return g && f
        },
        isValid: function() {
            return !(!this.min || !this.max)
        }
    },
    dl.prototype = {
        extend: function(f) {
            var b, a, c = this._southWest, d = this._northEast;
            if (f instanceof cc) {
                b = f,
                a = f
            } else {
                if (!(f instanceof dl)) {
                    return f ? this.extend(aH(f) || eh(f)) : this
                }
                if (b = f._southWest,
                a = f._northEast,
                !b || !a) {
                    return this
                }
            }
            return c || d ? (c.lat = Math.min(b.lat, c.lat),
            c.lng = Math.min(b.lng, c.lng),
            d.lat = Math.max(a.lat, d.lat),
            d.lng = Math.max(a.lng, d.lng)) : (this._southWest = new cc(b.lat,b.lng),
            this._northEast = new cc(a.lat,a.lng)),
            this
        },
        pad: function(f) {
            var b = this._southWest
              , a = this._northEast
              , c = Math.abs(b.lat - a.lat) * f
              , d = Math.abs(b.lng - a.lng) * f;
            return new dl(new cc(b.lat - c,b.lng - d),new cc(a.lat + c,a.lng + d))
        },
        getCenter: function() {
            return new cc((this._southWest.lat + this._northEast.lat) / 2,(this._southWest.lng + this._northEast.lng) / 2)
        },
        getSouthWest: function() {
            return this._southWest
        },
        getNorthEast: function() {
            return this._northEast
        },
        getNorthWest: function() {
            return new cc(this.getNorth(),this.getWest())
        },
        getSouthEast: function() {
            return new cc(this.getSouth(),this.getEast())
        },
        getWest: function() {
            return this._southWest.lng
        },
        getSouth: function() {
            return this._southWest.lat
        },
        getEast: function() {
            return this._northEast.lng
        },
        getNorth: function() {
            return this._northEast.lat
        },
        contains: function(f) {
            f = "number" == typeof f[0] || f instanceof cc || "lat"in f ? aH(f) : eh(f);
            var b, a, c = this._southWest, d = this._northEast;
            return f instanceof dl ? (b = f.getSouthWest(),
            a = f.getNorthEast()) : b = a = f,
            b.lat >= c.lat && a.lat <= d.lat && b.lng >= c.lng && a.lng <= d.lng
        },
        intersects: function(h) {
            h = eh(h);
            var b = this._southWest
              , a = this._northEast
              , c = h.getSouthWest()
              , d = h.getNorthEast()
              , g = d.lat >= b.lat && c.lat <= a.lat
              , f = d.lng >= b.lng && c.lng <= a.lng;
            return g && f
        },
        overlaps: function(h) {
            h = eh(h);
            var b = this._southWest
              , a = this._northEast
              , c = h.getSouthWest()
              , d = h.getNorthEast()
              , g = d.lat > b.lat && c.lat < a.lat
              , f = d.lng > b.lng && c.lng < a.lng;
            return g && f
        },
        toBBoxString: function() {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
        },
        equals: function(b, a) {
            return !!b && (b = eh(b),
            this._southWest.equals(b.getSouthWest(), a) && this._northEast.equals(b.getNorthEast(), a))
        },
        isValid: function() {
            return !(!this._southWest || !this._northEast)
        }
    },
    cc.prototype = {
        equals: function(b, a) {
            return !!b && (b = aH(b),
            Math.max(Math.abs(this.lat - b.lat), Math.abs(this.lng - b.lng)) <= (void 0 === a ? 1e-09 : a))
        },
        toString: function(a) {
            return "LatLng(" + al(this.lat, a) + ", " + al(this.lng, a) + ")"
        },
        distanceTo: function(a) {
            return cL.distance(this, aH(a))
        },
        wrap: function() {
            return cL.wrapLatLng(this)
        },
        toBounds: function(c) {
            var b = 180 * c / 40075017
              , a = b / Math.cos(Math.PI / 180 * this.lat);
            return eh([this.lat - b, this.lng - a], [this.lat + b, this.lng + a])
        },
        clone: function() {
            return new cc(this.lat,this.lng,this.alt)
        }
    };
    var aU = {
        latLngToPoint: function(d, b) {
            var a = this.projection.project(d)
              , c = this.scale(b);
            return this.transformation._transform(a, c)
        },
        pointToLatLng: function(d, b) {
            var a = this.scale(b)
              , c = this.transformation.untransform(d, a);
            return this.projection.unproject(c)
        },
        project: function(a) {
            return this.projection.project(a)
        },
        unproject: function(a) {
            return this.projection.unproject(a)
        },
        scale: function(a) {
            return 256 * Math.pow(2, a)
        },
        zoom: function(a) {
            return Math.log(a / 256) / Math.LN2
        },
        getProjectedBounds: function(c) {
            if (this.infinite) {
                return null
            }
            var b = this.projection.bounds
              , a = this.scale(c);
            return new cI(this.transformation.transform(b.min, a),this.transformation.transform(b.max, a))
        },
        infinite: !1,
        wrapLatLng: function(b) {
            var a = this.wrapLng ? c8(b.lng, this.wrapLng, !0) : b.lng;
            return new cc(this.wrapLat ? c8(b.lat, this.wrapLat, !0) : b.lat,a,b.alt)
        },
        wrapLatLngBounds: function(h) {
            var b = h.getCenter()
              , a = this.wrapLatLng(b)
              , c = b.lat - a.lat
              , d = b.lng - a.lng;
            if (0 === c && 0 === d) {
                return h
            }
            var g = h.getSouthWest()
              , f = h.getNorthEast();
            return new dl(new cc(g.lat - c,g.lng - d),new cc(f.lat - c,f.lng - d))
        }
    }
      , cL = bE({}, aU, {
        wrapLng: [-180, 180],
        R: 6371000,
        distance: function(m, f) {
            var c = Math.PI / 180
              , g = m.lat * c
              , j = f.lat * c
              , l = Math.sin((f.lat - m.lat) * c / 2)
              , k = Math.sin((f.lng - m.lng) * c / 2)
              , b = l * l + Math.cos(g) * Math.cos(j) * k * k
              , d = 2 * Math.atan2(Math.sqrt(b), Math.sqrt(1 - b));
            return this.R * d
        }
    })
      , cg = {
        R: 6378137,
        MAX_LATITUDE: 85.0511287798,
        project: function(f) {
            var b = Math.PI / 180
              , a = this.MAX_LATITUDE
              , c = Math.max(Math.min(a, f.lat), -a)
              , d = Math.sin(c * b);
            return new dY(this.R * f.lng * b,this.R * Math.log((1 + d) / (1 - d)) / 2)
        },
        unproject: function(b) {
            var a = 180 / Math.PI;
            return new cc((2 * Math.atan(Math.exp(b.y / this.R)) - Math.PI / 2) * a,b.x * a / this.R)
        },
        bounds: function() {
            var a = 6378137 * Math.PI;
            return new cI([-a, -a],[a, a])
        }()
    };
    c9.prototype = {
        transform: function(b, a) {
            return this._transform(b.clone(), a)
        },
        _transform: function(b, a) {
            return a = a || 1,
            b.x = a * (this._a * b.x + this._b),
            b.y = a * (this._c * b.y + this._d),
            b
        },
        untransform: function(b, a) {
            return a = a || 1,
            new dY((b.x / a - this._b) / this._a,(b.y / a - this._d) / this._c)
        }
    };
    var bd, bp, dK, eb = bE({}, cL, {
        code: "EPSG:3857",
        projection: cg,
        transformation: function() {
            var a = 0.5 / (Math.PI * cg.R);
            return ej(a, 0.5, -a, 0.5)
        }()
    }), d2 = bE({}, eb, {
        code: "EPSG:900913"
    }), dT = document.documentElement.style, cM = "ActiveXObject"in window, b6 = cM && !document.addEventListener, aB = "msLaunchUri"in navigator && !("documentMode"in document), dr = am("webkit"), em = am("android"), ch = am("android 2") || am("android 3"), aL = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), dd = em && am("Google") && aL < 537 && !("AudioNode"in window), eo = !!window.opera, a4 = am("chrome"), bY = am("gecko") && !dr && !eo && !cM, ar = !a4 && am("safari"), aC = am("phantom"), bJ = "OTransition"in dT, cD = 0 === navigator.platform.indexOf("Win"), c4 = cM && "transition"in dT, cu = "WebKitCSSMatrix"in window && "m11"in new window.WebKitCSSMatrix && !ch, aV = "MozPerspective"in dT, bQ = !window.L_DISABLE_3D && (c4 || cu || aV) && !bJ && !aC, dU = "undefined" != typeof orientation || am("mobile"), bA = dU && dr, bf = dU && cu, dC = !window.PointerEvent && window.MSPointerEvent, dL = !(!window.PointerEvent && !dC), cV = !window.L_NO_TOUCH && (dL || "ontouchstart"in window || window.DocumentTouch && document instanceof window.DocumentTouch), bq = dU && eo, bZ = dU && bY, ec = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, d3 = !!document.createElement("canvas").getContext, bR = !(!document.createElementNS || !a0("svg").createSVGRect), ac = !bR && function() {
        try {
            var b = document.createElement("div");
            b.innerHTML = '<v:shape adj="1"/>';
            var a = b.firstChild;
            return a.style.behavior = "url(#default#VML)",
            a && "object" == typeof a.adj
        } catch (b) {
            return !1
        }
    }(), cW = (Object.freeze || Object)({
        ie: cM,
        ielt9: b6,
        edge: aB,
        webkit: dr,
        android: em,
        android23: ch,
        androidStock: dd,
        opera: eo,
        chrome: a4,
        gecko: bY,
        safari: ar,
        phantom: aC,
        opera12: bJ,
        win: cD,
        ie3d: c4,
        webkit3d: cu,
        gecko3d: aV,
        any3d: bQ,
        mobile: dU,
        mobileWebkit: bA,
        mobileWebkit3d: bf,
        msPointer: dC,
        pointer: dL,
        touch: cV,
        mobileOpera: bq,
        mobileGecko: bZ,
        retina: ec,
        canvas: d3,
        svg: bR,
        vml: ac
    }), dm = dC ? "MSPointerDown" : "pointerdown", bG = dC ? "MSPointerMove" : "pointermove", a1 = dC ? "MSPointerUp" : "pointerup", cq = dC ? "MSPointerCancel" : "pointercancel", cA = ["INPUT", "SELECT", "OPTION"], da = {}, c1 = !1, ao = 0, bx = dC ? "MSPointerDown" : dL ? "pointerdown" : "touchstart", dz = dC ? "MSPointerUp" : dL ? "pointerup" : "touchend", b3 = "_leaflet_", aI = dh(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]), ag = dh(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]), aS = "webkitTransition" === ag || "OTransition" === ag ? ag + "End" : "transitionend";
    if ("onselectstart"in document) {
        bd = function() {
            cl(window, "selectstart", cQ)
        }
        ,
        bp = function() {
            bh(window, "selectstart", cQ)
        }
    } else {
        var cJ = dh(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
        bd = function() {
            if (cJ) {
                var a = document.documentElement.style;
                dK = a[cJ],
                a[cJ] = "none"
            }
        }
        ,
        bp = function() {
            cJ && (document.documentElement.style[cJ] = dK,
            dK = void 0)
        }
    }
    var cd, bb, bm, dI = (Object.freeze || Object)({
        TRANSFORM: aI,
        TRANSITION: ag,
        TRANSITION_END: aS,
        get: dH,
        getStyle: cR,
        create: bl,
        remove: bV,
        empty: d8,
        toFront: dZ,
        toBack: bN,
        hasClass: aa,
        addClass: cS,
        removeClass: dv,
        setClass: bK,
        getClass: a7,
        setOpacity: cw,
        testProp: dh,
        setTransform: c6,
        setPosition: av,
        getPosition: bC,
        disableTextSelection: bd,
        enableTextSelection: bp,
        disableImageDrag: dE,
        enableImageDrag: b9,
        preventOutline: aO,
        restoreOutline: ak,
        getSizedParentNode: aX,
        getScale: cP
    }), d9 = "_leaflet_events", d0 = cD && a4 ? 2 * window.devicePixelRatio : bY ? window.devicePixelRatio : 1, dR = {}, cK = (Object.freeze || Object)({
        on: cl,
        off: bh,
        stopPropagation: ef,
        disableScrollPropagation: d5,
        disableClickPropagation: dW,
        preventDefault: cQ,
        stop: ca,
        getMousePosition: aE,
        getWheelDelta: dw,
        fakeStop: er,
        skipped: cm,
        isExternalTarget: aP,
        addListener: cl,
        removeListener: bh
    }), b4 = aK.extend({
        run: function(d, b, a, c) {
            this.stop(),
            this._el = d,
            this._inProgress = !0,
            this._duration = a || 0.25,
            this._easeOutPower = 1 / Math.max(c || 0.5, 0.2),
            this._startPos = bC(d),
            this._offset = b.subtract(this._startPos),
            this._startTime = +new Date,
            this.fire("start"),
            this._animate()
        },
        stop: function() {
            this._inProgress && (this._step(!0),
            this._complete())
        },
        _animate: function() {
            this._animId = a9(this._animate, this),
            this._step()
        },
        _step: function(c) {
            var b = +new Date - this._startTime
              , a = 1000 * this._duration;
            b < a ? this._runFrame(this._easeOut(b / a), c) : (this._runFrame(1),
            this._complete())
        },
        _runFrame: function(c, b) {
            var a = this._startPos.add(this._offset.multiplyBy(c));
            b && a._round(),
            av(this._el, a),
            this.fire("step")
        },
        _complete: function() {
            bk(this._animId),
            this._inProgress = !1,
            this.fire("end")
        },
        _easeOut: function(a) {
            return 1 - Math.pow(1 - a, this._easeOutPower)
        }
    }), az = aK.extend({
        options: {
            crs: eb,
            center: void 0,
            zoom: void 0,
            minZoom: void 0,
            maxZoom: void 0,
            layers: [],
            maxBounds: void 0,
            renderer: void 0,
            zoomAnimation: !0,
            zoomAnimationThreshold: 4,
            fadeAnimation: !0,
            markerZoomAnimation: !0,
            transform3DLimit: 8388608,
            zoomSnap: 1,
            zoomDelta: 1,
            trackResize: !0
        },
        initialize: function(b, a) {
            a = b2(this, a),
            this._initContainer(b),
            this._initLayout(),
            this._onResize = aZ(this._onResize, this),
            this._initEvents(),
            a.maxBounds && this.setMaxBounds(a.maxBounds),
            void 0 !== a.zoom && (this._zoom = this._limitZoom(a.zoom)),
            a.center && void 0 !== a.zoom && this.setView(aH(a.center), a.zoom, {
                reset: !0
            }),
            this._handlers = [],
            this._layers = {},
            this._zoomBoundLayers = {},
            this._sizeChanged = !0,
            this.callInitHooks(),
            this._zoomAnimated = ag && bQ && !bq && this.options.zoomAnimation,
            this._zoomAnimated && (this._createAnimProxy(),
            cl(this._proxy, aS, this._catchTransitionEnd, this)),
            this._addLayers(this.options.layers)
        },
        setView: function(c, a, b) {
            return a = void 0 === a ? this._zoom : this._limitZoom(a),
            c = this._limitCenter(aH(c), a, this.options.maxBounds),
            b = b || {},
            this._stop(),
            this._loaded && !b.reset && !0 !== b && (void 0 !== b.animate && (b.zoom = bE({
                animate: b.animate
            }, b.zoom),
            b.pan = bE({
                animate: b.animate,
                duration: b.duration
            }, b.pan)),
            this._zoom !== a ? this._tryAnimatedZoom && this._tryAnimatedZoom(c, a, b.zoom) : this._tryAnimatedPan(c, b.pan)) ? (clearTimeout(this._sizeTimer),
            this) : (this._resetView(c, a),
            this)
        },
        setZoom: function(b, a) {
            return this._loaded ? this.setView(this.getCenter(), b, {
                zoom: a
            }) : (this._zoom = b,
            this)
        },
        zoomIn: function(b, a) {
            return b = b || (bQ ? this.options.zoomDelta : 1),
            this.setZoom(this._zoom + b, a)
        },
        zoomOut: function(b, a) {
            return b = b || (bQ ? this.options.zoomDelta : 1),
            this.setZoom(this._zoom - b, a)
        },
        setZoomAround: function(h, b, a) {
            var c = this.getZoomScale(b)
              , d = this.getSize().divideBy(2)
              , g = (h instanceof dY ? h : this.latLngToContainerPoint(h)).subtract(d).multiplyBy(1 - 1 / c)
              , f = this.containerPointToLatLng(d.add(g));
            return this.setView(f, b, {
                zoom: a
            })
        },
        _getBoundsCenterZoom: function(k, d) {
            d = d || {},
            k = k.getBounds ? k.getBounds() : eh(k);
            var c = dP(d.paddingTopLeft || d.padding || [0, 0])
              , f = dP(d.paddingBottomRight || d.padding || [0, 0])
              , g = this.getBoundsZoom(k, !1, c.add(f));
            if ((g = "number" == typeof d.maxZoom ? Math.min(d.maxZoom, g) : g) === 1 / 0) {
                return {
                    center: k.getCenter(),
                    zoom: g
                }
            }
            var j = f.subtract(c).divideBy(2)
              , h = this.project(k.getSouthWest(), g)
              , b = this.project(k.getNorthEast(), g);
            return {
                center: this.unproject(h.add(b).divideBy(2).add(j), g),
                zoom: g
            }
        },
        fitBounds: function(c, b) {
            if (!(c = eh(c)).isValid()) {
                throw new Error("Bounds are not valid.")
            }
            var a = this._getBoundsCenterZoom(c, b);
            return this.setView(a.center, a.zoom, b)
        },
        fitWorld: function(a) {
            return this.fitBounds([[-90, -180], [90, 180]], a)
        },
        panTo: function(b, a) {
            return this.setView(b, this._zoom, {
                pan: a
            })
        },
        panBy: function(c, b) {
            if (c = dP(c).round(),
            b = b || {},
            !c.x && !c.y) {
                return this.fire("moveend")
            }
            if (!0 !== b.animate && !this.getSize().contains(c)) {
                return this._resetView(this.unproject(this.project(this.getCenter()).add(c)), this.getZoom()),
                this
            }
            if (this._panAnim || (this._panAnim = new b4,
            this._panAnim.on({
                step: this._onPanTransitionStep,
                end: this._onPanTransitionEnd
            }, this)),
            b.noMoveStart || this.fire("movestart"),
            !1 !== b.animate) {
                cS(this._mapPane, "leaflet-pan-anim");
                var a = this._getMapPanePos().subtract(c).round();
                this._panAnim.run(this._mapPane, a, b.duration || 0.25, b.easeLinearity)
            } else {
                this._rawPanBy(c),
                this.fire("move").fire("moveend")
            }
            return this
        },
        flyTo: function(O, D, A) {
            function H(c) {
                var b = (B * B - G * G + (c ? -1 : 1) * T * T * R * R) / (2 * (c ? B : G) * T * R)
                  , a = Math.sqrt(b * b + 1) - b;
                return a < 1e-09 ? -18 : Math.log(a)
            }
            function I(a) {
                return (Math.exp(a) - Math.exp(-a)) / 2
            }
            function N(a) {
                return (Math.exp(a) + Math.exp(-a)) / 2
            }
            function M(a) {
                return I(a) / N(a)
            }
            function j(a) {
                return G * (N(S) / N(S + U * a))
            }
            function C(a) {
                return G * (N(S) * M(S + U * a) - I(S)) / T
            }
            function Q(a) {
                return 1 - Math.pow(1 - a, 1.5)
            }
            function E() {
                var a = (Date.now() - K) / k
                  , b = Q(a) * F;
                a <= 1 ? (this._flyToFrame = a9(E, this),
                this._move(this.unproject(q.add(f.subtract(q).multiplyBy(C(b) / R)), J), this.getScaleZoom(G / j(b), J), {
                    flyTo: !0
                })) : this._move(O, D)._moveEnd(!0)
            }
            if (!1 === (A = A || {}).animate || !bQ) {
                return this.setView(O, D, A)
            }
            this._stop();
            var q = this.project(this.getCenter())
              , f = this.project(O)
              , z = this.getSize()
              , J = this._zoom;
            O = aH(O),
            D = void 0 === D ? J : D;
            var G = Math.max(z.x, z.y)
              , B = G * this.getZoomScale(J, D)
              , R = f.distanceTo(q) || 1
              , U = 1.42
              , T = U * U
              , S = H(0)
              , K = Date.now()
              , F = (H(1) - S) / U
              , k = A.duration ? 1000 * A.duration : 1000 * F * 0.8;
            return this._moveStart(!0, A.noMoveStart),
            E.call(this),
            this
        },
        flyToBounds: function(c, b) {
            var a = this._getBoundsCenterZoom(c, b);
            return this.flyTo(a.center, a.zoom, b)
        },
        setMaxBounds: function(a) {
            return (a = eh(a)).isValid() ? (this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds),
            this.options.maxBounds = a,
            this._loaded && this._panInsideMaxBounds(),
            this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null,
            this.off("moveend", this._panInsideMaxBounds))
        },
        setMinZoom: function(b) {
            var a = this.options.minZoom;
            return this.options.minZoom = b,
            this._loaded && a !== b && (this.fire("zoomlevelschange"),
            this.getZoom() < this.options.minZoom) ? this.setZoom(b) : this
        },
        setMaxZoom: function(b) {
            var a = this.options.maxZoom;
            return this.options.maxZoom = b,
            this._loaded && a !== b && (this.fire("zoomlevelschange"),
            this.getZoom() > this.options.maxZoom) ? this.setZoom(b) : this
        },
        panInsideBounds: function(d, b) {
            this._enforcingBounds = !0;
            var a = this.getCenter()
              , c = this._limitCenter(a, this._zoom, eh(d));
            return a.equals(c) || this.panTo(c, b),
            this._enforcingBounds = !1,
            this
        },
        invalidateSize: function(g) {
            if (!this._loaded) {
                return this
            }
            g = bE({
                animate: !1,
                pan: !0
            }, !0 === g ? {
                animate: !0
            } : g);
            var c = this.getSize();
            this._sizeChanged = !0,
            this._lastCenter = null;
            var d = this.getSize()
              , f = c.divideBy(2).round()
              , e = d.divideBy(2).round()
              , b = f.subtract(e);
            return b.x || b.y ? (g.animate && g.pan ? this.panBy(b) : (g.pan && this._rawPanBy(b),
            this.fire("move"),
            g.debounceMoveend ? (clearTimeout(this._sizeTimer),
            this._sizeTimer = setTimeout(aZ(this.fire, this, "moveend"), 200)) : this.fire("moveend")),
            this.fire("resize", {
                oldSize: c,
                newSize: d
            })) : this
        },
        stop: function() {
            return this.setZoom(this._limitZoom(this._zoom)),
            this.options.zoomSnap || this.fire("viewreset"),
            this._stop()
        },
        locate: function(c) {
            if (c = this._locateOptions = bE({
                timeout: 10000,
                watch: !1
            }, c),
            !("geolocation"in navigator)) {
                return this._handleGeolocationError({
                    code: 0,
                    message: "Geolocation not supported."
                }),
                this
            }
            var a = aZ(this._handleGeolocationResponse, this)
              , b = aZ(this._handleGeolocationError, this);
            return c.watch ? this._locationWatchId = navigator.geolocation.watchPosition(a, b, c) : navigator.geolocation.getCurrentPosition(a, b, c),
            this
        },
        stopLocate: function() {
            return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId),
            this._locateOptions && (this._locateOptions.setView = !1),
            this
        },
        _handleGeolocationError: function(c) {
            var b = c.code
              , a = c.message || (1 === b ? "permission denied" : 2 === b ? "position unavailable" : "timeout");
            this._locateOptions.setView && !this._loaded && this.fitWorld(),
            this.fire("locationerror", {
                code: b,
                message: "Geolocation error: " + a + "."
            })
        },
        _handleGeolocationResponse: function(h) {
            var b = new cc(h.coords.latitude,h.coords.longitude)
              , a = b.toBounds(2 * h.coords.accuracy)
              , c = this._locateOptions;
            if (c.setView) {
                var d = this.getBoundsZoom(a);
                this.setView(b, c.maxZoom ? Math.min(d, c.maxZoom) : d)
            }
            var g = {
                latlng: b,
                bounds: a,
                timestamp: h.timestamp
            };
            for (var f in h.coords) {
                "number" == typeof h.coords[f] && (g[f] = h.coords[f])
            }
            this.fire("locationfound", g)
        },
        addHandler: function(c, b) {
            if (!b) {
                return this
            }
            var a = this[c] = new b(this);
            return this._handlers.push(a),
            this.options[c] && a.enable(),
            this
        },
        remove: function() {
            if (this._initEvents(!0),
            this._containerId !== this._container._leaflet_id) {
                throw new Error("Map container is being reused by another instance")
            }
            try {
                delete this._container._leaflet_id,
                delete this._containerId
            } catch (a) {
                this._container._leaflet_id = void 0,
                this._containerId = void 0
            }
            void 0 !== this._locationWatchId && this.stopLocate(),
            this._stop(),
            bV(this._mapPane),
            this._clearControlPos && this._clearControlPos(),
            this._resizeRequest && (bk(this._resizeRequest),
            this._resizeRequest = null),
            this._clearHandlers(),
            this._loaded && this.fire("unload");
            var a;
            for (a in this._layers) {
                this._layers[a].remove()
            }
            for (a in this._panes) {
                bV(this._panes[a])
            }
            return this._layers = [],
            this._panes = [],
            delete this._mapPane,
            delete this._renderer,
            this
        },
        createPane: function(c, b) {
            var a = bl("div", "leaflet-pane" + (c ? " leaflet-" + c.replace("Pane", "") + "-pane" : ""), b || this._mapPane);
            return c && (this._panes[c] = a),
            a
        },
        getCenter: function() {
            return this._checkIfLoaded(),
            this._lastCenter && !this._moved() ? this._lastCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
        },
        getZoom: function() {
            return this._zoom
        },
        getBounds: function() {
            var a = this.getPixelBounds();
            return new dl(this.unproject(a.getBottomLeft()),this.unproject(a.getTopRight()))
        },
        getMinZoom: function() {
            return void 0 === this.options.minZoom ? this._layersMinZoom || 0 : this.options.minZoom
        },
        getMaxZoom: function() {
            return void 0 === this.options.maxZoom ? void 0 === this._layersMaxZoom ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
        },
        getBoundsZoom: function(z, p, k) {
            z = eh(z),
            k = dP(k || [0, 0]);
            var v = this.getZoom() || 0
              , w = this.getMinZoom()
              , y = this.getMaxZoom()
              , x = z.getNorthWest()
              , f = z.getSouthEast()
              , m = this.getSize().subtract(k)
              , A = ax(this.project(f, v), this.project(x, v)).getSize()
              , q = bQ ? this.options.zoomSnap : 1
              , g = m.x / A.x
              , b = m.y / A.y
              , j = p ? Math.max(g, b) : Math.min(g, b);
            return v = this.getScaleZoom(j, v),
            q && (v = Math.round(v / (q / 100)) * (q / 100),
            v = p ? Math.ceil(v / q) * q : Math.floor(v / q) * q),
            Math.max(w, Math.min(y, v))
        },
        getSize: function() {
            return this._size && !this._sizeChanged || (this._size = new dY(this._container.clientWidth || 0,this._container.clientHeight || 0),
            this._sizeChanged = !1),
            this._size.clone()
        },
        getPixelBounds: function(c, b) {
            var a = this._getTopLeftPoint(c, b);
            return new cI(a,a.add(this.getSize()))
        },
        getPixelOrigin: function() {
            return this._checkIfLoaded(),
            this._pixelOrigin
        },
        getPixelWorldBounds: function(a) {
            return this.options.crs.getProjectedBounds(void 0 === a ? this.getZoom() : a)
        },
        getPane: function(a) {
            return "string" == typeof a ? this._panes[a] : a
        },
        getPanes: function() {
            return this._panes
        },
        getContainer: function() {
            return this._container
        },
        getZoomScale: function(c, b) {
            var a = this.options.crs;
            return b = void 0 === b ? this._zoom : b,
            a.scale(c) / a.scale(b)
        },
        getScaleZoom: function(d, b) {
            var a = this.options.crs;
            b = void 0 === b ? this._zoom : b;
            var c = a.zoom(d * a.scale(b));
            return isNaN(c) ? 1 / 0 : c
        },
        project: function(b, a) {
            return a = void 0 === a ? this._zoom : a,
            this.options.crs.latLngToPoint(aH(b), a)
        },
        unproject: function(b, a) {
            return a = void 0 === a ? this._zoom : a,
            this.options.crs.pointToLatLng(dP(b), a)
        },
        layerPointToLatLng: function(b) {
            var a = dP(b).add(this.getPixelOrigin());
            return this.unproject(a)
        },
        latLngToLayerPoint: function(a) {
            return this.project(aH(a))._round()._subtract(this.getPixelOrigin())
        },
        wrapLatLng: function(a) {
            return this.options.crs.wrapLatLng(aH(a))
        },
        wrapLatLngBounds: function(a) {
            return this.options.crs.wrapLatLngBounds(eh(a))
        },
        distance: function(b, a) {
            return this.options.crs.distance(aH(b), aH(a))
        },
        containerPointToLayerPoint: function(a) {
            return dP(a).subtract(this._getMapPanePos())
        },
        layerPointToContainerPoint: function(a) {
            return dP(a).add(this._getMapPanePos())
        },
        containerPointToLatLng: function(b) {
            var a = this.containerPointToLayerPoint(dP(b));
            return this.layerPointToLatLng(a)
        },
        latLngToContainerPoint: function(a) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(aH(a)))
        },
        mouseEventToContainerPoint: function(a) {
            return aE(a, this._container)
        },
        mouseEventToLayerPoint: function(a) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(a))
        },
        mouseEventToLatLng: function(a) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(a))
        },
        _initContainer: function(b) {
            var a = this._container = dH(b);
            if (!a) {
                throw new Error("Map container not found.")
            }
            if (a._leaflet_id) {
                throw new Error("Map container is already initialized.")
            }
            cl(a, "scroll", this._onScroll, this),
            this._containerId = co(a)
        },
        _initLayout: function() {
            var b = this._container;
            this._fadeAnimated = this.options.fadeAnimation && bQ,
            cS(b, "leaflet-container" + (cV ? " leaflet-touch" : "") + (ec ? " leaflet-retina" : "") + (b6 ? " leaflet-oldie" : "") + (ar ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
            var a = cR(b, "position");
            "absolute" !== a && "relative" !== a && "fixed" !== a && (b.style.position = "relative"),
            this._initPanes(),
            this._initControlPos && this._initControlPos()
        },
        _initPanes: function() {
            var a = this._panes = {};
            this._paneRenderers = {},
            this._mapPane = this.createPane("mapPane", this._container),
            av(this._mapPane, new dY(0,0)),
            this.createPane("tilePane"),
            this.createPane("shadowPane"),
            this.createPane("overlayPane"),
            this.createPane("markerPane"),
            this.createPane("tooltipPane"),
            this.createPane("popupPane"),
            this.options.markerZoomAnimation || (cS(a.markerPane, "leaflet-zoom-hide"),
            cS(a.shadowPane, "leaflet-zoom-hide"))
        },
        _resetView: function(d, b) {
            av(this._mapPane, new dY(0,0));
            var a = !this._loaded;
            this._loaded = !0,
            b = this._limitZoom(b),
            this.fire("viewprereset");
            var c = this._zoom !== b;
            this._moveStart(c, !1)._move(d, b)._moveEnd(c),
            this.fire("viewreset"),
            a && this.fire("load")
        },
        _moveStart: function(b, a) {
            return b && this.fire("zoomstart"),
            a || this.fire("movestart"),
            this
        },
        _move: function(d, b, a) {
            void 0 === b && (b = this._zoom);
            var c = this._zoom !== b;
            return this._zoom = b,
            this._lastCenter = d,
            this._pixelOrigin = this._getNewPixelOrigin(d),
            (c || a && a.pinch) && this.fire("zoom", a),
            this.fire("move", a)
        },
        _moveEnd: function(a) {
            return a && this.fire("zoomend"),
            this.fire("moveend")
        },
        _stop: function() {
            return bk(this._flyToFrame),
            this._panAnim && this._panAnim.stop(),
            this
        },
        _rawPanBy: function(a) {
            av(this._mapPane, this._getMapPanePos().subtract(a))
        },
        _getZoomSpan: function() {
            return this.getMaxZoom() - this.getMinZoom()
        },
        _panInsideMaxBounds: function() {
            this._enforcingBounds || this.panInsideBounds(this.options.maxBounds)
        },
        _checkIfLoaded: function() {
            if (!this._loaded) {
                throw new Error("Set map center and zoom first.")
            }
        },
        _initEvents: function(b) {
            this._targets = {},
            this._targets[co(this._container)] = this;
            var a = b ? bh : cl;
            a(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress", this._handleDOMEvent, this),
            this.options.trackResize && a(window, "resize", this._onResize, this),
            bQ && this.options.transform3DLimit && (b ? this.off : this.on).call(this, "moveend", this._onMoveEnd)
        },
        _onResize: function() {
            bk(this._resizeRequest),
            this._resizeRequest = a9(function() {
                this.invalidateSize({
                    debounceMoveend: !0
                })
            }, this)
        },
        _onScroll: function() {
            this._container.scrollTop = 0,
            this._container.scrollLeft = 0
        },
        _onMoveEnd: function() {
            var a = this._getMapPanePos();
            Math.max(Math.abs(a.x), Math.abs(a.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom())
        },
        _findEventTargets: function(j, d) {
            for (var c, f = [], h = "mouseout" === d || "mouseover" === d, g = j.target || j.srcElement, b = !1; g; ) {
                if ((c = this._targets[co(g)]) && ("click" === d || "preclick" === d) && !j._simulated && this._draggableMoved(c)) {
                    b = !0;
                    break
                }
                if (c && c.listens(d, !0)) {
                    if (h && !aP(g, j)) {
                        break
                    }
                    if (f.push(c),
                    h) {
                        break
                    }
                }
                if (g === this._container) {
                    break
                }
                g = g.parentNode
            }
            return f.length || b || h || !aP(g, j) || (f = [this]),
            f
        },
        _handleDOMEvent: function(b) {
            if (this._loaded && !cm(b)) {
                var a = b.type;
                "mousedown" !== a && "keypress" !== a || aO(b.target || b.srcElement),
                this._fireDOMEvent(b, a)
            }
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(k, c, f) {
            if ("click" === k.type) {
                var g = bE({}, k);
                g.type = "preclick",
                this._fireDOMEvent(g, g.type, f)
            }
            if (!k._stopped && (f = (f || []).concat(this._findEventTargets(k, c))).length) {
                var j = f[0];
                "contextmenu" === c && j.listens(c, !0) && cQ(k);
                var i = {
                    originalEvent: k
                };
                if ("keypress" !== k.type) {
                    var b = j.getLatLng && (!j._radius || j._radius <= 10);
                    i.containerPoint = b ? this.latLngToContainerPoint(j.getLatLng()) : this.mouseEventToContainerPoint(k),
                    i.layerPoint = this.containerPointToLayerPoint(i.containerPoint),
                    i.latlng = b ? j.getLatLng() : this.layerPointToLatLng(i.layerPoint)
                }
                for (var d = 0; d < f.length; d++) {
                    if (f[d].fire(c, i, !0),
                    i.originalEvent._stopped || !1 === f[d].options.bubblingMouseEvents && -1 !== aQ(this._mouseEvents, c)) {
                        return
                    }
                }
            }
        },
        _draggableMoved: function(a) {
            return (a = a.dragging && a.dragging.enabled() ? a : this).dragging && a.dragging.moved() || this.boxZoom && this.boxZoom.moved()
        },
        _clearHandlers: function() {
            for (var b = 0, a = this._handlers.length; b < a; b++) {
                this._handlers[b].disable()
            }
        },
        whenReady: function(b, a) {
            return this._loaded ? b.call(a || this, {
                target: this
            }) : this.on("load", b, a),
            this
        },
        _getMapPanePos: function() {
            return bC(this._mapPane) || new dY(0,0)
        },
        _moved: function() {
            var a = this._getMapPanePos();
            return a && !a.equals([0, 0])
        },
        _getTopLeftPoint: function(b, a) {
            return (b && void 0 !== a ? this._getNewPixelOrigin(b, a) : this.getPixelOrigin()).subtract(this._getMapPanePos())
        },
        _getNewPixelOrigin: function(c, b) {
            var a = this.getSize()._divideBy(2);
            return this.project(c, b)._subtract(a)._add(this._getMapPanePos())._round()
        },
        _latLngToNewLayerPoint: function(d, b, a) {
            var c = this._getNewPixelOrigin(a, b);
            return this.project(d, b)._subtract(c)
        },
        _latLngBoundsToNewLayerBounds: function(d, b, a) {
            var c = this._getNewPixelOrigin(a, b);
            return ax([this.project(d.getSouthWest(), b)._subtract(c), this.project(d.getNorthWest(), b)._subtract(c), this.project(d.getSouthEast(), b)._subtract(c), this.project(d.getNorthEast(), b)._subtract(c)])
        },
        _getCenterLayerPoint: function() {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
        },
        _getCenterOffset: function(a) {
            return this.latLngToLayerPoint(a).subtract(this._getCenterLayerPoint())
        },
        _limitCenter: function(h, b, a) {
            if (!a) {
                return h
            }
            var c = this.project(h, b)
              , d = this.getSize().divideBy(2)
              , g = new cI(c.subtract(d),c.add(d))
              , f = this._getBoundsOffset(g, a, b);
            return f.round().equals([0, 0]) ? h : this.unproject(c.add(f), b)
        },
        _limitOffset: function(d, b) {
            if (!b) {
                return d
            }
            var a = this.getPixelBounds()
              , c = new cI(a.min.add(d),a.max.add(d));
            return d.add(this._getBoundsOffset(c, b))
        },
        _getBoundsOffset: function(g, b, a) {
            var c = ax(this.project(b.getNorthEast(), a), this.project(b.getSouthWest(), a))
              , d = c.min.subtract(g.min)
              , f = c.max.subtract(g.max);
            return new dY(this._rebound(d.x, -f.x),this._rebound(d.y, -f.y))
        },
        _rebound: function(b, a) {
            return b + a > 0 ? Math.round(b - a) / 2 : Math.max(0, Math.ceil(b)) - Math.max(0, Math.floor(a))
        },
        _limitZoom: function(d) {
            var b = this.getMinZoom()
              , a = this.getMaxZoom()
              , c = bQ ? this.options.zoomSnap : 1;
            return c && (d = Math.round(d / c) * c),
            Math.max(b, Math.min(a, d))
        },
        _onPanTransitionStep: function() {
            this.fire("move")
        },
        _onPanTransitionEnd: function() {
            dv(this._mapPane, "leaflet-pan-anim"),
            this.fire("moveend")
        },
        _tryAnimatedPan: function(c, b) {
            var a = this._getCenterOffset(c)._trunc();
            return !(!0 !== (b && b.animate) && !this.getSize().contains(a)) && (this.panBy(a, b),
            !0)
        },
        _createAnimProxy: function() {
            var a = this._proxy = bl("div", "leaflet-proxy leaflet-zoom-animated");
            this._panes.mapPane.appendChild(a),
            this.on("zoomanim", function(d) {
                var c = aI
                  , b = this._proxy.style[c];
                c6(this._proxy, this.project(d.center, d.zoom), this.getZoomScale(d.zoom, 1)),
                b === this._proxy.style[c] && this._animatingZoom && this._onZoomTransitionEnd()
            }, this),
            this.on("load moveend", function() {
                var c = this.getCenter()
                  , b = this.getZoom();
                c6(this._proxy, this.project(c, b), this.getZoomScale(b, 1))
            }, this),
            this._on("unload", this._destroyAnimProxy, this)
        },
        _destroyAnimProxy: function() {
            bV(this._proxy),
            delete this._proxy
        },
        _catchTransitionEnd: function(a) {
            this._animatingZoom && a.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
        },
        _nothingToAnimate: function() {
            return !this._container.getElementsByClassName("leaflet-zoom-animated").length
        },
        _tryAnimatedZoom: function(f, b, a) {
            if (this._animatingZoom) {
                return !0
            }
            if (a = a || {},
            !this._zoomAnimated || !1 === a.animate || this._nothingToAnimate() || Math.abs(b - this._zoom) > this.options.zoomAnimationThreshold) {
                return !1
            }
            var c = this.getZoomScale(b)
              , d = this._getCenterOffset(f)._divideBy(1 - 1 / c);
            return !(!0 !== a.animate && !this.getSize().contains(d)) && (a9(function() {
                this._moveStart(!0, !1)._animateZoom(f, b, !0)
            }, this),
            !0)
        },
        _animateZoom: function(d, a, b, c) {
            this._mapPane && (b && (this._animatingZoom = !0,
            this._animateToCenter = d,
            this._animateToZoom = a,
            cS(this._mapPane, "leaflet-zoom-anim")),
            this.fire("zoomanim", {
                center: d,
                zoom: a,
                noUpdate: c
            }),
            setTimeout(aZ(this._onZoomTransitionEnd, this), 250))
        },
        _onZoomTransitionEnd: function() {
            this._animatingZoom && (this._mapPane && dv(this._mapPane, "leaflet-zoom-anim"),
            this._animatingZoom = !1,
            this._move(this._animateToCenter, this._animateToZoom),
            a9(function() {
                this._moveEnd(!0)
            }, this))
        }
    }), dp = dG.extend({
        options: {
            position: "topright"
        },
        initialize: function(a) {
            b2(this, a)
        },
        getPosition: function() {
            return this.options.position
        },
        setPosition: function(b) {
            var a = this._map;
            return a && a.removeControl(this),
            this.options.position = b,
            a && a.addControl(this),
            this
        },
        getContainer: function() {
            return this._container
        },
        addTo: function(d) {
            this.remove(),
            this._map = d;
            var b = this._container = this.onAdd(d)
              , a = this.getPosition()
              , c = d._controlCorners[a];
            return cS(b, "leaflet-control"),
            -1 !== a.indexOf("bottom") ? c.insertBefore(b, c.firstChild) : c.appendChild(b),
            this
        },
        remove: function() {
            return this._map ? (bV(this._container),
            this.onRemove && this.onRemove(this._map),
            this._map = null,
            this) : this
        },
        _refocusOnMap: function(a) {
            this._map && a && a.screenX > 0 && a.screenY > 0 && this._map.getContainer().focus()
        }
    }), ek = function(a) {
        return new dp(a)
    };
    az.include({
        addControl: function(a) {
            return a.addTo(this),
            this
        },
        removeControl: function(a) {
            return a.remove(),
            this
        },
        _initControlPos: function() {
            function d(g, e) {
                var f = a + g + " " + a + e;
                b[g + e] = bl("div", f, c)
            }
            var b = this._controlCorners = {}
              , a = "leaflet-"
              , c = this._controlContainer = bl("div", a + "control-container", this._container);
            d("top", "left"),
            d("top", "right"),
            d("bottom", "left"),
            d("bottom", "right")
        },
        _clearControlPos: function() {
            for (var a in this._controlCorners) {
                bV(this._controlCorners[a])
            }
            bV(this._controlContainer),
            delete this._controlCorners,
            delete this._controlContainer
        }
    });
    var cf = dp.extend({
        options: {
            collapsed: !0,
            position: "topright",
            autoZIndex: !0,
            hideSingleBase: !1,
            sortLayers: !1,
            sortFunction: function(d, b, a, c) {
                return a < c ? -1 : c < a ? 1 : 0
            }
        },
        initialize: function(d, b, a) {
            b2(this, a),
            this._layerControlInputs = [],
            this._layers = [],
            this._lastZIndex = 0,
            this._handlingClick = !1;
            for (var c in d) {
                this._addLayer(d[c], c)
            }
            for (c in b) {
                this._addLayer(b[c], c, !0)
            }
        },
        onAdd: function(b) {
            this._initLayout(),
            this._update(),
            this._map = b,
            b.on("zoomend", this._checkDisabledLayers, this);
            for (var a = 0; a < this._layers.length; a++) {
                this._layers[a].layer.on("add remove", this._onLayerChange, this)
            }
            return this._container
        },
        addTo: function(a) {
            return dp.prototype.addTo.call(this, a),
            this._expandIfNotCollapsed()
        },
        onRemove: function() {
            this._map.off("zoomend", this._checkDisabledLayers, this);
            for (var a = 0; a < this._layers.length; a++) {
                this._layers[a].layer.off("add remove", this._onLayerChange, this)
            }
        },
        addBaseLayer: function(b, a) {
            return this._addLayer(b, a),
            this._map ? this._update() : this
        },
        addOverlay: function(b, a) {
            return this._addLayer(b, a, !0),
            this._map ? this._update() : this
        },
        removeLayer: function(b) {
            b.off("add remove", this._onLayerChange, this);
            var a = this._getLayer(co(b));
            return a && this._layers.splice(this._layers.indexOf(a), 1),
            this._map ? this._update() : this
        },
        expand: function() {
            cS(this._container, "leaflet-control-layers-expanded"),
            this._form.style.height = null;
            var a = this._map.getSize().y - (this._container.offsetTop + 50);
            return a < this._form.clientHeight ? (cS(this._form, "leaflet-control-layers-scrollbar"),
            this._form.style.height = a + "px") : dv(this._form, "leaflet-control-layers-scrollbar"),
            this._checkDisabledLayers(),
            this
        },
        collapse: function() {
            return dv(this._container, "leaflet-control-layers-expanded"),
            this
        },
        _initLayout: function() {
            var f = "leaflet-control-layers"
              , b = this._container = bl("div", f)
              , a = this.options.collapsed;
            b.setAttribute("aria-haspopup", !0),
            dW(b),
            d5(b);
            var c = this._form = bl("form", f + "-list");
            a && (this._map.on("click", this.collapse, this),
            em || cl(b, {
                mouseenter: this.expand,
                mouseleave: this.collapse
            }, this));
            var d = this._layersLink = bl("a", f + "-toggle", b);
            d.href = "#",
            d.title = "Layers",
            cV ? (cl(d, "click", ca),
            cl(d, "click", this.expand, this)) : cl(d, "focus", this.expand, this),
            a || this.expand(),
            this._baseLayersList = bl("div", f + "-base", c),
            this._separator = bl("div", f + "-separator", c),
            this._overlaysList = bl("div", f + "-overlays", c),
            b.appendChild(c)
        },
        _getLayer: function(b) {
            for (var a = 0; a < this._layers.length; a++) {
                if (this._layers[a] && co(this._layers[a].layer) === b) {
                    return this._layers[a]
                }
            }
        },
        _addLayer: function(c, a, b) {
            this._map && c.on("add remove", this._onLayerChange, this),
            this._layers.push({
                layer: c,
                name: a,
                overlay: b
            }),
            this.options.sortLayers && this._layers.sort(aZ(function(e, d) {
                return this.options.sortFunction(e.layer, d.layer, e.name, d.name)
            }, this)),
            this.options.autoZIndex && c.setZIndex && (this._lastZIndex++,
            c.setZIndex(this._lastZIndex)),
            this._expandIfNotCollapsed()
        },
        _update: function() {
            if (!this._container) {
                return this
            }
            d8(this._baseLayersList),
            d8(this._overlaysList),
            this._layerControlInputs = [];
            var f, b, a, c, d = 0;
            for (a = 0; a < this._layers.length; a++) {
                c = this._layers[a],
                this._addItem(c),
                b = b || c.overlay,
                f = f || !c.overlay,
                d += c.overlay ? 0 : 1
            }
            return this.options.hideSingleBase && (f = f && d > 1,
            this._baseLayersList.style.display = f ? "" : "none"),
            this._separator.style.display = b && f ? "" : "none",
            this
        },
        _onLayerChange: function(c) {
            this._handlingClick || this._update();
            var b = this._getLayer(co(c.target))
              , a = b.overlay ? "add" === c.type ? "overlayadd" : "overlayremove" : "add" === c.type ? "baselayerchange" : null;
            a && this._map.fire(a, b)
        },
        _createRadioElement: function(d, b) {
            var a = '<input type="radio" class="leaflet-control-layers-selector" name="' + d + '"' + (b ? ' checked="checked"' : "") + "/>"
              , c = document.createElement("div");
            return c.innerHTML = a,
            c.firstChild
        },
        _addItem: function(g) {
            var b, a = document.createElement("label"), c = this._map.hasLayer(g.layer);
            g.overlay ? ((b = document.createElement("input")).type = "checkbox",
            b.className = "leaflet-control-layers-selector",
            b.defaultChecked = c) : b = this._createRadioElement("leaflet-base-layers", c),
            this._layerControlInputs.push(b),
            b.layerId = co(g.layer),
            cl(b, "click", this._onInputClick, this);
            var f = document.createElement("span");
            f.innerHTML = " " + g.name;
            var d = document.createElement("div");
            return a.appendChild(d),
            d.appendChild(b),
            d.appendChild(f),
            (g.overlay ? this._overlaysList : this._baseLayersList).appendChild(a),
            this._checkDisabledLayers(),
            a
        },
        _onInputClick: function() {
            var g, b, a = this._layerControlInputs, c = [], d = [];
            this._handlingClick = !0;
            for (var f = a.length - 1; f >= 0; f--) {
                g = a[f],
                b = this._getLayer(g.layerId).layer,
                g.checked ? c.push(b) : g.checked || d.push(b)
            }
            for (f = 0; f < d.length; f++) {
                this._map.hasLayer(d[f]) && this._map.removeLayer(d[f])
            }
            for (f = 0; f < c.length; f++) {
                this._map.hasLayer(c[f]) || this._map.addLayer(c[f])
            }
            this._handlingClick = !1,
            this._refocusOnMap()
        },
        _checkDisabledLayers: function() {
            for (var f, b, a = this._layerControlInputs, c = this._map.getZoom(), d = a.length - 1; d >= 0; d--) {
                f = a[d],
                b = this._getLayer(f.layerId).layer,
                f.disabled = void 0 !== b.options.minZoom && c < b.options.minZoom || void 0 !== b.options.maxZoom && c > b.options.maxZoom
            }
        },
        _expandIfNotCollapsed: function() {
            return this._map && !this.options.collapsed && this.expand(),
            this
        },
        _expand: function() {
            return this.expand()
        },
        _collapse: function() {
            return this.collapse()
        }
    })
      , aJ = dp.extend({
        options: {
            position: "topleft",
            zoomInText: "+",
            zoomInTitle: "Zoom in",
            zoomOutText: "&#x2212;",
            zoomOutTitle: "Zoom out"
        },
        onAdd: function(d) {
            var b = "leaflet-control-zoom"
              , a = bl("div", b + " leaflet-bar")
              , c = this.options;
            return this._zoomInButton = this._createButton(c.zoomInText, c.zoomInTitle, b + "-in", a, this._zoomIn),
            this._zoomOutButton = this._createButton(c.zoomOutText, c.zoomOutTitle, b + "-out", a, this._zoomOut),
            this._updateDisabled(),
            d.on("zoomend zoomlevelschange", this._updateDisabled, this),
            a
        },
        onRemove: function(a) {
            a.off("zoomend zoomlevelschange", this._updateDisabled, this)
        },
        disable: function() {
            return this._disabled = !0,
            this._updateDisabled(),
            this
        },
        enable: function() {
            return this._disabled = !1,
            this._updateDisabled(),
            this
        },
        _zoomIn: function(a) {
            !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (a.shiftKey ? 3 : 1))
        },
        _zoomOut: function(a) {
            !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (a.shiftKey ? 3 : 1))
        },
        _createButton: function(g, b, a, c, d) {
            var f = bl("a", a, c);
            return f.innerHTML = g,
            f.href = "#",
            f.title = b,
            f.setAttribute("role", "button"),
            f.setAttribute("aria-label", b),
            dW(f),
            cl(f, "click", ca),
            cl(f, "click", d, this),
            cl(f, "click", this._refocusOnMap, this),
            f
        },
        _updateDisabled: function() {
            var b = this._map
              , a = "leaflet-disabled";
            dv(this._zoomInButton, a),
            dv(this._zoomOutButton, a),
            (this._disabled || b._zoom === b.getMinZoom()) && cS(this._zoomOutButton, a),
            (this._disabled || b._zoom === b.getMaxZoom()) && cS(this._zoomInButton, a)
        }
    });
    az.mergeOptions({
        zoomControl: !0
    }),
    az.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new aJ,
        this.addControl(this.zoomControl))
    });
    var db = dp.extend({
        options: {
            position: "bottomleft",
            maxWidth: 100,
            metric: !0,
            imperial: !0
        },
        onAdd: function(c) {
            var b = bl("div", "leaflet-control-scale")
              , a = this.options;
            return this._addScales(a, "leaflet-control-scale-line", b),
            c.on(a.updateWhenIdle ? "moveend" : "move", this._update, this),
            c.whenReady(this._update, this),
            b
        },
        onRemove: function(a) {
            a.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
        },
        _addScales: function(c, b, a) {
            c.metric && (this._mScale = bl("div", b, a)),
            c.imperial && (this._iScale = bl("div", b, a))
        },
        _update: function() {
            var c = this._map
              , b = c.getSize().y / 2
              , a = c.distance(c.containerPointToLatLng([0, b]), c.containerPointToLatLng([this.options.maxWidth, b]));
            this._updateScales(a)
        },
        _updateScales: function(a) {
            this.options.metric && a && this._updateMetric(a),
            this.options.imperial && a && this._updateImperial(a)
        },
        _updateMetric: function(c) {
            var b = this._getRoundNum(c)
              , a = b < 1000 ? b + " m" : b / 1000 + " km";
            this._updateScale(this._mScale, a, b / c)
        },
        _updateImperial: function(f) {
            var b, a, c, d = 3.2808399 * f;
            d > 5280 ? (b = d / 5280,
            a = this._getRoundNum(b),
            this._updateScale(this._iScale, a + " mi", a / b)) : (c = this._getRoundNum(d),
            this._updateScale(this._iScale, c + " ft", c / d))
        },
        _updateScale: function(c, b, a) {
            c.style.width = Math.round(this.options.maxWidth * a) + "px",
            c.innerHTML = b
        },
        _getRoundNum: function(c) {
            var b = Math.pow(10, (Math.floor(c) + "").length - 1)
              , a = c / b;
            return a = a >= 10 ? 10 : a >= 5 ? 5 : a >= 3 ? 3 : a >= 2 ? 2 : 1,
            b * a
        }
    })
      , el = dp.extend({
        options: {
            position: "bottomright",
            prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
        },
        initialize: function(a) {
            b2(this, a),
            this._attributions = {}
        },
        onAdd: function(b) {
            b.attributionControl = this,
            this._container = bl("div", "leaflet-control-attribution"),
            dW(this._container);
            for (var a in b._layers) {
                b._layers[a].getAttribution && this.addAttribution(b._layers[a].getAttribution())
            }
            return this._update(),
            this._container
        },
        setPrefix: function(a) {
            return this.options.prefix = a,
            this._update(),
            this
        },
        addAttribution: function(a) {
            return a ? (this._attributions[a] || (this._attributions[a] = 0),
            this._attributions[a]++,
            this._update(),
            this) : this
        },
        removeAttribution: function(a) {
            return a ? (this._attributions[a] && (this._attributions[a]--,
            this._update()),
            this) : this
        },
        _update: function() {
            if (this._map) {
                var c = [];
                for (var b in this._attributions) {
                    this._attributions[b] && c.push(b)
                }
                var a = [];
                this.options.prefix && a.push(this.options.prefix),
                c.length && a.push(c.join(", ")),
                this._container.innerHTML = a.join(" | ")
            }
        }
    });
    az.mergeOptions({
        attributionControl: !0
    }),
    az.addInitHook(function() {
        this.options.attributionControl && (new el).addTo(this)
    });
    dp.Layers = cf,
    dp.Zoom = aJ,
    dp.Scale = db,
    dp.Attribution = el,
    ek.layers = function(c, b, a) {
        return new cf(c,b,a)
    }
    ,
    ek.zoom = function(a) {
        return new aJ(a)
    }
    ,
    ek.scale = function(a) {
        return new db(a)
    }
    ,
    ek.attribution = function(a) {
        return new el(a)
    }
    ;
    var a2 = dG.extend({
        initialize: function(a) {
            this._map = a
        },
        enable: function() {
            return this._enabled ? this : (this._enabled = !0,
            this.addHooks(),
            this)
        },
        disable: function() {
            return this._enabled ? (this._enabled = !1,
            this.removeHooks(),
            this) : this
        },
        enabled: function() {
            return !!this._enabled
        }
    });
    a2.addTo = function(b, a) {
        return b.addHandler(a, this),
        this
    }
    ;
    var bW, ap = {
        Events: b5
    }, aA = cV ? "touchstart mousedown" : "mousedown", bH = {
        mousedown: "mouseup",
        touchstart: "touchend",
        pointerdown: "touchend",
        MSPointerDown: "touchend"
    }, cB = {
        mousedown: "mousemove",
        touchstart: "touchmove",
        pointerdown: "touchmove",
        MSPointerDown: "touchmove"
    }, c2 = aK.extend({
        options: {
            clickTolerance: 3
        },
        initialize: function(d, b, a, c) {
            b2(this, c),
            this._element = d,
            this._dragStartTarget = b || d,
            this._preventOutline = a
        },
        enable: function() {
            this._enabled || (cl(this._dragStartTarget, aA, this._onDown, this),
            this._enabled = !0)
        },
        disable: function() {
            this._enabled && (c2._dragging === this && this.finishDrag(),
            bh(this._dragStartTarget, aA, this._onDown, this),
            this._enabled = !1,
            this._moved = !1)
        },
        _onDown: function(c) {
            if (!c._simulated && this._enabled && (this._moved = !1,
            !aa(this._element, "leaflet-zoom-anim") && !(c2._dragging || c.shiftKey || 1 !== c.which && 1 !== c.button && !c.touches || (c2._dragging = this,
            this._preventOutline && aO(this._element),
            dE(),
            bd(),
            this._moving)))) {
                this.fire("down");
                var b = c.touches ? c.touches[0] : c
                  , a = aX(this._element);
                this._startPoint = new dY(b.clientX,b.clientY),
                this._parentScale = cP(a),
                cl(document, cB[c.type], this._onMove, this),
                cl(document, bH[c.type], this._onUp, this)
            }
        },
        _onMove: function(c) {
            if (!c._simulated && this._enabled) {
                if (c.touches && c.touches.length > 1) {
                    this._moved = !0
                } else {
                    var b = c.touches && 1 === c.touches.length ? c.touches[0] : c
                      , a = new dY(b.clientX,b.clientY)._subtract(this._startPoint);
                    (a.x || a.y) && (Math.abs(a.x) + Math.abs(a.y) < this.options.clickTolerance || (a.x /= this._parentScale.x,
                    a.y /= this._parentScale.y,
                    cQ(c),
                    this._moved || (this.fire("dragstart"),
                    this._moved = !0,
                    this._startPos = bC(this._element).subtract(a),
                    cS(document.body, "leaflet-dragging"),
                    this._lastTarget = c.target || c.srcElement,
                    window.SVGElementInstance && this._lastTarget instanceof SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement),
                    cS(this._lastTarget, "leaflet-drag-target")),
                    this._newPos = this._startPos.add(a),
                    this._moving = !0,
                    bk(this._animRequest),
                    this._lastEvent = c,
                    this._animRequest = a9(this._updatePosition, this, !0)))
                }
            }
        },
        _updatePosition: function() {
            var a = {
                originalEvent: this._lastEvent
            };
            this.fire("predrag", a),
            av(this._element, this._newPos),
            this.fire("drag", a)
        },
        _onUp: function(a) {
            !a._simulated && this._enabled && this.finishDrag()
        },
        finishDrag: function() {
            dv(document.body, "leaflet-dragging"),
            this._lastTarget && (dv(this._lastTarget, "leaflet-drag-target"),
            this._lastTarget = null);
            for (var a in cB) {
                bh(document, cB[a], this._onMove, this),
                bh(document, bH[a], this._onUp, this)
            }
            b9(),
            bp(),
            this._moved && this._moving && (bk(this._animRequest),
            this.fire("dragend", {
                distance: this._newPos.distanceTo(this._startPos)
            })),
            this._moving = !1,
            c2._dragging = !1
        }
    }), cr = (Object.freeze || Object)({
        simplify: es,
        pointToSegmentDistance: a8,
        closestPointOnSegment: function(c, b, a) {
            return aY(c, b, a)
        },
        clipSegment: bL,
        _getEdgeIntersection: cG,
        _getBitCode: c7,
        _sqClosestPointOnSegment: aY,
        isFlat: bS,
        _flat: dX
    }), aT = (Object.freeze || Object)({
        clipPolygon: bD
    }), bO = {
        project: function(a) {
            return new dY(a.lng,a.lat)
        },
        unproject: function(a) {
            return new cc(a.y,a.x)
        },
        bounds: new cI([-180, -90],[180, 90])
    }, dS = {
        R: 6378137,
        R_MINOR: 6356752.314245179,
        bounds: new cI([-20037508.34279, -15496570.73972],[20037508.34279, 18764656.23138]),
        project: function(k) {
            var d = Math.PI / 180
              , c = this.R
              , f = k.lat * d
              , g = this.R_MINOR / c
              , j = Math.sqrt(1 - g * g)
              , h = j * Math.sin(f)
              , b = Math.tan(Math.PI / 4 - f / 2) / Math.pow((1 - h) / (1 + h), j / 2);
            return f = -c * Math.log(Math.max(b, 1e-10)),
            new dY(k.lng * d * c,f)
        },
        unproject: function(m) {
            for (var f, c = 180 / Math.PI, g = this.R, j = this.R_MINOR / g, l = Math.sqrt(1 - j * j), k = Math.exp(-m.y / g), b = Math.PI / 2 - 2 * Math.atan(k), d = 0, p = 0.1; d < 15 && Math.abs(p) > 1e-07; d++) {
                f = l * Math.sin(b),
                f = Math.pow((1 - f) / (1 + f), l / 2),
                b += p = Math.PI / 2 - 2 * Math.atan(k * f) - b
            }
            return new cc(b * c,m.x * c / g)
        }
    }, by = (Object.freeze || Object)({
        LonLat: bO,
        Mercator: dS,
        SphericalMercator: cg
    }), bc = bE({}, cL, {
        code: "EPSG:3395",
        projection: dS,
        transformation: function() {
            var a = 0.5 / (Math.PI * dS.R);
            return ej(a, 0.5, -a, 0.5)
        }()
    }), dA = bE({}, cL, {
        code: "EPSG:4326",
        projection: bO,
        transformation: ej(1 / 180, 1, -1 / 180, 0.5)
    }), dJ = bE({}, aU, {
        projection: bO,
        transformation: ej(1, 0, -1, 0),
        scale: function(a) {
            return Math.pow(2, a)
        },
        zoom: function(a) {
            return Math.log(a) / Math.LN2
        },
        distance: function(d, b) {
            var a = b.lng - d.lng
              , c = b.lat - d.lat;
            return Math.sqrt(a * a + c * c)
        },
        infinite: !0
    });
    aU.Earth = cL,
    aU.EPSG3395 = bc,
    aU.EPSG3857 = eb,
    aU.EPSG900913 = d2,
    aU.EPSG4326 = dA,
    aU.Simple = dJ;
    var cT = aK.extend({
        options: {
            pane: "overlayPane",
            attribution: null,
            bubblingMouseEvents: !0
        },
        addTo: function(a) {
            return a.addLayer(this),
            this
        },
        remove: function() {
            return this.removeFrom(this._map || this._mapToAdd)
        },
        removeFrom: function(a) {
            return a && a.removeLayer(this),
            this
        },
        getPane: function(a) {
            return this._map.getPane(a ? this.options[a] || a : this.options.pane)
        },
        addInteractiveTarget: function(a) {
            return this._map._targets[co(a)] = this,
            this
        },
        removeInteractiveTarget: function(a) {
            return delete this._map._targets[co(a)],
            this
        },
        getAttribution: function() {
            return this.options.attribution
        },
        _layerAdd: function(c) {
            var b = c.target;
            if (b.hasLayer(this)) {
                if (this._map = b,
                this._zoomAnimated = b._zoomAnimated,
                this.getEvents) {
                    var a = this.getEvents();
                    b.on(a, this),
                    this.once("remove", function() {
                        b.off(a, this)
                    }, this)
                }
                this.onAdd(b),
                this.getAttribution && b.attributionControl && b.attributionControl.addAttribution(this.getAttribution()),
                this.fire("add"),
                b.fire("layeradd", {
                    layer: this
                })
            }
        }
    });
    az.include({
        addLayer: function(b) {
            if (!b._layerAdd) {
                throw new Error("The provided object is not a Layer.")
            }
            var a = co(b);
            return this._layers[a] ? this : (this._layers[a] = b,
            b._mapToAdd = this,
            b.beforeAdd && b.beforeAdd(this),
            this.whenReady(b._layerAdd, b),
            this)
        },
        removeLayer: function(b) {
            var a = co(b);
            return this._layers[a] ? (this._loaded && b.onRemove(this),
            b.getAttribution && this.attributionControl && this.attributionControl.removeAttribution(b.getAttribution()),
            delete this._layers[a],
            this._loaded && (this.fire("layerremove", {
                layer: b
            }),
            b.fire("remove")),
            b._map = b._mapToAdd = null,
            this) : this
        },
        hasLayer: function(a) {
            return !!a && co(a)in this._layers
        },
        eachLayer: function(c, b) {
            for (var a in this._layers) {
                c.call(b, this._layers[a])
            }
            return this
        },
        _addLayers: function(c) {
            for (var b = 0, a = (c = c ? cC(c) ? c : [c] : []).length; b < a; b++) {
                this.addLayer(c[b])
            }
        },
        _addZoomLimit: function(a) {
            !isNaN(a.options.maxZoom) && isNaN(a.options.minZoom) || (this._zoomBoundLayers[co(a)] = a,
            this._updateZoomLevels())
        },
        _removeZoomLimit: function(b) {
            var a = co(b);
            this._zoomBoundLayers[a] && (delete this._zoomBoundLayers[a],
            this._updateZoomLevels())
        },
        _updateZoomLevels: function() {
            var f = 1 / 0
              , b = -1 / 0
              , a = this._getZoomSpan();
            for (var c in this._zoomBoundLayers) {
                var d = this._zoomBoundLayers[c].options;
                f = void 0 === d.minZoom ? f : Math.min(f, d.minZoom),
                b = void 0 === d.maxZoom ? b : Math.max(b, d.maxZoom)
            }
            this._layersMaxZoom = b === -1 / 0 ? void 0 : b,
            this._layersMinZoom = f === 1 / 0 ? void 0 : f,
            a !== this._getZoomSpan() && this.fire("zoomlevelschange"),
            void 0 === this.options.maxZoom && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom),
            void 0 === this.options.minZoom && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom)
        }
    });
    var bo = cT.extend({
        initialize: function(d, b) {
            b2(this, b),
            this._layers = {};
            var a, c;
            if (d) {
                for (a = 0,
                c = d.length; a < c; a++) {
                    this.addLayer(d[a])
                }
            }
        },
        addLayer: function(b) {
            var a = this.getLayerId(b);
            return this._layers[a] = b,
            this._map && this._map.addLayer(b),
            this
        },
        removeLayer: function(b) {
            var a = b in this._layers ? b : this.getLayerId(b);
            return this._map && this._layers[a] && this._map.removeLayer(this._layers[a]),
            delete this._layers[a],
            this
        },
        hasLayer: function(a) {
            return !!a && (a in this._layers || this.getLayerId(a)in this._layers)
        },
        clearLayers: function() {
            return this.eachLayer(this.removeLayer, this)
        },
        invoke: function(d) {
            var b, a, c = Array.prototype.slice.call(arguments, 1);
            for (b in this._layers) {
                (a = this._layers[b])[d] && a[d].apply(a, c)
            }
            return this
        },
        onAdd: function(a) {
            this.eachLayer(a.addLayer, a)
        },
        onRemove: function(a) {
            this.eachLayer(a.removeLayer, a)
        },
        eachLayer: function(c, b) {
            for (var a in this._layers) {
                c.call(b, this._layers[a])
            }
            return this
        },
        getLayer: function(a) {
            return this._layers[a]
        },
        getLayers: function() {
            var a = [];
            return this.eachLayer(a.push, a),
            a
        },
        setZIndex: function(a) {
            return this.invoke("setZIndex", a)
        },
        getLayerId: function(a) {
            return co(a)
        }
    })
      , bX = bo.extend({
        addLayer: function(a) {
            return this.hasLayer(a) ? this : (a.addEventParent(this),
            bo.prototype.addLayer.call(this, a),
            this.fire("layeradd", {
                layer: a
            }))
        },
        removeLayer: function(a) {
            return this.hasLayer(a) ? (a in this._layers && (a = this._layers[a]),
            a.removeEventParent(this),
            bo.prototype.removeLayer.call(this, a),
            this.fire("layerremove", {
                layer: a
            })) : this
        },
        setStyle: function(a) {
            return this.invoke("setStyle", a)
        },
        bringToFront: function() {
            return this.invoke("bringToFront")
        },
        bringToBack: function() {
            return this.invoke("bringToBack")
        },
        getBounds: function() {
            var c = new dl;
            for (var b in this._layers) {
                var a = this._layers[b];
                c.extend(a.getBounds ? a.getBounds() : a.getLatLng())
            }
            return c
        }
    })
      , ea = dG.extend({
        options: {
            popupAnchor: [0, 0],
            tooltipAnchor: [0, 0]
        },
        initialize: function(a) {
            b2(this, a)
        },
        createIcon: function(a) {
            return this._createIcon("icon", a)
        },
        createShadow: function(a) {
            return this._createIcon("shadow", a)
        },
        _createIcon: function(d, b) {
            var a = this._getIconUrl(d);
            if (!a) {
                if ("icon" === d) {
                    throw new Error("iconUrl not set in Icon options (see the docs).")
                }
                return null
            }
            var c = this._createImg(a, b && "IMG" === b.tagName ? b : null);
            return this._setIconStyles(c, d),
            c
        },
        _setIconStyles: function(g, b) {
            var a = this.options
              , c = a[b + "Size"];
            "number" == typeof c && (c = [c, c]);
            var d = dP(c)
              , f = dP("shadow" === b && a.shadowAnchor || a.iconAnchor || d && d.divideBy(2, !0));
            g.className = "leaflet-marker-" + b + " " + (a.className || ""),
            f && (g.style.marginLeft = -f.x + "px",
            g.style.marginTop = -f.y + "px"),
            d && (g.style.width = d.x + "px",
            g.style.height = d.y + "px")
        },
        _createImg: function(b, a) {
            return a = a || document.createElement("img"),
            a.src = b,
            a
        },
        _getIconUrl: function(a) {
            return ec && this.options[a + "RetinaUrl"] || this.options[a + "Url"]
        }
    })
      , d1 = ea.extend({
        options: {
            iconUrl: "marker-icon.png",
            iconRetinaUrl: "marker-icon-2x.png",
            shadowUrl: "marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        },
        _getIconUrl: function(a) {
            return d1.imagePath || (d1.imagePath = this._detectIconPath()),
            (this.options.imagePath || d1.imagePath) + ea.prototype._getIconUrl.call(this, a)
        },
        _detectIconPath: function() {
            var b = bl("div", "leaflet-default-icon-path", document.body)
              , a = cR(b, "background-image") || cR(b, "backgroundImage");
            return document.body.removeChild(b),
            a = null === a || 0 !== a.indexOf("url") ? "" : a.replace(/^url\(["']?/, "").replace(/marker-icon\.png["']?\)$/, "")
        }
    })
      , bP = a2.extend({
        initialize: function(a) {
            this._marker = a
        },
        addHooks: function() {
            var a = this._marker._icon;
            this._draggable || (this._draggable = new c2(a,a,!0)),
            this._draggable.on({
                dragstart: this._onDragStart,
                predrag: this._onPreDrag,
                drag: this._onDrag,
                dragend: this._onDragEnd
            }, this).enable(),
            cS(a, "leaflet-marker-draggable")
        },
        removeHooks: function() {
            this._draggable.off({
                dragstart: this._onDragStart,
                predrag: this._onPreDrag,
                drag: this._onDrag,
                dragend: this._onDragEnd
            }, this).disable(),
            this._marker._icon && dv(this._marker._icon, "leaflet-marker-draggable")
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        _adjustPan: function(m) {
            var f = this._marker
              , c = f._map
              , g = this._marker.options.autoPanSpeed
              , j = this._marker.options.autoPanPadding
              , l = bC(f._icon)
              , k = c.getPixelBounds()
              , b = c.getPixelOrigin()
              , d = ax(k.min._subtract(b).add(j), k.max._subtract(b).subtract(j));
            if (!d.contains(l)) {
                var p = dP((Math.max(d.max.x, l.x) - d.max.x) / (k.max.x - d.max.x) - (Math.min(d.min.x, l.x) - d.min.x) / (k.min.x - d.min.x), (Math.max(d.max.y, l.y) - d.max.y) / (k.max.y - d.max.y) - (Math.min(d.min.y, l.y) - d.min.y) / (k.min.y - d.min.y)).multiplyBy(g);
                c.panBy(p, {
                    animate: !1
                }),
                this._draggable._newPos._add(p),
                this._draggable._startPos._add(p),
                av(f._icon, this._draggable._newPos),
                this._onDrag(m),
                this._panRequest = a9(this._adjustPan.bind(this, m))
            }
        },
        _onDragStart: function() {
            this._oldLatLng = this._marker.getLatLng(),
            this._marker.closePopup().fire("movestart").fire("dragstart")
        },
        _onPreDrag: function(a) {
            this._marker.options.autoPan && (bk(this._panRequest),
            this._panRequest = a9(this._adjustPan.bind(this, a)))
        },
        _onDrag: function(f) {
            var b = this._marker
              , a = b._shadow
              , c = bC(b._icon)
              , d = b._map.layerPointToLatLng(c);
            a && av(a, c),
            b._latlng = d,
            f.latlng = d,
            f.oldLatLng = this._oldLatLng,
            b.fire("move", f).fire("drag", f)
        },
        _onDragEnd: function(a) {
            bk(this._panRequest),
            delete this._oldLatLng,
            this._marker.fire("moveend").fire("dragend", a)
        }
    })
      , ab = cT.extend({
        options: {
            icon: new d1,
            interactive: !0,
            draggable: !1,
            autoPan: !1,
            autoPanPadding: [50, 50],
            autoPanSpeed: 10,
            keyboard: !0,
            title: "",
            alt: "",
            zIndexOffset: 0,
            opacity: 1,
            riseOnHover: !1,
            riseOffset: 250,
            pane: "markerPane",
            bubblingMouseEvents: !1
        },
        initialize: function(b, a) {
            b2(this, a),
            this._latlng = aH(b)
        },
        onAdd: function(a) {
            this._zoomAnimated = this._zoomAnimated && a.options.markerZoomAnimation,
            this._zoomAnimated && a.on("zoomanim", this._animateZoom, this),
            this._initIcon(),
            this.update()
        },
        onRemove: function(a) {
            this.dragging && this.dragging.enabled() && (this.options.draggable = !0,
            this.dragging.removeHooks()),
            delete this.dragging,
            this._zoomAnimated && a.off("zoomanim", this._animateZoom, this),
            this._removeIcon(),
            this._removeShadow()
        },
        getEvents: function() {
            return {
                zoom: this.update,
                viewreset: this.update
            }
        },
        getLatLng: function() {
            return this._latlng
        },
        setLatLng: function(b) {
            var a = this._latlng;
            return this._latlng = aH(b),
            this.update(),
            this.fire("move", {
                oldLatLng: a,
                latlng: this._latlng
            })
        },
        setZIndexOffset: function(a) {
            return this.options.zIndexOffset = a,
            this.update()
        },
        setIcon: function(a) {
            return this.options.icon = a,
            this._map && (this._initIcon(),
            this.update()),
            this._popup && this.bindPopup(this._popup, this._popup.options),
            this
        },
        getElement: function() {
            return this._icon
        },
        update: function() {
            if (this._icon && this._map) {
                var a = this._map.latLngToLayerPoint(this._latlng).round();
                this._setPos(a)
            }
            return this
        },
        _initIcon: function() {
            var g = this.options
              , b = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide")
              , a = g.icon.createIcon(this._icon)
              , c = !1;
            a !== this._icon && (this._icon && this._removeIcon(),
            c = !0,
            g.title && (a.title = g.title),
            "IMG" === a.tagName && (a.alt = g.alt || "")),
            cS(a, b),
            g.keyboard && (a.tabIndex = "0"),
            this._icon = a,
            g.riseOnHover && this.on({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            });
            var d = g.icon.createShadow(this._shadow)
              , f = !1;
            d !== this._shadow && (this._removeShadow(),
            f = !0),
            d && (cS(d, b),
            d.alt = ""),
            this._shadow = d,
            g.opacity < 1 && this._updateOpacity(),
            c && this.getPane().appendChild(this._icon),
            this._initInteraction(),
            d && f && this.getPane("shadowPane").appendChild(this._shadow)
        },
        _removeIcon: function() {
            this.options.riseOnHover && this.off({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            }),
            bV(this._icon),
            this.removeInteractiveTarget(this._icon),
            this._icon = null
        },
        _removeShadow: function() {
            this._shadow && bV(this._shadow),
            this._shadow = null
        },
        _setPos: function(a) {
            av(this._icon, a),
            this._shadow && av(this._shadow, a),
            this._zIndex = a.y + this.options.zIndexOffset,
            this._resetZIndex()
        },
        _updateZIndex: function(a) {
            this._icon.style.zIndex = this._zIndex + a
        },
        _animateZoom: function(b) {
            var a = this._map._latLngToNewLayerPoint(this._latlng, b.zoom, b.center).round();
            this._setPos(a)
        },
        _initInteraction: function() {
            if (this.options.interactive && (cS(this._icon, "leaflet-interactive"),
            this.addInteractiveTarget(this._icon),
            bP)) {
                var a = this.options.draggable;
                this.dragging && (a = this.dragging.enabled(),
                this.dragging.disable()),
                this.dragging = new bP(this),
                a && this.dragging.enable()
            }
        },
        setOpacity: function(a) {
            return this.options.opacity = a,
            this._map && this._updateOpacity(),
            this
        },
        _updateOpacity: function() {
            var a = this.options.opacity;
            cw(this._icon, a),
            this._shadow && cw(this._shadow, a)
        },
        _bringToFront: function() {
            this._updateZIndex(this.options.riseOffset)
        },
        _resetZIndex: function() {
            this._updateZIndex(0)
        },
        _getPopupAnchor: function() {
            return this.options.icon.options.popupAnchor
        },
        _getTooltipAnchor: function() {
            return this.options.icon.options.tooltipAnchor
        }
    })
      , cU = cT.extend({
        options: {
            stroke: !0,
            color: "#3388ff",
            weight: 3,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            dashArray: null,
            dashOffset: null,
            fill: !1,
            fillColor: null,
            fillOpacity: 0.2,
            fillRule: "evenodd",
            interactive: !0,
            bubblingMouseEvents: !0
        },
        beforeAdd: function(a) {
            this._renderer = a.getRenderer(this)
        },
        onAdd: function() {
            this._renderer._initPath(this),
            this._reset(),
            this._renderer._addPath(this)
        },
        onRemove: function() {
            this._renderer._removePath(this)
        },
        redraw: function() {
            return this._map && this._renderer._updatePath(this),
            this
        },
        setStyle: function(a) {
            return b2(this, a),
            this._renderer && this._renderer._updateStyle(this),
            this
        },
        bringToFront: function() {
            return this._renderer && this._renderer._bringToFront(this),
            this
        },
        bringToBack: function() {
            return this._renderer && this._renderer._bringToBack(this),
            this
        },
        getElement: function() {
            return this._path
        },
        _reset: function() {
            this._project(),
            this._update()
        },
        _clickTolerance: function() {
            return (this.options.stroke ? this.options.weight / 2 : 0) + this._renderer.options.tolerance
        }
    })
      , ds = cU.extend({
        options: {
            fill: !0,
            radius: 10
        },
        initialize: function(b, a) {
            b2(this, a),
            this._latlng = aH(b),
            this._radius = this.options.radius
        },
        setLatLng: function(a) {
            return this._latlng = aH(a),
            this.redraw(),
            this.fire("move", {
                latlng: this._latlng
            })
        },
        getLatLng: function() {
            return this._latlng
        },
        setRadius: function(a) {
            return this.options.radius = this._radius = a,
            this.redraw()
        },
        getRadius: function() {
            return this._radius
        },
        setStyle: function(b) {
            var a = b && b.radius || this._radius;
            return cU.prototype.setStyle.call(this, b),
            this.setRadius(a),
            this
        },
        _project: function() {
            this._point = this._map.latLngToLayerPoint(this._latlng),
            this._updateBounds()
        },
        _updateBounds: function() {
            var d = this._radius
              , b = this._radiusY || d
              , a = this._clickTolerance()
              , c = [d + a, b + a];
            this._pxBounds = new cI(this._point.subtract(c),this._point.add(c))
        },
        _update: function() {
            this._map && this._updatePath()
        },
        _updatePath: function() {
            this._renderer._updateCircle(this)
        },
        _empty: function() {
            return this._radius && !this._renderer._bounds.intersects(this._pxBounds)
        },
        _containsPoint: function(a) {
            return a.distanceTo(this._point) <= this._radius + this._clickTolerance()
        }
    })
      , a5 = ds.extend({
        initialize: function(c, a, b) {
            if ("number" == typeof a && (a = bE({}, b, {
                radius: a
            })),
            b2(this, a),
            this._latlng = aH(c),
            isNaN(this.options.radius)) {
                throw new Error("Circle radius cannot be NaN")
            }
            this._mRadius = this.options.radius
        },
        setRadius: function(a) {
            return this._mRadius = a,
            this.redraw()
        },
        getRadius: function() {
            return this._mRadius
        },
        getBounds: function() {
            var a = [this._radius, this._radiusY || this._radius];
            return new dl(this._map.layerPointToLatLng(this._point.subtract(a)),this._map.layerPointToLatLng(this._point.add(a)))
        },
        setStyle: cU.prototype.setStyle,
        _project: function() {
            var w = this._latlng.lng
              , j = this._latlng.lat
              , f = this._map
              , m = f.options.crs;
            if (m.distance === cL.distance) {
                var p = Math.PI / 180
                  , v = this._mRadius / cL.R / p
                  , q = f.project([j + v, w])
                  , b = f.project([j - v, w])
                  , g = q.add(b).divideBy(2)
                  , x = f.unproject(g).lat
                  , k = Math.acos((Math.cos(v * p) - Math.sin(j * p) * Math.sin(x * p)) / (Math.cos(j * p) * Math.cos(x * p))) / p;
                (isNaN(k) || 0 === k) && (k = v / Math.cos(Math.PI / 180 * j)),
                this._point = g.subtract(f.getPixelOrigin()),
                this._radius = isNaN(k) ? 0 : g.x - f.project([x, w - k]).x,
                this._radiusY = g.y - q.y
            } else {
                var d = m.unproject(m.project(this._latlng).subtract([this._mRadius, 0]));
                this._point = f.latLngToLayerPoint(this._latlng),
                this._radius = this._point.x - f.latLngToLayerPoint(d).x
            }
            this._updateBounds()
        }
    })
      , cv = cU.extend({
        options: {
            smoothFactor: 1,
            noClip: !1
        },
        initialize: function(b, a) {
            b2(this, a),
            this._setLatLngs(b)
        },
        getLatLngs: function() {
            return this._latlngs
        },
        setLatLngs: function(a) {
            return this._setLatLngs(a),
            this.redraw()
        },
        isEmpty: function() {
            return !this._latlngs.length
        },
        closestLayerPoint: function(w) {
            for (var j, f, m = 1 / 0, p = null, v = aY, q = 0, b = this._parts.length; q < b; q++) {
                for (var g = this._parts[q], x = 1, k = g.length; x < k; x++) {
                    var d = v(w, j = g[x - 1], f = g[x], !0);
                    d < m && (m = d,
                    p = v(w, j, f))
                }
            }
            return p && (p.distance = Math.sqrt(m)),
            p
        },
        getCenter: function() {
            if (!this._map) {
                throw new Error("Must add layer to map before using getCenter()")
            }
            var m, f, c, g, j, l, k, b = this._rings[0], d = b.length;
            if (!d) {
                return null
            }
            for (m = 0,
            f = 0; m < d - 1; m++) {
                f += b[m].distanceTo(b[m + 1]) / 2
            }
            if (0 === f) {
                return this._map.layerPointToLatLng(b[0])
            }
            for (m = 0,
            g = 0; m < d - 1; m++) {
                if (j = b[m],
                l = b[m + 1],
                c = j.distanceTo(l),
                (g += c) > f) {
                    return k = (g - f) / c,
                    this._map.layerPointToLatLng([l.x - k * (l.x - j.x), l.y - k * (l.y - j.y)])
                }
            }
        },
        getBounds: function() {
            return this._bounds
        },
        addLatLng: function(b, a) {
            return a = a || this._defaultShape(),
            b = aH(b),
            a.push(b),
            this._bounds.extend(b),
            this.redraw()
        },
        _setLatLngs: function(a) {
            this._bounds = new dl,
            this._latlngs = this._convertLatLngs(a)
        },
        _defaultShape: function() {
            return bS(this._latlngs) ? this._latlngs : this._latlngs[0]
        },
        _convertLatLngs: function(f) {
            for (var b = [], a = bS(f), c = 0, d = f.length; c < d; c++) {
                a ? (b[c] = aH(f[c]),
                this._bounds.extend(b[c])) : b[c] = this._convertLatLngs(f[c])
            }
            return b
        },
        _project: function() {
            var c = new cI;
            this._rings = [],
            this._projectLatlngs(this._latlngs, this._rings, c);
            var b = this._clickTolerance()
              , a = new dY(b,b);
            this._bounds.isValid() && c.isValid() && (c.min._subtract(a),
            c.max._add(a),
            this._pxBounds = c)
        },
        _projectLatlngs: function(h, b, a) {
            var c, d, g = h[0]instanceof cc, f = h.length;
            if (g) {
                for (d = [],
                c = 0; c < f; c++) {
                    d[c] = this._map.latLngToLayerPoint(h[c]),
                    a.extend(d[c])
                }
                b.push(d)
            } else {
                for (c = 0; c < f; c++) {
                    this._projectLatlngs(h[c], b, a)
                }
            }
        },
        _clipPoints: function() {
            var m = this._renderer._bounds;
            if (this._parts = [],
            this._pxBounds && this._pxBounds.intersects(m)) {
                if (this.options.noClip) {
                    this._parts = this._rings
                } else {
                    var f, c, g, j, l, k, b, d = this._parts;
                    for (f = 0,
                    g = 0,
                    j = this._rings.length; f < j; f++) {
                        for (c = 0,
                        l = (b = this._rings[f]).length; c < l - 1; c++) {
                            (k = bL(b[c], b[c + 1], m, c, !0)) && (d[g] = d[g] || [],
                            d[g].push(k[0]),
                            k[1] === b[c + 1] && c !== l - 2 || (d[g].push(k[1]),
                            g++))
                        }
                    }
                }
            }
        },
        _simplifyPoints: function() {
            for (var d = this._parts, b = this.options.smoothFactor, a = 0, c = d.length; a < c; a++) {
                d[a] = es(d[a], b)
            }
        },
        _update: function() {
            this._map && (this._clipPoints(),
            this._simplifyPoints(),
            this._updatePath())
        },
        _updatePath: function() {
            this._renderer._updatePoly(this)
        },
        _containsPoint: function(m, f) {
            var c, g, j, l, k, b, d = this._clickTolerance();
            if (!this._pxBounds || !this._pxBounds.contains(m)) {
                return !1
            }
            for (c = 0,
            l = this._parts.length; c < l; c++) {
                for (g = 0,
                j = (k = (b = this._parts[c]).length) - 1; g < k; j = g++) {
                    if ((f || 0 !== g) && a8(m, b[j], b[g]) <= d) {
                        return !0
                    }
                }
            }
            return !1
        }
    });
    cv._flat = dX;
    var cE = cv.extend({
        options: {
            fill: !0
        },
        isEmpty: function() {
            return !this._latlngs.length || !this._latlngs[0].length
        },
        getCenter: function() {
            if (!this._map) {
                throw new Error("Must add layer to map before using getCenter()")
            }
            var q, f, c, j, k, p, m, b, d, v = this._rings[0], g = v.length;
            if (!g) {
                return null
            }
            for (p = m = b = 0,
            q = 0,
            f = g - 1; q < g; f = q++) {
                c = v[q],
                j = v[f],
                k = c.y * j.x - j.y * c.x,
                m += (c.x + j.x) * k,
                b += (c.y + j.y) * k,
                p += 3 * k
            }
            return d = 0 === p ? v[0] : [m / p, b / p],
            this._map.layerPointToLatLng(d)
        },
        _convertLatLngs: function(c) {
            var b = cv.prototype._convertLatLngs.call(this, c)
              , a = b.length;
            return a >= 2 && b[0]instanceof cc && b[0].equals(b[a - 1]) && b.pop(),
            b
        },
        _setLatLngs: function(a) {
            cv.prototype._setLatLngs.call(this, a),
            bS(this._latlngs) && (this._latlngs = [this._latlngs])
        },
        _defaultShape: function() {
            return bS(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0]
        },
        _clipPoints: function() {
            var g = this._renderer._bounds
              , b = this.options.weight
              , a = new dY(b,b);
            if (g = new cI(g.min.subtract(a),g.max.add(a)),
            this._parts = [],
            this._pxBounds && this._pxBounds.intersects(g)) {
                if (this.options.noClip) {
                    this._parts = this._rings
                } else {
                    for (var c, d = 0, f = this._rings.length; d < f; d++) {
                        (c = bD(this._rings[d], g, !0)).length && this._parts.push(c)
                    }
                }
            }
        },
        _updatePath: function() {
            this._renderer._updatePoly(this, !0)
        },
        _containsPoint: function(m) {
            var f, c, g, j, l, k, b, d, p = !1;
            if (!this._pxBounds || !this._pxBounds.contains(m)) {
                return !1
            }
            for (j = 0,
            b = this._parts.length; j < b; j++) {
                for (l = 0,
                k = (d = (f = this._parts[j]).length) - 1; l < d; k = l++) {
                    c = f[l],
                    g = f[k],
                    c.y > m.y != g.y > m.y && m.x < (g.x - c.x) * (m.y - c.y) / (g.y - c.y) + c.x && (p = !p)
                }
            }
            return p || cv.prototype._containsPoint.call(this, m, !0)
        }
    })
      , df = bX.extend({
        initialize: function(b, a) {
            b2(this, a),
            this._layers = {},
            b && this.addData(b)
        },
        addData: function(h) {
            var b, a, c, d = cC(h) ? h : h.features;
            if (d) {
                for (b = 0,
                a = d.length; b < a; b++) {
                    ((c = d[b]).geometries || c.geometry || c.features || c.coordinates) && this.addData(c)
                }
                return this
            }
            var g = this.options;
            if (g.filter && !g.filter(h)) {
                return this
            }
            var f = bj(h, g);
            return f ? (f.feature = eg(h),
            f.defaultOptions = f.options,
            this.resetStyle(f),
            g.onEachFeature && g.onEachFeature(h, f),
            this.addLayer(f)) : this
        },
        resetStyle: function(a) {
            return a.options = bE({}, a.defaultOptions),
            this._setLayerStyle(a, this.options.style),
            this
        },
        setStyle: function(a) {
            return this.eachLayer(function(b) {
                this._setLayerStyle(b, a)
            }, this)
        },
        _setLayerStyle: function(b, a) {
            "function" == typeof a && (a = a(b.feature)),
            b.setStyle && b.setStyle(a)
        }
    })
      , c5 = {
        toGeoJSON: function(a) {
            return b1(this, {
                type: "Point",
                coordinates: cX(this.getLatLng(), a)
            })
        }
    };
    ab.include(c5),
    a5.include(c5),
    ds.include(c5),
    cv.include({
        toGeoJSON: function(c) {
            var b = !bS(this._latlngs)
              , a = bu(this._latlngs, b ? 1 : 0, !1, c);
            return b1(this, {
                type: (b ? "Multi" : "") + "LineString",
                coordinates: a
            })
        }
    }),
    cE.include({
        toGeoJSON: function(d) {
            var b = !bS(this._latlngs)
              , a = b && !bS(this._latlngs[0])
              , c = bu(this._latlngs, a ? 2 : b ? 1 : 0, !0, d);
            return b || (c = [c]),
            b1(this, {
                type: (a ? "Multi" : "") + "Polygon",
                coordinates: c
            })
        }
    }),
    bo.include({
        toMultiPoint: function(b) {
            var a = [];
            return this.eachLayer(function(c) {
                a.push(c.toGeoJSON(b).geometry.coordinates)
            }),
            b1(this, {
                type: "MultiPoint",
                coordinates: a
            })
        },
        toGeoJSON: function(d) {
            var b = this.feature && this.feature.geometry && this.feature.geometry.type;
            if ("MultiPoint" === b) {
                return this.toMultiPoint(d)
            }
            var a = "GeometryCollection" === b
              , c = [];
            return this.eachLayer(function(e) {
                if (e.toGeoJSON) {
                    var f = e.toGeoJSON(d);
                    if (a) {
                        c.push(f.geometry)
                    } else {
                        var g = eg(f);
                        "FeatureCollection" === g.type ? c.push.apply(c, g.features) : c.push(g)
                    }
                }
            }),
            a ? b1(this, {
                geometries: c,
                type: "GeometryCollection"
            }) : {
                type: "FeatureCollection",
                features: c
            }
        }
    });
    var au = d6
      , bB = cT.extend({
        options: {
            opacity: 1,
            alt: "",
            interactive: !1,
            crossOrigin: !1,
            errorOverlayUrl: "",
            zIndex: 1,
            className: ""
        },
        initialize: function(c, b, a) {
            this._url = c,
            this._bounds = eh(b),
            b2(this, a)
        },
        onAdd: function() {
            this._image || (this._initImage(),
            this.options.opacity < 1 && this._updateOpacity()),
            this.options.interactive && (cS(this._image, "leaflet-interactive"),
            this.addInteractiveTarget(this._image)),
            this.getPane().appendChild(this._image),
            this._reset()
        },
        onRemove: function() {
            bV(this._image),
            this.options.interactive && this.removeInteractiveTarget(this._image)
        },
        setOpacity: function(a) {
            return this.options.opacity = a,
            this._image && this._updateOpacity(),
            this
        },
        setStyle: function(a) {
            return a.opacity && this.setOpacity(a.opacity),
            this
        },
        bringToFront: function() {
            return this._map && dZ(this._image),
            this
        },
        bringToBack: function() {
            return this._map && bN(this._image),
            this
        },
        setUrl: function(a) {
            return this._url = a,
            this._image && (this._image.src = a),
            this
        },
        setBounds: function(a) {
            return this._bounds = eh(a),
            this._map && this._reset(),
            this
        },
        getEvents: function() {
            var a = {
                zoom: this._reset,
                viewreset: this._reset
            };
            return this._zoomAnimated && (a.zoomanim = this._animateZoom),
            a
        },
        setZIndex: function(a) {
            return this.options.zIndex = a,
            this._updateZIndex(),
            this
        },
        getBounds: function() {
            return this._bounds
        },
        getElement: function() {
            return this._image
        },
        _initImage: function() {
            var b = "IMG" === this._url.tagName
              , a = this._image = b ? this._url : bl("img");
            cS(a, "leaflet-image-layer"),
            this._zoomAnimated && cS(a, "leaflet-zoom-animated"),
            this.options.className && cS(a, this.options.className),
            a.onselectstart = cZ,
            a.onmousemove = cZ,
            a.onload = aZ(this.fire, this, "load"),
            a.onerror = aZ(this._overlayOnError, this, "error"),
            (this.options.crossOrigin || "" === this.options.crossOrigin) && (a.crossOrigin = !0 === this.options.crossOrigin ? "" : this.options.crossOrigin),
            this.options.zIndex && this._updateZIndex(),
            b ? this._url = a.src : (a.src = this._url,
            a.alt = this.options.alt)
        },
        _animateZoom: function(c) {
            var b = this._map.getZoomScale(c.zoom)
              , a = this._map._latLngBoundsToNewLayerBounds(this._bounds, c.zoom, c.center).min;
            c6(this._image, a, b)
        },
        _reset: function() {
            var c = this._image
              , b = new cI(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast()))
              , a = b.getSize();
            av(c, b.min),
            c.style.width = a.x + "px",
            c.style.height = a.y + "px"
        },
        _updateOpacity: function() {
            cw(this._image, this.options.opacity)
        },
        _updateZIndex: function() {
            this._image && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._image.style.zIndex = this.options.zIndex)
        },
        _overlayOnError: function() {
            this.fire("error");
            var a = this.options.errorOverlayUrl;
            a && this._url !== a && (this._url = a,
            this._image.src = a)
        }
    })
      , dD = bB.extend({
        options: {
            autoplay: !0,
            loop: !0
        },
        _initImage: function() {
            var j = "VIDEO" === this._url.tagName
              , d = this._image = j ? this._url : bl("video");
            if (cS(d, "leaflet-image-layer"),
            this._zoomAnimated && cS(d, "leaflet-zoom-animated"),
            d.onselectstart = cZ,
            d.onmousemove = cZ,
            d.onloadeddata = aZ(this.fire, this, "load"),
            j) {
                for (var e = d.getElementsByTagName("source"), f = [], g = 0; g < e.length; g++) {
                    f.push(e[g].src)
                }
                this._url = e.length > 0 ? f : [d.src]
            } else {
                cC(this._url) || (this._url = [this._url]),
                d.autoplay = !!this.options.autoplay,
                d.loop = !!this.options.loop;
                for (var b = 0; b < this._url.length; b++) {
                    var c = bl("source");
                    c.src = this._url[b],
                    d.appendChild(c)
                }
            }
        }
    })
      , b7 = cT.extend({
        options: {
            offset: [0, 7],
            className: "",
            pane: "popupPane"
        },
        initialize: function(b, a) {
            b2(this, b),
            this._source = a
        },
        onAdd: function(a) {
            this._zoomAnimated = a._zoomAnimated,
            this._container || this._initLayout(),
            a._fadeAnimated && cw(this._container, 0),
            clearTimeout(this._removeTimeout),
            this.getPane().appendChild(this._container),
            this.update(),
            a._fadeAnimated && cw(this._container, 1),
            this.bringToFront()
        },
        onRemove: function(a) {
            a._fadeAnimated ? (cw(this._container, 0),
            this._removeTimeout = setTimeout(aZ(bV, void 0, this._container), 200)) : bV(this._container)
        },
        getLatLng: function() {
            return this._latlng
        },
        setLatLng: function(a) {
            return this._latlng = aH(a),
            this._map && (this._updatePosition(),
            this._adjustPan()),
            this
        },
        getContent: function() {
            return this._content
        },
        setContent: function(a) {
            return this._content = a,
            this.update(),
            this
        },
        getElement: function() {
            return this._container
        },
        update: function() {
            this._map && (this._container.style.visibility = "hidden",
            this._updateContent(),
            this._updateLayout(),
            this._updatePosition(),
            this._container.style.visibility = "",
            this._adjustPan())
        },
        getEvents: function() {
            var a = {
                zoom: this._updatePosition,
                viewreset: this._updatePosition
            };
            return this._zoomAnimated && (a.zoomanim = this._animateZoom),
            a
        },
        isOpen: function() {
            return !!this._map && this._map.hasLayer(this)
        },
        bringToFront: function() {
            return this._map && dZ(this._container),
            this
        },
        bringToBack: function() {
            return this._map && bN(this._container),
            this
        },
        _updateContent: function() {
            if (this._content) {
                var b = this._contentNode
                  , a = "function" == typeof this._content ? this._content(this._source || this) : this._content;
                if ("string" == typeof a) {
                    b.innerHTML = a
                } else {
                    for (; b.hasChildNodes(); ) {
                        b.removeChild(b.firstChild)
                    }
                    b.appendChild(a)
                }
                this.fire("contentupdate")
            }
        },
        _updatePosition: function() {
            if (this._map) {
                var f = this._map.latLngToLayerPoint(this._latlng)
                  , b = dP(this.options.offset)
                  , a = this._getAnchor();
                this._zoomAnimated ? av(this._container, f.add(a)) : b = b.add(f).add(a);
                var c = this._containerBottom = -b.y
                  , d = this._containerLeft = -Math.round(this._containerWidth / 2) + b.x;
                this._container.style.bottom = c + "px",
                this._container.style.left = d + "px"
            }
        },
        _getAnchor: function() {
            return [0, 0]
        }
    })
      , aM = b7.extend({
        options: {
            maxWidth: 300,
            minWidth: 50,
            maxHeight: null,
            autoPan: !0,
            autoPanPaddingTopLeft: null,
            autoPanPaddingBottomRight: null,
            autoPanPadding: [5, 5],
            keepInView: !1,
            closeButton: !0,
            autoClose: !0,
            closeOnEscapeKey: !0,
            className: ""
        },
        openOn: function(a) {
            return a.openPopup(this),
            this
        },
        onAdd: function(a) {
            b7.prototype.onAdd.call(this, a),
            a.fire("popupopen", {
                popup: this
            }),
            this._source && (this._source.fire("popupopen", {
                popup: this
            }, !0),
            this._source instanceof cU || this._source.on("preclick", ef))
        },
        onRemove: function(a) {
            b7.prototype.onRemove.call(this, a),
            a.fire("popupclose", {
                popup: this
            }),
            this._source && (this._source.fire("popupclose", {
                popup: this
            }, !0),
            this._source instanceof cU || this._source.off("preclick", ef))
        },
        getEvents: function() {
            var a = b7.prototype.getEvents.call(this);
            return (void 0 !== this.options.closeOnClick ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (a.preclick = this._close),
            this.options.keepInView && (a.moveend = this._adjustPan),
            a
        },
        _close: function() {
            this._map && this._map.closePopup(this)
        },
        _initLayout: function() {
            var d = "leaflet-popup"
              , b = this._container = bl("div", d + " " + (this.options.className || "") + " leaflet-zoom-animated")
              , a = this._wrapper = bl("div", d + "-content-wrapper", b);
            if (this._contentNode = bl("div", d + "-content", a),
            dW(a),
            d5(this._contentNode),
            cl(a, "contextmenu", ef),
            this._tipContainer = bl("div", d + "-tip-container", b),
            this._tip = bl("div", d + "-tip", this._tipContainer),
            this.options.closeButton) {
                var c = this._closeButton = bl("a", d + "-close-button", b);
                c.href = "#close",
                c.innerHTML = "&#215;",
                cl(c, "click", this._onCloseButtonClick, this)
            }
        },
        _updateLayout: function() {
            var f = this._contentNode
              , b = f.style;
            b.width = "",
            b.whiteSpace = "nowrap";
            var a = f.offsetWidth;
            a = Math.min(a, this.options.maxWidth),
            a = Math.max(a, this.options.minWidth),
            b.width = a + 1 + "px",
            b.whiteSpace = "",
            b.height = "";
            var c = f.offsetHeight
              , d = this.options.maxHeight;
            d && c > d ? (b.height = d + "px",
            cS(f, "leaflet-popup-scrolled")) : dv(f, "leaflet-popup-scrolled"),
            this._containerWidth = this._container.offsetWidth
        },
        _animateZoom: function(c) {
            var b = this._map._latLngToNewLayerPoint(this._latlng, c.zoom, c.center)
              , a = this._getAnchor();
            av(this._container, b.add(a))
        },
        _adjustPan: function() {
            if (!(!this.options.autoPan || this._map._panAnim && this._map._panAnim._inProgress)) {
                var w = this._map
                  , j = parseInt(cR(this._container, "marginBottom"), 10) || 0
                  , f = this._container.offsetHeight + j
                  , m = this._containerWidth
                  , p = new dY(this._containerLeft,-f - this._containerBottom);
                p._add(bC(this._container));
                var v = w.layerPointToContainerPoint(p)
                  , q = dP(this.options.autoPanPadding)
                  , b = dP(this.options.autoPanPaddingTopLeft || q)
                  , g = dP(this.options.autoPanPaddingBottomRight || q)
                  , x = w.getSize()
                  , k = 0
                  , d = 0;
                v.x + m + g.x > x.x && (k = v.x + m - x.x + g.x),
                v.x - k - b.x < 0 && (k = v.x - b.x),
                v.y + f + g.y > x.y && (d = v.y + f - x.y + g.y),
                v.y - d - b.y < 0 && (d = v.y - b.y),
                (k || d) && w.fire("autopanstart").panBy([k, d])
            }
        },
        _onCloseButtonClick: function(a) {
            this._close(),
            ca(a)
        },
        _getAnchor: function() {
            return dP(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0])
        }
    });
    az.mergeOptions({
        closePopupOnClick: !0
    }),
    az.include({
        openPopup: function(c, b, a) {
            return c instanceof aM || (c = new aM(a).setContent(c)),
            b && c.setLatLng(b),
            this.hasLayer(c) ? this : (this._popup && this._popup.options.autoClose && this.closePopup(),
            this._popup = c,
            this.addLayer(c))
        },
        closePopup: function(a) {
            return a && a !== this._popup || (a = this._popup,
            this._popup = null),
            a && this.removeLayer(a),
            this
        }
    }),
    cT.include({
        bindPopup: function(b, a) {
            return b instanceof aM ? (b2(b, a),
            this._popup = b,
            b._source = this) : (this._popup && !a || (this._popup = new aM(a,this)),
            this._popup.setContent(b)),
            this._popupHandlersAdded || (this.on({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup
            }),
            this._popupHandlersAdded = !0),
            this
        },
        unbindPopup: function() {
            return this._popup && (this.off({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup
            }),
            this._popupHandlersAdded = !1,
            this._popup = null),
            this
        },
        openPopup: function(c, b) {
            if (c instanceof cT || (b = c,
            c = this),
            c instanceof bX) {
                for (var a in this._layers) {
                    c = this._layers[a];
                    break
                }
            }
            return b || (b = c.getCenter ? c.getCenter() : c.getLatLng()),
            this._popup && this._map && (this._popup._source = c,
            this._popup.update(),
            this._map.openPopup(this._popup, b)),
            this
        },
        closePopup: function() {
            return this._popup && this._popup._close(),
            this
        },
        togglePopup: function(a) {
            return this._popup && (this._popup._map ? this.closePopup() : this.openPopup(a)),
            this
        },
        isPopupOpen: function() {
            return !!this._popup && this._popup.isOpen()
        },
        setPopupContent: function(a) {
            return this._popup && this._popup.setContent(a),
            this
        },
        getPopup: function() {
            return this._popup
        },
        _openPopup: function(b) {
            var a = b.layer || b.target;
            this._popup && this._map && (ca(b),
            a instanceof cU ? this.openPopup(b.layer || b.target, b.latlng) : this._map.hasLayer(this._popup) && this._popup._source === a ? this.closePopup() : this.openPopup(a, b.latlng))
        },
        _movePopup: function(a) {
            this._popup.setLatLng(a.latlng)
        },
        _onKeyPress: function(a) {
            13 === a.originalEvent.keyCode && this._openPopup(a)
        }
    });
    var aj = b7.extend({
        options: {
            pane: "tooltipPane",
            offset: [0, 0],
            direction: "auto",
            permanent: !1,
            sticky: !1,
            interactive: !1,
            opacity: 0.9
        },
        onAdd: function(a) {
            b7.prototype.onAdd.call(this, a),
            this.setOpacity(this.options.opacity),
            a.fire("tooltipopen", {
                tooltip: this
            }),
            this._source && this._source.fire("tooltipopen", {
                tooltip: this
            }, !0)
        },
        onRemove: function(a) {
            b7.prototype.onRemove.call(this, a),
            a.fire("tooltipclose", {
                tooltip: this
            }),
            this._source && this._source.fire("tooltipclose", {
                tooltip: this
            }, !0)
        },
        getEvents: function() {
            var a = b7.prototype.getEvents.call(this);
            return cV && !this.options.permanent && (a.preclick = this._close),
            a
        },
        _close: function() {
            this._map && this._map.closeTooltip(this)
        },
        _initLayout: function() {
            var a = "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
            this._contentNode = this._container = bl("div", a)
        },
        _updateLayout: function() {},
        _adjustPan: function() {},
        _setPosition: function(m) {
            var f = this._map
              , c = this._container
              , g = f.latLngToContainerPoint(f.getCenter())
              , j = f.layerPointToContainerPoint(m)
              , l = this.options.direction
              , k = c.offsetWidth
              , b = c.offsetHeight
              , d = dP(this.options.offset)
              , p = this._getAnchor();
            "top" === l ? m = m.add(dP(-k / 2 + d.x, -b + d.y + p.y, !0)) : "bottom" === l ? m = m.subtract(dP(k / 2 - d.x, -d.y, !0)) : "center" === l ? m = m.subtract(dP(k / 2 + d.x, b / 2 - p.y + d.y, !0)) : "right" === l || "auto" === l && j.x < g.x ? (l = "right",
            m = m.add(dP(d.x + p.x, p.y - b / 2 + d.y, !0))) : (l = "left",
            m = m.subtract(dP(k + p.x - d.x, b / 2 - p.y - d.y, !0))),
            dv(c, "leaflet-tooltip-right"),
            dv(c, "leaflet-tooltip-left"),
            dv(c, "leaflet-tooltip-top"),
            dv(c, "leaflet-tooltip-bottom"),
            cS(c, "leaflet-tooltip-" + l),
            av(c, m)
        },
        _updatePosition: function() {
            var a = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(a)
        },
        setOpacity: function(a) {
            this.options.opacity = a,
            this._container && cw(this._container, a)
        },
        _animateZoom: function(b) {
            var a = this._map._latLngToNewLayerPoint(this._latlng, b.zoom, b.center);
            this._setPosition(a)
        },
        _getAnchor: function() {
            return dP(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0])
        }
    });
    az.include({
        openTooltip: function(c, b, a) {
            return c instanceof aj || (c = new aj(a).setContent(c)),
            b && c.setLatLng(b),
            this.hasLayer(c) ? this : this.addLayer(c)
        },
        closeTooltip: function(a) {
            return a && this.removeLayer(a),
            this
        }
    }),
    cT.include({
        bindTooltip: function(b, a) {
            return b instanceof aj ? (b2(b, a),
            this._tooltip = b,
            b._source = this) : (this._tooltip && !a || (this._tooltip = new aj(a,this)),
            this._tooltip.setContent(b)),
            this._initTooltipInteractions(),
            this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(),
            this
        },
        unbindTooltip: function() {
            return this._tooltip && (this._initTooltipInteractions(!0),
            this.closeTooltip(),
            this._tooltip = null),
            this
        },
        _initTooltipInteractions: function(c) {
            if (c || !this._tooltipHandlersAdded) {
                var b = c ? "off" : "on"
                  , a = {
                    remove: this.closeTooltip,
                    move: this._moveTooltip
                };
                this._tooltip.options.permanent ? a.add = this._openTooltip : (a.mouseover = this._openTooltip,
                a.mouseout = this.closeTooltip,
                this._tooltip.options.sticky && (a.mousemove = this._moveTooltip),
                cV && (a.click = this._openTooltip)),
                this[b](a),
                this._tooltipHandlersAdded = !c
            }
        },
        openTooltip: function(c, b) {
            if (c instanceof cT || (b = c,
            c = this),
            c instanceof bX) {
                for (var a in this._layers) {
                    c = this._layers[a];
                    break
                }
            }
            return b || (b = c.getCenter ? c.getCenter() : c.getLatLng()),
            this._tooltip && this._map && (this._tooltip._source = c,
            this._tooltip.update(),
            this._map.openTooltip(this._tooltip, b),
            this._tooltip.options.interactive && this._tooltip._container && (cS(this._tooltip._container, "leaflet-clickable"),
            this.addInteractiveTarget(this._tooltip._container))),
            this
        },
        closeTooltip: function() {
            return this._tooltip && (this._tooltip._close(),
            this._tooltip.options.interactive && this._tooltip._container && (dv(this._tooltip._container, "leaflet-clickable"),
            this.removeInteractiveTarget(this._tooltip._container))),
            this
        },
        toggleTooltip: function(a) {
            return this._tooltip && (this._tooltip._map ? this.closeTooltip() : this.openTooltip(a)),
            this
        },
        isTooltipOpen: function() {
            return this._tooltip.isOpen()
        },
        setTooltipContent: function(a) {
            return this._tooltip && this._tooltip.setContent(a),
            this
        },
        getTooltip: function() {
            return this._tooltip
        },
        _openTooltip: function(b) {
            var a = b.layer || b.target;
            this._tooltip && this._map && this.openTooltip(a, this._tooltip.options.sticky ? b.latlng : void 0)
        },
        _moveTooltip: function(d) {
            var b, a, c = d.latlng;
            this._tooltip.options.sticky && d.originalEvent && (b = this._map.mouseEventToContainerPoint(d.originalEvent),
            a = this._map.containerPointToLayerPoint(b),
            c = this._map.layerPointToLatLng(a)),
            this._tooltip.setLatLng(c)
        }
    });
    var aW = ea.extend({
        options: {
            iconSize: [12, 12],
            html: !1,
            bgPos: null,
            className: "leaflet-div-icon"
        },
        createIcon: function(d) {
            var b = d && "DIV" === d.tagName ? d : document.createElement("div")
              , a = this.options;
            if (b.innerHTML = !1 !== a.html ? a.html : "",
            a.bgPos) {
                var c = dP(a.bgPos);
                b.style.backgroundPosition = -c.x + "px " + -c.y + "px"
            }
            return this._setIconStyles(b, "icon"),
            b
        },
        createShadow: function() {
            return null
        }
    });
    ea.Default = d1;
    var cN = cT.extend({
        options: {
            tileSize: 256,
            opacity: 1,
            updateWhenIdle: dU,
            updateWhenZooming: !0,
            updateInterval: 200,
            zIndex: 1,
            bounds: null,
            minZoom: 0,
            maxZoom: void 0,
            maxNativeZoom: void 0,
            minNativeZoom: void 0,
            noWrap: !1,
            pane: "tilePane",
            className: "",
            keepBuffer: 2
        },
        initialize: function(a) {
            b2(this, a)
        },
        onAdd: function() {
            this._initContainer(),
            this._levels = {},
            this._tiles = {},
            this._resetView(),
            this._update()
        },
        beforeAdd: function(a) {
            a._addZoomLimit(this)
        },
        onRemove: function(a) {
            this._removeAllTiles(),
            bV(this._container),
            a._removeZoomLimit(this),
            this._container = null,
            this._tileZoom = void 0
        },
        bringToFront: function() {
            return this._map && (dZ(this._container),
            this._setAutoZIndex(Math.max)),
            this
        },
        bringToBack: function() {
            return this._map && (bN(this._container),
            this._setAutoZIndex(Math.min)),
            this
        },
        getContainer: function() {
            return this._container
        },
        setOpacity: function(a) {
            return this.options.opacity = a,
            this._updateOpacity(),
            this
        },
        setZIndex: function(a) {
            return this.options.zIndex = a,
            this._updateZIndex(),
            this
        },
        isLoading: function() {
            return this._loading
        },
        redraw: function() {
            return this._map && (this._removeAllTiles(),
            this._update()),
            this
        },
        getEvents: function() {
            var a = {
                viewprereset: this._invalidateAll,
                viewreset: this._resetView,
                zoom: this._resetView,
                moveend: this._onMoveEnd
            };
            return this.options.updateWhenIdle || (this._onMove || (this._onMove = cy(this._onMoveEnd, this.options.updateInterval, this)),
            a.move = this._onMove),
            this._zoomAnimated && (a.zoomanim = this._animateZoom),
            a
        },
        createTile: function() {
            return document.createElement("div")
        },
        getTileSize: function() {
            var a = this.options.tileSize;
            return a instanceof dY ? a : new dY(a,a)
        },
        _updateZIndex: function() {
            this._container && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._container.style.zIndex = this.options.zIndex)
        },
        _setAutoZIndex: function(g) {
            for (var b, a = this.getPane().children, c = -g(-1 / 0, 1 / 0), d = 0, f = a.length; d < f; d++) {
                b = a[d].style.zIndex,
                a[d] !== this._container && b && (c = g(c, +b))
            }
            isFinite(c) && (this.options.zIndex = c + g(-1, 1),
            this._updateZIndex())
        },
        _updateOpacity: function() {
            if (this._map && !b6) {
                cw(this._container, this.options.opacity);
                var g = +new Date
                  , b = !1
                  , a = !1;
                for (var c in this._tiles) {
                    var d = this._tiles[c];
                    if (d.current && d.loaded) {
                        var f = Math.min(1, (g - d.loaded) / 200);
                        cw(d.el, f),
                        f < 1 ? b = !0 : (d.active ? a = !0 : this._onOpaqueTile(d),
                        d.active = !0)
                    }
                }
                a && !this._noPrune && this._pruneTiles(),
                b && (bk(this._fadeFrame),
                this._fadeFrame = a9(this._updateOpacity, this))
            }
        },
        _onOpaqueTile: cZ,
        _initContainer: function() {
            this._container || (this._container = bl("div", "leaflet-layer " + (this.options.className || "")),
            this._updateZIndex(),
            this.options.opacity < 1 && this._updateOpacity(),
            this.getPane().appendChild(this._container))
        },
        _updateLevels: function() {
            var f = this._tileZoom
              , b = this.options.maxZoom;
            if (void 0 !== f) {
                for (var a in this._levels) {
                    this._levels[a].el.children.length || a === f ? (this._levels[a].el.style.zIndex = b - Math.abs(f - a),
                    this._onUpdateLevel(a)) : (bV(this._levels[a].el),
                    this._removeTilesAtZoom(a),
                    this._onRemoveLevel(a),
                    delete this._levels[a])
                }
                var c = this._levels[f]
                  , d = this._map;
                return c || ((c = this._levels[f] = {}).el = bl("div", "leaflet-tile-container leaflet-zoom-animated", this._container),
                c.el.style.zIndex = b,
                c.origin = d.project(d.unproject(d.getPixelOrigin()), f).round(),
                c.zoom = f,
                this._setZoomTransform(c, d.getCenter(), d.getZoom()),
                c.el.offsetWidth,
                this._onCreateLevel(c)),
                this._level = c,
                c
            }
        },
        _onUpdateLevel: cZ,
        _onRemoveLevel: cZ,
        _onCreateLevel: cZ,
        _pruneTiles: function() {
            if (this._map) {
                var d, b, a = this._map.getZoom();
                if (a > this.options.maxZoom || a < this.options.minZoom) {
                    this._removeAllTiles()
                } else {
                    for (d in this._tiles) {
                        (b = this._tiles[d]).retain = b.current
                    }
                    for (d in this._tiles) {
                        if ((b = this._tiles[d]).current && !b.active) {
                            var c = b.coords;
                            this._retainParent(c.x, c.y, c.z, c.z - 5) || this._retainChildren(c.x, c.y, c.z, c.z + 2)
                        }
                    }
                    for (d in this._tiles) {
                        this._tiles[d].retain || this._removeTile(d)
                    }
                }
            }
        },
        _removeTilesAtZoom: function(b) {
            for (var a in this._tiles) {
                this._tiles[a].coords.z === b && this._removeTile(a)
            }
        },
        _removeAllTiles: function() {
            for (var a in this._tiles) {
                this._removeTile(a)
            }
        },
        _invalidateAll: function() {
            for (var a in this._levels) {
                bV(this._levels[a].el),
                this._onRemoveLevel(a),
                delete this._levels[a]
            }
            this._removeAllTiles(),
            this._tileZoom = void 0
        },
        _retainParent: function(m, f, c, g) {
            var j = Math.floor(m / 2)
              , l = Math.floor(f / 2)
              , k = c - 1
              , b = new dY(+j,+l);
            b.z = +k;
            var d = this._tileCoordsToKey(b)
              , p = this._tiles[d];
            return p && p.active ? (p.retain = !0,
            !0) : (p && p.loaded && (p.retain = !0),
            k > g && this._retainParent(j, l, k, g))
        },
        _retainChildren: function(m, f, c, g) {
            for (var j = 2 * m; j < 2 * m + 2; j++) {
                for (var l = 2 * f; l < 2 * f + 2; l++) {
                    var k = new dY(j,l);
                    k.z = c + 1;
                    var b = this._tileCoordsToKey(k)
                      , d = this._tiles[b];
                    d && d.active ? d.retain = !0 : (d && d.loaded && (d.retain = !0),
                    c + 1 < g && this._retainChildren(j, l, c + 1, g))
                }
            }
        },
        _resetView: function(b) {
            var a = b && (b.pinch || b.flyTo);
            this._setView(this._map.getCenter(), this._map.getZoom(), a, a)
        },
        _animateZoom: function(a) {
            this._setView(a.center, a.zoom, !0, a.noUpdate)
        },
        _clampZoom: function(b) {
            var a = this.options;
            return void 0 !== a.minNativeZoom && b < a.minNativeZoom ? a.minNativeZoom : void 0 !== a.maxNativeZoom && a.maxNativeZoom < b ? a.maxNativeZoom : b
        },
        _setView: function(g, b, a, c) {
            var d = this._clampZoom(Math.round(b));
            (void 0 !== this.options.maxZoom && d > this.options.maxZoom || void 0 !== this.options.minZoom && d < this.options.minZoom) && (d = void 0);
            var f = this.options.updateWhenZooming && d !== this._tileZoom;
            c && !f || (this._tileZoom = d,
            this._abortLoading && this._abortLoading(),
            this._updateLevels(),
            this._resetGrid(),
            void 0 !== d && this._update(g),
            a || this._pruneTiles(),
            this._noPrune = !!a),
            this._setZoomTransforms(g, b)
        },
        _setZoomTransforms: function(c, b) {
            for (var a in this._levels) {
                this._setZoomTransform(this._levels[a], c, b)
            }
        },
        _setZoomTransform: function(f, b, a) {
            var c = this._map.getZoomScale(a, f.zoom)
              , d = f.origin.multiplyBy(c).subtract(this._map._getNewPixelOrigin(b, a)).round();
            bQ ? c6(f.el, d, c) : av(f.el, d)
        },
        _resetGrid: function() {
            var f = this._map
              , b = f.options.crs
              , a = this._tileSize = this.getTileSize()
              , c = this._tileZoom
              , d = this._map.getPixelWorldBounds(this._tileZoom);
            d && (this._globalTileRange = this._pxBoundsToTileRange(d)),
            this._wrapX = b.wrapLng && !this.options.noWrap && [Math.floor(f.project([0, b.wrapLng[0]], c).x / a.x), Math.ceil(f.project([0, b.wrapLng[1]], c).x / a.y)],
            this._wrapY = b.wrapLat && !this.options.noWrap && [Math.floor(f.project([b.wrapLat[0], 0], c).y / a.x), Math.ceil(f.project([b.wrapLat[1], 0], c).y / a.y)]
        },
        _onMoveEnd: function() {
            this._map && !this._map._animatingZoom && this._update()
        },
        _getTiledPixelBounds: function(g) {
            var b = this._map
              , a = b._animatingZoom ? Math.max(b._animateToZoom, b.getZoom()) : b.getZoom()
              , c = b.getZoomScale(a, this._tileZoom)
              , d = b.project(g, this._tileZoom).floor()
              , f = b.getSize().divideBy(2 * c);
            return new cI(d.subtract(f),d.add(f))
        },
        _update: function(D) {
            var v = this._map;
            if (v) {
                var k = this._clampZoom(v.getZoom());
                if (void 0 === D && (D = v.getCenter()),
                void 0 !== this._tileZoom) {
                    var y = this._getTiledPixelBounds(D)
                      , z = this._pxBoundsToTileRange(y)
                      , C = z.getCenter()
                      , B = []
                      , f = this.options.keepBuffer
                      , q = new cI(z.getBottomLeft().subtract([f, -f]),z.getTopRight().add([f, -f]));
                    if (!(isFinite(z.min.x) && isFinite(z.min.y) && isFinite(z.max.x) && isFinite(z.max.y))) {
                        throw new Error("Attempted to load an infinite number of tiles")
                    }
                    for (var E in this._tiles) {
                        var w = this._tiles[E].coords;
                        w.z === this._tileZoom && q.contains(new dY(w.x,w.y)) || (this._tiles[E].current = !1)
                    }
                    if (Math.abs(k - this._tileZoom) > 1) {
                        this._setView(D, k)
                    } else {
                        for (var g = z.min.y; g <= z.max.y; g++) {
                            for (var b = z.min.x; b <= z.max.x; b++) {
                                var j = new dY(b,g);
                                if (j.z = this._tileZoom,
                                this._isValidTile(j)) {
                                    var A = this._tiles[this._tileCoordsToKey(j)];
                                    A ? A.current = !0 : B.push(j)
                                }
                            }
                        }
                        if (B.sort(function(c, a) {
                            return c.distanceTo(C) - a.distanceTo(C)
                        }),
                        0 !== B.length) {
                            this._loading || (this._loading = !0,
                            this.fire("loading"));
                            var x = document.createDocumentFragment();
                            for (b = 0; b < B.length; b++) {
                                this._addTile(B[b], x)
                            }
                            this._level.el.appendChild(x)
                        }
                    }
                }
            }
        },
        _isValidTile: function(d) {
            var b = this._map.options.crs;
            if (!b.infinite) {
                var a = this._globalTileRange;
                if (!b.wrapLng && (d.x < a.min.x || d.x > a.max.x) || !b.wrapLat && (d.y < a.min.y || d.y > a.max.y)) {
                    return !1
                }
            }
            if (!this.options.bounds) {
                return !0
            }
            var c = this._tileCoordsToBounds(d);
            return eh(this.options.bounds).overlaps(c)
        },
        _keyToBounds: function(a) {
            return this._tileCoordsToBounds(this._keyToTileCoords(a))
        },
        _tileCoordsToNwSe: function(f) {
            var b = this._map
              , a = this.getTileSize()
              , c = f.scaleBy(a)
              , d = c.add(a);
            return [b.unproject(c, f.z), b.unproject(d, f.z)]
        },
        _tileCoordsToBounds: function(c) {
            var b = this._tileCoordsToNwSe(c)
              , a = new dl(b[0],b[1]);
            return this.options.noWrap || (a = this._map.wrapLatLngBounds(a)),
            a
        },
        _tileCoordsToKey: function(a) {
            return a.x + ":" + a.y + ":" + a.z
        },
        _keyToTileCoords: function(c) {
            var b = c.split(":")
              , a = new dY(+b[0],+b[1]);
            return a.z = +b[2],
            a
        },
        _removeTile: function(b) {
            var a = this._tiles[b];
            a && (dd || a.el.setAttribute("src", dc),
            bV(a.el),
            delete this._tiles[b],
            this.fire("tileunload", {
                tile: a.el,
                coords: this._keyToTileCoords(b)
            }))
        },
        _initTile: function(b) {
            cS(b, "leaflet-tile");
            var a = this.getTileSize();
            b.style.width = a.x + "px",
            b.style.height = a.y + "px",
            b.onselectstart = cZ,
            b.onmousemove = cZ,
            b6 && this.options.opacity < 1 && cw(b, this.options.opacity),
            em && !ch && (b.style.WebkitBackfaceVisibility = "hidden")
        },
        _addTile: function(e, a) {
            var b = this._getTilePos(e)
              , c = this._tileCoordsToKey(e)
              , d = this.createTile(this._wrapCoords(e), aZ(this._tileReady, this, e));
            this._initTile(d),
            this.createTile.length < 2 && a9(aZ(this._tileReady, this, e, null, d)),
            av(d, b),
            this._tiles[c] = {
                el: d,
                coords: e,
                current: !0
            },
            a.appendChild(d),
            this.fire("tileloadstart", {
                tile: d,
                coords: e
            })
        },
        _tileReady: function(d, a, b) {
            if (this._map && b.getAttribute("src") !== dc) {
                a && this.fire("tileerror", {
                    error: a,
                    tile: b,
                    coords: d
                });
                var c = this._tileCoordsToKey(d);
                (b = this._tiles[c]) && (b.loaded = +new Date,
                this._map._fadeAnimated ? (cw(b.el, 0),
                bk(this._fadeFrame),
                this._fadeFrame = a9(this._updateOpacity, this)) : (b.active = !0,
                this._pruneTiles()),
                a || (cS(b.el, "leaflet-tile-loaded"),
                this.fire("tileload", {
                    tile: b.el,
                    coords: d
                })),
                this._noTilesToLoad() && (this._loading = !1,
                this.fire("load"),
                b6 || !this._map._fadeAnimated ? a9(this._pruneTiles, this) : setTimeout(aZ(this._pruneTiles, this), 250)))
            }
        },
        _getTilePos: function(a) {
            return a.scaleBy(this.getTileSize()).subtract(this._level.origin)
        },
        _wrapCoords: function(b) {
            var a = new dY(this._wrapX ? c8(b.x, this._wrapX) : b.x,this._wrapY ? c8(b.y, this._wrapY) : b.y);
            return a.z = b.z,
            a
        },
        _pxBoundsToTileRange: function(b) {
            var a = this.getTileSize();
            return new cI(b.min.unscaleBy(a).floor(),b.max.unscaleBy(a).ceil().subtract([1, 1]))
        },
        _noTilesToLoad: function() {
            for (var a in this._tiles) {
                if (!this._tiles[a].loaded) {
                    return !1
                }
            }
            return !0
        }
    })
      , cj = cN.extend({
        options: {
            minZoom: 0,
            maxZoom: 18,
            subdomains: "abc",
            errorTileUrl: "",
            zoomOffset: 0,
            tms: !1,
            zoomReverse: !1,
            detectRetina: !1,
            crossOrigin: !1
        },
        initialize: function(b, a) {
            this._url = b,
            (a = b2(this, a)).detectRetina && ec && a.maxZoom > 0 && (a.tileSize = Math.floor(a.tileSize / 2),
            a.zoomReverse ? (a.zoomOffset--,
            a.minZoom++) : (a.zoomOffset++,
            a.maxZoom--),
            a.minZoom = Math.max(0, a.minZoom)),
            "string" == typeof a.subdomains && (a.subdomains = a.subdomains.split("")),
            em || this.on("tileunload", this._onTileRemove)
        },
        setUrl: function(b, a) {
            return this._url = b,
            a || this.redraw(),
            this
        },
        createTile: function(c, a) {
            var b = document.createElement("img");
            return cl(b, "load", aZ(this._tileOnLoad, this, a, b)),
            cl(b, "error", aZ(this._tileOnError, this, a, b)),
            (this.options.crossOrigin || "" === this.options.crossOrigin) && (b.crossOrigin = !0 === this.options.crossOrigin ? "" : this.options.crossOrigin),
            b.alt = "",
            b.setAttribute("role", "presentation"),
            b.src = this.getTileUrl(c),
            b
        },
        getTileUrl: function(c) {
            var a = {
                r: ec ? "@2x" : "",
                s: this._getSubdomain(c),
                x: c.x,
                y: c.y,
                z: this._getZoomForUrl()
            };
            if (this._map && !this._map.options.crs.infinite) {
                var b = this._globalTileRange.max.y - c.y;
                this.options.tms && (a.y = b),
                a["-y"] = b
            }
            return af(this._url, bE(a, this.options))
        },
        _tileOnLoad: function(b, a) {
            b6 ? setTimeout(aZ(b, this, null, a), 0) : b(null, a)
        },
        _tileOnError: function(d, b, a) {
            var c = this.options.errorTileUrl;
            c && b.getAttribute("src") !== c && (b.src = c),
            d(a, b)
        },
        _onTileRemove: function(a) {
            a.tile.onload = null
        },
        _getZoomForUrl: function() {
            var d = this._tileZoom
              , b = this.options.maxZoom
              , a = this.options.zoomReverse
              , c = this.options.zoomOffset;
            return a && (d = b - d),
            d + c
        },
        _getSubdomain: function(b) {
            var a = Math.abs(b.x + b.y) % this.options.subdomains.length;
            return this.options.subdomains[a]
        },
        _abortLoading: function() {
            var b, a;
            for (b in this._tiles) {
                this._tiles[b].coords.z !== this._tileZoom && ((a = this._tiles[b].el).onload = cZ,
                a.onerror = cZ,
                a.complete || (a.src = dc,
                bV(a),
                delete this._tiles[b]))
            }
        }
    })
      , bg = cj.extend({
        defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            layers: "",
            styles: "",
            format: "image/jpeg",
            transparent: !1,
            version: "1.1.1"
        },
        options: {
            crs: null,
            uppercase: !1
        },
        initialize: function(g, a) {
            this._url = g;
            var b = bE({}, this.defaultWmsParams);
            for (var c in a) {
                c in this.options || (b[c] = a[c])
            }
            var f = (a = b2(this, a)).detectRetina && ec ? 2 : 1
              , d = this.getTileSize();
            b.width = d.x * f,
            b.height = d.y * f,
            this.wmsParams = b
        },
        onAdd: function(b) {
            this._crs = this.options.crs || b.options.crs,
            this._wmsVersion = parseFloat(this.wmsParams.version);
            var a = this._wmsVersion >= 1.3 ? "crs" : "srs";
            this.wmsParams[a] = this._crs.code,
            cj.prototype.onAdd.call(this, b)
        },
        getTileUrl: function(k) {
            var d = this._tileCoordsToNwSe(k)
              , c = this._crs
              , f = ax(c.project(d[0]), c.project(d[1]))
              , g = f.min
              , j = f.max
              , h = (this._wmsVersion >= 1.3 && this._crs === dA ? [g.y, g.x, j.y, j.x] : [g.x, g.y, j.x, j.y]).join(",")
              , b = cj.prototype.getTileUrl.call(this, k);
            return b + aG(this.wmsParams, b, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + h
        },
        setParams: function(b, a) {
            return bE(this.wmsParams, b),
            a || this.redraw(),
            this
        }
    });
    cj.WMS = bg,
    bT.wms = function(b, a) {
        return new bg(b,a)
    }
    ;
    var br = cT.extend({
        options: {
            padding: 0.1,
            tolerance: 0
        },
        initialize: function(a) {
            b2(this, a),
            co(this),
            this._layers = this._layers || {}
        },
        onAdd: function() {
            this._container || (this._initContainer(),
            this._zoomAnimated && cS(this._container, "leaflet-zoom-animated")),
            this.getPane().appendChild(this._container),
            this._update(),
            this.on("update", this._updatePaths, this)
        },
        onRemove: function() {
            this.off("update", this._updatePaths, this),
            this._destroyContainer()
        },
        getEvents: function() {
            var a = {
                viewreset: this._reset,
                zoom: this._onZoom,
                moveend: this._update,
                zoomend: this._onZoomEnd
            };
            return this._zoomAnimated && (a.zoomanim = this._onAnimZoom),
            a
        },
        _onAnimZoom: function(a) {
            this._updateTransform(a.center, a.zoom)
        },
        _onZoom: function() {
            this._updateTransform(this._map.getCenter(), this._map.getZoom())
        },
        _updateTransform: function(k, d) {
            var c = this._map.getZoomScale(d, this._zoom)
              , f = bC(this._container)
              , g = this._map.getSize().multiplyBy(0.5 + this.options.padding)
              , j = this._map.project(this._center, d)
              , h = this._map.project(k, d).subtract(j)
              , b = g.multiplyBy(-c).add(f).add(g).subtract(h);
            bQ ? c6(this._container, b, c) : av(this._container, b)
        },
        _reset: function() {
            this._update(),
            this._updateTransform(this._center, this._zoom);
            for (var a in this._layers) {
                this._layers[a]._reset()
            }
        },
        _onZoomEnd: function() {
            for (var a in this._layers) {
                this._layers[a]._project()
            }
        },
        _updatePaths: function() {
            for (var a in this._layers) {
                this._layers[a]._update()
            }
        },
        _update: function() {
            var c = this.options.padding
              , b = this._map.getSize()
              , a = this._map.containerPointToLayerPoint(b.multiplyBy(-c)).round();
            this._bounds = new cI(a,a.add(b.multiplyBy(1 + 2 * c)).round()),
            this._center = this._map.getCenter(),
            this._zoom = this._map.getZoom()
        }
    })
      , dM = br.extend({
        getEvents: function() {
            var a = br.prototype.getEvents.call(this);
            return a.viewprereset = this._onViewPreReset,
            a
        },
        _onViewPreReset: function() {
            this._postponeUpdatePaths = !0
        },
        onAdd: function() {
            br.prototype.onAdd.call(this),
            this._draw()
        },
        _initContainer: function() {
            var a = this._container = document.createElement("canvas");
            cl(a, "mousemove", cy(this._onMouseMove, 32, this), this),
            cl(a, "click dblclick mousedown mouseup contextmenu", this._onClick, this),
            cl(a, "mouseout", this._handleMouseOut, this),
            this._ctx = a.getContext("2d")
        },
        _destroyContainer: function() {
            bk(this._redrawRequest),
            delete this._ctx,
            bV(this._container),
            bh(this._container),
            delete this._container
        },
        _updatePaths: function() {
            if (!this._postponeUpdatePaths) {
                this._redrawBounds = null;
                for (var a in this._layers) {
                    this._layers[a]._update()
                }
                this._redraw()
            }
        },
        _update: function() {
            if (!this._map._animatingZoom || !this._bounds) {
                this._drawnLayers = {},
                br.prototype._update.call(this);
                var d = this._bounds
                  , b = this._container
                  , a = d.getSize()
                  , c = ec ? 2 : 1;
                av(b, d.min),
                b.width = c * a.x,
                b.height = c * a.y,
                b.style.width = a.x + "px",
                b.style.height = a.y + "px",
                ec && this._ctx.scale(2, 2),
                this._ctx.translate(-d.min.x, -d.min.y),
                this.fire("update")
            }
        },
        _reset: function() {
            br.prototype._reset.call(this),
            this._postponeUpdatePaths && (this._postponeUpdatePaths = !1,
            this._updatePaths())
        },
        _initPath: function(b) {
            this._updateDashArray(b),
            this._layers[co(b)] = b;
            var a = b._order = {
                layer: b,
                prev: this._drawLast,
                next: null
            };
            this._drawLast && (this._drawLast.next = a),
            this._drawLast = a,
            this._drawFirst = this._drawFirst || this._drawLast
        },
        _addPath: function(a) {
            this._requestRedraw(a)
        },
        _removePath: function(d) {
            var b = d._order
              , a = b.next
              , c = b.prev;
            a ? a.prev = c : this._drawLast = c,
            c ? c.next = a : this._drawFirst = a,
            delete this._drawnLayers[d._leaflet_id],
            delete d._order,
            delete this._layers[co(d)],
            this._requestRedraw(d)
        },
        _updatePath: function(a) {
            this._extendRedrawBounds(a),
            a._project(),
            a._update(),
            this._requestRedraw(a)
        },
        _updateStyle: function(a) {
            this._updateDashArray(a),
            this._requestRedraw(a)
        },
        _updateDashArray: function(d) {
            if ("string" == typeof d.options.dashArray) {
                var b, a = d.options.dashArray.split(","), c = [];
                for (b = 0; b < a.length; b++) {
                    c.push(Number(a[b]))
                }
                d.options._dashArray = c
            } else {
                d.options._dashArray = d.options.dashArray
            }
        },
        _requestRedraw: function(a) {
            this._map && (this._extendRedrawBounds(a),
            this._redrawRequest = this._redrawRequest || a9(this._redraw, this))
        },
        _extendRedrawBounds: function(b) {
            if (b._pxBounds) {
                var a = (b.options.weight || 0) + 1;
                this._redrawBounds = this._redrawBounds || new cI,
                this._redrawBounds.extend(b._pxBounds.min.subtract([a, a])),
                this._redrawBounds.extend(b._pxBounds.max.add([a, a]))
            }
        },
        _redraw: function() {
            this._redrawRequest = null,
            this._redrawBounds && (this._redrawBounds.min._floor(),
            this._redrawBounds.max._ceil()),
            this._clear(),
            this._draw(),
            this._redrawBounds = null
        },
        _clear: function() {
            var b = this._redrawBounds;
            if (b) {
                var a = b.getSize();
                this._ctx.clearRect(b.min.x, b.min.y, a.x, a.y)
            } else {
                this._ctx.clearRect(0, 0, this._container.width, this._container.height)
            }
        },
        _draw: function() {
            var d, b = this._redrawBounds;
            if (this._ctx.save(),
            b) {
                var a = b.getSize();
                this._ctx.beginPath(),
                this._ctx.rect(b.min.x, b.min.y, a.x, a.y),
                this._ctx.clip()
            }
            this._drawing = !0;
            for (var c = this._drawFirst; c; c = c.next) {
                d = c.layer,
                (!b || d._pxBounds && d._pxBounds.intersects(b)) && d._updatePath()
            }
            this._drawing = !1,
            this._ctx.restore()
        },
        _updatePoly: function(m, f) {
            if (this._drawing) {
                var c, g, j, l, k = m._parts, b = k.length, d = this._ctx;
                if (b) {
                    for (this._drawnLayers[m._leaflet_id] = m,
                    d.beginPath(),
                    c = 0; c < b; c++) {
                        for (g = 0,
                        j = k[c].length; g < j; g++) {
                            l = k[c][g],
                            d[g ? "lineTo" : "moveTo"](l.x, l.y)
                        }
                        f && d.closePath()
                    }
                    this._fillStroke(d, m)
                }
            }
        },
        _updateCircle: function(f) {
            if (this._drawing && !f._empty()) {
                var b = f._point
                  , a = this._ctx
                  , c = Math.max(Math.round(f._radius), 1)
                  , d = (Math.max(Math.round(f._radiusY), 1) || c) / c;
                this._drawnLayers[f._leaflet_id] = f,
                1 !== d && (a.save(),
                a.scale(1, d)),
                a.beginPath(),
                a.arc(b.x, b.y / d, c, 0, 2 * Math.PI, !1),
                1 !== d && a.restore(),
                this._fillStroke(a, f)
            }
        },
        _fillStroke: function(c, b) {
            var a = b.options;
            a.fill && (c.globalAlpha = a.fillOpacity,
            c.fillStyle = a.fillColor || a.color,
            c.fill(a.fillRule || "evenodd")),
            a.stroke && 0 !== a.weight && (c.setLineDash && c.setLineDash(b.options && b.options._dashArray || []),
            c.globalAlpha = a.opacity,
            c.lineWidth = a.weight,
            c.strokeStyle = a.color,
            c.lineCap = a.lineCap,
            c.lineJoin = a.lineJoin,
            c.stroke())
        },
        _onClick: function(f) {
            for (var b, a, c = this._map.mouseEventToLayerPoint(f), d = this._drawFirst; d; d = d.next) {
                (b = d.layer).options.interactive && b._containsPoint(c) && !this._map._draggableMoved(b) && (a = b)
            }
            a && (er(f),
            this._fireEvent([a], f))
        },
        _onMouseMove: function(b) {
            if (this._map && !this._map.dragging.moving() && !this._map._animatingZoom) {
                var a = this._map.mouseEventToLayerPoint(b);
                this._handleMouseHover(b, a)
            }
        },
        _handleMouseOut: function(b) {
            var a = this._hoveredLayer;
            a && (dv(this._container, "leaflet-interactive"),
            this._fireEvent([a], b, "mouseout"),
            this._hoveredLayer = null)
        },
        _handleMouseHover: function(f, b) {
            for (var a, c, d = this._drawFirst; d; d = d.next) {
                (a = d.layer).options.interactive && a._containsPoint(b) && (c = a)
            }
            c !== this._hoveredLayer && (this._handleMouseOut(f),
            c && (cS(this._container, "leaflet-interactive"),
            this._fireEvent([c], f, "mouseover"),
            this._hoveredLayer = c)),
            this._hoveredLayer && this._fireEvent([this._hoveredLayer], f)
        },
        _fireEvent: function(c, b, a) {
            this._map._fireDOMEvent(b, a || b.type, c)
        },
        _bringToFront: function(d) {
            var b = d._order
              , a = b.next
              , c = b.prev;
            a && (a.prev = c,
            c ? c.next = a : a && (this._drawFirst = a),
            b.prev = this._drawLast,
            this._drawLast.next = b,
            b.next = null,
            this._drawLast = b,
            this._requestRedraw(d))
        },
        _bringToBack: function(d) {
            var b = d._order
              , a = b.next
              , c = b.prev;
            c && (c.next = a,
            a ? a.prev = c : c && (this._drawLast = c),
            b.prev = null,
            b.next = this._drawFirst,
            this._drawFirst.prev = b,
            this._drawFirst = b,
            this._requestRedraw(d))
        }
    })
      , ed = function() {
        try {
            return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
            function(b) {
                return document.createElement("<lvml:" + b + ' class="lvml">')
            }
        } catch (a) {
            return function(b) {
                return document.createElement("<" + b + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
            }
        }
    }()
      , d4 = {
        _initContainer: function() {
            this._container = bl("div", "leaflet-vml-container")
        },
        _update: function() {
            this._map._animatingZoom || (br.prototype._update.call(this),
            this.fire("update"))
        },
        _initPath: function(b) {
            var a = b._container = ed("shape");
            cS(a, "leaflet-vml-shape " + (this.options.className || "")),
            a.coordsize = "1 1",
            b._path = ed("path"),
            a.appendChild(b._path),
            this._updateStyle(b),
            this._layers[co(b)] = b
        },
        _addPath: function(b) {
            var a = b._container;
            this._container.appendChild(a),
            b.options.interactive && b.addInteractiveTarget(a)
        },
        _removePath: function(b) {
            var a = b._container;
            bV(a),
            b.removeInteractiveTarget(a),
            delete this._layers[co(b)]
        },
        _updateStyle: function(f) {
            var b = f._stroke
              , a = f._fill
              , c = f.options
              , d = f._container;
            d.stroked = !!c.stroke,
            d.filled = !!c.fill,
            c.stroke ? (b || (b = f._stroke = ed("stroke")),
            d.appendChild(b),
            b.weight = c.weight + "px",
            b.color = c.color,
            b.opacity = c.opacity,
            c.dashArray ? b.dashStyle = cC(c.dashArray) ? c.dashArray.join(" ") : c.dashArray.replace(/( *, *)/g, " ") : b.dashStyle = "",
            b.endcap = c.lineCap.replace("butt", "flat"),
            b.joinstyle = c.lineJoin) : b && (d.removeChild(b),
            f._stroke = null),
            c.fill ? (a || (a = f._fill = ed("fill")),
            d.appendChild(a),
            a.color = c.fillColor || c.color,
            a.opacity = c.fillOpacity) : a && (d.removeChild(a),
            f._fill = null)
        },
        _updateCircle: function(d) {
            var b = d._point.round()
              , a = Math.round(d._radius)
              , c = Math.round(d._radiusY || a);
            this._setPath(d, d._empty() ? "M0 0" : "AL " + b.x + "," + b.y + " " + a + "," + c + " 0,23592600")
        },
        _setPath: function(b, a) {
            b._path.v = a
        },
        _bringToFront: function(a) {
            dZ(a._container)
        },
        _bringToBack: function(a) {
            bN(a._container)
        }
    }
      , dV = ac ? ed : a0
      , cO = br.extend({
        getEvents: function() {
            var a = br.prototype.getEvents.call(this);
            return a.zoomstart = this._onZoomStart,
            a
        },
        _initContainer: function() {
            this._container = dV("svg"),
            this._container.setAttribute("pointer-events", "none"),
            this._rootGroup = dV("g"),
            this._container.appendChild(this._rootGroup)
        },
        _destroyContainer: function() {
            bV(this._container),
            bh(this._container),
            delete this._container,
            delete this._rootGroup,
            delete this._svgSize
        },
        _onZoomStart: function() {
            this._update()
        },
        _update: function() {
            if (!this._map._animatingZoom || !this._bounds) {
                br.prototype._update.call(this);
                var c = this._bounds
                  , b = c.getSize()
                  , a = this._container;
                this._svgSize && this._svgSize.equals(b) || (this._svgSize = b,
                a.setAttribute("width", b.x),
                a.setAttribute("height", b.y)),
                av(a, c.min),
                a.setAttribute("viewBox", [c.min.x, c.min.y, b.x, b.y].join(" ")),
                this.fire("update")
            }
        },
        _initPath: function(b) {
            var a = b._path = dV("path");
            b.options.className && cS(a, b.options.className),
            b.options.interactive && cS(a, "leaflet-interactive"),
            this._updateStyle(b),
            this._layers[co(b)] = b
        },
        _addPath: function(a) {
            this._rootGroup || this._initContainer(),
            this._rootGroup.appendChild(a._path),
            a.addInteractiveTarget(a._path)
        },
        _removePath: function(a) {
            bV(a._path),
            a.removeInteractiveTarget(a._path),
            delete this._layers[co(a)]
        },
        _updatePath: function(a) {
            a._project(),
            a._update()
        },
        _updateStyle: function(c) {
            var b = c._path
              , a = c.options;
            b && (a.stroke ? (b.setAttribute("stroke", a.color),
            b.setAttribute("stroke-opacity", a.opacity),
            b.setAttribute("stroke-width", a.weight),
            b.setAttribute("stroke-linecap", a.lineCap),
            b.setAttribute("stroke-linejoin", a.lineJoin),
            a.dashArray ? b.setAttribute("stroke-dasharray", a.dashArray) : b.removeAttribute("stroke-dasharray"),
            a.dashOffset ? b.setAttribute("stroke-dashoffset", a.dashOffset) : b.removeAttribute("stroke-dashoffset")) : b.setAttribute("stroke", "none"),
            a.fill ? (b.setAttribute("fill", a.fillColor || a.color),
            b.setAttribute("fill-opacity", a.fillOpacity),
            b.setAttribute("fill-rule", a.fillRule || "evenodd")) : b.setAttribute("fill", "none"))
        },
        _updatePoly: function(b, a) {
            this._setPath(b, bU(b._parts, a))
        },
        _updateCircle: function(f) {
            var b = f._point
              , a = Math.max(Math.round(f._radius), 1)
              , c = "a" + a + "," + (Math.max(Math.round(f._radiusY), 1) || a) + " 0 1,0 "
              , d = f._empty() ? "M0 0" : "M" + (b.x - a) + "," + b.y + c + 2 * a + ",0 " + c + 2 * -a + ",0 ";
            this._setPath(f, d)
        },
        _setPath: function(b, a) {
            b._path.setAttribute("d", a)
        },
        _bringToFront: function(a) {
            dZ(a._path)
        },
        _bringToBack: function(a) {
            bN(a._path)
        }
    });
    ac && cO.include(d4),
    az.include({
        getRenderer: function(b) {
            var a = b.options.renderer || this._getPaneRenderer(b.options.pane) || this.options.renderer || this._renderer;
            return a || (a = this._renderer = this._createRenderer()),
            this.hasLayer(a) || this.addLayer(a),
            a
        },
        _getPaneRenderer: function(b) {
            if ("overlayPane" === b || void 0 === b) {
                return !1
            }
            var a = this._paneRenderers[b];
            return void 0 === a && (a = this._createRenderer({
                pane: b
            }),
            this._paneRenderers[b] = a),
            a
        },
        _createRenderer: function(a) {
            return this.options.preferCanvas && ad(a) || cY(a)
        }
    });
    var b8 = cE.extend({
        initialize: function(b, a) {
            cE.prototype.initialize.call(this, this._boundsToLatLngs(b), a)
        },
        setBounds: function(a) {
            return this.setLatLngs(this._boundsToLatLngs(a))
        },
        _boundsToLatLngs: function(a) {
            return a = eh(a),
            [a.getSouthWest(), a.getNorthWest(), a.getNorthEast(), a.getSouthEast()]
        }
    });
    cO.create = dV,
    cO.pointsToPath = bU,
    df.geometryToLayer = bj,
    df.coordsToLatLng = dF,
    df.coordsToLatLngs = dO,
    df.latLngToCoords = cX,
    df.latLngsToCoords = bu,
    df.getFeature = b1,
    df.asFeature = eg,
    az.mergeOptions({
        boxZoom: !0
    });
    var aD = a2.extend({
        initialize: function(a) {
            this._map = a,
            this._container = a._container,
            this._pane = a._panes.overlayPane,
            this._resetStateTimeout = 0,
            a.on("unload", this._destroy, this)
        },
        addHooks: function() {
            cl(this._container, "mousedown", this._onMouseDown, this)
        },
        removeHooks: function() {
            bh(this._container, "mousedown", this._onMouseDown, this)
        },
        moved: function() {
            return this._moved
        },
        _destroy: function() {
            bV(this._pane),
            delete this._pane
        },
        _resetState: function() {
            this._resetStateTimeout = 0,
            this._moved = !1
        },
        _clearDeferredResetState: function() {
            0 !== this._resetStateTimeout && (clearTimeout(this._resetStateTimeout),
            this._resetStateTimeout = 0)
        },
        _onMouseDown: function(a) {
            if (!a.shiftKey || 1 !== a.which && 1 !== a.button) {
                return !1
            }
            this._clearDeferredResetState(),
            this._resetState(),
            bd(),
            dE(),
            this._startPoint = this._map.mouseEventToContainerPoint(a),
            cl(document, {
                contextmenu: ca,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this)
        },
        _onMouseMove: function(c) {
            this._moved || (this._moved = !0,
            this._box = bl("div", "leaflet-zoom-box", this._container),
            cS(this._container, "leaflet-crosshair"),
            this._map.fire("boxzoomstart")),
            this._point = this._map.mouseEventToContainerPoint(c);
            var b = new cI(this._point,this._startPoint)
              , a = b.getSize();
            av(this._box, b.min),
            this._box.style.width = a.x + "px",
            this._box.style.height = a.y + "px"
        },
        _finish: function() {
            this._moved && (bV(this._box),
            dv(this._container, "leaflet-crosshair")),
            bp(),
            b9(),
            bh(document, {
                contextmenu: ca,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this)
        },
        _onMouseUp: function(b) {
            if ((1 === b.which || 1 === b.button) && (this._finish(),
            this._moved)) {
                this._clearDeferredResetState(),
                this._resetStateTimeout = setTimeout(aZ(this._resetState, this), 0);
                var a = new dl(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));
                this._map.fitBounds(a).fire("boxzoomend", {
                    boxZoomBounds: a
                })
            }
        },
        _onKeyDown: function(a) {
            27 === a.keyCode && this._finish()
        }
    });
    az.addInitHook("addHandler", "boxZoom", aD),
    az.mergeOptions({
        doubleClickZoom: !0
    });
    var du = a2.extend({
        addHooks: function() {
            this._map.on("dblclick", this._onDoubleClick, this)
        },
        removeHooks: function() {
            this._map.off("dblclick", this._onDoubleClick, this)
        },
        _onDoubleClick: function(f) {
            var b = this._map
              , a = b.getZoom()
              , c = b.options.zoomDelta
              , d = f.originalEvent.shiftKey ? a - c : a + c;
            "center" === b.options.doubleClickZoom ? b.setZoom(d) : b.setZoomAround(f.containerPoint, d)
        }
    });
    az.addInitHook("addHandler", "doubleClickZoom", du),
    az.mergeOptions({
        dragging: !0,
        inertia: !ch,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        easeLinearity: 0.2,
        worldCopyJump: !1,
        maxBoundsViscosity: 0
    });
    var ep = a2.extend({
        addHooks: function() {
            if (!this._draggable) {
                var a = this._map;
                this._draggable = new c2(a._mapPane,a._container),
                this._draggable.on({
                    dragstart: this._onDragStart,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this),
                this._draggable.on("predrag", this._onPreDragLimit, this),
                a.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this),
                a.on("zoomend", this._onZoomEnd, this),
                a.whenReady(this._onZoomEnd, this))
            }
            cS(this._map._container, "leaflet-grab leaflet-touch-drag"),
            this._draggable.enable(),
            this._positions = [],
            this._times = []
        },
        removeHooks: function() {
            dv(this._map._container, "leaflet-grab"),
            dv(this._map._container, "leaflet-touch-drag"),
            this._draggable.disable()
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        moving: function() {
            return this._draggable && this._draggable._moving
        },
        _onDragStart: function() {
            var b = this._map;
            if (b._stop(),
            this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
                var a = eh(this._map.options.maxBounds);
                this._offsetLimit = ax(this._map.latLngToContainerPoint(a.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(a.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),
                this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity))
            } else {
                this._offsetLimit = null
            }
            b.fire("movestart").fire("dragstart"),
            b.options.inertia && (this._positions = [],
            this._times = [])
        },
        _onDrag: function(c) {
            if (this._map.options.inertia) {
                var b = this._lastTime = +new Date
                  , a = this._lastPos = this._draggable._absPos || this._draggable._newPos;
                this._positions.push(a),
                this._times.push(b),
                this._prunePositions(b)
            }
            this._map.fire("move", c).fire("drag", c)
        },
        _prunePositions: function(a) {
            for (; this._positions.length > 1 && a - this._times[0] > 50; ) {
                this._positions.shift(),
                this._times.shift()
            }
        },
        _onZoomEnd: function() {
            var b = this._map.getSize().divideBy(2)
              , a = this._map.latLngToLayerPoint([0, 0]);
            this._initialWorldOffset = a.subtract(b).x,
            this._worldWidth = this._map.getPixelWorldBounds().getSize().x
        },
        _viscousLimit: function(b, a) {
            return b - (b - a) * this._viscosity
        },
        _onPreDragLimit: function() {
            if (this._viscosity && this._offsetLimit) {
                var b = this._draggable._newPos.subtract(this._draggable._startPos)
                  , a = this._offsetLimit;
                b.x < a.min.x && (b.x = this._viscousLimit(b.x, a.min.x)),
                b.y < a.min.y && (b.y = this._viscousLimit(b.y, a.min.y)),
                b.x > a.max.x && (b.x = this._viscousLimit(b.x, a.max.x)),
                b.y > a.max.y && (b.y = this._viscousLimit(b.y, a.max.y)),
                this._draggable._newPos = this._draggable._startPos.add(b)
            }
        },
        _onPreDragWrap: function() {
            var h = this._worldWidth
              , b = Math.round(h / 2)
              , a = this._initialWorldOffset
              , c = this._draggable._newPos.x
              , d = (c - b + a) % h + b - a
              , g = (c + b + a) % h - b - a
              , f = Math.abs(d + a) < Math.abs(g + a) ? d : g;
            this._draggable._absPos = this._draggable._newPos.clone(),
            this._draggable._newPos.x = f
        },
        _onDragEnd: function(x) {
            var k = this._map
              , g = k.options
              , p = !g.inertia || this._times.length < 2;
            if (k.fire("dragend", x),
            p) {
                k.fire("moveend")
            } else {
                this._prunePositions(+new Date);
                var q = this._lastPos.subtract(this._positions[0])
                  , w = (this._lastTime - this._times[0]) / 1000
                  , v = g.easeLinearity
                  , d = q.multiplyBy(v / w)
                  , j = d.distanceTo([0, 0])
                  , y = Math.min(g.inertiaMaxSpeed, j)
                  , m = d.multiplyBy(y / j)
                  , f = y / (g.inertiaDeceleration * v)
                  , b = m.multiplyBy(-f / 2).round();
                b.x || b.y ? (b = k._limitOffset(b, k.options.maxBounds),
                a9(function() {
                    k.panBy(b, {
                        duration: f,
                        easeLinearity: v,
                        noMoveStart: !0,
                        animate: !0
                    })
                })) : k.fire("moveend")
            }
        }
    });
    az.addInitHook("addHandler", "dragging", ep),
    az.mergeOptions({
        keyboard: !0,
        keyboardPanDelta: 80
    });
    var ck = a2.extend({
        keyCodes: {
            left: [37],
            right: [39],
            down: [40],
            up: [38],
            zoomIn: [187, 107, 61, 171],
            zoomOut: [189, 109, 54, 173]
        },
        initialize: function(a) {
            this._map = a,
            this._setPanDelta(a.options.keyboardPanDelta),
            this._setZoomDelta(a.options.zoomDelta)
        },
        addHooks: function() {
            var a = this._map._container;
            a.tabIndex <= 0 && (a.tabIndex = "0"),
            cl(a, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this),
            this._map.on({
                focus: this._addHooks,
                blur: this._removeHooks
            }, this)
        },
        removeHooks: function() {
            this._removeHooks(),
            bh(this._map._container, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this),
            this._map.off({
                focus: this._addHooks,
                blur: this._removeHooks
            }, this)
        },
        _onMouseDown: function() {
            if (!this._focused) {
                var d = document.body
                  , b = document.documentElement
                  , a = d.scrollTop || b.scrollTop
                  , c = d.scrollLeft || b.scrollLeft;
                this._map._container.focus(),
                window.scrollTo(c, a)
            }
        },
        _onFocus: function() {
            this._focused = !0,
            this._map.fire("focus")
        },
        _onBlur: function() {
            this._focused = !1,
            this._map.fire("blur")
        },
        _setPanDelta: function(f) {
            var b, a, c = this._panKeys = {}, d = this.keyCodes;
            for (b = 0,
            a = d.left.length; b < a; b++) {
                c[d.left[b]] = [-1 * f, 0]
            }
            for (b = 0,
            a = d.right.length; b < a; b++) {
                c[d.right[b]] = [f, 0]
            }
            for (b = 0,
            a = d.down.length; b < a; b++) {
                c[d.down[b]] = [0, f]
            }
            for (b = 0,
            a = d.up.length; b < a; b++) {
                c[d.up[b]] = [0, -1 * f]
            }
        },
        _setZoomDelta: function(f) {
            var b, a, c = this._zoomKeys = {}, d = this.keyCodes;
            for (b = 0,
            a = d.zoomIn.length; b < a; b++) {
                c[d.zoomIn[b]] = f
            }
            for (b = 0,
            a = d.zoomOut.length; b < a; b++) {
                c[d.zoomOut[b]] = -f
            }
        },
        _addHooks: function() {
            cl(document, "keydown", this._onKeyDown, this)
        },
        _removeHooks: function() {
            bh(document, "keydown", this._onKeyDown, this)
        },
        _onKeyDown: function(d) {
            if (!(d.altKey || d.ctrlKey || d.metaKey)) {
                var b, a = d.keyCode, c = this._map;
                if (a in this._panKeys) {
                    c._panAnim && c._panAnim._inProgress || (b = this._panKeys[a],
                    d.shiftKey && (b = dP(b).multiplyBy(3)),
                    c.panBy(b),
                    c.options.maxBounds && c.panInsideBounds(c.options.maxBounds))
                } else {
                    if (a in this._zoomKeys) {
                        c.setZoom(c.getZoom() + (d.shiftKey ? 3 : 1) * this._zoomKeys[a])
                    } else {
                        if (27 !== a || !c._popup || !c._popup.options.closeOnEscapeKey) {
                            return
                        }
                        c.closePopup()
                    }
                }
                ca(d)
            }
        }
    });
    az.addInitHook("addHandler", "keyboard", ck),
    az.mergeOptions({
        scrollWheelZoom: !0,
        wheelDebounceTime: 40,
        wheelPxPerZoomLevel: 60
    });
    var aN = a2.extend({
        addHooks: function() {
            cl(this._map._container, "mousewheel", this._onWheelScroll, this),
            this._delta = 0
        },
        removeHooks: function() {
            bh(this._map._container, "mousewheel", this._onWheelScroll, this)
        },
        _onWheelScroll: function(d) {
            var a = dw(d)
              , b = this._map.options.wheelDebounceTime;
            this._delta += a,
            this._lastMousePos = this._map.mouseEventToContainerPoint(d),
            this._startTime || (this._startTime = +new Date);
            var c = Math.max(b - (+new Date - this._startTime), 0);
            clearTimeout(this._timer),
            this._timer = setTimeout(aZ(this._performZoom, this), c),
            ca(d)
        },
        _performZoom: function() {
            var h = this._map
              , b = h.getZoom()
              , a = this._map.options.zoomSnap || 0;
            h._stop();
            var c = this._delta / (4 * this._map.options.wheelPxPerZoomLevel)
              , d = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(c)))) / Math.LN2
              , g = a ? Math.ceil(d / a) * a : d
              , f = h._limitZoom(b + (this._delta > 0 ? g : -g)) - b;
            this._delta = 0,
            this._startTime = null,
            f && ("center" === h.options.scrollWheelZoom ? h.setZoom(b + f) : h.setZoomAround(this._lastMousePos, b + f))
        }
    });
    az.addInitHook("addHandler", "scrollWheelZoom", aN),
    az.mergeOptions({
        tap: !0,
        tapTolerance: 15
    });
    var dg = a2.extend({
        addHooks: function() {
            cl(this._map._container, "touchstart", this._onDown, this)
        },
        removeHooks: function() {
            bh(this._map._container, "touchstart", this._onDown, this)
        },
        _onDown: function(c) {
            if (c.touches) {
                if (cQ(c),
                this._fireClick = !0,
                c.touches.length > 1) {
                    return this._fireClick = !1,
                    void clearTimeout(this._holdTimeout)
                }
                var a = c.touches[0]
                  , b = a.target;
                this._startPos = this._newPos = new dY(a.clientX,a.clientY),
                b.tagName && "a" === b.tagName.toLowerCase() && cS(b, "leaflet-active"),
                this._holdTimeout = setTimeout(aZ(function() {
                    this._isTapValid() && (this._fireClick = !1,
                    this._onUp(),
                    this._simulateEvent("contextmenu", a))
                }, this), 1000),
                this._simulateEvent("mousedown", a),
                cl(document, {
                    touchmove: this._onMove,
                    touchend: this._onUp
                }, this)
            }
        },
        _onUp: function(c) {
            if (clearTimeout(this._holdTimeout),
            bh(document, {
                touchmove: this._onMove,
                touchend: this._onUp
            }, this),
            this._fireClick && c && c.changedTouches) {
                var b = c.changedTouches[0]
                  , a = b.target;
                a && a.tagName && "a" === a.tagName.toLowerCase() && dv(a, "leaflet-active"),
                this._simulateEvent("mouseup", b),
                this._isTapValid() && this._simulateEvent("click", b)
            }
        },
        _isTapValid: function() {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
        },
        _onMove: function(b) {
            var a = b.touches[0];
            this._newPos = new dY(a.clientX,a.clientY),
            this._simulateEvent("mousemove", a)
        },
        _simulateEvent: function(c, b) {
            var a = document.createEvent("MouseEvents");
            a._simulated = !0,
            b.target._simulatedClick = !0,
            a.initMouseEvent(c, !0, !0, window, 1, b.screenX, b.screenY, b.clientX, b.clientY, !1, !1, !1, !1, 0, null),
            b.target.dispatchEvent(a)
        }
    });
    cV && !dL && az.addInitHook("addHandler", "tap", dg),
    az.mergeOptions({
        touchZoom: cV && !ch,
        bounceAtZoomLimits: !0
    });
    var eq = a2.extend({
        addHooks: function() {
            cS(this._map._container, "leaflet-touch-zoom"),
            cl(this._map._container, "touchstart", this._onTouchStart, this)
        },
        removeHooks: function() {
            dv(this._map._container, "leaflet-touch-zoom"),
            bh(this._map._container, "touchstart", this._onTouchStart, this)
        },
        _onTouchStart: function(d) {
            var b = this._map;
            if (d.touches && 2 === d.touches.length && !b._animatingZoom && !this._zooming) {
                var a = b.mouseEventToContainerPoint(d.touches[0])
                  , c = b.mouseEventToContainerPoint(d.touches[1]);
                this._centerPoint = b.getSize()._divideBy(2),
                this._startLatLng = b.containerPointToLatLng(this._centerPoint),
                "center" !== b.options.touchZoom && (this._pinchStartLatLng = b.containerPointToLatLng(a.add(c)._divideBy(2))),
                this._startDist = a.distanceTo(c),
                this._startZoom = b.getZoom(),
                this._moved = !1,
                this._zooming = !0,
                b._stop(),
                cl(document, "touchmove", this._onTouchMove, this),
                cl(document, "touchend", this._onTouchEnd, this),
                cQ(d)
            }
        },
        _onTouchMove: function(h) {
            if (h.touches && 2 === h.touches.length && this._zooming) {
                var c = this._map
                  , d = c.mouseEventToContainerPoint(h.touches[0])
                  , e = c.mouseEventToContainerPoint(h.touches[1])
                  , g = d.distanceTo(e) / this._startDist;
                if (this._zoom = c.getScaleZoom(g, this._startZoom),
                !c.options.bounceAtZoomLimits && (this._zoom < c.getMinZoom() && g < 1 || this._zoom > c.getMaxZoom() && g > 1) && (this._zoom = c._limitZoom(this._zoom)),
                "center" === c.options.touchZoom) {
                    if (this._center = this._startLatLng,
                    1 === g) {
                        return
                    }
                } else {
                    var f = d._add(e)._divideBy(2)._subtract(this._centerPoint);
                    if (1 === g && 0 === f.x && 0 === f.y) {
                        return
                    }
                    this._center = c.unproject(c.project(this._pinchStartLatLng, this._zoom).subtract(f), this._zoom)
                }
                this._moved || (c._moveStart(!0, !1),
                this._moved = !0),
                bk(this._animRequest);
                var b = aZ(c._move, c, this._center, this._zoom, {
                    pinch: !0,
                    round: !1
                });
                this._animRequest = a9(b, this, !0),
                cQ(h)
            }
        },
        _onTouchEnd: function() {
            this._moved && this._zooming ? (this._zooming = !1,
            bk(this._animRequest),
            bh(document, "touchmove", this._onTouchMove),
            bh(document, "touchend", this._onTouchEnd),
            this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom))) : this._zooming = !1
        }
    });
    az.addInitHook("addHandler", "touchZoom", eq),
    az.BoxZoom = aD,
    az.DoubleClickZoom = du,
    az.Drag = ep,
    az.Keyboard = ck,
    az.ScrollWheelZoom = aN,
    az.Tap = dg,
    az.TouchZoom = eq,
    Object.freeze = dq,
    dk.version = "1.3.3+HEAD.b22aef4",
    dk.Control = dp,
    dk.control = ek,
    dk.Browser = cW,
    dk.Evented = aK,
    dk.Mixin = ap,
    dk.Util = dB,
    dk.Class = dG,
    dk.Handler = a2,
    dk.extend = bE,
    dk.bind = aZ,
    dk.stamp = co,
    dk.setOptions = b2,
    dk.DomEvent = cK,
    dk.DomUtil = dI,
    dk.PosAnimation = b4,
    dk.Draggable = c2,
    dk.LineUtil = cr,
    dk.PolyUtil = aT,
    dk.Point = dY,
    dk.point = dP,
    dk.Bounds = cI,
    dk.bounds = ax,
    dk.Transformation = c9,
    dk.transformation = ej,
    dk.Projection = by,
    dk.LatLng = cc,
    dk.latLng = aH,
    dk.LatLngBounds = dl,
    dk.latLngBounds = eh,
    dk.CRS = aU,
    dk.GeoJSON = df,
    dk.geoJSON = d6,
    dk.geoJson = au,
    dk.Layer = cT,
    dk.LayerGroup = bo,
    dk.layerGroup = function(b, a) {
        return new bo(b,a)
    }
    ,
    dk.FeatureGroup = bX,
    dk.featureGroup = function(a) {
        return new bX(a)
    }
    ,
    dk.ImageOverlay = bB,
    dk.imageOverlay = function(c, b, a) {
        return new bB(c,b,a)
    }
    ,
    dk.VideoOverlay = dD,
    dk.videoOverlay = function(c, b, a) {
        return new dD(c,b,a)
    }
    ,
    dk.DivOverlay = b7,
    dk.Popup = aM,
    dk.popup = function(b, a) {
        return new aM(b,a)
    }
    ,
    dk.Tooltip = aj,
    dk.tooltip = function(b, a) {
        return new aj(b,a)
    }
    ,
    dk.Icon = ea,
    dk.icon = function(a) {
        return new ea(a)
    }
    ,
    dk.DivIcon = aW,
    dk.divIcon = function(a) {
        return new aW(a)
    }
    ,
    dk.Marker = ab,
    dk.marker = function(b, a) {
        return new ab(b,a)
    }
    ,
    dk.TileLayer = cj,
    dk.tileLayer = bT,
    dk.GridLayer = cN,
    dk.gridLayer = function(a) {
        return new cN(a)
    }
    ,
    dk.SVG = cO,
    dk.svg = cY,
    dk.Renderer = br,
    dk.Canvas = dM,
    dk.canvas = ad,
    dk.Path = cU,
    dk.CircleMarker = ds,
    dk.circleMarker = function(b, a) {
        return new ds(b,a)
    }
    ,
    dk.Circle = a5,
    dk.circle = function(c, b, a) {
        return new a5(c,b,a)
    }
    ,
    dk.Polyline = cv,
    dk.polyline = function(b, a) {
        return new cv(b,a)
    }
    ,
    dk.Polygon = cE,
    dk.polygon = function(b, a) {
        return new cE(b,a)
    }
    ,
    dk.Rectangle = b8,
    dk.rectangle = function(b, a) {
        return new b8(b,a)
    }
    ,
    dk.Map = az,
    dk.map = function(b, a) {
        return new az(b,a)
    }
    ;
    var a6 = window.L;
    dk.noConflict = function() {
        return window.L = a6,
        this
    }
    ,
    window.L = dk
});
(function(b, a) {
    L.drawVersion = "0.2.3-dev",
    L.drawLocal = {
        draw: {
            toolbar: {
                actions: {
                    title: "Cancel drawing",
                    text: "Cancel"
                },
                buttons: {
                    polyline: "Draw a polyline",
                    polygon: "Draw a polygon",
                    rectangle: "Draw a rectangle",
                    circle: "Draw a circle",
                    marker: "Draw a marker"
                }
            },
            handlers: {
                circle: {
                    tooltip: {
                        start: "Click and drag to draw circle."
                    }
                },
                marker: {
                    tooltip: {
                        start: "Click map to place marker."
                    }
                },
                polygon: {
                    tooltip: {
                        start: "Click to start drawing shape.",
                        cont: "Click to continue drawing shape.",
                        end: "Click first point to close this shape."
                    }
                },
                polyline: {
                    error: "<strong>Error:</strong> shape edges cannot cross!",
                    tooltip: {
                        start: "Click to start drawing line.",
                        cont: "Click to continue drawing line.",
                        end: "Click last point to finish line."
                    }
                },
                rectangle: {
                    tooltip: {
                        start: "Click and drag to draw rectangle."
                    }
                },
                simpleshape: {
                    tooltip: {
                        end: "Release mouse to finish drawing."
                    }
                }
            }
        },
        edit: {
            toolbar: {
                actions: {
                    save: {
                        title: "Save changes.",
                        text: "Save"
                    },
                    cancel: {
                        title: "Cancel editing, discards all changes.",
                        text: "Cancel"
                    }
                },
                buttons: {
                    edit: "Edit layers.",
                    editDisabled: "No layers to edit.",
                    remove: "Delete layers.",
                    removeDisabled: "No layers to delete."
                }
            },
            handlers: {
                edit: {
                    tooltip: {
                        text: "Drag handles, or marker to edit feature.",
                        subtext: "Click cancel to undo changes."
                    }
                },
                remove: {
                    tooltip: {
                        text: "Click on a feature to remove"
                    }
                }
            }
        }
    },
    L.Draw = {},
    L.Draw.Feature = L.Handler.extend({
        includes: L.Mixin.Events,
        initialize: function(d, c) {
            this._map = d,
            this._container = d._container,
            this._overlayPane = d._panes.overlayPane,
            this._popupPane = d._panes.popupPane,
            c && c.shapeOptions && (c.shapeOptions = L.Util.extend({}, this.options.shapeOptions, c.shapeOptions)),
            L.Util.extend(this.options, c)
        },
        enable: function() {
            this._enabled || (L.Handler.prototype.enable.call(this),
            this.fire("enabled", {
                handler: this.type
            }),
            this._map.fire("draw:drawstart", {
                layerType: this.type
            }))
        },
        disable: function() {
            this._enabled && (L.Handler.prototype.disable.call(this),
            this.fire("disabled", {
                handler: this.type
            }),
            this._map.fire("draw:drawstop", {
                layerType: this.type
            }))
        },
        addHooks: function() {
            var c = this._map;
            c && (L.DomUtil.disableTextSelection(),
            c.getContainer().focus(),
            this._tooltip = new L.Tooltip(this._map),
            L.DomEvent.addListener(this._container, "keyup", this._cancelDrawing, this))
        },
        removeHooks: function() {
            this._map && (L.DomUtil.enableTextSelection(),
            this._tooltip.dispose(),
            this._tooltip = null,
            L.DomEvent.removeListener(this._container, "keyup", this._cancelDrawing))
        },
        setOptions: function(c) {
            L.setOptions(this, c)
        },
        _fireCreatedEvent: function(c) {
            this._map.fire("draw:created", {
                layer: c,
                layerType: this.type
            })
        },
        _cancelDrawing: function(c) {
            27 === c.keyCode && this.disable()
        }
    }),
    L.Draw.Polyline = L.Draw.Feature.extend({
        statics: {
            TYPE: "polyline"
        },
        Poly: L.Polyline,
        options: {
            allowIntersection: !0,
            repeatMode: !1,
            drawError: {
                color: "#b00b00",
                timeout: 2500
            },
            icon: new L.DivIcon({
                iconSize: new L.Point(8,8),
                className: "leaflet-div-icon leaflet-editing-icon"
            }),
            guidelineDistance: 20,
            shapeOptions: {
                stroke: !0,
                color: "#f06eaa",
                weight: 4,
                opacity: 0.5,
                fill: !1,
                clickable: !0
            },
            metric: !0,
            showLength: !0,
            zIndexOffset: 2000
        },
        initialize: function(d, c) {
            this.options.drawError.message = L.drawLocal.draw.handlers.polyline.error,
            c && c.drawError && (c.drawError = L.Util.extend({}, this.options.drawError, c.drawError)),
            this.type = L.Draw.Polyline.TYPE,
            L.Draw.Feature.prototype.initialize.call(this, d, c)
        },
        addHooks: function() {
            L.Draw.Feature.prototype.addHooks.call(this),
            this._map && (this._markers = [],
            this._markerGroup = new L.LayerGroup,
            this._map.addLayer(this._markerGroup),
            this._poly = new L.Polyline([],this.options.shapeOptions),
            this._tooltip.updateContent(this._getTooltipText()),
            this._mouseMarker || (this._mouseMarker = L.marker(this._map.getCenter(), {
                icon: L.divIcon({
                    className: "leaflet-mouse-marker",
                    iconAnchor: [20, 20],
                    iconSize: [40, 40]
                }),
                opacity: 0,
                zIndexOffset: this.options.zIndexOffset
            })),
            this._mouseMarker.on("click", this._onClick, this).addTo(this._map),
            this._map.on("mousemove", this._onMouseMove, this).on("zoomend", this._onZoomEnd, this))
        },
        removeHooks: function() {
            L.Draw.Feature.prototype.removeHooks.call(this),
            this._clearHideErrorTimeout(),
            this._cleanUpShape(),
            this._map.removeLayer(this._markerGroup),
            delete this._markerGroup,
            delete this._markers,
            this._map.removeLayer(this._poly),
            delete this._poly,
            this._mouseMarker.off("click", this._onClick, this),
            this._map.removeLayer(this._mouseMarker),
            delete this._mouseMarker,
            this._clearGuides(),
            this._map.off("mousemove", this._onMouseMove, this).off("zoomend", this._onZoomEnd, this)
        },
        _finishShape: function() {
            var c = this._poly.newLatLngIntersects(this._poly.getLatLngs()[0], !0);
            return !this.options.allowIntersection && c || !this._shapeIsValid() ? (this._showErrorTooltip(),
            undefined) : (this._fireCreatedEvent(),
            this.disable(),
            this.options.repeatMode && this.enable(),
            undefined)
        },
        _shapeIsValid: function() {
            return !0
        },
        _onZoomEnd: function() {
            this._updateGuide()
        },
        _onMouseMove: function(f) {
            var c = f.layerPoint
              , d = f.latlng;
            this._currentLatLng = d,
            this._updateTooltip(d),
            this._updateGuide(c),
            this._mouseMarker.setLatLng(d),
            L.DomEvent.preventDefault(f.originalEvent)
        },
        _onClick: function(f) {
            var c = f.target.getLatLng()
              , d = this._markers.length;
            return d > 0 && !this.options.allowIntersection && this._poly.newLatLngIntersects(c) ? (this._showErrorTooltip(),
            undefined) : (this._errorShown && this._hideErrorTooltip(),
            this._markers.push(this._createMarker(c)),
            this._poly.addLatLng(c),
            2 === this._poly.getLatLngs().length && this._map.addLayer(this._poly),
            this._updateFinishHandler(),
            this._vertexAdded(c),
            this._clearGuides(),
            this._updateTooltip(),
            undefined)
        },
        _updateFinishHandler: function() {
            var c = this._markers.length;
            c > 1 && this._markers[c - 1].on("click", this._finishShape, this),
            c > 2 && this._markers[c - 2].off("click", this._finishShape, this)
        },
        _createMarker: function(d) {
            var c = new L.Marker(d,{
                icon: this.options.icon,
                zIndexOffset: 2 * this.options.zIndexOffset
            });
            return this._markerGroup.addLayer(c),
            c
        },
        _updateGuide: function(d) {
            var c = this._markers.length;
            c > 0 && (d = d || this._map.latLngToLayerPoint(this._currentLatLng),
            this._clearGuides(),
            this._drawGuide(this._map.latLngToLayerPoint(this._markers[c - 1].getLatLng()), d))
        },
        _updateTooltip: function(d) {
            var c = this._getTooltipText();
            d && this._tooltip.updatePosition(d),
            this._errorShown || this._tooltip.updateContent(c)
        },
        _drawGuide: function(k, d) {
            var f, g, c, j, h = Math.floor(Math.sqrt(Math.pow(d.x - k.x, 2) + Math.pow(d.y - k.y, 2)));
            for (this._guidesContainer || (this._guidesContainer = L.DomUtil.create("div", "leaflet-draw-guides", this._overlayPane)),
            f = this.options.guidelineDistance; h > f; f += this.options.guidelineDistance) {
                g = f / h,
                c = {
                    x: Math.floor(k.x * (1 - g) + g * d.x),
                    y: Math.floor(k.y * (1 - g) + g * d.y)
                },
                j = L.DomUtil.create("div", "leaflet-draw-guide-dash", this._guidesContainer),
                j.style.backgroundColor = this._errorShown ? this.options.drawError.color : this.options.shapeOptions.color,
                L.DomUtil.setPosition(j, c)
            }
        },
        _updateGuideColor: function(f) {
            if (this._guidesContainer) {
                for (var c = 0, d = this._guidesContainer.childNodes.length; d > c; c++) {
                    this._guidesContainer.childNodes[c].style.backgroundColor = f
                }
            }
        },
        _clearGuides: function() {
            if (this._guidesContainer) {
                for (; this._guidesContainer.firstChild; ) {
                    this._guidesContainer.removeChild(this._guidesContainer.firstChild)
                }
            }
        },
        _getTooltipText: function() {
            var f, c, d = this.options.showLength;
            return 0 === this._markers.length ? f = {
                text: L.drawLocal.draw.handlers.polyline.tooltip.start
            } : (c = d ? this._getMeasurementString() : "",
            f = 1 === this._markers.length ? {
                text: L.drawLocal.draw.handlers.polyline.tooltip.cont,
                subtext: c
            } : {
                text: L.drawLocal.draw.handlers.polyline.tooltip.end,
                subtext: c
            }),
            f
        },
        _getMeasurementString: function() {
            var f, c = this._currentLatLng, d = this._markers[this._markers.length - 1].getLatLng();
            return f = this._measurementRunningTotal + c.distanceTo(d),
            L.GeometryUtil.readableDistance(f, this.options.metric)
        },
        _showErrorTooltip: function() {
            this._errorShown = !0,
            this._tooltip.showAsError().updateContent({
                text: this.options.drawError.message
            }),
            this._updateGuideColor(this.options.drawError.color),
            this._poly.setStyle({
                color: this.options.drawError.color
            }),
            this._clearHideErrorTimeout(),
            this._hideErrorTimeout = setTimeout(L.Util.bind(this._hideErrorTooltip, this), this.options.drawError.timeout)
        },
        _hideErrorTooltip: function() {
            this._errorShown = !1,
            this._clearHideErrorTimeout(),
            this._tooltip.removeError().updateContent(this._getTooltipText()),
            this._updateGuideColor(this.options.shapeOptions.color),
            this._poly.setStyle({
                color: this.options.shapeOptions.color
            })
        },
        _clearHideErrorTimeout: function() {
            this._hideErrorTimeout && (clearTimeout(this._hideErrorTimeout),
            this._hideErrorTimeout = null)
        },
        _vertexAdded: function(c) {
            1 === this._markers.length ? this._measurementRunningTotal = 0 : this._measurementRunningTotal += c.distanceTo(this._markers[this._markers.length - 2].getLatLng())
        },
        _cleanUpShape: function() {
            this._markers.length > 1 && this._markers[this._markers.length - 1].off("click", this._finishShape, this)
        },
        _fireCreatedEvent: function() {
            var c = new this.Poly(this._poly.getLatLngs(),this.options.shapeOptions);
            L.Draw.Feature.prototype._fireCreatedEvent.call(this, c)
        }
    }),
    L.Draw.Polygon = L.Draw.Polyline.extend({
        statics: {
            TYPE: "polygon"
        },
        Poly: L.Polygon,
        options: {
            showArea: !1,
            shapeOptions: {
                stroke: !0,
                color: "#f06eaa",
                weight: 4,
                opacity: 0.5,
                fill: !0,
                fillColor: null,
                fillOpacity: 0.2,
                clickable: !0
            }
        },
        initialize: function(d, c) {
            L.Draw.Polyline.prototype.initialize.call(this, d, c),
            this.type = L.Draw.Polygon.TYPE
        },
        _updateFinishHandler: function() {
            var c = this._markers.length;
            1 === c && this._markers[0].on("click", this._finishShape, this),
            c > 2 && (this._markers[c - 1].on("dblclick", this._finishShape, this),
            c > 3 && this._markers[c - 2].off("dblclick", this._finishShape, this))
        },
        _getTooltipText: function() {
            var d, c;
            return 0 === this._markers.length ? d = L.drawLocal.draw.handlers.polygon.tooltip.start : 3 > this._markers.length ? d = L.drawLocal.draw.handlers.polygon.tooltip.cont : (d = L.drawLocal.draw.handlers.polygon.tooltip.end,
            c = this._getMeasurementString()),
            {
                text: d,
                subtext: c
            }
        },
        _getMeasurementString: function() {
            var c = this._area;
            return c ? L.GeometryUtil.readableArea(c, this.options.metric) : null
        },
        _shapeIsValid: function() {
            return this._markers.length >= 3
        },
        _vertexAdded: function() {
            if (!this.options.allowIntersection && this.options.showArea) {
                var c = this._poly.getLatLngs();
                this._area = L.GeometryUtil.geodesicArea(c)
            }
        },
        _cleanUpShape: function() {
            var c = this._markers.length;
            c > 0 && (this._markers[0].off("click", this._finishShape, this),
            c > 2 && this._markers[c - 1].off("dblclick", this._finishShape, this))
        }
    }),
    L.SimpleShape = {},
    L.Draw.SimpleShape = L.Draw.Feature.extend({
        options: {
            repeatMode: !1
        },
        initialize: function(d, c) {
            this._endLabelText = L.drawLocal.draw.handlers.simpleshape.tooltip.end,
            L.Draw.Feature.prototype.initialize.call(this, d, c)
        },
        addHooks: function() {
            L.Draw.Feature.prototype.addHooks.call(this),
            this._map && (this._map.dragging.disable(),
            this._container.style.cursor = "crosshair",
            this._tooltip.updateContent({
                text: this._initialLabelText
            }),
            this._map.on("mousedown", this._onMouseDown, this).on("mousemove", this._onMouseMove, this))
        },
        removeHooks: function() {
            L.Draw.Feature.prototype.removeHooks.call(this),
            this._map && (this._map.dragging.enable(),
            this._container.style.cursor = "",
            this._map.off("mousedown", this._onMouseDown, this).off("mousemove", this._onMouseMove, this),
            L.DomEvent.off(a, "mouseup", this._onMouseUp),
            this._shape && (this._map.removeLayer(this._shape),
            delete this._shape)),
            this._isDrawing = !1
        },
        _onMouseDown: function(c) {
            this._isDrawing = !0,
            this._startLatLng = c.latlng,
            L.DomEvent.on(a, "mouseup", this._onMouseUp, this).preventDefault(c.originalEvent)
        },
        _onMouseMove: function(d) {
            var c = d.latlng;
            this._tooltip.updatePosition(c),
            this._isDrawing && (this._tooltip.updateContent({
                text: this._endLabelText
            }),
            this._drawShape(c))
        },
        _onMouseUp: function() {
            this._shape && this._fireCreatedEvent(),
            this.disable(),
            this.options.repeatMode && this.enable()
        }
    }),
    L.Draw.Rectangle = L.Draw.SimpleShape.extend({
        statics: {
            TYPE: "rectangle"
        },
        options: {
            shapeOptions: {
                stroke: !0,
                color: "#f06eaa",
                weight: 4,
                opacity: 0.5,
                fill: !0,
                fillColor: null,
                fillOpacity: 0.2,
                clickable: !0
            }
        },
        initialize: function(d, c) {
            this.type = L.Draw.Rectangle.TYPE,
            this._initialLabelText = L.drawLocal.draw.handlers.rectangle.tooltip.start,
            L.Draw.SimpleShape.prototype.initialize.call(this, d, c)
        },
        _drawShape: function(c) {
            this._shape ? this._shape.setBounds(new L.LatLngBounds(this._startLatLng,c)) : (this._shape = new L.Rectangle(new L.LatLngBounds(this._startLatLng,c),this.options.shapeOptions),
            this._map.addLayer(this._shape))
        },
        _fireCreatedEvent: function() {
            var c = new L.Rectangle(this._shape.getBounds(),this.options.shapeOptions);
            L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, c)
        }
    }),
    L.Draw.Circle = L.Draw.SimpleShape.extend({
        statics: {
            TYPE: "circle"
        },
        options: {
            shapeOptions: {
                stroke: !0,
                color: "#f06eaa",
                weight: 4,
                opacity: 0.5,
                fill: !0,
                fillColor: null,
                fillOpacity: 0.2,
                clickable: !0
            },
            showRadius: !0,
            metric: !0
        },
        initialize: function(d, c) {
            this.type = L.Draw.Circle.TYPE,
            this._initialLabelText = L.drawLocal.draw.handlers.circle.tooltip.start,
            L.Draw.SimpleShape.prototype.initialize.call(this, d, c)
        },
        _drawShape: function(c) {
            this._shape ? this._shape.setRadius(this._startLatLng.distanceTo(c)) : (this._shape = new L.Circle(this._startLatLng,this._startLatLng.distanceTo(c),this.options.shapeOptions),
            this._map.addLayer(this._shape))
        },
        _fireCreatedEvent: function() {
            var c = new L.Circle(this._startLatLng,this._shape.getRadius(),this.options.shapeOptions);
            L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, c)
        },
        _onMouseMove: function(h) {
            var d, f = h.latlng, g = (this.options.metric,
            this.options.showRadius), c = this.options.metric;
            this._tooltip.updatePosition(f),
            this._isDrawing && (this._drawShape(f),
            d = this._shape.getRadius().toFixed(1),
            this._tooltip.updateContent({
                text: this._endLabelText,
                subtext: g ? "Radius: " + L.GeometryUtil.readableDistance(d, c) : ""
            }))
        }
    }),
    L.Draw.Marker = L.Draw.Feature.extend({
        statics: {
            TYPE: "marker"
        },
        options: {
            icon: new L.Icon.Default,
            repeatMode: !1,
            zIndexOffset: 2000
        },
        initialize: function(d, c) {
            this.type = L.Draw.Marker.TYPE,
            L.Draw.Feature.prototype.initialize.call(this, d, c)
        },
        addHooks: function() {
            L.Draw.Feature.prototype.addHooks.call(this),
            this._map && (this._tooltip.updateContent({
                text: L.drawLocal.draw.handlers.marker.tooltip.start
            }),
            this._mouseMarker || (this._mouseMarker = L.marker(this._map.getCenter(), {
                icon: L.divIcon({
                    className: "leaflet-mouse-marker",
                    iconAnchor: [20, 20],
                    iconSize: [40, 40]
                }),
                opacity: 0,
                zIndexOffset: this.options.zIndexOffset
            })),
            this._mouseMarker.on("click", this._onClick, this).addTo(this._map),
            this._map.on("mousemove", this._onMouseMove, this))
        },
        removeHooks: function() {
            L.Draw.Feature.prototype.removeHooks.call(this),
            this._map && (this._marker && (this._marker.off("click", this._onClick, this),
            this._map.off("click", this._onClick, this).removeLayer(this._marker),
            delete this._marker),
            this._mouseMarker.off("click", this._onClick, this),
            this._map.removeLayer(this._mouseMarker),
            delete this._mouseMarker,
            this._map.off("mousemove", this._onMouseMove, this))
        },
        _onMouseMove: function(d) {
            var c = d.latlng;
            this._tooltip.updatePosition(c),
            this._mouseMarker.setLatLng(c),
            this._marker ? this._marker.setLatLng(c) : (this._marker = new L.Marker(c,{
                icon: this.options.icon,
                zIndexOffset: this.options.zIndexOffset
            }),
            this._marker.on("click", this._onClick, this),
            this._map.on("click", this._onClick, this).addLayer(this._marker))
        },
        _onClick: function() {
            this._fireCreatedEvent(),
            this.disable(),
            this.options.repeatMode && this.enable()
        },
        _fireCreatedEvent: function() {
            var c = new L.Marker(this._marker.getLatLng(),{
                icon: this.options.icon
            });
            L.Draw.Feature.prototype._fireCreatedEvent.call(this, c)
        }
    }),
    L.Edit = L.Edit || {},
    L.Edit.Poly = L.Handler.extend({
        options: {
            icon: new L.DivIcon({
                iconSize: new L.Point(8,8),
                className: "leaflet-div-icon leaflet-editing-icon"
            })
        },
        initialize: function(d, c) {
            this._poly = d,
            L.setOptions(this, c)
        },
        addHooks: function() {
            this._poly._map && (this._markerGroup || this._initMarkers(),
            this._poly._map.addLayer(this._markerGroup))
        },
        removeHooks: function() {
            this._poly._map && (this._poly._map.removeLayer(this._markerGroup),
            delete this._markerGroup,
            delete this._markers)
        },
        updateMarkers: function() {
            this._markerGroup.clearLayers(),
            this._initMarkers()
        },
        _initMarkers: function() {
            this._markerGroup || (this._markerGroup = new L.LayerGroup),
            this._markers = [];
            var k, d, f, g, c = this._poly._latlngs;
            for (k = 0,
            f = c.length; f > k; k++) {
                g = this._createMarker(c[k], k),
                g.on("click", this._onMarkerClick, this),
                this._markers.push(g)
            }
            var j, h;
            for (k = 0,
            d = f - 1; f > k; d = k++) {
                (0 !== k || L.Polygon && this._poly instanceof L.Polygon) && (j = this._markers[d],
                h = this._markers[k],
                this._createMiddleMarker(j, h),
                this._updatePrevNext(j, h))
            }
        },
        _createMarker: function(f, c) {
            var d = new L.Marker(f,{
                draggable: !0,
                icon: this.options.icon
            });
            return d._origLatLng = f,
            d._index = c,
            d.on("drag", this._onMarkerDrag, this),
            d.on("dragend", this._fireEdit, this),
            this._markerGroup.addLayer(d),
            d
        },
        _removeMarker: function(d) {
            var c = d._index;
            this._markerGroup.removeLayer(d),
            this._markers.splice(c, 1),
            this._poly.spliceLatLngs(c, 1),
            this._updateIndexes(c, -1),
            d.off("drag", this._onMarkerDrag, this).off("dragend", this._fireEdit, this).off("click", this._onMarkerClick, this)
        },
        _fireEdit: function() {
            this._poly.edited = !0,
            this._poly.fire("edit")
        },
        _onMarkerDrag: function(d) {
            var c = d.target;
            L.extend(c._origLatLng, c._latlng),
            c._middleLeft && c._middleLeft.setLatLng(this._getMiddleLatLng(c._prev, c)),
            c._middleRight && c._middleRight.setLatLng(this._getMiddleLatLng(c, c._next)),
            this._poly.redraw()
        },
        _onMarkerClick: function(f) {
            var c = L.Polygon && this._poly instanceof L.Polygon ? 4 : 3
              , d = f.target;
            c > this._poly._latlngs.length || (this._removeMarker(d),
            this._updatePrevNext(d._prev, d._next),
            d._middleLeft && this._markerGroup.removeLayer(d._middleLeft),
            d._middleRight && this._markerGroup.removeLayer(d._middleRight),
            d._prev && d._next ? this._createMiddleMarker(d._prev, d._next) : d._prev ? d._next || (d._prev._middleRight = null) : d._next._middleLeft = null,
            this._fireEdit())
        },
        _updateIndexes: function(d, c) {
            this._markerGroup.eachLayer(function(e) {
                e._index > d && (e._index += c)
            })
        },
        _createMiddleMarker: function(k, d) {
            var f, g, c, j = this._getMiddleLatLng(k, d), h = this._createMarker(j);
            h.setOpacity(0.6),
            k._middleRight = d._middleLeft = h,
            g = function() {
                var e = d._index;
                h._index = e,
                h.off("click", f, this).on("click", this._onMarkerClick, this),
                j.lat = h.getLatLng().lat,
                j.lng = h.getLatLng().lng,
                this._poly.spliceLatLngs(e, 0, j),
                this._markers.splice(e, 0, h),
                h.setOpacity(1),
                this._updateIndexes(e, 1),
                d._index++,
                this._updatePrevNext(k, h),
                this._updatePrevNext(h, d)
            }
            ,
            c = function() {
                h.off("dragstart", g, this),
                h.off("dragend", c, this),
                this._createMiddleMarker(k, h),
                this._createMiddleMarker(h, d)
            }
            ,
            f = function() {
                g.call(this),
                c.call(this),
                this._fireEdit()
            }
            ,
            h.on("click", f, this).on("dragstart", g, this).on("dragend", c, this),
            this._markerGroup.addLayer(h)
        },
        _updatePrevNext: function(d, c) {
            d && (d._next = c),
            c && (c._prev = d)
        },
        _getMiddleLatLng: function(h, d) {
            var f = this._poly._map
              , g = f.project(h.getLatLng())
              , c = f.project(d.getLatLng());
            return f.unproject(g._add(c)._divideBy(2))
        }
    }),
    L.Polyline.addInitHook(function() {
        this.editing || (L.Edit.Poly && (this.editing = new L.Edit.Poly(this),
        this.options.editable && this.editing.enable()),
        this.on("add", function() {
            this.editing && this.editing.enabled() && this.editing.addHooks()
        }),
        this.on("remove", function() {
            this.editing && this.editing.enabled() && this.editing.removeHooks()
        }))
    }),
    L.Edit = L.Edit || {},
    L.Edit.SimpleShape = L.Handler.extend({
        options: {
            moveIcon: new L.DivIcon({
                iconSize: new L.Point(8,8),
                className: "leaflet-div-icon leaflet-editing-icon leaflet-edit-move"
            }),
            resizeIcon: new L.DivIcon({
                iconSize: new L.Point(8,8),
                className: "leaflet-div-icon leaflet-editing-icon leaflet-edit-resize"
            })
        },
        initialize: function(d, c) {
            this._shape = d,
            L.Util.setOptions(this, c)
        },
        addHooks: function() {
            this._shape._map && (this._map = this._shape._map,
            this._markerGroup || this._initMarkers(),
            this._map.addLayer(this._markerGroup))
        },
        removeHooks: function() {
            if (this._shape._map) {
                this._unbindMarker(this._moveMarker);
                for (var d = 0, c = this._resizeMarkers.length; c > d; d++) {
                    this._unbindMarker(this._resizeMarkers[d])
                }
                this._resizeMarkers = null,
                this._map.removeLayer(this._markerGroup),
                delete this._markerGroup
            }
            this._map = null
        },
        updateMarkers: function() {
            this._markerGroup.clearLayers(),
            this._initMarkers()
        },
        _initMarkers: function() {
            this._markerGroup || (this._markerGroup = new L.LayerGroup),
            this._createMoveMarker(),
            this._createResizeMarker()
        },
        _createMoveMarker: function() {},
        _createResizeMarker: function() {},
        _createMarker: function(f, c) {
            var d = new L.Marker(f,{
                draggable: !0,
                icon: c,
                zIndexOffset: 10
            });
            return this._bindMarker(d),
            this._markerGroup.addLayer(d),
            d
        },
        _bindMarker: function(c) {
            c.on("dragstart", this._onMarkerDragStart, this).on("drag", this._onMarkerDrag, this).on("dragend", this._onMarkerDragEnd, this)
        },
        _unbindMarker: function(c) {
            c.off("dragstart", this._onMarkerDragStart, this).off("drag", this._onMarkerDrag, this).off("dragend", this._onMarkerDragEnd, this)
        },
        _onMarkerDragStart: function(d) {
            var c = d.target;
            c.setOpacity(0)
        },
        _fireEdit: function() {
            this._shape.edited = !0,
            this._shape.fire("edit")
        },
        _onMarkerDrag: function(f) {
            var c = f.target
              , d = c.getLatLng();
            c === this._moveMarker ? this._move(d) : this._resize(d),
            this._shape.redraw()
        },
        _onMarkerDragEnd: function(d) {
            var c = d.target;
            c.setOpacity(1),
            this._fireEdit()
        },
        _move: function() {},
        _resize: function() {}
    }),
    L.Edit = L.Edit || {},
    L.Edit.Rectangle = L.Edit.SimpleShape.extend({
        _createMoveMarker: function() {
            var d = this._shape.getBounds()
              , c = d.getCenter();
            this._moveMarker = this._createMarker(c, this.options.moveIcon)
        },
        _createResizeMarker: function() {
            var f = this._getCorners();
            this._resizeMarkers = [];
            for (var c = 0, d = f.length; d > c; c++) {
                this._resizeMarkers.push(this._createMarker(f[c], this.options.resizeIcon)),
                this._resizeMarkers[c]._cornerIndex = c
            }
        },
        _onMarkerDragStart: function(g) {
            L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, g);
            var c = this._getCorners()
              , d = g.target
              , f = d._cornerIndex;
            this._oppositeCorner = c[(f + 2) % 4],
            this._toggleCornerMarkers(0, f)
        },
        _onMarkerDragEnd: function(g) {
            var c, d, f = g.target;
            f === this._moveMarker && (c = this._shape.getBounds(),
            d = c.getCenter(),
            f.setLatLng(d)),
            this._toggleCornerMarkers(1),
            this._repositionCornerMarkers(),
            L.Edit.SimpleShape.prototype._onMarkerDragEnd.call(this, g)
        },
        _move: function(l) {
            for (var d, f = this._shape.getLatLngs(), h = this._shape.getBounds(), c = h.getCenter(), k = [], j = 0, g = f.length; g > j; j++) {
                d = [f[j].lat - c.lat, f[j].lng - c.lng],
                k.push([l.lat + d[0], l.lng + d[1]])
            }
            this._shape.setLatLngs(k),
            this._repositionCornerMarkers()
        },
        _resize: function(d) {
            var c;
            this._shape.setBounds(L.latLngBounds(d, this._oppositeCorner)),
            c = this._shape.getBounds(),
            this._moveMarker.setLatLng(c.getCenter())
        },
        _getCorners: function() {
            var h = this._shape.getBounds()
              , d = h.getNorthWest()
              , f = h.getNorthEast()
              , g = h.getSouthEast()
              , c = h.getSouthWest();
            return [d, f, g, c]
        },
        _toggleCornerMarkers: function(f) {
            for (var c = 0, d = this._resizeMarkers.length; d > c; c++) {
                this._resizeMarkers[c].setOpacity(f)
            }
        },
        _repositionCornerMarkers: function() {
            for (var f = this._getCorners(), c = 0, d = this._resizeMarkers.length; d > c; c++) {
                this._resizeMarkers[c].setLatLng(f[c])
            }
        }
    }),
    L.Rectangle.addInitHook(function() {
        L.Edit.Rectangle && (this.editing = new L.Edit.Rectangle(this),
        this.options.editable && this.editing.enable())
    }),
    L.Edit = L.Edit || {},
    L.Edit.Circle = L.Edit.SimpleShape.extend({
        _createMoveMarker: function() {
            var c = this._shape.getLatLng();
            this._moveMarker = this._createMarker(c, this.options.moveIcon)
        },
        _createResizeMarker: function() {
            var d = this._shape.getLatLng()
              , c = this._getResizeMarkerPoint(d);
            this._resizeMarkers = [],
            this._resizeMarkers.push(this._createMarker(c, this.options.resizeIcon))
        },
        _getResizeMarkerPoint: function(f) {
            var c = this._shape._radius * Math.cos(Math.PI / 4)
              , d = this._map.project(f);
            return this._map.unproject([d.x + c, d.y - c])
        },
        _move: function(d) {
            var c = this._getResizeMarkerPoint(d);
            this._resizeMarkers[0].setLatLng(c),
            this._shape.setLatLng(d)
        },
        _resize: function(f) {
            var c = this._moveMarker.getLatLng()
              , d = c.distanceTo(f);
            this._shape.setRadius(d)
        }
    }),
    L.Circle.addInitHook(function() {
        L.Edit.Circle && (this.editing = new L.Edit.Circle(this),
        this.options.editable && this.editing.enable()),
        this.on("add", function() {
            this.editing && this.editing.enabled() && this.editing.addHooks()
        }),
        this.on("remove", function() {
            this.editing && this.editing.enabled() && this.editing.removeHooks()
        })
    }),
    L.LatLngUtil = {
        cloneLatLngs: function(g) {
            for (var c = [], d = 0, f = g.length; f > d; d++) {
                c.push(this.cloneLatLng(g[d]))
            }
            return c
        },
        cloneLatLng: function(c) {
            return L.latLng(c.lat, c.lng)
        }
    },
    L.GeometryUtil = {
        geodesicArea: function(k) {
            var d, f, g = k.length, c = 0, j = L.LatLng.DEG_TO_RAD;
            if (g > 2) {
                for (var h = 0; g > h; h++) {
                    d = k[h],
                    f = k[(h + 1) % g],
                    c += (f.lng - d.lng) * j * (2 + Math.sin(d.lat * j) + Math.sin(f.lat * j))
                }
                c = 6378137 * 6378137 * c / 2
            }
            return Math.abs(c)
        },
        readableArea: function(f, c) {
            var d;
            return c ? d = f >= 10000 ? (0.0001 * f).toFixed(2) + " ha" : f.toFixed(2) + " m&sup2;" : (f *= 0.836127,
            d = f >= 3097600 ? (f / 3097600).toFixed(2) + " mi&sup2;" : f >= 4840 ? (f / 4840).toFixed(2) + " acres" : Math.ceil(f) + " yd&sup2;"),
            d
        },
        readableDistance: function(f, c) {
            var d;
            return c ? d = f > 1000 ? (f / 1000).toFixed(2) + " km" : Math.ceil(f) + " m" : (f *= 1.09361,
            d = f > 1760 ? (f / 1760).toFixed(2) + " miles" : Math.ceil(f) + " yd"),
            d
        }
    },
    L.Util.extend(L.LineUtil, {
        segmentsIntersect: function(g, c, d, f) {
            return this._checkCounterclockwise(g, d, f) !== this._checkCounterclockwise(c, d, f) && this._checkCounterclockwise(g, c, d) !== this._checkCounterclockwise(g, c, f)
        },
        _checkCounterclockwise: function(f, c, d) {
            return (d.y - f.y) * (c.x - f.x) > (c.y - f.y) * (d.x - f.x)
        }
    }),
    L.Polyline.include({
        intersects: function() {
            var h, d, f, g = this._originalPoints, c = g ? g.length : 0;
            if (this._tooFewPointsForIntersection()) {
                return !1
            }
            for (h = c - 1; h >= 3; h--) {
                if (d = g[h - 1],
                f = g[h],
                this._lineSegmentsIntersectsRange(d, f, h - 2)) {
                    return !0
                }
            }
            return !1
        },
        newLatLngIntersects: function(d, c) {
            return this._map ? this.newPointIntersects(this._map.latLngToLayerPoint(d), c) : !1
        },
        newPointIntersects: function(j, d) {
            var f = this._originalPoints
              , g = f ? f.length : 0
              , c = f ? f[g - 1] : null
              , h = g - 2;
            return this._tooFewPointsForIntersection(1) ? !1 : this._lineSegmentsIntersectsRange(c, j, h, d ? 1 : 0)
        },
        _tooFewPointsForIntersection: function(f) {
            var c = this._originalPoints
              , d = c ? c.length : 0;
            return d += f || 0,
            !this._originalPoints || 3 >= d
        },
        _lineSegmentsIntersectsRange: function(l, d, f, h) {
            var c, k, j = this._originalPoints;
            h = h || 0;
            for (var g = f; g > h; g--) {
                if (c = j[g - 1],
                k = j[g],
                L.LineUtil.segmentsIntersect(l, d, c, k)) {
                    return !0
                }
            }
            return !1
        }
    }),
    L.Polygon.include({
        intersects: function() {
            var j, d, f, g, c, h = this._originalPoints;
            return this._tooFewPointsForIntersection() ? !1 : (j = L.Polyline.prototype.intersects.call(this)) ? !0 : (d = h.length,
            f = h[0],
            g = h[d - 1],
            c = d - 2,
            this._lineSegmentsIntersectsRange(g, f, c, 1))
        }
    }),
    L.Control.Draw = L.Control.extend({
        options: {
            position: "topleft",
            draw: {},
            edit: !1
        },
        initialize: function(f) {
            if ("0.5.1" >= L.version) {
                throw Error("Leaflet.draw 0.2.0+ requires Leaflet 0.6.0+. Download latest from https://github.com/Leaflet/Leaflet/")
            }
            L.Control.prototype.initialize.call(this, f);
            var c, d;
            this._toolbars = {},
            L.DrawToolbar && this.options.draw && (d = new L.DrawToolbar(this.options.draw),
            c = L.stamp(d),
            this._toolbars[c] = d,
            this._toolbars[c].on("enable", this._toolbarEnabled, this)),
            L.EditToolbar && this.options.edit && (d = new L.EditToolbar(this.options.edit),
            c = L.stamp(d),
            this._toolbars[c] = d,
            this._toolbars[c].on("enable", this._toolbarEnabled, this))
        },
        onAdd: function(j) {
            var d, f = L.DomUtil.create("div", "leaflet-draw"), g = !1, c = "leaflet-draw-toolbar-top";
            for (var h in this._toolbars) {
                this._toolbars.hasOwnProperty(h) && (d = this._toolbars[h].addToolbar(j),
                g || (L.DomUtil.hasClass(d, c) || L.DomUtil.addClass(d.childNodes[0], c),
                g = !0),
                f.appendChild(d))
            }
            return f
        },
        onRemove: function() {
            for (var c in this._toolbars) {
                this._toolbars.hasOwnProperty(c) && this._toolbars[c].removeToolbar()
            }
        },
        setDrawingOptions: function(d) {
            for (var c in this._toolbars) {
                this._toolbars[c]instanceof L.DrawToolbar && this._toolbars[c].setOptions(d)
            }
        },
        _toolbarEnabled: function(f) {
            var c = "" + L.stamp(f.target);
            for (var d in this._toolbars) {
                this._toolbars.hasOwnProperty(d) && d !== c && this._toolbars[d].disable()
            }
        }
    }),
    L.Map.mergeOptions({
        drawControlTooltips: !0,
        drawControl: !1
    }),
    L.Map.addInitHook(function() {
        this.options.drawControl && (this.drawControl = new L.Control.Draw,
        this.addControl(this.drawControl))
    }),
    L.Toolbar = L.Class.extend({
        includes: [L.Mixin.Events],
        initialize: function(c) {
            L.setOptions(this, c),
            this._modes = {},
            this._actionButtons = [],
            this._activeMode = null
        },
        enabled: function() {
            return null !== this._activeMode
        },
        disable: function() {
            this.enabled() && this._activeMode.handler.disable()
        },
        removeToolbar: function() {
            for (var f in this._modes) {
                this._modes.hasOwnProperty(f) && (this._disposeButton(this._modes[f].button, this._modes[f].handler.enable),
                this._modes[f].handler.disable(),
                this._modes[f].handler.off("enabled", this._handlerActivated, this).off("disabled", this._handlerDeactivated, this))
            }
            this._modes = {};
            for (var c = 0, d = this._actionButtons.length; d > c; c++) {
                this._disposeButton(this._actionButtons[c].button, this._actionButtons[c].callback)
            }
            this._actionButtons = [],
            this._actionsContainer = null
        },
        _initModeHandler: function(j, d, f, g, c) {
            var h = j.type;
            this._modes[h] = {},
            this._modes[h].handler = j,
            this._modes[h].button = this._createButton({
                title: c,
                className: g + "-" + h,
                container: d,
                callback: this._modes[h].handler.enable,
                context: this._modes[h].handler
            }),
            this._modes[h].buttonIndex = f,
            this._modes[h].handler.on("enabled", this._handlerActivated, this).on("disabled", this._handlerDeactivated, this)
        },
        _createButton: function(d) {
            var c = L.DomUtil.create("a", d.className || "", d.container);
            return c.href = "#",
            d.text && (c.innerHTML = d.text),
            d.title && (c.title = d.title),
            L.DomEvent.on(c, "click", L.DomEvent.stopPropagation).on(c, "mousedown", L.DomEvent.stopPropagation).on(c, "dblclick", L.DomEvent.stopPropagation).on(c, "click", L.DomEvent.preventDefault).on(c, "click", d.callback, d.context),
            c
        },
        _disposeButton: function(d, c) {
            L.DomEvent.off(d, "click", L.DomEvent.stopPropagation).off(d, "mousedown", L.DomEvent.stopPropagation).off(d, "dblclick", L.DomEvent.stopPropagation).off(d, "click", L.DomEvent.preventDefault).off(d, "click", c)
        },
        _handlerActivated: function(c) {
            this._activeMode && this._activeMode.handler.enabled() && this._activeMode.handler.disable(),
            this._activeMode = this._modes[c.handler],
            L.DomUtil.addClass(this._activeMode.button, "leaflet-draw-toolbar-button-enabled"),
            this._showActionsToolbar(),
            this.fire("enable")
        },
        _handlerDeactivated: function() {
            this._hideActionsToolbar(),
            L.DomUtil.removeClass(this._activeMode.button, "leaflet-draw-toolbar-button-enabled"),
            this._activeMode = null,
            this.fire("disable")
        },
        _createActions: function(j) {
            for (var d, f, g = L.DomUtil.create("ul", "leaflet-draw-actions"), c = j.length, h = 0; c > h; h++) {
                d = L.DomUtil.create("li", "", g),
                f = this._createButton({
                    title: j[h].title,
                    text: j[h].text,
                    container: d,
                    callback: j[h].callback,
                    context: j[h].context
                }),
                this._actionButtons.push({
                    button: f,
                    callback: j[h].callback
                })
            }
            return g
        },
        _showActionsToolbar: function() {
            var h = this._activeMode.buttonIndex
              , d = this._lastButtonIndex
              , f = 26
              , g = 1
              , c = h * f + h * g - 1;
            this._actionsContainer.style.top = c + "px",
            0 === h && (L.DomUtil.addClass(this._toolbarContainer, "leaflet-draw-toolbar-notop"),
            L.DomUtil.addClass(this._actionsContainer, "leaflet-draw-actions-top")),
            h === d && (L.DomUtil.addClass(this._toolbarContainer, "leaflet-draw-toolbar-nobottom"),
            L.DomUtil.addClass(this._actionsContainer, "leaflet-draw-actions-bottom")),
            this._actionsContainer.style.display = "block"
        },
        _hideActionsToolbar: function() {
            this._actionsContainer.style.display = "none",
            L.DomUtil.removeClass(this._toolbarContainer, "leaflet-draw-toolbar-notop"),
            L.DomUtil.removeClass(this._toolbarContainer, "leaflet-draw-toolbar-nobottom"),
            L.DomUtil.removeClass(this._actionsContainer, "leaflet-draw-actions-top"),
            L.DomUtil.removeClass(this._actionsContainer, "leaflet-draw-actions-bottom")
        }
    }),
    L.Tooltip = L.Class.extend({
        initialize: function(c) {
            this._map = c,
            this._popupPane = c._panes.popupPane,
            this._container = c.options.drawControlTooltips ? L.DomUtil.create("div", "leaflet-draw-tooltip", this._popupPane) : null,
            this._singleLineLabel = !1
        },
        dispose: function() {
            this._container && (this._popupPane.removeChild(this._container),
            this._container = null)
        },
        updateContent: function(c) {
            return this._container ? (c.subtext = c.subtext || "",
            0 !== c.subtext.length || this._singleLineLabel ? c.subtext.length > 0 && this._singleLineLabel && (L.DomUtil.removeClass(this._container, "leaflet-draw-tooltip-single"),
            this._singleLineLabel = !1) : (L.DomUtil.addClass(this._container, "leaflet-draw-tooltip-single"),
            this._singleLineLabel = !0),
            this._container.innerHTML = (c.subtext.length > 0 ? '<span class="leaflet-draw-tooltip-subtext">' + c.subtext + "</span><br />" : "") + "<span>" + c.text + "</span>",
            this) : this
        },
        updatePosition: function(f) {
            var c = this._map.latLngToLayerPoint(f)
              , d = this._container;
            return this._container && (d.style.visibility = "inherit",
            L.DomUtil.setPosition(d, c)),
            this
        },
        showAsError: function() {
            return this._container && L.DomUtil.addClass(this._container, "leaflet-error-draw-tooltip"),
            this
        },
        removeError: function() {
            return this._container && L.DomUtil.removeClass(this._container, "leaflet-error-draw-tooltip"),
            this
        }
    }),
    L.DrawToolbar = L.Toolbar.extend({
        options: {
            polyline: {},
            polygon: {},
            rectangle: {},
            circle: {},
            marker: {}
        },
        initialize: function(d) {
            for (var c in this.options) {
                this.options.hasOwnProperty(c) && d[c] && (d[c] = L.extend({}, this.options[c], d[c]))
            }
            L.Toolbar.prototype.initialize.call(this, d)
        },
        addToolbar: function(g) {
            var c = L.DomUtil.create("div", "leaflet-draw-section")
              , d = 0
              , f = "leaflet-draw-draw";
            return this._toolbarContainer = L.DomUtil.create("div", "leaflet-draw-toolbar leaflet-bar"),
            this.options.polyline && this._initModeHandler(new L.Draw.Polyline(g,this.options.polyline), this._toolbarContainer, d++, f, L.drawLocal.draw.toolbar.buttons.polyline),
            this.options.polygon && this._initModeHandler(new L.Draw.Polygon(g,this.options.polygon), this._toolbarContainer, d++, f, L.drawLocal.draw.toolbar.buttons.polygon),
            this.options.rectangle && this._initModeHandler(new L.Draw.Rectangle(g,this.options.rectangle), this._toolbarContainer, d++, f, L.drawLocal.draw.toolbar.buttons.rectangle),
            this.options.circle && this._initModeHandler(new L.Draw.Circle(g,this.options.circle), this._toolbarContainer, d++, f, L.drawLocal.draw.toolbar.buttons.circle),
            this.options.marker && this._initModeHandler(new L.Draw.Marker(g,this.options.marker), this._toolbarContainer, d++, f, L.drawLocal.draw.toolbar.buttons.marker),
            this._lastButtonIndex = --d,
            this._actionsContainer = this._createActions([{
                title: L.drawLocal.draw.toolbar.actions.title,
                text: L.drawLocal.draw.toolbar.actions.text,
                callback: this.disable,
                context: this
            }]),
            c.appendChild(this._toolbarContainer),
            c.appendChild(this._actionsContainer),
            c
        },
        setOptions: function(d) {
            L.setOptions(this, d);
            for (var c in this._modes) {
                this._modes.hasOwnProperty(c) && d.hasOwnProperty(c) && this._modes[c].handler.setOptions(d[c])
            }
        }
    }),
    L.EditToolbar = L.Toolbar.extend({
        options: {
            edit: {
                selectedPathOptions: {
                    color: "#fe57a1",
                    opacity: 0.6,
                    dashArray: "10, 10",
                    fill: !0,
                    fillColor: "#fe57a1",
                    fillOpacity: 0.1
                }
            },
            remove: {},
            featureGroup: null
        },
        initialize: function(c) {
            c.edit && (c.edit.selectedPathOptions === undefined && (c.edit.selectedPathOptions = this.options.edit.selectedPathOptions),
            c.edit = L.extend({}, this.options.edit, c.edit)),
            c.remove && (c.remove = L.extend({}, this.options.remove, c.remove)),
            L.Toolbar.prototype.initialize.call(this, c),
            this._selectedFeatureCount = 0
        },
        addToolbar: function(h) {
            var d = L.DomUtil.create("div", "leaflet-draw-section")
              , f = 0
              , g = "leaflet-draw-edit"
              , c = this.options.featureGroup;
            return this._toolbarContainer = L.DomUtil.create("div", "leaflet-draw-toolbar leaflet-bar"),
            this._map = h,
            this.options.edit && this._initModeHandler(new L.EditToolbar.Edit(h,{
                featureGroup: c,
                selectedPathOptions: this.options.edit.selectedPathOptions
            }), this._toolbarContainer, f++, g, L.drawLocal.edit.toolbar.buttons.edit),
            this.options.remove && this._initModeHandler(new L.EditToolbar.Delete(h,{
                featureGroup: c
            }), this._toolbarContainer, f++, g, L.drawLocal.edit.toolbar.buttons.remove),
            this._lastButtonIndex = --f,
            this._actionsContainer = this._createActions([{
                title: L.drawLocal.edit.toolbar.actions.save.title,
                text: L.drawLocal.edit.toolbar.actions.save.text,
                callback: this._save,
                context: this
            }, {
                title: L.drawLocal.edit.toolbar.actions.cancel.title,
                text: L.drawLocal.edit.toolbar.actions.cancel.text,
                callback: this.disable,
                context: this
            }]),
            d.appendChild(this._toolbarContainer),
            d.appendChild(this._actionsContainer),
            this._checkDisabled(),
            c.on("layeradd layerremove", this._checkDisabled, this),
            d
        },
        removeToolbar: function() {
            L.Toolbar.prototype.removeToolbar.call(this),
            this.options.featureGroup.off("layeradd layerremove", this._checkDisabled, this)
        },
        disable: function() {
            this.enabled() && (this._activeMode.handler.revertLayers(),
            L.Toolbar.prototype.disable.call(this))
        },
        _save: function() {
            this._activeMode.handler.save(),
            this._activeMode.handler.disable()
        },
        _checkDisabled: function() {
            var f, c = this.options.featureGroup, d = 0 !== c.getLayers().length;
            this.options.edit && (f = this._modes[L.EditToolbar.Edit.TYPE].button,
            d ? L.DomUtil.removeClass(f, "leaflet-disabled") : L.DomUtil.addClass(f, "leaflet-disabled"),
            f.setAttribute("title", d ? L.drawLocal.edit.toolbar.buttons.edit : L.drawLocal.edit.toolbar.buttons.editDisabled)),
            this.options.remove && (f = this._modes[L.EditToolbar.Delete.TYPE].button,
            d ? L.DomUtil.removeClass(f, "leaflet-disabled") : L.DomUtil.addClass(f, "leaflet-disabled"),
            f.setAttribute("title", d ? L.drawLocal.edit.toolbar.buttons.remove : L.drawLocal.edit.toolbar.buttons.removeDisabled))
        }
    }),
    L.EditToolbar.Edit = L.Handler.extend({
        statics: {
            TYPE: "edit"
        },
        includes: L.Mixin.Events,
        initialize: function(d, c) {
            if (L.Handler.prototype.initialize.call(this, d),
            this._selectedPathOptions = c.selectedPathOptions,
            this._featureGroup = c.featureGroup,
            !(this._featureGroup instanceof L.FeatureGroup)) {
                throw Error("options.featureGroup must be a L.FeatureGroup")
            }
            this._uneditedLayerProps = {},
            this.type = L.EditToolbar.Edit.TYPE
        },
        enable: function() {
            !this._enabled && this._hasAvailableLayers() && (L.Handler.prototype.enable.call(this),
            this._featureGroup.on("layeradd", this._enableLayerEdit, this).on("layerremove", this._disableLayerEdit, this),
            this.fire("enabled", {
                handler: this.type
            }),
            this._map.fire("draw:editstart", {
                handler: this.type
            }))
        },
        disable: function() {
            this._enabled && (this.fire("disabled", {
                handler: this.type
            }),
            this._map.fire("draw:editstop", {
                handler: this.type
            }),
            this._featureGroup.off("layeradd", this._enableLayerEdit, this).off("layerremove", this._disableLayerEdit, this),
            L.Handler.prototype.disable.call(this))
        },
        addHooks: function() {
            var c = this._map;
            c && (c.getContainer().focus(),
            this._featureGroup.eachLayer(this._enableLayerEdit, this),
            this._tooltip = new L.Tooltip(this._map),
            this._tooltip.updateContent({
                text: L.drawLocal.edit.handlers.edit.tooltip.text,
                subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext
            }),
            this._map.on("mousemove", this._onMouseMove, this))
        },
        removeHooks: function() {
            this._map && (this._featureGroup.eachLayer(this._disableLayerEdit, this),
            this._uneditedLayerProps = {},
            this._tooltip.dispose(),
            this._tooltip = null,
            this._map.off("mousemove", this._onMouseMove, this))
        },
        revertLayers: function() {
            this._featureGroup.eachLayer(function(c) {
                this._revertLayer(c)
            }, this)
        },
        save: function() {
            var c = new L.LayerGroup;
            this._featureGroup.eachLayer(function(d) {
                d.edited && (c.addLayer(d),
                d.edited = !1)
            }),
            this._map.fire("draw:edited", {
                layers: c
            })
        },
        _backupLayer: function(d) {
            var c = L.Util.stamp(d);
            this._uneditedLayerProps[c] || (this._uneditedLayerProps[c] = d instanceof L.Polyline || d instanceof L.Polygon || d instanceof L.Rectangle ? {
                latlngs: L.LatLngUtil.cloneLatLngs(d.getLatLngs())
            } : d instanceof L.Circle ? {
                latlng: L.LatLngUtil.cloneLatLng(d.getLatLng()),
                radius: d.getRadius()
            } : {
                latlng: L.LatLngUtil.cloneLatLng(d.getLatLng())
            })
        },
        _revertLayer: function(d) {
            var c = L.Util.stamp(d);
            d.edited = !1,
            this._uneditedLayerProps.hasOwnProperty(c) && (d instanceof L.Polyline || d instanceof L.Polygon || d instanceof L.Rectangle ? d.setLatLngs(this._uneditedLayerProps[c].latlngs) : d instanceof L.Circle ? (d.setLatLng(this._uneditedLayerProps[c].latlng),
            d.setRadius(this._uneditedLayerProps[c].radius)) : d.setLatLng(this._uneditedLayerProps[c].latlng))
        },
        _toggleMarkerHighlight: function(d) {
            if (d._icon) {
                var c = d._icon;
                c.style.display = "none",
                L.DomUtil.hasClass(c, "leaflet-edit-marker-selected") ? (L.DomUtil.removeClass(c, "leaflet-edit-marker-selected"),
                this._offsetMarker(c, -4)) : (L.DomUtil.addClass(c, "leaflet-edit-marker-selected"),
                this._offsetMarker(c, 4)),
                c.style.display = ""
            }
        },
        _offsetMarker: function(g, c) {
            var d = parseInt(g.style.marginTop, 10) - c
              , f = parseInt(g.style.marginLeft, 10) - c;
            g.style.marginTop = d + "px",
            g.style.marginLeft = f + "px"
        },
        _enableLayerEdit: function(g) {
            var c, d = g.layer || g.target || g, f = d instanceof L.Marker;
            (!f || d._icon) && (this._backupLayer(d),
            this._selectedPathOptions && (c = L.Util.extend({}, this._selectedPathOptions),
            f ? this._toggleMarkerHighlight(d) : (d.options.previousOptions = d.options,
            d instanceof L.Circle || d instanceof L.Polygon || d instanceof L.Rectangle || (c.fill = !1),
            d.setStyle(c))),
            f ? (d.dragging.enable(),
            d.on("dragend", this._onMarkerDragEnd)) : d.editing.enable())
        },
        _disableLayerEdit: function(d) {
            var c = d.layer || d.target || d;
            c.edited = !1,
            this._selectedPathOptions && (c instanceof L.Marker ? this._toggleMarkerHighlight(c) : (c.setStyle(c.options.previousOptions),
            delete c.options.previousOptions)),
            c instanceof L.Marker ? (c.dragging.disable(),
            c.off("dragend", this._onMarkerDragEnd, this)) : c.editing.disable()
        },
        _onMarkerDragEnd: function(d) {
            var c = d.target;
            c.edited = !0
        },
        _onMouseMove: function(c) {
            this._tooltip.updatePosition(c.latlng)
        },
        _hasAvailableLayers: function() {
            return 0 !== this._featureGroup.getLayers().length
        }
    }),
    L.EditToolbar.Delete = L.Handler.extend({
        statics: {
            TYPE: "remove"
        },
        includes: L.Mixin.Events,
        initialize: function(d, c) {
            if (L.Handler.prototype.initialize.call(this, d),
            L.Util.setOptions(this, c),
            this._deletableLayers = this.options.featureGroup,
            !(this._deletableLayers instanceof L.FeatureGroup)) {
                throw Error("options.featureGroup must be a L.FeatureGroup")
            }
            this.type = L.EditToolbar.Delete.TYPE
        },
        enable: function() {
            !this._enabled && this._hasAvailableLayers() && (L.Handler.prototype.enable.call(this),
            this._deletableLayers.on("layeradd", this._enableLayerDelete, this).on("layerremove", this._disableLayerDelete, this),
            this.fire("enabled", {
                handler: this.type
            }),
            this._map.fire("draw:editstart", {
                handler: this.type
            }))
        },
        disable: function() {
            this._enabled && (L.Handler.prototype.disable.call(this),
            this._deletableLayers.off("layeradd", this._enableLayerDelete, this).off("layerremove", this._disableLayerDelete, this),
            this.fire("disabled", {
                handler: this.type
            }),
            this._map.fire("draw:editstop", {
                handler: this.type
            }))
        },
        addHooks: function() {
            var c = this._map;
            c && (c.getContainer().focus(),
            this._deletableLayers.eachLayer(this._enableLayerDelete, this),
            this._deletedLayers = new L.layerGroup,
            this._tooltip = new L.Tooltip(this._map),
            this._tooltip.updateContent({
                text: L.drawLocal.edit.handlers.remove.tooltip.text
            }),
            this._map.on("mousemove", this._onMouseMove, this))
        },
        removeHooks: function() {
            this._map && (this._deletableLayers.eachLayer(this._disableLayerDelete, this),
            this._deletedLayers = null,
            this._tooltip.dispose(),
            this._tooltip = null,
            this._map.off("mousemove", this._onMouseMove, this))
        },
        revertLayers: function() {
            this._deletedLayers.eachLayer(function(c) {
                this._deletableLayers.addLayer(c)
            }, this)
        },
        save: function() {
            this._map.fire("draw:deleted", {
                layers: this._deletedLayers
            })
        },
        _enableLayerDelete: function(d) {
            var c = d.layer || d.target || d;
            c.on("click", this._removeLayer, this)
        },
        _disableLayerDelete: function(d) {
            var c = d.layer || d.target || d;
            c.off("click", this._removeLayer, this),
            this._deletedLayers.removeLayer(c)
        },
        _removeLayer: function(d) {
            var c = d.layer || d.target || d;
            this._deletableLayers.removeLayer(c),
            this._deletedLayers.addLayer(c)
        },
        _onMouseMove: function(c) {
            this._tooltip.updatePosition(c.latlng)
        },
        _hasAvailableLayers: function() {
            return 0 !== this._deletableLayers.getLayers().length
        }
    })
}
)(this, document);
(function(a, b) {
    if (typeof define === "function" && define.amd) {
        define(["leaflet"], a)
    } else {
        if (typeof exports === "object") {
            module.exports = a(require("leaflet"))
        }
    }
    if (typeof b !== "undefined" && b.L) {
        b.LeafletLabel = a(L)
    }
}(function(a) {
    a.labelVersion = "0.2.4";
    var b = a.Layer.extend({
        options: {
            className: "",
            clickable: false,
            direction: "right",
            noHide: false,
            offset: [12, -15],
            opacity: 1,
            zoomAnimation: true
        },
        initialize: function(c, d) {
            a.setOptions(this, c);
            this._source = d;
            this._animated = a.Browser.any3d && this.options.zoomAnimation;
            this._isOpen = false
        },
        onAdd: function(c) {
            this._map = c;
            this._pane = this.options.pane ? c._panes[this.options.pane] : this._source instanceof a.Marker ? c._panes.markerPane : c._panes.popupPane;
            if (!this._container) {
                this._initLayout()
            }
            this._pane.appendChild(this._container);
            this._initInteraction();
            this._update();
            this.setOpacity(this.options.opacity);
            c.on("moveend", this._onMoveEnd, this).on("viewreset", this._onViewReset, this);
            if (this._animated) {
                c.on("zoomanim", this._zoomAnimation, this)
            }
            if (a.Browser.touch && !this.options.noHide) {
                a.DomEvent.on(this._container, "click", this.close, this);
                c.on("click", this.close, this)
            }
        },
        onRemove: function(c) {
            this._pane.removeChild(this._container);
            c.off({
                zoomanim: this._zoomAnimation,
                moveend: this._onMoveEnd,
                viewreset: this._onViewReset
            }, this);
            this._removeInteraction();
            this._map = null
        },
        setLatLng: function(c) {
            this._latlng = a.latLng(c);
            if (this._map) {
                this._updatePosition()
            }
            return this
        },
        setContent: function(c) {
            this._previousContent = this._content;
            this._content = c;
            this._updateContent();
            return this
        },
        close: function() {
            var c = this._map;
            if (c) {
                if (a.Browser.touch && !this.options.noHide) {
                    a.DomEvent.off(this._container, "click", this.close);
                    c.off("click", this.close, this)
                }
                c.removeLayer(this)
            }
        },
        updateZIndex: function(c) {
            this._zIndex = c;
            if (this._container && this._zIndex) {
                this._container.style.zIndex = c
            }
        },
        setOpacity: function(c) {
            this.options.opacity = c;
            if (this._container) {
                a.DomUtil.setOpacity(this._container, c)
            }
        },
        _initLayout: function() {
            this._container = a.DomUtil.create("div", "leaflet-label " + this.options.className + " leaflet-zoom-animated");
            this.updateZIndex(this._zIndex)
        },
        _update: function() {
            if (!this._map) {
                return
            }
            this._container.style.visibility = "hidden";
            this._updateContent();
            this._updatePosition();
            this._container.style.visibility = ""
        },
        _updateContent: function() {
            if (!this._content || !this._map || this._prevContent === this._content) {
                return
            }
            if (typeof this._content === "string") {
                this._container.innerHTML = this._content;
                this._prevContent = this._content;
                this._labelWidth = this._container.offsetWidth
            }
        },
        _updatePosition: function() {
            var c = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(c)
        },
        _setPosition: function(j) {
            var h = this._map
              , d = this._container
              , c = h.latLngToContainerPoint(h.getCenter())
              , f = h.layerPointToContainerPoint(j)
              , e = this.options.direction
              , g = this._labelWidth
              , i = a.point(this.options.offset);
            if ((e === "right" || e === "auto") && f.x < c.x) {
                a.DomUtil.addClass(d, "leaflet-label-right");
                a.DomUtil.removeClass(d, "leaflet-label-left");
                j = j.add(i)
            } else {
                a.DomUtil.addClass(d, "leaflet-label-left");
                a.DomUtil.removeClass(d, "leaflet-label-right");
                j = j.add(a.point(-i.x - g, i.y))
            }
            a.DomUtil.setPosition(d, j)
        },
        _zoomAnimation: function(c) {
            var d = this._map._latLngToNewLayerPoint(this._latlng, c.zoom, c.center).round();
            this._setPosition(d)
        },
        _onMoveEnd: function() {
            if (!this._animated || this.options.direction === "auto") {
                this._updatePosition()
            }
        },
        _onViewReset: function(c) {
            if (c && c.hard) {
                this._update()
            }
        },
        _initInteraction: function() {
            if (!this.options.clickable) {
                return
            }
            var c = this._container
              , d = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
            a.DomUtil.addClass(c, "leaflet-clickable");
            a.DomEvent.on(c, "click", this._onMouseClick, this);
            for (var e = 0; e < d.length; e++) {
                a.DomEvent.on(c, d[e], this._fireMouseEvent, this)
            }
        },
        _removeInteraction: function() {
            if (!this.options.clickable) {
                return
            }
            var c = this._container
              , d = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
            a.DomUtil.removeClass(c, "leaflet-clickable");
            a.DomEvent.off(c, "click", this._onMouseClick, this);
            for (var e = 0; e < d.length; e++) {
                a.DomEvent.off(c, d[e], this._fireMouseEvent, this)
            }
        },
        _onMouseClick: function(c) {
            if (this.hasEventListeners(c.type)) {
                a.DomEvent.stopPropagation(c)
            }
            this.fire(c.type, {
                originalEvent: c
            })
        },
        _fireMouseEvent: function(c) {
            this.fire(c.type, {
                originalEvent: c
            });
            if (c.type === "contextmenu" && this.hasEventListeners(c.type)) {
                a.DomEvent.preventDefault(c)
            }
            if (c.type !== "mousedown") {
                a.DomEvent.stopPropagation(c)
            } else {
                a.DomEvent.preventDefault(c)
            }
        }
    });
    a.BaseMarkerMethods = {
        showLabel: function() {
            if (this.label && this._map) {
                this.label.setLatLng(this._latlng);
                this._map.addLayer(this.label)
            }
            return this
        },
        hideLabel: function() {
            if (this.label) {
                this.label.close()
            }
            return this
        },
        setLabelNoHide: function(c) {
            if (this._labelNoHide === c) {
                return
            }
            this._labelNoHide = c;
            if (c) {
                this._removeLabelRevealHandlers();
                this.showLabel()
            } else {
                this._addLabelRevealHandlers();
                this.hideLabel()
            }
        },
        bindLabel: function(d, f) {
            var e = this.options.icon ? this.options.icon.options.labelAnchor : this.options.labelAnchor
              , c = a.point(e) || a.point(0, 0);
            c = c.add(b.prototype.options.offset);
            if (f && f.offset) {
                c = c.add(f.offset)
            }
            f = a.Util.extend({
                offset: c
            }, f);
            this._labelNoHide = f.noHide;
            if (!this.label) {
                if (!this._labelNoHide) {
                    this._addLabelRevealHandlers()
                }
                this.on("remove", this.hideLabel, this).on("move", this._moveLabel, this).on("add", this._onMarkerAdd, this);
                this._hasLabelHandlers = true
            }
            this.label = new b(f,this).setContent(d);
            return this
        },
        unbindLabel: function() {
            if (this.label) {
                this.hideLabel();
                this.label = null;
                if (this._hasLabelHandlers) {
                    if (!this._labelNoHide) {
                        this._removeLabelRevealHandlers()
                    }
                    this.off("remove", this.hideLabel, this).off("move", this._moveLabel, this).off("add", this._onMarkerAdd, this)
                }
                this._hasLabelHandlers = false
            }
            return this
        },
        updateLabelContent: function(c) {
            if (this.label) {
                this.label.setContent(c)
            }
        },
        getLabel: function() {
            return this.label
        },
        _onMarkerAdd: function() {
            if (this._labelNoHide) {
                this.showLabel()
            }
        },
        _addLabelRevealHandlers: function() {
            this.on("mouseover", this.showLabel, this).on("mouseout", this.hideLabel, this);
            if (a.Browser.touch) {
                this.on("click", this.showLabel, this)
            }
        },
        _removeLabelRevealHandlers: function() {
            this.off("mouseover", this.showLabel, this).off("mouseout", this.hideLabel, this);
            if (a.Browser.touch) {
                this.off("click", this.showLabel, this)
            }
        },
        _moveLabel: function(c) {
            this.label.setLatLng(c.latlng)
        }
    };
    a.Icon.Default.mergeOptions({
        labelAnchor: new a.Point(9,-20)
    });
    a.Marker.mergeOptions({
        icon: new a.Icon.Default()
    });
    a.Marker.include(a.BaseMarkerMethods);
    a.Marker.include({
        _originalUpdateZIndex: a.Marker.prototype._updateZIndex,
        _updateZIndex: function(c) {
            var d = this._zIndex + c;
            this._originalUpdateZIndex(c);
            if (this.label) {
                this.label.updateZIndex(d)
            }
        },
        _originalSetOpacity: a.Marker.prototype.setOpacity,
        setOpacity: function(d, c) {
            this.options.labelHasSemiTransparency = c;
            this._originalSetOpacity(d)
        },
        _originalUpdateOpacity: a.Marker.prototype._updateOpacity,
        _updateOpacity: function() {
            var c = this.options.opacity === 0 ? 0 : 1;
            this._originalUpdateOpacity();
            if (this.label) {
                this.label.setOpacity(this.options.labelHasSemiTransparency ? this.options.opacity : c)
            }
        },
        _originalSetLatLng: a.Marker.prototype.setLatLng,
        setLatLng: function(c) {
            if (this.label && !this._labelNoHide) {
                this.hideLabel()
            }
            return this._originalSetLatLng(c)
        }
    });
    a.CircleMarker.mergeOptions({
        labelAnchor: new a.Point(0,0)
    });
    a.CircleMarker.include(a.BaseMarkerMethods);
    a.Path.include({
        bindLabel: function(c, d) {
            if (!this.label || this.label.options !== d) {
                this.label = new b(d,this)
            }
            this.label.setContent(c);
            if (!this._showLabelAdded) {
                this.on("mouseover", this._showLabel, this).on("mousemove", this._moveLabel, this).on("mouseout remove", this._hideLabel, this);
                if (a.Browser.touch) {
                    this.on("click", this._showLabel, this)
                }
                this._showLabelAdded = true
            }
            return this
        },
        unbindLabel: function() {
            if (this.label) {
                this._hideLabel();
                this.label = null;
                this._showLabelAdded = false;
                this.off("mouseover", this._showLabel, this).off("mousemove", this._moveLabel, this).off("mouseout remove", this._hideLabel, this)
            }
            return this
        },
        updateLabelContent: function(c) {
            if (this.label) {
                this.label.setContent(c)
            }
        },
        _showLabel: function(c) {
            this.label.setLatLng(c.latlng);
            this._map.addLayer(this.label)
        },
        _moveLabel: function(c) {
            this.label.setLatLng(c.latlng)
        },
        _hideLabel: function() {
            this.label.close()
        }
    });
    a.FeatureGroup.include({
        clearLayers: function() {
            this.unbindLabel();
            this.eachLayer(this.removeLayer, this);
            return this
        },
        bindLabel: function(c, d) {
            return this.invoke("bindLabel", c, d)
        },
        unbindLabel: function() {
            return this.invoke("unbindLabel")
        },
        updateLabelContent: function(c) {
            this.invoke("updateLabelContent", c)
        }
    });
    return b
}, window));
L.Grid = L.LayerGroup.extend({
    options: {
        xticks: 8,
        yticks: 5,
        coordStyle: "MinDec",
        coordTemplates: {
            MinDec: "{degAbs}&deg;&nbsp;{minDec}'{dir}",
            DMS: "{degAbs}{dir}{min}'{sec}\""
        },
        lineStyle: {
            stroke: true,
            color: "#666",
            opacity: 0.5,
            weight: 1,
            dashArray: "5,5"
        },
        redraw: "move"
    },
    initialize: function(a) {
        L.LayerGroup.prototype.initialize.call(this);
        L.Util.setOptions(this, a)
    },
    onAdd: function(b) {
        this._map = b;
        var a = this.redraw();
        this._map.on("viewreset " + this.options.redraw, function() {
            a.redraw()
        });
        this.eachLayer(b.addLayer, b)
    },
    onRemove: function(a) {
        a.off("viewreset " + this.options.redraw, this.map);
        this.eachLayer(this.removeLayer, this)
    },
    redraw: function() {
        this._bounds = this._map.getBounds().pad(0.5);
        var a = [];
        var b;
        var c = this._latLines();
        for (b in c) {
            if (Math.abs(c[b]) > 90) {
                continue
            }
            a.push(this._horizontalLine(c[b]));
            a.push(this._label("lat", c[b]))
        }
        var d = this._lngLines();
        for (b in d) {
            a.push(this._verticalLine(d[b]));
            a.push(this._label("lng", d[b]))
        }
        this.eachLayer(this.removeLayer, this);
        for (b in a) {
            this.addLayer(a[b])
        }
        return this
    },
    _latLines: function() {
        return this._lines(this._bounds.getSouth(), this._bounds.getNorth(), this.options.yticks * 2, this._containsEquator())
    },
    _lngLines: function() {
        return this._lines(this._bounds.getWest(), this._bounds.getEast(), this.options.xticks * 2, this._containsIRM())
    },
    _lines: function(f, c, h, a) {
        var b = f - c
          , g = this._round(b / h, b);
        if (a) {
            f = Math.floor(f / g) * g
        } else {
            f = this._snap(f, g)
        }
        var e = [];
        for (var d = -1; d <= h; d++) {
            e.push(f - (d * g))
        }
        return e
    },
    _containsEquator: function() {
        var a = this._map.getBounds();
        return a.getSouth() < 0 && a.getNorth() > 0
    },
    _containsIRM: function() {
        var a = this._map.getBounds();
        return a.getWest() < 0 && a.getEast() > 0
    },
    _verticalLine: function(a) {
        return new L.Polyline([[this._bounds.getNorth(), a], [this._bounds.getSouth(), a]],this.options.lineStyle)
    },
    _horizontalLine: function(a) {
        return new L.Polyline([[a, this._bounds.getWest()], [a, this._bounds.getEast()]],this.options.lineStyle)
    },
    _snap: function(b, a) {
        return Math.floor(b / a) * a
    },
    _round: function(c, a) {
        var d;
        a = Math.abs(a);
        if (a >= 1) {
            if (Math.abs(c) > 1) {
                d = Math.round(c)
            } else {
                d = (c < 0) ? Math.floor(c) : Math.ceil(c)
            }
        } else {
            var b = this._dec2dms(a);
            if (b.min >= 1) {
                d = Math.ceil(b.min) * 60
            } else {
                d = Math.ceil(b.minDec * 60)
            }
        }
        return d
    },
    _label: function(a, d) {
        var c;
        var b = this._map.getBounds().pad(-0.005);
        if (a == "lng") {
            c = L.latLng(b.getNorth(), d)
        } else {
            c = L.latLng(d, b.getWest())
        }
        return L.marker(c, {
            icon: L.divIcon({
                iconSize: [0, 0],
                className: "leaflet-grid-label",
                html: '<div class="' + a + '">' + this.formatCoord(d, a) + "</div>"
            })
        })
    },
    _dec2dms: function(c) {
        var a = Math.floor(c);
        var b = ((c - a) * 60);
        var d = Math.floor((b - Math.floor(b)) * 60);
        return {
            deg: a,
            degAbs: Math.abs(a),
            min: Math.floor(b),
            minDec: b,
            sec: d
        }
    },
    formatCoord: function(e, a, f) {
        if (!f) {
            f = this.options.coordStyle
        }
        if (f == "decimal") {
            var b;
            if (e >= 10) {
                b = 2
            } else {
                if (e >= 1) {
                    b = 3
                } else {
                    b = 4
                }
            }
            return e.toFixed(b)
        } else {
            var d = this._dec2dms(e);
            var c;
            if (d.deg === 0) {
                c = "&nbsp;"
            } else {
                if (a == "lat") {
                    c = (d.deg > 0 ? "N" : "S")
                } else {
                    c = (d.deg > 0 ? "E" : "W")
                }
            }
            return L.Util.template(this.options.coordTemplates[f], L.Util.extend(d, {
                dir: c,
                minDec: Math.round(d.minDec, 2)
            }))
        }
    }
});
L.grid = function(a) {
    return new L.Grid(a)
}
;
/*
 * jQuery blockUI plugin
 * Version 2.66.0-2013.10.09
 * Requires jQuery v1.7 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2013 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */
(function() {
    function a(b) {
        b.fn._fadeIn = b.fn.fadeIn;
        var k = b.noop || function() {}
        ;
        var j = /MSIE/.test(navigator.userAgent);
        var g = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent);
        var i = document.documentMode || 0;
        var p = b.isFunction(document.createElement("div").style.setExpression);
        b.blockUI = function(r) {
            h(window, r)
        }
        ;
        b.unblockUI = function(r) {
            n(window, r)
        }
        ;
        b.growlUI = function(x, t, w, v) {
            var r = b('<div class="growlUI"></div>');
            if (x) {
                r.append("<h1>" + x + "</h1>")
            }
            if (t) {
                r.append("<h2>" + t + "</h2>")
            }
            if (w === undefined) {
                w = 3000
            }
            var s = function(y) {
                y = y || {};
                b.blockUI({
                    message: r,
                    fadeIn: typeof y.fadeIn !== "undefined" ? y.fadeIn : 700,
                    fadeOut: typeof y.fadeOut !== "undefined" ? y.fadeOut : 1000,
                    timeout: typeof y.timeout !== "undefined" ? y.timeout : w,
                    centerY: false,
                    showOverlay: false,
                    onUnblock: v,
                    css: b.blockUI.defaults.growlCSS
                })
            };
            s();
            var u = r.css("opacity");
            r.mouseover(function() {
                s({
                    fadeIn: 0,
                    timeout: 30000
                });
                var y = b(".blockMsg");
                y.stop();
                y.fadeTo(300, 1)
            }).mouseout(function() {
                b(".blockMsg").fadeOut(1000)
            })
        }
        ;
        b.fn.block = function(s) {
            if (this[0] === window) {
                b.blockUI(s);
                return this
            }
            var r = b.extend({}, b.blockUI.defaults, s || {});
            this.each(function() {
                var t = b(this);
                if (r.ignoreIfBlocked && t.data("blockUI.isBlocked")) {
                    return
                }
                t.unblock({
                    fadeOut: 0
                })
            });
            return this.each(function() {
                if (b.css(this, "position") == "static") {
                    this.style.position = "relative";
                    b(this).data("blockUI.static", true)
                }
                this.style.zoom = 1;
                h(this, s)
            })
        }
        ;
        b.fn.unblock = function(r) {
            if (this[0] === window) {
                b.unblockUI(r);
                return this
            }
            return this.each(function() {
                n(this, r)
            })
        }
        ;
        b.blockUI.version = 2.66;
        b.blockUI.defaults = {
            message: "<h1>Please wait...</h1>",
            title: null,
            draggable: true,
            theme: false,
            css: {
                padding: 0,
                margin: 0,
                width: "30%",
                top: "30%",
                left: "35%",
                textAlign: "center",
                color: "#8CA8B7",
                backgroundColor: "#fff",
                cursor: "wait"
            },
            themedCSS: {
                width: "30%",
                top: "40%",
                left: "35%"
            },
            overlayCSS: {
                backgroundColor: "#8CA8B7",
                opacity: 0.6,
                cursor: "wait"
            },
            cursorReset: "default",
            growlCSS: {
                width: "350px",
                top: "10px",
                left: "",
                right: "10px",
                border: "none",
                padding: "5px",
                opacity: 0.6,
                cursor: "default",
                color: "#fff",
                backgroundColor: "#000",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                "border-radius": "10px"
            },
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank",
            forceIframe: false,
            baseZ: 100000000,
            centerX: true,
            centerY: true,
            allowBodyStretch: true,
            bindEvents: true,
            constrainTabKey: true,
            fadeIn: 200,
            fadeOut: 400,
            timeout: 0,
            showOverlay: true,
            focusInput: true,
            focusableElements: ":input:enabled:visible",
            onBlock: null,
            onUnblock: null,
            onOverlayClick: null,
            quirksmodeOffsetHack: 4,
            blockMsgClass: "blockMsg",
            ignoreIfBlocked: false
        };
        var l = null;
        var m = [];
        function h(A, N) {
            var x, Q;
            var E = (A == window);
            var K = (N && N.message !== undefined ? N.message : undefined);
            N = b.extend({}, b.blockUI.defaults, N || {});
            if (N.ignoreIfBlocked && b(A).data("blockUI.isBlocked")) {
                return
            }
            N.overlayCSS = b.extend({}, b.blockUI.defaults.overlayCSS, N.overlayCSS || {});
            x = b.extend({}, b.blockUI.defaults.css, N.css || {});
            if (N.onOverlayClick) {
                N.overlayCSS.cursor = "pointer"
            }
            Q = b.extend({}, b.blockUI.defaults.themedCSS, N.themedCSS || {});
            K = K === undefined ? N.message : K;
            if (E && l) {
                n(window, {
                    fadeOut: 0
                })
            }
            if (K && typeof K != "string" && (K.parentNode || K.jquery)) {
                var M = K.jquery ? K[0] : K;
                var y = {};
                b(A).data("blockUI.history", y);
                y.el = M;
                y.parent = M.parentNode;
                y.display = M.style.display;
                y.position = M.style.position;
                if (y.parent) {
                    y.parent.removeChild(M)
                }
            }
            b(A).data("blockUI.onUnblock", N.onUnblock);
            var S = N.baseZ;
            var H, I, J, O;
            if (j || N.forceIframe) {
                H = b('<iframe class="blockUI" style="z-index:' + (S++) + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + N.iframeSrc + '"></iframe>')
            } else {
                H = b('<div class="blockUI" style="display:none"></div>')
            }
            if (N.theme) {
                I = b('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + (S++) + ';display:none"></div>')
            } else {
                I = b('<div class="blockUI blockOverlay" style="z-index:' + (S++) + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>')
            }
            if (N.theme && E) {
                O = '<div class="blockUI ' + N.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (S + 10) + ';display:none;position:fixed">';
                if (N.title) {
                    O += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (N.title || "&nbsp;") + "</div>"
                }
                O += '<div class="ui-widget-content ui-dialog-content"></div>';
                O += "</div>"
            } else {
                if (N.theme) {
                    O = '<div class="blockUI ' + N.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (S + 10) + ';display:none;position:absolute">';
                    if (N.title) {
                        O += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (N.title || "&nbsp;") + "</div>"
                    }
                    O += '<div class="ui-widget-content ui-dialog-content"></div>';
                    O += "</div>"
                } else {
                    if (E) {
                        O = '<div class="blockUI ' + N.blockMsgClass + ' blockPage" style="z-index:' + (S + 10) + ';display:none;position:fixed"></div>'
                    } else {
                        O = '<div class="blockUI ' + N.blockMsgClass + ' blockElement" style="z-index:' + (S + 10) + ';display:none;position:absolute"></div>'
                    }
                }
            }
            J = b(O);
            if (K) {
                if (N.theme) {
                    J.css(Q);
                    J.addClass("ui-widget-content")
                } else {
                    J.css(x)
                }
            }
            if (!N.theme) {
                I.css(N.overlayCSS)
            }
            I.css("position", E ? "fixed" : "absolute");
            if (j || N.forceIframe) {
                H.css("opacity", 0)
            }
            var G = [H, I, J]
              , r = E ? b("body") : b(A);
            b.each(G, function() {
                this.appendTo(r)
            });
            if (N.theme && N.draggable && b.fn.draggable) {
                J.draggable({
                    handle: ".ui-dialog-titlebar",
                    cancel: "li"
                })
            }
            var B = p && (!b.support.boxModel || b("object,embed", E ? null : A).length > 0);
            if (g || B) {
                if (E && N.allowBodyStretch && b.support.boxModel) {
                    b("html,body").css("height", "100%")
                }
                if ((g || !b.support.boxModel) && !E) {
                    var P = q(A, "borderTopWidth")
                      , F = q(A, "borderLeftWidth");
                    var D = P ? "(0 - " + P + ")" : 0;
                    var C = F ? "(0 - " + F + ")" : 0
                }
                b.each(G, function(z, T) {
                    var U = T[0].style;
                    U.position = "absolute";
                    if (z < 2) {
                        if (E) {
                            U.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" + N.quirksmodeOffsetHack + ') + "px"')
                        } else {
                            U.setExpression("height", 'this.parentNode.offsetHeight + "px"')
                        }
                        if (E) {
                            U.setExpression("width", 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"')
                        } else {
                            U.setExpression("width", 'this.parentNode.offsetWidth + "px"')
                        }
                        if (C) {
                            U.setExpression("left", C)
                        }
                        if (D) {
                            U.setExpression("top", D)
                        }
                    } else {
                        if (N.centerY) {
                            if (E) {
                                U.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"')
                            }
                            U.marginTop = 0
                        } else {
                            if (!N.centerY && E) {
                                var V = (N.css && N.css.top) ? parseInt(N.css.top, 10) : 0;
                                var t = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + V + ') + "px"';
                                U.setExpression("top", t)
                            }
                        }
                    }
                })
            }
            if (K) {
                if (N.theme) {
                    J.find(".ui-widget-content").append(K)
                } else {
                    J.append(K)
                }
                if (K.jquery || K.nodeType) {
                    b(K).show()
                }
            }
            if ((j || N.forceIframe) && N.showOverlay) {
                H.show()
            }
            if (N.fadeIn) {
                var u = N.onBlock ? N.onBlock : k;
                var v = (N.showOverlay && !K) ? u : k;
                var w = K ? u : k;
                if (N.showOverlay) {
                    I._fadeIn(N.fadeIn, v)
                }
                if (K) {
                    J._fadeIn(N.fadeIn, w)
                }
            } else {
                if (N.showOverlay) {
                    I.show()
                }
                if (K) {
                    J.show()
                }
                if (N.onBlock) {
                    N.onBlock()
                }
            }
            c(1, A, N);
            if (E) {
                l = J[0];
                m = b(N.focusableElements, l);
                if (N.focusInput) {
                    setTimeout(e, 20)
                }
            } else {
                d(J[0], N.centerX, N.centerY)
            }
            if (N.timeout) {
                var R = setTimeout(function() {
                    if (E) {
                        b.unblockUI(N)
                    } else {
                        b(A).unblock(N)
                    }
                }, N.timeout);
                b(A).data("blockUI.timeout", R)
            }
        }
        function n(u, x) {
            var s;
            var w = (u == window);
            var r = b(u);
            var t = r.data("blockUI.history");
            var y = r.data("blockUI.timeout");
            if (y) {
                clearTimeout(y);
                r.removeData("blockUI.timeout")
            }
            x = b.extend({}, b.blockUI.defaults, x || {});
            c(0, u, x);
            if (x.onUnblock === null) {
                x.onUnblock = r.data("blockUI.onUnblock");
                r.removeData("blockUI.onUnblock")
            }
            var v;
            if (w) {
                v = b("body").children().filter(".blockUI").add("body > .blockUI")
            } else {
                v = r.find(">.blockUI")
            }
            if (x.cursorReset) {
                if (v.length > 1) {
                    v[1].style.cursor = x.cursorReset
                }
                if (v.length > 2) {
                    v[2].style.cursor = x.cursorReset
                }
            }
            if (w) {
                l = m = null
            }
            if (x.fadeOut) {
                s = v.length;
                v.stop().fadeOut(x.fadeOut, function() {
                    if (--s === 0) {
                        o(v, t, x, u)
                    }
                })
            } else {
                o(v, t, x, u)
            }
        }
        function o(x, u, y, v) {
            var r = b(v);
            if (r.data("blockUI.isBlocked")) {
                return
            }
            x.each(function(w, A) {
                if (this.parentNode) {
                    this.parentNode.removeChild(this)
                }
            });
            if (u && u.el) {
                u.el.style.display = u.display;
                u.el.style.position = u.position;
                if (u.parent) {
                    u.parent.appendChild(u.el)
                }
                r.removeData("blockUI.history")
            }
            if (r.data("blockUI.static")) {
                r.css("position", "static")
            }
            if (typeof y.onUnblock == "function") {
                y.onUnblock(v, y)
            }
            var s = b(document.body)
              , z = s.width()
              , t = s[0].style.width;
            s.width(z - 1).width(z);
            s[0].style.width = t
        }
        function c(s, t, w) {
            var v = t == window
              , r = b(t);
            if (!s && (v && !l || !v && !r.data("blockUI.isBlocked"))) {
                return
            }
            r.data("blockUI.isBlocked", s);
            if (!v || !w.bindEvents || (s && !w.showOverlay)) {
                return
            }
            var u = "mousedown mouseup keydown keypress keyup touchstart touchend touchmove";
            if (s) {
                b(document).bind(u, w, f)
            } else {
                b(document).unbind(u, f)
            }
        }
        function f(s) {
            if (s.type === "keydown" && s.keyCode && s.keyCode == 9) {
                if (l && s.data.constrainTabKey) {
                    var t = m;
                    var u = !s.shiftKey && s.target === t[t.length - 1];
                    var r = s.shiftKey && s.target === t[0];
                    if (u || r) {
                        setTimeout(function() {
                            e(r)
                        }, 10);
                        return false
                    }
                }
            }
            var v = s.data;
            var w = b(s.target);
            if (w.hasClass("blockOverlay") && v.onOverlayClick) {
                v.onOverlayClick(s)
            }
            if (w.parents("div." + v.blockMsgClass).length > 0) {
                return true
            }
            return w.parents().children().filter("div.blockUI").length === 0
        }
        function e(r) {
            if (!m) {
                return
            }
            var s = m[r === true ? m.length - 1 : 0];
            if (s) {
                s.focus()
            }
        }
        function d(r, A, B) {
            var v = r.parentNode
              , w = r.style;
            var u = ((v.offsetWidth - r.offsetWidth) / 2) - q(v, "borderLeftWidth");
            var z = ((v.offsetHeight - r.offsetHeight) / 2) - q(v, "borderTopWidth");
            if (A) {
                w.left = u > 0 ? (u + "px") : "0"
            }
            if (B) {
                w.top = z > 0 ? (z + "px") : "0"
            }
        }
        function q(r, s) {
            return parseInt(b.css(r, s), 10) || 0
        }
    }
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define(["jquery"], a)
    } else {
        a(jQuery)
    }
}
)();
