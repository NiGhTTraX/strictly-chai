import expectTypeErrors from './expect-type-errors';

describe('Extend Types', function () {
  this.timeout(5 * 1000);

  it('should be type safe', function () {
    expectTypeErrors('tests/types/extend.ts');
  });
});

