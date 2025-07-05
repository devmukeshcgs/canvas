import SVirtual from "./SVirtual"
import SVTo from "./SVTo"
import MM from "./MM"

export default class Scroll {
    constructor() {
        // console.log("Scroll");
        _A.cursor = {
            x: -1,
            y: -1
        },
            this.rqd = !1,
            this.min = 0,
            this.maxStep = 0,
            this.isDown = !1,
            this.isDragging = !1,
            this.prev = 0,
            this.step = 0,
            R.BM(this, ["sFn", "sUp", "move", "down", "up"]),
            this.scrollV = new SVirtual({
                cb: this.sFn
            }),
            this.sVTo = new SVTo({
                sUp: this.sUp
            }),
            this.mm = new MM({
                cb: this.move
            })
    }
    // intro() {
    //     console.log("Scroll.intro");

    //     var t = _A
    //         , t = (this._ = {},
    //             t.config.routes)
    //         , e = Object.keys(t)
    //         , i = e.length;
    //     for (let t = 0; t < i; t++) {
    //         var s = e[t];
    //         this._[s] = {
    //             curr: 0,
    //             targ: 0,
    //             step: 0,
    //             expand: 0
    //         }
    //     }
    // }

    intro() {
        // console.log("Scroll.intro");

        const appState = _A;
        const routes = appState.config.routes;
        const routeKeys = Object.keys(routes);
        const routeCount = routeKeys.length;

        // Initialize scroll state for each route
        this._ = {};
        for (let i = 0; i < routeCount; i++) {
            const route = routeKeys[i];
            this._[route] = {
                curr: 0,   // Current scroll position
                targ: 0,   // Target scroll position
                step: 0,   // Scroll step (rate of change)
                expand: 0  // Scroll expansion (additional offset)
            };
        }
    }

    // init(t) {
    //     var e = _A;
    //     this.url = e.route.new.url,
    //     this.isHome = e.is.ho,
    //     this.isWork = e.is.wo,
    //     this.isX = t.isX,
    //     this.scrollV.init(t),
    //     this.sVTo.init();
    //     let i = 0;
    //     this.isHome && "out" === e.mode && (t = e.engine.ho.gl.data,
    //     i = (t.out.w + t.out.gap.x) * e.index),
    //     this.sUpAll(i),
    //     this.resize()
    // }

    init(appConfig) {
        const appState = _A;

        // Initialize URL and flags
        this.url = appState.route.new.url;
        this.isHome = appState.is.ho;
        this.isWork = appState.is.wo;
        this.isX = appConfig.isX;

        // Initialize scroll-related components
        this.scrollV.init(appConfig);
        this.sVTo.init();

        // Calculate initial scroll value
        let initialScrollValue = 0;
        if (this.isHome && appState.mode === "out") {
            const homeEngineData = appState.engine.ho.gl.data;
            initialScrollValue =
                (homeEngineData.out.w + homeEngineData.out.gap.x) * appState.index;
        }

        // Setup scroll and resize adjustments
        this.sUpAll(initialScrollValue);
        this.resize();
    }


    resize() {
        var t,
            appState = _A,
            e = (this.scrollV.resize(),
                this.step = 1.5 * appState.win.h,
                this.isHome ? this.max = appState.engine.ho.gl.max : (t = (e = R.G.class("page")).length,
                    this.max = Math.max(e[t - 1].offsetHeight - _A.win.h, 0),
                    this.maxStep = this.max,
                    this.isWork && (this.max += this.step),
                    this.maxZero = 0 === this.max),
                this.clamp(this._[this.url].targ));
        this.sUpAll(e)
    }




    // expand(t, e) {
    //     return 0 === this.step ? 0 : (t = R.Clamp(t - e, 0, this.step) / this.step,
    //         e = R.iLerp(.15, 1, t),
    //         R.Ease.i2(e))
    // }
    expand(current, offset) {
        if (this.step === 0) {
            return 0;
        }

        // Calculate the normalized value
        const normalized = R.Clamp(current - offset, 0, this.step) / this.step;

        // Interpolate and ease the value
        const interpolated = R.iLerp(0.15, 1, normalized);
        return R.Ease.i2(interpolated);
    }

