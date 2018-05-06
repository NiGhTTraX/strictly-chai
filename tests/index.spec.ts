import typedExpect from 'src/index';
import { expect } from 'chai';

describe('TypedExpect', function () {
  describe('equal', function() {
    it('numbers', function () {
      typedExpect(3).to.equal(3);
      expect(() => typedExpect(3).to.equal(4)).to.throw();
    });

    it('strings', function () {
      typedExpect('foo').to.equal('foo');
      expect(() => typedExpect('foo').to.equal('bar')).to.throw();
    });

    it('booleans', function () {
      typedExpect(true).to.equal(true);
      expect(() => typedExpect(true).to.equal(false)).to.throw();
    });

    it('arrays', function () {
      typedExpect([1, 2, 3]).to.equal([1, 2, 3]);
      expect(() => typedExpect([1, 2]).to.equal([2, 3])).to.throw();
    });

    it('objects', function () {
      typedExpect({ foo: { bar: 3 } }).to.equal({ foo: { bar: 3 } });
      expect(() => typedExpect({ foo: 1 }).to.equal({ foo: 2 })).to.throw();
    });

    it('sets', function () {
      typedExpect(new Set([1, 2])).to.equal(new Set([1, 2]));
    });
  });

  describe('contains', function() {
    it('arrays', function () {
      typedExpect([1, 2, 3]).to.contain(1);
      expect(() => typedExpect([1, 2]).to.contain(3)).to.throw();
    });

    it('strings', function () {
      typedExpect('foobar').to.contain('foo');
      expect(() => typedExpect('foobar').to.contain('xxx')).to.throw();
    });

    it('objects', function () {
      typedExpect({ foo: 1, bar: 2 }).to.contain({ foo: 1 });
      typedExpect({ foo: { bar: 2 } }).to.contain({ foo: { bar: 2 } });
      expect(() => typedExpect({ foo: 1, bar: 2 }).to.contain({ foo: 2 })).to.throw();
    });

    it('sets', function () {
      typedExpect(new Set([1, 2])).to.contain(2);
      expect(() => typedExpect(new Set([1, 2])).to.contain(3)).to.throw();
    });

    it('maps', function () {
      // TODO: should the assertion check keys, values, or entries?
      typedExpect(new Map([[1, 'a'], [2, 'b']])).to.contain('b');
    });
  });
});
