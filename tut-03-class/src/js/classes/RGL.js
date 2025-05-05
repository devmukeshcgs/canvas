import Renderer from "./Renderer"
import Program from "./Program"
import PlaneTex from "./PlaneTex" 

export default class RGL {
    constructor() {
        var t = R.G.id("gl");
        this.gl = t.getContext("webgl", {
            antialias: !0,
            alpha: !0
        }),
        this._ = {},
        R.BM(this, ["resize", "loop"]),
        this.raf = new R.RafR(this.loop)
    }
    load(t) {
        this.renderer = new Renderer({
            page: ["ho", "wo"],
            cb: t
        }),
        this.program = new Program({
            uniform: {
                d: {
                    type: "2fv",
                    value: [1, 1]
                },
                e: {
                    type: "2fv",
                    value: [0, 0]
                }
            }
        })
    }
    intro() {
        var t = _A.data
          , e = Object.keys(t)
          , i = e.length;
        this._.load = new PlaneTex({
            p: this.program,
            url: "load"
        }),
        this._.large = new PlaneTex({
            p: this.program,
            url: "/",
            isHomeLarge: !0
        }),
        this._.small = new PlaneTex({
            p: this.program,
            url: "/"
        });
        for (let t = 0; t < i; t++) {
            var s = e[t];
            "/" !== s && "load" !== s && (this._[s] = new PlaneTex({
                p: this.program,
                url: s
            }))
        }
    }
    run() {
        new R.ROR(this.resize).on(),
        this.resize(),
        this.raf.run()
    }
    resize() {
        this.renderer.resize()
    }
    loop() {
        this.renderer.render(this._)
    }
    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    }
}