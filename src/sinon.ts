/* eslint-disable no-unused-expressions */
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import {
  PluginInterface,
  typeOfOriginalSubject,
  typeOfOriginalAssertion,
  typeOfExpect
} from './enhance';

chai.use(sinonChai);
const { expect } = chai;

export interface Spy {
  called: boolean;
}

export interface SinonExpect {
  called: () => void;
}

const sinonPlugin: PluginInterface<Spy, SinonExpect> = (typedExpect: typeOfExpect) => {
  function sinonExpect(actual: Spy): SinonExpect;
  function sinonExpect(actual: typeOfOriginalSubject): typeOfOriginalAssertion;

  function sinonExpect(actual: any): any {
    const assertion = typedExpect(actual);

    return Object.assign(assertion, {
      called: () => {
        expect(actual).to.have.been.called;
      }
    });
  }

  return sinonExpect;
};

export default sinonPlugin;
