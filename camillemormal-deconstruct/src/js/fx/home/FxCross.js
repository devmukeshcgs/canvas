export default class FxCross {
    init() {
        this.svg = R.G.id("h-cross").children;
        this.coord = {
            hide: [
                "11,11.75 11,11.75 11,10.249 11,10.249 11,11",
                "11.75,11 11.75,11 10.249,11 10.249,11 11,10.999",
            ],
            show: [
                "22,11.751 0,11.751 0,10.249 22,10.249 22,11",
                "11.751,0 11.751,22 10.249,22 10.249,0 11,0",
            ],
        };
        this.morph = [];
        for (let t = 0; t < 3; t++) this.morph[t] = [];
    }

    middle(e) {
        const t = _A;
        const isShow = e.a === "show";
        const isIntroLocal = t.config.isLocal && t.introducing;
        let delay = e.delay;
        let d = isShow ? 1200 : 250;
        let curve = isShow ? "o6" : "o2";
        if ((e.mutation && t.fromBack) || isIntroLocal) {
            delay = 0;
            d = 0;
        }

        for (let i = 0; i < 2; i++) {
            if (R.Is.def(this.morph[2][i])) this.morph[2][i].pause();
            this.morph[2][i] = new R.M({
                el: this.svg[2].children[0].children[i],
                svg: {
                    type: "polygon",
                    end: this.coord[e.a][i],
                },
                d,
                e: curve,
                delay,
                r: 6,
            });
        }

        return {
            play: () => {
                for (let i = 0; i < 2; i++) this.morph[2][i].play();
            },
        };
    }

    side(i) {
        const t = _A;
        const isShow = i.a === "show";
        const isIntroLocal = t.config.isLocal && t.introducing;
        let delay = i.delay;
        let d = isShow ? 1200 : 250;
        let curve = isShow ? "o6" : "o2";
        if ((i.mutation && t.fromBack) || isIntroLocal) {
            delay = 0;
            d = 0;
        }

        for (let e = 0; e < 2; e++) {
            for (let t2 = 0; t2 < 2; t2++) {
                if (R.Is.def(this.morph[e][t2])) this.morph[e][t2].pause();
                this.morph[e][t2] = new R.M({
                    el: this.svg[e].children[0].children[t2],
                    svg: {
                        type: "polygon",
                        end: this.coord[i.a][t2],
                    },
                    d,
                    e: curve,
                    delay,
                    r: 6,
                });
            }
        }

        return {
            play: () => {
                for (let e = 0; e < 2; e++)
                    for (let t2 = 0; t2 < 2; t2++) this.morph[e][t2].play();
            },
        };
    }
}

