export default class LZ {
    placeholderDataUri(w, h, label = "Missing image") {
        const W = Math.max(parseInt(w || 0, 10) || 1024, 1);
        const H = Math.max(parseInt(h || 0, 10) || 1024, 1);
        const safeLabel = String(label || "").slice(0, 120);
        const svg =
            `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
            `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
            `<stop offset="0" stop-color="#1b1b1b"/><stop offset="1" stop-color="#2b2b2b"/></linearGradient></defs>` +
            `<rect width="${W}" height="${H}" fill="url(#g)"/>` +
            `<rect x="2" y="2" width="${Math.max(W - 4, 1)}" height="${Math.max(H - 4, 1)}" fill="none" stroke="#444" stroke-width="4"/>` +
            `<g fill="#c9c9c9" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">` +
            `<text x="${W / 2}" y="${H / 2 - 8}" font-size="${Math.max(Math.min(W, H) / 14, 14)}">${safeLabel}</text>` +
            `<text x="${W / 2}" y="${H / 2 + 22}" font-size="${Math.max(Math.min(W, H) / 22, 12)}">${W}×${H}</text>` +
            `</g></svg>`;
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    }

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
        const img = this.imgI[i];
        img.src = src;
        img.decode()
            .then(() => {
                if (R.Is.def(dom)) {
                    dom.src = src;
                    delete dom.dataset.src;
                }
            })
            .catch(() => {
                // Avoid spamming decode errors every frame; fall back once.
                if (R.Is.def(dom)) {
                    const w = dom.getAttribute?.("width");
                    const h = dom.getAttribute?.("height");
                    dom.src = this.placeholderDataUri(w, h, "Missing image");
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

