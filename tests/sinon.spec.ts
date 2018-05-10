import enhance from 'src/enhance';
import sinonPlugin from 'src/sinon';
import { spy } from 'sinon';
import { expect } from 'chai';
import contractTests from './expect-contract';

describe('Sinon plugin', function () {
  const sinonExpect = enhance(sinonPlugin);

  contractTests(sinonExpect);

  it('called', function () {
    const appleSpie = spy();
    sinonExpect(appleSpie).to.not.have.been.called();
    expect(() => sinonExpect(appleSpie).to.have.been.called()).to.throw();
    appleSpie();
    sinonExpect(appleSpie).to.have.been.called();
    expect(() => sinonExpect(appleSpie).to.not.have.been.called()).to.throw();
  });
});
