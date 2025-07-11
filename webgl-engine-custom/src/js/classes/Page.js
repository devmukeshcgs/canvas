class Page {
    constructor(e) {
        let appState = _A
          , engine = appState.engine;
        var i = appState.config.isLocal
          , e = e.intro
          , a = appState.fromBack
          , t = appState.is.ho
          , h = appState.is.wo
          , l = appState.is.ab
          , o = appState.was.ho
          , n = appState.was.wo;
        let p = [];
        if (e) {
            if (t) {
                e = 3200;
                let t = i ? 0 : 4e3;
                p.push(engine.load.fx({
                    delay: 0
                })),
                p.push(engine.ho.fxTitle.show({
                    index: appState.index,
                    delay: e
                })),
                p.push(engine.ho.fxCross.side({
                    a: "show",
                    delay: 3500
                })),
                p.push(engine.ho.fxPgn.show({
                    mutation: !1,
                    delay: 3800
                })),
                p.push(engine.nav.fx.show({
                    mutation: !1,
                    delay: 3800
                })),
                new R.Delay(t => {
                    engine.on(),
                    R.PE.none(R.G.id("load")),
                    appState.mutating = !1,
                    appState.introducing = !1
                }
                ,t).run()
            } else if (h) {
                let t = i ? 0 : 4e3;
                p.push(engine.load.fx({
                    delay: 0
                })),
                p.push(engine.wo.fxHero.show({
                    delay: 3400
                })),
                p.push(engine.wo.fxBack.show({
                    delay: 3800
                })),
                new R.Delay(t => {
                    engine.on(),
                    appState.mutating = !1,
                    appState.introducing = !1,
                    R.PE.none(R.G.id("load"))
                }
                ,t).run()
            } else if (l) {
                let t = i ? 0 : 1200;
                p.push(engine.ab.fx.show({
                    mutation: !1,
                    delay: 1e3
                })),
                p.push(engine.nav.fx.show({
                    mutation: !1,
                    delay: 1e3
                })),
                new R.Delay(t => {
                    engine.on(),
                    appState.mutating = !1,
                    appState.introducing = !1,
                    R.PE.none(R.G.id("load"))
                }
                ,t).run()
            }
        } else if (t) {
            let t = 200
              , e = 300;
            a && (t = 1,
            e = 1),
            n && (p.push(engine.wo.gl.hide()),
            p.push(engine.nav.fx.show({
                mutation: !0,
                delay: 0
            }))),
            p.push(engine.ho.gl.show()),
            "out" === appState.mode ? p.push(engine.ho.fxCross.middle({
                mutation: !0,
                a: "show",
                delay: t
            })) : (p.push(engine.ho.fxTitle.show({
                mutation: !0,
                index: appState.index,
                delay: 0
            })),
            p.push(engine.ho.fxCross.side({
                mutation: !0,
                a: "show",
                delay: t
            }))),
            p.push(engine.ho.fxPgn.show({
                mutation: !0,
                delay: 0
            })),
            new R.Delay(t => {
                engine.on(),
                appState.mutating = !1
            }
            ,e).run()
        } else if (h) {
            let t = 800
              , e = t + 300
              , i = 1300;
            a && (t = 1,
            e = 1,
            i = 1),
            o ? (p.push(engine.nav.fx.hide({
                mutation: !0,
                delay: 0
            })),
            p.push(engine.ho.fxCross.side({
                mutation: !0,
                a: "hide",
                delay: 0
            })),
            p.push(engine.ho.fxTitle.hide({
                mutation: !0,
                index: appState.index,
                delay: 0
            })),
            p.push(engine.ho.over.hide({
                mutation: !0,
                index: appState.index
            })),
            p.push(engine.ho.fxPgn.hide({
                mutation: !0,
                delay: 0
            })),
            p.push(engine.ho.gl.hide()),
            p.push(engine.wo.gl.showFromHome())) : n && (p.push(engine.wo.fxFooter.hide({
                mutation: !0,
                delay: 0
            })),
            p.push(engine.wo.gl.showFromWork())),
            p.push(engine.wo.fxHero.show({
                mutation: !0,
                delay: t
            })),
            p.push(engine.wo.fxBack.show({
                mutation: !0,
                delay: e
            })),
            new R.Delay(t => {
                appState.page.removeOld(),
                engine.on(),
                appState.mutating = !1
            }
            ,i).run()
        } else if (o && l) {
            let t = 800
              , e = 1300;
            a && (t = 1,
            e = 1),
            "out" === appState.mode ? p.push(engine.ho.fxCross.middle({
                mutation: !0,
                a: "hide",
                delay: 0
            })) : (p.push(engine.ho.fxCross.side({
                mutation: !0,
                a: "hide",
                delay: 0
            })),
            p.push(engine.ho.fxTitle.hide({
                mutation: !0,
                index: appState.index,
                delay: 0
            }))),
            p.push(engine.ho.fxPgn.hide({
                mutation: !0,
                delay: 0
            })),
            p.push(engine.ho.gl.hide()),
            p.push(engine.ab.fx.show({
                mutation: !0,
                delay: t
            })),
            new R.Delay(t => {
                appState.page.removeOld(),
                engine.on(),
                appState.mutating = !1
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