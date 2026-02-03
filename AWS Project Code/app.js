const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
// MySQL RDS connection
const db = mysql.createConnection({
 host: "database-1.cgvo084cmoao.us-east-1.rds.amazonaws.com",
 user: "admin",
 password: "password123",
 database: "spareparts"
});
// Connect to DB
db.connect(err => {
 if (err) {
 console.error("DB connection failed:", err);
 } else {
 console.log("Connected to MySQL RDS");
 }
});
app.post("/api/parts", (req, res) => {
 const { name, number, price, quantity } = req.body;
 if (!name || !number || !price || !quantity) {
 return res.status(400).json({ message: "All fields are required" });
 }
 const sql =
 "INSERT INTO parts (name, part_number, price, quantity) VALUES (?, ?, ?, 
?)";
 db.query(sql, [name, number, price, quantity], (err, result) => {
 if (err) {
 console.error("Insert error:", err);
 return res.status(500).json({ message: "DB error" });
 }
 res.json({ message: "Saved" });
 });
});
app.get("/api/parts", (req, res) => {
 db.query("SELECT * FROM parts", (err, rows) => {
 if (err) {
 console.error("Fetch error:", err);
 return res.status(500).json({ message: "DB error" });
 }
 res.json(rows);
 });
});
// Start server
app.listen(3000, () => {
 console.log("Backend running on port 3000");
});
