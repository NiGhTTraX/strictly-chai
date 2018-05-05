import { expect } from 'chai';

interface ComparisonAssertion<T> {
  to: {
    equal: (expected: T) => void;
  }
}

interface InclusionAssertion<T> {
  to: {
    contain: (member: T[keyof T]) => void;
  }
}

// noinspection JSUnusedLocalSymbols
function typedExpect<Array>(array: Array): ComparisonAssertion<Array> & InclusionAssertion<Array>;
// noinspection JSUnusedLocalSymbols
function typedExpect<T>(actual: T): ComparisonAssertion<T>;

function typedExpect(actual: any): any {
  if (typeof actual !== 'object') {
    return {
      to: {
        equal: equal(actual)
      }
    };
  }

  return {
    to: {
      equal: equal(actual),
      contain: (member: any) => {
        expect(actual).to.contain(member);
      }
    }
  };
}

export default typedExpect;

function equal(actual: any) {
  return (expected: any) => {
    expect(actual).to.deep.equal(expected);
  };
}
