import { EditProfileView, ProfileView, UserAvatar } from "../profile";
import { useUserFeed } from "../../contexts/feed/useUserFeed";

export const ProfileImage = () => {
  const { viewMode } = useUserFeed();

  return (
    <div>
      <UserAvatar />
      {viewMode === "profile" && <ProfileView />}
      {viewMode === "edit" && <EditProfileView />}
    </div>
  );
};
