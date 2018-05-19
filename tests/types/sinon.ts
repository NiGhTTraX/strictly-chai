import { spy } from 'sinon';
import sinonExpect from '../../src/sinon';

const appleSpie = spy();
sinonExpect(appleSpie).to.have.been.called(true);
sinonExpect(appleSpie).to.have.been.calledWith();
