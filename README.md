# Express Middleware Assignment

## Overview

This project demonstrates how custom middleware is used in a Node.js and Express application.

The assignment focuses on three main types of middleware:

- Logging middleware
- Authentication middleware
- Centralized error handling

The project also demonstrates public and protected routes, API key authentication, HTTP status codes, and API testing using `curl`.

---

## Objectives

The main objectives of this project are to:

- Understand how middleware works in Express
- Create custom logging middleware
- Record request method, URL, status code, and response time
- Log request bodies for selected HTTP methods
- Mask sensitive data such as passwords
- Create API key authentication middleware
- Protect selected routes while keeping others public
- Create a custom `AppError` class
- Handle errors using centralized middleware
- Return consistent JSON error responses
- Test API endpoints using `curl`

---

## Technologies Used

- Node.js
- Express.js
- JavaScript
- npm
- curl
- VS Code
- Git & GitHub

---

## Project Structure

```text
week-5-day-2-assignment/
│
├── middleware/
│   ├── logger.js
│   ├── auth.js
│   └── errorHandler.js
│
├── screenshots/
│
├── server.js
├── package.json
└── README.md
```

---

## Middleware Features

### 1. Logging Middleware

The logger records:

- Timestamp
- HTTP method
- Request URL
- Status code
- Response time
- Request body for `POST`, `PUT`, and `PATCH`

Sensitive password information is masked:

```text
password: "***"
```

---

### 2. Authentication Middleware

Protected routes require an API key through the:

```text
x-api-key
```

header.

If the key is missing or incorrect, the server returns:

```text
401 Unauthorized
```

Public routes remain accessible without authentication.

---

### 3. Error Handling Middleware

The project uses a custom `AppError` class and centralized error handler.

Example:

```json
{
  "success": false,
  "error": {
    "message": "City not found",
    "statusCode": 404
  }
}
```

Unexpected errors return a safe `500` response without exposing internal application details.

---

## API Endpoints

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/health` | Public |
| GET | `/api/cities` | Public |
| GET | `/api/cities/:id` | Public |
| POST | `/api/cities` | Protected |
| DELETE | `/api/cities/:id` | Protected |

---

## Running the Project

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Or run in development mode:

```bash
npm run dev
```

The application runs on:

```text
http://localhost:3000
```

---

## Middleware Flow

```text
Request
   ↓
express.json()
   ↓
Logger
   ↓
Authentication
   ↓
Route Handler
   ↓
Error Handler
   ↓
Response
```

Authentication is only applied to protected routes.

---

## Key Learning Outcomes

This project helped me practise:

- Creating custom Express middleware
- Understanding middleware execution order
- Logging HTTP requests
- Protecting routes using API keys
- Using `next()` and `next(error)`
- Creating custom error classes
- Handling application errors centrally
- Testing REST API endpoints using `curl`

---




## Author

**Dominic Kores**
  
Full-Stack Software & AI Engineering

