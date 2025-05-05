export default class LZ {
    initA() {
        var _STATE = _A;
        if (this.notRequired = !_STATE.is.wo,
        !this.notRequired) {
            this.url = _STATE.route.new.url,
            this.img = [],
            this.imgI = [];
            var t = R.G.class("page")
              , t = t[t.length - 1]
              , e = R.G.class("_lz", t);
            this.lzL = e.length;
            for (let t = 0; t < this.lzL; t++) {
                var i = e[t];
                this.img[t] = {
                    src: i.dataset.src,
                    dom: i
                }
            }
            for (let i = 0; i < this.lzL; i++)
                this.img[i].decode = !1,
                this.img[i].show = !1;
            this.resizeA()
        }
    }
    resizeA() {
        if (!this.notRequired) {
            var t = _A
              , e = t.engine.scroll._[this.url].step
              , i = t.win.h;
            for (let t = 0; t < this.lzL; t++) {
                var s = this.img[t].dom;
                R.Is.def(s) && (s = s.getBoundingClientRect().top + e,
                this.img[t].limit = {
                    decode: Math.max(s - 2 * i, 0),
                    show: Math.max(s - .8 * i, 0)
                })
            }
        }
    }
    loop() {
        if (!this.notRequired) {
            var e = _A.engine.scroll._[this.url].step;
            for (let t = 0; t < this.lzL; t++) {
                var i = this.img[t];
                e > i.limit.decode && !i.decode && (this.img[t].decode = !0,
                this.decode(t)),
                e > i.limit.show && !i.show && (this.img[t].show = !0,
                this.show(t))
            }
        }
    }
    show(t) {
        this.img[t].dom.classList.add("fx")
    }
    decode(t) {
        let e = this.img[t].dom
          , i = this.img[t].src;
        this.imgI[t] = new Image,
        this.imgI[t].src = i,
        this.imgI[t].decode().then(t => {
            R.Is.def(e) && (e.src = i,
            delete e.dataset.src)
        }
        )
    }
    off() {
        if (!this.notRequired) {
            var e = this.imgI.length;
            for (let t = 0; t < e; t++)
                R.Is.def(this.imgI[t]) && (this.imgI[t].src = "data:,")
        }
    }
}