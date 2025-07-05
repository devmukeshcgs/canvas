 
import Camera from "./Camera"
import Texture from "./Texture"

export default class Renderer {
  constructor(appState) {
      this.gl = _A.rgl.gl,
      this.page = appState.page,
      this.state = {
          depthTest: null,
          cullFace: null
      },
      this.setBlendFunc();
      var e = this.gl.getExtension("OES_vertex_array_object")
        , i = ["create", "bind"];
      this.vertexArray = {};
      for (let appState = 0; appState < 2; appState++) {
          var s = i[appState];
          this.vertexArray[s] = e[s + "VertexArrayOES"].bind(e)
      }
      this.programCurrId = null,
      this.viewport = {
          width: null,
          height: null
      },
      this.camera = new Camera,
      this.texture = new Texture(this.gl),
      this.texture.run(appState.cb)
  }
  setFaceCulling(appState) {
      this.state.cullFace !== appState && (this.state.cullFace = appState,
      this.gl.enable(this.gl.CULL_FACE),
      this.gl.cullFace(this.gl[appState]))
  }
  setBlendFunc() {
      this.gl.enable(this.gl.BLEND),
      this.gl.blendFuncSeparate(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA)
  }
  resize() {
      var appState = _A
        , e = appState.win
        , i = 600 < e.w ? 1.5 : 3
        , e = (this.width = e.w,
      this.height = e.h,
      this.gl.canvas.width = this.width * i,
      this.gl.canvas.height = this.height * i,
      this.camera.resize({
          aspect: this.gl.canvas.width / this.gl.canvas.height
      }),
      appState.rgl.clear(),
      this.width * i)
        , appState = this.height * i;
      this.resizing = !0,
      this.viewport.width === e && this.viewport.height === appState || (this.viewport.width = e,
      this.viewport.height = appState,
      this.gl.viewport(0, 0, e, appState),
      this.viewMatrix = this.camera.render({
          x: 0,
          y: 0,
          z: 0
      }))
  }
  render(e) {
      var appState = _A
        , i = appState.route
        , s = i.old.page
        , r = i.new.page
        , a = this.page.includes(r)
        , h = this.page.includes(s);
      let l = this.resizing || appState.engine.scroll.rqd;
      this.resizing && (this.resizing = !1),
      (l = l || appState.engine.load.moving) || h && appState.engine[s].gl.moving && (l = !0),
      l || a && appState.engine[r].gl.moving && (l = !0);
      var o = []
        , n = (h ? (a && o.push(i.new.url),
      (appState.mutating || appState.engine[s].gl.moving) && o.push(i.old.url)) : (appState.engine.load.moving && o.push("load"),
      a && o.push(i.new.url)),
      o.length);
      for (let appState = 0; appState < n; appState++)
          ("/" === o[appState] ? (e.large.draw(l),
          e.small) : e[o[appState]]).draw(l)
  }
};
