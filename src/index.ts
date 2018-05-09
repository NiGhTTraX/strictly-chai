import { equals, contains } from './assertions';

export interface ComparisonAssertion<T> {
  to: {
    equal: (expected: T) => void;
  }
}

export interface InclusionAssertion<T> {
  to: {
    contain: (member: T) => void;
  }
}

// string[keyof string] is number for some reason so that's why
// we have this separate interface instead of just using
// InclusionAssertion<string>.
export interface StringAssertion {
  to: {
    contain: (char: string) => void;
  }
}

// This is separate from InclusionAssertion to be able to
// use Partial<>.
export interface ObjectAssertion<T, K> {
  to: {
    contain: (partial: Partial<T>) => void;
  }
}

// eslint-disable-next-line max-len
function typedExpect<T>(array: Array<T> | Set<T>): ComparisonAssertion<Array<T> | Set<T>> & InclusionAssertion<T>;
function typedExpect(string: string): ComparisonAssertion<string> & StringAssertion;
function typedExpect(actual: number): ComparisonAssertion<number>;
function typedExpect(actual: boolean): ComparisonAssertion<boolean>;
// eslint-disable-next-line max-len
function typedExpect<K, V>(actual: Map<K, V>): ComparisonAssertion<Map<K, V>> & InclusionAssertion<V>;
// eslint-disable-next-line max-len
function typedExpect<T, K extends keyof T>(object: T): ComparisonAssertion<T> & ObjectAssertion<T, K>;

function typedExpect(actual: any): any {
  const equal = equals(actual);
  const contain = contains(actual);

  if (typeof actual === 'number' || typeof actual === 'boolean') {
    return {
      to: {
        equal
      }
    };
  }

  if (Array.isArray(actual) || typeof actual === 'string') {
    return {
      to: {
        equal,
        contain
      }
    };
  }

  return {
    to: {
      equal,
      contain
    }
  };
}

export default typedExpect;
