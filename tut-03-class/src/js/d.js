import Controller from "./classes/Controller";
import Engine from "./classes/Engine";
import Intro from "./classes/Intro";
import Mutation from "./classes/Mutation";

console.log("MAIN");
// Define a global R object if it doesn't exist
window.RR = {};

/**
 * Inverse Lerp - calculates the interpolation factor between two values
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} value - Current value
 * @returns {number} Normalized value between 0 and 1
 */
RR.iLerp = (start, end, value) => RR.Clamp((value - start) / (end - start), 0, 1);

/**
 * Linear interpolation between two values
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} factor - Interpolation factor (0-1)
 * @returns {number} Interpolated value
 */
RR.Lerp = (start, end, factor) => start * (1 - factor) + end * factor;

/**
 * Smooth damping function
 * @param {number} current - Current value
 * @param {number} target - Target value
 * @param {number} smoothingFactor - Smoothing factor (0-1)
 * @returns {number} Damped value
 */
RR.Damp = (current, target, smoothingFactor) =>
  RR.Lerp(current, target, 1 - Math.exp(Math.log(1 - smoothingFactor) * RD));

/**
 * Remaps a value from one range to another
 * @param {number} inStart - Input range start
 * @param {number} inEnd - Input range end
 * @param {number} outStart - Output range start
 * @param {number} outEnd - Output range end
 * @param {number} value - Value to remap
 * @returns {number} Remapped value
 */
RR.Remap = (inStart, inEnd, outStart, outEnd, value) =>
  RR.Lerp(outStart, outEnd, RR.iLerp(inStart, inEnd, value));
