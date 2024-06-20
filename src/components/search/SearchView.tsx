import React, { useState, useEffect } from "react";
import { useChat } from "../../contexts/chat/useChat";
import { UserResponse } from "stream-chat";

const SearchView: React.FC = () => {
  const { chatClient } = useChat();
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [renderLoadMore, setRenderLoadMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllUsers = async () => {
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

        if (!response.users.length) {
          setRenderLoadMore(false);
        } else {
          setUsers(response.users);
          setOffset(10);
          if (response.users.length === 10) {
            setRenderLoadMore(true);
          } else {
            setRenderLoadMore(false);
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    if (chatClient && chatClient.user) {
      getAllUsers();
    }
  }, [debouncedTerm, chatClient]);

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

  const handleGetMoreUsersClick = async () => {
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
      setOffset((prevOffset => prevOffset + 10));
      console.log("Response from queryUsers for more users:", response);

      if (response.users.length > 0) {
        setUsers((prevUsers) => [...prevUsers, ...response.users]);
        if (response.users.length < 10) {
          setRenderLoadMore(false);
        }
      } else {
        setRenderLoadMore(false);
      }
    } catch (error) {
      console.error("Error fetching more users:", error);
    }
  };


  return (
    <div className="User-list">
      <h1 className="user-list-contacts_header">People Search</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <input
            className="search_form"
            autoFocus
            type="text"
            name="searchTerm"
            value={searchTerm}
            placeholder="Search all users..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
        </>
      )}
    </div>
  );
};

export default SearchView;
