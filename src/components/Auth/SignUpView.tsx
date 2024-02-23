import React, { useState } from "react";
import "./auth.css";

const SignUpView = ({ onClose }: { onClose: React.MouseEventHandler<HTMLButtonElement> | undefined }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, firstname, lastname }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.message || "Error signing up");
      }
    } catch (error) {
      setError((error as Error).message || "An error occurred during sign up.");
    }
  };

  return (
    <div className="form-container">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <h1 className="form-title">Sign up</h1>
      <div className="credentials-form">
        <form onSubmit={handleSignUp}>
          {error && <div className="signup-error">{error}</div>}
          <div className="form-header">
            <h2>Please enter login credentials</h2>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpView;
