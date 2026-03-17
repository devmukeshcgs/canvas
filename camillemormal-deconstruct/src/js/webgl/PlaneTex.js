import Geo from "./Geo.js";
import Plane from "./Plane.js";

export default class PlaneTex {
    constructor(t) {
        const program = t.p;
        const texArr = _A.rgl.renderer.texture.tex[t.url];
        const texArrL = texArr.length;

        this.planeL = texArrL;
        if (R.Is.def(t.isHomeLarge)) this.planeL = this.planeL * this.planeL;

        const pts = { h: 2, v: 2 };

        this.lerp = {
            prop: ["x", "y", "w", "h", "scale", "opacity", "pY"],
            r6: ["scale", "opacity", "pY"],
        };
        this.lerp.propL = this.lerp.prop.length;

        const lerpDefaults = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            opacity: 1,
            scale: 1,
            pY: 0,
            pX: 0,
        };

        const easeDefaults = { y: 0, pY: 0, scale: 0 };
        const introDefaults = { x: 0, y: 0, w: 0, h: 0, scale: 0 };

        R.BM(this, ["unequal"]);

        this.plane = [];
        for (let i = 0; i < this.planeL; i++) {
            const tex = texArr[i % texArrL];
            const el = tex.element;
            const w = el.width;
            const h = el.height;

            const p = {
                pts,
                zIndex: 0,
                lerp: { ...lerpDefaults },
                ease: { ...easeDefaults },
                intro: { ...introDefaults },
                tex,
                media: {
                    obj: el,
                    dimension: { width: w, height: h },
                    ratio: { wh: w / h, hw: h / w },
                },
                out: false,
                geo: new Geo({
                    program,
                    mode: "TRIANGLE_STRIP",
                    face: "FRONT",
                    attrib: {
                        c: { size: 2 },
                        index: { size: 1 },
                        f: { size: 2, tex: tex.attrib },
                    },
                }),
            };

            const plane = Plane({ p, tex: true });
            const attrib = p.geo.attrib;
            attrib.c.data = new Float32Array(plane.pos);
            attrib.index.data = new Uint16Array(plane.index);
            attrib.f.data = new Float32Array(plane.texture);
            p.geo.setVAO();

            this.plane[i] = p;
        }
    }

    draw(force) {
        const app = _A;
        const winW = app.win.w;
        const winH = app.win.h;

        for (let z = 0; z < 2; z++) {
            for (let i = 0; i < this.planeL; i++) {
                const p = this.plane[i];
                if (p.zIndex !== z) continue;

                const l = p.lerp;
                const e = p.ease;
                const intro = p.intro;

                const x = l.x + intro.x;
                const y = l.y + e.y + intro.y;
                const w = l.w + intro.w;
                const h = l.h + intro.h;

                const inView = x < winW && 0 < x + w && y < winH && 0 < y + h;
                const visible = 0 < l.opacity && 0 < h && 0 < w;

                if (inView && visible && (force || app.mutating)) {
                    if (p.out) p.out = false;
                    p.geo.draw(p);
                } else if (!p.out) {
                    p.out = true;
                    p.geo.draw(p);
                }
            }
        }
    }

    unequal(t) {
        const prop = t.prop;
        const r = this.lerp.r6.includes(prop) ? 6 : 2;
        return 0 !== R.R(Math.abs(t.a[prop] - t.b[prop]), r);
    }
}

