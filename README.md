# Finance Dashboard Backend System

A scalable backend system built to manage financial records, user roles, and dashboard analytics with proper access control. This project demonstrates clean backend architecture, structured API design, and real-world engineering practices.

---

## Overview

This application simulates a finance dashboard where different users interact with financial data based on their roles. The system is designed with a focus on **maintainability, scalability, and clarity of logic**, rather than unnecessary complexity.

The backend exposes APIs for:

* User management
* Authentication & authorization
* Financial record management
* Aggregated dashboard insights

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Tokens)
* **Security:** bcrypt (password hashing)
* **Environment Config:** dotenv

---

## Architecture

The project follows a **layered architecture**:

```
Client → Routes → Controllers → Services → Models → Database
```

* **Routes:** Define API endpoints
* **Controllers:** Handle request/response
* **Services:** Contain business logic
* **Models:** Define database schema
* **Middlewares:** Handle authentication, authorization, logging, and errors

This separation ensures clean, scalable, and maintainable code.

---

## Authentication & Authorization

* JWT-based authentication system
* Passwords are securely hashed using bcrypt
* Role-Based Access Control (RBAC) implemented

### Roles:

* **Admin:** Full access (users + records)
* **Analyst:** Can view records and analytics
* **Viewer:** Can only view dashboard summary

---

## Financial Records

Each financial record contains:

* Amount
* Type (Income / Expense)
* Category
* Date
* Notes
* Associated User

### Features:

* Create, update, delete records
* Filter by type and category
* Ownership-based access control
* Admin override capability

---

## Dashboard APIs

The backend provides aggregated data for dashboards:

* Total Income
* Total Expenses
* Net Balance
* Category-wise breakdown
* Recent transactions

MongoDB aggregation pipelines are used to efficiently compute analytics.

---

## Error Handling & Logging

* Centralized error handling middleware
* Consistent API response format:

  ```json
  {
    "success": false,
    "message": "Error message"
  }
  ```
* Request logging middleware for tracking:

  ```
  METHOD URL STATUS - TIME(ms)
  ```

---

## API Endpoints

### Auth

* `POST /api/auth/signup`
* `POST /api/auth/login`

### Users (Admin Only)

* `POST /api/users`
* `GET /api/users`
* `PATCH /api/users/:id/status`

### Records

* `POST /api/records`
* `GET /api/records`
* `PATCH /api/records/:id`
* `DELETE /api/records/:id`

### Dashboard

* `GET /api/dashboard/summary`

---

## Setup Instructions

1. Clone the repository
2. Install dependencies

   ```
   npm install
   ```
3. Create a `.env` file:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```
4. Run the server

   ```
   npm run dev
   ```

---

## Key Design Decisions

* Used **layered architecture** for scalability
* Implemented **RBAC at middleware and service level**
* Used **MongoDB aggregation** for efficient analytics
* Centralized **error handling and logging**
* Kept the system **minimal but production-oriented**

---

## Future Improvements

* Pagination & advanced filtering
* API documentation (Swagger)
* Unit & integration testing
* Rate limiting
* Refresh token mechanism

---

## Conclusion

This project focuses on demonstrating **backend engineering fundamentals**, including clean architecture, secure authentication, role-based access control, and efficient data processing.

The goal was not to build a complex system, but to build a **well-structured and reliable backend** that reflects real-world development practices.

---
