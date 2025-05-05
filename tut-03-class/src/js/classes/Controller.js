import parseData from "../parseData";
import Win from "./Win"
import Rotate from "./Rotate"
import { Router } from "../util/router";

export default class Controller {
  constructor(t) {
    var e = _A;
    e.is[404] || (e.mutating = !0,
      e.page = {},
      e.fromBack = !1,
      this.transitionM = t.transition.mutation,
      this.device = t.device,
      R.BM(this, ["eD"]),
      new Win(this.device),
      "m" === this.device && new Rotate,
      e.e = new t.engine,
      this.onPopstate(),
      R.L(document.body, "a", "click", this.eD),
      new t.transition.intro(t => {
        this.intro(t)
      }
      ))
  }
  onPopstate() {
    let e = document
      , i = "complete"
      , s = e.readyState !== i;
    onload = t => {
      setTimeout(t => {
        s = !1
      }
        , 0)
    }
      ,
      onpopstate = t => {
        s && e.readyState === i && (R.PD(t),
          t.stopImmediatePropagation());
        t = _A;
        R.Is.und(t.config.routes) || (t.mutating ? this.hPS() : (t.mutating = !0,
          this.out(location.pathname, "back")))
      }
  }
  eD(t) {
    var e, i, s = _A;
    let r = t.target
      , a = !1
      , h = !1;
    for (; r;) {
      var l = r.tagName;
      if ("A" === l) {
        a = !0;
        break
      }
      if (("INPUT" === l || "BUTTON" === l) && "submit" === r.type) {
        h = !0;
        break
      }
      r = r.parentNode
    }
    a ? (i = (e = r.href).substring(0, 3),
      r.hasAttribute("target") || "mai" === i || "tel" === i || (R.PD(t),
        s.mutating) || ((i = e.replace(/^.*\/\/[^/]+/, "")) !== s.route.new.url ? (s.mutating = !0,
          this.out(i, r)) : "nav-logo" === r.id && (location.href = "/"))) : h && R.PD(t)
  }
  intro(e) {
    let i = _A;
    R.Fetch({
      url: i.route.new.url + "?webp=" + i.webp + "&device=" + this.device,
      type: "html",
      success: t => {
        // t = JSON.parse(t);
        t = parseData,
          i.config.routes = t.routes,
          i.data = t.data,
          this.cache = t.cache,
          this.add(document.body, "afterbegin", t.body),
          this.main = R.G.id("main"),
          this.transitionM = new this.transitionM,
          e()
      }
    })
  }
  out(t, e) {
    Router(t);
    t = _A;
    t.target = e,
      t.fromBack = "back" === e,
      t.page.update = t => {
        this.in()
      }
      ,
      this.transitionM.out()
  }
  in() {
    var t = _A;
    let e = this.cache[t.route.new.url];
    document.title = e.title,
      "back" !== t.target && this.hPS(),
      t.page.insertNew = t => {
        this.add(this.main, "beforeend", e.html)
      }
      ,
      t.page.removeOld = t => {
        var e = this.main.children[0];
        e.parentNode.removeChild(e)
      }
      ,
      this.transitionM.in()
  }
  add(t, e, i) {
    t.insertAdjacentHTML(e, i)
  }
  hPS() {
    var t = _A.route.new.url;
    history.pushState({
      page: t
    }, "", t)
  }
}

