class SFx {
    constructor() {
        this.init();
    }

    init() {
        this.url = _A.route.new.url;
        this.triggerElements = [];
        this.timelines = [];
        this.isVisible = [];
        this.visibilityThresholds = [];
        this.isFirstRun = true;
        
        // Initialize hero section elements
        this.heroElements = R.G.id("a-r-hero").children;
        this.heroElementCount = this.heroElements.length;
        this.heroTextLines = [];
        
        for (let i = 0; i < this.heroElementCount; i++) {
            this.heroTextLines[i] = new SLine({
                el: this.heroElements[i]
            });
        }

        // Initialize all section elements
        this.initializeSectionElements();
        this.resize();
    }

    initializeSectionElements() {
        // Experience section
        const experienceSection = R.G.id("a-r-experience");
        this.expHeading = R.G.tag("h2", experienceSection)[0].children[0];
        this.expItems = R.G.tag("ul", experienceSection)[0].children;
        this.expItemCount = this.expItems.length;

        // Recognition section
        const recognitionSection = R.G.id("a-r-recognition");
        this.recoHeading = R.G.tag("h2", recognitionSection)[0].children[0];
        this.recoItems = R.G.tag("ul", recognitionSection)[0].children;
        this.recoItemCount = this.recoItems.length;

        // Clients section
        const clientsSection = R.G.id("a-r-clients");
        this.clientsHeading = R.G.tag("h2", clientsSection)[0].children[0];
        this.clientsItems = R.G.tag("ul", clientsSection)[0].children;
        this.clientsItemCount = this.clientsItems.length;

        // Contact section
        const contactSection = R.G.id("a-r-contact");
        this.contactHeading = R.G.tag("h2", contactSection)[0].children[0];
        this.contactItems = R.G.tag("ul", contactSection)[0].children;
        this.contactItemCount = this.contactItems.length;

        // Credits section
        const creditsSection = R.G.id("a-r-credits");
        this.creditsHeading = R.G.tag("h2", creditsSection)[0].children[0];
        this.creditsItems = R.G.tag("ul", creditsSection)[0].children;
        this.creditsItemCount = this.creditsItems.length;
    }

    resize() {
        let elementIndex = 0;
        const defaultDuration = 1500;
        const easing = "o6";
        
        // Setup hero elements animations
        this.setupHeroAnimations(elementIndex, defaultDuration, easing);
        elementIndex += this.heroElementCount;
        
        // Setup section animations
        elementIndex = this.setupSectionAnimations(
            this.expHeading, 
            this.expItems, 
            this.expItemCount, 
            elementIndex, 
            defaultDuration, 
            easing
        );
        
        elementIndex = this.setupSectionAnimations(
            this.recoHeading, 
            this.recoItems, 
            this.recoItemCount, 
            elementIndex, 
            defaultDuration, 
            easing
        );
        
        elementIndex = this.setupSectionAnimations(
            this.clientsHeading, 
            this.clientsItems, 
            this.clientsItemCount, 
            elementIndex, 
            defaultDuration, 
            easing
        );
        
        elementIndex = this.setupSectionAnimations(
            this.contactHeading, 
            this.contactItems, 
            this.contactItemCount, 
            elementIndex, 
            defaultDuration, 
            easing
        );
        
        elementIndex = this.setupSectionAnimations(
            this.creditsHeading, 
            this.creditsItems, 
            this.creditsItemCount, 
            elementIndex, 
            defaultDuration, 
            easing
        );

        // Initialize visibility tracking
        this.triggerCount = this.triggerElements.length;
        if (this.isFirstRun) {
            for (let i = 0; i < this.triggerCount; i++) {
                this.isVisible[i] = false;
            }
            this.isFirstRun = false;
        }
    }

    setupHeroAnimations(elementIndex, duration, easing) {
        for (let i = 0; i < this.heroElementCount; i++) {
            this.triggerElements[elementIndex] = this.heroElements[i];
            
            const { delay, fromBack } = this.calculateThreshold(elementIndex);
            const animationDuration = fromBack ? 0 : duration;
            const subsequentDelay = fromBack ? 0 : 100;
            const yOffset = this.isVisible[elementIndex] ? 0 : 110;
            
            // Setup text line effects
            this.heroTextLines[i].resize({
                tag: {
                    start: `<span class="sfx-y"><span style="transform: translate3d(0,${yOffset}%,0);">`,
                    end: "</span></span>"
                }
            });
            
            const animatedElements = R.G.class("sfx-y", this.heroTextLines[i].el);
            const elementCount = animatedElements.length;
            
            if (!this.isVisible[elementIndex]) {
                this.timelines[elementIndex] = new R.TL();
                
                for (let j = 0; j < elementCount; j++) {
                    const currentDelay = j === 0 ? delay : subsequentDelay;
                    
                    this.timelines[elementIndex].from({
                        el: animatedElements[j].children[0],
                        p: {
                            y: [110, 0]
                        },
                        d: animationDuration,
                        e: easing,
                        delay: currentDelay
                    });
                }
            }
            elementIndex++;
        }
        return elementIndex;
    }

    setupSectionAnimations(heading, items, itemCount, elementIndex, duration, easing) {
        // Setup heading animation
        this.triggerElements[elementIndex] = heading;
        let { delay, fromBack } = this.calculateThreshold(elementIndex);
        const headingDuration = fromBack ? 0 : duration;
        
        if (!this.isVisible[elementIndex]) {
            this.timelines[elementIndex] = new R.TL();
            this.timelines[elementIndex].from({
                el: heading,
                p: {
                    y: [110, 0]
                },
                d: headingDuration,
                e: easing,
                delay: delay
            });
        }
        elementIndex++;
        
        // Setup items animations
        for (let i = 0; i < itemCount; i++) {
            this.triggerElements[elementIndex] = items[i];
            const { delay, fromBack } = this.calculateThreshold(elementIndex);
            const itemDuration = fromBack ? 0 : duration;
            const subsequentDelay = fromBack ? 0 : 100;
            
            const animatedElements = R.G.class("sfx-y", items[i]);
            const elementCount = animatedElements.length;
            
            if (!this.isVisible[elementIndex]) {
                this.timelines[elementIndex] = new R.TL();
                
                for (let j = 0; j < elementCount; j++) {
                    const currentDelay = j === 0 ? delay : subsequentDelay;
                    
                    this.timelines[elementIndex].from({
                        el: animatedElements[j].children[0],
                        p: {
                            y: [110, 0]
                        },
                        d: itemDuration,
                        e: easing,
                        delay: currentDelay
                    });
                }
            }
            elementIndex++;
        }
        
        return elementIndex;
    }

    loop() {
        const scrollPosition = _A.e.s._[this.url].curr;
        
        for (let i = 0; i < this.triggerCount; i++) {
            if (scrollPosition > this.visibilityThresholds[i] && !this.isVisible[i]) {
                this.isVisible[i] = true;
                this.timelines[i].play();
            }
        }
    }

    calculateThreshold(index) {
        const state = _A;
        const isLocalIntro = state.config.isLocal && state.introducing;
        const isFromBack = state.fromBack;
        
        const elementTop = this.triggerElements[index].getBoundingClientRect().top + 
                          state.e.s._[this.url].curr;
        const isAboveFold = elementTop < state.win.h;
        
        this.visibilityThresholds[index] = isAboveFold ? -1 : elementTop - state.sFxS;
        
        const delay = isAboveFold && !isFromBack && !isLocalIntro 
            ? 700 + 200 * index 
            : 0;
            
        return {
            fromBack: isAboveFold && isFromBack,
            delay: delay
        };
    }
}
export default SFx;
