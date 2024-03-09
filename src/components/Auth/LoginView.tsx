import { useState } from "react";
import { useAuth } from "../../contexts/auth/useAuth";
import { login } from "../../contexts/auth/AuthSlice";
import "./auth.css";

import React from "react";

type LogInViewProps = {
  navigate: (path: string) => void;
  onClose: React.MouseEventHandler;
};

const LogInView = ({ navigate, onClose }: LogInViewProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useAuth();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const user = await login({ username, password });
      console.log("Login successful", user);
      dispatch({ type: "SET_USER", payload: user });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      setError((error as Error).message || "An error occurred during login.");
    }
  };

  return (
    <div className="form-container">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <h1 className="form-title">Log in</h1>
      <div className="credentials-form">
        <form onSubmit={handleLogin}>
          {error && <div className="signup-error">{error}</div>}
          <div className="form-header">
            <h2>Please enter your login credentials</h2>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={!username || !password}
          >
            Log In
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LogInView;
