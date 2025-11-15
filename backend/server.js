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

// static
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
// Login API
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
// Check Session
// ==========================
app.get("/api/check-session", (req, res) => {
  const session = req.cookies?.session;
  if (session) res.json({ loggedIn: true, user: session });
  else res.json({ loggedIn: false });
});

// ==========================
// GET ALL PRODUCTS
// ==========================
app.get("/api/coffee", async (req, res) => {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM Product ORDER BY CAST(Product_ID AS UNSIGNED)"
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ message: "Database Error" });
  }
});

// ==========================
// GET PRODUCT BY ID
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

// ========================================
// 🔍 SEARCH PRODUCT (แก้แบบซัพพอร์ตทุกเคสจริง)
// ========================================

function normalizeSize(size) {
  return size.replace(/\s+/g, "").toLowerCase();  // "250 g" => "250g"
}

function normalizeSource(source) {
  return source.trim().toLowerCase();
}

app.get("/product/search", async (req, res) => {
  const { name, source, roast, size } = req.query;

  let sql = "SELECT * FROM Product WHERE 1=1";
  const params = [];

  // NAME
  if (name && name.trim() !== "") {
    sql += " AND Product_Name LIKE ?";
    params.push(`%${name}%`);
  }

  // SOURCE (รองรับหลายประเทศในช่องเดียว เช่น "Brazil, Japan")
  if (source && source.trim() !== "") {
    sql += " AND LOWER(Product_Source) LIKE ?";
    params.push(`%${normalizeSource(source)}%`);
  }

  // ROAST
  if (roast && roast !== "all") {
    sql += " AND Roast_Level = ?";
    params.push(roast);
  }

  // SIZE
  if (size) {
    const sizeList = size.split(",").map((s) => normalizeSize(s));

    const placeholders = sizeList.map(() => "?").join(",");

    sql += ` AND REPLACE(LOWER(Size), ' ', '') IN (${placeholders})`;
    params.push(...sizeList);
  }

  sql += " ORDER BY CAST(Product_ID AS UNSIGNED)";

  try {
    const [rows] = await connection.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("❌ Search Error:", err);
    res.status(500).json({ message: "Search Error" });
  }
});

// ==========================
// START SERVER
// ==========================
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
