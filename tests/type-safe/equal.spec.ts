import { expect } from 'chai';

expect(null).to.equal(null);
expect(undefined).to.equal(undefined);

expect(3).to.equal(3);
expect(3).to.not.equal(4);

expect('foo').to.equal('foo');
expect('foo').to.not.equal('bar');

expect(true).to.equal(true);
expect(true).to.not.equal(false);

const foo = () => {};
expect(foo).to.equal(foo);
expect(foo).to.not.equal(() => {});

expect([1, 2, 3]).to.deep.equal([1, 2, 3]);
expect([1, 2, 3]).to.not.deep.equal([4, 5, 6]);

expect({ foo: { bar: 3 } }).to.deep.equal({ foo: { bar: 3 } });
expect({ foo: { bar: 3 } }).to.not.deep.equal({ foo: { bar: 4 } });

expect(new Set([1, 2])).to.deep.equal(new Set([1, 2]));
expect(new Set([1, 2])).to.not.deep.equal(new Set([3, 4]));

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
expect(x).to.not.deep.equal(z);
