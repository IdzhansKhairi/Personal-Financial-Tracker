import { NextResponse } from "next/server";
import { openDB } from "@/lib/db";

// GET - Fetch all wishlist items or filter by status
export async function GET(request: Request) {
    try {
        const db = await openDB();
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        let wishlistItems;
        if (status) {
            wishlistItems = await db.all(
                'SELECT * FROM wishlist_table WHERE wishlist_status = ? ORDER BY wishlist_id DESC',
                [status]
            );
        } else {
            wishlistItems = await db.all('SELECT * FROM wishlist_table ORDER BY wishlist_id DESC');
        }

        return NextResponse.json(wishlistItems);
    } catch (error) {
        console.error('Failed to fetch wishlist:', error);
        return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
    }
}

// POST - Create a new wishlist item
export async function POST(request: Request) {
    try {
        const db = await openDB();
        const body = await request.json();

        const {
            wishlist_name,
            wishlist_category,
            wishlist_estimate_price,
            wishlist_final_price,
            wishlist_purchase_date,
            wishlist_url_link,
            wishlist_url_picture,
            wishlist_status
        } = body;

        // Ensure the prices are always stored with 2 decimal places
        const roundedEstimatePrice = wishlist_estimate_price
            ? parseFloat(Number(wishlist_estimate_price).toFixed(2))
            : null;
        const roundedFinalPrice = wishlist_final_price
            ? parseFloat(Number(wishlist_final_price).toFixed(2))
            : null;

        const result = await db.run(
            `INSERT INTO wishlist_table (
                wishlist_name,
                wishlist_category,
                wishlist_estimate_price,
                wishlist_final_price,
                wishlist_purchase_date,
                wishlist_url_link,
                wishlist_url_picture,
                wishlist_status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                wishlist_name,
                wishlist_category,
                roundedEstimatePrice,
                roundedFinalPrice,
                wishlist_purchase_date || null,
                wishlist_url_link || null,
                wishlist_url_picture || null,
                wishlist_status || 'not_purchased'
            ]
        );

        return NextResponse.json({
            success: true,
            wishlist_id: result.lastID
        });
    } catch (error) {
        console.error('Failed to create wishlist item:', error);
        return NextResponse.json({ error: 'Failed to create wishlist item' }, { status: 500 });
    }
}

// PUT - Update an existing wishlist item
export async function PUT(request: Request) {
    try {
        const db = await openDB();
        const body = await request.json();

        const {
            wishlist_id,
            wishlist_name,
            wishlist_category,
            wishlist_estimate_price,
            wishlist_final_price,
            wishlist_purchase_date,
            wishlist_url_link,
            wishlist_url_picture,
            wishlist_status
        } = body;

        // Ensure the prices are always stored with 2 decimal places
        const roundedEstimatePrice = wishlist_estimate_price
            ? parseFloat(Number(wishlist_estimate_price).toFixed(2))
            : null;
        const roundedFinalPrice = wishlist_final_price
            ? parseFloat(Number(wishlist_final_price).toFixed(2))
            : null;

        await db.run(
            `UPDATE wishlist_table SET
                wishlist_name = ?,
                wishlist_category = ?,
                wishlist_estimate_price = ?,
                wishlist_final_price = ?,
                wishlist_purchase_date = ?,
                wishlist_url_link = ?,
                wishlist_url_picture = ?,
                wishlist_status = ?
            WHERE wishlist_id = ?`,
            [
                wishlist_name,
                wishlist_category,
                roundedEstimatePrice,
                roundedFinalPrice,
                wishlist_purchase_date || null,
                wishlist_url_link || null,
                wishlist_url_picture || null,
                wishlist_status,
                wishlist_id
            ]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update wishlist item:', error);
        return NextResponse.json({ error: 'Failed to update wishlist item' }, { status: 500 });
    }
}

// DELETE - Delete a wishlist item
export async function DELETE(request: Request) {
    try {
        const db = await openDB();
        const { searchParams } = new URL(request.url);
        const wishlist_id = searchParams.get('id');

        if (!wishlist_id) {
            return NextResponse.json({ error: 'Wishlist ID required' }, { status: 400 });
        }

        await db.run('DELETE FROM wishlist_table WHERE wishlist_id = ?', [wishlist_id]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete wishlist item:', error);
        return NextResponse.json({ error: 'Failed to delete wishlist item' }, { status: 500 });
    }
}
