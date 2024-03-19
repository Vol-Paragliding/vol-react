import appIcon from '../../assets/appIcon.png';
import { ProfileImage } from '../profile';
import { useAuth } from '../../contexts/auth/useAuth';
import styles from './HeaderView.module.css';

const HeaderView = () => {
  const { state } = useAuth();

  return (
    <div className={styles.header}>
      <div className={styles.profileImageContainer}>
        <ProfileImage />
        {state.authUser && <p>{state.authUser.username}</p>}
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