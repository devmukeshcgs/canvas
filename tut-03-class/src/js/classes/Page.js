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
export default Page