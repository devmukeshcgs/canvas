
export default class Active {
  constructor() {
    this.page = ["ho", "ab"]
  }
  intro() {
    this.nav = R.G.class("nav-a"),
      this.up()
  }
  up() {
    var t = _A
      , e = t.route.old.page
      , e = (e && this.upC(e, "remove"),
        t.route.new.page);
    this.upC(e, "add")
  }
  upC(t, e) {
    t = this.page.indexOf(t);
    -1 < t && (R.PE["add" === e ? "none" : "all"](this.nav[t]),
      this.nav[t].classList[e]("on"))
  }
}