////////////////////////////////
RR.M = class {
  constructor(config) {
    // Initialize and assign properties
    this.config = this.initializeConfig(config);
    this.raf = new RequestAnimationFrame(this.run.bind(this));
  }

  // Initialize the animation configuration
  initializeConfig(config) {
    let animationConfig = {
      element: Select.el(config.el),
      easing: {
        curve: config.easing || "linear",
      },
      duration: {
        original: config.duration || 0,
        current: 0,
      },
      delay: config.delay || 0,
      callback: config.callback || null,
      round: config.round || 2,
      progress: 0,
      progressEnd: 0,
      elapsedTime: 0,
    };

    animationConfig.elementLength = animationConfig.element.length;

    // Assign update method based on type of animation
    if (config.update) {
      animationConfig.updateMethod = (data) => config.update(animationConfig);
    } else if (config.svg) {
      animationConfig.updateMethod = this.updateSvg;
    } else if (config.line) {
      animationConfig.updateMethod = this.updateLine;
    } else {
      animationConfig.updateMethod = this.updateProperties;
    }

    // Handle property animations if provided
    if (config.properties) {
      animationConfig.properties = {};
      animationConfig.propertyIndexes = [];
      const propertyKeys = Object.keys(config.properties);
      animationConfig.propertyLength = propertyKeys.length;

      for (let i = 0; i < animationConfig.propertyLength; i++) {
        const key = propertyKeys[i];
        animationConfig.properties[key] = {
          name: key,
          start: config.properties[key][0],
          end: config.properties[key][1],
          current: config.properties[key][0],
          unit: config.properties[key][2] || "%",
        };
        animationConfig.propertyIndexes.push(key);
      }
    }

    // Handle SVG animation if provided
    if (config.svg) {
      animationConfig.svg = {
        type: config.svg.type,
        attribute: config.svg.type === "polygon" ? "points" : "d",
        start:
          config.svg.start ||
          Svg.getInitialValues(animationConfig.element[0], config.svg.type),
        end: config.svg.end,
        current: config.svg.start,
        values: [],
      };
    }

    // Handle line animation if provided
    if (config.line) {
      animationConfig.line = {
        dashed: config.line.dashed,
        coefficients: {
          start:
            config.line.start !== undefined
              ? (100 - config.line.start) / 100
              : 1,
          end:
            config.line.end !== undefined ? (100 - config.line.end) / 100 : 0,
        },
        pathLengths: [],
        start: [],
        end: [],
        current: [],
      };

      // Initialize line path lengths and styles
      for (let i = 0; i < animationConfig.elementLength; i++) {
        const element = config.line.elementWidth || animationConfig.element[i];
        animationConfig.line.pathLengths[i] = Svg.getShapeLength(element);
        const dashedPattern = config.line.dashed
          ? this.createDashedPattern(
              config.line.dashed,
              animationConfig.line.pathLengths[i]
            )
          : animationConfig.line.pathLengths[i];
        animationConfig.element[i].style.strokeDasharray = dashedPattern;
        animationConfig.line.start[i] =
          animationConfig.line.coefficients.start *
          animationConfig.line.pathLengths[i];
        animationConfig.line.end[i] =
          animationConfig.line.coefficients.end *
          animationConfig.line.pathLengths[i];
        animationConfig.line.current[i] = animationConfig.line.start[i];
      }
    }

    return animationConfig;
  }

  // Play the animation, restart and update configuration
  play(config) {
    this.pause();
    this.updateConfig(config);
    this.delay.run();
  }

  // Pause the animation
  pause() {
    this.raf.stop();
    if (this.delay) this.delay.stop();
  }

  // Update configuration for animation properties (duration, easing, etc.)
  updateConfig(config = {}) {
    const direction = config.reverse ? "start" : "end";

    if (this.config.properties) {
      this.config.propertyIndexes.forEach((property, index) => {
        const prop = this.config.properties[property];
        prop.end = prop.origin[direction];
        prop.start = prop.current;
        if (config.properties && config.properties[property]) {
          const propertyConfig = config.properties[property];
          if (propertyConfig.newEnd !== undefined) {
            prop.end = propertyConfig.newEnd;
          }
          if (propertyConfig.newStart !== undefined) {
            prop.start = propertyConfig.newStart;
          }
        }
      });
    } else if (this.config.svg) {
      this.config.svg.current = config.svg?.start || this.config.svg.start;
      this.config.svg.end = config.svg?.end || this.config.svg.end;
    } else if (this.config.line) {
      for (let i = 0; i < this.config.elementLength; i++) {
        this.config.line.start[i] = this.config.line.current[i];
      }
      if (config.line?.end !== undefined) {
        this.config.line.coefficients.end = (100 - config.line.end) / 100;
        for (let i = 0; i < this.config.elementLength; i++) {
          this.config.line.end[i] =
            this.config.line.coefficients.end * this.config.line.pathLengths[i];
        }
      } else {
        for (let i = 0; i < this.config.elementLength; i++) {
          this.config.line.end[i] = this.config.line.start[i];
        }
      }
    }

    this.config.duration.current =
      config.duration || this.config.duration.current;
    this.config.easing.curve = config.easing || this.config.easing.curve;
    this.config.easing.calc =
      typeof this.config.easing.curve === "string"
        ? Ease[this.config.easing.curve]
        : Ease4(this.config.easing.curve);
    this.config.delay = config.delay || this.config.delay;
    this.config.callback = config.callback || this.config.callback;

    this.config.progress = this.config.progressEnd =
      this.config.duration.current === 0 ? 1 : 0;
    this.delay = new Delay(this.requestAnimationFrame, this.config.delay);
  }

  // Request animation frame callback
  requestAnimationFrame() {
    this.raf.run();
  }

  // Animation loop (update progress and render animation)
  run(time) {
    if (this.config.progress === 1) {
      this.pause();
      this.config.updateMethod();
      if (this.config.callback) this.config.callback();
    } else {
      this.config.elapsedTime = Clamp(time, 0, this.config.duration.current);
      this.config.progress = Clamp(
        this.config.elapsedTime / this.config.duration.current,
        0,
        1
      );
      this.config.progressEnd = this.config.easing.calc(this.config.progress);
      this.config.updateMethod();
    }
  }

  // Update properties based on progress
  updateProperties() {
    const properties = this.config.properties;
    for (let i = 0; i < this.config.propertyLength; i++) {
      const property = properties[this.config.propertyIndexes[i]];
      property.current = this.lerp(property.start, property.end);
    }

    let transform = "";
    if (this.config.propertyIndexes.x) {
      transform += `translate3d(${
        properties[this.config.propertyIndexes.x].current +
        properties[this.config.propertyIndexes.x].unit
      }, 0, 0) `;
    }
    if (this.config.propertyIndexes.y) {
      transform += `translate3d(0, ${
        properties[this.config.propertyIndexes.y].current +
        properties[this.config.propertyIndexes.y].unit
      }, 0) `;
    }
    if (this.config.propertyIndexes.r) {
      transform += `${properties[this.config.propertyIndexes.r].name}(${
        properties[this.config.propertyIndexes.r].current
      }deg) `;
    }

    if (transform) {
      for (let i = 0; i < this.config.elementLength; i++) {
        if (this.config.element[i]) {
          this.config.element[i].style.transform = transform;
        }
      }
    }

    if (this.config.propertyIndexes.o) {
      for (let i = 0; i < this.config.elementLength; i++) {
        if (this.config.element[i]) {
          this.config.element[i].style.opacity =
            properties[this.config.propertyIndexes.o].current;
        }
      }
    }
  }

  // Update SVG properties based on progress
  updateSvg() {
    const svg = this.config.svg;
    let currentTemp = "";

    for (let i = 0; i < svg.values.length; i++) {
      svg.values[i] = isNaN(svg.start[i])
        ? svg.start[i]
        : this.lerp(svg.start[i], svg.end[i]);
      currentTemp += svg.values[i] + " ";
    }

    svg.current = currentTemp.trim();
    for (let i = 0; i < this.config.elementLength; i++) {
      if (this.config.element[i]) {
        this.config.element[i].setAttribute(svg.attribute, svg.current);
      }
    }
  }

  // Update line properties based on progress
  updateLine() {
    const line = this.config.line;
    for (let i = 0; i < this.config.elementLength; i++) {
      const elementStyle = this.config.element[i].style;
      line.current[i] = this.lerp(line.start[i], line.end[i]);
      elementStyle.strokeDashoffset = line.current[i];
      if (this.config.progress === 0) {
        elementStyle.opacity = 1;
      }
    }
  }

  // Linear interpolation function
  lerp(start, end) {
    return Round(Lerp(start, end, this.config.progressEnd), this.config.round);
  }

  // Helper functions for mathematical operations
  static getInitialValues(element, type) {
    // Retrieve initial values for SVG shapes or paths
  }

  static createDashedPattern(pattern, pathLength) {
    // Create dashed pattern for line animation
  }
};
////////////////////////////////
// Binds methods from an array to the given object
RR.BM = (object, methods) => {
  let methodsCount = methods.length;
  for (let i = 0; i < methodsCount; i++) {
    const methodName = methods[i];
    object[methodName] = object[methodName].bind(object);
  }
};
///////////////////////

