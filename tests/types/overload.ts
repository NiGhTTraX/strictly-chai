import { overload } from 'src/overload';
import { customPlugin, customPlugin2 } from 'tests/overload.spec';

const overloadedExpect = overload(customPlugin);
const overloadedExpect2 = overload(customPlugin, customPlugin2);

overloadedExpect(null).to.equal(false);
overloadedExpect(2).to.equal('2');
overloadedExpect({ customProp: true }).customAssert(2);

overloadedExpect2(null).to.equal(false);
overloadedExpect2(2).to.equal('2');
overloadedExpect2({ customProp2: true }).customAssert('2');
