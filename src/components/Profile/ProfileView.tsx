import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/auth/useAuth";
import { useFeed } from "../../contexts/feed/useFeed";
import { logout } from "../../contexts/auth/AuthSlice";
import styles from "./Profile.module.css";

export const ProfileView: React.FC = () => {
  const { dispatch } = useAuth();
  const { feedUser, setViewMode, viewMode } = useFeed();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/");
  };

  if (!feedUser) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className={`${viewMode === "profile" ? styles.slideIn : ""}`}>
      <div className={styles.profileContainer}>
        <h2 className={styles.profileHeader}>Profile</h2>
        <hr className={styles.hr} />
        <div className={styles.profileDetail}>
          <span className={styles.profileDetailLabel}>First Name:</span>
          <span className={styles.profileDetailContent}>
            {feedUser.data?.firstname as string}
          </span>
        </div>
        <div className={styles.profileDetail}>
          <span className={styles.profileDetailLabel}>Last Name:</span>
          <span className={styles.profileDetailContent}>
            {feedUser.data?.lastname as string}
          </span>
        </div>
        <div className={styles.profileDetail}>
          <span className={styles.profileDetailLabel}>Location:</span>
          <span className={styles.profileDetailContent}>
            {feedUser.data?.location as string}
          </span>
        </div>
        <div className={styles.profileDetail}>
          <span className={styles.profileDetailLabel}>Bio:</span>
          <span className={styles.profileDetailContent}>
            {feedUser.data?.aboutMe as string}
          </span>
        </div>
        <div>
          <button
            className={styles.actionButton}
            onClick={() => setViewMode("edit")}
          >
            Edit
          </button>
          <button
            className={styles.actionButton}
            onClick={() => setViewMode("")}
          >
            Close
          </button>
          <button className={styles.actionButton} onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
