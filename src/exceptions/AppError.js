module.exports = function AppError(errorObj, httpCode) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.httpCode = httpCode;
    this.message = errorObj.message;
    this.code = errorObj.code;
};