    sFn(t) {
        var appState;
        this.isDown || (this.sVTo.stop(),
            appState = _A,
            this.isHome && "in" === appState.mode ? appState.engine.ho.gl.change("out") : this.sUp(this.clamp(this._[this.url].targ + t)))
    }
    // sUp(t) {
    //     var url = this.url;
    //     console.log("Scroll.sUp", t);
    //     this._[url].targ = t
    // }
    sUp(targetValue) {
        const currentUrl = this.url;
        // Update the target scroll value for the current URL
        this._[currentUrl].targ = targetValue;
    }
    // down(t) {
    //     t.ctrlKey || "A" === t.target.tagName || 0 !== t.button ? R.PD(t) : (this.isDown = !0,
    //         this.isDragging = !1,
    //         this.start = this.isX ? t.pageX : t.pageY,
    //         this.targ = this._[this.url].targ,
    //         this.targPrev = this.targ)
    // }
    down(event) {
        // console.log("Key.down", event);

        // Ignore if a control key is pressed, target is an input element, or the button is not left-click
        if (event.ctrlKey || event.target.tagName === "A" || event.button !== 0) {
            R.PD(event); // Prevent default action
            return;
        }

        // Set interaction states
        this.isDown = true;
        this.isDragging = false;

        // Determine starting position based on interaction axis (X or Y)
        this.start = this.isX ? event.pageX : event.pageY;

        // Capture the target scroll value and previous state
        this.targ = this._[this.url].targ;
        this.targPrev = this.targ;
    }

    // move(t, e, i) {
    //     R.PD(i);
    //     var s, i = _A;
    //     i.cursor.x = t,
    //         i.cursor.y = e,
    //         this.isDown && (s = i.mode,
    //             e = this.isX ? t : e,
    //             Math.abs(e - this.start) < 15 || (this.isHome && "out" !== s || (e > this.prev && this.targ === this.min ? this.start = e - (this.targPrev - this.min) / 3 : e < this.prev && this.targ === this.max && (this.start = e - (this.targPrev - this.max) / 3),
    //                 this.prev = e,
    //                 this.targ = 3 * -(e - this.start) + this.targPrev,
    //                 this.targ = this.clamp(this.targ),
    //                 this.sUp(this.targ)),
    //                 this.isDragging = 10 < Math.abs(t - this.start),
    //                 this.isHome && "in" === s && this.isDragging && i.engine.ho.gl.change("out")))
    // }
    move(x, y, event) {
        // Prevent default behavior for the event
        R.PD(event);

        const appState = _A;

        // Update cursor position
        appState.cursor.x = x;
        appState.cursor.y = y;

        // If the interaction state is active
        if (this.isDown) {
            const mode = appState.mode;
            const position = this.isX ? x : y;

            // Ignore small movements to prevent unintended dragging
            if (Math.abs(position - this.start) < 15) return;

            // Home mode specific logic
            if (!this.isHome || mode === "out") {
                if (position > this.prev && this.targ === this.min) {
                    this.start = position - (this.targPrev - this.min) / 3;
                } else if (position < this.prev && this.targ === this.max) {
                    this.start = position - (this.targPrev - this.max) / 3;
                }

                this.prev = position;

                // Calculate and clamp the target value
                this.targ = -3 * (position - this.start) + this.targPrev;
                this.targ = this.clamp(this.targ);

                // Update the scroll position
                this.sUp(this.targ);
            }

            // Update dragging state
            this.isDragging = Math.abs(x - this.start) > 10;

            // Additional logic for home mode and "in" state
            if (this.isHome && mode === "in" && this.isDragging) {
                appState.engine.ho.gl.change("out");
            }
        }
    }

    // up(t) {
    //     var e, i, s;
    //     this.isDown && (this.isDown = !1,
    //         this.isDragging || (i = (e = _A).mode,
    //             this.isHome && (s = e.engine.ho.gl,
    //                 "out" === i ? -1 < s.indexOver && (e.index = s.indexOver,
    //                     s.change("in")) : "in" === i && s.inSlide(t))))
    // }
    up(event) {
        // console.log("Key.up", event);

        // Check if interaction state is active
        if (this.isDown) {
            this.isDown = false; // Reset interaction state

            // If not dragging, handle click or tap actions
            if (!this.isDragging) {
                const appState = _A;
                const mode = appState.mode;

                if (this.isHome) {
                    const scene = appState.engine.ho.gl;

                    if (mode === "out") {
                        // Handle transition from "out" mode to "in" mode
                        if (scene.indexOver > -1) {
                            appState.index = scene.indexOver;
                            scene.change("in");
                        }
                    } else if (mode === "in") {
                        // Handle slide interaction in "in" mode
                        scene.inSlide(event);
                    }
                }
            }
        }
    }

