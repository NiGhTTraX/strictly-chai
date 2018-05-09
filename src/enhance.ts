import typedExpect from './index';

export type typeOfExpect = typeof typedExpect;
export type typeOfOriginalSubject = typeOfExpect;
export type typeOfOriginalAssertion = ReturnType<typeOfOriginalSubject>;

export interface PluginInterface<T, I> {
// eslint-disable-next-line max-len
  (originalExpect: typeOfExpect): ((actual: T) => I) & ((actual: typeOfOriginalSubject) => typeOfOriginalAssertion);
}

export default function enhance<T, I>(plugin: PluginInterface<T, I>) {
  return plugin(typedExpect);
}
