export default class Rotate {
    constructor() {
        this.inDom = !1,
            R.BM(this, ["resize"]),
            new R.ROR(this.resize).on(),
            this.resize()
    }
    resize() {
        var t = 1 < _A.winRatio.wh;
        t && !this.inDom ? this.a() : !t && this.inDom && this.r()
    }
    a() {
        this.issW = R.Cr("div"),
            this.issW.className = "iss-w";
        var t = R.Cr("div");
        t.className = "iss",
            t.textContent = "Please rotate your device.",
            this.issW.appendChild(t),
            document.body.prepend(this.issW),
            this.inDom = !0
    }
    r() {
        this.issW.parentNode.removeChild(this.issW),
            this.inDom = !1
    }
}
