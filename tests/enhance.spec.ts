import { expect } from 'chai';
import contractTests from './expect-contract';
import enhance, { Expect } from '../src/enhance';
import typedExpect from '../src';

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

  const enhancedExpect = enhance(typedExpect, isCustom, customExpect);

  describe('should return the original expect', function () {
    contractTests(enhancedExpect);
  });

  it('should return the enhanced expect', function () {
    expect(enhancedExpect({ customProp: true }).customAssert('foobar')).to.equal('foobar');
  });

  it('should be idempotent', function () {
    const enhancedExpect2 = enhance(typedExpect, isCustom, customExpect);

    expect(
      enhancedExpect2({ customProp: true }).customAssert('foobar')
    ).to.equal(
      enhancedExpect({ customProp: true }).customAssert('foobar')
    );
  });

  it('should be additive', function () {
    interface CustomType2 {
      customProp2: boolean;
    }

    interface CustomAssertion2 {
      customAssert2: (foo: number) => number;
    }

    const isCustom2 = (actual: any): actual is CustomType2 => ((actual as CustomType2).customProp2);
    const customExpect2: Expect<CustomType2, CustomAssertion2> = () => ({
      customAssert2: (foo: number) => foo
    });

    const enhancedExpect2 = enhance(enhancedExpect, isCustom2, customExpect2);

    expect(enhancedExpect2({ customProp2: true }).customAssert2(42)).to.equal(42);
    expect(enhancedExpect2({ customProp: true }).customAssert('foobar')).to.equal('foobar');
  });
});
