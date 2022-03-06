import React, { useRef, useState, useContext, useEffect } from "react";
import styles from "./movies.module.css";
import { AuthContext } from "../context/AuthContext.jsx";

const Movies = ({ title, poster, onVideoClick }) => {
  const [check, setCheck] = useState(false);

  const movieRef = useRef();

  const { selectedVideoTitle, removeVideo, selectList } =
    useContext(AuthContext);

  useEffect(() => {
    selectList({ videoList: selectedVideoTitle.length });
  });

  const onClick = (e) => {
    if (selectedVideoTitle.length > 9) {
      alert("컨텐츠는 최대 10개까지 선택 가능합니다.");
    } else {
      onVideoClick(title);
      setCheck(true);
    }

    for (let keys in selectedVideoTitle) {
      if (selectedVideoTitle[keys] === title) {
        removeVideo({ videoTitle: title });
        setCheck(false);
      }
    }
  };

  return (
    <div>
      <li
        className={`${styles.movieContainer} ${
          check ? styles.selectedVideo : null
        }`}
        onClick={onClick}
      >
        <img className={styles.moviePoster} src={poster} alt="movie poster" />
        <h4 ref={movieRef} className={styles.movieTitle}>
          {title}
        </h4>
      </li>
    </div>
  );
};

export default Movies;
