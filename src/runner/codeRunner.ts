import shell, { ShellString } from "shelljs";
import { SuccessResponse, ErrorResponse, ErrorTypes } from "./types";
import { parseInt } from "lodash";

const RUNTIMES: { [lang: string]: string } = {
  js: process.env.PRYBAR_NODEJS || `./prybar-nodejs`
};

const parseErrorMessage = (
  message: string
): { errorType: ErrorTypes; errorMessage: string } => {
  let [errorTypeTxt, errorMessage] = message.split(": ");

  let errorType = ErrorTypes.ERROR;
  switch (errorTypeTxt) {
    case "SyntaxError":
      errorType = ErrorTypes.SYNTAX_ERROR;
      break;
    case "ReferenceError":
      errorType = ErrorTypes.REFERENCE_ERROR;
      break;
    case "EvalError":
      errorType = ErrorTypes.EVAL_ERROR;
      break;
    case "InternalError":
      errorType = ErrorTypes.INTERNAL_ERROR;
      break;
    case "RangeError":
      errorType = ErrorTypes.RANGE_ERROR;
      break;
    case "TypeError":
      errorType = ErrorTypes.TYPE_ERROR;
      break;
    case "URIError":
      errorType = ErrorTypes.URI_ERROR;
      break;
  }

  return { errorType: errorType, errorMessage };
};

const formatSuccessMessage = (output: string): SuccessResponse => {
  const rows: string[] = output.split("\n");

  return { output: rows.slice(0, rows.length - 2), error: false };
};

const formatErrorMessage = (output: string): ErrorResponse => {
  const rows: string[] = output.split("\n");
  const rowNumber = parseInt(rows[0].split(":")[1]);
  const colNumber = rows[2].indexOf("^");
  const message = rows[4];
  const rawErrorMessage = rows.slice(1, 5);

  let { errorType, errorMessage } = parseErrorMessage(message);

  return {
    error: true,
    rowNumber: rowNumber,
    colNumber: colNumber === -1 ? undefined : colNumber + 1,
    errorMessage: errorMessage,
    errorType: errorType,
    rawErrorMessage: rawErrorMessage
  };
};

export const codeRunner = (
  code: string,
  lang: string
): SuccessResponse | ErrorResponse => {
  if (RUNTIMES[lang] === undefined) {
    throw new Error("This language is not supported");
  }

  const binary = RUNTIMES[lang];

  code = Buffer.from(code).toString("base64");

  let commandOutput: ShellString = shell.exec(
    `echo '${code}' | base64 --decode | xargs -0 ${binary} -q -e`,
    { silent: true }
  );

  if (commandOutput.code !== 0) {
    return formatErrorMessage(commandOutput.stderr);
  } else {
    return formatSuccessMessage(commandOutput.stdout);
  }
};

export default codeRunner;
