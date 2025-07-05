import Controller from "./classes/Controller"
import Engine from "./classes/Engine"
import Mutation from "./classes/Mutation"
import Intro from "./classes/Intro"

window.R = {},
    R.iLerp = (t, e, i) => R.Clamp((i - t) / (e - t), 0, 1),
    R.Lerp = (t, e, i) => t * (1 - i) + e * i,
    R.Damp = (t, e, i) => R.Lerp(t, e, 1 - Math.exp(Math.log(1 - i) * RD)),
    R.Remap = (t, e, i, s, r) => R.Lerp(i, s, R.iLerp(t, e, r)),
    R.M = class {
        constructor(t) {
            R.BM(this, ["gRaf", "run", "uSvg", "uLine", "uProp"]),
                this.v = this.vInit(t),
                this.r = new R.RafR(this.run)
        }
        vInit(e) {
            let r = {
                el: R.Select.el(e.el),
                e: {
                    curve: e.e || "linear"
                },
                d: {
                    origin: e.d || 0,
                    curr: 0
                },
                delay: e.delay || 0,
                cb: e.cb || !1,
                r: e.r || 2,
                prog: 0,
                progE: 0,
                elapsed: 0
            };
            r.elL = r.el.length,
                R.Has(e, "update") ? r.up = t => {
                    e.update(r)
                }
                    : R.Has(e, "svg") ? r.up = this.uSvg : R.Has(e, "line") ? r.up = this.uLine : r.up = this.uProp;
            var i = e.p || !1
                , t = e.svg || !1
                , a = e.line || !1;
            let s = !1;
            if (i) {
                r.prop = {},
                    r.propI = [];
                var h = Object.keys(i);
                r.propL = h.length;
                let t = r.propL;
                for (; t--;) {
                    var l = h[t]
                        , l = (r.prop[t] = {
                            name: l,
                            origin: {
                                start: i[l][0],
                                end: i[l][1]
                            },
                            curr: i[l][0],
                            start: i[l][0],
                            end: i[l][1],
                            unit: i[l][2] || "%"
                        },
                            l.charAt(0))
                        , o = "r" === l && s ? "r2" : l;
                    s = "r" === l,
                        r.propI[o] = t
                }
            } else if (t)
                r.svg = {
                    type: t.type,
                    attr: "polygon" === t.type ? "points" : "d",
                    end: t.end,
                    originArr: {},
                    arr: {},
                    val: []
                },
                    r.svg.start = t.start || R.Ga(r.el[0], r.svg.attr),
                    r.svg.curr = r.svg.start,
                    r.svg.originArr.start = R.Svg.split(r.svg.start),
                    r.svg.originArr.end = R.Svg.split(r.svg.end),
                    r.svg.arr.start = r.svg.originArr.start,
                    r.svg.arr.end = r.svg.originArr.end,
                    r.svg.arrL = r.svg.arr.start.length;
            else if (a) {
                r.line = {
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
                for (let s = 0; s < r.elL; s++) {
                    var n = a.elWL || r.el[s];
                    r.line.shapeL[s] = R.Svg.shapeL(n);
                    let t;
                    if (r.line.dashed) {
                        var p = r.line.dashed;
                        let e = 0;
                        var d = p.split(/[\s,]/)
                            , c = d.length;
                        for (let t = 0; t < c; t++)
                            e += parseFloat(d[t]) || 0;
                        let i = "";
                        var g = Math.ceil(r.line.shapeL[s] / e);
                        for (let t = 0; t < g; t++)
                            i += p + " ";
                        t = i + "0 " + r.line.shapeL[s]
                    } else
                        t = r.line.shapeL[s];
                    r.el[s].style.strokeDasharray = t,
                        r.line.origin.start[s] = r.line.coeff.start * r.line.shapeL[s],
                        r.line.origin.end[s] = r.line.coeff.end * r.line.shapeL[s],
                        r.line.curr[s] = r.line.origin.start[s],
                        r.line.start[s] = r.line.origin.start[s],
                        r.line.end[s] = r.line.origin.end[s]
                }
            }
            return r
        }
        play(t) {
            this.pause(),
                this.vUpd(t),
                this.delay.run()
        }
        pause() {
            this.r.stop(),
                this.delay && this.delay.stop()
        }
        vUpd(t) {
            var e = t || {}
                , i = R.Has(e, "reverse") ? "start" : "end";
            if (R.Has(this.v, "prop")) {
                let t = this.v.propL;
                for (; t--;)
                    this.v.prop[t].end = this.v.prop[t].origin[i],
                        this.v.prop[t].start = this.v.prop[t].curr,
                        R.Has(e, "p") && R.Has(e.p, this.v.prop[t].name) && (R.Has(e.p[this.v.prop[t].name], "newEnd") && (this.v.prop[t].end = e.p[this.v.prop[t].name].newEnd),
                            R.Has(e.p[this.v.prop[t].name], "newStart")) && (this.v.prop[t].start = e.p[this.v.prop[t].name].newStart)
            } else if (R.Has(this.v, "svg"))
                R.Has(e, "svg") && R.Has(e.svg, "start") ? this.v.svg.arr.start = e.svg.start : this.v.svg.arr.start = R.Svg.split(this.v.svg.curr),
                    R.Has(e, "svg") && R.Has(e.svg, "end") ? this.v.svg.arr.end = e.svg.end : this.v.svg.arr.end = this.v.svg.originArr[i];
            else if (R.Has(this.v, "line")) {
                for (let t = 0; t < this.v.elL; t++)
                    this.v.line.start[t] = this.v.line.curr[t];
                if (R.Has(e, "line") && R.Has(e.line, "end")) {
                    this.v.line.coeff.end = (100 - e.line.end) / 100;
                    for (let t = 0; t < this.v.elL; t++)
                        this.v.line.end[t] = this.v.line.coeff.end * this.v.line.shapeL[t]
                } else
                    for (let t = 0; t < this.v.elL; t++)
                        this.v.line.end[t] = this.v.line.origin[i][t]
            }
            this.v.d.curr = R.Has(e, "d") ? e.d : R.R(this.v.d.origin - this.v.d.curr + this.v.elapsed),
                this.v.e.curve = e.e || this.v.e.curve,
                this.v.e.calc = R.Is.str(this.v.e.curve) ? R.Ease[this.v.e.curve] : R.Ease4(this.v.e.curve),
                this.v.delay = (R.Has(e, "delay") ? e : this.v).delay,
                this.v.cb = (R.Has(e, "cb") ? e : this.v).cb,
                this.v.prog = this.v.progE = 0 === this.v.d.curr ? 1 : 0,
                this.delay = new R.Delay(this.gRaf, this.v.delay)
        }
        gRaf() {
            this.r.run()
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
            var t = this.v.prop
                , e = this.v.propI;
            let i = this.v.propL;
            for (; i--;)
                t[i].curr = this.lerp(t[i].start, t[i].end);
            var s = R.Has(e, "x") ? t[e.x].curr + t[e.x].unit : 0
                , r = R.Has(e, "y") ? t[e.y].curr + t[e.y].unit : 0
                , s = s + r === 0 ? 0 : "translate3d(" + s + "," + r + ",0)"
                , r = R.Has(e, "r") ? t[e.r].name + "(" + t[e.r].curr + "deg)" : 0
                , a = R.Has(e, "r2") ? t[e.r2].name + "(" + t[e.r2].curr + "deg)" : 0
                , h = R.Has(e, "s") ? t[e.s].name + "(" + t[e.s].curr + ")" : 0
                , l = s + r + a + h === 0 ? 0 : [s, r, a, h].filter(t => 0 !== t).join(" ")
                , o = R.Has(e, "o") ? t[e.o].curr : -1;
            let n = this.v.elL;
            for (; n-- && !R.Is.und(this.v.el[n]);)
                0 !== l && (this.v.el[n].style.transform = l),
                    0 <= o && (this.v.el[n].style.opacity = o)
        }
        uSvg() {
            var e = this.v.svg;
            e.currTemp = "";
            for (let t = 0; t < e.arrL; t++)
                e.val[t] = isNaN(e.arr.start[t]) ? e.arr.start[t] : this.lerp(e.arr.start[t], e.arr.end[t]),
                    e.currTemp += e.val[t] + " ",
                    e.curr = e.currTemp.trim();
            for (let t = 0; t < this.v.elL && !R.Is.und(this.v.el[t]); t++)
                this.v.el[t].setAttribute(e.attr, e.curr)
        }
        uLine() {
            var e = this.v.line;
            for (let t = 0; t < this.v.elL; t++) {
                var i = this.v.el[t].style;
                e.curr[t] = this.lerp(e.start[t], e.end[t]),
                    i.strokeDashoffset = e.curr[t],
                    0 === this.v.prog && (i.opacity = 1)
            }
        }
        lerp(t, e) {
            return R.R(R.Lerp(t, e, this.v.progE), this.v.r)
        }
    }
    ,
    R.TL = class {
        constructor() {
            this._ = [],
                this.d = 0
        }
        from(t) {
            this.d += R.Has(t, "delay") ? t.delay : 0,
                t.delay = this.d,
                this._.push(new R.M(t))
        }
        play(t) {
            this.run("play", t)
        }
        pause() {
            this.run("pause")
        }
        run(t, e) {
            let i = 0;
            for (var s = this._.length, r = e || void 0; i < s;)
                this._[i][t](r),
                    i++
        }
    }
    ,
    R.BM = (t, e) => {
        let i = e.length;
        for (; i--;)
            t[e[i]] = t[e[i]].bind(t)
    }
    ,
    R.Clamp = (t, e, i) => t < e ? e : i < t ? i : t,
    R.Clone = t => JSON.parse(JSON.stringify(t)),
    R.Delay = class {
        constructor(t, e) {
            this.cb = t,
                this.d = e,
                R.BM(this, ["loop"]),
                this.r = new R.RafR(this.loop)
        }
        run() {
            0 === this.d ? this.cb() : this.r.run()
        }
        stop() {
            this.r.stop()
        }
        loop(t) {
            t = R.Clamp(t, 0, this.d);
            1 === R.Clamp(t / this.d, 0, 1) && (this.stop(),
                this.cb())
        }
    }
    ,
    R.Dist = (t, e) => Math.sqrt(t * t + e * e),
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
        io6: t => 0 === t || 1 === t ? t : (t /= .5) < 1 ? .5 * 2 ** (10 * (t - 1)) : .5 * (2 - 2 ** (-10 * --t))
    },
    R.r0 = (t, e) => 1 - 3 * e + 3 * t,
    R.r1 = (t, e) => 3 * e - 6 * t,
    R.r2 = (t, e, i) => ((R.r0(e, i) * t + R.r1(e, i)) * t + 3 * e) * t,
    R.r3 = (t, e, i) => 3 * R.r0(e, i) * t * t + 2 * R.r1(e, i) * t + 3 * e,
    R.r4 = (t, e, i, s, r) => {
        let a, h, l = 0;
        for (; h = e + .5 * (i - e),
            0 < (a = R.r2(h, s, r) - t) ? i = h : e = h,
            1e-7 < Math.abs(a) && ++l < 10;)
            ;
        return h
    }
    ,
    R.r5 = (e, i, s, r) => {
        for (let t = 0; t < 4; ++t) {
            var a = R.r3(i, s, r);
            if (0 === a)
                return i;
            i -= (R.r2(i, s, r) - e) / a
        }
        return i
    }
    ,
    R.Ease4 = t => {
        let a = t[0]
            , e = t[1]
            , h = t[2]
            , i = t[3]
            , l = new Float32Array(11);
        if (a !== e || h !== i)
            for (let t = 0; t < 11; ++t)
                l[t] = R.r2(.1 * t, a, h);
        return t => a === e && h === i || 0 === t || 1 === t ? t : R.r2((t => {
            let e = 0;
            for (var i = 1; 10 !== i && l[i] <= t; ++i)
                e += .1;
            --i;
            var s = (t - l[i]) / (l[i + 1] - l[i])
                , s = e + .1 * s
                , r = R.r3(s, a, h);
            return .001 <= r ? R.r5(t, s, a, h) : 0 === r ? s : R.r4(t, r, r + .1, a, h)
        }
        )(t), e, i)
    }
    ,
    R.Fetch = e => {
        var t = "json" === e.type;
        let i = t ? "json" : "text";
        var s = {
            method: t ? "POST" : "GET",
            headers: new Headers({
                "Content-type": t ? "application/x-www-form-urlencoded" : "text/html"
            }),
            mode: "same-origin"
        };
        t && (s.body = e.body),
            fetch(e.url, s).then(t => {
                if (t.ok)
                    return t[i]();
                e.error && e.error()
            }
            ).then(t => {
                e.success(t)
            }
            )
    }
    ,
    R.Has = (t, e) => t.hasOwnProperty(e),
    R.Is = {
        str: t => "string" == typeof t,
        obj: t => t === Object(t),
        arr: t => t.constructor === Array,
        def: t => void 0 !== t,
        und: t => void 0 === t
    },
    R.Mod = (t, e) => (t % e + e) % e,
    R.Pad = (t, e) => ("000" + t).slice(-e),
    R.PCurve = (t, e, i) => (e + i) ** (e + i) / (e ** e * i ** i) * t ** e * (1 - t) ** i,
    R.R = (t, e) => {
        e = R.Is.und(e) ? 100 : 10 ** e;
        return Math.round(t * e) / e
    }
    ,
    // R.Select = {
    //     el: t => {
    //         console.log("Select", t);

    //         let e = [];
    //         var i;
    //         return R.Is.str(t) ? (i = t.substring(1),
    //             "#" === t.charAt(0) ? e[0] = R.G.id(i) : e = R.G.class(i)) : e[0] = t,
    //             e
    //     }
    //     ,
    //     type: t => "#" === t.charAt(0) ? "id" : "class",
    //     name: t => t.substring(1)
    // },
    R.Select = {
        el: (identifier) => {
            let elements = [];
            if (R.Is.str(identifier)) {
                const name = identifier.substring(1); // Remove "#" or "." prefix
                elements = identifier.charAt(0) === "#"
                    ? [R.G.id(name)] // Select by ID
                    : R.G.class(name); // Select by class
            } else {
                elements[0] = identifier; // Return the element if passed directly
            }
            // console.log("Select", elements);
            return elements;
        },
        type: (selector) => (selector.charAt(0) === "#" ? "id" : "class"),
        name: (selector) => selector.substring(1),
    },
    // R.L = (t, e, i, s) => {
    //     var r = R.Select.el(t)
    //         , a = r.length;
    //     let h = !1;
    //     var t = i.substring(0, 3)
    //         , l = ("whe" !== t && "mou" !== t && "tou" !== t && "poi" !== t || (h = {
    //             passive: !1
    //         }),
    //             "a" === e ? "add" : "remove");
    //     for (let t = 0; t < a; t++)
    //         r[t][l + "EventListener"](i, s, h)
    // }
    R.L = (target, action, eventName, callback) => {
        const elements = R.Select.el(target);
        const elementCount = elements.length;
    
        // Determine if the event requires special options
        let options = false;
        const eventPrefix = eventName.substring(0, 3);
        if (["whe", "mou", "tou", "poi"].includes(eventPrefix)) {
            options = { passive: false };
        }
    
        // Determine whether to add or remove the event listener
        const actionType = action === "a" ? "add" : "remove";
    
        // Apply the event listener to all selected elements
        for (let i = 0; i < elementCount; i++) {
            elements[i][`${actionType}EventListener`](eventName, callback, options);
        }
    }    
    ;
