import { expect } from 'chai';
import expectTypeErrors from './type-safety';

describe('TypedExpect', function () {
  describe('equal', function () {
    it('null', function () {
      expect(null).to.deep.equal(null);
      expect(undefined).to.deep.equal(undefined);
    });

    it('numbers', function () {
      expect(3).to.deep.equal(3);
      expect(3).to.not.equal(4);
      // expect(() => expect(3).to.deep.equal(4)).to.throw();
      // expect(() => expect(3).to.not.equal(3)).to.throw();
    });

    it('strings', function () {
      expect('foo').to.deep.equal('foo');
      expect('foo').to.not.equal('bar');
      // expect(() => expect('foo').to.deep.equal('bar')).to.throw();
      // expect(() => expect('foo').to.not.equal('foo')).to.throw();
    });

    it('booleans', function () {
      expect(true).to.deep.equal(true);
      expect(true).to.not.equal(false);
      // expect(() => expect(true).to.deep.equal(false)).to.throw();
      // expect(() => expect(true).to.not.equal(true)).to.throw();
    });

    it('functions', function() {
      const foo = () => {};
      expect(foo).to.deep.equal(foo);
      expect(foo).to.not.equal(() => {});
    });

    it('arrays', function () {
      expect([1, 2, 3]).to.deep.equal([1, 2, 3]);
      expect([1, 2, 3]).to.not.equal([4, 5, 6]);
      // expect(() => expect([1, 2]).to.deep.equal([2, 3])).to.throw();
      // expect(() => expect([1, 2]).to.not.equal([1, 2])).to.throw();
    });

    it('objects', function () {
      expect({ foo: { bar: 3 } }).to.deep.equal({ foo: { bar: 3 } });
      expect({ foo: { bar: 3 } }).to.not.equal({ foo: { bar: 4 } });
      // expect(() => expect({ foo: 1 }).to.deep.equal({ foo: 2 })).to.throw();
      // expect(() => expect({ foo: 1 }).to.not.equal({ foo: 1 })).to.throw();
    });

    it('sets', function () {
      expect(new Set([1, 2])).to.deep.equal(new Set([1, 2]));
      expect(new Set([1, 2])).to.not.equal(new Set([3, 4]));
      // expect(() => expect(new Set([1, 2])).to.deep.equal(new Set([3, 4]))).to.throw();
      // expect(() => expect(new Set([1, 2])).to.not.equal(new Set([1, 2]))).to.throw();
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

      expect(x).to.deep.equal(y);
      expect(x).to.not.equal(z);
      // expect(() => expect(x).to.deep.equal(z)).to.throw();
      // expect(() => expect(x).to.not.equal(x)).to.throw();
    });

    it('should be type safe', function () {
      this.timeout(5 * 1000);

      expectTypeErrors('tests/type-safety/equal.ts');
    });
  });

  // describe('contains', function () {
  //   it('arrays', function () {
  //     expect([1, 2, 3]).to.contain(1);
  //     expect([1, 2, 3]).to.not.contain(4);
  //     // expect(() => expect([1, 2]).to.contain(3)).to.throw();
  //     // expect(() => expect([1, 2]).to.not.contain(2)).to.throw();
  //   });
  //
  //   it('strings', function () {
  //     expect('foobar').to.contain('foo');
  //     expect('foobar').to.not.contain('xxx');
  //     // expect(() => expect('foobar').to.contain('xxx')).to.throw();
  //     // expect(() => expect('foobar').to.not.contain('foo')).to.throw();
  //   });
  //
  //   it('objects', function () {
  //     expect({ foo: 1, bar: 2 }).to.contain({ foo: 1 });
  //     expect({ foo: { bar: 2 } }).to.contain({ foo: { bar: 2 } });
  //     expect({ foo: 1 }).to.not.contain({ foo: 2 });
  //     // expect(() => expect({ foo: 1, bar: 2 }).to.contain({ foo: 2 })).to.throw();
  //     // expect(() => expect({ foo: 1 }).to.not.contain({ foo: 1 })).to.throw();
  //   });
  //
  //   it('sets', function () {
  //     expect(new Set([1, 2])).to.contain(2);
  //     expect(new Set([1, 2])).to.not.contain(3);
  //     // expect(() => expect(new Set([1, 2])).to.contain(3)).to.throw();
  //     // expect(() => expect(new Set([1, 2])).to.not.contain(2)).to.throw();
  //   });
  //
  //   it('maps', function () {
  //     // TODO: should the assertion check keys, values, or entries?
  //     expect(new Map([[1, 'a'], [2, 'b']])).to.contain('b');
  //     // expect(() => expect(new Map([[1, 'a'], [2, 'b']])).to.contain('c')).to.throw();
  //     // expect(() => expect(new Map([[1, 'a']])).to.not.contain('a')).to.throw();
  //   });
  //
  //   it('custom type', function () {
  //     interface Foo {
  //       foo: string;
  //       bar: () => void;
  //     }
  //
  //     const noop = () => {
  //     };
  //
  //     const x: Foo = {
  //       foo: 'foo',
  //       bar: noop
  //     };
  //
  //     const y: Foo = {
  //       foo: 'foo',
  //       bar: noop
  //     };
  //
  //     const z: Foo = {
  //       foo: 'bar',
  //       bar: noop
  //     };
  //
  //     expect(x).to.contain(y);
  //     expect(x).to.not.contain(z);
  //     // expect(() => expect(x).to.contain(z)).to.throw();
  //     // expect(() => expect(x).to.not.contain(x)).to.throw();
  //   });
  //
  //   it('should be type safe', function () {
  //     this.timeout(5 * 1000);
  //
  //     expectTypeErrors('tests/type-safety/contain.ts');
  //   });
  // });

  describe('throw', function () {
    it('should ', function () {
      // expect(() => { throw new Error(); }).to.throw();
      // expect(() => { }).to.not.throw();
    });
  });
});
