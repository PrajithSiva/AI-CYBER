import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import EmailForm from "../components/EmailForm";
import RiskDisplay from "../components/RiskDisplay";
import Loader from "../components/Loader";
import IncidentTable from "../components/IncidentTable";

import { analyzeEmail, setAuthToken } from "../services/api";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const { getToken } = useAuth();

  const handleAnalyze = async (emailText) => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const token = await getToken();
      setAuthToken(token); // 🔐 Attach token

      const response = await analyzeEmail({
        email_content: emailText,
      });

      const data = response.data;
      console.log("🔥 Backend Response:", data);

      const formattedResult = {
        label: data.action_taken || "Analyzed",
        confidence: data.risk_score
          ? Math.round(data.risk_score)
          : 0,
        risk: data.threat_level || "Low",
        reasons: data.explanation
          ? [data.explanation]
          : ["AI analysis completed"],
      };

      setResult(formattedResult);

    } catch (err) {
      console.error("Error analyzing email:", err);
      setError("Something went wrong while analyzing the email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <h1 className="title">AI Corporate Cyber Guardian</h1>
        <p className="subtitle">
          AI-powered phishing detection and corporate email security analysis
        </p>

        <div className="divider"></div>

        {/* 🔍 Email Input */}
        <EmailForm onAnalyze={handleAnalyze} />

        {/* ⏳ Loader */}
        {loading && <Loader />}

        {/* ❌ Error */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* 📊 Result */}
        {result && <RiskDisplay data={result} />}

        <div className="divider"></div>

        <h2>Incident History</h2>

        {/* 📋 Table */}
        <IncidentTable />
      </div>
    </div>
  );
};

export default Dashboard;