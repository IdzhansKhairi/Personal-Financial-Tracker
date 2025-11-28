# Remaining API Route Updates for Supabase Migration

I've successfully created all the database adapters for Commitments, Wishlist, and Debts in **lib/db-adapter.ts**.

The following API routes still need to be updated manually to use the adapters. I'll provide you with the exact changes needed for each file.

---

## 1. Commitment Payments API

**File**: `app/api/commitment-payments/route.ts`

**Current imports** (replace):
```typescript
import { openDB } from "@/lib/db";
```

**New imports**:
```typescript
import { CommitmentPaymentsAdapter } from "@/lib/db-adapter";
```

**GET method** - Replace the database code with:
```typescript
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const month = searchParams.get('month');
        const year = searchParams.get('year');
        const commitment_id = searchParams.get('commitment_id');

        const filters: any = {};
        if (month) filters.month = parseInt(month);
        if (year) filters.year = parseInt(year);
        if (commitment_id) filters.commitment_id = parseInt(commitment_id);

        // Use CommitmentPaymentsAdapter to support dual database strategy
        const payments = await CommitmentPaymentsAdapter.getAll(filters);

        return NextResponse.json(payments);
    } catch (error) {
        console.error('Failed to fetch commitment payments:', error);
        return NextResponse.json({ error: 'Failed to fetch commitment payments' }, { status: 500 });
    }
}
```

**POST method** - Replace with:
```typescript
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { commitment_id, payment_month, payment_year, payment_status } = body;

        // Use CommitmentPaymentsAdapter to support dual database strategy
        await CommitmentPaymentsAdapter.upsert({
            commitment_id,
            payment_month,
            payment_year,
            payment_status: payment_status ? 1 : 0
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update commitment payment:', error);
        return NextResponse.json({ error: 'Failed to update commitment payment' }, { status: 500 });
    }
}
```

---

## 2. Wishlist API

**File**: `app/api/wishlist/route.ts`

**Current imports** (replace):
```typescript
import { openDB } from "@/lib/db";
```

**New imports**:
```typescript
import { WishlistAdapter } from "@/lib/db-adapter";
```

**GET method** - Replace with:
```typescript
export async function GET() {
    try {
        // Use WishlistAdapter to support dual database strategy
        const wishlist = await WishlistAdapter.getAll();
        return NextResponse.json(wishlist);
    } catch (error) {
        console.error('Failed to fetch wishlist:', error);
        return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
    }
}
```

**POST method** - Replace with:
```typescript
export async function POST(request: Request) {
    try {
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

        // Round prices to 2 decimal places
        const roundedEstimate = wishlist_estimate_price ? parseFloat(Number(wishlist_estimate_price).toFixed(2)) : null;
        const roundedFinal = wishlist_final_price ? parseFloat(Number(wishlist_final_price).toFixed(2)) : null;

        // Use WishlistAdapter to support dual database strategy
        const newItem = await WishlistAdapter.create({
            wishlist_name,
            wishlist_category,
            wishlist_estimate_price: roundedEstimate,
            wishlist_final_price: roundedFinal,
            wishlist_purchase_date: wishlist_purchase_date || null,
            wishlist_url_link: wishlist_url_link || null,
            wishlist_url_picture: wishlist_url_picture || null,
            wishlist_status: wishlist_status || 'not_purchased'
        });

        return NextResponse.json({ success: true, wishlist_id: newItem.wishlist_id });
    } catch (error) {
        console.error('Failed to create wishlist item:', error);
        return NextResponse.json({ error: 'Failed to create wishlist item' }, { status: 500 });
    }
}
```

**PUT method** - Replace with:
```typescript
export async function PUT(request: Request) {
    try {
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

        // Round prices to 2 decimal places
        const roundedEstimate = wishlist_estimate_price ? parseFloat(Number(wishlist_estimate_price).toFixed(2)) : null;
        const roundedFinal = wishlist_final_price ? parseFloat(Number(wishlist_final_price).toFixed(2)) : null;

        // Use WishlistAdapter to support dual database strategy
        await WishlistAdapter.update(wishlist_id, {
            wishlist_name,
            wishlist_category,
            wishlist_estimate_price: roundedEstimate,
            wishlist_final_price: roundedFinal,
            wishlist_purchase_date: wishlist_purchase_date || null,
            wishlist_url_link: wishlist_url_link || null,
            wishlist_url_picture: wishlist_url_picture || null,
            wishlist_status
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update wishlist item:', error);
        return NextResponse.json({ error: 'Failed to update wishlist item' }, { status: 500 });
    }
}
```

