class AppError extends Error {
  constructor(
    public errorCode: number,
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

export default AppError;
