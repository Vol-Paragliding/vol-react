import React, { useState } from "react";
import styles from "./Feeds.module.css";

const ActivityFooter: React.FC<{
  actorName: string;
  object: string;
  replyCount: number;
}> = ({ actorName, object, replyCount }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderDescription = () => {
    if (isExpanded || object.length < 100) {
      return object;
    } else {
      return object.slice(0, 100) + "...";
    }
  };

  return (
    <div className={styles.activityFooter}>
      <div className={styles.footerLeft}>
        <span className={styles.activityFooterName}>{actorName}</span>
        <p className={styles.activityDescription} onClick={handleToggleExpand}>
          {renderDescription()}
        </p>
      </div>
      <div className={styles.footerLeft}>
        <span className={styles.reactionCount}>view {replyCount} comments</span>
      </div>
    </div>
  );
};

export default ActivityFooter;
