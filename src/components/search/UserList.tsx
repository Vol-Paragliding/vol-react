import React from "react";
import { UserResponse } from "stream-chat";

import { UserAvatar } from "../profile/UserAvatar";
import styles from "./SearchView.module.css";

interface UserListProps {
  users: UserResponse[];
  renderLoadMore: boolean;
  handleGetMoreUsersClick: () => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  renderLoadMore,
  handleGetMoreUsersClick,
}) => {
  return (
    <div className={styles.resultsContainer}>
      {users.map((user) => (
        <div className={styles.userCard} key={user.id}>
          <div className={styles.userListAvatar}>
            <UserAvatar url={String(user.image || "")} />
          </div>
          <div className={styles.userInfo}>
            {/* {console.log("users", users)} */}
            {/* TODO: render full name, which does not exist on user */}
            <h2>{user.name || user.id}</h2>
            <p>{user.id}</p>
          </div>
        </div>
      ))}
      {renderLoadMore && (
        <button
          onClick={handleGetMoreUsersClick}
          className={styles.searchButton}
        >
          Load more users
        </button>
      )}
    </div>
  );
};

export default UserList;
