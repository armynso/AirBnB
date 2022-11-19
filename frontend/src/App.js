import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots";
import CreateNewSpot from "./components/CreateSpot";
import PageNotFound from "./components/PageNotFound";
import SpotPage from "./components/DetailedSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/addSpot">
            <CreateNewSpot />
          </Route>
          <Route path="/404">
          <PageNotFound />
          </Route>
          <Route path="/spots/:spotId">
          <SpotPage />
          </Route>
          <Route exact path="/">
            <AllSpots />
          </Route>
          {/* <Route path="/404" element={<div>Choose the correct path </div>}></Route> */}
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>

      )}
    </>
  );
}

export default App;
