export default class Win {
    
    constructor(t) {
        _A.win = {
            w: 0,
            h: 0
        },
        this.d = t,
        R.BM(this, ["resize"]),
        new R.ROR(this.resize).on(),
        this.resize()
    }
    resize() {
        var t = _A
            , e = innerWidth
            , i = innerHeight
            , s = (t.win = {
                w: e,
                h: i
            },
                t.winSemi = {
                    w: .5 * e,
                    h: .5 * i
                },
                t.winRatio = {
                    wh: e / i
                },
                t.isOver169 = t.winRatio.wh > 16 / 9,
                t.config.psd[this.d]);
        t.psd = {
            h: s.h,
            w: s.w
        },
            t.winWpsdW = e / t.psd.w,
            t.winHpsdH = i / t.psd.h,
            t.sFxS = .9 * t.win.h
    }
}