import sinonExpect, { SinonAssertionType } from '../../src/sinon';

sinonExpect(null).to.equal(2);
sinonExpect(undefined).to.equal(2);
sinonExpect(2).to.equal('2');
sinonExpect('foo').to.equal(2);
sinonExpect(true).to.equal(2);
sinonExpect([1]).to.equal(2);
sinonExpect(new Set([1])).to.equal(2);
sinonExpect(new Map([[1, 2]])).to.equal(2);
sinonExpect({ foo: 2 }).to.equal(2);
sinonExpect({ foo: 2 }).to.contain('foo');

interface CustomType { custom: boolean; }
interface CustomAssertion { customAssert: (x: number) => number; }

function customExpect(actual: CustomType): CustomAssertion;
function customExpect<T, K, V>(actual: T): SinonAssertionType<T, K, V>;
function customExpect<T, K, V>(actual: any): any {
  if ((actual as CustomType).custom) {
    return {
      customAssert: (x: number) => x
    };
  }
  return sinonExpect(actual);
}

customExpect({ custom: true }).customAssert('2');
customExpect({ notCustom: true }).to.contain('2');
