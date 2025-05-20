import SVirtual from "./SVirtual"
import SVTo from "./SVTo"
import MM from "./MM"

export default class Scroll {
    constructor() {
        _A.cursor = {
            x: -1,
            y: -1
        },
        this.rqd = !1,
        this.min = 0,
        this.maxStep = 0,
        this.isDown = !1,
        this.isDragging = !1,
        this.prev = 0,
        this.step = 0,
        R.BM(this, ["sFn", "sUp", "move", "down", "up"]),
        this.scrollV = new SVirtual({
            cb: this.sFn
        }),
        this.sVTo = new SVTo({
            sUp: this.sUp
        }),
        this.mm = new MM({
            cb: this.move
        })
    }
    intro() {
        var t = _A
          , t = (this._ = {},
        t.config.routes)
          , e = Object.keys(t)
          , i = e.length;
        for (let t = 0; t < i; t++) {
            var s = e[t];
            this._[s] = {
                curr: 0,
                targ: 0,
                step: 0,
                expand: 0
            }
        }
    }
    init(t) {
        var e = _A;
        this.url = e.route.new.url,
        this.isHome = e.is.ho,
        this.isWork = e.is.wo,
        this.isX = t.isX,
        this.scrollV.init(t),
        this.sVTo.init();
        let i = 0;
        this.isHome && "out" === e.mode && (t = e.engine.ho.gl.data,
        i = (t.out.w + t.out.gap.x) * e.index),
        this.sUpAll(i),
        this.resize()
    }
    resize() {
        var t,
         e = _A, 
         e = (this.scrollV.resize(),
        this.step = 1.5 * e.win.h,
        this.isHome ? this.max = e.engine.ho.gl.max : (t = (e = R.G.class("page")).length,
        this.max = Math.max(e[t - 1].offsetHeight - _A.win.h, 0),
        this.maxStep = this.max,
        this.isWork && (this.max += this.step),
        this.maxZero = 0 === this.max),
        this.clamp(this._[this.url].targ));
        this.sUpAll(e)
    }
    expand(t, e) {
        return 0 === this.step ? 0 : (t = R.Clamp(t - e, 0, this.step) / this.step,
        e = R.iLerp(.15, 1, t),
        R.Ease.i2(e))
    }
    sFn(t) {
        var e;
        this.isDown || (this.sVTo.stop(),
        e = _A,
        this.isHome && "in" === e.mode ? e.engine.ho.gl.change("out") : this.sUp(this.clamp(this._[this.url].targ + t)))
    }
    sUp(t) {
        var e = this.url;
        this._[e].targ = t
    }
    down(t) {
        t.ctrlKey || "A" === t.target.tagName || 0 !== t.button ? R.PD(t) : (this.isDown = !0,
        this.isDragging = !1,
        this.start = this.isX ? t.pageX : t.pageY,
        this.targ = this._[this.url].targ,
        this.targPrev = this.targ)
    }
    move(t, e, i) {
        R.PD(i);
        var s, i = _A;
        i.cursor.x = t,
        i.cursor.y = e,
        this.isDown && (s = i.mode,
        e = this.isX ? t : e,
        Math.abs(e - this.start) < 15 || (this.isHome && "out" !== s || (e > this.prev && this.targ === this.min ? this.start = e - (this.targPrev - this.min) / 3 : e < this.prev && this.targ === this.max && (this.start = e - (this.targPrev - this.max) / 3),
        this.prev = e,
        this.targ = 3 * -(e - this.start) + this.targPrev,
        this.targ = this.clamp(this.targ),
        this.sUp(this.targ)),
        this.isDragging = 10 < Math.abs(t - this.start),
        this.isHome && "in" === s && this.isDragging && i.engine.ho.gl.change("out")))
    }
    up(t) {
        var e, i, s;
        this.isDown && (this.isDown = !1,
        this.isDragging || (i = (e = _A).mode,
        this.isHome && (s = e.engine.ho.gl,
        "out" === i ? -1 < s.indexOver && (e.index = s.indexOver,
        s.change("in")) : "in" === i && s.inSlide(t))))
    }
    loop() {
        var t, e, i = _A.lerpP;
        this.rqd = this.unequal(),
        this.rqd && (t = this.url,
        this._[t].curr = R.Damp(this._[t].curr, this._[t].targ, i),
        e = this.clampStep(this._[t].targ),
        this._[t].step = R.Damp(this._[t].step, e, i),
        this._[t].expand = this.expand(this._[t].curr, this._[t].step),
        this.isWork) && this._[t].curr >= this.max - 2 && (this.sVTo.off(),
        R.G.class("w-footer-a")[0].click())
    }
    unequal() {
        var t = this.url;
        return 0 !== R.R(Math.abs(this._[t].curr - this._[t].targ))
    }
    sUpAll(t) {
        var e = this.clampStep(t)
          , i = this.url;
        this._[i].targ = t,
        this._[i].curr = t,
        this._[i].step = e,
        this._[i].expand = this.expand(t, e),
        this.targ = t,
        this.targPrev = t
    }
    clamp(t) {
        return R.R(R.Clamp(t, this.min, this.max))
    }
    clampStep(t) {
        return R.R(R.Clamp(t, this.min, this.maxStep))
    }
    l(t) {
        var e = document;
        R.L(e, t, "mousedown", this.down),
        R.L(e, t, "mouseup", this.up)
    }
    on() {
        this.maxZero || (this.sVTo.on(),
        this.scrollV.on(),
        this.mm.on(),
        this.l("a"))
    }
    off() {
        this.maxZero || (this.sVTo.off(),
        this.scrollV.off(),
        this.mm.off(),
        this.l("r"))
    }
}