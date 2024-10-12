
# Login and Registration System

This project implements a login and registration system using Angular/React on the frontend and Node.js with MongoDB on the backend.

## Features

- User registration and login with form validation.
- JWT-based authentication.
- Protected routes that are accessible only after login.
- Stores user information and token in `localStorage`.
- Displays user data in a table with pagination.
- User profile modal that opens when clicking on a row in the user table.
- Pagination with first, last, previous, and next page controls.
- Toast notifications for feedback using React Hot Toast.
- State management with Redux Toolkit.

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Cookie-parser for managing authentication tokens in cookies

### Frontend

- Angular (for login/registration forms) or React.js (for the user table)
- Redux Toolkit for state management
- React Hot Toast for notifications
- Axios for API communication
- React Router for protected routes

## API Endpoints

### POST `/api/auth/register`
Registers a new user with the following fields:
- `name`
- `email`
- `date of birth`
- `password`

### POST `/api/auth/login`
Logs in a user with email and password, and returns a JWT token.

### GET `/api/users`
Fetches all registered users (protected route).

### GET `/api/users/:id`
Fetches a specific user by ID (protected route).

### POST `/api/auth/logout`
Logs out the user by clearing the JWT token stored in cookies.

## How to Run the Project

### Backend

1. Navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following variables:
   ```bash
   MONGO_URI=<Your MongoDB Connection String>
   JWT_SECRET=<Your JWT Secret>
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend (React or Angular)

1. Navigate to the `frontend-angular` or `frontend-react` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   - For React:
     ```bash
     npm start
     ```
   - For Angular:
     ```bash
     ng serve
     ```

### Frontend (React)
Navigate to `http://localhost:3000`.

### Frontend (Angular)
Navigate to `http://localhost:4200`.

## Project Structure

### Backend

- `server.js`: Entry point of the backend server.
- `routes/`: Contains the API routes for authentication and user data.
- `models/`: Mongoose schemas for user data.

### Frontend (React)

- `components/`: Contains components for login, registration, user table, and profile modal.
- `redux/`: Contains slices and actions for state management.
- `services/`: Contains Axios methods for API requests.

### Frontend (Angular)

- `components/`: Contains login and registration forms.
- `services/`: Angular services for making API calls.
- `auth-guard.service.ts`: Protects routes from unauthenticated access.

## Additional Features

- **React Hot Toast**: Provides toast notifications for success, error, and other messages.
- **Pagination**: Implements pagination for the user table with buttons for first, last, previous, and next pages.
- **User Profile Modal**: Displays detailed information about a user when clicking on a row in the user table.
- **Protected Routes**: Ensures that the user can only access certain pages (like the user table) after logging in.

## Example Usage

### Registration:

- User fills in the registration form with name, email, date of birth, and password.
- On form submission, the user data is sent to the backend via the `/api/auth/register` endpoint.
- Upon successful registration, the user is redirected to the login page.

### Login:

- User enters their email and password into the login form.
- On form submission, the user data is sent to the backend via the `/api/auth/login` endpoint.
- If successful, a JWT token is received and stored in `localStorage`.

### Protected Pages:

- After successful login, the user can access the protected user table page.
- If the user tries to access the table without being logged in, they are redirected to the login page.

## License

This project is licensed under the MIT License.
