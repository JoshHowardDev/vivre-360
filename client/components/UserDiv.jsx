import React from 'react';
import '../stylesheets/userDiv.css';

function userDiv({ displayName, picture }) {
  return (
    <div className="userDiv">
      <div className="displayName">{displayName}</div>
      <img src={picture} alt="User" className="userPhoto" />
    </div>
  );
}

export default userDiv;
