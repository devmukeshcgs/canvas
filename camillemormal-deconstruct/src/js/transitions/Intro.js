import RGL from "../webgl/RGL.js";
import IntroFx from "./IntroFx.js";

export default class Intro {
    constructor(t) {
        let e = _A;
        e.introducing = !0,
        R.T(R.G.id("load-no").children[0], 0, 0),
        this.introFx = new IntroFx,
        t(t => {
            e.rgl = new RGL,
            e.rgl.load(t => {
                this.cb()
            }
            )
        }
        )
    }
    cb() {
        var t = _A;
        t.rgl.intro(),
        t.e.intro(),
        t.e.init(),
        t.e.load.intro(),
        t.rgl.run(),
        t.e.run(),
        this.introFx.run()
    }
}

