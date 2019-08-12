import React from 'react';

import PropTypes from 'prop-types';

import { auth } from '../../firebase/firebase';
import Button from '../Button/Button';

import './User.css';

const User = ({ user }) => {
  const handleSignOut = () => auth.signOut();
  const { photoURL, displayName, email } = user;

  return (
    <div id="user">
      <img className="user-img" src={photoURL} alt={`${displayName}`}></img>
      <div className="user-container">
        <p>{displayName}</p>
        <p>{email}</p>
        <Button title={'Sign Out'} handleClick={handleSignOut} />
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string
  }).isRequired
};

export default User;
