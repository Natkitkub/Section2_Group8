import { db } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const Username = formData.get("Username");
    const Password = formData.get("Password");
    const remember = formData.get("remember") === "true";
    console.log("Username:", Username, "password:", Password);

    if (!Username || !Password) {
      return new Response(JSON.stringify({ found: false, message: "Missing Username or Password" }), { status: 400 });
    }

    const [rows] = await db.query(
      "SELECT * FROM User_Account WHERE Username = ? AND Password = ?",
      [Username, Password]
    );
    console.log("Username:", Username, "Password:", Password);
    if (rows.length > 0 ) {
        const res = NextResponse.json({
            found: rows[0].Username, // เช่น "Admin"
          });
          
        res.cookies.set("session", Username, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge:60*6, // 10 นาที
      });

      
    
    return res;

      } else {
        return NextResponse.json({ found: false });
      }
      
  } catch (err) {
    console.error("Database Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
