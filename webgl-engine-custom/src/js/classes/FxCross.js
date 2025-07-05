export default class FxCross {
    init() {
        this.svg = R.G.id("h-cross").children,
        this.coord = {
            hide: ["11,11.75 11,11.75 11,10.249 11,10.249 11,11", "11.75,11 11.75,11 10.249,11 10.249,11 11,10.999"],
            show: ["22,11.751 0,11.751 0,10.249 22,10.249 22,11", "11.751,0 11.751,22 10.249,22 10.249,0 11,0"]
        },
        this.morph = [];
        for (let t = 0; t < 3; t++)
            this.morph[t] = []
    }
    middle(e) {
        var t = _A
          , i = "show" === e.a
          , s = t.config.isLocal && t.introducing;
        let r = e.delay
          , a = i ? 1200 : 250;
        var h = i ? "o6" : "o2";
        (e.mutation && t.fromBack || s) && (r = 0,
        a = 0);
        for (let t = 0; t < 2; t++)
            R.Is.def(this.morph[2][t]) && this.morph[2][t].pause(),
            this.morph[2][t] = new R.M({
                el: this.svg[2].children[0].children[t],
                svg: {
                    type: "polygon",
                    end: this.coord[e.a][t]
                },
                d: a,
                e: h,
                delay: r,
                r: 6
            });
        return {
            play: t => {
                for (let t = 0; t < 2; t++)
                    this.morph[2][t].play()
            }
        }
    }
    side(i) {
        var t = _A
          , e = "show" === i.a
          , s = t.config.isLocal && t.introducing;
        let r = i.delay
          , a = e ? 1200 : 250;
        var h = e ? "o6" : "o2";
        (i.mutation && t.fromBack || s) && (r = 0,
        a = 0);
        for (let e = 0; e < 2; e++)
            for (let t = 0; t < 2; t++)
                R.Is.def(this.morph[e][t]) && this.morph[e][t].pause(),
                this.morph[e][t] = new R.M({
                    el: this.svg[e].children[0].children[t],
                    svg: {
                        type: "polygon",
                        end: this.coord[i.a][t]
                    },
                    d: a,
                    e: h,
                    delay: r,
                    r: 6
                });
        return {
            play: t => {
                for (let e = 0; e < 2; e++)
                    for (let t = 0; t < 2; t++)
                        this.morph[e][t].play()
            }
        }
    }
}