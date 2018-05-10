import enhance from 'src/enhance';
import { isSpy, spyExpect } from 'src/sinon';
import { spy } from 'sinon';
import { expect } from 'chai';
import contractTests from './expect-contract';
import typedExpect from '../src';

describe('Sinon plugin', function () {
  const sinonExpect = enhance(typedExpect, isSpy, spyExpect);

  contractTests(sinonExpect);

  it('called', function () {
    const appleSpie = spy();

    sinonExpect(appleSpie).to.not.have.been.called();
    expect(() => sinonExpect(appleSpie).to.have.been.called()).to.throw();

    appleSpie();

    sinonExpect(appleSpie).to.have.been.called();
    expect(() => sinonExpect(appleSpie).to.not.have.been.called()).to.throw();
  });

  it('calledWith', function () {
    const appleSpie = spy();
    appleSpie(1, 2, 3);
    sinonExpect(appleSpie).to.have.been.calledWith(1, 2, 3);
    sinonExpect(appleSpie).to.not.have.been.calledWith(4);
    expect(() => sinonExpect(appleSpie).to.have.been.calledWith(4)).to.throw();
    expect(() => sinonExpect(appleSpie).to.not.have.been.calledWith(1, 2, 3)).to.throw();
  });
});
