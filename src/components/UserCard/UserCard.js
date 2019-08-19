import React, { useState, useRef } from 'react';

import PropTypes from 'prop-types';

import { storage, database } from '../../firebase/firebase';

import './UserCard.css';

const UserCard = ({ uid, user }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
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

    uploadImage.on('state_changed', ({ bytesTransferred, totalBytes }) => {
      const loadingProgress = (bytesTransferred / totalBytes) * 100;
      setLoadingProgress(loadingProgress.toFixed(2));
      if (loadingProgress === 100) setLoadingProgress(0);
    });

    uploadImage.then(snapshot => {
      snapshot.ref.getDownloadURL().then(downloadURL => {
        userRef.child('photoURL').set(downloadURL);
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
      {loadingProgress !== 0 ? (
        <progress value={loadingProgress} max="100"></progress>
      ) : null}
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
