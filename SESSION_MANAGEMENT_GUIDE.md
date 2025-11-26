# Session Management Guide

## 🔐 How Your Authentication Sessions Work

### Session Duration: **7 Days**
### Session Policy: **Single Session Only** (One Device at a Time)

When you log in, you stay logged in for **7 days** from the time you logged in, unless you manually log out or log in from another device.

---

## 📋 How Sessions Work - Step by Step

### 1. **When You Log In**

```
You enter username & password
       ↓
System verifies credentials against database
       ↓
If valid: Deletes ALL existing sessions for your user (kicks out other devices)
       ↓
Creates a NEW session token (64 random characters)
       ↓
Stores session in database with expiration date (today + 7 days)
       ↓
Returns session token to your browser as HTTP-only cookie
       ↓
You're redirected to dashboard
```

**Important:** When you log in, any other devices logged in with your account are automatically logged out!

**Example Session in Database:**
```
ID: 1
User ID: 1
Session Token: a7f3b9c2d4e6f8a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9
Expires At: 2025-12-03 10:30:00  (7 days from login)
Created At: 2025-11-26 10:30:00
```

---

### 2. **While You're Using the App**

Every time you:
- Visit a page
- Click a button
- Make an API request

The system checks:
```
1. Does the cookie exist? ✓
2. Is the session token valid? ✓
3. Is the session expired? (Check expires_at > current time) ✓
4. Is the user account active? ✓
```

If all checks pass → You can continue
If any check fails → Redirect to login page

---

### 3. **Session Validation Locations**

Your session is validated in **3 places**:

#### A. **Middleware** ([middleware.ts](middleware.ts))
- Runs on **every request** to protected routes (`/dashboard/*`, `/api/*`)
- Checks if session cookie exists
- Validates session hasn't expired
- Redirects to login if invalid

#### B. **Dashboard Layout** ([app/dashboard/layout.tsx](app/dashboard/layout.tsx))
- Checks authentication status when you load a page
- Refreshes session when you switch back to the tab
- Refreshes session when you focus the window
- Shows loading spinner while checking
- Redirects to login if unauthenticated

#### C. **API Routes** (when using `requireAuth()`)
- Each protected API endpoint validates the session
- Returns 401 Unauthorized if no valid session

---

## ⏰ Session Expiration Timeline

### Configured Duration
Located in [lib/auth.ts](lib/auth.ts) line 8:
```typescript
const SESSION_DURATION_DAYS = 7; // 7 days
```

### Example Timeline

| Event | Time | Session Valid Until |
|-------|------|-------------------|
| You log in | Nov 26, 10:00 AM | Dec 3, 10:00 AM |
| Day 1-6 | Using the app normally | Dec 3, 10:00 AM |
| Day 7 at 9:59 AM | Still logged in ✓ | Dec 3, 10:00 AM |
| Day 7 at 10:01 AM | Session expired ❌ | - |
| Try to access page | Redirected to login | - |

---

## 🔄 Session Refresh Behavior

### **Your sessions DO NOT auto-extend**

Important: Sessions work on a **fixed expiration**, not a "sliding window":

**❌ Does NOT happen:**
- Session expires in 7 days
- You use the app on day 5
- Session extends to day 12 ❌ (This does NOT happen)

**✓ What ACTUALLY happens:**
- Session expires in 7 days
- You use the app on day 5
- Session still expires on day 7 ✓
- On day 7: You need to log in again
- New session created, expires in another 7 days

### Why Fixed Expiration?
This is more secure - it ensures:
1. Sessions don't live forever just because you keep using the app
2. You periodically re-authenticate (every 7 days max)
3. Stolen session tokens eventually expire

---

## 🛡️ Security Features

### 1. **HTTP-Only Cookies**
- Cookie cannot be accessed by JavaScript
- Prevents XSS (Cross-Site Scripting) attacks
- Cookie is automatically sent with every request

### 2. **Secure Cookies (in Production)**
Located in [app/api/auth/login/route.ts](app/api/auth/login/route.ts) line 37:
```typescript
secure: process.env.NODE_ENV === "production"
```
- In development: Works over HTTP
- In production: Only works over HTTPS

### 3. **SameSite Protection**
```typescript
sameSite: "lax"
```
- Prevents CSRF (Cross-Site Request Forgery) attacks
- Cookie only sent to requests from your own site

### 4. **Cryptographically Secure Tokens**
- Session tokens are 64 random hexadecimal characters
- Generated using Node.js `crypto.randomBytes(32)`
- Impossible to guess or brute force

### 5. **Password Hashing**
- Passwords hashed with bcrypt (10 salt rounds)
- Even if database is stolen, passwords are safe
- One-way encryption - cannot be decrypted

---

