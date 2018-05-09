import typedExpect, { BaseExpectType } from './index';

export interface PluginInterface<T, I> {
  (originalExpect: BaseExpectType): ((actual: T) => I) & BaseExpectType;
}

export default function enhance<T, I>(plugin: PluginInterface<T, I>) {
  return plugin(typedExpect);
}
