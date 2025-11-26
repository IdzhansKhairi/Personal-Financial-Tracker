# Database Capacity Analysis - Supabase Free Tier (500MB)

## 📊 Your Database Schema Overview

Based on your database structure, here's a complete analysis of how many records you can store in Supabase's 500MB free tier.

---

## 🗄️ Tables in Your Database

### 1. **Authentication Tables**
- `users` - User accounts
- `sessions` - Active login sessions

### 2. **Financial Tracking Tables**
- `transaction_list_table` - All income & expense transactions
- `account_balance_table` - Bank accounts, cards, cash
- `commitment_list_table` - Monthly commitments (subscriptions, bills)
- `commitment_payment_status_table` - Payment tracking per month
- `wishlist_table` - Items you want to buy
- `debts_table` - Money owed/lent

---

## 💾 Storage Size per Record (Estimated)

### **1. Users Table**
```
Fields: id, username, email, password_hash, phone_number,
        first_name, last_name, is_active, created_at, updated_at

Average size per record: ~300 bytes
```

### **2. Sessions Table**
```
Fields: id, user_id, session_token, expires_at, created_at

Average size per record: ~150 bytes
```

### **3. Transaction List Table** (LARGEST)
```
Fields: transaction_id, transaction_date, transaction_time,
        transaction_description, transaction_amount, transaction_category,
        transaction_sub_category, transaction_card_choice,
        transaction_income_source, transaction_expense_usage,
        transaction_expense_usage_category, transaction_hobby_category

Average size per record: ~400 bytes
```

### **4. Account Balance Table**
```
Fields: account_id, account_category, account_sub_category,
        account_card_type, current_balance

Average size per record: ~150 bytes
```

### **5. Commitment List Table**
```
Fields: commitment_id, commitment_name, commitment_description,
        commitment_per_month, commitment_per_year, commitment_notes,
        commitment_status, commitment_start_month, commitment_start_year

Average size per record: ~250 bytes
```

### **6. Commitment Payment Status Table**
```
Fields: commitment_payment_id, commitment_id, payment_month,
        payment_year, payment_status

Average size per record: ~50 bytes
```

### **7. Wishlist Table**
```
Fields: wishlist_id, wishlist_name, wishlist_category,
        wishlist_estimate_price, wishlist_final_price,
        wishlist_purchase_date, wishlist_url_link,
        wishlist_url_picture, wishlist_status

Average size per record: ~300 bytes
```

### **8. Debts Table**
```
Fields: debt_id, debt_type, created_date, due_date,
        person_name, amount, notes, status, settled_date

Average size per record: ~200 bytes
```

---

## 🎯 Record Capacity Calculation

### **Supabase Free Tier: 500 MB = 524,288,000 bytes**

Let's calculate based on typical usage patterns:

### **Scenario 1: Light Personal Use** 🟢
**Typical Usage:**
- 10 transactions per month
- 5 accounts
- 10 commitments with 12 payment records each per year
- 20 wishlist items
- 10 debt records
- 1 user, 1 session

**Annual Data Growth:**
```
Transactions:    10/month × 12 months × 400 bytes = 48,000 bytes/year
Commitments:     10 × 12 × 50 bytes = 6,000 bytes/year
Accounts:        5 × 150 bytes = 750 bytes (one-time)
Wishlist:        20 × 300 bytes = 6,000 bytes (cumulative)
Debts:           10 × 200 bytes = 2,000 bytes/year
Users/Sessions:  300 + 150 = 450 bytes (one-time)

Total per year: ~63,200 bytes
```

**Years of data: 500MB ÷ 63KB ≈ 8,000+ years** ✅

---

### **Scenario 2: Moderate Use** 🟡
**Typical Usage:**
- 100 transactions per month (3-4 per day)
- 10 accounts
- 15 commitments with payment tracking
- 50 wishlist items
- 50 debt records
- 1 user, 1 session

**Annual Data Growth:**
```
Transactions:    100/month × 12 months × 400 bytes = 480,000 bytes/year
Commitments:     15 × 12 × 50 bytes = 9,000 bytes/year
Accounts:        10 × 150 bytes = 1,500 bytes (one-time)
Wishlist:        50 × 300 bytes = 15,000 bytes (cumulative)
Debts:           50 × 200 bytes = 10,000 bytes/year
Users/Sessions:  300 + 150 = 450 bytes (one-time)

Total per year: ~515,950 bytes ≈ 0.5 MB/year
```

**Years of data: 500MB ÷ 0.5MB ≈ 1,000 years** ✅

---

### **Scenario 3: Heavy Use** 🔴
**Intensive Usage:**
- 500 transactions per month (15-20 per day)
- 20 accounts
- 30 commitments with payment tracking
- 200 wishlist items
- 100 debt records
- 1 user, 1 session

**Annual Data Growth:**
```
Transactions:    500/month × 12 months × 400 bytes = 2,400,000 bytes/year
Commitments:     30 × 12 × 50 bytes = 18,000 bytes/year
Accounts:        20 × 150 bytes = 3,000 bytes (one-time)
Wishlist:        200 × 300 bytes = 60,000 bytes (cumulative)
Debts:           100 × 200 bytes = 20,000 bytes/year
Users/Sessions:  300 + 150 = 450 bytes (one-time)

Total per year: ~2,501,450 bytes ≈ 2.4 MB/year
```

