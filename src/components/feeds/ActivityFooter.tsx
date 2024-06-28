/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import styles from "./Feeds.module.css";
import {
  CommentField,
  CommentItem,
  CommentList,
  LikeButton,
} from "react-activity-feed";

const ActivityFooter: React.FC<{
  activity: any;
  object: string;
}> = ({ activity, object }) => {
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
        <span className={styles.activityFooterName}>{activity.actor.id}</span>
        <p className={styles.activityDescription} onClick={handleToggleExpand}>
          {renderDescription()}
        </p>
      </div>
      <>
        <LikeButton reaction={activity} />
        <CommentField activity={activity} />
        <CommentList
          activityId={activity.id}
          CommentItem={({ comment }) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CommentItem comment={comment} />
              <LikeButton reaction={comment} />
            </div>
          )}
        />
      </>
    </div>
  );
};

export default ActivityFooter;
