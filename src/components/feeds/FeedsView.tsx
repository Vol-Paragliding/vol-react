import React from "react";

import { useFeed } from "../../contexts/feed/useFeed";
import FeedActivity from "./FeedActivity";
import styles from "./Feeds.module.css";
import { FlatFeed } from "react-activity-feed";

const FeedsView: React.FC = () => {
  const { userActivities } = useFeed();

  console.log(userActivities);
  return (
    <div className={styles.feedsView}>
      <FlatFeed
        feedGroup="user"
        options={{ limit: 2, withOwnChildren: true, withRecentReactions: true }}
        Placeholder={() => <div>No activities yet...</div>}
        Activity={({ activity }) => (
          <>
            <FeedActivity key={activity.id} activity={activity} />
          </>
        )}
      />
    </div>
  );
};

export default FeedsView;
