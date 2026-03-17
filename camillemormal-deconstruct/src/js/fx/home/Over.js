import Anima from "../Anima.js";

export default class Over {
    constructor() {
        R.BM(this, ["fn"]);
    }

    init() {
        this.no = R.G.class("h-title-no");
        this.fx = [];
        this.visible = [];
        for (let t = 0; t < 8; t++) {
            this.fx[t] = new Anima({
                descendant: 1,
                el: this.no[t],
                prop: [["y", 112, -112]],
            });
            this.visible[t] = false;
        }
    }

    fn(t) {
        const isEnter = t.type === "mouseenter";
        const idx = R.Index.class(t.target, "h-title-a");
        const action = isEnter ? "show" : "hide";
        const d = isEnter ? 1200 : 300;
        const curve = isEnter ? "o6" : "o2";
        this.visible[idx] = isEnter;
        this.fx[idx]
            .motion({
                action,
                d,
                e: curve,
                delay: 0,
                reverse: false,
            })
            .play();
    }

    hide(t) {
        const e = _A;
        const i = t.index;
        if (!this.visible[i]) return { play: () => {} };

        let d = 600;
        if (t.mutation && e.fromBack) d = 0;

        const r = this.fx[i].motion({
            action: "hide",
            d,
            e: "i3",
            delay: 0,
            reverse: false,
        });
        const a = new R.M({
            el: this.no[i],
            p: { y: [0, -300] },
            d,
            e: "i3",
        });

        return {
            play: () => {
                r.play();
                a.play();
            },
        };
    }

    on() {
        this.l("a");
    }

    off() {
        this.l("r");
    }

    l(t) {
        R.L(".h-title-a", t, "mouseenter", this.fn);
        R.L(".h-title-a", t, "mouseleave", this.fn);
    }
}

