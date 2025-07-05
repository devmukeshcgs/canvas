export default class GL {
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
          , e = t.engine.scroll._[this.url].step
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
          , e = t.engine.scroll._[this.url]
          , i = t.win.h;
        R.T(this.progress, 0, R.R(R.Lerp(-100, 0, e.curr / t.engine.scroll.max))),
        this.tex[0].lerp.pY = R.Lerp(0, -.3, R.Clamp(e.step, 0, i) / i)
    }
    texSet() {
        var t = _A.engine.scroll._[this.url]
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