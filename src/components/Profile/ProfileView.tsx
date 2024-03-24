import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/auth/useAuth";
import { useUserFeed } from "../../contexts/feed/useUserFeed";
import { logout } from "../../contexts/auth/AuthSlice";
import styles from "./Profile.module.css";

export const ProfileView = () => {
  const { dispatch } = useAuth();
  const { feedUser, setViewMode, viewMode } = useUserFeed();
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
            {feedUser.data.firstname}
          </span>
        </div>
        <div className={styles.profileDetail}>
          <span className={styles.profileDetailLabel}>Last Name:</span>
          <span className={styles.profileDetailContent}>
            {feedUser.data.lastname}
          </span>
        </div>
        <div className={styles.profileDetail}>
          <span className={styles.profileDetailLabel}>Location:</span>
          <span className={styles.profileDetailContent}>
            {feedUser.data.location}
          </span>
        </div>
        <div className={styles.profileDetail}>
          <span className={styles.profileDetailLabel}>Bio:</span>
          <span className={styles.profileDetailContent}>
            {feedUser.data.aboutMe}
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