// Timeline
RR.TL = class {
  constructor() {
    this.animations = []; // Store animations
    this.totalDelay = 0; // Total delay before the timeline starts
  }

  // Add an animation to the timeline
  from(config) {
    // Update the delay for the new animation based on previous total delay
    this.totalDelay += config.delay || 0;
    config.delay = this.totalDelay;

    // Push the new animation instance to the timeline
    this.animations.push(new Animation(config));
  }

  // Play the timeline animations
  play(config) {
    this.executeOnAnimations("play", config);
  }

  // Pause all animations in the timeline
  pause() {
    this.executeOnAnimations("pause");
  }

  // Execute a function (play/pause) on all animations
  executeOnAnimations(method, config) {
    const totalAnimations = this.animations.length;
    let animationConfig = config || undefined;

    for (let i = 0; i < totalAnimations; i++) {
      this.animations[i][method](animationConfig);
    }
  }
};
////////////////////////////////
// Clamps a value `t` within a range defined by `e` (min) and `i` (max).
RR.Clamp = (value, min, max) => {
  return value < min ? min : value > max ? max : value;
};

// Creates a deep clone of an object `t`.
RR.Clone = (object) => {
  return JSON.parse(JSON.stringify(object));
};
///////////////////////////////
// Delay
RR.Delay = class {
  constructor(callback, duration) {
    this.callback = callback; // Function to be called after delay
    this.duration = duration; // Duration of the delay
    this.frameRequest = new RR.RafR(this.loop); // RAF request for the loop
  }

  // Start the delay, either immediately call the callback or run the animation loop
  start() {
    if (this.duration === 0) {
      this.callback(); // If no delay, run callback immediately
    } else {
      this.frameRequest.run(); // Otherwise, start the animation loop
    }
  }

  // Stop the delay
  stop() {
    this.frameRequest.stop(); // Stop the RAF loop
  }

  // The loop method that runs every frame
  loop(timeElapsed) {
    // Clamp timeElapsed within the duration bounds
    timeElapsed = RR.Clamp(timeElapsed, 0, this.duration);

    // Check if the delay duration is complete
    if (RR.Clamp(timeElapsed / this.duration, 0, 1) === 1) {
      this.stop(); // Stop the animation loop
      this.callback(); // Execute the callback
    }
  }
};
///////////////////////////////
// Calculates the distance between two points (t, e) using the Pythagorean theorem
RR.Dist = (x, y) => {
  return Math.sqrt(x * x + y * y);
};

///////////////////////////////
RR.Ease = {
  // Linear easing
  linear: (t) => t,

  // Ease-In functions
  easeIn1: (t) => 1 - Math.cos(t * (0.5 * Math.PI)),
  easeIn2: (t) => t * t,
  easeIn3: (t) => t * t * t,
  easeIn4: (t) => t * t * t * t,
  easeIn5: (t) => t * t * t * t * t,
  easeIn6: (t) => (t === 0 ? 0 : 2 ** (10 * (t - 1))),

  // Ease-Out functions
  easeOut1: (t) => Math.sin(t * (0.5 * Math.PI)),
  easeOut2: (t) => t * (2 - t),
  easeOut3: (t) => --t * t * t + 1,
  easeOut4: (t) => 1 - --t * t * t * t,
  easeOut5: (t) => 1 + --t * t * t * t * t,
  easeOut6: (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t)),

  // Ease-In-Out functions
  easeInOut1: (t) => -0.5 * (Math.cos(Math.PI * t) - 1),
  easeInOut2: (t) => (t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1),
  easeInOut3: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInOut4: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  easeInOut5: (t) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  easeInOut6: (t) =>
    t === 0 || t === 1
      ? t
      : (t /= 0.5) < 1
      ? 0.5 * 2 ** (10 * (t - 1))
      : 0.5 * (2 - 2 ** (-10 * --t)),
};

///////////////////////////////
(RR.r0 = (t, e) => 1 - 3 * e + 3 * t),
  (RR.r1 = (t, e) => 3 * e - 6 * t),
  (RR.r2 = (t, e, i) => ((RR.r0(e, i) * t + RR.r1(e, i)) * t + 3 * e) * t),
  (RR.r3 = (t, e, i) => 3 * RR.r0(e, i) * t * t + 2 * RR.r1(e, i) * t + 3 * e),
  ///////////////////////////////
  //findBezierRoot
  (RR.r4 = (
    targetValue,
    lowerBound,
    upperBound,
    controlPoint1,
    controlPoint2
  ) => {
    let midpoint,
      error,
      iterations = 0;

    // Iterate to find the root of the Bezier curve
    while (iterations < 10) {
      // Calculate the midpoint between lower and upper bounds
      midpoint = lowerBound + 0.5 * (upperBound - lowerBound);

      // Evaluate the curve at the midpoint
      error =
        RR.evaluateBezier(midpoint, controlPoint1, controlPoint2) - targetValue;

      // Adjust bounds based on the error
      if (error > 0) {
        upperBound = midpoint;
      } else {
        lowerBound = midpoint;
      }

      // If the error is small enough, break the loop
      if (Math.abs(error) < 1e-7) {
        break;
      }

      iterations++;
    }

    return midpoint;
  });
