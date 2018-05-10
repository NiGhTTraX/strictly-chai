/* eslint-disable no-unused-expressions */
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import { Expect } from './enhance';

chai.use(sinonChai);
const { expect } = chai;

export interface Spy {
  called: boolean;
}

export interface SinonExpect {
  to: {
    not: {
      have: {
        been: {
          called: () => void;
          calledWith: (...args: any[]) => void;
        }
      }
    }
    have: {
      been: {
        called: () => void;
        calledWith: (...args: any[]) => void;
      }
    }
  }
}

export const isSpy = (actual: Spy | any): actual is Spy => (actual as Spy).called !== undefined;

export const spyExpect: Expect<Spy, SinonExpect> = (actual: Spy) => ({
  to: {
    not: {
      have: {
        been: {
          called: () => {
            expect(actual).to.not.have.been.called;
          },
          calledWith: (...args: any[]) => {
            expect(actual).to.not.have.been.calledWith(...args);
          }
        }
      }
    },
    have: {
      been: {
        called: () => {
          expect(actual).to.have.been.called;
        },
        calledWith: (...args: any[]) => {
          expect(actual).to.have.been.calledWith(...args);
        }
      }
    }
  }
});
