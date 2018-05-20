import { extend } from '../../src/extend';
import { customPlugin, customPlugin2 } from '../extend.spec';

const overloadedExpect = extend(customPlugin);
const overloadedExpect2 = extend(customPlugin, customPlugin2);

overloadedExpect(null).to.equal(false);
overloadedExpect(2).to.equal('2');
overloadedExpect({ customProp: true }).customAssert(2);

overloadedExpect2(null).to.equal(false);
overloadedExpect2(2).to.equal('2');
overloadedExpect2({ customProp2: true }).customAssert2('2');
