import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  connect,
  DefaultGenerics,
  NewActivity,
  StreamFeed,
  StreamUser,
} from "getstream";

import { useAuth } from "../auth/useAuth";
import { PostActivity } from "../../interfaces/types";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY || "";
const appId = import.meta.env.VITE_APP_STREAM_APP_ID || "";

interface FeedContextType {
  feedUser: StreamUser<DefaultGenerics> | null;
  setFeedUser: React.Dispatch<
    React.SetStateAction<StreamUser<DefaultGenerics> | null>
  >;
  feedClient: StreamFeed<DefaultGenerics> | null;
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<string>>;
  userActivities: PostActivity[];
  setUserActivities: React.Dispatch<React.SetStateAction<PostActivity[]>>;
  addActivity: (newActivity: NewActivity<DefaultGenerics>) => Promise<void>;
  getActivities: () => Promise<void>;
}

export const FeedContext = createContext<FeedContextType | null>(null);

export const FeedProvider = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useAuth();
  const [feedUser, setFeedUser] = useState<StreamUser<DefaultGenerics> | null>(
    null
  );
  const [feedClient, setFeedClient] =
    useState<StreamFeed<DefaultGenerics> | null>(null);
  const [viewMode, setViewMode] = useState("");
  const [userActivities, setUserActivities] = useState<PostActivity[]>([]);

  useEffect(() => {
    if (authState.isAuthenticated && authState.authUser && !feedClient) {
      const client = connect(apiKey, authState.authUser.feedToken, appId);
      const userFeed = client.feed("user", authState.authUser.userId);

      setFeedClient(userFeed);

      const fetchInitialData = async () => {
        try {
          if (!authState.authUser) return;

          const userResponse = await client
            .user(authState.authUser.userId)
            .get();
          setFeedUser(userResponse);

          const activityResponse = await userFeed.get({ limit: 10 });
          const activities = activityResponse.results as PostActivity[];
          setUserActivities(activities);
        } catch (error) {
          console.error("Error fetching user and activities: ", error);
        }
      };

      fetchInitialData();
    }
  }, [authState, feedClient]);

  const addActivity = useCallback(
    async (newActivity: NewActivity<DefaultGenerics>) => {
      if (!feedClient) return;
      try {
        const postActivity = (await feedClient.addActivity(
          newActivity
        )) as unknown as PostActivity;
        setUserActivities((prevActivities) => [
          postActivity,
          ...prevActivities,
        ]);
      } catch (error) {
        console.error("Error adding activity: ", error);
        throw error;
      }
    },
    [feedClient]
  );

  const getActivities = useCallback(async () => {
    if (!feedClient) return;
    try {
      const response = await feedClient.get({ limit: 10 });
      const activities = response.results as PostActivity[];
      setUserActivities(activities);
    } catch (error) {
      console.error("Error fetching user activities: ", error);
      throw error;
    }
  }, [feedClient]);

  const contextValue = useMemo(
    () => ({
      feedUser,
      setFeedUser,
      feedClient,
      viewMode,
      setViewMode,
      userActivities,
      setUserActivities,
      addActivity,
      getActivities,
    }),
    [feedUser, feedClient, viewMode, userActivities, addActivity, getActivities]
  );

  return (
    <FeedContext.Provider value={contextValue}>{children}</FeedContext.Provider>
  );
};
