import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { SearchContex } from "../../App";
const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContex);

  return (
    <div className={styles.root}>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />

      {searchValue && (
        <svg
          onClick={() => setSearchValue("")}
          className={styles.clearIcon}
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 50 50"
        >
          <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
        </svg>
      )}
    </div>
  );
};

export default Search;
