import SVirtual from "./SVirtual";
console.log("Scroll class");


class Scroll {
    constructor() {
        // Cursor position
        _A.cursor = { x: -1, y: -1 };

        // State variables
        this.isScrollRequired = false;
        this.minScroll = 0;
        this.maxScrollStep = 0;
        this.isMouseDown = false;
        this.isDragging = false;
        this.previousPosition = 0;
        this.scrollStep = 0;

        // Bind methods
        Renderer.bindMethods(this, ["handleScroll", "updateScroll", "handleMove", "handleMouseDown", "handleMouseUp"]);

        // Initialize subsystems
        this.virtualScroll = new SVirtual({ cb: this.handleScroll });
        this.smoothScrollTo = new SVTo({ sUp: this.updateScroll });
        this.mouseManager = new MM({ cb: this.handleMove });
    }

    initializeRoutes() {
        const appState = _A;
        const routes = appState.config.routes;
        const routeKeys = Object.keys(routes);

        this.routes = {};
        routeKeys.forEach(routeKey => {
            this.routes[routeKey] = {
                current: 0,
                target: 0,
                step: 0,
                expansion: 0
            };
        });
    }

    initialize(config) {
        const appState = _A;

        // Initialize state
        this.currentUrl = appState.route.new.url;
        this.isHomePage = appState.is.ho;
        this.isWorkPage = appState.is.wo;
        this.isHorizontalScroll = config.isX;

        // Initialize subsystems
        this.virtualScroll.init(config);
        this.smoothScrollTo.init();

        // Set initial scroll position
        let initialScroll = 0;
        if (this.isHomePage && appState.mode === "out") {
            const homeData = appState.e.ho.gl.data;
            initialScroll = (homeData.out.width + homeData.out.gap.x) * appState.index;
        }
        this.updateAllScroll(initialScroll);
        this.handleResize();
    }

    handleResize() {
        const appState = _A;

        // Update scroll range
        this.virtualScroll.resize();
        this.scrollStep = 1.5 * appState.win.h;

        if (this.isHomePage) {
            this.maxScroll = appState.e.ho.gl.max;
        } else {
            const pages = Renderer.getClassElements("page");
            const lastPageHeight = pages[pages.length - 1].offsetHeight;
            this.maxScroll = Math.max(lastPageHeight - appState.win.h, 0);
            this.maxScrollStep = this.maxScroll;

            if (this.isWorkPage) {
                this.maxScroll += this.scrollStep;
            }

            this.isZeroMaxScroll = this.maxScroll === 0;
        }

        // Clamp current scroll position
        const currentTarget = this.routes[this.currentUrl].target;
        this.updateAllScroll(this.clampScroll(currentTarget));
    }

    expandScroll(current, step) {
        if (this.scrollStep === 0) return 0;

        const normalized = Renderer.Clamp((current - step) / this.scrollStep, 0, 1);
        const interpolated = Renderer.interpolate(0.15, 1, normalized);
        return Renderer.ease(interpolated);
    }

    handleScroll(delta) {
        if (!this.isMouseDown) {
            this.smoothScrollTo.stop();
            const appState = _A;

            if (this.isHomePage && appState.mode === "in") {
                appState.e.ho.gl.change("out");
            } else {
                this.updateScroll(this.clampScroll(this.routes[this.currentUrl].target + delta));
            }
        }
    }

    updateScroll(target) {
        this.routes[this.currentUrl].target = target;
    }

    handleMouseDown(event) {
        if (event.ctrlKey || event.target.tagName === "A" || event.button !== 0) {
            Renderer.preventDefault(event);
            return;
        }

        this.isMouseDown = true;
        this.isDragging = false;
        this.startPosition = this.isHorizontalScroll ? event.pageX : event.pageY;
        this.targetPosition = this.routes[this.currentUrl].target;
        this.previousTargetPosition = this.targetPosition;
    }

