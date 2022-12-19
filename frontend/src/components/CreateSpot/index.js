import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as spotActions from "../../store/spots";
import './createNewSpot.css';
import { useHistory } from "react-router-dom";

function CreateNewSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [url, setUrl] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);

  const [validationErrors, setValidationErrors] = useState([]);

  //   if (sessionUser) return <Redirect to="/" />;

  // const spotId = useSelector(state => (Object.values(state.spotState.entries)).length)

  // console.log(spotId, 'this is length')

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    const check = dispatch(spotActions.addNewSpot({ address, city, state, country, name, description, price }, url))
      .then(() => dispatch(spotActions.getSpots()))

      .catch(async (_req, res) => {
        if (res && res.errors) setErrors(res.errors);
      });
    if (check) return history.push('/');
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
      <h2 className="title-addSpot">Add your hosting!</h2>
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
              placeholder="e.g. 123 Main Street"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label className="spot-label">
            City
            <input
              placeholder="e.g. New York City"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label className="spot-label">
            State
            <input
              placeholder="e.g. New York"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <label className="spot-label">
            Country
            <input
              placeholder="e.g. United States of America"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <label className="spot-label">
            Name
            <input
              placeholder="e.g. App Academy"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="spot-label">
            Description
            <textarea
              placeholder="e.g. The place where developers are made"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label className="spot-label price">
            Price
            <input
              placeholder="e.g. 100"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label className="spot-label">
            Image Url
            <input
              placeholder="e.g. https://photos.com/image.png"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
          {!!validationErrors.length && (
            <div style={{ textAlign: 'center' }}>
              Please provide valid information before submitting.
            </div>
          )}
          <button type="submit" className="submit-addSpot" disabled={!!validationErrors.length}>Confirm</button>
        </form>
      </div>
    </>

  );
}

export default CreateNewSpot;
