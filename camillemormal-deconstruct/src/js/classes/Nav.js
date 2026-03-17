import AnimationManager from '../utils/AnimationManager';

/**
 * Navigation class handles the site navigation and menu interactions
 */
class Nav {
    constructor() {
        this.initialized = false;
        this.isOpen = false;
        this.elements = {};
        this.animationManager = new AnimationManager();
    }

    /**
     * Initializes the navigation
     */
    init() {
        if (this.initialized) return;
        
        this.initialized = true;
        this.setupElements();
        this.setupEventListeners();
        this.setupAnimations();
    }

    /**
     * Sets up DOM elements for navigation
     */
    setupElements() {
        this.elements = {
            menu: document.querySelector('.nav-menu'),
            toggle: document.querySelector('.nav-toggle'),
            links: document.querySelectorAll('.nav-link'),
            overlay: document.querySelector('.nav-overlay')
        };
    }

    /**
     * Sets up event listeners for navigation interactions
     */
    setupEventListeners() {
        if (this.elements.toggle) {
            this.elements.toggle.addEventListener('click', this.toggleMenu.bind(this));
        }

        if (this.elements.overlay) {
            this.elements.overlay.addEventListener('click', this.closeMenu.bind(this));
        }

        this.elements.links.forEach(link => {
            link.addEventListener('click', this.handleLinkClick.bind(this));
        });
    }

    /**
     * Sets up animations for navigation
     */
    setupAnimations() {
        // Create menu open animation
        this.animationManager.createTimeline('menuOpen', {
            ease: 'power2.inOut'
        })
        .to(this.elements.menu, {
            opacity: 1,
            x: 0,
            duration: 0.5
        })
        .to(this.elements.overlay, {
            opacity: 1,
            duration: 0.3
        }, '-=0.2');

        // Create menu close animation
        this.animationManager.createTimeline('menuClose', {
            ease: 'power2.inOut'
        })
        .to(this.elements.overlay, {
            opacity: 0,
            duration: 0.3
        })
        .to(this.elements.menu, {
            opacity: 0,
            x: '-100%',
            duration: 0.5
        }, '-=0.2');
    }

    /**
     * Toggles the menu open/closed
     */
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    /**
     * Opens the menu
     */
    openMenu() {
        if (this.isOpen) return;
        
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
        this.animationManager.play('menuOpen');
    }

    /**
     * Closes the menu
     */
    closeMenu() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        document.body.style.overflow = '';
        this.animationManager.play('menuClose');
    }

    /**
     * Handles navigation link clicks
     * @param {Event} event - The click event
     */
    handleLinkClick(event) {
        const link = event.currentTarget;
        const href = link.getAttribute('href');
        
        if (href && href !== '#') {
            this.closeMenu();
        }
    }

    /**
     * Updates navigation state based on scroll position
     */
    updateScrollState() {
        const scrollPosition = window.scrollY;
        const threshold = 100;

        if (scrollPosition > threshold) {
            this.elements.menu.classList.add('scrolled');
        } else {
            this.elements.menu.classList.remove('scrolled');
        }
    }
}

export default Nav; 