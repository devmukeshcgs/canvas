class RGL {
    constructor() {
        const canvasElement = R.G.id("gl");
        this.gl = canvasElement.getContext("webgl", { antialias: true, alpha: true });

        this._ = {}; // Stores different PlaneTex instances
        R.BM(this, ["resize", "loop"]);

        this.raf = new R.RafR(this.loop);
    }

    /**
     * Initializes the renderer and program.
     * @param {Function} callback - Callback to execute after initialization.
     */
    load(callback) {
        this.renderer = new Renderer({
            page: ["ho", "wo"], // Example keys for setup
            cb: callback,
        });

        this.program = new Program({
            uniform: {
                d: { type: "2fv", value: [1, 1] }, // Uniform for scaling
                e: { type: "2fv", value: [0, 0] }, // Uniform for offset
            },
        });
    }

    /**
     * Initializes the planes for rendering based on application data.
     */
    intro() {
        const appData = _A.data;
        const dataKeys = Object.keys(appData);

        this._.load = new PlaneTex({
            p: this.program,
            url: "load",
        });

        this._.large = new PlaneTex({
            p: this.program,
            url: "/",
            isHomeLarge: true,
        });

        this._.small = new PlaneTex({
            p: this.program,
            url: "/",
        });

        for (const key of dataKeys) {
            if (key !== "/" && key !== "load") {
                this._[key] = new PlaneTex({
                    p: this.program,
                    url: key,
                });
            }
        }
    }

    /**
     * Starts the rendering loop and sets up resize handling.
     */
    run() {
        new R.ROR(this.resize).on(); // Listen for resize events
        this.resize();
        this.raf.run();
    }

    /**
     * Resizes the renderer viewport.
     */
    resize() {
        this.renderer.resize();
    }

    /**
     * Main rendering loop.
     */
    loop() {
        this.renderer.render(this._); // Render all stored planes
    }

    /**
     * Clears the WebGL buffer.
     */
    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
}

export default RGL;
