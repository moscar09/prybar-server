export interface SuccessResponse {
  output: string[];
  error: false;
}

export interface ErrorResponse {
  output: string;
  error: true;
}
