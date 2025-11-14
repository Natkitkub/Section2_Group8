import mysql from "mysql2/promise";

const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const cors = require('cors')
const port = 5050;
const app = express();
const router = express.Router();

app.use(router);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

var connection = mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
});

app.get("/api/coffee/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await connection.query(
      "SELECT * FROM Product WHERE Product_ID = ?",
      [id]
    );

    if (rows.length === 0) return res.status(404).json({ message: "Product not Found" });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database Error" });
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
