import { expect } from 'chai';

interface Assertion<T> {
  to: {
    equal: (expected: T) => void;
  }
}

function typedExpect<T>(actual: T): Assertion<T> {
  return {
    to: {
      equal: (expected: T) => {
        expect(actual).to.equal(expected);
      }
    }
  };
}

export default typedExpect;
