import { useEffect } from "react";

import { useAuth } from "../../contexts/auth/useAuth";
import { useNavigate } from "react-router-dom";

const AuthView = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.authUser) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [state.authUser, navigate]);

  return null;
};

export default AuthView;
