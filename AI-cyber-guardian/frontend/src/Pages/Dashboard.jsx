import { useState } from "react";
import EmailForm from "../components/EmailForm";
import RiskDisplay from "../components/RiskDisplay";
import Loader from "../components/Loader";
import IncidentTable from "../components/IncidentTable";
import { analyzeEmail as analyzeAPI } from "../services/api";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  
const analyzeEmail = async (emailText) => {
  setLoading(true);
  setResult(null);

  try {
    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: emailText })
    });

    const data = await response.json();
    setResult(data);

  } catch (error) {
    console.error("Error:", error);
  }

  setLoading(false);
};
  
  return (
    <div className="container">
      <h1 className="title">AI Corporate Cyber Guardian</h1>
      <p className="subtitle">
        AI-powered phishing detection and corporate email security analysis
      </p>

      <div className="divider"></div>

      {/* Email Input */}
      <EmailForm onAnalyze={analyzeEmail} />

      {/* Loader */}
      {loading && <Loader />}

      {/* Risk Result */}
      {result && <RiskDisplay data={result} />}

      <div className="divider"></div>

      {/* Incident History Table */}
      <h2>Incident History</h2>
      <IncidentTable />
    </div>
  );
};

export default Dashboard;