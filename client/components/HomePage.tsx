import React from 'react';
import '../stylesheets/homePage.css';
import NavBar from './NavBar';
import SearchContainer from './SearchContainer';
import UserDiv from './UserDiv';
import CopyrightDiv from './CopyrightDiv';

function HomePage({ displayName, picture }) {
  return (
    <>
      <NavBar />
      <SearchContainer />
      <UserDiv displayName={displayName} picture={picture} />
      <CopyrightDiv />
    </>
  );
}

export default HomePage;
