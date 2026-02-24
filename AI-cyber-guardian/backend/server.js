// ==========================================
// AI Corporate Cyber Guardian - Backend
// ==========================================

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL (Neon) Connection
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
  res.send("AI Corporate Cyber Guardian Backend Running 🚀");
});

// ==========================================
// Analyze Email Route
// ==========================================
app.post("/analyze", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    // ✅ Read correct key
    const email = req.body.email_content;

    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Email content is required" });
    }

    // If frontend already sends risk values, use them
    const probability = req.body.risk_score || Math.floor(Math.random() * 100);
    const risk = req.body.threat_level || "Medium";
    const action = req.body.action_taken || "Flagged";
    const explanation = req.body.explanation || "AI-generated analysis";

    await pool.query(
      `INSERT INTO incidents 
       (email_content, risk_score, threat_level, action_taken, explanation, sender_ip, department, submitted_by, attachment_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        email,
        probability,
        risk,
        action,
        explanation,
        req.body.sender_ip || null,
        req.body.department || null,
        req.body.submitted_by || null,
        req.body.attachment_url || null
      ]
    );

    res.status(200).json({
      message: "Incident saved successfully",
      risk,
      probability
    });

  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({ message: "Error saving incident" });
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
    res.status(500).json({ message: "Error fetching incidents" });
  }
});

// ==========================================
// Start Server
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});