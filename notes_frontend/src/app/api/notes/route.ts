import { NextRequest, NextResponse } from "next/server";

// STUB: For demo, returns static data. Replace with backend fetch in integration.
const fakeNotes = [
  { id: 1, title: "Welcome!", content: "This is your first note." },
  { id: 2, title: "Demo Note", content: "Click edit or delete to update notes." }
];

export async function GET() {
  return NextResponse.json(fakeNotes);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  // Simulate created note
  return NextResponse.json({ ...data, id: Date.now() });
}
