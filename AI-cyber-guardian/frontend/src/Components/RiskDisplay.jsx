const RiskDisplay = ({ data }) => {
  if (!data) return null;

  const { label, confidence, risk, reasons } = data;

  const riskClass =
    risk === "High"
      ? "risk-high"
      : risk === "Medium"
      ? "risk-medium"
      : "risk-low";

  return (
    <div className="result-card">
      <h2 className={`result-title ${riskClass}`}>
        {label}
      </h2>

      <p><strong>Confidence:</strong> {confidence}%</p>

      <p>
        <strong>Risk Level:</strong>{" "}
        <span className={riskClass}>{risk}</span>
      </p>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${confidence}%` }}
        ></div>
      </div>

      <h3 style={{ marginTop: "1rem" }}>Why flagged?</h3>

      <ul>
        {reasons.map((reason, index) => (
          <li key={index}>{reason}</li>
        ))}
      </ul>
    </div>
  );
};

export default RiskDisplay;