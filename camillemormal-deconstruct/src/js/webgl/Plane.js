export default function Plane(t) {
    const p = t.p;
    const out = {};

    const h = p.pts.h;
    const v = p.pts.v;
    const r = h - 1;
    const a = v - 1;
    const stepH = 1 / r;
    const stepV = 1 / a;

    const pos = [];
    let n = 0;
    for (let y = 0; y < v; y++) {
        const py = y * stepV - 1;
        for (let x = 0; x < h; x++) {
            pos[n++] = x * stepH;
            pos[n++] = py;
        }
    }
    out.pos = pos;

    const index = [];
    let c = 0;
    const g = v - 1;
    const u = v - 2;
    const m = h - 1;
    for (let yy = 0; yy < g; yy++) {
        const base = h * yy;
        const next = base + h;
        for (let x = 0; x < h; x++) {
            const R = next + x;
            index[c++] = base + x;
            index[c++] = R;
            if (x === m && yy < u) {
                index[c++] = R;
                index[c++] = h * (yy + 1);
            }
        }
    }
    out.index = index;

    const tex = [];
    let w = 0;
    for (let y = 0; y < v; y++) {
        const ty = 1 - y / a;
        for (let x = 0; x < h; x++) {
            tex[w++] = x / r;
            tex[w++] = ty;
        }
    }
    out.texture = tex;

    return out;
}

