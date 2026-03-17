import Page from "../engine/Page.js";

export default class IntroFx {
    constructor() {
        this.no = R.G.id("load-no").children[0],
        this.bg = R.G.id("load-bg")
    }
    run() {
        let t = 1e3;
        _A.config.isLocal && (t = 0);
        var e = new Page({
            intro: !0
        })
          , i = new R.TL;
        i.from({
            el: this.no,
            p: {
                y: [0, -110]
            },
            d: t,
            e: "i4"
        }),
        e.play(),
        i.play(),
        R.O(this.bg, 0)
    }
}

