import { expect } from 'chai';
import contractTests from './expect-contract';
import enhance, { Expect } from '../src/enhance';

describe('Enhance', function () {
  interface CustomType {
    customProp: boolean;
  }

  interface CustomAssertion {
    customAssert: (foo: string) => string;
  }

  const isCustom = (actual: any): actual is CustomType => ((actual as CustomType).customProp);
  const customExpect: Expect<CustomType, CustomAssertion> = () => ({
    customAssert: (foo: string) => foo
  });

  const enhancedExpect = enhance(isCustom, customExpect);

  describe('should return the original expect', function () {
    contractTests(enhancedExpect);
  });

  it('should return the enhanced expect', function () {
    expect(enhancedExpect({ customProp: true }).customAssert('foobar')).to.equal('foobar');
  });

  it('should be idempotent', function () {
    const enhancedExpect2 = enhance(isCustom, customExpect);

    expect(
      enhancedExpect2({ customProp: true }).customAssert('foobar')
    ).to.equal(
      enhancedExpect({ customProp: true }).customAssert('foobar')
    );
  });
});
