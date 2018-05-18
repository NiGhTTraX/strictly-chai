import sinonExpect, { SinonAssertionType } from 'src/sinon';
import { spy } from 'sinon';
import { expect } from 'chai';

describe('Sinon plugin', function () {
  describe('should be assignable to typedExpect', function () {
    describe('equal', function () {
      it('null', function () {
        sinonExpect(null).to.equal(null);
        sinonExpect(undefined).to.equal(undefined);
      });

      it('numbers', function () {
        sinonExpect(3).to.equal(3);
        sinonExpect(3).to.not.equal(4);
        expect(() => sinonExpect(3).to.equal(4)).to.throw();
        expect(() => sinonExpect(3).to.not.equal(3)).to.throw();
      });

      it('strings', function () {
        sinonExpect('foo').to.equal('foo');
        sinonExpect('foo').to.not.equal('bar');
        expect(() => sinonExpect('foo').to.equal('bar')).to.throw();
        expect(() => sinonExpect('foo').to.not.equal('foo')).to.throw();
      });

      it('booleans', function () {
        sinonExpect(true).to.equal(true);
        sinonExpect(true).to.not.equal(false);
        expect(() => sinonExpect(true).to.equal(false)).to.throw();
        expect(() => sinonExpect(true).to.not.equal(true)).to.throw();
      });

      it('arrays', function () {
        sinonExpect([1, 2, 3]).to.equal([1, 2, 3]);
        sinonExpect([1, 2, 3]).to.not.equal([4, 5, 6]);
        expect(() => sinonExpect([1, 2]).to.equal([2, 3])).to.throw();
        expect(() => sinonExpect([1, 2]).to.not.equal([1, 2])).to.throw();
      });

      it('objects', function () {
        sinonExpect({ foo: { bar: 3 } }).to.equal({ foo: { bar: 3 } });
        sinonExpect({ foo: { bar: 3 } }).to.not.equal({ foo: { bar: 4 } });
        expect(() => sinonExpect({ foo: 1 }).to.equal({ foo: 2 })).to.throw();
        expect(() => sinonExpect({ foo: 1 }).to.not.equal({ foo: 1 })).to.throw();
      });

      it('sets', function () {
        sinonExpect(new Set([1, 2])).to.equal(new Set([1, 2]));
        sinonExpect(new Set([1, 2])).to.not.equal(new Set([3, 4]));
        expect(() => sinonExpect(new Set([1, 2])).to.equal(new Set([3, 4]))).to.throw();
        expect(() => sinonExpect(new Set([1, 2])).to.not.equal(new Set([1, 2]))).to.throw();
      });

      it('custom type', function () {
        interface Foo {
          foo: string;
          bar: () => void;
        }

        const noop = () => {
        };

        const x: Foo = {
          foo: 'foo',
          bar: noop
        };

        const y: Foo = {
          foo: 'foo',
          bar: noop
        };

        const z: Foo = {
          foo: 'bar',
          bar: noop
        };

        sinonExpect(x).to.equal(y);
        sinonExpect(x).to.not.equal(z);
        expect(() => sinonExpect(x).to.equal(z)).to.throw();
        expect(() => sinonExpect(x).to.not.equal(x)).to.throw();
      });
    });
  });

  it('called', function () {
    const appleSpie = spy();

    sinonExpect(appleSpie).to.not.have.been.called();
    expect(() => sinonExpect(appleSpie).to.have.been.called()).to.throw();

    appleSpie();

    sinonExpect(appleSpie).to.have.been.called();
    expect(() => sinonExpect(appleSpie).to.not.have.been.called()).to.throw();
  });

  it('calledWith', function () {
    const appleSpie = spy();
    appleSpie(1, 2, 3);
    sinonExpect(appleSpie).to.have.been.calledWith(1, 2, 3);
    sinonExpect(appleSpie).to.not.have.been.calledWith(4);
    expect(() => sinonExpect(appleSpie).to.have.been.calledWith(4)).to.throw();
    expect(() => sinonExpect(appleSpie).to.not.have.been.calledWith(1, 2, 3)).to.throw();
  });

  it('can be extended', function() {
    interface CustomType { custom: boolean; }
    interface CustomAssertion { customAssert: (x: number) => number; }

    function customExpect(actual: CustomType): CustomAssertion;
    function customExpect<T>(actual: T): SinonAssertionType<T>;
    function customExpect<T>(actual: any): any {
      if ((actual as CustomType).custom) {
        return {
          customAssert: (x: number) => x
        };
      }
      return sinonExpect(actual);
    }

    expect(customExpect({ custom: true }).customAssert(2)).to.equal(2);
    customExpect({ notCustom: true }).to.contain({ notCustom: true });
  });
});