**Years of data: 500MB ÷ 2.4MB ≈ 208 years** ✅

---

## 📈 Maximum Record Capacities

If you ONLY stored one type of record:

| Table | Size per Record | Max Records in 500MB |
|-------|-----------------|---------------------|
| Transactions | 400 bytes | **1,310,720 transactions** |
| Wishlist Items | 300 bytes | **1,747,626 items** |
| Commitments | 250 bytes | **2,097,152 commitments** |
| Debts | 200 bytes | **2,621,440 debts** |
| Accounts | 150 bytes | **3,495,253 accounts** |
| Sessions | 150 bytes | **3,495,253 sessions** |
| Users | 300 bytes | **1,747,626 users** |
| Payment Status | 50 bytes | **10,485,760 records** |

---

## 🎯 Realistic Capacity Estimates

### **Your Most Active Table: Transactions**

Assuming transactions are 80% of your data:

**400MB for transactions:**
```
400 MB ÷ 400 bytes per transaction = 1,048,576 transactions
```

**At different transaction rates:**
- **10 transactions/month:** 8,738 years of data ✅
- **50 transactions/month:** 1,747 years of data ✅
- **100 transactions/month:** 873 years of data ✅
- **500 transactions/month:** 175 years of data ✅
- **1,000 transactions/month:** 87 years of data ✅

---

## 📊 Comprehensive Example: 10 Years of Data

**Assumptions:**
- 200 transactions/month (6-7 per day)
- 10 accounts
- 20 commitments
- 100 wishlist items
- 50 debts

**10-Year Totals:**
```
Transactions:    200 × 12 × 10 = 24,000 records × 400 bytes = 9.6 MB
Commitments:     20 × 12 × 10 = 2,400 records × 50 bytes = 0.12 MB
Accounts:        10 records × 150 bytes = 0.0015 MB
Wishlist:        100 records × 300 bytes = 0.03 MB
Debts:           50 records × 200 bytes = 0.01 MB
Users/Sessions:  2 records × 300 bytes = 0.0006 MB

Total for 10 years: ~9.76 MB (Less than 2% of 500MB!)
```

---

## 🚀 Performance Considerations

### **Database Overhead:**
- SQLite/PostgreSQL adds ~20-30% overhead for:
  - Indexes
  - Metadata
  - B-tree structures
  - Vacuum space

### **Adjusted Realistic Capacity:**
```
500 MB actual storage
× 0.75 (accounting for 25% overhead)
= 375 MB usable for data

Still enough for:
- 937,500 transactions
- OR 156 years at 500 transactions/month
- OR 781 years at 100 transactions/month
```

---

## 📝 Recommendations

### ✅ **You're Safe for Supabase Free Tier!**

**Conclusion:**
- For personal finance tracking, 500MB is **MORE than enough**
- Even with heavy usage (500 transactions/month), you can store **100+ years** of data
- The free tier will likely never be your bottleneck

### 🎯 **When to Worry:**

You'd need to exceed **ALL** of these simultaneously:
- 1,000+ transactions per month
- 500+ wishlist items
- 200+ commitments
- 500+ debt records
- And keep this up for 10+ years

**This is extremely unlikely for personal use!**

---

## 💡 Tips to Optimize Storage

### If you ever get close to limits:

1. **Archive Old Data** (older than 5 years)
   ```sql
   DELETE FROM transaction_list_table
   WHERE transaction_date < date('now', '-5 years');
   ```

2. **Compress Text Fields**
   - Keep descriptions concise
   - Use abbreviations where possible

3. **Clean Up Expired Sessions**
   ```sql
   DELETE FROM sessions WHERE expires_at < datetime('now');
   ```

4. **Remove Completed Items**
   - Delete settled debts
   - Archive purchased wishlist items
   - Remove inactive commitments

---

## 📊 Quick Reference Table

| Usage Level | Transactions/Month | Years of Data in 500MB |
|-------------|-------------------|------------------------|
| Minimal | 10 | 8,000+ years |
| Light | 50 | 1,600+ years |
| Moderate | 100 | 800+ years |
| Active | 200 | 400+ years |
| Heavy | 500 | 160+ years |
| Extreme | 1,000 | 80+ years |

---

## ✨ Final Answer

**For your database schema:**

**You can store:**
- ✅ **Over 1 million transactions**
- ✅ **200+ years of moderate daily use**
- ✅ **80+ years of heavy daily use**

**Verdict:** Supabase's 500MB free tier is **MORE than sufficient** for personal financial tracking! 🎉

You'll run out of patience tracking your finances long before you run out of space! 😄

---

## 🔍 Want to Check Your Current Usage?

Run this in your SQLite database:

```sql
-- Check row counts
SELECT
    (SELECT COUNT(*) FROM transaction_list_table) as transactions,
    (SELECT COUNT(*) FROM commitment_list_table) as commitments,
    (SELECT COUNT(*) FROM wishlist_table) as wishlist_items,
    (SELECT COUNT(*) FROM debts_table) as debts,
    (SELECT COUNT(*) FROM users) as users,
    (SELECT COUNT(*) FROM sessions) as sessions;
```

**Estimate storage:**
```
transactions × 400 bytes
+ commitments × 250 bytes
+ wishlist × 300 bytes
+ debts × 200 bytes
+ users × 300 bytes
+ sessions × 150 bytes
= Your approximate database size
```

---

That's your complete storage capacity analysis! 🎯
