import typedExpect, { BaseAssertionType } from './index';

export interface IsNewType<T> {
  (actual: any): actual is T;
}

export interface Expect<T, I> {
  (actual: T): I;
}

/**
 * Overload typedExpect to support new types.
 */
export default function overload<NewType, NewAssertion>(
  isNewType: IsNewType<NewType>,
  newExpect: Expect<NewType, NewAssertion>
) {
  function overloadedExpect(actual: NewType): NewAssertion;
  function overloadedExpect<T>(actual: T): BaseAssertionType<T>;

  function overloadedExpect(actual: any): any {
    if (actual && isNewType(actual)) {
      return newExpect(actual);
    }

    return typedExpect(actual);
  }

  return overloadedExpect;
}
