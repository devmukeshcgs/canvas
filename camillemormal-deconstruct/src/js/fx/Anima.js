class Obj {
    constructor(t) {
        const index = t.index;
        const delay = t.delay;

        this.propArr = t.prop;
        this.propArrL = this.propArr.length;
        this.prop = [];
        this.prog = {
            show: {
                start: index * delay,
                end: 1 - (t.length - 1 - index) * delay,
            },
            hide: {
                start: 0,
                end: 1,
            },
        };
        this.curr = [];

        for (let i = 0; i < this.propArrL; i++) {
            const p = this.propArr[i];
            this.curr[i] = p[1];
            this.prop[i] = {
                round: p[0] === "y" || p[0] === "x" ? 3 : 6,
            };
        }
    }

    prepare(e) {
        this.isShow = e.isShow;
        const isRunning = e.isRunning;

        for (let i = 0; i < this.propArrL; i++) {
            const s = this.propArr[i];
            const origin = s[1];
            const endOrigin = s[2];

            if (s[0] === "opacity") {
                if (this.isShow) {
                    this.prop[i].start = isRunning ? this.curr[i] : origin;
                    this.prop[i].end = endOrigin;
                } else {
                    this.prop[i].start = this.curr[i];
                    this.prop[i].end = origin;
                }
            } else if (this.isShow) {
                this.prop[i].start = isRunning ? this.curr[i] : origin;
                this.prop[i].end = 0;
            } else {
                this.prop[i].start = this.curr[i];
                this.prop[i].end = e.propEndIsEnd ? endOrigin : origin;
            }
        }

        const p = this.isShow && !isRunning ? this.prog.show : this.prog.hide;
        this.prog.start = p.start;
        this.prog.end = p.end;
    }

    loop(t) {
        const el = t.el;
        const elL = t.elL;
        const tr = [0, 0];

        const prog = R.Remap(this.prog.start, this.prog.end, 0, 1, t.prog);
        const eased = t.rEase(prog);

        let rotate = "";
        let opacity = "";

        for (let i = 0; i < this.propArrL; i++) {
            const k = this.propArr[i][0];
            const p = this.prop[i];
            this.curr[i] = R.R(R.Lerp(p.start, p.end, eased), p.round);

            if (k === "y") tr[1] = this.curr[i];
            else if (k === "x") tr[0] = this.curr[i];
            else if (k === "rotateX") rotate = " rotateX(" + this.curr[i] + "deg)";
            else if (k === "opacity") opacity = this.curr[i];
        }

        for (let i = 0; i < elL; i++) {
            const st = el[i].style;
            st.transform = "translate3d(" + tr[0] + "%," + tr[1] + "%,0)" + rotate;
            if (opacity !== "") st.opacity = opacity;
        }
    }
}

class ObjArr {
    constructor(t) {
        this.a = _A;
        this.delay = t.delay;

        const el = t.el;
        const descendant = t.descendant;
        const prop = t.prop;
        const indexStart = t.indexStart;

        this.random = t.random;
        this.length = t.length;

        this.element = [];
        this.elementL = [];
        this.obj = [];
        this.objL = el.length;
        this.randUniq = [];

        const objLength = t.objLength;

        for (let i = 0; i < this.objL; i++) {
            this.element[i] = descendant === 2 ? el[i].children : [el[i]];
            this.elementL[i] = this.element[i].length;
            this.obj[i] = new Obj({
                index: indexStart + i,
                length: objLength,
                delay: this.delay,
                prop,
            });
            this.randUniq[i] = i;
        }
    }

    prepare(e) {
        if (!e.isRunning && this.random) this.randUniq = R.Rand.uniq(this.objL);
        for (let i = 0; i < this.objL; i++) this.obj[i].prepare(e);
    }

    loop(t) {
        const prog = t.prog;
        const rEase = t.rEase;
        for (let i = 0; i < this.objL; i++) {
            this.obj[i].loop({
                el: this.element[this.randUniq[i]],
                elL: this.elementL[i],
                prog,
                rEase,
            });
        }
    }
}

export default class Anima {
    constructor(t) {
        this.a = _A;
        this.delay = t.delay || 0;

        const lineStartTogether = t.lineStartTogether || false;
        const descendant = t.descendant;
        const random = t.random || false;

        let r = t.el;
        if (R.Is.und(r.length)) r = [r];

        this.lineL = r.length;
        const prop = t.prop;
        this.start = prop[0][1];

        this.objLength = this.lineL;
        const children = r[0].children;
        if (0 < descendant && this.lineL === 1 && 1 < children.length) this.objLength = children.length;

        this.line = [];
        let indexStart = 0;
        for (let i = 0; i < this.lineL; i++) {
            const els = descendant === 0 ? [r[i]] : r[i].children;
            this.line[i] = new ObjArr({
                length: this.lineL,
                objLength: this.objLength,
                indexStart,
                descendant,
                el: els,
                prop,
                delay: this.delay,
                random,
            });
            if (!lineStartTogether) indexStart += this.line[i].objL;
        }
    }

    motion(t) {
        if (R.Is.def(this.letterAnim)) this.letterAnim.pause();

        const isShow = t.action === "show";
        const d = t.d;
        const rEase = R.Ease[t.e];

        const lines = this.line;
        const lineL = this.lineL;

        const h = lines[0].obj[0].curr[0];
        let propEndIsEnd = false;
        let delay = t.delay;

        if (!isShow) {
            propEndIsEnd =
                (this.start < 0 && 0 < h) ||
                (0 < this.start && h < 0) ||
                Math.abs(h) < Math.abs(0.3 * this.start);
        }

        if (isShow && this.isRunning) delay = 0;

        for (let i = 0; i < lineL; i++) {
            lines[i].prepare({
                isShow,
                isRunning: this.isRunning,
                propEndIsEnd,
            });
        }

        const denom = isShow ? 1 - (this.objLength - 1) * this.delay : 1;

        this.letterAnim = new R.M({
            delay,
            d: d / denom,
            update: (v) => {
                const prog = v.prog;
                for (let i = 0; i < lineL; i++) {
                    lines[i].loop({ prog, rEase });
                }
            },
            cb: () => {
                this.isRunning = false;
            },
        });

        return {
            play: () => {
                this.isRunning = true;
                this.letterAnim.play();
            },
        };
    }
}

