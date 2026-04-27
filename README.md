HelpHub is a backend MVP built with Node.js, Express, Sequelize, and SQLite. It demonstrates a complete relational API foundation for a project-management style system with three connected resources:

Users
Projects
Tickets
This MVP includes:

3 relational resource types with constraints
Full CRUD routes for each resource
RESTful status codes and endpoint structure
Logging and error-handling middleware
Seed/setup database scripts
Initial Jest + Supertest tests
Tech Stack
Node.js
Express
Sequelize ORM
SQLite
Jest + Supertest
Morgan
Project Structure
.
├── database/
│   ├── setup.js
│   └── seed.js
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── crudControllerFactory.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   └── requestLogger.js
│   ├── models/
│   │   ├── index.js
│   │   ├── Project.js
│   │   ├── Ticket.js
│   │   └── User.js
│   └── routes/
│       ├── projects.js
│       ├── tickets.js
│       └── users.js
└── tests/
    └── api.test.js
Setup & Run Locally
Clone repo and enter project directory.
Install dependencies:
npm install
Create environment file:
cp .env.example .env
Create database schema:
npm run db:setup
Seed database with sample data:
npm run seed
Start API server:
npm run start
The API runs on http://localhost:3000 by default.

Scripts
npm run start - starts the API server
npm run dev - starts the API server (same as start for MVP)
npm run db:setup - recreates database schema
npm run seed - resets and seeds sample data
npm test - runs unit/integration tests
Data Model
User
id (PK, integer, auto increment)
name (string, required, length 2-100)
email (string, required, unique, valid email)
Project
id (PK)
title (string, required, length 3-120)
status (planned | in_progress | completed)
ownerId (FK → users.id, required)
Ticket
id (PK)
summary (string, required, length 5-200)
priority (low | medium | high)
projectId (FK → projects.id, required)
assigneeId (FK → users.id, optional)
API Documentation
Base URL: http://localhost:3000/api

Users
Create User
Method: POST
URL: /users
Body:
{
  "name": "Alice Brown",
  "email": "alice.brown@example.com"
}
Success Response: 201 Created
Get All Users
Method: GET
URL: /users
Success Response: 200 OK
Get User by ID
Method: GET
URL: /users/:id
Success Response: 200 OK
Error Response: 404 Not Found
Update User
Method: PUT
URL: /users/:id
Body: any updatable fields
Success Response: 200 OK
Error Response: 400 / 404
Delete User
Method: DELETE
URL: /users/:id
Success Response: 204 No Content
Error Response: 404 Not Found
Projects
Create Project
Method: POST
URL: /projects
Body:
{
  "title": "Launch Help Center",
  "status": "planned",
  "ownerId": 1
}
Success Response: 201 Created
Error Response: 400 Bad Request
Get All Projects
Method: GET
URL: /projects
Success Response: 200 OK
Get Project by ID
Method: GET
URL: /projects/:id
Success Response: 200 OK
Error Response: 404 Not Found
Update Project
Method: PUT
URL: /projects/:id
Success Response: 200 OK
Delete Project
Method: DELETE
URL: /projects/:id
Success Response: 204 No Content
Tickets
Create Ticket
Method: POST
URL: /tickets
Body:
{
  "summary": "Add endpoint docs",
  "priority": "medium",
  "projectId": 1,
  "assigneeId": 2
}
Success Response: 201 Created
Get All Tickets
Method: GET
URL: /tickets
Success Response: 200 OK
Get Ticket by ID
Method: GET
URL: /tickets/:id
Success Response: 200 OK
Error Response: 404 Not Found
Update Ticket
Method: PUT
URL: /tickets/:id
Success Response: 200 OK
Delete Ticket
Method: DELETE
URL: /tickets/:id
Success Response: 204 No Content
Error Handling Format
Errors return JSON in this format:

{
  "error": "Meaningful error message"
}
Unexpected server errors return:

{
  "error": "Internal server error"
}
Postman Testing Guidance
Create a Postman collection with folders for users, projects, and tickets, then add each CRUD endpoint and include one success and one failure example request per resource.

Version Control Notes
Use frequent commits while implementing each milestone (models, routes, middleware, tests, docs). Example commit style:

feat: add Sequelize models and relationships
feat: implement CRUD routes for all resources
test: add initial API endpoint coverage
docs: document setup and endpoint usage
