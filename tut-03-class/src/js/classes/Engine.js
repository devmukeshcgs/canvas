import Scroll from "./Scroll"
import LZ from "./LZ"
import Load from "./Load"
import Nav from "./Nav"
import Home from "./Home"
import Work from "./Work"
import About from "./About"
import SIntersect from "./SIntersect"

export default class E {
    constructor() {
        var _STATE = _A;
        _STATE.lerpP = .083,
            _STATE.index = 0,
            _STATE.mode = "in",
            R.BM(this, ["resize", "loop"]),
            this.raf = new R.RafR(this.loop),
            this.scroll = new Scroll,
            this.lz = new LZ,
            this.load = new Load,
            this.nav = new Nav,
            this.ho = new Home,
            this.wo = new Work,
            this.ab = new About
    }
    intro() {
        this.scroll.intro(),
            this.nav.intro()
    }
    init() {
        var _STATE = _A
            , _STATE = (_STATE.is.wo && (_STATE.index = _STATE.config.routes[_STATE.route.new.url].index),
                this.ho.initB(),
                this.wo.initB(),
            {
                isX: _STATE.is.ho
            });
        this.scroll.init(_STATE),
            this.sIntersect = new SIntersect,
            this.lz.initA(),
            this.ho.initA(),
            this.wo.initA(),
            this.ab.init()
    }
    resize() {
        this.ho.resizeB(),
            this.scroll.resize(),
            this.sIntersect.resize(),
            this.ho.resizeA(),
            this.wo.resizeA(),
            this.ab.resize(),
            this.load.resizeA(),
            this.lz.resizeA()
    }
    run() {
        new R.ROR(this.resize).on(),
            this.raf.run()
    }
    on() {
        this.ho.on(),
            this.scroll.on()
    }
    loop() {
        this.scroll.loop(),
            this.lz.loop(),
            this.wo.loop(),
            this.ho.loop(),
            this.ab.loop(),
            this.scroll.rqd && this.sIntersect.run()
    }
    off() {
        this.scroll.off(),
            this.lz.off(),
            this.ho.off()
    }
}