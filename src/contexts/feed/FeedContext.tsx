import React, { createContext, useState, useEffect } from "react";
import {
  connect,
  DefaultGenerics,
  NewActivity,
  StreamFeed,
  StreamUser,
} from "getstream";

import { useAuth } from "../auth/useAuth";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY || "";
const appId = import.meta.env.VITE_APP_STREAM_APP_ID || "";

interface FeedContextType {
  feedUser: StreamUser | null;
  setFeedUser: React.Dispatch<React.SetStateAction<StreamUser | null>>;
  feedClient: StreamFeed<DefaultGenerics> | null;
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<string>>;
  userActivities: NewActivity<DefaultGenerics>[];
  setUserActivities: React.Dispatch<
    React.SetStateAction<NewActivity<DefaultGenerics>[]>
  >;
  addActivity: (newActivity: NewActivity) => Promise<void>;
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
  const [userActivities, setUserActivities] = useState<
    NewActivity<DefaultGenerics>[]
  >([]);

  useEffect(() => {
    if (authState.isAuthenticated && authState.authUser) {
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
          setUserActivities(
            activityResponse.results as NewActivity<DefaultGenerics>[]
          );
        } catch (error) {
          console.error("Error fetching user and activities: ", error);
        }
      };

      fetchInitialData();
    }
  }, [authState]);

  const addActivity = async (newActivity: NewActivity) => {
    if (!feedClient) return;
    try {
      await feedClient.addActivity(newActivity);
      setUserActivities((prevActivities) => [newActivity, ...prevActivities]);
    } catch (error) {
      console.error("Error adding activity: ", error);
      throw error;
    }
  };

  const getActivities = async () => {
    if (!feedClient) return;
    try {
      const response = await feedClient.get({ limit: 10 });
      // const activities: NewActivity<DefaultGenerics>[] = response.results.map(activity => ({
      //   actor: activity.actor,
      //   object: activity.object,
      //   verb: activity.verb,
      //   foreign_id: activity.foreign_id,
      //   time: activity.time,
      // }));
      const activities = response.results as NewActivity<DefaultGenerics>[];
      setUserActivities(activities);
    } catch (error) {
      console.error("Error fetching user activities: ", error);
      throw error;
    }
  };

  const contextValue: FeedContextType = {
    feedUser,
    setFeedUser,
    feedClient,
    viewMode,
    setViewMode,
    userActivities,
    setUserActivities,
    addActivity,
    getActivities,
  };

  return (
    <FeedContext.Provider value={contextValue}>{children}</FeedContext.Provider>
  );
};
