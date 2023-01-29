/* eslint-disable react/prop-types */
import React from 'react';
import '../stylesheets/userDiv.css';
import userPhotoIMG from '../assets/userPhoto.jpg';

function userDiv() {
  return (
    <div className="userDiv">
      <div className="username">JoshHoward</div>
      <img src={userPhotoIMG} alt="User" className="userPhoto" />
    </div>
  );
}

export default userDiv;
