/** Utility Functions */

/** Modular Scale Bases */
export const modularScaleBases = [
  1.067, // Minor Second
  1.125, // Major Second
  1.2,   // Minor Third
  1.25,  // Major Third
  1.333, // Perfect Fourth
  1.414, // Augmented Fourth / Diminished Fifth
  1.5,   // Perfect Fifth
  1.6,   // Minor Sixth
  1.667, // Golden Ratio
  1.875, // Major Sixth
  2,     // Minor Seventh
  2.125, // Major Seventh
  2.25,  // Octave
  2.5,   // Major Tenth
  2.667, // Major Eleventh
  3,     // Major Twelfth / Perfect Twelfth
  3.5,   // Double Octave
];

/**
 * Calculate Modular Scale
 * @param {number} base Scale base
 * @param {number} ratio Scale ratio
 * @param {number} steps Steps
 * @returns {number[]} Calculated Modular Sizes
 * @example calculateModularScale(16, modularScaleBases[0], 5);
 */
export const calculateModularScale = (base, ratio, steps = 5) => {
  const sizes = [base];
  for(let x=0; x<steps; x++) {
    sizes.push(parseFloat((sizes[x]*ratio).toFixed(3)));
  }
  return sizes;
};

/**
 * Convert any case to camel case
 * 
 * @param {string} str String to convert
 * @returns string
 */
export const toCamelCase = str => {
  const s = 
    str && 
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join();
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

/**
 * Convert any case to kebab case
 * 
 * @param {string} str String to convert
 * @returns string
 */
export const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join("-");

/**
 * Convert any case to pascal case
 * 
 * @param {string} str String to convert
 * @returns string
 */
export const toPascalCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
    .join();

/**
 * Convert any case to snake case
 * 
 * @param {string} str String to convert
 * @returns string
 */
export const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase)
    .join("_");

/**
 * Detect Platform
 * @returns {string} "android", "iphone", "ipad", "linux", "macintosh", "windows" or "unknown"
 */
export const detectPlatform = () => {
  if(window.platform) {
    return window.platform;
  }
  const ua = window.navigator.userAgent.toLowerCase();
  const platforms = {
    android: /android/,
    iphone: /iphone/,
    ipad: /ipad/,
    linux: /linux/,
    macintosh: /macintosh/,
    windows: /win/,
  };
  const platform = Object.keys(platforms).find(platform => platforms[platform].test(ua));
  window.platform = platform || "unknown";
  return window.platform;
};

/**
 * Runs `callback` when Document's `readyState` becomes "complete"
 * 
 * @param {void} callback
 * @returns {void}
 */
export const useDocumentReady = (callback) => {
  if(undefined === window) {
    setTimeout(() => useDocumentReady(callback));
  }
  if("document" in window && "complete" === document.readyState) {
    return callback();
  }
  document.addEventListener(
    "readystatechange", 
    () => callback(),
    { once: true, passive: true }
  );
};

/**
 * Get called method name
 */
export const getCalledMethodName = () => {
  return (new Error()).stack.replace('Error', '');
};

export const toPixels = value =>
  "number" === typeof value ? `${(value).toFixed(3)}px` : value;
