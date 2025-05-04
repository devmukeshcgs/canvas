import Controller from "./classes/Controller";
import Engine from "./classes/Engine";
import Intro from "./classes/Intro";
import Mutation from "./classes/Mutation";

console.log("MAIN");
// Define a global R object if it doesn't exist
window.R = {};

/**
 * Inverse Lerp - calculates the interpolation factor between two values
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} value - Current value
 * @returns {number} Normalized value between 0 and 1
 */
R.iLerp = (start, end, value) => R.Clamp((value - start) / (end - start), 0, 1);

/**
 * Linear interpolation between two values
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} factor - Interpolation factor (0-1)
 * @returns {number} Interpolated value
 */
R.Lerp = (start, end, factor) => start * (1 - factor) + end * factor;

/**
 * Smooth damping function
 * @param {number} current - Current value
 * @param {number} target - Target value
 * @param {number} smoothingFactor - Smoothing factor (0-1)
 * @returns {number} Damped value
 */
R.Damp = (current, target, smoothingFactor) =>
  R.Lerp(current, target, 1 - Math.exp(Math.log(1 - smoothingFactor) * RD));

/**
 * Remaps a value from one range to another
 * @param {number} inStart - Input range start
 * @param {number} inEnd - Input range end
 * @param {number} outStart - Output range start
 * @param {number} outEnd - Output range end
 * @param {number} value - Value to remap
 * @returns {number} Remapped value
 */
R.Remap = (inStart, inEnd, outStart, outEnd, value) =>
  R.Lerp(outStart, outEnd, R.iLerp(inStart, inEnd, value));
