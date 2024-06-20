import React from "react";

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
      className="search_form"
      autoFocus
      type="text"
      name="searchTerm"
      value={searchTerm}
      placeholder="Search all users..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchInput;
