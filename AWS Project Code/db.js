const mysql = require("mysql2");
const db = mysql.createConnection({
 host: "database-1.cgvo084cmoao.us-east-1.rds.amazonaws.com",
 user: "admin",
 password: "password123",
 database: "spareparts"
});
db.connect(err => {
 if (err) {
 console.error("DB Connection Failed:", err);
 } else {
 console.log("Connected to MySQL RDS");
 }
});
