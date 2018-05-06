import { contains, equal } from 'src/assertions';
import { expect } from 'chai';

describe('Assertions', function() {
  describe('equal', function() {
    it('primitives', function() {
      equal(1)(1);
      equal('a')('a');
      equal(true)(true);
      expect(() => equal(1)(2)).to.throw();
      expect(() => equal('a')('b')).to.throw();
      expect(() => equal(true)(false)).to.throw();
    });

    it('objects', function() {
      equal({ foo: 1 })({ foo: 1 });
      equal({ foo: { bar: 1 } })({ foo: { bar: 1 } });
      expect(() => equal({ foo: 1 })({ foo: 2 })).to.throw();
      expect(() => equal({ foo: { bar: 1 } })({ foo: { bar: 2 } })).to.throw();
    });

    it('arrays', function() {
      equal([1, 2, 3])([1, 2, 3]);
      equal([1, 2, [3, 4]])([1, 2, [3, 4]]);
      expect(() => equal([1, 2, 3])([1, 2, 4])).to.throw();
      expect(() => equal([1, 2, [3, 4]])([1, 2, [3, 5]])).to.throw();
    });

    it('sets', function() {
      equal(new Set([1, 2, 3]))(new Set([1, 2, 3]));
      expect(() => equal(new Set([1, 2]))(new Set([2, 3]))).to.throw();
    });

    it('maps', function () {
      equal(new Map([[1, 2]]))(new Map([[1, 2]]));
      expect(() => equal(new Map([[1, 2]]))(new Map([[1, 3]]))).to.throw();
    });
  });

  describe('contains', function () {
    it('strings', function () {
      contains('foobar')('foo');
      expect(() => contains('foobar')('xxx')).to.throw();
    });

    it('arrays', function () {
      contains([1, 2, 3])(2);
      expect(() => contains([1, 2, 3])(4)).to.throw();
    });

    it('sets', function () {
      contains(new Set([1, 2, 3]))(2);
      expect(() => contains(new Set([1, 2, 3]))(4)).to.throw();
    });

    it('maps', function () {
      // TODO: assert on keys, values, or entries?
      contains(new Map([[1, 2]]))(2);
      expect(() => contains(new Map([[1, 2]]))(1)).to.throw();
    });

    it('objects', function () {
      contains({ foo: 1, bar: 2 })({ bar: 2 });
      contains({ foo: { bar: 2 } })({ foo: { bar: 2 } });
      expect(() => contains({ foo: 1, bar: 2 })({ bar: 3 })).to.throw();
      expect(() => contains({ foo: { bar: 2 } })({ foo: { bar: 3 } })).to.throw();
      // TODO: the assertion is partial only on the first level
      expect(() => contains({ foo: { bar: 2, baz: 3 } })({ foo: { bar: 2 } })).to.throw();
    });
  });
});
