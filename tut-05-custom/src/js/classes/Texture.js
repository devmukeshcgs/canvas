 
export default class Texture {
  constructor(t) {
      this.gl = t,
      this.tex = {}
  }
  run(t) {
      var e = _A
        , t = (this.cb = t,
      e.route)
        , i = t.new.url
        , s = (this.dom = R.G.id("load-no").children[0],
      this.no = 0,
      this.prevNo = 0,
      R.BM(this, ["loop"]),
      this.raf = new R.RafR(this.loop),
      e.data)
        , r = Object.keys(s)
        , a = r.length;
      for (let t = this.texL = 0; t < a; t++) {
          var h = r[t]
            , l = s[h];
          !l.preload && i !== h || this.imgSet({
              media: l,
              url: h,
              gl: !0,
              ext: !1
          })
      }
      this.raf.run()
  }
  imgSet(t) {
      var e = t.ext ? "" : _A.img.jpg
        , i = t.url
        , s = t.gl
        , t = t.media
        , r = t.tex
        , a = t.texL;
      s && (this.tex[i] = []);
      for (let t = 0; t < a; t++)
          this.imgSetOne({
              src: r[t] + e,
              index: t,
              url: i,
              gl: s
          }),
          this.texL++
  }
  imgSetOne(t) {
      var e = t.src;
      let i = t.url
        , s = t.gl
        , r = t.index
        , a = new Image;
      a.onload = t => {
          var e;
          s && (e = this.texInit(a),
          this.tex[i][r] = {
              attrib: e,
              element: a,
              type: "img"
          }),
          this.no++
      }
      ,
      a.src = e
  }
  texInit(t) {
      var e = this.gl
        , i = e.createTexture()
        , s = (e.bindTexture(e.TEXTURE_2D, i),
      e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t),
      [["WRAP_S", "CLAMP_TO_EDGE"], ["WRAP_T", "CLAMP_TO_EDGE"], ["MIN_FILTER", "LINEAR"], ["MAG_FILTER", "LINEAR"]]);
      for (let t = 0; t < 4; t++)
          e.texParameteri(e.TEXTURE_2D, e["TEXTURE_" + s[t][0]], e[s[t][1]]);
      return i
  }
  loop() {
      this.no !== this.prevNo && (this.prevNo = this.no,
      this.dom.textContent = Math.round(100 / this.texL * this.no) + "%"),
      this.no === this.texL && (this.raf.stop(),
      this.cb())
  }
};
