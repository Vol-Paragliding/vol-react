import { useAuth } from "../../contexts/auth/useAuth";
import { useNavigate } from "react-router-dom";
import StartView from "./StartView";
import DashboardView from "../dashboard/DashboardView";

const AuthView = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  return (
    <>{!state.user ? <StartView navigate={navigate} /> : <DashboardView />}</>
  );
};

export default AuthView;
