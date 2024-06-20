import React from "react";
import { EnrichedUser } from "getstream";

import { UserAvatar } from "../profile/UserAvatar";
import { formatDateTime } from "../utils/dateUtils";
import styles from "./Feeds.module.css";

const ActivityHeader: React.FC<{ actor: EnrichedUser; time: string }> = ({
  actor,
  time,
}) => {
  const formattedTime = formatDateTime(time);

  return (
    <div className={styles.activityHeader}>
      <div className={styles.avatarContainer}>
        <UserAvatar url={String(actor?.data?.profilePicture ?? "")} />
      </div>
      <span className={styles.activityHeaderName}>
        {String(actor.id) ?? "Unknown"}
      </span>
      <span className={styles.activityTimestamp}>{formattedTime}</span>
    </div>
  );
};

export default ActivityHeader;
