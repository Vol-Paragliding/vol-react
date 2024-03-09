import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthView from "./components/auth/AuthView";
import DashboardView from "./components/dashboard/DashboardView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthView />} />
        <Route path="/dashboard" element={<DashboardView />} />
      </Routes>
    </Router>
  );
}

export default App;
