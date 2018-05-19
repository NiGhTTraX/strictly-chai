import { expect } from 'chai';
import overload, { Expect, Plugin } from '../src/overload';

export interface CustomType {
  customProp: boolean;
}

export interface CustomAssertion {
  customAssert: (foo: string) => string;
}

export const isCustom = (actual: any): actual is CustomType => ((actual as CustomType).customProp);
export const customExpect: Expect<CustomType, CustomAssertion> = () => ({
  customAssert: (foo: string) => foo
});

export const customPlugin: Plugin<CustomType, CustomAssertion> = {
  isType: isCustom,
  expect: customExpect
};

describe('Overload', function () {
  const overloadedExpect = overload(customPlugin);

  it('should return the original expect', function () {
    overloadedExpect({ foo: 'bar' }).to.contain({ foo: 'bar' });
  });

  it('should return the overloaded expect', function () {
    expect(overloadedExpect({ customProp: true }).customAssert('foobar')).to.equal('foobar');
  });
});
