import Anima from "../Anima.js";

export default class NavFx {
    intro() {
        const t = R.G.id("nav");
        this.fx = new Anima({
            descendant: 2,
            el: t,
            prop: [["y", 110, -110]],
            delay: 0.05,
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

        return { play: () => anim.play() };
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

        const anim = this.fx.motion({
            action: "hide",
            d,
            e: curve,
            delay,
            reverse: false,
        });

        return { play: () => anim.play() };
    }
}

