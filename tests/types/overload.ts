import overload from 'src/overload';
import { customExpect, isCustom } from 'tests/overload.spec';

const overloadedExpect = overload(isCustom, customExpect);

overloadedExpect(null).to.equal(false);
overloadedExpect(2).to.equal('2');
overloadedExpect({ customProp: true }).customAssert(2);
