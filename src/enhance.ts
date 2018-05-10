import typedExpect, { BaseExpectType } from './index';

export interface ExpectPlugin<T, I> {
  (originalExpect: BaseExpectType): ((actual: T) => I) & BaseExpectType;
}

export default function enhance<T, I>(plugin: ExpectPlugin<T, I>) {
  return plugin(typedExpect);
}
