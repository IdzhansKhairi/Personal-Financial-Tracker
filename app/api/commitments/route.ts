import { NextResponse } from "next/server";
import { openDB } from "@/lib/db";

// GET - Fetch all commitments or filter by status
export async function GET(request: Request) {
    try {
        const db = await openDB();
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        let commitments;
        if (status) {
            commitments = await db.all(
                'SELECT * FROM commitment_list_table WHERE commitment_status = ? ORDER BY commitment_name',
                [status]
            );
        } else {
            commitments = await db.all('SELECT * FROM commitment_list_table ORDER BY commitment_name');
        }

        return NextResponse.json(commitments);
    } catch (error) {
        console.error('Failed to fetch commitments:', error);
        return NextResponse.json({ error: 'Failed to fetch commitments' }, { status: 500 });
    }
}

// POST - Create a new commitment
export async function POST(request: Request) {
    try {
        const db = await openDB();
        const body = await request.json();

        const {
            commitment_name,
            commitment_description,
            commitment_per_month,
            commitment_per_year,
            commitment_notes,
            commitment_status,
            commitment_start_month,
            commitment_start_year
        } = body;

        // Ensure the amounts are always stored with 2 decimal places
        const roundedPerMonth = parseFloat(Number(commitment_per_month).toFixed(2));
        const roundedPerYear = parseFloat(Number(commitment_per_year).toFixed(2));

        const result = await db.run(
            `INSERT INTO commitment_list_table (
                commitment_name,
                commitment_description,
                commitment_per_month,
                commitment_per_year,
                commitment_notes,
                commitment_status,
                commitment_start_month,
                commitment_start_year
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                commitment_name,
                commitment_description || null,
                roundedPerMonth,
                roundedPerYear,
                commitment_notes || null,
                commitment_status || 'Active',
                commitment_start_month || null,
                commitment_start_year || null
            ]
        );

        return NextResponse.json({
            success: true,
            commitment_id: result.lastID
        });
    } catch (error) {
        console.error('Failed to create commitment:', error);
        return NextResponse.json({ error: 'Failed to create commitment' }, { status: 500 });
    }
}

// PUT - Update an existing commitment
export async function PUT(request: Request) {
    try {
        const db = await openDB();
        const body = await request.json();

        const {
            commitment_id,
            commitment_name,
            commitment_description,
            commitment_per_month,
            commitment_per_year,
            commitment_notes,
            commitment_status,
            commitment_start_month,
            commitment_start_year
        } = body;

        // Ensure the amounts are always stored with 2 decimal places
        const roundedPerMonth = parseFloat(Number(commitment_per_month).toFixed(2));
        const roundedPerYear = parseFloat(Number(commitment_per_year).toFixed(2));

        await db.run(
            `UPDATE commitment_list_table SET
                commitment_name = ?,
                commitment_description = ?,
                commitment_per_month = ?,
                commitment_per_year = ?,
                commitment_notes = ?,
                commitment_status = ?,
                commitment_start_month = ?,
                commitment_start_year = ?
            WHERE commitment_id = ?`,
            [
                commitment_name,
                commitment_description || null,
                roundedPerMonth,
                roundedPerYear,
                commitment_notes || null,
                commitment_status,
                commitment_start_month || null,
                commitment_start_year || null,
                commitment_id
            ]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update commitment:', error);
        return NextResponse.json({ error: 'Failed to update commitment' }, { status: 500 });
    }
}

// DELETE - Delete a commitment
export async function DELETE(request: Request) {
    try {
        const db = await openDB();
        const { searchParams } = new URL(request.url);
        const commitment_id = searchParams.get('id');

        if (!commitment_id) {
            return NextResponse.json({ error: 'Commitment ID required' }, { status: 400 });
        }

        await db.run('DELETE FROM commitment_list_table WHERE commitment_id = ?', [commitment_id]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete commitment:', error);
        return NextResponse.json({ error: 'Failed to delete commitment' }, { status: 500 });
    }
}
