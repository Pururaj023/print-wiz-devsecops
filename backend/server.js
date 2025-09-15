import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME 
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

// Create new order
app.post("/api/orders", (req, res) => {
  const {
    orderId,
    email,
    firstName,
    lastName,
    address,
    city,
    zip,
    fileName,
    price,
    orderDate,
    deliveryDate,
    status,
  } = req.body;

  const sql = `
    INSERT INTO orders 
    (order_id, email, first_name, last_name, address, city, zip, file_name, price, order_date, delivery_date,status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [orderId, email, firstName, lastName, address, city, zip, fileName, price, orderDate, deliveryDate, status],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting order:", err);
        return res.status(500).json({ error: "Database insert failed" });
      }
      res.json({ message: "Order created successfully", id: result.insertId });
    }
  );
});

// Get all orders (optional for Cart page)
app.get("/api/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) {
      console.error("❌ Error fetching orders:", err);
      return res.status(500).json({ error: "Database fetch failed" });
    }
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