////////////////////////////////
R.M = class {
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
        curve: config.easing || "linear"
      },
      duration: {
        original: config.duration || 0,
        current: 0
      },
      delay: config.delay || 0,
      callback: config.callback || null,
      round: config.round || 2,
      progress: 0,
      progressEnd: 0,
      elapsedTime: 0
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
          unit: config.properties[key][2] || "%"
        };
        animationConfig.propertyIndexes.push(key);
      }
    }

    // Handle SVG animation if provided
    if (config.svg) {
      animationConfig.svg = {
        type: config.svg.type,
        attribute: config.svg.type === "polygon" ? "points" : "d",
        start: config.svg.start || Svg.getInitialValues(animationConfig.element[0], config.svg.type),
        end: config.svg.end,
        current: config.svg.start,
        values: []
      };
    }

    // Handle line animation if provided
    if (config.line) {
      animationConfig.line = {
        dashed: config.line.dashed,
        coefficients: {
          start: config.line.start !== undefined ? (100 - config.line.start) / 100 : 1,
          end: config.line.end !== undefined ? (100 - config.line.end) / 100 : 0
        },
        pathLengths: [],
        start: [],
        end: [],
        current: []
      };

      // Initialize line path lengths and styles
      for (let i = 0; i < animationConfig.elementLength; i++) {
        const element = config.line.elementWidth || animationConfig.element[i];
        animationConfig.line.pathLengths[i] = Svg.getShapeLength(element);
        const dashedPattern = config.line.dashed ? this.createDashedPattern(config.line.dashed, animationConfig.line.pathLengths[i]) : animationConfig.line.pathLengths[i];
        animationConfig.element[i].style.strokeDasharray = dashedPattern;
        animationConfig.line.start[i] = animationConfig.line.coefficients.start * animationConfig.line.pathLengths[i];
        animationConfig.line.end[i] = animationConfig.line.coefficients.end * animationConfig.line.pathLengths[i];
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
          this.config.line.end[i] = this.config.line.coefficients.end * this.config.line.pathLengths[i];
        }
      } else {
        for (let i = 0; i < this.config.elementLength; i++) {
          this.config.line.end[i] = this.config.line.start[i];
        }
      }
    }

    this.config.duration.current = config.duration || this.config.duration.current;
    this.config.easing.curve = config.easing || this.config.easing.curve;
    this.config.easing.calc = typeof this.config.easing.curve === "string" ? Ease[this.config.easing.curve] : Ease4(this.config.easing.curve);
    this.config.delay = config.delay || this.config.delay;
    this.config.callback = config.callback || this.config.callback;

    this.config.progress = this.config.progressEnd = this.config.duration.current === 0 ? 1 : 0;
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
      this.config.progress = Clamp(this.config.elapsedTime / this.config.duration.current, 0, 1);
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
      transform += `translate3d(${properties[this.config.propertyIndexes.x].current + properties[this.config.propertyIndexes.x].unit}, 0, 0) `;
    }
    if (this.config.propertyIndexes.y) {
      transform += `translate3d(0, ${properties[this.config.propertyIndexes.y].current + properties[this.config.propertyIndexes.y].unit}, 0) `;
    }
    if (this.config.propertyIndexes.r) {
      transform += `${properties[this.config.propertyIndexes.r].name}(${properties[this.config.propertyIndexes.r].current}deg) `;
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
          this.config.element[i].style.opacity = properties[this.config.propertyIndexes.o].current;
        }
      }
    }
  }

  // Update SVG properties based on progress
  updateSvg() {
    const svg = this.config.svg;
    let currentTemp = "";

    for (let i = 0; i < svg.values.length; i++) {
      svg.values[i] = isNaN(svg.start[i]) ? svg.start[i] : this.lerp(svg.start[i], svg.end[i]);
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
}
////////////////////////////////
// Binds methods from an array to the given object
R.BM = (object, methods) => {
  let methodsCount = methods.length;
  for (let i = 0; i < methodsCount; i++) {
    const methodName = methods[i];
    object[methodName] = object[methodName].bind(object);
  }
};
///////////////////////

// Timeline
R.TL = class {
  constructor() {
    this.animations = [];  // Store animations
    this.totalDelay = 0;   // Total delay before the timeline starts
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
}
////////////////////////////////
// Clamps a value `t` within a range defined by `e` (min) and `i` (max).
R.Clamp = (value, min, max) => {
  return value < min ? min : value > max ? max : value;
};

// Creates a deep clone of an object `t`.
R.Clone = object => {
  return JSON.parse(JSON.stringify(object));
};
///////////////////////////////
// Delay
R.Delay = class {
  constructor(callback, duration) {
    this.callback = callback; // Function to be called after delay
    this.duration = duration; // Duration of the delay
    this.frameRequest = new RafRequest(this.loop); // RAF request for the loop
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
    timeElapsed = R.Clamp(timeElapsed, 0, this.duration);

    // Check if the delay duration is complete
    if (R.Clamp(timeElapsed / this.duration, 0, 1) === 1) {
      this.stop(); // Stop the animation loop
      this.callback(); // Execute the callback
    }
  }
}
///////////////////////////////
// Calculates the distance between two points (t, e) using the Pythagorean theorem
R.Dist = (x, y) => {
  return Math.sqrt(x * x + y * y);
};

///////////////////////////////
R.Ease = {
  // Linear easing
  linear: t => t,

  // Ease-In functions
  easeIn1: t => 1 - Math.cos(t * (0.5 * Math.PI)),
  easeIn2: t => t * t,
  easeIn3: t => t * t * t,
  easeIn4: t => t * t * t * t,
  easeIn5: t => t * t * t * t * t,
  easeIn6: t => t === 0 ? 0 : 2 ** (10 * (t - 1)),

  // Ease-Out functions
  easeOut1: t => Math.sin(t * (0.5 * Math.PI)),
  easeOut2: t => t * (2 - t),
  easeOut3: t => --t * t * t + 1,
  easeOut4: t => 1 - --t * t * t * t,
  easeOut5: t => 1 + --t * t * t * t * t,
  easeOut6: t => t === 1 ? 1 : 1 - 2 ** (-10 * t),

  // Ease-In-Out functions
  easeInOut1: t => -0.5 * (Math.cos(Math.PI * t) - 1),
  easeInOut2: t => t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1,
  easeInOut3: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInOut4: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  easeInOut5: t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  easeInOut6: t => t === 0 || t === 1 ? t : (t /= 0.5) < 1 ? 0.5 * 2 ** (10 * (t - 1)) : 0.5 * (2 - 2 ** (-10 * --t))
};

///////////////////////////////
R.r0 = (t, e) => 1 - 3 * e + 3 * t,
  R.r1 = (t, e) => 3 * e - 6 * t,
  R.r2 = (t, e, i) => ((R.r0(e, i) * t + R.r1(e, i)) * t + 3 * e) * t,
  R.r3 = (t, e, i) => 3 * R.r0(e, i) * t * t + 2 * R.r1(e, i) * t + 3 * e,
  ///////////////////////////////
  //findBezierRoot
  R.r4 = (targetValue, lowerBound, upperBound, controlPoint1, controlPoint2) => {
    let midpoint, error, iterations = 0;

    // Iterate to find the root of the Bezier curve
    while (iterations < 10) {
      // Calculate the midpoint between lower and upper bounds
      midpoint = lowerBound + 0.5 * (upperBound - lowerBound);

      // Evaluate the curve at the midpoint
      error = R.evaluateBezier(midpoint, controlPoint1, controlPoint2) - targetValue;

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
  }
///////////////////////////////
//solveBezierRoot
R.r5 = (targetValue, initialGuess, controlPoint1, controlPoint2) => {
  // Iterate up to 4 times to refine the root of the Bezier curve
  for (let iteration = 0; iteration < 4; ++iteration) {
    // Calculate the derivative of the Bezier curve at the current guess
    const derivative = R.evaluateBezierDerivative(initialGuess, controlPoint1, controlPoint2);

    // If the derivative is zero, return the current guess
    if (derivative === 0) {
      return initialGuess;
    }

    // Refine the initial guess based on the error and derivative
    const error = R.evaluateBezier(initialGuess, controlPoint1, controlPoint2) - targetValue;
    initialGuess -= error / derivative;
  }

  // Return the refined guess
  return initialGuess;
}
///////////////////////////////
//createEaseFunction
R.Ease4 = (controlPoints) => {
  const [controlPoint1, controlPoint2, controlPoint3, controlPoint4] = controlPoints;
  const lookupTable = new Float32Array(11);

  // If control points differ, populate the lookup table
  if (controlPoint1 !== controlPoint2 || controlPoint3 !== controlPoint4) {
    for (let i = 0; i < 11; ++i) {
      lookupTable[i] = R.evaluateBezier(.1 * i, controlPoint1, controlPoint3);
    }
  }

  // Return the easing function
  return (t) => {
    // If control points are equal or t is 0 or 1, return t directly
    if (controlPoint1 === controlPoint2 && controlPoint3 === controlPoint4 || t === 0 || t === 1) {
      return t;
    }

    // Perform lookup and interpolation for the easing function
    const interpolation = (t) => {
      let baseIndex = 0;
      for (let i = 1; i < 10 && lookupTable[i] <= t; ++i) {
        baseIndex += 0.1;
      }

      const relativeT = (t - lookupTable[baseIndex]) / (lookupTable[baseIndex + 1] - lookupTable[baseIndex]);
      const adjustedT = baseIndex + 0.1 * relativeT;

      const derivative = R.evaluateBezierDerivative(adjustedT, controlPoint1, controlPoint3);
      if (Math.abs(derivative) >= 0.001) {
        return R.solveBezierRoot(t, adjustedT, controlPoint1, controlPoint3);
      }

      return derivative === 0 ? adjustedT : R.findRoot(t, derivative, adjustedT, adjustedT + 0.1, controlPoint1, controlPoint3);
    };

    return interpolation(t);
  };
}
///////////////////////////////
R.Fetch = (requestConfig) => {
  const isJson = requestConfig.type === "json";
  const responseType = isJson ? "json" : "text";

  // Set up the fetch request configuration
  const fetchConfig = {
    method: isJson ? "POST" : "GET",
    headers: new Headers({
      "Content-Type": isJson ? "application/x-www-form-urlencoded" : "text/html"
    }),
    mode: "same-origin"
  };

  // If the request is JSON, include the body in the configuration
  if (isJson) {
    fetchConfig.body = requestConfig.body;
  }

  // Make the fetch request
  fetch(requestConfig.url, fetchConfig)
    .then(response => {
      if (response.ok) {
        return response[responseType](); // Return the parsed response based on type (json or text)
      } else {
        // Handle response errors
        requestConfig.error && requestConfig.error();
      }
    })
    .then(parsedData => {
      // Call the success callback with the parsed data
      requestConfig.success(parsedData);
    })
    .catch(err => {
      // Handle fetch errors (network issues, etc.)
      console.error('Fetch error:', err);
      requestConfig.error && requestConfig.error(err);
    });
};

///////////////////////////////
//hasOwnProperty
R.has = (object, property) => object.hasOwnProperty(property);

///////////////////////////////
//isType
R.Is = {
  isString: value => typeof value === "string",
  isObject: value => value === Object(value),
  isArray: value => Array.isArray(value),
  isDefined: value => value !== undefined,
  isUndefined: value => value === undefined
};

///////////////////////////////
// Modulo function ensuring positive results
R.Mod = (value, divisor) => (value % divisor + divisor) % divisor;

// Pad number with leading zeros
R.Pad = (value, length) => ("000" + value).slice(-length);

// Parametric curve calculation
R.PCurve = (t, e, i) => {
  return ((e + i) ** (e + i)) / (e ** e * i ** i) * t ** e * (1 - t) ** i;
};

// Rounded value with precision
R.R = (value, precision) => {
  precision = R.Is.isUndefined(precision) ? 100 : 10 ** precision;
  return Math.round(value * precision) / precision;
};

///////////////////////////////
R.Select = {
  // Select elements based on selector type (ID or class)
  getElement: selector => {
    let elements = [];
    let identifier;

    if (R.Is.isString(selector)) {
      identifier = selector.substring(1);
      if (selector.charAt(0) === "#") {
        elements[0] = R.G.id(identifier); // Select by ID
      } else {
        elements = R.G.class(identifier); // Select by class
      }
    } else {
      elements[0] = selector; // Directly use the provided element
    }

    return elements;
  },

  // Determine the type of selector: ID or class
  getSelectorType: selector => {
    return selector.charAt(0) === "#" ? "id" : "class";
  },

  // Get the name of the selector (without the leading # or .)
  getName: selector => selector.substring(1),
};

///////////////////////////////
// addEventListenerToElements
R.L = (selector, eventType, eventAction, eventListener) => {
  const elements = R.Select.getElement(selector);
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
    this.tabs = [];  // Array to hold the tabs
    this.lastPauseTime = 0;  // Track the last time the tab was paused
    R.BM(this, ["handleVisibilityChange"]);

    // Attach the visibility change event listener to the document
    R.L(document, "a", "visibilitychange", this.handleVisibilityChange);
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
}

///////////////////////////////
// Instantiate a new Tab object and assign it to `RD`
let RD = (R.Tab = new Tab());
// Constant for the frame rate (60 FPS)
let FR = 1000 / 60;

///////////////////////////////
class Raf {
  constructor() {
    this.callbacks = [];
    this.isRunning = true;
    this.timeStart = null;

    // Bind methods
    this.bindMethods(["loop", "pause", "resume"]);

    // Add the start/stop actions to the Tab
    R.Tab.addTab({
      stop: this.pause,
      start: this.resume
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

        if (R.Is.def(callbackData)) {
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
    methods.forEach(method => {
      this[method] = this[method].bind(this);
    });
  }
}

// Initialize the Raf class
new Raf();

///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
R.ROR = class {
  constructor(callback) {
    if (typeof callback !== "function") {
      throw new TypeError("Callback must be a function.");
    }

    this.cb = callback;
    this.id = RoId++;
  }

  on() {
    if (!this.cb) {
      console.warn("Cannot register callback: callback is undefined.");
      return;
    }

    Ro.add({
      id: this.id,
      cb: this.cb,
    });
  }

  off() {
    Ro.remove(this.id);
  }
};



new Controller({
  device: "d",
  engine: Engine,
  transition: {
    intro: Intro,
    mutation: Mutation
  }
})

