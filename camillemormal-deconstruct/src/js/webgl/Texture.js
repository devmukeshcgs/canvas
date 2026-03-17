export default class Texture {
    constructor(gl) {
        this.gl = gl;
        this.tex = {};
    }

    run(cb) {
        const app = _A;
        this.cb = cb;
        const route = app.route;
        const url = route.new.url;

        this.dom = R.G.id("load-no").children[0];
        this.no = 0;
        this.prevNo = 0;

        R.BM(this, ["loop"]);
        this.raf = new R.RafR(this.loop);

        const data = app.data;
        const keys = Object.keys(data);
        const keyL = keys.length;

        this.texL = 0;
        for (let t = 0; t < keyL; t++) {
            const k = keys[t];
            const media = data[k];
            if ((media.preload || url === k)) {
                this.imgSet({
                    media,
                    url: k,
                    gl: true,
                    ext: false,
                });
            }
        }

        this.raf.run();
    }

    imgSet(t) {
        const extSuffix = t.ext ? "" : _A.img.jpg;
        const url = t.url;
        const isGl = t.gl;
        const media = t.media;
        const tex = media.tex;
        const texL = media.texL;

        if (isGl) this.tex[url] = [];

        for (let i = 0; i < texL; i++) {
            this.imgSetOne({
                src: tex[i] + extSuffix,
                index: i,
                url,
                gl: isGl,
            });
            this.texL++;
        }
    }

    imgSetOne(t) {
        const src = t.src;
        const url = t.url;
        const isGl = t.gl;
        const index = t.index;
        const img = new Image();

        img.onload = () => {
            if (isGl) {
                const attrib = this.texInit(img);
                this.tex[url][index] = {
                    attrib,
                    element: img,
                    type: "img",
                };
            }
            this.no++;
        };

        img.src = src;
    }

    texInit(img) {
        const gl = this.gl;
        const tex = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

        const params = [
            ["WRAP_S", "CLAMP_TO_EDGE"],
            ["WRAP_T", "CLAMP_TO_EDGE"],
            ["MIN_FILTER", "LINEAR"],
            ["MAG_FILTER", "LINEAR"],
        ];

        for (let t = 0; t < 4; t++) {
            gl.texParameteri(gl.TEXTURE_2D, gl["TEXTURE_" + params[t][0]], gl[params[t][1]]);
        }

        return tex;
    }

    loop() {
        if (this.no !== this.prevNo) {
            this.prevNo = this.no;
            this.dom.textContent = Math.round((100 / this.texL) * this.no) + "%";
        }

        if (this.no === this.texL) {
            this.raf.stop();
            this.cb();
        }
    }
}

