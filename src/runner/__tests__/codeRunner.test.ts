import { codeRunner } from "../codeRunner";
import { SuccessResponse, ErrorResponse, ErrorTypes } from "../types";
const LANG = "js";
describe("The JS code runner happy path", () => {
  it("correctly renders a single line", () => {
    const code = `console.log("Hello World!")`;

    const result: SuccessResponse = codeRunner(code, LANG) as SuccessResponse;
    expect(result.error).toBeFalsy();
    expect(result.output).toMatchObject(["Hello World!"]);
  });

  it("correctly renders multiple lines", () => {
    const code = `console.log("Hello World!"); console.log("Line 2")`;

    const result: SuccessResponse = codeRunner(code, LANG) as SuccessResponse;
    expect(result.error).toBeFalsy();
    expect(result.output).toMatchObject(["Hello World!", "Line 2"]);
  });

  it("correctly renders a for loop", () => {
    const code = `for (let i = 0; i < 5; i++) { console.log(i)}`;

    const result: SuccessResponse = codeRunner(code, LANG) as SuccessResponse;
    expect(result.error).toBeFalsy();
    expect(result.output).toMatchObject(["0", "1", "2", "3", "4"]);
  });
});

describe("The JS code runner with syntax error", () => {
  it("throws a correctly formatted error with no col number", () => {
    const code = `console.log(`;
    const result: ErrorResponse = codeRunner(code, LANG) as ErrorResponse;

    expect(result.error).toBeTruthy();
    expect(result.rowNumber).toBe(1);
    expect(result.colNumber).toBeUndefined();
    expect(result.errorType).toBe(ErrorTypes.SYNTAX_ERROR);
    expect(result.errorMessage).toBe("Unexpected end of input");
  });

  it("throws a correctly formatted error with no col number on second line ", () => {
    const code = `let a = 2;\nconsole.log(`;
    const result: ErrorResponse = codeRunner(code, LANG) as ErrorResponse;

    expect(result.error).toBeTruthy();
    expect(result.rowNumber).toBe(2);
    expect(result.colNumber).toBeUndefined();
    expect(result.errorType).toBe(ErrorTypes.SYNTAX_ERROR);
    expect(result.errorMessage).toBe("Unexpected end of input");
  });

  it("throws a correctly formatted error with a col number", () => {
    const code = `console.log(|)`;
    const result: ErrorResponse = codeRunner(code, LANG) as ErrorResponse;

    expect(result.error).toBeTruthy();
    expect(result.rowNumber).toBe(1);
    expect(result.colNumber).toBe(13);
    expect(result.errorType).toBe(ErrorTypes.SYNTAX_ERROR);
    expect(result.errorMessage).toBe("Unexpected token |");
  });
});
