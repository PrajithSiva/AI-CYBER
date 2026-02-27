import { useState } from "react";
import EmailForm from "../components/EmailForm";
import RiskDisplay from "../components/RiskDisplay";
import Loader from "../components/Loader";
import IncidentTable from "../components/IncidentTable";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeEmail = async (emailText) => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_content: emailText }),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      const data = await response.json();
      console.log("🔥 FULL BACKEND RESPONSE:", JSON.stringify(data, null, 2));
      

      // 🔥 Normalize possible backend structures
      const backendData = data;

const formattedResult = {
  label: backendData.action_taken || "Analyzed",

  confidence: backendData.risk_score
    ? Math.round(backendData.risk_score)
    : 0,

  risk: backendData.threat_level || "Low",

  reasons: backendData.explanation
    ? [backendData.explanation]
    : ["AI analysis completed"],
};

setResult(formattedResult);

    } catch (err) {
      console.error("Error analyzing email:", err);
      setError("Something went wrong while analyzing the email.");
    }

    setLoading(false);
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <h1 className="title">AI Corporate Cyber Guardian</h1>
        <p className="subtitle">
          AI-powered phishing detection and corporate email security analysis
        </p>

        <div className="divider"></div>

        <EmailForm onAnalyze={analyzeEmail} />

        {loading && <Loader />}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {result && <RiskDisplay data={result} />}

        <div className="divider"></div>

        <h2>Incident History</h2>
        <IncidentTable />
      </div>
    </div>
  );
};

export default Dashboard;