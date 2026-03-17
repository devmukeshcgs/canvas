import Scroll from "../scroll/Scroll.js";
import LZ from "../loaders/LZ.js";
import Load from "../loaders/Load.js";
import Nav from "../fx/nav/Nav.js";
import SIntersect from "../classes/SIntersect.js";
import About from "../pages/About.js";
import Home from "../pages/Home.js";
import Work from "../pages/Work.js";

export default class Engine {
    constructor() {
        const t = _A;
        t.lerpP = 0.083;
        t.index = 0;
        t.mode = "in";

        R.BM(this, ["resize", "loop"]);
        this.raf = new R.RafR(this.loop);
        this.s = new Scroll();
        this.lz = new LZ();
        this.load = new Load();
        this.nav = new Nav();
        this.ho = new Home();
        this.wo = new Work();
        this.ab = new About();
    }

    intro() {
        this.s.intro();
        this.nav.intro();
    }

    init() {
        const t = _A;
        const conf = (t.is.wo && (t.index = t.config.routes[t.route.new.url].index), this.ho.initB(), this.wo.initB(), { isX: t.is.ho });
        this.s.init(conf);
        this.sIntersect = new SIntersect();
        this.lz.initA();
        this.ho.initA();
        this.wo.initA();
        this.ab.init();
    }

    resize() {
        this.ho.resizeB();
        this.s.resize();
        this.sIntersect.resize();
        this.ho.resizeA();
        this.wo.resizeA();
        this.ab.resize();
        this.load.resizeA();
        this.lz.resizeA();
    }

    run() {
        new R.ROR(this.resize).on();
        this.raf.run();
    }

    on() {
        this.ho.on();
        this.s.on();
    }

    loop() {
        this.s.loop();
        this.lz.loop();
        this.wo.loop();
        this.ho.loop();
        this.ab.loop();
        if (this.s.rqd) this.sIntersect.run();
    }

    off() {
        this.s.off();
        this.lz.off();
        this.ho.off();
    }
}

