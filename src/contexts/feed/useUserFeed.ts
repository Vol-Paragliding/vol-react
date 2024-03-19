import { useContext } from "react";
import { UserFeedContext } from "./UserFeedContext";

export const useUserFeed = () => {
  const context = useContext(UserFeedContext);

  if (!context) {
    throw new Error("useUserProfile must be used within a UserFeedProvider");
  }

  return context;
};
