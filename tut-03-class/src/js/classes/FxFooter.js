class FxFooter {
    constructor() {
        const titleElement = R.G.class("w-footer-link-title")[0].children[0];
        const taglineElement = R.G.class("w-footer-link-tagline")[0].children[0];
        const experienceElement = R.G.class("w-footer-exp")[0].children[0];

        this.titleAnimation = new R.M({
            el: titleElement,
            p: { y: [0, -110] }
        });

        this.taglineAnimation = new R.M({
            el: taglineElement,
            p: { y: [0, -110] }
        });

        this.experienceAnimation = new R.M({
            el: experienceElement,
            p: { y: [0, -110] }
        });
    }

    hide({ mutation, delay }) {
        const animations = {
            titleDelay: delay,
            taglineDelay: delay + 20,
            experienceDelay: delay + 26,
            duration: 600
        };

        if (mutation && _A.fromBack) {
            animations.titleDelay = 0;
            animations.taglineDelay = 0;
            animations.experienceDelay = 0;
            animations.duration = 0;
        }

        return {
            play: () => {
                this.titleAnimation.play({
                    d: animations.duration,
                    e: "i3",
                    delay: animations.titleDelay
                });

                this.taglineAnimation.play({
                    d: animations.duration,
                    e: "i3",
                    delay: animations.taglineDelay
                });

                this.experienceAnimation.play({
                    d: animations.duration,
                    e: "i3",
                    delay: animations.experienceDelay
                });
            }
        };
    }
}

export default FxFooter;
