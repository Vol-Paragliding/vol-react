import { useState } from "react";

import LoginView from "./LoginView";
import SignUpView from "./SignUpView";
import appIcon from "../../assets/appIcon.png";
import "./auth.css";

const StartView = () => {
  const [isLoginPresented, setIsLoginPresented] = useState(false);
  const [isSignUpPresented, setIsSignUpPresented] = useState(false);

  const handleLoginPress = () => setIsLoginPresented(true);
  const handleSignUpPress = () => setIsSignUpPresented(true);
  const handleClose = () => {
    setIsLoginPresented(false);
    setIsSignUpPresented(false);
  };

  return (
    <main className="start-container">
      <section className="start-content">
        {!isLoginPresented && !isSignUpPresented && (
          <div className="auth-form-container">
            <img className="logo" src={appIcon} alt="Paragliding logo" />
            <h1 className="auth-form-title">Explore the paragliding world</h1>
            <div className="auth-form-header">
              <h2>join or sign back in</h2>
            </div>
            <div className="start-action-container">
              <button
                className="create-login-button"
                onClick={handleSignUpPress}
              >
                Create Account
              </button>
              <div className="or-separator">or</div>
              <button
                className="create-login-button"
                onClick={handleLoginPress}
              >
                Log In
              </button>
            </div>
          </div>
        )}
        {isLoginPresented && <LoginView onClose={handleClose} />}
        {isSignUpPresented && <SignUpView onClose={handleClose} />}
      </section>
    </main>
  );
};

export default StartView;
