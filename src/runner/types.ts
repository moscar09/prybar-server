export enum ErrorTypes {
  /* The AggregateError object represents an error when several errors need to be wrapped in a single error.
   * !! Experimental !!
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError
   */
  AGGREGATE_ERROR = "AggregateError",

  /* The EvalError object indicates an error regarding the global eval() function.
   * This exception is not thrown by JavaScript anymore, however the EvalError object remains for compatibility.
   */
  EVAL_ERROR = "EvalError",

  /* This feature is non-standard and is not on a standards track
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/InternalError
   */
  INTERNAL_ERROR = "InternalError",

  /* The RangeError object indicates an error when a value is not in the set or range of allowed values. */
  RANGE_ERROR = "RangeError",

  /* The ReferenceError object represents an error when a non-existent variable is referenced. */
  REFERENCE_ERROR = "ReferenceError",

  /* The SyntaxError object represents an error when trying to interpret syntactically invalid code.
   * It is thrown when the JavaScript engine encounters tokens or token order that does not conform
   * to the syntax of the language when parsing code. */
  SYNTAX_ERROR = "SyntaxError",

  /* The TypeError object represents an error when an operation could not be performed, typically
   * (but not exclusively) when a value is not of the expected type. */
  TYPE_ERROR = "TypeError",

  /* The URIError object represents an error when a global URI handling function was used in a wrong way. */
  URI_ERROR = "URIError",

  /* Error objects are thrown when runtime errors occur. The Error object can also be used as a base
   * object for user-defined exceptions */
  ERROR = "Error"
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
