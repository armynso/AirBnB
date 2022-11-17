import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import './spots.css';

function AllSpots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => (Object.values(state.spotState.entries)))
    console.log('does it run', spots)
    // const spotArr = spots.map(spot => Object.values(spot))
    // console.log(spotArr)

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    return (
      <div>
        <h1>Spots</h1>
        <div class="flex-container">
        <ul>
        {spots.map((spot) => (
          <li>
            {/* {spot.PreviewImage} */}
            <img class="Image" src="https://www.techguide.com.au/wp-content/uploads/2022/01/nicolas-saintot-xkFhOdId7mA-unsplash.jpeg"
            alt="Image not found" />
            <p>
            {spot.city} {spot.state} {spot.avgRating}<br />
            ${spot.price}
            </p>
            </li>
        ))}
      </ul>
        </div>
      {/* {spotArr} */}
      {/* { price } */}
      </div>
    );
  }

  export default AllSpots;
