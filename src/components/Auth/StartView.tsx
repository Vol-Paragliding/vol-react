import { useState } from "react";
import LoginView from "./LoginView";
import SignUpView from "./SignUpView";
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
      <header className="toolbar">
        <h1 className="title">Discover the Paragliding World</h1>
        <img
          className="logo"
          src={new URL("../../assets/appIcon.png", import.meta.url).href}
          alt="Paragliding scene"
        />
      </header>
      <section className="content">
        <div className="action-container">
          {!isLoginPresented && !isSignUpPresented && (
            <>
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
            </>
          )}
        </div>
        {isLoginPresented && <LoginView onClose={handleClose} />}
        {isSignUpPresented && <SignUpView onClose={handleClose} />}
      </section>
    </main>
  );
};

export default StartView;
