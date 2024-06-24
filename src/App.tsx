import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { StreamApp } from "react-activity-feed";

import HeaderView from "./components/header/HeaderView";
import HomeView from "./components/home/HomeView";
import StartView from "./components/auth/StartView";
import NotFoundView from "./components/notFound/NotFoundView";
import { useAuth } from "./contexts/auth/useAuth";
import { FeedProvider } from "./contexts/feed/FeedContext";
import { ChatProvider } from "./contexts/chat/ChatContext";
import "./App.css";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY || "";
const appId = import.meta.env.VITE_APP_STREAM_APP_ID || "";

function App() {
  const { authState } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            authState.authUser ? <Navigate to="/home" replace /> : <StartView />
          }
        />
        {authState.authUser && (
          <Route
            path="/home/*"
            element={
              <StreamApp
                apiKey={apiKey}
                appId={appId}
                token={authState.authUser.feedToken}
              >
                <ChatProvider>
                  <FeedProvider>
                    <HeaderView />
                    <HomeView />
                  </FeedProvider>
                </ChatProvider>
              </StreamApp>
            }
          />
        )}
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Router>
  );
}

export default App;
