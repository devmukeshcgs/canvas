import { create, identity, multiplyFn, scaleFn, translateFn } from "./math/mat4.js";

export default class Geo {
    constructor(t) {
        const rgl = _A.rgl;
        this.gl = rgl.gl;
        this.renderer = rgl.renderer;
        this.program = t.program;
        this.mode = t.mode;
        this.face = t.face;
        this.attrib = t.attrib;

        this.renderer.vertexArray.bind(null);
        this.program.getL(this.attrib, "Attrib");
        this.modelMatrix = create();
    }

    setVAO() {
        const r = this.renderer;
        this.vao = r.vertexArray.create();
        r.vertexArray.bind(this.vao);
        this.setAttrib();
        r.vertexArray.bind(null);
    }

    setAttrib() {
        const gl = this.gl;
        for (const k in this.attrib) {
            if (R.Has(this.attrib, k)) {
                const a = this.attrib[k];
                const isIndex = k === "index";
                const ctor = a.data.constructor;

                if (ctor === Float32Array) a.type = gl.FLOAT;
                else if (ctor === Uint16Array) a.type = gl.UNSIGNED_SHORT;
                else a.type = gl.UNSIGNED_INT;

                a.count = a.data.length / a.size;
                a.target = isIndex ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
                a.normalize = false;

                gl.bindBuffer(a.target, gl.createBuffer());
                gl.bufferData(a.target, a.data, gl.STATIC_DRAW);

                if (!isIndex) {
                    gl.enableVertexAttribArray(a.location);
                    gl.vertexAttribPointer(a.location, a.size, a.type, a.normalize, 0, 0);
                }
            }
        }
    }

    draw(t) {
        const gl = this.gl;
        const r = this.renderer;

        r.setFaceCulling(this.face);
        this.program.run();

        this.modelMatrix = identity(this.modelMatrix);
        let m = multiplyFn(this.modelMatrix, r.viewMatrix);

        const lerp = t.lerp;
        const ease = t.ease;
        const intro = t.intro;

        const x = lerp.x + intro.x;
        const y = lerp.y + ease.y + intro.y;
        const w = lerp.w + intro.w;
        const h = lerp.h + intro.h;
        const sc = lerp.scale + intro.scale + ease.scale;

        m = scaleFn(translateFn(m, [x, -y, 0]), [w, h, 1]);

        const u = this.program.uniform;
        let d = 1;
        let c = t.media.ratio.wh / (w / h || 1);
        if (c < 1) {
            d = 1 / c;
            c = 1;
        }

        u.d.value = [c * sc, d * sc];
        u.e.value = [lerp.pX, (lerp.pY + ease.pY) / d];
        u.h.value = m;

        this.program.setUniform();

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.attrib.f.tex);
        r.vertexArray.bind(this.vao);
        const idx = this.attrib.index;
        gl.drawElements(gl[this.mode], idx.count, idx.type, 0);
    }
}

