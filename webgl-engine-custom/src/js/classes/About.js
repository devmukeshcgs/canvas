import Fx$2 from "./FxS2"
import SFx from "./SFx"
import Preview from "./Preview"


export default class About {
    constructor() {
        this.fx = new Fx$2,
            this.sFx = new SFx,
            this.preview = new Preview
    }
    init() {
        var t = _A;
        this.notRequired = !t.is.ab,
            this.notRequired || (this.fx.init(),
                this.sFx.init(),
                this.preview.init())
    }
    resize() {
        this.notRequired || (this.sFx.resize(),
            this.preview.resize())
    }
    loop() {
        this.notRequired || (this.sFx.loop(),
            this.preview.loop())
    }
}