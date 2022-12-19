import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as spotActions from "../../store/userSpots";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom'
import './editSpot.css'

function EditSpot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const history = useHistory();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  // const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);

  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    return dispatch(spotActions.editSpot({ address, city, state, country, name, description, price }, spotId))
      .then(() => history.push('/mySpots'))
      .catch(async (res) => {
        if (res && res.errors) setErrors(res.errors);
      });

  };

  useEffect(() => {
    const errs = []
    if (address.length < 3 && address.length !== 0) errs.push("Invalid address")
    if (city.length < 2 && city.length !== 0) errs.push("Invalid city")
    if (state.length < 2 && state.length !== 0) errs.push("Invalid state")
    if (country.length < 2 && country.length !== 0) errs.push("Invalid country")
    if (name.length < 2 && name.length !== 0) errs.push("Invalid name")
    if (description.length < 12 && description.length !== 0) errs.push("Mininum 12 characters for description")
    if (price < 0) errs.push("Price must be higher than 0")
    setValidationErrors(errs)
  }, [address, city, state, country, name, description, price, setValidationErrors])

  return (
    <>
      <h2 className="title-addSpot">Edit your Spot!</h2>
      <div className="form-main">

        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <ul className="errors">
            {validationErrors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <label className="spot-label">
            Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label className="spot-label">
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label className="spot-label">
            State
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <label className="spot-label">
            Country
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <label className="spot-label">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="spot-label">
            Description
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label className="spot-label">
            Price
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label >
          {/* <label className="spot-label">
            Image Url
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label> */}
          <button type="submit" className="submit-addSpot">Confirm</button>
        </form>
      </div>
    </>
  );
}

export default EditSpot;
