import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/useAuth";
import { ProfileImage } from "../profile";

const HomeView = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.autUser) {
      navigate("/");
    }
  }, [state.autUser, navigate]);

  return (
    <>
      <ProfileImage />
    </>
  );
};

export default HomeView;
