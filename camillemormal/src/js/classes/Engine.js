import HomePage from "./Home";
import LZ from "./LZ";
import Load from "./Load";
import Nav from "./Nav";
import Scroll from "./Scroll";
import WorkPage from "./WorkPage";
import AboutPage from "./AboutPage";
import SIntersect from "./SIntersect";

class Engine {
    constructor() {
        const app = _A; // Global application state

        // Initialize application settings
        app.lerpPercentage = 0.083;
        app.currentIndex = 0;
        app.currentMode = "in";

        // Bind methods
        R.BM(this, ["resize", "loop"]);

        // Initialize components
        this.animationFrame = new R.RafR(this.loop);
        this.scrollHandler = new Scroll();
        this.lazyLoader = new LZ();
        this.loadManager = new Load();
        this.navigation = new Nav();
        this.homePage = new HomePage();
        this.workPage = new WorkPage();
        this.aboutPage = new AboutPage();
    }

    initializeIntro() {
        this.scrollHandler.initializeIntro();
        this.navigation.initializeIntro();
    }

    initializeApp() {
        const app = _A;

        // Set current index if on work page
        if (app.is.workPage) {
            app.currentIndex = app.config.routes[app.route.new.url].index;
        }

        // Initialize base components
        this.homePage.initializeBase();
        this.workPage.initializeBase();

        // Initialize scroll handler with home page status
        this.scrollHandler.initialize({
            isHomePage: app.is.homePage
        });

        // Initialize additional components
        this.scrollIntersectionObserver = new SIntersect();
        this.lazyLoader.initializeAssets();
        this.homePage.initializeAdvanced();
        this.workPage.initializeAdvanced();
        this.aboutPage.initialize();
    }

    handleResize() {
        // Handle resize for all components
        this.homePage.handleBaseResize();
        this.scrollHandler.handleResize();
        this.scrollIntersectionObserver.handleResize();
        this.homePage.handleAdvancedResize();
        this.workPage.handleAdvancedResize();
        this.aboutPage.handleResize();
        this.loadManager.handleAssetResize();
        this.lazyLoader.handleAssetResize();
    }

    startApp() {
        // Set up resize observer and start animation loop
        new R.ROR(this.handleResize).on();
        this.animationFrame.run();
    }

    enableInteractions() {
        this.homePage.enableInteractions();
        this.scrollHandler.enableInteractions();
    }

    animationLoop() {
        // Main application loop
        this.scrollHandler.update();
        this.lazyLoader.update();
        this.workPage.update();
        this.homePage.update();
        this.aboutPage.update();

        if (this.scrollHandler.requiresUpdate) {
            this.scrollIntersectionObserver.update();
        }
    }

    disableInteractions() {
        this.scrollHandler.disableInteractions();
        this.lazyLoader.disableInteractions();
        this.homePage.disableInteractions();
    }
}

export default Engine; 