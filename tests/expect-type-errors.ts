import * as fs from 'fs';
import * as ts from 'typescript';
import { expect } from 'chai';

const tsConfig = require('../tsconfig.json');

const compilerOptions = ts.convertCompilerOptionsFromJson(tsConfig.compilerOptions, '.').options;

interface CompilationError {
  line: number;
  column: number;
  message: string;
}

/**
 * Expect that every line in the given file that has an expect call will
 * result in a type incompatibility compiler error. It also expects that no
 * other type of errors will be thrown.
 *
 * This assumes there won't be more than one call per line. The calls are
 * identified by searching for a method call followed immediately by a property
 * access.
 */
export default function expectTypeErrors(fileName: string) {
  const errors = compile(fileName, compilerOptions);
  const lines = fs.readFileSync(fileName, { encoding: 'utf-8' }).split('\n');

  const errorsByLine = errors.reduce((acc: Map<number, boolean>, { line, column, message }) => {
    expect(message).to.match(
      /not assignable/,
      `Non type error detected on ${fileName}:${line},${column}`
    );

    expect(acc.get(line), `More than 1 error detected on ${fileName}:${line} (${lines[line]})`)
      .to.be.undefined;

    acc.set(line, true);
    return acc;
  }, new Map());

  lines.forEach((line, i) => {
    if (line.indexOf(').') !== -1) {
      expect(errorsByLine.get(i + 1), `No error detected on ${fileName}:${i + 1} (${line})`)
        .to.not.be.undefined;
    }
  });
}

function compile(fileName: string, options: ts.CompilerOptions): CompilationError[] {
  const program = ts.createProgram([fileName], Object.assign({}, options, { noEmit: true }));

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
