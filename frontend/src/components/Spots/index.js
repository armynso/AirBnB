import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import './spots.css';



function AllSpots() {
  const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false);
  const spots = useSelector(state => (Object.values(state.spotState.entries)))
  // console.log('does it run', spots)
  // const spotArr = spots.map(spot => Object.values(spot))
  // console.log(spotArr)

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  function tempImage(spot) {
    return (spot.PreviewImage == "This spot does not have a preview image") ? null : true;
  }



  return (
    <div>
      <div className="flex-container">
        <ul className="main-grid">
          {spots.map((spot, ele) => (

            (
              <li key={ele} className="main-list">
                {/* {!spot ? (return null)} */}
                {/* {console.log(ele, 'this is ele')} */}
                <NavLink to={`spots/${spot.id}`}>
                  <img class="Image-house" src={
                    tempImage(spot) ? spot.PreviewImage : 'https://images.pexels.com/photos/731812/pexels-photo-731812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                  }
                    alt="Image not found" />
                  <p>
                    <div className="top-line">{spot.city}, {spot.state}
                      <div className="right"><i class="fa-solid fa-star"></i>{spot.avgRating}</div><br />

                    </div>
                    <div class="date">
                      Added {Math.floor(Math.random() * 10 + 2)} weeks ago<br />
                      Dec {Math.floor(Math.random() * 8 + 2)}-{Math.floor(Math.random() * 19 + 11)}
                    </div>
                    <div className="bottom-line">${spot?.price} <div className="night">Night</div></div>
                  </p>
                </NavLink>
              </li>)
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllSpots;
