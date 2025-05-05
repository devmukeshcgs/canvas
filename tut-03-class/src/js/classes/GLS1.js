import GLData from "./GLData"
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
        t.engine.ho.fxTitle.hide({
            index: s,
            delay: 0
        }))
          , v = t.engine.ho.fxTitle.show({
            index: r,
            delay: 300
        });
        this._pgn.targ = r * this.pgnH,
        R.Is.def(t.engine.load.introFx) && (t.engine.load.introFx.pause(),
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
          , t = e.engine.ho.fxTitle[t]({
            index: i,
            delay: s ? 240 : 0
        })
          , r = s ? 500 : 0
          , a = s ? "show" : "hide"
          , h = e.engine.ho.fxCross.middle({
            a: s ? "hide" : "show",
            delay: s ? 0 : 300
        })
          , a = e.engine.ho.fxCross.side({
            a: a,
            delay: r
        });
        this.zIndex();
        let l;
        s ? (l = -R.R(e.engine.scroll._[this.url].curr),
        e.engine.scroll.sUpAll(0)) : (l = R.Clamp(this.outGapXW * i, 0, this.data.out.max),
        e.engine.scroll.sUpAll(l));
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
        var _STATE = _A
          , e = "out" === _STATE.mode
          , i = _STATE.lerpP
          , s = _STATE.engine.scroll._[this.url].curr;
        e && (_STATE = Math.floor(s / (this.data.out.w + this.data.out.gap.x) + .5),
        this._pgn.targ = _STATE * this.pgnH),
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
          , o = (l || (e.index = Math.floor(e.engine.scroll._[this.url].curr / (this.data.out.w + this.data.out.gap.x) + .5)),
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

export default GL$1