    handleMove(x, y, event) {
        Renderer.preventDefault(event);
        const appState = _A;

        // Update cursor position
        appState.cursor.x = x;
        appState.cursor.y = y;

        if (this.isMouseDown) {
            const mode = appState.mode;
            const currentPosition = this.isHorizontalScroll ? x : y;

            if (Math.abs(currentPosition - this.startPosition) >= 15) {
                if (!(this.isHomePage && mode === "out")) {
                    if (currentPosition > this.previousPosition && this.targetPosition === this.minScroll) {
                        this.startPosition = currentPosition - (this.previousTargetPosition - this.minScroll) / 3;
                    } else if (currentPosition < this.previousPosition && this.targetPosition === this.maxScroll) {
                        this.startPosition = currentPosition - (this.previousTargetPosition - this.maxScroll) / 3;
                    }

                    this.previousPosition = currentPosition;
                    this.targetPosition = 3 * -(currentPosition - this.startPosition) + this.previousTargetPosition;
                    this.targetPosition = this.clampScroll(this.targetPosition);
                    this.updateScroll(this.targetPosition);
                }

                this.isDragging = Math.abs(x - this.startPosition) > 10;
                if (this.isHomePage && mode === "in" && this.isDragging) {
                    appState.e.ho.gl.change("out");
                }
            }
        }
    }

    handleMouseUp(event) {
        if (!this.isMouseDown) return;

        this.isMouseDown = false;
        if (!this.isDragging) {
            const appState = _A;
            const mode = appState.mode;

            if (this.isHomePage) {
                const homeGl = appState.e.ho.gl;
                if (mode === "out" && homeGl.indexOver > -1) {
                    appState.index = homeGl.indexOver;
                    homeGl.change("in");
                } else if (mode === "in") {
                    homeGl.inSlide(event);
                }
            }
        }
    }

    loop() {
        const appState = _A;
        const lerpProgress = appState.lerpP;

        this.isScrollRequired = this.isScrollUnequal();
        if (this.isScrollRequired) {
            const currentRoute = this.routes[this.currentUrl];
            currentRoute.current = Renderer.damp(currentRoute.current, currentRoute.target, lerpProgress);
            const clampedStep = this.clampScrollStep(currentRoute.target);
            currentRoute.step = Renderer.damp(currentRoute.step, clampedStep, lerpProgress);
            currentRoute.expansion = this.expandScroll(currentRoute.current, currentRoute.step);

            if (this.isWorkPage && currentRoute.current >= this.maxScroll - 2) {
                this.smoothScrollTo.off();
                Renderer.getClassElements("w-footer-a")[0].click();
            }
        }
    }

    isScrollUnequal() {
        const currentRoute = this.routes[this.currentUrl];
        return Renderer.round(Math.abs(currentRoute.current - currentRoute.target)) !== 0;
    }

    updateAllScroll(target) {
        const clampedStep = this.clampScrollStep(target);
        const currentRoute = this.routes[this.currentUrl];

        currentRoute.target = target;
        currentRoute.current = target;
        currentRoute.step = clampedStep;
        currentRoute.expansion = this.expandScroll(target, clampedStep);

        this.targetPosition = target;
        this.previousTargetPosition = target;
    }

    clampScroll(value) {
        return Renderer.round(Renderer.Clamp(value, this.minScroll, this.maxScroll));
    }

    clampScrollStep(value) {
        return Renderer.round(Renderer.Clamp(value, this.minScroll, this.maxScrollStep));
    }

    manageEventListeners(action) {
        const documentElement = document;
        Renderer.addListener(documentElement, action, "mousedown", this.handleMouseDown);
        Renderer.addListener(documentElement, action, "mouseup", this.handleMouseUp);
    }

    enable() {
        if (!this.isZeroMaxScroll) {
            this.smoothScrollTo.on();
            this.virtualScroll.on();
            this.mouseManager.on();
            this.manageEventListeners("add");
        }
    }

    disable() {
        if (!this.isZeroMaxScroll) {
            this.smoothScrollTo.off();
            this.virtualScroll.off();
            this.mouseManager.off();
            this.manageEventListeners("remove");
        }
    }
}

export default Scroll