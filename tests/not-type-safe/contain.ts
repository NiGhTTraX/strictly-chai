import { expect } from 'chai';

expect([1]).to.include('1');
expect(['1']).to.include(1);
expect([true]).to.include(1);
expect([{ foo: 1 }]).to.include(1);
expect([{ foo: 1 }]).to.include('foo');
expect([{ foo: 1 }]).to.include({ foo: '1' });

expect(new Set([1])).to.include('1');
expect(new Set(['1'])).to.include(1);
expect(new Set([true])).to.include(1);
expect(new Set([{ foo: 1 }])).to.include(1);

expect(new Map([['key', 1]])).to.include('1');
expect(new Map([['key', '1']])).to.include(1);
expect(new Map([['key', true]])).to.include(1);
expect(new Map([['key', { foo: 1 }]])).to.include(1);
