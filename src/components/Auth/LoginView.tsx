import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./auth.css";

const LogInView = ({ onClose }: { onClose: React.MouseEventHandler }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuthDetails } = useAuth();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful", data);
        setAuthDetails(data);
      } else {
        throw new Error(data.message || "Failed to log in");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError((err as Error).message || "An error occurred during login.");
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
