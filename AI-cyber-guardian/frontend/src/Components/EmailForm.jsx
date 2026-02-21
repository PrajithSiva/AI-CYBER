import { useState } from "react";
import { analyzeEmail } from "../services/api";

const EmailForm = () => {
  const [emailText, setEmailText] = useState("");

  const handleSubmit = async () => {
  if (!emailText.trim()) return;

  const data = {
    email_content: emailText,
    risk_score: 75,
    threat_level: "Medium",
    action_taken: "Flagged",
    explanation: "Suspicious keywords detected",
    sender_ip: "192.168.1.1",
    department: "IT",
    submitted_by: "prajith@company.com",
    attachment_url: ""
  };

  try {
    await analyzeEmail(data);
    alert("Incident Saved Successfully ✅");
  } catch (error) {
    alert("Error saving incident ❌");
  }
};

  return (
    <>
      <textarea
        placeholder="Paste suspicious email here..."
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Analyze Email
      </button>
    </>
  );
};

export default EmailForm;
