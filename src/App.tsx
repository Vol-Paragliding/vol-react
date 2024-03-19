import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import HomeView from "./components/home/HomeView";
import StartView from "./components/auth/StartView";
import { useAuth } from "./contexts/auth/useAuth";
import { UserFeedProvider } from "./contexts/feed/UserFeedContext";
import "./App.css";

function App() {
  const { state } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={state.authUser ? <Navigate to="/home" /> : <StartView />}
        />
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
