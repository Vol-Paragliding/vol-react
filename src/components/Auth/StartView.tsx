import { useState } from "react";
import "./StartView.css";

const StartView = () => {
  const [isLoginPresented, setIsLoginPresented] = useState(false);
  const [isSignUpPresented, setIsSignUpPresented] = useState(false);

  const handleLoginPress = () => setIsLoginPresented(true);
  const handleSignUpPress = () => setIsSignUpPresented(true);

  return (
    <div className="container">
      <div className="toolbar">
        <img
          className="logo"
          src={new URL("./Assets/appIcon.png", import.meta.url).href}
          alt="Paragliding scene"
        />
      </div>
      <h2 className="title">See what's happening in the paragliding world</h2>
      <button className="create-account-button" onClick={handleSignUpPress}>
        Create account
      </button>
      <div className="or-separator">
        <span>or</span>
      </div>
      <div className="login-row">
        <p className="login-text">Have an account already?</p>
        <button className="login-button" onClick={handleLoginPress}>
          Login
        </button>
      </div>
      {isLoginPresented &&
        // <LogInView onClose={() => setIsLoginPresented(false)} />
        "foo"}
      {isSignUpPresented &&
        // <SignUpView onClose={() => setIsSignUpPresented(false)} />
        "bar"}
    </div>
  );
};

export default StartView;
