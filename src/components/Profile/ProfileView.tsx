import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/useAuth";
import { useUserFeed } from "../../contexts/feed/useUserFeed";
import { logout } from "../../contexts/auth/AuthSlice";
import styles from "./Profile.module.css";

export const ProfileView = () => {
  const { dispatch } = useAuth();
  const { feedUser, setViewMode } = useUserFeed();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/");
  };

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
      <div>
        <button
          className={styles.editButton}
          onClick={() => setViewMode("edit")}
        >
          Edit
        </button>
        <button className={styles.editButton} onClick={() => setViewMode("")}>
          Close
        </button>
        <button className={styles.editButton} onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};
