import { expect } from 'chai';
import { contains, equals, notContains, notEquals } from './assertions';

export interface LanguageChain<T> {
  // eslint-disable-next-line no-use-before-define
  to: BaseAssertionType<T>;
}

export interface ScalarAssertion<T> extends LanguageChain<T> {
  equal: (expected: T) => void;
  not: ScalarAssertion<T>;
}

export interface VectorAssertion<T> extends LanguageChain<T> {
  contain: (member: T extends Array<infer U> ? U
  : T extends Set<infer U> ? U
  : T extends Map<infer K, infer V> ? V
  : T extends string ? string
  : never) => void;
  not: VectorAssertion<T>
}

// This is separate from VectorAssertion to be able to use Partial<>.
export interface ObjectAssertion<T> extends LanguageChain<T> {
  contain: (partial: Partial<T>) => void;
  not: ObjectAssertion<T>;
}

export interface FunctionAssertion<T> extends LanguageChain<T> {
  throw: () => void;
  not: FunctionAssertion<T>;
}

function typedExpect<T extends Function>(func: T): ScalarAssertion<T> & FunctionAssertion<T>;
function typedExpect<T>(array: Array<T>): ScalarAssertion<Array<T>> & VectorAssertion<Array<T>>;
function typedExpect<T>(array: Set<T>): ScalarAssertion<Set<T>> & VectorAssertion<Set<T>>;
function typedExpect(string: string): ScalarAssertion<string> & VectorAssertion<string>;
function typedExpect(actual: number): ScalarAssertion<number>;
function typedExpect(actual: boolean): ScalarAssertion<boolean>;
// eslint-disable-next-line max-len
function typedExpect<K, V>(actual: Map<K, V>): ScalarAssertion<Map<K, V>> & VectorAssertion<Map<K, V>>;
function typedExpect<T>(object: T): ScalarAssertion<T> & ObjectAssertion<T>;

function typedExpect(actual: any): any {
  const equal = equals(actual);
  const contain = contains(actual);
  const notEqual = notEquals(actual);
  const notContain = notContains(actual);

  if (typeof actual === 'number' || typeof actual === 'boolean') {
    return {
      to: {
        equal,
        not: {
          equal: notEqual
        }
      }
    };
  }

  if (typeof actual === 'function') {
    return {
      to: {
        equal,
        throw() { expect(actual).to.throw(); },
        not: {
          equal: notEqual,
          throw() { expect(actual).to.not.throw(); }
        }
      }
    };
  }

  return {
    to: {
      equal,
      contain,
      not: {
        equal: notEqual,
        contain: notContain
      }
    }
  };
}

export default typedExpect;

// eslint-disable-next-line space-infix-ops
export type BaseAssertionType<T> =
  T extends Function ? ScalarAssertion<T> & FunctionAssertion<T>
  : T extends Array<infer V> ? ScalarAssertion<Array<V>> & VectorAssertion<Array<V>>
  : T extends Set<infer V> ? ScalarAssertion<Set<V>> & VectorAssertion<Set<V>>
  : T extends string ? ScalarAssertion<string> & VectorAssertion<string>
  : T extends number ? ScalarAssertion<number>
  : T extends boolean ? ScalarAssertion<boolean>
  : T extends Map<infer K, infer V> ? ScalarAssertion<Map<K, V>> & VectorAssertion<Map<K, V>>
  : ScalarAssertion<T> & ObjectAssertion<T>;
