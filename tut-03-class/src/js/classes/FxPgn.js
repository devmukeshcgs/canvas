import Anima from "./Anima"

export default class FxPgn {
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