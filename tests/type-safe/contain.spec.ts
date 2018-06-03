import { expect } from 'chai';

expect([1, 2, 3]).to.include(1);
expect([1, 2, 3]).to.not.include(4);

expect('foobar').to.include('foo');
expect('foobar').to.not.include('xxx');

expect({ foo: 1, bar: 2 }).to.include({ foo: 1 });
expect({ foo: { bar: 2 } }).to.deep.include({ foo: { bar: 2 } });
expect({ foo: 1 }).to.not.include({ foo: 2 });

expect(new Set([1, 2])).to.include(2);
expect(new Set([1, 2])).to.not.include(3);
expect(new Set([{ foo: { bar: 2 } }])).to.deep.include({ foo: { bar: 2 } });

expect(new Map([[1, 'a'], [2, 'b']])).to.include('b');

expect([{ a: 1 }, { a: 2 }, { a: 3 }]).to.deep.include.members([{ a: 2 }]);

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

expect(x).to.include(y);
expect(x).to.not.include(z);
