// server.js

// Import Express
const express = require("express");

// Import our custom middleware
const logger = require("./middleware/logger");
const authenticate = require("./middleware/auth");
const {
  AppError,
  errorHandler,
} = require("./middleware/errorHandler");

// Create the Express application
const app = express();

// Server port
const PORT = 3000;

// Parse incoming JSON request bodies
app.use(express.json());

// Apply logger globally.
// Every incoming request will pass through this middleware.
app.use(logger);

// Temporary city data
let cities = [
  {
    id: 1,
    name: "Nairobi",
    country: "Kenya",
  },
  {
    id: 2,
    name: "Canberra",
    country: "Australia",
  },
  {
    id: 3,
    name: "London",
    country: "United Kingdom",
  },
];

// -------------------------------------------------------
// PUBLIC ROUTES
// -------------------------------------------------------

// Health-check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

// GET all cities
// Public route - no API key required
app.get("/api/cities", (req, res) => {
  res.json({
    success: true,
    data: cities,
  });
});

// GET one city
app.get("/api/cities/:id", (req, res, next) => {
  // Convert route parameter from string to number
  const cityId = parseInt(req.params.id);

  // Find the city
  const city = cities.find((city) => city.id === cityId);

  // Pass the error to the centralized error handler
  if (!city) {
    return next(new AppError("City not found", 404));
  }

  res.json({
    success: true,
    data: city,
  });
});

// -------------------------------------------------------
// PROTECTED ROUTES
// -------------------------------------------------------

// POST a new city
// Authentication middleware runs before the route
app.post("/api/cities", authenticate, (req, res, next) => {
  const { name, country } = req.body;

  // Basic validation
  if (!name || !country) {
    return next(
      new AppError("Name and country are required", 400)
    );
  }

  // Create a new city
  const newCity = {
    id: cities.length + 1,
    name,
    country,
  };

  // Add it to our array
  cities.push(newCity);

  // Return the new resource
  res.status(201).json({
    success: true,
    data: newCity,
  });
});

// DELETE city
// Also protected by API-key authentication
app.delete("/api/cities/:id", authenticate, (req, res, next) => {
  const cityId = parseInt(req.params.id);

  // Find the city
  const city = cities.find((city) => city.id === cityId);

  if (!city) {
    return next(new AppError("City not found", 404));
  }

  // Remove the city
  cities = cities.filter((city) => city.id !== cityId);

  res.json({
    success: true,
    message: "City deleted successfully",
  });
});

// -------------------------------------------------------
// ERROR TESTING ROUTE
// -------------------------------------------------------

// This route deliberately creates an unexpected error
app.get("/api/broken-route", (req, res, next) => {
  try {
    // Reference to a variable that does not exist
    console.log(undefinedVariable);
  } catch (error) {
    next(error);
  }
});

// -------------------------------------------------------
// 404 ROUTE
// -------------------------------------------------------

// Runs if no previous route matches
app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

// -------------------------------------------------------
// CENTRALIZED ERROR HANDLER
// -------------------------------------------------------

// Error middleware must be placed LAST
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});