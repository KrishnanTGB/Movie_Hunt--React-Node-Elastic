import React from "react";

import Movie from "./Movie";
import "./MoviesList.css";

const MoviesList = (props) => {
  return (
    <ul className="movies-list">
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          genre={movie.genre.toString()}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MoviesList;
