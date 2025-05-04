import { gsap } from 'gsap';

/**
 * Intro class handles the introduction/loading animations and transitions
 */
class Intro {
    constructor() {
        this.initialized = false;
        this.animations = [];
        this.elements = {};
        this.isPlaying = false;
        console.log("Intro");
        
    }

    /**
     * Initializes the intro animations
     */
    init() {
        if (this.initialized) return;
        
        this.initialized = true;
        this.setupElements();
        this.setupAnimations();
    }

    /**
     * Sets up DOM elements for intro animations
     */
    setupElements() {
        this.elements = {
            loader: document.querySelector('.loader'),
            logo: document.querySelector('.logo'),
            content: document.querySelector('.intro-content')
        };
    }

    /**
     * Sets up GSAP animations for the intro sequence
     */
    setupAnimations() {
        this.animations = [
            this.createLoaderAnimation(),
            this.createLogoAnimation(),
            this.createContentAnimation()
        ];
    }

    /**
     * Creates loader animation
     * @returns {GSAP.Timeline} The animation timeline
     */
    createLoaderAnimation() {
        return gsap.timeline({
            paused: true,
            defaults: { ease: 'power2.inOut' }
        })
        .from(this.elements.loader, {
            opacity: 0,
            scale: 0.8,
            duration: 0.8
        });
    }

    /**
     * Creates logo animation
     * @returns {GSAP.Timeline} The animation timeline
     */
    createLogoAnimation() {
        return gsap.timeline({
            paused: true,
            defaults: { ease: 'power2.out' }
        })
        .from(this.elements.logo, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.5
        });
    }

    /**
     * Creates content animation
     * @returns {GSAP.Timeline} The animation timeline
     */
    createContentAnimation() {
        return gsap.timeline({
            paused: true,
            defaults: { ease: 'power2.out' }
        })
        .from(this.elements.content, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 1
        });
    }

    /**
     * Plays the intro sequence
     * @param {Function} onComplete - Callback function to execute after completion
     */
    play(onComplete) {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        const masterTimeline = gsap.timeline({
            onComplete: () => {
                this.isPlaying = false;
                if (onComplete) onComplete();
            }
        });

        this.animations.forEach(animation => {
            masterTimeline.add(animation);
        });

        masterTimeline.play();
    }

    /**
     * Pauses all animations
     */
    pause() {
        this.animations.forEach(animation => animation.pause());
    }

    /**
     * Resumes all animations
     */
    resume() {
        this.animations.forEach(animation => animation.resume());
    }

    /**
     * Resets all animations to their initial state
     */
    reset() {
        this.animations.forEach(animation => animation.restart());
        this.isPlaying = false;
    }
}

export default Intro; 