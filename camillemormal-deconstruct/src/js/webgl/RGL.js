import Renderer from "./Renderer.js";
import Program from "./Program.js";
import PlaneTex from "./PlaneTex.js";

export default class RGL {
    constructor() {
        const canvas = R.G.id("gl");
        this.gl = canvas.getContext("webgl", { antialias: true, alpha: true });
        this._ = {};

        R.BM(this, ["resize", "loop"]);
        this.raf = new R.RafR(this.loop);
    }

    load(cb) {
        this.renderer = new Renderer({ page: ["ho", "wo"], cb });
        this.program = new Program({
            uniform: {
                d: { type: "2fv", value: [1, 1] },
                e: { type: "2fv", value: [0, 0] },
            },
        });
    }

    intro() {
        const data = _A.data;
        const keys = Object.keys(data);
        const l = keys.length;

        this._.load = new PlaneTex({ p: this.program, url: "load" });
        this._.large = new PlaneTex({ p: this.program, url: "/", isHomeLarge: true });
        this._.small = new PlaneTex({ p: this.program, url: "/" });

        for (let i = 0; i < l; i++) {
            const k = keys[i];
            if (k !== "/" && k !== "load") {
                this._[k] = new PlaneTex({ p: this.program, url: k });
            }
        }
    }

    run() {
        new R.ROR(this.resize).on();
        this.resize();
        this.raf.run();
    }

    resize() {
        this.renderer.resize();
    }

    loop() {
        this.renderer.render(this._);
    }

    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
}

