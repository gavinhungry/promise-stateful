/*
 * promise-stateful - Native Promise wrapper with state getters
 * https://github.com/gavinhungry/promise-stateful
 */

/**
 * Create a new promise the same way as you would with the Promise constructor:
 *
 *   let p = new PromiseStateful((res, rej) => {
 *     // ...
 *   });
 *
 *   p.isPending; // true
 *   p.isFulfilled; // false
 *   p.isRejected; // false
 *
 * Also works with Promise static methods:
 *
 *   let p = PromiseStateful.resolve('foo');
 *
 *   p.isPending; // false
 *   p.isFulfilled; // true
 */
const PromiseStateful = Object.setPrototypeOf(function(fn) {
  let states = {
    isPending: true,
    isFulfilled: false,
    isRejected: false
  };

  let p = new Promise(fn).then(
    val => {
      states.isFulfilled = true;
      return val;
    },
    err => {
      states.isRejected = true;
      throw err;
    }
  ).finally(() => {
    states.isPending = false;
  });

  Object.keys(states).forEach(state => {
    Object.defineProperty(p, state, {
      enumerable: false,
      get: () => states[state]
    });
  });

  return p;
}, Promise);

/**
 * Convenience method for creating a PromiseStateful from an existing Promise
 *
 * @param {Promise} p
 * @return {PromiseStateful}
 */
PromiseStateful.from = p => {
  return new PromiseStateful(p.then.bind(p));
};

module.exports = PromiseStateful;
