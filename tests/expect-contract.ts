import { expect } from 'chai';
import { BaseExpectType } from '../src';

export default function contractTests(implementation: BaseExpectType) {
  describe('equal', function () {
    it('numbers', function () {
      implementation(3).to.equal(3);
      implementation(3).to.not.equal(4);
      expect(() => implementation(3).to.equal(4)).to.throw();
      expect(() => implementation(3).to.not.equal(3)).to.throw();
    });

    it('strings', function () {
      implementation('foo').to.equal('foo');
      implementation('foo').to.not.equal('bar');
      expect(() => implementation('foo').to.equal('bar')).to.throw();
      expect(() => implementation('foo').to.not.equal('foo')).to.throw();
    });

    it('booleans', function () {
      implementation(true).to.equal(true);
      implementation(true).to.not.equal(false);
      expect(() => implementation(true).to.equal(false)).to.throw();
      expect(() => implementation(true).to.not.equal(true)).to.throw();
    });

    it('arrays', function () {
      implementation([1, 2, 3]).to.equal([1, 2, 3]);
      implementation([1, 2, 3]).to.not.equal([4, 5, 6]);
      expect(() => implementation([1, 2]).to.equal([2, 3])).to.throw();
      expect(() => implementation([1, 2]).to.not.equal([1, 2])).to.throw();
    });

    it('objects', function () {
      implementation({ foo: { bar: 3 } }).to.equal({ foo: { bar: 3 } });
      implementation({ foo: { bar: 3 } }).to.not.equal({ foo: { bar: 4 } });
      expect(() => implementation({ foo: 1 }).to.equal({ foo: 2 })).to.throw();
      expect(() => implementation({ foo: 1 }).to.not.equal({ foo: 1 })).to.throw();
    });

    it('sets', function () {
      implementation(new Set([1, 2])).to.equal(new Set([1, 2]));
      implementation(new Set([1, 2])).to.not.equal(new Set([3, 4]));
      expect(() => implementation(new Set([1, 2])).to.equal(new Set([3, 4]))).to.throw();
      expect(() => implementation(new Set([1, 2])).to.not.equal(new Set([1, 2]))).to.throw();
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

      implementation(x).to.equal(y);
      implementation(x).to.not.equal(z);
      expect(() => implementation(x).to.equal(z)).to.throw();
      expect(() => implementation(x).to.not.equal(x)).to.throw();
    });
  });

  describe('contains', function () {
    it('arrays', function () {
      implementation([1, 2, 3]).to.contain(1);
      implementation([1, 2, 3]).to.not.contain(4);
      expect(() => implementation([1, 2]).to.contain(3)).to.throw();
      expect(() => implementation([1, 2]).to.not.contain(2)).to.throw();
    });

    it('strings', function () {
      implementation('foobar').to.contain('foo');
      implementation('foobar').to.not.contain('xxx');
      expect(() => implementation('foobar').to.contain('xxx')).to.throw();
      expect(() => implementation('foobar').to.not.contain('foo')).to.throw();
    });

    it('objects', function () {
      implementation({ foo: 1, bar: 2 }).to.contain({ foo: 1 });
      implementation({ foo: { bar: 2 } }).to.contain({ foo: { bar: 2 } });
      implementation({ foo: 1 }).to.not.contain({ foo: 2 });
      expect(() => implementation({ foo: 1, bar: 2 }).to.contain({ foo: 2 })).to.throw();
      expect(() => implementation({ foo: 1 }).to.not.contain({ foo: 1 })).to.throw();
    });

    it('sets', function () {
      implementation(new Set([1, 2])).to.contain(2);
      implementation(new Set([1, 2])).to.not.contain(3);
      expect(() => implementation(new Set([1, 2])).to.contain(3)).to.throw();
      expect(() => implementation(new Set([1, 2])).to.not.contain(2)).to.throw();
    });

    it('maps', function () {
      // TODO: should the assertion check keys, values, or entries?
      implementation(new Map([[1, 'a'], [2, 'b']])).to.contain('b');
      expect(() => implementation(new Map([[1, 'a'], [2, 'b']])).to.contain('c')).to.throw();
      expect(() => implementation(new Map([[1, 'a']])).to.not.contain('a')).to.throw();
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

      implementation(x).to.contain(y);
      implementation(x).to.not.contain(z);
      expect(() => implementation(x).to.contain(z)).to.throw();
      expect(() => implementation(x).to.not.contain(x)).to.throw();
    });
  });
}
