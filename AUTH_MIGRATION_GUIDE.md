# Authentication Migration Guide

## Overview

This application has been migrated from **Keycloak** authentication to a **custom SQLite-based authentication system**. This guide will help you set up and use the new authentication system.

---

## What Changed?

### Removed
- ❌ Keycloak integration
- ❌ NextAuth.js dependency
- ❌ External authentication server requirement
- ❌ JOSE and jwt-decode libraries

### Added
- ✅ Custom authentication system using SQLite
- ✅ Secure password hashing with bcrypt
- ✅ Session management with HTTP-only cookies
- ✅ Custom AuthContext for React components
- ✅ API authentication middleware

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install the new `bcrypt` dependency for password hashing.

### 2. Run Database Migrations

Create the authentication tables in your SQLite database:

```bash
npm run db:migrate-auth-tables
```

This creates:
- `users` table - Stores user credentials and profile information
- `sessions` table - Manages active user sessions

### 3. Create Your First User

Run the interactive user creation script:

```bash
npm run db:seed-user
```

You'll be prompted to enter:
- Username (required)
- Email (required)
- Password (required)
- First name (optional)
- Last name (optional)
- Phone number (optional)
- Role (admin/finance/guard/manager, default: finance)

**Example:**
```
Enter username: admin
Enter email: admin@example.com
Enter password: your-secure-password
Enter first name (optional): John
Enter last name (optional): Doe
Enter phone number (optional): +1234567890
Enter role (admin/finance/guard/manager) [default: finance]: finance
```

### 4. Remove Old Environment Variables

You can remove these Keycloak-related environment variables from your `.env` file (if you have one):
- `KEYCLOAK_ISSUER`
- `KEYCLOAK_ID`
- `KEYCLOAK_SECRET`

Keep this one:
- `NEXTAUTH_SECRET` - Still used for session signing

### 5. Start the Application

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and log in with your newly created user credentials.

---

## New Authentication Architecture

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  phone_number TEXT,
  first_name TEXT,
  last_name TEXT,
  role TEXT NOT NULL DEFAULT 'finance',
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Sessions Table
```sql
CREATE TABLE sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  session_token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Security Features

1. **Password Hashing**: Uses bcrypt with 10 salt rounds
2. **Session Tokens**: Cryptographically secure 64-character random tokens
3. **HTTP-Only Cookies**: Prevents XSS attacks
4. **Session Expiration**: 7-day default expiration
5. **Middleware Protection**: All `/dashboard/*` and `/api/*` routes are protected
6. **Role-Based Access Control**: Unchanged from previous implementation

### Authentication Flow

1. User submits login credentials to `/api/auth/login`
2. Server validates credentials against database
3. If valid, create session token and store in database
4. Return HTTP-only cookie with session token
5. Middleware validates session on each request
6. Protected pages and API routes check session before rendering/processing

---

## API Endpoints

### POST `/api/auth/login`
Login with username and password.

**Request:**
```json
{
  "username": "admin",
  "password": "your-password"
}
```

**Response (Success):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "finance"
  }
}
```

### POST `/api/auth/logout`
Logout current user (no request body needed).

**Response:**
```json
{
  "success": true
}
```

### GET `/api/auth/session`
Get current user session.

**Response (Authenticated):**
```json
{
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "finance"
  }
}
```

**Response (Not Authenticated):**
```json
{
  "user": null
}
```

---

## Using Authentication in Your Code

### Client Components

Use the `useAuth` hook:

```tsx
import { useAuth } from "@/app/contexts/AuthContext";

function MyComponent() {
  const { user, status, logout } = useAuth();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.firstName || user?.username}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Server Components / API Routes

Use the auth library functions:

```tsx
import { getCurrentUser, getCurrentSession } from "@/lib/auth";

// Get current user
const user = await getCurrentUser();

// Get full session with user
const session = await getCurrentSession();

// Check if user has role
import { hasRole, hasAnyRole } from "@/lib/auth";
if (hasRole(user, "admin")) {
  // Admin only logic
}
```

### Protected API Routes

Use the API auth middleware:

```tsx
import { requireAuth, requireRole, requireAnyRole } from "@/lib/apiAuth";

// Require authentication
export const GET = requireAuth(async (request) => {
  // request.user is available here
  const userId = request.user?.id;
  // ... your logic
});

// Require specific role
export const POST = requireRole("admin", async (request) => {
  // Only admin users can access
  // ... your logic
});

// Require any of multiple roles
export const PUT = requireAnyRole(["admin", "finance"], async (request) => {
  // Admin or finance users can access
  // ... your logic
});
```

---

## Role-Based Access Control

The following roles are available (defined in `/lib/constants.ts`):

- **admin**: Full access to all pages
- **finance**: Access to finance-related pages (dashboard, transactions, commitments, wishlist, debts)
- **guard**: Access to registration and visitor list
- **manager**: Access to security list and reports

You can modify role permissions in [lib/constants.ts](lib/constants.ts).

---

## Session Management

### Session Duration
Default: **7 days**

To change this, edit `SESSION_DURATION_DAYS` in [lib/auth.ts](lib/auth.ts):

```typescript
const SESSION_DURATION_DAYS = 7; // Change this value
```

### Cleanup Expired Sessions

Currently, expired sessions are automatically filtered during validation. To manually clean up expired sessions:

```typescript
import { cleanupExpiredSessions } from "@/lib/auth";

await cleanupExpiredSessions();
```

Consider adding this to a cron job or scheduled task for production.

---

## Troubleshooting

### "Cannot log in" / "Invalid credentials"
1. Verify user exists in database
2. Check password was entered correctly
3. Ensure `bcrypt` package is installed
4. Check browser console for errors

### "Redirected to login after successful login"
1. Check middleware is not blocking the route
2. Verify session token is being set in cookies
3. Check browser cookie settings (must allow cookies)
4. Look for errors in server console

### "Cannot access protected pages"
1. Ensure user role has access to that page (check `ROLE_PATHS` in [lib/constants.ts](lib/constants.ts))
2. Verify middleware is properly configured
3. Check session is valid and not expired

### Database Errors
1. Ensure migrations have been run: `npm run db:migrate-auth-tables`
2. Check database file exists at `./database/mydb.sqlite`
3. Verify database has write permissions

---

## Security Best Practices

1. **Use HTTPS in Production**: Set `secure: true` for cookies
2. **Keep NEXTAUTH_SECRET Secure**: Generate a strong random secret
3. **Regular Session Cleanup**: Implement automated cleanup of expired sessions
4. **Password Requirements**: Consider adding password strength validation
5. **Rate Limiting**: Add rate limiting to login endpoint to prevent brute force
6. **Audit Logging**: Consider adding logging for authentication events

---

## Migration Checklist

- [x] Run `npm install` to install new dependencies
- [x] Run `npm run db:migrate-auth-tables` to create auth tables
- [x] Create initial user with `npm run db:seed-user`
- [x] Remove old Keycloak environment variables
- [x] Test login functionality
- [x] Test logout functionality
- [x] Test protected routes
- [x] Test role-based access control
- [x] Verify API authentication works

---

## Need Help?

If you encounter any issues during migration, check:
1. Server console logs for detailed error messages
2. Browser console for client-side errors
3. Database file permissions
4. Environment variables configuration

The new authentication system is completely self-contained and doesn't require any external services!
