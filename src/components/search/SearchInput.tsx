import React from "react";
import styles from "./SearchView.module.css";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <input
      className={styles.searchForm}
      autoFocus
      type="text"
      name="searchTerm"
      value={searchTerm}
      placeholder="Search users..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchInput;
