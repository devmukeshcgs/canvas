window.R = {},
    R.iLerp = (t, r, e) => R.Clamp((e - t) / (r - t), 0, 1),
    R.Lerp = (t, r, e) => t * (1 - e) + r * e,
    R.Damp = (t, r, e) => R.Lerp(t, r, 1 - Math.exp(Math.log(1 - e) * RD)),
    R.Remap = (t, r, e, s, i) => R.Lerp(e, s, R.iLerp(t, r, i)),
    R.M = class {
        constructor(t) {
            R.BM(this, ["gRaf", "run", "uSvg", "uLine", "uProp"]),
                this.v = this.vInit(t),
                this.raf = new R.RafR(this.run)
        }
        vInit(r) {
            const i = {
                el: R.Select.el(r.el),
                e: {
                    curve: r.e || "linear"
                },
                d: {
                    origin: r.d || 0,
                    curr: 0
                },
                delay: r.delay || 0,
                cb: r.cb || !1,
                r: r.r || 2,
                prog: 0,
                progE: 0,
                elapsed: 0
            };
            i.elL = i.el.length,
                R.Has(r, "update") ? i.up = t => {
                    r.update(i)
                }
                    : R.Has(r, "svg") ? i.up = this.uSvg : R.Has(r, "line") ? i.up = this.uLine : i.up = this.uProp;
            var e = r.p || !1
                , t = r.svg || !1
                , a = r.line || !1;
            let s = !1;
            if (e) {
                i.prop = {},
                    i.propI = [];
                var n = Object.keys(e);
                i.propL = n.length;
                for (let t = 0; t < i.propL; t++) {
                    var o = n[t]
                        , o = (i.prop[t] = {
                            name: o,
                            origin: {
                                start: e[o][0],
                                end: e[o][1]
                            },
                            curr: e[o][0],
                            start: e[o][0],
                            end: e[o][1],
                            unit: e[o][2] || "%"
                        },
                            o.charAt(0))
                        , h = "r" === o && s ? "r2" : o;
                    s = "r" === o,
                        i.propI[h] = t
                }
            } else if (t)
                i.svg = {
                    type: t.type,
                    attr: "polygon" === t.type ? "points" : "d",
                    end: t.end,
                    originArr: {},
                    arr: {},
                    val: []
                },
                    i.svg.start = t.start || i.el[0].getAttribute(i.svg.attr),
                    i.svg.curr = i.svg.start,
                    i.svg.originArr.start = R.Svg.split(i.svg.start),
                    i.svg.originArr.end = R.Svg.split(i.svg.end),
                    i.svg.arr.start = i.svg.originArr.start,
                    i.svg.arr.end = i.svg.originArr.end,
                    i.svg.arrL = i.svg.arr.start.length;
            else if (a) {
                i.line = {
                    dashed: a.dashed,
                    coeff: {
                        start: R.Is.def(a.start) ? (100 - a.start) / 100 : 1,
                        end: R.Is.def(a.end) ? (100 - a.end) / 100 : 0
                    },
                    shapeL: [],
                    origin: {
                        start: [],
                        end: []
                    },
                    curr: [],
                    start: [],
                    end: []
                };
                for (let s = 0; s < i.elL; s++) {
                    var l = a.elWL || i.el[s];
                    i.line.shapeL[s] = R.Svg.shapeL(l);
                    let t;
                    if (i.line.dashed) {
                        var d = i.line.dashed;
                        let r = 0;
                        var v = d.split(/[\s,]/)
                            , p = v.length;
                        for (let t = 0; t < p; t++)
                            r += parseFloat(v[t]) || 0;
                        let e = "";
                        var u = Math.ceil(i.line.shapeL[s] / r);
                        for (let t = 0; t < u; t++)
                            e += d + " ";
                        t = e + "0 " + i.line.shapeL[s]
                    } else
                        t = i.line.shapeL[s];
                    i.el[s].style.strokeDasharray = t,
                        i.line.origin.start[s] = i.line.coeff.start * i.line.shapeL[s],
                        i.line.origin.end[s] = i.line.coeff.end * i.line.shapeL[s],
                        i.line.curr[s] = i.line.origin.start[s],
                        i.line.start[s] = i.line.origin.start[s],
                        i.line.end[s] = i.line.origin.end[s]
                }
            }
            return i
        }
        play(t) {
            this.pause(),
                this.vUpd(t),
                this.delay.run()
        }
        pause() {
            this.raf.stop(),
                this.delay && this.delay.stop()
        }
        vUpd(t) {
            var r = t || {}
                , e = R.Has(r, "reverse") ? "start" : "end";
            if (R.Has(this.v, "prop"))
                for (let t = 0; t < this.v.propL; t++)
                    this.v.prop[t].end = this.v.prop[t].origin[e],
                        this.v.prop[t].start = this.v.prop[t].curr,
                        R.Has(r, "p") && R.Has(r.p, this.v.prop[t].name) && (R.Has(r.p[this.v.prop[t].name], "newEnd") && (this.v.prop[t].end = r.p[this.v.prop[t].name].newEnd),
                            R.Has(r.p[this.v.prop[t].name], "newStart")) && (this.v.prop[t].start = r.p[this.v.prop[t].name].newStart);
            else if (R.Has(this.v, "svg"))
                R.Has(r, "svg") && R.Has(r.svg, "start") ? this.v.svg.arr.start = r.svg.start : this.v.svg.arr.start = R.Svg.split(this.v.svg.curr),
                    R.Has(r, "svg") && R.Has(r.svg, "end") ? this.v.svg.arr.end = r.svg.end : this.v.svg.arr.end = this.v.svg.originArr[e];
            else if (R.Has(this.v, "line")) {
                for (let t = 0; t < this.v.elL; t++)
                    this.v.line.start[t] = this.v.line.curr[t];
                if (R.Has(r, "line") && R.Has(r.line, "end")) {
                    this.v.line.coeff.end = (100 - r.line.end) / 100;
                    for (let t = 0; t < this.v.elL; t++)
                        this.v.line.end[t] = this.v.line.coeff.end * this.v.line.shapeL[t]
                } else
                    for (let t = 0; t < this.v.elL; t++)
                        this.v.line.end[t] = this.v.line.origin[e][t]
            }
            this.v.d.curr = R.Has(r, "d") ? r.d : R.R(this.v.d.origin - this.v.d.curr + this.v.elapsed),
                this.v.e.curve = r.e || this.v.e.curve,
                this.v.e.calc = R.Is.str(this.v.e.curve) ? R.Ease[this.v.e.curve] : R.Ease4(this.v.e.curve),
                this.v.delay = (R.Has(r, "delay") ? r : this.v).delay,
                this.v.cb = (R.Has(r, "cb") ? r : this.v).cb,
                this.v.prog = this.v.progE = 0 === this.v.d.curr ? 1 : 0,
                this.delay = new R.Delay(this.gRaf, this.v.delay)
        }
        gRaf() {
            this.raf.run()
        }
        run(t) {
            1 === this.v.prog ? (this.pause(),
                this.v.up(),
                this.v.cb && this.v.cb()) : (this.v.elapsed = R.Clamp(t, 0, this.v.d.curr),
                    this.v.prog = R.Clamp(this.v.elapsed / this.v.d.curr, 0, 1),
                    this.v.progE = this.v.e.calc(this.v.prog),
                    this.v.up())
        }
        uProp() {
            var r = this.v.prop
                , t = this.v.propI;
            for (let t = 0; t < this.v.propL; t++)
                r[t].curr = this.lerp(r[t].start, r[t].end);
            var e = R.Has(t, "x") ? r[t.x].curr + r[t.x].unit : 0
                , s = R.Has(t, "y") ? r[t.y].curr + r[t.y].unit : 0
                , e = e + s === 0 ? 0 : "translate3d(" + e + "," + s + ",0)"
                , s = R.Has(t, "r") ? r[t.r].name + "(" + r[t.r].curr + "deg)" : 0
                , i = R.Has(t, "r2") ? r[t.r2].name + "(" + r[t.r2].curr + "deg)" : 0
                , a = R.Has(t, "s") ? r[t.s].name + "(" + r[t.s].curr + ")" : 0
                , n = e + s + i + a === 0 ? 0 : [e, s, i, a].filter(t => 0 !== t).join(" ")
                , o = R.Has(t, "o") ? r[t.o].curr : -1;
            for (let t = 0; t < this.v.elL && !R.Is.und(this.v.el[t]); t++)
                0 !== n && (this.v.el[t].style.transform = n),
                    0 <= o && (this.v.el[t].style.opacity = o)
        }
        uSvg() {
            var r = this.v.svg;
            r.currTemp = "";
            for (let t = 0; t < r.arrL; t++)
                r.val[t] = isNaN(r.arr.start[t]) ? r.arr.start[t] : this.lerp(r.arr.start[t], r.arr.end[t]),
                    r.currTemp += r.val[t] + " ",
                    r.curr = r.currTemp.trim();
            for (let t = 0; t < this.v.elL && !R.Is.und(this.v.el[t]); t++)
                this.v.el[t].setAttribute(r.attr, r.curr)
        }
        uLine() {
            var r = this.v.line;
            for (let t = 0; t < this.v.elL; t++) {
                var e = this.v.el[t].style;
                r.curr[t] = this.lerp(r.start[t], r.end[t]),
                    e.strokeDashoffset = r.curr[t],
                    0 === this.v.prog && (e.opacity = 1)
            }
        }
        lerp(t, r) {
            return R.R(R.Lerp(t, r, this.v.progE), this.v.r)
        }
    }
    ,
    R.TL = class {
        constructor() {
            this.arr = [],
                this.del = 0
        }
        from(t) {
            this.del += R.Has(t, "delay") ? t.delay : 0,
                t.delay = this.del,
                this.arr.push(new R.M(t))
        }
        play(t) {
            this.run("play", t)
        }
        pause() {
            this.run("pause")
        }
        run(r, t) {
            var e = this.arr.length
                , s = t || void 0;
            for (let t = 0; t < e; t++)
                this.arr[t][r](s)
        }
    }
    ,
    R.BM = (r, e) => {
        var s = e.length;
        for (let t = 0; t < s; t++)
            r[e[t]] = r[e[t]].bind(r)
    }
    ,
    R.Clamp = (t, r, e) => Math.min(Math.max(t, r), e),
    R.Delay = class {
        constructor(t, r) {
            this.cb = t,
                this.d = r,
                R.BM(this, ["loop"]),
                this.raf = new R.RafR(this.loop)
        }
        run() {
            0 === this.d ? this.cb() : this.raf.run()
        }
        stop() {
            this.raf.stop()
        }
        loop(t) {
            t = R.Clamp(t, 0, this.d);
            1 === R.Clamp(t / this.d, 0, 1) && (this.stop(),
                this.cb())
        }
    }
    ,
    R.Ease = {
        linear: t => t,
        i1: t => 1 - Math.cos(t * (.5 * Math.PI)),
        o1: t => Math.sin(t * (.5 * Math.PI)),
        io1: t => -.5 * (Math.cos(Math.PI * t) - 1),
        i2: t => t * t,
        o2: t => t * (2 - t),
        io2: t => t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1,
        i3: t => t * t * t,
        o3: t => --t * t * t + 1,
        io3: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        i4: t => t * t * t * t,
        o4: t => 1 - --t * t * t * t,
        io4: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
        i5: t => t * t * t * t * t,
        o5: t => 1 + --t * t * t * t * t,
        io5: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
        i6: t => 0 === t ? 0 : 2 ** (10 * (t - 1)),
        o6: t => 1 === t ? 1 : 1 - 2 ** (-10 * t),
        io6: t => 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * 2 ** (10 * (t - 1)) : .5 * (2 - 2 ** (-10 * --t))
    },
    R.r0 = (t, r) => 1 - 3 * r + 3 * t,
    R.r1 = (t, r) => 3 * r - 6 * t,
    R.r2 = (t, r, e) => ((R.r0(r, e) * t + R.r1(r, e)) * t + 3 * r) * t,
    R.r3 = (t, r, e) => 3 * R.r0(r, e) * t * t + 2 * R.r1(r, e) * t + 3 * r,
    R.r4 = (t, r, e, s, i) => {
        let a, n, o = 0;
        for (; n = r + .5 * (e - r),
            0 < (a = R.r2(n, s, i) - t) ? e = n : r = n,
            1e-7 < Math.abs(a) && ++o < 10;)
            ;
        return n
    }
    ,
    R.r5 = (r, e, s, i) => {
        for (let t = 0; t < 4; ++t) {
            var a = R.r3(e, s, i);
            if (0 === a)
                return e;
            e -= (R.r2(e, s, i) - r) / a
        }
        return e
    }
    ,
    R.Ease4 = t => {
        const a = t[0]
            , r = t[1]
            , n = t[2]
            , e = t[3];
        let o = new Float32Array(11);
        if (a !== r || n !== e)
            for (let t = 0; t < 11; ++t)
                o[t] = R.r2(.1 * t, a, n);
        return t => a === r && n === e ? t : 0 === t ? 0 : 1 === t ? 1 : R.r2(function (t) {
            let r = 0;
            for (var e = 1; 10 !== e && o[e] <= t; ++e)
                r += .1;
            --e;
            var s = (t - o[e]) / (o[e + 1] - o[e])
                , s = r + .1 * s
                , i = R.r3(s, a, n);
            return .001 <= i ? R.r5(t, s, a, n) : 0 === i ? s : R.r4(t, i, i + .1, a, n)
        }(t), r, e)
    }
    ,
    R.Fetch = r => {
        var t = "json" === r.type;
        const e = t ? "json" : "text";
        var s = {
            method: t ? "POST" : "GET",
            headers: new Headers({
                "Content-type": t ? "application/x-www-form-urlencoded" : "text/html"
            }),
            mode: "same-origin"
        };
        t && (s.body = r.body),
            fetch(r.url, s).then(t => {
                if (t.ok)
                    return t[e]();
                r.error && r.error()
            }
            ).then(t => {
                r.success(t)
            }
            )
    }
    ,
    R.Has = (t, r) => t.hasOwnProperty(r),
    R.Is = {
        str: t => "string" == typeof t,
        obj: t => t === Object(t),
        arr: t => t.constructor === Array,
        def: t => void 0 !== t,
        und: t => void 0 === t
    },
    R.Lerp = (t, r, e) => t * (1 - e) + r * e,
    R.PCurve = (t, r, e) => {
        return (r + e) ** (r + e) / (r ** r * e ** e) * t ** r * (1 - t) ** e
    }
    ,
    R.R = (t, r) => {
        r = R.Is.und(r) ? 100 : 10 ** r;
        return Math.round(t * r) / r
    }
    ,
    R.Select = {
        el: t => {
            let r = [];
            var e;
            return R.Is.str(t) ? (e = t.substring(1),
                "#" === t.charAt(0) ? r[0] = R.G.id(e) : r = R.G.class(e)) : r[0] = t,
                r
        }
        ,
        type: t => "#" === t.charAt(0) ? "id" : "class",
        name: t => t.substring(1)
    },
    R.L = (t, r, e, s) => {
        var i = document
            , a = R.Select.el(t)
            , n = a.length;
        let o = e;
        var t = "wheel"
            , h = "mouse"
            , l = [h + "Wheel", h + "move", "touchmove", "touchstart"]
            , d = -1 !== l.indexOf(e) && {
                passive: !1
            }
            , v = (e === l[0] ? o = "on" + t in i ? t : R.Is.def(i.onmousewheel) ? h + t : "DOMMouseScroll" : "focusOut" === e && (o = R.Snif.isFirefox ? "blur" : "focusout"),
                "a" === r ? "add" : "remove");
        for (let t = 0; t < n; t++)
            a[t][v + "EventListener"](o, s, d)
    }
    ;
const Tab = class {
    constructor() {
        this.arr = [],
            this.pause = 0,
            R.BM(this, ["v"]),
            R.L(document, "a", "visibilitychange", this.v)
    }
    add(t) {
        this.arr.push(t)
    }
    v() {
        var t = performance.now();
        let r, e;
        e = document.hidden ? (this.pause = t,
            "stop") : (r = t - this.pause,
                "start");
        for (let t = this.l(); 0 <= t; t--)
            this.arr[t][e](r)
    }
    l() {
        return this.arr.length - 1
    }
}
    ;
