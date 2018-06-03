import { expect } from 'chai';

expect([1]).to.contain('1');
expect(['1']).to.contain(1);
expect([true]).to.contain(1);
expect([{ foo: 1 }]).to.contain(1);
expect([{ foo: 1 }]).to.contain('foo');
expect([{ foo: 1 }]).to.contain({ foo: '1' });

expect(new Set([1])).to.contain('1');
expect(new Set(['1'])).to.contain(1);
expect(new Set([true])).to.contain(1);
expect(new Set([{ foo: 1 }])).to.contain(1);

expect(new Map([['key', 1]])).to.contain('1');
expect(new Map([['key', '1']])).to.contain(1);
expect(new Map([['key', true]])).to.contain(1);
expect(new Map([['key', { foo: 1 }]])).to.contain(1);
