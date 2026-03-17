export default class SVTo {
    constructor(t) {
        this.isSTo = false;
        this.sUp = t.sUp;
        R.BM(this, ["wFooterFn", "aLeftFn", "wPreviewFn", "wHeroScrollFn"]);
    }

    init() {
        const t = _A;
        this.url = t.route.new.url;
        this.isAbout = t.is.ab;
        this.isWork = t.is.wo;
    }

    stop() {
        if (this.isSTo) {
            this.anim.pause();
            this.isSTo = false;
        }
    }

    wFooterFn() {
        this.stop();
        const s = _A.e.s;
        const e = R.R(s._[this.url].curr);
        const max = s.max;
        const diff = Math.abs(max - e);
        const d = diff === 0 ? 0 : R.Lerp(100, 500, R.Clamp(diff / 3000, 0, 1));
        this.play({ start: e, end: max, d, e: "io1" });
    }

    aLeftFn(t) {
        this.stop();
        const r = _A;
        const a = r.e.s;
        if (a.isDragging) return;

        const e = R.R(a._[this.url].curr);
        const left = R.G.id("a-l");
        const s = R.G.id("a-r").offsetHeight / left.offsetHeight;
        const end = R.Clamp((t.pageY - left.getBoundingClientRect().top) * s - r.winSemi.h, 0, a.max);
        const diff = Math.abs(end - e);
        const d = diff === 0 ? 0 : R.Lerp(100, 400, R.Clamp(diff / 3000, 0, 1));
        this.play({ start: e, end, d, e: "io1" });
    }

    wPreviewFn(t) {
        this.stop();
        const e = _A;
        const s = e.e.s;
        const step = R.R(s._[this.url].step);
        const wraps = R.G.class("w-preview-w");
        const wrap = wraps[wraps.length - 1];
        const idx = R.Index.class(t.target, "w-preview", wrap);
        const sections = R.G.class("w-s");
        const sec = sections[sections.length - 1].children[idx];
        const end = sec.getBoundingClientRect().top - this.y(sec) - e.e.wo.preview.areaRight;
        const diff = Math.abs(end - step);
        const d = diff === 0 ? 0 : R.Lerp(100, 400, R.Clamp(diff / 3000, 0, 1));
        this.play({ start: step, end, d, e: "io1" });
    }

    y(t) {
        const m = t.style.transform.match(/^translate3d\((.+)\)$/)[1].split(", ");
        return parseFloat(m[1]);
    }

    wHeroScrollFn() {
        this.stop();
        const t = _A;
        const s = t.e.s;
        const step = R.R(s._[this.url].step);
        const end = t.win.h;
        const diff = Math.abs(end - step);
        const d = diff === 0 ? 0 : R.Lerp(100, 500, R.Clamp(diff / 3000, 0, 1));
        this.play({ start: step, end, d, e: "io1" });
    }

    play(t) {
        const start = t.start;
        const end = t.end;
        this.anim = new R.M({
            d: t.d,
            e: t.e,
            update: (v) => {
                const y = R.Lerp(start, end, v.progE);
                this.sUp(y);
            },
        });
        this.isSTo = true;
        this.anim.play();
    }

    on() {
        this.l("a");
    }

    off() {
        this.l("r");
    }

    l(t) {
        const e = "click";
        if (this.isAbout) {
            R.L("#a-l-w", t, e, this.aLeftFn);
        } else if (this.isWork) {
            R.L(".w-footer-link", t, e, this.wFooterFn);
            R.L(".w-preview", t, e, this.wPreviewFn);
            R.L(".w-hero-scroll", t, e, this.wHeroScrollFn);
        }
    }
}

