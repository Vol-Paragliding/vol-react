import React from "react";
import { useFeed } from "../../contexts/feed/useFeed";
import { EditProfileView, ProfileView, UserAvatar } from "../profile";

export const ProfileImage: React.FC = () => {
  const { feedUser, viewMode, setViewMode } = useFeed();

  const handleImageClick = () => {
    setViewMode(viewMode === "profile" ? "" : "profile");
  };

  const avatarUrl = feedUser?.data?.profilePicture ?? "";

  return (
    <div>
      {feedUser?.data && (
        <UserAvatar
          url={typeof avatarUrl === 'string' ? avatarUrl : ""}
          onClick={handleImageClick}
        />
      )}
      {viewMode === "profile" && <ProfileView />}
      {viewMode === "edit" && <EditProfileView />}
    </div>
  );
};
