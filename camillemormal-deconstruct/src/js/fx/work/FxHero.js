import SLine from "./SLine.js";

export default class FxHero {
    init() {
        let t = R.G.class("page");
        t = t[t.length - 1];
        this.h1 = R.G.class("w-hero-txt-h1", t);
        this.h1L = this.h1.length;
        this.pgnLeft = R.G.class("w-hero-pgn-left", t)[0];
        this.pgnMiddle = R.G.class("w-hero-pgn-middle", t)[0];
        this.pgnRight = R.G.class("w-hero-pgn-right", t)[0];
        this.roleTitle = R.G.class("w-hero-txt-role-title", t)[0].children[0];
        this.roleP = new SLine({ el: R.G.class("w-hero-txt-role-p", t)[0] });
        this.team = R.G.class("w-hero-txt-team", t);
        this.teamL = this.team.length;
        this.scroll = R.G.class("w-hero-txt-scroll", t)[0].children[0];
        this.arrow = R.G.class("w-hero-txt-icon-arrow", t)[0];
        this.border = R.G.class("w-hero-txt-icon-border-path", t)[0];
        this.visible = false;
        this.resizeA();
    }

    resizeA() {
        const t = this.visible ? 0 : 110;
        this.roleP.resize({
            tag: {
                start:
                    '<span class="w-hero-txt-role-p-fx"><span style="transform: translate3d(0,' +
                    t +
                    '%,0);">',
                end: "</span></span>",
            },
        });
        this.pFx = R.G.class("w-hero-txt-role-p-fx", this.roleP.el);
        this.pFxL = this.pFx.length;
    }

    show(t) {
        const e = _A;
        const isIntroLocal = e.config.isLocal && e.introducing;
        const mutation = t.mutation;
        let delay = t.delay;
        let gap = 70;
        let d = 1500;
        let lineD = 1600;
        const curve = "o6";

        if ((mutation && e.fromBack) || isIntroLocal) {
            delay = 0;
            gap = 0;
            d = 0;
            lineD = 1;
        }

        const n = new R.TL();
        for (let i = 0; i < this.h1L; i++) {
            const p = i === 0 ? delay : gap;
            n.from({
                el: this.h1[i],
                p: { y: [110, 0] },
                d,
                e: curve,
                delay: p,
            });
        }

        n.from({
            el: this.roleTitle,
            p: { y: [110, 0] },
            d,
            e: curve,
            delay: gap,
        });

        for (let i = 0; i < this.pFxL; i++) {
            n.from({
                el: this.pFx[i].children[0],
                p: { y: [110, 0] },
                d,
                e: curve,
                delay: gap,
            });
        }

        for (let i = 0; i < this.teamL; i++) {
            n.from({
                el: this.team[i],
                p: { y: [110, 0] },
                d,
                e: curve,
                delay: gap,
            });
        }

        n.from({
            el: this.scroll,
            p: { y: [110, 0] },
            d,
            e: curve,
        });

        n.from({
            el: this.arrow,
            p: { opacity: [0, 1] },
            d,
            e: "o1",
        });

        n.from({
            el: this.arrow,
            p: { y: [-14, 0, "px"] },
            d,
            e: curve,
        });

        const tl = new R.TL();
        const c = (tl.from({
            el: this.pgnLeft,
            p: { x: [-110, 0] },
            d,
            e: curve,
            delay: delay + 2 * gap,
        }),
        tl.from({
            el: this.pgnMiddle,
            p: { scaleX: [0, 1] },
            d,
            e: curve,
            r: 6,
        }),
        tl.from({
            el: this.pgnRight,
            p: { x: [110, 0] },
            d,
            e: curve,
        }),
        new R.M({
            el: this.border,
            line: { start: 0, end: 100 },
            d: lineD,
            e: "io5",
            delay,
        }));

        return {
            play: () => {
                this.visible = true;
                n.play();
                tl.play();
                c.play();
            },
        };
    }

    hide(t) {
        const e = _A;
        if (!this.visible) return { play: () => {} };

        const mutation = t.mutation;
        let delay = t.delay ?? 0;
        let d = 600;
        let curve = "i3";

        if (mutation && e.fromBack) {
            delay = 0;
            d = 0;
        }

        const tl = new R.TL();

        for (let i = 0; i < this.h1L; i++) {
            tl.from({
                el: this.h1[i],
                p: { y: [0, 110] },
                d,
                e: curve,
                delay: i === 0 ? delay : 20,
            });
        }

        tl.from({ el: this.roleTitle, p: { y: [0, 110] }, d, e: curve, delay: 20 });

        for (let i = 0; i < this.pFxL; i++) {
            tl.from({ el: this.pFx[i].children[0], p: { y: [0, 110] }, d, e: curve, delay: 10 });
        }

        for (let i = 0; i < this.teamL; i++) {
            tl.from({ el: this.team[i], p: { y: [0, 110] }, d, e: curve, delay: 10 });
        }

        tl.from({ el: this.scroll, p: { y: [0, 110] }, d, e: curve, delay: 10 });

        const arrowFade = new R.M({ el: this.arrow, p: { opacity: [1, 0] }, d, e: "o1", delay });

        return {
            play: () => {
                this.visible = false;
                tl.play();
                arrowFade.play();
            },
        };
    }
}

