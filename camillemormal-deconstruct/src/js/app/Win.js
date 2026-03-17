export default class Win {
    constructor(device) {
        _A.win = { w: 0, h: 0 };
        this.d = device;
        R.BM(this, ["resize"]);
        new R.ROR(this.resize).on();
        this.resize();
    }

    resize() {
        const app = _A;
        const w = innerWidth;
        const h = innerHeight;

        app.win = { w, h };
        app.winSemi = { w: 0.5 * w, h: 0.5 * h };
        app.winRatio = { wh: w / h };
        app.isOver169 = app.winRatio.wh > 16 / 9;

        const psd = app.config.psd[this.d];
        app.psd = { h: psd.h, w: psd.w };

        app.winWpsdW = w / app.psd.w;
        app.winHpsdH = h / app.psd.h;
        app.sFxS = 0.9 * app.win.h;
    }
}

