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
// PostgreSQL (Neon) Connection
// ==========================================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ==========================================
// Root Route
// ==========================================
app.get("/", (req, res) => {
  res.send("🚀 AI Corporate Cyber Guardian Backend Running");
});

// ==========================================
// Analyze Email Route (CONNECTED TO PYTHON AI)
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

    // ==========================================
    // 🔥 CALL PYTHON AI ENGINE
    // ==========================================
    const aiResponse = await axios.post(
      "http://localhost:8000/analyze",
      {
        email_content: email,
      }
    );

    const {
      risk_score,
      threat_level,
      action_taken,
      explanation,
    } = aiResponse.data;

    // ==========================================
    // 🔥 SAVE RESULT TO DATABASE
    // ==========================================
    await pool.query(
      `INSERT INTO incidents 
       (email_content, risk_score, threat_level, action_taken, explanation, sender_ip, department, submitted_by, attachment_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        email,
        risk_score,
        threat_level,
        action_taken,
        explanation,
        req.body.sender_ip || null,
        req.body.department || null,
        req.body.submitted_by || null,
        req.body.attachment_url || null,
      ]
    );

    // ==========================================
    // 🔥 SEND FINAL RESPONSE TO FRONTEND
    // ==========================================
    res.status(200).json({
      risk_score,
      threat_level,
      action_taken,
      explanation,
    });

  } catch (error) {
    console.error("ERROR:", error.message);

    if (error.response) {
      console.error("AI ENGINE ERROR:", error.response.data);
    }

    res.status(500).json({
      message: "AI Engine or Database Error",
    });
  }
});

// ==========================================
// Fetch All Incidents
// ==========================================
app.get("/incidents", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM incidents ORDER BY id DESC"
    );
    res.status(200).json(result.rows);
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