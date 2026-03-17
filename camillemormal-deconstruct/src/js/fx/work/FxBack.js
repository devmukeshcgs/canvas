import Anima from "../Anima.js";

export default class FxBack {
    init() {
        const t = R.G.class("w-back");
        this.back = t[t.length - 1];
        this.fx = new Anima({
            descendant: 1,
            el: this.back,
            prop: [["y", 110, -110]],
        });
    }

    show(t) {
        const e = _A;
        const isIntroLocal = e.config.isLocal && e.introducing;
        const mutation = t.mutation;

        let delay = t.delay;
        let d = 1500;
        if ((mutation && e.fromBack) || isIntroLocal) {
            delay = 0;
            d = 0;
        }

        const anim = this.fx.motion({
            action: "show",
            d,
            e: "o6",
            delay,
            reverse: false,
        });

        return {
            play: () => {
                R.PE.all(this.back);
                anim.play();
            },
        };
    }

    hide(t) {
        const e = _A;
        const mutation = t.mutation;

        let delay = t.delay;
        let d = 500;
        if (mutation && e.fromBack) {
            delay = 0;
            d = 0;
        }

        const anim = this.fx.motion({
            action: "hide",
            d,
            e: "o2",
            delay,
            reverse: false,
        });

        return {
            play: () => {
                R.PE.none(this.back);
                anim.play();
            },
        };
    }
}

