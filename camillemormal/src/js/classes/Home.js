import AnimationManager from '../utils/AnimationManager';

/**
 * Home class handles the home page functionality and animations
 */
class HomePage {
    constructor() {
        this.initialized = false;
        this.elements = {};
        this.animationManager = new AnimationManager();
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
     * Sets up animations using AnimationManager
     */
    setupAnimations() {
        // Create hero animation
        this.animationManager.createSlideAnimation('hero', this.elements.hero, {
            y: 50,
            duration: 1
        });

        // Create content animation
        this.animationManager.createSlideAnimation('content', this.elements.content, {
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
        this.animationManager.playSequence(['hero', 'content']);
    }

    /**
     * Pauses all animations
     */
    pause() {
        this.animationManager.pause('hero');
        this.animationManager.pause('content');
    }

    /**
     * Resets all animations
     */
    reset() {
        this.animationManager.reset('hero');
        this.animationManager.reset('content');
    }
}

export default HomePage; 