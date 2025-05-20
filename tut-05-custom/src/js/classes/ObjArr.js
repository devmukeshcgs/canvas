import Obj from "./Obj"
export default class ObjArr {
    constructor(t) {
        this.a = _A,
        this.delay = t.delay;
        var e = t.el
          , i = t.descendant
          , s = t.prop
          , r = t.indexStart
          , a = (this.random = t.random,
        this.length = t.length,
        this.element = [],
        this.elementL = [],
        this.obj = [],
        this.objL = e.length,
        this.randUniq = [],
        t.objLength);
        for (let t = 0; t < this.objL; t++)
            this.element[t] = 2 === i ? e[t].children : [e[t]],
            this.elementL[t] = this.element[t].length,
            this.obj[t] = new Obj({
                index: r + t,
                length: a,
                delay: this.delay,
                prop: s
            }),
            this.randUniq[t] = t
    }
    prepare(e) {
        !e.isRunning && this.random && (this.randUniq = R.Rand.uniq(this.objL));
        for (let t = 0; t < this.objL; t++)
            this.obj[t].prepare(e)
    }
    loop(t) {
        var e = t.prog
          , i = t.rEase;
        for (let t = 0; t < this.objL; t++)
            this.obj[t].loop({
                el: this.element[this.randUniq[t]],
                elL: this.elementL[t],
                prog: e,
                rEase: i
            })
    }
}