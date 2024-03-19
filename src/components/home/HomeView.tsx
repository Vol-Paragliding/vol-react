import {
  useEffect,
  //  useState, useReducer,
  lazy,
  Suspense,
} from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./HomeView.module.css";

const HeaderView = lazy(() => import("../header/HeaderView"));
const FeedsView = lazy(() => import("../feeds/FeedsView"));
const SearchView = lazy(() => import("../search/SearchView"));
const DirectMessagesView = lazy(() => import("../chat/DirectMessagesView"));
const AddNewPostView = lazy(() => import("../timeline/AddNewPostView"));
const FooterView = lazy(() => import("../footer/FooterView"));

const HomeView = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  // const [localState, dispatch] = useReducer(reducer, initialState);
  // const [isAddingPost, setIsAddingPost] = useState(false);

  useEffect(() => {
    if (!state.authUser) {
      navigate("/");
    }
  }, [state.authUser, navigate]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderView />
      <div className={styles.mainContent}>
        {/* {isAddingPost && <AddNewPostView />} */}
        {/* {localState.isAddingPost && <AddNewPostView />} */}
        {/* {localState.isShowingProfile && <MyProfileInfoAndPosts />} */}
        <Routes>
          <Route path="/" element={<FeedsView />} />
          <Route path="/search" element={<SearchView />} />
          <Route path="/messages" element={<DirectMessagesView />} />
          <Route path="/newpost" element={<AddNewPostView />} />
        </Routes>
      </div>
      <FooterView />
    </Suspense>
  );
};

export default HomeView;
