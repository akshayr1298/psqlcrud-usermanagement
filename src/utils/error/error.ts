class AppError extends Error {
  public errorCode: number;
  public statusCode: number;
  constructor(errorCode: number, message: string, statusCode: number) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

export default AppError;
