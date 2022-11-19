import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import './spots.css';



function AllSpots() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const spots = useSelector(state => (Object.values(state.spotState.entries)))
    console.log('does it run', spots)
    // const spotArr = spots.map(spot => Object.values(spot))
    // console.log(spotArr)

    useEffect(() => {
        dispatch(getSpots()).then(() => setIsLoaded(true));
    }, [dispatch]);

    function tempImage(spot) {
      return (spot.PreviewImage == "This spot does not have a preview image") ?  null : true;
    }



    return isLoaded && (
      <div>
        <h1>Spots</h1>
        <div class="flex-container">
        <ul>
        {spots.map((spot, ele) => (
          <li>
            {/* {console.log(ele, 'this is ele')} */}
            <a href={`spots/${ele + 1}`}>
            <img class="Image" src={

                tempImage(spot) ? spot.PreviewImage : 'https://images.pexels.com/photos/731812/pexels-photo-731812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            alt="Image not found" />
            <p>
            {spot.city} {spot.state} {spot.avgRating}<br />
            ${spot.price}
            </p>
            </a>
            </li>
        ))}
      </ul>
        </div>
      </div>
    );
  }

  export default AllSpots;
