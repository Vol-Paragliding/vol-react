import React from "react";

import { useFeed } from "../../contexts/feed/useFeed";
import FeedActivity from "./FeedActivity";

const FeedsView: React.FC = () => {
  const { userActivities } = useFeed();

  // if (isLoading) {
  //   return <div>Loading userActivities...</div>;
  // }
console.log(userActivities)
  return (
    <div>
      {userActivities.map((activity) => (
        <FeedActivity
          key={activity.foreign_id || (activity.id as string)}
          activity={activity}
        />
      ))}
    </div>
  );
};

export default FeedsView;
