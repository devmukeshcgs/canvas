import AnimationManager from '../utils/AnimationManager';

/**
 * Intro class handles the introduction/loading animations and transitions
 */
class Intro {
    constructor() {
        this.initialized = false;
        this.elements = {};
        this.isPlaying = false;
        this.animationManager = new AnimationManager();
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
     * Sets up animations using AnimationManager
     */
    setupAnimations() {
        // Create loader animation
        this.animationManager.createScaleAnimation('loader', this.elements.loader, {
            scale: 0.8,
            duration: 0.8
        });

        // Create logo animation
        this.animationManager.createSlideAnimation('logo', this.elements.logo, {
            y: 30,
            duration: 1,
            delay: 0.5
        });

        // Create content animation
        this.animationManager.createSlideAnimation('content', this.elements.content, {
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
        this.animationManager.playSequence(['loader', 'logo', 'content'], () => {
            this.isPlaying = false;
            if (onComplete) onComplete();
        });
    }

    /**
     * Pauses all animations
     */
    pause() {
        this.animationManager.pause('loader');
        this.animationManager.pause('logo');
        this.animationManager.pause('content');
    }

    /**
     * Resumes all animations
     */
    resume() {
        this.animationManager.play('loader');
        this.animationManager.play('logo');
        this.animationManager.play('content');
    }

    /**
     * Resets all animations to their initial state
     */
    reset() {
        this.animationManager.reset('loader');
        this.animationManager.reset('logo');
        this.animationManager.reset('content');
        this.isPlaying = false;
    }
}

export default Intro; 