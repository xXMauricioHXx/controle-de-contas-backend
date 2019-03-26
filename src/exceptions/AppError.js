function AppError(name, httpCode, description, isOperational) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.name = name;
    this.httpCode = httpCode;
    this.description = description;
    this.isOperational = isOperational;
};

AppError.prototype.__proto__ = Error.prototype;

module.exports.AppError = AppError;