import React from "react";
import { NewActivity } from "getstream";

import { Attachment } from "../../interfaces/types";
import styles from "./Feeds.module.css";

const FeedActivity: React.FC<{ activity: NewActivity }> = ({ activity }) => {
  const attachments: Attachment[] = Array.isArray(activity.attachments)
    ? activity.attachments
    : [];

  return (
    <div className={styles.activityContainer}>
      <h3 className={styles.activityTitle}>{activity.verb}</h3>
      <p className={styles.activityDescription}>{activity.object as string}</p>

      {attachments.map((attachment, index) => (
        <div key={index} className={styles.attachment}>
          {attachment.type === "image" && (
            <img
              src={attachment.url}
              alt="Attachment"
              className={styles.attachmentImage}
            />
          )}

          {attachment.type === "video" && (
            <video
              controls
              className={styles.attachmentVideo}
              onError={(e) => console.log("Video cannot be loaded", e)}
            >
              <source src={attachment.url} type="video/mp4" />
              <source
                src={attachment.url.replace(".mp4", ".ogg")}
                type="video/ogg"
              />
              <source
                src={attachment.url.replace(".mp4", ".webm")}
                type="video/webm"
              />
              Your browser does not support the video tag or the video format.
            </video>
          )}

          {attachment.type === "file" && (
            <a href={attachment.url} download className={styles.attachmentLink}>
              Download IGC File
            </a>
          )}
        </div>
      ))}

      <span className={styles.activityTimestamp}>{activity.time}</span>
    </div>
  );
};

export default FeedActivity;
