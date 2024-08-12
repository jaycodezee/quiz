import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "../../lib/db";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (password.length < 4) {
    return NextResponse.json({ error: "Password must be at least 4 characters" }, { status: 400 });
  }

  // Updated email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailRegex.test(email);

  if (!isValidEmail) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const emailParts = email.split('@');
  if (emailParts[1] === 'gmail.com' && /[+]/.test(emailParts[0])) {
    return NextResponse.json({ error: "Invalid email address format" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword]
    );
    return NextResponse.json({ user: result.rows[0] }, { status: 200 });

  } catch (error: any) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    } else {
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}
