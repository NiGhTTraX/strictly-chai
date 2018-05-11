import expectTypeErrors from './expect-type-errors';

describe('Expect Types', function () {
  this.timeout(5 * 1000);

  it('should not allow to compare different types', function () {
    expectTypeErrors('tests/types/equal.ts');
  });

  it('should not allow to check for members of different types', function () {
    expectTypeErrors('tests/types/contain.ts');
  });
});

