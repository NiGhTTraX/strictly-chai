import { contains, equal } from './assertions';

interface ComparisonAssertion<T> {
  to: {
    equal: (expected: T) => void;
  }
}

// noinspection JSUnusedLocalSymbols
type Primitive = number | boolean | string;

interface InclusionAssertion<T> {
  to: {
    contain: (member: T[keyof T]) => void;
  }
}
// noinspection JSUnusedLocalSymbols
function typedExpect<Array>(array: Array): ComparisonAssertion<Array> & InclusionAssertion<Array>;
// noinspection JSUnusedLocalSymbols
function typedExpect<Primitive>(actual: Primitive): ComparisonAssertion<Primitive>;

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
      contain: contains(actual)
    }
  };
}

export default typedExpect;
