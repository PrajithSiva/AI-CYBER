import React from "react";

function RiskDisplay({ result }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Analysis Result</h2>
      <p><strong>Risk Score:</strong> {result.risk_score}</p>
      <p><strong>Threat Level:</strong> {result.threat_level}</p>
      <p><strong>Action Taken:</strong> {result.action_taken}</p>
      <p><strong>Explanation:</strong> {result.explanation}</p>
    </div>
  );
}

export default RiskDisplay;
