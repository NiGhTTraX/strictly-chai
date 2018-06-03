import { expect } from 'chai';

expect(null).to.equal(2);
expect(undefined).to.equal(2);
expect(2).to.equal('2');
expect('foo').to.equal(2);
expect(true).to.equal(2);
expect(() => 23).to.equal(() => 'foo');
expect([1]).to.equal(2);
expect(new Set([1])).to.equal(new Set([false]));
expect(new Set([1])).to.equal(1);
expect(new Set([1])).to.equal([1]);
expect(new Map([[1, 2]])).to.equal(2);
expect(new Map([[1, 2]])).to.equal([[1, 2]]);
expect(new Map([[1, 2]])).to.equal([1, 2]);
expect(new Map([[1, 2]])).to.equal(new Map([[1, false]]));
expect({ foo: 2 }).to.equal(2);
