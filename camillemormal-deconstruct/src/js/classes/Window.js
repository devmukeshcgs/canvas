class Window {
    constructor(deviceType) {
        // Initialize window dimensions in global _A object
        _A.win = {
            width: 0,
            height: 0
        };
        
        this.deviceType = deviceType;
        
        // Bind methods
        R.BM(this, ["resize"]);
        
        // Setup resize observer
        new R.ROR(this.resize).on();
        
        // Initial resize
        this.resize();
    }

    resize() {
        const app = _A;
        const windowWidth = innerWidth;
        const windowHeight = innerHeight;
        
        // Update window dimensions
        app.win = {
            width: windowWidth,
            height: windowHeight
        };
        
        // Calculate half dimensions
        app.winSemi = {
            width: 0.5 * windowWidth,
            height: 0.5 * windowHeight
        };
        
        // Calculate aspect ratio
        app.winRatio = {
            widthToHeight: windowWidth / windowHeight
        };
        
        // Check if wider than 16:9
        app.isOver169 = app.winRatio.widthToHeight > (16 / 9);
        
        // Get PSD dimensions for current device type
        const psdDimensions = app.config.psd[this.deviceType];
        
        // Store PSD dimensions
        app.psd = {
            height: psdDimensions.h,
            width: psdDimensions.w
        };
        
        // Calculate scaling ratios
        app.winWidthToPsdWidth = windowWidth / app.psd.width;
        app.winHeightToPsdHeight = windowHeight / app.psd.height;
        
        // Calculate special effect size (90% of window height)
        app.specialEffectSize = 0.9 * app.win.height;
    }
}