    // loop() {
    //     console.log("Scroll.loop");
    //     var t, e, i = _A.lerpP;
    //     this.rqd = this.unequal(),
    //         this.rqd && (t = this.url,
    //             this._[t].curr = R.Damp(this._[t].curr, this._[t].targ, i),
    //             e = this.clampStep(this._[t].targ),
    //             this._[t].step = R.Damp(this._[t].step, e, i),
    //             this._[t].expand = this.expand(this._[t].curr, this._[t].step),
    //             this.isWork) && this._[t].curr >= this.max - 2 && (this.sVTo.off(),
    //                 R.G.class("w-footer-a")[0].click())
    // }
    loop() {
        // console.log("Scroll.loop");

        const { lerpP } = _A; // Destructure lerp parameter
        const currentRoute = this.url; // Current route identifier

        // Check if an update is required
        this.rqd = this.unequal();

        if (this.rqd) {
            const routeState = this._[currentRoute]; // Current route state

            // Smoothly interpolate `curr` and `step` values
            routeState.curr = R.Damp(routeState.curr, routeState.targ, lerpP);
            const clampedStep = this.clampStep(routeState.targ);
            routeState.step = R.Damp(routeState.step, clampedStep, lerpP);

            // Update `expand` value based on current state
            routeState.expand = this.expand(routeState.curr, routeState.step);

            // Handle footer click logic for "Work" mode
            if (this.isWork && routeState.curr >= this.max - 2) {
                this.sVTo.off(); // Turn off scroll velocity timeout
                const footerLink = R.G.class("w-footer-a")[0];
                footerLink && footerLink.click(); // Trigger footer link click if it exists
            }
        }
    }

    // unequal() {
    //     var t = this.url;
    //     return 0 !== R.R(Math.abs(this._[t].curr - this._[t].targ))
    // }
    unequal() {
        const currentRoute = this.url; // Get the current route identifier
        const { curr, targ } = this._[currentRoute]; // Destructure `curr` and `targ` from the current route

        // Return whether the absolute difference between `curr` and `targ` is not zero
        return Math.abs(curr - targ) !== 0;
    }

    // sUpAll(t) {
    //     var e = this.clampStep(t)
    //         , i = this.url;
    //     this._[i].targ = t,
    //         this._[i].curr = t,
    //         this._[i].step = e,
    //         this._[i].expand = this.expand(t, e),
    //         this.targ = t,
    //         this.targPrev = t
    // }
    sUpAll(targetValue) {
        // console.log("Scroll.sUpAll", targetValue); // Debugging statement

        const clampedStep = this.clampStep(targetValue); // Clamp the step value
        const currentRoute = this.url; // Get the current route identifier

        // Update the target, current, step, and expand values for the current route
        this._[currentRoute].targ = targetValue;
        this._[currentRoute].curr = targetValue;
        this._[currentRoute].step = clampedStep;
        this._[currentRoute].expand = this.expand(targetValue, clampedStep);

        // Set the current and previous target values
        this.targ = targetValue;
        this.targPrev = targetValue;
    }


    clamp(targetValue) {
        // console.log("Scroll.clamp", targetValue); // Debugging statement
        return R.R(R.Clamp(targetValue, this.min, this.max))
    }
    clampStep(targetValue) {
        // console.log("Scroll.clampStep", targetValue); // Debugging statement
        return R.R(R.Clamp(targetValue, this.min, this.maxStep))
    }
    // l(t) {
    //     var e = document;
    //     R.L(e, t, "mousedown", this.down),
    //         R.L(e, t, "mouseup", this.up)
    // }
    l(t) {
        console.log("Scroll.l", t); // Debugging statement
        var e = document;

        // Bind mousedown event to 'down' method
        R.L(e, t, "mousedown", this.down);

        // Bind mouseup event to 'up' method
        R.L(e, t, "mouseup", this.up);
    }

    on() {
        this.maxZero || (this.sVTo.on(),
            this.scrollV.on(),
            this.mm.on(),
            this.l("a"))
    }
    off() {
        this.maxZero || (this.sVTo.off(),
            this.scrollV.off(),
            this.mm.off(),
            this.l("r"))
    }
}