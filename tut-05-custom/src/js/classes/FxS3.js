import Anima from "./Anima";

let Fx$3 = class {
    intro() {
        var t = R.G.id("nav");
        this.fx = new Anima({
            descendant: 2,
            el: t,
            prop: [["y", 110, -110]],
            delay: .05
        })
    }
    show(t) {
        var e = _A
          , i = e.config.isLocal && e.introducing
          , s = t.mutation;
        let r = t.delay
          , a = 1500;
        (s && e.fromBack || i) && (r = 0,
        a = 0);
        let h = this.fx.motion({
            action: "show",
            d: a,
            e: "o6",
            delay: r,
            reverse: !1
        });
        return {
            play: t => {
                h.play()
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
        this.fx.motion({
            action: "hide",
            d: r,
            e: a,
            delay: s,
            reverse: !1
        }));
        return {
            play: t => {
                h.play()
            }
        }
    }
}
export default Fx$3;