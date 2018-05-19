import sinonExpect from 'src/sinon';
import { spy } from 'sinon';
import { expect } from 'chai';

describe('Sinon expect', function () {
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
