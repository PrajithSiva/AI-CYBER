import { useState } from "react";
import EmailForm from "../components/EmailForm";
import RiskDisplay from "../components/RiskDisplay";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeEmail = (emailText) => {
    setLoading(true);
    setResult(null);

    // Simulated AI prediction
    setTimeout(() => {
      const probability = Math.floor(Math.random() * 100);

      let risk = "Low";
      if (probability > 70) risk = "High";
      else if (probability > 40) risk = "Medium";

      setResult({
        label: probability > 50 ? "Phishing Detected" : "Safe Email",
        confidence: probability,
        risk,
        reasons: [
          "Suspicious urgency keywords detected",
          "Unknown sender domain",
          "External link found"
        ]
      });

      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container">
      <h1 className="title">AI Corporate Cyber Guardian</h1>
      <p className="subtitle">
        
  AI-powered phishing detection and corporate email security analysis
      </p>
      <div className="divider"></div>
      
      <EmailForm onAnalyze={analyzeEmail} />

      {loading && <Loader />}
      {result && <RiskDisplay data={result} />}
    </div>
  );
};

export default Dashboard;