///////////////////////////////
//solveBezierRoot
RR.r5 = (targetValue, initialGuess, controlPoint1, controlPoint2) => {
  // Iterate up to 4 times to refine the root of the Bezier curve
  for (let iteration = 0; iteration < 4; ++iteration) {
    // Calculate the derivative of the Bezier curve at the current guess
    const derivative = RR.evaluateBezierDerivative(
      initialGuess,
      controlPoint1,
      controlPoint2
    );

    // If the derivative is zero, return the current guess
    if (derivative === 0) {
      return initialGuess;
    }

    // Refine the initial guess based on the error and derivative
    const error =
      RR.evaluateBezier(initialGuess, controlPoint1, controlPoint2) -
      targetValue;
    initialGuess -= error / derivative;
  }

  // Return the refined guess
  return initialGuess;
};
///////////////////////////////
//createEaseFunction
RR.Ease4 = (controlPoints) => {
  const [controlPoint1, controlPoint2, controlPoint3, controlPoint4] =
    controlPoints;
  const lookupTable = new Float32Array(11);

  // If control points differ, populate the lookup table
  if (controlPoint1 !== controlPoint2 || controlPoint3 !== controlPoint4) {
    for (let i = 0; i < 11; ++i) {
      lookupTable[i] = RR.evaluateBezier(0.1 * i, controlPoint1, controlPoint3);
    }
  }

  // Return the easing function
  return (t) => {
    // If control points are equal or t is 0 or 1, return t directly
    if (
      (controlPoint1 === controlPoint2 && controlPoint3 === controlPoint4) ||
      t === 0 ||
      t === 1
    ) {
      return t;
    }

    // Perform lookup and interpolation for the easing function
    const interpolation = (t) => {
      let baseIndex = 0;
      for (let i = 1; i < 10 && lookupTable[i] <= t; ++i) {
        baseIndex += 0.1;
      }

      const relativeT =
        (t - lookupTable[baseIndex]) /
        (lookupTable[baseIndex + 1] - lookupTable[baseIndex]);
      const adjustedT = baseIndex + 0.1 * relativeT;

      const derivative = RR.evaluateBezierDerivative(
        adjustedT,
        controlPoint1,
        controlPoint3
      );
      if (Math.abs(derivative) >= 0.001) {
        return RR.solveBezierRoot(t, adjustedT, controlPoint1, controlPoint3);
      }

      return derivative === 0
        ? adjustedT
        : RR.findRoot(
            t,
            derivative,
            adjustedT,
            adjustedT + 0.1,
            controlPoint1,
            controlPoint3
          );
    };

    return interpolation(t);
  };
};
///////////////////////////////
RR.Fetch = (requestConfig) => {
  const isJson = requestConfig.type === "json";
  const responseType = isJson ? "json" : "text";

  // Set up the fetch request configuration
  const fetchConfig = {
    method: isJson ? "POST" : "GET",
    headers: new Headers({
      "Content-Type": isJson
        ? "application/x-www-form-urlencoded"
        : "text/html",
    }),
    mode: "same-origin",
  };

  // If the request is JSON, include the body in the configuration
  if (isJson) {
    fetchConfig.body = requestConfig.body;
  }

  // Make the fetch request
  fetch(requestConfig.url, fetchConfig)
    .then((response) => {
      if (response.ok) {
        return response[responseType](); // Return the parsed response based on type (json or text)
      } else {
        // Handle response errors
        requestConfig.error && requestConfig.error();
      }
    })
    .then((parsedData) => {
      // Call the success callback with the parsed data
      requestConfig.success(parsedData);
    })
    .catch((err) => {
      // Handle fetch errors (network issues, etc.)
      console.error("Fetch error:", err);
      requestConfig.error && requestConfig.error(err);
    });
};

///////////////////////////////
//hasOwnProperty
RR.has = (object, property) => object.hasOwnProperty(property);

///////////////////////////////
//isType
RR.Is = {
  isString: (value) => typeof value === "string",
  isObject: (value) => value === Object(value),
  isArray: (value) => Array.isArray(value),
  isDefined: (value) => value !== undefined,
  isUndefined: (value) => value === undefined,
};

///////////////////////////////
// Modulo function ensuring positive results
RR.Mod = (value, divisor) => ((value % divisor) + divisor) % divisor;

// Pad number with leading zeros
RR.Pad = (value, length) => ("000" + value).slice(-length);

// Parametric curve calculation
RR.PCurve = (t, e, i) => {
  return ((e + i) ** (e + i) / (e ** e * i ** i)) * t ** e * (1 - t) ** i;
};

