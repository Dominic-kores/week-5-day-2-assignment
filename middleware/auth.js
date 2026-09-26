// middleware/auth.js

// API key required by the application
const API_KEY = "mctaba-2026-secret-key";

// Authentication middleware
const authenticate = (req, res, next) => {
  // Read the API key from the request headers
  const providedKey = req.get("x-api-key");

  // Check whether the API key was provided
  if (!providedKey) {
    return res.status(401).json({
      error: "API key required. Include x-api-key header.",
    });
  }

  // Check whether the provided API key is correct
  if (providedKey !== API_KEY) {
    return res.status(401).json({
      error: "Invalid API key",
    });
  }

  // API key is valid, continue to the route
  next();
};

module.exports = authenticate;