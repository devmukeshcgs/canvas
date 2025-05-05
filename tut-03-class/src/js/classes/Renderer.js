 
import Camera from "./Camera"
import Texture from "./Texture"

export default class Renderer {
  constructor(t) {
      this.gl = _A.rgl.gl,
      this.page = t.page,
      this.state = {
          depthTest: null,
          cullFace: null
      },
      this.setBlendFunc();
      var e = this.gl.getExtension("OES_vertex_array_object")
        , i = ["create", "bind"];
      this.vertexArray = {};
      for (let t = 0; t < 2; t++) {
          var s = i[t];
          this.vertexArray[s] = e[s + "VertexArrayOES"].bind(e)
      }
      this.programCurrId = null,
      this.viewport = {
          width: null,
          height: null
      },
      this.camera = new Camera,
      this.texture = new Texture(this.gl),
      this.texture.run(t.cb)
  }
  setFaceCulling(t) {
      this.state.cullFace !== t && (this.state.cullFace = t,
      this.gl.enable(this.gl.CULL_FACE),
      this.gl.cullFace(this.gl[t]))
  }
  setBlendFunc() {
      this.gl.enable(this.gl.BLEND),
      this.gl.blendFuncSeparate(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA)
  }
  resize() {
      var t = _A
        , e = t.win
        , i = 600 < e.w ? 1.5 : 3
        , e = (this.width = e.w,
      this.height = e.h,
      this.gl.canvas.width = this.width * i,
      this.gl.canvas.height = this.height * i,
      this.camera.resize({
          aspect: this.gl.canvas.width / this.gl.canvas.height
      }),
      t.rgl.clear(),
      this.width * i)
        , t = this.height * i;
      this.resizing = !0,
      this.viewport.width === e && this.viewport.height === t || (this.viewport.width = e,
      this.viewport.height = t,
      this.gl.viewport(0, 0, e, t),
      this.viewMatrix = this.camera.render({
          x: 0,
          y: 0,
          z: 0
      }))
  }
  render(e) {
      var t = _A
        , i = t.route
        , s = i.old.page
        , r = i.new.page
        , a = this.page.includes(r)
        , h = this.page.includes(s);
      let l = this.resizing || t.e.s.rqd;
      this.resizing && (this.resizing = !1),
      (l = l || t.e.load.moving) || h && t.e[s].gl.moving && (l = !0),
      l || a && t.e[r].gl.moving && (l = !0);
      var o = []
        , n = (h ? (a && o.push(i.new.url),
      (t.mutating || t.e[s].gl.moving) && o.push(i.old.url)) : (t.e.load.moving && o.push("load"),
      a && o.push(i.new.url)),
      o.length);
      for (let t = 0; t < n; t++)
          ("/" === o[t] ? (e.large.draw(l),
          e.small) : e[o[t]]).draw(l)
  }
};
