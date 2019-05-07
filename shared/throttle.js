// wrap a function in this to throttle
const throttle = (func, limitInMilliseconds) => {
  let inThrottle;
  return (...args) => {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limitInMilliseconds);
    }
  };
};

module.exports = throttle;
