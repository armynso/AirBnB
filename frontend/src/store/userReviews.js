import { csrfFetch } from './csrf';

const ADD_REVIEW= 'userReview/addReview';
const REMOVE_REVIEW= 'userReview/removeReview';
const GET_REVIEW= 'userReview/getReview';
const PAGE_REVIEW= 'userReview/pageReview';
const USER_REVIEW= 'userReview/userReview';

const addReview= (review, firstName) => {
  return {
    type: ADD_REVIEW,
    payload: review,
    firstName
  };
};

const removeReview = () => {
  return {
    type: REMOVE_REVIEW,
  };
};

// const getReview = (review) => {
//   return {
//     type: GET_REVIEW,
//     payload: review
//   };
// };

const spotPage = (review) => {
  return {
    type: PAGE_REVIEW,
    payload: review
  };
};

const userReviews = (review) => {
  return {
    type: USER_REVIEW,
    payload: review
  }
}

// export const addNewImage = (spotId, url) => async () => {
//   const response = await csrfFetch(`/api/spots/${spotId}/images`, {
//       method: "POST",
//       body: JSON.stringify({
//         url,
//         preview: true
//       }),
//   });
//       // const data = await response.json();
//       // dispatch(addSpot(data.Spot));
//       return response;
//   };

// export const getReviews = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
//   const reviews = await response.json()
// //   console.log(reviews)
// if (response.ok) {
//     dispatch(getReview(reviews));
// }
//   // return response;
// };

export const addNewReview = (review, spotId, name) => async (dispatch) => {
// const { address, city, stateLocation, country, name, description, price } = spot;
const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review)
});
    if (response.ok) {
        const data = await response.json();
        dispatch(addReview(data, name));
        return data;
    }
    throw response
};

export const getUserReviews = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews/current');
    const reviews = await response.json();

    if (response.ok) {
        dispatch(userReviews(reviews))
    }
}

export const deleteReview = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
      method: "DELETE",
    })
    if (response.ok) {
      dispatch(removeReview(id))
    }
  }

// export const loadSpotPage = (page) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${page}`);
//   // console.log("testttafasfa")
//   const spot = await response.json()
//   // console.log(spot, "real")
//   dispatch(spotPage(spot));

//   // return response
// }


const userReviewReducer = (state = {}, action) => {
  let newState;
  let reviewObj = {};
  switch (action.type) {
    case GET_REVIEW:

    //   console.log((action.payload['Reviews']), 'test this')
      (action.payload['Reviews']).forEach((review) => reviewObj[review.id] = (review))
    //   console.log('reviewobj:', reviewObj)
      return {entries: reviewObj};
    case ADD_REVIEW:
        // console.log(action.payload)
        // (action.payload).forEach((review) => reviewObj[review.id] = (review))
      return {...state, entries: {
        [action.payload.id]:{User: {firstName: action.firstName}, review:
        action.payload.review, stars: action.payload.stars}}
      }
    case USER_REVIEW:
        // console.log(action.payload['Reviews'], "Check thisss")
        (action.payload['Reviews']).forEach((review) => reviewObj[review.id] = (review))
        return {...state, current: action.payload}
      case USER_REVIEW:
        return {}
    default:
      return {state, current: {}};
  }
};

export default userReviewReducer;
