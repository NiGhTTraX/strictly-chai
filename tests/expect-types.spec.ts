import * as ts from 'typescript';
import { expect } from 'chai';
import * as fs from 'fs';

const tsConfig = require('../tsconfig.json');

const compilerOptions = ts.convertCompilerOptionsFromJson(tsConfig.compilerOptions, '.').options;

interface CompilationError {
  line: number;
  column: number;
  message: string;
}

function compile(fileName: string, options: ts.CompilerOptions): CompilationError[] {
  const program = ts.createProgram([fileName], options);

  const emitResult = program.emit();
  const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  return allDiagnostics.map(diagnostic => {
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);

      return {
        line: line + 1,
        column: character + 1,
        message
      };
    }

    throw new Error(message);
  });
}

describe('Types', function () {
  this.timeout(5 * 1000);

  it('should not allow to compare different types', function () {
    expectErrors('tests/types/equal.ts');
  });

  it('should not allow to check for members of different types', function () {
    expectErrors('tests/types/contain.ts');
  });

  /**
   * Expect that every line in the given file that has an expect call will
   * result in a type incompatibility compiler error. It also expects that no
   * other type of errors will be thrown.
   */
  function expectErrors(fileName: string) {
    const errors = compile(fileName, compilerOptions);
    const numberOfCalls = fs.readFileSync(fileName, { encoding: 'utf-8' })
      .split('\n')
      // Get the lines that have a method call followed by a property access.
      .filter(line => line.indexOf(').') !== -1)
      .length;

    errors.forEach(({ line, column, message }) => {
      expect(message).to.match(
        /not assignable/,
        `Error in ${fileName}:${line},${column} is not a type error`
      );
    });

    expect(errors).to.have.length(
      numberOfCalls,
      errors.map(error => error.message).join('\n')
    );
  }
});
