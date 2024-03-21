import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/auth/useAuth";
import { login } from "../../contexts/auth/AuthSlice";
import appIcon from "../../assets/appIcon.png";
import "./auth.css";

type LogInViewProps = {
  onClose: React.MouseEventHandler;
};

const LogInView = ({ onClose }: LogInViewProps) => {
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

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const user = await login({ username, password });

      dispatch({ type: "SET_USER", payload: user });
      navigate("/home");
    } catch (error) {
      console.error("Login Error:", error);
      setError((error as Error).message || "An error occurred during login.");
    }
  };

  return (
    <div className="auth-form-container">
      <button className="auth-close-button" onClick={onClose}>
        &times;
      </button>
      <img className="logo" src={appIcon} alt="Paragliding logo" />
      <h1 className="auth-form-title">Log in</h1>
      <div className="credentials-form">
        <form onSubmit={handleLogin}>
          {error && <div className="signup-error">{error}</div>}
          <div className="auth-form-header">
            <h2>Enter your login credentials</h2>
          </div>
          <div className="auth-input-group">
            <input
              ref={usernameRef}
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              pattern="^[a-zA-Z0-9_.\-]{3,30}$"
              title="Username must be 3-30 characters and can include letters, numbers, underscores, hyphens, and periods."
              required
            />
          </div>
          <div className="auth-input-group">
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" className="create-login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogInView;
