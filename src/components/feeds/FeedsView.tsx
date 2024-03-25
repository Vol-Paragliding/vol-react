// import React, { useContext } from "react";
// import { useAuth } from "../../contexts/auth/useAuth";
// import useFeedActivities from "../../hooks/useFeedActivities";
import { useFeed } from "../../contexts/feed/useFeed";
import FeedActivity from "./FeedActivity";

const FeedsView = () => {
  // const { state: authState } = useAuth();
  const { activities } = useFeed();
  // const { activities, isLoading } = useFeedActivities(
  //   authState.authUser?.userId ?? "",
  //   authState.authUser?.feedToken ?? "",
  //   // "timeline"
  //   "user"
  // );

  // if (isLoading) {
  //   return <div>Loading activities...</div>;
  // }

  return (
    <div>
      {activities.map((activity) => (
        <FeedActivity key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default FeedsView;
