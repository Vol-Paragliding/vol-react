import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/useAuth";
import { logout } from "../../contexts/auth/AuthSlice";
import { getUser } from "../feeds/services/FeedService";
import { FeedUser } from "../feeds/types/feedTypes";
import { EditProfileView, ProfileImage, ProfileView } from "../Profile";

const DashboardView = () => {
  const [feedUser, setFeedUser] = useState<FeedUser | null>(null);
  const [viewMode, setViewMode] = useState(""); // Can be 'profile' or 'edit'
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user) {
      navigate("/");
    } else {
      const fetchUser = async () => {
        if (!state.user) return;

        const user = await getUser(state.user.userId, state.user.feedToken);
        setFeedUser(user);
      };

      fetchUser();
    }
  }, [state.user, navigate]);

  const handleLogout = () => {
    logout(dispatch);
    navigate("/");
  };

  return (
    <div>
      <ProfileImage
        imageUrl={feedUser?.data.profilePicture}
        action={() => setViewMode(viewMode === "profile" ? "" : "profile")}
      />
      {/* <ForYouFeedsView feedType="user" userId={state.user.userId} /> */}
      {viewMode === "profile" && (
        <ProfileView currentUser={feedUser} onEdit={setViewMode} />
      )}
      {viewMode === "edit" && (
        <EditProfileView
          currentUser={feedUser}
          authUser={state.user}
          setShowEditProfile={() => setViewMode("profile")}
          setFeedUser={setFeedUser}
        />
      )}
      <button className="logout-button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default DashboardView;