// Rounded value with precision
RR.R = (value, precision) => {
  precision = RR.Is.isUndefined(precision) ? 100 : 10 ** precision;
  return Math.round(value * precision) / precision;
};

///////////////////////////////
RR.Select = {
  // Select elements based on selector type (ID or class)
  getElement: (selector) => {
    let elements = [];
    let identifier;

    if (RR.Is.isString(selector)) {
      identifier = selector.substring(1);
      if (selector.charAt(0) === "#") {
        elements[0] = RR.G.id(identifier); // Select by ID
      } else {
        elements = RR.G.class(identifier); // Select by class
      }
    } else {
      elements[0] = selector; // Directly use the provided element
    }

    return elements;
  },

  // Determine the type of selector: ID or class
  getSelectorType: (selector) => {
    return selector.charAt(0) === "#" ? "id" : "class";
  },

  // Get the name of the selector (without the leading # or .)
  getName: (selector) => selector.substring(1),
};

///////////////////////////////
// addEventListenerToElements
RR.L = (selector, eventType, eventAction, eventListener) => {
  const elements = RR.Select.getElement(selector);
  const numElements = elements.length;
  let options = false;

  // Determine if the event type requires passive event listeners
  const eventPrefix = eventType.substring(0, 3);
  if (["whe", "mou", "tou", "poi"].includes(eventPrefix)) {
    options = { passive: false }; // For scroll, mouse, touch, or pointer events
  }

  // Determine if the event is to be added or removed
  const method = eventAction === "a" ? "add" : "remove";

  // Attach the event listener to each element
  for (let i = 0; i < numElements; i++) {
    elements[i][`${method}EventListener`](eventType, eventListener, options);
  }
};

///////////////////////////////
let Tab = class {
  constructor() {
    this.tabs = []; // Array to hold the tabs
    this.lastPauseTime = 0; // Track the last time the tab was paused
    RR.BM(this, ["handleVisibilityChange"]);

    // Attach the visibility change event listener to the document
    RR.L(document, "a", "visibilitychange", this.handleVisibilityChange);
  }

  // Method to add a new tab
  addTab(tab) {
    this.tabs.push(tab);
  }

  // Method to handle the visibility change event
  handleVisibilityChange() {
    const currentTime = performance.now();
    let eventAction;
    let deltaTime;
    const isTabHidden = document.hidden;

    // If the tab is hidden, mark it as 'stop' and record the pause time
    if (isTabHidden) {
      this.lastPauseTime = currentTime;
      eventAction = "stop";
    } else {
      // Otherwise, calculate the time delta since the last pause and mark as 'start'
      deltaTime = currentTime - this.lastPauseTime;
      eventAction = "start";
    }

    // Loop through each tab and invoke the corresponding action based on visibility
    const tabCount = this.tabs.length;
    for (let i = 0; i < tabCount; i++) {
      this.tabs[i][eventAction](deltaTime);
    }
  }
};

///////////////////////////////
// Instantiate a new Tab object and assign it to `RD`
let RD = (RR.Tab = new Tab());
// Constant for the frame rate (60 FPS)
let FR = 1000 / 60;

///////////////////////////////
let Raf =
  ((RR.Raf = class {
    constructor() {
      this.callbacks = [];
      this.isRunning = true;
      this.timeStart = null;

      // Bind methods
      this.bindMethods(["loop", "pause", "resume"]);

      // Add the start/stop actions to the Tab
      RR.Tab.addTab({
        stop: this.pause,
        start: this.resume,
      });

      // Start the animation loop
      this.startLoop();
    }

    // Method to stop the animation loop
    pause() {
      this.isRunning = false;
    }

    // Method to resume the animation loop
    resume(currentTime) {
      this.timeStart = null;
      let duration = this.getCallbackCount();

      for (let i = 0; i < duration; i++) {
        this.callbacks[i].startTime += currentTime;
      }

      this.isRunning = true;
    }

    // Add a new callback to the animation loop
    add(callback) {
      this.callbacks.push(callback);
    }

    // Remove a callback by its ID
    remove(callbackId) {
      let index = this.getCallbackCount();
      while (index--) {
        if (this.callbacks[index].id === callbackId) {
          this.callbacks.splice(index, 1);
          return;
        }
      }
    }

    // The animation loop function
    loop(currentTime) {
      if (this.isRunning) {
        if (!this.timeStart) this.timeStart = currentTime;

        // Calculate the time difference between frames
        const timeElapsed = (currentTime - this.timeStart) / FR;
        this.timeStart = currentTime;

        let duration = this.getCallbackCount();

        for (let i = 0; i < duration; i++) {
          let callbackData = this.callbacks[i];

          if (RR.Is.def(callbackData)) {
            if (!callbackData.startTime) callbackData.startTime = currentTime;

            // Calculate the time delta for the callback
            let deltaTime = currentTime - callbackData.startTime;

            // Execute the callback with the time delta
            callbackData.callback(deltaTime);
          }
        }
      }

      // Request the next animation frame
      this.startLoop();
    }

    // Request the next animation frame
    startLoop() {
      requestAnimationFrame(this.loop);
    }

    // Get the number of callbacks in the loop
    getCallbackCount() {
      return this.callbacks.length;
    }

    // Bind methods to the current instance
    bindMethods(methods) {
      methods.forEach((method) => {
        this[method] = this[method].bind(this);
      });
    }
  }),
  new RR.Raf());
