import React, { useRef } from 'react';

import PropTypes from 'prop-types';

import { storage, database } from '../../firebase/firebase';

import './UserCard.css';

const UserCard = ({ uid, user }) => {
  const { displayName, photoURL } = user;
  const fileInputRef = useRef(null);

  const inputFileID = `file-id-${displayName.replace(' ', '').toLowerCase()}`;

  const userStorageRef = storage.ref('/user-images').child(uid);
  const userRef = database.ref('/users').child(uid);

  const handleChange = () => {
    const file = fileInputRef.current.files[0];

    const uploadImage = userStorageRef
      .child(file.name)
      .put(file, { contentType: file.type });

    uploadImage.then(snapshot => {
      snapshot.ref.getDownloadURL().then(downloadURL => {
        userRe.child('photoURL').set(downloadURL);
      });
    });
  };

  return (
    <article id="user-card-item">
      <img src={photoURL} alt={displayName} />
      <h4>{displayName}</h4>
      <label htmlFor={inputFileID}>Select an image</label>
      <input
        id={inputFileID}
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
      />
    </article>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    photoURL: PropTypes.string
  }).isRequired,
  uid: PropTypes.string.isRequired
};

export default UserCard;
