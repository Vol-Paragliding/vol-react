import React from "react";
import { NewActivity } from "getstream";

import styles from "./Feeds.module.css";

const FeedActivity: React.FC<{ activity: NewActivity }> = ({
  activity,
}) => {
  return (
    <div className={styles.activityContainer}>
      <h3 className={styles.activityTitle}>{activity.verb}</h3>
      <p className={styles.activityDescription}>{activity.object as string}</p>
      <span className={styles.activityTimestamp}>{activity.time}</span>
    </div>
  );
};

export default FeedActivity;