R.Tab = new Tab;
let RD = 0;
const FR = 1e3 / 60
    , Raf = (R.Raf = class {
        constructor() {
            this._ = [],
                this.on = !0,
                R.BM(this, ["loop", "tOff", "tOn"]),
                R.Tab.add({
                    stop: this.tOff,
                    start: this.tOn
                }),
                this.raf()
        }
        tOff() {
            this.on = !1
        }
        tOn(t) {
            this.t = null;
            let r = this.l();
            for (; r--;)
                this._[r].sT += t;
            this.on = !0
        }
        add(t) {
            this._.push(t)
        }
        remove(t) {
            let r = this.l();
            for (; r--;)
                if (this._[r].id === t)
                    return void this._.splice(r, 1)
        }
        loop(r) {
            if (this.on) {
                this.t || (this.t = r),
                    RD = (r - this.t) / FR,
                    this.t = r;
                let t = this.l();
                for (; t--;) {
                    var e, s = this._[t];
                    R.Is.def(s) && (s.sT || (s.sT = r),
                        e = r - s.sT,
                        s.cb(e))
                }
            }
            this.raf()
        }
        raf() {
            requestAnimationFrame(this.loop)
        }
        l() {
            return this._.length
        }
    }
        ,
        new R.Raf);
let RafId = 0;
R.RafR = class {
    constructor(t) {
        this.cb = t,
            this.on = !1,
            this.id = RafId,
            RafId++
    }
    run() {
        this.on || (Raf.add({
            id: this.id,
            cb: this.cb
        }),
            this.on = !0)
    }
    stop() {
        this.on && (Raf.remove(this.id),
            this.on = !1)
    }
}
    ,
    R.Rand = {
        range: (t, r, e) => R.R(Math.random() * (r - t) + t, e),
        uniq: r => {
            var e = [];
            for (let t = 0; t < r; t++)
                e[t] = t;
            let t = r;
            for (var s, i; t--;)
                s = ~~(Math.random() * (t + 1)),
                    i = e[t],
                    e[t] = e[s],
                    e[s] = i;
            return e
        }
    },
    R.Snif = {
        uA: navigator.userAgent.toLowerCase(),
        get iPadIOS13() {
            return "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints
        },
        get isMobile() {
            return /mobi|android|tablet|ipad|iphone/.test(this.uA) || this.iPadIOS13
        },
        get isMobileAndroid() {
            return /android.*mobile/.test(this.uA)
        },
        get isIOS() {
            return (/ipad|iphone/.test(this.uA) || this.iPadIOS13) && !window.MSStream
        },
        get isAndroid() {
            return this.isMobileAndroid || !this.isMobileAndroid && /android/i.test(this.uA)
        },
        get isFirefox() {
            return -1 < this.uA.indexOf("firefox")
        },
        get safari() {
            return this.uA.match(/version\/[\d.]+.*safari/)
        },
        get isSafari() {
            return !!this.safari && !this.isAndroid
        },
        get isSafariOlderThan8() {
            var t;
            let r = 8;
            return this.isSafari && (t = this.safari[0].match(/version\/\d{1,2}/),
                r = +t[0].split("/")[1]),
                r < 8
        },
        get isIEolderThan11() {
            return -1 < this.uA.indexOf("msie")
        },
        get isIE11() {
            return 0 < navigator.appVersion.indexOf("Trident/")
        },
        get isEdge() {
            return -1 < this.uA.indexOf("edge")
        }
    },
    R.Svg = {
        shapeL: s => {
            var t, r, e, i;
            if ("circle" === s.tagName)
                return 2 * s.getAttribute("r") * Math.PI;
            if ("line" === s.tagName)
                return t = s.getAttribute("x1"),
                    r = s.getAttribute("x2"),
                    e = s.getAttribute("y1"),
                    i = s.getAttribute("y2"),
                    Math.sqrt((r -= t) * r + (i -= e) * i);
            if ("polyline" !== s.tagName)
                return s.getTotalLength();
            {
                let r = 0, e;
                var a = s.points.numberOfItems;
                for (let t = 0; t < a; t++) {
                    var n = s.points.getItem(t);
                    0 < t && (r += Math.sqrt((n.x - e.x) ** 2 + (n.y - e.y) ** 2)),
                        e = n
                }
                return r
            }
        }
        ,
        split: t => {
            var r = []
                , e = t.split(" ")
                , s = e.length;
            for (let t = 0; t < s; t++) {
                var i = e[t].split(",")
                    , a = i.length;
                for (let t = 0; t < a; t++) {
                    var n = i[t]
                        , n = isNaN(n) ? n : +n;
                    r.push(n)
                }
            }
            return r
        }
    },
    R.Timer = class {
        constructor(t) {
            this.timer = new R.Delay(t.cb, t.delay)
        }
        run() {
            this.timer.stop(),
                this.timer.run()
        }
    }
    ,
    R.ZL = t => 9 < t ? t : "0" + t,
    R.Cr = t => document.createElement(t),
    R.g = (t, r, e) => {
        return (t || document)["getElement" + r](e)
    }
    ,
    R.G = {
        id: (t, r) => R.g(r, "ById", t),
        class: (t, r) => R.g(r, "sByClassName", t),
        tag: (t, r) => R.g(r, "sByTagName", t)
    },
    R.index = (r, e) => {
        var s = e.length;
        for (let t = 0; t < s; t++)
            if (r === e[t])
                return t;
        return -1
    }
    ,
    R.Index = {
        list: t => R.index(t, t.parentNode.children),
        class: (t, r, e) => R.index(t, R.G.class(r, e))
    },
    R.PD = t => {
        t.cancelable && t.preventDefault()
    }
    ,
    R.RO = class {
        constructor() {
            this.eT = R.Snif.isMobile ? "orientationchange" : "resize",
                this.tick = !1,
                this.arr = [],
                R.BM(this, ["fn", "gRaf", "run"]),
                this.t = new R.Timer({
                    delay: 100,
                    cb: this.gRaf
                }),
                this.raf = new R.RafR(this.run),
                R.L(window, "a", this.eT, this.fn)
        }
        add(t) {
            this.arr.push(t)
        }
        remove(r) {
            for (let t = this.l(); 0 <= t; t--)
                if (this.arr[t].id === r)
                    return void this.arr.splice(t, 1)
        }
        fn(t) {
            this.e = t,
                this.t.run()
        }
        gRaf() {
            this.tick || (this.tick = !0,
                this.raf.run())
        }
        run() {
            for (let t = this.l(); 0 <= t; t--)
                this.arr[t].cb(this.e);
            this.raf.stop(),
                this.tick = !1
        }
        l() {
            return this.arr.length - 1
        }
    }
    ;
const Ro = new R.RO;
let RoId = 0;
R.ROR = class {
    constructor(t) {
        this.cb = t,
            this.id = RoId,
            RoId++
    }
    on() {
        Ro.add({
            id: this.id,
            cb: this.cb
        })
    }
    off() {
        Ro.remove(this.id)
    }
}
    ,
    R.TopReload = t => {
        "scrollRestoration" in history ? history.scrollRestoration = "manual" : window.onbeforeunload = t => {
            window.scrollTo(0, 0)
        }
    }
    ,
    R.O = (t, r) => {
        t.style.opacity = r
    }
    ,
    R.pe = (t, r) => {
        t.style.pointerEvents = r
    }
    ,
    R.PE = {
        all: t => {
            R.pe(t, "all")
        }
        ,
        none: t => {
            R.pe(t, "none")
        }
    },
    R.T = (t, r, e, s) => {
        s = R.Is.und(s) ? "%" : s;
        t.style.transform = "translate3d(" + r + s + "," + e + s + ",0)"
    }
    ;