let RafId = 0;

///////////////////////////////
let Ro =
    ((RR.RafR = class {
      constructor(t) {
        (this.cb = t), (this.on = !1), (this.id = RafId), RafId++;
      }
      run() {
        this.on ||
          (Raf.add({
            id: this.id,
            cb: this.cb,
          }),
          (this.on = !0));
      }
      stop() {
        this.on && (Raf.remove(this.id), (this.on = !1));
      }
    }),
    (RR.Rand = {
      range: (t, e, i) => RR.R(Math.random() * (e - t) + t, i),
      uniq: (e) => {
        var i = [];
        for (let t = 0; t < e; t++) i[t] = t;
        let t = e;
        for (var s, r; t--; )
          (s = ~~(Math.random() * (t + 1))),
            (r = i[t]),
            (i[t] = i[s]),
            (i[s] = r);
        return i;
      },
    }),
    (RR.Snif = {
      uA: navigator.userAgent.toLowerCase(),
      get iPadIOS13() {
        return (
          "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints
        );
      },
      get isMobile() {
        return (
          /mobi|android|tablet|ipad|iphone/.test(this.uA) || this.iPadIOS13
        );
      },
      get isFirefox() {
        return -1 < this.uA.indexOf("firefox");
      },
    }),
    (RR.Svg = {
      shapeL: (s) => {
        var t, e, i, r;
        if ("circle" === s.tagName) return 2 * RR.Ga(s, "r") * Math.PI;
        if ("line" === s.tagName)
          return (
            (t = RR.Ga(s, "x1")),
            (e = RR.Ga(s, "x2")),
            (i = RR.Ga(s, "y1")),
            (r = RR.Ga(s, "y2")),
            Math.sqrt((e -= t) * e + (r -= i) * r)
          );
        if ("polyline" !== s.tagName) return s.getTotalLength();
        {
          let e = 0,
            i = 0;
          var a = s.points.numberOfItems;
          for (let t = 0; t < a; t++) {
            var h = s.points.getItem(t);
            0 < t && (e += RR.Dist(h.x - i.x, h.y - i.y)), (i = h);
          }
          return e;
        }
      },
      split: (t) => {
        var e = [],
          i = t.split(" "),
          s = i.length;
        for (let t = 0; t < s; t++) {
          var r = i[t].split(","),
            a = r.length;
          for (let t = 0; t < a; t++) {
            var h = r[t],
              h = isNaN(h) ? h : +h;
            e.push(h);
          }
        }
        return e;
      },
    }),
    (RR.Timer = class {
      constructor(t) {
        this._ = new RR.Delay(t.cb, t.delay);
      }
      run() {
        this._.stop(), this._.run();
      }
    }),
    (RR.Une = (t, e, i) => 0 !== RR.R(Math.abs(t - e), i)),
    (RR.Cr = (t) => document.createElement(t)),
    (RR.g = (t, e, i) => (t || document)["getElement" + e](i)),
    (RR.G = {
      id: (t, e) => RR.g(e, "ById", t),
      class: (t, e) => RR.g(e, "sByClassName", t),
      tag: (t, e) => RR.g(e, "sByTagName", t),
    }),
    (RR.Ga = (t, e) => t.getAttribute(e)),
    (RR.index = (e, i) => {
      var s = i.length;
      for (let t = 0; t < s; t++) if (e === i[t]) return t;
      return -1;
    }),
    (RR.Index = {
      list: (t) => RR.index(t, t.parentNode.children),
      class: (t, e, i) => RR.index(t, RR.G.class(e, i)),
    }),
    (RR.PD = (t) => {
      t.cancelable && t.preventDefault();
    }),
    (RR.RO = class {
      constructor() {
        (this.eT = RR.Snif.isMobile ? "orientationchange" : "resize"),
          (this.tick = !1),
          (this._ = []),
          RR.BM(this, ["fn", "gRaf", "run"]),
          (this.t = new RR.Timer({
            delay: 40,
            cb: this.gRaf,
          })),
          (this.r = new RR.RafR(this.run)),
          RR.L(window, "a", this.eT, this.fn);
      }
      add(t) {
        this._.push(t);
      }
      remove(t) {
        let e = this._.length;
        for (; e--; ) if (this._[e].id === t) return void this._.splice(e, 1);
      }
      fn(t) {
        (this.e = t), this.t.run();
      }
      gRaf() {
        this.tick || ((this.tick = !0), this.r.run());
      }
      run() {
        let t = 0;
        for (var e = this._.length; t < e; ) this._[t].cb(this.e), t++;
        this.r.stop(), (this.tick = !1);
      }
    }),
    new RR.RO()),
  RoId = 0;
