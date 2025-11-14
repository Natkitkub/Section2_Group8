import { db } from "../../../lib/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const email = formData.get("Email");
    const username = formData.get("Username");



    // 🔹 ตรวจสอบ username ใน DB
    console.log(username)
    const [rows] = await db.query(
      "SELECT Password FROM User_Account WHERE Username = ?",
      [username]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Username not found" });
    }

    const user = rows[0];

    // 🔹 สร้าง transporter สำหรับส่ง email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // ส่งไปยัง email ที่ผู้ใช้กรอก
      subject: "Your Recovered Password",
      text: `Hello ${username},\n\nYour password is: ${user.Password}\n\n Good luck.`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Password sent to your email." });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error, please try again." });
  }
}
