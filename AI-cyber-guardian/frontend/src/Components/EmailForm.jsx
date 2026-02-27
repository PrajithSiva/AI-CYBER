import { useState } from "react";

const EmailForm = ({ onAnalyze }) => {
  const [emailText, setEmailText] = useState("");

  const handleSubmit = async () => {
    if (!emailText.trim()) return;

    // 🔥 Call Dashboard function
    await onAnalyze(emailText);

    setEmailText(""); // optional: clear textarea
  };

  return (
    <>
      <textarea
        placeholder="Paste suspicious email here..."
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
        rows="6"
        style={{ width: "100%", padding: "10px" }}
      />

      <button onClick={handleSubmit}>
        Analyze Email
      </button>
    </>
  );
};

export default EmailForm;