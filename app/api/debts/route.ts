import { NextResponse } from "next/server";
import { openDB } from "@/lib/db";

// GET - Fetch all debts or filter by status and type
export async function GET(request: Request) {
    try {
        const db = await openDB();
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const debt_type = searchParams.get('type');

        let query = 'SELECT * FROM debts_table WHERE 1=1';
        const params: any[] = [];

        if (status) {
            query += ' AND status = ?';
            params.push(status);
        }

        if (debt_type) {
            query += ' AND debt_type = ?';
            params.push(debt_type);
        }

        query += ' ORDER BY created_date DESC';

        const debts = await db.all(query, params);

        return NextResponse.json(debts);
    } catch (error) {
        console.error('Failed to fetch debts:', error);
        return NextResponse.json({ error: 'Failed to fetch debts' }, { status: 500 });
    }
}

// POST - Create a new debt
export async function POST(request: Request) {
    try {
        const db = await openDB();
        const body = await request.json();

        const {
            debt_type,
            created_date,
            due_date,
            person_name,
            amount,
            notes,
            status
        } = body;

        // Ensure the amount is always stored with 2 decimal places
        const roundedAmount = parseFloat(Number(amount).toFixed(2));

        const result = await db.run(
            `INSERT INTO debts_table (
                debt_type,
                created_date,
                due_date,
                person_name,
                amount,
                notes,
                status
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                debt_type,
                created_date,
                due_date || null,
                person_name,
                roundedAmount,
                notes || null,
                status || 'pending'
            ]
        );

        return NextResponse.json({
            success: true,
            debt_id: result.lastID
        });
    } catch (error) {
        console.error('Failed to create debt:', error);
        return NextResponse.json({ error: 'Failed to create debt' }, { status: 500 });
    }
}

// PUT - Update an existing debt
export async function PUT(request: Request) {
    try {
        const db = await openDB();
        const body = await request.json();

        const {
            debt_id,
            debt_type,
            created_date,
            due_date,
            person_name,
            amount,
            notes,
            status,
            settled_date
        } = body;

        // Ensure the amount is always stored with 2 decimal places
        const roundedAmount = parseFloat(Number(amount).toFixed(2));

        await db.run(
            `UPDATE debts_table SET
                debt_type = ?,
                created_date = ?,
                due_date = ?,
                person_name = ?,
                amount = ?,
                notes = ?,
                status = ?,
                settled_date = ?
            WHERE debt_id = ?`,
            [
                debt_type,
                created_date,
                due_date || null,
                person_name,
                roundedAmount,
                notes || null,
                status,
                settled_date || null,
                debt_id
            ]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update debt:', error);
        return NextResponse.json({ error: 'Failed to update debt' }, { status: 500 });
    }
}

// DELETE - Delete a debt
export async function DELETE(request: Request) {
    try {
        const db = await openDB();
        const { searchParams } = new URL(request.url);
        const debt_id = searchParams.get('id');

        if (!debt_id) {
            return NextResponse.json({ error: 'Debt ID required' }, { status: 400 });
        }

        await db.run('DELETE FROM debts_table WHERE debt_id = ?', [debt_id]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete debt:', error);
        return NextResponse.json({ error: 'Failed to delete debt' }, { status: 500 });
    }
}
