export default class GLData {
    init() {
        var t = _A
          , t = (this.url = t.route.new.url,
        t.rgl._);
        this.largeL = t.large.planeL,
        this.smallL = t.small.planeL
    }
    resize() {
        var t = _A
          , e = t.win
          , e = (this.winW = e.w,
        this.winH = e.h,
        t.isOver169 ? t.winHpsdH : t.winWpsdW)
          , t = R.R(76 * e, 0)
          , i = R.R(9 * t / 16);
        this.in = {
            large: {
                x: -1,
                y: -1,
                w: this.winW + 2,
                h: this.winH + 2
            },
            small: {
                x: R.R(this.winW - 40 - t, 0),
                y: R.R(this.winH - 40 - i, 0),
                w: t,
                h: i,
                gap: {
                    x: R.R(5 * e, 0)
                }
            }
        },
        this.out = {
            gap: {
                x: R.R(30 * e, 0)
            },
            w: R.R(350 * e, 0),
            h: R.R(500 * e, 0)
        },
        this.out.y = .5 * (this.winH - this.out.h),
        this.out.x = .5 * (this.winW - this.out.w),
        this.out.gapXW = this.out.w + this.out.gap.x,
        this.out.max = this.out.w * (this.smallL - 1) + this.out.gap.x * (this.smallL - 1)
    }
    _in(t) {
        var e = _A.index
          , i = this.in.large
          , s = this.in.small
          , r = t.delay
          , a = [];
        for (let t = 0; t < this.largeL; t++) {
            var h = t % this.smallL
              , l = Math.floor(t / this.smallL)
              , o = a[t] = {
                scale: 1,
                opacity: 1,
                pY: 0,
                _delay: 0
            };
            r && (o._delay = 40 * Math.max(Math.abs(h - e) - 1, 0)),
            l === e ? (o.y = i.y,
            o.h = i.h,
            h === e ? (o.x = i.x,
            o.w = i.w) : (o.x = h < e ? i.x : i.x + i.w,
            o.w = 0)) : (o.x = s.x - (s.w + s.gap.x) * (this.smallL - 1 - l),
            o.y = s.y,
            o.h = s.h,
            o.w = h === l ? s.w : 0)
        }
        var n = [];
        for (let t = 0; t < this.smallL; t++) {
            var p = n[t] = {};
            p.x = s.x - (s.w + s.gap.x) * (this.smallL - 1 - t),
            p.w = s.w,
            p.h = s.h,
            p.scale = 1,
            p.opacity = 1,
            t === e ? p.y = s.y : p.y = this.winH + s.gap.x,
            p.pY = 0,
            p._delay = 0,
            r && (p._delay = 240)
        }
        return {
            large: a,
            small: n
        }
    }
    _out(t) {
        var e = _A.index
          , i = this.in.small
          , s = this.out
          , r = t.delay
          , a = [];
        for (let t = 0; t < this.largeL; t++) {
            var h = t % this.smallL
              , l = Math.floor(t / this.smallL)
              , o = a[t] = {};
            o.y = s.y,
            h === l ? (o.w = s.w,
            o.x = s.x + (s.w + s.gap.x) * l) : (o.w = 0,
            o.x = e < h ? s.x + (s.w + s.gap.x) * l + s.w : s.x + (s.w + s.gap.x) * l),
            o.h = s.h,
            o.scale = 1.25,
            o.opacity = 1,
            o.pY = 0,
            o._delay = 0,
            r && (o._delay = l === e ? 0 : 40 * h)
        }
        var n = [];
        for (let t = 0; t < this.smallL; t++) {
            var p = n[t] = {};
            p.x = i.x - (i.w + i.gap.x) * (this.smallL - 1 - t),
            p.y = this.winH + i.gap.x,
            p.w = i.w,
            p.h = i.h,
            p.scale = 1,
            p.opacity = 1,
            p.pY = 0,
            p._delay = 0
        }
        return {
            large: a,
            small: n
        }
    }
}