!function () {
    "use strict";
    class t {
        mutation(t) {
            const i = _A;
            let s = i.config.routes[t];
            s = R.Is.und(s) ? "404" : s;
            const e = i.route.old
                , r = i.route.new;
            i.route.old = r,
                i.route.new = {
                    url: t,
                    page: s
                },
                i.is[r.page] = !1,
                i.is[s] = !0,
                i.was[e.page] = !1,
                i.was[r.page] = !0
        }
    }
    class i {
        constructor(t) {
            this.data = t
        }
        get() {
            let t = this.data[_A.route.new.url];
            return R.Is.und(t) && (t = this.data.p404),
                t
        }
    }
    class s {
        constructor(i) {
            const s = _A;
            if (s.mutating = !0,
                s.main = {},
                s.fromBack = !1,
                this.app = R.G.id("app"),
                this.device = i.device,
                this.isD = "d" === this.device,
                !s.is[404])
                if (this.isD) {
                    this.crtlMutation = i.transition.mutation,
                        R.BM(this, ["eD"]),
                        this.router = new t;
                    const e = i.engine;
                    s.engine = new e,
                        this.onPopstate(),
                        R.L(document.body, "a", "click", this.eD),
                        new i.transition.intro((t => {
                            this.introXhr(t)
                        }
                        ))
                } else
                    this.introXhr()
        }
        onPopstate() {
            const t = document
                , i = "complete";
            let s = t.readyState !== i;
            onload = t => {
                setTimeout((t => {
                    s = !1
                }
                ), 0)
            }
                ,
                onpopstate = e => {
                    if (s && t.readyState === i && (R.PD(e),
                        e.stopImmediatePropagation()),
                        R.Is.und(_A.config.routes))
                        return;
                    const r = location.pathname;
                    this.out(r, "back")
                }
        }
        eD(t) {
            const i = _A;
            let s = t.target
                , e = !1
                , r = !1;
            for (; s;) {
                const t = s.tagName;
                if ("A" === t) {
                    e = !0;
                    break
                }
                if (("INPUT" === t || "BUTTON" === t) && "submit" === s.type) {
                    r = !0;
                    break
                }
                s = s.parentNode
            }
            if (e) {
                const e = s.href;
                if (s.hasAttribute("target") || "mai" === e.substring(0, 3))
                    return;
                if (R.PD(t),
                    !i.mutating) {
                    let t = e.replace(/^.*\/\/[^/]+/, "");
                    "w" === _A.modePrev && "n1-1" === s.id && (t = i.route.old.url),
                        t !== i.route.new.url && (i.mutating = !0,
                            this.out(t, s))
                }
            } else
                r && R.PD(t)
        }
        introXhr(t) {
            const s = _A;
            R.Fetch({
                url: s.route.new.url + "?xhr=true&device=" + this.device + "&webp=" + s.webp,
                type: "html",
                success: s => {
                    const e = JSON.parse(s)
                        , r = _A.config;
                    r.data = e.data,
                        r.js = e.js,
                        r.routes = e.routes,
                        this.cache = new i(e.cache),
                        this.add(this.app, e.app),
                        this.isD && (this.mutation = new this.crtlMutation,
                            t())
                }
            })
        }
        out(t, i) {
            this.router.mutation(t);
            const s = _A;
            s.target = i,
                s.fromBack = "back" === i,
                s.main.getData = t => {
                    const i = this.cache.get();
                    this.in({
                        data: i
                    })
                }
                ,
                this.mutation.out()
        }
        in(t) {
            document.title = t.data.title;
            const i = _A;
            if ("back" !== i.target) {
                const t = i.route.new.url;
                history.pushState({
                    page: t
                }, "", t)
            }
            this.mutation.in()
        }
        add(t, i) {
            t.insertAdjacentHTML("beforeend", i)
        }
    }
    class e {
        constructor() {
            const t = _A;
            t.resizeRq = !1,
                t.win = {
                    w: 0,
                    h: 0
                }
        }
        resize() {
            const t = _A
                , i = innerWidth
                , s = innerHeight;
            if (t.resizeRq = i !== t.win.w || s !== t.win.h,
                !t.resizeRq)
                return;
            t.win = {
                w: i,
                h: s
            },
                t.winSemi = {
                    w: .5 * i,
                    h: .5 * s
                },
                t.winRatio = {
                    wh: i / s,
                    hw: s / i
                };
            const e = t.config.js.psd;
            t.psd = {
                h: e.h,
                w: e.w
            },
                t.winWpsdW = i / t.psd.w,
                t.winHpsdH = s / t.psd.h,
                t.psdWwinW = t.psd.w / i,
                t.psdHwinH = t.psd.h / s,
                t.ratio = t.winRatio.wh > t.psd.w / t.psd.h ? t.winHpsdH : t.winWpsdW;
            const r = t.engine.gl.planeBg.bg;
            r.tr.w = i,
                r.tr.h = s
        }
    }
    var r = {
        vertex: "precision highp float;attribute vec2 a;attribute vec2 b;varying vec2 c;varying float d;uniform mat4 e;uniform mat4 f;uniform float g;uniform float h;float i(float m){return m<.5?2.*m*m:-1.+(4.-2.*m)*m;}void main(){vec4 j=f*vec4(a,0.,1.);float z=0.;float k=abs(distance(j.x,0.));if(k<h){z=(h-i(k/h)*h)*g;}gl_Position=e*vec4(j.xy,j.z+z,j.w);c=b;d=min(z*.005,0.7);}",
        fragment: "precision highp float;varying float d;varying vec2 c;uniform sampler2D tex;uniform vec2 m;uniform int n;uniform float o;uniform vec3 p;uniform float q;uniform float r;uniform float y;void main(){vec4 s=vec4(p.r,p.g,p.b,1);vec4 t=s;if(n==1){vec4 u=texture2D(tex,vec2((c.x-.5)*m.x+.5,(c.y-.5)*m.y+.5+y));float v=(u.r+u.g+u.b)/3.;t=mix(vec4(v,v,v,.4),u,d+o);t=mix(t,t*s,q);t=vec4(t.rgb,t.a*r);}gl_FragColor = t;}"
    };
    function o() {
        const t = new Float32Array(16);
        return t[0] = 1,
            t[5] = 1,
            t[10] = 1,
            t[15] = 1,
            t
    }
    function h(t) {
        return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = 1,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = 1,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
    }
    function n(t, i) {
        return function (t, i, s) {
            let e = s[0]
                , r = s[1]
                , o = s[2];
            if (i === t)
                t[12] = i[0] * e + i[4] * r + i[8] * o + i[12],
                    t[13] = i[1] * e + i[5] * r + i[9] * o + i[13],
                    t[14] = i[2] * e + i[6] * r + i[10] * o + i[14],
                    t[15] = i[3] * e + i[7] * r + i[11] * o + i[15];
            else {
                const s = i[0]
                    , h = i[1]
                    , n = i[2]
                    , a = i[3]
                    , l = i[4]
                    , d = i[5]
                    , c = i[6]
                    , p = i[7]
                    , g = i[8]
                    , u = i[9]
                    , w = i[10]
                    , m = i[11];
                t[0] = s,
                    t[1] = h,
                    t[2] = n,
                    t[3] = a,
                    t[4] = l,
                    t[5] = d,
                    t[6] = c,
                    t[7] = p,
                    t[8] = g,
                    t[9] = u,
                    t[10] = w,
                    t[11] = m,
                    t[12] = s * e + l * r + g * o + i[12],
                    t[13] = h * e + d * r + u * o + i[13],
                    t[14] = n * e + c * r + w * o + i[14],
                    t[15] = a * e + p * r + m * o + i[15]
            }
            return t
        }(t, t, i)
    }
    function a(t, i, s) {
        return function (t, i, s, e) {
            let r = e[0]
                , o = e[1]
                , h = e[2]
                , n = Math.hypot(r, o, h);
            if (Math.abs(n) < 1e-6)
                return null;
            n = 1 / n,
                r *= n,
                o *= n,
                h *= n;
            const a = Math.sin(s)
                , l = Math.cos(s)
                , d = 1 - l
                , c = i[0]
                , p = i[1]
                , g = i[2]
                , u = i[3]
                , w = i[4]
                , m = i[5]
                , f = i[6]
                , x = i[7]
                , y = i[8]
                , R = i[9]
                , v = i[10]
                , A = i[11]
                , b = r * r * d + l
                , T = o * r * d + h * a
                , k = h * r * d - o * a
                , L = r * o * d - h * a
                , _ = o * o * d + l
                , C = h * o * d + r * a
                , I = r * h * d + o * a
                , P = o * h * d - r * a
                , O = h * h * d + l;
            t[0] = c * b + w * T + y * k,
                t[1] = p * b + m * T + R * k,
                t[2] = g * b + f * T + v * k,
                t[3] = u * b + x * T + A * k,
                t[4] = c * L + w * _ + y * C,
                t[5] = p * L + m * _ + R * C,
                t[6] = g * L + f * _ + v * C,
                t[7] = u * L + x * _ + A * C,
                t[8] = c * I + w * P + y * O,
                t[9] = p * I + m * P + R * O,
                t[10] = g * I + f * P + v * O,
                t[11] = u * I + x * P + A * O,
                i !== t && (t[12] = i[12],
                    t[13] = i[13],
                    t[14] = i[14],
                    t[15] = i[15]);
            return t
        }(t, t, i, s)
    }
    class l {
        constructor(t, i) {
            this.gl = t,
                this.near = i.near || 1,
                this.far = i.far || 2e3,
                this.fov = i.fov || 45,
                this.aspect = i.aspect || 1,
                this.left = i.left,
                this.right = i.right,
                this.top = i.top,
                this.bottom = i.bottom,
                this.type = i.type,
                this.projectionMatrix = o(),
                this.matrixCamera = o()
        }
        resize(t) {
            "perspective" === this.type ? this.perspective(t) : this.orthographic(t),
                this.gl.renderer.uProjectionMatrix(this.projectionMatrix)
        }
        perspective(t) {
            t && (this.aspect = t.aspect);
            const i = this.fov * (Math.PI / 180);
            this.projectionMatrix = function (t, i, s, e, r) {
                const o = 1 / Math.tan(.5 * i)
                    , h = 1 / (e - r);
                return t[0] = o / s,
                    t[1] = 0,
                    t[2] = 0,
                    t[3] = 0,
                    t[4] = 0,
                    t[5] = o,
                    t[6] = 0,
                    t[7] = 0,
                    t[8] = 0,
                    t[9] = 0,
                    t[10] = (r + e) * h,
                    t[11] = -1,
                    t[12] = 0,
                    t[13] = 0,
                    t[14] = 2 * r * e * h,
                    t[15] = 0,
                    t
            }(this.projectionMatrix, i, this.aspect, this.near, this.far);
            const s = _A.winSemi;
            this.posOrigin = {
                x: s.w,
                y: -s.h,
                z: s.h / Math.tan(Math.PI * this.fov / 360)
            }
        }
        orthographic(t) {
            t && (this.right = t.right,
                this.bottom = t.bottom),
                this.projectionMatrix = function (t, i, s, e, r, o, h) {
                    const n = 1 / (i - s)
                        , a = 1 / (e - r)
                        , l = 1 / (o - h);
                    return t[0] = -2 * n,
                        t[1] = 0,
                        t[2] = 0,
                        t[3] = 0,
                        t[4] = 0,
                        t[5] = -2 * a,
                        t[6] = 0,
                        t[7] = 0,
                        t[8] = 0,
                        t[9] = 0,
                        t[10] = 2 * l,
                        t[11] = 0,
                        t[12] = (i + s) * n,
                        t[13] = (r + e) * a,
                        t[14] = (h + o) * l,
                        t[15] = 1,
                        t
                }(this.projectionMatrix, this.left, this.right, this.bottom, this.top, this.near, this.far)
        }
        render(t) {
            this.matrixCamera = h(this.matrixCamera),
                this.matrixCamera = n(this.matrixCamera, [this.posOrigin.x + t.x, this.posOrigin.y + t.y, this.posOrigin.z + t.z]);
            return function (t, i) {
                const s = i[0]
                    , e = i[1]
                    , r = i[2]
                    , o = i[3]
                    , h = i[4]
                    , n = i[5]
                    , a = i[6]
                    , l = i[7]
                    , d = i[8]
                    , c = i[9]
                    , p = i[10]
                    , g = i[11]
                    , u = i[12]
                    , w = i[13]
                    , m = i[14]
                    , f = i[15]
                    , x = p * f
                    , y = m * g
                    , R = a * f
                    , v = m * l
                    , A = a * g
                    , b = p * l
                    , T = r * f
                    , k = m * o
                    , L = r * g
                    , _ = p * o
                    , C = r * l
                    , I = a * o
                    , P = d * w
                    , O = u * c
                    , D = h * w
                    , E = u * n
                    , W = h * c
                    , X = d * n
                    , S = s * w
                    , G = u * e
                    , M = s * c
                    , F = d * e
                    , j = s * n
                    , z = h * e
                    , H = x * n + v * c + A * w - (y * n + R * c + b * w)
                    , q = y * e + T * c + _ * w - (x * e + k * c + L * w)
                    , B = R * e + k * n + C * w - (v * e + T * n + I * w)
                    , U = b * e + L * n + I * c - (A * e + _ * n + C * c)
                    , Y = 1 / (s * H + h * q + d * B + u * U);
                return t[0] = Y * H,
                    t[1] = Y * q,
                    t[2] = Y * B,
                    t[3] = Y * U,
                    t[4] = Y * (y * h + R * d + b * u - (x * h + v * d + A * u)),
                    t[5] = Y * (x * s + k * d + L * u - (y * s + T * d + _ * u)),
                    t[6] = Y * (v * s + T * h + I * u - (R * s + k * h + C * u)),
                    t[7] = Y * (A * s + _ * h + C * d - (b * s + L * h + I * d)),
                    t[8] = Y * (P * l + E * g + W * f - (O * l + D * g + X * f)),
                    t[9] = Y * (O * o + S * g + F * f - (P * o + G * g + M * f)),
                    t[10] = Y * (D * o + G * l + j * f - (E * o + S * l + z * f)),
                    t[11] = Y * (X * o + M * l + z * g - (W * o + F * l + j * g)),
                    t[12] = Y * (D * p + X * m + O * a - (W * m + P * a + E * p)),
                    t[13] = Y * (M * m + P * r + G * p - (S * p + F * m + O * r)),
                    t[14] = Y * (S * a + z * m + E * r - (j * m + D * r + G * a)),
                    t[15] = Y * (j * p + W * r + F * a - (M * a + z * p + X * r)),
                    t
            }(this.matrixCamera, this.matrixCamera)
        }
    }
    class d {
        constructor(t, i) {
            const s = _A;
            this.gl = t,
                this.cb = i;
            const e = s.config
                , r = "." + (s.webp ? "webp" : "jpg");
            this.version = "?" + e.v;
            const o = e.data
                , h = o.work
                , n = o.workL;
            this.tex = [],
                this.texL = n;
            for (let t = 0; t < n; t++) {
                const i = "/static/media/" + h[t].folder + "/h/0" + r;
                this.imgSet({
                    src: i,
                    index: t
                })
            }
            this.load = R.G.id("load"),
                this.no = 0,
                this.prevNo = 0,
                R.BM(this, ["loop"]),
                this.raf = new R.RafR(this.loop),
                this.raf.run()
        }
        imgSet(t) {
            const i = t.index
                , s = t.src
                , e = new Image;
            e.onload = t => {
                const s = this.texInit(e);
                this.tex[i] = {
                    attrib: s,
                    element: e
                },
                    this.no++
            }
                ,
                e.src = s + this.version
        }
        texInit(t) {
            const i = this.gl
                , s = i.createTexture();
            return i.bindTexture(i.TEXTURE_2D, s),
                i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, t),
                i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE),
                i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE),
                i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR),
                i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.LINEAR),
                s
        }
        el(t, i) {
            this.load.children[t].children[0].textContent = i
        }
        loop() {
            const t = Math.round(99 / this.texL * this.no) + 1;
            if (this.no !== this.prevNo)
                if (this.prevNo = this.no,
                    t < 10)
                    this.el(2, t);
                else if (t < 100) {
                    const i = (t + "").split("");
                    this.el(1, i[0]),
                        this.el(2, i[1])
                } else
                    this.el(0, 1),
                        this.el(1, 0),
                        this.el(2, 0);
            this.no === this.texL && (this.raf.stop(),
                this.cb(this.tex))
        }
    }
    class c {
        constructor(t) {
            this.dpr = t.dpr;
            const i = R.G.id("gl");
            this.gl = i.getContext("webgl", {
                antialias: !0,
                alpha: !0
            }) || i.getContext("experimental-webgl"),
                this.state = {
                    depthTest: null,
                    cullFace: null
                },
                this.setBlendFunc(),
                this.gl.renderer = this;
            const s = this.gl.getExtension("OES_vertex_array_object")
                , e = ["create", "bind"];
            this.vertexArray = {};
            for (let t = 0; t < 2; t++) {
                const i = e[t];
                this.vertexArray[i] = s[i + "VertexArrayOES"].bind(s)
            }
            this.programCurrId = null,
                this.viewport = {
                    width: null,
                    height: null
                },
                this.camera = new l(this.gl, t.camera),
                new d(this.gl, (i => {
                    this.tex = i,
                        t.cb()
                }
                ))
        }
        setFaceCulling(t) {
            this.state.cullFace !== t && (this.state.cullFace = t,
                this.gl.enable(this.gl.CULL_FACE),
                this.gl.cullFace(this.gl[t]))
        }
        setBlendFunc() {
            this.gl.enable(this.gl.BLEND),
                this.gl.blendFuncSeparate(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA)
        }
        clear() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
        }
        resize() {
            this.win = _A.win,
                this.width = this.win.w,
                this.height = this.win.h,
                this.gl.canvas.width = this.width * this.dpr,
                this.gl.canvas.height = this.height * this.dpr,
                this.camera.resize({
                    aspect: this.gl.canvas.width / this.gl.canvas.height
                }),
                this.setViewport()
        }
        setViewport() {
            const t = this.width * this.dpr
                , i = this.height * this.dpr;
            this.viewport.width === t && this.viewport.height === i || (this.viewport.width = t,
                this.viewport.height = i,
                this.gl.viewport(0, 0, t, i),
                this.viewMatrix = this.camera.render({
                    x: 0,
                    y: 0,
                    z: 0
                }))
        }
        render(t, i) {
            i.draw(),
                t.draw()
        }
    }
    let p = 1;
    class g {
        constructor(t, i) {
            this.gl = t,
                this.uniform = i.uniform || {},
                this.id = p++,
                this.program = this.crP(i.shader);
            const s = this.uniform;
            s.e = {
                type: "Matrix4fv"
            },
                s.f = {
                    type: "Matrix4fv"
                },
                this.getL(s, "Uniform"),
                this.gl.renderer.uProjectionMatrix = t => {
                    s.e.value = t
                }
        }
        crP(t) {
            const i = this.gl
                , s = this.crS(t.vertex, i.VERTEX_SHADER)
                , e = this.crS(t.fragment, i.FRAGMENT_SHADER)
                , r = i.createProgram();
            return i.attachShader(r, s),
                i.attachShader(r, e),
                i.linkProgram(r),
                i.deleteShader(s),
                i.deleteShader(e),
                r
        }
        crS(t, i) {
            const s = this.gl.createShader(i);
            return this.gl.shaderSource(s, t),
                this.gl.compileShader(s),
                s
        }
        getL(t, i) {
            for (const s in t)
                R.Has(t, s) && (t[s].location = this.gl["get" + i + "Location"](this.program, s))
        }
        setUniform() {
            for (const t in this.uniform)
                if (R.Has(this.uniform, t)) {
                    const i = this.uniform[t]
                        , s = i.location
                        , e = "uniform" + i.type;
                    "Matrix" === i.type.substring(0, 6) ? this.gl[e](s, !1, i.value) : this.gl[e](s, i.value)
                }
        }
        run() {
            this.gl.renderer.programCurrId === this.id || (this.gl.useProgram(this.program),
                this.gl.renderer.programCurrId = this.id)
        }
    }
    class u {
        constructor(t, i) {
            this.gl = t,
                this.index = i.index,
                this.program = i.program,
                this.mode = i.mode,
                this.face = i.face,
                this.attrib = i.attrib,
                this.speed = i.speed,
                this.hasTex = i.hasTex,
                this.gl.renderer.vertexArray.bind(null),
                this.program.getL(this.attrib, "Attrib"),
                this.modelMatrix = o()
        }
        setVAO() {
            const t = this.gl.renderer;
            this.vao = t.vertexArray.create(),
                t.vertexArray.bind(this.vao),
                this.setAttrib(),
                t.vertexArray.bind(null)
        }
        setAttrib() {
            const t = this.gl;
            for (const i in this.attrib)
                if (R.Has(this.attrib, i)) {
                    const s = this.attrib[i]
                        , e = "index" === i
                        , r = s.data.constructor;
                    r === Float32Array ? s.type = t.FLOAT : r === Uint16Array ? s.type = t.UNSIGNED_SHORT : s.type = t.UNSIGNED_INT,
                        s.count = s.data.length / s.size,
                        s.target = e ? t.ELEMENT_ARRAY_BUFFER : t.ARRAY_BUFFER,
                        s.normalize = !1,
                        t.bindBuffer(s.target, t.createBuffer()),
                        t.bufferData(s.target, s.data, t.STATIC_DRAW),
                        e || (t.enableVertexAttribArray(s.location),
                            t.vertexAttribPointer(s.location, s.size, s.type, s.normalize, 0, 0))
                }
        }
        draw(t) {
            const i = this.gl
                , s = i.renderer;
            s.setFaceCulling(this.face),
                this.program.run(),
                this.modelMatrix = h(this.modelMatrix);
            const e = s.viewMatrix;
            let r = function (t, i, s) {
                const e = s[0]
                    , r = s[1]
                    , o = s[2]
                    , h = s[3]
                    , n = s[4]
                    , a = s[5]
                    , l = s[6]
                    , d = s[7]
                    , c = s[8]
                    , p = s[9]
                    , g = s[10]
                    , u = s[11]
                    , w = s[12]
                    , m = s[13]
                    , f = s[14]
                    , x = s[15]
                    , y = i[0]
                    , R = i[1]
                    , v = i[2]
                    , A = i[3]
                    , b = i[4]
                    , T = i[5]
                    , k = i[6]
                    , L = i[7]
                    , _ = i[8]
                    , C = i[9]
                    , I = i[10]
                    , P = i[11]
                    , O = i[12]
                    , D = i[13]
                    , E = i[14]
                    , W = i[15];
                return t[0] = e * y + r * b + o * _ + h * O,
                    t[1] = e * R + r * T + o * C + h * D,
                    t[2] = e * v + r * k + o * I + h * E,
                    t[3] = e * A + r * L + o * P + h * W,
                    t[4] = n * y + a * b + l * _ + d * O,
                    t[5] = n * R + a * T + l * C + d * D,
                    t[6] = n * v + a * k + l * I + d * E,
                    t[7] = n * A + a * L + l * P + d * W,
                    t[8] = c * y + p * b + g * _ + u * O,
                    t[9] = c * R + p * T + g * C + u * D,
                    t[10] = c * v + p * k + g * I + u * E,
                    t[11] = c * A + p * L + g * P + u * W,
                    t[12] = w * y + m * b + f * _ + x * O,
                    t[13] = w * R + m * T + f * C + x * D,
                    t[14] = w * v + m * k + f * I + x * E,
                    t[15] = w * A + m * L + f * P + x * W,
                    t
            }(o = this.modelMatrix, o, e);
            var o;
            const l = this.program.uniform
                , d = _A
                , c = t.tr
                , p = c.x
                , g = c.y
                , u = c.w
                , w = c.h;
            let m = 1
                , f = 0;
            if (this.hasTex) {
                const i = 1 + c.scale;
                m = c.light,
                    f = c.pY;
                const s = p + .5 * u;
                r = n(r, [s, 0, 0]),
                    r = a(r, -.4 * d.latency.rotate, [0, 1, 0]),
                    r = n(r, [-s, 0, 0]);
                const e = t.media;
                if (this.hasTex) {
                    const t = u / w
                        , s = t / e.ratio.wh;
                    let r = 1
                        , o = t;
                    s > 1 && (o /= s,
                        r /= s),
                        l.m.value = [o / i, r / i]
                }
            }
            r = n(r, [p, -g, 0]),
                r = function (t, i) {
                    return function (t, i, s) {
                        let e = s[0]
                            , r = s[1]
                            , o = s[2];
                        return t[0] = i[0] * e,
                            t[1] = i[1] * e,
                            t[2] = i[2] * e,
                            t[3] = i[3] * e,
                            t[4] = i[4] * r,
                            t[5] = i[5] * r,
                            t[6] = i[6] * r,
                            t[7] = i[7] * r,
                            t[8] = i[8] * o,
                            t[9] = i[9] * o,
                            t[10] = i[10] * o,
                            t[11] = i[11] * o,
                            t[12] = i[12],
                            t[13] = i[13],
                            t[14] = i[14],
                            t[15] = i[15],
                            t
                    }(t, t, i)
                }(r, [u, w, 1]),
                l.f.value = r,
                l.n.value = this.hasTex,
                l.o.value = m,
                l.q.value = c.multiply,
                l.r.value = R.R(c.o),
                l.g.value = d.latency.x,
                l.y.value = f,
                this.program.setUniform(),
                this.hasTex && i.bindTexture(i.TEXTURE_2D, this.attrib.b.tex),
                s.vertexArray.bind(this.vao);
            const x = this.attrib.index;
            i.drawElements(i[this.mode], x.count, x.type, 0)
        }
    }
    class w {
        constructor(t, i) {
            this.gl = t;
            const s = i.program
                , e = this.gl.renderer.tex;
            this.workL = _A.config.data.workL,
                this.plane = [];
            for (let i = 0; i < this.workL; i++) {
                const r = e[i]
                    , o = r.element
                    , h = o.width
                    , n = o.height;
                this.plane[i] = {
                    tr: {
                        x: 0,
                        y: 0,
                        w: 1,
                        h: 1,
                        o: 1,
                        light: 0,
                        multiply: 0,
                        pY: 0,
                        scale: 0
                    },
                    pts: {
                        hori: 20,
                        vert: 2
                    },
                    tex: r,
                    media: {
                        obj: o,
                        dimension: {
                            width: h,
                            height: n
                        },
                        ratio: {
                            wh: h / n,
                            hw: n / h
                        }
                    }
                };
                const a = this.plane[i];
                a.geo = new u(t, {
                    hasTex: 1,
                    index: i,
                    speed: a.speed,
                    program: s,
                    mode: "TRIANGLE_STRIP",
                    face: "FRONT",
                    attrib: {
                        a: {
                            size: 2
                        },
                        index: {
                            size: 1
                        },
                        b: {
                            size: 2,
                            tex: a.tex.attrib
                        }
                    }
                });
                const l = this.planeSetup(a)
                    , d = a.geo.attrib;
                d.a.data = new Float32Array(l.pos),
                    d.index.data = new Uint16Array(l.index),
                    d.b.data = new Float32Array(l.texture),
                    a.geo.setVAO()
            }
        }
        draw() {
            const t = _A
                , i = t.win.w
                , s = t.win.h;
            for (let t = 0; t < this.workL; t++) {
                const e = this.plane[t]
                    , r = e.tr
                    , o = r.x < i
                    , h = r.x + r.w > 0
                    , n = r.y < s
                    , a = r.y + r.h > 0;
                n && a && (o && h) ? (e.isOut && (e.isOut = !1),
                    e.geo.draw(e)) : e.isOut || (e.isOut = !0,
                        e.geo.draw(e))
            }
        }
        planeSetup(t) {
            t.isOut = !1;
            const i = t.pts.hori
                , s = t.pts.vert
                , e = i - 1
                , r = s - 1
                , o = 1 / e
                , h = 1 / r
                , n = [];
            let a = 0;
            for (let t = 0; t < s; t++) {
                const s = t * h - 1;
                for (let t = 0; t < i; t++)
                    n[a++] = t * o,
                        n[a++] = s
            }
            const l = [];
            let d = 0;
            const c = s - 1
                , p = s - 2
                , g = i - 1;
            for (let t = 0; t < c; t++) {
                const s = i * t
                    , e = s + i;
                for (let r = 0; r < i; r++) {
                    const o = e + r;
                    l[d++] = s + r,
                        l[d++] = o,
                        r === g && t < p && (l[d++] = o,
                            l[d++] = i * (t + 1))
                }
            }
            const u = t.media.ratio.wh
                , w = {};
            u > 1 ? (w.w = u,
                w.h = 1) : (w.w = 1,
                    w.h = 1 / u);
            const m = .5 * (1 - 1 / w.w)
                , f = .5 * (1 - 1 / w.h)
                , x = [];
            let y = 0;
            for (let t = 0; t < s; t++) {
                const s = 1 - (t / r / w.h + f);
                for (let t = 0; t < i; t++)
                    x[y++] = t / e / w.w + m,
                        x[y++] = s
            }
            return {
                pos: n,
                index: l,
                texture: x
            }
        }
    }
    class m {
        constructor(t, i) {
            this.gl = t;
            const s = i.program;
            this.bg = {
                tr: {
                    x: 0,
                    y: 0
                }
            },
                this.bg.geo = new u(t, {
                    hasTex: 0,
                    index: 0,
                    program: s,
                    mode: "TRIANGLE_STRIP",
                    face: "FRONT",
                    attrib: {
                        a: {
                            size: 2
                        },
                        index: {
                            size: 1
                        }
                    }
                });
            const e = this.bg.geo.attrib;
            e.a.data = new Float32Array([0, -1, 1, -1, 0, 0, 1, 0]),
                e.index.data = new Uint16Array([0, 2, 1, 3]),
                this.bg.geo.setVAO()
        }
        draw() {
            this.bg.geo.draw(this.bg)
        }
    }
    class f {
        constructor(t) {
            this.renderer = new c({
                camera: {
                    type: "perspective"
                },
                dpr: 1.5,
                cb: t
            }),
                this.gl = this.renderer.gl,
                this.program = new g(this.gl, {
                    shader: r,
                    uniform: {
                        m: {
                            type: "2fv",
                            value: [1, 1]
                        },
                        n: {
                            type: "1i",
                            value: 0
                        },
                        g: {
                            type: "1f",
                            value: 0
                        },
                        h: {
                            type: "1f",
                            value: 0
                        },
                        o: {
                            type: "1f",
                            value: 0
                        },
                        q: {
                            type: "1f",
                            value: 0
                        },
                        p: {
                            type: "3fv",
                            value: [0, 0, 0]
                        },
                        r: {
                            type: "1f",
                            value: 0
                        },
                        y: {
                            type: "1f",
                            value: 0
                        }
                    }
                })
        }
        intro() {
            this.renderer.clear();
            const t = {
                program: this.program
            };
            this.planeTex = new w(this.gl, t),
                this.planeBg = new m(this.gl, t)
        }
        resize() {
            const t = _A;
            t.resizeRq && (this.renderer.resize(),
                this.program.uniform.h.value = 500 * t.winWpsdW)
        }
        loop() {
            this.program.uniform.p.value = _A.color.gl,
                this.renderer.render(this.planeTex, this.planeBg)
        }
    }
    class x {
        constructor(t) {
            this.cb = t.cb,
                this.isOn = !1,
                this.isFF = R.Snif.isFirefox,
                R.BM(this, ["fn"]),
                R.L(document, "a", "mouseWheel", this.fn)
        }
        on() {
            this.tick = !1,
                this.isOn = !0
        }
        off() {
            this.isOn = !1
        }
        fn(t) {
            this.e = t,
                R.PD(t),
                this.isOn && (this.tick || (this.tick = !0,
                    this.run()))
        }
        run() {
            const t = this.e.wheelDeltaX || -1 * this.e.deltaX
                , i = this.e.wheelDeltaY || -1 * this.e.deltaY;
            let s = Math.abs(t) >= Math.abs(i) ? t : i;
            this.isFF && 1 === this.e.deltaMode ? s *= .75 : s *= .556,
                this.cb(-s),
                this.tick = !1
        }
    }
    class y {
        constructor(t) {
            this.cb = t.cb,
                this.el = R.Has(t, "el") ? R.Select.el(t.el)[0] : document,
                R.BM(this, ["run"])
        }
        on() {
            this.l("a")
        }
        off() {
            this.l("r")
        }
        l(t) {
            R.L(this.el, t, "mousemove", this.run)
        }
        run(t) {
            this.cb(t.pageX, t.pageY, t)
        }
    }
    class v {
        constructor() {
            const t = _A;
            R.BM(this, ["sXFn", "move", "down", "up", "leave", "modeOut", "key", "morphFn"]),
                this.sX = new x({
                    cb: this.sXFn
                }),
                this.mm = new y({
                    cb: this.move
                }),
                this.isRunning = !1,
                this.timer = new R.Delay((t => {
                    this.isRunning = !1
                }
                ), 300),
                this.prop = t.prop,
                this.propL = t.propL,
                this.pCurr = [],
                this.pTarg = [],
                t.x = 0,
                this.x = {
                    curr: 0,
                    targ: 0,
                    currLatency: 0
                };
            const i = t.color.bg.rgbNorm;
            this.colorBase = i.slice(),
                this.color = {},
                t.color.gl = this.colorBase.slice(),
                this.sensi = 1.2,
                this.latency = 0,
                this.indexOver = 0,
                this.isDown = !1,
                this.isDragging = !1,
                this.prev = 0,
                this.morphA = []
        }
        intro() {
            const t = _A
                , i = t.config.data;
            this.work = i.work,
                this.workL = i.workL,
                this.limit = this.workL - 1,
                this.plane = t.engine.gl.planeTex.plane
        }
        init() {
            const t = _A
                , i = t.is
                , s = t.was;
            if (this.isHome = i.home,
                this.isHA = i.about || i.home,
                this.reset = !0,
                !this.isHA)
                return;
            this.morph({
                d: 0,
                e: "o5",
                shape: "cross"
            });
            const e = t.mode;
            i.about ? ("in" === e ? (t.pgn.up(),
                t.fx.title({
                    a: "hide",
                    d: 500,
                    delay: 0,
                    r: !1
                }),
                t.fx.info({
                    a: "hide",
                    d: 500,
                    delay: 0
                }),
                t.fx.explore({
                    a: "hide",
                    d: 500,
                    delay: 0
                })) : "w" === e && (t.fx.title({
                    a: "hide",
                    d: 500,
                    delay: 0,
                    r: !1
                }),
                    t.fx.info({
                        a: "hide",
                        d: 500,
                        delay: 0
                    }),
                    t.fx.project({
                        a: "hide",
                        d: 500,
                        delay: 0
                    })),
                "out" !== e && t.nav.colorFix({
                    default: !0
                }),
                t.aFx.play({
                    a: "show",
                    d: 1600,
                    delay: 100
                }),
                t.mode = "a") : s.about ? (t.aFx.play({
                    a: "hide",
                    d: 500,
                    delay: 0
                }),
                    "in" === t.modePrev ? (t.fx.title({
                        a: "show",
                        d: 1600,
                        delay: 0,
                        r: !1
                    }),
                        t.fx.info({
                            a: "show",
                            d: 1600,
                            delay: 400
                        }),
                        t.fx.explore({
                            a: "show",
                            d: 1600,
                            delay: 600
                        })) : "w" === t.modePrev && (t.fx.title({
                            a: "show",
                            d: 1600,
                            delay: 0,
                            r: !1
                        }),
                            t.fx.info({
                                a: "show",
                                d: 1600,
                                delay: 400
                            }),
                            t.fx.project({
                                a: "show",
                                d: 1600,
                                delay: 400
                            })),
                    "out" !== t.modePrev && t.nav.colorFix({
                        default: !1
                    }),
                    t.mode = t.modePrev) : s.work ? (t.mode = "in",
                        t.fx.project({
                            a: "hide",
                            d: 500,
                            delay: 0
                        }),
                        t.fx.explore({
                            a: "show",
                            d: 1600,
                            delay: 400
                        }),
                        t.letter.move({
                            start: "work",
                            end: "home",
                            d: 1200
                        }),
                        t.pgn.up(),
                        t.pgnX.show({
                            r: !1,
                            out: !1,
                            d: 0
                        })) : t.mode = "out",
                t.modePrev = e
        }
        resize() {
            const t = _A;
            if (!this.isHA)
                return;
            const i = t.index
                , s = t.mode
                , e = t.resizeRq || this.reset
                , r = this.reset && ("a" !== t.modePrev && "a" !== t.mode || R.Is.und(this.min));
            if ((t.resizeRq || r) && (this.min = 0,
                this.gMax()),
                (t.resizeRq || r) && this.xUp(this.x.targ),
                e) {
                let i;
                "a" === s ? "out" === t.modePrev ? i = t.data.modeOut() : "in" === t.modePrev ? i = t.data.modeIn() : "w" === t.modePrev && (i = t.data.modeW()) : "out" === s ? i = t.data.modeOut() : "in" === s ? i = t.data.modeIn() : "w" === s && (i = t.data.modeW()),
                    R.Is.def(this.delay) && this.delay.stop();
                const e = t.isIntro && "out" === t.mode;
                if (t.resizeRq)
                    if (e) {
                        const s = t.data.modeOutIntro();
                        this.pSet(this.pCurr, s),
                            this.pSet(this.pTarg, s),
                            this.delay = new R.Delay((t => {
                                this.pSet(this.pTarg, i, !0)
                            }
                            ), 400),
                            this.delay.run()
                    } else
                        this.pSet(this.pCurr, i);
                else if (this.reset)
                    if ("w" === t.modePrev) {
                        const i = "a" === s ? "modeW" : "wToH"
                            , e = t.data[i]();
                        this.pSet(this.pCurr, e)
                    } else if ("a" !== s && "a" !== t.modePrev) {
                        const i = t.data.modeOut();
                        this.pSet(this.pCurr, i)
                    }
                e || this.pSet(this.pTarg, i)
            }
            let o;
            o = "out" === s || "a" === s ? this.colorBase.slice() : this.work[i].color.bg.slice(),
                this.color.targ = o,
                t.resizeRq ? (this.color.curr = o,
                    t.color.gl = o) : this.reset && (this.color.curr = t.color.gl),
                t.resizeRq || t.pgn.pageChange(),
                this.render(),
                this.reset = !1
        }
        gMax() {
            const t = _A;
            this.gapXW = t.data.outGapXW(),
                this.max = R.R(this.limit * this.gapXW),
                this.x.targ = t.index * this.gapXW
        }
        xUp(t) {
            this.x.targ = t,
                this.x.curr = t,
                this.x.currLatency = t
        }
        timerReset() {
            this.timer.stop(),
                this.isRunning || (this.isRunning = !0),
                this.timer.run()
        }
        sXFn(t) {
            if (this.isDown)
                return;
            this.timerReset();
            const i = _A.mode;
            "in" === i ? this.modeOut() : "out" === i && this.xTargUp(this.x.targ + t)
        }
        down(t) {
            const i = t.target;
            t.ctrlKey || "A" === i.tagName || 0 !== t.button ? t.preventDefault() : (this.isDown = !0,
                this.start = t.pageX,
                this.targ = this.x.targ,
                this.targPrev = this.targ)
        }
        move(t, i) {
            const s = _A;
            if (s.cursor.x = t,
                s.cursor.y = i,
                !this.isDown)
                return;
            const e = this.sensi;
            t > this.prev && this.targ === this.min ? this.start = t - (this.targPrev - this.min) / e : t < this.prev && this.targ === this.max && (this.start = t - (this.targPrev - this.max) / e),
                this.prev = t,
                this.targ = -(t - this.start) * e + this.targPrev,
                this.isDragging = this.isDraggingUp(),
                this.isDragging && this.timerReset();
            const r = s.mode;
            "in" === r ? this.isDragging && (this.targPrev = this.targ,
                this.modeOut()) : "out" === r && this.xTargUp(this.targ)
        }
        leave() {
            _A.cursor = {
                x: -1,
                y: -1
            }
        }
        isDraggingUp() {
            return Math.abs(this.targ - this.targPrev) / this.sensi > 6
        }
        up(t) {
            if (0 !== t.button || !this.isDown)
                return;
            const i = _A;
            this.isDown = !1,
                this.isDragging = this.isDraggingUp(),
                this.isDragging || (this.indexOver > -1 ? this.modeIn(this.indexOver) : i.pOver > -1 && ("out" === i.mode ? this.x.targ = i.pOver * this.gapXW : this.modeIn(i.pOver)))
        }
        modeIn(t) {
            const i = _A
                , s = "out" === i.mode;
            i.mode = "in";
            const e = t;
            let r = !1;
            !s && e > i.index && (r = !0),
                i.li.run({
                    index: t
                }),
                s || (i.fx.title({
                    a: "hide",
                    d: 500,
                    delay: 0,
                    r: r
                }),
                    i.fx.info({
                        a: "hide",
                        d: 500,
                        delay: 0
                    }),
                    i.fx.explore({
                        a: "hide",
                        d: 500,
                        delay: 0
                    }),
                    i.pgnX.hideCurr({
                        r: r,
                        out: s
                    })),
                i.index = e,
                this.gMax();
            const o = i.data.modeIn();
            this.pSet(this.pTarg, o),
                this.color.targ = this.work[i.index].color.bg.slice(),
                i.color.gl = this.color.curr,
                i.nav.color({
                    default: !1
                }),
                i.fx.title({
                    a: "show",
                    d: 1600,
                    delay: 0,
                    r: r
                }),
                i.fx.info({
                    a: "show",
                    d: 1600,
                    delay: 400
                }),
                i.fx.explore({
                    a: "show",
                    d: 1600,
                    delay: 600
                }),
                i.pgnX.show({
                    r: r,
                    out: s,
                    d: 1200
                }),
                i.pgn.up()
        }
        modeOut(t) {
            const i = _A;
            R.Is.def(t) && "n0" === t.target.id && "out" === i.mode && (location.href = "/"),
                i.mode = "out",
                this.gMax();
            const s = i.data.modeOut();
            this.pSet(this.pTarg, s),
                this.color.targ = this.colorBase,
                i.nav.color({
                    default: !0
                }),
                i.pgn.up(),
                i.fx.title({
                    a: "hide",
                    d: 500,
                    delay: 0,
                    r: !1
                }),
                i.fx.info({
                    a: "hide",
                    d: 500,
                    delay: 0
                }),
                i.fx.explore({
                    a: "hide",
                    d: 500,
                    delay: 0
                }),
                i.pgnX.hideCurr({
                    r: !1,
                    out: !0
                })
        }
        over() {
            const t = _A
                , i = "out" === t.mode
                , s = t.index
                , e = this.work[s].inOverLight;
            this.needOver = !1,
                this.indexOver = -1;
            for (let r = 0; r < this.workL; r++)
                if (r !== s || i) {
                    const s = this.pCurr[r]
                        , o = this.pTarg[r]
                        , h = s.x - this.x.curr
                        , n = t.cursor.x >= h && t.cursor.x <= h + s.w
                        , a = t.cursor.y >= s.y && t.cursor.y <= s.y + s.h;
                    n && a ? i ? r === this.indexOver || this.isRunning || (this.indexOver = r,
                        o.light = 1) : (o.light = e,
                            this.indexOver = r) : 0 !== o.light && (o.light = 0),
                        this.needOver || (this.needOver = R.R(s.light) !== R.R(o.light))
                }
        }
        needGl() {
            const t = _A
                , i = t.index;
            let s = !1;
            for (let t = 0; t < 3 && (s = R.R(this.color.curr[t]) !== R.R(this.color.targ[t]),
                !s); t++)
                ;
            const e = this.pCurr[i]
                , r = this.pTarg[i]
                , o = R.R(e.o) !== R.R(r.o)
                , h = R.R(e.h) !== R.R(r.h)
                , n = R.R(e.w) !== R.R(r.w)
                , a = R.R(e.y) !== R.R(r.y)
                , l = R.R(e.x) !== R.R(r.x)
                , d = R.R(this.x.curr) !== R.R(this.x.targ);
            t.needGL = h || n || a || l || o || s || d || this.needOver
        }
        loop() {
            if (!this.isHA)
                return;
            const t = _A
                , i = t.mode
                , s = t.index
                , e = "out" === i || "a" === i;
            if (this.over(),
                this.needGl(),
                t.needGL) {
                this.x.curr = R.Damp(this.x.curr, this.x.targ, t.lerp.scroll[i]),
                    t.x = this.x.curr / this.max,
                    this.x.currLatency = R.Damp(this.x.currLatency, this.x.targ, t.lerp.latency[i]);
                let r = this.x.targ - this.x.currLatency;
                e || (r = 0),
                    this.latency += (r - this.latency) * t.lerp.latency[i];
                const o = e ? 1 : .6
                    , h = 500 / o;
                t.latency.x = Math.min(Math.abs(this.latency) / h, o);
                const n = e ? 1.7 : 2
                    , a = 500 / n;
                t.latency.rotate = R.Clamp(this.latency / a, -n, n);
                for (let t = 0; t < 3; t++)
                    this.color.curr[t] = R.Damp(this.color.curr[t], this.color.targ[t], .05);
                if (t.color.gl = this.color.curr,
                    e) {
                    const i = R.R(this.x.curr / this.gapXW, 0);
                    i !== s && (t.index = i)
                }
                this.render()
            }
        }
        render() {
            const t = _A
                , i = t.mode
                , s = t.lerp.tr[i]
                , e = this.x.curr
                , r = t.prop
                , o = t.propL;
            for (let t = 0; t < this.workL; t++) {
                const i = this.pCurr[t]
                    , h = this.pTarg[t]
                    , n = this.plane[t];
                for (let t = 0; t < o; t++) {
                    const o = r[t];
                    let a = s;
                    "light" === o ? a = .1 : "o" === o && (a = 0 === h[o] ? .23 : .07),
                        i[o] = R.Damp(i[o], h[o], a),
                        n.tr[o] = i[o],
                        "x" === o && (n.tr[o] -= e)
                }
            }
        }
        xTargUp(t) {
            const i = this.clamp(t);
            this.x.targ = i,
                this.targ = i
        }
        pSet(t, i) {
            const s = _A;
            let e;
            const r = "in" === s.mode || "in" === s.modePrev || "w" === s.mode || "w" === s.modePrev && "a" === s.mode
                , o = s.prop
                , h = s.propL;
            for (let s = 0; s < this.workL; s++) {
                t[s] = {};
                for (let n = 0; n < h; n++) {
                    const h = o[n];
                    e = 0,
                        "x" === h && r && (e = this.x.targ),
                        t[s][h] = R.R(i[s][h] + e)
                }
            }
        }
        key(t) {
            const i = t.key;
            if ("Tab" === i)
                R.PD(t);
            else {
                const s = _A
                    , e = "ArrowRight" === i || " " === i
                    , r = "ArrowLeft" === i
                    , o = "Enter" === i || "ArrowDown" === i
                    , h = "Escape" === i || "ArrowUp" === i;
                if ("a" === i)
                    R.G.id("n1-0").click();
                else if ("out" === s.mode) {
                    if (e || r) {
                        const t = e ? 1 : -1;
                        let i = s.index + 7 * t;
                        i < 0 ? i = 0 : i > this.limit && (i = this.limit),
                            this.x.targ = i * this.gapXW
                    } else if (o) {
                        R.PD(t);
                        const i = this.indexOver > -1 ? this.indexOver : s.index;
                        this.modeIn(i)
                    }
                } else if ("in" === s.mode)
                    if (e || r) {
                        const t = e ? 1 : -1;
                        let i = s.index + t;
                        i < 0 ? i = 0 : i > this.limit && (i = this.limit),
                            this.modeIn(i)
                    } else
                        h ? this.modeOut() : (o || "e" === i) && (R.PD(t),
                            R.G.class("e")[s.index].click())
            }
        }
        morphFn(t) {
            const i = "mouseenter" === t.type ? "arrow" : "cross";
            this.morph({
                d: 700,
                e: "o5",
                shape: i
            })
        }
        morph(t) {
            const i = _A.index
                , s = R.G.class("e-s-p")[i];
            R.Is.def(this.morphA[i]) && this.morphA[i].pause(),
                this.morphA[i] = new R.M({
                    el: s,
                    svg: {
                        type: "polygon",
                        end: {
                            cross: "7,11.042 6.08,11.042 6.08,7.889 2.958,7.889 2.958,6.096 6.08,6.096 6.08,2.958 7.921,2.958 7.921,6.096 11.042,6.096 11.042,7.889 7.921,7.889 7.921,11.042",
                            arrow: "7,11.042 6.499,10.542 4.958,9 3.462,7.503 4.724,6.241 6.08,7.597 6.08,2.958 7.921,2.958 7.923,7.593 9.277,6.24 10.539,7.502 9.041,9 7.5,10.542"
                        }[t.shape]
                    },
                    d: t.d,
                    e: t.e
                }),
                this.morphA[i].play()
        }
        l(t) {
            const i = document;
            R.L(i, t, "mousedown", this.down),
                R.L(i, t, "mouseup", this.up),
                R.L(i, t, "mouseleave", this.leave),
                R.L("#n0", t, "click", this.modeOut),
                R.L(i, t, "keydown", this.key),
                R.L(".e", t, "mouseenter", this.morphFn),
                R.L(".e", t, "mouseleave", this.morphFn)
        }
        on() {
            this.isHome && (this.sX.on(),
                this.mm.on(),
                this.l("a"))
        }
        off() {
            this.isHome && (this.sX.off(),
                this.mm.off(),
                this.l("r"))
        }
        clamp(t) {
            return R.R(R.Clamp(t, this.min, this.max))
        }
    }
    class A {
        constructor() {
            this.pCurr = [],
                this.pTarg = []
        }
        intro() {
            const t = _A
                , i = t.config.data;
            this.work = i.work,
                this.workL = i.workL,
                this.color = {},
                this.plane = t.engine.gl.planeTex.plane
        }
        init() {
            const t = _A
                , i = t.is;
            if (this.isWork = i.work,
                this.reset = !0,
                !this.isWork)
                return;
            const s = t.mode;
            t.indexSet.run(),
                t.mode = "w",
                t.modePrev = s,
                t.nav.color({
                    default: !1
                }),
                t.isIntro && (t.fx.info({
                    a: "show",
                    d: 1600,
                    delay: 200
                }),
                    t.fx.project({
                        a: "show",
                        d: 1600,
                        delay: 200
                    }),
                    t.fx.title({
                        a: "show",
                        d: 1600,
                        delay: 200,
                        r: !1
                    }))
        }
        resize() {
            const t = _A;
            if (!this.isWork)
                return;
            const i = t.data.modeW();
            if (t.resizeRq)
                this.pSet(this.pCurr, i);
            else if (this.reset) {
                const i = t.data.hToW();
                this.pSet(this.pCurr, i)
            }
            this.pSet(this.pTarg, i);
            const s = t.index
                , e = t.indexPrev;
            t.resizeRq || ("in" === t.modePrev && e !== s && (t.pgnX.hide({
                index: e,
                reverse: !1,
                out: !0
            }),
                t.li.run({
                    index: s,
                    indexPrev: e
                }),
                t.fx.explore({
                    a: "hide",
                    d: 500,
                    delay: 0,
                    index: e
                }),
                t.fx.title({
                    a: "hide",
                    d: 500,
                    delay: 0,
                    r: !1,
                    index: e
                }),
                t.fx.info({
                    a: "hide",
                    d: 500,
                    delay: 0,
                    r: !1,
                    index: e
                }),
                t.fx.title({
                    a: "show",
                    d: 1600,
                    delay: 0,
                    r: !1
                }),
                t.fx.info({
                    a: "show",
                    d: 1600,
                    delay: 0,
                    r: !1
                })),
                "in" !== t.modePrev && "out" !== t.modePrev || (t.fx.project({
                    a: "show",
                    d: 1600,
                    delay: 400
                }),
                    t.fx.explore({
                        a: "hide",
                        d: 500,
                        delay: 0
                    }),
                    t.letter.move({
                        start: "home",
                        end: "work",
                        d: 1200
                    }),
                    t.pgn.pageChange()),
                "out" === t.modePrev && (t.fx.info({
                    a: "show",
                    d: 1600,
                    delay: 0
                }),
                    t.fx.title({
                        a: "show",
                        d: 1600,
                        delay: 0,
                        r: !1
                    })),
                "a" === t.modePrev && (t.aFx.play({
                    a: "hide",
                    d: 500,
                    delay: 0
                }),
                    t.fx.project({
                        a: "show",
                        d: 1600,
                        delay: 400
                    }),
                    t.fx.info({
                        a: "show",
                        d: 1600,
                        delay: 0
                    }),
                    t.fx.title({
                        a: "show",
                        d: 1600,
                        delay: 0,
                        r: !1
                    })));
            const r = this.work[s].color.bg.slice();
            t.resizeRq ? (this.color.curr = t.color.bg.rgbNorm,
                this.color.targ = r) : this.reset && (this.color.curr = t.color.gl,
                    this.color.targ = r),
                this.render(),
                this.reset = !1
        }
        needGl() {
            const t = _A
                , i = t.index;
            let s = !1;
            for (let t = 0; t < 3 && (s = R.R(this.color.curr[t]) !== R.R(this.color.targ[t]),
                !s); t++)
                ;
            const e = this.pCurr[i]
                , r = this.pTarg[i]
                , o = R.R(e.h) !== R.R(r.h)
                , h = R.R(e.w) !== R.R(r.w)
                , n = R.R(e.y) !== R.R(r.y)
                , a = R.R(e.x) !== R.R(r.x);
            t.needGL = o || h || n || a || s
        }
        loop() {
            if (this.isWork) {
                this.needGl();
                for (let t = 0; t < 3; t++)
                    this.color.curr[t] = R.Damp(this.color.curr[t], this.color.targ[t], .05);
                _A.color.gl = this.color.curr,
                    this.render()
            }
        }
        render() {
            const t = _A
                , i = t.mode
                , s = t.lerp.tr[i]
                , e = t.prop
                , r = t.propL;
            for (let t = 0; t < this.workL; t++) {
                const i = this.pCurr[t]
                    , o = this.pTarg[t]
                    , h = this.plane[t];
                for (let t = 0; t < r; t++) {
                    const r = e[t];
                    let n = s;
                    "light" === r ? n = .1 : "o" === r && (n = .25),
                        i[r] = R.Damp(i[r], o[r], n),
                        h.tr[r] = i[r]
                }
            }
        }
        pSet(t, i) {
            const s = _A
                , e = s.prop
                , r = s.propL;
            for (let s = 0; s < this.workL; s++) {
                t[s] = {};
                for (let o = 0; o < r; o++) {
                    const r = e[o];
                    t[s][r] = R.R(i[s][r])
                }
            }
        }
    }
    class b {
        constructor() {
            _A.wIndex = 0,
                R.BM(this, ["click", "key", "morphFn"]),
                this.lT3d = [],
                this.sT3d = [],
                this.imgVisible = {
                    l: [],
                    s: []
                },
                this.imgDelay = {
                    l: [],
                    s: []
                }
        }
        intro() {
            const t = _A
                , i = t.config
                , s = i.data
                , e = t.webp ? "webp" : "jpg";
            this.version = "." + e + "?" + i.v,
                this.work = s.work,
                this.workL = s.workL,
                this.l = R.G.id("w-l").children,
                this.qty = this.l.length,
                this.lBg = R.G.class("w-l-bg");
            for (let t = 0; t < this.qty; t++)
                this.lT3d[t] = {};
            this.sW = R.G.id("w-s-w"),
                this.s = R.G.class("w-s");
            for (let t = 0; t < this.qty; t++)
                this.sT3d[t] = {};
            this.sDelay = [],
                this.a = R.G.id("w-a"),
                this.aY = {}
        }
        init() {
            const t = _A;
            this.isWork = t.is.work,
                this.isWork && this.morph({
                    d: 0,
                    e: "o5",
                    shape: "cross"
                });
            const i = this.work[t.index];
            this.media = i.media,
                this.mediaL = i.mediaL,
                this.base = "/static/media/" + i.folder + "/w/",
                this.isWork && (t.wIndex = this.media[0]);
            let s = 0;
            this.no = {},
                this.pos = [];
            for (let t = 0; t < this.qty; t++) {
                this.pos[t] = !1;
                for (let i = 0; i < this.mediaL; i++) {
                    const e = this.media[i] === t;
                    e && (this.pos[t] = e,
                        this.no[t] = s,
                        s++)
                }
            }
            if (this.color(),
                this.isWork) {
                const t = ["l", "s"];
                for (let i = 0; i < this.qty; i++) {
                    for (let s = 0; s < 2; s++) {
                        const e = t[s]
                            , r = "w-" + e + "-img"
                            , o = R.G.class(r)[i];
                        R.Is.def(this.imgDelay[e][i]) && this.imgDelay[e][i].stop(),
                            o.className = r,
                            "l" === e && (this.lBg[i].className = "w-l-bg"),
                            o.src = "data:,",
                            this.imgVisible[e][i] = !1
                    }
                    this.pos[i] && this.imgLoad(i, "s")
                }
                this.imgLoad(_A.wIndex, "l")
            }
        }
        imgLoad(t, i) {
            if (this.imgVisible[i][t])
                return;
            const s = this.no[t];
            let e;
            const r = "l" === i;
            e = r ? 100 : 80 * s;
            const o = "w-" + i + "-img"
                , h = R.G.class(o)[t]
                , n = this.base + i + "/" + s + this.version
                , a = new Image;
            a.src = n,
                a.decode().then((s => {
                    h.src = n,
                        this.imgDelay[i][t] = new R.Delay((s => {
                            h.className = o + " fx",
                                r && (this.lBg[t].className = "w-l-bg fx"),
                                this.imgVisible[i][t] = !0
                        }
                        ), e),
                        this.imgDelay[i][t].run()
                }
                ))
        }
        resize() {
            const t = _A;
            if (t.resizeRq) {
                const i = t.win.h
                    , s = this.l[0].offsetHeight
                    , e = t.data.inGap();
                this.lTarg = R.R(.5 * (i - s) + s + e);
                const r = .2 * this.s[0].offsetHeight
                    , o = i + e - this.sW.getBoundingClientRect().top;
                this.sTarg = [];
                for (let t = 0; t < this.qty; t++)
                    this.sTarg[t] = o + r * t;
                this.aYTarg = 80 * t.winHpsdH
            }
            const i = t.wIndex;
            if (t.resizeRq) {
                for (let s = 0; s < this.qty; s++) {
                    let e, r;
                    this.isWork && s === i ? (e = 0,
                        r = t.isIntro ? this.lTarg : 0) : (e = s > i || !this.isWork ? this.lTarg : -this.lTarg,
                            r = e),
                        this.lT3d[s].targ = e,
                        this.lT3d[s].curr = r,
                        this.lT3d[s].currR = r
                }
                let s = 0;
                for (let i = 0; i < this.qty; i++) {
                    const e = this.isWork && this.pos[i]
                        , r = e ? 0 : this.sTarg[i]
                        , o = t.isIntro ? this.sTarg[i] : r;
                    this.sT3d[i].curr = o,
                        this.sT3d[i].currR = o,
                        this.sT3d[i].targ = o,
                        R.Is.def(this.sDelay[i]) && this.sDelay[i].stop();
                    const h = t.isIntro ? 30 * s : 0;
                    this.sDelay[i] = new R.Delay((t => {
                        this.sT3d[i].targ = r
                    }
                    ), h),
                        this.sDelay[i].run(),
                        e && s++
                }
                const e = this.sTarg[t.wIndex] + this.aYTarg * t.wIndex;
                if (this.isWork) {
                    const i = this.aYTarg * t.wIndex
                        , s = t.isIntro ? e : i;
                    this.aY.targ = i,
                        this.aY.curr = s,
                        this.aY.currR = s
                } else
                    this.aY.targ = e,
                        this.aY.curr = e,
                        this.aY.currR = e
            } else {
                if (this.isWork)
                    for (let t = 0; t < this.qty; t++)
                        this.lT3d[t].curr = this.lTarg,
                            this.lT3d[t].currR = this.lTarg,
                            this.lT3d[t].targ = t === i ? 0 : this.lTarg;
                else
                    this.lT3d[i].targ = this.lTarg;
                let s = 0;
                for (let t = 0; t < this.qty; t++) {
                    const i = this.isWork && this.pos[t];
                    let e = 0;
                    i && (e = 30 * s,
                        s++),
                        R.Is.def(this.sDelay[t]) && this.sDelay[t].stop(),
                        this.sDelay[t] = new R.Delay((s => {
                            this.sT3d[t].targ = i ? 0 : this.sTarg[t]
                        }
                        ), e),
                        this.sDelay[t].run()
                }
                const e = this.sTarg[t.wIndex] + this.aYTarg * t.wIndex;
                this.isWork ? (this.aY.targ = this.aYTarg * t.wIndex,
                    this.aY.curr = e,
                    this.aY.currR = e) : (this.aY.targ = e,
                        this.aY.curr = e,
                        this.aY.currR = e)
            }
            this.aLerp = .08,
                this.render(),
                t.isIntro && R.O(this.a, this.work[t.index].info.opacity)
        }
        arrow(t, i) {
            const s = _A
                , e = t
                , r = this.mediaL - 1;
            let o = 0;
            for (let t = 0; t < this.mediaL; t++)
                if (this.media[t] === s.wIndex) {
                    o = t;
                    break
                }
            o += e,
                o < 0 ? (o = 0,
                    i && this.close()) : o > r && (o = r);
            const h = this.media[o];
            this.up(h)
        }
        click(t) {
            const i = R.Index.class(t.target, "w-s");
            this.up(i)
        }
        up(t) {
            const i = t
                , s = _A;
            if (i === s.wIndex)
                return;
            const e = i > s.wIndex ? -1 : 1;
            this.lT3d[s.wIndex].targ = this.lTarg * e,
                this.lT3d[i].currR = this.lTarg * e * -1,
                this.lT3d[i].curr = this.lTarg * e * -1,
                this.lT3d[i].targ = 0,
                this.aLerp = .13,
                this.aY.targ = this.aYTarg * i,
                s.wIndex = i,
                this.imgLoad(i, "l")
        }
        loop() {
            for (let t = 0; t < this.qty; t++)
                this.lT3d[t].curr = R.Damp(this.lT3d[t].curr, this.lT3d[t].targ, .08),
                    this.lT3d[t].currR = R.R(this.lT3d[t].curr);
            for (let t = 0; t < this.qty; t++)
                this.sT3d[t].curr = R.Damp(this.sT3d[t].curr, this.sT3d[t].targ, .08),
                    this.sT3d[t].currR = R.R(this.sT3d[t].curr);
            this.aY.curr = R.Damp(this.aY.curr, this.aY.targ, this.aLerp),
                this.aY.currR = R.R(this.aY.curr);
            let t = !1;
            for (let i = 0; i < this.qty; i++)
                if (this.lT3d[i].currR !== this.lT3d[i].targ) {
                    t = !0;
                    break
                }
            let i = !1;
            if (!t)
                for (let t = 0; t < this.qty; t++)
                    if (this.sT3d[t].currR !== this.sT3d[t].targ) {
                        i = !0;
                        break
                    }
            const s = this.aY.currR !== this.aY.targ;
            (t || i || s) && this.render()
        }
        render() {
            for (let t = 0; t < this.qty; t++)
                R.T(this.l[t], 0, this.lT3d[t].currR, "px");
            for (let t = 0; t < this.qty; t++)
                R.T(this.s[t], 0, this.sT3d[t].currR, "px");
            R.T(this.a, 0, this.aY.currR, "px")
        }
        color() {
            if (!this.isWork)
                return;
            const t = this.work[_A.index].color
                , i = t.work;
            for (let t = 0; t < this.qty; t++)
                this.lBg[t].style.backgroundColor = i;
            for (let t = 0; t < this.qty; t++)
                this.s[t].style.backgroundColor = i;
            this.a.style.borderColor = t.txt.rgb
        }
        key(t) {
            const i = t.key;
            if ("Tab" === i)
                R.PD(t);
            else {
                const t = "ArrowUp" === i
                    , s = "ArrowDown" === i || "ArrowRight" === i || " " === i
                    , e = t || "ArrowLeft" === i;
                if ("a" === i)
                    R.G.id("n1-0").click();
                else if (s || e) {
                    const i = s ? 1 : -1;
                    this.arrow(i, t)
                } else
                    "Escape" !== i && "p" !== i || this.close()
            }
        }
        close() {
            R.G.id("p").click()
        }
        morphFn(t) {
            const i = "mouseenter" === t.type ? "arrow" : "cross";
            this.morph({
                d: 700,
                e: "o5",
                shape: i
            })
        }
        morph(t) {
            const i = R.G.id("p-s-p");
            R.Is.def(this.morphA) && this.morphA.pause(),
                this.morphA = new R.M({
                    el: i,
                    svg: {
                        type: "polygon",
                        end: {
                            cross: "9.207,10.508 10.509,9.207 8.28,6.977 10.487,4.77 9.219,3.502 7.012,5.709 4.793,3.491 3.492,4.793 5.71,7.011 3.502,9.219 4.77,10.487 6.077,9.179 6.083,9.173 6.978,8.279 7.871,9.172 7.878,9.179",
                            arrow: "9.277,7.759 10.539,6.497 8.298,4.256 8.298,4.256 7.001,2.958 7.001,2.958 7.001,2.958 5.703,4.256 5.703,4.256 3.462,6.498 4.724,7.76 6.077,6.407 6.077,11.042 7.001,11.042 7.921,11.042 7.921,6.403"
                        }[t.shape]
                    },
                    d: t.d,
                    e: t.e
                }),
                this.morphA.play()
        }
        li(t) {
            R.L(".w-s", t, "click", this.click),
                R.L(document, t, "keydown", this.key),
                R.L("#p", t, "mouseenter", this.morphFn),
                R.L("#p", t, "mouseleave", this.morphFn)
        }
        on() {
            this.isWork && this.li("a")
        }
        off() {
            this.isWork && this.li("r")
        }
    }
    class T {
        constructor(t) {
            const i = t.index
                , s = t.delay;
            this.start = t.start,
                this.end = t.end,
                this.prop = {},
                this.prog = {
                    show: {
                        start: i * s,
                        end: 1 - (t.length - 1 - i) * s
                    },
                    hide: {
                        start: 0,
                        end: 1
                    }
                },
                this.curr = this.start
        }
        prepare(t) {
            const i = t.isShow
                , s = t.isRunning;
            i ? (this.prop.start = s ? this.curr : t.start,
                this.prop.end = 0) : (this.prop.start = this.curr,
                    this.prop.end = t.propEndIsEnd ? t.end : t.start);
            const e = i && !s ? this.prog.show : this.prog.hide;
            this.prog.start = e.start,
                this.prog.end = e.end
        }
        loop(t) {
            const i = t.el
                , s = t.elL
                , e = [0, 0]
                , r = (R.Clamp(t.prog, this.prog.start, this.prog.end) - this.prog.start) / t.lineProgEndFirst;
            this.curr = R.Lerp(this.prop.start, this.prop.end, t.rEase(r)),
                t.isTx ? e[0] = this.curr : e[1] = this.curr;
            for (let t = 0; t < s; t++)
                R.T(i[t], e[0], e[1])
        }
    }
    class k {
        constructor(t) {
            this.a = _A;
            const i = t.delay
                , s = t.el
                , e = t.objChildren
                , r = t.prop
                , o = r[0]
                , h = r[1]
                , n = r[2]
                , a = t.indexStart;
            this.random = t.random,
                this.isTx = "x" === o,
                this.element = [],
                this.elementL = [],
                this.obj = [],
                this.objL = s.length,
                this.randUniq = [],
                this.progEndMinShow = 1;
            for (let t = 0; t < this.objL; t++) {
                this.element[t] = e ? s[t].children : [s[t]],
                    this.elementL[t] = this.element[t].length,
                    this.obj[t] = new T({
                        index: a + t,
                        length: this.objL,
                        delay: i,
                        start: h,
                        end: n
                    });
                const r = this.obj[t].prog;
                0 === t && (this.lineProgEndFirst = {
                    show: r.show.end,
                    hide: r.hide.end
                }),
                    r.show.end < this.progEndMinShow && (this.progEndMinShow = r.show.end),
                    this.randUniq[t] = t
            }
        }
        prepare(t) {
            !t.isRunning && this.random && (this.randUniq = R.Rand.uniq(this.objL));
            for (let i = 0; i < this.objL; i++)
                this.obj[i].prepare(t)
        }
        loop(t) {
            const i = t.prog
                , s = t.lineProgEndFirst
                , e = t.rEase;
            for (let t = 0; t < this.objL; t++)
                this.obj[t].loop({
                    el: this.element[this.randUniq[t]],
                    elL: this.elementL[t],
                    prog: i,
                    lineProgEndFirst: s,
                    isTx: this.isTx,
                    rEase: e
                })
        }
    }
    class L {
        constructor(t) {
            this.a = _A;
            const i = t.delay
                , s = t.lineStartTogether || !1
                , e = t.objChildren
                , r = t.random || !1;
            let o = t.el;
            R.Is.und(o.length) && (o = [o]),
                this.lineL = o.length;
            const h = t.prop;
            this.start = h[1],
                this.end = h[2],
                this.progEndMin = {
                    show: 1,
                    hide: 1
                },
                this.line = [];
            let n = 0;
            for (let t = 0; t < this.lineL; t++) {
                this.line[t] = new k({
                    indexStart: n,
                    objChildren: e,
                    el: o[t].children,
                    prop: h,
                    delay: i,
                    random: r
                });
                const a = this.line[t].progEndMinShow;
                a < this.progEndMin.show && (this.progEndMin.show = a),
                    s || (n += this.line[t].objL)
            }
        }
        motion(t) {
            R.Is.def(this.letterAnim) && this.letterAnim.pause();
            let i = this.start
                , s = this.end;
            t.reverse && (i = this.end,
                s = this.start);
            const e = t.action
                , r = "show" === e
                , o = t.d
                , h = R.Ease[t.e]
                , n = this.line
                , a = this.lineL
                , l = n[0].obj[0].curr;
            let d = !1;
            r || (d = i < 0 && l > 0 || (i > 0 && l < 0 || Math.abs(l) < Math.abs(.3 * i)));
            let c = 0;
            Math.abs(l) === Math.abs(i) && (c = t.delay);
            for (let t = 0; t < a; t++)
                n[t].prepare({
                    isShow: r,
                    isRunning: this.isRunning,
                    propEndIsEnd: d,
                    start: i,
                    end: s
                });
            const p = o + o * (1 - this.progEndMin[e]);
            return this.letterAnim = new R.M({
                delay: c,
                d: p,
                update: t => {
                    const i = t.prog;
                    for (let t = 0; t < a; t++)
                        n[t].loop({
                            prog: i,
                            lineProgEndFirst: n[t].lineProgEndFirst[e],
                            rEase: h
                        })
                }
                ,
                cb: t => {
                    this.isRunning = !1
                }
            }),
            {
                play: t => {
                    this.isRunning = !0,
                        this.letterAnim.play()
                }
            }
        }
    }
    class _ {
        intro() {
            const t = _A.config.data;
            this.work = t.work;
            const i = t.workL;
            this.v = R.G.id("v"),
                this.e = R.G.class("e"),
                this.p = R.G.id("p"),
                this.pT = this.p.children[2].children[0],
                this.pPoly = R.G.id("p-s-p"),
                this.t = [],
                this.iL = [],
                this.iR = [],
                this.eA = [],
                this.eL = [],
                this.eS = [],
                this.vVisible = !1,
                this.pS = new L({
                    objChildren: !1,
                    el: this.p.children[0],
                    prop: ["y", 110, 110],
                    delay: 0
                }),
                this.pL = new L({
                    objChildren: !1,
                    el: this.p.children[1],
                    prop: ["y", 110, -110],
                    delay: 0
                }),
                this.pA = new L({
                    objChildren: !1,
                    el: this.p.children[2],
                    prop: ["y", 101, 101],
                    delay: 0
                }),
                this.vT = new L({
                    objChildren: !1,
                    el: this.v.children[0],
                    prop: ["y", 101, 101],
                    delay: 0
                }),
                this.vB = new L({
                    objChildren: !1,
                    el: this.v.children[1],
                    prop: ["y", 101, 101],
                    delay: 0
                });
            for (let t = 0; t < i; t++) {
                const i = this.work[t].title;
                this.t[t] = new L({
                    objChildren: !0,
                    el: R.G.class("t" + t),
                    prop: ["x", -101, 101],
                    delay: i.delay,
                    lineStartTogether: i.lineStartTogether
                }),
                    this.iL[t] = new L({
                        objChildren: !0,
                        el: R.G.class("i-l")[t],
                        prop: ["y", 101, -101],
                        delay: .04
                    }),
                    this.iR[t] = new L({
                        objChildren: !0,
                        el: R.G.class("i-r")[t],
                        prop: ["y", 101, -101],
                        delay: .04
                    }),
                    this.eA[t] = new L({
                        objChildren: !1,
                        el: this.e[t].children[0],
                        prop: ["y", 101, -101],
                        delay: 0
                    }),
                    this.eL[t] = new L({
                        objChildren: !1,
                        el: R.G.class("e-l")[t],
                        prop: ["y", -110, 110],
                        delay: 0
                    }),
                    this.eS[t] = new L({
                        objChildren: !1,
                        el: R.G.class("e-s")[t],
                        prop: ["y", 110, -110],
                        delay: 0
                    })
            }
        }
        project(t) {
            const i = this.value(t.a)
                , s = this.work[_A.index]
                , e = i.isShow && s.visit
                , r = 1600 === t.d ? 1400 : t.d
                , o = 1600 === t.d ? 1200 : t.d
                , h = this.pA.motion({
                    action: t.a,
                    d: r,
                    e: i.e,
                    delay: t.delay
                })
                , n = this.pL.motion({
                    action: t.a,
                    d: o,
                    e: i.e,
                    delay: t.delay + 200
                })
                , a = this.pS.motion({
                    action: t.a,
                    d: r,
                    e: i.e,
                    delay: t.delay + 200
                });
            let l, d;
            if ((e || this.vVisible) && (l = this.vB.motion({
                action: t.a,
                d: t.d,
                e: i.e,
                delay: t.delay + 100
            }),
                d = this.vT.motion({
                    action: t.a,
                    d: t.d,
                    e: i.e,
                    delay: t.delay + 200
                })),
                i.isShow) {
                const t = s.color.txt.rgb
                    , i = this.pT.children[0];
                for (let s = 0; s < 2; s++)
                    i.children[s].style.background = t;
                if (this.pT.style.color = t,
                    this.pPoly.style.fill = t,
                    this.p.children[1].children[0].style.borderRightColor = t,
                    e) {
                    this.v.href = s.visit;
                    for (let i = 0; i < 2; i++)
                        this.v.children[i].children[0].style.color = t;
                    this.v.children[1].children[0].children[0].style.background = t
                }
            }
            R.PE[i.pe](this.p),
                (e || this.vVisible) && (R.PE[i.pe](this.v),
                    d.play(),
                    l.play()),
                e ? this.vVisible = !0 : this.vVisible && (this.vVisible = !1),
                h.play(),
                n.play(),
                a.play()
        }
        explore(t) {
            const i = this.value(t.a)
                , s = this.gIndex(t.index)
                , e = 1600 === t.d ? 1400 : t.d
                , r = 1600 === t.d ? 1200 : t.d
                , o = this.eA[s].motion({
                    action: t.a,
                    d: e,
                    e: i.e,
                    delay: t.delay
                })
                , h = this.eL[s].motion({
                    action: t.a,
                    d: r,
                    e: i.e,
                    delay: t.delay + 200
                })
                , n = this.eS[s].motion({
                    action: t.a,
                    d: e,
                    e: i.e,
                    delay: t.delay + 200
                });
            R.PE[i.pe](this.e[s]),
                o.play(),
                h.play(),
                n.play()
        }
        info(t) {
            const i = this.value(t.a)
                , s = this.gIndex(t.index)
                , e = this.iL[s].motion({
                    action: t.a,
                    d: t.d,
                    e: i.e,
                    delay: t.delay
                })
                , r = this.iR[s].motion({
                    action: t.a,
                    d: t.d,
                    e: i.e,
                    delay: t.delay
                });
            e.play(),
                r.play()
        }
        title(t) {
            const i = this.value(t.a)
                , s = this.gIndex(t.index);
            this.t[s].motion({
                action: t.a,
                d: t.d,
                e: i.e,
                delay: t.delay,
                reverse: t.r
            }).play()
        }
        gIndex(t) {
            return R.Is.def(t) ? t : _A.index
        }
        value(t) {
            const i = "show" === t;
            return {
                isShow: i,
                e: i ? "o6" : "o3",
                pe: i ? "all" : "none",
                cn: i ? "add" : "remove"
            }
        }
    }
    class C {
        intro() {
            const t = _A.config.data;
            this.work = t.work,
                this.workL = t.workL,
                this.x = [],
                this.xCurr = []
        }
        resize() {
            const t = _A;
            if (!t.resizeRq)
                return;
            const i = t.index
                , s = R.G.class("t")[0]
                , e = s.offsetWidth
                , r = parseFloat(getComputedStyle(s.children[0].children[0]).getPropertyValue("padding-right"))
                , o = t.is.home || t.is.about && "w" !== t.modePrev ? "home" : "work";
            for (let t = 0; t < this.workL; t++) {
                const s = R.G.class("t" + t)
                    , h = this.work[t].title;
                this.x[t] = {
                    home: [],
                    work: []
                };
                const n = s
                    , a = n.length;
                for (let s = 0; s < a; s++) {
                    const a = n[s].children
                        , l = a.length;
                    this.x[t].home[s] = [],
                        this.x[t].work[s] = [];
                    let d = 0;
                    const c = [];
                    for (let n = 0; n < l; n++) {
                        c[n] = a[n].offsetWidth - 2 * r * (1 - h.x.workLetterSpacing[s][n]);
                        const p = {
                            home: h.x.home[s][n] * e / 100
                        };
                        if (n > 0 ? (d += c[n - 1],
                            p.work = d) : p.work = 0,
                            n > 0) {
                            const i = this.x[t].home[s][n - 1] + c[n - 1];
                            p.home < i && (p.home = i)
                        }
                        if (n === l - 1) {
                            const t = e - (a[n].offsetWidth - 1.8 * r);
                            p.home > t && (p.home = t)
                        }
                        const g = t === i ? o : "home";
                        R.T(a[n], p[g], 0, "px"),
                            this.x[t].home[s][n] = p.home,
                            this.x[t].work[s][n] = p.work
                    }
                }
            }
        }
        move(t) {
            const i = t.start
                , s = t.end
                , e = "home" === t.end
                , r = t.d
                , o = _A.index
                , h = R.G.class("t" + o)
                , n = h.length
                , a = this.x[o];
            R.Is.def(this.letterAnim) && this.letterAnim.pause();
            const l = []
                , d = R.Is.und(this.xCurr[o]);
            d && (this.xCurr[o] = []);
            const c = []
                , p = [];
            for (let t = 0; t < n; t++) {
                const s = h[t].children.length;
                l[t] = [],
                    d && (this.xCurr[o][t] = []),
                    c[t] = [],
                    p[t] = [];
                for (let r = 0; r < s; r++) {
                    if (d) {
                        const s = a[i][t][r];
                        this.xCurr[o][t][r] = s,
                            l[t][r] = s
                    } else
                        l[t][r] = this.xCurr[o][t][r];
                    e ? (c[t][r] = .01 * r,
                        p[t][r] = 1 - .01 * (s - 1 - r)) : (c[t][r] = 0,
                            p[t][r] = 1)
                }
            }
            const g = r + r * (1 - p[0][0]);
            this.letterAnim = new R.M({
                d: g,
                update: t => {
                    const i = t.prog;
                    for (let t = 0; t < n; t++) {
                        const e = h[t].children
                            , r = e.length;
                        for (let h = 0; h < r; h++) {
                            const r = l[t][h]
                                , n = a[s][t][h]
                                , d = (R.Clamp(i, c[t][h], p[t][h]) - c[t][h]) / p[t][0]
                                , g = R.Lerp(r, n, R.Ease.o6(d));
                            this.xCurr[o][t][h] = g,
                                R.T(e[h], g, 0, "px")
                        }
                    }
                }
            }),
                this.letterAnim.play()
        }
    }
    class I {
        constructor() {
            this.dpr = 2,
                _A.pOver = -1,
                this.first = !0
        }
        intro() {
            this.c = R.G.id("c2d"),
                this.pgn = R.G.class("pgn"),
                this.pgnA = R.G.class("pgn-a"),
                this.pgnB = R.G.class("pgn-b"),
                this.ctx = this.c.getContext("2d", {
                    antialias: !1,
                    depth: !1
                }),
                this.cW = 0,
                this.cH = 0;
            const t = _A.config.data;
            this.work = t.work,
                this.workL = t.workL,
                this.ease = R.Ease.io2,
                this.color = {
                    curr: [],
                    targ: []
                },
                this.pW = {
                    curr: [],
                    targ: []
                },
                this.pLeft = {
                    curr: [],
                    targ: []
                },
                this.pO = {
                    curr: [],
                    targ: []
                },
                this.dom = {
                    y: {
                        curr: 0,
                        targ: 0
                    },
                    o: {
                        curr: 0,
                        targ: 0
                    }
                },
                this.pH = {},
                this.pTop = {},
                this.pOTarg = [],
                this.needDraw = !1
        }
        init() {
            const t = _A;
            this.isAbout = t.is.about,
                this.isWork = t.is.work
        }
        resize() {
            const t = _A;
            if (this.first = !0,
                t.resizeRq) {
                const i = this.dpr
                    , s = t.win.w
                    , e = t.win.h
                    , r = 2
                    , o = 12
                    , h = 14
                    , n = 16 / 9
                    , a = 8;
                this.pTopPx = 49;
                const l = .4
                    , d = 5
                    , c = h * n;
                this.p = {
                    h: h * i,
                    gapX: a * i
                },
                    this.p.top = this.pTopPx * i,
                    this.p.letterSpace = 4 * this.p.gapX,
                    this.p.w = {
                        out: 1,
                        in: c * i
                    },
                    this.p.left = {
                        out: s - .5 * this.workL * this.p.gapX
                    },
                    this.p.left.in = this.p.left.out - .5 * this.p.w.in - .5 * this.p.gapX + r,
                    this.cW = s * i,
                    this.cH = e * i,
                    this.c.width = this.cW,
                    this.c.height = this.cH,
                    this.ctx.lineWidth = r,
                    this.cursor = {
                        top: this.pTopPx - d,
                        bottom: this.pTopPx + h + d,
                        gapX: .5 * a * i
                    };
                const p = []
                    , g = [];
                for (let t = 0; t < this.workL; t++)
                    p[t] = (this.p.left.in + t * (this.p.gapX + this.p.w.out)) / i,
                        g[t] = p[t] + (this.p.w.in - r) / i;
                const u = {
                    top: this.pTopPx,
                    h: h,
                    distance: l,
                    left: p,
                    right: g
                };
                for (let t = 0; t < this.workL; t++) {
                    const i = this.pgn[t].style;
                    i.top = u.top + "px",
                        i.height = u.h + "px",
                        i.fontSize = o + "px",
                        i.lineHeight = h + "px";
                    const s = this.pgnA[t]
                        , e = this.pgnB[t];
                    s.style.left = u.left[t] - s.offsetWidth * (1 + u.distance) + "px",
                        e.style.left = u.right[t] + e.offsetWidth * u.distance + "px"
                }
                const w = this.colorFn();
                for (let t = 0; t < 3; t++)
                    this.color.targ[t] = w[t],
                        this.color.curr[t] = w[t];
                const m = this.propTopH();
                this.pH.curr = m.h,
                    this.pTop.curr = m.top,
                    this.pH.targ = m.h,
                    this.pTop.targ = m.top;
                for (let i = 0; i < this.workL; i++) {
                    const s = this.propLeftW(i)
                        , e = this.propO(i);
                    this.pW.targ[i] = s.w,
                        this.pLeft.targ[i] = s.left,
                        this.pO.targ[i] = t.isIntro ? 0 : e,
                        this.pW.curr[i] = s.w,
                        this.pLeft.curr[i] = s.left,
                        this.pO.curr[i] = t.isIntro ? 0 : e
                }
            }
            R.Is.def(this.delay) && this.delay.stop(),
                t.isIntro && (this.delay = new R.Delay((t => {
                    for (let t = 0; t < this.workL; t++) {
                        const i = this.propO(t);
                        this.pO.targ[t] = i
                    }
                }
                ), 400),
                    this.delay.run());
            const i = ["y", "o"];
            for (let s = 0; s < 2; s++) {
                const e = i[s];
                let r;
                r = "y" === e ? this.isWork || this.isAbout && _A.was.work ? this.pTopPx : 0 : this.isAbout ? 0 : 1,
                    t.resizeRq && (this.dom[e].curr = r),
                    this.dom[e].targ = r
            }
        }
        up() {
            for (let t = 0; t < this.workL; t++) {
                const i = this.propLeftW(t)
                    , s = this.propO(t);
                this.pW.targ[t] = i.w,
                    this.pLeft.targ[t] = i.left,
                    this.pO.targ[t] = s
            }
            const t = this.colorFn();
            for (let i = 0; i < 3; i++)
                this.color.targ[i] = t[i]
        }
        loop() {
            const t = _A;
            t.pOver = -1;
            const i = t.index
                , s = t.indexPrev
                , e = this.ctx
                , r = .1
                , o = R.R(t.x * this.workL)
                , h = 30 * t.latency.x
                , n = t.cursor
                , a = n.y > this.cursor.top && n.y < this.cursor.bottom
                , l = n.x * this.dpr
                , d = ["y", "o"];
            for (let t = 0; t < 2; t++) {
                const i = d[t]
                    , s = "y" === i
                    , e = s ? r : .2;
                if (this.dom[i].curr = R.Damp(this.dom[i].curr, this.dom[i].targ, e),
                    R.R(this.dom[i].curr, 4) !== R.R(this.dom[i].targ, 4)) {
                    const t = s ? R.R(-this.dom.y.curr) : R.R(this.dom.o.curr, 4);
                    for (let i = 0; i < this.workL; i++)
                        s ? (R.T(this.pgnA[i], 0, t, "px"),
                            R.T(this.pgnB[i], 0, t, "px")) : (R.O(this.pgnA[i].children[0], t),
                                R.O(this.pgnB[i].children[0], t))
                }
            }
            const c = R.R(this.pO.curr[i]) !== R.R(this.pO.targ[i]) || 0 !== R.R(this.pO.curr[i])
                , p = R.R(this.pO.curr[s]) !== R.R(this.pO.targ[s]) || 0 !== R.R(this.pO.curr[s]);
            if (!(c || p))
                return;
            for (let t = 0; t < 3; t++)
                this.color.curr[t] = R.Damp(this.color.curr[t], this.color.targ[t], r);
            const g = "rgba(" + this.color.curr[0] + "," + this.color.curr[1] + "," + this.color.curr[2] + ",";
            for (let i = 0; i < this.workL; i++) {
                this.pW.curr[i] = R.Damp(this.pW.curr[i], this.pW.targ[i], r),
                    this.pLeft.curr[i] = R.Damp(this.pLeft.curr[i], this.pLeft.targ[i], r);
                const s = R.R(this.pW.curr[i])
                    , e = R.R(this.pLeft.curr[i]);
                if (this.pOTarg[i] = 0,
                    a) {
                    const r = e - this.cursor.gapX
                        , o = e + s + this.cursor.gapX;
                    l > r && l < o && (this.pOTarg[i] = "in" === t.mode ? 1 : .6,
                        t.pOver = i)
                }
            }
            if (t.needGL || this.first || this.needDraw) {
                this.pH.curr = R.Damp(this.pH.curr, this.pH.targ, r),
                    this.pTop.curr = R.Damp(this.pTop.curr, this.pTop.targ, r);
                const t = this.pTop.curr + (this.p.h - this.pH.curr);
                e.clearRect(0, 0, this.cW, this.cH);
                for (let i = 0; i < this.workL; i++) {
                    const s = R.R(this.pLeft.curr[i])
                        , r = R.R(this.pW.curr[i]);
                    let n = .06;
                    (r > this.p.w.out || this.isAbout || this.isWork) && (n = .25),
                        this.pO.curr[i] = R.Damp(this.pO.curr[i], this.pO.targ[i], n);
                    let a = 0
                        , l = 0;
                    const d = Math.abs(i - o);
                    d < 6 && (a = this.ease(1 - d / 6) * h,
                        l = .5 * a),
                        e.strokeStyle = g + Math.min(R.R(this.pO.curr[i]) + this.pOTarg[i], 1) + ")",
                        e.beginPath(),
                        e.rect(s, R.R(t - l), r, R.R(this.pH.curr + a)),
                        e.closePath(),
                        e.stroke()
                }
                this.needDraw = !1
            }
            -1 !== t.pOver && (this.needDraw = !0),
                this.first = !1
        }
        pageChange() {
            for (let t = 0; t < this.workL; t++)
                this.pO.targ[t] = this.propO(t);
            const t = this.propTopH();
            this.pH.targ = t.h,
                this.pTop.targ = t.top
        }
        colorFn() {
            const t = _A
                , i = t.index
                , s = []
                , e = this.pgnIsOpen() ? this.work[i].color.txt[255] : t.color.txt.rgb255;
            return s[0] = e[0],
                s[1] = e[1],
                s[2] = e[2],
                s
        }
        propTopH() {
            const t = !_A.is.home && "a" !== _A.mode
                , i = this.p;
            let s = i.h;
            t && (s *= .5);
            return {
                top: t ? 0 : i.top,
                h: s
            }
        }
        propO(t) {
            const i = _A
                , s = i.index === t
                , e = !i.is.home
                , r = this.pgnIsOpen();
            let o;
            return o = e ? 0 : r && s ? 1 : .2,
                o
        }
        propLeftW(t) {
            const i = _A.index
                , s = i === t
                , e = this.pgnIsOpen()
                , r = this.p;
            let o = (e ? r.left.in : r.left.out) + t * (r.gapX + r.w.out);
            e && (t < i ? o -= r.letterSpace : t > i && (o += r.w.in + r.letterSpace));
            return {
                left: o,
                w: e && s ? r.w.in : r.w.out
            }
        }
        pgnIsOpen() {
            const t = _A
                , i = t.mode
                , s = t.modePrev;
            return "in" === i || "w" === i || "a" === i && ("in" === s || "w" === s)
        }
    }
    class P {
        intro() {
            this.workL = _A.config.data.workL;
            const t = R.G.class("pgn");
            this._a = [],
                this._b = [];
            for (let i = 0; i < this.workL; i++)
                this._a[i] = new L({
                    objChildren: !1,
                    el: R.G.class("pgn-a", t[i]),
                    prop: ["x", -101, 101],
                    delay: 0,
                    random: !0
                }),
                    this._b[i] = new L({
                        objChildren: !1,
                        el: R.G.class("pgn-b", t[i]),
                        prop: ["x", -101, 101],
                        delay: 0,
                        random: !0
                    })
        }
        show(t) {
            const i = _A.index
                , s = t.r
                , e = t.d;
            let r = s
                , o = s;
            t.out && (r = !0,
                o = !1);
            const h = this._a[i].motion({
                action: "show",
                d: e,
                e: "o6",
                delay: 100,
                reverse: r
            })
                , n = this._b[i].motion({
                    action: "show",
                    d: e,
                    e: "o6",
                    delay: 100,
                    reverse: o
                });
            h.play(),
                n.play()
        }
        hideCurr(t) {
            this.hide({
                index: _A.index,
                reverse: t.r,
                out: t.out
            })
        }
        hide(t) {
            const i = t.index
                , s = t.r;
            let e = s
                , r = s;
            t.out && (e = !1,
                r = !0);
            const o = this._a[i].motion({
                action: "hide",
                d: 200,
                e: "o3",
                delay: 0,
                reverse: e
            })
                , h = this._b[i].motion({
                    action: "hide",
                    d: 200,
                    e: "o3",
                    delay: 0,
                    reverse: r
                });
            o.play(),
                h.play()
        }
    }
    class O {
        resize() {
            const t = _A
                , i = t.config.data;
            this.work = i.work,
                this.workL = i.workL;
            const s = t.win;
            this.winW = s.w,
                this.winH = s.h;
            const e = t.winWpsdW;
            this.mode = {
                out: {
                    gapX: 20 * t.ratio,
                    w: 100 * t.ratio,
                    h: 370 * t.ratio
                },
                in: {
                    w: 1054 * t.ratio,
                    h: 602 * t.ratio,
                    gapX: 152 * e
                }
            },
                this.mode.out.x = .5 * (this.winW - this.mode.out.w),
                this.mode.out.y = .5 * (this.winH - this.mode.out.h),
                this.mode.in.x = .5 * (this.winW - this.mode.in.w),
                this.mode.in.y = .5 * (this.winH - this.mode.in.h)
        }
        inGap() {
            return this.mode.in.gapX
        }
        outGapXW() {
            return this.mode.out.w + this.mode.out.gapX
        }
        modeOut() {
            const t = _A
                , i = t.isIntro
                , s = this.mode.out
                , e = "a" === t.mode
                , r = e ? 0 : 1
                , o = [];
            for (let h = 0; h < this.workL; h++) {
                const n = o[h] = {};
                if (n.y = s.y,
                    n.h = s.h,
                    n.w = s.w,
                    i)
                    n.x = s.x + (s.gapX + s.w) * h;
                else if (e) {
                    const i = h - t.index;
                    n.x = s.x + (s.gapX + s.w) * h + (s.gapX + s.w) * i * .2
                } else
                    n.x = s.x + (s.gapX + s.w) * h;
                n.light = 0,
                    n.multiply = 0,
                    n.o = r,
                    n.pY = 0,
                    n.scale = 0
            }
            return o
        }
        modeOutIntro() {
            const t = this.mode.out
                , i = this.modeOut();
            for (let s = 0; s < this.workL; s++)
                i[s].x = this.winW + (t.gapX + t.w) * s * 3;
            return i
        }
        modeIn() {
            const t = _A
                , i = this.mode.in
                , s = this.mode.out
                , e = t.index
                , r = this.work[e].multiply
                , o = "a" === t.mode
                , h = o ? 0 : 1
                , n = [];
            for (let t = 0; t < this.workL; t++) {
                const a = t - e
                    , l = n[t] = {};
                if (0 === a)
                    l.w = i.w,
                        l.x = i.x;
                else {
                    const t = .1
                        , e = .5 * i.w;
                    let r = .5 * (this.winW - (i.w + 2 * i.gapX));
                    r < e && (r = e),
                        a > 0 ? 1 === a ? (l.w = r,
                            l.x = o ? i.x + (i.gapX + i.w) + i.gapX : i.x + (i.gapX + i.w)) : (l.w = s.w,
                                l.x = i.x + (i.gapX + i.w) + (i.gapX + r) + (i.gapX + s.w) * (a - 2) + i.gapX * (a - 1) * (a - 1) * t) : a < 0 && (-1 === a ? (l.w = r,
                                    l.x = o ? i.x - (i.gapX + r) - i.gapX : i.x - (i.gapX + r)) : (l.w = s.w,
                                        l.x = i.x - (i.gapX + r) + (i.gapX + s.w) * (a + 1) + i.gapX * (a + 1) * -(a + 1) * t))
                }
                l.y = i.y,
                    l.h = i.h,
                    l.light = t === e ? 1 : 0,
                    l.multiply = t === e ? 0 : r,
                    l.o = h,
                    l.pY = 0,
                    l.scale = o ? .15 : 0
            }
            return n
        }
        modeW() {
            const t = _A
                , i = this.mode.out
                , s = this.mode.in
                , e = t.index
                , r = this.work[e].multiply
                , o = "a" === t.mode ? 0 : 1
                , h = [];
            for (let t = 0; t < this.workL; t++) {
                const n = t - e
                    , a = h[t] = {}
                    , l = 0 === n;
                if (l)
                    a.x = s.x,
                        a.w = s.w,
                        a.y = .8 * -(s.h + s.gapX),
                        a.h = .8 * s.h;
                else {
                    const t = .1
                        , e = .5 * s.w;
                    let r = .5 * (this.winW - (s.w + 2 * s.gapX));
                    r < e && (r = e),
                        n > 0 ? 1 === n ? (a.w = r,
                            a.x = this.winW + s.gapX) : (a.w = i.w,
                                a.x = s.x + (s.gapX + s.w) + (s.gapX + r) + (s.gapX + i.w) * (n - 2) + s.gapX * (n - 1) * (n - 1) * t) : n < 0 && (-1 === n ? (a.w = r,
                                    a.x = -(r + s.gapX)) : (a.w = i.w,
                                        a.x = s.x - (s.gapX + r) + (s.gapX + i.w) * (n + 1) + s.gapX * (n + 1) * -(n + 1) * t)),
                        a.y = s.y,
                        a.h = s.h
                }
                a.light = l ? 1 : 0,
                    a.multiply = l ? 0 : r,
                    a.o = o,
                    a.pY = l ? -.1 : 0,
                    a.scale = 0
            }
            return h
        }
        hToW() {
            const t = _A
                , i = "in" === t.mode ? 0 : t.index * this.outGapXW()
                , s = t.h.pCurr;
            for (let t = 0; t < this.workL; t++)
                s[t].x -= i;
            return s
        }
        wToH() {
            const t = _A
                , i = "in" === t.mode ? 0 : t.index * this.outGapXW()
                , s = t.w.pCurr;
            for (let t = 0; t < this.workL; t++)
                s[t].x -= i;
            return s
        }
    }
    class D {
        constructor() {
            const t = _A.config.data;
            this.work = t.work,
                this.workL = t.workL,
                this.run()
        }
        run() {
            const t = _A
                , i = t.is;
            if ((i.home || i.about) && R.Is.und(t.index))
                t.index = 0;
            else
                for (let i = 0; i < this.workL; i++)
                    if (this.work[i].url === t.route.new.url) {
                        t.index = i;
                        break
                    }
        }
    }
    class E {
        constructor() {
            this.workL = _A.config.data.workL,
                this.li = R.G.id("li")
        }
        reset() {
            for (let t = 0; t < this.workL; t++)
                this.li.children[t].style.display = "block"
        }
        run(t) {
            const i = R.Is.def(t.indexPrev) ? t.indexPrev : -1
                , s = t.index
                , e = s + 2
                , r = s - 2;
            for (let t = 0; t < this.workL; t++) {
                const s = (o = t) > r && o < e || i === t ? "block" : "none";
                this.li.children[t].style.display = s
            }
            var o
        }
    }
    class W {
        intro() {
            this.work = _A.config.data.work;
            const t = _A.color.txt.rgb255;
            this.rgbBase = "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")",
                this.n0 = R.G.id("n0"),
                this.n0L = this.n0.children.length,
                this.n1 = R.G.class("n1"),
                this.n1_0 = R.G.id("n1-0"),
                this.n1_0C = this.n1_0.children[0],
                this.n1_1 = R.G.id("n1-1"),
                this.n2W = R.G.id("n2"),
                this.n2 = R.G.class("n2"),
                this.n3 = R.G.class("n3"),
                this.n0A = new L({
                    objChildren: !0,
                    el: this.n0,
                    prop: ["x", -110, 110],
                    delay: .02
                }),
                this.n10A = new L({
                    objChildren: !1,
                    el: this.n1[0],
                    prop: ["y", 110, -110],
                    delay: 0
                }),
                this.n11A = new L({
                    objChildren: !1,
                    el: this.n1[1],
                    prop: ["y", 110, -110],
                    delay: 0
                }),
                this.n2A = new L({
                    objChildren: !1,
                    el: this.n2W.children,
                    prop: ["y", 110, -110],
                    delay: 0
                }),
                this.n3A = new L({
                    objChildren: !1,
                    el: R.G.id("n3").children,
                    prop: ["y", 110, -110],
                    delay: .02
                })
        }
        init() {
            const t = _A
                , i = t.is
                , s = t.was
                , e = t.isIntro;
            if (e) {
                t.load.motion({
                    action: "hide",
                    d: 500,
                    e: "o3",
                    delay: 0,
                    reverse: !1
                }).play(),
                    R.PE.all(this.n2W);
                const s = i.about ? 700 : 200;
                this.n2A.motion({
                    action: "show",
                    d: 1600,
                    e: "o6",
                    delay: s,
                    reverse: !1
                }).play()
            }
            if (i.about) {
                R.PE.none(this.n0),
                    R.PE.none(this.n1_0),
                    R.PE.all(this.n1_1);
                const t = this.n11A.motion({
                    action: "show",
                    d: 1600,
                    e: "o6",
                    delay: 500,
                    reverse: !1
                });
                if (!e) {
                    this.n10A.motion({
                        action: "hide",
                        d: 500,
                        e: "o3",
                        delay: 0,
                        reverse: !1
                    }).play()
                }
                const i = this.n0A.motion({
                    action: "hide",
                    d: 500,
                    e: "o3",
                    delay: 0,
                    reverse: !1
                })
                    , s = this.n3A.motion({
                        action: "hide",
                        d: 500,
                        e: "o3",
                        delay: 0,
                        reverse: !1
                    });
                i.play(),
                    s.play(),
                    t.play()
            } else {
                if (R.PE.none(this.n1_1),
                    R.PE.all(this.n0),
                    R.PE.all(this.n1_0),
                    !e) {
                    this.n11A.motion({
                        action: "hide",
                        d: 500,
                        e: "o3",
                        delay: 0,
                        reverse: !1
                    }).play()
                }
                if (s.about || e) {
                    const t = e ? 200 : 0
                        , s = this.n0A.motion({
                            action: "show",
                            d: 1600,
                            e: "o6",
                            delay: t,
                            reverse: !1
                        });
                    let r;
                    r = e || i.home ? 200 : 500;
                    const o = this.n10A.motion({
                        action: "show",
                        d: 1600,
                        e: "o6",
                        delay: r,
                        reverse: !1
                    })
                        , h = e ? 200 : 0
                        , n = this.n3A.motion({
                            action: "show",
                            d: 1600,
                            e: "o6",
                            delay: h,
                            reverse: !1
                        });
                    s.play(),
                        o.play(),
                        n.play()
                }
            }
        }
        colorFix(t) {
            const i = this.gColor(t.default);
            for (let t = 0; t < 2; t++)
                this.sC(this.n2[t], i)
        }
        color(t) {
            const i = this.gColor(t.default);
            for (let t = 0; t < this.n0L; t++)
                this.sC(this.n0.children[t].children[0], i);
            this.sC(this.n1_0, i);
            for (let t = 0; t < 2; t++)
                this.n1_0C.children[0].style.backgroundColor = i,
                    this.n1_0C.children[1].style.backgroundColor = i;
            for (let t = 0; t < 2; t++)
                this.sC(this.n2[t], i);
            for (let t = 0; t < 3; t++)
                this.sC(this.n3[t], i)
        }
        gColor(t) {
            return t ? this.rgbBase : this.work[_A.index].color.txt.rgb
        }
        sC(t, i) {
            t.style.color = i
        }
    }
    class X {
        intro() {
            this.nif = new L({
                objChildren: !0,
                el: R.G.class("a-nif"),
                prop: ["x", -101, 101],
                delay: .02,
                lineStartTogether: !0,
                random: !0
            }),
                this.social = new L({
                    objChildren: !0,
                    el: R.G.id("a-social"),
                    prop: ["y", 110, -110],
                    delay: .02
                }),
                this.p = new L({
                    objChildren: !1,
                    el: R.G.id("a-p").children,
                    prop: ["y", 110, -110],
                    delay: .04
                }),
                this.li = new L({
                    objChildren: !0,
                    el: R.G.class("a-li"),
                    prop: ["y", 110, -110],
                    delay: .02,
                    lineStartTogether: !0
                }),
                this.designA = new L({
                    objChildren: !1,
                    el: R.G.id("a-design"),
                    prop: ["y", 110, -110],
                    delay: 0
                }),
                this.rightsA = new L({
                    objChildren: !1,
                    el: R.G.id("a-rights").children,
                    prop: ["y", 110, -110],
                    delay: 0
                })
        }
        play(t) {
            const i = "show" === t.a ? "o6" : "o3"
                , s = t.delay > 0 ? 1 : 0
                , e = this.nif.motion({
                    action: t.a,
                    d: t.d,
                    e: i,
                    delay: t.delay,
                    reverse: !1
                })
                , r = this.p.motion({
                    action: t.a,
                    d: t.d,
                    e: i,
                    delay: t.delay + 200 * s,
                    reverse: !1
                })
                , o = this.li.motion({
                    action: t.a,
                    d: t.d,
                    e: i,
                    delay: t.delay + 300 * s,
                    reverse: !1
                })
                , h = this.social.motion({
                    action: t.a,
                    d: t.d,
                    e: i,
                    delay: t.delay + 400 * s,
                    reverse: !1
                })
                , n = this.designA.motion({
                    action: t.a,
                    d: t.d,
                    e: i,
                    delay: t.delay + 600 * s,
                    reverse: !1
                })
                , a = this.rightsA.motion({
                    action: t.a,
                    d: t.d,
                    e: i,
                    delay: t.delay + 600 * s,
                    reverse: !1
                });
            e.play(),
                h.play(),
                r.play(),
                o.play(),
                n.play(),
                a.play()
        }
    }
    class S {
        constructor() {
            R.BM(this, ["key"])
        }
        init() {
            this.isAbout = _A.is.about
        }
        key(t) {
            const i = t.key;
            "Tab" === i ? R.PD(t) : "Escape" !== i && "c" !== i || R.G.id("n1-1").click()
        }
        l(t) {
            R.L(document, t, "keydown", this.key)
        }
        on() {
            this.isAbout && this.l("a")
        }
        off() {
            this.isAbout && this.l("r")
        }
    }
    new class {
        constructor(t) {
            new s(t)
        }
    }
        ({
            device: "d",
            engine: class {
                constructor() {
                    const t = _A;
                    t.isIntro = !0,
                        t.needGL = !0,
                        t.prop = ["x", "y", "w", "h", "light", "multiply", "o", "pY", "scale"],
                        t.propL = t.prop.length,
                        t.mode = "out",
                        t.modePrev = t.mode,
                        t.lerp = {
                            tr: {
                                out: .07,
                                in: .07,
                                w: .07,
                                a: .07
                            },
                            scroll: {
                                out: .08,
                                in: .07,
                                w: .07,
                                a: .08
                            },
                            latency: {
                                out: .08,
                                in: .3,
                                w: .07,
                                a: .08
                            }
                        },
                        t.cursor = {
                            x: 0,
                            y: 0
                        },
                        t.latency = {
                            x: 0,
                            rotate: 0
                        },
                        R.BM(this, ["resize", "loop"]),
                        this.ro = new R.ROR(this.resize),
                        this.raf = new R.RafR(this.loop),
                        this.win = new e,
                        t.pgnX = new P,
                        t.pgn = new I,
                        t.h = new v,
                        t.fx = new _,
                        t.letter = new C,
                        t.w = new A,
                        t.wFx = new b,
                        t.data = new O,
                        t.nav = new W,
                        t.aFx = new X,
                        t.a = new S
                }
                glInit(t) {
                    this.gl = new f(t)
                }
                intro() {
                    const t = _A;
                    t.indexSet = new D,
                        t.li = new E,
                        this.gl.intro(),
                        t.pgnX.intro(),
                        t.pgn.intro(),
                        t.h.intro(),
                        t.w.intro(),
                        t.fx.intro(),
                        t.letter.intro(),
                        t.wFx.intro(),
                        t.nav.intro(),
                        t.aFx.intro(),
                        this.raf.run()
                }
                init() {
                    const t = _A;
                    t.h.init(),
                        t.w.init(),
                        t.a.init(),
                        t.pgn.init(),
                        t.nav.init(),
                        t.wFx.init(),
                        this.resize(),
                        this.ro.on(),
                        t.isIntro = !1
                }
                resize() {
                    const t = _A;
                    this.win.resize(),
                        t.data.resize(),
                        this.gl.resize(),
                        t.h.resize(),
                        t.w.resize(),
                        t.wFx.resize(),
                        t.li.reset(),
                        t.pgn.resize(),
                        t.letter.resize(),
                        t.li.run({
                            index: t.index
                        }),
                        this.gl.loop()
                }
                on() {
                    const t = _A;
                    t.h.on(),
                        t.a.on(),
                        t.wFx.on()
                }
                loop() {
                    const t = _A;
                    t.w.loop(),
                        t.h.loop(),
                        t.pgn.loop(),
                        t.wFx.loop(),
                        t.needGL && this.gl.loop()
                }
                off() {
                    const t = _A;
                    this.ro.off(),
                        t.h.off(),
                        t.a.off(),
                        t.wFx.off()
                }
            }
            ,
            transition: {
                intro: class {
                    constructor(t) {
                        const i = _A;
                        i.load = new L({
                            objChildren: !0,
                            el: R.G.id("load"),
                            prop: ["x", -110, 110],
                            delay: .03
                        }),
                            i.load.motion({
                                action: "show",
                                d: 0,
                                e: "o6",
                                delay: 0,
                                reverse: !1
                            }).play(),
                            t((t => {
                                i.engine.glInit((t => {
                                    i.engine.intro(),
                                        i.engine.init(),
                                        i.engine.on(),
                                        i.mutating = !1
                                }
                                ))
                            }
                            ))
                    }
                }
                ,
                mutation: class {
                    constructor() {
                        this.a = _A
                    }
                    out() {
                        const t = this.a;
                        t.engine.off(),
                            t.main.getData()
                    }
                    in() {
                        const t = this.a;
                        t.indexPrev = t.index,
                            t.engine.init(),
                            t.engine.on(),
                            t.mutating = !1
                    }
                }
            }
        })
}();
