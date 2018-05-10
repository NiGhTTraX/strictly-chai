export interface IsNewType<T> {
  (actual: any): actual is T;
}

export interface Expect<T, I> {
  (actual: T): I;
}

export default function enhance<T, I>(
  baseExpect: (actual: any) => any,
  isNewType: IsNewType<T>,
  expect: Expect<T, I>
) {
  function enhancedExpect(actual: T): I;
  function enhancedExpect(actual: any): ReturnType<typeof baseExpect>;

  function enhancedExpect(actual: any) {
    if (actual && isNewType(actual)) {
      return expect(actual);
    }

    return baseExpect(actual);
  }

  return enhancedExpect;
}
