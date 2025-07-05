import SLine from "./SLine"
export default class FxHero {
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