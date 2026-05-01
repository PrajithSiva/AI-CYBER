import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  ClerkLoaded,
  ClerkLoading
} from "@clerk/clerk-react";

import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <>
      <ClerkLoading>
        <p style={{ textAlign: "center", marginTop: "50px", color: "white" }}>
          Loading...
        </p>
      </ClerkLoading>

      <ClerkLoaded>

        {/* 🔓 NOT LOGGED IN */}
        <SignedOut>
          <div className="auth-container">

            {/* LEFT SIDE */}
            <div className="auth-left">
              <h1>🛡 AI Cyber Guardian</h1>

              <p>
                Enterprise-grade AI security for detecting phishing,
                malicious links, and corporate email threats in real time.
              </p>

              <div className="features">
                <p>🟢 Real-time email analysis</p>
                <p>🟡 AI-powered threat detection</p>
                <p>🔒 Secure user-based history</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="auth-right">
              <div className="auth-card">
                <SignIn />
              </div>
            </div>

          </div>
        </SignedOut>

        {/* 🔐 LOGGED IN */}
        <SignedIn>
          <div className="topbar">
            <h2>🛡 AI Cyber Guardian</h2>
            <UserButton afterSignOutUrl="/" />
          </div>

          <Dashboard />
        </SignedIn>

      </ClerkLoaded>
    </>
  );
}

export default App;