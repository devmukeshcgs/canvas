import FxTitle from "../fx/home/FxTitle.js";
import FxCross from "../fx/home/FxCross.js";
import FxPgn from "../fx/home/FxPgn.js";
import Over from "../fx/home/Over.js";
import GL from "./home/GL.js";

export default class Home {
    constructor() {
        this.gl = new GL,
        this.fxTitle = new FxTitle,
        this.fxCross = new FxCross,
        this.fxPgn = new FxPgn,
        this.over = new Over
    }
    initB() {
        this.notRequired = !_A.is.ho,
        this.notRequired || this.gl.initB()
    }
    initA() {
        this.notRequired || (this.gl.initA(),
        this.fxTitle.init(),
        this.fxCross.init(),
        this.fxPgn.init(),
        this.over.init())
    }
    resizeB() {
        this.notRequired || this.gl.resizeB()
    }
    resizeA() {
        this.notRequired || this.gl.resizeA()
    }
    loop() {
        this.notRequired && !this.gl.moving || this.gl.loop()
    }
    on() {
        this.over.on()
    }
    off() {
        this.over.off()
    }
}

