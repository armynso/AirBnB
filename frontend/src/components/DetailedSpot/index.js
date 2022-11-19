import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSpotPage } from "../../store/spots";
import { useParams } from 'react-router-dom'
import './detailedSpot.css'

function SpotPage() {
    // const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    // console.log(spotId, 'whats the id')
    const spot = useSelector(state => state.spotState.entries)
    // console.log(spot, "spotPagebro")


    let firstName, url, address, avgStarRating, city, state, country, description, numReviews


    useEffect(() => {
        dispatch(loadSpotPage(spotId)).then(() => setIsLoaded(true));
        // console.log('does this even run??????')
    }, [dispatch, spotId]);

    if (isLoaded) {
        ({ firstName } = spot.Owner);
        url  = !spot.SpotImages.length ?  'https://images.pexels.com/photos/731812/pexels-photo-731812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' : spot.SpotImages[0].url;
      ({ address, avgStarRating, city, state, country, description, numReviews} = spot);
    }


return isLoaded && (
    <div>
      <h1>Spot Page</h1>
      {firstName}
    {url}
      {address}
      {avgStarRating}
      {city}
      {state}, {country}, {description}, {numReviews}
     </div>
    );
}

export default SpotPage;
