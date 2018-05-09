import { expect } from 'chai';

export function equals(actual: any) {
  return (expected: any) => {
    expect(actual).to.deep.equal(expected);
  };
}

export function notEquals(actual: any) {
  return (expected: any) => {
    expect(actual).to.not.deep.equal(expected);
  };
}

export function contains(actual: any) {
  return (member: any) => {
    expect(actual).to.deep.include(member);
  };
}

export function notContains(actual: any) {
  return (member: any) => {
    expect(actual).to.not.deep.include(member);
  };
}
