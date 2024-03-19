import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthView from "./components/auth/AuthView";
import HomeView from "./components/home/HomeView";
import StartView from "./components/auth/StartView";
import { UserFeedProvider } from "./contexts/feed/UserFeedContext";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthView />} />
        <Route path="/start" element={<StartView />} />
        <Route
          path="/home/*"
          element={
            <UserFeedProvider>
              <HomeView />
            </UserFeedProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
