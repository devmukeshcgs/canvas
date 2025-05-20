
class WorkPage {
    constructor() {
        // Initialize components
        this.gl = new GL();
        this.fxHero = new FxHero();
        this.fxFooter = new FxFooter();
        this.fxBack = new FxBack();
        this.preview = new Preview$1();

        // Determine whether the work module is required based on the current state
        this.notRequired = !_A.is.wo;
    }

    initB() {
        if (!this.notRequired) {
            this.gl.initB();
        }
    }

    initA() {
        if (!this.notRequired) {
            this.gl.initA();
            this.fxHero.init();
            this.fxFooter.init();
            this.fxBack.init();
            this.preview.init();
        }
    }

    resizeA() {
        if (!this.notRequired) {
            this.gl.resizeA();
            this.preview.resizeA();
            this.fxHero.resizeA();
        }
    }

    loop() {
        if (!this.notRequired || this.gl.moving) {
            this.gl.loop();
            this.preview.loop();
        }
    }
}

export default WorkPage