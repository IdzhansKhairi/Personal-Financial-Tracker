import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { openDB } from "@/lib/db";

// Update user profile
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username, firstName, lastName, email, phoneNumber } = await request.json();

    // Validate required fields
    if (!username || !firstName || !lastName || !email || !phoneNumber) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const db = await openDB();

    // Check if username is already taken by another user
    const existingUsername = await db.get(
      `SELECT id FROM users WHERE username = ? AND id != ?`,
      [username, user.id]
    );

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 400 }
      );
    }

    // Check if email is already taken by another user
    const existingEmail = await db.get(
      `SELECT id FROM users WHERE email = ? AND id != ?`,
      [email, user.id]
    );

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email is already in use by another account" },
        { status: 400 }
      );
    }

    // Update user profile
    await db.run(
      `UPDATE users
       SET username = ?, first_name = ?, last_name = ?, email = ?, phone_number = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [username, firstName, lastName, email, phoneNumber, user.id]
    );

    await db.close();

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user.id,
        username,
        firstName,
        lastName,
        email,
        phoneNumber,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
