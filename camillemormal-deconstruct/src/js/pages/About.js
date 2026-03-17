import SLine from "../fx/work/SLine.js";

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

export default class About {
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

