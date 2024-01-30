// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

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