**DELETE method** - Replace with:
```typescript
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const wishlist_id = searchParams.get('id');

        if (!wishlist_id) {
            return NextResponse.json({ error: 'Wishlist ID required' }, { status: 400 });
        }

        // Use WishlistAdapter to support dual database strategy
        await WishlistAdapter.delete(parseInt(wishlist_id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete wishlist item:', error);
        return NextResponse.json({ error: 'Failed to delete wishlist item' }, { status: 500 });
    }
}
```

---

## 3. Debts API

**File**: `app/api/debts/route.ts`

**Current imports** (replace):
```typescript
import { openDB } from "@/lib/db";
```

**New imports**:
```typescript
import { DebtsAdapter } from "@/lib/db-adapter";
```

**GET method** - Replace with:
```typescript
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const type = searchParams.get('type');

        const filters: any = {};
        if (status) filters.status = status;
        if (type) filters.type = type;

        // Use DebtsAdapter to support dual database strategy
        const debts = await DebtsAdapter.getAll(filters);

        return NextResponse.json(debts);
    } catch (error) {
        console.error('Failed to fetch debts:', error);
        return NextResponse.json({ error: 'Failed to fetch debts' }, { status: 500 });
    }
}
```

**POST method** - Replace with:
```typescript
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            debt_type,
            created_date,
            due_date,
            person_name,
            amount,
            notes,
            status,
            settled_date
        } = body;

        // Round amount to 2 decimal places
        const roundedAmount = parseFloat(Number(amount).toFixed(2));

        // Use DebtsAdapter to support dual database strategy
        const newDebt = await DebtsAdapter.create({
            debt_type,
            created_date,
            due_date: due_date || null,
            person_name,
            amount: roundedAmount,
            notes: notes || null,
            status: status || 'pending',
            settled_date: settled_date || null
        });

        return NextResponse.json({ success: true, debt_id: newDebt.debt_id });
    } catch (error) {
        console.error('Failed to create debt:', error);
        return NextResponse.json({ error: 'Failed to create debt' }, { status: 500 });
    }
}
```

**PUT method** - Replace with:
```typescript
export async function PUT(request: Request) {
    try {
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

        // Round amount to 2 decimal places
        const roundedAmount = parseFloat(Number(amount).toFixed(2));

        // Use DebtsAdapter to support dual database strategy
        await DebtsAdapter.update(debt_id, {
            debt_type,
            created_date,
            due_date: due_date || null,
            person_name,
            amount: roundedAmount,
            notes: notes || null,
            status,
            settled_date: settled_date || null
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update debt:', error);
        return NextResponse.json({ error: 'Failed to update debt' }, { status: 500 });
    }
}
```

**DELETE method** - Replace with:
```typescript
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const debt_id = searchParams.get('id');

        if (!debt_id) {
            return NextResponse.json({ error: 'Debt ID required' }, { status: 400 });
        }

        // Use DebtsAdapter to support dual database strategy
        await DebtsAdapter.delete(parseInt(debt_id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete debt:', error);
        return NextResponse.json({ error: 'Failed to delete debt' }, { status: 500 });
    }
}
```

---

## Summary

Once you apply these changes to the 3 remaining API routes, you'll be able to toggle these modules between SQLite and Supabase using the environment variables:

```env
USE_SUPABASE_COMMITMENTS=true
USE_SUPABASE_WISHLIST=true
USE_SUPABASE_DEBTS=true
```

All adapters are already created in `lib/db-adapter.ts` and ready to use!

## Auth Migration (Deferred)

The Auth module (users/sessions) is more complex and should be migrated last, after all other modules are working correctly with Supabase. This ensures your authentication continues to work while you test the data modules.
