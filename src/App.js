import React, { useState, useEffect, useCallback, useRef } from "react";
import { Toast } from "react-bootstrap";

import MoviesList from "./components/MoviesList";
import Modal from "./components/Modal";
import useModal from "./customhooks/useModal";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [toastResult, setToastResult] = useState("");
  const { isShowing, toggle } = useModal();
  const searchTermRef = useRef();

  // Function to search and get the records from the database
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const searchTerm = searchTermRef.current.value;

    let apiURL = "http://localhost:3000/search?movie=$value";

    apiURL = apiURL.replace("$value", encodeURIComponent(searchTerm));
    try {
      const response = await fetch(apiURL);

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const data = await response.json();

      const transformedMoviesData = data.movies.map((movieData) => {
        return {
          id: movieData._id,
          title: movieData._source.name,
          genre: movieData._source.category,
          openingText: movieData._source.description,
        };
      });
      setMovies(transformedMoviesData);
    } catch (Error) {
      setError(Error.message);
    }
    setIsLoading(false);
  }, []);

  // Function to delete a record from the database
  const deleteMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setShow(true);

    const deleteRecordId = deleteID;

    let apiURL = "http://localhost:3000/delete/$value";

    apiURL = apiURL.replace("$value", encodeURIComponent(deleteRecordId));
    try {
      const response = await fetch(apiURL);

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const data = await response.json();

      const responseData = data.msg;

      setToastResult(responseData);

      console.log(responseData);
    } catch (Error) {
      setError(Error.message);
      setToastResult("Something went wrong!!");
    }
    fetchMoviesHandler();
    setIsLoading(false);
  }, [fetchMoviesHandler, deleteID]);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>No movies found..</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <Toast
        className="delete-acknowledgement"
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header className="d-inline-block m-1" bg="primary">
          <strong className="deleted-message">{toastResult}</strong>
        </Toast.Header>
      </Toast>

      <section>
        <div className="option-group">
          <input type="text" id="searchBox" ref={searchTermRef} />
          <button className="main-buttons" onClick={fetchMoviesHandler}>
            Fetch Movies
          </button>
          <br />
          <br />
        </div>
        <div className="option-group">
          <input
            type="text"
            id="deleteBox"
            value={deleteID}
            onChange={(e) => setDeleteID(e.target.value)}
          />
          <button
            className="button-default main-buttons"
            onClick={() => {
              setDeleteID("");
              deleteMovieHandler();
            }}
          >
            Delete Movie
          </button>
        </div>
        <br />
        <button className="button-default" onClick={toggle}>
          <span className="action-icon">+</span>Add Movie
        </button>

        <Modal isShowing={isShowing} hide={toggle} />
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
