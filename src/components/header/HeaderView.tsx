import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import MessageIcon from "@material-ui/icons/Message";
import AddBoxIcon from "@material-ui/icons/AddBox";

import appIcon from "../../assets/appIcon.png";
import { useAuth } from "../../contexts/auth/useAuth";
import { ProfileImage } from "../profile";
import styles from "./HeaderView.module.css";

const HeaderView = () => {
  const { state } = useAuth();

  return (
    <div className={styles.header}>
      <div className={styles.profileImageContainer}>
        <ProfileImage />
        {state.authUser && (
          <p className={styles.username}>{state.authUser.username}</p>
        )}
      </div>
      <div className={styles.tabContainer}>
        <Link to="/home" className={styles.iconLink}>
          <HomeIcon />
        </Link>
        <Link to="/home/search" className={styles.iconLink}>
          <SearchIcon />
        </Link>
        <Link to="/home/messages" className={styles.iconLink}>
          <MessageIcon />
        </Link>
        <Link to="/home/newpost" className={styles.iconLink}>
          <AddBoxIcon />
        </Link>
      </div>
      <img
        className={`${styles.logo} logo`}
        src={appIcon}
        alt="Paragliding logo"
      />
    </div>
  );
};

export default HeaderView;
