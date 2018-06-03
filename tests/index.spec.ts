import expectTypeErrors from './type-safety';

describe('TypedExpect', function () {
  describe('equal', function () {
    it('should be type safe', function () {
      this.timeout(5 * 1000);

      expectTypeErrors('tests/not-type-safe/equal.ts');
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
