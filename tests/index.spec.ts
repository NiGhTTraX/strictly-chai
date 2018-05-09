import typedExpect from 'src/index';
import contractTests from './expect-contract';

describe('TypedExpect', function () {
  contractTests(typedExpect);
});
