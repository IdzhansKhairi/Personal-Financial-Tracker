# Supabase Migration Guide - Dashboard Module

This guide will help you complete the Supabase setup and test the Dashboard page migration.

## ✅ Completed Steps

1. ✅ Installed `@supabase/supabase-js` package
2. ✅ Created `lib/supabase.ts` - Supabase client configuration
3. ✅ Created `lib/db-adapter.ts` - Database abstraction layer for dual-database support
4. ✅ Updated `.env.example` and `.env.local` with Supabase configuration
5. ✅ Created `scripts/test-supabase-connection.ts` - Connection test script
6. ✅ Updated `/api/transactions` route to use DashboardAdapter

---

## 🔑 Step 1: Get Your Supabase API Keys

You need to get your Supabase API keys and update the `.env.local` file.

### How to Get Your Keys:

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: `vnhqdvqwibgsnqzdimob`
3. **Click on "Settings"** (gear icon in left sidebar)
4. **Click on "API"** in the Settings menu
5. **Copy the following values**:
   - **Project URL** → `https://vnhqdvqwibgsnqzdimob.supabase.co`
   - **anon public** key → Copy this key
   - **service_role** key → Copy this key (keep it secret!)

### Update Your .env.local File:

Open `.env.local` and replace the placeholder values:

```env
# Replace these values with your actual Supabase keys:
NEXT_PUBLIC_SUPABASE_URL=https://vnhqdvqwibgsnqzdimob.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<paste_your_anon_key_here>
SUPABASE_SERVICE_ROLE_KEY=<paste_your_service_role_key_here>
```

**Important Notes:**
- `NEXT_PUBLIC_SUPABASE_URL` should be: `https://vnhqdvqwibgsnqzdimob.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` starts with `eyJ...`
- `SUPABASE_SERVICE_ROLE_KEY` also starts with `eyJ...` but is different and more powerful (keep secret!)

---

## 🧪 Step 2: Test Supabase Connection

After updating your `.env.local` with the correct API keys, test the connection:

```bash
npx tsx scripts/test-supabase-connection.ts
```

**Expected Output:**
```
🔍 Testing Supabase connection...

✅ Users table: 1 records
✅ Transactions table: 30 records
✅ Accounts table: 8 records
✅ Commitments table: 6 records
✅ Commitment payments table: 11 records
✅ Wishlist table: 7 records
✅ Debts table: 8 records
✅ Sessions table: 1 records

🎉 All tests passed! Supabase is connected and data is migrated.
```

**If you get an error:**
- Check that you copied the keys correctly (no extra spaces)
- Make sure the keys match your project
- Verify you ran the PostgreSQL migration scripts in Supabase

---

## 🚀 Step 3: Enable Dashboard to Use Supabase

Right now, the dashboard is still using SQLite. To switch it to Supabase:

### Edit `.env.local`:

Change this line:
```env
USE_SUPABASE_DASHBOARD=false
```

To:
```env
USE_SUPABASE_DASHBOARD=true
```

Save the file.

---

## 🖥️ Step 4: Test the Dashboard

### Start the Development Server:

```bash
npm run dev
```

### Open the Dashboard:

1. Navigate to: http://localhost:3000
2. Login with your credentials
3. Go to the Dashboard page

### What to Check:

The dashboard should display:
- ✅ All your transactions
- ✅ Income vs Expense charts
- ✅ Monthly breakdowns
- ✅ Account balances

### Check the Console Logs:

In your terminal where `npm run dev` is running, you should see logs like:

```
[Dashboard] Using Supabase for transactions query
[Dashboard] Fetched 30 transactions from Supabase
```

If you see these logs, **congratulations! Your dashboard is now using Supabase!** 🎉

---

## 🔄 Step 5: Switch Back to SQLite (Optional)

To switch back to SQLite for testing:

### Edit `.env.local`:

```env
USE_SUPABASE_DASHBOARD=false
```

You should now see:
```
[Dashboard] Using SQLite for transactions query
[Dashboard] Fetched 30 transactions from SQLite
```

This dual-database approach lets you safely test and switch between databases!

---

## 📊 How the Dual Database Strategy Works

### Environment Variables Control:

Each module has its own toggle in `.env.local`:

```env
USE_SUPABASE_DASHBOARD=false      # Dashboard page
USE_SUPABASE_TRANSACTIONS=false   # Transaction management
USE_SUPABASE_ACCOUNTS=false       # Account balances
USE_SUPABASE_COMMITMENTS=false    # Commitments
USE_SUPABASE_WISHLIST=false       # Wishlist
USE_SUPABASE_DEBTS=false          # Debts
USE_SUPABASE_AUTH=false           # Authentication (migrate last!)
```

### Database Adapter Layer:

The `lib/db-adapter.ts` file contains adapters that check these environment variables:

```typescript
if (useSupabase('dashboard')) {
  // Use Supabase
  const { data } = await supabase.from('transaction_list_table').select('*')
} else {
  // Use SQLite
  const db = await openDB()
  const data = await db.all('SELECT * FROM transaction_list_table')
}
```

### Benefits:

1. **Safe Migration**: Test each module independently
2. **Easy Rollback**: Just toggle the environment variable
3. **Data Consistency**: Both databases have the same data
4. **No Downtime**: Switch without redeploying

---

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"

**Solution**: Make sure you've updated `.env.local` with your actual API keys.

### Error: "relation 'transaction_list_table' does not exist"

**Solution**: Run the PostgreSQL migration scripts in Supabase SQL Editor (from the migration plan I provided earlier).

### Dashboard shows no data when using Supabase

**Solution**:
1. Check that data was migrated successfully: `npx tsx scripts/test-supabase-connection.ts`
2. Check browser console for errors
3. Check terminal logs for error messages

### Data is different between SQLite and Supabase

**Solution**:
1. Any new data added to SQLite won't appear in Supabase (they're separate databases)
2. You can manually sync by re-running the data migration SQL scripts
3. Once fully migrated, we'll remove SQLite

---

## 📝 Next Steps

After the Dashboard is working with Supabase:

1. **Transactions Module** - Enable full CRUD for transactions
2. **Accounts Module** - Account balance management
3. **Commitments Module** - Monthly commitments tracking
4. **Wishlist Module** - Wishlist management
5. **Debts Module** - Debt tracking
6. **Authentication Module** - Migrate auth last (most critical)

Each module will follow the same pattern:
1. Update API routes to use adapters
2. Toggle environment variable to `true`
3. Test thoroughly
4. Move to next module

---

## 🎯 Current Status

- ✅ **Dashboard**: Ready to test with Supabase
- ⏳ **Transactions**: Adapter created, ready to migrate
- ⏳ **Accounts**: Adapter created, ready to migrate
- ⏳ **Commitments**: Not yet started
- ⏳ **Wishlist**: Not yet started
- ⏳ **Debts**: Not yet started
- ⏳ **Auth**: Not yet started (migrate last)

---

## 🆘 Need Help?

If you encounter any issues:

1. Check the console logs (browser and terminal)
2. Verify your `.env.local` has correct values
3. Test Supabase connection: `npx tsx scripts/test-supabase-connection.ts`
4. Check that `USE_SUPABASE_DASHBOARD` is set correctly
5. Restart the dev server after changing `.env.local`

---

**Good luck with testing! Let me know once the dashboard is working with Supabase, and we'll proceed with the next module.** 🚀
