export enum ErrorTypes {
  AGGREGATE_ERROR = "AggregateError",
  EVAL_ERROR = "EvalError",
  INTERNAL_ERROR = "InternalError",
  RANGE_ERROR = "RangeError",
  REFERENCE_ERROR = "ReferenceError",
  SYNTAX_ERROR = "SyntaxError",
  TYPE_ERROR = "TypeError",
  URI_ERROR = "URIError"
}

export interface SuccessResponse {
  output: string[];
  error: false;
}

export interface ErrorResponse {
  error: true;
  rowNumber: number;
  colNumber?: number;
  errorMessage: string;
  errorType: ErrorTypes;
  rawErrorMessage: string[];
}
