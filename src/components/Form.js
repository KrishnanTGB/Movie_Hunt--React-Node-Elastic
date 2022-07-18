import React from "react";
import axios from "axios";

import useForm from "../customhooks/useForm";

const Form = ({ hide }) => {
  const hideModal = hide;

  // Function to return a random number
  const getRandomNumber = () => {
    const crypto = window.crypto || window.msCrypto;
    const array = new Uint32Array(1);

    return crypto.getRandomValues(array)[0];
  };

  // Function to create a record into the database
  const addMovie = async () => {
    // console.log(values);

    let bodyData = {
      name: values.title,
      category: values.genre,
      description: values.description,
    };

    const id = getRandomNumber();

    let apiURL = "http://localhost:3000/create/$id";
    apiURL = apiURL.replace("$id", encodeURIComponent(id));

    try {
      axios
        .post(apiURL, bodyData)
        .then((response) => console.log(response.data.msg))
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error.message);
    }
    hideModal();
  };

  const { values, handleChange, handleSubmit } = useForm(addMovie);

  return (
    <div className="section is-fullheight">
      <div className="container">
        <div className="column is-4 is-offset-4">
          <div className="box">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Movie Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={values.email}
                    required
                  />
                </div>
              </div>
              <br />
              <div className="field">
                <label className="label">Genre</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="genre"
                    onChange={handleChange}
                    value={values.email}
                    required
                  />
                </div>
              </div>
              <br />
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="description"
                    onChange={handleChange}
                    value={values.email}
                    required
                  />
                </div>
              </div>
              <br />
              <button
                type="submit"
                className="button is-block is-info is-fullwidth"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
