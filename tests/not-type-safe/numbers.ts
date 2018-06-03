import { expect } from 'chai';

expect(23).to.be.greaterThan('20');
expect(23).to.be.approximately('20', 3);
expect(23).to.be.approximately(20, '3');
expect(23).to.be.within('20', 30);
expect(23).to.be.within(20, '30');
expect(23).to.be.greaterThan(20).and.to.equal('foo');
