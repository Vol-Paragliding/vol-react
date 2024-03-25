import { EditProfileView, ProfileView, UserAvatar } from "../profile";
import { useFeed } from "../../contexts/feed/useFeed";

export const ProfileImage = () => {
  const { viewMode } = useFeed();

  return (
    <div>
      <UserAvatar />
      {viewMode === "profile" && <ProfileView />}
      {viewMode === "edit" && <EditProfileView />}
    </div>
  );
};
