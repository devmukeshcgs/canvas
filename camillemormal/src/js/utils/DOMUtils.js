/**
 * DOMUtils class provides utility methods for common DOM operations
 */
class DOMUtils {
    /**
     * Creates a new DOM element with specified attributes and children
     * @param {string} tag - The HTML tag name
     * @param {Object} attributes - Element attributes
     * @param {Array|string} children - Child elements or text content
     * @returns {HTMLElement} The created element
     */
    static createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        // Set attributes
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else {
                element.setAttribute(key, value);
            }
        });

        // Add children
        if (Array.isArray(children)) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else {
                    element.appendChild(child);
                }
            });
        } else if (typeof children === 'string') {
            element.textContent = children;
        }

        return element;
    }

    /**
     * Gets an element by selector
     * @param {string} selector - CSS selector
     * @param {HTMLElement} parent - Parent element to search within
     * @returns {HTMLElement|null} The found element or null
     */
    static getElement(selector, parent = document) {
        return parent.querySelector(selector);
    }

    /**
     * Gets all elements matching a selector
     * @param {string} selector - CSS selector
     * @param {HTMLElement} parent - Parent element to search within
     * @returns {Array} Array of matching elements
     */
    static getElements(selector, parent = document) {
        return Array.from(parent.querySelectorAll(selector));
    }

    /**
     * Adds event listeners to elements
     * @param {HTMLElement|Array} elements - Element(s) to add listeners to
     * @param {string} event - Event type
     * @param {Function} handler - Event handler function
     * @param {Object} options - Event listener options
     */
    static addEventListeners(elements, event, handler, options = {}) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }
        elements.forEach(element => {
            element.addEventListener(event, handler, options);
        });
    }

    /**
     * Removes event listeners from elements
     * @param {HTMLElement|Array} elements - Element(s) to remove listeners from
     * @param {string} event - Event type
     * @param {Function} handler - Event handler function
     * @param {Object} options - Event listener options
     */
    static removeEventListeners(elements, event, handler, options = {}) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }
        elements.forEach(element => {
            element.removeEventListener(event, handler, options);
        });
    }

    /**
     * Toggles classes on elements
     * @param {HTMLElement|Array} elements - Element(s) to toggle classes on
     * @param {string|Array} classes - Class(es) to toggle
     * @param {boolean} force - Force add/remove class
     */
    static toggleClasses(elements, classes, force) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }
        if (!Array.isArray(classes)) {
            classes = [classes];
        }
        elements.forEach(element => {
            classes.forEach(className => {
                element.classList.toggle(className, force);
            });
        });
    }

    /**
     * Checks if an element is in viewport
     * @param {HTMLElement} element - Element to check
     * @param {number} threshold - Visibility threshold (0-1)
     * @returns {boolean} Whether element is in viewport
     */
    static isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        const verticalVisible = (
            (rect.top + rect.height * threshold) >= 0 &&
            (rect.bottom - rect.height * threshold) <= windowHeight
        );

        const horizontalVisible = (
            (rect.left + rect.width * threshold) >= 0 &&
            (rect.right - rect.width * threshold) <= windowWidth
        );

        return verticalVisible && horizontalVisible;
    }

    /**
     * Debounces a function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttles a function
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    static throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

export default DOMUtils; 