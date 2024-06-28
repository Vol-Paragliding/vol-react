import { StatusUpdateForm } from "react-activity-feed";
import "react-activity-feed/dist/index.css";

import styles from "./AddNewPost.module.css";

const Timeline = () => {
  return (
    <div className={styles.addNewPostView}>
      <StatusUpdateForm
        emojiI18n={{
          search: "Type here to search...",
          categories: { recent: "Recent Emojis" },
        }}
      />
    </div>
  );
};

export default Timeline;
