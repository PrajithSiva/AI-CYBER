const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection (Neon)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ✅ Root Route (Test)
app.get("/", (req, res) => {
  res.send("AI Corporate Cyber Guardian Backend Running 🚀");
});

// ✅ Analyze Route
app.post("/analyze", async (req, res) => {
  try {
    const {
      email_content,
      risk_score,
      threat_level,
      action_taken,
      explanation,
      sender_ip,
      department,
      submitted_by,
      attachment_url
    } = req.body;

    const result = await pool.query(
      `INSERT INTO incidents
      (email_content, risk_score, threat_level, action_taken, explanation,
       sender_ip, department, submitted_by, attachment_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        email_content,
        risk_score,
        threat_level,
        action_taken,
        explanation,
        sender_ip,
        department,
        submitted_by,
        attachment_url
      ]
    );

    res.status(201).json({
      message: "Incident saved successfully ✅",
      data: result.rows[0],
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Server Error ❌",
      error: error.message,
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});