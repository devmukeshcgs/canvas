export default class Page {
    constructor(e) {
        const s = _A;
        const r = s.e;
        const i = s.config.isLocal;
        const intro = e.intro;
        const fromBack = s.fromBack;

        const isHo = s.is.ho;
        const isWo = s.is.wo;
        const isAb = s.is.ab;
        const wasHo = s.was.ho;
        const wasWo = s.was.wo;

        const p = [];

        if (intro) {
            if (isHo) {
                let delay = 3200;
                const t = i ? 0 : 4000;
                p.push(r.load.fx({ delay: 0 }));
                p.push(r.ho.fxTitle.show({ index: s.index, delay }));
                p.push(r.ho.fxCross.side({ a: "show", delay: 3500 }));
                p.push(r.ho.fxPgn.show({ mutation: false, delay: 3800 }));
                p.push(r.nav.fx.show({ mutation: false, delay: 3800 }));
                new R.Delay(() => {
                    r.on();
                    R.PE.none(R.G.id("load"));
                    s.mutating = false;
                    s.introducing = false;
                }, t).run();
            } else if (isWo) {
                const t = i ? 0 : 4000;
                p.push(r.load.fx({ delay: 0 }));
                p.push(r.wo.fxHero.show({ delay: 3400 }));
                p.push(r.wo.fxBack.show({ delay: 3800 }));
                new R.Delay(() => {
                    r.on();
                    s.mutating = false;
                    s.introducing = false;
                    R.PE.none(R.G.id("load"));
                }, t).run();
            } else if (isAb) {
                const t = i ? 0 : 1200;
                p.push(r.ab.fx.show({ mutation: false, delay: 1000 }));
                p.push(r.nav.fx.show({ mutation: false, delay: 1000 }));
                new R.Delay(() => {
                    r.on();
                    s.mutating = false;
                    s.introducing = false;
                    R.PE.none(R.G.id("load"));
                }, t).run();
            }
        } else if (isHo) {
            let t = 200;
            let e2 = 300;
            if (fromBack) {
                t = 1;
                e2 = 1;
            }
            if (wasWo) {
                p.push(r.wo.gl.hide());
                p.push(r.nav.fx.show({ mutation: true, delay: 0 }));
            }
            p.push(r.ho.gl.show());
            if (s.mode === "out") {
                p.push(r.ho.fxCross.middle({ mutation: true, a: "show", delay: t }));
            } else {
                p.push(r.ho.fxTitle.show({ mutation: true, index: s.index, delay: 0 }));
                p.push(r.ho.fxCross.side({ mutation: true, a: "show", delay: t }));
            }
            p.push(r.ho.fxPgn.show({ mutation: true, delay: 0 }));
            new R.Delay(() => {
                r.on();
                s.mutating = false;
            }, e2).run();
        } else if (isWo) {
            let t = 200;
            let e2 = 300;
            if (fromBack) {
                t = 1;
                e2 = 1;
            }
            if (wasHo) {
                p.push(r.ho.fxTitle.hide({ mutation: true, index: s.index, delay: 0 }));
                p.push(r.ho.fxCross.side({ mutation: true, a: "hide", delay: 0 }));
                p.push(r.ho.fxPgn.hide({ mutation: true, delay: 0 }));
            } else if (wasWo) {
                p.push(r.wo.fxFooter.hide({ mutation: true, delay: 0 }));
            }
            p.push(r.wo.gl.show());
            p.push(r.wo.fxHero.show({ mutation: true, delay: 0 }));
            p.push(r.wo.fxBack.show({ mutation: true, delay: t }));
            new R.Delay(() => {
                r.on();
                s.mutating = false;
            }, e2).run();
        } else if (isAb) {
            let t = 200;
            let e2 = 300;
            if (fromBack) {
                t = 1;
                e2 = 1;
            }
            if (wasHo) {
                p.push(r.ho.fxTitle.hide({ mutation: true, index: s.index, delay: 0 }));
                p.push(r.ho.fxCross.side({ mutation: true, a: "hide", delay: 0 }));
                p.push(r.ho.fxPgn.hide({ mutation: true, delay: 0 }));
            } else if (wasWo) {
                p.push(r.wo.fxHero.hide({ mutation: true, delay: 0 }));
                p.push(r.wo.fxFooter.hide({ mutation: true, delay: 0 }));
                p.push(r.wo.fxBack.hide({ mutation: true, delay: 0 }));
                p.push(r.wo.gl.hide());
            }
            p.push(r.ab.fx.show({ mutation: true, delay: 0 }));
            p.push(r.nav.fx.show({ mutation: true, delay: t }));
            new R.Delay(() => {
                r.on();
                s.mutating = false;
            }, e2).run();
        }

        return {
            play: () => {
                for (let i = 0; i < p.length; i++) p[i].play();
            },
        };
    }
}

