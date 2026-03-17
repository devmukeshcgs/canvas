class PreviewS1 {
    constructor() {
        this.init();
    }

    init() {
        this.url = _A.route.new.url;
        
        // Get DOM elements
        const previewWrappers = R.G.class("w-preview-w");
        this.previewElement = previewWrappers[previewWrappers.length - 1];
        
        const previewAreas = R.G.class("w-preview-area");
        this.previewArea = previewAreas[previewAreas.length - 1];
        
        const sections = R.G.class("w-s");
        this.section = sections[sections.length - 1];
        
        this.calculateDimensions();
    }

    calculateDimensions() {
        const state = _A;
        const windowHeight = state.win.h;
        const windowWidth = state.win.w;
        
        // Get section margin for accurate positioning
        const sectionMarginTop = parseInt(getComputedStyle(this.section).marginTop, 10);
        
        const previewHeight = this.previewElement.offsetHeight;
        const sectionHeight = this.section.offsetHeight;
        
        // Calculate right spacing
        this.areaRight = windowWidth - 
                       (this.previewElement.getBoundingClientRect().left + 
                        this.previewElement.offsetWidth);
        
        // Calculate parallax distance
        this.parallaxDistance = Math.max(
            previewHeight + 2 * this.areaRight - windowHeight, 
            0
        );
        
        // Calculate height ratio for responsive scaling
        const heightRatio = previewHeight / sectionHeight;
        
        // Set preview area height
        this.previewArea.style.height = `${windowHeight * heightRatio + 7}px`;
        
        // Calculate scroll boundaries
        this.previewMaxScroll = sectionHeight - previewHeight;
        this.previewStartScroll = windowHeight + sectionMarginTop - this.areaRight;
        this.previewEndScroll = this.previewStartScroll + this.previewMaxScroll + this.parallaxDistance;
        
        // Calculate maximum area scroll
        this.areaMaxScroll = this.parallaxDistance > 0
            ? sectionHeight - (windowHeight - 2 * this.areaRight)
            : this.previewMaxScroll;
        
        this.areaMaxScroll *= heightRatio;
    }

    updatePosition() {
        const scrollPosition = _A.e.s._[this.url].step;
        
        if (scrollPosition < this.previewStartScroll) {
            // Before preview comes into view
            R.T(this.previewElement, 0, -R.R(scrollPosition), "px");
            R.T(this.previewArea, 0, -R.R(scrollPosition), "px");
        } 
        else if (scrollPosition >= this.previewStartScroll && 
                 scrollPosition <= this.previewEndScroll) {
            // During preview parallax effect
            const previewOffset = this.previewStartScroll + 
                R.Remap(
                    this.previewStartScroll, 
                    this.previewEndScroll, 
                    0, 
                    this.parallaxDistance, 
                    scrollPosition
                );
            
            const areaOffset = this.previewStartScroll - 
                R.Remap(
                    this.previewStartScroll, 
                    this.previewEndScroll, 
                    0, 
                    this.areaMaxScroll - this.parallaxDistance, 
                    scrollPosition
                );
            
            R.T(this.previewElement, 0, -R.R(previewOffset), "px");
            R.T(this.previewArea, 0, -R.R(areaOffset), "px");
        } 
        else if (scrollPosition > this.previewEndScroll) {
            // After preview parallax completes
            R.T(this.previewElement, 0, -R.R(scrollPosition - this.previewMaxScroll), "px");
            R.T(this.previewArea, 0, -R.R(scrollPosition - this.previewMaxScroll - this.areaMaxScroll), "px");
        }
    }

    // Alias for external compatibility
    resizeA() {
        this.calculateDimensions();
    }

    // Alias for external compatibility
    loop() {
        this.updatePosition();
    }
}
export default PreviewS1;
