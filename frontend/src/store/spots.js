import { csrfFetch } from './csrf';

const ADD_SPOT = 'spot/addSpot';
const REMOVE_SPOT = 'spot/removeSpot';
const GET_SPOT = 'spot/getSpot';
const PAGE_SPOT = 'spot/pageSpot';
const USER_SPOT = 'spot/userSpot';
const UPDATE_SPOT = 'spot/updateSpot'

const addSpot = (spot, url) => {
  return {
    type: ADD_SPOT,
    payload: { ...spot, PreviewImage: url }
  };
};

const removeSpot = (id) => {
  return {
    type: REMOVE_SPOT,
    payload: id
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

const userSpots = (spot) => {
  return {
    type: USER_SPOT,
    payload: spot
  }
}

const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
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

export const addNewSpot = (spot, url) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const data = await response.json();

    const res = await csrfFetch(`/api/spots/${data.id}/images`, {
      method: "POST",
      body: JSON.stringify({
        url,
        preview: true
      }),
    });
    dispatch(addSpot(data, url));
    return data
  }
  throw response;
};

export const editSpot = (spot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(updateSpot(data));
    return data
  }
  throw response;
};
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
  // console.log("testttafasfa")
  const spot = await response.json()
  // console.log(spot, "real")
  dispatch(spotPage(spot));

  // return response
}

export const currentSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots/current');
  const spot = await response.json();
  // console.log(spot, 'this is real')
  dispatch(userSpots(spot))
}

export const deleteSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  })
  if (response.ok) {
    // const { spotId: deletedId } = await response.json();
    dispatch(removeSpot(id))
  }
}

const initialState = { entries: ['hi'] };

const spotReducer = (state = initialState, action) => {
  let newState;
  // let current = {Spots:{}};
  switch (action.type) {
    case GET_SPOT:
      const spotObj = {};
      // console.log(Object.values(action.payload['Spots']), 'test this')
      Object.values(action.payload['Spots']).forEach((spot) => spotObj[spot.id] = (spot))
      // console.log('spotobj:', spotObj)
      return { ...state, entries: spotObj };
    // case ADD_SPOT:
    //   console.log("add spot", { ...action.payload, PreviewImage: action.url })
    //   return { ...state, entries: { ...action.payload } }
    case PAGE_SPOT:
      return { ...state, entron: action.payload }
    case USER_SPOT:
      return { ...state, current: action.payload }
    case REMOVE_SPOT:
      const newEntries = { ...action.payload }
      delete newEntries[action.payload]
      return { ...state, entries: newEntries }
    // case UPDATE_SPOT:

    default:
      return state;
  }

  // Object.values(action.payload['Spots']).forEach((spot, i) => spotObj[i] = (spot))
  // const singleObj = {[Object.keys(spotObj).length + 1]: action.payload['Spot']}
  // Object.values(action.payload['Spots']).forEach((spot, i) => spotObj[i] = (spot))
  // ...state, [action.payload.id]:{...action.payload}
};

export default spotReducer;
