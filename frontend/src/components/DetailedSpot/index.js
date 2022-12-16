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

  const myReviews = useSelector(state => Object.values(state.reviewState)[0])
  // console.log('below')
  // console.log('reviews', myReviews)

  // console.log(spot.Owner.id, sessionUser.id)

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
    <div className="god-page">
      <h2>{spot.name}</h2>
      {/* <hr class="dotted"></hr> */}
      <div className="main-page">
        <div className="desc">
          <div className="star-top">
            {/* <i class="fa-solid fa-star fa-xs"></i> {(spot.avgRating) ? spot.avgRating.toFixed(1) : 'new'} */}
            <i class="fa-solid fa-star fa-xs"></i><div className="detailed-new">{spot.avgStarRating ? spot.avgStarRating.toFixed(1) : 'New'} &#x2022;</div>
            <div className="reviews-top">{spot.numReviews} {(spot.numReviews <= 1) ? 'Review' : 'Reviews'}  &#x2022; {spot.city}, {spot.state}, {spot.country}</div>
          </div>
        </div>
        <div className="images-grid">
          <img className="SpotImage" src={spot.SpotImages[0]?.url} />
          <div className="fourImages">
            <img className="SpotImage-1" src={spot.SpotImages[0]?.url} />
            <img className="SpotImage-2" src={spot.SpotImages[0]?.url} />
            <img className="SpotImage-3" src={spot.SpotImages[0]?.url} />
            <img className="SpotImage-4" src={spot.SpotImages[0]?.url} />
          </div>
        </div>
        <h3>Entire place hosted by {spot.Owner.firstName}</h3>
        <div>2 guests &#x2022; 1 bedroom &#x2022; 1 bed &#x2022; 1 bath</div>
        <hr class="dotted"></hr>
        {/* {state}, {country}, {description}, {numReviews} */}
        {/* {(myReviews.length > 0 && Object.keys(myReviews[0]).length > 0) ? (<div className="try-grid">
        {myReviews.map((review, i) => (
          <div >
            {review[Object.keys(review)[i]].User.firstName}
            {review[Object.keys(review)[i]].id}
            {review[Object.keys(review)[i]].stars}
          </div>))}
      </div>) : (<div></div>)} */}
        <div className="star-bottom">
          {/* <i class="fa-solid fa-star fa-xs"></i> {(spot.avgRating) ? spot.avgRating.toFixed(1) : 'new'} */}
          <i class="fa-solid fa-star fa-xs"></i><div className="detailed-new">{spot.avgStarRating ? spot.avgStarRating.toFixed(1) : 'New'} &#x2022;</div>
          <div className="reviews-top">{spot.numReviews} {(spot.numReviews <= 1) ? 'Review' : 'Reviews'} </div>
        </div>
        <div className="try-grid">
          {Object.values(myReviews).map((review) => {
            return (
              <div class="review-box">
                <div class="inner-review"><b>{review.User.firstName}</b> <i class="fa-solid fa-star"></i>{review.stars}</div>
                {review.review}
              </div>
            )
          }
          )}
        </div>
        {(spot?.Owner.id === sessionUser?.id) ? <div>You own this hosting!</div> : (Object.values(myReviews).find(review => review.userId === sessionUser?.id)) ? <div>You have left your review! <br></br>To see all of your reviews, please click on your profile icon.</div> :
          (sessionUser) ? (<NavLink to={`/addReview/${spot.id}`}><button className="submit-addSpot spotpagereview">Add Review</button></NavLink>) : <div>You must be signed in to add a review!</div>}
        {/* {reviews} */}
      </div>

    </div>
  );
}

export default SpotPage;
