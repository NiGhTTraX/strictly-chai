import expectTypeErrors from './type-safety';

describe('expect', function () {
  this.timeout(5 * 1000);

  describe('equal', function () {
    it('should be type safe', function () {
      expectTypeErrors('tests/not-type-safe/equal.ts');
    });
  });

  describe('contain', function () {
    it('should be type safe', function () {
      expectTypeErrors('tests/not-type-safe/contain.ts');
    });
  });

  describe('numbers', function () {
    it('should be type safe', function () {
      expectTypeErrors('tests/not-type-safe/numbers.ts');
    });
  });
});
