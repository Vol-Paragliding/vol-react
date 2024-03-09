import { useState } from "react";
import LoginView from "./LoginView";
import SignUpView from "./SignUpView";
import appIcon from "../../assets/appIcon.png";
import "./StartView.css";

type StartViewProps = {
  navigate: (path: string) => void;
};

const StartView = ({ navigate }: StartViewProps) => {
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
        <img className="logo" src={appIcon} alt="Paragliding logo" />
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
        {isLoginPresented && (
          <LoginView navigate={navigate} onClose={handleClose} />
        )}
        {isSignUpPresented && (
          <SignUpView navigate={navigate} onClose={handleClose} />
        )}
      </section>
    </main>
  );
};

export default StartView;
