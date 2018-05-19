import * as sinonChai from 'sinon-chai';
import { Plugin } from 'src/extend';

import ChaiStatic = Chai.ChaiStatic;

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
        calledWith: (firstArg: any, ...args: any[]) => void;
      }
    }
  }
}

export const isSpy = (actual: Spy | any): actual is Spy => (actual as Spy).called !== undefined;

const plugin: Plugin<Spy, SinonExpect> = (chai: ChaiStatic) => {
  chai.use(sinonChai);
  const { expect } = chai;

  function sinonExpect(actual: Spy): SinonExpect {
    return {
      to: {
        not: {
          have: {
            been: {
              called: () => {
                // eslint-disable-next-line no-unused-expressions
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
              // eslint-disable-next-line no-unused-expressions
              expect(actual).to.have.been.called;
            },
            calledWith: (...args: any[]) => {
              expect(actual).to.have.been.calledWith(...args);
            }
          }
        }
      }
    };
  }

  return { expect: sinonExpect, isType: isSpy };
};

export default plugin;
