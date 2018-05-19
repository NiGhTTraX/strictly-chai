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

// eslint-disable-next-line max-len
function extend<T1, R1>(plugin: Plugin<T1, R1>): ((actual: T1) => R1) & (<T>(actual: T) => BaseAssertionType<T>);
// eslint-disable-next-line max-len
function extend<T1, R1, T2, R2>(p1: Plugin<T1, R1>, p2: Plugin<T2, R2>): ((actual: T1) => R1) & ((actual: T2) => R2) & (<T>(actual: T) => BaseAssertionType<T>);

/**
 * Overload typedExpect to support new types.
 */
function extend(...p: Plugin<any, any>[]) {
  if (p.length === 1) {
    return extend1(p[0]);
  }
  return extend2(p[0], p[1]);
}

export { extend };

function extend1<T1, R1>(p1: Plugin<T1, R1>) {
  function overloadedExpect(actual: T1): R1;
  function overloadedExpect<T>(actual: T): BaseAssertionType<T>;

  function overloadedExpect(actual: any): any {
    if (actual && p1.isType(actual)) {
      return p1.expect(actual);
    }

    return typedExpect(actual);
  }

  return overloadedExpect;
}
function extend2<T1, R1, T2, R2>(p1: Plugin<T1, R1>, p2: Plugin<T2, R2>) {
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
