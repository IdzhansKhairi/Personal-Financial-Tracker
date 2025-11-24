// lib/initDb.ts
import { openDB } from "./db";

export async function initializeDatabase() {
  const db = await openDB();

  // Create transaction_list_table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS transaction_list_table (
      transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
      transaction_date DATE NOT NULL,
      transaction_time TIME NOT NULL,
      transaction_description TEXT NOT NULL,
      transaction_amount REAL NOT NULL,
      transaction_category TEXT NOT NULL,
      transaction_sub_category TEXT NOT NULL,
      transaction_card_choice TEXT,
      transaction_income_source TEXT,
      transaction_expense_usage TEXT,
      transaction_expense_usage_category TEXT,
      transaction_hobby_category TEXT
    )
  `);
  console.log("Database initialized: transaction_list_table created");

  // Create account_balance_table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS account_balance_table (
      account_id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_category TEXT NOT NULL,
      account_sub_category TEXT NOT NULL,
      account_card_type TEXT,
      current_balance REAL NOT NULL DEFAULT 0
    )
  `);
  console.log("Database initialized: account_balance_table created");

  return db;
}
