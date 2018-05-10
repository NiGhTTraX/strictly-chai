import { expect } from 'chai';
import contractTests from './expect-contract';
import overload, { Expect } from '../src/overload';
import typedExpect from '../src';

describe('Overload', function () {
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

  const overloadedExpect = overload(typedExpect, isCustom, customExpect);

  describe('should return the original expect', function () {
    contractTests(overloadedExpect);
  });

  it('should return the overloaded expect', function () {
    expect(overloadedExpect({ customProp: true }).customAssert('foobar')).to.equal('foobar');
  });

  it('should be idempotent', function () {
    const overloadedExpect2 = overload(typedExpect, isCustom, customExpect);

    expect(
      overloadedExpect2({ customProp: true }).customAssert('foobar')
    ).to.equal(
      overloadedExpect({ customProp: true }).customAssert('foobar')
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

    const overloadedExpect2 = overload(overloadedExpect, isCustom2, customExpect2);

    expect(overloadedExpect2({ customProp2: true }).customAssert2(42)).to.equal(42);
    expect(overloadedExpect2({ customProp: true }).customAssert('foobar')).to.equal('foobar');
  });
});
