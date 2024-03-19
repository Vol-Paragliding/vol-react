import { createContext, useState, useEffect } from "react";

import { useAuth } from "../auth/useAuth";
import { FeedUser } from "../../components/feeds/types/feedTypes";
import { getUser } from "../../components/feeds/services/FeedService";

interface UserFeedContextType {
  feedUser: FeedUser | null;
  setFeedUser: React.Dispatch<React.SetStateAction<FeedUser | null>>;
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<string>>;
}

export const UserFeedContext = createContext<UserFeedContextType | null>(null);

export const UserFeedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [feedUser, setFeedUser] = useState<FeedUser | null>(null);
  const [viewMode, setViewMode] = useState("");
  const { state } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (state.authUser) {
        const user = await getUser(
          state.authUser.userId,
          state.authUser.feedToken
        );
        setFeedUser(user);
      }
    };

    fetchUser();
  }, [state.authUser]);

  return (
    <UserFeedContext.Provider
      value={{ feedUser, setFeedUser, viewMode, setViewMode }}
    >
      {children}
    </UserFeedContext.Provider>
  );
};
