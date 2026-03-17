export default class FxFooter {
    init() {
        const t = R.G.class("w-footer-link-title")[0].children[0];
        const e = R.G.class("w-footer-link-tagline")[0].children[0];
        const i = R.G.class("w-footer-exp")[0].children[0];

        this.fx0 = new R.M({ el: i, p: { y: [0, -110] } });
        this.fx1 = new R.M({ el: e, p: { y: [0, -110] } });
        this.fx2 = new R.M({ el: t, p: { y: [0, -110] } });
    }

    hide(t) {
        const e = _A;
        const mutation = t.mutation;

        let d0 = t.delay;
        let d1 = t.delay + 20;
        let d2 = t.delay + 26;
        let dur = 600;

        if (mutation && e.fromBack) {
            d0 = 0;
            d1 = 0;
            d2 = 0;
            dur = 0;
        }

        return {
            play: () => {
                this.fx0.play({ d: dur, e: "i3", delay: d0 });
                this.fx1.play({ d: dur, e: "i3", delay: d1 });
                this.fx2.play({ d: dur, e: "i3", delay: d2 });
            },
        };
    }
}

