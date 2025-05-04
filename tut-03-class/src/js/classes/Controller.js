/**
 * Controller class handles navigation and page transitions
 */
class Controller {
    constructor(config) {
        this.config = config;
        this.device = config.device;
        this.transitionM = config.transitionM;
        this.cache = {};
        this.main = null;
        this.target = null;
        this.fromBack = false;
        this.mutating = false;
        this.route = {
            new: { url: '' }
        };
    }

    /**
     * Handles browser back/forward navigation
     * @param {Event} event - The popstate event
     */
    onPopstate(event) {
        const state = event.state;
        if (state) {
            this.route.new.url = state.url;
            this.fromBack = true;
            this.in();
        }
    }

    /**
     * Handles click events for navigation
     * @param {Event} event - The click event
     */
    handleEvent(event) {
        let target = event.target;
        let isLink = false;
        let isSubmitButton = false;

        // Traverse up the DOM to find the relevant element
        while (target !== document.body) {
            const tagName = target.tagName;
            if (tagName === 'A') {
                isLink = true;
                break;
            }
            if ((tagName === 'INPUT' || tagName === 'BUTTON') && target.type === 'submit') {
                isSubmitButton = true;
                break;
            }
            target = target.parentNode;
        }

        if (isLink) {
            const href = target.href;
            const protocol = href.substring(0, 3);
            
            // Handle link clicks
            if (!target.hasAttribute('target') && protocol !== 'mai' && protocol !== 'tel') {
                event.preventDefault();
                
                if (!this.mutating) {
                    const path = href.replace(/^.*\/\/[^/]+/, '');
                    if (path !== this.route.new.url) {
                        this.mutating = true;
                        this.out(path, target);
                    } else if (target.id === 'nav-logo') {
                        location.href = '/';
                    }
                }
            }
        } else if (isSubmitButton) {
            event.preventDefault();
        }
    }

    /**
     * Initializes the page with new content
     * @param {Function} callback - Callback function to execute after initialization
     */
    intro(callback) {
        const app = _A; // Global app instance
        R.Fetch({
            url: `${app.route.new.url}?webp=${app.webp}&device=${this.device}`,
            type: 'html',
            success: response => {
                const data = JSON.parse(response);
                app.config.routes = data.routes;
                app.data = data.data;
                this.cache = data.cache;
                
                // Insert new content
                this.add(document.body, 'afterbegin', data.body);
                this.main = R.G.id('main');
                this.transitionM = new this.transitionM();
                callback();
            }
        });
    }

    /**
     * Handles page transition out
     * @param {string} path - The new path to navigate to
     * @param {HTMLElement} target - The target element that triggered the navigation
     */
    out(path, target) {
        Router(path);
        const app = _A;
        app.target = target;
        app.fromBack = target === 'back';
        app.page.update = () => {
            this.in();
        };
    }

    /**
     * Handles page transition in
     */
    in() {
        const app = _A;
        const transition = this.transitionM;
        
        // Handle navigation
        if (app.fromBack) {
            app.fromBack = false;
            transition.in();
        } else {
            transition.in();
        }

        // Update page state
        app.mutating = false;
        app.page = {};
    }

    /**
     * Inserts HTML content into the DOM
     * @param {HTMLElement} parent - The parent element
     * @param {string} position - The position to insert (beforebegin, afterbegin, beforeend, afterend)
     * @param {string} content - The HTML content to insert
     */
    add(parent, position, content) {
        parent.insertAdjacentHTML(position, content);
    }

    /**
     * Handles browser back/forward navigation
     */
    handlePopState() {
        const app = _A;
        if (!app.config.routes) {
            return;
        }

        if (app.mutating) {
            this.handlePopState();
        } else {
            app.mutating = true;
            this.out(location.pathname, 'back');
        }
    }
}

export default Controller; 