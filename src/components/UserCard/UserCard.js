import React, { useRef } from 'react';

import './UserCard.css';

const UserCard = ({ user }) => {
  const { photoURL, displayName } = user;
  const fileInputRef = useRef(null);

  const inputFileID = `file-id-${displayName.replace(' ', '').toLowerCase()}`;

  const handleChange = () => {
    console.dir(fileInputRef.current.files[0]);
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

export default UserCard;
