/* eslint-disable no-unused-expressions */
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import { PluginInterface } from './enhance';
import { BaseAssertionType, BaseExpectType } from './index';

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
    if (typeof (actual as Spy).called !== 'undefined') {
      return {
        called: () => {
          expect(actual).to.have.been.called;
        }
      };
    }

    return baseExpect(actual);
  }

  return sinonExpect;
};

export default sinonPlugin;
