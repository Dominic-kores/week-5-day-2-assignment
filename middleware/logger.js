// middleware/logger.js

// Custom logging middleware
const logger = (req, res, next) => {
  // Record the time when the request first arrives
  const startTime = Date.now();

  // Wait until Express finishes sending the response
  res.on("finish", () => {
    // Create an ISO timestamp
    const timestamp = new Date().toISOString();

    // Calculate how long the request took
    const responseTime = Date.now() - startTime;

    // Read request information
    const method = req.method;
    const path = req.originalUrl;
    const statusCode = res.statusCode;

    // Main request log
    console.log(
      `[${timestamp}] ${method} ${path} ${statusCode} - ${responseTime}ms`
    );

    // Log the request body only for POST, PUT and PATCH requests
    if (["POST", "PUT", "PATCH"].includes(method)) {
      // Make a copy so we do not modify the original req.body
      const safeBody = { ...req.body };

      // Hide the password if it exists
      if (safeBody.password) {
        safeBody.password = "***";
      }

      console.log("Body:", safeBody);
    }
  });

  // Continue to the next middleware or route
  next();
};

module.exports = logger;