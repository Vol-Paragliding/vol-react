import React, { useState, useEffect, useCallback } from "react";
import { useChat } from "../../contexts/chat/useChat";
import { UserResponse } from "stream-chat";
import SearchInput from "./SearchInput";
import UserList from "./UserList";

const SearchView: React.FC = () => {
  const { chatClient } = useChat();
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [renderLoadMore, setRenderLoadMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getAllUsers = useCallback(async () => {
    if (!chatClient || !chatClient.user) {
      setError("Chat client not initialized or user not connected");
      return;
    }

    const filter = {
      id: { $ne: chatClient.userID || "" },
    };

    const sort = { last_active: -1 as const };
    const options = { limit: 10, offset: 0 };

    try {
      let response;
      if (debouncedTerm === "") {
        response = await chatClient.queryUsers(filter, sort, options);
      } else {
        response = await chatClient.queryUsers({
          username: { $autocomplete: debouncedTerm },
        });
      }

      console.log("Response from queryUsers:", response);

      if (response.users.length) {
        setUsers(response.users);
        setOffset(10);
        setRenderLoadMore(response.users.length === 10);
      } else {
        setRenderLoadMore(false);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  }, [chatClient, debouncedTerm]);

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

    const filter = {
      id: { $ne: chatClient.userID || "" },
    };
    const sort = { last_active: -1 as const };
    const options = { offset: offset + 10, limit: 10 };

    try {
      const response = await chatClient.queryUsers(filter, sort, options);
      setOffset((prevOffset) => prevOffset + 10);
      console.log("Response from queryUsers for more users:", response);

      if (response.users.length) {
        setUsers((prevUsers) => [...prevUsers, ...response.users]);
        setRenderLoadMore(response.users.length === 10);
      } else {
        setRenderLoadMore(false);
      }
    } catch (error) {
      console.error("Error fetching more users:", error);
      setError("Error fetching more users");
    }
  }, [chatClient, offset]);

  return (
    <div className="User-list">
      <h1 className="user-list-contacts_header">People Search</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <UserList
            users={users}
            renderLoadMore={renderLoadMore}
            handleGetMoreUsersClick={handleGetMoreUsersClick}
          />
        </>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default SearchView;
