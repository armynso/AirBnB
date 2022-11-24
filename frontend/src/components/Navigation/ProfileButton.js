import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './profileButton.css';

function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className='user-button' onClick={openMenu}>
        <i class="fa-solid fa-bars fa-lg"></i>
        <i className="fas fa-user-circle fa-2x" />
        {/* <i class="fa-brands fa-android"></i> */}
      </button>
      {showMenu && (user ?
        (<ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <hr class="dotted"></hr>
          <div className='user-links'>
            <li><NavLink title="Go to your hosting" to="/mySpots">My Hosting</NavLink></li>
            <li><NavLink title="Go to your reviews" to="/myReviews">My Reviews</NavLink></li>
            <button onClick={logout}>Log Out</button>
          </div>
          <li>
          </li>
        </ul>) :
        (<ul>
          <li>
            <button onClick={() => {
              setLogin(true)
              setShowModal(true)
            }}>
              Log In
            </button>
          </li>
          <li>
            <button onClick={() => {
              setLogin(false)
              setShowModal(true)
            }}>
              Sign Up
            </button>
          </li>
        </ul>)

      )}
    </>
  );
}

export default ProfileButton;
