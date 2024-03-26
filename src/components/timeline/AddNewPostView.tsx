import { useState } from "react";
import { useFeed } from "../../contexts/feed/useFeed";
import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./AddNewPost.module.css";

const AddNewPostView = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { addActivity, feedUser } = useFeed();
  const { state: authState } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!text.trim()) {
      setError("Please enter some text for your activity.");
      return;
    }

    const newActivity = {
      actor: `user:${feedUser?.id}`,
      // actor: feedUser?.id,
      // actor: authState.authUser?.userId,
      // actor: `user:${authState.authUser?.userId}`,
      object: text.trim(),
      verb: "post",
    };

    try {
      await addActivity(newActivity);
      setText("");
      alert("Activity added successfully!");
    } catch (error) {
      console.error("Error adding activity:", error);
      setError("Failed to add activity. Please try again later.");
    }
  };

  return (
    <div className={styles.addNewPostView}>
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit} className={styles.addNewPostForm}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className={styles.textarea}
        />
        <button type="submit" className={styles.submitButton}>
          Post
        </button>
      </form>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default AddNewPostView;
