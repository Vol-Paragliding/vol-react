import React, { useState } from "react";

// Assuming you have the following utility functions
// auth.login: Function to perform authentication
// useAuth: Custom hook to access authentication methods and state

const LogInView: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuth(); // Custom hook to handle authentication logic

  const handleLogin = async () => {
    try {
      await login(username, password);
      // Handle successful login (e.g., redirect to dashboard)
    } catch (err) {
      // Handle login error (e.g., show error message)
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="login-form-header">
            <h2>Please enter your login credentials</h2>
          </div>
          <div className="form-section">
            <input
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
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
            className="login-button"
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
