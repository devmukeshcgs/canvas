class SVirtual {
    constructor(config) {
        // Callback function for handling scroll
        this.callback = config.callback;

        // Initialize state variables
        this.isActive = false;
        this.isFirefox = Renderer.Sniffer.isFirefox;

        // Bind methods
        Renderer.bindMethods(this, ["handleEvent"]);

        // Add event listeners
        const documentElement = document;
        const eventTypes = ["wheel", "keydown"];
        const targets = [documentElement.body, documentElement];
        for (let i = 0; i < targets.length; i++) {
            Renderer.addListener(targets[i], "add", eventTypes[i], this.handleEvent);
        }
    }

    // Initialize with configuration
    initialize(config) {
        this.isHorizontal = config.isHorizontal;
    }

    // Activate the scroller
    activate() {
        this.isTicking = false;
        this.isActive = true;
    }

    // Deactivate the scroller
    deactivate() {
        this.isActive = false;
    }

    // Handle resize events
    handleResize() {
        this.spaceGap = _A.window.height - 40;
    }

    // General event handler
    handleEvent(event) {
        this.event = event;
        this.eventType = event.type;
        this.eventKey = event.key;

        // Prevent default for all events except "Tab"
        if (this.eventType === "keydown" && this.eventKey !== "Tab") {
            Renderer.preventDefault(event);
        }

        // Process events if active and not currently ticking
        if (this.isActive && !this.isTicking) {
            this.isTicking = true;
            this.processEvent();
        }
    }

    // Process the current event
    processEvent() {
        const eventType = this.eventType;
        if (eventType === "wheel") {
            this.handleWheelEvent();
        } else if (eventType === "keydown") {
            this.handleKeyEvent();
        }
    }

    // Handle wheel events
    handleWheelEvent() {
        const event = this.event;
        let delta;

        // Determine the scroll delta
        const verticalDelta = event.wheelDeltaY || -event.deltaY;
        if (this.isHorizontal) {
            const horizontalDelta = event.wheelDeltaX || -event.deltaX;
            delta = Math.abs(horizontalDelta) >= Math.abs(verticalDelta) ? horizontalDelta : verticalDelta;
        } else {
            delta = verticalDelta;
        }

        // Adjust delta for Firefox or other browsers
        if (this.isFirefox && event.deltaMode === 1) {
            delta *= 0.75;
        } else {
            delta *= 0.556;
        }

        // Set scroll offset and trigger callback
        this.scrollOffset = -delta;
        this.triggerCallback();
    }

    // Handle key events
    handleKeyEvent() {
        const key = this.eventKey;
        const isScrollUp = key === "ArrowUp" || key === "ArrowLeft";
        const isScrollDown = key === "ArrowDown" || key === "ArrowRight";
        const isSpaceKey = key === " ";

        if (isScrollUp || isScrollDown || isSpaceKey) {
            const appState = _A;

            if (appState.mode === "in" && appState.isHovering) {
                appState.engine.hoverControl.arrowSlide(isScrollDown || isSpaceKey ? 1 : -1);
                this.isTicking = false;
            } else {
                let scrollAmount = 100;
                if (isScrollUp) {
                    scrollAmount *= -1;
                } else if (isSpaceKey) {
                    const direction = this.event.shiftKey ? -1 : 1;
                    scrollAmount = this.spaceGap * direction;
                }

                this.scrollOffset = scrollAmount;
                this.triggerCallback();
            }
        } else {
            this.isTicking = false;
        }
    }

    // Trigger the callback with the scroll offset
    triggerCallback() {
        this.callback(this.scrollOffset);
        this.isTicking = false;
    }
}
export default SVirtual