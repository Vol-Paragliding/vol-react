import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { sanitizeInput } from "../utils";
import { useAuth } from "../../contexts/auth/useAuth";
import { signup } from "../../contexts/auth/AuthSlice";
import appIcon from "../../assets/appIcon.png";
import "./auth.css";

type SignUpViewProps = {
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const SignUpView = ({ onClose }: SignUpViewProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const { sanitized: sanitizedUsername, error: usernameValidationError } =
      sanitizeInput(username);

    if (usernameValidationError) {
      setError(usernameValidationError);
      return;
    }

    try {
      const user = await signup({
        username: sanitizedUsername.toLowerCase(),
        password,
      });

      dispatch({ type: "SET_USER", payload: user });
      navigate("/home");
    } catch (error) {
      console.error("Sign Up Error:", error);
      setError((error as Error).message || "An error occurred during sign up.");
    }
  };

  return (
    <div className="form-container">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <img className="logo" src={appIcon} alt="Paragliding logo" />
      <h1 className="form-title">Sign up</h1>
      <div className="credentials-form">
        <form onSubmit={handleSignUp}>
          <div className="form-header">
            <h2>Create your account</h2>
          </div>
          {error && <div className="signup-error">{error}</div>}
          <div className="input-group">
            <input
              ref={usernameRef}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              pattern="^[a-zA-Z0-9_.\-]{3,30}$"
              title="Username must be 3-30 characters and can include letters, numbers, underscores, hyphens, and periods."
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern=".{8,}"
              title="Password must be at least 8 characters long."
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
