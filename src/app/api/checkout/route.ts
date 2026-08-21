import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const required = ["name", "email", "address", "payment"] as const;
  const missing = required.filter((key) => typeof form.get(key) !== "string" || !(form.get(key) as string).trim());
  if (missing.length > 0) return NextResponse.json({ error: `Complete: ${missing.join(", ")}.` }, { status: 400 });
  const email = String(form.get("email"));
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  return NextResponse.json({ order: { reference: `VD-${Date.now().toString(36).toUpperCase()}` } }, { status: 201 });
}
