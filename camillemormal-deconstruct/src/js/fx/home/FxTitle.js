import Anima from "../Anima.js";

export default class FxTitle {
    init() {
        this.title = R.G.class("h-title");
        this.fx = [];
        for (let t = 0; t < 8; t++) {
            this.fx[t] = new Anima({
                descendant: 1,
                el: this.title[t],
                prop: [["y", 140, -140]],
            });
        }
    }

    show(e) {
        const t = _A;
        const isIntroLocal = t.config.isLocal && t.introducing;
        const mutation = e.mutation;
        let delay = e.delay;
        let d = 1500;
        if ((mutation && t.fromBack) || isIntroLocal) {
            delay = 0;
            d = 0;
        }

        const anim = this.fx[e.index].motion({
            action: "show",
            d,
            e: "o6",
            delay,
            reverse: false,
        });

        return {
            play: () => {
                R.PE.all(this.title[e.index]);
                anim.play();
            },
        };
    }

    hide(e) {
        const t = _A;
        const mutation = e.mutation;
        let delay = e.delay;
        let d = 500;
        let curve = "o2";
        if (mutation) {
            if (t.fromBack) {
                delay = 0;
                d = 0;
            } else {
                d = 600;
                curve = "i3";
            }
        }

        const anim = this.fx[e.index].motion({
            action: "hide",
            d,
            e: curve,
            delay,
            reverse: false,
        });

        return {
            play: () => {
                R.PE.none(this.title[e.index]);
                anim.play();
            },
        };
    }
}

