import { equal, contains } from './assertions';

type SingleValue = number | boolean;
type Collection = string | Array<any> | object;

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

interface ObjectAssertion<T, K> {
  to: {
    contain: (partial: Partial<T>) => void;
  }
}

// eslint-disable-next-line max-len
function typedExpect(array: Array<any>): ComparisonAssertion<Array<any>> & InclusionAssertion<Array<any>>;
function typedExpect(string: string): ComparisonAssertion<string> & StringAssertion;
function typedExpect(actual: SingleValue): ComparisonAssertion<SingleValue>;
// eslint-disable-next-line max-len
function typedExpect<T, K extends keyof T>(object: T): ComparisonAssertion<T> & ObjectAssertion<T, K>;

function typedExpect(actual: SingleValue | Collection): any {
  if (typeof actual === 'number' || typeof actual === 'boolean') {
    return {
      to: {
        equal: equal(actual)
      }
    };
  }

  if (Array.isArray(actual) || typeof actual === 'string') {
    return {
      to: {
        equal: equal(actual),
        contain: contains(actual)
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
