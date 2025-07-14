import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const url = req.nextUrl;
  const id = url.pathname.split("/").pop();
  const data = await req.json();
  return NextResponse.json({ ...data, id });
}

export async function DELETE() {
  // Simulate deletion
  return NextResponse.json({ ok: true });
}
