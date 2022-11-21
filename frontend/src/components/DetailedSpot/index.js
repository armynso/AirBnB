import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSpotPage } from "../../store/spots";
import { useParams } from 'react-router-dom'
import * as reviewActions from "../../store/reviews"
import { NavLink } from "react-router-dom";
import './detailedSpot.css'

function SpotPage() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    // const [isLoaded2, setIsLoaded2] = useState(false);
    // console.log(spotId, 'whats the id')
    const spot = useSelector(state => state.spotState.entron)
    // console.log(spot, "spotPagebro")
    // console.log(spot.Owner.firstName)

    const myReviews = useSelector(state => Object.values(state.reviewState))
    console.log('below')
    console.log('reviews', myReviews)


    let firstName, url, address, avgStarRating, city, state, country, description, numReviews


    useEffect(() => {
        dispatch(loadSpotPage(spotId));
        dispatch(reviewActions.getReviews(spotId));

        // console.log('does this even run??????')
    }, [dispatch, spotId]);

    // if (isLoaded) {
    //     ({ firstName } = spot.Owner);
    //     url  = !spot.SpotImages.length ?  'https://images.pexels.com/photos/731812/pexels-photo-731812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' : spot.SpotImages[0].url;
    //   ({ address, avgStarRating, city, state, country, description, numReviews} = spot);
    // }

    // let reviews;

    // console.log(myReviews, "change")

    // if (myReviews.length > 0 && Object.keys(myReviews[0]).length > 0) {
    //   reviews = (
    //   <div>
    //     {myReviews.map(review => (
    //       <li>
    //         {review[Object.keys(review)].User.firstName}
    //         {/* {review[Object.keys(review)].createdAt} */}
    //         {review[Object.keys(review)].review}
    //       </li>))}
    //   </div>


    //   )
    // } else {
    //   reviews = (<div></div>)
    // }

 if (!myReviews || !spot) {
  return null
 }

return (
    <div>
      <h1>Spot Page</h1>
      {/* {spot.firstName} */}
      {spot.url}
      {spot.address}
      {spot.avgStarRating}
      {spot.city}
      {/* {state}, {country}, {description}, {numReviews} */}
      {(myReviews.length > 0 && Object.keys(myReviews[0]).length > 0) ? (<div>
        {myReviews.map(review => (
          <li>
            {review[Object.keys(review)].User.firstName}
            {/* {review[Object.keys(review)].createdAt} */}
            {review[Object.keys(review)].review}
            {review[Object.keys(review)].stars}
          </li>))}
      </div>) : (<div></div>)}
      {(sessionUser) ? (<NavLink to={`/addReview/${spot.id}`}><button>Add Review</button></NavLink>) : <div>You must be signed in to add a review!</div>}
      {/* {reviews} */}
     </div>
    );
}

export default SpotPage;
