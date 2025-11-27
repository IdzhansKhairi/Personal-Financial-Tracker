// app/api/transactions/route.ts
import { openDB } from "@/lib/db";
import { getExpenseUsageCategory } from "@/lib/displayMappings";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch all transactions
export async function GET() {
  try {
    const db = await openDB();
    const transactions = await db.all(
      "SELECT * FROM transaction_list_table ORDER BY transaction_date DESC, transaction_time DESC"
    );
    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

// POST - Create a new transaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      transaction_date,
      transaction_time,
      transaction_description,
      transaction_amount,
      transaction_category,
      transaction_sub_category,
      transaction_card_choice,
      transaction_income_source,
      transaction_expense_usage,
      transaction_hobby_category,
    } = body;

    // Automatically determine expense usage category from expense usage
    const transaction_expense_usage_category = getExpenseUsageCategory(transaction_expense_usage);

    // Ensure the transaction amount is always stored with 2 decimal places
    const roundedAmount = parseFloat(Number(transaction_amount).toFixed(2));

    const db = await openDB();
    const result = await db.run(
      `INSERT INTO transaction_list_table (
        transaction_date,
        transaction_time,
        transaction_description,
        transaction_amount,
        transaction_category,
        transaction_sub_category,
        transaction_card_choice,
        transaction_income_source,
        transaction_expense_usage,
        transaction_expense_usage_category,
        transaction_hobby_category
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        transaction_date,
        transaction_time,
        transaction_description,
        roundedAmount,
        transaction_category,
        transaction_sub_category,
        transaction_card_choice || null,
        transaction_income_source || null,
        transaction_expense_usage || null,
        transaction_expense_usage_category || null,
        transaction_hobby_category || null,
      ]
    );

    return NextResponse.json(
      { message: "Transaction created", id: result.lastID },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create transaction:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
