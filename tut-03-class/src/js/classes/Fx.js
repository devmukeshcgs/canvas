import Page from "./Page";

class Fx {
    constructor() {
        this.sail = R.G.id("sail"),
        this.sailFx = new R.M({
            el: this.sail,
            p: {
                opacity: [0, 1]
            }
        })
    }
    fadeOut(t) {
        var e = _A.fromBack;
        this.sailFx.play({
            d: e ? 0 : 400,
            e: "linear",
            cb: t.cb
        })
    }
    fadeIn() {
        var t = _A.fromBack ? 0 : 1e3;
        new Page({
            intro: !1
        }).play(),
        this.sailFx.play({
            reverse: !0,
            d: t,
            e: "o3",
            cb: !1
        })
    }
    tr() {
        new Page({
            intro: !1
        }).play()
    }
}
export default Fx