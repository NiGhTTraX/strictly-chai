[![Build
Status](https://travis-ci.com/NiGhTTraX/strictly-chai.svg?branch=master)](https://travis-ci.com/NiGhTTraX/strictly-chai) 
[![codecov](https://codecov.io/gh/NiGhTTraX/strictly-chai/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/strictly-chai)
[![Greenkeeper badge](https://badges.greenkeeper.io/NiGhTTraX/strictly-chai.svg)](https://greenkeeper.io/)

> A statically typed subset of [chai](http://www.chaijs.com) assertions written
in TypeScript.


## Philosophy

```js
expect(new Set([1, 2])).to.contain('a');
```

While the above is perfectly valid JS and chai will throw an AssertionError at
runtime, it is desirable to turn that into a compile time error when using
TypeScript.

Using this library instead of `chai.expect` in the assertion above will
fail to compile with the following:

```
Error:(54, 47) TS2345: Argument of type '"a"' is not assignable
to parameter of type 'number'.
```


## But wait, what about `@types/chai`?

`@types/chai` declares all the arguments as `any` so using chai
directly in TypeScript will not provide any type checking.


## Usage

![object-contains](./docs/object-contains.png)

![demo](./docs/demo.gif)

This library exports a subset of chai's [BDD API](http://www.chaijs.com/api/bdd/)
so check out their docs on usage. The only difference is that the `.equal`
assertion is by default deep (equivalent to `.deep.equal`).


## Plugins

You can extend this library, similarly to how `chai.use` works, and keep type
safety using `extend`:

```ts
import { Expect, extend, IsType, Plugin } from 'strictly-chai/extend';

type MyAwesomeType = {
  myAwesomeProp: 42
};

interface MyAwesomeAssertion {
  to: {
    be: {
      awesome: () => void;
    }
  }
}

const isMyAwesomeType: IsType<MyAwesomeType> = (actual: any): actual is MyAwesomeType =>
  ((actual as MyAwesomeType).myAwesomeProp === 42);

const plugin: Plugin<MyAwesomeType, MyAwesomeAssertion> = chai => {
  // You have access to the chai instance so you can do chai.use() here.

  const myAwesomeExpect: Expect<MyAwesomeType, MyAwesomeAssertion> = actual => ({
    to: {
      be: {
        awesome: () => {}
      }
    }
  });

  return {
    isType: isMyAwesomeType,
    expect: myAwesomeExpect
  };
};

const expect = extend(plugin);

// This is our awesome assertion.
expect({ myAwesomeProp: 42 }).to.be.awesome();

// And this is from the inherited base assertions.
expect('foobar').to.contain('foo');
```
