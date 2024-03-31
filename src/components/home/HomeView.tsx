import React from "react";
import { Routes, Route } from "react-router-dom";

import FeedsView from "../feeds/FeedsView";
import SearchView from "../search/SearchView";
import DirectMessagesView from "../chat/DirectMessagesView";
import AddNewPostView from "../timeline/AddNewPostView";
import styles from "./HomeView.module.css";

const HomeView: React.FC = () => {
  return (
    <div className={styles.mainContent}>
      <Routes>
        <Route index element={<FeedsView />} />
        <Route path="search" element={<SearchView />} />
        <Route path="messages" element={<DirectMessagesView />} />
        <Route path="newpost" element={<AddNewPostView />} />
      </Routes>
    </div>
  );
};

export default HomeView;
