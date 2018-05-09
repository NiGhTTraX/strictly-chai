import enhance from 'src/enhance';
import sinonPlugin from 'src/sinon';
import { spy } from 'sinon';
import contractTests from './expect-contract';

describe('Sinon plugin', function () {
  const sinonExpect = enhance(sinonPlugin);

  contractTests(sinonExpect);

  it('called', function () {
    const appleSpie = spy();
    appleSpie();
    sinonExpect(appleSpie).called();
  });
});
