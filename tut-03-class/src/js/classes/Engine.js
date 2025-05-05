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
        var t = _A;
        t.lerpP = .083,
            t.index = 0,
            t.mode = "in",
            R.BM(this, ["resize", "loop"]),
            this.raf = new R.RafR(this.loop),
            this.s = new Scroll,
            this.lz = new LZ,
            this.load = new Load,
            this.nav = new Nav,
            this.ho = new Home,
            this.wo = new Work,
            this.ab = new About
    }
    intro() {
        this.s.intro(),
            this.nav.intro()
    }
    init() {
        var t = _A
            , t = (t.is.wo && (t.index = t.config.routes[t.route.new.url].index),
                this.ho.initB(),
                this.wo.initB(),
            {
                isX: t.is.ho
            });
        this.s.init(t),
            this.sIntersect = new SIntersect,
            this.lz.initA(),
            this.ho.initA(),
            this.wo.initA(),
            this.ab.init()
    }
    resize() {
        this.ho.resizeB(),
            this.s.resize(),
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
            this.s.on()
    }
    loop() {
        this.s.loop(),
            this.lz.loop(),
            this.wo.loop(),
            this.ho.loop(),
            this.ab.loop(),
            this.s.rqd && this.sIntersect.run()
    }
    off() {
        this.s.off(),
            this.lz.off(),
            this.ho.off()
    }
}