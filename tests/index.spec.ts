import typedExpect from 'src/index';
import { expect } from 'chai';

describe('TypedExpect', function () {
  describe('comparing primitives', function() {
    it('numbers', function () {
      typedExpect(3).to.equal(3);
      expect(() => typedExpect(3).to.equal(4)).to.throw;
    });

    it('strings', function () {
      typedExpect('foo').to.equal('foo');
      expect(() => typedExpect('foo').to.equal('bar')).to.throw;
    });

    it('booleans', function () {
      typedExpect(true).to.equal(true);
      expect(() => typedExpect(true).to.equal(false)).to.throw;
    });
  });

  describe('arrays', function() {
    it('equals', function () {
      typedExpect([1, 2, 3]).to.equal([1, 2, 3]);
      expect(() => typedExpect([1, 2]).to.equal([2, 3])).to.throw;
    });
  });
});
