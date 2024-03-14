import React, { useState } from "react";

import { sanitizeInput } from "../utils";

import { useAuth } from "../../contexts/auth/useAuth";
import { signup } from "../../contexts/auth/AuthSlice";

import appIcon from "../../assets/appIcon.png";
import "./auth.css";

type SignUpViewProps = {
  navigate: (path: string) => void;
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const SignUpView = ({ navigate, onClose }: SignUpViewProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useAuth();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const sanitizedUsername = sanitizeInput(username);
      const user = await signup({
        username: sanitizedUsername.toLowerCase(),
        password,
      });
      console.log("Sign up successful", user);
      dispatch({ type: "SET_USER", payload: user });
      navigate("/dashboard");
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
          {error && <div className="signup-error">{error}</div>}
          <div className="form-header">
            <h2>Create your account</h2>
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
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpView;
