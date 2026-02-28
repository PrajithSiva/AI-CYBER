// ==========================================
// AI Corporate Cyber Guardian - Backend
// ==========================================

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

// ==========================================
// Middleware
// ==========================================
app.use(cors());
app.use(express.json());

// ==========================================
// PostgreSQL Connection
// ==========================================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ==========================================
// Root Route
// ==========================================
app.get("/", (req, res) => {
  res.send("🚀 AI Corporate Cyber Guardian Backend Running");
});

// ==========================================
// Analyze Email Route
// ==========================================
app.post("/analyze", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const email = req.body.email_content;

    if (!email || email.trim() === "") {
      return res.status(400).json({
        message: "Email content is required",
      });
    }

    // 🔥 Call Python AI Engine
    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/analyze",
      { email_content: email },
      { timeout: 5000 }
    );

    const {
      risk_score,
      threat_level,
      action_taken,
      explanation,
    } = aiResponse.data;

    // 🔥 Save to DB
    await pool.query(
      `INSERT INTO incidents 
       (email_content, risk_score, threat_level, action_taken, explanation)
       VALUES ($1,$2,$3,$4,$5)`,
      [email, risk_score, threat_level, action_taken, explanation]
    );

    res.status(200).json({
      risk_score,
      threat_level,
      action_taken,
      explanation,
    });

  } catch (error) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      message: "AI Engine or Database Error",
      error: error.message,
    });
  }
});

// ==========================================
// Fetch Incidents
// ==========================================
app.get("/incidents", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM incidents ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({
      message: "Error fetching incidents",
    });
  }
});

// ==========================================
// Start Server
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});