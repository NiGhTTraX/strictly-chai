/* eslint-disable no-unused-expressions */
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import {
  PluginInterface,
  BaseAssertionType,
  BaseExpectType
} from './enhance';

chai.use(sinonChai);
const { expect } = chai;

export interface Spy {
  called: boolean;
}

export interface SinonExpect {
  called: () => void;
}

const sinonPlugin: PluginInterface<Spy, SinonExpect> = (baseExpect: BaseExpectType) => {
  function sinonExpect(actual: Spy): SinonExpect;
  function sinonExpect(actual: any): BaseAssertionType;

  function sinonExpect(actual: any): any {
    const assertion = baseExpect(actual);

    return Object.assign(assertion, {
      called: () => {
        expect(actual).to.have.been.called;
      }
    });
  }

  return sinonExpect;
};

export default sinonPlugin;
