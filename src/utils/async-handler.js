// asyncHandler is a function that takes your async route handler (requestHandler)
// and returns a new function that catches any errors thrown by it
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        // Call the async function and wrap it with Promise.resolve to handle both
        // sync and async functions, then catch any errors and pass to next()
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err)); // Pass errors to Express error handler middleware
    }
}

export { asyncHandler };
