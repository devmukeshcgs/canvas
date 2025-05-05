import Anima from "./Anima"
export default class Over {
    constructor() {
        R.BM(this, ["fn"])
    }
    init() {
        this.no = R.G.class("h-title-no"),
        this.fx = [],
        this.visible = [];
        for (let t = 0; t < 8; t++)
            this.fx[t] = new Anima({
                descendant: 1,
                el: this.no[t],
                prop: [["y", 112, -112]]
            }),
            this.visible[t] = !1
    }
    fn(t) {
        var e = "mouseenter" === t.type
          , t = R.Index.class(t.target, "h-title-a")
          , i = e ? "show" : "hide"
          , s = e ? 1200 : 300
          , r = e ? "o6" : "o2";
        this.visible[t] = e,
        this.fx[t].motion({
            action: i,
            d: s,
            e: r,
            delay: 0,
            reverse: !1
        }).play()
    }
    hide(t) {
        var e = _A
          , i = t.index;
        if (!this.visible[i])
            return {
                play: t => {}
            };
        let s = 600;
        t.mutation && e.fromBack && (s = 0);
        let r = this.fx[i].motion({
            action: "hide",
            d: s,
            e: "i3",
            delay: 0,
            reverse: !1
        })
          , a = new R.M({
            el: this.no[i],
            p: {
                y: [0, -300]
            },
            d: s,
            e: "i3"
        });
        return {
            play: t => {
                r.play(),
                a.play()
            }
        }
    }
    on() {
        this.l("a")
    }
    off() {
        this.l("r")
    }
    l(t) {
        R.L(".h-title-a", t, "mouseenter", this.fn),
        R.L(".h-title-a", t, "mouseleave", this.fn)
    }
}