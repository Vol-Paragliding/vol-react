import { useState } from "react";

import LoginView from "./LoginView";
import SignUpView from "./SignUpView";
import appIcon from "../../assets/appIcon.png";
import "./StartView.css";

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
    <main className="container">
      <section className="content">
        {!isLoginPresented && !isSignUpPresented && (
          <div className="form-container">
            <img className="logo" src={appIcon} alt="Paragliding logo" />
            <h1 className="form-title">Explore the paragliding world</h1>
            <div className="form-header">
              <h2>Join or sign back in</h2>
            </div>
            <div className="action-container">
              <button
                className="action-button create-account"
                onClick={handleSignUpPress}
              >
                Create Account
              </button>
              <div className="separator">or</div>
              <button
                className="action-button login"
                onClick={handleLoginPress}
              >
                Log In
              </button>
            </div>
          </div>
        )}
        {isLoginPresented && (
          <LoginView onClose={handleClose} />
        )}
        {isSignUpPresented && (
          <SignUpView onClose={handleClose} />
        )}
      </section>
    </main>
  );
};

export default StartView;
