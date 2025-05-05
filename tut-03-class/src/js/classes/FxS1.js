import Page from "./Page";

class Fx$1 {
    constructor() {
        // Select elements for animations
        this.noElement = R.G.id("load-no").children[0];
        this.background = R.G.id("load-bg");
    }
    run() {
        // Determine animation duration
        let animationDuration = 1000;
        if (_A.config.isLocal) {
            animationDuration = 0; // Skip animation if in a local environment
        }

        // Create a new page instance for intro
        const introPage = new Page({ intro: true });

        // Setup timeline for animations
        const animationTimeline = new R.TL();
        animationTimeline.from({
            el: this.noElement,
            p: {
                y: [0, -110], // Move `noElement` upwards
            },
            d: animationDuration, // Set animation duration
            e: "i4", // Easing function
        });

        // Play animations
        introPage.play();
        animationTimeline.play();

        // Fade out the background
        R.O(this.background, 0);
    }
}

export default Fx$1;
