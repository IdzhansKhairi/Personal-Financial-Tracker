// app/api/accounts/route.ts
import { openDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch all account balances
export async function GET() {
  try {
    const db = await openDB();
    const accounts = await db.all(
      "SELECT * FROM account_balance_table ORDER BY account_category, account_sub_category, account_card_type"
    );
    return NextResponse.json(accounts);
  } catch (error) {
    console.error("Failed to fetch accounts:", error);
    return NextResponse.json(
      { error: "Failed to fetch accounts" },
      { status: 500 }
    );
  }
}

// PUT - Update an account balance
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { account_id, current_balance } = body;

    if (!account_id || current_balance === undefined) {
      return NextResponse.json(
        { error: "account_id and current_balance are required" },
        { status: 400 }
      );
    }

    const db = await openDB();
    await db.run(
      "UPDATE account_balance_table SET current_balance = ? WHERE account_id = ?",
      [current_balance, account_id]
    );

    return NextResponse.json({ message: "Account balance updated" });
  } catch (error) {
    console.error("Failed to update account:", error);
    return NextResponse.json(
      { error: "Failed to update account" },
      { status: 500 }
    );
  }
}
