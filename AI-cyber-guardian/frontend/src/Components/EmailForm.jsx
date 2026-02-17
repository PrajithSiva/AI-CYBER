import { useState } from "react";

const EmailForm = ({ onAnalyze }) => {
  const [emailText, setEmailText] = useState("");

  const handleSubmit = () => {
    if (!emailText.trim()) return;
    onAnalyze(emailText);
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
