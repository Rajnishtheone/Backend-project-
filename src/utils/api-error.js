// Creating a custom error class named ApiError which extends the built-in Error class
class ApiError extends Error {
    constructor(
        statusCode,                              // HTTP status code (e.g., 404, 500)
        message = "Something went wrong",        // Default error message if none provided
        errors = [],                             // Optional array of specific error details
        stack = ""                               // Optional stack trace for debugging
    ) {
        super(message);                          // Call the parent Error class with the message

        this.statusCode = statusCode;            // Set the status code on the error
        this.message = message;                  // Set the custom error message
        this.success = false;                    // Always false since this is an error
        this.errors = errors;                    // Store any extra error details

        // If a custom stack is provided, use it. Otherwise, generate a new one
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor); // Captures the current stack trace
        }
    }
}

// Exporting the ApiError class so it can be used in other parts of the app
export { ApiError };
