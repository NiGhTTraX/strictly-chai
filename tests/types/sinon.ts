import sinonExpect from '../../src/sinon';

sinonExpect(null).to.equal(2);
sinonExpect(undefined).to.equal(2);
sinonExpect(2).to.equal('2');
sinonExpect('foo').to.equal(2);
sinonExpect(true).to.equal(2);
sinonExpect([1]).to.equal(2);
sinonExpect(new Set([1])).to.equal(2);
sinonExpect(new Map([[1, 2]])).to.equal(2);
sinonExpect({ foo: 2 }).to.equal(2);
