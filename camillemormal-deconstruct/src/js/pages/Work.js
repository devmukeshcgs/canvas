import FxHero from "../fx/work/FxHero.js";
import FxFooter from "../fx/work/FxFooter.js";
import FxBack from "../fx/work/FxBack.js";
import Preview from "./work/Preview.js";
import GL from "./work/GL.js";

export default class Work {
    constructor() {
        this.gl = new GL,
        this.fxHero = new FxHero,
        this.fxFooter = new FxFooter,
        this.fxBack = new FxBack,
        this.preview = new Preview
    }
    initB() {
        this.notRequired = !_A.is.wo,
        this.notRequired || this.gl.initB()
    }
    initA() {
        this.notRequired || (this.gl.initA(),
        this.fxHero.init(),
        this.fxFooter.init(),
        this.fxBack.init(),
        this.preview.init())
    }
    resizeA() {
        this.notRequired || (this.gl.resizeA(),
        this.preview.resizeA(),
        this.fxHero.resizeA())
    }
    loop() {
        this.notRequired && !this.gl.moving || (this.gl.loop(),
        this.preview.loop())
    }
}

