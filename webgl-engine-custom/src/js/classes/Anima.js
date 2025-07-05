import ObjArr from "./ObjArr"

export default class Anima {
    constructor(t) {
        this.a = _A,
        this.delay = t.delay || 0;
        var e = t.lineStartTogether || !1
          , i = t.descendant
          , s = t.random || !1;
        let r = t.el;
        R.Is.und(r.length) && (r = [r]),
        this.lineL = r.length;
        var a = t.prop
          , t = (this.start = a[0][1],
        this.objLength = this.lineL,
        r[0].children);
        0 < i && 1 === this.lineL && 1 < t.length && (this.objLength = t.length),
        this.line = [];
        let h = 0;
        for (let t = 0; t < this.lineL; t++) {
            var l = 0 === i ? [r[t]] : r[t].children;
            this.line[t] = new ObjArr({
                length: this.lineL,
                objLength: this.objLength,
                indexStart: h,
                descendant: i,
                el: l,
                prop: a,
                delay: this.delay,
                random: s
            }),
            e || (h += this.line[t].objL)
        }
    }
    motion(t) {
        R.Is.def(this.letterAnim) && this.letterAnim.pause();
        var e = "show" === t.action
          , i = t.d;
        let s = R.Ease[t.e]
          , r = this.line
          , a = this.lineL;
        var h = r[0].obj[0].curr[0];
        let l = !1
          , o = (e || (l = this.start < 0 && 0 < h || 0 < this.start && h < 0 || Math.abs(h) < Math.abs(.3 * this.start)),
        t.delay);
        e && this.isRunning && (o = 0);
        for (let t = 0; t < a; t++)
            r[t].prepare({
                isShow: e,
                isRunning: this.isRunning,
                propEndIsEnd: l
            });
        h = e ? 1 - (this.objLength - 1) * this.delay : 1;
        return this.letterAnim = new R.M({
            delay: o,
            d: i / h,
            update: t => {
                var e = t.prog;
                for (let t = 0; t < a; t++)
                    r[t].loop({
                        prog: e,
                        rEase: s
                    })
            }
            ,
            cb: t => {
                this.isRunning = !1
            }
        }),
        {
            play: t => {
                this.isRunning = !0,
                this.letterAnim.play()
            }
        }
    }
}