import { contains, equal } from './assertions';

type SingleValue = number | boolean;
type Collection = string | Array<any>;

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

// string[keyof string] is number for some reason so that's why
// we have this separate interface instead of just using
// InclusionAssertion<string>.
interface StringAssertion {
  to: {
    contain: (char: string) => void;
  }
}

// eslint-disable-next-line max-len
function typedExpect(array: Array<any>): ComparisonAssertion<Array<any>> & InclusionAssertion<Array<any>>;
function typedExpect(string: string): ComparisonAssertion<string> & StringAssertion;
function typedExpect(actual: SingleValue): ComparisonAssertion<SingleValue>;

function typedExpect(actual: SingleValue | Collection): any {
  if (typeof actual !== 'object' && typeof actual !== 'string') {
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
