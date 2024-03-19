import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthView from "./components/auth/AuthView";
import HomeView from "./components/home/HomeView";
import { UserFeedProvider } from "./contexts/feed/UserFeedContext";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthView />} />
        <Route
          path="/home"
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
