// middleware/errorHandler.js

// Custom application error class
class AppError extends Error {
  constructor(message, statusCode) {
    // Send the message to the built-in Error class
    super(message);

    // Store the HTTP status code
    this.statusCode = statusCode;

    // Mark the error as an expected/operational error
    this.isOperational = true;
  }
}

// Centralized Express error-handling middleware
const errorHandler = (err, req, res, next) => {
  // Determine whether this is one of our AppError errors
  const isAppError = err instanceof AppError;

  // AppError keeps its own status code.
  // Unknown errors become HTTP 500.
  const statusCode = isAppError ? err.statusCode : 500;

  // Do not expose internal error details for unexpected errors
  const message = isAppError
    ? err.message
    : "Something went wrong on the server";

  // Create the consistent error response
  const errorResponse = {
    success: false,

    error: {
      message,
      statusCode,
    },
  };

  // Include the stack trace while developing the application
  if (process.env.NODE_ENV === "development") {
    errorResponse.error.stack = err.stack;
  }

  // Return the error response
  res.status(statusCode).json(errorResponse);
};

module.exports = {
  AppError,
  errorHandler,
};