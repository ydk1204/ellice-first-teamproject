import React from "react";
import VideoItem from "./movies.jsx";

const Movie_list = ({ movies, onVideoClick }) => {
  return (
    <ul>
      {movies.map((video) => (
        <VideoItem
          key={video.id}
          title={video.title}
          year={video.year}
          poster={video.medium_cover_image}
          onVideoClick={onVideoClick}
        />
      ))}
    </ul>
  );
};

export default Movie_list;
