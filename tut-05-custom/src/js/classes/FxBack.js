import Anima from "./Anima"

export default class FxBack {
    init() {
        var t = R.G.class("w-back");
        this.back = t[t.length - 1],
            this.fx = new Anima({
                descendant: 1,
                el: this.back,
                prop: [["y", 110, -110]]
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
                R.PE.all(this.back),
                    h.play()
            }
        }
    }
    hide(t) {
        var e = _A
            , i = t.mutation;
        let s = t.delay
            , r = 500;
        i && e.fromBack && (s = 0,
            r = 0);
        let a = this.fx.motion({
            action: "hide",
            d: r,
            e: "o2",
            delay: s,
            reverse: !1
        });
        return {
            play: t => {
                R.PE.none(this.back),
                    a.play()
            }
        }
    }
};
