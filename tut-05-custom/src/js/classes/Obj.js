export default class Obj {
  constructor(t) {
      var e = t.index
        , i = t.delay;
      this.propArr = t.prop,
      this.propArrL = this.propArr.length,
      this.prop = [],
      this.prog = {
          show: {
              start: e * i,
              end: 1 - (t.length - 1 - e) * i
          },
          hide: {
              start: 0,
              end: 1
          }
      },
      this.curr = [];
      for (let t = 0; t < this.propArrL; t++) {
          var s = this.propArr[t];
          this.curr[t] = s[1],
          this.prop[t] = {
              round: "y" === s[0] || "x" === s[0] ? 3 : 6
          }
      }
  }
  prepare(e) {
      this.isShow = e.isShow;
      var i = e.isRunning;
      for (let t = 0; t < this.propArrL; t++) {
          var s = this.propArr[t]
            , r = s[1]
            , a = s[2];
          "opacity" === s[0] ? this.isShow ? (this.prop[t].start = i ? this.curr[t] : r,
          this.prop[t].end = a) : (this.prop[t].start = this.curr[t],
          this.prop[t].end = r) : this.isShow ? (this.prop[t].start = i ? this.curr[t] : r,
          this.prop[t].end = 0) : (this.prop[t].start = this.curr[t],
          this.prop[t].end = e.propEndIsEnd ? a : r)
      }
      var t = this.isShow && !i ? this.prog.show : this.prog.hide;
      this.prog.start = t.start,
      this.prog.end = t.end
  }
  loop(t) {
      var e = t.el
        , i = t.elL
        , s = [0, 0]
        , r = R.Remap(this.prog.start, this.prog.end, 0, 1, t.prog)
        , a = t.rEase(r);
      let h = ""
        , l = "";
      for (let t = 0; t < this.propArrL; t++) {
          var o = this.propArr[t][0]
            , n = this.prop[t];
          this.curr[t] = R.R(R.Lerp(n.start, n.end, a), n.round),
          "y" === o ? s[1] = this.curr[t] : "x" === o ? s[0] = this.curr[t] : "rotateX" === o ? h = " rotateX(" + this.curr[t] + "deg)" : "opacity" === o && (l = this.curr[t])
      }
      for (let t = 0; t < i; t++) {
          var p = e[t].style;
          p.transform = "translate3d(" + s[0] + "%," + s[1] + "%,0)" + h,
          "" !== l && (p.opacity = l)
      }
  }
}