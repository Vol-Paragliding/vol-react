import React, { useState, useRef } from "react";

import { useAuth } from "../../contexts/auth/useAuth";
import { useUserFeed } from "../../contexts/feed/useUserFeed";
import { UserData } from "../feeds/services/FeedService";
import { updateUser, uploadImage } from "../feeds/services/FeedService";
import styles from "./Profile.module.css";

export const EditProfileView = () => {
  const { state } = useAuth();
  const { feedUser, setFeedUser, setViewMode, viewMode } = useUserFeed();

  const [userData, setUserData] = useState<UserData>({
    firstname: feedUser?.data.firstname || "",
    lastname: feedUser?.data.lastname || "",
    aboutMe: feedUser?.data.aboutMe || "",
    location: feedUser?.data.location || "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof UserData
  ) => {
    setUserData({ ...userData, [field]: event.target.value });
  };

  const handleImageContainerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
          state.authUser?.feedToken || ""
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
            state.authUser?.userId || "",
            state.authUser?.feedToken || ""
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
    <div className={`${viewMode === "edit" ? styles.slideIn : ""}`}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={styles.profileContainer}
      >
        <h2 className={styles.profileHeader}>Edit profile</h2>
        <hr className={styles.hr} />
        <div className={styles.profilePicInput}>
          <input
            className={styles.fileInput}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            ref={fileInputRef}
          />
          <div
            className={styles.profileImageContainer}
            onClick={handleImageContainerClick}
          >
            {userData.profilePicture ? (
              <img
                src={userData.profilePicture.toString()}
                alt="Profile"
                className={styles.profilePic}
              />
            ) : (
              <p className={styles.updateImage}>update image</p>
            )}
          </div>
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Firstname</label>
          <input
            className={styles.formInput}
            value={userData.firstname}
            onChange={(e) => handleInputChange(e, "firstname")}
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Lastname</label>
          <input
            className={styles.formInput}
            value={userData.lastname}
            onChange={(e) => handleInputChange(e, "lastname")}
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Location</label>
          <input
            className={styles.formInput}
            value={userData.location}
            onChange={(e) => handleInputChange(e, "location")}
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.formLabel}>Bio</label>
          <textarea
            className={styles.formInput}
            value={userData.aboutMe}
            onChange={(e) => handleInputChange(e, "aboutMe")}
          />
        </div>
        <button
          className={`${styles.actionButton} ${styles.saveButton}`}
          type="button"
          onClick={handleSubmit}
        >
          Save
        </button>
        <button
          className={`${styles.actionButton} ${styles.cancelButton}`}
          type="button"
          onClick={() => setViewMode("profile")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
