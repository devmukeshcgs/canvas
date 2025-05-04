import { gsap } from 'gsap';

/**
 * Home class handles the home page functionality and animations
 */
class Home {
    constructor() {
        this.initialized = false;
        this.animations = [];
        this.elements = {};
        console.log("Home");
        
    }

    /**
     * Initializes the home page
     */
    init() {
        if (this.initialized) return;
        
        this.initialized = true;
        this.setupElements();
        this.setupEventListeners();
        this.setupAnimations();
    }

    /**
     * Sets up DOM elements
     */
    setupElements() {
        this.elements = {
            hero: document.querySelector('.hero'),
            navigation: document.querySelector('.nav'),
            content: document.querySelector('.content')
        };
    }

    /**
     * Sets up event listeners
     */
    setupEventListeners() {
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    /**
     * Sets up animations using GSAP
     */
    setupAnimations() {
        // Initialize animations
        this.animations = [
            this.createHeroAnimation(),
            this.createContentAnimation()
        ];
    }

    /**
     * Creates hero section animation
     * @returns {GSAP.Timeline} The animation timeline
     */
    createHeroAnimation() {
        return gsap.timeline({
            paused: true,
            defaults: { ease: 'power2.out' }
        })
        .from(this.elements.hero, {
            opacity: 0,
            y: 50,
            duration: 1
        });
    }

    /**
     * Creates content section animation
     * @returns {GSAP.Timeline} The animation timeline
     */
    createContentAnimation() {
        return gsap.timeline({
            paused: true,
            defaults: { ease: 'power2.out' }
        })
        .from(this.elements.content, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.5
        });
    }

    /**
     * Handles window resize events
     */
    handleResize() {
        // Update any responsive layouts or animations
        this.updateLayout();
    }

    /**
     * Handles scroll events
     */
    handleScroll() {
        // Handle scroll-based animations or effects
        this.updateScrollEffects();
    }

    /**
     * Updates layout based on window size
     */
    updateLayout() {
        // Implement responsive layout updates
    }

    /**
     * Updates scroll-based effects
     */
    updateScrollEffects() {
        // Implement scroll-based animations or effects
    }

    /**
     * Starts all animations
     */
    play() {
        this.animations.forEach(animation => animation.play());
    }

    /**
     * Pauses all animations
     */
    pause() {
        this.animations.forEach(animation => animation.pause());
    }

    /**
     * Resets all animations
     */
    reset() {
        this.animations.forEach(animation => animation.restart());
    }
}

export default Home; 