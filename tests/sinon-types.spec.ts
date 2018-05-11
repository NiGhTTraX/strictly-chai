import expectTypeErrors from './expect-type-errors';

describe('Sinon Types', function () {
  it('should be assignable to typedExpect', function () {
    expectTypeErrors('tests/types/sinon.ts');
  });
});
