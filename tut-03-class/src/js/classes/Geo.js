import { create, identity, multiplyFn, scaleFn, translateFn } from "../util/fun";

 
export default class Geo {
  constructor(t) {
      var e = _A.rgl;
      this.gl = e.gl,
      this.renderer = e.renderer,
      this.program = t.program,
      this.mode = t.mode,
      this.face = t.face,
      this.attrib = t.attrib,
      this.renderer.vertexArray.bind(null),
      this.program.getL(this.attrib, "Attrib"),
      this.modelMatrix = create()
  }
  setVAO() {
      var t = this.renderer;
      this.vao = t.vertexArray.create(),
      t.vertexArray.bind(this.vao),
      this.setAttrib(),
      t.vertexArray.bind(null)
  }
  setAttrib() {
      var t, e, i, s, r = this.gl;
      for (t in this.attrib)
          R.Has(this.attrib, t) && (e = this.attrib[t],
          i = "index" === t,
          (s = e.data.constructor) === Float32Array ? e.type = r.FLOAT : s === Uint16Array ? e.type = r.UNSIGNED_SHORT : e.type = r.UNSIGNED_INT,
          e.count = e.data.length / e.size,
          e.target = i ? r.ELEMENT_ARRAY_BUFFER : r.ARRAY_BUFFER,
          e.normalize = !1,
          r.bindBuffer(e.target, r.createBuffer()),
          r.bufferData(e.target, e.data, r.STATIC_DRAW),
          i || (r.enableVertexAttribArray(e.location),
          r.vertexAttribPointer(e.location, e.size, e.type, e.normalize, 0, 0)))
  }
  draw(t) {
      var e = this.gl
        , i = this.renderer
        , s = (i.setFaceCulling(this.face),
      this.program.run(),
      this.modelMatrix = identity(this.modelMatrix),
      i.viewMatrix)
        , s = multiplyFn(this.modelMatrix, s)
        , r = t.lerp
        , a = t.ease
        , h = t.intro
        , l = r.x + h.x
        , o = r.y + a.y + h.y
        , n = r.w + h.w
        , p = r.h + h.h
        , h = r.scale + h.scale + a.scale
        , l = (s = scaleFn(translateFn(s, [l, -o, 0]), [n, p, 1]),
      this.program.uniform);
      let d = 1
        , c = t.media.ratio.wh / (n / p || 1);
      c < 1 && (d = 1 / c,
      c = 1),
      l.d.value = [c * h, d * h],
      l.e.value = [r.pX, (r.pY + a.pY) / d],
      l.h.value = s,
      this.program.setUniform(),
      e.bindTexture(e.TEXTURE_2D, this.attrib.f.tex),
      i.vertexArray.bind(this.vao);
      o = this.attrib.index;
      e.drawElements(e[this.mode], o.count, o.type, 0)
  }
};
