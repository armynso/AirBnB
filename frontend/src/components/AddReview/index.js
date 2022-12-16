import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom'
import './addReview.css'

function AddReview() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spotState.entries)
  const sessionUser = useSelector(state => state.session.user);

  console.log(spot, "spotPagebro")
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    const check = dispatch(reviewActions.addNewReview({ review, stars }, spotId, sessionUser.firstName))
      .catch(async (_req, res) => {
        //  const data = await res.json();
        if (res && res.errors) setErrors(res.errors);
      });
    if (check) return (history.push(`/spots/${spotId}`))
  };

  return (
    <>
      <h2 className="title-addSpot">Review for {spot.address}</h2>

      <div className="form-main reviewadd">

        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className="addreview">

            <label className="spot-label">
              Write your experience!
              <textarea
                type="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </label>
            <label className="spot-label review-stars">
              Stars
              <input
                type="number"
                min="1"
                max="5"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit" className="submit-addSpot review-submit">Confirm</button>
        </form>
      </div>

    </>
  )
}

export default AddReview;
