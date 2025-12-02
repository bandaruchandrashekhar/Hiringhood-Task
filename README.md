# Hiringhood-Task

## Setup Instructions

Following the steps below we can develop an api for TODO:

1. **Initialize the Node.js Server:**
   ```sh
   npm init -y
   ```
   This will create a `package.json` file to manage dependencies.

2. **Install Necessary Libraries:**
   Install the required dependencies using:
   ```sh
   npm install express mongoose dotenv bcrypt jsonwebtoken nodemon
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     URI=your_mongodb_connection_string
     JWT=your_secret_key
     ```

4. **Set Up Git Ignore:**
   - Create a `.gitignore` file.
   - Add files that should not be pushed to the repository:
     ```
     node_modules/
     .env
     ```

5. **Setup Database Models:**
   - Create a `models` folder.
   - Define the `User` and `Task` schemas in separate files.

6. **Create API Routes:**
   - Inside the `routes` folder, create separate route files for:
     - Authentication (register, login)
     - User-related operations
     - Task-related operations

7. **Implement Authentication Middleware:**
   - Create a middleware for verifying JWT tokens.
   - Ensure protected routes require authentication.

8. **Test APIs Using Thunder Client or Postman:**
   - Use tools like Thunder Client or Postman to test API endpoints.
   - Check if tasks can be created, updated, deleted, and retrieved.

## Running the Application

1. Start the server using Nodemon for automatic restarts:
   ```sh
   npx nodemon index.js
   ```
   Or manually run:
   ```sh
   node index.js
   ```

2. The API will be available at:
   ```
   http://localhost:5000
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` – Register a new user.
- `POST /api/auth/login` – Authenticate and get a token.
- 
### User
- `GET /api/user/:id` – Register a new user.
- `DELETE /api/user/:id` – Authenticate and get a token.

### Tasks
- `POST /api/todo` – Create a new task (Authenticated).
- `GET /api/todos` – Get all tasks (Authenticated).
- `GET /api/todos/:id` – Get all tasks (Authenticated).
- `PUT /api/todos/:id` – Update a task (Authenticated).
- `DELETE /api/todos/:id` – Delete a task (Authenticated).
