export default class LZ {
    initA() {
        const t = _A;
        this.notRequired = !t.is.wo;
        if (this.notRequired) return;

        this.url = t.route.new.url;
        this.img = [];
        this.imgI = [];

        const pages = R.G.class("page");
        const page = pages[pages.length - 1];
        const els = R.G.class("_lz", page);
        this.lzL = els.length;

        for (let i = 0; i < this.lzL; i++) {
            const el = els[i];
            this.img[i] = { src: el.dataset.src, dom: el };
        }

        for (let i = 0; i < this.lzL; i++) {
            this.img[i].decode = false;
            this.img[i].show = false;
        }

        this.resizeA();
    }

    resizeA() {
        if (this.notRequired) return;

        const t = _A;
        const step = t.e.s._[this.url].step;
        const h = t.win.h;

        for (let i = 0; i < this.lzL; i++) {
            let dom = this.img[i].dom;
            if (R.Is.def(dom)) {
                const top = dom.getBoundingClientRect().top + step;
                this.img[i].limit = {
                    decode: Math.max(top - 2 * h, 0),
                    show: Math.max(top - 0.8 * h, 0),
                };
            }
        }
    }

    loop() {
        if (this.notRequired) return;

        const step = _A.e.s._[this.url].step;
        for (let i = 0; i < this.lzL; i++) {
            const img = this.img[i];
            if (step > img.limit.decode && !img.decode) {
                this.img[i].decode = true;
                this.decode(i);
            }
            if (step > img.limit.show && !img.show) {
                this.img[i].show = true;
                this.show(i);
            }
        }
    }

    show(i) {
        this.img[i].dom.classList.add("fx");
    }

    decode(i) {
        const dom = this.img[i].dom;
        const src = this.img[i].src;

        this.imgI[i] = new Image();
        this.imgI[i].src = src;
        this.imgI[i].decode().then(() => {
            if (R.Is.def(dom)) {
                dom.src = src;
                delete dom.dataset.src;
            }
        });
    }

    off() {
        if (this.notRequired) return;

        const l = this.imgI.length;
        for (let i = 0; i < l; i++) {
            if (R.Is.def(this.imgI[i])) this.imgI[i].src = "data:,";
        }
    }
}

