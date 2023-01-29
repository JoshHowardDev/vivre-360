/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import '../stylesheets/userDiv.css';

function userDiv() {
  return (
    <div className="userDiv">
      <div className="username">JoshHoward</div>
      <img client="/assets/userPhoto.jpg" alt="User" className="userPhoto" />
    </div>
  );
}

export default userDiv;
