import typedExpect from './index';

export type BaseExpectType = typeof typedExpect;
export type BaseAssertionType = ReturnType<BaseExpectType>;

export interface PluginInterface<T, I> {
// eslint-disable-next-line max-len
  (originalExpect: BaseExpectType): ((actual: T) => I) & BaseExpectType;
}

export default function enhance<T, I>(plugin: PluginInterface<T, I>) {
  return plugin(typedExpect);
}
