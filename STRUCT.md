appointment-scheduler/
├── .env
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   ├── database.ts
│   │   └── env.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── appointmentController.ts
│   ├── entities/
│   │   ├── User.ts
│   │   └── Appointment.ts
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── appointmentRoutes.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── authService.ts
│   │   └── appointmentService.ts
│   ├── utils/
│   │   └── jwtUtils.ts
│   ├── tests/
│   │   ├── authController.test.ts
│   │   ├── appointmentController.test.ts
│   └── widget/
│       ├── appointmentWidget.ts
│       ├── appointmentWidget.html
│       ├── appointmentWidget.css
│       └── index.ts
├── public/
│   ├── js/
│   │   └── appointmentWidget.min.js
│   ├── css/
│   │   └── appointmentWidget.min.css
└── Dockerfile

Project Root Files
.env: Contains environment variables, such as database connection strings, API keys, and secrets.

.gitignore: Specifies which files and directories Git should ignore (e.g., node_modules/, .env).

README.md: Documentation about the project, how to set it up, run, and contribute.

package.json: Lists dependencies, scripts, and metadata for the Node.js project.

tsconfig.json: TypeScript configuration file, defining how the TypeScript compiler should behave.

src/ Directory
This directory contains all the source code for your application.

app.ts: Main application setup, where middleware, routes, and global configurations are applied.

server.ts: Entry point of the application that initializes the server and connects to the database.

config/ Directory
Configuration files for the application.

database.ts: Configures TypeORM for PostgreSQL and connects to the cloud database.

env.ts: Utility to load environment variables and provide fallback defaults.

controllers/ Directory
Controllers contain the logic for handling incoming HTTP requests.

authController.ts: Manages authentication-related routes (login, registration, etc.).

appointmentController.ts: Handles appointment scheduling logic and routes.

entities/ Directory
Entities represent the database models.

User.ts: Defines the User entity schema for TypeORM.

Appointment.ts: Defines the Appointment entity schema.

middleware/ Directory
Middleware functions that process requests before they reach the controllers.

authMiddleware.ts: Verifies JWT tokens to protect routes that require authentication.
routes/ Directory
Defines the routes for different parts of the application.

authRoutes.ts: Routes for authentication (e.g., /login, /register).

appointmentRoutes.ts: Routes for appointment management (e.g., /appointments).

index.ts: Main router that combines all the routes.

services/ Directory
Services contain business logic and interact with the database.

authService.ts: Handles business logic for authentication (e.g., hashing passwords, generating JWTs).

appointmentService.ts: Handles business logic for appointment scheduling.

utils/ Directory
Utility functions and helpers used throughout the application.

jwtUtils.ts: Utility functions for creating and verifying JWT tokens.
tests/ Directory
Contains unit and integration tests.

authController.test.ts: Tests for authentication-related functionality.

appointmentController.test.ts: Tests for appointment-related functionality.

widget/ Directory
Contains the code for the frontend widget.

appointmentWidget.ts: Main logic for the appointment scheduling widget (in TypeScript).

appointmentWidget.html: Basic HTML structure of the widget, if needed.

appointmentWidget.css: Styles specific to the widget.

index.ts: The entry point for compiling or bundling the widget’s frontend code, producing the final appointmentWidget.min.js and appointmentWidget.min.css.

public/ Directory
Static assets that will be served by the server.

js/appointmentWidget.min.js: Minified JavaScript file for the widget, which can be included in other websites.

css/appointmentWidget.min.css: Minified CSS for the widget.

Dockerfile
Contains instructions for building a Docker image for your application, useful for deployment and scaling in cloud environments.