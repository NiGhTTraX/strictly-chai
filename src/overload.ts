import typedExpect, { BaseAssertionType } from './index';

export interface IsType<T> {
  (actual: any): actual is T;
}

export interface Expect<T, I> {
  (actual: T): I;
}

export interface Plugin<T, I> {
  expect: Expect<T, I>
  isType: IsType<T>
}

/**
 * Overload typedExpect to support new types.
 */
export function overload<NewType, NewAssertion>(plugin: Plugin<NewType, NewAssertion>) {
  function overloadedExpect(actual: NewType): NewAssertion;
  function overloadedExpect<T>(actual: T): BaseAssertionType<T>;

  function overloadedExpect(actual: any): any {
    if (actual && plugin.isType(actual)) {
      return plugin.expect(actual);
    }

    return typedExpect(actual);
  }

  return overloadedExpect;
}

export function overload2<T1, R1, T2, R2>(p1: Plugin<T1, R1>, p2: Plugin<T2, R2>) {
  function overloadedExpect(actual: T1): R1;
  function overloadedExpect(actual: T2): R2;
  function overloadedExpect<T>(actual: T): BaseAssertionType<T>;

  function overloadedExpect(actual: any): any {
    if (actual && p1.isType(actual)) {
      return p1.expect(actual);
    }

    if (actual && p2.isType(actual)) {
      return p2.expect(actual);
    }

    return typedExpect(actual);
  }

  return overloadedExpect;
}
