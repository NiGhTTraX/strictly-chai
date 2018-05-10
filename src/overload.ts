export interface IsNewType<T> {
  (actual: any): actual is T;
}

export interface Expect<T, I> {
  (actual: T): I;
}

export default function overload<NewType, NewAssertion>(
  baseExpect: (actual: any) => any,
  isNewType: IsNewType<NewType>,
  newExpect: Expect<NewType, NewAssertion>
) {
  function overloadedExpect(actual: NewType): NewAssertion;
  function overloadedExpect(actual: any): ReturnType<typeof baseExpect>;

  function overloadedExpect(actual: any) {
    if (actual && isNewType(actual)) {
      return newExpect(actual);
    }

    return baseExpect(actual);
  }

  return overloadedExpect;
}
