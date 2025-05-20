class FxBack {
    constructor() {
        this.init();
    }

    init() {
        const backElements = R.G.class("w-back");
        this.backgroundElement = backElements[backElements.length - 1];
        
        this.animation = new Anima({
            descendant: 1,
            el: this.backgroundElement,
            prop: [["y", 110, -110]]  // Animation properties: [property, startValue, endValue]
        });
    }

    show(options) {
        const state = _A;
        const isLocalIntro = state.config.isLocal && state.introducing;
        const isMutation = options.mutation;
        
        // Set default animation timing
        let delay = options.delay;
        let duration = 1500;
        
        // Adjust timing for special cases
        if ((isMutation && state.fromBack) || isLocalIntro) {
            delay = 0;
            duration = 0;
        }
        
        // Create animation sequence
        const animationSequence = this.animation.motion({
            action: "show",
            d: duration,
            e: "o6",  // Easing function
            delay: delay,
            reverse: false
        });
        
        return {
            play: () => {
                // Prepare element for animation
                R.PE.all(this.backgroundElement);
                animationSequence.play();
            }
        };
    }

    hide(options) {
        const state = _A;
        const isMutation = options.mutation;
        
        // Set default animation timing
        let delay = options.delay;
        let duration = 500;
        
        // Adjust timing for special cases
        if (isMutation && state.fromBack) {
            delay = 0;
            duration = 0;
        }
        
        // Create animation sequence
        const animationSequence = this.animation.motion({
            action: "hide",
            d: duration,
            e: "o2",  // Easing function
            delay: delay,
            reverse: false
        });
        
        return {
            play: () => {
                // Hide element before animation
                R.PE.none(this.backgroundElement);
                animationSequence.play();
            }
        };
    }
}
export default FxBack;
