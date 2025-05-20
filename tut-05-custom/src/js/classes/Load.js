export default class Load {
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
            this.isHome && (s = t.engine.ho.gl.data.in.small,
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