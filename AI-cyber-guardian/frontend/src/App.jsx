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
        <p style={{ textAlign: "center" }}>Loading...</p>
      </ClerkLoading>

      <ClerkLoaded>
        <SignedOut>
          <div className="auth-container">
            <div className="auth-left">
              <h1>🛡 AI Cyber Guardian</h1>
              <p>
                Enterprise-grade AI security for detecting phishing,
                malicious links, and corporate email threats in real time.
              </p>
            </div>

            <div className="auth-right">
              <SignIn />
            </div>
          </div>
        </SignedOut>

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