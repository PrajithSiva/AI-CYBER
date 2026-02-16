import React, { useState } from "react";
import EmailForm from "../components/EmailForm";
import RiskDisplay from "../components/RiskDisplay";

function Dashboard() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>AI Corporate Cyber Guardian</h1>
      <EmailForm setResult={setResult} />
      {result && <RiskDisplay result={result} />}
    </div>
  );
}

export default Dashboard;
