import { codeRunner } from "../codeRunner";

describe("The JS code runner", () => {
  const LANG = "js";
  it("correctly renders a single line", () => {
    const code = `console.log("Hello World!")`;

    const result = codeRunner(code, LANG);
    expect(result.error).toBeFalsy();
    expect(result.output).toMatchObject(["Hello World!"]);
  });

  it("correctly renders multiple lines", () => {
    const code = `console.log("Hello World!"); console.log("Line 2")`;

    const result = codeRunner(code, LANG);
    expect(result.error).toBeFalsy();
    expect(result.output).toMatchObject(["Hello World!", "Line 2"]);
  });

  it("correctly renders a for loop", () => {
    const code = `for (let i = 0; i < 5; i++) { console.log(i)}`;

    const result = codeRunner(code, LANG);
    expect(result.error).toBeFalsy();
    expect(result.output).toMatchObject(["0", "1", "2", "3", "4"]);
  });
});
