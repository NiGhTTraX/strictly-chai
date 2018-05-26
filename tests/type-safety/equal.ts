import typedExpect from '../../src';

typedExpect(null).to.equal(2);
typedExpect(undefined).to.equal(2);
typedExpect(2).to.equal('2');
typedExpect('foo').to.equal(2);
typedExpect(true).to.equal(2);
typedExpect(() => 23).to.equal(() => 'foo');
typedExpect([1]).to.equal(2);
typedExpect(new Set([1])).to.equal(new Set([false]));
typedExpect(new Set([1])).to.equal(1);
typedExpect(new Set([1])).to.equal([1]);
typedExpect(new Map([[1, 2]])).to.equal(2);
typedExpect(new Map([[1, 2]])).to.equal([[1, 2]]);
typedExpect(new Map([[1, 2]])).to.equal([1, 2]);
typedExpect(new Map([[1, 2]])).to.equal(new Map([[1, false]]));
typedExpect({ foo: 2 }).to.equal(2);
