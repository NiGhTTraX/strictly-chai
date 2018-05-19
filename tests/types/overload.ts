import overload from 'src/overload';
import { customPlugin } from 'tests/overload.spec';

const overloadedExpect = overload(customPlugin);

overloadedExpect(null).to.equal(false);
overloadedExpect(2).to.equal('2');
overloadedExpect({ customProp: true }).customAssert(2);
