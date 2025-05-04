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
            for (; t--; ) {
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
            for (; t--; )
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
        this.delay = new R.Delay(this.gRaf,this.v.delay)
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
        for (; i--; )
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
        for (; n-- && !R.Is.und(this.v.el[n]); )
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
        for (var s = this._.length, r = e || void 0; i < s; )
            this._[i][t](r),
            i++
    }
}
,
//////////////////////
R.BM = (t, e) => {
    let i = e.length;
    for (; i--; )
        t[e[i]] = t[e[i]].bind(t)
},
////////////////
R.Clamp = (t, e, i) => t < e ? e : i < t ? i : t,
R.Clone = t => JSON.parse(JSON.stringify(t)),
//////////////////////////
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
//////////////////
,
R.Dist = (t, e) => Math.sqrt(t * t + e * e),
//////
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
////////////////////
R.r0 = (t, e) => 1 - 3 * e + 3 * t,
R.r1 = (t, e) => 3 * e - 6 * t,
R.r2 = (t, e, i) => ((R.r0(e, i) * t + R.r1(e, i)) * t + 3 * e) * t,
R.r3 = (t, e, i) => 3 * R.r0(e, i) * t * t + 2 * R.r1(e, i) * t + 3 * e,
//////////////////
R.r4 = (t, e, i, s, r) => {
    let a, h, l = 0;
    for (; h = e + .5 * (i - e),
    0 < (a = R.r2(h, s, r) - t) ? i = h : e = h,
    1e-7 < Math.abs(a) && ++l < 10; )
        ;
    return h
},
/////////////////////////////
R.r5 = (e, i, s, r) => {
    for (let t = 0; t < 4; ++t) {
        var a = R.r3(i, s, r);
        if (0 === a)
            return i;
        i -= (R.r2(i, s, r) - e) / a
    }
    return i
},
////////////////

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
},
////////////////

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
},
////////////////
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
},
/////////
R.Select = {
    el: t => {
        let e = [];
        var i;
        return R.Is.str(t) ? (i = t.substring(1),
        "#" === t.charAt(0) ? e[0] = R.G.id(i) : e = R.G.class(i)) : e[0] = t,
        e
    }
    ,
    type: t => "#" === t.charAt(0) ? "id" : "class",
    name: t => t.substring(1)
},
R.L = (t, e, i, s) => {
    var r = R.Select.el(t)
      , a = r.length;
    let h = !1;
    var t = i.substring(0, 3)
      , l = ("whe" !== t && "mou" !== t && "tou" !== t && "poi" !== t || (h = {
        passive: !1
    }),
    "a" === e ? "add" : "remove");
    for (let t = 0; t < a; t++)
        r[t][l + "EventListener"](i, s, h)
};
/////////////////////////////////////
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
        for (; s--; )
            this._[s][i](e)
    }
}, 
////////////////////
RD = (R.Tab = new Tab,0)
  , FR = 1e3 / 60
  , 
   Raf = (R.Raf = class {
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
        for (; e--; )
            this._[e].sT += t;
        this.on = !0
    }
    add(t) {
        this._.push(t)
    }
    remove(t) {
        let e = this.l();
        for (; e--; )
            if (this._[e].id === t)
                return void this._.splice(e, 1)
    }
    loop(e) {
        if (this.on) {
            this.t || (this.t = e),
            RD = (e - this.t) / FR,
            this.t = e;
            let t = this.l();
            for (; t--; ) {
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
        for (var s, r; t--; )
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
        this._ = new R.Delay(t.cb,t.delay)
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
        for (; e--; )
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
        for (var e = this._.length; t < e; )
            this._[t].cb(this.e),
            t++;
        this.r.stop(),
        this.tick = !1
    }
}
,
new R.RO), 
  RoId = 0;
function Router(t) {
    var e = _A
      , i = e.config.routes[t].page
      , s = e.route.new
      , r = e.route.old;
    e.route.old = s,
    e.route.new = {
        url: t,
        page: i
    },
    e.is[s.page] = !1,
    e.is[i] = !0,
    r.page && (e.was[r.page] = !1),
    e.was[s.page] = !0
}
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
class Win {
    constructor(t) {
        _A.win = {
            w: 0,
            h: 0
        },
        this.d = t,
        R.BM(this, ["resize"]),
        new R.ROR(this.resize).on(),
        this.resize()
    }
    resize() {
        var t = _A
          , e = innerWidth
          , i = innerHeight
          , s = (t.win = {
            w: e,
            h: i
        },
        t.winSemi = {
            w: .5 * e,
            h: .5 * i
        },
        t.winRatio = {
            wh: e / i
        },
        t.isOver169 = t.winRatio.wh > 16 / 9,
        t.config.psd[this.d]);
        t.psd = {
            h: s.h,
            w: s.w
        },
        t.winWpsdW = e / t.psd.w,
        t.winHpsdH = i / t.psd.h,
        t.sFxS = .9 * t.win.h
    }
}
class Rotate {
    constructor() {
        this.inDom = !1,
        R.BM(this, ["resize"]),
        new R.ROR(this.resize).on(),
        this.resize()
    }
    resize() {
        var t = 1 < _A.winRatio.wh;
        t && !this.inDom ? this.a() : !t && this.inDom && this.r()
    }
    a() {
        this.issW = R.Cr("div"),
        this.issW.className = "iss-w";
        var t = R.Cr("div");
        t.className = "iss",
        t.textContent = "Please rotate your device.",
        this.issW.appendChild(t),
        document.body.prepend(this.issW),
        this.inDom = !0
    }
    r() {
        this.issW.parentNode.removeChild(this.issW),
        this.inDom = !1
    }
}
class Controller {
    constructor(config) {
        this.config = config;
        this.device = config.device;
        this.transitionM = config.transitionM;
        this.cache = {};
        this.main = null;
        this.target = null;
        this.fromBack = false;
        this.mutating = false;
        this.route = {
            new: { url: '' }
        };
    }

    onPopstate(event) {
        // Handle browser back/forward navigation
        const state = event.state;
        if (state) {
            this.route.new.url = state.url;
            this.fromBack = true;
            this.in();
        }
    }

    handleEvent(event) {
        // Handle click events for navigation
        let target = event.target;
        let isLink = false;
        let isSubmitButton = false;

        // Traverse up the DOM to find the relevant element
        while (target !== document.body) {
            const tagName = target.tagName;
            if (tagName === 'A') {
                isLink = true;
                break;
            }
            if ((tagName === 'INPUT' || tagName === 'BUTTON') && target.type === 'submit') {
                isSubmitButton = true;
                break;
            }
            target = target.parentNode;
        }

        if (isLink) {
            const href = target.href;
            const protocol = href.substring(0, 3);
            
            // Handle link clicks
            if (!target.hasAttribute('target') && protocol !== 'mai' && protocol !== 'tel') {
                event.preventDefault();
                
                if (!this.mutating) {
                    const path = href.replace(/^.*\/\/[^/]+/, '');
                    if (path !== this.route.new.url) {
                        this.mutating = true;
                        this.out(path, target);
                    } else if (target.id === 'nav-logo') {
                        location.href = '/';
                    }
                }
            }
        } else if (isSubmitButton) {
            event.preventDefault();
        }
    }

    intro(callback) {
        const app = _A; // Global app instance
        R.Fetch({
            url: `${app.route.new.url}?webp=${app.webp}&device=${this.device}`,
            type: 'html',
            success: response => {
                const data = JSON.parse(response);
                app.config.routes = data.routes;
                app.data = data.data;
                this.cache = data.cache;
                
                // Insert new content
                this.add(document.body, 'afterbegin', data.body);
                this.main = R.G.id('main');
                this.transitionM = new this.transitionM();
                callback();
            }
        });
    }

    out(path, target) {
        Router(path);
        const app = _A;
        app.target = target;
        app.fromBack = target === 'back';
        app.page.update = () => {
            this.in();
        };
    }

    in() {
        const app = _A;
        const transition = this.transitionM;
        
        // Handle navigation
        if (app.fromBack) {
            app.fromBack = false;
            transition.in();
        } else {
            transition.in();
        }

        // Update page state
        app.mutating = false;
        app.page = {};
    }

    add(parent, position, content) {
        // Insert HTML content into the DOM
        parent.insertAdjacentHTML(position, content);
    }

    handlePopState() {
        // Handle browser back/forward navigation
        const app = _A;
        if (!app.config.routes) {
            return;
        }

        if (app.mutating) {
            this.handlePopState();
        } else {
            app.mutating = true;
            this.out(location.pathname, 'back');
        }
    }

    hPS() {
        var t = _A.route.new.url;
        history.pushState({
            page: t
        }, "", t)
    }
}
class SVirtual {
    constructor(t) {
        this.cbFn = t.cb,
        this.isOn = !1,
        this.isFF = R.Snif.isFirefox,
        R.BM(this, ["fn"]);
        var t = document
          , e = ["wheel", "keydown"]
          , i = [t.body, t];
        for (let t = 0; t < 2; t++)
            R.L(i[t], "a", e[t], this.fn)
    }
    init(t) {
        this.isX = t.isX
    }
    on() {
        this.tick = !1,
        this.isOn = !0
    }
    off() {
        this.isOn = !1
    }
    resize() {
        this.spaceGap = _A.win.h - 40
    }
    fn(t) {
        this.e = t,
        this.eT = t.type,
        this.eK = t.key,
        "keydown" === this.eT && "Tab" !== this.eK || R.PD(t),
        this.isOn && !this.tick && (this.tick = !0,
        this.run())
    }
    run() {
        var t = this.eT;
        "wheel" === t ? this.w() : "keydown" === t && this.key()
    }
    w() {
        var t = this.e;
        let e;
        var i, s = t.wheelDeltaY || -1 * t.deltaY;
        e = this.isX && (i = t.wheelDeltaX || -1 * t.deltaX,
        Math.abs(i) >= Math.abs(s)) ? i : s,
        this.isFF && 1 === t.deltaMode ? e *= .75 : e *= .556,
        this.s = -e,
        this.cb()
    }
    key() {
        var e = this.eK
          , i = "ArrowUp" === e || "ArrowLeft" === e
          , t = "ArrowDown" === e || "ArrowRight" === e
          , e = " " === e;
        if (i || t || e) {
            var s = _A;
            if ("in" === s.mode && s.is.ho)
                s.e.ho.gl.arrowSlide(t || e ? 1 : -1),
                this.tick = !1;
            else {
                let t = 100;
                i ? t *= -1 : e && (s = this.e.shiftKey ? -1 : 1,
                t = this.spaceGap * s),
                this.s = t,
                this.cb()
            }
        } else
            this.tick = !1
    }
    cb() {
        this.cbFn(this.s),
        this.tick = !1
    }
}
class SVTo {
    constructor(t) {
        this.isSTo = !1,
        this.sUp = t.sUp,
        R.BM(this, ["wFooterFn", "aLeftFn", "wPreviewFn", "wHeroScrollFn"])
    }
    init() {
        var t = _A;
        this.url = t.route.new.url,
        this.isAbout = t.is.ab,
        this.isWork = t.is.wo
    }
    stop() {
        this.isSTo && (this.anim.pause(),
        this.isSTo = !1)
    }
    wFooterFn() {
        this.stop();
        var t = _A.e.s
          , e = R.R(t._[this.url].curr)
          , t = t.max
          , i = Math.abs(t - e)
          , i = 0 === i ? 0 : R.Lerp(100, 500, R.Clamp(i / 3e3, 0, 1));
        this.play({
            start: e,
            end: t,
            d: i,
            e: "io1"
        })
    }
    aLeftFn(t) {
        this.stop();
        var e, i, s, r = _A, a = r.e.s;
        a.isDragging || (e = R.R(a._[this.url].curr),
        i = R.G.id("a-l"),
        s = R.G.id("a-r").offsetHeight / i.offsetHeight,
        t = R.Clamp((t.pageY - i.getBoundingClientRect().top) * s - r.winSemi.h, 0, a.max),
        s = 0 === (i = Math.abs(t - e)) ? 0 : R.Lerp(100, 400, R.Clamp(i / 3e3, 0, 1)),
        this.play({
            start: e,
            end: t,
            d: s,
            e: "io1"
        }))
    }
    wPreviewFn(t) {
        this.stop();
        var e = _A
          , i = e.e.s
          , i = R.R(i._[this.url].step)
          , s = R.G.class("w-preview-w")
          , s = s[s.length - 1]
          , t = R.Index.class(t.target, "w-preview", s)
          , s = R.G.class("w-s")
          , s = s[s.length - 1].children[t]
          , t = s.getBoundingClientRect().top - this.y(s) - e.e.wo.preview.areaRight
          , s = Math.abs(t - i)
          , e = 0 === s ? 0 : R.Lerp(100, 400, R.Clamp(s / 3e3, 0, 1));
        this.play({
            start: i,
            end: t,
            d: e,
            e: "io1"
        })
    }
    y(t) {
        t = t.style.transform.match(/^translate3d\((.+)\)$/)[1].split(", ");
        return parseFloat(t[1])
    }
    wHeroScrollFn() {
        this.stop();
        var t = _A
          , e = t.e.s
          , e = R.R(e._[this.url].step)
          , t = t.win.h
          , i = Math.abs(t - e)
          , i = 0 === i ? 0 : R.Lerp(100, 500, R.Clamp(i / 3e3, 0, 1));
        this.play({
            start: e,
            end: t,
            d: i,
            e: "io1"
        })
    }
    play(t) {
        let e = t.start
          , i = t.end;
        this.anim = new R.M({
            d: t.d,
            e: t.e,
            update: t => {
                t = R.Lerp(e, i, t.progE);
                this.sUp(t)
            }
        }),
        this.isSTo = !0,
        this.anim.play()
    }
    on() {
        this.l("a")
    }
    off() {
        this.l("r")
    }
    l(t) {
        var e = "click";
        this.isAbout ? R.L("#a-l-w", t, e, this.aLeftFn) : this.isWork && (R.L(".w-footer-link", t, e, this.wFooterFn),
        R.L(".w-preview", t, e, this.wPreviewFn),
        R.L(".w-hero-scroll", t, e, this.wHeroScrollFn))
    }
}
class MM {
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
class Scroll {
    constructor() {
        _A.cursor = {
            x: -1,
            y: -1
        },
        this.rqd = !1,
        this.min = 0,
        this.maxStep = 0,
        this.isDown = !1,
        this.isDragging = !1,
        this.prev = 0,
        this.step = 0,
        R.BM(this, ["sFn", "sUp", "move", "down", "up"]),
        this.scrollV = new SVirtual({
            cb: this.sFn
        }),
        this.sVTo = new SVTo({
            sUp: this.sUp
        }),
        this.mm = new MM({
            cb: this.move
        })
    }
    intro() {
        var t = _A
          , t = (this._ = {},
        t.config.routes)
          , e = Object.keys(t)
          , i = e.length;
        for (let t = 0; t < i; t++) {
            var s = e[t];
            this._[s] = {
                curr: 0,
                targ: 0,
                step: 0,
                expand: 0
            }
        }
    }
    init(t) {
        var e = _A;
        this.url = e.route.new.url,
        this.isHome = e.is.ho,
        this.isWork = e.is.wo,
        this.isX = t.isX,
        this.scrollV.init(t),
        this.sVTo.init();
        let i = 0;
        this.isHome && "out" === e.mode && (t = e.e.ho.gl.data,
        i = (t.out.w + t.out.gap.x) * e.index),
        this.sUpAll(i),
        this.resize()
    }
    resize() {
        var t, e = _A, e = (this.scrollV.resize(),
        this.step = 1.5 * e.win.h,
        this.isHome ? this.max = e.e.ho.gl.max : (t = (e = R.G.class("page")).length,
        this.max = Math.max(e[t - 1].offsetHeight - _A.win.h, 0),
        this.maxStep = this.max,
        this.isWork && (this.max += this.step),
        this.maxZero = 0 === this.max),
        this.clamp(this._[this.url].targ));
        this.sUpAll(e)
    }
    expand(t, e) {
        return 0 === this.step ? 0 : (t = R.Clamp(t - e, 0, this.step) / this.step,
        e = R.iLerp(.15, 1, t),
        R.Ease.i2(e))
    }
    sFn(t) {
        var e;
        this.isDown || (this.sVTo.stop(),
        e = _A,
        this.isHome && "in" === e.mode ? e.e.ho.gl.change("out") : this.sUp(this.clamp(this._[this.url].targ + t)))
    }
    sUp(t) {
        var e = this.url;
        this._[e].targ = t
    }
    down(t) {
        t.ctrlKey || "A" === t.target.tagName || 0 !== t.button ? R.PD(t) : (this.isDown = !0,
        this.isDragging = !1,
        this.start = this.isX ? t.pageX : t.pageY,
        this.targ = this._[this.url].targ,
        this.targPrev = this.targ)
    }
    move(t, e, i) {
        R.PD(i);
        var s, i = _A;
        i.cursor.x = t,
        i.cursor.y = e,
        this.isDown && (s = i.mode,
        e = this.isX ? t : e,
        Math.abs(e - this.start) < 15 || (this.isHome && "out" !== s || (e > this.prev && this.targ === this.min ? this.start = e - (this.targPrev - this.min) / 3 : e < this.prev && this.targ === this.max && (this.start = e - (this.targPrev - this.max) / 3),
        this.prev = e,
        this.targ = 3 * -(e - this.start) + this.targPrev,
        this.targ = this.clamp(this.targ),
        this.sUp(this.targ)),
        this.isDragging = 10 < Math.abs(t - this.start),
        this.isHome && "in" === s && this.isDragging && i.e.ho.gl.change("out")))
    }
    up(t) {
        var e, i, s;
        this.isDown && (this.isDown = !1,
        this.isDragging || (i = (e = _A).mode,
        this.isHome && (s = e.e.ho.gl,
        "out" === i ? -1 < s.indexOver && (e.index = s.indexOver,
        s.change("in")) : "in" === i && s.inSlide(t))))
    }
    loop() {
        var t, e, i = _A.lerpP;
        this.rqd = this.unequal(),
        this.rqd && (t = this.url,
        this._[t].curr = R.Damp(this._[t].curr, this._[t].targ, i),
        e = this.clampStep(this._[t].targ),
        this._[t].step = R.Damp(this._[t].step, e, i),
        this._[t].expand = this.expand(this._[t].curr, this._[t].step),
        this.isWork) && this._[t].curr >= this.max - 2 && (this.sVTo.off(),
        R.G.class("w-footer-a")[0].click())
    }
    unequal() {
        var t = this.url;
        return 0 !== R.R(Math.abs(this._[t].curr - this._[t].targ))
    }
    sUpAll(t) {
        var e = this.clampStep(t)
          , i = this.url;
        this._[i].targ = t,
        this._[i].curr = t,
        this._[i].step = e,
        this._[i].expand = this.expand(t, e),
        this.targ = t,
        this.targPrev = t
    }
    clamp(t) {
        return R.R(R.Clamp(t, this.min, this.max))
    }
    clampStep(t) {
        return R.R(R.Clamp(t, this.min, this.maxStep))
    }
    l(t) {
        var e = document;
        R.L(e, t, "mousedown", this.down),
        R.L(e, t, "mouseup", this.up)
    }
    on() {
        this.maxZero || (this.sVTo.on(),
        this.scrollV.on(),
        this.mm.on(),
        this.l("a"))
    }
    off() {
        this.maxZero || (this.sVTo.off(),
        this.scrollV.off(),
        this.mm.off(),
        this.l("r"))
    }
}
class SIntersect {
    constructor() {
        var t = _A;
        if (this.arr = [],
        this.arrL = 0,
        this.notRequired = t.is.ho,
        !this.notRequired) {
            this.isWork = t.is.wo;
            var i = t.is.ab
              , t = t.route.new
              , t = (this.url = t.url,
            R.G.class("page"));
            let e = t[t.length - 1].children;
            var s = (e = i ? e[0].children : e).length;
            for (let t = 0; t < s; t++) {
                var r = e[t];
                if (r.classList.contains("w-s")) {
                    var a = r.children
                      , h = a.length;
                    for (let t = 0; t < h; t++)
                        this.arr[this.arrL] = {
                            dom: a[t],
                            inside: {}
                        },
                        this.arrL++
                } else
                    r.classList.contains("_ns") || (this.arr[this.arrL] = {
                        dom: r,
                        inside: {}
                    },
                    this.arrL++)
            }
            this.resize()
        }
    }
    resize() {
        if (!this.notRequired) {
            let t = _A;
            var e = this.isWork ? "step" : "curr"
              , i = R.R(t.e.s._[this.url][e])
              , s = t.win.h;
            for (let e = 0; e < this.arrL; e++) {
                let t = this.arr[e];
                this.draw(t, -i);
                var r = t.dom.getBoundingClientRect().top - i - s
                  , a = Math.min(r, 0) + t.dom.offsetHeight + s;
                t.inside.start = r,
                t.inside.end = a + Math.max(r, 0),
                t.isOut = !1
            }
            this.run()
        }
    }
    run() {
        if (!this.notRequired) {
            var t = this.isWork ? "step" : "curr"
              , e = R.R(_A.e.s._[this.url][t]);
            for (let t = 0; t < this.arrL; t++) {
                var i = this.arr[t];
                e > i.inside.start && e <= i.inside.end ? (i.isOut && (i.isOut = !1),
                this.draw(i, e)) : i.isOut || (i.isOut = !0,
                this.draw(i, e))
            }
        }
    }
    draw(t, e) {
        R.T(t.dom, 0, R.R(-e), "px")
    }
}
class LZ {
    initA() {
        var t = _A;
        if (this.notRequired = !t.is.wo,
        !this.notRequired) {
            this.url = t.route.new.url,
            this.img = [],
            this.imgI = [];
            var t = R.G.class("page")
              , t = t[t.length - 1]
              , e = R.G.class("_lz", t);
            this.lzL = e.length;
            for (let t = 0; t < this.lzL; t++) {
                var i = e[t];
                this.img[t] = {
                    src: i.dataset.src,
                    dom: i
                }
            }
            for (let t = 0; t < this.lzL; t++)
                this.img[t].decode = !1,
                this.img[t].show = !1;
            this.resizeA()
        }
    }
    resizeA() {
        if (!this.notRequired) {
            var t = _A
              , e = t.e.s._[this.url].step
              , i = t.win.h;
            for (let t = 0; t < this.lzL; t++) {
                var s = this.img[t].dom;
                R.Is.def(s) && (s = s.getBoundingClientRect().top + e,
                this.img[t].limit = {
                    decode: Math.max(s - 2 * i, 0),
                    show: Math.max(s - .8 * i, 0)
                })
            }
        }
    }
    loop() {
        if (!this.notRequired) {
            var e = _A.e.s._[this.url].step;
            for (let t = 0; t < this.lzL; t++) {
                var i = this.img[t];
                e > i.limit.decode && !i.decode && (this.img[t].decode = !0,
                this.decode(t)),
                e > i.limit.show && !i.show && (this.img[t].show = !0,
                this.show(t))
            }
        }
    }
    show(t) {
        this.img[t].dom.classList.add("fx")
    }
    decode(t) {
        let e = this.img[t].dom
          , i = this.img[t].src;
        this.imgI[t] = new Image,
        this.imgI[t].src = i,
        this.imgI[t].decode().then(t => {
            R.Is.def(e) && (e.src = i,
            delete e.dataset.src)
        }
        )
    }
    off() {
        if (!this.notRequired) {
            var e = this.imgI.length;
            for (let t = 0; t < e; t++)
                R.Is.def(this.imgI[t]) && (this.imgI[t].src = "data:,")
        }
    }
}
class Load {
    constructor() {
        this.moving = !1
    }
    intro() {
        var t = _A
          , t = (this.url = t.route.new.url,
        this.isHome = t.is.ho,
        this.isWork = t.is.wo,
        this.isAbout = t.is.ab,
        t.rgl._)
          , e = t.load;
        this.texLoad = e.plane,
        this.texL = e.planeL,
        this.tex = [],
        this.y = [],
        this.isHome ? (this.texLarge = t.large.plane,
        this.texMain = this.texLarge[0]) : this.isWork ? this.texMain = t[this.url].plane[0] : this.isAbout && (this.texMain = this.texLoad[12]),
        this.isHome && (e = t.small,
        this.texSmall = e.plane,
        this.texSmallL = e.planeL),
        this.resizeA()
    }
    resizeA() {
        var t = _A;
        if (t.introducing) {
            var e = t.win.w
              , i = t.win.h
              , s = 30 * t.winWpsdW
              , r = (e - 4 * s) / 4
              , a = r * i / e
              , h = a + s
              , l = r + s
              , o = .5 * h
              , n = i + .5 * (5 * a + 4 * s - i)
              , p = 12 * a
              , d = e + 2
              , c = i + 2
              , s = s * d / r
              , g = c + s
              , u = d + s;
            for (let t = 0; t < this.texL; t++) {
                var m = 12 === t
                  , v = Math.floor(t / 5)
                  , f = v % 2 == 1
                  , v = v - 2
                  , R = Math.abs(v)
                  , x = t % 5
                  , w = x - 2
                  , x = (this.y[t] = f ? -(n - o + (4 - x) * p + R * a + 20) : n + x * p + R * a + 20,
                .5 * (e - r) + v * l)
                  , R = .5 * (e - d) + v * u
                  , v = .5 * (i - c) + w * g - (f ? .5 * g : 0)
                  , x = (this.tex[t] = {
                    x: x - R,
                    y: .5 * (i - a) + w * h - (f ? o : 0) - v,
                    w: r - d,
                    h: a - c,
                    scale: m ? .5 : 0
                },
                m ? this.texMain : this.texLoad[t]);
                x.lerp.x = R,
                x.lerp.y = v,
                x.lerp.w = d,
                x.lerp.h = c,
                x.intro.x = this.tex[t].x,
                x.intro.y = this.tex[t].y,
                x.intro.w = this.tex[t].w,
                x.intro.h = this.tex[t].h,
                x.intro.scale = this.tex[t].scale
            }
            this.isHome && (s = t.e.ho.gl.data.in.small,
            this.bottomY = i + s.gap.x - s.y)
        }
    }
    fx(t) {
        var e = _A.config.isLocal;
        if (this.isHome)
            for (let t = 0; t < this.texSmallL; t++)
                (0 === t ? this.texSmall : this.texLarge)[9 * t].intro.y = this.bottomY;
        let i = 5e3
          , s = t.delay
          , a = (e && (i = 1,
        s = 0),
        R.Ease4([.8, 0, .1, 1]))
          , h = R.Ease4([.72, 0, .11, 1])
          , r = (this.introFx = new R.M({
            d: i,
            e: "linear",
            delay: s,
            update: t => {
                this.moving = !0;
                var t = t.prog
                  , e = a(R.iLerp(0, .65, t))
                  , i = h(R.iLerp(.4, 1, t));
                for (let t = 0; t < this.texL; t++) {
                    var s = 12 === t ? this.texMain : this.texLoad[t]
                      , r = R.Lerp(this.y[t], 0, e);
                    s.intro.x = R.Lerp(this.tex[t].x, 0, i),
                    s.intro.y = R.Lerp(this.tex[t].y, 0, i) + r,
                    s.intro.w = R.Lerp(this.tex[t].w, 0, i),
                    s.intro.h = R.Lerp(this.tex[t].h, 0, i),
                    s.intro.scale = R.Lerp(this.tex[t].scale, 0, i)
                }
            }
            ,
            cb: t => {
                this.moving = !1
            }
        }),
        []);
        if (this.isHome) {
            let t = 1500
              , i = 3200
              , s = 50;
            e && (t = 1,
            i = 0,
            s = 0);
            for (let e = 0; e < this.texSmallL; e++)
                r[e] = new R.M({
                    d: t,
                    e: "o6",
                    delay: i + s * e,
                    update: t => {
                        this.moving = !0,
                        (0 === e ? this.texSmall : this.texLarge)[9 * e].intro.y = R.Lerp(this.bottomY, 0, t.progE)
                    }
                    ,
                    cb: t => {
                        this.moving = !1
                    }
                })
        }
        return {
            play: t => {
                if (this.introFx.play(),
                this.isHome)
                    for (let t = 0; t < this.texSmallL; t++)
                        r[t].play()
            }
        }
    }
}
class Active {
    constructor() {
        this.page = ["ho", "ab"]
    }
    intro() {
        this.nav = R.G.class("nav-a"),
        this.up()
    }
    up() {
        var t = _A
          , e = t.route.old.page
          , e = (e && this.upC(e, "remove"),
        t.route.new.page);
        this.upC(e, "add")
    }
    upC(t, e) {
        t = this.page.indexOf(t);
        -1 < t && (R.PE["add" === e ? "none" : "all"](this.nav[t]),
        this.nav[t].classList[e]("on"))
    }
}
class Obj {
    constructor(t) {
        var e = t.index
          , i = t.delay;
        this.propArr = t.prop,
        this.propArrL = this.propArr.length,
        this.prop = [],
        this.prog = {
            show: {
                start: e * i,
                end: 1 - (t.length - 1 - e) * i
            },
            hide: {
                start: 0,
                end: 1
            }
        },
        this.curr = [];
        for (let t = 0; t < this.propArrL; t++) {
            var s = this.propArr[t];
            this.curr[t] = s[1],
            this.prop[t] = {
                round: "y" === s[0] || "x" === s[0] ? 3 : 6
            }
        }
    }
    prepare(e) {
        this.isShow = e.isShow;
        var i = e.isRunning;
        for (let t = 0; t < this.propArrL; t++) {
            var s = this.propArr[t]
              , r = s[1]
              , a = s[2];
            "opacity" === s[0] ? this.isShow ? (this.prop[t].start = i ? this.curr[t] : r,
            this.prop[t].end = a) : (this.prop[t].start = this.curr[t],
            this.prop[t].end = r) : this.isShow ? (this.prop[t].start = i ? this.curr[t] : r,
            this.prop[t].end = 0) : (this.prop[t].start = this.curr[t],
            this.prop[t].end = e.propEndIsEnd ? a : r)
        }
        var t = this.isShow && !i ? this.prog.show : this.prog.hide;
        this.prog.start = t.start,
        this.prog.end = t.end
    }
    loop(t) {
        var e = t.el
          , i = t.elL
          , s = [0, 0]
          , r = R.Remap(this.prog.start, this.prog.end, 0, 1, t.prog)
          , a = t.rEase(r);
        let h = ""
          , l = "";
        for (let t = 0; t < this.propArrL; t++) {
            var o = this.propArr[t][0]
              , n = this.prop[t];
            this.curr[t] = R.R(R.Lerp(n.start, n.end, a), n.round),
            "y" === o ? s[1] = this.curr[t] : "x" === o ? s[0] = this.curr[t] : "rotateX" === o ? h = " rotateX(" + this.curr[t] + "deg)" : "opacity" === o && (l = this.curr[t])
        }
        for (let t = 0; t < i; t++) {
            var p = e[t].style;
            p.transform = "translate3d(" + s[0] + "%," + s[1] + "%,0)" + h,
            "" !== l && (p.opacity = l)
        }
    }
}
class ObjArr {
    constructor(t) {
        this.a = _A,
        this.delay = t.delay;
        var e = t.el
          , i = t.descendant
          , s = t.prop
          , r = t.indexStart
          , a = (this.random = t.random,
        this.length = t.length,
        this.element = [],
        this.elementL = [],
        this.obj = [],
        this.objL = e.length,
        this.randUniq = [],
        t.objLength);
        for (let t = 0; t < this.objL; t++)
            this.element[t] = 2 === i ? e[t].children : [e[t]],
            this.elementL[t] = this.element[t].length,
            this.obj[t] = new Obj({
                index: r + t,
                length: a,
                delay: this.delay,
                prop: s
            }),
            this.randUniq[t] = t
    }
    prepare(e) {
        !e.isRunning && this.random && (this.randUniq = R.Rand.uniq(this.objL));
        for (let t = 0; t < this.objL; t++)
            this.obj[t].prepare(e)
    }
    loop(t) {
        var e = t.prog
          , i = t.rEase;
        for (let t = 0; t < this.objL; t++)
            this.obj[t].loop({
                el: this.element[this.randUniq[t]],
                elL: this.elementL[t],
                prog: e,
                rEase: i
            })
    }
}
class Anima {
    constructor(t) {
        this.a = _A,
        this.delay = t.delay || 0;
        var e = t.lineStartTogether || !1
          , i = t.descendant
          , s = t.random || !1;
        let r = t.el;
        R.Is.und(r.length) && (r = [r]),
        this.lineL = r.length;
        var a = t.prop
          , t = (this.start = a[0][1],
        this.objLength = this.lineL,
        r[0].children);
        0 < i && 1 === this.lineL && 1 < t.length && (this.objLength = t.length),
        this.line = [];
        let h = 0;
        for (let t = 0; t < this.lineL; t++) {
            var l = 0 === i ? [r[t]] : r[t].children;
            this.line[t] = new ObjArr({
                length: this.lineL,
                objLength: this.objLength,
                indexStart: h,
                descendant: i,
                el: l,
                prop: a,
                delay: this.delay,
                random: s
            }),
            e || (h += this.line[t].objL)
        }
    }
    motion(t) {
        R.Is.def(this.letterAnim) && this.letterAnim.pause();
        var e = "show" === t.action
          , i = t.d;
        let s = R.Ease[t.e]
          , r = this.line
          , a = this.lineL;
        var h = r[0].obj[0].curr[0];
        let l = !1
          , o = (e || (l = this.start < 0 && 0 < h || 0 < this.start && h < 0 || Math.abs(h) < Math.abs(.3 * this.start)),
        t.delay);
        e && this.isRunning && (o = 0);
        for (let t = 0; t < a; t++)
            r[t].prepare({
                isShow: e,
                isRunning: this.isRunning,
                propEndIsEnd: l
            });
        h = e ? 1 - (this.objLength - 1) * this.delay : 1;
        return this.letterAnim = new R.M({
            delay: o,
            d: i / h,
            update: t => {
                var e = t.prog;
                for (let t = 0; t < a; t++)
                    r[t].loop({
                        prog: e,
                        rEase: s
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
let Fx$3 = class {
    intro() {
        var t = R.G.id("nav");
        this.fx = new Anima({
            descendant: 2,
            el: t,
            prop: [["y", 110, -110]],
            delay: .05
        })
    }
    show(t) {
        var e = _A
          , i = e.config.isLocal && e.introducing
          , s = t.mutation;
        let r = t.delay
          , a = 1500;
        (s && e.fromBack || i) && (r = 0,
        a = 0);
        let h = this.fx.motion({
            action: "show",
            d: a,
            e: "o6",
            delay: r,
            reverse: !1
        });
        return {
            play: t => {
                h.play()
            }
        }
    }
    hide(t) {
        var e = _A
          , i = t.mutation;
        let s = t.delay
          , r = 500
          , a = "o2"
          , h = (i && (e.fromBack ? (s = 0,
        r = 0) : (r = 600,
        a = "i3")),
        this.fx.motion({
            action: "hide",
            d: r,
            e: a,
            delay: s,
            reverse: !1
        }));
        return {
            play: t => {
                h.play()
            }
        }
    }
}
;
class Nav {
    constructor() {
        this.active = new Active,
        this.fx = new Fx$3
    }
    intro() {
        this.active.intro(),
        this.fx.intro()
    }
}
class GLData {
    init() {
        var t = _A
          , t = (this.url = t.route.new.url,
        t.rgl._);
        this.largeL = t.large.planeL,
        this.smallL = t.small.planeL
    }
    resize() {
        var t = _A
          , e = t.win
          , e = (this.winW = e.w,
        this.winH = e.h,
        t.isOver169 ? t.winHpsdH : t.winWpsdW)
          , t = R.R(76 * e, 0)
          , i = R.R(9 * t / 16);
        this.in = {
            large: {
                x: -1,
                y: -1,
                w: this.winW + 2,
                h: this.winH + 2
            },
            small: {
                x: R.R(this.winW - 40 - t, 0),
                y: R.R(this.winH - 40 - i, 0),
                w: t,
                h: i,
                gap: {
                    x: R.R(5 * e, 0)
                }
            }
        },
        this.out = {
            gap: {
                x: R.R(30 * e, 0)
            },
            w: R.R(350 * e, 0),
            h: R.R(500 * e, 0)
        },
        this.out.y = .5 * (this.winH - this.out.h),
        this.out.x = .5 * (this.winW - this.out.w),
        this.out.gapXW = this.out.w + this.out.gap.x,
        this.out.max = this.out.w * (this.smallL - 1) + this.out.gap.x * (this.smallL - 1)
    }
    _in(t) {
        var e = _A.index
          , i = this.in.large
          , s = this.in.small
          , r = t.delay
          , a = [];
        for (let t = 0; t < this.largeL; t++) {
            var h = t % this.smallL
              , l = Math.floor(t / this.smallL)
              , o = a[t] = {
                scale: 1,
                opacity: 1,
                pY: 0,
                _delay: 0
            };
            r && (o._delay = 40 * Math.max(Math.abs(h - e) - 1, 0)),
            l === e ? (o.y = i.y,
            o.h = i.h,
            h === e ? (o.x = i.x,
            o.w = i.w) : (o.x = h < e ? i.x : i.x + i.w,
            o.w = 0)) : (o.x = s.x - (s.w + s.gap.x) * (this.smallL - 1 - l),
            o.y = s.y,
            o.h = s.h,
            o.w = h === l ? s.w : 0)
        }
        var n = [];
        for (let t = 0; t < this.smallL; t++) {
            var p = n[t] = {};
            p.x = s.x - (s.w + s.gap.x) * (this.smallL - 1 - t),
            p.w = s.w,
            p.h = s.h,
            p.scale = 1,
            p.opacity = 1,
            t === e ? p.y = s.y : p.y = this.winH + s.gap.x,
            p.pY = 0,
            p._delay = 0,
            r && (p._delay = 240)
        }
        return {
            large: a,
            small: n
        }
    }
    _out(t) {
        var e = _A.index
          , i = this.in.small
          , s = this.out
          , r = t.delay
          , a = [];
        for (let t = 0; t < this.largeL; t++) {
            var h = t % this.smallL
              , l = Math.floor(t / this.smallL)
              , o = a[t] = {};
            o.y = s.y,
            h === l ? (o.w = s.w,
            o.x = s.x + (s.w + s.gap.x) * l) : (o.w = 0,
            o.x = e < h ? s.x + (s.w + s.gap.x) * l + s.w : s.x + (s.w + s.gap.x) * l),
            o.h = s.h,
            o.scale = 1.25,
            o.opacity = 1,
            o.pY = 0,
            o._delay = 0,
            r && (o._delay = l === e ? 0 : 40 * h)
        }
        var n = [];
        for (let t = 0; t < this.smallL; t++) {
            var p = n[t] = {};
            p.x = i.x - (i.w + i.gap.x) * (this.smallL - 1 - t),
            p.y = this.winH + i.gap.x,
            p.w = i.w,
            p.h = i.h,
            p.scale = 1,
            p.opacity = 1,
            p.pY = 0,
            p._delay = 0
        }
        return {
            large: a,
            small: n
        }
    }
}
let GL$1 = class {
    constructor() {
        this.moving = !1,
        this.easing = !1,
        this.data = new GLData
    }
    initB() {
        var t = _A
          , e = (this.url = t.route.new.url,
        t.rgl._.large)
          , t = t.rgl._.small;
        this.texLarge = e.plane,
        this.texLargeL = e.planeL,
        this.texSmall = t.plane,
        this.texSmallL = t.planeL,
        this.prop = e.lerp.prop,
        this.propL = e.lerp.propL,
        this.unequal = e.unequal,
        this.small = {
            curr: [],
            targ: [],
            _delay: []
        },
        this.large = {
            curr: [],
            targ: [],
            _delay: []
        },
        this.pgn = R.G.id("h-pgn-left"),
        this._pgn = {
            curr: 0,
            targ: 0
        },
        this.cross = R.G.id("h-cross").children,
        this.crossR = 0,
        this.indexOver = -1,
        this.mutationFx = [],
        this.pX = {
            curr: [],
            targ: []
        };
        for (let t = 0; t < this.texSmallL; t++)
            this.pX.curr[t] = 0,
            this.pX.targ[t] = 0;
        this.zIndex(),
        this.data.init(),
        this.resizeB()
    }
    initA() {
        this.resizeA()
    }
    resizeB() {
        var t = _A
          , t = (this.data.resize(),
        this.outGapXW = this.data.out.gapXW,
        this.prlxNorm = t.winSemi.w + .5 * this.data.out.w,
        this.max = this.data.out.max,
        _A.index);
        this.pgnH = this.pgn.parentNode.offsetHeight,
        this._pgn.curr = t * this.pgnH,
        this._pgn.targ = t * this.pgnH
    }
    resizeA() {
        var t = _A;
        this._set({
            _: ["curr", "targ"],
            value: this.data["_" + t.mode]({
                delay: !1
            }),
            delay: !1
        }),
        this.texSet()
    }
    over() {
        var t = _A
          , i = t.index
          , s = t.mode
          , r = t.cursor.x
          , a = t.cursor.y;
        this.indexOver = -1;
        for (let e = 0; e < this.texSmallL; e++) {
            let t;
            var h = r >= (t = (e === i && "in" === s ? this.texSmall[e] : (h = e * this.texSmallL + e,
            this.texLarge[h])).lerp).x && r <= t.x + t.w
              , l = a >= t.y && a <= t.y + t.h;
            if (h && l) {
                if ("in" === s) {
                    this.indexOver = e;
                    break
                }
                if ("out" === s) {
                    this.indexOver = e;
                    break
                }
            }
        }
    }
    inSlide(e) {
        var i = _A
          , s = i.index;
        if (this.indexOver !== s) {
            let t;
            -1 < this.indexOver ? (t = this.indexOver,
            this.slide(t)) : e.pageX > i.winSemi.w ? s < 7 && (t = s + 1,
            this.slide(t)) : 0 < s && (t = s - 1,
            this.slide(t))
        }
    }
    arrowSlide(t) {
        var e = _A.index;
        0 === e && -1 === t || 7 === e && 1 === t || this.slide(e + t)
    }
    slide(i) {
        var t = _A
          , e = t.mode
          , s = t.index
          , r = i;
        for (let t = 0; t < this.propL; t++) {
            var a = r
              , h = 8 * r + r
              , l = this.prop[t];
            this.small.curr[a][l] = this.large.curr[h][l],
            this.small.targ[a][l] = this.large.targ[h][l]
        }
        var i = 8 * r
          , o = 8 + i;
        for (let t = i; t < o; t++) {
            var n = t
              , p = t - 8 * (r - s);
            for (let t = 0; t < this.propL; t++) {
                var d = this.prop[t];
                this.large.curr[n][d] = this.large.curr[p][d],
                this.large.targ[n][d] = this.large.targ[p][d]
            }
        }
        var i = 8 * s
          , c = 8 + i;
        for (let e = i; e < c; e++) {
            var g = e % this.texSmallL
              , u = Math.floor(e / this.texSmallL);
            for (let t = 0; t < this.propL; t++) {
                var m = this.prop[t];
                "w" === m ? (this.large.curr[e][m] = u === g ? this.small.curr[s][m] : 0,
                this.large.targ[e][m] = u === g ? this.small.targ[s][m] : 0) : (this.large.curr[e][m] = this.small.curr[s][m],
                this.large.targ[e][m] = this.small.targ[s][m])
            }
        }
        var i = _A.win.h + this.data.in.small.gap.x
          , i = (this.small.curr[s].y = i,
        this.small.targ[s].y = i,
        t.index = r,
        this.zIndex(),
        s < r ? 1 : -1)
          , i = (this.crossR += 90 * i,
        this.cross[0].style.transform = "rotate(" + this.crossR + "deg)",
        this.cross[1].style.transform = "rotate(" + this.crossR + "deg)",
        t.e.ho.fxTitle.hide({
            index: s,
            delay: 0
        }))
          , v = t.e.ho.fxTitle.show({
            index: r,
            delay: 300
        });
        this._pgn.targ = r * this.pgnH,
        R.Is.def(t.e.load.introFx) && (t.e.load.introFx.pause(),
        (t = this.texLarge[0]).intro.x = 0,
        t.intro.y = 0,
        t.intro.w = 0,
        t.intro.h = 0,
        t.intro.scale = 0),
        this._set({
            _: ["targ"],
            value: this.data["_" + e]({
                delay: !1
            }),
            delay: !1
        }),
        i.play(),
        v.play()
    }
    change(t) {
        var e = _A
          , i = e.index
          , s = "in" === t
          , t = (e.mode = t,
        this._pgn.targ = i * this.pgnH,
        s ? "show" : "hide")
          , t = e.e.ho.fxTitle[t]({
            index: i,
            delay: s ? 240 : 0
        })
          , r = s ? 500 : 0
          , a = s ? "show" : "hide"
          , h = e.e.ho.fxCross.middle({
            a: s ? "hide" : "show",
            delay: s ? 0 : 300
        })
          , a = e.e.ho.fxCross.side({
            a: a,
            delay: r
        });
        this.zIndex();
        let l;
        s ? (l = -R.R(e.e.s._[this.url].curr),
        e.e.s.sUpAll(0)) : (l = R.Clamp(this.outGapXW * i, 0, this.data.out.max),
        e.e.s.sUpAll(l));
        for (let t = 0; t < this.texLargeL; t++)
            this.large.curr[t].x += l,
            this.large.targ[t].x += l;
        this._set({
            _: ["targ"],
            value: this.data["_" + e.mode]({
                delay: !0
            }),
            delay: !0
        }),
        h.play(),
        a.play(),
        t.play()
    }
    loop() {
        this.over(),
        this.texSet()
    }
    texSet() {
        var t = _A
          , e = "out" === t.mode
          , i = t.lerpP
          , s = t.e.s._[this.url].curr;
        e && (t = Math.floor(s / (this.data.out.w + this.data.out.gap.x) + .5),
        this._pgn.targ = t * this.pgnH),
        this._pgn.curr = R.Damp(this._pgn.curr, this._pgn.targ, i),
        R.T(this.pgn, 0, R.R(-this._pgn.curr), "px"),
        this.moving = this.easing;
        for (let t = 0; t < this.texLargeL; t++) {
            var r = this.texLarge[t]
              , a = this.large.curr[t]
              , h = this.large.targ[t];
            for (let t = 0; t < this.propL; t++) {
                var l = this.prop[t];
                this.unequal({
                    prop: l,
                    a: a,
                    b: h
                }) && (a[l] = R.Damp(a[l], h[l], i),
                this.moving = !0),
                r.lerp[l] = a[l],
                "x" === l && (r.lerp[l] -= s)
            }
        }
        for (let t = 0; t < this.texSmallL; t++) {
            var o = this.texSmall[t]
              , n = this.small.curr[t]
              , p = this.small.targ[t];
            for (let t = 0; t < this.propL; t++) {
                var d = this.prop[t];
                this.unequal({
                    prop: d,
                    a: n,
                    b: p
                }) && (n[d] = R.Damp(n[d], p[d], i),
                this.moving = !0),
                o.lerp[d] = n[d]
            }
        }
        for (let t = 0; t < this.texSmallL; t++) {
            e ? (this.pX.targ[t] = -.25 * R.Clamp((s - this.data.out.gapXW * t) / this.prlxNorm, -1, 1),
            this.pX.curr[t] = this.pX.targ[t]) : (this.pX.targ[t] = 0,
            this.pX.curr[t] = R.Damp(this.pX.curr[t], this.pX.targ[t], i)),
            0 !== R.R(Math.abs(this.pX.curr[t] - this.pX.targ[t]), 6) && (this.moving = !0);
            var c = t * this.texSmallL + t;
            this.texLarge[c].lerp.pX = this.pX.curr[t]
        }
    }
    _set(t) {
        var e = t._
          , i = e.length
          , a = t.value
          , h = t.delay;
        for (let r = 0; r < this.texSmallL; r++) {
            let s = a.small[r];
            var l = h ? s._delay : 0;
            for (let t = 0; t < i; t++) {
                let i = this.small[e[t]];
                var o = this.small._delay;
                R.Is.def(o[r]) && o[r].stop(),
                o[r] = new R.Delay(t => {
                    i[r] = {};
                    for (let t = 0; t < this.propL; t++) {
                        var e = this.prop[t];
                        i[r][e] = s[e]
                    }
                }
                ,l),
                o[r].run()
            }
        }
        for (let r = 0; r < this.texLargeL; r++) {
            let s = a.large[r];
            var n = h ? s._delay : 0;
            for (let t = 0; t < i; t++) {
                let i = this.large[e[t]];
                var p = this.large._delay;
                R.Is.def(p[r]) && p[r].stop(),
                p[r] = new R.Delay(t => {
                    i[r] = {};
                    for (let t = 0; t < this.propL; t++) {
                        var e = this.prop[t];
                        i[r][e] = s[e]
                    }
                }
                ,n),
                p[r].run()
            }
        }
    }
    hide() {
        var e = _A;
        let h = e.win.h
          , l = "in" === e.mode
          , o = (l || (e.index = Math.floor(e.e.s._[this.url].curr / (this.data.out.w + this.data.out.gap.x) + .5)),
        e.index)
          , n = h + this.data.in.small.gap.x - this.data.in.small.y
          , p = -(this.data.out.y + this.data.out.h + this.data.out.gap.x)
          , i = 1300;
        e.fromBack && (i = 1);
        var s = [];
        let r = 0
          , a = 0;
        for (let t = 0; t < this.texSmallL; t++) {
            var d = t === this.texSmallL - 1;
            e.fromBack ? s[t] = d ? 1 : 0 : l ? s[t] = 40 * t : s[t] = 20 * Math.abs(t - Math.max(o - 2, 0)),
            s[t] >= a && (a = s[t],
            r = t)
        }
        var c = t => {
            this.reset()
        }
        ;
        this.mutationFxPause();
        let g = [];
        for (let t = 0; t < this.texSmallL; t++)
            g[t] = this.texSmall[t].ease.y;
        let u = [];
        for (let t = 0; t < this.texLargeL; t++)
            u[t] = this.texLarge[t].ease.y;
        for (let t = 0; t < this.texSmallL; t++) {
            var m = t === r && c;
            let a = this.texSmallL * t;
            this.mutationFx[t] = new R.M({
                d: i,
                e: [.64, 0, .12, 1],
                delay: s[t],
                update: e => {
                    if (this.easing = !0,
                    this.moving = !0,
                    this.texSmall[t].ease.y = R.Lerp(g[t], n, e.progE),
                    l) {
                        if (0 === t)
                            for (let t = 0; t < this.texSmallL; t++) {
                                var i = t + this.texSmallL * o;
                                this.texLarge[i].ease.y = R.Lerp(u[i], -(h + 2), e.progE),
                                this.texLarge[i].ease.pY = R.Lerp(0, -.6, e.progE)
                            }
                        if (t !== o)
                            for (let t = 0; t < this.texSmallL; t++) {
                                var s = t + a;
                                this.texLarge[s].ease.y = R.Lerp(u[s], n, e.progE)
                            }
                    } else
                        for (let t = 0; t < this.texSmallL; t++) {
                            var r = t + a;
                            this.texLarge[r].ease.y = R.Lerp(u[r], p, e.progE)
                        }
                }
                ,
                cb: m
            })
        }
        return {
            play: t => {
                for (let t = 0; t < this.texSmallL; t++)
                    this.mutationFx[t].play()
            }
        }
    }
    show() {
        let h = _A;
        var e = h.index
          , t = h.win.h;
        let l = "in" === h.mode;
        var i = this.data.in.small;
        let o = t + i.gap.x - i.y
          , n = this.data.out.y + this.data.out.h
          , s = 1300;
        h.fromBack && (s = 1);
        var r = [];
        let p = 0
          , a = 0;
        for (let t = 0; t < this.texSmallL; t++) {
            var d = t === this.texSmallL - 1;
            h.fromBack ? r[t] = d ? 1 : 0 : l ? r[t] = 40 * t : r[t] = 20 * Math.abs(t - Math.max(e - 2, 0)),
            r[t] >= a && (a = r[t],
            p = t)
        }
        let c = this.texSmallL * e + e;
        l && (this.texLarge[c].ease.scale = .15);
        var g = t => {
            this.reset()
        }
        ;
        this.mutationFxPause();
        for (let t = 0; t < this.texSmallL; t++) {
            var u = t === p && g;
            let a = this.texSmallL * t;
            if (this.texSmall[t].ease.y = o,
            l) {
                if (t !== e)
                    for (let t = 0; t < this.texSmallL; t++) {
                        var m = t + a;
                        this.texLarge[m].ease.y = o
                    }
            } else
                for (let t = 0; t < this.texSmallL; t++) {
                    var v = t + a;
                    this.texLarge[v].ease.y = n
                }
            this.mutationFx[t] = new R.M({
                d: s,
                e: "o6",
                delay: r[t],
                update: e => {
                    if (this.easing = !0,
                    this.moving = !0,
                    this.texSmall[t].ease.y = R.Lerp(o, 0, e.progE),
                    l) {
                        if (0 === t) {
                            for (let t = 0; t < this.texSmallL; t++) {
                                var i = t + this.texSmallL * h.index;
                                this.texLarge[i].ease.y = 0,
                                this.texLarge[i].ease.pY = 0
                            }
                            this.texLarge[c].ease.scale = R.Lerp(.15, 0, e.progE)
                        }
                        if (t !== h.index)
                            for (let t = 0; t < this.texSmallL; t++) {
                                var s = t + a;
                                this.texLarge[s].ease.y = R.Lerp(o, 0, e.progE)
                            }
                    } else
                        for (let t = 0; t < this.texSmallL; t++) {
                            var r = t + a;
                            this.texLarge[r].ease.y = R.Lerp(n, 0, e.progE)
                        }
                }
                ,
                cb: u
            })
        }
        return {
            play: t => {
                for (let t = 0; t < this.texSmallL; t++)
                    this.mutationFx[t].play()
            }
        }
    }
    mutationFxPause() {
        for (let t = 0; t < this.texSmallL; t++)
            R.Is.def(this.mutationFx[t]) && this.mutationFx[t].pause()
    }
    reset() {
        for (let t = 0; t < this.texLargeL; t++)
            this.texLarge[t].lerp.h = 0,
            this.texLarge[t].ease.y = 0,
            this.texLarge[t].ease.pY = 0,
            this.texLarge[t].ease.scale = 0;
        for (let t = 0; t < this.texSmallL; t++)
            this.texSmall[t].lerp.h = 0,
            this.texSmall[t].ease.y = 0,
            this.texSmall[t].ease.pY = 0,
            this.texLarge[t].ease.scale = 0;
        this.moving = !1,
        this.easing = !1
    }
    zIndex() {
        for (let t = 0; t < this.texLargeL; t++) {
            var e = Math.floor(t / this.texSmallL);
            this.texLarge[t].zIndex = e === _A.index ? 0 : 1
        }
    }
}
;
class FxTitle {
    init() {
        this.title = R.G.class("h-title"),
        this.fx = [];
        for (let t = 0; t < 8; t++)
            this.fx[t] = new Anima({
                descendant: 1,
                el: this.title[t],
                prop: [["y", 140, -140]]
            })
    }
    show(e) {
        var t = _A
          , i = t.config.isLocal && t.introducing
          , s = e.mutation;
        let r = e.delay
          , a = 1500;
        (s && t.fromBack || i) && (r = 0,
        a = 0);
        let h = this.fx[e.index].motion({
            action: "show",
            d: a,
            e: "o6",
            delay: r,
            reverse: !1
        });
        return {
            play: t => {
                R.PE.all(this.title[e.index]),
                h.play()
            }
        }
    }
    hide(e) {
        var t = _A
          , i = e.mutation;
        let s = e.delay
          , r = 500
          , a = "o2"
          , h = (i && (t.fromBack ? (s = 0,
        r = 0) : (r = 600,
        a = "i3")),
        this.fx[e.index].motion({
            action: "hide",
            d: r,
            e: a,
            delay: s,
            reverse: !1
        }));
        return {
            play: t => {
                R.PE.none(this.title[e.index]),
                h.play()
            }
        }
    }
}
class FxCross {
    init() {
        this.svg = R.G.id("h-cross").children,
        this.coord = {
            hide: ["11,11.75 11,11.75 11,10.249 11,10.249 11,11", "11.75,11 11.75,11 10.249,11 10.249,11 11,10.999"],
            show: ["22,11.751 0,11.751 0,10.249 22,10.249 22,11", "11.751,0 11.751,22 10.249,22 10.249,0 11,0"]
        },
        this.morph = [];
        for (let t = 0; t < 3; t++)
            this.morph[t] = []
    }
    middle(e) {
        var t = _A
          , i = "show" === e.a
          , s = t.config.isLocal && t.introducing;
        let r = e.delay
          , a = i ? 1200 : 250;
        var h = i ? "o6" : "o2";
        (e.mutation && t.fromBack || s) && (r = 0,
        a = 0);
        for (let t = 0; t < 2; t++)
            R.Is.def(this.morph[2][t]) && this.morph[2][t].pause(),
            this.morph[2][t] = new R.M({
                el: this.svg[2].children[0].children[t],
                svg: {
                    type: "polygon",
                    end: this.coord[e.a][t]
                },
                d: a,
                e: h,
                delay: r,
                r: 6
            });
        return {
            play: t => {
                for (let t = 0; t < 2; t++)
                    this.morph[2][t].play()
            }
        }
    }
    side(i) {
        var t = _A
          , e = "show" === i.a
          , s = t.config.isLocal && t.introducing;
        let r = i.delay
          , a = e ? 1200 : 250;
        var h = e ? "o6" : "o2";
        (i.mutation && t.fromBack || s) && (r = 0,
        a = 0);
        for (let e = 0; e < 2; e++)
            for (let t = 0; t < 2; t++)
                R.Is.def(this.morph[e][t]) && this.morph[e][t].pause(),
                this.morph[e][t] = new R.M({
                    el: this.svg[e].children[0].children[t],
                    svg: {
                        type: "polygon",
                        end: this.coord[i.a][t]
                    },
                    d: a,
                    e: h,
                    delay: r,
                    r: 6
                });
        return {
            play: t => {
                for (let e = 0; e < 2; e++)
                    for (let t = 0; t < 2; t++)
                        this.morph[e][t].play()
            }
        }
    }
}
class FxPgn {
    init() {
        this.left = new Anima({
            descendant: 0,
            el: R.G.id("h-pgn-left-w"),
            prop: [["x", -110, -110]],
            delay: 0
        }),
        this.right = new Anima({
            descendant: 0,
            el: R.G.id("h-pgn-right"),
            prop: [["x", 110, 110]],
            delay: 0
        }),
        this.scale = new R.M({
            el: "#h-pgn-middle",
            p: {
                scaleX: [0, 1]
            },
            r: 6
        })
    }
    show(t) {
        var e = _A
          , i = t.mutation
          , s = e.config.isLocal && e.introducing;
        let r = t.delay
          , a = 1500
          , h = ((i && e.fromBack || s) && (r = 0,
        a = 0),
        this.left.motion({
            action: "show",
            d: a,
            e: "o6",
            delay: r,
            reverse: !1
        }))
          , l = this.right.motion({
            action: "show",
            d: a,
            e: "o6",
            delay: r,
            reverse: !1
        });
        return {
            play: t => {
                this.scale.play({
                    d: a,
                    e: "o6",
                    delay: r
                }),
                h.play(),
                l.play()
            }
        }
    }
    hide(t) {
        var e = _A
          , i = t.mutation;
        let s = t.delay
          , r = 500
          , a = "o2"
          , h = (i && (e.fromBack ? (s = 0,
        r = 0) : (r = 600,
        a = "i3")),
        this.left.motion({
            action: "hide",
            d: r,
            e: a,
            delay: s,
            reverse: !1
        }))
          , l = this.right.motion({
            action: "hide",
            d: r,
            e: a,
            delay: s,
            reverse: !1
        });
        return {
            play: t => {
                this.scale.play({
                    d: r,
                    e: a,
                    delay: s,
                    reverse: !0
                }),
                h.play(),
                l.play()
            }
        }
    }
}
class Over {
    constructor() {
        R.BM(this, ["fn"])
    }
    init() {
        this.no = R.G.class("h-title-no"),
        this.fx = [],
        this.visible = [];
        for (let t = 0; t < 8; t++)
            this.fx[t] = new Anima({
                descendant: 1,
                el: this.no[t],
                prop: [["y", 112, -112]]
            }),
            this.visible[t] = !1
    }
    fn(t) {
        var e = "mouseenter" === t.type
          , t = R.Index.class(t.target, "h-title-a")
          , i = e ? "show" : "hide"
          , s = e ? 1200 : 300
          , r = e ? "o6" : "o2";
        this.visible[t] = e,
        this.fx[t].motion({
            action: i,
            d: s,
            e: r,
            delay: 0,
            reverse: !1
        }).play()
    }
    hide(t) {
        var e = _A
          , i = t.index;
        if (!this.visible[i])
            return {
                play: t => {}
            };
        let s = 600;
        t.mutation && e.fromBack && (s = 0);
        let r = this.fx[i].motion({
            action: "hide",
            d: s,
            e: "i3",
            delay: 0,
            reverse: !1
        })
          , a = new R.M({
            el: this.no[i],
            p: {
                y: [0, -300]
            },
            d: s,
            e: "i3"
        });
        return {
            play: t => {
                r.play(),
                a.play()
            }
        }
    }
    on() {
        this.l("a")
    }
    off() {
        this.l("r")
    }
    l(t) {
        R.L(".h-title-a", t, "mouseenter", this.fn),
        R.L(".h-title-a", t, "mouseleave", this.fn)
    }
}
class Home {
    constructor() {
        this.gl = new GL$1,
        this.fxTitle = new FxTitle,
        this.fxCross = new FxCross,
        this.fxPgn = new FxPgn,
        this.over = new Over
    }
    initB() {
        this.notRequired = !_A.is.ho,
        this.notRequired || this.gl.initB()
    }
    initA() {
        this.notRequired || (this.gl.initA(),
        this.fxTitle.init(),
        this.fxCross.init(),
        this.fxPgn.init(),
        this.over.init())
    }
    resizeB() {
        this.notRequired || this.gl.resizeB()
    }
    resizeA() {
        this.notRequired || this.gl.resizeA()
    }
    loop() {
        this.notRequired && !this.gl.moving || this.gl.loop()
    }
    on() {
        this.over.on()
    }
    off() {
        this.over.off()
    }
}
class GL {
    constructor() {
        this.moving = !1,
        this.easing = !1
    }
    initB() {
        var t = _A
          , t = (this.url = t.route.new.url,
        t.rgl._[this.url])
          , t = (this.tex = t.plane,
        this.texL = t.planeL,
        this.prop = t.lerp.prop,
        this.propL = t.lerp.propL,
        this.unequal = t.unequal,
        R.G.class("w-footer"))
          , e = R.G.class("w-progress")
          , i = R.G.class("w-footer-exp")
          , s = t.length - 1;
        this.footer = t[s],
        this.progress = e[s],
        this.footerExp = i[s].children[0],
        this.footerExpValue = 0,
        R.T(this.progress, 0, -100),
        this.targ = [],
        this.expand = []
    }
    initA() {
        this.resizeA()
    }
    resizeA() {
        var t = _A
          , e = t.e.s._[this.url].step
          , i = t.win.w
          , s = t.win.h
          , t = t.isOver169 ? t.winHpsdH : t.winWpsdW
          , r = (this.targ[0] = {
            x: 0,
            y: 0,
            w: i,
            h: s,
            scale: 1,
            opacity: 1,
            pY: 0
        },
        this.expand[0] = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            scale: 0,
            opacity: 0,
            pY: 0
        },
        350 * t)
          , t = 500 * t
          , a = .5 * (i - r)
          , e = this.footer.getBoundingClientRect().top + e + .5 * (s - t)
          , i = i + 2 - r
          , h = s + 2 - t
          , l = -a - 1
          , s = .5 * -(s + 2 - t);
        this.targ[1] = {
            x: a,
            y: e,
            w: r,
            h: t,
            scale: 1.25,
            opacity: 1,
            pY: 0
        },
        this.expand[1] = {
            x: l,
            y: s,
            w: i,
            h: h,
            scale: -.25,
            opacity: 0,
            pY: 0
        },
        this.texSet()
    }
    loop() {
        this.texSet();
        var t = _A
          , e = t.e.s._[this.url]
          , i = t.win.h;
        R.T(this.progress, 0, R.R(R.Lerp(-100, 0, e.curr / t.e.s.max))),
        this.tex[0].lerp.pY = R.Lerp(0, -.3, R.Clamp(e.step, 0, i) / i)
    }
    texSet() {
        var t = _A.e.s._[this.url]
          , e = t.step
          , i = t.expand
          , t = (this.moving = this.easing,
        R.R(100 * i, 0));
        this.footerExpValue !== t && (this.footerExpValue = t,
        this.footerExp.textContent = t);
        for (let t = 0; t < this.texL; t++) {
            var s = this.tex[t]
              , r = this.targ[t]
              , a = this.expand[t];
            for (let t = 0; t < this.propL; t++) {
                var h = this.prop[t];
                s.lerp[h] = r[h] + a[h] * i,
                "y" === h && (s.lerp[h] -= e)
            }
        }
    }
    hide() {
        let e = _A.win.h
          , i = this.tex[0]
          , s = this.tex[1];
        return this.mutationFxPause(),
        {
            play: t => {
                i.ease.y = e,
                i.ease.pY = 0,
                i.lerp.h = 0,
                s.lerp.h = 0
            }
        }
    }
    showFromHome() {
        var t = _A;
        let e = t.win.h
          , i = this.tex[0]
          , s = t.fromBack ? 1 : 1290;
        return this.mutationFxPause(),
        this.mutationFx = new R.M({
            d: s,
            e: [.64, 0, .12, 1],
            update: t => {
                this.easing = !0,
                this.moving = !0,
                i.ease.y = R.Lerp(e, 0, t.progE),
                i.ease.pY = R.Lerp(.6, 0, t.progE)
            }
            ,
            cb: t => {
                this.easing = !1,
                this.moving = !1
            }
        }),
        {
            play: t => {
                this.mutationFx.play()
            }
        }
    }
    showFromWork() {
        var t = _A;
        let e = t.win.h
          , i = t.rgl._[t.route.new.url].plane[0]
          , s = t.rgl._[t.route.old.url].plane[1]
          , r = t.fromBack ? 1 : 1290
          , a = (this.mutationFxPause(),
        s.ease.y = 0,
        s.ease.pY = 0,
        i.ease.y = e,
        i.ease.pY = .6,
        R.G.class("w-progress")[0]);
        return this.mutationFx = new R.M({
            d: r,
            e: [.64, 0, .12, 1],
            update: t => {
                this.easing = !0,
                this.moving = !0,
                R.T(a, 0, R.Lerp(0, -100, t.progE)),
                s.ease.y = R.Lerp(0, -(e + 2), t.progE),
                s.ease.pY = R.Lerp(0, -.6, t.progE);
                t = R.Ease4([.64, 0, .12, 1])(R.iLerp(0, .99, t.prog));
                i.ease.y = R.Lerp(e, 0, t),
                i.ease.pY = R.Lerp(.6, 0, t)
            }
            ,
            cb: t => {
                s.lerp.h = 0,
                s.ease.y = 0,
                s.ease.pY = 0,
                this.easing = !1,
                this.moving = !1
            }
        }),
        {
            play: t => {
                this.mutationFx.play()
            }
        }
    }
    mutationFxPause() {
        R.Is.def(this.mutationFx) && this.mutationFx.pause()
    }
}
class SLine {
    constructor(t) {
        this.el = R.Select.el(t.el)[0],
        this.txt = this.el.innerHTML;
        var t = R.Cr("div")
          , e = (t.innerHTML = this.txt,
        t.childNodes)
          , i = e.length;
        this.arr = [];
        let s = 0;
        for (let t = 0; t < i; t++) {
            var r, a = e[t];
            if (3 === a.nodeType) {
                var h = a.nodeValue.split(" ")
                  , l = h.length;
                for (let t = 0; t < l; t++) {
                    var o = "" === h[t] ? " " : h[t];
                    this.arr[s] = {
                        type: "txt",
                        word: o
                    },
                    s++
                }
            } else
                "BR" === a.tagName ? (this.arr[s] = {
                    type: "br"
                },
                s++) : "A" === a.tagName && (r = a.outerHTML,
                a = a.textContent,
                r = r.split(a),
                this.arr[s] = {
                    type: "a",
                    start: r[0],
                    end: r[1],
                    word: a.split(" ")
                },
                s++)
        }
        this.arrL = this.arr.length
    }
    resize(t) {
        this.el.innerHTML = this.txt;
        var i = this.el.offsetWidth
          , s = R.Cr("div")
          , e = s.style
          , r = (e.visibility = "hidden",
        e.position = "absolute",
        e.whiteSpace = "nowrap",
        window.getComputedStyle(this.el));
        e.fontFamily = this.gPV(r, "font-family"),
        e.fontSize = this.gPV(r, "font-size"),
        e.fontWeight = this.gPV(r, "font-weight"),
        e.letterSpacing = this.gPV(r, "letter-spacing"),
        document.body.prepend(s);
        let a = "";
        var h = [];
        let l = 0
          , o = ""
          , n = "";
        for (let t = 0; t < this.arrL; t++) {
            var p = this.arr[t];
            if ("txt" === p.type) {
                var d = p.word
                  , c = " " === d ? "" : " ";
                s.innerHTML = o + d,
                n = s.offsetWidth >= i ? (h[l++] = n.trim(),
                o = d + c) : (o = o + d + c,
                n + d + c)
            } else if ("a" === p.type) {
                var g = p.start
                  , u = p.end
                  , m = p.word
                  , v = m.length
                  , f = v - 1;
                o = this.rLS(o),
                n = this.rLS(n);
                for (let e = 0; e < v; e++) {
                    var x = m[e]
                      , w = e === f ? "" : " ";
                    if (s.innerHTML = o + x,
                    s.offsetWidth >= i)
                        0 === e ? h[l++] = n.trim() : (n = n.trim() + u,
                        h[l++] = n),
                        o = x + w,
                        n = e === f ? g + x + u + w : g + x + w;
                    else {
                        o = o + x + w;
                        let t = x;
                        0 === e && (t = g + t),
                        e === f && (t += u),
                        n = n + t + w
                    }
                }
            } else
                "br" === p.type && (h[l++] = n.trim(),
                o = "",
                n = "")
        }
        n !== h[l - 1] && "" !== (e = n.trim()) && (h[l++] = e);
        var y = t.tag.start
          , L = t.tag.end;
        for (let t = 0; t < l; t++) {
            var _ = "" === h[t] ? "&nbsp;" : h[t];
            a += y + _ + L
        }
        s.parentNode.removeChild(s),
        this.el.innerHTML = a
    }
    rLS(t) {
        return t.replace(/\s?$/, "")
    }
    gPV(t, e) {
        return t.getPropertyValue(e)
    }
}
class FxHero {
    init() {
        var t = (t = R.G.class("page"))[t.length - 1];
        this.h1 = R.G.class("w-hero-txt-h1", t),
        this.h1L = this.h1.length,
        this.pgnLeft = R.G.class("w-hero-pgn-left", t)[0],
        this.pgnMiddle = R.G.class("w-hero-pgn-middle", t)[0],
        this.pgnRight = R.G.class("w-hero-pgn-right", t)[0],
        this.roleTitle = R.G.class("w-hero-txt-role-title", t)[0].children[0],
        this.roleP = new SLine({
            el: R.G.class("w-hero-txt-role-p", t)[0]
        }),
        this.team = R.G.class("w-hero-txt-team", t),
        this.teamL = this.team.length,
        this.scroll = R.G.class("w-hero-txt-scroll", t)[0].children[0],
        this.arrow = R.G.class("w-hero-txt-icon-arrow", t)[0],
        this.border = R.G.class("w-hero-txt-icon-border-path", t)[0],
        this.visible = !1,
        this.resizeA()
    }
    resizeA() {
        var t = this.visible ? 0 : 110;
        this.roleP.resize({
            tag: {
                start: '<span class="w-hero-txt-role-p-fx"><span style="transform: translate3d(0,' + t + '%,0);">',
                end: "</span></span>"
            }
        }),
        this.pFx = R.G.class("w-hero-txt-role-p-fx", this.roleP.el),
        this.pFxL = this.pFx.length
    }
    show(t) {
        var e = _A
          , i = e.config.isLocal && e.introducing
          , s = t.mutation;
        let r = t.delay
          , a = 70
          , h = 1500
          , l = 1600;
        var o = "o6";
        (s && e.fromBack || i) && (r = 0,
        a = 0,
        h = 0,
        l = 1);
        let n = new R.TL;
        for (let t = 0; t < this.h1L; t++) {
            var p = 0 === t ? r : a;
            n.from({
                el: this.h1[t],
                p: {
                    y: [110, 0]
                },
                d: h,
                e: o,
                delay: p
            })
        }
        n.from({
            el: this.roleTitle,
            p: {
                y: [110, 0]
            },
            d: h,
            e: o,
            delay: a
        });
        for (let t = 0; t < this.pFxL; t++)
            n.from({
                el: this.pFx[t].children[0],
                p: {
                    y: [110, 0]
                },
                d: h,
                e: o,
                delay: a
            });
        for (let t = 0; t < this.teamL; t++)
            n.from({
                el: this.team[t],
                p: {
                    y: [110, 0]
                },
                d: h,
                e: o,
                delay: a
            });
        n.from({
            el: this.scroll,
            p: {
                y: [110, 0]
            },
            d: h,
            e: o
        }),
        n.from({
            el: this.arrow,
            p: {
                opacity: [0, 1]
            },
            d: h,
            e: "o1"
        }),
        n.from({
            el: this.arrow,
            p: {
                y: [-14, 0, "px"]
            },
            d: h,
            e: o
        });
        let d = new R.TL
          , c = (d.from({
            el: this.pgnLeft,
            p: {
                x: [-110, 0]
            },
            d: h,
            e: o,
            delay: r + 2 * a
        }),
        d.from({
            el: this.pgnMiddle,
            p: {
                scaleX: [0, 1]
            },
            d: h,
            e: o,
            r: 6
        }),
        d.from({
            el: this.pgnRight,
            p: {
                x: [110, 0]
            },
            d: h,
            e: o
        }),
        new R.M({
            el: this.border,
            line: {
                start: 0,
                end: 100
            },
            d: l,
            e: "io5",
            delay: r
        }));
        return {
            play: t => {
                this.visible = !0,
                n.play(),
                d.play(),
                c.play()
            }
        }
    }
}
class FxFooter {
    init() {
        var t = R.G.class("w-footer-link-title")[0].children[0]
          , e = R.G.class("w-footer-link-tagline")[0].children[0]
          , i = R.G.class("w-footer-exp")[0].children[0];
        this.fx0 = new R.M({
            el: i,
            p: {
                y: [0, -110]
            }
        }),
        this.fx1 = new R.M({
            el: e,
            p: {
                y: [0, -110]
            }
        }),
        this.fx2 = new R.M({
            el: t,
            p: {
                y: [0, -110]
            }
        })
    }
    hide(t) {
        var e = _A
          , i = t.mutation;
        let s = t.delay
          , r = t.delay + 20
          , a = t.delay + 26
          , h = 600;
        return i && e.fromBack && (s = 0,
        r = 0,
        a = 0,
        h = 0),
        {
            play: t => {
                this.fx0.play({
                    d: h,
                    e: "i3",
                    delay: s
                }),
                this.fx1.play({
                    d: h,
                    e: "i3",
                    delay: r
                }),
                this.fx2.play({
                    d: h,
                    e: "i3",
                    delay: a
                })
            }
        }
    }
}
class FxBack {
    init() {
        var t = R.G.class("w-back");
        this.back = t[t.length - 1],
        this.fx = new Anima({
            descendant: 1,
            el: this.back,
            prop: [["y", 110, -110]]
        })
    }
    show(t) {
        var e = _A
          , i = e.config.isLocal && e.introducing
          , s = t.mutation;
        let r = t.delay
          , a = 1500;
        (s && e.fromBack || i) && (r = 0,
        a = 0);
        let h = this.fx.motion({
            action: "show",
            d: a,
            e: "o6",
            delay: r,
            reverse: !1
        });
        return {
            play: t => {
                R.PE.all(this.back),
                h.play()
            }
        }
    }
    hide(t) {
        var e = _A
          , i = t.mutation;
        let s = t.delay
          , r = 500;
        i && e.fromBack && (s = 0,
        r = 0);
        let a = this.fx.motion({
            action: "hide",
            d: r,
            e: "o2",
            delay: s,
            reverse: !1
        });
        return {
            play: t => {
                R.PE.none(this.back),
                a.play()
            }
        }
    }
}
let Preview$1 = class {
    init() {
        this.url = _A.route.new.url;
        var t = R.G.class("w-preview-w")
          , t = (this.preview = t[t.length - 1],
        R.G.class("w-preview-area"))
          , t = (this.area = t[t.length - 1],
        R.G.class("w-s"));
        this.section = t[t.length - 1],
        this.resizeA()
    }
    resizeA() {
        var t = _A
          , e = t.win.h
          , t = t.win.w
          , i = parseInt(getComputedStyle(this.section).marginTop, 10)
          , s = this.preview.offsetHeight
          , r = this.section.offsetHeight
          , t = (this.areaRight = t - (this.preview.getBoundingClientRect().left + this.preview.offsetWidth),
        this.prlx = Math.max(s + 2 * this.areaRight - e, 0),
        s / r);
        this.area.style.height = e * t + 7 + "px",
        this.previewMax = r - s,
        this.previewStart = e + i - this.areaRight,
        this.previewEnd = this.previewStart + this.previewMax + this.prlx,
        0 < this.prlx ? this.areaMax = r - (e - 2 * this.areaRight) : this.areaMax = this.previewMax,
        this.areaMax *= t
    }
    loop() {
        var t = _A.e.s._[this.url].step;
        t < this.previewStart ? (R.T(this.preview, 0, -R.R(t), "px"),
        R.T(this.area, 0, -R.R(t), "px")) : t >= this.previewStart && t <= this.previewEnd ? (R.T(this.preview, 0, -R.R(this.previewStart + R.Remap(this.previewStart, this.previewEnd, 0, this.prlx, t)), "px"),
        R.T(this.area, 0, -R.R(this.previewStart - R.Remap(this.previewStart, this.previewEnd, 0, this.areaMax - this.prlx, t)), "px")) : t > this.previewEnd && (R.T(this.preview, 0, -R.R(t - this.previewMax), "px"),
        R.T(this.area, 0, -R.R(t - this.previewMax - this.areaMax), "px"))
    }
}
;
class Work {
    constructor() {
        this.gl = new GL,
        this.fxHero = new FxHero,
        this.fxFooter = new FxFooter,
        this.fxBack = new FxBack,
        this.preview = new Preview$1
    }
    initB() {
        this.notRequired = !_A.is.wo,
        this.notRequired || this.gl.initB()
    }
    initA() {
        this.notRequired || (this.gl.initA(),
        this.fxHero.init(),
        this.fxFooter.init(),
        this.fxBack.init(),
        this.preview.init())
    }
    resizeA() {
        this.notRequired || (this.gl.resizeA(),
        this.preview.resizeA(),
        this.fxHero.resizeA())
    }
    loop() {
        this.notRequired && !this.gl.moving || (this.gl.loop(),
        this.preview.loop())
    }
}
let Fx$2 = class {
    init() {
        this.left = R.G.id("a-l"),
        this.leftPreview = R.G.id("a-lp"),
        this.leftSection = R.G.class("a-l-s"),
        this.leftSectionL = this.leftSection.length
    }
    show(t) {
        var e = _A
          , i = e.config.isLocal && e.introducing
          , s = t.mutation;
        let r = t.delay
          , a = 1500;
        let h = 200
          , l = 50
          , o = 500
          , n = ((s && e.fromBack || i) && (r = 0,
        a = 0,
        h = 0,
        l = 0,
        o = 0),
        new R.TL);
        for (let t = 0; t < this.leftSectionL; t++) {
            var p = 0 === t ? r + h : l;
            n.from({
                el: this.leftSection[t],
                p: {
                    opacity: [0, .85]
                },
                d: a,
                e: "o1",
                delay: p
            }),
            n.from({
                el: this.leftSection[t],
                p: {
                    y: [80, 0, "px"]
                },
                d: a,
                e: "o6"
            })
        }
        let d = new R.TL;
        return d.from({
            el: this.leftPreview,
            p: {
                opacity: [0, .85]
            },
            d: a,
            e: "o1",
            delay: r + o
        }),
        {
            play: t => {
                n.play(),
                d.play()
            }
        }
    }
}
;
class SFx {
    init() {
        this.url = _A.route.new.url,
        this.trigger = [],
        this.tl = [],
        this.isVisible = [],
        this.limit = [],
        this.first = !0,
        this.heroP = R.G.id("a-r-hero").children,
        this.heroPL = this.heroP.length,
        this.slineHeroP = [];
        for (let t = 0; t < this.heroPL; t++)
            this.slineHeroP[t] = new SLine({
                el: this.heroP[t]
            });
        var t = R.G.id("a-r-experience")
          , t = (this.expH2 = R.G.tag("h2", t)[0].children[0],
        this.expLi = R.G.tag("ul", t)[0].children,
        this.expLiL = this.expLi.length,
        R.G.id("a-r-recognition"))
          , t = (this.recoH2 = R.G.tag("h2", t)[0].children[0],
        this.recoLi = R.G.tag("ul", t)[0].children,
        this.recoLiL = this.recoLi.length,
        R.G.id("a-r-clients"))
          , t = (this.clientsH2 = R.G.tag("h2", t)[0].children[0],
        this.clientsLi = R.G.tag("ul", t)[0].children,
        this.clientsLiL = this.clientsLi.length,
        R.G.id("a-r-contact"))
          , t = (this.contactH2 = R.G.tag("h2", t)[0].children[0],
        this.contactLi = R.G.tag("ul", t)[0].children,
        this.contactLiL = this.contactLi.length,
        R.G.id("a-r-credits"));
        this.creditsH2 = R.G.tag("h2", t)[0].children[0],
        this.creditsLi = R.G.tag("ul", t)[0].children,
        this.creditsLiL = this.creditsLi.length,
        this.resize()
    }
    resize() {
        let e = 0;
        var i = 1500
          , s = "o6";
        for (let t = 0; t < this.heroPL; t++) {
            this.trigger[e] = this.heroP[t];
            var r = this.limitSet(e)
              , a = r.delay
              , h = r.fromBack ? 0 : i
              , l = r.fromBack ? 0 : 100
              , r = this.isVisible[e] ? 0 : 110
              , o = (this.slineHeroP[t].resize({
                tag: {
                    start: '<span class="sfx-y"><span style="transform: translate3d(0,' + r + '%,0);">',
                    end: "</span></span>"
                }
            }),
            R.G.class("sfx-y", this.slineHeroP[t].el))
              , n = o.length;
            if (!this.isVisible[e]) {
                this.tl[e] = new R.TL;
                for (let t = 0; t < n; t++) {
                    var p = 0 === t ? a : l;
                    this.tl[e].from({
                        el: o[t].children[0],
                        p: {
                            y: [110, 0]
                        },
                        d: h,
                        e: s,
                        delay: p
                    })
                }
            }
            e++
        }
        this.trigger[e] = this.expH2;
        var t = this.limitSet(e)
          , d = t.delay
          , t = t.fromBack ? 0 : i;
        this.isVisible[e] || (this.tl[e] = new R.TL,
        this.tl[e].from({
            el: this.expH2,
            p: {
                y: [110, 0]
            },
            d: t,
            e: s,
            delay: d
        })),
        e++;
        for (let t = 0; t < this.expLiL; t++) {
            this.trigger[e] = this.expLi[t];
            var c = this.limitSet(e)
              , g = c.delay
              , u = c.fromBack ? 0 : i
              , m = c.fromBack ? 0 : 100
              , v = R.G.class("sfx-y", this.expLi[t])
              , f = v.length;
            if (!this.isVisible[e]) {
                this.tl[e] = new R.TL;
                for (let t = 0; t < f; t++) {
                    var x = 0 === t ? g : m;
                    this.tl[e].from({
                        el: v[t].children[0],
                        p: {
                            y: [110, 0]
                        },
                        d: u,
                        e: s,
                        delay: x
                    })
                }
            }
            e++
        }
        this.trigger[e] = this.recoH2;
        t = this.limitSet(e),
        d = t.delay,
        t = t.fromBack ? 0 : i;
        this.isVisible[e] || (this.tl[e] = new R.TL,
        this.tl[e].from({
            el: this.recoH2,
            p: {
                y: [110, 0]
            },
            d: t,
            e: s,
            delay: d
        })),
        e++;
        for (let t = 0; t < this.recoLiL; t++) {
            this.trigger[e] = this.recoLi[t];
            var w = this.limitSet(e)
              , y = w.delay
              , L = w.fromBack ? 0 : i
              , _ = w.fromBack ? 0 : 100
              , A = R.G.class("sfx-y", this.recoLi[t])
              , b = A.length;
            if (!this.isVisible[e]) {
                this.tl[e] = new R.TL;
                for (let t = 0; t < b; t++) {
                    var S = 0 === t ? y : _;
                    this.tl[e].from({
                        el: A[t].children[0],
                        p: {
                            y: [110, 0]
                        },
                        d: L,
                        e: s,
                        delay: S
                    })
                }
            }
            e++
        }
        this.trigger[e] = this.clientsH2;
        t = this.limitSet(e),
        d = t.delay,
        t = t.fromBack ? 0 : i;
        this.isVisible[e] || (this.tl[e] = new R.TL,
        this.tl[e].from({
            el: this.clientsH2,
            p: {
                y: [110, 0]
            },
            d: t,
            e: s,
            delay: d
        })),
        e++;
        for (let t = 0; t < this.clientsLiL; t++) {
            this.trigger[e] = this.clientsLi[t];
            var M = this.limitSet(e)
              , T = M.delay
              , F = M.fromBack ? 0 : i
              , H = M.fromBack ? 0 : 100
              , P = R.G.class("sfx-y", this.clientsLi[t])
              , G = P.length;
            if (!this.isVisible[e]) {
                this.tl[e] = new R.TL;
                for (let t = 0; t < G; t++) {
                    var I = 0 === t ? T : H;
                    this.tl[e].from({
                        el: P[t].children[0],
                        p: {
                            y: [110, 0]
                        },
                        d: F,
                        e: s,
                        delay: I
                    })
                }
            }
            e++
        }
        this.trigger[e] = this.contactH2;
        t = this.limitSet(e),
        d = t.delay,
        t = t.fromBack ? 0 : i;
        this.isVisible[e] || (this.tl[e] = new R.TL,
        this.tl[e].from({
            el: this.contactH2,
            p: {
                y: [110, 0]
            },
            d: t,
            e: s,
            delay: d
        })),
        e++;
        for (let t = 0; t < this.contactLiL; t++) {
            this.trigger[e] = this.contactLi[t];
            var B = this.limitSet(e)
              , C = B.delay
              , O = B.fromBack ? 0 : i
              , D = B.fromBack ? 0 : 100
              , E = R.G.class("sfx-y", this.contactLi[t])
              , W = E.length;
            if (!this.isVisible[e]) {
                this.tl[e] = new R.TL;
                for (let t = 0; t < W; t++) {
                    var N = 0 === t ? C : D;
                    this.tl[e].from({
                        el: E[t].children[0],
                        p: {
                            y: [110, 0]
                        },
                        d: O,
                        e: s,
                        delay: N
                    })
                }
            }
            e++
        }
        this.trigger[e] = this.creditsH2;
        t = this.limitSet(e),
        d = t.delay,
        t = t.fromBack ? 0 : i;
        this.isVisible[e] || (this.tl[e] = new R.TL,
        this.tl[e].from({
            el: this.creditsH2,
            p: {
                y: [110, 0]
            },
            d: t,
            e: s,
            delay: d
        })),
        e++;
        for (let t = 0; t < this.creditsLiL; t++) {
            this.trigger[e] = this.creditsLi[t];
            var k = this.limitSet(e)
              , q = k.delay
              , V = k.fromBack ? 0 : i
              , U = k.fromBack ? 0 : 100
              , z = R.G.class("sfx-y", this.creditsLi[t])
              , X = z.length;
            if (!this.isVisible[e]) {
                this.tl[e] = new R.TL;
                for (let t = 0; t < X; t++) {
                    var j = 0 === t ? q : U;
                    this.tl[e].from({
                        el: z[t].children[0],
                        p: {
                            y: [110, 0]
                        },
                        d: V,
                        e: s,
                        delay: j
                    })
                }
            }
            e++
        }
        if (this.triggerL = this.trigger.length,
        this.first) {
            for (let t = 0; t < this.triggerL; t++)
                this.isVisible[t] = !1;
            this.first = !1
        }
    }
    loop() {
        var e = _A.e.s._[this.url].curr;
        for (let t = 0; t < this.triggerL; t++)
            e > this.limit[t] && !this.isVisible[t] && (this.isVisible[t] = !0,
            this.tl[t].play())
    }
    limitSet(t) {
        var e = _A
          , i = e.config.isLocal && e.introducing
          , s = e.fromBack
          , r = this.trigger[t].getBoundingClientRect().top + e.e.s._[this.url].curr
          , a = r < e.win.h;
        this.limit[t] = a ? -1 : r - e.sFxS;
        let h = !a || s || i ? 0 : 700 + 200 * t;
        return {
            fromBack: a && s,
            delay: h
        }
    }
}
class Preview {
    init() {
        this.url = _A.route.new.url,
        this.leftW = R.G.id("a-l-w"),
        this.left = R.G.id("a-l"),
        this.preview = R.G.id("a-lp"),
        this.resize()
    }
    resize() {
        var t = _A
          , e = t.win.h
          , i = (R.T(this.leftW, 0, 0, "px"),
        R.T(this.preview, 0, 0, "px"),
        this.left.offsetHeight)
          , s = this.left.getBoundingClientRect().top;
        this.leftArea = e < s + i ? t.win.h - s : s + i - s,
        this.max = i - this.leftArea,
        this.maxP = this.leftArea - this.preview.offsetHeight
    }
    loop() {
        var t = _A
          , e = t.e.s._[this.url].curr
          , t = t.e.s.max
          , i = R.Remap(0, t, 0, this.max, e)
          , t = R.Remap(0, t, 0, this.maxP, e);
        R.T(this.leftW, 0, -R.R(i), "px"),
        R.T(this.preview, 0, R.R(t), "px")
    }
}
class About {
    constructor() {
        this.fx = new Fx$2,
        this.sFx = new SFx,
        this.preview = new Preview
    }
    init() {
        var t = _A;
        this.notRequired = !t.is.ab,
        this.notRequired || (this.fx.init(),
        this.sFx.init(),
        this.preview.init())
    }
    resize() {
        this.notRequired || (this.sFx.resize(),
        this.preview.resize())
    }
    loop() {
        this.notRequired || (this.sFx.loop(),
        this.preview.loop())
    }
}
class E {
    constructor() {
        var t = _A;
        t.lerpP = .083,
        t.index = 0,
        t.mode = "in",
        R.BM(this, ["resize", "loop"]),
        this.raf = new R.RafR(this.loop),
        this.s = new Scroll,
        this.lz = new LZ,
        this.load = new Load,
        this.nav = new Nav,
        this.ho = new Home,
        this.wo = new Work,
        this.ab = new About
    }
    intro() {
        this.s.intro(),
        this.nav.intro()
    }
    init() {
        var t = _A
          , t = (t.is.wo && (t.index = t.config.routes[t.route.new.url].index),
        this.ho.initB(),
        this.wo.initB(),
        {
            isX: t.is.ho
        });
        this.s.init(t),
        this.sIntersect = new SIntersect,
        this.lz.initA(),
        this.ho.initA(),
        this.wo.initA(),
        this.ab.init()
    }
    resize() {
        this.ho.resizeB(),
        this.s.resize(),
        this.sIntersect.resize(),
        this.ho.resizeA(),
        this.wo.resizeA(),
        this.ab.resize(),
        this.load.resizeA(),
        this.lz.resizeA()
    }
    run() {
        new R.ROR(this.resize).on(),
        this.raf.run()
    }
    on() {
        this.ho.on(),
        this.s.on()
    }
    loop() {
        this.s.loop(),
        this.lz.loop(),
        this.wo.loop(),
        this.ho.loop(),
        this.ab.loop(),
        this.s.rqd && this.sIntersect.run()
    }
    off() {
        this.s.off(),
        this.lz.off(),
        this.ho.off()
    }
}
class Page {
    constructor(e) {
        let s = _A
          , r = s.e;
        var i = s.config.isLocal
          , e = e.intro
          , a = s.fromBack
          , t = s.is.ho
          , h = s.is.wo
          , l = s.is.ab
          , o = s.was.ho
          , n = s.was.wo;
        let p = [];
        if (e) {
            if (t) {
                e = 3200;
                let t = i ? 0 : 4e3;
                p.push(r.load.fx({
                    delay: 0
                })),
                p.push(r.ho.fxTitle.show({
                    index: s.index,
                    delay: e
                })),
                p.push(r.ho.fxCross.side({
                    a: "show",
                    delay: 3500
                })),
                p.push(r.ho.fxPgn.show({
                    mutation: !1,
                    delay: 3800
                })),
                p.push(r.nav.fx.show({
                    mutation: !1,
                    delay: 3800
                })),
                new R.Delay(t => {
                    r.on(),
                    R.PE.none(R.G.id("load")),
                    s.mutating = !1,
                    s.introducing = !1
                }
                ,t).run()
            } else if (h) {
                let t = i ? 0 : 4e3;
                p.push(r.load.fx({
                    delay: 0
                })),
                p.push(r.wo.fxHero.show({
                    delay: 3400
                })),
                p.push(r.wo.fxBack.show({
                    delay: 3800
                })),
                new R.Delay(t => {
                    r.on(),
                    s.mutating = !1,
                    s.introducing = !1,
                    R.PE.none(R.G.id("load"))
                }
                ,t).run()
            } else if (l) {
                let t = i ? 0 : 1200;
                p.push(r.ab.fx.show({
                    mutation: !1,
                    delay: 1e3
                })),
                p.push(r.nav.fx.show({
                    mutation: !1,
                    delay: 1e3
                })),
                new R.Delay(t => {
                    r.on(),
                    s.mutating = !1,
                    s.introducing = !1,
                    R.PE.none(R.G.id("load"))
                }
                ,t).run()
            }
        } else if (t) {
            let t = 200
              , e = 300;
            a && (t = 1,
            e = 1),
            n && (p.push(r.wo.gl.hide()),
            p.push(r.nav.fx.show({
                mutation: !0,
                delay: 0
            }))),
            p.push(r.ho.gl.show()),
            "out" === s.mode ? p.push(r.ho.fxCross.middle({
                mutation: !0,
                a: "show",
                delay: t
            })) : (p.push(r.ho.fxTitle.show({
                mutation: !0,
                index: s.index,
                delay: 0
            })),
            p.push(r.ho.fxCross.side({
                mutation: !0,
                a: "show",
                delay: t
            }))),
            p.push(r.ho.fxPgn.show({
                mutation: !0,
                delay: 0
            })),
            new R.Delay(t => {
                r.on(),
                s.mutating = !1
            }
            ,e).run()
        } else if (h) {
            let t = 800
              , e = t + 300
              , i = 1300;
            a && (t = 1,
            e = 1,
            i = 1),
            o ? (p.push(r.nav.fx.hide({
                mutation: !0,
                delay: 0
            })),
            p.push(r.ho.fxCross.side({
                mutation: !0,
                a: "hide",
                delay: 0
            })),
            p.push(r.ho.fxTitle.hide({
                mutation: !0,
                index: s.index,
                delay: 0
            })),
            p.push(r.ho.over.hide({
                mutation: !0,
                index: s.index
            })),
            p.push(r.ho.fxPgn.hide({
                mutation: !0,
                delay: 0
            })),
            p.push(r.ho.gl.hide()),
            p.push(r.wo.gl.showFromHome())) : n && (p.push(r.wo.fxFooter.hide({
                mutation: !0,
                delay: 0
            })),
            p.push(r.wo.gl.showFromWork())),
            p.push(r.wo.fxHero.show({
                mutation: !0,
                delay: t
            })),
            p.push(r.wo.fxBack.show({
                mutation: !0,
                delay: e
            })),
            new R.Delay(t => {
                s.page.removeOld(),
                r.on(),
                s.mutating = !1
            }
            ,i).run()
        } else if (o && l) {
            let t = 800
              , e = 1300;
            a && (t = 1,
            e = 1),
            "out" === s.mode ? p.push(r.ho.fxCross.middle({
                mutation: !0,
                a: "hide",
                delay: 0
            })) : (p.push(r.ho.fxCross.side({
                mutation: !0,
                a: "hide",
                delay: 0
            })),
            p.push(r.ho.fxTitle.hide({
                mutation: !0,
                index: s.index,
                delay: 0
            }))),
            p.push(r.ho.fxPgn.hide({
                mutation: !0,
                delay: 0
            })),
            p.push(r.ho.gl.hide()),
            p.push(r.ab.fx.show({
                mutation: !0,
                delay: t
            })),
            new R.Delay(t => {
                s.page.removeOld(),
                r.on(),
                s.mutating = !1
            }
            ,e).run()
        }
        let d = p.length;
        return {
            play: t => {
                for (let t = 0; t < d; t++)
                    p[t].play()
            }
        }
    }
}
let Fx$1 = class {
    constructor() {
        this.no = R.G.id("load-no").children[0],
        this.bg = R.G.id("load-bg")
    }
    run() {
        let t = 1e3;
        _A.config.isLocal && (t = 0);
        var e = new Page({
            intro: !0
        })
          , i = new R.TL;
        i.from({
            el: this.no,
            p: {
                y: [0, -110]
            },
            d: t,
            e: "i4"
        }),
        e.play(),
        i.play(),
        R.O(this.bg, 0)
    }
}
;
function create() {
    var t = new Float32Array(16);
    return t[0] = 1,
    t[5] = 1,
    t[10] = 1,
    t[15] = 1,
    t
}
function identity(t) {
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
function invert(t, e) {
    var i = e[0]
      , s = e[1]
      , r = e[2]
      , a = e[3]
      , h = e[4]
      , l = e[5]
      , o = e[6]
      , n = e[7]
      , p = e[8]
      , d = e[9]
      , c = e[10]
      , g = e[11]
      , u = e[12]
      , m = e[13]
      , v = e[14]
      , e = e[15]
      , f = c * e
      , R = v * g
      , x = o * e
      , w = v * n
      , y = o * g
      , L = c * n
      , _ = r * e
      , A = v * a
      , b = r * g
      , S = c * a
      , M = r * n
      , T = o * a
      , F = p * m
      , H = u * d
      , P = h * m
      , G = u * l
      , B = h * d
      , E = p * l
      , k = i * m
      , z = u * s
      , I = i * d
      , C = p * s
      , O = i * l
      , D = h * s
      , W = f * l + w * d + y * m - (R * l + x * d + L * m)
      , N = R * s + _ * d + S * m - (f * s + A * d + b * m)
      , m = x * s + A * l + M * m - (w * s + _ * l + T * m)
      , s = L * s + b * l + T * d - (y * s + S * l + M * d)
      , l = 1 / (i * W + h * N + p * m + u * s);
    return t[0] = l * W,
    t[1] = l * N,
    t[2] = l * m,
    t[3] = l * s,
    t[4] = l * (R * h + x * p + L * u - (f * h + w * p + y * u)),
    t[5] = l * (f * i + A * p + b * u - (R * i + _ * p + S * u)),
    t[6] = l * (w * i + _ * h + T * u - (x * i + A * h + M * u)),
    t[7] = l * (y * i + S * h + M * p - (L * i + b * h + T * p)),
    t[8] = l * (F * n + G * g + B * e - (H * n + P * g + E * e)),
    t[9] = l * (H * a + k * g + C * e - (F * a + z * g + I * e)),
    t[10] = l * (P * a + z * n + O * e - (G * a + k * n + D * e)),
    t[11] = l * (E * a + I * n + D * g - (B * a + C * n + O * g)),
    t[12] = l * (P * c + E * v + H * o - (B * v + F * o + G * c)),
    t[13] = l * (I * v + F * r + z * c - (k * c + C * v + H * r)),
    t[14] = l * (k * o + D * v + G * r - (O * v + P * r + z * o)),
    t[15] = l * (O * c + B * r + C * o - (I * o + D * c + E * r)),
    t
}
function perspective(t, e, i, s, r) {
    var e = 1 / Math.tan(.5 * e)
      , a = 1 / (s - r);
    return t[0] = e / i,
    t[1] = 0,
    t[2] = 0,
    t[3] = 0,
    t[4] = 0,
    t[5] = e,
    t[6] = 0,
    t[7] = 0,
    t[8] = 0,
    t[9] = 0,
    t[10] = (r + s) * a,
    t[11] = -1,
    t[12] = 0,
    t[13] = 0,
    t[14] = 2 * r * s * a,
    t[15] = 0,
    t
}
function multiplyFn(t, e) {
    return multiply(t, t, e)
}
function multiply(t, e, i) {
    var s = i[0]
      , r = i[1]
      , a = i[2]
      , h = i[3]
      , l = i[4]
      , o = i[5]
      , n = i[6]
      , p = i[7]
      , d = i[8]
      , c = i[9]
      , g = i[10]
      , u = i[11]
      , m = i[12]
      , v = i[13]
      , f = i[14]
      , i = i[15]
      , R = e[0]
      , x = e[1]
      , w = e[2]
      , y = e[3]
      , L = e[4]
      , _ = e[5]
      , A = e[6]
      , b = e[7]
      , S = e[8]
      , M = e[9]
      , T = e[10]
      , F = e[11]
      , H = e[12]
      , P = e[13]
      , G = e[14]
      , e = e[15];
    return t[0] = s * R + r * L + a * S + h * H,
    t[1] = s * x + r * _ + a * M + h * P,
    t[2] = s * w + r * A + a * T + h * G,
    t[3] = s * y + r * b + a * F + h * e,
    t[4] = l * R + o * L + n * S + p * H,
    t[5] = l * x + o * _ + n * M + p * P,
    t[6] = l * w + o * A + n * T + p * G,
    t[7] = l * y + o * b + n * F + p * e,
    t[8] = d * R + c * L + g * S + u * H,
    t[9] = d * x + c * _ + g * M + u * P,
    t[10] = d * w + c * A + g * T + u * G,
    t[11] = d * y + c * b + g * F + u * e,
    t[12] = m * R + v * L + f * S + i * H,
    t[13] = m * x + v * _ + f * M + i * P,
    t[14] = m * w + v * A + f * T + i * G,
    t[15] = m * y + v * b + f * F + i * e,
    t
}
function translateFn(t, e) {
    return translate(t, t, e)
}
function translate(t, e, i) {
    var s, r, a, h, l, o, n, p, d, c, g, u, m = i[0], v = i[1], i = i[2];
    return e === t ? (t[12] = e[0] * m + e[4] * v + e[8] * i + e[12],
    t[13] = e[1] * m + e[5] * v + e[9] * i + e[13],
    t[14] = e[2] * m + e[6] * v + e[10] * i + e[14],
    t[15] = e[3] * m + e[7] * v + e[11] * i + e[15]) : (s = e[0],
    r = e[1],
    a = e[2],
    h = e[3],
    l = e[4],
    o = e[5],
    n = e[6],
    p = e[7],
    d = e[8],
    c = e[9],
    g = e[10],
    u = e[11],
    t[0] = s,
    t[1] = r,
    t[2] = a,
    t[3] = h,
    t[4] = l,
    t[5] = o,
    t[6] = n,
    t[7] = p,
    t[8] = d,
    t[9] = c,
    t[10] = g,
    t[11] = u,
    t[12] = s * m + l * v + d * i + e[12],
    t[13] = r * m + o * v + c * i + e[13],
    t[14] = a * m + n * v + g * i + e[14],
    t[15] = h * m + p * v + u * i + e[15]),
    t
}
function scaleFn(t, e) {
    return scale(t, t, e)
}
function scale(t, e, i) {
    var s = i[0]
      , r = i[1]
      , i = i[2];
    return t[0] = e[0] * s,
    t[1] = e[1] * s,
    t[2] = e[2] * s,
    t[3] = e[3] * s,
    t[4] = e[4] * r,
    t[5] = e[5] * r,
    t[6] = e[6] * r,
    t[7] = e[7] * r,
    t[8] = e[8] * i,
    t[9] = e[9] * i,
    t[10] = e[10] * i,
    t[11] = e[11] * i,
    t[12] = e[12],
    t[13] = e[13],
    t[14] = e[14],
    t[15] = e[15],
    t
}
class Camera {
    constructor() {
        this.near = 1,
        this.far = 2e3,
        this.fov = 45,
        this.aspect = 1,
        this.projectionMatrix = create(),
        this.matrixCamera = create()
    }
    resize(t) {
        t && (this.aspect = t.aspect);
        var t = Math.PI
          , e = this.fov * (t / 180)
          , e = (this.projectionMatrix = perspective(this.projectionMatrix, e, this.aspect, this.near, this.far),
        _A.winSemi);
        this.posOrigin = {
            x: e.w,
            y: -e.h,
            z: e.h / Math.tan(t * this.fov / 360)
        },
        _A.rgl.uProjectionMatrix(this.projectionMatrix)
    }
    render(t) {
        return this.matrixCamera = identity(this.matrixCamera),
        this.matrixCamera = translateFn(this.matrixCamera, [this.posOrigin.x + t.x, this.posOrigin.y + t.y, this.posOrigin.z + t.z]),
        invert(this.matrixCamera, this.matrixCamera)
    }
}
class Texture {
    constructor(t) {
        this.gl = t,
        this.tex = {}
    }
    run(t) {
        var e = _A
          , t = (this.cb = t,
        e.route)
          , i = t.new.url
          , s = (this.dom = R.G.id("load-no").children[0],
        this.no = 0,
        this.prevNo = 0,
        R.BM(this, ["loop"]),
        this.raf = new R.RafR(this.loop),
        e.data)
          , r = Object.keys(s)
          , a = r.length;
        for (let t = this.texL = 0; t < a; t++) {
            var h = r[t]
              , l = s[h];
            !l.preload && i !== h || this.imgSet({
                media: l,
                url: h,
                gl: !0,
                ext: !1
            })
        }
        this.raf.run()
    }
    imgSet(t) {
        var e = t.ext ? "" : _A.img.jpg
          , i = t.url
          , s = t.gl
          , t = t.media
          , r = t.tex
          , a = t.texL;
        s && (this.tex[i] = []);
        for (let t = 0; t < a; t++)
            this.imgSetOne({
                src: r[t] + e,
                index: t,
                url: i,
                gl: s
            }),
            this.texL++
    }
    imgSetOne(t) {
        var e = t.src;
        let i = t.url
          , s = t.gl
          , r = t.index
          , a = new Image;
        a.onload = t => {
            var e;
            s && (e = this.texInit(a),
            this.tex[i][r] = {
                attrib: e,
                element: a,
                type: "img"
            }),
            this.no++
        }
        ,
        a.src = e
    }
    texInit(t) {
        var e = this.gl
          , i = e.createTexture()
          , s = (e.bindTexture(e.TEXTURE_2D, i),
        e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t),
        [["WRAP_S", "CLAMP_TO_EDGE"], ["WRAP_T", "CLAMP_TO_EDGE"], ["MIN_FILTER", "LINEAR"], ["MAG_FILTER", "LINEAR"]]);
        for (let t = 0; t < 4; t++)
            e.texParameteri(e.TEXTURE_2D, e["TEXTURE_" + s[t][0]], e[s[t][1]]);
        return i
    }
    loop() {
        this.no !== this.prevNo && (this.prevNo = this.no,
        this.dom.textContent = Math.round(100 / this.texL * this.no) + "%"),
        this.no === this.texL && (this.raf.stop(),
        this.cb())
    }
}
class Renderer {
    constructor(t) {
        this.gl = _A.rgl.gl,
        this.page = t.page,
        this.state = {
            depthTest: null,
            cullFace: null
        },
        this.setBlendFunc();
        var e = this.gl.getExtension("OES_vertex_array_object")
          , i = ["create", "bind"];
        this.vertexArray = {};
        for (let t = 0; t < 2; t++) {
            var s = i[t];
            this.vertexArray[s] = e[s + "VertexArrayOES"].bind(e)
        }
        this.programCurrId = null,
        this.viewport = {
            width: null,
            height: null
        },
        this.camera = new Camera,
        this.texture = new Texture(this.gl),
        this.texture.run(t.cb)
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
    resize() {
        var t = _A
          , e = t.win
          , i = 600 < e.w ? 1.5 : 3
          , e = (this.width = e.w,
        this.height = e.h,
        this.gl.canvas.width = this.width * i,
        this.gl.canvas.height = this.height * i,
        this.camera.resize({
            aspect: this.gl.canvas.width / this.gl.canvas.height
        }),
        t.rgl.clear(),
        this.width * i)
          , t = this.height * i;
        this.resizing = !0,
        this.viewport.width === e && this.viewport.height === t || (this.viewport.width = e,
        this.viewport.height = t,
        this.gl.viewport(0, 0, e, t),
        this.viewMatrix = this.camera.render({
            x: 0,
            y: 0,
            z: 0
        }))
    }
    render(e) {
        var t = _A
          , i = t.route
          , s = i.old.page
          , r = i.new.page
          , a = this.page.includes(r)
          , h = this.page.includes(s);
        let l = this.resizing || t.e.s.rqd;
        this.resizing && (this.resizing = !1),
        (l = l || t.e.load.moving) || h && t.e[s].gl.moving && (l = !0),
        l || a && t.e[r].gl.moving && (l = !0);
        var o = []
          , n = (h ? (a && o.push(i.new.url),
        (t.mutating || t.e[s].gl.moving) && o.push(i.old.url)) : (t.e.load.moving && o.push("load"),
        a && o.push(i.new.url)),
        o.length);
        for (let t = 0; t < n; t++)
            ("/" === o[t] ? (e.large.draw(l),
            e.small) : e[o[t]]).draw(l)
    }
}
let ID = 1;
class Program {
    constructor(t) {
        var e = _A.rgl;
        this.gl = e.gl,
        this.renderer = e.renderer,
        this.uniform = t.uniform || {},
        this.id = ID++,
        this.program = this.crP();
        let i = this.uniform;
        i.g = {
            type: "Matrix4fv"
        },
        i.h = {
            type: "Matrix4fv"
        },
        this.getL(i, "Uniform"),
        e.uProjectionMatrix = t => {
            i.g.value = t
        }
    }
    crP() {
        var t = this.gl
          , e = this.crS("precision highp float;attribute vec2 c;attribute vec2 f;varying vec2 a;uniform vec2 d;uniform vec2 e;uniform mat4 g;uniform mat4 h;void main(){gl_Position=g*h*vec4(c.x,c.y,0,1);a=(f-.5)/d+.5+e;}", t.VERTEX_SHADER)
          , i = this.crS("precision highp float;varying vec2 a;uniform sampler2D b;void main(){gl_FragColor=texture2D(b,a);}", t.FRAGMENT_SHADER)
          , s = t.createProgram();
        return t.attachShader(s, e),
        t.attachShader(s, i),
        t.linkProgram(s),
        t.deleteShader(e),
        t.deleteShader(i),
        s
    }
    crS(t, e) {
        e = this.gl.createShader(e);
        return this.gl.shaderSource(e, t),
        this.gl.compileShader(e),
        e
    }
    getL(t, e) {
        for (var i in t)
            R.Has(t, i) && (t[i].location = this.gl["get" + e + "Location"](this.program, i))
    }
    setUniform() {
        for (var t in this.uniform) {
            var e, i;
            R.Has(this.uniform, t) && (e = (t = this.uniform[t]).location,
            i = "uniform" + t.type,
            "Matrix" === t.type.substring(0, 6) ? this.gl[i](e, !1, t.value) : this.gl[i](e, t.value))
        }
    }
    run() {
        this.renderer.programCurrId !== this.id && (this.gl.useProgram(this.program),
        this.renderer.programCurrId = this.id)
    }
}
class Geo {
    constructor(t) {
        var e = _A.rgl;
        this.gl = e.gl,
        this.renderer = e.renderer,
        this.program = t.program,
        this.mode = t.mode,
        this.face = t.face,
        this.attrib = t.attrib,
        this.renderer.vertexArray.bind(null),
        this.program.getL(this.attrib, "Attrib"),
        this.modelMatrix = create()
    }
    setVAO() {
        var t = this.renderer;
        this.vao = t.vertexArray.create(),
        t.vertexArray.bind(this.vao),
        this.setAttrib(),
        t.vertexArray.bind(null)
    }
    setAttrib() {
        var t, e, i, s, r = this.gl;
        for (t in this.attrib)
            R.Has(this.attrib, t) && (e = this.attrib[t],
            i = "index" === t,
            (s = e.data.constructor) === Float32Array ? e.type = r.FLOAT : s === Uint16Array ? e.type = r.UNSIGNED_SHORT : e.type = r.UNSIGNED_INT,
            e.count = e.data.length / e.size,
            e.target = i ? r.ELEMENT_ARRAY_BUFFER : r.ARRAY_BUFFER,
            e.normalize = !1,
            r.bindBuffer(e.target, r.createBuffer()),
            r.bufferData(e.target, e.data, r.STATIC_DRAW),
            i || (r.enableVertexAttribArray(e.location),
            r.vertexAttribPointer(e.location, e.size, e.type, e.normalize, 0, 0)))
    }
    draw(t) {
        var e = this.gl
          , i = this.renderer
          , s = (i.setFaceCulling(this.face),
        this.program.run(),
        this.modelMatrix = identity(this.modelMatrix),
        i.viewMatrix)
          , s = multiplyFn(this.modelMatrix, s)
          , r = t.lerp
          , a = t.ease
          , h = t.intro
          , l = r.x + h.x
          , o = r.y + a.y + h.y
          , n = r.w + h.w
          , p = r.h + h.h
          , h = r.scale + h.scale + a.scale
          , l = (s = scaleFn(translateFn(s, [l, -o, 0]), [n, p, 1]),
        this.program.uniform);
        let d = 1
          , c = t.media.ratio.wh / (n / p || 1);
        c < 1 && (d = 1 / c,
        c = 1),
        l.d.value = [c * h, d * h],
        l.e.value = [r.pX, (r.pY + a.pY) / d],
        l.h.value = s,
        this.program.setUniform(),
        e.bindTexture(e.TEXTURE_2D, this.attrib.f.tex),
        i.vertexArray.bind(this.vao);
        o = this.attrib.index;
        e.drawElements(e[this.mode], o.count, o.type, 0)
    }
}
function Plane(t) {
    var t = t.p
      , e = {};
    const i = t.pts.h
      , s = t.pts.v
      , r = i - 1
      , a = s - 1
      , h = 1 / r
      , l = 1 / a;
    var o = [];
    let n = 0;
    for (let t = 0; t < s; t++) {
        var p = t * l - 1;
        for (let t = 0; t < i; t++)
            o[n++] = t * h,
            o[n++] = p
    }
    e.pos = o;
    var d = [];
    let c = 0;
    var g = s - 1
      , u = s - 2
      , m = i - 1;
    for (let e = 0; e < g; e++) {
        var v = i * e
          , f = v + i;
        for (let t = 0; t < i; t++) {
            var R = f + t;
            d[c++] = v + t,
            d[c++] = R,
            t === m && e < u && (d[c++] = R,
            d[c++] = i * (e + 1))
        }
    }
    e.index = d;
    var x = [];
    let w = 0;
    for (let t = 0; t < s; t++) {
        var y = 1 - t / a;
        for (let t = 0; t < i; t++)
            x[w++] = t / r,
            x[w++] = y
    }
    return e.texture = x,
    e
}
class PlaneTex {
    constructor(t) {
        var e = t.p
          , i = _A.rgl.renderer.texture.tex[t.url]
          , s = i.length
          , r = (this.planeL = s,
        R.Is.def(t.isHomeLarge) && (this.planeL = this.planeL * this.planeL),
        {
            h: 2,
            v: 2
        })
          , a = (this.lerp = {
            prop: ["x", "y", "w", "h", "scale", "opacity", "pY"],
            r6: ["scale", "opacity", "pY"]
        },
        this.lerp.propL = this.lerp.prop.length,
        {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            opacity: 1,
            scale: 1,
            pY: 0,
            pX: 0
        })
          , h = {
            y: 0,
            pY: 0,
            scale: 0
        }
          , l = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            scale: 0
        };
        R.BM(this, ["unequal"]),
        this.plane = [];
        for (let t = 0; t < this.planeL; t++) {
            var o = i[t % s]
              , n = o.element
              , p = n.width
              , d = n.height
              , n = {
                pts: r,
                zIndex: 0,
                lerp: {
                    ...a
                },
                ease: {
                    ...h
                },
                intro: {
                    ...l
                },
                tex: o,
                media: {
                    obj: n,
                    dimension: {
                        width: p,
                        height: d
                    },
                    ratio: {
                        wh: p / d,
                        hw: d / p
                    }
                },
                out: !1,
                geo: new Geo({
                    program: e,
                    mode: "TRIANGLE_STRIP",
                    face: "FRONT",
                    attrib: {
                        c: {
                            size: 2
                        },
                        index: {
                            size: 1
                        },
                        f: {
                            size: 2,
                            tex: o.attrib
                        }
                    }
                })
            }
              , d = Plane({
                p: n,
                tex: !0
            })
              , p = n.geo.attrib;
            p.c.data = new Float32Array(d.pos),
            p.index.data = new Uint16Array(d.index),
            p.f.data = new Float32Array(d.texture),
            n.geo.setVAO(),
            this.plane[t] = n
        }
    }
    draw(i) {
        var s = _A
          , r = s.win.w
          , a = s.win.h;
        for (let e = 0; e < 2; e++)
            for (let t = 0; t < this.planeL; t++) {
                var h, l, o, n, p, d = this.plane[t];
                d.zIndex === e && (h = d.lerp,
                o = d.ease,
                p = d.intro,
                l = h.x + p.x,
                o = h.y + o.y + p.y,
                n = h.w + p.w,
                p = h.h + p.h,
                l < r && 0 < l + n && o < a && 0 < o + p && (0 < h.opacity && 0 < p && 0 < n) && (i || s.mutating) ? (d.out && (d.out = !1),
                d.geo.draw(d)) : d.out || (d.out = !0,
                d.geo.draw(d)))
            }
    }
    unequal(t) {
        var e = t.prop
          , i = this.lerp.r6.includes(e) ? 6 : 2;
        return 0 !== R.R(Math.abs(t.a[e] - t.b[e]), i)
    }
}
class RGL {
    constructor() {
        var t = R.G.id("gl");
        this.gl = t.getContext("webgl", {
            antialias: !0,
            alpha: !0
        }),
        this._ = {},
        R.BM(this, ["resize", "loop"]),
        this.raf = new R.RafR(this.loop)
    }
    load(t) {
        this.renderer = new Renderer({
            page: ["ho", "wo"],
            cb: t
        }),
        this.program = new Program({
            uniform: {
                d: {
                    type: "2fv",
                    value: [1, 1]
                },
                e: {
                    type: "2fv",
                    value: [0, 0]
                }
            }
        })
    }
    intro() {
        var t = _A.data
          , e = Object.keys(t)
          , i = e.length;
        this._.load = new PlaneTex({
            p: this.program,
            url: "load"
        }),
        this._.large = new PlaneTex({
            p: this.program,
            url: "/",
            isHomeLarge: !0
        }),
        this._.small = new PlaneTex({
            p: this.program,
            url: "/"
        });
        for (let t = 0; t < i; t++) {
            var s = e[t];
            "/" !== s && "load" !== s && (this._[s] = new PlaneTex({
                p: this.program,
                url: s
            }))
        }
    }
    run() {
        new R.ROR(this.resize).on(),
        this.resize(),
        this.raf.run()
    }
    resize() {
        this.renderer.resize()
    }
    loop() {
        this.renderer.render(this._)
    }
    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    }
}
class Intro {
    constructor(t) {
        let e = _A;
        e.introducing = !0,
        R.T(R.G.id("load-no").children[0], 0, 0),
        this.introFx = new Fx$1,
        t(t => {
            e.rgl = new RGL,
            e.rgl.load(t => {
                this.cb()
            }
            )
        }
        )
    }
    cb() {
        var t = _A;
        t.rgl.intro(),
        t.e.intro(),
        t.e.init(),
        t.e.load.intro(),
        t.rgl.run(),
        t.e.run(),
        this.introFx.run()
    }
}
class Fx {
    constructor() {
        this.sail = R.G.id("sail"),
        this.sailFx = new R.M({
            el: this.sail,
            p: {
                opacity: [0, 1]
            }
        })
    }
    fadeOut(t) {
        var e = _A.fromBack;
        this.sailFx.play({
            d: e ? 0 : 400,
            e: "linear",
            cb: t.cb
        })
    }
    fadeIn() {
        var t = _A.fromBack ? 0 : 1e3;
        new Page({
            intro: !1
        }).play(),
        this.sailFx.play({
            reverse: !0,
            d: t,
            e: "o3",
            cb: !1
        })
    }
    tr() {
        new Page({
            intro: !1
        }).play()
    }
}
class Mutation {
    constructor() {
        this.mutationFx = new Fx
    }
    out() {
        let e = _A;
        var t = e.is
          , i = e.was;
        this.hToW = i.ho && t.wo,
        this.wToW = i.wo && t.wo,
        this.hToA = i.ho && t.ab,
        e.e.off(),
        (t.ho || t.ab) && e.e.nav.active.up(),
        this.hToW || this.wToW || this.hToA ? (this.wToW && e.e.wo.fxBack.hide({
            mutation: !0,
            delay: 0
        }).play(),
        e.page.update()) : (i.wo && e.e.wo.fxBack.hide({
            mutation: !0,
            delay: 0
        }).play(),
        this.mutationFx.fadeOut({
            cb: t => {
                e.page.update()
            }
        }))
    }
    in() {
        var t = _A;
        this.hToW || this.wToW || this.hToA ? (t.page.insertNew(),
        t.e.init(),
        this.mutationFx.tr()) : (t.page.removeOld(),
        t.page.insertNew(),
        t.e.init(),
        this.mutationFx.fadeIn())
    }
}
new Controller({
    device: "d",
    engine: E,
    transition: {
        intro: Intro,
        mutation: Mutation
    }
});
