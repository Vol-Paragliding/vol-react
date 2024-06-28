import React from "react";
import { IGCFileAttachment, PostActivity } from "../../interfaces/types";
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

  const igcAttachment = attachments.find(
    (attachment) => attachment.type === "igc"
  ) as IGCFileAttachment | undefined;

  const flightStats = igcAttachment ? igcAttachment.data : undefined;

  return (
    <div className={styles.activityContainer}>
      <ActivityHeader
        actor={activity.actor}
        time={activity.time}
        stats={flightStats}
      />
      {attachments.map((attachment, index) => (
        <Attachment key={index} attachment={attachment} />
      ))}
      <ActivityFooter
        activity={activity}
        object={activity.object as string}
      />
    </div>
  );
};

export default FeedActivity;
