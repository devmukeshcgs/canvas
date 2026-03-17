import SVirtual from "./SVirtual.js";
import SVTo from "./SVTo.js";
import MM from "./MM.js";

export default class Scroll {
    constructor() {
        _A.cursor = { x: -1, y: -1 };
        this.rqd = false;
        this.min = 0;
        this.maxStep = 0;
        this.isDown = false;
        this.isDragging = false;
        this.prev = 0;
        this.step = 0;

        R.BM(this, ["sFn", "sUp", "move", "down", "up"]);

        this.scrollV = new SVirtual({ cb: this.sFn });
        this.sVTo = new SVTo({ sUp: this.sUp });
        this.mm = new MM({ cb: this.move });
    }

    intro() {
        const app = _A;
        this._ = {};
        const routes = app.config.routes;
        const keys = Object.keys(routes);
        const l = keys.length;
        for (let i = 0; i < l; i++) {
            const k = keys[i];
            this._[k] = { curr: 0, targ: 0, step: 0, expand: 0 };
        }
    }

    init(t) {
        const e = _A;
        this.url = e.route.new.url;
        this.isHome = e.is.ho;
        this.isWork = e.is.wo;
        this.isX = t.isX;

        this.scrollV.init(t);
        this.sVTo.init();

        let i = 0;
        if (this.isHome && e.mode === "out") {
            const d = e.e.ho.gl.data;
            i = (d.out.w + d.out.gap.x) * e.index;
        }
        this.sUpAll(i);
        this.resize();
    }

    resize() {
        const e = _A;
        this.scrollV.resize();
        this.step = 1.5 * e.win.h;

        let clamped;
        if (this.isHome) {
            this.max = e.e.ho.gl.max;
            clamped = this.clamp(this._[this.url].targ);
        } else {
            const pages = R.G.class("page");
            const last = pages.length;
            this.max = Math.max(pages[last - 1].offsetHeight - _A.win.h, 0);
            this.maxStep = this.max;
            if (this.isWork) this.max += this.step;
            this.maxZero = this.max === 0;
            clamped = this.clamp(this._[this.url].targ);
        }

        this.sUpAll(clamped);
    }

    expand(t, e) {
        if (this.step === 0) return 0;
        const n = R.Clamp(t - e, 0, this.step) / this.step;
        const i = R.iLerp(0.15, 1, n);
        return R.Ease.i2(i);
    }

    sFn(t) {
        if (this.isDown) return;
        this.sVTo.stop();
        const e = _A;
        if (this.isHome && e.mode === "in") e.e.ho.gl.change("out");
        else this.sUp(this.clamp(this._[this.url].targ + t));
    }

    sUp(t) {
        this._[this.url].targ = t;
    }

    down(t) {
        if (t.ctrlKey || t.target.tagName === "A" || t.button !== 0) {
            R.PD(t);
            return;
        }
        this.isDown = true;
        this.isDragging = false;
        this.start = this.isX ? t.pageX : t.pageY;
        this.targ = this._[this.url].targ;
        this.targPrev = this.targ;
    }

    move(x, y, ev) {
        R.PD(ev);
        const app = _A;
        app.cursor.x = x;
        app.cursor.y = y;

        if (!this.isDown) return;
        const mode = app.mode;
        const p = this.isX ? x : y;
        if (Math.abs(p - this.start) < 15) return;

        if (!(this.isHome && mode === "out")) {
            if (p > this.prev && this.targ === this.min)
                this.start = p - (this.targPrev - this.min) / 3;
            else if (p < this.prev && this.targ === this.max)
                this.start = p - (this.targPrev - this.max) / 3;

            this.prev = p;
            this.targ = 3 * -(p - this.start) + this.targPrev;
            this.targ = this.clamp(this.targ);
            this.sUp(this.targ);
        }

        this.isDragging = 10 < Math.abs(x - this.start);
        if (this.isHome && mode === "in" && this.isDragging) app.e.ho.gl.change("out");
    }

    up(t) {
        if (!this.isDown) return;
        this.isDown = false;

        if (this.isDragging) return;
        const e = _A;
        const mode = e.mode;
        if (!this.isHome) return;

        const s = e.e.ho.gl;
        if (mode === "out") {
            if (-1 < s.indexOver) {
                e.index = s.indexOver;
                s.change("in");
            }
        } else if (mode === "in") {
            s.inSlide(t);
        }
    }

    loop() {
        const i = _A.lerpP;
        this.rqd = this.unequal();
        if (!this.rqd) return;

        const t = this.url;
        this._[t].curr = R.Damp(this._[t].curr, this._[t].targ, i);
        const e = this.clampStep(this._[t].targ);
        this._[t].step = R.Damp(this._[t].step, e, i);
        this._[t].expand = this.expand(this._[t].curr, this._[t].step);

        if (this.isWork && this._[t].curr >= this.max - 2) {
            this.sVTo.off();
            R.G.class("w-footer-a")[0].click();
        }
    }

    unequal() {
        const t = this.url;
        return 0 !== R.R(Math.abs(this._[t].curr - this._[t].targ));
    }

    sUpAll(t) {
        const e = this.clampStep(t);
        const i = this.url;
        this._[i].targ = t;
        this._[i].curr = t;
        this._[i].step = e;
        this._[i].expand = this.expand(t, e);
        this.targ = t;
        this.targPrev = t;
    }

    clamp(t) {
        return R.R(R.Clamp(t, this.min, this.max));
    }

    clampStep(t) {
        return R.R(R.Clamp(t, this.min, this.maxStep));
    }

    l(t) {
        const e = document;
        R.L(e, t, "mousedown", this.down);
        R.L(e, t, "mouseup", this.up);
    }

    on() {
        if (this.maxZero) return;
        this.sVTo.on();
        this.scrollV.on();
        this.mm.on();
        this.l("a");
    }

    off() {
        if (this.maxZero) return;
        this.sVTo.off();
        this.scrollV.off();
        this.mm.off();
        this.l("r");
    }
}

