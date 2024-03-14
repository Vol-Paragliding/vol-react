import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/useAuth";
import { logout } from "../../contexts/auth/AuthSlice";

const DashboardView = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/");
  };

  if (!state.user) {
    navigate("/");
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard, {state.user.username}!</h1>
      <button className="logout-button" onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default DashboardView;
