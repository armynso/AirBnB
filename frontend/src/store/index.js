import { combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session"
import { legacy_createStore as createStore} from 'redux'
import spotReducer from "./spots";
import reviewReducer from "./reviews";
import userSpotReducer from "./userSpots"
import userReviewReducer from "./userReviews"

const rootReducer = combineReducers({
  session: sessionReducer,
  spotState: spotReducer,
  reviewState: reviewReducer,
  userSpotState: userSpotReducer,
  userReviewState: userReviewReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
