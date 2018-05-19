import expectTypeErrors from './expect-type-errors';

describe('Sinon Types', function () {
  this.timeout(5 * 1000);

  it('should be assignable to typedExpect', function () {
    expectTypeErrors('tests/types/sinon.ts');
  });
});
