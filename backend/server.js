import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";



const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 5050;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ⭐ สำคัญมาก — เปิด static ให้รูปขึ้นได้
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==========================
// DB Connection
// ==========================
let connection;
try {
  connection = await mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME || "coffee",
  });

  await connection.query("SELECT 1");
  console.log("✅ Database connected successfully");
} catch (err) {
  console.error("❌ Database connection failed:", err.message);
}

// ==========================
// Health Check
// ==========================
app.get("/health", async (req, res) => {
  try {
    await connection.query("SELECT 1");
    res.json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ==========================
// Login API (เหมือนเดิม)
// ==========================
app.post("/api/login", async (req, res) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    return res.status(400).json({ found: false, message: "Missing Username or Password" });
  }

  try {
    const [rows] = await connection.query(
      "SELECT Username FROM User_Account WHERE Username = ? AND Password = ? LIMIT 1",
      [Username, Password]
    );

    if (rows.length > 0) {
      res.cookie("session", rows[0].Username, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60,
      });
      return res.json({ found: rows[0].Username });
    }

    res.json({ found: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ==========================
// Check Session (เหมือนเดิม)
// ==========================
app.get("/api/check-session", (req, res) => {
  const session = req.cookies?.session;
  if (session) res.json({ loggedIn: true, user: session });
  else res.json({ loggedIn: false });
});

// ==========================
// GET ALL PRODUCTS (แก้เรียง ID + ใช้ Price_per_kg)
// ==========================
app.get("/api/coffee", async (req, res) => {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM Product ORDER BY CAST(Product_ID AS UNSIGNED) ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ message: "Database Error" });
  }
});

// ==========================
// GET PRODUCT BY ID (เหมือนเดิม)
// ==========================
app.get("/api/coffee/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await connection.query(
      "SELECT * FROM Product WHERE Product_ID = ?",
      [id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Product not Found" });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database Error" });
  }
});

// ==========================
// SEARCH PRODUCT (แก้ name/source/roast + minPrice + order)
app.get("/product/search", async (req, res) => {
  const { id, name, minPrice } = req.query;

  let sql = "SELECT * FROM Product WHERE 1=1";
  const params = [];

  // 🔍 Search by ID (fix → compare numeric)
  if (id) {
    sql += " AND CAST(Product_ID AS UNSIGNED) = CAST(? AS UNSIGNED)";
    params.push(id);
  }

  // 🔍 Search by Name
  if (name) {
    sql += " AND Product_Name LIKE ?";
    params.push(`%${name}%`);
  }

  // 🔍 Price >=
  if (minPrice) {
    sql += " AND Price_per_kg = ?";
    params.push(Number(minPrice));
  }
  


  sql += " ORDER BY CAST(Product_ID AS UNSIGNED) ASC";

  try {
    const [rows] = await connection.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("❌ Search error:", err);
    res.status(500).json({ message: "Search error" });
  }
});


// Coffee Quote API (Server-side Proxy สำหรับ Zen Quotes)
app.get("/api/coffee-quote", async (req, res) => {
  const coffeeList = [
    { name: "Americano", image: "/images/coffeemenu/americano.png" },
    { name: "Cappuccino", image: "/images/HomePage/icaramelmac.png" },
    { name: "Matcha Latte", image: "/images/HomePage/mtchlatte.png" },
  ];

  let quote = "Coffee is always a good idea.";
  let author = "Anonymous";

  try {
    const response = await fetch("https://zenquotes.io/api/random");

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data[0]) {
        quote = data[0].q;
        author = data[0].a;
      }
    }
  } catch (err) {
    console.error("ZenQuotes Error:", err.message);
  }

  const coffee = coffeeList[Math.floor(Math.random() * coffeeList.length)];

  return res.json({
    quote,
    author,
    coffeeName: coffee.name,
    coffeeImage: coffee.image,
  });
});









// ==========================
// START SERVER
// ==========================
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
