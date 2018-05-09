import { contains, equals } from 'src/assertions';
import { expect } from 'chai';

describe('Assertions', function() {
  describe('equal', function() {
    it('primitives', function() {
      equals(1)(1);
      equals('a')('a');
      equals(true)(true);
      expect(() => equals(1)(2)).to.throw();
      expect(() => equals('a')('b')).to.throw();
      expect(() => equals(true)(false)).to.throw();
    });

    it('objects', function() {
      equals({ foo: 1 })({ foo: 1 });
      equals({ foo: { bar: 1 } })({ foo: { bar: 1 } });
      expect(() => equals({ foo: 1 })({ foo: 2 })).to.throw();
      expect(() => equals({ foo: { bar: 1 } })({ foo: { bar: 2 } })).to.throw();
    });

    it('arrays', function() {
      equals([1, 2, 3])([1, 2, 3]);
      equals([1, 2, [3, 4]])([1, 2, [3, 4]]);
      expect(() => equals([1, 2, 3])([1, 2, 4])).to.throw();
      expect(() => equals([1, 2, [3, 4]])([1, 2, [3, 5]])).to.throw();
    });

    it('sets', function() {
      equals(new Set([1, 2, 3]))(new Set([1, 2, 3]));
      expect(() => equals(new Set([1, 2]))(new Set([2, 3]))).to.throw();
    });

    it('maps', function () {
      equals(new Map([[1, 2]]))(new Map([[1, 2]]));
      expect(() => equals(new Map([[1, 2]]))(new Map([[1, 3]]))).to.throw();
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
