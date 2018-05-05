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
      expect(() => typedExpect({ foo: 1, bar: 2 }).to.contain({ foo: 2 })).to.throw();
    });
  });
});
