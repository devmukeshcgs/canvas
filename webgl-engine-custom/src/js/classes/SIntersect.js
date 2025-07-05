export default class SIntersect {
    constructor() {
        var t = _A;
        if (this.arr = [],
        this.arrL = 0,
        this.notRequired = t.is.ho,
        !this.notRequired) {
            this.isWork = t.is.wo;
            var i = t.is.ab
              , t = t.route.new
              , t = (this.url = t.url,
            R.G.class("page"));
            let e = t[t.length - 1].children;
            var s = (e = i ? e[0].children : e).length;
            for (let t = 0; t < s; t++) {
                var r = e[t];
                if (r.classList.contains("w-s")) {
                    var a = r.children
                      , h = a.length;
                    for (let t = 0; t < h; t++)
                        this.arr[this.arrL] = {
                            dom: a[t],
                            inside: {}
                        },
                        this.arrL++
                } else
                    r.classList.contains("_ns") || (this.arr[this.arrL] = {
                        dom: r,
                        inside: {}
                    },
                    this.arrL++)
            }
            this.resize()
        }
    }
    resize() {
        if (!this.notRequired) {
            let t = _A;
            var e = this.isWork ? "step" : "curr"
              , i = R.R(t.engine.scroll._[this.url][e])
              , s = t.win.h;
            for (let e = 0; e < this.arrL; e++) {
                let t = this.arr[e];
                this.draw(t, -i);
                var r = t.dom.getBoundingClientRect().top - i - s
                  , a = Math.min(r, 0) + t.dom.offsetHeight + s;
                t.inside.start = r,
                t.inside.end = a + Math.max(r, 0),
                t.isOut = !1
            }
            this.run()
        }
    }
    run() {
        if (!this.notRequired) {
            var t = this.isWork ? "step" : "curr"
              , e = R.R(_A.engine.scroll._[this.url][t]);
            for (let t = 0; t < this.arrL; t++) {
                var i = this.arr[t];
                e > i.inside.start && e <= i.inside.end ? (i.isOut && (i.isOut = !1),
                this.draw(i, e)) : i.isOut || (i.isOut = !0,
                this.draw(i, e))
            }
        }
    }
    draw(t, e) {
        R.T(t.dom, 0, R.R(-e), "px")
    }
}