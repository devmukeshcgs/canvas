export default class SVTo {
    constructor(t) {
        this.isSTo = !1,
        this.sUp = t.sUp,
        R.BM(this, ["wFooterFn", "aLeftFn", "wPreviewFn", "wHeroScrollFn"])
    }
    init() {
        var t = _A;
        this.url = t.route.new.url,
        this.isAbout = t.is.ab,
        this.isWork = t.is.wo
    }
    stop() {
        this.isSTo && (this.anim.pause(),
        this.isSTo = !1)
    }
    wFooterFn() {
        this.stop();
        var t = _A.engine.scroll
          , e = R.R(t._[this.url].curr)
          , t = t.max
          , i = Math.abs(t - e)
          , i = 0 === i ? 0 : R.Lerp(100, 500, R.Clamp(i / 3e3, 0, 1));
        this.play({
            start: e,
            end: t,
            d: i,
            e: "io1"
        })
    }
    aLeftFn(t) {
        this.stop();
        var e, i, s, r = _A, a = r.engine.scroll;
        a.isDragging || (e = R.R(a._[this.url].curr),
        i = R.G.id("a-l"),
        s = R.G.id("a-r").offsetHeight / i.offsetHeight,
        t = R.Clamp((t.pageY - i.getBoundingClientRect().top) * s - r.winSemi.h, 0, a.max),
        s = 0 === (i = Math.abs(t - e)) ? 0 : R.Lerp(100, 400, R.Clamp(i / 3e3, 0, 1)),
        this.play({
            start: e,
            end: t,
            d: s,
            e: "io1"
        }))
    }
    wPreviewFn(t) {
        this.stop();
        var e = _A
          , i = e.engine.scroll
          , i = R.R(i._[this.url].step)
          , s = R.G.class("w-preview-w")
          , s = s[s.length - 1]
          , t = R.Index.class(t.target, "w-preview", s)
          , s = R.G.class("w-s")
          , s = s[s.length - 1].children[t]
          , t = s.getBoundingClientRect().top - this.y(s) - e.engine.wo.preview.areaRight
          , s = Math.abs(t - i)
          , e = 0 === s ? 0 : R.Lerp(100, 400, R.Clamp(s / 3e3, 0, 1));
        this.play({
            start: i,
            end: t,
            d: e,
            e: "io1"
        })
    }
    y(t) {
        t = t.style.transform.match(/^translate3d\((.+)\)$/)[1].split(", ");
        return parseFloat(t[1])
    }
    wHeroScrollFn() {
        this.stop();
        var t = _A
          , e = t.engine.scroll
          , e = R.R(e._[this.url].step)
          , t = t.win.h
          , i = Math.abs(t - e)
          , i = 0 === i ? 0 : R.Lerp(100, 500, R.Clamp(i / 3e3, 0, 1));
        this.play({
            start: e,
            end: t,
            d: i,
            e: "io1"
        })
    }
    play(t) {
        let e = t.start
          , i = t.end;
        this.anim = new R.M({
            d: t.d,
            e: t.e,
            update: t => {
                t = R.Lerp(e, i, t.progE);
                this.sUp(t)
            }
        }),
        this.isSTo = !0,
        this.anim.play()
    }
    on() {
        this.l("a")
    }
    off() {
        this.l("r")
    }
    l(t) {
        var e = "click";
        this.isAbout ? R.L("#a-l-w", t, e, this.aLeftFn) : this.isWork && (R.L(".w-footer-link", t, e, this.wFooterFn),
        R.L(".w-preview", t, e, this.wPreviewFn),
        R.L(".w-hero-scroll", t, e, this.wHeroScrollFn))
    }
}