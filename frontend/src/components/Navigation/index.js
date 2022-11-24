import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true)

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <div class='nav-logged'>
  //       <NavLink to="/addSpot">Host your Airbnb</NavLink>
  //       <ProfileButton user={sessionUser} />
  //     </div>
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <div className='nav'>
  //         <NavLink to="/signup">Become a host</NavLink>
  //         <LoginFormModal />
  //         <NavLink to="/signup">Sign Up</NavLink>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <ul>
      <div className='nav-main'>
        <div className='nav-left'>
          <NavLink exact to="/"><img className="logo" src="/Images/flybaby.png" ></img></NavLink>
        </div>
        <div className='nav-right'>
          {isLoaded && <ProfileButton user={sessionUser} setLogin={setLogin} setShowModal={setShowModal} />}
        </div>
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)}>
        {login ? <LoginForm setShowModal={setShowModal} /> : <SignupFormPage setShowModal={setShowModal} />}
      </Modal>}
    </ul>
  );
}

export default Navigation;
