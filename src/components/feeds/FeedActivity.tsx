import React from "react";

import { PostActivity } from "../../interfaces/types";
import ActivityFooter from "./ActivityFooter";
import ActivityHeader from "./ActivityHeader";
import Attachment from "./Attachment";
import styles from "./Feeds.module.css";

const FeedActivity: React.FC<{ activity: PostActivity }> = ({ activity }) => {

  if (activity.verb !== "post") {
    return null;
  }

  const attachments = Array.isArray(activity.attachments)
    ? activity.attachments
    : [];

  return (
    <div className={styles.activityContainer}>
      <ActivityHeader actor={activity.actor} time={activity.time} />
      {attachments.map((attachment, index) => (
        <Attachment key={index} attachment={attachment} />
      ))}
      <ActivityFooter
        actorName={String(activity.actor.data?.name)}
        object={activity.object as string}
        replyCount={activity.reactionCounts?.replyCount ?? 0}
      />
    </div>
  );
};

export default FeedActivity;
