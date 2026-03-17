export default class Rotate {
    constructor() {
        this.inDom = false;
        R.BM(this, ["resize"]);
        new R.ROR(this.resize).on();
        this.resize();
    }

    resize() {
        const shouldShow = 1 < _A.winRatio.wh;
        if (shouldShow && !this.inDom) this.a();
        else if (!shouldShow && this.inDom) this.r();
    }

    a() {
        this.issW = R.Cr("div");
        this.issW.className = "iss-w";

        const inner = R.Cr("div");
        inner.className = "iss";
        inner.textContent = "Please rotate your device.";

        this.issW.appendChild(inner);
        document.body.prepend(this.issW);
        this.inDom = true;
    }

    r() {
        this.issW.parentNode.removeChild(this.issW);
        this.inDom = false;
    }
}

