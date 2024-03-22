import React, { useState, useRef } from "react";

import { useAuth } from "../../contexts/auth/useAuth";
import { useUserFeed } from "../../contexts/feed/useUserFeed";
import { UserData } from "../feeds/services/FeedService";
import { updateUser, uploadImage } from "../feeds/services/FeedService";
import styles from "./Profile.module.css";

export const EditProfileView = () => {
  const { state: authState } = useAuth();
  const { feedUser, setFeedUser, setViewMode } = useUserFeed();

  const [userData, setUserData] = useState<UserData>({
    firstname: feedUser?.data.firstname || "",
    lastname: feedUser?.data.lastname || "",
    aboutMe: feedUser?.data.aboutMe || "",
    location: feedUser?.data.location || "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null | undefined>(
    feedUser?.data.profilePicture
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof UserData
  ) => {
    setUserData({ ...userData, [field]: event.target.value });
  };

  const handleImageContainerClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return null;
    try {
      const { name: fileName, type: mimeType } = selectedFile;
      const uploadResult = await uploadImage(
        fileName,
        mimeType,
        selectedFile,
        authState.authUser?.feedToken || ""
      );
      return uploadResult ? uploadResult.toString() : null;
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!userData) {
      console.error("No user data to submit.");
      return;
    }

    try {
      let imageUrl = imageSrc;
      if (selectedFile) imageUrl = await handleUpload();

      const updatedUserData = {
        ...userData,
        profilePicture: imageUrl || userData.profilePicture,
      };

      const updatedUser = await updateUser(
        updatedUserData,
        authState.authUser?.userId || "",
        authState.authUser?.feedToken || ""
      );

      setFeedUser(updatedUser);
      setViewMode("profile");
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  return (
    <div className={`${styles.slideIn}`}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={styles.profileContainer}
      >
        <h2 className={styles.profileHeader}>Edit profile</h2>
        <hr className={styles.hr} />
        <div
          className={`${styles.profileImageContainer} ${styles.editProfileImageContainer}`}
          onClick={handleImageContainerClick}
        >
          <input
            className={styles.fileInput}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            ref={fileInputRef}
          />
          {imageSrc ? (
            <img src={imageSrc} alt="Profile" className={styles.profilePic} />
          ) : (
            <p className={styles.updateImage}>Update image</p>
          )}
        </div>
        <input
          className={styles.formInput}
          value={userData.firstname}
          onChange={(e) => handleInputChange(e, "firstname")}
          placeholder="Firstname"
        />
        <input
          className={styles.formInput}
          value={userData.lastname}
          onChange={(e) => handleInputChange(e, "lastname")}
          placeholder="Lastname"
        />
        <input
          className={styles.formInput}
          value={userData.location}
          onChange={(e) => handleInputChange(e, "location")}
          placeholder="Location"
        />
        <textarea
          className={styles.formInput}
          value={userData.aboutMe}
          onChange={(e) => handleInputChange(e, "aboutMe")}
          placeholder="Bio"
        />
        <button
          className={`${styles.actionButton} ${styles.saveButton}`}
          onClick={handleSubmit}
        >
          Save
        </button>
        <button
          className={`${styles.actionButton} ${styles.cancelButton}`}
          onClick={() => setViewMode("profile")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
