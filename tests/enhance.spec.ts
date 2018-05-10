import contractTests from './expect-contract';
import enhance, { Expect } from '../src/enhance';

describe('Enhance', function () {
  interface CustomType {
    customProp: boolean;
  }

  interface CustomAssertion {
  }

  const isCustom = (actual: any): actual is CustomType => ((actual as CustomType).customProp);
  const customExpect: Expect<CustomType, CustomAssertion> = () => ({});

  const enhancedExpect = enhance(isCustom, customExpect);

  describe('should return the original expect', function () {
    contractTests(enhancedExpect);
  });
});
