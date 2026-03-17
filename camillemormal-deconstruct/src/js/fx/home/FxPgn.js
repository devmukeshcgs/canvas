import Anima from "../Anima.js";

export default class FxPgn {
    init() {
        this.left = new Anima({
            descendant: 0,
            el: R.G.id("h-pgn-left-w"),
            prop: [["x", -110, -110]],
            delay: 0,
        });
        this.right = new Anima({
            descendant: 0,
            el: R.G.id("h-pgn-right"),
            prop: [["x", 110, 110]],
            delay: 0,
        });
        this.scale = new R.M({
            el: "#h-pgn-middle",
            p: { scaleX: [0, 1] },
            r: 6,
        });
    }

    show(t) {
        const e = _A;
        const mutation = t.mutation;
        const isIntroLocal = e.config.isLocal && e.introducing;
        let delay = t.delay;
        let d = 1500;

        if ((mutation && e.fromBack) || isIntroLocal) {
            delay = 0;
            d = 0;
        }

        const l = this.left.motion({
            action: "show",
            d,
            e: "o6",
            delay,
            reverse: false,
        });
        const r = this.right.motion({
            action: "show",
            d,
            e: "o6",
            delay,
            reverse: false,
        });

        return {
            play: () => {
                this.scale.play({ d, e: "o6", delay });
                l.play();
                r.play();
            },
        };
    }

    hide(t) {
        const e = _A;
        const mutation = t.mutation;
        let delay = t.delay;
        let d = 500;
        let curve = "o2";

        if (mutation) {
            if (e.fromBack) {
                delay = 0;
                d = 0;
            } else {
                d = 600;
                curve = "i3";
            }
        }

        const l = this.left.motion({
            action: "hide",
            d,
            e: curve,
            delay,
            reverse: false,
        });
        const r = this.right.motion({
            action: "hide",
            d,
            e: curve,
            delay,
            reverse: false,
        });

        return {
            play: () => {
                this.scale.play({ d, e: curve, delay, reverse: true });
                l.play();
                r.play();
            },
        };
    }
}

