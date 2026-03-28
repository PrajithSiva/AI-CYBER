// ==========================================
// AI Corporate Cyber Guardian - Backend
// ==========================================

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { Pool } = require("pg");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
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

// Optional logs
pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ DB Error:", err);
});

// ==========================================
// Root Route
// ==========================================
app.get("/", (req, res) => {
  res.send("🚀 AI Corporate Cyber Guardian Backend Running");
});

// ==========================================
// 🔐 Analyze Email (PROTECTED)
// ==========================================
app.post("/analyze", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId; // 🔐 Secure user ID
    const email = req.body.email_content;

    console.log("User:", userId);
    console.log("Email:", email);

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

    // 🔥 Save to DB with USER ID
    await pool.query(
      `INSERT INTO incidents 
       (user_id, email_content, risk_score, threat_level, action_taken, explanation)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [
        userId,
        email,
        risk_score,
        threat_level,
        action_taken,
        explanation,
      ]
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
// 📊 Get User Incidents (PROTECTED)
// ==========================================
app.get("/incidents", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;

    const result = await pool.query(
      `SELECT * FROM incidents
       WHERE user_id = $1
       ORDER BY id DESC`,
      [userId]
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
// ❌ Optional: Delete Incident (Protected)
// ==========================================
app.delete("/incident/:id", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const id = req.params.id;

    await pool.query(
      `DELETE FROM incidents 
       WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      message: "Error deleting incident",
    });
  }
});

// ==========================================
// Server Start
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});