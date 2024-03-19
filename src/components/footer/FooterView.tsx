import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import MessageIcon from "@material-ui/icons/Message";
import AddBoxIcon from "@material-ui/icons/AddBox";

import styles from "./Footer.module.css";

type IconTabProps = {
  icon: JSX.Element;
  to: string;
};

const IconTab: React.FC<IconTabProps> = ({ icon, to }) => (
  <Link to={to} className={styles.iconLink}>
    {icon}
  </Link>
);

const FooterView = () => (
  <div className={styles.tabContainer}>
    <IconTab icon={<HomeIcon />} to="/" />
    <IconTab icon={<SearchIcon />} to="/search" />
    <IconTab icon={<MessageIcon />} to="/messages" />
    <IconTab icon={<AddBoxIcon />} to="/newpost" />
  </div>
);

export default FooterView;
