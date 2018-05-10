import contractTests from './expect-contract';
import enhance, { ExpectPlugin } from '../src/enhance';
import { BaseAssertionType } from '../src';

describe('Enhance', function () {
  interface CustomType {
    customProp: boolean;
  }

  interface CustomAssertion {
  }

  const plugin: ExpectPlugin<CustomType, CustomAssertion> = baseExpect => {
    function enhancedExpect(actual: CustomType): CustomAssertion;
    function enhancedExpect(actual: any): BaseAssertionType;

    function enhancedExpect(actual: any) {
      if (actual && (actual as CustomType).customProp !== undefined) {
        return {
        };
      }

      return baseExpect(actual);
    }

    return enhancedExpect;
  };

  const enhancedExpect = enhance(plugin);

  it('should return the enhanced expect', function () {
    contractTests(enhancedExpect);
  });
});
