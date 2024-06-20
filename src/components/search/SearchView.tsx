import React, { useState, useEffect, useCallback } from "react";
import { UserResponse } from "stream-chat";

import { useChat } from "../../contexts/chat/useChat";
import SearchInput from "./SearchInput";
import UserList from "./UserList";
import styles from "./SearchView.module.css";

const USERS_PER_PAGE = 10;

const SearchView: React.FC = () => {
  const { chatClient } = useChat();
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [renderLoadMore, setRenderLoadMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const queryUsers = useCallback(
    async (filter: object, sort: object, options: object) => {
      if (!chatClient) {
        return null;
      }

      try {
        return await chatClient.queryUsers(filter, sort, options);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
        return null;
      }
    },
    [chatClient]
  );

  const getAllUsers = useCallback(async () => {
    if (!chatClient || !chatClient.user) {
      setError("Chat client not initialized or user not connected");
      return;
    }

    const filter = { id: { $ne: chatClient.userID || "" } };
    const sort = { last_active: 1 as const };
    const options = { limit: USERS_PER_PAGE, offset: 0 };

    const response = debouncedTerm
      ? await queryUsers(
          { username: { $autocomplete: debouncedTerm } },
          sort,
          options
        )
      : await queryUsers(filter, sort, options);

    if (response) {
      setUsers(response.users);
      setOffset(USERS_PER_PAGE);
      setRenderLoadMore(response.users.length === USERS_PER_PAGE);
    } else {
      setRenderLoadMore(false);
    }
    setLoading(false);
  }, [chatClient, debouncedTerm, queryUsers]);

  useEffect(() => {
    if (chatClient && chatClient.user) {
      getAllUsers();
    }
  }, [debouncedTerm, chatClient, getAllUsers]);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      if (searchTerm === "") {
        setOffset(0);
        setRenderLoadMore(true);
      }
    }, 500);

    return () => {
      clearTimeout(timerID);
    };
  }, [searchTerm]);

  const handleGetMoreUsersClick = useCallback(async () => {
    if (!chatClient || !chatClient.user) {
      setError("Chat client not initialized or user not connected");
      return;
    }

    const filter = { id: { $ne: chatClient.userID || "" } };
    const sort = { last_active: -1 as const };
    const options = { offset: offset + USERS_PER_PAGE, limit: USERS_PER_PAGE };

    const response = await queryUsers(filter, sort, options);

    if (response) {
      setUsers((prevUsers) => [...prevUsers, ...response.users]);
      setOffset((prevOffset) => prevOffset + USERS_PER_PAGE);
      setRenderLoadMore(response.users.length === USERS_PER_PAGE);
    } else {
      setRenderLoadMore(false);
    }
  }, [chatClient, offset, queryUsers]);

  return (
    <div className={styles.userList}>
      <h1 className={styles.userListHeader}>Search</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.searchContainer}>
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <UserList
            users={users}
            renderLoadMore={renderLoadMore}
            handleGetMoreUsersClick={handleGetMoreUsersClick}
          />
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default SearchView;
