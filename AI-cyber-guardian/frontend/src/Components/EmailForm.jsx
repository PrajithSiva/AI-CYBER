import React, { useState } from "react";
import axios from "axios";

function EmailForm({ setResult }) {
  const [emailContent, setEmailContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/analyze-email",
        {
          email_content: emailContent,
          sender_email: "test@example.com",
          user_id: 1,
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Backend not connected yet");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows="6"
        cols="60"
        placeholder="Paste suspicious email here..."
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
      />
      <br /><br />
      <button type="submit">Analyze Email</button>
    </form>
  );
}

export default EmailForm;
