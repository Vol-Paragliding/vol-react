// import React, { useContext } from "react";
// import { useAuth } from "../../contexts/auth/useAuth";
// import useFeedActivities from "../../hooks/useFeedActivities";
import { useFeed } from "../../contexts/feed/useFeed";
import FeedActivity from "./FeedActivity";

const FeedsView = () => {
  // const { authState } = useAuth();
  const { userActivities } = useFeed();
  // const { userActivities, isLoading } = useFeedActivities(
  //   authState.authUser?.userId ?? "",
  //   authState.authUser?.feedToken ?? "",
  //   // "timeline"
  //   "user"
  // );

  // if (isLoading) {
  //   return <div>Loading userActivities...</div>;
  // }

  return (
    <div>
      {userActivities.map((activity) => (
        <FeedActivity key={activity.id as string} activity={activity} />
      ))}
    </div>
  );
};

export default FeedsView;
