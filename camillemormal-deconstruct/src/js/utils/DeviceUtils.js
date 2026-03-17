/**
 * DeviceUtils class provides utility methods for device detection and handling
 */
class DeviceUtils {
    /**
     * Checks if the device is a mobile device
     * @returns {boolean} Whether the device is mobile
     */
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * Checks if the device is a tablet
     * @returns {boolean} Whether the device is a tablet
     */
    static isTablet() {
        return /iPad|Android(?!.*Mobile)|Tablet/i.test(navigator.userAgent);
    }

    /**
     * Checks if the device is a desktop
     * @returns {boolean} Whether the device is a desktop
     */
    static isDesktop() {
        return !this.isMobile() && !this.isTablet();
    }

    /**
     * Checks if the device supports touch events
     * @returns {boolean} Whether the device supports touch
     */
    static supportsTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    /**
     * Checks if the device is in landscape orientation
     * @returns {boolean} Whether the device is in landscape
     */
    static isLandscape() {
        return window.matchMedia('(orientation: landscape)').matches;
    }

    /**
     * Gets the device pixel ratio
     * @returns {number} The device pixel ratio
     */
    static getPixelRatio() {
        return window.devicePixelRatio || 1;
    }

    /**
     * Checks if the device supports high DPI displays
     * @returns {boolean} Whether the device supports high DPI
     */
    static isHighDPI() {
        return this.getPixelRatio() > 1;
    }

    /**
     * Gets the viewport dimensions
     * @returns {Object} Object containing width and height
     */
    static getViewportSize() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight
        };
    }

    /**
     * Checks if the device is in dark mode
     * @returns {boolean} Whether the device is in dark mode
     */
    static isDarkMode() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    /**
     * Gets the device's operating system
     * @returns {string} The operating system name
     */
    static getOS() {
        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
        const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
        const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

        if (macosPlatforms.indexOf(platform) !== -1) {
            return 'MacOS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            return 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            return 'Windows';
        } else if (/Android/.test(userAgent)) {
            return 'Android';
        } else if (/Linux/.test(platform)) {
            return 'Linux';
        }

        return 'Unknown';
    }

    /**
     * Gets the device's browser
     * @returns {string} The browser name
     */
    static getBrowser() {
        const userAgent = navigator.userAgent;
        let browserName;

        if (userAgent.match(/chrome|chromium|crios/i)) {
            browserName = "Chrome";
        } else if (userAgent.match(/firefox|fxios/i)) {
            browserName = "Firefox";
        } else if (userAgent.match(/safari/i)) {
            browserName = "Safari";
        } else if (userAgent.match(/opr\//i)) {
            browserName = "Opera";
        } else if (userAgent.match(/edg/i)) {
            browserName = "Edge";
        } else {
            browserName = "Unknown";
        }

        return browserName;
    }

    /**
     * Checks if the device supports WebGL
     * @returns {boolean} Whether WebGL is supported
     */
    static supportsWebGL() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    /**
     * Checks if the device supports WebP images
     * @returns {Promise<boolean>} Whether WebP is supported
     */
    static async supportsWebP() {
        if (!self.createImageBitmap) return false;

        const webpData = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
        const blob = await fetch(webpData).then(r => r.blob());
        return createImageBitmap(blob).then(() => true, () => false);
    }
}

export default DeviceUtils; 