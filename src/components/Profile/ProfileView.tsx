import React from "react";
import { FeedUser } from "../feeds/types/feedTypes";
import styles from "./Profile.module.css";

interface ProfileViewProps {
  currentUser: FeedUser | null;
  onEdit: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  onEdit,
}) => {
  if (!currentUser) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileDetail}>
        <span className={styles.profileDetailLabel}>First Name:</span>
        {currentUser.data.firstname}
      </div>
      <div className={styles.profileDetail}>
        <span className={styles.profileDetailLabel}>Last Name:</span>
        {currentUser.data.lastname}
      </div>
      <div className={styles.profileDetail}>
        <span className={styles.profileDetailLabel}>Bio:</span>
        {currentUser.data.aboutMe}
      </div>
      <div className={styles.profileDetail}>
        <span className={styles.profileDetailLabel}>Location:</span>
        {currentUser.data.location}
      </div>
      <div className={styles.profileDetail}>
        <span className={styles.profileDetailLabel}>Website:</span>
        {currentUser.data.website}
      </div>
      <button className={styles.editButton} onClick={onEdit}>
        Edit Profile
      </button>
    </div>
  );
};
