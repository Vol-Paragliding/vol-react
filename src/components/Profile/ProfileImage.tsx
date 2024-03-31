import React from "react";

import { useFeed } from "../../contexts/feed/useFeed";
import { EditProfileView, ProfileView, UserAvatar } from "../profile";

export const ProfileImage: React.FC = () => {
  const { viewMode } = useFeed();

  return (
    <div>
      <UserAvatar />
      {viewMode === "profile" && <ProfileView />}
      {viewMode === "edit" && <EditProfileView />}
    </div>
  );
};
