import { expect } from 'chai';

expect(23).to.be.greaterThan(20).and.to.be.lessThan(30);
expect(23).to.be.within(20, 30).and.to.be.approximately(20, 5);
