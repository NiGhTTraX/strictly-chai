import typedExpect from './index';

export type typeOfExpect = typeof typedExpect;
export type typeOfOriginalAssertion = ReturnType<typeOfExpect>;

export interface PluginInterface<T, I> {
// eslint-disable-next-line max-len
  (originalExpect: typeOfExpect): ((actual: T) => I) & typeOfExpect;
}

export default function enhance<T, I>(plugin: PluginInterface<T, I>) {
  return plugin(typedExpect);
}
