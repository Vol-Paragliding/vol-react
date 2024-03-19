import { useAuth } from "../../contexts/auth/useAuth";
import { useNavigate } from "react-router-dom";
import StartView from "./StartView";
import HomeView from "../home/HomeView";

const AuthView = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  return (
    <>{!state.autUser ? <StartView navigate={navigate} /> : <HomeView />}</>
  );
};

export default AuthView;