## 🔧 Changing Session Duration

### To Change How Long Sessions Last

Edit [lib/auth.ts](lib/auth.ts) line 8:

```typescript
// Current: 7 days
const SESSION_DURATION_DAYS = 7;

// Examples:
const SESSION_DURATION_DAYS = 1;   // 1 day
const SESSION_DURATION_DAYS = 30;  // 30 days (1 month)
const SESSION_DURATION_DAYS = 365; // 1 year
```

**Important:** Changes only affect **NEW logins**. Existing sessions keep their original expiration date.

---

## 🧹 Session Cleanup

### Expired Sessions in Database

Expired sessions are **automatically ignored** during validation, but they remain in the database.

### Manual Cleanup

To delete expired sessions from the database:

```typescript
import { cleanupExpiredSessions } from "@/lib/auth";

await cleanupExpiredSessions();
```

### Recommended: Add a Cron Job

For production, consider adding a scheduled task to clean up old sessions:

**Option 1: Next.js API Route (Called by external cron)**
Create `/app/api/cron/cleanup-sessions/route.ts`:
```typescript
import { cleanupExpiredSessions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  await cleanupExpiredSessions();
  return NextResponse.json({ success: true });
}
```

**Option 2: Server-side Script**
Create `scripts/cleanup-sessions.ts`:
```typescript
import { cleanupExpiredSessions } from "../lib/auth";

async function cleanup() {
  console.log("Cleaning up expired sessions...");
  await cleanupExpiredSessions();
  console.log("✅ Cleanup completed!");
}

cleanup();
```

Run daily with cron: `0 2 * * * cd /your/app && npm run cleanup-sessions`

---

## 🔍 Checking Your Current Session

### Via Browser

1. Open Developer Tools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Cookies** → `http://localhost:3000` (or your domain)
4. Look for cookie named: `session_token`
5. You'll see a 64-character hexadecimal value

### Via API

Make a request to check your current session:

```bash
curl http://localhost:3000/api/auth/session
```

Response if logged in:
```json
{
  "user": {
    "id": 1,
    "username": "your-username",
    "email": "your@email.com",
    "firstName": "Your",
    "lastName": "Name"
  }
}
```

Response if not logged in:
```json
{
  "user": null
}
```

---

## 📊 Session Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         LOGIN                               │
│  User enters credentials → Validated → Session created     │
│  Session token stored in cookie (expires in 7 days)        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     USING THE APP                           │
│  Every request → Middleware checks cookie                   │
│  Every page load → Dashboard layout checks session          │
│  Tab focus/visibility → Refresh session check              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   SESSION VALIDATION                        │
│  ✓ Cookie exists?                                           │
│  ✓ Token in database?                                       │
│  ✓ Not expired? (expires_at > now)                         │
│  ✓ User active?                                             │
│                                                             │
│  If ALL pass → Allow access                                 │
│  If ANY fail → Redirect to login                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                 SESSION EXPIRATION                          │
│  After 7 days → Session expires                             │
│  Next request → Validation fails                            │
│  User redirected to login                                   │
│  Must log in again → New session created                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔓 Logout Process

When you click "Logout":

```
1. Call /api/auth/logout
2. Delete session from database
3. Clear session_token cookie from browser
4. Redirect to login page
5. Clear browser history (prevent back button)
```

After logout:
- Session token is invalid
- Cookie is removed
- Cannot access protected pages
- Must log in again to get a new session

---

## ⚡ Quick Reference

| What | Value | Location |
|------|-------|----------|
| Session Duration | 7 days | [lib/auth.ts:8](lib/auth.ts) |
| Cookie Name | `session_token` | [lib/auth.ts:9](lib/auth.ts) |
| Token Length | 64 characters | [lib/auth.ts:46](lib/auth.ts) |
| Password Hashing | bcrypt (10 rounds) | [lib/auth.ts:7](lib/auth.ts) |
| Cookie Settings | HTTP-only, SameSite Lax | [app/api/auth/login/route.ts:35-40](app/api/auth/login/route.ts) |

---

## 🎯 Summary

**Your session management is:**
- ✅ Secure (HTTP-only cookies, HTTPS in production)
- ✅ Simple (No refresh tokens, no complex flows)
- ✅ Automatic (Validates on every request)
- ✅ Reliable (Fixed 7-day expiration)

**You are logged out when:**
- ❌ 7 days have passed since login
- ❌ You click "Logout"
- ❌ Session is manually deleted from database
- ❌ Browser cookies are cleared

**You stay logged in:**
- ✅ For up to 7 days from login time
- ✅ Across browser restarts (cookie persists)
- ✅ Even if you close the browser
- ✅ Until you log out or session expires

That's everything about how your sessions work! 🎉
