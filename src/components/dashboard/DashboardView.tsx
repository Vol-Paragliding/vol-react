import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/useAuth";
import { logout } from "../../contexts/auth/AuthSlice";
import { getUser } from "../feeds/services/FeedService";
import { FeedUser } from "../feeds/types/feedTypes";
import { EditProfileView, ProfileImage, ProfileView } from "../Profile";

const DashboardView = () => {
  const [feedUser, setFeedUser] = useState<FeedUser | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (state.user) {
        const user = await getUser(state.user.userId, state.user.feedToken);
        setFeedUser(user);
      }
    };

    fetchUser();
  }, [state.user]);

  const handleLogout = () => {
    logout(dispatch);
    navigate("/");
  };

  const handleEditProfile = () => {
    setShowEditProfile((toggle) => !toggle);
  };

  if (!state.user) {
    navigate("/");
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProfileImage
        imageUrl={feedUser?.data.profilePicture}
        action={handleEditProfile}
      />
      <h1>
        Welcome to the Dashboard,{" "}
        {feedUser?.data.firstname || state.user.username}!
      </h1>
      <ProfileView currentUser={feedUser} onEdit={() => setShowEditProfile(true)} />
      {/* <ForYouFeedsView feedType="user" userId={state.user.userId} /> */}
      {showEditProfile && (
        <EditProfileView
          currentUser={feedUser}
          authUser={state.user}
          setShowEditProfile={setShowEditProfile}
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
