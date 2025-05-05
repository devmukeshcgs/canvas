let Preview$1 = class {
    init() {
        this.url = _A.route.new.url;
        var t = R.G.class("w-preview-w")
            , t = (this.preview = t[t.length - 1],
                R.G.class("w-preview-area"))
            , t = (this.area = t[t.length - 1],
                R.G.class("w-s"));
        this.section = t[t.length - 1],
            this.resizeA()
    }
    resizeA() {
        var t = _A
            , e = t.win.h
            , t = t.win.w
            , i = parseInt(getComputedStyle(this.section).marginTop, 10)
            , s = this.preview.offsetHeight
            , r = this.section.offsetHeight
            , t = (this.areaRight = t - (this.preview.getBoundingClientRect().left + this.preview.offsetWidth),
                this.prlx = Math.max(s + 2 * this.areaRight - e, 0),
                s / r);
        this.area.style.height = e * t + 7 + "px",
            this.previewMax = r - s,
            this.previewStart = e + i - this.areaRight,
            this.previewEnd = this.previewStart + this.previewMax + this.prlx,
            0 < this.prlx ? this.areaMax = r - (e - 2 * this.areaRight) : this.areaMax = this.previewMax,
            this.areaMax *= t
    }
    loop() {
        var t = _A.engine.scroll._[this.url].step;
        t < this.previewStart ? (R.T(this.preview, 0, -R.R(t), "px"),
            R.T(this.area, 0, -R.R(t), "px")) : t >= this.previewStart && t <= this.previewEnd ? (R.T(this.preview, 0, -R.R(this.previewStart + R.Remap(this.previewStart, this.previewEnd, 0, this.prlx, t)), "px"),
                R.T(this.area, 0, -R.R(this.previewStart - R.Remap(this.previewStart, this.previewEnd, 0, this.areaMax - this.prlx, t)), "px")) : t > this.previewEnd && (R.T(this.preview, 0, -R.R(t - this.previewMax), "px"),
                    R.T(this.area, 0, -R.R(t - this.previewMax - this.areaMax), "px"))
    }
}
export default Preview$1;
