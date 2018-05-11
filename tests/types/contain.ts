import typedExpect from '../../src';

typedExpect([1]).to.contain('1');
typedExpect(['1']).to.contain(1);
typedExpect([true]).to.contain(1);
typedExpect([{ foo: 1 }]).to.contain(1);
typedExpect([{ foo: 1 }]).to.contain({ foo: '1' });

typedExpect(new Set([1])).to.contain('1');
typedExpect(new Set(['1'])).to.contain(1);
typedExpect(new Set([true])).to.contain(1);
typedExpect(new Set([{ foo: 1 }])).to.contain(1);

typedExpect(new Map([['key', 1]])).to.contain('1');
typedExpect(new Map([['key', '1']])).to.contain(1);
typedExpect(new Map([['key', true]])).to.contain(1);
typedExpect(new Map([['key', { foo: 1 }]])).to.contain(1);
