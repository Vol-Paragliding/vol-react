import React from "react";
import { FeedUser } from "../feeds/types/feedTypes";
import styles from "./Profile.module.css";

interface ProfileViewProps {
  feedUser: FeedUser | null;
  edit: (mode: string) => void;
  logout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  feedUser,
  edit,
  logout,
}) => {
  if (!feedUser) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileDetail}>
        <span className={styles.profileDetailLabel}>First Name:</span>
        {feedUser.data.firstname}
      </div>
      <div className={styles.profileDetail}>
        <span className={styles.profileDetailLabel}>Last Name:</span>
        {feedUser.data.lastname}
      </div>
      <div className={styles.profileDetail}>
        <span className={styles.profileDetailLabel}>Bio:</span>
        {feedUser.data.aboutMe}
      </div>
      <div className={styles.profileDetail}>
        <span className={styles.profileDetailLabel}>Location:</span>
        {feedUser.data.location}
      </div>
      <div className={styles.profileDetail}>
        <span className={styles.profileDetailLabel}>Website:</span>
        {feedUser.data.website}
      </div>
      <div>
        <button className={styles.editButton} onClick={() => edit("edit")}>
          Edit
        </button>
        <button className={styles.editButton} onClick={() => edit("")}>
          Close
        </button>
        <button className={styles.editButton} onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
};
