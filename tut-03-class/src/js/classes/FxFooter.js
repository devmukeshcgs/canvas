 
export default class FxFooter {
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
};
