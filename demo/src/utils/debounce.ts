/**
 * Debounce a given function.Call the provided function only once after the delay
 * time has passed. If this gets called before the delay is complete it will restart
 * the delay.
 */
export const debounceFunction = (fn: () => unknown, delay = 250) => {
  let timer = undefined;
  return (...args) => {
    const self = this;
    // If a timer already existed from a previous call - clear it
    clearTimeout(timer);
    timer = setTimeout(() => {
      // Call the provided function with args
      fn.apply(self, args);
      // Time in milliseconds to wait between function calls
    }, delay);
  };
};

export default debounceFunction;
