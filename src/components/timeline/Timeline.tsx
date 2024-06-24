import {
  FlatFeed,
  Activity,
  ActivityFooter,
  LikeButton,
  CommentField,
  CommentList,
  CommentItem,
  InfiniteScrollPaginator,
} from "react-activity-feed";
import "react-activity-feed/dist/index.css";

import FileUploadForm from "./FileUploadForm";
import styles from "./AddNewPost.module.css";

const Timeline = () => {
  const renderAttachments = (attachments) => {
    if (!attachments) return null;
    console.log(attachments, "");
    return attachments.files.map((attachment, index) => {
      if (attachment.type === "igc") {
        return (
          <div key={index}>
            <a href={attachment.url} download>
              {attachment.url.split("/").pop()}
            </a>
            {attachment.data && (
              <div>
                <p>Flight Duration: {attachment.data.duration}</p>
                <p>Max Altitude: {attachment.data.maxAltitude}</p>
                {/* Add more stats as needed */}
              </div>
            )}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className={styles.timelineView}>
      <FileUploadForm />
      <FlatFeed
        notify
        feedGroup="user"
        options={{ limit: 6, withOwnChildren: true, withRecentReactions: true }}
        Paginator={InfiniteScrollPaginator}
        Activity={({ activity, feedGroup, userId }) => {
          console.log("Rendering activity:", activity);

          return (
            <Activity
              activity={activity}
              feedGroup={feedGroup}
              userId={userId}
              Footer={() => (
                <>
                  {renderAttachments(activity.attachments)}
                  <ActivityFooter
                    activity={activity}
                    feedGroup={feedGroup}
                    userId={userId}
                  />
                  <CommentField activity={activity} />
                  <CommentList
                    activityId={activity.id}
                    CommentItem={({ comment }) => (
                      <div className="wrapper">
                        <CommentItem comment={comment} />
                        <LikeButton reaction={comment} />
                      </div>
                    )}
                  />
                </>
              )}
            />
          );
        }}
      />
    </div>
  );
};

export default Timeline;
