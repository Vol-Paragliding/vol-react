import React from "react";

import { useFeed } from "../../contexts/feed/useFeed";
import FeedActivity from "./FeedActivity";
import styles from "./Feeds.module.css";

const FeedsView: React.FC = () => {
  const { userActivities } = useFeed();

  // if (isLoading) {
  //   return <div>Loading userActivities...</div>;
  // }

  return (
    <div className={styles.feedsView}>
      {userActivities.map((activity) => (
        <FeedActivity
          key={activity.id}
          activity={activity}
        />
      ))}
    </div>
  );
};

export default FeedsView;
