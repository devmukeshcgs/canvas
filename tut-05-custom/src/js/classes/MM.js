export default class MM {
    constructor(t) {
        this.cb = t.cb,
        this.el = R.Has(t, "el") ? R.Select.el(t.el)[0] : document,
        R.BM(this, ["run"])
    }
    on() {
        this.l("a")
    }
    off() {
        this.l("r")
    }
    l(t) {
        R.L(this.el, t, "mousemove", this.run)
    }
    run(t) {
        this.cb(t.pageX, t.pageY, t)
    }
}