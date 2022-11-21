import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import './spots.css';



function AllSpots() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const spots = useSelector(state => (Object.values(state.spotState.entries)))
    // console.log('does it run', spots)
    // const spotArr = spots.map(spot => Object.values(spot))
    // console.log(spotArr)

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    function tempImage(spot) {
      return (spot.PreviewImage == "This spot does not have a preview image") ?  null : true;
    }



    return (
      <div>
        <div class="flex-container">
        <ul>
        {spots.map((spot, ele) => (
          <li key={ele}>
            {/* {console.log(ele, 'this is ele')} */}
            <NavLink to={`spots/${spot.id}`}>
            <img class="Image" src={
                tempImage(spot) ? spot.PreviewImage : 'https://images.pexels.com/photos/731812/pexels-photo-731812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            alt="Image not found" />
            <p>
            {spot.city} {spot.state} {spot.avgRating}<br />
            ${spot.price}
            </p>
            </NavLink>
            </li>
        ))}
      </ul>
        </div>
      </div>
    );
  }

  export default AllSpots;
