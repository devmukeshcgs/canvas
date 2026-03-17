import Camera from "./Camera.js";
import Texture from "./Texture.js";

export default class Renderer {
    constructor(t) {
        this.gl = _A.rgl.gl;
        this.page = t.page;
        this.state = {
            depthTest: null,
            cullFace: null,
        };

        this.setBlendFunc();

        const ext = this.gl.getExtension("OES_vertex_array_object");
        const fns = ["create", "bind"];
        this.vertexArray = {};
        for (let i = 0; i < 2; i++) {
            const name = fns[i];
            this.vertexArray[name] = ext[name + "VertexArrayOES"].bind(ext);
        }

        this.programCurrId = null;
        this.viewport = { width: null, height: null };

        this.camera = new Camera();
        this.texture = new Texture(this.gl);
        this.texture.run(t.cb);
    }

    setFaceCulling(face) {
        if (this.state.cullFace !== face) {
            this.state.cullFace = face;
            this.gl.enable(this.gl.CULL_FACE);
            this.gl.cullFace(this.gl[face]);
        }
    }

    setBlendFunc() {
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFuncSeparate(
            this.gl.SRC_ALPHA,
            this.gl.ONE_MINUS_SRC_ALPHA,
            this.gl.ONE,
            this.gl.ONE_MINUS_SRC_ALPHA
        );
    }

    resize() {
        const app = _A;
        const win = app.win;
        const pixelRatio = win.w > 600 ? 1.5 : 3;

        this.width = win.w;
        this.height = win.h;
        this.gl.canvas.width = this.width * pixelRatio;
        this.gl.canvas.height = this.height * pixelRatio;

        this.camera.resize({
            aspect: this.gl.canvas.width / this.gl.canvas.height,
        });

        app.rgl.clear();

        const w = this.width * pixelRatio;
        const h = this.height * pixelRatio;

        this.resizing = true;
        if (this.viewport.width !== w || this.viewport.height !== h) {
            this.viewport.width = w;
            this.viewport.height = h;
            this.gl.viewport(0, 0, w, h);
            this.viewMatrix = this.camera.render({ x: 0, y: 0, z: 0 });
        }
    }

    render(planes) {
        const app = _A;
        const route = app.route;
        const oldPage = route.old.page;
        const newPage = route.new.page;

        const newHasPlane = this.page.includes(newPage);
        const oldHasPlane = this.page.includes(oldPage);

        let shouldDraw = this.resizing || app.e.s.rqd;
        if (this.resizing) this.resizing = false;

        shouldDraw = shouldDraw || app.e.load.moving;
        if (!shouldDraw && oldHasPlane && app.e[oldPage].gl.moving) shouldDraw = true;
        if (!shouldDraw && newHasPlane && app.e[newPage].gl.moving) shouldDraw = true;

        const urls = [];
        if (oldHasPlane) {
            if (newHasPlane) urls.push(route.new.url);
            if (app.mutating || app.e[oldPage].gl.moving) urls.push(route.old.url);
        } else {
            if (app.e.load.moving) urls.push("load");
            if (newHasPlane) urls.push(route.new.url);
        }

        const l = urls.length;
        for (let i = 0; i < l; i++) {
            const u = urls[i];
            if (u === "/") {
                planes.large.draw(shouldDraw);
                planes.small.draw(shouldDraw);
            } else {
                planes[u].draw(shouldDraw);
            }
        }
    }
}

