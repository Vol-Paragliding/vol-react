import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import {
  getUser,
  updateUser,
  createUser,
  follow,
  unfollow,
  getFollowers,
  getFollowing,
  getUserActivities,
  getTimelineActivities,
  addActivity,
  addReaction,
  addLike,
  uploadImage,
  deleteImage,
  processImage,
} from "../../services/FeedService";
import {
  FeedUser,
  PostActivity,
  UserData,
  FollowParamModel,
  UnfollowParamModel,
  ReplyReactionParamModel,
  LikeReactionParamModel,
  CdnImageOptions,
} from "../../interfaces/types";

interface FeedContextType {
  feedUser: FeedUser | null;
  setFeedUser: React.Dispatch<React.SetStateAction<FeedUser | null>>;
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<string>>;
  activities: PostActivity[];
  setActivities: React.Dispatch<React.SetStateAction<PostActivity[]>>;
  updateUser: (userData: UserData) => Promise<void>;
  createUser: (userData: UserData) => Promise<void>;
  follow: (params: FollowParamModel) => Promise<void>;
  unfollow: (params: UnfollowParamModel, target: string) => Promise<void>;
  getFollowers: () => Promise<void>;
  getFollowing: () => Promise<void>;
  getUserActivities: () => Promise<void>;
  getTimelineActivities: () => Promise<void>;
  // @ts-expect-error - Fix later
  addActivity: (activity) => Promise<void>;
  addReaction: (params: ReplyReactionParamModel) => Promise<void>;
  addLike: (params: LikeReactionParamModel) => Promise<void>;
  uploadImage: (
    fileName: string,
    mimeType: string,
    imageData: Blob
  ) => Promise<URL>;
  deleteImage: (cdnUrl: string) => Promise<void>;
  processImage: (cdnUrl: string, options: CdnImageOptions) => Promise<string>;
}

export const FeedContext = createContext<FeedContextType | null>(null);

export const FeedProvider = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useAuth();
  const [feedUser, setFeedUser] = useState<FeedUser | null>(null);
  const [viewMode, setViewMode] = useState("");
  const [activities, setActivities] = useState<PostActivity[]>([]);

  useEffect(() => {
    if (authState.isAuthenticated && authState.authUser) {
      const fetchInitialData = async () => {
        const user: FeedUser = await getUser(
          authState.authUser!.userId,
          authState.authUser!.feedToken
        );
        setFeedUser(user);

        // const userActivities: PostActivity[] = await getTimelineActivities(
        //   authState.authUser!.userId,
        //   authState.authUser!.feedToken
        // );
        const userActivities: PostActivity[] = await getUserActivities(
          authState.authUser!.userId,
          authState.authUser!.feedToken
        );
        setActivities(userActivities);
      };

      fetchInitialData();
    }
  }, [authState.isAuthenticated, authState.authUser]);

  const contextValue: FeedContextType = {
    feedUser,
    setFeedUser,
    viewMode,
    setViewMode,
    activities,
    setActivities,
    updateUser: (userData: UserData) =>
      updateUser(
        userData,
        authState.authUser?.userId || "",
        authState.authUser?.feedToken || ""
      ),
    createUser: (userData: UserData) =>
      createUser(userData, authState.authUser?.feedToken || ""),
    follow: (params: FollowParamModel) =>
      follow(
        params,
        authState.authUser?.userId || "",
        authState.authUser?.feedToken || ""
      ),
    unfollow: (params: UnfollowParamModel, target: string) =>
      unfollow(
        params,
        target,
        authState.authUser?.userId || "",
        authState.authUser?.feedToken || ""
      ),
    getFollowers: () =>
      getFollowers(
        authState.authUser?.userId || "",
        authState.authUser?.feedToken || ""
      ),
    getFollowing: () =>
      getFollowing(
        authState.authUser?.userId || "",
        authState.authUser?.feedToken || ""
      ),
    getUserActivities: () =>
      getUserActivities(
        authState.authUser?.userId || "",
        authState.authUser?.feedToken || ""
      ),
    getTimelineActivities: () =>
      getTimelineActivities(
        authState.authUser?.userId || "",
        authState.authUser?.feedToken || ""
      ),
    addActivity: (activity) =>
      addActivity(
        authState.authUser?.userId || "",
        authState.authUser?.feedToken || "",
        activity
      ),
    addReaction: (params: ReplyReactionParamModel) =>
      addReaction(
        params.activityId,
        params.reply,
        authState.authUser?.feedToken || ""
      ),
    addLike: (params: LikeReactionParamModel) =>
      addLike(params.activityId, authState.authUser?.feedToken || ""),
    uploadImage: (fileName: string, mimeType: string, imageData: Blob) =>
      uploadImage(
        fileName,
        mimeType,
        imageData,
        authState.authUser?.userId || "",
        authState.authUser?.feedToken || ""
      ),
    deleteImage: (cdnUrl: string) =>
      deleteImage(cdnUrl, authState.authUser?.feedToken || ""),
    processImage: (cdnUrl: string, options: CdnImageOptions) =>
      processImage(cdnUrl, options, authState.authUser?.feedToken || ""),
  };

  return (
    <FeedContext.Provider value={contextValue}>{children}</FeedContext.Provider>
  );
};
