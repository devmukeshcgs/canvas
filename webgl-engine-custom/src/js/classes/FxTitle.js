import Anima from "./Anima"

export default class FxTitle {
    init() {
        this.title = R.G.class("h-title"),
            this.fx = [];
        for (let t = 0; t < 8; t++)
            this.fx[t] = new Anima({
                descendant: 1,
                el: this.title[t],
                prop: [["y", 140, -140]]
            })
    }
    show(e) {
        var t = _A
            , i = t.config.isLocal && t.introducing
            , s = e.mutation;
        let r = e.delay
            , a = 1500;
        (s && t.fromBack || i) && (r = 0,
            a = 0);
        let h = this.fx[e.index].motion({
            action: "show",
            d: a,
            e: "o6",
            delay: r,
            reverse: !1
        });
        return {
            play: t => {
                R.PE.all(this.title[e.index]),
                    h.play()
            }
        }
    }
    hide(e) {
        var t = _A
            , i = e.mutation;
        let s = e.delay
            , r = 500
            , a = "o2"
            , h = (i && (t.fromBack ? (s = 0,
                r = 0) : (r = 600,
                    a = "i3")),
                this.fx[e.index].motion({
                    action: "hide",
                    d: r,
                    e: a,
                    delay: s,
                    reverse: !1
                }));
        return {
            play: t => {
                R.PE.none(this.title[e.index]),
                    h.play()
            }
        }
    }
}