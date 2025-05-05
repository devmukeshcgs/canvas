 
export default class SVirtual {
    constructor(t) {
        this.cbFn = t.cb,
        this.isOn = !1,
        this.isFF = R.Snif.isFirefox,
        R.BM(this, ["fn"]);
        var t = document
          , e = ["wheel", "keydown"]
          , i = [t.body, t];
        for (let t = 0; t < 2; t++)
            R.L(i[t], "a", e[t], this.fn)
    }
    init(t) {
        this.isX = t.isX
    }
    on() {
        this.tick = !1,
        this.isOn = !0
    }
    off() {
        this.isOn = !1
    }
    resize() {
        this.spaceGap = _A.win.h - 40
    }
    fn(t) {
        this.e = t,
        this.eT = t.type,
        this.eK = t.key,
        "keydown" === this.eT && "Tab" !== this.eK || R.PD(t),
        this.isOn && !this.tick && (this.tick = !0,
        this.run())
    }
    run() {
        var t = this.eT;
        "wheel" === t ? this.w() : "keydown" === t && this.key()
    }
    w() {
        var t = this.e;
        let e;
        var i, s = t.wheelDeltaY || -1 * t.deltaY;
        e = this.isX && (i = t.wheelDeltaX || -1 * t.deltaX,
        Math.abs(i) >= Math.abs(s)) ? i : s,
        this.isFF && 1 === t.deltaMode ? e *= .75 : e *= .556,
        this.s = -e,
        this.cb()
    }
    key() {
        var e = this.eK
          , i = "ArrowUp" === e || "ArrowLeft" === e
          , t = "ArrowDown" === e || "ArrowRight" === e
          , e = " " === e;
        if (i || t || e) {
            var s = _A;
            if ("in" === s.mode && s.is.ho)
                s.engine.ho.gl.arrowSlide(t || e ? 1 : -1),
                this.tick = !1;
            else {
                let t = 100;
                i ? t *= -1 : e && (s = this.e.shiftKey ? -1 : 1,
                t = this.spaceGap * s),
                this.s = t,
                this.cb()
            }
        } else
            this.tick = !1
    }
    cb() {
        this.cbFn(this.s),
        this.tick = !1
    }
}