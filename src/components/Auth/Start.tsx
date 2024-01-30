import React, { useState } from "react";
// import "./StartView.css"; // Import your CSS file

const StartView = () => {
  const [isLoginPresented, setIsLoginPresented] = useState(false);
  const [isSignUpPresented, setIsSignUpPresented] = useState(false);

  const handleLoginPress = () => setIsLoginPresented(true);
  const handleSignUpPress = () => setIsSignUpPresented(true);

  return (
    <div className="container">
      <div className="toolbar">
        <h1 className="logo">TTwin</h1>
      </div>
      <h2 className="title">See what's happening in the paragliding world.</h2>
      <img
        className="image"
        src="/startImage.png" // Replace with your image path
        alt="Paragliding scene"
      />
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
      {/* {isLoginPresented && (
        <LogInView onClose={() => setIsLoginPresented(false)} />
      )}
      {isSignUpPresented && (
        <SignUpView onClose={() => setIsSignUpPresented(false)} />
      )} */}
    </div>
  );
};

export default StartView;
