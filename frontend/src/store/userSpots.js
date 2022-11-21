import { csrfFetch } from './csrf';

const USER_SPOT = 'userspot/userSpot';
const UPDATE_SPOT = 'spot/userUpdateSpot';
const REMOVE_SPOT = 'spot/userRemoveSpot';

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

const removeSpot = (id) => {
    return {
    type: REMOVE_SPOT,
    payload: id
    };
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

  export const deleteSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
      method: "DELETE",
    })
    if (response.ok) {
      // const { spotId: deletedId } = await response.json();
      dispatch(removeSpot(id))
    }
  }

export const currentSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');
    const spot = await response.json();
    // console.log(spot, 'this is real')
    dispatch(userSpots(spot))
  }

  const userSpotReducer = (state = {}, action) => {
    let newState;
    // let current = {Spots:{}};
    switch (action.type) {
    //   case GET_SPOT:
    //     const spotObj = {};
    //     // console.log(Object.values(action.payload['Spots']), 'test this')
    //     Object.values(action.payload['Spots']).forEach((spot) => spotObj[spot.id] = (spot))
    //     // console.log('spotobj:', spotObj)
    //     return {...state, entries: spotObj};
    //   case ADD_SPOT:
    //     return {...state, entries: action.payload}
        // case PAGE_SPOT:
        //   return {...state, entron: action.payload}
        case USER_SPOT:
          return {...state, current: action.payload}
        case REMOVE_SPOT:
          const newEntries = {...action.payload }
          delete newEntries[action.payload]
          return {...state, entries: newEntries}
        // case UPDATE_SPOT:

      default:
        return {state, current: {Spots: {}}};
    }

        // Object.values(action.payload['Spots']).forEach((spot, i) => spotObj[i] = (spot))
        // const singleObj = {[Object.keys(spotObj).length + 1]: action.payload['Spot']}
        // Object.values(action.payload['Spots']).forEach((spot, i) => spotObj[i] = (spot))
        // ...state, [action.payload.id]:{...action.payload}
  };

  export default userSpotReducer;
