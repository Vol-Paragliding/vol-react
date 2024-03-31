import { useState } from "react";

import { useFeed } from "../../contexts/feed/useFeed";
import styles from "./AddNewPost.module.css";

const AddNewPostView = () => {
  const { addActivity, feedUser } = useFeed();
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      for (const file of files) {
        console.log(
          "File: ",
          file,
          file.name.toLowerCase().endsWith(".igc") ||
            file.type.startsWith("image/") ||
            file.type.startsWith("video/")
        );
        if (
          file.name.toLowerCase().endsWith(".igc") ||
          file.type.startsWith("image/") ||
          file.type.startsWith("video/")
        ) {
          try {
            let response;
            if (file.type.startsWith("image/")) {
              response = await feedUser?.client.images.upload(file);
            } else {
              response = await feedUser?.client.files.upload(file);
            }

            const newAttachment: unknown = {
              type: file.type.startsWith("image/")
                ? "image"
                : file.type.startsWith("video/")
                ? "video"
                : "file",
              url: response?.file,
            };

            setAttachments((currentAttachments: File[]) => [
              ...currentAttachments,
              newAttachment as File,
            ]);
          } catch (error) {
            console.error("Error uploading file: ", error);
            setError("Failed to upload file. Please try again later.");
          }
        } else {
          setError(
            "Unsupported file type. Please upload an image, video, or IGC file."
          );
        }
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!text.trim()) {
      setError("Please enter some text for your activity.");
      return;
    }

    const foreignId = `post:${Date.now()}-${feedUser?.id}`;

    const newActivity = {
      actor: feedUser || "",
      verb: "post",
      foreign_id: foreignId,
      object: text.trim(),
      attachments,
    };

    try {
      await addActivity(newActivity);
      setText("");
      setAttachments([]);
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
          placeholder="How was your flight?"
          className={styles.textarea}
          id="postText"
          name="postText"
        />
        <input
          id="postAttachments"
          name="postAttachments"
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".igc,image/*,video/*"
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
