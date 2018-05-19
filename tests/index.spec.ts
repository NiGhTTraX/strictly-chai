import { expect } from 'chai';
import typedExpect from 'src/index';

describe('TypedExpect', function () {
  describe('equal', function () {
    it('null', function () {
      typedExpect(null).to.equal(null);
      typedExpect(undefined).to.equal(undefined);
    });

    it('numbers', function () {
      typedExpect(3).to.equal(3);
      typedExpect(3).to.not.equal(4);
      expect(() => typedExpect(3).to.equal(4)).to.throw();
      expect(() => typedExpect(3).to.not.equal(3)).to.throw();
    });

    it('strings', function () {
      typedExpect('foo').to.equal('foo');
      typedExpect('foo').to.not.equal('bar');
      expect(() => typedExpect('foo').to.equal('bar')).to.throw();
      expect(() => typedExpect('foo').to.not.equal('foo')).to.throw();
    });

    it('booleans', function () {
      typedExpect(true).to.equal(true);
      typedExpect(true).to.not.equal(false);
      expect(() => typedExpect(true).to.equal(false)).to.throw();
      expect(() => typedExpect(true).to.not.equal(true)).to.throw();
    });

    it('arrays', function () {
      typedExpect([1, 2, 3]).to.equal([1, 2, 3]);
      typedExpect([1, 2, 3]).to.not.equal([4, 5, 6]);
      expect(() => typedExpect([1, 2]).to.equal([2, 3])).to.throw();
      expect(() => typedExpect([1, 2]).to.not.equal([1, 2])).to.throw();
    });

    it('objects', function () {
      typedExpect({ foo: { bar: 3 } }).to.equal({ foo: { bar: 3 } });
      typedExpect({ foo: { bar: 3 } }).to.not.equal({ foo: { bar: 4 } });
      expect(() => typedExpect({ foo: 1 }).to.equal({ foo: 2 })).to.throw();
      expect(() => typedExpect({ foo: 1 }).to.not.equal({ foo: 1 })).to.throw();
    });

    it('sets', function () {
      typedExpect(new Set([1, 2])).to.equal(new Set([1, 2]));
      typedExpect(new Set([1, 2])).to.not.equal(new Set([3, 4]));
      expect(() => typedExpect(new Set([1, 2])).to.equal(new Set([3, 4]))).to.throw();
      expect(() => typedExpect(new Set([1, 2])).to.not.equal(new Set([1, 2]))).to.throw();
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

      typedExpect(x).to.equal(y);
      typedExpect(x).to.not.equal(z);
      expect(() => typedExpect(x).to.equal(z)).to.throw();
      expect(() => typedExpect(x).to.not.equal(x)).to.throw();
    });
  });

  describe('contains', function () {
    it('arrays', function () {
      typedExpect([1, 2, 3]).to.contain(1);
      typedExpect([1, 2, 3]).to.not.contain(4);
      expect(() => typedExpect([1, 2]).to.contain(3)).to.throw();
      expect(() => typedExpect([1, 2]).to.not.contain(2)).to.throw();
    });

    it('strings', function () {
      typedExpect('foobar').to.contain('foo');
      typedExpect('foobar').to.not.contain('xxx');
      expect(() => typedExpect('foobar').to.contain('xxx')).to.throw();
      expect(() => typedExpect('foobar').to.not.contain('foo')).to.throw();
    });

    it('objects', function () {
      typedExpect({ foo: 1, bar: 2 }).to.contain({ foo: 1 });
      typedExpect({ foo: { bar: 2 } }).to.contain({ foo: { bar: 2 } });
      typedExpect({ foo: 1 }).to.not.contain({ foo: 2 });
      expect(() => typedExpect({ foo: 1, bar: 2 }).to.contain({ foo: 2 })).to.throw();
      expect(() => typedExpect({ foo: 1 }).to.not.contain({ foo: 1 })).to.throw();
    });

    it('sets', function () {
      typedExpect(new Set([1, 2])).to.contain(2);
      typedExpect(new Set([1, 2])).to.not.contain(3);
      expect(() => typedExpect(new Set([1, 2])).to.contain(3)).to.throw();
      expect(() => typedExpect(new Set([1, 2])).to.not.contain(2)).to.throw();
    });

    it('maps', function () {
      // TODO: should the assertion check keys, values, or entries?
      typedExpect(new Map([[1, 'a'], [2, 'b']])).to.contain('b');
      expect(() => typedExpect(new Map([[1, 'a'], [2, 'b']])).to.contain('c')).to.throw();
      expect(() => typedExpect(new Map([[1, 'a']])).to.not.contain('a')).to.throw();
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

      typedExpect(x).to.contain(y);
      typedExpect(x).to.not.contain(z);
      expect(() => typedExpect(x).to.contain(z)).to.throw();
      expect(() => typedExpect(x).to.not.contain(x)).to.throw();
    });
  });
});
