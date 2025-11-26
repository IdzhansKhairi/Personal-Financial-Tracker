# Single Session Policy

## 🔒 Single Device Login Enabled

Your authentication system is configured for **single session per user**. This means only one device can be logged in at a time.

---

## 📱 How It Works

### Scenario: Logging in from Multiple Devices

```
Step 1: You log in from Device A (Laptop)
  → Creates Session 1
  → Device A is logged in ✓

Step 2: You log in from Device B (Phone)
  → Deletes Session 1 (Device A's session)
  → Creates Session 2
  → Device B is logged in ✓
  → Device A is logged out ❌

Step 3: Device A tries to access a page
  → Session 1 no longer exists in database
  → Validation fails
  → Redirected to login page
```

---

## 🎯 What This Means

### ✅ Benefits:
1. **Enhanced Security** - Only one active session at a time
2. **Prevents Unauthorized Access** - If someone steals your credentials, logging in yourself kicks them out
3. **Session Control** - You know exactly where you're logged in
4. **Resource Efficient** - Fewer sessions in database

### ⚠️ Important Notes:
- **Last login wins** - The most recent login is the only active one
- **Previous devices are automatically logged out** - No notification, just session invalidation
- **Logout from one device = logout everywhere** - Since there's only one session

---

## 🔄 Login Flow with Multiple Devices

### Example Timeline:

| Time | Action | Device A Status | Device B Status |
|------|--------|----------------|----------------|
| 10:00 AM | Login from Device A | ✅ Logged in | - |
| 10:30 AM | Login from Device B | ❌ Logged out | ✅ Logged in |
| 11:00 AM | Device A loads page | ⛔ Redirect to login | ✅ Still logged in |
| 11:30 AM | Login from Device A | ✅ Logged in | ❌ Logged out |

---

## 🔧 Technical Implementation

### Location: [lib/auth.ts](lib/auth.ts) Line 48-67

```typescript
export async function createSession(userId: number): Promise<string> {
  const db = await openDB();

  // Delete all existing sessions for this user
  await db.run(`DELETE FROM sessions WHERE user_id = ?`, [userId]);

  // Create new session
  const sessionToken = generateSessionToken();
  // ... rest of session creation
}
```

### What Happens:
1. User submits login credentials
2. System validates username and password
3. **Deletes ALL existing sessions** for that user
4. Creates ONE new session
5. Previous devices lose access immediately

---

## 🗄️ Database State

### Before Login (Device B):
```sql
sessions table:
| ID | User ID | Session Token | Expires At | Device |
|----|---------|---------------|------------|--------|
| 1  | 1       | abc123...     | Dec 3      | Device A |
```

### After Login (Device B):
```sql
sessions table:
| ID | User ID | Session Token | Expires At | Device |
|----|---------|---------------|------------|--------|
| 2  | 1       | xyz789...     | Dec 3      | Device B |
```

**Note:** Session ID 1 (Device A) was deleted!

---

## 🚨 User Experience on Previous Devices

### When Device A Tries to Access a Page:

1. Browser sends session cookie with token `abc123...`
2. Middleware checks database for that token
3. Token not found (was deleted)
4. Middleware redirects to `/login`
5. User sees login page

**No error message** - Just a clean redirect to login.

---

## 🔄 If You Want to Allow Multiple Devices

To change back to allowing multiple simultaneous sessions, edit [lib/auth.ts](lib/auth.ts) line 48-67:

### Remove These Lines:
```typescript
// IMPORTANT: Delete all existing sessions for this user (single session only)
// This ensures only one device can be logged in at a time
await db.run(`DELETE FROM sessions WHERE user_id = ?`, [userId]);
```

### Result:
- Multiple devices can be logged in simultaneously
- Each device has its own session
- Sessions are independent

---

## 🔐 Security Implications

### Current (Single Session):
- ✅ Only one device at a time
- ✅ New login kicks out old session
- ✅ Harder for attackers (they get kicked out when you log in)
- ❌ Inconvenient if you legitimately use multiple devices

### Multiple Sessions:
- ✅ Convenient for multiple devices
- ✅ Don't get logged out when switching devices
- ❌ If credentials stolen, attacker stays logged in even when you log in
- ❌ Harder to track active sessions

---

## 📊 Session Management Commands

### Check Active Sessions (Database Query):
```sql
SELECT
  s.id,
  s.session_token,
  s.expires_at,
  s.created_at,
  u.username
FROM sessions s
JOIN users u ON s.user_id = u.id
WHERE u.username = 'your-username';
```

**Expected Result:** Only 1 row (single session)

### Manually Log Out All Devices:
```sql
DELETE FROM sessions WHERE user_id = 1;
```

This logs out all devices immediately.

---

## ✨ Summary

**Current Policy:** Single Session Only

**What it means:**
- Only one device logged in at a time
- New login = previous device logged out
- More secure, less convenient for multi-device users
- Perfect for ensuring account is only used by one person/device

**Recommendation:** Keep this setting if security is more important than convenience (which is good for personal financial data! 💰)

---

## 🆘 Troubleshooting

### "I keep getting logged out!"

**Possible Reasons:**
1. Someone else is logging into your account
2. You logged in from another device/browser
3. You have multiple browser tabs and logged in from one of them

**Solution:**
- Make sure you're only logging in from one place
- Check if anyone else has your credentials

### "I want to use both my phone and laptop"

**Current:** Not possible with single session policy

**Options:**
1. Log out from one device before using the other
2. Ask me to change to multi-session mode (less secure)

---

That's everything about the single session policy! 🎯
