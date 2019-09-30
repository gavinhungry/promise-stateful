promise-stateful
================
Native Promise wrapper with state getters
(`isPending`, `isFulfilled`, `isRejected`).

Installation
------------

    npm install promise-stateful

Usage
-----

```js
import PromiseStateful from 'promise-stateful';
```

### Constructor

Create a new promise the same way as you would with the `Promise` constructor:

```js

  let p = new PromiseStateful((res, rej) => {
    // ...
  });

  p.isPending; // true
  p.isFulfilled; // false
  p.isRejected; // false
```

Also works with `Promise` static methods:

```js
  let p = PromiseStateful.resolve('foo');

  p.isPending; // false
  p.isFulfilled; // true
```

### PromiseStateful.from

Create a `PromiseStateful` from an existing `Promise` with
`PromiseStateful.from`:

```js
let nativePromise = Promise.resolve(123);
nativePromise.isFulfilled; // undefined

let p = PromiseStateful.from(nativePromise);
p.isFulfilled; // true
````

License
-------
This software is released under the terms of the **MIT license**. See `LICENSE`.
