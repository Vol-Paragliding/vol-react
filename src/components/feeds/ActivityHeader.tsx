import React from "react";
import { EnrichedUser } from "getstream";

import { FlightStats } from "../../interfaces/types";
import { UserAvatar } from "../profile/UserAvatar";
import { formatDateTime } from "../utils/dateUtils";
import styles from "./Feeds.module.css";
import { FollowButton } from "react-activity-feed";

const ActivityHeader: React.FC<{
  actor: EnrichedUser;
  time: string;
  stats?: FlightStats;
}> = ({ actor, time, stats }) => {
  const formattedTime = formatDateTime(time);

  return (
    <div className={styles.activityHeader}>
      <div className={styles.avatarContainer}>
        <UserAvatar url={String(actor?.data?.profilePicture ?? "")} />
      </div>
      <span className={styles.activityHeaderName}>
        {String(actor.id) ?? "Unknown"}
      </span>
      <div className={styles.statsContainer}>
        {stats && (
          <>
            <div className={styles.statsItem}>
              <span className={styles.statsLabel}>Duration:</span>
              <span className={styles.statsValue}>{stats.flightDuration}</span>
            </div>
            <div className={styles.statsItem}>
              <span className={styles.statsLabel}>Max altitude:</span>
              <span className={styles.statsValue}>{stats.maxAltitude} m</span>
            </div>
            <div className={styles.statsItem}>
              <span className={styles.statsLabel}>Distance:</span>
              <span className={styles.statsValue}>
                {stats.totalDistance.toFixed(2)} km
              </span>
            </div>
          </>
        )}
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", marginLeft: "auto" }}
      >
        <span className={styles.activityTimestamp}>{formattedTime}</span>
        <FollowButton />
      </div>
    </div>
  );
};

export default ActivityHeader;
