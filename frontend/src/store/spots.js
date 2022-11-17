import { csrfFetch } from './csrf';

const ADD_SPOT = 'spot/addSpot';
const REMOVE_SPOT = 'spot/removeSpot';
const GET_SPOT = 'spot/getSpot';

const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    payload: spot
  };
};

const removeSpot = () => {
  return {
    type: REMOVE_SPOT,
  };
};

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    payload: spot
  };
};
// export const addSpot = (spot) => async (dispatch) => {
//   const { credential, password } = spot;
//   const response = await csrfFetch('/api/session', {
//     method: 'POST',
//     body: JSON.stringify({
//       credential,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(addSpot(data.spot));
//   return response;
// };

// export const restoreSpot = () => async dispatch => {
//     const response = await csrfFetch('/api/spots');
//     const data = await response.json();
//     dispatch(addSpot(data.spot));
//     return response;
// };

// export const addNewSpot = (spot) => async (dispatch) => {
// const { spotname, email, password, firstName, lastName } = spot;
// const response = await csrfFetch("/api/spots", {
//     method: "POST",
//     body: JSON.stringify({
//     spotname,
//     email,
//     password,
//     firstName,
//     lastName
//     }),
// });
//     const data = await response.json();
//     dispatch(addSpot(data.Spot));
//     return response;
// };

// export const deleteSpot = () => async (dispatch) => {
//     const response = await csrfFetch('/api/spots', {
//       method: 'DELETE',
//     });
//     dispatch(removeSpot());
//     return response;
// };

export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  const spots = await response.json()
  console.log(spots)
  dispatch(getSpot(spots));
  // return response;
};

const initialState = { entries: ['hi'] };

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOT:
      const spotObj = {};
      console.log(Object.values(action.payload['Spots']), 'test this')
      Object.values(action.payload['Spots']).forEach((spot, i) => spotObj[i] = (spot))
      return { ...state, entries: spotObj};
    // case ADD_SPOT:
    //   newState = Object.assign({}, state);
    //   newState.spot = action.payload;
    //   return newState;
    // case REMOVE_SPOT:
    //   newState = Object.assign({}, state);
    //   newState.spot = null;
    //   return newState;
    default:
      return state;
  }
};

export default spotReducer;
