import { NextResponse } from "next/server";

export async function GET(req) {
  const session = req.cookies.get("session")?.value;
  return NextResponse.json({ session: !!session });
}
