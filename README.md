#Node.js REST API with JWT Authentication and MongoDB
***A robust RESTful API built with Node.js and Express.js that provides user authentication using JWT (JSON Web Tokens), data persistence through MongoDB, and essential features like CRUD operations, pagination, sorting, and logging with Winston. This project is written in TypeScript to enhance code maintainability and type safety.

##Features
+ User Authentication:

User Registration and Login with hashed passwords (using bcrypt).
JWT-based Authorization to secure routes and manage user sessions.
CRUD Operations:

Create, Read, Update, and Delete user information stored in MongoDB.
Pagination and Sorting:

Efficiently fetch paginated results with sorting options.
Database Integration:

Uses MongoDB for persistence with the Mongoose ODM.
Error Handling & Logging:

Centralized logging with Winston for debugging and monitoring.
Proper error handling with meaningful responses.
Environment Configuration:

Uses dotenv to load environment variables from .env files.

Technologies Used
Backend: Node.js, Express.js
Authentication: JWT, bcrypt
Database: MongoDB, Mongoose
Language: TypeScript
Logging: Winston
Environment Management: dotenv
Future Enhancements
Add email verification for user registration.
Implement role-based access control (RBAC).
Integrate rate-limiting to prevent brute-force attacks.
