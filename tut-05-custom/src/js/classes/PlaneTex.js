import Geo from "./Geo" 

function Plane(t) {
  var t = t.p
    , e = {};
  const i = t.pts.h
    , s = t.pts.v
    , r = i - 1
    , a = s - 1
    , h = 1 / r
    , l = 1 / a;
  var o = [];
  let n = 0;
  for (let t = 0; t < s; t++) {
      var p = t * l - 1;
      for (let t = 0; t < i; t++)
          o[n++] = t * h,
          o[n++] = p
  }
  e.pos = o;
  var d = [];
  let c = 0;
  var g = s - 1
    , u = s - 2
    , m = i - 1;
  for (let e = 0; e < g; e++) {
      var v = i * e
        , f = v + i;
      for (let t = 0; t < i; t++) {
          var R = f + t;
          d[c++] = v + t,
          d[c++] = R,
          t === m && e < u && (d[c++] = R,
          d[c++] = i * (e + 1))
      }
  }
  e.index = d;
  var x = [];
  let w = 0;
  for (let t = 0; t < s; t++) {
      var y = 1 - t / a;
      for (let t = 0; t < i; t++)
          x[w++] = t / r,
          x[w++] = y
  }
  return e.texture = x,
  e
}
class PlaneTex {
  constructor(t) {
      var e = t.p
        , i = _A.rgl.renderer.texture.tex[t.url]
        , s = i.length
        , r = (this.planeL = s,
      R.Is.def(t.isHomeLarge) && (this.planeL = this.planeL * this.planeL),
      {
          h: 2,
          v: 2
      })
        , a = (this.lerp = {
          prop: ["x", "y", "w", "h", "scale", "opacity", "pY"],
          r6: ["scale", "opacity", "pY"]
      },
      this.lerp.propL = this.lerp.prop.length,
      {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          opacity: 1,
          scale: 1,
          pY: 0,
          pX: 0
      })
        , h = {
          y: 0,
          pY: 0,
          scale: 0
      }
        , l = {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          scale: 0
      };
      R.BM(this, ["unequal"]),
      this.plane = [];
      for (let t = 0; t < this.planeL; t++) {
          var o = i[t % s]
            , n = o.element
            , p = n.width
            , d = n.height
            , n = {
              pts: r,
              zIndex: 0,
              lerp: {
                  ...a
              },
              ease: {
                  ...h
              },
              intro: {
                  ...l
              },
              tex: o,
              media: {
                  obj: n,
                  dimension: {
                      width: p,
                      height: d
                  },
                  ratio: {
                      wh: p / d,
                      hw: d / p
                  }
              },
              out: !1,
              geo: new Geo({
                  program: e,
                  mode: "TRIANGLE_STRIP",
                  face: "FRONT",
                  attrib: {
                      c: {
                          size: 2
                      },
                      index: {
                          size: 1
                      },
                      f: {
                          size: 2,
                          tex: o.attrib
                      }
                  }
              })
          }
            , d = Plane({
              p: n,
              tex: !0
          })
            , p = n.geo.attrib;
          p.c.data = new Float32Array(d.pos),
          p.index.data = new Uint16Array(d.index),
          p.f.data = new Float32Array(d.texture),
          n.geo.setVAO(),
          this.plane[t] = n
      }
  }
  draw(i) {
      var s = _A
        , r = s.win.w
        , a = s.win.h;
      for (let e = 0; e < 2; e++)
          for (let t = 0; t < this.planeL; t++) {
              var h, l, o, n, p, d = this.plane[t];
              d.zIndex === e && (h = d.lerp,
              o = d.ease,
              p = d.intro,
              l = h.x + p.x,
              o = h.y + o.y + p.y,
              n = h.w + p.w,
              p = h.h + p.h,
              l < r && 0 < l + n && o < a && 0 < o + p && (0 < h.opacity && 0 < p && 0 < n) && (i || s.mutating) ? (d.out && (d.out = !1),
              d.geo.draw(d)) : d.out || (d.out = !0,
              d.geo.draw(d)))
          }
  }
  unequal(t) {
      var e = t.prop
        , i = this.lerp.r6.includes(e) ? 6 : 2;
      return 0 !== R.R(Math.abs(t.a[e] - t.b[e]), i)
  }
}
export default PlaneTex;