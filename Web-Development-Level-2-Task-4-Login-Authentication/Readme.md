# OIBSIP - Level 2 Task 4
# Login Authentication System

## Project Overview

This project is a simple Login Authentication System developed as part of the OASIS INFOBYTE Web Development Internship - Level 2 Task 4.

The application allows users to create an account, securely store their password using SHA-256 hashing, log in with their credentials, access a protected dashboard, and log out from their account.

---

## Features

- User Registration
- Username validation
- Email validation
- Password validation
- Minimum 8-character password
- Password must contain at least one number
- Duplicate email detection
- SHA-256 password hashing
- User login
- Generic login error message
- Protected dashboard
- Session management using localStorage
- Logout functionality
- Responsive design
- Mobile-friendly interface

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Web Crypto API
- LocalStorage

---

## Project Structure

OIBSIP/

└── Web-Development-Level-2-Task-4-Login-Authentication/

    ├── index.html
    ├── register.html
    ├── dashboard.html
    ├── style.css
    ├── auth.js
    └── README.md

---

## How to Run

1. Download or clone the project.

2. Open the project folder.

3. Open `index.html` in a web browser.

4. Click "Create Account".

5. Register using:
   - Username
   - Email
   - Password

6. Password requirements:
   - Minimum 8 characters
   - At least 1 number

7. After registration, return to the login page.

8. Enter the registered email and password.

9. After successful login, the dashboard will open.

10. Click "Logout" to end the session.

---

## Authentication Flow

### Registration

User enters their information.

↓

Input validation

↓

Duplicate email check

↓

Password hashing using SHA-256

↓

User information stored in localStorage

↓

Redirect to Login

---

### Login

User enters email and password.

↓

Password is hashed using SHA-256

↓

Credentials are compared with stored user data

↓

Valid credentials

↓

Create login session

↓

Open protected dashboard

---

### Logout

User clicks Logout.

↓

Current session is removed from localStorage.

↓

User is redirected to Login.

---

## Data Storage

This project uses browser `localStorage`.

Two main storage items are used:

### authUsers

Stores registered users.

### currentUser

Stores the currently logged-in user's session information.

Passwords are not stored as plain text. They are converted into a SHA-256 hash before being stored.

---

## Security Note

This project is designed for learning and internship demonstration purposes.

Client-side authentication with localStorage is not suitable for production applications.

A production authentication system should use:

- Backend authentication
- HTTPS
- Secure cookies
- Server-side password hashing such as bcrypt or Argon2
- Database storage
- Proper session/token management
- Server-side validation

---

## Author

Fatima Asif

OASIS INFOBYTE
Web Development
Level 2 - Task 4