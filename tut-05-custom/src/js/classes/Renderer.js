 
import Camera from "./Camera"
import Texture from "./Texture"

export default class Renderer {
  constructor(_STATE) {
      this.gl = _A.rgl.gl,
      this.page = _STATE.page,
      this.state = {
          depthTest: null,
          cullFace: null
      },
      this.setBlendFunc();
      var e = this.gl.getExtension("OES_vertex_array_object")
        , i = ["create", "bind"];
      this.vertexArray = {};
      for (let _STATE = 0; _STATE < 2; _STATE++) {
          var s = i[_STATE];
          this.vertexArray[s] = e[s + "VertexArrayOES"].bind(e)
      }
      this.programCurrId = null,
      this.viewport = {
          width: null,
          height: null
      },
      this.camera = new Camera,
      this.texture = new Texture(this.gl),
      this.texture.run(_STATE.cb)
  }
  setFaceCulling(_STATE) {
      this.state.cullFace !== _STATE && (this.state.cullFace = _STATE,
      this.gl.enable(this.gl.CULL_FACE),
      this.gl.cullFace(this.gl[_STATE]))
  }
  setBlendFunc() {
      this.gl.enable(this.gl.BLEND),
      this.gl.blendFuncSeparate(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA)
  }
  resize() {
      var _STATE = _A
        , e = _STATE.win
        , i = 600 < e.w ? 1.5 : 3
        , e = (this.width = e.w,
      this.height = e.h,
      this.gl.canvas.width = this.width * i,
      this.gl.canvas.height = this.height * i,
      this.camera.resize({
          aspect: this.gl.canvas.width / this.gl.canvas.height
      }),
      _STATE.rgl.clear(),
      this.width * i)
        , _STATE = this.height * i;
      this.resizing = !0,
      this.viewport.width === e && this.viewport.height === _STATE || (this.viewport.width = e,
      this.viewport.height = _STATE,
      this.gl.viewport(0, 0, e, _STATE),
      this.viewMatrix = this.camera.render({
          x: 0,
          y: 0,
          z: 0
      }))
  }
  render(e) {
      var _STATE = _A
        , i = _STATE.route
        , s = i.old.page
        , r = i.new.page
        , a = this.page.includes(r)
        , h = this.page.includes(s);
      let l = this.resizing || _STATE.engine.scroll.rqd;
      this.resizing && (this.resizing = !1),
      (l = l || _STATE.engine.load.moving) || h && _STATE.engine[s].gl.moving && (l = !0),
      l || a && _STATE.engine[r].gl.moving && (l = !0);
      var o = []
        , n = (h ? (a && o.push(i.new.url),
      (_STATE.mutating || _STATE.engine[s].gl.moving) && o.push(i.old.url)) : (_STATE.engine.load.moving && o.push("load"),
      a && o.push(i.new.url)),
      o.length);
      for (let _STATE = 0; _STATE < n; _STATE++)
          ("/" === o[_STATE] ? (e.large.draw(l),
          e.small) : e[o[_STATE]]).draw(l)
  }
};