let Tab = class {
    constructor() {
        this._ = [],
            this.pause = 0,
            R.BM(this, ["v"]),
            R.L(document, "a", "visibilitychange", this.v)
    }
    add(t) {
        this._.push(t)
    }
    v() {
        var t = performance.now();
        let e, i, s = (i = document.hidden ? (this.pause = t,
            "stop") : (e = t - this.pause,
                "start"),
            this._.length);
        for (; s--;)
            this._[s][i](e)
    }
}
    , RD = (R.Tab = new Tab,
        0)
    , FR = 1e3 / 60
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
            let e = this.l();
            for (; e--;)
                this._[e].sT += t;
            this.on = !0
        }
        add(t) {
            this._.push(t)
        }
        remove(t) {
            let e = this.l();
            for (; e--;)
                if (this._[e].id === t)
                    return void this._.splice(e, 1)
        }
        loop(e) {
            if (this.on) {
                this.t || (this.t = e),
                    RD = (e - this.t) / FR,
                    this.t = e;
                let t = this.l();
                for (; t--;) {
                    var i, s = this._[t];
                    R.Is.def(s) && (s.sT || (s.sT = e),
                        i = e - s.sT,
                        s.cb(i))
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
        new R.Raf)
    , RafId = 0
    , Ro = (R.RafR = class {
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
            range: (t, e, i) => R.R(Math.random() * (e - t) + t, i),
            uniq: e => {
                var i = [];
                for (let t = 0; t < e; t++)
                    i[t] = t;
                let t = e;
                for (var s, r; t--;)
                    s = ~~(Math.random() * (t + 1)),
                        r = i[t],
                        i[t] = i[s],
                        i[s] = r;
                return i
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
            get isFirefox() {
                return -1 < this.uA.indexOf("firefox")
            }
        },
        R.Svg = {
            shapeL: s => {
                var t, e, i, r;
                if ("circle" === s.tagName)
                    return 2 * R.Ga(s, "r") * Math.PI;
                if ("line" === s.tagName)
                    return t = R.Ga(s, "x1"),
                        e = R.Ga(s, "x2"),
                        i = R.Ga(s, "y1"),
                        r = R.Ga(s, "y2"),
                        Math.sqrt((e -= t) * e + (r -= i) * r);
                if ("polyline" !== s.tagName)
                    return s.getTotalLength();
                {
                    let e = 0
                        , i = 0;
                    var a = s.points.numberOfItems;
                    for (let t = 0; t < a; t++) {
                        var h = s.points.getItem(t);
                        0 < t && (e += R.Dist(h.x - i.x, h.y - i.y)),
                            i = h
                    }
                    return e
                }
            }
            ,
            split: t => {
                var e = []
                    , i = t.split(" ")
                    , s = i.length;
                for (let t = 0; t < s; t++) {
                    var r = i[t].split(",")
                        , a = r.length;
                    for (let t = 0; t < a; t++) {
                        var h = r[t]
                            , h = isNaN(h) ? h : +h;
                        e.push(h)
                    }
                }
                return e
            }
        },
        R.Timer = class {
            constructor(t) {
                this._ = new R.Delay(t.cb, t.delay)
            }
            run() {
                this._.stop(),
                    this._.run()
            }
        }
        ,
        R.Une = (t, e, i) => 0 !== R.R(Math.abs(t - e), i),
        R.Cr = t => document.createElement(t),
        R.g = (t, e, i) => (t || document)["getElement" + e](i),
        R.G = {
            id: (t, e) => R.g(e, "ById", t),
            class: (t, e) => R.g(e, "sByClassName", t),
            tag: (t, e) => R.g(e, "sByTagName", t)
        },
        R.Ga = (t, e) => t.getAttribute(e),
        R.index = (e, i) => {
            var s = i.length;
            for (let t = 0; t < s; t++)
                if (e === i[t])
                    return t;
            return -1
        }
        ,
        R.Index = {
            list: t => R.index(t, t.parentNode.children),
            class: (t, e, i) => R.index(t, R.G.class(e, i))
        },
        R.PD = t => {
            t.cancelable && t.preventDefault()
        }
        ,
        R.RO = class {
            constructor() {
                this.eT = R.Snif.isMobile ? "orientationchange" : "resize",
                    this.tick = !1,
                    this._ = [],
                    R.BM(this, ["fn", "gRaf", "run"]),
                    this.t = new R.Timer({
                        delay: 40,
                        cb: this.gRaf
                    }),
                    this.r = new R.RafR(this.run),
                    R.L(window, "a", this.eT, this.fn)
            }
            add(t) {
                this._.push(t)
            }
            remove(t) {
                let e = this._.length;
                for (; e--;)
                    if (this._[e].id === t)
                        return void this._.splice(e, 1)
            }
            fn(t) {
                this.e = t,
                    this.t.run()
            }
            gRaf() {
                this.tick || (this.tick = !0,
                    this.r.run())
            }
            run() {
                let t = 0;
                for (var e = this._.length; t < e;)
                    this._[t].cb(this.e),
                        t++;
                this.r.stop(),
                    this.tick = !1
            }
        }
        ,
        new R.RO)
    , RoId = 0;

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
    R.O = (t, e) => {
        t.style.opacity = e
    }
    ,
    R.pe = (t, e) => {
        t.style.pointerEvents = e
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
    R.T = (t, e, i, s) => {
        s = R.Is.und(s) ? "%" : s;
        t.style.transform = "translate3d(" + e + s + "," + i + s + ",0)"
    }
    ;
new Controller({
    device: "d",
    engine: Engine,
    transition: {
        intro: Intro,
        mutation: Mutation
    }
});
console.log("Window", window.R);
console.log("Window _A", window._A);
