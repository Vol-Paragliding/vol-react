import React from "react";

import { PostActivity } from "../../interfaces/types";
import styles from "./Feeds.module.css";

const FeedActivity: React.FC<{ activity: PostActivity }> = ({
  activity,
}) => {
  return (
    <div className={styles.activityContainer}>
      <h3 className={styles.activityTitle}>{activity.verb}</h3>
      <p className={styles.activityDescription}>{activity.object}</p>
      <span className={styles.activityTimestamp}>{activity.time}</span>
    </div>
  );
};

export default FeedActivity;
