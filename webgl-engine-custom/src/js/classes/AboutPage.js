console.log("AboutPage");
class AboutPage {
    constructor() {
        // Initialize components
        this.fx = new Fx$2();
        this.sFx = new SFx();
        this.preview = new Preview();

        // Determine if the 'About' section is required
        this.notRequired = !_A.is.ab;
    }

    init() {
        if (!this.notRequired) {
            this.fx.init();
            this.sFx.init();
            this.preview.init();
        }
    }

    resize() {
        if (!this.notRequired) {
            this.sFx.resize();
            this.preview.resize();
        }
    }

    loop() {
        if (!this.notRequired) {
            this.sFx.loop();
            this.preview.loop();
        }
    }
}

export default AboutPage