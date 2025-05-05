import { gsap } from 'gsap';

/**
 * AnimationManager utility class for handling GSAP animations
 */
class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.defaults = {
            ease: 'power2.out',
            duration: 0.5
        };
    }

    /**
     * Creates a new animation timeline
     * @param {string} id - Unique identifier for the animation
     * @param {Object} options - Animation options
     * @returns {GSAP.Timeline} The created timeline
     */
    createTimeline(id, options = {}) {
        const timeline = gsap.timeline({
            paused: true,
            ...this.defaults,
            ...options
        });

        this.animations.set(id, timeline);
        return timeline;
    }

    /**
     * Creates a fade animation
     * @param {string} id - Unique identifier for the animation
     * @param {HTMLElement} element - The element to animate
     * @param {Object} options - Animation options
     * @returns {GSAP.Timeline} The created timeline
     */
    createFadeAnimation(id, element, options = {}) {
        const timeline = this.createTimeline(id, options);
        timeline.from(element, {
            opacity: 0,
            ...options
        });
        return timeline;
    }

    /**
     * Creates a slide animation
     * @param {string} id - Unique identifier for the animation
     * @param {HTMLElement} element - The element to animate
     * @param {Object} options - Animation options
     * @returns {GSAP.Timeline} The created timeline
     */
    createSlideAnimation(id, element, options = {}) {
        const timeline = this.createTimeline(id, options);
        timeline.from(element, {
            y: options.y || 50,
            opacity: 0,
            ...options
        });
        return timeline;
    }

    /**
     * Creates a scale animation
     * @param {string} id - Unique identifier for the animation
     * @param {HTMLElement} element - The element to animate
     * @param {Object} options - Animation options
     * @returns {GSAP.Timeline} The created timeline
     */
    createScaleAnimation(id, element, options = {}) {
        const timeline = this.createTimeline(id, options);
        timeline.from(element, {
            scale: options.scale || 0.8,
            opacity: 0,
            ...options
        });
        return timeline;
    }

    /**
     * Plays an animation
     * @param {string} id - The animation identifier
     */
    play(id) {
        const animation = this.animations.get(id);
        if (animation) {
            animation.play();
        }
    }

    /**
     * Pauses an animation
     * @param {string} id - The animation identifier
     */
    pause(id) {
        const animation = this.animations.get(id);
        if (animation) {
            animation.pause();
        }
    }

    /**
     * Resets an animation
     * @param {string} id - The animation identifier
     */
    reset(id) {
        const animation = this.animations.get(id);
        if (animation) {
            animation.restart();
        }
    }

    /**
     * Plays multiple animations in sequence
     * @param {string[]} ids - Array of animation identifiers
     * @param {Function} onComplete - Callback function to execute after completion
     */
    playSequence(ids, onComplete) {
        const masterTimeline = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        ids.forEach(id => {
            const animation = this.animations.get(id);
            if (animation) {
                masterTimeline.add(animation);
            }
        });

        masterTimeline.play();
    }

    /**
     * Clears all animations
     */
    clear() {
        this.animations.clear();
    }
}

export default AnimationManager; 