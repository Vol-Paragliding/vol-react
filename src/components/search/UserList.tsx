import React from "react";
import { UserResponse } from "stream-chat";

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
    <ul>
      {users.length ? (
        users.map((user) => <li key={user.id}>{user.name || user.id}</li>)
      ) : (
        <p className="instructions">
          "It looks like you are the only user - Logout and Log back in as
          another user to view a list of users to choose from"
        </p>
      )}
      {renderLoadMore && (
        <button
          onClick={handleGetMoreUsersClick}
          className="lobby-logout-users"
        >
          Load more users
        </button>
      )}
    </ul>
  );
};

export default UserList;
