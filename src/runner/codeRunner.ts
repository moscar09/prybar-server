import shell, { ShellString } from "shelljs";
import { SuccessResponse, ErrorResponse } from "./types";

const RUNTIMES: { [lang: string]: string } = {
  js: process.env.PRYBAR_NODEJS || `./prybar-nodejs`
};

const formatSuccessMessage = (output: string): SuccessResponse => {
  const rows: string[] = output.split("\n");

  return { output: rows.slice(0, rows.length - 2), error: false };
};

const formatErrorMessage = (output: string): ErrorResponse => {
  const rows: string[] = output.split("\n");

  return { output: output, error: true };
};

export const codeRunner = (code: string, lang: string) => {
  if (RUNTIMES[lang] === undefined) {
    throw new Error("This language is not supported");
  }

  const binary = RUNTIMES[lang];

  code = Buffer.from(code).toString("base64");

  let commandOutput: ShellString = shell.exec(
    `echo '${code}' | base64 --decode | xargs -0 ${binary} -q -e`
  );

  if (commandOutput.code !== 0) {
    return formatErrorMessage(commandOutput.stderr);
  } else {
    return formatSuccessMessage(commandOutput.stdout);
  }
};

export default codeRunner;
