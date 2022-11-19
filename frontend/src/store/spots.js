import { csrfFetch } from './csrf';

const ADD_SPOT = 'spot/addSpot';
const REMOVE_SPOT = 'spot/removeSpot';
const GET_SPOT = 'spot/getSpot';
const PAGE_SPOT = 'spot/pageSpot';

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

const spotPage = (spot) => {
  return {
    type: PAGE_SPOT,
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

export const addNewSpot = (spot) => async (dispatch) => {
const { address, city, stateLocation, country, name, description, price } = spot;
const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      address,
      city,
      country,
      state: stateLocation,
      name,
      description,
      price
    }),
});
    const data = await response.json();
    dispatch(addSpot(data.Spot));
    return response;
};

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
  // console.log(spots)
  dispatch(getSpot(spots));
  // return response;
};

export const loadSpotPage = (page) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${page}`);
  console.log("testttafasfa")
  const spot = await response.json()
  console.log(spot, "real")
  dispatch(spotPage(spot));
  return response
}

const initialState = { entries: ['hi'] };

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOT:
      const spotObj = {};
      console.log(Object.values(action.payload['Spots']), 'test this')
      Object.values(action.payload['Spots']).forEach((spot, i) => spotObj[i + 1] = (spot))
      console.log('spotobj:', spotObj)
      return {...state, entries: spotObj};
    case ADD_SPOT:
      // Object.values(action.payload['Spots']).forEach((spot, i) => spotObj[i] = (spot))
      const singleObj = {[Object.keys(spotObj).length + 1]: action.payload['Spot']}
      // Object.values(action.payload['Spots']).forEach((spot, i) => spotObj[i] = (spot))
      // ...state, [action.payload.id]:{...action.payload}
      return {...state, entries: {...spotObj, singleObj}
      };
      case PAGE_SPOT:
        return {...state, entries: action.payload}
    // case REMOVE_SPOT:
    //   newState = Object.assign({}, state);
    //   newState.spot = null;
    //   return newState;
    default:
      return state;
  }
};

export default spotReducer;
