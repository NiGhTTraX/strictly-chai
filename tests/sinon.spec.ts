import enhance from 'src/enhance';
import sinonPlugin from 'src/sinon';
import { spy } from 'sinon';

describe('Sinon plugin', function () {
  const sinonExpect = enhance(sinonPlugin);

  it('called', function () {
    const appleSpie = spy();
    appleSpie();
    sinonExpect(appleSpie).called();
  });
});