///////////////////////////////
function Router(newUrl) {
  const appState = _A; // Assuming `_A` is the main application state object
  const newPage = appState.config.routes[newUrl].page; // Get the new page from the route config
  const currentRoute = appState.route.new; // Current route being displayed
  const previousRoute = appState.route.old; // Previous route displayed

  // Update the old route to the current route
  appState.route.old = currentRoute;

  // Update the new route with the new URL and page
  appState.route.new = {
    url: newUrl,
    page: newPage,
  };

  // Set visibility states for the current and new page
  appState.is[currentRoute.page] = false; // Mark the current page as not active
  appState.is[newPage] = true; // Mark the new page as active

  // Update historical visibility states for previous and current page
  if (previousRoute.page) {
    appState.was[previousRoute.page] = false; // Mark the previous page as no longer active in history
  }
  appState.was[currentRoute.page] = true; // Mark the current page as active in history
}

///////////////////////////////
RR.ROR = class {
  constructor(callback) {
    this.callback = callback; // Store the callback function
    this.id = RoId; // Assign a unique ID to this instance
    RoId++; // Increment the global ID counter
  }

  /**
   * Activate the callback by adding it to the Ro instance.
   */
  on() {
    Ro.add({
      id: this.id,
      cb: this.callback,
    });
  }

  /**
   * Deactivate the callback by removing it from the Ro instance.
   */
  off() {
    Ro.remove(this.id);
  }
};

///////////////////////////////
(RR.O = (t, e) => {
  t.style.opacity = e;
}),
  (RR.pe = (t, e) => {
    t.style.pointerEvents = e;
  });
///////////////////////////////
RR.PE = {
  all: (element) => {
    RR.pe(element, "all");
  },
  none: (element) => {
    RR.pe(element, "none");
  },
};
///////////////////////////////
RR.T = (t, e, i, s) => {
  s = RR.Is.und(s) ? "%" : s;
  t.style.transform = "translate3d(" + e + s + "," + i + s + ",0)"
}

