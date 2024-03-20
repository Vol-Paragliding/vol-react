import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HeaderView from "./components/header/HeaderView";
import HomeView from "./components/home/HomeView";
import StartView from "./components/auth/StartView";
import NotFoundView from "./components/notFound/NotFoundView";
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
          element={
            state.authUser ? <Navigate to="/home" replace /> : <StartView />
          }
        />
        {state.authUser && (
          <Route
            path="/home/*"
            element={
              <UserFeedProvider>
                <HeaderView />
                <HomeView />
              </UserFeedProvider>
            }
          />
        )}
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Router>
  );
}

export default App;
