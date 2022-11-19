import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      < div class='nav-logged'>
        <NavLink to="/addSpot">Host your Airbnb</NavLink>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
      <div class='nav-bar'>
        <NavLink to="/signup">Become a host</NavLink>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
      </>
    );
  }

  return (
    <ul>
      <div class='nav'>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </div>
    </ul>
  );
}

export default Navigation;
