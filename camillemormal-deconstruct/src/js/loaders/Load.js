export default class Load {
    constructor() {
        this.moving = false;
    }

    intro() {
        const app = _A;
        this.url = app.route.new.url;
        this.isHome = app.is.ho;
        this.isWork = app.is.wo;
        this.isAbout = app.is.ab;

        const planes = app.rgl._;
        const load = planes.load;

        this.texLoad = load.plane;
        this.texL = load.planeL;
        this.tex = [];
        this.y = [];

        if (this.isHome) {
            this.texLarge = planes.large.plane;
            this.texMain = this.texLarge[0];
        } else if (this.isWork) {
            this.texMain = planes[this.url].plane[0];
        } else if (this.isAbout) {
            this.texMain = this.texLoad[12];
        }

        if (this.isHome) {
            const small = planes.small;
            this.texSmall = small.plane;
            this.texSmallL = small.planeL;
        }

        this.resizeA();
    }

    resizeA() {
        const app = _A;
        if (!app.introducing) return;

        const e = app.win.w;
        const i = app.win.h;
        let s = 30 * app.winWpsdW;
        const r = (e - 4 * s) / 4;
        const a = (r * i) / e;
        const h = a + s;
        const l = r + s;
        const o = 0.5 * h;
        const n = i + 0.5 * (5 * a + 4 * s - i);
        const p = 12 * a;
        const d = e + 2;
        const c = i + 2;
        s = (s * d) / r;
        const g = c + s;
        const u = d + s;

        for (let t = 0; t < this.texL; t++) {
            const m = t === 12;
            let v = Math.floor(t / 5);
            const f = v % 2 == 1;
            v = v - 2;
            const Rabs = Math.abs(v);
            const xMod = t % 5;
            const w = xMod - 2;

            const yy = (this.y[t] = f ? -(n - o + (4 - xMod) * p + Rabs * a + 20) : n + xMod * p + Rabs * a + 20);
            const x0 = 0.5 * (e - r) + v * l;
            const lerpX = 0.5 * (e - d) + v * u;
            const lerpY = 0.5 * (i - c) + w * g - (f ? 0.5 * g : 0);

            this.tex[t] = {
                x: x0 - lerpX,
                y: 0.5 * (i - a) + w * h - (f ? o : 0) - lerpY,
                w: r - d,
                h: a - c,
                scale: m ? 0.5 : 0,
            };

            const plane = m ? this.texMain : this.texLoad[t];
            plane.lerp.x = lerpX;
            plane.lerp.y = lerpY;
            plane.lerp.w = d;
            plane.lerp.h = c;
            plane.intro.x = this.tex[t].x;
            plane.intro.y = this.tex[t].y;
            plane.intro.w = this.tex[t].w;
            plane.intro.h = this.tex[t].h;
            plane.intro.scale = this.tex[t].scale;
            // keep yy referenced (original code uses it later in fx)
            void yy;
        }

        if (this.isHome) {
            const small = app.e.ho.gl.data.in.small;
            this.bottomY = i + small.gap.x - small.y;
        }
    }

    fx(t) {
        const isLocal = _A.config.isLocal;
        if (this.isHome) {
            for (let i = 0; i < this.texSmallL; i++) {
                (i === 0 ? this.texSmall : this.texLarge)[9 * i].intro.y = this.bottomY;
            }
        }

        let d = 5000;
        let delay = t.delay;
        if (isLocal) {
            d = 1;
            delay = 0;
        }

        const easeA = R.Ease4([0.8, 0, 0.1, 1]);
        const easeB = R.Ease4([0.72, 0, 0.11, 1]);

        const r = (this.introFx = new R.M({
            d,
            e: "linear",
            delay,
            update: (v) => {
                this.moving = true;
                const prog = v.prog;
                const e1 = easeA(R.iLerp(0, 0.65, prog));
                const e2 = easeB(R.iLerp(0.4, 1, prog));

                for (let i = 0; i < this.texL; i++) {
                    const s = i === 12 ? this.texMain : this.texLoad[i];
                    const yy = R.Lerp(this.y[i], 0, e1);
                    s.intro.x = R.Lerp(this.tex[i].x, 0, e2);
                    s.intro.y = R.Lerp(this.tex[i].y, 0, e2) + yy;
                    s.intro.w = R.Lerp(this.tex[i].w, 0, e2);
                    s.intro.h = R.Lerp(this.tex[i].h, 0, e2);
                    s.intro.scale = R.Lerp(this.tex[i].scale, 0, e2);
                }
            },
            cb: () => {
                this.moving = false;
            },
        }),
        []);

        if (this.isHome) {
            let d2 = 1500;
            let delay2 = 3200;
            let stepDelay = 50;
            if (isLocal) {
                d2 = 1;
                delay2 = 0;
                stepDelay = 0;
            }
            for (let i = 0; i < this.texSmallL; i++) {
                r[i] = new R.M({
                    d: d2,
                    e: "o6",
                    delay: delay2 + stepDelay * i,
                    update: (v) => {
                        this.moving = true;
                        (i === 0 ? this.texSmall : this.texLarge)[9 * i].intro.y = R.Lerp(this.bottomY, 0, v.progE);
                    },
                    cb: () => {
                        this.moving = false;
                    },
                });
            }
        }

        return {
            play: () => {
                this.introFx.play();
                if (this.isHome) for (let i = 0; i < this.texSmallL; i++) r[i].play();
            },
        };
    }
}

