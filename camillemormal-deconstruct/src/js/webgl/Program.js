let ID = 1;

export default class Program {
    constructor(t) {
        const rgl = _A.rgl;
        this.gl = rgl.gl;
        this.renderer = rgl.renderer;
        this.uniform = t.uniform || {};
        this.id = ID++;
        this.program = this.crP();

        const u = this.uniform;
        u.g = { type: "Matrix4fv" };
        u.h = { type: "Matrix4fv" };

        this.getL(u, "Uniform");

        rgl.uProjectionMatrix = (mat) => {
            u.g.value = mat;
        };
    }

    crP() {
        const gl = this.gl;
        const vs = this.crS(
            "precision highp float;attribute vec2 c;attribute vec2 f;varying vec2 a;uniform vec2 d;uniform vec2 e;uniform mat4 g;uniform mat4 h;void main(){gl_Position=g*h*vec4(c.x,c.y,0,1);a=(f-.5)/d+.5+e;}",
            gl.VERTEX_SHADER
        );
        const fs = this.crS(
            "precision highp float;varying vec2 a;uniform sampler2D b;void main(){gl_FragColor=texture2D(b,a);}",
            gl.FRAGMENT_SHADER
        );

        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return program;
    }

    crS(src, type) {
        const s = this.gl.createShader(type);
        this.gl.shaderSource(s, src);
        this.gl.compileShader(s);
        return s;
    }

    getL(obj, kind) {
        for (const k in obj) {
            if (R.Has(obj, k)) {
                obj[k].location = this.gl["get" + kind + "Location"](this.program, k);
            }
        }
    }

    setUniform() {
        for (const k in this.uniform) {
            if (R.Has(this.uniform, k)) {
                const u = this.uniform[k];
                const loc = u.location;
                const fn = "uniform" + u.type;
                if (u.type.substring(0, 6) === "Matrix") {
                    this.gl[fn](loc, false, u.value);
                } else {
                    this.gl[fn](loc, u.value);
                }
            }
        }
    }

    run() {
        if (this.renderer.programCurrId !== this.id) {
            this.gl.useProgram(this.program);
            this.renderer.programCurrId = this.id;
        }
    }
}

