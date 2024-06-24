/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFeed } from "../../contexts/feed/useFeed";
import { parseIgcFile, extractFlightStatistics } from "../../utils/igcParser";
import styles from "./AddNewPost.module.css";

const FileUploadForm = () => {
  const { addActivity, feedUser } = useFeed();
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [attachments, setAttachments] = useState<any[]>([]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      for (const file of files) {
        if (
          file.name.toLowerCase().endsWith(".igc") ||
          file.type.startsWith("image/") ||
          file.type.startsWith("video/")
        ) {
          try {
            let attachment: any = {}; // Initialize as any type
            if (file.name.toLowerCase().endsWith(".igc")) {
              const igcContent = await file.text();
              const igcData = parseIgcFile(igcContent);
              if (igcData) {
                const flightStats = extractFlightStatistics(igcData);
                const response = await feedUser?.client.files.upload(file);
                if (response?.file) {
                  attachment = {
                    type: "igc",
                    url: response.file,
                    data: flightStats,
                  };
                }
              } else {
                setError("Failed to parse IGC data.");
              }
            } else {
              const response = file.type.startsWith("image/")
                ? await feedUser?.client.images.upload(file)
                : await feedUser?.client.files.upload(file);
              attachment = {
                type: file.type.startsWith("image/") ? "image" : "video",
                url: response?.file ?? "",
              };
            }
            setAttachments((current) => [...current, attachment]);
          } catch (error) {
            console.error("Error processing file: ", error);
            setError("Failed to process file. Please try again later.");
          }
        } else {
          setError(
            "Unsupported file type. Please upload an IGC, image, or video file."
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
      console.error("Error adding activity: ", error);
      setError("Failed to add activity. Please try again later.");
    }
  };

  return (
    <div className={styles.fileUploadForm}>
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit} className={styles.uploadForm}>
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
        />
        <button type="submit" className={styles.submitButton}>
          Post
        </button>
      </form>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default FileUploadForm;
