import { NextRequest, NextResponse } from "next/server";

// STUB. Should call backend API to register user.
export async function POST(req: NextRequest) {
  const data = await req.json();
  if (data.email && data.password) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false }, { status: 400 });
}
