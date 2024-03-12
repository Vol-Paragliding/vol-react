import React from "react";
import { PostActivity } from "../types/feedTypes";

interface FeedItemProps {
  activity: PostActivity;
}

const FeedItem: React.FC<FeedItemProps> = ({ activity }) => {
  return (
    <div className="feed-item">
      <h3>
        {activity.actor} {activity.actor}
      </h3>
      <p>{activity.object}</p>
    </div>
  );
};

export default FeedItem;
