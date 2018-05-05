import { expect } from 'chai';

interface PrimitiveAssertion<T> {
  to: {
    equal: (expected: T) => void;
  }
}

interface ArrayAssertion<T> {
  to: {
    equal: (expected: T) => void;
    contain: (member: T[keyof T]) => void;
  }
}

// noinspection JSUnusedLocalSymbols
function typedExpect<Array>(array: Array): ArrayAssertion<Array>;
// noinspection JSUnusedLocalSymbols
function typedExpect<T>(actual: T): PrimitiveAssertion<T>;

function typedExpect(actual: any): any {
  if (typeof actual !== 'object') {
    return {
      to: {
        equal: (expected: any) => {
          expect(actual).to.deep.equal(expected);
        }
      }
    };
  }

  return {
    to: {
      equal: (expected: any) => {
        expect(actual).to.deep.equal(expected);
      },
      contain: (member: any) => {
        expect(actual).to.contain(member);
      }
    }
  };
}

export default typedExpect;
