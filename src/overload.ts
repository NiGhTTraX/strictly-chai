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
export default function overload<NewType, NewAssertion>(plugin: Plugin<NewType, NewAssertion>) {
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
