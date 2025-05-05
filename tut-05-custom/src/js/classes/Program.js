let ID = 1;
class Program {
    constructor(t) {
        var e = _A.rgl;
        this.gl = e.gl,
        this.renderer = e.renderer,
        this.uniform = t.uniform || {},
        this.id = ID++,
        this.program = this.crP();
        let i = this.uniform;
        i.g = {
            type: "Matrix4fv"
        },
        i.h = {
            type: "Matrix4fv"
        },
        this.getL(i, "Uniform"),
        e.uProjectionMatrix = t => {
            i.g.value = t
        }
    }
    crP() {
        var t = this.gl
          , e = this.crS("precision highp float;attribute vec2 c;attribute vec2 f;varying vec2 a;uniform vec2 d;uniform vec2 e;uniform mat4 g;uniform mat4 h;void main(){gl_Position=g*h*vec4(c.x,c.y,0,1);a=(f-.5)/d+.5+e;}", t.VERTEX_SHADER)
          , i = this.crS("precision highp float;varying vec2 a;uniform sampler2D b;void main(){gl_FragColor=texture2D(b,a);}", t.FRAGMENT_SHADER)
          , s = t.createProgram();
        return t.attachShader(s, e),
        t.attachShader(s, i),
        t.linkProgram(s),
        t.deleteShader(e),
        t.deleteShader(i),
        s
    }
    crS(t, e) {
        e = this.gl.createShader(e);
        return this.gl.shaderSource(e, t),
        this.gl.compileShader(e),
        e
    }
    getL(t, e) {
        for (var i in t)
            R.Has(t, i) && (t[i].location = this.gl["get" + e + "Location"](this.program, i))
    }
    setUniform() {
        for (var t in this.uniform) {
            var e, i;
            R.Has(this.uniform, t) && (e = (t = this.uniform[t]).location,
            i = "uniform" + t.type,
            "Matrix" === t.type.substring(0, 6) ? this.gl[i](e, !1, t.value) : this.gl[i](e, t.value))
        }
    }
    run() {
        this.renderer.programCurrId !== this.id && (this.gl.useProgram(this.program),
        this.renderer.programCurrId = this.id)
    }
}

export default Program;