///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
function create() {
  var t = new Float32Array(16);
  return t[0] = 1,
  t[5] = 1,
  t[10] = 1,
  t[15] = 1,
  t
}
function identity(t) {
  return t[0] = 1,
  t[1] = 0,
  t[2] = 0,
  t[3] = 0,
  t[4] = 0,
  t[5] = 1,
  t[6] = 0,
  t[7] = 0,
  t[8] = 0,
  t[9] = 0,
  t[10] = 1,
  t[11] = 0,
  t[12] = 0,
  t[13] = 0,
  t[14] = 0,
  t[15] = 1,
  t
}
function invert(t, e) {
  var i = e[0]
    , s = e[1]
    , r = e[2]
    , a = e[3]
    , h = e[4]
    , l = e[5]
    , o = e[6]
    , n = e[7]
    , p = e[8]
    , d = e[9]
    , c = e[10]
    , g = e[11]
    , u = e[12]
    , m = e[13]
    , v = e[14]
    , e = e[15]
    , f = c * e
    , R = v * g
    , x = o * e
    , w = v * n
    , y = o * g
    , L = c * n
    , _ = r * e
    , A = v * a
    , b = r * g
    , S = c * a
    , M = r * n
    , T = o * a
    , F = p * m
    , H = u * d
    , P = h * m
    , G = u * l
    , B = h * d
    , E = p * l
    , k = i * m
    , z = u * s
    , I = i * d
    , C = p * s
    , O = i * l
    , D = h * s
    , W = f * l + w * d + y * m - (R * l + x * d + L * m)
    , N = R * s + _ * d + S * m - (f * s + A * d + b * m)
    , m = x * s + A * l + M * m - (w * s + _ * l + T * m)
    , s = L * s + b * l + T * d - (y * s + S * l + M * d)
    , l = 1 / (i * W + h * N + p * m + u * s);
  return t[0] = l * W,
  t[1] = l * N,
  t[2] = l * m,
  t[3] = l * s,
  t[4] = l * (R * h + x * p + L * u - (f * h + w * p + y * u)),
  t[5] = l * (f * i + A * p + b * u - (R * i + _ * p + S * u)),
  t[6] = l * (w * i + _ * h + T * u - (x * i + A * h + M * u)),
  t[7] = l * (y * i + S * h + M * p - (L * i + b * h + T * p)),
  t[8] = l * (F * n + G * g + B * e - (H * n + P * g + E * e)),
  t[9] = l * (H * a + k * g + C * e - (F * a + z * g + I * e)),
  t[10] = l * (P * a + z * n + O * e - (G * a + k * n + D * e)),
  t[11] = l * (E * a + I * n + D * g - (B * a + C * n + O * g)),
  t[12] = l * (P * c + E * v + H * o - (B * v + F * o + G * c)),
  t[13] = l * (I * v + F * r + z * c - (k * c + C * v + H * r)),
  t[14] = l * (k * o + D * v + G * r - (O * v + P * r + z * o)),
  t[15] = l * (O * c + B * r + C * o - (I * o + D * c + E * r)),
  t
}
function perspective(t, e, i, s, r) {
  var e = 1 / Math.tan(.5 * e)
    , a = 1 / (s - r);
  return t[0] = e / i,
  t[1] = 0,
  t[2] = 0,
  t[3] = 0,
  t[4] = 0,
  t[5] = e,
  t[6] = 0,
  t[7] = 0,
  t[8] = 0,
  t[9] = 0,
  t[10] = (r + s) * a,
  t[11] = -1,
  t[12] = 0,
  t[13] = 0,
  t[14] = 2 * r * s * a,
  t[15] = 0,
  t
}
function multiplyFn(t, e) {
  return multiply(t, t, e)
}
function multiply(t, e, i) {
  var s = i[0]
    , r = i[1]
    , a = i[2]
    , h = i[3]
    , l = i[4]
    , o = i[5]
    , n = i[6]
    , p = i[7]
    , d = i[8]
    , c = i[9]
    , g = i[10]
    , u = i[11]
    , m = i[12]
    , v = i[13]
    , f = i[14]
    , i = i[15]
    , R = e[0]
    , x = e[1]
    , w = e[2]
    , y = e[3]
    , L = e[4]
    , _ = e[5]
    , A = e[6]
    , b = e[7]
    , S = e[8]
    , M = e[9]
    , T = e[10]
    , F = e[11]
    , H = e[12]
    , P = e[13]
    , G = e[14]
    , e = e[15];
  return t[0] = s * R + r * L + a * S + h * H,
  t[1] = s * x + r * _ + a * M + h * P,
  t[2] = s * w + r * A + a * T + h * G,
  t[3] = s * y + r * b + a * F + h * e,
  t[4] = l * R + o * L + n * S + p * H,
  t[5] = l * x + o * _ + n * M + p * P,
  t[6] = l * w + o * A + n * T + p * G,
  t[7] = l * y + o * b + n * F + p * e,
  t[8] = d * R + c * L + g * S + u * H,
  t[9] = d * x + c * _ + g * M + u * P,
  t[10] = d * w + c * A + g * T + u * G,
  t[11] = d * y + c * b + g * F + u * e,
  t[12] = m * R + v * L + f * S + i * H,
  t[13] = m * x + v * _ + f * M + i * P,
  t[14] = m * w + v * A + f * T + i * G,
  t[15] = m * y + v * b + f * F + i * e,
  t
}
function translateFn(t, e) {
  return translate(t, t, e)
}
function translate(t, e, i) {
  var s, r, a, h, l, o, n, p, d, c, g, u, m = i[0], v = i[1], i = i[2];
  return e === t ? (t[12] = e[0] * m + e[4] * v + e[8] * i + e[12],
  t[13] = e[1] * m + e[5] * v + e[9] * i + e[13],
  t[14] = e[2] * m + e[6] * v + e[10] * i + e[14],
  t[15] = e[3] * m + e[7] * v + e[11] * i + e[15]) : (s = e[0],
  r = e[1],
  a = e[2],
  h = e[3],
  l = e[4],
  o = e[5],
  n = e[6],
  p = e[7],
  d = e[8],
  c = e[9],
  g = e[10],
  u = e[11],
  t[0] = s,
  t[1] = r,
  t[2] = a,
  t[3] = h,
  t[4] = l,
  t[5] = o,
  t[6] = n,
  t[7] = p,
  t[8] = d,
  t[9] = c,
  t[10] = g,
  t[11] = u,
  t[12] = s * m + l * v + d * i + e[12],
  t[13] = r * m + o * v + c * i + e[13],
  t[14] = a * m + n * v + g * i + e[14],
  t[15] = h * m + p * v + u * i + e[15]),
  t
}
function scaleFn(t, e) {
  return scale(t, t, e)
}
function scale(t, e, i) {
  var s = i[0]
    , r = i[1]
    , i = i[2];
  return t[0] = e[0] * s,
  t[1] = e[1] * s,
  t[2] = e[2] * s,
  t[3] = e[3] * s,
  t[4] = e[4] * r,
  t[5] = e[5] * r,
  t[6] = e[6] * r,
  t[7] = e[7] * r,
  t[8] = e[8] * i,
  t[9] = e[9] * i,
  t[10] = e[10] * i,
  t[11] = e[11] * i,
  t[12] = e[12],
  t[13] = e[13],
  t[14] = e[14],
  t[15] = e[15],
  t
}

 
function Plane(t) {
  var t = t.p
    , e = {};
  const i = t.pts.h
    , s = t.pts.v
    , r = i - 1
    , a = s - 1
    , h = 1 / r
    , l = 1 / a;
  var o = [];
  let n = 0;
  for (let t = 0; t < s; t++) {
      var p = t * l - 1;
      for (let t = 0; t < i; t++)
          o[n++] = t * h,
          o[n++] = p
  }
  e.pos = o;
  var d = [];
  let c = 0;
  var g = s - 1
    , u = s - 2
    , m = i - 1;
  for (let e = 0; e < g; e++) {
      var v = i * e
        , f = v + i;
      for (let t = 0; t < i; t++) {
          var R = f + t;
          d[c++] = v + t,
          d[c++] = R,
          t === m && e < u && (d[c++] = R,
          d[c++] = i * (e + 1))
      }
  }
  e.index = d;
  var x = [];
  let w = 0;
  for (let t = 0; t < s; t++) {
      var y = 1 - t / a;
      for (let t = 0; t < i; t++)
          x[w++] = t / r,
          x[w++] = y
  }
  return e.texture = x,
  e
}
new Controller({
  device: "d",
  engine: Engine,
  transition: {
    intro: Intro,
    mutation: Mutation,
  },
});
