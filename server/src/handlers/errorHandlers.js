const AppError = require("../utils/appError");

const handleErrBadFieldErrorDB = () => {
  const message = `ID value must be a number `;
  return new AppError(message, 400);
};

const handleErrDupEntryErrorDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value : ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const message = `Invalid input data: ${err.message}`;
  return new AppError(message, 400);
};

const handleNoTableErrorDB = (err) => {
  return new AppError(err.message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token, Please log in again", 401);

const handleExpiredToken = () =>
  new AppError("Token has expired, please log in again", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //log error
    console.error("ERROR", err);

    //send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.create(err);
    if (error.code === "ER_BAD_FIELD_ERROR") error = handleErrBadFieldErrorDB();
    if (error.code === "ER_DUP_ENTRY") error = handleErrDupEntryErrorDB(err);

    if (error.code === "ER_TRUNCATED_WRONG_VALUE")
      error = handleValidationErrorDB(err);

    if (error.code === "ER_NO_SUCH_TABLE") error = handleNoTableErrorDB(err);

    if (error.name === "JsonWebTokenError") error = handleJWTError();

    if (error.name === "TokenExpiredError") error = handleExpiredToken();
    sendErrorProd(err, res);
  }
};
