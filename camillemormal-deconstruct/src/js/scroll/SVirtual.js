export default class SVirtual {
    constructor(t) {
        this.cbFn = t.cb;
        this.isOn = false;
        this.isFF = R.Snif.isFirefox;
        R.BM(this, ["fn"]);

        const d = document;
        const events = ["wheel", "keydown"];
        const els = [d.body, d];
        for (let i = 0; i < 2; i++) R.L(els[i], "a", events[i], this.fn);
    }

    init(t) {
        this.isX = t.isX;
    }

    on() {
        this.tick = false;
        this.isOn = true;
    }

    off() {
        this.isOn = false;
    }

    resize() {
        this.spaceGap = _A.win.h - 40;
    }

    fn(t) {
        this.e = t;
        this.eT = t.type;
        this.eK = t.key;
        (this.eT === "keydown" && this.eK !== "Tab") || R.PD(t);
        if (this.isOn && !this.tick) {
            this.tick = true;
            this.run();
        }
    }

    run() {
        const t = this.eT;
        if (t === "wheel") this.w();
        else if (t === "keydown") this.key();
    }

    w() {
        const t = this.e;
        let e;
        const s = t.wheelDeltaY || -1 * t.deltaY;
        if (this.isX) {
            const i = t.wheelDeltaX || -1 * t.deltaX;
            e = Math.abs(i) >= Math.abs(s) ? i : s;
        } else {
            e = s;
        }
        if (this.isFF && t.deltaMode === 1) e *= 0.75;
        else e *= 0.556;
        this.s = -e;
        this.cb();
    }

    key() {
        let e = this.eK;
        const up = e === "ArrowUp" || e === "ArrowLeft";
        const down = e === "ArrowDown" || e === "ArrowRight";
        const space = e === " ";

        if (up || down || space) {
            const s = _A;
            if (s.mode === "in" && s.is.ho) {
                s.e.ho.gl.arrowSlide(down || space ? 1 : -1);
                this.tick = false;
            } else {
                let t = 100;
                if (up) t *= -1;
                else if (space) {
                    const dir = this.e.shiftKey ? -1 : 1;
                    t = this.spaceGap * dir;
                }
                this.s = t;
                this.cb();
            }
        } else {
            this.tick = false;
        }
    }

    cb() {
        this.cbFn(this.s);
        this.tick = false;
    }
}

