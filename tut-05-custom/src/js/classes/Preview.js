export default class Preview {
  init() {
      this.url = _A.route.new.url,
      this.leftW = R.G.id("a-l-w"),
      this.left = R.G.id("a-l"),
      this.preview = R.G.id("a-lp"),
      this.resize()
  }
  resize() {
      var t = _A
        , e = t.win.h
        , i = (R.T(this.leftW, 0, 0, "px"),
      R.T(this.preview, 0, 0, "px"),
      this.left.offsetHeight)
        , s = this.left.getBoundingClientRect().top;
      this.leftArea = e < s + i ? t.win.h - s : s + i - s,
      this.max = i - this.leftArea,
      this.maxP = this.leftArea - this.preview.offsetHeight
  }
  loop() {
      var t = _A
        , e = t.engine.scroll._[this.url].curr
        , t = t.engine.scroll.max
        , i = R.Remap(0, t, 0, this.max, e)
        , t = R.Remap(0, t, 0, this.maxP, e);
      R.T(this.leftW, 0, -R.R(i), "px"),
      R.T(this.preview, 0, R.R(t), "px")
  }
}