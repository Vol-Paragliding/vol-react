import React, { useState } from "react";
import { useAuth } from "../../contexts/auth/useAuth";
import { useUserFeed } from "../../contexts/feed/useUserFeed";
import { UserData } from "../feeds/services/FeedService";
import { updateUser, uploadImage } from "../feeds/services/FeedService";
import styles from "./Profile.module.css";

export const EditProfileView = () => {
  const { state } = useAuth();
  const { feedUser, setFeedUser, setViewMode } = useUserFeed();

  const [userData, setUserData] = useState<UserData>({
    firstname: feedUser?.data.firstname || "",
    lastname: feedUser?.data.lastname || "",
    aboutMe: feedUser?.data.aboutMe || "",
    location: feedUser?.data.location || "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UserData
  ) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUserData({ ...userData, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const { name: fileName, type: mimeType } = selectedFile;

      try {
        const uploadedImageUrl = await uploadImage(
          fileName,
          mimeType,
          selectedFile,
          state.autUser?.feedToken || ""
        );

        return uploadedImageUrl.toString();
      } catch (error) {
        console.error("Error uploading image: ", error);
        return "";
      }
    }
  };

  const handleSubmit = async () => {
    if (userData) {
      try {
        const imageUrl = await handleUpload();

        if (imageUrl) {
          const updatedUserData = { ...userData, profilePicture: imageUrl };
          const updatedUser = await updateUser(
            updatedUserData,
            state.autUser?.userId || "",
            state.autUser?.feedToken || ""
          );
          setFeedUser(updatedUser);
          setViewMode("profile");
        }
      } catch (error) {
        console.error("Error updating user: ", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.profilePicInput}>
          <input
            className={styles.fileInput}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <div className={styles.profileImageContainer}>
            {userData.profilePicture ? (
              <img
                src={userData.profilePicture.toString()}
                alt="Profile"
                className={styles.profilePic}
              />
            ) : (
              <p>Update your image</p>
            )}
          </div>
        </div>
        <div>
          <label>Firstname</label>
          <input
            value={userData.firstname}
            onChange={(e) => handleInputChange(e, "firstname")}
          />
        </div>
        <div>
          <label>Lastname</label>
          <input
            value={userData.lastname}
            onChange={(e) => handleInputChange(e, "lastname")}
          />
        </div>
        <div>
          <label>Bio</label>
          <input
            value={userData.aboutMe}
            onChange={(e) => handleInputChange(e, "aboutMe")}
          />
        </div>
        <div>
          <label>Location</label>
          <input
            value={userData.location}
            onChange={(e) => handleInputChange(e, "location")}
          />
        </div>
        <button className="submit-button" type="button" onClick={handleSubmit}>
          Save
        </button>
        <button
          className="action-button"
          type="button"
          onClick={() => setViewMode("profile")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
