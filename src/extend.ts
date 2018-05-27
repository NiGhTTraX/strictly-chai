import * as chai from 'chai';
import typedExpect, { BaseAssertionType } from './index';

export type Chai = typeof chai;

export interface IsType<T> {
  (actual: any): actual is T;
}

export interface Expect<T, I> {
  (actual: T): I;
}

export interface Plugin<T, I> {
  /**
   * You can use the given chai instance to install plugins using chai.use.
   */
  (chai: Chai): {
    expect: Expect<T, I>;
    /**
     * Assert that the target is of the given type. This will be used to know
     * when to call the given `expect` method.
     */
    isType: IsType<T>;
  }
}

// eslint-disable-next-line max-len
function extend<T1, R1>(plugin: Plugin<T1, R1>): ((actual: T1) => R1) & (<T>(actual: T) => BaseAssertionType<T>);
// eslint-disable-next-line max-len
function extend<T1, R1, T2, R2>(p1: Plugin<T1, R1>, p2: Plugin<T2, R2>): ((actual: T1) => R1) & ((actual: T2) => R2) & (<T>(actual: T) => BaseAssertionType<T>);

/**
 * Overload the expect method to support new types.
 *
 * The plugins will applied in the given order which translates to the
 * overload order for the expect method.
 *
 * Unfortunately, due to how this method is written to leverage the TS compiler,
 * you can only extend with a limited number of plugins. It is trivial to add
 * more but it involves repetitive boilerplate. Contributions are welcome :)
 */
function extend(...p: Plugin<any, any>[]) {
  if (p.length === 1) {
    return extend1(p[0]);
  }
  return extend2(p[0], p[1]);
}

export { extend };

function extend1<T1, R1>(p1: Plugin<T1, R1>) {
  const { isType: isType1, expect: expect1 } = p1(chai);

  function overloadedExpect(actual: T1): R1;
  function overloadedExpect<T>(actual: T): BaseAssertionType<T>;

  function overloadedExpect(actual: any): any {
    if (actual && isType1(actual)) {
      return expect1(actual);
    }

    return typedExpect(actual);
  }

  return overloadedExpect;
}
function extend2<T1, R1, T2, R2>(p1: Plugin<T1, R1>, p2: Plugin<T2, R2>) {
  const { isType: isType1, expect: expect1 } = p1(chai);
  const { isType: isType2, expect: expect2 } = p2(chai);

  function overloadedExpect(actual: T1): R1;
  function overloadedExpect(actual: T2): R2;
  function overloadedExpect<T>(actual: T): BaseAssertionType<T>;

  function overloadedExpect(actual: any): any {
    if (actual && isType1(actual)) {
      return expect1(actual);
    }

    if (actual && isType2(actual)) {
      return expect2(actual);
    }

    return typedExpect(actual);
  }

  return overloadedExpect;
}
