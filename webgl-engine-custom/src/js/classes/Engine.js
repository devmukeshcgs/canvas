import Scroll from "./Scroll"
import LZ from "./LZ"
import Load from "./Load"
import Nav from "./Nav"
import Home from "./Home"
import Work from "./Work"
import About from "./About"
import SIntersect from "./SIntersect"

export default class Engine {
    constructor() {
        var appState = _A;
        appState.lerpP = .083,
            appState.index = 0,
            appState.mode = "in",
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
        var appState = _A
            , appState = (appState.is.wo && (appState.index = appState.config.routes[appState.route.new.url].index),
                this.ho.initB(),
                this.wo.initB(),
            {
                isX: appState.is.ho
            });
        this.scroll.init(appState),
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